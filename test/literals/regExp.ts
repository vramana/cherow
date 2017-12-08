import { pass, fail } from '../utils';

describe('Literals - RegExp', () => {

    fail(`/./gig;`, {
        source: '/./gig;',
    });

    fail(`/\\n\\r`, {
        source: '/\\n\\r',
    });

    fail(`/\\2028`, {
        source: '/\\2028',
    });

    fail(`/./mm;`, {
        source: '/./mm;',
    });

    fail(`/./sis`, {
        source: '/./sis',
        next: true
    });

    fail(`var re = //;`, {
        source: 'var re = //;',
    });

    pass(`/(?:)/\u0067`, {
        source: '/(?:)/\u0067',
        expected: {
            "body": [{
                "expression": {
                    "regex": {
                        "flags": "g",
                        "pattern": "(?:)"
                    },
                    "type": "Literal",
                    "value": /(?:)/g,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`/}?/u`, {
        source: '/}?/u',
        expected: {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": null,
                    "regex": {
                        "pattern": "}?",
                        "flags": "u"
                    }
                }
            }],
            "sourceType": "script"
        }
    });

    pass(`/(?:)/gi;`, {
        source: '/(?:)/gi;',
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 8,
                  "value": /(?:)/gi,
                  "raw": "/(?:)/gi",
                  "regex": {
                    "pattern": "(?:)",
                    "flags": "gi"
                  }
                }
              }
            ],
            "sourceType": "script"
          }
    });


    pass(`/(?:)/m`, {
        source: '/(?:)/m',
        ranges: true,
        raw: true,
        expected: {
              "body": [
               {
                  "end": 7,
                  "expression": {
                    "end": 7,
                    "raw": "/(?:)/m",
                    "regex": {
                      "flags": "m",
                      "pattern": "(?:)",
                    },
                    "start": 0,
                    "type": "Literal",
                    "value": /(?:)/m,
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 7,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });
});