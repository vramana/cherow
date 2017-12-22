import { pass, fail } from '../utils';

describe('Miscellaneous - Early errors', () => {
    /**/

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
/*
        fail(`class A extends B { f() { super(); } }`, {
            source: `class A extends B { f() { super(); } }`,
        });*/

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

});