import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - DotAll', () => {

    it('should fail and report as unterminated regExp on duplicate DotAll without "next" option enabled', () => {
        expect(() => {
            parseScript(`/./ss;`);
        }).to.throw('Unexpected regular expression flag');
    });

    it('should fail correctly on duplicate DotAll flag with "next" option enabled', () => {
        expect(() => {
            parseScript(`/./ss;`, {
                next: true
            });
        }).to.throw('Duplicate flags supplied to RegExp constructor s');
    });

    it('should parse correctly with DotAll flag', () => {
        expect(parseScript(`/foo.bar/su.test('foo');`, {
            ranges: true,
            locations: true,
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "Literal",
                                "value": null,
                                "regex": {
                                    "pattern": "foo.bar",
                                    "flags": "su"
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
                                },
                                "raw": "/foo.bar/su"
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "test",
                                "start": 12,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "start": 0,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        "arguments": [
                            {
                                "type": "Literal",
                                "value": "foo",
                                "start": 17,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                },
                                "raw": "'foo'"
                            }
                        ],
                        "start": 0,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        }
                    },
                    "start": 0,
                    "end": 24,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 24
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 24,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 24
                }
            }
        });
    });
});