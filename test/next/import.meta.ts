import { pass, fail } from '../utils';

describe('Next - Import meta', () => {

    fail('"ariya" as property name', { source: `import.ariya`, module: true, next: true });

    pass(`one dot and no assignment`, {
        source: 'import.meta;',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        module: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        meta: {
                            type: 'Identifier',
                            name: 'import',
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
                        type: 'MetaProperty',
                        property: {
                            type: 'Identifier',
                            name: 'meta',
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
            sourceType: 'module',
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

    pass(`two dots and no assignments`, {
        source: 'import.meta.url;',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        module: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'MemberExpression',
                        object: {
                            meta: {
                                type: 'Identifier',
                                name: 'import',
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
                            type: 'MetaProperty',
                            property: {
                                type: 'Identifier',
                                name: 'meta',
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
                        computed: false,
                        property: {
                            type: 'Identifier',
                            name: 'url',
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
            sourceType: 'module',
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

    pass(`two dots and boolean assignment`, {
        source: 'import.meta.couldBeMutable = true;',
        loc: true,
        ranges: true,
        next: true,
        module: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                meta: {
                                    type: 'Identifier',
                                    name: 'import',
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
                                type: 'MetaProperty',
                                property: {
                                    type: 'Identifier',
                                    name: 'meta',
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
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'couldBeMutable',
                                start: 12,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
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
                        },
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: true,
                            start: 29,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 29
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
            sourceType: 'module',
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
});