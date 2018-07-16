import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Throw', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['throw foo;', 'throw foo;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ThrowStatement',
            'argument': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 6,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 9
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
  ['throw foo', 'throw foo', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ThrowStatement',
            'argument': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 6,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'start': 0,
            'end': 9,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 9
                }
            }
        }
    ],
    'start': 0,
    'end': 9,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 9
        }
    }
}],
  ['throw 12', 'throw 12', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ThrowStatement',
            'argument': {
                'type': 'Literal',
                raw: null,
                'value': 12,
                'start': 6,
                'end': 8,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 8
                    }
                }
            },
            'start': 0,
            'end': 8,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 8
                }
            }
        }
    ],
    'start': 0,
    'end': 8,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 8
        }
    }
}],
  ['throw x * y', 'throw x * y', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ThrowStatement',
            'argument': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'x',
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
                    'name': 'y',
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
  ['throw {}', 'throw {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ThrowStatement',
            'argument': {
                'type': 'ObjectExpression',
                'properties': [],
                'start': 6,
                'end': 8,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 8
                    }
                }
            },
            'start': 0,
            'end': 8,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 8
                }
            }
        }
    ],
    'start': 0,
    'end': 8,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 8
        }
    }
}]
];

const invalids: Array < [string, string, Context, any] > = [
  [`throw
  x;`, `throw
  x;`, Context.OptionsRanges | Context.OptionsLoc, {}]
];

fail('Statements - Throw (failure)', invalids);
pass('Statements - Throw (pass)', valids);

});
