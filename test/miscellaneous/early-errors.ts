import { pass, fail } from '../test-utils';

describe('Miscellaneous - Early errors', () => {

    fail(`while(1) { function a(){ continue; } }`, {
        source: `while(1) { function a(){ continue; } }`,
        line: 1,
    });

    fail(` (([]) => {'use strict';})`, {
        source: ` (([]) => {'use strict';})`,
        line: 1,
    });

    fail(`class a { b(eval){} };`, {
        source: `class a { b(eval){} };`,
        line: 1,
    });

    fail(` function a() { "use strict"; private = 1; }`, {
        source: ` function a() { "use strict"; private = 1; }`,
        line: 1,
    });

    fail(`function a(static) { "use strict"; }`, {
        source: `function a(static) { "use strict"; }`,
        line: 1,
    });

    fail(`({ a(){ super(); } });`, {
        source: `({ a(){ super(); } });`,
        line: 1,
    });

    fail(`'use strict'; delete ((a));`, {
        source: `'use strict'; delete ((a));`,
        line: 1,
    });

    fail(` 'use strict'; if (1) function a(){} else;`, {
        source: ` 'use strict'; if (1) function a(){} else;`,
        line: 1,
    });

    fail(` class a extends b { constructor() { !{get constructor() { super(); }}; } }`, {
        source: ` class a extends b { constructor() { !{get constructor() { super(); }}; } }`,
        line: 1,
    });

    fail(` function a({a:yield}){ 'use strict'; }`, {
        source: ` function a({a:yield}){ 'use strict'; }`,
        line: 1,
    });

    fail(`({a(yield){ 'use strict'; }})`, {
        source: `({a(yield){ 'use strict'; }})`,
        line: 1,
    });

    fail(` class a { set constructor(b) {} }`, {
        source: ` class a { set constructor(b) {} }`,
        line: 1,
    });

    fail(` 'use strict'; !function arguments(){}`, {
        source: ` 'use strict'; !function arguments(){}`,
        line: 1,
    });

    fail(`'use strict'; b: function a(){}`, {
        source: `'use strict'; b: function a(){}`,
        line: 1,
    });

    fail(` switch(1) { case 2: function a(){ break; } }`, {
        source: ` switch(1) { case 2: function a(){ break; } }`,
        line: 1,
    });

    fail(` 'use strict'; with(1);`, {
        source: ` 'use strict'; with(1);`,
        line: 1,
    });

    fail(`[...[0]] = 0;`, {
        source: `[...[0]] = 0;`,
        line: 1,
    });

    fail(` if(1) continue;`, {
        source: ` if(1) continue;`,
        line: 1,
    });

    fail(` do b: function a(){} while (1)`, {
        source: ` do b: function a(){} while (1)`,
        line: 1,
    });

    fail(` function a(){ while(1) continue b; }`, {
        source: ` function a(){ while(1) continue b; }`,
        line: 1,
    });

    fail(`({ set __proto__(a){}, "__proto__": null, __proto__: null, })`, {
        source: `({ set __proto__(a){}, "__proto__": null, __proto__: null, })`,
        line: 1,
    });

    fail(` function a() {'use strict'; ({ b: 1, set c(eval) { } }); }`, {
        source: ` function a() {'use strict'; ({ b: 1, set c(eval) { } }); }`,
        line: 1,
    });

    fail(` function a(package) { "use strict"; }`, {
        source: ` function a(package) { "use strict"; }`,
        line: 1,
    });

    fail(`for((0) in 0);`, {
        source: `for((0) in 0);`,
        line: 1,
    });

    fail(` while (true) { continue a; }`, {
        source: ` while (true) { continue a; }`,
        line: 1,
    });

    fail(`"use strict"; function a(b, ...[b]){}`, {
        source: `"use strict"; function a(b, ...[b]){}`,
        line: 1,
    });

    fail(` 'use strict'; function arguments(){}`, {
        source: ` 'use strict'; function arguments(){}`,
        line: 1,
    });

    fail(` function a(eval) { "use strict"; }`, {
        source: ` function a(eval) { "use strict"; }`,
        line: 1,
    });

    fail(` "use strict"; try {} catch (yield) {}`, {
        source: ` "use strict"; try {} catch (yield) {}`,
        line: 1,
    });

    fail(` 'use strict'; [eval] = 1`, {
        source: ` 'use strict'; [eval] = 1`,
        line: 1,
    });

    fail(` 'use strict'; !function* arguments(){}`, {
        source: ` 'use strict'; !function* arguments(){}`,
        line: 1,
    });

    fail(`function *a() { (b = yield) => {} }`, {
        source: `function *a() { (b = yield) => {} }`,
        line: 1,
    });

    fail(` 'use strict'; if (1) function a(){}`, {
        source: ` 'use strict'; if (1) function a(){}`,
        line: 1,
    });

    fail(` for(const a in b) d: function c(){}`, {
        source: ` for(const a in b) d: function c(){}`,
        line: 1,
    });

    fail(` function a() {'use strict'; var arguments = 1; }`, {
        source: ` function a() {'use strict'; var arguments = 1; }`,
        line: 1,
    });

    fail(` 'use strict'; +let;`, {
        source: ` 'use strict'; +let;`,
        line: 1,
    });

    fail(` "use strict"; (eval) => 1`, {
        source: ` "use strict"; (eval) => 1`,
        line: 1,
    });

    fail(`class a { constructor(){} "constructor"(){} }`, {
        source: `class a { constructor(){} "constructor"(){} }`,
        line: 1,
    });

    fail(`if(1) b: function a(){} else ;`, {
        source: `if(1) b: function a(){} else ;`,
        line: 1,
    });

    fail(` /./ii`, {
        source: ` /./ii`,
        line: 1,
    });

    fail(` for (const let in a);`, {
        source: ` for (const let in a);`,
        line: 1,
    });

    fail(` function* a(){ !function*(b = yield* c){} }`, {
        source: ` function* a(){ !function*(b = yield* c){} }`,
        line: 1,
    });

    fail(`'use strict'; [,,,arguments,] = 1`, {
        source: `'use strict'; [,,,arguments,] = 1`,
        line: 1,
    });

    fail(`'use strict'; (arguments)=>1`, {
        source: `'use strict'; (arguments)=>1`,
        line: 1,
    });

    fail(`'use strict'; (arguments)=>1`, {
        source: `'use strict'; (arguments)=>1`,
        line: 1,
    });

    fail(`(a, ...b)`, {
        source: `(a, ...b)`,
        line: 1,
    });

    fail(`(((a, ...b)))`, {
        source: `(((a, ...b)))`,
        line: 1,
    });

    fail(`0--`, {
        source: `0--`,
        line: 1,
    });

    fail(`({a: 0} = 0);`, {
        source: `({a: 0} = 0);`,
        line: 1,
    });

    fail(`({get a(){}} = 0)`, {
        source: `({get a(){}} = 0)`,
        line: 1,
    });

    fail(`({set a(b){}} = 0)`, {
        source: `({set a(b){}} = 0)`,
        line: 1,
    });
    fail(`[0] = 0;`, {
        source: `[0] = 0;`,
        line: 1,
    });

    fail(`0 = 0;`, {
        source: `0 = 0;`,
        line: 1,
    });

    fail(`0 /= 0;`, {
        source: `0 /= 0;`,
        line: 1,
    });

    fail(`[a] *= 0;`, {
        source: `[a] *= 0;`,
        line: 1,
    });

    fail(`[...{a: 0}] = 0;`, {
        source: `[...{a: 0}] = 0;`,
        line: 1,
    });
    fail(`[...[0]] = 0;`, {
        source: `[...[0]] = 0;`,
        line: 1,
    });

    fail(`[...0] = 0;`, {
        source: `[...0] = 0;`,
        line: 1,
    });

    fail(`[...new a] = 0;`, {
        source: `[...new a] = 0;`,
        line: 1,
    });

    fail(`for({a: 0} in 0);`, {
        source: `for({a: 0} in 0);`,
        line: 1,
    });

    fail(`for([0] in 0);`, {
        source: `for([0] in 0);`,
        line: 1,
    });

    fail(`for({a: 0} of 0);`, {
        source: `for({a: 0} of 0);`,
        line: 1,
    });

    fail(`for([0] of 0);`, {
        source: `for([0] of 0);`,
        line: 1,
    });
    fail(`for(0 in 0);`, {
        source: `for(0 in 0);`,
        line: 1,
    });

    fail(`for(({a: 0}) in 0);`, {
        source: `for(({a: 0}) in 0);`,
        line: 1,
    });

    fail(`for(([0]) in 0);`, {
        source: `for(([0]) in 0);`,
        line: 1,
    });

    fail(`for(({a: 0}) of 0);`, {
        source: `for(({a: 0}) of 0);`,
        line: 1,
    });

    fail(`for(([0]) of 0);`, {
        source: `for(([0]) of 0);`,
        line: 1,
    });

    fail(`for((0) in 0);`, {
        source: `for((0) in 0);`,
        line: 1,
    });

    fail(`for((0) of 0);`, {
        source: `for((0) of 0);`,
        line: 1,
    });

    fail(`\\u0000`, {
        source: `\\u0000`,
        line: 1,
    });

    fail(`\\u{0}`, {
        source: `\\u{0}`,
        line: 1,
    });

    fail(`a\\u0000`, {
        source: `a\\u0000`,
        line: 1,
    });

    fail(`a\\u{0}`, {
        source: `a\\u{0}`,
        line: 1,
    });

    fail(`("\\u{110000}")`, {
        source: `("\\u{110000}")`,
        line: 1,
    });

    fail(`("\\u{FFFFFFF}")`, {
        source: `("\\u{FFFFFFF}")`,
        line: 1,
    });

    fail(`/./\\u{69}`, {
        source: `/./\\u{69}`,
        line: 1,
    });

    fail(`"use strict"; [arguments] = 0`, {
        source: `"use strict"; [arguments] = 0`,
        line: 1,
    });

    fail(`"use strict";var eval;`, {
        source: `"use strict";var eval;`,
        line: 1,
    });

    fail(`"use strict"; let [eval] = 0;`, {
        source: `"use strict"; let [eval] = 0;`,
        line: 1,
    });

    fail(`"use strict";  eval=>0`, {
        source: `"use strict";  eval=>0`,
        line: 1,
    });

    fail(`"use strict";  (arguments)=>0`, {
        source: `"use strict";  (arguments)=>0`,
        line: 1,
    });

    fail(`"use strict";  function f(eval){}`, {
        source: `"use strict";  function f(eval){}`,
        line: 1,
    });

    fail(`"use strict"; !function (eval){}`, {
        source: `"use strict"; !function (eval){}`,
        line: 1,
    });

    fail(`class A { f(eval){} };`, {
        source: `class A { f(eval){} };`,
        line: 1,
    });

    fail(`class A extends (eval = null) { };`, {
        source: `class A extends (eval = null) { };`,
        line: 1,
    });

    fail(`class A { set f(eval){} };`, {
        source: `class A { set f(eval){} };`,
        line: 1,
    });

    fail(`"use strict";  private:0;`, {
        source: `"use strict";  private:0;`,
        line: 1,
    });

    fail(`"use strict";  +yield;`, {
        source: `"use strict";  +yield;`,
        line: 1,
    });

    fail(`"use strict";  +let;`, {
        source: `"use strict";  +let;`,
        line: 1,
    });

    fail(`"use strict";  yield:0;`, {
        source: `"use strict";  yield:0;`,
        line: 1,
    });

    fail(`"use strict";  function a({a:yield}){}`, {
        source: `"use strict";  function a({a:yield}){}`,
        line: 1,
    });

    fail(`"use strict"; function a({yield=0}){}`, {
        source: `"use strict"; function a({yield=0}){}`,
        line: 1,
    });

    fail(`"use strict"; function a({yield}){}`, {
        source: `"use strict"; function a({yield}){}`,
        line: 1,
    });

    fail(`do label: function f(){} while (0)`, {
        source: `do label: function f(){} while (0)`,
        line: 1,
    });

    fail(`if(0) ; else label: function f(){}`, {
        source: `if(0) ; else label: function f(){}`,
        line: 1,
    });

    fail(`if(0) label: function f(){}`, {
        source: `if(0) label: function f(){}`,
        line: 1,
    });

    fail(`for(let a;;) label: function f(){}`, {
        source: `for(let a;;) label: function f(){}`,
        line: 1,
    });

    fail(`for(;;) label: function f(){}`, {
        source: `for(;;) label: function f(){}`,
        line: 1,
    });

    fail(`for(;;) labelA: labelB: labelC: function f(){}`, {
        source: `for(;;) labelA: labelB: labelC: function f(){}`,
        line: 1,
    });

    fail(`for(let a in b) label: function f(){}`, {
        source: `for(let a in b) label: function f(){}`,
        line: 1,
    });

    fail(`for(let let of 0);`, {
        source: `for(let let of 0);`,
        line: 1,
    });

    fail(`for(const let in 0);`, {
        source: `for(const let in 0);`,
        line: 1,
    });

    fail(`{ continue; }`, {
        source: `{ continue; }`,
        line: 1,
    });

    fail(`if(0) continue;`, {
        source: `if(0) continue;`,
        line: 1,
    });

    fail(`label: if(0) continue label;`, {
        source: `label: if(0) continue label;`,
        line: 1,
    });

    fail(`label: continue label;`, {
        source: `label: continue label;`,
        line: 1,
    });

    fail(`{ break; }`, {
        source: `{ break; }`,
        line: 1,
    });

    fail(`while(0) { function f(){ break; } }`, {
        source: `while(0) { function f(){ break; } }`,
        line: 1,
    });

    fail(`switch(0) { default: !function(){ break; }; }`, {
        source: `switch(0) { default: !function(){ break; }; }`,
        line: 1,
    });

    fail(`with(0) label: function f(){}`, {
        source: `with(0) label: function f(){}`,
        line: 1,
    });

    fail(`class A extends B { a() { function f(){ super.b(); } } }`, {
        source: `class A extends B { a() { function f(){ super.b(); } } }`,
        line: 1,
    });

    fail(`function* g(){ ({a = yield}) => 0; }`, {
        source: `function* g(){ ({a = yield}) => 0; }`,
        line: 1,
    });

    fail(`function* g(){ (a = yield* b) => 0; }`, {
        source: `function* g(){ (a = yield* b) => 0; }`,
        line: 1,
    });

    fail(`function* g(){ (a = yield) => 0; }`, {
        source: `function* g(){ (a = yield) => 0; }`,
        line: 1,
    });

    fail(`function* g(){ ({ *m(a = x + f(yield)){} }); }`, {
        source: `function* g(){ ({ *m(a = x + f(yield)){} }); }`,
        line: 1,
    });

    fail(`function* g(){ ({ *m(a = yield){} }); }`, {
        source: `function* g(){ ({ *m(a = yield){} }); }`,
        line: 1,
    });

    fail(`class A { constructor(){} constructor(){} }`, {
        source: `class A { constructor(){} constructor(){} }`,
        line: 1,
    });

    fail(`class A extends B { f() { super(); } }`, {
        source: `class A extends B { f() { super(); } }`,
        line: 1,
    });

    fail(`class A extends B { static set prototype(a) {} }`, {
        source: `class A extends B { static set prototype(a) {} }`,
        line: 1,
    });

    fail(`class A extends B { static *prototype(){} }`, {
        source: `class A extends B { static *prototype(){} }`,
        line: 1,
    });

    fail(`'use strict'; (arguments)=>1`, {
        source: `'use strict'; (arguments)=>1`,
        line: 1,
    });

    fail(`a: while (true) { a: while (true) { } }`, {
        source: `a: while (true) { a: while (true) { } }`,
        line: 1,
    });

    fail(`function* a(){ !function*(b = c + d(yield)){} }`, {
        source: `function* a(){ !function*(b = c + d(yield)){} }`,
        line: 1,
    });

    fail(`function* a(){ ({ *b({c = yield}){} }); }`, {
        source: `function* a(){ ({ *b({c = yield}){} }); }`,
        line: 1,
    });

    fail(`function a(){ b: b: ; }`, {
        source: `function a(){ b: b: ; }`,
        line: 1,
    });

    fail(`'use strict'; +static;`, {
        source: `'use strict'; +static;`,
        line: 1,
    });

    fail(`function* a(){ !function*(b = yield* c){} }`, {
        source: `function* a(){ !function*(b = yield* c){} }`,
        line: 1,
    });

    fail(`[...new a] = 0;`, {
        source: `[...new a] = 0;`,
        line: 1,
    });

    fail(`function *a(b = yield){}`, {
        source: `function *a(b = yield){}`,
        line: 1,
    });

    fail(`class a extends b { static set prototype(c) {} }`, {
        source: `class a extends b { static set prototype(c) {} }`,
        line: 1,
    });

    fail(`for(a in b) d: function c(){}`, {
        source: `for(a in b) d: function c(){}`,
        line: 1,
    });

    fail(`for (const let in a);`, {
        source: `for (const let in a);`,
        line: 1,
    });

    fail(`function* a(){ ({ *b(c = yield d){} }); }`, {
        source: `function* a(){ ({ *b(c = yield d){} }); }`,
        line: 1,
    });

    fail(`'use strict'; var [yield] = 1;`, {
        source: `'use strict'; var [yield] = 1;`,
        line: 1,
    });

    fail(`0 /= 0;`, {
        source: `0 /= 0;`,
        line: 1,
    });

    fail(`class a {set b(yield){}}`, {
        source: `class a {set b(yield){}}`,
        line: 1,
    });

    fail(`'use strict'; var [yield] = 1;`, {
        source: `'use strict'; var [yield] = 1;`,
        line: 1,
    });

    fail(`function a({yield=1}){ 'use strict'; }`, {
        source: `function a({yield=1}){ 'use strict'; }`,
        line: 1,
    });

    fail(`"use strict"; (a = yield) => {}`, {
        source: `"use strict"; (a = yield) => {}`,
        line: 1,
    });

    fail(`if(1) ; else b: function a(){}`, {
        source: `if(1) ; else b: function a(){}`,
        line: 1,
    });

    fail(`class a extends b { static prototype(){} }`, {
        source: `class a extends b { static prototype(){} }`,
        line: 1,
    });

    fail(`for(const a of b) d: function c(){}`, {
        source: `for(const a of b) d: function c(){}`,
        line: 1,
    });

    fail(`class A extends B { static *prototype(){} }`, {
        source: `class A extends B { static *prototype(){} }`,
        line: 1,
    });

    fail(`continue`, {
        source: `continue`,
        line: 1,
    });

    fail(`for(var a in b) d: function c(){}`, {
        source: `for(var a in b) d: function c(){}`,
        line: 1,
    });

    fail(`'use strict'; ({a: eval} = 1)`, {
        source: `'use strict'; ({a: eval} = 1)`,
        module: true,
        line: 1,
    });

    fail(`function a(eval) { "use strict"; }`, {
        source: `function a(eval) { "use strict"; }`,
        module: true,
        line: 1,
    });

    fail(`a: if(1) continue a;`, {
        source: `a: if(1) continue a;`,
        module: true,
        line: 1,
    });
/*
    fail(`'use strict'; [...eval] = a`, {
        source: `'use strict'; [...eval] = a`,
        module: true,
        line: 1,
    });*/

    fail(`!{ f(eval){ "use strict"; } };`, {
        source: `!{ f(eval){ "use strict"; } };`,
        module: true,
        line: 1,
    });

    fail(`!{ set f(eval){ "use strict"; } };`, {
        source: `!{ set f(eval){ "use strict"; } };`,
        module: true,
        line: 1,
    });

    fail(`!class extends (eval = null) { };`, {
        source: `!class extends (eval = null) { };`,
        module: true,
        line: 1,
    });

    fail(`function a(){ "use strict"; function a(yield){}}`, {
        source: `function a(){ "use strict"; function a(yield){}}`,
        module: true,
        line: 1,
    });

    fail(`!{ a(let) { "use strict"; } }`, {
        source: `!{ a(let) { "use strict"; } }`,
        module: true,
        line: 1,
    });

    fail(`(i\\u006E)`, {
        source: `(i\\u006E)`,
        module: true,
        line: 1,
    });

    fail(`var i\\u006E;`, {
        source: `var i\\u006E;`,
        module: true,
        line: 1,
    });

    fail(`({ a(){ super(); } });`, {
        source: `({ a(){ super(); } });`,
        module: true,
        line: 1,
    });

    fail(`"use strict"; ({arguments = 0} = 0);`, {
        source: `"use strict"; ({arguments = 0} = 0);`,
        module: true,
        line: 1,
    });

    fail(`"use strict"; ({arguments} = 0);`, {
        source: `"use strict"; ({arguments} = 0);`,
        module: true,
        line: 1,
    });

    fail(`"use strict"; ({eval} = 0);`, {
        source: `"use strict"; ({eval} = 0);;`,
        module: true,
        line: 1,
    });

    fail(`for(const a;;);`, {
        source: `for(const a;;);`,
        module: true,
        line: 1,
    });

    fail(`f(0) label: function f(){} else ;`, {
        source: `f(0) label: function f(){} else ;`,
        module: true,
        line: 1,
    });

    fail(`do label: function f(){} while (0);`, {
        source: `do label: function f(){} while (0);`,
        module: true,
        line: 1,
    });

    fail(`for(const a = 0;;) label: function f(){}`, {
        source: `for(const a = 0;;) label: function f(){}`,
        module: true,
        line: 1,
    });

    fail(`for(const a in b) label: function f(){}`, {
        source: `for(const a in b) label: function f(){}`,
        module: true,
        line: 1,
    });

    fail(`for(let let in 0);`, {
        source: `for(let let in 0);`,
        module: true,
        line: 1,
    });

    fail(`f(0) label: function f(){} else ;`, {
        source: `f(0) label: function f(){} else ;`,
        module: true,
        line: 1,
    });

    fail(`switch(0) { case 0: !function(){ break; }; }`, {
        source: `switch(0) { case 0: !function(){ break; }; }`,
        module: true,
        line: 1,
    });

    fail(`while(0) { function f(){ continue; } }`, {
        source: `while(0) { function f(){ continue; } }`,
        module: true,
        line: 1,
    });

    fail(`label: { continue label; }`, {
        source: `label: { continue label; }`,
        module: true,
        line: 1,
    });

    fail(`label: while(0) !function(){ continue label; };`, {
        source: `label: while(0) !function(){ continue label; };`,
        module: true,
        line: 1,
    });

    fail(`label: while(0) { function f(){ continue label; } }`, {
        source: `label: while(0) { function f(){ continue label; } }`,
        module: true,
        line: 1,
    });

    fail(`f(0) label: function f(){} else ;`, {
        source: `f(0) label: function f(){} else ;`,
        module: true,
        line: 1,
    });

    fail(`with(0) label: function f(){}`, {
        source: `with(0) label: function f(){}`,
        module: true,
        line: 1,
    });

    fail(`function f(a = super()){}`, {
        source: `function f(a = super()){}`,
        module: true,
        line: 1,
    });

    fail(`class A extends B { constructor() { function f(){ super(); } } }`, {
        source: `class A extends B { constructor() { function f(){ super(); } } }`,
        module: true,
        line: 1,
    });

    fail(`function* f(a){ super() }`, {
        source: `function* f(a){ super() }`,
        module: true,
        line: 1,
    });

    fail(`function* g(){ function* f(a = yield){} }`, {
        source: `function* g(){ function* f(a = yield){} }`,
        module: true,
        line: 1,
    });

    fail(`function* g(){ function* f([a = yield]){} }`, {
        source: `function* g(){ function* f([a = yield]){} }`,
        module: true,
        line: 1,
    });

    fail(`function* a(){ function* b(c = d + b(yield)){} }`, {
        source: `function* a(){ function* b(c = d + b(yield)){} }`,
        module: true,
        line: 1,
    });

    fail(`function a([]){"use strict";}`, {
        source: `function a([]){"use strict";}`,
        module: true,
        line: 1,
    });

    fail(`(([]) => {"use strict";})`, {
        source: `(([]) => {"use strict";})`,
        module: true,
        line: 1,
    });

    fail(`!{ __proto__: null, __proto__: null, };`, {
        source: `!{ __proto__: null, __proto__: null, };`,
        module: true,
        line: 1,
    });

    fail(`!{ __proto__: null, "__proto__": null };`, {
        source: `!{ __proto__: null, "__proto__": null };`,
        module: true,
        line: 1,
    });

    fail(`!{ __proto__: null, __proto__: null };`, {
        source: `!{ __proto__: null, __proto__: null };`,
        module: true,
        line: 1,
    });

    fail(`function* g(){ !function*([a = yield]){} }`, {
        source: `function* g(){ !function*([a = yield]){} }`,
        module: true,
        line: 1,
    });

    fail(`!{ a(let) { "use strict"; } }`, {
        source: `!{ a(let) { "use strict"; } }`,
        module: true,
        line: 1,
    });

    fail(`class a { get constructor() {} }`, {
        source: `class a { get constructor() {} }`,
        module: true,
        line: 1,
    });

    fail(`(((a, ...b)))`, {
        source: `(((a, ...b)))`,
        module: true,
        line: 1,
    });

    fail(`!{ set a(eval){ 'use strict'; } };`, {
        source: `!{ set a(eval){ 'use strict'; } };`,
        module: true,
        line: 1,
    });

    fail(`function* a(){ (b = c + d(yield)) => 1; }`, {
        source: `function* a(){ (b = c + d(yield)) => 1; }`,
        module: true,
        line: 1,
    });

    fail(`class a {set constructor(b){}}`, {
        source: `class a {set constructor(b){}}`,
        module: true,
        line: 1,
    });

    fail(`if(1) c: b: function a(){}`, {
        source: `if(1) c: b: function a(){}`,
        module: true,
        line: 1,
    });

    fail(`function* a(b = super()){}`, {
        source: `function* a(b = super()){}`,
        module: true,
        line: 1,
    });

    fail(`({ get __proto(){}, "__proto__": null, __proto__: null, })`, {
        source: `({ get __proto(){}, "__proto__": null, __proto__: null, })`,
        module: true,
        line: 1,
    });

    fail(`function* a(){ (b = yield) => 1; }`, {
        source: `function* a(){ (b = yield) => 1; }`,
        module: true,
        line: 1,
    });

    fail(`a: while (true) { (function () { continue a; }); }`, {
        source: `a: while (true) { (function () { continue a; }); }`,
        module: true,
        line: 1,
    });

    fail(`class a { *constructor() {} }`, {
        source: `class a { *constructor() {} }`,
        module: true,
        line: 1,
    });

    fail(`"use strict"; var eval;`, {
        source: `"use strict"; var eval;`,
        module: true,
        line: 1,
    });

    fail(`for((0) in 0);`, {
        source: `for((0) in 0);`,
        module: true,
        line: 1,
    });

    pass(`function a(){ break b; }`, {
        source: `function a(){ break b; }`,
        loc: true,
        ranges: true,
        early: true,
        raw: true,
        expected: {
              "body": [
                {
                  "async": false,
                  "body": {
                    "body": [
                      {
                        "end": 22,
                        "label": {
                          "end": 21,
                          "loc": {
                            "end": {
                              "column": 21,
                              "line": 1,
                            },
                            "start": {
                              "column": 20,
                              "line": 1,
                            }
                          },
                          "name": "b",
                          "start": 20,
                          "type": "Identifier"
                        },
                        "loc": {
                          "end": {
                            "column": 22,
                            "line": 1,
                          },
                          "start": {
                           "column": 14,
                            "line": 1,
                          }
                        },
                        "start": 14,
                        "type": "BreakStatement"
                      },
                    ],
                    "end": 24,
                    "loc": {
                      "end": {
                        "column": 24,
                        "line": 1,
                      },
                      "start": {
                        "column": 12,
                        "line": 1,
                      },
                    },
                    "start": 12,
                    "type": "BlockStatement"
                 },
                  "end": 24,
                  "expression": false,
                  "generator": false,
                  "id": {
                    "end": 10,
                    "loc": {
                      "end": {
                        "column": 10,
                        "line": 1,
                      },
                      "start": {
                        "column": 9,
                        "line": 1,
                      },
                    },
                    "name": "a",
                    "start": 9,
                    "type": "Identifier",
                  },
                  "loc": {
                    "end": {
                      "column": 24,
                     "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration",
                },
              ],
              "earlyErors": [
                {
                  "column": 21,
                 "columnNumber": 21,
                  "description": "Undefined label 'b'",
                  "index": 21,
                  "lineNumber": 1,
                },
              ],
              "end": 24,
              "loc": {
                "end": {
                  "column": 24,
                  "line": 1,
                },
                "start": {
                 "column": 0,
                  "line": 1,
                },
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

});