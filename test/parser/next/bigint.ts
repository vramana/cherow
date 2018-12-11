import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - BigInt', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['1n', '1n', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'Literal',
                'value': 1,
                'bigint': null,
                raw: null,
                'start': 0,
                'end': 2
            },
            'start': 0,
            'end': 2
        }
    ],
    'start': 0,
    'end': 2
}],

['0O234536n', '0O234536n', Context.OptionsRanges | Context.OptionsNext, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'Literal',
              raw: null,
              'value': 80222,
              'bigint': null,
              'start': 0,
              'end': 9
          },
          'start': 0,
          'end': 9
      }
  ],
  'start': 0,
  'end': 9
}],

['0b0010101n', '0b0010101n', Context.OptionsRanges | Context.OptionsNext, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'Literal',
              raw: null,
              'value': 21,
              'bigint': null,
              'start': 0,
              'end': 10
          },
          'start': 0,
          'end': 10
      }
  ],
  'start': 0,
  'end': 10
}],

['let ariya = 3453451n', 'let ariya = 3453451n', Context.OptionsRanges | Context.OptionsNext, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'let',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Literal',
                      raw: null,
                      'value': 3453451,
                      'bigint': null,
                      'start': 12,
                      'end': 20
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'ariya',
                      'start': 4,
                      'end': 9
                  },
                  'start': 4,
                  'end': 20
              }
          ],
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
];

pass('Expressions - BigInt (pass)', valids);

});
