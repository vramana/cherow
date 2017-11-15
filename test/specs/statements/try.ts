import { pass } from '../utils/test-utils';

describe('Statements - Try', () => {
    
        pass('try {} catch (e) { if(0) function e(){} }', 'try {} catch (e) { if(0) function e(){} }', {
            "type": "Program",
            "body": [
                {
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 4,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "e",
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
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "IfStatement",
                                    "test": {
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 22,
                                        "end": 23,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 22
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 23
                                            }
                                        },
                                        "raw": "0"
                                    },
                                    "alternate": null,
                                    "consequent": {
                                        "type": "FunctionDeclaration",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [],
                                            "start": 37,
                                            "end": 39,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 37
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 39
                                                }
                                            }
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": {
                                            "type": "Identifier",
                                            "name": "e",
                                            "start": 34,
                                            "end": 35,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 34
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 35
                                                }
                                            }
                                        },
                                        "start": 25,
                                        "end": 39,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 39
                                            }
                                        }
                                    },
                                    "start": 19,
                                    "end": 39,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 39
                                        }
                                    }
                                }
                            ],
                            "start": 17,
                            "end": 41,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 17
                                },
                                "end": {
                                    "line": 1,
                                    "column": 41
                                }
                            }
                        },
                        "start": 7,
                        "end": 41,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 41
                            }
                        }
                    },
                    "finalizer": null,
                    "start": 0,
                    "end": 41,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 41
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 41,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 41
                }
            }
        });

        pass('try {} catch ([foo]) { var foo; }', 'try {} catch ([foo]) { var foo; }', {
            "type": "Program",
            "body": [{
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 4,
                    "end": 6,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "Identifier",
                            "name": "foo",
                            "start": 15,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        }],
                        "start": 14,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "VariableDeclaration",
                            "declarations": [{
                                "type": "VariableDeclarator",
                                "init": null,
                                "id": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "start": 27,
                                    "end": 30,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 30
                                        }
                                    }
                                },
                                "start": 27,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                }
                            }],
                            "kind": "var",
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
                        }],
                        "start": 21,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        }
                    },
                    "start": 7,
                    "end": 33,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 33
                        }
                    }
                },
                "finalizer": null,
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
            }],
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
        });
    
        pass('try {} catch ({ foo }) { var foo; }', 'try {} catch ({ foo }) { var foo; }', {
            "type": "Program",
            "body": [
                {
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 4,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "foo",
                                        "start": 16,
                                        "end": 19,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 19
                                            }
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "foo",
                                        "start": 16,
                                        "end": 19,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 19
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 16,
                                    "end": 19,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 19
                                        }
                                    }
                                }
                            ],
                            "start": 14,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "Identifier",
                                                "name": "foo",
                                                "start": 29,
                                                "end": 32,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 29
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 32
                                                    }
                                                }
                                            },
                                            "start": 29,
                                            "end": 32,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 29
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 32
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "var",
                                    "start": 25,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 33
                                        }
                                    }
                                }
                            ],
                            "start": 23,
                            "end": 35,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 35
                                }
                            }
                        },
                        "start": 7,
                        "end": 35,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 35
                            }
                        }
                    },
                    "finalizer": null,
                    "start": 0,
                    "end": 35,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 35
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 35,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 35
                }
            }
        });
    
        pass('try { throw null; } catch (f) {if (false) ; else function f() { return 123; } }',
            'try { throw null; } catch (f) {if (false) ; else function f() { return 123; } }', {
                "type": "Program",
                "body": [{
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "Literal",
                                "value": null,
                                "start": 12,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                },
                                "raw": "null"
                            },
                            "start": 6,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        }],
                        "start": 4,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 27,
                            "end": 28,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 27
                                },
                                "end": {
                                    "line": 1,
                                    "column": 28
                                }
                            }
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [{
                                "type": "IfStatement",
                                "test": {
                                    "type": "Literal",
                                    "value": false,
                                    "start": 35,
                                    "end": 40,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 35
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 40
                                        }
                                    },
                                    "raw": "false"
                                },
                                "alternate": {
                                    "type": "FunctionDeclaration",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [{
                                            "type": "ReturnStatement",
                                            "argument": {
                                                "type": "Literal",
                                                "value": 123,
                                                "start": 71,
                                                "end": 74,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 71
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 74
                                                    }
                                                },
                                                "raw": "123"
                                            },
                                            "start": 64,
                                            "end": 75,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 64
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 75
                                                }
                                            }
                                        }],
                                        "start": 62,
                                        "end": 77,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 62
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 77
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "f",
                                        "start": 58,
                                        "end": 59,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 58
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 59
                                            }
                                        }
                                    },
                                    "start": 49,
                                    "end": 77,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 49
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 77
                                        }
                                    }
                                },
                                "consequent": {
                                    "type": "EmptyStatement",
                                    "start": 42,
                                    "end": 43,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 42
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 43
                                        }
                                    }
                                },
                                "start": 31,
                                "end": 77,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 31
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 77
                                    }
                                }
                            }],
                            "start": 30,
                            "end": 79,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 30
                                },
                                "end": {
                                    "line": 1,
                                    "column": 79
                                }
                            }
                        },
                        "start": 20,
                        "end": 79,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 20
                            },
                            "end": {
                                "line": 1,
                                "column": 79
                            }
                        }
                    },
                    "finalizer": null,
                    "start": 0,
                    "end": 79,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 79
                        }
                    }
                }],
                "sourceType": "script",
                "start": 0,
                "end": 79,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 79
                    }
                }
            })
    });