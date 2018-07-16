import * as t from 'assert';
import { scanPrivateName } from '../../src/lexer/common';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - Private name', () => {

  function pass(name: string, opts: any) {
      it(name, () => {
          const state = new State(opts.source, undefined, undefined);
          t.deepEqual({
              token: scanPrivateName(state, Context.InClass),
              line: state.line,
              value: state.tokenValue,
              column: state.column,
              index: state.index,
          },          {
              token: Token.Hash,
              line: opts.line,
              value: opts.value,
              column: opts.column,
              index: opts.index
          }, );
      });
  }

  function fail(name: string, context: Context, opts: any) {
      it(name, () => {
          const state = new State(opts.source, undefined, undefined);
          t.throws(() => {
              scanPrivateName(state, context);
          });
      });
  }

  fail('should fail on private name followed by space', Context.InClass, {
      source: '# a'
  });

  fail('should fail on private name with multiple space', Context.InClass, {
      source: '#    a'
  });

  fail('should fail on private name with digits', Context.InClass, {
      source: '#123'
  });

  fail('should fail on private name with underscore', Context.InClass, {
      source: '#_a'
  });

  fail('should fail on private name with underscore', Context.InClass, {
      source: '#_a'
  });

  pass('should accept private name followed by identifier', {
      source: '#a',
      value: 'a',
      line: 1,
      column: 2,
      index: 2
  });

  pass('should accept private name followed by identifier', {
      source: '#abc',
      value: 'abc',
      line: 1,
      column: 4,
      index: 4
  });

  pass('should accept private name followed by identifier', {
      source: '#AbC',
      value: 'AbC',
      line: 1,
      column: 4,
      index: 4
  });
});
