import { pass, fail } from '../utils';

describe('Miscellaneous - Export', () => {
/*
    fail(`export default x;
    export { y as default };`, {
        source: `export default x;
        export { y as default };`,
        module: true
    });*/
    
        fail(`export {default} +`, {
            source: `export {default} +`,
            module: true
        });
    
        fail(`export default from "foo"`, {
            source: `export default from "foo"`,
            module: true
        });
    
        fail(`export {default}`, {
            source: `export {default}`,
            module: true
        });
    
        fail(`export *`, {
            source: `export *`,
            module: true
        });
    
        fail(`export {} \\u0066rom "./escaped-from.js";`, {
            source: `export {} \\u0066rom "./escaped-from.js";`,
            module: true
        });
    
        fail(`export {a, b as a};`, {
            source: `export {a, b as a};`,
            module: true
        });
    
        fail(`let a, b; export {a, b as a};`, {
            source: `let a, b; export {a, b as a};`,
            module: true
        });
    
        fail(`import a, * as a from "foo";`, {
            source: `import a, * as a from "foo";`,
            module: true
        });
    
        fail(`export {a}; export class a(){};`, {
            source: `export {a}; export class a(){};`,
            module: true
        });
    
        fail(`export d\\u0065fault 0;`, {
            source: `export d\\u0065fault 0;`,
            module: true
        });
    
        fail(`with ({}) async function f() {}`, {
            source: `with ({}) async function f() {}`,
            module: true
        });
    
        fail(`export { Number };`, {
            source: `export { Number };`,
            module: true
        });
    
        fail(`class C { static method() { export default null; } }`, {
            source: `class C { static method() { export default null; } }`,
            module: true
        });
    
        fail(`export {} null;`, {
            source: `export {} null;`,
            module: true
        });
    
        fail(`label: { label: 0; }`, {
            source: `label: {
      label: 0;
    }`,
            module: true
        });
    
        fail(`let a; export function a(){};`, {
            source: `let a; export function a(){};`,
            module: true
        });
    
        fail(`import a, {b as a} from "module";`, {
            source: `import a, {b as a} from "module";`,
            module: true
        });
    
        fail(`export * from 123;`, {
            source: `export * from 123;`,
            module: true
        });
    
        fail(`export { if as foo }`, {
            source: `export { if as foo }`,
            module: true
        });
    
    
        fail(`export class {}`, {
            source: `export class {}`,
            module: true
        });
    
        fail(`export function a() {} export function a() {}`, {
            source: `export function a() {}
      export function a() {}`,
            module: true
        });
    
        fail(`import * as enum from "bar"`, {
            source: `import * as enum from "bar"`,
            module: true
        });
    
        fail(`export default async func`, {
            source: `export default async func`,
        });
    
        fail(`export typeof foo;`, {
            source: `export typeof foo;`,
        });
    
        fail(`export {a,b} from a`, {
            source: `export {a,b} from a`,
        });
    
        fail(`export 3`, {
            source: `export 3`,
        });
    
        fail(`export default default`, {
            source: `export default default`,
        });
    
        pass(`export default class {}`, {
            source: `export default class {}`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportDefaultDeclaration",
                    "declaration": {
                        "type": "ClassDeclaration",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [],
                            "start": 21,
                            "end": 23,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 21
                                },
                                "end": {
                                    "line": 1,
                                    "column": 23
                                }
                            }
                        },
                        "start": 15,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        }
                    },
                    "start": 0,
                    "end": 23,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 23
                        }
                    }
                }],
                "sourceType": "module",
                "start": 0,
                "end": 23,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 23
                    }
                }
            }
        });
    
        pass(`export let foo = 1;`, {
            source: `export let foo = 1;`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "source": null,
                    "specifiers": [],
                    "declaration": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 1,
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
                                },
                                "raw": "1"
                            },
                            "id": {
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
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        }],
                        "kind": "let",
                        "start": 7,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    },
                    "start": 0,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    }
                }],
                "sourceType": "module",
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                }
            }
        });
    
        pass(`export * from "foo";`, {
            source: `export * from "foo";`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportAllDeclaration",
                    "source": {
                        "type": "Literal",
                        "value": "foo",
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
                        },
                        "raw": "\"foo\""
                    },
                    "start": 0,
                    "end": 20,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 20
                        }
                    }
                }],
                "sourceType": "module",
                "start": 0,
                "end": 20,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 20
                    }
                }
            }
        });
    
        pass(`export {foo as default, bar};`, {
            source: `export {foo as default, bar};`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "source": null,
                    "specifiers": [{
                            "type": "ExportSpecifier",
                            "local": {
                                "type": "Identifier",
                                "name": "foo",
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
                            },
                            "exported": {
                                "type": "Identifier",
                                "name": "default",
                                "start": 15,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                }
                            },
                            "start": 8,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            }
                        },
                        {
                            "type": "ExportSpecifier",
                            "local": {
                                "type": "Identifier",
                                "name": "bar",
                                "start": 24,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "exported": {
                                "type": "Identifier",
                                "name": "bar",
                                "start": 24,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "start": 24,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 24
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        }
                    ],
                    "declaration": null,
                    "start": 0,
                    "end": 29,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    }
                }],
                "sourceType": "module",
                "start": 0,
                "end": 29,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 29
                    }
                }
            }
        });
    
        pass(`export var bar;`, {
            source: `export var bar;`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "source": null,
                    "specifiers": [],
                    "declaration": {
                        "type": "VariableDeclaration",
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "init": null,
                            "id": {
                                "type": "Identifier",
                                "name": "bar",
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
                        }],
                        "kind": "var",
                        "start": 7,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
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
                }],
                "sourceType": "module",
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
    
        pass(`export {};`, {
            source: `export {};`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "source": null,
                    "specifiers": [],
                    "declaration": null,
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
                }],
                "sourceType": "module",
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
            }
        });

        pass(`export const document = { }`, {
            source: `export const document = { }`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExportNamedDeclaration",
                        "source": null,
                        "specifiers": [],
                        "declaration": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "ObjectExpression",
                                        "properties": [],
                                        "start": 24,
                                        "end": 27,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 27
                                            }
                                        }
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "document",
                                        "start": 13,
                                        "end": 21,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 21
                                            }
                                        }
                                    },
                                    "start": 13,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 13
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                }
                            ],
                            "kind": "const",
                            "start": 7,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        },
                        "start": 0,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        }
                    }
                ],
                "sourceType": "module",
                "start": 0,
                "end": 27,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 27
                    }
                }
            }
        });
    
        pass(`export {foo as default, bar} from "foo";`, {
            source: `export {foo as default, bar} from "foo";`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "source": {
                        "type": "Literal",
                        "value": "foo",
                        "start": 34,
                        "end": 39,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 34
                            },
                            "end": {
                                "line": 1,
                                "column": 39
                            }
                        },
                        "raw": "\"foo\""
                    },
                    "specifiers": [{
                            "type": "ExportSpecifier",
                            "local": {
                                "type": "Identifier",
                                "name": "foo",
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
                            },
                            "exported": {
                                "type": "Identifier",
                                "name": "default",
                                "start": 15,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                }
                            },
                            "start": 8,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            }
                        },
                        {
                            "type": "ExportSpecifier",
                            "local": {
                                "type": "Identifier",
                                "name": "bar",
                                "start": 24,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "exported": {
                                "type": "Identifier",
                                "name": "bar",
                                "start": 24,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "start": 24,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 24
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        }
                    ],
                    "declaration": null,
                    "start": 0,
                    "end": 40,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 40
                        }
                    }
                }],
                "sourceType": "module",
                "start": 0,
                "end": 40,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 40
                    }
                }
            }
        });
    
        pass(`export function foo () {}`, {
            source: `export function foo () {}`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "source": null,
                    "specifiers": [],
                    "declaration": {
                        "type": "FunctionDeclaration",
                        "params": [],
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
                        "id": {
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
                        "start": 7,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        }
                    },
                    "start": 0,
                    "end": 25,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 25
                        }
                    }
                }],
                "sourceType": "module",
                "start": 0,
                "end": 25,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 25
                    }
                }
            }
        });
    
        pass(`export {foo, bar};`, {
            source: `export {foo, bar};`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "source": null,
                    "specifiers": [{
                            "type": "ExportSpecifier",
                            "local": {
                                "type": "Identifier",
                                "name": "foo",
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
                            },
                            "exported": {
                                "type": "Identifier",
                                "name": "foo",
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
                            },
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
                        },
                        {
                            "type": "ExportSpecifier",
                            "local": {
                                "type": "Identifier",
                                "name": "bar",
                                "start": 13,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "exported": {
                                "type": "Identifier",
                                "name": "bar",
                                "start": 13,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "start": 13,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        }
                    ],
                    "declaration": null,
                    "start": 0,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    }
                }],
                "sourceType": "module",
                "start": 0,
                "end": 18,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 18
                    }
                }
            }
        });
    
        pass(`export async function a() {}`, {
            source: `export async function a() {}`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "source": null,
                    "specifiers": [],
                    "declaration": {
                        "type": "FunctionDeclaration",
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 26,
                            "end": 28,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 26
                                },
                                "end": {
                                    "line": 1,
                                    "column": 28
                                }
                            }
                        },
                        "async": true,
                        "generator": false,
                        "expression": false,
                        "id": {
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
                        "start": 7,
                        "end": 28,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 28
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
                }],
                "sourceType": "module",
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
        });
    
        pass(`import * as o from './resources/o.js';`, {
            source: `import * as o from './resources/o.js';`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "ImportDeclaration",
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
                    },
                    "specifiers": [{
                        "type": "ImportNamespaceSpecifier",
                        "start": 7,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        },
                        "local": {
                            "type": "Identifier",
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
                            },
                            "name": "o"
                        }
                    }],
                    "source": {
                        "type": "Literal",
                        "start": 19,
                        "end": 37,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 37
                            }
                        },
                        "value": "./resources/o.js",
                        "raw": "'./resources/o.js'"
                    }
                }],
                "sourceType": "module"
            }
        });
    
        pass(`complex`, {
            source: `var _if = 1;
            var _import = 2;
            var _export = 3;
            var _await = 4;
            var _arguments = 5;
            var _eval = 6;
            var _default = 7;
            var _as = 8;
            
            export {
                _if as if,
                _import as import,
                _export as export,
                _await as await,
                _arguments as arguments,
                _eval as eval,
                _default as default,
                _as as as
              };
            
            import {
                if as if_,
                import as import_,
                export as export_,
                await as await_,
                arguments as arguments_,
                eval as eval_,
                default as default_,
                as as as
              } from './instn-named-id-name.js';`,
            loc: true,
            ranges: true,
            module: true,
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
                                    "value": 1,
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
                                    },
                                    "raw": "1"
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "_if",
                                    "start": 4,
                                    "end": 7,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 7
                                        }
                                    }
                                },
                                "start": 4,
                                "end": 11,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 11
                                    }
                                }
                            }
                        ],
                        "kind": "var",
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
                    },
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Literal",
                                    "value": 2,
                                    "start": 39,
                                    "end": 40,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 27
                                        }
                                    },
                                    "raw": "2"
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "_import",
                                    "start": 29,
                                    "end": 36,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 23
                                        }
                                    }
                                },
                                "start": 29,
                                "end": 40,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 27
                                    }
                                }
                            }
                        ],
                        "kind": "var",
                        "start": 25,
                        "end": 41,
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 12
                            },
                            "end": {
                                "line": 2,
                                "column": 28
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Literal",
                                    "value": 3,
                                    "start": 68,
                                    "end": 69,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 27
                                        }
                                    },
                                    "raw": "3"
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "_export",
                                    "start": 58,
                                    "end": 65,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 23
                                        }
                                    }
                                },
                                "start": 58,
                                "end": 69,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 27
                                    }
                                }
                            }
                        ],
                        "kind": "var",
                        "start": 54,
                        "end": 70,
                        "loc": {
                            "start": {
                                "line": 3,
                                "column": 12
                            },
                            "end": {
                                "line": 3,
                                "column": 28
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Literal",
                                    "value": 4,
                                    "start": 96,
                                    "end": 97,
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 26
                                        }
                                    },
                                    "raw": "4"
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "_await",
                                    "start": 87,
                                    "end": 93,
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 22
                                        }
                                    }
                                },
                                "start": 87,
                                "end": 97,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 26
                                    }
                                }
                            }
                        ],
                        "kind": "var",
                        "start": 83,
                        "end": 98,
                        "loc": {
                            "start": {
                                "line": 4,
                                "column": 12
                            },
                            "end": {
                                "line": 4,
                                "column": 27
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Literal",
                                    "value": 5,
                                    "start": 128,
                                    "end": 129,
                                    "loc": {
                                        "start": {
                                            "line": 5,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 30
                                        }
                                    },
                                    "raw": "5"
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "_arguments",
                                    "start": 115,
                                    "end": 125,
                                    "loc": {
                                        "start": {
                                            "line": 5,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 26
                                        }
                                    }
                                },
                                "start": 115,
                                "end": 129,
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 30
                                    }
                                }
                            }
                        ],
                        "kind": "var",
                        "start": 111,
                        "end": 130,
                        "loc": {
                            "start": {
                                "line": 5,
                                "column": 12
                            },
                            "end": {
                                "line": 5,
                                "column": 31
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Literal",
                                    "value": 6,
                                    "start": 155,
                                    "end": 156,
                                    "loc": {
                                        "start": {
                                            "line": 6,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 25
                                        }
                                    },
                                    "raw": "6"
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "_eval",
                                    "start": 147,
                                    "end": 152,
                                    "loc": {
                                        "start": {
                                            "line": 6,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 21
                                        }
                                    }
                                },
                                "start": 147,
                                "end": 156,
                                "loc": {
                                    "start": {
                                        "line": 6,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 25
                                    }
                                }
                            }
                        ],
                        "kind": "var",
                        "start": 143,
                        "end": 157,
                        "loc": {
                            "start": {
                                "line": 6,
                                "column": 12
                            },
                            "end": {
                                "line": 6,
                                "column": 26
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Literal",
                                    "value": 7,
                                    "start": 185,
                                    "end": 186,
                                    "loc": {
                                        "start": {
                                            "line": 7,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 7,
                                            "column": 28
                                        }
                                    },
                                    "raw": "7"
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "_default",
                                    "start": 174,
                                    "end": 182,
                                    "loc": {
                                        "start": {
                                            "line": 7,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 7,
                                            "column": 24
                                        }
                                    }
                                },
                                "start": 174,
                                "end": 186,
                                "loc": {
                                    "start": {
                                        "line": 7,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 7,
                                        "column": 28
                                    }
                                }
                            }
                        ],
                        "kind": "var",
                        "start": 170,
                        "end": 187,
                        "loc": {
                            "start": {
                                "line": 7,
                                "column": 12
                            },
                            "end": {
                                "line": 7,
                                "column": 29
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Literal",
                                    "value": 8,
                                    "start": 210,
                                    "end": 211,
                                    "loc": {
                                        "start": {
                                            "line": 8,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 8,
                                            "column": 23
                                        }
                                    },
                                    "raw": "8"
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "_as",
                                    "start": 204,
                                    "end": 207,
                                    "loc": {
                                        "start": {
                                            "line": 8,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 8,
                                            "column": 19
                                        }
                                    }
                                },
                                "start": 204,
                                "end": 211,
                                "loc": {
                                    "start": {
                                        "line": 8,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 8,
                                        "column": 23
                                    }
                                }
                            }
                        ],
                        "kind": "var",
                        "start": 200,
                        "end": 212,
                        "loc": {
                            "start": {
                                "line": 8,
                                "column": 12
                            },
                            "end": {
                                "line": 8,
                                "column": 24
                            }
                        }
                    },
                    {
                        "type": "ExportNamedDeclaration",
                        "source": null,
                        "specifiers": [
                            {
                                "type": "ExportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "_if",
                                    "start": 263,
                                    "end": 266,
                                    "loc": {
                                        "start": {
                                            "line": 11,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 11,
                                            "column": 19
                                        }
                                    }
                                },
                                "exported": {
                                    "type": "Identifier",
                                    "name": "if",
                                    "start": 270,
                                    "end": 272,
                                    "loc": {
                                        "start": {
                                            "line": 11,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 11,
                                            "column": 25
                                        }
                                    }
                                },
                                "start": 263,
                                "end": 272,
                                "loc": {
                                    "start": {
                                        "line": 11,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 11,
                                        "column": 25
                                    }
                                }
                            },
                            {
                                "type": "ExportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "_import",
                                    "start": 290,
                                    "end": 297,
                                    "loc": {
                                        "start": {
                                            "line": 12,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 12,
                                            "column": 23
                                        }
                                    }
                                },
                                "exported": {
                                    "type": "Identifier",
                                    "name": "import",
                                    "start": 301,
                                    "end": 307,
                                    "loc": {
                                        "start": {
                                            "line": 12,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 12,
                                            "column": 33
                                        }
                                    }
                                },
                                "start": 290,
                                "end": 307,
                                "loc": {
                                    "start": {
                                        "line": 12,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 12,
                                        "column": 33
                                    }
                                }
                            },
                            {
                                "type": "ExportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "_export",
                                    "start": 325,
                                    "end": 332,
                                    "loc": {
                                        "start": {
                                            "line": 13,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 13,
                                            "column": 23
                                        }
                                    }
                                },
                                "exported": {
                                    "type": "Identifier",
                                    "name": "export",
                                    "start": 336,
                                    "end": 342,
                                    "loc": {
                                        "start": {
                                            "line": 13,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 13,
                                            "column": 33
                                        }
                                    }
                                },
                                "start": 325,
                                "end": 342,
                                "loc": {
                                    "start": {
                                        "line": 13,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 13,
                                        "column": 33
                                    }
                                }
                            },
                            {
                                "type": "ExportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "_await",
                                    "start": 360,
                                    "end": 366,
                                    "loc": {
                                        "start": {
                                            "line": 14,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 14,
                                            "column": 22
                                        }
                                    }
                                },
                                "exported": {
                                    "type": "Identifier",
                                    "name": "await",
                                    "start": 370,
                                    "end": 375,
                                    "loc": {
                                        "start": {
                                            "line": 14,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 14,
                                            "column": 31
                                        }
                                    }
                                },
                                "start": 360,
                                "end": 375,
                                "loc": {
                                    "start": {
                                        "line": 14,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 14,
                                        "column": 31
                                    }
                                }
                            },
                            {
                                "type": "ExportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "_arguments",
                                    "start": 393,
                                    "end": 403,
                                    "loc": {
                                        "start": {
                                            "line": 15,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 15,
                                            "column": 26
                                        }
                                    }
                                },
                                "exported": {
                                    "type": "Identifier",
                                    "name": "arguments",
                                    "start": 407,
                                    "end": 416,
                                    "loc": {
                                        "start": {
                                            "line": 15,
                                            "column": 30
                                        },
                                        "end": {
                                            "line": 15,
                                            "column": 39
                                        }
                                    }
                                },
                                "start": 393,
                                "end": 416,
                                "loc": {
                                    "start": {
                                        "line": 15,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 15,
                                        "column": 39
                                    }
                                }
                            },
                            {
                                "type": "ExportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "_eval",
                                    "start": 434,
                                    "end": 439,
                                    "loc": {
                                        "start": {
                                            "line": 16,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 16,
                                            "column": 21
                                        }
                                    }
                                },
                                "exported": {
                                    "type": "Identifier",
                                    "name": "eval",
                                    "start": 443,
                                    "end": 447,
                                    "loc": {
                                        "start": {
                                            "line": 16,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 16,
                                            "column": 29
                                        }
                                    }
                                },
                                "start": 434,
                                "end": 447,
                                "loc": {
                                    "start": {
                                        "line": 16,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 16,
                                        "column": 29
                                    }
                                }
                            },
                            {
                                "type": "ExportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "_default",
                                    "start": 465,
                                    "end": 473,
                                    "loc": {
                                        "start": {
                                            "line": 17,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 17,
                                            "column": 24
                                        }
                                    }
                                },
                                "exported": {
                                    "type": "Identifier",
                                    "name": "default",
                                    "start": 477,
                                    "end": 484,
                                    "loc": {
                                        "start": {
                                            "line": 17,
                                            "column": 28
                                        },
                                        "end": {
                                            "line": 17,
                                            "column": 35
                                        }
                                    }
                                },
                                "start": 465,
                                "end": 484,
                                "loc": {
                                    "start": {
                                        "line": 17,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 17,
                                        "column": 35
                                    }
                                }
                            },
                            {
                                "type": "ExportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "_as",
                                    "start": 502,
                                    "end": 505,
                                    "loc": {
                                        "start": {
                                            "line": 18,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 18,
                                            "column": 19
                                        }
                                    }
                                },
                                "exported": {
                                    "type": "Identifier",
                                    "name": "as",
                                    "start": 509,
                                    "end": 511,
                                    "loc": {
                                        "start": {
                                            "line": 18,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 18,
                                            "column": 25
                                        }
                                    }
                                },
                                "start": 502,
                                "end": 511,
                                "loc": {
                                    "start": {
                                        "line": 18,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 18,
                                        "column": 25
                                    }
                                }
                            }
                        ],
                        "declaration": null,
                        "start": 238,
                        "end": 528,
                        "loc": {
                            "start": {
                                "line": 10,
                                "column": 12
                            },
                            "end": {
                                "line": 19,
                                "column": 16
                            }
                        }
                    },
                    {
                        "type": "ImportDeclaration",
                        "specifiers": [
                            {
                                "type": "ImportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "if_",
                                    "start": 585,
                                    "end": 588,
                                    "loc": {
                                        "start": {
                                            "line": 22,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 22,
                                            "column": 25
                                        }
                                    }
                                },
                                "imported": {
                                    "type": "Identifier",
                                    "name": "if",
                                    "start": 579,
                                    "end": 581,
                                    "loc": {
                                        "start": {
                                            "line": 22,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 22,
                                            "column": 18
                                        }
                                    }
                                },
                                "start": 579,
                                "end": 588,
                                "loc": {
                                    "start": {
                                        "line": 22,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 22,
                                        "column": 25
                                    }
                                }
                            },
                            {
                                "type": "ImportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "import_",
                                    "start": 616,
                                    "end": 623,
                                    "loc": {
                                        "start": {
                                            "line": 23,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 23,
                                            "column": 33
                                        }
                                    }
                                },
                                "imported": {
                                    "type": "Identifier",
                                    "name": "import",
                                    "start": 606,
                                    "end": 612,
                                    "loc": {
                                        "start": {
                                            "line": 23,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 23,
                                            "column": 22
                                        }
                                    }
                                },
                                "start": 606,
                                "end": 623,
                                "loc": {
                                    "start": {
                                        "line": 23,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 23,
                                        "column": 33
                                    }
                                }
                            },
                            {
                                "type": "ImportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "export_",
                                    "start": 651,
                                    "end": 658,
                                    "loc": {
                                        "start": {
                                            "line": 24,
                                            "column": 26
                                        },
                                        "end": {
                                            "line": 24,
                                            "column": 33
                                        }
                                    }
                                },
                                "imported": {
                                    "type": "Identifier",
                                    "name": "export",
                                    "start": 641,
                                    "end": 647,
                                    "loc": {
                                        "start": {
                                            "line": 24,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 24,
                                            "column": 22
                                        }
                                    }
                                },
                                "start": 641,
                                "end": 658,
                                "loc": {
                                    "start": {
                                        "line": 24,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 24,
                                        "column": 33
                                    }
                                }
                            },
                            {
                                "type": "ImportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "await_",
                                    "start": 685,
                                    "end": 691,
                                    "loc": {
                                        "start": {
                                            "line": 25,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 25,
                                            "column": 31
                                        }
                                    }
                                },
                                "imported": {
                                    "type": "Identifier",
                                    "name": "await",
                                    "start": 676,
                                    "end": 681,
                                    "loc": {
                                        "start": {
                                            "line": 25,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 25,
                                            "column": 21
                                        }
                                    }
                                },
                                "start": 676,
                                "end": 691,
                                "loc": {
                                    "start": {
                                        "line": 25,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 25,
                                        "column": 31
                                    }
                                }
                            },
                            {
                                "type": "ImportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "arguments_",
                                    "start": 722,
                                    "end": 732,
                                    "loc": {
                                        "start": {
                                            "line": 26,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 26,
                                            "column": 39
                                        }
                                    }
                                },
                                "imported": {
                                    "type": "Identifier",
                                    "name": "arguments",
                                    "start": 709,
                                    "end": 718,
                                    "loc": {
                                        "start": {
                                            "line": 26,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 26,
                                            "column": 25
                                        }
                                    }
                                },
                                "start": 709,
                                "end": 732,
                                "loc": {
                                    "start": {
                                        "line": 26,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 26,
                                        "column": 39
                                    }
                                }
                            },
                            {
                                "type": "ImportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "eval_",
                                    "start": 758,
                                    "end": 763,
                                    "loc": {
                                        "start": {
                                            "line": 27,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 27,
                                            "column": 29
                                        }
                                    }
                                },
                                "imported": {
                                    "type": "Identifier",
                                    "name": "eval",
                                    "start": 750,
                                    "end": 754,
                                    "loc": {
                                        "start": {
                                            "line": 27,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 27,
                                            "column": 20
                                        }
                                    }
                                },
                                "start": 750,
                                "end": 763,
                                "loc": {
                                    "start": {
                                        "line": 27,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 27,
                                        "column": 29
                                    }
                                }
                            },
                            {
                                "type": "ImportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "default_",
                                    "start": 792,
                                    "end": 800,
                                    "loc": {
                                        "start": {
                                            "line": 28,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 28,
                                            "column": 35
                                        }
                                    }
                                },
                                "imported": {
                                    "type": "Identifier",
                                    "name": "default",
                                    "start": 781,
                                    "end": 788,
                                    "loc": {
                                        "start": {
                                            "line": 28,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 28,
                                            "column": 23
                                        }
                                    }
                                },
                                "start": 781,
                                "end": 800,
                                "loc": {
                                    "start": {
                                        "line": 28,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 28,
                                        "column": 35
                                    }
                                }
                            },
                            {
                                "type": "ImportSpecifier",
                                "local": {
                                    "type": "Identifier",
                                    "name": "as",
                                    "start": 824,
                                    "end": 826,
                                    "loc": {
                                        "start": {
                                            "line": 29,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 29,
                                            "column": 24
                                        }
                                    }
                                },
                                "imported": {
                                    "type": "Identifier",
                                    "name": "as",
                                    "start": 818,
                                    "end": 820,
                                    "loc": {
                                        "start": {
                                            "line": 29,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 29,
                                            "column": 18
                                        }
                                    }
                                },
                                "start": 818,
                                "end": 826,
                                "loc": {
                                    "start": {
                                        "line": 29,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 29,
                                        "column": 24
                                    }
                                }
                            }
                        ],
                        "source": {
                            "type": "Literal",
                            "value": "./instn-named-id-name.js",
                            "start": 848,
                            "end": 874,
                            "loc": {
                                "start": {
                                    "line": 30,
                                    "column": 21
                                },
                                "end": {
                                    "line": 30,
                                    "column": 47
                                }
                            },
                            "raw": "'./instn-named-id-name.js'"
                        },
                        "start": 554,
                        "end": 875,
                        "loc": {
                            "start": {
                                "line": 21,
                                "column": 12
                            },
                            "end": {
                                "line": 30,
                                "column": 48
                            }
                        }
                    }
                ],
                "sourceType": "module",
                "start": 0,
                "end": 875,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 30,
                        "column": 48
                    }
                }
            }
        });
    
        pass(`export var document`, {
            source: `export var document`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                },
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "start": 0,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    },
                    "declaration": {
                        "type": "VariableDeclaration",
                        "start": 7,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        },
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 11,
                            "end": 19,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 19
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                },
                                "name": "document"
                            },
                            "init": null
                        }],
                        "kind": "var"
                    },
                    "specifiers": [],
                    "source": null
                }],
                "sourceType": "module"
            }
        });
    
        pass(`export let document = { }`, {
            source: `export let document = { }`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "start": 0,
                "end": 25,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 25
                    }
                },
                "body": [{
                    "type": "ExportNamedDeclaration",
                    "start": 0,
                    "end": 25,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 25
                        }
                    },
                    "declaration": {
                        "type": "VariableDeclaration",
                        "start": 7,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        },
                        "declarations": [{
                            "type": "VariableDeclarator",
                            "start": 11,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "start": 11,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                },
                                "name": "document"
                            },
                            "init": {
                                "type": "ObjectExpression",
                                "start": 22,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                },
                                "properties": []
                            }
                        }],
                        "kind": "let"
                    },
                    "specifiers": [],
                    "source": null
                }],
                "sourceType": "module"
            }
        });
    
        pass(`export default (async function() { })`, {
            source: `export default (async function() { })`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "start": 0,
                "end": 37,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 37
                    }
                },
                "body": [{
                    "type": "ExportDefaultDeclaration",
                    "start": 0,
                    "end": 37,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 37
                        }
                    },
                    "declaration": {
                        "type": "FunctionExpression",
                        "start": 16,
                        "end": 36,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 36
                            }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 33,
                            "end": 36,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 33
                                },
                                "end": {
                                    "line": 1,
                                    "column": 36
                                }
                            },
                            "body": []
                        }
                    }
                }],
                "sourceType": "module"
            }
        });
    
        pass(`export default 'x' in { x: true }`, {
            source: `export default 'x' in { x: true }`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
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
                },
                "body": [{
                    "type": "ExportDefaultDeclaration",
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
                    },
                    "declaration": {
                        "type": "BinaryExpression",
                        "start": 15,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        },
                        "left": {
                            "type": "Literal",
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
                            },
                            "value": "x",
                            "raw": "'x'"
                        },
                        "operator": "in",
                        "right": {
                            "type": "ObjectExpression",
                            "start": 22,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
                                }
                            },
                            "properties": [{
                                "type": "Property",
                                "start": 24,
                                "end": 31,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 31
                                    }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 24,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    },
                                    "name": "x"
                                },
                                "value": {
                                    "type": "Literal",
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
                                    "value": true,
                                    "raw": "true"
                                },
                                "kind": "init"
                            }]
                        }
                    }
                }],
                "sourceType": "module"
            }
        });
    
        pass(`export default function* a(){}`, {
            source: `export default function* a(){}`,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                "type": "Program",
                "start": 0,
                "end": 30,
                "body": [{
                    "type": "ExportDefaultDeclaration",
                    "start": 0,
                    "end": 30,
                    "declaration": {
                        "type": "FunctionDeclaration",
                        "start": 15,
                        "end": 30,
                        "id": {
                            "type": "Identifier",
                            "start": 25,
                            "end": 26,
                            "name": "a"
                        },
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 28,
                            "end": 30,
                            "body": []
                        }
                    }
                }],
                "sourceType": "module"
            }
        });
    
    });