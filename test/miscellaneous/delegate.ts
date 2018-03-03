import { pass, fail } from '../test-utils';
import * as t from 'assert';

describe('Miscellaneous - Walk', () => {
    let delegate: any = [];
    pass('answer = 42', {
        source: 'answer = 42',
        delegate: function(node: any) {},
        expected: {
              "body": [
                {
                  "expression": {
                    "left": {
                      "name": "answer",
                      "type": "Identifier",
                    },
                    "operator": "=",
                    "right": {
                      "type": "Literal",
                      "value": 42,
                    },
                    "type": "AssignmentExpression",
                  },
                  "type": "ExpressionStatement",
                },
              ],
              "sourceType": "script",
              "type": "Program"
            }
    });
});