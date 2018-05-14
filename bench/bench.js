/**
 * Usage
 * 1 iteration, 1 rotation: node bench/bench.js
 * 10 iterations, 2 rotations: node bench/bench.js 10 2
 * 100 iteration, 3 rotations: node bench/bench.js 100 3
 */

const V2New = '../packages/cherow/dist/commonjs/cherow';
const V2 = './v2/cherow';
const V1 = './v1.6.2/cherow';
const { Benchmark, Column } = require('./util');

const iterations = process.argv[2] || 1;
const rotations = process.argv[3] || 1;

const tests = [
  { weight: 1,  imports: [V1, V2, V2New], expr: "var foo;" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "function bar() {}" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "var baz = 5 * 5 + 1;" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "class Qux{}" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "class Quux{corge(){}}" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "class Grault{constructor(name){this.name = name;}}" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "var grault = {foo,bar};" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "var garply = {foo: 'bar'};" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "// foobar bazqux" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "const foo = bar === undefined ? true : false;" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "const waldo = [1,2,3];" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "const waldo = new Array(100);" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "let corge = Object.prototype.toString.call();" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "const corge = {}[0][0];" },
  { weight: 1,  imports: [V1, V2, V2New], expr: "var t = typeof foo;" },
];

function run(iterations) {
  const benchmark = new Benchmark([
    new Column('Weight', 8, 'left'),
    new Column('Expression', 35, 'left'),
    new Column('v1', 12, 'right'),
    new Column('v2', 12, 'right'),
    new Column('v1/v2', 9, 'right'),
    new Column('New', 12, 'right'),
    new Column('v1/New', 9, 'right'),
    new Column('v2/New', 9, 'right')
  ], tests, 3, iterations);

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
        const start = process.hrtime();
        while (k--) {
          parser.parseSource(expr, undefined, 4095);
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
