import { Parser } from '../../../cherow/src/types';
import { Token } from '../../../cherow/src/token';
import { Context, getLocation, consume, finishNode } from '../../../cherow/src/utilities';

// AST from Babylon / ESLint
function parseTypeOperator(parser: Parser, context: Context): any {}

/**
 * Parser TS intersection types
 *
 * @param {Parser} parser Parser object
 * @param {Context} context Context masks
 * @returns {*}
 */
function parseIntersectionType(parser: Parser, context: Context): any {
    const pos = getLocation(parser);
    const type = parseTypeOperator(parser, context);

    if (parser.token !== Token.BitwiseAnd) return type;
    let types = [type];
    while (consume(parser, context, Token.BitwiseAnd)) {
        types.push(parseTypeOperator(parser, context));
    }
    return finishNode(context, parser, pos, {
        type: 'TSIntersectionType',
        types
    });
}

/**
 * Parse TS union types
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseUnionType(parser: Parser, context: Context): any {
    const pos = getLocation(parser);

    let type = parseIntersectionType(parser, context);

    if (parser.token !== Token.BitwiseOr) return type;

    let types = [type];

    while (consume(parser, context, Token.BitwiseOr)) {
        types.push(parseIntersectionType(parser, context));
    }

    return finishNode(context, parser, pos, {
        type: 'TSUnionType',
        types
    });
}
