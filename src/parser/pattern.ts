import { Token } from '../token';
import * as ESTree from '../estree';
import {
  Context,
  ParserState,
  Type,
  Origin,
  validateBindingIdentifier,
  addToExportedNamesAndCheckDuplicates,
  addToExportedBindings,
  ScopeState,
  secludeGrammar,
  nameIsArgumentsOrEval,
  finishNode
} from '../common';
import { scanSingleToken } from '../scanner';
import { parseAssignmentExpression, parseIdentifier, parseLiteral, parseComputedPropertyName } from './expression';
import { report, Errors } from '../errors';
import { optional, expect, recordTokenValue } from '../common';

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
  const { tokenValue: name, token, startIndex, startLine, startColumn } = state;
  if ((token & Token.IsIdentifier) === 0 && token !== Token.EscapedStrictReserved) report(state, Errors.NoIdent);

  // TODO: (fkleuver) This should be tokens in 'token.ts', and validated inside 'validateBindingIdentifier'
  if (context & Context.Strict) {
    if (nameIsArgumentsOrEval(name) || name === 'enum') report(state, Errors.InvalidEvalArgument, name);
  } else if (name === 'enum') report(state, Errors.KeywordNotId);

  validateBindingIdentifier(state, context, type);
  recordTokenValue(
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
    addToExportedNamesAndCheckDuplicates(state, state.tokenValue);
    addToExportedBindings(state, state.tokenValue);
  }

  scanSingleToken(state, context | Context.AllowPossibleRegEx);
  return finishNode(state, context, startIndex, startLine, startColumn, {
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
): ESTree.RestElement {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return finishNode(state, context, start, line, column, {
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
): ESTree.RestElement {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return finishNode(state, context, start, line, column, {
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
  const { startIndex: start, startLine: line, startColumn: column } = state;
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
  return finishNode(state, context, start, line, column, {
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
  const { startIndex: start, startLine: line, startColumn: column } = state;
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

  return finishNode(state, context, start, line, column, {
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
export function parseAssignmentPattern(
  state: ParserState,
  context: Context,
  left: ESTree.Pattern,
  start: number,
  line: number,
  column: number
): ESTree.AssignmentPattern {
  return finishNode(state, context, start, line, column, {
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
  const { startIndex: start, startLine: line, startColumn: column } = state;
  const left: ESTree.Pattern = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
  return !optional(state, context, Token.Assign)
    ? left
    : finishNode(state, context, start, line, column, {
        type: 'AssignmentPattern',
        left,
        right: secludeGrammar(state, context, 0, parseAssignmentExpression)
      } as any);
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
  const { token, startIndex: start, startLine: line, startColumn: column } = state;
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
        addToExportedNamesAndCheckDuplicates(state, state.tokenValue);
        addToExportedBindings(state, state.tokenValue);
      }
      recordTokenValue(state, context, scope, type, origin, false, false, tokenValue);
      const hasInitializer = optional(state, context, Token.Assign);
      value = hasInitializer ? parseAssignmentPattern(state, context, key, start, line, column) : key;
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

  return finishNode(state, context, start, line, column, {
    type: 'Property',
    kind: 'init',
    key,
    computed,
    value,
    method: false,
    shorthand
  } as any);
}
