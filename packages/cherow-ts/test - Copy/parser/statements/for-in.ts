import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - For in', () => {

    describe('Failure', () => {
      const invalidDestructuring = [
          'for(var [] = 0 in {});',
          'for(var [,] = 0 in {});',
          'for(var [a] = 0 in {});',
          'for ([...x,] in [[]]) ;',
          'for(var [a = 0] = 0 in {});',
          'for(var [...a] = 0 in {});',
          'for(var [...[]] = 0 in {});',
          'for(var [...[a]] = 0 in {});',
          'for(var {} = 0 in {});',
          'for(var {p: x} = 0 in {});',
          'for(var {p: x = 0} = 0 in {});',
          'for(var {x} = 0 in {});',
          'for(var {x = 0} = 0 in {});',
          'for(let x = 0 in {});',
          'for(let [] = 0 in {});',
          'for(let [,] = 0 in {});',
          'for(let [a] = 0 in {});',
          'for(let [a = 0] = 0 in {});',
          'for(let [...a] = 0 in {});',
          'for(let [...[]] = 0 in {});',
          'for(let [...[a]] = 0 in {});',
          'for(let {} = 0 in {});',
          'for(let {p: x} = 0 in {});',
          'for(let {p: x = 0} = 0 in {});',
          'for(let {x} = 0 in {});',
          'for(let {x = 0} = 0 in {});',
          'for(const x = 0 in {});',
          'for(const [] = 0 in {});',
          'for(const [,] = 0 in {});',
          'for(const [a] = 0 in {});',
          'for(const [a = 0] = 0 in {});',
          'for(const [...a] = 0 in {});',
          'for(const [...[]] = 0 in {});',
          'for(const [...[a]] = 0 in {});',
          'for(const {} = 0 in {});',
          'for(const {p: x} = 0 in {});',
          'for(const {p: x = 0} = 0 in {});',
          'for(const {x} = 0 in {});',
          'for(const {x = 0} = 0 in {});',
          'for(x = 0 in {});',
          'for([] = 0 in {});',
          'for([,] = 0 in {});',
          'for([a] = 0 in {});',
          'for([a = 0] = 0 in {});',
          'for([...a] = 0 in {});',
          'for([...[]] = 0 in {});',
          'for([...[a]] = 0 in {});',
          'for({} = 0 in {});',
          'for({p: x} = 0 in {});',
          'for({p: x = 0} = 0 in {});',
          'for({x} = 0 in {});',
          'for({x = 0} = 0 in {});',
          'for(o.p = 0 in {});',
          'for(o[0] = 0 in {});',
          'for(f() = 0 in {});',
      ];

      for (const arg of invalidDestructuring) {
          it(`${arg}`, () => {
              t.throws(() => {
                  parse(`${arg}`, undefined, Context.Empty);
              });
          });
      }

      const invalidSyntax = [
          '"use strict"; for (var [ v , c ] = 0 in undefined) { }',
          '"use strict"; for (var {a: []} = 2 in []) { }',
          'for (x => 0 in 1;;) break;',
          '"use strict"; for (var [x] = x in y) var x;',
          '"use strict"; for (var [arguments] = ({ get y(){} }) in y ) (x);',
          'for (var i, j in {}) {}',
          'for (var i, j in [1, 2, 3]) {}',
          'for (var i, j = 1 in {}) {}',
          'for (var i, j = void 0 in [1, 2, 3]) {}',

          'for (let i, j in {}) {}',
          'for (let i, j in [1, 2, 3]) {}',
          'for (let i, j = 1 in {}) {}',
          'for (let i, j = void 0 in [1, 2, 3]) {}',

          'for (const i, j in {}) {}',
          'for (const i, j in [1, 2, 3]) {}',
          'for (const i, j = 1 in {}) {}',
          'for (const i, j = void 0 in [1, 2, 3]) {}',
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
      fail('for(const x = 4, y in [1,2,3]) {}', Context.Empty, {
            source: 'for(const x = 4, y in [1,2,3]) {}',
        });

      fail('for (this in {}) {};', Context.Empty, {
            source: 'for (this in {}) {}',
        });

      fail('for(const x,y of []) {}', Context.Empty, {
            source: 'for(const x,y in []) {}',
        });

      fail('for(x in {__arr;}){ break ; };', Context.Empty, {
            source: 'for(x in {__arr;}){ break ; };',
        });

      fail('for (var of [1, 2, 3]) {}', Context.Empty, {
            source: 'for (var of [1, 2, 3]) {}',
        });

      fail('for (var of [1, 2, 3]) {}', Context.Empty, {
            source: 'for (var of [1, 2, 3]) {}',
        });

      fail('for (var in {}) {}', Context.Empty, {
            source: 'for (var in {}) {}',
        });

      fail('for (let i = 1 in {}) {}', Context.Empty, {
            source: 'for (let i = 1 in {}) {}',
        });

      fail('for (let i = void 0 in [1, 2, 3]) {}', Context.Empty, {
            source: 'for (let i = void 0 in [1, 2, 3]) {}',
        });

      fail('for (const i = void 0 in [1, 2, 3]) {}', Context.Empty, {
            source: 'for (const i = void 0 in [1, 2, 3]) {}',
        });

      fail('"for (var i = void 0 in [1, 2, 3]) {}', Context.Empty, {
            source: '"for (var i = void 0 in [1, 2, 3]) {}',
        });

      fail('"use strict"; for (var i = 1 in {}) {}', Context.Empty, {
            source: '"use strict"; for (var i = 1 in {}) {}',
        });

      fail('function foo() { for (let i, j = 1 in {}) {} }', Context.Empty, {
            source: 'function foo() { for (let i, j = 1 in {}) {} }',
        });

      fail('function foo() { for (const i, j = void 0 in [1, 2, 3]) {} }', Context.Empty, {
            source: 'function foo() { for (const i, j = void 0 in [1, 2, 3]) {} }',
        });

      fail('for (x=0 in y);', Context.Empty, {
            source: 'for (x=0 in y);',
        });
      fail('for (var x = y = z in q);', Context.Empty, {
            source: 'for (var x = y = z in q);',
        });

      fail('for (x=0 in y);', Context.Empty, {
            source: 'for (x=0 in y);',
        });

      fail('for (var a = b = c = (d in e) in z);', Context.Empty, {
            source: 'for (var a = b = c = (d in e) in z);',
        });

      fail('"use strict"; for(var [,] = 0 in {});', Context.Empty, {
            source: '"use strict"; for(var [,] = 0 in {});',
        });

      fail('for(let ? b : c in 0);', Context.Empty, {
            source: 'for(let ? b : c in 0);',
        });

      fail('for (a 12 b; 12) break;', Context.Empty, {
            source: 'for (a 12 b; 12) break;',
        });

      fail('for (a in b 5', Context.Empty, {
            source: 'for (a in b 5',
        });

      fail('for (var a, b in e) break;', Context.Empty, {
            source: 'for (var a, b in e) break;',
        });

      fail('for (const x = 0 in {});', Context.Empty, {
          source: 'for (const x = 0 in {});',
      });

      fail('for (let x = 0 in {});', Context.Empty, {
          source: 'for (let x = 0 in {});',
      });

      fail('for (a=12 in e) break;', Context.Empty, {
            source: 'for (a=12 in e) break;',
        });

      fail('for (var [arguments] = ({ get y(){} }) in y ) (x);', Context.Empty, {
         source: 'for (var [arguments] = ({ get y(){} }) in y ) (x);',
      });

      fail('for (0 = 0 in {});', Context.Empty, {
            source: 'for (0 = 0 in {});',
        });

      fail('for (i++ = 0 in {});', Context.Empty, {
            source: 'for (i++ = 0 in {});',
        });

      fail('for(let a = 0 in b);', Context.Empty, {
            source: 'for(let a = 0 in b);',
        });

      fail('for(const a = 0 in b);', Context.Empty, {
            source: 'for(const a = 0 in b);',
        });

      fail('for(let ? b : c in 0);', Context.Empty, {
            source: 'for(let ? b : c in 0);',
        });

      fail('for(({a}) in 0);', Context.Empty, {
            source: 'for(({a}) in 0);',
        });

      fail('for(([a]) in 0);', Context.Empty, {
            source: 'for(([a]) in 0);',
        });

      fail('for(let a = 0 of b);', Context.Empty, {
           source: 'for(let a = 0 of b);',
      });

      fail('for(const a = 0 of b);', Context.Empty, {
        source: 'for(const a = 0 of b);',
      });

      fail('for(let ? b : c in 0);', Context.Empty, {
            source: 'for(let ? b : c in 0);',
        });

      fail('for (var i, j in {}) {}', Context.Empty, {
            source: 'for (var i, j in {}) {}',
        });

      fail('for (var i, j in [1, 2, 3]) {}', Context.Empty, {
            source: 'for (var i, j in [1, 2, 3]) {}',
        });

      fail('for (var i, j = 1 in {}) {}', Context.Empty, {
            source: 'for (var i, j = 1 in {}) {}',
        });

      fail('for (var i, j = void 0 in [1, 2, 3]) {}', Context.Empty, {
            source: 'for (var i, j = void 0 in [1, 2, 3]) {}',
        });

      fail('for (let i, j in {}) {}', Context.Empty, {
            source: 'for (let i, j in {}) {}',
        });

      fail('for (let i, j in [1, 2, 3]) {}', Context.Empty, {
            source: 'for (let i, j in [1, 2, 3]) {}',
        });

      fail('for (const i, j in [1, 2, 3]) {}', Context.Empty, {
            source: 'for (const i, j in [1, 2, 3]) {}',
        });

      fail('for (const i, j = 1 in {}) {}', Context.Empty, {
            source: 'for (const i, j = 1 in {}) {}',
        });

      fail('function foo() { for (var i, j of {}) {} }', Context.Empty, {
            source: 'function foo() { for (var i, j of {}) {} }',
        });

      fail('for (var i, j in [1, 2, 3]) {}', Context.Empty, {
            source: 'for (var i, j in [1, 2, 3]) {}',
        });

      fail('for (var i, j = 1 in {}) {}', Context.Empty, {
            source: 'for (var i, j = 1 in {}) {}',
        });

      fail('"use strict"; for ([ x = yield ] in [[]]) ;', Context.Empty, {
            source: '"use strict"; for ([ x = yield ] in [[]]) ;',
        });

      fail('for (var in {}) {}', Context.Empty, {
            source: 'for (var in {}) {}',
        });
      fail('for(([a]) in 0);', Context.Empty, {
            source: 'for(([a]) in 0);',
        });

      fail('for ([[(x, y)]] in [[[]]]) ;', Context.Empty, {
            source: 'for ([[(x, y)]] in [[[]]]) ;',
        });

      fail('"use strict"; for ([[x[yield]]] in [[[]]]) ;', Context.Empty, {
            source: '"use strict"; for ([[x[yield]]] in [[[]]]) ;',
        });

      fail('for ([{ get x() {} }] in [[{}]]) ;', Context.Empty, {
            source: 'for ([{ get x() {} }] in [[{}]]) ;',
        });

      fail('"use strict"; for ([{ x = yield }] in [[{}]]) ;', Context.Empty, {
            source: '"use strict"; for ([{ x = yield }] in [[{}]]) ;',
      });

      fail('"use strict"; for ([ x[yield] ] in [[]]) ;', Context.Empty, {
            source: '"use strict"; for ([ x[yield] ] in [[]]) ;',
        });

      fail('for ([...x, y] in [[]]) ;', Context.Empty, {
            source: 'for ([...x, y] in [[]]) ;',
        });

      fail('for ([...x,] in [[]]) ;', Context.Empty, {
            source: 'for ([...x,] in [[]]) ;',
        });

      fail('for ([...x, ...y] in [[]]) ;', Context.Empty, {
            source: 'for ([...x, ...y] in [[]]) ;',
        });

      fail('for ([...x,] in [[]]) ;', Context.Empty, {
            source: 'for ([...x,] in [[]]) ;',
        });

      fail('for ([...x = 1] in [[]]) ;', Context.Empty, {
          source: 'for ([...x = 1] in [[]]) ;',
      });

      fail('for ([...[(x, y)]] in [[[]]]) ;', Context.Empty, {
            source: 'for ([...[(x, y)]] in [[[]]]) ;',
        });

      fail('"use strict"; for ([...[x[yield]]] in [[]]) ;', Context.Empty, {
            source: '"use strict"; for ([...[x[yield]]] in [[]]) ;',
        });

      fail('for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty, {
            source: 'for ([...{ get x() {} }] in [[[]]]) ;',
        });

      fail('for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty, {
            source: 'for ([...{ get x() {} }] in [[[]]]) ;',
        });

      fail('for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty, {
            source: 'for ([...{ get x() {} }] in [[[]]]) ;',
        });

      fail('"use strict"; for ([...{ x = yield }] in [[{}]]) ;', Context.Empty, {
            source: '"use strict"; for ([...{ x = yield }] in [[{}]]) ;',
        });

      fail('for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty, {
            source: 'for ([...{ get x() {} }] in [[[]]]) ;',
        });

      fail('"use strict"; for ({ yield } in [{}]) ;', Context.Empty, {
         source: '"use strict"; for ({ yield } in [{}]) ;',
         });

      fail('"use strict"; for ({ x = yield } in [{}]) ;', Context.Empty, {
            source: '"use strict"; for ({ x = yield } in [{}]) ;',
        });

      fail('for (const x in {}) label1: label2: function f() {}', Context.Empty, {
            source: 'for (const x in {}) label1: label2: function f() {}',
        });

      fail('for (let x in {}) label1: label2: function f() {}', Context.Empty, {
            source: 'for (let x in {}) label1: label2: function f() {}',
        });

      fail('for (x in {}) label1: label2: function f() {}', Context.Empty, {
            source: 'for (x in {}) label1: label2: function f() {}',
        });
    });

    describe('Pass', () => {

          const programs: any = [
              'for(x in {}, {}) {}',
              'for(var x in {}, {}) {}',
              'for(let x in {}, {}) {}',
              'for(const x in {}, {}) {}',
              'for(const x in [1,2,3]) {}',
              'for(const x = 1; ; ) {}',
              'for([{a=0}] in b);',
              'for({0: a = 1} in []) {}',
              'for(let [a] in []) {}',
              'for(let [a = 1] in []) {}',
              'for(let [a = 1, ...b] in []) {}',
              'for(let {a} in []) {}',
              'for(const {a} in []){}',
              'for(const {a: a} in []){}',
              'for(const {\'a\': a} in []){}',
              'for(const {"a": a} in []){}',
              'for(const {[Symbol.iterator]: a} in []){}',
              'for([a = 1, ...b] in []){}',
              'for({a} in []){}',
              'for({a: a} in []){}',
              'for({\'a\': a} in []){}',
              'for({"a": a} in []){}',
              'for({a=0} in b);',
              'for({[Symbol.iterator]: a} in []){}',
              'for({0: a} in []){}',
              'for({a = 1} in []){}',
              'for ({j} in x) { foo = j }',
              'for ({j} in x) { var [foo] = [j] }',
              'for ({j} in x) { const foo = j }',
              'for (var j in x) { const foo = j }',
              'for (var {j} in x) { let [foo] = [j] }',
              'for (var {j} in x) { function foo() {return j} }',
              'for (let {j} in x) { var foo = j }',
              'for (let {j} in x) { let foo = j }',
              'for (const j in x) { let [foo] = [j] }',
              'for (const {j} in x) { let [foo] = [j] }',
              'for (const {j} in x) { function foo() {return j} }',
          ];

          for (const arg of programs) {
              it(`"use strict"; ${arg}`, () => {
                  t.doesNotThrow(() => {
                      parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                  });
              });

              it(`function foo(){ 'use strict'; ${arg} }`, () => {
                  t.doesNotThrow(() => {
                      parse(`function foo(){ 'use strict'; ${arg} }`, undefined, Context.Empty);
                  });
              });

              it(`${arg}`, () => {
                  t.doesNotThrow(() => {
                      parse(`${arg}`, undefined, Context.Empty);
                  });
              });

              it(`${arg} ${arg}`, () => {
                  t.doesNotThrow(() => {
                      parse(`${arg} ${arg}`, undefined, Context.Empty);
                  });
              });

              it(`async(); ${arg}`, () => {
                  t.doesNotThrow(() => {
                      parse(`async(); ${arg}`, undefined, Context.Empty);
                  });
              });

              it(`function foo() { ${arg} }`, () => {
                  t.doesNotThrow(() => {
                      parse(`function foo() { ${arg} }`, undefined, Context.Empty);
                  });
              });

              it(`if (true) { ${arg} } else ${arg}`, () => {
                  t.doesNotThrow(() => {
                      parse(`if (true) { ${arg} } else ${arg}`, undefined, Context.Empty);
                  });
              });
          }
      });
  });
