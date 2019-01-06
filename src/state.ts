import * as ESTree from './estree';
import { Context, Flags, OnComment, OnToken, ParserState, unimplemented } from './common';
import { Token } from './token';

/**
 * Create a new parser instance.
 */
export function create(source: string, onComment: OnComment | void, onToken: OnToken | void): ParserState {
  return {
    source,
    onComment,
    onToken,
    flags: Flags.Empty,
    index: 0,
    line: 1,
    column: 0,
    startIndex: 0,
    token: Token.EndOfSource,
    tokenValue: undefined,
    tokenRaw: '',
    tokenRegExp: undefined,
    lastRegExpError: undefined,
    numCapturingParens: 0,
    largestBackReference: 0,
    length: source.length,
    currentChar: source.charCodeAt(0),
    lastChar: 0
  };
}

function parseStatementListItem(state: ParserState, context: Context): ESTree.Statement {
  let p = state;
  let c = context;
  // TODO
  return unimplemented();
}

/**
 * Parse a module body, function body, script body, etc.
 */
export function parseBody(state: ParserState, context: Context): ESTree.Statement[] {
  let p = state;
  let c = context;

  const statements: ESTree.Statement[] = [];

  return statements;
}
