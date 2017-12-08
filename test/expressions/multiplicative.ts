import { pass, fail } from '../utils';

describe('Expressions - Multiplicative', () => {

    pass(`x * y`, {
        source: 'x * y',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
                            "start": 0,
                            "end": 1,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 1
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y",
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
                        },
                        "operator": "*",
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

    pass(`a + (b < (c * d)) + e`, {
        source: 'a + (b < (c * d)) + e',
        loc: true,
        ranges: true,
        raw: true,
        expected:{
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "left": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 0,
                                "end": 1,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 1
                                    }
                                }
                            },
                            "right": {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 5,
                                    "end": 6,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 5
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6
                                        }
                                    }
                                },
                                "right": {
                                    "type": "BinaryExpression",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "c",
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
                                    "right": {
                                        "type": "Identifier",
                                        "name": "d",
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
                                    "operator": "*",
                                    "start": 10,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                },
                                "operator": "<",
                                "start": 5,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "operator": "+",
                            "start": 0,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "e",
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
                            }
                        },
                        "operator": "+",
                        "start": 0,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    },
                    "start": 0,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 21,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 21
                }
            }
        }
    });

    pass(`x % y`, {
        source: 'x % y',
        loc: true,
        ranges: true,
        raw: true,
        expected:{
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "BinaryExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "x",
                            "start": 0,
                            "end": 1,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 1
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "y",
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
                        },
                        "operator": "%",
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
});