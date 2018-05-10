import { Context } from 'cherow';
import * as t from 'assert';
import { parseTS } from '../../src/cherow-ts';

describe('Types', () => {

  it('should parse script code', () => {
    t.deepEqual(parseTS('function foo(a: string, b: number): void {}'), {
        'body': [
          {
            'async': false,
            'body': {
              'body': [],
              'type': 'BlockStatement',
            },
            'expression': false,
            'generator': false,
            'id': {
              'name': 'foo',
              'type': 'Identifier',
              'typeAnnotation': null,
            },
            'params': [
              {
                'name': 'a',
                'type': 'Identifier',
                'typeAnnotation': {
                  'type': 'TypeAnnotation',
                  'typeAnnotation': {
                    'type': 'TSStringKeyword',
                  }
                }
              },
              {
                'name': 'b',
                'type': 'Identifier',
                'typeAnnotation': {
                 'type': 'TypeAnnotation',
                  'typeAnnotation': {
                    'type': 'TSNumberKeyword',
                  }
                }
              }
            ],
            'returnType': {
              'type': 'TypeAnnotation',
              'typeAnnotation': {
                'type': 'TSVoidKeyword',
              }
            },
            'type': 'FunctionDeclaration',
           'typeParameters': null,
          },
       ],
        'sourceType': 'script',
        'type': 'Program'
      });
});

  it('should parse module code', () => {
    t.deepEqual(parseTS('var foo: bar', { module: true }), {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'foo',
                 'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'type': 'TSTypeReference',
                      'typeName': {
                        'name': 'bar',
                        'type': 'Identifier',
                      },
                      'typeParameters': [],
                    },
                  },
                },
                'init': null,
                'type': 'VariableDeclarator',
              }
            ],
            'kind': 'var',
            "declared": false,
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'module',
        'type': 'Program',
      });
});

});
