import { parse, parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

// Create a new plugin

function plugin(value: any) {
    return (parser: any) => {
        parser.parseLiteral = function(context: any) {
            const pos = this.getLocations();
            this.nextToken(context);
            return this.finishNode(context, pos, {
                type: 'Literal',
                value
            });
        };
    };
}

// Parse with the new plugin enabled

describe('Plugins - Literal node with pre-defined value', () => {

    it('should create a new type of literal node', () => {
        expect(parseModule(`1`, {
            ranges: true,
            raw: true,
            locations: true,
            plugins: [plugin(123)]
        })).to.eql({
            "body": [{
                "end": 1,
                "expression": {
                    "end": 1,
                    "loc": {
                        "end": {
                            "column": 1,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "start": 0,
                    "type": "Literal",
                    "value": 123,
                },
                "loc": {
                    "end": {
                        "column": 1,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    },
                },
                "start": 0,
                "type": "ExpressionStatement",
            }],
            "end": 1,
            "loc": {
                "end": {
                    "column": 1,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                }
            },
            "sourceType": "module",
            "start": 0,
            "type": "Program"
        });
    });
});