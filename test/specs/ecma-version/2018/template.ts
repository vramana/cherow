import { n, pass } from '../../utils/test-utils';

describe('ES2018 - Revisited template', () => {

    pass('foo`\\unicode`', 'foo`\\unicode`', {
          body: [
            {
              end: 13,
              expression: {
                end: 13,
                'loc': {
                  'end': {
                    'column': 13,
                    'line': 1,
                  },
                  'start': {
                   'column': 0,
                    'line': 1,
                  }
                },
                'quasi': {
                  'end': 13,
                  'expressions': [],
                  'loc': {
                    'end': {
                      'column': 13,
                      'line': 1,
                    },
                    'start': {
                      'column': 3,
                      'line': 1,
                    },
                  },
                  'quasis': [
                  {
                      'end': 13,
                      'loc': {
                        'end': {
                          'column': 13,
                          'line': 1,
                        },
                        'start': {
                          'column': 3,
                          'line': 1,
                        }
                      },
                      'start': 3,
                      'tail': true,
                      'type': 'TemplateElement',
                      'value': {
                        'cooked': null,
                        'raw': '\\unicode',
                      }
                    }
                  ],
                  'start': 3,
                  'type': 'TemplateLiteral',
               },
                'start': 0,
                'tag': {
                  'end': 3,
                  'loc': {
                    'end': {
                      'column': 3,
                      'line': 1,
                    },
                    'start': {
                      'column': 0,
                      'line': 1,
                    }
                 },
                  'name': 'foo',
                  'start': 0,
                  'type': 'Identifier',
                },
                'type': 'TaggedTemplateExpression',
             },
              'loc': {
                'end': {
                  'column': 13,
                  'line': 1,
               },
                'start': {
                  'column': 0,
                  'line': 1,
                }
              },
              'start': 0,
             'type': 'ExpressionStatement',
            },
          ],
         'end': 13,
          'loc': {
            'end': {
              'column': 13,
              'line': 1,
            },
            'start': {
              'column': 0,
              'line': 1,
            },
          },
          'sourceType': 'script',
          'start': 0,
          'type': 'Program'
        });

});