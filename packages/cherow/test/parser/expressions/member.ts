import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Member', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['set.push(existing);', 'set.push(existing);', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'object': {
                        'type': 'Identifier',
                        'name': 'set',
                        'start': 0,
                        'end': 3
                    },
                    'computed': false,
                    'property': {
                        'type': 'Identifier',
                        'name': 'push',
                        'start': 4,
                        'end': 8
                    },
                    'start': 0,
                    'end': 8
                },
                'arguments': [
                    {
                        'type': 'Identifier',
                        'name': 'existing',
                        'start': 9,
                        'end': 17
                    }
                ],
                'start': 0,
                'end': 18
            },
            'start': 0,
            'end': 19
        }
    ],
    'start': 0,
    'end': 19
}],
  ['a[b, c]', 'a[b, c]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'MemberExpression',
                'object': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 0,
                    'end': 1
                },
                'computed': true,
                'property': {
                    'type': 'SequenceExpression',
                    'expressions': [
                        {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 2,
                            'end': 3
                        },
                        {
                            'type': 'Identifier',
                            'name': 'c',
                            'start': 5,
                            'end': 6
                        }
                    ],
                    'start': 2,
                    'end': 6
                },
                'start': 0,
                'end': 6
            },
            'start': 0,
            'end': 7
        }
    ],
    'start': 0,
    'end': 7
}],
    ['a.$._.B0', 'a.$._.B0', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'MemberExpression',
                  'object': {
                      'type': 'MemberExpression',
                      'object': {
                          'type': 'MemberExpression',
                          'object': {
                              'type': 'Identifier',
                              'name': 'a',
                              'start': 0,
                              'end': 1
                          },
                          'computed': false,
                          'property': {
                              'type': 'Identifier',
                              'name': '$',
                              'start': 2,
                              'end': 3
                          },
                          'start': 0,
                          'end': 3
                      },
                      'computed': false,
                      'property': {
                          'type': 'Identifier',
                          'name': '_',
                          'start': 4,
                          'end': 5
                      },
                      'start': 0,
                      'end': 5
                  },
                  'computed': false,
                  'property': {
                      'type': 'Identifier',
                      'name': 'B0',
                      'start': 6,
                      'end': 8
                  },
                  'start': 0,
                  'end': 8
              },
              'start': 0,
              'end': 8
          }
      ],
      'start': 0,
      'end': 8
  }]
];

pass('Expressions - Member (pass)', valids);

});
