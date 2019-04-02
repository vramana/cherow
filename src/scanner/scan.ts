import { nextChar, consumeOptAstral, isExoticECMAScriptWhitespace } from './common';
import { skipSingleLineComment, parseMultiComment, scanHtmlComment } from './comments';
import { CharTypes, CharFlags, isIdentifierStart } from './charClassifier';
import { Chars } from '../chars';
import { Token } from '../token';
import { ParserState, Context, Flags, unreachable } from '../common';
import { scanIdentifier } from './identifier';
import { scanString } from './string';
import { scanNumber } from './numeric';
import { scanTemplate } from './template';
import { scanRegularExpression } from './regexp';

export const OneCharToken = [
  /*   0 - Null               */ Token.Illegal,
  /*   1 - Start of Heading   */ Token.Illegal,
  /*   2 - Start of Text      */ Token.Illegal,
  /*   3 - End of Text        */ Token.Illegal,
  /*   4 - End of Transm.     */ Token.Illegal,
  /*   5 - Enquiry            */ Token.Illegal,
  /*   6 - Acknowledgment     */ Token.Illegal,
  /*   7 - Bell               */ Token.Illegal,
  /*   8 - Back Space         */ Token.WhiteSpace,
  /*   9 - Horizontal Tab     */ Token.WhiteSpace,
  /*  10 - Line Feed          */ Token.LineTerminator,
  /*  11 - Vertical Tab       */ Token.WhiteSpace,
  /*  12 - Form Feed          */ Token.WhiteSpace,
  /*  13 - Carriage Return    */ Token.LineTerminator,
  /*  14 - Shift Out          */ Token.Illegal,
  /*  15 - Shift In           */ Token.Illegal,
  /*  16 - Data Line Escape   */ Token.Illegal,
  /*  17 - Device Control 1   */ Token.Illegal,
  /*  18 - Device Control 2   */ Token.Illegal,
  /*  19 - Device Control 3   */ Token.Illegal,
  /*  20 - Device Control 4   */ Token.Illegal,
  /*  21 - Negative Ack.      */ Token.Illegal,
  /*  22 - Synchronous Idle   */ Token.Illegal,
  /*  23 - End of Transmit    */ Token.Illegal,
  /*  24 - Cancel             */ Token.Illegal,
  /*  25 - End of Medium      */ Token.Illegal,
  /*  26 - Substitute         */ Token.Illegal,
  /*  27 - Escape             */ Token.Illegal,
  /*  28 - File Separator     */ Token.Illegal,
  /*  29 - Group Separator    */ Token.Illegal,
  /*  30 - Record Separator   */ Token.Illegal,
  /*  31 - Unit Separator     */ Token.Illegal,
  /*  32 - Space              */ Token.WhiteSpace,
  /*  33 - !                  */ Token.Negate,
  /*  34 - "                  */ Token.DoubleQuote,
  /*  35 - #                  */ Token.PrivateField,
  /*  36 - $                  */ Token.Identifier,
  /*  37 - %                  */ Token.Modulo,
  /*  38 - &                  */ Token.BitwiseAnd,
  /*  39 - '                  */ Token.SingleQuote,
  /*  40 - (                  */ Token.LeftParen,
  /*  41 - )                  */ Token.RightParen,
  /*  42 - *                  */ Token.Multiply,
  /*  43 - +                  */ Token.Add,
  /*  44 - ,                  */ Token.Comma,
  /*  45 - -                  */ Token.Subtract,
  /*  46 - .                  */ Token.Period,
  /*  47 - /                  */ Token.Divide,
  /*  48 - 0                  */ Token.NumericLiteral,
  /*  49 - 1                  */ Token.NumericLiteral,
  /*  50 - 2                  */ Token.NumericLiteral,
  /*  51 - 3                  */ Token.NumericLiteral,
  /*  52 - 4                  */ Token.NumericLiteral,
  /*  53 - 5                  */ Token.NumericLiteral,
  /*  54 - 6                  */ Token.NumericLiteral,
  /*  55 - 7                  */ Token.NumericLiteral,
  /*  56 - 8                  */ Token.NumericLiteral,
  /*  57 - 9                  */ Token.NumericLiteral,
  /*  58 - :                  */ Token.Colon,
  /*  59 - ;                  */ Token.Semicolon,
  /*  60 - <                  */ Token.LessThan,
  /*  61 - =                  */ Token.Assign,
  /*  62 - >                  */ Token.GreaterThan,
  /*  63 - ?                  */ Token.QuestionMark,
  /*  64 - @                  */ Token.Decorator,
  /*  65 - A                  */ Token.Identifier,
  /*  66 - B                  */ Token.Identifier,
  /*  67 - C                  */ Token.Identifier,
  /*  68 - D                  */ Token.Identifier,
  /*  69 - E                  */ Token.Identifier,
  /*  70 - F                  */ Token.Identifier,
  /*  71 - G                  */ Token.Identifier,
  /*  72 - H                  */ Token.Identifier,
  /*  73 - I                  */ Token.Identifier,
  /*  74 - J                  */ Token.Identifier,
  /*  75 - K                  */ Token.Identifier,
  /*  76 - L                  */ Token.Identifier,
  /*  77 - M                  */ Token.Identifier,
  /*  78 - N                  */ Token.Identifier,
  /*  79 - O                  */ Token.Identifier,
  /*  80 - P                  */ Token.Identifier,
  /*  81 - Q                  */ Token.Identifier,
  /*  82 - R                  */ Token.Identifier,
  /*  83 - S                  */ Token.Identifier,
  /*  84 - T                  */ Token.Identifier,
  /*  85 - U                  */ Token.Identifier,
  /*  86 - V                  */ Token.Identifier,
  /*  87 - W                  */ Token.Identifier,
  /*  88 - X                  */ Token.Identifier,
  /*  89 - Y                  */ Token.Identifier,
  /*  90 - Z                  */ Token.Identifier,
  /*  91 - [                  */ Token.LeftBracket,
  /*  92 - \                  */ Token.Identifier,
  /*  93 - ]                  */ Token.RightBracket,
  /*  94 - ^                  */ Token.BitwiseXor,
  /*  95 - _                  */ Token.Identifier,
  /*  96 - `                  */ Token.Template,
  /*  97 - a                  */ Token.Identifier,
  /*  98 - b                  */ Token.Identifier,
  /*  99 - c                  */ Token.Identifier,
  /* 100 - d                  */ Token.Identifier,
  /* 101 - e                  */ Token.Identifier,
  /* 102 - f                  */ Token.Identifier,
  /* 103 - g                  */ Token.Identifier,
  /* 104 - h                  */ Token.Identifier,
  /* 105 - i                  */ Token.Identifier,
  /* 106 - j                  */ Token.Identifier,
  /* 107 - k                  */ Token.Identifier,
  /* 108 - l                  */ Token.Identifier,
  /* 109 - m                  */ Token.Identifier,
  /* 110 - n                  */ Token.Identifier,
  /* 111 - o                  */ Token.Identifier,
  /* 112 - p                  */ Token.Identifier,
  /* 113 - q                  */ Token.Identifier,
  /* 114 - r                  */ Token.Identifier,
  /* 115 - s                  */ Token.Identifier,
  /* 116 - t                  */ Token.Identifier,
  /* 117 - u                  */ Token.Identifier,
  /* 118 - v                  */ Token.Identifier,
  /* 119 - w                  */ Token.Identifier,
  /* 120 - x                  */ Token.Identifier,
  /* 121 - y                  */ Token.Identifier,
  /* 122 - z                  */ Token.Identifier,
  /* 123 - {                  */ Token.LeftBrace,
  /* 124 - |                  */ Token.BitwiseOr,
  /* 125 - }                  */ Token.RightBrace,
  /* 126 - ~                  */ Token.Complement,
  /* 127 - Delete             */ Token.Illegal
];

export function nextToken(state: ParserState, context: Context): void {
  state.token = scanSingleToken(state, context);
}

export function scanSingleToken(state: ParserState, context: Context): Token {
  let isStartOfLine = true; // needed to confirm requirement to parse --> closing html comment
  while (state.index < state.source.length) {
    const next = state.currentChar;
    if (next <= 0x7f) {
      state.startIndex = state.index;
      const token = OneCharToken[next];

      switch (token) {
        // One character tokens
        case Token.LeftParen:
        case Token.RightParen:
        case Token.LeftBrace:
        case Token.RightBrace:
        case Token.LeftBracket:
        case Token.RightBracket:
        case Token.QuestionMark:
        case Token.Colon:
        case Token.Semicolon:
        case Token.Comma:
        case Token.Complement:
        case Token.Illegal:
          nextChar(state);
          return token;
        // General whitespace
        case Token.WhiteSpace:
          nextChar(state);
          break;
        // Line terminators
        case Token.LineTerminator:
          isStartOfLine = true;
          state.flags |= Flags.NewLine;
          if (next === Chars.CarriageReturn && state.source.charCodeAt(state.index + 1) === Chars.LineFeed) {
            nextChar(state);
          }
          nextChar(state);
          break;

        // `!`, `!=`, `!==`
        case Token.Negate:
          if (nextChar(state) !== Chars.EqualSign) {
            return Token.Negate;
          }
          if (nextChar(state) !== Chars.EqualSign) {
            return Token.LooseNotEqual;
          }
          nextChar(state);
          return Token.StrictNotEqual;

        // `%`, `%=`
        case Token.Modulo:
          if (nextChar(state) !== Chars.EqualSign) return Token.Modulo;
          nextChar(state);
          return Token.ModuloAssign;

        // `*`, `**`, `*=`, `**=`
        case Token.Multiply: {
          nextChar(state);
          if (state.index >= state.length) return Token.Multiply;
          const next = state.currentChar;

          if (next === Chars.EqualSign) {
            nextChar(state);
            return Token.MultiplyAssign;
          }

          if (next !== Chars.Asterisk) return Token.Multiply;
          nextChar(state);
          if (state.currentChar !== Chars.EqualSign) return Token.Exponentiate;
          nextChar(state);
          return Token.ExponentiateAssign;
        }

        // `^`, `^=`
        case Token.BitwiseXor:
          if (nextChar(state) !== Chars.EqualSign) return Token.BitwiseXor;
          nextChar(state);
          return Token.BitwiseXorAssign;

        // `+`, `++`, `+=`
        case Token.Add: {
          nextChar(state);
          if (state.index >= state.length) return Token.Add;

          if (state.currentChar === Chars.Plus) {
            nextChar(state);
            return Token.Increment;
          }

          if (state.currentChar === Chars.EqualSign) {
            nextChar(state);
            return Token.AddAssign;
          }

          return Token.Add;
        }

        // `-`, `--`, `-=`, `-->`
        case Token.Subtract: {
          nextChar(state);
          if (state.index >= state.length) return Token.Subtract;
          const next = state.currentChar;

          if (next === Chars.Hyphen) {
            nextChar(state);
            if ((isStartOfLine || state.flags & Flags.NewLine) && state.currentChar === Chars.GreaterThan) {
              scanHtmlComment(state, context);
              continue;
            }

            return Token.Decrement;
          }

          if (next === Chars.EqualSign) {
            nextChar(state);
            return Token.SubtractAssign;
          }

          return Token.Subtract;
        }

        case Token.Divide: {
          nextChar(state);
          if (state.index < state.length) {
            const ch = state.currentChar;
            if (ch === Chars.Slash) {
              nextChar(state);
              skipSingleLineComment(state);
              continue;
            } else if (ch === Chars.Asterisk) {
              nextChar(state);
              parseMultiComment(state);
              break;
            } else if (context & Context.AllowRegExp) {
              return scanRegularExpression(state, context);
            } else if (ch === Chars.EqualSign) {
              nextChar(state);
              return Token.DivideAssign;
            } else if (ch === Chars.GreaterThan) {
              nextChar(state);
              return Token.JSXAutoClose;
            }
          }

          return Token.Divide;
        }

        // `<`, `<=`, `<<`, `<<=`, `</`
        case Token.LessThan:
          nextChar(state);
          if (state.index >= state.length) return Token.LessThan;

          switch (state.currentChar) {
            case Chars.LessThan:
              nextChar(state);
              if ((state.currentChar as number) === Chars.EqualSign) {
                nextChar(state);
                return Token.ShiftLeftAssign;
              } else {
                return Token.ShiftLeft;
              }

            case Chars.EqualSign:
              nextChar(state);
              return Token.LessThanOrEqual;

            case Chars.Exclamation:
              if (
                state.source.charCodeAt(state.index + 1) === Chars.Hyphen &&
                state.source.charCodeAt(state.index + 2) === Chars.Hyphen
              ) {
                // <!-- marks the beginning of a line comment (for www usage)
                return scanHtmlComment(state, context);
              }
            case Chars.Slash: {
              if ((context & Context.OptionsJSX) < 1) break;
              const index = state.index + 1;

              // Check that it's not a comment start.
              if (index < state.length) {
                const next = state.source.charCodeAt(index);
                if (next === Chars.Asterisk || next === Chars.Slash) break;
              }

              nextChar(state);
              return Token.JSXClose;
            }

            default:
              // ignore
              return Token.LessThan;
          }

        // `=`, `==`, `===`, `=>`
        case Token.Assign: {
          nextChar(state);
          if (state.index >= state.length) return Token.Assign;
          const next = state.currentChar;

          if (next === Chars.EqualSign) {
            nextChar(state);
            if (state.currentChar === Chars.EqualSign) {
              nextChar(state);
              return Token.StrictEqual;
            } else {
              return Token.LooseEqual;
            }
          } else if (next === Chars.GreaterThan) {
            nextChar(state);
            return Token.Arrow;
          }

          return Token.Assign;
        }

        // `|`, `||`, `|=`
        case Token.BitwiseOr: {
          nextChar(state);
          if (state.index >= state.length) return Token.BitwiseOr;
          const next = state.currentChar;

          if (next === Chars.VerticalBar) {
            nextChar(state);
            return Token.LogicalOr;
          } else if (next === Chars.EqualSign) {
            nextChar(state);
            return Token.BitwiseOrAssign;
          }

          return Token.BitwiseOr;
        }

        // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
        case Token.GreaterThan: {
          nextChar(state);
          if (state.index >= state.length) return Token.GreaterThan;
          const next = state.currentChar;

          if (next === Chars.EqualSign) {
            nextChar(state);
            return Token.GreaterThanOrEqual;
          }

          if (next !== Chars.GreaterThan) return Token.GreaterThan;
          nextChar(state);

          if (state.index < state.length) {
            const next = state.currentChar;

            if (next === Chars.GreaterThan) {
              nextChar(state);
              if (state.currentChar === Chars.EqualSign) {
                nextChar(state);
                return Token.LogicalShiftRightAssign;
              } else {
                return Token.LogicalShiftRight;
              }
            } else if (next === Chars.EqualSign) {
              nextChar(state);
              return Token.ShiftRightAssign;
            }
          }

          return Token.ShiftRight;
        }

        // `&`, `&&`, `&=`
        case Token.BitwiseAnd: {
          nextChar(state);
          if (state.index >= state.length) return Token.BitwiseAnd;
          const next = state.currentChar;

          if (next === Chars.Ampersand) {
            nextChar(state);
            return Token.LogicalAnd;
          }

          if (next === Chars.EqualSign) {
            nextChar(state);
            return Token.BitwiseAndAssign;
          }

          return Token.BitwiseAnd;
        }
        // `.`, `...`, `.123` (numeric literal)
        case Token.Period:
          nextChar(state);
          if ((CharTypes[state.currentChar] & CharFlags.Decimal) !== 0) return scanNumber(state, context, true);
          if (state.currentChar === Chars.Period) {
            nextChar(state);
            if (state.index < state.length && state.currentChar === Chars.Period) {
              state.index = state.index + 1;
              return Token.Ellipsis;
            }
          }
          return Token.Period;
        case Token.Template:
          return scanTemplate(state, context);
        case Token.NumericLiteral:
          return scanNumber(state, context, false);
        case Token.DoubleQuote:
        case Token.SingleQuote:
          return scanString(state, context, next);
        case Token.Identifier:
          return scanIdentifier(state, context);

        default:
          unreachable();
      }
    } else {
      if ((state.currentChar & ~1) === Chars.LineSeparator) {
        state.flags |= Flags.NewLine;
        nextChar(state);
        continue;
      }
      if (isIdentifierStart(next) || consumeOptAstral(state, next)) {
        return scanIdentifier(state, context);
      }
      if (isExoticECMAScriptWhitespace(next)) {
        nextChar(state);
      }
    }

    isStartOfLine = false;
  }
  return Token.EndOfSource;
}
