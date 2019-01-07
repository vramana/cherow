import { next } from '../../src/scanner';
import { fromCodePoint } from '../../src/scanner/common';
import { Context } from '../../src/common';
import { create } from '../../src/state';
import { Token } from '../../src/token';
import * as assert from 'clean-assert';

describe('Lexer - Template literal', () => {
  interface TestResult {
    token: Token;
    hasNext: boolean;
    value: string | void;
    raw: string | void;
    line: number;
    column: number;
  }

  function makeTest<O extends { source: string; strict?: boolean }>(
    ...tests: Array<(opts: O, token: Token, isEnd: boolean, strict: boolean) => [Context, TestResult | void]>
  ) {
    return (name: string, opts: O) => {
      const token = opts.source.slice(-1) === '`' ? Token.TemplateTail : Token.TemplateCont;

      function execList(source: string, isEnd: boolean, isStrict: boolean) {
        for (const test of tests) {
          const state = create(source, undefined);
          const [context, result] = test(opts, token, isEnd, isStrict);
          const actual = isStrict ? context | Context.Strict : context;

          if (result != null) {
            assert.match<TestResult>(
              {
                token: next(state, actual),
                hasNext: state.index < state.length,
                value: state.tokenValue,
                raw: state.tokenRaw,
                line: state.line,
                column: state.column
              },
              result
            );
          } else {
            assert.throws(SyntaxError, () => {
              next(state, actual);
            });
          }
        }
      }

      it(`${name} (has next)`, () => {
        const source = `${opts.source} `;
        if (opts.strict !== true) execList(source, false, false);
        if (opts.strict !== false) execList(source, false, true);
      });

      it(`${name} (end)`, () => {
        const source = opts.source;
        if (opts.strict !== true) execList(source, true, false);
        if (opts.strict !== false) execList(source, true, true);
      });
    };
  }

  interface PassOpts {
    source: string;
    value: string | void;
    raw: string;
    line: number;
    column: number;
    strict?: boolean;
  }

  interface PassTaggedOpts {
    source: string;
    raw: string;
    line: number;
    column: number;
    strict?: boolean;
  }

  interface FailOpts {
    source: string;
    strict?: boolean;
  }

  const passTagged = makeTest<PassTaggedOpts>(
    (opts, token, isEnd) => [
      Context.TaggedTemplate,
      {
        token,
        hasNext: !isEnd,
        value: undefined,
        raw: opts.raw,
        line: opts.line,
        column: opts.column
      }
    ],
    () => [Context.Empty, undefined]
  );

  const pass = makeTest<PassOpts>((opts, token, isEnd) => [
    Context.Empty,
    {
      token,
      hasNext: !isEnd,
      value: opts.value,
      raw: opts.raw,
      line: opts.line,
      column: opts.column
    }
  ]);

  const fail = makeTest<FailOpts>(() => [Context.Empty, undefined]);

  fail("doesn't scan `", { source: '`' });

  pass('scans ``', {
    source: '``',
    value: '',
    raw: '',
    line: 1,
    column: 2
  });

  pass('scans `${', {
    source: '`${',
    value: '',
    raw: '',
    line: 1,
    column: 3
  });

  pass('scans `\\n`', {
    source: '`\n`',
    value: '\n',
    raw: '\n',
    line: 2,
    column: 1
  });

  pass('scans `\\n${', {
    source: '`\n${',
    value: '\n',
    raw: '\n',
    line: 2,
    column: 2
  });

  pass('scans `abc`', {
    source: '`abc`',
    value: 'abc',
    raw: 'abc',
    line: 1,
    column: 5
  });

  pass('scans `abc${', {
    source: '`abc${',
    value: 'abc',
    raw: 'abc',
    line: 1,
    column: 6
  });

  pass('scans `123`', {
    source: '`123`',
    value: '123',
    raw: '123',
    line: 1,
    column: 5
  });

  pass('scans `123${', {
    source: '`123${',
    value: '123',
    raw: '123',
    line: 1,
    column: 6
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
      Nine = 0x39,

      Backtick = 0x60
    }

    function attemptPart(
      message: string,
      source: string,
      value: string | void,
      raw: string,
      column: number,
      strict?: boolean
    ) {
      let adsf = message;
      const context = value != null ? Context.Empty : Context.TaggedTemplate;
      const token = source.charCodeAt(column - 1) === Chars.Backtick ? Token.TemplateTail : Token.TemplateCont;

      if (strict !== true) {
        const state = create(source, undefined);

        assert.match(
          {
            token: next(state, context),
            hasNext: state.index < state.length,
            value: state.tokenValue,
            raw: state.tokenRaw,
            line: state.line,
            column: state.column
          },
          {
            token,
            hasNext: column !== source.length,
            value,
            raw,
            line: 1,
            column
          }
        );
      }

      if (strict !== false) {
        const state = create(source, undefined);
        assert.match(
          {
            token: next(state, context | Context.Strict),
            hasNext: state.index < state.length,
            value: state.tokenValue,
            raw: state.tokenRaw,
            line: state.line,
            column: state.column
          },
          {
            token,
            hasNext: column !== source.length,
            value,
            raw,
            line: 1,
            column
          }
        );
      }
    }
    function testCharPart(
      desc: string,
      source: string,
      value: string,
      raw: string,
      strict?: boolean,
      tagged?: boolean
    ) {
      let adsf = tagged;
      attemptPart(`${desc} (has next)`, `${source} `, value, raw, source.length, strict);
      attemptPart(`${desc} (end)`, source, value, raw, source.length, strict);
    }

    function testChar(code: number): void {
      const letter = String.fromCharCode(code);

      testCharPart(`\`${letter}\``, `\`${letter}\``, letter, letter);
      testCharPart(`\`${letter}\${`, `\`${letter}\${`, letter, letter);
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
      testCharPart(`\`\\${letter}\``, `\`\\${letter}\``, letter, `\\${letter}`);
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
          testCharPart(`\`${escape}\``, `\`${escape}\``, ch, escape);
          testCharPart(`\`${escape}\${`, `\`${escape}\${`, ch, escape);
        }
      });

      it('scans \\x00 - \\xFF', () => {
        for (let code = 0x00; code < 0xff; code++) {
          const ch = String.fromCharCode(code);
          const escape = `\\x${getHex(code).toUpperCase()}`;
          testCharPart(`\`${escape}\``, `\`${escape}\``, ch, escape);
          testCharPart(`\`${escape}\${`, `\`${escape}\${`, ch, escape);
        }
      });

      passTagged('scans `\\x0g`', {
        source: '`\\x0g`',
        raw: '\\x0g',
        line: 1,
        column: 6
      });

      passTagged('scans `\\x0g${', {
        source: '`\\x0g${',
        raw: '\\x0g',
        line: 1,
        column: 7
      });

      passTagged('scans `\\xg0`', {
        source: '`\\xg0`',
        raw: '\\xg0',
        line: 1,
        column: 6
      });

      passTagged('scans `\\xg0${', {
        source: '`\\xg0${',
        raw: '\\xg0',
        line: 1,
        column: 7
      });

      passTagged('scans `\\xgg`', {
        source: '`\\xgg`',
        raw: '\\xgg',
        line: 1,
        column: 6
      });

      passTagged('scans `\\xgg${', {
        source: '`\\xgg${',
        raw: '\\xgg',
        line: 1,
        column: 7
      });

      passTagged('scans `\\xfg`', {
        source: '`\\xfg`',
        raw: '\\xfg',
        line: 1,
        column: 6
      });

      passTagged('scans `\\xfg${', {
        source: '`\\xfg${',
        raw: '\\xfg',
        line: 1,
        column: 7
      });
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
            testCharPart(`\`${escape}\``, `\`${escape}\``, ch, escape);
            testCharPart(`\`${escape}\${`, `\`${escape}\${`, ch, escape);
          }
        });
      }

      for (let i = 4; i <= 0xff; i++) {
        const start = i << 8;
        const end = start | 0xff;

        const startStr = readEscape(start);
        const endStr = readEscape(end);

        it(`(slow) scans ${startStr} - ${endStr}`, () => {
          for (let code = start; code < end; code++) {
            const ch = String.fromCharCode(code);
            const escape = readEscape(code);
            testCharPart(`\`${escape}\``, `\`${escape}\``, ch, escape);
            testCharPart(`\`${escape}\${`, `\`${escape}\${`, ch, escape);
          }
        });
      }

      passTagged('scans `\\u000g`', {
        source: '`\\u000g`',
        raw: '\\u000g',
        line: 1,
        column: 8
      });

      passTagged('scans `\\u000g${', {
        source: '`\\u000g${',
        raw: '\\u000g',
        line: 1,
        column: 9
      });

      passTagged('scans `\\u00g0`', {
        source: '`\\u00g0`',
        raw: '\\u00g0',
        line: 1,
        column: 8
      });

      passTagged('scans `\\u00g0${', {
        source: '`\\u00g0${',
        raw: '\\u00g0',
        line: 1,
        column: 9
      });

      passTagged('scans `\\u0g00`', {
        source: '`\\u0g00`',
        raw: '\\u0g00',
        line: 1,
        column: 8
      });

      passTagged('scans `\\u0g00${', {
        source: '`\\u0g00${',
        raw: '\\u0g00',
        line: 1,
        column: 9
      });

      passTagged('scans `\\ug000`', {
        source: '`\\ug000`',
        raw: '\\ug000',
        line: 1,
        column: 8
      });

      passTagged('scans `\\ug000${', {
        source: '`\\ug000${',
        raw: '\\ug000',
        line: 1,
        column: 9
      });

      passTagged('scans `\\ugggg`', {
        source: '`\\ugggg`',
        raw: '\\ugggg',
        line: 1,
        column: 8
      });

      passTagged('scans `\\ugggg${', {
        source: '`\\ugggg${',
        raw: '\\ugggg',
        line: 1,
        column: 9
      });

      passTagged('scans `\\ufffg`', {
        source: '`\\ufffg`',
        raw: '\\ufffg',
        line: 1,
        column: 8
      });

      passTagged('scans `\\ufffg${', {
        source: '`\\ufffg${',
        raw: '\\ufffg',
        line: 1,
        column: 9
      });

      passTagged('scans `\\uA${', {
        source: '`\\uA${',
        raw: '\\uA',
        line: 1,
        column: 6
      });

      passTagged('scans `\\u1${', {
        source: '`\\u1${',
        raw: '\\u1',
        line: 1,
        column: 6
      });

      passTagged('scans `\\uA${', {
        source: '`\\uA${',
        raw: '\\uA',
        line: 1,
        column: 6
      });

      passTagged('scans `\\u11`', {
        source: '`\\u11`',
        raw: '\\u11',
        line: 1,
        column: 6
      });
      passTagged('scans `\\u1`', {
        source: '`\\u1`',
        raw: '\\u1',
        line: 1,
        column: 5
      });

      passTagged('scans `\\u1${', {
        source: '`\\u1${',
        raw: '\\u1',
        line: 1,
        column: 6
      });

      passTagged('scans `\\uA`', {
        source: '`\\uA`',
        raw: '\\uA',
        line: 1,
        column: 5
      });

      passTagged('scans `\\u11${', {
        source: '`\\u11${',
        raw: '\\u11',
        line: 1,
        column: 7
      });

      passTagged('scans `\\uAA`', {
        source: '`\\uAA`',
        raw: '\\uAA',
        line: 1,
        column: 6
      });

      passTagged('scans `\\uAA${', {
        source: '`\\uAA${',
        raw: '\\uAA',
        line: 1,
        column: 7
      });

      passTagged('scans `\\u111`', {
        source: '`\\u111`',
        raw: '\\u111',
        line: 1,
        column: 7
      });

      passTagged('scans `\\u111${', {
        source: '`\\u111${',
        raw: '\\u111',
        line: 1,
        column: 8
      });

      passTagged('scans `\\uAAA`', {
        source: '`\\uAAA`',
        raw: '\\uAAA',
        line: 1,
        column: 7
      });

      passTagged('scans `\\uAAA${', {
        source: '`\\uAAA${',
        raw: '\\uAAA',
        line: 1,
        column: 8
      });

      function checkNot5(source: string, code: number, letter: string) {
        pass(`scans \`${source}\``, {
          source: `\`${source}\``,
          value: String.fromCharCode(code) + letter,
          raw: source,
          line: 1,
          column: 9
        });

        pass(`scans \`${source}\${`, {
          source: `\`${source}\${`,
          value: String.fromCharCode(code) + letter,
          raw: source,
          line: 1,
          column: 10
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

    context('Unicode brace escapes', () => {
      for (let i = 0; i < 0x10c; i++) {
        const start = i << 8;
        const end = start | 0xff;

        const startStr = `\\u{${start.toString(16)}}`;
        const endStr = `\\u{${end.toString(16)}}`;

        it(`(slow) scans ${startStr} - ${endStr}`, function() {
          this.slow(100);
          for (let code = start; code <= end; code++) {
            const ch = fromCodePoint(code);
            const escape = `\\u{${code.toString(16)}}`;
            testCharPart(`\`${escape}\``, `\`${escape}\``, ch, escape);
            testCharPart(`\`${escape}\${`, `\`${escape}\${`, ch, escape);

            const extra0 = `\\u{0${code.toString(16)}}`;
            testCharPart(`\`${extra0}\``, `\`${extra0}\``, ch, extra0);
            testCharPart(`\`${extra0}\${`, `\`${extra0}\${`, ch, extra0);

            const extra000 = `\\u{000${code.toString(16)}}`;
            testCharPart(`\`${extra000}\``, `\`${extra000}\``, ch, extra000);
            testCharPart(`\`${extra000}\${`, `\`${extra000}\${`, ch, extra000);
          }
        });
      }

      for (let i = 0x10c; i <= 0x10f; i++) {
        const start = i << 8;
        const end = start | 0xff;

        const startStr = `\\u{${start.toString(16)}}`;
        const endStr = `\\u{${end.toString(16)}}`;

        it(`scans ${startStr} - ${endStr}`, function() {
          this.slow(100);
          for (let code = start; code <= end; code++) {
            const ch = fromCodePoint(code);
            const escape = `\\u{${code.toString(16)}}`;
            testCharPart(`\`${escape}\``, `\`${escape}\``, ch, escape);
            testCharPart(`\`${escape}\${`, `\`${escape}\${`, ch, escape);

            const extra0 = `\\u{0${code.toString(16)}}`;
            testCharPart(`\`${extra0}\``, `\`${extra0}\``, ch, extra0);
            testCharPart(`\`${extra0}\${`, `\`${extra0}\${`, ch, extra0);

            const extra000 = `\\u{000${code.toString(16)}}`;
            testCharPart(`\`${extra000}\``, `\`${extra000}\``, ch, extra000);
            testCharPart(`\`${extra000}\${`, `\`${extra000}\${`, ch, extra000);
          }
        });
      }

      passTagged('scans `\\u{g}`', {
        source: '`\\u{g}`',
        raw: '\\u{g}',
        line: 1,
        column: 7
      });

      passTagged('scans `\\u{g}${', {
        source: '`\\u{g}${',
        raw: '\\u{g}',
        line: 1,
        column: 8
      });

      passTagged('scans `\\u{g0}`', {
        source: '`\\u{g0}`',
        raw: '\\u{g0}',
        line: 1,
        column: 8
      });

      passTagged('scans `\\u{g0}${', {
        source: '`\\u{g0}${',
        raw: '\\u{g0}',
        line: 1,
        column: 9
      });

      passTagged('scans `\\u{0g}`', {
        source: '`\\u{0g}`',
        raw: '\\u{0g}',
        line: 1,
        column: 8
      });

      passTagged('scans `\\u{0g}${', {
        source: '`\\u{0g}${',
        raw: '\\u{0g}',
        line: 1,
        column: 9
      });

      passTagged('scans `\\u{0g0}`', {
        source: '`\\u{0g0}`',
        raw: '\\u{0g0}',
        line: 1,
        column: 9
      });

      passTagged('scans `\\u{0g0}${', {
        source: '`\\u{0g0}${',
        raw: '\\u{0g0}',
        line: 1,
        column: 10
      });

      passTagged('scans `\\u{g0g}`', {
        source: '`\\u{g0g}`',
        raw: '\\u{g0g}',
        line: 1,
        column: 9
      });

      passTagged('scans `\\u{g0g}${', {
        source: '`\\u{g0g}${',
        raw: '\\u{g0g}',
        line: 1,
        column: 10
      });

      passTagged('scans `\\u{110000}`', {
        source: '`\\u{110000}`',
        raw: '\\u{110000}',
        line: 1,
        column: 12
      });

      passTagged('scans `\\u{110000}${', {
        source: '`\\u{110000}${',
        raw: '\\u{110000}',
        line: 1,
        column: 13
      });

      passTagged('scans `\\u{11ffff}`', {
        source: '`\\u{11ffff}`',
        raw: '\\u{11ffff}',
        line: 1,
        column: 12
      });

      passTagged('scans `\\u{11ffff}${', {
        source: '`\\u{11ffff}${',
        raw: '\\u{11ffff}',
        line: 1,
        column: 13
      });
    });

    context('legacy octal', () => {
      function taggedCharPart(desc: string, source: string, raw: string, strict: boolean) {
        attemptPart(`${desc} (has next)`, `${source} `, undefined, raw, source.length, strict);
        attemptPart(`${desc} (end)`, source, undefined, raw, source.length, strict);
      }

      it('scans \\0 - \\7 (with possible leading zeroes)', () => {
        for (let code = 0; code <= 6; code++) {
          const ch = fromCodePoint(code);

          const escape0 = `\\${code}`;
          testCharPart(`\`${escape0}\``, `\`${escape0}\``, ch, escape0, false);
          testCharPart(`\`${escape0}\${`, `\`${escape0}\${`, ch, escape0, false);
          if (code !== 0) {
            taggedCharPart(`\`${escape0}\``, `\`${escape0}\``, escape0, true);
            taggedCharPart(`\`${escape0}\${`, `\`${escape0}\${`, escape0, true);
          }

          const escape1 = `\\0${code}`;
          testCharPart(`\`${escape1}\``, `\`${escape1}\``, ch, escape1, false);
          testCharPart(`\`${escape1}\${`, `\`${escape1}\${`, ch, escape1, false);
          taggedCharPart(`\`${escape1}\``, `\`${escape1}\``, escape1, true);
          taggedCharPart(`\`${escape1}\${`, `\`${escape1}\${`, escape1, true);

          const escape2 = `\\00${code}`;
          testCharPart(`\`${escape2}\``, `\`${escape2}\``, ch, escape2, false);
          testCharPart(`\`${escape2}\${`, `\`${escape2}\${`, ch, escape2, false);
          taggedCharPart(`\`${escape2}\``, `\`${escape2}\``, escape2, true);
          taggedCharPart(`\`${escape2}\${`, `\`${escape2}\${`, escape2, true);
        }
      });

      it('scans \\10 - \\77 (with possible leading zeroes)', () => {
        for (let code = 0o10; code <= 0o77; code++) {
          const ch = fromCodePoint(code);
          const escape0 = `\\${code.toString(8)}`;
          testCharPart(`\`${escape0}\``, `\`${escape0}\``, ch, escape0, false);
          testCharPart(`\`${escape0}\${`, `\`${escape0}\${`, ch, escape0, false);
          taggedCharPart(`\`${escape0}\``, `\`${escape0}\``, escape0, true);
          taggedCharPart(`\`${escape0}\${`, `\`${escape0}\${`, escape0, true);

          const escape1 = `\\0${code.toString(8)}`;
          testCharPart(`\`${escape1}\``, `\`${escape1}\``, ch, escape1, false);
          testCharPart(`\`${escape1}\${`, `\`${escape1}\${`, ch, escape1, false);
          taggedCharPart(`\`${escape1}\``, `\`${escape1}\``, escape1, true);
          taggedCharPart(`\`${escape1}\${`, `\`${escape1}\${`, escape1, true);
        }
      });

      it('scans \\100 - \\377 (with possible leading zeroes)', () => {
        for (let code = 0o100; code <= 0o377; code++) {
          const ch = fromCodePoint(code);
          const escape = `\\${code.toString(8)}`;
          testCharPart(`\`${escape}\``, `\`${escape}\``, ch, escape, false);
          testCharPart(`\`${escape}\${`, `\`${escape}\${`, ch, escape, false);
          taggedCharPart(`\`${escape}\``, `\`${escape}\``, escape, true);
          taggedCharPart(`\`${escape}\${`, `\`${escape}\${`, escape, true);
        }
      });
    });
  })();

  fail("doesn't scan '\\'", { source: "'\\'" });
  fail('doesn\'t scan "\\"', { source: '"\\"' });

  fail("doesn't scan '\\\\\\'", { source: "'\\\\\\'" });
  fail('doesn\'t scan "\\\\\\"', { source: '"\\\\\\"' });

  pass('scans `\\b`', {
    source: '`\\b`',
    value: '\b',
    raw: '\\b',
    line: 1,
    column: 4
  });

  pass('scans `\\b${', {
    source: '`\\b${',
    value: '\b',
    raw: '\\b',
    line: 1,
    column: 5
  });

  pass('scans `\\t`', {
    source: '`\\t`',
    value: '\t',
    raw: '\\t',
    line: 1,
    column: 4
  });

  pass('scans `\\t${', {
    source: '`\\t${',
    value: '\t',
    raw: '\\t',
    line: 1,
    column: 5
  });

  pass('scans `\\n`', {
    source: '`\\n`',
    value: '\n',
    raw: '\\n',
    line: 1,
    column: 4
  });

  pass('scans `\\n${', {
    source: '`\\n${',
    value: '\n',
    raw: '\\n',
    line: 1,
    column: 5
  });

  pass('scans `\\v`', {
    source: '`\\v`',
    value: '\v',
    raw: '\\v',
    line: 1,
    column: 4
  });

  pass('scans `\\v${', {
    source: '`\\v${',
    value: '\v',
    raw: '\\v',
    line: 1,
    column: 5
  });

  pass('scans `\\f`', {
    source: '`\\f`',
    value: '\f',
    raw: '\\f',
    line: 1,
    column: 4
  });

  pass('scans `\\f${', {
    source: '`\\f${',
    value: '\f',
    raw: '\\f',
    line: 1,
    column: 5
  });

  pass('scans `\\r`', {
    source: '`\\r`',
    value: '\r',
    raw: '\\r',
    line: 1,
    column: 4
  });

  pass('scans `\\r${', {
    source: '`\\r${',
    value: '\r',
    raw: '\\r',
    line: 1,
    column: 5
  });

  pass('scans `\\"`', {
    source: '`\\"`',
    value: '"',
    raw: '\\"',
    line: 1,
    column: 4
  });

  pass('scans `\\"${', {
    source: '`\\"${',
    value: '"',
    raw: '\\"',
    line: 1,
    column: 5
  });

  pass("scans `\\'`", {
    source: "`\\'`",
    value: "'",
    raw: "\\'",
    line: 1,
    column: 4
  });

  pass("scans `\\'${", {
    source: "`\\'${",
    value: "'",
    raw: "\\'",
    line: 1,
    column: 5
  });

  pass('scans `\\``', {
    source: '`\\``',
    value: '`',
    raw: '\\`',
    line: 1,
    column: 4
  });

  pass('scans `\\`${', {
    source: '`\\`${',
    value: '`',
    raw: '\\`',
    line: 1,
    column: 5
  });

  pass('scans `"`', {
    source: '`"`',
    value: '"',
    raw: '"',
    line: 1,
    column: 3
  });

  pass('scans `"${', {
    source: '`"${',
    value: '"',
    raw: '"',
    line: 1,
    column: 4
  });

  pass("scans `'`", {
    source: "`'`",
    value: "'",
    raw: "'",
    line: 1,
    column: 3
  });

  pass("scans `'${", {
    source: "`'${",
    value: "'",
    raw: "'",
    line: 1,
    column: 4
  });

  passTagged('scans ``', {
    strict: true,
    source: '`\\1`',
    raw: '\\1',
    line: 1,
    column: 4
  });

  passTagged('scans `\\1${', {
    strict: true,
    source: '`\\1${',
    raw: '\\1',
    line: 1,
    column: 5
  });

  passTagged('scans `\\7`', {
    strict: true,
    source: '`\\7`',
    raw: '\\7',
    line: 1,
    column: 4
  });

  passTagged('scans `\\7${', {
    strict: true,
    source: '`\\7${',
    raw: '\\7',
    line: 1,
    column: 5
  });

  pass('scans `\\0`', {
    source: '`\\0`',
    value: '\0',
    raw: '\\0',
    line: 1,
    column: 4
  });

  pass('scans `\\0${', {
    source: '`\\0${',
    value: '\0',
    raw: '\\0',
    line: 1,
    column: 5
  });

  pass('scans `\\u180E`', {
    source: '`\u180E`',
    value: '\u180E',
    raw: '\u180E',
    line: 1,
    column: 3
  });

  pass('scans `\\u180E${', {
    source: '`\u180E${',
    value: '\u180E',
    raw: '\u180E',
    line: 1,
    column: 4
  });
});
