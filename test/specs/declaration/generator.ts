import { n, pass, fail } from '../utils/test-utils';

describe('Declarations - Generator', () => {

  fail('label: function* a(){}', 'label: function* a(){}');
  fail('function*g(yield){}', 'function*g(yield){}');
  fail('function*g({yield}){}', 'function*g({yield}){}');
  fail('function*g([yield]){}', 'function*g([yield]){}');
  fail('function*g({a: yield}){}', 'function*g({a: yield}){}');
  fail('function*g(yield = 0){}', 'function*g(yield = 0){}');
  fail('function*g(){ var yield; }', 'function*g(){ var yield; }');
  fail('function*g(){ var yield = 1; }', 'function*g(){ var yield = 1; }');
  fail('function*g(){ function yield(){}; }', 'function*g(){ function yield(){}; }');
  fail('function*g() { var yield; }', 'function*g() { var yield; }');
  fail('function*g() { let yield; }', 'function*g() { let yield; }');
  fail('function*g() { try {} catch (yield) {} }', 'function*g() { try {} catch (yield) {} }');
  fail('function*g() { ({yield}); }', 'function*g() { ({yield}); }');
  fail('function*g() { ({yield} = 0); }', 'function*g() { ({yield} = 0); }');
  fail('function*g() { var {yield} = 0; }', 'function*g() { var {yield} = 0; }');
  fail('function*g() { for ({yield} in 0); }', 'function*g() { for ({yield} in 0); }');
  fail('function*g() { ({yield = 0}); }', 'function*g() { ({yield = 0}); }');
  fail('function*g() { ({yield = 0} = 0); }', 'function*g() { ({yield = 0} = 0); }');
  fail('function*g() { var {yield = 0} = 0; }', 'function*g() { var {yield = 0} = 0; }');
  fail('function*g() { for ({yield = 0} in 0); }', 'function*g() { for ({yield = 0} in 0); }');
  fail('var gen = function *g() { void yield; };', 'var gen = function *g() { void yield; };');

  pass('function* a(){({yield:a}=0)}', 'function* a(){({yield:a}=0)}', {
    "type": "Program",
    "body": [
        {
            "type": "FunctionDeclaration",
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "left": {
                                "type": "ObjectPattern",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "yield",
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
                                        "value": {
                                            "type": "Identifier",
                                            "name": "a",
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
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": false,
                                        "shorthand": false,
                                        "start": 16,
                                        "end": 23,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 23
                                            }
                                        }
                                    }
                                ],
                                "start": 15,
                                "end": 24,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 24
                                    }
                                }
                            },
                            "operator": "=",
                            "right": {
                                "type": "Literal",
                                "value": 0,
                                "start": 25,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 25
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                },
                                "raw": "0"
                            },
                            "start": 15,
                            "end": 26,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            }
                        },
                        "start": 14,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        }
                    }
                ],
                "start": 13,
                "end": 28,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 13
                    },
                    "end": {
                        "line": 1,
                        "column": 28
                    }
                }
            },
            "async": false,
            "generator": true,
            "expression": false,
            "id": {
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
            },
            "start": 0,
            "end": 28,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 28
                }
            }
        }
    ],
    "sourceType": "script",
    "start": 0,
    "end": 28,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 28
        }
    }
});
});