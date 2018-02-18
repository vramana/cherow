import { pass, fail } from '../test-utils';

describe('Module - Import', () => {

    fail(`import a`, {
        source: `import a`,
        module: true,
        message: 'Unexpected token end of source',
        line: 1,
        column: 8,
        index: 8
    });

    fail(`import { class } from 'foo'`, {
        source: `import { class } from 'foo'`,
        module: true,
        impliedStrict: true,
        line: 1,
        message: 'Unexpected keyword \'class\'',
        column: 14,
        index: 14
    });

    fail(`import { class, var } from 'foo'`, {
        source: `import { class, var } from 'foo'`,
        module: true,
        line: 1,
        message: 'Unexpected keyword \'class\'',
        column: 14,
        index: 14
    });

    fail(`import { a as class } from 'foo'`, {
        source: `import { a as class } from 'foo'`,
        module: true,
        line: 1,
        message: 'Unexpected token class',
        column: 13,
        index: 13
    });

    fail(`import * as class from 'foo'`, {
        source: `import * as class from 'foo'`,
        module: true,
        line: 1,
        message: 'Unexpected token class',
        column: 11,
        index: 11
    });

    fail(`import { enum } from 'foo'`, {
        source: `import { enum } from 'foo'`,
        module: true,
        line: 1,
        message: 'Unexpected keyword \'enum\'',
        column: 13,
        index: 13
    });

    fail(`import { for } from "iteration"`, {
        source: `import { for } from "iteration"`,
        module: true,
        line: 1,
        message: 'Unexpected keyword \'for\'',
        column: 12,
        index: 12
    });

    fail(`import {b,,} from "a"`, {
        source: `import {b,,} from "a"`,
        module: true,
        line: 1,
        message: 'Unexpected token ,',
        column: 10,
        index: 10
    });

    fail(`import {b,,} from "a"`, {
        source: `import {b,,} from "a"`,
        module: true,
        line: 1,
        message: 'Unexpected token ,',
        column: 10,
        index: 10
    });

    fail(`import { class } from "foo"`, {
        source: `import { class } from "foo"`,
        module: true,
        line: 1,
        message: 'Unexpected keyword \'class\'',
        column: 14,
        index: 14
    });

    fail(`import * as class from "foo"`, {
        source: `import * as class from "foo"`,
        module: true,
        line: 1,
        message: 'Unexpected token class',
        column: 11,
        index: 11
    });

    fail(`if (1) import "foo";`, {
        source: `if (1) import "foo";`,
        module: true,
        line: 1,
        message: 'Unexpected token',
        column: 6,
        index: 6
    });

    fail(`import {b as,} from "a"`, {
        source: `import {b as,} from "a"`,
        module: true,
        line: 1,
        message: 'Unexpected token ,',
        column: 12,
        index: 12
    });

    fail(`import / as a from  "a"`, {
        source: `import / as a from  "a"`,
        module: true,
        line: 1,
        message: 'Unexpected token /',
        column: 6,
        index: 6
    });

    fail(`import a, b from "a"`, {
        source: `import a, b from "a"`,
        module: true,
        line: 1,
        message: 'Unexpected token identifier',
        column: 9,
        index: 9
    });

    fail(`import * as foo, {bar} from "foo";`, {
        source: `import * as foo, {bar} from "foo";`,
        module: true,
        line: 1,
        message: 'Unexpected token ,',
        column: 15,
        index: 15
    });

    fail(`import * from "foo"`, {
        source: `import * from "foo"`,
        module: true,
        line: 1,
        message: 'Missing \'as\' keyword after import namespace',
        column: 8,
        index: 8
    });

    fail(`import {a \\u0061s b} from "./foo.js";`, {
        source: `import {a \\u0061s b} from "./foo.js";`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail(`import foo`, {
        source: `import foo`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail(`import { x as eval } from "./foo.js";`, {
        source: `import { x as eval } from "./foo.js";`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail(`import {bar}, {foo} from "foo";`, {
        source: `import {bar}, {foo} from "foo";`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail(`import {foo,baz,,} from 'toast';`, {
        source: `import {foo,baz,,} from 'toast';`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail(`import {var} from "foo"`, {
        source: `import {var} from "foo"`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail(`import {default as foo}`, {
        source: `import {default as foo}`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail(`import {foo,baz,,} from 'toast';`, {
        source: `import {foo,baz,,} from 'toast';`,
        line: 1
    });

    fail(`import {foo,,baz} from 'toast';`, {
        source: `import {foo,,baz} from 'toast';`,
        line: 1
    });

    fail(`import * from "foo"`, {
        source: `import * from "foo"`,
        line: 1
    });

    fail(`import {bar}, foo from "foo"`, {
        source: `import {bar}, foo from "foo"`,
        line: 1,
        message: 'Unexpected token',
        column: 0,
        index: 0
    });

    fail(`import foo`, {
        source: `import foo`,
        line: 1,
        module: true,
        message:  'Unexpected token end of source',
        column: 10,
        index: 10
    });

    fail(`import default from "foo"`, {
        source: `import default from "foo"`,
        line: 1,
        module: true,
        message:   'Unexpected token default',
        column: 6,
        index: 6
    });

    fail(`import { foo, bar }`, {
        source: `import { foo, bar }`,
        line: 1
    });

    fail(`export default = 42`, {
        source: `export default = 42`,
        line: 1
    });

    fail(`export * +`, {
        source: `export * +`,
        line: 1
    });
    fail(`export *`, {
        source: `export *`,
        line: 1,
        message: 'Unexpected keyword \'export\'',
        column: 0,
        index: 0
    });

    fail(`export var await;`, {
        source: `export var await;`,
        line: 1,
        message: 'Unexpected keyword \'export\'',
        column: 0,
        index: 0
    });

    fail(`import {`, {
        source: `import {`,
        module: true,
        line: 1,
        message: 'Unexpected token end of source',
        column: 8,
        index: 8
    });

    fail(`import { foo as bar `, {
        source: `import { foo as bar `,
        module: true,
        line: 1,
        message: 'Unexpected token end of source',
        column: 19,
        index: 19
    });

    fail(`import { foo bar } from "module"`, {
        source: `import { foo bar } from "module"`,
        module: true,
        line: 1,
        message: 'Unexpected token identifier',
        column: 12,
        index: 12
    });

    fail(`import { eval } from './foo.js';`, {
        source: `import { eval } from './foo.js';`,
        module: true,
        line: 1,
        message: 'Unexpected eval or arguments in strict mode',
        column: 13,
        index: 13
    });

    fail(`import { foo, , } from "module";`, {
        source: `import { foo, , } from "module";`,
        module: true,
        line: 1,
        message: 'Unexpected token ,',
        column: 13,
        index: 13
    });

    fail(`import {a \\u0061s b} from "./escaped-as-import-specifier.js`, {
        source: `import {a \\u0061s b} from "./escaped-as-import-specifier.js`,
        module: true,
        line: 1
    });

    fail(`import { arguments } from './foo';`, {
        source: `import { arguments } from './foo';`,
        module: true,
        line: 1
    });

    fail(`import {} \\u0066rom "./escaped-from.js";`, {
        source: `import {} \\u0066rom "./escaped-from.js";`,
        module: true,
        line: 1
    });

    fail(`export {a \\u0061s b} from "./escaped-as-export-specifier.js";`, {
        source: `export {a \\u0061s b} from "./escaped-as-export-specifier.js";`,
        module: true,
        line: 1
    });

    fail(`import {a \\u0061s b} from "./escaped-as-import-specifier.js";`, {
        source: `import {a \\u0061s b} from "./escaped-as-import-specifier.js";`,
        module: true,
        line: 1
    });

    fail(`import* \\u0061s self from "./escaped-as-namespace-import.js";`, {
        source: `import* \\u0061s self from "./escaped-as-namespace-import.js";`,
        module: true,
        line: 1
    });

    fail(`import * from "foo"`, {
        source: `import * from "foo"`,
        module: true,
        line: 1
    });

    fail(`import {}`, {
        source: `import {}`,
        module: true,
        line: 1
    });

    fail(`import default from "foo"`, {
        source: `import default from "foo"`,
        module: true,
        line: 1
    });

    fail(`import foo, from "bar";`, {
        source: `import foo, from "bar";`,
        module: true,
        line: 1
    });

    fail(`import { null } from "null"`, {
        source: `import { null } from "null"`,
        module: true,
        line: 1
    });

    fail(`import * as foo, {bar} from "foo";`, {
        source: `import * as foo, {bar} from "foo";`,
        module: true,
        line: 1
    });

    fail(`import {bar}, {foo} from "foo";`, {
        source: `import {bar}, {foo} from "foo";`,
        module: true,
        line: 1
    });

    fail(`import { for } from "iteration"`, {
        source: `import { for } from "iteration"`,
        module: true,
        line: 1
    });

    fail(`import {b,,} from "a"`, {
        source: `import {b,,} from "a"`,
        module: true,
        line: 1
    });

    fail(`import { class } from "foo"`, {
        source: `import { class } from "foo"`,
        module: true,
        line: 1
    });

    fail(`import * as class from "foo"`, {
        source: `import * as class from "foo"`,
        module: true,
        line: 1
    });

    fail(`if (1) import "foo";`, {
        source: `if (1) import "foo";`,
        module: true,
        line: 1
    });

    fail(`import {b as,} from "a"`, {
        source: `import {b as,} from "a"`,
        module: true,
        line: 1
    });

    fail(`import / as a from  "a"`, {
        source: `import / as a from  "a"`,
        module: true,
        line: 1
    });

    fail(`import a, b from "a"`, {
        source: `import a, b from "a"`,
        module: true,
        line: 1
    });

    fail(`import * as foo, {bar} from "foo";`, {
        source: `import * as foo, {bar} from "foo";`,
        module: true,
        line: 1
    });

    fail(`import * from "foo"`, {
        source: `import * from "foo"`,
        module: true,
        line: 1
    });

    fail(`import {a \\u0061s b} from "./foo.js";`, {
        source: `import {a \\u0061s b} from "./foo.js";`,
        module: true,
        line: 1
    });

    fail(`import foo`, {
        source: `import foo`,
        module: true,
        line: 1
    });

    fail(`import { x as eval } from "./foo.js";`, {
        source: `import { x as eval } from "./foo.js";`,
        module: true,
        line: 1
    });

    fail(`import {bar}, {foo} from "foo";`, {
        source: `import {bar}, {foo} from "foo";`,
        module: true,
        line: 1
    });

    fail(`import {foo,baz,,} from 'toast';`, {
        source: `import {foo,baz,,} from 'toast';`,
        module: true,
        line: 1
    });

    fail(`import {var} from "foo"`, {
        source: `import {var} from "foo"`,
        module: true,
        line: 1
    });

    fail(`import {default as foo}`, {
        source: `import {default as foo}`,
        module: true,
        line: 1
    });

    fail(`import {foo,baz,,} from 'toast';`, {
        source: `import {foo,baz,,} from 'toast';`,
        module: true,
        line: 1
    });

    fail(`import {foo,,baz} from 'toast';`, {
        source: `import {foo,,baz} from 'toast';`,
        module: true,
        line: 1
    });

    fail(`import * from "foo"`, {
        source: `import * from "foo"`,
        module: true,
        line: 1
    });

    fail(`import {bar}, foo from "foo"`, {
        source: `import {bar}, foo from "foo"`,
        module: true,
        line: 1
    });

    fail(`import foo`, {
        source: `import foo`,
        module: true,
        line: 1
    });

    fail(`import default from "foo"`, {
        source: `import default from "foo"`,
        module: true,
        line: 1
    });

    fail(`import { foo, bar }`, {
        source: `import { foo, bar }`,
        module: true,
        line: 1
    });

    fail(`export default = 42`, {
        source: `export default = 42`,
        module: true,
        line: 1
    });

    fail(`export * +`, {
        source: `export * +`,
        module: true,
        line: 1
    });

    fail(`export *`, {
        source: `export *`,
        module: true,
        line: 1
    });

    fail(`export var await;`, {
        source: `export var await;`,
        module: true,
        line: 1
    });
    pass('import { } from "m.js";', {
        source: 'import { } from "m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [],
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 16,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 16
                        },
                        end: {
                            line: 1,
                            column: 22
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

    pass('import { a } from "m.js";', {
        source: 'import { a } from "m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                    type: 'ImportSpecifier',
                    local: {
                        type: 'Identifier',
                        name: 'a',
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
                    imported: {
                        type: 'Identifier',
                        name: 'a',
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
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 18,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 18
                        },
                        end: {
                            line: 1,
                            column: 24
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

    pass('import { a, b as d, c, } from "m.js";', {
        source: 'import { a, b as d, c, } from "m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                        type: 'ImportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'a',
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
                        imported: {
                            type: 'Identifier',
                            name: 'a',
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
                    },
                    {
                        type: 'ImportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'd',
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
                        imported: {
                            type: 'Identifier',
                            name: 'b',
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
                            }
                        },
                        start: 12,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    {
                        type: 'ImportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'c',
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
                            }
                        },
                        imported: {
                            type: 'Identifier',
                            name: 'c',
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
                            }
                        },
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
                        }
                    }
                ],
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 30,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 30
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                },
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
                }
            }],
            sourceType: 'module',
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
            }
        }
    });

    pass('import * as thing from  "m.js";', {
        source: 'import * as thing from "m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                    type: 'ImportNamespaceSpecifier',
                    local: {
                        type: 'Identifier',
                        name: 'thing',
                        start: 12,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
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
                }],
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

    pass('import thing, * as rest from "m.js";', {
        source: 'import thing, * as rest from "m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 7,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        start: 7,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    {
                        type: 'ImportNamespaceSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'rest',
                            start: 19,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        start: 14,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    }
                ],
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 29,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 29
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                },
                start: 0,
                end: 36,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 36
                    }
                }
            }],
            sourceType: 'module',
            start: 0,
            end: 36,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 36
                }
            }
        }
    });

    pass('import { arguments as a } from "m.js";', {
        source: 'import { arguments as a } from "m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                    type: 'ImportSpecifier',
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
                    imported: {
                        type: 'Identifier',
                        name: 'arguments',
                        start: 9,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 9,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }],
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 31,
                    end: 37,
                    loc: {
                        start: {
                            line: 1,
                            column: 31
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    }
                },
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
                }
            }],
            sourceType: 'module',
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
            }
        }
    });

    pass('import { for as f } from "m.js";', {
        source: 'import { for as f } from "m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                    type: 'ImportSpecifier',
                    local: {
                        type: 'Identifier',
                        name: 'f',
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
                    imported: {
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
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                }],
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 25,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 25
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    }
                },
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
                }
            }],
            sourceType: 'module',
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
            }
        }
    });

    pass('import { static as s } from "m.js";', {
        source: 'import { static as s } from"m.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                    type: 'ImportSpecifier',
                    local: {
                        type: 'Identifier',
                        name: 's',
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
                    },
                    imported: {
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
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }],
                source: {
                    type: 'Literal',
                    value: 'm.js',
                    start: 27,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 27
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                },
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

    pass('import thing from "a.js"; export {thing};', {
        source: 'import thing from "a.js"; export {thing};',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 7,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        start: 7,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    }],
                    source: {
                        type: 'Literal',
                        value: 'a.js',
                        start: 18,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 24
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
                },
                {
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [{
                        type: 'ExportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'thing',
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
                            }
                        },
                        exported: {
                            type: 'Identifier',
                            name: 'thing',
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
                            }
                        },
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
                        }
                    }],
                    declaration: null,
                    start: 26,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 26
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                }
            ],
            sourceType: 'module',
            start: 0,
            end: 41,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }
    });

    pass('import {thing} from "a.js"; export {thing}', {
        source: 'import {thing} from "a.js"; export {thing}',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 8,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        imported: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 8,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        start: 8,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    }],
                    source: {
                        type: 'Literal',
                        value: 'a.js',
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
                },
                {
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [{
                        type: 'ExportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 36,
                            end: 41,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 36
                                },
                                end: {
                                    line: 1,
                                    column: 41
                                }
                            }
                        },
                        exported: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 36,
                            end: 41,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 36
                                },
                                end: {
                                    line: 1,
                                    column: 41
                                }
                            }
                        },
                        start: 36,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 36
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    }],
                    declaration: null,
                    start: 28,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 28
                        },
                        end: {
                            line: 1,
                            column: 42
                        }
                    }
                }
            ],
            sourceType: 'module',
            start: 0,
            end: 42,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 42
                }
            }
        }
    });

    pass('export {thing}; import * as thing from "a.js";', {
        source: 'export {thing}; import * as thing from "a.js";',
        loc: true,
        ranges: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'ExportNamedDeclaration',
                    source: null,
                    specifiers: [{
                        type: 'ExportSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 8,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        exported: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 8,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        start: 8,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    }],
                    declaration: null,
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
                },
                {
                    type: 'ImportDeclaration',
                    specifiers: [{
                        type: 'ImportNamespaceSpecifier',
                        local: {
                            type: 'Identifier',
                            name: 'thing',
                            start: 28,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 28
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        },
                        start: 23,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    }],
                    source: {
                        type: 'Literal',
                        value: 'a.js',
                        start: 39,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 39
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    },
                    start: 16,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 16
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                }
            ],
            sourceType: 'module',
            start: 0,
            end: 46,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 46
                }
            }
        }
    });

    pass(`import $ from "jquery"`, {
        source: `import $ from "jquery"`,
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 22,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            },
            body: [{
                type: 'ImportDeclaration',
                start: 0,
                end: 22,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                },
                specifiers: [{
                    type: 'ImportDefaultSpecifier',
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
                    },
                    local: {
                        type: 'Identifier',
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
                        },
                        name: '$'
                    }
                }],
                source: {
                    type: 'Literal',
                    start: 14,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    },
                    value: 'jquery',
                    raw: '"jquery"'
                }
            }],
            sourceType: 'module'
        }
    });

    pass(`import "jquery"`, {
        source: `import "jquery"`,
        loc: true,
        ranges: true,
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
                type: 'ImportDeclaration',
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
                specifiers: [],
                source: {
                    type: 'Literal',
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
                    value: 'jquery',
                    raw: '"jquery"'
                }
            }],
            sourceType: 'module'
        }
    });

    pass(`import {foo,} from "bar"`, {
        source: `import {foo,} from "bar"`,
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                    type: 'ImportSpecifier',
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
                    imported: {
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
                }],
                source: {
                    type: 'Literal',
                    value: 'bar',
                    start: 19,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    },
                    raw: '"bar"'
                },
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
                }
            }],
            sourceType: 'module',
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
            }
        }
    });

    pass(`import foo, {bar} from "foo";`, {
        source: `import foo, {bar} from "foo";`,
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ImportDeclaration',
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
                },
                specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        start: 7,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        local: {
                            type: 'Identifier',
                            start: 7,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            name: 'foo'
                        }
                    },
                    {
                        type: 'ImportSpecifier',
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
                        imported: {
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
                            name: 'bar'
                        },
                        local: {
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
                            name: 'bar'
                        }
                    }
                ],
                source: {
                    type: 'Literal',
                    start: 23,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 23
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    },
                    value: 'foo',
                    raw: '"foo"'
                }
            }],
            sourceType: 'module'
        }
    });

    pass(`import {} from "foo";`, {
        source: `import {} from "foo";`,
        ranges: true,
        module: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [],
                source: {
                    type: 'Literal',
                    value: 'foo',
                    start: 15,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    },
                    raw: '"foo"'
                },
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
            }],
            sourceType: 'module',
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

    pass(`import { null as nil } from "bar"`, {
        source: `import { null as nil } from "bar"`,
        ranges: true,
        loc: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ImportDeclaration',
                specifiers: [{
                    type: 'ImportSpecifier',
                    local: {
                        type: 'Identifier',
                        name: 'nil',
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
                        }
                    },
                    imported: {
                        type: 'Identifier',
                        name: 'null',
                        start: 9,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    start: 9,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }],
                source: {
                    type: 'Literal',
                    value: 'bar',
                    start: 28,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 28
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    },
                    raw: '"bar"'
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

    pass(`import a, * as b from "a"`, {
        source: `import a, * as b from "a"`,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 25,
            body: [{
                type: 'ImportDeclaration',
                start: 0,
                end: 25,
                specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        start: 7,
                        end: 8,
                        local: {
                            type: 'Identifier',
                            start: 7,
                            end: 8,
                            name: 'a'
                        }
                    },
                    {
                        type: 'ImportNamespaceSpecifier',
                        start: 10,
                        end: 16,
                        local: {
                            type: 'Identifier',
                            start: 15,
                            end: 16,
                            name: 'b'
                        }
                    }
                ],
                source: {
                    type: 'Literal',
                    start: 22,
                    end: 25,
                    value: 'a',
                    raw: '"a"'
                }
            }],
            sourceType: 'module'
        }
    });

    pass(`import a, {function as c} from "c"`, {
        source: `import a, {function as c} from "c"`,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 34,
            body: [{
                type: 'ImportDeclaration',
                start: 0,
                end: 34,
                specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        start: 7,
                        end: 8,
                        local: {
                            type: 'Identifier',
                            start: 7,
                            end: 8,
                            name: 'a'
                        }
                    },
                    {
                        type: 'ImportSpecifier',
                        start: 11,
                        end: 24,
                        imported: {
                            type: 'Identifier',
                            start: 11,
                            end: 19,
                            name: 'function'
                        },
                        local: {
                            type: 'Identifier',
                            start: 23,
                            end: 24,
                            name: 'c'
                        }
                    }
                ],
                source: {
                    type: 'Literal',
                    start: 31,
                    end: 34,
                    value: 'c',
                    raw: '"c"'
                }
            }],
            sourceType: 'module'
        }
    });

    pass(`import {bar, baz,} from "foo";`, {
        source: `import {bar, baz,} from "foo";`,
        ranges: true,
        module: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ImportDeclaration',
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
                },
                specifiers: [{
                        type: 'ImportSpecifier',
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
                        imported: {
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
                            name: 'bar'
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
                            name: 'bar'
                        }
                    },
                    {
                        type: 'ImportSpecifier',
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
                        imported: {
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
                            name: 'baz'
                        },
                        local: {
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
                            name: 'baz'
                        }
                    }
                ],
                source: {
                    type: 'Literal',
                    start: 24,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 24
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    },
                    value: 'foo',
                    raw: '"foo"'
                }
            }],
            sourceType: 'module'
        }
    });

    pass(`import * as foo from "foo";`, {
        source: `import * as foo from "foo";`,
        ranges: true,
        loc: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
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
            body: [{
                type: 'ImportDeclaration',
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
                specifiers: [{
                    type: 'ImportNamespaceSpecifier',
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
                    local: {
                        type: 'Identifier',
                        start: 12,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        name: 'foo'
                    }
                }],
                source: {
                    type: 'Literal',
                    start: 21,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 21
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    },
                    value: 'foo',
                    raw: '"foo"'
                }
            }],
            sourceType: 'module'
        }
    });
});