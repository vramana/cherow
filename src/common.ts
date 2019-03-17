import * as ESTree from './estree';
import { Token, KeywordDescTable } from './token';
import { scanSingleToken } from './scanner';
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
  OptionsWebCompat = 1 << 4,
  OptionsLoc = 1 << 5,
  OptionsGlobalReturn = 1 << 6,
  OptionsExperimental = 1 << 7,
  OptionsNative = 1 << 8,
  RequireIdentifier = 1 << 9,

  Strict = 1 << 10,
  Module = 1 << 11,

  TopLevel = 1 << 12,

  DisallowInContext = 1 << 13,
  AllowPossibleRegEx = 1 << 15,
  TaggedTemplate = 1 << 16,
  OptionsDirectives = 1 << 17,
  SuperProperty = 1 << 18,

  SuperCall = 1 << 19,
  ParentheziedContext = 1 << 20,
  YieldContext = 1 << 21,
  AwaitContext = 1 << 22,
  InArgList = 1 << 23,
  InConstructor = 1 << 24,
  InMethod = 1 << 25,
  AllowNewTarget = 1 << 26,
  InGlobal = 1 << 27,
  OptionsGlobalAwait = 1 << 28,
  OptionsParenthesized = 1 << 29,
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
  HasConstructor = 1 << 11,
  SeenAwait  = 1 << 12,
  SeenYield   = 1 << 13,
  ContainsSeparator = 1 << 14
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
  ExportDefault = 1 << 3,
  CatchClause = 1 << 4,
  AsyncArgs = 1 << 5,
  ArgList = 1 << 6,
  ClassExprDecl = 1 << 7,
  Declaration = 1 << 8,
  AsyncArrow = 1 << 9,
  Arrow = 1 << 10,
  AsyncFunction = 1 << 11,
  ArrayLiteral = 1 << 12,
  ObjectExpression = 1 << 13,
}

export const enum ScopeType {
  None = 0,
  BlockStatement = 1,
  ForStatement = 2,
  SwitchStatement = 3,
  CatchClause = 4,
  ArgumentList = 5
}

export const enum Modifiers {
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
  Extends = 1 << 10,
  GetSet = Getter | Setter
}

export const enum Arrows {
  None = 0,
  ConciseBody = 1 << 0,
  Plain = 1 << 1,
  Async = 1 << 2,
  Parenthesized = Plain | Async
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

export const enum ParenthesizedState {
  None = 0,
  ReservedWords = 1 << 0,
  Yield = 1 << 1,
  Await = 1 << 2,
  SequenceExpression = 1 << 3,
  Arrow = 1 << 4
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
  endIndex: number;
  endColumn: number;
  endLine: number;
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

export function convertTokenType(t: Token): string {
  switch (t) {
    case Token.NumericLiteral:
      return 'NumericLiteral';
    case Token.StringLiteral:
      return 'StringLiteral';
    case Token.RegularExpression:
      return 'RegularExpressionLiteral';
    case Token.FalseKeyword:
    case Token.TrueKeyword:
      return 'BooleanLiteral';
    case Token.NullKeyword:
      return 'NullLiteral';
    case Token.RegularExpression:
      return 'RegularExpression';
    case Token.TemplateCont:
    case Token.TemplateTail:
      return 'TemplateLiteral';
    default:
      if ((t & Token.IsIdentifier) === Token.IsIdentifier) return 'Identifier';
      if ((t & Token.Keyword) === Token.Keyword) return 'Keyword';

      return 'Punctuator';
  }
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

export function finishNode<T extends ESTree.Node>(
  state: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number,
  node: T
): T {
  if (context & Context.OptionsRanges) {
    node.start = start;
    node.end = state.endIndex;
  }

  if (context & Context.OptionsLoc) {
    node.loc = {
      start: { line, column },
      end: { line: state.endLine, column: state.endColumn }
    };
  }

  return node;
}

export function optional(state: ParserState, context: Context, t: Token): boolean {
  if (state.token === t) {
    scanSingleToken(state, context);
    return true;
  }
  return false;
}

export function optionalBit(state: ParserState, context: Context, t: Token): 0 | 1 {
  if (state.token === t) {
    scanSingleToken(state, context);
    return 1;
  }
  return 0;
}

export function expect(state: ParserState, context: Context, t: Token): void {
  if (state.token === t) {
    scanSingleToken(state, context);
  } else {
    report(
      state,
      t === Token.EscapedKeyword || t === Token.EscapedStrictReserved ? Errors.InvalidEscapedKeyword : Errors.Expected,
      KeywordDescTable[t & Token.Type]
    );
  }
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
 * Use the given 'tokenValue' and insert scope bindings
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Parent scope
 * @param name Binding name
 * @param bindingType Binding type
 * @param origin Binding origin
 * @param checkDuplicates
 * @param isVarDecl True if origin is a variable declaration
 */

export function recordTokenValue(
  state: ParserState,
  context: Context,
  scope: any,
  type: Type,
  origin: Origin,
  checkDuplicates: 0 | 1,
  isVarDecl: boolean,
  key: string
) {
  if (scope === -1) return;
  if (type & Type.Variable) {
    let lex = scope.lex;
    while (lex) {
      const scopeType = lex.type;
      if (lex['@' + key] !== undefined) {
        if (scopeType === ScopeType.CatchClause) {
          if (isVarDecl && context & Context.OptionsWebCompat) {
          } else {
            report(state, Errors.InvalidCatchVarBinding, key);
          }
        } else if (scopeType === ScopeType.ForStatement) {
          report(state, Errors.AlreadyBoundAsLexical);
        } else if (scopeType !== ScopeType.ArgumentList) {
          if (checkIfAlreadyBound(scope, '@' + key, context, origin) === true) {
            report(state, Errors.AlreadyBoundAsLexical, key);
          }
        }
      }
      lex = lex['@'];
    }

    let x = scope.var['@' + key];

    if (x === undefined) {
      x = 1;
    } else {
      ++x;
    }

    scope.var['@' + key] = x;
    let lexVars = scope.lexVars;
    while (lexVars) {
      lexVars['@' + key] = true;
      lexVars = lexVars['@'];
    }
  } else {
    const lex = scope.lex;
    if (checkDuplicates === 1) {
      checkIfExistInParentScope(state, context, scope, origin, '@' + key);
      if (lex['@' + key] !== undefined) {
        if (checkIfAlreadyBound(scope, '@' + key, context, origin) === true) {
          report(state, Errors.AlreadyDeclared, key);
        }
      }
    }

    let x = lex['@' + key];

    if (x === undefined) {
      x = 1;
    } else {
      ++x;
    }

    lex['@' + key] = x;
  }
}

/**
 *
 * @param scope
 * @param key
 * @param context
 */

export function checkIfAlreadyBound(scope: ScopeState, key: string, context: Context, origin: Origin): boolean {
  return context & Context.Strict
    ? true
    : (context & Context.OptionsWebCompat) === 0
    ? true
    : origin & Origin.AsyncFunction
    ? true
    : (scope.lex.funcs[key] === true) === false
    ? true
    : false;
}

/**
 *
 * @param state
 * @param context
 * @param scope
 * @param skipParent
 */
export function checkIfLexicalAlreadyBound(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  skipParent: any
) {
  const lex = scope.lex;
  for (const key in lex) {
    if (key[0] === '@' && key.length > 1) {
      if (lex[key] > 1) return true;
      if (!skipParent) checkIfExistInParentScope(state, context, scope, origin, key);
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
export function checkIfExistInParentScope(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  key: string
): void {
  const lex = scope.lex;

  const lexParent = lex['@'];
  if (lexParent !== undefined && lexParent[key] !== undefined) {
    if (lexParent.type === ScopeType.ArgumentList) {
      report(state, Errors.BoundLexicalAsParam);
    } else if (lexParent.type === ScopeType.CatchClause) {
      report(state, Errors.DoubleDeclBinding);
    }
  }

  if (scope.lexVars[key] !== undefined) {
    if (checkIfAlreadyBound(scope, key, context, origin) === true) {
      report(state, Errors.AlreadyDeclared, key.slice(1));
    }
  }
}

export function addFunctionName(
  state: any,
  context: Context,
  scope: any,
  type: Type,
  origin: Origin,
  isVarDecl: boolean
) {
  recordTokenValue(state, context, scope, type, origin, 1, isVarDecl, state.tokenValue);
  if (context & Context.OptionsWebCompat && !scope.lex.funcs['@' + state.tokenValue]) {
    scope.lex.funcs['@' + state.tokenValue] = true;
  }
}

/**
 * Validate function argument list for possible duplicates
 *
 * @param state Parser object
 * @param arg Argument list
 */
export function validateFunctionArgs(state: ParserState, arg: any, isSimple: boolean): void {
  for (const key in arg) {
    if (key[0] === '@' && key.length > 1 && arg[key] > 1) {
      report(state, isSimple ? Errors.IllegalBoundNonSimple : Errors.IllegalBound, key.slice(1));
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
  const {
    index,
    line,
    column,
    startIndex,
    endIndex,
    flags,
    tokenValue,
    currentChar,
    token,
    tokenRegExp,
    tokenRaw
  } = state;
  const result = callback(state, context);

  if (!result || isLookahead) {
    state.index = index;
    state.line = line;
    state.column = column;
    state.startIndex = startIndex;
    state.endIndex = endIndex;
    state.flags = flags;
    state.tokenValue = tokenValue;
    state.currentChar = currentChar;
    state.tokenRaw = tokenRaw;
    state.token = token;
    state.tokenRegExp = tokenRegExp;
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
  scanSingleToken(state, context);
  const { token } = state;
  return !!(
    (token & Token.Identifier) === Token.IsIdentifier ||
    (token & Token.Contextual) === Token.Contextual ||
    token === Token.LeftBrace ||
    token === Token.LeftBracket ||
    state.token & Token.IsYield ||
    state.token & Token.IsAwait ||
    token === Token.LetKeyword
  );
}

export function reinterpret(state: ParserState, ast: any) {
  switch (ast.type) {
    case 'ArrayExpression':
      ast.type = 'ArrayPattern';
      const elements = ast.elements;
      for (let i = 0, n = elements.length; i < n; ++i) {
        const element = elements[i];
        if (element) reinterpret(state, element);
      }
      break;
    case 'ObjectExpression':
      ast.type = 'ObjectPattern';
      const properties = ast.properties;
      for (let i = 0, n = properties.length; i < n; ++i) {
        reinterpret(state, properties[i]);
      }
      break;
    case 'AssignmentExpression':
      ast.type = 'AssignmentPattern';
      if (ast.operator !== '=') report(state, Errors.Unexpected);
      delete ast.operator;
      reinterpret(state, ast.left);
      break;
    case 'Property':
      reinterpret(state, ast.value);
      break;
    case 'SpreadElement':
      ast.type = 'RestElement';
      reinterpret(state, ast.argument);
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
  if (context & Context.Strict) {
    if (token === Token.StaticKeyword) report(state, Errors.InvalidStrictStatic);
    if (token === Token.EscapedStrictReserved) {
      report(state, Errors.InvalidEscapedKeyword);
    }
    if ((token & Token.FutureReserved) === Token.FutureReserved) {
      report(state, Errors.FutureReservedWordInStrictModeNotId);
    }
  }

  // (fkleuver): Investigate why this doesn't trigger an error
  if (token === Token.EnumKeyword) report(state, Errors.FutureReservedWordInStrictModeNotId);

  if (token & Token.IsAwait) {
    if (context & (Context.AwaitContext | Context.Module)) report(state, Errors.AwaitOutsideAsync);
    state.flags = state.flags | Flags.SeenAwait;
  }

  if (token & Token.IsYield) {
    if (context & (Context.YieldContext | Context.Strict)) report(state, Errors.DisallowedInContext, 'yield');
    state.flags = state.flags | Flags.SeenYield;
  }

  if (token === Token.LetKeyword) {
    if (type & Type.ClassExprDecl) report(state, Errors.InvalidLetClassName);
    if (type & (Type.Let | Type.Const)) report(state, Errors.InvalidLetConstBinding);
    if (context & Context.Strict) report(state, Errors.InvalidStrictLet);
  }

  if (token === Token.EscapedKeyword) {
    report(state, Errors.InvalidEscapedKeyword);
  }

  if ((token & Token.Reserved) === Token.Reserved) {
    report(state, Errors.KeywordNotId);
  }

  return true;
}

export function addToExportedNamesAndCheckDuplicates(state: ParserState, exportedName: any) {
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
  scanSingleToken(state, context);
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
      report(state, Errors.InvalidNestedStatement, 'continue');
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
  if ((getLabel(state, `@${label}`) & LabelState.Iteration) !== LabelState.Iteration)
    report(state, Errors.InvalidNestedStatement);
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
 * @param isVarDecl True if variable decl
 */
export function recordTokenValueAndDeduplicate(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  isVarDecl: boolean,
  name: string
): void {
  recordTokenValue(state, context, scope, type, origin, 1, isVarDecl, name);
  if (context & Context.OptionsWebCompat) {
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
  scanSingleToken(state, context);
  return state.token === Token.LeftParen || state.token === Token.Period;
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

export function secludeGrammarWithLocation<T>(
  state: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number,
  callback: (state: ParserState, context: Context, start: number, line: number, column: number) => T
): T {
  const { assignable, bindable, pendingCoverInitializeError } = state;

  state.bindable = true;
  state.assignable = true;
  state.pendingCoverInitializeError = null;

  const result = callback(state, context, start, line, column);
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
