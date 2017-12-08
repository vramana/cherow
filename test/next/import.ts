import { pass, fail } from '../utils';

describe('Next - Dynamic Import', () => {
    
        fail('direct calls', {
            source: `function failsParse() { return import.then(); }`,
            next: true
        });
        fail('import call many arguments', {
            source: `import(x, y).then(z);`,
            next: true
        });
        fail('non callee', {
            source: `import.then(doLoad);`,
            next: true
        });
        fail('import call no arguments', {
            source: `import().then(doThat);`,
            next: true
        });
        fail('invalid new import call', {
            source: `import.ariya`,
            next: true
        });
        fail('no arguments', {
            source: `import.ariya`,
            next: true
        });
        fail('"ariya" as property name', {
            source: `import.ariya`,
            next: true
        });
        fail('"ariya" as property name', {
            source: `import.ariya`,
            next: true
        });
    
        pass(`with strict directive`, {
            source: '"use strict"; import("test.js");',
            loc: true,
            ranges: true,
            next: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": "use strict",
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
                            },
                            "raw": "\"use strict\""
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
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Import",
                                "start": 14,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "arguments": [{
                                "type": "Literal",
                                "value": "test.js",
                                "start": 21,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 21
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                },
                                "raw": "\"test.js\""
                            }],
                            "start": 14,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            }
                        },
                        "start": 14,
                        "end": 32,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 32
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 32,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 32
                    }
                }
            }
        });
    
        pass(`return value`, {
            source: 'const importResult = import("test.js");',
            ranges: true,
            next: true,
            raw: true,
            module: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "CallExpression",
                            "arguments": [{
                                "type": "Literal",
                                "value": "test.js",
                                "start": 28,
                                "end": 37,
                                "raw": "\"test.js\""
                            }],
                            "callee": {
                                "type": "Import",
                                "start": 21,
                                "end": 27
                            },
                            "start": 21,
                            "end": 38
                        },
                        "id": {
                            "type": "Identifier",
                            "name": "importResult",
                            "start": 6,
                            "end": 18
                        },
                        "start": 6,
                        "end": 38
                    }],
                    "kind": "const",
                    "start": 0,
                    "end": 39
                }],
                "sourceType": "module",
                "start": 0,
                "end": 39
            }
        });
    
        pass(`import call string`, {
            source: 'import("lib.js").then(doThis);',
            ranges: true,
            next: true,
            raw: true,
            expected: {
                "body": [{
                    "end": 30,
                    "expression": {
                        "arguments": [{
                            "end": 28,
                            "name": "doThis",
                            "start": 22,
                            "type": "Identifier"
                        }],
                        "callee": {
                            "computed": false,
                            "end": 21,
                            "object": {
                                "arguments": [{
                                    "end": 15,
                                    "raw": "\"lib.js\"",
                                    "start": 7,
                                    "type": "Literal",
                                    "value": "lib.js"
                                }, ],
                                "callee": {
                                    "end": 6,
                                    "start": 0,
                                    "type": "Import"
                                },
                                "end": 16,
                                "start": 0,
                                "type": "CallExpression"
                            },
                            "property": {
                                "end": 21,
                                "name": "then",
                                "start": 17,
                                "type": "Identifier"
                            },
                            "start": 0,
                            "type": "MemberExpression"
                        },
                        "end": 29,
                        "start": 0,
                        "type": "CallExpression"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 30,
                "sourceType": "script",
                "start": 0,
                "type": "Program",
            }
        });
    
        pass(`generator`, {
            source: 'function* a() { yield import("http"); }',
            ranges: true,
            next: true,
            raw: true,
            expected: {
                "body": [{
                    "async": false,
                    "body": {
                        "body": [{
                            "end": 37,
                            "expression": {
                                "argument": {
                                    "arguments": [{
                                        "end": 35,
                                        "raw": "\"http\"",
                                        "start": 29,
                                        "type": "Literal",
                                        "value": "http",
                                    }],
                                    "callee": {
                                        "end": 28,
                                        "start": 22,
                                        "type": "Import"
                                    },
                                    "end": 36,
                                    "start": 22,
                                    "type": "CallExpression"
                                },
                                "delegate": false,
                                "end": 36,
                                "start": 16,
                                "type": "YieldExpression"
                            },
                            "start": 16,
                            "type": "ExpressionStatement"
                        }],
                        "end": 39,
                        "start": 14,
                        "type": "BlockStatement",
                    },
                    "end": 39,
                    "expression": false,
                    "generator": true,
                    "id": {
                        "end": 11,
                        "name": "a",
                        "start": 10,
                        "type": "Identifier",
                    },
                    "params": [],
                    "start": 0,
                    "type": "FunctionDeclaration",
                }, ],
                "end": 39,
                "sourceType": "script",
                "start": 0,
                "type": "Program",
            }
        });
    
        pass(`inside functions`, {
            source: 'function loadImport(file) { return import(`test/${file}.js`); }',
            ranges: true,
            next: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "FunctionDeclaration",
                    "params": [{
                        "type": "Identifier",
                        "name": "file",
                        "start": 20,
                        "end": 24
                    }],
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ReturnStatement",
                            "argument": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Import",
                                    "start": 35,
                                    "end": 41
                                },
                                "arguments": [{
                                    "type": "TemplateLiteral",
                                    "expressions": [{
                                        "type": "Identifier",
                                        "name": "file",
                                        "start": 50,
                                        "end": 54
                                    }],
                                    "quasis": [{
                                            "type": "TemplateElement",
                                            "value": {
                                                "cooked": "test/",
                                                "raw": "test/"
                                            },
                                            "tail": false,
                                            "start": 54,
                                            "end": 54
                                        },
                                        {
                                            "type": "TemplateElement",
                                            "value": {
                                                "cooked": ".js",
                                                "raw": ".js"
                                            },
                                            "tail": true,
                                            "start": 54,
                                            "end": 59
                                        }
                                    ],
                                    "start": 42,
                                    "end": 59
                                }],
                                "start": 35,
                                "end": 60
                            },
                            "start": 28,
                            "end": 61
                        }],
                        "start": 26,
                        "end": 63
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "loadImport",
                        "start": 9,
                        "end": 19
                    },
                    "start": 0,
                    "end": 63
                }],
                "sourceType": "script",
                "start": 0,
                "end": 63
            }
        });
    });