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
  finishNode,
  optionalBit,
  optional,
  checkIfLexicalAlreadyBound,
  addFunctionName
} from '../common';
import { Token, KeywordDescTable } from '../token';
import { scanSingleToken } from '../scanner';
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
  context = ((context | Context.InConstructor) ^ Context.InConstructor) | Context.Strict;

  let id: ESTree.Identifier | null = null;
  let superClass: ESTree.Expression | null = null;
  // Shortcut for `(state.token & Token.IsIdentifier) && state.token !== Token.ExtendsKeyword`
  if ((state.token & 0b0000000000000000001_0000_11111111
                   ^ 0b0000000000000000000_0000_01010100)
                   > 0b0000000000000000001_0000_00000000) {
    validateBindingIdentifier(state, context | Context.Strict, Type.ClassExprDecl);
    recordTokenValueAndDeduplicate(state, context, scope, Type.Let, Origin.None, true, state.tokenValue);
    id = parseIdentifier(state, context);
  } else if ((context & Context.RequireIdentifier) === 0) {
    report(state, Errors.DeclNoName, 'Class');
  }

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = secludeGrammarWithLocation(state, context, start, line, column, parseLeftHandSideExpression);
    context |= Context.SuperCall;
  } else {
    context = (context | Context.SuperCall) ^ Context.SuperCall;
  }

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
  isAsync: 0 | 1
): ESTree.FunctionDeclaration {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  scanSingleToken(state, context);

  const statementOrigin = origin & Origin.Statement;
  const isGenerator = statementOrigin === 0 ? optionalBit(state, context, Token.Multiply) : 0;

  // Create a new function scope
  let funcScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let firstRestricted: string | undefined;

  if ((state.token & 0b0000000000000000001_0000_01111110) > 0) {
    const type = (context & 0b0000000000000000001_1000_00000000)
                        === 0b0000000000000000001_0000_00000000 ? 2 : 4;
    validateBindingIdentifier(state, context | ((context & 0b0000000000000000000_1100_00000000) << 11), type);

    if (statementOrigin === 1) {
      scope = createSubScope(scope, ScopeType.BlockStatement);
    }
    addFunctionName(state, context, scope, type, origin, true);

    funcScope = createSubScope(funcScope, ScopeType.BlockStatement);
    firstRestricted = state.tokenValue;
    id = parseIdentifier(state, context);
  } else if ((context & Context.RequireIdentifier) === 0) {
    report(state, Errors.DeclNoName, 'Function');
  }

  context = ((context | 0b0000001111011000000_0000_00000000)
                      ^ 0b0000001111011000000_0000_00000000) | Context.AllowNewTarget | (isAsync * 2 + isGenerator) << 21;

  // Create a argument scope
  const paramScoop = createSubScope(funcScope, ScopeType.ArgumentList);
  const params = parseFormalParameters(state, context, paramScoop, Origin.ArgList, Modifiers.None);

  const body = parseFunctionBody(
    state,
    context = (context | Context.InGlobal) ^ Context.InGlobal,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted,
    origin
  );

  return finishNode(state, context, start, line, column, {
    type: 'FunctionDeclaration',
    params,
    body,
    async: (context & Context.AwaitContext) === Context.AwaitContext,
    generator: isGenerator === 1,
    id
  } as any);
}

export function parseHostedClassDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  isNotDefault: 0 | 1
): ESTree.ClassDeclaration {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  scanSingleToken(state, context);
  context = (context | 0b0000001000000000000_0100_00000000)
                     ^ 0b0000001000000000000_0100_00000000;

  let id: ESTree.Identifier | null = null;
  let superClass: ESTree.Expression | null = null;
  let name = '';
  if ((state.token & 0b0000000000000000001_0000_11111111
                   ^ 0b0000000000000000000_0000_01010100)
                   > 0b0000000000000000001_0000_00000000) {
    name = state.tokenValue;
    validateBindingIdentifier(state, context, Type.ClassExprDecl);
    recordTokenValueAndDeduplicate(state, context, scope, Type.Let, Origin.None, true, name);
    id = parseIdentifier(state, context);
  } else if ((context & Context.RequireIdentifier) === 0) {
    report(state, Errors.DeclNoName, 'Class');
  }

  if (isNotDefault === 1) {
    addToExportedNamesAndCheckDuplicates(state, name);
  }
  addToExportedBindings(state, name);

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = secludeGrammarWithLocation(state, context, start, line, column, parseLeftHandSideExpression);
    context |= Context.SuperCall;
  } else {
    context = (context | Context.SuperCall) ^ Context.SuperCall;
  }

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
  isAsync: 0 | 1
): ESTree.FunctionDeclaration {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  scanSingleToken(state, context);

  const isGenerator = optionalBit(state, context, Token.Multiply);

  // Create a new function scope
  let funcScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let name: string = '';

  if ((state.token & Token.IsIdentifier) > 0b0000000000001000000_0000_00000000) {
    name = state.tokenValue;
    validateBindingIdentifier(state, context, Type.Let);
    addFunctionName(state, context, scope, Type.Let, Origin.None, true);
    funcScope = createSubScope(funcScope, ScopeType.BlockStatement);
    id = parseIdentifier(state, context);
  } else if ((context & Context.RequireIdentifier) === 0) {
    report(state, Errors.DeclNoName, 'Function');
  }

  if ((origin & Origin.ExportDefault) === 0) {
    addToExportedNamesAndCheckDuplicates(state, name);
  }
  addToExportedBindings(state, name);

  context = ((context | 0b0000000111001000000_0000_00000000)
                      ^ 0b0000000111001000000_0000_00000000) | Context.AllowNewTarget | (isAsync * 2 + isGenerator) << 21;

  // Create a argument scope
  const paramScoop = createSubScope(funcScope, ScopeType.ArgumentList);
  const params = parseFormalParameters(state, context, paramScoop, Origin.ArgList, Modifiers.None);

  const body = parseFunctionBody(
    state,
    (context | Context.InGlobal) ^ Context.InGlobal,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    undefined,
    Origin.None
  );

  return finishNode(state, context, start, line, column, {
    type: 'FunctionDeclaration',
    params,
    body,
    async: (context & Context.AwaitContext) === Context.AwaitContext,
    generator: isGenerator === 1,
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
  const declarations = parseVariableDeclarationList(state, context, type, origin, 0, scope);
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
  checkDuplicates: 0 | 1,
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

  if (bindingCount > 1 && (origin & Origin.ForStatement) === Origin.ForStatement
    && (state.token & 0b0000000000000000001_0000_00110000)
                  === 0b0000000000000000001_0000_00110000) {
    report(state, Errors.ForInOfLoopMultiBindings, KeywordDescTable[state.token & Token.Type]);
  }
  return list;
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
  checkDuplicates: 0 | 1,
  scope: ScopeState
): ESTree.VariableDeclarator {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  const isBinding = state.token === Token.LeftBrace || state.token === Token.LeftBracket;
  const id = parseBindingIdentifierOrPattern(state, context, scope, type, origin, checkDuplicates);

  let init: any = null;

  if (optional(state, context | Context.AllowPossibleRegEx, Token.Assign)) {
    init = secludeGrammar(state, context, 0, parseAssignmentExpression);
    if (isBinding || (origin & Origin.ForStatement) === Origin.ForStatement) {
      // https://github.com/tc39/test262/blob/master/test/annexB/language/statements/for-in/strict-initializer.js
      if (state.token === Token.InKeyword) {
        if (
          isBinding ||
          (type & Type.Variable) === 0 ||
          (context & Context.OptionsWebCompat) === 0 ||
          (context & Context.Strict) === Context.Strict
        ) {
          report(state, Errors.ForInOfLoopInitializer);
        }
      } else if (state.token === Token.OfKeyword) {
        report(state, Errors.ForInOfLoopInitializer);
      }
    }
  } else if (
    (isBinding || (type & Type.Const) === Type.Const)
    && (state.token & 0b0000000000000000001_0000_00110000)
                  !== 0b0000000000000000001_0000_00110000
  ) {
    report(state, Errors.DeclarationMissingInitializer, (type & Type.Const) === Type.Const ? 'const' : 'destructuring');
  }

  return finishNode(state, context, start, line, column, {
    type: 'VariableDeclarator',
    init,
    id
  } as any);
}
