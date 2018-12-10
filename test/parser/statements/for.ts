import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - For', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['for (j=x; j<10; ++j) { foo = j }', 'for (j=x; j<10; ++j) { foo = j }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'AssignmentExpression',
                            'left': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 23,
                                'end': 26,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 23
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 26
                                    }
                                }
                            },
                            'operator': '=',
                            'right': {
                                'type': 'Identifier',
                                'name': 'j',
                                'start': 29,
                                'end': 30,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 29
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 30
                                    }
                                }
                            },
                            'start': 23,
                            'end': 30,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 23
                                },
                                'end': {
                                    'line': 1,
                                    'column': 30
                                }
                            }
                        },
                        'start': 23,
                        'end': 30,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 23
                            },
                            'end': {
                                'line': 1,
                                'column': 30
                            }
                        }
                    }
                ],
                'start': 21,
                'end': 32,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 32
                    }
                }
            },
            'init': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'j',
                    'start': 5,
                    'end': 6,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 5
                        },
                        'end': {
                            'line': 1,
                            'column': 6
                        }
                    }
                },
                'operator': '=',
                'right': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 7,
                    'end': 8,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 7
                        },
                        'end': {
                            'line': 1,
                            'column': 8
                        }
                    }
                },
                'start': 5,
                'end': 8,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 8
                    }
                }
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'j',
                    'start': 10,
                    'end': 11,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 10
                        },
                        'end': {
                            'line': 1,
                            'column': 11
                        }
                    }
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 10,
                    'start': 12,
                    'end': 14,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 12
                        },
                        'end': {
                            'line': 1,
                            'column': 14
                        }
                    }
                },
                'operator': '<',
                'start': 10,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 10
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            },
            'update': {
                'type': 'UpdateExpression',
                'argument': {
                    'type': 'Identifier',
                    'name': 'j',
                    'start': 18,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 18
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                },
                'operator': '++',
                'prefix': true,
                'start': 16,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 16
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'start': 0,
            'end': 32,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 32
                }
            }
        }
    ],
    'start': 0,
    'end': 32,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 32
        }
    }
}],
  [`        for ("boolean" == typeof a && (l = a, a = arguments[s] ||
    {}, s++), "object" == typeof a ||
    g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
if (null != (e = arguments[s]))
for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) ||
(i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n)
? n : [])
: o = n && w.isPlainObject(n)
? n : {}, a[t] = w.extend(l, o, r))
: void 0 !== r && (a[t] = r));`, `for ("boolean" == typeof a && (l = a, a = arguments[s] ||
  {}, s++), "object" == typeof a ||
  g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
if (null != (e = arguments[s]))
for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) ||
(i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n)
? n : [])
: o = n && w.isPlainObject(n)
? n : {}, a[t] = w.extend(l, o, r))
: void 0 !== r && (a[t] = r));`, Context.Empty, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ForStatement',
          'body': {
              'type': 'IfStatement',
              'test': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Literal',
                      'value': null
                  },
                  'right': {
                      'type': 'AssignmentExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'e'
                      },
                      'operator': '=',
                      'right': {
                          'type': 'MemberExpression',
                          'object': {
                              'type': 'Identifier',
                              'name': 'arguments'
                          },
                          'computed': true,
                          'property': {
                              'type': 'Identifier',
                              'name': 's'
                          }
                      }
                  },
                  'operator': '!='
              },
              'consequent': {
                  'type': 'ForInStatement',
                  'body': {
                      'type': 'ExpressionStatement',
                      'expression': {
                          'type': 'SequenceExpression',
                          'expressions': [
                              {
                                  'type': 'AssignmentExpression',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'n'
                                  },
                                  'operator': '=',
                                  'right': {
                                      'type': 'MemberExpression',
                                      'object': {
                                          'type': 'Identifier',
                                          'name': 'a'
                                      },
                                      'computed': true,
                                      'property': {
                                          'type': 'Identifier',
                                          'name': 't'
                                      }
                                  }
                              },
                              {
                                  'type': 'LogicalExpression',
                                  'left': {
                                      'type': 'BinaryExpression',
                                      'left': {
                                          'type': 'Identifier',
                                          'name': 'a'
                                      },
                                      'right': {
                                          'type': 'AssignmentExpression',
                                          'left': {
                                              'type': 'Identifier',
                                              'name': 'r'
                                          },
                                          'operator': '=',
                                          'right': {
                                              'type': 'MemberExpression',
                                              'object': {
                                                  'type': 'Identifier',
                                                  'name': 'e'
                                              },
                                              'computed': true,
                                              'property': {
                                                  'type': 'Identifier',
                                                  'name': 't'
                                              }
                                          }
                                      },
                                      'operator': '!=='
                                  },
                                  'right': {
                                      'type': 'ConditionalExpression',
                                      'test': {
                                          'type': 'LogicalExpression',
                                          'left': {
                                              'type': 'LogicalExpression',
                                              'left': {
                                                  'type': 'Identifier',
                                                  'name': 'l'
                                              },
                                              'right': {
                                                  'type': 'Identifier',
                                                  'name': 'r'
                                              },
                                              'operator': '&&'
                                          },
                                          'right': {
                                              'type': 'LogicalExpression',
                                              'left': {
                                                  'type': 'CallExpression',
                                                  'callee': {
                                                      'type': 'MemberExpression',
                                                      'object': {
                                                          'type': 'Identifier',
                                                          'name': 'w'
                                                      },
                                                      'computed': false,
                                                      'property': {
                                                          'type': 'Identifier',
                                                          'name': 'isPlainObject'
                                                      }
                                                  },
                                                  'arguments': [
                                                      {
                                                          'type': 'Identifier',
                                                          'name': 'r'
                                                      }
                                                  ]
                                              },
                                              'right': {
                                                  'type': 'AssignmentExpression',
                                                  'left': {
                                                      'type': 'Identifier',
                                                      'name': 'i'
                                                  },
                                                  'operator': '=',
                                                  'right': {
                                                      'type': 'CallExpression',
                                                      'callee': {
                                                          'type': 'MemberExpression',
                                                          'object': {
                                                              'type': 'Identifier',
                                                              'name': 'Array'
                                                          },
                                                          'computed': false,
                                                          'property': {
                                                              'type': 'Identifier',
                                                              'name': 'isArray'
                                                          }
                                                      },
                                                      'arguments': [
                                                          {
                                                              'type': 'Identifier',
                                                              'name': 'r'
                                                          }
                                                      ]
                                                  }
                                              },
                                              'operator': '||'
                                          },
                                          'operator': '&&'
                                      },
                                      'consequent': {
                                          'type': 'SequenceExpression',
                                          'expressions': [
                                              {
                                                  'type': 'ConditionalExpression',
                                                  'test': {
                                                      'type': 'Identifier',
                                                      'name': 'i'
                                                  },
                                                  'consequent': {
                                                      'type': 'SequenceExpression',
                                                      'expressions': [
                                                          {
                                                              'type': 'AssignmentExpression',
                                                              'left': {
                                                                  'type': 'Identifier',
                                                                  'name': 'i'
                                                              },
                                                              'operator': '=',
                                                              'right': {
                                                                  'type': 'UnaryExpression',
                                                                  'operator': '!',
                                                                  'argument': {
                                                                      'type': 'Literal',
                                                                      raw: null,
                                                                      'value': 1
                                                                  },
                                                                  'prefix': true
                                                              }
                                                          },
                                                          {
                                                              'type': 'AssignmentExpression',
                                                              'left': {
                                                                  'type': 'Identifier',
                                                                  'name': 'o'
                                                              },
                                                              'operator': '=',
                                                              'right': {
                                                                  'type': 'ConditionalExpression',
                                                                  'test': {
                                                                      'type': 'LogicalExpression',
                                                                      'left': {
                                                                          'type': 'Identifier',
                                                                          'name': 'n'
                                                                      },
                                                                      'right': {
                                                                          'type': 'CallExpression',
                                                                          'callee': {
                                                                              'type': 'MemberExpression',
                                                                              'object': {
                                                                                  'type': 'Identifier',
                                                                                  'name': 'Array'
                                                                              },
                                                                              'computed': false,
                                                                              'property': {
                                                                                  'type': 'Identifier',
                                                                                  'name': 'isArray'
                                                                              }
                                                                          },
                                                                          'arguments': [
                                                                              {
                                                                                  'type': 'Identifier',
                                                                                  'name': 'n'
                                                                              }
                                                                          ]
                                                                      },
                                                                      'operator': '&&'
                                                                  },
                                                                  'consequent': {
                                                                      'type': 'Identifier',
                                                                      'name': 'n'
                                                                  },
                                                                  'alternate': {
                                                                      'type': 'ArrayExpression',
                                                                      'elements': []
                                                                  }
                                                              }
                                                          }
                                                      ]
                                                  },
                                                  'alternate': {
                                                      'type': 'AssignmentExpression',
                                                      'left': {
                                                          'type': 'Identifier',
                                                          'name': 'o'
                                                      },
                                                      'operator': '=',
                                                      'right': {
                                                          'type': 'ConditionalExpression',
                                                          'test': {
                                                              'type': 'LogicalExpression',
                                                              'left': {
                                                                  'type': 'Identifier',
                                                                  'name': 'n'
                                                              },
                                                              'right': {
                                                                  'type': 'CallExpression',
                                                                  'callee': {
                                                                      'type': 'MemberExpression',
                                                                      'object': {
                                                                          'type': 'Identifier',
                                                                          'name': 'w'
                                                                      },
                                                                      'computed': false,
                                                                      'property': {
                                                                          'type': 'Identifier',
                                                                          'name': 'isPlainObject'
                                                                      }
                                                                  },
                                                                  'arguments': [
                                                                      {
                                                                          'type': 'Identifier',
                                                                          'name': 'n'
                                                                      }
                                                                  ]
                                                              },
                                                              'operator': '&&'
                                                          },
                                                          'consequent': {
                                                              'type': 'Identifier',
                                                              'name': 'n'
                                                          },
                                                          'alternate': {
                                                              'type': 'ObjectExpression',
                                                              'properties': []
                                                          }
                                                      }
                                                  }
                                              },
                                              {
                                                  'type': 'AssignmentExpression',
                                                  'left': {
                                                      'type': 'MemberExpression',
                                                      'object': {
                                                          'type': 'Identifier',
                                                          'name': 'a'
                                                      },
                                                      'computed': true,
                                                      'property': {
                                                          'type': 'Identifier',
                                                          'name': 't'
                                                      }
                                                  },
                                                  'operator': '=',
                                                  'right': {
                                                      'type': 'CallExpression',
                                                      'callee': {
                                                          'type': 'MemberExpression',
                                                          'object': {
                                                              'type': 'Identifier',
                                                              'name': 'w'
                                                          },
                                                          'computed': false,
                                                          'property': {
                                                              'type': 'Identifier',
                                                              'name': 'extend'
                                                          }
                                                      },
                                                      'arguments': [
                                                          {
                                                              'type': 'Identifier',
                                                              'name': 'l'
                                                          },
                                                          {
                                                              'type': 'Identifier',
                                                              'name': 'o'
                                                          },
                                                          {
                                                              'type': 'Identifier',
                                                              'name': 'r'
                                                          }
                                                      ]
                                                  }
                                              }
                                          ]
                                      },
                                      'alternate': {
                                          'type': 'LogicalExpression',
                                          'left': {
                                              'type': 'BinaryExpression',
                                              'left': {
                                                  'type': 'UnaryExpression',
                                                  'operator': 'void',
                                                  'argument': {
                                                      'type': 'Literal',
                                                      raw: null,
                                                      'value': 0
                                                  },
                                                  'prefix': true
                                              },
                                              'right': {
                                                  'type': 'Identifier',
                                                  'name': 'r'
                                              },
                                              'operator': '!=='
                                          },
                                          'right': {
                                              'type': 'AssignmentExpression',
                                              'left': {
                                                  'type': 'MemberExpression',
                                                  'object': {
                                                      'type': 'Identifier',
                                                      'name': 'a'
                                                  },
                                                  'computed': true,
                                                  'property': {
                                                      'type': 'Identifier',
                                                      'name': 't'
                                                  }
                                              },
                                              'operator': '=',
                                              'right': {
                                                  'type': 'Identifier',
                                                  'name': 'r'
                                              }
                                          },
                                          'operator': '&&'
                                      }
                                  },
                                  'operator': '&&'
                              }
                          ]
                      }
                  },
                  'left': {
                      'type': 'Identifier',
                      'name': 't'
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'e'
                  }
              },
              'alternate': null
          },
          'init': {
              'type': 'SequenceExpression',
              'expressions': [
                  {
                      'type': 'LogicalExpression',
                      'left': {
                          'type': 'BinaryExpression',
                          'left': {
                              'type': 'Literal',
                              raw: null,
                              'value': 'boolean'
                          },
                          'right': {
                              'type': 'UnaryExpression',
                              'operator': 'typeof',
                              'argument': {
                                  'type': 'Identifier',
                                  'name': 'a'
                              },
                              'prefix': true
                          },
                          'operator': '=='
                      },
                      'right': {
                          'type': 'SequenceExpression',
                          'expressions': [
                              {
                                  'type': 'AssignmentExpression',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'l'
                                  },
                                  'operator': '=',
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'a'
                                  }
                              },
                              {
                                  'type': 'AssignmentExpression',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'a'
                                  },
                                  'operator': '=',
                                  'right': {
                                      'type': 'LogicalExpression',
                                      'left': {
                                          'type': 'MemberExpression',
                                          'object': {
                                              'type': 'Identifier',
                                              'name': 'arguments'
                                          },
                                          'computed': true,
                                          'property': {
                                              'type': 'Identifier',
                                              'name': 's'
                                          }
                                      },
                                      'right': {
                                          'type': 'ObjectExpression',
                                          'properties': []
                                      },
                                      'operator': '||'
                                  }
                              },
                              {
                                  'type': 'UpdateExpression',
                                  'argument': {
                                      'type': 'Identifier',
                                      'name': 's'
                                  },
                                  'operator': '++',
                                  'prefix': false
                              }
                          ]
                      },
                      'operator': '&&'
                  },
                  {
                      'type': 'LogicalExpression',
                      'left': {
                          'type': 'LogicalExpression',
                          'left': {
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 'object'
                              },
                              'right': {
                                  'type': 'UnaryExpression',
                                  'operator': 'typeof',
                                  'argument': {
                                      'type': 'Identifier',
                                      'name': 'a'
                                  },
                                  'prefix': true
                              },
                              'operator': '=='
                          },
                          'right': {
                              'type': 'CallExpression',
                              'callee': {
                                  'type': 'Identifier',
                                  'name': 'g'
                              },
                              'arguments': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'a'
                                  }
                              ]
                          },
                          'operator': '||'
                      },
                      'right': {
                          'type': 'AssignmentExpression',
                          'left': {
                              'type': 'Identifier',
                              'name': 'a'
                          },
                          'operator': '=',
                          'right': {
                              'type': 'ObjectExpression',
                              'properties': []
                          }
                      },
                      'operator': '||'
                  },
                  {
                      'type': 'LogicalExpression',
                      'left': {
                          'type': 'BinaryExpression',
                          'left': {
                              'type': 'Identifier',
                              'name': 's'
                          },
                          'right': {
                              'type': 'Identifier',
                              'name': 'u'
                          },
                          'operator': '==='
                      },
                      'right': {
                          'type': 'SequenceExpression',
                          'expressions': [
                              {
                                  'type': 'AssignmentExpression',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'a'
                                  },
                                  'operator': '=',
                                  'right': {
                                      'type': 'ThisExpression'
                                  }
                              },
                              {
                                  'type': 'UpdateExpression',
                                  'argument': {
                                      'type': 'Identifier',
                                      'name': 's'
                                  },
                                  'operator': '--',
                                  'prefix': false
                              }
                          ]
                      },
                      'operator': '&&'
                  }
              ]
          },
          'test': {
              'type': 'BinaryExpression',
              'left': {
                  'type': 'Identifier',
                  'name': 's'
              },
              'right': {
                  'type': 'Identifier',
                  'name': 'u'
              },
              'operator': '<'
          },
          'update': {
              'type': 'UpdateExpression',
              'argument': {
                  'type': 'Identifier',
                  'name': 's'
              },
              'operator': '++',
              'prefix': false
          }
      }
  ]
}],
  ['for (let { w = a(), x = b(), y = c(), z = d() } = { w: null, x: 0, y: false, z: "" }; e < 1; ) {}', 'for (let { w = a(), x = b(), y = c(), z = d() } = { w: null, x: 0, y: false, z: "" }; e < 1; ) {}', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': []
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ObjectExpression',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'w'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        'value': null
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                },
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 0
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                },
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'y'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        'value': false
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                },
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'z'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': ''
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'w'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'w'
                                        },
                                        'right': {
                                            'type': 'CallExpression',
                                            'callee': {
                                                'type': 'Identifier',
                                                'name': 'a'
                                            },
                                            'arguments': []
                                        }
                                    },
                                    'method': false,
                                    'shorthand': true
                                },
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'x'
                                        },
                                        'right': {
                                            'type': 'CallExpression',
                                            'callee': {
                                                'type': 'Identifier',
                                                'name': 'b'
                                            },
                                            'arguments': []
                                        }
                                    },
                                    'method': false,
                                    'shorthand': true
                                },
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'y'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'y'
                                        },
                                        'right': {
                                            'type': 'CallExpression',
                                            'callee': {
                                                'type': 'Identifier',
                                                'name': 'c'
                                            },
                                            'arguments': []
                                        }
                                    },
                                    'method': false,
                                    'shorthand': true
                                },
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'z'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'z'
                                        },
                                        'right': {
                                            'type': 'CallExpression',
                                            'callee': {
                                                'type': 'Identifier',
                                                'name': 'd'
                                            },
                                            'arguments': []
                                        }
                                    },
                                    'method': false,
                                    'shorthand': true
                                }
                            ]
                        }
                    }
                ]
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'e'
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1
                },
                'operator': '<'
            },
            'update': null
        }
    ]
}],
  ['for (let [,] = a(); b < 1; ) {}', 'for (let [,] = a(); b < 1; ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 29,
                'end': 31,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 29
                    },
                    'end': {
                        'line': 1,
                        'column': 31
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'CallExpression',
                            'callee': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 15,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 15
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'arguments': [],
                            'start': 15,
                            'end': 18,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 15
                                },
                                'end': {
                                    'line': 1,
                                    'column': 18
                                }
                            }
                        },
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [
                                null
                            ],
                            'start': 9,
                            'end': 12,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 12
                                }
                            }
                        },
                        'start': 9,
                        'end': 18,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 18
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'b',
                    'start': 20,
                    'end': 21,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 20
                        },
                        'end': {
                            'line': 1,
                            'column': 21
                        }
                    }
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1,
                    'start': 24,
                    'end': 25,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 24
                        },
                        'end': {
                            'line': 1,
                            'column': 25
                        }
                    }
                },
                'operator': '<',
                'start': 20,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            },
            'update': null,
            'start': 0,
            'end': 31,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 31
                }
            }
        }
    ],
    'start': 0,
    'end': 31,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 31
        }
    }
}],
  [`for (const { x, } = { x: 23 }; a < 1; ) {};
  for (const { x, } = { x: 23 }; a < 1; ) {};
  for (const { x, } = { x: 23 }; a < 1; ) {};
  for (const { x, } = { x: 23 }; a < 1; ) {};
  for (const { x, } = { x: 23 }; a < 1; ) {};`, `for (const { x, } = { x: 23 }; a < 1; ) {};
  for (const { x, } = { x: 23 }; a < 1; ) {};
  for (const { x, } = { x: 23 }; a < 1; ) {};
  for (const { x, } = { x: 23 }; a < 1; ) {};
  for (const { x, } = { x: 23 }; a < 1; ) {};`, Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': []
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ObjectExpression',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 23
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'method': false,
                                    'shorthand': true
                                }
                            ]
                        }
                    }
                ]
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a'
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1
                },
                'operator': '<'
            },
            'update': null
        },
        {
            'type': 'EmptyStatement'
        },
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': []
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ObjectExpression',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 23
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'method': false,
                                    'shorthand': true
                                }
                            ]
                        }
                    }
                ]
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a'
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1
                },
                'operator': '<'
            },
            'update': null
        },
        {
            'type': 'EmptyStatement'
        },
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': []
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ObjectExpression',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 23
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'method': false,
                                    'shorthand': true
                                }
                            ]
                        }
                    }
                ]
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a'
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1
                },
                'operator': '<'
            },
            'update': null
        },
        {
            'type': 'EmptyStatement'
        },
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': []
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ObjectExpression',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 23
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'method': false,
                                    'shorthand': true
                                }
                            ]
                        }
                    }
                ]
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a'
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1
                },
                'operator': '<'
            },
            'update': null
        },
        {
            'type': 'EmptyStatement'
        },
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': []
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ObjectExpression',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 23
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    },
                                    'method': false,
                                    'shorthand': true
                                }
                            ]
                        }
                    }
                ]
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a'
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1
                },
                'operator': '<'
            },
            'update': null
        },
        {
            'type': 'EmptyStatement'
        }
    ]
}],
  ['for (;b;c);', 'for (;b;c);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 10,
                'end': 11,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 10
                    },
                    'end': {
                        'line': 1,
                        'column': 11
                    }
                }
            },
            'init': null,
            'test': {
                'type': 'Identifier',
                'name': 'b',
                'start': 6,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'update': {
                'type': 'Identifier',
                'name': 'c',
                'start': 8,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 8
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'start': 0,
            'end': 11,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 11
                }
            }
        }
    ],
    'start': 0,
    'end': 11,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 11
        }
    }
}],
  ['for (a + b * c * d;b;c);', 'for (a + b * c * d;b;c);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 23,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 23
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            },
            'init': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 5,
                    'end': 6,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 5
                        },
                        'end': {
                            'line': 1,
                            'column': 6
                        }
                    }
                },
                'right': {
                    'type': 'BinaryExpression',
                    'left': {
                        'type': 'BinaryExpression',
                        'left': {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'right': {
                            'type': 'Identifier',
                            'name': 'c',
                            'start': 13,
                            'end': 14,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 14
                                }
                            }
                        },
                        'operator': '*',
                        'start': 9,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'd',
                        'start': 17,
                        'end': 18,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 18
                            }
                        }
                    },
                    'operator': '*',
                    'start': 9,
                    'end': 18,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 9
                        },
                        'end': {
                            'line': 1,
                            'column': 18
                        }
                    }
                },
                'operator': '+',
                'start': 5,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'test': {
                'type': 'Identifier',
                'name': 'b',
                'start': 19,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 19
                    },
                    'end': {
                        'line': 1,
                        'column': 20
                    }
                }
            },
            'update': {
                'type': 'Identifier',
                'name': 'c',
                'start': 21,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'start': 0,
            'end': 24,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 24
                }
            }
        }
    ],
    'start': 0,
    'end': 24,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 24
        }
    }
}],
  ['for (a * b + c * d;b;c);', 'for (a * b + c * d;b;c);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 23,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 23
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            },
            'init': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'BinaryExpression',
                    'left': {
                        'type': 'Identifier',
                        'name': 'a',
                        'start': 5,
                        'end': 6,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 5
                            },
                            'end': {
                                'line': 1,
                                'column': 6
                            }
                        }
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 9,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 10
                            }
                        }
                    },
                    'operator': '*',
                    'start': 5,
                    'end': 10,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 5
                        },
                        'end': {
                            'line': 1,
                            'column': 10
                        }
                    }
                },
                'right': {
                    'type': 'BinaryExpression',
                    'left': {
                        'type': 'Identifier',
                        'name': 'c',
                        'start': 13,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 13
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'd',
                        'start': 17,
                        'end': 18,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 18
                            }
                        }
                    },
                    'operator': '*',
                    'start': 13,
                    'end': 18,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 13
                        },
                        'end': {
                            'line': 1,
                            'column': 18
                        }
                    }
                },
                'operator': '+',
                'start': 5,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'test': {
                'type': 'Identifier',
                'name': 'b',
                'start': 19,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 19
                    },
                    'end': {
                        'line': 1,
                        'column': 20
                    }
                }
            },
            'update': {
                'type': 'Identifier',
                'name': 'c',
                'start': 21,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'start': 0,
            'end': 24,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 24
                }
            }
        }
    ],
    'start': 0,
    'end': 24,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 24
        }
    }
}],
  ['for ((a * b + c) * d;b;c);', 'for ((a * b + c) * d;b;c);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 25,
                'end': 26,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 25
                    },
                    'end': {
                        'line': 1,
                        'column': 26
                    }
                }
            },
            'init': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'BinaryExpression',
                    'left': {
                        'type': 'BinaryExpression',
                        'left': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 6,
                            'end': 7,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 6
                                },
                                'end': {
                                    'line': 1,
                                    'column': 7
                                }
                            }
                        },
                        'right': {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 10,
                            'end': 11,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 11
                                }
                            }
                        },
                        'operator': '*',
                        'start': 6,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'c',
                        'start': 14,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    },
                    'operator': '+',
                    'start': 6,
                    'end': 15,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 15
                        }
                    }
                },
                'right': {
                    'type': 'Identifier',
                    'name': 'd',
                    'start': 19,
                    'end': 20,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 19
                        },
                        'end': {
                            'line': 1,
                            'column': 20
                        }
                    }
                },
                'operator': '*',
                'start': 5,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 20
                    }
                }
            },
            'test': {
                'type': 'Identifier',
                'name': 'b',
                'start': 21,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'update': {
                'type': 'Identifier',
                'name': 'c',
                'start': 23,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 23
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            },
            'start': 0,
            'end': 26,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 26
                }
            }
        }
    ],
    'start': 0,
    'end': 26,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 26
        }
    }
}],
  ['for (var a;;);', 'for (var a;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 13,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 13
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'start': 9,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 10
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 14,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 14
                }
            }
        }
    ],
    'start': 0,
    'end': 14,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 14
        }
    }
}],
  ['for (var a,b,c;;);', 'for (var a,b,c;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 17,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'start': 9,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 10
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 11,
                            'end': 12,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 12
                                }
                            }
                        },
                        'start': 11,
                        'end': 12,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 12
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'c',
                            'start': 13,
                            'end': 14,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 14
                                }
                            }
                        },
                        'start': 13,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 13
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 18,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 18
                }
            }
        }
    ],
    'start': 0,
    'end': 18,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 18
        }
    }
}],
  ['for (let a;;);', 'for (let a;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 13,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 13
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'start': 9,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 10
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 14,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 14
                }
            }
        }
    ],
    'start': 0,
    'end': 14,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 14
        }
    }
}],
  ['for (let a,b,c;;);', 'for (let a,b,c;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 17,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'start': 9,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 10
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 11,
                            'end': 12,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 12
                                }
                            }
                        },
                        'start': 11,
                        'end': 12,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 12
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'c',
                            'start': 13,
                            'end': 14,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 14
                                }
                            }
                        },
                        'start': 13,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 13
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 18,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 18
                }
            }
        }
    ],
    'start': 0,
    'end': 18,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 18
        }
    }
}],
  ['for (const [...x] in y){}', 'for (const [...x] in y){};', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 23,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 23
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'RestElement',
                                    'argument': {
                                        'type': 'Identifier',
                                        'name': 'x',
                                        'start': 15,
                                        'end': 16,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 15
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 16
                                            }
                                        }
                                    },
                                    'start': 12,
                                    'end': 16,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 12
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 16
                                        }
                                    }
                                }
                            ],
                            'start': 11,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        },
                        'start': 11,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'right': {
                'type': 'Identifier',
                'name': 'y',
                'start': 21,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'start': 0,
            'end': 25,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 25
                }
            }
        },
        {
            'type': 'EmptyStatement',
            'start': 25,
            'end': 26,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 25
                },
                'end': {
                    'line': 1,
                    'column': 26
                }
            }
        }
    ],
    'start': 0,
    'end': 26,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 26
        }
    }
}],
  ['for (const [...x] in y){}', 'for (const [...x] in y){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 23,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 23
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'RestElement',
                                    'argument': {
                                        'type': 'Identifier',
                                        'name': 'x',
                                        'start': 15,
                                        'end': 16,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 15
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 16
                                            }
                                        }
                                    },
                                    'start': 12,
                                    'end': 16,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 12
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 16
                                        }
                                    }
                                }
                            ],
                            'start': 11,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        },
                        'start': 11,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'right': {
                'type': 'Identifier',
                'name': 'y',
                'start': 21,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'start': 0,
            'end': 25,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 25
                }
            }
        }
    ],
    'start': 0,
    'end': 25,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 25
        }
    }
}],
  ['for (var a=1;;);', 'for (var a=1;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 15,
                'end': 16,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 16
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
                            'start': 11,
                            'end': 12,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 12
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'start': 9,
                        'end': 12,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 12
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 12,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 12
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 16,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 16
                }
            }
        }
    ],
    'start': 0,
    'end': 16,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 16
        }
    }
}],
  ['for (var a=1, b;;);', 'for (var a=1, b;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 18,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 18
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
                            'start': 11,
                            'end': 12,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 12
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'start': 9,
                        'end': 12,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 12
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 14,
                            'end': 15,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 15
                                }
                            }
                        },
                        'start': 14,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 15
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 19,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 19
                }
            }
        }
    ],
    'start': 0,
    'end': 19,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 19
        }
    }
}],
  ['for (var a, b=1;;);', 'for (var a, b=1;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 18,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 18
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'start': 9,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 10
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
                            'start': 14,
                            'end': 15,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 15
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 12,
                            'end': 13,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 12
                                },
                                'end': {
                                    'line': 1,
                                    'column': 13
                                }
                            }
                        },
                        'start': 12,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 12
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 15
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 19,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 19
                }
            }
        }
    ],
    'start': 0,
    'end': 19,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 19
        }
    }
}],
  ['for (var a=1, b=2;;);', 'for (var a=1, b=2;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 20,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 21
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
                            'start': 11,
                            'end': 12,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 12
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 9,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'start': 9,
                        'end': 12,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 12
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 2,
                            'start': 16,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 16
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 14,
                            'end': 15,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 15
                                }
                            }
                        },
                        'start': 14,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 21,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 21
                }
            }
        }
    ],
    'start': 0,
    'end': 21,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 21
        }
    }
}],
   ['for (a;;);', 'for (a;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 9,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'init': {
                'type': 'Identifier',
                'name': 'a',
                'start': 5,
                'end': 6,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 6
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
  ['for (;b;);', 'for (;b;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 9,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'init': null,
            'test': {
                'type': 'Identifier',
                'name': 'b',
                'start': 6,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'update': null,
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
  ['for (;;c);', 'for (;;c);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 9,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'init': null,
            'test': null,
            'update': {
                'type': 'Identifier',
                'name': 'c',
                'start': 7,
                'end': 8,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 8
                    }
                }
            },
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
  ['for (a;b;);', 'for (a;b;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 10,
                'end': 11,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 10
                    },
                    'end': {
                        'line': 1,
                        'column': 11
                    }
                }
            },
            'init': {
                'type': 'Identifier',
                'name': 'a',
                'start': 5,
                'end': 6,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 6
                    }
                }
            },
            'test': {
                'type': 'Identifier',
                'name': 'b',
                'start': 7,
                'end': 8,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 8
                    }
                }
            },
            'update': null,
            'start': 0,
            'end': 11,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 11
                }
            }
        }
    ],
    'start': 0,
    'end': 11,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 11
        }
    }
}],
  ['for (a;;c);', 'for (a;;c);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 10,
                'end': 11,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 10
                    },
                    'end': {
                        'line': 1,
                        'column': 11
                    }
                }
            },
            'init': {
                'type': 'Identifier',
                'name': 'a',
                'start': 5,
                'end': 6,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 6
                    }
                }
            },
            'test': null,
            'update': {
                'type': 'Identifier',
                'name': 'c',
                'start': 8,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 8
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'start': 0,
            'end': 11,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 11
                }
            }
        }
    ],
    'start': 0,
    'end': 11,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 11
        }
    }
}],
  ['for(x; x < 0;);', 'for(x; x < 0;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 14,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 14
                    },
                    'end': {
                        'line': 1,
                        'column': 15
                    }
                }
            },
            'init': {
                'type': 'Identifier',
                'name': 'x',
                'start': 4,
                'end': 5,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 5
                    }
                }
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 7,
                    'end': 8,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 7
                        },
                        'end': {
                            'line': 1,
                            'column': 8
                        }
                    }
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 0,
                    'start': 11,
                    'end': 12,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 12
                        }
                    }
                },
                'operator': '<',
                'start': 7,
                'end': 12,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 12
                    }
                }
            },
            'update': null,
            'start': 0,
            'end': 15,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 15
                }
            }
        }
    ],
    'start': 0,
    'end': 15,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 15
        }
    }
}],
  ['for(x = 0;;);', 'for (var { cover = (function () {}), xCover = (0, function() {})  } = {}; a < 1; ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 83,
                'end': 85,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 83
                    },
                    'end': {
                        'line': 1,
                        'column': 85
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ObjectExpression',
                            'properties': [],
                            'start': 70,
                            'end': 72,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 70
                                },
                                'end': {
                                    'line': 1,
                                    'column': 72
                                }
                            }
                        },
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'cover',
                                        'start': 11,
                                        'end': 16,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 11
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 16
                                            }
                                        }
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'cover',
                                            'start': 11,
                                            'end': 16,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 11
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 16
                                                }
                                            }
                                        },
                                        'right': {
                                            'type': 'FunctionExpression',
                                            'params': [],
                                            'body': {
                                                'type': 'BlockStatement',
                                                'body': [],
                                                'start': 32,
                                                'end': 34,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 32
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 34
                                                    }
                                                }
                                            },
                                            'async': false,
                                            'generator': false,
                                            'expression': false,
                                            'id': null,
                                            'start': 20,
                                            'end': 34,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 20
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 34
                                                }
                                            }
                                        },
                                        'start': 11,
                                        'end': 35,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 11
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 35
                                            }
                                        }
                                    },
                                    'method': false,
                                    'shorthand': true,
                                    'start': 11,
                                    'end': 35,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 11
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 35
                                        }
                                    }
                                },
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'xCover',
                                        'start': 37,
                                        'end': 43,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 37
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 43
                                            }
                                        }
                                    },
                                    'computed': false,
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'xCover',
                                            'start': 37,
                                            'end': 43,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 37
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 43
                                                }
                                            }
                                        },
                                        'right': {
                                            'type': 'SequenceExpression',
                                            'expressions': [
                                                {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 0,
                                                    'start': 47,
                                                    'end': 48,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 47
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 48
                                                        }
                                                    }
                                                },
                                                {
                                                    'type': 'FunctionExpression',
                                                    'params': [],
                                                    'body': {
                                                        'type': 'BlockStatement',
                                                        'body': [],
                                                        'start': 61,
                                                        'end': 63,
                                                        'loc': {
                                                            'start': {
                                                                'line': 1,
                                                                'column': 61
                                                            },
                                                            'end': {
                                                                'line': 1,
                                                                'column': 63
                                                            }
                                                        }
                                                    },
                                                    'async': false,
                                                    'generator': false,
                                                    'expression': false,
                                                    'id': null,
                                                    'start': 50,
                                                    'end': 63,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 50
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 63
                                                        }
                                                    }
                                                }
                                            ],
                                            'start': 47,
                                            'end': 63,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 47
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 63
                                                }
                                            }
                                        },
                                        'start': 37,
                                        'end': 64,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 37
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 64
                                            }
                                        }
                                    },
                                    'method': false,
                                    'shorthand': true,
                                    'start': 37,
                                    'end': 64,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 37
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 64
                                        }
                                    }
                                }
                            ],
                            'start': 9,
                            'end': 67,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 67
                                }
                            }
                        },
                        'start': 9,
                        'end': 72,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 72
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 72,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 72
                    }
                }
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 74,
                    'end': 75,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 74
                        },
                        'end': {
                            'line': 1,
                            'column': 75
                        }
                    }
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1,
                    'start': 78,
                    'end': 79,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 78
                        },
                        'end': {
                            'line': 1,
                            'column': 79
                        }
                    }
                },
                'operator': '<',
                'start': 74,
                'end': 79,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 74
                    },
                    'end': {
                        'line': 1,
                        'column': 79
                    }
                }
            },
            'update': null,
            'start': 0,
            'end': 85,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 85
                }
            }
        }
    ],
    'start': 0,
    'end': 85,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 85
        }
    }
}],
  ['for (var [x] = []; a < 1; ) {}', 'for (var [x] = []; a < 1; ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 28,
                'end': 30,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 28
                    },
                    'end': {
                        'line': 1,
                        'column': 30
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ArrayExpression',
                            'elements': [],
                            'start': 15,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 15
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        },
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 10,
                                    'end': 11,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 10
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 11
                                        }
                                    }
                                }
                            ],
                            'start': 9,
                            'end': 12,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 12
                                }
                            }
                        },
                        'start': 9,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 19,
                    'end': 20,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 19
                        },
                        'end': {
                            'line': 1,
                            'column': 20
                        }
                    }
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1,
                    'start': 23,
                    'end': 24,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 23
                        },
                        'end': {
                            'line': 1,
                            'column': 24
                        }
                    }
                },
                'operator': '<',
                'start': 19,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 19
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            },
            'update': null,
            'start': 0,
            'end': 30,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 30
                }
            }
        }
    ],
    'start': 0,
    'end': 30,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 30
        }
    }
}],
  ['for (var [x = 23] = [,]; t < 1; ) {}', 'for (var [x = 23] = [,]; t < 1; ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 34,
                'end': 36,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 34
                    },
                    'end': {
                        'line': 1,
                        'column': 36
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ArrayExpression',
                            'elements': [
                                null
                            ],
                            'start': 20,
                            'end': 23,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 20
                                },
                                'end': {
                                    'line': 1,
                                    'column': 23
                                }
                            }
                        },
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'x',
                                        'start': 10,
                                        'end': 11,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 10
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 11
                                            }
                                        }
                                    },
                                    'right': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 23,
                                        'start': 14,
                                        'end': 16,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 14
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 16
                                            }
                                        }
                                    },
                                    'start': 10,
                                    'end': 16,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 10
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 16
                                        }
                                    }
                                }
                            ],
                            'start': 9,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        },
                        'start': 9,
                        'end': 23,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 23
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 23,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 23
                    }
                }
            },
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 't',
                    'start': 25,
                    'end': 26,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 25
                        },
                        'end': {
                            'line': 1,
                            'column': 26
                        }
                    }
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 1,
                    'start': 29,
                    'end': 30,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 29
                        },
                        'end': {
                            'line': 1,
                            'column': 30
                        }
                    }
                },
                'operator': '<',
                'start': 25,
                'end': 30,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 25
                    },
                    'end': {
                        'line': 1,
                        'column': 30
                    }
                }
            },
            'update': null,
            'start': 0,
            'end': 36,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 36
                }
            }
        }
    ],
    'start': 0,
    'end': 36,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 36
        }
    }
}],
  ['for(x = 0;;);', 'for(x = 0;;);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 12,
                'end': 13,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 12
                    },
                    'end': {
                        'line': 1,
                        'column': 13
                    }
                }
            },
            'init': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 4,
                    'end': 5,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 5
                        }
                    }
                },
                'operator': '=',
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 0,
                    'start': 8,
                    'end': 9,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 8
                        },
                        'end': {
                            'line': 1,
                            'column': 9
                        }
                    }
                },
                'start': 4,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 13,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 13
                }
            }
        }
    ],
    'start': 0,
    'end': 13,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 13
        }
    }
}]
];

pass('Statements - For (pass)', valids);

});
