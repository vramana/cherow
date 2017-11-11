import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Unicode', () => {

    it('should fail if no digits', () => {
        expect(() => {
            parseScript('\\u{}');
        }).to.throw();
    });

    it('should fail if out of range', () => {
        expect(() => {
            parseScript('\\u{125400}');
        }).to.throw();
    });

    it('should parse "var source = "\\u{00000000034}";"', () => {
        expect(parseScript('var source = "\\u{00000000034}";', {
            raw: true,
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "Literal",
                        "value": "4",
                        "raw": "\"\\u{00000000034}\""
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "source"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse "\\u{714E}\\u{8336}"', () => {
        expect(parseScript('"\\u{714E}\\u{8336}"', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "expression": {
                    "type": "Literal",
                    "start": 0,
                    "end": 18,
                    "value": "煎茶",
                    "raw": "\"\\u{714E}\\u{8336}\""
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "\\u{20BB7}\\u{91CE}\\u{5BB6}"', () => {
        expect(parseScript('"\\u{20BB7}\\u{91CE}\\u{5BB6}"', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 27,
                "expression": {
                    "type": "Literal",
                    "start": 0,
                    "end": 27,
                    "value": "𠮷野家",
                    "raw": "\"\\u{20BB7}\\u{91CE}\\u{5BB6}\""
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "\\u{1EE00}"', () => {
        expect(parseScript('\\u{1EE00}', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                },
                "expression": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 9,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    },
                    "name": "𞸀"
                }
            }],
            "sourceType": "script"
        });
    });
});