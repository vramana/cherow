import * as ESTree from './estree';
import { Token } from './token';
import { Location } from './types';
import {
    Parser,
    parseIdentifier,
    parseAssignmentExpression,
    parsePropertyName
} from './parser';
import {
    expect,
    Context,
    finishNode,
    nextToken,
    consume,
    getLocation,
    isolateCoverGrammar
} from './utilities';

// 12.15.5Destructuring Assignment

/**
 * Parses either a binding identifier or bindign pattern
 * 
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseBindingIdentifierOrPattern(parser: Parser, context: Context): ESTree.Node {
    const { token } = parser;
    if (token === Token.LeftBracket) {
        return parseArrayAssignmentPattern(parser, context);
    } else if (token === Token.LeftBrace) {
        return parserObjectAssignmentPattern(parser, context);
    }

    return parseBindingIdentifier(parser, context);
}

/**
 * Parse binding identifier
 * 
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 * 
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseBindingIdentifier(parser: Parser, context: Context): ESTree.Identifier {
    const pos = getLocation(parser);
    const name = parser.tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'Identifier',
        name
    });
}

/**
 * Parse assignment rest element
 * 
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 * 
 * @param parser  Parser instance
 * @param context Context masks
 */

function parseAssignmentRestElement(parser: Parser, context: Context): ESTree.RestElement {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    const argument = parseBindingIdentifierOrPattern(parser, context);
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument
    });
}

/**
 * Parse array element binding pattern
 * 
 * @param parser Parser instance
 * @param context Context masks
 * @param pos Location
 */

 function parseArrayElementsBindingPattern(parser: Parser, context: Context, pos: Location): ESTree.Node {
    let element = parseBindingIdentifierOrPattern(parser, context);
    if (consume(parser, context, Token.Assign)) {
        element = parseAssignmentPattern(parser, context | Context.AllowIn, element, pos);
    }
    return element;
}

/**
 * Parse array assignment pattern
 * 
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 * 
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseArrayAssignmentPattern(parser: Parser, context: Context): ESTree.ArrayPattern {
    const pos = getLocation(parser);
    
    expect(parser, context, Token.LeftBracket);

    const elements: (ESTree.Node | null)[] = [];

    while (parser.token !== Token.RightBracket) {
        if (consume(parser, context, Token.Comma)) {
            elements.push(null);
        } else {
            if (parser.token === Token.Ellipsis) {
                elements.push(parseAssignmentRestElement(parser, context));
                break;
            } else {
                elements.push(parseArrayElementsBindingPattern(parser, context, pos));
            }
            if (parser.token !== Token.RightBracket) {
                expect(parser, context, Token.Comma);
            }
        }
    }

    expect(parser, context, Token.RightBracket);

    return finishNode(context, parser, pos, {
        type: 'ArrayPattern',
        elements
    });
}

/**
 * Parse object rest property
 * 
 * @see [Link](https://tc39.github.io/ecma262/#prod-ObjectAssignmentPattern)
 * 
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

 function parseAssignmentRestProperty(parser: Parser, context: Context): ESTree.RestElement {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    const arg = parseBindingIdentifierOrPattern(parser, context);
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument: arg
    });
}

/**
 * Parse object assignment pattern
 * 
 * @param Parser Parser instance
 * @param Context Context masks
 */

function parserObjectAssignmentPattern(parser: Parser, context: Context): ESTree.ObjectPattern {
    const pos = getLocation(parser);
    const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];
    expect(parser, context, Token.LeftBrace);
    while (parser.token !== Token.RightBrace) {
        if (parser.token === Token.Ellipsis) {
            properties.push(parseAssignmentRestProperty(parser, context));
        } else {
            properties.push(parseBindingProperty(parser, context));
            if (parser.token !== Token.RightBrace) consume(parser, context, Token.Comma);
        }
    }

    expect(parser, context, Token.RightBrace);

    return finishNode(context, parser, pos, {
        type: 'ObjectPattern',
        properties
    });
}

/**
 * Parse assignment pattern
 * 
 * @param parser Parser instance
 * @param context Context masks
 * @param left LHS of assignment pattern
 * @param pos Location
 */
export function parseAssignmentPattern(parser: Parser, context: Context, left: ESTree.Node, pos: Location): ESTree.AssignmentPattern {
    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left,
        right: isolateCoverGrammar(parser, context, parseAssignmentExpression)
    });
}

/**
 * Parse object binding property
 * 
 * @param parser Parser instance
 * @param context Context masks
 */

function parseBindingProperty(parser: Parser, context: Context): ESTree.AssignmentProperty {
    const pos = getLocation(parser);
    let key: ESTree.Literal | ESTree.Identifier | ESTree.Expression | null;
    let value: ESTree.Node;
    let computed = false;
    let shorthand = false;
    // single name binding
    if (parser.token & (Token.IsIdentifier | Token.Keyword)) {
        key = parseIdentifier(parser, context);
        shorthand = !consume(parser, context, Token.Colon);
        value = shorthand ? key : parseBindingIdentifierOrPattern(parser, context);
        if (consume(parser, context, Token.Assign)) {
            value = parseAssignmentPattern(parser, context | Context.AllowIn, value, pos);
        }
    } else {
        computed = parser.token === Token.LeftBracket;
        key = parsePropertyName(parser, context);
        expect(parser, context, Token.Colon);
        value = parseBindingIdentifierOrPattern(parser, context);
    }

    return finishNode(context, parser, pos, {
        type: 'Property',
        kind: 'init',
        key,
        computed,
        value,
        method: false,
        shorthand
    });
}