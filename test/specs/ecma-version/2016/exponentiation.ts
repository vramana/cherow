import { n, test } from '../../utils/test-utils';

describe('ES2016 - Exponentiation', () => {

        test('x **= 42', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '**=',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                    },
                    right: {
                        type: 'Literal',
                        value: 42,
                    },
                },
            }, ],
            sourceType: 'script',
        });

        test('3 ** 5 * 1', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'BinaryExpression',
                        operator: '**',
                        left: {
                            type: 'Literal',
                            value: 3,
                        },
                        right: {
                            type: 'Literal',
                            value: 5,
                        },
                    },
                    right: {
                        type: 'Literal',
                        value: 1,
                    },
                },
            }, ],
            sourceType: 'script',
        });

        test('3 % 5 ** 1', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '%',
                    left: {
                        type: 'Literal',
                        value: 3,
                    },
                    right: {
                        type: 'BinaryExpression',
                        operator: '**',
                        left: {
                            type: 'Literal',
                            value: 5,
                        },
                        right: {
                            type: 'Literal',
                            value: 1,
                        },
                    },
                },
            }, ],
            sourceType: 'script',
        });

        test('-a * 5', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                        },
                        prefix: true,
                    },
                    right: {
                        type: 'Literal',
                        value: 5,
                    },
                },
            }, ],
            sourceType: 'script',
        });

        test('(-5) ** y', {
            body: [{
                expression: {
                    left: {
                        argument: {
                            type: 'Literal',
                            value: 5,
                        },
                        operator: '-',
                        prefix: true,
                        type: 'UnaryExpression',
                    },
                    operator: '**',
                    right: {
                        name: 'y',
                        type: 'Identifier',
                    },
                    type: 'BinaryExpression',
                },
                type: 'ExpressionStatement',
            }, ],
            sourceType: 'script',
            type: 'Program',
        });

        test('++a ** 2', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '**',
                    left: {
                        type: 'UpdateExpression',
                        operator: '++',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                        },
                        prefix: true,
                    },
                    right: {
                        type: 'Literal',
                        value: 2,
                    },
                },
            }, ],
            sourceType: 'script',
        });

        test('a-- ** 2', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '**',
                    left: {
                        type: 'UpdateExpression',
                        operator: '--',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                        },
                        prefix: false,
                    },
                    right: {
                        type: 'Literal',
                        value: 2,
                    },
                },
            }, ],
            sourceType: 'script',
        });

        test('a++ ** 2', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '**',
                    left: {
                        type: 'UpdateExpression',
                        operator: '++',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                        },
                        prefix: false,
                    },
                    right: {
                        type: 'Literal',
                        value: 2,
                    },
                },
            }, ],
            sourceType: 'script',
        });

        test('1 * 5 ** 2', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: '*',
                    left: {
                        type: 'Literal',
                        value: 1,
                    },
                    right: {
                        type: 'BinaryExpression',
                        operator: '**',
                        left: {
                            type: 'Literal',
                            value: 5,
                        },
                        right: {
                            type: 'Literal',
                            value: 2,
                        },
                    },
                },
            }, ],
            sourceType: 'script',
        });
    });