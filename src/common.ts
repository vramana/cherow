import * as ESTree from './estree';
import { Token, KeywordDescTable } from './token';
import { next } from './scanner';
import { Errors, report } from './errors';

// prettier-ignore
/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
  Empty = 0,
  OptionsNext = 1 << 0,
  OptionsRanges = 1 << 1,
  OptionsJSX = 1 << 2,
  OptionsRaw = 1 << 3,
  OptionsDisableWebCompat = 1 << 4,
  OptionsLoc = 1 << 5,
  OptionsGlobalReturn = 1 << 6,
  OptionsExperimental = 1 << 7,
  OptionsNative = 1 << 8,
  RequireIdentifier = 1 << 9,

  Strict = 1 << 10,
  Module = 1 << 11,

  TopLevel = 1 << 12,

  DisallowInContext = 1 << 13,
  InClass = 1 << 14,
  AllowPossibleRegEx = 1 << 15,
  TaggedTemplate = 1 << 16,
  OptionsDirectives = 1 << 17,
  SuperProperty = 1 << 18,

  SuperCall = 1 << 19,

  InGlobal = 1 << 20,
  YieldContext = 1 << 21,
  AwaitContext = 1 << 22,
  InArgList = 1 << 23,
  InConstructor = 1 << 24,
  InMethod = 1 << 25,
  AllowNewTarget = 1 << 26,
  AllowReturn = 1 << 27,

  LocationTracking = OptionsLoc | OptionsRanges
}

/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
// prettier-ignore
export const enum Flags {
  Empty = 0,
  NewLine = 1 << 0,
  LastIsCR = 1 << 1,
  Float = 1 << 2,
  Octal = 1 << 3,
  Binary = 1 << 4,
  SeenPrototype = 1 << 5,
  SimpleParameterList = 1 << 6,
  HasPrivateName = 1 << 7,
  InArrowContext = 1 << 8,
  HasStrictReserved = 1 << 9,
  StrictEvalArguments = 1 << 10,
}
// prettier-ignore
/**
 * The binding type masks, passed around as a simple immutable bit set
 */
// prettier-ignore
export const enum Type {
  None = 0,
  ArgList = 1 << 0,
  Variable = 1 << 1,
  Let = 1 << 2, // Lexical
  Const = 1 << 3, // Lexical
  ClassExprDecl = 1 << 4,
  ConciseBody = 1 << 6,
}

/**
 * The binding origin masks, passed around as a simple immutable bit set
 */
// prettier-ignore
export const enum Origin {
  None = 0,
  Statement = 1 << 0,
  ForStatement = 1 << 1,
  Export = 1 << 2,
  CatchClause = 1 << 3,
  AsyncArgs = 1 << 4,
  ArgList = 1 << 5,
  ClassExprDecl = 1 << 6,
  Declaration = 1 << 7,
  AsyncArrow = 1 << 8,
}

export const enum ScopeType {
  None = 0,
  BlockStatement = 1,
  ForStatement = 2,
  SwitchStatement = 3,
  CatchClause = 4,
  ArgumentList = 5
}

export const enum LabelledState {
  None = 0,
  AllowAsLabelled = 1 << 0,
  Disallow = 1 << 1
}

export const enum ObjectState {
  None = 0,
  Method = 1 << 0,
  Computed = 1 << 1,
  Shorthand = 1 << 2,
  Generator = 1 << 3,
  Async = 1 << 4,
  Static = 1 << 5,
  Constructor = 1 << 6,
  ClassField = 1 << 7,
  Getter = 1 << 8,
  Setter = 1 << 9,
  GetSet = Getter | Setter
}

export const enum Arrows {
  None = 0,
  ConciseBody = 1 << 0,
  Plain = 1 << 1,
  Async = 1 << 2
}

export const enum Grammar {
  None = 0,
  Bindable = 1 << 0,
  Assignable = 1 << 1,
  NotBindable = 1 << 2,
  NotAssignable = 1 << 3,
  NotAssignbleOrBindable = NotBindable | NotAssignable,
  BindableAndAssignable = Assignable | Bindable
}

/*@internal*/
export const enum LabelState {
  Empty = 0, // Break statement
  Iteration = 1 << 0, // Parsing iteration statement
  CrossingBoundary = 1 << 1 // Crossing function boundary
}

/**
 * The type of the `onComment` option.
 */
export type OnComment = void | ESTree.Comment[] | ((type: string, value: string, start?: number, end?: number) => any);
export type OnToken = void | Token[] | ((token: Token, start?: number, end?: number) => any);

export interface ScopeState {
  var: any;
  lexVars: any;
  lex: any;
}

export interface LexicalScope {
  childScope: any;
  flags: ScopeType;
  functions: void | {
    pattern?: string;
    flags?: string;
  };
}

/**
 * The parser interface.
 */
export interface ParserState {
  source: string;
  onComment: any;
  onToken: any;
  flags: Flags;
  grammar: Grammar;
  index: number;
  line: number;
  startIndex: number;
  startLine: number;
  startColumn: number;
  column: number;
  token: Token;
  tokenValue: any;
  tokenRaw: string;
  currentChar: any;
  length: number;
  lastRegExpError: any;
  numCapturingParens: number;
  largestBackReference: number;
  lastChar: number;
  inCatch: boolean;
  assignable: boolean;
  bindable: boolean;
  exportedNames: any[];
  exportedBindings: any[];
  labelSet: any;
  labelSetStack: { [key: string]: boolean }[];
  iterationStack: (boolean | LabelState)[];
  switchStatement: LabelState;
  iterationStatement: LabelState;
  labelDepth: number;
  functionBoundaryStack: any;
  pendingCoverInitializeError: Errors | null;
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };
}

// Note: this is intentionally ambient, since it should never be called. (It should be a guaranteed
// runtime error.)
export declare function unreachable(...values: never[]): never;

export function pushComment(context: Context, array: any[]): any {
  return function(type: string, value: string, start: number, end: number) {
    const comment: any = {
      type,
      value
    };

    if (context & Context.OptionsLoc) {
      comment.start = start;
      comment.end = end;
    }
    array.push(comment);
  };
}

export function pushToken(context: Context, array: any[]): any {
  return function(token: string, value: string, start: number, end: number) {
    const tokens: any = {
      token,
      value
    };

    if (context & Context.OptionsLoc) {
      tokens.start = start;
      tokens.end = end;
    }
    array.push(tokens);
  };
}

export function finishNode<T extends ESTree.Node>(context: Context, start: number, end: number, node: T): T {
  if (context & Context.OptionsRanges) {
    node.start = start;
    node.end = end;
  }

  return node;
}

export function optional(state: ParserState, context: Context, token: Token): boolean {
  if (state.token !== token) return false;
  next(state, context);
  return true;
}

export function expect(state: ParserState, context: Context, t: Token): void {
  if (state.token !== t) {
    report(state, Errors.Unexpected);
  }
  next(state, context);
}

/**
 * Automatic Semicolon Insertion
 *
 * @see [Link](https://tc39.github.io/ecma262/@sec-automatic-semicolon-insertion)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function consumeSemicolon(state: ParserState, context: Context): void | boolean {
  if ((state.token & Token.ASI) === Token.ASI) {
    optional(state, context, Token.Semicolon);
  } else if ((state.flags & Flags.NewLine) !== Flags.NewLine) {
    report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);
  }
}

/**
 * Insert scope bindings
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Parent scope
 * @param name Binding name
 * @param bindingType Binding type
 * @param checkDuplicates
 * @param isVariableDecl True if origin is a variable declaration
 */

export function addVariable(
  state: ParserState,
  context: Context,
  scope: any,
  bindingType: Type,
  checkDuplicates: boolean,
  isVariableDecl: boolean,
  key: string
) {
  if (scope === -1) return;
  if ((bindingType & Type.Variable) === Type.Variable) {
    let lex = scope.lex;
    while (lex) {
      const type = lex.type;
      if (lex['@' + key] !== undefined) {
        if (type === ScopeType.CatchClause) {
          if (isVariableDecl && (context & Context.OptionsDisableWebCompat) === 0) {
            state.inCatch = true;
          } else {
            report(state, Errors.InvalidCatchVarBinding, key);
          }
        } else if (type === ScopeType.ForStatement) {
          report(state, Errors.AlreadyDeclared);
        } else if (type !== ScopeType.ArgumentList) {
          if (checkForDuplicateLexicals(scope, '@' + key, context) === true) {
            report(state, Errors.AlreadyDeclared);
          }
        }
      }
      lex = lex['@'];
    }

    let x = scope.var['@' + key];
    if (x === undefined) x = 1;
    else ++x;
    scope.var['@' + key] = x;
    let lexVars = scope.lexVars;
    while (lexVars) {
      lexVars['@' + key] = true;
      lexVars = lexVars['@'];
    }
  } else {
    const lex = scope.lex;

    if (checkDuplicates) {
      checkIfExistInLexicalParentScope(state, context, scope, '@' + key);

      if (lex['@' + key] !== undefined) {
        if (checkForDuplicateLexicals(scope, '@' + key, context) === true) {
          report(state, Errors.AlreadyDeclared, key);
        }
      }
    }

    let x = lex['@' + key];

    if (x === undefined) x = 1;
    else if (checkDuplicates) {
      if (checkForDuplicateLexicals(scope, '@' + key, context) === true) {
        report(state, Errors.AlreadyDeclared, key);
      }
    } else ++x;

    lex['@' + key] = x;
  }
}

/**
 *
 * @param scope
 * @param key
 * @param context
 */

export function checkForDuplicateLexicals(scope: ScopeState, key: string, context: Context): boolean {
  if (context & Context.OptionsDisableWebCompat) return true;
  if ((scope.lex.funcs[key] === true) === false) return true;
  if (context & Context.Strict) return true;
  return false;
}

/**
 *
 * @param state
 * @param context
 * @param scope
 * @param skipParent
 */
export function checkIfExistInLexicalBindings(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  skipParent: any = false
) {
  const lex = scope.lex;
  for (const key in lex) {
    if (key[0] === '@' && key.length > 1) {
      if (lex[key] > 1) {
        return true;
      }
      if (!skipParent) checkIfExistInLexicalParentScope(state, context, scope, key);
    }
  }
  return false;
}

/**
 *
 * @param state
 * @param context
 * @param scope
 * @param key
 */
export function checkIfExistInLexicalParentScope(state: ParserState, context: Context, scope: ScopeState, key: any) {
  const lex = scope.lex;

  const lexParent = lex['@'];
  if (lexParent !== undefined) {
    if (lexParent.type === ScopeType.ArgumentList && lexParent[key] !== undefined) {
      report(state, Errors.AlreadyDeclared, key.slice(1));
    }

    if (lexParent.type === ScopeType.CatchClause && lexParent[key] !== undefined) {
      report(state, Errors.AlreadyDeclared, key.slice(1));
    }
  }

  if (scope.lexVars[key] !== undefined) {
    if (checkForDuplicateLexicals(scope, key, context) === true) {
      report(state, Errors.AlreadyDeclared, key.slice(1));
    }
  }
}

export function addFunctionName(state: any, context: Context, scope: any, bindingType: Type, isVariableDecl: boolean) {
  addVariable(state, context, scope, bindingType, true, isVariableDecl, state.tokenValue);
  if ((context & Context.OptionsDisableWebCompat) === 0 && !scope.lex.funcs['@' + state.tokenValue]) {
    scope.lex.funcs['@' + state.tokenValue] = true;
  }
}

/**
 *
 * @param state
 * @param lex
 * @param wereSimpleArgs
 */
export function checkFunctionsArgForDuplicate(state: ParserState, lex: any, wereSimpleArgs: boolean) {
  const w = wereSimpleArgs;
  for (const key in lex) {
    if (key[0] === '@' && key.length > 1 && lex[key] > 1) {
      report(state, Errors.AlreadyDeclared, key.slice(1));
    }
  }
}

/**
 * Does a lookahead and if the 'isLookaHead' is set to false or the result is true it will continue parsing
 * and never rewind the parser state
 *
 * @param state ParserState instance
 * @param callback Callback function to be called
 * @param isLookahead Boolean
 */
export function lookAheadOrScan<T>(
  state: ParserState,
  context: Context,
  callback: (state: ParserState, context: Context) => T,
  isLookahead: boolean
): T {
  const savedIndex = state.index;
  const savedLine = state.line;
  const savedColumn = state.column;
  const startIndex = state.startIndex;
  const savedFlags = state.flags;
  const savedTokenValue = state.tokenValue;
  const savedNextChar = state.currentChar;
  const savedToken = state.token;
  const savedTokenRegExp = state.tokenRegExp;
  const result = callback(state, context);

  if (!result || isLookahead) {
    state.index = savedIndex;
    state.line = savedLine;
    state.column = savedColumn;
    state.startIndex = startIndex;
    state.flags = savedFlags;
    state.tokenValue = savedTokenValue;
    state.currentChar = savedNextChar;
    state.token = savedToken;
    state.tokenRegExp = savedTokenRegExp;
  }

  return result;
}

/**
 * Returns true if this an valid lexical binding and not an identifier
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function isLexical(state: ParserState, context: Context): boolean {
  next(state, context);
  const { token } = state;
  return !!(
    (token & Token.Identifier) === Token.IsIdentifier ||
    (token & Token.Contextual) === Token.Contextual ||
    token === Token.LeftBrace ||
    token === Token.LeftBracket ||
    state.token === Token.YieldKeyword ||
    state.token === Token.AwaitKeyword ||
    token === Token.LetKeyword
  );
}

export function reinterpret(ast: any) {
  switch (ast.type) {
    case 'ArrayExpression':
      ast.type = 'ArrayPattern';
      const elements = ast.elements;
      for (let i = 0, n = elements.length; i < n; ++i) {
        const element = elements[i];
        if (element) reinterpret(element);
      }
      break;
    case 'ObjectExpression':
      ast.type = 'ObjectPattern';
      const properties = ast.properties;
      for (let i = 0, n = properties.length; i < n; ++i) {
        reinterpret(properties[i]);
      }
      break;
    case 'AssignmentExpression':
      ast.type = 'AssignmentPattern';
      delete ast.operator;
      reinterpret(ast.left);
      break;
    case 'Property':
      reinterpret(ast.value);
      break;
    case 'SpreadElement':
      ast.type = 'RestElement';
      reinterpret(ast.argument);
  }
}

export function nameIsArgumentsOrEval(value: string): boolean {
  return value === 'eval' || value === 'arguments';
}
/**
 * Returns true if this is an valid identifier
 *
 * @param context  Context masks
 * @param t  Token
 */
export function isValidIdentifier(context: Context, t: Token): boolean {
  if (context & Context.Strict) {
    if (context & Context.Module && t & Token.IsAwait) return false;
    if (t & Token.IsYield) return false;

    return (t & Token.IsIdentifier) === Token.IsIdentifier || (t & Token.Contextual) === Token.Contextual;
  }
  return (
    (t & Token.IsIdentifier) === Token.IsIdentifier ||
    (t & Token.Contextual) === Token.Contextual ||
    (t & Token.FutureReserved) === Token.FutureReserved
  );
}

export function validateBindingIdentifier(state: ParserState, context: Context, type: Type, token = state.token) {
  if (context & Context.Strict && token === Token.StaticKeyword) report(state, Errors.InvalidStrictStatic);

  if ((token & Token.FutureReserved) === Token.FutureReserved) {
    if (context & Context.Strict) report(state, Errors.Unexpected);
  }

  if ((token & Token.Reserved) === Token.Reserved) {
    report(state, Errors.InvalidStrictReservedWord);
  }
  if (context & (Context.AwaitContext | Context.Module) && token & Token.IsAwait) {
    report(state, Errors.AwaitOutsideAsync);
  }
  if (context & (Context.YieldContext | Context.Strict) && token & Token.IsYield) {
    report(state, Errors.DisallowedInContext);
  }

  if (token === Token.LetKeyword) {
    if (type & Type.ClassExprDecl) report(state, Errors.InvalidLetClassName);
    if (type & (Type.Let | Type.Const)) report(state, Errors.InvalidLetConstBinding);
    if (context & Context.Strict) report(state, Errors.InvalidStrictLet);
  }

  return true;
}

export function addToExportedNamesAndCheckForDuplicates(state: ParserState, exportedName: any) {
  if (state.exportedNames !== undefined && exportedName !== '') {
    const hashed: any = '@' + exportedName;
    if (state.exportedNames[hashed]) report(state, Errors.InvalidDuplicateExportedBinding, exportedName);
    state.exportedNames[hashed] = 1;
  }
}

export function addToExportedBindings(state: ParserState, exportedName: any) {
  if (state.exportedBindings !== undefined && exportedName !== '') {
    const hashed: any = '@' + exportedName;
    state.exportedBindings[hashed] = 1;
  }
}

export function nextTokenIsFuncKeywordOnSameLine(state: ParserState, context: Context): boolean {
  const line = state.line;
  next(state, context);
  return state.token === Token.FunctionKeyword && state.line === line;
}

/**
 * Returns true if start of an iteration statement
 *
 * @param parser Parser object
 */
function isIterationStatement(state: ParserState): boolean {
  return state.token === Token.WhileKeyword || state.token === Token.DoKeyword || state.token === Token.ForKeyword;
}

/**
 * Add label to the stack
 *
 * @param parser Parser object
 * @param label Label to be added
 */
export function addLabel(state: ParserState, label: string): void {
  if (state.labelSet === undefined) state.labelSet = {};
  state.labelSet[`@${label}`] = true;
  state.labelSetStack[state.labelDepth] = state.labelSet;
  state.iterationStack[state.labelDepth] = isIterationStatement(state);
  state.labelSet = undefined;
  state.labelDepth++;
}

/**
 * Add function
 *
 * @param parser Parser object
 * @param label Label to be added
 */
export function addCrossingBoundary(state: ParserState): void {
  state.labelSetStack[state.labelDepth] = state.functionBoundaryStack;
  state.iterationStack[state.labelDepth] = LabelState.Empty;
  state.labelDepth++;
}

/**
 * Validates continue statement
 *
 * @param parser Parser object
 * @param label Label
 */
export function validateContinueLabel(state: ParserState, label: string): void {
  const sstate = getLabel(state, `@${label}`, true);
  if ((sstate & LabelState.Iteration) !== LabelState.Iteration) {
    if (sstate & LabelState.CrossingBoundary) {
      report(state, Errors.Unexpected);
    } else {
      report(state, Errors.Unexpected);
    }
  }
}

/**
 * Validates break statement
 *
 * @param parser Parser object
 * @param label Label
 */
export function validateBreakStatement(state: ParserState, label: any): void {
  const lblstate = getLabel(state, `@${label}`);
  if ((lblstate & LabelState.Iteration) !== LabelState.Iteration) report(state, Errors.Unexpected);
}

/**
 * Add label
 *
 * @param parser Parser object
 * @param label Label to be added
 */
export function getLabel(
  state: ParserState,
  label: string,
  iterationStatement: boolean = false,
  crossBoundary: boolean = false
): LabelState {
  if (!iterationStatement && state.labelSet && state.labelSet[label] === true) {
    return LabelState.Iteration;
  }

  if (!state.labelSetStack) return LabelState.Empty;

  let stopAtTheBorder = false;
  for (let i = state.labelDepth - 1; i >= 0; i--) {
    const labelSet = state.labelSetStack[i];
    if (labelSet === state.functionBoundaryStack) {
      if (crossBoundary) {
        break;
      } else {
        stopAtTheBorder = true;
        continue;
      }
    }

    if (iterationStatement && state.iterationStack[i] === false) {
      continue;
    }

    if (labelSet[label] === true) {
      return stopAtTheBorder ? LabelState.CrossingBoundary : LabelState.Iteration;
    }
  }

  return LabelState.Empty;
}

/**
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 * @param type Binding type
 * @param isVariableDecl True if variable decl
 */
export function addVariableAndDeduplicate(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  isVariableDecl: boolean,
  name: string
): void {
  addVariable(state, context, scope, type, true, isVariableDecl, name);
  if ((context & Context.OptionsDisableWebCompat) === 0) {
    scope.lex.funcs['#' + state.tokenValue] = false;
  }
}

/**
 * Create a block scope
 */
export function createScope(type: ScopeType): ScopeState {
  return {
    var: {},
    lexVars: {},
    lex: {
      '@': undefined,
      type,
      funcs: {}
    }
  };
}

export function createSubScope(parent: ScopeState, type: ScopeType): ScopeState {
  return {
    var: parent.var,
    lexVars: {
      '@': parent.lexVars
    },
    lex: {
      '@': parent.lex,
      type,
      funcs: []
    }
  };
}

/**
 * Validates if the next token in the stream is a left paren or a period
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function nextTokenIsLeftParenOrPeriod(state: ParserState, context: Context): boolean {
  next(state, context);
  return state.token === Token.LeftParen || state.token === Token.Period;
}

/**
 * Validates if the next token in the stream is left parenthesis.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function nextTokenIsLeftParen(parser: ParserState, context: Context): boolean {
  next(parser, context);
  return parser.token === Token.LeftParen;
}

/**
 * Bit fiddle current grammar state and keep track of the state during the parse and restore
 * it back to original state after finish parsing or throw.
 *
 * Ideas for this is basicly from V8 and SM, but also the Esprima parser does this in a similar way.
 *
 * However this implementation is an major improvement over similiar implementations, and
 * does not require additonal bitmasks to be set / unset during the parsing outside this function.
 *
 * @param parser Parser object
 * @param context Context mask
 * @param callback Callback function
 * @param errMsg Optional error message
 */
//RecordExpressionError
export function secludeGrammar<T>(
  state: ParserState,
  context: Context,
  minprec: number = 0,
  callback: (state: ParserState, context: Context, precedence: number) => T
): T {
  const { assignable, bindable, pendingCoverInitializeError } = state;

  state.bindable = true;
  state.assignable = true;
  state.pendingCoverInitializeError = null;

  const result = callback(state, context, minprec);
  if (state.pendingCoverInitializeError !== null) {
    report(state, state.pendingCoverInitializeError);
  }

  state.bindable = bindable;
  state.assignable = assignable;
  state.pendingCoverInitializeError = pendingCoverInitializeError;

  return result;
}

/**
 * Restore current grammar to previous state, or unset necessary bitmasks
 *
 * @param parser Parser state
 * @param context Context mask
 * @param callback Callback function
 */
export function acquireGrammar<T>(
  state: ParserState,
  context: Context,
  minprec: number,
  callback: (state: ParserState, context: Context, precedence: number) => T
): T {
  const { assignable, bindable, pendingCoverInitializeError } = state;

  state.bindable = true;
  state.assignable = true;
  state.pendingCoverInitializeError = null;

  const result = callback(state, context, minprec);

  state.bindable = state.bindable && bindable;
  state.assignable = state.assignable && assignable;
  state.pendingCoverInitializeError = pendingCoverInitializeError || state.pendingCoverInitializeError;

  return result;
}

/**
 * Returns true if this an valid simple assignment target
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function isValidSimpleAssignmentTarget(node: ESTree.Node): boolean {
  return node.type === 'Identifier' || node.type === 'MemberExpression' ? true : false;
}
