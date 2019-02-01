import * as ESTree from '../estree';
import {
  Context,
  ParserState,
  consumeSemicolon,
  Type,
  Origin,
  validateBindingIdentifier,
  addToExportedNamesAndCheckForDuplicates,
  addToExportedBindings,
  addVariableAndDeduplicate,
  ScopeState,
  ScopeType,
  createSubScope,
  createScope,
  Modifiers,
  secludeGrammar,
  finishNode
} from '../common';
import { Token, KeywordDescTable } from '../token';
import { scanSingleToken } from '../scanner';
import { optional, checkIfExistInLexicalBindings, addFunctionName } from '../common';
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
  const { startIndex: start } = state;
  scanSingleToken(state, context);
  // class bodies are implicitly strict
  context = (context | Context.Strict | Context.InConstructor) ^ Context.InConstructor;

  let id: ESTree.Expression | null = null;
  let superClass: ESTree.Expression | null = null;
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    validateBindingIdentifier(state, context | Context.Strict, Type.ClassExprDecl);
    addVariableAndDeduplicate(state, context, scope, Type.Let, Origin.None, true, state.tokenValue);
    id = parseIdentifier(state, context);
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.DeclNoName, 'Class');

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = secludeGrammar(state, context, 0, parseLeftHandSideExpression);
    context |= Context.SuperCall;
  } else context = (context | Context.SuperCall) ^ Context.SuperCall;

  context |= Context.SuperProperty;

  const body = parseClassBodyAndElementList(state, context | Context.Strict, Origin.Declaration);

  return finishNode(state, context, start, {
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
) {
  const { startIndex: start } = state;
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
    (context |
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
      Context.InConstructor);

  if (isAsync) context |= Context.AwaitContext;
  if (isGenerator) context |= Context.YieldContext;

  // Create a argument scope
  const paramScoop = createSubScope(funcScope, ScopeType.ArgumentList);
  const params = parseFormalParameters(
    state,
    context | Context.AllowNewTarget,
    paramScoop,
    Origin.ArgList,
    Modifiers.None
  );

  const body = parseFunctionBody(
    state,
    context | Context.AllowNewTarget,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted,
    origin
  );

  return finishNode(state, context, start, {
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
  const { startIndex: start } = state;
  scanSingleToken(state, context);
  context = (context | Context.Strict | Context.InConstructor) ^ (Context.Strict | Context.InConstructor);

  let id: ESTree.Expression | null = null;
  let superClass: ESTree.Expression | null = null;
  let name = '';
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    name = state.tokenValue;
    validateBindingIdentifier(state, context, Type.ClassExprDecl);
    addVariableAndDeduplicate(state, context, scope, Type.Let, Origin.None, true, name);
    id = parseIdentifier(state, context);
  }

  if (isNotDefault) addToExportedNamesAndCheckForDuplicates(state, name);
  addToExportedBindings(state, name);

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = parseLeftHandSideExpression(state, context, start);
    context |= Context.SuperCall;
  } else context = (context | Context.SuperCall) ^ Context.SuperCall;

  context |= Context.SuperProperty;

  const body = parseClassBodyAndElementList(state, context, Origin.Declaration);

  return finishNode(state, context, start, {
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
  isNotDefault: boolean,
  isAsync: boolean
) {
  const { startIndex: start } = state;
  scanSingleToken(state, context);

  const isGenerator: boolean = optional(state, context, Token.Multiply);

  // Create a new function scope
  let funcScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let name: string = '';

  if (state.token & Token.IsIdentifier || state.token === Token.EscapedStrictReserved) {
    name = state.tokenValue;
    validateBindingIdentifier(state, context, Type.Let);
    addFunctionName(state, context, scope, Type.Let, Origin.None, true);
    funcScope = createSubScope(funcScope, ScopeType.BlockStatement);
    id = parseIdentifier(state, context);
  }

  if (isNotDefault) addToExportedNamesAndCheckForDuplicates(state, name);
  addToExportedBindings(state, name);

  context =
    (context | Context.AwaitContext | Context.YieldContext | Context.InArgList | Context.SuperProperty) ^
    (Context.AwaitContext | Context.YieldContext | Context.InArgList | Context.SuperProperty);

  if (isAsync) context |= Context.AwaitContext;
  if (isGenerator) context |= Context.YieldContext;

  // Create a argument scope
  const paramScoop = createSubScope(funcScope, ScopeType.ArgumentList);
  const params = parseFormalParameters(
    state,
    context | Context.AllowNewTarget,
    paramScoop,
    Origin.ArgList,
    Modifiers.None
  );

  const body = parseFunctionBody(
    state,
    context | Context.AllowNewTarget,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    undefined,
    Origin.None
  );

  return finishNode(state, context, start, {
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
  const { token } = state;
  const { startIndex: start } = state;
  scanSingleToken(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
  if (checkIfExistInLexicalBindings(state, context, scope, origin, false)) {
    report(state, Errors.DuplicateBinding, KeywordDescTable[token & Token.Type]);
  }
  consumeSemicolon(state, context);
  return finishNode(state, context, start, {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[token & Token.Type],
    declarations
  } as any);
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
 * @param checkForDuplicates True if need to check for duplicates in scope
 * @param scope Scope instance
 */
export function parseVariableDeclarationList(
  state: ParserState,
  context: Context,
  type: Type,
  origin: Origin,
  checkForDuplicates: boolean,
  scope: ScopeState
): any {
  let bindingCount = 1;
  const list: any[] = [parseVariableDeclaration(state, context, type, origin, checkForDuplicates, scope)];
  while (optional(state, context, Token.Comma)) {
    list.push(parseVariableDeclaration(state, context, type, origin, checkForDuplicates, scope));
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
  checkForDuplicates: boolean,
  scope: ScopeState
): any {
  const { startIndex: start } = state;
  const isBinding = state.token === Token.LeftBrace || state.token === Token.LeftBracket;
  const id = parseBindingIdentifierOrPattern(state, context, scope, type, origin, checkForDuplicates);

  let init: any = null;

  if (optional(state, context | Context.AllowPossibleRegEx, Token.Assign)) {
    init = secludeGrammar(state, context, 0, parseAssignmentExpression);
    if (isInOrOf(state) && (origin & Origin.ForStatement || isBinding)) {
      // https://github.com/tc39/test262/blob/master/test/annexB/language/statements/for-in/strict-initializer.js
      if (
        (type & Type.Variable) < 1 ||
        ((context & Context.OptionsWebCompat) === 0 || context & Context.Strict) ||
        isBinding
      ) {
        report(state, Errors.ForInOfLoopInitializer);
      }
    }
  } else if ((type & Type.Const || isBinding) && !isInOrOf(state)) {
    report(state, Errors.DeclarationMissingInitializer, type & Type.Const ? 'const' : 'destructuring');
  }

  return finishNode(state, context, start, {
    type: 'VariableDeclarator',
    init,
    id
  } as any);
}
