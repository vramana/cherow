import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser';

describe('Miscellaneous - Annex B', () => {

    describe('Failure', () => {

        const programs = [

            `"use strict"; label: function f(){}`,
            `"use strict"; if (0) function f(){}`,
            `"use strict";  if (0) function f(){} else;`,
            `"use strict"; if (0); else function f(){}`,
            `"use strict"; label foo: function f(){}`,
            `while(true) function a(){}`,
            `with(true) function a(){}`,
            // Esprima issue>  https://github.com/jquery/esprima/issues/1719
            `if (false) L: async function l() {}`
        ];

        for (const arg of programs) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Empty)
                })
            });
        }
    });

    describe('Pass', () => {

        const programs = [

            `/}?/u;`,
            `/{*/u;`,
            `/.{.}/;`,
            `/[\\w-\\s]/;`,
            `/[\\s-\\w]/;`,
            `/(?!.){0,}?/;`,
            `/(?!.){0,}?/u;`,
            `/{/;`,
            `004`,
            `076`,
            `02`,
            `/*
                    */--> foo`,
            `var foo = [23]
                    -->[0];`,
            `var x = 0;
                    x = -1 <!--x;`,
            '-->the comment extends to these characters',
            'try {  throw null; } catch (f) { if (true) function f() { return 123; } else function _f() {} }',
            'switch (0) { default:  let f;  if (true) function f() {  } else ;  }',
            'var init = f;  if (true) function f() {  } else ;',
            'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; }',
            'try {  throw {};  } catch ({ f }) {  if (true) function f() {  } else ;  }',
            'switch (0) { default:  let f; if (true) function f() {  }  }',
            '  try {  throw {};  } catch ({ f }) {  if (true) function f() {  }  }',
            '{  let f = 123;  if (false) ; else function f() {  }  }',
            'switch (0) { default:  let f; switch (1) {  case 1:   function f() {  }  }  }',
            'try {  throw {};  } catch ({ f }) {  switch (1) {  case 1:  function f() {  }  }  }',
            'try { throw null;} catch (f) {switch (1) { default: function f() { return 123; } } }',
            'let f = 123; switch (1) { default: function f() {  } }',
            'var init = f;  switch (1) { default:   function f() {  }  }',
            'var init = f; if (false) function _f() {} else function f() {  }',
            '{  let f = 123; if (false) function _f() {} else function f() {  }  }',
            'function arguments() {}',
            'try {  throw null;  } catch (f) {  {   function f() { return 123; }  }  }',
            'var outer = (function*() { yield* iter; })();',
            // `({  __proto__: null,  other: null,  '__proto__': null });`,
            'o = { __proto__: undefined };',
            'o = { __proto__: 1 };',
            'o = {  __proto__: proto };',
            'o = { __proto__: null };',

            '000',
            '073',
            '004',
            '074',
            '004',
            '004',
            '004',
            '077',
            '00',
            '00',
            '05',
            '078',
            '0708',
            '019',
            '0719',
            '0782',
            '0790',
            '"\\0"', 
            '"\\x05"', 
            '"\\x06"', 
            '"\\18"',
            '"\\00"', 
            '"\\218"', 
            '"\\66"',
            '"\\210"',
            'if (x) function f() { return 23; } else function f() { return 42; }',
            'if (x) function f() {}',
            `var foo = [23]
                    -->[0];`,
            'x = -1 <!--x;',
            'if (true) function f() {  } else function _f() {}',
            'if (true) function f() { return "foo"; } else function _f() {}',
            'for (let f of [0]) {}',
            'for (let f; ; ) {}',
            'for (let f; ; ) {}',
            'for (let f in { key: 0 }) {}',
            `(function(f) {
                        init = f;
                      
                        switch (1) {
                          case 1:
                            function f() {  }
                        }
                      
                        after = f;
                      }(123));`,
            ` try {
                        throw {};
                      } catch ({ f }) {
                    
                      switch (1) {
                        default:
                          function f() {  }
                      }
                    
                      }
                    `,
            `{
                        function f() {
                          return 'first declaration';
                        }
                      }`,
            `{
                        function f() { return 'declaration'; }
                      }`,
            'if (true) function f() {} else function _f() {}',
            'if (false) function _f() {} else function f() { }',
            `for (let f; ; ) {

                        if (false) ; else function f() {  }
                        
                          break;
                        }`,
            `try {
  throw {};
} catch ({ f }) {

switch (1) {
  case 1:
    function f() {  }
}

}`,
            'if (true) function f() {  } else function _f() {}',
            'if (true) function f() {  } else function _f() {}',
            `switch (1) {
                        default:
                          function f() {  }
                      }`,
            `try {
                        throw {};
                      } catch ({ f }) {
                      
                      switch (1) {
                        case 1:
                          function f() {  }
                      }
                      
                      }`,
            `{
                        let f = 123;
                        
                        switch (1) {
                          case 1:
                            function f() {  }
                        }
                        
                        }`,
            `
                        for (let f in { key: 0 }) {
                        
                        switch (1) {
                          case 1:
                            function f() {  }
                        }
                        
                        }`
        ];

        for (const arg of programs) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty)
                })
            });
        }
    });
});