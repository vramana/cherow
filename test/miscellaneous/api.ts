import { pass, fail } from '../utils';
import * as t from 'assert';
import { parseScript, parseModule } from '../../src/cherow';

describe('Miscellaneous - API', () => {

        fail(`JSX syntax by default`, {
            source: `<head/>`,
        });

        fail(`JSX syntax by default (module)`, {
            source: `<head/>`,
            module: true
        });

        it('Should handle source on node', () => {

            const parser = parseScript('1', {
                source: 'foo'
            });
            t.deepEqual(parser, {
                body: [{
                    expression: {
                        type: 'Literal',
                        value: 1,
                    },
                    type: 'ExpressionStatement',
                }, ],
                sourceType: 'script',
                type: 'Program',
            });
        });
        pass(`source option on location node`, {
            source: `function f(){}`,
            ranges: true,
            loc: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 12,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 9,
                        end: 10,
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
                    },
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                }],
                sourceType: 'script',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            }
        });
    });