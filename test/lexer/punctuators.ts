import * as t from 'assert';
import { next } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';
import { Token, tokenDesc } from '../../src/token';

describe('Lexer - Punctuators', () => {
  interface Opts {
    source: string;
    context: Context;
    token: Token;
    hasNext: boolean;
    line: number;
    column: number;
  }
  const tokens: Array<[Context, Token, string]> = [
    [Context.Empty, Token.StrictNotEqual, '!=='],
    [Context.Empty, Token.LooseNotEqual, '!='],
    [Context.Empty, Token.Arrow, '=>'],
    [Context.Empty, Token.Assign, '='],
    [Context.Empty, Token.StrictEqual, '==='],
    [Context.Empty, Token.LooseEqual, '=='],
    [Context.Empty, Token.AddAssign, '+='],
    [Context.Empty, Token.ExponentiateAssign, '**='],
    [Context.Empty, Token.MultiplyAssign, '*='],
    [Context.Empty, Token.Exponentiate, '**'],
    [Context.Empty, Token.DivideAssign, '/='],
    [Context.Empty, Token.ModuloAssign, '%='],
    [Context.Empty, Token.LeftParen, '('],
    [Context.Empty, Token.LeftBrace, '{'],
    [Context.Empty, Token.Period, '.'],
    [Context.Empty, Token.JSXAutoClose, '/>'],
    [Context.OptionsJSX, Token.JSXClose, '</'],
    [Context.Empty, Token.Divide, '/'],
    [Context.Empty, Token.Ellipsis, '...'],
    [Context.Empty, Token.RightBrace, '}'],
    [Context.Empty, Token.RightParen, ')'],
    [Context.Empty, Token.Semicolon, ';'],
    [Context.Empty, Token.Comma, ','],
    [Context.Empty, Token.LeftBracket, '['],
    [Context.Empty, Token.RightBracket, ']'],
    [Context.Empty, Token.Colon, ':'],
    [Context.Empty, Token.QuestionMark, '?'],
    [Context.Empty, Token.Increment, '++'],
    [Context.Empty, Token.Decrement, '--'],
    [Context.Empty, Token.SubtractAssign, '-='],
    [Context.Empty, Token.BitwiseOrAssign, '|='],
    [Context.Empty, Token.Negate, '!'],
    [Context.Empty, Token.Complement, '~'],
    [Context.Empty, Token.Add, '+'],
    [Context.Empty, Token.Subtract, '-'],
    [Context.Empty, Token.Multiply, '*'],
    [Context.Empty, Token.Modulo, '%'],
    [Context.Empty, Token.LogicalOr, '||'],
    [Context.Empty, Token.LessThanOrEqual, '<='],
    [Context.Empty, Token.BitwiseOr, '|'],
    [Context.Empty, Token.BitwiseAndAssign, '&='],
    [Context.Empty, Token.LogicalAnd, '&&'],
    [Context.Empty, Token.BitwiseAnd, '&'],
    [Context.Empty, Token.GreaterThanOrEqual, '>='],
    [Context.Empty, Token.ShiftRightAssign, '>>='],
    [Context.Empty, Token.LogicalShiftRightAssign, '>>>='],
    [Context.Empty, Token.GreaterThan, '>'],
    [Context.Empty, Token.ShiftRight, '>>'],
    [Context.Empty, Token.LogicalShiftRight, '>>>'],
    [Context.Empty, Token.LessThanOrEqual, '<='],
    [Context.Empty, Token.ShiftLeftAssign, '<<='],
    [Context.Empty, Token.LessThan, '<'],
    [Context.Empty, Token.ShiftLeft, '<<'],
    [Context.Empty, Token.BitwiseXorAssign, '^='],
    [Context.Empty, Token.BitwiseXor, '^']
  ];

  for (const [ctx, token, op] of tokens) {
    it(`scans '${op}'`, () => {
      const state = create(op, undefined);
      const found = next(state, ctx);

      t.deepEqual(
        {
          token: tokenDesc(found),
          hasNext: state.index < state.length,
          line: state.line,
          column: state.column
        },
        {
          token: tokenDesc(token),
          hasNext: false,
          line: 1,
          column: op.length
        }
      );
    });
  }

  it("scans '.' in '..'", () => {
    const state = create('..', undefined);
    const found = next(state, Context.Empty);
    t.deepEqual(
      {
        token: tokenDesc(found),
        hasNext: state.index < state.length,
        line: state.line,
        column: state.column
      },
      {
        token: tokenDesc(Token.Period),
        hasNext: true,
        line: 1,
        column: 1
      }
    );
  });
});
