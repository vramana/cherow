import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Async Functions', () => {
  const inValids: Array<[string, Context]> = [['(async function f(a, a) {})', Context.Strict]];

  fail('Expressions - Async Functions', inValids);

  const validFormalparams = [
    '(async function foo() { }.prototype)',
    '(async function foo(x, y = x, z = y) { })',
    '(async function foo(x = y, y) { })',
    '(async function foo(a, b = 39,) { })',
    '(async function foo(a, b,) { })',
    '(async function foo(_ = (function() {}())) { })',
    '(async function foo(x = x) { })',
    'var O = { async method(eval) {} }',
    "var O = { async ['meth' + 'od'](eval) {} }",
    "var O = { async 'method'(eval) {} }",
    'var O = { async 0(eval) {} }',
    'var O = { async method(arguments) {} }',
    "var O = { async ['meth' + 'od'](arguments) {} }",
    "var O = { async 'method'(arguments) {} }",
    'var O = { async 0(arguments) {} }',
    'async function await() {}',
    'class X { static async await(){} }',
    `(async function ref(a, b = 39,) {});`,
    `x = async function(a) { await a }`,
    'f(async function(x) { await x })',
    'f(b, async function(b) { await b }, c)',
    //    'async function foo(a = async () => await b) {}',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = class {async bar() { await b }}) {}',
    '(function f() { async function yield() {} })',
    '(function f() { ({ async yield() {} }); })',
    '({ async [yield]() {} });',
    'f(async function(x) { await x })',
    'f(b, async function(b) { await b }, c)',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = class {async bar() { await b }}) {}',
    'async function foo(a, b) { await a }',
    '"use strict"; ({ async yield() {} });',
    '(function f() { ({ async [yield]() {} }); })',
    `a = async
            function f(){}`
  ];

  for (const arg of validFormalparams) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  const valids: Array<[string, Context, any]> = [
    [
      '(async function foo() { }.prototype)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: true,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'prototype'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(_ = (function() {}())) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: '_'
                  },
                  right: {
                    type: 'CallExpression',
                    callee: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      async: false,
                      generator: false,
                      id: null
                    },
                    arguments: []
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'var O = { async method(arguments) {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'method'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [
                          {
                            type: 'Identifier',
                            name: 'arguments'
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          body: []
                        },
                        async: true,
                        generator: false,
                        id: null
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'O'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'async function await() {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'f(b, async function(b) { await b }, c)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'b'
                          }
                        }
                      }
                    ]
                  },
                  async: true,
                  generator: false,
                  id: null
                },
                {
                  type: 'Identifier',
                  name: 'c'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(b, async function(b) { await b }, c)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'b'
                          }
                        }
                      }
                    ]
                  },
                  async: true,
                  generator: false,
                  id: null
                },
                {
                  type: 'Identifier',
                  name: 'c'
                }
              ]
            }
          }
        ]
      }
    ] /*
    ['"use strict"; ({ async yield() {} });', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "Literal",
            "value": "use strict"
          },
          "directive": "use strict"
        },
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "yield"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
                  "generator": false,
                  "id": null
                },
                "kind": "init",
                "computed": false,
                "method": true,
                "shorthand": false
              }
            ]
          }
        }
      ]
    }],
    ['(async function foo(a, b = 39,) {})', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "FunctionExpression",
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              },
              {
                "type": "AssignmentPattern",
                "left": {
                  "type": "Identifier",
                  "name": "b"
                },
                "right": {
                  "type": "Literal",
                  "value": 39
                }
              }
            ],
            "body": {
              "type": "BlockStatement",
              "body": []
            },
            "async": true,
            "generator": false,
            "id": {
              "type": "Identifier",
              "name": "foo"
            }
          }
        }
      ]
    }],
    ['(async function*(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1, k = l +=1) {})', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "FunctionExpression",
            "params": [
              {
                "type": "AssignmentPattern",
                "left": {
                  "type": "Identifier",
                  "name": "a"
                },
                "right": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "operator": "+=",
                  "right": {
                    "type": "Literal",
                    "value": 1
                  }
                }
              },
              {
                "type": "AssignmentPattern",
                "left": {
                  "type": "Identifier",
                  "name": "c"
                },
                "right": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "d"
                  },
                  "operator": "+=",
                  "right": {
                    "type": "Literal",
                    "value": 1
                  }
                }
              },
              {
                "type": "AssignmentPattern",
                "left": {
                  "type": "Identifier",
                  "name": "e"
                },
                "right": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "f"
                  },
                  "operator": "+=",
                  "right": {
                    "type": "Literal",
                    "value": 1
                  }
                }
              },
              {
                "type": "AssignmentPattern",
                "left": {
                  "type": "Identifier",
                  "name": "g"
                },
                "right": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "h"
                  },
                  "operator": "+=",
                  "right": {
                    "type": "Literal",
                    "value": 1
                  }
                }
              },
              {
                "type": "AssignmentPattern",
                "left": {
                  "type": "Identifier",
                  "name": "i"
                },
                "right": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "j"
                  },
                  "operator": "+=",
                  "right": {
                    "type": "Literal",
                    "value": 1
                  }
                }
              },
              {
                "type": "AssignmentPattern",
                "left": {
                  "type": "Identifier",
                  "name": "k"
                },
                "right": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "l"
                  },
                  "operator": "+=",
                  "right": {
                    "type": "Literal",
                    "value": 1
                  }
                }
              }
            ],
            "body": {
              "type": "BlockStatement",
              "body": []
            },
            "async": true,
            "generator": true,
            "id": null
          }
        }
      ]
    }],
    ['(async function foo(a,) {})', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "FunctionExpression",
            "params": [
              {
                "type": "Identifier",
                "name": "a"
              }
            ],
            "body": {
              "type": "BlockStatement",
              "body": []
            },
            "async": true,
            "generator": false,
            "id": {
              "type": "Identifier",
              "name": "foo"
            }
          }
        }
      ]
    }],*/,
    [
      'x=async function f(){ var f }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                },
                async: true,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(a, b = 39,) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Literal',
                    value: 39
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(_ = (function() {}())) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: '_'
                  },
                  right: {
                    type: 'CallExpression',
                    callee: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      async: false,
                      generator: false,
                      id: null
                    },
                    arguments: []
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(x = x) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'x=async function f(){ let f }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                },
                async: true,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - Async Functions (pass)', valids);
});
