import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - BigInt', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context) {
          it(name, () => {
              const state = new State(opts.source, undefined, undefined);

              t.deepEqual({
                  token: nextToken(state, context),
                  value: state.tokenValue,
                  line: state.line,
                  column: state.column,
              },          {
                  token: Token.BigInt,
                  value: opts.value,
                  line: opts.line,
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

  fail('Binary BigInt literal containing an invalid digit', Context.OptionsNext, {
      source: '00n'
  });

  fail('Binary BigInt literal containing an invalid digit', Context.OptionsNext, {
      source: '01n'
  });

  fail('Binary BigInt literal containing an invalid digit', Context.OptionsNext, {
      source: '1e25n'
  });

  fail('Hex BigInt literal containing an invalid digit', Context.OptionsNext, {
      source: '0xn'
  });

  fail('It is a Syntax Error if the NumericLiteralBase contains an ExponentPart', Context.OptionsNext, {
      source: '0e0n'
  });

  fail('Hexadecimal BigInt literal containing an invalid digit', Context.Strict | Context.Module, {
      source: '0xgn'
  });

  fail('it is a Syntax Error if the MV is not an integer. (decimalIntegerLiteral dot decimalDigits)', Context.Strict | Context.Module, {
      source: '2017.8n'
  });

  fail('Octal BigInt literal containing an invalid digit', Context.Strict | Context.Module, {
      source: '0o9n'
  });

  // Various radixes
  pass('scans "0xabcden"', {
      source: '0xabcden',
      value: '703710',
      raw: '0xabcden',
      token: Token.BigInt,
      line: 1,
      column: 8,
  });

  pass('scans "0b1010101n"', {
      source: '0b1010101n',
      value: 85,
      raw: '0b1010101n',
      token: Token.BigInt,
      line: 1,
      column: 10,
  });

  pass('scans "0o54321n"', {
      source: '0o54321n',
      value: 22737,
      raw: '0o54321n',
      token: Token.BigInt,
      line: 1,
      column: 8,
  });
});
