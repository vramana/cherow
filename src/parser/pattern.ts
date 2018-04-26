import * as ESTree from '../estree';
import { Token, tokenDesc } from '../token';
import { Errors, report, tolerant } from '../errors';
import { Location, Parser } from '../types';
import { parseIdentifier, parseAssignmentExpression,  parsePropertyName } from './expressions';
import {
    expect,
    Context,
    finishNode,
    nextToken,
    consume,
    getLocation,
    isValidIdentifier,
    Flags,
    parseExpressionCoverGrammar,
    restoreExpressionCoverGrammar,
    hasBit,
} from '../utilities';

// 12.15.5 Destructuring Assignment

/**
 * Parses either a binding identifier or binding pattern
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBindingIdentifierOrPattern(parser: Parser, context: Context, args: string[] = []): ESTree.Node {
    const { token } = parser;
    if (token & Token.IsBindingPattern) {
        return token === Token.LeftBrace ?
            parserObjectAssignmentPattern(parser, context) :
            parseArrayAssignmentPattern(parser, context);
    } else if (token & (Token.IsAwait | Token.IsYield)) {
        if (token & Token.IsAwait && (context & (Context.Async | Context.Module))) {
            tolerant(parser, context, Errors.AwaitBindingIdentifier);
        } else if (token & Token.IsYield && (context & (Context.Yield | Context.Strict))) {
            tolerant(parser, context, Errors.YieldBindingIdentifier);
        }
    }
    args.push(parser.tokenValue);
    return parseBindingIdentifier(parser, context);
}

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

export function parseBindingIdentifier(parser: Parser, context: Context): ESTree.Identifier {

    const { token } = parser;
    if (token & Token.IsEvalOrArguments) {
        if (context & Context.Strict) tolerant(parser, context, Errors.StrictLHSAssignment);
        parser.flags |= Flags.StrictEvalArguments;
    } else if (context & Context.BlockScope && token === Token.LetKeyword) {
        // let is disallowed as a lexically bound name
        tolerant(parser, context, Errors.LetInLexicalBinding);
    } else if (hasBit(token, Token.FutureReserved)) {
        if (context & Context.Strict) tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(token));
        parser.flags |= Flags.StrictFunctionName;
    } else if (!isValidIdentifier(context, token)) {
        tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(token));
    }

    const pos = getLocation(parser);
    const name = parser.tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'Identifier',
        name
    });
}

/**
 * Parse assignment rest element or assignment rest property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestProperty)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseAssignmentRestElementOrProperty(parser: Parser, context: Context): ESTree.RestElement {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    const argument = parseBindingIdentifierOrPattern(parser, context);
    if (parser.token === Token.Comma) tolerant(parser, context, Errors.RestWithComma);
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument
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
 * @param {Parser} Parser object
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
                elements.push(parseAssignmentRestElementOrProperty(parser, context));
                break;
            } else {
                elements.push(parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseBindingInitializer));
            }
            if (parser.token !== Token.RightBracket) expect(parser, context, Token.Comma);
        }
    }

    expect(parser, context, Token.RightBracket);

    return finishNode(context, parser, pos, {
        type: 'ArrayPattern',
        elements
    });
}

/**
 * Parse object assignment pattern
 *
 * @param Parser Parser object
 * @param Context Context masks
 */

function parserObjectAssignmentPattern(parser: Parser, context: Context): ESTree.ObjectPattern {
    const pos = getLocation(parser);
    const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];
    expect(parser, context, Token.LeftBrace);

    while (parser.token !== Token.RightBrace) {
        if (parser.token === Token.Ellipsis) {
            properties.push(parseAssignmentRestElementOrProperty(parser, context));
            break;
        }
        properties.push(parseAssignmentProperty(parser, context));
        if (parser.token !== Token.RightBrace) expect(parser, context, Token.Comma);
    }

    expect(parser, context, Token.RightBrace);

    return finishNode(context, parser, pos, {
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
    parser: Parser,
    context: Context,
    left: ESTree.Node,
    pos: Location
): ESTree.AssignmentPattern {
    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left,
        right: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression)
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
function parseBindingInitializer(parser: Parser, context: Context): ESTree.AssignmentPattern {
    const pos = getLocation(parser);
    const left: any = parseBindingIdentifierOrPattern(parser, context);
    return !consume(parser, context, Token.Assign) ?
        left :
        finishNode(context, parser, pos, {
            type: 'AssignmentPattern',
            left,
            right: parseAssignmentExpression(parser, context | Context.AllowIn)
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

function parseAssignmentProperty(parser: Parser, context: Context): ESTree.AssignmentProperty {

    const pos = getLocation(parser);
    const { token } = parser;
    let key: ESTree.Literal | ESTree.Identifier | ESTree.Expression | null;
    let value;
    let computed = false;
    let shorthand = false;
    // single name binding
    if (token & (Token.IsIdentifier | Token.Keyword)) {
        key = parseIdentifier(parser, context);
        shorthand = !consume(parser, context, Token.Colon);
        if (shorthand) {
            const hasInitializer = consume(parser, context, Token.Assign);
            if (context & Context.Yield && token & Token.IsYield) tolerant(parser, context, Errors.YieldBindingIdentifier);
            if (!isValidIdentifier(context, token)) tolerant(parser, context, Errors.UnexpectedReserved);
            value = hasInitializer ? parseAssignmentPattern(parser, context | Context.AllowIn, key, pos) : key;
        } else value = parseBindingInitializer(parser, context);
    } else {
        computed = token === Token.LeftBracket;
        key = parsePropertyName(parser, context);
        expect(parser, context, Token.Colon);
        value = parseExpressionCoverGrammar(parser, context, parseBindingInitializer);
    }

    // Note! The specs specifically state that this is "assignment property", but
    // nothing in ESTree specs explains the difference between this "property" and the "property" for object literals.
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