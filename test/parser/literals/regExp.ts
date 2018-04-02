import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser';

describe('Literals - Regular expressions', () => {

    describe('Failure', () => {

        fail(`/./gig;`, Context.Empty, {
            source: '/./gig;',
        });

        fail(`/(?:)/m🀒`, Context.Empty, {
            source: '/(?:)/m🀒',
        });

        fail(`/\\n\\r`, Context.Empty, {
            source: '/\\n\\r',
        });
    /*
        fail(`/\\2028`, Context.Empty, {
            source: '/\\2028',
        });

        fail(`/./mm;`, Context.Empty, {
            source: '/./mm;',
        });

        fail(`/./sis`, Context.Empty, {
            source: '/./sis',
        });

        fail(`/./sis`, Context.Empty, {
            source: '/./sis',
        });

        fail(`var x = /[\u0063-b]/u;`, Context.Empty, {
            source: 'var x = /[\u0063-b]/u;',
        });

        fail(`var x = /[\f\n\r]/u;`, Context.Empty, {
            source: 'var x = /[\n\r]/u;',
        });

        fail(`var x = /[\u{63}-b]/u;`, Context.Empty, {
            source: 'var x = /[\u{63}-b]/u;',
        });

        fail(`/./sis`, Context.Empty, {
            source: '/./sis',
        });

        fail(`var x = /[\u0063-b]/u;`, Context.Empty, {
            source: 'var x = /[\u0063-b]/u;'
        });

        fail(`var x = /[\f\n\r]/u;`, Context.Empty, {
            source: 'var x = /[\n\r]/u;'
        });

        fail(`var x = /[\u{63}-b]/u;`, Context.Empty, {
            source: 'var x = /[\u{63}-b]/u;',
        });

        fail(`/./yiy`, Context.Empty, {
            source: '/./yiy',
        });

        fail(`var regExp =  /[\u2028]/`, Context.Empty, {
            source: 'var regExp =  /[\u2028]/',
        });

        fail(`/./uu`, Context.Empty, {
            source: '/./uu',
        });

        fail(`var re = //;`, Context.Empty, {
            source: 'var re = //;',
        });
    */
    });

    describe('Pass', () => {

        pass(`var x = /[\u{61}-b][\u0061-b][a-\u{62}][a-\u0062]\u{1ffff}/u;`, Context.Empty, {
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

        pass(`var x = /=([^=\s])+/g`, Context.Empty, {
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
                                pattern: '([^=s])+',
                            },
                            type: 'Literal',
                            value: /([^=s])+/g,
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

        pass(`var x = /[x-z]/i`, Context.Empty, {
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

        pass(`/(?:)/\u0067`, Context.Empty, {
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

        pass(`/}?/u`, Context.Empty, {
            source: '/}?/u',
            expected: {
                type: 'Program',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: undefined,
                        regex: {
                            pattern: '}?',
                            flags: 'u'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`/(?:)/gi;`, Context.OptionsRanges | Context.OptionsRaw, {
            source: '/(?:)/gi;',
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
                        raw: '',
                        regex: {
                            pattern: '(?:)',
                            flags: 'gi'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`/(?:)/m`, Context.OptionsRanges | Context.OptionsRaw, {
            source: '/(?:)/m',
            expected: {
                body: [{
                    end: 7,
                    expression: {
                        end: 7,
                        raw: '',
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

    });
});
