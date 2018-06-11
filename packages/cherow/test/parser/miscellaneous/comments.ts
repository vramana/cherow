import { parseScript } from './../../../src/parser/parser';
import * as t from 'assert';
import { pass } from '../../test-utils';
import { Context } from '../../../src/common';

describe('Miscellaneous - Comments', () => {

  pass('hello // ', Context.Empty, {
      source: `hello //`,
      expected: {
          "body": [{
              "expression": {
                  "name": "hello",
                  "type": "Identifier",
              },
              "type": "ExpressionStatement",
          }, ],
          "sourceType": "script",
          "type": "Program",
      }
  });

  pass('function foo() { /* hello */ }', Context.Empty, {
      source: `0/*\n*/ // fkleuver`,
      expected: {
          "body": [{
              "expression": {
                  "type": "Literal",
                  "value": 0,
              },
              "type": "ExpressionStatement",
          }, ],
          "sourceType": "script",
          "type": "Program"
      }
  });

  // HTML edge case
  pass('0/*\n*/--> fkleuver', Context.Empty, {
      source: `0/*\n*/ // fkleuver`,
      expected: {
          "body": [{
              "expression": {
                  "type": "Literal",
                  "value": 0,
              },
              "type": "ExpressionStatement",
          }, ],
          "sourceType": "script",
          "type": "Program"
      }

  });

});
