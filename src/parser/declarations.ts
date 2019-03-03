import * as ESTree from '../estree';
import {
  Context,
  ParserState,
  consumeSemicolon,
  Type,
  Origin,
  validateBindingIdentifier,
  addToExportedNamesAndCheckDuplicates,
  addToExportedBindings,
  recordTokenValueAndDeduplicate,
  ScopeState,
  ScopeType,
  createSubScope,
  createScope,
  Modifiers,
  secludeGrammar,
  secludeGrammarWithLocation,
  finishNode
} from '../common';
import { Token, KeywordDescTable } from '../token';
import { scanSingleToken } from '../scanner';
import { optional, checkIfLexicalAlreadyBound, addFunctionName } from '../common';
import { report, Errors } from '../errors';
import {
  parseAssignmentExpression,
  parseIdentifier,
  parseLeftHandSideExpression,
  parseClassBodyAndElementList,
  parseFormalParameters,
  parseFunctionBody
} from './expression';
import { parseBindingIdentifierOrPattern } from './pattern';

/**
 * Parse class declaration
 *
 * @param parser Parser object
 * @param context Context masks
 * @param scope Scope object
 */
export function parseClassDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ESTree.ClassDeclaration {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  scanSingleToken(state, context);
  // class bodies are implicitly strict
  context = (context | Context.Strict | Context.InConstructor) ^ Context.InConstructor;

  let id: ESTree.Identifier | null = null;
  let superClass: ESTree.Expression | null = null;
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    validateBindingIdentifier(state, context | Context.Strict, Type.ClassExprDecl);
    recordTokenValueAndDeduplicate(state, context, scope, Type.Let, Origin.None, true, state.tokenValue);
    id = parseIdentifier(state, context);
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.DeclNoName, 'Class');

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = secludeGrammarWithLocation(state, context, start, line, column, parseLeftHandSideExpression);
    context |= Context.SuperCall;
  } else context = (context | Context.SuperCall) ^ Context.SuperCall;

  const body = parseClassBodyAndElementList(state, context | Context.Strict, Origin.Declaration);

  return finishNode(state, context, start, line, column, {
    type: 'ClassDeclaration',
    id,
    superClass,
    body
  });
}

/**
 * Parses function instance
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseFunctionDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  isAsync: boolean
): ESTree.FunctionDeclaration {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  scanSingleToken(state, context);

  const isGenerator: boolean = (origin & Origin.Statement) < 1 && optional(state, context, Token.Multiply);

  // Create a new function scope
  let funcScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let firstRestricted: string | undefined;

  if (state.token & Token.IsIdentifier || state.token === Token.EscapedStrictReserved) {
    validateBindingIdentifier(
      state,
      ((context | (Context.YieldContext | Context.AwaitContext)) ^ (Context.YieldContext | Context.AwaitContext)) |
        (context & Context.Strict ? Context.YieldContext : context & Context.YieldContext ? Context.YieldContext : 0) |
        (context & Context.Module ? Context.AwaitContext : context & Context.AwaitContext ? Context.AwaitContext : 0),
      context & Context.TopLevel && (context & Context.Module) < 1 ? Type.Variable : Type.Let
    );

    if (origin & Origin.Statement) {
      scope = createSubScope(scope, ScopeType.BlockStatement);
    }

    addFunctionName(
      state,
      context,
      scope,
      context & Context.TopLevel && (context & Context.Module) < 1 ? Type.Variable : Type.Let,
      origin,
      true
    );

    funcScope = createSubScope(funcScope, ScopeType.BlockStatement);
    firstRestricted = state.tokenValue;
    id = parseIdentifier(state, context);
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.DeclNoName, 'Function');

  context =
    ((context |
      Context.AwaitContext |
      Context.YieldContext |
      Context.InArgList |
      Context.SuperProperty |
      Context.SuperCall |
      Context.InConstructor) ^
      (Context.AwaitContext |
        Context.YieldContext |
        Context.InArgList |
        Context.SuperProperty |
        Context.SuperCall |
        Context.InConstructor)) |
    (isAsync ? Context.AwaitContext : 0) |
    (isGenerator ? Context.YieldContext : 0) |
    Context.AllowNewTarget;

  // Create a argument scope
  const paramScoop = createSubScope(funcScope, ScopeType.ArgumentList);
  const params = parseFormalParameters(state, context, paramScoop, Origin.ArgList, Modifiers.None);

  const body = parseFunctionBody(
    state,
    context,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted,
    origin
  );

  return finishNode(state, context, start, line, column, {
    type: 'FunctionDeclaration',
    params,
    body,
    async: (context & Context.AwaitContext) > 0,
    generator: isGenerator,
    id
  } as any);
}

export function parseHostedClassDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  isNotDefault: boolean
): ESTree.ClassDeclaration {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  scanSingleToken(state, context);
  context = (context | Context.Strict | Context.InConstructor) ^ (Context.Strict | Context.InConstructor);

  let id: ESTree.Identifier | null = null;
  let superClass: ESTree.Expression | null = null;
  let name = '';
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    name = state.tokenValue;
    validateBindingIdentifier(state, context, Type.ClassExprDecl);
    recordTokenValueAndDeduplicate(state, context, scope, Type.Let, Origin.None, true, name);
    id = parseIdentifier(state, context);
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.DeclNoName, 'Class');

  if (isNotDefault) addToExportedNamesAndCheckDuplicates(state, name);
  addToExportedBindings(state, name);

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = secludeGrammarWithLocation(state, context, start, line, column, parseLeftHandSideExpression);
    context |= Context.SuperCall;
  } else context = (context | Context.SuperCall) ^ Context.SuperCall;

  context |= Context.SuperProperty;

  const body = parseClassBodyAndElementList(state, context, Origin.Declaration);

  return finishNode(state, context, start, line, column, {
    type: 'ClassDeclaration',
    id,
    superClass,
    body
  });
}

export function parseHoistableFunctionDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  isAsync: boolean
): ESTree.FunctionDeclaration {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  scanSingleToken(state, context);

  const isGenerator: boolean = optional(state, context, Token.Multiply);

  // Create a new function scope
  let funcScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let name: string = '';

  if (state.token & Token.IsIdentifier) {
    name = state.tokenValue;
    validateBindingIdentifier(state, context, Type.Let);
    addFunctionName(state, context, scope, Type.Let, Origin.None, true);
    funcScope = createSubScope(funcScope, ScopeType.BlockStatement);
    id = parseIdentifier(state, context);
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.DeclNoName, 'Function');

  if ((origin & Origin.ExportDefault) === 0) addToExportedNamesAndCheckDuplicates(state, name);
  addToExportedBindings(state, name);

  context =
    ((context | Context.AwaitContext | Context.YieldContext | Context.InArgList | Context.SuperProperty) ^
      (Context.AwaitContext | Context.YieldContext | Context.InArgList | Context.SuperProperty)) |
    (isAsync ? Context.AwaitContext : 0) |
    (isGenerator ? Context.YieldContext : 0) |
    Context.AllowNewTarget;

  // Create a argument scope
  const paramScoop = createSubScope(funcScope, ScopeType.ArgumentList);
  const params = parseFormalParameters(state, context, paramScoop, Origin.ArgList, Modifiers.None);

  const body = parseFunctionBody(
    state,
    context,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    undefined,
    Origin.None
  );

  return finishNode(state, context, start, line, column, {
    type: 'FunctionDeclaration',
    params,
    body,
    async: (context & Context.AwaitContext) > 0,
    generator: isGenerator,
    id
  } as any);
}

/**
 * Parses lexical declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param state Parser object
 * @param context Context masks
 * @param type Binding type
 * @param origin Binding origin
 * @param scope Scope instance
 */
export function parseLexicalDeclaration(
  state: ParserState,
  context: Context,
  type: Type,
  origin: Origin,
  scope: ScopeState
): ESTree.VariableDeclaration {
  const { token, startIndex: start, startLine: line, startColumn: column } = state;
  scanSingleToken(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
  if (checkIfLexicalAlreadyBound(state, context, scope, origin, false)) {
    report(state, Errors.DuplicateBinding, KeywordDescTable[token & Token.Type]);
  }
  consumeSemicolon(state, context);
  return finishNode(state, context, start, line, column, {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[token & Token.Type] as 'var' | 'let' | 'const',
    declarations
  });
}

/*
 * Parses variable declaration list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclarationList)
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param type Binding type
 * @param origin Binding origin
 * @param checkDuplicates True if need to check for duplicates in scope
 * @param scope Scope instance
 */
export function parseVariableDeclarationList(
  state: ParserState,
  context: Context,
  type: Type,
  origin: Origin,
  checkDuplicates: boolean,
  scope: ScopeState
): ESTree.VariableDeclarator[] {
  let bindingCount = 1;
  const list: ESTree.VariableDeclarator[] = [
    parseVariableDeclaration(state, context, type, origin, checkDuplicates, scope)
  ];
  while (optional(state, context, Token.Comma)) {
    list.push(parseVariableDeclaration(state, context, type, origin, checkDuplicates, scope));
    ++bindingCount;
  }

  if (origin & Origin.ForStatement && isInOrOf(state) && bindingCount > 1) {
    report(state, Errors.ForInOfLoopMultiBindings, KeywordDescTable[state.token & Token.Type]);
  }
  return list;
}

export function isInOrOf(state: ParserState): boolean {
  return state.token === Token.InKeyword || state.token === Token.OfKeyword;
}
/**
 * VariableDeclaration :
 *   BindingIdentifier Initializeropt
 *   BindingPattern Initializer
 *
 * VariableDeclarationNoIn :
 *   BindingIdentifier InitializerNoInopt
 *   BindingPattern InitializerNoIn
 *
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseVariableDeclaration(
  state: ParserState,
  context: Context,
  type: Type,
  origin: Origin,
  checkDuplicates: boolean,
  scope: ScopeState
): ESTree.VariableDeclarator {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  const isBinding = state.token === Token.LeftBrace || state.token === Token.LeftBracket;
  const id = parseBindingIdentifierOrPattern(state, context, scope, type, origin, checkDuplicates);

  let init: any = null;

  if (optional(state, context | Context.AllowPossibleRegEx, Token.Assign)) {
    init = secludeGrammar(state, context, 0, parseAssignmentExpression);
    if (origin & Origin.ForStatement || isBinding) {
      // https://github.com/tc39/test262/blob/master/test/annexB/language/statements/for-in/strict-initializer.js
      if (state.token === Token.InKeyword) {
        if (
          isBinding ||
          ((type & Type.Variable) < 1 || ((context & Context.OptionsWebCompat) === 0 || context & Context.Strict))
        ) {
          report(state, Errors.ForInOfLoopInitializer);
        }
      } else if (state.token === Token.OfKeyword) report(state, Errors.ForInOfLoopInitializer);
    }
  } else if ((type & Type.Const || isBinding) && !isInOrOf(state)) {
    report(state, Errors.DeclarationMissingInitializer, type & Type.Const ? 'const' : 'destructuring');
  }

  return finishNode(state, context, start, line, column, {
    type: 'VariableDeclarator',
    init,
    id
  } as any);
}
