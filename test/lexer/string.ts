import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

// Note: 66 000 tests - it also tests escaped values for template literals

export const enum Chars {
  EnglishUpperA = 0x41,
      EnglishUpperZ = 0x5A,
      EnglishLowerA = 0x61,
      EnglishLowerZ = 0x7A,
      RussianUpperА = 0x410,
      RussianUpperЯ = 0x42F,
      RussianUpperЁ = 0x401,
      RussianLowerА = 0x430,
      RussianLowerЯ = 0x44F,
      RussianLowerЁ = 0x451,
      Zero = 0x30,
      Nine = 0x39,
}

describe('Lexer - String literal', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context, isEnd: boolean) {
          it(name, () => {
              if (opts.strict !== true) {
                  const parser = new State(isEnd ? opts.source : `${opts.source} `, undefined, undefined);

                  t.deepEqual({
                      token: nextToken(parser, context),
                      value: parser.tokenValue,
                      line: parser.line,
                      column: parser.column,
                  },          {
                      token: Token.StringLiteral,
                      value: opts.value,
                      line: opts.line,
                      column: opts.column,
                  });
              }
          });
      }

      test(`${name}`, Context.Empty, false);
      test(`${name}`, Context.Empty, true);
  }

  function fail(name: string, source: string, strict?: boolean) {
    function test(name: string, context: Context, isEnd: boolean) {
        it(name, () => {
            if (strict !== true) {
                const parser = new State(isEnd ? source : `${source} `, undefined, undefined);
                t.throws(() => {
                  nextToken(parser, context);
                });
            }

            if (strict !== false) {
                const parser = new State(isEnd ? source : `${source} `, undefined, undefined);
                t.throws(() => {
                    nextToken(parser, context | Context.Strict);
                });
            }
        });
    }

    test(`${name}`, Context.Empty, false);
    test(`${name}`, Context.Empty, true);
}

  fail('should fail on \'', '\'');
  fail('should fail on \'', '\0');
  fail('should fail on "', '"');
  fail('should fail on \'\\x0g\'', '\'\\x0g\'');
  fail('should fail on \'\\xg0\'', '\'\\xg0\'');
  fail('should fail on \'\\xgg\'', '\'\\xgg\'');
  fail('should fail on \'\\xfg\'', '\'\\xfg\'');
  fail('should fail on \'\\u000g\'', '\'\\u000g\'');
  fail('should fail on \'\\u00g0\'', '\'\\u00g0\'');
  fail('should fail on \'\\u0g00\'', '\'\\u0g00\'');
  fail('should fail on \'\\ug000\'', '\'\\ug000\'');
  fail('should fail on \'\\ugggg\'', '\'\\ugggg\'');
  fail('should fail on \'\\ufffg\'', '\'\\ufffg\'');
  fail('should fail on \'\\\'', '\'\\\'');
  fail('should fail on "\\"', '"\\"');
  fail('should fail on \'\\1\'', '\'\\1\'', true);
  fail('should fail on "\\1"', '"\\1"', true);
  fail('should fail on \'\\7\'', '\'\\7\'', true);
  fail('should fail on "\\7"', '"\\7"', true);
  fail('should fail on \'\\\\\\\'', '\'\\\\\\\'');
  fail('should fail on "\\\\\\"', '"\\\\\\"');
  fail('should fail on \'\\u1\'', '\'\\u1\'');
  fail('should fail on \'\\uA\'', '\'\\uA\'');
  fail('should fail on \'\\u11\'', '\'\\u11\'');
  fail('should fail on \'\\uAA\'', '\'\\uAA\'');
  fail('should fail on \'\\u111\'', '\'\\u111\'');
  fail('should fail on \'\\uAAA\'', '\'\\uAAA\'');
  fail('should fail on \'\\n\'', '\'\n\'');
  fail('should fail on "\\n"', '"\n"');
  fail('should fail on \'\\u{g}\'', '\'\\u{g}\'');
  fail('should fail on \'\\u{g0}\'', '\'\\u{g0}\'');
  fail('should fail on \'\\u{0g}\'', '\'\\u{0g}\'');
  fail('should fail on \'\\u{0g0}\'', '\'\\u{0g0}\'');
  fail('should fail on \'\\u{g0g}\'', '\'\\u{g0g}\'');
  fail('should fail on \'\\u{110000}\'', '\'\\u{110000}\'');
  fail('should fail on \'\\u{11ffff}\'', '\'\\u{11ffff}\'');

  pass('scans \'\'', {
      source: '\'\'',
      value: '',
      raw: '\'\'',
      line: 1,
      column: 2,
  });

  pass('scans ""', {
      source: '""',
      value: '',
      raw: '""',
      line: 1,
      column: 2,
  });

  pass('scans \'abc\'', {
      source: '\'abc\'',
      value: 'abc',
      raw: '\'abc\'',
      line: 1,
      column: 5,
  });

  pass('scans "abc"', {
      source: '"abc"',
      value: 'abc',
      raw: '"abc"',
      line: 1,
      column: 5,
  });

  pass('scans \'123\'', {
      source: '\'123\'',
      value: '123',
      raw: '\'123\'',
      line: 1,
      column: 5,
  });

  pass('scans "123"', {
      source: '"123"',
      value: '123',
      raw: '"123"',
      line: 1,
      column: 5,
  });
  pass('scans \'\\b\'', {
      source: '\'\\b\'',
      value: '\b',
      raw: '\'\\b\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\b"', {
      source: '"\\b"',
      value: '\b',
      raw: '"\\b"',
      line: 1,
      column: 4,
  });

  pass('scans \'\\t\'', {
      source: '\'\\t\'',
      value: '\t',
      raw: '\'\\t\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\t"', {
      source: '"\\t"',
      value: '\t',
      raw: '"\\t"',
      line: 1,
      column: 4,
  });

  pass('scans \'\\n\'', {
      source: '\'\\n\'',
      value: '\n',
      raw: '\'\\n\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\n"', {
      source: '"\\n"',
      value: '\n',
      raw: '"\\n"',
      line: 1,
      column: 4,
  });

  pass('scans \'\\v\'', {
      source: '\'\\v\'',
      value: '\v',
      raw: '\'\\v\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\v"', {
      source: '"\\v"',
      value: '\v',
      raw: '"\\v"',
      line: 1,
      column: 4,
  });

  pass('scans \'\\f\'', {
      source: '\'\\f\'',
      value: '\f',
      raw: '\'\\f\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\f"', {
      source: '"\\f"',
      value: '\f',
      raw: '"\\f"',
      line: 1,
      column: 4,
  });

  pass('scans \'\\r\'', {
      source: '\'\\r\'',
      value: '\r',
      raw: '\'\\r\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\r"', {
      source: '"\\r"',
      value: '\r',
      raw: '"\\r"',
      line: 1,
      column: 4,
  });

  pass('scans \'\\"\'', {
      source: '\'\\"\'',
      value: '"',
      raw: '\'\\"\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\""', {
      source: '"\\""',
      value: '"',
      raw: '"\\""',
      line: 1,
      column: 4,
  });

  pass('scans \'\\\'\'', {
      source: '\'\\\'\'',
      value: '\'',
      raw: '\'\\\'\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\\'"', {
      source: '"\\\'"',
      value: '\'',
      raw: '"\\\'"',
      line: 1,
      column: 4,
  });

  pass('scans \'"\'', {
      source: '\'"\'',
      value: '"',
      raw: '\'"\'',
      line: 1,
      column: 3,
  });

  pass('scans "\'"', {
      source: '"\'"',
      value: '\'',
      raw: '"\'"',
      line: 1,
      column: 3,
  });

  pass('scans \'\\0\'', {
      source: '\'\\0\'',
      value: '\0',
      raw: '\'\\0\'',
      line: 1,
      column: 4,
  });

  pass('scans "\\0"', {
      source: '"\\0"',
      value: '\0',
      raw: '"\\0"',
      line: 1,
      column: 4,
  });

  pass('scans \'\\u180E\'', {
      source: '\'\u180E\'',
      value: '\u180E',
      raw: '\'\u180E\'',
      line: 1,
      column: 3,
  });

  pass('scans "\\u180E"', {
      source: '"\u180E"',
      value: '\u180E',
      raw: '"\u180E"',
      line: 1,
      column: 3,
  });

  describe('English capitals', () => {
      for (let code = Chars.EnglishUpperA; code <= Chars.EnglishUpperZ; code++) {
          const letter = String.fromCharCode(code);

          pass('scans ' + letter, {
              source: `'${letter}'`,
              value: letter,
              raw: `'${letter}'`,
              line: 1,
              column: `'${letter}'`.length,
          });
      }
  });

  describe('English smal letter', () => {

      for (let code = Chars.EnglishLowerA; code <= Chars.EnglishLowerZ; code++) {
          const letter = String.fromCharCode(code);

          pass('scans ' + letter, {
              source: `'${letter}'`,
              value: letter,
              raw: `'${letter}'`,
              line: 1,
              column: `'${letter}'`.length,
          });

      }
  });

  describe('Russian capitals', () => {
      for (let code = Chars.RussianUpperА; code <= Chars.RussianUpperЯ; code++) {
          const letter = String.fromCharCode(code);
          pass('scans ' + letter, {
              source: `'${letter}'`,
              value: letter,
              raw: `'${letter}'`,
              line: 1,
              column: `'${letter}'`.length,
          });
      }
  });

  describe('Russian small letters', () => {
      for (let code = Chars.RussianLowerА; code <= Chars.RussianLowerЯ; code++) {
          const letter = String.fromCharCode(code);
          pass('scans ' + letter, {
              source: `'${letter}'`,
              value: letter,
              raw: `'${letter}'`,
              line: 1,
              column: `'${letter}'`.length,
          });
      }
  });

  function getHex(code: number): string {
      if (code < 0x10) return `0${code.toString(16)}`;
      return code.toString(16);
  }

  describe('scans ASCII escapes', () => {

      for (let code = 0x00; code < 0xff; code++) {
          const ch = String.fromCharCode(code);
          const escape = `\\x${getHex(code)}`;
          //            testCharPart(`'${escape}'`, `'${escape}'`, ch);
          const parser = new State(`'${escape}'`, undefined, undefined);
          it('scans ' + escape, () => {

              t.deepEqual({
                  token: nextToken(parser, Context.Empty),
                  value: parser.tokenValue,
                  line: parser.line,
                  column: parser.column,
              },          {
                  token: Token.StringLiteral,
                  value: ch,
                  line: 1,
                  column: `'${escape}'`.length,
              });
          });
      }
  });

  describe('scans \\0 - \\7 (with possible leading zeroes)', () => {

      for (let code = 0; code <= 6; code++) {
          const ch = String.fromCodePoint(code);
          const escape0 = `\\${code}`;
          it(`Scans '${escape0}'`, () => {
              const parser = new State(`'${escape0}'`, undefined, undefined);
              t.deepEqual({
                  token: nextToken(parser, Context.Empty),
                  value: parser.tokenValue,
                  line: parser.line,
                  column: parser.column,
              },          {
                  token: Token.StringLiteral,
                  value: ch,
                  line: 1,
                  column: `'${escape0}'`.length,
              });
          });
      }
  });

  describe('scans \\0 - \\7 (with possible leading zeroes)', () => {

      for (let code = 0o10; code <= 0o77; code++) {
          const ch = String.fromCodePoint(code);
          const escape0 = `\\${code.toString(8)}`;

          // should fail in strict mode
          fail(`'${escape0}'`, `'${escape0}'`, true);

          it(`Scans '${escape0}'`, () => {
              const parser = new State(`'${escape0}'`, undefined, undefined);
              t.deepEqual({
                  token: nextToken(parser, Context.Empty),
                  value: parser.tokenValue,
                  line: parser.line,
                  column: parser.column,
              },          {
                  token: Token.StringLiteral,
                  value: ch,
                  line: 1,
                  column: `'${escape0}'`.length,
              });
          });
      }
  });

  describe(' \\100 - \\377 (with possible leading zeroes)', () => {

      for (let code = 0o100; code <= 0o377; code++) {
          const ch = String.fromCodePoint(code);
          const escape0 = `\\${code.toString(8)}`;
          it(`Scans '${escape0}'`, () => {
              const parser = new State(`'${escape0}'`, undefined, undefined);
              t.deepEqual({
                  token: nextToken(parser, Context.Empty),
                  value: parser.tokenValue,
                  line: parser.line,
                  column: parser.column,
              },          {
                  token: Token.StringLiteral,
                  value: ch,
                  line: 1,
                  column: `'${escape0}'`.length,
              });
          });
      }

  });

  describe('scans Unicode  escapes', () => {

      for (let i = 0; i < 0x10e; i++) {
          const start = i << 12;
          const end = start | 0xfff;

          const startStr = `\\u{${start.toString(16)}}`;
          const endStr = `\\u{${end.toString(16)}}`;

          it(`scans ${startStr} - ${endStr}`, function() {
              this.slow(1000);
              for (let code = start; code <= end; code++) {
                  const ch = String.fromCodePoint(code);
                  const escape = `\\u{${code.toString(16)}}`;
                  const parser = new State(`'${escape}'`, undefined, undefined);
                  t.deepEqual({
                      token: nextToken(parser, Context.Empty),
                      value: parser.tokenValue,
                      line: parser.line,
                      column: parser.column,
                  },          {
                      token: Token.StringLiteral,
                      value: ch,
                      line: 1,
                      column: `'${escape}'`.length,
                  });
              }
          });
      } {
          const start = 0x10f000;
          const end = 0x10000;

          const startStr = `\\u{${start.toString(16)}}`;
          const endStr = `\\u{${end.toString(16)}}`;
          for (let code = start; code <= end; code++) {
              const ch = String.fromCodePoint(code);
              const escape = `\\u{${code.toString(16)}}`;
              it(`scans ${startStr} - ${endStr}`, function() {
                  this.slow(150);
                  const parser = new State(`'${escape}'`, undefined, undefined);
                  t.deepEqual({
                      token: nextToken(parser, Context.Empty),
                      value: parser.tokenValue,
                      line: parser.line,
                      column: parser.column,
                  },          {
                      token: Token.StringLiteral,
                      value: ch,
                      line: 1,
                      column: `'${escape}'`.length,
                  });
              });
          }
      }
  });
});
