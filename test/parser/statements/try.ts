import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Try', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}', 'try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'TryStatement',
            'block': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ThrowStatement',
                        'argument': {
                            'type': 'Literal',
                            'value': null,
                            'start': 12,
                            'end': 16,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 12
                                },
                                'end': {
                                    'line': 1,
                                    'column': 16
                                }
                            }
                        },
                        'start': 6,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    }
                ],
                'start': 4,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'handler': {
                'type': 'CatchClause',
                'param': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 27,
                    'end': 28,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 27
                        },
                        'end': {
                            'line': 1,
                            'column': 28
                        }
                    }
                },
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'IfStatement',
                            'test': {
                                'type': 'Literal',
                                'value': false,
                                'start': 35,
                                'end': 40,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 35
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 40
                                    }
                                }
                            },
                            'consequent': {
                                'type': 'EmptyStatement',
                                'start': 42,
                                'end': 43,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 42
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 43
                                    }
                                }
                            },
                            'alternate': {
                                'type': 'FunctionDeclaration',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [
                                        {
                                            'type': 'ReturnStatement',
                                            'argument': {
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 123,
                                                'start': 71,
                                                'end': 74,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 71
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 74
                                                    }
                                                }
                                            },
                                            'start': 64,
                                            'end': 75,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 64
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 75
                                                }
                                            }
                                        }
                                    ],
                                    'start': 62,
                                    'end': 77,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 62
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 77
                                        }
                                    }
                                },
                                'async': false,
                                'generator': false,
                                'expression': false,
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'f',
                                    'start': 58,
                                    'end': 59,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 58
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 59
                                        }
                                    }
                                },
                                'start': 49,
                                'end': 77,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 49
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 77
                                    }
                                }
                            },
                            'start': 31,
                            'end': 77,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 31
                                },
                                'end': {
                                    'line': 1,
                                    'column': 77
                                }
                            }
                        }
                    ],
                    'start': 30,
                    'end': 78,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 30
                        },
                        'end': {
                            'line': 1,
                            'column': 78
                        }
                    }
                },
                'start': 20,
                'end': 78,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 78
                    }
                }
            },
            'finalizer': null,
            'start': 0,
            'end': 78,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 78
                }
            }
        }
    ],
    'start': 0,
    'end': 78,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 78
        }
    }
}],
  ['try { throw {}; } catch ({ arrow = () => {} }) {}', 'try { throw {}; } catch ({ arrow = () => {} }) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'TryStatement',
            'block': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ThrowStatement',
                        'argument': {
                            'type': 'ObjectExpression',
                            'properties': [],
                            'start': 12,
                            'end': 14,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 12
                                },
                                'end': {
                                    'line': 1,
                                    'column': 14
                                }
                            }
                        },
                        'start': 6,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    }
                ],
                'start': 4,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'handler': {
                'type': 'CatchClause',
                'param': {
                    'type': 'ObjectPattern',
                    'properties': [
                        {
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'arrow',
                                'start': 27,
                                'end': 32,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 27
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 32
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'AssignmentPattern',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'arrow',
                                    'start': 27,
                                    'end': 32,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 27
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 32
                                        }
                                    }
                                },
                                'right': {
                                    'type': 'ArrowFunctionExpression',
                                    'body': {
                                        'type': 'BlockStatement',
                                        'body': [],
                                        'start': 41,
                                        'end': 43,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 41
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 43
                                            }
                                        }
                                    },
                                    'params': [],
                                    'id': null,
                                    'async': false,
                                    'generator': false,
                                    'expression': false,
                                    'start': 35,
                                    'end': 43,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 35
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 43
                                        }
                                    }
                                },
                                'start': 27,
                                'end': 43,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 27
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 43
                                    }
                                }
                            },
                            'method': false,
                            'shorthand': true,
                            'start': 27,
                            'end': 43,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 27
                                },
                                'end': {
                                    'line': 1,
                                    'column': 43
                                }
                            }
                        }
                    ],
                    'start': 25,
                    'end': 45,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 25
                        },
                        'end': {
                            'line': 1,
                            'column': 45
                        }
                    }
                },
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 47,
                    'end': 49,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 47
                        },
                        'end': {
                            'line': 1,
                            'column': 49
                        }
                    }
                },
                'start': 18,
                'end': 49,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 18
                    },
                    'end': {
                        'line': 1,
                        'column': 49
                    }
                }
            },
            'finalizer': null,
            'start': 0,
            'end': 49,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 49
                }
            }
        }
    ],
    'start': 0,
    'end': 49,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 49
        }
    }
}],
  ['try { throw null; } catch ({}) {}', 'try { throw null; } catch ({}) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'TryStatement',
            'block': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ThrowStatement',
                        'argument': {
                            'type': 'Literal',
                            'value': null,
                            'start': 12,
                            'end': 16,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 12
                                },
                                'end': {
                                    'line': 1,
                                    'column': 16
                                }
                            }
                        },
                        'start': 6,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    }
                ],
                'start': 4,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'handler': {
                'type': 'CatchClause',
                'param': {
                    'type': 'ObjectPattern',
                    'properties': [],
                    'start': 27,
                    'end': 29,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 27
                        },
                        'end': {
                            'line': 1,
                            'column': 29
                        }
                    }
                },
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 31,
                    'end': 33,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 31
                        },
                        'end': {
                            'line': 1,
                            'column': 33
                        }
                    }
                },
                'start': 20,
                'end': 33,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 33
                    }
                }
            },
            'finalizer': null,
            'start': 0,
            'end': 33,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 33
                }
            }
        }
    ],
    'start': 0,
    'end': 33,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 33
        }
    }
}],
  ['try { throw [1, 2, 3]; } catch ([...x]) {}', 'try { throw [1, 2, 3]; } catch ([...x]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'TryStatement',
            'block': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ThrowStatement',
                        'argument': {
                            'type': 'ArrayExpression',
                            'elements': [
                                {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 1,
                                    'start': 13,
                                    'end': 14,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 13
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 14
                                        }
                                    }
                                },
                                {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 2,
                                    'start': 16,
                                    'end': 17,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 16
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 17
                                        }
                                    }
                                },
                                {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 3,
                                    'start': 19,
                                    'end': 20,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 19
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 20
                                        }
                                    }
                                }
                            ],
                            'start': 12,
                            'end': 21,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 12
                                },
                                'end': {
                                    'line': 1,
                                    'column': 21
                                }
                            }
                        },
                        'start': 6,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    }
                ],
                'start': 4,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            },
            'handler': {
                'type': 'CatchClause',
                'param': {
                    'type': 'ArrayPattern',
                    'elements': [
                        {
                            'type': 'RestElement',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'x',
                                'start': 36,
                                'end': 37,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 36
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 37
                                    }
                                }
                            },
                            'start': 33,
                            'end': 37,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 33
                                },
                                'end': {
                                    'line': 1,
                                    'column': 37
                                }
                            }
                        }
                    ],
                    'start': 32,
                    'end': 38,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 32
                        },
                        'end': {
                            'line': 1,
                            'column': 38
                        }
                    }
                },
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 40,
                    'end': 42,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 40
                        },
                        'end': {
                            'line': 1,
                            'column': 42
                        }
                    }
                },
                'start': 25,
                'end': 42,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 25
                    },
                    'end': {
                        'line': 1,
                        'column': 42
                    }
                }
            },
            'finalizer': null,
            'start': 0,
            'end': 42,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 42
                }
            }
        }
    ],
    'start': 0,
    'end': 42,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 42
        }
    }
}],
  ['try{}catch(a){}', 'try{}catch(a){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'TryStatement',
            'block': {
                'type': 'BlockStatement',
                'body': [],
                'start': 3,
                'end': 5,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 3
                    },
                    'end': {
                        'line': 1,
                        'column': 5
                    }
                }
            },
            'handler': {
                'type': 'CatchClause',
                'param': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 11,
                    'end': 12,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 12
                        }
                    }
                },
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 13,
                    'end': 15,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 13
                        },
                        'end': {
                            'line': 1,
                            'column': 15
                        }
                    }
                },
                'start': 5,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 15
                    }
                }
            },
            'finalizer': null,
            'start': 0,
            'end': 15,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 15
                }
            }
        }
    ],
    'start': 0,
    'end': 15,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 15
        }
    }
}],
  ['try {} finally {}', 'try {} finally {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'TryStatement',
            'block': {
                'type': 'BlockStatement',
                'body': [],
                'start': 4,
                'end': 6,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 6
                    }
                }
            },
            'handler': null,
            'finalizer': {
                'type': 'BlockStatement',
                'body': [],
                'start': 15,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'start': 0,
            'end': 17,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 17
                }
            }
        }
    ],
    'start': 0,
    'end': 17,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 17
        }
    }
}]
];

const invalids: Array < [string, string, Context, any] > = [

  ['try { }', 'try { }', Context.Empty, {}],
  ['try { } catch(e=123) {}', 'try { } catch(e=123) {}', Context.Empty, {}],
  ['try { } foo();', 'try { } foo();', Context.Empty, {}],
  ['try { } catch (e) foo();', 'try { } catch (e) foo();', Context.Empty, {}],
  ['try { } finally foo();', 'try { } finally foo();', Context.Empty, {}],
  [`try{}
  catch(){`, `try{}
  catch(){`, Context.Empty, {}],
  [`try{}
  catch(){
  finally{}`, `try{}
  catch(){
  finally{}`, Context.Empty, {}],
  ['catch', 'catch', Context.Empty, {}],
  ['try {} catch ((e)) {}', 'try {} catch ((e)) {}', Context.Empty, {}],
  ['try { } catch (e) foo();', 'try { } catch (e) foo();', Context.Empty, {}],
  ['try { } foo();', 'try { } foo();', Context.Empty, {}],
  [`try{}
  catch(){}
  finally{}`, `try{}
  catch(){}
  finally{}`, Context.Empty, {}],
  ['try', 'try', Context.Empty, {}],
  [`try{
    {
    }
    catch(e){}
    finally{}
  }`, `try{
    {
    }
    catch(e){}
    finally{}
  }`, Context.Empty, {}],
  [`try{}
  catch(){}
  finally{}`, `try{}
  catch(){}
  finally{}`, Context.Empty, {}],
];
fail('Declarations - Try (pass)', invalids);
pass('Declarations - Try (pass)', valids);
});
