import * as ESTree from './estree';
import { Token, KeywordDescTable } from './token';
import { nextToken } from './lexer/scan';
import { ParserState, Location } from './types';
import { report, Errors } from './errors';
import { parseIdentifier } from './parser/expressions';

export const enum Context {
  Empty                 = 0,
  OptionsRaw            = 1 << 0,
  OptionsNext           = 1 << 1,
  OptionsLoc            = 1 << 2,
  OptionsRanges         = 1 << 3,
  OptionsJSX            = 1 << 4,
  OptionsRawidentifiers = 1 << 5,
  OptionsGlobalReturn   = 1 << 6,
  OptionsShebang        = 1 << 7,
  OptionsComments       = 1 << 8,
  OptionsExperimental   = 1 << 9,
  ExpressionStart       = 1 << 10,
  InGenerator           = 1 << 11,
  InAsync               = 1 << 12,
  InParam               = 1 << 13,
  Strict                = 1 << 14,
  Module                = 1 << 15,
  TaggedTemplate        = 1 << 16,
  Tokenize              = 1 << 17,
  InClass               = 1 << 18,
  NewTarget             = 1 << 19,
  InFunctionBody        = 1 << 20,
  DisallowIn            = 1 << 21,
  RequireIdentifier     = 1 << 22,
}

export const enum Flags {
  Empty           = 0,
  LineTerminator  = 1 << 0,
  HasOctal        = 1 << 1,
  EdgeCase        = 1 << 2,
  SimpleParameterList = 1 << 3,
}

/*@internal*/
export const enum LabelState {
  Empty            = 0,      // Break statement
  Iteration        = 1 << 0, // Parsing iteration statement
  CrossingBoundary = 1 << 1, // Crossing function boundary
}

/* Binding origin */
export const enum BindingOrigin {
  Empty           = 0,
  ForStatement    = 1 << 0,
  FunctionArgs    = 1 << 1,
  CatchClause     = 1 << 2,
  Export          = 1 << 3,
  Import          = 1 << 4,
  Statement       = 1 << 5,
}

/* Binding state */
export const enum BindingType {
  Empty       = 0,
  Args        = 1 << 0,
  Var         = 1 << 1,
  Let         = 1 << 2,
  Const       = 1 << 3,
  Class       = 1 << 4,
  Variable    = Var | Let | Const
}

export const enum LabelledFunctionState {
  Allow,
  Disallow
}

/**
 * Finish each the node for each parse. Set line / and column on the node if the
 * options are set for it
 *
 * @param parser Parser object
 * @param context Context masks
 * @param meta Line / column
 * @param node AST node
 */
export function finishNode < T extends ESTree.Node > (
  state: ParserState,
  context: Context,
  meta: Location,
  node: any): T {

  if (context & Context.OptionsRanges) {
      node.start = meta.index;
      node.end = state.lastIndex;
  }

  if (context & Context.OptionsLoc) {
      node.loc = {
          start: {
              line: meta.line,
              column: meta.column
          },
          end: {
              line: state.lastLine,
              column: state.lastColumn
          }
      };
  }

  return node as T;
}

/**
 * Get current node location
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function getLocation(state: ParserState): Location {
  return {
    line: state.startLine,
    column: state.startColumn,
    index: state.startIndex
  };
}

export function optional(state: ParserState, context: Context, token: Token): boolean {
  if (state.token !== token) return false;
  nextToken(state, context);
  return true;
}

export function expect(state: ParserState, context: Context, t: Token): boolean {
  if (state.token !== t) {
      report(state, Errors.UnexpectedToken, KeywordDescTable[t & Token.Type]);
      return false;
  }
  nextToken(state, context);
  return true;
}
 /**
 * Validates if the next token in the stream is a left paren or a period
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function nextTokenIsLeftParenOrPeriod(state: ParserState, context: Context): boolean {
  nextToken(state, context);
  return state.token === Token.LeftParen || state.token === Token.Period;
}

export function nextTokenIsIdentifierOrLeftParen(state: ParserState, context: Context) {
  nextToken(state, context);
  return state.token & Token.IdentifierOrContextual || state.token === Token.LeftParen;
}

export function nextTokenIsFuncKeywordOnSameLine(state: ParserState, context: Context): boolean {
  const line = state.line;
  nextToken(state, context);
  return state.token === Token.FunctionKeyword && state.line === line;
}

/**
 * Returns true if this an valid lexical binding and not an identifier
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function isLexical(state: ParserState, context: Context): boolean {
  nextToken(state, context);
  return (state.token & Token.IdentifierOrContextual) > 0 || state.token === Token.LeftBrace || state.token === Token.LeftBracket || state.token === Token.YieldKeyword || state.token === Token.AwaitKeyword;
}

/**
 * Automatic Semicolon Insertion
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function consumeSemicolon(state: ParserState, context: Context): void | boolean {
  return (state.token & Token.ASI) === Token.ASI || state.flags & Flags.LineTerminator
    ? optional(state, context, Token.Semicolon)
    : report(state, Errors.Unexpected);
}

export function isStartOfExpression(t: Token): boolean {
  if (t & (Token.IsUnaryOp | Token.IsUpdateOp)) return true;
  switch (t) {
      case Token.Identifier:
      case Token.NumericLiteral:
      case Token.StringLiteral:
      case Token.RegularExpression:
      case Token.FalseKeyword:
      case Token.TrueKeyword:
      case Token.NullKeyword:
      case Token.Template:
      case Token.LeftParen:
      case Token.LeftBrace:
      case Token.LeftBracket:
      case Token.DivideAssign:
      case Token.Divide:
      case Token.LessThan:
      case Token.VarKeyword:
      case Token.LetKeyword:
      case Token.ConstKeyword:
      case Token.FunctionKeyword:
      case Token.IfKeyword:
      case Token.ImportKeyword:
      case Token.SuperKeyword:
      case Token.SwitchKeyword:
      case Token.ThisKeyword:
      case Token.ThrowKeyword:
      case Token.YieldKeyword:
      case Token.AwaitKeyword:
      case Token.Eval:
      case Token.Arguments:
      case Token.BigInt:
          return true;
      default:
          return false;
  }
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
        report(state, Errors.Unexpected);
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
  const lblstate = getLabel(state, `@${label}`);
  if ((lblstate & LabelState.Iteration) !== LabelState.Iteration) report(state, Errors.Unexpected);
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
 * Reinterpret various expressions as pattern
 * This is only used for assignment and arrow parameter list
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param node AST node
 */
export function reinterpret(state: ParserState, context: Context, node: any): void {
  switch (node.type) {
      case 'Identifier':
      case 'ArrayPattern':
      case 'AssignmentPattern':
      case 'ObjectPattern':
      case 'RestElement':
      case 'MetaProperty':
          return;
      case 'ArrayExpression':
          node.type = 'ArrayPattern';
          for (let i = 0; i < node.elements.length; ++i) {
              // skip holes in pattern
              if (node.elements[i] !== null) {
                  reinterpret(state, context, node.elements[i]);
              }
          }
          return;
      case 'ObjectExpression':
          node.type = 'ObjectPattern';

          for (let i = 0; i < node.properties.length; i++) {
              reinterpret(state, context, node.properties[i]);
          }

          return;

      case 'Property':
          reinterpret(state, context, node.value);
          return;

      case 'SpreadElement':
          node.type = 'RestElement';
          reinterpret(state, context, node.argument);
          break;
      case 'AssignmentExpression':
          node.type = 'AssignmentPattern';
          delete node.operator; // operator is not relevant for assignment pattern
          reinterpret(state, context, node.left); // recursive descent
          return;

      case 'MemberExpression':
          if (!(context & Context.InParam)) return;
          // Fall through
      default:
          report(state, Errors.Unexpected);
  }
}

/**
 * Parse identifier name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-IdentifierName)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param t token
 */

export function parseIdentifierName(state: ParserState, context: Context, t: Token): ESTree.Identifier {
  if (!(t & (Token.Identifier | Token.Keyword))) {
      report(state, Errors.Unexpected);
  }
  return parseIdentifier(state, context);
}
