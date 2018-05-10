import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - For of', () => {

    describe('Failure', () => {

      const invalidDestructuring = [
          'for(var [] = 0 of {});',
          'for(var [,] = 0 of {});',
          'for(var [a] = 0 of {});',
          'for(var [a = 0] = 0 of {});',
          'for(var [...a] = 0 of {});',
          'for(var [...[]] = 0 of {});',
          'for(var [...[a]] = 0 of {});',
          'for(var {} = 0 of {});',
          'for(var {p: x} = 0 of {});',
          'for(var {p: x = 0} = 0 of {});',
          'for(var {x} = 0 of {});',
          'for(var {x = 0} = 0 of {});',
          'for(let x = 0 of {});',
          'for(let [] = 0 of {});',
          'for(let [,] = 0 of {});',
          'for(let [a] = 0 of {});',
          'for(let [a = 0] = 0 of {});',
          'for(let [...a] = 0 of {});',
          'for(let [...[]] = 0 of {});',
          'for(let [...[a]] = 0 of {});',
          'for(let {} = 0 of {});',
          'for(let {p: x} = 0 of {});',
          'for(let {p: x = 0} = 0 of {});',
          'for(let {x} = 0 of {});',
          'for(let {x = 0} = 0 of {});',
          'for(const x = 0 of {});',
          'for(const [] = 0 of {});',
          'for(const [,] = 0 of {});',
          'for(const [a] = 0 of {});',
          'for(const [a = 0] = 0 of {});',
          'for(const [...a] = 0 of {});',
          'for(const [...[]] = 0 of {});',
          'for(const [...[a]] = 0 of {});',
          'for(const {} = 0 of {});',
          'for(const {p: x} = 0 of {});',
          'for(const {p: x = 0} = 0 of {});',
          'for(const {x} = 0 of {});',
          'for(const {x = 0} = 0 of {});',
          'for(x = 0 of {});',
          'for([] = 0 of {});',
          'for([,] = 0 of {});',
          'for([a] = 0 of {});',
          'for([a = 0] = 0 of {});',
          'for([...a] = 0 of {});',
          'for([...[]] = 0 of {});',
          'for([...[a]] = 0 of {});',
          'for({} = 0 of {});',
          'for({p: x} = 0 of {});',
          'for({p: x = 0} = 0 of {});',
          'for({x} = 0 of {});',
          'for({x = 0} = 0 of {});',
          'for(o.p = 0 of {});',
          'for(o[0] = 0 of {});',
          'for(f() = 0 of {});',
          'for(({a}) of 0);',
          'for(([a]) of 0);',
      ];

      for (const arg of invalidDestructuring) {
          it(`${arg}`, () => {
              t.throws(() => {
                  parse(`${arg}`, undefined, Context.Empty);
              });
          });
      }

      const invalidSyntax = [
          'for (var {a: []} = 2 of []) { }',
          'for (var [x] = x of y) var x;',
          'function () { for (let x of bar) { } }',
          'function () { for (let x of { }) { } }',
          'function () { for (let x of 0) { } }',
          'for (var i, j of {}) {}',
          'for (var i, j of [1, 2, 3]) {}',
          'for (var i, j = 1 of {}) {}',
          'for (var i, j = void 0 of [1, 2, 3]) {}',
          'for(([a]) of 0);',
          'for(({a}) of 0);',
          'for(var a of b, c);',
          'for (let i, j of {}) {}',
          'for (let i, j of [1, 2, 3]) {}',
          'for (let i, j = 1 of {}) {}',
          'for (let i, j = void 0 of [1, 2, 3]) {}',

          'for (const i, j of {}) {}',
          'for (const i, j of [1, 2, 3]) {}',
          'for (const i, j = 1 of {}) {}',
          'for (const i, j = void 0 of [1, 2, 3]) {}'
      ];

      for (const arg of invalidSyntax) {

          it(`${arg}`, () => {
              t.throws(() => {
                  parse(`${arg}`, undefined, Context.Empty);
              });
          });

          it(`"use strict"; ${arg}`, () => {
              t.throws(() => {
                  parse(`"use strict"; ${arg}`, undefined, Context.Empty);
              });
          });
      }

      fail('function foo(){ "use strict"; for (let i = void 0 of [1, 2, 3]) {}}', Context.Empty, {
           source: 'function foo(){ "use strict"; for (let i = void 0 of [1, 2, 3]) {}',
          });

      fail('function foo(){ "use strict"; for (let i = 1 of {}) {}}', Context.Empty, {
           source: 'function foo(){ "use strict"; for (let i = 1 of {}) {}}',
          });

      fail('function foo(){ "use strict"; for (const i = void 0 in [1, 2, 3]) {}}', Context.Empty, {
            source: 'function foo(){ "use strict"; for (const i = void 0 in [1, 2, 3]) {}}',
          });

      fail('function foo(){ var yield = 0;  for (let i = 1 of {}) {}}', Context.Empty, {
            source: 'function foo(){ var yield = 0;  for (let i = 1 of {}) {}}',
          });

      fail('for(const x = 4, y of [1,2,3]) {}', Context.Empty, {
          source: 'for(const x = 4, y of [1,2,3]) {}',
        });

      fail('for(const x = 4, y of [1,2,3]) {}', Context.Empty, {
              source: 'for(const x = 4, y of [1,2,3]) {}',
          });

      fail('for(const x,y of []) {}', Context.Empty, {
              source: 'for(const x,y of []) {}',
          });

      fail('for (const i = void 0 of [1, 2, 3]) {}', Context.Empty, {
              source: 'for (const i = void 0 of [1, 2, 3]) {}',
          });

      fail('for (var i = void 0 of [1, 2, 3]) {}', Context.Empty, {
              source: 'for (var i = void 0 of [1, 2, 3]) {}',
          });

      fail('for (var i = 1 of {}) {}', Context.Empty, {
              source: 'for (var i = 1 of {}) {}',
          });

      fail('for (const x = 0 of {});', Context.Empty, {
              source: 'for (const x = 0 of {});',
          });

      fail('for (let x = 0 of {});', Context.Empty, {
              source: 'for (let x = 0 of {});',
          });

      fail('for (var x = 0 of {});', Context.Empty, {
              source: 'for (var x = 0 of {});',
          });

      fail('for (let x = 0 of {});', Context.Empty, {
              source: 'for (let x = 0 of {});',
          });

      fail('for (x=0 of y);', Context.Empty, {
              source: 'for (x=0 of y);',
          });

      fail('for (const x = 1 of y);', Context.Empty, {
              source: 'for (const x = 1 of y);',
          });

      fail('for (var [p]=q of r);', Context.Empty, {
              source: 'for (var [p]=q of r);',
          });

      fail('"for (var i = void 0 of [1, 2, 3]) {}', Context.Empty, {
              source: '"for (var i = void 0 of [1, 2, 3]) {}',
          });

      fail('for (var i = 1 of {}) {}', Context.Empty, {
              source: 'for (var i = 1 of {}) {}',
          });

      fail('for (var i = yield of [1, 2, 3]) {}', Context.Empty, {
              source: 'for (var i = yield of [1, 2, 3]) {}',
          });

      fail('function foo() { for (let i, j = 1 of {}) {} }', Context.Empty, {
              source: 'function foo() { for (let i, j = 1 of {}) {} }',
          });

      fail('function foo() { for (const i, j = void 0 of [1, 2, 3]) {} }', Context.Empty, {
              source: 'function foo() { for (const i, j = void 0 of [1, 2, 3]) {} }',
          });

      fail('for (const x = 1 of y);', Context.Empty, {
              source: 'for (const x = 1 of y);',
          });

      fail('for (var x = 1 of y);', Context.Empty, {
              source: 'for (var x = 1 of y);',
          });

      fail('for (const let of y);', Context.Empty, {
              source: 'for (const let of y);',
          });

      fail('for (const let of y);', Context.Empty, {
              source: 'for (const let of y);',
          });

      fail('for (var {x} = y of z);', Context.Empty, {
              source: 'for (var {x} = y of z);',
          });

      fail('for (var [p]=q of r);', Context.Empty, {
              source: 'for (var [p]=q of r);',
          });

      fail('for (let x = 1 of y);', Context.Empty, {
              source: 'for (let x = 1 of y);',
          });

      fail('for (this of that);', Context.Empty, {
              source: 'for (this of that);',
          });

      fail(`"use strict"; for (x of let) {}`, Context.Empty, {
              source: `"use strict"; for (x of let) {}`,
          });

      fail('for (let let of x);', Context.Empty, {
              source: 'for (let let of x);',
          });

      fail('for (const of 42);', Context.Empty, {
              source: 'for (const of 42);',
          });

      fail('for (var i, j of {}) {}', Context.Empty, {
              source: 'for (var i, j of {}) {}',
          });

      fail('for(x of [], []) {}', Context.Empty, {
              source: 'for(x of [], []) {}',
          });

      fail('for(x of [], []) {}', Context.Empty, {
              source: 'for(x of [], []) {}',
          });

      fail('for(x of [], []) {}', Context.Empty, {
              source: 'for(x of [], []) {}',
          });

      fail('for(var a of b, c);', Context.Empty, {
              source: 'for(var a of b, c);',
          });

      fail('for(a of b, c);', Context.Empty, {
              source: 'for(a of b, c);',
          });

      fail('for (var x of []) async function f() {}', Context.Empty, {
              source: 'for (var x of []) async function f() {}',
          });

      fail('for (var x of []) async function* g() {}', Context.Empty, {
              source: 'for (var x of []) async function* g() {}',
          });

      fail('for (var x of []) class C {}', Context.Empty, {
              source: 'for (var x of []) class C {}',
          });

      fail('for (var x of []) const y = null;', Context.Empty, {
              source: 'for (var x of []) const y = null;',
          });

      fail('for (var x of []) function f() {}', Context.Empty, {
              source: 'for (var x of []) function f() {}',
          });

      fail('for (var x of []) function* g() {}', Context.Empty, {
              source: 'for (var x of []) function* g() {}',
          });

      fail('for (var x of []) let y;', Context.Empty, {
              source: 'for (var x of []) let y;',
          });

      fail('"use strict"; for ([ x = yield ] of [[]]) ;', Context.Empty, {
              source: '"use strict"; for ([ x = yield ] of [[]]) ;',
          });

      fail('for ([[(x, y)]] of [[[]]]) ;', Context.Empty, {
              source: 'for ([[(x, y)]] of [[[]]]) ;',
          });

      fail('"use strict"; for ([[x[yield]]] of [[[]]]) ;', Context.Empty, {
              source: '"use strict"; for ([[x[yield]]] of [[[]]]) ;',
          });

      fail('for ([{ get x() {} }] of [[{}]]) ;', Context.Empty, {
              source: 'for ([{ get x() {} }] of [[{}]]) ;',
          });

      fail('"use strict"; for ([{ x = yield }] of [[{}]]) ;', Context.Empty, {
              source: '"use strict"; for ([{ x = yield }] of [[{}]]) ;',
      });

      fail('"use strict"; for ([ x[yield] ] of [[]]) ;', Context.Empty, {
              source: '"use strict"; for ([ x[yield] ] of [[]]) ;',
          });

      fail('for ([...x, y] of [[]]) ;', Context.Empty, {
              source: 'for ([...x, y] of [[]]) ;',
          });

      fail('for ([...x,] of [[]]) ;', Context.Empty, {
              source: 'for ([...x,] of [[]]) ;',
          });

      fail('for ([...x,] of [[]]) ;', Context.Empty, {
              source: 'for ([...x,] of [[]]) ;',
          });

      fail('for ([...[(x, y)]] of [[[]]]) ;', Context.Empty, {
              source: 'for ([...[(x, y)]] of [[[]]]) ;',
          });

      fail('"use strict"; for ([...[x[yield]]] of [[]]) ;', Context.Empty, {
              source: '"use strict"; for ([...[x[yield]]] of [[]]) ;',
          });

      fail('for ([...{ get x() {} }] of [[[]]]) ;', Context.Empty, {
              source: 'for ([...{ get x() {} }] of [[[]]]) ;',
          });

      fail('"use strict"; for ([...{ x = yield }] of [[{}]]) ;', Context.Empty, {
              source: '"use strict"; for ([...{ x = yield }] of [[{}]]) ;',
          });

      fail('"use strict"; for ([...x[yield]] of [[]]) ;', Context.Empty, {
              source: '"use strict"; for ([...x[yield]] of [[]]) ;',
          });

      fail('for (const [...[ x ] = []] of [[]]) {}', Context.Empty, {
              source: 'for (const [...[ x ] = []] of [[]]) {}',
          });

      fail('for (const [...x = []] of [[]]) {}', Context.Empty, {
              source: 'for (const [...x = []] of [[]]) {}',
          });

      fail('for (const [...{ x } = []] of [[]]) {}', Context.Empty, {
              source: 'for (const [...{ x } = []] of [[]]) {}',
          });

      fail('for (const [...[x], y] of [[1, 2, 3]]) {}', Context.Empty, {
              source: 'for (const [...[x], y] of [[1, 2, 3]]) {}',
          });

      fail('for (const [...x, y] of [[1, 2, 3]]) {}', Context.Empty, {
              source: 'for (const [...x, y] of [[1, 2, 3]]) {}',
          });

      fail('for (const [...{ x }, y] of [[1, 2, 3]]) {}', Context.Empty, {
              source: 'for (const [...{ x }, y] of [[1, 2, 3]]) {}',
          });

      fail('for (let [...[ x ] = []] of [[]]) {}', Context.Empty, {
              source: 'for (let [...[ x ] = []] of [[]]) {}',
          });

      fail('for (let [...x = []] of [[]]) {}', Context.Empty, {
              source: 'for (let [...x = []] of [[]]) {}',
          });

      fail('for (let [...{ x } = []] of [[]]) {}', Context.Empty, {
              source: 'for (let [...{ x } = []] of [[]]) {}',
          });

      fail('"use strict"; for ({ x = yield } of [{}]) ;', Context.Empty, {
              source: '"use strict"; for ({ x = yield } of [{}]) ;',
          });

      fail('"use strict"; for(const x of yield) {}', Context.Empty, {
              source: '"use strict"; for(const x of yield) {}',
          });

      fail('"use strict"; for ({ x: x = yield } of [{}]) ;', Context.Empty, {
              source: '"use strict"; for ({ x: x = yield } of [{}]) ;',
          });

      fail('for ({ x: [(x, y)] } of [{ x: [] }]) ;', Context.Empty, {
              source: 'for ({ x: [(x, y)] } of [{ x: [] }]) ;',
          });

      fail('for ({ x: { get x() {} } } of [{ x: {} }]) ;', Context.Empty, {
              source: 'for ({ x: { get x() {} } } of [{ x: {} }]) ;',
          });

      fail('for (var [...[ x ] = []] of [[]]) {}', Context.Empty, {
              source: 'for (var [...[ x ] = []] of [[]]) {}',
          });

      fail('for (var [...x = []] of [[]]) {}', Context.Empty, {
              source: 'for (var [...x = []] of [[]]) {}',
          });

      fail('for (var [...{ x } = []] of [[]]) {}', Context.Empty, {
              source: 'for (var [...{ x } = []] of [[]]) {}',
          });

      fail('for (var [...[x], y] of [[1, 2, 3]]) {}', Context.Empty, {
              source: 'for (var [...[x], y] of [[1, 2, 3]]) {}',
          });

      fail('for (let x of [], []) {}', Context.Empty, {
              source: 'for (let x of [], []) {}',
          });

      });

    describe('Pass', () => {

          const programs = [
              'for({a=0} of b);',
              'for (let of of ([0])) { }',
              'for (let of of [0]) { }',
              'for (let of; false; ) { }',
              'for (let of, bar; false; ) { }',
              'for (let of = 10; false; ) { }',
              'for (j of x) { foo = j }',
              'for (j of x) { [foo] = [j] }',
              'for (j of x) { var foo = j }',
              'for (j of x) { var [foo] = [j] }',
              'for (j of x) { const [foo] = [j] }',
              'for (j of x) { function foo() {return j} }',
              'for ({j} of x) { foo = j }',
              'for ({j} of x) { let foo = j }',
              'for ({j} of x) { function foo() {return j} }',
              'for (var {j} of x) { foo = j }',
              'for (var {j} of x) { let foo = j }',
              'for (let j of x) { const [foo] = [j] }',
              'for (let j of x) { [foo] = [j] }',
              'for (let {j} of x) { [foo] = [j] }',
              'for (let {j} of x) { foo = j }',
              'for (const {j} of x) { const [foo] = [j] }',
              'for (const {j} of x) { var [foo] = [j] }',
          ];

          for (const arg of programs) {
              it(`${arg}`, () => {
                  t.doesNotThrow(() => {
                      parse(`${arg}`, undefined, Context.Empty);
                  });
              });
          }
      });
  });
