import * as ESTree from '../estree';
import { ParserState, Location } from '../types';
import { Token } from '../token';
import { Errors, report } from '../errors';
import { parseLiteral, parseAssignmentExpression, parseExpression } from './expressions';
import { nextToken } from '../lexer/scan';
import { scanJSXToken, scanJSXAttributeValue, scanJSXIdentifier } from '../lexer/jsx';
import {
    Context,
    expect,
    getLocation,
    optional,
    finishNode,
   isEqualTagNames,
} from '../common';


// JSX Specification
// https://facebook.github.io/jsx/

/**
 * Parses JSX element or JSX fragment
 *
 * @param state Parser instance
 * @param context Context masks
 */
export function parseJSXRootElement(
  state: ParserState,
  context: Context,
): ESTree.JSXElement | ESTree.JSXFragment {
  const pos = getLocation(state);

  nextToken(state, context);

  // JSX Fragment
  if (state.token === Token.GreaterThan) {
      return finishNode(state, context, pos, {
          type: 'JSXFragment',
          openingElement: parseJSXOpeningFragment(state, context, pos),
          children: parseJSXChildren(state, context),
          closingFragment: parseJSXClosingFragment(state, context),
      });
  }

  const name = parseJSXElementNameOrMemberExpression(state, context);
  const attributes = parseJSXAttributes(state, context);
  const selfClosing = optional(state, context, Token.Divide);
  const openingElement = parseJSXOpeningElement(state, context, name, attributes, selfClosing, pos);

  let children: (ESTree.JSXElement | ESTree.JSXFragment | ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild | ESTree.JSXText)[] = [];

  let closingElement = null;

  if (!selfClosing) {
      children = parseJSXChildren(state, context);
      closingElement = parseJSXClosingElement(state, context);
      const close = isEqualTagNames(closingElement.name);
      if (isEqualTagNames(openingElement.name) !== close) {
          report(state, Errors.Unexpected, close);
      }
  }

  return finishNode(state, context, pos, {
      type: 'JSXElement',
      children,
      openingElement,
      closingElement,
  });
}

/**
 * Parses JSX opening element
 *
 * @param state Parser instance
 * @param context Context masks
 * @param name Element name
 * @param attributes Element attributes
 * @param selfClosing True if this is a selfclosing JSX Element
 * @param pos Line / Column tracking
 */
export function parseJSXOpeningElement(
  state: ParserState,
  context: Context,
  name: ESTree.JSXIdentifier | ESTree.JSXMemberExpression | ESTree.JSXNamespacedName,
  attributes: (ESTree.JSXAttribute | ESTree.JSXSpreadAttribute)[],
  selfClosing: boolean,
  pos: Location,
): ESTree.JSXOpeningElement {
  if (context & Context.InJSXChild && selfClosing) expect(state, context, Token.GreaterThan);
  else scanJSXToken(state);
  return finishNode(state, context, pos, {
      type: 'JSXOpeningElement',
      name,
      attributes,
      selfClosing,
  });
}

/**
 * Parses JSX Closing fragment
 *
 * @param state Parser instance
 * @param context Context masks
 */

export function parseJSXClosingFragment(state: ParserState, context: Context): ESTree.JSXClosingFragment {
  const pos = getLocation(state);
  expect(state, context, Token.JSXClose);
  expect(state, context, Token.GreaterThan);
  return finishNode(state, context, pos, {
      type: 'JSXClosingFragment',
  });
}
/**
 * Parse JSX opening fragmentD
 *
 * @param state Parser instance
 * @param context Context masks
 * @param pos Line / Column location
*/
function parseJSXOpeningFragment(state: ParserState, context: Context, pos: Location): ESTree.JSXOpeningFragment {
  scanJSXToken(state);
  return finishNode(state, context, pos, {
      type: 'JSXOpeningFragment',
  });
}

/**
 * Parses JSX Closing Element
 *
 * @param state Parser instance
 * @param context Context masks
 * @param pos Line / Column location
 */
export function parseJSXClosingElement(state: ParserState, context: Context): ESTree.JSXClosingElement {
  const pos = getLocation(state);
  expect(state, context, Token.JSXClose);
  const name = parseJSXElementNameOrMemberExpression(state, context);
  if (context & Context.InJSXChild) {
    expect(state, context, Token.GreaterThan);
  } else scanJSXToken(state);
  return finishNode(state, context, pos, {
      type: 'JSXClosingElement',
      name,
  });
}

/**
 * Parses JSX Element name or member expression
 *
 * @param state Parser instance
 * @param context Context masks
 */

export function parseJSXElementNameOrMemberExpression(
  state: ParserState,
  context: Context
): ESTree.JSXNamespacedName | ESTree.JSXIdentifier | ESTree.JSXMemberExpression {
  const pos = getLocation(state);
  scanJSXIdentifier(state);
  let elementName: ESTree.JSXIdentifier | ESTree.JSXMemberExpression = parseJSXIdentifier(state, context);
  if (state.token === Token.Colon) return parseJSXNamespacedName(state, context, elementName, pos);
  while (optional(state, context, Token.Period)) {
      scanJSXIdentifier(state);
      elementName = finishNode(state, context, pos, {
          type: 'JSXMemberExpression',
          object: elementName,
          property: parseJSXIdentifier(state, context),
      });
  }
  return elementName;
}

/**
 * Parses JSX children
 *
 * @param state Parser instance
 * @param context Context masks
 */

function parseJSXChildren(
  state: ParserState,
  context: Context
): (ESTree.JSXElement | ESTree.JSXFragment | ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild | ESTree.JSXText)[] {
  const children: (ESTree.JSXElement | ESTree.JSXFragment | ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild | ESTree.JSXText)[] = [];
  while (state.token !== Token.JSXClose) {
      switch (state.token) {
          case Token.Identifier:
          case Token.JSXText:
              children.push(parseJSXText(state, context));
              break;
          case Token.LeftBrace:
              children.push(parseJSXExpression(state, context & ~Context.InJSXChild));
              break;
          case Token.LessThan:
              children.push(parseJSXRootElement(state, context & ~Context.InJSXChild));
              break;
          default:
              report(state, Errors.Unexpected);
      }
  }
  return children;
}

/**
 * Parses JSX Text
 *
 * @param state Parser instance
 * @param context Context masks
 */

export function parseJSXText(state: ParserState, context: Context): ESTree.JSXText {
    const pos = getLocation(state);
    const value = state.source.slice(state.startIndex, state.index);
    state.token = scanJSXToken(state);
    const node: ESTree.JSXText = finishNode(state, context, pos, {
        type: 'JSXText',
        value,
    });

    if (context & Context.OptionsRaw) node.raw = value;

    return node;
}

export function parseJSXExpressionContainer(state: ParserState, context: Context): ESTree.JSXExpressionContainer {
  const pos = getLocation(state);
  expect(state, context, Token.LeftBrace);
  // Note: JSX Expressions can't be empty
  if (state.token === Token.RightBrace) report(state, Errors.NonEmptyJSXExpression);
  const expression = parseAssignmentExpression(state, context & ~Context.InJSXChild);
  expect(state, context, Token.RightBrace);
  return finishNode(state, context, pos, {
      type: 'JSXExpressionContainer',
      expression,
  });
}

/**
 * Parses JJSX Empty Expression
 *
 * @param state Parser instance
 * @param context Context masks
 */

export function parseJSXEmptyExpression(state: ParserState, context: Context): ESTree.JSXEmptyExpression {
  const pos = getLocation(state);
  return finishNode(state, context, pos, {
      type: 'JSXEmptyExpression',
  });
}

/**
 * Parses JSX Spread child
 *
 * @param state Parser instance
 * @param context Context masks
 */
export function parseJSXSpreadChild(state: ParserState, context: Context): ESTree.JSXSpreadChild {
  const pos = getLocation(state);
  nextToken(state, context);
  const expression = parseExpression(state, context);
  expect(state, context, Token.RightBrace);
  return finishNode(state, context, pos, {
      type: 'JSXSpreadChild',
      expression,
  });
}

/**
 * Parses JSX Expression
 *
 * @param state Parser instance
 * @param context Context masks
 * @param pos Line / Column location
*/

export function parseJSXExpression(state: ParserState, context: Context): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {
  const pos = getLocation(state);
  expect(state, context, Token.LeftBrace);
  if (state.token === Token.Ellipsis) return parseJSXSpreadChild(state, context);
  const expression = state.token === Token.RightBrace ?
      parseJSXEmptyExpression(state, context) :
      parseAssignmentExpression(state, context);
  scanJSXToken(state);
  return finishNode(state, context, pos, {
      type: 'JSXExpressionContainer',
      expression,
  });
}

/**
 * Parses JSX attributes
 *
 * @param state Parser instance
 * @param context Context masks
 */

export function parseJSXAttributes(state: ParserState, context: Context): ReturnType<typeof parseJSXAttribute>[] {
    const attributes: ReturnType<typeof parseJSXAttribute>[] = [];
    while (state.index < state.source.length) {
        if (state.token === Token.Divide || state.token === Token.GreaterThan) break;
        attributes.push(parseJSXAttribute(state, context));
    }
    return attributes;
}

/**
 * Parses JSX spread attribute
 *
 * @param state Parser instance
 * @param context Context masks
 */

export function parseJSXSpreadAttribute(state: ParserState, context: Context): ESTree.JSXSpreadAttribute {
    const pos = getLocation(state);
    expect(state, context, Token.LeftBrace);
    expect(state, context, Token.Ellipsis);
    const expression = parseAssignmentExpression(state, context & ~Context.InJSXChild);
    expect(state, context, Token.RightBrace);
    return finishNode(state, context, pos, {
        type: 'JSXSpreadAttribute',
        argument: expression,
    });
}

/**
 * Parses JSX namespace name
 *
 * @param state Parser instance
 * @param context Context masks
 * @param namespace Identifier
 * @param pos Line / Column location
 */

export function parseJSXNamespacedName(
    state: ParserState,
    context: Context,
    namespace: ESTree.JSXIdentifier,
    pos: Location,
): ESTree.JSXNamespacedName {
    expect(state, context, Token.Colon);
    const name = parseJSXIdentifier(state, context);
    return finishNode(state, context, pos, {
        type: 'JSXNamespacedName',
        namespace,
        name,
    });
}

/**
 * Parses JSX Identifier
 *
 * @param state Parser instance
 * @param context Context masks
 */

export function parseJSXIdentifier(state: ParserState, context: Context): ESTree.JSXIdentifier {
  if (!(state.token & (Token.Identifier | Token.Keyword))) report(state, Errors.Unexpected);
  const pos = getLocation(state);
  const tokenValue = state.tokenValue;
  nextToken(state, context);
  return finishNode(state, context, pos, {
      type: 'JSXIdentifier',
      name: tokenValue,
  });
}

/**
 * Parses JSX attribute name
 *
 * @param state Parser instance
 * @param context Context masks
 */

export function parseJSXAttributeName(state: ParserState, context: Context): ESTree.JSXIdentifier | ESTree.JSXNamespacedName {
    const pos = getLocation(state);
    const identifier = parseJSXIdentifier(state, context);
    return state.token === Token.Colon ?
        parseJSXNamespacedName(state, context, identifier, pos) :
        identifier;
}

/**
 * Parses JSX Attribute or Attribute value
 *
 * @param state Parser instance
 * @param context Context masks
 */
export function parseJSXAttribute(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  if (state.token === Token.LeftBrace) return parseJSXSpreadAttribute(state, context);
  scanJSXIdentifier(state);
  const attrName = parseJSXAttributeName(state, context);
  let value: any = null;
  if (state.token === Token.Assign) {
      switch (scanJSXAttributeValue(state, context)) {
          case Token.StringLiteral:
              value = parseLiteral(state, context);
              break;
          case Token.LeftBrace:
              value = parseJSXExpressionContainer(state, context | Context.InJSXChild);
              break;
          case Token.LessThan:
              value = parseJSXRootElement(state, context | Context.InJSXChild);
              break;
          default:
              report(state, Errors.InvalidJSXAttributeValue);
      }
  }
  return finishNode(state, context, pos, {
      type: 'JSXAttribute',
      value: value as Exclude < null,
      typeof value > ,
      name: attrName,
  });
}
