import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous JSX', () => {

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

    ['svg:path></svg:path>', `import React, { Component } from 'react';
    import { withRouter } from 'react-router';
    import { withStyles } from '@material-ui/core/styles';
    import withWidth from '@material-ui/core/withWidth';
    import styles from "./styles";
    import { connect } from 'react-redux';
    import { compose } from 'recompose';
    import Snackbar from '@material-ui/core/Snackbar';
    import Typography from '@material-ui/core/Typography';
    import { closeSnackBar, openSnackBar } from '../../actions/snack-bar';

    class App extends Component {
      componentDidMount() {
        setTimeout(() => {
          this.props.dispatch(openSnackBar({
            message: 'Test Message'
          }))
        }, 2000);
      }
      render() {
        const { classes } = this.props;
        const snackBarOrigin = (this.props.width === 'sm' || this.props.width === 'xs') ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'bottom', horizontal: 'left' };
        return (
          <div className={classes.app}>
            {/* REMOVE THIS CONTENT */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="display4">Hello World</Typography>
              <Typography variant="display1">You can remove this content in components/App/index.jsx</Typography>
            </div>
            {/* REMOVE THIS CONTENT */}
            <div id="dialog-holder"></div>
            <Snackbar
              anchorOrigin={snackBarOrigin}
              open={this.props.snackBar.open}
              onClose={() => this.props.dispatch(closeSnackBar())}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              autoHideDuration={this.props.snackBar.autoHideDuration}
              message={<span id="message-id">{this.props.snackBar.message}</span>}
            />
          </div>
        );
      }
    }

    const mapStateToProps = (state) => {
      return {
        snackBar: state.snackBar
      };
    };

    export default withRouter(compose(
      connect(mapStateToProps),
      withStyles(styles),
      withWidth()
    )(App));`, Context.OptionsJSX | Context.Module | Context.Strict, {
       "body": [
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "react",
           },
           "specifiers": [
             {
               "local": {
                 "name": "React",
                 "type": "Identifier",
               },
               "type": "ImportDefaultSpecifier",
             },
             {
               "imported": {
                 "name": "Component",
                 "type": "Identifier",
               },
               "local": {
                 "name": "Component",
                 "type": "Identifier",
               },
               "type": "ImportSpecifier",
             },
           ],
           "type": "ImportDeclaration",
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "react-router",
           },
           "specifiers": [
             {
               "imported": {
                 "name": "withRouter",
                 "type": "Identifier",
               },
               "local": {
                 "name": "withRouter",
                 "type": "Identifier",
               },
               "type": "ImportSpecifier",
             },
           ],
           "type": "ImportDeclaration",
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "@material-ui/core/styles",
           },
           "specifiers": [
             {
               "imported": {
                 "name": "withStyles",
                 "type": "Identifier",
               },
               "local": {
                 "name": "withStyles",
                 "type": "Identifier",
               },
               "type": "ImportSpecifier"
             }
           ],
           "type": "ImportDeclaration",
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "@material-ui/core/withWidth",
           },
           "specifiers": [
             {
               "local": {
                 "name": "withWidth",
                 "type": "Identifier",
               },
               "type": "ImportDefaultSpecifier",
             },
           ],
           "type": "ImportDeclaration",
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "./styles",
           },
           "specifiers": [
             {
               "local": {
                 "name": "styles",
                 "type": "Identifier"
               },
               "type": "ImportDefaultSpecifier"
             }
           ],
           "type": "ImportDeclaration"
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "react-redux",
           },
           "specifiers": [
             {
               "imported": {
                 "name": "connect",
                 "type": "Identifier",
               },
               "local": {
                 "name": "connect",
                 "type": "Identifier",
               },
               "type": "ImportSpecifier"
             }
           ],
           "type": "ImportDeclaration"
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "recompose"
           },
           "specifiers": [
             {
               "imported": {
                 "name": "compose",
                 "type": "Identifier",
               },
               "local": {
                 "name": "compose",
                 "type": "Identifier",
               },
               "type": "ImportSpecifier"
             }
           ],
           "type": "ImportDeclaration",
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "@material-ui/core/Snackbar",
           },
           "specifiers": [
             {
               "local": {
                 "name": "Snackbar",
                 "type": "Identifier",
               },
               "type": "ImportDefaultSpecifier",
             }
           ],
           "type": "ImportDeclaration"
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "@material-ui/core/Typography",
           },
           "specifiers": [
             {
               "local": {
                 "name": "Typography",
                 "type": "Identifier",
               },
               "type": "ImportDefaultSpecifier",
             },
           ],
           "type": "ImportDeclaration",
         },
         {
           "source": {
             "raw": null,
             "type": "Literal",
             "value": "../../actions/snack-bar",
           },
           "specifiers": [
             {
               "imported": {
                 "name": "closeSnackBar",
                 "type": "Identifier",
               },
               "local": {
                 "name": "closeSnackBar",
                 "type": "Identifier",
               },
               "type": "ImportSpecifier",
             },
             {
               "imported": {
                 "name": "openSnackBar",
                 "type": "Identifier",
               },
               "local": {
                 "name": "openSnackBar",
                 "type": "Identifier",
               },
               "type": "ImportSpecifier",
             },
           ],
           "type": "ImportDeclaration",
         },
         {
           "body": {
             "body": [
               {
                 "computed": false,
                 "key": {
                   "name": "componentDidMount",
                   "type": "Identifier",
                 },
                 "kind": "method",
                 "static": false,
                 "type": "MethodDefinition",
                 "value": {
                   "async": false,
                   "body": {
                     "body": [
                       {
                         "expression": {
                           "arguments": [
                             {
                               "async": false,
                               "body": {
                                 "body": [
                                   {
                                     "expression": {
                                       "arguments": [
                                         {
                                           "arguments": [
                                             {
                                               "properties": [
                                                 {
                                                   "computed": false,
                                                   "key": {
                                                     "name": "message",
                                                     "type": "Identifier",
                                                   },
                                                   "kind": "init",
                                                   "method": false,
                                                   "shorthand": false,
                                                   "type": "Property",
                                                   "value": {
                                                     "raw": null,
                                                     "type": "Literal",
                                                     "value": "Test Message",
                                                   }
                                                 }
                                               ],
                                               "type": "ObjectExpression",
                                             },
                                           ],
                                           "callee": {
                                             "name": "openSnackBar",
                                             "type": "Identifier",
                                           },
                                           "type": "CallExpression",
                                         }
                                       ],
                                       "callee": {
                                         "computed": false,
                                         "object": {
                                           "computed": false,
                                           "object": {
                                             "type": "ThisExpression",
                                           },
                                           "property": {
                                             "name": "props",
                                             "type": "Identifier",
                                           },
                                           "type": "MemberExpression"
                                         },
                                         "property": {
                                           "name": "dispatch",
                                           "type": "Identifier"
                                         },
                                         "type": "MemberExpression"
                                       },
                                       "type": "CallExpression"
                                     },
                                     "type": "ExpressionStatement"
                                   }
                                 ],
                                 "type": "BlockStatement"
                               },
                               "expression": false,
                               "generator": false,
                               "id": null,
                               "params": [],
                               "type": "ArrowFunctionExpression"
                             },
                             {
                               "raw": null,
                               "type": "Literal",
                               "value": 2000,
                             }
                           ],
                           "callee": {
                             "name": "setTimeout",
                             "type": "Identifier",
                           },
                           "type": "CallExpression",
                         },
                         "type": "ExpressionStatement",
                       },
                     ],
                     "type": "BlockStatement",
                   },
                   "expression": false,
                   "generator": false,
                   "id": null,
                   "params": [],
                   "type": "FunctionExpression",
                 },
               },
               {
                 "computed": false,
                 "key": {
                   "name": "render",
                   "type": "Identifier",
                 },
                 "kind": "method",
                 "static": false,
                 "type": "MethodDefinition",
                 "value": {
                   "async": false,
                   "body": {
                     "body": [
                       {
                         "declarations": [
                           {
                             "id": {
                               "properties": [
                                 {
                                   "computed": false,
                                   "key": {
                                     "name": "classes",
                                     "type": "Identifier",
                                   },
                                   "kind": "init",
                                   "method": false,
                                   "shorthand": true,
                                   "type": "Property",
                                   "value": {
                                     "name": "classes",
                                     "type": "Identifier",
                                   }
                                 }
                               ],
                               "type": "ObjectPattern",
                             },
                             "init": {
                               "computed": false,
                               "object": {
                                 "type": "ThisExpression",
                               },
                               "property": {
                                 "name": "props",
                                 "type": "Identifier",
                               },
                               "type": "MemberExpression",
                             },
                             "type": "VariableDeclarator",
                           },
                         ],
                         "kind": "const",
                         "type": "VariableDeclaration",
                       },
                       {
                         "declarations": [
                           {
                             "id": {
                               "name": "snackBarOrigin",
                               "type": "Identifier",
                             },
                             "init": {
                               "alternate": {
                                 "properties": [
                                   {
                                     "computed": false,
                                     "key": {
                                       "name": "vertical",
                                       "type": "Identifier",
                                     },
                                     "kind": "init",
                                     "method": false,
                                     "shorthand": false,
                                     "type": "Property",
                                     "value": {
                                       "raw": null,
                                       "type": "Literal",
                                       "value": "bottom",
                                     }
                                   },
                                   {
                                     "computed": false,
                                     "key": {
                                       "name": "horizontal",
                                       "type": "Identifier",
                                     },
                                     "kind": "init",
                                     "method": false,
                                     "shorthand": false,
                                     "type": "Property",
                                     "value": {
                                       "raw": null,
                                       "type": "Literal",
                                       "value": "left"
                                     }
                                   }
                                 ],
                                 "type": "ObjectExpression",
                               },
                               "consequent": {
                                 "properties": [
                                   {
                                     "computed": false,
                                     "key": {
                                       "name": "vertical",
                                       "type": "Identifier",
                                     },
                                     "kind": "init",
                                     "method": false,
                                     "shorthand": false,
                                     "type": "Property",
                                     "value": {
                                       "raw": null,
                                       "type": "Literal",
                                       "value": "bottom",
                                     }
                                   },
                                   {
                                     "computed": false,
                                     "key": {
                                       "name": "horizontal",
                                       "type": "Identifier",
                                     },
                                     "kind": "init",
                                     "method": false,
                                     "shorthand": false,
                                     "type": "Property",
                                     "value": {
                                       "raw": null,
                                       "type": "Literal",
                                       "value": "left",
                                     }
                                   }
                                 ],
                                 "type": "ObjectExpression"
                               },
                               "test": {
                                 "left": {
                                   "left": {
                                     "computed": false,
                                     "object": {
                                       "computed": false,
                                       "object": {
                                         "type": "ThisExpression",
                                       },
                                       "property": {
                                         "name": "props",
                                         "type": "Identifier",
                                       },
                                       "type": "MemberExpression"
                                     },
                                     "property": {
                                       "name": "width",
                                       "type": "Identifier",
                                     },
                                     "type": "MemberExpression",
                                   },
                                   "operator": "===",
                                   "right": {
                                     "raw": null,
                                     "type": "Literal",
                                     "value": "sm",
                                   },
                                   "type": "BinaryExpression",
                                 },
                                 "operator": "||",
                                 "right": {
                                   "left": {
                                     "computed": false,
                                     "object": {
                                       "computed": false,
                                       "object": {
                                         "type": "ThisExpression"
                                       },
                                       "property": {
                                         "name": "props",
                                         "type": "Identifier",
                                       },
                                       "type": "MemberExpression"
                                     },
                                     "property": {
                                       "name": "width",
                                       "type": "Identifier",
                                     },
                                     "type": "MemberExpression"
                                   },
                                   "operator": "===",
                                   "right": {
                                     "raw": null,
                                     "type": "Literal",
                                     "value": "xs",
                                   },
                                   "type": "BinaryExpression"
                                 },
                                 "type": "LogicalExpression"
                               },
                               "type": "ConditionalExpression"
                             },
                             "type": "VariableDeclarator"
                           }
                         ],
                         "kind": "const",
                         "type": "VariableDeclaration"
                       },
                       {
                         "argument": {
                           "children": [
                             {
                               "type": "JSXText",
                               "value": "\n            ",
                             },
                             {
                               "expression": {
                                 "type": "JSXEmptyExpression"
                               },
                               "type": "JSXExpressionContainer"
                             },
                             {
                               "type": "JSXText",
                               "value": "\n            ",
                             },
                             {
                               "children": [
                                 {
                                   "type": "JSXText",
                                   "value": "\n              ",
                                 },
                                 {
                                   "children": [
                                     {
                                       "type": "JSXText",
                                       "value": "Hello World",
                                     }
                                   ],
                                   "closingElement": {
                                     "name": {
                                       "name": "Typography",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXClosingElement"
                                   },
                                   "openingElement": {
                                     "attributes": [
                                       {
                                         "name": {
                                           "name": "variant",
                                           "type": "JSXIdentifier",
                                         },
                                         "type": "JSXAttribute",
                                         "value": {
                                           "raw": null,
                                           "type": "Literal",
                                           "value": "display4",
                                         },
                                       },
                                     ],
                                     "name": {
                                       "name": "Typography",
                                       "type": "JSXIdentifier"
                                     },
                                     "selfClosing": false,
                                     "type": "JSXOpeningElement",
                                   },
                                   "type": "JSXElement",
                                 },
                                 {
                                   "type": "JSXText",
                                   "value": "\n              "
                                 },
                                 {
                                   "children": [
                                     {
                                       "type": "JSXText",
                                       "value": "You can remove this content in components/App/index.jsx",
                                     },
                                   ],
                                   "closingElement": {
                                     "name": {
                                       "name": "Typography",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXClosingElement",
                                   },
                                   "openingElement": {
                                     "attributes": [
                                       {
                                         "name": {
                                           "name": "variant",
                                           "type": "JSXIdentifier",
                                         },
                                         "type": "JSXAttribute",
                                         "value": {
                                           "raw": null,
                                           "type": "Literal",
                                           "value": "display1",
                                         },
                                       },
                                     ],
                                     "name": {
                                       "name": "Typography",
                                       "type": "JSXIdentifier",
                                     },
                                     "selfClosing": false,
                                     "type": "JSXOpeningElement",
                                   },
                                   "type": "JSXElement",
                                 },
                                 {
                                   "type": "JSXText",
                                   "value": "\n            ",
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
                                     "name": {
                                       "name": "style",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXAttribute",
                                     "value": {
                                       "expression": {
                                         "properties": [
                                           {
                                             "computed": false,
                                             "key": {
                                               "name": "textAlign",
                                               "type": "Identifier",
                                             },
                                             "kind": "init",
                                             "method": false,
                                             "shorthand": false,
                                             "type": "Property",
                                             "value": {
                                               "raw": null,
                                               "type": "Literal",
                                               "value": "center",
                                             }
                                           },
                                           {
                                             "computed": false,
                                             "key": {
                                               "name": "display",
                                               "type": "Identifier",
                                             },
                                             "kind": "init",
                                             "method": false,
                                             "shorthand": false,
                                             "type": "Property",
                                             "value": {
                                               "raw": null,
                                               "type": "Literal",
                                               "value": "flex"
                                             }
                                           },
                                           {
                                             "computed": false,
                                             "key": {
                                               "name": "flexDirection",
                                               "type": "Identifier"
                                             },
                                             "kind": "init",
                                             "method": false,
                                             "shorthand": false,
                                             "type": "Property",
                                             "value": {
                                               "raw": null,
                                               "type": "Literal",
                                               "value": "column",
                                             }
                                           },
                                           {
                                             "computed": false,
                                             "key": {
                                               "name": "justifyContent",
                                               "type": "Identifier",
                                             },
                                             "kind": "init",
                                             "method": false,
                                             "shorthand": false,
                                             "type": "Property",
                                             "value": {
                                               "raw": null,
                                               "type": "Literal",
                                               "value": "center",
                                             }
                                           },
                                           {
                                             "computed": false,
                                             "key": {
                                               "name": "alignItems",
                                               "type": "Identifier",
                                             },
                                             "kind": "init",
                                             "method": false,
                                             "shorthand": false,
                                             "type": "Property",
                                             "value": {
                                               "raw": null,
                                               "type": "Literal",
                                               "value": "center",
                                             },
                                           },
                                           {
                                             "computed": false,
                                             "key": {
                                               "name": "height",
                                               "type": "Identifier",
                                             },
                                             "kind": "init",
                                             "method": false,
                                             "shorthand": false,
                                             "type": "Property",
                                             "value": {
                                               "raw": null,
                                               "type": "Literal",
                                               "value": "100%",
                                             }
                                           }
                                         ],
                                         "type": "ObjectExpression",
                                       },
                                       "type": "JSXExpressionContainer"
                                     }
                                   }
                                 ],
                                 "name": {
                                   "name": "div",
                                   "type": "JSXIdentifier",
                                 },
                                 "selfClosing": false,
                                 "type": "JSXOpeningElement",
                               },
                               "type": "JSXElement"
                             },
                             {
                               "type": "JSXText",
                               "value": "\n            ",
                             },
                             {
                               "expression": {
                                 "type": "JSXEmptyExpression"
                               },
                               "type": "JSXExpressionContainer"
                             },
                             {
                               "type": "JSXText",
                               "value": "\n            ",
                             },
                             {
                               "children": [],
                               "closingElement": {
                                 "name": {
                                   "name": "div",
                                   "type": "JSXIdentifier",
                                 },
                                 "type": "JSXClosingElement"
                               },
                               "openingElement": {
                                 "attributes": [
                                   {
                                     "name": {
                                       "name": "id",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXAttribute",
                                     "value": {
                                       "raw": null,
                                       "type": "Literal",
                                       "value": "dialog-holder"
                                     }
                                   }
                                 ],
                                 "name": {
                                   "name": "div",
                                   "type": "JSXIdentifier",
                                 },
                                 "selfClosing": false,
                                 "type": "JSXOpeningElement",
                               },
                               "type": "JSXElement"
                             },
                             {
                               "type": "JSXText",
                               "value": "\n            ",
                             },
                             {
                               "children": [],
                               "closingElement": null,
                               "openingElement": {
                                 "attributes": [
                                   {
                                     "name": {
                                       "name": "anchorOrigin",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXAttribute",
                                     "value": {
                                       "expression": {
                                         "name": "snackBarOrigin",
                                         "type": "Identifier",
                                       },
                                       "type": "JSXExpressionContainer",
                                     }
                                   },
                                   {
                                     "name": {
                                       "name": "open",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXAttribute",
                                     "value": {
                                       "expression": {
                                         "computed": false,
                                         "object": {
                                           "computed": false,
                                           "object": {
                                             "computed": false,
                                             "object": {
                                               "type": "ThisExpression",
                                             },
                                             "property": {
                                               "name": "props",
                                               "type": "Identifier",
                                             },
                                             "type": "MemberExpression",
                                           },
                                           "property": {
                                             "name": "snackBar",
                                             "type": "Identifier",
                                           },
                                           "type": "MemberExpression"
                                         },
                                         "property": {
                                           "name": "open",
                                           "type": "Identifier",
                                         },
                                         "type": "MemberExpression",
                                       },
                                       "type": "JSXExpressionContainer"
                                     }
                                   },
                                   {
                                     "name": {
                                       "name": "onClose",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXAttribute",
                                     "value": {
                                       "expression": {
                                         "async": false,
                                         "body": {
                                           "arguments": [
                                             {
                                               "arguments": [],
                                               "callee": {
                                                 "name": "closeSnackBar",
                                                 "type": "Identifier",
                                               },
                                               "type": "CallExpression",
                                             },
                                           ],
                                           "callee": {
                                             "computed": false,
                                             "object": {
                                               "computed": false,
                                               "object": {
                                                 "type": "ThisExpression",
                                               },
                                               "property": {
                                                 "name": "props",
                                                 "type": "Identifier",
                                               },
                                               "type": "MemberExpression",
                                             },
                                             "property": {
                                               "name": "dispatch",
                                               "type": "Identifier",
                                             },
                                             "type": "MemberExpression"
                                           },
                                           "type": "CallExpression"
                                         },
                                         "expression": true,
                                         "generator": false,
                                         "id": null,
                                         "params": [],
                                         "type": "ArrowFunctionExpression"
                                       },
                                       "type": "JSXExpressionContainer"
                                     }
                                   },
                                   {
                                     "name": {
                                       "name": "ContentProps",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXAttribute",
                                     "value": {
                                       "expression": {
                                         "properties": [
                                           {
                                             "computed": false,
                                             "key": {
                                               "raw": null,
                                               "type": "Literal",
                                               "value": "aria-describedby",
                                             },
                                             "kind": "init",
                                             "method": false,
                                             "shorthand": false,
                                             "type": "Property",
                                             "value": {
                                               "raw": null,
                                               "type": "Literal",
                                               "value": "message-id"
                                             }
                                           }
                                         ],
                                         "type": "ObjectExpression"
                                       },
                                       "type": "JSXExpressionContainer"
                                     }
                                   },
                                   {
                                     "name": {
                                       "name": "autoHideDuration",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXAttribute",
                                     "value": {
                                       "expression": {
                                         "computed": false,
                                         "object": {
                                           "computed": false,
                                           "object": {
                                             "computed": false,
                                             "object": {
                                               "type": "ThisExpression"
                                             },
                                             "property": {
                                               "name": "props",
                                               "type": "Identifier",
                                             },
                                             "type": "MemberExpression",
                                           },
                                           "property": {
                                             "name": "snackBar",
                                             "type": "Identifier",
                                           },
                                           "type": "MemberExpression",
                                         },
                                         "property": {
                                           "name": "autoHideDuration",
                                           "type": "Identifier",
                                         },
                                         "type": "MemberExpression"
                                       },
                                       "type": "JSXExpressionContainer"
                                     }
                                   },
                                   {
                                     "name": {
                                       "name": "message",
                                       "type": "JSXIdentifier",
                                     },
                                     "type": "JSXAttribute",
                                     "value": {
                                       "expression": {
                                         "children": [
                                           {
                                             "expression": {
                                               "computed": false,
                                               "object": {
                                                 "computed": false,
                                                 "object": {
                                                   "computed": false,
                                                   "object": {
                                                     "type": "ThisExpression"
                                                   },
                                                   "property": {
                                                     "name": "props",
                                                     "type": "Identifier",
                                                   },
                                                   "type": "MemberExpression",
                                                 },
                                                 "property": {
                                                   "name": "snackBar",
                                                   "type": "Identifier",
                                                 },
                                                 "type": "MemberExpression"
                                               },
                                               "property": {
                                                 "name": "message",
                                                 "type": "Identifier"
                                               },
                                               "type": "MemberExpression"
                                             },
                                             "type": "JSXExpressionContainer"
                                           }
                                         ],
                                         "closingElement": {
                                           "name": {
                                             "name": "span",
                                             "type": "JSXIdentifier",
                                           },
                                           "type": "JSXClosingElement"
                                         },
                                         "openingElement": {
                                           "attributes": [
                                             {
                                               "name": {
                                                 "name": "id",
                                                 "type": "JSXIdentifier",
                                               },
                                               "type": "JSXAttribute",
                                               "value": {
                                                 "raw": null,
                                                 "type": "Literal",
                                                 "value": "message-id",
                                               }
                                             }
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
                                       "type": "JSXExpressionContainer",
                                     },
                                   },
                                 ],
                                 "name": {
                                   "name": "Snackbar",
                                   "type": "JSXIdentifier",
                                 },
                                 "selfClosing": true,
                                 "type": "JSXOpeningElement",
                               },
                               "type": "JSXElement",
                             },
                             {
                               "type": "JSXText",
                               "value": "\n          ",
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
                                 "name": {
                                   "name": "className",
                                   "type": "JSXIdentifier",
                                 },
                                 "type": "JSXAttribute",
                                 "value": {
                                   "expression": {
                                     "computed": false,
                                     "object": {
                                       "name": "classes",
                                       "type": "Identifier"
                                     },
                                     "property": {
                                       "name": "app",
                                       "type": "Identifier",
                                     },
                                     "type": "MemberExpression"
                                   },
                                   "type": "JSXExpressionContainer"
                                 }
                               }
                             ],
                             "name": {
                               "name": "div",
                               "type": "JSXIdentifier",
                             },
                             "selfClosing": false,
                             "type": "JSXOpeningElement",
                           },
                           "type": "JSXElement",
                         },
                         "type": "ReturnStatement"
                       }
                     ],
                     "type": "BlockStatement"
                   },
                   "expression": false,
                   "generator": false,
                   "id": null,
                   "params": [],
                   "type": "FunctionExpression"
                 }
               }
             ],
             "type": "ClassBody",
           },
           "id": {
             "name": "App",
             "type": "Identifier",
           },
           "superClass": {
             "name": "Component",
             "type": "Identifier",
           },
           "type": "ClassDeclaration",
         },
         {
           "declarations": [
             {
               "id": {
                 "name": "mapStateToProps",
                 "type": "Identifier",
               },
               "init": {
                 "async": false,
                 "body": {
                   "body": [
                     {
                       "argument": {
                         "properties": [
                           {
                             "computed": false,
                             "key": {
                               "name": "snackBar",
                               "type": "Identifier",
                             },
                             "kind": "init",
                             "method": false,
                             "shorthand": false,
                             "type": "Property",
                             "value": {
                               "computed": false,
                               "object": {
                                 "name": "state",
                                 "type": "Identifier",
                               },
                               "property": {
                                 "name": "snackBar",
                                 "type": "Identifier",
                               },
                               "type": "MemberExpression"
                             }
                           }
                         ],
                         "type": "ObjectExpression"
                       },
                       "type": "ReturnStatement"
                     }
                   ],
                   "type": "BlockStatement"
                 },
                 "expression": false,
                 "generator": false,
                 "id": null,
                 "params": [
                   {
                     "name": "state",
                     "type": "Identifier",
                   },
                 ],
                 "type": "ArrowFunctionExpression"
               },
               "type": "VariableDeclarator"
             }
           ],
            "kind": "const",
            "type": "VariableDeclaration",
         },
          {
           "declaration": {
              "arguments": [
                {
                  "arguments": [
                    {
                      "name": "App",
                      "type": "Identifier",
                    }
                  ],
                  "callee": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "mapStateToProps",
                            "type": "Identifier"
                          }
                        ],
                        "callee": {
                          "name": "connect",
                          "type": "Identifier",
                        },
                        "type": "CallExpression",
                      },
                      {
                        "arguments": [
                         {
                            "name": "styles",
                            "type": "Identifier",
                          },
                        ],
                        "callee": {
                          "name": "withStyles",
                          "type": "Identifier",
                        },
                        "type": "CallExpression",
                      },
                      {
                        "arguments": [],
                        "callee": {
                          "name": "withWidth",
                          "type": "Identifier",
                        },
                        "type": "CallExpression"
                      }
                    ],
                    "callee": {
                      "name": "compose",
                      "type": "Identifier",
                    },
                    "type": "CallExpression"
                 },
                  "type": "CallExpression"
                }
             ],
              "callee": {
                "name": "withRouter",
                "type": "Identifier",
              },
              "type": "CallExpression"
            },
            "type": "ExportDefaultDeclaration"
          },
        ],
        "sourceType": "module",
        "type": "Program"
      }]
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

fail('Miscellaneous JSX (pass)', invalids);
pass('Miscellaneous JSX (pass)', valids);

});
