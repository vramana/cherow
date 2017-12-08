import { pass, fail } from '../utils';

describe('Declarations - Const', () => {

    fail('const [...[x], y] = [1, 2, 3];',  { source: 'const [...[x], y] = [1, 2, 3];'});
    fail('const [...x = []] = [];',  { source: 'const [...x = []] = [];'});
    fail('const a;',  { source: 'const a;'});

    pass(`const x = 42`, {
        source: `const x = 42`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 42,
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
                                },
                                "raw": "42"
                            },
                            "id": {
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
                            "start": 6,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        }
                    ],
                    "kind": "const",
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
            "sourceType": "script",
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
    });

    pass(`{ const x = 14, y = 3, z = 1977 }`, {
        source: `{ const x = 14, y = 3, z = 1977 }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 14,
                                        "start": 12,
                                        "end": 14,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 14
                                            }
                                        },
                                        "raw": "14"
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "start": 8,
                                    "end": 14,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 14
                                        }
                                    }
                                },
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 3,
                                        "start": 20,
                                        "end": 21,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 20
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 21
                                            }
                                        },
                                        "raw": "3"
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "y",
                                        "start": 16,
                                        "end": 17,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 17
                                            }
                                        }
                                    },
                                    "start": 16,
                                    "end": 21,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 21
                                        }
                                    }
                                },
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 1977,
                                        "start": 27,
                                        "end": 31,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 27
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 31
                                            }
                                        },
                                        "raw": "1977"
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "z",
                                        "start": 23,
                                        "end": 24,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 23
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 24
                                            }
                                        }
                                    },
                                    "start": 23,
                                    "end": 31,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 31
                                        }
                                    }
                                }
                            ],
                            "kind": "const",
                            "start": 2,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 2
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            }
                        }
                    ],
                    "start": 0,
                    "end": 33,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 33
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 33,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 33
                }
            }
        }
    });
})