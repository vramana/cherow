import { pass, fail, testErrorLocation } from '../utils';

describe('Miscellaneous - Early errors', () => {

        testErrorLocation(`class a extends b { constructor() { function c(d = super()){} } }`, {
            source: `class a extends b { constructor() { function c(d = super()){} } }`,
            message: 'super() is only valid in derived class constructors',
            line: 1,
            column: 51,
            index: 56
        });

        testErrorLocation(`({ a(){ super(); } });`, {
            source: `({ a(){ super(); } });`,
            message: 'super() is only valid in derived class constructors',
            line: 1,
            column: 8,
            index: 13
        });

        testErrorLocation(`({ a(){ {{ if(0) (( super() )); }} } });`, {
            source: `({ a(){ {{ if(0) (( super() )); }} } });`,
            message: 'super() is only valid in derived class constructors',
            line: 1,
            column: 20,
            index: 25
        });

        testErrorLocation(`class A extends B { constructor() { !{*constructor() { super(); }}; } }`, {
            source: `class A extends B { constructor() { !{*constructor() { super(); }}; } }`,
            message: 'super() is only valid in derived class constructors',
            line: 1,
            column: 55,
            index: 60
        });

        testErrorLocation(`class A extends B { constructor() { !{get constructor() { super(); }}; } }`, {
            source: `class A extends B { constructor() { !{get constructor() { super(); }}; } }`,
            message: 'super() is only valid in derived class constructors',
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

        testErrorLocation(`!{ a() { !function* (){ super.b(); } } };`, {
            source: `!{ a() { !function* (){ super.b(); } } };`,
            message: 'super() is only valid in derived class constructors',
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

        testErrorLocation(`class A extends B { f() { super(); } }`, {
            source: `class A extends B { f() { super(); } }`,
            message: 'super() is only valid in derived class constructors',
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

        testErrorLocation(`(async function a() { super(); })`, {
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

        testErrorLocation(`async function a(x) { let x; }`, {
            source: `async function a(x) { let x; }`,
            message: '\'x\' has already been declared ',
            line: 1,
            column: 26,
            index: 27
        });
});