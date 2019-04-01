import { Token } from './token';
import { Flags, ParserState } from './common';

/**
 * Create a new parser instance.
 */
export function create(source: string): ParserState {
  return {
    source,
    flags: Flags.Empty,
    index: 0,
    line: 1,
    column: 0,
    startIndex: 0,
    currentChar: source.charCodeAt(0),
    length: source.length,
    token: Token.EndOfSource,
    tokenValue: '',
    tokenRaw: '',
    tokenRegExp: undefined,
    lastChar: 0
  };
}
