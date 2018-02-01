import { pass, fail } from '../test-utils';

describe('Expressions - Additive', () => {

    pass(`--a`, {
        source: '--a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        operator: '--',
                        prefix: true,
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                            start: 2,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
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
                }
            ],
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