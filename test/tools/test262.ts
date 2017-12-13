/**
 * Copyright (c) 2017 and later, Isiah Meadows. Licensed under the ISC License.
 */
 
const fs = require("fs")
const path = require("path")
const {AssertionError} = require("assert")
const util = require("util")

const glob = require("glob")
const jsYaml = require("js-yaml")

const test262Overrides: any = {
    "_0": "Note: properties like these are comments, and you should ignore ",
    "_1": "them.",

    "_2": "These are files that should still parse, but are listed as ",
    "_3": "throwing early `SyntaxError`s",
    "overrides": {
        "test/language/module-code/instn-resolve-err-reference.js": true,
        "test/language/module-code/instn-resolve-empty-export.js": true,
        "test/language/module-code/instn-resolve-err-syntax.js": true
    },

    "_4": "These are files where the real thing is in a call to `eval`",
    "evaled": {
        "test/language/directive-prologue/10.1.1-19-s.js": {
            "source": "function fun() { \"use strict\"; var public = 1; }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-2-s.js": {
            "source": "\"use strict\"\nvar public = 1;",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-20-s.js": {
            "source": "function fun() { var public = 1; \"use strict\"; assert.sameValue(public, 1); }",
            "type": "noStrict",
            "pass": true
        },
        "test/language/directive-prologue/10.1.1-21-s.js": {
            "source": "function fun() { var public = 1; assert.sameValue(public, 1); \"use strict\"; }",
            "type": "noStrict",
            "pass": true
        },
        "test/language/directive-prologue/10.1.1-22-s.js": {
            "source": "(function () { \"use strict\"; var public = 1; }) ();",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-23-s.js": {
            "source": "(function () { var public = 1; assert.sameValue(public, 1); \"use strict\"; }) ();",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-24-s.js": {
            "source": "(function () { var public = 1; \"use strict\"; assert.sameValue(public, 1); }) ();",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-15-s.js": {
            "source": "function testcase() { \"use strict\"; function fun() { var public = 1; } }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-16-s.js": {
            "source": "function testcase() { \"use strict\"; assert.throws(SyntaxError, function() { var public = 1; }); }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-17-s.js": {
            "source": "assert.throws(SyntaxError, function() { \"use strict\"; var obj = {}; Object.defineProperty(obj, \"accProperty\", { get: function () { public = 1; return 11; } }); var temp = obj.accProperty === 11; });",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-25-s.js": {
            "source": "assert.throws(SyntaxError, function() { var obj = {}; Object.defineProperty(obj, \"accProperty\", { get: function () { \"use strict\"; var public = 1; return 11; } }); var temp = obj.accProperty === 11; });",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-27-s.js": {
            "source": "assert.throws(SyntaxError, function() { var obj = {}; Object.defineProperty(obj, \"accProperty\", { get: function () { \"use strict\"; var public = 1; return 11; } }); var temp = obj.accProperty === 11; });",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-18-s.js": {
            "source": "assert.throws(SyntaxError, function() { \"use strict\"; var obj = {}; Object.defineProperty(obj, \"accProperty\", { set: function (value) { var public = 1; data = value; } }); obj.accProperty = \"overrideData\"; });",
            "type": "noStrict",
            "pass": false
        },
        "test/language/directive-prologue/10.1.1-26-s.js": {
            "source": "assert.throws(SyntaxError, function() { var obj = {}; Object.defineProperty(obj, \"accProperty\", { set: function (value) { \"use strict\"; var public = 1; data = value; } }); obj.accProperty = \"overrideData\"; });",
            "type": "noStrict",
            "pass": false
        },
        "test/language/expressions/addition/S11.6.1_A1.js": {
            "source": "1\u0009+\u00091; 1\u000B+\u000B1; 1\u000C+\u000C1; 1\u0020+\u00201; 1\u00A0+\u00A01; 1\u000A+\u000A1; 1\u000D+\u000D1; 1\u2028+\u20281; 1\u2029+\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029+\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/assignment/11.13.1-4-30-s.js": {
            "source": "(eval) = 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/assignment/11.13.1-4-28-s.js": {
            "source": "var eval = 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/assignment/S11.13.1_A1.js": {
            "source": "x\u0009=\u0009true; x\u000B=\u000Btrue; x\u000C=\u000Ctrue; x\u0020=\u0020true; x\u00A0=\u00A0true; x\u000A=\u000Atrue; x\u000D=\u000Dtrue; x\u2028=\u2028true; x\u2029=\u2029true; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/assignment/11.13.1-4-29-s.js": {
            "source": "function testcase() { var arguments = 20; }",
            "type": "onlyStrict",
            "pass": true
        },
        "test/language/expressions/assignment/11.13.1-4-31-s.js": {
            "source": "function testcase() { (arguments) = 20; }",
            "type": "onlyStrict",
            "pass": true
        },
        "test/language/expressions/bitwise-and/S11.10.1_A1.js": {
            "source": "1\u0009&\u00091; 1\u000B&\u000B1; 1\u000C&\u000C1; 1\u0020&\u00201; 1\u00A0&\u00A01; 1\u000A&\u000A1; 1\u000D&\u000D1; 1\u2028&\u20281; 1\u2029&\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029&\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/bitwise-not/S11.4.8_A1.js": {
            "source": "~\u00090; ~\u000B0; ~\u000C0; ~\u00200; ~\u00A00; ~\u000A0; ~\u000D0; ~\u20280; ~\u20290; ~\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20290",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/call/S11.2.3_A1.js": {
            "source": "Number\u0009(); Number\u000B(); Number\u000C(); Number\u0020(); Number\u00A0(); Number\u000A(); Number\u000D(); Number\u2028(); Number\u2029(); Number\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029()",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/bitwise-or/S11.10.3_A1.js": {
            "source": "0\u0009|\u00091; 0\u000B|\u000B1; 0\u000C|\u000C1; 0\u0020|\u00201; 0\u00A0|\u00A01; 0\u000A|\u000A1; 0\u000D|\u000D1; 0\u2028|\u20281; 0\u2029|\u20291; 0\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029|\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/bitwise-xor/S11.10.2_A1.js": {
            "source": "1\u0009^\u00091; 1\u000B^\u000B1; 1\u000C^\u000C1; 1\u0020^\u00201; 1\u00A0^\u00A01; 1\u000A^\u000A1; 1\u000D^\u000D1; 1\u2028^\u20281; 1\u2029^\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029^\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/11.13.2-6-1-s.js": {
            "source": "eval *= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-10-s.js": {
            "source": "eval ^= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-11-s.js": {
            "source": "eval |= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-2-s.js": {
            "source": "eval /= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-3-s.js": {
            "source": "eval %= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-4-s.js": {
            "source": "eval += 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-5-s.js": {
            "source": "eval -= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-6-s.js": {
            "source": "eval <<= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-7-s.js": {
            "source": "eval >>= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-8-s.js": {
            "source": "eval >>>= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-9-s.js": {
            "source": "eval &= 20;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/comma/S11.14_A1.js": {
            "source": "false\u0009,\u0009true; false\u000B,\u000Btrue; false\u000C,\u000Ctrue; false\u0020,\u0020true; false\u00A0,\u00A0true; false\u000A,\u000Atrue; false\u000D,\u000Dtrue; false\u2028,\u2028true; false\u2029,\u2029true; false\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029,\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T1.js": {
            "source": "x\u0009*=\u0009-1; x\u000B*=\u000B-1; x\u000C*=\u000C-1; x\u0020*=\u0020-1; x\u00A0*=\u00A0-1; x\u000A*=\u000A-1; x\u000D*=\u000D-1; x\u2028*=\u2028-1; x\u2029*=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029*=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T10.js": {
            "source": "x\u0009^=\u0009-1; x\u000B^=\u000B-1; x\u000C^=\u000C-1; x\u0020^=\u0020-1; x\u00A0^=\u00A0-1; x\u000A^=\u000A-1; x\u000D^=\u000D-1; x\u2028^=\u2028-1; x\u2029^=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029^=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T11.js": {
            "source": "x\u0009|=\u0009-1; x\u000B|=\u000B-1; x\u000C|=\u000C-1; x\u0020|=\u0020-1; x\u00A0|=\u00A0-1; x\u000A|=\u000A-1; x\u000D|=\u000D-1; x\u2028|=\u2028-1; x\u2029|=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029|=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T2.js": {
            "source": "x\u0009/=\u0009-1; x\u000B/=\u000B-1; x\u000C/=\u000C-1; x\u0020/=\u0020-1; x\u00A0/=\u00A0-1; x\u000A/=\u000A-1; x\u000D/=\u000D-1; x\u2028/=\u2028-1; x\u2029/=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029/=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T3.js": {
            "source": "x\u0009%=\u0009-1; x\u000B%=\u000B-1; x\u000C%=\u000C-1; x\u0020%=\u0020-1; x\u00A0%=\u00A0-1; x\u000A%=\u000A-1; x\u000D%=\u000D-1; x\u2028%=\u2028-1; x\u2029%=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029%=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T4.js": {
            "source": "x\u0009+=\u0009-1; x\u000B+=\u000B-1; x\u000C+=\u000C-1; x\u0020+=\u0020-1; x\u00A0+=\u00A0-1; x\u000A+=\u000A-1; x\u000D+=\u000D-1; x\u2028+=\u2028-1; x\u2029+=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029+=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T5.js": {
            "source": "x\u0009-=\u0009-1; x\u000B-=\u000B-1; x\u000C-=\u000C-1; x\u0020-=\u0020-1; x\u00A0-=\u00A0-1; x\u000A-=\u000A-1; x\u000D-=\u000D-1; x\u2028-=\u2028-1; x\u2029-=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T6.js": {
            "source": "x\u0009<<=\u0009-1; x\u000B<<=\u000B-1; x\u000C<<=\u000C-1; x\u0020<<=\u0020-1; x\u00A0<<=\u00A0-1; x\u000A<<=\u000A-1; x\u000D<<=\u000D-1; x\u2028<<=\u2028-1; x\u2029<<=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029<<=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T7.js": {
            "source": "x\u0009>>=\u0009-1; x\u000B>>=\u000B-1; x\u000C>>=\u000C-1; x\u0020>>=\u0020-1; x\u00A0>>=\u00A0-1; x\u000A>>=\u000A-1; x\u000D>>=\u000D-1; x\u2028>>=\u2028-1; x\u2029>>=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>>=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T8.js": {
            "source": "x\u0009>>>=\u0009-1; x\u000B>>>=\u000B-1; x\u000C>>>=\u000C-1; x\u0020>>>=\u0020-1; x\u00A0>>>=\u00A0-1; x\u000A>>>=\u000A-1; x\u000D>>>=\u000D-1; x\u2028>>>=\u2028-1; x\u2029>>>=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>>>=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/S11.13.2_A1_T9.js": {
            "source": "x\u0009&=\u0009-1; x\u000B&=\u000B-1; x\u000C&=\u000C-1; x\u0020&=\u0020-1; x\u00A0&=\u00A0-1; x\u000A&=\u000A-1; x\u000D&=\u000D-1; x\u2028&=\u2028-1; x\u2029&=\u2029-1; x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029&=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/compound-assignment/11.13.2-6-12-s.js": {
            "source": "function testcase() { arguments *= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-13-s.js": {
            "source": "function testcase() { arguments /= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-14-s.js": {
            "source": "function testcase() { arguments %= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-15-s.js": {
            "source": "function testcase() { arguments += 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-16-s.js": {
            "source": "function testcase() { arguments -= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-17-s.js": {
            "source": "function testcase() { arguments <<= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-18-s.js": {
            "source": "function testcase() { arguments >>= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-19-s.js": {
            "source": "function testcase() { arguments >>>= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-20-s.js": {
            "source": "function testcase() { arguments &= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-21-s.js": {
            "source": "function testcase() { arguments ^= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/compound-assignment/11.13.2-6-22-s.js": {
            "source": "function testcase() { arguments |= 20; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/S11.4.1_A1.js": {
            "source": "delete\u00090; delete\u000B0; delete\u000C0; delete\u00200; delete\u00A00; delete\u000A0; delete\u000D0; delete\u20280; delete\u20290; delete\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20290",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/division/S11.5.2_A1.js": {
            "source": "1\u0009/\u00091; 1\u000B/\u000B1; 1\u000C/\u000C1; 1\u0020/\u00201; 1\u00A0/\u00A01; 1\u000A/\u000A1; 1\u000D/\u000D1; 1\u2028/\u20281; 1\u2029/\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029/\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/does-not-equals/S11.9.2_A1.js": {
            "source": "1\u0009!=\u00091; 1\u000B!=\u000B1; 1\u000C!=\u000C1; 1\u0020!=\u00201; 1\u00A0!=\u00A01; 1\u000A!=\u000A1; 1\u000D!=\u000D1; 1\u2028!=\u20281; 1\u2029!=\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029!=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/equals/S11.9.1_A1.js": {
            "source": "1\u0009==\u00091; 1\u000B==\u000B1; 1\u000C==\u000C1; 1\u0020==\u00201; 1\u00A0==\u00A01; 1\u000A==\u000A1; 1\u000D==\u000D1; 1\u2028==\u20281; 1\u2029==\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029==\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/conditional/S11.12_A1.js": {
            "source": "false\u0009?\u0009true\u0009:\u0009true; false\u000B?\u000Btrue\u000B:\u000Btrue; false\u000C?\u000Ctrue\u000C:\u000Ctrue; false\u0020?\u0020true\u0020:\u0020true; false\u00A0?\u00A0true\u00A0:\u00A0true; false\u000A?\u000Atrue\u000A:\u000Atrue; false\u000D?\u000Dtrue\u000D:\u000Dtrue; false\u2028?\u2028true\u2028:\u2028true; false\u2029?\u2029true\u2029:\u2029true; false\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029?\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029:\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/delete/11.4.1-3-a-1-s.js": {
            "source": "function testcase() { delete obj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-1-s.js": {
            "source": "var _11_4_1_5; function testcase() { delete _11_4_1_5; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-10-s.js": {
            "source": "var arrObj = [1, 2, 3]; function testcase() { delete arrObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-11-s.js": {
            "source": "var strObj = new String(\"abc\"); function testcase() { delete strObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-12-s.js": {
            "source": "var boolObj = new Boolean(false); function testcase() { delete boolObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-13-s.js": {
            "source": "var numObj = new Number(0); function testcase() { delete numObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-14-s.js": {
            "source": "var dateObj = new Date(); function testcase() { delete dateObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-15-s.js": {
            "source": "var regObj = new RegExp(); function testcase() { delete regObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-16-s.js": {
            "source": "var errObj = new Error(); function testcase() { delete errObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-17-s.js": {
            "source": "var argObj = (function (a, b) { delete arguments; }(1, 2));",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-18-s.js": {
            "source": "function testcase() { delete Object; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-19-s.js": {
            "source": "function testcase() { delete Function; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-2-s.js": {
            "source": "function funObj(x) { delete x; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-20-s.js": {
            "source": "function testcase() { delete Array; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-21-s.js": {
            "source": "function testcase() { delete String; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-22-s.js": {
            "source": "function testcase() { delete Boolean; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-23-s.js": {
            "source": "function testcase() { delete Number; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-24-s.js": {
            "source": "function testcase() { delete Date; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-25-s.js": {
            "source": "function testcase() { delete RegExp; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-26-s.js": {
            "source": "function testcase() { delete Error; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-3-s.js": {
            "source": "function funObj() {}; function testcase() { delete funObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-4-s.js": {
            "source": "function funObj(x, y, z) { delete y; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-5-s.js": {
            "source": "var _11_4_1_5 = true; function testcase() { delete _11_4_1_5; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-6-s.js": {
            "source": "var _11_4_1_5 = \"abc\"; function testcase() { delete _11_4_1_5; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-7-s.js": {
            "source": "var obj = new Object(); function testcase() { delete obj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-8-s.js": {
            "source": "var funObj = function () { }; function testcase() { delete funObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/delete/11.4.1-5-a-9-s.js": {
            "source": "function funObj() { }; function testcase() { delete funObj; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/greater-than-or-equal/S11.8.4_A1.js": {
            "source": "1\u0009>=\u00091; 1\u000B>=\u000B1; 1\u000C>=\u000C1; 1\u0020>=\u00201; 1\u00A0>=\u00A01; 1\u000A>=\u000A1; 1\u000D>=\u000D1; 1\u2028>=\u20281; 1\u2029>=\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/greater-than/S11.8.2_A1.js": {
            "source": "1\u0009>\u00091; 1\u000B>\u000B1; 1\u000C>\u000C1; 1\u0020>\u00201; 1\u00A0>\u00A01; 1\u000A>\u000A1; 1\u000D>\u000D1; 1\u2028>\u20281; 1\u2029>\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/left-shift/S11.7.1_A1.js": {
            "source": "1\u0009<<\u00091; 1\u000B<<\u000B1; 1\u000C<<\u000C1; 1\u0020<<\u00201; 1\u00A0<<\u00A01; 1\u000A<<\u000A1; 1\u000D<<\u000D1; 1\u2028<<\u20281; 1\u2029<<\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029<<\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/logical-not/S11.4.9_A1.js": {
            "source": "!\u0009true; !\u000Btrue; !\u000Ctrue; !\u0020true; !\u00A0true; !\u000Atrue; !\u000Dtrue; !\u2028true; !\u2029true; !\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/modulus/S11.5.3_A1.js": {
            "source": "1\u0009%\u00091; 1\u000B%\u000B1; 1\u000C%\u000C1; 1\u0020%\u00201; 1\u00A0%\u00A01; 1\u000A%\u000A1; 1\u000D%\u000D1; 1\u2028%\u20281; 1\u2029%\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029%\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/grouping/S11.1.6_A1.js": {
            "source": "(\u00091\u0009); (\u000B1\u000B); (\u000C1\u000C); (\u00201\u0020); (\u00A01\u00A0); (\u000A1\u000A); (\u000D1\u000D); (\u20281\u2028); (\u20291\u2029); (\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029)",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/in/S11.8.7_A1.js": {
            "source": "'MAX_VALUE'\u0009in\u0009Number; 'MAX_VALUE'\u000Bin\u000BNumber; 'MAX_VALUE'\u000Cin\u000CNumber; 'MAX_VALUE'\u0020in\u0020Number; 'MAX_VALUE'\u00A0in\u00A0Number; 'MAX_VALUE'\u000Ain\u000ANumber; 'MAX_VALUE'\u000Din\u000DNumber; 'MAX_VALUE'\u2028in\u2028Number; 'MAX_VALUE'\u2029in\u2029Number; 'MAX_VALUE'\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029in\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029Number",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/instanceof/S11.8.6_A1.js": {
            "source": "({})\u0009instanceof\u0009Object; ({})\u000Binstanceof\u000BObject; ({})\u000Cinstanceof\u000CObject; ({})\u0020instanceof\u0020Object; ({})\u00A0instanceof\u00A0Object; ({})\u000Ainstanceof\u000AObject; ({})\u000Dinstanceof\u000DObject; ({})\u2028instanceof\u2028Object; ({})\u2029instanceof\u2029Object; ({})\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029instanceof\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029Object",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/less-than-or-equal/S11.8.3_A1.js": {
            "source": "1\u0009<=\u00091; 1\u000B<=\u000B1; 1\u000C<=\u000C1; 1\u0020<=\u00201; 1\u00A0<=\u00A01; 1\u000A<=\u000A1; 1\u000D<=\u000D1; 1\u2028<=\u20281; 1\u2029<=\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029<=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/less-than/S11.8.1_A1.js": {
            "source": "1\u0009<\u00091; 1\u000B<\u000B1; 1\u000C<\u000C1; 1\u0020<\u00201; 1\u00A0<\u00A01; 1\u000A<\u000A1; 1\u000D<\u000D1; 1\u2028<\u20281; 1\u2029<\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029<\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/logical-and/S11.11.1_A1.js": {
            "source": "true\u0009&&\u0009true; true\u000B&&\u000Btrue; true\u000C&&\u000Ctrue; true\u0020&&\u0020true; true\u00A0&&\u00A0true; true\u000A&&\u000Atrue; true\u000D&&\u000Dtrue; true\u2028&&\u2028true; true\u2029&&\u2029true; true\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029&&\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/logical-or/S11.11.2_A1.js": {
            "source": "false\u0009||\u0009true; false\u000B||\u000Btrue; false\u000C||\u000Ctrue; false\u0020||\u0020true; false\u00A0||\u00A0true; false\u000A||\u000Atrue; false\u000D||\u000Dtrue; false\u2028||\u2028true; false\u2029||\u2029true; false\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029||\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/multiplication/S11.5.1_A1.js": {
            "source": "1\u0009*\u00091; 1\u000B*\u000B1; 1\u000C*\u000C1; 1\u0020*\u00201; 1\u00A0*\u00A01; 1\u000A*\u000A1; 1\u000D*\u000D1; 1\u2028*\u20281; 1\u2029*\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029*\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/new/S11.2.2_A1.1.js": {
            "source": "new\u0009Number; new\u000BNumber; new\u000CNumber; new\u0020Number; new\u00A0Number; new\u000ANumber; new\u000DNumber; new\u2028Number; new\u2029Number; new\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029Number",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/new/S11.2.2_A1.2.js": {
            "source": "new\u0009Number(); new\u000BNumber(); new\u000CNumber(); new\u0020Number(); new\u00A0Number(); new\u000ANumber(); new\u000DNumber(); new\u2028Number(); new\u2029Number(); new\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029Number()",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5-1-s.js": {
            "source": "var obj = {set _11_1_5_1_fun(eval) {}};",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/object/11.1.5-4-4-a-1-s.js": {
            "source": "({foo:0,foo:1});",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5-3-s.js": {
            "source": "var obj = {set _11_1_5_3_fun(eval) { \"use strict\"; }};",
            "type": "noStrict",
            "pass": true
        },
        "test/language/expressions/object/11.1.5_4-4-b-2.js": {
            "source": "({foo : 1, get foo(){}});",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5_4-4-c-1.js": {
            "source": "({get foo(){}, foo : 1});",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5_4-4-c-2.js": {
            "source": "({set foo(x){}, foo : 1});",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5_4-4-d-1.js": {
            "source": "({get foo(){}, get foo(){}});",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5_4-4-d-2.js": {
            "source": "({set foo(arg){}, set foo(arg1){}});",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5_4-4-d-3.js": {
            "source": "({get foo(){}, set foo(arg){}, get foo(){}});",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5_4-4-d-4.js": {
            "source": "({set foo(arg){}, get foo(){}, set foo(arg1){}});",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/object/11.1.5-2-s.js": {
            "source": "var obj = {set _11_1_5_2_fun(arguments) {} };",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/object/11.1.5-4-s.js": {
            "source": "var obj = {set _11_1_5_4_fun(arguments) {\"use strict\";}};",
            "type": "noStrict",
            "pass": false
        },
        "test/language/expressions/object/11.1.5_6-2-1-s.js": {
            "source": "var obj = { get _11_1_5_6_2_1() { public = 42; return public; } };",
            "type": "noStrict",
            "pass": false
        },
        "test/language/expressions/object/11.1.5_6-2-2-s.js": {
            "source": "var obj = { get _11_1_5_6_2_2() { \"use strict\"; public = 42; return public; } }; var _11_1_5_6_2_2 = obj._11_1_5_6_2_2;",
            "type": "noStrict",
            "pass": false
        },
        "test/language/expressions/object/11.1.5_7-2-1-s.js": {
            "source": "var data = \"data\"; var obj = { set _11_1_5_7_2_1(value) { public = 42; data = value; } }; obj._11_1_5_7_2_1 = 1;",
            "type": "noStrict",
            "pass": false
        },
        "test/language/expressions/object/11.1.5_7-2-2-s.js": {
            "source": "var data = \"data\"; var obj = { set _11_1_5_7_2_2(value) { public = 42; data = value; } }; obj._11_1_5_7_2_2 = 1;",
            "type": "noStrict",
            "pass": false
        },
        "test/language/expressions/object/11.1.5_4-4-a-2.js": {
            "source": "({foo:0,foo:1});",
            "type": "noStrict",
            "pass": true
        },
        "test/language/expressions/postfix-decrement/11.3.2-2-1-s.js": {
            "source": "function testcase() { arguments--; }",
            "type": "onlyStrict",
            "pass": true
        },
        "test/language/expressions/postfix-decrement/11.3.2-2-2-s.js": {
            "source": "eval--;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/postfix-increment/11.3.1-2-2-s.js": {
            "source": "eval++;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/prefix-decrement/11.4.5-2-1-s.js": {
            "source": "--eval;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/prefix-increment/11.4.4-2-1-s.js": {
            "source": "++eval;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/expressions/prefix-increment/S11.4.4_A1.js": {
            "source": "var x = 0; ++\u0009x; var x = 0; ++\u000Bx; var x = 0; ++\u000Cx; var x = 0; ++\u0020x; var x = 0; ++\u00A0x; var x = 0; ++\u000Ax; var x = 0; ++\u000Dx; var x = 0; ++\u2028x; var x = 0; ++\u2029x; var x = 0; ++\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029x",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/strict-does-not-equals/S11.9.5_A1.js": {
            "source": "1\u0009!==\u00091; 1\u000B!==\u000B1; 1\u000C!==\u000C1; 1\u0020!==\u00201; 1\u00A0!==\u00A01; 1\u000A!==\u000A1; 1\u000D!==\u000D1; 1\u2028!==\u20281; 1\u2029!==\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029!==\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/strict-equals/S11.9.4_A1.js": {
            "source": "1\u0009===\u00091; 1\u000B===\u000B1; 1\u000C===\u000C1; 1\u0020===\u00201; 1\u00A0===\u00A01; 1\u000A===\u000A1; 1\u000D===\u000D1; 1\u2028===\u20281; 1\u2029===\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029===\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/subtraction/S11.6.2_A1.js": {
            "source": "1\u0009-\u00091; 1\u000B-\u000B1; 1\u000C-\u000C1; 1\u0020-\u00201; 1\u00A0-\u00A01; 1\u000A-\u000A1; 1\u000D-\u000D1; 1\u2028-\u20281; 1\u2029-\u20291; 1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/postfix-increment/S11.3.1_A1.2_T1.js": {
            "source": "var x = 0; x\u0009++; x; var x = 0; x\u000B++; x; var x = 0; x\u000C++; x; var x = 0; x\u0020++; x; var x = 0; x\u00A0++; x; var x = 0; x\u0009\u000B\u000C\u0020\u00A0++; x",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/prefix-decrement/S11.4.5_A1.js": {
            "source": "var x = 1; --\u0009x; var x = 1; --\u000Bx; var x = 1; --\u000Cx; var x = 1; --\u0020x; var x = 1; --\u00A0x; var x = 1; --\u000Ax; var x = 1; --\u000Dx; var x = 1; --\u2028x; var x = 1; --\u2029x; var x = 1; --\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029x",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/right-shift/S11.7.2_A1.js": {
            "source": "-4\u0009>>\u00091; -4\u000B>>\u000B1; -4\u000C>>\u000C1; -4\u0020>>\u00201; -4\u00A0>>\u00A01; -4\u000A>>\u000A1; -4\u000D>>\u000D1; -4\u2028>>\u20281; -4\u2029>>\u20291; -4\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>>\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/postfix-decrement/S11.3.2_A1.2_T1.js": {
            "source": "var x = 0; x\u0009--; x; var x = 0; x\u000B--; x; var x = 0; x\u000C--; x; var x = 0; x\u0020--; x; var x = 0; x\u00A0--; x; var x = 0; x\u0009\u000B\u000C\u0020\u00A0--; x",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/property-accessors/S11.2.1_A1.1.js": {
            "source": "Number\u0009.\u0009POSITIVE_INFINITY; Number\u000B.\u000BPOSITIVE_INFINITY; Number\u000C.\u000CPOSITIVE_INFINITY; Number\u0020.\u0020POSITIVE_INFINITY; Number\u00A0.\u00A0POSITIVE_INFINITY; Number\u000A.\u000APOSITIVE_INFINITY; Number\u000D.\u000DPOSITIVE_INFINITY; Number\u2028.\u2028POSITIVE_INFINITY; Number\u2029.\u2029POSITIVE_INFINITY; Number\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029.\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029POSITIVE_INFINITY",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/property-accessors/S11.2.1_A1.2.js": {
            "source": "Number[\u0009\"POSITIVE_INFINITY\"\u0009]; Number[\u000B\"POSITIVE_INFINITY\"\u000B]; Number[\u000C\"POSITIVE_INFINITY\"\u000C]; Number[\u0020\"POSITIVE_INFINITY\"\u0020]; Number[\u00A0\"POSITIVE_INFINITY\"\u00A0]; Number[\u000A\"POSITIVE_INFINITY\"\u000A]; Number[\u000D\"POSITIVE_INFINITY\"\u000D]; Number[\u2028\"POSITIVE_INFINITY\"\u2028]; Number[\u2029\"POSITIVE_INFINITY\"\u2029]; Number[\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029\"POSITIVE_INFINITY\"\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029]",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/postfix-increment/11.3.1-2-1-s.js": {
            "source": "function testcase() { arguments++; }",
            "type": "onlyStrict",
            "pass": true
        },
        "test/language/expressions/prefix-decrement/11.4.5-2-2-s.js": {
            "source": "function testcase() { --arguments; }",
            "type": "onlyStrict",
            "pass": true
        },
        "test/language/expressions/prefix-increment/11.4.4-2-2-s.js": {
            "source": "function testcase() { ++arguments; }",
            "type": "onlyStrict",
            "pass": true
        },
        "test/language/expressions/unary-minus/S11.4.7_A1.js": {
            "source": "-\u00091; -\u000B1; -\u000C1; -\u00201; -\u00A01; -\u000A1; -\u000D1; -\u20281; -\u20291; -\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/unary-plus/S11.4.6_A1.js": {
            "source": "+\u00091; +\u000B1; +\u000C1; +\u00201; +\u00A01; +\u000A1; +\u000D1; +\u20281; +\u20291; +\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/void/S11.4.2_A1.js": {
            "source": "void\u00090; void\u000B0; void\u000C0; void\u00200; void\u00A00; void\u000A0; void\u000D0; void\u20280; void\u20290; void\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20290",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/typeof/syntax.js": {
            "source": "var x = 0; typeof\u0009x; var x = 0; typeof\u000Bx; var x = 0; typeof\u000Cx; var x = 0; typeof\u0020x; var x = 0; typeof\u00A0x; var x = 0; typeof\u000Ax; var x = 0; typeof\u000Dx; var x = 0; typeof\u2028x; var x = 0; typeof\u2029x; var x = 0; typeof\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029x; typeof(0)",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/unsigned-right-shift/S11.7.3_A1.js": {
            "source": "-4\u0009>>>\u00091; -4\u000B>>>\u000B1; -4\u000C>>>\u000C1; -4\u0020>>>\u00201; -4\u00A0>>>\u00A01; -4\u000A>>>\u000A1; -4\u000D>>>\u000D1; -4\u2028>>>\u20281; -4\u2029>>>\u20291; -4\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>>>\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A1.1_T1.js": {
            "source": "\u000Avar\u000Ax\u000A=\u000A1\u000A; result = x; \u000Avar\u000Ax\u000A=\u000A2\u000A; result = x; \nvar\nx\n=\n3\n; result = x; \nvar\nx\n=\n4\n; result = x; \u000Avar\nx\u000A=\n5\u000A; result = x;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A1.2_T1.js": {
            "source": "\u000Dvar\u000Dx\u000D=\u000D1\u000D; result = x; \u000Dvar\u000Dx\u000D=\u000D2\u000D; result = x; \rvar\rx\r=\r3\r; result = x; \rvar\rx\r=\r4\r; result = x; \u000Dvar\rx\u000D=\r5\u000D; result = x;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A1.3.js": {
            "source": "\u2028var\u2028x\u2028=\u20281\u2028; result = x; \u2028var\u2028x\u2028=\u20282\u2028; result = x;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A1.4.js": {
            "source": "\u2029var\u2029x\u2029=\u20291\u2029; result = x; \u2029var\u2029x\u2029=\u20292\u2029; result = x;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/7.3-1.js": {
            "source": "test7_3_1\u2028prop = 66;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/7.3-10.js": {
            "source": "var prop = \\u2029;",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/7.3-2.js": {
            "source": "test7_3_1\u2028prop = 66;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/7.3-3.js": {
            "source": "//Single Line Comments\u2028 var =;",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/7.3-4.js": {
            "source": "//Single Line Comments\u2029 var =;",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/7.3-7.js": {
            "source": "var regExp =  /[\u2028]/",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/7.3-8.js": {
            "source": "var regExp =  /[\u2029]/",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/7.3-9.js": {
            "source": "var prop = \\u2028;",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A3.1_T1.js": {
            "source": "// single line \u000A throw new Test262Error();",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A4_T1.js": {
            "source": "// single line comment\u000A // single line comment\u000A x = 1;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A4_T2.js": {
            "source": "// single line comment\u000D // single line comment\u000D x = 1;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A4_T3.js": {
            "source": "// single line comment\u2028 // single line comment\u2028 x = 1;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A4_T4.js": {
            "source": "// single line comment\u2029 // single line comment\u2029 x = 1;",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A5.1_T1.js": {
            "source": "/*\u000A multi line \u000A comment \u000A*/ /*\u000A multi line \u000A comment \u000A x = 1;*/",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A5.2_T1.js": {
            "source": "/*\u000D multi line \u000D comment \u000D*/ /*\u000D multi line \u000D comment \u000D x = 1;*/",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A5.3.js": {
            "source": "/*\u2028 multi line \u2028 comment \u2028*/ /*\u2028 multi line \u2028 comment \u2028 x = 1;*/",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A5.4.js": {
            "source": "/*\u2029 multi line \u2029 comment \u2029*/ /*\u2029 multi line \u2029 comment \u2029 x = 1;*/",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A7_T1.js": {
            "source": "// CHECK#1\nvar y=2;\nvar z=3;\nvar\nx\n=\ny\n+\nz\n;\nif (x !== 5) {\n  $ERROR('#1: var\\nx\\n=\\ny\\n+\\nz\\n; x === 5. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#2\nvar y=2;\nvar z=3;\nvar\nx\n=\ny\n+\nz\n;\nif (x !== 5) {\n  $ERROR('#2: var\\nx\\n=\\ny\\n+\\nz\\n; x === 5. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#3\nvar result;\nvar y=2;\nvar z=3;\n\u2028var\u2028x\u2028=\u2028y\u2028+\u2028z\u2028; result = x;\nif (result !== 5) {\n  $ERROR('#3: eval(\"\\u2028var\\u2028x\\u2028=\\u2028y\\u2028+\\u2028z\\u2028; result = x;\"); result === 5. Actual: ' + (result));\n}\nresult=0;\n\n// CHECK#4\nvar y=2;\nvar z=3;\n\u2029var\u2029x\u2029=\u2029y\u2029+\u2029z\u2029; result = x;\nif (result !== 5) {\n  $ERROR('#4: eval(\"\\u2029var\\u2029x\\u2029=\\u2029y\\u2029+\\u2029z\\u2029; result = x;\"); result === 5. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A7_T2.js": {
            "source": "// CHECK#1\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n-\nz\n;\nif (x !== 1) {\n  $ERROR('#1: var\\nx\\n=\\ny\\n-\\nz\\n; x === 1. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#2\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n-\nz\n;\nif (x !== 1) {\n  $ERROR('#2: var\\nx\\n=\\ny\\n-\\nz\\n; x === 1. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#3\nvar result;\nvar y=3;\nvar z=2;\u2028var\u2028x\u2028=\u2028y\u2028-\u2028z\u2028; result = x;\nif (result !== 1) {\n  $ERROR('#3: eval(\"\\u2028var\\u2028x\\u2028=\\u2028y\\u2028-\\u2028z\\u2028; result = x;\"); result === 1. Actual: ' + (result));\n}\nresult=0;\n\n// CHECK#4\nvar y=3;\nvar z=2;\u2029var\u2029x\u2029=\u2029y\u2029-\u2029z\u2029; result = x;\nif (result !== 1) {\n  $ERROR('#4: eval(\"\\u2029var\\u2029x\\u2029=\\u2029y\\u2029-\\u2029z\\u2029; result = x;\"); result === 1. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A7_T3.js": {
            "source": "// CHECK#1\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n*\nz\n;\nif (x !== 6) {\n  $ERROR('#1: var\\nx\\n=\\ny\\n*\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#2\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n*\nz\n;\nif (x !== 6) {\n  $ERROR('#2: var\\nx\\n=\\ny\\n*\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#3\nvar result;\nvar y=3;\nvar z=2;\n\u2028var\u2028x\u2028=\u2028y\u2028*\u2028z\u2028; result = x;\nif (result !== 6) {\n  $ERROR('#3: eval(\"\\u2028var\\u2028x\\u2028=\\u2028y\\u2028*\\u2028z\\u2028; result = x;\"); result === 6. Actual: ' + (result));\n}\nresult=0;\n\n// CHECK#4\nvar y=3;\nvar z=2;\n\u2029var\u2029x\u2029=\u2029y\u2029*\u2029z\u2029; result = x;\nif (result !== 6) {\n  $ERROR('#4: eval(\"\\u2029var\\u2029x\\u2029=\\u2029y\\u2029*\\u2029z\\u2029; result = x;\"); result === 6. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A7_T4.js": {
            "source": "// CHECK#1\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n/\nz\n;\nif (x !== 6) {\n  $ERROR('#1: var\\nx\\n=\\ny\\n/\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#2\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n/\nz\n;\nif (x !== 6) {\n  $ERROR('#2: var\\nx\\n=\\ny\\n/\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#3\nvar result;\nvar y=3;\nvar z=2;\n\u2028var\u2028x\u2028=\u2028y\u2028/\u2028z\u2028; result = x;\nif (result !== 6) {\n  $ERROR('#3: eval(\"\\u2028var\\u2028x\\u2028=\\u2028y\\u2028/\\u2028z\\u2028; result = x;\"); result === 6. Actual: ' + (result));\n}\nresult=0;\n\n// CHECK#4\nvar y=3;\nvar z=2;\n\u2029var\u2029x\u2029=\u2029y\u2029/\u2029z\u2029; result = x;\nif (result !== 6) {\n  $ERROR('#4: eval(\"\\u2029var\\u2029x\\u2029=\\u2029y\\u2029/\\u2029z\\u2029; result = x;\"); result === 6. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A7_T5.js": {
            "source": "// CHECK#1\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n%\nz\n;\nif (x !== 6) {\n  $ERROR('#1: var\\nx\\n=\\ny\\n%\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#2\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n%\nz\n;\nif (x !== 6) {\n  $ERROR('#2: var\\nx\\n=\\ny\\n%\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#3\nvar result;\nvar y=3;\nvar z=2;\n\u2028var\u2028x\u2028=\u2028y\u2028%\u2028z\u2028; result = x;\nif (result !== 6) {\n  $ERROR('#3: eval(\"\\u2028var\\u2028x\\u2028=\\u2028y\\u2028%\\u2028z\\u2028; result = x;\"); result === 6. Actual: ' + (result));\n}\nresult=0;\n\n// CHECK#4\nvar y=3;\nvar z=2;\n\u2029var\u2029x\u2029=\u2029y\u2029%\u2029z\u2029; result = x;\nif (result !== 6) {\n  $ERROR('#4: eval(\"\\u2029var\\u2029x\\u2029=\\u2029y\\u2029%\\u2029z\\u2029; result = x;\"); result === 6. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A7_T6.js": {
            "source": "// CHECK#1\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n>>\nz\n;\nif (x !== 6) {\n  $ERROR('#1: var\\nx\\n=\\ny\\n>>\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#2\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n>>\nz\n;\nif (x !== 6) {\n  $ERROR('#2: var\\nx\\n=\\ny\\n>>\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#3\nvar result;\nvar y=3;\nvar z=2;\n\u2028var\u2028x\u2028=\u2028y\u2028>>\u2028z\u2028; result = x;\nif (result !== 6) {\n  $ERROR('#3: eval(\"\\u2028var\\u2028x\\u2028=\\u2028y\\u2028>>\\u2028z\\u2028; result = x;\"); result === 6. Actual: ' + (result));\n}\nresult=0;\n\n// CHECK#4\nvar y=3;\nvar z=2;\n\u2029var\u2029x\u2029=\u2029y\u2029>>\u2029z\u2029; result = x;\nif (result !== 6) {\n  $ERROR('#4: eval(\"\\u2029var\\u2029x\\u2029=\\u2029y\\u2029>>\\u2029z\\u2029; result = x;\"); result === 6. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A7_T7.js": {
            "source": "// CHECK#1\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n<<\nz\n;\nif (x !== 6) {\n  $ERROR('#1: var\\nx\\n=\\ny\\n<<\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#2\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n<<\nz\n;\nif (x !== 6) {\n  $ERROR('#2: var\\nx\\n=\\ny\\n<<\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#3\nvar result;\nvar y=3;\nvar z=2;\n\u2028var\u2028x\u2028=\u2028y\u2028<<\u2028z\u2028; result = x;\nif (result !== 6) {\n  $ERROR('#3: eval(\"\\u2028var\\u2028x\\u2028=\\u2028y\\u2028<<\\u2028z\\u2028; result = x;\"); result === 6. Actual: ' + (result));\n}\nresult=0;\n\n// CHECK#4\nvar y=3;\nvar z=2;\n\u2029var\u2029x\u2029=\u2029y\u2029<<\u2029z\u2029; result = x;\nif (result !== 6) {\n  $ERROR('#4: eval(\"\\u2029var\\u2029x\\u2029=\\u2029y\\u2029<<\\u2029z\\u2029; result = x;\"); result === 6. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/line-terminators/S7.3_A7_T8.js": {
            "source": "// CHECK#1\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n<\nz\n;\nif (x !== 6) {\n  $ERROR('#1: var\\nx\\n=\\ny\\n<\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#2\nvar y=3;\nvar z=2;\nvar\nx\n=\ny\n<\nz\n;\nif (x !== 6) {\n  $ERROR('#2: var\\nx\\n=\\ny\\n<\\nz\\n; x === 6. Actual: ' + (x));\n}\nx=0;\n\n// CHECK#3\nvar result;\nvar y=3;\nvar z=2;\n\u2028var\u2028x\u2028=\u2028y\u2028<\u2028z\u2028; result = x;\nif (result !== 6) {\n  $ERROR('#3: eval(\"\\u2028var\\u2028x\\u2028=\\u2028y\\u2028<\\u2028z\\u2028; result = x;\"); result === 6. Actual: ' + (result));\n}\nresult=0;\n\n// CHECK#4\nvar y=3;\nvar z=2;\n\u2029var\u2029x\u2029=\u2029y\u2029<\u2029z\u2029; result = x;\nif (result !== 6) {\n  $ERROR('#4: eval(\"\\u2029var\\u2029x\\u2029=\\u2029y\\u2029<\\u2029z\\u2029; result = x;\"); result === 6. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/literals/numeric/7.8.3-1-s.js": {
            "source": "var _7_8_3_1 = 010;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/numeric/7.8.3-2-s.js": {
            "source": "var _7_8_3_2 = 00;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/numeric/7.8.3-3-s.js": {
            "source": "var _7_8_3_3 = 01;",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/numeric/7.8.3-4-s.js": {
            "source": "var _7_8_3_4 = 06",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/numeric/7.8.3-5-s.js": {
            "source": "var _7_8_3_5 = 07",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/numeric/7.8.3-6-s.js": {
            "source": "var _7_8_3_6 = 000",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/numeric/7.8.3-7-s.js": {
            "source": "var _7_8_3_7 = 005",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/regexp/S7.8.5_A3.1_T7.js": {
            "source": "regexp = /(?:)/g",
            "type": "both",
            "pass": true
        },
        "test/language/literals/regexp/S7.8.5_A3.1_T8.js": {
            "source": "regexp = /(?:)/i",
            "type": "both",
            "pass": true
        },
        "test/language/literals/regexp/S7.8.5_A3.1_T9.js": {
            "source": "regexp = /(?:)/m",
            "type": "both",
            "pass": true
        },
        "test/language/literals/string/7.8.4-1-s.js": {
            "source": "\"asterisk: \\052\" /* octal escape sequences forbidden in strict mode*/ ; \"use strict\";",
            "type": "both",
            "pass": false
        },
        "test/language/literals/string/7.8.4-10-s.js": {
            "source": "var x = \" \\10 \";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-11-s.js": {
            "source": "var x = \"\\16\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-12-s.js": {
            "source": "var x = \"\\17\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-13-s.js": {
            "source": "var x = \"\\30\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-14-s.js": {
            "source": "var x = \"\\31\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-15-s.js": {
            "source": "var x = \"\\37\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-16-s.js": {
            "source": "var x = \"\\400\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-17-s.js": {
            "source": "var x = \"\\411\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-18-s.js": {
            "source": "var x = \"\\43a\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-19-s.js": {
            "source": "var x = \"\\463\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-2-s.js": {
            "source": "var x = \"\\1\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-20-s.js": {
            "source": "var x = \"\\474\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-21-s.js": {
            "source": "var x = \"\\77\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-22-s.js": {
            "source": "var x = \"\\777\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-23-s.js": {
            "source": "var x = \"\\000\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-24-s.js": {
            "source": "var x = \"\\001\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-25-s.js": {
            "source": "var x = \"\\106\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-26-s.js": {
            "source": "var x = \"\\207\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-27-s.js": {
            "source": "var x = \"\\377\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-28-s.js": {
            "source": "var x = \"\\376\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-29-s.js": {
            "source": "var x = \"\\3760\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-3-s.js": {
            "source": "var x = \"a\\4\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-30-s.js": {
            "source": "var x = \"\\1\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-31-s.js": {
            "source": "var x = \"\\\" + \"1\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-32-s.js": {
            "source": "var x = \"\\1\\1\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-33-s.js": {
            "source": "var x = \"\\1\\2\\7\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-4-s.js": {
            "source": "var x = \"z\\7\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-5-s.js": {
            "source": "var x = \"\\00a\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-6-s.js": {
            "source": "var x = \"\\01z\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-7-s.js": {
            "source": "var x = \"\\03z\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/literals/string/7.8.4-8-s.js": {
            "source": "var x = \" \\06\";",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/break/S12.8_A2.js": {
            "source": "FOR1 : for(var i=1;i<2;i++){ LABEL1 : do {var x =1;break\u000AFOR1;var y=2;} while(0);} result = i; FOR2 : for(var i=1;i<2;i++){ LABEL2 : do {var x =1;break\u000DFOR2;var y=2;} while(0);} result = i; FOR3 : for(var i=1;i<2;i++){ LABEL3 : do {var x =1;break\u2028FOR3;var y=2;} while(0);} result = i; FOR4 : for(var i=1;i<2;i++){ LABEL4 : do {var x =1;break\u2029FOR4;var y=2;} while(0);} result = i;",
            "type": "both",
            "pass": true
        },
        "test/language/statements/block/12.1-1.js": {
            "source": "try{};catch(_){}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/block/12.1-2.js": {
            "source": "try{};catch(_){};finally{}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/block/12.1-3.js": {
            "source": "try{};finally{}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/block/12.1-4.js": {
            "source": "if(_){};else{}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/block/12.1-5.js": {
            "source": "if(_){};else if(_){}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/block/12.1-6.js": {
            "source": "if(_){};else if(_){};else{}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/block/12.1-7.js": {
            "source": "do{};while(_)",
            "type": "both",
            "pass": false
        },
        "test/language/statements/continue/S12.7_A2.js": {
            "source": "FOR1 : for(var i=1;i<2;i++){FOR1NESTED : for(var j=1;j<2;j++) { continue\u000AFOR1; } while(0);} result = j; FOR2 : for(var i=1;i<2;i++){FOR2NESTED : for(var j=1;j<2;j++) { continue\u000DFOR2; } while(0);} result = j; FOR3 : for(var i=1;i<2;i++){FOR3NESTED : for(var j=1;j<2;j++) { continue\u2028FOR3; } while(0);} result = j; FOR4 : for(var i=1;i<2;i++){FOR4NESTED : for(var j=1;j<2;j++) { continue\u2029FOR4; } while(0);} result = j;",
            "type": "both",
            "pass": true
        },
        "test/language/statements/do-while/S12.6.1_A8.js": {
            "source": "FOR1 : fordo { __condition++; if (((''+__condition/2).split('.')).length>1) continue; __odds++;} while(__condition < 10)",
            "type": "both",
            "pass": true
        },
        "test/language/statements/for-in/S12.6.4_A4.1.js": {
            "source": "for(var ind in (hash={2:'b',1:'a',4:'d',3:'c'}))__str+=hash[ind]",
            "type": "both",
            "pass": true
        },
        "test/language/statements/for-in/S12.6.4_A4.js": {
            "source": "for(ind in (hash={2:'b',1:'a',4:'d',3:'c'}))__str+=hash[ind]",
            "type": "both",
            "pass": true
        },
        "test/language/statements/do-while/S12.6.1_A5.js": {
            "source": "do {__in__do__before__break=1; break; __in__do__after__break=2;} while(0)",
            "type": "both",
            "pass": true
        },
        "test/language/statements/for-in/S12.6.4_A3.js": {
            "source": "for(ind in (arr=[2,1,4,3]))__str+=arr[ind]",
            "type": "both",
            "pass": true
        },
        "test/language/statements/for-in/S12.6.4_A3.1.js": {
            "source": "for(var ind in (arr=[2,1,4,3]))__str+=arr[ind]",
            "type": "both",
            "pass": true
        },
        "test/language/statements/for/S12.6.3_A9.1.js": {
            "source": "for(count=0;;) {if (count===supreme)break;else count++; }",
            "type": "both",
            "pass": true
        },
        "test/language/statements/for/S12.6.3_A9.js": {
            "source": "for(var count=0;;) {if (count===supreme)break;else count++; }",
            "type": "both",
            "pass": true
        },
        "test/language/statements/function/13.1-35-s.js": {
            "source": "'use strict'; function eval() { };",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-37-s.js": {
            "source": "'use strict'; _13_1_37_s.x = function eval() {};",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/S13_A7_T2.js": {
            "source": "function __func(){/ ABC}\nfunction __func(){&1}\nfunction __func(){# ABC}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/function/13.1-11-s.js": {
            "source": "function eval() { };",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-12-s.js": {
            "source": "_13_1_12_s.x = function eval() {};",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-2-1.js": {
            "source": "function foo(eval){};",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-2-2.js": {
            "source": "(function foo(eval){});",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-3-1.js": {
            "source": "function eval(){};",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-3-2.js": {
            "source": "(function eval(){});",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-36-s.js": {
            "source": "function eval() { 'use strict'; };",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-15-s.js": {
            "source": "'use strict';function _13_1_15_fun(eval) { }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-17-s.js": {
            "source": "'use strict'; var _13_1_17_fun = function (eval) { }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-38-s.js": {
            "source": "_13_1_38_s.x = function eval() {'use strict'; };",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-1-s.js": {
            "source": "function _13_1_1_fun(eval) { }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-16-s.js": {
            "source": "function _13_1_16_fun(eval) { 'use strict'; }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-18-s.js": {
            "source": "var _13_1_18_fun = function (eval) { 'use strict'; }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.0-10-s.js": {
            "source": "function _13_0_10_fun() {\nfunction _13_0_10_inner() {\n\"use strict\";\neval = 42;\n}\n_13_0_10_inner();\n};",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.0-11-s.js": {
            "source": "function _13_0_11_fun() {\n\"use strict\";\nfunction _13_0_11_inner() {\neval = 42;\n}\n_13_0_11_inner();\n};",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.0-9-s.js": {
            "source": "var _13_0_9_fun = function () {\nfunction _13_0_9_inner() { eval = 42; }\n_13_0_9_inner();\n};",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-20-s.js": {
            "source": "function _13_1_20_fun(arguments) { 'use strict'; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-3-s.js": {
            "source": "function _13_1_3_fun(arguments) { }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.0-1.js": {
            "source": "function x, y() {}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/function/13.0-2.js": {
            "source": "function x,y,z() {}",
            "type": "both",
            "pass": false
        },
        "test/language/statements/function/13.0-3.js": {
            "source": "function obj.tt() {};",
            "type": "both",
            "pass": false
        },
        "test/language/statements/function/13.0-4.js": {
            "source": "function obj.tt.ss() {};",
            "type": "both",
            "pass": false
        },
        "test/language/statements/function/13.1-1-1.js": {
            "source": "function foo(a,a){}",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-1-2.js": {
            "source": "(function foo(a,a){})",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-13-s.js": {
            "source": "function arguments() { };",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-14-s.js": {
            "source": "_13_1_14_s.x = function arguments() {};",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-2-5.js": {
            "source": "function foo(arguments){};",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-2-6.js": {
            "source": "(function foo(arguments){});",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-3-7.js": {
            "source": "function arguments (){};",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-3-8.js": {
            "source": "(function arguments (){});",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-40-s.js": {
            "source": "function arguments() { 'use strict'; };",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/S13_A16_T1.js": {
            "source": "function\nx\n(\n)\n{\n}\n;\n\nx();\n\nfunction                                                    y                                   (                                          )                                              {};\n\ny();\n\nfunction\n\nz\n\n(\n\n)\n\n{\n    \n}\n\n;\n\nz();\n\nfunction\u0009\u2029w(\u000C)\u00A0{\u000D};\n\nw();",
            "type": "noStrict",
            "pass": true
        },
        "test/language/statements/function/13.1-42-s.js": {
            "source": "_13_1_42_s.x = function arguments() {'use strict';};",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-10-s.js": {
            "source": "var _13_1_10_fun = function (param, param, param) { };",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-24-s.js": {
            "source": "function _13_1_24_fun(param, param) { 'use strict'; }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-26-s.js": {
            "source": "function _13_1_26_fun(param1, param2, param1) { 'use strict'; }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-28-s.js": {
            "source": "function _13_1_28_fun(param, param, param) { 'use strict'; }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-30-s.js": {
            "source": "var _13_1_30_fun = function (param, param) { 'use strict'; };",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-32-s.js": {
            "source": "var _13_1_32_fun = function (param1, param2, param1) { 'use strict'; };",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-34-s.js": {
            "source": "var _13_1_34_fun = function (param, param, param) { 'use strict'; };",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-5-s.js": {
            "source": "function _13_1_5_fun(param, param) { }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-6-s.js": {
            "source": "function _13_1_6_fun(param1, param2, param1) { }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-7-s.js": {
            "source": "function _13_1_7_fun(param, param, param) { }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-8-s.js": {
            "source": "var _13_1_8_fun = function (param, param) { };",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/function/13.1-9-s.js": {
            "source": "var _13_1_9_fun = function (param1, param2, param1) { };",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/if/S12.5_A7.js": {
            "source": "if(1);",
            "type": "both",
            "pass": true
        },
        "test/language/statements/return/S12.9_A2.js": {
            "source": "(function(){var x = 1;return\u000Ax;var y=2;})()\n(function(){var x = 1;return\u000Dx;var y=2;})()\n(function(){var x = 1;return\u2028x;var y=2;})()\n(function(){var x =1;return\u2029x;var y=2;})()",
            "type": "both",
            "pass": true
        },
        "test/language/statements/variable/12.2.1-24-s.js": {
            "source": "function foo() { var eval = 42;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-26-s.js": {
            "source": "function foo() { var a, eval;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-27-s.js": {
            "source": "function foo() { var eval = 42, a;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-29-s.js": {
            "source": "function foo() { var eval, a = 42;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-34-s.js": {
            "source": "for (var eval in null) {};",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-35-s.js": {
            "source": "for (var eval = 42 in null) {};",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-12-s.js": {
            "source": "function foo() { var arguments;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-12.js": {
            "source": "(function (){var arguments;})",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-13-s.js": {
            "source": "function foo() { arguments = 42; }; foo()",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-14-s.js": {
            "source": "(function (){var arguments;});",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-15-s.js": {
            "source": "(function () {arguments = 42;})()",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-23-s.js": {
            "source": "function foo() { var arguments = 42;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-25-s.js": {
            "source": "function foo() { var arguments, a;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-28-s.js": {
            "source": "function foo() { var a, arguments = 42;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-30-s.js": {
            "source": "function foo() { var a = 42, arguments;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-32-s.js": {
            "source": "function foo() { var arguments, arguments = 42;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-33-s.js": {
            "source": "function foo() { var a, arguments, b;}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-36-s.js": {
            "source": "for (var arguments in null) {};",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/variable/12.2.1-37-s.js": {
            "source": "for (var arguments = 42 in null) {};",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/while/S12.6.2_A8.js": {
            "source": "while(__condition < 10) { __condition++; if (((''+__condition/2).split('.')).length>1) continue; __odds++;}",
            "type": "both",
            "pass": true
        },
        "test/language/statements/with/12.10.1-1-s.js": {
            "source": "function f() { 'use strict'; var o = {}; with (o) {}; }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/with/12.10.1-2-s.js": {
            "source": "function foo() { 'use strict'; function f() { var o = {}; with (o) {}; } }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/with/12.10.1-3-s.js": {
            "source": "function foo() { function f() { 'use strict'; var o = {}; with (o) {}; } }",
            "type": "noStrict",
            "pass": false
        },
        "test/language/statements/with/12.10.1-11-s.js": {
            "source": "with ({}) { throw new Error();}",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/with/12.10.1-14-s.js": {
            "source": "var obj = { get(a) { with(a){} } }; ",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/with/12.10.1-15-s.js": {
            "source": "var obj = {}; obj.get = function (a) { with(a){} }; ",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/with/12.10.1-16-s.js": {
            "source": "var obj = {}; obj['get'] = function (a) { with(a){} };  ",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/with/12.10.1-7-s.js": {
            "source": "var f = function () { var o = {}; with (o) {}; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/statements/with/12.10.1-9-s.js": {
            "source": "var f = function () { 'use strict'; var o = {}; with (o) {}; }",
            "type": "onlyStrict",
            "pass": false
        },
        "test/language/white-space/S7.2_A1.1_T1.js": {
            "source": "\u0009var\u0009x\u0009=\u00091\u0009; result = x; \u0009var\u0009x\u0009=\u00092\u0009; result = x; \tvar\tx\t=\t3\t; result = x; \tvar\tx\t=\t4\t; result = x; \u0009var\tx\u0009=\t5\u0009; result = x;",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A1.2_T1.js": {
            "source": "\u000Bvar\u000Bx\u000B=\u000B1\u000B; result = x; \u000Bvar\u000Bx\u000B=\u000B2\u000B; result = x; \u000Bvar\u000Bx\u000B=\u000B3\u000B; result = x; \u000Bvar\u000Bx\u000B=\u000B4\u000B; result = x; \u000Bvar\u000Bx\u000B=\u000B5\u000B; result = x;",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A1.3_T1.js": {
            "source": "\u000Cvar\u000Cx\u000C=\u000C1\u000C; result = x; \u000Cvar\u000Cx\u000C=\u000C2\u000C; result = x; \fvar\fx\f=\f3\f; result = x; \fvar\fx\f=\f4\f; result = x; \u000Cvar\fx\u000C=\f5\u000C; result = x;",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A2.1_T1.js": {
            "source": "//CHECK#1\nif (\"'\u0009str\u0009ing\u0009'\" !== \"\\u0009str\\u0009ing\\u0009\") {\n  $ERROR('#1: eval(\"\\'\\\\u0009str\\\\u0009ing\\\\u0009\\'\") === \"\\\\u0009str\\\\u0009ing\\\\u0009\"');\n}\n\n//CHECK#2\nif (\"'\tstr\ting\t'\" !== \"\\tstr\\ting\\t\") {\n  $ERROR('#2: eval(\"\\'\\\\tstr\\\\ting\\\\t\\'\") === \"\\\\tstr\\\\ting\\\\t\"');\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A2.2_T1.js": {
            "source": "//CHECK#1\nif (\"'\u000Bstr\u000Bing\u000B'\" !== \"\\u000Bstr\\u000Bing\\u000B\") {\n  $ERROR('#1: eval(\"\\'\\\\u000Bstr\\\\u000Bing\\\\u000B\\'\") === \"\\\\u000Bstr\\\\u000Bing\\\\u000B\"');\n}\n\n//CHECK#2\nif (\"'\u000Bstr\u000Bing\u000B'\" !== \"\\vstr\\ving\\v\") {\n  $ERROR('#2: eval(\"\\'\\\\vstr\\\\ving\\\\v\\'\") === \"\\\\vstr\\\\ving\\\\v\"');\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A2.3_T1.js": {
            "source": "//CHECK#1\nif (\"'\u000Cstr\u000Cing\u000C'\" !== \"\\u000Cstr\\u000Cing\\u000C\") {\n  $ERROR('#1: eval(\"\\'\\\\u000Cstr\\\\u000Cing\\\\u000C\\'\") === \"\\\\u000Cstr\\\\u000Cing\\\\u000C\"');\n}\n\n//CHECK#2\nif (\"'\fstr\fing\f'\" !== \"\\fstr\\fing\\f\") {\n  $ERROR('#2: eval(\"\\'\\\\fstr\\\\fing\\\\f\\'\") === \"\\\\fstr\\\\fing\\\\f\"');\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A3.1_T1.js": {
            "source": "//CHECK#1\n//\u0009 single line \u0009 comment \u0009\n\n//CHECK#2\nvar x = 0;\n//\u0009 single line \u0009 comment \u0009 x = 1;\nif (x !== 0) {\n  $ERROR('#1: var x = 0; eval(\"//\\u0009 single line \\u0009 comment \\u0009 x = 1;\"); x === 0. Actual: ' + (x));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A3.2_T1.js": {
            "source": "//CHECK#1\n//\u000B single line \u000B comment \u000B\n\n//CHECK#2\nvar x = 0;\n//\u000B single line \u000B comment \u000B x = 1;\nif (x !== 0) {\n  $ERROR('#1: var x = 0; eval(\"//\\u000B single line \\u000B comment \\u000B x = 1;\"); x === 0. Actual: ' + (x));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A3.3_T1.js": {
            "source": "//CHECK#1\n//\u000C single line \u000C comment \u000C\n\n//CHECK#2\nvar x = 0;\n//\u000C single line \u000C comment \u000C x = 1;\nif (x !== 0) {\n  $ERROR('#1: var x = 0; eval(\"//\\u000C single line \\u000C comment \\u000C x = 1;\"); x === 0. Actual: ' + (x));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A3.5_T1.js": {
            "source": "//CHECK#1\n//\u00A0 single line \u00A0 comment \u00A0\n\n//CHECK#2\nvar x = 0;\n//\u00A0 single line \u00A0 comment \u00A0 x = 1;\nif (x !== 0) {\n  $ERROR('#1: var x = 0; eval(\"//\\u00A0 single line \\u00A0 comment \\u00A0 x = 1;\"); x === 0. Actual: ' + (x));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A4.1_T1.js": {
            "source": "// CHECK#1\n/*\u0009 multi line \u0009 comment \u0009*/\n\n//CHECK#2\nvar x = 0;\n/*\u0009 multi line \u0009 comment \u0009 x = 1;*/\nif (x !== 0) {\n  $ERROR('#1: var x = 0; eval(\"/*\\u0009 multi line \\u0009 comment \\u0009 x = 1;*/\"); x === 0. Actual: ' + (x));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A4.2_T1.js": {
            "source": "// CHECK#1\n/*\u000B multi line \u000B comment \u000B*/\n\n//CHECK#2\nvar x = 0;\n/*\u000B multi line \u000B comment \u000B x = 1;*/\nif (x !== 0) {\n  $ERROR('#1: var x = 0; eval(\"/*\\u000B multi line \\u000B comment \\u000B x = 1;*/\"); x === 0. Actual: ' + (x));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A4.3_T1.js": {
            "source": "// CHECK#1\n/*\u000C multi line \u000C comment \u000C*/\n\n//CHECK#2\nvar x = 0;\n/*\u000C multi line \u000C comment \u000C x = 1;*/\nif (x !== 0) {\n  $ERROR('#1: var x = 0; eval(\"/*\\u000C multi line \\u000C comment \\u000C x = 1;*/\"); x === 0. Actual: ' + (x));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A4.5_T1.js": {
            "source": "// CHECK#1\n/*\u00A0 multi line \u00A0 comment \u00A0*/\n\n//CHECK#2\nvar x = 0;\n/*\u00A0 multi line \u00A0 comment \u00A0 x = 1;*/\nif (x !== 0) {\n  $ERROR('#1: var x = 0; eval(\"/*\\u00A0 multi line \\u00A0 comment \\u00A0 x = 1;*/\"); x === 0. Actual: ' + (x));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A1.4_T1.js": {
            "source": "var result;\n\n// CHECK#1\n\u0020var\u0020x\u0020=\u00201\u0020; result = x;\nif (result !== 1) {\n  $ERROR('#1: eval(\"\\u0020var\\u0020x\\u0020=\\u00201\\u0020; result = x;\"); result === 1;');\n}\n\n//CHECK#2\n\u0020var\u0020x\u0020=\u00202\u0020; result = x;\nif (result !== 2) {\n  $ERROR('#2: eval(\"\\u0020var\\u0020x\\u0020=\\u00202\\u0020; result = x;\"); result === 2. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A1.5_T1.js": {
            "source": "var result;\n\n// CHECK#1\n\u00A0var\u00A0x\u00A0=\u00A01\u00A0; result = x;\nif (result !== 1) {\n  $ERROR('#1: eval(\"\\u00A0var\\u00A0x\\u00A0=\\u00A01\\u00A0; result = x;\"); result === 1;');\n}\n\n//CHECK#2\n\u00A0var\u00A0x\u00A0=\u00A02\u00A0; result = x;\nif (result !== 2) {\n  $ERROR('#2: eval(\"\\u00A0var\\u00A0x\\u00A0=\\u00A02\\u00A0; result = x;\"); result === 2. Actual: ' + (result));\n}",
            "type": "both",
            "pass": true
        },
        "test/language/white-space/S7.2_A2.5_T1.js": {
            "source": "// CHECK#1\nif (\"'\u00A0str\u00A0ing\u00A0'\" !== \"\\u00A0str\\u00A0ing\\u00A0\") {\n  $ERROR('#1: eval(\"\\'\\\\u00A0str\\\\u00A0ing\\\\u00A0\\'\") === \"\\\\u00A0str\\\\u00A0ing\\\\u00A0\"');\n}",
            "type": "both",
            "pass": true
        },
        "test/language/expressions/postfix-decrement/S11.3.2_A1.1_T1.js": {
            "source": "var x = 1; x\u000A--",
            "type": "both",
            "pass": false
        },
        "test/language/expressions/postfix-decrement/S11.3.2_A1.1_T2.js": {
            "source": "var x = 1; x\u000D--",
            "type": "both",
            "pass": false
        },
        "test/language/expressions/postfix-decrement/S11.3.2_A1.1_T3.js": {
            "source": "var x = 1; x\u2028--",
            "type": "both",
            "pass": false
        },
        "test/language/expressions/postfix-decrement/S11.3.2_A1.1_T4.js": {
            "source": "var x = 1; x\u2029--",
            "type": "both",
            "pass": false
        },
        "test/language/expressions/postfix-increment/S11.3.1_A1.1_T1.js": {
            "source": "var x = 1; x\u000A++",
            "type": "both",
            "pass": false
        },
        "test/language/expressions/postfix-increment/S11.3.1_A1.1_T2.js": {
            "source": "var x = 1; x\u000D++",
            "type": "both",
            "pass": false
        },
        "test/language/expressions/postfix-increment/S11.3.1_A1.1_T3.js": {
            "source": "var x = 1; x\u2028++",
            "type": "both",
            "pass": false
        },
        "test/language/expressions/postfix-increment/S11.3.1_A1.1_T4.js": {
            "source": "var x = 1; x\u2029++",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A2.1_T1.js": {
            "source": "'\u000Astr\u000Aing\u000A'",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A2.2_T1.js": {
            "source": "'\u000Dstr\u000Ding\u000D'",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A2.3.js": {
            "source": "'\u2028str\u2028ing\u2028'",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A2.4.js": {
            "source": "'\u2029str\u2029ing\u2029'",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A3.1_T2.js": {
            "source": "//\u000A single line comment",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A3.2_T2.js": {
            "source": "//\u000D single line comment",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A3.3_T2.js": {
            "source": "//\u2028 single line comment",
            "type": "both",
            "pass": false
        },
        "test/language/line-terminators/S7.3_A3.4_T2.js": {
            "source": "//\u2029 single line comment",
            "type": "both",
            "pass": false
        },
        "test/language/statements/function/S13_A14_T2.js": {
            "source": "function __func\\u0041(__arg){return __arg;}; __funcA",
            "type": "both",
            "pass": true
        },
        "test/language/statements/function/S13_A16_T2.js": {
            "source": "function\nx\n(\n)\n{\n}\n;\n\nx();\n\nfunction                                                    y                                   (                                          )                                              {};\n\ny();\n\nfunction\n\nz\n\n(\n\n)\n\n{\n    \n}\n\n;\n\nz();\n\nfunction\u0009\u2029w(\u000C)\u00A0{\u000D}; w()",
            "type": "both",
            "pass": true
        },
        "test/language/arguments-object/10.5-1-s.js": {
            "source": "(function fun() { arguments = 10 })(30);",
            "type": "onlyStrict",
            "pass": false
        }
    }
};

const {evaled, overrides} = test262Overrides;

export default (opts: any) => {
    const resolve = (dir: any) => path.resolve(opts.test262Dir, dir)
    // The rest are all testing built-ins, not the language (and thus are of
    // limited use for parsers)
    const ignore: any = []
    let globPath: any

    if (opts.all) {
        globPath = "test/**/*.js"
        if (!opts.annexB) ignore.push("test/annexB/**/*.js")
    } else if (opts.annexB) {
        globPath = "test{,/annexB}/language/**/*.js"
        ignore.push("test/annexB/language/eval-code/**/*.js")
    } else {
        globPath = "test/language/**/*.js"
    }

    const matched = glob.sync(resolve(globPath), {
        ignore: ignore.concat(opts.ignore || []).map(resolve),
        nodir: true,
        realpath: true,
    })

    for (const file of matched) {
        if (file.slice(-11) === "_FIXTURE.js") return
        const resolved = resolve(file)
        const relative = path.relative(opts.test262Dir, resolved)
            // Because Windows paths suck.
            .replace(/\\/g, "/")
        let desc = evaled[relative]

        if (desc == null) {
            const source = fs.readFileSync(resolved, "utf-8")
            const start = source.indexOf("/*---") + 5
            const end = source.indexOf("---*/", start)

            if (start < 5 || end < 0) {
                throw new TypeError("Missing YAML data block!")
            }

            const features = Object.create(null)
            const meta = jsYaml.safeLoad(source.slice(start, end), {
                filename: file,
            })
            const pass = overrides[relative] != null ||
                meta.negative == null ||
                meta.negative.phase !== "early" ||
                meta.negative.type !== "SyntaxError"
            let type = "both"

            if (meta.flags != null) {
                if (meta.flags.includes("module")) type = "module"
                else if (meta.flags.includes("onlyStrict")) type = "onlyStrict"
                else if (meta.flags.includes("noStrict")) type = "noStrict"
                else if (meta.flags.includes("raw")) type = "noStrict"
            }

            if (meta.features != null) {
                for (const feature of meta.features) features[feature] = true
            }

            desc = {source, type, features, pass}
        }

        const features = desc.features || Object.create(null)

        if (opts.skip != null) {
            for (const feature of opts.skip) if (features[feature]) return
        }

        const test = (type: any) => opts.test(`${relative} (${type})`, () => {
            if (desc.pass) {
                // Just let the test framework handle the error
                opts.parse(file, desc.source, {features, type})
            } else {
                let result: any

                try {
                    result = opts.parse(file, desc.source, {features, type})
                } catch (e) {
                    return
                }

                throw new AssertionError({
                    message: `(${type}) Expected an error to be thrown, ` +
                        `but returned: ${util.inspect(result).slice(0, 128)}`,
                    actual: result,
                    stackStartFunction: AssertionError,
                })
            }
        })

        switch (desc.type) {
            case "both":
                test("non-strict")
                test("strict")
                break
    
            case "module":
                test("module")
                break
    
            case "onlyStrict":
                test("strict")
                break

            case "noStrict":
                test("non-strict")
                break
            
            default:
                throw new TypeError(`Unexpected type: ${desc.type}`)
            }
    }
}