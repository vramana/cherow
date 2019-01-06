import { ParserState, Context, Flags } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { mustEscape } from '../unicode';
import { Errors, report } from '../errors';
import {
  advanceOne,
  consumeOpt,
  hasNext,
  nextChar,
  fromCodePoint,
  SeekState,
  advanceNewline,
  consumeLineFeed,
  skipToNewline
} from './common';
import { skipBlockComment, skipSingleLineComment } from './comments';
import { scanString, scanTemplate } from './string';
import { scanRegularExpression } from './regexp';
import { scanNumeric, scanHexBinOct } from './numeric';
import { scanKnownIdentifier } from './identifier';

const enum Constants {
  Size = 128
}

// Sanitizes characters for better human readability.
function escapeForPrinting(code: number): string {
  switch (code) {
    case Chars.Null:
      return '\\0';
    case Chars.Backspace:
      return '\\b';
    case Chars.Tab:
      return '\\t';
    case Chars.LineFeed:
      return '\\n';
    case Chars.VerticalTab:
      return '\\v';
    case Chars.FormFeed:
      return '\\f';
    case Chars.CarriageReturn:
      return '\\r';
    default:
      if (!mustEscape(code)) return fromCodePoint(code);
      if (code < 0x10) return `\\x0${code.toString(16)}`;
      if (code < 0x100) return `\\x${code.toString(16)}`;
      if (code < 0x1000) return `\\u0${code.toString(16)}`;
      if (code < 0x10000) return `\\u${code.toString(16)}`;
      return `\\u{${code.toString(16)}}`;
  }
}

function impossible(parser: ParserState): void {
  return report(parser, Errors.Unexpected);
}

const statics = new Array(Constants.Size).fill(0) as Token[];

function scanChar(parser: ParserState, context: Context, first: number) {
  let c = context;
  advanceOne(parser);
  return statics[first];
}

const table = new Array(Constants.Size).fill(impossible) as Array<
  (parser: ParserState, context: Context, first: number) => Token
>;

// `!`, `!=`, `!==`
table[Chars.Exclamation] = parser => {
  advanceOne(parser);
  if (consumeOpt(parser, Chars.EqualSign)) {
    if (consumeOpt(parser, Chars.EqualSign)) {
      return Token.StrictNotEqual;
    } else {
      return Token.LooseNotEqual;
    }
  } else {
    return Token.Negate;
  }
};

// `"string"`
table[Chars.DoubleQuote] = scanString;

// `$var`
table[Chars.Dollar] = scanKnownIdentifier;

// `%`, `%=`
table[Chars.Percent] = parser => {
  advanceOne(parser);
  if (consumeOpt(parser, Chars.EqualSign)) {
    return Token.ModuloAssign;
  } else {
    return Token.Modulo;
  }
};

// `&`, `&&`, `&=`
table[Chars.Ampersand] = parser => {
  advanceOne(parser);
  if (hasNext(parser)) {
    const next = nextChar(parser);

    if (next === Chars.Ampersand) {
      advanceOne(parser);
      return Token.LogicalAnd;
    } else if (next === Chars.EqualSign) {
      advanceOne(parser);
      return Token.BitwiseAndAssign;
    }
  }

  return Token.BitwiseAnd;
};

// `'string'`
table[Chars.SingleQuote] = scanString;

// `(`
table[Chars.LeftParen] = scanChar;
statics[Chars.LeftParen] = Token.LeftParen;

// `)`
table[Chars.RightParen] = scanChar;
statics[Chars.RightParen] = Token.RightParen;

// `*`, `**`, `*=`, `**=`
table[Chars.Asterisk] = parser => {
  advanceOne(parser);
  if (hasNext(parser)) {
    const next = nextChar(parser);

    if (next === Chars.Asterisk) {
      advanceOne(parser);
      if (consumeOpt(parser, Chars.EqualSign)) {
        return Token.ExponentiateAssign;
      } else {
        return Token.Exponentiate;
      }
    } else if (next === Chars.EqualSign) {
      advanceOne(parser);
      return Token.MultiplyAssign;
    }
  }

  return Token.Multiply;
};

// `+`, `++`, `+=`
table[Chars.Plus] = parser => {
  advanceOne(parser);
  if (hasNext(parser)) {
    const next = nextChar(parser);

    if (next === Chars.Plus) {
      advanceOne(parser);
      return Token.Increment;
    } else if (next === Chars.EqualSign) {
      advanceOne(parser);
      return Token.AddAssign;
    }
  }

  return Token.Add;
};

// `,`
table[Chars.Comma] = scanChar;
statics[Chars.Comma] = Token.Comma;

// `-`, `--`, `-=`
table[Chars.Hyphen] = parser => {
  advanceOne(parser);
  if (hasNext(parser)) {
    const next = nextChar(parser);

    if (next === Chars.Hyphen) {
      advanceOne(parser);
      if (parser.flags & SeekState.NewLine && consumeOpt(parser, Chars.GreaterThan)) {
        return skipToNewline(parser);
      }
      return Token.Decrement;
    } else if (next === Chars.EqualSign) {
      advanceOne(parser);
      return Token.SubtractAssign;
    }
  }

  return Token.Subtract;
};

// `.`, `...`, `.123` (numeric literal)
table[Chars.Period] = parser => {
  let index = parser.index + 1;
  if (index < parser.length) {
    const next = parser.source.charCodeAt(index);

    if (next === Chars.Period) {
      index++;
      if (index < parser.length && parser.source.charCodeAt(index) === Chars.Period) {
        parser.index = index + 1;
        parser.column += 3;
        return Token.Ellipsis;
      }
    } else if (next >= Chars.Zero && next <= Chars.Nine) {
      scanNumeric(parser);
      return Token.NumericLiteral;
    }
  }

  advanceOne(parser);
  return Token.Period;
};

// `/`, `/=`, `/>`
table[Chars.Slash] = (parser, context) => {
  advanceOne(parser);
  if (hasNext(parser)) {
    const next = nextChar(parser);
    if (context & Context.ExpressionStart && (next !== Chars.Asterisk && next !== Chars.Slash)) {
      return scanRegularExpression(parser, context);
    } else if (next === Chars.Slash) {
      advanceOne(parser);
      return skipSingleLineComment(parser);
    } else if (next === Chars.Asterisk) {
      advanceOne(parser);
      return skipBlockComment(parser);
    } else if (next === Chars.EqualSign) {
      advanceOne(parser);
      return Token.DivideAssign;
    } else if (next === Chars.GreaterThan) {
      advanceOne(parser);
      return Token.JSXAutoClose;
    }
  }

  return Token.Divide;
};

// `1`...`9`
for (let i = Chars.One; i <= Chars.Nine; i++) {
  table[i] = scanNumeric;
}
table[Chars.Zero] = scanHexBinOct;
// `:`
table[Chars.Colon] = scanChar;
statics[Chars.Colon] = Token.Colon;

// `;`
table[Chars.Semicolon] = scanChar;
statics[Chars.Semicolon] = Token.Semicolon;

// `<`, `<=`, `<<`, `<<=`, `</`
table[Chars.LessThan] = (parser, context) => {
  advanceOne(parser);
  if (hasNext(parser)) {
    switch (nextChar(parser)) {
      case Chars.LessThan:
        advanceOne(parser);
        if (consumeOpt(parser, Chars.EqualSign)) {
          return Token.ShiftLeftAssign;
        } else {
          return Token.ShiftLeft;
        }

      case Chars.EqualSign:
        advanceOne(parser);
        return Token.LessThanOrEqual;

      case Chars.Exclamation: {
        const index = parser.index + 1;
        const next = parser.source.charCodeAt(index);
        if (next === Chars.Hyphen && parser.source.charCodeAt(index + 1) === Chars.Hyphen) {
          parser.index = index;
          parser.column++;
          return skipToNewline(parser);
        }
      }

      case Chars.Slash: {
        if (!(context & Context.OptionsJSX)) break;
        const index = parser.index + 1;

        // Check that it's not a comment start.
        if (index < parser.length) {
          const next = parser.source.charCodeAt(index);
          if (next === Chars.Asterisk || next === Chars.Slash) break;
        }

        advanceOne(parser);
        return Token.JSXClose;
      }

      default: // ignore
    }
  }

  return Token.LessThan;
};

// `=`, `==`, `===`, `=>`
table[Chars.EqualSign] = parser => {
  advanceOne(parser);
  if (hasNext(parser)) {
    const next = nextChar(parser);

    if (next === Chars.EqualSign) {
      advanceOne(parser);
      if (consumeOpt(parser, Chars.EqualSign)) {
        return Token.StrictEqual;
      } else {
        return Token.LooseEqual;
      }
    } else if (next === Chars.GreaterThan) {
      advanceOne(parser);
      return Token.Arrow;
    }
  }

  return Token.Assign;
};

// `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
table[Chars.GreaterThan] = parser => {
  advanceOne(parser);
  if (hasNext(parser)) {
    const next = nextChar(parser);

    if (next === Chars.GreaterThan) {
      advanceOne(parser);

      if (hasNext(parser)) {
        const next = nextChar(parser);

        if (next === Chars.GreaterThan) {
          advanceOne(parser);
          if (consumeOpt(parser, Chars.EqualSign)) {
            return Token.LogicalShiftRightAssign;
          } else {
            return Token.LogicalShiftRight;
          }
        } else if (next === Chars.EqualSign) {
          advanceOne(parser);
          return Token.ShiftRightAssign;
        }
      }

      return Token.ShiftRight;
    } else if (next === Chars.EqualSign) {
      advanceOne(parser);
      return Token.GreaterThanOrEqual;
    }
  }

  return Token.GreaterThan;
};

// `?`
table[Chars.QuestionMark] = scanChar;
statics[Chars.QuestionMark] = Token.QuestionMark;

// `A`...`Z`
for (let i = Chars.UpperA; i < Chars.UpperZ; i++) {
  table[i] = scanKnownIdentifier;
}

// `a`...`z`
for (let i = Chars.LowerA; i < Chars.LowerZ; i++) {
  table[i] = scanKnownIdentifier;
}

// `[`
table[Chars.LeftBracket] = scanChar;
statics[Chars.LeftBracket] = Token.LeftBracket;

// `\\u{N}var`
table[Chars.Backslash] = scanKnownIdentifier;

// `]`
table[Chars.RightBracket] = scanChar;
statics[Chars.RightBracket] = Token.RightBracket;

// `^`, `^=`
table[Chars.Caret] = parser => {
  advanceOne(parser);
  if (consumeOpt(parser, Chars.EqualSign)) {
    return Token.BitwiseXorAssign;
  } else {
    return Token.BitwiseXor;
  }
};

// `_var`
table[Chars.Underscore] = scanKnownIdentifier;

// ``string``
table[Chars.Backtick] = scanTemplate;

// `{`
table[Chars.LeftBrace] = scanChar;
statics[Chars.LeftBrace] = Token.LeftBrace;

// `|`, `||`, `|=`
table[Chars.VerticalBar] = parser => {
  advanceOne(parser);
  if (hasNext(parser)) {
    const next = nextChar(parser);

    if (next === Chars.VerticalBar) {
      advanceOne(parser);
      return Token.LogicalOr;
    } else if (next === Chars.EqualSign) {
      advanceOne(parser);
      return Token.BitwiseOrAssign;
    }
  }

  return Token.BitwiseOr;
};

// `}`
table[Chars.RightBrace] = scanChar;
statics[Chars.RightBrace] = Token.RightBrace;

// `~`
table[Chars.Tilde] = scanChar;
statics[Chars.Tilde] = Token.Complement;

// General whitespace
table[Chars.Space] = table[Chars.Tab] = table[Chars.FormFeed] = table[Chars.VerticalTab] = s => {
  advanceOne(s);
  return Token.WhiteSpace;
};

// Linefeed
table[Chars.LineFeed] = state => {
  consumeLineFeed(state, (state.flags & SeekState.LastIsCR) !== 0);
  state.flags = (state.flags & ~SeekState.LastIsCR) | SeekState.NewLine;
  return Token.WhiteSpace;
};

// CarriageReturn
table[Chars.CarriageReturn] = state => {
  state.flags |= SeekState.NewLine | SeekState.LastIsCR;
  advanceNewline(state);
  return Token.WhiteSpace;
};

/**
 * Scan for a single token. You must seek first, because this assumes the current pointer is
 * pointing to either the start of a token or the end of the source.
 */
export function scan(state: ParserState, context: Context): any {
  while (state.index < state.length) {
    state.startIndex = state.index;
    let first = (state.lastChar = nextChar(state));
    if (
      ((state.token = table[state.lastChar](state, context, state.lastChar)) & Token.WhiteSpace) !==
      Token.WhiteSpace
    ) {
      return state.token;
    }
  }

  return Token.EndOfSource;
}
