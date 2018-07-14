import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Unary', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['+a', '+a', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'start': 0,
    'end': 2,
    'loc': {
      'start': {
        'line': 1,
        'column': 0
      },
      'end': {
        'line': 1,
        'column': 2
      }
    },
    'body': [
      {
        'type': 'ExpressionStatement',
        'start': 0,
        'end': 2,
        'loc': {
          'start': {
            'line': 1,
            'column': 0
          },
          'end': {
            'line': 1,
            'column': 2
          }
        },
        'expression': {
          'type': 'UnaryExpression',
          'start': 0,
          'end': 2,
          'loc': {
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 2
            }
          },
          'operator': '+',
          'prefix': true,
          'argument': {
            'type': 'Identifier',
            'start': 1,
            'end': 2,
            'loc': {
              'start': {
                'line': 1,
                'column': 1
              },
              'end': {
                'line': 1,
                'column': 2
              }
            },
            'name': 'a'
          }
        }
      }
    ],
    'sourceType': 'script'
  }],
  ['++a', '++a',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'start': 0,
    'end': 3,
    'loc': {
      'start': {
        'line': 1,
        'column': 0
      },
      'end': {
        'line': 1,
        'column': 3
      }
    },
    'body': [
      {
        'type': 'ExpressionStatement',
        'start': 0,
        'end': 3,
        'loc': {
          'start': {
            'line': 1,
            'column': 0
          },
          'end': {
            'line': 1,
            'column': 3
          }
        },
        'expression': {
          'type': 'UpdateExpression',
          'start': 0,
          'end': 3,
          'loc': {
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 3
            }
          },
          'operator': '++',
          'prefix': true,
          'argument': {
            'type': 'Identifier',
            'start': 2,
            'end': 3,
            'loc': {
              'start': {
                'line': 1,
                'column': 2
              },
              'end': {
                'line': 1,
                'column': 3
              }
            },
            'name': 'a'
          }
        }
      }
    ],
    'sourceType': 'script'
  }],
  ['++\na', '++\na', Context.OptionsRanges, {
      'body': [
       {
          'end': 4,
          'expression': {
            'argument': {
              'end': 4,
              'name': 'a',
              'start': 3,
              'type': 'Identifier',
            },
            'end': 4,
            'operator': '++',
            'prefix': true,
            'start': 0,
            'type': 'UpdateExpression',
          },
          'start': 0,
          'type': 'ExpressionStatement',
        },
      ],
      'end': 4,
      'sourceType': 'script',
      'start': 0,
      'type': 'Program',
    }],
  ['!a', '!a', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'start': 0,
    'end': 2,
    'loc': {
      'start': {
        'line': 1,
        'column': 0
      },
      'end': {
        'line': 1,
        'column': 2
      }
    },
    'body': [
      {
        'type': 'ExpressionStatement',
        'start': 0,
        'end': 2,
        'loc': {
          'start': {
            'line': 1,
            'column': 0
          },
          'end': {
            'line': 1,
            'column': 2
          }
        },
        'expression': {
          'type': 'UnaryExpression',
          'start': 0,
          'end': 2,
          'loc': {
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 2
            }
          },
          'operator': '!',
          'prefix': true,
          'argument': {
            'type': 'Identifier',
            'start': 1,
            'end': 2,
            'loc': {
              'start': {
                'line': 1,
                'column': 1
              },
              'end': {
                'line': 1,
                'column': 2
              }
            },
            'name': 'a'
          }
        }
      }
    ],
    'sourceType': 'script'
  }],
  ['typeof chinese++', 'typeof chinese++', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
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
    },
    'body': [
      {
        'type': 'ExpressionStatement',
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
        },
        'expression': {
          'type': 'UnaryExpression',
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
          },
          'operator': 'typeof',
          'prefix': true,
          'argument': {
            'type': 'UpdateExpression',
            'start': 7,
            'end': 16,
            'loc': {
              'start': {
                'line': 1,
                'column': 7
              },
              'end': {
                'line': 1,
                'column': 16
              }
            },
            'operator': '++',
            'prefix': false,
            'argument': {
              'type': 'Identifier',
              'start': 7,
              'end': 14,
              'loc': {
                'start': {
                  'line': 1,
                  'column': 7
                },
                'end': {
                  'line': 1,
                  'column': 14
                }
              },
              'name': 'chinese'
            }
          }
        }
      }
    ],
    'sourceType': 'script'
  }],
  ['void chinese', 'void chinese', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'start': 0,
    'end': 12,
    'loc': {
      'start': {
        'line': 1,
        'column': 0
      },
      'end': {
        'line': 1,
        'column': 12
      }
    },
    'body': [
      {
        'type': 'ExpressionStatement',
        'start': 0,
        'end': 12,
        'loc': {
          'start': {
            'line': 1,
            'column': 0
          },
          'end': {
            'line': 1,
            'column': 12
          }
        },
        'expression': {
          'type': 'UnaryExpression',
          'start': 0,
          'end': 12,
          'loc': {
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 12
            }
          },
          'operator': 'void',
          'prefix': true,
          'argument': {
            'type': 'Identifier',
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
            },
            'name': 'chinese'
          }
        }
      }
    ],
    'sourceType': 'script'
  }],
];

pass('Expressions - Unary (pass)', valids);

});
