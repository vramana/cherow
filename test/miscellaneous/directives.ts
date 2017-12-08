import { pass, fail } from '../utils';

describe('Directives', () => {

    fail('strict directive after legacy octal ', { source:  '"\\1;" "use strict";'});
    fail('strict directive after legacy octal followed by null', { source:  '"\\1;" "use strict"; null'});
    fail('strict directive before legacy octal', { source:  '"use strict"; "\\1;"'});
    fail('strict directive before legacy octal followed by null', { source:  '"use strict"; "\\1;" null'});
    fail('legacy octal inside function body', { source:  '"use strict"; function f(){"\\1";}'});

    fail('invalid newlines after null escapes', { source:  '"random\\0\nnewline"'});
    fail('invalid carriage returns', { source:  '"random\\0\rnewline"'});
    fail('invalid newlines after ASCII \\x0', { source:  '"random\\x0\nnewline"'});
    fail('invalid newlines after Unicode \\u', { source:  '"random\\u\nnewline"'});
    fail('invalid newlines after Unicode \\u0', { source:  '"random\\u0\nnewline"'});
    fail('invalid newlines after Unicode \\ua', { source:  '"random\\ua\nnewline"'});
    fail('invalid paragraph separators after Unicode \\ua', { source:  '"random\\ua\u2029newline"'});
    fail('invalid carriage returns after Unicode \\ua', { source:  '"random\\ua\rnewline"'});
    fail('invalid newlines after Unicode \\u00', { source:  '"random\\u00\nnewline"'});
    fail('invalid newlines after Unicode \\u0a', { source:  '"random\\u0a\nnewline"'});
    fail('invalid newlines after Unicode \\u000', { source:  '"random\\u000\nnewline"'});
    fail('invalid newlines after Unicode \\u00a', { source:  '"random\\u00a\nnewline"'});
    fail('invalid newlines after Unicode \\u{', { source:  '"rrandom\\u{\nnewline"'});
    fail('invalid newlines after Unicode \\u{0', { source:  '"random\\u{0\nnewline"'});
    fail('invalid newlines after Unicode \\u{a', { source:  '"random\\u{a\nnewline"'});
    fail('invalid carriage returns after Unicode \\u{a', { source:  '"random\\u{a\rnewline"'});
    fail('catches invalid space after ASCII \\x', { source:  "'random\\x foo'"});
    fail("catches invalid space after ASCII \\x0", { source:  "'random\\x0 foo'"});
    fail("catches invalid space after Unicode \\u", { source:  "'random\\u foo'"});
    fail("catches invalid space after Unicode \\u0", { source:  "'random\\u0 foo'"});
    fail("catches invalid space after Unicode \\ua", { source:  "'random\\ua foo'"});
    fail("catches invalid space after Unicode \\u00", { source:  "'random\\u00 foo'"});
    fail("catches invalid space after Unicode \\u0a", { source:  "'random\\u0a foo'"});
    fail("catches invalid space after Unicode \\u000", { source:  "'random\\u000 foo'"});
    fail("catches invalid space after Unicode \\u00a", { source:  "'random\\u00a foo'"});
    fail("catches invalid space after Unicode \\u{", { source:  "'random\\u{ foo'"});
    fail("catches invalid space after Unicode \\u{0", { source:  "'random\\u{0 foo'"});
    fail("catches invalid space after Unicode \\u{a", { source:  "'random\\u{a foo'"});
    fail("catches invalid \\ after ASCII \\x", { source:  "'random\\x\\ foo'"});
    fail("catches invalid \\ after ASCII \\x0", { source:  "'random\\x0\\ foo'"});
    fail("catches invalid \\ after Unicode \\u", { source:  "'random\\u\\ foo'"});
    fail("catches invalid \\ after Unicode \\u0", { source:  "'random\\u0\\ foo'"});
    fail("catches invalid \\ after Unicode \\ua", { source:  "'random\\ua\\ foo'"});
    fail("catches invalid \\ after Unicode \\u00", { source:  "'random\\u00\\ foo'"});
    fail("catches invalid \\ after Unicode \\u0a", { source:  "'random\\u0a\\ foo'"});
    fail("catches invalid \\ after Unicode \\u000", { source:  "'random\\u000\\ foo'"});
    fail("catches invalid \\ after Unicode \\u00a", { source:  "'random\\u00a\\ foo'"});
    fail("catches invalid \\ after Unicode \\u{", { source:  "'random\\u{\\ foo'"});
    fail("catches invalid \\ after Unicode \\u{0", { source:  "'random\\u{0\\ foo'"});
    fail("catches invalid \\ after Unicode \\u{a", { source:  "'random\\u{a\\ foo'"});
    fail("catches invalid x after ASCII \\x", { source:  "'random\\xx foo'"});
    fail("catches invalid x after ASCII \\x0", { source:  "'random\\x0x foo'"});
    fail("catches invalid x after Unicode \\u", { source:  "'random\\ux foo'"});
    fail("catches invalid x after Unicode \\u0", { source:  "'random\\u0x foo'"});
    fail("catches invalid x after Unicode \\ua", { source:  "'random\\uax foo'"});
    fail("catches invalid x after Unicode \\u00", { source:  "'random\\u00x foo'"});
    fail("catches invalid x after Unicode \\u0a", { source:  "'random\\u0ax foo'"});
    fail("catches invalid x after Unicode \\u000", { source:  "'random\\u000x foo'"});
    fail("catches invalid x after Unicode \\u00a", { source:  "'random\\u00ax foo'"});
    fail("catches invalid x after Unicode \\u{", { source:  "'random\\u{x foo'"});
    fail("catches invalid x after Unicode \\u{0", { source:  "'random\\u{0x foo'"});
    fail("catches invalid x after Unicode \\u{a", { source:  "'random\\u{ax foo'"});
    fail("catches invalid X after ASCII \\x", { source:  "'random\\xX foo'"});
    fail("catches invalid X after ASCII \\x0", { source:  "'random\\x0X foo'"});
    fail("catches invalid X after Unicode \\u", { source:  "'random\\uX foo'"});
    fail("catches invalid X after Unicode \\u0", { source:  "'random\\u0X foo'"});
    fail("catches invalid X after Unicode \\ua", { source:  "'random\\uaX foo'"});
    fail("catches invalid X after Unicode \\u00", { source:  "'random\\u00X foo'"});
    fail("catches invalid X after Unicode \\u0a", { source:  "'random\\u0aX foo'"});
    fail("catches invalid X after Unicode \\u000", { source:  "'random\\u000X foo'"});
    fail("catches invalid X after Unicode \\u00a", { source:  "'random\\u00aX foo'"});
    fail("catches invalid X after Unicode \\u{", { source:  "'random\\u{X foo'"});
    fail("catches invalid X after Unicode \\u{0", { source:  "'random\\u{0X foo'"});
    fail("catches invalid X after Unicode \\u{a", { source:  "'random\\u{aX foo'"});
    fail("catches invalid u after ASCII \\x", { source:  "'random\\xu foo'"});
    fail("catches invalid u after ASCII \\x0", { source:  "'random\\x0u foo'"});
    fail("catches invalid u after Unicode \\u", { source:  "'random\\uu foo'"});
    fail("catches invalid u after Unicode \\u0", { source:  "'random\\u0u foo'"});
    fail("catches invalid u after Unicode \\ua", { source:  "'random\\uau foo'"});
    fail("catches invalid u after Unicode \\u00", { source:  "'random\\u00u foo'"});
    fail("catches invalid u after Unicode \\u0a", { source:  "'random\\u0au foo'"});
    fail("catches invalid u after Unicode \\u000", { source:  "'random\\u000u foo'"});
    fail("catches invalid u after Unicode \\u00a", { source:  "'random\\u00au foo'"});
    fail("catches invalid u after Unicode \\u{", { source:  "'random\\u{u foo'"});
    fail("catches invalid u after Unicode \\u{0", { source:  "'random\\u{0u foo'"});
    fail("catches invalid u after Unicode \\u{a", { source:  "'random\\u{au foo'"});
    fail("catches invalid U after ASCII \\x", { source:  "'random\\xU foo'"});
    fail("catches invalid U after ASCII \\x0", { source:  "'random\\x0U foo'"});
    fail("catches invalid U after Unicode \\u", { source:  "'random\\uU foo'"});
    fail("catches invalid U after Unicode \\u0", { source:  "'random\\u0U foo'"});
    fail("catches invalid U after Unicode \\ua", { source:  "'random\\uaU foo'"});
    fail("catches invalid U after Unicode \\u00", { source:  "'random\\u00U foo'"});
    fail("catches invalid U after Unicode \\u0a", { source:  "'random\\u0aU foo'"});
    fail("catches invalid U after Unicode \\u000", { source:  "'random\\u000U foo'"});
    fail("catches invalid U after Unicode \\u00a", { source:  "'random\\u00aU foo'"});
    fail("catches invalid U after Unicode \\u{", { source:  "'random\\u{U foo'"});
    fail("catches invalid U after Unicode \\u{0", { source:  "'random\\u{0U foo'"});
    fail("catches invalid U after Unicode \\u{a", { source:  "'random\\u{aU foo'"});
    fail("catches invalid { after ASCII \\x", { source:  "'random\\x{ foo'"});
    fail("catches invalid { after ASCII \\x0", { source:  "'random\\x0{ foo'"});
    fail("catches invalid { after Unicode \\u", { source:  "'random\\u{ foo'"});
    fail("catches invalid { after Unicode \\u0", { source:  "'random\\u0{ foo'"});
    fail("catches invalid { after Unicode \\ua", { source:  "'random\\ua{ foo'"});
    fail("catches invalid { after Unicode \\u00", { source:  "'random\\u00{ foo'"});
    fail("catches invalid { after Unicode \\u0a", { source:  "'random\\u0a{ foo'"});
    fail("catches invalid { after Unicode \\u000", { source:  "'random\\u000{ foo'"});
    fail("catches invalid { after Unicode \\u00a", { source:  "'random\\u00a{ foo'"});
    fail("catches invalid { after Unicode \\u{", { source:  "'random\\u{{ foo'"});
    fail("catches invalid { after Unicode \\u{0", { source:  "'random\\u{0{ foo'"});
    fail("catches invalid { after Unicode \\u{a", { source:  "'random\\u{a{ foo'"});
    fail("catches invalid } after ASCII \\x", { source:  "'random\\x} foo'"});
    fail("catches invalid } after ASCII \\x0", { source:  "'random\\x0} foo'"});
    fail("catches invalid } after Unicode \\u", { source:  "'random\\u} foo'"});
    fail("catches invalid } after Unicode \\u0", { source:  "'random\\u0} foo'"});
    fail("catches invalid } after Unicode \\ua", { source:  "'random\\ua} foo'"});
    fail("catches invalid } after Unicode \\u00", { source:  "'random\\u00} foo'"});
    fail("catches invalid } after Unicode \\u0a", { source:  "'random\\u0a} foo'"});
    fail("catches invalid } after Unicode \\u000", { source:  "'random\\u000} foo'"});
    fail("catches invalid } after Unicode \\u00a", { source:  "'random\\u00a} foo'"});
    fail("catches invalid } after Unicode \\u{", { source:  "'random\\u{} foo'"});

    pass(`single "use strict"'`, {
        source: '"use strict"',
        loc: true,
        ranges: true,
        raw: true,
        directives: true,
        expected: {
            "body": [{
                "directive": "use strict",
                end: 12,
                "expression": {
                    end: 12,
                    "loc": {
                        end: {
                            column: 12,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    "raw": "\"use strict\"",
                    start: 0,
                    "type": "Literal",
                    "value": "use strict",
                },
                "loc": {
                    end: {
                        column: 12,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                "type": "ExpressionStatement",
            }, ],
            end: 12,
            "loc": {
                end: {
                    column: 12,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            "sourceType": "script",
            start: 0,
            "type": "Program",
        }
    });
});