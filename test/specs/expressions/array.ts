import { n, fail, test, testWithLocations } from '../utils/test-utils';

describe('Espressions - Array', () => {

        testWithLocations('[]', {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'ArrayExpression',
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
                    },
                    elements: []
                }
            }],
            sourceType: 'script'
        });
    
        testWithLocations('[a.r] = b', {
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
            body: [{
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
                    type: 'AssignmentExpression',
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
                    operator: '=',
                    left: {
                        type: 'ArrayPattern',
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
                        },
                        elements: [{
                            type: 'MemberExpression',
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
                            },
                            object: {
                                type: 'Identifier',
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
                                },
                                name: 'a'
                            },
                            property: {
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
                                name: 'r'
                            },
                            computed: false
                        }]
                    },
                    right: {
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
                        name: 'b'
                    }
                }
            }],
            sourceType: 'script'
        });
    
        testWithLocations('var source = [2, 3, 4];', {
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
            body: [{
                type: 'VariableDeclaration',
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
                declarations: [{
                    type: 'VariableDeclarator',
                    start: 4,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    },
                    id: {
                        type: 'Identifier',
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
                        },
                        name: 'source'
                    },
                    init: {
                        type: 'ArrayExpression',
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
                        },
                        elements: [{
                                type: 'Literal',
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
                                value: 2,
                                raw: '2'
                            },
                            {
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
                                value: 3,
                                raw: '3'
                            },
                            {
                                type: 'Literal',
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
                                value: 4,
                                raw: '4'
                            }
                        ]
                    }
                }],
                kind: 'var'
            }],
            sourceType: 'script'
        });

        testWithLocations(' [,,,,,]', {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                expression: {
                    type: 'ArrayExpression',
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
                   elements: [
                        null,
                        null,
                        null,
                        null,
                        null
                    ]
                }
            }],
            sourceType: 'script'
        });
    
        testWithLocations('[1,2,3,4,5]', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrayExpression',
                    elements: [{
                            type: 'Literal',
                            value: 1,
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
                            },
                            raw: '1'
                        },
                        {
                            type: 'Literal',
                            value: 2,
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
                            raw: '2'
                        },
                        {
                            type: 'Literal',
                            value: 3,
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
                            raw: '3'
                        },
                        {
                            type: 'Literal',
                            value: 4,
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
                            raw: '4'
                        },
                        {
                            type: 'Literal',
                            value: 5,
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
                            raw: '5'
                        }
                    ],
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
            }],
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
        });
    
        test('[ 0 ]', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrayExpression',
                    elements: [{
                        type: 'Literal',
                        value: 0
                    }]
                }
            }],
            sourceType: 'script'
        });
    
        test('日本語 = []', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: '日本語',
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [],
                    },
                },
            }, ],
            sourceType: 'script',
        });
    });