import { pass, fail } from '../test-utils';

describe('Statements - For', () => {

    // Esprima issue #1052
    fail(`for(;;){ a: continue a; }`, {
        source: 'for(;;){ a: continue a; }',
        message: 'continue  statement must be nested within an iteration statement',
        line: 1,
        column: 11,
        index: 11
    });
    fail(`for (const x; false; ) { var x; }`, {
        source: 'for (const x; false; ) { var x; }',
        message: 'Missing initializer in const declaration',
        line: 1,
        column: 12,
        index: 12
    });

    fail(`for ( ; false; ) async function* g() {}`, {
        source: 'for ( ; false; ) async function* g() {}',
        message: 'Async functions can only be declared at the top level or inside a block',
        line: 1,
        column: 16,
        index: 16
    });

    fail('"use strict";  for ({ eval } of [{}]) ;', {
        source: '"use strict";  for ({ eval } of [{}]) ;',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
        column: 26,
        index: 26
    });

    fail('"use strict";  for ({ x: x = yield } of [{}]) ;', {
        source: '"use strict";  for ({ x: x = yield } of [{}]) ;',
        message:  'Unexpected strict mode reserved word',
        line: 1,
        column: 28,
        index: 28
    });

    fail('"use strict"; for ([...{ x = yield }] of [[{}]]) ;', {
        source: '"use strict";  for ([...{ x = yield }] of [[{}]]) ;',
        message: 'Unexpected strict mode reserved word',
        line: 1,
        column: 29,
        index: 29
    });

    fail(`for(let a, let;;);`, {
        source: 'for(let a, let;;);',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 10,
        index: 10
    });

    fail(`for(const let = 0;;);`, {
        source: 'for(const let = 0;;);',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`for(const a = 0, let = 1;;);`, {
        source: 'for(const a = 0, let = 1;;);',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`for(let [let] = 0;;);`, {
        source: 'for(let [let] = 0;;);',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`for (let {a: b = let};;) {}`, {
        source: 'for (let {a: b = let};;) {}',
        message: 'Missing initializer in destructuring declaration',
        line: 1,
        column: 21,
        index: 21
    });

    fail(`for (let [a = let];;) {}`, {
        source: 'for (let [a = let];;) {}',
        message: 'Missing initializer in destructuring declaration',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`"use strict"; for (let [a = let];;) {}`, {
        source: '"use strict"; for (let [a = let];;) {}', // Unexpected strict mode reserved word
        message: 'The identifier \'let\' must not be in expression position in strict mode',
        line: 1,
        column: 27,
        index: 27
    });

    fail(`"use strict"; for (let {a: b = let};;) {}`, {
        source: '"use strict"; for (let {a: b = let};;) {}', // Unexpected strict mode reserved word
        message: 'The identifier \'let\' must not be in expression position in strict mode',
        line: 1,
        column: 30,
        index: 30
    });

    fail(`for(let [let];;);`, {
        source: 'for(let [let];;);',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`for(let [a, a];;)`, {
        source: 'for(let [a, a];;)',
        message:  'Missing initializer in destructuring declaration',
        line: 1,
        column: 14,
        index: 14
    });

    pass(`for(x, y;;);`, {
        source: 'for(x, y;;);',
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
                type: 'ForStatement',
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
                init: {
                  type: 'SequenceExpression',
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
                  expressions: [
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
                      name: 'x'
                    },
                    {
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
                      name: 'y'
                    }
                  ]
                },
                test: null,
                update: null,
                body: {
                  type: 'EmptyStatement',
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
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`for (let x = let;;) {}`, {
        source: 'for (let x = let;;) {}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 20,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Identifier',
                                    name: 'let',
                                    start: 13,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                id: {
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
                                start: 9,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 5,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    },
                    test: null,
                    update: null,
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

    pass(`for(a,b,c;;);`, {
        source: 'for(a,b,c;;);',
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
                type: 'ForStatement',
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
                init: {
                  type: 'SequenceExpression',
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
                  expressions: [
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
                      name: 'a'
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
                      name: 'b'
                    },
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
                      name: 'c'
                    }
                  ]
                },
                test: null,
                update: null,
                body: {
                  type: 'EmptyStatement',
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
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`for(x = 0;;);`, {
        source: 'for(x = 0;;);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                        }
                    },
                    init: {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
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
                        }
                    },
                    test: null,
                    update: null,
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

    pass(`for (var {a} of /b/) {}`, {
        source: 'for (var {a} of /b/) {}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 21,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    left: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            },
                                            method: false,
                                            shorthand: true,
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
                                    start: 9,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                start: 9,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 5,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    right: {
                        type: 'Literal',
                        value: {},
                        regex: {
                            pattern: 'b',
                            flags: ''
                        },
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
                        raw: '/b/'
                    },
                    await: false,
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
                    }
                }
            ],
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
            }
        }
    });

    pass(`for (let {a} of /b/) {}`, {
        source: 'for (let {a} of /b/) {}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 21,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    left: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            },
                                            method: false,
                                            shorthand: true,
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
                                    start: 9,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                start: 9,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 5,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    right: {
                        type: 'Literal',
                        value: {},
                        regex: {
                            pattern: 'b',
                            flags: ''
                        },
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
                        raw: '/b/'
                    },
                    await: false,
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
                    }
                }
            ],
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
            }
        }
    });

    pass(`for(var x = 0;;);`, {
        source: 'for(var x = 0;;);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                    }
                                },
                                start: 8,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 4,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    test: null,
                    update: null,
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

    pass(`for(let x = 0;;);`, {
        source: 'for(let x = 0;;);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                    }
                                },
                                start: 8,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 4,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    test: null,
                    update: null,
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

    pass(`for(var x = 0, y = 1;;);`, {
        source: 'for(var x = 0, y = 1;;);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                    }
                                },
                                start: 8,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            },
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 1,
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
                                    },
                                    raw: '1'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                }
                            }
                        ],
                        kind: 'var',
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
                    test: null,
                    update: null,
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

    pass(`for(x; x < 0;);`, {
        source: 'for(x; x < 0;);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    },
                    init: {
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
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        right: {
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
                        operator: '<',
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
                    update: null,
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

    pass(`for(x; x < 0; x++);`, {
        source: 'for(x; x < 0; x++);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    init: {
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
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        right: {
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
                        operator: '<',
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
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'x',
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
                        },
                        operator: '++',
                        prefix: false,
                        start: 14,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 17
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

    pass(`for(x; x < 0; x++) process(x);`, {
        source: 'for(x; x < 0; x++) process(x);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'process',
                                start: 19,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            },
                            arguments: [
                                {
                                    type: 'Identifier',
                                    name: 'x',
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
                                    }
                                }
                            ],
                            start: 19,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        start: 19,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    init: {
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
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        right: {
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
                        operator: '<',
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
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'x',
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
                        },
                        operator: '++',
                        prefix: false,
                        start: 14,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 17
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

    pass(`for(a;b;c);`, {
        source: 'for(a;b;c);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    },
                    init: {
                        type: 'Identifier',
                        name: 'a',
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
                    test: {
                        type: 'Identifier',
                        name: 'b',
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
                    update: {
                        type: 'Identifier',
                        name: 'c',
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

    pass(`for(var a;b;c);`, {
        source: 'for(var a;b;c);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                    }
                                },
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
                                }
                            }
                        ],
                        kind: 'var',
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
                        }
                    },
                    test: {
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
                    },
                    update: {
                        type: 'Identifier',
                        name: 'c',
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

    pass(`for(var a = 0;b;c);`, {
        source: 'for(var a = 0;b;c);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                    }
                                },
                                start: 8,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 4,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    test: {
                        type: 'Identifier',
                        name: 'b',
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
                    },
                    update: {
                        type: 'Identifier',
                        name: 'c',
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

    pass(`for (let [a = b] of [0, c = 0]);`, {
        source: `for (let [a = b] of [0, c = 0]);`,
        raw: true,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    left: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            },
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
                                    start: 9,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                start: 9,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 5,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                value: 0,
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
                                },
                                raw: '0'
                            },
                            {
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'c',
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
                                    }
                                },
                                operator: '=',
                                right: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                start: 24,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                }
                            }
                        ],
                        start: 20,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    await: false,
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

    pass(`for (; false; ) let // ASI
    x = 1;`, {
        source: `for (; false; ) let // ASI
        x = 1;`,
        raw: true,
        expected: {
              body: [
                {
                  body: {
                    expression: {
                      name: 'let',
                      type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                  },
                  init: null,
                  test: {
                    raw: 'false',
                   type: 'Literal',
                    value: false,
                  },
                  type: 'ForStatement',
                  update: null,
                },
                {
                  expression: {
                    left: {
                      name: 'x',
                      type: 'Identifier'
                    },
                   operator: '=',
                    right: {
                      raw: '1',
                      type: 'Literal',
                      value: 1,
                    },
                    type: 'AssignmentExpression'
                  },
                  type: 'ExpressionStatement'
                }
             ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`for(var a = 0;;) { let a; }`, {
        source: 'for(var a = 0;;) { let a; }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
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
                                            name: 'a',
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
                                            }
                                        },
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
                                        }
                                    }
                                ],
                                kind: 'let',
                                start: 19,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                    }
                                },
                                start: 8,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 4,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    test: null,
                    update: null,
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 27,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 27
                }
            }
        }
    });

    pass(`for(;b;c);`, {
        source: 'for(;b;c);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    init: null,
                    test: {
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
                    update: {
                        type: 'Identifier',
                        name: 'c',
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`for(let of;;);`, {
        source: 'for(let of;;);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'of',
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
                                    }
                                },
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
                                }
                            }
                        ],
                        kind: 'let',
                        start: 4,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    test: null,
                    update: null,
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

    pass(`for (const {...x} = { get v() { count++;  } }; a < 1; ) { }`, {
        source: 'for (const {...x} = { get v() { count++;  } }; a < 1; ) { }',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    init: {
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
                                                name: 'v',
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
                                                type: 'FunctionExpression',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'UpdateExpression',
                                                                argument: {
                                                                    type: 'Identifier',
                                                                    name: 'count',
                                                                    start: 32,
                                                                    end: 37,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 32
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 37
                                                                        }
                                                                    }
                                                                },
                                                                operator: '++',
                                                                prefix: false,
                                                                start: 32,
                                                                end: 39,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 32
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 39
                                                                    }
                                                                }
                                                            },
                                                            start: 32,
                                                            end: 40,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 32
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 40
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 30,
                                                    end: 43,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 43
                                                        }
                                                    }
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 27,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 43
                                                    }
                                                }
                                            },
                                            kind: 'get',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
                                            start: 22,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            }
                                        }
                                    ],
                                    start: 20,
                                    end: 45,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 45
                                        }
                                    }
                                },
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'RestElement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                            start: 12,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16
                                                }
                                            }
                                        }
                                    ],
                                    start: 11,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                start: 11,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            }
                        ],
                        kind: 'const',
                        start: 5,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'a',
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
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 1,
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
                            },
                            raw: '1'
                        },
                        operator: '<',
                        start: 47,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 47
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    },
                    update: null,
                    start: 0,
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 59
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 59,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 59
                }
            }
        }
    });

    pass(`for (() => { this in null };;);`, {
        source: 'for (() => { this in null };;);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                        }
                    },
                    init: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'ThisExpression',
                                            start: 13,
                                            end: 17,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 17
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: null,
                                            start: 21,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            },
                                            raw: 'null'
                                        },
                                        operator: 'in',
                                        start: 13,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        }
                                    },
                                    start: 13,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                }
                            ],
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
                        },
                        params: [],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 5,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    },
                    test: null,
                    update: null,
                    start: 0,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 31,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 31
                }
            }
        }
    });

    pass(`for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]; i < 1; ) {}`, {
        source: 'for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]; i < 1; ) {}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 89,
                        end: 91,
                        loc: {
                            start: {
                                line: 1,
                                column: 89
                            },
                            end: {
                                line: 1,
                                column: 91
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
                                            type: 'ObjectExpression',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                        value: 11,
                                                        start: 59,
                                                        end: 61,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 59
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 61
                                                            }
                                                        },
                                                        raw: '11'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 56,
                                                    end: 61,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 56
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 61
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 22,
                                                        start: 66,
                                                        end: 68,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 66
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 68
                                                            }
                                                        },
                                                        raw: '22'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 63,
                                                    end: 68,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 63
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 68
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'z',
                                                        start: 70,
                                                        end: 71,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 70
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 71
                                                            }
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 33,
                                                        start: 73,
                                                        end: 75,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 73
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 75
                                                            }
                                                        },
                                                        raw: '33'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 70,
                                                    end: 75,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 70
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 75
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 54,
                                            end: 77,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 54
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 77
                                                }
                                            }
                                        }
                                    ],
                                    start: 53,
                                    end: 78,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 53
                                        },
                                        end: {
                                            line: 1,
                                            column: 78
                                        }
                                    }
                                },
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                        },
                                                        method: false,
                                                        shorthand: true,
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
                                                    },
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                            }
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: true,
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
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        method: false,
                                                        shorthand: true,
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
                                                    }
                                                ],
                                                start: 12,
                                                end: 23,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 23
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'ObjectExpression',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                            }
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            value: 44,
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
                                                            raw: '44'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 28,
                                                        end: 33,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 28
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 33
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
                                                            start: 35,
                                                            end: 36,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 35
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 36
                                                                }
                                                            }
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            value: 55,
                                                            start: 38,
                                                            end: 40,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 38
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 40
                                                                }
                                                            },
                                                            raw: '55'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 35,
                                                        end: 40,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 35
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 40
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
                                                            start: 42,
                                                            end: 43,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 42
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 43
                                                                }
                                                            }
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            value: 66,
                                                            start: 45,
                                                            end: 47,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 45
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 47
                                                                }
                                                            },
                                                            raw: '66'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 42,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 42
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 26,
                                                end: 49,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 49
                                                    }
                                                }
                                            },
                                            start: 12,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            }
                                        }
                                    ],
                                    start: 11,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                },
                                start: 11,
                                end: 78,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 78
                                    }
                                }
                            }
                        ],
                        kind: 'const',
                        start: 5,
                        end: 78,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 78
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'i',
                            start: 80,
                            end: 81,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 80
                                },
                                end: {
                                    line: 1,
                                    column: 81
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 1,
                            start: 84,
                            end: 85,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 84
                                },
                                end: {
                                    line: 1,
                                    column: 85
                                }
                            },
                            raw: '1'
                        },
                        operator: '<',
                        start: 80,
                        end: 85,
                        loc: {
                            start: {
                                line: 1,
                                column: 80
                            },
                            end: {
                                line: 1,
                                column: 85
                            }
                        }
                    },
                    update: null,
                    start: 0,
                    end: 91,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 91
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 91,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 91
                }
            }
        }
    });

    pass(`for (x in null, { key: 0 }) { }`, {
        source: `for (x in null, { key: 0 }) { }`,
        raw: true,
        expected: {
              body: [
                {
                  body: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  left: {
                    name: 'x',
                    type: 'Identifier'
                  },
                  right: {
                    expressions: [
                      {
                        raw: 'null',
                        type: 'Literal',
                        value: null,
                      },
                      {
                        properties: [
                          {
                            computed: false,
                            key: {
                              name: 'key',
                              type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: false,
                           type: 'Property',
                            value: {
                              raw: '0',
                              type: 'Literal',
                              value: 0
                            }
                          }
                        ],
                        type: 'ObjectExpression'
                      }
                    ],
                    type: 'SequenceExpression'
                  },
                  type: 'ForInStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`for (let x in null, { key: 0 }) {}`, {
        source: `for (let x in null, { key: 0 }) {}`,
        raw: true,
        expected: {
              body: [
                {
                  body: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  left: {
                   declarations: [
                      {
                        id: {
                          name: 'x',
                          type: 'Identifier'
                        },
                        init: null,
                       type: 'VariableDeclarator'
                     }
                    ],
                    kind: 'let',
                    type: 'VariableDeclaration'
                  },
                  right: {
                    expressions: [
                      {
                        raw: 'null',
                        type: 'Literal',
                        value: null,
                      },
                      {
                        properties: [
                          {
                            computed: false,
                            key: {
                              name: 'key',
                              type: 'Identifier'
                            },
                            kind: 'init',
                           method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                             raw: '0',
                              type: 'Literal',
                              value: 0,
                            }
                          }
                        ],
                       type: 'ObjectExpression'
                      }
                    ],
                    type: 'SequenceExpression'
                 },
                  type: 'ForInStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`for (x.y of [23]) { }`, {
        source: `for (x.y of [23]) { }`,
        raw: true,
        expected: {
              body: [
               {
                  await: false,
                  body: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  left: {
                    computed: false,
                   object: {
                      name: 'x',
                      type: 'Identifier'
                    },
                    property: {
                      name: 'y',
                      type: 'Identifier'
                    },
                    type: 'MemberExpression'
                  },
                 right: {
                    elements: [
                      {
                        raw: '23',
                        type: 'Literal',
                        value: 23,
                      },
                    ],
                    type: 'ArrayExpression'
                  },
                 type: 'ForOfStatement'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`var c = 1;
    {
      const b = 2;
     var c = 2;
    }`, {
        source: `var c = 1;
        {
          const b = 2;
         var c = 2;
        }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 73,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 5,
                column: 9
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
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
                declarations: [
                  {
                    type: 'VariableDeclarator',
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
                    id: {
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
                      name: 'c'
                    },
                    init: {
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
                      value: 1,
                      raw: '1'
                    }
                  }
                ],
                kind: 'var'
              },
              {
                type: 'BlockStatement',
                start: 19,
                end: 73,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 5,
                    column: 9
                  }
                },
                body: [
                  {
                    type: 'VariableDeclaration',
                    start: 31,
                    end: 43,
                    loc: {
                      start: {
                        line: 3,
                        column: 10
                      },
                      end: {
                        line: 3,
                        column: 22
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 37,
                        end: 42,
                        loc: {
                          start: {
                            line: 3,
                            column: 16
                          },
                          end: {
                            line: 3,
                            column: 21
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 37,
                          end: 38,
                          loc: {
                            start: {
                              line: 3,
                              column: 16
                            },
                            end: {
                              line: 3,
                              column: 17
                            }
                          },
                          name: 'b'
                        },
                        init: {
                          type: 'Literal',
                          start: 41,
                          end: 42,
                          loc: {
                            start: {
                              line: 3,
                              column: 20
                            },
                            end: {
                              line: 3,
                              column: 21
                            }
                          },
                          value: 2,
                          raw: '2'
                        }
                      }
                    ],
                    kind: 'const'
                  },
                  {
                    type: 'VariableDeclaration',
                    start: 53,
                    end: 63,
                    loc: {
                      start: {
                        line: 4,
                        column: 9
                      },
                      end: {
                        line: 4,
                        column: 19
                      }
                    },
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        start: 57,
                        end: 62,
                        loc: {
                          start: {
                            line: 4,
                            column: 13
                          },
                          end: {
                            line: 4,
                            column: 18
                          }
                        },
                        id: {
                          type: 'Identifier',
                          start: 57,
                          end: 58,
                          loc: {
                            start: {
                              line: 4,
                              column: 13
                            },
                            end: {
                              line: 4,
                              column: 14
                            }
                          },
                          name: 'c'
                        },
                        init: {
                          type: 'Literal',
                          start: 61,
                          end: 62,
                          loc: {
                            start: {
                              line: 4,
                              column: 17
                            },
                            end: {
                              line: 4,
                              column: 18
                            }
                          },
                          value: 2,
                          raw: '2'
                        }
                      }
                    ],
                    kind: 'var'
                  }
                ]
              }
            ],
            sourceType: 'script'
          }
    });

    pass('for (j=x; j<10; ++j) { function foo() {return j} }', {
        source: 'for (j=x; j<10; ++j) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            start: 39,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        }
                                    ],
                                    start: 38,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 32,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 32
                                        },
                                        end: {
                                            line: 1,
                                            column: 35
                                        }
                                    }
                                },
                                start: 23,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            }
                        ],
                        start: 21,
                        end: 50,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 50
                            }
                        }
                    },
                    init: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        operator: '=',
                        right: {
                            type: 'Identifier',
                            name: 'x',
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
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        },
                        right: {
                            type: 'Literal',
                            value: 10,
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
                        operator: '<',
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
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                        operator: '++',
                        prefix: true,
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

    pass('for ({j}=x; j<10; ++j) { [foo] = [j] }', {
        source: 'for ({j}=x; j<10; ++j) { [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
                                                type: 'Identifier',
                                                name: 'foo',
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
                                            }
                                        ],
                                        start: 25,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    operator: '=',
                                    right: {
                                        type: 'ArrayExpression',
                                        elements: [
                                            {
                                                type: 'Identifier',
                                                name: 'j',
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
                                        start: 33,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    },
                                    start: 25,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    }
                                },
                                start: 25,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        }
                    },
                    init: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'ObjectPattern',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'j',
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
                                        name: 'j',
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
                                }
                            ],
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
                            }
                        },
                        operator: '=',
                        right: {
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
                        start: 5,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 10,
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
                        operator: '<',
                        start: 12,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                        operator: '++',
                        prefix: true,
                        start: 18,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 38,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 38
                }
            }
        }

    });

    pass('for ({j}=x; j<10; ++j) { function foo() {return j} }', {
        source: 'for ({j}=x; j<10; ++j) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                                }
                                            },
                                            start: 41,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            }
                                        }
                                    ],
                                    start: 40,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 40
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 34,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 34
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                start: 25,
                                end: 50,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 50
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    },
                    init: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'ObjectPattern',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'j',
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
                                        name: 'j',
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
                                }
                            ],
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
                            }
                        },
                        operator: '=',
                        right: {
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
                        start: 5,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 10,
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
                        operator: '<',
                        start: 12,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                        operator: '++',
                        prefix: true,
                        start: 18,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 52,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 52
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 52,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 52
                }
            }
        }

    });

    pass('for (var j=x; j<10; ++j) { const [foo] = [j] }', {
        source: 'for (var j=x; j<10; ++j) { const [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'ArrayExpression',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'j',
                                                    start: 42,
                                                    end: 43,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 42
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 43
                                                        }
                                                    }
                                                }
                                            ],
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
                                        id: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 34,
                                                    end: 37,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 34
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 37
                                                        }
                                                    }
                                                }
                                            ],
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
                                        start: 33,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    }
                                ],
                                kind: 'const',
                                start: 27,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            }
                        ],
                        start: 25,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 25
                            },
                            end: {
                                line: 1,
                                column: 46
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                id: {
                                    type: 'Identifier',
                                    name: 'j',
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
                                start: 9,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        kind: 'var',
                        start: 5,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        },
                        right: {
                            type: 'Literal',
                            value: 10,
                            start: 16,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        operator: '<',
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
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                        },
                        operator: '++',
                        prefix: true,
                        start: 20,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
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

    pass('for (var {j}=x; j<10; ++j) { const [foo] = [j] }', {
        source: 'for (var {j}=x; j<10; ++j) { const [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'ArrayExpression',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'j',
                                                    start: 44,
                                                    end: 45,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 44
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 45
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 43,
                                            end: 46,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 43
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 46
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'foo',
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
                                                }
                                            ],
                                            start: 35,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 35
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        start: 35,
                                        end: 46,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 46
                                            }
                                        }
                                    }
                                ],
                                kind: 'const',
                                start: 29,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 27,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            },
                                            method: false,
                                            shorthand: true,
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
                                    start: 9,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
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
                            }
                        ],
                        kind: 'var',
                        start: 5,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        right: {
                            type: 'Literal',
                            value: 10,
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
                            }
                        },
                        operator: '<',
                        start: 16,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                            }
                        },
                        operator: '++',
                        prefix: true,
                        start: 22,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 48,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 48
                }
            }
        }

    });

    pass('for (var {j}=x; j<10; ++j) { function foo() {return j} }', {
        source: 'for (var {j}=x; j<10; ++j) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'j',
                                                start: 52,
                                                end: 53,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 52
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 53
                                                    }
                                                }
                                            },
                                            start: 45,
                                            end: 53,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 45
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 53
                                                }
                                            }
                                        }
                                    ],
                                    start: 44,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 44
                                        },
                                        end: {
                                            line: 1,
                                            column: 54
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 38,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                },
                                start: 29,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 54
                                    }
                                }
                            }
                        ],
                        start: 27,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 56
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            },
                                            method: false,
                                            shorthand: true,
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
                                    start: 9,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
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
                            }
                        ],
                        kind: 'var',
                        start: 5,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        right: {
                            type: 'Literal',
                            value: 10,
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
                            }
                        },
                        operator: '<',
                        start: 16,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                            }
                        },
                        operator: '++',
                        prefix: true,
                        start: 22,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 56,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 56
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 56,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 56
                }
            }
        }

    });

    pass('for (let j=x; j<10; ++j) { let [foo] = [j] }', {
        source: 'for (let j=x; j<10; ++j) { let [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'ArrayExpression',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'j',
                                                    start: 40,
                                                    end: 41,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 40
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 39,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 32,
                                                    end: 35,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 32
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 35
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 31,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        },
                                        start: 31,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        }
                                    }
                                ],
                                kind: 'let',
                                start: 27,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            }
                        ],
                        start: 25,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 25
                            },
                            end: {
                                line: 1,
                                column: 44
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                id: {
                                    type: 'Identifier',
                                    name: 'j',
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
                                start: 9,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 5,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        },
                        right: {
                            type: 'Literal',
                            value: 10,
                            start: 16,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        operator: '<',
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
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                        },
                        operator: '++',
                        prefix: true,
                        start: 20,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 44,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 44
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 44,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 44
                }
            }
        }

    });

    pass('for (let j=x; j<10; ++j) { const foo = j }', {
        source: 'for (let j=x; j<10; ++j) { const foo = j }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'Identifier',
                                            name: 'j',
                                            start: 39,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'Identifier',
                                            name: 'foo',
                                            start: 33,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        },
                                        start: 33,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 40
                                            }
                                        }
                                    }
                                ],
                                kind: 'const',
                                start: 27,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            }
                        ],
                        start: 25,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 25
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                id: {
                                    type: 'Identifier',
                                    name: 'j',
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
                                start: 9,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 5,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        },
                        right: {
                            type: 'Literal',
                            value: 10,
                            start: 16,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        operator: '<',
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
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                        },
                        operator: '++',
                        prefix: true,
                        start: 20,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 42
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 42,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 42
                }
            }
        }

    });

    pass('for (let {j}=x; j<10; ++j) { const foo = j }', {
        source: 'for (let {j}=x; j<10; ++j) { const foo = j }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'Identifier',
                                            name: 'j',
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
                                        id: {
                                            type: 'Identifier',
                                            name: 'foo',
                                            start: 35,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 35
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            }
                                        },
                                        start: 35,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        }
                                    }
                                ],
                                kind: 'const',
                                start: 29,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            }
                        ],
                        start: 27,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 44
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            },
                                            method: false,
                                            shorthand: true,
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
                                    start: 9,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
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
                            }
                        ],
                        kind: 'let',
                        start: 5,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        right: {
                            type: 'Literal',
                            value: 10,
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
                            }
                        },
                        operator: '<',
                        start: 16,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                            }
                        },
                        operator: '++',
                        prefix: true,
                        start: 22,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 44,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 44
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 44,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 44
                }
            }
        }

    });

    pass('for (let {j}=x; j<10; ++j) { function foo(){return j} }', {
        source: 'for (let {j}=x; j<10; ++j) { function foo(){return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            start: 44,
                                            end: 52,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 44
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 52
                                                }
                                            }
                                        }
                                    ],
                                    start: 43,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 53
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 38,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                },
                                start: 29,
                                end: 53,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 53
                                    }
                                }
                            }
                        ],
                        start: 27,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'j',
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
                                            },
                                            method: false,
                                            shorthand: true,
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
                                    start: 9,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
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
                            }
                        ],
                        kind: 'let',
                        start: 5,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'j',
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
                        right: {
                            type: 'Literal',
                            value: 10,
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
                            }
                        },
                        operator: '<',
                        start: 16,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'j',
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
                            }
                        },
                        operator: '++',
                        prefix: true,
                        start: 22,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 55,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 55
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 55,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 55
                }
            }
        }

    });

    pass(`for(let();;);`, {
        source: 'for(let();;);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
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
                        }
                    },
                    init: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'let',
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
                        arguments: [],
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
                        }
                    },
                    test: null,
                    update: null,
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
});