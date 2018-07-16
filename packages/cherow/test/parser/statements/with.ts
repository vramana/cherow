import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - With', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['with({}){ p1 = "x1"; }', 'with({}){ p1 = "x1"; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WithStatement',
            'object': {
                'type': 'ObjectExpression',
                'properties': [],
                'start': 5,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'AssignmentExpression',
                            'left': {
                                'type': 'Identifier',
                                'name': 'p1',
                                'start': 10,
                                'end': 12,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 10
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 12
                                    }
                                }
                            },
                            'operator': '=',
                            'right': {
                                'type': 'Literal',
                                raw: null,
                                'value': 'x1',
                                'start': 15,
                                'end': 19,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 15
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 19
                                    }
                                }
                            },
                            'start': 10,
                            'end': 19,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 19
                                }
                            }
                        },
                        'start': 10,
                        'end': 20,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 10
                            },
                            'end': {
                                'line': 1,
                                'column': 20
                            }
                        }
                    }
                ],
                'start': 8,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 8
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'start': 0,
            'end': 22,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 22
                }
            }
        }
    ],
    'start': 0,
    'end': 22,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 22
        }
    }
}],
  ['with ({}) ;', 'with ({}) ;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WithStatement',
            'object': {
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
  ['with ({}) 12', 'with ({}) 12', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WithStatement',
            'object': {
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
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Literal',
                    raw: null,
                    'value': 12,
                    'start': 10,
                    'end': 12,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 10
                        },
                        'end': {
                            'line': 1,
                            'column': 12
                        }
                    }
                },
                'start': 10,
                'end': 12,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 10
                    },
                    'end': {
                        'line': 1,
                        'column': 12
                    }
                }
            },
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
            }
        }
    ],
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
    }
}],
  ['with (x) foo;', 'with (x) foo;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WithStatement',
            'object': {
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
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'foo',
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
                'end': 13,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 13
                    }
                }
            },
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
}],
  ['with (x) { foo }', 'with (x) { foo }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WithStatement',
            'object': {
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
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 11,
                            'end': 14,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 14
                                }
                            }
                        },
                        'start': 11,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    }
                ],
                'start': 9,
                'end': 16,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
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
  ['with ({}) {}', 'with ({}) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WithStatement',
            'object': {
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
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 10,
                'end': 12,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 10
                    },
                    'end': {
                        'line': 1,
                        'column': 12
                    }
                }
            },
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
            }
        }
    ],
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
    }
}]
];

const invalids: Array < [string, string, Context, any] > = [

  ['with ({}) async function f() {}', 'with ({}) async function f() {}', Context.Empty, {}],
  ['with ({}) class C {}', 'with ({}) class C {}', Context.Empty, {}],
  ['with ({}) function f() {}', 'with ({}) function f() {}', Context.Empty, {}],
  ['with ({}) label1: label2: function test262() {}', 'with ({}) label1: label2: function test262() {}', Context.Empty, {}],
  ['with ({}) let x;', 'with ({}) let x;', Context.Empty, {}],
  ['with({}){ p1 = "x1"; }', 'with({}){ p1 = "x1"; }', Context.Strict, {}],
];

fail('Statements - With (failure)', invalids);
pass('Statements - With (pass)', valids);

});
