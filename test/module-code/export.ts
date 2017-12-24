import { pass, fail } from '../utils';

describe('Module code - Export', () => {

        fail(`import x from "x";
delete x;`, {
            source: `import x from "x";
delete x;`,
            module: true
        });

        fail(`import house from "house";

with (house) {
	console.log(roof);
}`, {
            source: `import house from "house";

with (house) {
	console.log(roof);
}`,
            module: true
        });

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

        fail(`export default async\nfunction() {}`, {
            source: `export default async\nfunction() {}`,
        });

        fail(`export default\nasync function() {}`, {
            source: `export default\nasync function() {}`,
        });

        fail(`export async\nfunction() {}`, {
            source: `export async\nfunction() {}`,
        });

        fail(`export \nasync function() {}`, {
            source: `export \nasync function() {}`,
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
                type: 'Program',
                body: [{
                    type: 'ExportDefaultDeclaration',
                    declaration: {
                        type: 'ClassDeclaration',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [],
                            start: 21,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        start: 15,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
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
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [],
                    declaration: {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 1,
                                start: 17,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                },
                                raw: '1'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 11,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            },
                            start: 11,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        }],
                        kind: 'let',
                        start: 7,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    start: 0,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 19,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 19
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
                type: 'Program',
                body: [{
                    type: 'ExportAllDeclaration',
                    source: {
                        type: 'Literal',
                        value: 'foo',
                        start: 14,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        raw: '"foo"'
                    },
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
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
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [{
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 8,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'default',
                                start: 15,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            },
                            start: 8,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        },
                        {
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'bar',
                                start: 24,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'bar',
                                start: 24,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            },
                            start: 24,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }
                    ],
                    declaration: null,
                    start: 0,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 29,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 29
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
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [],
                    declaration: {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'bar',
                                start: 11,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            },
                            start: 11,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        }],
                        kind: 'var',
                        start: 7,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
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
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [],
                    declaration: null,
                    start: 0,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
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
                type: 'Program',
                body: [
                    {
                        type: 'ExportNamedDeclaration',
                        source: null,
                        specifiers: [],
                        declaration: {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    init: {
                                        type: 'ObjectExpression',
                                        properties: [],
                                        start: 24,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        }
                                    },
                                    id: {
                                        type: 'Identifier',
                                        name: 'document',
                                        start: 13,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    start: 13,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                }
                            ],
                            kind: 'const',
                            start: 7,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        start: 0,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    }
                ],
                sourceType: 'module',
                start: 0,
                end: 27,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
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
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    source: {
                        type: 'Literal',
                        value: 'foo',
                        start: 34,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 34
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        },
                        raw: '"foo"'
                    },
                    specifiers: [{
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 8,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'default',
                                start: 15,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            },
                            start: 8,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        },
                        {
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'bar',
                                start: 24,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'bar',
                                start: 24,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            },
                            start: 24,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }
                    ],
                    declaration: null,
                    start: 0,
                    end: 40,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 40
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 40,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 40
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
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [],
                    declaration: {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 23,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 16,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 7,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
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
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [{
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 8,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 8,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            start: 8,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
                        {
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'bar',
                                start: 13,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'bar',
                                start: 13,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            start: 13,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        }
                    ],
                    declaration: null,
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 18,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
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
                type: 'Program',
                body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [],
                    declaration: {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 26,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 26
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            }
                        },
                        async: true,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'a',
                            start: 22,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        start: 7,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    },
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                }],
                sourceType: 'module',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
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
                type: 'Program',
                start: 0,
                end: 38,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 38
                    }
                },
                body: [{
                    type: 'ImportDeclaration',
                    start: 0,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    },
                    specifiers: [{
                        type: 'ImportNamespaceSpecifier',
                        start: 7,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        local: {
                            type: 'Identifier',
                            start: 12,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            name: 'o'
                        }
                    }],
                    source: {
                        type: 'Literal',
                        start: 19,
                        end: 37,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 37
                            }
                        },
                        value: './resources/o.js',
                        raw: '\'./resources/o.js\''
                    }
                }],
                sourceType: 'module'
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
            module: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 1,
                                    raw: '1'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: '_if'
                                }
                            }
                        ],
                        kind: 'var'
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 2,
                                    raw: '2'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: '_import'
                                }
                            }
                        ],
                        kind: 'var'
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 3,
                                    raw: '3'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: '_export'
                                }
                            }
                        ],
                        kind: 'var'
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 4,
                                    raw: '4'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: '_await'
                                }
                            }
                        ],
                        kind: 'var'
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 5,
                                    raw: '5'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: '_arguments'
                                }
                            }
                        ],
                        kind: 'var'
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 6,
                                    raw: '6'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: '_eval'
                                }
                            }
                        ],
                        kind: 'var'
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 7,
                                    raw: '7'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: '_default'
                                }
                            }
                        ],
                        kind: 'var'
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 8,
                                    raw: '8'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: '_as'
                                }
                            }
                        ],
                        kind: 'var'
                    },
                    {
                        type: 'ExportNamedDeclaration',
                        source: null,
                        specifiers: [
                            {
                                type: 'ExportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: '_if'
                                },
                                exported: {
                                    type: 'Identifier',
                                    name: 'if'
                                }
                            },
                            {
                                type: 'ExportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: '_import'
                                },
                                exported: {
                                    type: 'Identifier',
                                    name: 'import'
                                }
                            },
                            {
                                type: 'ExportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: '_export'
                                },
                                exported: {
                                    type: 'Identifier',
                                    name: 'export'
                                }
                            },
                            {
                                type: 'ExportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: '_await'
                                },
                                exported: {
                                    type: 'Identifier',
                                    name: 'await'
                                }
                            },
                            {
                                type: 'ExportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: '_arguments'
                                },
                                exported: {
                                    type: 'Identifier',
                                    name: 'arguments'
                                }
                            },
                            {
                                type: 'ExportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: '_eval'
                                },
                                exported: {
                                    type: 'Identifier',
                                    name: 'eval'
                                }
                            },
                            {
                                type: 'ExportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: '_default'
                                },
                                exported: {
                                    type: 'Identifier',
                                    name: 'default'
                                }
                            },
                            {
                                type: 'ExportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: '_as'
                                },
                                exported: {
                                    type: 'Identifier',
                                    name: 'as'
                                }
                            }
                        ],
                        declaration: null
                    },
                    {
                        type: 'ImportDeclaration',
                        specifiers: [
                            {
                                type: 'ImportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'if_'
                                },
                                imported: {
                                    type: 'Identifier',
                                    name: 'if'
                                }
                            },
                            {
                                type: 'ImportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'import_'
                                },
                                imported: {
                                    type: 'Identifier',
                                    name: 'import'
                                }
                            },
                            {
                                type: 'ImportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'export_'
                                },
                                imported: {
                                    type: 'Identifier',
                                    name: 'export'
                                }
                            },
                            {
                                type: 'ImportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'await_'
                                },
                                imported: {
                                    type: 'Identifier',
                                    name: 'await'
                                }
                            },
                            {
                                type: 'ImportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'arguments_'
                                },
                                imported: {
                                    type: 'Identifier',
                                    name: 'arguments'
                                }
                            },
                            {
                                type: 'ImportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'eval_'
                                },
                                imported: {
                                    type: 'Identifier',
                                    name: 'eval'
                                }
                            },
                            {
                                type: 'ImportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'default_'
                                },
                                imported: {
                                    type: 'Identifier',
                                    name: 'default'
                                }
                            },
                            {
                                type: 'ImportSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'as'
                                },
                                imported: {
                                    type: 'Identifier',
                                    name: 'as'
                                }
                            }
                        ],
                        source: {
                            type: 'Literal',
                            value: './instn-named-id-name.js',
                            raw: '\'./instn-named-id-name.js\''
                        }
                    }
                ],
                sourceType: 'module'
            }
        });

        pass(`export let document = { }`, {
            source: `export let document = { }`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                },
                body: [{
                    type: 'ExportNamedDeclaration',
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    },
                    declaration: {
                        type: 'VariableDeclaration',
                        start: 7,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        declarations: [{
                            type: 'VariableDeclarator',
                            start: 11,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            id: {
                                type: 'Identifier',
                                start: 11,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                },
                                name: 'document'
                            },
                            init: {
                                type: 'ObjectExpression',
                                start: 22,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                },
                                properties: []
                            }
                        }],
                        kind: 'let'
                    },
                    specifiers: [],
                    source: null
                }],
                sourceType: 'module'
            }
        });

        pass(`export default (async function() { })`, {
            source: `export default (async function() { })`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 37,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 37
                    }
                },
                body: [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    end: 37,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    },
                    declaration: {
                        type: 'FunctionExpression',
                        start: 16,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: true,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            start: 33,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 33
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'module'
            }
        });

        pass(`export default 'x' in { x: true }`, {
            source: `export default 'x' in { x: true }`,
            loc: true,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 33,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 33
                    }
                },
                body: [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    },
                    declaration: {
                        type: 'BinaryExpression',
                        start: 15,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        },
                        left: {
                            type: 'Literal',
                            start: 15,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            },
                            value: 'x',
                            raw: '\'x\''
                        },
                        operator: 'in',
                        right: {
                            type: 'ObjectExpression',
                            start: 22,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 24,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 24,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    name: 'x'
                                },
                                value: {
                                    type: 'Literal',
                                    start: 27,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    },
                                    value: true,
                                    raw: 'true'
                                },
                                kind: 'init'
                            }]
                        }
                    }
                }],
                sourceType: 'module'
            }
        });

        pass(`export default function* a(){}`, {
            source: `export default function* a(){}`,
            ranges: true,
            module: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 30,
                body: [{
                    type: 'ExportDefaultDeclaration',
                    start: 0,
                    end: 30,
                    declaration: {
                        type: 'FunctionDeclaration',
                        start: 15,
                        end: 30,
                        id: {
                            type: 'Identifier',
                            start: 25,
                            end: 26,
                            name: 'a'
                        },
                        generator: true,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            start: 28,
                            end: 30,
                            body: []
                        }
                    }
                }],
                sourceType: 'module'
            }
        });

        pass(`export const foo = 3;`, {
            source: `export const foo = 3;`,
            ranges: true,
            loc: true,
            module: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 21,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 21
    }
  },
  body: [
    {
      type: 'ExportNamedDeclaration',
      start: 0,
      end: 21,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 21
        }
      },
      declaration: {
        type: 'VariableDeclaration',
        start: 7,
        end: 21,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 21
          }
        },
        declarations: [
          {
            type: 'VariableDeclarator',
            start: 13,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 20
              }
            },
            id: {
              type: 'Identifier',
              start: 13,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 16
                }
              },
              name: 'foo'
            },
            init: {
              type: 'Literal',
              start: 19,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 20
                }
              },
              value: 3,
              raw: '3'
            }
          }
        ],
        kind: 'const'
      },
      specifiers: [],
      source: null
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export let bar;`, {
            source: `export let bar;`,
            ranges: true,
            loc: true,
            module: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 15,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 15
    }
  },
  body: [
    {
      type: 'ExportNamedDeclaration',
      start: 0,
      end: 15,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 15
        }
      },
      declaration: {
        type: 'VariableDeclaration',
        start: 7,
        end: 15,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 15
          }
        },
        declarations: [
          {
            type: 'VariableDeclarator',
            start: 11,
            end: 14,
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 14
              }
            },
            id: {
              type: 'Identifier',
              start: 11,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 14
                }
              },
              name: 'bar'
            },
            init: null
          }
        ],
        kind: 'let'
      },
      specifiers: [],
      source: null
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export default class foo {};`, {
            source: `export default class foo {};`,
            ranges: true,
            loc: true,
            module: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 28,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 28
    }
  },
  body: [
    {
      type: 'ExportDefaultDeclaration',
      start: 0,
      end: 27,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 27
        }
      },
      declaration: {
        type: 'ClassDeclaration',
        start: 15,
        end: 27,
        loc: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 27
          }
        },
        id: {
          type: 'Identifier',
          start: 21,
          end: 24,
          loc: {
            start: {
              line: 1,
              column: 21
            },
            end: {
              line: 1,
              column: 24
            }
          },
          name: 'foo'
        },
        superClass: null,
        body: {
          type: 'ClassBody',
          start: 25,
          end: 27,
          loc: {
            start: {
              line: 1,
              column: 25
            },
            end: {
              line: 1,
              column: 27
            }
          },
          body: []
        }
      }
    },
    {
      type: 'EmptyStatement',
      start: 27,
      end: 28,
      loc: {
        start: {
          line: 1,
          column: 27
        },
        end: {
          line: 1,
          column: 28
        }
      }
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export default class {};`, {
            source: `export default class {};`,
            ranges: true,
            loc: true,
            module: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 24,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 24
    }
  },
  body: [
    {
      type: 'ExportDefaultDeclaration',
      start: 0,
      end: 23,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 23
        }
      },
      declaration: {
        type: 'ClassDeclaration',
        start: 15,
        end: 23,
        loc: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 23
          }
        },
        id: null,
        superClass: null,
        body: {
          type: 'ClassBody',
          start: 21,
          end: 23,
          loc: {
            start: {
              line: 1,
              column: 21
            },
            end: {
              line: 1,
              column: 23
            }
          },
          body: []
        }
      }
    },
    {
      type: 'EmptyStatement',
      start: 23,
      end: 24,
      loc: {
        start: {
          line: 1,
          column: 23
        },
        end: {
          line: 1,
          column: 24
        }
      }
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export class foo extends bar {};`, {
            source: `export class foo extends bar {};`,
            ranges: true,
            loc: true,
            module: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 32,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 32
    }
  },
  body: [
    {
      type: 'ExportNamedDeclaration',
      start: 0,
      end: 31,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 31
        }
      },
      declaration: {
        type: 'ClassDeclaration',
        start: 7,
        end: 31,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 31
          }
        },
        id: {
          type: 'Identifier',
          start: 13,
          end: 16,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 16
            }
          },
          name: 'foo'
        },
        superClass: {
          type: 'Identifier',
          start: 25,
          end: 28,
          loc: {
            start: {
              line: 1,
              column: 25
            },
            end: {
              line: 1,
              column: 28
            }
          },
          name: 'bar'
        },
        body: {
          type: 'ClassBody',
          start: 29,
          end: 31,
          loc: {
            start: {
              line: 1,
              column: 29
            },
            end: {
              line: 1,
              column: 31
            }
          },
          body: []
        }
      },
      specifiers: [],
      source: null
    },
    {
      type: 'EmptyStatement',
      start: 31,
      end: 32,
      loc: {
        start: {
          line: 1,
          column: 31
        },
        end: {
          line: 1,
          column: 32
        }
      }
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export class foo {};`, {
            source: `export class foo {};`,
            ranges: true,
            loc: true,
            module: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 20,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 20
    }
  },
  body: [
    {
      type: 'ExportNamedDeclaration',
      start: 0,
      end: 19,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 19
        }
      },
      declaration: {
        type: 'ClassDeclaration',
        start: 7,
        end: 19,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 19
          }
        },
        id: {
          type: 'Identifier',
          start: 13,
          end: 16,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 16
            }
          },
          name: 'foo'
        },
        superClass: null,
        body: {
          type: 'ClassBody',
          start: 17,
          end: 19,
          loc: {
            start: {
              line: 1,
              column: 17
            },
            end: {
              line: 1,
              column: 19
            }
          },
          body: []
        }
      },
      specifiers: [],
      source: null
    },
    {
      type: 'EmptyStatement',
      start: 19,
      end: 20,
      loc: {
        start: {
          line: 1,
          column: 19
        },
        end: {
          line: 1,
          column: 20
        }
      }
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export default (1 + 2);`, {
            source: `export default (1 + 2);`,
            ranges: true,
            module: true,
            loc: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 23,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 23
    }
  },
  body: [
    {
      type: 'ExportDefaultDeclaration',
      start: 0,
      end: 23,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 23
        }
      },
      declaration: {
        type: 'BinaryExpression',
        start: 16,
        end: 21,
        loc: {
          start: {
            line: 1,
            column: 16
          },
          end: {
            line: 1,
            column: 21
          }
        },
        left: {
          type: 'Literal',
          start: 16,
          end: 17,
          loc: {
            start: {
              line: 1,
              column: 16
            },
            end: {
              line: 1,
              column: 17
            }
          },
          value: 1,
          raw: '1'
        },
        operator: '+',
        right: {
          type: 'Literal',
          start: 20,
          end: 21,
          loc: {
            start: {
              line: 1,
              column: 20
            },
            end: {
              line: 1,
              column: 21
            }
          },
          value: 2,
          raw: '2'
        }
      }
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export default { foo: 1 };`, {
            source: `export default { foo: 1 };`,
            ranges: true,
            module: true,
            loc: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 26,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 26
    }
  },
  body: [
    {
      type: 'ExportDefaultDeclaration',
      start: 0,
      end: 26,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 26
        }
      },
      declaration: {
        type: 'ObjectExpression',
        start: 15,
        end: 25,
        loc: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 25
          }
        },
        properties: [
          {
            type: 'Property',
            start: 17,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 17
              },
              end: {
                line: 1,
                column: 23
              }
            },
            method: false,
            shorthand: false,
            computed: false,
            key: {
              type: 'Identifier',
              start: 17,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 20
                }
              },
              name: 'foo'
            },
            value: {
              type: 'Literal',
              start: 22,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 23
                }
              },
              value: 1,
              raw: '1'
            },
            kind: 'init'
          }
        ]
      }
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export default (class {});`, {
            source: `export default (class {});`,
            ranges: true,
            module: true,
            loc: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 26,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 26
    }
  },
  body: [
    {
      type: 'ExportDefaultDeclaration',
      start: 0,
      end: 26,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 26
        }
      },
      declaration: {
        type: 'ClassExpression',
        start: 16,
        end: 24,
        loc: {
          start: {
            line: 1,
            column: 16
          },
          end: {
            line: 1,
            column: 24
          }
        },
        id: null,
        superClass: null,
        body: {
          type: 'ClassBody',
          start: 22,
          end: 24,
          loc: {
            start: {
              line: 1,
              column: 22
            },
            end: {
              line: 1,
              column: 24
            }
          },
          body: []
        }
      }
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export var foo = function () {};`, {
            source: `export var foo = function () {};`,
            ranges: true,
            module: true,
            loc: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 32,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 32
    }
  },
  body: [
    {
      type: 'ExportNamedDeclaration',
      start: 0,
      end: 32,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 32
        }
      },
      declaration: {
        type: 'VariableDeclaration',
        start: 7,
        end: 32,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 32
          }
        },
        declarations: [
          {
            type: 'VariableDeclarator',
            start: 11,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 31
              }
            },
            id: {
              type: 'Identifier',
              start: 11,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 14
                }
              },
              name: 'foo'
            },
            init: {
              type: 'FunctionExpression',
              start: 17,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 31
                }
              },
              id: null,
              generator: false,
              expression: false,
              async: false,
              params: [],
              body: {
                type: 'BlockStatement',
                start: 29,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                },
                body: []
              }
            }
          }
        ],
        kind: 'var'
      },
      specifiers: [],
      source: null
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export var bar;`, {
            source: `export var bar;`,
            ranges: true,
            module: true,
            loc: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 15,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 15
    }
  },
  body: [
    {
      type: 'ExportNamedDeclaration',
      start: 0,
      end: 15,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 15
        }
      },
      declaration: {
        type: 'VariableDeclaration',
        start: 7,
        end: 15,
        loc: {
          start: {
            line: 1,
            column: 7
          },
          end: {
            line: 1,
            column: 15
          }
        },
        declarations: [
          {
            type: 'VariableDeclarator',
            start: 11,
            end: 14,
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 14
              }
            },
            id: {
              type: 'Identifier',
              start: 11,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 14
                }
              },
              name: 'bar'
            },
            init: null
          }
        ],
        kind: 'var'
      },
      specifiers: [],
      source: null
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export {foo} from "foo";`, {
            source: `export {foo} from "foo";`,
            ranges: true,
            module: true,
            loc: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 24,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 24
    }
  },
  body: [
    {
      type: 'ExportNamedDeclaration',
      start: 0,
      end: 24,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 24
        }
      },
      declaration: null,
      specifiers: [
        {
          type: 'ExportSpecifier',
          start: 8,
          end: 11,
          loc: {
            start: {
              line: 1,
              column: 8
            },
            end: {
              line: 1,
              column: 11
            }
          },
          local: {
            type: 'Identifier',
            start: 8,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 11
              }
            },
            name: 'foo'
          },
          exported: {
            type: 'Identifier',
            start: 8,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 11
              }
            },
            name: 'foo'
          }
        }
      ],
      source: {
        type: 'Literal',
        start: 18,
        end: 23,
        loc: {
          start: {
            line: 1,
            column: 18
          },
          end: {
            line: 1,
            column: 23
          }
        },
        value: 'foo',
        raw: '"foo"'
      }
    }
  ],
  sourceType: 'module'
}
        });

        pass(`export default [];`, {
            source: `export default [];`,
            ranges: true,
            module: true,
            loc: true,
            raw: true,
            expected: {
  type: 'Program',
  start: 0,
  end: 18,
  loc: {
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 18
    }
  },
  body: [
    {
      type: 'ExportDefaultDeclaration',
      start: 0,
      end: 18,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 18
        }
      },
      declaration: {
        type: 'ArrayExpression',
        start: 15,
        end: 17,
        loc: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 17
          }
        },
        elements: []
      }
    }
  ],
  sourceType: 'module'
}
        });

    });