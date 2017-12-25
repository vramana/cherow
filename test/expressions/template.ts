import { pass, fail } from '../utils';
import { parseScript, parseModule } from '../../src/cherow';

describe('Expressions - Template', () => {

    // Hex
    for (let i = 0; i < 0xFF; ++i) {
        const c = String.fromCharCode(i);
        if (c == '`' || c == '\\' || c == '\r') continue;
        pass('`' + c + '`', {
            source: '`' + c + '`',
            // Parse it here to get the ast to compare the output against
            expected: parseScript('`' + c + '`')
        });
    }

    // Note! String literal are using the same escape logic as
    // template literals so we are testing both string and template literals here
    // at the same time.

    // Unicode brace escapes
    for (let i = 0x10c; i <= 0x10f; i++) {
        const start = i << 8;
        const end = start | 0xff;
        for (let code = start; code <= end; code++) {
            const escape = `\\u{${code.toString(16)}}`;
            pass(`'${escape}'`, {
                source: `'${escape}'`,
                expected: parseScript(`'${escape}'`)
            });
        }
    }

    for (let code = 0x10f000; code <= 0x10ffff; code++) {

        const arg = `\\u{${code.toString(16)}}`;

        pass(`'${arg}'`, {
            source: `'${arg}'`,
            expected: parseScript(`'${arg}'`)
        });

        const arg0 = `\\u{0${code.toString(16)}}`;

        pass(`'${arg0}'`, {
            source: `'${arg0}'`,
            expected: parseScript(`'${arg0}'`)
        });

        const arg000 = `\\u{000${code.toString(16)}}`;

        pass(`'${arg000}'`, {
            source: `'${arg000}'`,
            expected: parseScript(`'${arg000}'`)
        });
    }

    // Escaped 0 - 7 (with possible leading zeroes)

    for (let code = 0; code <= 6; code++) {

        const arg0 = `\\${code}`;

        pass(`'${arg0}'`, {
            source: `'${arg0}'`,
            expected: parseScript(`'${arg0}'`)
        });

        const arg1 = `\\0${code}`;

        pass(`'${arg1}'`, {
            source: `'${arg1}'`,
            expected: parseScript(`'${arg1}'`)
        });

        fail(`"use strict"; '${arg1}'`, {
            source: `"use strict"; '${arg1}'`
        });

        const arg2 = `\\00${code}`;

        pass(`'${arg2}'`, {
            source: `'${arg2}'`,
            expected: parseScript(`'${arg2}'`)
        });

        fail(`"use strict"; '${arg2}'`, {
            source: `"use strict"; '${arg2}'`
        });
    }

    for (let code = 0o10; code <= 0o77; code++) {

        const arg0 = `\\${code.toString(8)}`;

        pass(`'${arg0}'`, {
            source: `'${arg0}'`,
            expected: parseScript(`'${arg0}'`)
        });

        fail(`"use strict"; '${arg0}'`, {
            source: `"use strict"; '${arg0}'`
        });

        const arg1 = `\\0${code.toString(8)}`;

        pass(`'${arg1}'`, {
            source: `'${arg1}'`,
            expected: parseScript(`'${arg1}'`)
        });


        fail(`"use strict"; '${arg1}'`, {
            source: `'${arg1}'`
        });
    }

    for (let code = 0o100; code <= 0o377; code++) {

        const arg = `\\${code.toString(8)}`;

        pass(`'${arg}'`, {
            source: `'${arg}'`,
            expected: parseScript(`'${arg}'`)
        });

        fail(`'${arg}'`, {
            source: `'${arg}'`
        });
    }

    const enum Chars {
        EnglishUpperA = 0x41,
            EnglishUpperZ = 0x5A,
            EnglishLowerA = 0x61,
            EnglishLowerZ = 0x7A,
            RussianUpperА = 0x410,
            RussianUpperЯ = 0x42F,
            RussianUpperЁ = 0x401,
            RussianLowerА = 0x430,
            RussianLowerЯ = 0x44F,
            RussianLowerЁ = 0x451,
            Zero = 0x30,
            Nine = 0x39,

            Backtick = 0x60,
    }

    // Test262 - Russian lower and upper capitals

    for (let code = Chars.RussianLowerА; code <= Chars.RussianLowerЯ; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        })

        //  redundantly escaped
        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            expected: parseScript(`\`\\${letter}\``)
        })

        // Module code
        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            module: true,
            expected: parseModule(`\`\\${letter}\``)
        })

    }
    for (let code = Chars.RussianUpperА; code <= Chars.RussianUpperЯ; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        })

        //  redundantly escaped
        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            expected: parseScript(`\`\\${letter}\``)
        })

    }

    for (let code = Chars.EnglishUpperA; code <= Chars.EnglishUpperZ; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        })

        //  redundantly escaped
        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            expected: parseScript(`\`\\${letter}\``)
        })

        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            module: true,
            expected: parseModule(`\`\\${letter}\``)
        })

    }

    for (let code = Chars.EnglishLowerA; code <= Chars.EnglishLowerZ; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        })
    }

    // Digits

    for (let code = Chars.Zero; code < Chars.Nine; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        })
    }

    // The rest of the tests are "normal" template and tagged template tests

    fail('`$', {
        source: '`$',
    });

    fail('`${', {
        source: '`${',
    });

    fail('`${1 + 2}', {
        source: '`${1 + 2}',
    });

    fail('`\\x0`', {
        source: '`\\x0`',
    });

    fail('`\\xZ`', {
        source: '`\\xZ`',
    });

    fail('`\\341`', {
        source: '`\\341`',
    });

    fail('`\\341`', {
        source: '`\\341`',
    });

    fail('`\\341`', {
        source: '`\\341`',
    });

    fail('`\\341`', {
        source: '`\\341`',
    });

    fail('`\\376`', {
        source: '`\\376`',
    });

    fail('`\\77`', {
        source: '`\\77`',
    });

    fail('`\\341`', {
        source: '`\\341`',
    });

    fail('`\\56`', {
        source: '`\\56`',
    });

    fail('`\\41`', {
        source: '`\\41`',
    });

    fail('`\\32`', {
        source: '`\\32`',
    });

    fail('`\\006`', {
        source: '`\\006`',
    });

    fail('`\\003`', {
        source: '`\\003`',
    });

    fail('`\\004`', {
        source: '`\\004`',
    });

    fail('`\\005`', {
        source: '`\\005`',
    });

    fail('`\\002`', {
        source: '`\\002`',
    });

    fail('`\\001`', {
        source: '`\\001`',
    });

    fail('`\\000`', {
        source: '`\\000`',
    });

    fail('`\\006`', {
        source: '`\\006`',
    });

    fail('`\\03`', {
        source: '`\\03`',
    });

    fail('`\\04`', {
        source: '`\\04`',
    });

    fail('`\\05`', {
        source: '`\\05`',
    });

    fail('`\\02`', {
        source: '`\\02`',
    });

    fail('`\\01`', {
        source: '`\\01`',
    });

    fail('`\\00`', {
        source: '`\\00`',
    });

    fail('`\\6`', {
        source: '`\\6`',
    });

    fail('`\\3`', {
        source: '`\\3`',
    });

    fail('`\\4`', {
        source: '`\\4`',
    });

    fail('`\\5`', {
        source: '`\\5`',
    });

    fail('`\\2`', {
        source: '`\\2`',
    });

    fail('`\\1`', {
        source: '`\\1`',
    });

    fail('`\\u{abcdx`', {
        source: '`\\u{abcdx`',
    });

    fail('`\\xylophone`', {
        source: '`\\xylophone`',
    });

    fail('a++``', {
        source: 'a++``',
    });

    fail('a++``', {
        source: 'a++``',
    });

    fail('`${a', {
        source: '`${a',
        module: true
    });

    fail('`${a}a${b}', {
        source: '`${a}a${b}',
    });

    fail('switch `test`', {
        source: 'switch `test`',
    });

    fail('switch `test`', {
        source: 'switch `test`',
    });

    fail('`\\x{1}`;', {
        source: '`\\x{1}`;',
        module: true
    });

    fail('"use strict"; `\\00`;', {
        source: '"use strict"; `\\00`;',
    });

    fail('switch `test`', {
        source: 'switch `test`',
    });

    fail('`\\1`', {
        source: '`\\1`',
    });

    fail('`\\8`', {
        source: '`\\8`',
    });

    fail('`\\9`', {
        source: '`\\9`',
    });

    fail('`\\4`', {
        source: '`\\4`',
    });

    fail('`\\11`', {
        source: '`\\11`',
    });

    fail('`\\41`', {
        source: '`\\41`',
        module: true
    });

    fail('`\\00`', {
        source: '`\\00`',
    });

    fail('`\\123`', {
        source: '`\\123`',
    });

    fail('`${a}a${b}', {
        source: '`${a}a${b}',
    });

    fail('`\\u`', {
        source: '`\\u`',
    });

    fail('`${a', {
        source: '`${a',
    });

    fail('`\\u000g`;', {
        source: '`\\u000g`;',
    });

    fail('let bad = `bad escape sequence: \\unicode`;', {
        source: 'let bad = `bad escape sequence: \\unicode`;',
    });

    fail('let bracingOurselves = `\\u{shouldntDoThis}`;', {
        source: 'let bracingOurselves = `\\u{shouldntDoThis}`;',
    });

    fail('`\\u{10FFFFF}${"inner"}right`', {
        source: '`\\u{10FFFFF}${"inner"}right`',
    });

    fail('`\\u{\\${0}right`', {
        source: '`\\u{\\${0}right`',
    });

    fail('`\\u{abcdx}`', {
        source: '`\\u{abcdx}`',
    });

    fail('`left${0}\\u0`', {
        source: '`left${0}\\u0`',
    });

    fail('`\\u0g`;', {
        source: '`\\u0g`;',
    });

    fail('`\\u000g`;', {
        source: '`\\u000g`;',
    });

    fail('`\\u{10FFFFF}${"inner"}right`;', {
        source: '`\\u{10FFFFF}${"inner"}right`;',
    });

    fail('`\\u{0`;', {
        source: '`\\u{0`;',
    });

    fail('`\\u{10FFFFF}`;;', {
        source: '`\\u{10FFFFF}`;',
    });

    fail('`\\x0G`;', {
        source: '`\\x0G`;',
    });

    fail('`\\u{10FFFFF}`;;', {
        source: '`\\u{10FFFFF}`;',
    });

    pass('sampleTag`\\01`', {
        source: 'sampleTag`\\01`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [],
                        quasis: [{
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\01',
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        name: 'sampleTag',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('sampleTag`\\xg${0}right` ', {
        source: 'sampleTag`\\xg${0}right` ',
        raw: true,
        loc: true,
        expected: {
            body: [{
                expression: {
                    loc: {
                        end: {
                            column: 23,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasi: {
                        expressions: [{
                            loc: {
                                end: {
                                    column: 16,
                                    line: 1,
                                },
                                start: {
                                    column: 15,
                                    line: 1,
                                },
                            },
                            raw: '0',
                            type: 'Literal',
                            value: 0,
                        }, ],
                        loc: {
                            end: {
                                column: 23,
                                line: 1,
                            },
                            start: {
                                column: 9,
                                line: 1,
                            },
                        },
                        quasis: [{
                                loc: {
                                    end: {
                                        column: 16,
                                        line: 1,
                                    },
                                    start: {
                                        column: 16,
                                        line: 1,
                                    },
                                },
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\xg',
                                },
                            },
                            {
                                loc: {
                                    end: {
                                        column: 23,
                                        line: 1,
                                    },
                                    start: {
                                        column: 16,
                                        line: 1,
                                    },
                                },
                                tail: true,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right',
                                },
                            },
                        ],
                        type: 'TemplateLiteral',
                    },
                    tag: {
                        loc: {
                            end: {
                                column: 9,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            },
                        },
                        name: 'sampleTag',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression',
                },
                loc: {
                    end: {
                        column: 23,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                type: 'ExpressionStatement'
            }, ],
            loc: {
                end: {
                    column: 24,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass('sampleTag`\\u0${0}right`', {
        source: 'sampleTag`\\u0${0}right`',
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'sampleTag',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'Literal',
                            value: 0,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            raw: '0'
                        }],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u0'
                                },
                                tail: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right'
                                },
                                tail: true,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            }
                        ],
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
                    },
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
                },
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
            sourceType: 'script',
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

    pass('sampleTag`left${0}\\u0g${1}right`', {
        source: 'sampleTag`left${0}\\u0g${1}right`',
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'sampleTag',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            }
                        ],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left'
                                },
                                tail: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u0g'
                                },
                                tail: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right'
                                },
                                tail: true,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
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
                },
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
            sourceType: 'script',
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

    pass('sampleTag`left${0}\\u000g` ', {
        source: 'sampleTag`left${0}\\u000g` ',
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'sampleTag',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'Literal',
                            value: 0,
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
                            raw: '0'
                        }],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left'
                                },
                                tail: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u000g'
                                },
                                tail: true,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
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
            sourceType: 'script',
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

    pass('sampleTag`\\u{-0}` ', {
        source: 'sampleTag`\\u{-0}`',
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'sampleTag',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\u{-0}'
                            },
                            tail: true,
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
                    },
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
                },
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

    pass('sampleTag`\\u{g}`', {
        source: 'sampleTag`\\u{g}`',
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'sampleTag',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\u{g}'
                            },
                            tail: true,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        }],
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            }],
            sourceType: 'script',
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }
    });

    pass('stag`\\01`;', {
        source: 'stag`\\01`;',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [],
                        quasis: [{
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\01',
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        name: 'stag',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('tag`left${0}\\u000g${1}right`;', {
        source: 'tag`left${0}\\u000g${1}right`;',
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'tag',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                                type: 'Literal',
                                value: 0,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                raw: '0'
                            },
                            {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            }
                        ],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left'
                                },
                                tail: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u000g'
                                },
                                tail: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right'
                                },
                                tail: true,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    },
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
                },
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
            sourceType: 'script',
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

    pass('tag`left${0}\\u{-0}${1}right`;', {
        source: 'tag`left${0}\\u{-0}${1}right`;',
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'tag',
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                                type: 'Literal',
                                value: 0,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                raw: '0'
                            },
                            {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            }
                        ],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left'
                                },
                                tail: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u{-0}'
                                },
                                tail: false,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right'
                                },
                                tail: true,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    },
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
                },
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
            sourceType: 'script',
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

    pass('tag`left${0}\\u{-0}${1}right`;', {
        source: 'tag`left${0}\\u{-0}${1}right`;',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'tag',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                                type: 'Literal',
                                value: 0,
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
                                },
                                raw: '0'
                            },
                            {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            }
                        ],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left'
                                },
                                tail: false,
                                start: 11,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u{-0}'
                                },
                                tail: false,
                                start: 21,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right'
                                },
                                tail: true,
                                start: 21,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        start: 3,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
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
            }],
            sourceType: 'script',
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

    pass('tag`left${0}\\u{-0}${1}right`;', {
        source: 'tag`left${0}\\u{-0}${1}right`;',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'tag',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                                type: 'Literal',
                                value: 0,
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
                                },
                                raw: '0'
                            },
                            {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            }
                        ],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left'
                                },
                                tail: false,
                                start: 11,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u{-0}'
                                },
                                tail: false,
                                start: 21,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right'
                                },
                                tail: true,
                                start: 21,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        start: 3,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
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
            }],
            sourceType: 'script',
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

    pass('`$$$${a}`', {
        source: '`$$$${a}`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [{
                        type: 'Identifier',
                        name: 'a',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    }],
                    quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: '$$$',
                                raw: '$$$'
                            },
                            tail: false,
                            start: 7,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                cooked: '',
                                raw: ''
                            },
                            tail: true,
                            start: 7,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        }
                    ],
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 9,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }
    });

    pass('a()``', {
        source: 'a()``',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'a',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            }
                        },
                        arguments: [],
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: '',
                                raw: ''
                            },
                            tail: true,
                            start: 3,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        }],
                        start: 3,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    start: 0,
                    end: 5,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                start: 0,
                end: 5,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 5,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }
    });

    pass('raw`hello ${name}`', {
        source: 'raw`hello ${name}`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'raw',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'Identifier',
                            name: 'name',
                            start: 12,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        }],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'hello ',
                                    raw: 'hello '
                                },
                                tail: false,
                                start: 16,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: '',
                                    raw: ''
                                },
                                tail: true,
                                start: 16,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
                        start: 3,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
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
            sourceType: 'script',
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

    pass('`foo${bar}\\u25a0`', {
        source: '`foo${bar}\\u25a0`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [{
                        type: 'Identifier',
                        name: 'bar',
                        start: 6,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    }],
                    quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: 'foo',
                                raw: 'foo'
                            },
                            tail: false,
                            start: 9,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                cooked: '■',
                                raw: '\\u25a0'
                            },
                            tail: true,
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
                        }
                    ],
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

    pass('foo`foo${bar}\\unicode`', {
        source: 'foo`foo${bar}\\unicode`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'Identifier',
                            name: 'bar',
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
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'foo',
                                    raw: 'foo'
                                },
                                tail: false,
                                start: 12,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\unicode'
                                },
                                tail: true,
                                start: 12,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        start: 3,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
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
                    }
                },
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
                }
            }],
            sourceType: 'script',
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
            }
        }
    });

    pass('foo`\\u`', {
        source: 'foo`\\u`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\u'
                            },
                            tail: true,
                            start: 3,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        }],
                        start: 3,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                start: 0,
                end: 7,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 7,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }
    });

    pass('foo`\\u{abcdx`', {
        source: 'foo`\\u{abcdx`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\u{abcdx'
                            },
                            tail: true,
                            start: 3,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        }],
                        start: 3,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
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
            }],
            sourceType: 'script',
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
        }
    });
    pass('foo`\\unicode\\\\`', {
        source: 'foo`\\unicode\\\\`',
        raw: true,
        loc: true,
        expected: {
            body: [{
                expression: {
                    loc: {
                        end: {
                            column: 15,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasi: {
                        expressions: [],
                        loc: {
                            end: {
                                column: 15,
                                line: 1,
                            },
                            start: {
                                column: 3,
                                line: 1,
                            }
                        },
                        quasis: [{
                            loc: {
                                end: {
                                    column: 15,
                                    line: 1,
                                },
                                start: {
                                    column: 3,
                                    line: 1,
                                }
                            },
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\unicode\\\\',
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        loc: {
                            end: {
                                column: 3,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        name: 'foo',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                loc: {
                    end: {
                        column: 15,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                type: 'ExpressionStatement',
            }],
            loc: {
                end: {
                    column: 15,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\r`', {
        source: '`\\r`',
        raw: true,
        loc: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasis: [{
                        loc: {
                            end: {
                                column: 4,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            },
                        },
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '\r',
                            raw: '\\r',
                        }
                    }],
                    type: 'TemplateLiteral'
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                type: 'ExpressionStatement',
            }, ],
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`"${0x401}"`', {
        source: '`"${0x401}"`',
        raw: true,
        loc: true,
        expected: {
            body: [{
                expression: {
                    expressions: [{
                        loc: {
                            end: {
                                column: 9,
                                line: 1
                            },
                            start: {
                                column: 4,
                                line: 1,
                            }
                        },
                        raw: '0x401',
                        type: 'Literal',
                        value: 1025,
                    }],
                    loc: {
                        end: {
                            column: 12,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasis: [{
                            loc: {
                                end: {
                                    column: 9,
                                    line: 1,
                                },
                                start: {
                                    column: 9,
                                    line: 1,
                                }
                            },
                            tail: false,
                            type: 'TemplateElement',
                            value: {
                                cooked: '"',
                                raw: '"',
                            }
                        },
                        {
                            loc: {
                                end: {
                                    column: 12,
                                    line: 1,
                                },
                                start: {
                                    column: 9,
                                    line: 1,
                                }
                            },
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: '"',
                                raw: '"',
                            }
                        }
                    ],
                    type: 'TemplateLiteral'
                },
                loc: {
                    end: {
                        column: 12,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                type: 'ExpressionStatement'
            }],
            loc: {
                end: {
                    column: 12,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\u180E`', {
        source: '`\\u180E`',
        raw: true,
        loc: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    loc: {
                        end: {
                            column: 8,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasis: [{
                        loc: {
                            end: {
                                column: 8,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '᠎',
                            raw: '\\u180E',
                        }
                    }],
                    type: 'TemplateLiteral'
                },
                loc: {
                    end: {
                        column: 8,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                type: 'ExpressionStatement',
            }],
            loc: {
                end: {
                    column: 8,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass('var object = { fn: function() { return `result`; } };', {
        source: 'var object = { fn: function() { return `result`; } };',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'fn',
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
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'TemplateLiteral',
                                            expressions: [],
                                            quasis: [{
                                                type: 'TemplateElement',
                                                value: {
                                                    cooked: 'result',
                                                    raw: 'result'
                                                },
                                                tail: true,
                                                start: 39,
                                                end: 47,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 39
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 47
                                                    }
                                                }
                                            }],
                                            start: 39,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        },
                                        start: 32,
                                        end: 48,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
                                            },
                                            end: {
                                                line: 1,
                                                column: 48
                                            }
                                        }
                                    }],
                                    start: 30,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 19,
                                end: 50,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 50
                                    }
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 15,
                            end: 50,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 50
                                }
                            }
                        }],
                        start: 13,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    },
                    id: {
                        type: 'Identifier',
                        name: 'object',
                        start: 4,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 4,
                    end: 52,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 52
                        }
                    }
                }],
                kind: 'var',
                start: 0,
                end: 53,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 53
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 53,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 53
                }
            }
        }
    });

    pass('`$`', {
        source: '`$`',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '$',
                            raw: '$'
                        },
                        tail: true,
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    }],
                    start: 0,
                    end: 3,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
                        }
                    }
                },
                start: 0,
                end: 3,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 3,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }
    });

    pass('` foo ${ b + `baz ${ c }` }`;', {
        source: '` foo ${ b + `baz ${ c }` }`;',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: ' foo ',
                                cooked: ' foo '
                            },
                            tail: false
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                raw: '',
                                cooked: ''
                            },
                            tail: true
                        }
                    ],
                    expressions: [{
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                            type: 'Identifier',
                            name: 'b'
                        },
                        right: {
                            type: 'TemplateLiteral',
                            quasis: [{
                                    type: 'TemplateElement',
                                    value: {
                                        raw: 'baz ',
                                        cooked: 'baz '
                                    },
                                    tail: false
                                },
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        raw: '',
                                        cooked: ''
                                    },
                                    tail: true
                                }
                            ],
                            expressions: [{
                                type: 'Identifier',
                                name: 'c'
                            }]
                        }
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`//# ${SOURCEMAPPING_URL}=${url}\n`', {
        source: '`//# ${SOURCEMAPPING_URL}=${url}\n`',
        raw: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: '//# ',
                                cooked: '//# '
                            },
                            tail: false
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                raw: '=',
                                cooked: '='
                            },
                            tail: false
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                raw: '\n',
                                cooked: '\n'
                            },
                            tail: true
                        }
                    ],
                    expressions: [{
                            type: 'Identifier',
                            name: 'SOURCEMAPPING_URL'
                        },
                        {
                            type: 'Identifier',
                            name: 'url'
                        }
                    ]
                }
            }],
            sourceType: 'module'
        }
    });

    pass('var source = `\b`;', {
        source: 'var source = `\b`;',
        raw: true,
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'source',
                        type: 'Identifier'
                    },
                    init: {
                        expressions: [],
                        quasis: [{
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: '\b',
                                raw: '\b'
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    type: 'VariableDeclarator'
                }],
                kind: 'var',
                type: 'VariableDeclaration'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('var source = `a\r\nb`;', {
        source: 'var source = `a\r\nb`;',
        raw: true,
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'source',
                        type: 'Identifier'
                    },
                    init: {
                        expressions: [],
                        quasis: [{
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: 'a\r\nb',
                                raw: 'a\r\nb',
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    type: 'VariableDeclarator'
                }, ],
                kind: 'var',
                type: 'VariableDeclaration'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('var source = `a\r\nb`;', {
        source: '`a\\r\\nb\\n\\r\\na\\r\\nb\\n\\r\\n`;',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: 'a\r\nb\n\r\na\r\nb\n\r\n',
                            raw: 'a\\r\\nb\\n\\r\\na\\r\\nb\\n\\r\\n'
                        }
                    }],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('var source = `\n\r\n`;', {
        source: 'var source = `\n\r\n`;',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'source'
                    },
                    init: {
                        type: 'TemplateLiteral',
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: '\n\r\n',
                                cooked: '\n\r\n'
                            },
                            tail: true
                        }],
                        expressions: []
                    }
                }],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass('new raw`42`', {
        source: 'new raw`42`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'TaggedTemplateExpression',
                        tag: {
                            type: 'Identifier',
                            name: 'raw'
                        },
                        quasi: {
                            type: 'TemplateLiteral',
                            quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    raw: '42',
                                    cooked: '42'
                                },
                                tail: true
                            }],
                            expressions: []
                        }
                    },
                    arguments: []
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\r\n\t\n`', {
        source: '`\r\n\t\n`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            raw: '\r\n\t\n',
                            cooked: '\r\n\t\n'
                        },
                        tail: true
                    }],
                    expressions: []
                }
            }],
            sourceType: 'script'
        }
    });

    pass('doSmth(`${x} + ${y} = ${x + y}`)', {
        source: 'doSmth(`${x} + ${y} = ${x + y}`)',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'doSmth'
                    },
                    arguments: [{
                        type: 'TemplateLiteral',
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    raw: '',
                                    cooked: ''
                                },
                                tail: false
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    raw: ' + ',
                                    cooked: ' + '
                                },
                                tail: false
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    raw: ' = ',
                                    cooked: ' = '
                                },
                                tail: false
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    raw: '',
                                    cooked: ''
                                },
                                tail: true
                            }
                        ],
                        expressions: [{
                                type: 'Identifier',
                                name: 'x'
                            },
                            {
                                type: 'Identifier',
                                name: 'y'
                            },
                            {
                                type: 'BinaryExpression',
                                operator: '+',
                                left: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'y'
                                }
                            }
                        ]
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`${{}}`', {
        source: '`${{}}`',
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [{
                        type: 'ObjectExpression',
                        properties: [],
                        start: 3,
                        end: 5
                    }],
                    quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: '',
                                raw: ''
                            },
                            tail: false,
                            start: 5,
                            end: 5
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                cooked: '',
                                raw: ''
                            },
                            tail: true,
                            start: 5,
                            end: 7
                        }
                    ],
                    start: 0,
                    end: 7
                },
                start: 0,
                end: 7
            }],
            sourceType: 'script',
            start: 0,
            end: 7
        }
    });

    pass('sampleTag`left${0}\\u{\\u{0}`', {
        source: 'sampleTag`left${0}\\u{\\u{0}`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [{
                            raw: '0',
                            type: 'Literal',
                            value: 0,
                        }],
                        quasis: [{
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left',
                                }
                            },
                            {
                                tail: true,
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u{\\u{0}',
                                }
                            }
                        ],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        name: 'sampleTag',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass('sampleTag`left${0}\\u{`', {
        source: 'sampleTag`left${0}\\u{`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [{
                            raw: '0',
                            type: 'Literal',
                            value: 0
                        }],
                        quasis: [{
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left',
                                }
                            },
                            {
                                tail: true,
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u{'
                                }
                            }
                        ],
                        type: 'TemplateLiteral',
                    },
                    tag: {
                        name: 'sampleTag',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass('sampleTag`left${0}\\u{-0}${1}right`', {
        source: 'sampleTag`left${0}\\u{-0}${1}right`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [{
                                raw: '0',
                                type: 'Literal',
                                value: 0,
                            },
                            {
                                raw: '1',
                                type: 'Literal',
                                value: 1,
                            }
                        ],
                        quasis: [{
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left',
                                }
                            },
                            {
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u{-0}'
                                }
                            },
                            {
                                tail: true,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right'
                                }
                            }
                        ],
                        type: 'TemplateLiteral',
                    },
                    tag: {
                        name: 'sampleTag',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\\"`', {
        source: '`\\\"`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            body: [{
                end: 4,
                expression: {
                    end: 4,
                    expressions: [],
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasis: [{
                        end: 4,
                        loc: {
                            end: {
                                column: 4,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        start: 0,
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '"',
                            raw: '\\"',
                        }
                    }],
                    start: 0,
                    type: 'TemplateLiteral',
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement',
            }],
            end: 4,
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            start: 0,
            type: 'Program'
        }
    });

    pass('sampleTag`left${0}\\u{g}${1}right`', {
        source: 'sampleTag`left${0}\\u{g}${1}right`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [{
                                raw: '0',
                                type: 'Literal',
                                value: 0,
                            },
                            {
                                raw: '1',
                                type: 'Literal',
                                value: 1
                            },
                        ],
                        quasis: [{
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left',
                                }
                            },
                            {
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u{g}',
                                }
                            },
                            {
                                tail: true,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right',
                                }
                            }
                        ],
                        type: 'TemplateLiteral',
                    },
                    tag: {
                        name: 'sampleTag',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('sampleTag`left${0}\\1`', {
        source: 'sampleTag`left${0}\\1`',
        raw: true,
        ranges: true,
        expected: {
            body: [{
                end: 21,
                expression: {
                    end: 21,
                    quasi: {
                        end: 21,
                        expressions: [{
                            end: 17,
                            raw: '0',
                            start: 16,
                            type: 'Literal',
                            value: 0
                        }],
                        quasis: [{
                                end: 17,
                                start: 17,
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left',
                                }
                            },
                            {
                                end: 21,
                                start: 17,
                                tail: true,
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\1',
                                }
                            }
                        ],
                        start: 9,
                        type: 'TemplateLiteral'
                    },
                    start: 0,
                    tag: {
                        end: 9,
                        name: 'sampleTag',
                        start: 0,
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                start: 0,
                type: 'ExpressionStatement'
            }],
            end: 21,
            sourceType: 'script',
            start: 0,
            type: 'Program',
        }
    });

    pass('sampleTag`left${0}\\u000g${1}right`', {
        source: 'sampleTag`left${0}\\u000g${1}right`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [{
                                raw: '0',
                                type: 'Literal',
                                value: 0
                            },
                            {
                                raw: '1',
                                type: 'Literal',
                                value: 1
                            }
                        ],
                        quasis: [{
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'left',
                                    raw: 'left',
                                }
                            },
                            {
                                tail: false,
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u000g',
                                }
                            },
                            {
                                tail: true,
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right',
                                }
                            }
                        ],
                        type: 'TemplateLiteral',
                    },
                    tag: {
                        name: 'sampleTag',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass('foo`\\unicode`', {
        source: 'foo`\\unicode`',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            body: [{
                end: 13,
                expression: {
                    end: 13,
                    loc: {
                        end: {
                            column: 13,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasi: {
                        end: 13,
                        expressions: [],
                        loc: {
                            end: {
                                column: 13,
                                line: 1,
                            },
                            start: {
                                column: 3,
                                line: 1,
                            },
                        },
                        quasis: [{
                            end: 13,
                            loc: {
                                end: {
                                    column: 13,
                                    line: 1,
                                },
                                start: {
                                    column: 3,
                                    line: 1,
                                }
                            },
                            start: 3,
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\unicode',
                            }
                        }],
                        start: 3,
                        type: 'TemplateLiteral',
                    },
                    start: 0,
                    tag: {
                        end: 3,
                        loc: {
                            end: {
                                column: 3,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        name: 'foo',
                        start: 0,
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression',
                },
                loc: {
                    end: {
                        column: 13,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement',
            }, ],
            end: 13,
            loc: {
                end: {
                    column: 13,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: 'script',
            start: 0,
            type: 'Program'
        }
    });

    pass('foo`\\unicode`', {
        source: 'foo`\\unicode`',
        loc: true,
        raw: true,
        expected: {
            body: [{
                expression: {
                    loc: {
                        end: {
                            column: 13,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasi: {
                        expressions: [],
                        loc: {
                            end: {
                                column: 13,
                                line: 1,
                            },
                            start: {
                                column: 3,
                                line: 1,
                            }
                        },
                        quasis: [{
                            loc: {
                                end: {
                                    column: 13,
                                    line: 1,
                                },
                                start: {
                                    column: 3,
                                    line: 1,
                                }
                            },
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\unicode'
                            },
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        loc: {
                            end: {
                                column: 3,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        name: 'foo',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                loc: {
                    end: {
                        column: 13,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                type: 'ExpressionStatement'
            }, ],
            loc: {
                end: {
                    column: 13,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('foo`\\u{abcdx`', {
        source: 'foo`\\u{abcdx`',
        loc: true,
        raw: true,
        expected: {
            body: [{
                expression: {
                    loc: {
                        end: {
                            column: 13,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    quasi: {
                        expressions: [],
                        loc: {
                            end: {
                                column: 13,
                                line: 1,
                            },
                            start: {
                                column: 3,
                                line: 1,
                            }
                        },
                        quasis: [{
                            loc: {
                                end: {
                                    column: 13,
                                    line: 1,
                                },
                                start: {
                                    column: 3,
                                    line: 1,
                                }
                            },
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\u{abcdx'
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        loc: {
                            end: {
                                column: 3,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        name: 'foo',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                loc: {
                    end: {
                        column: 13,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                type: 'ExpressionStatement'
            }],
            loc: {
                end: {
                    column: 13,
                    line: 1
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`a`', {
        source: '`a`',
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            raw: 'a',
                            cooked: 'a'
                        },
                        tail: true,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    }],
                    expressions: [],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 3
                    }
                }
            }],
            sourceType: 'script',
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }
    });

    pass('`${a}$`', {
        source: '`${a}$`',
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: '',
                                cooked: ''
                            },
                            tail: false
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                raw: '$',
                                cooked: '$'
                            },
                            tail: true
                        }
                    ],
                    expressions: [{
                        type: 'Identifier',
                        name: 'a'
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('``````', {
        source: '``````',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'TaggedTemplateExpression',
                        tag: {
                            type: 'TemplateLiteral',
                            quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    raw: '',
                                    cooked: ''
                                },
                                tail: true
                            }],
                            expressions: []
                        },
                        quasi: {
                            type: 'TemplateLiteral',
                            quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    raw: '',
                                    cooked: ''
                                },
                                tail: true
                            }],
                            expressions: []
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: '',
                                cooked: ''
                            },
                            tail: true
                        }],
                        expressions: []
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass('a``', {
        source: 'a``',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'a'
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: '',
                                cooked: ''
                            },
                            tail: true
                        }],
                        expressions: []
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass('new a()``', {
        source: 'new a()``',
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'NewExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'a',
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
                        arguments: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: '',
                                cooked: ''
                            },
                            tail: true,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        }],
                        expressions: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            }],
            sourceType: 'script',
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }
    });

    pass('`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`', {
        source: '`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [{
                            type: 'ObjectExpression',
                            properties: [{
                                type: 'Property',
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                value: {
                                    type: 'ObjectExpression',
                                    properties: [{
                                        type: 'Property',
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            name: 'y'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 10,
                                            raw: '10'
                                        },
                                        kind: 'init'
                                    }]
                                },
                                kind: 'init'
                            }]
                        },
                        {
                            type: 'TemplateLiteral',
                            expressions: [{
                                type: 'FunctionExpression',
                                id: null,
                                generator: false,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Literal',
                                            value: 1,
                                            raw: '1'
                                        }
                                    }]
                                }
                            }],
                            quasis: [{
                                    type: 'TemplateElement',
                                    value: {
                                        raw: 'nested',
                                        cooked: 'nested'
                                    },
                                    tail: false
                                },
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        raw: 'endnest',
                                        cooked: 'endnest'
                                    },
                                    tail: true
                                }
                            ]
                        }
                    ],
                    quasis: [{
                            type: 'TemplateElement',
                            value: {
                                raw: 'outer',
                                cooked: 'outer'
                            },
                            tail: false
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                raw: 'bar',
                                cooked: 'bar'
                            },
                            tail: false
                        },
                        {
                            type: 'TemplateElement',
                            value: {
                                raw: 'end',
                                cooked: 'end'
                            },
                            tail: true
                        }
                    ]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('foo`T\\u200C`', {
        source: 'foo`T\\u200C`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [],
                        quasis: [{
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: 'T‌',
                                raw: 'T\\u200C',
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        name: 'foo',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression',
                },
                type: 'ExpressionStatement',
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('foo`\\u{00000000034}`', {
        source: 'foo`\\u{00000000034}`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [],
                        quasis: [{
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: '4',
                                raw: '\\u{00000000034}',
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        name: 'foo',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\ю`', {
        source: '`\\ю`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: 'ю',
                            raw: '\\ю'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\б`', {
        source: '`\\б`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: 'б',
                            raw: '\\б'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\Щ`', {
        source: '`\\Щ`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: 'Щ',
                            raw: '\\Щ'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });
    pass('`\\u{10f000}`', {
        source: '`\\u{10f000}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '􏀀',
                            raw: '\\u{10f000}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{10f000}`', {
        source: '`\\u{10f000}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '􏀀',
                            raw: '\\u{10f000}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{11000}`', {
        source: '`\\u{11000}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '𑀀',
                            raw: '\\u{11000}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{4c000}`', {
        source: '`\\u{4c000}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '񌀀',
                            raw: '\\u{4c000}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{80000}`', {
        source: '`\\u{80000}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '򀀀',
                            raw: '\\u{80000}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{f0000}`', {
        source: '`\\u{f0000}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '󰀀',
                            raw: '\\u{f0000}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{8dfff}`', {
        source: '`\\u{8dfff}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '򍿿',
                            raw: '\\u{8dfff}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{9cfff}`', {
        source: '`\\u{9cfff}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '򜿿',
                            raw: '\\u{9cfff}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{67fff}`', {
        source: '`\\u{67fff}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '񧿿',
                            raw: '\\u{67fff}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{26fff}`', {
        source: '`\\u{26fff}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '𦿿',
                            raw: '\\u{26fff}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{31fff}`', {
        source: '`\\u{31fff}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '𱿿',
                            raw: '\\u{31fff}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\u{fff}`', {
        source: '`\\u{fff}`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [{
                        type: 'TemplateElement',
                        value: {
                            cooked: '࿿',
                            raw: '\\u{fff}'
                        },
                        tail: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass('`\\x6a`', {
        source: '`\\x6a`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: 'j',
                            raw: '\\x6a',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\x3f`', {
        source: '`\\x3f`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '?',
                            raw: '\\x3f',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\x87`', {
        source: '`\\x87`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '',
                            raw: '\\x87',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\xb1`', {
        source: '`\\xb1`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '±',
                            raw: '\\xb1',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\xb1`', {
        source: '`\\xb1`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '±',
                            raw: '\\xb1',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\x00`', {
        source: '`\\x00`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '\u0000',
                            raw: '\\x00',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });
    pass('`\\x3c`', {
        source: '`\\x3c`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: '<',
                            raw: '\\x3c',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\x5a`', {
        source: '`\\x5a`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: 'Z',
                            raw: '\\x5a',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`\\xd1`', {
        source: '`\\xd1`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: 'Ñ',
                            raw: '\\xd1',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`Ф`', {
        source: '`Ф`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: 'Ф',
                            raw: 'Ф',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('`Н`', {
        source: '`Н`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    expressions: [],
                    quasis: [{
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                            cooked: 'Н',
                            raw: 'Н',
                        },
                    }, ],
                    type: 'TemplateLiteral'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('foo`\\u00g0`', {
        source: 'foo`\\u00g0`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\u00g0'
                            },
                            tail: true
                        }]
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass('foo`\\ugggg`', {
        source: 'foo`\\ugggg`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\ugggg'
                            },
                            tail: true
                        }]
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass('foo`\\u1`', {
        source: 'foo`\\u1`',
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'foo'
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\u1'
                            },
                            tail: true
                        }]
                    }
                }
            }],
            sourceType: 'script'
        }
    });
    pass('a\r\nb`\n\\r\nb\\u{g`;', {
        source: 'a\r\nb`\n\r\nb\\u{g`;',
        raw: true,
        expected: {
            body: [{
                    expression: {
                        name: 'a',
                        type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                },
                {
                    expression: {
                        quasi: {
                            expressions: [],
                            quasis: [{
                                tail: true,
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\n\r\nb\\u{g',
                                }
                            }],
                            type: 'TemplateLiteral'
                        },
                        tag: {
                            name: 'b',
                            type: 'Identifier'
                        },
                        type: 'TaggedTemplateExpression'
                    },
                    type: 'ExpressionStatement'
                }
            ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('latex`\\unicode{blah}`', {
        source: 'latex`\\unicode{blah}`',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'latex',
                        start: 0,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [{
                            type: 'TemplateElement',
                            value: {
                                cooked: null,
                                raw: '\\unicode{blah}'
                            },
                            tail: true,
                            start: 5,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        }],
                        start: 5,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
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
            sourceType: 'script',
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

    pass('foo`\\u{10FFFFF}${"inner"}right`', {
        source: 'foo`\\u{10FFFFF}${"inner"}right`',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'Literal',
                            value: 'inner',
                            start: 17,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            },
                            raw: '"inner"'
                        }],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: null,
                                    raw: '\\u{10FFFFF}'
                                },
                                tail: false,
                                start: 24,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'right',
                                    raw: 'right'
                                },
                                tail: true,
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
                                }
                            }
                        ],
                        start: 3,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    },
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
                    }
                },
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
                }
            }],
            sourceType: 'script',
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
            }
        }
    });

    pass('foo`\\u{00000000034}`', {
        source: 'foo`\\u{00000000034}`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [],
                        quasis: [{
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: '4',
                                raw: '\\u{00000000034}',
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        name: 'foo',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('let x = tag `\\u{hello} ${ 100 } \\xtraordinary ${ 200 } wonderful ${ 300 } \\uworld`;', {
        source: 'let x = tag `\\u{hello} ${ 100 } \\xtraordinary ${ 200 } wonderful ${ 300 } \\uworld`;',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'TaggedTemplateExpression',
                        tag: {
                            type: 'Identifier',
                            name: 'tag',
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
                        quasi: {
                            type: 'TemplateLiteral',
                            expressions: [{
                                    type: 'Literal',
                                    value: 100,
                                    start: 26,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    },
                                    raw: '100'
                                },
                                {
                                    type: 'Literal',
                                    value: 200,
                                    start: 49,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 49
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    },
                                    raw: '200'
                                },
                                {
                                    type: 'Literal',
                                    value: 300,
                                    start: 68,
                                    end: 71,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 68
                                        },
                                        end: {
                                            line: 1,
                                            column: 71
                                        }
                                    },
                                    raw: '300'
                                }
                            ],
                            quasis: [{
                                    type: 'TemplateElement',
                                    value: {
                                        cooked: null,
                                        raw: '\\u{hello} '
                                    },
                                    tail: false,
                                    start: 30,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        cooked: null,
                                        raw: ' \\xtraordinary '
                                    },
                                    tail: false,
                                    start: 53,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 53
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    }
                                },
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        cooked: ' wonderful ',
                                        raw: ' wonderful '
                                    },
                                    tail: false,
                                    start: 72,
                                    end: 71,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 72
                                        },
                                        end: {
                                            line: 1,
                                            column: 71
                                        }
                                    }
                                },
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        cooked: null,
                                        raw: ' \\uworld'
                                    },
                                    tail: true,
                                    start: 72,
                                    end: 82,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 72
                                        },
                                        end: {
                                            line: 1,
                                            column: 82
                                        }
                                    }
                                }
                            ],
                            start: 12,
                            end: 82,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 82
                                }
                            }
                        },
                        start: 8,
                        end: 82,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 82
                            }
                        }
                    },
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
                    end: 82,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 82
                        }
                    }
                }],
                kind: 'let',
                start: 0,
                end: 83,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 83
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 83,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 83
                }
            }
        }
    });

    pass('css` color: ${ props => props.whiteColor ? "white": "black" }`;', {
        source: 'css` color: ${ props => props.whiteColor ? "white": "black" }`;',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'css',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'ConditionalExpression',
                                test: {
                                    type: 'MemberExpression',
                                    object: {
                                        type: 'Identifier',
                                        name: 'props',
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
                                        }
                                    },
                                    computed: false,
                                    property: {
                                        type: 'Identifier',
                                        name: 'whiteColor',
                                        start: 30,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30
                                            },
                                            end: {
                                                line: 1,
                                                column: 40
                                            }
                                        }
                                    },
                                    start: 24,
                                    end: 40,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 40
                                        }
                                    }
                                },
                                consequent: {
                                    type: 'Literal',
                                    value: 'white',
                                    start: 43,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    },
                                    raw: '"white"'
                                },
                                alternate: {
                                    type: 'Literal',
                                    value: 'black',
                                    start: 52,
                                    end: 59,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 52
                                        },
                                        end: {
                                            line: 1,
                                            column: 59
                                        }
                                    },
                                    raw: '"black"'
                                },
                                start: 24,
                                end: 59,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 59
                                    }
                                }
                            },
                            params: [{
                                type: 'Identifier',
                                name: 'props',
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
                                }
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 15,
                            end: 59,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 59
                                }
                            }
                        }],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: ' color: ',
                                    raw: ' color: '
                                },
                                tail: false,
                                start: 60,
                                end: 59,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 60
                                    },
                                    end: {
                                        line: 1,
                                        column: 59
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: '',
                                    raw: ''
                                },
                                tail: true,
                                start: 60,
                                end: 62,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 60
                                    },
                                    end: {
                                        line: 1,
                                        column: 62
                                    }
                                }
                            }
                        ],
                        start: 3,
                        end: 62,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 62
                            }
                        }
                    },
                    start: 0,
                    end: 62,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 62
                        }
                    }
                },
                start: 0,
                end: 63,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 63
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 63,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 63
                }
            }
        }
    });

    pass('args`hey${4}`', {
        source: 'args`hey${4}`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'args',
                        start: 0,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'Literal',
                            value: 4,
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
                            },
                            raw: '4'
                        }],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'hey',
                                    raw: 'hey'
                                },
                                tail: false,
                                start: 11,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: '',
                                    raw: ''
                                },
                                tail: true,
                                start: 11,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        start: 4,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
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
            }],
            sourceType: 'script',
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
        }
    });

    pass('args`${4 + a}${5 + b}c`', {
        source: 'args`${4 + a}${5 + b}c`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'args',
                        start: 0,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                                type: 'BinaryExpression',
                                left: {
                                    type: 'Literal',
                                    value: 4,
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
                                    raw: '4'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                operator: '+',
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
                                type: 'BinaryExpression',
                                left: {
                                    type: 'Literal',
                                    value: 5,
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
                                    },
                                    raw: '5'
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'b',
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
                                operator: '+',
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
                                }
                            }
                        ],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: '',
                                    raw: ''
                                },
                                tail: false,
                                start: 12,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: '',
                                    raw: ''
                                },
                                tail: false,
                                start: 20,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'c',
                                    raw: 'c'
                                },
                                tail: true,
                                start: 20,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            }
                        ],
                        start: 4,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
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
            sourceType: 'script',
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

    pass('args`a${"b"}`', {
        source: 'args`a${"b"}`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'args',
                        start: 0,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'Literal',
                            value: 'b',
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
                            raw: '"b"'
                        }],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: 'a',
                                    raw: 'a'
                                },
                                tail: false,
                                start: 11,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: '',
                                    raw: ''
                                },
                                tail: true,
                                start: 11,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        start: 4,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
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
            }],
            sourceType: 'script',
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
        }
    });

    // Template substitutions can have side effects.
    pass('args`${x += 1}`', {
        source: 'args`${x += 1}`',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'TaggedTemplateExpression',
                    tag: {
                        type: 'Identifier',
                        name: 'args',
                        start: 0,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    quasi: {
                        type: 'TemplateLiteral',
                        expressions: [{
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'x',
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
                            operator: '+=',
                            right: {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
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
                            }
                        }],
                        quasis: [{
                                type: 'TemplateElement',
                                value: {
                                    cooked: '',
                                    raw: ''
                                },
                                tail: false,
                                start: 13,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            },
                            {
                                type: 'TemplateElement',
                                value: {
                                    cooked: '',
                                    raw: ''
                                },
                                tail: true,
                                start: 13,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            }
                        ],
                        start: 4,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
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
            sourceType: 'script',
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

    pass('cooked`\r\r\n`', {
        source: 'cooked`\r\r\n`',
        raw: true,
        expected: {
            body: [{
                expression: {
                    quasi: {
                        expressions: [],
                        quasis: [{
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                                cooked: '\r\r\n',
                                raw: '\r\r\n',
                            }
                        }],
                        type: 'TemplateLiteral'
                    },
                    tag: {
                        name: 'cooked',
                        type: 'Identifier',
                    },
                    type: 'TaggedTemplateExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });
});