import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Test262 Failing tests', () => {

    it('should fail on "({get{a}:0})"', () => {
        expect(() => {
            parseScript('({get{a}:0})');
        }).to.throw();
    });
    it('should fail on "{"', () => {
        expect(() => {
            parseScript('{');
        }).to.throw();
    });
    it('should fail on "/*"', () => {
        expect(() => {
            parseScript('/*');
        }).to.throw();
    });
    it('should fail on "/42"', () => {
        expect(() => {
            parseScript('/42');
        }).to.throw();
    });
    it('should fail on "{ return; }"', () => {
        expect(() => {
            parseScript('{ return; }');
        }).to.throw();
    });
    it('should fail on "\\uD800\\x62"', () => {
        expect(() => {
            parseScript('\\uD800\\x62');
        }).to.throw();
    });
    it('should fail on "var new A = 0;"', () => {
        expect(() => {
            parseScript('var new A = 0;');
        }).to.throw();
    });
    it('should fail on "({get"', () => {
        expect(() => {
            parseScript('({get');
        }).to.throw();
    });
    it('should fail on "function null() { }"', () => {
        expect(() => {
            parseScript('function null() { }');
        }).to.throw();
    });
    it('should fail on "function x(...a = 1){}"', () => {
        expect(() => {
            parseScript('function x(...a = 1){}');
        }).to.throw();
    });

    it('should fail on "import {b,,c} from "a";"', () => {
        expect(() => {
            parseModule('import {b,,c} from "a";');
        }).to.throw();
    });

    it('should fail on "new.prop"', () => {
        expect(() => {
            parseScript('new.prop');
        }).to.throw();
    });
    it('should fail on " class"', () => {
        expect(() => {
            parseScript('class');
        }).to.throw();
    });
    it('should fail on " [+{a = 0}];"', () => {
        expect(() => {
            parseScript('[+{a = 0}];');
        }).to.not.throw();
    });
    it('should fail on "({ set: s() { } }) "', () => {
        expect(() => {
            parseScript('({ set: s() { } })');
        }).to.throw();
    });
    it('should fail on "foo[/42"', () => {
        expect(() => {
            parseScript('foo[/42');
        }).to.throw();
    });
    it('should fail on "yield v "', () => {
        expect(() => {
            parseScript('yield v');
        }).to.throw();
    });
    it('should fail on "(10) => 0"', () => {
        expect(() => {
            parseScript('(10) => 0');
        }).to.throw();
    });
    it('should fail on "\\u12"', () => {
        expect(() => {
            parseScript('\\u12');
        }).to.throw();
    });
    it('should fail on " [{a = 0}];"', () => {
        expect(() => {
            parseScript('[{a = 0}];');
        }).to.not.throw();
    });
    it('should fail on "1 + { t:t,"', () => {
        expect(() => {
            parseScript('1 + { t:t,');
        }).to.throw();
    });
    it('should fail on "0B9"', () => {
        expect(() => {
            parseScript('0B9');
        }).to.throw();
    });
    it('should fail on "let x,;"', () => {
        expect(() => {
            parseScript('let x,;');
        }).to.throw();
    });
    it('should fail on " () + 0"', () => {
        expect(() => {
            parseScript('() + 0');
        }).to.throw();
    });
    it('should fail on " for (const of 42);"', () => {
        expect(() => {
            parseScript('for (const of 42);');
        }).to.throw();
    });
    it('should fail on "or (let let;;;) {} "', () => {
        expect(() => {
            parseScript('or (let let;;;) {}');
        }).to.throw();
    });
    it('should fail on "({a,,} = 0) "', () => {
        expect(() => {
            parseScript('({a,,} = 0)');
        }).to.throw();
    });
    it('should fail on "({get a(){}})=0 "', () => {
        expect(() => {
            parseScript('({get a(){}})=0');
        }).to.throw();
    });
    it('should fail on "a enum; "', () => {
        expect(() => {
            parseScript('a enum;');
        }).to.throw();
    });
    it('should fail on "import foo from "foo"; "', () => {
        expect(() => {
            parseScript('import foo from "foo";');
        }).to.throw();
    });
    it('should fail on " for(let [a, a];;);"', () => {
        expect(() => {
            parseScript('for(let [a, a];;);');
        }).to.not.throw('');
    });
    it('should fail on "function* a({e: a.b}) {} "', () => {
        expect(() => {
            parseScript('function* a({e: a.b}) {}');
        }).to.throw();
    });
    it('should fail on "[...x, y] = 0"', () => {
        expect(() => {
            parseScript('  [...x, y] = 0');
        }).to.not.throw();
    });
    it('should fail on " () ? 42"', () => {
        expect(() => {
            parseScript('() ? 42');
        }).to.throw();
    });
    it('should fail on "(1 + 1) = 10 "', () => {
        expect(() => {
            parseScript('(1 + 1) = 10');
        }).to.throw();
    });
    it('should fail on "(function*yield(){}) "', () => {
        expect(() => {
            parseScript('(function*yield(){})');
        }).to.throw();
    });

    it('should fail on "class A extends a + b {} "', () => {
        expect(() => {
            parseScript('class A extends a + b {}');
        }).to.throw();
    });
    it('should fail on "function *g() { var yield; } "', () => {
        expect(() => {
            parseScript('function *g() { var yield; }');
        }).to.throw();
    });
    it('should fail on " ({a({e: a.b}){}})"', () => {
        expect(() => {
            parseScript('({a({e: a.b}){}})');
        }).to.throw();
    });
    it('should fail on " export 3"', () => {
        expect(() => {
            parseModule('export 3');
        }).to.throw();
    });
    it('should fail on " []=>0"', () => {
        expect(() => {
            parseScript('[]=>0');
        }).to.throw();
    });
    it('should fail on "export var await "', () => {
        expect(() => {
            parseScript('export var await');
        }).to.throw();
    });
    it('should fail on " function default() {}"', () => {
        expect(() => {
            parseScript('function default() {}');
        }).to.throw();
    });
    it('should fail on "with(x) "', () => {
        expect(() => {
            parseScript('with(x)');
        }).to.throw();
    });
    it('should fail on "function if() { }"', () => {
        expect(() => {
            parseScript('function if() { }');
        }).to.throw();
    });
    it('should fail on "var [a.b] = 0 "', () => {
        expect(() => {
            parseScript('var [a.b] = 0 ');
        }).to.throw();
    });
    it('should fail on "["', () => {
        expect(() => {
            parseScript('[');
        }).to.throw();
    });
    it('should fail on " 0o"', () => {
        expect(() => {
            parseScript('0o');
        }).to.throw();
    });
    it('should fail on " 0o18"', () => {
        expect(() => {
            parseScript('0o18');
        }).to.throw('');
    });
    it('should fail on "var x = /(s/g "', () => {
        expect(() => {
            parseScript('var x = /(s/g');
        }).to.not.throw();
    });
    it('should fail on "/ "', () => {
        expect(() => {
            parseScript('/');
        }).to.throw();
    });
    it('should fail on " /test"', () => {
        expect(() => {
            parseScript('/test');
        }).to.throw();
    });
    it('should fail on "var source = "var x = /[a-z]/\\ux";"', () => {
        expect(() => {
            parseScript('var source = "var x = /[a-z]/\\ux";');
        }).to.throw();
    });
    it('should fail on "func() = 4 "', () => {
        expect(() => {
            parseScript('func() = 4');
        }).to.throw();
    });
    it('should fail on " 3 = 4"', () => {
        expect(() => {
            parseScript('3 = 4');
        }).to.throw();
    });
    it('should fail on "1++"', () => {
        expect(() => {
            parseScript('1++');
        }).to.throw();
    });
    it('should fail on " 1--"', () => {
        expect(() => {
            parseScript('1--');
        }).to.throw();
    });
    it('should fail on "++1 "', () => {
        expect(() => {
            parseScript('++1');
        }).to.throw();
    });
    it('should fail on "for((1 + 1) in list) process(x);"', () => {
        expect(() => {
            parseScript('for((1 + 1) in list) process(x);');
        }).to.throw();
    });
    it('should fail on "[, "', () => {
        expect(() => {
            parseScript('[,');
        }).to.throw();
    });
    it('should fail on "var x = " "', () => {
        expect(() => {
            parseScript('var x = " ');
        }).to.throw();
    });
    it('should fail on "var if = 42 "', () => {
        expect(() => {
            parseScript('var if = 42 ');
        }).to.throw();
    });
    it('should fail on " +i = 42"', () => {
        expect(() => {
            parseScript('+i = 42');
        }).to.throw();
    });
    it('should fail on "1 + ( "', () => {
        expect(() => {
            parseScript('1 + (');
        }).to.throw();
    });
    it('should fail on "({ set: s(if) { } }) "', () => {
        expect(() => {
            parseScript('({ set: s(if) { } })');
        }).to.throw();
    });

    it('should fail on "(a, (b)) => 42"', () => {
        expect(() => {
            parseScript('(a, (b)) => 42');
        }).to.throw();
    });
    it('should fail on "((a), (b)) => 42"', () => {
        expect(() => {
            parseScript('((a), (b)) => 42');
        }).to.throw();
    });

    it('should fail on ""use strict"; arguments => 42"', () => {
        expect(() => {
            parseScript('"use strict"; arguments => 42');
        }).to.throw();
    });
    it('should fail on ""use strict"; (a) => 00 "', () => {
        expect(() => {
            parseScript('"use strict"; (a) => 00');
        }).to.throw('');
    });
    it('should fail on " (10, 20) => 00"', () => {
        expect(() => {
            parseScript('(10, 20) => 00');
        }).to.throw();
    });
    it('should fail on "({ set: s() { } }) "', () => {
        expect(() => {
            parseScript('({ set: s() { } })');
        }).to.throw();
    });
    it('should fail on " ({ set: s(a, b) { } })"', () => {
        expect(() => {
            parseScript('({ set: s(a, b) { } })');
        }).to.throw();
    });
    it('should fail on " ({[a,b]:0})"', () => {
        expect(() => {
            parseScript('({[a,b]:0})');
        }).to.not.throw();
    });
    it(`should fail on "function true() { }"`, () => {
        expect(() => {
            parseScript(`function true() { }`)
        }).to.throw();
    });
    it(`should fail on "function if() { }"`, () => {
        expect(() => {
            parseScript(`function if() { }`)
        }).to.throw();
    });
    it(`should fail on "function null() { }"`, () => {
        expect(() => {
            parseScript(`function null() { }`)
        }).to.throw();
    });
    it(`should fail on ""`, () => {
        expect(() => {
            parseScript(`catch(){} finally{}`)
        }).to.throw();
    });
    it(`should fail on ""`, () => {
        expect(() => {
            parseModule(`"use strict"; function static() {"use strict"; }`)
        }).to.throw();
    });
    it(`should fail on ""`, () => {
        expect(() => {
            parseModule(`function static() { "use strict"; }`)
        }).to.throw();
    });
    it(`should fail on "a b;"`, () => {
        expect(() => {
            parseScript(`a b;`)
        }).to.throw();
    });
    it(`should fail on "if.a;"`, () => {
        expect(() => {
            parseScript(`if.a;`)
        }).to.throw();
    });
    it(`should fail on "a class;"`, () => {
        expect(() => {
            parseScript(`a class;`)
        }).to.throw();
    });
    it(`should fail on "try {} catch (answer()) {} "`, () => {
        expect(() => {
            parseScript(`try {} catch (answer()) {} `)
        }).to.throw();
    });
    it(`should fail on "try {} catch (-x) {}"`, () => {
        expect(() => {
            parseScript(`try {} catch (-x) {}`)
        }).to.throw();
    });
    it(`should fail on "switch (c) { default: default: }"`, () => {
        expect(() => {
            parseScript(`switch (c) { default: default: }`)
        }).to.throw();
    });
    it(`should fail on "do { x } *"`, () => {
        expect(() => {
            parseScript(`do { x } *`)
        }).to.throw();
    });
    it(`should fail on "{ ;  ;  "`, () => {
        expect(() => {
            parseScript(`{ ;  ;  `)
        }).to.throw();
    });
    it(`should fail on "({get +:3})"`, () => {
        expect(() => {
            parseScript(`({get +:3})`)
        }).to.throw();
    });
    it(`should fail on "#="`, () => {
        expect(() => {
            parseScript(`#=`)
        }).to.throw();
    });
    // it(`should fail on "function* f() { [yield {a = 0}]; }"`, () => { expect(() => { parseScript(`function* f() { [yield {a = 0}]; }`) }).to.throw(); });
    // it(`should fail on "function* f() { [yield* {a = 0}]; }"`, () => { expect(() => { parseScript(`function* f() { [yield* {a = 0}]; }`) }).to.throw(); });
    it(`should fail on "'1 / %"`, () => {
        expect(() => {
            parseScript(`'1 / %`)
        }).to.throw();
    });
    it(`should fail on "\\u{}"`, () => {
        expect(() => {
            parseScript(`\\u{}`)
        }).to.throw();
    });
    it(`should fail on "("\\u{}"`, () => {
        expect(() => {
            parseScript(`("\\u{}`)
        }).to.throw();
    });
    //it(`should fail on ""use strict"; function f(){("\\1");}"`, () => { expect(() => { parseScript(`"use strict"; function f(){("\\1");}`) }).to.throw(); });
    it(`should fail on ""use strict"; function f(){01;}"`, () => {
        expect(() => {
            parseScript(`"use strict"; function f(){01;}`)
        }).to.throw();
    });
    it(`should fail on "/./ii"`, () => {
        expect(() => {
            parseScript(`/./ii`)
        }).to.throw();
    });
    it(`should fail on "enum : 0"`, () => {
        expect(() => {
            parseScript(`enum : 0`)
        }).to.throw();
    });

    it('should fail on "({get{a}:0})"', () => {
        expect(() => {
            parseScript(`({get{a}:0})`);
        }).to.throw();
    });
    it('should fail on "{"', () => {
        expect(() => {
            parseScript(`{`);
        }).to.throw();
    });
    it('should fail on "import * as enum from ""foo"""', () => {
        expect(() => {
            parseScript(`import * as enum from 'foo'`);
        }).to.throw();
    });
    it('should fail on "/42"', () => {
        expect(() => {
            parseScript(`/42`);
        }).to.throw();
    });
    it('should fail on "\\uD800\\x62"', () => {
        expect(() => {
            parseScript(`\\uD800\\x62`);
        }).to.throw();
    });
    it('should fail on "var new A = 0;"', () => {
        expect(() => {
            parseScript(`var new A = 0;`);
        }).to.throw();
    });
    it('should fail on "({get"', () => {
        expect(() => {
            parseScript(`({get `);
        }).to.throw();
    });
    it('should fail on "function null() { }"', () => {
        expect(() => {
            parseScript(`function null() { }`);
        }).to.throw();
    });
    it('should fail on "x is y "', () => {
        expect(() => {
            parseScript(`x 
is y`);
        }).to.throw();
    });
    it('should fail on "function x(...a = 1){}"', () => {
        expect(() => {
            parseScript(`function x(...a = 1){}`);
        }).to.throw();
    });

    it('should fail on "import {b,,c} from "a";"', () => {
        expect(() => {
            parseModule(`import {b,,c} from 'a';`);
        }).to.throw();
    });
    it('should fail on "0b1a"', () => {
        expect(() => {
            parseScript(`0b1a`);
        }).to.throw();
    });

    it('should fail on "new.prop"', () => {
        expect(() => {
            parseScript(`new.prop`);
        }).to.throw();
    });
    it('should fail on "class "', () => {
        expect(() => {
            parseScript(`class`);
        }).to.throw();
    });
    it('should fail on "({ set: s() { } })"', () => {
        expect(() => {
            parseScript(`({ set: s() { } })`);
        }).to.throw();
    });
    it('should fail on "({a,,} = 0)"', () => {
        expect(() => {
            parseScript(`({a,,} = 0)`);
        }).to.throw();
    });
    it('should fail on "\\x";"', () => {
        expect(() => {
            parseScript(`"\\x";`);
        }).to.throw();
    });
    it('should fail on "foo[/42"', () => {
        expect(() => {
            parseScript(`foo[/42`);
        }).to.throw();
    });
    it('should fail on "yield v "', () => {
        expect(() => {
            parseScript(`yield v`);
        }).to.throw();
    });
    it('should fail on "for (const of 42);"', () => {
        expect(() => {
            parseScript(`for (const of 42);`);
        }).to.throw();
    });
    it('should fail on "for (let let;;;) {}"', () => {
        expect(() => {
            parseScript(`for (let let;;;) {}`);
        }).to.throw();
    });
    it('should fail on "function t(...) { }"', () => {
        expect(() => {
            parseScript(`function t(...) { }`);
        }).to.throw();
    });
    it('should fail on "const"', () => {
        expect(() => {
            parseScript(`const `);
        }).to.throw();
    });
    it('should fail on "(class {)"', () => {
        expect(() => {
            parseScript(`(class {)`);
        }).to.throw();
    });
    it('should fail on "switch (c) { default: default: }"', () => {
        expect(() => {
            parseScript(`switch (c) { default: default: }`);
        }).to.throw();
    });
    it('should fail on "x is y "', () => {
        expect(() => {
            parseScript(`x 
is y`);
        }).to.throw();
    });
    it('should fail on "function x(...a = 1){}"', () => {
        expect(() => {
            parseScript(`function x(...a = 1){}`);
        }).to.throw();
    });
    it('should fail on "0B18"', () => {
        expect(() => {
            parseScript(`0B18`);
        }).to.throw();
    });
    it('should fail on "function l(w,[w]) { }"', () => {
        expect(() => {
            parseScript(`function l(w,[w]) { }`);
        }).to.not.throw();
    });
    it('should fail on "function l(w,[w]) { }"', () => {
        expect(() => {
            parseScript(`function l(w,[w]) { }`);
        }).to.not.throw();
    });
    it('should fail on "function l(w,[w]) { }"', () => {
        expect(() => {
            parseScript(`function l(w,[w]) { }`);
        }).to.not.throw();
    });
    it('should fail on "function l(w,w=12) { }"', () => {
        expect(() => {
            parseScript(`function l(w,w=12) { }`);
        }).to.not.throw();
    });

    it('should fail on "function l(w,{w}) { }"', () => {
        expect(() => {
            parseScript(`function l(w,{w}) { }`);
        }).to.not.throw();
    });
    it('should fail on "function l([w,w]) { }"', () => {
        expect(() => {
            parseScript(`function l([w,w]) { }`);
        }).to.not.throw();
    });
    it('should fail on "function l([w], w) { }v"', () => {
        expect(() => {
            parseScript(`function l([w], w) { }`);
        }).to.not.throw();
    });
    it('should fail on "function l({w}, w) { }  "', () => {
        expect(() => {
            parseScript(`function l({w}, w) { }  `);
        }).to.not.throw();
    });
    it('should fail on "( { get x() {} } ) = 0"', () => {
        expect(() => {
            parseScript('( { get x() {} } ) = 0');
        }).to.throw();
    });
    it('should fail on ""use strict"; ({ v: eval }) = obj"', () => {
        expect(() => {
            parseScript('"use strict"; ({ v: eval }) = obj');
        }).to.throw();
    });
    it('should fail on "import foo from bar"', () => {
        expect(() => {
            parseScript('import foo from bar');
        }).to.throw();
    });

    it('should fail on "for((1 + 1) in list) process(x);"', () => {
        expect(() => {
            parseScript('for((1 + 1) in list) process(x);');
        }).to.throw();
    });

    it('should fail on "() <= 42"', () => {
        expect(() => {
            parseScript('() <= 42');
        }).to.throw();
    });
    it('should fail on "(10) => 00"', () => {
        expect(() => {
            parseScript('(10) => 00');
        }).to.throw();
    });

    it('should fail on "(10, 20) => 00"', () => {
        expect(() => {
            parseScript('(10, 20) => 00');
        }).to.throw();
    });
    it('should fail on "yield v"', () => {
        expect(() => {
            parseScript('yield v');
        }).to.throw();
    });

    it('should fail on "(() => { yield 10 })"', () => {
        expect(() => {
            parseScript('(() => { yield 10 })');
        }).to.throw();
    });
    it('should fail on (() => { "use strict"; f(yield v) })', () => {
        expect(() => {
            parseScript('(() => { "use strict"; f(yield v) })');
        }).to.throw();
    });

    it('should fail on "var obj = { *test** }"', () => {
        expect(() => {
            parseScript('var obj = { *test** }');
        }).to.throw();
    });
    it('should fail on "function f(a, ...b, c)"', () => {
        expect(() => {
            parseScript('function f(a, ...b, c)');
        }).to.throw();
    });

    it('should fail on "({ "chance" }) = obj"', () => {
        expect(() => {
            parseScript('({ "chance" }) = obj');
        }).to.throw();
    });

    it('should fail on "({ 42 }) = obj"', () => {
        expect(() => {
            parseScript('({ 42 }) = obj');
        }).to.throw();
    });

    it('should fail on "function f(a, ...b, c)"', () => {
        expect(() => {
            parseScript('function f(a, ...b, c)');
        }).to.throw();
    });
    it('should fail on "function t(true) { }"', () => {
        expect(() => {
            parseScript('function t(true) { }');
        }).to.throw();
    });
    it('should fail on "function t(false) { }"', () => {
        expect(() => {
            parseScript('function t(false) { }');
        }).to.throw();
    });

    it('should fail on "function null() { }"', () => {
        expect(() => {
            parseScript('function null() { }');
        }).to.throw();
    });
    it('should fail on "function if() { }"', () => {
        expect(() => {
            parseScript('function if() { }');
        }).to.throw();
    });

    it('should fail on "x = { get method() 42 }', () => {
        expect(() => {
            parseScript('x = { get method() 42 }');
        }).to.throw();
    });
    it('should fail on "for ((i in {}));"', () => {
        expect(() => {
            parseScript('for ((i in {}));');
        }).to.throw();
    });
    it('should fail on "for (var i, i2 in {});"', () => {
        expect(() => {
            parseScript('for (var i, i2 in {});');
        }).to.throw();
    });
    it('should fail on "for (i + 1 in {});"', () => {
        expect(() => {
            parseScript('for (i + 1 in {});');
        }).to.throw();
    });
    it('should fail on "for (+i in {});"', () => {
        expect(() => {
            parseScript('for (+i in {});');
        }).to.throw();
    });

    it('should fail on "if(false)"', () => {
        expect(() => {
            parseScript('if(false)');
        }).to.throw();
    });
    it('should fail on "‿ = 10"', () => {
        expect(() => {
            parseScript('‿ = 10');
        }).to.throw();
    });
    it('should fail on "if(true) let a = 1;"', () => {
        expect(() => {
            parseScript('if(true) let a = 1;');
        }).to.throw();
    });
    it('should fail on "switch (c) { default: default: }"', () => {
        expect(() => {
            parseScript('switch (c) { default: default: }');
        }).to.throw();
    });
    it('should fail on "(a ...b) => 0"', () => {
        expect(() => {
            parseScript('(a ...b) => 0');
        }).to.throw();
    });

    it('should fail on "{"', () => {
        expect(() => {
            parseScript(`()
=> 42`);
        }).to.throw();
    });
    it('should fail on "({}=>0)"', () => {
        expect(() => {
            parseScript('({}=>0)');
        }).to.throw();
    });

    it('should fail on "({a,...b}) => 0;"', () => {
        expect(() => {
            parseScript(`({a,...b}) => 0;`);
        }).to.throw();
    });
    it('should fail on "(b, ...a) + 1"', () => {
        expect(() => {
            parseScript(`(b, ...a) + 1`);
        }).to.throw();
    });

    it('should fail on "let [...a,] = 0"', () => {
        expect(() => {
            parseScript(`let [...a,] = 0`);
        }).to.throw();
    });

    it('should fail on "if(true) let a = 1;"', () => {
        expect(() => {
            parseScript(`if(true) let a = 1;`);
        }).to.throw();
    });

    it('should fail on "try { } catch ([a] = []) { }"', () => {
        expect(() => {
            parseScript(`try { } catch ([a] = []) { }`);
        }).to.throw();
    });
    it('should fail on "[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]"', () => {
        expect(() => {
            parseScript(`[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]`);
        }).to.not.throw();
    });

    it('should fail on "(a,b)=(c,d);"', () => {
        expect(() => {
            parseScript(`(a,b)=(c,d);`);
        }).to.throw();
    });
    it('should fail on "for (const x = 1 of y);"', () => {
        expect(() => {
            parseScript(`for (const x = 1 of y);`);
        }).to.throw();
    });

    it('should fail on "for (var [p]=q of r);"', () => {
        expect(() => {
            parseScript(`for (var [p]=q of r);`);
        }).to.throw();
    });
    it('should fail on "for (var {x} = y of z);"', () => {
        expect(() => {
            parseScript(`for (var {x} = y of z);`);
        }).to.throw();
    });

    it('should fail on "for (let x = 1 of y);"', () => {
        expect(() => {
            parseScript(`for (let x = 1 of y);`);
        }).to.throw();
    });
    it('should fail on "for (this of that);"', () => {
        expect(() => {
            parseScript(`for (this of that);`);
        }).to.throw();
    });

    it('should fail on "for (var x = 1 of y);"', () => {
        expect(() => {
            parseScript(`for (var x = 1 of y);`);
        }).to.throw();
    });
    it('should fail on "for (const of 42);"', () => {
        expect(() => {
            parseScript(`for (const of 42);`);
        }).to.throw();
    });

    it('should fail on "(function*() { *[yield iter]() {} }})"', () => {
        expect(() => {
            parseScript(`(function*() { *[yield iter]() {} }})`);
        }).to.throw();
    });
    it('should fail on "({ *[yield iter]() {} })"', () => {
        expect(() => {
            parseScript(`({ *[yield iter]() {} })`);
        }).to.throw();
    });

    it('should fail on "({ * })"', () => {
        expect(() => {
            parseScript(`({ * })`);
        }).to.throw();
    });
    it('should fail on "class Foo { * }"', () => {
        expect(() => {
            parseScript(`class Foo { * }`);
        }).to.throw();
    });

    it('should fail on "var x = () => { y = new..target; }"', () => {
        expect(() => {
            parseScript(`var x = () => { y = new..target; }`);
        }).to.throw();
    });
    it('should fail on "const x = 0, y = 1,;"', () => {
        expect(() => {
            parseScript(`const x = 0, y = 1,;`);
        }).to.throw();
    });
    it('should fail on "new f(... ... g);"', () => {
        expect(() => {
            parseScript(`new f(... ... g);`);
        }).to.throw();
    });

    it('should fail on "function *g(){ (a, b, c, yield) => 42 }"', () => {
        expect(() => {
            parseScript(`function *g(){ (a, b, c, yield) => 42 }`);
        }).to.throw();
    });

    it('should fail on "function *g() { return yield.x; }"', () => {
        expect(() => {
            parseScript(`function *g() { return yield.x; }`);
        }).to.throw();
    });

    it('should fail on "function* l() { ([e=yield])=>12 };"', () => {
        expect(() => {
            parseScript(`function* l() { ([e=yield])=>12 };`);
        }).to.throw();
    });

    it('should fail on "(a, ...b);"', () => {
        expect(() => {
            parseScript(`(a, ...b);`);
        }).to.throw();
    });
    it('should fail on "(a,);"', () => {
        expect(() => {
            parseScript(`(a,);`);
        }).to.throw();
    });
    it('expect " [ a -= 12 ] = 12; "', () => {
        expect(() => {
            parseScript(` [ a -= 12 ] = 12; `);
        }).to.throw();
    });

    it('should fail on "{ a = 12 };"', () => {
        expect(() => {
            parseScript(`{ a = 12 };`);
        }).not.to.throw();
    });
    it('expect "while (false) break L;"', () => {
        expect(() => {
            parseScript(`while (false) break L;`);
        }).to.throw();
    });

    it('should fail on "try { 12"', () => {
        expect(() => {
            parseScript(`try { 12`);
        }).to.throw();
    });
    it('should fail on "(arguments)=>12"', () => {
        expect(() => {
            parseScript(`(arguments)=>12`);
        }).not.to.throw();
    });

    it('should fail on "try {} catch (a) { 12"', () => {
        expect(() => {
            parseScript(`try {} catch (a) { 12`);
        }).to.throw();
    });
    it('should fail on "try{} catch(){}"', () => {
        expect(() => {
            parseScript(`try{} catch(){}`);
        }).to.throw();
    });

    it('should fail on "class A{constructor(){} constructor(){}}"', () => {
        expect(() => {
            parseScript(`class A{constructor(){} constructor(){}}`);
        }).to.throw();
    });

    it('should fail on "for (a 12 b; 12) break;"', () => {
        expect(() => {
            parseScript(`for (a 12 b; 12) break;`);
        }).to.throw();
    });
    it('should fail on "function l([a,a]) {}"', () => {
        expect(() => {
            parseScript(`function l([a,a]) {}`);
        }).to.not.throw();
    });

    it('should fail on "\\xab\\xel"', () => {
        expect(() => {
            parseScript('"\\xab\\xel"');
        }).to.throw();
    });
    it('should fail on "e{"', () => {
        expect(() => {
            parseScript(`'\\e'`);
        }).not.to.throw();
    });
    it('expect "a: a: for (;false;) break;"', () => {
        expect(() => {
            parseScript('a: a: for (;false;) break;');
        }).to.throw();
    });

    it('should fail on "if (false) const a = 12;"', () => {
        expect(() => {
            parseScript(`if (false) const a = 12;`);
        }).to.throw();
    });
    it('expect "let [[let=let]=let*let] = 12;"', () => {
        expect(() => {
            parseScript(`let [[let=let]=let*let] = 12;`);
        }).to.throw();
    });

    it('should fail on "({**() {}} })"', () => {
        expect(() => {
            parseScript(`({**() {}} })`);
        }).to.throw();
    });

    it('should fail on "a.this"', () => {
        expect(() => {
            parseScript(`a.this`);
        }).not.to.throw();
    });
    it('should fail on "a.12"', () => {
        expect(() => {
            parseScript(`a.12`);
        }).to.throw();
    });
    it('should fail on "a[e 12"', () => {
        expect(() => {
            parseScript(`a[e 12`);
        }).to.throw();
    });

    it('should fail on "new L(12"', () => {
        expect(() => {
            parseScript(`new L(12`);
        }).to.throw();
    });

    it('should fail on "a \n=>12"', () => {
        expect(() => {
            parseScript(`a \n=>12`);
        }).to.throw();
    });


    it('should fail on "a e"', () => {
        expect(() => {
            parseScript(`a e`);
        }).to.throw();
    });
    it('should fail on "a[0]-- = 12"', () => {
        expect(() => {
            parseScript(`a[0]-- = 12`);
        }).to.throw();
    });
    it('should fail on "a * while (false) { break; }"', () => {
        expect(() => {
            parseScript(`a * while (false) { break; }`);
        }).to.throw();
    });

    it('should fail on "{ for (a=0;a>=0 && false;a--) }"', () => {
        expect(() => {
            parseScript(`{ for (a=0;a>=0 && false;a--) }`);
        }).to.throw();
    });

    it('expect "12e?"', () => {
        expect(() => {
            parseScript(`12e?`);
        }).to.throw();
    });

    it('should fail on "({a -= 12 } = 12)"', () => {
        expect(() => {
            parseScript(`({a -= 12 } = 12)`);
        }).to.throw();
    });

    it('expect "var {a:-12} = 12"', () => {
        expect(() => {
            parseScript(`var {a:-12} = 12`);
        }).to.throw();
    });


    it('should fail on "({[a 12]: e})"', () => {
        expect(() => {
            parseScript(`({[a 12]: e})`);
        }).to.throw();
    });
    it('should fail on "/a"', () => {
        expect(() => {
            parseScript('/a');
        }).to.throw();
    });
    it('should fail on "(a,)"', () => {
        expect(() => {
            parseScript(`(a,)`);
        }).to.throw();
    });

    it('should fail on "switch (a) { case 12 a break; }"', () => {
        expect(() => {
            parseScript(`switch (a) { case 12 a break; }`);
        }).to.throw();
    });

    it('should fail on "swicth (a) { case a: break; case b: break; case e: break; default: break; default: 12; }"', () => {
        expect(() => {
            parseScript(`swicth (a) { case a: break; case b: break; case e: break; default: break; default: 12; }`);
        }).to.throw();
    });
    it('should fail on "switch (a) 12"', () => {
        expect(() => {
            parseScript(`switch (a) 12`);
        }).to.throw();
    });

    it('should fail on "switch (a 12"', () => {
        expect(() => {
            parseScript(`switch (a 12`);
        }).to.throw();
    });
    it('should fail on "switch ?"', () => {
        expect(() => {
            parseScript(`switch ?`);
        }).to.throw();
    });
    it('should fail on "throw \n12"', () => {
        expect(() => {
            parseScript(`throw \n12`);
        }).to.throw();
    });

    it('should fail on "{"', () => {
        expect(() => {
            parseModule('import {a 12 l} from \'12\'');
        }).to.throw();
    });

    it('should fail on "import * as a from 12"', () => {
        expect(() => {
            parseModule(`import * as a from 12`);
        }).to.throw();
    });

    it('should fail on "import {a as b, e as l 12"', () => {
        expect(() => {
            parseModule(`import {a as b, e as l 12`);
        }).to.throw();
    });
    it('should fail on "class L 12"', () => {
        expect(() => {
            parseScript(`class L 12`);
        }).to.throw();
    });
    it('expect "class A{static prototype() {}}"', () => {
        expect(() => {
            parseScript(`class A{static prototype() {}}`);
        }).to.throw();
    });
    it('should fail on "class A{constructor(){var a = super()}"', () => {
        expect(() => {
            parseScript(`class A{constructor(){var a = super()}`);
        }).to.throw();
    });

    it('should fail on "a ? b 5"', () => {
        expect(() => {
            parseScript(`a ? b 5`);
        }).to.throw();
    });
    it('should fail on "for (a i\u0074 e) break;"', () => {
        expect(() => {
            parseModule('for (a i\u0074 e) break;');
        }).to.throw();
    });

    it('should fail on "var e = [a -= 12] = 5"', () => {
        expect(() => {
            parseModule('var e = [a -= 12] = 5');
        }).to.throw();
    });

    it('should fail on "var e = [a -= 12] = 5"', () => {
        expect(() => {
            parseModule('var e = [a -= 12] = 5');
        }).to.throw();
    });
    it('should fail on "class A { e: 12 }"', () => {
        expect(() => {
            parseScript(`class A { e: 12 }`);
        }).to.throw();
    });

    it('should fail on "(...a)"', () => {
        expect(() => {
            parseScript(`(...a)`);
        }).to.throw();
    });
    it('should fail on "(...a,)"', () => {
        expect(() => {
            parseScript(`(...a,)`);
        }).to.throw();
    });
    it('should fail on "var [a] -= 12"', () => {
        expect(() => {
            parseScript(`var [a] -= 12`);
        }).to.throw();
    });

    it('should fail on "var a -= l"', () => {
        expect(() => {
            parseScript(`var a -= l`);
        }).to.throw();
    });
    it('should fail on "var -a = l"', () => {
        expect(() => {
            parseScript(`var -a = l`);
        }).to.throw();
    });
    it('should fail on "use strict; a package"', () => {
        expect(() => {
            parseScript(`'use strict'; a package`);
        }).to.throw();
    });

    it('expect "function f(a, ...b, c){}"', () => {
        expect(() => {
            parseScript(`function f(a, ...b, c){}`);
        }).to.throw();
    });
    it('should fail on "class A"', () => {
        expect(() => {
            parseScript(`class A`);
        }).to.throw();
    });

    it('should fail on "export { if as foo }"', () => {
        expect(() => {
            parseScript(`export { if as foo }`);
        }).to.throw();
    });

    it('should fail on "for(;;)"', () => {
        expect(() => {
            parseScript(`for(;;)`);
        }).to.throw();
    });

    it('should fail on "a => {}()"', () => {
        expect(() => {
            parseScript(`a => {}()`);
        }).to.throw();
    });

    it('should fail on ""export new Foo()"', () => {
        expect(() => {
            parseModule(`"export new Foo()`);
        }).to.throw();
    });


    it('should fail on "([this] = [10])"', () => {
        expect(() => {
            parseScript(`([this] = [10])`);
        }).to.throw();
    });

    it('should fail on "var x = {this}"', () => {
        expect(() => {
            parseScript(`var x = {this}`);
        }).to.throw();
    });
    it('should fail on "({this} = x)"', () => {
        expect(() => {
            parseScript(`({this} = x)`);
        }).to.throw();
    });

    it(`should fail on "0b1a"`, () => {
        expect(() => {
            parseScript(`0b1a`)
        }).to.throw();
    });
    it(`should fail on "new.prop"`, () => {
        expect(() => {
            parseScript(`new.prop`)
        }).to.throw();
    });
    it(`should fail on "class"`, () => {
        expect(() => {
            parseScript(`class`)
        }).to.throw();
    });
    it(`should fail on "foo[/42"`, () => {
        expect(() => {
            parseScript(`foo[/42`)
        }).to.throw();
    });
    it(`should fail on "yield v"`, () => {
        expect(() => {
            parseScript(`yield v`)
        }).to.throw();
    });
    it(`should fail on "for (const of 42);"`, () => {
        expect(() => {
            parseScript(`for (const of 42);`)
        }).to.throw();
    });
    it(`should fail on "for (let let;;;) {}"`, () => {
        expect(() => {
            parseScript(`for (let let;;;) {}`)
        }).to.throw();
    });
    it(`should fail on "(10) => 0"`, () => {
        expect(() => {
            parseScript(`(10) => 0`)
        }).to.throw();
    });
    it(`should fail on "({a,,} = 0)"`, () => {
        expect(() => {
            parseScript(`({a,,} = 0)`)
        }).to.throw();
    });
    it(`should fail on "('\\9')"`, () => {
        expect(() => {
            parseScript(`('\\9')`)
        }).to.throw();
    });
    it(`should fail on "a enum;"`, () => {
        expect(() => {
            parseScript(`a enum;`)
        }).to.throw();
    });
    it(`should fail on "import foo from "foo";"`, () => {
        expect(() => {
            parseScript(`import foo from "foo";`)
        }).to.throw();
    });
    it(`should fail on "(10) => 00"`, () => {
        expect(() => {
            parseScript(`(10) => 00`)
        }).to.throw();
    });
    it(`should fail on "{"`, () => {
        expect(() => {
            parseScript(`{`)
        }).to.throw();
    });
    it(`should fail on "function twiss() { 'use strict'; 021; }"`, () => {
        expect(() => {
            parseScript(`function twiss() { 'use strict'; 021; }`)
        }).to.throw();
    });
    it(`should fail on "() ? 42"`, () => {
        expect(() => {
            parseScript(`() ? 42`)
        }).to.throw();
    });
    it(`should fail on "(function*yield(){})"`, () => {
        expect(() => {
            parseScript(`(function*yield(){})`)
        }).to.throw();
    });
    it(`should fail on "function *g() { var yield; }"`, () => {
        expect(() => {
            parseScript(`function *g() { var yield; }`)
        }).to.throw();
    });
    it(`should fail on "function t(if) { }"`, () => {
        expect(() => {
            parseScript(`function t(if) { }`)
        }).to.throw();
    });
    it(`should fail on "break 1;"`, () => {
        expect(() => {
            parseScript(`break 1;`)
        }).to.throw();
    });
    it(`should fail on "with(x)"`, () => {
        expect(() => {
            parseScript(`with(x)`)
        }).to.throw();
    });
    it(`should fail on "(a,b)=(c,d);"`, () => {
        expect(() => {
            parseScript(`(a,b)=(c,d);`)
        }).to.throw();
    });
    it(`should fail on "var [a.b] = 0"`, () => {
        expect(() => {
            parseScript(`var [a.b] = 0`)
        }).to.throw();
    });
    it(`should fail on "(function() { "use strict"; f(yield v) })"`, () => {
        expect(() => {
            parseScript(`(function() { "use strict"; f(yield v) })`)
        }).to.throw();
    });
    it(`should fail on "try {} catch (answer()) {} "`, () => {
        expect(() => {
            parseScript(`try {} catch (answer()) {} `)
        }).to.throw();
    });
    it(`should fail on "a\\u11z"`, () => {
        expect(() => {
            parseScript(`a\\u11z`)
        }).to.throw();
    });
    it(`should fail on "'"`, () => {
        expect(() => {
            parseScript(`'`)
        }).to.throw();
    });
    it(`should fail on "export {as b} from a"`, () => {
        expect(() => {
            parseModule(`export {as b} from a`)
        }).to.throw();
    });
    it(`should fail on "i + 2 = 42"`, () => {
        expect(() => {
            parseScript(`i + 2 = 42`)
        }).to.throw();
    });
    it(`should fail on "if(false) doThis(); else"`, () => {
        expect(() => {
            parseScript(`if(false) doThis(); else`)
        }).to.throw();
    });
    it(`should fail on "for(let [let];;);"`, () => {
        expect(() => {
            parseScript(`for(let [let];;);`)
        }).to.throw();
    });
    it(`should fail on "for (+i in {});"`, () => {
        expect(() => {
            parseScript(`for (+i in {});`)
        }).to.throw();
    });
    it(`should fail on "function f() { new..target; }"`, () => {
        expect(() => {
            parseScript(`function f() { new..target; }`)
        }).to.throw();
    });
    it(`should fail on " (class {a:0})"`, () => {
        expect(() => {
            parseScript(` (class {a:0})`)
        }).to.throw();
    });
    it(`should fail on "try { } catch() {}"`, () => {
        expect(() => {
            parseScript(`try { } catch() {}`)
        }).to.throw();
    });
    it(`should fail on "for (let x = 0 in y){}"`, () => {
        expect(() => {
            parseScript(`for (let x = 0 in y){}`)
        }).to.throw();
    });
    it(`should fail on "({ 5 }) => {}"`, () => {
        expect(() => {
            parseScript(`({ 5 }) => {}`)
        }).to.throw();
    });
    it(`should fail on "with(true) let a"`, () => {
        expect(() => {
            parseScript(`with(true) let a`)
        }).to.throw();
    });
    it(`should fail on "for(;;)"`, () => {
        expect(() => {
            parseScript(`for(;;)`)
        }).to.throw();
    });

    it(`should fail on "const const;"`, () => {
        expect(() => {
            parseScript(`const const;`)
        }).to.throw();
    });
    it(`should fail on "(class {[3]:0})"`, () => {
        expect(() => {
            parseScript(`(class {[3]:0})`)
        }).to.throw();
    });
    it(`should fail on "(a,...a)"`, () => {
        expect(() => {
            parseScript(`(a,...a)`)
        }).to.throw();
    });
    it(`should fail on ""\\ux";"`, () => {
        expect(() => {
            parseScript(`"\\ux";`)
        }).to.throw();
    });
    it(`should fail on ""\\xx";"`, () => {
        expect(() => {
            parseScript(`"\\xx";`)
        }).to.throw();
    });
    it(`should fail on "3x"`, () => {
        expect(() => {
            parseScript(`3x`)
        }).to.throw();
    });
    it(`should fail on "3x0"`, () => {
        expect(() => {
            parseScript(`3x0`)
        }).to.throw();
    });
    it(`should fail on "var source = 'a\\u';"`, () => {
        expect(() => {
            parseScript(`var source = 'a\\u';`)
        }).to.throw();
    });
    it(`should fail on "/test"`, () => {
        expect(() => {
            parseScript(`/test`)
        }).to.throw();
    });
    it(`should fail on "3 = 4"`, () => {
        expect(() => {
            parseScript(`3 = 4`)
        }).to.throw();
    });
    it(`should fail on "func() = 4"`, () => {
        expect(() => {
            parseScript(`func() = 4`)
        }).to.throw();
    });
    it(`should fail on "(1 + 1) = 10"`, () => {
        expect(() => {
            parseScript(`(1 + 1) = 10`)
        }).to.throw();
    });
    it(`should fail on "var source = '"\\u{110000}"';"`, () => {
        expect(() => {
            parseScript(`var source = '"\\u{110000}"';`)
        }).to.throw();
    });
    it(`should fail on "var source = '"\\u{FFZ}"';"`, () => {
        expect(() => {
            parseScript(`var source = '"\\u{FFZ}"';`)
        }).to.throw();
    });
    it(`should fail on "1++"`, () => {
        expect(() => {
            parseScript(`1++`)
        }).to.throw();
    });
    it(`should fail on "1 + {"`, () => {
        expect(() => {
            parseScript(`1 + {`)
        }).to.throw();
    });
    it(`should fail on "1 + { t:t "`, () => {
        expect(() => {
            parseScript(`1 + { t:t `)
        }).to.throw();
    });
    it(`should fail on "var if = 42"`, () => {
        expect(() => {
            parseScript(`var if = 42`)
        }).to.throw();
    });
    it(`should fail on "+i = 42"`, () => {
        expect(() => {
            parseScript(`+i = 42`)
        }).to.throw();
    });
    it(`should fail on "({ set: s() { } })"`, () => {
        expect(() => {
            parseScript(`({ set: s() { } })`)
        }).to.throw();
    });
    it(`should fail on "({ set: s(a, b) { } })"`, () => {
        expect(() => {
            parseScript(`({ set: s(a, b) { } })`)
        }).to.throw();
    });

    it(`should fail on ""use strict"; (eval = 10) => 42"`, () => {
        expect(() => {
            parseScript(`"use strict"; (eval = 10) => 42`)
        }).to.throw();
    });
    it(`should fail on ""use strict"; eval => 42"`, () => {
        expect(() => {
            parseScript(`"use strict"; eval => 42"`)
        }).to.throw();
    });
    it(`should fail on ""use strict"; arguments => 42"`, () => {
        expect(() => {
            parseScript(`"use strict"; arguments => 42`)
        }).to.throw();
    });
    it(`should fail on ""use strict"; (arguments, a) => 42"`, () => {
        expect(() => {
            parseScript(`"use strict"; (arguments, a) => 42`)
        }).to.throw();
    });
    it(`should fail on ""use strict"; (a) => 00"`, () => {
        expect(() => {
            parseScript(`"use strict"; (a) => 00`)
        }).to.throw();
    });
    it(`should fail on "() <= 42"`, () => {
        expect(() => {
            parseScript(`() <= 42`)
        }).to.throw();
    });
    it(`should fail on "(10) => 00"`, () => {
        expect(() => {
            parseScript(`(10) => 00`)
        }).to.throw();
    });
    it(`should fail on "(10, 20) => 00"`, () => {
        expect(() => {
            parseScript(`(10, 20) => 00`)
        }).to.throw();
    });
    it(`should fail on ""use strict"; (eval) => 42"`, () => {
        expect(() => {
            parseScript(`"use strict"; (eval) => 42`)
        }).to.throw();
    });
    it(`should fail on "function t(false) { }"`, () => {
        expect(() => {
            parseScript(`function t(false) { }`)
        }).to.throw();
    });
    it(`should fail on "a if;"`, () => {
        expect(() => {
            parseScript(`a if;`)
        }).to.throw();
    });
    it(`should fail on "continue 2;"`, () => {
        expect(() => {
            parseScript(`continue 2;`)
        }).to.throw();
    });
    it(`should fail on "if(false)"`, () => {
        expect(() => {
            parseScript(`if(false)`)
        }).to.throw();
    });
    it(`should fail on "while(false)"`, () => {
        expect(() => {
            parseScript(`while(false)`)
        }).to.throw();
    });
    it(`should fail on "with(x)"`, () => {
        expect(() => {
            parseScript(`with(x)`)
        }).to.throw();
    });
    it(`should fail on "const x = 12, y;"`, () => {
        expect(() => {
            parseScript(`const x = 12, y;`)
        }).to.throw();
    });
    it(`should fail on "try { } catch() {}"`, () => {
        expect(() => {
            parseScript(`try { } catch() {}`)
        }).to.throw();
    });
    it(`should fail on "switch (x) { default: continue; }"`, () => {
        expect(() => {
            parseScript(`switch (x) { default: continue; }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; var arguments = 10; }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; var arguments = 10; }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; try { } catch (eval) { } }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; try { } catch (eval) { } }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; try { } catch (arguments) { } }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; try { } catch (arguments) { } }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; eval = 10; }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; eval = 10; }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; ++eval; }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; ++eval; }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; eval++; }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; eval++; }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; function eval() { } }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; function eval() { } }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; function arguments() { } }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; function arguments() { } }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; (function eval() { }()) }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; (function eval() { }()) }`)
        }).to.throw();
    });
    it(`should fail on "(function package() {'use strict'; })()"`, () => {
        expect(() => {
            parseModule(`(function package() {'use strict'; })()`)
        }).to.throw();
    });
    it(`should fail on "function twiss() {'use strict'; ({ s: function s(eval) { } }); }"`, () => {
        expect(() => {
            parseScript(`function twiss() {'use strict'; ({ s: function s(eval) { } }); }`)
        }).to.throw();
    });


    it(`should fail on "function twiss() { "use strict"; var private; }"`, () => {
        expect(() => {
            parseScript(`function twiss() { "use strict"; var private; }`)
        }).to.throw();
    });
    it(`should fail on "function twiss() { "use strict"; var protected; }"`, () => {
        expect(() => {
            parseScript(`function twiss() { "use strict"; var protected; }`)
        }).to.throw();
    });
    it(`should fail on "function eval(a) { "use strict"; }"`, () => {
        expect(() => {
            parseModule(`function eval(a) { "use strict"; }`)
        }).to.throw();
    });
    it(`should fail on "function arguments(a) { "use strict"; }"`, () => {
        expect(() => {
            parseModule(`function arguments(a) { "use strict"; }`)
        }).to.throw();
    });
    it(`should fail on ""use strict"; function static() { }"`, () => {
        expect(() => {
            parseScript(`"use strict"; function static() { }`)
        }).to.throw();
    });
    it(`should fail on "function a(eval) { "use strict"; }"`, () => {
        expect(() => {
            parseScript(`function a(eval) { "use strict"; }`)
        }).to.throw();
    });
    it(`should fail on "(function a(package) { "use strict"; })"`, () => {
        expect(() => {
            parseScript(`(function a(package) { "use strict"; })`)
        }).to.throw();
    });
    it(`should fail on "{ ;  ;  "`, () => {
        expect(() => {
            parseScript(`{ ;  ;  `)
        }).to.throw();
    });
    it(`should fail on "class A {a(){},b(){}}"`, () => {
        expect(() => {
            parseScript(`class A {a(){},b(){}}`)
        }).to.throw();
    });
    it(`should fail on "class A {static "prototype"(){}}"`, () => {
        expect(() => {
            parseScript(`class A {static "prototype"(){}}`)
        }).to.throw();
    });
    it(`should fail on "class A {a static(){}}"`, () => {
        expect(() => {
            parseScript(`class A {a static(){}}`)
        }).to.throw();
    });

    it(`should fail on "export new Foo();"`, () => {
        expect(() => {
            parseModule(`export new Foo();`)
        }).to.throw();
    });
    it(`should fail on "export typeof foo;"`, () => {
        expect(() => {
            parseModule(`export typeof foo;`)
        }).to.throw();
    });
    it(`should fail on "export { default as foo }"`, () => {
        expect(() => {
            parseModule(`export { default as foo }`)
        }).to.throw();
    });
    it(`should fail on "import default from "foo"`, () => {
        expect(() => {
            parseModule(`import default from "foo"`)
        }).to.throw();
    });
    it(`should fail on "import { a as class } from "foo"`, () => {
        expect(() => {
            parseModule(`import { a as class } from "foo"`)
        }).to.throw();
    });
    it(`should fail on "function *g() { (x = yield) => {} }"`, () => {
        expect(() => {
            parseScript(`function *g() { (x = yield) => {} }`)
        }).to.throw();
    });
    it(`should fail on "function *g() { ({x = yield}) => {} }"`, () => {
        expect(() => {
            parseScript(`function *g() { ({x = yield}) => {} }`)
        }).to.throw();
    });
    it(`should fail on "class A { constructor() {} 'constructor'() }"`, () => {
        expect(() => {
            parseScript(`class A { constructor() {} 'constructor'() }`)
        }).to.throw();
    });
    it(`should fail on "class A { get constructor() {} }"`, () => {
        expect(() => {
            parseScript(`class A { get constructor() {} }`)
        }).to.throw();
    });
    it(`should fail on "var a = { set foo(...v) {} };}"`, () => {
        expect(() => {
            parseScript(`var a = { set foo(...v) {} };`)
        }).to.throw();
    });
    it(`should fail on ""`, () => {
        expect(() => {
            parseScript(`class a { set foo(...v) {} };`)
        }).to.throw();
    });

    it(`should fail on "var super"`, () => {
        expect(() => {
            parseScript(`var super`)
        }).to.throw();
    });
    it(`should fail on "let default"`, () => {
        expect(() => {
            parseScript(`let default}`)
        }).to.throw();
    });
    it(`should fail on "yield 10"`, () => {
        expect(() => {
            parseScript(`yield 10`)
        }).to.throw();
    });
    it(`should fail on "([function] = [10])"`, () => {
        expect(() => {
            parseScript(`([function] = [10])`)
        }).to.throw();
    });
    it(`should fail on "([this] = [10])"`, () => {
        expect(() => {
            parseScript(`([this] = [10])`)
        }).to.throw();
    });
    it(`should fail on "var x = {this}"`, () => {
        expect(() => {
            parseScript(`var x = {this}`)
        }).to.throw();
    });
    it(`should fail on "(function () { yield 10 })"`, () => {
        expect(() => {
            parseScript(`(function () { yield 10 })`)
        }).to.throw();
    });
    it('should fail on "class default"', () => {
        expect(() => {
            parseScript(`class default`)
        }).to.throw();
    });
    it('should fail on ""`hello ${10 `test`"', () => {
        expect(() => {
            parseScript('`hello ${10 `test`')
        }).to.throw();
    });
    it(`should fail on "function a() 1 "`, () => {
        expect(() => {
            parseScript(`function a() 1 `)
        }).to.throw();
    });
    it(`should fail on "({ 42 }) = obj"`, () => {
        expect(() => {
            parseScript(`({ 42 }) = obj`)
        }).to.throw();
    });
    it(`should fail on "function f(a, ...b = 0)"`, () => {
        expect(() => {
            parseScript(`function f(a, ...b = 0)`)
        }).to.throw();
    });
    it(`should fail on "({ 5 }) => {}"`, () => {
        expect(() => {
            parseScript(`({ 5 }) => {}`)
        }).to.throw();
    });
    it(`should fail on "let [x]"`, () => {
        expect(() => {
            parseScript(`let [x]`)
        }).to.throw();
    });
    it(`should fail on "for (;;) const x = 10;"`, () => {
        expect(() => {
            parseScript(`for (;;) const x = 10;`)
        }).to.throw();
    });
    //    it(`should fail on "function* y({yield}) {}"`, () => { expect(() => { parseScript(`function* y({yield}) {}`) }).to.throw(); });
    it(`should fail on "x = { get method() 42 }"`, () => {
        expect(() => {
            parseScript(`x = { get method() 42 }`)
        }).to.throw();
    });
    it(`should fail on "class A { set prop(x, y) {} }"`, () => {
        expect(() => {
            parseScript(`class A { set prop(x, y) {} }`)
        }).to.throw();
    });
    it(`should fail on "({ __proto__: 1, __proto__: 2 })"`, () => {
        expect(() => {
            parseScript(`({ __proto__: 1, __proto__: 2 })`)
        }).to.throw();
    });
    it(`should fail on "[...x in y] = []"`, () => {
        expect(() => {
            parseScript(`[...x in y] = []`)
        }).to.throw();
    });
    it(`should fail on "function foo() { 'use strict'; var {arguments} = {} }"`, () => {
        expect(() => {
            parseScript(`function foo() { 'use strict'; var {arguments} = {} }`)
        }).to.not.throw();
    });
    it(`should fail on "(function* yield() {})"`, () => {
        expect(() => {
            parseScript(`(function* yield() {})`)
        }).to.throw();
    });
    it(`should fail on "function* foo(a = yield b) {}"`, () => {
        expect(() => {
            parseScript(`function* foo(a = yield b) {}`)
        }).to.throw();
    });
    it(`should fail on "function* foo(a = class extends (yield b) {}) {}"`, () => {
        expect(() => {
            parseScript(`function* foo(a = class extends (yield b) {}) {}`)
        }).to.throw();
    });
    it(`should fail on "function* wrap() {\n(a = yield b) => a\n}"`, () => {
        expect(() => {
            parseScript(`function* wrap() {\n(a = yield b) => a\n}`)
        }).to.throw();
    });
    it(`should fail on "var foo = 1; let foo = 1;"`, () => {
        expect(() => {
            parseScript(`var foo = 1; let foo = 1;`)
        }).to.throw();
    });
    it(`should fail on "var [...foo] = x; let foo = 1;"`, () => {
        expect(() => {
            parseScript(`var [...foo] = x; let foo = 1;`)
        }).to.throw();
    });
    it(`should fail on "(x) => {} + 2"`, () => {
        expect(() => {
            parseScript(`(x) => {} + 2`)
        }).to.not.throw();
    });
    it(`should fail on "--1"`, () => {
        expect(() => {
            parseScript(`--1`)
        }).to.throw();
    });
    it(`should fail on "[,"`, () => {
        expect(() => {
            parseScript(`[,`)
        }).to.throw();
    });
    it(`should fail on "var x = /\n/"`, () => {
        expect(() => {
            parseScript(`var x = /\n/`)
        }).to.throw();
    });
    it(`should fail on "{ get 2 }"`, () => {
        expect(() => {
            parseScript(`{ get 2 }`)
        }).to.throw();
    });
    it(`should fail on "({ get: g(d) { } })"`, () => {
        expect(() => {
            parseScript(`({ get: g(d) { } })`)
        }).to.throw();
    });
    it(`should fail on "function t(...) { }"`, () => {
        expect(() => {
            parseScript(`function t(...) { }`)
        }).to.throw();
    });
    it(`should fail on "break\n"`, () => {
        expect(() => {
            parseScript(`break\n`)
        }).to.throw();
    });
    it(`should fail on "for (var i, i2 in {});"`, () => {
        expect(() => {
            parseScript(`for (var i, i2 in {});`)
        }).to.throw();
    });
    it(`should fail on "if(true) let a = 1;"`, () => {
        expect(() => {
            parseScript(`if(true) let a = 1;`)
        }).to.throw();
    });
    it(`should fail on "/*hello  *"`, () => {
        expect(() => {
            parseScript(`/*hello  *`)
        }).to.throw();
    });
    it(`should fail on "\\u005c"`, () => {
        expect(() => {
            parseScript(`\\u005c`)
        }).to.throw();
    });
    it(`should fail on "x: while (true) { (function () { continue x; }); }"`, () => {
        expect(() => {
            parseScript(`x: while (true) { (function () { continue x; }); }`)
        }).to.throw();
    });
    it(`should fail on "var \\uD83B\\uDE00"`, () => {
        expect(() => {
            parseScript(`var \\uD83B\\uDE00`)
        }).to.throw();
    });
    it(`should fail on "[...0,{a=0}]=0"`, () => {
        expect(() => {
            parseScript(`[...0,{a=0}]=0`)
        }).to.throw();
    });
    it(`should fail on "(function ([a.b]) {})"`, () => {
        expect(() => {
            parseScript(`(function ([a.b]) {})`)
        }).to.throw();
    });
    it(`should fail on "(...a, ...b) => 0"`, () => {
        expect(() => {
            parseScript(`(...a, ...b) => 0`)
        }).to.throw();
    });
    it(`should fail on "let x, y, ;"`, () => {
        expect(() => {
            parseScript(`let x, y, ;`)
        }).to.throw();
    });
    it(`should fail on "var a.b;"`, () => {
        expect(() => {
            parseScript(`var a.b;`)
        }).to.throw();
    });
    it(`should fail on "class A {a static(){}}"`, () => {
        expect(() => {
            parseScript(`class A {a static(){}}`)
        }).to.throw();
    });


    it(`should fail on "var f = function() { new.unknown_property; }"`, () => {
        expect(() => {
            parseScript(`var f = function() { new.unknown_property; }`)
        }).to.throw();
    });
    it(`should fail on "(b, ...a) + 1"`, () => {
        expect(() => {
            parseScript(`(b, ...a) + 1`)
        }).to.throw();
    });
    it(`should fail on "[0] = 0"`, () => {
        expect(() => {
            parseScript(`[0] = 0`)
        }).to.throw();
    });
    it(`should fail on "() + 1"`, () => {
        expect(() => {
            parseScript(`() + 1`)
        }).to.throw();
    });

    it('should fail on "`${a"', () => {
        expect(() => {
            parseScript('`${a');
        }).to.throw();
    });
    it('should fail on "0O9"', () => {
        expect(() => {
            parseScript(`0O9`);
        }).to.throw();
    });

    it('should fail on "0o1a"', () => {
        expect(() => {
            parseScript(`0o1a`);
        }).to.throw('');
    });
    it('should fail on "0b12"', () => {
        expect(() => {
            parseScript(`0b12`);
        }).to.throw('');
    });

    it('should fail on "use strict; 019"', () => {
        expect(() => {
            parseScript(`'use strict'; 019`);
        }).to.throw('');
    });
    it('should fail on "use strict; 08"', () => {
        expect(() => {
            parseScript(`'use strict'; 08`);
        }).to.not.throw('');
    });

    it('should fail on "use strict; 09"', () => {
        expect(() => {
            parseScript(`'use strict'; 09`);
        }).to.not.throw('');
    });

    it('should fail on "for(let[a]().b of 0);"', () => {
        expect(() => {
            parseScript(`for(let[a]().b of 0);`);
        }).to.throw();
    });
    it('should fail on "for(let[a].b of 0);"', () => {
        expect(() => {
            parseScript(`for(let[a].b of 0);`);
        }).to.throw();
    });

    it('should fail on "({a,,a} = 0)"', () => {
        expect(() => {
            parseScript(`({a,,a} = 0)`);
        }).to.throw();
    });

    it('should fail on "for (+i in {}); "', () => {
        expect(() => {
            parseScript('for (+i in {});');
        }).to.throw();
    });
    it('should fail on " "', () => {
        expect(() => {
            parseScript('var class = 123;');
        }).to.throw();
    });
    it('should fail on "try {} catch (answer()) {}  "', () => {
        expect(() => {
            parseScript('try {} catch (answer()) {} ');
        }).to.throw();
    });

    it('should fail on " x = { __proto__: 42, __proto__: 43 }"', () => {
        expect(() => {
            parseScript('x = { __proto__: 42, __proto__: 43 }');
        }).to.throw();
    });

    it('should fail on "class A {static "prototype"(){}} "', () => {
        expect(() => {
            parseScript('class A {static "prototype"(){}}');
        }).to.throw();
    });
    it('should fail on "class A {constructor(){} "constructor"(){}} "', () => {
        expect(() => {
            parseScript('class A {constructor(){} "constructor"(){}}');
        }).to.throw();
    });

    it('should fail on "let x,"', () => {
        expect(() => {
            parseScript('let x,');
        }).to.throw();
    });
    it('should fail on "for (let x = 0 in y){} "', () => {
        expect(() => {
            parseScript('for (let x = 0 in y){}');
        }).to.throw();
    });
    it('should fail on "({ *[0]: 0 }) "', () => {
        expect(() => {
            parseScript('({ *[0]: 0 })');
        }).to.throw();
    });
    it('should fail on " ({a:this}=0)"', () => {
        expect(() => {
            parseScript('({a:this}=0)');
        }).to.throw();
    });
    it('should fail on "var x = /[a-z]/\\ux "', () => {
        expect(() => {
            parseScript('var x = /[a-z]/\\ux');
        }).to.throw();
    });
    it('should fail on "class A {static static static(){}} "', () => {
        expect(() => {
            parseScript('class A {static static static(){}}');
        }).to.throw();
    });
    it('should fail on "(class extends a,b {}) "', () => {
        expect(() => {
            parseScript('(class extends a,b {})');
        }).to.throw();
    });

    it('should fail on "(function*() { { *[yield iter]() {} }}) "', () => {
        expect(() => {
            parseScript('(function*() { { *[yield iter]() {} }})');
        }).to.throw();
    });

    it('should fail on " (async function foo() { return {await} })"', () => {
        expect(() => {
            parseScript('(async function foo() { return {await} })');
        }).to.throw();
    });
    it('should fail on "async ({a = b})"', () => {
        expect(() => {
            parseScript('async ({a = b})');
        }).to.not.throw();
    });

    it('should fail on "async (await) => 1 "', () => {
        expect(() => {
            parseScript('async (await) => 1');
        }).to.not.throw('');
    });

    it('should fail on " async ({a: await}) => 1"', () => {
        expect(() => {
            parseScript('async ({a: await}) => 1');
        }).to.throw();
    });

    it('should fail on " async ([await]) => 1"', () => {
        expect(() => {
            parseScript('async ([await]) => 1');
        }).to.not.throw();
    });
    it('should fail on "({async\nfoo() { }}) "', () => {
        expect(() => {
            parseScript('({async\nfoo() { }})');
        }).to.throw();
    });
    it('should fail on "class A {static async set foo(value) { }} "', () => {
        expect(() => {
            parseScript('class A {static async set foo(value) { }}');
        }).to.throw();
    });
    it('should fail on " class A {async constructor() { }}"', () => {
        expect(() => {
            parseScript('class A {async constructor() { }}');
        }).to.throw();
    });
    it('should fail on "class A {async* foo() { }} "', () => {
        expect(() => {
            parseScript('class A {async* foo() { }}');
        }).to.throw();
    });
    it('should fail on " class A {static async set foo(value) { }}"', () => {
        expect(() => {
            parseScript('class A {static async set foo(value) { }}');
        }).to.throw();
    });
    it('should fail on " class A {async foo(await) { }}"', () => {
        expect(() => {
            parseScript('class A {async foo(await) { }}');
        }).to.throw();
    });
    it('should fail on "class A {async foo() { return {await} }} "', () => {
        expect(() => {
            parseScript('class A {async foo() { return {await} }}');
        }).to.throw();
    });
    it('should fail on "await a"', () => {
        expect(() => {
            parseScript('await a');
        }).to.throw();
    });
    it('should fail on " async () => await"', () => {
        expect(() => {
            parseScript('async () => await');
        }).to.throw();
    });
    it('should fail on ""(class {async foo() { await }}) "', () => {
        expect(() => {
            parseScript('"(class {async foo() { await }})');
        }).to.throw();
    });
    it('should fail on "(async)(a) => 12 "', () => {
        expect(() => {
            parseScript('(async)(a) => 12');
        }).to.not.throw();
    });
    it('should fail on "f = async ((x)) => x "', () => {
        expect(() => {
            parseScript('f = async ((x)) => x');
        }).to.not.throw();
    });
    it('should fail on " { let foo = 1; { let foo = 2; } let foo = 1; }"', () => {
        expect(() => {
            parseScript('{ let foo = 1; { let foo = 2; } let foo = 1; }');
        }).to.throw();
    });
    it('should fail on "var [...foo] = x; let foo = 1; "', () => {
        expect(() => {
            parseScript('var [...foo] = x; let foo = 1;');
        }).to.throw();
    });
    it('should fail on "~3 ** 2; "', () => {
        expect(() => {
            parseScript('~3 ** 2;');
        }).to.throw();
    });
    it('should fail on "typeof 2 ** 2 "', () => {
        expect(() => {
            parseScript('typeof 2 ** 2');
        }).to.throw();
    });
    it('should fail on "(function(...a,) { }) "', () => {
        expect(() => {
            parseScript('(function(...a,) { })');
        }).to.throw();
    });
    it('should fail on "class A {static foo(...a,) {}} "', () => {
        expect(() => {
            parseScript('class A {static foo(...a,) {}}');
        }).to.throw();
    });
    it('should fail on "async ({a = b})"', () => {
        expect(() => {
            parseScript('async ({a = b})');
        }).to.not.throw();
    });
    it('should fail on "async\n() => a"', () => {
        expect(() => {
            parseScript('async\n() => a');
        }).to.throw();
    });
    it('should fail on " async await => 1"', () => {
        expect(() => {
            parseScript('async await => 1');
        }).to.throw();
    });

    it('should fail on " async ({a: await}) => 1"', () => {
        expect(() => {
            parseScript('async ({a: await}) => 1');
        }).to.throw();
    });

    it('should fail on " class A {static async set foo(value) { }}"', () => {
        expect(() => {
            parseScript('class A {static async set foo(value) { }}');
        }).to.throw();
    });
    it('should fail on " async function foo() { await }"', () => {
        expect(() => {
            parseScript('async function foo() { await }');
        }).to.throw();
    });
    it('should fail on "(async function foo() { await }) "', () => {
        expect(() => {
            parseScript('(async function foo() { await })');
        }).to.throw();
    });
    it('should fail on " async () => await"', () => {
        expect(() => {
            parseScript('async () => await');
        }).to.throw();
    });
    it('should fail on ""(class {async foo() { await }}) "', () => {
        expect(() => {
            parseScript('"(class {async foo() { await }})');
        }).to.throw();
    });
    
    it('should fail on " 0x"', () => {
        expect(() => {
            parseScript('0x');
        }).to.throw();
    });
    it('should fail on "var x = /\n/ "', () => {
        expect(() => {
            parseScript('var x = /\n/');
        }).to.throw();
    });
    it('should fail on "+i = 42"', () => {
        expect(() => {
            parseScript('+i = 42');
        }).to.throw();
    });
    it('should fail on " \n\n\n{"', () => {
        expect(() => {
            parseScript('\n\n\n{');
        }).to.throw();
    });
    it('should fail on "try {} catch (42) {} "', () => {
        expect(() => {
            parseScript('try {} catch (42) {} ');
        }).to.throw();
    });
    it('should fail on " a\\u1z"', () => {
        expect(() => {
            parseScript('a\\u1z');
        }).to.throw();
    });

    it('should fail on " for (this of that);"', () => {
        expect(() => {
            parseScript('for (this of that);');
        }).to.throw();
    });

    it('should fail on " (function((a)){})"', () => {
        expect(() => {
            parseScript('(function((a)){})');
        }).to.throw();
    });

    it('should fail on " if (b,...a, );"', () => {
        expect(() => {
            parseScript('if (b,...a, );');
        }).to.throw();
    });
    it('should fail on " switch (cond) { case 10: let a = 20; "', () => {
        expect(() => {
            parseScript('switch (cond) { case 10: let a = 20; ');
        }).to.throw();
    });

    it('should fail on " (0, {a = 0}) = 0"', () => {
        expect(() => {
            parseScript('(0, {a = 0}) = 0');
        }).to.throw();
    });
    it('should fail on " "\\u{FFZ}""', () => {
        expect(() => {
            parseScript('"\\u{FFZ}"');
        }).to.throw();
    });
    it('should fail on " export {a,,b}"', () => {
        expect(() => {
            parseModule('export {a,,b}');
        }).to.throw();
    });
    it('should fail on " a b;"', () => {
        expect(() => {
            parseScript('a b;');
        }).to.throw();
    });
    it('should fail on " abc def ghi"', () => {
        expect(() => {
            parseScript('abc def ghi');
        }).to.throw();
    });

    it('should fail on "x = { method() 42 } "', () => {
        expect(() => {
            parseScript('x = { method() 42 }');
        }).to.throw();
    });
    it('should fail on "x = { get method() 42 } "', () => {
        expect(() => {
            parseScript('x = { get method() 42 }');
        }).to.throw();
    });
    it('should fail on "x = { set method(val) v = val } "', () => {
        expect(() => {
            parseScript('x = { set method(val) v = val }');
        }).to.throw();
    });
    it('should fail on "(function () { yield 10 }) "', () => {
        expect(() => {
            parseScript('(function () { yield 10 })');
        }).to.throw();
    });
    it('should fail on " class A extends yield B { }"', () => {
        expect(() => {
            parseScript('class A extends yield B { }');
        }).to.throw();
    });

    it('should fail on "([ 5 ]) => {} "', () => {
        expect(() => {
            parseScript('([ 5 ]) => {}');
        }).to.throw();
    });

    it('should fail on "({ get test() { } }) => 42 "', () => {
        expect(() => {
            parseScript('({ get test() { } }) => 42');
        }).to.throw();
    });

    it('should fail on " let [x]"', () => {
        expect(() => {
            parseScript('let [x]');
        }).to.throw();
    });

    it('should fail on "({get{a}:0})"', () => {
        expect(() => {
            parseScript('({get{a}:0})');
        }).to.throw();
    });
    it('should fail on "function*g() { let yield; }"', () => {
        expect(() => {
            parseScript('function*g() { let yield; }');
        }).to.throw();
    });
    it('should fail on  for(a in b) function c(){}"', () => {
        expect(() => {
            parseScript(' for(a in b) function c(){}');
        }).to.throw();
    });
    it('should fail on "function twiss() { "use strict"; ({ "\\1": 42 }); }"', () => {
        expect(() => {
            parseScript('function twiss() { "use strict"; ({ "\\1": 42 }); }');
        }).to.throw();
    });
    it('should fail on "({ *a: 0 })"', () => {
        expect(() => {
            parseScript('({ *a: 0 })');
        }).to.throw();
    });
    it('should fail on "({a:function} = 0)"', () => {
        expect(() => {
            parseScript('({a:function} = 0)');
        }).to.throw();
    });
    it('should fail on ""use strict"; const const = 1;"', () => {
        expect(() => {
            parseScript('"use strict"; const const = 1;');
        }).to.throw();
    });
    it('should fail on "function t(null) { }"', () => {
        expect(() => {
            parseScript('function t(null) { }');
        }).to.throw();
    });
    it('should fail on "<!--"', () => {
        expect(() => {
            parseModule('<!--');
        }).to.throw();
    });
    it('should fail on "export"', () => {
        expect(() => {
            parseModule('export');
        }).to.throw();
    });
    it('should fail on "\\uD800\\uDC00"', () => {
        expect(() => {
            parseScript('\\uD800\\uDC00');
        }).to.throw();
    });
    it('should fail on "1 + ("', () => {
        expect(() => {
            parseScript('1 + (');
        }).to.throw();
    });
    it('should fail on "({*a([a.b]){}})"', () => {
        expect(() => {
            parseScript('({*a([a.b]){}})');
        }).to.throw();
    });
    it('should fail on "(a, (b)) => 42"', () => {
        expect(() => {
            parseScript('(a, (b)) => 42');
        }).to.throw();
    });
    it('should fail on "({ set s() { } })"', () => {
        expect(() => {
            parseScript('({ set s() { } })');
        }).to.throw();
    });
    it('should fail on "function*g(){ var yield; }"', () => {
        expect(() => {
            parseScript('function*g(){ var yield; }');
        }).to.throw();
    });
    it('should fail on "x\\u002a"', () => {
        expect(() => {
            parseScript('x\\u002a');
        }).to.throw();
    });
    it('should fail on "var x = ""', () => {
        expect(() => {
            parseScript('var x = "');
        }).to.throw();
    });
    it('should fail on "const x = 0, y = 1,;"', () => {
        expect(() => {
            parseScript('const x = 0, y = 1,;');
        }).to.throw();
    });
    it('should fail on "({[x]})"', () => {
        expect(() => {
            parseScript('({[x]})');
        }).to.throw();
    });
    it('should fail on "function*g(yield){}"', () => {
        expect(() => {
            parseScript('function*g(yield){}');
        }).to.throw();
    });
    it('should fail on "a enum"', () => {
        expect(() => {
            parseScript('a enum');
        }).to.throw();
    });
    it('should fail on "var {a:(b)} = 0"', () => {
        expect(() => {
            parseScript('var {a:(b)} = 0');
        }).to.throw();
    });
    it('should fail on "switch (cond) { case 10: let a = 20; "', () => {
        expect(() => {
            parseScript('switch (cond) { case 10: let a = 20; ');
        }).to.throw();
    });
    it('should fail on "(function* ({e: a.b}) {})"', () => {
        expect(() => {
            parseScript('(function* ({e: a.b}) {})');
        }).to.throw();
    });
    it('should fail on "function*g(yield = 0){}"', () => {
        expect(() => {
            parseScript('function*g(yield = 0){}');
        }).to.throw();
    });
    it('should fail on "class A { set prop() {} }"', () => {
        expect(() => {
            parseScript('class A { set prop() {} }');
        }).to.throw();
    });
    it('should fail on "({ get: g(d) { } })"', () => {
        expect(() => {
            parseScript('({ get: g(d) { } })');
        }).to.throw();
    });
    it('should fail on "(function*() { function*(x = yield 3) {} })"', () => {
        expect(() => {
            parseScript('(function*() { function*(x = yield 3) {} })');
        }).to.throw();
    });
    it('should fail on "import {a as function} from "a";"', () => {
        expect(() => {
            parseModule('import {a as function} from "a";');
        }).to.throw();
    });
    it('should fail on "function twiss() { "use strict"; function inner() { "octal directive\\1"; } }"', () => {
        expect(() => {
            parseScript('function twiss() { "use strict"; function inner() { "octal directive\\1"; } }');
        }).to.throw();
    });
    it('should fail on "class A {static static static(){}}"', () => {
        expect(() => {
            parseScript('class A {static static static(){}}');
        }).to.throw();
    });
    it('should fail on "(a,...a)"', () => {
        expect(() => {
            parseScript('(a,...a)');
        }).to.throw();
    });
    it('should fail on "try {} catch (0) {} "', () => {
        expect(() => {
            parseScript('try {} catch (0) {} ');
        }).to.throw();
    });
    it('should fail on "class A {a:0}"', () => {
        expect(() => {
            parseScript('class A {a:0}');
        }).to.throw();
    });
    it('should fail on "for((1 + 1) in list) process(x);"', () => {
        expect(() => {
            parseScript('for((1 + 1) in list) process(x);');
        }).to.throw();
    });
    it('should fail on "for(let[a].b of 0);"', () => {
        expect(() => {
            parseScript('for(let[a].b of 0);');
        }).to.throw();
    });
    it('should fail on "const default"', () => {
        expect(() => {
            parseScript('const default');
        }).to.throw();
    });
    it('should fail on ""use strict"; ("\\11")"', () => {
        expect(() => {
            parseScript('"use strict"; ("\\11")');
        }).to.throw();
    });
    it('should fail on "(class [a] {})"', () => {
        expect(() => {
            parseScript('(class [a] {})');
        }).to.throw();
    });
    it('should fail on "class A;"', () => {
        expect(() => {
            parseScript('class A;');
        }).to.throw();
    });
    it('should fail on "a\\u113"', () => {
        expect(() => {
            parseScript('a\\u113');
        }).to.throw();
    });
    it('should fail on "for(;;) function a(){}"', () => {
        expect(() => {
            parseScript('for(;;) function a(){}');
        }).to.throw();
    });
    it('should fail on "for(var x=1 of [1,2,3]) 0"', () => {
        expect(() => {
            parseScript('for(var x=1 of [1,2,3]) 0');
        }).to.throw();
    });
    it('should fail on "= []"', () => {
        expect(() => {
            parseScript('= []');
        }).to.throw();
    });

    it('should fail on "function* a([a.b]) {}"', () => {
        expect(() => {
            parseScript('function* a([a.b]) {}');
        }).to.throw();
    });
    it('should fail on "({"a"} = 0)"', () => {
        expect(() => {
            parseScript('({"a"} = 0)');
        }).to.throw();
    });
    it('should fail on "var []"', () => {
        expect(() => {
            parseScript('var []');
        }).to.throw();
    });
    it('should fail on "({}=>0)"', () => {
        expect(() => {
            parseScript('({}=>0)');
        }).to.throw();
    });
    it('should fail on "(class extends !a {})"', () => {
        expect(() => {
            parseScript('(class extends !a {})');
        }).to.throw();
    });

    it('should fail on ""use strict";function foo(){"use strict";}function bar(){var v = 015}"', () => {
        expect(() => {
            parseScript('"use strict";function foo(){"use strict";}function bar(){var v = 015}');
        }).to.throw();
    });
    it('should fail on "function *a(){yield*}"', () => {
        expect(() => {
            parseScript('function *a(){yield*}');
        }).to.throw();
    });
    it('should fail on "export"', () => {
        expect(() => {
            parseModule('export');
        }).to.throw();
    });
    it('should fail on "() <= 42"', () => {
        expect(() => {
            parseScript('() <= 42');
        }).to.throw();
    });
    it('should fail on "new f(....g);"', () => {
        expect(() => {
            parseScript('new f(....g);');
        }).to.throw();
    });
    it('should fail on "([a.b]) => 0"', () => {
        expect(() => {
            parseScript('([a.b]) => 0');
        }).to.throw();
    });
    it('should fail on "(b, ...a)"', () => {
        expect(() => {
            parseScript('(b, ...a)');
        }).to.throw();
    });
    it('should fail on "try { } catch ([a] = []) { }"', () => {
        expect(() => {
            parseScript('try { } catch ([a] = []) { }');
        }).to.throw();
    });
    it('should fail on "class A {a(){},b(){}}"', () => {
        expect(() => {
            parseScript('class A {a(){},b(){}}');
        }).to.throw();
    });
    it('should fail on "function *g() { return yield.x; }"', () => {
        expect(() => {
            parseScript('function *g() { return yield.x; }');
        }).to.throw();
    });
    it('should fail on "(function*() { function*({x: y = yield 3}) {} })"', () => {
        expect(() => {
            parseScript('(function*() { function*({x: y = yield 3}) {} })');
        }).to.throw();
    });
    it('should fail on "for(let a = 0 of b);"', () => {
        expect(() => {
            parseScript('for(let a = 0 of b);');
        }).to.throw();
    });
    it('should fail on "var if = 0"', () => {
        expect(() => {
            parseScript('var if = 0');
        }).to.throw();
    });
    it('should fail on "var ([x]) = 0"', () => {
        expect(() => {
            parseScript('var ([x]) = 0');
        }).to.throw();
    });
    it('should fail on "import {,} from "a";"', () => {
        expect(() => {
            parseModule('import {,} from "a";');
        }).to.throw();
    });
    it('should fail on "var (x)"', () => {
        expect(() => {
            parseScript('var (x)');
        }).to.throw();
    });
    it('should fail on "({ set prop(x, y) {} })"', () => {
        expect(() => {
            parseScript('({ set prop(x, y) {} })');
        }).to.throw();
    });
    it('should fail on """', () => {
        expect(() => {
            parseScript('"');
        }).to.throw();
    });
    it('should fail on "[a += b] = []"', () => {
        expect(() => {
            parseScript('[a += b] = []');
        }).to.throw();
    });
    it('should fail on "for(const a = 0 of b);"', () => {
        expect(() => {
            parseScript('for(const a = 0 of b);');
        }).to.throw();
    });
    it('should fail on "({(a):0})"', () => {
        expect(() => {
            parseScript('({(a):0})');
        }).to.throw();
    });

    it('expect "1 + {" to throw', () => {
        expect(() => {
            parseScript('1 + {');
        }).to.throw();
    });






    it('should fail on "3ea""', () => {
        expect(() => {
            parseScript('3ea"');
        }).to.throw();
    });
    it('should fail on "3in []""', () => {
        expect(() => {
            parseScript('3in []"');
        }).to.throw();
    });
    it('should fail on "3e"', () => {
        expect(() => {
            parseScript('3e');
        }).to.throw();
    });
    it('should fail on "3e+"', () => {
        expect(() => {
            parseScript('3e+');
        }).to.throw();
    });
    it('should fail on "3e-"', () => {
        expect(() => {
            parseScript('3e-"');
        }).to.throw();
    });
    it('should fail on "3x"', () => {
        expect(() => {
            parseScript('3x"');
        }).to.throw();
    });
    it('should fail on "3x0"', () => {
        expect(() => {
            parseScript('3x0');
        }).to.throw();
    });
    it('should fail on "0x"', () => {
        expect(() => {
            parseScript('0x"');
        }).to.throw();
    });
    it('should fail on "01a"', () => {
        expect(() => {
            parseScript('01a"');
        }).to.throw();
    });
    it('should fail on "0x3in[]"', () => {
        expect(() => {
            parseScript('0x3in[]"');
        }).to.throw();
    });
    it('should fail on "x\\"', () => {
        expect(() => {
            parseScript('x\\');
        }).to.throw();
    });
    it('should fail on "x\\u005c"', () => {
        expect(() => {
            parseScript('x\\u005c');
        }).to.throw();
    });
    it('should fail on "x\\u002a"', () => {
        expect(() => {
            parseScript('x\\u002a');
        }).to.throw();
    });
    it('should fail on "/"', () => {
        expect(() => {
            parseScript('/');
        }).to.throw();
    }); 
    
    it('should fail on "var x = /[a-z]/\\ux"', () => {
        expect(() => {
            parseScript('var x = /[a-z]/\\ux');
        }).to.throw();
    });

    it('should fail on "{ set 1 }"', () => {
        expect(() => {
            parseScript('{ set 1 }');
        }).to.throw();
    });
    it('should fail on "{ get 2 }"', () => {
        expect(() => {
            parseScript('{ get 2 }');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });

    it('should fail on "({ i: 42, set i(x) { } })"', () => {
        expect(() => {
            parseScript('({ i: 42, set i(x) { } })');
        }).to.not.throw();
    });

    it('should fail on "({ get i() { }, get i() { } })"', () => {
        expect(() => {
            parseScript('({ get i() { }, get i() { } })');
        }).to.not.throw();
    });

    it('should fail on "({ set i(x) { }, set i(x) { } })"', () => {
        expect(() => {
            parseScript('({ set i(x) { }, set i(x) { } })');
        }).to.not.throw();
    });

    it('should fail on "function t(true) { }"', () => {
        expect(() => {
            parseScript('function t(true) { }');
        }).to.throw();
    });

    it('should fail on "function null() { }"', () => {
        expect(() => {
            parseScript('function null() { }');
        }).to.throw();
    });

    it('should fail on "function false() { }"', () => {
        expect(() => {
            parseScript('function false() { }');
        }).to.throw();
    });

    it('should fail on "throw;"', () => {
        expect(() => {
            parseScript('throw;');
        }).to.throw();
    });

    it('should fail on "for ((i in {}));"', () => {
        expect(() => {
            parseScript('for ((i in {}));');
        }).to.throw();
    });

    it('should fail on "for (i + 1 in {});"', () => {
        expect(() => {
            parseScript('for (i + 1 in {});');
        }).to.throw();
    });

    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });











    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });

    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });

    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });

    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });

    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });

    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });

    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });
    it('should fail on "({ set s(.) { } })"', () => {
        expect(() => {
            parseScript('({ set s(.) { } })');
        }).to.throw();
    });

    it('should fail on "\n]"', () => {
        expect(() => {
            parseScript('\n]');
        }).to.throw();
    });
    it('should fail on "\r]"', () => {
        expect(() => {
            parseScript('\r]');
        }).to.throw();
    });
    it('should fail on "//\n\r]"', () => {
        expect(() => {
            parseScript('//\n\r]');
        }).to.throw();
    });
    it('should fail on "\\u005c"', () => {
        expect(() => {
            parseScript('\\u005c');
        }).to.throw();
    });

    it('should fail on "do { x } *"', () => {
        expect(() => {
            parseScript('do { x } *');
        }).to.throw();
    });

    it('should fail on "while (true) { break x; }"', () => {
        expect(() => {
            parseScript('while (true) { break x; }');
        }).to.throw();
    });

    it('should fail on "while (true) { continue x; }"', () => {
        expect(() => {
            parseScript('while (true) { continue x; }');
        }).to.throw();
    });

    it('should fail on "x: while (true) { (function () { continue x; }); }"', () => {
        expect(() => {
            parseScript('x: while (true) { (function () { continue x; }); }');
        }).to.throw();
    });

    it('should fail on "x: while (true) { (function () { break; }); }"', () => {
        expect(() => {
            parseScript('x: while (true) { (function () { break; }); }');
        }).to.throw();
    });

    it('should fail on "x: while (true) { (function () { continue; }); }"', () => {
        expect(() => {
            parseScript('x: while (true) { (function () { continue; }); }');
        }).to.throw();
    });

    it('should fail on "x: while (true) { x: while (true) { } }"', () => {
        expect(() => {
            parseScript('x: while (true) { x: while (true) { } }');
        }).to.throw();
    });

    it('should fail on "(function () { "use strict"; delete i; }())"', () => {
        expect(() => {
            parseScript('(function () { "use strict"; delete i; }())"');
        }).to.throw();
    });

    it('should fail on "(function () { "\\12"; "use strict"; }())"', () => {
        expect(() => {
            parseScript('(function () { "\\12"; "use strict"; }())"');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; var eval = 10;"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; var eval = 10;');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; try { } catch (eval) { } }"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; try { } catch (eval) { } }');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; arguments++; }"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; arguments++; }');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; function eval() { } }"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; function eval() { } }');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; ({ s: function eval() { } }); }"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; ({ s: function eval() { } }); }');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; ({ s: function eval() { } }); }"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; ({ s: function eval() { } }); }');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; ({ i: 10, set s(eval) { } }); }"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; ({ i: 10, set s(eval) { } }); }');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; ({ i: 10, set s(eval) { } }); }"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; ({ i: 10, set s(eval) { } }); }');
        }).to.throw();
    });

    it('should fail on "function twiss() {"use strict"; ({ s: function s(eval) { } }); }"', () => {
        expect(() => {
            parseScript('function twiss() {"use strict"; ({ s: function s(eval) { } }); }');
        }).to.throw();
    });

    it('should fail on "function twiss(eval) {"use strict";  }"', () => {
        expect(() => {
            parseScript('function twiss(eval) {"use strict";  }');
        }).to.throw();
    });

    it('should fail on "function twiss(package) {"use strict";  }"', () => {
        expect(() => {
            parseScript('function twiss(package) {"use strict";  }');
        }).to.throw();
    });








    it('should fail on "() => {}()"', () => {
        expect(() => {
            parseScript('() => {}()');
        }).to.throw();
    });

    it('should fail on "a => {}()"', () => {
        expect(() => {
            parseScript('a => {}()');
        }).to.throw();
    });

    it('should fail on "export new Foo();"', () => {
        expect(() => {
            parseModule('export new Foo();');
        }).to.throw();
    });

    it('should fail on "export typeof foo;"', () => {
        expect(() => {
            parseModule('export typeof foo;');
        }).to.throw();
    });

    it('should fail on "export { default }"', () => {
        expect(() => {
            parseModule('export { default }');
        }).to.throw();
    });

    it('should fail on "export { if }"', () => {
        expect(() => {
            parseModule('export { if }');
        }).to.throw();
    });

    it('should fail on "export { if as foo }"', () => {
        expect(() => {
            parseModule('export { if as foo }');
        }).to.throw();
    });

    it('should fail on "import default from "foo""', () => {
        expect(() => {
            parseModule('import default from "foo"');
        }).to.throw();
    });

    it('should fail on "import { class } from "foo""', () => {
        expect(() => {
            parseModule('import { class } from "foo"');
        }).to.throw();
    });

    it('should fail on "import { class, var } from "foo""', () => {
        expect(() => {
            parseModule('import { class, var } from  "foo"');
        }).to.throw();
    });

    it('should fail on "import { a as class } from  "foo""', () => {
        expect(() => {
            parseModule('import { a as class } from "foo"');
        }).to.throw();
    });

    it('should fail on "import * as class from  "foo""', () => {
        expect(() => {
            parseModule('import * as class from  "foo"');
        }).to.throw();
    });

    it('should fail on "import { enum } from  "foo""', () => {
        expect(() => {
            parseModule('import { enum } from "foo"');
        }).to.throw();
    });

    it('should fail on "import { a as enum } from "foo""', () => {
        expect(() => {
            parseModule('import { a as enum } from "foo"');
        }).to.throw();
    });

    it('should fail on "import * as enum from "foo""', () => {
        expect(() => {
            parseModule('import * as enum from "foo"');
        }).to.throw();
    });

    it('should fail on "function *g() { (x = yield) => {} }"', () => {
        expect(() => {
            parseScript('function *g() { (x = yield) => {} }');
        }).to.throw();
    });

    it('should fail on "function *g() { ({x = yield}) => {} }"', () => {
        expect(() => {
            parseScript('function *g() { ({x = yield}) => {} }');
        }).to.throw();
    });

    it('should fail on "class A { get constructor() {} }"', () => {
        expect(() => {
            parseScript('class A { get constructor() {} }');
        }).to.throw();
    });

    it('should fail on "function x(...[ a, b ]){}"', () => {
        expect(() => {
            parseScript('function x(...[ a, b ]){}');
        }).to.not.throw();
    });

    it('should fail on "function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}"', () => {
        expect(() => {
            parseScript('function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}');
        }).to.not.throw();
    });
    it('should fail on "(function x(...[ a, b ]){})"', () => {
        expect(() => {
            parseScript('(function x(...[ a, b ]){})');
        }).to.not.throw();
    });
    it('should fail on "class a { set foo(...v) {} };"', () => {
        expect(() => {
            parseScript('class a { set foo(...v) {} };');
        }).to.throw();
    });
    it('should fail on "var a = { set foo(...v) {} };"', () => {
        expect(() => {
            parseScript('fvar a = { set foo(...v) {} };');
        }).to.throw();
    });
    it('should fail on "class a { set foo(...v) {} };"', () => {
        expect(() => {
            parseScript('class a { set foo(...v) {} };');
        }).to.throw();
    });

    it('should fail on "0o"', () => {
        expect(() => {
            parseScript('0o');
        }).to.throw();
    });
    it('should fail on "0o1a"', () => {
        expect(() => {
            parseScript('0o1a');
        }).to.throw();
    });
    it('should fail on "0o9"', () => {
        expect(() => {
            parseScript('0o9');
        }).to.throw();
    });
    it('should fail on "0o18"', () => {
        expect(() => {
            parseScript('0o18');
        }).to.throw();
    });
    it('should fail on "0O"', () => {
        expect(() => {
            parseScript('0O');
        }).to.throw();
    });
    it('should fail on "0b1a"', () => {
        expect(() => {
            parseScript('0b1a');
        }).to.throw();
    });
    it('should fail on "0b9"', () => {
        expect(() => {
            parseScript('0b9');
        }).to.throw();
    });
    it('should fail on "0b18"', () => {
        expect(() => {
            parseScript('0b18');
        }).to.throw();
    });
    it('should fail on "0b12"', () => {
        expect(() => {
            parseScript('0b12');
        }).to.throw();
    });
    it('should fail on "0B"', () => {
        expect(() => {
            parseScript('0B');
        }).to.throw();
    });
    it('should fail on "0B1a"', () => {
        expect(() => {
            parseScript('0B1a');
        }).to.throw();
    });
    it('should fail on "0B9"', () => {
        expect(() => {
            parseScript('0B9');
        }).to.throw();
    });
    it('should fail on "0B18"', () => {
        expect(() => {
            parseScript('0B18');
        }).to.throw();
    });
    it('should fail on "0B12"', () => {
        expect(() => {
            parseScript('0B12');
        }).to.throw();
    });
    it('should fail on "\"\\u{110000}\""', () => {
        expect(() => {
            parseScript("\"\\u{110000}\"");
        }).to.throw();
    });
    it('should fail on "[v] += ary"', () => {
        expect(() => {
            parseScript('[v] += ary');
        }).to.throw();
    });
    it('should fail on "[2] = 42"', () => {
        expect(() => {
            parseScript('[2] = 42');
        }).to.throw();
    });

    it('should fail on "[2] = 42"', () => {
        expect(() => {
            parseScript('[2] = 42');
        }).to.throw();
    });

    it('should fail on "({ obj:20 }) = 42"', () => {
        expect(() => {
            parseScript('({ obj:20 }) = 42');
        }).to.throw();
    });

    it('should fail on "( { get x() {} } = 0)"', () => {
        expect(() => {
            parseScript('( { get x() {} } = 0)');
        }).to.throw();
    });

    it('should fail on "function hello() {"use strict"; ({ i: 10, s(eval) { } }); }"', () => {
        expect(() => {
            parseScript('function hello() {"use strict"; ({ i: 10, s(eval) { } }); }');
        }).to.throw();
    });

    it('should fail on "var default"', () => {
        expect(() => {
            parseScript('var default');
        }).to.throw();
    });

    it('should fail on "import { foo, bar }"', () => {
        expect(() => {
            parseModule('import { foo, bar }');
        }).to.throw();
    });

    it('should fail on "(a, a) => 42"', () => {
        expect(() => {
            parseScript('(a, a) => 42');
        }).to.throw();
    });


    it('should fail on "(a, a) => 42"', () => {
        expect(() => {
            parseScript('(a, a) => 42');
        }).to.throw();
    });

    it('should fail on "void { [1, 2]: 3 };"', () => {
        expect(() => {
            parseScript('void { [1, 2]: 3 };');
        }).to.not.throw();
    });

    it('should fail on "let [this] = [10]"', () => {
        expect(() => {
            parseScript('let [this] = [10]');
        }).to.throw();
    });

    it('should fail on "let {this} = x"', () => {
        expect(() => {
            parseScript('let {this} = x');
        }).to.throw();
    });

    it('should fail on "([function] = [10])"', () => {
        expect(() => {
            parseScript('([function] = [10])');
        }).to.throw();
    });

    it('should fail on "([this] = [10])"', () => {
        expect(() => {
            parseScript('([this] = [10])');
        }).to.throw();
    });

    it('should fail on "({this} = x)"', () => {
        expect(() => {
            parseScript('({this} = x)');
        }).to.throw();
    });

    it('should fail on "var x = {this}"', () => {
        expect(() => {
            parseScript('var x = {this}');
        }).to.throw();
    });


    it('should fail on "(function () { yield 10 })"', () => {
        expect(() => {
            parseScript('(function () { yield 10 })');
        }).to.throw();
    });

    it('should fail on ""use strict"; let + 1"', () => {
        expect(() => {
            parseScript('"use strict"; let + 1');
        }).to.throw();
    });

    it('should fail on "class A extends yield B { }"', () => {
        expect(() => {
            parseScript('class A extends yield B { }');
        }).to.throw();
    });

    it('should fail on "class default"', () => {
        expect(() => {
            parseScript('class default');
        }).to.throw();
    });

    it('should fail on "`test"', () => {
        expect(() => {
            parseScript('`test');
        }).to.throw();
    });

    it('should fail on "function f(a, ...b, c)"', () => {
        expect(() => {
            parseScript('function f(a, ...b, c)');
        }).to.throw();
    });

    it('should fail on "function f(a, ...b = 0)"', () => {
        expect(() => {
            parseScript('function f(a, ...b = 0)');
        }).to.throw();
    });

    it('should fail on "(...a, b) => {}"', () => {
        expect(() => {
            parseScript('(...a, b) => {}');
        }).to.throw();
    });

    it('should fail on "({ 5 }) => {}"', () => {
        expect(() => {
            parseScript('({ 5 }) => {}');
        }).to.throw();
    });

    it('should fail on "(b, ...a)"', () => {
        expect(() => {
            parseScript('(b, ...a)');
        }).to.throw();
    });

    it('should fail on "({ get test() { } }) => 42"', () => {
        expect(() => {
            parseScript('({ get test() { } }) => 42');
        }).to.throw();
    });

   it('should fail on "let [x]"', () => {
        expect(() => {
            parseScript('let [x]');
        }).to.throw();
    });

    it('should fail on "var [x]"', () => {
        expect(() => {
            parseScript('var [x]');
        }).to.throw();
    });

    it('should fail on "if (1) let x = 10;"', () => {
        expect(() => {
            parseScript('if (1) let x = 10;');
        }).to.throw();
    });

    it('should fail on "for (;;) const x = 10;"', () => {
        expect(() => {
            parseScript('for (;;) const x = 10;');
        }).to.throw();
    });

    it('should fail on "while (1) function foo(){}"', () => {
        expect(() => {
            parseScript('while (1) function foo(){}');
        }).to.throw();
    });

    it('should fail on "[...eval] = arr"', () => {
        expect(() => {
            parseModule('[...eval] = arr');
        }).to.throw();
    });

    it('should fail on "function f(a, ...b, c)"', () => {
        expect(() => {
            parseScript('function f(a, ...b, c)');
        }).to.throw();
    });

    it('should fail on "function f(a, ...b, c)"', () => {
        expect(() => {
            parseScript('function f(a, ...b, c)');
        }).to.throw();
    });

    it('should fail on "new.prop"', () => {
        expect(() => {
            parseScript('new.prop');
        }).to.throw();
    });

    it('should fail on "new.target"', () => {
        expect(() => {
            parseScript('new.target');
        }).to.throw();
    });

    it('should fail on "(function* yield() {})"', () => {
        expect(() => {
            parseScript('(function* yield() {})');
        }).to.throw();
    });

    it('should fail on "function* wrap() {\nfunction* yield() {}\n}"', () => {
        expect(() => {
            parseScript('function* wrap() {\nfunction* yield() {}\n}');
        }).to.throw();
    });

    it('should fail on "function* foo(a = yield b) {}"', () => {
        expect(() => {
            parseScript('function* foo(a = yield b) {}');
        }).to.throw();
    });

    it('should fail on "function* foo(a = class extends (yield b) {}) {}"', () => {
        expect(() => {
            parseScript('function* foo(a = class extends (yield b) {}) {}');
        }).to.throw();
    });

    it('should fail on "function* wrap() {\n(a = yield b) => a\n}"', () => {
        expect(() => {
            parseScript('function* wrap() {\n(a = yield b) => a\n}');
        }).to.throw();
    });

    it('should fail on "({*foo: 1})"', () => {
        expect(() => {
            parseScript('({*foo: 1})');
        }).to.throw();
    });

    it('should fail on "foo: class X {}"', () => {
        expect(() => {
            parseScript('foo: class X {}');
        }).to.throw();
    });

    it('should fail on "var foo = 1; let foo = 1;"', () => {
        expect(() => {
            parseScript('var foo = 1; let foo = 1;');
        }).to.throw();
    });

    it('should fail on "var foo = 1; let foo = 1;"', () => {
        expect(() => {
            parseScript('var foo = 1; let foo = 1;');
        }).to.throw();
    });

    it('should fail on "(x) => {} + 2', () => {
        expect(() => {
            parseScript(`x 
            is y`);
        }).to.throw();
    });

    it('should fail on "with(true) function a(){}', () => {
        expect(() => {
            parseScript('with(true) function a(){}');
        }).to.throw();
    });


    it('should fail on "for(this of 0);', () => {
        expect(() => {
            parseScript('for(this of 0);');
        }).to.throw();
    });

    it('should fail on ""\\x1"', () => {
        expect(() => {
            parseScript('"\\x1"');
        }).to.throw();
    });

    it('should fail on "function hello() { "use strict"; ({ 021: 42 }); }', () => {
        expect(() => {
            parseScript('function hello() { "use strict"; ({ 021: 42 }); }');
        }).to.throw();
    });

    it('should fail on "[...0,...{a=0}]=0', () => {
        expect(() => {
            parseScript('[...0,...{a=0}]=0');
        }).to.throw();
    });

    it('should fail on "super', () => {
        expect(() => {
            parseScript('super');
        }).to.throw();
    });
    it('should fail on ""', () => {
        expect(() => {
            parseScript('"');
        }).to.throw();
    });

    it('should fail on "/', () => {
        expect(() => {
            parseScript('/');
        }).to.throw();
    });

    it('should fail on "var (x)', () => {
        expect(() => {
            parseScript('var (x)');
        }).to.throw();
    });

    it('should fail on "(x) => {} + 2', () => {
        expect(() => {
            parseScript(`throw
            10;`);
        }).to.throw();
    });

    it('should fail on "class A {static static static(){}}', () => {
        expect(() => {
            parseScript('class A {static static static(){}}');
        }).to.throw();
    });

    it('should fail on "with(true) class a {}"', () => {
        expect(() => {
            parseScript('with(true) class a {}');
        }).to.throw();
    });

    it('should fail on "function hello() { "use strict"; function inner() { "octal directive\\1"; } }"', () => {
        expect(() => {
            parseScript('function hello() { "use strict"; function inner() { "octal directive\\1"; } }');
        }).to.throw();
    });

    it('should fail on "(class {a})', () => {
        expect(() => {
            parseScript('(class {a})');
        }).to.throw();
    });

    it('should fail on "({ get: g(d) { } })', () => {
        expect(() => {
            parseScript('({ get: g(d) { } })');
        }).to.throw();
    });

    it('should fail on "if (b,...a, );', () => {
        expect(() => {
            parseScript('if (b,...a, );');
        }).to.throw();
    });
    it('should fail on "0x', () => {
        expect(() => {
            parseScript('0x');
        }).to.throw();
    });
 
    it('should fail on "var [(a)] = 0', () => {
        expect(() => {
            parseScript('var [(a)] = 0');
        }).to.throw();
    });
    it('should fail on "({ get: g(d) { } })', () => {
        expect(() => {
            parseScript('({ get: g(d) { } })');
        }).to.throw();
    });
    it('should fail on ""use strict"; a package', () => {
        expect(() => {
            parseScript('"use strict"; a package');
        }).to.throw();
    });
    it('should fail on "(a ...b) => 0', () => {
        expect(() => {
            parseScript('(a ...b) => 0');
        }).to.throw();
    });

    it('should fail on "(function* ([a.b]) {})"', () => {
        expect(() => {
            parseScript('(function* ([a.b]) {})');
        }).to.throw();
    });

    it('should fail on "var f = function() { new.unknown_property; }', () => {
        expect(() => {
            parseScript('var f = function() { new.unknown_property; }');
        }).to.throw();
    });

    it('should fail on ""use strict"; for (let {a: b = let};;) {}"', () => {
        expect(() => {
            parseScript('"use strict"; for (let {a: b = let};;) {}');
        }).to.throw();
    });

    it('should fail on "(b, ...a) + 1"', () => {
        expect(() => {
            parseScript('(b, ...a) + 1');
        }).to.throw();
    });

    it('should fail on "() + 1', () => {
        expect(() => {
            parseScript('() + 1');
        }).to.throw();
    });

    it('should fail on "(b, ...a) + 1"', () => {
        expect(() => {
            parseScript('(b, ...a) + 1');
        }).to.throw();
    });

    it('should fail on "() + 1', () => {
        expect(() => {
            parseScript('() + 1');
        }).to.throw();
    });


    it('should fail on "var a[0]=0;', () => {
        expect(() => {
            parseScript('var a[0]=0;');
        }).to.throw();
    });

    it('should fail on "() + 1', () => {
        expect(() => {
            parseScript(`const x = 0,
            y = 1,`);
        }).to.throw();
    });

    it('should fail on "class extends A{}', () => {
        expect(() => {
            parseScript('class extends A{}');
        }).to.throw();
    });

    it('should fail on "08a', () => {
        expect(() => {
            parseScript('08a');
        }).to.throw();
    });

    it('should fail on "import', () => {
        expect(() => {
            parseModule('import');
        }).to.throw();
    });

    it('should fail on "(")', () => {
        expect(() => {
            parseScript('(")');
        }).to.throw();
    });

    it('should fail on "for (;;) const x = 10;', () => {
        expect(() => {
            parseScript('for (;;) const x = 10;');
        }).to.throw();
    });

    it('should fail on "0O', () => {
        expect(() => {
            parseScript('0O');
        }).to.throw();
    });

    it('should fail on "0O', () => {
        expect(() => {
            parseScript(`var x = /
            /`);
        }).to.throw();
    });

    it('should fail on "const x = 0,', () => {
        expect(() => {
            parseScript('const x = 0,');
        }).to.throw();
    });

    it('should fail on "({a([a.b]){}})', () => {
        expect(() => {
            parseScript('({a([a.b]){}})');
        }).to.throw();
    });

    it('should fail on "for(({a}) in 0);', () => {
        expect(() => {
            parseScript('for(({a}) in 0);');
        }).to.throw();
    });

    it('should fail on "function *g(){ (yield) => 42 }', () => {
        expect(() => {
            parseScript('function *g(){ (yield) => 42 }');
        }).to.throw();
    });

    it('should fail on "/*hello  *', () => {
        expect(() => {
            parseScript('/*hello  *');
        }).to.throw();
    });

    it('should fail on "var obj = { *test** }', () => {
        expect(() => {
            parseScript('var obj = { *test** }');
        }).to.throw();
    });

    it('should fail on "for(var x=1 in [1,2,3]) 0', () => {
        expect(() => {
            parseScript('for(var x=1 in [1,2,3]) 0');
        }).to.throw();
    });

    it('should fail on "([(a = b)] = []', () => {
        expect(() => {
            parseScript('([(a = b)] = []');
        }).to.throw();
    });

    it('should fail on "({,a,} = 0)', () => {
        expect(() => {
            parseScript('({,a,} = 0)');
        }).to.throw();
    });

    it('should fail on "(...a, b) => {}', () => {
        expect(() => {
            parseScript('(...a, b) => {}');
        }).to.throw();
    });

    it('should fail on "(a,...a)/*‪*/', () => {
        expect(() => {
            parseScript('(a,...a)/*‪*/');
        }).to.throw();
    });

    it('should fail on "for (let x = 1 of y);', () => {
        expect(() => {
            parseScript('for (let x = 1 of y);');
        }).to.throw();
    });

    it('should fail on "var x = /[P QR]/\\u0067', () => {
        expect(() => {
            parseScript('var x = /[P QR]/\\u0067');
        }).to.throw();
    });

    it('should fail on "0O', () => {
        expect(() => {
            parseScript(`(function*() {
                function(x = yield 3) {}
            })`);
        }).to.throw();
    });

    it('should fail on "() <= 0', () => {
        expect(() => {
            parseScript('() <= 0');
        }).to.throw();
    });

    it('should fail on "0O', () => {
        expect(() => {
            parseScript(`throw /* 
            */ e`);
        }).to.throw();
    });

    it('should fail on "switch `test`', () => {
        expect(() => {
            parseScript('switch `test`');
        }).to.throw();
    });

    it('should fail on "[{a=0},{b=0},0] = 0', () => {
        expect(() => {
            parseScript('[{a=0},{b=0},0] = 0');
        }).to.throw();
    });
});