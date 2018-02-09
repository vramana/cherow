import { pass, fail } from '../test-utils';

describe('Statements - Try', () => {

    fail(`try`, {
        source: `try`,
        line: 1,
    });

    fail(`try(e1){
    }
    catch(e){}`, {
        source: `try(e1){
            }
            catch(e){}`,
        line: 1,
    });

    fail(`try{
        }
        finally(e){}`, {
        source: `try{
            }
            finally(e){}`,
        line: 3,
    });

    fail(`finally`, {
        source: `finally`,
        line: 1,
    });

    fail(`try{}
        catch()`, {
        source: `try{}
            catch()`,
        line: 2,
    });

    fail(`try{
            catch(){}`, {
        source: `try{
                catch(){}`,
        line: 1,
    });

    fail(`try{}
        catch(){`, {
        source: `try{}
            catch(){`,
        line: 2,
    });

    fail(`try{}
        catch(){
        finally{}`, {
        source: `try{}
            catch(){
            finally{}`,
        line: 2,
    });

    fail(`catch(){}
        finally{}`, {
        source: `catch(){}
            finally{}`,
        line: 1,
    });

    pass(`try { } catch (eval) { }`, {
        source: 'try { } catch (eval) { }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'TryStatement',
                block: {
                    type: 'BlockStatement',
                    body: [],
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
                handler: {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'eval',
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
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    start: 8,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                },
                finalizer: null,
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
            }],
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

    pass(`"use strict"; try {} catch (evil) {}`, {
        source: '"use strict"; try {} catch (evil) {}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    directive: 'use strict'
                },
                {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [],
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
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'evil',
                            start: 28,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 28
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                        start: 21,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    finalizer: null,
                    start: 14,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
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

    pass(`try{}catch(a){}`, {
        source: 'try{}catch(a){}',
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
            body: [{
                type: 'TryStatement',
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
                block: {
                    type: 'BlockStatement',
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
                    },
                    body: []
                },
                handler: {
                    type: 'CatchClause',
                    start: 5,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    param: {
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
                        name: 'a'
                    },
                    body: {
                        type: 'BlockStatement',
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
                        },
                        body: []
                    }
                },
                finalizer: null
            }],
            sourceType: 'script'
        }
    });

    pass(`try { } catch (e) { let a; }`, {
        source: 'try { } catch (e) { let a; }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 28,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 28
                }
            },
            body: [{
                type: 'TryStatement',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                block: {
                    type: 'BlockStatement',
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
                    },
                    body: []
                },
                handler: {
                    type: 'CatchClause',
                    start: 8,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    },
                    param: {
                        type: 'Identifier',
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
                        name: 'e'
                    },
                    body: {
                        type: 'BlockStatement',
                        start: 18,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        },
                        body: [{
                            type: 'VariableDeclaration',
                            start: 20,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            declarations: [{
                                type: 'VariableDeclarator',
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
                                id: {
                                    type: 'Identifier',
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
                                    name: 'a'
                                },
                                init: null
                            }],
                            kind: 'let'
                        }]
                    }
                },
                finalizer: null
            }],
            sourceType: 'script'
        }
    });

    pass(`try { } catch (arguments) { }`, {
        source: 'try { } catch (arguments) { }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'TryStatement',
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
                },
                block: {
                    type: 'BlockStatement',
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
                    },
                    body: []
                },
                handler: {
                    type: 'CatchClause',
                    start: 8,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    },
                    param: {
                        type: 'Identifier',
                        start: 15,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        name: 'arguments'
                    },
                    body: {
                        type: 'BlockStatement',
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
                        },
                        body: []
                    }
                },
                finalizer: null
            }],
            sourceType: 'script'
        }
    });

    pass(`try { } catch (e) { say(e) }`, {
        source: 'try { } catch (e) { say(e) }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 28,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 28
                }
            },
            body: [{
                type: 'TryStatement',
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                },
                block: {
                    type: 'BlockStatement',
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
                    },
                    body: []
                },
                handler: {
                    type: 'CatchClause',
                    start: 8,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    },
                    param: {
                        type: 'Identifier',
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
                        name: 'e'
                    },
                    body: {
                        type: 'BlockStatement',
                        start: 18,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        },
                        body: [{
                            type: 'ExpressionStatement',
                            start: 20,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            expression: {
                                type: 'CallExpression',
                                start: 20,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                callee: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'say'
                                },
                                arguments: [{
                                    type: 'Identifier',
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
                                    name: 'e'
                                }]
                            }
                        }]
                    }
                },
                finalizer: null
            }],
            sourceType: 'script'
        }
    });

    pass(`try { doThat(); } catch (e) { say(e) }`, {
        source: 'try { doThat(); } catch (e) { say(e) }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'TryStatement',
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
                },
                block: {
                    type: 'BlockStatement',
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
                    },
                    body: [{
                        type: 'ExpressionStatement',
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
                        expression: {
                            type: 'CallExpression',
                            start: 6,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            callee: {
                                type: 'Identifier',
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
                                name: 'doThat'
                            },
                            arguments: []
                        }
                    }]
                },
                handler: {
                    type: 'CatchClause',
                    start: 18,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 18
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    },
                    param: {
                        type: 'Identifier',
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
                        name: 'e'
                    },
                    body: {
                        type: 'BlockStatement',
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
                        },
                        body: [{
                            type: 'ExpressionStatement',
                            start: 30,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 30
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            },
                            expression: {
                                type: 'CallExpression',
                                start: 30,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                },
                                callee: {
                                    type: 'Identifier',
                                    start: 30,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    },
                                    name: 'say'
                                },
                                arguments: [{
                                    type: 'Identifier',
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
                                    },
                                    name: 'e'
                                }]
                            }
                        }]
                    }
                },
                finalizer: null
            }],
            sourceType: 'script'
        }
    });

    pass(`try { } finally { cleanup(stuff) }`, {
        source: 'try { } finally { cleanup(stuff) }',
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
            body: [{
                type: 'TryStatement',
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
                block: {
                    type: 'BlockStatement',
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
                    },
                    body: []
                },
                handler: null,
                finalizer: {
                    type: 'BlockStatement',
                    start: 16,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 16
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    },
                    body: [{
                        type: 'ExpressionStatement',
                        start: 18,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        },
                        expression: {
                            type: 'CallExpression',
                            start: 18,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            },
                            callee: {
                                type: 'Identifier',
                                start: 18,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                },
                                name: 'cleanup'
                            },
                            arguments: [{
                                type: 'Identifier',
                                start: 26,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                },
                                name: 'stuff'
                            }]
                        }
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`try{}catch(a){}finally{}`, {
        source: 'try{}catch(a){}finally{}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'TryStatement',
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
                },
                block: {
                    type: 'BlockStatement',
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
                    },
                    body: []
                },
                handler: {
                    type: 'CatchClause',
                    start: 5,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    param: {
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
                        name: 'a'
                    },
                    body: {
                        type: 'BlockStatement',
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
                        },
                        body: []
                    }
                },
                finalizer: {
                    type: 'BlockStatement',
                    start: 22,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 22
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    },
                    body: []
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }`, {
        source: 'try { doThat(); } catch (e) { say(e) } finally { cleanup(stuff) }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 65,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 65
                }
            },
            body: [{
                type: 'TryStatement',
                start: 0,
                end: 65,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 65
                    }
                },
                block: {
                    type: 'BlockStatement',
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
                    },
                    body: [{
                        type: 'ExpressionStatement',
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
                        expression: {
                            type: 'CallExpression',
                            start: 6,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            callee: {
                                type: 'Identifier',
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
                                name: 'doThat'
                            },
                            arguments: []
                        }
                    }]
                },
                handler: {
                    type: 'CatchClause',
                    start: 18,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 18
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    },
                    param: {
                        type: 'Identifier',
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
                        name: 'e'
                    },
                    body: {
                        type: 'BlockStatement',
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
                        },
                        body: [{
                            type: 'ExpressionStatement',
                            start: 30,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 30
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            },
                            expression: {
                                type: 'CallExpression',
                                start: 30,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                },
                                callee: {
                                    type: 'Identifier',
                                    start: 30,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    },
                                    name: 'say'
                                },
                                arguments: [{
                                    type: 'Identifier',
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
                                    },
                                    name: 'e'
                                }]
                            }
                        }]
                    }
                },
                finalizer: {
                    type: 'BlockStatement',
                    start: 47,
                    end: 65,
                    loc: {
                        start: {
                            line: 1,
                            column: 47
                        },
                        end: {
                            line: 1,
                            column: 65
                        }
                    },
                    body: [{
                        type: 'ExpressionStatement',
                        start: 49,
                        end: 63,
                        loc: {
                            start: {
                                line: 1,
                                column: 49
                            },
                            end: {
                                line: 1,
                                column: 63
                            }
                        },
                        expression: {
                            type: 'CallExpression',
                            start: 49,
                            end: 63,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 49
                                },
                                end: {
                                    line: 1,
                                    column: 63
                                }
                            },
                            callee: {
                                type: 'Identifier',
                                start: 49,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 49
                                    },
                                    end: {
                                        line: 1,
                                        column: 56
                                    }
                                },
                                name: 'cleanup'
                            },
                            arguments: [{
                                type: 'Identifier',
                                start: 57,
                                end: 62,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 57
                                    },
                                    end: {
                                        line: 1,
                                        column: 62
                                    }
                                },
                                name: 'stuff'
                            }]
                        }
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`try {
        throw [1,2];
      } catch([i,j]) {
        try {
          throw { k: 3, l: 4 };
        } catch({k, l}) {
        }
      }`, {
        source: `try {
            throw [1,2];
          } catch([i,j]) {
            try {
              throw { k: 3, l: 4 };
            } catch({k, l}) {
            }
          }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ThrowStatement',
                                argument: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
                                            type: 'Literal',
                                            value: 1,
                                            start: 25,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 20
                                                }
                                            },
                                            raw: '1'
                                        },
                                        {
                                            type: 'Literal',
                                            value: 2,
                                            start: 27,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 22
                                                }
                                            },
                                            raw: '2'
                                        }
                                    ],
                                    start: 24,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 18
                                        },
                                        end: {
                                            line: 2,
                                            column: 23
                                        }
                                    }
                                },
                                start: 18,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 2,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 4,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 3,
                                column: 11
                            }
                        }
                    },
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'Identifier',
                                    name: 'i',
                                    start: 50,
                                    end: 51,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 19
                                        },
                                        end: {
                                            line: 3,
                                            column: 20
                                        }
                                    }
                                },
                                {
                                    type: 'Identifier',
                                    name: 'j',
                                    start: 52,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 21
                                        },
                                        end: {
                                            line: 3,
                                            column: 22
                                        }
                                    }
                                }
                            ],
                            start: 49,
                            end: 54,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 18
                                },
                                end: {
                                    line: 3,
                                    column: 23
                                }
                            }
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'TryStatement',
                                    block: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ThrowStatement',
                                                argument: {
                                                    type: 'ObjectExpression',
                                                    properties: [
                                                        {
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'k',
                                                                start: 98,
                                                                end: 99,
                                                                loc: {
                                                                    start: {
                                                                        line: 5,
                                                                        column: 22
                                                                    },
                                                                    end: {
                                                                        line: 5,
                                                                        column: 23
                                                                    }
                                                                }
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: 3,
                                                                start: 101,
                                                                end: 102,
                                                                loc: {
                                                                    start: {
                                                                        line: 5,
                                                                        column: 25
                                                                    },
                                                                    end: {
                                                                        line: 5,
                                                                        column: 26
                                                                    }
                                                                },
                                                                raw: '3'
                                                            },
                                                            kind: 'init',
                                                            computed: false,
                                                            method: false,
                                                            shorthand: false,
                                                            start: 98,
                                                            end: 102,
                                                            loc: {
                                                                start: {
                                                                    line: 5,
                                                                    column: 22
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 26
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'Property',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'l',
                                                                start: 104,
                                                                end: 105,
                                                                loc: {
                                                                    start: {
                                                                        line: 5,
                                                                        column: 28
                                                                    },
                                                                    end: {
                                                                        line: 5,
                                                                        column: 29
                                                                    }
                                                                }
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                value: 4,
                                                                start: 107,
                                                                end: 108,
                                                                loc: {
                                                                    start: {
                                                                        line: 5,
                                                                        column: 31
                                                                    },
                                                                    end: {
                                                                        line: 5,
                                                                        column: 32
                                                                    }
                                                                },
                                                                raw: '4'
                                                            },
                                                            kind: 'init',
                                                            computed: false,
                                                            method: false,
                                                            shorthand: false,
                                                            start: 104,
                                                            end: 108,
                                                            loc: {
                                                                start: {
                                                                    line: 5,
                                                                    column: 28
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 32
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 96,
                                                    end: 110,
                                                    loc: {
                                                        start: {
                                                            line: 5,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 5,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                start: 90,
                                                end: 111,
                                                loc: {
                                                    start: {
                                                        line: 5,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 35
                                                    }
                                                }
                                            }
                                        ],
                                        start: 74,
                                        end: 125,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 16
                                            },
                                            end: {
                                                line: 6,
                                                column: 13
                                            }
                                        }
                                    },
                                    handler: {
                                        type: 'CatchClause',
                                        param: {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'k',
                                                        start: 133,
                                                        end: 134,
                                                        loc: {
                                                            start: {
                                                                line: 6,
                                                                column: 21
                                                            },
                                                            end: {
                                                                line: 6,
                                                                column: 22
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'k',
                                                        start: 133,
                                                        end: 134,
                                                        loc: {
                                                            start: {
                                                                line: 6,
                                                                column: 21
                                                            },
                                                            end: {
                                                                line: 6,
                                                                column: 22
                                                            }
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
                                                    start: 133,
                                                    end: 134,
                                                    loc: {
                                                        start: {
                                                            line: 6,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 6,
                                                            column: 22
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'l',
                                                        start: 136,
                                                        end: 137,
                                                        loc: {
                                                            start: {
                                                                line: 6,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 6,
                                                                column: 25
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'l',
                                                        start: 136,
                                                        end: 137,
                                                        loc: {
                                                            start: {
                                                                line: 6,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 6,
                                                                column: 25
                                                            }
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
                                                    start: 136,
                                                    end: 137,
                                                    loc: {
                                                        start: {
                                                            line: 6,
                                                            column: 24
                                                        },
                                                        end: {
                                                            line: 6,
                                                            column: 25
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 132,
                                            end: 138,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 26
                                                }
                                            }
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 140,
                                            end: 155,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 7,
                                                    column: 13
                                                }
                                            }
                                        },
                                        start: 126,
                                        end: 155,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 14
                                            },
                                            end: {
                                                line: 7,
                                                column: 13
                                            }
                                        }
                                    },
                                    finalizer: null,
                                    start: 70,
                                    end: 155,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 12
                                        },
                                        end: {
                                            line: 7,
                                            column: 13
                                        }
                                    }
                                }
                            ],
                            start: 56,
                            end: 167,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 25
                                },
                                end: {
                                    line: 8,
                                    column: 11
                                }
                            }
                        },
                        start: 43,
                        end: 167,
                        loc: {
                            start: {
                                line: 3,
                                column: 12
                            },
                            end: {
                                line: 8,
                                column: 11
                            }
                        }
                    },
                    finalizer: null,
                    start: 0,
                    end: 167,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 8,
                            column: 11
                        }
                    }
                }
            ],
            start: 0,
            end: 167,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 8,
                    column: 11
                }
            }
        }
    });
});