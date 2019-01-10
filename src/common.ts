import * as ESTree from './estree';
import { Token } from './token';
import { next } from './scanner';
import { Errors, report } from './errors';
import { ScopeType, ScopeState } from 'scope';
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

  Strict = 1 << 10,
  Module = 1 << 11,

  TopLevel = 1 << 12,

  DisallowIn = 1 << 13,
  ExpressionStart = 1 << 15,
  TaggedTemplate = 1 << 16,
  SuperProperty = 1 << 18,
  SuperCall = 1 << 10,

  InGlobal = 1 << 20,
  InGenerator = 1 << 21,
  InAsync = 1 << 22,
  InArguments = 1 << 23,
  InConstructor = 1 << 24,
  InMethod = 1 << 25,

  NewTarget = 1 << 26,
  InFunctionBody = 1 << 27,
  Statement = 1 << 30
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
  Binary = 1 << 4
}
// prettier-ignore
/**
 * The binding type masks, passed around as a simple immutable bit set
 */
// prettier-ignore
export const enum Type {
  None = 0,
  Arguments = 1 << 0,
  Variable = 1 << 1,
  Let = 1 << 2, // Lexical
  Const = 1 << 3, // Lexical
  Class = 1 << 4
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
  FunctionArgs = 1 << 5,
  Class = 1 << 6
}

/**
 * The type of the `onComment` option.
 */
export type OnComment = void | ESTree.Comment[] | ((type: string, value: string, start?: number, end?: number) => any);
export type OnToken = void | Token[] | ((token: Token, start?: number, end?: number) => any);

/**
 * The parser interface.
 */
export interface ParserState {
  source: string;
  onComment: any;
  onToken: any;
  flags: Flags;
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
  exportedNames: any[];
  exportedBindings: any[];
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };
}

/**
 * A simple `unimplemented` helper.
 */
export function unimplemented(): never {
  throw new Error('unimplemented');
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

export function expect(state: ParserState, context: Context, t: Token): boolean {
  if (state.token !== t) {
    report(state, Errors.Unexpected);
    return false;
  }
  next(state, context);
  return true;
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
  return (state.token & Token.ASI) === Token.ASI || state.flags & Flags.NewLine
    ? optional(state, context, Token.Semicolon)
    : report(state, Errors.Unexpected);
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
  return (
    (state.token & (Token.Identifier | Token.Contextual | Token.IsAwait | Token.IsYield)) > 0 ||
    state.token === Token.LeftBrace ||
    state.token === Token.LeftBracket
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

// TODO! Convert to bitmasks soon as we know it works as expected
export function validateBindingIdentifier(state: ParserState, context: Context, type: Type, token = state.token) {
  switch (token) {
    case Token.BreakKeyword:
    case Token.CaseKeyword:
    case Token.CatchKeyword:
    case Token.ClassKeyword:
    case Token.ConstKeyword:
    case Token.ContinueKeyword:
    case Token.DebuggerKeyword:
    case Token.DefaultKeyword:
    case Token.DeleteKeyword:
    case Token.DoKeyword:
    case Token.ElseKeyword:
    case Token.ExportKeyword:
    case Token.ExtendsKeyword:
    case Token.FinallyKeyword:
    case Token.ForKeyword:
    case Token.FunctionKeyword:
    case Token.IfKeyword:
    case Token.ImportKeyword:
    case Token.InKeyword:
    case Token.InstanceofKeyword:
    case Token.NewKeyword:
    case Token.ReturnKeyword:
    case Token.SuperKeyword:
    case Token.SwitchKeyword:
    case Token.ThisKeyword:
    case Token.ThrowKeyword:
    case Token.TryKeyword:
    case Token.TypeofKeyword:
    case Token.VarKeyword:
    case Token.VoidKeyword:
    case Token.WhileKeyword:
    case Token.WithKeyword:
    case Token.NullKeyword:
    case Token.TrueKeyword:
    case Token.FalseKeyword:
    case Token.EnumKeyword:
      report(state, Errors.Unexpected);
    case Token.LetKeyword:
      if (type === Type.Class) report(state, Errors.Unexpected);
      if (type === Type.Let || type === Type.Const) report(state, Errors.Unexpected);
      if (context & Context.Strict) report(state, Errors.Unexpected);
      return true;
    case Token.StaticKeyword:
      if (context & Context.Strict) report(state, Errors.Unexpected);
      return true;

      // case Token.Eval:
      // case Token.Arguments:
      if (context & Context.Strict) report(state, Errors.Unexpected);
      return true;
    case Token.ImplementsKeyword:
    case Token.PackageKeyword:
    case Token.ProtectedKeyword:
    case Token.InterfaceKeyword:
    case Token.PrivateKeyword:
    case Token.PublicKeyword:
      if (context & Context.Strict) report(state, Errors.Unexpected);
      return true;
    case Token.AwaitKeyword:
      if (context & (Context.InAsync | Context.Module)) report(state, Errors.Unexpected);
      return true;
    case Token.YieldKeyword:
      if (context & (Context.InGenerator | Context.Strict)) report(state, Errors.Unexpected);
      return true;
    default:
      // Valid binding name
      return true;
  }
}
