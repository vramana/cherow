import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Literal - Regexp', () => {});

pass('Literal - Regexp (pass)', [
  [
    '/foo/u',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: /foo/u,
            regex: {
              pattern: 'foo',
              flags: 'u'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '/(.*?)a(?!(a+)b\\2c)\\2(.*)/',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: /(.*?)a(?!(a+)b\2c)\2(.*)/,
            regex: {
              pattern: '(.*?)a(?!(a+)b\\2c)\\2(.*)',
              flags: ''
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '/./',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: /./,
            regex: {
              pattern: '.',
              flags: ''
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '/foo/.bar();',
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
              type: 'MemberExpression',
              object: {
                type: 'Literal',
                value: {},
                regex: {
                  pattern: 'foo',
                  flags: ''
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bar'
              }
            },
            arguments: []
          }
        }
      ]
    }
  ],
  [
    '(foo)\n/bar',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              name: 'foo',
              type: 'Identifier'
            },
            operator: '/',
            right: {
              name: 'bar',
              type: 'Identifier'
            },
            type: 'BinaryExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    '(/fkleuver/)',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: {},
            regex: {
              pattern: 'fkleuver',
              flags: ''
            }
          }
        }
      ]
    }
  ],
  [
    '/a(?<=x)b/',
    Context.OptionsDisableWebCompat,
    {
      body: [
        {
          expression: {
            regex: {
              flags: '',
              pattern: 'a(?<=x)b'
            },
            type: 'Literal',
            value: /a(?<=x)b/
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    '/a\\p{x}b/u',
    Context.Empty,
    {
      body: [
        {
          expression: {
            regex: {
              flags: 'u',
              pattern: 'a\\p{x}b'
            },
            type: 'Literal',
            value: null
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    '/👍🚀❇️/',
    Context.Empty,
    {
      body: [
        {
          expression: {
            regex: {
              flags: '',
              pattern: '👍🚀❇️'
            },
            type: 'Literal',
            value: /👍🚀❇️/
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  /* ['/${1,2/', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "Literal",
          "value": {},
          "regex": {
            "pattern": "${1,2",
            "flags": ""
          }
        }
      }
    ]
  }], */
  [
    'middleDashMatch = /[\\-]/.exec',
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
              name: 'middleDashMatch'
            },
            operator: '=',
            right: {
              type: 'MemberExpression',
              object: {
                type: 'Literal',
                value: /[\-]/,
                regex: {
                  pattern: '[\\-]',
                  flags: ''
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'exec'
              }
            }
          }
        }
      ]
    }
  ],
  [
    '[]\n/x',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              elements: [],
              type: 'ArrayExpression'
            },
            operator: '/',
            right: {
              name: 'x',
              type: 'Identifier'
            },
            type: 'BinaryExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    '(x)/y',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            right: {
              type: 'Identifier',
              name: 'y'
            },
            operator: '/'
          }
        }
      ]
    }
  ],
  [
    'new/x/g',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            callee: {
              type: 'Literal',
              value: {},
              regex: {
                pattern: 'x',
                flags: 'g'
              }
            },
            arguments: []
          }
        }
      ]
    }
  ],
  [
    ' new\n/x/g',
    Context.Empty,
    {
      body: [
        {
          expression: {
            arguments: [],
            callee: {
              regex: {
                flags: 'g',
                pattern: 'x'
              },
              type: 'Literal',
              value: /x/g
            },
            type: 'NewExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    'new /foo/.expando()',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'Literal',
                value: {},
                regex: {
                  pattern: 'foo',
                  flags: ''
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'expando'
              }
            },
            arguments: []
          }
        }
      ]
    }
  ],
  [
    'new /foo/g.expando()',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'NewExpression',
            callee: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Literal',
                value: /foo/g,
                regex: {
                  pattern: 'foo',
                  flags: 'g'
                }
              },
              property: {
                type: 'Identifier',
                name: 'expando'
              }
            },
            arguments: []
          }
        }
      ],
      sourceType: 'script'
    }
  ]
]);
