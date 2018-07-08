import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - Identifiers', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context) {
          it(name, () => {
              const state = new State(opts.source, undefined, undefined);
              t.deepEqual({
                  token: nextToken(state, context | Context.OptionsRawidentifiers),
                  //                  raw: state.tokenRaw,
                  value: state.tokenValue,
                  line: state.line,
                  column: state.column,
              },          {
                  token: opts.token,
                  // raw: opts.raw,
                  value: opts.value,
                  line: opts.line,
                  column: opts.column,
              });
          });
      }

      test(`${name} `, Context.Empty);
  }

  function fail(name: string, context: Context, opts: any): any {
      it(name, () => {
          const state = new State(opts.source, undefined, undefined);
          t.throws(() => {
              nextToken(state, context);
          });
      });
  }

  fail('should fail "1foo"', Context.Empty, {
      source: '1foo'
  });
  fail('should fail "abc\\"', Context.Empty, {
      source: 'abc\\'
  });

  fail('should fail "\\123\\uD800"', Context.Empty, {
      source: '\\123\\uD800'
  });

  fail('should fail "123\\uDAAA"', Context.Empty, {
      source: '\\123\\uDAAA'
  });

  fail('should fail "\\123\\uD800"', Context.Empty, {
      source: '\\123\\uD800'
  });

  fail('should fail "\\uD8.1"', Context.Empty, {
      source: '\\uD8.1'
  });

  fail('should fail "\\uD.01"', Context.Empty, {
      source: '\\uD.01'
  });

  fail('should fail "\\u"', Context.Empty, {
      source: '\\u'
  });

  fail('should fail "\\u0x11ffff"', Context.Empty, {
    source: '\\u0x11ffff'
  });

  fail('should fail "\\u%"', Context.Empty, {
      source: '\\u%'
  });

  fail('should fail "\\u.801"', Context.Empty, {
      source: '\\u.801'
  });

  fail('should fail "abc\\u"', Context.Empty, {
      source: 'abc\\u'
  });

  fail('should fail "\\u00Xvwxyz"', Context.Empty, {
      source: '\\u00Xvwxyz'
  });

  fail('should fail "\\u00"', Context.Empty, {
      source: '\\u00'
  });

  fail('should fail "abc\\u00"', Context.Empty, {
      source: 'abc\\u00'
  });

  fail('should fail "\\"', Context.Empty, {
      source: '\\'
  });

  fail('should fail "\\u{}"', Context.Empty, {
      source: '\\u{}'
  });

  fail('should fail "\\u{10401"', Context.Empty, {
      source: '\\u{10401'
  });

  fail('should fail "\\u0"', Context.Empty, {
    source: '\\u0'
  });

  fail('should fail "a\\u"', Context.Empty, {
    source: 'a\\u'
  });

  const enum Chars {
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

  describe('English capitals', () => {
      for (let code = Chars.EnglishUpperA; code <= Chars.EnglishUpperZ; code++) {
          const letter = String.fromCharCode(code);

          pass('scans ' + letter, {
              source: `${letter}`,
              value: letter,
              raw: `'${letter}'`,
              line: 1,
              token: Token.Identifier,
              column: `${letter}`.length,
          });
      }
  });

  describe('English smal letter', () => {

      for (let code = Chars.EnglishLowerA; code <= Chars.EnglishLowerZ; code++) {
          const letter = String.fromCharCode(code);

          pass('scans ' + letter, {
              source: `${letter}`,
              value: letter,
              raw: `'${letter}'`,
              token: Token.Identifier,
              line: 1,
              column: `${letter}`.length,
          });
      }
  });

  describe('Russian capitals', () => {
      for (let code = Chars.RussianUpperА; code <= Chars.RussianUpperЯ; code++) {
          const letter = String.fromCharCode(code);
          pass('scans ' + letter, {
              source: `${letter}`,
              value: letter,
              raw: `'${letter}'`,
              line: 1,
              token: Token.Identifier,
              column: `${letter}`.length,
          });
      }
  });

  describe('Invalid unicode identifiers', () => {

      pass('scans \'\\uD800\\uDEA7\'', {
        source: '\\uD800\\uDEA7',
        value: '',
        raw: '',
        token: Token.Invalid,
        line: 1,
        column: 6,
      });

      pass('scans \'a\\uD800\\uDC00b\'', {
          source: 'a\\uD800\\uDC00b',
          'value': 'a',
          raw: '𪘀',
          token: Token.Invalid,
          line: 1,
          column: 7,
      });

      pass('scans \'\\uD842\\u{0DFB7}+\'', {
          source: '\\uD842\\u{0DFB7}+',
          value: '',
          raw: '',
          token: Token.Invalid,
          line: 1,
          column: 6,
      });

      // Missing low surrogate with trailer
      pass('scans \'\\ud841!!\'', {
          source: '\\ud841!!',
          value: '',
          raw: '\'case\'',
          token: Token.Invalid,
          line: 1,
          column: 6,
      });

      // Missing low surrogate
      pass('scans \'\\ud841\'', {
        source: '\\ud841',
        value: '',
        raw: '\'case\'',
        token: Token.Invalid,
        line: 1,
        column: 6,
    });

      pass('scans \'\\uD801\'', {
        source: '\\uD801',
        value: '',
        raw: '\'case\'',
        token: Token.Invalid,
        line: 1,
        column: 6,
    });

      pass('scans \'\\u{10FFFF}\'', {
        source: '\\u{10FFFF}',
        value: '',
        raw: '\'case\'',
        token: Token.Invalid,
        line: 1,
        column: 10,
      });

      pass('scans \'\\uD801\'', {
          source: '\\uD801',
          value: '',
          raw: '\'case\'',
          token: Token.Invalid,
          line: 1,
          column: 6,
      });

      pass('scans \'\\u0011\'', {
          source: '\\u0011',
          value: '',
          raw: 'abc',
          token: Token.Invalid,
          line: 1,
          column: 6,
      });

      pass('scans \'\\u038d\'', {
          source: '\\u038d',
          value: '',
          raw: 'abc',
          token: Token.Invalid,
          line: 1,
          column: 6,
      });

      pass('scans \'\\u000b\'', {
          source: '\\u000b',
          value: '',
          raw: 'abc',
          token: Token.Invalid,
          line: 1,
          column: 6,
      });

      pass('scans \'\\u{7bfff}\'', {
          source: '\\u{7bfff}',
          value: '',
          raw: 'abc',
          token: Token.Invalid,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{5ffff}\'', {
          source: '\\u{5ffff}',
          value: '',
          raw: 'abc',
          token: Token.Invalid,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{9afff}\'', {
          source: '\\u{9afff}',
          value: '',
          raw: 'abc',
          token: Token.Invalid,
          line: 1,
          column: 9,
      });
  });

  describe('Unicode identifiers (UTF-8)', () => {

    pass('scans \'\\u0159\'', {
      source: '\\u0159',
      value:  'ř',
      raw: '',
      token: Token.Identifier,
      line: 1,
      column: 6,
      });

    pass('scans \'\\u0069\'', {
          source: '\\u0069',
          'value': 'i',
          raw: '\\u{20400}',
          token: Token.Identifier,
          line: 1,
          column: 6,
      });

    pass('scans \'\\u{000069}\'', {
          source: '\\u{000069}',
          'value': 'i',
          raw: '\\u{000069}',
          token: Token.Identifier,
          line: 1,
          column: 10,
      });

    pass('scans \'\\u{20BB7}\'', {
          source: '\\u{20BB7}',
          'value': '𠮷',
          raw: '\\u{20BB7}',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

  });

  describe('Unicode identifiers', () => {

      pass('scans \'\\u0300\'', {
          source: '\\u0300\\u{10401}',
          value: '̀𐐁',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 15,
      });

      pass('scans \'\\u{20400}\'', {
          source: '\\u{20400}',
          'value': '𠐀',
          raw: '\\u{20400}',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{20400}\'', {
          source: `"Emoji '😍' character."`,
          'value': 'Emoji \'😍\' character.',
          raw: '\\u{20400}',
          token: Token.StringLiteral,
          line: 1,
          column: 23,
      });

      pass('scans \'a\\uD800\\uDC00b\'', {
          source: '\\u{20400}',
          'value': '𠐀',
          raw: '\\u{20400}',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u0300\'', {
          source: '\\u0300',
          value: '̀',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 6,
      });

      pass('scans \'\\u0300\'', {
          source: '\\u0300',
          value: '̀',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 6,
      });

      pass('scans \'\\u03ff\'', {
          source: '\\u03ff',
          value: 'Ͽ',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 6,
      });

      pass('scans \'\\u{4fff}\\u03ff\'', {
          source: '\\u{4fff}\\u03ff',
          value: '俿Ͽ',
          raw: '\\u{4fff}\\u03ff',
          token: Token.Identifier,
          line: 1,
          column: 14,
      });

      pass('scans \'\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\'', {
          source: '\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff',
          value: '俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ俿Ͽ',
          raw: '\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff\\u{4fff}\\u03ff',
          token: Token.Identifier,
          line: 1,
          column: 98,
      });
      pass('scans \'\\u{4fff}\'', {
          source: '\\u{4fff}',
          value: '俿',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 8,
      });

      pass('scans \'\\u0052oo\'', {
          source: '\\u0052oo',
          value: 'Roo',
          raw: '\\u0052oo',
          token: Token.Identifier,
          line: 1,
          column: 8,
      });

      pass('scans \'\\u0052oo𪘀\'', {
          source: '\\u0052oo𪘀',
          value: 'Roo𪘀',
          raw: '\\u0052oo𪘀',
          token: Token.Identifier,
          line: 1,
          column: 10,
      });

      pass('scans \'\\u0052oo𪘀a\'', {
          source: '\\u0052oo𪘀a',
          value: 'Roo𪘀a',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 11,
      });

      pass('scans \'ab\\u{0000000000000000000072}\'', {
          source: 'ab\\u{0000000000000000000072}',
          value: 'abr',
          raw: '',
          token: Token.Identifier,
          line: 1,
          column: 28,
      });

      pass('scans \'a\\u{0000000000000000000071}c\'', {
          source: 'a\\u{0000000000000000000071}c',
          value: 'aqc',
          raw: 'a\\u{0000000000000000000071}c',
          token: Token.Identifier,
          line: 1,
          column: 28,
      });

      pass('scans \'\\u{10401}\'', {
          source: '\\u{10401}',
          value: '𐐁',
          raw: '\\u{10401}',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

      pass('scans \'\\uAAAA\\uBBBB\'', {
          source: '\\uAAAA\\uBBBB',
          value: 'ꪪ뮻',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 12,
      });

      pass('scans \'_፩፪፫፬፭፮፯፰፱\'', {
          source: '_፩፪፫፬፭፮፯፰፱',
          value: '_፩፪፫፬፭፮፯፰፱',
          raw: '_፩፪፫፬፭፮፯፰፱',
          token: Token.Identifier,
          line: 1,
          column: 10,
      });
  });

  describe('Surrogate pairs', () => {

      pass('scans \'𪘀\'', {
          source: 'f𪘀',
          value: 'f𪘀',
          raw: '𪘀',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });

      pass('scans \'𪘀a\'', {
          source: 'f𪘀a',
          value: 'f𪘀a',
          raw: '𪘀a',
          token: Token.Identifier,
          line: 1,
          column: 4,
      });

      pass('scans \'\\u{10401}\'', {
          source: '\\u{10401}',
          value: '𐐁',
          raw: '\\u{10401}',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{000000000000000000070}bc\'', {
          source: '\\u{000000000000000000070}bc',
          value: 'pbc',
          raw: '',
          token: Token.Identifier,
          line: 1,
          column: 27,
      });

      pass('scans \'_\\u{1EE03}\'', {
          source: '_\\u{1EE03}',
          value: '_𞸃',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 10,
      });

      pass('scans \'_\\u{1EE03}\'', {
          source: '_\\u{1EE03}_\\u{1EE03}',
          value: '_𞸃_𞸃',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 20,
      });

      pass('scans \'\\u{1EE0A}\\u{1EE0B}\'', {
          source: '\\u{1EE0A}\\u{1EE0B}',
          value: '𞸊𞸋',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 18,
      });

      pass('scans \'\\u{1EE06}_$\'', {
          source: '\\u{1EE06}_$',
          value: '𞸆_$',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 11,
      });

      pass('scans \'\\u{1EE00}\'', {
          source: '\\u{1EE00}',
          value: '𞸀',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

      pass('scans \'_\\u{1EE03}\'', {
          source: '_\\u{1EE03}',
          value: '_𞸃',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 10,
      });

      pass('scans \'\\u0061ss\'', {
          source: '\\u0061ss',
          value: 'ass',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 8,
      });

      pass('scans \'\\u0061wait\'', {
          source: '\\u0061waitt',
          value: 'awaitt',
          raw: '\'var\'',
          token: Token.Identifier,
          line: 1,
          column: 11,
      });

      pass('scans \'\\u0061bar;\'', {
          source: '\\u0061bar;',
          value: 'abar',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

      pass('scans \'foo\\u0061;\'', {
          source: 'foo\\u0061;',
          value: 'fooa',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

      pass('scans \'foo\\u0061;\'', {
          source: 'foo\\u0061;',
          value: 'fooa',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

  });

  describe('Keywords', () => {

      pass('scans \'for\'', {
          source: 'for',
          value: 'for',
          raw: '\'case\'',
          token: Token.ForKeyword,
          line: 1,
          column: 3,
      });

      pass('scans \'let\'', {
          source: 'let',
          value: 'let',
          raw: '\'let\'',
          token: Token.LetKeyword,
          line: 1,
          column: 3,
      });

      pass('scans \'class\'', {
          source: 'class',
          value: 'class',
          raw: '\'case\'',
          token: Token.ClassKeyword,
          line: 1,
          column: 5,
      });

      pass('scans \'async\'', {
          source: 'async',
          value: 'async',
          raw: '\'async\'',
          token: Token.AsyncKeyword,
          line: 1,
          column: 5,
      });

      pass('scans \'yield\'', {
          source: 'yield',
          value: 'yield',
          raw: '\'case\'',
          token: Token.YieldKeyword,
          line: 1,
          column: 5,
      });

      pass('scans \'function\'', {
          source: 'function',
          value: 'function',
          raw: '\'function\'',
          token: Token.FunctionKeyword,
          line: 1,
          column: 8,
      });
  });

  describe('Escaped keywords', () => {

      pass('scans \'v\\u0061r\'', {
        source: 'v\\u0061r',
        value: 'var',
        raw: '',
        token: Token.EscapedKeyword,
        line: 1,
        column: 8,
      });

      pass('scans \'\\u0066rom\'', {
          source: '\\u0066rom',
          value: 'from',
          raw: '\\u0066rom',
          token: Token.FromKeyword,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u0061sync\'', {
          source: '\\u0061sync',
          value: 'async',
          raw: '\\u0061s',
          token: Token.AsyncKeyword,
          line: 1,
          column: 10,
      });

      pass('scans \'n\\u0065w\'', {
          source: 'n\\u0065w',
          value: 'new',
          raw: 'n\\u0065w',
          token: Token.EscapedKeyword,
          line: 1,
          column: 8,
      });

      pass('scans \'t\\u0061rget\'', {
          source: 't\\u0061rget',
          value: 'target',
          raw: 't\\u0061rget',
          token: Token.Identifier,
          line: 1,
          column: 11,
      });

      pass('scans \'g\\u0065t\'', {
          source: 'g\\u0065t',
          value: 'get',
          raw: 'g\\u0065t',
          token: Token.GetKeyword,
          line: 1,
          column: 8,
      });

      pass('scans \'s\\u0065t\'', {
          source: 's\\u0065t',
          value: 'set',
          raw: 's\\u0065t',
          token: Token.SetKeyword,
          line: 1,
          column: 8,
      });

      pass('scans \'st\\u0061tic\'', {
          source: 'st\\u0061tic',
          value: 'static',
          raw: 'st\\u0061tic',
          token: Token.EscapedStrictReserved,
          line: 1,
          column: 11,
      });

      pass('scans \'o\\u0066\'', {
          source: 'o\\u0066',
          value: 'of',
          raw: 'o\\u0066',
          token: Token.OfKeyword,
          line: 1,
          column: 7,
      });

      pass('scans \'l\\u0065t\'', {
          source: 'l\\u0065t',
          value: 'let',
          raw: 'l\\u0065t',
          token: Token.EscapedStrictReserved,
          line: 1,
          column: 8,
      });

      pass('scans \'\\u0061sync\'', {
          source: '\\u0061sync',
          value: 'async',
          raw: '\\u0061s',
          token: Token.AsyncKeyword,
          line: 1,
          column: 10,
      });

      pass('scans \'\\u0061s\'', {
          source: '\\u0061s',
          value: 'as',
          raw: '\\u0061s',
          token: Token.AsKeyword,
          line: 1,
          column: 7,
      });

      pass('scans \'d\\u0065fault\'', {
          source: 'd\\u0065fault',
          value: 'default',
          raw: 'd\\u0065fault',
          token: Token.EscapedKeyword,
          line: 1,
          column: 12,
      });

      pass('scans \'\\u{63}ase\'', {
          source: '\\u{63}ase',
          value: 'case',
          raw: '\'case\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{63}ase\'', {
          source: '\\u{63}ase',
          value: 'case',
          raw: '\'case\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{63}ase\'', {
          source: '\\u{63}ase',
          value: 'case',
          raw: '\'case\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{63}ase\'', {
          source: '\\u{63}ase',
          value: 'case',
          raw: '\'case\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{63}ase\'', {
          source: '\\u{63}ase',
          value: 'case',
          raw: '\'case\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{63}ase\'', {
          source: '\\u{63}ase',
          value: 'case',
          raw: '\'case\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });

      pass('scans \'\\u{63}ase\'', {
          source: '\\u{63}ase',
          value: 'case',
          raw: '\'case\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });
      pass('scans \'cl\\u0061ss\'', {
          source: 'cl\\u0061ss',
          value: 'class',
          raw: '\'var\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 10,
      });

      pass('scans \'cl\\u0061ss\'', {
          source: '\\u0063onst',
          value: 'const',
          raw: '\'var\'',
          token: Token.EscapedKeyword,
          line: 1,
          column: 10,
      });

      pass('scans \'a\\u0071c\'', {
          source: 'a\\u0071c',
          value: 'aqc',
          raw: 'a\\u0071c',
          token: Token.Identifier,
          line: 1,
          column: 8,
      });

      pass('scans \'\\u007Xvwxyz\'', {
          source: '\\u007Xvwxyz',
          value: 'qvwxyz',
          raw: 'abc',
          token: Token.Identifier,
          line: 1,
          column: 11,
      });

      pass('scans \'ab\\u{72}\'', {
          source: 'ab\\u{72}',
          value: 'abr',
          raw: 'ab\\u{72}',
          token: Token.Identifier,
          line: 1,
          column: 8,

      });

      pass('scans \'ab\\u{000072}\'', {
          source: 'ab\\u{000072}',
          value: 'abr',
          raw: 'ab\\u{000072}',
          token: Token.Identifier,
          line: 1,
          column: 12,
      });

      pass('scans \'\\u007Xvwxyz\'', {
          source: '\\u007Xvwxyz',
          value: 'qvwxyz',
          raw: '\\u007Xvwxyz',
          token: Token.Identifier,
          line: 1,
          column: 11,
      });

      pass('scans \'a\\u{71}c\'', {
          source: 'a\\u{71}c',
          value: 'aqc',
          raw: 'a\\u{71}c',
          token: Token.Identifier,
          line: 1,
          column: 8,
      });

      pass('scans \'\\u{70}bc\'', {
          source: '\\u{70}bc',
          value: 'pbc',
          raw: '\\u{70}bc',
          token: Token.Identifier,
          line: 1,
          column: 8,
      });

      pass('scans \'ab\\u{0000000000000000000072}\'', {
          source: 'ab\\u{0000000000000000000072}',
          value: 'abr',
          raw: 'ab\\u{0000000000000000000072}',
          token: Token.Identifier,
          line: 1,
          column: 28,
      });
      pass('scans \'abc\\u007Xvwxyz\'', {
          source: 'abc\\u007Xvwxyz',
          value: 'abcqvwxyz',
          raw: 'abc\\u007Xvwxyz',
          token: Token.Identifier,
          line: 1,
          column: 14,
      });

      pass('scans \'f\\u0061lse\'', {
          source: 'f\\u0061lse',
          value: 'false',
          raw: 'f\\u0061lse',
          token: Token.EscapedKeyword,
          line: 1,
          column: 10,
      });

      pass('scans \'c\\u006fntinue\'', {
          source: 'c\\u006fntinue',
          value: 'continue',
          raw: 'c\\u006fntinue',
          token: Token.EscapedKeyword,
          line: 1,
          column: 13,
      });

      pass('scans \'e\\u0078port\'', {
          source: 'e\\u0078port',
          value: 'export',
          raw: 'e\\u0078port',
          token: Token.EscapedKeyword,
          line: 1,
          column: 11,
      });

      pass('scans \'\\u0065num\'', {
          source: '\\u0065num',
          value: 'enum',
          raw: '\\u0065num',
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });

      pass('scans \'d\\u0065fault\'', {
          source: 'd\\u0065fault',
          value: 'default',
          raw: 'd\\u0065fault',
          token: Token.EscapedKeyword,
          line: 1,
          column: 12,
      });
  });

  describe('Escaped strict reserved', () => {

      pass('scans \'yi\\u0065ld\'', {
          source: 'yi\\u0065ld',
          value: 'yield',
          raw: 'yi\\u0065ld',
          token: Token.EscapedStrictReserved,
          line: 1,
          column: 10,
      });
  });

  describe('Others', () => {

    pass('scans \'𞸀\'', {
      source: '𞸀',
      value: '𞸀',
      raw: '𞸀',
      token: Token.Identifier,
      line: 1,
      column: 2,
     });

    pass('scans \'\u000A\u000D\u2028\u2029ab\'', {
      source: '\u000A\u000D\u2028\u2029ab',
      value: 'ab',
      raw: 'cD',
      token: Token.Identifier,
      line: 5,
      column: 2,
     });

    pass('scans \'a\u2001b\'', {
      source: 'a\u2001b',
      value: 'a',
      raw: 'a',
      token: Token.Identifier,
      line: 1,
      column: 1,
     });

    pass('scans \'cD\'', {
      source: 'a\u03C2\u180E',
      value: 'aς',
      raw: 'cD',
      token: Token.Identifier,
      line: 1,
      column: 2,
     });

    pass('scans \'cD\'', {
          source: 'cD',
          value: 'cD',
          raw: 'cD',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'$e\'', {
          source: '$e',
          value: '$e',
          raw: '$e',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'_g\'', {
          source: '_g',
          value: '_g',
          raw: '_g',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'_H\'', {
          source: '_H',
          value: '_H',
          raw: '_H',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'___foo_______\'', {
          source: '___foo_______',
          value: '___foo_______',
          raw: '___foo_______',
          token: Token.Identifier,
          line: 1,
          column: 13,
      });

    pass('scans \'________foo_________________________bar________________\'', {
          source: '________foo_________________________bar________________',
          value: '________foo_________________________bar________________',
          raw: '________foo_________________________bar________________',
          token: Token.Identifier,
          line: 1,
          column: 55,
      });

    pass('scans \'__\'', {
          source: '__',
          value: '__',
          raw: '__',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'_\'', {
          source: '_',
          value: '_',
          raw: '_',
          token: Token.Identifier,
          line: 1,
          column: 1,
      });

    pass('scans \'$U\'', {
          source: '$U',
          value: '$U',
          raw: '$U',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'℘\'', {
          source: 'a℘',
          value: 'a℘',
          raw: 'a℘',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'abc℘\'', {
          source: 'abc℘',
          value: 'abc℘',
          raw: 'abc℘',
          token: Token.Identifier,
          line: 1,
          column: 4,
      });

    pass('scans \'a𐊧\'', {
          source: 'a𐊧',
          value: 'a𐊧',
          raw: 'a𐊧',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });
    pass('scans \'a℘\'', {
          source: 'a℘',
          value: 'a℘',
          raw: 'a℘',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'a℮\'', {
          source: 'a℮',
          value: 'a℮',
          raw: 'a℮',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'foo\'', {
          source: 'foo',
          value: 'foo',
          raw: 'foo',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });

      // Ignore bar - proves that the ASCII char table works
    pass('scans \'foo\'', {
          source: 'foo bar',
          value: 'foo',
          raw: 'foo',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });

    pass('scans \'$Insane\'', {
          source: '$Insane',
          value: '$Insane',
          raw: '$Insane',
          token: Token.Identifier,
          line: 1,
          column: 7,
      });

    pass('scans \'_foo\'', {
          source: '_foo',
          value: '_foo',
          raw: '_foo',
          token: Token.Identifier,
          line: 1,
          column: 4,
      });

    pass('scans \'_$_\'', {
          source: '_$_',
          value: '_$_',
          raw: '_',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });

    pass('scans \'foo🀒\'', {
          source: 'foo🀒',
          value: 'foo🀒',
          raw: '\'\'',
          token: Token.Identifier,
          line: 1,
          column: 5,
      });

    pass('scans \'foo𞸀\'', {
          source: 'foo𞸀',
          value: 'foo𞸀',
          raw: 'foo𞸀',
          token: Token.Identifier,
          line: 1,
          column: 5,
      });

    pass('scans \'_𞸃\'', {
          source: '_𞸃',
          value: '_𞸃',
          raw: '_𞸃',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });

    pass('scans \'a℮\'', {
          source: 'a℮',
          value: 'a℮',
          raw: 'a℮',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'a፭\'', {
          source: 'a፭',
          value: 'a፭',
          raw: 'a፭',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'a፭\'', {
          source: 'a፭',
          value: 'a፭',
          raw: 'a፭',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'a፰\'', {
          source: 'a፰',
          value: 'a፰',
          raw: 'a፰',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'a℘\'', {
          source: 'a℘',
          value: 'a℘',
          raw: 'a℘',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'a᧚\'', {
          source: 'a᧚',
          value: 'a᧚',
          raw: 'a᧚',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'a·\'', {
          source: 'a·',
          value: 'a·',
          raw: 'a·',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'$$\'', {
          source: '$$',
          value: '$$',
          raw: '$$',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'__\'', {
          source: '__',
          value: '__',
          raw: '__',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'_I\'', {
          source: '_I',
          value: '_I',
          raw: '_I',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'foo bar\'', {
          source: 'foo bar',
          value: 'foo',
          raw: 'foo',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });

    pass('scans \'O7\'', {
          source: 'O7',
          value: 'O7',
          raw: 'O7',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'wX\'', {
          source: 'wX',
          value: 'wX',
          raw: 'wX',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'$4\'', {
          source: '$4',
          value: '$4',
          raw: '$4',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });

    pass('scans \'$_\'', {
          source: '$_',
          value: '$_',
          raw: '$_',
          token: Token.Identifier,
          line: 1,
          column: 2,
      });
  });

  // The RHS of the identifier should become a 'BinaryExpression'
  describe('RHS as expression', () => {

      pass('scans \'foo+bar\'', {
          source: 'foo+bar',
          value: 'foo',
          raw: 'foo',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });

      // The RHS of the identifier should become a 'BinaryExpression'
      pass('scans \'foo/bar\'', {
          source: 'foo/bar',
          value: 'foo',
          raw: 'foo',
          token: Token.Identifier,
          line: 1,
          column: 3,
      });
  });
});
