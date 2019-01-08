import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Assignment', () => {});

pass('Expressions - Assignment (pass)', [
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
  ]
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
  // ['/foo/.bar();', Context.Empty, {} ],
]);
