import { pass, fail } from '../utils';

describe('Miscellaneous - Early errors', () => {
    /**/
    
        fail(`0++`, {
            source: `0++`,
        });

        fail(`0--`, {
            source: `0--`,
        });

        fail(`++0`, {
            source: `++0`,
        });

        fail(`--0`, {
            source: `--0`,
        });

        fail(`0=0;`, {
            source: `0=0;`,
        });

        fail(`({a} += 0)`, {
            source: `({a} += 0)`,
        });

        fail(`[a] *= 0;`, {
            source: `[a] *= 0;`,
        });

        fail(`for({a: 0} in 0);`, {
            source: `for({a: 0} in 0);`,
        });

        fail(`for([0] in 0);`, {
            source: `for([0] in 0);`,
        });

        fail(`for({a: 0} of 0);`, {
            source: `for({a: 0} of 0);`,
        });

        fail(`for([0] of 0);`, {
            source: `for([0] of 0);`,
        });

        fail(`for(0 in 0)`, {
            source: `for(0 in 0)`,
        });

        fail(`for(0 of 0);`, {
            source: `for(0 of 0);`,
        });

        fail(`for(({a: 0}) in 0);`, {
            source: `for(({a: 0}) in 0);`,
        });

        fail(`for(([0]) in 0);`, {
            source: `for(([0]) in 0);`,
        });

        fail(`for(({a: 0}) of 0);`, {
            source: `for(({a: 0}) of 0);`,
        });

        fail(`for(([0]) of 0);`, {
            source: `for(([0]) of 0);`,
        });

        fail(`for((0) in 0);`, {
            source: `for((0) in 0);`,
        });

        fail(`for((0) of 0);`, {
            source: `for((0) of 0);`,
        });

        fail(`"use strict"; function x(a, ...[a]){}`, {
            source: `"use strict"; function x(a, ...[a]){}`,
        });

        fail(`(a,...[a]) => 0;`, {
            source: `(a,...[a]) => 0;`,
        });

        fail(`"use strict"; 1, { arguments } = [];`, {
            source: `"use strict"; 1, { arguments } = [];`,
        });

        fail(`'use strict'; [...eval] = a`, {
            source: `'use strict'; [...eval] = a`,
        });

        fail(`a: { continue a; }`, {
            source: `a:  continue a;`,
        });

        fail(`'use strict'; [...eval] = a`, {
            source: `'use strict'; [...eval] = a`,
        });

        fail(`(...a)`, {
            source: `(...a)`,
        });

        fail(`({get a(){}} = 0)`, {
            source: `({get a(){}} = 0)`,
        });

        fail(`({a(b){}} = 0)`, {
            source: `({a(b){}} = 0)`,
        });

        fail(`({a}) = 0;`, {
            source: `({a}) = 0;`,
        });

        fail(`[...new a] = 0;`, {
            source: `[...new a] = 0;`,
        });

        fail(`\\u{0}`, {
            source: `\\u{0}`,
        });

        fail(`\\u0000`, {
            source: `\\u0000`,
        });

        fail(`("\\u{110000}")`, {
            source: `("\\u{110000}")`,
        });

        fail(`("\\u{FFFFFFF}")`, {
            source: `("\\u{FFFFFFF}")`,
        });

        fail(`/./\\u0069`, {
            source: `/./\\u0069`,
        });

        fail(`/./\\u{69}`, {
            source: `/./\\u{69}`,
        });

        fail(`'use strict'; [,,,arguments,] = 0`, {
            source: `'use strict'; [,,,arguments,] = 0`,
        });

        fail(`'use strict'; ({a: arguments = 0} = 0)`, {
            source: `'use strict'; ({a: arguments = 0} = 0)`,
        });

        fail(`'use strict'; var eval;`, {
            source: `'use strict'; var eval;`,
        });

        fail(`'use strict'; let [eval] = 0;`, {
            source: `'use strict'; let [eval] = 0;`,
        });

        fail(`'use strict'; eval=>0`, {
            source: `'use strict'; eval=>0`,
        });

        fail(`'use strict'; (arguments)=>0`, {
            source: `'use strict'; (arguments)=>0`,
        });

        fail(`'use strict'; function f(eval){}`, {
            source: `'use strict'; function f(eval){}`,
        });

        fail(`class A { f(eval){} };`, {
            source: `class A { f(eval){} };`,
        });

        fail(`'use strict'; +let;`, {
            source: `'use strict'; +let;`,
        });

        fail(`'use strict'; +private;`, {
            source: `'use strict'; +private;`,
        });

        fail(`function a(){ 'use strict'; function a(a=yield){}}`, {
            source: `function a(){ 'use strict'; function a(a=yield){}}`,
        });

        fail(`class A {set a(yield){}}`, {
            source: `class A {set a(yield){}}`,
        });

        fail(`!{ get a() { 'use strict'; +let; } }`, {
            source: `!{ get a() { 'use strict'; +let; } }`,
        });

        fail(`{ let a; const a = 0; }`, {
            source: `{ let a; const a = 0; }`,
        });

        fail(`{ let a; var a; }`, {
            source: `{ let a; var a; }`,
        });

        fail(`let a, b, a;`, {
            source: `let a, b, a;`,
        });

        fail(`let a, [a] = 0;`, {
            source: `let a, [a] = 0;`,
        });

        fail(`let \\u{61}, \\u{0061};`, {
            source: `let \\u{61}, \\u{0061};`,
        });

        fail(`let \\u0061, \\u{0061};`, {
            source: `let \\u0061, \\u{0061};`,
        });

        fail(`let x\\u{61}, x\\u{0061};`, {
            source: `let x\\u{61}, x\\u{0061};`,
        });

        fail(`let x\\u{E01D5}, x\uDB40\uDDD5;`, {
            source: `let x\\u{E01D5}, x\uDB40\uDDD5;`,
        });

        fail(`for(let [a, a] = 0;;);`, {
            source: `for(let [a, a] = 0;;);`,
        });

        fail(`'use strict'; [...eval] = a`, {
            source: `'use strict'; [...eval] = a`,
        });
         
        fail(`for(const [a, a] = 0;;);`, {
            source: `for(const [a, a] = 0;;);`,
        });

        fail(`const a, b = 0;`, {
            source: `const a, b = 0;`,
        });

        fail(`function f(){ const a; }`, {
            source: `function f(){ const a; }`,
        });

        fail(`for(const a = 0, b;;);`, {
            source: `for(const a = 0, b;;);`,
        });

        fail(`if(0) ; else label: function f(){}`, {
            source: `if(0) ; else label: function f(){}`,
        });

        fail(`do label: function f(){} while (0);`, {
            source: `do label: function f(){} while (0);`,
        });

        fail(`for(var a;;) label: function f(){}`, {
            source: `for(var a;;) label: function f(){}`,
        });

        fail(`for(var a in b) label: function f(){}`, {
            source: `for(var a in b) label: function f(){}`,
        });

        fail(`for(let a in b) label: function f(){}`, {
            source: `for(let a in b) label: function f(){}`,
        });

        fail(`for(;;) labelA: labelB: labelC: function f(){}`, {
            source: `for(;;) labelA: labelB: labelC: function f(){}`,
        });

        fail(`while(0) !function(){ continue; };`, {
            source: `while(0) !function(){ continue; };`,
        });

        fail(`label: while(0) !function(){ continue label; };`, {
            source: `label: while(0) !function(){ continue label; };`,
        });

        fail(`if(0) break;`, {
            source: `if(0) break;`,
        });

        fail(`while(0) { function f(){ break; } }`, {
            source: `while(0) { function f(){ break; } }`,
        });

        fail(`switch(0) { case 0: function f(){ break; } }`, {
            source: `switch(0) { case 0: function f(){ break; } }`,
        });

        fail(`'switch(0) { case 0: let a; case 1: let a; }`, {
            source: `switch(0) { case 0: let a; case 1: let a; }`,
        });

        fail(`switch(0) { default: function a(){} case 0: let a  }`, {
            source: `switch(0) { default: function a(){} case 0: let a  }`,
        });

        fail(`switch(0) { default: var a; case 0: const a = 0; }`, {
            source: `switch(0) { default: var a; case 0: const a = 0; }`,
        });

        fail(`'use strict'; function arguments(){}`, {
            source: `'use strict'; function arguments(){}`,
        });

        fail(`'use strict'; !function arguments(){}`, {
            source: `'use strict'; !function arguments(){}`,
        });

        fail(`export default function(a){ let a; }`, {
            source: `export default function(a){ let a; }`,
            module: true
        });

        fail(`export default function(a){ const a = 0; }`, {
            source: `export default function(a){ const a = 0; }`,
            module: true
        });

        fail(`!function(a){ const a = 0; }`, {
            source: `!function(a){ const a = 0; }`,
        });

        fail(`!{ a() { function f(a = super.b()){} } };`, {
            source: `!{ a() { function f(a = super.b()){} } };`,
        });

        fail(`(a, a) => 0;`, {
            source: `(a, a) => 0;`,
        });

        fail(`(function({a: x, b: x}){})`, {
            source: `(function({a: x, b: x}){})`,
        });

        fail(`function f(){ let a; const a = 0; }`, {
            source: `function f(){ let a; const a = 0; }`,
        });

        fail(`function f(){ const a = 0; var a; }`, {
            source: `function f(){ const a = 0; var a; }`,
        });

        fail(`function f(){ var a; const a = 0; }`, {
            source: `function f(){ var a; const a = 0; }`,
        });

        fail(`!{ get f(){ let a; var a; } };`, {
            source: `!{ get f(){ let a; var a; } };`,
        });

        fail(`() => { let a; var a; }`, {
            source: `() => { let a; var a; }`,
        });

        fail(`function* g(){ ({[yield]: a}) => 0; }`, {
            source: `function* g(){ ({[yield]: a}) => 0; }`,
        });

        fail(`({a}) => { const a = 0; }`, {
            source: `({a}) => { const a = 0; }`,
        });

        fail(`let a; const a = 0;`, {
            source: `let a; const a = 0;`,
        });

        fail(`!{ __proto__: null, "__proto__": null };`, {
            source: `!{ __proto__: null, "__proto__": null };`,
        });
});