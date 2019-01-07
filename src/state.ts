import * as ESTree from './estree';
import { Context, Flags, OnComment, OnToken, ParserState, unimplemented, consumeSemicolon } from './common';
import { Token, KeywordDescTable } from './token';
import { next } from './scanner';
import { optional, expect } from './common';
import { ScopeState } from './scope';

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
  next(state, context);
  const statements: ESTree.Statement[] = [];

  while (state.token === Token.StringLiteral) {
    const tokenValue = state.tokenValue;
    if (!(context & Context.Strict) && tokenValue.length === 10 && tokenValue === 'use strict') {
      context |= Context.Strict;
    }
    statements.push(parseDirective(state, context));
  }

  while (state.token !== Token.EndOfSource) {
    if (context & Context.Module) statements.push(parseModuleItemList(state, context));
    else statements.push(parseStatementList(state, context, scope));
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

function parseModuleItemList(_: ParserState, __: Context): ESTree.Statement {
  // TODO
  return unimplemented();
}

function parseStatementList(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement {
  switch (state.token) {
    case Token.FunctionKeyword:
    case Token.ClassKeyword:
    case Token.ConstKeyword:
    case Token.LetKeyword:
    case Token.AsyncKeyword:
    default:
      return parseStatement(state, context, scope);
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
function parseStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement {
  switch (state.token) {
    case Token.VarKeyword:
    case Token.TryKeyword:
    case Token.SwitchKeyword:
    case Token.DoKeyword:
    case Token.ReturnKeyword:
    case Token.IfKeyword:
    case Token.WhileKeyword:
    case Token.WithKeyword:
    case Token.BreakKeyword:
    case Token.ContinueKeyword:
    case Token.DebuggerKeyword:
    case Token.ThrowKeyword:
    case Token.Semicolon:
    case Token.LeftBrace:
    case Token.ForKeyword:
    case Token.FunctionKeyword:
    case Token.ClassKeyword:
    default:
      return parseExpressionOrLabelledStatement(state, context, scope);
  }
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
export function parseExpressionOrLabelledStatement(state: ParserState, context: Context, scope: ScopeState): any {
  const token = state.token;
  const expr: ESTree.Expression = parseExpression(state, context);
  let s = scope;
  console.log(expr);
  // consumeSemicolon(state, context);
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

  if (state.token & Token.IsAssignOp) {
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
  while (state.token & Token.IsBinaryOp) {
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
  if (t & Token.IsUnaryOp) {
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
  if (state.token & Token.IsUpdateOp) {
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

  if (state.token & Token.IsUpdateOp && (state.flags & Flags.NewLine) < 1) {
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
    case Token.LeftBracket:
    case Token.LeftParen:
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
