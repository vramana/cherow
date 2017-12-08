import { pass, fail } from '../utils';

describe('Miscellaneous - Failure', () => {
    
        fail(`/*`, {
            source: `/*`,
        });
    
        fail(`/*\r\n`, {
            source: `/*\r\n`,
        });
    
        fail(`/*\r`, {
            source: `/*\r`,
        });
    
        fail(`/*\r\n`, {
            source: `/*\r\n`,
        });
    
        fail(`/*\u2028`, {
            source: `/*\u2028`,
        });
    
        fail(`/*\u2029`, {
            source: `/*\u2029`,
        });
    
        fail(`\\`, {
            source: `\\`,
        });
    
        fail(`\\u`, {
            source: `\\u`,
        });
    
        fail(`\\x`, {
            source: `\\x`,
        });
    
        fail(`\\o`, {
            source: `\\o`,
        });
    
        fail(`\\u1`, {
            source: `\\u1`,
        });
    
        fail(`\\u12`, {
            source: `\\u12`,
        });
        fail(`a\\uz`, {
            source: `a\\uz`,
        });
        fail(`a\\x`, {
            source: `a\\x`,
        });
    
        fail('a\\o', {
            source: `a\\o`
        });
        fail('a\\u12', {
            source: `a\\u12`
        });
        fail('\\uD800x', {
            source: `\\uD800x`
        });
        fail('＊', {
            source: `＊`
        });
        fail('\uD800\\u', {
            source: `\uD800\\u`
        });
        fail('\\uD800\\x62', {
            source: `\\uD800\\x62`
        });
        fail('\uD800x', {
            source: `\uD800x`
        });
        fail('1.a', {
            source: `1.a`
        });
        fail('1.e', {
            source: `1.e`
        });
        fail('1.e+', {
            source: `1.e+`
        });
        fail('0xz', {
            source: `0xz`
        });
        fail('08a', {
            source: `08a`
        });
        fail('\u0008', {
            source: `\u0008`
        });
        fail('0a', {
            source: `0a`
        });
        fail('3ea', {
            source: `3ea`
        });
        fail('3in []', {
            source: `3in []`
        });
        fail('3e', {
            source: `3e`
        });
        fail('3x0', {
            source: `3x0`
        });
        fail('3in[]', {
            source: `3in[]`
        });
        fail('x\\u002a', {
            source: `x\\u002a`
        });
        fail('\\ua', {
            source: `\\ua`
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
            source: `1 + { t:t `
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
            source: `var`
        });
        fail('const', {
            source: `const`
        });
        fail('**', {
            source: `**`
        });
        fail('#=', {
            source: `#=`
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
            source: `function true() { }`
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
            source: `function eval() {'use strict'; })()`
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
        fail('"async function* foo() { }', {
            source: `"async function* foo() { }`
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
        fail('(async function* foo() { })', {
            source: `(async function* foo() { })`
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
            source: `async ({await}) => 1`
        });
        fail('async ({a: await}) => 1', {
            source: `async ({a: await}) => 1`
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
            source: `await a`
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
            source: `({this} = x)`
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
            source: `({ 5 }) => {}`
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
        fail('let [x]', {
            source: `let [x]`
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
    });