import { ParserState, Context, Flags, convertTokenType } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { consumeOpt, consumeLineFeed, advanceOne, isDigit } from './common';
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

// Table of one-character tokens
const oneCharTokens = new Array(128).fill(0) as Token[];

// It's a table dispatch to avoid frequent branch prediction fails, and for
// faster multi-character token lookup.
const table = new Array(0xffff).fill(scanMaybeIdentifier, 0x80) as ((
  state: ParserState,
  context: Context,
  first: number
) => Token)[];

function scanChar(state: ParserState, _: Context, first: number): Token {
  advanceOne(state);
  return oneCharTokens[first];
}

// `,`
table[Chars.Comma] = scanChar;
oneCharTokens[Chars.Comma] = Token.Comma;

// `?`
table[Chars.QuestionMark] = scanChar;
oneCharTokens[Chars.QuestionMark] = Token.QuestionMark;

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
oneCharTokens[Chars.LeftBracket] = Token.LeftBracket;

// `]`
table[Chars.RightBracket] = scanChar;
oneCharTokens[Chars.RightBracket] = Token.RightBracket;

// `{`
table[Chars.LeftBrace] = scanChar;
oneCharTokens[Chars.LeftBrace] = Token.LeftBrace;

// `}`
table[Chars.RightBrace] = scanChar;
oneCharTokens[Chars.RightBrace] = Token.RightBrace;

// `~`
table[Chars.Tilde] = scanChar;
oneCharTokens[Chars.Tilde] = Token.Complement;

// `(`
table[Chars.LeftParen] = scanChar;
oneCharTokens[Chars.LeftParen] = Token.LeftParen;

// `)`
table[Chars.RightParen] = scanChar;
oneCharTokens[Chars.RightParen] = Token.RightParen;

// `#`
table[Chars.Hash] = scanPrivateName;

// `$var`
table[Chars.Dollar] = scanIdentifier;

// `"string"`
table[Chars.DoubleQuote] = scanStringLiteral;

// `'string'`
table[Chars.SingleQuote] = scanStringLiteral;

// `\\u{N}var`
table[Chars.Backslash] = scanIdentifierRest;

// `_var`
table[Chars.Underscore] = scanIdentifier;

// ``string``
table[Chars.Backtick] = scanTemplate;

// `1`...`9`
for (let i = Chars.One; i <= Chars.Nine; i++) {
  table[i] = scanNumeric;
}

// `:`
table[Chars.Colon] = scanChar;
oneCharTokens[Chars.Colon] = Token.Colon;

// `;`
table[Chars.Semicolon] = scanChar;
oneCharTokens[Chars.Semicolon] = Token.Semicolon;

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
table[Chars.Period] = (state, context, first) => {
  advanceOne(state);
  const next = state.source.charCodeAt(state.index);
  if (!isDigit(next)) {
    if (consumeOpt(state, Chars.Period)) {
      if (consumeOpt(state, Chars.Period)) return Token.Ellipsis;
      state.column = state.index--;
    }
    return Token.Period;
  }
  return scanNumeric(state, context, first);
};

// `/`, `/=`, `/>`
table[Chars.Slash] = (state, context) => {
  advanceOne(state);
  if (state.index < state.length) {
    const next = state.source.charCodeAt(state.index);
    if (next === Chars.Slash) {
      advanceOne(state);
      return skipSingleLineComment(state, CommentType.Single);
    } else if (next === Chars.Asterisk) {
      advanceOne(state);
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
    return consumeOpt(s, Chars.EqualSign) ? Token.StrictEqual : Token.LooseEqual;
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

table[Chars.Zero] = (state, context, first) => {
  const index = state.index + 1;
  if (index < state.length) {
    // either 0, 0exxx, 0Exxx, 0.xxx, a hex number, a binary number or
    // an octal number.
    const next = state.source.charCodeAt(index);
    let lowerCasedLetters = next | 32;
    if (lowerCasedLetters === Chars.LowerX) {
      // x or X
      state.index = index + 1;
      state.column += 2;
      return scanHexIntegerLiteral(state);
    } else if (lowerCasedLetters === Chars.LowerB) {
      state.index = index + 1;
      state.column += 2;
      return scanBinaryOrOctalDigits(state, /* base */ 2);
    } else if (lowerCasedLetters === Chars.LowerO) {
      state.index = index + 1;
      state.column += 2;
      return scanBinaryOrOctalDigits(state, /* base */ 8);
    } else if (index < state.length && (next >= Chars.Zero && next <= Chars.Nine)) {
      return scanImplicitOctalDigits(state, context, first);
    }
  }
  return scanNumeric(state, context, first);
};

// General whitespace
table[Chars.Space] = table[Chars.Tab] = table[Chars.FormFeed] = table[Chars.VerticalTab] = state => {
  advanceOne(state);
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
  ++state.index;
  state.column = 0;
  ++state.line;
  return Token.WhiteSpace;
};

/**
 *
 * Scan for a single token
 *
 * @param state Parser object
 * @param context Context masks
 */
export function tableLookUp(state: ParserState, context: Context, first: number) {
  return table[first](state, context, first);
}

export type ScanSingleTokenAlternativeCallback = (state: ParserState, context: Context, first: number) => Token;

export function scanSingleToken(
  state: ParserState,
  context: Context,
  scanSingleTokenAlternative: ScanSingleTokenAlternativeCallback | undefined
): Token {
  state.flags &= ~Flags.NewLine;
  state.endIndex = state.index;
  state.endLine = state.line;
  state.endColumn = state.column;
  const callBack = scanSingleTokenAlternative ? scanSingleTokenAlternative : tableLookUp;
  while (state.index < state.length) {
    state.startIndex = state.index;
    state.startColumn = state.column;
    state.startLine = state.line;
    const first = state.source.charCodeAt(state.index);
    if (((state.token = callBack(state, context, first)) & Token.WhiteSpace) !== Token.WhiteSpace) {
      if (state.onToken) state.onToken(convertTokenType(state.token), state.startIndex, state.index);
      return state.token;
    }
  }
  return (state.token = Token.EndOfSource);
}
