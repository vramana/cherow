import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - For', () => {

  describe('Failure', () => {

    const programs = [
        'for ((i in {}));',
        'for (i + 1 in {});',
        'for (+i in {});',
        'for (let [];;);',
        'for (let [a = 0];;);',
        'for (let a = 0, [];;);',
        'for (let [] = 0, [];;);',
        'for (let {};;);',
        'for (let {a = 0};;);',
        'for (let a = 0, {};;);',
        'for (let [] = 0, {};;);',
    ];

    for (const arg of programs) {
        it(`${arg}`, () => {
            t.throws(() => {
                parse(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    fail('for(const x,y = 1; ; ) {}', Context.Empty, {
          source: 'for(const x,y = 1; ; ) {}',
      });

    fail('for (let [...x = []] = []; a < 1; ) {}', Context.Empty, {
          source: 'for (let [...x = []] = []; a < 1; ) {}',
      });

    fail('for (let [...{ x } = []] = []; a < 1; ) {}', Context.OptionsNext, {
          source: 'for (let [...{ x } = []] = []; a < 1; ) {}',
      });

    fail('for(;;){ a: continue a; }', Context.OptionsNext, {
        source: 'for(;;){ a: continue a; }',
      });

    fail('for (let [...{ x } = []] = []; a < 1; ) {}', Context.OptionsNext, {
          source: 'for (let [...{ x } = []] = []; a < 1; ) {}',
      });

    fail('for (var a in arr;1;){ break; }', Context.Empty, {
          source: 'for (var a in arr;1;){ break; }',
      });

    fail('for(index=0; index<10; index++; index--) ;', Context.Empty, {
          source: 'for(index=0; index<10; index++; index--) ;',
      });

    fail('for(var index=0; index<100; {index++; index*2;}) {	arr.add(""+index);};', Context.Empty, {
          source: 'for(var index=0; index<100; {index++; index*2;}) {	arr.add(""+index);};',
      });

    fail('for ( ; false; ) class C {}', Context.Empty, {
          source: 'for ( ; false; ) class C {}',
      });

    fail('for ( ; false; ) const x = null;', Context.Empty, {
          source: 'for ( ; false; ) const x = null;',
      });

    fail('for ( ; false; ) function f() {}', Context.Empty, {
          source: 'for ( ; false; ) function f() {}',
      });

    fail('for ( ; false; ) function* g() {}', Context.Empty, {
          source: 'for ( ; false; ) function* g() {}',
      });

    fail('for (const [...[ x ] = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...[ x ] = []] = []; iterCount < 1; ) {}',
      });

    fail('for (const [...x = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...x = []] = []; iterCount < 1; ) {}',
      });

    fail('for (const [...{ x } = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...{ x } = []] = []; iterCount < 1; ) {}',
      });

    fail('for (const [...[x], y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...[x], y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (const [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (const [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (let [...[ x ] = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...[ x ] = []] = []; iterCount < 1; ) {}',
      });

    fail('for (let [...x = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...x = []] = []; iterCount < 1; ) {}',
      });

    fail('for (let [...{ x } = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...{ x } = []] = []; iterCount < 1; ) {}',
      });

    fail('for (let [...[x], y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...[x], y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (let [...x, y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...x, y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (let [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (let [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}',
      });

    fail('for (var [...[ x ] = []] = []; iterCount < 1; ) {}', Context.Empty, {
          source: 'for (var [...[ x ] = []] = []; iterCount < 1; ) {}',
      });

    fail('for (const x; false; ) label1: label2: function f() {}', Context.Empty, {
          source: 'for (const x; false; ) label1: label2: function f() {}',
      });

    fail('for ( ; false; ) label1: label2: function f() {}', Context.Empty, {
          source: 'for ( ; false; ) label1: label2: function f() {}',
      });

    fail('for (var x; false; ) label1: label2: function f() {}', Context.Empty, {
          source: 'for (var x; false; ) label1: label2: function f() {}',
      });
  });

  describe('Pass', () => {

    const programs = [
        'for (j=x; j<10; ++j) { foo = j }',
        'for (j=x; j<10; ++j) { [foo] = [j] }',
        'for (j=x; j<10; ++j) { let foo = j }',
        'for (j=x; j<10; ++j) { function foo() {return j} }',
        'for ({j}=x; j<10; ++j) { var [foo] = [j] }',
        'for ({j}=x; j<10; ++j) { let foo = j }',
        'for ({j}=x; j<10; ++j) { const [foo] = [j] }',
        'for ({j}=x; j<10; ++j) { function foo() {return j} }',
        'for (var j=x; j<10; ++j) { foo = j }',
        'for (var {j}=x; j<10; ++j) { var [foo] = [j] }',
        'for (let {j}=x; j<10; ++j) { function foo(){return j} }',
        'for (let j=x; j<10; ++j) { const foo = j }',
        'for (let j=x; j<10; ++j) { let [foo] = [j] }',
        `let = 1;
        for ( let; ; )
          break;`,
        `for (; false; ) let // ASI
          {}`,
          `for (; false; ) let // ASI
          x = 1;`,
        // tests for possible destructuring regression
        'for (var {j}=x; j<10; ++j) { const foo = j }',
        `        for ("boolean" == typeof a && (l = a, a = arguments[s] ||
                {}, s++), "object" == typeof a ||
                g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
        if (null != (e = arguments[s]))
            for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) ||
            (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n)
            ? n : [])
            : o = n && w.isPlainObject(n)
            ? n : {}, a[t] = w.extend(l, o, r))
            : void 0 !== r && (a[t] = r));`
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
