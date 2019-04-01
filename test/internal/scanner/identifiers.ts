import * as t from 'assert';
import { Context } from '../../../src/common';
import { Token } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';

describe('lexer - identifiers', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const state = create(opts.source);
      const token = scanSingleToken(state, opts.ctx);
      t.deepEqual(
        {
          token,
          value: state.tokenValue,
          index: state.index
        },
        {
          token: opts.token,
          value: opts.value,
          index: opts.index
        }
      );
    });
  }

  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const state = create(source);
      t.throws(() => scanSingleToken(state, context));
    });
  }

  fail('fails on a🀒c', 'a🀒c', Context.Empty);
  fail('fails on a😍c', 'a😍c', Context.Empty);

  pass('scan identifier with russian letter - backslash start', {
    source: '\\u044D',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'э',
    raw: '\\u044D',
    newline: false,
    index: 6
  });

  pass('scan identifier with russian letter - backslash start', {
    source: '\\u0431',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'б',
    raw: '\\u0431',
    index: 6
  });

  pass('scan identifier with russian letter - backslash start', {
    source: '\\u044D',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'э',
    raw: '\\u044D',
    index: 6
  });

  pass('scan identifier with russian letter - backslash start', {
    source: 'a𐊧123',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'a𐊧123',
    raw: '\\u044D',
    index: 6
  });

  pass('scan identifier with russian letter - backslash start', {
    source: 'название',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'название',
    raw: '\\u044D',
    index: 8
  });
  pass('scan identifier with russian letter - backslash start', {
    source: 'a123',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'a123',
    raw: '\\u044D',
    index: 4
  });
  pass('scan chinese escaped identifier', {
    source: '\\u{4fff}',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: '俿',
    raw: '\\u{4fff}',
    index: 8
  });
  pass('scan chinese escaped identifier', {
    source: '\\u{4fff}',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: '俿',
    raw: '\\u{4fff}',
    index: 8
  });
  pass('scan identifier with crazy letter - backslash start', {
    source: 'a\\u{0000000000000000000071}c',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'aqc',
    raw: 'a\\u{0000000000000000000071}c',
    index: 28
  });

  pass('scan identifier with new line', {
    source: 'foo\n',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'foo',
    raw: 'foo',
    index: 3
  });
  pass('scan identifier with new line', {
    source: 'foo\n',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'foo',
    raw: 'foo',
    index: 3
  });
  pass('scan identifier with carriage return', {
    source: 'foo\r',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'foo',
    raw: 'foo',
    index: 3
  });

  pass('scan identifier tab', {
    source: 'foo\t',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'foo',
    raw: 'foo',
    index: 3
  });

  pass('scan not a keyword', {
    source: 'CAN_NOT_BE_A_KEYWORD',
    ctx: Context.Empty,
    token: Token.Identifier,
    value: 'CAN_NOT_BE_A_KEYWORD',
    raw: 'CAN_NOT_BE_A_KEYWORD',
    index: 20
  });

  pass('scan identifier with backslash middle', {
    source: 't\\u0061rget',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'target',
    raw: 't\\u0061rget',
    index: 11
  });

  pass('scan identifier with backslash middle', {
    source: 't\\u0061rget',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'target',
    raw: 't\\u0061rget',
    newline: false,
    index: 11
  });

  pass('scan "yield" contextual keyword', {
    source: 'yield',
    ctx: Context.OptionsNext,
    token: Token.YieldKeyword,
    value: 'yield',
    raw: 'yield',
    newline: false,
    index: 5
  });

  pass('scan uppercase and ignore whitespace at the end', {
    source: 'A ',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'A',
    raw: 'A',
    newline: false,
    index: 1
  });

  pass('scan uppercase and skip whitespace at the begining', {
    source: ' A',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'A',
    raw: 'A',
    newline: false,
    index: 2
  });

  pass('scan upper and lower case letter', {
    source: 'eF',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'eF',
    raw: 'eF',
    newline: false,
    index: 2
  });

  pass('scan identifier with crazy letter - backslash start', {
    source: 'a\\u{0000000000000000000071}c',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'aqc',
    raw: 'a\\u{0000000000000000000071}c',
    newline: false,
    index: 28
  });

  pass('scan identifier with new line', {
    source: 'foo\n',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'foo',
    raw: 'foo',
    octalPos: undefined,
    octalMessage: undefined,
    newline: false,
    line: 1,
    column: 3,
    start: 0,
    index: 3
  });

  pass('scan identifier with carriage return', {
    source: 'foo\r',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'foo',
    raw: 'foo',
    octalPos: undefined,
    octalMessage: undefined,
    newline: false,
    line: 1,
    column: 3,
    start: 0,
    index: 3
  });

  pass('scan identifier tab', {
    source: 'foo\t',
    ctx: Context.OptionsNext,
    token: Token.Identifier,
    value: 'foo',
    raw: 'foo',
    octalPos: undefined,
    octalMessage: undefined,
    newline: false,
    line: 1,
    column: 3,
    start: 0,
    index: 3
  });
});
