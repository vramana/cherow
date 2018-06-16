import * as t from 'assert';
import { pass } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser'
describe('Statements - While', () => {

  describe('Failure', () => {

    const invalidSyntax = [
        `while 1 break;`,
        'while 0 break;',
        `while 'hood' break;`,
        `while (false) async function* g() {}`,
       // `while (false) label1: label2: function f() {}`,

    ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }
  });
       pass('while (foo) function () {};', Context.OptionsEditorMode, {
            source: 'while (foo) function () {};',
            expected: {
                "body": [
                 {
                    "body": {
                      "async": false,
                      "body": {
                        "body": [],
                        "type": "BlockStatement",
                      },
                      "expression": false,
                      "generator": false,
                      "id": null,
                      "params": [],
                      "type": "FunctionDeclaration",
                    },
                    "test": {
                      "name": "foo",
                      "type": "Identifier",
                   },
                    "type": "WhileStatement",
                  },
                  {
                    "type": "EmptyStatement",
                  },
                ],
                "sourceType": "script",
                "type": "Program"
              }
       });
});
