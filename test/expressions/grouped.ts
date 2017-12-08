import { pass, fail } from '../utils';

describe('Expressions - Grouped', () => {
 
        pass(`(0, a)`, {
            source: '(0, a)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "Literal",
                                    "value": 0,
                                    "start": 1,
                                    "end": 2,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 2
                                        }
                                    },
                                    "raw": "0"
                                },
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 4,
                                    "end": 5,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 5
                                        }
                                    }
                                }
                            ],
                            "start": 1,
                            "end": 5,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                }
                            }
                        },
                        "start": 0,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 6,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 6
                    }
                }
            }
        });

        pass(`(a, 0)`, {
            source: '(a, 0)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 1,
                                    "end": 2,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 2
                                        }
                                    }
                                },
                                {
                                    "type": "Literal",
                                    "value": 0,
                                    "start": 4,
                                    "end": 5,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 5
                                        }
                                    },
                                    "raw": "0"
                                }
                            ],
                            "start": 1,
                            "end": 5,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                }
                            }
                        },
                        "start": 0,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 6,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 6
                    }
                }
            }
        });

        pass(`(a,a)`, {
            source: '(a,a)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 1,
                                    "end": 2,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 2
                                        }
                                    }
                                },
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 3,
                                    "end": 4,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 3
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 4
                                        }
                                    }
                                }
                            ],
                            "start": 1,
                            "end": 4,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 4
                                }
                            }
                        },
                        "start": 0,
                        "end": 5,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 5
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 5,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 5
                    }
                }
            }
        });

        pass(`((a,a),(a,a))`, {
            source: '((a,a),(a,a))',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
                                    "type": "SequenceExpression",
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 2,
                                            "end": 3,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 2
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 3
                                                }
                                            }
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 4,
                                            "end": 5,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 4
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 5
                                                }
                                            }
                                        }
                                    ],
                                    "start": 2,
                                    "end": 5,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 5
                                        }
                                    }
                                },
                                {
                                    "type": "SequenceExpression",
                                    "expressions": [
                                        {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 8,
                                            "end": 9,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 8
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        {
                                            "type": "Identifier",
                                            "name": "a",
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
                                        }
                                    ],
                                    "start": 8,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                }
                            ],
                            "start": 1,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
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
                "sourceType": "script",
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
        });

      /*  fail(`(0, {a = 0}) = 0`, {
            source: '(0, {a = 0}) = 0',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`({a = 0})`, {
            source: '({a = 0})',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`({a = 0}, {a = 0}, 0) => 0`, {
            source: '({a = 0}, {a = 0}, 0) => 0',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`(0, {a = 0}) => 0`, {
            source: '(0, {a = 0}) => 0',
            loc: true,
            ranges: true,
            raw: true
        });*/
});