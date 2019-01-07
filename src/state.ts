import * as ESTree from './estree';
import { Context, Flags, OnComment, OnToken, ParserState, unimplemented } from './common';
import { Token } from './token';
import { next } from './scanner';

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
    lastChar: 0,
    inCatch: false,
    exportedNames: [],
    exportedBindings: []
  };
}

function parseStatementList(state: ParserState, context: Context): ESTree.Statement {
  const p = state;
  const c = context;
  // TODO
  return unimplemented();
}

function parseModuleItem(state: ParserState, context: Context): ESTree.Statement {
  const p = state;
  const c = context;
  // TODO
  return unimplemented();
}

/**
 * Parse a module body, function body, script body, etc.
 */
export function parseBody(state: ParserState, context: Context): ESTree.Statement[] {
  // Prime the scanner
  next(state, context);
  const statements: ESTree.Statement[] = [];
  while (state.token !== Token.EndOfSource) {
    if (context & Context.Module) statements.push(parseModuleItem(state, context));
    else statements.push(parseStatementList(state, context));
  }

  return statements;
}
