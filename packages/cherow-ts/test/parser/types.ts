import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Types', () => {

    const validSyntax = [
      'let a: any;',
      'let b: boolean;',
      'let ne: never;',
      'let nul: null;',
      'let num: number;',
      'let o: object;',
      'let st: string;',
      'let sy: symbol;',
      'let u: undefined;',
      'let v: void;',
      'let x: -1;',
      'let precedence1: number | string & boolean;',
      'let precedence2: number & string | boolean;',
      'let x: T;',
      'let x: Array<number>;'
    ];

    for (const arg of validSyntax) {

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parse(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    pass('let a: any;', Context.Empty, {
    source: 'let a: any;',
    expected: {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'a',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'type': 'TSAnyKeyword',
                    },
                  },
                },
                'init': null,
                'type': 'VariableDeclarator',
              },
            ],
            'kind': 'let',
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program',
      }
  });

    pass('let intersection: number & string;', Context.Empty, {
    source: 'let intersection: number & string;',
    expected: {
        'body': [
          {
            'declarations': [
             {
                'id': {
                  'name': 'intersection',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'type': 'TSIntersectionType',
                      'types': [
                        {
                          'type': 'TSNumberKeyword',
                        },
                        {
                          'type': 'TSStringKeyword'
                        }
                      ]
                    }
                  }
                },
                'init': null,
                'type': 'VariableDeclarator'
              },
            ],
            'kind': 'let',
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program',
      },
  });

    pass('let x: T;', Context.Empty, {
    source: 'let x: T;',
    expected: {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'x',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'type': 'TSTypeReference',
                      'typeName': {
                        'name': 'T',
                        'type': 'Identifier',
                      },
                      'typeParameters': []
                    },
                  },
                },
                'init': null,
                'type': 'VariableDeclarator',
              },
           ],
            'kind': 'let',
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
  });

    pass('let arr: number[][];', Context.Empty, {
    source: 'let arr: number[][];',
    expected: {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'arr',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'elementType': {
                        'elementType': {
                          'type': 'TSNumberKeyword',
                        },
                        'type': 'TSArrayType',
                      },
                      'type': 'TSArrayType',
                    }
                  }
                },
                'init': null,
                'type': 'VariableDeclarator',
              }
            ],
            'kind': 'let',
           'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
  });

    pass('simple let + identifier', Context.Empty, {
    source: 'let arr',
    expected: {
        'body': [
          {
            'declarations': [
              {
               'id': {
                  'name': 'arr',
                  'type': 'Identifier',
                  typeAnnotation: null,
                },
                'init': null,
                'type': 'VariableDeclarator',
              },
            ],
            'kind': 'let',
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program',
      }
  });

});
