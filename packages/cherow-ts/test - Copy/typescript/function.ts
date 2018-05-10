import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Functions', () => {

  const validSyntax = [
      'function f(x: any): x is boolean {}',
      '(function(x: any): x is boolean {})',
  ];

  for (const arg of validSyntax) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parse(`${arg}`, undefined, Context.Empty);
          });
      });
  }

  pass('function f(x: any): x is boolean {}', Context.Empty, {
  source: 'function f(x: any): x is boolean {}',
  expected: {
      'body': [
        {
          'async': false,
          'body': {
            'body': [],
            'type': 'BlockStatement'
          },
          'expression': false,
          'generator': false,
          'id': {
            'name': 'f',
            'type': 'Identifier',
            'typeAnnotation': null,
          },
          'params': [
           {
              'name': 'x',
              'type': 'Identifier',
              'typeAnnotation': {
                'type': 'TypeAnnotation',
                'typeAnnotation': {
                  'type': 'TSAnyKeyword'
                }
              }
            }
          ],
          'returnType': {
            'parameterName': {
              'name': 'x',
              'type': 'Identifier',
            },
            'type': 'TSTypePredicate',
            'typeAnnotation': {
              'type': 'TypeAnnotation',
              'typeAnnotation': {
                'type': 'TSBooleanKeyword',
              }
            }
         },
          'type': 'FunctionDeclaration',
          'typeParameters': null,
        }
      ],
      'sourceType': 'script',
      'type': 'Program',
    }
});

});
