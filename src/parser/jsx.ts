import * as ESTree from '../estree';
import { Chars } from '../chars';
import { Parser, Location } from '../types';
import { Token, tokenDesc } from '../token';
import { Errors, report, tolerant } from '../errors';
import { isValidIdentifierPart } from '../unicode';
import { parseLiteral, parseAssignmentExpression, parseExpression } from './expressions';
import {     hasNext,
    nextChar,
    advance,
    consumeOpt,
    fromCodePoint,
    readNext,
} from '../scanner/common';
import {
    Context,
    expect,
    getLocation,
    consume,
    finishNode,
    nextToken,
    isEqualTagNames,
    parseExpressionCoverGrammar
} from '../utilities';

// JSX Specification
// https://facebook.github.io/jsx/

/**
 * Parses JSX element or JSX fragment
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseJSXRootElement(
    parser: Parser,
    context: Context
): ESTree.JSXElement | ESTree.JSXFragment {
    const pos = getLocation(parser);
    let children: ESTree.JSXElement[] = [];
    let closingElement = null;
    let selfClosing = false;
    let openingElement: any;
    expect(parser, context, Token.LessThan);

    const isFragment = parser.token === Token.GreaterThan;

    if (isFragment) {
        openingElement = parseJSXOpeningFragment(parser, context, pos);
    } else {
        const name = parseJSXElementName(parser, context);
        const attributes = parseJSXAttributes(parser, context);
        selfClosing = consume(parser, context, Token.Divide);
        openingElement = parseJSXOpeningElement(parser, context, name, attributes, selfClosing, pos);
    }

    if (isFragment)  return parseJSXFragment(parser, context, openingElement, pos);

    if (!selfClosing) {
        children = parseJSXChildren(parser, context);
        closingElement = parseJSXClosingElement(parser, context);
        const open = isEqualTagNames(openingElement.name);
        const close = isEqualTagNames(closingElement.name);
        if (open !== close) report(parser, Errors.ExpectedJSXClosingTag, close);
    }

    return finishNode(context, parser, pos, {
        type: 'JSXElement',
        children,
        openingElement,
        closingElement,
    });
}

/**
 * Parses JSX opening element
 *
 * @param parser Parser object
 * @param context Context masks
 * @param name Element name
 * @param attributes Element attributes
 * @param selfClosing True if this is a selfclosing JSX Element
 * @param pos Line / Column tracking
 */
export function parseJSXOpeningElement(
    parser: Parser,
    context: Context,
    name: string,
    attributes: any,
    selfClosing: boolean,
    pos: Location
): ESTree.JSXOpeningElement {
    if (context & Context.InJSXChild && selfClosing) expect(parser, context, Token.GreaterThan);
    else nextJSXToken(parser);
    return finishNode(context, parser, pos, {
        type: 'JSXOpeningElement',
        name,
        attributes,
        selfClosing
    });
}

/**
 * Parse JSX fragment
 *
 * @param parser Parser object
 * @param context Context masks
 * @param openingElement Opening fragment
 * @param pos Line / Column location
 */
function parseJSXFragment(parser: Parser, context: Context, openingElement: ESTree.JSXOpeningFragment, pos: Location): ESTree.JSXFragment {
    const children = parseJSXChildren(parser, context);
    const closingElement = parseJSXClosingFragment(parser, context);
    return finishNode(context, parser, pos, {
        type: 'JSXFragment',
        children,
        openingElement,
        closingElement,
    });
}

/**
 * Parse JSX opening fragment
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */
function parseJSXOpeningFragment(parser: Parser, context: Context, pos: Location): ESTree.JSXOpeningFragment {
    nextJSXToken(parser);
    return finishNode(context, parser, pos, {
        type: 'JSXOpeningFragment'
    });
}

/**
 * Prime the scanner and advance to the next JSX token in the stream
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function nextJSXToken(parser: Parser): Token {
    return parser.token = scanJSXToken(parser);
}

/**
 * Mini scanner
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanJSXToken(parser: Parser): Token {
    if (!hasNext(parser)) return Token.EndOfSource;
    parser.lastIndex = parser.startIndex = parser.index;
    const char = nextChar(parser);
    if (char === Chars.LessThan) {
        advance(parser);
        return consumeOpt(parser, Chars.Slash) ? Token.JSXClose : Token.LessThan;
    } else if (char === Chars.LeftBrace) {
        advance(parser);
        return Token.LeftBrace;
    }

    while (hasNext(parser)) {
        advance(parser);
        const next = nextChar(parser);
        if (next === Chars.LeftBrace || next === Chars.LessThan) break;

    }
    return Token.JSXText;
}

/**
 * Parses JSX children
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXChildren(parser: Parser, context: Context): ESTree.JSXElement[] {
    const children: any[] = [];
    while (parser.token !== Token.JSXClose) {
        children.push(parseJSXChild(parser, context));
    }

    return children;
}

/**
 * Parses JSX Text
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXText(parser: Parser, context: Context): ESTree.JSXText {
    const pos = getLocation(parser);
    const value = parser.source.slice(parser.startIndex, parser.index);
    parser.token = scanJSXToken(parser);
    const node: any = finishNode(context, parser, pos, {
        type: 'JSXText',
        value
    });

    if (context & Context.OptionsRaw) node.raw = value;

    return node;
}

/**
 * Parses JSX Child
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXChild(parser: Parser, context: Context) {
    switch (parser.token) {
        case Token.Identifier:
        case Token.JSXText:
            return parseJSXText(parser, context);
        case Token.LeftBrace:
            return parseJSXExpression(parser, context & ~Context.InJSXChild);
        case Token.LessThan:
            return parseJSXRootElement(parser, context & ~Context.InJSXChild);
        default:
            report(parser, Errors.Unexpected);
    }
}

/**
 * Parses JSX attributes
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXAttributes(parser: Parser, context: Context): any[] {
    const attributes: ESTree.JSXAttribute[] = [];
    while (hasNext(parser)) {
        if (parser.token === Token.Divide || parser.token === Token.GreaterThan) break;
        attributes.push(parseJSXAttribute(parser, context));
    }
    return attributes;
}

/**
 * Parses JSX spread attribute
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXSpreadAttribute(parser: Parser, context: Context): ESTree.JSXSpreadAttribute {
    const pos = getLocation(parser);
    expect(parser, context, Token.LeftBrace);
    expect(parser, context, Token.Ellipsis);
    const expression = parseExpressionCoverGrammar(parser, context & ~Context.InJSXChild, parseAssignmentExpression);
    expect(parser, context, Token.RightBrace);

    return finishNode(context, parser, pos, {
        type: 'JSXSpreadAttribute',
        argument: expression
    });
}

/**
 * Parses JSX namespace name
 *
 * @param parser Parser object
 * @param context Context masks
 * @param namespace Identifier
 * @param pos Line / Column location
 */

export function parseJSXNamespacedName(
    parser: Parser,
    context: Context,
    namespace: ESTree.JSXIdentifier | ESTree.JSXMemberExpression,
    pos: Location
): ESTree.JSXNamespacedName {
    expect(parser, context, Token.Colon);
    const name = parseJSXIdentifier(parser, context);
    return finishNode(context, parser, pos, {
        type: 'JSXNamespacedName',
        namespace,
        name
    });
}

/**
 * Parses JSX attribute name
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXAttributeName(parser: Parser, context: Context): ESTree.JSXIdentifier | ESTree.JSXNamespacedName {
    const pos = getLocation(parser);
    const identifier = parseJSXIdentifier(parser, context);
    return parser.token === Token.Colon ?
        parseJSXNamespacedName(parser, context, identifier, pos) :
        identifier;
}

/**
 * Parses JSX Attribute value
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXAttributeValue(parser: Parser, context: Context) {

    switch (scanJSXAttributeValue(parser, context)) {
        case Token.StringLiteral:
            return parseLiteral(parser, context);
        case Token.LeftBrace:
            return parseJSXExpressionContainer(parser, context | Context.InJSXChild);
            case Token.LessThan:
            return parseJSXRootElement(parser, context | Context.InJSXChild);
        default:
            tolerant(parser, context, Errors.InvalidJSXAttributeValue);

    }
}
/**
 * Parses JSX Attribute
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseJSXAttribute(parser: Parser, context: Context): any {
    const pos = getLocation(parser);
    if (parser.token === Token.LeftBrace) return parseJSXSpreadAttribute(parser, context);
    scanJSXIdentifier(parser);
    const attrName = parseJSXAttributeName(parser, context);
    const value = parser.token === Token.Assign ? parseJSXAttributeValue(parser, context) : null;
    return finishNode(context, parser, pos, {
        type: 'JSXAttribute',
        value,
        name: attrName
    });
}

/**
 * Parses JSX Attribute value
 *
 * @param parser Parser object
 * @param context Context masks
 */

function scanJSXAttributeValue(parser: Parser, context: Context): Token {
    parser.lastIndex = parser.index;
    const ch = nextChar(parser);
    switch (ch) {
        case Chars.DoubleQuote:
        case Chars.SingleQuote:
            return scanJSXString(parser, context, ch);
        default:
            return nextToken(parser, context);
    }
}

/**
 * Parses JSX String
 *
 * @param parser Parser object
 * @param context Context masks
 * @param quote Code point
 */
function scanJSXString(parser: Parser, context: Context, quote: number): Token {

    const rawStart = parser.index;
    advance(parser);

    let ret = '';
    let ch = nextChar(parser);
    while (ch !== quote) {
        ret += fromCodePoint(ch);
        advance(parser);
        ch = nextChar(parser);
        if (!hasNext(parser)) report(parser, Errors.UnterminatedString);
    }

    advance(parser); // skip the quote

    // raw
    if (context & Context.OptionsRaw)  parser.tokenRaw = parser.source.slice(rawStart, parser.index);

    parser.tokenValue = ret;

    return Token.StringLiteral;
}

/**
 * Parses JJSX Empty Expression
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXEmptyExpression(parser: Parser, context: Context): ESTree.JSXEmptyExpression {
    const pos = getLocation(parser);
    return finishNode(context, parser, pos, {
        type: 'JSXEmptyExpression'
    });
}

/**
 * Parses JSX Spread child
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseJSXSpreadChild(parser: Parser, context: Context): ESTree.JSXSpreadChild {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    const expression = parseExpression(parser, context);
    expect(parser, context, Token.RightBrace);
    return finishNode(context, parser, pos, {
        type: 'JSXSpreadChild',
        expression
    });
}

/**
 * Parses JSX Expression container
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXExpressionContainer(parser: Parser, context: Context): ESTree.JSXExpressionContainer {
    const pos = getLocation(parser);
    expect(parser, context, Token.LeftBrace);
    // Note: JSX Expressions can't be empty
    if (parser.token === Token.RightBrace) tolerant(parser, context, Errors.NonEmptyJSXExpression);
    const expression = parseExpressionCoverGrammar(parser, context & ~Context.InJSXChild, parseAssignmentExpression);
    expect(parser, context, Token.RightBrace);
    return finishNode(context, parser, pos, {
        type: 'JSXExpressionContainer',
        expression
    });
}

/**
 * Parses JSX Expression
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */

export function parseJSXExpression(parser: Parser, context: Context): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {
    const pos = getLocation(parser);
    expect(parser, context, Token.LeftBrace);
    if (parser.token === Token.Ellipsis) return parseJSXSpreadChild(parser, context);
    const expression = parser.token === Token.RightBrace ?
        parseJSXEmptyExpression(parser, context) :
        parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    nextJSXToken(parser);

    return finishNode(context, parser, pos, {
        type: 'JSXExpressionContainer',
        expression
    });
}

/**
 * Parses JSX Closing fragment
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXClosingFragment(parser: Parser, context: Context): ESTree.JSXClosingFragment {
    const pos = getLocation(parser);
    expect(parser, context, Token.JSXClose);
    expect(parser, context, Token.GreaterThan);
    return finishNode(context, parser, pos, {
        type: 'JSXClosingFragment'
    });
}

/**
 * Parses JSX Closing Element
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */
export function parseJSXClosingElement(parser: Parser, context: Context): ESTree.JSXClosingElement {
    const pos = getLocation(parser);
    expect(parser, context, Token.JSXClose);
    const name = parseJSXElementName(parser, context);
    if (context & Context.InJSXChild) expect(parser, context, Token.GreaterThan);
    else nextJSXToken(parser);
    return finishNode(context, parser, pos, {
        type: 'JSXClosingElement',
        name
    });
}

/**
 * Parses JSX Identifier
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXIdentifier(parser: Parser, context: Context): ESTree.JSXIdentifier {
    const { token, tokenValue: name, tokenRaw: raw } = parser;

    if (!(token & (Token.IsIdentifier | Token.Keyword))) {
        tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
    }

    const pos = getLocation(parser);
    nextToken(parser, context);
    const node: any = finishNode(context, parser, pos, {
        type: 'JSXIdentifier',
        name
    });
    if (context & Context.OptionsRawidentifiers) node.raw = raw;
    return node;
}

/**
 * Parses JSX Member expression
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */

export function parseJSXMemberExpression(parser: Parser, context: Context, expr: any, pos: Location): ESTree.JSXMemberExpression {
    // Note: In order to be able to parse cases like ''<A.B.C.D.E.foo-bar />', where the dash is located at the
    // end, we must rescan for the JSX Identifier now. This because JSX identifiers differ from normal identifiers
    scanJSXIdentifier(parser);
    return finishNode(context, parser, pos, {
        type: 'JSXMemberExpression',
        object: expr,
        property: parseJSXIdentifier(parser, context)
    });
}

/**
 * Parses JSX Element name
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseJSXElementName(parser: Parser, context: Context): any {
    const pos = getLocation(parser);
    scanJSXIdentifier(parser);
    let elementName: ESTree.JSXIdentifier | ESTree.JSXMemberExpression = parseJSXIdentifier(parser, context);
    if (parser.token === Token.Colon) return parseJSXNamespacedName(parser, context, elementName, pos);
    while (consume(parser, context, Token.Period)) {
        elementName = parseJSXMemberExpression(parser, context, elementName, pos);
    }
    return elementName;
}

/**
 * Scans JSX Identifier
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanJSXIdentifier(parser: Parser): Token {
    const { token } = parser;
    if (token & (Token.IsIdentifier | Token.Keyword)) {
        const firstCharPosition = parser.index;
        let ch = nextChar(parser);
        while (hasNext(parser) && (ch === Chars.Hyphen || (isValidIdentifierPart(ch)))) {
            ch = readNext(parser);
        }
        parser.tokenValue += parser.source.substr(firstCharPosition, parser.index - firstCharPosition);
    }
    return parser.token;
}