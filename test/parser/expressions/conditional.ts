import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import { parseSource } from '../../../src/cherow';
import * as t from 'assert';

describe('Expressions - Conditional', () => {});

const validSyntax = [
  '(y ? y : true)',
  'true ? y : false',
  '"1" ? "" : "1"',
  '"1" ? y : ""',
  'y ? y : "1"',
  'true ? y : z',
  '(false ? true : undefined)',
  '("1" ? "" : "1")',
  '("1" ? y : "")',
  'Symbol() ? 1 : 2, 1',
  '(false ? false : true)'
];

for (const arg of validSyntax) {
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
    });
  });
}

pass('Expressions - Conditional (pass)', [
  [
    'x = (0) ? 1 : 2',
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
              type: 'ConditionalExpression',
              test: {
                type: 'Literal',
                value: 0
              },
              consequent: {
                type: 'Literal',
                value: 1
              },
              alternate: {
                type: 'Literal',
                value: 2
              }
            }
          }
        }
      ]
    }
  ],
  [
    'x && y ? 1 : 2',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'LogicalExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'y'
              },
              operator: '&&'
            },
            consequent: {
              type: 'Literal',
              value: 1
            },
            alternate: {
              type: 'Literal',
              value: 2
            }
          }
        }
      ]
    }
  ],
  [
    'a ? !b : !c;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'Identifier',
              name: 'a'
            },
            consequent: {
              type: 'UnaryExpression',
              operator: '!',
              argument: {
                type: 'Identifier',
                name: 'b'
              },
              prefix: true
            },
            alternate: {
              type: 'UnaryExpression',
              operator: '!',
              argument: {
                type: 'Identifier',
                name: 'c'
              },
              prefix: true
            }
          }
        }
      ]
    }
  ],
  [
    'a?b:c',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'Identifier',
              name: 'a'
            },
            consequent: {
              type: 'Identifier',
              name: 'b'
            },
            alternate: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ]
    }
  ],
  [
    'a === b ? c : d % e;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              },
              operator: '==='
            },
            consequent: {
              type: 'Identifier',
              name: 'c'
            },
            alternate: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'd'
              },
              right: {
                type: 'Identifier',
                name: 'e'
              },
              operator: '%'
            }
          }
        }
      ]
    }
  ],
  [
    'a=b?c:d',
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
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'ConditionalExpression',
              test: {
                type: 'Identifier',
                name: 'b'
              },
              consequent: {
                type: 'Identifier',
                name: 'c'
              },
              alternate: {
                type: 'Identifier',
                name: 'd'
              }
            }
          }
        }
      ]
    }
  ],
  [
    'a?b=c:d',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'Identifier',
              name: 'a'
            },
            consequent: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'c'
              }
            },
            alternate: {
              type: 'Identifier',
              name: 'd'
            }
          }
        }
      ]
    }
  ],
  [
    'a?b:c=d',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'Identifier',
              name: 'a'
            },
            consequent: {
              type: 'Identifier',
              name: 'b'
            },
            alternate: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'c'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'd'
              }
            }
          }
        }
      ]
    }
  ]
]);
