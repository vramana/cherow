import * as t from 'assert';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

describe('Lexer - Identifiers', () => {
  const tokens: Array<[Context, Token, string, string]> = [
    [Context.Empty, Token.Identifier, 'a', 'a'],
    [Context.Empty, Token.Identifier, 'A', 'A'],
    [Context.Empty, Token.Identifier, 'gy', 'gy'],
    [Context.Empty, Token.Identifier, 'M5', 'M5'],
    [Context.Empty, Token.Identifier, '$e', '$e'],
    [Context.Empty, Token.Identifier, '$A', '$A'],
    [Context.Empty, Token.Identifier, '_', '_'],
    [Context.Empty, Token.Identifier, '$', '$'],
    [Context.Empty, Token.Identifier, '$i', '$i'],
    [Context.Empty, Token.Identifier, '_O', '_O'],
    [Context.Empty, Token.Identifier, '_r', '_r'],
    [Context.Empty, Token.Identifier, 'x_y', 'x_y'],
    [Context.Empty, Token.Identifier, 'xyz123', 'xyz123'],
    [Context.Empty, Token.Identifier, 'x1y1z1', 'x1y1z1'],
    [Context.Empty, Token.Identifier, 'a____123___b$', 'a____123___b$'],
    [Context.Empty, Token.Identifier, '_$$$$', '_$$$$'],
    [Context.Empty, Token.Identifier, '$$$$', '$$$$'],
    [Context.Empty, Token.Identifier, 'a1234', 'a1234'],
    [Context.Empty, Token.Identifier, 'a_______3333333', 'a_______3333333'],
    [Context.Empty, Token.Identifier, 'abc', 'abc'],
    [Context.Empty, Token.Identifier, '    $', '$'],
    [Context.Empty, Token.Identifier, '/* skip */   $', '$'],
    [Context.Empty, Token.Identifier, 'CAN_NOT_BE_A_KEYWORD', 'CAN_NOT_BE_A_KEYWORD'],

    // Unicode escape sequence - classic

    [Context.Empty, Token.Identifier, '\\u0070bc', 'pbc'],
    [Context.Empty, Token.Identifier, 'a\\u0071c', 'aqc'],
    [Context.Empty, Token.Identifier, 'ab\\u0072', 'abr'],
    [Context.Empty, Token.Identifier, '\\u044D', 'э'],
    [Context.Empty, Token.Identifier, '\\u0431', 'б'],
    [Context.Empty, Token.Identifier, 'ab\\u0072', 'abr'],
    [Context.Empty, Token.Identifier, 'a\\u2118', 'a℘'],
    [Context.Empty, Token.Identifier, 'a\\u309C', 'a゜'],
    [Context.Empty, Token.Identifier, '\\u2118', '℘'],
    [Context.Empty, Token.Identifier, '\\u309C', '゜'],
    [Context.Empty, Token.Identifier, '\\u1886', 'ᢆ'],
    [Context.Empty, Token.Identifier, 'foo\\u00d8bar', 'fooØbar'], // Identifier With Unicode Escape Sequence (`\\uXXXX`)
    [Context.Empty, Token.Identifier, 'f\u00d8\u00d8bar', 'fØØbar'], // Identifier With Embedded Unicode Character

    // Long unicode escape

    [Context.Empty, Token.Identifier, '\\u{70}bc', 'pbc'],
    [Context.Empty, Token.Identifier, '\\u{70}bc\\u{70}bc', 'pbcpbc'],
    [Context.Empty, Token.Identifier, '\\u{070}bc', 'pbc'],
    [Context.Empty, Token.Identifier, 'ab\\u{0072}', 'abr'],
    [Context.Empty, Token.Identifier, 'ab\\u{00072}', 'abr'],
    [Context.Empty, Token.Identifier, 'ab\\u{072}', 'abr'],
    [Context.Empty, Token.Identifier, '\\u{4fff}', '俿'],
    [Context.Empty, Token.Identifier, '\\u{1EE00}', '{Ȁ'],
    [Context.Empty, Token.Identifier, 'a\\u{0000000000000000000071}c', 'aqc'],

    // Keywords
    [Context.Empty, Token.BreakKeyword, 'break', 'break'],
    [Context.Empty, Token.Identifier, 'Yield', 'Yield'],
    [Context.Empty, Token.YieldKeyword, 'yield', 'yield'],
    [Context.Empty, Token.LetKeyword, 'let', 'let'],
    [Context.Empty, Token.PublicKeyword, 'public', 'public'],
    [Context.Empty, Token.EnumKeyword, 'enum', 'enum'],

    // Escaped Keywords
    [Context.Empty, Token.EscapedKeyword, '\\u0061sync', 'async'],
    [Context.Strict, Token.EscapedKeyword, '\\u0061sync', 'async'],
    [Context.Empty, Token.EscapedKeyword, 'br\\u0065ak', 'break'],
    [Context.Empty, Token.Identifier, 'Br\\u0065ak', 'Break'],
    [Context.Strict, Token.EscapedStrictReserved, 'int\\u0065rface', 'interface'],
    [Context.Empty, Token.InterfaceKeyword, 'int\\u0065rface', 'interface'],
    [Context.Empty, Token.YieldKeyword, 'yi\\u0065ld', 'yield'],
    [Context.Strict, Token.YieldKeyword, 'yi\\u0065ld', 'yield'],

    // Others

    [Context.Empty, Token.Identifier, 'a𐊧123', 'a𐊧123'],
    [Context.Empty, Token.Identifier, 'название', 'название'],
    [Context.Empty, Token.Identifier, 'دیوانه', 'دیوانه'],
    [Context.Empty, Token.Identifier, 'a℮', 'a℮'],
    [Context.Empty, Token.Identifier, 'aᢆ', 'aᢆ'],
    [Context.Empty, Token.Identifier, 'ᢆ', 'ᢆ'],
    [Context.Empty, Token.Identifier, 'a፰', 'a፰'],
    [Context.Empty, Token.Identifier, 'a℮', 'a℮'],
    [Context.Empty, Token.Identifier, '゛', '゛'],
    [Context.Empty, Token.Identifier, '℮', '℮'],
    [Context.Empty, Token.Identifier, '℘', '℘'],
    [Context.Empty, Token.Identifier, 'a᧚', 'a᧚'],
    [Context.Empty, Token.Identifier, '$00xxx\\u0069\\u0524\\u{20BB7}', '$00xxxiԤη']
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

  fail('fails on \\{4fff}', '\\{4fff}', Context.Empty);
  fail('fails on a🀒c', 'a🀒c', Context.Empty);
  fail('fails on a😍c', 'a😍c', Context.Empty);
  fail('fails on ፰', '፰', Context.Empty); // Invalid as IdentifierStart
  fail('fails on ᧚', '᧚', Context.Empty); // Invalid as IdentifierStart
  fail('fails on \\u007', '\\u007', Context.Strict);
  fail('fails on \\u00', '\\u00', Context.Empty);
  fail('fails on \\u044', '\\u044', Context.Empty);
  fail('fails on \\u0', '\\u0', Context.Empty);
  fail('fails on \\u', '\\u', Context.Empty);
  fail('fails on \\', '\\', Context.Empty);
  fail('fails on \\uD800', '\\uD800', Context.Empty);
  fail('fails on \\uD83B\\uDE00', '\\uD83B\\uDE00', Context.Empty);
  fail('fails on \\u007Xvwxyz', '\\u007Xvwxyz', Context.Empty);
  fail('fails on \\u007Xvwxyz', '\\u007Xvwxyz', Context.Empty);
  fail('fails on \\u00Xvwxyz', '\\u00Xvwxyz', Context.Empty);
  fail('fails on \\u0Xvwxyz', '\\u0Xvwxyz', Context.Empty);
  fail('fails on \\uXvwxyz', '\\uXvwxyz', Context.Empty);
  fail('fails on \\Xvwxyz', '\\Xvwxyz', Context.Empty);
  fail('fails on abc\\u007', 'abc\\u007', Context.Empty);
  fail('fails on abc\\u00', 'abc\\u00', Context.Empty);
  fail('fails on abc\\u0', 'abc\\u0', Context.Strict);
  fail('fails on abc\\u', 'abc\\u', Context.Strict);
  fail('fails on abc\\', 'abc\\', Context.Strict);
  fail('fails on abc\\u007Xvwxyz', 'abc\\u007Xvwxyz;', Context.Strict);
  fail('fails on abc\\u007Xvwxyz', 'abc\\u007Xvwxyz', Context.Strict);
  fail('fails on abc\\u00Xvwxyz', 'abc\\u00Xvwxyz', Context.Strict);
  fail('fails on abc\\u0Xvwxyz', 'abc\\u0Xvwxyz', Context.OptionsNext);
  fail('fails on abc\\uXvwxyz', 'abc\\uXvwxyz', Context.OptionsNext);
  fail('fails on `abc\\Xvwxyz', '`abc\\Xvwxyz', Context.OptionsNext);
  fail('fails on \\u00', '\\u00', Context.OptionsNext);
  fail('fails on \\u007', '\\u007', Context.OptionsNext);
  fail('fails on \\u007Xvwxyz', '\\u007Xvwxyz', Context.OptionsNext);
  fail('fails on abc\\u{}', 'abc\\u{}', Context.OptionsNext);
  fail('fails on abc\\u}', 'abc\\u}', Context.OptionsNext);
  fail('fails on abc\\u{', 'abc\\u{', Context.OptionsNext);
  fail('fails on \\u{70bc', '\\u{70bc', Context.OptionsNext);
  fail('fails on \\u{70', '\\u{70', Context.OptionsNext);
  fail('fails on \\u104', '\\u104', Context.Empty);
  fail('fails on \\u{10401', '\\u{10401', Context.Empty);
  fail('fails on \\u104', '\\u104', Context.Empty);
  fail('fails on \\u{!', '\\u{!', Context.Empty);
  fail('fails on \\u', '\\u', Context.Empty);
  fail('fails on \\u{4fff', '\\u{4fff', Context.Empty);
  fail('fails on \\u{4ff', '\\u{4ff', Context.Empty);
  fail('fails on a\\u{4fff', 'a\\u{4fff', Context.Empty);
  fail('fails on a\\u{4ff', 'a\\u{4ff', Context.Empty);
  fail('fails on \\u{!', '\\u{!', Context.Empty);
  fail('fails on \\u{}', '\\u{}', Context.Empty);
  fail('fails on \\u', '\\u', Context.Empty);
  fail('fails on \\8', '\\8', Context.Empty);
  fail('fails on \\9', '\\9', Context.Empty);
  fail('fails on \\', '\\', Context.Empty);
  fail('fails on \\u0', '\\u0', Context.Empty);
  fail('fails on \\u00', '\\u00', Context.Empty);
  fail('fails on \\u00Xvwxyz', '\\u00Xvwxyz', Context.Empty);
  fail('fails on \\u{10401', '\\u{10401', Context.Empty);
  fail('fails on \\u{110000}', '\\u{110000}', Context.Empty);
  fail('fails on \\u0x11ffff', '\\u0x11ffff', Context.Empty);
});
