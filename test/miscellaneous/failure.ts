import { pass, fail } from '../test-utils';

describe('Miscellaneous - Failure', () => {

    fail(`/*`, {
        source: `/*`,
        message: 'Unterminated comment',
        line: 1,
    });

    fail(`/*\r\n`, {
        source: `/*\r\n`,
        message: 'Unterminated comment',
        line: 1,
    });

    fail(`/*\r`, {
        source: `/*\r`,
        message: 'Unterminated comment',
        line: 1,
    });

    fail(`/*\r\n`, {
        source: `/*\r\n`,
        message: 'Unterminated comment',
        line: 1,
    });

    fail(`/*\u2028`, {
        source: `/*\u2028`,
        message: 'Unterminated comment',
        line: 1,
    });

    fail(`/*\u2029`, {
        source: `/*\u2029`,
        message: 'Unterminated comment',
        line: 1,
    });

    fail(`\\`, {
        source: `\\`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\u`, {
        source: `\\u`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\x`, {
        source: `\\x`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\o`, {
        source: `\\o`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\u1`, {
        source: `\\u1`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\u12`, {
        source: `\\u12`,
        message: 'Unexpected token',
        line: 1,
    });
    fail(`a\\uz`, {
        source: `a\\uz`,
        message: 'Unexpected token',
        line: 1,
    });
    fail(`a\\x`, {
        source: `a\\x`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('a\\o', {
        source: `a\\o`,
        message: 'Unexpected token',
        line: 1,
    });
    fail('a\\u12', {
        source: `a\\u12`,
        message: 'Unexpected token',
        line: 1,
    });
    fail('\\uD800x', {
        source: `\\uD800x`,
        message: 'Unexpected surrogate pair',
        line: 1,
    });
    fail('＊', {
        source: `＊`,
        line: 1
    });

    fail('\uD800\\u', {
        source: `\uD800\\u`,
        line: 1
    });

    fail('\\uD800\\x62', {
        source: `\\uD800\\x62`,
        line: 1
    });

    fail('\uD800x', {
        source: `\uD800x`,
        line: 1
    });

    fail('1.a', {
        source: `1.a`,
        line: 1
    });

    fail('1.e', {
        source: `1.e`,
        line: 1
    });

    fail('1.e+', {
        source: `1.e+`,
        line: 1
    });

    fail('0xz', {
        source: `0xz`,
        line: 1
    });

    fail('08a', {
        source: `08a`,
        line: 1
    });

    fail('\u0008', {
        source: `\u0008`,
        line: 1
    });

    fail('0a', {
        source: `0a`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('3ea', {
        source: `3ea`,
        line: 1
    });

    fail('3in []', {
        source: `3in []`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('3e', {
        source: `3e`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('3x0', {
        source: `3x0`,
        line: 1
    });
    fail('3in[]', {
        source: `3in[]`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('x\\u002a', {
        source: `x\\u002a`,
        line: 1
    });

    fail('\\ua', {
        source: `\\ua`,
        line: 1
    });

    fail(`(a, ...b)`, {
        source: `(a, ...b)`,
        line: 1
    });

    fail(`(..a)`, {
        source: `(..a)`,
        line: 1
    });

    fail(`(((...a)))`, {
        source: `(((...a)))`,
        line: 1
    });

    fail(`(((a, ...b))`, {
        source: `(((a, ...b))`,
    });

    fail(`[...new a] = 0;`, {
        source: `[...new a] = 0;`,
    });

    fail(`[...0] = 0;`, {
        source: `[...0] = 0;`,
    });

    fail(`[...[0]] = 0;`, {
        source: `[...[0]] = 0;`,
    });

    fail(`[...{a: 0}] = 0;`, {
        source: `[...{a: 0}] = 0;`,
    });

    fail(`({get a(){}} = 0)`, {
        source: `({get a(){}} = 0)`,
    });

    fail(`({set a(b){}} = 0)`, {
        source: `({set a(b){}} = 0)`,
    });

    fail(`[0] = 0`, {
        source: `[0] = 0`,
    });

    fail('for((1 + 1) in list) process(x);', {
        source: `for((1 + 1) in list) process(x);`
    });

    fail('[', {
        source: `[`
    });
    fail('[,', {
        source: `[,`
    });
    fail('1 + { t:t ', {
        source: `1 + { t:t `,
        message:  'Unexpected token',
        line: 1,
    });
    fail('1 + {', {
        source: `1 + {`
    });
    fail('i #= 0', {
        source: `i #= 0`
    });
    fail('\n\n\n{', {
        source: `\n\n\n{`
    });
    fail('\n/* Some multiline\ncomment */\n)', {
        source: `\n/* Some multiline\ncomment */\n)`
    });
    fail(', { get 2 }', {
        source: `{ get 2 }`
    });
    fail(', { set 1 }', {
        source: `{ set 1 }`
    });
    fail('function t(if) { }', {
        source: `function t(if) { }`
    });
    fail('({ get: g(d) { } })', {
        source: `({ get: g(d) { } })`
    });
    fail('\u200C = []', {
        source: `\u200C = []`
    });
    fail('do { x } *', {
        source: `do { x } *`
    });
    fail('var', {
        source: `var`,
        line: 1,
    });
    fail('const', {
        source: `const`,
        line: 1,
    });

    fail('**', {
        source: `**`,
        line: 1,
    });
    fail('#=', {
        source: `#=`,
        line: 1,
    });
    fail('\\u{}', {
        source: `\\u{}`
    });
    fail('\\u{FFFF', {
        source: `\\u{FFFF`
    });
    fail('\\u{FFZ}', {
        source: `\\u{FFZ}`
    });
    fail('("\\u{}")', {
        source: `("\\u{}")`
    });
    fail('/./a', {
        source: `/./a`
    });
    fail('/./ii', {
        source: `/./ii`
    });
    fail('enum : 0', {
        source: `enum : 0`
    });
    fail('({get +:3})', {
        source: `({get +:3})`
    });
    fail(', { ;  ;  ', {
        source: `{ ;  ;  `
    });
    fail('a b', {
        source: `a b`
    });
    fail('try { } catch() {}', {
        source: `try { } catch() {}`
    });
    fail('/*\r\n*/]', {
        source: `/*\r\n*/]`
    });
    fail('//\r\n]', {
        source: `//\r\n]`
    });
    fail('\r]', {
        source: `\r]`
    });
    fail('\n]', {
        source: `\n]`
    });
    fail('/*hello', {
        source: `/*hello`
    });
    fail('try {} catch (answer()) {} ', {
        source: `try {} catch (answer()) {} `
    });
    fail('for(;;)', {
        source: `for(;;)`
    });
    fail('for (let [] = 0, {};;);', {
        source: `for (let [] = 0, {};;);`
    });
    fail('for (let [];;);', {
        source: `for (let [];;);`
    });
    fail('for (var i, i2 in {});', {
        source: `for (var i, i2 in {});`
    });
    fail('if.a;', {
        source: `if.a;`
    });
    fail('a if', {
        source: `a if`
    });
    fail('function true() { }', {
        source: `function true() { }`,
        message: 'Unexpected token true',
        line: 1,
    });
    fail('"\\ux";', {
        source: `"\\ux";`
    });
    fail('"\\u000";', {
        source: `"\\u000";`
    });
    fail('0O', {
        source: `0O`
    });
    fail('0o18', {
        source: `0o18`
    });
    fail('0O1a', {
        source: `0O1a`
    });
    fail('x\\', {
        source: `x\\`
    });
    fail('/test', {
        source: `/test`
    });
    fail('3 = 4', {
        source: `3 = 4`
    });
    fail('[,', {
        source: `[,`
    });
    fail('var x = "', {
        source: `var x = "`
    });
    fail('i #= 42', {
        source: `i #= 42`
    });
    fail('({[a,b]:0})', {
        source: `({[a,b]:0})`
    });
    fail('"use strict"; eval => 42', {
        source: `"use strict"; eval => 42`
    });
    fail('use strict"; (a) => 00', {
        source: `use strict"; (a) => 00`
    });
    fail('p = { q/ }', {
        source: `p = { q/ }`
    });
    fail('function t(false) { }', {
        source: `function t(false) { }`
    });
    fail('continue', {
        source: `continue`
    });
    fail('if(false) doThis(); else', {
        source: `if(false) doThis(); else`
    });
    fail('x: while (true) { (function () { continue x; }); }', {
        source: `x: while (true) { (function () { continue x; }); }`
    });
    fail('function hello() {"use strict"; eval = 10; }', {
        source: `function hello() {'use strict'; eval = 10; }`
    });
    fail('function eval() {"use strict"; })()', {
        source: `function eval() {'use strict'; })()`,
        line: 1,
    });
    fail('const', {
        source: `const`
    });
    fail('class A {get constructor(){}}', {
        source: `class A {get constructor(){}}`
    });
    fail('x %*= y', {
        source: `x %*= y`
    });
    fail('({a}) => { "use strict"; }', {
        source: `({a}) => { 'use strict'; }`
    });
    fail('a => {}()', {
        source: `a => {}()`
    });

    fail('async function wrap() {\nasync function await() { }\n}', {
        source: `async function wrap() {\nasync function await() { }\n}`
    });
    fail('async function foo(await) { }', {
        source: `async function foo(await) { }`
    });
    fail('async function foo() { return {await} }', {
        source: `async function foo() { return {await} }`
    });
    fail('(async\nfunction foo() { })', {
        source: `(async\nfunction foo() { })`
    });

    fail('(async function await() { })', {
        source: `(async function await() { })`
    });
    fail('(async function foo(await) { })', {
        source: `(async function foo(await) { })`
    });
    fail('(async function foo() { return {await} })', {
        source: `(async function foo() { return {await} })`
    });
    fail('async\n() => a', {
        source: `async\n() => a`
    });
    fail('async a\n=> a', {
        source: `async a\n=> a`
    });
    fail('async ()\n=> a', {
        source: `async ()\n=> a`
    });
    fail('async await => 1', {
        source: `async await => 1`
    });
    fail('async (await) => 1', {
        source: `async (await) => 1`
    });
    fail('async ({await}) => 1  ', {
        source: `async ({await}) => 1`,
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
    });
    fail('async ({a: await}) => 1', {
        source: `async ({a: await}) => 1`
    });

    fail('[a += b] = []', {
        source: `[a += b] = []`,
        message: 'Unexpected token =',
        line: 1,
    });

    fail('for(([a]) of 0);', {
        source: `for(([a]) of 0);`
    });

    fail('({a: b += 0} = {})', {
        source: `({a: b += 0} = {})`
    });

    fail('({async\nfoo() { }})', {
        source: `({async\nfoo() { }})`
    });
    fail('({async get foo() { }})', {
        source: `({async get foo() { }})`
    });
    fail('({async set foo(value) { }})', {
        source: `({async set foo(value) { }})`
    });
    fail('({async foo() { var await }})', {
        source: `({async foo() { var await }})`
    });
    fail('({async foo(await) { }})', {
        source: `({async foo(await) { }})`
    });
    fail('({async foo() { return {await} }})', {
        source: `({async foo() { return {await} }})`
    });
    fail('({async foo: 1})', {
        source: `({async foo: 1})`
    });
    fail('class A {async get foo() { }}', {
        source: `class A {async get foo() { }}`
    });
    fail('class A {async set foo(value) { }}', {
        source: `class A {async set foo(value) { }}`
    });
    fail('class A {static async set foo(value) { }}', {
        source: `class A {static async set foo(value) { }}`
    });
    fail('class A {async foo() { return {await} }}', {
        source: `class A {async foo() { return {await} }}`
    });
    fail('invalid', {
        source: `await a`,
        message: 'Unexpected token',
        line: 1,
    });
    fail('async () => await', {
        source: `async () => await`
    });
    fail('(class {async foo() { await }})', {
        source: `(class {async foo() { await }})`
    });
    fail('async function foo(a = await b) {}', {
        source: `async function foo(a = await b) {}`
    });
    fail('async (a = await b) => {}', {
        source: `async (a = await b) => {}`
    });

    fail('([a.a]) => 42', {
        source: `([a.a]) => 42`
    });
    fail('() => {}()', {
        source: `() => {}()`
    });
    fail('(a) => {}()', {
        source: `(a) => {}()`
    });
    fail('function *g() { (x = yield) => {} }', {
        source: `function *g() { (x = yield) => {} }`
    });
    fail('class A { constructor() {} "constructor"() }', {
        source: `class A { constructor() {} 'constructor'() }`
    });
    fail('({[x]})', {
        source: `({[x]})`
    });
    fail('0O9', {
        source: `0O9`
    });
    fail('( { get x() {} } = 0)', {
        source: `( { get x() {} } = 0)`
    });
    fail('x \n is y', {
        source: `x \n is y`
    });
    fail('x \n isnt y', {
        source: `x \n isnt y`
    });
    fail('for (let x = 42 in list) process(x);', {
        source: `for (let x = 42 in list) process(x);`
    });
    fail('(10, 20) => 00', {
        source: `(10, 20) => 00`
    });
    fail('yield v', {
        source: `yield v`
    });
    fail('let [this] = [10]', {
        source: `let [this] = [10]`
    });
    fail('let {this} = x', {
        source: `let {this} = x`
    });
    fail('([function] = [10])', {
        source: `([function] = [10])`
    });
    fail('({this} = x)', {
        source: `({this} = x)`,
        line: 1,
    });
    fail('var x = {this}', {
        source: `var x = {this}`
    });
    fail('var obj = { *test** }', {
        source: `var obj = { *test** }`
    });
    fail('class A extends yield B { }', {
        source: `class A extends yield B { }`
    });
    fail('class default', {
        source: `class default`
    });
    fail('function a() 1 // expression closure is not supported', {
        source: `function a() 1 // expression closure is not supported`
    });
    fail('({ 42 }) = obj', {
        source: `({ 42 }) = obj`
    });
    fail('({ 5 }) => {}', {
        source: `({ 5 }) => {}`,
        message:  'Unexpected token number',
        line: 1,
    });
    fail('({ get test() { } }) => 42', {
        source: `({ get test() { } }) => 42`
    });
    fail('let [function] = x', {
        source: `let [function] = x`
    });
    fail('"use strict"; let + 1', {
        source: `"use strict"; let + 1`
    });

    fail('if (1) let x = 10;', {
        source: `if (1) let x = 10;`
    });
    fail('function* y({yield}) {}', {
        source: `function* y({yield}) {}`
    });
    fail('new.target', {
        source: `new.target`
    });
    fail('({ __proto__: 1, __proto__: 2 })', {
        source: `({ __proto__: 1, __proto__: 2 })`
    });
    fail('({ __proto__: 1, __proto__: 2 })', {
        source: `({ __proto__: 1, __proto__: 2 })`
    });
    fail('[...x in y] = []', {
        source: `[...x in y] = []`
    });
    fail('/[a-z]/s', {
        source: `/[a-z]/s`
    });
    fail('(function* foo(a = yield b) {})', {
        source: `(function* foo(a = yield b) {})`
    });
    fail('function* foo(a = class extends (yield b) {}) {}', {
        source: `function* foo(a = class extends (yield b) {}) {}`
    });
    fail('foo: class X {}', {
        source: `foo: class X {}`
    });
    fail('var foo = 1; let foo = 1;', {
        source: `var foo = 1; let foo = 1;`
    });
    fail('class A { get constructor() {} }', {
        source: `class A { get constructor() {} }`
    });
    fail('class A { *constructor() {} }', {
        source: `class A { *constructor() {} }`
    });
    fail('(function ({ a(){} }) {})', {
        source: `(function ({ a(){} }) {})`
    });
    fail('var a = { set foo(...v) {} };', {
        source: `var a = { set foo(...v) {} };`
    });
    fail('class a { set foo(...v) {} };', {
        source: `class a { set foo(...v) {} };`
    });
    fail('class A extends B { constructor() { super } }', {
        source: `class A extends B { constructor() { super } }`
    });
    fail('class A extends B { constructor() { super; } }', {
        source: `class A extends B { constructor() { super; } }`
    });
    fail('class A extends B { foo() { (super).foo } }', {
        source: `class A extends B { foo() { (super).foo } }`
    });
    fail('[2] = 42', {
        source: `[2] = 42`
    });
    fail('({ obj:20 }) = 42', {
        source: `({ obj:20 }) = 42`
    });
    fail('(a, a) => 42', {
        source: `(a, a) => 42`
    });
    fail('void { [1, 2]: 3 };', {
        source: `void { [1, 2]: 3 };`
    });
    fail('((a)) => 42', {
        source: `((a)) => 42`
    });
    fail('let default', {
        source: `let default`
    });
    fail('\\u{110000}', {
        source: `\\u{110000}`
    });
    fail('let default', {
        source: `let default`
    });
    fail('let [function] = [10]', {
        source: `let [function] = [10]`
    });
    fail('(function () { yield 10 })', {
        source: `(function () { yield 10 })`
    });
    fail('function f(a, ...b = 0)', {
        source: `function f(a, ...b = 0)`
    });
    fail('for (;;) const x = 10;', {
        source: `for (;;) const x = 10;`
    });
    fail('while (1) function foo(){}', {
        source: `while (1) function foo(){}`
    });
    fail('x = { method() 42 }', {
        source: `x = { method() 42 }`
    });
    fail('x = { get method() 42 }', {
        source: `x = { get method() 42 }`
    });
    fail('super', {
        source: `super`
    });
    fail('function* wrap() { return (a = 1 + (yield)) => a }', {
        source: `function* wrap() { return (a = 1 + (yield)) => a }`
    });
    fail('function* foo(a = yield b) {}', {
        source: `function* foo(a = yield b) {}`
    });
    fail('(function* foo(a = yield b) {})', {
        source: `(function* foo(a = yield b) {})`
    });
    fail('(class {*foo(a = yield b) {}})', {
        source: `(class {*foo(a = yield b) {}})`
    });
    fail('"use strict"; bar: function x() {}', {
        source: `"use strict"; bar: function x() {}`
    });

    fail('export var await', {
        source: `export var await`,
        module: true
    });

    fail('export var await', {
        source: `export var await`,
        module: true
    });
    fail('export new Foo();', {
        source: `export new Foo();`,
        module: true
    });
    fail('export typeof foo;', {
        source: `export typeof foo;`,
        module: true
    });
    fail('export *;', {
        source: `export *`,
        module: true
    });
    fail('export { default }', {
        source: `export var await`,
        module: true
    });
    fail('export { if }', {
        source: `export new Foo();`,
        module: true
    });
    fail('export { default as foo }', {
        source: `export typeof foo;`,
        module: true
    });
    fail('export { if as foo }', {
        source: `export { if as foo }`,
        module: true
    });

    fail('0 = 0;', {
        source: `0 = 0;`,
    });
    fail('0++', {
        source: `0++`,
    });
    fail('0--', {
        source: `0--`,
    });
    fail('({a}) = 0;', {
        source: `({a}) = 0;`,
    });
    fail('[a] *= 0;', {
        source: `[a] *= 0;`,
    });
    fail('0 /= 0;', {
        source: `0 /= 0;`,
    });
    fail('[...{a: 0}] = 0;', {
        source: `[...{a: 0}] = 0;`,
    });
    fail('for({a: 0} in 0);', {
        source: `for({a: 0} in 0);`,
    });
    fail('for([0] in 0);', {
        source: `for([0] in 0);`,
    });
    fail('for([0] of 0);', {
        source: `for([0] of 0);`,
    });
    fail('for(0 of 0);', {
        source: `for(0 of 0);`,
    });
    fail('for((0) in 0);', {
        source: `for((0) in 0);`,
        message: 'Invalid left-hand side in for-loop',
        line: 1,
    });
    fail('for((0) of 0);', {
        source: `for((0) of 0);`,
    });
    fail('a\\u{0}', {
        source: `a\\u{0}`,
    });
    fail('\\u{FFFFFFF}")', {
        source: `\\u{FFFFFFF}")`,
    });

    fail('/./\\u0069', {
        source: `/./\\u{69}`,
    });

    fail('"use strict"; implements:0;', {
        source: `"use strict"; implements:0;`,
    });

    fail('"use strict"; +package;', {
        source: `"use strict"; +package;`,
        line: 1
    });

    fail('"use strict"; +static;', {
        source: `"use strict"; +static;`,
        line: 1
    });

    fail('"use strict"; yield:0;', {
        source: `"use strict"; yield:0;`,
        message:  'Unexpected strict mode reserved word',
        line: 1,
    });

    fail('"use strict"; function a([yield]){}', {
        source: `"use strict"; function a([yield]){}`,
        line: 1
    });

    fail('"use strict"; function a({yield}){}', {
        source: `"use strict"; function a({yield}){}`,
        line: 1
    });

    fail('(package) => { "use strict"; }', {
        source: `(package) => { "use strict"; }`,
        line: 1
    });

    fail('async (package) => { "use strict"; }', {
        source: `async (package) => { "use strict"; }`,
        line: 1
    });

    fail('"use strict"; async (package) => {}', {
        source: `"use strict"; async (package) => {}`,
        line: 1
    });

    fail('!{ get a() { "use strict"; +let; } }', {
        source: `!{ get a() { "use strict"; +let; } }`,
        line: 1
    });

    fail('({ a(){ super(); } });', {
        source: `({ a(){ super(); } });`,
        line: 1
    });

    fail('/?/', {
        source: `/?/`,
        line: 1,
    });

    fail('let a, b, a;', {
        source: `let a, b, a;`,
    });

    fail('{ const a; }', {
        source: `{ const a; }`,
        line: 1
    });

    fail('const a;', {
        source: `const a;`,
        line: 1
    });

    fail('for(const a = 0, b;;);', {
        source: `for(const a = 0, b;;);`,
        line: 1
    });

    fail('if(0) label: function f(){}', {
        source: `if(0) label: function f(){}`,
        line: 1
    });

    fail('do label: function f(){} while (0)', {
        source: `do label: function f(){} while (0)`,
        line: 1,
    });

    fail('for(a in b) label: function f(){}', {
        source: `for(a in b) label: function f(){}`,
        line: 1
    });

    fail('for(let a in b) label: function f(){}', {
        source: `for(let a in b) label: function f(){}`,
        line: 1
    });

    fail('for(a of b) label: function f(){}', {
        source: `for(a of b) label: function f(){}`,
        line: 1
    });

    fail('for(;;) labelA: labelB: labelC: function f(){}', {
        source: `for(;;) labelA: labelB: labelC: function f(){}`,
        line: 1
    });

    fail('continue;', {
        source: `continue;`,
        message: 'continue  statement must be nested within an iteration statement',
        line: 1,
    });

    fail('if(0) continue;', {
        source: `if(0) continue;`,
        message: 'continue  statement must be nested within an iteration statement',
        line: 1,
    });

    fail('label: continue label;', {
        source: `label: continue label;`,
    });

    fail('label: if(0) continue label;', {
        source: `label: if(0) continue label;`,
    });

    fail('label: while(0) { function f(){ continue label; } }', {
        source: `label: while(0) { function f(){ continue label; } }`,
        line: 1
    });

    fail('break;', {
        source: `break;`,
        line: 1
    });

    fail('while(0) !function(){ break; };', {
        source: `while(0) !function(){ break; };`,
        line: 1
    });

    fail('switch(0) { case 0: function f(){ break; } }', {
        source: `switch(0) { case 0: function f(){ break; } }`,
        line: 1
    });

    fail('switch(0) { default: function f(){ break; } }', {
        source: `switch(0) { default: function f(){ break; } }`,
    });

    fail('with(0) label: function f(){}', {
        source: `with(0) label: function f(){}`,
        line: 1
    });

    fail('"use strict"; !function eval(){}', {
        source: `"use strict"; !function eval(){}`,
        line: 1,
    });

    fail('"use strict"; !function arguments(){}', {
        source: `"use strict"; !function arguments(){}`,
        line: 1
    });

    fail('"use strict"; function arguments(){}', {
        source: `"use strict"; function arguments(){}`,
        message: 'Eval or arguments can\'t be assigned to in strict mode code',
        line: 1,
    });

    fail('function f(a){ super() }', {
        source: `function f(a){ super() }`,
        message: 'super() is only valid in derived class constructors',
        line: 1,
    });

    fail('function f(){ break label; }', {
        source: `function f(){ break label; }`,
        line: 1
    });

    fail('function f(){ labelA: while(0) continue labelB; }', {
        source: `function f(){ labelA: while(0) continue labelB; }`,
        line: 1,
    });

    fail('function* g(){ ([a = yield]) => 0; }', {
        source: `function* g(){ ([a = yield]) => 0; }`,
        message: 'Arrow parameters must not contain yield expressions',
        line: 1,
    });

    fail('for(let a;;) label: function f(){}', {
        source: `for(let a;;) label: function f(){}`,
        message: 'In strict mode code, functions can only be declared at top level or inside a block' ,
        line: 1,
    });

    fail('function* g(){ (a = yield* b) => 0; }', {
        source: `function* g(){ (a = yield* b) => 0; }`,
        line: 1,
    });

    fail('function* g(){ (a = yield) => 0; }', {
        source: `function* g(){ (a = yield) => 0; }`,
        message: 'Arrow parameters must not contain yield expressions',
        line: 1,
    });

    fail('!function* f(a = super()){}', {
        source: `!function* f(a = super()){}`,
        message: 'super() is only valid in derived class constructors',
        line: 1,
    });

    fail('function* g(){ ({ *m([a = yield]){} }); }', {
        source: `function* g(){ ({ *m([a = yield]){} }); }`,
        message: 'Generator parameters must not contain yield expressions',
        line: 1,
    });

    fail('function* g(){ !function*([a = yield]){} }', {
        source: `function* g(){ !function*([a = yield]){} }`,
        message: 'Generator parameters must not contain yield expressions',
        line: 1,
    });

    fail('function* f(a = super.b){}', {
        source: `function* f(a = super.b){}`,
        message: '\'super\' keyword unexpected here',
        line: 1,
    });

    fail('class A extends B { a() { !function* (){ super.b(); } } }', {
        source: `class A extends B { a() { !function* (){ super.b(); } } }`,
        message: '\'super\' keyword unexpected here',
        line: 1,

    });

    fail('class A { constructor() { (class {[super()](){}}); } }', {
        source: `class A { constructor() { (class {[super()](){}}); } }`,
        message: '\'super\' keyword unexpected here',
        line: 1,
    });

    fail('class A extends B { static prototype(){} }', {
        source: `class A extends B { static prototype(){} }`,
        message: 'Classes may not have static property named prototype',
        line: 1,

    });

    fail('class A extends B { static set prototype(a) {} }', {
        source: `class A extends B { static set prototype(a) {} }`,
        message: 'Classes may not have static property named prototype',
        line: 1,

    });

    fail('super()', {
        source: `super()`,
        message: 'super() is only valid in derived class constructors',
        line: 1,
    });

    fail('unresolvableReference."";', {
        source: `unresolvableReference."";`,
        message: 'Unexpected token string',
        line: 1,
    });

    fail('labelA: break labelB;', {
        source: `labelA: break labelB;`,
        line: 1,
    });

    fail('new.target', {
        source: `new.target`,
        message: 'new.target only allowed within functions',
        line: 1,
    });

    fail('var a; export class a {};', {
        source: `var a; export class a {};`,
        message: 'Unexpected strict mode reserved word',
        line: 1,
    });

    fail('!{ __proto__: null, __proto__: null, };', {
        source: `!{ __proto__: null, __proto__: null, };`,
        message: 'Property name __proto__ appears more than once in object literal',
        line: 1,
    });

    fail('}', {
        source: `}`,
        message: 'Unexpected token',
        line: 1,
    });
});