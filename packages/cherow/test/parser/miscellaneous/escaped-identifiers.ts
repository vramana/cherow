import { pass } from '../../test-utils';
import { Context } from '../../../src/common';

describe('Miscellaneous - Escaped identifiers', () => {

    describe('Pass', () => {

      pass(`var \\u{1EE00}_$`, Context.Empty, {
        source: `var \\u{1EE00}_$`,
        expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [
              {
                  "type": "VariableDeclaration",
                  "kind": "var",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "init": null,
                          "id": {
                              "type": "Identifier",
                              "name": "𞸀_$"
                          }
                      }
                  ]
              }
          ]
      }
      });

      pass(`var \\u{1EE03}_$`, Context.Empty, {
        source: `var \\u{1EE03}_$`,
        expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [
              {
                  "type": "VariableDeclaration",
                  "kind": "var",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "init": null,
                          "id": {
                              "type": "Identifier",
                              "name": "𞸃_$"
                          }
                      }
                  ]
              }
          ]
      }
      });

        pass(`var \\u{1EE06}_$`, Context.Empty, {
            source: `var \\u{1EE06}_$`,
            expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [
                  {
                      "type": "VariableDeclaration",
                      "kind": "var",
                      "declarations": [
                          {
                              "type": "VariableDeclarator",
                              "init": null,
                              "id": {
                                  "type": "Identifier",
                                  "name": "𞸆_$"
                              }
                          }
                      ]
                  }
              ]
          }

        });
    });
});
