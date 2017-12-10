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

    fail(`/./sis`, {
        source: '/./sis',
        next: true
    });

    fail(`/./sis`, {
        source: '/./sis',
        next: true
    });

    fail(`var x = /[\u0063-b]/u;`, {
        source: 'var x = /[\u0063-b]/u;',
        next: true
    });

    fail(`var x = /[\f\n\r]/u;`, {
        source: 'var x = /[\n\r]/u;',
        next: true
    });

    fail(`var x = /[\u{63}-b]/u;`, {
        source: 'var x = /[\u{63}-b]/u;',
        next: true
    });

    fail(`/./yiy`, {
        source: '/./yiy',
        next: true
    });

    fail(`var regExp =  /[\u2028]/`, {
      source: 'var regExp =  /[\u2028]/',
  });

    fail(`/./uu`, {
        source: '/./uu',
        next: true
    });

    fail(`var re = //;`, {
        source: 'var re = //;',
    });

    pass(`var x = /[\u{61}-b][\u0061-b][a-\u{62}][a-\u0062]\u{1ffff}/u;`, {
        source: 'var x = /[\u{61}-b][\u0061-b][a-\u{62}][a-\u0062]\u{1ffff}/u;',
        expected: {
              "body": [
                {
                  "declarations": [
                    {
                      "id": {
                        "name": "x",
                        "type": "Identifier"
                      },
                      "init": {
                        "regex": {
                          "flags": "u",
                          "pattern": "[a-b][a-b][a-b][a-b]🿿"
                        },
                        "type": "Literal",
                        "value": /[a-b][a-b][a-b][a-b]🿿/u
                      },
                     "type": "VariableDeclarator"
                    }
                  ],
                  "kind": "var",
                  "type": "VariableDeclaration"
                },
              ],
              "sourceType": "script",
              "type": "Program"
            }
    });

    pass(`var x = /=([^=\s])+/g`, {
        source: 'var x = /=([^=\s])+/g',
        expected: {
              "body": [
                {
                  "declarations": [
                    {
                      "id": {
                        "name": "x",
                        "type": "Identifier"
                      },
                      "init": {
                        "regex": {
                          "flags": "g",
                          "pattern": "=([^=s])+",
                        },
                        "type": "Literal",
                        "value": /=([^=s])+/g,
                      },
                      "type": "VariableDeclarator"
                    }
                  ],
                  "kind": "var",
                  "type": "VariableDeclaration"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            }
    });

    pass(`var x = /[x-z]/i`, {
        source: 'var x = /[x-z]/i',
        expected: {
              "body": [
                {
                  "declarations": [
                    {
                      "id": {
                        "name": "x",
                        "type": "Identifier"
                      },
                      "init": {
                        "regex": {
                          "flags": "i",
                          "pattern": "[x-z]",
                        },
                        "type": "Literal",
                        "value": /[x-z]/i,
                     },
                      "type": "VariableDeclarator"
                    }
                  ],
                  "kind": "var",
                  "type": "VariableDeclaration"
               }
              ],
              "sourceType": "script",
              "type": "Program"
            }
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