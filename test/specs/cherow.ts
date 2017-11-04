import { parseScript, parseModule } from '../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Cherow', () => {

    it.skip('should fail on "let foo = [do 3+4, 5+6];"', () => {
        expect(() => {
            parseScript('let foo = [do 3+4, 5+6];', { v8: true });
        }).to.throw();
    });
var esprima = require('esprima').parse;

    it('should parse conditional', () => {
        expect(parseScript(`
        function *a(a) {
            (b) => {   };
        }
    `, {
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "a"
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "ArrowFunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "Identifier",
                                            "name": "b"
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                }
                            }
                        ]
                    },
                    "generator": true,
                    "expression": false,
                    "async": false
                }
            ],
            "sourceType": "script"
        });
    });
});