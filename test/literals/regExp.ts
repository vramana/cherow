import { fail, pass } from '../test-utils';
import { parseScript } from '../../src/cherow';

describe('Literals - RegExp', () => {

    function test(re: any, source: any) {
        pass('/' + re.source + '/', {
            source: '/' + re.source + '/',
            expected: parseScript('/' + re.source + '/')
        });
    }

    test(/\\n/, '\\\\n');
    test(/\\\n/, '\\\\\\n');
    test(/\\\\n/, '\\\\\\\\n');
    test(RegExp('\\n'), '\\n');
    test(RegExp('\\\n'), '\\n');
    test(RegExp('\\\\n'), '\\\\n');

    test(/\\r/, '\\\\r');
    test(/\\\r/, '\\\\\\r');
    test(/\\\\r/, '\\\\\\\\r');
    test(RegExp('\\r'), '\\r');
    test(RegExp('\\\r'), '\\r');
    test(RegExp('\\\\r'), '\\\\r');

    test(/\\u2028/, '\\\\u2028');
    test(/\\\u2028/, '\\\\\\u2028');
    test(/\\\\u2028/, '\\\\\\\\u2028');
    test(RegExp('\\u2028'), '\\u2028');
    test(RegExp('\\\u2028'), '\\u2028');
    test(RegExp('\\\\u2028'), '\\\\u2028');

    test(/\\u2029/, '\\\\u2029');
    test(/\\\u2029/, '\\\\\\u2029');
    test(/\\\\u2029/, '\\\\\\\\u2029');
    test(RegExp('\\u2029'), '\\u2029');
    test(RegExp('\\\u2029'), '\\u2029');
    test(RegExp('\\\\u2029'), '\\\\u2029');

    test(/\//, '\\/');
    test(/\\\//, '\\\\\\/');
    test(RegExp('/'), '\\/');
    test(RegExp('\/'), '\\/');
    test(RegExp('\\/'), '\\/');
    test(RegExp('\\\/'), '\\/');
    test(RegExp('\\\\/'), '\\\\\\/');

    test(/[/]/, '[/]');
    test(/[\/]/, '[\\/]');
    test(/[\\/]/, '[\\\\/]');
    test(/[\\\/]/, '[\\\\\\/]');
    test(RegExp('[/]'), '[/]');
    test(RegExp('[\/]'), '[/]');
    test(RegExp('[\\/]'), '[\\/]');
    test(RegExp('[\\\/]'), '[\\/]');
    test(RegExp('[\\\\/]'), '[\\\\/]');

    test(RegExp('\[/\]'), '[/]');
    test(RegExp('\[\\/\]'), '[\\/]');

    test(/\[\/\]/, '\\[\\/\\]');
    test(/\[\\\/\]/, '\\[\\\\\\/\\]');
    test(RegExp('\\[/\\]'), '\\[\\/\\]');
    test(RegExp('\\[\/\\]'), '\\[\\/\\]');
    test(RegExp('\\[\\/\\]'), '\\[\\/\\]');
    test(RegExp('\\[\\\/\\]'), '\\[\\/\\]');
    test(RegExp('\\[\\\\/\\]'), '\\[\\\\\\/\\]');

    fail(`/./gig;`, {
        source: '/./gig;',
    });

    fail(`/(?:)/m🀒`, {
        source: '/(?:)/m🀒',
    });

    fail(`/\\n\\r`, {
        source: '/\\n\\r',
    });

    fail(`/\\2028`, {
        source: '/\\2028',
    });

    fail(`/./mm;`, {
        source: '/./mm;',
    });

    fail(`/./sis`, {
        source: '/./sis',
        next: true
    });

    fail(`/./sis`, {
        source: '/./sis',
        next: true
    });

    fail(`var x = /[\u0063-b]/u;`, {
        source: 'var x = /[\u0063-b]/u;',
        next: true
    });

    fail(`var x = /[\f\n\r]/u;`, {
        source: 'var x = /[\n\r]/u;',
        next: true
    });

    fail(`var x = /[\u{63}-b]/u;`, {
        source: 'var x = /[\u{63}-b]/u;',
        next: true
    });

    fail(`/./sis`, {
        source: '/./sis',
        next: true
    });

    fail(`var x = /[\u0063-b]/u;`, {
        source: 'var x = /[\u0063-b]/u;',
        next: true
    });

    fail(`var x = /[\f\n\r]/u;`, {
        source: 'var x = /[\n\r]/u;',
        next: true
    });

    fail(`var x = /[\u{63}-b]/u;`, {
        source: 'var x = /[\u{63}-b]/u;',
        next: true
    });

    fail(`/./yiy`, {
        source: '/./yiy',
        next: true
    });

    fail(`var regExp =  /[\u2028]/`, {
        source: 'var regExp =  /[\u2028]/',
    });

    fail(`/./uu`, {
        source: '/./uu',
        next: true
    });

    fail(`var re = //;`, {
        source: 'var re = //;',
    });

    pass(`var x = /[\u{61}-b][\u0061-b][a-\u{62}][a-\u0062]\u{1ffff}/u;`, {
        source: 'var x = /[\u{61}-b][\u0061-b][a-\u{62}][a-\u0062]\u{1ffff}/u;',
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'x',
                        type: 'Identifier'
                    },
                    init: {
                        regex: {
                            flags: 'u',
                            pattern: '[a-b][a-b][a-b][a-b]🿿'
                        },
                        type: 'Literal',
                        value: /[a-b][a-b][a-b][a-b]🿿/u
                    },
                    type: 'VariableDeclarator'
                }],
                kind: 'var',
                type: 'VariableDeclaration'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`var x = /=([^=\s])+/g`, {
        source: 'var x = /=([^=\s])+/g',
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'x',
                        type: 'Identifier'
                    },
                    init: {
                        regex: {
                            flags: 'g',
                            pattern: '=([^=s])+',
                        },
                        type: 'Literal',
                        value: /=([^=s])+/g,
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

    pass(`var x = /[x-z]/i`, {
        source: 'var x = /[x-z]/i',
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'x',
                        type: 'Identifier'
                    },
                    init: {
                        regex: {
                            flags: 'i',
                            pattern: '[x-z]',
                        },
                        type: 'Literal',
                        value: /[x-z]/i,
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

    pass(`/(?:)/\u0067`, {
        source: '/(?:)/\u0067',
        expected: {
            body: [{
                expression: {
                    regex: {
                        flags: 'g',
                        pattern: '(?:)'
                    },
                    type: 'Literal',
                    value: /(?:)/g,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`/}?/u`, {
        source: '/}?/u',
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: null,
                    regex: {
                        pattern: '}?',
                        flags: 'u'
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`/(?:)/gi;`, {
        source: '/(?:)/gi;',
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 9,
            body: [{
                type: 'ExpressionStatement',
                start: 0,
                end: 9,
                expression: {
                    type: 'Literal',
                    start: 0,
                    end: 8,
                    value: /(?:)/gi,
                    raw: '/(?:)/gi',
                    regex: {
                        pattern: '(?:)',
                        flags: 'gi'
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`/(?:)/m`, {
        source: '/(?:)/m',
        ranges: true,
        raw: true,
        expected: {
            body: [{
                end: 7,
                expression: {
                    end: 7,
                    raw: '/(?:)/m',
                    regex: {
                        flags: 'm',
                        pattern: '(?:)',
                    },
                    start: 0,
                    type: 'Literal',
                    value: /(?:)/m,
                },
                start: 0,
                type: 'ExpressionStatement'
            }, ],
            end: 7,
            sourceType: 'script',
            start: 0,
            type: 'Program'
        }
    });

    pass(`let re = /(?:)/;`, {
        source: 'let re = /(?:)/;',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'Literal',
                        value: {},
                        regex: {
                            pattern: '(?:)',
                            flags: ''
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
                        },
                        raw: '/(?:)/'
                    },
                    id: {
                        type: 'Identifier',
                        name: 're',
                        start: 4,
                        end: 6,
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
                }],
                kind: 'let',
                start: 0,
                end: 16,
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
            start: 0,
            end: 16,
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

    pass(`/[a-c]/i`, {
        source: '/[a-c]/i',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: {},
                    regex: {
                        pattern: '[a-c]',
                        flags: 'i'
                    },
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    },
                    raw: '/[a-c]/i'
                },
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 8,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }
    });

    pass(`/a/i`, {
        source: '/a/i',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: {},
                    regex: {
                        pattern: 'a',
                        flags: 'i'
                    },
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
                    },
                    raw: '/a/i'
                },
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
            }],
            sourceType: 'script',
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
        }
    });

    pass(`/[P QR]/i`, {
        source: '/[P QR]/i',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: {},
                    regex: {
                        pattern: '[P QR]',
                        flags: 'i'
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
                    },
                    raw: '/[P QR]/i'
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

    pass(`/((((((((((((.))))))))))))\\12/;`, {
        source: '/((((((((((((.))))))))))))\\12/;',
        raw: true,
        expected: {
            body: [{
                expression: {
                    raw: '/((((((((((((.))))))))))))\\12/',
                    regex: {
                        flags: '',
                        pattern: '((((((((((((.))))))))))))\\12'
                    },
                    type: 'Literal',
                    value: /((((((((((((.))))))))))))\12/
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`/\\uD834/u`, {
        source: '/\\uD834/u',
        raw: true,
        expected: {
            body: [{
                expression: {
                    raw: '/\\uD834/u',
                    regex: {
                        flags: 'u',
                        pattern: '\\uD834',
                    },
                    type: 'Literal',
                    value: /\uD834/u,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`/[-a-]/`, {
        source: '/[-a-]/',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: {},
                    regex: {
                        pattern: '[-a-]',
                        flags: ''
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
                    },
                    raw: '/[-a-]/'
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

    pass(`/[-a-b-]/`, {
        source: '/[-a-b-]/',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: {},
                    regex: {
                        pattern: '[-a-b-]',
                        flags: ''
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
                    },
                    raw: '/[-a-b-]/'
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

    pass(`/{/;`, {
        source: '/{/;',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: {},
                    regex: {
                        pattern: '{',
                        flags: ''
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
                    },
                    raw: '/{/'
                },
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
            }],
            sourceType: 'script',
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
        }
    });

    pass(`/\\0/`, {
        source: '/\\0/',
        raw: true,
        expected: {
            body: [{
                expression: {
                    raw: '/\\0/',
                    regex: {
                        flags: '',
                        pattern: '\\0',
                    },
                    type: 'Literal',
                    value: /\0/,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`/\\1/u`, {
        source: '/\\1/u',
        raw: true,
        expected: {
            body: [{
                expression: {
                    raw: '/\\1/u',
                    regex: {
                        flags: 'u',
                        pattern: '\\1',
                    },
                    type: 'Literal',
                    value: null,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`/a/`, {
        source: '/a/',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: /a/,
                    regex: {
                        pattern: 'a',
                        flags: ''
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
                    },
                    raw: '/a/'
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
});