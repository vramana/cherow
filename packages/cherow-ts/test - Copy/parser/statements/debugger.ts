import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - Debugger', () => {

  describe('Failure', () => {

      fail('(debugger);', Context.Empty, {
          source: '(debugger);',
      });
  });

  describe('Pass', () => {
  });

});
