import { pass, fail } from '../test-utils';

describe('Destructuring - Arrow function', () => {

          fail(`[v] += ary`, {
            source: '[v] += ary',
            line: 1,
        });

        pass(`([y]) => x;`, {
            source: '([y]) => x;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "sourceType": "script",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 9,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "y",
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
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
                            "start": 0,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
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
            }
        });

        pass(`([y, [x]]) => x;`, {
            source: '([y, [x]]) => x;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "sourceType": "script",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 14,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "y",
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
                                            "type": "ArrayPattern",
                                            "elements": [
                                                {
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
                                                }
                                            ],
                                            "start": 5,
                                            "end": 8,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 5
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 8
                                                }
                                            }
                                        }
                                    ],
                                    "start": 1,
                                    "end": 9,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
                            "start": 0,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
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
            }
        });

        pass(`({y}) => x;`, {
            source: '({y}) => x;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "sourceType": "script",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 9,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "y",
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
                                            "value": {
                                                "type": "Identifier",
                                                "name": "y",
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
                                            "kind": "init",
                                            "computed": false,
                                            "method": false,
                                            "shorthand": true,
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
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
                            "start": 0,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
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
            }
        });

        pass(`({x = 10}) => x`, {
            source: '({x = 10}) => x',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "sourceType": "script",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 14,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                }
                            },
                            "params": [
                                {
                                    "type": "ObjectPattern",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x",
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
                                            "value": {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "x",
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
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 10,
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
                                                    },
                                                    "raw": "10"
                                                },
                                                "start": 2,
                                                "end": 8,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 2
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 8
                                                    }
                                                }
                                            },
                                            "kind": "init",
                                            "computed": false,
                                            "method": false,
                                            "shorthand": true,
                                            "start": 2,
                                            "end": 8,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 2
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 8
                                                }
                                            }
                                        }
                                    ],
                                    "start": 1,
                                    "end": 9,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 1
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                }
                            ],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": true,
                            "start": 0,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "start": 0,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    }
                ],
                "start": 0,
                "end": 15,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 15
                    }
                }
            }
        });
       
});