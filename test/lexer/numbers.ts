import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token,  } from '../../src/token';

describe('Lexer - Nuasdfmbers', () => {

  describe('Pass', () => {

    function pass(name: string, opts: any): any {
      function test(name: string, context: Context): any {
        it(name, () => {
            const state = new State(opts.source, undefined, undefined);

            t.deepEqual({
              token: nextToken(state, context),
              value: state.tokenValue,
              line: state.line,
              raw: state.tokenRaw,
              column: state.column,
            },          {
                token: opts.token,
                value: opts.value,
                line: opts.line,
                raw: opts.raw,
                column: opts.column,
              });
        });
      }
      test(`${name}`, Context.OptionsRaw);
    }
    function fail(name: string, context: Context, opts: any): any {
        it(name, () => {
          const state = new State(opts.source, undefined, undefined);
          t.throws(() => {
            nextToken(state, context);
          });
        });
    }

    fail('should fail on keyword immediately after numeric literal', Context.Empty, {
      source: '3in'
    });

    fail('should fail on chinese immediately after numeric literal', Context.Empty, {
      source: '123中国'
    });
    fail('should fail on IDStart immediately after numeric literal', Context.Empty, {
      source: '123a'
    });

    fail('should fail on BigInt and decimal', Context.Empty, {
      source: '.333n'
    });

    fail('should fail on private name followed by space', Context.Empty, {
      source: '0b'
    });

    fail('should fail on private name followed by space', Context.Empty, {
      source: '0ba'
    });

    fail('should fail "00o0"', Context.Empty, {
      source: '0o8'
    });

    fail('should fail legacy octals in strict mode', Context.Strict | Context.Module, {
      source: '0063'
    });

    fail('should fail "00o0"', Context.Strict | Context.Module, {
      source: '09'
    });

    fail('should fail "00o0"', Context.Strict | Context.Module, {
      source: '09.1'
    });

    fail('should fail "0o2424bb"', Context.Empty, {
      source: '0o2424bb'
    });

    pass('scans \'\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u30001234\'', {
      source: '\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u30001234',
      value: 1234,
      raw: '1234',
      token: Token.NumericLiteral,
      line: 1,
      column: 19,
    });

    pass('scans \'\x20\x09\x0B\x0C\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF123\'', {
      source: '\x20\x09\x0B\x0C\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF123',
      value: 123,
      raw: '123',
      token: Token.NumericLiteral,
      line: 1,
      column: 24,
    });

    pass('scans \'09.44\'', {
      source: '09.44',
      value: 9,
      raw: '09',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'074449\'', {
      source: '074449',
      value: 74449,
      raw: '074449',
      token: Token.NumericLiteral,
      line: 1,
      column: 6,
    });

    pass('scans \'0000000003938\'', {
      source: '0000000003938',
      value: 3,
      raw: '0000000003',
      token: Token.NumericLiteral,
      line: 1,
      column: 10,
    });

    pass('scans \'7890', {
      source: '7890',
      value: 7890,
      raw: '7890',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'2.3', {
      source: '2.3',
      value: 2.3,
      raw: '2.3',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });

    pass('scans \'1e234', {
      source: '1e234',
      value: 1e+234,
      raw: '1e234',
      token: Token.NumericLiteral,
      line: 1,
      column: 5,
    });

    pass('scans \'1234567890.0987654321', {
      source: '1234567890.0987654321',
      value: 1234567890.0987654321,
      raw: '1234567890.0987654321',
      token: Token.NumericLiteral,
      line: 1,
      column: 21,
    });

    pass('scans \'32e32', {
      source: '32e32',
      raw: '32e32',
      'value': 3.2e+33,
      token: Token.NumericLiteral,
      line: 1,
      column: 5,
    });
    pass('scans \'1E-100', {
      source: '1E-100',
      value: 1e-100,
      raw: '1E-100',
      token: Token.NumericLiteral,
      line: 1,
      column: 6,
    });

    pass('scans \'.1e+100', {
      source: '.1e+100',
      value: 1e+99,
      raw: '.1e+100',
      token: Token.NumericLiteral,
      line: 1,
      column: 7,
    });

    pass('scans \'0.1E+100', {
      source: '0.1E+100',
      value: 1e+99,
      raw: '0.1E+100',
      token: Token.NumericLiteral,
      line: 1,
      column: 8,
    });

    pass('scans \'0O12345670', {
      source: '0O12345670',
      value: 2739128,
      raw: '0O12345670',
      token: Token.NumericLiteral,
      line: 1,
      column: 10,
    });

    pass('scans \'1', {
      source: '1',
      value: 1,
      raw: '1',
      token: Token.NumericLiteral,
      line: 1,
      column: 1,
    });

    pass('scans \'0xAn', {
      source: '0xAn',
      value: 10,
      raw: '0xAn',
      token: Token.BigInt,
      line: 1,
      column: 4,
    });

    pass('scans \'00', {
      source: '00',
      value: 0,
      raw: '00',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'0123', {
      source: '0123',
      value: 83,
      raw: '0123',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0123789', {
      source: '0123789',
      value: 123789,
      raw: '0123789',
      token: Token.NumericLiteral,
      line: 1,
      column: 7,
    });

    pass('scans \'0xD', {
      source: '0xD',
      value: 13,
      raw: '0xD',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });

    pass('scans \'.1234567890', {
      source: '.1234567890',
      value: 0.123456789,
      raw: '.1234567890',
      token: Token.NumericLiteral,
      line: 1,
      column: 11,
    });

    pass('scans \'.0000', {
      source: '.0000',
      value: 0,
      raw: '.0000',
      token: Token.NumericLiteral,
      line: 1,
      column: 5,
    });

    pass('scans \'0o4', {
      source: '0o4',
      value: 4,
      raw: '0o4',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });

    pass('scans \'0o4', {
      source: '0o4',
      value: 4,
      raw: '0o4',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });

    pass('scans \'87.04', {
      source: '87.04',
      value: 87.04,
      raw: '87.04',
      token: Token.NumericLiteral,
      line: 1,
      column: 5,
    });

    pass('scans \'0.1e-100', {
      source: '0.1e-100',
      value: 1e-101,
      raw: '0.1e-100',
      token: Token.NumericLiteral,
      line: 1,
      column: 8,
    });

    pass('scans \'0x34', {
      source: '0x34',
      value: 52,
      raw: '0x34',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0xf5', {
      source: '0xf5',
      value: 245,
      raw: '0xf5',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0x01', {
      source: '0x01',
      value: 1,
      raw: '0x01',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0x45', {
      source: '0x45',
      value: 69,
      raw: '0x45',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0x89', {
      source: '0x89',
      value: 137,
      raw: '0x89',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0b11', {
      source: '0b11',
      value: 3,
      raw: '0b11',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0b00', {
      source: '0b00',
      value: 0,
      raw: '0b00',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0o23', {
      source: '0o23',
      value: 19,
      raw: '0o23',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'07', {
      source: '07',
      value: 7,
      raw: '07',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'0o23', {
      source: '0o23',
      value: 19,
      raw: '0o23',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0o23', {
      source: '0o23',
      value: 19,
      raw: '0o23',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0o23', {
      source: '0o23',
      value: 19,
      raw: '0o23',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'.32E3\'', {
      source: '.32E3',
      value: 320,
      raw: '.32E3',
      token: Token.NumericLiteral,
      line: 1,
      column: 5,
    });

    pass('scans \'19\'', {
      source: '19',
      value: 19,
      raw: '19',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'.7\'', {
      source: '.7',
      value: 0.7,
      raw: '.7',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'09\'', {
      source: '09',
      value: 9,
      raw: '09',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'0x67\'', {
      source: '0x67',
      value: 103,
      raw: '0x67',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0o12345670\'', {
      source: '0o12345670',
      value: 2739128,
      raw: '0o12345670',
      token: Token.NumericLiteral,
      line: 1,
      column: 10
    });

    pass('scans \'0x34\'', {
      source: '0x34',
      value: 52,
      raw: '0x34',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0b01\'', {
      source: '0b01',
      value: 1,
      raw: '0b01',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0009\'', {
      source: '0009',
      value: 9,
      raw: '0009',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'0009.444\'', {
      source: '0009.444',
      value: 9.444,
      raw: '0009.444',
      token: Token.NumericLiteral,
      line: 1,
      column: 8,
    });

    pass('scans \'043\'', {
      source: '043',
      'value': 35,
      raw: '043',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });

    pass('scans \'087\'', {
      source: '087',
      value: 87,
      raw: '087',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });

    pass('scans \'000\'', {
      source: '000',
      value: 0,
      raw: '000',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });

  });

});
