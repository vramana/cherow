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
/**
 * Parse a module body, function body, script body, etc.
 */
export function parseModuleItem(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  // Prime the scanner
  next(state, context | Context.AllowPossibleRegEx);
  const statements: ESTree.Statement[] = [];
  while (state.token === Token.StringLiteral) {
    const tokenValue = state.tokenValue;
    if (!(context & Context.Strict) && tokenValue.length === 10 && tokenValue === 'use strict') {
      context |= Context.Strict;
    }
    statements.push(parseDirective(state, context, scope));
  }

  while (state.token !== Token.EndOfSource) {
    statements.push(parseModuleItemList(state, context, scope));
  }

  return statements;
}

/**
 * Parse a module body, function body, script body, etc.
 */
export function parseStatementList(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  // Prime the scanner
  next(state, context | Context.AllowPossibleRegEx);
  const statements: ESTree.Statement[] = [];
  while (state.token === Token.StringLiteral) {
    const tokenValue = state.tokenValue;
    if (!(context & Context.Strict) && tokenValue.length === 10 && tokenValue === 'use strict') {
      context |= Context.Strict;
    }
    statements.push(parseDirective(state, context, scope));
  }

  while (state.token !== Token.EndOfSource) {
    statements.push(parseStatementListItem(state, context, scope));
  }

  return statements;
}

/**
 * Parse directive node
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseDirective(state: ParserState, context: Context, scope: ScopeState): any {
  const { startIndex } = state;
  if ((context & Context.OptionsDirectives) < 1) return parseStatementListItem(state, context, scope);
  const directive = state.tokenRaw.slice(1, -1);
  const expression = parseExpression(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, startIndex, {
    type: 'ExpressionStatement',
    expression,
    directive
  });
}

/**
 * Parses either async function or assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser object
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
    : parseAssignmentExpression(state, context);
}

function parseStatementListItem(state: ParserState, context: Context, scope: ScopeState): any {
  state.assignable = state.bindable = true;
  switch (state.token) {
    case Token.ExportKeyword:
      report(state, Errors.InvalidImportExportSloppy, KeywordDescTable[state.token & Token.Type]);
    case Token.ImportKeyword:
      return (context & Context.OptionsNext) !== 0
        ? parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.AllowAsLabelled)
        : report(state, Errors.InvalidImportExportSloppy, KeywordDescTable[state.token & Token.Type]);
    case Token.FunctionKeyword:
      return parseFunctionDeclaration(state, context, scope, Origin.Declaration, false);
    case Token.ClassKeyword:
      return parseClassDeclaration(state, context, scope);
    case Token.ConstKeyword:
      return parseLexicalDeclaration(state, context, Type.Const, Origin.Statement, scope);
    case Token.LetKeyword:
      return parseLetOrExpressionStatement(state, context, scope);
    case Token.AsyncKeyword:
      return parseAsyncFunctionOrExpressionStatement(state, context, scope);
    default:
      return parseStatement(
        state,
        (context | Context.TopLevel) ^ Context.TopLevel,
        scope,
        LabelledState.AllowAsLabelled
      );
  }
}

/**
 * Parses either an async function declaration or an expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionOrExpressionStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ReturnType<typeof parseFunctionDeclaration | typeof parseExpressionOrLabelledStatement> {
  return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
    ? parseFunctionDeclaration(state, context, scope, Origin.AsyncFunction, true)
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
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
function parseStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  label: LabelledState
): ESTree.Statement {
  const { token } = state;
  if (
    (token & Token.IsIdentifier) === Token.IsIdentifier ||
    (token & Token.Contextual) === Token.Contextual ||
    (token & Token.IsYield) === Token.IsYield ||
    token === Token.EscapedKeyword ||
    token === Token.EscapedStrictReserved
  ) {
    if ((token & Token.IsAsync) === Token.IsAsync) {
      if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
        report(state, Errors.AsyncFunctionInSingleStatementContext);
      }
    }
    return parseExpressionOrLabelledStatement(state, context, scope, label);
  }

  if ((token & Token.Keyword) === Token.Keyword) {
    switch (token) {
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
      case Token.ForKeyword:
        return parseForStatement(state, context, scope);
      case Token.FunctionKeyword:
        report(state, context & Context.Strict ? Errors.StrictFunction : Errors.SloppyFunction);
      case Token.ClassKeyword:
        report(state, Errors.ForbiddenAsStatement, KeywordDescTable[token & Token.Type]);
      default: // ignore
    }
  }

  switch (token) {
    case Token.Semicolon:
      return parseEmptyStatement(state, context);
    case Token.LeftBrace:
      return parseBlockStatement(
        state,
        (context | Context.TopLevel) ^ Context.TopLevel,
        createSubScope(scope, ScopeType.BlockStatement)
      );

    default:
      return parseExpressionStatement(state, context);
  }
}

/**
 * Parses either expression or labelled statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-LabelledStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseExpressionStatement(state: ParserState, context: Context): ESTree.ExpressionStatement {
  const { startIndex } = state;
  const expr: ESTree.Expression = parseExpression(
    state,
    (context | Context.DisallowInContext) ^ Context.DisallowInContext
  );
  consumeSemicolon(state, context);
  return finishNode(state, context, startIndex, {
    type: 'ExpressionStatement',
    expression: expr
  });
}

function parseModuleItemList(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement {
  state.assignable = state.bindable = true;
  switch (state.token) {
    case Token.ExportKeyword:
      return parseExportDeclaration(state, context, scope);
    case Token.ImportKeyword:
      // 'Dynamic Import' or meta property disallowed here
      if (!(context & Context.OptionsNext && lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true))) {
        return parseImportDeclaration(state, context, scope);
      }
    // falls through
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
  const { startIndex: start } = state;
  expect(state, context, Token.ExportKeyword);
  const specifiers: ESTree.ExportSpecifier[] = [];

  let declaration: any = null;
  let source: ESTree.Literal | null = null;
  if (optional(state, context | Context.AllowPossibleRegEx, Token.DefaultKeyword)) {
    switch (state.token) {
      // export default HoistableDeclaration[Default]
      case Token.FunctionKeyword: {
        declaration = parseHoistableFunctionDeclaration(state, context | Context.RequireIdentifier, scope, true, false);
        break;
      }

      // export default ClassDeclaration[Default]
      case Token.ClassKeyword:
        declaration = parseHostedClassDeclaration(state, context | Context.RequireIdentifier, scope, true);
        break;

      // export default HoistableDeclaration[Default]
      case Token.AsyncKeyword:
        declaration = parseAsyncFunctionOrAssignmentExpression(state, context | Context.RequireIdentifier, scope, true);
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
    addVariable(state, context, scope, Type.None, Origin.None, true, false, '*default*');

    return finishNode(state, context, start, {
      type: 'ExportDefaultDeclaration',
      declaration
    });
  }

  switch (state.token) {
    case Token.Multiply: {
      next(state, context);
      expect(state, context, Token.FromKeyword);
      if (state.token !== <Token>Token.StringLiteral) report(state, Errors.Unexpected);
      source = parseLiteral(state, context);
      consumeSemicolon(state, context);
      return finishNode(state, context, start, {
        type: 'ExportAllDeclaration',
        source
      });
    }
    case Token.LeftBrace: {
      const exportedNames: string[] = [];
      const exportedBindings: string[] = [];

      expect(state, context, Token.LeftBrace);
      while (state.token & Token.IsIdentifier) {
        const tokenValue = state.tokenValue;
        const local = parseIdentifier(state, context);
        let exported: any;
        if (state.token === <Token>Token.AsKeyword) {
          next(state, context);
          if ((state.token & Token.IsIdentifier) === 0) report(state, Errors.InvalidKeywordAsAlias);
          exportedNames.push(state.tokenValue);
          exportedBindings.push(tokenValue);
          exported = parseIdentifier(state, context);
        } else {
          exportedNames.push(state.tokenValue);
          exportedBindings.push(state.tokenValue);
          exported = local;
        }

        specifiers.push(
          finishNode(state, context, start, {
            type: 'ExportSpecifier',
            local,
            exported
          })
        );

        if (state.token !== <Token>Token.RightBrace) expect(state, context, Token.Comma);
      }

      expect(state, context, Token.RightBrace);

      if (optional(state, context, Token.FromKeyword)) {
        //  The left hand side can't be a keyword where there is no
        // 'from' keyword since it references a local binding.
        if (state.token !== <Token>Token.StringLiteral) report(state, Errors.InvalidExportImportSource, 'Export');
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
      if (checkIfExistInLexicalBindings(state, context, scope, Origin.None, false))
        report(state, Errors.DuplicateExportBinding, 'let');
      break;
    case Token.ConstKeyword:
      declaration = parseLexicalDeclaration(state, context, Type.Const, Origin.Export, scope);
      if (checkIfExistInLexicalBindings(state, context, scope, Origin.None, false))
        report(state, Errors.DuplicateExportBinding, 'const');
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatement(state, context, Type.Variable, Origin.Export, scope);
      break;
    case Token.FunctionKeyword:
      declaration = parseHoistableFunctionDeclaration(state, context, scope, true, false);
      break;
    case Token.AsyncKeyword:
      next(state, context);
      if ((state.flags & Flags.NewLine) === 0 && (state.token as Token) === Token.FunctionKeyword) {
        declaration = parseHoistableFunctionDeclaration(state, context, scope, false, true);
        break;
      }
    // falls through
    default:
      report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);
  }

  return finishNode(state, context, start, {
    type: 'ExportNamedDeclaration',
    source,
    specifiers,
    declaration
  });
}

/**
 * Parse import declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseImportDeclaration(state: ParserState, context: Context, scope: ScopeState): any {
  const { startIndex: start } = state;
  expect(state, context, Token.ImportKeyword);

  let source: ESTree.Literal;
  const specifiers: ESTree.Specifiers[] = [];

  // 'import' ModuleSpecifier ';'
  if (state.token & Token.IsIdentifier) {
    // V8: 'VariableMode::kConst',
    // Cherow: 'Type.Const'
    validateBindingIdentifier(state, context, Type.Const);
    addVariableAndDeduplicate(state, context, scope, Type.None, Origin.None, false, state.tokenValue);
    specifiers.push(
      finishNode(state, context, start, {
        type: 'ImportDefaultSpecifier',
        local: parseIdentifier(state, context)
      })
    );

    // NameSpaceImport
    if (optional(state, context, Token.Comma)) {
      if (state.token === Token.Multiply) {
        parseImportNamespace(state, context, scope, start, specifiers);
      } else if (state.token === Token.LeftBrace) {
        parseImportSpecifierOrNamedImports(state, context, scope, start, specifiers);
      } else report(state, Errors.InvalidDefaultImport);
    }

    source = parseModuleSpecifier(state, context);

    // 'import' ModuleSpecifier ';'
  } else if (state.token === Token.StringLiteral) {
    source = parseLiteral(state, context);
  } else {
    if (state.token === Token.Multiply) {
      parseImportNamespace(state, context, scope, start, specifiers);
    } else if (state.token === Token.LeftBrace) {
      parseImportSpecifierOrNamedImports(state, context, scope, start, specifiers);
    } else report(state, Errors.Unexpected);

    source = parseModuleSpecifier(state, context);
  }

  consumeSemicolon(state, context);

  return finishNode(state, context, start, {
    type: 'ImportDeclaration',
    specifiers,
    source
  });
}

/**
 * Parse named imports or import specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NamedImports)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportSpecifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseImportSpecifierOrNamedImports(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  start: number,
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

  while (state.token & Token.IsIdentifier) {
    const { token, tokenValue } = state;
    const imported = parseIdentifier(state, context);
    let local: ESTree.Identifier;
    if (optional(state, context, Token.AsKeyword)) {
      if ((state.token & Token.IsIdentifier) === 0) report(state, Errors.InvalidKeywordAsAlias);
      validateBindingIdentifier(state, context, Type.Const);
      addVariableAndDeduplicate(state, context, scope, Type.Const, Origin.None, false, state.tokenValue);
      local = parseIdentifier(state, context);
    } else {
      // An import name that is a keyword is a syntax error if it is not followed
      // by the keyword 'as'.
      validateBindingIdentifier(state, context, Type.Const, token);
      addVariableAndDeduplicate(state, context, scope, Type.Const, Origin.None, false, tokenValue);
      local = imported;
    }

    specifiers.push(
      finishNode(state, context, start, {
        type: 'ImportSpecifier',
        local,
        imported
      })
    );

    if (state.token !== <Token>Token.RightBrace) expect(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);
}

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NameSpaceImport)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseImportNamespace(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  start: number,
  specifiers: ESTree.Specifiers[]
): void {
  // NameSpaceImport:
  //  * as ImportedBinding
  next(state, context);
  expect(state, context, Token.AsKeyword);
  validateBindingIdentifier(state, context, Type.Const);
  addVariable(state, context, scope, Type.Const, Origin.None, true, false, state.tokenValue);
  const local = parseIdentifier(state, context);
  specifiers.push(
    finishNode(state, context, start, {
      type: 'ImportNamespaceSpecifier',
      local
    })
  );
}

/**
 * Parse module specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleSpecifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleSpecifier(state: ParserState, context: Context): ESTree.Literal {
  // ModuleSpecifier :
  //   StringLiteral
  expect(state, context, Token.FromKeyword);
  if (state.token !== Token.StringLiteral) report(state, Errors.InvalidExportImportSource, 'Import');
  return parseLiteral(state, context);
}

/**
 * Parses block statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Block)
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseBlockStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.BlockStatement {
  const body: ESTree.Statement[] = [];
  const { startIndex: start } = state;
  next(state, context);
  while (state.token !== Token.RightBrace) {
    body.push(parseStatementListItem(state, context, scope));
  }
  expect(state, context | Context.AllowPossibleRegEx, Token.RightBrace);

  return finishNode(state, context, start, {
    type: 'BlockStatement',
    body
  });
}

/**
 * Parses empty statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-EmptyStatement)
 *
 * @param state  Parser object
 * @param context Context masks
 */
export function parseEmptyStatement(state: ParserState, context: Context): ESTree.EmptyStatement {
  const { startIndex } = state;
  next(state, context | Context.AllowPossibleRegEx);
  return finishNode(state, context, startIndex, {
    type: 'EmptyStatement'
  });
}

/**
 * Parses throw statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ThrowStatement)
 *
 * @param state  Parser object
 * @param context Context masks
 */
export function parseThrowStatement(state: ParserState, context: Context): ESTree.ThrowStatement {
  const { startIndex } = state;
  next(state, context);
  if (state.flags & Flags.NewLine) report(state, Errors.NewlineAfterThrow);
  const argument: ESTree.Expression = parseExpression(
    state,
    (context | Context.DisallowInContext) ^ Context.DisallowInContext
  );
  consumeSemicolon(state, context);
  return finishNode(state, context, startIndex, {
    type: 'ThrowStatement',
    argument
  });
}

/**
 * Parses the if statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-if-statement)
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseIfStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.IfStatement {
  const { startIndex } = state;
  next(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const test = parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);
  expect(state, context, Token.RightParen);
  const consequent = parseConsequentOrAlternate(state, context, scope);
  const alternate = optional(state, context, Token.ElseKeyword)
    ? parseConsequentOrAlternate(state, context, scope)
    : null;
  return finishNode(state, context, startIndex, {
    type: 'IfStatement',
    test,
    consequent,
    alternate
  });
}

/**
 * Parse either consequent or alternate. Supports AnnexB.
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */

function parseConsequentOrAlternate(state: ParserState, context: Context, scope: ScopeState): any {
  return context & Context.Strict || (context & Context.OptionsWebCompat) === 0 || state.token !== Token.FunctionKeyword
    ? parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow)
    : parseFunctionDeclaration(state, context, scope, Origin.Statement, false);
}

/**
 * Parses switch statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SwitchStatement)
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
function parseSwitchStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.SwitchStatement {
  const { startIndex: start } = state;
  next(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const discriminant = parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);
  expect(state, context, Token.RightParen);
  expect(state, context, Token.LeftBrace);
  const cases: ESTree.SwitchCase[] = [];
  let seenDefault = false;
  const switchScope = createSubScope(scope, ScopeType.SwitchStatement);
  const previousSwitchStatement = state.switchStatement;
  state.switchStatement = LabelState.Iteration;
  while (state.token !== Token.RightBrace) {
    let test: ESTree.Expression | null = null;
    const { startIndex: subStart } = state;
    if (optional(state, context, Token.CaseKeyword)) {
      test = parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);
    } else {
      expect(state, context, Token.DefaultKeyword);
      if (seenDefault) report(state, Errors.Unexpected);
      seenDefault = true;
    }
    cases.push(parseCaseOrDefaultClauses(state, context, test, switchScope, subStart));
  }
  state.switchStatement = previousSwitchStatement;
  expect(state, context, Token.RightBrace);
  return finishNode(state, context, start, {
    type: 'SwitchStatement',
    discriminant,
    cases
  });
}

/**
 * Parses return statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ReturnStatement)
 *
 * @param state Parser object
 * @param context Context masks
 */
export function parseReturnStatement(state: ParserState, context: Context): ESTree.ReturnStatement {
  if ((context & (Context.OptionsGlobalReturn | Context.AllowReturn)) < 1) report(state, Errors.IllegalReturn);
  const { startIndex } = state;
  next(state, context | Context.AllowPossibleRegEx);
  const argument =
    (state.token & Token.ASI) < 1 && (state.flags & Flags.NewLine) < 1
      ? parseExpression(
          state,
          (context | Context.DisallowInContext) ^ (Context.DisallowInContext | Context.AllowReturn)
        )
      : null;
  consumeSemicolon(state, context);
  return finishNode(state, context, startIndex, {
    type: 'ReturnStatement',
    argument
  });
}

/**
 * Parses while statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-WhileStatement)
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseWhileStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.WhileStatement {
  const { startIndex } = state;
  next(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const test = parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);
  expect(state, context, Token.RightParen);
  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
  state.iterationStatement = previousIterationStatement;
  return finishNode(state, context, startIndex, {
    type: 'WhileStatement',
    test,
    body
  });
}

/**
 * Parses the continue statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ContinueStatement)
 *
 * @param state  Parser object
 * @param context Context masks
 */
export function parseContinueStatement(state: ParserState, context: Context): ESTree.ContinueStatement {
  const { startIndex } = state;
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
  return finishNode(state, context, startIndex, {
    type: 'ContinueStatement',
    label
  });
}

/**
 * Parses the break statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BreakStatement)
 *
 * @param state  Parser object
 * @param context Context masks
 */
export function parseBreakStatement(state: ParserState, context: Context): ESTree.BreakStatement {
  const { startIndex } = state;
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
  return finishNode(state, context, startIndex, {
    type: 'BreakStatement',
    label
  });
}

/**
 * Parses with statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-WithStatement)
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseWithStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.WithStatement {
  const { startIndex } = state;
  if (context & Context.Strict) report(state, Errors.StrictModeWith);
  next(state, context);
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const object = parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);
  expect(state, context, Token.RightParen);
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
  return finishNode(state, context, startIndex, {
    type: 'WithStatement',
    object,
    body
  });
}

/**
 * Parses the debugger statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-DebuggerStatement)
 *
 * @param state  Parser object
 * @param context Context masks
 */
export function parseDebuggerStatement(state: ParserState, context: Context): ESTree.DebuggerStatement {
  const { startIndex } = state;
  next(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, startIndex, {
    type: 'DebuggerStatement'
  });
}

/**
 * Parses try statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseTryStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.TryStatement {
  const { startIndex } = state;
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
  return finishNode(state, context, startIndex, {
    type: 'TryStatement',
    block,
    handler,
    finalizer
  });
}

/**
 * Parses catch block
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Catch)
 *
 * @param state Parser object
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
  const { startIndex } = state;
  if (optional(state, context, Token.LeftParen)) {
    const catchScope = createSubScope(scope, ScopeType.CatchClause);
    param = parseBindingIdentifierOrPattern(state, context, catchScope, Type.ArgList, Origin.CatchClause, false);
    if (checkIfExistInLexicalBindings(state, context, catchScope, Origin.None, true))
      report(state, Errors.InvalidDuplicateBinding, state.tokenValue);
    expect(state, context, Token.RightParen);
    secondScope = createSubScope(catchScope, ScopeType.BlockStatement);
  }

  const body = parseBlockStatement(state, context, secondScope);

  return finishNode(state, context, startIndex, {
    type: 'CatchClause',
    param,
    body
  });
}
/**
 * Parses do while statement
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseDoWhileStatement(state: ParserState, context: Context, scope: ScopeState): any {
  const { startIndex } = state;
  expect(state, context, Token.DoKeyword);
  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
  state.iterationStatement = previousIterationStatement;
  expect(state, context, Token.WhileKeyword);
  expect(state, context, Token.LeftParen);
  const test = parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);
  expect(state, context, Token.RightParen);
  optional(state, context, Token.Semicolon);
  return finishNode(state, context, startIndex, {
    type: 'DoWhileStatement',
    body,
    test
  });
}

/**
 * Parses either default clause or case clauses
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CaseClauses)
 * @see [Link](https://tc39.github.io/ecma262/#prod-DefaultClause)
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseCaseOrDefaultClauses(
  state: ParserState,
  context: Context,
  test: ESTree.Expression | null,
  scope: ScopeState,
  start: number
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
  return finishNode(state, context, start, {
    type: 'SwitchCase',
    test,
    consequent
  });
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
  const { startIndex } = state;
  next(state, context);

  const forAwait = context & Context.AwaitContext ? optional(state, context, Token.AwaitKeyword) : false;
  scope = createSubScope(scope, ScopeType.ForStatement);

  expect(state, context, Token.LeftParen);

  let init: any = null;
  let declarations: any = null;
  let test: ESTree.Expression | null = null;
  let update: ESTree.Expression | null = null;
  let sequencePos: any = null;
  let right;
  let isPattern = false;

  if (state.token !== Token.Semicolon) {
    if ((state.token & Token.IsVarDecl) > 0) {
      const kind = KeywordDescTable[state.token & Token.Type];
      const { startIndex: varStart } = state;
      if (optional(state, context, Token.VarKeyword)) {
        init = finishNode(state, context, varStart, {
          type: 'VariableDeclaration',
          kind,
          declarations: parseVariableDeclarationList(
            state,
            context | Context.DisallowInContext,
            Type.Variable,
            Origin.ForStatement,
            false,
            scope
          )
        } as any);
      } else if (state.token === Token.LetKeyword) {
        if (lookAheadOrScan(state, context, isLexical, false)) {
          init = finishNode(state, context, varStart, {
            type: 'VariableDeclaration',
            kind,
            declarations: parseVariableDeclarationList(state, context, Type.Let, Origin.ForStatement, true, scope)
          } as any);
        } else {
          isPattern = true;
          init = acquireGrammar(state, context | Context.DisallowInContext, 0, parseAssignmentExpression);
        }
      } else if (optional(state, context, Token.ConstKeyword)) {
        declarations = parseVariableDeclarationList(state, context, Type.Const, Origin.ForStatement, false, scope);
        if (checkIfExistInLexicalBindings(state, context, scope, Origin.None, true))
          report(state, Errors.InvalidDuplicateBinding, state.tokenValue);
        init = finishNode(state, context, varStart, {
          type: 'VariableDeclaration',
          kind,
          declarations
        } as any);
      }
    } else {
      sequencePos = state.startIndex;
      isPattern = state.token === Token.LeftBracket || state.token === Token.LeftBrace;
      init = acquireGrammar(state, context | Context.DisallowInContext, 0, parseAssignmentExpression);
    }
  }

  if (optional(state, context | Context.AllowPossibleRegEx, Token.OfKeyword)) {
    if (state.inCatch) report(state, Errors.Unexpected);
    if (isPattern) {
      if (!state.assignable || init.type === 'AssignmentExpression') {
        report(state, Errors.InvalidLHSInForLoop);
      }
      reinterpret(state, init);
    }
    right = parseAssignmentExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);
    expect(state, context, Token.RightParen);
    const previousIterationStatement = state.iterationStatement;
    state.iterationStatement = LabelState.Iteration;
    const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
    state.iterationStatement = previousIterationStatement;
    return finishNode(state, context, startIndex, {
      type: 'ForOfStatement',
      body,
      left: init,
      right,
      await: forAwait
    });
  }

  if (optional(state, context, Token.InKeyword)) {
    if (isPattern) {
      if (!state.assignable || init.type === 'AssignmentExpression') {
        report(state, Errors.InvalidLHSInForIn);
      }
      reinterpret(state, init);
    }
    right = parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);
    expect(state, context, Token.RightParen);
    const previousIterationStatement = state.iterationStatement;
    state.iterationStatement = LabelState.Iteration;
    const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
    state.iterationStatement = previousIterationStatement;
    return finishNode(state, context, startIndex, {
      type: 'ForInStatement',
      body,
      left: init,
      right
    });
  }

  if (state.token === Token.Comma) {
    init = parseSequenceExpression(
      state,
      (context | Context.DisallowInContext) ^ Context.DisallowInContext,
      init,
      sequencePos
    );
  }

  expect(state, context, Token.Semicolon);

  if (state.token !== Token.Semicolon) {
    test = parseExpression(state, context);
  }

  expect(state, context, Token.Semicolon);

  if (state.token !== Token.RightParen)
    update = parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext);

  expect(state, context, Token.RightParen);

  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
  state.iterationStatement = previousIterationStatement;

  return finishNode(state, context, startIndex, {
    type: 'ForStatement',
    body,
    init,
    test,
    update
  });
}
/**
 * Parses either expression or labelled statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-LabelledStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseExpressionOrLabelledStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  label: LabelledState
): any {
  const { token, tokenValue, startIndex } = state;
  const expr: ESTree.Expression = parseExpression(
    state,
    (context | Context.DisallowInContext) ^ Context.DisallowInContext
  );
  if ((token & Token.Keyword || Token.EscapedStrictReserved) && state.token === Token.Colon) {
    next(state, context | Context.AllowPossibleRegEx);
    validateBindingIdentifier(state, context, Type.None, token);
    if (getLabel(state, `@${tokenValue}`, false, true)) {
      report(state, Errors.LabelRedeclaration, tokenValue);
    }
    addLabel(state, tokenValue);
    let body: any = null;
    if (
      (state.token as Token) === Token.FunctionKeyword &&
      (context & Context.Strict) === 0 &&
      context & Context.OptionsWebCompat &&
      label === LabelledState.AllowAsLabelled
    ) {
      body = parseFunctionDeclaration(state, context, scope, Origin.Statement, false);
    } else body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, label);
    state.labelDepth--;
    return finishNode(state, context, startIndex, {
      type: 'LabeledStatement',
      label: expr as ESTree.Identifier,
      body
    });
  }
  consumeSemicolon(state, context);
  return finishNode(state, context, startIndex, {
    type: 'ExpressionStatement',
    expression: expr
  });
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
  const { tokenValue: name, token, startIndex } = state;
  if ((token & Token.IsIdentifier) === 0 && token !== Token.EscapedStrictReserved) report(state, Errors.Unexpected);

  // TODO: (fkleuver) This should be tokens in 'token.ts', and validated inside 'validateBindingIdentifier'
  if (context & Context.Strict) {
    if (nameIsArgumentsOrEval(name) || name === 'enum') report(state, Errors.Unexpected);
  } else if (name === 'enum') report(state, Errors.Unexpected);

  validateBindingIdentifier(state, context, type);
  addVariable(
    state,
    context,
    scope,
    type,
    origin,
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

  next(state, context | Context.AllowPossibleRegEx);
  return finishNode(state, context, startIndex, {
    type: 'Identifier',
    name
  });
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
  const { startIndex: start } = state;
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return finishNode(state, context, start, {
    type: 'RestElement',
    argument
  } as any);
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
  const { startIndex: start } = state;
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return finishNode(state, context, start, {
    type: 'RestElement',
    argument
  } as any);
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
  const { startIndex: start } = state;
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
  return finishNode(state, context, start, {
    type: 'ArrayPattern',
    elements
  } as ESTree.ArrayPattern);
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
  const { startIndex: start } = state;
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

  return finishNode(state, context, start, {
    type: 'ObjectPattern',
    properties
  });
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
export function parseAssignmentPattern(state: ParserState, context: Context, left: ESTree.Pattern, start: number): any {
  return finishNode(state, context, start, {
    type: 'AssignmentPattern',
    left,
    right: secludeGrammar(state, context, 0, parseAssignmentExpression)
  } as any);
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
  const { startIndex: start } = state;
  const left: any = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return !optional(state, context, Token.Assign)
    ? left
    : finishNode(state, context, start, {
        type: 'AssignmentPattern',
        left,
        right: secludeGrammar(state, context, 0, parseAssignmentExpression)
      });
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
  const key: ESTree.Expression = secludeGrammar(
    state,
    (context | Context.DisallowInContext) ^ Context.DisallowInContext,
    0,
    parseAssignmentExpression
  );
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
  const { token, startIndex: start } = state;
  let key: ESTree.Literal | ESTree.Identifier | ESTree.Expression | null;
  let value;
  let computed = false;
  let shorthand = false;

  // single name binding
  if ((token & Token.Keyword) === Token.Keyword) {
    const { tokenValue, token } = state;
    key = parseIdentifier(state, context);
    shorthand = !optional(state, context, Token.Colon);
    if (shorthand) {
      validateBindingIdentifier(state, context, type, token);
      if (origin === Origin.Export) {
        addToExportedNamesAndCheckForDuplicates(state, state.tokenValue);
        addToExportedBindings(state, state.tokenValue);
      }
      addVariable(state, context, scope, type, origin, false, false, tokenValue);
      const hasInitializer = optional(state, context, Token.Assign);
      value = hasInitializer ? parseAssignmentPattern(state, context, key, start) : key;
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

  return finishNode(state, context, start, {
    type: 'Property',
    kind: 'init',
    key,
    computed,
    value,
    method: false,
    shorthand
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
  next(state, context);

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
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.Unexpected);

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

function parseHostedClassDeclaration(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  isNotDefault: boolean
): ESTree.ClassDeclaration {
  const { startIndex: start } = state;
  next(state, context);
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
  next(state, context);

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
 * Parse formal parameters
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 * @param origin Origin
 */

export function parseFormalParameters(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  objState: Modifiers
): any {
  /**
   * FormalParameterList :
   *    [empty]
   *       FunctionRestParameter
   *      FormalsList
   *     FormalsList , FunctionRestParameter
   *
   *     FunctionRestParameter :
   *      ... BindingIdentifier
   *
   *     FormalsList :
   *      FormalParameter
   *     FormalsList , FormalParameter
   *
   *     FormalParameter :
   *      BindingElement
   *
   *     BindingElement :
   *      SingleNameBinding
   *   BindingPattern Initializeropt
   *
   */
  expect(state, context, Token.LeftParen);
  const params: any[] = [];
  state.flags &= ~Flags.SimpleParameterList;
  context = context | Context.InArgList;
  let hasComplexArgs = false;
  const { startIndex: start } = state;
  while (state.token !== Token.RightParen) {
    if (state.token === Token.Ellipsis) {
      hasComplexArgs = true;
      if (objState & Modifiers.Setter) report(state, Errors.BadSetterRestParameter);
      params.push(parseRestElement(state, context, scope, Type.ArgList, Origin.None));
      break; //rest parameter must be the last
    }

    if ((state.token & Token.Identifier) !== Token.Identifier) hasComplexArgs = true;
    let left: any = parseBindingIdentifierOrPattern(state, context, scope, Type.ArgList, origin, false);
    if (optional(state, context | Context.AllowPossibleRegEx, Token.Assign)) {
      hasComplexArgs = true;
      if (context & (Context.Module | Context.AwaitContext) && state.token & Token.IsAwait)
        report(state, Errors.AwaitInParameter);
      if (context & (Context.Strict | Context.YieldContext) && state.token & Token.IsYield)
        report(state, Errors.YieldInParameter);
      left = parseAssignmentPattern(state, context, left, start);
    }
    params.push(left);

    if (optional(state, context, Token.Comma)) {
      if ((state.token as Token) === Token.Comma) break;
    }
  }
  if (objState & Modifiers.Setter && params.length !== 1) {
    report(state, Errors.AccessorWrongArgs, 'Setter', 'one', '');
  }

  if (objState & Modifiers.Getter && params.length > 0) {
    report(state, Errors.AccessorWrongArgs, 'Getter', 'no', 's');
  }
  expect(state, context, Token.RightParen);
  if (hasComplexArgs || (context & (Context.Strict | Context.InMethod)) > 0) {
    validateFunctionArgs(state, scope.lex, hasComplexArgs);
  }
  if (hasComplexArgs) state.flags |= Flags.SimpleParameterList;
  return params;
}

/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param parser Parser object
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
  const { startIndex: start } = state;
  expect(state, context, Token.Ellipsis);
  if (context & Context.ParentheziedContext && state.token & Token.IsAwait) state.flags |= Flags.HasAwait;
  const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, false);
  return finishNode(state, context, start, {
    type: 'RestElement',
    argument
  } as any);
}

/**
 * Parse function body
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope instance
 */

export function parseFunctionBody(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  firstRestricted: string | undefined,
  origin: Origin
): ESTree.BlockStatement {
  const body: any[] = [];
  const { startIndex: start } = state;
  expect(state, context, Token.LeftBrace);

  const isStrict = (context & Context.Strict) === Context.Strict;

  context = context | (Context.TopLevel | Context.AllowReturn);

  while (state.token === Token.StringLiteral) {
    if (state.tokenValue.length === 10 && state.tokenValue === 'use strict') {
      if (state.flags & Flags.SimpleParameterList) report(state, Errors.IllegalUseStrict);
      context |= Context.Strict;
    }
    body.push(parseDirective(state, context, scope));
  }
  if (context & Context.Strict) {
    if ((state.flags & Flags.HasStrictReserved) === Flags.HasStrictReserved)
      report(state, Errors.UnexpectedStrictReserved);
    if (state.flags & Flags.StrictEvalArguments) {
      report(state, Errors.StrictEvalArguments);
    }
    if ((firstRestricted && firstRestricted === 'eval') || firstRestricted === 'arguments')
      report(state, Errors.StrictFunctionName);
  }

  state.flags =
    (state.flags | (Flags.StrictEvalArguments | Flags.HasStrictReserved)) ^
    (Flags.StrictEvalArguments | Flags.HasStrictReserved);

  if (!isStrict && (context & Context.Strict) > 0) validateFunctionArgs(state, scope.lex['@'], false);

  if (state.token !== Token.RightBrace) {
    const previousSwitchStatement = state.switchStatement;
    const previousIterationStatement = state.iterationStatement;

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

  expect(state, origin & Origin.Declaration ? context | Context.AllowPossibleRegEx : context, Token.RightBrace);

  // Either '=' or '=>' after blockstatement
  if (state.token === Token.Assign || state.token === Token.Arrow) report(state, Errors.Unexpected);

  return finishNode(state, context, start, {
    type: 'BlockStatement',
    body
  });
}

/**
 * Parses variable statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param state Parser object
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
  const { token, startIndex: start } = state;
  next(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
  consumeSemicolon(state, context);
  return finishNode(state, context, start, {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[token & Token.Type],
    declarations
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
  next(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
  if (checkIfExistInLexicalBindings(state, context, scope, origin, false)) report(state, Errors.Unexpected);
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

export function parseExpression(state: ParserState, context: Context): any {
  const { startIndex: start } = state;
  const expr = secludeGrammar(state, context, 0, parseAssignmentExpression);
  if (state.token !== Token.Comma) return expr;
  return parseSequenceExpression(state, context, expr, start);
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
  left: ESTree.Expression,
  start: number
): ESTree.SequenceExpression {
  const expressions: ESTree.Expression[] = [left];
  while (optional(state, context | Context.AllowPossibleRegEx, Token.Comma)) {
    expressions.push(secludeGrammar(state, context, 0, parseAssignmentExpression));
  }
  return finishNode(state, context, start, {
    type: 'SequenceExpression',
    expressions
  });
}

/**
 * Parse yield expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-YieldExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseYieldExpression(
  state: ParserState,
  context: Context,
  start: number
): ESTree.YieldExpression | ESTree.Identifier {
  // YieldExpression ::
  //   'yield' ([no line terminator] '*'? AssignmentExpression)?
  if (context & Context.InArgList) {
    // https://tc39.github.io/ecma262/#sec-generator-function-definitions-static-semantics-early-errors
    report(state, Errors.YieldInParameter);
  }
  expect(state, context | Context.AllowPossibleRegEx, Token.YieldKeyword);
  let argument: ESTree.Expression | null = null;
  let delegate = false; // yield*
  if ((state.flags & Flags.NewLine) < 1) {
    delegate = optional(state, context, Token.Multiply);
    if (state.token & Token.IsExpressionStart || delegate) {
      argument = parseAssignmentExpression(state, context);
    }
  }
  return finishNode(state, context, start, {
    type: 'YieldExpression',
    argument,
    delegate
  });
}

/**
 * Parses assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 *
 * @param parser Parser object
 * @param context  Context masks
 */

function parseAssignmentExpression(state: ParserState, context: Context): any {
  /**
   * AssignmentExpression ::
   *
   *      1) ConditionalExpression
   *      2) LeftHandSideExpression = AssignmentExpression
   *      3) LeftHandSideExpression AssignmentOperator AssignmentExpression
   *      4) ArrowFunctionExpression
   *      5) AsyncArrowFunctionExpression
   *      6) YieldExpression
   */

  const { token, tokenValue, startIndex: start } = state;

  if (token & Token.IsYield && context & Context.YieldContext) return parseYieldExpression(state, context, start);

  const expr: any = acquireGrammar(state, context, 0, parseBinaryExpression);

  if ((state.flags & Flags.NewLine) < 1) {
    if (
      token & Token.IsAsync &&
      ((state.token & Token.IsIdentifier) === Token.IsIdentifier ||
        state.token === Token.EscapedStrictReserved ||
        (!(context & Context.YieldContext) && state.token & Token.IsYield) === Token.IsYield)
    ) {
      const { tokenValue } = state;
      const arg = parseIdentifier(state, context);
      if (state.token !== Token.Arrow) report(state, Errors.Unexpected);
      const scope = createScope(ScopeType.ArgumentList);
      addVariableAndDeduplicate(state, context, scope, Type.ArgList, Origin.None, true, tokenValue);
      if (state.flags & Flags.NewLine) report(state, Errors.Unexpected);
      return parseArrowFunctionExpression(state, context, scope, [arg], true, start, Type.ConciseBody);
    }

    if (
      state.token === Token.Arrow &&
      (token & Token.IsIdentifier ||
        token === Token.LeftParen ||
        token === Token.EscapedKeyword ||
        token === Token.EscapedStrictReserved)
    ) {
      let { type, scope: arrowScope, params } = expr;
      state.bindable = state.assignable = false;
      state.pendingCoverInitializeError = null;
      if ((type & Arrows.Parenthesized) < 1) {
        if ((token & Token.FutureReserved) === Token.FutureReserved) {
          state.flags |= Flags.HasStrictReserved;
        } else if (tokenValue === 'eval' || tokenValue === 'arguments') {
          if (context & Context.Strict) report(state, Errors.StrictEvalArguments);
          state.flags |= Flags.StrictEvalArguments;
        }
        arrowScope = createScope(ScopeType.ArgumentList);
        params = [expr];
        type = Type.ConciseBody;
        addVariableAndDeduplicate(state, context, arrowScope, Type.ArgList, Origin.None, true, tokenValue);
      }
      return parseArrowFunctionExpression(state, context, arrowScope, params, (type & Arrows.Async) > 0, start, type);
    }
  }
  let operator: Token = Token.EndOfSource;
  if ((state.token & Token.IsAssignOp) === Token.IsAssignOp) {
    if (context & Context.Strict && nameIsArgumentsOrEval((expr as ESTree.Identifier).name)) {
      report(state, Errors.Unexpected);
    } else if (state.token === Token.Assign) {
      if (!state.assignable) report(state, Errors.InvalidLHSInAssignment);
      reinterpret(state, expr);
      operator = state.token;
      next(state, context | Context.AllowPossibleRegEx);
      if (context & Context.ParentheziedContext) {
        state.flags |= Flags.SimpleParameterList;
        if (context & (Context.Strict | Context.YieldContext) && state.token & Token.IsYield) {
          state.flags |= Flags.HasYield;
        } else if (state.token & Token.IsAwait) {
          state.flags |= Flags.HasAwait;
        }
      }
    } else {
      if (!state.assignable || !isValidSimpleAssignmentTarget(expr)) report(state, Errors.InvalidLHSInAssignment);
      state.bindable = state.assignable = false;
      operator = state.token;
      next(state, context | Context.AllowPossibleRegEx);
    }

    const right = secludeGrammar(state, context, 0, parseAssignmentExpression);
    state.pendingCoverInitializeError = null;
    return finishNode(state, context, start, {
      type: 'AssignmentExpression',
      left: expr,
      operator: KeywordDescTable[operator & Token.Type],
      right
    } as any);
  }

  return parseConditionalExpression(state, context, expr, start);
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
  context: Context,
  test: ESTree.Expression,
  start: number
): ESTree.Expression | ESTree.ConditionalExpression {
  // ConditionalExpression ::
  // LogicalOrExpression
  // LogicalOrExpression '?' AssignmentExpression ':' AssignmentExpression
  if (!optional(state, context | Context.AllowPossibleRegEx, Token.QuestionMark)) return test;
  const consequent = secludeGrammar(
    state,
    (context | Context.DisallowInContext) ^ Context.DisallowInContext,
    0,
    parseAssignmentExpression
  );
  expect(state, context | Context.AllowPossibleRegEx, Token.Colon);
  const alternate = secludeGrammar(state, context, 0, parseAssignmentExpression);
  state.bindable = state.assignable = false;
  return finishNode(state, context, start, {
    type: 'ConditionalExpression',
    test,
    consequent,
    alternate
  });
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
  start: number = state.startIndex,
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
    left = finishNode(state, context, start, {
      type: t & Token.IsLogical ? 'LogicalExpression' : 'BinaryExpression',
      left,
      right: secludeGrammar(state, context, prec, parseBinaryExpression),
      operator: KeywordDescTable[t & Token.Type]
    } as any);
    state.assignable = state.bindable = false;
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
  context: Context,
  start: number
): ESTree.AwaitExpression | ESTree.Identifier | ESTree.ArrowFunctionExpression {
  state.assignable = false;
  if (context & Context.InArgList) report(state, Errors.AwaitInParameter);
  next(state, context | Context.AllowPossibleRegEx);
  return finishNode(state, context, start, {
    type: 'AwaitExpression',
    argument: secludeGrammar(state, context, 0, parseUnaryExpression)
  });
}

/**
 * Parses unary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UnaryExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseUnaryExpression(state: ParserState, context: Context): ESTree.Expression {
  /**
   *  UnaryExpression ::
   *   PostfixExpression
   *      1) UpdateExpression
   *      2) delete UnaryExpression
   *      3) void UnaryExpression
   *      4) typeof UnaryExpression
   *      5) + UnaryExpression
   *      6) - UnaryExpression
   *      7) ~ UnaryExpression
   *      8) ! UnaryExpression
   *      9) await UnaryExpression
   */
  const { token, startIndex: start } = state;
  if ((token & Token.IsUnaryOp) === Token.IsUnaryOp) {
    const unaryOperator = state.token;
    next(state, context | Context.AllowPossibleRegEx);
    const argument: ESTree.Expression = secludeGrammar(state, context, 0, parseUnaryExpression);
    if (state.token === Token.Exponentiate) report(state, Errors.InvalidLOExponentation);
    if (context & Context.Strict && (unaryOperator & Token.DeleteKeyword) === Token.DeleteKeyword) {
      if (argument.type === 'Identifier') {
        report(state, Errors.StrictDelete);
      } else if (context & Context.OptionsNext && state.flags & Flags.HasPrivateName) {
        report(state, Errors.DeletePrivateField);
      }
    }
    state.bindable = state.assignable = false;
    return finishNode(state, context, start, {
      type: 'UnaryExpression',
      operator: KeywordDescTable[unaryOperator & Token.Type],
      argument,
      prefix: true
    });
  }

  return context & Context.AwaitContext && token & Token.IsAwait
    ? parseAwaitExpression(state, context, start)
    : parseUpdateExpression(state, context, start);
}

/**
 * Parses update expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseUpdateExpression(state: ParserState, context: Context, start: number): any {
  /**
   *  UpdateExpression:
   *      LeftHandSideExpression[?Yield]
   *      LeftHandSideExpression[?Yield][no LineTerminator here]++
   *      LeftHandSideExpression[?Yield][no LineTerminator here]--
   *      ++LeftHandSideExpression[?Yield]
   *      --LeftHandSideExpression[?Yield]
   */
  const { token } = state;
  if ((state.token & Token.IsUpdateOp) === Token.IsUpdateOp) {
    next(state, context | Context.AllowPossibleRegEx);
    const expr = parseLeftHandSideExpression(state, context, start);
    if (context & Context.Strict && (expr.name === 'eval' || expr.name === 'arguments')) {
      report(state, Errors.StrictLHSPrefixPostFix, 'Prefix');
    }
    if (!state.assignable) report(state, Errors.InvalidLHSInAssignment);
    state.bindable = state.assignable = false;
    return finishNode(state, context, start, {
      type: 'UpdateExpression',
      argument: expr,
      operator: KeywordDescTable[token & Token.Type],
      prefix: true
    } as any);
  }

  const expression = parseLeftHandSideExpression(state, context, start);

  if ((state.token & Token.IsUpdateOp) === Token.IsUpdateOp && (state.flags & Flags.NewLine) < 1) {
    if (context & Context.Strict && (expression.name === 'eval' || expression.name === 'arguments')) {
      report(state, Errors.StrictLHSPrefixPostFix, 'PostFix');
    }
    if (!state.assignable) report(state, Errors.InvalidLHSInAssignment);
    const operator = state.token;
    next(state, context | Context.AllowPossibleRegEx);
    state.bindable = state.assignable = false;
    return finishNode(state, context, start, {
      type: 'UpdateExpression',
      argument: expression,
      operator: KeywordDescTable[operator & Token.Type],
      prefix: false
    } as any);
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
export function parseLeftHandSideExpression(state: ParserState, context: Context, start: number): any {
  // LeftHandSideExpression ::
  //   (NewExpression | MemberExpression) ...
  const expr: any =
    context & Context.OptionsNext && state.token === Token.ImportKeyword
      ? parseCallImportOrMetaProperty(state, context, false)
      : state.token === Token.SuperKeyword
      ? parseSuperExpression(state, context)
      : parseMemberExpression(state, context, parsePrimaryExpression(state, context, start));
  return parseCallExpression(state, context, start, expr);
}

/**
 * Parse call expression
 *
 * @param parser Parer instance
 * @param context Context masks
 * @param pos Line / Colum info
 * @param expr Expression
 */
function parseCallExpression(state: ParserState, context: Context, start: number, callee: any | ESTree.Super): any {
  const isAsync = callee.name === 'async';
  const scope: ScopeState | null = state.bindable && isAsync ? createScope(ScopeType.BlockStatement) : null;
  const { flags } = state;
  let pState = ParenthesizedState.None;
  while (true) {
    callee = parseMemberExpression(state, context, callee);
    if (state.token !== Token.LeftParen) return callee;

    expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
    let seenSpread = false;
    let spreadCount = 0;
    const params: (ESTree.Expression | ESTree.SpreadElement)[] = [];
    while (state.token !== <Token>Token.RightParen) {
      if (state.token === <Token>Token.Ellipsis) {
        state.flags = state.flags | Flags.SimpleParameterList;
        params.push(parseSpreadElement(state, context, Origin.None));
        seenSpread = true;
      } else {
        const { token } = state;

        if (isAsync && (token as Token) === Token.Identifier) {
          addVariable(state, context, scope, Type.ArgList, Origin.None, false, false, state.tokenValue);
        }

        if ((token & Token.IsYield) === Token.IsYield) {
          pState = pState | ParenthesizedState.Yield;
        } else if ((token as Token) === Token.LeftBrace || (token as Token) === Token.LeftBracket)
          state.flags |= Flags.SimpleParameterList;
        if ((token & Token.FutureReserved) === Token.FutureReserved) {
          pState = pState | ParenthesizedState.ReservedWords;
        } else if ((token & Token.IsAwait) === Token.IsAwait) {
          pState = pState | ParenthesizedState.Await;
        }

        params.push(secludeGrammar(state, context | Context.ParentheziedContext, 0, parseAsyncArgument));
      }
      if (state.token === <Token>Token.RightParen) break;
      expect(state, context | Context.AllowPossibleRegEx, Token.Comma);
      state.assignable = false;
      if (seenSpread) spreadCount++;
    }
    expect(state, context, Token.RightParen);

    if (state.token === <Token>Token.Arrow) {
      if (flags & Flags.NewLine) report(state, Errors.Unexpected);

      if (pState & ParenthesizedState.Yield) {
        if (context & (Context.YieldContext | Context.Strict)) report(state, Errors.YieldInParameter);
        state.flags |= Flags.HasStrictReserved;
      } else if (state.flags & Flags.HasYield) {
        report(state, Errors.YieldInParameter);
      } else if (pState & ParenthesizedState.Await || state.flags & Flags.HasAwait) {
        report(state, Errors.AwaitInParameter);
      }

      state.flags = (state.flags | Flags.HasYield | Flags.HasAwait) ^ (Flags.HasYield | Flags.HasAwait);

      // Fixes cases like: `async().foo13 () => 1`
      if (!state.bindable) report(state, Errors.Unexpected);
      state.bindable = state.assignable = false;
      if (spreadCount > 0) report(state, Errors.TrailingCommaAfterRest);
      state.bindable = false;
      return {
        type: Arrows.Async,
        scope,
        params
      };
    }

    state.flags =
      (state.flags | Flags.HasYield | Flags.HasAwait | Flags.SimpleParameterList) ^
      (Flags.HasYield | Flags.HasAwait | Flags.SimpleParameterList);

    state.bindable = state.assignable = false;
    callee = finishNode(state, context, start, {
      type: 'CallExpression',
      callee,
      arguments: params
    });
  }
}

/**
 * Parse either call expression or import expressions
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseCallImportOrMetaProperty(state: ParserState, context: Context, isNew: boolean): ESTree.Expression {
  const { startIndex: start } = state;
  const id = parseIdentifier(state, context);
  // Import.meta - Stage 3 proposal
  if (optional(state, context, Token.Period)) {
    if (context & Context.Module && state.tokenValue === 'meta') return parseMetaProperty(state, context, id);
    report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);
  } else if (isNew && state.token === Token.LeftParen)
    report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);

  const expr = parseImportExpression(state, context);
  return parseCallExpression(state, context, start, expr);
}

/**
 * Parse Import() expression. (Stage 3 proposal)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location
 */
function parseImportExpression(state: ParserState, context: Context): ESTree.ImportExpression {
  const { startIndex: start } = state;
  return finishNode(state, context, start, {
    type: 'Import'
  } as any);
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

export function parseMetaProperty(state: ParserState, context: Context, id: ESTree.Identifier): any {
  const { startIndex: start } = state;
  return finishNode(state, context, start, {
    meta: id,
    type: 'MetaProperty',
    property: parseIdentifier(state, context)
  });
}

function parseSuperExpression(state: ParserState, context: Context): ESTree.Super {
  const { startIndex: start } = state;
  next(state, context);
  state.assignable = state.bindable = false;
  switch (state.token) {
    case Token.LeftParen:
      // The super property has to be within a class constructor
      if ((context & Context.SuperCall) < 1) report(state, Errors.SuperNoConstructor);
      break;
    case Token.LeftBracket:
    case Token.Period:
      // new super() is never allowed.
      // super() is only allowed in derived constructor

      if ((context & Context.SuperProperty) < 1) report(state, Errors.InvalidSuperProperty);
      state.assignable = true;
      break;
    default:
      report(state, Errors.UnexpectedToken, 'super');
  }

  return finishNode(state, context, start, { type: 'Super' });
}

/**
 * Parse identifier name or private name (stage 3 proposal)
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseIdentifierNameOrPrivateName(
  state: ParserState,
  context: Context
): ESTree.PrivateName | ESTree.Identifier {
  if (!optional(state, context, Token.PrivateName)) return parseIdentifierName(state, context);
  const { startIndex: start } = state;
  state.flags |= Flags.HasPrivateName;
  return finishNode(state, context, start, {
    type: 'PrivateName',
    name: state.tokenValue
  } as any);
}

/**
 * Parses identifier name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-IdentifierName)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseIdentifierName(state: ParserState, context: Context): ESTree.Identifier {
  if (
    (state.token & (Token.IsIdentifier | Token.Keyword)) !== Token.IsIdentifier &&
    (state.token & Token.Keyword) !== Token.Keyword
  )
    report(state, Errors.Unexpected);
  return parseIdentifier(state, context);
}

/**
 * Parse member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseMemberExpression(
  state: ParserState,
  context: Context,
  expr: any,
  start: number = state.startIndex
): ESTree.Expression {
  while (true) {
    switch (state.token) {
      case Token.Period:
        next(state, context);
        state.bindable = false;
        state.assignable = true;
        const { startIndex: curIndex } = state;
        expr = finishNode(state, context, curIndex, {
          type: 'MemberExpression',
          object: expr,
          computed: false,
          property:
            context & Context.OptionsNext
              ? parseIdentifierNameOrPrivateName(state, context)
              : parseIdentifierName(state, context)
        });
        continue;
      case Token.LeftBracket: {
        next(state, context | Context.AllowPossibleRegEx);
        state.bindable = false;
        state.assignable = true;
        const { startIndex: curIndex } = state;
        expr = finishNode(state, context, curIndex, {
          type: 'MemberExpression',
          object: expr,
          computed: true,
          property: parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext)
        });
        expect(state, context, Token.RightBracket);
        break;
      }
      case Token.TemplateTail:
        state.bindable = state.assignable = false;
        expr = finishNode(state, context, state.startIndex, {
          type: 'TaggedTemplateExpression',
          tag: expr,
          quasi: parseTemplateLiteral(state, context)
        });
        break;
      case Token.TemplateCont:
        state.bindable = state.assignable = false;
        expr = finishNode(state, context, start, {
          type: 'TaggedTemplateExpression',
          tag: expr,
          quasi: parseTemplate(state, context | Context.TaggedTemplate, state.startIndex)
        });
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

function parseTemplateLiteral(state: ParserState, context: Context): ESTree.TemplateLiteral {
  const { startIndex: start } = state;
  return finishNode(state, context, start, {
    type: 'TemplateLiteral',
    expressions: [],
    quasis: [parseTemplateTail(state, context)]
  });
}

/**
 * Parse template spans
 *
 * @param state Parser object
 * @param context Context masks
 * @param tail
 */

function parseTemplateSpans(
  state: ParserState,
  context: Context,
  start: number,
  tail: boolean
): ESTree.TemplateElement {
  return finishNode(state, context, start, {
    type: 'TemplateElement',
    value: {
      cooked: state.tokenValue,
      raw: state.tokenRaw
    },
    tail
  });
}

/**
 * Parse template literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TemplateLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseTemplate(state: ParserState, context: Context, start: number): ESTree.TemplateLiteral {
  /**
   * Template :
   *   NoSubstitutionTemplate
   *   TemplateHead
   *
   * NoSubstitutionTemplate :
   *   ` TemplateCharacters(opt) `
   *
   * TemplateHead :
   *   ` TemplateCharacters(opt) ${
   *
   * TemplateSubstitutionTail :
   *   TemplateMiddle
   *   TemplateTail
   *
   * TemplateMiddle :
   *   } TemplateCharacters(opt) ${
   *
   * TemplateTail :
   *   } TemplateCharacters(opt) `
   *
   * TemplateCharacters :
   *   TemplateCharacter TemplateCharacters(opt)
   *
   * TemplateCharacter :
   *   $ [lookahead ≠ {]
   *   \ EscapeSequence
   *   SourceCharacter (but not one of ` or \ or $)
   *
   */
  const quasis = [parseTemplateSpans(state, context, start, /* tail */ false)];
  expect(state, context | Context.AllowPossibleRegEx, Token.TemplateCont);
  const expressions = [parseExpression(state, (context | Context.DisallowInContext) ^ Context.DisallowInContext)];

  while ((state.token = scanTemplateTail(state, context)) !== Token.TemplateTail) {
    quasis.push(parseTemplateSpans(state, context, state.startIndex, /* tail */ false));
    expect(state, context | Context.AllowPossibleRegEx, Token.TemplateCont);
    expressions.push(parseExpression(state, context));
  }
  quasis.push(parseTemplateSpans(state, context, state.startIndex, /* tail */ true));
  state.assignable = state.bindable = false;
  next(state, context);

  return finishNode(state, context, start, {
    type: 'TemplateLiteral',
    expressions,
    quasis
  });
}

/**
 * Parse template tail
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TemplateSpans)
 *
 * @param state Parser object
 * @param context Context masks
 */

function parseTemplateTail(state: ParserState, context: Context): ESTree.TemplateElement {
  const { tokenValue, tokenRaw, startIndex: start } = state;
  expect(state, context | Context.AllowPossibleRegEx, Token.TemplateTail);
  return finishNode(state, context, start, {
    type: 'TemplateElement',
    value: {
      cooked: tokenValue,
      raw: tokenRaw
    },
    tail: true
  });
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
  /**
   * ArgumentList
   *
   * AssignmentExpression
   * ...AssignmentExpression
   *
   * ArgumentList, AssignmentExpression
   * ArgumentList, ...AssignmentExpression
   *
   */

  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  const expressions: (ESTree.Expression | ESTree.SpreadElement)[] = [];
  while (state.token !== Token.RightParen) {
    if (state.token === Token.Ellipsis) {
      expressions.push(parseSpreadElement(state, context, Origin.ArgList));
      if (state.token === <Token>Token.RightParen) break;
      expect(state, context, Token.Comma);
      continue;
    } else {
      expressions.push(secludeGrammar(state, context, 0, parseAssignmentExpression));
    }
    if (!optional(state, context | Context.AllowPossibleRegEx, Token.Comma)) break;
  }

  expect(state, context, Token.RightParen);
  return expressions;
}

function parseSpreadElement(state: ParserState, context: Context, origin: Origin): ESTree.SpreadElement {
  const { startIndex: start } = state;
  expect(state, context | Context.AllowPossibleRegEx, Token.Ellipsis);
  if (origin & Origin.ObjectExpression && (state.token === Token.LeftBracket || state.token === Token.LeftBrace)) {
    // Fixes cases where '{' or '[' directly follows after '...' in object expr. E.g. '({...{a, b}} = x):'
    // This has to be done before we parse out the 'AssignmentExpression' because none
    // of this should be 'bindable' or 'assignable'
    state.bindable = state.assignable = false;
  }
  const argument = acquireGrammar(state, context, 0, parseAssignmentExpression);
  if (origin & ((origin & Origin.ObjectExpression) | Origin.ArrayLiteral)) {
    if (
      argument.type !== 'ArrayExpression' &&
      argument.type !== 'ObjectExpression' &&
      !isValidSimpleAssignmentTarget(argument)
    ) {
      state.bindable = state.assignable = false;
    }
  }
  return finishNode(state, context, start, {
    type: 'SpreadElement',
    argument
  });
}

function parseAsyncArgument(state: ParserState, context: Context): any {
  const arg = parseAssignmentExpression(state, context);
  state.pendingCoverInitializeError = null;
  return arg;
}

/**
 * Parse new expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NewExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseNewExpression(state: ParserState, context: Context): ESTree.NewExpression | ESTree.MetaProperty {
  // NewExpression ::
  //   ('new')+ MemberExpression
  //
  // NewTarget ::
  //   'new' '.' 'target'
  //
  // Examples of new expression:
  // - new foo.bar().baz
  // - new foo()()
  // - new new foo()()
  // - new new foo
  // - new new foo()
  // - new new foo().bar().baz
  // - `new.target[await x]`
  // - `new (foo);`
  // - `new (foo)();`
  // - `new foo()();`
  // - `new (await foo);`
  // - `new x(await foo);`
  const { startIndex: start } = state;
  const id = parseIdentifier(state, context | Context.AllowPossibleRegEx);

  if (optional(state, context, Token.Period)) {
    return (context & Context.AllowNewTarget) < 1 || state.tokenValue !== 'target'
      ? report(state, Errors.Unexpected)
      : parseMetaProperty(state, context, id);
  }
  let callee =
    context & Context.OptionsNext && state.token === Token.ImportKeyword
      ? parseCallImportOrMetaProperty(state, context, true)
      : secludeGrammar(state, context, parsePrimaryExpression(state, context, start), parseMemberExpression);

  return finishNode(state, context, start, {
    type: 'NewExpression',
    callee,
    arguments: state.token === Token.LeftParen ? parseArgumentList(state, context) : []
  });
}

export function parseAndClassifyIdentifier(state: ParserState, context: Context) {
  if (
    ((context & Context.Strict) === 0 && state.token === Token.EscapedStrictReserved) ||
    state.token === Token.LetKeyword ||
    state.token === Token.StaticKeyword ||
    state.token === Token.YieldKeyword
  ) {
  }
}

/**
 * Parse primary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-primary-expression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parsePrimaryExpression(state: ParserState, context: Context, start: number): any {
  /**
   *  PrimaryExpression :
   *   1. this
   *   2. IdentifierName
   *   3. Literal
   *   4. ArrayLiteral
   *   5. ObjectLiteral
   *   6. TemplateLiteral
   *   7. ParenthesizedExpression
   *
   * Literal :
   *    NullLiteral
   *    BooleanLiteral
   *    NumericLiteral
   *    StringLiteral
   *
   * ParenthesizedExpression :
   *   ( AssignmentExpression )
   *
   */

  const { token } = state;

  if ((token & Token.IsIdentifier) === Token.IsIdentifier || token === Token.EscapedStrictReserved) {
    return parseIdentifier(state, context | Context.TaggedTemplate);
  }

  if (token & Token.IsAsync) {
    if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
      state.bindable = state.assignable = false;
      return parseFunctionExpression(state, context, true);
    }
    return parseIdentifier(state, context);
  }

  switch (token) {
    case Token.NumericLiteral:
    case Token.StringLiteral:
      state.bindable = state.assignable = false;
      return parseLiteral(state, context);
    case Token.BigIntLiteral:
      state.bindable = state.assignable = false;
      return parseBigIntLiteral(state, context);
    case Token.RegularExpression:
      state.bindable = state.assignable = false;
      return parseRegExpLiteral(state, context);
    case Token.TrueKeyword:
    case Token.FalseKeyword:
    case Token.NullKeyword:
      state.bindable = state.assignable = false;
      return parseNullOrTrueOrFalseLiteral(state, context);
    case Token.ThisKeyword:
      state.bindable = state.assignable = false;
      return parseThisExpression(state, context);
    case Token.LeftBracket:
      return parseArrayLiteral(state, context & ~Context.DisallowInContext);
    case Token.LeftParen:
      return parseParenthesizedExpression(state, context);
    case Token.LeftBrace:
      return parseObjectLiteral(state, context & ~Context.DisallowInContext, -1, Type.None);
    case Token.FunctionKeyword:
      state.bindable = state.assignable = false;
      return parseFunctionExpression(state, context, false);
    case Token.ClassKeyword:
      state.bindable = state.assignable = false;
      return parseClassExpression(state, context);
    case Token.TemplateTail:
      state.bindable = state.assignable = false;
      return parseTemplateLiteral(state, context);
    case Token.TemplateCont:
      state.bindable = state.assignable = false;
      return parseTemplate(state, context, start);
    case Token.NewKeyword:
      state.bindable = state.assignable = false;
      return parseNewExpression(state, context);
    case Token.SuperKeyword:
      state.bindable = state.assignable = false;
      return parseSuperExpression(state, context);
    case Token.PrivateName:
      state.bindable = state.assignable = false;
      return parseIdentifierNameOrPrivateName(state, context);
    case Token.LetKeyword: {
      if (context & Context.Strict) report(state, Errors.UnexpectedStrictReserved);
      const { startIndex: start } = state;
      next(state, context);
      if (state.flags & Flags.NewLine && (state.token as Token) === Token.LeftBracket) {
        report(state, Errors.RestricedLetProduction);
      }

      return context & Context.OptionsRaw
        ? finishNode(state, context, start, {
            type: 'Identifier',
            name: 'let',
            raw: 'let'
          })
        : finishNode(state, context, start, {
            type: 'Identifier',
            name: 'let'
          });
    }
    case Token.DoKeyword:
      return parseDoExpression(state, context);
    case Token.YieldKeyword:
      if (context & (Context.YieldContext | Context.Strict)) {
        report(state, Errors.DisallowedInContext, KeywordDescTable[state.token & Token.Type]);
      }
    // falls through
    default:
      if (isValidIdentifier(context, state.token)) {
        return parseIdentifier(state, context | Context.TaggedTemplate);
      }
      report(
        state,
        state.token === Token.EscapedKeyword || (state.token as Token) === Token.EscapedStrictReserved
          ? Errors.InvalidEscapedKeyword
          : Errors.Unexpected
      );
  }
}

/**
 * Parse do expression (*experimental*)
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function parseDoExpression(state: ParserState, context: Context): ESTree.DoExpression {
  // AssignmentExpression ::
  //     do '{' StatementList '}'
  if ((context & Context.OptionsExperimental) < 1) report(state, Errors.NoExperimentalOption);
  const { startIndex: start } = state;
  expect(state, context, Token.DoKeyword);
  return finishNode(state, context, start, {
    type: 'DoExpression',
    body: parseBlockStatement(state, context, createScope(ScopeType.BlockStatement))
  });
}
/**
 * Parse array literal expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseArrayLiteral(state: ParserState, context: Context): ESTree.ArrayExpression {
  /**
   * ArrayLiteral :
   *   [ Elision(opt) ]
   *   [ ElementList ]
   *   [ ElementList, Elision(opt) ]
   *
   * ElementList :
   *   Elision(opt) AssignmentExpression
   *   ElementList, Elision(opt) AssignmentExpression
   *
   * Elision :
   *  ,
   *  Elision ,
   *
   * SpreadElement:
   * ...AssignmentExpression
   */
  const { startIndex: start } = state;
  next(state, context | Context.AllowPossibleRegEx);
  const elements: (ESTree.SpreadElement | ESTree.Expression | null)[] = [];
  while (state.token !== Token.RightBracket) {
    if (optional(state, context, Token.Comma)) {
      elements.push(null);
      if ((state.token as Token) === Token.LeftBracket) {
        break;
      }
    } else if (state.token === Token.Ellipsis) {
      elements.push(parseSpreadElement(state, context, Origin.ArrayLiteral));
      if ((state.token as Token) !== Token.RightBracket) {
        state.bindable = state.assignable = false;
        expect(state, context, Token.Comma);
      }
    } else {
      elements.push(acquireGrammar(state, context, 0, parseAssignmentExpression));
      if (optional(state, context, Token.Comma)) {
        if ((state.token as Token) === Token.RightBracket) {
          break;
        }
      } else {
        break;
      }
    }
  }

  expect(state, context, Token.RightBracket);

  return finishNode(state, context, start, {
    type: 'ArrayExpression',
    elements
  });
}

/**
 * Parse function expression
 *
 * @param parser Parser object
 * @param context Context masks
 * @param isAsync True if parsing an async func expr
 */
function parseFunctionExpression(state: ParserState, context: Context, isAsync: boolean): ESTree.FunctionExpression {
  const { startIndex: start } = state;
  expect(state, context, Token.FunctionKeyword);

  const isGenerator = optional(state, context, Token.Multiply);

  // Create a new function scope
  let functionScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let firstRestricted: string | undefined;

  if (state.token & Token.IsIdentifier || state.token === Token.EscapedStrictReserved) {
    validateBindingIdentifier(
      state,
      ((context | (Context.YieldContext | Context.AwaitContext)) ^ (Context.YieldContext | Context.AwaitContext)) |
        (context & Context.Strict ? Context.YieldContext : isGenerator ? Context.YieldContext : 0) |
        (context & Context.Module ? Context.AwaitContext : isAsync ? Context.AwaitContext : 0),
      Type.Variable
    );
    addVariableAndDeduplicate(state, context, functionScope, Type.Variable, Origin.None, true, state.tokenValue);
    functionScope = createSubScope(functionScope, ScopeType.BlockStatement);
    firstRestricted = state.tokenValue;
    id = parseIdentifier(state, context);
  }

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
  const paramScoop = createSubScope(functionScope, ScopeType.ArgumentList);

  const params = parseFormalParameters(
    state,
    context | Context.AllowNewTarget,
    paramScoop,
    Origin.ArgList,
    Modifiers.None
  );

  const body: any = parseFunctionBody(
    state,
    context | Context.AllowNewTarget,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted,
    Origin.None
  );

  return finishNode(state, context, start, {
    type: 'FunctionExpression',
    params,
    body,
    async: isAsync,
    generator: isGenerator,
    id
  });
}

/**
 * Parse arrow function expression
 *
 * @param parser Parser object
 * @param context Context masks
 * @param scope Scope object
 * @param params Argument list params
 * @param isAsync True if parsing an async func expr
 */
function parseArrowFunctionExpression(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  params: any,
  isAsync: boolean,
  start: number,
  type: Type
): ESTree.ArrowFunctionExpression {
  if (state.flags & Flags.NewLine) report(state, Errors.InvalidLineBreak, '=>');

  if (type & Type.ConciseBody) {
    expect(state, context | Context.AllowPossibleRegEx, Token.Arrow);
  } else {
    expect(state, context, Token.Arrow);
    for (let i = 0; i < params.length; ++i) reinterpret(state, params[i]);
    if (checkIfExistInLexicalBindings(state, context, scope, Origin.None, true)) {
      report(state, Errors.AlreadyDeclared, 'function argument');
    }
  }

  context =
    ((context | Context.AwaitContext | Context.YieldContext | Context.InArgList | Context.ParentheziedContext) ^
      (Context.AwaitContext | Context.YieldContext | Context.InArgList | Context.ParentheziedContext)) |
    (isAsync ? Context.AwaitContext : 0);

  const expression = state.token !== Token.LeftBrace;
  const body = expression
    ? secludeGrammar(state, context, 0, parseAssignmentExpression)
    : parseFunctionBody(
        state,
        (context | Context.TopLevel) ^ Context.TopLevel,
        createSubScope(scope, ScopeType.BlockStatement),
        state.tokenValue,
        Origin.None
      );
  return finishNode(state, context, start, {
    type: 'ArrowFunctionExpression',
    body,
    params,
    id: null,
    async: isAsync,
    expression
  });
}

/**
 * Parse parenthesized expression
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseParenthesizedExpression(state: ParserState, context: Context): any {
  state.flags = (state.flags | Flags.SimpleParameterList) ^ Flags.SimpleParameterList;
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftParen);
  let scope = createScope(ScopeType.ArgumentList);
  context = context | Context.ParentheziedContext;
  if (optional(state, context, Token.RightParen)) {
    if (state.token !== <Token>Token.Arrow) report(state, Errors.Unexpected);
    state.assignable = state.bindable = false;
    return {
      type: Arrows.Plain,
      scope,
      params: []
    };
  } else if (state.token === Token.Ellipsis) {
    state.flags = state.flags | Flags.SimpleParameterList;
    const rest = parseRestElement(state, context, scope, Type.ArgList, Origin.None);
    expect(state, context, Token.RightParen);
    if (state.token !== <Token>Token.Arrow) report(state, Errors.Unexpected);
    state.assignable = state.bindable = false;
    return {
      type: Arrows.Plain,
      scope,
      params: [rest]
    };
  }

  let pState = ParenthesizedState.None;

  state.bindable = true;

  const { token, startIndex: start } = state;

  if (token === Token.LeftBrace || token === Token.LeftBracket) state.flags |= Flags.SimpleParameterList;

  if ((token & Token.FutureReserved) === Token.FutureReserved) {
    pState = pState | ParenthesizedState.ReservedWords;
  } else if ((token & Token.IsAwait) === Token.IsAwait) {
    state.flags = state.flags | Flags.HasAwait;
  } else if ((token & Token.IsYield) === Token.IsYield) {
    state.flags = state.flags | Flags.HasYield;
  }

  if ((token as Token) === Token.Identifier) {
    addVariable(state, context, scope, Type.ArgList, Origin.None, false, false, state.tokenValue);
  }

  let expr = acquireGrammar(
    state,
    (context | Context.DisallowInContext) ^ Context.DisallowInContext,
    0,
    parseAssignmentExpression
  );

  if (state.token === Token.Comma) {
    state.assignable = false;
    pState = pState | ParenthesizedState.SequenceExpression;
    const params: (ESTree.Expression | ESTree.RestElement)[] = [expr];

    while (optional(state, context | Context.AllowPossibleRegEx, Token.Comma)) {
      if (optional(state, context, Token.RightParen)) {
        if (state.token !== <Token>Token.Arrow) report(state, Errors.Unexpected);
        state.assignable = false;
        return {
          type: Arrows.Plain,
          scope,
          params: params
        };
      }

      state.assignable = false;

      if (state.token === <Token>Token.Ellipsis) {
        if (!state.bindable) report(state, Errors.Unexpected);
        state.flags = state.flags | Flags.SimpleParameterList;
        const restElement = parseRestElement(state, context, scope, Type.ArgList, Origin.None);
        expect(state, context, Token.RightParen);
        if (state.token !== <Token>Token.Arrow) report(state, Errors.Unexpected);
        state.bindable = false;
        params.push(restElement);
        return {
          type: Arrows.Plain,
          scope,
          params: params
        };
      } else if (optional(state, context, Token.RightParen)) {
        if (state.token !== <Token>Token.Arrow) report(state, Errors.Unexpected);
        return {
          type: Arrows.Plain,
          scope,
          params: params
        };
      } else {
        if ((state.token as Token) === Token.LeftBrace || (state.token as Token) === Token.LeftBracket) {
          state.flags = state.flags | Flags.SimpleParameterList;
        }
        if ((state.token & Token.FutureReserved) === Token.FutureReserved) {
          pState = pState | ParenthesizedState.ReservedWords;
        } else if ((state.token & Token.IsAwait) === Token.IsAwait) {
          state.flags = state.flags | Flags.HasAwait;
        } else if ((state.token & Token.IsYield) === Token.IsYield) {
          state.flags = state.flags | Flags.HasYield;
        }
        if ((state.token as Token) === Token.Identifier) {
          addVariable(state, context, scope, Type.ArgList, Origin.None, false, false, state.tokenValue);
        }
        params.push(
          acquireGrammar(
            state,
            (context | Context.DisallowInContext) ^ Context.DisallowInContext,
            0,
            parseAssignmentExpression
          )
        );
      }
    }
    expr = finishNode(state, context, start, {
      type: 'SequenceExpression',
      expressions: params
    } as any);
  }

  expect(state, context, Token.RightParen);

  if (state.token === <Token>Token.Arrow) {
    if (!state.bindable) report(state, Errors.InvalidLHSOfError);

    if (pState & ParenthesizedState.ReservedWords) {
      if (context & Context.Strict) report(state, Errors.UnexpectedStrictReserved);
      state.flags = state.flags | Flags.HasStrictReserved;
    } else if (state.flags & Flags.HasYield) {
      report(state, Errors.YieldInParameter);
    } else if (context & (Context.Module | Context.AwaitContext) && state.flags & Flags.HasAwait) {
      report(state, Errors.AwaitInParameter);
    }

    state.flags = (state.flags | Flags.HasYield | Flags.HasAwait) ^ (Flags.HasYield | Flags.HasAwait);

    state.assignable = state.bindable = false;
    return {
      type: Arrows.Plain,
      scope,
      params: pState & ParenthesizedState.SequenceExpression ? expr.expressions : [expr],
      async: false
    };
  }

  state.bindable = false;

  context = (context | Context.ParentheziedContext) ^ Context.ParentheziedContext;

  state.flags =
    (state.flags | Flags.HasYield | Flags.HasAwait | Flags.SimpleParameterList) ^
    (Flags.HasYield | Flags.HasAwait | Flags.SimpleParameterList);

  if (!isValidSimpleAssignmentTarget(expr)) state.assignable = false;

  return expr;
}

/**
 * Parse class declaration
 *
 * @param parser Parser object
 * @param context Context masks
 * @param scope Scope object
 */
function parseClassDeclaration(state: ParserState, context: Context, scope: ScopeState): ESTree.ClassDeclaration {
  const { startIndex: start } = state;
  next(state, context);
  // class bodies are implicitly strict
  context = (context | Context.Strict | Context.InConstructor) ^ Context.InConstructor;

  let id: ESTree.Expression | null = null;
  let superClass: ESTree.Expression | null = null;
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    validateBindingIdentifier(state, context | Context.Strict, Type.ClassExprDecl);
    addVariableAndDeduplicate(state, context, scope, Type.Let, Origin.None, true, state.tokenValue);
    id = parseIdentifier(state, context);
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.Unexpected);

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
 * Parses class expression
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope object
 */
function parseClassExpression(state: ParserState, context: Context): ESTree.ClassExpression {
  const { startIndex: start } = state;
  next(state, context);
  context = (context | Context.Strict | Context.InConstructor) ^ (Context.Strict | Context.InConstructor);
  let id: ESTree.Expression | null = null;
  let superClass: ESTree.Expression | null = null;
  if (state.token & Token.IsIdentifier && state.token !== Token.ExtendsKeyword) {
    validateBindingIdentifier(state, context | Context.Strict, Type.ClassExprDecl);
    addVariable(state, context, -1, Type.Let, Origin.None, false, false, state.tokenValue);
    id = parseIdentifier(state, context);
  }

  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = secludeGrammar(state, context, 0, parseLeftHandSideExpression);
    context |= Context.SuperCall;
  } else context = (context | Context.SuperCall) ^ Context.SuperCall;

  context |= Context.SuperProperty;

  const body = parseClassBodyAndElementList(state, context | Context.Strict, Origin.None);

  return finishNode(state, context, start, {
    type: 'ClassExpression',
    id,
    superClass,
    body
  });
}

export function parseClassBodyAndElementList(state: ParserState, context: Context, origin: Origin): ESTree.ClassBody {
  const { startIndex: start } = state;
  expect(state, context | Context.AllowPossibleRegEx, Token.LeftBrace);
  const body: any[] = [];

  while (state.token !== Token.RightBrace) {
    if (optional(state, context, Token.Semicolon)) continue;
    body.push(parseClassElementList(state, context, Modifiers.None));
  }

  expect(state, origin & Origin.Declaration ? context | Context.AllowPossibleRegEx : context, Token.RightBrace);

  state.flags &= ~Flags.HasConstructor;

  return finishNode(state, context, start, {
    type: 'ClassBody',
    body
  });
}

function parseClassElementList(state: ParserState, context: Context, modifier: Modifiers): any {
  let key: ESTree.Identifier | ESTree.Literal | ESTree.Expression | void;
  let { token, tokenValue, startIndex: start } = state;

  if (state.token & Token.IsIdentifier) {
    key = parseIdentifier(state, context);
    switch (token) {
      // 'static'
      case Token.StaticKeyword:
        if ((modifier & Modifiers.Static) === 0 && state.token !== Token.LeftParen) {
          return parseClassElementList(state, context, Modifiers.Static);
        }
        break;
      // 'async'
      case Token.AsyncKeyword:
        if (state.token !== Token.LeftParen && (state.flags & Flags.NewLine) === 0) {
          if (optional(state, context, Token.Multiply)) modifier |= Modifiers.Generator;
          tokenValue = state.tokenValue;
          if (state.token & Token.IsIdentifier) {
            key = parseIdentifier(state, context);
            if (state.flags & Flags.NewLine) report(state, Errors.InvalidLineBreak, 'async');
          } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
            key = parseLiteral(state, context);
          } else if (state.token === Token.LeftBracket) {
            modifier |= Modifiers.Computed;
            key = parseComputedPropertyName(state, context);
          } else {
            report(state, Errors.Unexpected);
          }
          modifier |= Modifiers.Async;
        }
        break;
      // 'get'
      case Token.GetKeyword:
        if (state.token !== Token.LeftParen) {
          tokenValue = state.tokenValue;
          if (state.token & Token.IsIdentifier) {
            key = parseIdentifier(state, context);
          } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
            key = parseLiteral(state, context);
          } else if (state.token === Token.LeftBracket) {
            modifier |= Modifiers.Computed;
            key = parseComputedPropertyName(state, context);
          } else if (state.token === <Token>Token.EscapedStrictReserved) {
            key = parseIdentifier(state, context);
          } else {
            report(state, Errors.Unexpected);
          }
          modifier |= Modifiers.Getter;
        }
        break;
      // 'set'
      case Token.SetKeyword:
        if (state.token !== Token.LeftParen) {
          tokenValue = state.tokenValue;
          if (state.token & Token.IsIdentifier) {
            key = parseIdentifier(state, context);
          } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
            key = parseLiteral(state, context);
          } else if (state.token === Token.LeftBracket) {
            modifier |= Modifiers.Computed;
            key = parseComputedPropertyName(state, context);
          } else if (state.token === <Token>Token.EscapedStrictReserved) {
            key = parseIdentifier(state, context);
          } else {
            report(state, Errors.Unexpected);
          }
          modifier |= Modifiers.Setter;
        }
        break;
      default: // ignore
    }
  } else if (state.token === Token.LeftBracket) {
    modifier |= Modifiers.Computed;
    key = parseComputedPropertyName(state, context);
  } else if (state.token === Token.NumericLiteral || state.token === Token.StringLiteral) {
    if (state.tokenValue === 'constructor') modifier |= Modifiers.Constructor;
    key = parseLiteral(state, context);
  } else if (state.token === Token.Multiply) {
    next(state, context);
    tokenValue = state.tokenValue;
    if (state.token & Token.IsIdentifier) {
      key = parseIdentifier(state, context);
    } else if (state.token === <Token>Token.NumericLiteral || state.token === <Token>Token.StringLiteral) {
      key = parseLiteral(state, context);
    } else if (state.token === <Token>Token.LeftBracket) {
      modifier |= Modifiers.Computed;
      key = parseComputedPropertyName(state, context);
    } else if (state.token === <Token>Token.EscapedStrictReserved) {
      key = parseIdentifier(state, context);
    } else {
      report(state, Errors.Unexpected);
    }

    modifier |= Modifiers.Generator;
  } else if (state.token === Token.Semicolon) {
    next(state, context);
  } else if (state.token === <Token>Token.EscapedStrictReserved) {
    key = parseIdentifier(state, context);
  } else {
    report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);
  }

  if (
    (modifier & Modifiers.Computed) === 0 &&
    modifier & (Modifiers.Static | Modifiers.Async | Modifiers.GetSet) &&
    state.tokenValue === 'prototype'
  ) {
    report(state, Errors.StaticPrototype);
  }

  if (tokenValue === 'constructor') {
    if ((modifier & Modifiers.Static) === 0) {
      if (modifier & (Modifiers.GetSet | Modifiers.Async | Modifiers.Generator))
        report(state, Errors.InvalidConstructor, 'accessor');
      if ((context & Context.SuperCall) === 0 && (modifier & Modifiers.Computed) === 0) {
        if (state.flags & Flags.HasConstructor) report(state, Errors.DuplicateConstructor);
        else state.flags |= Flags.HasConstructor;
      }
    }
    modifier |= Modifiers.Constructor;
  }

  if (state.token !== Token.LeftParen) report(state, Errors.Unexpected);

  return finishNode(state, context, start, {
    type: 'MethodDefinition',
    kind:
      (modifier & Modifiers.Static) === 0 && modifier & Modifiers.Constructor
        ? 'constructor'
        : modifier & Modifiers.Getter
        ? 'get'
        : modifier & Modifiers.Setter
        ? 'set'
        : 'method',
    static: (modifier & Modifiers.Static) !== 0,
    computed: (modifier & Modifiers.Computed) !== 0,
    key,
    value: parseMethodDeclaration(state, context, modifier)
  } as any);
}

/**
 * Parses object literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Literal)
 *
 * @param state Parser object
 * @param context Context masks
 * @param scope Scope object
 * @param type Binding type
 */

function parseObjectLiteral(
  state: ParserState,
  context: Context,
  scope: ScopeState | number,
  type: Type
): ESTree.Expression {
  /**
   *
   * ObjectLiteral :
   *   { }
   *   { PropertyDefinitionList }
   *
   * PropertyDefinitionList :
   *   PropertyDefinition
   *   PropertyDefinitionList, PropertyDefinition
   *
   * PropertyDefinition :
   *   IdentifierName
   *   PropertyName : AssignmentExpression
   *
   * PropertyName :
   *   IdentifierName
   *   StringLiteral
   *   NumericLiteral
   */
  next(state, context);
  let key: ESTree.Expression | null = null;
  let token = state.token;
  let tokenValue = state.tokenValue;
  let value: any;
  let hasProto = false;
  const properties: any[] = [];

  let objState = Modifiers.None;

  const { assignable, bindable, pendingCoverInitializeError, startIndex: start } = state;

  state.bindable = true;
  state.assignable = true;
  state.pendingCoverInitializeError = null;

  while (state.token !== Token.RightBrace) {
    if (state.token === <Token>Token.Ellipsis) {
      properties.push(parseSpreadElement(state, context, Origin.ObjectExpression));
    } else {
      const { startIndex: objStart } = state;
      if (
        state.token & Token.IsIdentifier ||
        state.token === Token.EscapedKeyword ||
        state.token === Token.EscapedStrictReserved
      ) {
        token = state.token;
        tokenValue = state.tokenValue;
        objState = Modifiers.None;
        key = parseIdentifier(state, context);
        const newLine = (state.flags & Flags.NewLine) > 0;
        if (
          state.token === <Token>Token.Comma ||
          state.token === <Token>Token.RightBrace ||
          state.token === <Token>Token.Assign
        ) {
          objState |= Modifiers.Shorthand;

          if (tokenValue !== 'eval' || tokenValue !== 'arguments')
            validateBindingIdentifier(state, context, type, token);
          addVariable(state, context, scope, type, Origin.None, false, false, tokenValue);

          if (state.token === <Token>Token.Assign) {
            state.pendingCoverInitializeError = Errors.InvalidCoverInitializedName;
            expect(state, context, Token.Assign);
            value = parseAssignmentPattern(
              state,
              (context | Context.DisallowInContext) ^ Context.DisallowInContext,
              key,
              objStart
            );
          } else {
            value = key;
          }
        } else if (optional(state, context | Context.AllowPossibleRegEx, Token.Colon)) {
          if (tokenValue === '__proto__') {
            if (hasProto) {
              // Record the error and put it on hold until we've determined
              // whether or not we're destructuring
              state.pendingCoverInitializeError = Errors.InvalidCoverInitializedName;
              // setPendingExpressionError(parser, Errors.DuplicateProto);
            } else hasProto = true;
          }

          value = acquireGrammar(
            state,
            (context | Context.DisallowInContext) ^ Context.DisallowInContext,
            0,
            parseAssignmentExpression
          );
        } else if (state.token === <Token>Token.LeftBracket) {
          key = parseComputedPropertyName(state, context);
          if (token === <Token>Token.AsyncKeyword) {
            if (newLine) report(state, Errors.Unexpected);
            objState |= Modifiers.Async | Modifiers.Computed | Modifiers.Method;
          } else {
            if (token === Token.GetKeyword) objState = (objState & ~Modifiers.Setter) | Modifiers.Getter;
            else if ((token & Token.SetKeyword) === Token.SetKeyword)
              objState = (objState & ~Modifiers.Getter) | Modifiers.Setter;
            objState |= Modifiers.Computed & ~Modifiers.Method;
          }

          if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
          state.bindable = state.assignable = false;
          value = parseMethodDeclaration(state, context, objState);
        } else if (state.token === <Token>Token.LeftParen) {
          objState = objState | (Modifiers.Method & ~(Modifiers.Async | Modifiers.Generator));
          state.bindable = state.assignable = false;
          value = parseMethodDeclaration(state, context, objState);
        } else {
          if (optional(state, context, Token.Multiply)) objState |= Modifiers.Generator;

          if ((state.token & Token.IsIdentifier) > 0) {
            key = parseIdentifier(state, context);
            if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
            if (token === <Token>Token.AsyncKeyword) {
              if (newLine) report(state, Errors.Unexpected);
              objState |= Modifiers.Async | Modifiers.Method;
            } else if (token === <Token>Token.GetKeyword) {
              objState = (objState & ~Modifiers.Setter) | Modifiers.Getter;
            } else if (token === <Token>Token.SetKeyword) {
              objState = (objState & ~Modifiers.Getter) | Modifiers.Setter;
            }
            state.bindable = state.assignable = false;
            value = parseMethodDeclaration(state, context, objState);
          } else if (state.token === <Token>Token.NumericLiteral || state.token === <Token>Token.StringLiteral) {
            key = parseLiteral(state, context);
            if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
            if (token === <Token>Token.AsyncKeyword) {
              if (newLine) report(state, Errors.Unexpected);
              objState |= Modifiers.Async | Modifiers.Method;
            } else if (token === <Token>Token.GetKeyword) {
              objState = (objState & ~Modifiers.Setter) | Modifiers.Getter;
            } else if (token === <Token>Token.SetKeyword) {
              objState = (objState & ~Modifiers.Getter) | Modifiers.Setter;
            }
            state.bindable = state.assignable = false;
            value = parseMethodDeclaration(state, context, objState);
          } else if (state.token === <Token>Token.LeftBracket) {
            if (token === <Token>Token.AsyncKeyword) {
              if (newLine) report(state, Errors.Unexpected);
              objState |= Modifiers.Async | Modifiers.Method;
            } else if (token === <Token>Token.GetKeyword) {
              objState = (objState & ~Modifiers.Setter) | Modifiers.Getter;
            } else if (token === <Token>Token.SetKeyword) {
              objState = (objState & ~Modifiers.Getter) | Modifiers.Setter;
            }
            key = parseComputedPropertyName(state, context);
            value = parseMethodDeclaration(state, context, objState);
          }
        }
      } else if (state.token === <Token>Token.NumericLiteral || state.token === <Token>Token.StringLiteral) {
        tokenValue = state.tokenValue;
        key = parseLiteral(state, context);

        if (state.token === <Token>Token.Assign) report(state, Errors.Unexpected);

        if (optional(state, context | Context.AllowPossibleRegEx, Token.Colon)) {
          if (tokenValue === '__proto__') {
            if (hasProto) {
              state.pendingCoverInitializeError = Errors.InvalidCoverInitializedName;
            } else hasProto = true;
          }
          value = acquireGrammar(
            state,
            (context | Context.DisallowInContext) ^ Context.DisallowInContext,
            0,
            parseAssignmentExpression
          );
        } else {
          state.bindable = state.assignable = false;
          value = parseMethodDeclaration(state, context, objState);
          objState |= Modifiers.Method;
        }
      } else if (state.token === <Token>Token.LeftBracket) {
        key = parseComputedPropertyName(state, context);
        objState = (objState & ~(Modifiers.Async | Modifiers.Generator | Modifiers.GetSet)) | Modifiers.Computed;
        if (state.token === <Token>Token.Colon) {
          next(state, context);
          value = parseAssignmentExpression(state, context | Context.AllowPossibleRegEx);
        } else {
          objState |= Modifiers.Method;
          if (state.token !== <Token>Token.LeftParen) report(state, Errors.Unexpected);
          state.bindable = state.assignable = false;
          value = parseMethodDeclaration(state, context, objState);
        }
      } else if (state.token & Token.Multiply) {
        next(state, context);
        if (state.token & Token.IsIdentifier) {
          token = state.token;
          objState &= ~(Modifiers.Method | Modifiers.Async);
          key = parseIdentifier(state, context);
          if (state.token === <Token>Token.LeftParen) {
            state.bindable = state.assignable = false;
            value = parseMethodDeclaration(state, context, objState | Modifiers.Generator);
            objState |= Modifiers.Method | Modifiers.Generator;
          } else {
            if (token === <Token>Token.AsyncKeyword) report(state, Errors.Unexpected);
            if (token === Token.GetKeyword || (token & Token.SetKeyword) === Token.SetKeyword)
              report(state, Errors.Unexpected);
            if (token === <Token>Token.Colon) report(state, Errors.Unexpected);
            report(state, Errors.Unexpected);
          }
        } else if (state.token === <Token>Token.NumericLiteral || state.token === <Token>Token.StringLiteral) {
          key = parseLiteral(state, context);
          state.bindable = state.assignable = false;
          value = parseMethodDeclaration(state, context, objState | Modifiers.Generator);
          objState |= Modifiers.Method;
        } else if (state.token === <Token>Token.LeftBracket) {
          key = parseComputedPropertyName(state, context);
          state.bindable = state.assignable = false;
          value = parseMethodDeclaration(state, context, objState | Modifiers.Generator);
          objState |= Modifiers.Method | Modifiers.Computed;
        } else {
          report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);
        }
      } else {
        report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);
      }

      properties.push(
        finishNode(state, context, objStart, {
          type: 'Property',
          key,
          value,
          kind: !(objState & Modifiers.GetSet) ? 'init' : objState & Modifiers.Setter ? 'set' : 'get',
          computed: (objState & Modifiers.Computed) > 0,
          method: (objState & Modifiers.Method) > 0,
          shorthand: (objState & Modifiers.Shorthand) > 0
        } as any)
      );
    }
    optional(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);
  state.flags &= ~Flags.SeenPrototype;
  state.bindable = state.bindable && bindable;
  state.assignable = state.assignable && assignable;
  state.pendingCoverInitializeError = pendingCoverInitializeError || state.pendingCoverInitializeError;

  return finishNode(state, context, start, {
    type: 'ObjectExpression',
    properties
  });
}

function parseMethodDeclaration(state: ParserState, context: Context, objState: Modifiers): any {
  state.assignable = state.bindable = false;
  const { assignable, bindable, pendingCoverInitializeError } = state;
  state.bindable = state.assignable = true;
  state.pendingCoverInitializeError = null;

  const result = parsePropertyMethod(state, context | Context.InMethod, objState);
  if (state.pendingCoverInitializeError !== null) {
    report(state, Errors.Unexpected);
  }

  state.bindable = bindable;
  state.assignable = assignable;
  state.pendingCoverInitializeError = pendingCoverInitializeError;

  return result;
}

function parsePropertyMethod(state: ParserState, context: Context, objState: Modifiers): any {
  // Create a new function scope
  let functionScope = createScope(ScopeType.BlockStatement);

  let id: ESTree.Identifier | null = null;
  let firstRestricted: string | undefined;
  const { startIndex: start } = state;
  if (state.token & Token.IsIdentifier) {
    validateBindingIdentifier(
      state,
      context & Context.Strict
        ? Context.YieldContext
        : (objState & Modifiers.Generator) > 0
        ? Context.YieldContext
        : 0 | (context & Context.Module) || (objState & Modifiers.Generator) > 0
        ? Context.AwaitContext
        : 0,
      Type.Variable
    );

    addVariableAndDeduplicate(state, context, functionScope, Type.Variable, Origin.None, true, state.tokenValue);
    functionScope = createSubScope(functionScope, ScopeType.BlockStatement);
    firstRestricted = state.tokenValue;
    id = parseIdentifier(state, context);
  }

  context =
    (context |
      Context.SuperProperty |
      Context.AwaitContext |
      Context.YieldContext |
      Context.InArgList |
      ((objState & Modifiers.Constructor) === 0 ? Context.InConstructor | Context.SuperCall : 0)) ^
    (Context.AwaitContext |
      Context.YieldContext |
      Context.InArgList |
      ((objState & Modifiers.Constructor) < 1 ? Context.InConstructor | Context.SuperCall : 0));

  if (objState & Modifiers.Async) context |= Context.AwaitContext;
  if (objState & Modifiers.Generator) context |= Context.YieldContext;
  if (objState & Modifiers.Constructor) context |= Context.InConstructor;

  // Create a argument scope
  const paramScoop = createSubScope(functionScope, ScopeType.ArgumentList);

  const params = parseFormalParameters(
    state,
    context | Context.AllowNewTarget | Context.InMethod,
    paramScoop,
    Origin.ArgList,
    objState
  );

  const body = parseFunctionBody(
    state,
    context | Context.AllowNewTarget | Context.InMethod,
    createSubScope(paramScoop, ScopeType.BlockStatement),
    firstRestricted,
    Origin.None
  );
  return finishNode(state, context, start, {
    type: 'FunctionExpression',
    params,
    body,
    async: (objState & Modifiers.Async) > 0,
    generator: (objState & Modifiers.Generator) > 0,
    id
  } as any);
}

/**
 * Parses string and number literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NumericLiteral)
 * @see [Link](https://tc39.github.io/ecma262/#prod-StringLiteral)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseLiteral(state: ParserState, context: Context): ESTree.Literal {
  const { tokenRaw: raw, tokenValue: value, startIndex } = state;
  if (context & Context.Strict && state.flags & Flags.Octal) report(state, Errors.StrictOctalLiteral);
  next(state, context);
  return context & Context.OptionsRaw
    ? finishNode(state, context, startIndex, {
        type: 'Literal',
        value,
        raw
      })
    : finishNode(state, context, startIndex, {
        type: 'Literal',
        value
      });
}

/**
 * Parses either null or boolean literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BooleanLiteral)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseNullOrTrueOrFalseLiteral(state: ParserState, context: Context): ESTree.Literal {
  const { token, startIndex } = state;
  const raw = KeywordDescTable[token & Token.Type];
  const value = token === Token.NullKeyword ? null : raw === 'true';
  next(state, context);
  return context & Context.OptionsRaw
    ? finishNode(state, context, startIndex, {
        type: 'Literal',
        value,
        raw
      })
    : finishNode(state, context, startIndex, {
        type: 'Literal',
        value
      });
}

function parseThisExpression(state: ParserState, context: Context): ESTree.ThisExpression {
  const { startIndex } = state;
  next(state, context);
  return finishNode(state, context, startIndex, {
    type: 'ThisExpression'
  });
}

export function parseIdentifier(state: ParserState, context: Context): ESTree.Identifier {
  const { tokenRaw: raw, tokenValue: name, startIndex } = state;
  next(state, context);

  return context & Context.OptionsRaw
    ? finishNode(state, context, startIndex, {
        type: 'Identifier',
        name,
        raw
      })
    : finishNode(state, context, startIndex, {
        type: 'Identifier',
        name
      });
}

/**
 * Parse regular expression literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseRegExpLiteral(state: ParserState, context: Context): ESTree.RegExpLiteral {
  const { tokenRegExp: regex, tokenValue: value, startIndex: start } = state;
  next(state, context);
  return finishNode(state, context, start, {
    type: 'Literal',
    value,
    regex
  });
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
  const { tokenRaw: raw, tokenValue: value, startIndex: start } = state;
  next(state, context);
  return finishNode(state, context, start, {
    type: 'Literal',
    value,
    bigint: raw,
    raw
  });
}
