import * as ESTree from '../estree';
import { Token, tokenDesc } from '../token';
import { Errors, report } from '../errors';
import { Location } from '../types';
import { Parser } from './parser';
import {
    parseIdentifier,
    parseAssignmentExpression,
    parsePropertyName
} from './expressions';
import {
    expect,
    Context,
    finishNode,
    nextToken,
    consume,
    getLocation,
    isIdentifier,
    Flags,
    parseExpressionCoverGrammar,
    restoreExpressionCoverGrammar,
    hasBit,
} from '../utilities';

// 12.15.5 Destructuring Assignment

/**
 * Parses either a binding identifier or binding pattern
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseBindingIdentifierOrPattern(parser: Parser, context: Context): ESTree.Node {
    const { token } = parser;

    if (token & Token.IsBindingPattern) {
        if (token === Token.LeftBracket) return parseArrayAssignmentPattern(parser, context);
        return parserObjectAssignmentPattern(parser, context);
    }

    if (token & Token.IsAwait && (context & (Context.Async | Context.Module))) {
        report(parser, Errors.AwaitBindingIdentifier);
    } else if (token & Token.IsYield && (context & (Context.Yield | Context.Strict))) {
        report(parser, Errors.YieldBindingIdentifier);
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

    const { token } = parser;

    if (token & Token.IsEvalOrArguments) {
        if (context & Context.Strict) report(parser, Errors.StrictLHSAssignment);
        parser.flags |= Flags.StrictReserved;
    } else if (context & Context.BlockScope && token === Token.LetKeyword) {
        // let is disallowed as a lexically bound name
        report(parser, Errors.LetInLexicalBinding);
    } else if (hasBit(token, Token.FutureReserved)) {
        if (context & Context.Strict) report(parser, Errors.UnexpectedKeyword);
        parser.flags |= Flags.StrictFunctionName;
    } else if (!isIdentifier(context, token)) {
        report(parser, Errors.UnexpectedToken, tokenDesc(token));
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
 * @param parser  Parser instance
 * @param context Context masks
 */

function parseAssignmentRestElementOrProperty(parser: Parser, context: Context, endToken: Token): ESTree.RestElement {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    const argument = parseBindingIdentifierOrPattern(parser, context);
    if (parser.token !== endToken) report(parser, Errors.ElementAfterRest);
    if (parser.token === Token.Assign) report(parser, Errors.RestDefaultInitializer);
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument
    });
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
                elements.push(parseAssignmentRestElementOrProperty(parser, context, Token.RightBracket));
                break;
            } else {
                elements.push(parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentOrArrayAssignmentPattern));
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
            properties.push(parseAssignmentRestElementOrProperty(parser, context, Token.RightBrace));
            break;
        }
        properties.push(parseBindingProperty(parser, context));
        if (parser.token !== Token.RightBrace) expect(parser, context, Token.Comma, Errors.InvalidElisonInObjPropList);
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
 * @param parser Parser instance
 * @param context Context masks
 * @param left LHS of assignment pattern
 * @param pos Location
 */

export function parseAssignmentPattern(parser: Parser, context: Context, left: ESTree.Node, pos: Location): ESTree.AssignmentPattern {
    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left,
        right: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression)
    });
}

/**
 * Parse assignment pattern or array assignment pattern
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentPattern)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param left LHS of assignment pattern
 * @param pos Location
 */

function parseAssignmentOrArrayAssignmentPattern(
    parser: Parser,
    context: Context,
    pos: Location = getLocation(parser),
    left: any = parseBindingIdentifierOrPattern(parser, context)
): ESTree.AssignmentPattern {

    if (!consume(parser, context, Token.Assign)) return left;

    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left,
        right: parseAssignmentExpression(parser, context | Context.AllowIn)
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
    const { token } = parser;
    let key: ESTree.Literal | ESTree.Identifier | ESTree.Expression | null;
    let value: ESTree.Node;
    let computed = false;
    let shorthand = false;

    // single name binding
    if (token & (Token.IsIdentifier | Token.Keyword)) {
        key = parseIdentifier(parser, context);
        shorthand = !consume(parser, context, Token.Colon);
        if (shorthand) {
            if (consume(parser, context, Token.Assign)) {
                value = parseAssignmentPattern(parser, context | Context.AllowIn, key, pos);
            } else {
                if (!isIdentifier(context, token)) report(parser, Errors.UnexpectedReserved);
                value = key;
            }
        } else value = parseAssignmentOrArrayAssignmentPattern(parser, context);
    } else {
        computed = token === Token.LeftBracket;
        key = parsePropertyName(parser, context);
        expect(parser, context, Token.Colon);
        value = parseExpressionCoverGrammar(parser, context, parseAssignmentOrArrayAssignmentPattern);
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