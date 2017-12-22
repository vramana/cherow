import { pass, fail } from '../utils';

describe('Expressions - Object', () => {

    pass(`"use strict;" ({x:1,   "x":1})`, {
        source: '"use strict;" ({x:1,   "x":1})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 16,
                                            end: 17,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 17
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 18,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 16,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 'x',
                                            start: 23,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            },
                                            raw: '"x"'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 27,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 23,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 23
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 30,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }
    });

    pass(`"use strict;" ({1.5:1, 1.5:1})`, {
        source: '"use strict;" ({1.5:1, 1.5:1})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 1.5,
                                            start: 16,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            },
                                            raw: '1.5'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 16,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 1.5,
                                            start: 23,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            },
                                            raw: '1.5'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 27,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 23,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 23
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 30,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }
    });

    pass(`"use strict;" ({6.02214179e23:1, 6.02214179e23:1})`, {
        source: '"use strict;" ({6.02214179e23:1, 6.02214179e23:1})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 6.02214179e+23,
                                            start: 16,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            },
                                            raw: '6.02214179e23'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 30,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 16,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 6.02214179e+23,
                                            start: 33,
                                            end: 46,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 46
                                                }
                                            },
                                            raw: '6.02214179e23'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 47,
                                            end: 48,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 47
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 48
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 33,
                                        end: 48,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 48
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 49,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 49
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 50,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 50
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 50,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 50
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 50,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 50
                }
            }
        }
    });

    pass(`"use strict;" ({ "1": 1, 1: 2 })`, {
        source: '"use strict;" ({ "1": 1, 1: 2 })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: '1',
                                            start: 17,
                                            end: 20,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 20
                                                }
                                            },
                                            raw: '"1"'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 22,
                                            end: 23,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 17,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 25,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            },
                                            raw: '1'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 2,
                                            start: 28,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            },
                                            raw: '2'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 25,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 32,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 32
                }
            }
        }
    });

    pass(`"use strict;" ({ "2.5": 1, 2.5: 2 })`, {
        source: '"use strict;" ({ "2.5": 1, 2.5: 2 })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: '2.5',
                                            start: 17,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            },
                                            raw: '"2.5"'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 24,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 17,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 2.5,
                                            start: 27,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            },
                                            raw: '2.5'
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 2,
                                            start: 32,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            },
                                            raw: '2'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 27,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 36,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 36
                }
            }
        }
    });

    pass(`"use strict;" ({a:1, b:1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l:1, m:1, n:1, o:1, p:1, q:1, r:1, s:1, t:1, u:1, v:1, w:1, x:1, y:1, a:1})`, {
        source: '"use strict;" ({a:1, b:1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l:1, m:1, n:1, o:1, p:1, q:1, r:1, s:1, t:1, u:1, v:1, w:1, x:1, y:1, a:1})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 16,
                                            end: 17,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 17
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 18,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 16,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'b',
                                            start: 21,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 23,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 21,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'c',
                                            start: 26,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 28,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 26,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'd',
                                            start: 31,
                                            end: 32,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 33,
                                            end: 34,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 34
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 31,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 34
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'e',
                                            start: 36,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 36
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 38,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 38
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 36,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'f',
                                            start: 41,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 43,
                                            end: 44,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 43
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 44
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 41,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'g',
                                            start: 46,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 46
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 48,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 48
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 46,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 46
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'h',
                                            start: 51,
                                            end: 52,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 51
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 52
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 53,
                                            end: 54,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 53
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 54
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 51,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 51
                                            },
                                            end: {
                                                line: 1,
                                                column: 54
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'i',
                                            start: 56,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 56
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 57
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 58,
                                            end: 59,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 58
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 59
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 56,
                                        end: 59,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 56
                                            },
                                            end: {
                                                line: 1,
                                                column: 59
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'j',
                                            start: 61,
                                            end: 62,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 61
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 62
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 63,
                                            end: 64,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 63
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 64
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 61,
                                        end: 64,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 61
                                            },
                                            end: {
                                                line: 1,
                                                column: 64
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'k',
                                            start: 66,
                                            end: 67,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 66
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 67
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 68,
                                            end: 69,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 68
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 69
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 66,
                                        end: 69,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 66
                                            },
                                            end: {
                                                line: 1,
                                                column: 69
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'l',
                                            start: 71,
                                            end: 72,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 71
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 72
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 73,
                                            end: 74,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 73
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 74
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 71,
                                        end: 74,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 71
                                            },
                                            end: {
                                                line: 1,
                                                column: 74
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'm',
                                            start: 76,
                                            end: 77,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 76
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 77
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 78,
                                            end: 79,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 78
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 79
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 76,
                                        end: 79,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 76
                                            },
                                            end: {
                                                line: 1,
                                                column: 79
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'n',
                                            start: 81,
                                            end: 82,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 81
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 82
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 83,
                                            end: 84,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 83
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 84
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 81,
                                        end: 84,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 81
                                            },
                                            end: {
                                                line: 1,
                                                column: 84
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'o',
                                            start: 86,
                                            end: 87,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 86
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 87
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 88,
                                            end: 89,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 88
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 89
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 86,
                                        end: 89,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 86
                                            },
                                            end: {
                                                line: 1,
                                                column: 89
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
                                            start: 91,
                                            end: 92,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 91
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 92
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 93,
                                            end: 94,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 93
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 94
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 91,
                                        end: 94,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 91
                                            },
                                            end: {
                                                line: 1,
                                                column: 94
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'q',
                                            start: 96,
                                            end: 97,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 96
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 97
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 98,
                                            end: 99,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 98
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 99
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 96,
                                        end: 99,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 96
                                            },
                                            end: {
                                                line: 1,
                                                column: 99
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'r',
                                            start: 101,
                                            end: 102,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 101
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 102
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 103,
                                            end: 104,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 103
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 104
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 101,
                                        end: 104,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 101
                                            },
                                            end: {
                                                line: 1,
                                                column: 104
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 's',
                                            start: 106,
                                            end: 107,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 106
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 107
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 108,
                                            end: 109,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 108
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 109
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 106,
                                        end: 109,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 106
                                            },
                                            end: {
                                                line: 1,
                                                column: 109
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 't',
                                            start: 111,
                                            end: 112,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 111
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 112
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 113,
                                            end: 114,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 113
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 114
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 111,
                                        end: 114,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 111
                                            },
                                            end: {
                                                line: 1,
                                                column: 114
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'u',
                                            start: 116,
                                            end: 117,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 116
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 117
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 118,
                                            end: 119,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 118
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 119
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 116,
                                        end: 119,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 116
                                            },
                                            end: {
                                                line: 1,
                                                column: 119
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'v',
                                            start: 121,
                                            end: 122,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 121
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 122
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 123,
                                            end: 124,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 123
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 124
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 121,
                                        end: 124,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 121
                                            },
                                            end: {
                                                line: 1,
                                                column: 124
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'w',
                                            start: 126,
                                            end: 127,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 126
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 127
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 128,
                                            end: 129,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 128
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 129
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 126,
                                        end: 129,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 126
                                            },
                                            end: {
                                                line: 1,
                                                column: 129
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 131,
                                            end: 132,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 131
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 132
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 133,
                                            end: 134,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 133
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 134
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 131,
                                        end: 134,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 131
                                            },
                                            end: {
                                                line: 1,
                                                column: 134
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 136,
                                            end: 137,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 136
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 137
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 138,
                                            end: 139,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 138
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 139
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 136,
                                        end: 139,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 136
                                            },
                                            end: {
                                                line: 1,
                                                column: 139
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 141,
                                            end: 142,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 141
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 142
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 143,
                                            end: 144,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 143
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 144
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 141,
                                        end: 144,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 141
                                            },
                                            end: {
                                                line: 1,
                                                column: 144
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 145,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 145
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 146,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 146
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 146,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 146
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 146,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 146
                }
            }
        }
    });

    pass(`"use strict;" ({get x() {}, set x(q) {}})`, {
        source: '"use strict;" ({get x() {}, set x(q) {}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 24,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 21,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        kind: 'get',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 16,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 32,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'q',
                                                    start: 34,
                                                    end: 35,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 34
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 35
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 37,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 33,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        },
                                        kind: 'set',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 28,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 41,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }
    });

    pass(`"use strict;" ({set x(q) {}, get x() {}})`, {
        source: '"use strict;" ({set x(q) {}, get x() {}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'q',
                                                    start: 22,
                                                    end: 23,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 23
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
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
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 21,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            }
                                        },
                                        kind: 'set',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 16,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 33,
                                            end: 34,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 34
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 37,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 34,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        },
                                        kind: 'get',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 29,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 41,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }
    });

    pass(`"use strict;" ({get x() {}, get x() {}})`, {
        source: '"use strict;" ({get x() {}, get x() {}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 24,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 21,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        kind: 'get',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 16,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 32,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 36,
                                                end: 38,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 36
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 38
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 33,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            }
                                        },
                                        kind: 'get',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 28,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 40,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 40
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 40,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 40
                }
            }
        }
    });

    pass(`"use strict;" ({get x() {}, set x(q) {}, y:1})`, {
        source: '"use strict;" ({get x() {}, set x(q) {}, y:1})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Literal',
                            value: 'use strict;',
                            start: 0,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict;"'
                        },
                        arguments: [
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 20,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 24,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 21,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        kind: 'get',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 16,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 32,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'q',
                                                    start: 34,
                                                    end: 35,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 34
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 35
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 37,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 33,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        },
                                        kind: 'set',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 28,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 41,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 43,
                                            end: 44,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 43
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 44
                                                }
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 41,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    }
                                ],
                                start: 15,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 46
                            }
                        }
                    },
                    directive: 'use strict;',
                    start: 0,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 46,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 46
                }
            }
        }
    });

    pass(`({ x([ a, b ]){} });`, {
        source: '({ x([ a, b ]){} });',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 3,
                                    end: 4,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 4
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    start: 7,
                                                    end: 8,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 7
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 8
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    start: 10,
                                                    end: 11,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 10
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 11
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 5,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 14,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 4,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 3,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 20,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 20
                }
            }
        }
    });

    pass(`object = { __proto__: undefined };`, {
        source: 'object = { __proto__: undefined };',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'object',
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 11,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'undefined',
                                        start: 22,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        },
                        start: 0,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    },
                    start: 0,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 34,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 34
                }
            }
        }
    });

    pass(`object = { __proto__: 1 };`, {
        source: 'object = { __proto__: 1 };',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'object',
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 11,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 1,
                                        start: 22,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        },
                                        raw: '1'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        start: 0,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 26
                }
            }
        }
    });
    pass(`object = { __proto__: false };`, {
        source: 'object = { __proto__: false };',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'object',
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 11,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: false,
                                        start: 22,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        },
                                        raw: 'false'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        start: 0,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    start: 0,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 30,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }
    });

    pass(`object = { __proto__: 'string literal' };`, {
        source: 'object = { __proto__: "string literal" };',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'object',
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 11,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 'string literal',
                                        start: 22,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        },
                                        raw: '"string literal"'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            }
                        },
                        start: 0,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    },
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 41,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }
    });

    pass(`object = { __proto__: Symbol("") };`, {
        source: 'object = { __proto__: Symbol("") };',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'object',
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 11,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'Symbol',
                                            start: 22,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Literal',
                                                value: '',
                                                start: 29,
                                                end: 31,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 31
                                                    }
                                                },
                                                raw: '""'
                                            }
                                        ],
                                        start: 22,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            }
                        },
                        start: 0,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        }
                    },
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 35,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 35
                }
            }
        }
    });

    pass(`({})`, {
        source: '({})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [],
                        start: 1,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
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
                }
            ],
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

    pass(`({ answer: 0 })`, {
        source: '({ answer: 0 })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'answer',
                                    start: 3,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 0,
                                    start: 11,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    },
                                    raw: '0'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 15,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }
    });

    pass(`({ if: 0 })`, {
        source: '({ if: 0 })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'if',
                                    start: 3,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 0,
                                    start: 7,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    raw: '0'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 11,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }
    });

    pass(`({ true: 0 })`, {
        source: '({ true: 0 })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'true',
                                    start: 3,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 0,
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
                                    },
                                    raw: '0'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    start: 0,
                    end: 13,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 13,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }
    });

    pass(`({ x: 1, x: 2 })`, {
        source: '({ x: 1, x: 2 })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 3,
                                    end: 4,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 4
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                value: {
                                    type: 'Literal',
                                    value: 2,
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    raw: '2'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 9,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
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
            ],
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

    pass(`({ get width() { return m_width } })`, {
        source: '({ get width() {  } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'width',
                                    start: 7,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 15,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 15
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 12,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 22,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }
    });

    pass(`({ get undef() {} })`, {
        source: '({ get undef() {} })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'undef',
                                    start: 7,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 12,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 20,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 20
                }
            }
        }
    });

    pass(`({ get if() {} })`, {
        source: '({ get if() {} })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'if',
                                    start: 7,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
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
                                    id: null,
                                    start: 9,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 16
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
                    }
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

    pass(`({ get true() {} })`, {
        source: '({ get true() {} })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'true',
                                    start: 7,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 14,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 11,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`({ get "undef"() {} })`, {
        source: '({ get "undef"() {} })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'undef',
                                    start: 7,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    },
                                    raw: '"undef"'
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 17,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 14,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 22,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }
    });

    pass(`({ get 10() {} })`, {
        source: '({ get 10() {} })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 10,
                                    start: 7,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    raw: '10'
                                },
                                value: {
                                    type: 'FunctionExpression',
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
                                    id: null,
                                    start: 9,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 16
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
                    }
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

    pass(`({ set width(w) { w } })`, {
        source: '({ set width(w) { w } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'width',
                                    start: 7,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            start: 13,
                                            end: 14,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'w',
                                                    start: 18,
                                                    end: 19,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 19
                                                        }
                                                    }
                                                },
                                                start: 18,
                                                end: 19,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 19
                                                    }
                                                }
                                            }
                                        ],
                                        start: 16,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 12,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 24,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 24
                }
            }
        }
    });

    pass(`({ set if(w) { w } })`, {
        source: '({ set if(w) { w } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'if',
                                    start: 7,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            start: 10,
                                            end: 11,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 11
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'w',
                                                    start: 15,
                                                    end: 16,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 15
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 16
                                                        }
                                                    }
                                                },
                                                start: 15,
                                                end: 16,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 16
                                                    }
                                                }
                                            }
                                        ],
                                        start: 13,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 9,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    });

    pass(`({ set "null"(w) { w } })`, {
        source: '({ set "null"(w) { w } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'null',
                                    start: 7,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    raw: '"null"'
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            start: 14,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'w',
                                                    start: 19,
                                                    end: 20,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 19
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 20
                                                        }
                                                    }
                                                },
                                                start: 19,
                                                end: 20,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 20
                                                    }
                                                }
                                            }
                                        ],
                                        start: 17,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 13,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        }
                    },
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 25,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 25
                }
            }
        }
    });

    pass(`({ set 10(w) { w } })`, {
        source: '({ set 10(w) { w } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 10,
                                    start: 7,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    raw: '10'
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
                                            start: 10,
                                            end: 11,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 11
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'w',
                                                    start: 15,
                                                    end: 16,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 15
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 16
                                                        }
                                                    }
                                                },
                                                start: 15,
                                                end: 16,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 16
                                                    }
                                                }
                                            }
                                        ],
                                        start: 13,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 9,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    });

    pass(`({ get: 2 })`, {
            source: '({ get: 2 })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'get',
                                        start: 3,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 2,
                                        start: 8,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 9
                                            }
                                        },
                                        raw: '2'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 3,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
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
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });

    pass(`({ __proto__: 2 })`, {
            source: '({ __proto__: 2 })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 3,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 2,
                                        start: 14,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        },
                                        raw: '2'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 3,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        start: 0,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 18,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                }
            }
        });

    pass(`({"__proto__": 2 })`, {
            source: '({"__proto__": 2 })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [
                    {
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: '__proto__',
                            start: 2,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"__proto__"'
                        },
                        value: {
                            type: 'Literal',
                            value: 2,
                            start: 15,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            raw: '2'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 2,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    }
                ],
                start: 1,
                end: 18,
                loc: {
                    start: {
                        line: 1,
                        column: 1
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                }
            },
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
            }
        }
    ],
    sourceType: 'script',
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
    }
}
        });

    pass(`({a})`, {
            source: '({a})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                }
                            ],
                            start: 1,
                            end: 4,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 4
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

    pass(`({let})`, {
            source: '({let})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'let',
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
                                    value: {
                                        type: 'Identifier',
                                        name: 'let',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                }
                            ],
                            start: 1,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
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
                    }
                ],
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

    pass(`({ enum: 0 })`, {
            source: '({ enum: 0 })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'enum',
                                        start: 3,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 0,
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
                                        },
                                        raw: '0'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 3,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 13,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            }
        });

    pass(`({a, b: 0, c})`, {
            source: '({a, b: 0, c})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 0,
                                        start: 8,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 9
                                            }
                                        },
                                        raw: '0'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 5,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'c',
                                        start: 11,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'c',
                                        start: 11,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 11,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
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
                    }
                ],
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

    pass(`({a, b})`, {
            source: '({a, b})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
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
                    }
                ],
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

    pass(`({a(){}})`, {
            source: '({a(){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 5,
                                            end: 7,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 7
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 3,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 2,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
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
                    }
                ],
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

    pass(`({a(){let a;}})`, {
            source: '({a(){let a;}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            },
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 3,
                            end: 13,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 13
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 5,
                              end: 13,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 13
                                }
                              },
                              body: [
                                {
                                  type: 'VariableDeclaration',
                                  start: 6,
                                  end: 12,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 6
                                    },
                                    end: {
                                      line: 1,
                                      column: 12
                                    }
                                  },
                                  declarations: [
                                    {
                                      type: 'VariableDeclarator',
                                      start: 10,
                                      end: 11,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 10
                                        },
                                        end: {
                                          line: 1,
                                          column: 11
                                        }
                                      },
                                      id: {
                                        type: 'Identifier',
                                        start: 10,
                                        end: 11,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 10
                                          },
                                          end: {
                                            line: 1,
                                            column: 11
                                          }
                                        },
                                        name: 'a'
                                      },
                                      init: null
                                    }
                                  ],
                                  kind: 'let'
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({a(b){}})`, {
            source: '({a(b){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 9
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 8,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 8
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            },
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 3,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
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
                                },
                                name: 'b'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 6,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 8
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({a(b,...c){}})`, {
            source: '({a(b,...c){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            {
                                                type: 'RestElement',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'c',
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
                                                start: 6,
                                                end: 10,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 6
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 10
                                                    }
                                                }
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 11,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 11
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 3,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 2,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            }
        });

    pass(`({a(b,c){}})`, {
            source: '({a(b,c){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 11,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 11
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 10,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 10
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            },
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 3,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
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
                                },
                                name: 'b'
                              },
                              {
                                type: 'Identifier',
                                start: 6,
                                end: 7,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 6
                                  },
                                  end: {
                                    line: 1,
                                    column: 7
                                  }
                                },
                                name: 'c'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 8,
                              end: 10,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 8
                                },
                                end: {
                                  line: 1,
                                  column: 10
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({a(b,c){let d;}})`, {
            source: '({a(b,c){let d;}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            {
                                                type: 'Identifier',
                                                name: 'c',
                                                start: 6,
                                                end: 7,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 6
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 7
                                                    }
                                                }
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [
                                                        {
                                                            type: 'VariableDeclarator',
                                                            init: null,
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'd',
                                                                start: 13,
                                                                end: 14,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 13
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 14
                                                                    }
                                                                }
                                                            },
                                                            start: 13,
                                                            end: 14,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 13
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 14
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    kind: 'let',
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
                                                    }
                                                }
                                            ],
                                            start: 8,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 3,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 2,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        start: 0,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 18,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                }
            }
        });

    pass(`({set a(eval){}})`, {
            source: '({set a(eval){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 6,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'eval',
                                                start: 8,
                                                end: 12,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 8
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 12
                                                    }
                                                }
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 13,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 7,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    kind: 'set',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 2,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 16
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
                        }
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

    pass(`({ set a([{b = 0}]){}, })`, {
            source: '({ set a([{b = 0}]){}, })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 25,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 25
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 3,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 3
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 7,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            name: 'a'
                          },
                          kind: 'set',
                          value: {
                            type: 'FunctionExpression',
                            start: 8,
                            end: 21,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 21
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'ArrayPattern',
                                start: 9,
                                end: 18,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 9
                                  },
                                  end: {
                                    line: 1,
                                    column: 18
                                  }
                                },
                                elements: [
                                  {
                                    type: 'ObjectPattern',
                                    start: 10,
                                    end: 17,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 10
                                      },
                                      end: {
                                        line: 1,
                                        column: 17
                                      }
                                    },
                                    properties: [
                                      {
                                        type: 'Property',
                                        start: 11,
                                        end: 16,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 11
                                          },
                                          end: {
                                            line: 1,
                                            column: 16
                                          }
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                          type: 'Identifier',
                                          start: 11,
                                          end: 12,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 11
                                            },
                                            end: {
                                              line: 1,
                                              column: 12
                                            }
                                          },
                                          name: 'b'
                                        },
                                        kind: 'init',
                                        value: {
                                          type: 'AssignmentPattern',
                                          start: 11,
                                          end: 16,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 11
                                            },
                                            end: {
                                              line: 1,
                                              column: 16
                                            }
                                          },
                                          left: {
                                            type: 'Identifier',
                                            start: 11,
                                            end: 12,
                                            loc: {
                                              start: {
                                                line: 1,
                                                column: 11
                                              },
                                              end: {
                                                line: 1,
                                                column: 12
                                              }
                                            },
                                            name: 'b'
                                          },
                                          right: {
                                            type: 'Literal',
                                            start: 15,
                                            end: 16,
                                            loc: {
                                              start: {
                                                line: 1,
                                                column: 15
                                              },
                                              end: {
                                                line: 1,
                                                column: 16
                                              }
                                            },
                                            value: 0,
                                            raw: '0'
                                          }
                                        }
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 19,
                              end: 21,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 19
                                },
                                end: {
                                  line: 1,
                                  column: 21
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({ async })`, {
            source: '({ async })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'async',
                                        start: 3,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'async',
                                        start: 3,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 3,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        start: 0,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            }
        });

    pass(`({ async, await })`, {
            source: '({ async, await })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'async',
                                        start: 3,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'async',
                                        start: 3,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 3,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'await',
                                        start: 10,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'await',
                                        start: 10,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 10,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        start: 0,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 18,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                }
            }
        });

    pass(`({*a(){}})`, {
            source: '({*a(){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 9
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 8,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 8
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 3,
                            end: 4,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 4
                              }
                            },
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 4,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 4
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            id: null,
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 6,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 8
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({*yield(){}})`, {
            source: '({*yield(){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 12,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 12
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 3,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            name: 'yield'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 8,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            id: null,
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 10,
                              end: 12,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 10
                                },
                                end: {
                                  line: 1,
                                  column: 12
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({*[yield](){}})`, {
            source: '({*[yield](){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 14,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 14
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'Identifier',
                            start: 4,
                            end: 9,
                            loc: {
                              start: {
                                line: 1,
                                column: 4
                              },
                              end: {
                                line: 1,
                                column: 9
                              }
                            },
                            name: 'yield'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 10,
                            end: 14,
                            loc: {
                              start: {
                                line: 1,
                                column: 10
                              },
                              end: {
                                line: 1,
                                column: 14
                              }
                            },
                            id: null,
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({0x0:0})`, {
            source: '({0x0:0})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 8,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 8
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 7,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 7
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
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
                            },
                            value: 0,
                            raw: '0x0'
                          },
                          value: {
                            type: 'Literal',
                            start: 6,
                            end: 7,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 7
                              }
                            },
                            value: 0,
                            raw: '0'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({2e308:0})`, {
            source: '({2e308:0})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 10,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 10
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 9,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 9
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
                            start: 2,
                            end: 7,
                            loc: {
                              start: {
                                line: 1,
                                column: 2
                              },
                              end: {
                                line: 1,
                                column: 7
                              }
                            },
                            value: Infinity,
                            raw: '2e308'
                          },
                          value: {
                            type: 'Literal',
                            start: 8,
                            end: 9,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 9
                              }
                            },
                            value: 0,
                            raw: '0'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({get b() {}})`, {
            source: '({get b() {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 12,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 12
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 6,
                            end: 7,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 7
                              }
                            },
                            name: 'b'
                          },
                          kind: 'get',
                          value: {
                            type: 'FunctionExpression',
                            start: 7,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 10,
                              end: 12,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 10
                                },
                                end: {
                                  line: 1,
                                  column: 12
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({set c(x) {}})`, {
            source: '({set c(x) {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 6,
                            end: 7,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 7
                              }
                            },
                            name: 'c'
                          },
                          kind: 'set',
                          value: {
                            type: 'FunctionExpression',
                            start: 7,
                            end: 13,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 13
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
                                start: 8,
                                end: 9,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 8
                                  },
                                  end: {
                                    line: 1,
                                    column: 9
                                  }
                                },
                                name: 'x'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 11,
                              end: 13,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 11
                                },
                                end: {
                                  line: 1,
                                  column: 13
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({__proto__:0})`, {
            source: '({__proto__:0})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 2,
                            end: 11,
                            loc: {
                              start: {
                                line: 1,
                                column: 2
                              },
                              end: {
                                line: 1,
                                column: 11
                              }
                            },
                            name: '__proto__'
                          },
                          value: {
                            type: 'Literal',
                            start: 12,
                            end: 13,
                            loc: {
                              start: {
                                line: 1,
                                column: 12
                              },
                              end: {
                                line: 1,
                                column: 13
                              }
                            },
                            value: 0,
                            raw: '0'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({get __proto__() {}})`, {
            source: '({get __proto__() {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 21,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 21
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 6,
                            end: 15,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 15
                              }
                            },
                            name: '__proto__'
                          },
                          kind: 'get',
                          value: {
                            type: 'FunctionExpression',
                            start: 15,
                            end: 20,
                            loc: {
                              start: {
                                line: 1,
                                column: 15
                              },
                              end: {
                                line: 1,
                                column: 20
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 18,
                              end: 20,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 18
                                },
                                end: {
                                  line: 1,
                                  column: 20
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({set __proto__(x) {}})`, {
            source: '({set __proto__(x) {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 6,
                            end: 15,
                            loc: {
                              start: {
                                line: 1,
                                column: 6
                              },
                              end: {
                                line: 1,
                                column: 15
                              }
                            },
                            name: '__proto__'
                          },
                          kind: 'set',
                          value: {
                            type: 'FunctionExpression',
                            start: 15,
                            end: 21,
                            loc: {
                              start: {
                                line: 1,
                                column: 15
                              },
                              end: {
                                line: 1,
                                column: 21
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
                                start: 16,
                                end: 17,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 16
                                  },
                                  end: {
                                    line: 1,
                                    column: 17
                                  }
                                },
                                name: 'x'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 19,
                              end: 21,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 19
                                },
                                end: {
                                  line: 1,
                                  column: 21
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({["nUmBeR"+9]:"nein"})`, {
            source: '({["nUmBeR"+9]:"nein"})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 3,
                            end: 13,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 13
                              }
                            },
                            left: {
                              type: 'Literal',
                              start: 3,
                              end: 11,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 3
                                },
                                end: {
                                  line: 1,
                                  column: 11
                                }
                              },
                              value: 'nUmBeR',
                              raw: '"nUmBeR"'
                            },
                            operator: '+',
                            right: {
                              type: 'Literal',
                              start: 12,
                              end: 13,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 12
                                },
                                end: {
                                  line: 1,
                                  column: 13
                                }
                              },
                              value: 9,
                              raw: '9'
                            }
                          },
                          value: {
                            type: 'Literal',
                            start: 15,
                            end: 21,
                            loc: {
                              start: {
                                line: 1,
                                column: 15
                              },
                              end: {
                                line: 1,
                                column: 21
                              }
                            },
                            value: 'nein',
                            raw: '"nein"'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({[2*308]:0})`, {
            source: '({[2*308]:0})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 11,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 11
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 3,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            left: {
                              type: 'Literal',
                              start: 3,
                              end: 4,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 3
                                },
                                end: {
                                  line: 1,
                                  column: 4
                                }
                              },
                              value: 2,
                              raw: '2'
                            },
                            operator: '*',
                            right: {
                              type: 'Literal',
                              start: 5,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 8
                                }
                              },
                              value: 308,
                              raw: '308'
                            }
                          },
                          value: {
                            type: 'Literal',
                            start: 10,
                            end: 11,
                            loc: {
                              start: {
                                line: 1,
                                column: 10
                              },
                              end: {
                                line: 1,
                                column: 11
                              }
                            },
                            value: 0,
                            raw: '0'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({get [6+3]() {}, set [5/4](x) {}})`, {
            source: '({get [6+3]() {}, set [5/4](x) {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 16,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 16
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 7,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            left: {
                              type: 'Literal',
                              start: 7,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 7
                                },
                                end: {
                                  line: 1,
                                  column: 8
                                }
                              },
                              value: 6,
                              raw: '6'
                            },
                            operator: '+',
                            right: {
                              type: 'Literal',
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
                              },
                              value: 3,
                              raw: '3'
                            }
                          },
                          kind: 'get',
                          value: {
                            type: 'FunctionExpression',
                            start: 11,
                            end: 16,
                            loc: {
                              start: {
                                line: 1,
                                column: 11
                              },
                              end: {
                                line: 1,
                                column: 16
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 14,
                              end: 16,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 14
                                },
                                end: {
                                  line: 1,
                                  column: 16
                                }
                              },
                              body: []
                            }
                          }
                        },
                        {
                          type: 'Property',
                          start: 18,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 18
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 23,
                            end: 26,
                            loc: {
                              start: {
                                line: 1,
                                column: 23
                              },
                              end: {
                                line: 1,
                                column: 26
                              }
                            },
                            left: {
                              type: 'Literal',
                              start: 23,
                              end: 24,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 23
                                },
                                end: {
                                  line: 1,
                                  column: 24
                                }
                              },
                              value: 5,
                              raw: '5'
                            },
                            operator: '/',
                            right: {
                              type: 'Literal',
                              start: 25,
                              end: 26,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 25
                                },
                                end: {
                                  line: 1,
                                  column: 26
                                }
                              },
                              value: 4,
                              raw: '4'
                            }
                          },
                          kind: 'set',
                          value: {
                            type: 'FunctionExpression',
                            start: 27,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
                                start: 28,
                                end: 29,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 29
                                  }
                                },
                                name: 'x'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 31,
                              end: 33,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 31
                                },
                                end: {
                                  line: 1,
                                  column: 33
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({[6+3]() {}})`, {
            source: '({[6+3]() {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 12,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 12
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 3,
                            end: 6,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 6
                              }
                            },
                            left: {
                              type: 'Literal',
                              start: 3,
                              end: 4,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 3
                                },
                                end: {
                                  line: 1,
                                  column: 4
                                }
                              },
                              value: 6,
                              raw: '6'
                            },
                            operator: '+',
                            right: {
                              type: 'Literal',
                              start: 5,
                              end: 6,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 5
                                },
                                end: {
                                  line: 1,
                                  column: 6
                                }
                              },
                              value: 3,
                              raw: '3'
                            }
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 7,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 10,
                              end: 12,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 10
                                },
                                end: {
                                  line: 1,
                                  column: 12
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({3() {}})`, {
            source: '({3() {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 9
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 8,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 8
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
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
                            },
                            value: 3,
                            raw: '3'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 3,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 6,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 8
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({"moo"() {}})`, {
            source: '({"moo"() {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 12,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 12
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
                            start: 2,
                            end: 7,
                            loc: {
                              start: {
                                line: 1,
                                column: 2
                              },
                              end: {
                                line: 1,
                                column: 7
                              }
                            },
                            value: 'moo',
                            raw: '"moo"'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 7,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 10,
                              end: 12,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 10
                                },
                                end: {
                                  line: 1,
                                  column: 12
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`x = { y, z }`, {
            source: 'x = { y, z }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
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
                            operator: '=',
                            right: {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 6,
                                            end: 7,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 7
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 6,
                                            end: 7,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 7
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: true,
                                        start: 6,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        value: {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: true,
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
                                    }
                                ],
                                start: 4,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            },
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
                            }
                        },
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
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });

    pass(`({ __proto__: null, get __proto__(){} })`, {
            source: '({ __proto__: null, get __proto__(){} })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 3,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: null,
                                        start: 14,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        },
                                        raw: 'null'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 3,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 24,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 35,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 35
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 33,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 37
                                            }
                                        }
                                    },
                                    kind: 'get',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 20,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 39,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        },
                        start: 0,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 40,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 40
                    }
                }
            }
        });

    pass(`({__proto__ = 0, __proto__ = 0} = {})`, {
            source: '({__proto__ = 0, __proto__ = 0} = {})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: '__proto__',
                                            start: 2,
                                            end: 11,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 2
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 11
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: '__proto__',
                                                start: 2,
                                                end: 11,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 2
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 11
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 0,
                                                start: 14,
                                                end: 15,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 15
                                                    }
                                                },
                                                raw: '0'
                                            },
                                            start: 2,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 2
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: true,
                                        start: 2,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: '__proto__',
                                            start: 17,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: '__proto__',
                                                start: 17,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 0,
                                                start: 29,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                },
                                                raw: '0'
                                            },
                                            start: 17,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: true,
                                        start: 17,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    }
                                ],
                                start: 1,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            operator: '=',
                            right: {
                                type: 'ObjectExpression',
                                properties: [],
                                start: 34,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 34
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            start: 1,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        },
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
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });

    pass(`({ __proto__, "__proto__": null })`, {
            source: '({ __proto__, "__proto__": null })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 3,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 3,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 3,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Literal',
                                        value: '__proto__',
                                        start: 14,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        },
                                        raw: '"__proto__"'
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: null,
                                        start: 27,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        },
                                        raw: 'null'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 14,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        },
                        start: 0,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 34,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 34
                    }
                }
            }
        });

    pass(`x = { get() { } }`, {
            source: 'x = { get() { } }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
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
                            operator: '=',
                            right: {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'get',
                                            start: 6,
                                            end: 9,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 9
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 12,
                                                end: 15,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
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
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 6,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    }
                                ],
                                start: 4,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
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
                        }
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

    pass(`x = { method() { } }`, {
            source: 'x = { method() { } }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
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
                            operator: '=',
                            right: {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'method',
                                            start: 6,
                                            end: 12,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 12
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 15,
                                                end: 18,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 18
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 12,
                                            end: 18,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 18
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 6,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    }
                                ],
                                start: 4,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            start: 0,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        start: 0,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                }
            }
        });

    pass(`({"esprima"(sucks, big, time) {}})`, {
            source: '({"esprima"(sucks, big, time) {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
                            start: 2,
                            end: 11,
                            loc: {
                              start: {
                                line: 1,
                                column: 2
                              },
                              end: {
                                line: 1,
                                column: 11
                              }
                            },
                            value: 'esprima',
                            raw: '"esprima"'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 11,
                            end: 32,
                            loc: {
                              start: {
                                line: 1,
                                column: 11
                              },
                              end: {
                                line: 1,
                                column: 32
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
                                start: 12,
                                end: 17,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 12
                                  },
                                  end: {
                                    line: 1,
                                    column: 17
                                  }
                                },
                                name: 'sucks'
                              },
                              {
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
                                name: 'big'
                              },
                              {
                                type: 'Identifier',
                                start: 24,
                                end: 28,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 24
                                  },
                                  end: {
                                    line: 1,
                                    column: 28
                                  }
                                },
                                name: 'time'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 30,
                              end: 32,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 30
                                },
                                end: {
                                  line: 1,
                                  column: 32
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`"use strict";

        var x = {
            baz(a = 10) {},
            foo(a, b = 10) {},
            toast(a, b = 10, c) {}
        };`, {
            source: `"use strict";

            var x = {
                baz(a = 10) {},
                foo(a, b = 10) {},
                toast(a, b = 10, c) {}
            };`,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            raw: '"use strict"'
                        },
                        directive: 'use strict'
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'baz'
                                            },
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [
                                                    {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'a'
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            value: 10,
                                                            raw: '10'
                                                        }
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: []
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: true,
                                            shorthand: false
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'foo'
                                            },
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a'
                                                    },
                                                    {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'b'
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            value: 10,
                                                            raw: '10'
                                                        }
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: []
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: true,
                                            shorthand: false
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'toast'
                                            },
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a'
                                                    },
                                                    {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'b'
                                                        },
                                                        right: {
                                                            type: 'Literal',
                                                            value: 10,
                                                            raw: '10'
                                                        }
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'c'
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: []
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: true,
                                            shorthand: false
                                        }
                                    ]
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'x'
                                }
                            }
                        ],
                        kind: 'var'
                    }
                ],
                sourceType: 'script'
            }
        });

    pass(`var foo,
        get,
        set;

    var x = {
        foo,
        get,
        set
    };`, {
            source: `var foo,
            get,
            set;

        var x = {
            foo,
            get,
            set
        };`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 4,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                },
                                start: 4,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'get',
                                    start: 21,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 12
                                        },
                                        end: {
                                            line: 2,
                                            column: 15
                                        }
                                    }
                                },
                                start: 21,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 2,
                                        column: 15
                                    }
                                }
                            },
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'set',
                                    start: 38,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 12
                                        },
                                        end: {
                                            line: 3,
                                            column: 15
                                        }
                                    }
                                },
                                start: 38,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 12
                                    },
                                    end: {
                                        line: 3,
                                        column: 15
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 0,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 3,
                                column: 16
                            }
                        }
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'foo',
                                                start: 74,
                                                end: 77,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'foo',
                                                start: 74,
                                                end: 77,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
                                            start: 74,
                                            end: 77,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 15
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'get',
                                                start: 91,
                                                end: 94,
                                                loc: {
                                                    start: {
                                                        line: 7,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 7,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'get',
                                                start: 91,
                                                end: 94,
                                                loc: {
                                                    start: {
                                                        line: 7,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 7,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
                                            start: 91,
                                            end: 94,
                                            loc: {
                                                start: {
                                                    line: 7,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 7,
                                                    column: 15
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'set',
                                                start: 108,
                                                end: 111,
                                                loc: {
                                                    start: {
                                                        line: 8,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'set',
                                                start: 108,
                                                end: 111,
                                                loc: {
                                                    start: {
                                                        line: 8,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
                                            start: 108,
                                            end: 111,
                                            loc: {
                                                start: {
                                                    line: 8,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 8,
                                                    column: 15
                                                }
                                            }
                                        }
                                    ],
                                    start: 60,
                                    end: 121,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 16
                                        },
                                        end: {
                                            line: 9,
                                            column: 9
                                        }
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 56,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 12
                                        },
                                        end: {
                                            line: 5,
                                            column: 13
                                        }
                                    }
                                },
                                start: 56,
                                end: 121,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 12
                                    },
                                    end: {
                                        line: 9,
                                        column: 9
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 52,
                        end: 122,
                        loc: {
                            start: {
                                line: 5,
                                column: 8
                            },
                            end: {
                                line: 9,
                                column: 10
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 122,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 9,
                        column: 10
                    }
                }
            }
        });

    pass(`var x = { ["hey"]: foo  };`, {
            source: 'var x = { ["hey"]: foo  };',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Literal',
                                                value: 'hey',
                                                start: 11,
                                                end: 16,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 11
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 16
                                                    }
                                                },
                                                raw: '"hey"'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'foo',
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
                                                }
                                            },
                                            kind: 'init',
                                            computed: true,
                                            method: false,
                                            shorthand: false,
                                            start: 10,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            }
                                        }
                                    ],
                                    start: 8,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                start: 4,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 0,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 26,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 26
                    }
                }
            }
        });

    pass(`({[x]: 10});`, {
            source: '({[x]: 10});',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 3,
                                        end: 4,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 4
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 10,
                                        start: 7,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 9
                                            }
                                        },
                                        raw: '10'
                                    },
                                    kind: 'init',
                                    computed: true,
                                    method: false,
                                    shorthand: false,
                                    start: 2,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
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
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });

    pass(`"use strict";

        var proto = {};

        var x = {
            ["__proto__"]: proto,
            ["__proto__"]: proto,
            ["__" + "proto" + "__"]: proto
        };`, {
            source: `"use strict";

            var proto = {};

            var x = {
                ["__proto__"]: proto,
                ["__proto__"]: proto,
                ["__" + "proto" + "__"]: proto
            };`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
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
                        directive: 'use strict',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [],
                                    start: 39,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 24
                                        },
                                        end: {
                                            line: 3,
                                            column: 26
                                        }
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'proto',
                                    start: 31,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 16
                                        },
                                        end: {
                                            line: 3,
                                            column: 21
                                        }
                                    }
                                },
                                start: 31,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 16
                                    },
                                    end: {
                                        line: 3,
                                        column: 26
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 27,
                        end: 42,
                        loc: {
                            start: {
                                line: 3,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 27
                            }
                        }
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Literal',
                                                value: '__proto__',
                                                start: 83,
                                                end: 94,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 28
                                                    }
                                                },
                                                raw: '"__proto__"'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'proto',
                                                start: 97,
                                                end: 102,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 36
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: true,
                                            method: false,
                                            shorthand: false,
                                            start: 82,
                                            end: 102,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 36
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Literal',
                                                value: '__proto__',
                                                start: 121,
                                                end: 132,
                                                loc: {
                                                    start: {
                                                        line: 7,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 7,
                                                        column: 28
                                                    }
                                                },
                                                raw: '"__proto__"'
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'proto',
                                                start: 135,
                                                end: 140,
                                                loc: {
                                                    start: {
                                                        line: 7,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 7,
                                                        column: 36
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: true,
                                            method: false,
                                            shorthand: false,
                                            start: 120,
                                            end: 140,
                                            loc: {
                                                start: {
                                                    line: 7,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 7,
                                                    column: 36
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'Literal',
                                                        value: '__',
                                                        start: 159,
                                                        end: 163,
                                                        loc: {
                                                            start: {
                                                                line: 8,
                                                                column: 17
                                                            },
                                                            end: {
                                                                line: 8,
                                                                column: 21
                                                            }
                                                        },
                                                        raw: '"__"'
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 'proto',
                                                        start: 166,
                                                        end: 173,
                                                        loc: {
                                                            start: {
                                                                line: 8,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 8,
                                                                column: 31
                                                            }
                                                        },
                                                        raw: '"proto"'
                                                    },
                                                    operator: '+',
                                                    start: 159,
                                                    end: 173,
                                                    loc: {
                                                        start: {
                                                            line: 8,
                                                            column: 17
                                                        },
                                                        end: {
                                                            line: 8,
                                                            column: 31
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: '__',
                                                    start: 176,
                                                    end: 180,
                                                    loc: {
                                                        start: {
                                                            line: 8,
                                                            column: 34
                                                        },
                                                        end: {
                                                            line: 8,
                                                            column: 38
                                                        }
                                                    },
                                                    raw: '"__"'
                                                },
                                                operator: '+',
                                                start: 159,
                                                end: 180,
                                                loc: {
                                                    start: {
                                                        line: 8,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 38
                                                    }
                                                }
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'proto',
                                                start: 183,
                                                end: 188,
                                                loc: {
                                                    start: {
                                                        line: 8,
                                                        column: 41
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 46
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: true,
                                            method: false,
                                            shorthand: false,
                                            start: 158,
                                            end: 188,
                                            loc: {
                                                start: {
                                                    line: 8,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 8,
                                                    column: 46
                                                }
                                            }
                                        }
                                    ],
                                    start: 64,
                                    end: 202,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 20
                                        },
                                        end: {
                                            line: 9,
                                            column: 13
                                        }
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 60,
                                    end: 61,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 16
                                        },
                                        end: {
                                            line: 5,
                                            column: 17
                                        }
                                    }
                                },
                                start: 60,
                                end: 202,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 16
                                    },
                                    end: {
                                        line: 9,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 56,
                        end: 203,
                        loc: {
                            start: {
                                line: 5,
                                column: 12
                            },
                            end: {
                                line: 9,
                                column: 14
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 203,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 9,
                        column: 14
                    }
                }
            }
        });

    fail(`({[1,2]:3})`, {
            source: '({[1,2]:3})',
        });

    fail(`({ *a })`, {
            source: '({ *a })',
        });

    fail(`({ *a: 0 })`, {
            source: '({ *a: 0 })',
        });

    fail(`({ *[0]: 0 })`, {
            source: '({ *[0]: 0 })',
        });

    fail(`x = { get y(z) {} }`, {
            source: 'x = { get y(z) {} }',
        });

    fail(`x = { set y() {} }`, {
            source: 'x = { set y() {} }',
        });

    fail(`x = { set y(a, b) {} }`, {
            source: 'x = { set y(a, b) {} }',
        });

    fail(`({ *method(x = yield) {} });`, {
            source: '({ *method(x = yield) {} });',
        });

    fail(`({ *[0]: 0 })`, {
            source: '({ *[0]: 0 })',
        });

    fail(`({ g\\u0065t m() {} });`, {
            source: '({ g\\u0065t m() {} });',
        });

    fail(`({ __proto__: null, __proto__: null })`, {
            source: '({ __proto__: null, __proto__: null })',
        });

    fail(`({ "__proto__": null, '__proto__': null })`, {
            source: '({ "__proto__": null, "__proto__": null })',
        });

    fail(`var x = { this };`, {
            source: 'var x = { this };',
        });

    fail(`({[x]});`, {
            source: '({[x]});',
        });

    fail(`var x = { [bar] };`, {
            source: 'var x = { [bar] };',
        });

});