import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - While', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['while(function __func(){return 1;}()){ break }', 'while(function __func(){return 1;}()){ break }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [
                            {
                                'type': 'ReturnStatement',
                                'argument': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 1,
                                    'start': 31,
                                    'end': 32,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 31
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 32
                                        }
                                    }
                                },
                                'start': 24,
                                'end': 33,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 24
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 33
                                    }
                                }
                            }
                        ],
                        'start': 23,
                        'end': 34,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 23
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
                    'id': {
                        'type': 'Identifier',
                        'name': '__func',
                        'start': 15,
                        'end': 21,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 15
                            },
                            'end': {
                                'line': 1,
                                'column': 21
                            }
                        }
                    },
                    'start': 6,
                    'end': 34,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 34
                        }
                    }
                },
                'arguments': [],
                'start': 6,
                'end': 36,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 36
                    }
                }
            },
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'BreakStatement',
                        'label': null,
                        'start': 39,
                        'end': 44,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 39
                            },
                            'end': {
                                'line': 1,
                                'column': 44
                            }
                        }
                    }
                ],
                'start': 37,
                'end': 46,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 37
                    },
                    'end': {
                        'line': 1,
                        'column': 46
                    }
                }
            },
            'start': 0,
            'end': 46,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 46
                }
            }
        }
    ],
    'start': 0,
    'end': 46,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 46
        }
    }
}],
  ['while (i-->0) {}', 'while (i-->0) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'UpdateExpression',
                    'argument': {
                        'type': 'Identifier',
                        'name': 'i',
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
                    'operator': '--',
                    'prefix': false,
                    'start': 7,
                    'end': 10,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 7
                        },
                        'end': {
                            'line': 1,
                            'column': 10
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
                'operator': '>',
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
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
  ['while (x < 10) { x++; y--; }', 'while (x < 10) { x++; y--; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
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
                    'value': 10,
                    'start': 11,
                    'end': 13,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 13
                        }
                    }
                },
                'operator': '<',
                'start': 7,
                'end': 13,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 13
                    }
                }
            },
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'UpdateExpression',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'x',
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
                            'operator': '++',
                            'prefix': false,
                            'start': 17,
                            'end': 20,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 17
                                },
                                'end': {
                                    'line': 1,
                                    'column': 20
                                }
                            }
                        },
                        'start': 17,
                        'end': 21,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 21
                            }
                        }
                    },
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'UpdateExpression',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'y',
                                'start': 22,
                                'end': 23,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 22
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 23
                                    }
                                }
                            },
                            'operator': '--',
                            'prefix': false,
                            'start': 22,
                            'end': 25,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 22
                                },
                                'end': {
                                    'line': 1,
                                    'column': 25
                                }
                            }
                        },
                        'start': 22,
                        'end': 26,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 22
                            },
                            'end': {
                                'line': 1,
                                'column': 26
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 28,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 28
                    }
                }
            },
            'start': 0,
            'end': 28,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 28
                }
            }
        }
    ],
    'start': 0,
    'end': 28,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 28
        }
    }
}],
  ['while(1);', 'while(1);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
                'type': 'Literal',
                raw: null,
                'value': 1,
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
            'body': {
                'type': 'EmptyStatement',
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

];

const invalids: Array < [string, string, Context, any] > = [
  ['while 1 break;', 'while 1 break;', Context.Empty, {}],
  ['while "hood" break;', 'while "hood" break;', Context.Empty, {}],
  [`while({1}){
    break ;
 };`, `while({1}){
  break ;
};`, Context.Empty, {}],
  ['while (false) function f() {}', 'while (false) function f() {}', Context.Empty, {}],
  ['while (false) class C {}', 'while (false) class C {}', Context.Empty, {}],
  ['while (false) async function f() {}', 'while (false) async function f() {}', Context.Empty, {}],
  ['while true break;', 'while true break;', Context.Empty, {}],
  ['while() {}', 'while() {}', Context.Empty, {}],
  ['while ( false ) Label: continue Label;', 'while ( false ) Label: continue Label;', Context.Empty, {}],
  [`while '' break;`, `while '' break;`, Context.Empty, {}],
];
fail('Statements - While (failure)', invalids);
pass('Statements - While (pass)', valids);

});
