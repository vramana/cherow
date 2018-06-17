import { parseScript } from './../../../src/parser/parser';
import * as t from 'assert';
import { pass } from '../../test-utils';
import { Context } from '../../../src/common';

describe.skip('Miscellaneous - Chinese', () => {

  describe('Failure', () => {});

  describe('Pass', () => {

    pass(`class 𢭃 { /* 𢭃 */ }`, Context.Empty, {
      source: 'class 𢭃 { /* 𢭃 */ }',
      expected: {}
    });

      pass(`function 𢭃() { /* 𢭃 */ }`, Context.Empty, {
          source: 'function 𢭃() { /* 𢭃 */ }',
          expected: {
              body: [{
                  body: {
                      body: [],
                      type: 'ClassBody'
                  },
                  id: {
                      name: '𢭃',
                      type: 'Identifier',
                  },
                  superClass: null,
                  type: 'ClassDeclaration',
              }, ],
              sourceType: 'script',
              type: 'Program',
          }
      });

  });
});
