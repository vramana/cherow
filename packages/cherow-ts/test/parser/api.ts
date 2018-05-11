import { Context } from 'cherow';
import * as t from 'assert';
import { parseTS } from '../../src/cherow-ts';

describe('Api', () => {

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
            "declared": false,
            'id': {
              'name': 'foo',
              "optional": false,
              'type': 'Identifier',
              'typeAnnotation': null,
            },
            'params': [
              {
                'name': 'a',
                "optional": false,
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
                "optional": false,
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
                  "optional": false,
                 'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'type': 'TSTypeReference',
                      'typeName': {
                        'name': 'bar',
                        'type': 'Identifier',
                        "typeAnnotation": null
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
