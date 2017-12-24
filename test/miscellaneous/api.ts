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

        describe('Collect comments', () => {

            pass(`<!-- HTML comment`, {
                source: `<!-- HTML comment`,
                ranges: true,
                raw: true,
                comments: (type: string, comment: string, start: number, end: number) => {
                    t.deepEqual(type, 'Line');
                    t.deepEqual(comment, ' HTML comment');
                    t.deepEqual(start, 0);
                    t.deepEqual(end, 17);
                },
                expected: {
                    type: 'Program',
                    start: 0,
                    end: 17,
                    body: [],
                    sourceType: 'script'
                }
            });

            pass(`/* Hello multiline comment, are you colleced yet? */`, {
                source: `/* Hello multiline comment, are you colleced yet? */`,
                ranges: true,
                raw: true,
                comments: (type: string, comment: string, start: number, end: number) => {
                    t.deepEqual(type, 'Block');
                    t.deepEqual(comment, ' Hello multiline comment, are you colleced yet? ');
                    t.deepEqual(start, 0);
                    t.deepEqual(end, 52);
                },
                expected: {
                    type: 'Program',
                    start: 0,
                    end: 52,
                    body: [],
                    sourceType: 'script'
                }
            });

            const foo: any[] = [];
            pass(`/* ABC */ function abc() {} /* DEF */`, {
                source: `/* ABC */ function abc() {} /* DEF */`,
                ranges: true,
                raw: true,
                comments: foo,
                loc: true,
                expected: {
                    type: 'Program',
                    start: 0,
                    end: 37,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    },
                    body: [{
                        type: 'FunctionDeclaration',
                        start: 10,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 19,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            name: 'abc'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            start: 25,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            },
                            body: []
                        }
                    }],
                    sourceType: 'script'
                }
            });
        });
    });