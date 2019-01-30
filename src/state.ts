import * as ESTree from './estree';
import {
  Context,
  Flags,
  LabelState,
  LabelledState,
  OnComment,
  OnToken,
  ParserState,
  consumeSemicolon,
  Type,
  Origin,
  Arrows,
  Grammar,
  reinterpret,
  validateBindingIdentifier,
  addToExportedNamesAndCheckForDuplicates,
  addToExportedBindings,
  nextTokenIsFuncKeywordOnSameLine,
  isValidSimpleAssignmentTarget,
  getLabel,
  validateContinueLabel,
  validateBreakStatement,
  addCrossingBoundary,
  addLabel,
  addVariableAndDeduplicate,
  isValidIdentifier,
  ScopeState,
  ScopeType,
  createSubScope,
  createScope,
  Modifiers,
  nextTokenIsLeftParenOrPeriod,
  acquireGrammar,
  secludeGrammar,
  nameIsArgumentsOrEval,
  finishNode,
  ParenthesizedState
} from './common';
import { Token, KeywordDescTable } from './token';
import { next } from './scanner';
import { scanTemplateTail } from './scanner/template';
import {
  optional,
  expect,
  addVariable,
  checkIfExistInLexicalBindings,
  validateFunctionArgs,
  addFunctionName,
  isLexical,
  lookAheadOrScan
} from './common';
import { report, Errors } from './errors';

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
    inCatch: false,
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
