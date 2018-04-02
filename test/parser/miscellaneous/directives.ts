import { pass, fail, fail_esprima } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser';

describe('Miscellaneous - Directives', () => {

    describe('Failure', () => {
        fail('"\\1;" "use strict";', Context.Empty, {
            source: '"\\1;" "use strict";',
        });

        fail('strict directive after legacy octal ', Context.Empty, {
            source: '"\\1;" "use strict";',
        });

        fail('strict directive after legacy octal in function body', Context.Empty, {
            source: '"use strict"; function f(){"\\1";}'
        });

        fail('strict directive after legacy octal followed by null', Context.Empty, {
            source: '"\\1;" "use strict"; null',
        });

        fail('strict directive before legacy octal', Context.Empty, {
            source: '"use strict"; "\\1;"',
        });

        fail('strict directive before asdfasdfadsfaddsf octal', Context.Strict | Context.Module, {
            source: '"\\1;"',
        });

        fail('strict directive before legacy octal followed by null', Context.Empty, {
            source: '"use strict"; "\\1;" null',
        });

        fail('legacy octal inside function body', Context.Empty, {
            source: '"use strict"; function f(){"\\1";}',
        });

        fail('invalid newlines after ASCII \\x0', Context.Empty, {
            source: '"random\\x0\nnewline"',
        });

        fail('invalid newlines after Unicode \\u', Context.Empty, {
            source: '"random\\u\nnewline"',
        });

        fail('invalid newlines after Unicode \\u0', Context.Empty, {
            source: '"random\\u0\nnewline"',
        });

        fail('invalid newlines after Unicode \\ua', Context.Empty, {
            source: '"random\\ua\nnewline"',
        });

        fail('invalid paragraph separators after Unicode \\ua', Context.Strict | Context.Module, {
            source: '"random\\ua\u2029newline"',
        });

        fail('invalid carriage returns after Unicode \\ua', Context.Empty, {
            source: '"random\\ua\rnewline"',
        });

        fail('invalid newlines after Unicode \\u00', Context.Empty, {
            source: '"random\\u00\nnewline"',
        });

        fail('invalid newlines after Unicode \\u0a', Context.Empty, {
            source: '"random\\u0a\nnewline"',

        });
        fail('invalid newlines after Unicode \\u000', Context.Empty, {
            source: '"random\\u000\nnewline"',
        });

        fail('invalid newlines after Unicode \\u00a', Context.Empty, {
            source: '"random\\u00a\nnewline"',

        });

        fail('invalid newlines after Unicode \\u{', Context.Empty, {
            source: '"rrandom\\u{\nnewline"',
        });

        fail('invalid newlines after Unicode \\u{0', Context.Empty, {
            source: '"random\\u{0\nnewline"',

        });

        fail('invalid newlines after Unicode \\u{a', Context.Empty, {
            source: '"random\\u{a\nnewline"',
        });

        fail('invalid carriage returns after Unicode \\u{a', Context.Empty, {
            source: '"random\\u{a\rnewline"',

        });
        fail('catches invalid space after ASCII \\x', Context.Empty, {
            source: '\'random\\x foo\'',
        });

        fail('catches invalid space after ASCII \\x0', Context.Empty, {
            source: '\'random\\x0 foo\'',
        });

        fail('catches invalid space after Unicode \\u', Context.Empty, {
            source: '\'random\\u foo\'',

        });
        fail('catches invalid space after Unicode \\u0', Context.Empty, {
            source: '\'random\\u0 foo\'',

        });
        fail('catches invalid space after Unicode \\ua', Context.Empty, {
            source: '\'random\\ua foo\'',

        });
        fail('catches invalid space after Unicode \\u00', Context.Empty, {
            source: '\'random\\u00 foo\'',

        });
        fail('catches invalid space after Unicode \\u0a', Context.Empty, {
            source: '\'random\\u0a foo\'',

        });
        fail('catches invalid space after Unicode \\u000', Context.Empty, {
            source: '\'random\\u000 foo\'',
        });
        fail('catches invalid space after Unicode \\u00a', Context.Empty, {
            source: '\'random\\u00a foo\'',
        });
        fail('catches invalid space after Unicode \\u{', Context.Empty, {
            source: '\'random\\u{ foo\'',
        });
        fail('catches invalid space after Unicode \\u{0', Context.Empty, {
            source: '\'random\\u{0 foo\'',
        });
        fail('catches invalid space after Unicode \\u{a', Context.Empty, {
            source: '\'random\\u{a foo\'',
        });
        fail('catches invalid \\ after ASCII \\x', Context.Empty, {
            source: '\'random\\x\\ foo\'',
        });
        fail('catches invalid \\ after ASCII \\x0', Context.Empty, {
            source: '\'random\\x0\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u', Context.Empty, {
            source: '\'random\\u\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u0', Context.Empty, {
            source: '\'random\\u0\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\ua', Context.Empty, {
            source: '\'random\\ua\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u00', Context.Empty, {
            source: '\'random\\u00\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u0a', Context.Empty, {
            source: '\'random\\u0a\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u000', Context.Empty, {
            source: '\'random\\u000\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u00a', Context.Empty, {
            source: '\'random\\u00a\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u{', Context.Empty, {
            source: '\'random\\u{\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u{0', Context.Empty, {
            source: '\'random\\u{0\\ foo\'',
        });
        fail('catches invalid \\ after Unicode \\u{a', Context.Empty, {
            source: '\'random\\u{a\\ foo\'',
        });
        fail('catches invalid x after ASCII \\x', Context.Empty, {
            source: '\'random\\xx foo\'',
        });
        fail('catches invalid x after ASCII \\x0', Context.Empty, {
            source: '\'random\\x0x foo\'',
        });
        fail('catches invalid x after Unicode \\u', Context.Empty, {
            source: '\'random\\ux foo\'',
        });
        fail('catches invalid x after Unicode \\u0', Context.Empty, {
            source: '\'random\\u0x foo\'',
        });
        fail('catches invalid x after Unicode \\ua', Context.Empty, {
            source: '\'random\\uax foo\'',
        });
        fail('catches invalid x after Unicode \\u00', Context.Empty, {
            source: '\'random\\u00x foo\'',
        });
        fail('catches invalid x after Unicode \\u0a', Context.Empty, {
            source: '\'random\\u0ax foo\'',
        });
        fail('catches invalid x after Unicode \\u000', Context.Empty, {
            source: '\'random\\u000x foo\'',
        });
        fail('catches invalid x after Unicode \\u00a', Context.Empty, {
            source: '\'random\\u00ax foo\'',
        });
        fail('catches invalid x after Unicode \\u{', Context.Empty, {
            source: '\'random\\u{x foo\'',
        });
        fail('catches invalid x after Unicode \\u{0', Context.Empty, {
            source: '\'random\\u{0x foo\'',
        });
        fail('catches invalid x after Unicode \\u{a', Context.Empty, {
            source: '\'random\\u{ax foo\'',
        });
        fail('catches invalid X after ASCII \\x', Context.Empty, {
            source: '\'random\\xX foo\'',
        });
        fail('catches invalid X after ASCII \\x0', Context.Empty, {
            source: '\'random\\x0X foo\'',
        });
        fail('catches invalid X after Unicode \\u', Context.Empty, {
            source: '\'random\\uX foo\'',
        });
        fail('catches invalid X after Unicode \\u0', Context.Empty, {
            source: '\'random\\u0X foo\'',
        });
        fail('catches invalid X after Unicode \\ua', Context.Empty, {
            source: '\'random\\uaX foo\'',

        });
        fail('catches invalid X after Unicode \\u00', Context.Empty, {
            source: '\'random\\u00X foo\'',
        });
        fail('catches invalid X after Unicode \\u0a', Context.Empty, {
            source: '\'random\\u0aX foo\'',
        });
        fail('catches invalid X after Unicode \\u000', Context.Empty, {
            source: '\'random\\u000X foo\'',
       });
        fail('catches invalid X after Unicode \\u00a', Context.Empty, {
            source: '\'random\\u00aX foo\'',
       });
        fail('catches invalid X after Unicode \\u{', Context.Empty, {
            source: '\'random\\u{X foo\'',

        });
        fail('catches invalid X after Unicode \\u{0', Context.Empty, {
            source: '\'random\\u{0X foo\'',
       });
        fail('catches invalid X after Unicode \\u{a', Context.Empty, {
            source: '\'random\\u{aX foo\'',
        });
        fail('catches invalid u after ASCII \\x', Context.Empty, {
            source: '\'random\\xu foo\'',

        });
        fail('catches invalid u after ASCII \\x0', Context.Empty, {
            source: '\'random\\x0u foo\'',
        });
        fail('catches invalid u after Unicode \\u', Context.Empty, {
            source: '\'random\\uu foo\'',
        });
        fail('catches invalid u after Unicode \\u0', Context.Empty, {
            source: '\'random\\u0u foo\'',
        });
        fail('catches invalid u after Unicode \\ua', Context.Empty, {
            source: '\'random\\uau foo\'',
        });
        fail('catches invalid u after Unicode \\u00', Context.Empty, {
            source: '\'random\\u00u foo\'',
        });
        fail('catches invalid u after Unicode \\u0a', Context.Empty, {
            source: '\'random\\u0au foo\'',
        });
        fail('catches invalid u after Unicode \\u000', Context.Empty, {
            source: '\'random\\u000u foo\''
        });
        fail('catches invalid u after Unicode \\u00a', Context.Empty, {
            source: '\'random\\u00au foo\'',

        });
        fail('catches invalid u after Unicode \\u{', Context.Empty, {
            source: '\'random\\u{u foo\'',
        });
        fail('catches invalid u after Unicode \\u{0', Context.Empty, {
            source: '\'random\\u{0u foo\'',
        });
        fail('catches invalid u after Unicode \\u{a', Context.Empty, {
            source: '\'random\\u{au foo\'',
        });
        fail('catches invalid U after ASCII \\x', Context.Empty, {
            source: '\'random\\xU foo\'',
        });
        fail('catches invalid U after ASCII \\x0', Context.Empty, {
            source: '\'random\\x0U foo\'',
        });
        fail('catches invalid U after Unicode \\u', Context.Empty, {
            source: '\'random\\uU foo\'',
        });
        fail('catches invalid U after Unicode \\u0', Context.Empty, {
            source: '\'random\\u0U foo\'',
        });
        fail('catches invalid U after Unicode \\ua', Context.Empty, {
            source: '\'random\\uaU foo\'',
        });
        fail('catches invalid U after Unicode \\u00', Context.Empty, {
            source: '\'random\\u00U foo\'',
        });
        fail('catches invalid U after Unicode \\u0a', Context.Empty, {
            source: '\'random\\u0aU foo\'',
        });
        fail('catches invalid U after Unicode \\u000', Context.Empty, {
            source: '\'random\\u000U foo\'',
        });
        fail('catches invalid U after Unicode \\u00a', Context.Empty, {
            source: '\'random\\u00aU foo\'',

        });
        fail('catches invalid U after Unicode \\u{', Context.Empty, {
            source: '\'random\\u{U foo\'',

        });
        fail('catches invalid U after Unicode \\u{0', Context.Empty, {
            source: '\'random\\u{0U foo\'',
        });
        fail('catches invalid U after Unicode \\u{a', Context.Empty, {
            source: '\'random\\u{aU foo\''
        });
        fail('catches invalid { after ASCII \\x', Context.Empty, {
            source: '\'random\\x{ foo\'',
        });
        fail('catches invalid { after ASCII \\x0', Context.Empty, {
            source: '\'random\\x0{ foo\'',
        });

        fail('catches invalid { after Unicode \\u', Context.Empty, {
            source: '\'random\\u{ foo\'',
        });
        fail('catches invalid { after Unicode \\u0', Context.Empty, {
            source: '\'random\\u0{ foo\'',

        });
        fail('catches invalid { after Unicode \\ua', Context.Empty, {
            source: '\'random\\ua{ foo\'',
        });
        fail('catches invalid { after Unicode \\u00', Context.Empty, {
            source: '\'random\\u00{ foo\'',

        });
        fail('catches invalid { after Unicode \\u0a', Context.Empty, {
            source: '\'random\\u0a{ foo\''
        });
        fail('catches invalid { after Unicode \\u000', Context.Empty, {
            source: '\'random\\u000{ foo\''
        });
        fail('catches invalid { after Unicode \\u000', Context.Strict | Context.Module, {
            source: '\'random\\u000{ foo\'',
        });
        fail('catches invalid { after Unicode \\u00a', Context.Empty, {
            source: '\'random\\u00a{ foo\'',
       });
        fail('catches invalid { after Unicode \\u{', Context.Empty, {
            source: '\'random\\u{{ foo\'',
        });
        fail('catches invalid { after Unicode \\u{0', Context.Empty, {
            source: '\'random\\u{0{ foo\''
        });
        fail('catches invalid { after Unicode \\u{a', Context.Empty, {
            source: '\'random\\u{a{ foo\'',

        });
        fail('catches invalid } after ASCII \\x', Context.Empty, {
            source: '\'random\\x} foo\'',

        });
        fail('catches invalid } after ASCII \\x0', Context.Empty, {
            source: '\'random\\x0} foo\'',
        });
        fail('catches invalid } after Unicode \\u', Context.Empty, {
            source: '\'random\\u} foo\'',

        });
        fail('catches invalid } after Unicode \\u0', Context.Empty, {
            source: '\'random\\u0} foo\'',

        });
        fail('catches invalid } after Unicode \\ua', Context.Empty, {
            source: '\'random\\ua} foo\'',

        });
        fail('catches invalid } after Unicode \\u00', Context.Empty, {
            source: '\'random\\u00} foo\'',

        });
        fail('catches invalid } after Unicode \\u0a', Context.Empty, {
            source: '\'random\\u0a} foo\'',

        });
        fail('catches invalid } after Unicode \\u000', Context.Empty, {
            source: '\'random\\u000} foo\'',
        });
        fail('catches invalid } after Unicode \\u00a', Context.Empty, {
            source: '\'random\\u00a} foo\'',
        });
        fail('catches invalid } after Unicode \\u00a', Context.Strict | Context.Module, {
            source: '\'random\\u00a} foo\'',
        });
        fail('catches invalid } after Unicode \\u{', Context.Empty, {
            source: '\'random\\u{} foo\'',
        });

        fail('catches invalid } after Unicode \\u{', Context.Strict | Context.Module, {
            source: '\'random\\u{} foo\'',
        });
    });

    describe('Pass', () => {
        pass('"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"', Context.Empty, {
            source: '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"',
            expected: {
                body: [{
                    directive: '\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0',
                    expression: {
                        type: 'Literal',
                        value: '\n\r\t\u000b\b\f\\\'"\u0000',
                    },
                    type: 'ExpressionStatement'
                }, ],
                sourceType: 'script',
                type: 'Program',
            }
        });

        pass('"Hello\\312World"', Context.Empty, {
            source: '"Hello\\312World"',
            expected: {
                body: [{
                    directive: 'Hello\\312World',
                    expression: {
                        type: 'Literal',
                        value: 'HelloÊWorld',
                    },
                    type: 'ExpressionStatement'
                }, ],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`"use strict"; + 1`, Context.Empty, {
            source: `"use strict"; + 1`,
            expected: {
                body: [{
                        directive: 'use strict',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                        },
                        type: 'ExpressionStatement'
                    },
                    {
                        expression: {
                            argument: {
                                type: 'Literal',
                                value: 1
                            },
                            operator: '+',
                            prefix: true,
                            type: 'UnaryExpression'
                        },
                        type: 'ExpressionStatement'
                    }
                ],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`function wrap() { "use strict"\n foo }`, Context.Empty, {
            source: `function wrap() { "use strict"\n foo }`,
            expected: {
                body: [{
                    async: false,
                    body: {
                        body: [{
                                directive: 'use strict',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
                                },
                                type: 'ExpressionStatement'
                            },
                            {
                                expression: {
                                    name: 'foo',
                                    type: 'Identifier',
                                },
                                type: 'ExpressionStatement'
                            },
                        ],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'wrap',
                        type: 'Identifier',
                    },
                    params: [],
                    type: 'FunctionDeclaration',
                }, ],
                sourceType: 'script',
                type: 'Program',
            }
        });

        pass(`"\\u0075se strict"`, Context.OptionsRaw, {
            source: `"\\u0075se strict"`,
            expected: {
                body: [{
                    directive: '\\u0075se strict',
                    expression: {
                        raw: '"\\u0075se strict"',
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass('function wrap() { { "use strict" } foo }', Context.Empty, {
            source: 'function wrap() { { "use strict" } foo }',
            expected: {
                body: [{
                    async: false,
                    body: {
                        body: [{
                                body: [{
                                    expression: {
                                        type: 'Literal',
                                        value: 'use strict',
                                    },
                                    type: 'ExpressionStatement'
                                }],
                                type: 'BlockStatement'
                            },
                            {
                                expression: {
                                    name: 'foo',
                                    type: 'Identifier',
                                },
                                type: 'ExpressionStatement'
                            },
                        ],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'wrap',
                        type: 'Identifier'
                    },
                    params: [],
                    type: 'FunctionDeclaration'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass('"Hello\\0World"', Context.Empty, {
            source: '"Hello\\0World"',
            expected: {
                body: [{
                    directive: 'Hello\\0World',
                    expression: {
                        type: 'Literal',
                        value: 'Hello\u0000World',
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`single "use strict" wrapped inside parenthesis'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Strict | Context.Module, {
            source: '("use strict"); foo = 42;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict"'
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
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
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
                            operator: '=',
                            right: {
                                type: 'Literal',
                                value: 42,
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
                                raw: '42'
                            },
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
                    }
                ],
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

        pass(`single "use strict" wrapped inside parenthesis'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '("use strict"); eval = 42;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict"'
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
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'eval',
                                start: 16,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            operator: '=',
                            right: {
                                type: 'Literal',
                                value: 42,
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
                                },
                                raw: '42'
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
                        },
                        start: 16,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });

        pass(`single "use strict" is "USE STRICT"'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"USE STRICT";  var public = 1;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'USE STRICT',
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
                            },
                            raw: '"USE STRICT"'
                        },
                        directive: 'USE STRICT',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 1,
                                start: 28,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                },
                                raw: '1'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'public',
                                start: 19,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            start: 19,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        }],
                        kind: 'var',
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
                    }
                ],
                sourceType: 'script',
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

        pass(`single "use strict" inside function body'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function wrap() { "use asm"; "use strict"; foo }',
            expected: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use asm',
                                    start: 18,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    raw: '"use asm"'
                                },
                                directive: 'use asm',
                                start: 18,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
                                    start: 29,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    },
                                    raw: '"use strict"'
                                },
                                directive: 'use strict',
                                start: 29,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 43,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                start: 43,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 43
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 16,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'wrap',
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
                    start: 0,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }],
                sourceType: 'script',
                start: 0,
                end: 48,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 48
                    }
                }
            }
        });

        pass(`single "use strict"' in block statement`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '{ "use strict"; }',
            expected: {
                type: 'Program',
                body: [{
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 2,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            raw: '"use strict"'
                        },
                        start: 2,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    }],
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
                sourceType: 'script',
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

        pass(`single "use strict" in a default parameter'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function a() { "use strict" } "use strict"; foo;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
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
                                    raw: '"use strict"'
                                },
                                directive: 'use strict',
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
                                }
                            }],
                            start: 13,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
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
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 30,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 30
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            },
                            raw: '"use strict"'
                        },
                        start: 30,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 30
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 44,
                            end: 47,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 44
                                },
                                end: {
                                    line: 1,
                                    column: 47
                                }
                            }
                        },
                        start: 44,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 44
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 48,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 48
                    }
                }
            }
        });
    });
});