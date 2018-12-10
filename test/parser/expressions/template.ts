import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Template', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['foo`\\\r\\\n${0}`', 'foo`\\\r\\\n${0}`', Context.OptionsRanges, {
      'body': [
        {
          'end': 13,
          'expression': {
            'end': 13,
            'quasi': {
              'end': 13,
              'expressions': [
                {
                  'end': 11,
                  'raw': '\\\r\\\n',
                  'start': 10,
                  'type': 'Literal',
                  'value': 0,
                },
              ],
              'quasis': [
                {
                  'end': 11,
                  'start': 3,
                  'tail': false,
                  'type': 'TemplateElement',
                  'value': {
                    'cooked': '',
                    'raw': '\\\r\\\n',
                  },
                },
                {
                  'end': 13,
                  'start': 11,
                  'tail': true,
                  'type': 'TemplateElement',
                  'value': {
                    'cooked': '',
                    'raw': '',
                  }
                }
              ],
              'start': 3,
              'type': 'TemplateLiteral',
            },
            'start': 0,
            'tag': {
              'end': 3,
              'name': 'foo',
              'start': 0,
              'type': 'Identifier',
           },
            'type': 'TaggedTemplateExpression'
          },
          'start': 0,
          'type': 'ExpressionStatement'
        }
      ],
      'end': 13,
      'sourceType': 'script',
      'start': 0,
      'type': 'Program'
    }],
  ['function z() {}; `z`;', 'function z() {}; `z`;', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 13,
                'end': 15
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'z',
                'start': 9,
                'end': 10
            },
            'start': 0,
            'end': 15
        },
        {
            'type': 'EmptyStatement',
            'start': 15,
            'end': 16
        },
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'TemplateLiteral',
                'expressions': [],
                'quasis': [
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': 'z',
                            'raw': 'z'
                        },
                        'tail': true,
                        'start': 17,
                        'end': 20
                    }
                ],
                'start': 17,
                'end': 20
            },
            'start': 17,
            'end': 21
        }
    ],
    'start': 0,
    'end': 21
}],
  ['function z() {}; `${z}${z}${z}`;', 'function z() {}; `${z}${z}${z}`;', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 13,
                'end': 15
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'z',
                'start': 9,
                'end': 10
            },
            'start': 0,
            'end': 15
        },
        {
            'type': 'EmptyStatement',
            'start': 15,
            'end': 16
        },
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'TemplateLiteral',
                'expressions': [
                    {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 20,
                        'end': 21
                    },
                    {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 24,
                        'end': 25
                    },
                    {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 28,
                        'end': 29
                    }
                ],
                'quasis': [
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': '',
                            'raw': ''
                        },
                        'tail': false,
                        'start': 17,
                        'end': 21
                    },
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': '',
                            'raw': ''
                        },
                        'tail': false,
                        'start': 21,
                        'end': 25
                    },
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': '',
                            'raw': ''
                        },
                        'tail': false,
                        'start': 25,
                        'end': 29
                    },
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': '',
                            'raw': ''
                        },
                        'tail': true,
                        'start': 29,
                        'end': 31
                    }
                ],
                'start': 17,
                'end': 31
            },
            'start': 17,
            'end': 32
        }
    ],
    'start': 0,
    'end': 32
}],
  ['function z() {}; ``;', 'function z() {}; ``;', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 13,
                'end': 15
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'z',
                'start': 9,
                'end': 10
            },
            'start': 0,
            'end': 15
        },
        {
            'type': 'EmptyStatement',
            'start': 15,
            'end': 16
        },
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'TemplateLiteral',
                'expressions': [],
                'quasis': [
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': '',
                            'raw': ''
                        },
                        'tail': true,
                        'start': 17,
                        'end': 19
                    }
                ],
                'start': 17,
                'end': 19
            },
            'start': 17,
            'end': 20
        }
    ],
    'start': 0,
    'end': 20
}],
  ['var foo = `simple template`;', 'var foo = `simple template`;', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'VariableDeclaration',
            'kind': 'var',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'TemplateLiteral',
                        'expressions': [],
                        'quasis': [
                            {
                                'type': 'TemplateElement',
                                'value': {
                                    'cooked': 'simple template',
                                    'raw': 'simple template'
                                },
                                'tail': true,
                                'start': 10,
                                'end': 27
                            }
                        ],
                        'start': 10,
                        'end': 27
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 4,
                        'end': 7
                    },
                    'start': 4,
                    'end': 27
                }
            ],
            'start': 0,
            'end': 28
        }
    ],
    'start': 0,
    'end': 28
}],
  ['let foo = f`template with function`;', 'let foo = f`template with function`;', Context.OptionsRanges, {
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
                        'type': 'TaggedTemplateExpression',
                        'tag': {
                            'type': 'Identifier',
                            'name': 'f',
                            'start': 10,
                            'end': 11
                        },
                        'quasi': {
                            'type': 'TemplateLiteral',
                            'expressions': [],
                            'quasis': [
                                {
                                    'type': 'TemplateElement',
                                    'value': {
                                        'cooked': 'template with function',
                                        'raw': 'template with function'
                                    },
                                    'tail': true,
                                    'start': 11,
                                    'end': 35
                                }
                            ],
                            'start': 11,
                            'end': 35
                        },
                        'start': 10,
                        'end': 35
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 4,
                        'end': 7
                    },
                    'start': 4,
                    'end': 35
                }
            ],
            'start': 0,
            'end': 36
        }
    ],
    'start': 0,
    'end': 36
}],
  ['let foo = f()`template with function call before`;', 'let foo = f()`template with function call before`;', Context.OptionsRanges, {
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
                        'type': 'TaggedTemplateExpression',
                        'tag': {
                            'type': 'CallExpression',
                            'callee': {
                                'type': 'Identifier',
                                'name': 'f',
                                'start': 10,
                                'end': 11
                            },
                            'arguments': [],
                            'start': 10,
                            'end': 13
                        },
                        'quasi': {
                            'type': 'TemplateLiteral',
                            'expressions': [],
                            'quasis': [
                                {
                                    'type': 'TemplateElement',
                                    'value': {
                                        'cooked': 'template with function call before',
                                        'raw': 'template with function call before'
                                    },
                                    'tail': true,
                                    'start': 13,
                                    'end': 49
                                }
                            ],
                            'start': 13,
                            'end': 49
                        },
                        'start': 10,
                        'end': 49
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 4,
                        'end': 7
                    },
                    'start': 4,
                    'end': 49
                }
            ],
            'start': 0,
            'end': 50
        }
    ],
    'start': 0,
    'end': 50
}],
  ['const foo = f().g`template with more complex function call`;', 'const foo = f().g`template with more complex function call`;', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'TaggedTemplateExpression',
                        'tag': {
                            'type': 'MemberExpression',
                            'object': {
                                'type': 'CallExpression',
                                'callee': {
                                    'type': 'Identifier',
                                    'name': 'f',
                                    'start': 12,
                                    'end': 13
                                },
                                'arguments': [],
                                'start': 12,
                                'end': 15
                            },
                            'computed': false,
                            'property': {
                                'type': 'Identifier',
                                'name': 'g',
                                'start': 16,
                                'end': 17
                            },
                            'start': 12,
                            'end': 17
                        },
                        'quasi': {
                            'type': 'TemplateLiteral',
                            'expressions': [],
                            'quasis': [
                                {
                                    'type': 'TemplateElement',
                                    'value': {
                                        'cooked': 'template with more complex function call',
                                        'raw': 'template with more complex function call'
                                    },
                                    'tail': true,
                                    'start': 17,
                                    'end': 59
                                }
                            ],
                            'start': 17,
                            'end': 59
                        },
                        'start': 12,
                        'end': 59
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 6,
                        'end': 9
                    },
                    'start': 6,
                    'end': 59
                }
            ],
            'start': 0,
            'end': 60
        }
    ],
    'start': 0,
    'end': 60
}],
  ['a``', 'a``', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'TaggedTemplateExpression',
                'tag': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 0,
                    'end': 1
                },
                'quasi': {
                    'type': 'TemplateLiteral',
                    'expressions': [],
                    'quasis': [
                        {
                            'type': 'TemplateElement',
                            'value': {
                                'cooked': '',
                                'raw': ''
                            },
                            'tail': true,
                            'start': 1,
                            'end': 3
                        }
                    ],
                    'start': 1,
                    'end': 3
                },
                'start': 0,
                'end': 3
            },
            'start': 0,
            'end': 3
        }
    ],
    'start': 0,
    'end': 3
}],
  ['`abc`', '`abc`', Context.OptionsRanges, {
      'body': [
        {
          'end': 5,
          'expression': {
            'end': 5,
            'expressions': [],
            'quasis': [
              {
                'end': 5,
                'start': 0,
                'tail': true,
                'type': 'TemplateElement',
                'value': {
                  'cooked': 'abc',
                  'raw': 'abc',
                }
              }
            ],
            'start': 0,
            'type': 'TemplateLiteral',
          },
          'start': 0,
          'type': 'ExpressionStatement',
       },
      ],
     'end': 5,
      'sourceType': 'script',
      'start': 0,
      'type': 'Program',
    }],
    ['`${abc}`', '`${abc}`', Context.OptionsRanges, {
        'body': [
          {
            'end': 8,
            'expression': {
              'end': 8,
              'expressions': [
                {
                  'end': 6,
                  'name': 'abc',
                  'start': 3,
                  'type': 'Identifier',
                },
              ],
              'quasis': [
                {
                  'end': 6,
                  'start': 0,
                  'tail': false,
                  'type': 'TemplateElement',
                  'value': {
                    'cooked': '',
                    'raw': '',
                  },
                },
                {
                 'end': 8,
                  'start': 6,
                  'tail': true,
                  'type': 'TemplateElement',
                  'value': {
                    'cooked': '',
                    'raw': '',
                  }
                }
              ],
              'start': 0,
              'type': 'TemplateLiteral',
            },
            'start': 0,
            'type': 'ExpressionStatement',
          },
        ],
        'end': 8,
        'sourceType': 'script',
       'start': 0,
        'type': 'Program',
      }]
];

pass('Expressions - Template (pass)', valids);

});
