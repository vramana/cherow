import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - With', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['with ({}) ;', 'with ({}) ;', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "ObjectExpression",
                "properties": [],
                "start": 6,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            },
            "body": {
                "type": "EmptyStatement",
                "start": 10,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 10
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            },
            "start": 0,
            "end": 11,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 11
                }
            }
        }
    ],
    "start": 0,
    "end": 11,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 11
        }
    }
}],
  ['with ({}) 12', 'with ({}) 12', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "ObjectExpression",
                "properties": [],
                "start": 6,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            },
            "body": {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    raw: null,
                    "value": 12,
                    "start": 10,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                },
                "start": 10,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 10
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            },
            "start": 0,
            "end": 12,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 12
                }
            }
        }
    ],
    "start": 0,
    "end": 12,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 12
        }
    }
}],
  ['with (x) foo;', 'with (x) foo;', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "Identifier",
                "name": "x",
                "start": 6,
                "end": 7,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 7
                    }
                }
            },
            "body": {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Identifier",
                    "name": "foo",
                    "start": 9,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                },
                "start": 9,
                "end": 13,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 9
                    },
                    "end": {
                        "line": 1,
                        "column": 13
                    }
                }
            },
            "start": 0,
            "end": 13,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 13
                }
            }
        }
    ],
    "start": 0,
    "end": 13,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 13
        }
    }
}],
  ['with (x) { foo }', 'with (x) { foo }', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "Identifier",
                "name": "x",
                "start": 6,
                "end": 7,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 7
                    }
                }
            },
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "foo",
                            "start": 11,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        "start": 11,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    }
                ],
                "start": 9,
                "end": 16,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 9
                    },
                    "end": {
                        "line": 1,
                        "column": 16
                    }
                }
            },
            "start": 0,
            "end": 16,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 16
                }
            }
        }
    ],
    "start": 0,
    "end": 16,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 16
        }
    }
}],
  ['with ({}) {}', 'with ({}) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "ObjectExpression",
                "properties": [],
                "start": 6,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            },
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 10,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 10
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            },
            "start": 0,
            "end": 12,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 12
                }
            }
        }
    ],
    "start": 0,
    "end": 12,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 12
        }
    }
}]
];

pass('Statements - With (pass)', valids);

});
