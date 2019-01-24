import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Miscellaneous - Annex B', () => {
  describe('Failure', () => {
    const invalidSyntax = [
      `"use strict"; label: function f(){}`,
      `"use strict"; if (0) function f(){}`,
      `"use strict";  if (0) function f(){} else;`,
      `"use strict"; if (0); else function f(){}`,
      `"use strict"; label foo: function f(){}`,
      `while(true) function a(){}`,
      `with(true) function a(){}`,
      'for (let a = 0 in {});',
      '"use strict"; for (var a = 0 in {});',
      'for (var {a} = 0 in {});',
      'for (var [a] = 0 in {});',
      'for (const a = 0 in {});',
      // Esprima issue>  https://github.com/jquery/esprima/issues/1719
      `if (false) L: async function l() {}`
    ];

    for (const arg of invalidSyntax) {
      it(`${arg}`, () => {
        t.throws(() => {
          parseSource(`${arg}`, undefined, Context.Empty);
        });
      });
    }
  });

  for (const arg of [
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
                        }`,
    `/*
                          */--> foo`,
    `var foo = [23]
                          -->[0];`,
    `var x = 0;
                          x = -1 <!--x;`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
});
