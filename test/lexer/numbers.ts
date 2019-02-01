import * as t from 'assert';
import { scanSingleToken } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';
import { Token } from '../../src/token';

describe('Lexer - Numbers', () => {
  describe('Numbers', () => {
    context('script', () => run(false));
    context('module', () => run(true));
  });

  function run(isWebCompat: boolean) {
    interface Opts {
      source: string;
      value: any;
      hasNext: boolean;
      token: Token;
      line: number;
      column: number;
    }

    function pass(name: string, opts: Opts) {
      it(name, () => {
        const state = create(opts.source, undefined);
        const found = scanSingleToken(state, Context.Empty);
        t.deepEqual(
          {
            value: state.tokenValue,
            hasNext: state.index < state.length,
            token: found,
            line: state.line,
            column: state.column
          },
          {
            value: opts.value,
            hasNext: opts.hasNext,
            token: opts.token,
            line: opts.line,
            column: opts.column
          }
        );
      });
    }

    function fail(name: string, source: string, context: Context) {
      it(name, () => {
        const state = create(source, undefined);
        t.throws(() => scanSingleToken(state, context | Context.OptionsRaw));
      });
    }

    fail('fails on invalid BigInt literal', '0000133n', Context.Empty);
    fail('fails on invalid BigInt literal', '0x', Context.Empty);
    fail('fails on invalid BigInt literal', '0x-', Context.Empty);
    fail('fails on invalid BigInt literal', '.0E-100n', Context.Empty);
    fail('fails on invalid BigInt literal', '1E-100n', Context.Empty);
    fail('fails on decimal integer followed by identifier', '12adf00', Context.Empty);
    fail('fails on decimal integer followed by identifier', '3in1', Context.Empty);
    fail('fails on decimal integer followed by identifier', '3.e', Context.Empty);
    fail('fails on decimal integer followed by identifier', '3.e+abc', Context.Empty);
    fail('fails on Binary-integer-literal-like sequence with a leading 0', '00b0;', Context.Empty);
    fail('fails on Octal-integer-literal-like sequence containing an invalid digit', '0o8', Context.Strict);
    fail('fails on Octal-integer-literal-like sequence containing an invalid digit', '0b3', Context.Strict);
    fail('fails on Octal-integer-literal-like sequence without any digits', '0o', Context.Strict);
    fail('fails on Binary-integer-literal-like sequence without any digits', '0b;', Context.Strict);
    fail('fails on Binary-integer-literal-like sequence containing an invalid digit', '0b2;', Context.Strict);

    pass('scan single digit', {
      source: '1',
      value: 1,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 1
    });

    pass('scan single digit with following whitespace', {
      source: '1 ',
      value: 1,
      hasNext: true,
      token: Token.NumericLiteral,
      line: 1,
      column: 1
    });

    pass(`Scans ${7890}`, {
      source: '7890',
      value: 7890,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans ${1234567890.0987654321}`, {
      source: '1234567890.0987654321',
      value: 1234567890.0987654,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 21
    });

    pass(`Scans ${43.78}`, {
      source: '43.78',
      value: 43.78,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 5
    });

    pass(`Scans ${6e7}`, {
      source: '6e7',
      value: 60000000,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 3
    });

    pass(`Scans ${1e100}`, {
      source: '1e+100',
      value: 1e100,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 6
    });

    pass(`Scans ${0o12345670}`, {
      source: '0o12345670',
      value: 2739128,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 10
    });

    pass(`Scans ${0x9a}`, {
      source: '0x9a',
      value: 154,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans ${0.0e-100}`, {
      source: '.0E-100',
      value: 0.0e-100,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 7
    });

    pass(`Scans ${0x12}`, {
      source: '0x12',
      value: 18,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans .123`, {
      source: '.123',
      value: 0.123,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 42 // line comment`, {
      source: '42 // line comment',
      value: 42,
      hasNext: true,
      token: Token.NumericLiteral,
      line: 1,
      column: 2
    });

    pass(`Scans 42 /* The * cherow */`, {
      source: '42 /* The * cherow */',
      value: 42,
      hasNext: true,
      token: Token.NumericLiteral,
      line: 1,
      column: 2
    });

    pass(`Scans 42 + multiline comment to verify correct pos location`, {
      source: `/*



      a
                          b

                      */


                 42`,
      value: 42,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 11,
      column: 19
    });

    pass(`Scans 42n /* The * cherow */`, {
      source: '42n /* The * cherow */',
      value: 42,
      hasNext: true,
      token: Token.BigIntLiteral,
      line: 1,
      column: 3
    });

    pass(`Scans 42 /* The * cherow */`, {
      source: `/*a
      b*/ 42`,
      value: 42,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 2,
      column: 12
    });

    pass(`Scans ${'12n'}`, {
      source: '12n',
      value: 12,
      hasNext: false,
      token: Token.BigIntLiteral,
      line: 1,
      column: 3
    });

    pass(`Scans ${'0x12n'}`, {
      source: '0x12n',
      value: 18,
      hasNext: false,
      token: Token.BigIntLiteral,
      line: 1,
      column: 5
    });

    pass(`Scans 000001`, {
      source: '000001',
      value: 1,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 6
    });

    pass(`Scans 009.33`, {
      source: '009.33',
      value: 9.33,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 6
    });

    pass(`Scans 08.0E-100`, {
      source: '08.0E-100',
      value: 8e-100,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 9
    });

    pass(`Scans 0b1`, {
      source: '0b1',
      value: 1,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 3
    });

    pass(`Scans 0b00011100011111010101010101`, {
      source: '0b00011100011111010101010101',
      value: 7468373,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 28
    });

    pass(`Scans o0002`, {
      source: '0O0022',
      value: 18,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 6
    });

    pass(`Scans 0123`, {
      source: '0123',
      value: 83,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0`, {
      source: '0',
      value: 0,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 1
    });

    pass(`Scans 0000133`, {
      source: '0000133',
      value: 91,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 7
    });

    pass(`Scans 017890`, {
      source: '017890',
      value: 17890,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 6
    });

    pass(`Scans 01765345623456734569876`, {
      source: '01765345623456734569876',
      value: 1.7653456234567345e21,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 23
    });
    // should throw
    /*  pass(`Scans 844.44.4`, {
        source: '844.44.4',
        value: 7890,
        hasNext: false,
        token: Token.NumericLiteral,
        line: 1,
        column: 4
      }); */

    pass(`Scans 0e-1`, {
      source: '0e-1',
      value: 0,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0.6`, {
      source: '0.6',
      value: 0.6,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 3
    });

    pass(`Scans 0e+1`, {
      source: '0e+1',
      value: 0,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 2E0`, {
      source: '2E0',
      value: 2,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 3
    });

    pass(`Scans 0.00`, {
      source: '0.00',
      value: 0,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 5.00`, {
      source: '5.00',
      value: 5,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0.e1`, {
      source: '0.e1',
      value: 0,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 6.e1`, {
      source: '6.e1',
      value: 60,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 3.e-1`, {
      source: '3.e-1',
      value: 0.3,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 5
    });

    pass(`Scans 0.0E+1`, {
      source: '0.0E+1',
      value: 0,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 6
    });

    pass(`Scans 0X00`, {
      source: '0X00',
      value: 0,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0X0100 `, {
      source: '0X0100',
      value: 256,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 6
    });

    pass(`Scans 0X010000000`, {
      source: '0X010000000',
      value: 268435456,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 11
    });

    pass(`Scans 0x010000 `, {
      source: '0x010000',
      value: 65536,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 8
    });

    pass(`Scans 1e00`, {
      source: '1e00',
      value: 1,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0o10`, {
      source: '0o10',
      value: 8,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0o011`, {
      source: '0o011',
      value: 9,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 5
    });

    pass(`Scans 0O00`, {
      source: '0O00',
      value: 0,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0O077`, {
      source: '0O077',
      value: 63,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 5
    });

    pass(`Scans 0B01`, {
      source: '0B01',
      value: 1,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0b11`, {
      source: '0b11',
      value: 3,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 4
    });

    pass(`Scans 0B011`, {
      source: '0B011',
      value: 3,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 5
    });

    pass(`Scans 1 <!--x;`, {
      source: '1 <!--x;',
      value: 1,
      hasNext: true,
      token: Token.NumericLiteral,
      line: 1,
      column: 1
    });

    pass(` Scans /** multiline */ 1`, {
      source: '/** multiline */ 1',
      value: 1,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 1,
      column: 18
    });

    pass(` Scans 1/*\n*/-->`, {
      source: '1/*\n*/-->',
      value: 1,
      hasNext: true,
      token: Token.NumericLiteral,
      line: 1,
      column: 1
    });

    pass(`Scans 1/*\n*/-->2`, {
      source: '1/*\n*/-->2',
      value: 1,
      hasNext: true,
      token: Token.NumericLiteral,
      line: 1,
      column: 1
    });

    pass(`Scans digit at start with HTML comment`, {
      source: `0/* optional FirstCommentLine
      */-->the comment extends to these characters`,
      value: 0,
      hasNext: true,
      token: Token.NumericLiteral,
      line: 1,
      column: 1
    });

    pass(`Scans nested multiline comment with digit at start`, {
      source: `0/*
      */ /**/ /* second optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters`,
      value: 0,
      hasNext: true,
      token: Token.NumericLiteral,
      line: 1,
      column: 1
    });

    pass(`Scans nested multiline comment followed by digit`, {
      source: `/*
      */ /**/ /* second optional SingleLineDelimitedCommentSequence */1`,
      value: 1,
      hasNext: false,
      token: Token.NumericLiteral,
      line: 2,
      column: 71
    });

    if (isWebCompat) {
    }
  }
});
