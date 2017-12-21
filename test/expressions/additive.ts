import { pass, fail } from '../utils';

describe('Expressions - Additive', () => {

    pass(`+a`, {
        source: '+a',
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
                        operator: '+',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                            start: 1,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            }
                        },
                        prefix: true,
                        start: 0,
                        end: 2,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    },
                    start: 0,
                    end: 2,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 2,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 2
                }
            }
        }
    });

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

    pass(`"use strict" + 42`, {
        source: '"use strict" + 42',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Literal',
                            value: 'use strict',
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
                            },
                            raw: '"use strict"'
                        },
                        right: {
                            type: 'Literal',
                            value: 42,
                            start: 15,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            },
                            raw: '42'
                        },
                        operator: '+',
                        start: 0,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    directive: 'use strict'
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 17,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }
    });

    pass(`x - y`, {
        source: 'x - y',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'x',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'y',
                            start: 4,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        operator: '-',
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
});