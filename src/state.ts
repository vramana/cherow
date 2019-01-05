import * as ESTree from './estree';
import { Context, Flags, OnComment, ParserState, unimplemented } from './common';
import { Token } from './token';
import { errorMessages } from './errors';

/**
 * Create a new parser instance.
 */
export function create(source: string, onComment: OnComment): ParserState {
  return {
    source,
    onComment,
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
    length: source.length,
    lastChar: source.charCodeAt(0)
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
