import * as t from 'assert';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

describe('Lexer - Template', () => {
  describe('Lexer - Template Tail', () => {
    const tokens: Array<[Context, Token, string, string]> = [
      [Context.Empty, Token.TemplateTail, '``', ''],
      [Context.Empty, Token.TemplateTail, '`a`', 'a'],
      [Context.Empty, Token.TemplateTail, '`foo `', 'foo '],
      [Context.Empty, Token.TemplateTail, '`foo `', 'foo '],
      [Context.Empty, Token.TemplateTail, '`f1o2o`', 'f1o2o'],
      [Context.Empty, Token.TemplateTail, '`دیوانه`', 'دیوانه'],
      [Context.Empty, Token.TemplateTail, '`a℮`', 'a℮'],
      [Context.Empty, Token.TemplateTail, '`℘`', '℘'],
      [Context.Empty, Token.TemplateTail, '`a᧚`', 'a᧚'],
      [Context.Empty, Token.TemplateTail, '`foo\\tbar`', 'foo\tbar'],
      // [Context.Empty, Token.TemplateTail, '`\\x55a`', 'U'],
      [Context.Empty, Token.TemplateTail, '`a\\nb`', 'a\nb'],
      [Context.Empty, Token.TemplateTail, '`;`', ';'],
      [Context.Empty, Token.TemplateTail, '``', ''],
      [Context.Empty, Token.TemplateTail, '`123`', '123'],
      [Context.Empty, Token.TemplateTail, '`true`', 'true'],
      [Context.Empty, Token.TemplateTail, '`$$$a}`', '$$$a}'],

      // Russian letters
      [Context.Empty, Token.TemplateTail, '`\\б`', 'б']

      // Unicode escape sequence - classic

      //    [Context.Empty, Token.TemplateTail, '`\\u1000`', 'က'],
      //[Context.Empty, Token.TemplateTail, '`\\u0041`', 'A'],
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
  });

  describe('Lexer - Template Span', () => {
    const tokens: Array<[Context, Token, string, string]> = [
      [Context.Empty, Token.TemplateSpan, '`${`', ''],
      [Context.Empty, Token.TemplateSpan, '`$$${`', '$$'],
      [Context.Empty, Token.TemplateSpan, '`$$${a}`', '$$']
    ];

    for (const [ctx, token, op, value] of tokens) {
      it(`scans '${op}' at the end`, () => {
        const state = create(op);
        const found = scanSingleToken(state, ctx);

        t.deepEqual(
          {
            token: found,
            value: state.tokenValue
          },
          {
            token: token,
            value
          }
        );
      });
    }
  });

  describe('Lexer - Tagged Template', () => {
    const tokens: Array<[Context, Token, string, string | void]> = [
      [Context.TaggedTemplate, Token.TemplateTail, '`\\u{70bc`', undefined],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\7${', undefined],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\1${', undefined],
      [Context.TaggedTemplate, Token.TemplateSpan, "`'${", "'"],
      [Context.TaggedTemplate, Token.TemplateSpan, '`"${', '"'],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\`${', '`'],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\`${', '`'],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\r`', '\r'],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\f${', '\f'],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\f`', '\f'],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\v${', '\v'],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\n${', '\n'],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\n`', '\n'],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\b${', '\b'],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\t`', '\t'],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\u{11ffff}${', undefined],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\u{11ffff}`', undefined],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\u{11ffff}${', undefined],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\u{110000}${', undefined],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\u{g0g}`', undefined],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\u{0g}${', undefined],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\u{g0}`', undefined],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\u{g}${', undefined],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\u{g}`', undefined],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\u{g}`', undefined],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\x0g`', undefined],
      [Context.TaggedTemplate, Token.TemplateSpan, '`\\x0g${', undefined],
      [Context.TaggedTemplate, Token.TemplateTail, '`\\xg0`', undefined]
    ];

    for (const [ctx, token, op, value] of tokens) {
      it(`scans '${op}' at the end`, () => {
        const state = create(op);
        const found = scanSingleToken(state, ctx);

        t.deepEqual(
          {
            token: found,
            value: state.tokenValue
          },
          {
            token: token,
            value
          }
        );
      });
    }
  });

  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const state = create(source);
      t.throws(() => scanSingleToken(state, context));
    });
  }

  fail('fails on "\\9999"', '"\\9999"', Context.Empty);
  fail('fails on "foo', '"foo', Context.Empty);
  fail('fails on "\\u007"', '"\\u007"', Context.OptionsNext);
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
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
  fail('fails on "\\xFq"', '"\\xFq"', Context.Empty);
  fail('fails on "`\\u{11ffff}${"', '`\\u{11ffff}${', Context.Empty);
  fail('fails on "`\\u{110000}${"', '`\\u{110000}${', Context.Empty);
  fail('fails on "`\\u{g}`"', '`\\u{g}`', Context.Empty);
  fail('fails on "`\\u{g}`"', '`\\u11${', Context.Empty);
  fail('fails on "`\\u{g}`"', '`\\uAA`', Context.Empty);
  fail('fails on "`\\u{g}`"', '`\\ufffg${', Context.Empty);
  fail('fails on "\\u00g0"', '`\\u00g0`', Context.Empty);
  fail('fails on "`\\u{g}`"', '`\\xgg`', Context.Empty);
  fail('fails on "`\\u{g}`"', '`\\xg0`', Context.Empty);
  fail('fails on "`\\u{g}`"', '`\\x0g`', Context.Empty);
});
