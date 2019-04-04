import * as t from 'assert';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

describe('src/scanner/scan', () => {
  const tokens: Array<[Context, Token, string]> = [
    [Context.Empty, Token.LeftParen, '('],
    [Context.Empty, Token.LeftParen, '('],
    [Context.Empty, Token.LeftBrace, '{'],
    [Context.Empty, Token.RightBrace, '}'],
    [Context.Empty, Token.RightParen, ')'],
    [Context.Empty, Token.Semicolon, ';'],
    [Context.Empty, Token.Comma, ','],
    [Context.Empty, Token.LeftBracket, '['],
    [Context.Empty, Token.RightBracket, ']'],
    [Context.Empty, Token.Colon, ':'],
    [Context.Empty, Token.QuestionMark, '?'],
    [Context.Empty, Token.Arrow, '=>'],
    [Context.Empty, Token.Period, '.'],
    [Context.Empty, Token.Ellipsis, '...'],
    [Context.OptionsJSX, Token.JSXAutoClose, '/>'],
    [Context.OptionsJSX, Token.JSXClose, '</'],
    [Context.Empty, Token.Increment, '++'],
    [Context.Empty, Token.Decrement, '--'],
    [Context.Empty, Token.Assign, '='],
    [Context.Empty, Token.ShiftLeftAssign, '<<='],
    [Context.Empty, Token.ShiftRightAssign, '>>='],
    [Context.Empty, Token.LogicalShiftRightAssign, '>>>='],
    [Context.Empty, Token.ExponentiateAssign, '**='],
    [Context.Empty, Token.AddAssign, '+='],
    [Context.Empty, Token.SubtractAssign, '-='],
    [Context.Empty, Token.MultiplyAssign, '*='],
    [Context.Empty, Token.DivideAssign, '/='],
    [Context.Empty, Token.ModuloAssign, '%='],
    [Context.Empty, Token.BitwiseXorAssign, '^='],
    [Context.Empty, Token.BitwiseOrAssign, '|='],
    [Context.Empty, Token.BitwiseAndAssign, '&='],
    [Context.Empty, Token.Negate, '!'],
    [Context.Empty, Token.Complement, '~'],
    [Context.Empty, Token.Add, '+'],
    [Context.Empty, Token.Subtract, '-'],
    [Context.Empty, Token.Multiply, '*'],
    [Context.Empty, Token.Modulo, '%'],
    [Context.Empty, Token.Divide, '/'],
    [Context.Empty, Token.Exponentiate, '**'],
    [Context.Empty, Token.LogicalAnd, '&&'],
    [Context.Empty, Token.LogicalOr, '||'],
    [Context.Empty, Token.StrictEqual, '==='],
    [Context.Empty, Token.StrictNotEqual, '!=='],
    [Context.Empty, Token.LooseEqual, '=='],
    [Context.Empty, Token.LooseNotEqual, '!='],
    [Context.Empty, Token.LessThanOrEqual, '<='],
    [Context.Empty, Token.GreaterThanOrEqual, '>='],
    [Context.Empty, Token.LessThan, '<'],
    [Context.Empty, Token.GreaterThan, '>'],
    [Context.Empty, Token.ShiftLeft, '<<'],
    [Context.Empty, Token.ShiftRight, '>>'],
    [Context.Empty, Token.LogicalShiftRight, '>>>'],
    [Context.Empty, Token.BitwiseAnd, '&'],
    [Context.Empty, Token.BitwiseOr, '|'],
    [Context.Empty, Token.BitwiseXor, '^']
  ];

  for (const [ctx, token, op] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const state = create(op);
      const found = scanSingleToken(state, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: state.index < state.source.length,
          index: state.index
        },
        {
          token: token,
          hasNext: false,
          index: op.length
        }
      );
    });

    it(`scans '${op}' with more to go`, () => {
      const state = create(`${op} rest`);
      const found = scanSingleToken(state, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: state.index < state.source.length,
          index: state.index
        },
        {
          token: token,
          hasNext: true,
          index: op.length
        }
      );
    });
  }
});
