import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { CommentTypes } from '../../src/lexer/comments';

describe("Lexer - OnComment", () => {

  function pass(name: string, opts: any) {
      it(name, () => {
          const state = new State(opts.source, undefined, () => {});
          nextToken(state, Context.Empty);
          if (state.commentType !== undefined) {
              t.deepEqual({
                  type: CommentTypes[state.commentType & 0xFF],
                  value: state.source.slice(state.commentStart, state.commentType >> 24),
                  line: state.line,
                  column: state.column,
              }, {
                  type: opts.type,
                  value: opts.value,
                  line: opts.line,
                  column: opts.column
              }, );
          }
      });
  }

  pass('should skip singleline comment', {
      source: '// foo',
      value: ' foo',
      type: 'SingleLine',
      line: 1,
      column: 6,
  });

  pass('should skip multiline comment', {
      source: '/** foo */',
      value: '* foo ',
      type: 'MultiLine',
      line: 1,
      column: 10,
  });

  pass('should skip HTMLCommentClose comment', {
    source: '--> foo',
    "type": "HTMLClose",
    "value": " foo",
    line: 1,
    column: 7,
  });

  pass('should skip HTMLCommentOpen comment', {
    source: '<!-- foo',
    "type": "HTMLOpen",
    "value": " foo",
    line: 1,
    column: 8,
  });

});
