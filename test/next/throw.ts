import { pass, fail } from '../utils';

describe('Next - Throw expression', () => {

        fail('function save(filename = throw new TypeError("Argument required")) {}', {
            source: `function save(filename = throw new TypeError("Argument required")) {}`
        });

        fail('function test() { (throw 1, 2); }', {
            source: `function test() { (throw 1, 2); }`
        });

        pass(`function save(filename = throw new TypeError("Argument required")) {}`, {
            source: 'function save(filename = throw new TypeError("Argument required")) {}',
            ranges: true,
            next: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'Identifier',
                            name: 'filename',
                            start: 14,
                            end: 22
                        },
                        right: {
                            type: 'ThrowExpression',
                            expressions: {
                                type: 'NewExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'TypeError',
                                    start: 35,
                                    end: 44
                                },
                                arguments: [{
                                    type: 'Literal',
                                    value: 'Argument required',
                                    start: 45,
                                    end: 64,
                                    raw: '"Argument required"'
                                }],
                                start: 31,
                                end: 65
                            },
                            start: 25,
                            end: 65
                        },
                        start: 14,
                        end: 65
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 67,
                        end: 69
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'save',
                        start: 9,
                        end: 13
                    },
                    start: 0,
                    end: 69
                }],
                sourceType: 'script',
                start: 0,
                end: 69
            }
        });
    });