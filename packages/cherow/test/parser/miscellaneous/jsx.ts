import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous - JSX', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['<a>{}</a>', '<a>{}</a>', Context.OptionsJSX, {
      "body": [
        {
         "expression": {
            "children": [
              {
                "expression": {
                  "type": "JSXEmptyExpression",
                },
                "type": "JSXExpressionContainer",
              },
            ],
            "closingElement": {
              "name": {
                "name": "a",
                "type": "JSXIdentifier",
              },
              "type": "JSXClosingElement",
            },
            "openingElement": {
              "attributes": [],
              "name": {
                "name": "a",
                "type": "JSXIdentifier",
              },
              "selfClosing": false,
              "type": "JSXOpeningElement",
            },
           "type": "JSXElement",
          },
          "type": "ExpressionStatement"
        }
      ],
      "sourceType": "script",
      "type": "Program",
    }],
   ['function a() { return <b.c d="e" />; }', 'function a() { return <b.c d="e" />; }', Context.OptionsJSX, {
      "body": [
        {
          "async": false,
          "body": {
           "body": [
              {
                "argument": {
                  "children": [],
                  "closingElement": null,
                  "openingElement": {
                    "attributes": [
                      {
                        "name": {
                          "name": "d",
                          "type": "JSXIdentifier",
                        },
                        "type": "JSXAttribute",
                        "value": {
                          "raw": null,
                          "type": "Literal",
                          "value": "e",
                        }
                      }
                    ],
                    "name": {
                      "object": {
                        "name": "b",
                        "type": "JSXIdentifier",
                      },
                      "property": {
                        "name": "c",
                        "type": "JSXIdentifier",
                      },
                      "type": "JSXMemberExpression",
                    },
                    "selfClosing": true,
                    "type": "JSXOpeningElement",
                  },
                  "type": "JSXElement",
                },
                "type": "ReturnStatement",
              },
            ],
            "type": "BlockStatement",
          },
          "expression": false,
          "generator": false,
          "id": {
            "name": "a",
            "type": "Identifier",
          },
          "params": [],
         "type": "FunctionDeclaration",
        },
      ],
      "sourceType": "script",
      "type": "Program"
    }],
   ['<a>}</a>', '<a>}</a>', Context.OptionsJSX, {
      "body": [
        {
          "expression": {
            "children": [
              {
                "type": "JSXText",
                "value": "}",
              },
            ],
           "closingElement": {
              "name": {
                "name": "a",
                "type": "JSXIdentifier",
              },
              "type": "JSXClosingElement",
            },
            "openingElement": {
              "attributes": [],
              "name": {
                "name": "a",
                "type": "JSXIdentifier",
              },
              "selfClosing": false,
              "type": "JSXOpeningElement",
            },
            "type": "JSXElement",
          },
          "type": "ExpressionStatement",
        },
      ],
      "sourceType": "script",
      "type": "Program",
    }],
   ['<div />', '<div />', Context.OptionsJSX, {
      "body": [
        {
         "expression": {
            "children": [],
            "closingElement": null,
            "openingElement": {
              "attributes": [],
              "name": {
                "name": "div",
                "type": "JSXIdentifier",
              },
              "selfClosing": true,
              "type": "JSXOpeningElement",
            },
            "type": "JSXElement"
          },
          "type": "ExpressionStatement"
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }],
    // Acorn JSX issue: https://github.com/RReverser/acorn-jsx/issues/82
    ['function* test() { yield <Hey />;    }', 'function* test() { yield <Hey />;    }', Context.OptionsJSX, {
        "body": [
          {
            "async": false,
            "body": {
             "body": [
                {
                  "expression": {
                    "argument": {
                      "children": [],
                     "closingElement": null,
                      "openingElement": {
                        "attributes": [],
                        "name": {
                          "name": "Hey",
                          "type": "JSXIdentifier",
                        },
                        "selfClosing": true,
                      "type": "JSXOpeningElement",
                      },
                      "type": "JSXElement",
                    },
                    "delegate": false,
                    "type": "YieldExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "type": "BlockStatement"
            },
            "expression": false,
            "generator": true,
            "id": {
              "name": "test",
              "type": "Identifier",
            },
            "params": [],
            "type": "FunctionDeclaration",
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['function* test() { yield (<Hey />); }', 'function* test() { yield (<Hey />); }', Context.OptionsJSX, {
        "body": [
          {
            "async": false,
            "body": {
              "body": [
                {
                  "expression": {
                    "argument": {
                      "children": [],
                      "closingElement": null,
                      "openingElement": {
                        "attributes": [],
                        "name": {
                          "name": "Hey",
                          "type": "JSXIdentifier",
                        },
                        "selfClosing": true,
                        "type": "JSXOpeningElement",
                      },
                      "type": "JSXElement",
                    },
                    "delegate": false,
                    "type": "YieldExpression",
                  },
                  "type": "ExpressionStatement",
                }
              ],
              "type": "BlockStatement"
            },
            "expression": false,
            "generator": true,
            "id": {
              "name": "test",
              "type": "Identifier",
            },
            "params": [],
           "type": "FunctionDeclaration",
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<svg:path/>', '<svg:path/>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
             "children": [],
              "closingElement": null,
              "openingElement": {
                "attributes": [],
                "name": {
                  "name": {
                    "name": "path",
                    "type": "JSXIdentifier",
                  },
                  "namespace": {
                    "name": "svg",
                    "type": "JSXIdentifier"
                  },
                  "type": "JSXNamespacedName"
                },
                "selfClosing": true,
                "type": "JSXOpeningElement"
              },
              "type": "JSXElement"
            },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['svg:path></svg:path>', '<svg:path></svg:path>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingElement": {
                "name": {
                  "name": {
                    "name": "path",
                    "type": "JSXIdentifier",
                  },
                  "namespace": {
                    "name": "svg",
                    "type": "JSXIdentifier"
                  },
                  "type": "JSXNamespacedName"
                },
                "type": "JSXClosingElement"
              },
             "openingElement": {
                "attributes": [],
                "name": {
                  "name": {
                    "name": "path",
                    "type": "JSXIdentifier"
                  },
                  "namespace": {
                    "name": "svg",
                    "type": "JSXIdentifier",
                  },
                  "type": "JSXNamespacedName",
                },
                "selfClosing": false,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement",
            },
            "type": "ExpressionStatement",
          }
       ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<MyButton color="blue" shadowSize={2}> Click Me </MyButton>', '<MyButton color="blue" shadowSize={2}> Click Me </MyButton>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
               {
                  "type": "JSXText",
                  "value": " Click Me ",
                },
              ],
              "closingElement": {
                "name": {
                  "name": "MyButton",
                  "type": "JSXIdentifier",
                },
                "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [
                  {
                    "name": {
                      "name": "color",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXAttribute",
                    "value": {
                      "raw": null,
                      "type": "Literal",
                      "value": "blue",
                    },
                  },
                  {
                    "name": {
                      "name": "shadowSize",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXAttribute",
                    "value": {
                      "expression": {
                        "raw": null,
                        "type": "Literal",
                        "value": 2,
                      },
                      "type": "JSXExpressionContainer"
                    }
                  }
                ],
                "name": {
                  "name": "MyButton",
                  "type": "JSXIdentifier",
                },
                "selfClosing": false,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement",
            },
            "type": "ExpressionStatement",
          }
        ],
        "sourceType": "script",
        "type": "Program",
      }],
    ['var element = <Hello name={name}/>;', 'var element = <Hello name={name}/>;', Context.OptionsJSX, {
        "body": [
          {
            "declarations": [
              {
                "id": {
                  "name": "element",
                  "type": "Identifier",
                },
                "init": {
                 "children": [],
                  "closingElement": null,
                  "openingElement": {
                    "attributes": [
                      {
                        "name": {
                          "name": "name",
                          "type": "JSXIdentifier",
                        },
                        "type": "JSXAttribute",
                        "value": {
                          "expression": {
                            "name": "name",
                            "type": "Identifier",
                          },
                          "type": "JSXExpressionContainer",
                        },
                      },
                    ],
                    "name": {
                      "name": "Hello",
                      "type": "JSXIdentifier",
                  },
                    "selfClosing": true,
                    "type": "JSXOpeningElement",
                  },
                 "type": "JSXElement"
                },
               "type": "VariableDeclarator"
              }
            ],
            "kind": "var",
            "type": "VariableDeclaration"
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<div>{...children}</div>', '<div>{...children}</div>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
                {
                  "expression": {
                    "name": "children",
                    "type": "Identifier",
                  },
                  "type": "JSXSpreadChild",
                },
              ],
              "closingElement": {
                "name": {
                  "name": "div",
                  "type": "JSXIdentifier",
                },
                "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [],
                "name": {
                  "name": "div",
                  "type": "JSXIdentifier",
                },
                "selfClosing": false,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement",
            },
            "type": "ExpressionStatement",
          },
        ],
        "sourceType": "script",
        "type": "Program",
      }],
    ['<div {...c}> {...children}{a}{...b}</div>', '<div {...c}> {...children}{a}{...b}</div>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
                {
                  "type": "JSXText",
                  "value": " ",
                },
                {
                  "expression": {
                    "name": "children",
                    "type": "Identifier",
                  },
                  "type": "JSXSpreadChild",
                },
                {
                  "expression": {
                    "name": "a",
                    "type": "Identifier",
                  },
                  "type": "JSXExpressionContainer",
                },
                {
                  "expression": {
                    "name": "b",
                    "type": "Identifier",
                  },
                  "type": "JSXSpreadChild",
                },
              ],
              "closingElement": {
                "name": {
                  "name": "div",
                  "type": "JSXIdentifier",
                },
                "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [
                  {
                    "argument": {
                      "name": "c",
                      "type": "Identifier"
                    },
                    "type": "JSXSpreadAttribute",
                  },
               ],
                "name": {
                  "name": "div",
                  "type": "JSXIdentifier",
                },
                "selfClosing": false,
                "type": "JSXOpeningElement"
              },
              "type": "JSXElement"
            },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['const El = (props) => ( <div>props.x</div>);', 'const El = (props) => ( <div>props.x</div>);', Context.OptionsJSX, {
        "body": [
         {
            "declarations": [
              {
                "id": {
                  "name": "El",
                  "type": "Identifier",
                },
                "init": {
                  "async": false,
                  "body": {
                    "children": [
                      {
                        "type": "JSXText",
                        "value": "props.x",
                     },
                    ],
                    "closingElement": {
                     "name": {
                        "name": "div",
                       "type": "JSXIdentifier",
                      },
                     "type": "JSXClosingElement",
                    },
                    "openingElement": {
                      "attributes": [],
                      "name": {
                        "name": "div",
                        "type": "JSXIdentifier",
                      },
                     "selfClosing": false,
                      "type": "JSXOpeningElement"
                    },
                    "type": "JSXElement",
                  },
                  "expression": true,
                  "generator": false,
                  "id": null,
                  "params": [
                    {
                      "name": "props",
                      "type": "Identifier"
                    },
                  ],
                  "type": "ArrowFunctionExpression",
                },
                "type": "VariableDeclarator",
              },
            ],
            "kind": "const",
            "type": "VariableDeclaration"
         }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<Component {...props} y={1} />', '<Component {...props} y={1} />', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingElement": null,
              "openingElement": {
                "attributes": [
                  {
                    "argument": {
                      "name": "props",
                      "type": "Identifier"
                    },
                    "type": "JSXSpreadAttribute",
                  },
                  {
                    "name": {
                      "name": "y",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXAttribute",
                    "value": {
                      "expression": {
                        "raw": null,
                        "type": "Literal",
                        "value": 1,
                      },
                      "type": "JSXExpressionContainer"
                    }
                  }
                ],
               "name": {
                  "name": "Component",
                  "type": "JSXIdentifier",
                },
                "selfClosing": true,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement"
            },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program",
      }],
    ['n:a n:v />', '<n:a n:v />', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingElement": null,
              "openingElement": {
                "attributes": [
                  {
                    "name": {
                      "name": {
                        "name": "v",
                        "type": "JSXIdentifier"
                      },
                      "namespace": {
                        "name": "n",
                        "type": "JSXIdentifier",
                      },
                      "type": "JSXNamespacedName",
                    },
                    "type": "JSXAttribute",
                    "value": null
                  },
                ],
               "name": {
                  "name": {
                    "name": "a",
                    "type": "JSXIdentifier",
                  },
                  "namespace": {
                    "name": "n",
                    "type": "JSXIdentifier",
                  },
                 "type": "JSXNamespacedName",
                },
                "selfClosing": true,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement",
            },
            "type": "ExpressionStatement",
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }],
       ['<a\n/>', '<a\n/>', Context.OptionsJSX, {
          "body": [
            {
              "expression": {
                "children": [],
                "closingElement": null,
                "openingElement": {
                  "attributes": [],
                  "name": {
                    "name": "a",
                    "type": "JSXIdentifier",
                  },
                  "selfClosing": true,
                  "type": "JSXOpeningElement",
                },
                "type": "JSXElement",
              },
              "type": "ExpressionStatement"
            }
          ],
          "sourceType": "script",
          "type": "Program"
        }],
    ['<a b={x ? <c /> : <d />} />', '<a b={x ? <c /> : <d />} />', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingElement": null,
              "openingElement": {
                "attributes": [
                  {
                    "name": {
                      "name": "b",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXAttribute",
                    "value": {
                      "expression": {
                        "alternate": {
                          "children": [],
                          "closingElement": null,
                          "openingElement": {
                            "attributes": [],
                            "name": {
                              "name": "d",
                              "type": "JSXIdentifier",
                           },
                            "selfClosing": true,
                            "type": "JSXOpeningElement",
                          },
                          "type": "JSXElement",
                        },
                        "consequent": {
                          "children": [],
                          "closingElement": null,
                          "openingElement": {
                            "attributes": [],
                            "name": {
                              "name": "c",
                             "type": "JSXIdentifier",
                            },
                            "selfClosing": true,
                           "type": "JSXOpeningElement",
                          },
                          "type": "JSXElement",
                        },
                        "test": {
                          "name": "x",
                         "type": "Identifier"
                        },
                       "type": "ConditionalExpression"
                      },
                      "type": "JSXExpressionContainer"
                    }
                  }
                ],
                "name": {
                 "name": "a",
                  "type": "JSXIdentifier"
                },
                "selfClosing": true,
                "type": "JSXOpeningElement"
              },
              "type": "JSXElement"
           },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<a>{\r\n}</a>', '<a>{\r\n}</a>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
                {
                  "expression": {
                    "type": "JSXEmptyExpression"
                  },
                  "type": "JSXExpressionContainer"
                }
             ],
              "closingElement": {
                "name": {
                  "name": "a",
                  "type": "JSXIdentifier",
                },
               "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [],
                "name": {
                 "name": "a",
                  "type": "JSXIdentifier"
                },
                "selfClosing": false,
                "type": "JSXOpeningElement"
              },
              "type": "JSXElement"
            },
            "type": "ExpressionStatement"
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['a.b></a.b>', '<a.b></a.b>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingElement": {
                "name": {
                  "object": {
                    "name": "a",
                    "type": "JSXIdentifier"
                  },
                  "property": {
                    "name": "b",
                    "type": "JSXIdentifier",
                  },
                  "type": "JSXMemberExpression"
                },
                "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [],
                "name": {
                  "object": {
                    "name": "a",
                    "type": "JSXIdentifier",
                  },
                  "property": {
                    "name": "b",
                    "type": "JSXIdentifier"
                  },
                  "type": "JSXMemberExpression"
                },
                "selfClosing": false,
                "type": "JSXOpeningElement"
              },
              "type": "JSXElement"
            },
            "type": "ExpressionStatement"
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['(<div />) < x;', '(<div />) < x;', Context.OptionsJSX, {
       "body": [
          {
            "expression": {
              "left": {
                "children": [],
                "closingElement": null,
                "openingElement": {
                  "attributes": [],
                  "name": {
                    "name": "div",
                    "type": "JSXIdentifier",
                  },
                  "selfClosing": true,
                  "type": "JSXOpeningElement",
                },
                "type": "JSXElement",
              },
              "operator": "<",
              "right": {
                "name": "x",
                "type": "Identifier"
              },
              "type": "BinaryExpression"
            },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<a>= == =</a>', '<a>= == =</a>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
                {
                  "type": "JSXText",
                  "value": "= == =",
                },
             ],
              "closingElement": {
                "name": {
                  "name": "a",
                  "type": "JSXIdentifier",
                },
                "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [],
                "name": {
                  "name": "a",
                  "type": "JSXIdentifier",
                },
                "selfClosing": false,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement",
            },
            "type": "ExpressionStatement",
         },
        ],
        "sourceType": "script",
        "type": "Program",
      }],
    ['"use strict"; <async />', '"use strict"; <async />', Context.OptionsJSX, {
        "body": [
         {
            "directive": "use strict",
            "expression": {
              "raw": null,
              "type": "Literal",
              "value": "use strict",
            },
            "type": "ExpressionStatement"
          },
          {
            "expression": {
              "children": [],
              "closingElement": null,
              "openingElement": {
                "attributes": [],
                "name": {
                  "name": "async",
                  "type": "JSXIdentifier"
                },
                "selfClosing": true,
                "type": "JSXOpeningElement"
              },
              "type": "JSXElement"
            },
            "type": "ExpressionStatement"
          },
       ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<img width={320}/>', '<img width={320}/>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingElement": null,
              "openingElement": {
                "attributes": [
                  {
                    "name": {
                      "name": "width",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXAttribute",
                    "value": {
                      "expression": {
                        "raw": null,
                        "type": "Literal",
                        "value": 320,
                      },
                      "type": "JSXExpressionContainer"
                    }
                  }
                ],
                "name": {
                  "name": "img",
                  "type": "JSXIdentifier",
                },
                "selfClosing": true,
                "type": "JSXOpeningElement",
              },
             "type": "JSXElement",
            },
            "type": "ExpressionStatement",
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<LeftRight left=<a /> right=<b>monkeys</b> />', '<LeftRight left=<a /> right=<b>monkeys</b> />', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingElement": null,
              "openingElement": {
                "attributes": [
                  {
                    "name": {
                      "name": "left",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXAttribute",
                    "value": {
                      "children": [],
                      "closingElement": null,
                      "openingElement": {
                        "attributes": [],
                        "name": {
                          "name": "a",
                          "type": "JSXIdentifier",
                        },
                       "selfClosing": true,
                        "type": "JSXOpeningElement",
                      },
                      "type": "JSXElement"
                    }
                  },
                  {
                    "name": {
                      "name": "right",
                      "type": "JSXIdentifier",
                   },
                    "type": "JSXAttribute",
                    "value": {
                      "children": [
                        {
                          "type": "JSXText",
                          "value": "monkeys",
                        },
                      ],
                     "closingElement": {
                        "name": {
                          "name": "b",
                          "type": "JSXIdentifier",
                        },
                        "type": "JSXClosingElement",
                      },
                      "openingElement": {
                        "attributes": [],
                        "name": {
                          "name": "b",
                          "type": "JSXIdentifier",
                        },
                        "selfClosing": false,
                        "type": "JSXOpeningElement",
                      },
                      "type": "JSXElement",
                    }
                  }
                ],
                "name": {
                  "name": "LeftRight",
                  "type": "JSXIdentifier",
                },
                "selfClosing": true,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement",
            },
            "type": "ExpressionStatement",
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<b>Hello</b>', '<b>Hello</b>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
                {
                  "type": "JSXText",
                  "value": "Hello",
                },
              ],
              "closingElement": {
                "name": {
                  "name": "b",
                  "type": "JSXIdentifier",
                },
                "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [],
                "name": {
                  "name": "b",
                  "type": "JSXIdentifier",
                },
                "selfClosing": false,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement"
            },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program",
      }],
    ['<div> prefix {...children} suffix </div>', '<div> prefix {...children} suffix </div>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
                {
                  "type": "JSXText",
                  "value": " prefix "
                },
                {
                  "expression": {
                    "name": "children",
                    "type": "Identifier"
                  },
                  "type": "JSXSpreadChild"
                },
                {
                  "type": "JSXText",
                  "value": "suffix"
                },
                {
                  "type": "JSXText",
                  "value": " "
                },
              ],
              "closingElement": {
                "name": {
                  "name": "div",
                 "type": "JSXIdentifier",
                },
                "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [],
                "name": {
                  "name": "div",
                  "type": "JSXIdentifier",
                },
                "selfClosing": false,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement"
            },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<america state=<usa.california></usa.california> />', '<america state=<usa.california></usa.california> />', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingElement": null,
              "openingElement": {
                "attributes": [
                  {
                    "name": {
                      "name": "state",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXAttribute",
                    "value": {
                      "children": [],
                      "closingElement": {
                        "name": {
                          "object": {
                            "name": "usa",
                            "type": "JSXIdentifier"
                          },
                          "property": {
                            "name": "california",
                            "type": "JSXIdentifier",
                          },
                          "type": "JSXMemberExpression",
                        },
                        "type": "JSXClosingElement",
                      },
                      "openingElement": {
                        "attributes": [],
                        "name": {
                          "object": {
                            "name": "usa",
                            "type": "JSXIdentifier",
                          },
                          "property": {
                            "name": "california",
                            "type": "JSXIdentifier",
                          },
                          "type": "JSXMemberExpression",
                        },
                        "selfClosing": false,
                        "type": "JSXOpeningElement",
                      },
                     "type": "JSXElement"
                    }
                  }
                ],
                "name": {
                  "name": "america",
                  "type": "JSXIdentifier",
                },
                "selfClosing": true,
                "type": "JSXOpeningElement",
              },
              "type": "JSXElement",
            },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['<></>', '<></>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingFragment": {
                "type": "JSXClosingFragment"
              },
              "openingElement": {
                "type": "JSXOpeningFragment"
              },
             "type": "JSXFragment"
            },
            "type": "ExpressionStatement"
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    ['< /*starting wrap*/ ></ /*ending wrap*/>;', '< /*starting wrap*/ ></ /*ending wrap*/>;', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [],
              "closingFragment": {
                "type": "JSXClosingFragment"
              },
              "openingElement": {
                "type": "JSXOpeningFragment",
              },
              "type": "JSXFragment",
            },
            "type": "ExpressionStatement",
          },
        ],
        "sourceType": "script",
        "type": "Program",
      }],
    ['<>hi</>', '<>hi</>', Context.OptionsJSX, {
        "body": [
         {
            "expression": {
              "children": [
                {
                  "type": "JSXText",
                  "value": "hi",
                },
              ],
              "closingFragment": {
                "type": "JSXClosingFragment",
              },
              "openingElement": {
                "type": "JSXOpeningFragment",
              },
              "type": "JSXFragment",
            },
           "type": "ExpressionStatement"
          },
        ],
        "sourceType": "script",
        "type": "Program",
      }],
    [`<
    // SingleLine
    /* MultiLine */
    >
     <div></div>
      <div></div>
    </>`, `<
    // SingleLine
    /* MultiLine */
    >
     <div></div>
      <div></div>
    </>`, Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
                {
                  "type": "JSXText",
                  "value": "\n     ",
                },
                {
                  "children": [],
                  "closingElement": {
                    "name": {
                     "name": "div",
                      "type": "JSXIdentifier"
                    },
                    "type": "JSXClosingElement",
                  },
                  "openingElement": {
                    "attributes": [],
                    "name": {
                      "name": "div",
                      "type": "JSXIdentifier",
                    },
                    "selfClosing": false,
                    "type": "JSXOpeningElement",
                  },
                  "type": "JSXElement",
                },
                {
                  "type": "JSXText",
                  "value": "\n      "
                },
                {
                  "children": [],
                  "closingElement": {
                    "name": {
                      "name": "div",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXClosingElement",
                  },
                  "openingElement": {
                    "attributes": [],
                    "name": {
                      "name": "div",
                      "type": "JSXIdentifier",
                    },
                    "selfClosing": false,
                    "type": "JSXOpeningElement",
                  },
                  "type": "JSXElement",
                },
                {
                  "type": "JSXText",
                  "value": "\n    ",
                },
              ],
              "closingFragment": {
                "type": "JSXClosingFragment",
              },
              "openingElement": {
                "type": "JSXOpeningFragment",
              },
              "type": "JSXFragment"
           },
            "type": "ExpressionStatement"
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }],
    [`<>
    <>
      <>
       Ghost!
      </>
    </>
  </>`, `<>
  <>
    <>
     Ghost!
    </>
  </>
</>`, Context.OptionsJSX, {
    "body": [
      {
        "expression": {
          "children": [
            {
              "type": "JSXText",
              "value": "\n  "
            },
            {
              "children": [
                {
                  "type": "JSXText",
                  "value": "\n    ",
                },
                {
                  "children": [
                    {
                      "type": "JSXText",
                      "value": "\n     Ghost!\n    ",
                    },
                  ],
                  "closingFragment": {
                    "type": "JSXClosingFragment",
                  },
                  "openingElement": {
                    "type": "JSXOpeningFragment",
                  },
                  "type": "JSXFragment",
                },
              ],
              "closingFragment": {
               "type": "JSXClosingFragment",
              },
              "openingElement": {
                "type": "JSXOpeningFragment",
              },
              "type": "JSXFragment",
            },
          ],
          "closingFragment": {
            "type": "JSXClosingFragment",
          },
          "openingElement": {
            "type": "JSXOpeningFragment",
          },
          "type": "JSXFragment",
        },
        "type": "ExpressionStatement",
      },
   ],
    "sourceType": "script",
    "type": "Program",
  }],
    [`<dl>
    {props.items.map(item => (
      <React.Fragment key={item.id}>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </React.Fragment>
    ))}
  </dl>`, `<dl>
  {props.items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ))}
</dl>`, Context.OptionsJSX, {
    "body": [
      {
        "expression": {
         "children": [
            {
             "type": "JSXText",
              "value": "\n  ",
            },
           {
              "expression": {
                "arguments": [
                  {
                    "async": false,
                    "body": {
                      "children": [
                        {
                          "type": "JSXText",
                          "value": "\n      ",
                        },
                        {
                          "children": [
                            {
                              "expression": {
                                "computed": false,
                                "object": {
                                  "name": "item",
                                  "type": "Identifier",
                                },
                                "property": {
                                  "name": "term",
                                  "type": "Identifier",
                                },
                                "type": "MemberExpression",
                              },
                              "type": "JSXExpressionContainer"
                            }
                          ],
                          "closingElement": {
                            "name": {
                              "name": "dt",
                             "type": "JSXIdentifier",
                            },
                            "type": "JSXClosingElement",
                          },
                          "openingElement": {
                            "attributes": [],
                            "name": {
                              "name": "dt",
                              "type": "JSXIdentifier",
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement",
                          },
                          "type": "JSXElement",
                        },
                        {
                          "type": "JSXText",
                          "value": "\n      "
                        },
                        {
                          "children": [
                            {
                              "expression": {
                                "computed": false,
                                "object": {
                                  "name": "item",
                                  "type": "Identifier",
                                },
                                "property": {
                                  "name": "description",
                                  "type": "Identifier",
                                },
                                "type": "MemberExpression",
                              },
                              "type": "JSXExpressionContainer",
                            },
                          ],
                          "closingElement": {
                            "name": {
                              "name": "dd",
                              "type": "JSXIdentifier"
                            },
                            "type": "JSXClosingElement"
                          },
                          "openingElement": {
                            "attributes": [],
                            "name": {
                              "name": "dd",
                              "type": "JSXIdentifier",
                            },
                            "selfClosing": false,
                            "type": "JSXOpeningElement",
                          },
                          "type": "JSXElement",
                        },
                        {
                          "type": "JSXText",
                          "value": "\n    ",
                        },
                      ],
                      "closingElement": {
                        "name": {
                          "object": {
                            "name": "React",
                            "type": "JSXIdentifier",
                          },
                          "property": {
                            "name": "Fragment",
                            "type": "JSXIdentifier",
                          },
                          "type": "JSXMemberExpression",
                        },
                        "type": "JSXClosingElement"
                      },
                      "openingElement": {
                        "attributes": [
                          {
                            "name": {
                              "name": "key",
                              "type": "JSXIdentifier",
                            },
                            "type": "JSXAttribute",
                            "value": {
                              "expression": {
                                "computed": false,
                                "object": {
                                  "name": "item",
                                  "type": "Identifier",
                                },
                                "property": {
                                  "name": "id",
                                  "type": "Identifier",
                                },
                                "type": "MemberExpression",
                              },
                              "type": "JSXExpressionContainer"
                            }
                          }
                        ],
                        "name": {
                          "object": {
                            "name": "React",
                            "type": "JSXIdentifier",
                          },
                          "property": {
                            "name": "Fragment",
                            "type": "JSXIdentifier",
                          },
                          "type": "JSXMemberExpression",
                        },
                        "selfClosing": false,
                        "type": "JSXOpeningElement",
                      },
                      "type": "JSXElement",
                    },
                    "expression": true,
                    "generator": false,
                    "id": null,
                    "params": [
                      {
                        "name": "item",
                        "type": "Identifier",
                      },
                    ],
                    "type": "ArrowFunctionExpression",
                  }
                ],
                "callee": {
                  "computed": false,
                  "object": {
                    "computed": false,
                    "object": {
                      "name": "props",
                      "type": "Identifier"
                    },
                    "property": {
                      "name": "items",
                      "type": "Identifier",
                    },
                    "type": "MemberExpression",
                  },
                  "property": {
                    "name": "map",
                    "type": "Identifier",
                  },
                  "type": "MemberExpression",
                },
                "type": "CallExpression"
              },
             "type": "JSXExpressionContainer"
            },
            {
              "type": "JSXText",
              "value": "\n",
            }
          ],
          "closingElement": {
            "name": {
              "name": "dl",
              "type": "JSXIdentifier",
            },
            "type": "JSXClosingElement",
          },
          "openingElement": {
            "attributes": [],
            "name": {
              "name": "dl",
              "type": "JSXIdentifier",
            },
            "selfClosing": false,
            "type": "JSXOpeningElement",
          },
          "type": "JSXElement",
        },
        "type": "ExpressionStatement",
      },
   ],
    "sourceType": "script",
    "type": "Program"
  }],
  ['<div><li>Item 1</li><li>Item 1</li></div>', '<div><li>Item 1</li><li>Item 1</li></div>', Context.OptionsJSX, {
      "body": [
        {
          "expression": {
            "children": [
              {
                "children": [
                 {
                    "type": "JSXText",
                    "value": "Item 1",
                  }
                ],
               "closingElement": {
                  "name": {
                    "name": "li",
                   "type": "JSXIdentifier",
                  },
                  "type": "JSXClosingElement",
                },
                "openingElement": {
                  "attributes": [],
                  "name": {
                    "name": "li",
                    "type": "JSXIdentifier",
                  },
                  "selfClosing": false,
                 "type": "JSXOpeningElement",
                },
                "type": "JSXElement",
              },
             {
                "children": [
                  {
                    "type": "JSXText",
                    "value": "Item 1",
                  },
                ],
                "closingElement": {
                  "name": {
                    "name": "li",
                   "type": "JSXIdentifier",
                  },
                  "type": "JSXClosingElement",
                },
                "openingElement": {
                  "attributes": [],
                  "name": {
                    "name": "li",
                    "type": "JSXIdentifier",
                 },
                  "selfClosing": false,
                  "type": "JSXOpeningElement",
                },
                "type": "JSXElement",
              },
           ],
            "closingElement": {
              "name": {
                "name": "div",
               "type": "JSXIdentifier"
              },
              "type": "JSXClosingElement"
            },
           "openingElement": {
              "attributes": [],
              "name": {
                "name": "div",
                "type": "JSXIdentifier",
              },
              "selfClosing": false,
              "type": "JSXOpeningElement",
            },
            "type": "JSXElement"
          },
          "type": "ExpressionStatement"
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }],
    ['<a>></a>;', '<a>></a>', Context.OptionsJSX, {
        "body": [
          {
            "expression": {
              "children": [
                {
                  "type": "JSXText",
                  "value": ">",
               },
              ],
              "closingElement": {
               "name": {
                  "name": "a",
                  "type": "JSXIdentifier",
               },
                "type": "JSXClosingElement",
              },
              "openingElement": {
                "attributes": [],
                "name": {
                  "name": "a",
                  "type": "JSXIdentifier",
                },
                "selfClosing": false,
                "type": "JSXOpeningElement",
             },
              "type": "JSXElement",
           },
            "type": "ExpressionStatement",
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }],
  ['<a> ></a>', '<a> ></a>', Context.OptionsJSX,
  {
    "body": [
      {
        "expression": {
          "children": [
            {
              "type": "JSXText",
              "value": " >"
            }
          ],
          "closingElement": {
            "name": {
              "name": "a",
              "type": "JSXIdentifier",
            },
            "type": "JSXClosingElement",
          },
          "openingElement": {
            "attributes": [],
            "name": {
              "name": "a",
              "type": "JSXIdentifier",
           },
            "selfClosing": false,
            "type": "JSXOpeningElement",
          },
          "type": "JSXElement",
        },
        "type": "ExpressionStatement",
      },
    ],
    "sourceType": "script",
    "type": "Program"
  }],
  ['<b>{1}</b>', '<b>{1}</b>', Context.OptionsJSX,
  {
    "body": [
      {
        "expression": {
          "children": [
            {
             "expression": {
                "raw": null,
                "type": "Literal",
                "value": 1,
              },
              "type": "JSXExpressionContainer",
            },
          ],
          "closingElement": {
            "name": {
              "name": "b",
              "type": "JSXIdentifier",
            },
            "type": "JSXClosingElement",
          },
          "openingElement": {
            "attributes": [],
            "name": {
              "name": "b",
              "type": "JSXIdentifier",
            },
            "selfClosing": false,
            "type": "JSXOpeningElement",
          },
          "type": "JSXElement"
        },
        "type": "ExpressionStatement"
      }
    ],
    "sourceType": "script",
    "type": "Program"
  }],
   ['<a>{`${1}`}</a>', '<a>{`${1}`}</a>', Context.OptionsJSX,
   {
     "body": [
       {
         "expression": {
           "children": [
             {
               "expression": {
                 "expressions": [
                   {
                     "raw": "",
                     "type": "Literal",
                     "value": 1,
                   }
                 ],
                 "quasis": [
                   {
                     "tail": false,
                     "type": "TemplateElement",
                    "value": {
                       "cooked": "",
                       "raw": "",
                     },
                   },
                   {
                     "tail": true,
                     "type": "TemplateElement",
                     "value": {
                       "cooked": "",
                       "raw": "",
                     }
                  }
                 ],
                 "type": "TemplateLiteral",
               },
               "type": "JSXExpressionContainer",
             },
           ],
           "closingElement": {
             "name": {
               "name": "a",
               "type": "JSXIdentifier",
             },
             "type": "JSXClosingElement",
           },
           "openingElement": {
             "attributes": [],
             "name": {
               "name": "a",
               "type": "JSXIdentifier",
             },
             "selfClosing": false,
             "type": "JSXOpeningElement",
           },
           "type": "JSXElement",
         },
         "type": "ExpressionStatement",
       },
     ],
     "sourceType": "script",
     "type": "Program"
   }],
   ['<span {... style}></span>', '<span {... style}></span>', Context.OptionsJSX, {
      "body": [
        {
          "expression": {
            "children": [],
            "closingElement": {
              "name": {
                "name": "span",
                "type": "JSXIdentifier",
              },
              "type": "JSXClosingElement",
            },
            "openingElement": {
              "attributes": [
                {
                  "argument": {
                    "name": "style",
                    "type": "Identifier",
                  },
                  "type": "JSXSpreadAttribute"
               },
              ],
              "name": {
                "name": "span",
                "type": "JSXIdentifier",
              },
              "selfClosing": false,
              "type": "JSXOpeningElement",
            },
            "type": "JSXElement",
          },
          "type": "ExpressionStatement",
        },
      ],
      "sourceType": "script",
      "type": "Program"
    }],
   ['<img alt="Tom &amp; Jerry" />', '<img alt="Tom &amp; Jerry" />', Context.OptionsJSX, {
      "body": [
        {
          "expression": {
            "children": [],
            "closingElement": null,
            "openingElement": {
              "attributes": [
                {
                 "name": {
                    "name": "alt",
                    "type": "JSXIdentifier",
                  },
                  "type": "JSXAttribute",
                  "value": {
                    "raw": null,
                    "type": "Literal",
                    "value": "Tom &amp; Jerry",
                  },
                },
              ],
              "name": {
                "name": "img",
                "type": "JSXIdentifier",
              },
              "selfClosing": true,
              "type": "JSXOpeningElement",
            },
            "type": "JSXElement",
          },
          "type": "ExpressionStatement",
       },
      ],
      "sourceType": "script",
      "type": "Program"
    }],
   ['<span>{x}{y}{z}</span>', '<span>{x}{y}{z}</span>', Context.OptionsJSX, {
     "body": [
       {
         "expression": {
           "children": [
            {
               "expression": {
                 "name": "x",
                 "type": "Identifier"
               },
               "type": "JSXExpressionContainer"
             },
             {
               "expression": {
                 "name": "y",
                "type": "Identifier"
               },
               "type": "JSXExpressionContainer"
             },
             {
               "expression": {
                 "name": "z",
                 "type": "Identifier"
               },
               "type": "JSXExpressionContainer"
             },
           ],
           "closingElement": {
             "name": {
               "name": "span",
               "type": "JSXIdentifier",
             },
             "type": "JSXClosingElement",
           },
           "openingElement": {
             "attributes": [],
             "name": {
               "name": "span",
               "type": "JSXIdentifier",
             },
             "selfClosing": false,
             "type": "JSXOpeningElement",
           },
           "type": "JSXElement"
         },
         "type": "ExpressionStatement"
       },
     ],
     "sourceType": "script",
     "type": "Program"
   }],
   ['<ariya>{/* Hello from this side */}</ariya>', '<ariya>{/* Hello from this side */}</ariya>', Context.OptionsJSX,
   {
     "body": [
       {
         "expression": {
           "children": [
             {
               "expression": {
                 "type": "JSXEmptyExpression",
               },
               "type": "JSXExpressionContainer"
             }
           ],
           "closingElement": {
             "name": {
               "name": "ariya",
               "type": "JSXIdentifier",
             },
             "type": "JSXClosingElement",
          },
           "openingElement": {
             "attributes": [],
             "name": {
               "name": "ariya",
               "type": "JSXIdentifier",
             },
             "selfClosing": false,
             "type": "JSXOpeningElement",
           },
           "type": "JSXElement",
         },
         "type": "ExpressionStatement",
      },
     ],
     "sourceType": "script",
     "type": "Program"
   }],
   ['<strong><em><a href="{link}"><test/></a></em></strong>', '<strong><em><a href="{link}"><test/></a></em></strong>', Context.OptionsJSX,
   {
     "body": [
       {
         "expression": {
           "children": [
             {
               "children": [
                 {
                   "children": [
                    {
                       "children": [],
                       "closingElement": null,
                       "openingElement": {
                         "attributes": [],
                         "name": {
                           "name": "test",
                           "type": "JSXIdentifier",
                         },
                         "selfClosing": true,
                         "type": "JSXOpeningElement",
                       },
                       "type": "JSXElement",
                     }
                   ],
                   "closingElement": {
                     "name": {
                       "name": "a",
                       "type": "JSXIdentifier",
                     },
                     "type": "JSXClosingElement",
                   },
                   "openingElement": {
                     "attributes": [
                       {
                         "name": {
                           "name": "href",
                           "type": "JSXIdentifier",
                         },
                         "type": "JSXAttribute",
                         "value": {
                           "raw": null,
                           "type": "Literal",
                           "value": "{link}",
                         },
                       },
                     ],
                    "name": {
                       "name": "a",
                       "type": "JSXIdentifier",
                     },
                     "selfClosing": false,
                     "type": "JSXOpeningElement"
                   },
                   "type": "JSXElement"
                 }
               ],
               "closingElement": {
                "name": {
                   "name": "em",
                   "type": "JSXIdentifier",
                 },
                 "type": "JSXClosingElement"
               },
               "openingElement": {
                 "attributes": [],
                 "name": {
                   "name": "em",
                   "type": "JSXIdentifier",
                 },
                 "selfClosing": false,
                "type": "JSXOpeningElement",
               },
               "type": "JSXElement",
             },
           ],
           "closingElement": {
             "name": {
               "name": "strong",
               "type": "JSXIdentifier",
             },
             "type": "JSXClosingElement",
           },
           "openingElement": {
             "attributes": [],
             "name": {
               "name": "strong",
               "type": "JSXIdentifier",
             },
            "selfClosing": false,
             "type": "JSXOpeningElement",
           },
           "type": "JSXElement",
         },
         "type": "ExpressionStatement",
       },
     ],
     "sourceType": "script",
     "type": "Program",
   }],
   ['<img/ >', '<img/ >', Context.OptionsJSX,
   {
     "body": [
       {
         "expression": {
           "children": [],
           "closingElement": null,
           "openingElement": {
             "attributes": [],
             "name": {
               "name": "img",
               "type": "JSXIdentifier",
             },
             "selfClosing": true,
             "type": "JSXOpeningElement",
           },
           "type": "JSXElement",
         },
        "type": "ExpressionStatement",
       },
     ],
     "sourceType": "script",
     "type": "Program",
   }],
   ['<rect option:square />', '<rect option:square />', Context.OptionsJSX, {
      "body": [
        {
          "expression": {
           "children": [],
            "closingElement": null,
           "openingElement": {
              "attributes": [
                {
                  "name": {
                    "name": {
                      "name": "square",
                      "type": "JSXIdentifier",
                    },
                    "namespace": {
                     "name": "option",
                     "type": "JSXIdentifier",
                    },
                    "type": "JSXNamespacedName",
                  },
                  "type": "JSXAttribute",
                 "value": null,
                }
             ],
              "name": {
                "name": "rect",
                "type": "JSXIdentifier",
              },
              "selfClosing": true,
              "type": "JSXOpeningElement",
            },
            "type": "JSXElement",
         },
          "type": "ExpressionStatement",
        },
      ],
      "sourceType": "script",
      "type": "Program"
    }],
   ['<home xlink:type="simple" other="foo" ></home>', '<home xlink:type="simple" other="foo" ></home>', Context.OptionsJSX, {
      "body": [
        {
          "expression": {
            "children": [],
            "closingElement": {
             "name": {
                "name": "home",
                "type": "JSXIdentifier",
              },
              "type": "JSXClosingElement",
            },
            "openingElement": {
              "attributes": [
                {
                  "name": {
                    "name": {
                      "name": "type",
                      "type": "JSXIdentifier",
                    },
                    "namespace": {
                      "name": "xlink",
                      "type": "JSXIdentifier",
                    },
                    "type": "JSXNamespacedName",
                  },
                  "type": "JSXAttribute",
                  "value": {
                    "raw": null,
                    "type": "Literal",
                   "value": "simple",
                  },
                },
                {
                  "name": {
                    "name": "other",
                    "type": "JSXIdentifier",
                  },
                  "type": "JSXAttribute",
                  "value": {
                    "raw": null,
                    "type": "Literal",
                    "value": "foo",
                  },
                },
             ],
              "name": {
                "name": "home",
                "type": "JSXIdentifier"
              },
              "selfClosing": false,
              "type": "JSXOpeningElement"
            },
            "type": "JSXElement",
          },
          "type": "ExpressionStatement"
        }
      ],
     "sourceType": "script",
      "type": "Program"
    }],
   [`<em>
   One
   Two
   Three
   </em>`, `<em>
   One
   Two
   Three
   </em>`, Context.OptionsJSX, {
      "body": [{
          "expression": {
            "children": [
              {
                "type": "JSXText",
                "value": "\n   One\n   Two\n   Three\n   ",
              },
            ],
            "closingElement": {
              "name": {
                "name": "em",
                "type": "JSXIdentifier",
              },
              "type": "JSXClosingElement",
            },
            "openingElement": {
              "attributes": [],
              "name": {
                "name": "em",
                "type": "JSXIdentifier",
              },
              "selfClosing": false,
              "type": "JSXOpeningElement",
            },
            "type": "JSXElement",
          },
          "type": "ExpressionStatement",
        },
      ],
      "sourceType": "script",
      "type": "Program"
    }],
  ['<div>{0}</div>;', '<div>{0}</div>;', Context.OptionsJSX, {
      "body": [
        {
          "expression": {
            "children": [
              {
                "expression": {
                  "raw": null,
                  "type": "Literal",
                  "value": 0,
                },
                "type": "JSXExpressionContainer",
              },
            ],
            "closingElement": {
              "name": {
                "name": "div",
                "type": "JSXIdentifier",
              },
              "type": "JSXClosingElement",
            },
            "openingElement": {
              "attributes": [],
              "name": {
                "name": "div",
                "type": "JSXIdentifier"
              },
              "selfClosing": false,
              "type": "JSXOpeningElement"
            },
            "type": "JSXElement",
          },
          "type": "ExpressionStatement",
        },
      ],
      "sourceType": "script",
      "type": "Program",
    }],


];

const invalids: Array < [string, string, Context, any] > = [
  ['<1/>', '<1/>', Context.OptionsJSX, {}],
  ['<div>one</div><div>two</div>', '<div>one</div><div>two</div>', Context.OptionsJSX, {}],
  ['<a foo="bar', '<a foo="bar', Context.OptionsJSX, {}],
  ['</>', '</>', Context.OptionsJSX, {}],
  ['<a:b.c />', '<a:b.c />', Context.OptionsJSX, {}],
  ['<a/!', '<a/!', Context.OptionsJSX, {}],
  ['<img src={}>', '<img src={}>', Context.OptionsJSX, {}],
  ['<a b=: />', '<a b=: />', Context.OptionsJSX, {}],
  ['<xyz. />', '<xyz. />', Context.OptionsJSX, {}],
  ['<.abc />', '<.abc />', Context.OptionsJSX, {}],
  ['<Foo></Bar>', '<Foo></Bar>', Context.OptionsJSX, {}],
  ['<a foo="bar', '<a foo="bar', Context.OptionsJSX, {}],
  ['<dd><e></e></dddd>;', '<dd><e></e></dddd>;', Context.OptionsJSX, {}],
  ['<:a />', '<:a />', Context.OptionsJSX, {}],
  ['<a: />', '<a: />', Context.OptionsJSX, {}],
  ['<a:b.c></a:b.c>', '<a:b.c></a:b.c>', Context.OptionsJSX, {}],
  ['<a[\'foo\']></a[\'foo\']', '<a[\'foo\']></a[\'foo\']', Context.OptionsJSX, {}],
  ['<a b={}>', '<a b={}>', Context.OptionsJSX, {}],
  ['<span className="a", id="b" />', '<span className="a", id="b" />', Context.OptionsJSX, {}],
  ['<div className"app">', '<div className"app">', Context.OptionsJSX, {}],
  ['<a b=}>', '<a b=}>', Context.OptionsJSX, {}],
  ['<a .../*hai*/asdf/>', '<a .../*hai*/asdf/>', Context.OptionsJSX, {}],
  ['</div><li>Item 1</li><li>Item 1</li></div>', '</div><li>Item 1</li><li>Item 1</li></div>', Context.OptionsJSX, {}],
  ['<a[b.c] d={e.f} />;', '<a[b.c] d={e.f} />;', Context.OptionsJSX, {}],
  ['<a b=<}>', '<a b=<}>', Context.OptionsJSX, {}],
  ['<{...b} {...a }>{...b}</{...b}>', '<{...b} {...a }>{...b}</{...b}>', Context.OptionsJSX, {}],
  ['<div {...props}>stuff</div {...props}>', '<div {...props}>stuff</div {...props}>', Context.OptionsJSX, {}],
  ['<f><g/></ff>;', '<f><g/></ff>;', Context.OptionsJSX, {}],
  ['<:path />', '<:path />', Context.OptionsJSX, {}],
  ['<path></svg:path>', '<path></svg:path>', Context.OptionsJSX, {}],
  ['<foo.bar></foo.baz>', '<foo.bar></foo.baz>', Context.OptionsJSX, {}],
  ['var x = <div>one</div> /* intervening comment */ <div>two</div>;', 'var x = <div>one</div> /* intervening comment */ <div>two</div>;', Context.OptionsJSX, {}],
  ['var x = <div>one</div><div>two</div>;', 'var x = <div>one</div><div>two</div>;', Context.OptionsJSX, {}],
];

fail('Miscellaneous - JSX (pass)', invalids);
pass('Miscellaneous - JSX (pass)', valids);

});
