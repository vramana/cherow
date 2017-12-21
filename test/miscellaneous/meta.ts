import { pass, fail } from '../utils';

describe('Miscellaneous - Meta', () => {

    pass(`nothing before a lone exclamation`, {
        source: '! foo',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UnaryExpression',
                        operator: '!',
                        argument: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 2,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        prefix: true,
                        start: 0,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    start: 0,
                    end: 5,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 5,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        }
    });

    pass(`BOM in an otherwise empty source`, {
        source: '\uFFEF',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 1,
              loc: {
                end: {
                  column: 1,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass(`BOM before an identifier`, {
        source: '\uFFEFfoo',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`a shebang+LF in an otherwise empty source`, {
        source: '#!/foo/bar/baz -abc\n',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 20,
              loc: {
                end: {
                  column: 0,
                  line: 2,
                },
               start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass(`shebang+LF before a lone exclamation`, {
        source: '#!/foo/bar/baz -abc\n! foo',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    argument: {
                      name: 'foo',
                      type: 'Identifier',
                   },
                    operator: '!',
                    prefix: true,
                    type: 'UnaryExpression',
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program',
            }
    });

    pass(`shebang+CR before an identifier`, {
        source: '#!/foo/bar/baz -abc\rfoo',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program',
            }
    });

    pass(`shebang+LF before a lone exclamation`, {
        source: '#!/foo/bar/baz -abc\r\nfoo',
        expected: {
              body: [
               {
                  expression: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`shebang+line separator in an otherwise empty source"`, {
        source: '#!/foo/bar/baz -abc\u2028',
        raw: true,
        expected: {
              body: [],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`shebang+paragraph separator before a lone exclamation`, {
        source: '#!/foo/bar/baz -abc\u2029! foo',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    argument: {
                      name: 'foo',
                      type: 'Identifier'
                    },
                    operator: '!',
                    prefix: true,
                    type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`BOM+shebang+CR before a lone hash`, {
        source: '\uFFEF#!/foo/bar/baz -abc\u2029! foo',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    argument: {
                      name: 'foo',
                      type: 'Identifier'
                    },
                    operator: '!',
                    prefix: true,
                    type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`shebang+LF before a lone exclamation`, {
        source: '#!/foo/bar/baz -abc\n! foo',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    argument: {
                      name: 'foo',
                      type: 'Identifier'
                    },
                    operator: '!',
                    prefix: true,
                    type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });
});
