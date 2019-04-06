import * as t from 'assert';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

describe('Lexer - String', () => {
  const tokens: Array<[Context, Token, string, string]> = [
    [Context.Empty, Token.StringLiteral, '"foo"', 'foo'],
    [Context.Empty, Token.StringLiteral, '"foo "', 'foo '],
    [Context.Empty, Token.StringLiteral, '"foo "', 'foo '],
    [Context.Empty, Token.StringLiteral, '"f1o2o"', 'f1o2o'],
    [Context.Empty, Token.StringLiteral, '"دیوانه"', 'دیوانه'],
    [Context.Empty, Token.StringLiteral, '"a℮"', 'a℮'],
    [Context.Empty, Token.StringLiteral, '"℘"', '℘'],
    [Context.Empty, Token.StringLiteral, '"a᧚"', 'a᧚'],
    [Context.Empty, Token.StringLiteral, '"a\\n"', 'a\n'],
    [Context.Empty, Token.StringLiteral, '"foo\\tbar"', 'foo\tbar'],
    [Context.Empty, Token.StringLiteral, '"\\u0001"', '\u0001'],
    [Context.Empty, Token.StringLiteral, '"\\x55"', 'U'],
    [Context.Empty, Token.StringLiteral, '"\\x55a"', 'Ua'],
    [Context.Empty, Token.StringLiteral, '"a\\nb"', 'a\nb'],
    [Context.Empty, Token.StringLiteral, '";"', ';'],
    [Context.Empty, Token.StringLiteral, '"\\r"', '\r'],
    [Context.Empty, Token.StringLiteral, '""', ''],
    [Context.Empty, Token.StringLiteral, '"123"', '123'],
    [Context.Empty, Token.StringLiteral, '"true"', 'true'],

    // Russian letters
    [Context.Empty, Token.StringLiteral, '"\\б"', 'б'],

    // Escaped letters
    [Context.Empty, Token.StringLiteral, '"\\b"', '\b'],
    [Context.Empty, Token.StringLiteral, '"\\v"', '\v'],
    [Context.Empty, Token.StringLiteral, '"\\t"', '\t'],
    [Context.Empty, Token.StringLiteral, '"\\f"', '\f'],
    [Context.Empty, Token.StringLiteral, '"\\j"', 'j'],
    [Context.Empty, Token.StringLiteral, '"\\A"', 'A'],
    [Context.Empty, Token.StringLiteral, '"\\t"', '\t'],
    [Context.Empty, Token.StringLiteral, '"\\fsuffix"', '\fsuffix'],
    [Context.Empty, Token.StringLiteral, '"\\Rsuffix"', 'Rsuffix'],
    [Context.Empty, Token.StringLiteral, '"prefix\\r\\n"', 'prefix\r\\n'],

    // Unicode escape sequence

    [Context.Empty, Token.StringLiteral, '"\\u1000"', 'က'],
    [Context.Empty, Token.StringLiteral, '"\\uf2ff"', ''],
    [Context.Empty, Token.StringLiteral, '"\\u0041"', 'A'],
    [Context.Empty, Token.StringLiteral, '"\\uf2ff"', ''],
    [Context.Empty, Token.StringLiteral, '"\\u0123"', 'ģ'],
    [Context.Empty, Token.StringLiteral, '"\\u0123 postfix"', 'ģ postfix'],
    [Context.Empty, Token.StringLiteral, '"\\u{89abc}"', 'Ȧʼ'],
    [Context.Empty, Token.StringLiteral, '"\\u{CDEF}"', '췯'],
    [Context.Empty, Token.StringLiteral, '"\\u{0000000000000000000010ffff}"', 'пϿ'],
    [Context.Empty, Token.StringLiteral, '"\\u{10ffff}"', 'пϿ'],
    [Context.Empty, Token.StringLiteral, '"\\u0062"', 'b'],
    [Context.Empty, Token.StringLiteral, '"\\u0410"', 'А'],
    [Context.Empty, Token.StringLiteral, '"\\u0412"', 'В'],
    [Context.Empty, Token.StringLiteral, '"\\u0419"', 'Й'],
    [Context.Empty, Token.StringLiteral, '"\\u042E"', 'Ю'],
    [Context.Empty, Token.StringLiteral, '"\\u0432"', 'в'],
    [Context.Empty, Token.StringLiteral, '"\\u0030"', '0'],
    [Context.Empty, Token.StringLiteral, '"\\u0035"', '5'],
    [Context.Empty, Token.StringLiteral, '"\\u0003"', '\u0003'],
    [Context.Empty, Token.StringLiteral, '"\\u180E"', '᠎'],

    // Escaped hex

    [Context.Empty, Token.StringLiteral, '"\\x01F"', '\u0001F'],
    [Context.Empty, Token.StringLiteral, '"\\x05B"', '\u0005B'],
    [Context.Empty, Token.StringLiteral, '"\\x0D3"', '\r3'],
    [Context.Empty, Token.StringLiteral, '"\\x088"', '\b8'],
    [Context.Empty, Token.StringLiteral, '"\\x34"', '4'],
    [Context.Empty, Token.StringLiteral, '"\\xCd"', 'Í'],
    [Context.Empty, Token.StringLiteral, '"\\xF0"', 'ð'],
    [
      Context.Empty,
      Token.StringLiteral,
      '"\\xF000111FEEEDDAAAB77777999344BBBCCD0"',
      'ð00111FEEEDDAAAB77777999344BBBCCD0'
    ],
    [Context.Empty, Token.StringLiteral, '"\\x128"', '\u00128'],
    [Context.Empty, Token.StringLiteral, '"\\xCd#"', 'Í#'],
    [Context.Empty, Token.StringLiteral, '"\\xDe\\x00"', 'Þ\\x00'],
    [Context.Empty, Token.StringLiteral, '"\\0x0061"', '\u0000x0061'],
    [Context.Empty, Token.StringLiteral, '"\\x41"', 'A'],
    [Context.Empty, Token.StringLiteral, '"\\x4A"', 'J'],
    [Context.Empty, Token.StringLiteral, '"\\x4F"', 'O'],
    [Context.Empty, Token.StringLiteral, '"\\x69"', 'i'],

    // Escaped octals
    [Context.Empty, Token.StringLiteral, '"\\01"', '\u0001'],
    [Context.Empty, Token.StringLiteral, '"\\023"', '\u0013'],
    [Context.Empty, Token.StringLiteral, '"\\04"', '\u0004'],
    [Context.Empty, Token.StringLiteral, '"\\44444444444"', '$444444444'],
    [Context.Empty, Token.StringLiteral, '"\\777777"', '?7777'],
    [Context.Empty, Token.StringLiteral, '"\\052"', '*'],
    [Context.Empty, Token.StringLiteral, '"\\08"', '\u00008'],
    [Context.Empty, Token.StringLiteral, '"\\7"', '\u0007'],
    [Context.Empty, Token.StringLiteral, '"\\052"', '*'],
    [Context.Empty, Token.StringLiteral, '"Hello\\nworld"', 'Hello\nworld'],
    [Context.Empty, Token.StringLiteral, '"Hello\\312World"', 'HelloÊWorld'],
    [Context.Empty, Token.StringLiteral, '"Hello\\712World"', 'Hello92World'],
    [Context.Empty, Token.StringLiteral, '"Hello\\1World"', 'Hello\u0001World'],
    [Context.Empty, Token.StringLiteral, '"Hello\\02World"', 'Hello\u0002World'],
    [Context.Empty, Token.StringLiteral, '"\\46"', '&'],
    [Context.Empty, Token.StringLiteral, '"\\5*"', '\u0005*'],
    [Context.Empty, Token.StringLiteral, '"\\10"', '\b'],
    [Context.Empty, Token.StringLiteral, '"\\02"', '\u0002'],
    [Context.Empty, Token.StringLiteral, '"\\02a"', '\u0002a'],
    [Context.Empty, Token.StringLiteral, '"\\02a"', '\u0002a'],
    [Context.Empty, Token.StringLiteral, '"\\73"', ';'],
    [Context.Empty, Token.StringLiteral, '"\\62a"', '2a'],
    [Context.Empty, Token.StringLiteral, '"\\023"', '\u0013'],
    [Context.Empty, Token.StringLiteral, '"\\7"', '\u0007'],
    [Context.Empty, Token.StringLiteral, '"\\012"', '\n'],
    [Context.Empty, Token.StringLiteral, '"\\126"', 'V'],
    [Context.Empty, Token.StringLiteral, '"\\302"', 'Â'],
    [Context.Empty, Token.StringLiteral, '"\\000"', '\u0000'],
    [Context.Empty, Token.StringLiteral, '"\\104"', 'D'],
    [Context.Empty, Token.StringLiteral, '"\\221"', '']
  ];

  for (const [ctx, token, op, value] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const state = create(op);
      const found = scanSingleToken(state, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: state.index < state.source.length,
          value: state.tokenValue,
          index: state.index
        },
        {
          token: token,
          hasNext: false,
          value,
          index: op.length
        }
      );
    });

    it(`scans '${op}' with more to go`, () => {
      const state = create(`${op} `);
      const found = scanSingleToken(state, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: state.index < state.source.length,
          value: state.tokenValue,
          index: state.index
        },
        {
          token: token,
          hasNext: true,
          value,
          index: op.length
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

  fail('fails on "\\9999"', '"\\9999"', Context.Empty);
  fail('fails on "\\08"', '"\\08"', Context.Strict);
  fail('fails on "\\1"', '"\\1"', Context.Strict);
  fail('fails on "foo', '"foo', Context.Empty);
  fail('fails on "foo', '"foo', Context.Empty);
  fail('fails on "\\u{1F_639}"', '"\\u{1F_639}"', Context.OptionsNext);
  fail('fails on "\\u007Xvwxyz"', '"\\u007Xvwxyz"', Context.OptionsNext);
  fail('fails on "abc\\u{}"', '"abc\\u{}"', Context.OptionsNext);
  fail('fails on "abc\\u}"', '"abc\\u}"', Context.OptionsNext);
  fail('fails on "abc\\u{', '"abc\\u{"', Context.OptionsNext);
  fail('fails on "\\u{70bc"', '"\\u{70bc"', Context.OptionsNext);
  fail('fails on "\\u{70"', '"\\u{70"', Context.OptionsNext);
  fail('fails on "\\u{!"', '"\\u{!"', Context.Empty);
  fail('fails on "\\u"', '"\\u"', Context.Empty);
  fail('fails on "\\8"', '"\\8"', Context.Empty);
  fail('fails on "\\9', '"\\9"', Context.Empty);
  fail('fails on "\\"', '"\\"', Context.Empty);
  fail('fails on "\\u{10401"', '"\\u{10401"', Context.Empty);
  fail('fails on "\\u{110000}"', '"\\u{110000}"', Context.Empty);
  fail('fails on "\\u0x11ffff"', '"\\u0x11ffff"', Context.Empty);
  fail('fails on "\\xCq"', '"\\xCq"', Context.Empty);
  fail('fails on "\\x"', '"\\x"', Context.Empty);
  fail('fails on "\\xb"', '"\\xb"', Context.Empty);
  fail('fails on "\\uxxxxλ"', '"\\uxxxxλ"', Context.Empty);
  fail('fails on "\\u0fail"', '"\\u0fail"', Context.Empty);
  fail('fails on "\\uab"', '"\\uab"', Context.Empty);
  fail('fails on "\\uab"', '"\\uab"', Context.Empty);
  fail('fails on "\\u{0fail}"', '"\\u{0fail}"', Context.Empty);
  fail('fails on "\\u{xxxx}"', '"\\u{xxxx}"', Context.Empty);
  fail('fails on "\\u{12345"', '"\\u{12345"', Context.Empty);
  fail('fails on "\\u{123"', '"\\u{123"', Context.Empty);
  fail('fails on "\\u{110000}"', '"\\u{110000}"', Context.Empty);
  fail('fails on "\\u{00000000000000000000110000}"', '"\\u{00000000000000000000110000}"', Context.Empty);
  fail('fails on "\\7"', '"\\7"', Context.Strict);
  fail('fails on "\\7\\\n"', '"\\7\\\n"', Context.Strict);
  fail('fails on "\\008"', '"\\008"', Context.Strict);
  fail('fails on "\\012"', '"\\012"', Context.Strict);
  fail('fails on "\\x4"', '"\\x4"', Context.Empty);
  fail('fails on "\\6"', '"\\6"', Context.Strict);
  fail('fails on "\\8"', '"\\8"', Context.Strict);
  fail('fails on "\\9b"', '"\\9b"', Context.Strict);
  fail('fails on "\\9b"', '"\\9b"', Context.Empty);
  fail('fails on "\\1"', '"\\1"', Context.Strict);
  fail('fails on "\\01"', '"\\01"', Context.Strict);
  fail('fails on "\\21"', '"\\21"', Context.Strict);
  fail('fails on "\\10r"', '"\\10r"', Context.Strict);
  fail('fails on "\\21e"', '"\\21e"', Context.Strict);
  fail('fails on "\\10"', '"\\10"', Context.Strict);
  fail('fails on "\\012"', '"\\012"', Context.Strict);
  fail('fails on "\\126"', '"\\126"', Context.Strict);
  fail('fails on "\\324"', '"\\324"', Context.Strict);
  fail('fails on "\\x9"', '"\\x9"', Context.Empty);
  fail('fails on "\\xb"', '"\\xb"', Context.Empty);
  fail('fails on "\\xf"', '"\\xf"', Context.Empty);
  fail('fails on "\\x0"', '"\\x0"', Context.Empty);
  fail('fails on "\\x1"', '"\\x1"', Context.Empty);
  fail('fails on "\\xb"', '"\\xb"', Context.Empty);
  fail('fails on "\\xF"', '"\\xF"', Context.Empty);
  fail('fails on "\\x"', '"\\x"', Context.Empty);
  fail('fails on "\\x"', '"\\x"', Context.Empty);
  fail('fails on "\\x"', '"\\x"', Context.Empty);
  fail('fails on "\\x"', '"\\x"', Context.Empty);
  fail('fails on "\\xq7"', '"\\xq7"', Context.Empty);
  fail('fails on "\\xqf"', '"\\xqf"', Context.Empty);
  fail('fails on "\\xbq"', '"\\xbq"', Context.Empty);
  fail('fails on "\\xAq"', '"\\xAq"', Context.Empty);
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
});
