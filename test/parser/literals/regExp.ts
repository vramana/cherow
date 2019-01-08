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
  ]
]);
