import { pass, fail } from '../utils';

describe('Miscellaneous - Escaped keywords', () => {

        fail('var gen = async function *() { \\u0061wait: ;   };', {
            source: 'var gen = async function *() { \\u0061wait: ;   };',
            next: true
        });

        fail('var \\u{64}ebugger = 123;', {
            source: 'var \\u{64}ebugger = 123;'
        });

        fail('var def\\u{61}ult = 123;', {
            source: 'var def\\u{61}ult = 123;'
        });

        fail('var expor\\u0074 = 123;', {
            source: 'var expor\\u0074 = 123;',
            module: true
        });

        fail('var \\u0069\\u0066 = 123;', {
            source: 'var \\u0069\\u0066 = 123;',
            module: true
        });

        fail('var n\\u0065w = 123;', {
            source: 'var n\\u0065w = 123;',
        });

        fail('var \\u006eull = 123;', {
            source: 'var \\u006eull = 123;',
        });

        fail('var \\u{6e}ull = 123;', {
            source: 'var \\u{6e}ull = 123;',
        });

        fail('var \\u0073uper = 123;', {
            source: 'var \\u0073uper = 123;',
        });

        fail('thi\\u0073 = 123;', {
            source: 'thi\\u0073 = 123;',
        });

        fail('f\\u0061lse = 0;', {
            source: 'f\\u0061lse = 0;',
        });

        fail('tru\\u0065 = 0;', {
            source: 'tru\\u0065 = 0;',
        });

        fail('async() => { \\u0061wait: ;  };', {
            source: 'async() => { \\u0061wait: ;  };',
        });

        fail('var fn = async function fn() { var \\u0061wait;  };', {
            source: 'var fn = async function fn() { var \\u0061wait;  };',
        });

        fail('"use strict"; var \\u0069mplements = 123;', {
            source: '"use strict"; var \\u0069mplements = 123;'
        });

        fail('"use strict"; var \\u0069mplements = 123;', {
            source: '"use strict"; var \\u0069mplements = 123;'
        });

        fail('"use strict"; var inte\\u0072face = 123;', {
            source: '"use strict"; var inte\\u0072face = 123;'
        });

        fail('"use strict"; var \\u0073\\u0074\\u0061\\u0074\\u0069\\u0063 = 123;', {
            source: '"use strict"; var \\u0073\\u0074\\u0061\\u0074\\u0069\\u0063 = 123;'
        });

        fail('"use strict"; var \\u0079ield = 123;', {
            source: '"use strict"; var \\u0079ield = 123;'
        });

        fail('\\u0076\\u0061\\u{0072} foo = 42;', {
            source: '\\u0076\\u0061\\u{0072} foo = 42;'
        });

        fail('i\\u0066 (false) {}', {
            source: 'i\\u0066 (false) {}'
        });

        fail('var i\\u0066;', {
            source: 'var i\\u0066;'
        });

        fail('i\\u006E', {
            source: 'i\\u006E'
        });

        fail('nul\\u006c = 0;', {
            source: 'nul\\u006c = 0;'
        });

        fail('tru\\u0065 = 0;', {
            source: 'tru\\u0065 = 0;'
        });

        fail('f\\u0061lse: ;', {
            source: 'f\\u0061lse: ;'
        });

        fail('f\\u0061lse: ;', {
            source: 'f\\u0061lse: ;'
        });

        fail('tru\\u0065: ;', {
            source: 'tru\\u0065: ;'
        });

        fail('var i\\u0066', {
            source: 'var i\\u0066'
        });

        fail('i\\u0066 (0)', {
            source: 'i\\u0066 (0)'
        });

        fail('var i\\u0066', {
            source: 'var i\\u0066'
        });

        fail('\\u{74}rue', {
            source: '\\u{74}rue'
        });

        fail('export { X \\u0061s Y }', {
            source: 'export { X \\u0061s Y }',
            module: true
        });

        fail('import X fro\\u006d "foo"', {
            source: 'import X fro\\u006d "foo"',
            module: true
        });

        fail('le\\u0074 x = 5', {
            source: 'le\\u0074 x = 5'
        });

        fail('function* () { y\\u0069eld 10 })', {
            source: 'function* () { y\\u0069eld 10 })'
        });

        fail('(async function() { aw\\u0061it x })', {
            source: '(async function() { aw\\u0061it x })'
        });

        fail('(\\u0061sync function() { await x })', {
            source: '(\\u0061sync function() { await x })'
        });

        fail('(\\u0061sync () => { await x })', {
            source: '(\\u0061sync () => { await x })'
        });

        fail('\\u0061sync x => { await x }', {
            source: '\\u0061sync x => { await x }'
        });

        fail('class X { \\u0061sync x() { await x } }', {
            source: 'class X { \\u0061sync x() { await x } }'
        });

        fail('class X { static \\u0061sync x() { await x } }', {
            source: 'class X { static \\u0061sync x() { await x } }'
        });

        fail('({ ge\\u0074 x() {} })', {
            source: '({ ge\\u0074 x() {} })'
        });

        fail('export \\u0061sync function y() { await x }', {
            source: 'export \\u0061sync function y() { await x }',
            module: true
        });

        fail('export default \\u0061sync function () { await x }', {
            source: 'export default \\u0061sync function () { await x }',
            module: true
        });

        fail('({ \\u0061sync x() { await x } })', {
            source: '({ \\u0061sync x() { await x } })'
        });

        fail('le\\u0074 a', {
            source: 'le\\u0074 a'
        });

        fail('for (x \\u006ff y) {}', {
            source: 'for (x \\u006ff y) {}'
        });

        fail('function *a(){yi\\u0065ld 0}', {
            source: 'function *a(){yi\\u0065ld 0}'
        });

        fail('unction *a(){var yi\\u0065ld}', {
            source: 'unction *a(){var yi\\u0065ld}'
        });

        fail('class X { st\\u0061tic y() {} }', {
            source: 'class X { st\\u0061tic y() {} }'
        });

        fail('"use strict"; var le\\u0074', {
            source: '"use strict"; var le\\u0074'
        });

        fail('function *a(){yi\\u0065ld 0}', {
            source: 'function *a(){yi\\u0065ld 0}'
        });

        fail('function *a(){var yi\\u0065ld}', {
            source: 'function *a(){var yi\\u0065ld}'
        });

        pass(`({i\\u0066: 0})`, {
            source: '({i\\u0066: 0})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                body: [{
                    end: 14,
                    expression: {
                        end: 13,
                        loc: {
                            end: {
                                column: 13,
                                line: 1,
                            },
                            start: {
                                column: 1,
                                line: 1,
                            }
                        },
                        properties: [{
                            computed: false,
                            end: 12,
                            key: {
                                end: 9,
                                loc: {
                                    end: {
                                        column: 9,
                                        line: 1,
                                    },
                                    start: {
                                        column: 2,
                                        line: 1,
                                    }
                                },
                                name: 'if',
                                start: 2,
                                type: 'Identifier',
                            },
                            kind: 'init',
                            loc: {
                                end: {
                                    column: 12,
                                    line: 1,
                                },
                                start: {
                                    column: 2,
                                    line: 1,
                                }
                            },
                            method: false,
                            shorthand: false,
                            start: 2,
                            type: 'Property',
                            value: {
                                end: 12,
                                loc: {
                                    end: {
                                        column: 12,
                                        line: 1,
                                    },
                                    start: {
                                        column: 11,
                                        line: 1,
                                    },
                                },
                                raw: '0',
                                start: 11,
                                type: 'Literal',
                                value: 0,
                            }
                        }],
                        start: 1,
                        type: 'ObjectExpression',
                    },
                    loc: {
                        end: {
                            column: 14,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    start: 0,
                    type: 'ExpressionStatement'
                }, ],
                end: 14,
                loc: {
                    end: {
                        column: 14,
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

        pass(`var le\\u0074`, {
            source: 'var le\\u0074',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                            type: 'Identifier',
                            name: 'let',
                            start: 4,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        start: 4,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    }],
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
                }],
                sourceType: 'script',
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
            }
        });

        pass(`(\\u0061sync ())`, {
            source: '(\\u0061sync ())',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                body: [{
                    end: 15,
                    expression: {
                        arguments: [],
                        callee: {
                            end: 11,
                            loc: {
                                end: {
                                    column: 11,
                                    line: 1,
                                },
                                start: {
                                    column: 1,
                                    line: 1,
                                }
                            },
                            name: 'async',
                            start: 1,
                            type: 'Identifier'
                        },
                        end: 14,
                        loc: {
                            end: {
                                column: 14,
                                line: 1,
                            },
                            start: {
                                column: 1,
                                line: 1,
                            },
                        },
                        start: 1,
                        type: 'CallExpression',
                    },
                    loc: {
                        end: {
                            column: 15,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    start: 0,
                    type: 'ExpressionStatement',
                }, ],
                end: 15,
                loc: {
                    end: {
                        column: 15,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                sourceType: 'script',
                start: 0,
                type: 'Program',
            }
        });
    });