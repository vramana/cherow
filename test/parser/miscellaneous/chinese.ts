import { pass } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Miscellaneous - Chinese', () => {

  describe('Failure', () => {});

  describe('Pass', () => {

      pass(`class 𢭃 { /* 𢭃 */ }`, Context.Empty, {
          source: 'class 𢭃 { /* 𢭃 */ }',
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