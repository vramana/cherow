import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

// Todo! Add more tests

describe('JSX - Miscellaneous', () => {
    
  describe('Failure', () => {

    const invalidSyntax = [
        `<1/>`,
        `<div>one</div><div>two</div>`,
        '<a foo="bar',
        `<{...b} {...a }>{...b}</{...b}>`,
        '<a:b.c />',
        `</>`, // fragment
        `<div foo="foo" bar={} baz="baz"/>`,
        `<foo.bar></foo.baz>`,
        '<aa><e></e></bbbbbbbb>;',
        '<f><g/></ff>;',
        '<b.b></b>;',
        '<a[foo]></a[foo]>',
        '<div {...props}>stuff</div {...props}>',
        '<div></span>',
        `<a/!`,
        `<a b=: />`,
        `node = <strong></em>`,
        //`<svg:path></svg:circle>`,
        `<xyz. />`,
        `<.abc />`,
        `<:path />`,
        //'<\\u{2F804}></\\u{2F804}>',
        '<foo bar="',
        '<foo bar={} />',
        '<Foo></Bar>',
        '<Foo bar=bar() />',
        //'<a>{"str";}</a>'
        '<div className"app">'
    ];

    for (const arg of invalidSyntax) {

        it(`${arg}`, () => {
            t.throws(() => {
                parse(`${arg}`, undefined, Context.OptionsJSX);
            });
        });
    }
  });

  describe('Pass', () => {

      const validSyntax = [
          '<div />',
          `<svg:path/>`,
          `<svg:path></svg:path>`,
          `<a>{}</a>`,
          `<Test.X></Test.X>`,
          `<span {... style}></span>`,
          `<input disabled />`,
          '<img width={320}/>',
          `<img src='logo.png' />`,
          `<b>{1}</b>`,
           '<div>{a}{b}</div>',
          '<div>/text</div>',
          '<div>{ {a} }</div>',
          '<div>{<div {...test} />}</div>',
          `<title>{ {caption} }</title>`,
          `"use strict"; <async />`,
          `<this />`,
          '<n:a n:v />',
          '<a n:foo="bar"> {value} <b><c /></b></a>',
          '<a b={" "} c=" " d="&amp;" e="&ampr;" />',
          '<a\n/>',
          '<日本語></日本語>',
          '<p>foo <a href="test"> bar</a> baz</p> ;',
          '<div pre="leading" pre2="attribute" {...props}></div>',
          '<div {...props} post="attribute" />',
          '(<div />) < x;',
          '<a.b.c></a.b.c>',
          '<a.b></a.b>',
          `<AbC-def
  test="&#x0026;&#38;">
bar
baz
</AbC-def>`,
          '<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />',
          '<div><br />7x invalid-js-identifier</div>',
          '<div>@test content</div>',
          '<a>{/* this is a comment */}</a>',
          '<a b={x ? <c /> : <d />} />',
          '<AbC-def\n  test="&#x0026;&#38;">\nbar\nbaz\n</AbC-def>',
          '<A aa={aa.bb.cc} bb={bb.cc.dd}><div>{aa.b}</div></A>',
          `<div> prefix {...children} suffix </div>`,
          `<div {...children}></div>`,
          `<div {...a }>{...b}</div>`,
          `var component = <Component {...props} />;`,
          `<a:b><a:b></a:b></a:b>;`,
          `<a:b></a:b>;`,
          '<america state=<usa.california></usa.california> />',
          '<a href="/" />',
          '<a href={link}></a>',
          '<span {... style}></span>',
          '<adele>{/* Hello from this side */}</adele>',
          '<body>{}</body>',
          'var el = ( <span /> )',
          //'<SolarSystem.Earth.America.USA.California.mountain-view />',
          '<a>  <b><c/></b> </a>',
          `<em>
One
Two
Three
</em>`,
          '<title>{$caption}</title>',
          '<earth.america />',
          '<strong></strong>',
          '<b>Hello</b>',
          `<a
/>`,
          '<a>{`${1}`}</a>',
          'function *g() { yield <h1>Hello</h1> }',
          `function*it(){
    yield <a></a>;
}`,
      ];
      for (const arg of validSyntax) {

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parse(`${arg}`, undefined, Context.OptionsJSX);
              });
          });
      }
        // Validating the AST
      pass('<Test.X></Test.X>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '<Test.X></Test.X>',
        expected: {
            type: 'Program',
            start: 0,
            end: 17,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 17,
                expression: {
                  type: 'JSXElement',
                  start: 0,
                  end: 17,
                  openingElement: {
                    type: 'JSXOpeningElement',
                    start: 0,
                    end: 8,
                    attributes: [],
                    name: {
                      type: 'JSXMemberExpression',
                      start: 1,
                      end: 7,
                      object: {
                        type: 'JSXIdentifier',
                        start: 1,
                        end: 5,
                        name: 'Test'
                      },
                      property: {
                        type: 'JSXIdentifier',
                        start: 6,
                        end: 7,
                        name: 'X'
                      }
                    },
                    selfClosing: false
                  },
                  closingElement: {
                    type: 'JSXClosingElement',
                    start: 8,
                    end: 17,
                    name: {
                      type: 'JSXMemberExpression',
                      start: 10,
                      end: 16,
                      object: {
                        type: 'JSXIdentifier',
                        start: 10,
                        end: 14,
                        name: 'Test'
                      },
                      property: {
                        type: 'JSXIdentifier',
                        start: 15,
                        end: 16,
                        name: 'X'
                      }
                    }
                  },
                  children: []
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass('(<div />) < x;', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
        source: '(<div />) < x;',
        expected: {
            type: 'Program',
            start: 0,
            end: 14,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 14,
                expression: {
                  type: 'BinaryExpression',
                  start: 0,
                  end: 13,
                  left: {
                    type: 'JSXElement',
                    start: 1,
                    end: 8,
                    openingElement: {
                      type: 'JSXOpeningElement',
                      start: 1,
                      end: 8,
                      attributes: [],
                      name: {
                        type: 'JSXIdentifier',
                        start: 2,
                        end: 5,
                        name: 'div'
                      },
                      selfClosing: true
                    },
                    closingElement: null,
                    children: []
                  },
                  operator: '<',
                  right: {
                    type: 'Identifier',
                    start: 12,
                    end: 13,
                    name: 'x'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass('<b>Hello</b>', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
            source: '<b>Hello</b>',
            expected: {
                type: 'Program',
                start: 0,
                end: 12,
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 12,
                    expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 12,
                      openingElement: {
                        type: 'JSXOpeningElement',
                        start: 0,
                        end: 3,
                        attributes: [],
                        name: {
                          type: 'JSXIdentifier',
                          start: 1,
                          end: 2,
                          name: 'b'
                        },
                        selfClosing: false
                      },
                      closingElement: {
                        type: 'JSXClosingElement',
                        start: 8,
                        end: 12,
                        name: {
                          type: 'JSXIdentifier',
                          start: 10,
                          end: 11,
                          name: 'b'
                        }
                      },
                      children: [
                        {
                          type: 'JSXText',
                          start: 3,
                          end: 8,
                          value: 'Hello',
                          raw: 'Hello'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
      });

      pass(`<em>
    One
    Two
    Three
    </em>`, Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
          source: `<em>
            One
            Two
            Three
            </em>`,
          expected: {
              body: [
                {
                  end: 72,
                  expression: {
                    children: [
                      {
                        end: 67,
                        raw: '\n            One\n            Two\n            Three\n            ',
                        start: 4,
                       type: 'JSXText',
                        value: '\n            One\n            Two\n            Three\n            ',
                      }
                    ],
                    closingElement: {
                      end: 72,
                      name: {
                        end: 71,
                        name: 'em',
                        start: 69,
                        type: 'JSXIdentifier',
                      },
                      start: 67,
                      type: 'JSXClosingElement',
                    },
                   end: 72,
                    openingElement: {
                      attributes: [],
                     end: 4,
                      name: {
                        end: 3,
                        name: 'em',
                        start: 1,
                        type: 'JSXIdentifier',
                      },
                      selfClosing: false,
                      start: 0,
                      type: 'JSXOpeningElement'
                   },
                    start: 0,
                    type: 'JSXElement'
                  },
                  start: 0,
                  type: 'ExpressionStatement'
                }
              ],
              end: 72,
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
      });

      pass(`<div> prefix {...children} suffix </div>`, Context.OptionsJSX | Context.OptionsRanges, {
          source: `<div> prefix {...children} suffix </div>`,
          expected: {
              body: [{
                  end: 40,
                  expression: {
                      children: [{
                              end: 13,
                              start: 5,
                              type: 'JSXText',
                              value: ' prefix ',
                          },
                          {
                              end: 26,
                              expression: {
                                  end: 25,
                                  name: 'children',
                                  start: 17,
                                  type: 'Identifier',
                              },
                              start: 14,
                              type: 'JSXSpreadChild',
                          },
                          {
                              end: 33,
                              start: 27,
                              type: 'JSXText',
                              value: 'suffix',
                          },
                          {
                              end: 34,
                              start: 33,
                              type: 'JSXText',
                              value: ' ',
                          }
                      ],
                      closingElement: {
                          end: 40,
                          name: {
                              end: 39,
                              name: 'div',
                              start: 36,
                              type: 'JSXIdentifier',
                          },
                          start: 34,
                          type: 'JSXClosingElement',
                      },
                      end: 40,
                      openingElement: {
                          attributes: [],
                          end: 5,
                          name: {
                              end: 4,
                              name: 'div',
                              start: 1,
                              type: 'JSXIdentifier',
                          },
                          selfClosing: false,
                          start: 0,
                          type: 'JSXOpeningElement',
                      },
                      start: 0,
                      type: 'JSXElement',
                  },
                  start: 0,
                  type: 'ExpressionStatement',
              }, ],
              end: 40,
              sourceType: 'script',
              start: 0,
              type: 'Program',
          }
      });

      pass('<america state=<usa.california></usa.california> />', Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
          source: '<america state=<usa.california></usa.california> />',
          expected: {
              type: 'Program',
              start: 0,
              end: 51,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 51,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 51,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 51,
                          attributes: [{
                              type: 'JSXAttribute',
                              start: 9,
                              end: 48,
                              name: {
                                  type: 'JSXIdentifier',
                                  start: 9,
                                  end: 14,
                                  name: 'state'
                              },
                              value: {
                                  type: 'JSXElement',
                                  start: 15,
                                  end: 48,
                                  openingElement: {
                                      type: 'JSXOpeningElement',
                                      start: 15,
                                      end: 31,
                                      attributes: [],
                                      name: {
                                          type: 'JSXMemberExpression',
                                          start: 16,
                                          end: 30,
                                          object: {
                                              type: 'JSXIdentifier',
                                              start: 16,
                                              end: 19,
                                              name: 'usa'
                                          },
                                          property: {
                                              type: 'JSXIdentifier',
                                              start: 20,
                                              end: 30,
                                              name: 'california'
                                          }
                                      },
                                      selfClosing: false
                                  },
                                  closingElement: {
                                      type: 'JSXClosingElement',
                                      start: 31,
                                      end: 48,
                                      name: {
                                          type: 'JSXMemberExpression',
                                          start: 33,
                                          end: 47,
                                          object: {
                                              type: 'JSXIdentifier',
                                              start: 33,
                                              end: 36,
                                              name: 'usa'
                                          },
                                          property: {
                                              type: 'JSXIdentifier',
                                              start: 37,
                                              end: 47,
                                              name: 'california'
                                          }
                                      }
                                  },
                                  children: []
                              }
                          }],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 8,
                              name: 'america'
                          },
                          selfClosing: true
                      },
                      closingElement: null,
                      children: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`<img src='logo.png' />`, Context.OptionsJSX | Context.OptionsRanges | Context.OptionsRaw, {
          source: `<img src='logo.png' />`,
          expected: {
              type: 'Program',
              start: 0,
              end: 22,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 22,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 22,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 22,
                          attributes: [{
                              type: 'JSXAttribute',
                              start: 5,
                              end: 19,
                              name: {
                                  type: 'JSXIdentifier',
                                  start: 5,
                                  end: 8,
                                  name: 'src'
                              },
                              value: {
                                  type: 'Literal',
                                  start: 8,
                                  end: 19,
                                  value: 'logo.png',
                                  raw: '\'logo.png\''
                              }
                          }],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 4,
                              name: 'img'
                          },
                          selfClosing: true
                      },
                      closingElement: null,
                      children: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`<input disabled />`, Context.OptionsJSX | Context.OptionsRanges, {
          source: `<input disabled />`,
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 18,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 18,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 18,
                          attributes: [{
                              type: 'JSXAttribute',
                              start: 7,
                              end: 15,
                              name: {
                                  type: 'JSXIdentifier',
                                  start: 7,
                                  end: 15,
                                  name: 'disabled'
                              },
                              value: null
                          }],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 6,
                              name: 'input'
                          },
                          selfClosing: true
                      },
                      closingElement: null,
                      children: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`<span {... style}></span>`, Context.OptionsJSX | Context.OptionsRanges, {
          source: `<span {... style}></span>`,
          expected: {
              type: 'Program',
              start: 0,
              end: 25,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 25,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 25,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 18,
                          attributes: [{
                              type: 'JSXSpreadAttribute',
                              start: 6,
                              end: 17,
                              argument: {
                                  type: 'Identifier',
                                  start: 11,
                                  end: 16,
                                  name: 'style'
                              }
                          }],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 5,
                              name: 'span'
                          },
                          selfClosing: false
                      },
                      closingElement: {
                          type: 'JSXClosingElement',
                          start: 18,
                          end: 25,
                          name: {
                              type: 'JSXIdentifier',
                              start: 20,
                              end: 24,
                              name: 'span'
                          }
                      },
                      children: []
                  }
              }],
              sourceType: 'script'
          }
      });

      pass('<a>{}</a>', Context.OptionsJSX | Context.OptionsRanges, {
          source: '<a>{}</a>',
          expected: {
              type: 'Program',
              start: 0,
              end: 9,
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 9,
                  expression: {
                      type: 'JSXElement',
                      start: 0,
                      end: 9,
                      openingElement: {
                          type: 'JSXOpeningElement',
                          start: 0,
                          end: 3,
                          attributes: [],
                          name: {
                              type: 'JSXIdentifier',
                              start: 1,
                              end: 2,
                              name: 'a'
                          },
                          selfClosing: false
                      },
                      closingElement: {
                          type: 'JSXClosingElement',
                          start: 5,
                          end: 9,
                          name: {
                              type: 'JSXIdentifier',
                              start: 7,
                              end: 8,
                              name: 'a'
                          }
                      },
                      children: [{
                          type: 'JSXExpressionContainer',
                          start: 3,
                          end: 5,
                          expression: {
                              type: 'JSXEmptyExpression',
                              start: 4,
                              end: 4
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });
  });
    
});
