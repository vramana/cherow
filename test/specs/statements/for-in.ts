import { n, test, fail } from '../utils/test-utils';

describe('Statements - For in', () => {

        fail('for(a in b) function c(){}', 'for(a in b) function c(){}');
        fail('for(a in b) function c(){}', 'for ({...rest, b} in [{}]) ;');
        fail('for(a in b) function c(){}', 'for ({...rest, b} of [{}]) ;');
        fail('for ([...x = 1] in [[]]) ;', 'for ([...x = 1] in [[]]) ;');
        
        test('for([{a=0}] in b);', n('Program', {
            body: [{
                type: 'ForInStatement',
                body: {
                    type: 'EmptyStatement',
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
                left: {
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'ObjectPattern',
                        properties: [{
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
                                type: 'AssignmentPattern',
                                left: {
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                        }],
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
                    }],
                    start: 4,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
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
            }],
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
            },
        }), {
            locations: true,
            raw: true,
            ranges: true
        });
    });