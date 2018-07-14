import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { consume, mapToToken, scanPrivateName } from './common';
import { CommentType, skipSingleLineComment, skipMultilineComment, skipSingleHTMLComment } from './comments';
import { getTokenValue, convertTokenType } from './tokenizer';
import { scanStringLiteral } from './string';
import { scanTemplate } from './template';
import { scanIdentifier, maybeIdentifier, scanIdentifierRest } from './identifier';
import { scanNumeric, parseLeadingZeroTable } from './numbers';
import { report, Errors } from '../errors';
import { scanRegularExpression } from './regexp';

const unexpectedCharacter: (state: ParserState) => void = (state: ParserState) => report(state, Errors.IllegalCaracter, String.fromCharCode(state.nextChar));

const table = new Array(0xFFFF).fill(unexpectedCharacter, 0, 0x80).fill(maybeIdentifier, 0x80) as((state: ParserState, context: Context) => Token)[];

// `,`, `~`, `?`, `[`, `]`, `{`, `}`, `:`, `;`, `(` ,`)`, `"`, `'`
table[Chars.Comma] = mapToToken(Token.Comma);
table[Chars.Tilde] = mapToToken(Token.Complement);
table[Chars.QuestionMark] = mapToToken(Token.QuestionMark);
table[Chars.LeftBracket] = mapToToken(Token.LeftBracket);
table[Chars.RightBracket] = mapToToken(Token.RightBracket);
table[Chars.LeftBrace] = mapToToken(Token.LeftBrace);
table[Chars.RightBrace] = mapToToken(Token.RightBrace);
table[Chars.Colon] = mapToToken(Token.Colon);
table[Chars.Semicolon] = mapToToken(Token.Semicolon);
table[Chars.LeftParen] = mapToToken(Token.LeftParen);
table[Chars.RightParen] = mapToToken(Token.RightParen);
// Decorators
table[Chars.At] = mapToToken(Token.At);

table[Chars.Space] =
  table[Chars.Tab] =
  table[Chars.FormFeed] =
  table[Chars.VerticalTab] = state => {
      ++state.index;
      ++state.column;
      return Token.WhiteSpace;
  };

table[Chars.DoubleQuote] =
  table[Chars.SingleQuote] = scanStringLiteral;

table[Chars.LineFeed] = state => {
    state.column = 0;
    ++state.index;
    ++state.line;
    state.flags |= Flags.LineTerminator;
    return Token.WhiteSpace;
};

table[Chars.CarriageReturn] = state => {
  state.column = 0;
  ++state.index;
  ++state.line;
  state.flags |= Flags.LineTerminator;
   // If it's a \r\n sequence, consume it as a single EOL.
  if (state.index < state.length &&
      state.source.charCodeAt(state.index) === Chars.LineFeed) {
      ++state.index;
  }
  return Token.WhiteSpace;
};

// `1`...`9`
for (let i = Chars.One; i <= Chars.Nine; i++) table[i] = (state: ParserState, context: Context) => scanNumeric(state, context, false);

// `A`...`Z`
for (let i = Chars.UpperA; i <= Chars.UpperZ; i++) table[i] = scanIdentifier;

// `a`...z`
for (let i = Chars.LowerA; i <= Chars.LowerZ; i++) table[i] = scanIdentifier;

// '#'
table[Chars.Hash] = scanPrivateName;

// `$foo`, `_var`
table[Chars.Dollar] = table[Chars.Underscore] = scanIdentifier;

// `\\u{N}var`
table[Chars.Backslash] = scanIdentifierRest;

// `foo`
table[Chars.Backtick] = scanTemplate;

// `0`
table[Chars.Zero] = (state: ParserState, context: Context) => (parseLeadingZeroTable[state.source.charCodeAt(state.index + 1)] || scanNumeric)(state, context);

// `=`, `==`, `===`, `=>`
table[Chars.EqualSign] = state => {
  ++state.index;
  ++state.column;
  const next = state.source.charCodeAt(state.index);
  if (next === Chars.EqualSign) {
      ++state.index;
      ++state.column;
      if (consume(state, Chars.EqualSign)) {
          return Token.StrictEqual;
      } else {
          return Token.LooseEqual;
      }
  } else if (next === Chars.GreaterThan) {
      ++state.index;
      ++state.column;
      return Token.Arrow;
  }
  return Token.Assign;
};

// `.`, `...`, `.123` (numeric literal)
table[Chars.Period] = (state: ParserState, context: Context) => {
  let index = state.index + 1;
  const next = state.source.charCodeAt(index);

  if (next === Chars.Period) {
      index++;
      // Not a double
      if (index < state.source.length &&
          state.source.charCodeAt(index) === Chars.Period) {
          state.index = index + 1;
          state.column += 3;
          return Token.Ellipsis;
      }
  } else if (next >= Chars.Zero && next <= Chars.Nine) {
      return scanNumeric(state, context, true);
  }
  state.index++;
  state.column++;
  return Token.Period;
};

// `<`, `<=`, `<<`, `<<=`, `</`,  <!--
table[Chars.LessThan] = (state: ParserState, context: Context) => {
  ++state.index;
  ++state.column;
  if (state.index < state.source.length) {
      const next = state.source.charCodeAt(state.index);
      if (next === Chars.EqualSign) {
          ++state.index;
          ++state.column;
          return Token.LessThanOrEqual;
      } else if (next === Chars.LessThan) {
          ++state.index;
          ++state.column;
          if (consume(state, Chars.EqualSign)) return Token.ShiftLeftAssign;
          return Token.ShiftLeft;
      } else if (context & Context.OptionsJSX && next === Chars.Slash) {
        const index = state.index + 1;
        if (index < state.length) {
            const next = state.source.charCodeAt(index);
            if (next === Chars.Asterisk || next === Chars.Slash) report(state, Errors.Unexpected);
        }
        state.index++; state.column++;
        return Token.JSXClose;
        // <!-- marks the beginning of HTML opening comment - treat as //
      } else if (consume(state, Chars.Exclamation) &&
                 consume(state, Chars.Hyphen) &&
                 consume(state, Chars.Hyphen)) {
          return skipSingleHTMLComment(state, context, CommentType.HTMLOpen);
      }
  }

  return Token.LessThan;
};

// `/`, `/=`, `/>`, '/*..*/'
table[Chars.Slash] = (state, context) => {
  ++state.index;
  ++state.column;
  if (state.index < state.length) {
      const next = state.source.charCodeAt(state.index);
      if (context & Context.ExpressionStart && (next !== Chars.Asterisk && next !== Chars.Slash)) {
          return scanRegularExpression(state, context);
      }
      if (consume(state, Chars.Slash)) {
          return skipSingleLineComment(state, CommentType.Single);
      } else if (consume(state, Chars.Asterisk)) {
          return skipMultilineComment(state);
      } else if (next === Chars.EqualSign) {
          ++state.index;
          ++state.column;
          return Token.DivideAssign;
      }
  }
  return Token.Divide;
};

// `!`, `!=`, `!==`
table[Chars.Exclamation] = state => {
  ++state.index;
  ++state.column;
  if (!consume(state, Chars.EqualSign)) return Token.Negate;
  if (!consume(state, Chars.EqualSign)) return Token.LooseNotEqual;
  return Token.StrictNotEqual;
};

// `%`, `%=`
table[Chars.Percent] = state => {
  ++state.index;
  ++state.column;
  return consume(state, Chars.EqualSign) ? Token.ModuloAssign : Token.Modulo;
};

// `&`, `&&`, `&=`
table[Chars.Ampersand] = state => {
  ++state.index;
  ++state.column;
  const next = state.source.charCodeAt(state.index);
  if (next === Chars.Ampersand) {
      ++state.index;
      ++state.column;
      return Token.LogicalAnd;
  }
  if (next === Chars.EqualSign) {
      ++state.index;
      ++state.column;
      return Token.BitwiseAndAssign;
  }
  return Token.BitwiseAnd;
};

// `*`, `**`, `*=`, `**=`
table[Chars.Asterisk] = state => {
  ++state.index;
  ++state.column;
  if (state.index >= state.length) return Token.Multiply;
  const next = state.source.charCodeAt(state.index);
  if (next === Chars.EqualSign) {
      ++state.index;
      ++state.column;
      return Token.MultiplyAssign;
  }
  // Exponentiation operator
  if (next !== Chars.Asterisk) return Token.Multiply;
  ++state.index;
  ++state.column;
  if (!consume(state, Chars.EqualSign)) return Token.Exponentiate;
  return Token.ExponentiateAssign;
};

// `+`, `++`, `+=`
table[Chars.Plus] = state => {
  ++state.index;
  ++state.column;
  if (state.index >= state.length) return Token.Add;

  const next = state.source.charCodeAt(state.index);
  if (next === Chars.Plus) {
      ++state.index;
      ++state.column;
      return Token.Increment;
  }

  if (next === Chars.EqualSign) {
      ++state.index;
      ++state.column;
      return Token.AddAssign;
  }

  return Token.Add;
};

// `-`, `--`, `-=`
table[Chars.Hyphen] = (state, context) => {
  ++state.index;
  ++state.column;
  if (state.index < state.source.length) {
      const next = state.source.charCodeAt(state.index);
      if (next === Chars.Hyphen) {
          ++state.index;
          ++state.column;
          // https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment
          if ((state.flags & Flags.LineTerminator || state.startIndex === 0) &&
              consume(state, Chars.GreaterThan)) {
              return skipSingleHTMLComment(state, context, CommentType.HTMLClose);
          }
          return Token.Decrement;
      } else if (next === Chars.EqualSign) {
          ++state.index;
          ++state.column;
          return Token.SubtractAssign;
      }
  }

  return Token.Subtract;
};

// `^`, `^=`
table[Chars.Caret] = state => {
  ++state.index;
  ++state.column;
  if (consume(state, Chars.EqualSign)) return Token.BitwiseXorAssign;
  return Token.BitwiseXor;
};

// `|`, `||`, `|=`
table[Chars.VerticalBar] = state => {
  ++state.index;
  ++state.column;
  if (state.index < state.length) {
      const next = state.source.charCodeAt(state.index);
      if (next === Chars.VerticalBar) {
          ++state.index;
          ++state.column;
          return Token.LogicalOr;
      }
      if (next === Chars.EqualSign) {
          ++state.index;
          ++state.column;
          return Token.BitwiseOrAssign;
      }
  }
  return Token.BitwiseOr;
};

// `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
table[Chars.GreaterThan] = state => {
  ++state.index;
  ++state.column;
  if (state.index >= state.length) return Token.GreaterThan;
  let next = state.source.charCodeAt(state.index);

  if (next === Chars.EqualSign) {
      ++state.index;
      ++state.column;
      return Token.GreaterThanOrEqual;
  }

  if (next !== Chars.GreaterThan) return Token.GreaterThan;
  ++state.index;
  ++state.column;

  if (state.index < state.length) {
      next = state.source.charCodeAt(state.index);

      if (next === Chars.GreaterThan) {
          ++state.index;
          ++state.column;
          if (consume(state, Chars.EqualSign)) {
              return Token.LogicalShiftRightAssign;
          } else {
              return Token.LogicalShiftRight;
          }
      } else if (next === Chars.EqualSign) {
          ++state.index;
          ++state.column;
          return Token.ShiftRightAssign;
      }
  }
  return Token.ShiftRight;
};

/**
 * Scans and return the next token in the stream.,
 *
 * @param state Parserstate instance
 * @param context Context masks
 */
export function nextToken(state: ParserState, context: Context): Token {
  state.flags &= ~Flags.LineTerminator;
  state.lastIndex = state.index;
  state.lastLine = state.line;
  state.lastColumn = state.column;
  const onToken = state.onToken;
  while (state.index < state.length) {
      state.startIndex = state.index;
      state.startColumn = state.column;
      state.startLine = state.line;
      state.nextChar = state.source.charCodeAt(state.index);
      if (((state.token = table[state.nextChar](state, context)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        if (!(state.flags & Flags.EdgeCase) && onToken) onToken(convertTokenType(state.token), getTokenValue(state, state.token));
        return state.token;
      }
  }

  return state.token = Token.EndOfSource;
}
