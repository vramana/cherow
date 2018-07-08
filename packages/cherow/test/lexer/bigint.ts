import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';

describe('Lexer - BigInt', () => {

  function fail(name: string, context: Context, opts: any): any {
      it(name, () => {
          const state = new State(opts.source, undefined, undefined);
          t.throws(() => {
              nextToken(state, context);
          });
      });
  }

  fail('Binary BigInt literal containing an invalid digit', Context.Empty, {
      source: '0b2n'
  });

  fail('It is a Syntax Error if the NumericLiteralBase contains an ExponentPart', Context.Empty, {
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
});
