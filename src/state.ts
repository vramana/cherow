import * as ESTree from './estree';
import { Context, Flags, OnComment, OnToken, ParserState, unimplemented, consumeSemicolon } from './common';
import { Token, KeywordDescTable } from './token';
import { next } from './scanner';
import { optional, expect } from './common';
import { ScopeState, ScopeType, createSubScope } from './scope';
import { report, Errors } from './errors';

export const enum LabelledState {
  None = 0,
  Allow = 1 << 0,
  Disallow = 1 << 1
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
    exportedBindings: []
  };
}

/**
 * Parse a module body, function body, script body, etc.
 */
export function parseTopLevel(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  // Prime the scanner
  next(state, context | Context.ExpressionStart);

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
    case Token.ImportKeyword:
      unimplemented();
    default:
      return parseStatementListItem(state, context, scope);
  }
}

function parseStatementListItem(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement {
  switch (state.token) {
    case Token.FunctionKeyword:
    case Token.ClassKeyword:
    case Token.ConstKeyword:
    case Token.LetKeyword:
    case Token.AsyncKeyword:
    default:
      return parseStatement(state, context, scope, LabelledState.Allow);
  }
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
    case Token.SwitchKeyword:
      return parseSwitchStatement(state, context, scope);
    case Token.DoKeyword:
      return parseDoWhileStatement(state, context, scope);
    case Token.ReturnKeyword:
      return parseReturnStatement(state, context);
    case Token.IfKeyword:
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
      unimplemented();
    case Token.ThrowKeyword:
      return parseThrowStatement(state, context);
    case Token.Semicolon:
      return parseEmptyStatement(state, context);
    case Token.LeftBrace:
      return parseBlockStatement(
        state,
        (context | Context.TopLevel) ^ Context.TopLevel,
        createSubScope(scope, ScopeType.BlockStatement)
      );
    case Token.ForKeyword:
      unimplemented();
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
  expect(state, context | Context.ExpressionStart, Token.RightBrace);

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
  const argument: ESTree.Expression = parseExpression(state, context);
  consumeSemicolon(state, context);
  return {
    type: 'ThrowStatement',
    argument
  };
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
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const discriminant = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  expect(state, context, Token.LeftBrace);
  const cases: ESTree.SwitchCase[] = [];
  let seenDefault = false;
  const switchScope = createSubScope(scope, ScopeType.SwitchStatement);
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
  next(state, context | Context.ExpressionStart);
  const argument =
    (state.token & Token.ASI) < 1 && (state.flags & Flags.NewLine) < 1
      ? parseExpression(state, context & ~Context.InFunctionBody)
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
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
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
    label = parseIdentifier(state, context);
  }
  consumeSemicolon(state, context);

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
    label = parseIdentifier(state, context);
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
  next(state, context);
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
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
 * Parses do while statement
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseDoWhileStatement(state: ParserState, context: Context, scope: ScopeState): any {
  expect(state, context, Token.DoKeyword);
  const body = parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, LabelledState.Disallow);
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
  const expr: ESTree.Expression = parseExpression(state, context);
  if (token & Token.Keyword && state.token === Token.Colon) {
    next(state, context | Context.ExpressionStart);
    return {
      type: 'LabeledStatement',
      label: expr as ESTree.Identifier,
      body: parseStatement(state, (context | Context.TopLevel) ^ Context.TopLevel, scope, label)
    };
  }
  consumeSemicolon(state, context);
  return {
    type: 'ExpressionStatement',
    expression: expr
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

export function parseAssignmentExpression(state: ParserState, context: Context): any {
  const expr = parseConditionalExpression(state, context);
  if ((state.token & Token.IsAssignOp) === Token.IsAssignOp) {
    const operator = state.token;
    next(state, context | Context.ExpressionStart);
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
  if (!optional(state, context | Context.ExpressionStart, Token.QuestionMark)) return test;
  const consequent = parseAssignmentExpression(state, context);
  expect(state, context | Context.ExpressionStart, Token.Colon);
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
  while ((state.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
    const t: Token = state.token;
    const prec = t & Token.Precedence;
    const delta = ((t === Token.Exponentiate) as any) << Token.PrecStart;
    if (prec + delta <= minPrec) break;
    next(state, context | Context.ExpressionStart);
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
 * Parses unary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UnaryExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseUnaryExpression(state: ParserState, context: Context): any {
  const t = state.token;
  if ((t & Token.IsUnaryOp) === Token.IsUnaryOp) {
    next(state, context | Context.ExpressionStart);
    const argument: ESTree.Expression = parseUnaryExpression(state, context);
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
      default:
        return expr;
    }
  }
}
export function parseNewTargetExpression(state: ParserState, context: Context, id: ESTree.Identifier): any {
  if (state.tokenValue === 'target') {
    return {
      meta: id,
      type: 'MetaProperty',
      property: parseIdentifier(state, context)
    };
  }
}

export function parseNewOrMemberExpression(state: ParserState, context: Context): any {
  if (state.token === Token.NewKeyword) {
    let result: any;
    const id = parseIdentifier(state, context | Context.ExpressionStart);
    if (state.token === Token.SuperKeyword) {
      result = { type: 'Super' };
    } else if (optional(state, context, Token.Period)) {
      return parseNewTargetExpression(state, context, id);
    } else {
      result = parseNewOrMemberExpression(state, context);
    }

    return {
      type: 'NewExpression',
      callee: result,
      arguments: state.token === Token.LeftParen ? parseArgumentList(state, context) : []
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
      default:
        return expr;
    }
  }
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
  expect(state, context, Token.LeftParen);
  const expressions: (ESTree.Expression | ESTree.SpreadElement)[] = [];
  while (state.token !== Token.RightParen) {
    if (state.token === Token.Ellipsis) {
      expressions.push(parseSpreadElement(state, context));
    } else {
      expressions.push(parseAssignmentExpression(state, context));
    }
    if (state.token !== Token.RightParen) expect(state, context, Token.Comma);
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
      return parseArrayExpression(state, context);
    case Token.LeftParen:
      return parseGroupExpression(state, context);
    case Token.FunctionKeyword:
    case Token.ClassKeyword:
    case Token.TrueKeyword:
    case Token.FalseKeyword:
      return parseBooleanLiteral(state, context);
    case Token.NullKeyword:
      return parseNullLiteral(state, context);
    case Token.ThisKeyword:
      return parseThisExpression(state, context);
    case Token.LeftBrace:
    case Token.AsyncKeyword:
    default:
      return parseIdentifier(state, context);
  }
}
export function parseArrayExpression(state: ParserState, context: Context): any {
  expect(state, context | Context.ExpressionStart, Token.LeftBracket);
  let elements: any = [];
  while (state.token !== Token.RightBracket) {
    elements.push(parseAssignmentExpression(state, context | Context.ExpressionStart));
    if (state.token !== Token.RightBracket) expect(state, context, Token.Comma);
  }
  expect(state, context, Token.RightBracket);
  return {
    type: 'ArrayExpression',
    elements
  };
}

export function parseGroupExpression(state: ParserState, context: Context): any {
  expect(state, context, Token.LeftParen);
  const expr = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  return expr;
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
