import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Miscellaneous - Passing tests', () => {
  const programs = [
    `(function foo(y, z) {{ function x() {} } })(1);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {} } })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) {var x; {function x() {} } })([[1]]);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {}} })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) { var x;{ function x() {} }  })([[1]]);`,
    // Rest parameter shouldn't be shadowed
    `(function foo(...x) { var x; {  function x() {}  } })(1);`,
    // Don't shadow complex rest parameter
    `(function foo(...[x]) { var x; { function x() {} } })(1);`,
    // Hoisting is not affected by other simple parameters
    `(function foo(y, z) {{function x() {}} })(1);`,
    // Hoisting is not affected by other complex parameters
    ` (function foo([y] = [], z) {{function x() {} } })();`,
    // Should allow shadowing function names
    `{(function foo() { { function foo() { return 0; } } })();}`,
    `{(function foo(...r) { { function foo() { return 0; } } })(); }`,
    `(function foo() { { let f = 0; (function () { { function f() { return 1; } } })(); } })();`,
    `(function foo() { var y = 1; (function bar(x = y) { { function y() {} } })();  })();`,
    `(function foo() { { function f() { return 4; } { function f() { return 5; } } }})()`,
    '(function foo(a = 0) { { let y = 3; function f(b = 0) { y = 2; } f(); } })();',
    '(function conditional() {  if (true) { function f() { return 1; } } else {  function f() { return 2; }} if (false) { function g() { return 1; }}  L: {break L;function f() { return 3; } }})();',
    '(function foo() {function outer() { return f; } { f = 1; function f () {} f = ""; } })();',
    '(function foo(x) { {  function x() {} } })(1);',
    '(function foo([[x]]) { { function x() {}}})([[1]]);',
    'for (true ? "" in cond1() : cond2(); false; ) ;',
    `class B {
      1() { return 1; }
      get 2() { return 2; }
      set 3(_) {}

      static 4() { return 4; }
      static get 5() { return 5; }
      static set 6(_) {}
    }`,
    `var obj = {
      method(yield) {
        return yield;
      }
    };`,
    `(function foo() { { let f = 2; { let y = 3; function f() { y = 2; } f(); } }})();`,
    // rest parameter shouldn't be shadowed
    '(function shadowingRestParameterDoesntBind(...x) { {  function x() {} } })(1);',
    `({});[];
        this.nan;
        1 < 2 > 3 <= 4 >= 5 == 6 != 7 === 8 !== 9;
        1 + 2 - 3 * 4 % 5 / 6 << 7 >> 8 >>> 9;
        this.nan++; ++this.nan; this.nan--; --this.nan;
        1 & 2 | 3 ^ 4 && !5 || ~6;
        1 ? 2 : 3;
        this.nan = 1; this.nan += 2; this.nan -= 3; this.nan *= 4; this.nan /= 5;
        this.nan %= 6; this.nan <<= 7; this.nan >>= 8; this.nan >>>= 9;
        this.nan &= 1; this.nan |= 2; this.nan ^= 3;`,
    `let a = (x => (x, x * 2), 3);
  let b = ((x, y) => (x, x * y), 1);
  let c = (x => x * x)(2);
  let d = (1, 2, 3);`,
    `const regeneratorRuntime = require('regenerator-runtime')

    async function foo() {
      const promises = [ [ 1 ], [ 2 ], [ 3 ] ].map(async ([ number ]) => {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(number)
          }, 1)
        });
      })

      return Promise.all(promises)
    }

    foo().then(function (number) {
      console.log(number)
    });`,
    `class Launcher {

      constructor(projectRoot, preferredRevision, isPuppeteerCore) {
        this._projectRoot = projectRoot;
        this._preferredRevision = preferredRevision;
        this._isPuppeteerCore = isPuppeteerCore;
      }

      async launch(options = {}) {
        const {
          ignoreDefaultArgs = false,
          args = [],
          dumpio = false,
          executablePath = null,
          pipe = false,
          env = process.env,
          handleSIGINT = true,
          handleSIGTERM = true,
          handleSIGHUP = true,
          ignoreHTTPSErrors = false,
          defaultViewport = {width: 800, height: 600},
          slowMo = 0,
          timeout = 30000
        } = options;

        const chromeArguments = [];
        if (!ignoreDefaultArgs)
          chromeArguments.push(...this.defaultArgs(options));
        else if (Array.isArray(ignoreDefaultArgs))
          chromeArguments.push(...this.defaultArgs(options).filter(arg => ignoreDefaultArgs.indexOf(arg) === -1));
        else
          chromeArguments.push(...args);

        let temporaryUserDataDir = null;

        if (!chromeArguments.some(argument => argument.startsWith('--remote-debugging-')))
          chromeArguments.push(pipe ? '--remote-debugging-pipe' : '--remote-debugging-port=0');
        if (!chromeArguments.some(arg => arg.startsWith('--user-data-dir'))) {
          temporaryUserDataDir = await mkdtempAsync(CHROME_PROFILE_PATH);
          chromeArguments.push("");
        }

        let chromeExecutable = executablePath;
        if (!executablePath) {
          const {missingText, executablePath} = this._resolveExecutablePath();
          if (missingText)
            throw new Error(missingText);
          chromeExecutable = executablePath;
        }


        let chromeClosed = false;
        const waitForChromeToClose = new Promise((fulfill, reject) => {
          chromeProcess.once('exit', () => {
            chromeClosed = true;
            // Cleanup as processes exit.
            if (temporaryUserDataDir) {
              removeFolderAsync(temporaryUserDataDir)
                  .then(() => fulfill())
                  .catch(err => console.error(err));
            } else {
              fulfill();
            }
          });
        });
      }
    }`,
    'for (let\n{x} of list) process(x);',
    `async function* f() {
      for await (var x of []) let // ASI
      x = 1;
    }`,
    'arguments--;',
    `let async = function(a){return {bind: "someMethodButIUseString"}};
    async(function (req, res) { }).bind;`,
    'function f() { return 1; } function f() { return 2; }',
    'function a(a, a) {}',
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
    'var x = 42;',
    'var x = function () { this.foo = 42 };',
    '"use strict"; while (true) { let x; this, arguments; }',
    'while (true) { this.f() }',
    'this.foo();',
    '"use strict"; if (foo()) { let x; this.f() }',
    'function foo(x, y) { return x + y; }',
    'with ({}) { block; }',
    '  try {} catch(e) { block; }',
    'var arguments',
    'var foo, eval;',
    'try { } catch (eval) { }',
    'try { } catch (arguments) { }',
    'function foo(arguments) { }',
    'eval = 1;',
    'var foo = eval = 1;',
    '++arguments;',
    'arguments++',
    'var yield;',
    'var foo, yield;',
    'try { } catch (yield) { }',
    'function yield() { }',
    '(function yield() { })',
    'function foo(yield) { }',
    'function foo(bar, yield) { }',
    'yield = 1;',
    'var foo = yield = 1;',
    'yield * 2;',
    '++yield;',
    'yield++;',
    'yield: 34',
    'function yield(yield) { yield: yield (yield + yield(0)); }',
    '({ yield: 1 })',
    '({ get yield() { 1 } })',
    'yield(100)',
    'yield[100]',
    'function not_gen() {var yield;}',
    'function not_gen() {var foo, yield;}',
    'function not_gen() {try { } catch (yield) { }}',
    'function not_gen() {function yield() {}}',
    'function not_gen() {(function yield() { })}',
    'function not_gen() {function foo(yield) { }}',
    'function not_gen() {function foo(bar, yield) { }}',
    'function not_gen() {yield = 1;}',
    'function not_gen() { var foo = yield = 1;}',
    '(function not_gen() {yield * 2;})',
    '(function not_gen() {++yield;})',
    '(function not_gen() {yield++;})',
    '(function not_gen() {function yield(yield) { yield: yield (yield + yield(0)); }})',
    '(function not_gen() {({ yield: 1 })})',
    '(function not_gen() {({ get yield() { 1 } })})',
    '(function not_gen() {yield(100)})',
    '(function not_gen() {yield[100]})',
    'function * gen() { function not_gen() {var yield;} }',
    'function * gen() { function not_gen() {var foo, yield;} }',
    'function * gen() { function not_gen() {try { } catch (yield) { }} }',
    'function * gen() { function not_gen() {function yield() { }} }',
    'function * gen() { function not_gen() {(function yield() { })} }',
    'function * gen() { function not_gen() {function foo(yield) { }} }',
    'function * gen() { function not_gen() {function foo(bar, yield) { }} }',
    'function * gen() { function not_gen() {function * yield() { }} }',
    '(function * gen() { (function not_gen() {yield = 1;}) })',
    '(function * gen() { (function not_gen() {var foo = yield = 1;}) })',
    '(function * gen() { (function not_gen() {yield * 2;}) })',
    '(function * gen() { (function not_gen() {++yield;}) })',
    '(function * gen() { (function not_gen() {yield++;}) })',
    '(function * gen() { (function not_gen() {yield: 34}) })',
    '(function * gen() { (function not_gen() {function yield(yield) { yield: yield (yield + yield(0)); }}) })',
    '(function * gen() { (function not_gen() {({ yield: 1 })}) })',
    '(function * gen() { (function not_gen() {({ get yield() { 1 } })}) })',
    '(function * gen() { (function not_gen() {yield(100)}) })',
    '(function * gen() { (function not_gen() {yield[100]}) })',
    'function * gen() {yield yield 1;}',
    'function * gen() {yield * yield * 1;}',
    'function * gen() {yield 3 + (yield 4);}',
    'function * gen() {yield * 3 + (yield * 4);}',
    'function * gen() {(yield * 3) + (yield * 4);}',
    'function * gen() {({ yield: 1 })}',
    'function * gen() {({ get yield() { } })}',
    // And in assignment pattern computed properties
    'function * gen() {({ [yield]: x } = { })}',
    // Yield without RHS.
    'function * gen() {yield /* comment */}',
    'function * gen() {yield // comment\n}',
    '(function * () {(yield)})',
    '(function * () {[yield]})',
    '(function * () {{yield}})',
    // If there is a newline before the next token, we don't look for RHS.
    '(function * () {yield\nfor (;;) {}})',
    '(function * () {x = class extends (yield) {}})',
    '(function * () {x = class extends f(yield) {}})',
    '(function * () {x = class extends (null, yield) { }})',
    '(function * () {x = class extends (a ? null : yield) { }})',
    'let foo; ',
    'let foo = 0; ',
    'let [foo] = [1]; ',
    'let {foo} = {foo: 2}; ',
    'let {foo=3} = {}; ',
    'var foo; ',
    'var foo = 0; ',
    'var [foo] = [1]; ',
    'var {foo} = {foo: 2}; ',
    'var {foo=3} = {}; ',
    '{ var foo; }; ',
    '{ var foo = 0; }; ',
    '{ var [foo] = [1]; }; ',
    '{ var {foo} = {foo: 2}; }; ',
    '{ var {foo=3} = {}; }; ',
    'function foo() {}; ',
    'function* foo() {}; ',
    'async function foo() {}; ',
    'class foo {}; ',
    'class foo extends null {}; ',
    'function bar() {foo = 42}; ext(bar); ext(foo)',
    'ext(function() {foo++}); ext(foo)',
    'bar = () => --foo; ext(bar); ext(foo)',
    'function* bar() {eval(ext)}; ext(bar); ext(foo)',
    '',
    "'use strict';(function(...args){ return args;})",
    "'use strict';(function(a, ...args){ return args;})",
    "'use strict';(function(...   args){ return args;})",
    "'use strict';(function(a, ...   args){ return args;})",
    "'use strict';(function(...\targs){ return args;})",
    "'use strict';(function(a, ...\targs){ return args;})",
    "'use strict';(function(...\r\nargs){ return args;})",
    "'use strict';(function(a, ...\r\nargs){ return args;})",
    "'use strict';(function(...\rargs){ return args;})",
    "'use strict';(function(a, ...\rargs){ return args;})",
    "'use strict';(function(...\t\n\t\t\n  args){ return args;})",
    "'use strict';(function(a, ...  \n  \n  args){ return args;})",
    "'use strict';(function(...{ length, 0: a, 1: b}){ return args;})",
    "'use strict';(function(...{}){ return args;})",
    "'use strict';(function(...[a, b]){ return args;})",
    "'use strict';(function(...[]){ return args;})",
    'function f() {} function f() {}',
    'function foo() {function  a(b,) {}}',
    'function foo() {function* a(b,) {}}',
    'my_var;',
    'if (true) { let my_var; } my_var;',
    "eval('foo');",
    'function inner2() { my_var; }',
    "function inner2() { eval('foo'); }",
    'var {my_var : a} = {my_var};',
    'let {my_var : a} = {my_var};',
    'const {my_var : a} = {my_var};',
    'var [a, b = my_var] = [1, 2];',
    'var [a, b = my_var] = [1, 2]; my_var;',
    'let [a, b = my_var] = [1, 2];',
    'let [a, b = my_var] = [1, 2]; my_var;',
    'const [a, b = my_var] = [1, 2];',
    'const [a, b = my_var] = [1, 2]; my_var;',
    'var {a = my_var} = {}',
    'var {a: b = my_var} = {}',
    'let {a = my_var} = {}',
    'let {a: b = my_var} = {}',
    'const {a = my_var} = {}',
    'const {a: b = my_var} = {}',
    'a = my_var',
    '',
    'a = my_var',
    'let my_var;',
    'function inner2(a = my_var) { }',
    '(a = my_var) => { }',
    'function inner2({a} = {a: my_var}) { }',
    '[a] = [my_var]',
    '',
    'function inner2([a] = [my_var]) { }',
    '([a] = [my_var]) => { }',
    "function inner2(a = eval('')) { }",
    "(a = eval('')) => { }",
    'try { } catch (my_var) { } my_var;',
    'for (my_var in {}) { my_var; }',
    'for (my_var in {}) { }',
    'for (my_var of []) { my_var; }',
    'for (my_var of []) { }',
    'for ([a, my_var, b] in {}) { my_var; }',
    'for ([a, my_var, b] of []) { my_var; }',
    'for ({x: my_var} in {}) { my_var; }',
    'for ({x: my_var} of []) { my_var; }',
    'for ({my_var} in {}) { my_var; }',
    'for ({my_var} of []) { my_var; }',
    'for ({y, x: my_var} in {}) { my_var; }',
    'for ({y, x: my_var} of []) { my_var; }',
    'for ({a, my_var} in {}) { my_var; }',
    'for ({a, my_var} of []) { my_var; }',
    'for (let my_var in {}) { } my_var;',
    'for (let my_var of []) { } my_var;',
    'for (let [a, my_var, b] in {}) { } my_var;',
    'for (let [a, my_var, b] of []) { } my_var;',
    'for (let {x: my_var} in {}) { } my_var;',
    'for (let {x: my_var} of []) { } my_var;',
    'for (let {my_var} in {}) { } my_var;',
    'for (let {my_var} of []) { } my_var;',
    'for (let {y, x: my_var} in {}) { } my_var;',
    'for (let {y, x: my_var} of []) { } my_var;',
    'for (let {a, my_var} in {}) { } my_var;',
    'for (let {a, my_var} of []) { } my_var;',
    'for (let my_var = 0; my_var < 1; ++my_var) { } my_var;',
    "'use strict'; if (true) { function my_var() {} } my_var;",
    'function inner2(a = my_var) {}',
    'function inner2(a = my_var) { let my_var; }',
    '(a = my_var) => {}',
    '(a = my_var) => { let my_var; }',
    // No pessimistic context allocation:
    'var my_var; my_var;',
    'var my_var;',
    'var my_var = 0;',
    'if (true) { var my_var; } my_var;',
    'let my_var; my_var;',
    'let my_var;',
    'let my_var = 0;',
    'const my_var = 0; my_var;',
    'const my_var = 0;',
    'var [a, my_var] = [1, 2]; my_var;',
    'let [a, my_var] = [1, 2]; my_var;',
    'const [a, my_var] = [1, 2]; my_var;',
    'var {a: my_var} = {a: 3}; my_var;',
    'let {a: my_var} = {a: 3}; my_var;',
    'const {a: my_var} = {a: 3}; my_var;',
    'var {my_var} = {my_var: 3}; my_var;',
    'let {my_var} = {my_var: 3}; my_var;',
    'const {my_var} = {my_var: 3}; my_var;',
    'my_var',
    'my_var;',
    'my_var',
    '',
    'my_var = 5',
    'my_var;',
    'my_var = 5',
    '',
    '[a, my_var, b]',
    'my_var;',
    '[a, my_var, b]',
    '',
    '[a, my_var, b] = [1, 2, 3]',
    'my_var;',
    '[a, my_var, b] = [1, 2, 3]',
    '',
    '{x: my_var}',
    'my_var;',
    '{x: my_var}',
    '',
    '{my_var}',
    'my_var;',
    '{my_var}',
    '',
    `function assert(a, e) {
      if (a !== e)
          throw new Error("Expected: " + e + " but got: " + a);
  }

  function bitAnd(a, b) {
      return a & b;
  }
  noInline(bitAnd);

  var o = { valueOf: () => 0b1101 };

  for (var i = 0; i < 10000; i++)
      assert(bitAnd(0b11, o), 0b1);

  assert(numberOfDFGCompiles(bitAnd) <= 1, true);

  function bitOr(a, b) {
      return a | b;
  }
  noInline(bitOr);

  for (var i = 0; i < 10000; i++)
      assert(bitOr(0b11, o), 0b1111);

  assert(numberOfDFGCompiles(bitOr) <= 1, true);

  function bitXor(a, b) {
      return a ^ b;
  }
  noInline(bitXor);

  for (var i = 0; i < 10000; i++)
      assert(bitXor(0b0011, o), 0b1110);

  assert(numberOfDFGCompiles(bitXor) <= 1, true);`,
    `for (var i = 0; i < 1e6; ++i)
    foo();
for (var i = 0; i < 1e6; ++i)
    shouldBe(get(), 4);
`,
    `function foo() {
      bar = 4;
  }
  function get() {
      return bar;
  }`,
    `var invokeCount = 0;

     Object.defineProperty(Function.prototype, 'prototype', {
         get: function () {
             invokeCount++;
         }
     });

     new Promise(resolve => {
         for (var i = 0; i < 10000; ++i)
             new resolve();

         if (invokeCount != 10000)
             $vm.crash();
     });`,
    `forEach({ length: 5 }, function() {
      for (var i = 0; i < 10; i++) {
          forEach([1], function() {});
      }
  });

  function forEach(a, b) {
      for (var c = 0; c < a.length; c++)
          b();
  }`,
    `function shouldBe(actual, expected)
     {
         if (actual !== expected)
             throw new Error('bad value: ' + actual);
     }
     noInline(shouldBe);

     function test(value)
     {
         return Object.prototype.toString.call(value);
     }
     noInline(test);

     for (var i = 0; i < 1e6; ++i) {
         switch (i % 3) {
         case 0:
             shouldBe(test(null), "[object Null]");
             break;
         case 1:
             shouldBe(test(undefined), "[object Undefined]");
             break;
         case 2:
             shouldBe(test(true), "[object Boolean]");
             break;
         }
     }`,
    `for (var i = 0; i < 1e6; ++i) {
      if (i & 0x1)
          shouldBe(test(null), "[object Null]");
      else
          shouldBe(test(undefined), "[object Undefined]");
  }`,
    `function f(x, y) {
      x.y = y;
  };

  function g(x) {
      return x.y + 42;
  }
  noInline(f);
  noInline(g);

  var x = {};
  var y = {};
  f(x, 42);
  f(y, {});

  while (!numberOfDFGCompiles(g)) {
      optimizeNextInvocation(g);
      if (typeof g(x) !== 'number')
          throw 'failed warming up';
  }

  if (typeof g(y) !== 'string')
      throw 'failed after compilation';`,
    `function __isPropertyOfType(obj, name, type) {
      desc = Object.getOwnPropertyDescriptor(obj, name)
      return typeof type === 'undefined' || typeof desc.value === type;
  }
  function __getProperties(obj, type) {
      let properties = [];
      for (let name of Object.getOwnPropertyNames(obj)) {
          if (__isPropertyOfType(obj, name, type)) properties.push(name);
      }
      let proto = Object.getPrototypeOf(obj);
      while (proto && proto != Object.prototype) {
          Object.getOwnPropertyNames(proto).forEach(name => {
          });
          proto = Object.getPrototypeOf(proto);
      }
      return properties;
  }
  function* __getObjects(root = this, level = 0) {
      if (level > 4) return;
      let obj_names = __getProperties(root, 'object');
      for (let obj_name of obj_names) {
          let obj = root[obj_name];
          yield* __getObjects(obj, level + 1);
      }
  }
  function __getRandomObject() {
      for (let obj of __getObjects()) {
      }
  }
  var theClass = class {
      constructor() {
          if (242487 != null && typeof __getRandomObject() == "object") try {
          } catch (e) {}
      }
  };
  var childClass = class Class extends theClass {
      constructor() {
          var arrow = () => {
              try {
                  super();
              } catch (e) {}
              this.idValue
          };
          arrow()()();
      }
  };
  for (var counter = 0; counter < 1000; counter++) {
      try {
          new childClass();
      } catch (e) {}
  }`,
    `function Hello(y) {
    this.y = y;
    this.x = foo(this.y);
  }
  function foo(z) {
    try {
      for (var i = 0; i < 1; i++) {
        z[i];
      }
    } catch {
    }
  }
  new Hello('a');
  new Hello('a');
  for (let i = 0; i < 100; ++i) {
    new Hello();
  }

  // Busy loop to let the crash reporter have a chance to capture the crash log for the Compiler thread.
  for (let i = 0; i < 1000000; ++i) {
      $vm.ftlTrue();
  }`,
    `function foo(o) {
    for (var i = 0; i < 100; ++i) {
        o.f = o.f;
    }
}

let typedArrays = [
    Uint8Array,
    Uint32Array,
    Uint8Array,
];

for (let constructor of typedArrays) {
    let a = new constructor(0);
    for (let i = 0; i < 10000; i++) {
        foo(a);
    }
}`,
    '[ b, a ] = [ a, b ]',
    `var list = [ 1, 2, 3 ]
var [ a, , b ] = list
[ b, a ] = [ a, b ]`,
    `var obj = { a: 1 }
var list = [ 1 ]
var { a, b = 2 } = obj
var [ x, y = 2 ] = list`,
    `var list = [ 7, 42 ]
var [ a = 1, b = 2, c = 3, d ] = list
a === 7
b === 42
c === 3
d === undefined`,
    `function f ([ name, val ]) {
  console.log(name, val)
}
function g ({ name: n, val: v }) {
  console.log(n, v)
}
function h ({ name, val }) {
  console.log(name, val)
}
f([ "bar", 42 ])
g({ name: "foo", val:  7 })
h({ name: "bar", val: 42 })`,

    'let [a] = [];',

    'let {a:b} = {};',
    'function f([x] = [1]) {};',
    '({f: function({x} = {x: 10}) {}});',
    'f = function({x} = {x: 10}) {};',
    '[a, b] = [b, a];',
    '[ok.v] = 20;',
    'var [x = 10, y, z] = a;',
    '[x = 10, [ z = 10]] = a;',
    'var {x = 10, y = 5, z = 1} = a;',
    'var {x: x = 10, y: y = 10, z: z = 10} = a;',
    'var { x: x = 10 } = x;',
    'var {x, y: y = 10, z} = a;',
    'var {x = 10, y: { z = 10}} = a;',
    'var {x = 10, y: { z }} = a;',
    `function x({a}) {
  try {
    var {b} = a;
  }
  catch([stack]) {
  }
};`,
    '({ responseText: text } = res);',
    'var {x: y, z: { a: b } } = { x: "3", z: { a: "b" } };',
    'function a({x = 10}) {}',
    'function x([ a, b ]){};',
    'function a([x, , [, z]]) {};',
    '(function x({ a, b }){});',
    'function x({ a, b }){};',
    '[a,,b] = array;',
    'var let = a;',
    '(let[a] = b);',
    `(x=1) => x * x;`,
    'for (const {a} of /b/) {}',
    '({ a = 42, [b]: c.d } = e);',
    `const test = ({ t, ...v }) => {
  console.log(t, v);
};`,

    'switch (answer) { case 42: let t = 42; break; }',
    'e => { 42; }',
    'e => ({ property: 42 })',
    '(a, b) => { 42; }',
    '([a, , b]) => 42',
    '(() => {})()',
    '(x=1) => x * x',
    '(a) => 00',
    '(eval = 10) => 42',
    '(eval, a = 10) => 42',
    '(x) => ((y, z) => (x, y, z))',
    'foo((x, y) => {})',
    'x = { method() { } }',
    'x = { method(test) { } }',
    'x = { "method"() { } }',
    'x = { set() { } }',
    'x = { y, z }',
    '[a.r] = b',
    'let [a,,b] = c',
    '({ responseText: text } = res)',
    'const {a} = {}',
    'const [a] = []',
    'let [a] = []',
    'var [a] = []',
    'var {a:b} = {}',
    'class A {get() {}}',
    'class A extends B { static get foo() {}}',
    'class A {set a(v) {}}',
    'class A { static set(v) {};}',
    'class A {*gen(v) { yield v; }}',
    '(class { *static() {} })',
    "class A { get ['constructor']() {} }",
    'class A { foo() {} bar() {}}',
    'class A { get foo() {} set foo(v) {}}',
    'class A { static get foo() {} get foo() {}}',
    'class A { static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}}',
    'var {[x]: y} = {y}',
    'function f({[x]: y}) {}',
    'var x = {*[test]() { yield *v; }}',
    'class A {[x]() {}}',
    'function f([x] = [1]) {}',
    'function f({x} = {x: 10}) {}',
    'f = function({x} = {x: 10}) {}',
    '({f: function({x} = {x: 10}) {}})',
    '({f({x} = {x: 10}) {}})',
    '(class {f({x} = {x: 10}) {}})',
    '(({x} = {x: 10}) => {})',
    'x = function(y = 1) {}',
    'x = { f: function(a=1) {} }',
    'x = { f(a=1) {} }',
    'function f(a, ...b) {}',
    'function x([ a, b ]){}',
    'function x({ a, b }){}',
    '(function x([ a, b ]){})',
    '({ x([ a, b ]){} })',
    '({ a }) => {}',
    '({ a }, ...b) => {}',
    '({ a: [a, b] }, ...c) => {}',
    '({ a: b, c }, [d, e], ...f) => {}',
    '[...a] = b',
    '[a, ...b] = c',
    '[{ a, b }, ...c] = d',
    '[a, ...[b, c]] = d',
    'var [a, ...b] = c',
    'var [{ a, b }, ...c] = d',
    'var [a, ...[b, c]] = d',
    'func(...a)',
    'func(...a, b)',
    '/[a-z]/u',
    'e => yield* 10',
    'var {get} = obj;',
    'var {propName: localVar = defaultValue} = obj',
    'var {propName = defaultValue} = obj',
    'var {get = defaultValue} = obj',
    'var [localVar = defaultValue] = obj',
    '({x = 0} = obj)',
    '({x = 0}) => x',
    '[a, {b: {c = 1}}] = arr',
    'for ({x = 0} in arr);',
    'try {} catch ({message}) {}',
    'class A { static() {} }',
    '`${/\\d/.exec("1")[0]}`',
    'let [x,] = [1]',
    'for (var [name, value] in obj) {}',
    'function foo() { new.target; }',
    '(([,]) => 0)',
    'function foo() { return {arguments} }',
    'function foo() { return {eval} }',
    'function foo() { "use strict"; return {arguments} }',
    'function foo() { return {yield} }',
    'function* foo(a = function*(b) { yield b }) { }',
    'function* foo(a = function* foo() { yield b }) {}',
    'async function f() { for await (x of xs); }',
    'async function f() { for await (var x of xs); }',
    'async function f() { for await (let x of xs); }',
    'async function f() { for\nawait (x of xs); }',
    'f = async function() { for await (x of xs); }',
    'f = async() => { for await (x of xs); }',
    'obj = { async f() { for await (x of xs); } }',
    'class A { async f() { for await (x of xs); } }',
    'for (x of xs);',
    'async function* f() { await a; yield b; }',
    'f = async function*() { await a; yield b; }',
    'obj = { async* f() { await a; yield b; } }',
    'class A { async* f() { await a; yield b; } }',
    'class A { static async* f() { await a; yield b; } }',
    'var gen = { async *method() {} }',
    '3 % 5 ** 1',
    '`a${b=c}d`',
    '`a${await foo}d`',
    'f`x${/foo/}y`',
    'f`x`\n/foo/',
    'foo\n++bar',
    '(x, /y/);',
    'async("foo".bar) => x',
    'async("foo".bar);',
    'async(a);',
    '(foo[x])',
    '(foo.x)',
    'async (foo = yield) => foo',
    'async (foo = yield)',
    'function *f(){ async (foo = yield) }',
    'function *f(){ async (foo = yield x) }',
    'async yield => foo',
    'async (yield) => foo',
    'async \n (a, b, c);',
    'async (a, b, c);',
    '(...[destruct]) => x',
    '(...{destruct}) => x',
    'async(...ident) => x',
    'async(...[destruct]) => x',
    'async(...{destruct}) => x',
    'const [a] = b;',
    'function b([a]){};',
    'function b([a] = b){};',
    '([a]) => b;',
    '([a] = b) => c;',
    '[a] = b;',
    '[{x: y.z}]',
    '[{x: y.z}] = a',
    `[x = y]`,
    `[x = y, z]`,
    `[await = x]`,
    `[x = true]`,
    '[{}]',
    '[{}.foo] = x',
    '[{}[foo]] = x',
    `[x]`,
    `[x, y]`,
    `[x = y]`,
    `[x.y]`,
    `[x.y = z]`,
    `[x + y]`,
    `[this]`,
    '([...x]);',
    '([...x, y]);',
    '([...x+y]);',
    '([...x.y] = z)',
    '(z = [...x.y] = z) => z',
    '[{}.foo]=x',
    '[5[foo]]=x',
    '["x".foo]=x',
    '[`x`.foo]=x',
    `[x]=y`,
    `[x=y]=z`,
    `({"a b c": bar});`,
    `({"a b c"(){}});`,
    `({"a b c": bar}) => x`,
    `({15: bar});`,
    `({15(){}});`,
    `({15: bar}) => x`,
    '({5(){}})',
    '({...x}); ',
    '({...x=y});',
    '({...x.y} = z)',
    '({...x, ...y}); ',
    ' ({...x, y});',
    '({...x+y});',
    '({[foo]: bar} = baz)',
    '({ident: [foo].length} = x)',
    '({ident: [foo].length = x} = x)',
    '[...new x];',
    'const {get = foo} = {}',
    'var {get = defaultValue} = obj',
    'var [localVar = defaultValue] = obj',
    'x = function(y = 1) {}',
    'function inner2(my_var) { my_var; }',
    'function inner2(my_var) { }',
    'function inner2(my_var = 5) { my_var; }',
    'function inner2(my_var = 5) { }',
    'function inner2(...my_var) { my_var; }',
    'function inner2(...my_var) { }',
    'function inner2([a, my_var, b]) { my_var; }',
    'function inner2([a, my_var, b]) { }',
    'function inner2([a, my_var, b] = [1, 2, 3]) { my_var; }',
    'function inner2([a, my_var, b] = [1, 2, 3]) { }',
    'function inner2({x: my_var}) { my_var; }',
    'function inner2({x: my_var}) { }',
    'function inner2({x: my_var} = {x: 0}) { my_var; }',
    'function inner2({x: my_var} = {x: 0}) { }',
    'function inner2({my_var}) { my_var; }',
    'function inner2({my_var}) { }',
    'function inner2({my_var} = {my_var: 8}) { my_var; } ',
    'function inner2({my_var} = {my_var: 8}) { }',
    'my_var => my_var;',
    'my_var => { }',
    '(a) = b;',
    '((a)) = b;',
    'a = ((b)) = c;',
    '(await())',
    '(x);',
    '(a) = 1;',
    '(a.b) = 1;',
    '(a[b]) = 1;',
    '(a.b().c().d) = 1;',
    //'(super.a) = 1;',
    //'(super[a]) = 1;',
    '[x, y] = z;',
    '([x, y] = z);',
    '([x, y] = z) => x;',
    '([[x, y] = z]);',
    '([[x, y] = z]) => x;',
    '([[x, y] = z]) => x;',
    '({x, y} = z);',
    '(a) += 1;',
    '(a.b) += 1;',
    '(a[b]) += 1;',
    '(a.b().c().d) += 1;',
    '(this.a) += 1;',
    '(this[b]) += 1;',
    '(new x);',
    '(delete foo.bar);',
    '({});',
    '(a / b);',
    '(a \n/b/g);',
    '(delete /a/.x);',
    '(delete /a/g.x);',
    '(foo /=g/m.x);',
    '(void /=g/m.x);',
    '(void /=/g/m.x);',
    '([new x]);',
    '([delete foo.bar]);',
    '([{}]);',
    '([a / b]);',
    '([a \n/b/g]);',
    '([delete /a/.x]);',
    '([delete /a/g.x]);',
    '([foo /=g/m.x]);',
    '([void /=g/m.x]);',
    '([void /=/g/m.x]);',
    '(++x);',
    '(++x, y);',
    '(this.a) = 1;',
    '(this[b]) = 1;',
    '(my_var = 5) => my_var;',
    "x({'a':b}=obj);",
    "x({'a':b, 'c':d}=obj);",
    'x({"a":b}=obj);',
    "x({'a':b, c:d}=obj);",
    "x({a:b, 'c':d}=obj);",
    '({"x": y+z})',
    '({ident: [foo, bar].join("")})',
    '({ident: [foo, bar]/x})',
    '({ident: [foo, bar]/x/g})',
    '[...[x].map(y, z)];',
    '(foo, [bar, baz] = doo);',
    '[...[x]/y]',
    '[...{x}/y]',
    '[.../x//y]',
    'function x([a, b]){};',
    'function f([a, {b: []}]) {}',
    'function f({x: [a, {b: []}]}) {}',
    'try {} catch({e=x}){}',
    'try {} catch([e=x]){}',
    'new Foo.Bar',
    'new a.b.c.d',
    'new x().y',
    'new x()();',
    'new x().y + z',
    'new x()[y] = z',
    'new x().y++',
    'delete new x()',
    'delete new x().y',
    'typeof new x()',
    'typeof new x().y',
    'new x().y++',
    'new Foo`bar`',
    'function f([...bar]){}',
    'function f([...bar] = obj){}',
    'function f([foo, ...bar]){}',
    'function f([foo, ...bar] = obj){}',
    'function f([...[a, b]]){}',
    'function f([...[a, b]] = obj){}',
    'function f([x, ...[a, b]]){}',
    'function f([x, ...[a, b]] = obj){}',
    'function f( [a=[...b], ...c]){}',
    'function f( [a=[...b], ...c] = obj){}',
    'function f(a){}',
    'function f(a,b){}',
    'function f([foo,]){}',
    'function f([,]){}',
    'function f([,] = x){}',
    'function f([foo] = x){}',
    'function f([foo,,]){}',
    'function f([foo,,bar] = x){}',
    'function f([foo] = x, b){}',
    'function f([foo], b = y){}',
    'function f([foo] = x, b = y){}',
    'function f(x, [foo]){}',
    'function f(x, [foo] = y){}',
    '[(a)] = 0',
    '[(a) = 0] = 1',
    '[(a.b)] = 0',
    '[a = (b = c)] = 0',
    '[(a = 0)]',
    '({a:(b)} = 0)',
    '({a:(b) = 0} = 1)',
    '({a:(b.c)} = 0)',
    '({a:(b = 0)})',

    'a = { b(c=1) {} }',

    `(function () {
      while (!a || b()) {
          c();
      }
  }());`,
    'a = []',
    `(function () {
      a(typeof b === 'c');
  }());`,
    '(let[let])',
    '({[1*2]:3})',
    'a = { set b (c) {} }',
    '(function(){ return a * b })',
    '[a] = 1',
    '({ false: 1 })',
    '({*yield(){}})',
    `var a = {
      'arguments': 1,
      'eval': 2
  };`,
    'var {a} = 1;',
    'var [a = b] = c',
    'for(a; a < 1;);',
    '(function a() {"use strict";return 1;});',
    `(function(){ return // Comment
      a; })`,
    '/*42*/',
    'function *a(){yield ~1}',
    `with (a)
    // do not optimize it
    (function () {
      b('c');
    }());`,
    '(a,b) => 1 + 2',
    'a = { set true(b) { c = b } }',
    'function a(b, c) { return b-- > c; }',
    `(function () {
      a();
      function a() {
          b.c('d');
      }
      function a() {
          b.c('e');
      }
  }());`,
    'do a(); while (true)',
    'do continue; while(1);',
    `'use strict';
    var a = {
        '10': 1,
        '0x20': 2
    };`,
    `{ throw a/* Multiline
      Comment */a; }`,
    '({} = 1);',
    '({a = 1} = 2)',
    '(a) => { yield + a };',
    `function a() {
      var b = function c() { }
  }`,
    `/*a
    c*/ 1`,
    'function a() {} / 1 /',
    ';;;;',
    'if (a) (function(){})',
    `
    function a([[a = 123] = {abc}] = [{a = 1} = 2] ) {
    function a() {
    class A { await() {(a = b)} }
    b => {}
    (b = [{}]) => {}
    b => {}
    b => {}
    }
      (yield) = 1;
       (yield) = 1;
    var a = ((((c)))) = b;
    ([][[[]]], a, b, c[[]])
    }`,
    '(class { constructor() { super.a } });',
    '// one\n',
    'a => { b: 1 }',
    `/**
    * @type {number}
    */
   var a = 1;`,
    'new a(...b, ...c, ...d);',
    'var [a, ...a] = 1;',
    '__proto__: a',
    `do {
      // do not optimize it
      (function () {
        a('b');
      }());
    } while (c);`,
    'a ** b',
    `a['0'];
    a['1'];
    a['00'];
    a['0x20'];`,
    `while (a) {
      b;
    }`,
    'if (!a) debugger;',
    'var a = class extends (b,c) {};',
    `(class {;;;
      ;
      })`,
    `({
      a,
      a:a,
      a:a=a,
      [a]:{a},
      a:b()[a],
      a:this.a
  } = 1);`,
    `/((((((((((((.))))))))))))\\12/;`,
    `b: {
      if (a) break b;
      c.d("e");
  }`,
    '0xdef',
    `class a {
      constructor() {
      };
      b() {};
  };
  class c {
      constructor(...d) {
      }
      b() {}
  };
  class e extends a {};
  var f = class g {};
  var h = class {};`,
    '((((((((((((((((((((((((((((((((((((((((a.a)))))))))))))))))))))))))))))))))))))))) = 1',
    'a = a += 1',
    '(function*() { yield 1; })',
    'var a, b;',
    '({ a: 1, get a() { } })',
    'a = { __proto__: 1 }',
    'a`hello ${b}`',
    '{do ; while(false); false}',

    '/* assignment */\n a = b',
    'function* a(){(class extends (yield) {});}',
    'function* a(){(class {[yield](){}})};',
    'function f(x = y, [foo] = z){}',
    'function f(x = y, [foo]){}',
    'function f([foo=a]){}',
    'function f([foo=a] = c){}',
    'function f([foo=a,bar]){}',
    'function f([foo=a,bar] = x){}',
    'function f([foo,bar=b]){}',
    'function f([foo,bar=b] = x){}',
    'function f([foo=a,bar=b]){}',
    'function f([a = b = c] = arr){}',
    'call(yield)',
    'function* f(){ yield; }',
    'function* f(){ yield x + y; }',
    'function* f(){ call(yield); }',
    'function* f(){ call(yield x); }',
    'function* f(){ call(yield x + y); }',
    'function f(){ yield; }',
    '5 + yield',
    `function* g() { let x = yield 3; }`,
    `function* g(x) { yield x = 3; }`,
    `function* g(x) { yield x = yield 3; }`,
    '++(x);',
    '++\n(x);',
    '++\n(((x)));',
    '--(x);',
    '--(((x)));',
    '--\n(x);',
    '--\n(((x)));',
    '(x)++;',
    '(x)--;',
    '(((x)))--;',
    'x *\n++y',
    'async function f(){ await\n++c; }',
    'a().b',
    '[.../x/g/y]',
    '(x--);',
    '(x--, y);',
    '(a = 1, b = 2) => x;',
    'wrap({a=b}=c);',
    'foo(.200)',
    '({[x]:y} = z);',
    '(...x) => x',
    '(x, ...y) => x',
    '(x.y)=z',
    '([...x=y])',
    '([x].foo)',
    '([x].foo) = x',
    'log({foo: [bar]});',
    '[...{a = b} = c];',
    'foo, async()',
    'foo(async(), x)',
    'foo(async(x,y,z), a, b)',
    'log(async().foo);',
    '(my_var = 5) => { }',
    '({} + 1);',
    '(x + y) >= z',
    '({"x": 600..xyz} = x)',
    'const [...x] = y',
    '({"x": 600})',
    '({"x": 600..xyz})',
    'async ({} + 1);',
    '[{}.x] = y',
    '[{}[x]] = y',
    '[[][x]] = y',
    '[[].x] = y',
    'for (foo=10;;);',
    'var [let] = x;',
    '({ x: x[Y] } = x);',
    //'for (let=10;;);',
    'result = [x[yield]] = vals;',
    '(...my_var) => my_var;',
    'for ({x=y} in a) b',
    'for ({x=y} of a) b',
    '(...my_var) => { }',
    '([a, my_var, b]) => my_var;',
    'function *g() {x={     ...yield,    };}',
    'function *g() {x={     ...yield yield    };}',
    'function *g() {yield {     ...yield yield    };}',
    'function *g() {x={     ...yield yield,    };}',
    'function *g() {yield {     ...yield yield,    };}',
    'function *g() { yield {...(x,y),}}',
    `for ({x=y} in a) b;`,
    `for ({x=y} of a) b;`,
    '([a, my_var, b]) => { }',
    '([a, my_var, b] = [1, 2, 3]) => my_var;',
    '([a, my_var, b] = [1, 2, 3]) => { }',
    '({x: my_var}) => my_var;',
    'function f() {var f}',
    'function f(x) {{let x}}',
    'function f() {{let f}}',
    'var x; { let x; }',
    '{ let x; } var x;',
    'function *f(){ let f }',
    'x=function *f(){ var f }',
    'x=function *f(){ let f }',
    'x={*f(){ var f }}',
    'x={*f(){ let f }}',
    'async function *f(){ var f }',
    'async function *f(){ let f }',
    'x=async function *f(){ var f }',
    'x=async function *f(){ let f }',
    'x={async *f(){ var f }}',
    'x={async *f(){ let f }}',
    'o = {f(f) { }}',
    'o = {f(x) { function x() {} }}',
    'o = {f(x) { var x; }}',
    'o = {f(){ function x(){} var x = y; }}',
    'class o {f(x) { function x() {} }}',
    'class o {f(f) { }}',
    'class o {f(){ function x(){} var x = y; }}',
    'function f() {{var f}}',
    '({x: my_var}) => { }',
    '[[x = true] = true] = y',
    '[x = true] = y',
    '[[x] = true] = y',
    '[[x = true] = true] = y',
    '({a: x = true} = y)',
    '({"foo": 15..foo}=y)',
    '({a: {x = true} = true} = y)',
    'function *f(){   s = {foo: yield}   }',
    'f = ([xCls = class X {}]) => {}',
    'f = ([cls = class {}]) => {}',
    'f = ([xCls2 = class { name() {} }]) => {}',
    'f = ([xCls2 = class { static name() {} }]) => {}',
    'f = ([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }]) => {}',
    'function* g() {   [...{ x = yield }] = y   }',
    '({x: my_var} = {x: 0}) => my_var;',
    '({x: my_var} = {x: 0}) => { }',
    '({my_var}) => my_var;',
    '({my_var}) => { }',
    '({my_var} = {my_var: 5}) => my_var;',
    '({my_var} = {my_var: 5}) => { }',
    '({a, my_var}) => my_var;',
    '({a, my_var}) => { }',
    '({a, my_var} = {a: 0, my_var: 5}) => my_var;',
    '({a, my_var} = {a: 0, my_var: 5}) => { }',
    '({y, x: my_var}) => my_var;',
    '({y, x: my_var}) => { }',
    '({y, x: my_var} = {y: 0, x: 0}) => my_var;',
    '({y, x: my_var} = {y: 0, x: 0}) => { }',
    'try { } catch (my_var) { my_var; }',
    'try { } catch ([a, my_var, b]) { my_var; }',
    'try { } catch ({x: my_var}) { my_var; }',
    'try { } catch ({y, x: my_var}) { my_var; }',
    'try { } catch ({my_var}) { my_var; }',
    'for (let my_var in {}) { my_var; }',
    'for (let my_var in {}) { }',
    'for (let my_var of []) { my_var; }',
    'for (let my_var of []) { }',
    'for (let [a, my_var, b] in {}) { my_var; }',
    'for (let [a, my_var, b] of []) { my_var; }',
    'for (let {x: my_var} in {}) { my_var; }',
    'for (let {x: my_var} of []) { my_var; }',
    'for (let {my_var} in {}) { my_var; }',
    'for (let {my_var} of []) { my_var; }',
    'for (let {y, x: my_var} in {}) { my_var; }',
    'for (let {y, x: my_var} of []) { my_var; }',
    'for (let {a, my_var} in {}) { my_var; }',
    'for (let {a, my_var} of []) { my_var; }',
    'for (var my_var in {}) { my_var; }',
    'for (var my_var in {}) { }',
    'for (var my_var of []) { my_var; }',
    'for (var my_var of []) { }',
    'for (var [a, my_var, b] in {}) { my_var; }',
    'for (var [a, my_var, b] of []) { my_var; }',
    'for (var {x: my_var} in {}) { my_var; }',
    'for (var {x: my_var} of []) { my_var; }',
    'for (var {my_var} in {}) { my_var; }',
    'for (var {my_var} of []) { my_var; }',
    'for (var {y, x: my_var} in {}) { my_var; }',
    'for (var {y, x: my_var} of []) { my_var; }',
    'for (var {a, my_var} in {}) { my_var; }',
    'for (var {a, my_var} of []) { my_var; }',
    'for (var my_var in {}) { } my_var;',
    'for (var my_var of []) { } my_var;',
    'for (var [a, my_var, b] in {}) { } my_var;',
    'for (var [a, my_var, b] of []) { } my_var;',
    'for (var {x: my_var} in {}) { } my_var;',
    'for (var {x: my_var} of []) { } my_var;',
    'for (var {my_var} in {}) { } my_var;',
    'for (var {my_var} of []) { } my_var;',
    'for (var {y, x: my_var} in {}) { } my_var;',
    'for (var {y, x: my_var} of []) { } my_var;',
    'for (var {a, my_var} in {}) { } my_var;',
    'for (var {a, my_var} of []) { } my_var;',
    'for (let my_var = 0; my_var < 1; ++my_var) { my_var; }',
    'for (var my_var = 0; my_var < 1; ++my_var) { my_var; }',
    'for (var my_var = 0; my_var < 1; ++my_var) { } my_var; ',
    'for (let a = 0, my_var = 0; my_var < 1; ++my_var) { my_var }',
    'for (var a = 0, my_var = 0; my_var < 1; ++my_var) { my_var }',
    'class my_var {}; my_var; ',
    'function my_var() {} my_var;',
    'if (true) { function my_var() {} }  my_var;',
    'function inner2() { if (true) { function my_var() {} }  my_var; }',
    '() => { if (true) { function my_var() {} }  my_var; }',
    'if (true) { var my_var; if (true) { function my_var() {} } }  my_var;',

    ' function  a(b,) {}',
    ' function* a(b,) {}',
    '(function  a(b,) {});',
    '(function* a(b,) {});',
    '(function   (b,) {});',
    '(function*  (b,) {});',
    ' function  a(b,c,d,) {}',
    ' function* a(b,c,d,) {}',
    '(function  a(b,c,d,) {});',
    '(function* a(b,c,d,) {});',
    '(function   (b,c,d,) {});',
    '(function*  (b,c,d,) {});',
    '(b,) => {};',
    '(b,c,d,) => {};',
    'a(1,);',
    'a(1,2,3,);',
    'a(...[],);',
    'a(1, 2, ...[],);',
    'a(...[], 2, ...[],);',

    "'use strict';(function(...[...[a, b, ...c]]){ return args;})",
    "function fn() { 'use strict';} fn(...([1, 2, 3]));",
    "function fn() { 'use strict';} fn(...'123', ...'456');",
    "function fn() { 'use strict';} fn(...new Set([1, 2, 3]), 4);",
    "function fn() { 'use strict';} fn(1, ...[2, 3], 4);",
    "function fn() { 'use strict';} fn(...Array(...[1,2,3,4]));",
    "function fn() { 'use strict';} fn(...NaN);",
    "function fn() { 'use strict';} fn(0, 1, ...[2, 3, 4], 5, 6, 7, ...'89');",
    "function fn() { 'use strict';} fn(0, 1, ...[2, 3, 4], 5, 6, 7, ...'89', 10);",
    "function fn() { 'use strict';} fn(...[0, 1, 2], 3, 4, 5, 6, ...'7', 8, 9);",
    "function fn() { 'use strict';} fn(...[0, 1, 2], 3, 4, 5, 6, ...'7', 8, 9, ...[10]);",
    '{ function foo() {}; }; ',
    '{ function* foo() {}; }; ',
    '{ async function foo() {}; }; ',
    'eval++;',
    '(function let() { })',
    'var let;',
    'var foo, let;',
    'try { } catch (let) { }',
    'function let() { }',
    '(function let() { })',
    'function foo(let) { }',
    'function foo(bar, let) { }',
    'let = 1;',
    'var foo = let = 1;',
    'let * 2;',
    'function f() { let = 1; }',
    'function f() { var foo = let = 1; }',
    '++let;',
    'let++;',
    'let: 34',
    'function let(let) { let: let(let + let(0)); }',
    '({ let: 1 })',
    '({ get let() { 1 } })',
    'let(100)',
    'L: let\nx',
    'L: let\n{x}',
    'function arguments() { }',
    'function arguments() { }',
    'function foo(bar, eval) { }',
    'function arguments() { }',
    '(function f() { 0, function g() { var a; } })();',
    '(function f() { 0, { g() { var a; } } })();',
    '(function f() { 0, class c { g() { var a; } } })();',
    '(function f() { function g() { var a; } })();',
    '(function f() { function g() { { function h() { } } } })();',
    "var x = new new Function('this.x = 42');",
    'var f = (x, y) => x + y;',
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
    'function *a(){({get b(){yield}})}',
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
    `function fn(x) {
      let a = [];
      for (let p in x) {
        a.push(function () { return p; });
      }
      let k = 0;
      for (let q in x) {
        ++k;
      }
    }
    fn({a : [0], b : 1, c : {v : 1}, get d() {}, set e(x) {}});`,
    `function props(x) {
      var array = [];
      for (let p in x) array.push(p);
      return array;
    }`,
    '[a, {b}, c] = obj',
    '[a, {b:d}, c] = obj',
    '[a, {[b]:d}, c] = obj',
    '[a, {[b]: c}, d] = e',
    'null',
    'false',
    'x;"foo"',
    '0x123',
    '0o123',
    '0b1010',
    '0456',
    'this',
    'null\n/foo;',
    'null\n/foo/g;',
    'a<b',
    'a>=b',
    '{b\n++c};',
    'while (true) {b\n++c};',
    '() => b\n++c;',
    'x *\n++y',
    'async function f(){ await\n++c; }',
    'async function f(){ await b\n++c; }',
    'typeof b\n++c;',
    'new b\n++c;',
    'a=b?c:d',
    'a?b:c=d',
    'true\n/foo;',
    'true\n/foo/g;',
    'void a\n/foo/g',
    'x("" + y)',
    'a+b',
    'a-b',
    'a*b',
    'a**b',
    'a|b',
    'a||b',
    'a *= b',
    'yield',
    '5 + yield',
    'log({foo: [bar]} = obj);',
    `switch (true) { default: function g() {} }`,
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
    '[a, a] = 1',
    `stream.end = function (data) {
      if(ended) return
      ended = true
      if(arguments.length) stream.write(data)
      _end() // will emit or queue
      return stream
    }
  `,
    'a instanceof b',
    'a in b',
    '[a, {b:d}, c] = obj',
    '[a, {[b]:d}, c] = obj',
    '[a, {[b]: c}, d] = e',
    'eval; log(eval); eval.foo; eval[foo]; eval.foo = bar; eval[foo] = bar;',
    '[a = [b] = c, {[d]: e}, f] = g',
    'log({foo: [bar]});',
    'log({foo: [bar]} = obj);',
    'a<b',
    'a>=b',
    'function f(){   return;    }',
    '[...{a = b} = c];',
    'arguments; log(arguments); arguments.foo; arguments[foo]; arguments.foo = bar; arguments[foo] = bar;',
    'class a extends b { c() { [super.d] = e } }',
    '1 + (a(), b(), c())',
    '(a) => a * yield;',
    'a - b',
    'new a()',
    'switch (x) { default: class X {} }',
    'switch (x) { case x: class X {} }',
    'try { } finally { class X {} }',
    'try { class X {} } finally {}',
    '{ const y = x }',
    'switch (x) { case x: const y = x }',
    'try { } catch (e) { const y = x }',
    'try { } finally { let y = x }',
    'switch (x) { default: function * f() {} }',
    'switch (x) { case x: function * f() {} }',
    'try { } finally { function * f() {} }',
    'try { } catch (e) { function * f() {} }',
    'switch (x) { default: async function f() {} }',
    'try { } catch (e) { async function f() {} }',
    'switch (x) { default: function f() {} }',
    'switch (x) { case x: function f() {} }',
    'try { } catch (e) { function f() {} }',
    '(a)--',
    `for (;;) {
      if (a) {
          if (b) {
              continue;
          }
          c()  // This should not removed and translation should not occur.
      }
  }`,
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
    `a+(+b<<2)`,
    `1*1;1&&1;1+ +1;x+ ++y;a+ +b*2;a+ +b*2*2*2;a- -b;1+-b;1- --b;a- -b*2;a+(+b<<2);`,
    `(class A {} < 1);`,
    `function test() {
      let ID = "1|123456";
      return (([id, obj]) => ({[id = id.split('|')[1]]: {id: id}}))([ID, {}]);
  }`,
    `function test() {
    let ID = "1|123456";
    return {
        [id = id.split('|')[1]]: id
    }
}`,
    `for (let a, { b } = {};;) {
  let a, { b } = {};

  {
    let a, { b } = {};
  }
}`,
    `for (var a, _ref = {}, b = _ref.b;;) {
  var _a = void 0,
      _ref2 = {},
      _b = _ref2.b;

  {
    var _a2 = void 0,
        _ref3 = {},
        _b2 = _ref3.b;
  }
}`,
    `for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);

  {
    let i = "hello";
  }
}`,
    `for (var i = 0; i < 3; i++) {
  var _i = 'abc';
  console.log(_i);
  {
    var _i2 = "hello";
  }
}`,
    `() => {
  a = 1;
  b = 2;
};`,
    `class UserRepo{
  async get(id) {
      return id;
  }
}`,
    `class UserRepo{
  async notget(id) {
      return id;
  }
}`,
    `(class UserRepo{
  get(id) {
      return id;
  }
})`,
    `function parseArrayInitializer() {
  var elements = [], node = new Node(), restSpread;

  expect('[');

  while (!match(']')) {
      if (match(',')) {
          lex();
          elements.push(null);
          if(match(']')) {
              elements.push(null);
          }
      } else if (match('...')) {
          restSpread = new Node();
          lex();
          restSpread.finishSpreadElement(inheritCoverGrammar(parseAssignmentExpression));

          if (!match(']')) {
              isAssignmentTarget = isBindingElement = false;
              expect(',');
          }
          elements.push(restSpread);
      } else {
          elements.push(inheritCoverGrammar(parseAssignmentExpression));

          if (!match(']')) {
              expect(',');
              if(match(']')) {
                  elements.push(null);
              }
          }
      }
  }
  lex();

  return node.finishArrayExpression(elements);
}`,
    `var funky =
  {
    toString: function()
    {
      Array.prototype[1] = "chorp";
      Object.prototype[3] = "fnord";
      return "funky";
    }
  };
var trailingHoles = [0, funky, /* 2 */, /* 3 */,];
assertEq(trailingHoles.join(""), "0funkyfnord");`,
    `var x = {
	a: "asdf",
	b: "qwerty",
	...(1 > 0 ? { c: "zxcv" } : ""),
	d: 1234
};`,
    `query = {
  ...query,
  $or: [
    {_id: { $in: req.jwt.var}},
    {owner: req.jwt.var2}
  ]
};`,
    'f(a/b,a/b,a.of/b)',
    'yield : 1',
    `if (statement & FUNC_STATEMENT) {
  node.id = (statement & FUNC_NULLABLE_ID) && this.type !== tt.name ? null : this.parseIdent()
  if (node.id && !(statement & FUNC_HANGING_STATEMENT))
    this.checkLVal(node.id, this.inModule && !this.inFunction ? BIND_LEXICAL : BIND_FUNCTION)
}`,
    `/* BEFORE */
pp.parseFunctionStatement = function(node, isAsync, declarationPosition) {
  this.next()
  return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync)
}

/* AFTER */
pp.parseFunctionStatement = function(node, isAsync, declarationPosition) {
  this.next()
  let statementFlags = {isStatement: true, isHanging: !declarationPosition}
  return this.parseFunction(node, statementFlags, false, isAsync)
}`,
    'var AsyncGeneratorFunction = Object.getPrototypeOf(async function* () {}).constructor;',
    `var [ a, , b ] = list
[ b, a ] = [ a, b ]`,
    'for (const {a} of /b/) {}',
    '({ a = 42, [b]: c.d } = e);',
    `const test = ({ t, ...v }) => {
  console.log(t, v);
};`,
    `function a() {
  var e, i, n, a, o = this._tween,
    l = o.vars.roundProps,
    h = {},
    _ = o._propLookup.roundProps;
  if ("object" != (void 0 === l ? "undefined" : t(l)) || l.push) for ("string" == typeof l && (l = l.split(",")), n = l.length; --n > -1;) h[l[n]] = Math.round;
  else for (a in l) h[a] = s(l[a]);
  for (a in h) for (e = o._firstPT; e;) i = e._next, e.pg ? e.t._mod(h) : e.n === a && (2 === e.f && e.t ? r(e.t._firstPT, h[a]) : (this._add(e.t, a, e.s, e.c, h[a]), i && (i._prev = e._prev), e._prev ? e._prev._next = i : o._firstPT === e && (o._firstPT = i), e._next = e._prev = null, o._propLookup[a] = _)), e = i;
  return !1
}`,
    `() => { [a, b] = [1, 2] }`,
    `() => [a, b] = [1, 2]`,
    `() => {
  var _ref = [1, 2];
  a = _ref[0];
  b = _ref[1];
  return _ref;
};`,
    `const { [(() => 1)()]: a, ...rest } = { 1: "a" };`,
    `const foo = {
  1: "a",
  2: "b",
  3: "c",
}`,
    `function isBetween(x, a, b) {
  if (a > b) [a, b] = [b, a];
  return x > a && x < b;
}`,
    `let a = 1;
let b = 2;

[a, b] = [b, a];
  `,
    `function test() {
    let a = 1;
    let b = 2;
    [a, b] = [b, a];
    console.log(a); // 2
    console.log(b); // 2
  }
  `,
    `function foo(...{ length }) {
    return length;
  }`,
    `function foo() {
    for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
      _ref[_key] = arguments[_key];
    }

    var a = _ref[0];
  }`,
    `(function(...[x]) {})`,
    `(function () {
    x;
  });`,
    `const foo = {
    bar: 10,
  }

  let bar = 0;

  if (foo) ({ bar } = foo); // throws an error (see stacktrace below)

  console.log(bar); // should print 10`,
    `const foo = {
    bar: 10,
  }

  let bar = 0;

  if (foo) {
    ({ bar } = foo);
  }

  console.log(bar); // prints 10 `,
    `({i: {...j}} = k);`,
    `({i: [...j]} = k);`,
    `const {
    [({ ...rest }) => {
      let { ...b } = {};
    }]: a,
    [({ ...d } = {})]: c,
  } = {}; `,
    `const {
    a = ({ ...rest }) => {
      let { ...b } = {};
    },
    c = ({ ...d } = {}),
  } = {}; `,
    `var result = "";

  var obj = {
    get foo() {
      result += "foo"
    },
    a: {
      get bar() {
        result += "bar";
      }
    },
    b: {
      get baz() {
        result += "baz";
      }
    }
  };
  `,
    `var { a: { ...bar }, b: { ...baz }, ...foo } = obj;`,
    'a||(b||(c||(d||(e||f))))',
    'for(let a of [1,2]) 3',
    '({})=>1;',
    `var a;
    (a) = {};
    (a.b) = {};
    (a['c']) = {};`,
    `(foo++).test(), (foo++)[0]`,
    `(++a)();
    (a++)();

    new (++a)();
    new (a++)();

    new (++a);
    new (a++);`,
    `(++a)();
    (a++)();
    new (++a)();
    new (a++)();
    new (++a)();
    new (a++)(); `,
    `; 'use strict'; with ({}) {}`,
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
    `// One
    (1);

    /* Two */
    (2);

    (
      // Three
      3
    );

    (/* Four */ 4);`,
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
    `var loopInvariant = shouldBailout ? 6 : 1;
  var GiantPrintArray = [];
  __counter++;;
  function makeArrayLength(x) { if(x < 1 || x > 4294967295 || x != x || isNaN(x) || !isFinite(x)) return 100; else return Math.floor(x) & 0xffff; };;
  function leaf() { return 100; };
  class module1BaseClass { };;
  var obj0 = {};
  var obj1 = {};
  var protoObj1 = {};
  var arrObj0 = {};
  var litObj0 = {prop1: 3.14159265358979};
  var litObj1 = {prop0: 0, prop1: 1};
  var arrObj0 = {};
  var func0 = function(argMath113 = (ary.unshift(f64.length, (obj0.prop0 *= (f64.length && (++ aliasOfobj0.length))), (typeof((new module1BaseClass()))  != null) , 974325168, -140)),...argArr114){
    var uniqobj26 = [''];
    uniqobj26[__counter%uniqobj26.length].toString();
    var uniqobj27 = [''];
    var uniqobj28 = uniqobj27[__counter%uniqobj27.length];
    uniqobj28.toString();
    if((arrObj0.prop1 >> ((typeof obj0.prop1) >> ary[(17)]))) {
      var strvar9 = (strvar7).replace(/a/g, strvar3).concat(((f === argMath113) * ((strvar7).replace(/a/g, strvar3) + ((new module1BaseClass()) << (uic8.length, ((function () {;}) instanceof ((typeof Object == 'function' ) ? Object : Object)), leaf.call(obj0 ))))));
      strvar9 = strvar9.substring((strvar9.length)/3,(strvar9.length)/3);
      argMath113 /=(leaf() ? i8[(26) & 255] : f32[(205) & 255]);
      if(shouldBailout){
        return  'somestring'
      }
      foo(strvar0 >h);
    }
    else {
      var strvar9 = '(' + '%!(þ';
      arrObj0.prop1 =(- 722372450.1);
      strvar3 = strvar9[6%strvar9.length];
      var strvar10 = strvar9;
      strvar10 = strvar10.substring((strvar10.length)/1,(strvar10.length)/4);
      litObj1 = protoObj1;
    }
    return leaf.call(obj1 );
  };
  var func1 = function(){
    var uniqobj29 = {prop0: arrObj0[(6)]};
    var uniqobj30 = Object.create(aliasOfobj0);
    return (h >>>= (typeof(arrObj0.prop1)  == 'object') );
  };
  var func2 = function(){
    function func5 () {
    }
    var uniqobj31 = new func5();
    return (Reflect.construct(module1BaseClass));
  };
  var func3 = function(argMath115,argMath116 = (new func2()).prop1 ){
    class class16 extends module1BaseClass {
      constructor (argMath117){
        super();
        return argMath115;
        var strvar9 = ('!k'+'*y'+';(' + 'õ$' + (typeof(argMath117)  != 'number') );
        strvar9 = strvar9.substring((strvar9.length)/2,(strvar9.length)/2);
        argMath117 /=(typeof(strvar9)  == 'string') ;
      }
      static get func7 (){
        return argMath115;
      }
    }
    class class17 extends module1BaseClass {
      func8 (){
        strvar7 = strvar7[6%strvar7.length];
        if(shouldBailout){
          return  'somestring'
        }
        return -313655691;
      }
      func9 (argMath118,argMath119){
        return g;
      }
      static func10 (argMath120,argMath121 = ('caller' instanceof ((typeof String == 'function' ) ? String : Object)),argMath122,argMath123){
        var strvar9 = strvar0;
        strvar9 = strvar9.substring((strvar9.length)/1,(strvar9.length)/4);
        strvar2 = strvar6.concat(parseInt("0", 18));
  (Object.defineProperty(protoObj1, 'prop1', {writable: true, enumerable: false, configurable: true }));
        protoObj1.prop1 = (argMath122 ^= ('(' + '%!(þ'.indexOf('L' + 'e!*]'.concat(-4.66427488914349E+18))));
        strvar3 = strvar7.concat(func0(((obj1.prop1 !== argMath121)&&(protoObj1.prop1 < argMath120)), ...[ary]));
        strvar1 = '¦' + 'L' + 'e!*]'.concat(-4.66427488914349E+18);
        argMath115 |=((func2.call(litObj1 ) * (strvar4.concat(func1.call(litObj0 )) + ((('caller', ((97735116.1 === -413916238) * (func0.call(protoObj1 , (-78527701 ? 244 : aliasOfobj0.prop0), ary) + func0.call(litObj1 , ui8[(argMath122) & 255], ary))), (-78527701 ? 244 : aliasOfobj0.prop0), (new class16(...(new Set([/^{(?![a7])$/im])))), func0.call(litObj1 , ui8[(argMath122) & 255], ary)) / (f64[(16) & 255] == 0 ? 1 : f64[(16) & 255])) * ('*P!)G#i($©!cLD*'.indexOf('L' + 'e!*]')) + 'caller'))) * (ui8[(132) & 255] + ((argMath122 <= aliasOfobj0.prop1)||(h >= argMath115))) + ('g|,a-' + 'Äá!#,f$.'.concat(ui8[(ui8[(132) & 255]) & 255])).replace(/a/g, '*P!)G#i($©!cLD*'));
        return -822821403.9;
      }
      static func11 (argMath124 = func0.call(obj1 , (argMath115 /= (typeof 614038338)), ary)){
        return argMath124;
        strvar6 = strvar1.concat(212963263.1);
        return obj1.prop0;
      }
    }
    return protoObj1.prop1;
  };
  var func4 = function(){
    var strvar9 = ((strvar3).replace(/a/g, strvar3)).replace(/a/g, strvar5).concat(({59: Math.tan(i16[((Reflect.construct(module1BaseClass))) & 255]), 89: (aliasOfobj0.prop0-- ), prop1: arguments[(((('%oº]!' + 'D!2-!!%)'.indexOf('%oº]!' + 'D!2-!!%)')) >= 0 ? ('%oº]!' + 'D!2-!!%)'.indexOf('%oº]!' + 'D!2-!!%)')) : 0)) & 0XF)], prop2: ((197624368 instanceof ((typeof Array == 'function' ) ? Array : Object)) ? aliasOfobj0.prop0 : ((new RegExp('xyz')) instanceof ((typeof func2 == 'function' ) ? func2 : Object)))}, func0.call(litObj1 , (((obj1.prop0 !== obj0.prop1)||(aliasOfobj0.prop1 !== arrObj0.prop1)) * (func3.call(protoObj1 , ((protoObj1.prop0 * aliasOfobj0.prop1 + 404693627) + (obj1.prop0 ? b : c)), (-- f)) - {prop0: (arguments[(5)] != (~ +null)), prop1: (ary[(((1.13181440134692E+18 >= 0 ? 1.13181440134692E+18 : 0)) & 0XF)] > 'caller')})), ary), (typeof((- (-- h)))  == 'undefined') , 'caller', arrObj0[(11)]));
    class class18 extends module1BaseClass {
      set func12 (argMath125){
        strvar1 = strvar9[2%strvar9.length];
        return -5.25426100452532E+18;
      }
      static func13 (){
        strvar9 = (('C').replace(/a/g, 'Al'+',g'+'(§' + 'rH'.concat((- a))) + f64[(158) & 255]).concat(func2.call(litObj1 ));
  (Object.defineProperty(arrObj0, 'prop1', {writable: true, enumerable: false, configurable: true }));
        arrObj0.prop1 = (ary.push((new module1BaseClass()), ((g < c) * (((obj1.prop0 != protoObj1.prop1) instanceof ((typeof String == 'function' ) ? String : Object)) - 'caller')), ary[(((((obj0.prop0 >>= ((typeof(strvar9)  == 'string')  >> (typeof((1428124786.1 || 65537))  != 'number') )) ? (strvar7 + (new module1BaseClass())) : arrObj0[((((new module1BaseClass()) >= 0 ? (new module1BaseClass()) : 0)) & 0XF)]) >= 0 ? ((obj0.prop0 >>= ((typeof(strvar9)  == 'string')  >> (typeof((1428124786.1 || 65537))  != 'number') )) ? (strvar7 + (new module1BaseClass())) : arrObj0[((((new module1BaseClass()) >= 0 ? (new module1BaseClass()) : 0)) & 0XF)]) : 0)) & 0XF)], protoObj1.prop1, (protoObj1.prop0 = (+ (h <= (typeof(a)  == 'undefined') ))), (new module1BaseClass()), ((arrObj0.prop1 > f)||(obj1.prop1 === obj0.prop0)), (- (-904176182 || (new module1BaseClass()))), ((new EvalError()) instanceof ((typeof Boolean == 'function' ) ? Boolean : Object))))
  ;
        foo(strvar9 <=ui16[(aliasOfobj0.prop0) & 255]);
  (Object.defineProperty(litObj0, 'prop1', {writable: true, enumerable: false, configurable: true }));
        litObj0.prop1 = func1.call(obj0 );
        return c;
      }
      static func14 (argMath126 = -1474167776){
        aliasOfobj0 = aliasOfobj0;
        var fPolyProp = function (o) {
          if (o!==undefined) {
            foo(o.prop0 + ' ' + o.prop1 + ' ' + o.prop2);
          }
        };
        fPolyProp(litObj0);
        fPolyProp(litObj1);
        var u = uic8[(157) & 255];
        strvar6 = strvar9[2%strvar9.length];
        return aliasOfobj0.prop1;
      }
    }
    var reResult1=/[b7]\s((bab{5}b)ab{5}[b7]\B.{2,3}(bab{5}b)ab{5}[b7])\B.{2,3}\S$/giy.exec('ë' + '!%-ó');
    return (- e);
  };
  obj0.method0 = func2;
  obj0.method1 = func4;
  obj1.method0 = func4;
  obj1.method1 = func0;
  arrObj0.method0 = obj0.method1;
  arrObj0.method1 = obj0.method0;
  var ary = new Array(10);
  var i8 = new Int8Array(256);
  var i16 = new Int16Array(256);
  var i32 = new Int32Array(256);
  var ui8 = new Uint8Array(256);
  var ui16 = new Uint16Array(256);
  var ui32 = new Uint32Array(256);
  var f32 = new Float32Array(256);
  var f64 = new Float64Array(256);
  var uic8 = new Uint8ClampedArray(256);
  var IntArr0 = new Array(3891714781164518912,-211,-233335450,-254,-3712761909151716352,-125);
  var IntArr1 = new Array(-16787177,-122,5289710953276506112,801378339);
  var FloatArr0 = [-906952692.9,1079094127,1641249195.1,469889401,253366903,47602878,-2.39038317184132E+16,1735378730,452599975,-1369328911.9,4294967297,true,3];
  var VarArr0 = new Array('g|,a-' + 'Äá!#,f$.',52,65535,-107937989.9,320020907,-885040715,1614381658,-1073741824,-368877680,-324043467,-236,245,-520830189);
  var a = 1003820489;
  var b = -1332123877;
  var c = -2147483648;
  var d = -1.31068708540238E+18;
  var e = -1073741824;
  var f = 2.12692458603562E+18;
  var g = 167;
  var h = 238802008.1;
  var strvar0 = 'ë' + '!%-ó';
  var strvar1 = 'C';
  var strvar2 = '*!.##' + '*7!wm$#ò';
  var strvar3 = '5' + '7++¤';
  var strvar4 = '*!.##' + '*7!wm$#ò';
  var strvar5 = 'ë' + '!%-ó';
  var strvar6 = '¨wn-!' + ',(,!ø!9$';
  var strvar7 = '¦';
  arrObj0[0] = -1407080580;
  arrObj0[1] = 719412803;
  arrObj0[2] = 65926748;
  arrObj0[3] = 452152233;
  arrObj0[4] = 226;
  arrObj0[5] = -428558256.9;
  arrObj0[6] = 233;
  arrObj0[7] = 1246196209;
  arrObj0[8] = -209;
  arrObj0[9] = 119;
  arrObj0[10] = 1469705963;
  arrObj0[11] = 5.34620050916716E+17;
  arrObj0[12] = -1752516530.9;
  arrObj0[13] = 81921649;
  arrObj0[14] = -2846097;
  arrObj0[arrObj0.length-1] = -211;
  arrObj0.length = makeArrayLength(-19);
  ary[0] = 615407621;
  ary[1] = 781935294;
  ary[2] = -3.85437649414981E+18;
  ary[3] = 6.99116715779872E+17;
  ary[4] = -3.0768361833569E+18;
  ary[5] = -975041616;
  ary[6] = 727639621;
  ary[7] = 3;
  ary[8] = -940077420.9;
  ary[9] = -7.97840305667025E+18;
  ary[10] = -5.99650273777425E+18;
  ary[11] = -453161962;
  ary[12] = 322629949;
  ary[13] = 589440925;
  ary[14] = 65536;
  ary[ary.length-1] = -2.14017329086921E+18;
  ary.length = makeArrayLength(191);
  var aliasOfobj0 = obj0;
  var protoObj1 = Object.create(obj1);
  var aliasOfui16 = ui16;;
  var aliasOff64 = f64;;
  obj0.prop0 = -2147483646;
  obj0.prop1 = 3.92652103268391E+18;
  obj0.length = makeArrayLength(5.03496188183646E+18);
  aliasOfobj0.prop0 = 1018907098;
  aliasOfobj0.prop1 = -1207869152;
  aliasOfobj0.length = makeArrayLength(-2147483649);
  obj1.prop0 = 19;
  obj1.prop1 = -224;
  obj1.length = makeArrayLength(-1.82225266528856E+17);
  protoObj1.prop0 = 765228349;
  protoObj1.prop1 = 173;
  protoObj1.length = makeArrayLength(948231166);
  arrObj0.prop0 = 2147483647;
  arrObj0.prop1 = -546151930.9;
  arrObj0.length = makeArrayLength(204);
  IntArr0[IntArr0.length] = 0;
  IntArr0[7] = 1042316273;
  strvar2 = strvar5[1%strvar5.length];
  function func15 (){
  (Object.defineProperty(aliasOfobj0, 'length', {writable: true, enumerable: false, configurable: true }));
    aliasOfobj0.length = makeArrayLength((('(' + '%!(þ').replace('!k'+'*y'+';(' + 'õ$'.concat((VarArr0[(((protoObj1.prop0 >= 0 ? protoObj1.prop0 : 0)) & 0XF)] ? (aliasOfobj0.prop0 > arrObj0.prop0) : aliasOfobj0.prop0)), 'Al'+',g'+'(§' + 'rH').concat(-2147483647).concat((aliasOfobj0.prop0 *= {prop7: ((new protoObj1.method1(...(new Uint8Array([(obj1.prop1, 223, -2.35044197298735E+18)])),...(new Int8Array([FloatArr0])))).prop0  / (2 == 0 ? 1 : 2)), prop6: ('g|,a-' + 'Äá!#,f$.' + i32[(96) & 255]), prop5: (strvar6).replace(strvar3, ('g|,a-' + 'Äá!#,f$.' + i32[(96) & 255])), prop4: g, prop3: 'caller', prop2: (typeof ((-2096320301.9 - h) ? 893681829.1 : func0(...(new Int8Array(['caller'])),...(new Uint8Array([ary]))))), prop1: (1049818279 ? (IntArr1.pop()) : ((strvar0).replace(strvar0, 'ì') < (arrObj0.prop1 ? d : b))), prop0: (VarArr0[(((protoObj1.prop0 >= 0 ? protoObj1.prop0 : 0)) & 0XF)] ? (aliasOfobj0.prop0 > arrObj0.prop0) : aliasOfobj0.prop0)})) >>> ((((++ aliasOfobj0.prop1) * (ui8[((-77142928 instanceof ((typeof Number == 'function' ) ? Number : Object))) & 255] + (911565048 instanceof ((typeof Error == 'function' ) ? Error : Object)))) / ((obj1.method0.call(arrObj0 ) * (new module1BaseClass())) == 0 ? 1 : (obj1.method0.call(arrObj0 ) * (new module1BaseClass())))) !== (e <= obj1.prop0))));
    var uniqobj32 = arrObj0;
    aliasOfobj0.prop0 =(obj1.method0.call(arrObj0 ) * (new module1BaseClass()));
    return uniqobj32.prop1;
  }`,
    `var func1 = function(){
    return ((obj0.prop0 >= g)||(f != e));
  };
  var func2 = function(argMath127,argMath128 = ((protoObj0.prop0 < arrObj0.prop0)&&(g == a)),argMath129,...argArr130){
    func1.call(protoObj0 );
    return (argMath127 = (protoObj0.prop0 ? (typeof(protoObj0.prop0)  != 'boolean')  : ((argMath129 |= (protoObj1.prop0 = (/a/ instanceof ((typeof func0 == 'function' ) ? func0 : Object)))) == ((argMath129 |= argArr130[((((argMath128 = a) >= 0 ? (argMath128 = a) : 0)) & 0XF)]) * func1()))));
  };
  var func3 = function(argMath131,argMath132,argMath133,argMath134){
    return ary[(11)];
  };
  var func4 = function(argMath135,argMath136,argMath137,argMath138 = (((1986526236 - (argMath137 < obj0.prop0)) ? i8[((func1.call(litObj0 ) ? uic8[3.00099759071299E+17] : (argMath137 < obj0.prop0))) & 255] : (typeof(argMath137)  == 'string') ) / ((arrObj0[(((((a >= c)&&(argMath136 < argMath137)) >= 0 ? ((a >= c)&&(argMath136 < argMath137)) : 0)) & 0XF)] >>> i8[((func1.call(litObj0 ) ? uic8[3.00099759071299E+17] : (argMath137 < obj0.prop0))) & 255]) == 0 ? 1 : (arrObj0[(((((a >= c)&&(argMath136 < argMath137)) >= 0 ? ((a >= c)&&(argMath136 < argMath137)) : 0)) & 0XF)] >>> i8[((func1.call(litObj0 ) ? uic8[3.00099759071299E+17] : (argMath137 < obj0.prop0))) & 255])))){
    function func5 () {
    }
    var uniqobj33 = new func5();
    strvar4 = strvar6[6%strvar6.length];
    var func6 = async (argMath139 = (/a/ instanceof ((typeof Boolean == 'function' ) ? Boolean : Object)),argMath140,argMath141) => {
      return     await ('valueOf' in i32);
      }
    return (obj0.length++ );
  };`,
    `var loopInvariant = shouldBailout ? 7 : 10;
  var GiantPrintArray = [];
  __counter++;;
  function makeArrayLength(x) { if(x < 1 || x > 4294967295 || x != x || isNaN(x) || !isFinite(x)) return 100; else return Math.floor(x) & 0xffff; };;
  function leaf() { return 100; };
  class module3BaseClass { };;
  var obj0 = {};
  var protoObj0 = {};
  var obj1 = {};
  var arrObj0 = {};
  var litObj0 = {prop1: 3.14159265358979};
  var litObj1 = {prop0: 0, prop1: 1};
  var arrObj0 = {};
  var func0 = function(argMath142,argMath143,argMath144){
    function func5 (arg0) {
      this.prop0 = arg0;
    }
    var uniqobj34 = new func5(...(new Uint8Array([(typeof(protoObj0.prop0)  != 'boolean') ])));
    if (shouldBailout) {
      (shouldBailout ? (Object.defineProperty(uniqobj34, 'prop0', {get: function() { foo('uniqobj34.prop0 getter'); return 3; }, configurable: true }), (ary.unshift((typeof(obj0.prop0)  == 'boolean') , 'caller', 'caller', (ary[(15)] > (typeof(protoObj0.prop0)  != 'boolean') ), 'caller', 172, (typeof(protoObj0.prop0)  != 'boolean') , (leaf() * ((typeof(protoObj0.prop0)  != 'boolean')  - (585658148 * (obj1.prop0 + 244)))), 'caller', (new module3BaseClass()), ((argMath143 ? a : argMath144) * (a >>>= argMath142) - i32[(argMath143) & 255]), (/a/ instanceof ((typeof Function == 'function' ) ? Function : Object)), (argMath142 === d), (typeof(obj1.prop1)  == 'undefined') , (((new Error('abc')) instanceof ((typeof EvalError == 'function' ) ? EvalError : Object)) * (/a/ instanceof ((typeof Boolean == 'function' ) ? Boolean : Object)) - arrObj0[(((8.79300731813838E+18 >= 0 ? 8.79300731813838E+18 : 0)) & 0XF)])))) : (ary.unshift((typeof(obj0.prop0)  == 'boolean') , 'caller', 'caller', (ary[(15)] > (typeof(protoObj0.prop0)  != 'boolean') ), 'caller', 172, (typeof(protoObj0.prop0)  != 'boolean') , (leaf() * ((typeof(protoObj0.prop0)  != 'boolean')  - (585658148 * (obj1.prop0 + 244)))), 'caller', (new module3BaseClass()), ((argMath143 ? a : argMath144) * (a >>>= argMath142) - i32[(argMath143) & 255]), (/a/ instanceof ((typeof Function == 'function' ) ? Function : Object)), (argMath142 === d), (typeof(obj1.prop1)  == 'undefined') , (((new Error('abc')) instanceof ((typeof EvalError == 'function' ) ? EvalError : Object)) * (/a/ instanceof ((typeof Boolean == 'function' ) ? Boolean : Object)) - arrObj0[(((8.79300731813838E+18 >= 0 ? 8.79300731813838E+18 : 0)) & 0XF)]))));
    }
    litObj1 = protoObj0;
    return (argMath142-- );
  };
  var func1 = function(argMath145 = arguments[(((arguments[(8)] >= 0 ? arguments[(8)] : 0)) & 0XF)],...argArr146){
    class class19 extends module3BaseClass {
      constructor (argMath147){
        super();
        var strvar9 = '!' + '!Î!.';
        strvar9 = strvar9.substring((strvar9.length)/1,(strvar9.length)/2);
        var strvar10 = (strvar9).replace(strvar9, strvar9.concat(((new EvalError()) instanceof ((typeof Boolean == 'function' ) ? Boolean : Object)))).concat(arguments[(((((e *= ('caller' != ((new RegExp('xyz')) instanceof ((typeof Number == 'function' ) ? Number : Object)))) * (strvar9 - func0.call(arrObj0 , strvar9, /[b7]\s((bab{5}b)ab{5}[b7]\B.{2,3}(bab{5}b)ab{5}[b7])\B.{2,3}\S$/giy, arrObj0))) >= 0 ? ((e *= ('caller' != ((new RegExp('xyz')) instanceof ((typeof Number == 'function' ) ? Number : Object)))) * (strvar9 - func0.call(arrObj0 , strvar9, /[b7]\s((bab{5}b)ab{5}[b7]\B.{2,3}(bab{5}b)ab{5}[b7])\B.{2,3}\S$/giy, arrObj0))) : 0)) & 0XF)]);
        var strvar11 = strvar10.concat((obj0.length |= Object.create({prop0: ((-- c) < c), prop1: ary[(((ary[((('caller' >= 0 ? 'caller' : 0)) & 0XF)] >= 0 ? ary[((('caller' >= 0 ? 'caller' : 0)) & 0XF)] : 0)) & 0XF)]}, {})));
        strvar11 = strvar11.substring((strvar11.length)/3,(strvar11.length)/2);
        foo(strvar0 !=='caller');
      }
      func7 (){
        strvar1 = ('!|-bÌ' + '3e).!1)#' + func0.call(arrObj0 , strvar4, /(?=aba)/u, protoObj0)) + 95;
        var uniqobj35 = obj0;
        foo(strvar4 <=(argMath145 != obj0.prop1));
        strvar0 = strvar5[6%strvar5.length];
        return 6.05723310812461E+18;
      }
      func8 (){
  (Object.defineProperty(protoObj0, 'prop0', {writable: true, enumerable: false, configurable: true }));
        protoObj0.prop0 = (typeof(obj0.prop1)  == null) ;
        var uniqobj36 = Object.create(litObj0);
        protoObj0 = arrObj0;
        d >>>=(typeof(obj0.prop1)  == null) ;
  (Object.defineProperty(litObj0, 'prop1', {writable: true, enumerable: false, configurable: true }));
        litObj0.prop1 = 'caller';
        var t = litObj0.prop1;
        return -1499662941;
      }
    }
    return obj1.prop1;
  };
  var func2 = function(argMath148,argMath149 = ((arrObj0.prop1 === obj0.prop1) < 'caller')){
    strvar1 = ('!|-bÌ' + '3e).!1)#' + ((argMath149 === protoObj0.prop0)&&(obj1.prop1 <= obj1.prop1))).concat(argMath149).concat(f32[(5) & 255]).concat('caller');
    return (ary.pop());
  };
  var func3 = function(argMath150 = (arrObj0.prop0 -= func0.call(obj0 , strvar2, /(?:(\b\d))/gu, obj0)),argMath151 = ((Reflect.construct(module3BaseClass)) !== ((Reflect.construct(module3BaseClass)) || ((- (ary.pop())) * (uic8[(126) & 255] - ui32[1379922271.1])))),argMath152){
    b =b;
    var strvar9 = (strvar0).replace(strvar0, '!|-bÌ' + '3e).!1)#');
    strvar9 = strvar9.substring((strvar9.length)/2,(strvar9.length)/3);
    return (((Reflect.construct(module3BaseClass)) !== ((Reflect.construct(module3BaseClass)) || ((- (ary.pop())) * (uic8[(126) & 255] - ui32[1379922271.1])))) % ((typeof(protoObj0.prop0)  != 'string')  != d));
  };
  var func4 = function(){
    return (new module3BaseClass());
  };
  obj0.method0 = func4;
  obj0.method1 = func2;
  obj1.method0 = func1;
  obj1.method1 = obj0.method1;
  arrObj0.method0 = func3;
  arrObj0.method1 = func3;
  var ary = new Array(10);
  var i8 = new Int8Array(256);
  var i16 = new Int16Array(256);
  var i32 = new Int32Array(256);
  var ui8 = new Uint8Array(256);
  var ui16 = new Uint16Array(256);
  var ui32 = new Uint32Array(256);
  var f32 = new Float32Array(256);
  var f64 = new Float64Array(256);
  var uic8 = new Uint8ClampedArray(256);
  var IntArr0 = new Array(2);
  var IntArr1 = new Array(4554491234179054592,-1984102541,-508997199);
  var FloatArr0 = [-1871819643.9,6.76282495191389E+18,-3.3006060977276E+17,1228051174,-3.22270205153071E+18];
  var VarArr0 = [];
  var a = -1584774468;
  var b = -995940768.9;
  var c = -1015463376.9;
  var d = -666696979.9;
  var e = 1930971329;
  var f = -1913719260;
  var g = 4.86890648515894E+18;
  var h = -829613805;
  var strvar0 = 'j';
  var strvar1 = '+!'+'!Û'+'+!' + 'Ò_';
  var strvar2 = '!v$P%' + '*ÉødÐ%#r';
  var strvar3 = '+!'+'!Û'+'+!' + 'Ò_';
  var strvar4 = '$' + 'u¯%¶';
  var strvar5 = '*!'+'G!'+'^d' + '$§';
  var strvar6 = '#8'+'-!'+'+2' + '»#';
  var strvar7 = '!v$P%' + '*ÉødÐ%#r';
  arrObj0[0] = -1482624655;
  arrObj0[1] = -43;`,
    `class class20 extends module3BaseClass {
    constructor (argMath153,argMath154 = 'L'.search(/{{\B.}/imy),argMath155){
      super();
      strvar2 = strvar3 + (arrObj0[((((new module3BaseClass()) >= 0 ? (new module3BaseClass()) : 0)) & 0XF)] ? ((((new Error('abc')) instanceof ((typeof Function == 'function' ) ? Function : Object)) && (2057703681 * -7.37146850884048E+18)) ? arrObj0[((((new module3BaseClass()) >= 0 ? (new module3BaseClass()) : 0)) & 0XF)] : Math.fround((new module3BaseClass()))) : ui32[(129) & 255]);
      // Snippets: NumberES6ops.ecs
      GiantPrintArray.push(Math.clz32.call(module3_localbinding_5));
      GiantPrintArray.push(Number.isInteger(argMath154));
      GiantPrintArray.push(Number.isSafeInteger(argMath155));
      GiantPrintArray.push(Number.isNaN(g));
      GiantPrintArray.push(Number.parseFloat(argMath153));
      GiantPrintArray.push(Number.parseInt(d));
      strvar6 = strvar1[5%strvar1.length];
    }
    func10 (argMath156 = (new module3BaseClass()),argMath157 = IntArr1[(7)],argMath158 = f32[(('caller' >= func4.call(obj0 ))) & 255]){
      protoObj0.method1.call(obj0 , ary, IntArr1[((((arguments[(((module3_localbinding_9 >= 0 ? module3_localbinding_9 : 0)) & 0XF)] * (~ f32[(('caller' >= func4.call(obj0 ))) & 255]) - (typeof 'caller')) >= 0 ? (arguments[(((module3_localbinding_9 >= 0 ? module3_localbinding_9 : 0)) & 0XF)] * (~ f32[(('caller' >= func4.call(obj0 ))) & 255]) - (typeof 'caller')) : 0)) & 0XF)]);
      obj1 = obj0;
      class class21 extends module3BaseClass {
        constructor (argMath159 = (obj0.prop0 = Reflect.has(litObj1, 'method1')),argMath160){
          super();
  (Object.defineProperty(obj0, 'length', {writable: true, enumerable: false, configurable: true }));
          obj0.length = makeArrayLength((module3_localbinding_8 == argMath160));
          if(shouldBailout){
            return  'somestring'
          }
          var strvar9 = ((strvar7).replace((strvar5).replace(strvar5, strvar3), strvar0) + 'caller');
        }
        func12 (argMath161,argMath162,...argArr163){
          return arrObj0.prop1;
        }
        static func13 (){
          strvar4 = strvar2[3%strvar2.length];
          var strvar9 = strvar7;
          return obj0.prop1;
        }
        static func14 (argMath164){
          var uniqobj37 = {prop0: argMath164};
          return -2093757128.9;
        }
        static func15 (argMath165,argMath166,argMath167){
          foo(strvar2 >=(typeof(argMath167)  != 'string') );
          strvar3 = strvar2[0%strvar2.length];
          if(shouldBailout){
            return  'somestring'
          }
          return 296604700.1;
        }
      }
      var uniqobj38 = [obj0, protoObj0, protoObj0, protoObj0];
      uniqobj38[__counter%uniqobj38.length].method0();
      var strvar9 = '!|-bÌ' + '3e).!1)#';
      strvar9 = strvar9.substring((strvar9.length)/4,(strvar9.length)/1);
      function func16 () {
      }
      var uniqobj39 = new func16();
      return (typeof(protoObj0.prop1)  == 'object') ;
    }
    func17 (...argArr168){
      GiantPrintArray.push('strvar3 = ' + (strvar3));
      class class22 {
        constructor (){
          return 1093253266.1;
          if(shouldBailout){
            return  'somestring'
          }
          var strvar9 = strvar3;
        }
        static func19 (){
          protoObj0 = protoObj0;
          var strvar9 = strvar1;
          var strvar10 = '*!'+'G!'+'^d' + '$§';
          strvar10 = strvar10.substring((strvar10.length)/3,(strvar10.length)/2);
          strvar0 = strvar0[5%strvar0.length];
          strvar0 = strvar1[6%strvar1.length];
          arrObj0 = obj1;
          return module3_localbinding_7;
        }
        static get func20 (){
          var uniqobj40 = aliasOflitObj1;
          protoObj0.prop0 *='caller';
          return 1944308860.1;
        }
      }
      var re1 = new RegExp("^(?!.)", "gmyu");
      class class23 extends module3BaseClass {
        constructor (argMath169 = 'caller',argMath170){
          super();
          var strvar9 = 'H' + '%st)';
          if(shouldBailout){
            return  'somestring'
          }
        }
        func22 (...argArr171){
          return 420030876;
        }
        set func23 (argMath172){
          return -258215682.9;
        }
        get func24 (){
          module3_localbinding_5 = protoObj0.prop1;
          foo(strvar5 ===(((new Error('abc')) instanceof ((typeof String == 'function' ) ? String : Object)) != (h = obj0.prop1)));
          if(shouldBailout){
            return  'somestring'
          }
          return module3_localbinding_2;
        }
        func25 (argMath173 = (typeof(module3_localbinding_4)  == 'number') ,argMath174){
          foo(strvar0 ===argMath173);
          return 29;
        }
        static func26 (...argArr175){
          return g;
          litObj1.prop1 = (argArr168 instanceof ((typeof RegExp == 'function' ) ? RegExp : Object));
          return arrObj0.prop0;
        }
        static func27 (argMath176,...argArr177){
          var strvar9 = strvar6;
          return module3_localbinding_13;
        }
      }
      class class24 extends module3BaseClass {
        constructor (){
          super();
          strvar6 = strvar6[2%strvar6.length];
          var id31 = (argArr168.pop());
          return a;
          strvar0 = ('H' + '%st)').replace('H' + '%st)', '+!'+'!Û'+'+!' + 'Ò_'.concat((strvar2 + (1590020348 == -2147483646)))).concat(obj0.method0.call(litObj0 ));
          strvar0 = strvar5[5%strvar5.length];
        }
        func29 (argMath178){
          return -751064752;
        }
        func30 (argMath179,argMath180){
          return module3_localbinding_3;
        }
        static func31 (){
          strvar2 = strvar6.concat((Function('') instanceof ((typeof arrObj0.method1 == 'function' ) ? arrObj0.method1 : Object)));
          var uniqobj41 = litObj1;
          strvar2 = strvar1[6%strvar1.length];
          return -622788875.9;
        }
        static set func32 (argMath181){
          strvar5 = ('w' + '$aP¼').replace('w' + '$aP¼', '#8'+'-!'+'+2' + '»#').concat(arrObj0[(5)]);
  (Object.defineProperty(aliasOflitObj1, 'prop1', {writable: true, enumerable: false, configurable: true }));
          aliasOflitObj1.prop1 = Math.sin(f32[(14) & 255]);
          var strvar9 = strvar1;
          strvar9 = strvar9.substring((strvar9.length)/3,(strvar9.length)/2);
          return -1079151954;
        }
      }
      return arrObj0[((((class24.func32 > class24.func32) >= 0 ? (class24.func32 > class24.func32) : 0)) & 0XF)];
    }
    func33 (){
      class class25 extends module3BaseClass {
        func34 (argMath182,argMath183,argMath184){
          if(shouldBailout){
            return  'somestring'
          }
          module3_localbinding_5 >>=IntArr0[(4)];
          return module3_localbinding_0;
        }
        func35 (argMath185,argMath186 = (new module3BaseClass()),argMath187,argMath188){
          return d;
        }
      }
      protoObj0.length= makeArrayLength((h++ ));
      return ui8[(176) & 255];
    }
    static func36 (argMath189,argMath190){
      strvar5 = '!' + (module3_localbinding_5 < argMath190);
      var strvar9 = strvar4;
      strvar9 = strvar9.substring((strvar9.length)/2,(strvar9.length)/2);
      obj0.method1.call(aliasOflitObj1 , ary, ('caller' ? ('method0' in aliasOflitObj1) : arrObj0[(15)]));
      return parseInt("-1LSQTL0", 33);
    }
  }`,
    `const getState = () => ({});

  const { data: { courses: oldCourses = [] } = {} } = getState();`,
    `const _getState = getState(),
  _getState$data = _getState.data,
  _getState$data2 = _getState$data === void 0 ? {} : _getState$data,
  _getState$data2$cours = _getState$data2.courses,
  oldCourses = _getState$data2$cours === void 0 ? [] : _getState$data2$cours;`,
    `
  let arr = new Array(3);
  /*
   * or
   * let arr = [,,,];
   */
  let arr2 = [...arr];`,
    `const { data: { courses: oldCourses = [] } = {} } = getState();`,
    'x = -1 <!--x;',
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
    `var func1 = function(argMath89 = (b <<= func0.call(obj0 , ary.length, -3)),argMath90,argMath91){
  class class12 extends module1BaseClass {
    constructor (){
      super();
      argMath90 >>=(-4.25417462235087E+17 + func0.call(litObj0 , func0.call(protoObj1 , ('{,ëe,' + 'dx$!Çlm!' + protoObj1.prop1), 'caller'), (e++ )));
      strvar4 = ('{,ëe,' + 'dx$!Çlm!').replace(/a/g, '!Ï'+'µ!'+'5!' + '(!').concat((f ? argMath89 : 65537));
      if(shouldBailout){
        return  'somestring'
      }
    }
    set func6 (argMath92){
      strvar7 = strvar2.concat(-164);
      return 7.55358946502581E+18;
    }
    func7 (argMath93,argMath94 = ((typeof((strvar4.concat(arguments.length) + ('caller' ? strvar4 : i16[(((! g) ? (ary.shift()) : (~ argMath93))) & 255])))  != 'boolean')  * (new module1BaseClass()) + (e <<= (typeof((strvar4.concat(arguments.length) + ('caller' ? strvar4 : i16[(((! g) ? (ary.shift()) : (~ argMath93))) & 255])))  != 'boolean') )),...argArr95){
      var fPolyProp = function (o) {
        if (o!==undefined) {
          foo(o.prop0 + ' ' + o.prop1 + ' ' + o.prop2);
        }
      };
      fPolyProp(litObj0);
      fPolyProp(litObj1);
      return 1322510159;
    }
    get func8 (){
      arrObj0.prop1 %=(('caller' == ui8[(144) & 255]) ^ (obj0.prop1 = (((strvar0).replace(strvar0, strvar2) ? 'caller' : (~ ((-902901476.9 == 65536) ? (obj1.prop0 %= 1271449041.1) : Math.log(b)))) > (ary.slice(13,12)))));
      obj0 = obj1;
      arrObj0.prop4 = (obj0.prop0 >= obj0.prop1);
      strvar1 = strvar7.concat((g === arrObj0.prop1));
      return 653002063.1;
    }
    func9 (argMath96,argMath97 = ((argMath96-- ) * (('caller' << ((argMath89 == b)&&(argMath96 === protoObj1.prop1))) * (arrObj0[(((i8[1260584891.9] >= 0 ? i8[1260584891.9] : 0)) & 0XF)] + argMath96)) + ('caller' instanceof ((typeof EvalError == 'function' ) ? EvalError : Object))),argMath98,argMath99){
      foo(strvar7 !=ui8[(218) & 255]);
      argMath98 = (argMath98 != -170147366.9);
      argMath98 =(! -1624275393);
      argMath99 =(typeof(argMath99)  != 'object') ;
      return c;
    }
  }
  return (obj1.prop1 != b);
};
var func2 = function(argMath100,...argArr101){
  class class13 {
    constructor (){
      c = (('È').replace('È', 'Ã!'+'qÄ'+'U*' + 'é%') ? ((protoObj0.prop1 > arrObj0.prop1)||(argMath100 < argMath100)) : argMath100);
      var uniqobj17 = {51: (true instanceof ((typeof Object == 'function' ) ? Object : Object)), prop0: (911978738 - /.{2,5}/gmy.test('Ø#$!w' + '#z#¨!!%%')), prop2: Object.create(protoObj0, {}), prop3: func1.call(protoObj1 , arrObj0.prop1, obj0, /^bb.\B./giu), prop4: (new module1BaseClass()), prop5: ui16[((911978738 - /.{2,5}/gmy.test('Ø#$!w' + '#z#¨!!%%'))) & 255], prop6: ((+ -3.48024066844604E+17) * (typeof(argMath100)  == 'string')  - (((~ func1.call(protoObj1 , arrObj0.prop1, obj0, /^bb.\B./giu)) & (-2.97013115046733E+18 + (-- arrObj0.prop0))) ? (new module1BaseClass()) : 186))};
    }
    func11 (argMath102 = (ary.shift()),argMath103,argMath104 = ((((arrObj0.prop0 != obj1.prop0)||(arrObj0.prop0 >= arrObj0.prop0)) * ((argArr101[((((Reflect.construct(module1BaseClass)) >= 0 ? (Reflect.construct(module1BaseClass)) : 0)) & 0XF)] <= Math.sqrt((-35 <= ((argMath102 << 2147483647) + (argMath102 = argMath102))))) + ((new module1BaseClass()) === 2147483647))) == argMath103)){
      if(shouldBailout){
        return  'somestring'
      }
      strvar6 = strvar3[0%strvar3.length];
      obj1 = arrObj0;
      return 96152958;
    }
    static set func12 (argMath105 = ((~ (Function('') instanceof ((typeof String == 'function' ) ? String : Object))) ? (obj1.length -= arrObj0.prop0) : e)){
      var strvar9 = ((strvar6).replace(strvar6, strvar5)).replace(strvar6.concat((f + (((new RangeError()) instanceof ((typeof func1 == 'function' ) ? func1 : Object)) ? strvar5 : func1.call(arrObj0 , ((/a/ instanceof ((typeof Error == 'function' ) ? Error : Object)) * ((argMath105 == argMath100) + (- -217))), arrObj0, /(?=\B.)/imy)))), 'È' + 'XvX!');
      strvar9 = strvar9.substring((strvar9.length)/2,(strvar9.length)/4);
      strvar9 = strvar0.concat(func1.call(arrObj0 , ((/a/ instanceof ((typeof Error == 'function' ) ? Error : Object)) * ((argMath105 == argMath100) + (- -217))), arrObj0, /(?=\B.)/imy));
      strvar9 = strvar3 + ary[(2)];
      strvar5 = strvar1 + -84;
      h = argArr101[(15)];
      return 255;
    }
    static func13 (){
      argMath100 = ((protoObj1.prop1 > obj1.prop1) * ((argMath100-- ) - parseInt("-0x32")));
      return argMath100;
    }
    static func14 (argMath106,argMath107,argMath108){
      var strvar9 = strvar7;
      if(shouldBailout){
        return  'somestring'
      }
      strvar9 = 'U$'+'!)'+'(<' + '#õ' + (typeof(strvar7)  == 'object') ;
      argMath106 = obj0.prop0;
      foo(strvar9 !==(argMath108 ? argMath106 : protoObj1.prop0));
      return argMath108;
    }
    static func15 (argMath109 = func1.call(arrObj0 , (Function('') instanceof ((typeof Function == 'function' ) ? Function : Object)), protoObj0, /\w*$/gmy),argMath110,argMath111,...argArr112){
(Object.defineProperty(arrObj0, 'length', {writable: true, enumerable: false, configurable: true }));
      arrObj0.length = makeArrayLength((-- obj0.prop0));
      strvar6 = strvar0[2%strvar0.length];
      strvar5 = (strvar3).replace(strvar3, 'Ã!'+'qÄ'+'U*' + 'é%') + argMath111;
      return protoObj1.prop1;
    }
  }
  var reResult0='%$'+'º{'+'%Ã' + 'ûÛ'.search(/(?=\B.)/imy);
  return (typeof(((strvar7).replace(/a/g, ('È').replace('È', 'Ã!'+'qÄ'+'U*' + 'é%'))).replace((strvar7).replace(/a/g, ('È').replace('È', 'Ã!'+'qÄ'+'U*' + 'é%')), strvar6))  == 'boolean') ;
};
var func3 = function(argMath113,argMath114,argMath115,argMath116 = (argMath115 + argMath113)){
  if((func2.call(arrObj0 , strvar1, ary) && (~ -2147483648))) {
  }
  else {
    return a;
    strvar4 = strvar5[5%strvar5.length];
  }
  return (((- (f64[(68) & 255] ? argMath115 : argMath115)) !== (func0.call(litObj1 , func1.call(protoObj0 , (new func2(strvar4,ary)).prop1 , litObj1, /(?:\s{1,5})/m), arguments[(0)]) ? f64[(68) & 255] : (argMath115 + argMath113))) instanceof ((typeof Error == 'function' ) ? Error : Object));
};
var func4 = function(){
  obj1.prop0 |=(c != d);
  func2.call(arrObj0 , strvar7, ary);
  func1.call(litObj0 , (arrObj0.prop1 %= (func2.call(protoObj1 , strvar2, ary) ? (322427898 < 222) : arrObj0[(((-1719618252.9 >= 0 ? -1719618252.9 : 0)) & 0XF)])), litObj0, /\w*$/gmy);
  return ((typeof(strvar1)  == 'string')  ? i32[(((new module1BaseClass()) ? (+ ((new Error('abc')) instanceof ((typeof Error == 'function' ) ? Error : Object))) : (((new Error('abc')) instanceof ((typeof Error == 'function' ) ? Error : Object)) ? ((i16[(195) & 255]) >= (typeof(arrObj0.prop0)  == 'boolean') ) : (-104 + i32[(53) & 255])))) & 255] : ((((new Error('abc')) instanceof ((typeof Error == 'function' ) ? Error : Object)) ? ((i16[(195) & 255]) >= (typeof(arrObj0.prop0)  == 'boolean') ) : (-104 + i32[(53) & 255])) ^ (typeof('|' + 'w.e!')  != 'undefined') ));
};`,
    `var func0 = function(argMath117,argMath118,argMath119,argMath120 = ('6-Þ!û' + '+Ña¶7(#h'.indexOf((strvar2 + (protoObj1.prop1 ^= ((typeof(argMath119)  == 'number')  >>> 8.75511800249586E+18)))))){
  var strvar9 = strvar3;
  leaf.call(litObj0 );
  return (i16[(165) & 255] || (leaf.call(obj1 ) + argMath120));
};`,
    `{
  function f() {
    return 'first declaration';
  }
}`,
    `function deferredWithRegex() {
  return /[\\uD800\\uDC00\\uFFFF]/.test("\\uFFFF");
}`,
    ` var c = (arg1, arg2) => { return arg1 + arg2; };`,
    `var f = async arg => { return arg }`,
    ` var e = async arg => arg`,
    `var g = async (arg1, arg2) => arg1 + arg2`,

    ` var c = async (yield) => yield;`,
    ` var e = async (a = yield) => { yield };`,
    ` var f = async (a = yield) => yield;`,
    `var a = async (yield) => { yield };`,
    ` function f() {
  var arr = ['a','b','c'];
  arr['constructor'] = Number;
}`,
    `var arr = [1,2,3,4,5,6];`,
    `function foo() {
  var computedEpsilon = (function () {
      var next, result;
      for (next = 1; 1 + next !== 1; next = next / 2) {
          result = next;
      }
      return result;
  }());
}`,
    `function tagReturnConstructor(callsite) {
  switch(callsite[0]) {
      case 'string':
          return String;
      case 'symbol':
          return Symbol;
      case 'array':
          return Array;
      case 'number':
          return Number;
  }

  return function() {
      return {
          name: 'constructed object'
      }
  };
}
function tagReturnConstructorWrapper() {
  return tagReturnConstructor;
}`,
    'new Function("function z() {}; `z`;")();',
    'new Function("function z() {}; `${z}${z}${z}`;")();',
    `function nestedNewOperatorFunction(callsite) {
  if (_counter > 2) {
      return tagReturnNestedConstructorFunction(callsite ? callsite[0] : "");
  } else {
      _counter++;
      return nestedNewOperatorFunction;
  }
}`,
    `if (x/* */--> -1) {}`,
    ` function correctProtoBound(proto) {
  var p = new Proxy(function(){}, {});
  Object.setPrototypeOf(p, proto);
  var boundF = Function.prototype.bind.call(p, null);
  return Object.getPrototypeOf(boundF) === proto;
}`,
    `var await = 0; // shouldn't cause syntax error
if (await !== 0) {
    print('fail');
}`,
    `
function f() {
    "use strict";
    var await = 1;

    if (await !== 1) {
        print('fail');
    }
}
f();`,
    ` class Empty { }
class EmptySemi { ; }
class OnlyCtor { constructor() { p('ctor') } }
class OnlyMethod { method() { p('method') } }
class OnlyStaticMethod { static method() { p('smethod') } }
class OnlyGetter { get getter() { p('getter') } }
class OnlyStaticGetter { static get getter() { p('sgetter') } }
class OnlySetter { set setter(x) { p('setter ' + x) } }
class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } }`,
    ` class Empty { }
class EmptySemi { ; }
class OnlyCtor { constructor() { p('ctor') } }
class OnlyMethod { method() { p('method') } }
class OnlyStaticMethod { static method() { p('smethod') } }
class OnlyGetter { get getter() { p('getter') } }
class OnlyStaticGetter { static get getter() { p('sgetter') } }
class OnlySetter { set setter(x) { p('setter ' + x) } }
class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } }
class OnlyComputedMethod { ["cmethod"]() { p('cmethod') } }
class OnlyStaticComputedMethod { static ["cmethod"]() { p('scmethod') } }
class OnlyComputedGetter { get ["cgetter"]() { p('cgetter') } }
class OnlyStaticComputedGetter { static get ["cgetter"]() { p('scgetter') } }
class OnlyComputedSetter { set ["csetter"](x) { p('csetter ' + x) } }
class OnlyStaticComputedSetter { static set ["csetter"](x) { p('scsetter ' + x) } }
`,
    ` class B extends A {
  constructor() {
    ctorCalls.push('B pre-super');
    super();
    ctorCalls.push('B post-super');
  }
  superMethod()      { return super.method() }
  superMethodIndex() { return super['method'](); }
  getAprop()         { return super.initialized; }
  setAprop(value)    { super.initialized = value; }
  getAIndex()        { return super['initialized']; }
  setAIndex(value)   { super['initialized'] = value; }
  lambdaIndex() {
    var mysuper = x => super[x]();
    return mysuper('method');
  }
}
`,
    `class emptyLiteral extends Object{
  constructor(){
    const bar = {};
    super();
  }
}
class methodLiteral extends Object{
  constructor(){
    const bar = { c () {}};
    super();
  }
}
class functionLiteral extends Object{
  constructor(){
    const bar = { c : function () {}};
    super();
  }
}
class getSetLiteral extends Object{
  constructor(){
    const bar = { hid : 5, get c () {return hid;}, set c (x) { hid = x; }};
    super();
  }
}`,

    ` class A1
{
  method() { return 3; }
};

class A2
{
  method() { return 2; }
}

function GetClassB(Asomething)
{
  class B extends (Asomething)
  {
    method() { return 4; }
    supermethod() { return super.method(); }
  };
  return B;
}

let classB1 = GetClassB(A1);
let classB2 = GetClassB(A2);
let b1 = new classB1();
let b2 = new classB2();`,
    `var result = [];
var test = [];
class c { constructor() { result = [...arguments]; } };
class d extends c { };
new d();`,
    ` test = [-5, 4.53, "test", null, undefined, 9348579];`,
    `class ClassWithGeneratorMethod {
  *iter() {
      for (let i of [1,2,3]) {
          yield i;
      }
  }
};

let a = [];
for (let i of new ClassWithGeneratorMethod().iter()) {
  a.push(i);
}
`,
    `class B {
  static method() {
      return 'abc';
  }
  static ['method2']() {
      return 'def';
  }
  static get method3() {
      return 'ghi';
  }
  static get ['method4']() {
      return 'jkl';
  }
  static set method5(x) {
      return 'mno';
  }
  static set ['method6'](x) {
      return 'pqr';
  }
  static *method7() {
      yield 'stu';
  }
  static *['method8']() {
      yield 'vwx';
  }}`,
    ` class foo {
  set(key) { } // No error
  get() { }    // No error
}`,
    ` function test1() { class a { static "a"() { } } }
function test2() { class a { static get "a"() { } } }
function test3() { class a { static set "a"(x) { } } }
function test4() { class a { get "a"() { } } }
function test5() { class a { set "a"(x) { } } }
function test6() { class a { *"a"(x) { } } }
function test7() { class a { method() {} "a"() {} } }
function test8() { class a { method() {} static "a"() { } } }
function test9() { class a { method() {} static get "a"() { } } }
function test10() { class a { method() {} static set "a"(x) { } } }
function test11() { class a { method() {} get "a"() { } } }
function test12() { class a { method() {} set "a"(x) { } } }
function test13() { class a { method() {} *"a"(x) { } } }`,
    `function a() {
  u3056 = function() {};
  class c extends u3056 {};
  c.y = "str";
  delete c.x;
  delete c.y;
}`,
    `class Subclass extends Middle {
  setNameExplicit(name) { super.setName(name); }
  setNameProperty(name) { super.name=name; }
  setNameEvalCall(name) { eval('super.setName(name)'); }
  setNameEvalProperty(name) { eval('super.name=name'); }
  setNameLambdaCall(name) { (()=>super.setName(name)) (); }
  setNameLambdaProperty(name) { (()=>super.name=name) (); }
}`,
    `class A {
  constructor() { count++; }
  increment()   { count++; }
  decrement()   { count--; }
  getCount()    { return count; }
}`,
    `class B {
  get x1() { result += "Bgetter;"; return 0; }
  set x1(v){ result += "Bsetter;"; }
}

class A extends B {
  constructor() {
      (()=>{
          super();
          var s = 'x';
          super[(s+s).substr(0,1)+1] = null;
          s = super[s+'1'];
      })();
  }

  get x1() { result += "Agetter;"; return 0; } // should not be called
  set x1(v){ result += "Asetter;"; }  // should not be called
};`,
    ` function* gf(x, y) { }`,
    `function d() {
  function* gf0() { }
  function* gf1(a) { }
  function* gf5(a,b,c,d,e) { }
}`,
    `function f() {
  var empty = () => {};
  var product = (x, y) => { return x * y; };
  var nil = x => { var x; };
  var twox = x => x + x;
  var manyformals = (a, b, c, d, e, f) => { return '' + a + b + c + d + e + f; };
  // These nested forms add coverage for bug BLUE 513592
  var nested = x => () => x;
  var nestedoverride = x => x => x;
  var nestedblock = x => { return () => x; }
  var nestedblockoverride = x => { return x => x; }
}`,
    `  var empty = () => {};
var simple = x => x;
var multi = (x, y, z) => x + y + z;
var nested = x => () => x;
var block = (x, y) => { return x + y; };
var blocknested = () => { return () => { return this; } };`,
    ` var obj = {
  method: function () {
    return () => this;
  }
};`,
    `var obj = {
  a: 5,
  b: 10,
  method: function () {
      return () => this.a + this.b;
  }
};`,
    `function foo() {}; foo(1, 2,);`,
    `Math.min(1, 2, );`,
    `let f = (a,) => {}`,
    `({b = (a,) => {}}) => {}`,
    `(a,) => {}`,
    `var object = {
      async async() { return 12; }
  };

  var object2 = {
      async() { return 12; }
  };

  var object3 = {
      async "a"() { return 12; },
      async 0() { return 12; },
      async 3.14() { return 12; },
      async else() { return 12; },
  };`,
    ` class MyClass {
      async asyncMethod(a) { return a; }
      async async(a) { return a; }
      async "a"() { return 12; }
      async 0() { return 12; }
      async 3.14() { return 12; }
      async else() { return 12; }
      static async staticAsyncMethod(a) { return a; }
  }`,
    `class MySecondClass {
      async(a) { return a; }
  }

  class MyThirdClass {
      static async(a) { return a; }
  }

  var x = "foo";
  class MyFourthClass {
      async [x](a) { return a; }
  }`,
    `function await(x) {
      return x;
  }`,
    `async function secondAsyncMethod(x) {
      return await(x);
  }

  function rejectedPromiseMethod() {
      return new Promise(function (resolve, reject) {
          reject(Error('My Error'));
      });
  }

  async function rejectAwaitMethod() {
      return await rejectedPromiseMethod();
  }

  async function asyncThrowingMethod() {
      throw 32;
  }

  async function throwAwaitMethod() {
      return await asyncThrowingMethod();
  }`,
    ` async function asyncMethod(x, y, z) {
      var lambdaExp = async(a, b, c) => a * b * c;
      var lambdaResult = await lambdaExp(x, y, z);
      return lambdaResult;
  }`,
    ` async function asyncMethodResolved() {
      let p = new Promise(function (resolve, reject) {
          resolve("resolved");
      });

      return p.then(function (result) {
          return result;
      });
  }

  async function asyncMethodResolvedWithAwait() {
      let p = new Promise(function (resolve, reject) {
          resolve("resolved");
      });

      return await p;
  }

  async function asyncMethodRejected() {
      let p = new Promise(function (resolve, reject) {
          reject("rejected");
      });

      return p.then(function (result) {
          return result;
      });
  }`,
    ` async function af2(x) { var xx = x(); function x() { return 'afx'; } return xx; }`,
    ` async function af(d = 1) {
      return () => d;
  }`,
    ` async function af(d = 1) {
      return eval("d");
  }
`,
    ` async function af1(a, b = () => a, c = b) {
      function b() {
          return a;
      }
      var a = 2;
      return [b, c];
  }`,
    `async function af1(a, b = () => a, c = b) {
      function b() {
          return a;
      }
      var a = 2;
      return eval("[b, c]");
  }
`,
    `async function af1() {
      return 1;
  }

  async function af2() {
      return 2;
  }

  async function af3() {
      return await af1() + await af2();
  }`,
    ` var obj =  { x : 1 };
    async function af1() {
        throw obj;
    }

    async function af3() {
        return await af1() + await af2();
    }
`,
    ` async function af1(a, b) {
      return await af2();

      async function af2() {
          a = await a * a;
          b = await b * b;

          return a + b;
      }
  }`,
    `async function af2() {
      try {
          try {
              await af1();
          } catch (e) {
              throw e;
          }
      } catch (e) {

          throw e;
      }
  }`,
    `async function af(x) {
      var x = 0;
      with (obj) {
          x = await af();
      }

      return x;
  }`,
    `var f1 = async ( ) => {
      function foo(a = function() { } ) { } };`,
    `async function f1() {
      function foo() {
          async function f2() {
              function bar (a = function () {} ) {
              }
          }
      }
  }`,
    `  try
    {
      var result = testFunction();
      if (result == true)
      {
      write("PASS");
      }

    }
    catch (e)
    {
      var resultString = "FAILED" + testScenario;
      write(resultString + " :: " + e.message);
    }`,
    `var o = {get foo(){ return s1;},set foo(arg){return s2 = s3}};`,
    `var obj =
    {
        get foo() { return _foo; },
        set foo(value) { _foo = value; }
    };`,
    `try
{
// this should not compile in ES5
eval("if(true){};else{}");
}
catch(e)
{
write("'if(true){};else{}' compile failure in ES5" + e)
}`,
    `void Dummy2()
    {

    }`,
    `function x()
    {
      var e = eval;
    }
    x();

    var bar = function (e) {
        e.apply(this);
    }`,
    `var tests = [
      {
          name: "concat Bug",
          body: function ()
          {
               Array.prototype.length = 0;
               Array.prototype[0]="start";
               Array.prototype[1]="p1";
               Array.prototype[2]="p2";
               Array.prototype[3]="p3";
               Array.prototype[4]="p4";
               Array.prototype[5]="p5";
               Array.prototype[7]="p6";

               var arr = new Array();
               arr[3]="test";
               arr[4]=12;
               arr[6]=345;
               arr.concat(Array.prototype);

               delete Array.prototype[0];
               delete Array.prototype[3];
               delete Array.prototype[4];

               //Resulting Array from concat should look up the prototype
               assert.areEqual([,"p1","p2","test",12,"p5",345,"p6","p1","p2",,,"p5",,"p6"], arr.concat(Array.prototype));
          }
       },
       {
          name: "slice Bug",
          body: function ()
          {
               var retarr = new Array();
               var arr=new Array(2)
               arr[0]=0;
               Array.prototype[1]="p"+1;
               retarr[1]=arr;
               var result = retarr[1].slice(-2,2);
               for(var i=0;i<Array.prototype.length;i++)
               {
                   delete Array.prototype[i];
               }
               assert.areEqual([0,undefined].toString(),retarr[1].toString());
          }
       }
   ];`,
    ` testFlat([2, 3, [4, 5]], [2, 3, 4, 5]);
    testFlat([2, 3, [4, [5, 6]]], [2, 3, 4, [5, 6]]);
    testFlat([2, 3, [4, [5, 6]]], [2, 3, 4, 5, 6], 2);
    testFlat([], []);
    testFlat([[], [], 1], [1]);
    const typedArr = new Int32Array(3);
    const typedArr2 = new Int32Array(3);`,
    ` testFlatMap([2, 3, 4, 5], [2, 4, 3, 6, 4, 8, 5, 10], function (a) { return [a, a * 2]});
    const thisArg = { count : 0 };
    testFlatMap([2, 3, 4], [2, 3, 3, 4, 4, 5], function (a) { this.count += a; return [ a, a + 1]}, thisArg);
    testFlatMap([2, 3, 4], [[2], [3], [4]], function (a) { return [[a]]});`,
    `  testFlatMap([2, 3], [null, null], function () { return [this]}, null);
    testFlatMap([2, 3], [undefined, undefined], function () { return [this]}, undefined);
    testFlatMap([2, 3], [undefined, undefined], function () { return [this]});
    testFlatMap([2, 3], ["", ""], function () { return [this]}, "");
    testFlatMap([2, 3], ["Test", "Test"], function () { return [this]}, "Test");
    const boo = {};
    testFlatMap([2, 3], [boo, boo], function () { return [this]}, boo);`,
    ` var FloatArr0 = [];
    var VarArr0 = [];
    var b = VarArr0;
    for (var __loopvar1 = 0; b < FloatArr0;) {
        for (var v319132 = 0; v319132; v319132++) {
            FloatArr0[1];
        }
        while (v319133) {
            FloatArr0[1];
        }
    }`,
    `var starts = [-2, 0, 2, 8];
    for (var i = 0; i < starts.length; i++) {
        var a = [0, 1, 2, 3, 4];
        var start = starts[i];
        echo("splice at " + start + ":", a, "||", a.splice(start));
    }
    `,
    `var a = [];
    a[4294967290] = 4;
    a.splice(0,0,0,1); //length grows by 2
    a[4294967291] = 5;`,
    `var n = 10;
    var a = new Array();
    var o = new Object();

    for (var i=0; i<10; i++) {
        o[i] = a[i] = i * i + 1;
    }

    write(o.join());

    write(o.join(undefined));

    write(o.join("hello"));

    write(a.join(a));
    write(o.join(a));

    write(a.join(o));
    write(o.join(o));

    write(Array.prototype.join.call(a, a));
    write(Array.prototype.join.call(o, a));

    write(Array.prototype.join.call(a, o));
    write(Array.prototype.join.call(o, o));

    //implicit calls
    var a ;
    var arr = [10];
    Object.defineProperty(Array.prototype, "4", {configurable : true, get: function(){a = true; return 30;}});
    a = false;
    arr.length = 6;
    var f = arr.join();
    foo(a);

    Object.prototype['length'] = 2;
    foo(([""].join).call(5));
    Object.prototype['0'] = "test";
    foo(([""].join).call(5.5));`,
    `for (var i=0;i<n;i++) {
      write("arr[" + i + "] : " + arr[i]);
    }

    function test() {
            var x;
            switch (x) {
            default:
                    [1, , ];
            }
    };
    test();
    test();

    function ArrayLiteralMissingValue()
    {
      var arr1 = [1, 1, -2147483646];
      write("[] missing value:" + arr1[2]);
    }
    ArrayLiteralMissingValue();

    function ArrayConstructorMissingValue()
    {
      var IntArr0 = new Array(-1, -2147483646);
      write("Array() missing value:" + IntArr0[1]);
    }
    ArrayConstructorMissingValue();`,
    `var ary =[1,2,3,4];

    function test0(i)
    {
       return ary.pop();
    }`,
    `function InitObject(obj) {
      for (var i=0; i<n; i++) {
          obj[i] = i * i + 1;
      }
      obj.length = n;

      return obj;
  }

  function TestPop(obj) {
      write(">>> Start pop test for object: " + obj);
      for (var i=0; i<n+2; i++) {
          var x = Array.prototype.pop.call(obj);
          write(i + " iteration. Poped:" + x + " obj.length:" + obj.length);
      }
      write("<<< Stop pop test for object: " + obj);
  }
  `,
    `function test0(){
      var obj0 = {};
      var obj1 = {};
      var func0 = function(argArr0,argArr1,argFunc2){
        // Snippet : Array check hoist bailout if object is used instead of arrays.


        function v890195(v890196){
          for (var v890197 = 0 ; v890197 < 3 ; v890197++)
          {
            v890196[v890197] = (c |= argArr0[(((e >= 0 ? e : 0)) & 0XF)]);
            obj1.length = ary[((shouldBailout ? (ary[1] = "x") : undefined ), 1)];
          }
        }
        v890195(argArr1);
      }
      var func1 = function(argArr4,argFunc5){
        func0.call(obj0 , ary, ary, 1);
      }
      var ary = new Array(10);
      var c = 1;
      var e = 34;
      ary[0] = 1;
      ary[1] = 1;
      ary[2] = 1;
      ary[3] = 1;
      ary[4] = 1;
      ary[5] = 1;
      ary[6] = 1;
      ary[7] = 1;
      ary[8] = 1;
      ary[9] = 1;
      ary[10] = -3.60428436642705E+18;
      func1(1, 1);
    };
    `,
    `var x = ~123n;`,
    `var x = ~-123n;`,
    `var x = ~1234567890123456789012345678901234567890n;
    var y = -1234567890123456789012345678901234567891n;`,
    `({
      name: "With assign",
      body: function () {
          var x = 3n;
          var y = x;
          assert.isTrue(x == 3n);
          assert.isTrue(y == 3n);
          y = ~x;
          assert.isTrue(x == 3n);
          assert.isTrue(y == -4n);
      }
  })`,
    `var tests = [
      {
          name: "Increment BigInt literal",
          body: function () {
              var x = 123n;
              assert.isTrue(x == 123n);
              x++;
              assert.isTrue(x == 124n);
              ++x;
              assert.isTrue(x == 125n);
          }
      },
      {
          name: "Increment negative BigInt literal",
          body: function () {
              var x = -123n;
              assert.isTrue(x == -123n);
              x++;
              assert.isTrue(x == -122n);
              ++x;
              assert.isTrue(x == -121n);
          }
      },
      {
          name: "Increment -1n",
          body: function () {
              var x = -1n;
              assert.isTrue(x == -1n);
              x++;
              assert.isTrue(x == 0n);
              ++x;
              assert.isTrue(x == 1n);
          }
      },
      {
          name: "Increment to change length",
          body: function () {
              var x = 4294967295n;
              assert.isTrue(x == 4294967295n);
              x++;
              assert.isTrue(x == 4294967296n);
              ++x;
              assert.isTrue(x == 4294967297n);
              var y = -4294967297n;
              assert.isTrue(y == -4294967297n);
              y++;
              assert.isTrue(y == -4294967296n);
              ++y;
              assert.isTrue(y == -4294967295n);
          }
      },
      {
          name: "Increment BigInt Object",
          body: function () {
              var x = BigInt(12345678901234567890n);
              var y = BigInt(12345678901234567891n);
              assert.isTrue(x < y);
              ++x;
              assert.isTrue(x == y);
              x++;
              assert.isTrue(x >= y);
          }
      },
      {
          name: "Out of 64 bit range",
          body: function () {
              var x = 1234567890123456789012345678901234567890n;
              var y = BigInt(1234567890123456789012345678901234567891n);
              assert.isFalse(x == y);
              x++;
              ++y;
              assert.isTrue(x < y);
              ++x;
              assert.isTrue(x == y);
          }
      },
      {
          name: "Very big",
          body: function () {
              var x = eval('1234567890'.repeat(20)+'0n');
              var y = BigInt(eval('1234567890'.repeat(20)+'1n'));
              assert.isFalse(x == y);
              x++;
              ++y;
              assert.isTrue(x < y);
              ++x;
              assert.isTrue(x == y);
          }
      },
      {
          name: "With assign",
          body: function () {
              var x = 3n;
              var y = x++;
              assert.isTrue(x == 4n);
              assert.isTrue(y == 3n);
              y = ++x;
              assert.isTrue(x == 5n);
              assert.isTrue(y == 5n);
          }
      },
  ];`,
    `     var x = 5n;
    var y = 2n;
    var z = x - y;`,
    `  assert.isTrue(-4n - 0n == -4n);
    assert.isTrue(4n - 0n == 4n);
    assert.isTrue(0n - 4n == -4n);
    assert.isTrue(0n - -4n == 4n);
    assert.isTrue(4n - 4n == 0n);
    assert.isTrue(-4n - -4n == 0n);`,
    `function noThrowFunction() {
      try {
        throw new Error("throw exception from noThrowFunction");
      } catch (err) {
      }
    }
    noThrowFunction();

    // calling throwFunction() will terminate program, so this has to come last
    function throwFunction() {
       throw new Error("throw exception from throwFunction");
    }
    throwFunction();`,
    `(function f() {
      let x = "abacaba";
  })();`,
    `
    function testSwitch1() {
        switch (val()) {
        case 1:
            let z = 10; // No error
            z++;
            break;
        case 2:
            let y = 1; // No error
            y++;
            break;
        }
    }

    function testSwitch2() {
        switch (val()) {
        case 1:
            switch (val()) {
            default:
                let a = 1; // No error
                break;
            }
        }
    }

    function testSwitch3() {
        var a = 1;
        while (a)
            switch (val()) {
            default:
                let b = 2; // No error
                ++b;
                a = 0;
                break;
            }
    }`,
    `var x = 10;
    function f() {

        const x = 5;
        {
            const x = "abacaba";
            foo(x);
            {
                const x = 111111;
                ao(x);
            }
            adf(x);
            {
               const x = 222222;
                a.Echo(x);
            }
            d.Echo(x);
        }
        WScafho(x);
    };`,
    `function f() {

      let a = 2;
      return a;
  };
  const x = f();`,
    `// 0
    {
    with({x:0}) {
      foo(x)
    }
    let x = 1
    }

    // 0
    {
    eval('with({x:0}) { foo(x) }')
    let x = 1
    }

    // 0
    {
    let f = function() {
      with({x:0}) {
        foo(x)
      }
    }
    let x = 1
    f()
    }

    // Reference error.
    {
    try {
      with({}) {
        foo(x)
      }
      let x = 1
    } catch(e) {
      foo(e)
    }
    }

    // Reference error.
    {
    try {
      eval('with({}) { foo(x) }')
      let x = 1
    } catch(e) {
      foo(e)
    }
    }

    // 1
    {
    with({x:0}) {
      let x = 1
      foo(x)
    }
    }

    // Reference error.
    {
    try {
      with({x:0}) {
        foo(x)
        let x = 1
      }
    } catch(e) {
      foo(e)
    }
    }

    // string
    with({x: 'x'})
    {
        foo(typeof x)
    }`,
    `let literalClasses = {
      'Decimal Integer Literal': [
          '0', '1', '123',
          '0.1', '1.1', '123.1', '123.123',
          '0e1', '1e1', '1e+1', '1e-1',
          '0E1', '1E1', '1E+1', '1E-1',
          '123e123', '123e+123', '123e-123',
          '123E123', '123E+123', '123E-123'
       ],
       'Binary Integer Literal': [
          '0b0', '0b1', '0b010101',
          '0B0', '0B1', '0B010101',
       ],
       'Octal Integer Literal': [
          '0o0', '0o1', '0o123',
          '0O0', '0O1', '0O123'
       ],
       'Hex Integer Literal': [
          '0x0', '0x1', '0x123', '0xabc', '0xABC', '0x123abc', '0x123ABC',
          '0X0', '0X1', '0X123', '0Xabc', '0XABC', '0X123abc', '0X123ABC'
       ]
  };`,
    `{
  function f() { return 'declaration'; }
}`,
    ,
    ` function f({a, ...rest}) {
      return rest;
  }`,
    `const obj = {a: 2};
    function f(x) {
        const a = obj.a;
        const {...unused} = x;
        return a + obj.a;
    }`,
    `{
      let orig = {};
      let sym = Symbol("c");
      orig.a = 1;
      orig.b = "asdf";
      orig[sym] = "qwert";
      let newObj = Object.assign({}, orig);
  }`,
    `  Object.defineProperty(Object.prototype, 'b', {
      get: function() { return "asdf"; }
    });
  let orig = {};
  orig.a = 1;

  let newObj = Object.assign({}, orig);`,
    `var a = {i: 1, j: 2};
    var b = {x: 3, y: 4, z: 5};
    var c = {foo: 6};`,
    `let aClone = {...a};`,
    `let merged = {...a, ...b};`,
    `let aClone = {...(a)};`,
    `  let over = {i: 10, j: 11, ...a};`,
    ` let val = 1;
    let source = {get i() {val++; return 1;}, get j() {return val;}};
    let obj = {...source};`,
    ` let merged = {a: 2, ...{get i() {getterExecutions++; return 1;}}, b: 3, ...{get i() {getterExecutions++; return 1;}}};`,
    ` let arr = [1, 2];
    let obj = {...[...arr, 3]};`,
    ` let setterCalled = false;
    let handler = {
        get: function(obj, prop) {
            return obj[prop];
        },
        set: function(obj, prop, value) {
            setterCalled = true;
        }
    };`,
    `o["1"] = 100; `,
    `var o = new Object();
    var a = [11,12,13];
    var d = new Date();`,
    ` function v710235()
    {
    }
    v710235.prototype = 1;
    var v710236 = new v710235();
    var litObj4 = {prop0: 1, prop1: 1, prop2: 1, prop3: 1, prop4: 1};`,
    ` var a = new Ctor();
    var f = a.a;
    var g = a.b;`,
    `try {
throw {};
} catch ({ f }) {
switch (1) {
case 1:
function f() {  }
}
}`,
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
  }`,
    `const func = (...[foo, bar]) => {
    console.log(foo)
    console.log(bar)
}

func('foo', 'bar')`,
    'console.log(a, ...(cond ? [a, b, c] : [d, e, f]));'
  ];

  for (const arg of programs) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
});
