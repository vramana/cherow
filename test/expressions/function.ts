import { fail, pass } from '../utils';

describe('Statements - Function', () => {

    fail(`var f = function(a = 0) { "use strict"; }`, {
        source: 'var f = function(a = 0) { "use strict"; }',
    });

    fail(`"use strict"; function *g() { 0, function(x = yield) { paramValue = x; }; }`, {
        source: '"use strict"; function *g() { 0, function(x = yield) { paramValue = x; }; }',
    });

    fail(`0, function() { super(); };`, {
        source: '0, function() { super(); };',
    });

    fail(`0, function(x = super()) {};`, {
        source: '0, function(x = super()) {};',
    });

    fail(`"use strict"; function foo() { eval = 42; };`, {
        source: '"use strict"; function foo() { eval = 42; };',
    });

    fail(`(function((a)){})`, {
        source: '(function((a)){})',
    });

    fail(`(function(a){ let a; })`, {
        source: '(function(a){ let a; })',
    });

    fail(`(function ({ a(){} }) {})`, {
        source: '(function ({ a(){} }) {})',
    });

    fail(`'use strict'; (function({a: x}, {b: x}){})`, {
        source: '"use strict"; (function({a: x}, {b: x}){})',
    });

    fail(`(function((a)){})`, {
        source: '(function((a)){})',
    });

    fail(`(function(...a, b){})`, {
        source: '(function(...a, b){})',
    });

    fail(`var _13_1_18_fun = function (eval) { "use strict"; }`, {
        source: 'var _13_1_18_fun = function (eval) { "use strict"; }',
    });

    pass(`(function x(y, z) { })`, {
        source: `(function x(y, z) { })`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "params": [
                            {
                                "type": "Identifier",
                                "name": "y",
                                "start": 12,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "z",
                                "start": 15,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 18,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "x",
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
                        "start": 1,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    },
                    "start": 0,
                    "end": 22,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 22
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 22,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 22
                }
            }
        }
    });

    pass(`(function({a: x, a: y}){})`, {
        source: `(function({a: x, a: y}){})`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "params": [
                            {
                                "type": "ObjectPattern",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "kind": "init",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 11,
                                            "end": 12,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 11
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 12
                                                }
                                            }
                                        },
                                        "computed": false,
                                        "value": {
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
                                        "method": false,
                                        "shorthand": false,
                                        "start": 11,
                                        "end": 15,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 11
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 15
                                            }
                                        }
                                    },
                                    {
                                        "type": "Property",
                                        "kind": "init",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 17,
                                            "end": 18,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 17
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 18
                                                }
                                            }
                                        },
                                        "computed": false,
                                        "value": {
                                            "type": "Identifier",
                                            "name": "y",
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
                                        "method": false,
                                        "shorthand": false,
                                        "start": 17,
                                        "end": 21,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 17
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 21
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                }
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 23,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            }
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": null,
                        "start": 1,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        }
                    },
                    "start": 0,
                    "end": 26,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 26
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 26,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 26
                }
            }
        }
    });

    pass(`function* g(){ (function yield(){}); }`, {
        source: `function* g(){ (function yield(){}); }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
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
                                    "type": "FunctionExpression",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 32,
                                        "end": 34,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 32
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 34
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "yield",
                                        "start": 25,
                                        "end": 30,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 30
                                            }
                                        }
                                    },
                                    "start": 16,
                                    "end": 34,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 34
                                        }
                                    }
                                },
                                "start": 15,
                                "end": 36,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 36
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 38,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 38
                            }
                        }
                    },
                    "async": false,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "g",
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
                    "end": 38,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 38
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 38,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 38
                }
            }
        }
    });

});