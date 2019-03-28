import { Chars } from '../chars';
import { Token, KeywordDescTable, descKeywordTable } from '../token';
import { Parser } from '../common';

export const enum CharacterKind {
  Invalid = 0,
  IdentifierStart = 1 << 0,
  IdentifierPart = 1 << 1,
  WhiteSpace = 1 << 2,
  WhiteSpaceOrLineTerminator = 1 << 3,
  TerminatesLiteral = 1 << 4,
  NoKeywordCandidate = 1 << 5,
  NoKeywordCandidateStart = 1 << 6,
  StringTerminator = 1 << 7,
  MultiChar = 1 << 8
};

export const CharLookup = [

  /*   0 - Null               */ CharacterKind.Invalid,
  /*   1 - Start of Heading   */ CharacterKind.Invalid,
  /*   2 - Start of Text      */ CharacterKind.Invalid,
  /*   3 - End of Text        */ CharacterKind.Invalid,
  /*   4 - End of Transm.     */ CharacterKind.Invalid,
  /*   5 - Enquiry            */ CharacterKind.Invalid,
  /*   6 - Acknowledgment     */ CharacterKind.Invalid,
  /*   7 - Bell               */ CharacterKind.Invalid,
  /*   8 - Back Space         */ CharacterKind.Invalid,
  /*   9 - Horizontal Tab     */ CharacterKind.WhiteSpace | CharacterKind.WhiteSpaceOrLineTerminator,
  /*  10 - Line Feed          */ CharacterKind.WhiteSpaceOrLineTerminator | CharacterKind.StringTerminator,
  /*  11 - Vertical Tab       */ CharacterKind.WhiteSpace | CharacterKind.WhiteSpaceOrLineTerminator,
  /*  12 - Form Feed          */ CharacterKind.WhiteSpace | CharacterKind.WhiteSpaceOrLineTerminator,
  /*  13 - Carriage Return    */ CharacterKind.WhiteSpaceOrLineTerminator | CharacterKind.StringTerminator,
  /*  14 - Shift Out          */ CharacterKind.Invalid,
  /*  15 - Shift In           */ CharacterKind.Invalid,
  /*  16 - Data Line Escape   */ CharacterKind.Invalid,
  /*  17 - Device Control 1   */ CharacterKind.Invalid,
  /*  18 - Device Control 2   */ CharacterKind.Invalid,
  /*  19 - Device Control 3   */ CharacterKind.Invalid,
  /*  20 - Device Control 4   */ CharacterKind.Invalid,
  /*  21 - Negative Ack.      */ CharacterKind.Invalid,
  /*  22 - Synchronous Idle   */ CharacterKind.Invalid,
  /*  23 - End of Transmit    */ CharacterKind.Invalid,
  /*  24 - Cancel             */ CharacterKind.Invalid,
  /*  25 - End of Medium      */ CharacterKind.Invalid,
  /*  26 - Substitute         */ CharacterKind.Invalid,
  /*  27 - Escape             */ CharacterKind.Invalid,
  /*  28 - File Separator     */ CharacterKind.Invalid,
  /*  29 - Group Separator    */ CharacterKind.Invalid,
  /*  30 - Record Separator   */ CharacterKind.Invalid,
  /*  31 - Unit Separator     */ CharacterKind.Invalid,
  /*  32 - Space              */ CharacterKind.WhiteSpace | CharacterKind.WhiteSpaceOrLineTerminator,
  /*  33 - !                  */ CharacterKind.StringTerminator,
  /*  34 - "                  */ CharacterKind.Invalid,
  /*  35 - #                  */ CharacterKind.Invalid,
  /*  36 - $                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  37 - %                  */ CharacterKind.Invalid,
  /*  38 - &                  */ CharacterKind.Invalid,
  /*  39 - '                  */ CharacterKind.StringTerminator,
  /*  40 - (                  */ CharacterKind.Invalid,
  /*  41 - )                  */ CharacterKind.Invalid,
  /*  42 - *                  */ CharacterKind.Invalid,
  /*  43 - +                  */ CharacterKind.Invalid,
  /*  44 - ,                  */ CharacterKind.Invalid,
  /*  45 - -                  */ CharacterKind.Invalid,
  /*  46 - .                  */ CharacterKind.Invalid,
  /*  47 - /                  */ CharacterKind.Invalid,
  /*  48 - 0                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  49 - 1                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  50 - 2                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  51 - 3                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  52 - 4                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  53 - 5                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  54 - 6                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  55 - 7                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  56 - 8                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  57 - 9                  */ CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  58 - :                  */ CharacterKind.Invalid,
  /*  59 - ;                  */ CharacterKind.Invalid,
  /*  60 - <                  */ CharacterKind.Invalid,
  /*  61 - =                  */ CharacterKind.Invalid,
  /*  62 - >                  */ CharacterKind.Invalid,
  /*  63 - ?                  */ CharacterKind.Invalid,
  /*  64 - @                  */ CharacterKind.Invalid,
  /*  65 - A                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  66 - B                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  67 - C                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  68 - D                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  69 - E                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  70 - F                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  71 - G                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  72 - H                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  73 - I                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  74 - J                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  75 - K                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  76 - L                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  77 - M                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  78 - N                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  79 - O                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  80 - P                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  81 - Q                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  82 - R                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  83 - S                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  84 - T                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  85 - U                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  86 - V                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  87 - W                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  88 - X                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  89 - Y                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  90 - Z                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  91 - [                  */ CharacterKind.Invalid,
  /*  92 - \                  */ CharacterKind.StringTerminator | CharacterKind.MultiChar,
  /*  93 - ]                  */ CharacterKind.Invalid,
  /*  94 - ^                  */ CharacterKind.Invalid,
  /*  95 - _                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /*  96 - `                  */ CharacterKind.Invalid,
  /*  97 - a                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /*  98 - b                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /*  99 - c                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 100 - d                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 101 - e                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 102 - f                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 103 - g                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 104 - h                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 105 - i                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 106 - j                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 107 - k                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 108 - l                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 109 - m                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 110 - n                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 111 - o                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 112 - p                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 113 - q                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 114 - r                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 115 - s                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 116 - t                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 117 - u                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 118 - v                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 119 - w                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 120 - x                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidate,
  /* 121 - y                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart,
  /* 122 - z                  */ CharacterKind.IdentifierStart | CharacterKind.IdentifierPart | CharacterKind.NoKeywordCandidateStart,
  /* 123 - {                  */ CharacterKind.Invalid,
  /* 124 - |                  */ CharacterKind.Invalid,
  /* 125 - }                  */ CharacterKind.Invalid,
  /* 126 - ~                  */ CharacterKind.Invalid,
  /* 127 - Delete             */ CharacterKind.Invalid,
  /* 128 - Cc category        */ CharacterKind.Invalid,
]

export const OneCharToken = [

/*   0 - Null               */ Token.Invalid,
/*   1 - Start of Heading   */ Token.Invalid,
/*   2 - Start of Text      */ Token.Invalid,
/*   3 - End of Text        */ Token.Invalid,
/*   4 - End of Transm.     */ Token.Invalid,
/*   5 - Enquiry            */ Token.Invalid,
/*   6 - Acknowledgment     */ Token.Invalid,
/*   7 - Bell               */ Token.Invalid,
/*   8 - Back Space         */ Token.WhiteSpace,
/*   9 - Horizontal Tab     */ Token.WhiteSpace,
/*  10 - Line Feed          */ Token.WhiteSpace,
/*  11 - Vertical Tab       */ Token.WhiteSpace,
/*  12 - Form Feed          */ Token.WhiteSpace,
/*  13 - Carriage Return    */ Token.WhiteSpace,
/*  14 - Shift Out          */ Token.Invalid,
/*  15 - Shift In           */ Token.Invalid,
/*  16 - Data Line Escape   */ Token.Invalid,
/*  17 - Device Control 1   */ Token.Invalid,
/*  18 - Device Control 2   */ Token.Invalid,
/*  19 - Device Control 3   */ Token.Invalid,
/*  20 - Device Control 4   */ Token.Invalid,
/*  21 - Negative Ack.      */ Token.Invalid,
/*  22 - Synchronous Idle   */ Token.Invalid,
/*  23 - End of Transmit    */ Token.Invalid,
/*  24 - Cancel             */ Token.Invalid,
/*  25 - End of Medium      */ Token.Invalid,
/*  26 - Substitute         */ Token.Invalid,
/*  27 - Escape             */ Token.Invalid,
/*  28 - File Separator     */ Token.Invalid,
/*  29 - Group Separator    */ Token.Invalid,
/*  30 - Record Separator   */ Token.Invalid,
/*  31 - Unit Separator     */ Token.Invalid,
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
/* 127 - Delete             */ Token.Invalid
];


export function nextToken(parser: Parser): void {
  parser.token = scanSingleToken(parser);

}

export function scanSingleToken(parser: Parser): Token {
  while (parser.index < parser.source.length) {
    const next = parser.source.charCodeAt(parser.index);
    if (next <= 127) {

      const token = OneCharToken[next]

      switch (token) {
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
          parser.index++;
        case Token.Invalid:
        // One character tokens.
        return token;
        // `!`, `!=`, `!==`
        case Token.Negate:
        parser.index++;
          if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.Negate;
          parser.index++;
          if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.LooseNotEqual;
          parser.index++;
          return Token.StrictNotEqual;

        // `%`, `%=`
        case Token.Modulo:
        parser.index++;
          if (parser.source.charCodeAt(parser.index) !== Chars.EqualSign) return Token.Modulo;
          parser.index++;
          return Token.ModuloAssign;
        case Token.NumericLiteral:
            parser.index++;
        return Token.NumericLiteral;
        case Token.Identifier:
          return parseIdentifier(parser);
        case Token.WhiteSpace:
          parser.index++
        break;
      }
    }
  }
  return Token.EndOfSource;
}

function parseIdentifier(state: Parser): Token {
  let isEscaped = false;
  let maybeKeyword = true;
  let start = state.index;
  if (state.source.charCodeAt(state.index) <= 127) {
      if ((CharLookup[state.source.charCodeAt(state.index)] & CharacterKind.MultiChar) === 0) {
          let scan_flags = CharLookup[state.source.charCodeAt(state.index)];
          while (CharLookup[state.source.charCodeAt(state.index)] & CharacterKind.IdentifierPart) {
              scan_flags |= CharLookup[state.source.charCodeAt(state.index++)];
          }

          if ((scan_flags & CharacterKind.MultiChar) !== CharacterKind.MultiChar) {
              state.tokenValue = state.source.slice(start, state.index);
              if ((scan_flags & CharacterKind.NoKeywordCandidate) === CharacterKind.NoKeywordCandidate) return Token.Identifier;
              // All keywords are of length 2 ≥ length ≥ 10, so we optimize for that
              const len = state.tokenValue.length;
              if (len >= 2 && len <= 11) {
                  const keyword: Token | undefined = descKeywordTable[state.tokenValue];
                  if (keyword !== undefined) return keyword;
              }
              return Token.Identifier;
          }

          maybeKeyword = (scan_flags & CharacterKind.NoKeywordCandidate) !== 0;
      } else {
        isEscaped = true;
        return Token.Invalid;
    }
  }

  return scanIdentifierOrKeywordInnerSlow(state, isEscaped, maybeKeyword);
}

export function scanIdentifierOrKeywordInnerSlow(___: Parser, __: boolean, _: boolean): Token {
  return Token.Identifier;
}
