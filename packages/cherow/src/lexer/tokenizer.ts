import { ParserState } from '../types';
import { Flags } from '../common';
import { Token, KeywordDescTable } from '../token';

export const enum TokenType {
  End,
  Keyword,
  Punctuator,
  Null,
  Boolean,
  Identifier,
  String,
  Numeric,
  RegularExpression,
  Template,
}

export const TokenTypes = [
  '<end>',
  'Keyword',
  'Punctuator',
  'NullLiteral',
  'BooleanLiteral',
  'Identifier',
  'StringLiteral',
  'Numeric',
  'RegularExpression',
  'Template',
];

// Usage: if (context & Context.Tokenize) edgeCaseCrap(state, token, Token.Type)

export function edgeCaseCrap(state: ParserState, t: Token, type: TokenType): void {
  state.flags |= Flags.EdgeCase; // If the flag is on, the 'nextToken' will not push anything to 'onToken'
  state.onToken(TokenTypes[type & 0xFF], t & Token.Punctuator ? KeywordDescTable[t & Token.Type] : state.tokenValue);
}

// TODO! Optimize and refactor this!

export function getTokenValue(state: ParserState, t: Token): string {
  if (t & Token.Punctuator) return KeywordDescTable[t & Token.Type];
  return state.source.slice(state.startIndex, state.index);
}

export function convertTokenType(t: Token): string {
  if (t & Token.NonReservedKeyword) return 'Identifier';
  if (t & Token.Punctuator) return 'Punctuator';
  if (t & Token.NumericLiteral) return 'Numeric';
  if ((t & Token.StringLiteral) === Token.StringLiteral) return 'StringLiteral';
  if (t & Token.RegularExpression) return 'RegularExpression';
  if (t & Token.Template) return 'Template';
  if (t === Token.NullKeyword) return 'NullLiteral';
  if (t & Token.ResOrFutureRes) return 'Keyword';
  return 'BooleanLiteral'; // true / false
}
