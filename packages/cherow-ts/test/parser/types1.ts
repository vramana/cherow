import { pass } from '../test-utils';
import { Context } from '../../../cherow/src/utilities';
import * as t from 'assert';
import { parse } from '../../../cherow/src/parser/parser';

describe('Types', () => {

  pass(`simple let + identifier`, Context.Empty, {
    source: `let arr`,
    expected: {
        "body": [
          {
            "declarations": [
              {
               "id": {
                  "name": "arr",
                  "type": "Identifier",
                },
                "init": null,
                "type": "VariableDeclarator",
              },
            ],
            "kind": "let",
            "type": "VariableDeclaration",
          },
        ],
        "sourceType": "script",
        "type": "Program",
      }
  });

});
