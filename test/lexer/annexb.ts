import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
describe('Lexer - AnnexB', () => {

  function pass(name: string, opts: any): void {
      it(name, () => {
          const state = new State(opts.source, undefined, undefined);
          nextToken(state, Context.Empty);
          t.deepEqual({
              index: state.index,
              line: state.line,
              column: state.column,
          },          {
              line: opts.line,
              index: opts.index,
              column: opts.column
          }, );
      });
  }

  pass('should single line HTML close comment where the LineTerminatorSequence within is paragraph separator', {
      source: `counter \u2028-->a`,
      line: 1,
      column: 7,
      index: 7
  });

  pass('should single line HTML close comment where the LineTerminatorSequence within is line separator', {
      source: `counter \u2029-->a`,
      line: 1,
      column: 7,
      index: 7
  });

  pass('should single line HTML close comment where the LineTerminatorSequence within is unicode', {
      source: `counter
-->a \u2028`,
      line: 1,
      column: 7,
      index: 7
  });

  pass('A single line delimited comment should correctly parses an HTML comment', {
      source: `/*

      */ --> This is a comment`,
      line: 2,
      column: 30,
      index: 34
  });

  pass('Should skip a HTML open comment', {
      source: `<!--`,
      line: 1,
      column: 4,
      index: 4
  });

  pass('Should skip a HTML close comment', {
      source: `-->`,
      line: 1,
      column: 3,
      index: 3
  });

  pass('Should skip a HTML close comment with newline', {
      source: `\n  -->`,
      line: 2,
      column: 5,
      index: 6
  });

  pass('Should skip a HTML close comment with newline', {
      source: `\n  -->`,
      line: 2,
      column: 5,
      index: 6
  });

});
