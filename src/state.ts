import { Flags, LabelState, OnComment, OnToken, ParserState, Grammar } from './common';
import { Token } from './token';

/**
 * Create a new Parser object.
 */
export function create(source: string, onComment: OnComment | void, onToken: OnToken | void): ParserState {
  return {
    source,
    onComment,
    onToken,
    flags: Flags.Empty,
    grammar: Grammar.BindableAndAssignable,
    index: 0,
    line: 1,
    column: 0,
    startIndex: 0,
    endIndex: 0,
    startLine: 1,
    endLine: 0,
    endColumn: 0,
    startColumn: 0,
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
    assignable: true,
    bindable: true,
    exportedNames: [],
    exportedBindings: [],
    labelSet: undefined,
    labelSetStack: [],
    iterationStack: [],
    labelDepth: 0,
    switchStatement: LabelState.Empty,
    iterationStatement: LabelState.Empty,
    functionBoundaryStack: undefined,
    pendingCoverInitializeError: null
  };
}
