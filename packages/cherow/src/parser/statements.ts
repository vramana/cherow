import * as ESTree from '../estree';
import { ParserState, Location } from '../types';
import { parseExpression, parseIdentifier, parseAssignmentExpression, parseSequenceExpression } from './expressions';
import { Token, KeywordDescTable } from '../token';
import { nextToken } from '../lexer/scan';
import { parseFunctionDeclaration, parseClassDeclaration, parseVariableDeclarationList } from './declarations';
import { lookAheadOrScan } from '../lexer/common';
import { parseBindingIdentifierOrPattern } from './pattern';
import { Errors, report } from '../errors';
import { parseDirective } from './directives';
import {
  LabelledFunctionState,
  getLabel,
  addLabel,
  Context,
  Flags,
  LabelState,
  finishNode,
  getLocation,
  consumeSemicolon,
  nextTokenIsFuncKeywordOnSameLine,
  nextTokenIsLeftParenOrPeriod,
  isLexical,
  expect,
  optional,
  validateBreakStatement,
  validateContinueLabel,
  BindingType,
  BindingOrigin,
  reinterpret
} from '../common';

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */

export function parseStatementList(state: ParserState, context: Context): ESTree.Statement[] {
  nextToken(state, context);
  const statements: ESTree.Statement[] = [];
  while (state.token & Token.StringLiteral) {
      const tokenValue = state.tokenValue;
      if (!(context & Context.Strict) && tokenValue.length === 10 && tokenValue === 'use strict') {
          context |= Context.Strict;
      }
      statements.push(parseDirective(state, context));
  }

  while (state.token !== Token.EndOfSource) {
      statements.push(parseStatementListItem(state, context));
  }

  return statements;
}

/**
 * Parses statement list items
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementListItem)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseStatementListItem(state: ParserState, context: Context): ESTree.Statement {
  switch (state.token) {
      case Token.FunctionKeyword:
          return parseFunctionDeclaration(state, context, false);
      case Token.ClassKeyword:
          return parseClassDeclaration(state, context);
      case Token.ConstKeyword:
          return parseVariableStatement(state, context, BindingType.Const, BindingOrigin.Statement);
      case Token.LetKeyword:
          return parseLetOrExpressionStatement(state, context);
      case Token.AsyncKeyword:
          return parseAsyncFunctionOrExpressionStatement(state, context);
      case Token.ImportKeyword:
          if (context & Context.OptionsNext && lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true)) {
              return parseExpressionStatement(state, context);
          }
      case Token.ExportKeyword:
          if (context & Context.Module) {
              report(state, Errors.ImportExportDeclAtTopLevel, KeywordDescTable[state.token & Token.Type]);
          }
      default:
          return parseStatement(state, context, LabelledFunctionState.Allow);
  }
}

/**
 * Parses statements
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseStatement(state: ParserState, context: Context, label: any): ESTree.Statement {
  switch (state.token) {
    case Token.VarKeyword:
      return parseVariableStatement(state, context, BindingType.Var, BindingOrigin.Statement);
    case Token.Semicolon:
      return parseEmptyStatement(state, context);
    case Token.SwitchKeyword:
      return parseSwitchStatement(state, context);
    case Token.LeftBrace:
      return parseBlockStatement(state, context);
    case Token.ReturnKeyword:
      return parseReturnStatement(state, context);
    case Token.IfKeyword:
      return parseIfStatement(state, context);
    case Token.DoKeyword:
      return parseDoWhileStatement(state, context);
    case Token.WhileKeyword:
      return parseWhileStatement(state, context);
    case Token.WithKeyword:
      return parseWithStatement(state, context);
    case Token.BreakKeyword:
      return parseBreakStatement(state, context);
    case Token.ContinueKeyword:
      return parseContinueStatement(state, context);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(state, context);
    case Token.ThrowKeyword:
      return parseThrowStatement(state, context);
    case Token.TryKeyword:
      return parseTryStatement(state, context);
    case Token.ForKeyword:
       return parseForStatement(state, context);
    case Token.AsyncKeyword:
      if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
        report(state, Errors.AsyncFunctionInSingleStatementContext);
      }
      return parseExpressionOrLabelledStatement(state, context, label);
    case Token.FunctionKeyword:
      report(state, context & Context.Strict ? Errors.StrictFunction : Errors.SloppyFunction);
    case Token.ClassKeyword:
      report(state, Errors.Unexpected);
    default:
      return parseExpressionOrLabelledStatement(state, context, label);
  }
}

/**
 * Parses switch statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SwitchStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseSwitchStatement(state: ParserState, context: Context): ESTree.SwitchStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const discriminant = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  expect(state, context, Token.LeftBrace);
  const cases: ESTree.SwitchCase[] = [];
  let seenDefault = false;
  const previousSwitchStatement = state.switchStatement;
  state.switchStatement = LabelState.Iteration;
  while (state.token !== Token.RightBrace) {
      const clausePos = getLocation(state);
      let test: ESTree.Expression | null = null;
      if (optional(state, context, Token.CaseKeyword)) {
          test = parseExpression(state, context);
      } else {
          expect(state, context, Token.DefaultKeyword);
          if (seenDefault) report(state, Errors.MultipleDefaultsInSwitch);
          seenDefault = true;
      }
      cases.push(parseCaseOrDefaultClauses(state, context, clausePos, test));
  }
  state.switchStatement = previousSwitchStatement;
  expect(state, context, Token.RightBrace);

  return finishNode(state, context, pos, {
      type: 'SwitchStatement',
      discriminant,
      cases
  });
}

/**
 * Parses either default clause or case clauses
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CaseClauses)
 * @see [Link](https://tc39.github.io/ecma262/#prod-DefaultClause)
 *
 * @param state  Parser object
 * @param context Context masks
 */
export function parseCaseOrDefaultClauses(
  state: ParserState,
  context: Context,
  pos: any,
  test: ESTree.Expression | null
): ESTree.SwitchCase {
  expect(state, context, Token.Colon);
  const consequent: ESTree.Statement[] = [];
  while (state.token !== Token.CaseKeyword &&
         state.token !== Token.RightBrace &&
         state.token !== Token.DefaultKeyword) {
      consequent.push(parseStatementListItem(state, context));
  }
  return finishNode(state, context, pos, {
      type: 'SwitchCase',
      test,
      consequent
  });
}

/**
* Parses the if statement production
*
* @see [Link](https://tc39.github.io/ecma262/#sec-if-statement)
*
* @param state  state object
* @param context Context masks
*/
export function parseIfStatement(state: ParserState, context: Context): ESTree.IfStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const consequent = parseConsequentOrAlternate(state, context);
  const alternate = optional(state, context, Token.ElseKeyword) ? parseConsequentOrAlternate(state, context) : null;
  return finishNode(state, context, pos, {
      type: 'IfStatement',
      test,
      consequent,
      alternate
  });
}

/**
* Parse either consequent or alternate. Supports AnnexB.
* @param state  state object
* @param context Context masks
*/
function parseConsequentOrAlternate(state: ParserState, context: Context): ESTree.Statement | ESTree.FunctionDeclaration {
  return context & Context.Strict || state.token !== Token.FunctionKeyword ?
      parseStatement(state, context, LabelledFunctionState.Disallow) :
      parseFunctionDeclaration(state, context, false);
}

/**
* Parses do while statement
*
* @param state  state object
* @param context Context masks
*/
export function parseDoWhileStatement(state: ParserState, context: Context): ESTree.DoWhileStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, context, LabelledFunctionState.Disallow);
  state.iterationStatement = previousIterationStatement;
  expect(state, context, Token.WhileKeyword);
  expect(state, context, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  optional(state, context, Token.Semicolon);
  return finishNode(state, context, pos, {
      type: 'DoWhileStatement',
      body,
      test
  });
}

/**
* Parses while statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-WhileStatement)
*
* @param state  state object
* @param context Context masks
*/
export function parseWhileStatement(state: ParserState, context: Context): ESTree.WhileStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, context, LabelledFunctionState.Disallow);
  state.iterationStatement = previousIterationStatement;

  return finishNode(state, context, pos, {
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
* @param state  state object
* @param context Context masks
*/
export function parseContinueStatement(state: ParserState, context: Context): ESTree.ContinueStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  let label: ESTree.Identifier | undefined | null = null;
  if (!(state.flags & Flags.LineTerminator) && state.token & Token.Keyword) {
      const { tokenValue  } = state;
      label = parseIdentifier(state, context);
      validateContinueLabel(state, tokenValue);
  }
  consumeSemicolon(state, context);
  if (label === null &&  state.iterationStatement === LabelState.Empty && state.switchStatement === LabelState.Empty) {
      report(state, Errors.IllegalContinue);
  }
  return finishNode(state, context, pos, {
      type: 'ContinueStatement',
      label
  });
}

/**
* Parses the break statement production
*
* @see [Link](https://tc39.github.io/ecma262/#prod-BreakStatement)
*
* @param state  state object
* @param context Context masks
*/
export function parseBreakStatement(state: ParserState, context: Context): ESTree.BreakStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  let label: ESTree.Identifier | undefined | null = null;
  if (!(state.flags & Flags.LineTerminator) && state.token & Token.Keyword) {
      const { tokenValue  } = state;
      label = parseIdentifier(state, context);
      validateBreakStatement(state, tokenValue);
  } else if (state.iterationStatement === LabelState.Empty &&
        state.switchStatement === LabelState.Empty) {
        report(state, Errors.IllegalBreak);
    }
  consumeSemicolon(state, context);
  return finishNode(state, context, pos, {
      type: 'BreakStatement',
      label
  });
}

/**
* Parses with statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-WithStatement)
*
* @param state  state object
* @param context Context masks
*/
export function parseWithStatement(state: ParserState, context: Context): ESTree.WithStatement {
  if (context & Context.Strict) report(state, Errors.StrictModeWith);
  const pos = getLocation(state);
  nextToken(state, context);
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const object = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const body = parseStatement(state, context, LabelledFunctionState.Disallow);
  return finishNode(state, context, pos, {
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
 * @param state  state object
 * @param context Context masks
 */
export function parseDebuggerStatement(state: ParserState, context: Context): ESTree.DebuggerStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, pos, {
      type: 'DebuggerStatement'
  });
}

/**
* Parses block statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
* @see [Link](https://tc39.github.io/ecma262/#prod-Block)
*
* @param state  state object
* @param context Context masks
*/
export function parseBlockStatement(state: ParserState, context: Context): ESTree.BlockStatement {
  const pos = getLocation(state);
  const body: ESTree.Statement[] = [];
  nextToken(state, context);
  while (state.token !== Token.RightBrace) {
      body.push(parseStatementListItem(state, context));
  }
  expect(state, context | Context.ExpressionStart, Token.RightBrace);

  return finishNode(state, context, pos, {
      type: 'BlockStatement',
      body
  });
}

/**
* Parses return statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ReturnStatement)
*
* @param state  state object
* @param context Context masks
*/
export function parseReturnStatement(state: ParserState, context: Context): ESTree.ReturnStatement {
  if (!(context & (Context.OptionsGlobalReturn | Context.InFunctionBody))) report(state, Errors.IllegalReturn);
  const pos = getLocation(state);
  nextToken(state, context | Context.ExpressionStart);
  const argument = (state.token & Token.ASI) < 1 && (state.flags & Flags.LineTerminator) < 1 ?
      parseExpression(state, context  & ~Context.InFunctionBody) :
      null;
  consumeSemicolon(state, context);
  return finishNode(state, context, pos, {
      type: 'ReturnStatement',
      argument
  });
}

/**
* Parses try statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
*
* @param state  state object
* @param context Context masks
*/
export function parseTryStatement(state: ParserState, context: Context): ESTree.TryStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  const block = parseBlockStatement(state, context);
  const handler = state.token === Token.CatchKeyword ? parseCatchBlock(state, context) : null;
  const finalizer = optional(state, context, Token.FinallyKeyword) ? parseBlockStatement(state, context) : null;
  if (!handler && !finalizer)  report(state, Errors.NoCatchOrFinally);
  return finishNode(state, context, pos, {
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
* @param parser  Parser object
* @param context Context masks
*/
export function parseCatchBlock(state: ParserState, context: Context): any {
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
  const pos = getLocation(state);
  nextToken(state, context);
  let param: ESTree.PatternTop | null = null;
  if (optional(state, context, Token.LeftParen)) {
      if (state.token === Token.RightParen) report(state, Errors.NoCatchClause);
      param = parseBindingIdentifierOrPattern(state, context);
      if (state.token === Token.Assign)  report(state, Errors.NoCatchClause);
      expect(state, context, Token.RightParen);
  }
  const body = parseBlockStatement(state, context);

  return finishNode(state, context, pos, {
      type: 'CatchClause',
      param,
      body
  });
}

/**
* Parses throw statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ThrowStatement)
*
* @param state  state object
* @param context Context masks
*/
export function parseThrowStatement(state: ParserState, context: Context): ESTree.ThrowStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  if (state.flags & Flags.LineTerminator) report(state, Errors.NewlineAfterThrow);
  const argument: ESTree.Expression = parseExpression(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, pos, {
      type: 'ThrowStatement',
      argument
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
  const pos = getLocation(state);
  nextToken(state, context);
  return finishNode(state, context, pos, {
    type: 'EmptyStatement'
  });
}

/**
 * Parses variable statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseVariableStatement(
  state: ParserState,
  context: Context,
  type: BindingType,
  origin: BindingOrigin,
): ESTree.VariableDeclaration {
  const pos = getLocation(state);
  const { token } = state;
  nextToken(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin);
  // Only consume semicolons if not inside the 'ForStatement' production
  consumeSemicolon(state, context);
  return finishNode(state, context, pos, {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[token & Token.Type],
    declarations
  });
}

/**
 * Parses either an lexical declaration (let) or an expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseLetOrExpressionStatement(
  state: ParserState,
  context: Context,
): ReturnType<typeof parseVariableStatement | typeof parseExpressionOrLabelledStatement> {
    return lookAheadOrScan(state, context, isLexical, true)
      ? parseVariableStatement(state, context, BindingType.Let, BindingOrigin.Statement)
      : parseExpressionOrLabelledStatement(state, context, LabelledFunctionState.Disallow);
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
): ReturnType<typeof parseFunctionDeclaration | typeof parseExpressionOrLabelledStatement> {
    const pos = getLocation(state);
    return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
      ? parseFunctionDeclaration(state, context, true, pos)
      : parseExpressionOrLabelledStatement(state, context, LabelledFunctionState.Disallow);
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
  label: LabelledFunctionState
): ESTree.ExpressionStatement | ESTree.LabeledStatement {
  const pos = getLocation(state);
  const token = state.token;
  const tokenValue = state.tokenValue;
  const expr: ESTree.Expression = parseExpression(state, context);
  if (token & Token.Keyword && state.token === Token.Colon) {
      nextToken(state, context | Context.ExpressionStart);
      if (context & Context.Module && token === Token.AwaitKeyword) {
          report(state, Errors.Unexpected);
      } else if (context & (Context.InGenerator | Context.Strict) && token === Token.YieldKeyword) {
          report(state, Errors.Unexpected);
      } else if (getLabel(state, `@${tokenValue}`, false, true)) {
          report(state, Errors.LabelRedeclaration, tokenValue);
      }
      addLabel(state, tokenValue);
      let body: ESTree.Statement | ESTree.FunctionDeclaration | null = null;
      if (state.token === Token.FunctionKeyword && !(context & Context.Strict) &&
          label === LabelledFunctionState.Allow) {
          body = parseFunctionDeclaration(state, context, false);
      } else body = parseStatement(state, context, state);
      state.labelDepth--;
      return finishNode(state, context, pos, {
          type: 'LabeledStatement',
          label: expr as ESTree.Identifier,
          body
      });
  }
  consumeSemicolon(state, context);
  return finishNode(state, context, pos, {
      type: 'ExpressionStatement',
      expression: expr
  });
}

function parseForStatement(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  nextToken(state, context);
  const forAwait = !!(context & Context.InAsync) && optional(state, context, Token.AwaitKeyword);
  expect(state, context, Token.LeftParen);
  let init: any = null;
  let declarations: ESTree.VariableDeclarator[] | null = null;
  let type: 'ForStatement' | 'ForInStatement' | 'ForOfStatement' = 'ForStatement';
  let test: ESTree.Expression | null = null;
  let update: ESTree.Expression | null = null;
  let right;
  const sequencePos: Location | null = getLocation(state);
  let bindingType: BindingType = BindingType.Empty;
  if (state.token !== Token.Semicolon) {
      const token = state.token;
      if (token === Token.VarKeyword) {
          bindingType = BindingType.Var;
      } else if (token === Token.ConstKeyword) {
          bindingType = BindingType.Const;
      } else if (token === Token.LetKeyword && lookAheadOrScan(state, context, isLexical, true)) {
          bindingType = BindingType.Let;
      } else init = parseExpression(state, context | Context.DisallowIn);

      if (bindingType & BindingType.Variable) {
          const vpos = getLocation(state);
          nextToken(state, context);
          declarations = parseVariableDeclarationList(state, context | Context.DisallowIn, bindingType, BindingOrigin.ForStatement);
          init = finishNode(state, context, vpos, {
              type: 'VariableDeclaration',
              kind: KeywordDescTable[token & Token.Type],
              declarations
          });
      }
  }

  if (forAwait ? expect(state, context, Token.OfKeyword) : optional(state, context, Token.OfKeyword)) {
      type = 'ForOfStatement';
      if (bindingType & BindingType.Variable) {} else reinterpret(state, context, init);
      right = parseAssignmentExpression(state, context);
  } else if (optional(state, context, Token.InKeyword)) {
      type = 'ForInStatement';
      if (bindingType & BindingType.Variable) {} else reinterpret(state, context, init);
      right = parseExpression(state, context);
  } else {

      expect(state, context, Token.Semicolon);
      if (state.token !== Token.Semicolon) {
          test = parseExpression(state, context);
      }
      expect(state, context, Token.Semicolon);
      if (state.token !== Token.RightParen) update = parseExpression(state, context);
  }

  expect(state, context, Token.RightParen);

  const previousIterationStatement = state.iterationStatement;
  state.iterationStatement = LabelState.Iteration;
  const body = parseStatement(state, context, LabelledFunctionState.Disallow);
  state.iterationStatement = previousIterationStatement;

  return finishNode(state, context, pos, type === 'ForOfStatement' ? {
          type,
          body,
          left: init,
          right,
          await: forAwait
      } :
      right ? {
          type: type as 'ForInStatement',
          body,
          left: init,
          right
      } : {
          type: type as 'ForStatement',
          body,
          init,
          test,
          update
      });
}

/**
 * Parses expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseExpressionStatement(state: ParserState, context: Context): ESTree.ExpressionStatement {
  const pos = getLocation(state);
  const expr: ESTree.Expression = parseExpression(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, pos, {
    type: 'ExpressionStatement',
    expression: expr
  });
}
