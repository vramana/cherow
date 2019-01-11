import * as t from 'assert';
import { next } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';

describe('Lexer - Identifiers', () => {
  describe('Identifiers', () => {
    context('script', () => run(false));
    context('module', () => run(true));
  });

  function run(isModule: boolean) {
    interface Opts {
      source: string;
      value: any;
      hasNext: boolean;
      line: number;
      column: number;
    }

    function pass(name: string, opts: Opts) {
      it(name, () => {
        const state = create(opts.source, undefined);
        const found = next(state, Context.Empty);
        t.deepEqual(
          {
            value: state.tokenValue,
            hasNext: state.index < state.length,
            line: state.line,
            column: state.column
          },
          {
            value: opts.value,
            hasNext: opts.hasNext,
            line: opts.line,
            column: opts.column
          }
        );
      });
    }

    pass('scan one char identifier', {
      value: 'a',
      source: 'a',
      hasNext: false,
      line: 1,
      column: 1
    });

    pass('scan two char identifier', {
      value: 'ab',
      source: 'ab',
      hasNext: false,
      line: 1,
      column: 2
    });

    pass('scan two char identifier with underscore', {
      value: 'a_b',
      source: 'a_b',
      hasNext: false,
      line: 1,
      column: 3
    });

    pass('scan double underscore', {
      value: '__',
      source: '__',
      hasNext: false,
      line: 1,
      column: 2
    });

    pass('scan dollar start', {
      value: '$_',
      source: '$_',
      hasNext: false,
      line: 1,
      column: 2
    });

    pass('scan double dollar', {
      value: '$$',
      source: '$$',
      hasNext: false,
      line: 1,
      column: 2
    });

    pass('scan uppercase', {
      value: 'F',
      source: 'F',
      hasNext: false,
      line: 1,
      column: 1
    });

    pass('scan uppercase and ignore whitespace', {
      value: 'A',
      source: 'A ',
      hasNext: true,
      line: 1,
      column: 1
    });

    pass('scan uppercase and skip whitespace at the begining', {
      value: 'A',
      source: ' A',
      hasNext: false,
      line: 1,
      column: 2
    });

    pass('scan upper and lower case letter', {
      value: 'eF',
      source: 'eF',
      hasNext: false,
      line: 1,
      column: 2
    });

    pass('scan dollar + char', {
      value: '$d',
      source: '$d',
      hasNext: false,
      line: 1,
      column: 2
    });

    pass('scan one identifier and skip following identifiers and punctuators with space', {
      value: 'Hello',
      source: 'Hello, Fred Kleuver. Have you skipped any whitespace?',
      hasNext: true,
      line: 1,
      column: 5
    });

    if (isModule) {
    }
  }
});
