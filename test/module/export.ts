import { pass, fail } from '../test-utils';

describe('Module - Export', () => {

    fail(`export { default }`, {
        source: `export { default }`,
        module: true,
        line: 1
    });

    fail(`export { if }`, {
        source: `export { if }`,
        module: true,
        line: 1
    });

    fail(`export { default as foo }`, {
        source: `export { default as foo }`,
        module: true,
        line: 1
    });

    fail(`export { if as foo }`, {
        source: `export { if as foo }`,
        module: true,
        line: 1
    });

    fail(`import default from "foo"`, {
        source: `import default from "foo"`,
        module: true,
        line: 1
    });

    fail(`export default from`, {
        source: `export default from`,
        module: true,
        line: 1
    });

    fail(`export "string_constant";`, {
        source: `export "string_constant";`,
        module: true
    });

    fail(`export function () { }`, {
        source: `export function () { }`,
        module: true,
        line: 1
    });

    fail(`export class { }`, {
        source: `export class { }`,
        module: true,
        line: 1
    });

    fail(`export * from foo`, {
        source: `export * from foo`,
        module: true,
        line: 1
    });

    fail(`export { bar } from foo`, {
        source: `export { bar } from foo`,
        module: true,
        line: 1
    });

    fail(`export {default} +`, {
        source: `export {default} +`,
        module: true,
        message: 'Unexpected token',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`import x from "x";
delete x;`, {
            source: `import x from "x";
delete x;`,
            module: true,
            line: 2
        });

    fail(`import house from "house";
with (house) {
	console.log(roof);
}`, {
            source: `import house from "house";
with (house) {
	console.log(roof);
}`,
            module: true,
            line: 1
        });

    fail(`export {default} +`, {
            source: `export {default} +`,
            module: true,
            line: 1
        });

    fail(`export default from "foo"`, {
            source: `export default from "foo"`,
            module: true,
            message: 'Unexpected token from',
            line: 1,
            column: 14,
            index: 14
        });

    fail(`export {default}`, {
            source: `export {default}`,
            module: true,
            line: 1
        });

    fail(`export *`, {
            source: `export *`,
            module: true,
            line: 1
        });

    fail(`export {} \\u0066rom "./escaped-from.js";`, {
            source: `export {} \\u0066rom "./escaped-from.js";`,
            module: true,
            line: 1
        });

    fail(`export {a}; export class a(){};`, {
            source: `export {a}; export class a(){};`,
            module: true,
            message: 'Unexpected token (',
            line: 1,
            column: 26,
            index: 26
        });

    fail(`export d\\u0065fault 0;`, {
            source: `export d\\u0065fault 0;`,
            module: true,
            line: 1
        });

    fail(`with ({}) async function f() {}`, {
            source: `with ({}) async function f() {}`,
            module: true,
            message: 'Strict mode code may not include a with statement',
            line: 1,
            column: 0,
            index: 0
        });

    fail(`class C { static method() { export default null; } }`, {
            source: `class C { static method() { export default null; } }`,
            module: true,
            message: 'Export declarations may only appear at top level of a module',
            line: 1,
            column: 27,
            index: 27
        });

    fail(`export {} null;`, {
            source: `export {} null;`,
            module: true,
            message: 'Unexpected token null',
            line: 1,
            column: 9,
            index: 9
        });

    fail(`label: { label: 0; }`, {
            source: `label: { label: 0; }`,
            module: true,
            message: 'Label \'label\' has already been declared',
            line: 1,
            column: 15,
            index: 15
        });

    fail(`export * from 123;`, {
            source: `export * from 123;`,
            module: true,
            line: 1
        });

    fail(`export { if as foo }`, {
            source: `export { if as foo }`,
            module: true,
            line: 1
        });

    fail(`export class {}`, {
            source: `export class {}`,
            module: true,
            line: 1
        });

    fail(`import * as enum from "bar"`, {
            source: `import * as enum from "bar"`,
            module: true,
            line: 1
        });

    fail(`export default async func`, {
            source: `export default async func`,
            module: true,
            line: 1
        });

    fail(`export default async\nfunction() {}`, {
            source: `export default async\nfunction() {}`,
            line: 1
        });

    fail(`export default\nasync function() {}`, {
            source: `export default\nasync function() {}`,
            line: 1
        });

    fail(`export async\nfunction() {}`, {
            source: `export async\nfunction() {}`,
            module: true,
            line: 1
        });

    fail(`export \nasync function() {}`, {
            source: `export \nasync function() {}`,
            module: true,
            line: 2
        });

    fail(`export typeof foo;`, {
            source: `export typeof foo;`,
            module: true,
            line: 1
        });

    fail(`export {a,b} from a`, {
            source: `export {a,b} from a`,
            module: true,
            line: 1
        });

    fail(`export 3`, {
            source: `export 3`,
            module: true,
            line: 1
        });

    fail(`export default default`, {
            source: `export default default`,
        });

    pass('export let document = { }', {
            source: 'export let document = { }',
            module: true,
            expected: {
                  body: [
                    {
                      declaration: {
                        declarations: [
                          {
                            id: {
                              name: 'document',
                              type: 'Identifier',
                            },
                            init: {
                              properties: [],
                              type: 'ObjectExpression'
                            },
                            type: 'VariableDeclarator'
                         }
                        ],
                        kind: 'let',
                        type: 'VariableDeclaration'
                     },
                      source: null,
                      specifiers: [],
                      type: 'ExportNamedDeclaration'
                    }
                  ],
                 sourceType: 'module',
                  type: 'Program'
                }
        });

    pass('export default class Foo {}++x', {
            source: 'export default class Foo {}++x',
            module: true,
            expected: {
                  body: [
                    {
                      declaration: {
                        body: {
                          body: [],
                          type: 'ClassBody'
                        },
                        id: {
                          name: 'Foo',
                          type: 'Identifier'
                        },
                        superClass: null,
                        type: 'ClassDeclaration'
                      },
                      type: 'ExportDefaultDeclaration'
                    },
                    {
                      expression: {
                        argument: {
                          name: 'x',
                          type: 'Identifier'
                        },
                        operator: '++',
                        prefix: true,
                        type: 'UpdateExpression'
                      },
                      type: 'ExpressionStatement'
                    }
                  ],
                  sourceType: 'module',
                  type: 'Program'
                }
        });
    pass('export default function(x) {};', {
            source: 'export default function(x) {};',
            module: true,
            expected: {
                  body: [
                    {
                      declaration: {
                        async: false,
                        body: {
                          body: [],
                          type: 'BlockStatement',
                        },
                        expression: false,
                        generator: false,
                        id: null,
                        params: [
                          {
                            name: 'x',
                            type: 'Identifier'
                          },
                        ],
                        type: 'FunctionDeclaration'
                      },
                      type: 'ExportDefaultDeclaration'
                    },
                    {
                      type: 'EmptyStatement'
                    }
                  ],
                 sourceType: 'module',
                  type: 'Program'
                }
        });

    pass('export var foo;', {
        source: 'export var foo;',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            sourceType: 'module',
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
                                init: null,
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
                            }
                        ],
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
                }
            ],
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

    pass('export let hoo;', {
        source: 'export let hoo;',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            sourceType: 'module',
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
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'hoo',
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
                            }
                        ],
                        kind: 'let',
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
                }
            ],
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

    pass('export {aa as bb, x};', {
        source: 'export {aa as bb, x};',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            sourceType: 'module',
            body: [
                {
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [
                        {
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'aa',
                                start: 8,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'bb',
                                start: 14,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            start: 8,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        {
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'x',
                                start: 18,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'x',
                                start: 18,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            start: 18,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    ],
                    declaration: null,
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
                    }
                }
            ],
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
            }
        }
    });

    pass('export default async function*() { var x = () => {  } }', {
        source: 'export default async function*() { var x = () => {  } }',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExportDefaultDeclaration',
                    declaration: {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            init: {
                                                type: 'ArrowFunctionExpression',
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
                                                    start: 49,
                                                    end: 53,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 49
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 53
                                                        }
                                                    }
                                                },
                                                params: [],
                                                id: null,
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                start: 43,
                                                end: 53,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 43
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 53
                                                    }
                                                }
                                            },
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                start: 39,
                                                end: 40,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 39
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 40
                                                    }
                                                }
                                            },
                                            start: 39,
                                            end: 53,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 53
                                                }
                                            }
                                        }
                                    ],
                                    kind: 'var',
                                    start: 35,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 53
                                        }
                                    }
                                }
                            ],
                            start: 33,
                            end: 55,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 33
                                },
                                end: {
                                    line: 1,
                                    column: 55
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 15,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    },
                    start: 0,
                    end: 55,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 55
                        }
                    }
                }
            ],
            sourceType: 'module',
            start: 0,
            end: 55,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 55
                }
            }
        }
    });

    pass('export let x = 0;', {
        source: 'export let x = 0;',
        loc: true,
        ranges: true,
        module: true,
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
                            value: 0,
                            start: 15,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            start: 11,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        start: 11,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    }],
                    kind: 'let',
                    start: 7,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            }],
            sourceType: 'module',
            start: 0,
            end: 17,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }
    });

    pass('export class C { };', {
        source: 'export class C { };',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [],
                    declaration: {
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'C',
                            start: 13,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [],
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
                            }
                        },
                        start: 7,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
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
                },
                {
                    type: 'EmptyStatement',
                    start: 18,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 18
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                }
            ],
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

    pass('var a, b, c; export { a, b as baz, c };', {
        source: 'var a, b, c; export { a, b as baz, c };',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            },
                            start: 4,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'b',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            },
                            start: 7,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'c',
                                start: 10,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            start: 10,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                },
                {
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [{
                            type: 'ExportSpecifier',
                            local: {
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
                            exported: {
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
                        {
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'b',
                                start: 25,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'baz',
                                start: 30,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            },
                            start: 25,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        },
                        {
                            type: 'ExportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'c',
                                start: 35,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 35
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            exported: {
                                type: 'Identifier',
                                name: 'c',
                                start: 35,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 35
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            start: 35,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 35
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        }
                    ],
                    declaration: null,
                    start: 13,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 13
                        },
                        end: {
                            line: 1,
                            column: 39
                        }
                    }
                }
            ],
            sourceType: 'module',
            start: 0,
            end: 39,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 39
                }
            }
        }
    });

    pass('var x; export default x = 7', {
        source: 'var x; export default x = 7',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            start: 4,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        start: 4,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    }],
                    kind: 'var',
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                {
                    type: 'ExportDefaultDeclaration',
                    declaration: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: 7,
                            start: 26,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 26
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        start: 22,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    },
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

    pass('export { for } from "m.js";', {
        source: 'export { for } from "m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExportNamedDeclaration',
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 20,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 20
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                },
                specifiers: [{
                    type: 'ExportSpecifier',
                    local: {
                        type: 'Identifier',
                        name: 'for',
                        start: 9,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    exported: {
                        type: 'Identifier',
                        name: 'for',
                        start: 9,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    start: 9,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                }],
                declaration: null,
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
            }],
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

    pass('export default class extends C {}', {
        source: 'export default class extends C {}',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExportDefaultDeclaration',
                declaration: {
                    type: 'ClassDeclaration',
                    id: null,
                    superClass: {
                        type: 'Identifier',
                        name: 'C',
                        start: 29,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 29
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [],
                        start: 31,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 31
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    },
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
                    }
                },
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
                }
            }],
            sourceType: 'module',
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
            }
        }
    });

    pass('export default 42', {
        source: 'export default 42',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExportDefaultDeclaration',
                declaration: {
                    type: 'Literal',
                    value: 42,
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
                    }
                },
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            }],
            sourceType: 'module',
            start: 0,
            end: 17,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }
    });

    pass('export { Q } from "somemodule.js";', {
        source: 'export { Q } from "somemodule.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExportNamedDeclaration',
                source: {
                    type: 'Literal',
                    value: 'somemodule.js',
                    start: 18,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 18
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                },
                specifiers: [{
                    type: 'ExportSpecifier',
                    local: {
                        type: 'Identifier',
                        name: 'Q',
                        start: 9,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    exported: {
                        type: 'Identifier',
                        name: 'Q',
                        start: 9,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 9,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                }],
                declaration: null,
                start: 0,
                end: 34,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 34
                    }
                }
            }],
            sourceType: 'module',
            start: 0,
            end: 34,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 34
                }
            }
        }
    });

    pass('export default function() {}', {
        source: 'export default function() {}',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExportDefaultDeclaration',
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
                    async: false,
                    generator: false,
                    expression: false,
                    id: null,
                    start: 15,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
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

    pass('export default function f() {}', {
        source: 'export default function f() {}',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExportDefaultDeclaration',
                declaration: {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 28,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 28
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                        }
                    },
                    start: 15,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                },
                start: 0,
                end: 30,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 30
                    }
                }
            }],
            sourceType: 'module',
            start: 0,
            end: 30,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }
    });

    pass('export { static } from "m.js"', {
        source: 'export { static } from "m.js"',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExportNamedDeclaration',
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 23,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 23
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                },
                specifiers: [{
                    type: 'ExportSpecifier',
                    local: {
                        type: 'Identifier',
                        name: 'static',
                        start: 9,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    exported: {
                        type: 'Identifier',
                        name: 'static',
                        start: 9,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    start: 9,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                }],
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

    pass('var a; export { a as enum };', {
        source: 'var a; export { a as enum };',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                            type: 'Identifier',
                            name: 'a',
                            start: 4,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        start: 4,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    }],
                    kind: 'var',
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                {
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [{
                        type: 'ExportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'a',
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
                            }
                        },
                        exported: {
                            type: 'Identifier',
                            name: 'enum',
                            start: 21,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        start: 16,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    }],
                    declaration: null,
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
                }
            ],
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

    pass('export const z = 0;', {
        source: 'export const z = 0;',
        loc: true,
        ranges: true,
        module: true,
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
                            value: 0,
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
                            }
                        },
                        id: {
                            type: 'Identifier',
                            name: 'z',
                            start: 13,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        start: 13,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    }],
                    kind: 'const',
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

    pass('export { };', {
        source: 'export { };',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExportNamedDeclaration',
                source: null,
                specifiers: [],
                declaration: null,
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            }],
            sourceType: 'module',
            start: 0,
            end: 11,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }
    });

    pass('export let x = 0;', {
        source: 'export let x = 0;',
        loc: true,
        ranges: true,
        module: true,
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
                            value: 0,
                            start: 15,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        id: {
                            type: 'Identifier',
                            name: 'x',
                            start: 11,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        start: 11,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    }],
                    kind: 'let',
                    start: 7,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            }],
            sourceType: 'module',
            start: 0,
            end: 17,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }
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
            body: [{
                type: 'ExportNamedDeclaration',
                source: null,
                specifiers: [],
                declaration: {
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
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
            }],
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
            body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                {
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [{
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
                    specifiers: [{
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
            body: [{
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
                    declarations: [{
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
                    }],
                    kind: 'const'
                },
                specifiers: [],
                source: null
            }],
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
            body: [{
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
                    declarations: [{
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
                    }],
                    kind: 'let'
                },
                specifiers: [],
                source: null
            }],
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
            body: [{
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
            body: [{
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
            body: [{
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
            body: [{
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
            body: [{
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
            }],
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
            body: [{
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
                    properties: [{
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
                    }]
                }
            }],
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
            body: [{
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
            }],
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
            body: [{
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
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                specifiers: [],
                source: null
            }],
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
            body: [{
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
                    declarations: [{
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
                    }],
                    kind: 'var'
                },
                specifiers: [],
                source: null
            }],
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
            body: [{
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
                specifiers: [{
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
                }],
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
            }],
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
            body: [{
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
            }],
            sourceType: 'module'
        }
    });
});