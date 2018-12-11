import { ParserState, Location } from './../types';
import { Context, finishNode, getLocation, optional, expect } from '../common';
import { Token } from '../token';
import { nextToken } from '../lexer/scan';
import * as ESTree from '../estree';
import { Errors, report } from '../errors';
import { parseAssignmentExpression, parsePropertyName } from './expressions';

// 12.15.5 Destructuring Assignment
/**
 * Parses either a binding identifier or binding pattern
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBindingIdentifierOrPattern(state: ParserState, context: Context): ESTree.PatternTop {
    switch (state.token) {
        case Token.LeftBrace:
        return parserObjectAssignmentPattern(state, context);
        case Token.LeftBracket:
          return parseArrayAssignmentPattern(state, context);
        default:
        return parseBindingIdentifier(state, context);
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
export function parseBindingIdentifier(state: ParserState, context: Context): ESTree.Identifier {
  if (state.token & Token.Reserved) {
      report(state, Errors.Unexpected);
  } else if (context & Context.Strict &&
      state.token & Token.FutureReserved) {
      report(state, Errors.Unexpected);
  }
  const pos = getLocation(state);
  const name = state.tokenValue;
  nextToken(state, context);
  return finishNode(state, context, pos, {
      type: 'Identifier',
      name,
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
export function parseAssignmentRestElement(state: ParserState, context: Context): ESTree.RestElement {
  const pos = getLocation(state);
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context);
  if (state.token === Token.Comma) report(state, Errors.Unexpected);
  return finishNode(state, context, pos, {
      type: 'RestElement',
      argument,
  });
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
function AssignmentRestProperty(state: ParserState, context: Context): ESTree.RestElement {
  const pos = getLocation(state);
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context);
  if (state.token === Token.Comma) report(state, Errors.Unexpected);
  return finishNode(state, context, pos, {
      type: 'RestElement',
      argument,
  });
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
export function parseArrayAssignmentPattern(state: ParserState, context: Context): ESTree.ArrayPattern {

  const pos = getLocation(state);

  expect(state, context, Token.LeftBracket);

  const elements: (ESTree.Node | null)[] = [];

  while (state.token !== Token.RightBracket) {
      if (optional(state, context, Token.Comma)) {
          elements.push(null);
      } else {
          if (state.token === Token.Ellipsis) {
              elements.push(parseAssignmentRestElement(state, context));
              break;
          } else {
              elements.push(parseBindingInitializer(state, context));
          }
          if (state.token !== Token.RightBracket) expect(state, context, Token.Comma);
      }
  }

  expect(state, context, Token.RightBracket);

  // tslint:disable-next-line:no-object-literal-type-assertion
  return finishNode(state, context, pos, {
      type: 'ArrayPattern',
      elements,
  } as ESTree.ArrayPattern);
}

/**
* Parse object assignment pattern
*
* @param Parser Parser object
* @param Context Context masks
*/
export function parserObjectAssignmentPattern(state: ParserState, context: Context): ESTree.ObjectPattern {
  const pos = getLocation(state);
  const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];
  expect(state, context, Token.LeftBrace);

  while (state.token !== Token.RightBrace) {
      if (state.token === Token.Ellipsis) {
          properties.push(AssignmentRestProperty(state, context));
          break;
      }
      properties.push(parseAssignmentProperty(state, context));
      if (state.token !== Token.RightBrace) expect(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);

  return finishNode(state, context, pos, {
      type: 'ObjectPattern',
      properties,
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
  left: ESTree.PatternTop,
  pos: Location,
): ESTree.AssignmentPattern {
  return finishNode(state, context, pos, {
      type: 'AssignmentPattern',
      left,
      right: parseAssignmentExpression(state, context),
  });
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
  context: Context
): ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.MemberExpression | ESTree.AssignmentPattern {
    const pos = getLocation(state);
    const left: ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.MemberExpression | ESTree.AssignmentPattern = parseBindingIdentifierOrPattern(state, context);
    return !optional(state, context, Token.Assign) ?
        left :
        finishNode(state, context, pos, {
            type: 'AssignmentPattern',
            left,
            right: parseAssignmentExpression(state, context),
        });
}

/**
 * Parse assignment property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentProperty)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseAssignmentProperty(state: ParserState, context: Context): ESTree.AssignmentProperty {

    const pos = getLocation(state);
    const { token } = state;
    let key: ESTree.Literal | ESTree.Identifier | ESTree.Expression | null;
    let value;
    let computed = false;
    let shorthand = false;
    // single name binding
    if (token & Token.Keyword) {
        key = parseBindingIdentifier(state, context);
        shorthand = !optional(state, context, Token.Colon);
        if (shorthand) {
            const hasInitializer = optional(state, context, Token.Assign);
            value = hasInitializer ? parseAssignmentPattern(state, context, key, pos) : key;
        } else value = parseBindingInitializer(state, context);
    } else {
        computed = token === Token.LeftBracket;
        key = parsePropertyName(state, context);
        expect(state, context, Token.Colon);
        value = parseBindingInitializer(state, context);
    }

    return finishNode(state, context, pos, {
        type: 'Property',
        kind: 'init',
        key,
        computed,
        value,
        method: false,
        shorthand,
    });
}
