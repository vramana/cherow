import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Miscellaneous - Passing tests', () => {
  const programs = [
    //`/}?/u;`,
    //`/{*/u;`,
    //`/.{.}/;`,
    '004',
    '004',
    '004',
    '077',
    '00',
    '00',
    '05',
    '004',
    '004',
    '004',
    '077',
    '00',
    '00',
    '05',
    '078',
    '0708',
    '019',
    '0719',
    '0782',
    '0790',
    '[ 1 ]',
    'for([a,b[a],{c,d=e,[f]:[g,h().a,(1).i,...j[2]]}] in 3);',
    '1 - 2',
    'a: while (true) { continue a }',
    '({ if: 1 })',
    '!a',
    `{;}
    a();
    {};
    {
        {};
    };
    b();
    {}`,
    'for (var {a, b} in c);',
    '({a: b = c = 1} = 2)',
    'function *a(){yield ++a;}',
    '`$$$`',
    '[...a[1]] = 2;',
    `(function () {
      var a = {
          '1e2000': 1
      };
  }());`,
    '/[a-c]/i',
    `(function () {
    }(1,2,3))`,
    'a: while (true) { break a }',
    `/*a
    b*/ 1`,
    'class a {b(){};c(){};}',
    `var a;
    if (b()) {
        new a(1);
    } else {
        a(2);
    }`,
    '``',
    'a >= b',
    'function a({ b, c }){}',
    `c: {
      a();
      switch (1) {
        case 2:
          b();
          if (a) break c;
          d();
        case 3+4:
          e();
          break;
        default:
          f();
      }
  }`,
    '`${ a + 1 }`;',
    '(1, a.a)();',
    '[a, ...{0: b}] = 1',
    '("a")',
    `var a, b, c, d;
    a = (b(), c(), d()) ? 1 : 2;`,
    '(a) => b',
    //    'function *a(){({get b(){yield}})}',
    '({ *a() {} })',
    'a["b"] = "c";',
    '[, a,,] = 1',
    'a = {"__proto__": 1 }',
    'class a { ; }',
    `function a() {
    }
    function b() {
        return c;
    }
    function d() {
        return void 1;
    }
    function e() {
        return void 2;
    }
    function f() {
        return;
    }
    function g(h, i) {
        j.k(h, i);
        l(h);
        return;
    }
    function m(h, i) {
        j.k(h, i);
        if (h) {
            n(i);
            l(h);
            return h + i;
        }
        return c;
    }
    function o(h, i) {
        j.k(h, i);
        if (h) {
            n(i);
            l(h);
            return void 3;
        }
        return h + i;
    }
    function p(h, i) {
        n(h);
        q(i);
        return void 4;
    }
    function r(h, i) {
        n(h);
        q(i);
        return c;
    }
    function s() {
        return false;
    }
    function t() {
        return null;
    }
    function u() {
        return 5;
    }`,
    `for (var a in b)
    // do not optimize it
    (function () {
      c('d');
    }());`,
    'var eval = 1, arguments = 2',
    'for(var a = 1, b = 2;;);',
    `a(
      b(c + 'd'),
      b('d' + c)
    );`,
    // 'a: c: b: while (true) { continue a; }',
    'class a extends b { constructor() { super() } }',
    'const {a:b} = {}',
    'let a',
    `'use strict';
    var a = {
        delete: 1
    };`,
    `// optimize this
    (function () {
      a('b');
    }());
    try {
    } catch (c) {
    }`,
    '"use strict"; ({ yield() {} })',
    `function a() {
      if (b) {
          let c;
          let d;
          var e;
          var f;
      }
  }`,
    '(function({a = 1}){})',
    `(function () {
      if (true) {
          var a = 1;
      }
  }());`,
    'a++',
    'class a extends b { constructor() { super.c } }',
    '(a)=>{"use strict";}',
    'function* a() {}',
    'while (true) { break }',
    `(function () {
      var a = 1;  // should not hoist this
      arguments[2] = 3;
      (function () {
          eval('');
      }());
  }());`,
    '(class {set a(b) {"use strict";}})',
    `var a = {};
    a.b = 1;
    a.c = 2;
    d.e(a.c);`,
    `(function () {
      (function () {
      }());
  }());`,
    '````',
    'class a { static *[b]() {} }',
    'a && (() => {});',
    'for(let a in [1,2]) 3',
    `(function () {
      a(typeof b !== 'c');
  }());`,
    `(function () {
      void ((a) ? 1 : b);
  }());`,
    `(function(){ return/* Multiline
      Comment */a; })`,
    'let {a} = {}',
    '(yield) => 1;',
    'a++',
    `while (a) {
      {
          b();
          b();
      }
  }`,
    'a( `<span>${b}</span>`,     `<a href="${c}">${d}</a>`  );',
    '// line comment',
    '"use strict";var a = function(){}(b())',
    `(function () {
      (function () {
      }());
  }());`,
    '/* header */ (function(){ var a = 1; }).b(this)',
    'a << b << c',
    '({a,b,} = 1)',
    '{ let a }',
    `(function (a, ...b){});
    (function (...c){});`,
    'a()``',
    `b: for (var a = 1; a < 2; ++a) {
      if (a < 3) continue b;
      c.d(a);
  }`,
    `(function () {
      function arguments() {
        a(arguments);
      }
      a(arguments);
    }());`,
    `+{} / 1`,
    `with({}) {
    };`,
    '(a) => ((b, c) => (a, b, c))',
    '(class {3() {}})',
    'a !== b',
    '({ __proto__() { return 1 }, __proto__: 2 })',
    'if (a) { b() /* Some comment */ }',
    'for(a; a < 1; a++) b(a);',
    'a => ({ b: 1 })',
    'let [{a}] = 1',
    '+ /test/',
    'let {} = 1',
    `(class {;;;
      ;a(){}})`,
    'true;false',
    '({ get "a"() {} })',
    '/[\uD834\uDF06-\uD834\uDF08a-z]/u',
    '[a, a] = 1',
    'class a extends b { c() { [super.d] = e } }',
    '1 + (a(), b(), c())',
    '(a) => a * yield;',
    'a - b',
    'new a()',
    '(a)--',
    `for (;;) {
      if (a) {
          if (b) {
              continue;
          }
          c()  // This should not removed and translation should not occur.
      }
  }`,
    '-->',
    'a(....0)',
    'delete (1, a, 2)',
    '1 instanceof 2',
    '(a = b("100")) != a ',
    'var let',
    `
    var a;
    // compress these

    a = true     && b;
    a = 1        && c.d("a");
    a = 2 * 3    && 4 * b;
    a = 5 == 6   && b + 7;
    a = "e" && 8 - b;
    a = 9 + ""   && b / 10;
    a = -4.5     && 11 << b;
    a = 12        && 13;

    a = false     && b;
    a = NaN       && c.d("f");
    a = 14         && c.d("g");
    a = h && 15 * b;
    a = null      && b + 16;
    a = 17 * 18 - 19 && 20 - b;
    a = 21 == 22   && b / 23;
    a = !"e" && 24 % b;
    a = 25         && 26;

    // don't compress these

    a = b        && true;
    a = c.d("a") && 27;
    a = 28 - b    && "e";
    a = 29 << b   && -4.5;

    a = b        && false;
    a = c.d("f") && NaN;
    a = c.d("g") && 30;
    a = 31 * b    && h;
    a = b + 32    && null;`,
    'function a() {} function a() {}',
    `(/* comment */{
      a: null
  })`,
    'a = { }',
    '/test/ && /test/',
    'a => { return 1; }',
    'a||(b||(c||(d||(e||f))))',
    'for(let a of [1,2]) 3',
    '({})=>1;',
    '({ "a": 1 })',
    `// mangle to the same name 'a'
    c: {
              a("b");
              break c;
    }
    c: {
              a("b");
              break c;
    }`,
    'if (!a) debugger;',
    'a ** b',
    'new a(...b, ...c, ...d);',
    'a = { set b (c) {} } ',
    /*'"\\0"',
  '"\\x05"',
  '"\\x06"',
  '"\\18"',
  '"\\00"',
  '"\\218"',
  '"\\66"',
  '"\\210"',
  `'\\48'`,
  `'\\07'`,
  `'\\168'`,
  `'\\318'`,
  `'\\500'`,
  `'\\160'`,
  `'\\301'`,
  `'\\377'`,*/
    'if (x) function f() { return 23; } else function f() { return 42; }',
    'if (x) function f() {}',
    `var foo = [23]
  -->[0];`,
    'x = -1 <!--x;',
    'if (true) function f() {  } else function _f() {}',
    'if (true) function f() { return "foo"; } else function _f() {}',
    'for (let f of [0]) {}',
    'for (let f; ; ) {}',
    'for (let f; ; ) {}',
    'for (let f in { key: 0 }) {}',
    `(function(f) {
  init = f;
  switch (1) {
    case 1:
      function f() {  }
  }
  after = f;
}(123));`,
    ` try {
  throw {};
} catch ({ f }) {
switch (1) {
  default:
    function f() {  }
}
}
`,
    `{
  function f() {
    return 'first declaration';
  }
}`,
    `{
  function f() { return 'declaration'; }
}`,
    'if (true) function f() {} else function _f() {}',
    'if (false) function _f() {} else function f() { }',
    `for (let f; ; ) {
  if (false) ; else function f() {  }
    break;
  }`,
    `try {
throw {};
} catch ({ f }) {
switch (1) {
case 1:
function f() {  }
}
}`,
    'if (true) function f() {  } else function _f() {}',
    'if (true) function f() {  } else function _f() {}',
    `switch (1) {
  default:
    function f() {  }
}`,
    `try {
  throw {};
} catch ({ f }) {
switch (1) {
  case 1:
    function f() {  }
}
}`,
    `{
  let f = 123;
  switch (1) {
    case 1:
      function f() {  }
  }
  }`,
    `
  for (let f in { key: 0 }) {
  switch (1) {
    case 1:
      function f() {  }
  }
  }`
  ];

  for (const arg of programs) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
});
