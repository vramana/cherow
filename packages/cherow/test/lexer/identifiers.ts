import { Identifier } from './../../src/estree';
import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { createParserObject } from '../../src/parser/parser';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - Identifier', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context) {
          it(name, () => {
              if (opts.strict !== true) {
                  const parser = createParserObject(opts.source, undefined);
                  t.deepEqual({
                      token: nextToken(parser, context),
                      value: parser.tokenValue,
                      line: parser.line,
                      column: parser.column,
                  }, {
                      token: opts.token,
                      value: opts.value,
                      line: opts.line,
                      column: opts.column,
                  });
              }
          });
      }
      test(`${name}`, Context.OptionsRaw);
  }

  function fail(name: string, context: Context, opts: any): any {
      it(name, () => {
          const parser = createParserObject(opts.source, undefined);
          t.throws(() => {
              nextToken(parser, context)
          });
      });
  }

  fail('should fail "\\uD83B\\uDE00"', Context.Empty, {
      source: '\\\uD83B\\uDE00'
  })

  pass("scans 'a𐊧'", {
    source: "a𐊧",
    "value": "a𐊧",
    raw: "'abc'",
    token: Token.Identifier,
    line: 1,
    column: 3,
});


pass("scans 'a℘'", {
      source: "a℘",
      "value": "a℘",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans 'a℮'", {
      source: "a℮",
      "value": "a℮",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans 'a፭'", {
      source: "a፭",
      "value": "a፭",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans 'a፭'", {
      source: "a፭",
      "value": "a፭",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans 'a፰'", {
      source: "a፰",
      "value": "a፰",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans 'a℘'", {
      source: "a℘",
      "value": "a℘",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans 'a᧚'", {
      source: "a᧚",
      "value": "a᧚",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans 'a·'", {
      source: "a·",
      "value": "a·",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans '℘'", {
      source: "℘",
      "value": "℘",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 1,
  });

  pass("scans '℮'", {
      source: "℮",
      "value": "℮",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 1,
  });

  pass("scans '゛'", {
      source: "゛",
      "value": "゛",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 1,
  });

  pass("scans 'ᢆ'", {
      source: " ᢆ",
      "value": "ᢆ",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans '$4'", {
      source: "$4",
      "value": "$4",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans '$$'", {
      source: "$$",
      "value": "$$",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans '$_'", {
      source: "$_",
      "value": "$_",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans '\\u0052oo'", {
      source: "\\u0052oo",
      "value": "Roo",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 8,
  });

  pass("scans 'var'", {
      source: "var",
      value: "var",
      raw: "'var'",
      token: Token.VarKeyword,
      line: 1,
      column: 3,
  });

  pass("scans '\\u0061sync'", {
      source: "\\u0061sync",
      value: "async",
      raw: "'var'",
      token: Token.AsyncKeyword,
      line: 1,
      column: 10,
  });

  pass("scans '\\u0061s'", {
      source: "\\u0061s",
      value: "as",
      raw: "'var'",
      token: Token.AsKeyword,
      line: 1,
      column: 7,
  });

  pass("scans '\\u0061wait'", {
      source: "\\u0061wait",
      value: "await",
      raw: "'var'",
      token: Token.AwaitKeyword,
      line: 1,
      column: 10,
  });

  describe('Escaped identifiers', () => {

      pass("scans '\\u{1EE0A}\\u{1EE0B}'", {
          source: "\\u{1EE0A}\\u{1EE0B}",
          value: "𞸊𞸋",
          raw: "'var'",
          token: Token.Identifier,
          line: 1,
          column: 18,
      });

      pass("scans '\\u{1EE06}_$'", {
          source: "\\u{1EE06}_$",
          value: "𞸆_$",
          raw: "'var'",
          token: Token.Identifier,
          line: 1,
          column: 11,
      });

      pass("scans '\\u{1EE00}'", {
          source: "\\u{1EE00}",
          value: "𞸀",
          raw: "'var'",
          token: Token.Identifier,
          line: 1,
          column: 9,
      });

      pass("scans '_\\u{1EE03}'", {
          source: "_\\u{1EE03}",
          value: "_𞸃",
          raw: "'var'",
          token: Token.Identifier,
          line: 1,
          column: 10,
      });

  });

  describe('Supplementary Multilingual Plane (SMP)', () => {

      pass("scans '_\\u{1EE03}'", {
          source: "_\\u{1EE03}",
          "value": "_𞸃",
          raw: "'var'",
          token: Token.Identifier,
          line: 1,
          column: 10,
      });

      pass("scans '\\u{1EE0A}\\u{1EE0B}'", {
          source: "\\u{1EE0A}\\u{1EE0B}",
          "value": "𞸊𞸋",
          raw: "'var'",
          token: Token.Identifier,
          line: 1,
          column: 18,
      });

  });

  describe('Escaped keywords', () => {


      pass("scans 'cl\\u0061ss'", {
          source: "cl\\u0061ss",
          value: "class",
          raw: "'var'",
          token: Token.EscapedKeyword,
          line: 1,
          column: 10,
      });

      pass("scans 'cl\\u0061ss'", {
          source: "\\u0063onst",
          value: "const",
          raw: "'var'",
          token: Token.EscapedKeyword,
          line: 1,
          column: 10,
      });

      pass("scans 'f\\u0061lse'", {
          source: "f\\u0061lse",
          value: "false",
          raw: "'var'",
          token: Token.EscapedKeyword,
          line: 1,
          column: 10,
      });

      pass("scans 'c\\u006fntinue'", {
          source: "c\\u006fntinue",
          value: "continue",
          raw: "'var'",
          token: Token.EscapedKeyword,
          line: 1,
          column: 13,
      });

      pass("scans 'e\\u0078port'", {
          source: "e\\u0078port",
          value: "export",
          raw: "'var'",
          token: Token.EscapedKeyword,
          line: 1,
          column: 11,
      });

      pass("scans '\\u0065num'", {
          source: "\\u0065num",
          value: "enum",
          raw: "'var'",
          token: Token.EscapedKeyword,
          line: 1,
          column: 9,
      });

      pass("scans 'd\\u0065fault'", {
          source: "d\\u0065fault",
          value: "default",
          raw: "'var'",
          token: Token.EscapedKeyword,
          line: 1,
          column: 12,
      });
  });

  describe('Escaped strict reserved', () => {

      pass("scans 'yi\\u0065ld'", {
          source: "yi\\u0065ld",
          value: "yield",
          raw: "'var'",
          token: Token.EscapedStrictReserved,
          line: 1,
          column: 10,
      });
  });
});
