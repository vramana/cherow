import * as t from 'assert';
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Comments', () => {

  describe('Fail', () => {

    fail(`;-->`, Context.Empty, {
      source: `;-->`,
  });

  fail(`---*/
  -->`, Context.Empty, {
      source: `---*/
      -->`,
  });

  fail(`<!-- test --->`, Context.Module, {
    source: `<!-- test --->`,
});

fail(`;-->`, Context.Empty, {
  source: `;-->`,
});

fail(`<!-`, Context.Empty, {
  source: `<!-`,
});

fail(`/*
*/ the comment should not include these characters, regardless of AnnexB extensions -->`, Context.Empty, {
    source: `/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`,
});

fail(`html comment + jsx`, Context.Empty, {
  source: `</`,
});

fail(`single and multi line comments used together`, Context.Empty, {
  source: `<!-`,
});

fail(`  \t <!-- foo bar\r   `, Context.Strict | Context.Module, {
  source: `  \t <!-- foo bar\r   `,
});

fail( `  \t <!-- foo bar\r <!-- baz \r <!--`, Context.Strict | Context.Module, {
  source:  `  \t <!-- foo bar\r <!-- baz \r <!--`,
});

fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
  source: `/*
      */ the comment should not include these characters, regardless of AnnexB extensions -->`,
});

fail(`arbitrary character sequence before HTMLCloseComment token`, Context.Empty, {
  source: `/*
      */ the comment should not include these characters, regardless of AnnexB extensions -->`,
});

fail('x --> is eol-comment\nvar y = b;\n', Context.Empty, {
  source: 'x --> is eol-comment\nvar y = b;\n',
});

fail('x/* precomment */ --> is eol-comment\nvar y = 37;\n', Context.Empty, {
  source: 'x/* precomment */ --> is eol-comment\nvar y = 37;\n',
});

fail('var x = a; --> is eol-comment\nvar y = b;\n', Context.Empty, {
  source: 'var x = a; --> is eol-comment\nvar y = b;\n',
});

fail(`/*
*/ the comment should not include these characters, regardless of AnnexB extensions -->`, Context.Empty, {
  source: `/*
  */ the comment should not include these characters, regardless of AnnexB extensions -->`,
});

fail(`/*
*/ the comment should not include these characters, regardless of AnnexB extensions -->`, Context.Strict | Context.Module, {
  source: `/*
  */ the comment should not include these characters, regardless of AnnexB extensions -->`,
});

 });

  describe('Pass', () => {

    const programs = [

      // Babylon issue: https://github.com/babel/babel/issues/7802
       `<!-- test --->`,
       '<!-- console.log("foo") -->',
       '//\\u00A0 single line \\u00A0 comment \\u00A0',
       '// foo',
       '0 /*The*/ /*Answer*/',
       '0 /* The * answer */',
       '/*a\r\nb*/ 0',
       '/*a\rb*/ 0',
       '/*a\nb*/ 0',
       '/*a\nc*/ 0',
       'let a = () => /* = */ { return "b" }',
       'let a = () => { /* = */ return "b" }',
       'let a = () /* = */ => { return "b" }',
       '(/* className: string */) => {}',
       '0 // line comment',
       '// Hello, Icefapper!\n0',
       '//',
       '/**/0',
       '0/**/',
       '// Hello, world!\n\n//   Another hello\n0',
       'if (x) { doThat() // Some comment\n }',
       '/* header */ (function(){ var version = 1; }).call(this)',
       'function f() { /* infinite */ while (true) { } /* bar */ var each; }',
       'while (i-->0) {}',
       'var x = 1<!--foo',
       '/* not comment*/; i-->0',
       '// Hello, Icefapper!\n',
       '// line comment\n0',
       '// foo',
       '// /* foo */',
       '\t\t\t\t\t\t\t\t',
       '\t // foo bar${lt}  ',
       `\t // foo bar\n // baz \n //`,
       `\t /* foo * /* bar \u2028 */  `,
       `\t // foo bar\r // baz \r //`,
       `\t /* foo * /* bar \u2029 */  `,
       `\t /* foo bar\r *//* baz*/ \r /**/`,
       `\t <!-- foo bar\t <!-- baz \r <!--`,
       `\t <!-- foo bar\u2029  `,
       `\t /*\t*/ /* optional SingleLineDelimitedCommentSequence */
       \n--> the comment extends to these characters\t `,
   `\t \n   --> the comment extends to these characters\r `,
   '() => /* string */ \'\'',
   '// foo',
   '/**/ // ',
   '// a /* bcd */ ',
   `  \t <!-- foo bar\n\r  `,
   `  \t <!-- foo bar\r\n  `,
   `  \t <!-- foo bar\r\n\t  `,
   `  \t <!-- foo bar\t\r  `,
   `  \t <!-- foo bar\r\t  `,
   `// var /*
   // x
   // =
   // 1*/`,
   `/* var
   //x
   */`,
   `// x = 1;`,
   `//var this.y = 1; `
      ];

      for (const arg of programs) {

          it(`"use strict"; ${arg}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`${arg}`, undefined, Context.OptionsComments);
              });
          });

          it(`function foo() {
              ${arg}
          }`, () => {
              t.doesNotThrow(() => {
                  parseSource(`function foo() {
                      ${arg}
                  }`, undefined, Context.OptionsComments);
              });
          });
      }

  pass('x = -1 <!--x;', Context.Empty, {
    source: `x = -1 <!--x;`,
    expected: {
        "body": [
          {
            "expression": {
              "left": {
                "name": "x",
                "type": "Identifier",
              },
              "operator": "=",
              "right": {
                "argument": {
                  "type": "Literal",
                  "value": 1,
                },
                "operator": "-",
                "prefix": true,
                "type": "UnaryExpression",
              },
              "type": "AssignmentExpression"
            },
            "type": "ExpressionStatement"
         },
        ],
        "sourceType": "script",
        "type": "Program"
      }
});

  pass(`0/*
  */-->`, Context.OptionsLoc, {
      source: `0/*
      */-->`,
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": 0,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 1
                        }
                    }
                },
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 1
                    }
                }
            }
        ],
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 2,
                "column": 11
            }
        }
    }
  });

  pass(`0/*
  */-->the comment extends to these characters`, Context.Empty, {
      source: `0/*
      */-->the comment extends to these characters`,
      expected: {
          "body": [
            {
              "expression": {
                "type": "Literal",
                "value": 0,
              },
              "type": "ExpressionStatement",
            },
         ],
          "sourceType": "script",
          "type": "Program"
        }
  });

  pass('hello // ', Context.Empty, {
      source: `hello //`,
      expected: {
          "body": [{
              "expression": {
                  "name": "hello",
                  "type": "Identifier",
              },
              "type": "ExpressionStatement",
          }, ],
          "sourceType": "script",
          "type": "Program",
      }
  });

  pass('function foo() { /* hello */ }', Context.Empty, {
      source: `0/*\n*/ // fkleuver`,
      expected: {
          "body": [{
              "expression": {
                  "type": "Literal",
                  "value": 0,
              },
              "type": "ExpressionStatement",
          }, ],
          "sourceType": "script",
          "type": "Program"
      }
  });

  // HTML edge case
  pass('0/*\n*/--> fkleuver', Context.Empty, {
      source: `0/*\n*/ // fkleuver`,
      expected: {
          "body": [{
              "expression": {
                  "type": "Literal",
                  "value": 0,
              },
              "type": "ExpressionStatement",
          }, ],
          "sourceType": "script",
          "type": "Program"
      }

  });
});
});
