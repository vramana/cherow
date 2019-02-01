import { ParserState, Context, Flags } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { consumeOpt, consumeLineFeed, advanceOne } from './common';
import { skipBlockComment, skipSingleLineComment, skipSingleHTMLComment, CommentType } from './comments';
import { scanStringLiteral } from './string';
import { scanTemplate } from './template';
import { scanRegularExpression } from './regexp';
import { scanNumeric, scanHexIntegerLiteral, scanBinaryOrOctalDigits, scanImplicitOctalDigits } from './numeric';
import {
  scanIdentifier,
  scanIdentifierOrKeyword,
  scanMaybeIdentifier,
  scanPrivateName,
  scanIdentifierRest
} from './identifier';

// Table for one char punctuator lookup
const OneCharPunc = new Array(128).fill(0) as Token[];

const table = new Array(0xffff).fill(scanMaybeIdentifier, 0x80) as ((
  state: ParserState,
  context: Context,
  first: number
) => Token)[];

function scanChar(state: ParserState, _: Context, first: number): Token {
  advanceOne(state);
  return OneCharPunc[first];
}

// `#`
table[Chars.Hash] = scanPrivateName;

// `$var`
table[Chars.Dollar] = scanIdentifier;

// `"string"`
table[Chars.DoubleQuote] = scanStringLiteral;

// `'string'`
table[Chars.SingleQuote] = scanStringLiteral;

// `(`
table[Chars.LeftParen] = scanChar;
OneCharPunc[Chars.LeftParen] = Token.LeftParen;

// `)`
table[Chars.RightParen] = scanChar;
OneCharPunc[Chars.RightParen] = Token.RightParen;

// `1`...`9`
for (let i = Chars.One; i <= Chars.Nine; i++) {
  table[i] = scanNumeric;
}

// `:`
table[Chars.Colon] = scanChar;
OneCharPunc[Chars.Colon] = Token.Colon;

// `;`
table[Chars.Semicolon] = scanChar;
OneCharPunc[Chars.Semicolon] = Token.Semicolon;

table[Chars.Zero] = (state, context) => {
  const index = state.index + 1;
  if (index < state.length) {
    // either 0, 0exxx, 0Exxx, 0.xxx, a hex number, a binary number or
    // an octal number.
    const next = state.source.charCodeAt(index);
    if (next === Chars.UpperX || next === Chars.LowerX) {
      // x or X
      state.index = index + 1;
      state.column += 2;
      return scanHexIntegerLiteral(state);
    } else if (next === Chars.UpperB || next === Chars.LowerB) {
      state.index = index + 1;
      state.column += 2;
      return scanBinaryOrOctalDigits(state, /* base */ 2);
    } else if (next === Chars.UpperO || next === Chars.LowerO) {
      state.index = index + 1;
      state.column += 2;
      return scanBinaryOrOctalDigits(state, /* base */ 8);
    } else if (index < state.length && (next >= Chars.Zero && next <= Chars.Nine)) {
      return scanImplicitOctalDigits(state, context);
    }
  }
  return scanNumeric(state, context);
};

// `!`, `!=`, `!==`
table[Chars.Exclamation] = s => {
  advanceOne(s);
  if (!consumeOpt(s, Chars.EqualSign)) return Token.Negate;
  if (!consumeOpt(s, Chars.EqualSign)) return Token.LooseNotEqual;
  return Token.StrictNotEqual;
};

// `%`, `%=`
table[Chars.Percent] = s => {
  advanceOne(s);
  if (!consumeOpt(s, Chars.EqualSign)) return Token.Modulo;
  return Token.ModuloAssign;
};

// `&`, `&&`, `&=`
table[Chars.Ampersand] = s => {
  advanceOne(s);
  if (s.index >= s.length) return Token.BitwiseAnd;
  const next = s.source.charCodeAt(s.index);
  if (next === Chars.Ampersand) {
    advanceOne(s);
    return Token.LogicalAnd;
  }

  if (next === Chars.EqualSign) {
    advanceOne(s);
    return Token.BitwiseAndAssign;
  }

  return Token.BitwiseAnd;
};

// `*`, `**`, `*=`, `**=`
table[Chars.Asterisk] = s => {
  advanceOne(s);
  if (s.index >= s.length) return Token.Multiply;
  const next = s.source.charCodeAt(s.index);
  if (next === Chars.EqualSign) {
    advanceOne(s);
    return Token.MultiplyAssign;
  }

  if (next !== Chars.Asterisk) return Token.Multiply;
  advanceOne(s);
  if (!consumeOpt(s, Chars.EqualSign)) return Token.Exponentiate;
  return Token.ExponentiateAssign;
};

// `+`, `++`, `+=`
table[Chars.Plus] = s => {
  advanceOne(s);
  if (s.index >= s.length) return Token.Add;
  const next = s.source.charCodeAt(s.index);

  if (next === Chars.Plus) {
    advanceOne(s);
    return Token.Increment;
  }

  if (next === Chars.EqualSign) {
    advanceOne(s);
    return Token.AddAssign;
  }

  return Token.Add;
};

// `,`
table[Chars.Comma] = scanChar;
OneCharPunc[Chars.Comma] = Token.Comma;

// `-`, `--`, `-=`
table[Chars.Hyphen] = (state, context) => {
  advanceOne(state);
  if (state.index >= state.length) return Token.Subtract;
  const next = state.source.charCodeAt(state.index);
  if (next === Chars.Hyphen) {
    advanceOne(state);
    if (
      context & Context.OptionsWebCompat &&
      ((state.flags & Flags.NewLine || state.startIndex === 0) && consumeOpt(state, Chars.GreaterThan))
    ) {
      return skipSingleHTMLComment(state, context, CommentType.HTMLClose);
    }
    return Token.Decrement;
  } else if (next === Chars.EqualSign) {
    advanceOne(state);
    return Token.SubtractAssign;
  }

  return Token.Subtract;
};

// `.`, `...`, `.123` (numeric literal)
table[Chars.Period] = (state, context) => {
  let index = state.index + 1;
  if (index < state.length) {
    const next = state.source.charCodeAt(index);

    if (next === Chars.Period) {
      index++;
      if (index < state.length && state.source.charCodeAt(index) === Chars.Period) {
        state.index = index + 1;
        state.column += 3;
        return Token.Ellipsis;
      }
    } else if (next >= Chars.Zero && next <= Chars.Nine) {
      scanNumeric(state, context);
      return Token.NumericLiteral;
    }
  }

  state.index++;
  state.column++;
  return Token.Period;
};

// `/`, `/=`, `/>`
table[Chars.Slash] = (state, context) => {
  advanceOne(state);
  if (state.index < state.length) {
    const next = state.source.charCodeAt(state.index);
    if (next === Chars.Slash) {
      state.index++;
      state.column++;
      return skipSingleLineComment(state, CommentType.Single);
    } else if (next === Chars.Asterisk) {
      state.index++;
      state.column++;
      return skipBlockComment(state);
    } else if (context & Context.AllowPossibleRegEx) {
      return scanRegularExpression(state, context);
    } else if (next === Chars.EqualSign) {
      advanceOne(state);
      return Token.DivideAssign;
    } else if (next === Chars.GreaterThan) {
      advanceOne(state);
      return Token.JSXAutoClose;
    }
  }

  return Token.Divide;
};

// `<`, `<=`, `<<`, `<<=`, `</`, `<!--`
table[Chars.LessThan] = (state, context) => {
  advanceOne(state);
  if (state.index >= state.length) return Token.LessThan;
  switch (state.source.charCodeAt(state.index)) {
    case Chars.LessThan:
      advanceOne(state);
      if (consumeOpt(state, Chars.EqualSign)) {
        return Token.ShiftLeftAssign;
      } else {
        return Token.ShiftLeft;
      }

    case Chars.EqualSign:
      advanceOne(state);
      return Token.LessThanOrEqual;

    case Chars.Exclamation: {
      const index = state.index + 1;
      const next = state.source.charCodeAt(index);
      if (next === Chars.Hyphen && state.source.charCodeAt(index + 1) === Chars.Hyphen) {
        state.index = index;
        state.column++;
        return skipSingleHTMLComment(state, context, CommentType.HTMLOpen);
      }
    }

    case Chars.Slash: {
      if (!(context & Context.OptionsJSX)) break;
      const index = state.index + 1;

      // Check that it's not a comment start.
      if (index < state.source.length) {
        const next = state.source.charCodeAt(index);
        if (next === Chars.Asterisk || next === Chars.Slash) break;
      }

      advanceOne(state);
      return Token.JSXClose;
    }

    default:
      // ignore
      return Token.LessThan;
  }

  return Token.LessThan;
};

// `=`, `==`, `===`, `=>`
table[Chars.EqualSign] = s => {
  advanceOne(s);
  if (s.index >= s.length) return Token.Assign;
  const next = s.source.charCodeAt(s.index);

  if (next === Chars.EqualSign) {
    advanceOne(s);
    if (consumeOpt(s, Chars.EqualSign)) {
      return Token.StrictEqual;
    } else {
      return Token.LooseEqual;
    }
  } else if (next === Chars.GreaterThan) {
    advanceOne(s);
    return Token.Arrow;
  }

  return Token.Assign;
};

// `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
table[Chars.GreaterThan] = state => {
  advanceOne(state);
  if (state.index >= state.length) return Token.GreaterThan;

  const next = state.source.charCodeAt(state.index);

  if (next === Chars.GreaterThan) {
    advanceOne(state);
    if (state.index < state.length) {
      const next = state.source.charCodeAt(state.index);

      if (next === Chars.GreaterThan) {
        advanceOne(state);
        return consumeOpt(state, Chars.EqualSign) ? Token.LogicalShiftRightAssign : Token.LogicalShiftRight;
      } else if (next === Chars.EqualSign) {
        advanceOne(state);
        return Token.ShiftRightAssign;
      }
    }

    return Token.ShiftRight;
  } else if (next === Chars.EqualSign) {
    advanceOne(state);
    return Token.GreaterThanOrEqual;
  }

  return Token.GreaterThan;
};

// `^`, `^=`
table[Chars.Caret] = s => {
  advanceOne(s);
  if (!consumeOpt(s, Chars.EqualSign)) return Token.BitwiseXor;
  return Token.BitwiseXorAssign;
};

// `|`, `||`, `|=`
table[Chars.VerticalBar] = s => {
  advanceOne(s);
  if (s.index >= s.length) return Token.BitwiseOr;
  const next = s.source.charCodeAt(s.index);

  if (next === Chars.VerticalBar) {
    advanceOne(s);
    return Token.LogicalOr;
  } else if (next === Chars.EqualSign) {
    advanceOne(s);
    return Token.BitwiseOrAssign;
  }

  return Token.BitwiseOr;
};

// `?`
table[Chars.QuestionMark] = scanChar;
OneCharPunc[Chars.QuestionMark] = Token.QuestionMark;

// `A`...`Z`
for (let i = Chars.UpperA; i <= Chars.UpperZ; i++) {
  table[i] = scanIdentifier;
}

// `a`...`z`
for (let i = Chars.LowerA; i <= Chars.LowerZ; i++) {
  table[i] = scanIdentifierOrKeyword;
}

// `[`
table[Chars.LeftBracket] = scanChar;
OneCharPunc[Chars.LeftBracket] = Token.LeftBracket;

// `\\u{N}var`
table[Chars.Backslash] = scanIdentifierRest;

// `]`
table[Chars.RightBracket] = scanChar;
OneCharPunc[Chars.RightBracket] = Token.RightBracket;

// `_var`
table[Chars.Underscore] = scanIdentifier;

// ``string``
table[Chars.Backtick] = scanTemplate;

// `{`
table[Chars.LeftBrace] = scanChar;
OneCharPunc[Chars.LeftBrace] = Token.LeftBrace;

// `}`
table[Chars.RightBrace] = scanChar;
OneCharPunc[Chars.RightBrace] = Token.RightBrace;

// `~`
table[Chars.Tilde] = scanChar;
OneCharPunc[Chars.Tilde] = Token.Complement;

// General whitespace
table[Chars.Space] = table[Chars.Tab] = table[Chars.FormFeed] = table[Chars.VerticalTab] = state => {
  state.index++;
  state.column++;
  return Token.WhiteSpace;
};

// Linefeed
table[Chars.LineFeed] = state => {
  consumeLineFeed(state, (state.flags & Flags.LastIsCR) > 0);
  state.flags = (state.flags & ~Flags.LastIsCR) | Flags.NewLine;
  return Token.WhiteSpace;
};

// CarriageReturn
table[Chars.CarriageReturn] = state => {
  state.flags |= Flags.NewLine | Flags.LastIsCR;
  state.index++;
  state.column = 0;
  state.line++;
  return Token.WhiteSpace;
};

export function next(state: ParserState, context: Context): Token {
  state.flags &= ~Flags.NewLine; // reset the 'NewLine' flag for each scan
  state.endIndex = state.index;
  while (state.index < state.length) {
    state.startIndex = state.index;
    const first = state.source.charCodeAt(state.index);
    if (((state.token = table[first](state, context, first)) & Token.WhiteSpace) !== Token.WhiteSpace) {
      if (state.onToken) state.onToken(state.token, state.startIndex, state.index);
      return state.token;
    }
  }

  return (state.token = Token.EndOfSource);
}
