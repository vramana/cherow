import * as t from 'assert';
import { Context } from '../../../src/common';
import { Token } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';

const acorn = require('acorn');

describe('lexer - identifiers', () => {
  function pass(
    name: string,
    opts: {
      source: string;
      value: string;
      raw: string;
      line: number;
      column: number;
      strict?: boolean;
    }
  ) {
    function test(name: string, context: Context, isEnd: boolean) {
      it(name, () => {
        if (opts.strict !== true) {
          const state = create(isEnd ? opts.source : `${opts.source} `);

          t.deepEqual(
            {
              token: scanSingleToken(state, context),
              hasNext: state.index < state.length,
              value: state.tokenValue,
              raw: context & Context.OptionsRaw ? state.tokenRaw : undefined,
              line: state.line,
              column: state.column
            },
            {
              token: Token.StringLiteral,
              hasNext: !isEnd,
              value: opts.value,
              raw: context & Context.OptionsRaw ? opts.raw : undefined,
              line: opts.line,
              column: opts.column
            }
          );
        }

        if (opts.strict !== false) {
          const state = create(isEnd ? opts.source : `${opts.source} `);

          t.deepEqual(
            {
              token: scanSingleToken(state, context | Context.Strict),
              hasNext: state.index < state.length,
              value: state.tokenValue,
              raw: context & Context.OptionsRaw ? state.tokenRaw : undefined,
              line: state.line,
              column: state.column
            },
            {
              token: Token.StringLiteral,
              hasNext: !isEnd,
              value: opts.value,
              raw: context & Context.OptionsRaw ? opts.raw : undefined,
              line: opts.line,
              column: opts.column
            }
          );
        }
      });
    }

    test(`${name} (normal, has next)`, Context.Empty, false);
    //test(`${name} (with raw, has next)`, Context.OptionsRaw, false);
    //test(`${name} (normal, end)`, Context.Empty, true);
    //test(`${name} (with raw, end)`, Context.OptionsRaw, true);
  }

  function fail(name: string, source: string, strict?: boolean) {
    function test(name: string, context: Context, isEnd: boolean) {
      it(name, () => {
        if (strict !== true) {
          const state = create(isEnd ? source : `${source} `);
          t.throws(() => {
            scanSingleToken(state, context);
          });
        }

        if (strict !== false) {
          const state = create(isEnd ? source : `${source} `);
          t.throws(() => {
            scanSingleToken(state, context | Context.Strict);
          });
        }
      });
    }

    test(`${name} (normal, has next)`, Context.Empty, false);
    //   test(`${name} (with raw, has next)`, Context.OptionsRaw, false);
    // test(`${name} (normal, end)`, Context.Empty, true);
    //test(`${name} (with raw, end)`, Context.OptionsRaw, true);
  }

  //  fail("forbidden newlines '\\n'", "'\n'");
  //  fail('forbidden newlines "\\n"', '"\n"');

  pass("empty string ''", {
    source: "''",
    value: '',
    raw: '',
    line: 1,
    column: 0
  });

  pass("with newline ''\\n'", {
    source: "'\\n'",
    value: '\n',
    raw: "'\\n'",
    line: 1,
    column: 0
  });

  pass("with newline ''\\r'", {
    source: "'\\r'",
    value: '\r',
    raw: '',
    line: 1,
    column: 0
  });

  pass("simple string - single quote 'abc'", {
    source: "'abc'",
    value: 'abc',
    raw: '',
    line: 1,
    column: 0
  });

  pass('simple string - double quote "abc"', {
    source: '"abc"',
    value: 'abc',
    raw: '',
    line: 1,
    column: 0
  });

  pass("number - single quote '123'", {
    source: "'123'",
    value: '123',
    raw: '',
    line: 1,
    column: 0
  });

  pass('number - double quote "123"', {
    source: '"123"',
    value: '123',
    raw: '',
    line: 1,
    column: 0
  });

  it('lexer - identifiers', () => {});
  '\\b';
  pass("scans '\\b'", {
    source: "'\b'",
    value: '\b',
    raw: '',
    line: 1,
    column: 0
  });

  pass('scans "\\b"', {
    source: '"\\b"',
    value: '\b',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\t'", {
    source: "'\\t'",
    value: '\t',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\u1000'", {
    source: "'\u1000'",
    value: 'က',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\A'", {
    source: "'A'",
    value: 'A',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\a'", {
    source: "'a'",
    value: 'a',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\uf2ff'", {
    source: "'\uf2ff'",
    value: '',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\u1000'", {
    source: "'\\u1000'",
    value: 'က',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\u1000'", {
    source: "'\\08'",
    value: '\u00008',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\u0041'", {
    source: "'\\u0041'",
    value: 'A',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\u0046'", {
    source: "'\\u0046'",
    value: 'F',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\u004C'", {
    source: "'\\u004C'",
    value: 'L',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\u004C'", {
    source: "'\\u005A'",
    value: 'Z',
    raw: '',
    line: 1,
    column: 0
  });

  //console.log(acorn.parse("'\\x01F'").body)
  /*
  pass("scans '\u004C'", {
    source: "'\\x01F'",
    value: "\u0001F",
    raw: "",
    line: 1,
    column: 0
  });*/

  pass("scans '\\u0412'", {
    source: "'\\u0412'",
    value: 'В',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\u0412'", {
    source: "'\\u0412'",
    value: 'В',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\j'", {
    source: "'\\j'",
    value: 'j',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\б'", {
    source: "'\\б'",
    value: 'б',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\x01F'", {
    source: "'\\x01F'",
    value: '\u0001F',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\x05B'", {
    source: "'\\x05B'",
    value: '\u0005B',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\x0D3'", {
    source: "'\\x0D3'",
    value: '\r3',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\x0F1'", {
    source: "'\\x0F1'",
    value: '\u000f1',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\x088'", {
    source: "'\\x088'",
    value: '\b8',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\x088'", {
    source: "'\\000045678'",
    value: '\u0000045678',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\u0412'", {
    source: "'\
    '",
    value: '    ',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\u180E'", {
    source: "'\\u180E'",
    value: '᠎',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\u004C'", {
    source: "'\\7'",
    value: '\u0007',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans '\\052'", {
    source: "'\\052'",
    value: '*',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans 'Hello\nworld'", {
    source: "'Hello\\nworld'",
    value: 'Hello\nworld',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans 'Hello\\312World'", {
    source: "'Hello\\312World'",
    value: 'HelloÊWorld',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans 'Hello\\712World'", {
    source: "'Hello\\712World'",
    value: 'Hello92World',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans 'Hello\\1World'", {
    source: "'Hello\\1World'",
    value: 'Hello\u0001World',
    raw: '',
    line: 1,
    column: 0
  });

  pass("scans 'Hello\\02World'", {
    source: "'Hello\\02World'",
    value: 'Hello\u0002World',
    raw: '',
    line: 1,
    column: 0
  });
});
