import * as t from 'assert';
import { Context } from '../../../src/common';
import { Token } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';

describe('lexer - numbers', () => {
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

  pass('scan identifier with backslash middle', {
    source: '1',
    ctx: Context.OptionsNext,
    token: Token.NumericLiteral,
    value: 1,
    raw: 't\\u0061rget',
    newline: false,
    index: 1
  });

  pass('scan identifier with backslash middle', {
    source: '1.1',
    ctx: Context.OptionsNext,
    token: Token.NumericLiteral,
    value: 1.1,
    raw: 't\\u0061rget',
    newline: false,
    index: 3
  });
  pass('scan identifier with backslash middle', {
    source: '0.1',
    ctx: Context.OptionsNext,
    token: Token.NumericLiteral,
    value: 0.1,
    raw: 't\\u0061rget',
    newline: false,
    index: 3
  });

  pass('scan identifier with backslash middle', {
    source: '0.1e33-2',
    ctx: Context.OptionsNext,
    token: Token.NumericLiteral,
    value: 1e32,
    raw: 't\\u0061rget',
    newline: false,
    index: 6
  });

  pass('scan single digit with following whitespace', {
    source: '1 ',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1,
    raw: '1',
    index: 1
  });

  pass('scan 7890', {
    source: '7890',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 7890,
    raw: '7890',
    index: 4
  });

  pass('scan 0o1', {
    source: '0o1',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1,
    raw: '0o1',
    index: 3
  });

  pass('scan 0o7', {
    source: '0o7',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 7,
    raw: '7890',
    index: 3
  });

  pass('scan 0o77', {
    source: '0o77',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 63,
    raw: '7890',
    index: 4
  });

  pass('scan 077', {
    source: '077',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 63,
    raw: '7890',
    index: 3
  });

  pass('scan 00', {
    source: '00',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0,
    raw: '7890',
    index: 2
  });

  pass('scan 0000000000', {
    source: '0000000000',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0,
    raw: '7890',
    index: 10
  });

  pass('scan 0B0', {
    source: '0B0',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0,
    raw: '7890',
    index: 3
  });

  pass('scan 0b11', {
    source: '0b11',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 3,
    raw: '7890',
    index: 4
  });

  pass('scan 0b011110101011', {
    source: '0b011110101011',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1963,
    raw: '7890',
    index: 14
  });

  pass('scan 0b011110101011011110101011011110101011011110101011011110101011011110101011', {
    source: '0b011110101011011110101011011110101011011110101011011110101011011110101011',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 2.263737583851798e21,
    raw: '7890',
    index: 74
  });

  pass('scan 0O', {
    source: '0O347763234324567677742',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 4178893806153728000,
    raw: '7890',
    index: 23
  });

  pass('scan 0O', {
    source:
      '0O347763234324567677743477632343245676777423477632343245676777423477632343245676777423477632343245676777424442',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1.5484251024493453e97,
    raw: '7890',
    index: 110
  });

  pass('scan 0O', {
    source: '0O3',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 3,
    raw: '7890',
    index: 3
  });

  pass('scan 08e7', {
    source: '08e7',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 80000000,
    raw: '7890',
    index: 4
  });

  pass('scan 0.', {
    source: '0.',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0,
    raw: '7890',
    index: 2
  });

  pass('scan 0e+100000', {
    source: '0e+100000',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0,
    raw: '7890',
    index: 9
  });

  pass('scan 7890', {
    source: '7890',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 7890,
    raw: '7890',
    index: 4
  });

  pass('scan 847003580761626016356864581135848683152156368691976240370422601', {
    source: '847003580761626016356864581135848683152156368691976240370422601',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 8.47003580761626e62,
    raw: '7890',
    index: 63
  });

  pass('scan 4.4501477170144020250819966727949918635852426585926051135169509', {
    source: '4.4501477170144020250819966727949918635852426585926051135169509',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 4.450147717014402,
    raw: '7890',
    index: 63
  });

  pass('scan 1234567890.0987654321', {
    source: '1234567890.0987654321',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1234567890.0987654,
    raw: '1234567890.0987654321',
    index: 21
  });

  pass('scan .0', {
    source: '.0',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0,
    raw: '43.78',
    index: 2
  });

  pass('scan 43.78', {
    source: '43.78',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 43.78,
    raw: '43.78',
    index: 5
  });

  pass('scan 054', {
    source: '054',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 44,
    raw: '43.78',
    index: 3
  });

  pass('scan 09', {
    source: '09',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 9,
    raw: '43.78',
    index: 2
  });

  pass('scan 09', {
    source: '09.33',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 9.33,
    raw: '43.78',
    index: 5
  });

  pass('scan 0o67', {
    source: '0o67',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 55,
    raw: '43.78',
    index: 4
  });

  pass('scan 0B10', {
    source: '0B10',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 2,
    raw: '43.78',
    index: 4
  });

  pass('scan 0x78', {
    source: '0x78',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 120,
    raw: '43.78',
    index: 4
  });

  pass('scan 0xab', {
    source: '0xab',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 171,
    raw: '43.78',
    index: 4
  });

  pass('scan 0x01', {
    source: '0x01',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1,
    raw: '43.78',
    index: 4
  });

  pass('scan 0x56', {
    source: '0x56',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 86,
    raw: '43.78',
    index: 4
  });

  pass('scan 0xD2', {
    source: '0xD2',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 210,
    raw: '43.78',
    index: 4
  });

  pass('scan 0xBe', {
    source: '0xBe',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 190,
    raw: '43.78',
    index: 4
  });

  pass('scan 5.6', {
    source: '5.6',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 5.6,
    raw: '5.6',
    index: 3
  });

  pass('scan 456e456', {
    source: '456e456',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: Infinity,
    raw: '43.78',
    index: 7
  });

  pass('scan .1E-100', {
    source: '.1E-100',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1e-101,
    raw: '.1E-100',
    index: 7
  });

  pass('scan 0', {
    source: '0',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0,
    raw: '0',
    index: 1
  });

  pass('scan .123', {
    source: '.123',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0.123,
    raw: '43.78',
    index: 4
  });

  pass('scan 01', {
    source: '01',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1,
    raw: '43.78',
    index: 2
  });

  pass('scan .2', {
    source: '.2',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 0.2,
    raw: '43.78',
    index: 2
  });

  pass('scan 1e100', {
    source: '1e+100',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 1e100,
    raw: '1e+100',
    index: 6
  });

  pass('scan 6e7', {
    source: '6e7',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 60000000,
    raw: '6e7',
    newline: false,
    line: 1,
    column: 3,
    start: 0,
    index: 3
  });

  pass('scan 0o12345670', {
    source: '0o12345670',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 2739128,
    raw: '0o12345670',
    index: 10
  });

  pass('scan 0x9a', {
    source: '0x9a',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 154,
    raw: '0x9a',
    index: 4
  });

  pass('scan 0x95454EFH5654a', {
    source: '0x555AAFFABCDE9999876543434545454FFFAAADDEE',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 7.796585800953193e48,
    raw: '0x9a',
    index: 43
  });

  pass('scan 0B011', {
    source: '0B011',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 3,
    raw: '0B011',
    index: 5
  });

  pass('scan 0x12', {
    source: '0x12',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 18,
    raw: '0x12',
    index: 4
  });

  pass('skips nothingddddddd', {
    source: '09',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 9,
    raw: '09',
    index: 2
  });

  pass('skips ndddothing', {
    source: '0b000000000101010101011110011010101',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 11189461,
    raw: '0b000000000101010101011110011010101',
    index: 35
  });

  pass('skips notadsfadsfhing', {
    source: '0b00000000010101010101111001101010110101010101111001101010110101010101111001101010110011010101',
    ctx: Context.Empty,
    token: Token.NumericLiteral,
    value: 6.450285490396792e24,
    raw: '0b00000000010101010101111001101010110101010101111001101010110101010101111001101010110011010101',
    index: 94
  });
});
