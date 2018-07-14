import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Throw', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['throw x * y', 'throw x * y', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ThrowStatement",
            "argument": {
                "type": "BinaryExpression",
                "left": {
                    "type": "Identifier",
                    "name": "x",
                    "start": 6,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                },
                "right": {
                    "type": "Identifier",
                    "name": "y",
                    "start": 10,
                    "end": 11,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 11
                        }
                    }
                },
                "operator": "*",
                "start": 6,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            },
            "start": 0,
            "end": 11,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 11
                }
            }
        }
    ],
    "start": 0,
    "end": 11,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 11
        }
    }
}],
  ['throw {}', 'throw {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ThrowStatement",
            "argument": {
                "type": "ObjectExpression",
                "properties": [],
                "start": 6,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            },
            "start": 0,
            "end": 8,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 8
                }
            }
        }
    ],
    "start": 0,
    "end": 8,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 8
        }
    }
}]
];

pass('Declarations - Throw (pass)', valids);

});
