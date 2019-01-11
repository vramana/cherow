import * as ESTree from './estree';
import {
  Context,
  Flags,
  LabelState,
  OnComment,
  OnToken,
  ParserState,
  consumeSemicolon,
  Type,
  Origin,
  reinterpret,
  validateBindingIdentifier,
  addToExportedNamesAndCheckForDuplicates,
  addToExportedBindings,
  nextTokenIsFuncKeywordOnSameLine,
  getLabel,
  validateContinueLabel,
  validateBreakStatement,
  addCrossingBoundary,
  addLabel,
  addVariableAndDeduplicate
} from './common';
import { Token, KeywordDescTable } from './token';
import { next } from './scanner';
import { consumeTemplateBrace } from './scanner/template';
import {
  optional,
  expect,
  addVariable,
  checkIfExistInLexicalBindings,
  checkFunctionsArgForDuplicate,
  addFunctionName,
  isLexical,
  lookAheadOrScan
} from './common';
import { ScopeState, ScopeType, createSubScope, createScope } from './scope';
import { report, Errors } from './errors';

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
  Static = 1 << 5
}

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
    exportedNames: [],
    exportedBindings: [],
    labelSet: undefined,
    labelSetStack: [],
    iterationStack: [],
    labelDepth: 0,
    switchStatement: LabelState.Empty,
    iterationStatement: LabelState.Empty,
    functionBoundaryStack: undefined
  };
}

/**
 * Parse a module body, function body, script body, etc.
 */
export function parseTopLevel(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  // Prime the scanner
  next(state, context | Context.AllowPossibleRegEx);

  const statements: ESTree.Statement[] = [];
  while (state.token === Token.StringLiteral) {
    const tokenValue = state.tokenValue;
    if (!(context & Context.Strict) && tokenValue.length === 10 && tokenValue === 'use strict') {
      context |= Context.Strict;
    }
    statements.push(parseDirective(state, context));
  }

  while (state.token !== Token.EndOfSource) {
    if (context & Context.Module) statements.push(parseModuleItem(state, context, scope));
    else statements.push(parseStatementListItem(state, context, scope));
  }

  return statements;
}

/**
 * Parse directive node
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive)
 *
 * @param parser Parser instance
 * @param context Context masks
 */
export function parseDirective(state: ParserState, context: Context): any {
  const directive = state.source.slice(state.startIndex + 1, state.index - 1);
  const expr = parseExpression(state, context);
  consumeSemicolon(state, context);
  return {
    type: 'ExpressionStatement',
    expression: expr,
    directive
  };
}

function parseModuleItem(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement {
  switch (state.token) {
    case Token.ExportKeyword:
      return parseExportDeclaration(state, context, scope);
    case Token.ImportKeyword:
      return parseImportDeclaration(state, context, scope);
    default:
      return parseStatementListItem(state, context, scope);
  }
}

/**
 * Parse export declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExportDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExportDeclaration(state: ParserState, context: Context, scope: ScopeState): any {
  expect(state, context, Token.ExportKeyword);

  const specifiers: ESTree.ExportSpecifier[] = [];

  let declaration: any = null;
  let source: ESTree.Literal | null = null;
  if (optional(state, context, Token.DefaultKeyword)) {
    switch (state.token) {
      // export default HoistableDeclaration[Default]
      case Token.FunctionKeyword: {
        declaration = parseHoistableFunctionDeclaration(state, context, scope, true, false);
        break;
      }

      // export default ClassDeclaration[Default]
      case Token.ClassKeyword:
        declaration = parseHostedClassDeclaration(state, context, scope, true);
        break;

      // export default HoistableDeclaration[Default]
      case Token.AsyncKeyword:
        declaration = parseAsyncFunctionOrAssignmentExpression(state, context, scope, true);
        break;

      default:
        // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
        declaration = parseAssignmentExpression(state, context);
        consumeSemicolon(state, context);
    }

    // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportednames
    addToExportedNamesAndCheckForDuplicates(state, 'default');

    // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportedbindings
    addToExportedBindings(state, '*default*');
    addVariable(state, context, scope, Type.None, true, false, '*default*');

    return {
      type: 'ExportDefaultDeclaration',
      declaration
    };
  }

  switch (state.token) {
    case Token.Multiply: {
      next(state, context);
      expect(state, context, Token.FromKeyword);
      if (state.token !== <Token>Token.StringLiteral) report(state, Errors.Unexpected);
      source = parseLiteral(state, context);
      consumeSemicolon(state, context);
      return {
        type: 'ExportAllDeclaration',
        source
      };
    }
    case Token.LeftBrace: {
      let exportedNames: string[] = [];
      let exportedBindings: string[] = [];

      expect(state, context, Token.LeftBrace);
      while (state.token !== <Token>Token.RightBrace) {
        let tokenValue = state.tokenValue;
        let token = state.token;
        const local = parseIdentifier(state, context);
        let exported: any;
        if (state.token === <Token>Token.AsKeyword) {
          next(state, context);
          if (!(state.token & Token.IsIdentifier)) report(state, Errors.Unexpected);
          exportedNames.push(state.tokenValue);
          exportedBindings.push(tokenValue);
          exported = parseIdentifier(state, context);
        } else {
          validateBindingIdentifier(state, context, Type.Const, token);
          exportedNames.push(state.tokenValue);
          exportedBindings.push(state.tokenValue);
          exported = local;
        }

        specifiers.push({
          type: 'ExportSpecifier',
          local,
          exported
        });

        if (state.token !== <Token>Token.RightBrace) expect(state, context, Token.Comma);
      }

      expect(state, context, Token.RightBrace);

      if (state.token === <Token>Token.FromKeyword) {
        next(state, context);
        //  The left hand side can't be a keyword where there is no
        // 'from' keyword since it references a local binding.
        if (state.token !== <Token>Token.StringLiteral) report(state, Errors.Unexpected);
        source = parseLiteral(state, context);
      } else {
        let i = 0;
        let iMax = exportedNames.length;
        for (; i < iMax; i++) {
          addToExportedNamesAndCheckForDuplicates(state, exportedNames[i]);
        }
        i = 0;
        iMax = exportedBindings.length;
        for (; i < iMax; i++) {
          addToExportedBindings(state, exportedBindings[i]);
        }
      }

      consumeSemicolon(state, context);

      break;
    }

    case Token.ClassKeyword:
      declaration = parseHostedClassDeclaration(state, context, scope, false);
      break;
    case Token.LetKeyword:
      declaration = parseLexicalDeclaration(state, context, Type.Let, Origin.Export, scope);
      if (checkIfExistInLexicalBindings(state, context, scope)) report(state, Errors.Unexpected);
      break;
    case Token.ConstKeyword:
      declaration = parseLexicalDeclaration(state, context, Type.Const, Origin.Export, scope);
      if (checkIfExistInLexicalBindings(state, context, scope)) report(state, Errors.Unexpected);
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatement(state, context, Type.Variable, Origin.Export, scope);
      break;
    case Token.FunctionKeyword:
      declaration = parseHoistableFunctionDeclaration(state, context, scope, true, false);
      break;
    case Token.AsyncKeyword:
      declaration = parseAsyncFunctionOrAssignmentExpression(state, context, scope, false);
      break;
    default:
      report(state, Errors.Unexpected);
  }

  return {
    type: 'ExportNamedDeclaration',
    source,
    specifiers,
    declaration
  };
}

/**
 * Parse import declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseImportDeclaration(state: ParserState, context: Context, scope: ScopeState): any {
  expect(state, context, Token.ImportKeyword);

  let source: ESTree.Literal;
  const specifiers: ESTree.Specifiers[] = [];

  // 'import' ModuleSpecifier ';'
  if ((state.token & Token.IsIdentifier) === Token.IsIdentifier) {
    // V8: 'VariableMode::kConst',
    // Cherow: 'BindingType.Const'
    validateBindingIdentifier(state, context, Type.Const);
    addVariable(state, context, scope, Type.None, true, false, state.tokenValue);
    specifiers.push({
      type: 'ImportDefaultSpecifier',
      local: parseIdentifier(state, context)
    });

    // NameSpaceImport
    if (optional(state, context, Token.Comma)) {
      if (state.token === Token.Multiply) {
        parseImportNamespace(state, context, scope, specifiers);
      } else if (state.token === Token.LeftBrace) {
        parseImportSpecifierOrNamedImports(state, context, scope, specifiers);
      } else report(state, Errors.Unexpected);
    }

    source = parseModuleSpecifier(state, context);

    // 'import' ModuleSpecifier ';'
  } else if (state.token === Token.StringLiteral) {
    source = parseLiteral(state, context);
  } else {
    if (state.token === Token.Multiply) {
      parseImportNamespace(state, context, scope, specifiers);
    } else if (state.token === Token.LeftBrace) {
      parseImportSpecifierOrNamedImports(state, context, scope, specifiers);
    } else report(state, Errors.Unexpected);

    source = parseModuleSpecifier(state, context);
  }

  consumeSemicolon(state, context);

  return {
    type: 'ImportDeclaration',
    specifiers,
    source
  };
}

/**
 * Parse named imports or import specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NamedImports)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportSpecifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

function parseImportSpecifierOrNamedImports(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  specifiers: ESTree.Specifiers[]
): void {
  // NamedImports :
  //   '{' '}'
  //   '{' ImportsList '}'
  //   '{' ImportsList ',' '}'
  //
  // ImportsList :
  //   ImportSpecifier
  //   ImportsList ',' ImportSpecifier
  //
  // ImportSpecifier :
  //   BindingIdentifier
  //   IdentifierName 'as' BindingIdentifier
  expect(state, context, Token.LeftBrace);

  while (state.token !== Token.RightBrace) {
    const tokenValue = state.tokenValue;
    const token = state.token;
    if (!(state.token & Token.IsIdentifier)) report(state, Errors.Unexpected);
    const imported = parseIdentifier(state, context);
    let local: ESTree.Identifier;
    if (optional(state, context, Token.AsKeyword)) {
      validateBindingIdentifier(state, context, Type.Const);
      addVariable(state, context, scope, Type.Const, true, false, state.tokenValue);
      local = parseIdentifier(state, context);
    } else {
      // An import name that is a keyword is a syntax error if it is not followed
      // by the keyword 'as'.
      validateBindingIdentifier(state, context, Type.Const, token);
      addVariable(state, context, scope, Type.Const, true, false, tokenValue);
      local = imported;
    }

    specifiers.push({
      type: 'ImportSpecifier',
      local,
      imported
    });

    if (state.token !== <Token>Token.RightBrace) expect(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);
}

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NameSpaceImport)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

function parseImportNamespace(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  specifiers: ESTree.Specifiers[]
): void {
  // NameSpaceImport:
  //  * as ImportedBinding
  next(state, context);
  expect(state, context, Token.AsKeyword);
  validateBindingIdentifier(state, context, Type.Const);
  addVariable(state, context, scope, Type.Const, true, false, state.tokenValue);
  const local = parseIdentifier(state, context);
  specifiers.push({
    type: 'ImportNamespaceSpecifier',
    local
  });
}

/**
 * Parse module specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleSpecifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseModuleSpecifier(state: ParserState, context: Context): ESTree.Literal {
  // ModuleSpecifier :
  //   StringLiteral
  expect(state, context, Token.FromKeyword);
  if (state.token !== Token.StringLiteral) report(state, Errors.Unexpected);
  return parseLiteral(state, context);
}

/**
 * Parses either async function or assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAsyncFunctionOrAssignmentExpression(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  isDefault: boolean
): ESTree.FunctionDeclaration | ESTree.AssignmentExpression {
  return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
    ? parseHoistableFunctionDeclaration(state, context, scope, isDefault, true)
    : (parseAssignmentExpression(state, context) as any);
}

function parseStatementListItem(state: ParserState, context: Context, scope: ScopeState): any {
  switch (state.token) {
    case Token.FunctionKeyword:
      return parseFunctionDeclaration(state, context, scope, false, false);
    case Token.ClassKeyword:
      return parseClassDeclaration(state, context, scope);
    case Token.ConstKeyword:
      return parseLexicalDeclaration(state, context, Type.Const, Origin.Statement, scope);
    case Token.LetKeyword:
      return parseLetOrExpressionStatement(state, context, scope);
    case Token.AsyncKeyword:
      return parseAsyncFunctionOrExpressionStatement(state, context, scope);
    default:
      return parseStatement(state, context, scope, LabelledState.AllowAsLabelled);
  }
}

/**
 * Parses either an async function declaration or an expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAsyncFunctionOrExpressionStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ReturnType<typeof parseFunctionDeclaration | typeof parseExpressionOrLabelledStatement> {
  return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
    ? parseFunctionDeclaration(state, context, scope, false, true)
    : parseExpressionOrLabelledStatement(state, context, scope, LabelledState.Disallow);
}

function parseLetOrExpressionStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ReturnType<typeof parseVariableStatement | typeof parseExpressionOrLabelledStatement> {
  return lookAheadOrScan(state, context, isLexical, true)
    ? parseLexicalDeclaration(state, context, Type.Let, Origin.Statement, scope)
    : parseExpressionOrLabelledStatement(state, context, scope, LabelledState.Disallow);
}

/**
 * Parses statements
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
function parseStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  label: LabelledState
): ESTree.Statement {
  switch (state.token) {
    case Token.VarKeyword:
      return parseVariableStatement(state, context, Type.Variable, Origin.Statement, scope);
    case Token.SwitchKeyword:
      return parseSwitchStatement(state, context, scope);
    case Token.DoKeyword:
      return parseDoWhileStatement(state, context, scope);
    case Token.ReturnKeyword:
      return parseReturnStatement(state, context);
    case Token.WhileKeyword:
      return parseWhileStatement(state, context, scope);
    case Token.WithKeyword:
      return parseWithStatement(state, context, scope);
    case Token.BreakKeyword:
      return parseBreakStatement(state, context);
    case Token.ContinueKeyword:
      return parseContinueStatement(state, context);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(state, context);
    case Token.TryKeyword:
      return parseTryStatement(state, context, scope);
    case Token.ThrowKeyword:
      return parseThrowStatement(state, context);
    case Token.IfKeyword:
      return parseIfStatement(state, context, scope);
    case Token.Semicolon:
      return parseEmptyStatement(state, context);
    case Token.LeftBrace:
      return parseBlockStatement(
        state,
        (context | Context.TopLevel) ^ Context.TopLevel,
        createSubScope(scope, ScopeType.BlockStatement)
      );
    case Token.ForKeyword:
      return parseForStatement(state, context, scope);
    case Token.FunctionKeyword:
    case Token.ClassKeyword:
      report(state, Errors.Unexpected);
    default:
      return parseExpressionOrLabelledStatement(state, context, scope, label);
  }
}

/**
 * Parses block statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Block)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseBlockStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.BlockStatement {
  const body: ESTree.Statement[] = [];
  next(state, context);
  while (state.token !== Token.RightBrace) {
    body.push(parseStatementListItem(state, context, scope));
  }
  expect(state, context | Context.AllowPossibleRegEx, Token.RightBrace);

  return {
    type: 'BlockStatement',
    body
  };
}

/**
 * Parses empty statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-EmptyStatement)
 *
 * @param state  Parser instance
 * @param context Context masks
 */
export function parseEmptyStatement(state: ParserState, context: Context): ESTree.EmptyStatement {
  next(state, context);
  return {
    type: 'EmptyStatement'
  };
}

/**
 * Parses throw statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ThrowStatement)
 *
 * @param state  Parser instance
 * @param context Context masks
 */
export function parseThrowStatement(state: ParserState, context: Context): ESTree.ThrowStatement {
  next(state, context);
  if (state.flags & Flags.NewLine) report(state, Errors.NewlineAfterThrow);
  const argument: ESTree.Expression = parseExpression(state, context);
  consumeSemicolon(state, context);
  return {
    type: 'ThrowStatement',
    argument
  };
}

/**
 * Parses the if statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-if-statement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseIfStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.IfStatement {
  next(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const previousSwitchStatement = state.switchStatement;
  state.switchStatement = LabelState.Empty;
  const consequent = parseConsequentOrAlternate(state, context, scope);
  state.switchStatement = previousSwitchStatement;
  const alternate = optional(state, context, Token.ElseKeyword)
    ? parseConsequentOrAlternate(state, context, scope)
    : null;

  return {
    type: 'IfStatement',
    test,
    consequent,
    alternate
  };
}

/**
 * Parse either consequent or alternate. Supports AnnexB.
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */

function parseConsequentOrAlternate(state: ParserState, context: Context, scope: ScopeState): any {
  return context & (Context.OptionsDisableWebCompat | Context.Strict) || state.token !== Token.FunctionKeyword
    ? parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow)
    : parseFunctionDeclaration(state, context, scope, true, false);
}

/**
 * Parses switch statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SwitchStatement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
function parseSwitchStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.SwitchStatement {
  next(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const discriminant = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  expect(state, context, Token.LeftBrace);
  const cases: ESTree.SwitchCase[] = [];
  let seenDefault = false;
  const switchScope = createSubScope(scope, ScopeType.SwitchStatement);
  const previousSwitchStatement = state.switchStatement;
  state.switchStatement = LabelState.Iteration;
  while (state.token !== Token.RightBrace) {
    let test: ESTree.Expression | null = null;
    if (optional(state, context, Token.CaseKeyword)) {
      test = parseExpression(state, context);
    } else {
      expect(state, context, Token.DefaultKeyword);
      if (seenDefault) report(state, Errors.Unexpected);
      seenDefault = true;
    }
    cases.push(parseCaseOrDefaultClauses(state, context, test, switchScope));
  }
  state.switchStatement = previousSwitchStatement;
  expect(state, context, Token.RightBrace);
  return {
    type: 'SwitchStatement',
    discriminant,
    cases
  };
}

/**
 * Parses return statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ReturnStatement)
 *
 * @param state  Parser instance
 * @param context Context masks
 */
export function parseReturnStatement(state: ParserState, context: Context): ESTree.ReturnStatement {
  if (!(context & (Context.OptionsGlobalReturn | Context.AllowReturn))) report(state, Errors.IllegalReturn);
  next(state, context | Context.AllowPossibleRegEx);
  const argument =
    (state.token & Token.ASI) < 1 && (state.flags & Flags.NewLine) < 1
      ? parseExpression(state, context & ~Context.AllowReturn)
      : null;
  consumeSemicolon(state, context);
  return {
    type: 'ReturnStatement',
    argument
  };
}

/**
 * Parses while statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-WhileStatement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseWhileStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.WhileStatement {
  next(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
  state.iterationStatement = previousIterationStatement;
  return {
    type: 'WhileStatement',
    test,
    body
  };
}

/**
 * Parses the continue statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ContinueStatement)
 *
 * @param state  Parser instance
 * @param context Context masks
 */
export function parseContinueStatement(state: ParserState, context: Context): ESTree.ContinueStatement {
  next(state, context);
  let label: ESTree.Identifier | undefined | null = null;
  if (!(state.flags & Flags.NewLine) && state.token & Token.Keyword) {
    const tokenValue = state.tokenValue;
    label = parseIdentifier(state, context);
    validateContinueLabel(state, tokenValue);
  }
  consumeSemicolon(state, context);
  if (label === null && state.iterationStatement === LabelState.Empty && state.switchStatement === LabelState.Empty) {
    report(state, Errors.IllegalContinue);
  }
  return {
    type: 'ContinueStatement',
    label
  };
}

/**
 * Parses the break statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BreakStatement)
 *
 * @param state  Parser instance
 * @param context Context masks
 */
export function parseBreakStatement(state: ParserState, context: Context): ESTree.BreakStatement {
  next(state, context);
  let label = null;
  if (!(state.flags & Flags.NewLine) && state.token & Token.Keyword) {
    const tokenValue = state.tokenValue;
    label = parseIdentifier(state, context);
    validateBreakStatement(state, tokenValue);
  } else if (state.iterationStatement === LabelState.Empty && state.switchStatement === LabelState.Empty) {
    report(state, Errors.IllegalBreak);
  }
  consumeSemicolon(state, context);
  return {
    type: 'BreakStatement',
    label
  };
}

/**
 * Parses with statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-WithStatement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseWithStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.WithStatement {
  if (context & Context.Strict) report(state, Errors.StrictModeWith);
  next(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const object = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
  return {
    type: 'WithStatement',
    object,
    body
  };
}

/**
 * Parses the debugger statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-DebuggerStatement)
 *
 * @param state  Parser instance
 * @param context Context masks
 */
export function parseDebuggerStatement(state: ParserState, context: Context): ESTree.DebuggerStatement {
  next(state, context);
  consumeSemicolon(state, context);
  return {
    type: 'DebuggerStatement'
  };
}

/**
 * Parses try statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseTryStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.TryStatement {
  next(state, context);

  const block = parseBlockStatement(state, context, createSubScope(scope, ScopeType.BlockStatement));

  const handler = optional(state, context, Token.CatchKeyword) ? parseCatchBlock(state, context, scope) : null;

  const finalizer = optional(state, context, Token.FinallyKeyword)
    ? parseBlockStatement(
        state,
        (context | Context.TopLevel) ^ Context.TopLevel,
        createSubScope(scope, ScopeType.BlockStatement)
      )
    : null;
  if (!handler && !finalizer) report(state, Errors.Unexpected);
  return {
    type: 'TryStatement',
    block,
    handler,
    finalizer
  };
}

/**
 * Parses catch block
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Catch)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseCatchBlock(state: ParserState, context: Context, scope: ScopeState): ESTree.CatchClause {
  // TryStatement ::
  //   'try' Block Catch
  //   'try' Block Finally
  //   'try' Block Catch Finally
  //
  // Catch ::
  //   'catch' '(' Identifier ')' Block
  //
  // Finally ::
  //   'finally' Block

  let param: any = null;
  let secondScope: ScopeState = scope;
  if (optional(state, context, Token.LeftParen)) {
    const catchScope = createSubScope(scope, ScopeType.CatchClause);
    if (state.token === Token.RightParen) report(state, Errors.Unexpected);
    param = parseBindingIdentifierOrPattern(state, context, catchScope, Type.ArgList, Origin.CatchClause, false);
    if (state.token === Token.Assign) report(state, Errors.Unexpected);
    if (checkIfExistInLexicalBindings(state, context, catchScope, true))
      report(state, Errors.InvalidDuplicateBinding, state.tokenValue);
    expect(state, context, Token.RightParen);
    secondScope = createSubScope(catchScope, ScopeType.BlockStatement);
  }

  const body = parseBlockStatement(state, context, secondScope);

  return {
    type: 'CatchClause',
    param,
    body
  };
}
/**
 * Parses do while statement
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseDoWhileStatement(state: ParserState, context: Context, scope: ScopeState): any {
  expect(state, context, Token.DoKeyword);
  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
  state.iterationStatement = previousIterationStatement;
  expect(state, context, Token.WhileKeyword);
  expect(state, context, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  optional(state, context, Token.Semicolon);
  return {
    type: 'DoWhileStatement',
    body,
    test
  };
}

/**
 * Parses either default clause or case clauses
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CaseClauses)
 * @see [Link](https://tc39.github.io/ecma262/#prod-DefaultClause)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseCaseOrDefaultClauses(
  state: ParserState,
  context: Context,
  test: ESTree.Expression | null,
  scope: ScopeState
): ESTree.SwitchCase {
  expect(state, context, Token.Colon);
  const consequent: ESTree.Statement[] = [];
  while (
    state.token !== Token.CaseKeyword &&
    state.token !== Token.RightBrace &&
    state.token !== Token.DefaultKeyword
  ) {
    consequent.push(parseStatementListItem(state, (context | Context.TopLevel) ^ Context.TopLevel, scope));
  }
  return {
    type: 'SwitchCase',
    test,
    consequent
  };
}

/**
 * Parses either For, ForIn or ForOf statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-statement)
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseForStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ESTree.ForStatement | ESTree.ForInStatement | ESTree.ForOfStatement {
  next(state, context);

  const forAwait = optional(state, context, Token.AwaitKeyword);

  scope = createSubScope(scope, ScopeType.ForStatement);

  expect(state, context, Token.LeftParen);

  let init: any = null;
  let declarations: any = null;
  let test: ESTree.Expression | null = null;
  let update: ESTree.Expression | null = null;
  let right;
  let isPattern = false;

  if (state.token !== Token.Semicolon) {
    if ((state.token & Token.IsVarDecl) !== 0) {
      const kind = KeywordDescTable[state.token & Token.Type];
      if (optional(state, context, Token.VarKeyword)) {
        declarations = parseVariableDeclarationList(
          state,
          context | Context.DisallowInContext,
          Type.Variable,
          Origin.ForStatement,
          false,
          scope
        );
        init = { type: 'VariableDeclaration', kind, declarations };
      } else if (state.token === Token.LetKeyword) {
        let tokenValue = state.tokenValue;
        next(state, context);
        if (state.token === (Token.InKeyword as Token)) {
          if (context & Context.Strict) report(state, Errors.Unexpected);
          init = { type: 'Identifier', name: tokenValue };
        } else {
          declarations = parseVariableDeclarationList(state, context, Type.Let, Origin.ForStatement, true, scope);
          if (checkIfExistInLexicalBindings(state, context, scope, true))
            report(state, Errors.InvalidDuplicateBinding, state.tokenValue);
          init = { type: 'VariableDeclaration', kind, declarations };
        }
      } else if (optional(state, context, Token.ConstKeyword)) {
        declarations = parseVariableDeclarationList(state, context, Type.Const, Origin.ForStatement, false, scope);
        if (checkIfExistInLexicalBindings(state, context, scope, true))
          report(state, Errors.InvalidDuplicateBinding, state.tokenValue);
        init = { type: 'VariableDeclaration', kind, declarations };
      }
    } else {
      isPattern = state.token === Token.LeftBracket || state.token === Token.LeftBrace;
      init = parseExpression(state, context | Context.DisallowInContext);
    }
  }

  /**
   * ForStatement
   *
   * https://tc39.github.io/ecma262/#sec-for-statement
   */

  if (forAwait ? expect(state, context, Token.OfKeyword) : optional(state, context, Token.OfKeyword)) {
    if (state.inCatch) report(state, Errors.Unexpected);
    if (isPattern) reinterpret(init);
    right = parseAssignmentExpression(state, context);
    expect(state, context, Token.RightParen);
    const previousIterationStatement = state.iterationStatement;
    state.iterationStatement = LabelState.Iteration;
    const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
    state.iterationStatement = previousIterationStatement;
    return {
      type: 'ForOfStatement',
      body,
      left: init,
      right,
      await: forAwait
    };
  }

  /**
   * ForIn statement
   *
   * https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
   *
   */

  if (optional(state, context, Token.InKeyword)) {
    if (isPattern) reinterpret(init);
    right = parseExpression(state, context);
    expect(state, context, Token.RightParen);
    const previousIterationStatement = state.iterationStatement;
    state.iterationStatement = LabelState.Iteration;
    const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
    state.iterationStatement = previousIterationStatement;
    return {
      type: 'ForInStatement',
      body,
      left: init,
      right
    };
  }

  expect(state, context, Token.Semicolon);

  if (state.token !== Token.Semicolon) {
    test = parseExpression(state, context);
  }

  expect(state, context, Token.Semicolon);

  if (state.token !== Token.RightParen) update = parseExpression(state, context);

  expect(state, context, Token.RightParen);

  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
  state.iterationStatement = previousIterationStatement;

  return {
    type: 'ForStatement',
    body,
    init,
    test,
    update
  };
}

/**
 * Parses either expression or labelled statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-LabelledStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseExpressionOrLabelledStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  label: LabelledState
): any {
  const token = state.token;
  const tokenValue = state.tokenValue;
  const expr: ESTree.Expression = parseExpression(state, context);
  if (token & Token.Keyword && state.token === Token.Colon) {
    next(state, context | Context.AllowPossibleRegEx);
    validateBindingIdentifier(state, context, Type.None, token);
    if (getLabel(state, `@${tokenValue}`, false, true)) {
      report(state, Errors.LabelRedeclaration, tokenValue);
    }
    addLabel(state, tokenValue);
    let body: any = null;
    if (
      (context & (Context.OptionsDisableWebCompat | Context.Strict)) === 0 &&
      ((state.token as Token) === Token.FunctionKeyword && label === LabelledState.AllowAsLabelled)
    ) {
      body = parseFunctionDeclaration(state, context, scope, false, false);
    } else body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, label);
    state.labelDepth--;
    return {
      type: 'LabeledStatement',
      label: expr as ESTree.Identifier,
      body
    };
  }
  consumeSemicolon(state, context);
  return {
    type: 'ExpressionStatement',
    expression: expr
  };
}

// 12.15.5 Destructuring Assignment
/**
 * Parses either a binding identifier or binding pattern
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBindingIdentifierOrPattern(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  verifyDuplicates: boolean
): ESTree.Pattern {
  switch (state.token) {
    case Token.LeftBrace:
      return parserObjectAssignmentPattern(state, context, scope, type, origin, verifyDuplicates);
    case Token.LeftBracket:
      return parseArrayAssignmentPattern(state, context, scope, type, origin, verifyDuplicates);
    default:
      return parseBindingIdentifier(state, context, scope, type, origin, verifyDuplicates);
  }
}

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBindingIdentifier(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  checkForDuplicates: boolean
): ESTree.Identifier {
  const name = state.tokenValue;
  addVariable(
    state,
    context,
    scope,
    type,
    checkForDuplicates,
    (origin === Origin.Statement || origin === Origin.ForStatement || origin === Origin.Export) &&
      type === Type.Variable
      ? true
      : false,
    name
  );

  if (origin === Origin.Export) {
    addToExportedNamesAndCheckForDuplicates(state, state.tokenValue);
    addToExportedBindings(state, state.tokenValue);
  }

  next(state, context);
  return {
    type: 'Identifier',
    name
  };
}

/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseAssignmentRestElement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  verifyDuplicates: boolean
): any {
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return {
    type: 'RestElement',
    argument
  };
}

/**
 * Parse rest property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestProperty)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
// tslint:disable-next-line:function-name
function AssignmentRestProperty(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  verifyDuplicates: boolean
): any {
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return {
    type: 'RestElement',
    argument
  };
}

/**
 * ArrayAssignmentPattern[Yield] :
 *   [ Elisionopt AssignmentRestElement[?Yield]opt ]
 *   [ AssignmentElementList[?Yield] ]
 *   [ AssignmentElementList[?Yield] , Elisionopt AssignmentRestElement[?Yield]opt ]
 *
 * AssignmentRestElement[Yield] :
 *   ... DestructuringAssignmentTarget[?Yield]
 *
 * AssignmentElementList[Yield] :
 *   AssignmentElisionElement[?Yield]
 *   AssignmentElementList[?Yield] , AssignmentElisionElement[?Yield]
 *
 * AssignmentElisionElement[Yield] :
 *   Elisionopt AssignmentElement[?Yield]
 *
 * AssignmentElement[Yield] :
 *   DestructuringAssignmentTarget[?Yield] Initializer[In,?Yield]opt
 *
 * DestructuringAssignmentTarget[Yield] :
 *   LeftHandSideExpression[?Yield]
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param Parser object
 * @param Context masks
 */
export function parseArrayAssignmentPattern(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  verifyDuplicates: boolean
): ESTree.ArrayPattern {
  expect(state, context, Token.LeftBracket);

  const elements: (ESTree.Node | null)[] = [];

  while (state.token !== Token.RightBracket) {
    if (optional(state, context, Token.Comma)) {
      elements.push(null);
    } else {
      if (state.token === Token.Ellipsis) {
        elements.push(parseAssignmentRestElement(state, context, scope, type, origin, verifyDuplicates));
        break;
      } else {
        elements.push(parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates));
      }
      if (state.token !== <Token>Token.RightBracket) expect(state, context, Token.Comma);
    }
  }

  expect(state, context, Token.RightBracket);

  // tslint:disable-next-line:no-object-literal-type-assertion
  return {
    type: 'ArrayPattern',
    elements
  } as ESTree.ArrayPattern;
}

/**
 * Parse object assignment pattern
 *
 * @param Parser Parser object
 * @param Context Context masks
 */
export function parserObjectAssignmentPattern(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  verifyDuplicates: boolean
): ESTree.ObjectPattern {
  const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];
  expect(state, context, Token.LeftBrace);

  while (state.token !== Token.RightBrace) {
    if (state.token === Token.Ellipsis) {
      properties.push(AssignmentRestProperty(state, context, scope, type, origin, verifyDuplicates));
      break;
    }
    properties.push(parseAssignmentProperty(state, context, scope, type, origin, verifyDuplicates));
    if (state.token !== <Token>Token.RightBrace) expect(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);

  return {
    type: 'ObjectPattern',
    properties
  };
}

/** Parse assignment pattern
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentPattern)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param left LHS of assignment pattern
 * @param pos Location
 */
export function parseAssignmentPattern(state: ParserState, context: Context, left: ESTree.Pattern): any {
  return {
    type: 'AssignmentPattern',
    left,
    right: parseAssignmentExpression(state, context)
  };
}

/**
 * Parse binding initializer
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentPattern)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseBindingInitializer(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  verifyDuplicates: boolean
): ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.MemberExpression | ESTree.AssignmentPattern {
  const left: any = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return !optional(state, context, Token.Assign)
    ? left
    : {
        type: 'AssignmentPattern',
        left,
        right: parseAssignmentExpression(state, context)
      };
}

/**
 * Parse computed property names
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ComputedPropertyName)
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseComputedPropertyName(state: ParserState, context: Context): ESTree.Expression {
  expect(state, context, Token.LeftBracket);
  const key: ESTree.Expression = parseAssignmentExpression(state, context);
  expect(state, context, Token.RightBracket);
  return key;
}

/**
 * Parse assignment property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentProperty)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseAssignmentProperty(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin,
  verifyDuplicates: boolean
): ESTree.AssignmentProperty {
  const { token } = state;
  let key: ESTree.Literal | ESTree.Identifier | ESTree.Expression | null;
  let value;
  let computed = false;
  let shorthand = false;
  // single name binding
  if (token & Token.Keyword) {
    key = parseBindingIdentifier(state, context, scope, type, origin, verifyDuplicates);
    shorthand = !optional(state, context, Token.Colon);
    if (shorthand) {
      const hasInitializer = optional(state, context, Token.Assign);
      value = hasInitializer ? parseAssignmentPattern(state, context, key) : key;
    } else value = parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates);
  } else {
    if (state.token === Token.StringLiteral || state.token === Token.NumericLiteral) {
      key = parseLiteral(state, context);
    } else if (state.token === Token.LeftBracket) {
      computed = true;
      key = parseComputedPropertyName(state, context);
    } else key = parseBindingIdentifier(state, context, scope, type, origin, verifyDuplicates);
    expect(state, context, Token.Colon);
    value = parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates);
  }

  return {
    type: 'Property',
    kind: 'init',
    key,
    computed,
    value,
    method: false,
    shorthand
  };
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
  isFuncDel: boolean,
  isAsync: boolean
) {
  next(state, context);

  const isGenerator: boolean = optional(state, context, Token.Multiply);

  // Create a new function scope
  let funcScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let firstRestricted: Token | null = null;

  if (state.token & Token.IsIdentifier) {
    const nameType =
      (context & (Context.InGlobal | Context.Module)) !== (Context.InGlobal | Context.Module) &&
      (context & Context.TopLevel) === Context.TopLevel
        ? Type.Variable
        : Type.Let;

    // Validate binding identifier
    /*validateBindingIdentifier(
      state,
      ((context | Context.YieldContext | Context.AwaitContext) ^ Context.YieldContext) |
        Context.AwaitContext |
        (context & Context.Strict)
        ? isGenerator
          ? Context.YieldContext
          : Context.YieldContext
        : Context.Empty | (context & Context.Module)
        ? isGenerator
          ? Context.AwaitContext
          : Context.AwaitContext
        : Context.Empty,
      nameType
    ); */

    if (isFuncDel) scope = createSubScope(scope, ScopeType.BlockStatement);
    addFunctionName(state, context, scope, nameType, true);
    funcScope = createSubScope(funcScope, ScopeType.BlockStatement);
    firstRestricted = state.token;
    id = parseIdentifier(state, context);
  }

  context =
    (context | Context.AwaitContext | Context.YieldContext | Context.InArgList) ^
    (Context.AwaitContext | Context.YieldContext | Context.InArgList);

  if (isAsync) context |= Context.AwaitContext;
  if (isGenerator) context |= Context.YieldContext;

  // Create a argument scope
  const paramScoop = createSubScope(funcScope, ScopeType.ArgumentList);
  const params = parseFormalParameters(state, context | Context.AllowNewTarget, paramScoop, Origin.ArgList);

  const body = parseFunctionBody(
    state,
    context | Context.AllowNewTarget,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted
  );

  return {
    type: 'FunctionDeclaration',
    params,
    body,
    async: (context & Context.AwaitContext) !== 0,
    generator: isGenerator,
    id
  };
}

function parseHostedClassDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  isNotDefault: boolean
): ESTree.ClassDeclaration {
  next(state, context);
  context = (context | Context.Strict | Context.InConstructor) ^ (Context.Strict | Context.InConstructor);

  let id: ESTree.Expression | null = null;
  let superClass: ESTree.Expression | null = null;
  let name = '';
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    name = state.tokenValue;
    validateBindingIdentifier(state, context, Type.ClassExprDecl);
    addVariable(state, context, scope, Type.Let, false, false, name);
    id = parseIdentifier(state, context);
  }

  if (isNotDefault) addToExportedNamesAndCheckForDuplicates(state, name);
  addToExportedBindings(state, name);

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = parseLeftHandSideExpression(state, context);
    context |= Context.SuperCall;
  } else context = (context | Context.SuperCall) ^ Context.SuperCall;

  context |= Context.SuperProperty;

  const body = parseClassBodyAndElementList(state, context, scope, Type.None);

  return {
    type: 'ClassDeclaration',
    id,
    superClass,
    body
  };
}

export function parseHoistableFunctionDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  isNotDefault: boolean,
  isAsync: boolean
) {
  next(state, context);

  const isGenerator: boolean = optional(state, context, Token.Multiply);

  // Create a new function scope
  let funcScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let firstRestricted: Token | null = null;
  let name: string = '';

  if (state.token & Token.IsIdentifier) {
    name = state.tokenValue;
    const nameType =
      (context & (Context.InGlobal | Context.Module)) !== (Context.InGlobal | Context.Module) &&
      (context & Context.TopLevel) === Context.TopLevel
        ? Type.Variable
        : Type.Let;

    validateBindingIdentifier(
      state,
      ((context | Context.YieldContext | Context.AwaitContext) ^ Context.YieldContext) |
        Context.AwaitContext |
        (context & Context.Strict)
        ? isGenerator
          ? Context.YieldContext
          : Context.YieldContext
        : Context.Empty | (context & Context.Module)
        ? isGenerator
          ? Context.AwaitContext
          : Context.AwaitContext
        : Context.Empty,
      nameType
    );

    addFunctionName(state, context, scope, nameType, true);
    funcScope = createSubScope(funcScope, ScopeType.BlockStatement);
    firstRestricted = state.token;
    id = parseIdentifier(state, context);
  }

  if (isNotDefault) addToExportedNamesAndCheckForDuplicates(state, name);
  addToExportedBindings(state, name);

  context =
    (context | Context.AwaitContext | Context.YieldContext | Context.InArgList) ^
    (Context.AwaitContext | Context.YieldContext | Context.InArgList);

  if (isAsync) context |= Context.AwaitContext;
  if (isGenerator) context |= Context.YieldContext;

  // Create a argument scope
  const paramScoop = createSubScope(funcScope, ScopeType.ArgumentList);
  const params = parseFormalParameters(state, context | Context.AllowNewTarget, paramScoop, Origin.ArgList);

  const body = parseFunctionBody(
    state,
    context | Context.AllowNewTarget,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted
  );

  return {
    type: 'FunctionDeclaration',
    params,
    body,
    async: (context & Context.AwaitContext) !== 0,
    generator: isGenerator,
    id
  };
}

/**
 * Parse formal parameters
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 * @param origin Origin
 */

export function parseFormalParameters(state: ParserState, context: Context, scope: ScopeState, origin: Origin): any {
  expect(state, context, Token.LeftParen);
  const params: any[] = [];
  while (state.token !== Token.RightParen) {
    if (state.token === Token.Ellipsis) {
      params.push(parseRestElement(state, context, scope, Type.ArgList, Origin.None));
      break; //rest parameter must be the last
    } else {
      if (optional(state, context, Token.Comma)) {
        if (state.token === Token.Comma) report(state, Errors.Unexpected);
      } else {
        let left: any = parseBindingIdentifierOrPattern(state, context, scope, Type.ArgList, origin, false);
        if (optional(state, context, Token.Assign)) {
          left = parseAssignmentPattern(state, context, left);
        }
        params.push(left);
      }
    }
  }

  expect(state, context, Token.RightParen);

  if ((context & (Context.Strict | Context.InMethod)) !== 0) checkFunctionsArgForDuplicate(state, scope.lex, true);

  return params;
}

/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param endToken Token
 * @param scope Scope state
 * @param type Binding type
 */

export function parseRestElement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  type: Type,
  origin: Origin
): any {
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, false);
  return {
    type: 'RestElement',
    argument
  };
}

/**
 * Parse function body
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */

export function parseFunctionBody(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  firstRestricted: Token | null
): ESTree.BlockStatement {
  const body: any[] = [];
  expect(state, context, Token.LeftBrace);

  const isStrict = (context & Context.Strict) === Context.Strict;
  context = (context | Context.TopLevel | Context.AllowReturn | Context.InGlobal) ^ Context.InGlobal;
  let ad = firstRestricted;
  let adsf = scope;
  if (state.token !== Token.RightBrace) {
    while ((state.token & Token.StringLiteral) === Token.StringLiteral) {
      if (state.tokenValue.length === 10 && state.tokenValue === 'use strict') {
        context |= Context.Strict;
      }
      body.push(parseStatementListItem(state, context, scope));
    }

    //if ((context & Context.Strict && firstRestricted === Token.Eval) || firstRestricted === Token.Arguments) {
    //report(state, Errors.Unexpected);
    //}

    if (!isStrict && (context & Context.Strict) !== 0 && (context & Context.InGlobal) === 0) {
      checkFunctionsArgForDuplicate(state, scope.lex['@'], true);
    }

    const previousSwitchStatement = state.switchStatement;
    const previousIterationStatement = state.iterationStatement;

    if ((state.switchStatement & LabelState.Iteration) === LabelState.Iteration) {
      state.switchStatement = LabelState.CrossingBoundary;
    }

    if ((state.iterationStatement & LabelState.Iteration) === LabelState.Iteration) {
      state.iterationStatement = LabelState.CrossingBoundary;
    }

    addCrossingBoundary(state);
    while (state.token !== (Token.RightBrace as Token)) {
      body.push(parseStatementListItem(state, context, scope));
    }
    state.labelDepth--;
    state.switchStatement = previousSwitchStatement;
    state.iterationStatement = previousIterationStatement;
  }
  expect(state, context | Context.AllowPossibleRegEx, Token.RightBrace);

  return {
    type: 'BlockStatement',
    body
  };
}

/**
 * Parses variable statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param type Binding type
 * @param origin Binding origin
 * @param scope Scope instance
 */
export function parseVariableStatement(
  state: ParserState,
  context: Context,
  type: Type,
  origin: Origin,
  scope: ScopeState
): ESTree.VariableDeclaration {
  const { token } = state;
  next(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
  consumeSemicolon(state, context);
  return {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[token & Token.Type],
    declarations
  } as any;
}

/**
 * Parses lexical declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param state Parser instance
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
  next(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
  if (checkIfExistInLexicalBindings(state, context, scope)) report(state, Errors.Unexpected);
  consumeSemicolon(state, context);
  return {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[token & Token.Type],
    declarations
  } as any;
}

/*
 * Parses variable declaration list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclarationList)
 *
 * @param parser  Parser instance
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
  const elementCount = 1;
  const list: any[] = [parseVariableDeclaration(state, context, type, origin, checkForDuplicates, scope)];
  while (optional(state, context, Token.Comma)) {
    list.push(parseVariableDeclaration(state, context, type, origin, checkForDuplicates, scope));
  }
  if (origin === Origin.ForStatement && (state.token === Token.InKeyword || state.token === Token.OfKeyword)) {
    if (
      state.token === Token.OfKeyword ||
      type === Type.Variable ||
      context & (Context.OptionsDisableWebCompat | Context.Strict)
    ) {
      if (elementCount > 1) {
        report(state, Errors.Unexpected);
      }
    }
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
  checkForDuplicates: boolean,
  scope: ScopeState
): any {
  let id = parseBindingIdentifierOrPattern(state, context, scope, type, origin, checkForDuplicates);
  let init: any = null;
  if (optional(state, context | Context.AllowPossibleRegEx, Token.Assign)) {
    init = parseAssignmentExpression(state, context);
  } else if (
    type & Type.Const &&
    ((origin & Origin.ForStatement) === 0 || (state.token === Token.Semicolon || state.token === Token.Comma))
  ) {
    report(state, Errors.MissingInitInConstDecl);
  }

  return {
    type: 'VariableDeclarator',
    init,
    id
  };
}

export function parseExpression(state: ParserState, context: Context): any {
  const expr = parseAssignmentExpression(state, context);
  if (state.token !== Token.Comma) return expr;
  return parseSequenceExpression(state, context, expr);
}

/**
 * Parse secuence expression
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseSequenceExpression(
  state: ParserState,
  context: Context,
  left: ESTree.Expression
): ESTree.SequenceExpression {
  const expressions: ESTree.Expression[] = [left];
  while (optional(state, context, Token.Comma)) {
    expressions.push(parseAssignmentExpression(state, context));
  }
  return {
    type: 'SequenceExpression',
    expressions
  };
}

/**
 * Parse yield expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-YieldExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseYieldExpression(state: ParserState, context: Context): ESTree.YieldExpression | ESTree.Identifier {
  expect(state, context, Token.YieldKeyword);
  let argument: ESTree.Expression | null = null;
  let delegate = false;
  if (!(state.flags & Flags.NewLine)) {
    delegate = optional(state, context, Token.Multiply);
    if (delegate || state.token & Token.IsExpressionStart) {
      argument = parseAssignmentExpression(state, context);
    }
  }
  return {
    type: 'YieldExpression',
    argument,
    delegate
  };
}

export function parseAssignmentExpression(state: ParserState, context: Context): any {
  if (state.token & Token.IsYield && context & Context.YieldContext) return parseYieldExpression(state, context);
  const expr = parseConditionalExpression(state, context);
  if ((state.token & Token.IsAssignOp) === Token.IsAssignOp) {
    if (state.token === Token.Assign) reinterpret(expr);
    const operator = state.token;
    next(state, context | Context.AllowPossibleRegEx);
    const right = parseAssignmentExpression(state, context);
    return {
      type: 'AssignmentExpression',
      left: expr,
      operator: KeywordDescTable[operator & Token.Type],
      right
    };
  }

  return expr;
}

/**
 * Parse conditional expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ConditionalExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseConditionalExpression(
  state: ParserState,
  context: Context
): ESTree.Expression | ESTree.ConditionalExpression {
  // ConditionalExpression ::
  // LogicalOrExpression
  // LogicalOrExpression '?' AssignmentExpression ':' AssignmentExpression
  const test = parseBinaryExpression(state, context, 0);
  if (!optional(state, context | Context.AllowPossibleRegEx, Token.QuestionMark)) return test;
  const consequent = parseAssignmentExpression(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.Colon);
  const alternate = parseAssignmentExpression(state, context);
  return {
    type: 'ConditionalExpression',
    test,
    consequent,
    alternate
  };
}

/**
 * Parse binary expression.
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-exp-operator)
 * @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-additive-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-bitwise-shift-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-equality-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-relational-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-multiplicative-operators)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param minPrec Minimum precedence value
 * @param pos Line / Column info
 * @param Left Left hand side of the binary expression
 */
function parseBinaryExpression(
  state: ParserState,
  context: Context,
  minPrec: number,
  left: any = parseUnaryExpression(state, context)
): ESTree.Expression {
  const bit = -((context & Context.DisallowInContext) > 0) & Token.InKeyword;
  let t: Token;
  let prec: number;
  while (state.token & Token.IsBinaryOp) {
    t = state.token;
    prec = t & Token.Precedence;
    if (prec + (((t === Token.Exponentiate) as any) << 8) - (((bit === t) as any) << 12) <= minPrec) break;
    next(state, context | Context.AllowPossibleRegEx);
    left = {
      type: t & Token.IsLogical ? 'LogicalExpression' : 'BinaryExpression',
      left,
      right: parseBinaryExpression(state, context, prec),
      operator: KeywordDescTable[t & Token.Type]
    };
  }

  return left;
}

/**
 * Parse await expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AwaitExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location info
 */

function parseAwaitExpression(
  state: ParserState,
  context: Context
): ESTree.AwaitExpression | ESTree.Identifier | ESTree.ArrowFunctionExpression {
  next(state, context | Context.AllowPossibleRegEx);
  return {
    type: 'AwaitExpression',
    argument: parseUnaryExpression(state, context | Context.AllowPossibleRegEx)
  };
}

/**
 * Parses unary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UnaryExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseUnaryExpression(state: ParserState, context: Context): any {
  const t = state.token;
  if (context & Context.AwaitContext && t & Token.IsAwait) {
    return parseAwaitExpression(state, context);
  } else if ((t & Token.IsUnaryOp) === Token.IsUnaryOp) {
    const { token } = state;
    next(state, context | Context.AllowPossibleRegEx);
    const argument: ESTree.Expression = parseUnaryExpression(state, context);
    if (state.token === Token.Exponentiate) {
      report(state, Errors.InvalidLOExponentation);
    }
    if (context & Context.Strict && token === Token.DeleteKeyword) {
      if (argument.type === 'Identifier') report(state, Errors.StrictDelete);
    }
    return {
      type: 'UnaryExpression',
      operator: KeywordDescTable[t & Token.Type],
      argument,
      prefix: true
    };
  }
  return parseUpdateExpression(state, context);
}

/**
 * Parses update expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseUpdateExpression(state: ParserState, context: Context): any {
  const { token } = state;
  if ((state.token & Token.IsUpdateOp) === Token.IsUpdateOp) {
    next(state, context);
    const expr = parseLeftHandSideExpression(state, context);
    return {
      type: 'UpdateExpression',
      argument: expr,
      operator: KeywordDescTable[token & Token.Type],
      prefix: true
    };
  }

  const expression = parseLeftHandSideExpression(state, context);

  if ((state.token & Token.IsUpdateOp) === Token.IsUpdateOp && (state.flags & Flags.NewLine) === 0) {
    const operator = state.token;
    next(state, context);
    return {
      type: 'UpdateExpression',
      argument: expression,
      operator: KeywordDescTable[operator & Token.Type],
      prefix: false
    };
  }

  return expression;
}

/**
 * Parse left hand side expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-LeftHandSideExpression)
 *
 * @param Parser Parer instance
 * @param Context Contextmasks
 * @param pos Location info
 */
export function parseLeftHandSideExpression(state: ParserState, context: Context): any {
  // LeftHandSideExpression ::
  //   (NewExpression | MemberExpression) ...
  let expr = parseNewOrMemberExpression(state, context);

  while (true) {
    switch (state.token) {
      case Token.Period:
        next(state, context);
        expr = {
          type: 'MemberExpression',
          object: expr,
          computed: false,
          property: parseIdentifier(state, context)
        };
        continue;
      case Token.LeftBracket:
        next(state, context);
        expr = {
          type: 'MemberExpression',
          object: expr,
          computed: true,
          property: parseExpression(state, context)
        };
        expect(state, context, Token.RightBracket);
        break;
      case Token.LeftParen:
        const args = parseArgumentList(state, context);
        expr = {
          type: 'CallExpression',
          callee: expr,
          arguments: args
        };
        break;
      case Token.TemplateTail:
        expr = {
          type: 'TaggedTemplateExpression',
          tag: expr,
          quasi: parseTemplateLiteral(state, context)
        };
        break;
      case Token.TemplateCont:
        expr = {
          type: 'TaggedTemplateExpression',
          tag: expr,
          quasi: parseTemplate(state, context | Context.TaggedTemplate)
        };
        break;
      default:
        return expr;
    }
  }
}

/**
 * Parse meta property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param meta Identifier
 * @param pos Location
 */

export function parseNewTargetExpression(state: ParserState, context: Context, id: ESTree.Identifier): any {
  if ((context & Context.AllowNewTarget) === 0 || state.tokenValue !== 'target') report(state, Errors.Unexpected);
  return {
    meta: id,
    type: 'MetaProperty',
    property: parseIdentifier(state, context)
  };
}

export function parseNewOrMemberExpression(state: ParserState, context: Context): any {
  if (state.token === Token.NewKeyword) {
    let result: any;
    const id = parseIdentifier(state, context | Context.AllowPossibleRegEx);
    if (state.token === <Token>Token.SuperKeyword) {
      result = { type: 'Super' };
    } else if (optional(state, context, Token.Period)) {
      return parseNewTargetExpression(state, context, id);
    } else {
      result = parseNewOrMemberExpression(state, context);
    }

    return {
      type: 'NewExpression',
      callee: result,
      arguments: state.token === <Token>Token.LeftParen ? parseArgumentList(state, context) : []
    };
  }

  return parseMemberExpression(state, context);
}

function parseImportExpressions(state: ParserState, context: Context): ESTree.Expression {
  const id = parseIdentifier(state, context);
  // Import.meta - Stage 3 proposal
  if (optional(state, context, Token.Period)) {
    return {
      meta: id,
      type: 'MetaProperty',
      property: parseIdentifier(state, context)
    };
  }

  let expr: any = { type: 'Import' };
  expect(state, context, Token.LeftParen);
  const args = parseAssignmentExpression(state, context);
  expect(state, context, Token.RightParen);
  expr = {
    type: 'CallExpression',
    callee: expr,
    arguments: [args]
  };
  return expr;
}

function parseMemberExpression(state: ParserState, context: Context): ESTree.Expression {
  let result: any;
  if (state.token === Token.SuperKeyword) {
    result = { type: 'Super' };
  } else if (state.token === Token.ImportKeyword) {
    result = parseImportExpressions(state, context);
  } else {
    result = parsePrimaryExpression(state, context);
  }
  return parseMemberExpressionContinuation(state, context, result);
}
/**
 * Parse member expression continuation
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location info
 * @param expr Expression
 */
function parseMemberExpressionContinuation(state: ParserState, context: Context, expr: any) {
  while (true) {
    switch (state.token) {
      case Token.Period:
        next(state, context);
        expr = {
          type: 'MemberExpression',
          object: expr,
          computed: false,
          property: parseIdentifier(state, context)
        };
        continue;
      case Token.LeftBracket:
        next(state, context);
        expr = {
          type: 'MemberExpression',
          object: expr,
          computed: true,
          property: parseExpression(state, context)
        };
        expect(state, context, Token.RightBracket);
        break;
      case Token.TemplateTail:
        expr = {
          type: 'TaggedTemplateExpression',
          tag: expr,
          quasi: parseTemplateLiteral(state, context)
        };
        break;
      case Token.TemplateCont:
        expr = {
          type: 'TaggedTemplateExpression',
          tag: expr,
          quasi: parseTemplate(state, context | Context.TaggedTemplate)
        };
        break;
      default:
        return expr;
    }
  }
}

/**
 * Parse template literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TemplateLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseTemplateLiteral(parser: ParserState, context: Context): ESTree.TemplateLiteral {
  return {
    type: 'TemplateLiteral',
    expressions: [],
    quasis: [parseTemplateSpans(parser, context)]
  };
}

/**
 * Parse template head
 *
 * @param parser Parser object
 * @param context Context masks
 * @param cooked Cooked template value
 * @param raw Raw template value
 * @param pos Current location
 */

function parseTemplateHead(
  parser: ParserState,
  context: Context,
  cooked: string | null = null,
  raw: string | null
): ESTree.TemplateElement {
  parser.token = consumeTemplateBrace(parser, context);

  return {
    type: 'TemplateElement',
    value: {
      cooked,
      raw
    },
    tail: false
  } as any;
}

/**
 * Parse template
 *
 * @param parser Parser object
 * @param context Context masks
 * @param expression Expression AST node
 * @param quasis Array of Template elements
 */

function parseTemplate(
  parser: ParserState,
  context: Context,
  expressions: ESTree.Expression[] = [],
  quasis: ESTree.TemplateElement[] = []
): ESTree.TemplateLiteral {
  const { tokenValue, tokenRaw } = parser;

  expect(parser, context, Token.TemplateCont);

  expressions.push(parseExpression(parser, context));
  quasis.push(parseTemplateHead(parser, context, tokenValue, tokenRaw));

  if (parser.token === Token.TemplateTail) {
    quasis.push(parseTemplateSpans(parser, context));
  } else {
    parseTemplate(parser, context, expressions, quasis);
  }

  return {
    type: 'TemplateLiteral',
    expressions,
    quasis
  };
}

/**
 * Parse template spans
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TemplateSpans)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param loc Current AST node location
 */

function parseTemplateSpans(state: ParserState, context: Context): ESTree.TemplateElement {
  const { tokenValue, tokenRaw } = state;

  expect(state, context, Token.TemplateTail);

  return {
    type: 'TemplateElement',
    value: {
      cooked: tokenValue,
      raw: tokenRaw
    },
    tail: true
  };
}

/**
 * Parse argument list
 *
 * @see [https://tc39.github.io/ecma262/#prod-ArgumentList)
 *
 * @param Parser Parser object
 * @param Context Context masks
 */
function parseArgumentList(state: ParserState, context: Context): (ESTree.Expression | ESTree.SpreadElement)[] {
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const expressions: (ESTree.Expression | ESTree.SpreadElement)[] = [];
  while (state.token !== Token.RightParen) {
    if (state.token === Token.Ellipsis) {
      expressions.push(parseSpreadElement(state, context));
    } else {
      expressions.push(parseAssignmentExpression(state, context));
    }
    if (state.token !== <Token>Token.RightParen) expect(state, context, Token.Comma);
  }

  expect(state, context, Token.RightParen);
  return expressions;
}

function parseSpreadElement(state: ParserState, context: Context): ESTree.SpreadElement {
  expect(state, context, Token.Ellipsis);
  const argument = parseAssignmentExpression(state, context);
  return {
    type: 'SpreadElement',
    argument
  };
}

export function parsePrimaryExpression(state: ParserState, context: Context): any {
  switch (state.token) {
    case Token.NumericLiteral:
    case Token.StringLiteral:
      return parseLiteral(state, context);
    case Token.BigIntLiteral:
      return parseBigIntLiteral(state, context);
    case Token.RegularExpression:
      return parseRegularExpressionLiteral(state, context);
    case Token.LeftBracket:
      return parseArrayExpression(state, context & ~Context.DisallowInContext);
    case Token.LeftParen:
      return parseGroupExpression(state, context);
    case Token.LeftBrace:
      return parseObjectLiteral(state, context & ~Context.DisallowInContext, -1, Type.None);
    case Token.FunctionKeyword:
      return parseFunctionExpression(state, context, false);
    case Token.ClassKeyword:
      return parseClassExpression(state, context);
    case Token.TemplateTail:
      return parseTemplateLiteral(state, context);
    case Token.TemplateCont:
      return parseTemplate(state, context);
    case Token.TrueKeyword:
    case Token.FalseKeyword:
      return parseBooleanLiteral(state, context);
    case Token.NullKeyword:
      return parseNullLiteral(state, context);
    case Token.ThisKeyword:
      return parseThisExpression(state, context);
    case Token.LeftBrace:
    case Token.AsyncKeyword: {
      const expr = parseIdentifier(state, context);

      if (state.flags & Flags.NewLine) return expr;

      if (state.token === <Token>Token.FunctionKeyword) {
        return parseFunctionExpression(state, context, true);
      }

      // async Identifier => AsyncConciseBody
      if (state.token & Token.IsIdentifier) {
        if (state.token === <Token>Token.AwaitKeyword) report(state, Errors.Unexpected);
        const expr = parseIdentifier(state, context);
        if (optional(state, context, Token.Arrow)) {
          if (state.flags & Flags.NewLine) report(state, Errors.Unexpected);
          if (context & (Context.YieldContext | Context.AwaitContext)) report(state, Errors.Unexpected);
          let scope = createScope(ScopeType.ArgumentList);
          addVariableAndDeduplicate(state, context, scope, Type.ArgList, true);
          return parseArrowFunctionExpression(state, context, scope as any, [expr], true);
        }
      }

      if (optional(state, context, Token.Arrow)) {
        if (state.flags & Flags.NewLine) report(state, Errors.Unexpected);
        if (context & (Context.YieldContext | Context.AwaitContext)) report(state, Errors.Unexpected);
        let scope = createScope(ScopeType.ArgumentList);
        return parseArrowFunctionExpression(state, context, scope as any, [expr], false);
      }

      return expr;
    }
    default:
      const token = state.token;
      const id = parseIdentifier(state, context | Context.TaggedTemplate);
      if (optional(state, context, Token.Arrow)) {
        let scopes = createScope(ScopeType.ArgumentList);
        addVariableAndDeduplicate(state, context, scopes, Type.ArgList, true);
        if (context & Context.AwaitContext && token === Token.AwaitKeyword) report(state, Errors.Unexpected);
        return parseArrowFunctionExpression(state, context, scopes as any, [id], false);
      }

      return id;
  }
}
export function parseArrayExpression(state: ParserState, context: Context): any {
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftBracket);
  let elements: any = [];
  while (state.token !== Token.RightBracket) {
    if (optional(state, context, Token.Comma)) {
      elements.push(null);
    } else if (state.token === Token.Ellipsis) {
      elements.push(parseSpreadElement(state, context));
    } else {
      elements.push(parseAssignmentExpression(state, context));
      if (state.token !== <Token>Token.RightBracket) expect(state, context, Token.Comma);
    }
  }
  expect(state, context, Token.RightBracket);
  return {
    type: 'ArrayExpression',
    elements
  };
}

function parseFunctionExpression(state: ParserState, context: Context, isAsync: boolean): ESTree.FunctionExpression {
  expect(state, context, Token.FunctionKeyword);

  let isGenerator: boolean = false;

  if (optional(state, context, Token.Multiply)) {
    isGenerator = true;
  }

  // Create a new function scope
  let functionScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let firstRestricted: Token | null = null;

  if (state.token & Token.IsIdentifier) {
    // Validate binding identifier
    validateBindingIdentifier(
      state,
      ((context | Context.YieldContext | Context.AwaitContext) ^ Context.YieldContext) |
        Context.AwaitContext |
        (context & Context.Strict)
        ? isGenerator
          ? Context.YieldContext
          : Context.YieldContext
        : Context.Empty | (context & Context.Module)
        ? isGenerator
          ? Context.AwaitContext
          : Context.AwaitContext
        : Context.Empty,
      Type.Variable
    );
    addVariableAndDeduplicate(state, context, functionScope, Type.Variable, true);
    functionScope = createSubScope(functionScope, ScopeType.BlockStatement);
    firstRestricted = state.token;
    id = parseIdentifier(state, context);
  }

  context =
    (context | Context.AwaitContext | Context.YieldContext | Context.InArgList) ^
    (Context.AwaitContext | Context.YieldContext | Context.InArgList);

  if (isAsync) context |= Context.AwaitContext;
  if (isGenerator) context |= Context.YieldContext;

  // Create a argument scope
  const paramScoop = createSubScope(functionScope, ScopeType.ArgumentList);

  const params = parseFormalParameters(state, context | Context.AllowNewTarget, paramScoop, Origin.ArgList);
  const body: any = parseFunctionBody(
    state,
    context | Context.AllowNewTarget,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted
  );

  return {
    type: 'FunctionExpression',
    params,
    body,
    async: isAsync,
    generator: isGenerator,
    id
  };
}

function parseArrowFunctionExpression(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  params: any,
  isAsync: boolean
): ESTree.ArrowFunctionExpression {
  for (let i = 0; i < params.length; ++i) reinterpret(params[i]);

  if (checkIfExistInLexicalBindings(state, context, scope, true)) report(state, Errors.AlreadyDeclared);

  context =
    (context | Context.AwaitContext | Context.YieldContext | Context.InArgList) ^
    (Context.AwaitContext | Context.YieldContext | Context.InArgList);

  if (isAsync) context |= Context.AwaitContext;

  const expression = state.token !== Token.LeftBrace;
  const body = expression
    ? parseAssignmentExpression(state, context)
    : parseFunctionBody(state, context, createSubScope(scope, ScopeType.BlockStatement), state.token);
  return {
    type: 'ArrowFunctionExpression',
    body,
    params,
    id: null,
    async: isAsync,
    expression
  };
}

export function parseGroupExpression(state: ParserState, context: Context): any {
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  let scope = createScope(ScopeType.ArgumentList);
  if (state.token === Token.RightParen) {
    next(state, context);
    if (!optional(state, context, Token.Arrow)) report(state, Errors.Unexpected);
    return parseArrowFunctionExpression(state, context, scope, [], false);
  } else if (state.token === Token.Ellipsis) {
    const rest = [parseRestElement(state, context, scope, Type.ArgList, Origin.None)];
    expect(state, context, Token.RightParen);
    if (!optional(state, context, Token.Arrow)) report(state, Errors.Unexpected);
    return parseArrowFunctionExpression(state, context, scope, rest, false);
  }
  let expr = parseAssignmentExpression(state, context);
  if (state.token === Token.Comma) {
    const expressions: (ESTree.Expression | ESTree.RestElement)[] = [expr];
    while (optional(state, context | Context.AllowPossibleRegEx, Token.Comma)) {
      if (state.token === <Token>Token.Ellipsis) {
        const restElement = parseRestElement(state, context, scope, Type.ArgList, Origin.None);
        expect(state, context, Token.RightParen);
        if (!optional(state, context, Token.Arrow)) report(state, Errors.Unexpected);
        expressions.push(restElement);
        return parseArrowFunctionExpression(state, context, scope, expressions, false);
      } else if (optional(state, context, Token.RightParen)) {
        if (state.token !== <Token>Token.Arrow) report(state, Errors.Unexpected);
        return parseArrowFunctionExpression(state, context, scope, expressions, false);
      } else {
        expressions.push(parseAssignmentExpression(state, context));
      }
    }

    expr = {
      type: 'SequenceExpression',
      expressions
    };
  }
  expect(state, context, Token.RightParen);
  if (optional(state, context, Token.Arrow)) {
    return parseArrowFunctionExpression(
      state,
      context,
      scope,
      expr.type === 'SequenceExpression' ? expr.expressions : [expr],
      false
    );
  }

  return expr;
}

function parseClassDeclaration(state: ParserState, context: Context, scope: ScopeState): ESTree.ClassDeclaration {
  next(state, context);
  context = (context | Context.Strict | Context.InConstructor) ^ (Context.Strict | Context.InConstructor);

  let id: ESTree.Expression | null = null;
  let superClass: ESTree.Expression | null = null;
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    validateBindingIdentifier(state, context, Type.ClassExprDecl);
    addVariable(state, context, scope, Type.Let, false, false, state.tokenValue);
    id = parseIdentifier(state, context);
  }

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = parseLeftHandSideExpression(state, context);
    context |= Context.SuperCall;
  } else context = (context | Context.SuperCall) ^ Context.SuperCall;

  context |= Context.SuperProperty;

  const body = parseClassBodyAndElementList(state, context, scope, Type.None);

  return {
    type: 'ClassDeclaration',
    id,
    superClass,
    body
  };
}

/**
 * Parses class expression
 *
 * @param state
 * @param context
 * @param scope
 * @param type
 */

function parseClassExpression(state: ParserState, context: Context): ESTree.ClassExpression {
  next(state, context);
  context = (context | Context.Strict | Context.InConstructor) ^ (Context.Strict | Context.InConstructor);

  let id: ESTree.Expression | null = null;
  let superClass: ESTree.Expression | null = null;
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    validateBindingIdentifier(state, context, Type.ClassExprDecl);
    addVariable(state, context, -1, Type.Let, false, false, state.tokenValue);
    id = parseIdentifier(state, context);
  }

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = parseLeftHandSideExpression(state, context);
    context |= Context.SuperCall;
  } else context = (context | Context.SuperCall) ^ Context.SuperCall;

  context |= Context.SuperProperty;

  const body = parseClassBodyAndElementList(state, context, -1, Type.None);

  return {
    type: 'ClassExpression',
    id,
    superClass,
    body
  };
}

export function parseClassBodyAndElementList(
  state: ParserState,
  context: Context,
  scope: ScopeState | number,
  type: Type
): ESTree.ClassBody {
  let t = type;
  let sc = scope;
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftBrace);
  const body: any[] = [];
  let value: any;
  let kind: any;
  let key: any;
  let objState = ObjectState.None;
  let token = state.token;
  let tokenValue = state.tokenValue;
  while (state.token !== Token.RightBrace) {
    if (!optional(state, context, Token.Semicolon)) {
      if (state.token & Token.IsIdentifier) {
        token = state.token;
        tokenValue = state.tokenValue;
        key = parseIdentifier(state, context);
        if (token === Token.StaticKeyword) {
          if (state.token & Token.IsIdentifier) {
            objState |= ObjectState.Static;
            token = state.token;
            key = parseIdentifier(state, context);
            if (token & Token.IsAsync) objState |= ObjectState.Async;
            if (optional(state, context, Token.Multiply)) {
              if (token === Token.GetKeyword || token === Token.SetKeyword) report(state, Errors.Unexpected);
              objState |= ObjectState.Generator;
            }
            if (state.token & Token.IsIdentifier) {
              if (token === Token.GetKeyword) kind = 'get';
              else if (token === Token.SetKeyword) kind = 'set';
              else kind = 'method';
              key = parseIdentifier(state, context);
            } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
              if (token === Token.GetKeyword) kind = 'get';
              else if (token === Token.SetKeyword) kind = 'set';
              else kind = 'method';
              key = parseLiteral(state, context);
            } else if (state.token === Token.LeftBracket) {
              if (token & Token.IsAsync) objState |= ObjectState.Async;
              objState |= ObjectState.Computed;
              key = parseComputedPropertyName(state, context);
              if (token === Token.GetKeyword) kind = 'get';
              else if (token === Token.SetKeyword) kind = 'set';
              else kind = 'method';
            } else {
              kind = 'method';
            }
            if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
            value = parseMethodDeclaration(state, context, objState);
          } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
            key = parseLiteral(state, context);
            kind = 'method';
            objState |= ObjectState.Static;
            value = parseMethodDeclaration(state, context, objState);
          } else if (state.token === <Token>Token.LeftBracket) {
            objState |= ObjectState.Computed | ObjectState.Static;
            kind = 'method';
            key = parseComputedPropertyName(state, context);
            value = parseMethodDeclaration(state, context, objState);
          } else if (optional(state, context, Token.Multiply)) {
            objState |= ObjectState.Generator;
            kind = 'method';
            objState |= ObjectState.Static;
            if (state.token & Token.IsIdentifier) {
              key = parseIdentifier(state, context);
            } else if (state.token === <Token>Token.NumericLiteral || state.token === <Token>Token.StringLiteral) {
              key = parseLiteral(state, context);
            } else if (state.token === <Token>Token.LeftBracket) {
              objState |= ObjectState.Computed;
              key = parseComputedPropertyName(state, context);
            } else {
              report(state, Errors.Unexpected);
            }
            value = parseMethodDeclaration(state, context, objState);
          }
        } else {
          objState &= ~ObjectState.Static;
          if (
            state.token === Token.Comma ||
            state.token === Token.Semicolon ||
            state.token === <Token>Token.RightBrace ||
            state.token === Token.Assign
          ) {
            report(state, Errors.Unexpected);
          } else if (state.token === Token.Colon) {
            report(state, Errors.Unexpected);
          } else if (state.token === Token.LeftBracket) {
            key = parseComputedPropertyName(state, context);

            if (token & Token.IsAsync) {
              objState |= ObjectState.Async;
              kind = 'method';
            } else {
              objState |= ObjectState.Computed;
              if (token === Token.GetKeyword) kind = 'get';
              else if (token === Token.SetKeyword) kind = 'set';
            }
            if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
            value = parseMethodDeclaration(state, context, objState);
          } else if (state.token === Token.LeftParen) {
            if (tokenValue === 'prototype') report(state, Errors.Unexpected);
            if (tokenValue === 'constructor') kind = 'constructor';
            else kind = 'method';
            objState = objState & ~ObjectState.Computed;
            value = parseMethodDeclaration(state, context, objState);
          } else if (optional(state, context, Token.Multiply)) {
            if (token & Token.IsAsync && state.tokenValue === 'prototype') report(state, Errors.Unexpected);

            if (token === Token.GetKeyword || token === Token.SetKeyword) report(state, Errors.Unexpected);
            objState |= ObjectState.Generator;
            kind = 'method';
            if (token & Token.IsAsync) objState |= ObjectState.Async;
            if (state.token & Token.IsIdentifier) {
              key = parseIdentifier(state, context);
            } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
              key = parseLiteral(state, context);
            } else if (state.token === <Token>Token.LeftBracket) {
              objState |= ObjectState.Computed;
              key = parseComputedPropertyName(state, context);
            } else {
              report(state, Errors.Unexpected);
            }
            value = parseMethodDeclaration(state, context, objState);
          } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
            tokenValue = state.tokenValue;

            key = parseLiteral(state, context);

            if (token & Token.IsAsync) {
              kind = 'method';
              objState |= ObjectState.Async;
            } else if (tokenValue === 'constructor') kind = 'constructor';
            else if (token === Token.GetKeyword) kind = 'get';
            else if (token === Token.SetKeyword) kind = 'set';
            value = parseMethodDeclaration(state, context, objState);
            objState |= ObjectState.Method;
          } else if (state.token & Token.IsIdentifier) {
            if (token & Token.IsAsync && (state.token === Token.GetKeyword || state.token === Token.SetKeyword))
              report(state, Errors.Unexpected);
            objState = (objState & ~ObjectState.Computed) | ObjectState.Method;

            if (token == Token.AsyncKeyword) objState |= ObjectState.Async;
            if (token === Token.GetKeyword) kind = 'get';
            else if (token === Token.SetKeyword) kind = 'set';
            else kind = 'method';
            key = parseIdentifier(state, context);
            value = parseMethodDeclaration(state, context, objState);
          }
        }
      } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
        tokenValue = state.tokenValue;
        key = parseLiteral(state, context);
        if (optional(state, context, Token.Colon)) {
          report(state, Errors.Unexpected);
        } else {
          if (tokenValue === 'constructor') kind = 'constructor';
          else kind = 'method';
          value = parseMethodDeclaration(state, context, objState);
          objState |= ObjectState.Method;
        }
      } else if (state.token === Token.LeftBracket) {
        key = parseComputedPropertyName(state, context);
        objState |= ObjectState.Computed & ~(ObjectState.Async | ObjectState.Generator);
        kind = 'method';
        objState |= ObjectState.Method;
        if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
        value = parseMethodDeclaration(state, context, objState);
      } else if (state.token & Token.Multiply) {
        kind = 'method';
        next(state, context);
        if (state.token & Token.IsIdentifier) {
          token = state.token;
          objState &= ~ObjectState.Async;

          key = parseIdentifier(state, context);
          if (state.token === Token.LeftParen) {
            value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
            objState |= ObjectState.Method | ObjectState.Generator;
          }
          if (token === Token.GetKeyword || token === Token.SetKeyword) report(state, Errors.Unexpected);
        } else if (state.token === <Token>Token.NumericLiteral || state.token === <Token>Token.StringLiteral) {
          key = parseLiteral(state, context);
          value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
          objState |= ObjectState.Method;
        } else if (state.token & Token.LeftBracket) {
          key = parseComputedPropertyName(state, context);
          value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
          objState |= ObjectState.Method | ObjectState.Computed;
        } else {
          report(state, Errors.Unexpected);
        }
      }

      optional(state, context, Token.Comma);
      body.push({
        type: 'MethodDefinition',
        kind,
        static: (objState & ObjectState.Static) !== 0,
        computed: (objState & ObjectState.Computed) !== 0,
        key,
        value
      });
    }
  }

  expect(state, context | Context.AllowPossibleRegEx, Token.RightBrace);
  return {
    type: 'ClassBody',
    body
  };
}

/**
 * Parses object literal
 *
 * @param state Parser state
 * @param context Context masks
 * @param scope Scope state
 * @param type Binding type
 */
function parseObjectLiteral(
  state: ParserState,
  context: Context,
  scope: ScopeState | number,
  type: Type
): ESTree.Expression {
  next(state, context);
  let key: ESTree.Expression | null = null;
  let token = state.token;
  let tokenValue = state.tokenValue;
  let kind = 'init';
  let value: any;
  let protoCount = 0;
  const properties: any[] = [];

  let objState = ObjectState.None;

  while (state.token !== Token.RightBrace) {
    if (state.token === Token.Ellipsis) {
      properties.push(parseSpreadElement(state, context));
    } else {
      if (state.token & Token.IsIdentifier) {
        {
          token = state.token;
          tokenValue = state.tokenValue;
          objState = ObjectState.None;
          key = parseIdentifier(state, context);
          if (state.token === Token.Comma || state.token === <Token>Token.RightBrace || state.token === Token.Assign) {
            // PropertyDefinition
            //    IdentifierReference
            //    CoverInitializedName
            //
            // CoverInitializedName
            //    IdentifierReference Initializer?
            objState |= ObjectState.Shorthand;
            // if (token !== Token.Eval || token !== Token.Arguments) {
            //    validateBindingIdentifier(state, context, type, token);
            //  }

            addVariable(state, context, scope, type, false, false, tokenValue);

            if (optional(state, context, Token.Assign)) {
              value = {
                type: 'AssignmentExpression',
                left: key,
                operator: '=',
                right: parseAssignmentExpression(state, context)
              };
            } else {
              value = key;
            }
          } else if (optional(state, context, Token.Colon)) {
            if (tokenValue === '__proto__') state.flags |= Flags.SeenPrototype;
            if (state.token & Token.IsIdentifier) {
              tokenValue = state.tokenValue;
              value = parseAssignmentExpression(state, context | Context.AllowPossibleRegEx);
              addVariable(state, context, scope, type, false, false, tokenValue);
            } else {
              value = parseAssignmentExpression(state, context);
            }
          } else if (state.token === Token.LeftBracket) {
            key = parseComputedPropertyName(state, context);
            if (token === Token.AsyncKeyword) {
              objState |= ObjectState.Async | ObjectState.Computed | ObjectState.Method;
            } else {
              if (token === Token.GetKeyword) kind = 'get';
              else if (token === Token.SetKeyword) kind = 'set';
              objState |= ObjectState.Computed & ~ObjectState.Method;
            }

            if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
            value = parseMethodDeclaration(state, context, objState);
          } else if (state.token === Token.LeftParen) {
            objState = objState | (ObjectState.Method & ~(ObjectState.Async | ObjectState.Generator));
            kind = 'init';
            value = parseMethodDeclaration(state, context, objState);
          } else if (token === Token.AsyncKeyword) {
            objState |= ObjectState.Async;
            if (optional(state, context, Token.Multiply)) objState |= ObjectState.Generator;
            if (state.token & Token.IsIdentifier) {
              key = parseIdentifier(state, context);
            } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
              key = parseLiteral(state, context);
            } else if (state.token === <Token>Token.LeftBracket) {
              key = parseComputedPropertyName(state, context);
            } else {
              report(state, Errors.Unexpected);
            }

            if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
            objState |= ObjectState.Method | ObjectState.Async;
            kind = 'init';
            value = parseMethodDeclaration(state, context, objState);
          } else if (token === Token.GetKeyword || token === Token.SetKeyword) {
            if (token === Token.GetKeyword) kind = 'get';
            else if (token === Token.SetKeyword) kind = 'set';
            else if (state.token !== Token.AsyncKeyword) report(state, Errors.Unexpected);

            if (optional(state, context, Token.Multiply)) report(state, Errors.Unexpected);
            if (state.token & Token.IsIdentifier) {
              key = parseIdentifier(state, context);
            } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
              key = parseLiteral(state, context);
            } else if (state.token === <Token>Token.LeftBracket) {
              key = parseComputedPropertyName(state, context);
            } else {
              report(state, Errors.Unexpected);
            }

            if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
            objState &= ~(ObjectState.Method | ObjectState.Computed | ObjectState.Generator | ObjectState.Async);
            value = parseMethodDeclaration(state, context, objState);
          }
        }
      } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
        tokenValue = state.tokenValue;
        key = parseLiteral(state, context);
        if (optional(state, context, Token.Colon)) {
          if (tokenValue === '__proto__') state.flags |= Flags.SeenPrototype;
          value = parseAssignmentExpression(state, context | Context.AllowPossibleRegEx);
          addVariable(state, context, scope, type, false, false, tokenValue);
        } else {
          if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
          value = parseMethodDeclaration(state, context, objState);
          objState |= ObjectState.Method;
        }
      } else if (state.token === Token.LeftBracket) {
        key = parseComputedPropertyName(state, context);
        objState |= ObjectState.Computed & ~(ObjectState.Async | ObjectState.Generator);
        kind = 'init';
        if (state.token === <Token>Token.Colon) {
          next(state, context);
          value = parseAssignmentExpression(state, context | Context.AllowPossibleRegEx);
        } else {
          objState |= ObjectState.Method;
          if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
          value = parseMethodDeclaration(state, context, objState);
        }
      } else if (state.token & Token.Multiply) {
        next(state, context);
        if (state.token & Token.IsIdentifier) {
          token = state.token;
          objState &= ~(ObjectState.Method | ObjectState.Async);
          key = parseIdentifier(state, context);
          if (state.token === Token.LeftParen) {
            value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
            objState |= ObjectState.Method | ObjectState.Generator;
          } else {
            if (token === Token.AsyncKeyword) report(state, Errors.Unexpected);
            if (token === Token.GetKeyword || token === Token.SetKeyword) report(state, Errors.Unexpected);
            if (token === Token.Colon) report(state, Errors.Unexpected);
            report(state, Errors.Unexpected);
          }
        } else if (state.token === <Token>Token.NumericLiteral || state.token === <Token>Token.StringLiteral) {
          key = parseLiteral(state, context);
          value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
          objState |= ObjectState.Method;
        } else if (state.token & Token.LeftBracket) {
          key = parseComputedPropertyName(state, context);
          value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
          objState |= ObjectState.Method | ObjectState.Computed;
        } else {
          report(state, Errors.Unexpected);
        }
      } else {
        report(state, Errors.Unexpected);
      }

      if (state.flags & Flags.SeenPrototype) ++protoCount;

      properties.push({
        type: 'Property',
        key,
        value,
        kind,
        computed: (objState & ObjectState.Computed) !== 0,
        method: (objState & ObjectState.Method) !== 0,
        shorthand: (objState & ObjectState.Shorthand) !== 0
      });
    }
    optional(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);

  if (protoCount === 1) state.flags &= ~Flags.SeenPrototype;

  return {
    type: 'ObjectExpression',
    properties
  };
}

function parseMethodDeclaration(state: ParserState, context: Context, objState: ObjectState): any {
  // Create a new function scope
  let functionScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let firstRestricted: Token | null = null;

  if (state.token & Token.IsIdentifier) {
    // Validate binding identifier
    validateBindingIdentifier(
      state,
      ((context | Context.YieldContext | Context.AwaitContext) ^ Context.YieldContext) |
        Context.AwaitContext |
        (context & Context.Strict)
        ? (objState & ObjectState.Generator) !== 0
          ? Context.YieldContext
          : Context.YieldContext
        : Context.Empty | (context & Context.Module)
        ? (objState & ObjectState.Generator) !== 0
          ? Context.AwaitContext
          : Context.AwaitContext
        : Context.Empty,
      Type.Variable
    );
    addVariableAndDeduplicate(state, context, functionScope, Type.Variable, true);
    functionScope = createSubScope(functionScope, ScopeType.BlockStatement);
    firstRestricted = state.token;
    id = parseIdentifier(state, context);
  }

  context =
    (context | Context.AwaitContext | Context.YieldContext | Context.InArgList) ^
    (Context.AwaitContext | Context.YieldContext | Context.InArgList);

  if (objState & ObjectState.Async) context |= Context.AwaitContext;
  if (objState & ObjectState.Generator) context |= Context.YieldContext;

  // Create a argument scope
  const paramScoop = createSubScope(functionScope, ScopeType.ArgumentList);

  const params = parseFormalParameters(
    state,
    context | Context.AllowNewTarget | Context.InMethod,
    paramScoop,
    Origin.ArgList
  );
  const body = parseFunctionBody(
    state,
    context | Context.AllowNewTarget | Context.Strict,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted
  );

  return {
    type: 'FunctionExpression',
    params,
    body,
    async: (objState & ObjectState.Async) !== 0,
    generator: (objState & ObjectState.Generator) !== 0,
    id
  };
}

/**
 * Parses either null or boolean literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BooleanLiteral)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBooleanLiteral(state: ParserState, context: Context): ESTree.Literal {
  const t = state.token;
  next(state, context);
  return {
    type: 'Literal',
    value: KeywordDescTable[t & Token.Type] === 'true'
  };
}

function parseNullLiteral(state: ParserState, context: Context): ESTree.Literal {
  next(state, context);
  return {
    type: 'Literal',
    value: null
  };
}

function parseThisExpression(state: ParserState, context: Context): ESTree.ThisExpression {
  next(state, context);
  return {
    type: 'ThisExpression'
  };
}

export function parseLiteral(state: ParserState, context: Context): ESTree.Literal {
  const tokenValue = state.tokenValue;
  next(state, context);
  return {
    type: 'Literal',
    value: tokenValue
  };
}

export function parseIdentifier(state: ParserState, context: Context): ESTree.Identifier {
  const tokenValue = state.tokenValue;
  next(state, context);
  return {
    type: 'Identifier',
    name: tokenValue
  };
}

/**
 * Parse regular expression literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseRegularExpressionLiteral(state: ParserState, context: Context): ESTree.RegExpLiteral {
  const { tokenRegExp: regex, tokenValue: value } = state;
  next(state, context);
  return {
    type: 'Literal',
    value,
    regex
  };
}

/**
 * Parses BigInt literal (stage 3 proposal)
 *
 * @see [Link](https://tc39.github.io/proposal-bigint/)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBigIntLiteral(state: ParserState, context: Context): ESTree.BigIntLiteral {
  const { tokenRaw: raw, tokenValue: value } = state;
  next(state, context);
  return {
    type: 'Literal',
    value,
    bigint: raw,
    raw
  };
}
