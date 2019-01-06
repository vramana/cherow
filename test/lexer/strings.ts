import * as t from 'assert';
import { hasNext, scan } from '../../src/scanner';
import { fromCodePoint } from '../../src/scanner/common';
import { Context } from '../../src/common';
import { create } from '../../src/state';
import { Token } from '../../src/token';

describe('Lexer - string literal', () => {
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
          const state = create(isEnd ? opts.source : `${opts.source} `, undefined);

          t.deepEqual(
            {
              token: scan(state, context),
              hasNext: hasNext(state),
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
          const state = create(isEnd ? opts.source : `${opts.source} `, undefined);

          t.deepEqual(
            {
              token: scan(state, context | Context.Strict),
              hasNext: hasNext(state),
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
    test(`${name} (with raw, has next)`, Context.OptionsRaw, false);
    test(`${name} (normal, end)`, Context.Empty, true);
    test(`${name} (with raw, end)`, Context.OptionsRaw, true);
  }

  function fail(name: string, source: string, strict?: boolean) {
    function test(name: string, context: Context, isEnd: boolean) {
      it(name, () => {
        if (strict !== true) {
          const state = create(isEnd ? source : `${source} `, undefined);
          t.throws(() => {
            scan(state, context);
          });
        }

        if (strict !== false) {
          const state = create(isEnd ? source : `${source} `, undefined);
          t.throws(() => {
            scan(state, context | Context.Strict);
          });
        }
      });
    }

    test(`${name} (normal, has next)`, Context.Empty, false);
    test(`${name} (with raw, has next)`, Context.OptionsRaw, false);
    test(`${name} (normal, end)`, Context.Empty, true);
    test(`${name} (with raw, end)`, Context.OptionsRaw, true);
  }

  fail("forbidden newlines '\\n'", "'\n'");
  fail('forbidden newlines "\\n"', '"\n"');
  fail("forbidden newlines '\\r'", "'\r'");
  fail('forbidden newlines "\\r"', '"\r"');
  fail('unterminated string', "'");
  fail('unterminated string', '"');
  fail('unterminated string with paragraph separator', '"\u2029');
  fail('unterminated string with line separator', '"\u2028');
  fail('numeric-separator-literal', '"\\u{1F_639}"');
  fail(':: HexDigit :: 1', '"\\u11"');
  fail('Legacy octal escape eequence in strict mode', '"\\08"', true);

  pass("empty string ''", {
    source: "''",
    value: '',
    raw: "''",
    line: 1,
    column: 2
  });

  pass("with newline ''\\n'", {
    source: "'\\n'",
    value: '\n',
    raw: "'\\n'",
    line: 1,
    column: 4
  });

  pass("with newline ''\\r'", {
    source: "'\\r'",
    value: '\r',
    raw: "'\\r'",
    line: 1,
    column: 4
  });

  pass("with newline ''\\r\\n'", {
    source: "'\\r\\n'",
    value: '\r\n',
    raw: "'\\r\\n'",
    line: 1,
    column: 6
  });

  pass("with newline ''\\n\\r'", {
    source: "'\\n\\r'",
    value: '\n\r',
    raw: "'\\n\\r'",
    line: 1,
    column: 6
  });

  pass('empty string ""', {
    source: '""',
    value: '',
    raw: '""',
    line: 1,
    column: 2
  });

  pass("simple string - single quote 'abc'", {
    source: "'abc'",
    value: 'abc',
    raw: "'abc'",
    line: 1,
    column: 5
  });

  pass('simple string - double quote "abc"', {
    source: '"abc"',
    value: 'abc',
    raw: '"abc"',
    line: 1,
    column: 5
  });

  pass("number - single quote '123'", {
    source: "'123'",
    value: '123',
    raw: "'123'",
    line: 1,
    column: 5
  });

  pass('number - double quote "123"', {
    source: '"123"',
    value: '123',
    raw: '"123"',
    line: 1,
    column: 5
  });

  // Keep an explosion of tests down.
  (() => {
    const enum Chars {
      EnglishUpperA = 0x41,
      EnglishUpperZ = 0x5a,
      EnglishLowerA = 0x61,
      EnglishLowerZ = 0x7a,
      RussianUpperА = 0x410,
      RussianUpperЯ = 0x42f,
      RussianUpperЁ = 0x401,
      RussianLowerА = 0x430,
      RussianLowerЯ = 0x44f,
      RussianLowerЁ = 0x451,
      Zero = 0x30,
      Nine = 0x39
    }

    function attemptPart(
      message: string,
      raw: string,
      value: string,
      source: string,
      isEnd: boolean,
      context: Context,
      strict?: boolean
    ) {
      let m = message;
      if (strict !== true) {
        const state = create(source, undefined);

        t.deepEqual(
          {
            token: scan(state, context),
            hasNext: hasNext(state),
            value: state.tokenValue,
            raw: context & Context.OptionsRaw ? state.tokenRaw : undefined,
            line: state.line,
            column: state.column
          },
          {
            token: Token.StringLiteral,
            hasNext: !isEnd,
            value,
            raw: context & Context.OptionsRaw ? raw : undefined,
            line: 1,
            column: raw.length
          }
        );
      }

      if (strict !== false) {
        const state = create(source, undefined);

        t.deepEqual(
          {
            token: scan(state, context | Context.Strict),
            hasNext: hasNext(state),
            value: state.tokenValue,
            raw: context & Context.OptionsRaw ? state.tokenRaw : undefined,
            line: state.line,
            column: state.column
          },
          {
            token: Token.StringLiteral,
            hasNext: !isEnd,
            value,
            raw: context & Context.OptionsRaw ? raw : undefined,
            line: 1,
            column: raw.length
          }
        );
      }
    }

    function testCharPart(desc: string, raw: string, value: string, strict?: boolean) {
      attemptPart(`${desc} (normal, has next)`, raw, value, `${raw} `, false, Context.Empty, strict);
      attemptPart(`${desc} (with raw, has next)`, raw, value, `${raw} `, false, Context.OptionsRaw, strict);
      attemptPart(`${desc} (normal, end)`, raw, value, raw, true, Context.Empty, strict);
      attemptPart(`${desc} (with raw, end)`, raw, value, raw, true, Context.OptionsRaw, strict);
    }

    function testChar(code: number): void {
      const letter = String.fromCharCode(code);

      testCharPart(`'${letter}'`, `'${letter}'`, letter);
      testCharPart(`"${letter}"`, `"${letter}"`, letter);
    }

    it('scans English capitals', () => {
      for (let code = Chars.EnglishUpperA; code <= Chars.EnglishUpperZ; code++) {
        testChar(code);
      }
    });

    it('scans English small', () => {
      for (let code = Chars.EnglishLowerA; code <= Chars.EnglishLowerZ; code++) {
        testChar(code);
      }
    });

    it('scans Russian capitals', () => {
      for (let code = Chars.RussianUpperА; code <= Chars.RussianUpperЯ; code++) {
        testChar(code);
      }
      testChar(Chars.RussianUpperЁ);
    });

    it('scans Russian small', () => {
      for (let code = Chars.RussianLowerА; code <= Chars.RussianLowerЯ; code++) {
        testChar(code);
      }
      testChar(Chars.RussianLowerЁ);
    });

    it('scans digits', () => {
      for (let code = Chars.Zero; code < Chars.Nine; code++) {
        testChar(code);
      }
    });

    function testEscapedChar(code: number): void {
      const letter = String.fromCharCode(code);
      testCharPart(`'\\${letter}'`, `'\\${letter}'`, letter);
    }

    it('scans redundantly escaped English capitals', () => {
      for (let code = Chars.EnglishUpperA; code < Chars.EnglishUpperZ; code++) {
        testEscapedChar(code);
      }
    });

    it('scans redundantly escaped English small', () => {
      const magicSmall = [...('bfnrtvxu' as any)].map(c => c.charCodeAt(0));
      for (let code = Chars.EnglishLowerA; code < Chars.EnglishLowerZ; code++) {
        if (magicSmall.indexOf(code) < 0) testEscapedChar(code);
      }
    });

    it('scans redundantly escaped Russian capitals', () => {
      for (let code = Chars.RussianUpperА; code < Chars.RussianUpperЯ; code++) {
        testEscapedChar(code);
      }
      testEscapedChar(Chars.RussianUpperЁ);
    });

    it('scans redundantly escaped Russian small', () => {
      for (let code = Chars.RussianLowerА; code < Chars.RussianLowerЯ; code++) {
        testEscapedChar(code);
      }
      testEscapedChar(Chars.RussianLowerЁ);
    });

    context('scans ASCII escapes', () => {
      function getHex(code: number): string {
        if (code < 0x10) return `0${code.toString(16)}`;
        return code.toString(16);
      }

      it('scans \\x00 - \\xff', () => {
        for (let code = 0x00; code < 0xff; code++) {
          const ch = String.fromCharCode(code);
          const escape = `\\x${getHex(code)}`;
          testCharPart(`'${escape}'`, `'${escape}'`, ch);
          testCharPart(`"${escape}"`, `"${escape}"`, ch);
        }
      });

      it('scans \\x00 - \\xFF', () => {
        for (let code = 0x00; code < 0xff; code++) {
          const ch = String.fromCharCode(code);
          const escape = `\\x${getHex(code).toUpperCase()}`;
          testCharPart(`'${escape}'`, `'${escape}'`, ch);
          testCharPart(`"${escape}"`, `"${escape}"`, ch);
        }
      });

      fail("doesn't scan '\\x0g'", "'\\x0g'");
      fail("doesn't scan '\\xg0'", "'\\xg0'");
      fail("doesn't scan '\\xgg'", "'\\xgg'");
      fail("doesn't scan '\\xfg'", "'\\xfg'");
    });

    context('Unicode escapes', () => {
      function readEscape(code: number): string {
        if (code < 0x10) return `\\u000${code.toString(16)}`;
        if (code < 0x100) return `\\u00${code.toString(16)}`;
        if (code < 0x1000) return `\\u0${code.toString(16)}`;
        return `\\u${code.toString(16)}`;
      }

      for (let i = 0; i < 4; i++) {
        const start = i << 8;
        const end = start | 0xff;

        const startStr = readEscape(start);
        const endStr = readEscape(end);

        it(`scans ${startStr} - ${endStr}`, () => {
          for (let code = start; code < end; code++) {
            const ch = String.fromCharCode(code);
            const escape = readEscape(code);
            testCharPart(`'${escape}'`, `'${escape}'`, ch);
            testCharPart(`"${escape}"`, `"${escape}"`, ch);
          }
        });
      }

      for (let i = 4; i <= 0xff; i++) {
        const start = i << 8;
        const end = start | 0xff;

        const startStr = readEscape(start);
        const endStr = readEscape(end);
      }

      fail("doesn't scan '\\u000g'", "'\\u000g'");
      fail("doesn't scan '\\u00g0'", "'\\u00g0'");
      fail("doesn't scan '\\u0g00'", "'\\u0g00'");
      fail("doesn't scan '\\ug000'", "'\\ug000'");
      fail("doesn't scan '\\ugggg'", "'\\ugggg'");
      fail("doesn't scan '\\ufffg'", "'\\ufffg'");

      fail("doesn't scan '\\u1'", "'\\u1'");
      fail("doesn't scan '\\uA'", "'\\uA'");

      fail("doesn't scan '\\u11'", "'\\u11'");
      fail("doesn't scan '\\uAA'", "'\\uAA'");

      fail("doesn't scan '\\u111'", "'\\u111'");
      fail("doesn't scan '\\uAAA'", "'\\uAAA'");

      function checkNot5(source: string, code: number, letter: string) {
        pass(`scans '${source}'`, {
          source: `'${source}'`,
          value: String.fromCharCode(code) + letter,
          raw: `'${source}'`,
          line: 1,
          column: 9
        });

        pass(`scans "${source}"`, {
          source: `"${source}"`,
          value: String.fromCharCode(code) + letter,
          raw: `"${source}"`,
          line: 1,
          column: 9
        });
      }

      checkNot5('\\u0001F', 1, 'F');
      checkNot5('\\u0002E', 2, 'E');
      checkNot5('\\u0003D', 3, 'D');
      checkNot5('\\u0004C', 4, 'C');
      checkNot5('\\u0005B', 5, 'B');
      checkNot5('\\u0006A', 6, 'A');
      checkNot5('\\u00079', 7, '9');
      checkNot5('\\u00088', 8, '8');
      checkNot5('\\u00097', 9, '7');
      checkNot5('\\u000A6', 10, '6');
      checkNot5('\\u000B5', 11, '5');
      checkNot5('\\u000C4', 12, '4');
      checkNot5('\\u000D3', 13, '3');
      checkNot5('\\u000E2', 14, '2');
      checkNot5('\\u000F1', 15, '1');
    });

    context('legacy octal', () => {
      function assertError(message: string, func: () => void) {
        try {
          func();
        } catch (e) {
          if (!(e instanceof SyntaxError)) {
            t.fail('{message}: Expected {actual} to be a SyntaxError', {
              message,
              actual: e,
              expected: SyntaxError
            });
          }
        }
      }

      function attemptFailPart(message: string, source: string, context: Context, strict?: boolean) {
        if (strict !== true) {
          const state = create(source, undefined);
          assertError(message, () => {
            scan(state, context);
          });
        }

        if (strict !== false) {
          const state = create(source, undefined);
          assertError(message, () => {
            scan(state, context | Context.Strict);
          });
        }
      }

      function failCharPart(desc: string, raw: string, value: string, strict: boolean) {
        let m = value;
        attemptFailPart(`${desc} (normal, has next)`, `${raw} `, Context.Empty, strict);
        attemptFailPart(`${desc} (with raw, has next)`, `${raw} `, Context.OptionsRaw, strict);
        attemptFailPart(`${desc} (normal, end)`, raw, Context.Empty, strict);
        attemptFailPart(`${desc} (with raw, end)`, raw, Context.OptionsRaw, strict);
      }

      it('scans \\0 - \\7 (with possible leading zeroes)', () => {
        for (let code = 0; code <= 6; code++) {
          const ch = fromCodePoint(code);

          const escape0 = `\\${code}`;
          testCharPart(`'${escape0}'`, `'${escape0}'`, ch, false);
          testCharPart(`"${escape0}"`, `"${escape0}"`, ch, false);
          if (code !== 0) {
            failCharPart(`'${escape0}'`, `'${escape0}'`, ch, true);
            failCharPart(`"${escape0}"`, `"${escape0}"`, ch, true);
          }

          const escape1 = `\\0${code}`;
          testCharPart(`'${escape1}'`, `'${escape1}'`, ch, false);
          testCharPart(`"${escape1}"`, `"${escape1}"`, ch, false);
          failCharPart(`'${escape1}'`, `'${escape1}'`, ch, true);
          failCharPart(`"${escape1}"`, `"${escape1}"`, ch, true);

          const escape2 = `\\00${code}`;
          testCharPart(`'${escape2}'`, `'${escape2}'`, ch, false);
          testCharPart(`"${escape2}"`, `"${escape2}"`, ch, false);
          failCharPart(`'${escape2}'`, `'${escape2}'`, ch, true);
          failCharPart(`"${escape2}"`, `"${escape2}"`, ch, true);
        }
      });

      it('scans \\10 - \\77 (with possible leading zeroes)', () => {
        for (let code = 0o10; code <= 0o77; code++) {
          const ch = fromCodePoint(code);
          const escape0 = `\\${code.toString(8)}`;
          testCharPart(`'${escape0}'`, `'${escape0}'`, ch, false);
          testCharPart(`"${escape0}"`, `"${escape0}"`, ch, false);
          failCharPart(`'${escape0}'`, `'${escape0}'`, ch, true);
          failCharPart(`"${escape0}"`, `"${escape0}"`, ch, true);

          const escape1 = `\\0${code.toString(8)}`;
          testCharPart(`'${escape1}'`, `'${escape1}'`, ch, false);
          testCharPart(`"${escape1}"`, `"${escape1}"`, ch, false);
          failCharPart(`'${escape1}'`, `'${escape1}'`, ch, true);
          failCharPart(`"${escape1}"`, `"${escape1}"`, ch, true);
        }
      });

      it('scans \\100 - \\377 (with possible leading zeroes)', () => {
        for (let code = 0o100; code <= 0o377; code++) {
          const ch = fromCodePoint(code);
          const escape = `\\${code.toString(8)}`;
          testCharPart(`'${escape}'`, `'${escape}'`, ch, false);
          testCharPart(`"${escape}"`, `"${escape}"`, ch, false);
          failCharPart(`'${escape}'`, `'${escape}'`, ch, true);
          failCharPart(`"${escape}"`, `"${escape}"`, ch, true);
        }
      });
    });
  })();

  fail("doesn't scan '\\'", "'\\'");
  fail('doesn\'t scan "\\"', '"\\"');

  fail("doesn't scan '\\\\\\'", "'\\\\\\'");
  fail('doesn\'t scan "\\\\\\"', '"\\\\\\"');

  pass("scans '\\b'", {
    source: "'\\b'",
    value: '\b',
    raw: "'\\b'",
    line: 1,
    column: 4
  });

  pass('scans "\\b"', {
    source: '"\\b"',
    value: '\b',
    raw: '"\\b"',
    line: 1,
    column: 4
  });

  pass("scans '\\t'", {
    source: "'\\t'",
    value: '\t',
    raw: "'\\t'",
    line: 1,
    column: 4
  });

  pass('scans "\\t"', {
    source: '"\\t"',
    value: '\t',
    raw: '"\\t"',
    line: 1,
    column: 4
  });

  pass("scans '\\n'", {
    source: "'\\n'",
    value: '\n',
    raw: "'\\n'",
    line: 1,
    column: 4
  });

  pass('scans "\\n"', {
    source: '"\\n"',
    value: '\n',
    raw: '"\\n"',
    line: 1,
    column: 4
  });

  pass("scans '\\v'", {
    source: "'\\v'",
    value: '\v',
    raw: "'\\v'",
    line: 1,
    column: 4
  });

  pass('scans "\\v"', {
    source: '"\\v"',
    value: '\v',
    raw: '"\\v"',
    line: 1,
    column: 4
  });

  pass("scans '\\f'", {
    source: "'\\f'",
    value: '\f',
    raw: "'\\f'",
    line: 1,
    column: 4
  });

  pass('scans "\\f"', {
    source: '"\\f"',
    value: '\f',
    raw: '"\\f"',
    line: 1,
    column: 4
  });

  pass("scans '\\r'", {
    source: "'\\r'",
    value: '\r',
    raw: "'\\r'",
    line: 1,
    column: 4
  });

  pass('scans "\\r"', {
    source: '"\\r"',
    value: '\r',
    raw: '"\\r"',
    line: 1,
    column: 4
  });

  pass("scans '\\\"'", {
    source: "'\\\"'",
    value: '"',
    raw: "'\\\"'",
    line: 1,
    column: 4
  });

  pass('scans "\\""', {
    source: '"\\""',
    value: '"',
    raw: '"\\""',
    line: 1,
    column: 4
  });

  pass("scans '\\''", {
    source: "'\\''",
    value: "'",
    raw: "'\\''",
    line: 1,
    column: 4
  });

  pass('scans "\\\'"', {
    source: '"\\\'"',
    value: "'",
    raw: '"\\\'"',
    line: 1,
    column: 4
  });

  pass("scans '\"'", {
    source: "'\"'",
    value: '"',
    raw: "'\"'",
    line: 1,
    column: 3
  });

  pass('scans "\'"', {
    source: '"\'"',
    value: "'",
    raw: '"\'"',
    line: 1,
    column: 3
  });

  fail("doesn't scan '\\1'", "'\\1'", true);
  fail('doesn\'t scan "\\1"', '"\\1"', true);

  fail("doesn't scan '\\7'", "'\\7'", true);
  fail('doesn\'t scan "\\7"', '"\\7"', true);

  pass("scans '\\0'", {
    source: "'\\0'",
    value: '\0',
    raw: "'\\0'",
    line: 1,
    column: 4
  });

  pass('scans "\\0"', {
    source: '"\\0"',
    value: '\0',
    raw: '"\\0"',
    line: 1,
    column: 4
  });

  pass("scans '\\u180E'", {
    source: "'\u180E'",
    value: '\u180E',
    raw: "'\u180E'",
    line: 1,
    column: 3
  });

  pass('scans "\\u180E"', {
    source: '"\u180E"',
    value: '\u180E',
    raw: '"\u180E"',
    line: 1,
    column: 3
  });
});
