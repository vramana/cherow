import { pass, fail } from '../test-utils';
import { parseScript, parseModule } from '../../src/cherow';
describe('Cherow', () => {

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
        });

        //  redundantly escaped
        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            expected: parseScript(`\`\\${letter}\``)
        });

        // Module code
        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            module: true,
            expected: parseModule(`\`\\${letter}\``)
        });

    }
      for (let code = Chars.RussianUpperА; code <= Chars.RussianUpperЯ; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        });

        //  redundantly escaped
        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            expected: parseScript(`\`\\${letter}\``)
        });

    }

      for (let code = Chars.EnglishUpperA; code <= Chars.EnglishUpperZ; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        });

        //  redundantly escaped
        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            expected: parseScript(`\`\\${letter}\``)
        });

        pass(`\`\\${letter}\``, {
            source: `\`\\${letter}\``,
            module: true,
            expected: parseModule(`\`\\${letter}\``)
        });

    }

      for (let code = Chars.EnglishLowerA; code <= Chars.EnglishLowerZ; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        });
    }

    // Digits

      for (let code = Chars.Zero; code < Chars.Nine; code++) {
        const letter = String.fromCharCode(code);
        pass(`\`${letter}\``, {
            source: `\`${letter}\``,
            expected: parseScript(`\`${letter}\``)
        });
    }

// The rest of the tests are "normal" template and tagged template tests

      fail('`$', {
    source: '`$',
    line: 1
});

      fail('`left${0}\\xg${1}right`', {
    source: '`left${0}\\xg${1}right`',
    line: 1
});

      fail('`left${0}\\u0g`', {
    source: '`left${0}\\u0g`',
    line: 1
});

      fail('`${', {
    source: '`${',
    line: 1
});

      fail('`${1 + 2}', {
    source: '`${1 + 2}',
});

      fail('`\\x0`', {
    source: '`\\x0`',
    line: 1
});

      fail('`\\xZ`', {
    source: '`\\xZ`',
    line: 1
});

      fail('`\\341`', {
    source: '`\\341`',
    line: 1
});

      fail('`\\341`', {
    source: '`\\341`',
    line: 1
});

      fail('`\\341`', {
    source: '`\\341`',
    line: 1
});

      fail('`\\341`', {
    source: '`\\341`',
    line: 1
});

      fail('`\\376`', {
    source: '`\\376`',
    line: 1
});

      fail('`\\77`', {
    source: '`\\77`',
    line: 1
});

      fail('`\\341`', {
    source: '`\\341`',
    line: 1
});

      fail('`\\56`', {
    source: '`\\56`',
    line: 1
});

      fail('`\\41`', {
    source: '`\\41`',
    line: 1
});

      fail('`\\32`', {
    source: '`\\32`',
    line: 1
});

      fail('`\\006`', {
    source: '`\\006`',
    line: 1
});

      fail('`\\003`', {
    source: '`\\003`',
    line: 1
});

      fail('`\\004`', {
    source: '`\\004`',
    line: 1
});

      fail('`\\005`', {
    source: '`\\005`',
    line: 1
});

      fail('`\\002`', {
    source: '`\\002`',
    line: 1
});

      fail('`\\001`', {
    source: '`\\001`',
    line: 1
});

      fail('`\\000`', {
    source: '`\\000`',
    line: 1
});

      fail('`\\006`', {
    source: '`\\006`',
    line: 1
});

      fail('`\\03`', {
    source: '`\\03`',
    line: 1
});

      fail('`\\04`', {
    source: '`\\04`',
    line: 1
});

      fail('`\\05`', {
    source: '`\\05`',
});

      fail('`\\02`', {
    source: '`\\02`',
    line: 1
});

      fail('`\\01`', {
    source: '`\\01`',
    line: 1
});

      fail('`\\00`', {
    source: '`\\00`',
    line: 1
});

      fail('`\\6`', {
    source: '`\\6`',
    line: 1
});

      fail('`\\3`', {
    source: '`\\3`',
    line: 1
});

      fail('`\\4`', {
    source: '`\\4`',
    line: 1
});

      fail('`\\5`', {
    source: '`\\5`',
    line: 1
});

      fail('`\\2`', {
    source: '`\\2`',
    line: 1
});

      fail('`\\1`', {
    source: '`\\1`',
    line: 1
});

      fail('`\\u{abcdx`', {
    source: '`\\u{abcdx`',
    line: 1
});

      fail('`\\xylophone`', {
    source: '`\\xylophone`',
    line: 1
});

      fail('a++``', {
    source: 'a++``',
    line: 1
});

      fail('a++``', {
    source: 'a++``',
    line: 1
});

      fail('`${a', {
    source: '`${a',
    module: true,
    line: 1
});

      fail('`${a}a${b}', {
    source: '`${a}a${b}',
});

      fail('switch `test`', {
    source: 'switch `test`',
    line: 1
});

      fail('switch `test`', {
    source: 'switch `test`',
    line: 1
});

      fail('`\\x{1}`;', {
    source: '`\\x{1}`;',
    module: true,
    line: 1
});

      fail('"use strict"; `\\00`;', {
    source: '"use strict"; `\\00`;',
    line: 1
});

      fail('switch `test`', {
    source: 'switch `test`',
    line: 1
});

      fail('`\\1`', {
    source: '`\\1`',
    line: 1
});

      fail('`\\8`', {
    source: '`\\8`',
    line: 1
});

      fail('`\\9`', {
    source: '`\\9`',
    line: 1
});

      fail('`\\4`', {
    source: '`\\4`',
    line: 1
});

      fail('`\\11`', {
    source: '`\\11`',
    line: 1
});

      fail('`\\41`', {
    source: '`\\41`',
    module: true,
    line: 1
});

      fail('`\\00`', {
    source: '`\\00`',
    line: 1
});

      fail('`\\123`', {
    source: '`\\123`',
    line: 1
});

      fail('`${a}a${b}', {
    source: '`${a}a${b}',
    line: 1
});

      fail('`\\u`', {
    source: '`\\u`',
    line: 1
});

      fail('`${a', {
    source: '`${a',
    line: 1
});

      fail('`\\u000g`;', {
    source: '`\\u000g`;',
    line: 1
});

      fail('let bad = `bad escape sequence: \\unicode`;', {
    source: 'let bad = `bad escape sequence: \\unicode`;',
    line: 1
});

      fail('let bracingOurselves = `\\u{shouldntDoThis}`;', {
    source: 'let bracingOurselves = `\\u{shouldntDoThis}`;',
    line: 1
});

      fail('`\\u{10FFFFF}${"inner"}right`', {
    source: '`\\u{10FFFFF}${"inner"}right`',
    line: 1
});

      fail('`\\u{\\${0}right`', {
    source: '`\\u{\\${0}right`',
    line: 1
});

      fail('`\\u{abcdx}`', {
    source: '`\\u{abcdx}`',
    line: 1
});

      fail('`left${0}\\u0`', {
    source: '`left${0}\\u0`',
    line: 1
});

      fail('`\\u0g`;', {
    source: '`\\u0g`;',
    line: 1
});

      fail('`\\u000g`;', {
    source: '`\\u000g`;',
    line: 1
});

      fail('`\\u{10FFFFF}${"inner"}right`;', {
    source: '`\\u{10FFFFF}${"inner"}right`;',
    line: 1
});

      fail('`\\u{0`;', {
    source: '`\\u{0`;',
    line: 1
});

      fail('`\\u{10FFFFF}`;;', {
    source: '`\\u{10FFFFF}`;',
    line: 1
});

      fail('`\\x0G`;', {
    source: '`\\x0G`;',
    line: 1
});

      fail('`\\u{10FFFFF}`;;', {
    source: '`\\u{10FFFFF}`;',
    line: 1
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

      pass('tag`template-head${a}`', {
        source: 'tag`template-head${a}`',
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
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
                            quasis: [
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        raw: 'template-head',
                                        cooked: 'template-head'
                                    },
                                    tail: false,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
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
                                        raw: '',
                                        cooked: ''
                                    },
                                    tail: true,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                }
                            ],
                            expressions: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
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
            ],
            sourceType: 'script',
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

      pass('tag `no-subst-template`', {
        source: 'tag `no-subst-template`',
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
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
                            quasis: [
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        raw: 'no-subst-template',
                                        cooked: 'no-subst-template'
                                    },
                                    tail: true,
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
                                }
                            ],
                            expressions: [],
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
                }
            ],
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

      pass('tag\t`foo\n\nbar\r\nbaz`', {
        source: 'tag\t`foo\n\nbar\r\nbaz`',
        expected: {
              body: [
                {
                  expression: {
                    quasi: {
                      expressions: [],
                     quasis: [
                        {
                          tail: true,
                          type: 'TemplateElement',
                          value: {
                            cooked: 'foo\n\nbar\r\nbaz',
                            raw: 'foo\n\nbar\r\nbaz',
                          }
                        }
                      ],
                      type: 'TemplateLiteral',
                    },
                    tag: {
                      name: 'tag',
                      type: 'Identifier',
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

      pass('tag`foo${a /* comment */}`', {
        source: 'tag`foo${a /* comment */}`',
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
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
                            quasis: [
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        raw: 'foo',
                                        cooked: 'foo'
                                    },
                                    tail: false,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                },
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        raw: '',
                                        cooked: ''
                                    },
                                    tail: true,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                }
                            ],
                            expressions: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
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
                                }
                            ],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 26
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
                                column: 26
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
                            column: 26
                        }
                    }
                }
            ],
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

      pass('tag ``', {
      source: 'tag ``',
      loc: true,
      expected: {
        type: 'Program',
        body: [
            {
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
                        quasis: [
                            {
                                type: 'TemplateElement',
                                value: {
                                    raw: '',
                                    cooked: ''
                                },
                                tail: true,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            }
                        ],
                        expressions: [],
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 6
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
                            column: 6
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
                        column: 6
                    }
                }
            }
        ],
        sourceType: 'script',
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
    }
      });

      pass('tag`foo${a \r\n}`', {
        source: 'tag`foo${a \r\n}`',
        expected: {
              body: [
                {
                  expression: {
                    quasi: {
                      expressions: [
                        {
                          name: 'a',
                          type: 'Identifier'
                        }
                      ],
                      quasis: [
                       {
                          tail: false,
                          type: 'TemplateElement',
                          value: {
                            cooked: 'foo',
                            raw: 'foo',
                          }
                        },
                        {
                          tail: true,
                          type: 'TemplateElement',
                          value: {
                            cooked: '',
                            raw: '',
                          }
                        }
                      ],
                      type: 'TemplateLiteral'
                    },
                    tag: {
                      name: 'tag',
                      type: 'Identifier',
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

      pass('tag`foo${a \r}`', {
        source: 'tag`foo${a \r}`',
        expected: {
              body: [
                {
                  expression: {
                    quasi: {
                      expressions: [
                        {
                          name: 'a',
                          type: 'Identifier'
                        }
                      ],
                      quasis: [
                       {
                          tail: false,
                          type: 'TemplateElement',
                          value: {
                            cooked: 'foo',
                            raw: 'foo',
                          }
                        },
                        {
                          tail: true,
                          type: 'TemplateElement',
                          value: {
                            cooked: '',
                            raw: '',
                          }
                        }
                      ],
                      type: 'TemplateLiteral'
                    },
                    tag: {
                      name: 'tag',
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

      pass('tag`foo${// comment\na}`', {
        source: 'tag`foo${// comment\na}`',
        expected: {
              body: [
                {
                  expression: {
                    quasi: {
                      expressions: [
                        {
                          name: 'a',
                          type: 'Identifier'
                        }
                      ],
                      quasis: [
                        {
                          tail: false,
                         type: 'TemplateElement',
                          value: {
                            cooked: 'foo',
                            raw: 'foo',
                          }
                        },
                        {
                          tail: true,
                          type: 'TemplateElement',
                          value: {
                            cooked: '',
                            raw: '',
                          }
                        }
                      ],
                      type: 'TemplateLiteral'
                    },
                    tag: {
                      name: 'tag',
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

      pass('tag`foo${\n a}`', {
        source: 'tag`foo${\n a}`',
        expected: {
              body: [
                {
                  expression: {
                    quasi: {
                      expressions: [
                        {
                          name: 'a',
                          type: 'Identifier'
                        }
                      ],
                      quasis: [
                        {
                          tail: false,
                          type: 'TemplateElement',
                          value: {
                            cooked: 'foo',
                            raw: 'foo',
                          }
                        },
                        {
                          tail: true,
                          type: 'TemplateElement',
                          value: {
                            cooked: '',
                            raw: '',
                          }
                        }
                      ],
                      type: 'TemplateLiteral',
                    },
                    tag: {
                      name: 'tag',
                      type: 'Identifier',
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

      pass('`a${b}`', {
        source: '`a${b}`',
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'TemplateLiteral',
                        quasis: [
                            {
                                type: 'TemplateElement',
                                value: {
                                    raw: 'a',
                                    cooked: 'a'
                                },
                                tail: false,
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
                            {
                                type: 'TemplateElement',
                                value: {
                                    raw: '',
                                    cooked: ''
                                },
                                tail: true,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            }
                        ],
                        expressions: [
                            {
                                type: 'Identifier',
                                name: 'b',
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
                            }
                        ],
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
            ],
            sourceType: 'script',
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

});