import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Continue', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  // "eval" or "arguments" are allowed as labels even in strict mode.
  ['"use strict"; eval: while (foo) { continue eval; }', '"use strict"; eval: while (foo) { continue eval; }', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Literal",
                raw: null,
                "value": "use strict",
                "start": 0,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            },
            "directive": "use strict",
            "start": 0,
            "end": 13,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 13
                }
            }
        },
        {
            "type": "LabeledStatement",
            "label": {
                "type": "Identifier",
                "name": "eval",
                "start": 14,
                "end": 18,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 14
                    },
                    "end": {
                        "line": 1,
                        "column": 18
                    }
                }
            },
            "body": {
                "type": "WhileStatement",
                "test": {
                    "type": "Identifier",
                    "name": "foo",
                    "start": 27,
                    "end": 30,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 27
                        },
                        "end": {
                            "line": 1,
                            "column": 30
                        }
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ContinueStatement",
                            "label": {
                                "type": "Identifier",
                                "name": "eval",
                                "start": 43,
                                "end": 47,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 43
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 47
                                    }
                                }
                            },
                            "start": 34,
                            "end": 48,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 34
                                },
                                "end": {
                                    "line": 1,
                                    "column": 48
                                }
                            }
                        }
                    ],
                    "start": 32,
                    "end": 50,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 32
                        },
                        "end": {
                            "line": 1,
                            "column": 50
                        }
                    }
                },
                "start": 20,
                "end": 50,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 20
                    },
                    "end": {
                        "line": 1,
                        "column": 50
                    }
                }
            },
            "start": 14,
            "end": 50,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 14
                },
                "end": {
                    "line": 1,
                    "column": 50
                }
            }
        }
    ],
    "start": 0,
    "end": 50,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 50
        }
    }
}],
  ['eval: while (foo) { continue eval; }', 'eval: while (foo) { continue eval; }', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "LabeledStatement",
            "label": {
                "type": "Identifier",
                "name": "eval",
                "start": 0,
                "end": 4,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 4
                    }
                }
            },
            "body": {
                "type": "WhileStatement",
                "test": {
                    "type": "Identifier",
                    "name": "foo",
                    "start": 13,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 1,
                            "column": 16
                        }
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ContinueStatement",
                            "label": {
                                "type": "Identifier",
                                "name": "eval",
                                "start": 29,
                                "end": 33,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 33
                                    }
                                }
                            },
                            "start": 20,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            }
                        }
                    ],
                    "start": 18,
                    "end": 36,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 36
                        }
                    }
                },
                "start": 6,
                "end": 36,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 36
                    }
                }
            },
            "start": 0,
            "end": 36,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 36
                }
            }
        }
    ],
    "start": 0,
    "end": 36,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 36
        }
    }
}],
  ['while (foo) { continue; }', 'while (foo) { continue; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 7,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ContinueStatement',
                        'label': null,
                        'start': 14,
                        'end': 23,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 23
                            }
                        }
                    }
                ],
                'start': 12,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 12
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            },
            'start': 0,
            'end': 25,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 25
                }
            }
        }
    ],
    'start': 0,
    'end': 25,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 25
        }
    }
}]
];

const invalids: Array < [string, string, Context, any] > = [
  ['continue', 'continue', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['do {  test262: {  continue test262; } } while (a)', 'do {  test262: {  continue test262; } } while (a)', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['do {  test262: {  continue test262; } } while (a)', 'do {  test262: {  continue test262; } } while (a)', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['ice: while(true) { continue fapper; }', 'ice: while(true) { continue fapper; }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['oop1: while (true) { loop2: function a() { continue loop2; } }', 'oop1: while (true) { loop2: function a() { continue loop2; } }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['loop1: while (true) { loop2: function a() { continue loop1; } }', 'loop1: while (true) { loop2: function a() { continue loop1; } }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['loop1: while (true) { loop1: function a() { continue loop1; } }', 'loop1: while (true) { loop1: function a() { continue loop1; } }', Context.OptionsRanges | Context.OptionsLoc, {}],
  [`LABEL1 : do {
    x++;
    (function(){continue LABEL1;})();
    y++;
    } while(0);`, `LABEL1 : do {
      x++;
      (function(){continue LABEL1;})();
      y++;
      } while(0);`, Context.OptionsRanges | Context.OptionsLoc, {}],
  [`try{
    LABEL1 : do {
      x++;
      throw "gonna leave it";
      y++;
    } while(0);
    $ERROR('#1: throw "gonna leave it" lead to throwing exception');
    } catch(e){
    continue LABEL2;
    LABEL2 : do {
      x++;
      y++;
    } while(0);
    };`, `try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
      } catch(e){
      continue LABEL2;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
      };`, Context.OptionsRanges | Context.OptionsLoc, {}],
  [`try{
    LABEL1 : do {
      x++;
      throw "gonna leave it";
      y++;
    } while(0);
    $ERROR('#1: throw "gonna leave it" lead to throwing exception');
    } catch(e){
    continue;
    LABEL2 : do {
      x++;
      y++;
    } while(0);
    };`, `try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
      } catch(e){
      continue;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
      };`, Context.OptionsRanges | Context.OptionsLoc, {}],
];
fail('Statements - Continue (failures)', invalids);
pass('Statements - Continue (pass)', valids);

});
