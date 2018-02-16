import { pass, fail } from '../test-utils';

describe('Miscellaneous - Failure', () => {

    fail(`/*`, {
        source: `/*`,
        message: 'Unterminated MultiLineComment',
        line: 1,
    });

    fail(`/*\r\n`, {
        source: `/*\r\n`,
        message: 'Unterminated MultiLineComment',
        line: 1,
    });

    fail(`/*\r`, {
        source: `/*\r`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`/*\r\n`, {
        source: `/*\r\n`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`/*\u2028`, {
        source: `/*\u2028`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`/*\u2029`, {
        source: `/*\u2029`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
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
        column: 0,
        index: 0
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
        line: 1,
        message: 'Unexpected surrogate pair',
    });

    fail('\\uD800x', {
        source: `\\uD800x`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected surrogate pair',
    });

    fail('1.a', {
        source: `1.a`,
        line: 1,
        message: 'Unexpected token',
    });

    fail('1.e', {
        source: `1.e`,
        line: 1,
        message: 'Invalid non-number after exponent indicator',
    });

    fail('1.e+', {
        source: `1.e+`,
        line: 1,
        message: 'Invalid non-number after exponent indicator',
    });

    fail('0xz', {
        source: `0xz`,
        line: 1,
        message: 'Missing hexadecimal digits after \'0x\'',
        column: 0,
        index: 0
    });

    fail('08a', {
        source: `08a`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail('\\u0008', {
        source: `\\u0008`,
        line: 1,
        message: 'Invalid Unicode escape sequence',
        column: 0,
        index: 0
    });

    fail('0a', {
        source: `0a`,
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0
    });

    fail('3ea', {
        source: `3ea`,
        line: 1,
        message: 'Invalid non-number after exponent indicator',
        column: 0,
        index: 0
    });

    fail('3in []', {
        source: `3in []`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('3e', {
        source: `3e`,
        message: 'Invalid non-number after exponent indicator',
        line: 1,
        column: 0,
        index: 0
    });

    fail('3x0', {
        source: `3x0`,
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0
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
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`(((...a)))`, {
        source: `(((...a)))`,
        message: 'Unexpected token )',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`(((a, ...b))`, {
        source: `(((a, ...b))`,
        line: 1
    });

    fail(`[...new a] = 0;`, {
        source: `[...new a] = 0;`,
        message: '\'NewExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`[...0] = 0;`, {
        source: `[...0] = 0;`,
        message: '\'Literal\' is not a valid assignment left hand side',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`[...[0]] = 0;`, {
        source: `[...[0]] = 0;`,
        message: '\'Literal\' is not a valid assignment left hand side',
        line: 1,
        column: 8,
        index: 8
    });

    fail(`[...{a: 0}] = 0;`, {
        source: `[...{a: 0}] = 0;`,
        line: 1
    });

    fail(`({get a(){}} = 0)`, {
        source: `({get a(){}} = 0)`,
        line: 1,
        column: 13,
        index: 13
    });

    fail(`({set a(b){}} = 0)`, {
        source: `({set a(b){}} = 0)`,
        line: 1,
        column: 14,
        index: 14
    });

    fail(`[0] = 0`, {
        source: `[0] = 0`,
        line: 1,
        column: 3,
        index: 3
    });

    fail('for((1 + 1) in list) process(x);', {
        source: `for((1 + 1) in list) process(x);`,
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 19,
        index: 19
    });

    fail('[', {
        source: `[`,
        message: 'Unexpected token',
        line: 1,
        column: 1,
        index: 1
    });

    fail('[,', {
        source: `[,`,
        line: 1
    });

    fail('1 + { t:t ', {
        source: `1 + { t:t `,
        message: 'Unexpected token end of source',
        line: 1,
        column: 9,
        index: 9
    });

    fail('1 + {', {
        source: `1 + {`,
        line: 1,
        column: 5,
        index: 5,
        message: 'Unexpected token end of source',
    });

    fail('i #= 0', {
        source: `i #= 0`,
        line: 1,
        column: 1,
        index: 1,
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'#\'',
    });

    fail('\n\n\n{', {
        source: `\n\n\n{`,
        line: 4,
        column: 1,
        index: 4
    });

    fail('\n/* Some multiline\ncomment */\n)', {
        source: `\n/* Some multiline\ncomment */\n)`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token',
    });

    fail(', { get 2 }', {
        source: `{ get 2 }`,
        line: 1,
        column: 5,
        index: 5,
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'number\'',
    });

    fail(', { set 1 }', {
        source: `{ set 1 }`,
        line: 1,
        column: 5,
        index: 5,
        message:  'A semicolon was expected (or a \'}\' if appropriate), but got \'number\'',
    });

    fail('function t(if) { }', {
        source: `function t(if) { }`,
        line: 1,
        column: 11,
        index: 11,
        message: 'Unexpected token if',
    });

    fail('({ get: g(d) { } })', {
        source: '({ get: g(d) { } })',
        line: 1,
        column: 1,
        index: 1,
        message: 'Unexpected token {',
    });

    fail('\u200C = []', {
        source: `\u200C = []`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token',
    });

    fail('do { x } *', {
        source: `do { x } *`,
        line: 1,
        column: 8,
        index: 8
    });

    fail('var', {
        source: `var`,
        line: 1,
        column: 3,
        index: 3,
        message: 'Unexpected token end of source',
    });
    fail('const', {
        source: `const`,
        line: 1,
        column: 5,
        index: 5,
        message: 'Unexpected token end of source',
    });

    fail('**', {
        source: `**`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token',
    });

    fail('#=', {
        source: `#=`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token',
    });

    fail('\\u{}', {
        source: `\\u{}`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token',
    });

    fail('\\u{FFFF', {
        source: `\\u{FFFF`,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
    });

    fail('\\u{FFZ}', {
        source: `\\u{FFZ}`,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
    });

    fail('("\\u{}")', {
        source: `("\\u{}")`,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
    });

    fail('/./a', {
        source: `/./a`,
        line: 1,
        message: 'Unexpected regular expression flag',
    });

    fail('/./ii', {
        source: `/./ii`,
        line: 1,
        message: 'Duplicate regular expression flag i',
    });

    fail('enum : 0', {
        source: `enum : 0`,
        line: 1,
        message: 'Unexpected keyword \'enum\'',
    });

    fail('({get +:3})', {
        source: `({get +:3})`,
        line: 1,
        message: 'Unexpected token :',
    });

    fail(', { ;  ;  ', {
        source: `{ ;  ;  `,
        line: 1,
        column: 6,
        index: 6,
        message: 'Unexpected token',
    });

    fail('a b', {
        source: `a b`,
        line: 1,
        column: 1,
        index: 1,
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'identifier\'',
    });

    fail('try { } catch() {}', {
        source: `try { } catch() {}`,
        line: 1,
        column: 14,
        index: 14,
        message: 'Unexpected token )',
    });

    fail('/*\r\n*/]', {
        source: `/*\r\n*/]`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token',
    });

    fail('//\r\n]', {
        source: `//\r\n]`,
        line: 1,
        message: 'Unexpected token',
    });

    fail('\r]', {
        source: `\r]`,
        line: 1,
        message: 'Unexpected token',
    });

    fail('\n]', {
        source: `\n]`,
        line: 1,
        message: 'Unexpected token',
    });

    fail('/*hello', {
        source: `/*hello`,
        line: 1,
        message: 'Unterminated MultiLineComment',
    });

    fail('try {} catch (answer()) {} ', {
        source: `try {} catch (answer()) {} `,
        line: 1,
        column: 20,
        index: 20
    });

    fail('for(;;)', {
        source: `for(;;)`,
        line: 1,
        column: 7,
        index: 7,
        message: 'Unexpected token',
    });

    fail('for (let [] = 0, {};;);', {
        source: `for (let [] = 0, {};;);`,
        line: 1,
        column: 19,
        index: 19,
        message: 'Missing initializer in destructuring declaration',
    });

    fail('for (let [];;);', {
        source: `for (let [];;);`,
        line: 1,
        column: 11,
        index: 11,
        message: 'Missing initializer in destructuring declaration',
    });

    fail('for (var i, i2 in {});', {
        source: `for (var i, i2 in {});`,
        line: 1,
        column: 14,
        index: 14,
        message: 'Invalid left-hand side in for-in loop: Must have a single binding.',
    });

    fail('if.a;', {
        source: `if.a;`,
        line: 1,
        column: 2,
        index: 2,
        message:  'Unexpected token .',
    });

    fail('a if', {
        source: `a if`,
        line: 1,
        column: 1,
        index: 1,
        message:  'A semicolon was expected (or a \'}\' if appropriate), but got \'if\'',
    });

    fail('function true() { }', {
        source: `function true() { }`,
        message: 'Unexpected token true',
        line: 1,
        column: 8,
        index: 8
    });

    fail('"\\ux";', {
        source: `"\\ux";`,
        line: 1,
        column: 0,
        index: 0
    });

    fail('"\\u000";', {
        source: `"\\u000";`,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
    });

    fail('0O', {
        source: `0O`,
        line: 1,
        message: 'Missing octal digits after \'0o\'',
    });

    fail('0o18', {
        source: `0o18`,
        line: 1
    });

    fail('0O1a', {
        source: `0O1a`,
        line: 1
    });

    fail('x\\', {
        source: `x\\`,
        line: 1
    });

    fail('/test', {
        source: `/test`,
        line: 1
    });

    fail('3 = 4', {
        source: `3 = 4`,
        line: 1
    });

    fail('[,', {
        source: `[,`,
        line: 1
    });

    fail('var x = "', {
        source: `var x = "`,
        line: 1
    });

    fail('i #= 42', {
        source: `i #= 42`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({[a,b]:0})', {
        source: `({[a,b]:0})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('"use strict"; eval => 42', {
        source: `"use strict"; eval => 42`,
        line: 1,
        column: 18,
        index: 18
    });

    fail('use strict"; (a) => 00', {
        source: `use strict"; (a) => 00`,
        line: 1,
        column: 3,
        index: 3
    });

    fail('p = { q/ }', {
        source: `p = { q/ }`,
        line: 1,
        column: 7,
        index: 7
    });

    fail('function t(false) { }', {
        source: `function t(false) { }`,
        line: 1,
        column: 11,
        index: 11
    });

    fail('continue', {
        source: `continue`,
        line: 1,
        column: 0,
        index: 0
    });

    fail('if(false) doThis(); else', {
        source: `if(false) doThis(); else`,
        line: 1,
        column: 24,
        index: 24
    });

    fail('x: while (true) { (function () { continue x; }); }', {
        source: `x: while (true) { (function () { continue x; }); }`,
        line: 1,
        column: 32,
        index: 32
    });

    fail('function hello() {"use strict"; eval = 10; }', {
        source: `function hello() {'use strict'; eval = 10; }`,
        line: 1,
        column: 36,
        index: 36
    });

    fail('function eval() {"use strict"; })()', {
        source: `function eval() {'use strict'; })()`,
        line: 1,
    });

    fail('const', {
        source: `const`
    });

    fail('class A {get constructor(){}}', {
        source: `class A {get constructor(){}}`,
        line: 1,
        column: 13,
        index: 13
    });

    fail('x %*= y', {
        source: `x %*= y`,
        line: 1
    });

    fail('({a}) => { "use strict"; }', {
        source: `({a}) => { 'use strict'; }`,
        line: 1
    });

    fail('a => {}()', {
        source: 'A semicolon was expected (or a \'}\' if appropriate), but got \'(\'',
        line: 1
    });

    fail('async function wrap() {\nasync function await() { }\n}', {
        source: `async function wrap() {\nasync function await() { }\n}`,
        line: 2,
        column: 14,
        index: 38
    });

    fail('async function foo(await) { }', {
        source: `async function foo(await) { }`,
        line: 1,
        column: 19,
        index: 19
    });

    fail('async function foo() { return {await} }', {
        source: `async function foo() { return {await} }`,
        line: 1
    });

    fail('(async\nfunction foo() { })', {
        source: `(async\nfunction foo() { })`,
        line: 1
    });

    fail('(async function await() { })', {
        source: `(async function await() { })`,
        line: 1
    });

    fail('(async function foo(await) { })', {
        source: `(async function foo(await) { })`,
        line: 1
    });

    fail('(async function foo() { return {await} })', {
        source: `(async function foo() { return {await} })`,
        line: 1,
        column: 37,
        index: 37
    });

    fail('async\n() => a', {
        source: `async\n() => a`,
        line: 2,
        column: 2,
        index: 8
    });

    fail('async a\n=> a', {
        source: `async a\n=> a`,
        line: 1,
        column: 7,
        index: 7
    });

    fail('async ()\n=> a', {
        source: `async ()\n=> a`,
        line: 1
    });

    fail('async await => 1', {
        source: `async await => 1`,
        line: 1
    });

    fail('async (await) => 1', {
        source: `async (await) => 1`,
        line: 1
    });

    fail('async ({await}) => 1  ', {
        source: `async ({await}) => 1`,
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
    });

    fail('async ({a: await}) => 1', {
        source: `async ({a: await}) => 1`,
        line: 1
    });

    fail('[a += b] = []', {
        source: `[a += b] = []`,
        message: 'A \'=\' was expected',
        line: 1,
    });

    fail('({a: b += 0} = {})', {
        source: `({a: b += 0} = {})`,
        line: 1
    });

    fail('({async\nfoo() { }})', {
        source: `({async\nfoo() { }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async get foo() { }})', {
        source: `({async get foo() { }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async set foo(value) { }})', {
        source: `({async set foo(value) { }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async foo() { var await }})', {
        source: `({async foo() { var await }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async foo(await) { }})', {
        source: `({async foo(await) { }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async foo() { return {await} }})', {
        source: `({async foo() { return {await} }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async foo: 1})', {
        source: `({async foo: 1})`,
        line: 1
    });

    fail('class A {async get foo() { }}', {
        source: `class A {async get foo() { }}`,
        line: 1,
        column: 18,
        index: 18
    });

    fail('class A {async set foo(value) { }}', {
        source: `class A {async set foo(value) { }}`,
        line: 1
    });

    fail('class A {static async set foo(value) { }}', {
        source: `class A {static async set foo(value) { }}`,
        line: 1
    });

    fail('class A {async foo() { return {await} }}', {
        source: `class A {async foo() { return {await} }}`,
        line: 1,
        column: 36,
        index: 36
    });

    fail('invalid', {
        source: `await a`,
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'identifier\'',
        line: 1,
    });

    fail('async () => await', {
        source: `async () => await`,
        line: 1
    });

    fail('(class {async foo() { await }})', {
        source: `(class {async foo() { await }})`,
        line: 1,
        column: 27,
        index: 27
    });

    fail('async function foo(a = await b) {}', {
        source: `async function foo(a = await b) {}`,
        line: 1,
        column: 22,
        index: 22
    });

    fail('async (a = await b) => {}', {
        source: `async (a = await b) => {}`,
        line: 1,
        column: 11,
        index: 11
    });

    fail('([a.a]) => 42', {
        source: `([a.a]) => 42`,
        line: 1
    });

    fail('() => {}()', {
        source: `() => {}()`,
        line: 1
    });

    fail('(a) => {}()', {
        source: `(a) => {}()`,
        line: 1
    });

    fail('function *g() { (x = yield) => {} }', {
        source: `function *g() { (x = yield) => {} }`,
        line: 1
    });

    fail('class A { constructor() {} "constructor"() }', {
        source: `class A { constructor() {} 'constructor'() }`,
        line: 1
    });

    fail('({[x]})', {
        source: `({[x]})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('0O9', {
        source: `0O9`,
        line: 1,
        column: 0,
        index: 0
    });

    fail('( { get x() {} } = 0)', {
        source: `( { get x() {} } = 0)`,
        line: 1
    });

    fail('x \n is y', {
        source: `x \n is y`,
        line: 2
    });

    fail('x \n isnt y', {
        source: `x \n isnt y`,
        line: 2
    });

    fail('for (let x = 42 in list) process(x);', {
        source: `for (let x = 42 in list) process(x);`,
        line: 1
    });

    fail('(10, 20) => 00', {
        source: `(10, 20) => 00`,
        line: 1,
        column: 11,
        index: 11
    });

    fail('yield v', {
        source: `yield v`,
        line: 1,
        column: 5,
        index: 5
    });

    fail('let [this] = [10]', {
        source: `let [this] = [10]`,
        line: 1
    });

    fail('([function] = [10])', {
        source: `([function] = [10])`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({this} = x)', {
        source: `({this} = x)`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('var x = {this}', {
        source: `var x = {this}`,
        line: 1
    });

    fail('var obj = { *test** }', {
        source: `var obj = { *test** }`,
        line: 1
    });

    fail('class A extends yield B { }', {
        source: `class A extends yield B { }`,
        line: 1,
        column: 15,
        index: 15
    });

    fail('class default', {
        source: `class default`,
        line: 1,
        column: 5,
        index: 5
    });

    fail('function a() 1 // expression closure is not supported', {
        source: `function a() 1 // expression closure is not supported`,
        line: 1
    });

    fail('({ 42 }) = obj', {
        source: `({ 42 }) = obj`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({ 5 }) => {}', {
        source: `({ 5 }) => {}`,
        message: 'Unexpected token number',
        line: 1,
        column: 1,
        index: 1
    });

    fail('({ get test() { } }) => 42', {
        source: `({ get test() { } }) => 42`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('let [function] = x', {
        source: `let [function] = x`,
        line: 1,
        column: 5,
        index: 5
    });

    fail('"use strict"; let + 1', {
        source: `"use strict"; let + 1`,
        line: 1
    });

    fail('function* y({yield}) {}', {
        source: `function* y({yield}) {}`,
        line: 1
    });

    fail('new.target', {
        source: `new.target`,
        line: 1
    });

    fail('({ __proto__: 1, __proto__: 2 })', {
        source: `({ __proto__: 1, __proto__: 2 })`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({ __proto__: 1, __proto__: 2 })', {
        source: `({ __proto__: 1, __proto__: 2 })`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('[...x in y] = []', {
        source: `[...x in y] = []`,
        line: 1,
        column: 11,
        index: 11
    });

    fail('(function* foo(a = yield b) {})', {
        source: `(function* foo(a = yield b) {})`,
        line: 1
    });

    fail('function* foo(a = class extends (yield b) {}) {}', {
        source: `function* foo(a = class extends (yield b) {}) {}`,
        line: 1
    });

    fail('foo: class X {}', {
        source: `foo: class X {}`,
        line: 1
    });

    fail('class A { get constructor() {} }', {
        source: `class A { get constructor() {} }`,
        line: 1
    });

    fail('class A { *constructor() {} }', {
        source: `class A { *constructor() {} }`,
        line: 1,
        column: 22,
        index: 22
    });

    fail('(function ({ a(){} }) {})', {
        source: `(function ({ a(){} }) {})`,
        line: 1,
        column: 15,
        index: 15
    });

    fail('var a = { set foo(...v) {} };', {
        source: `var a = { set foo(...v) {} };`,
        line: 1
    });

    fail('class a { set foo(...v) {} };', {
        source: `class a { set foo(...v) {} };`,
        line: 1
    });

    fail('class A extends B { constructor() { super } }', {
        source: `class A extends B { constructor() { super } }`,
        line: 1
    });

    fail('class A extends B { constructor() { super; } }', {
        source: `class A extends B { constructor() { super; } }`,
        line: 1,
        column: 41,
        index: 41
    });

    fail('class A extends B { foo() { (super).foo } }', {
        source: `class A extends B { foo() { (super).foo } }`,
        line: 1,
        column: 34,
        index: 34
    });

    fail('[2] = 42', {
        source: `[2] = 42`,
        line: 1
    });

    fail('({ obj:20 }) = 42', {
        source: `({ obj:20 }) = 42`,
        line: 1
    });

    fail('void { [1, 2]: 3 };', {
        source: `void { [1, 2]: 3 };`,
        line: 1
    });

    fail('((a)) => 42', {
        source: `((a)) => 42`,
        line: 1
    });

    fail('let default', {
        source: `let default`,
        line: 1
    });

    fail('\\u{110000}', {
        source: `\\u{110000}`,
        line: 1
    });

    fail('let default', {
        source: `let default`,
        line: 1
    });

    fail('let [function] = [10]', {
        source: `let [function] = [10]`,
        line: 1
    });

    fail('(function () { yield 10 })', {
        source: `(function () { yield 10 })`,
        line: 1
    });

    fail('function f(a, ...b = 0)', {
        source: `function f(a, ...b = 0)`,
        line: 1,
        column: 18,
        index: 18
    });

    fail('for (;;) const x = 10;', {
        source: `for (;;) const x = 10;`,
        line: 1
    });

    fail('while (1) function foo(){}', {
        source: `while (1) function foo(){}`,
        line: 1
    });

    fail('x = { method() 42 }', {
        source: `x = { method() 42 }`,
        line: 1
    });

    fail('x = { get method() 42 }', {
        source: `x = { get method() 42 }`,
        line: 1
    });

    fail('super', {
        source: `super`,
        line: 1
    });

    fail('function* wrap() { return (a = 1 + (yield)) => a }', {
        source: `function* wrap() { return (a = 1 + (yield)) => a }`,
        line: 1
    });

    fail('function* foo(a = yield b) {}', {
        source: `function* foo(a = yield b) {}`,
        line: 1
    });

    fail('(function* foo(a = yield b) {})', {
        source: `(function* foo(a = yield b) {})`,
        line: 1
    });

    fail('(class {*foo(a = yield b) {}})', {
        source: `(class {*foo(a = yield b) {}})`,
        line: 1
    });

    fail('"use strict"; bar: function x() {}', {
        source: `"use strict"; bar: function x() {}`,
        line: 1
    });

    fail('export var await', {
        source: `export var await`,
        module: true,
        line: 1
    });

    fail('export var await', {
        source: `export var await`,
        module: true,
        line: 1
    });
    fail('export new Foo();', {
        source: `export new Foo();`,
        module: true,
        line: 1
    });
    fail('export typeof foo;', {
        source: `export typeof foo;`,
        module: true,
        line: 1
    });
    fail('export *;', {
        source: `export *`,
        module: true,
        line: 1,
        column: 8,
        index: 8
    });
    fail('export { default }', {
        source: `export var await`,
        module: true,
        line: 1
    });
    fail('export { if }', {
        source: `export new Foo();`,
        module: true,
        line: 1
    });
    fail('export { default as foo }', {
        source: `export typeof foo;`,
        module: true,
        line: 1
    });
    fail('export { if as foo }', {
        source: `export { if as foo }`,
        module: true,
        line: 1
    });

    fail('0 = 0;', {
        source: `0 = 0;`,
        line: 1,
        message: '\'Literal\' is not a valid assignment left hand side',
        column: 1,
        index: 1
    });

    fail('0++', {
        source: `0++`,
        message: 'Invalid left-hand side expression in Postfix operation',
        column: 1,
        index: 1
    });

    fail('0--', {
        source: `0--`,
        line: 1,
        message: 'Invalid left-hand side expression in Postfix operation',
        column: 1,
        index: 1
    });

    fail('[a] *= 0;', {
        source: `[a] *= 0;`,
        line: 1,
        message: 'Invalid left-hand side in assignment',
        column: 3,
        index: 3
    });

    fail('0 /= 0;', {
        source: `0 /= 0;`,
        message: 'Invalid left-hand side in assignment',
        line: 1,
        column: 1,
        index: 1
    });

    fail('[...{a: 0}] = 0;', {
        source: `[...{a: 0}] = 0;`,
        line: 1
    });

    fail('for({a: 0} in 0);', {
        source: `for({a: 0} in 0);`,
        line: 1
    });

    fail('for([0] in 0);', {
        source: `for([0] in 0);`,
        line: 1,
        message: '\'Literal\' is not a valid assignment left hand side',
        column: 12,
        index: 12
    });

    fail('for([0] of 0);', {
        source: `for([0] of 0);`,
        line: 1,
        message: '\'Literal\' is not a valid assignment left hand side',
        column: 12,
        index: 12
    });

    fail('for(0 of 0);', {
        source: `for(0 of 0);`,
        line: 1
    });

    fail('for((0) in 0);', {
        source: `for((0) in 0);`,
        message: 'Invalid left-hand side in for-loop',
        line: 1,
    });

    fail('for((0) of 0);', {
        source: `for((0) of 0);`,
        line: 1
    });

    fail('a\\u{0}', {
        source: `a\\u{0}`,
        line: 1
    });

    fail('\\u{FFFFFFF}")', {
        source: `\\u{FFFFFFF}")`,
        line: 1,
        message: 'Undefined Unicode code-point',
    });

    fail('/./\\u0069', {
        source: `/./\\u{69}`,
        line: 1,
        message: 'Unexpected regular expression flag',
    });

    fail('"use strict"; implements:0;', {
        source: `"use strict"; implements:0;`,
        line: 1,
        message: 'Unexpected keyword \'implements\'',
    });

    fail('"use strict"; +package;', {
        source: `"use strict"; +package;`,
        line: 1,
        message: 'Unexpected keyword \'package\'',
    });

    fail('"use strict"; +static;', {
        source: `"use strict"; +static;`,
        line: 1,
        message: 'Unexpected keyword \'static\'',
        column: 15,
        index: 15
    });

    fail('"use strict"; yield:0;', {
        source: `"use strict"; yield:0;`,
        line: 1,
        message: 'Unexpected keyword \'yield\'',
        column: 13,
        index: 13
    });

    fail('"use strict"; function a([yield]){}', {
        source: `"use strict"; function a([yield]){}`,
        line: 1,
        message: '\'yield\' may not be used as an identifier in this context',
        column: 26,
        index: 26
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
        line: 1,
        message: 'Unexpected keyword \'package\'',
    });

    fail('!{ get a() { "use strict"; +let; } }', {
        source: `!{ get a() { "use strict"; +let; } }`,
        line: 1,
        message: 'The identifier \'let\' must not be in expression position in strict mode',
    });

    fail('({ a(){ super(); } });', {
        source: `({ a(){ super(); } });`,
        line: 1,
        message: 'super() is not allowed in this context',
    });

    fail('/?/', {
        source: `/?/`,
        line: 1,
        message: 'Unexpected regular expression',
    });

    fail('{ const a; }', {
        source: `{ const a; }`,
        line: 1,
        message: 'Missing initializer in const declaration',
    });

    fail('const a;', {
        source: `const a;`,
        line: 1,
        message: 'Missing initializer in const declaration',
    });

    fail('for(const a = 0, b;;);', {
        source: `for(const a = 0, b;;);`,
        line: 1,
        message: 'Missing initializer in const declaration',
    });

    fail('if(0) label: function f(){}', {
        source: `if(0) label: function f(){}`,
        line: 1,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
    });

    fail('do label: function f(){} while (0)', {
        source: `do label: function f(){} while (0)`,
        line: 1,
        message: 'In strict mode code, functions can only be declared at top level or inside a block',
    });

    fail('for(a in b) label: function f(){}', {
        source: `for(a in b) label: function f(){}`,
        line: 1,
        message: 'In strict mode code, functions can only be declared at top level or inside a block',
    });

    fail('for(let a in b) label: function f(){}', {
        source: `for(let a in b) label: function f(){}`,
        line: 1,
        message: 'In strict mode code, functions can only be declared at top level or inside a block',
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
        message: 'super() is not allowed in this context',
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
        message: 'In strict mode code, functions can only be declared at top level or inside a block',
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
        message: 'super() is not allowed in this context',
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
        message: 'Member access from super not allowed in this context',
        line: 1,
    });

    fail('class A extends B { a() { !function* (){ super.b(); } } }', {
        source: `class A extends B { a() { !function* (){ super.b(); } } }`,
        message: 'Member access from super not allowed in this context',
        line: 1,

    });

    fail('class A { constructor() { (class {[super()](){}}); } }', {
        source: `class A { constructor() { (class {[super()](){}}); } }`,
        message: 'super() is not allowed in this context',
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
        message: 'super() is not allowed in this context',
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
        message: 'Unexpected keyword \'export\'',
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

    fail('var obj = { *test** }', {
        source: `var obj = { *test** }`,
        message: 'Unexpected token *',
        line: 1,
    });

    fail('class A extends yield B { }', {
        source: `class A extends yield B { }`,
        message: 'Unexpected keyword \'yield\'',
        line: 1,
    });

    fail('`test', {
        source: '`test',
        message: 'Unexpected token',
        line: 1,
    });

    fail('switch `test`', {
        source: 'switch `test`',
        message: 'Unexpected token template end',
        line: 1,
    });

    fail('function f(a, ...b, c)', {
        source: `function f(a, ...b, c)`,
        message: 'Rest parameter must be last formal parameter',
        line: 1,
    });

    fail('[a, ...b = 0] = []', {
        source: `[a, ...b = 0] = []`,
        message: 'Rest elements cannot have a default value',
        line: 1,
    });

    fail('"(...a, b) => {}', {
        source: `"(...a, b) => {}`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('([ 5 ]) => {}', {
        source: `([ 5 ]) => {}`,
        message:  '\'Literal\' can not be treated as an actual binding pattern',
        line: 1,
    });

    fail('({ 5 }) => {}', {
        source: `({ 5 }) => {}`,
        message: 'Unexpected token number',
        line: 1,
    });

    fail('(...[ 5 ]) => {}', {
        source: `(...[ 5 ]) => {}`,
        message: 'Unexpected token number',
        line: 1,
    });

    fail('if (1) let x = 10;', {
        source: `if (1) let x = 10;`,
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'identifier\'',
        line: 1,
    });

    fail('for (;;) const x = 10;', {
        source: `for (;;) const x = 10;`,
        message: 'Unexpected keyword \'const\'',
        line: 1,
    });

    fail('function* y({yield}) {}', {
        source: `function* y({yield}) {}`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
    });

    fail('x = { get method() 42 }', {
        source: `x = { get method() 42 }`,
        message: 'Unexpected token number',
        line: 1,
    });

    fail('class A { get prop(x) {} }', {
        source: `class A { get prop(x) {} }`,
        message: 'Getter functions must have no arguments',
        line: 1,
    });

    fail('class A { set prop() {} }', {
        source: `class A { set prop() {} }`,
        message: 'Setter function must have exactly one argument',
        line: 1,
    });

    fail('class A { set prop(x, y) {} }', {
        source: `class A { set prop(x, y) {} }`,
        message: 'Setter function must have exactly one argument',
        line: 1,
    });

    fail('[...x in y] = []', {
        source: `[...x in y] = []`,
        message: '\'BinaryExpression\' is not a valid assignment left hand side',
        line: 1,
    });
    /*
        fail('function foo() { "use strict"; var {eval = 1} = {} }', {
            source: `function foo() { "use strict"; var {eval = 1} = {} }`,
            message: 'Setter function must have exactly one argument',
            line: 1,
        });
    */
    fail('function* wrap() { return (a = 1 + (yield)) => a }"', {
        source: `function* wrap() { return (a = 1 + (yield)) => a }"`,
        message: 'Arrow parameters must not contain yield expressions',
        line: 1,
    });

    fail('function* foo(a = class extends (yield b) {}) {}', {
        source: `function* foo(a = class extends (yield b) {}) {}`,
        message: 'Generator parameters must not contain yield expressions',
        line: 1,
    });

    fail('function* wrap() {\n({a = yield b} = obj) => a\n}', {
        source: `function* wrap() {\n({a = yield b} = obj) => a\n}`,
        message: 'Arrow parameters must not contain yield expressions',
        line: 2,
    });

    fail('foo: class X {}"', {
        source: `foo: class X {}"`,
        message: 'class can\'t appear in single-statement context',
        line: 1,
    });

    fail('class A { set prop(x, y) {} }', {
        source: `class A { set prop(x, y) {} }`,
        message: 'Setter function must have exactly one argument',
        line: 1,
    });

    fail('(x) => {} + 2', {
        source: `(x) => {} + 2`,
        message: 'Unexpected token +',
        line: 1,
    });

    fail('class A extends B { constructor() { super } }', {
        source: `class A extends B { constructor() { super } }`,
        message: 'Only "(" or "." or "[" are allowed after \'super\'',
        line: 1,
    });

    fail('for (let x of y, z) {}', {
        source: `for (let x of y, z) {}`,
        message: 'Unexpected token ,',
        line: 1,
    });

    fail('[...foo, bar] = b', {
        source: `[...foo, bar] = b`,
        message: 'Rest elements cannot have a default value',
        line: 1,
    });

    fail('for (let [...foo, bar] in qux);', {
        source: `for (let [...foo, bar] in qux);`,
        message:  'Unexpected token ,',
        line: 1,
    });

    fail('([a.a]) => 42', {
        source: `([a.a]) => 42`,
        message: '\'MemberExpression\' can not be treated as an actual binding pattern',
        line: 1,
    });

    fail('() => {}()', {
        source: `() => {}()`,
        message: 'Unexpected token (',
        line: 1,
    });

    fail('(a) => {}()', {
        source: `(a) => {}()`,
        message: 'Unexpected token (',
        line: 1,
    });

    fail('a => {}()', {
        source: `a => {}()`,
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'(\'',
        line: 1,
    });

    fail('class A {set a(yield){}}', {
        source: 'class A {set a(yield){}}' ,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
    });

    fail('();', {
        source: `();`,
        message: 'Unexpected token',
        line: 1,
    });
/*
    fail('[([a])] = 12;', {
        source: `[([a])] = 12;`,
        message: 'Unexpected token (',
        line: 1,
    });

    fail('(a, ...b);', {
        source: `(a, ...b);`,
        message: 'Unexpected token (',
        line: 1,
    });*/

    fail('var e = [a -= 12] = 5', {
        source: `var e = [a -= 12] = 5`,
        message:  'A \'=\' was expected',
        line: 1,
    });

  /*  fail(`function l() { '\\12'; 'use strict' }`, {
        source: `function l() { '\\12'; 'use strict' }`,
        message: 'Unexpected token (',
        line: 1,
    });*/

    fail('[ a -= 12 ] = 12;', {
        source: `[ a -= 12 ] = 12;`,
        message: 'A \'=\' was expected',
        line: 1,
    });

    fail('(((a, ...b)))', {
        source: `(((a, ...b)))`,
        message:  'Unexpected token )',
        line: 1,
    });

    fail('class A extends B { constructor() { !{constructor() { super(); }}; } }', {
        source: `class A extends B { constructor() { !{constructor() { super(); }}; } }`,
        message:  'super() is not allowed in this context',
        line: 1,
    });

    fail(`'use strict'; ({eval} = 0);`, {
        source: `'use strict'; ({eval} = 0);`,
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
    });

    fail('(a, ...b)', {
        source: `(a, ...b)`,
        message:  'Unexpected token end of source',
        line: 1,
    });

    fail('(((...a)))', {
        source: `(((...a)))`,
        message: 'Unexpected token )',
        line: 1,
    });

    fail('let let;', {
        source: `let let;`,
        message:  'let is disallowed as a lexically bound name',
        line: 1,
    });

    fail('for(({a: 0}) in 0);', {
        source: `for(({a: 0}) in 0);`,
        message:  '\'Literal\' is not a valid assignment left hand side',
        line: 1,
    });

    fail('for(([0]) in 0);', {
        source: `for(([0]) in 0);`,
        message:  '\'Literal\' is not a valid assignment left hand side',
        line: 1,
    });

    fail('for(const let = 0;;);', {
        source: `for(const let = 0;;);`,
        message: 'let is disallowed as a lexically bound name',
        line: 1,
    });

    fail('function f(){ const a; }', {
        source: `function f(){ const a; }`,
        message: 'Missing initializer in const declaration',
        line: 1,
    });

    fail('for(;;) labelA: labelB: labelC: function f(){}', {
        source: `for(;;) labelA: labelB: labelC: function f(){}`,
        message:  'In strict mode code, functions can only be declared at top level or inside a block',
        line: 1,
    });

    fail('label: continue label;', {
        source: `label: continue label;`,
        message: 'continue  statement must be nested within an iteration statement' ,
        line: 1,
    });

    fail('x = { set f(...y) {} }', {
        source: `x = { set f(...y) {} }`,
        message: 'Setter function argument must not be a rest parameter',
        line: 1,
    });
});