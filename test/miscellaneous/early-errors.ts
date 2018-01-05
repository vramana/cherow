import { pass, fail } from '../utils';

describe('Miscellaneous - Early errors', () => {

        fail(`class a extends b { constructor() { function c(d = super()){} } }`, {
            source: `class a extends b { constructor() { function c(d = super()){} } }`,
            message: 'super() is only valid in derived class constructors',
            line: 1,
            column: 51,
            index: 56
        });

        fail(`({ a(){ super(); } });`, {
            source: `({ a(){ super(); } });`,
            message:  '\'super\' keyword unexpected here',
            line: 1,
            column: 8,
            index: 13
        });

        fail(`({ a(){ {{ if(0) (( super() )); }} } });`, {
            source: `({ a(){ {{ if(0) (( super() )); }} } });`,
            message:  '\'super\' keyword unexpected here',
            line: 1,
            column: 20,
            index: 25
        });

        fail(`class A extends B { constructor() { !{*constructor() { super(); }}; } }`, {
            source: `class A extends B { constructor() { !{*constructor() { super(); }}; } }`,
            message: '\'super\' keyword unexpected here',
            line: 1,
            column: 55,
            index: 60
        });

        fail(`class A extends B { constructor() { !{get constructor() { super(); }}; } }`, {
            source: `class A extends B { constructor() { !{get constructor() { super(); }}; } }`,
            message: '\'super\' keyword unexpected here',
            line: 1,
            column: 58,
            index: 63
        });

        fail(`class A extends B { constructor() { !{set constructor(a) { super(); }}; } }`, {
            source: `class A extends B { constructor() { !{set constructor(a) { super(); }}; } }`,
        });

        fail(`!{ *f(a = super()){} };`, {
            source: `!{ *f(a = super()){} };`,
        });

        fail(`!{ *f(a) { super() } };`, {
            source: `!{ *f(a) { super() } };`,
        });

        fail(`function* f(a = super()){}`, {
            source: `function* f(a = super()){}`,
        });

        fail(`function* f(a){ super.b }`, {
            source: `function* f(a){ super.b }`,
        });

        fail(`function f(a){ super() }`, {
            source: `function f(a){ super() }`,
        });

        fail(`!function(a){ super() }`, {
            source: `!function(a){ super() }`,
        });

        fail(`class A extends B { constructor() { !function(){ super(); } } }`, {
            source: `class A extends B { constructor() { !function(){ super(); } } }`,
        });

        fail(`!function f(a = super[0]){}`, {
            source: `!function f(a = super[0]){}`,
        });

        fail(`function f(a = super.b){}`, {
            source: `function f(a = super.b){}`,
        });

        fail(`!function f(a = super[0]){}`, {
            source: `!function f(a = super[0]){}`,
        });

        fail(`function f(a = super.b){}`, {
            source: `function f(a = super.b){}`,
        });

        fail(`!function f(a = super[0]){}`, {
            source: `!function f(a = super[0]){}`,
        });

        fail(`class A extends B { a() { !function(a = super.b()){} } }`, {
            source: `class A extends B { a() { !function(a = super.b()){} } }`,
        });

        fail(`class A extends B { constructor() { !function(a = super()){} } }`, {
            source: `class A extends B { constructor() { !function(a = super()){} } }`,
        });

        fail(`class a extends b { constructor() { function c(d = super()){} } }`, {
            source: `class a extends b { constructor() { function c(d = super()){} } }`,
        });

        fail(`({ a(){ super(); } });`, {
            source: `({ a(){ super(); } });`,
        });

        fail(`({ a(){ {{ if(0) (( super() )); }} } });`, {
            source: `({ a(){ {{ if(0) (( super() )); }} } });`,
        });

        fail(`class A extends B { constructor() { !{*constructor() { super(); }}; } }`, {
            source: `class A extends B { constructor() { !{*constructor() { super(); }}; } }`,
        });

        fail(`class A extends B { constructor() { !{get constructor() { super(); }}; } }`, {
            source: `class A extends B { constructor() { !{get constructor() { super(); }}; } }`,
        });

        fail(`class A extends B { constructor() { !{set constructor(a) { super(); }}; } }`, {
            source: `class A extends B { constructor() { !{set constructor(a) { super(); }}; } }`,
        });

        fail(`!{ *f(a = super()){} };`, {
            source: `!{ *f(a = super()){} };`,
        });

        fail(`!{ *f(a) { super() } };`, {
            source: `!{ *f(a) { super() } };`,
        });

        fail(`function* f(a = super()){}`, {
            source: `function* f(a = super()){}`,
        });

        fail(`function* f(a){ super.b }`, {
            source: `function* f(a){ super.b }`,
        });

        fail(`function f(a){ super() }`, {
            source: `function f(a){ super() }`,
        });

        fail(`!function(a){ super() }`, {
            source: `!function(a){ super() }`,
        });

        fail(`class A extends B { constructor() { !function(){ super(); } } }`, {
            source: `class A extends B { constructor() { !function(){ super(); } } }`,
        });

        fail(`!function f(a = super[0]){}`, {
            source: `!function f(a = super[0]){}`,
        });

        fail(`function f(a = super.b){}`, {
            source: `function f(a = super.b){}`,
        });

        fail(`!function f(a = super[0]){}`, {
            source: `!function f(a = super[0]){}`,
        });

        fail(`function f(a = super.b){}`, {
            source: `function f(a = super.b){}`,
        });

        fail(`!function f(a = super[0]){}`, {
            source: `!function f(a = super[0]){}`,
        });

        fail(`class A extends B { a() { !function(a = super.b()){} } }`, {
            source: `class A extends B { a() { !function(a = super.b()){} } }`,
        });

        fail(`class A extends B { constructor() { !function(a = super()){} } }`, {
            source: `class A extends B { constructor() { !function(a = super()){} } }`,
        });

        fail(`!function* (a){ super.b }`, {
            source: `!function* (a){ super.b }`,
        });

        fail(`!{ a() { function* f(){ super.b(); } } };`, {
            source: `!{ a() { function* f(){ super.b(); } } };`,
        });

        fail(`!{ a() { !function* (){ super.b(); } } };`, {
            source: `!{ a() { !function* (){ super.b(); } } };`,
            message:  '\'super\' keyword unexpected here',
            line: 1,
            column: 24,
            index: 29
        });

        fail(`class A extends B { a() { !function* (){ super.b(); } } }`, {
            source: `class A extends B { a() { !function* (){ super.b(); } } }`,
        });

        fail(`class A { constructor() { super(); } }`, {
            source: `class A { constructor() { super(); } }`,
        });

        fail(`class A { constructor() { {{ (( super() )); }} } }`, {
            source: `class A { constructor() { {{ (( super() )); }} } }`,
        });

        fail(`class A { constructor() { (class {[super()](){}}); } }`, {
            source: `class A { constructor() { (class {[super()](){}}); } }`,
        });

        fail(`class A extends B { f() { super(); } }`, {
            source: `class A extends B { f() { super(); } }`,
            message: '\'super\' keyword unexpected here',
            line: 1,
            column: 26,
            index: 31
        });

        fail(`class A extends B { static f() { super(); } }`, {
            source: `class A extends B { static f() { super(); } }`,
        });

        fail(`(class {[super.a](){}});`, {
            source: `(class {[super.a](){}});`,
        });

        fail(`(class {[super()](){}});`, {
            source: `(class {[super()](){}});`,
        });

        fail(`(class {a(b = super()){}});`, {
            source: `(class {a(b = super()){}});`,
        });

        fail(`({ a(){ super(); } });`, {
            source: `({ a(){ super(); } });`,
        });

        fail(`async function a(k = super.prop) { }`, {
            source: `async function a(k = super.prop) { }`,
        });

        fail(`(async function(k = super.prop) {})`, {
            source: `(async function(k = super.prop) {})`,
        });

        fail(`async function a() { super.prop(); }`, {
            source: `async function a() { super.prop(); }`,
        });

        fail(`(async function a(k = super()) {})`, {
            source: `(async function a(k = super()) {})`,
        });

        fail(`(async function a() { super(); })`, {
            source: `(async function a() { super(); })`,
            message: 'super() is only valid in derived class constructors',
            line: 1,
            column: 22,
            index: 27
        });

        fail(`(async function a(k = await 3) {})`, {
            source: `(async function a(k = await 3) {})`,
        });

        fail(`'use strict'; async function eval() {}`, {
            source: `'use strict'; async function eval() {}`,
        });

        fail(`async function a(x) { let x; }`, {
            source: `async function a(x) { let x; }`,
            message: '\'x\' has already been declared ',
            line: 1,
            column: 26,
            index: 27
        });

        fail(`for(let [let] = 0;;);`, {
            source: `for(let [let] = 0;;);`,
            message: 'let is disallowed as a lexically bound name',
            line: 1,
            column: 9,
            index: 12
        });

        fail(`(i\\u006E)`, {
            source: `(i\\u006E)`,
            message: 'Unexpected token \'in\'',
            line: 1,
            column: 1,
            index: 8
        });

        fail(`var i\\u006E;`, {
            source: `var i\\u006E;`,
            message: 'Unexpected token \'in\'',
            line: 1,
            column: 4,
            index: 11
        });

        fail(`function* g(){ ({ *m(...{a = yield}){} }); }`, {
            source: `function* g(){ ({ *m(...{a = yield}){} }); }`,
            message: 'Yield expression not allowed in formal parameter',
            line: 1,
            column: 21,
            index: 24
        });

        fail(`function* g(){ function* f(...{a = yield}){} }`, {
            source: `function* g(){ function* f(...{a = yield}){} }`,
            message: 'Yield expression not allowed in formal parameter',
            line: 1,
            column: 27,
            index: 30
        });

        fail(`function* g(){ !function*(...{a = yield}){} }`, {
            source: `function* g(){ !function*(...{a = yield}){} }`,
            message: 'Yield expression not allowed in formal parameter',
            line: 1,
            column: 26,
            index: 29
        });

        fail(`"use strict"; if (0); else function f(){}`, {
            source: `"use strict"; if (0); else function f(){}`,
            message: 'function can\'t appear in single-statement context',
            line: 1,
            column: 27,
            index: 35
        });

        fail(`labelA: while(0) continue labelB;`, {
            source: `labelA: while(0) continue labelB;`,
            message: 'Undefined label \'labelB\'',
            line: 1,
            column: 32,
            index: 33
        });

        fail(`let a; export class a {};`, {
            source: `let a; export class a {};`,
            module: true,
            message: '\'a\' has already been declared ',
            line: 1,
            column: 20,
            index: 21
        });
});