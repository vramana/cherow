import { pass, fail } from '../utils';

describe('Miscellaneous - Future reserved words', () => {

        fail(`var export = 1;`, {
            source: `var export = 1;`,
        });

        fail(`var class = 1;`, {
            source: `var class = 1;`,
            message: 'Unexpected token \'class\'',
            line: 1,
            column: 4,
            index: 9
        });

        fail(`"use strict"; var implements = 1;`, {
            source: `"use strict"; var implements = 1;`,
        });

        fail(`"use strict"; var inte\\u0072face = 123;`, {
            source: `"use strict"; var inte\\u0072face = 123;;`,
        });

        fail(`var enum = 1;`, {
            source: `var enum = 1;`,
        });

        fail(`"use strict"; var \\u0079ield = 123;`, {
            source: `"use strict"; var \\u0079ield = 123;`,
        });

        fail(`"use strict"; var \\u0070\\u0075\\u0062\\u006c\\u0069\\u0063 = 123;`, {
            source: `"use strict"; var \\u0070\\u0075\\u0062\\u006c\\u0069\\u0063 = 123;`,
        });

        pass(`var Implements = 1;`, {
            source: 'var Implements = 1;',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 4,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 4,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            name: 'Implements'
                        },
                        init: {
                            type: 'Literal',
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
                            value: 1,
                            raw: '1'
                        }
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });
});