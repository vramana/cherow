/**
 * Usage
 * 1 iteration, 1 rotation: node --allow-natives-syntax bench/bench.js
 * 10 iterations, 2 rotations: node --allow-natives-syntax bench/bench.js 10 2
 * 100 iteration, 3 rotations: node --allow-natives-syntax bench/bench.js 100 3
 */

let V2New = '../dist/cherow.umd';
let V2 = './v2/cherow';
let V1 = './v1.6.2/cherow';

const { Benchmark, Column, disableOptimizations, rewriteExports } = require('./util');

rewriteExports(V2New);
rewriteExports(V2);
rewriteExports(V1);

V2New = `${V2New}-rewritten`;
V2 = `${V2}-rewritten`;
V1 = `${V1}-rewritten`;

const iterations = process.argv[2] || 1;
const rotations = process.argv[3] || 1;

const tests = [
  { weight: 10, imports: [V1, V2, V2New], expr: `(class A {} < 1);` },
  {
    weight: 3,
    imports: [V1, V2, V2New],
    expr: `(class J { static get foo() {} static set foo(x) {} get foo() {} set foo(x) {} })`
  },
  { weight: 3, imports: [V1, V2, V2New], expr: `x = class A {};` },
  { weight: 3, imports: [V1, V2, V2New], expr: `(class A {set foo(x){}})` },
  { weight: 3, imports: [V1, V2, V2New], expr: `(class A {"set"(){} "get"(){} "async"(){}})` },
  { weight: 3, imports: [V1, V2, V2New], expr: `({ foo: bar})` },
  { weight: 3, imports: [V1, V2, V2New], expr: `({ foo}= bar)` },
  { weight: 1, imports: [V1, V2, V2New], expr: `({a:0, get 'b'(){}, set 3(d){}})` },
  { weight: 3, imports: [V1, V2, V2New], expr: `x={async f(){ let f }}` },
  { weight: 1, imports: [V1, V2, V2New], expr: `function *f(){   s = {"foo": yield}   }` }
];

function run(iterations) {
  const benchmark = new Benchmark(
    [
      new Column('Weight', 8, 'left'),
      new Column('Expression', 35, 'left'),
      new Column('v1', 12, 'right'),
      new Column('v2', 12, 'right'),
      new Column('v1/v2', 9, 'right'),
      new Column('New', 12, 'right'),
      new Column('v1/New', 9, 'right'),
      new Column('v2/New', 9, 'right')
    ],
    tests,
    3,
    iterations
  );

  benchmark.writeHeader();

  let r = rotations;
  while (r--) {
    for (const { expr, imports, weight } of tests) {
      benchmark.writeLineStart();

      for (const $import of imports) {
        if (!$import) {
          benchmark.addResult();
          continue;
        }
        let k = iterations * weight;
        const parser = require($import);

        disableOptimizations(parser);
        const start = process.hrtime();
        while (k--) {
          parser.parseSource(expr, undefined, 4095 ^ 64 ^ 32);
        }
        const end = process.hrtime(start);
        benchmark.addResult(end);
      }
    }

    benchmark.nextRotation();
  }

  benchmark.writeFooter();
}

run(iterations);
