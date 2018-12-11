import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Miscellaneous - Esprima terrible bug', () => {

  // See: https://github.com/jquery/esprima/issues/1944

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  [`function a() {
          var e, i, n, a, o = this._tween,
            l = o.vars.roundProps,
            h = {},
            _ = o._propLookup.roundProps;
          if ("object" != (void 0 === l ? "undefined" : t(l)) || l.push) for ("string" == typeof l && (l = l.split(",")), n = l.length; --n > -1;) h[l[n]] = Math.round;
          else for (a in l) h[a] = s(l[a]);
          for (a in h) for (e = o._firstPT; e;) i = e._next, e.pg ? e.t._mod(h) : e.n === a && (2 === e.f && e.t ? r(e.t._firstPT, h[a]) : (this._add(e.t, a, e.s, e.c, h[a]), i && (i._prev = e._prev), e._prev ? e._prev._next = i : o._firstPT === e && (o._firstPT = i), e._next = e._prev = null, o._propLookup[a] = _)), e = i;
          return !1
        }`, `function a() {
                var e, i, n, a, o = this._tween,
                  l = o.vars.roundProps,
                  h = {},
                  _ = o._propLookup.roundProps;
                if ("object" != (void 0 === l ? "undefined" : t(l)) || l.push) for ("string" == typeof l && (l = l.split(",")), n = l.length; --n > -1;) h[l[n]] = Math.round;
                else for (a in l) h[a] = s(l[a]);
                for (a in h) for (e = o._firstPT; e;) i = e._next, e.pg ? e.t._mod(h) : e.n === a && (2 === e.f && e.t ? r(e.t._firstPT, h[a]) : (this._add(e.t, a, e.s, e.c, h[a]), i && (i._prev = e._prev), e._prev ? e._prev._next = i : o._firstPT === e && (o._firstPT = i), e._next = e._prev = null, o._propLookup[a] = _)), e = i;
                return !1
              }`, Context.Empty, {
                  'body': [
                    {
                      'async': false,
                      'body': {
                        'body': [
                          {
                            'declarations': [
                              {
                                'id': {
                                  'name': 'e',
                                  'type': 'Identifier',
                                },
                                'init': null,
                                'type': 'VariableDeclarator',
                              },
                              {
                                'id': {
                                  'name': 'i',
                                  'type': 'Identifier',
                                },
                                'init': null,
                                'type': 'VariableDeclarator',
                              },
                              {
                                'id': {
                                  'name': 'n',
                                 'type': 'Identifier',
                                },
                               'init': null,
                                'type': 'VariableDeclarator'
                              },
                              {
                                'id': {
                                  'name': 'a',
                                  'type': 'Identifier',
                                },
                                'init': null,
                                'type': 'VariableDeclarator'
                              },
                             {
                                'id': {
                                  'name': 'o',
                                  'type': 'Identifier'
                                },
                                'init': {
                                  'computed': false,
                                  'object': {
                                   'type': 'ThisExpression',
                                  },
                                  'property': {
                                    'name': '_tween',
                                    'type': 'Identifier',
                                  },
                                  'type': 'MemberExpression'
                                },
                                'type': 'VariableDeclarator'
                              },
                              {
                                'id': {
                                  'name': 'l',
                                  'type': 'Identifier',
                                },
                                'init': {
                                  'computed': false,
                                  'object': {
                                    'computed': false,
                                    'object': {
                                      'name': 'o',
                                      'type': 'Identifier'
                                    },
                                    'property': {
                                      'name': 'vars',
                                      'type': 'Identifier'
                                    },
                                    'type': 'MemberExpression'
                                  },
                                  'property': {
                                    'name': 'roundProps',
                                    'type': 'Identifier',
                                  },
                                  'type': 'MemberExpression'
                                },
                                'type': 'VariableDeclarator'
                              },
                              {
                                'id': {
                                  'name': 'h',
                                  'type': 'Identifier'
                                },
                               'init': {
                                  'properties': [],
                                  'type': 'ObjectExpression',
                                },
                                'type': 'VariableDeclarator',
                              },
                              {
                               'id': {
                                  'name': '_',
                                  'type': 'Identifier',
                                },
                                'init': {
                                  'computed': false,
                                  'object': {
                                    'computed': false,
                                   'object': {
                                      'name': 'o',
                                      'type': 'Identifier',
                                    },
                                    'property': {
                                      'name': '_propLookup',
                                      'type': 'Identifier',
                                    },
                                    'type': 'MemberExpression',
                                  },
                                  'property': {
                                    'name': 'roundProps',
                                    'type': 'Identifier',
                                  },
                                  'type': 'MemberExpression',
                                },
                                'type': 'VariableDeclarator'
                              }
                            ],
                            'kind': 'var',
                            'type': 'VariableDeclaration'
                          },
                          {
                            'alternate': {
                              'body': {
                                'expression': {
                                  'left': {
                                    'computed': true,
                                    'object': {
                                      'name': 'h',
                                      'type': 'Identifier',
                                    },
                                    'property': {
                                      'name': 'a',
                                      'type': 'Identifier'
                                    },
                                    'type': 'MemberExpression'
                                  },
                                  'operator': '=',
                                  'right': {
                                    'arguments': [
                                      {
                                        'computed': true,
                                        'object': {
                                          'name': 'l',
                                          'type': 'Identifier'
                                        },
                                        'property': {
                                          'name': 'a',
                                          'type': 'Identifier',
                                        },
                                        'type': 'MemberExpression',
                                      },
                                    ],
                                    'callee': {
                                      'name': 's',
                                      'type': 'Identifier',
                                    },
                                    'type': 'CallExpression'
                                  },
                                  'type': 'AssignmentExpression'
                               },
                                'type': 'ExpressionStatement'
                              },
                              'left': {
                                'name': 'a',
                                'type': 'Identifier'
                              },
                              'right': {
                                'name': 'l',
                                'type': 'Identifier'
                              },
                              'type': 'ForInStatement'
                            },
                            'consequent': {
                              'body': {
                                'expression': {
                                  'left': {
                                    'computed': true,
                                    'object': {
                                      'name': 'h',
                                      'type': 'Identifier',
                                    },
                                    'property': {
                                      'computed': true,
                                      'object': {
                                        'name': 'l',
                                        'type': 'Identifier',
                                      },
                                      'property': {
                                        'name': 'n',
                                        'type': 'Identifier',
                                      },
                                      'type': 'MemberExpression',
                                    },
                                    'type': 'MemberExpression',
                                  },
                                  'operator': '=',
                                  'right': {
                                    'computed': false,
                                    'object': {
                                      'name': 'Math',
                                      'type': 'Identifier',
                                    },
                                    'property': {
                                      'name': 'round',
                                      'type': 'Identifier',
                                    },
                                    'type': 'MemberExpression',
                                  },
                                  'type': 'AssignmentExpression',
                                },
                                'type': 'ExpressionStatement',
                              },
                              'init': {
                                'expressions': [
                                  {
                                    'left': {
                                      'left': {
                                        'raw': null,
                                        'type': 'Literal',
                                        'value': 'string',
                                      },
                                      'operator': '==',
                                      'right': {
                                        'argument': {
                                          'name': 'l',
                                          'type': 'Identifier'
                                        },
                                        'operator': 'typeof',
                                        'prefix': true,
                                       'type': 'UnaryExpression'
                                      },
                                      'type': 'BinaryExpression'
                                    },
                                    'operator': '&&',
                                    'right': {
                                      'left': {
                                        'name': 'l',
                                        'type': 'Identifier',
                                      },
                                      'operator': '=',
                                      'right': {
                                        'arguments': [
                                         {
                                            'raw': null,
                                            'type': 'Literal',
                                            'value': ','
                                          }
                                        ],
                                        'callee': {
                                          'computed': false,
                                          'object': {
                                            'name': 'l',
                                            'type': 'Identifier'
                                          },
                                          'property': {
                                            'name': 'split',
                                            'type': 'Identifier',
                                          },
                                          'type': 'MemberExpression'
                                        },
                                        'type': 'CallExpression'
                                      },
                                      'type': 'AssignmentExpression'
                                    },
                                    'type': 'LogicalExpression'
                                  },
                                  {
                                    'left': {
                                      'name': 'n',
                                      'type': 'Identifier',
                                    },
                                    'operator': '=',
                                    'right': {
                                      'computed': false,
                                      'object': {
                                        'name': 'l',
                                        'type': 'Identifier',
                                      },
                                      'property': {
                                        'name': 'length',
                                        'type': 'Identifier',
                                      },
                                      'type': 'MemberExpression',
                                    },
                                    'type': 'AssignmentExpression',
                                  },
                                ],
                                'type': 'SequenceExpression',
                              },
                              'test': {
                                'left': {
                                  'argument': {
                                    'name': 'n',
                                    'type': 'Identifier',
                                  },
                                  'operator': '--',
                                  'prefix': true,
                                  'type': 'UpdateExpression',
                                },
                                'operator': '>',
                                'right': {
                                  'argument': {
                                    'raw': null,
                                    'type': 'Literal',
                                    'value': 1
                                  },
                                  'operator': '-',
                                  'prefix': true,
                                  'type': 'UnaryExpression',
                                },
                                'type': 'BinaryExpression',
                              },
                              'type': 'ForStatement',
                              'update': null,
                            },
                           'test': {
                              'left': {
                                'left': {
                                  'raw': null,
                                  'type': 'Literal',
                                  'value': 'object',
                                },
                                'operator': '!=',
                               'right': {
                                  'alternate': {
                                    'arguments': [
                                     {
                                        'name': 'l',
                                        'type': 'Identifier'
                                      }
                                    ],
                                    'callee': {
                                      'name': 't',
                                      'type': 'Identifier'
                                    },
                                    'type': 'CallExpression'
                                  },
                                  'consequent': {
                                    'raw': null,
                                    'type': 'Literal',
                                    'value': 'undefined'
                                 },
                                  'test': {
                                    'left': {
                                      'argument': {
                                        'raw': null,
                                        'type': 'Literal',
                                        'value': 0
                                      },
                                      'operator': 'void',
                                      'prefix': true,
                                      'type': 'UnaryExpression'
                                    },
                                    'operator': '===',
                                   'right': {
                                      'name': 'l',
                                      'type': 'Identifier'
                                   },
                                    'type': 'BinaryExpression'
                                  },
                                  'type': 'ConditionalExpression'
                                },
                                'type': 'BinaryExpression'
                              },
                              'operator': '||',
                              'right': {
                                'computed': false,
                                'object': {
                                  'name': 'l',
                                  'type': 'Identifier'
                               },
                                'property': {
                                  'name': 'push',
                                  'type': 'Identifier'
                                },
                                'type': 'MemberExpression'
                              },
                             'type': 'LogicalExpression'
                            },
                            'type': 'IfStatement'
                          },
                          {
                            'body': {
                              'body': {
                                'expression': {
                                  'expressions': [
                                    {
                                      'left': {
                                        'name': 'i',
                                        'type': 'Identifier',
                                      },
                                      'operator': '=',
                                      'right': {
                                        'computed': false,
                                        'object': {
                                          'name': 'e',
                                          'type': 'Identifier',
                                        },
                                        'property': {
                                          'name': '_next',
                                         'type': 'Identifier',
                                        },
                                        'type': 'MemberExpression',
                                      },
                                      'type': 'AssignmentExpression',
                                    },
                                    {
                                      'alternate': {
                                        'left': {
                                          'left': {
                                            'computed': false,
                                            'object': {
                                              'name': 'e',
                                              'type': 'Identifier',
                                            },
                                            'property': {
                                              'name': 'n',
                                              'type': 'Identifier',
                                            },
                                            'type': 'MemberExpression',
                                          },
                                          'operator': '===',
                                          'right': {
                                           'name': 'a',
                                            'type': 'Identifier',
                                          },
                                          'type': 'BinaryExpression',
                                        },
                                        'operator': '&&',
                                       'right': {
                                          'alternate': {
                                           'expressions': [
                                              {
                                                'arguments': [
                                                  {
                                                    'computed': false,
                                                    'object': {
                                                      'name': 'e',
                                                      'type': 'Identifier'
                                                    },
                                                    'property': {
                                                      'name': 't',
                                                      'type': 'Identifier'
                                                    },
                                                    'type': 'MemberExpression'
                                                  },
                                                  {
                                                    'name': 'a',
                                                   'type': 'Identifier'
                                                  },
                                                  {
                                                    'computed': false,
                                                    'object': {
                                                      'name': 'e',
                                                      'type': 'Identifier',
                                                    },
                                                    'property': {
                                                      'name': 's',
                                                      'type': 'Identifier',
                                                    },
                                                    'type': 'MemberExpression',
                                                  },
                                                  {
                                                    'computed': false,
                                                    'object': {
                                                      'name': 'e',
                                                      'type': 'Identifier',
                                                    },
                                                    'property': {
                                                      'name': 'c',
                                                      'type': 'Identifier',
                                                    },
                                                    'type': 'MemberExpression',
                                                  },
                                                  {
                                                    'computed': true,
                                                    'object': {
                                                      'name': 'h',
                                                      'type': 'Identifier',
                                                    },
                                                    'property': {
                                                      'name': 'a',
                                                      'type': 'Identifier'
                                                    },
                                                   'type': 'MemberExpression'
                                                  }
                                                ],
                                                'callee': {
                                                  'computed': false,
                                                  'object': {
                                                    'type': 'ThisExpression'
                                                  },
                                                  'property': {
                                                    'name': '_add',
                                                    'type': 'Identifier'
                                                  },
                                                  'type': 'MemberExpression'
                                                },
                                               'type': 'CallExpression'
                                              },
                                              {
                                                'left': {
                                                  'name': 'i',
                                                  'type': 'Identifier',
                                                },
                                               'operator': '&&',
                                                'right': {
                                                  'left': {
                                                    'computed': false,
                                                    'object': {
                                                      'name': 'i',
                                                      'type': 'Identifier'
                                                    },
                                                    'property': {
                                                      'name': '_prev',
                                                      'type': 'Identifier'
                                                    },
                                                    'type': 'MemberExpression'
                                                  },
                                                  'operator': '=',
                                                  'right': {
                                                    'computed': false,
                                                    'object': {
                                                      'name': 'e',
                                                      'type': 'Identifier'
                                                    },
                                                    'property': {
                                                      'name': '_prev',
                                                      'type': 'Identifier'
                                                    },
                                                    'type': 'MemberExpression'
                                                  },
                                                  'type': 'AssignmentExpression'
                                                },
                                                'type': 'LogicalExpression'
                                              },
                                              {
                                                'alternate': {
                                                  'left': {
                                                    'left': {
                                                      'computed': false,
                                                      'object': {
                                                        'name': 'o',
                                                        'type': 'Identifier',
                                                      },
                                                      'property': {
                                                        'name': '_firstPT',
                                                        'type': 'Identifier',
                                                      },
                                                      'type': 'MemberExpression',
                                                    },
                                                    'operator': '===',
                                                   'right': {
                                                      'name': 'e',
                                                      'type': 'Identifier',
                                                    },
                                                    'type': 'BinaryExpression'
                                                  },
                                                  'operator': '&&',
                                                  'right': {
                                                    'left': {
                                                      'computed': false,
                                                      'object': {
                                                        'name': 'o',
                                                        'type': 'Identifier',
                                                      },
                                                      'property': {
                                                        'name': '_firstPT',
                                                        'type': 'Identifier',
                                                      },
                                                      'type': 'MemberExpression',
                                                    },
                                                    'operator': '=',
                                                    'right': {
                                                      'name': 'i',
                                                      'type': 'Identifier',
                                                    },
                                                    'type': 'AssignmentExpression'
                                                  },
                                                  'type': 'LogicalExpression'
                                                },
                                                'consequent': {
                                                  'left': {
                                                    'computed': false,
                                                    'object': {
                                                      'computed': false,
                                                      'object': {
                                                        'name': 'e',
                                                        'type': 'Identifier'
                                                      },
                                                     'property': {
                                                        'name': '_prev',
                                                        'type': 'Identifier'
                                                      },
                                                      'type': 'MemberExpression',
                                                    },
                                                    'property': {
                                                     'name': '_next',
                                                      'type': 'Identifier',
                                                    },
                                                   'type': 'MemberExpression',
                                                  },
                                                 'operator': '=',
                                                  'right': {
                                                    'name': 'i',
                                                    'type': 'Identifier',
                                                  },
                                                  'type': 'AssignmentExpression',
                                                },
                                                'test': {
                                                  'computed': false,
                                                  'object': {
                                                    'name': 'e',
                                                    'type': 'Identifier',
                                                  },
                                                  'property': {
                                                    'name': '_prev',
                                                    'type': 'Identifier',
                                                  },
                                                  'type': 'MemberExpression',
                                                },
                                                'type': 'ConditionalExpression'
                                              },
                                              {
                                                'left': {
                                                  'computed': false,
                                                  'object': {
                                                    'name': 'e',
                                                    'type': 'Identifier'
                                                  },
                                                  'property': {
                                                    'name': '_next',
                                                    'type': 'Identifier',
                                                  },
                                                  'type': 'MemberExpression',
                                                },
                                                'operator': '=',
                                                'right': {
                                                  'left': {
                                                    'computed': false,
                                                    'object': {
                                                      'name': 'e',
                                                      'type': 'Identifier',
                                                    },
                                                    'property': {
                                                      'name': '_prev',
                                                      'type': 'Identifier',
                                                    },
                                                    'type': 'MemberExpression'
                                                  },
                                                  'operator': '=',
                                                  'right': {
                                                    'type': 'Literal',
                                                   'value': null,
                                                  },
                                                  'type': 'AssignmentExpression'
                                                },
                                                'type': 'AssignmentExpression'
                                              },
                                              {
                                                'left': {
                                                 'computed': true,
                                                  'object': {
                                                    'computed': false,
                                                    'object': {
                                                      'name': 'o',
                                                      'type': 'Identifier',
                                                    },
                                                    'property': {
                                                      'name': '_propLookup',
                                                      'type': 'Identifier',
                                                    },
                                                    'type': 'MemberExpression',
                                                 },
                                                  'property': {
                                                    'name': 'a',
                                                    'type': 'Identifier',
                                                  },
                                                  'type': 'MemberExpression',
                                                },
                                                'operator': '=',
                                                'right': {
                                                  'name': '_',
                                                  'type': 'Identifier',
                                                },
                                                'type': 'AssignmentExpression',
                                              },
                                            ],
                                            'type': 'SequenceExpression'
                                          },
                                          'consequent': {
                                            'arguments': [
                                              {
                                                'computed': false,
                                                'object': {
                                                  'computed': false,
                                                  'object': {
                                                    'name': 'e',
                                                    'type': 'Identifier',
                                                  },
                                                  'property': {
                                                    'name': 't',
                                                    'type': 'Identifier',
                                                  },
                                                  'type': 'MemberExpression',
                                                },
                                                'property': {
                                                 'name': '_firstPT',
                                                  'type': 'Identifier',
                                                },
                                                'type': 'MemberExpression',
                                             },
                                              {
                                                'computed': true,
                                                'object': {
                                                  'name': 'h',
                                                  'type': 'Identifier',
                                                },
                                                'property': {
                                                  'name': 'a',
                                                  'type': 'Identifier'
                                                },
                                                'type': 'MemberExpression'
                                              }
                                            ],
                                            'callee': {
                                              'name': 'r',
                                              'type': 'Identifier',
                                            },
                                            'type': 'CallExpression',
                                          },
                                          'test': {
                                            'left': {
                                              'left': {
                                                'raw': null,
                                                'type': 'Literal',
                                               'value': 2,
                                              },
                                              'operator': '===',
                                              'right': {
                                                'computed': false,
                                                'object': {
                                                  'name': 'e',
                                                  'type': 'Identifier',
                                                },
                                                'property': {
                                                  'name': 'f',
                                                  'type': 'Identifier',
                                                },
                                                'type': 'MemberExpression',
                                              },
                                              'type': 'BinaryExpression',
                                            },
                                            'operator': '&&',
                                            'right': {
                                              'computed': false,
                                              'object': {
                                                'name': 'e',
                                                'type': 'Identifier'
                                              },
                                              'property': {
                                                'name': 't',
                                                'type': 'Identifier'
                                              },
                                              'type': 'MemberExpression'
                                            },
                                            'type': 'LogicalExpression'
                                          },
                                          'type': 'ConditionalExpression'
                                        },
                                        'type': 'LogicalExpression'
                                      },
                                      'consequent': {
                                        'arguments': [
                                          {
                                            'name': 'h',
                                            'type': 'Identifier'
                                          }
                                        ],
                                        'callee': {
                                          'computed': false,
                                         'object': {
                                            'computed': false,
                                            'object': {
                                              'name': 'e',
                                              'type': 'Identifier',
                                            },
                                            'property': {
                                              'name': 't',
                                              'type': 'Identifier',
                                            },
                                            'type': 'MemberExpression',
                                          },
                                          'property': {
                                            'name': '_mod',
                                            'type': 'Identifier',
                                          },
                                          'type': 'MemberExpression',
                                        },
                                        'type': 'CallExpression',
                                      },
                                      'test': {
                                       'computed': false,
                                        'object': {
                                          'name': 'e',
                                          'type': 'Identifier',
                                        },
                                        'property': {
                                          'name': 'pg',
                                          'type': 'Identifier',
                                        },
                                        'type': 'MemberExpression'
                                      },
                                      'type': 'ConditionalExpression'
                                    },
                                    {
                                      'left': {
                                        'name': 'e',
                                        'type': 'Identifier'
                                     },
                                      'operator': '=',
                                      'right': {
                                        'name': 'i',
                                        'type': 'Identifier'
                                     },
                                      'type': 'AssignmentExpression'
                                    }
                                  ],
                                  'type': 'SequenceExpression',
                                },
                                'type': 'ExpressionStatement',
                              },
                              'init': {
                                'left': {
                                  'name': 'e',
                                  'type': 'Identifier',
                                },
                                'operator': '=',
                                'right': {
                                  'computed': false,
                                  'object': {
                                    'name': 'o',
                                    'type': 'Identifier',
                                  },
                                  'property': {
                                    'name': '_firstPT',
                                    'type': 'Identifier',
                                  },
                                  'type': 'MemberExpression',
                                },
                                'type': 'AssignmentExpression',
                              },
                              'test': {
                                'name': 'e',
                                'type': 'Identifier',
                              },
                              'type': 'ForStatement',
                              'update': null,
                            },
                            'left': {
                              'name': 'a',
                              'type': 'Identifier',
                            },
                            'right': {
                              'name': 'h',
                              'type': 'Identifier',
                            },
                            'type': 'ForInStatement',
                          },
                          {
                            'argument': {
                              'argument': {
                                'raw': null,
                                'type': 'Literal',
                                'value': 1
                              },
                              'operator': '!',
                             'prefix': true,
                              'type': 'UnaryExpression',
                            },
                            'type': 'ReturnStatement',
                          },
                        ],
                        'type': 'BlockStatement',
                      },
                      'expression': false,
                      'generator': false,
                      'id': {
                        'name': 'a',
                        'type': 'Identifier',
                      },
                      'params': [],
                      'type': 'FunctionDeclaration',
                    },
                  ],
                 'sourceType': 'script',
                  'type': 'Program'
                }]
];

pass('Miscellaneous - ASI (pass)', valids);

});
