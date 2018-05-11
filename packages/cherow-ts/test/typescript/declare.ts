import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Declare', () => {

  const validSyntax = [
      'declare var x;',
      'declare var x: any;',
  ];

  for (const arg of validSyntax) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parse(`${arg}`, undefined, Context.Empty);
          });
      });
  }

  pass('declare interface I {}', Context.Empty, {
    source: 'declare interface I {}',
    expected: {
        'body': [
          {
            'body': {
              'body': [],
              'type': 'TSInterfaceBody',
            },
            "extends": null,
            'id': {
              'name': 'I',
              'type': 'Identifier',
            },
            'type': 'TSInterfaceDeclaration',
            'typeParameters': null,
          },
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
  });

  pass('declare let x;', Context.Empty, {
  source: 'declare let x;',
  expected: {
      'body': [
        {
          'declarations': [
            {
              'id': {
                'name': 'x',
                'type': 'Identifier',
                "optional": false,
                'typeAnnotation': null,
              },
              'init': null,
              'type': 'VariableDeclarator',
            },
          ],
          'kind': 'let',
          "declared": true,
         'type': 'VariableDeclaration',
        },
      ],
      'sourceType': 'script',
      'type': 'Program',
    }
});

  pass('declare const x: number, y: string;', Context.Empty, {
  source: 'declare const x: number, y: string;',
  expected: {
      'body': [
        {
          'declarations': [
            {
              'id': {
                'name': 'x',
                "optional": false,
                'type': 'Identifier',
                'typeAnnotation': {
                  'type': 'TypeAnnotation',
                  'typeAnnotation': {
                    'type': 'TSNumberKeyword',
                  }
                }
              },
              'init': null,
              'type': 'VariableDeclarator',
            },
            {
              'id': {
                'name': 'y',
                "optional": false,
                'type': 'Identifier',
                'typeAnnotation': {
                  'type': 'TypeAnnotation',
                  'typeAnnotation': {
                    'type': 'TSStringKeyword',
                  }
                }
              },
              'init': null,
              'type': 'VariableDeclarator',
            },
          ],
          'kind': 'identifier',
          'type': 'VariableDeclaration',
        },
      ],
      'sourceType': 'script',
      'type': 'Program',
    }
});

});
