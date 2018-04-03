import * as ESTree from '../estree';
import { Chars } from '../chars';
import { Token, tokenDesc } from '../token';
import { scanRegularExpression, consumeTemplateBrace } from '../scanner';
import { Errors, report } from '../errors';
import { parseBindingIdentifierOrPattern, parseBindingIdentifier, parseAssignmentPattern } from './pattern';
import { Parser } from './parser';
import { Options, Location } from '../types';
import { parseStatementListItem } from './statements';
import {
    expect,
    Context,
    hasBit,
    finishNode,
    Flags,
    hasNext,
    nextToken,
    consume,
    restoreExpressionCoverGrammar,
    isIdentifier,
    parseExpressionCoverGrammar,
    isValidSimpleAssignmentTarget,
    swapContext,
    ModifierState,
    getLocation,
    toAssignable,
    consumeSemicolon,
    Labels,
    nextTokenIsFuncKeywordOnSameLine,
    lookahead,
    isPropertyWithPrivateFieldKey,
    isPrologueDirective,
    parseAndDisallowDestructuringAndBinding,
    parseDirective,
    ObjectState,
    ClassState,
    CoverParenthesizedState
} from '../utilities';

/**
 * Parse expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Expression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseExpression(parser: Parser, context: Context): ESTree.AssignmentExpression | ESTree.SequenceExpression {
    const pos = getLocation(parser);
    const expr = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    return parser.token === Token.Comma ?
        parseSequenceExpression(parser, context, expr, pos) :
        expr;
}

/**
 * Parse secuence expression
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseSequenceExpression(parser: Parser, context: Context, left: ESTree.Expression, pos: any): ESTree.SequenceExpression {
    const expressions: ESTree.Expression[] = [left];
    while (consume(parser, context, Token.Comma)) {
        expressions.push(parseExpressionCoverGrammar(parser, context, parseAssignmentExpression));
    }

    return finishNode(context, parser, pos, {
        type: 'SequenceExpression',
        expressions
    });
}

/**
 * Parse yield expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-YieldExpression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseYieldExpression(parser: Parser, context: Context, pos: Location): ESTree.YieldExpression | ESTree.Identifier {

    expect(parser, context, Token.YieldKeyword);

    let argument: ESTree.Expression | null = null;
    let delegate = false;

    if (!(parser.flags & Flags.NewLine)) {
        delegate = consume(parser, context, Token.Multiply);
        argument = delegate ?
            parseAssignmentExpression(parser, context) :
            parser.token & Token.IsExpressionStart ?
            parseAssignmentExpression(parser, context) :
            null;
    }

    return finishNode(context, parser, pos, {
        type: 'YieldExpression',
        argument,
        delegate
    });
}

/**
 * Parse assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseAssignmentExpression(parser: Parser, context: Context): any {

    const pos = getLocation(parser);

    if (context & Context.Yield && parser.token === Token.YieldKeyword) return parseYieldExpression(parser, context, pos);

    const {
        token
    } = parser;

    const expr = parseConditionalExpression(parser, context, pos);

    if (parser.token === Token.Arrow && !(parser.flags & Flags.NewLine) && token & (Token.IsIdentifier | Token.Keyword)) {
        if (token & Token.FutureReserved) {
            if (context & Context.Strict) report(parser, Errors.InvalidLHSInAssignment);
            parser.flags |= Flags.StrictReserved;
        }
        if (token & Token.IsEvalOrArguments) {
            if (context & Context.Strict) report(parser, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictReserved;
        }
        return parseArrowFunction(parser, context, pos, [expr]);
    }

    if (hasBit(parser.token, Token.IsAssignOp)) {

        const operator = parser.token;

        if (consume(parser, context, Token.Assign)) {

            if (!(parser.flags & Flags.AllowDestructuring)) {
                return report(parser, Errors.InvalidLHSInAssignment);
            }

            if (parser.token & Token.IsYield && context & Context.InParen && context & Context.Yield) {
                report(parser, Errors.YieldInParameter);
            }
            // Only re-interpret if not inside a formal parameter list
            if (!(context & Context.InParameter)) toAssignable(parser, context, expr);
            if (context & Context.InParen) parser.flags |= Flags.SimpleParameterList;
        } else {
            if (!isValidSimpleAssignmentTarget(expr)) {
                return report(parser, Errors.InvalidLHSInAssignment);
            }
            parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
            nextToken(parser, context);
        }
        const right = parseExpressionCoverGrammar(parser, context & ~Context.InParen | Context.AllowIn, parseAssignmentExpression);
        parser.pendingExpressionError = null;
        return finishNode(context, parser, pos, {
            type: 'AssignmentExpression',
            left: expr,
            operator: tokenDesc(operator),
            right
        });

    }
    return expr;
}

/**
 * Parse conditional expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ConditionalExpression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseConditionalExpression(parser: Parser, context: Context, pos: any): ESTree.Expression {
    const test = parseBinaryExpression(parser, context, 0, pos);
    if (!consume(parser, context, Token.QuestionMark)) return test;
    const consequent = parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression);
    expect(parser, context, Token.Colon);
    const alternate = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    return finishNode(context, parser, pos, {
        type: 'ConditionalExpression',
        test,
        consequent,
        alternate
    });
}

/**
 * Parse binary expression.
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseBinaryExpression(
    parser: Parser,
    context: Context,
    minPrec: number,
    pos: any,
    left: ESTree.Expression = parseUnaryExpression(parser, context)
): ESTree.Expression {

    // Shift-reduce parser for the binary operator part of the JS expression
    // syntax.
    const bit = context & Context.AllowIn ^ Context.AllowIn;
    if (!hasBit(parser.token, Token.IsBinaryOp)) return left;
    while (hasBit(parser.token, Token.IsBinaryOp)) {
        const t = parser.token;
        if (bit && t === Token.InKeyword) break;
        const prec = t & Token.Precedence;
        const delta = ((t === Token.Exponentiate) as any) << Token.PrecStart;
        // When the next token is no longer a binary operator, it's potentially the
        // start of an expression, so we break the loop
        if (prec + delta <= minPrec) break;
        nextToken(parser, context);

        left = finishNode(context, parser, pos, {
            type: t & Token.IsLogical ? 'LogicalExpression' : 'BinaryExpression',
            left,
            right: parseBinaryExpression(parser, context & ~Context.AllowIn, prec, getLocation(parser)),
            operator: tokenDesc(t)
        });
    }

    return left;
}

/**
 * Parse await expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AwaitExpression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseAwaitExpression(parser: Parser, context: Context, pos: any): ESTree.AwaitExpression | ESTree.Identifier {
    // AwaitExpressionFormalParameter
    expect(parser, context, Token.AwaitKeyword);
    return finishNode(context, parser, pos, {
        type: 'AwaitExpression',
        argument: parseUnaryExpression(parser, context)
    });
}

/**
 * Parses unary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UnaryExpression)
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function parseUnaryExpression(parser: Parser, context: Context): ESTree.UnaryExpression | ESTree.Expression {
    const pos = getLocation(parser);
    let {
        token
    } = parser;
    // Note: 'await' is an unary operator, but we keep it separate due to performance reasons
    if (context & Context.Async && token === Token.AwaitKeyword) return parseAwaitExpression(parser, context, pos);
    if (hasBit(token, Token.IsUnaryOp)) {
        token = parser.token;
        nextToken(parser, context);
        const argument = parseExpressionCoverGrammar(parser, context, parseUnaryExpression);
        if (parser.token === Token.Exponentiate) {
            report(parser, Errors.Unexpected);
        }
        if (context & Context.Strict && token === Token.DeleteKeyword) {
            if (argument.type === 'Identifier') {
                report(parser, Errors.StrictDelete);
            } else if (isPropertyWithPrivateFieldKey(context, argument)) {
                report(parser, Errors.DeletePrivateField);
            }
        }
        return finishNode(context, parser, pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(token),
            argument,
            prefix: true
        });
    }

    return parseUpdateExpression(parser, context, pos);
}

/**
 * Parses update expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function parseUpdateExpression(parser: Parser, context: Context, pos: any): ESTree.Expression {

    let prefix = false;
    let operator: Token | undefined;

    if (hasBit(parser.token, Token.IsUpdateOp)) {
        operator = parser.token;
        prefix = true;
        nextToken(parser, context);
    }

    // TODO! Early errors
    const argument = parseLeftHandSideExpression(parser, context, pos);

    const isPostfix = !(parser.flags & Flags.NewLine) && hasBit(parser.token, Token.IsUpdateOp);

    if (!prefix && !isPostfix) return argument;

    if (!prefix) {
        operator = parser.token;
        nextToken(parser, context);
    }

    // TODO! Transform this into a mutal parser flag
    if (!isValidSimpleAssignmentTarget(argument)) {
        report(parser, Errors.InvalidLHSInAssignment);
    }

    return finishNode(context, parser, pos, {
        type: 'UpdateExpression',
        argument,
        operator: tokenDesc(operator as Token),
        prefix
    });
}

/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseRestElement(parser: Parser, context: Context): any {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    const argument = parseBindingIdentifierOrPattern(parser, context);
    if (parser.token === Token.Assign) report(parser, Errors.Unexpected);
    if (parser.token === Token.Comma) report(parser, Errors.Unexpected);
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument
    });
}

/**
 * Parse spread element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SpreadElement)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseSpreadElement(parser: Parser, context: Context): any {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    const token = parser.token;
    const argument = restoreExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression);
    return finishNode(context, parser, pos, {
        type: 'SpreadElement',
        argument
    });
}

/**
 * Parse left hand side expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-LeftHandSideExpression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseLeftHandSideExpression(parser: Parser, context: Context, pos: any): ESTree.Expression {
    const expr = parseMemberExpression(parser, context | Context.AllowIn, pos);
    return parseCallExpression(parser, context | Context.AllowIn, pos, expr);
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseMemberExpression(
    parser: Parser,
    context: Context,
    pos: Location,
    expr: ESTree.CallExpression | ESTree.Expression = parsePrimaryExpression(parser, context)
): ESTree.Expression {

    while (true) {

        if (consume(parser, context, Token.Period)) {
            parser.flags = parser.flags & ~Flags.AllowBinding | Flags.AllowDestructuring;
            const property = parseIdentifierNameOrPrivateName(parser, context);
            expr = finishNode(context, parser, pos, {
                type: 'MemberExpression',
                object: expr,
                computed: false,
                property,
            });

            continue;
        }

        if (consume(parser, context, Token.LeftBracket)) {
            parser.flags = parser.flags & ~Flags.AllowBinding | Flags.AllowDestructuring;
            const property = parseExpression(parser, context);
            expect(parser, context, Token.RightBracket);
            expr = finishNode(context, parser, pos, {
                type: 'MemberExpression',
                object: expr,
                computed: true,
                property,
            });

            continue;
        }

        if (parser.token === Token.TemplateTail) {
            expr = finishNode(context, parser, pos, {
                type: 'TaggedTemplateExpression',
                tag: expr,
                quasi: parseTemplateLiteral(parser, context)
            });

            continue;
        }

        if (parser.token === Token.TemplateCont) {
            expr = finishNode(context, parser, pos, {
                type: 'TaggedTemplateExpression',
                tag: expr,
                quasi: parseTemplate(parser, context | Context.TaggedTemplate)
            });

            continue;
        }

        return expr;
    }
}

/**
 * Parse statement list
 *
 * Note! This is really a part of 'CoverCallExpressionAndAsyncArrowHead', but separated because of performance reasons
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function parseCallExpression(parser: Parser, context: Context, pos: any, expr: ESTree.Expression): ESTree.Expression | ESTree.CallExpression {

    while (true) {

        expr = parseMemberExpression(parser, context, pos, expr);

        if (parser.token !== Token.LeftParen) return expr;

        const args = parseArgumentList(parser, context);

        expr = finishNode(context, parser, pos, {
            type: 'CallExpression',
            callee: expr,
            arguments: args
        });
    }
}

/**
 * Parse argument list
 *
 * @see [https://tc39.github.io/ecma262/#prod-grammar-notation-ArgumentList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseArgumentList(parser: Parser, context: Context): ESTree.Expression[] {
    expect(parser, context, Token.LeftParen);

    const expressions: any[] = [];

    while (parser.token !== Token.RightParen) {
        expressions.push(parser.token === Token.Ellipsis ?
            parseSpreadElement(parser, context) :
            parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression));

        if (parser.token === Token.RightParen) break;
        expect(parser, context, Token.Comma);
        if (parser.token === Token.RightParen) break;
    }

    expect(parser, context, Token.RightParen);
    return expressions;
}

/**
 * Parse primary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PrimaryExpression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
export function parsePrimaryExpression(parser: Parser, context: Context): any {
    switch (parser.token) {
        case Token.NumericLiteral:
        case Token.StringLiteral:
            return parseLiteral(parser, context);
        case Token.BigIntLiteral:
            return parseBigIntLiteral(parser, context);
        case Token.Identifier:
            return parseIdentifier(parser, context);
        case Token.NullKeyword:
        case Token.TrueKeyword:
        case Token.FalseKeyword:
            return parseNullOrTrueOrFalseLiteral(parser, context);
        case Token.FunctionKeyword:
            return parseFunctionExpression(parser, context);
        case Token.ThisKeyword:
            return parseThisExpression(parser, context);
        case Token.AsyncKeyword:
            return parseAsyncFunctionOrCallExpressionAndAsyncArrowHead(parser, context);
        case Token.LeftParen:
            return parseCoverParenthesizedExpressionAndArrowParameterList(parser, context | Context.InParen);
        case Token.LeftBracket:
            return restoreExpressionCoverGrammar(parser, context, parseArrayLiteral);
        case Token.LeftBrace:
            return restoreExpressionCoverGrammar(parser, context, parseObjectLiteral);
        case Token.Hash:
            return parseIdentifierNameOrPrivateName(parser, context);
        case Token.ClassKeyword:
            return parseClassExpression(parser, context);
        case Token.NewKeyword:
            return parseNewExpression(parser, context);
        case Token.SuperKeyword:
            return parseSuperProperty(parser, context);
        case Token.Divide:
        case Token.DivideAssign:
            if (scanRegularExpression(parser, context) === Token.RegularExpression) {
                return parseRegularExpressionLiteral(parser, context);
            }
            report(parser, Errors.UnterminatedRegExp);
        case Token.TemplateTail:
            return parseTemplateLiteral(parser, context);
        case Token.TemplateCont:
            return parseTemplate(parser, context);
        case Token.ImportKeyword:
            if (!(context & Context.OptionsNext)) report(parser, Errors.Unexpected);
            return parseImportExpressions(parser, context | Context.AllowIn);
        case Token.LetKeyword:
            return parseLetAsIdentifier(parser, context);
        default:
            return isIdentifier1(parser, context);
    }
}

/**
 * Parse 'let' as identifier in 'sloppy mode', and throws
 * in 'strict mode'  / 'module code'
 *
 * @param parser Parser instance
 * @param context  context mask
 */
function parseLetAsIdentifier(parser: Parser, context: Context): ESTree.Identifier {
    if (context & Context.Strict) report(parser, Errors.Unexpected);
    const pos = getLocation(parser);
    const name = parser.tokenValue;
    nextToken(parser, context);
    if (parser.flags & Flags.NewLine) {
        if (parser.token === Token.LeftBracket) report(parser, Errors.UnexpectedToken, 'let');
    }
    return finishNode(context, parser, pos, {
        type: 'Identifier',
        name
    });
}

/**
 * Parse either async function expression or call expression and async
 * arrow head. It depends on the result of the lookahead
 *
 * @param parser Parser instance
 * @param context  context mask
 */
function parseAsyncFunctionOrCallExpressionAndAsyncArrowHead(parser: Parser, context: Context) {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
        parseAsyncFunctionOrAsyncGeneratorExpression(parser, context) :
        parserCoverCallExpressionAndAsyncArrowHead(parser, context);
}

/**
 * Parses identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Identifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseIdentifier(parser: Parser, context: Context): ESTree.Identifier {
    const pos = getLocation(parser);
    const name = parser.tokenValue;
    nextToken(parser, context | Context.TaggedTemplate);
    return finishNode(context, parser, pos, {
        type: 'Identifier',
        name
    });
}

/**
 * Parse regular expression literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseRegularExpressionLiteral(parser: Parser, context: Context): ESTree.RegExpLiteral {

    const pos = getLocation(parser);
    const {  tokenRegExp, tokenValue, tokenRaw } = parser;

    nextToken(parser, context);

    const node: any = finishNode(context, parser, pos, {
        type: 'Literal',
        value: tokenValue,
        regex: tokenRegExp
    });

    if (context & Context.OptionsRaw) node.raw = tokenRaw;

    return node;
}

/**
 * Parses string and number literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NumericLiteral)
 * @see [Link](https://tc39.github.io/ecma262/#prod-StringLiteral)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseLiteral(parser: Parser, context: Context): ESTree.Literal {
    const pos = getLocation(parser);
    const value = parser.tokenValue;
    if (context & Context.Strict && parser.flags & Flags.Octal) {
        report(parser, Errors.StrictOctalLiteral);
    }
    nextToken(parser, context);
    const node: any = finishNode(context, parser, pos, {
        type: 'Literal',
        value
    });

    if (context & Context.OptionsRaw) node.raw = parser.tokenRaw;

    return node;
}

/**
 * Parses BigInt literal
 *
 * @see [Link](https://tc39.github.io/proposal-bigint/)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseBigIntLiteral(parser: Parser, context: Context): ESTree.Literal {
    const pos = getLocation(parser);
    const { tokenValue, tokenRaw } = parser;
    nextToken(parser, context);
    const node: any = finishNode(context, parser, pos, {
        type: 'Literal',
        value: tokenValue,
        bigint: tokenRaw
    });

    if (context & Context.OptionsRaw) node.raw = parser.tokenRaw;

    return node;
}

/**
 * Parses either null or boolean literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BooleanLiteral)
 *
 * @param parser
 * @param context
 */
function parseNullOrTrueOrFalseLiteral(parser: Parser, context: Context): ESTree.Literal {
    const pos = getLocation(parser);
    const { token } = parser;
    const raw = tokenDesc(token);

    nextToken(parser, context);

    const node: any = finishNode(context, parser, pos, {
        type: 'Literal',
        value: token === Token.NullKeyword ? null : raw === 'true'
    });

    if (context & Context.OptionsRaw) node.raw = raw;

    return node;
}

/**
 * Parse this expression
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseThisExpression(parser: Parser, context: Context): ESTree.ThisExpression {
    const pos = getLocation(parser);
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ThisExpression'
    });
}

/**
 * Parse identifier name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-IdentifierName)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseIdentifierName(parser: Parser, context: Context, t: Token): ESTree.Identifier {
    if (!(t & (Token.IsIdentifier | Token.Keyword))) report(parser, Errors.Unexpected);
    return parseIdentifier(parser, context);
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseIdentifierNameOrPrivateName(parser: Parser, context: Context): ESTree.PrivateName | ESTree.Identifier {
    if (!consume(parser, context, Token.Hash)) return parseIdentifierName(parser, context, parser.token);
    if (!(parser.token & Token.IsIdentifier)) report(parser, Errors.Unexpected);
    const pos = getLocation(parser);
    const name = parser.tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'PrivateName',
        name
    });
}

/**
 * Parse array literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayLiteral)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseArrayLiteral(parser: Parser, context: Context): ESTree.ArrayExpression {

    const pos = getLocation(parser);

    expect(parser, context, Token.LeftBracket);

    const elements: any[] = [];

    while (parser.token !== Token.RightBracket) {
        if (consume(parser, context, Token.Comma)) {
            elements.push(null);
        } else if (parser.token === Token.Ellipsis) {
            const element = parseSpreadElement(parser, context);
            if (parser.token !== Token.RightBracket) {
                parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
                expect(parser, context, Token.Comma);
            }
            elements.push(element);
        } else {
            elements.push(restoreExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression));
            if (parser.token !== Token.RightBracket) expect(parser, context, Token.Comma);
        }
    }

    expect(parser, context, Token.RightBracket);

    return finishNode(context, parser, pos, {
        type: 'ArrayExpression',
        elements
    });
}

/**
 * Parses cover parenthesized rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-parseCoverParenthesizedExpressionAndArrowParameterList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 * @param expressions Expressions nodes
 * @param pos Location
 */

function parseCoverParenthesizedRestArguments(parser: Parser, context: Context, expressions: any, pos: Location): ESTree.ArrowFunctionExpression {
    if (!(parser.flags & Flags.AllowBinding)) report(parser, Errors.Unexpected);
    const restElement = parseRestElement(parser, context);
    expect(parser, context, Token.RightParen);
    if (parser.token !== Token.Arrow) report(parser, Errors.Unexpected);
    parser.flags &= ~Flags.AllowBinding;
    expressions.push(restElement);
    return parseArrowFunction(parser, context, pos, expressions);
}

/**
 * Helper funciton to parses arrow function within an sequence expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-parseCoverParenthesizedExpressionAndArrowParameterList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 * @param expressions Expressions nodes
 * @param pos Location
 */

function parseSequenceArrow(parser: Parser, context: Context, expressions: any, pos: Location): ESTree.ArrowFunctionExpression {
    expect(parser, context, Token.RightParen);
    if (parser.token !== Token.Arrow) report(parser, Errors.Unexpected);
    return parseArrowFunction(parser, context, pos, expressions);
}

/**
 * Parses cover parenthesized expression and arrow parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-parseCoverParenthesizedExpressionAndArrowParameterList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

function parseCoverParenthesizedExpressionAndArrowParameterList(parser: Parser, context: Context): ESTree.ArrowFunctionExpression | ESTree.SequenceExpression {

    const pos = getLocation(parser);

    expect(parser, context, Token.LeftParen);

    // Simple case '()'
    if (parser.token === Token.RightParen) {
        return parseSequenceArrow(parser, context, [], pos);
    }

    let expr: any;

    // '(...'
    if (parser.token === Token.Ellipsis) {
        parser.flags |= Flags.SimpleParameterList;
        expr = parseRestElement(parser, context);
        expect(parser, context, Token.RightParen);
        return parseSequenceArrow(parser, context, [expr], pos);
    }

    let state = CoverParenthesizedState.None;

    // Record the sequence position
    const sequencepos = getLocation(parser);

    if (parser.token & Token.IsEvalOrArguments) {
        state |= CoverParenthesizedState.HasEvalOrArguments;
    } else if (parser.token & Token.Reserved) {
        state |= CoverParenthesizedState.HasReservedWords;
    }

    if (parser.token & Token.IsBindingPattern) state |= CoverParenthesizedState.HasBinding;

    expr = restoreExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression);

    // Sequence expression
    if (parser.token === Token.Comma) {

        state |= CoverParenthesizedState.SequenceExpression;

        parser.flags &= ~Flags.AllowDestructuring;

        const expressions: ESTree.Expression[] = [expr];

        while (consume(parser, context, Token.Comma)) {

            switch (parser.token) {

                // '...'
                case Token.Ellipsis:
                    return parseCoverParenthesizedRestArguments(parser, context, expressions, pos);

                // ')'
                case Token.RightParen:
                    return parseSequenceArrow(parser, context, expressions, pos);

                default: {

                    if (parser.token & Token.IsEvalOrArguments) {
                        state |= CoverParenthesizedState.HasEvalOrArguments;
                    } else if (parser.token & Token.Reserved) {
                        state |= CoverParenthesizedState.HasReservedWords;
                    } else if (parser.token & Token.IsEvalOrArguments) {
                        state |= CoverParenthesizedState.HasEvalOrArguments;
                    }
                    if (parser.token & Token.IsBindingPattern) state |= CoverParenthesizedState.HasBinding;
                    expressions.push(restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression));
                }
            }
        }

        expr = finishNode(context, parser, sequencepos, {
            type: 'SequenceExpression',
            expressions
        });
    }

    expect(parser, context, Token.RightParen);

    if (parser.token === Token.Arrow) {

        if (state & CoverParenthesizedState.HasEvalOrArguments) {
            if (context & Context.Strict) report(parser, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictEvalArguments;
        } else if (state & CoverParenthesizedState.HasReservedWords) {
            if (context & Context.Strict) report(parser, Errors.UnexpectedStrictReserved);
            parser.flags |= Flags.StrictReserved;
        } else if (!(parser.flags & Flags.AllowBinding)) {
            report(parser, Errors.Unexpected);
        }
        if (state & CoverParenthesizedState.HasBinding) parser.flags |= Flags.SimpleParameterList;
        const params = (state & CoverParenthesizedState.SequenceExpression ? expr.expressions : [expr]);
        return parseArrowFunction(parser, context, pos, params);
    }

    parser.flags &= ~Flags.AllowBinding;

    if (!isValidSimpleAssignmentTarget(expr)) parser.flags &= ~Flags.AllowDestructuring;

    return expr;
}

/**
 * Parse cover call expression and async arrow head
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CoverCallExpressionAndAsyncArrowHead)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parserCoverCallExpressionAndAsyncArrowHead(parser: Parser, context: Context): ESTree.Node {
    // Productions:
    //
    // - plain identifer
    // - async arrow w/o concise body
    // - (un)parenthesized async arrow
    // - call expression

    const pos = getLocation(parser);

    expect(parser, context, Token.AsyncKeyword);

    const expr = finishNode(context, parser, pos, {
        type: 'Identifier',
        name: 'async'
    });
    const enum AsyncState {
        None,
        Await,
        Yield
    }
    let state = AsyncState.None;

    // 'async ice => fapper';
    if (parser.token & Token.IsIdentifier) {
        return parseAsyncArrowFunction(parser, context, pos, [isIdentifier1(parser, context)]);
    } else if (parser.token !== Token.LeftParen || parser.flags & Flags.NewLine) return expr;

    // either coverc all expression or async arrow head
    parser.flags & ~(Flags.AllowDestructuring | Flags.AllowBinding);

    expect(parser, context, Token.LeftParen);

    const args: ESTree.AssignmentExpression[] = [];

    while (parser.token !== Token.RightParen) {
        if (parser.token === Token.Ellipsis) {
            args.push(parseSpreadElement(parser, context));
            if (parser.token === Token.Assign) report(parser, Errors.Unexpected);
            if (parser.token === Token.Comma) report(parser, Errors.Unexpected);
        } else {
            if (parser.token & Token.IsAwait) state |= AsyncState.Await;
            if (parser.token & Token.IsYield) state |= AsyncState.Yield;
            // Here we need to adjust the "grammar state" a litle so we can catch invalid
            // programs like 'async ({foo33 = 1})'
            args.push(parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression));
        }

        consume(parser, context, Token.Comma);

        if (parser.token === Token.RightParen) break;
    }

    expect(parser, context, Token.RightParen);

    if (parser.token === Token.Arrow) {
        if (state & AsyncState.Await) report(parser, Errors.Unexpected);
        if (state & AsyncState.Yield) report(parser, Errors.Unexpected);
        return parseAsyncArrowFunction(parser, context, pos, args);
    }

    return finishNode(context, parser, pos, {
        type: 'CallExpression',
        callee: expr,
        arguments: args
    });
}

/**
 * Parses function expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionExpression)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseFunctionExpression(parser: Parser, context: Context): ESTree.FunctionExpression {
    const pos = getLocation(parser);
    expect(parser, context, Token.FunctionKeyword);
    const isGenerator = consume(parser, context, Token.Multiply) ? ModifierState.Generator : ModifierState.None;
    let id: ESTree.Identifier | null = null;
    const { token } = parser;

    if (token & (Token.IsIdentifier | Token.Keyword)) {
        if (hasBit(token, Token.IsEvalOrArguments)) {
            if (context & Context.Strict) report(parser, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictFunctionName;
        }

        id = parseFunctionOrClassExpressionName(parser, context, isGenerator);
    }

    const { params, body } = swapContext(parser, context, isGenerator, parseFormalListAndBody);

    return finishNode(context, parser, pos, {
        type: 'FunctionExpression',
        params,
        body,
        async: false,
        generator: !!(isGenerator & ModifierState.Generator),
        expression: false,
        id
    });
}

/**
 * Parses async function or async generator expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionExpression)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseAsyncFunctionOrAsyncGeneratorExpression(parser: Parser, context: Context): ESTree.FunctionExpression {
    const pos = getLocation(parser);
    expect(parser, context, Token.AsyncKeyword);
    expect(parser, context, Token.FunctionKeyword);
    const isGenerator = consume(parser, context, Token.Multiply) ? ModifierState.Generator : ModifierState.None;
    const isAwait = ModifierState.Await;
    let id: ESTree.Identifier | null = null;
    const { token } = parser;
    if (token & (Token.IsIdentifier | Token.Keyword)) {

        if (hasBit(token, Token.IsEvalOrArguments)) {
            if (context & Context.Strict || isAwait & ModifierState.Await) report(parser, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictFunctionName;
        }
        if (token & Token.IsAwait) report(parser, Errors.AwaitBindingIdentifier);
        id = parseFunctionOrClassExpressionName(parser, context, isGenerator);
    }

    const { params, body } = swapContext(parser, context, isGenerator | isAwait, parseFormalListAndBody);

    return finishNode(context, parser, pos, {
        type: 'FunctionExpression',
        params,
        body,
        async: true,
        generator: !!(isGenerator & ModifierState.Generator),
        expression: false,
        id
    });
}

/**
 * Shared helper function for "parseFunctionExpression" and "parseAsyncFunctionOrAsyncGeneratorExpression"
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseFunctionOrClassExpressionName(parser: Parser, context: Context, state: ModifierState): ESTree.Identifier | null {
    if (parser.token & Token.IsYield && state & ModifierState.Generator) {
        report(parser, Errors.YieldBindingIdentifier);
    }
    return parseBindingIdentifier(parser, context);
}

/**
 * Parse computed property names
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ComputedPropertyName)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseComputedPropertyName(parser: Parser, context: Context): ESTree.Expression {
    expect(parser, context, Token.LeftBracket);
    const key = parseAssignmentExpression(parser, context | Context.AllowIn);
    expect(parser, context, Token.RightBracket);
    return key;
}

/**
 * Parse property name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PropertyName)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parsePropertyName(parser: Parser, context: Context): any {
    switch (parser.token) {
        case Token.NumericLiteral:
        case Token.StringLiteral:
            return parseLiteral(parser, context);
        case Token.LeftBracket:
            return parseComputedPropertyName(parser, context);
        default:
            return parseIdentifier(parser, context);
    }
}

/**
 * Parses object literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ObjectLiteral)
 *
 * @param parser
 * @param context
 */

function parseObjectLiteral(parser: Parser, context: Context): ESTree.ObjectExpression {
    const pos = getLocation(parser);
    expect(parser, context, Token.LeftBrace);
    const properties: ESTree.Property[] = [];

    while (parser.token !== Token.RightBrace) {
        properties.push(parser.token === Token.Ellipsis ?
            parseSpreadElement(parser, context) :
            parsePropertyDefinition(parser, context));
        if (parser.token !== Token.RightBrace) expect(parser, context, Token.Comma);
    }

    if (parser.flags & Flags.HasDuplicateProto && parser.token !== Token.Assign) {
        report(parser, Errors.DuplicateProto);
    }

    // Unset the 'HasProtoField' flag now, we are done!
    parser.flags &= ~(Flags.HasProtoField | Flags.HasDuplicateProto);
    expect(parser, context, Token.RightBrace);
    return finishNode(context, parser, pos, {
        type: 'ObjectExpression',
        properties
    });
}

/**
 * Parse property definition
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PropertyDefinition)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parsePropertyDefinition(parser: Parser, context: Context): ESTree.Property {
    const pos = getLocation(parser);
    let value;
    let state = ObjectState.None;

    if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;

    let t = parser.token;

    if (parser.token === Token.LeftBracket) state |= ObjectState.Computed;

    let key = parsePropertyName(parser, context);

    if (!(parser.token & Token.IsEndMarker)) {

        if (!(state & ObjectState.Generator) && t & Token.IsAsync && !(parser.flags & Flags.NewLine)) {
            t = parser.token;
            state |= ObjectState.Async;
            if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;
            key = parsePropertyName(parser, context);
        } else if ((t === Token.GetKeyword || t === Token.SetKeyword)) {
            if (state & ObjectState.Generator) {
                report(parser, Errors.UnexpectedToken, tokenDesc(parser.token));
            }
            state |= t === Token.GetKeyword ? ObjectState.Getter : ObjectState.Setter;
            key = parsePropertyName(parser, context);
        }
    }
    // method
    if (parser.token === Token.LeftParen) {
        if (!(state & (ObjectState.Getter | ObjectState.Setter))) {
            state |= ObjectState.Method;
            //parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
        }
        value = parseMethodDeclaration(parser, context | Context.Method, state);
    } else {

        if (state & (ObjectState.Generator | ObjectState.Async)) {
            report(parser, Errors.UnexpectedToken, tokenDesc(parser.token));
        }

        if (parser.token === Token.Colon) {

            if (!(state & ObjectState.Computed) && parser.tokenValue === '__proto__') {
                // Annex B defines an tolerate error for duplicate PropertyName of `__proto__`,
                // in object initializers, but this does not apply to Object Assignment
                // patterns, so we need to validate this *after* done parsing
                // the object expression
                parser.flags |= parser.flags & Flags.HasProtoField ? Flags.HasDuplicateProto : Flags.HasProtoField;
            }
            expect(parser, context, Token.Colon);
            value = restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression);
        } else {

            if (state & ObjectState.Async || !isIdentifier(context, t)) {
                report(parser, Errors.UnexpectedToken, tokenDesc(t));
            }

            state |= ObjectState.Shorthand;

            if (consume(parser, context, Token.Assign)) {
                parser.pendingExpressionError = {
                    error: Errors.InvalidLHSInAssignment,
                    line: parser.startLine,
                    column: parser.startColumn,
                    index: parser.startIndex,
                };
                value = parseAssignmentPattern(parser, context | Context.AllowIn, key, pos);
            } else value = key;
        }
    }

    return finishNode(context, parser, pos, {
        type: 'Property',
        key,
        value,
        kind: !(state & ObjectState.Getter | state & ObjectState.Setter) ? 'init' : (state & ObjectState.Setter) ? 'set' : 'get',
        computed: !!(state & ObjectState.Computed),
        method: !!(state & ObjectState.Method),
        shorthand: !!(state & ObjectState.Shorthand)
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseMethodDeclaration(parser: Parser, context: Context, state: ObjectState): ESTree.FunctionExpression {
    const pos = getLocation(parser);
    const isGenerator = state & ObjectState.Generator ? ModifierState.Generator : ModifierState.None;
    const isAsync = state & ObjectState.Async ? ModifierState.Await : ModifierState.None;
    const { params, body } = swapContext(parser, context, isGenerator | isAsync, parseFormalListAndBody);

    if (state & ObjectState.Setter) {
        if (params.length !== 1) {
            report(parser, Errors.Unexpected);
        } else if (params[0].type === 'RestElement') {
            report(parser, Errors.Unexpected);
        }
    }

    if (state & ObjectState.Getter) {
        if (params.length > 0) {
            report(parser, Errors.Unexpected);
        }
    }
    return finishNode(context, parser, pos, {
        type: 'FunctionExpression',
        params,
        body,
        async: !!(state & ObjectState.Async),
        generator: !!(state & ObjectState.Generator),
        expression: false,
        id: null
    });
}

/**
 * Parse arrow function
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrowFunction)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseArrowFunction(parser: Parser, context: Context, pos: any, params: any): ESTree.ArrowFunctionExpression {

    parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);

    if (parser.flags & Flags.NewLine) report(parser, Errors.Unexpected);

    expect(parser, context, Token.Arrow);

    const {  token } = parser;

    parser.pendingExpressionError = null;

    for (const i in params) {
        toAssignable(parser, context | Context.InParameter, params[i]);
    }

    let body: ESTree.BlockStatement | ESTree.Expression;
    let expression = false;

    if (token === Token.LeftBrace) {
        body = swapContext(parser, context | Context.InFunctionBody, ModifierState.None, parseFunctionBody);
    } else {
        expression = true;
        body = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    }

    return finishNode(context, parser, pos, {
        type: 'ArrowFunctionExpression',
        body,
        params,
        id: null,
        async: false,
        generator: false,
        expression
    });
}

/**
 * Parse async arrow function
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseAsyncArrowFunction(parser: Parser, context: Context, pos: any, params: any): any {

    parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);

    expect(parser, context, Token.Arrow);

    if (parser.flags & Flags.NewLine) return report(parser, Errors.Unexpected);

    const { token } = parser;

    parser.pendingExpressionError = null;

    for (const i in params) {
        toAssignable(parser, context | Context.InParameter, params[i]);
    }

    let body: ESTree.BlockStatement | ESTree.Expression;
    let expression = false;

    if (token === Token.LeftBrace) {
        body = swapContext(parser, context | Context.InFunctionBody, ModifierState.Await, parseFunctionBody);
    } else {
        expression = true;
        body = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    }

    return finishNode(context, parser, pos, {
        type: 'ArrowFunctionExpression',
        body,
        params,
        id: null,
        async: true,
        generator: false,
        expression
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseFormalListAndBody(parser: Parser, context: Context) {

    const paramList = parseFormalParameterList(parser, context | Context.InParameter);
    const body = parseFunctionBody(parser, context | Context.InFunctionBody);
    return { params: paramList, body };
}

/**
 * Parse funciton body
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionBody)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseFunctionBody(parser: Parser, context: Context): ESTree.BlockStatement {
    const pos = getLocation(parser);
    expect(parser, context, Token.LeftBrace);
    const body: ESTree.Statement[] = [];
    const { labelSet } = parser;
    parser.labelSet = {};

    while (parser.token === Token.StringLiteral) {

        const item: ESTree.Statement = parseDirective(parser, context);
        body.push(item);

        if (!isPrologueDirective(item)) break;

        if (item.expression.value === 'use strict') {
            if (parser.flags & Flags.SimpleParameterList) {
                report(parser, Errors.IllegalUseStrict);
            } else if (parser.flags & Flags.StrictReserved) {
                report(parser, Errors.UnexpectedStrictReserved);
            } else if (parser.flags & Flags.StrictFunctionName) {
                report(parser, Errors.UnexpectedStrictReserved);
            } else if (parser.flags & Flags.StrictEvalArguments) {
                report(parser, Errors.StrictEvalArguments);
            }
            context |= Context.Strict;
        }
    }

    // Note: This has to be unset each time we parse out a function body to
    // avoid conflicts with nested functions
    parser.flags &= ~(Flags.StrictFunctionName | Flags.StrictEvalArguments);

    while (parser.token !== Token.RightBrace) {
        body.push(parseStatementListItem(parser, context));
    }

    parser.labelSet = labelSet;

    expect(parser, context, Token.RightBrace);

    return finishNode(context, parser, pos, {
        type: 'BlockStatement',
        body
    });
}

/**
 * Parse formal parameters
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameters)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseFormalParameters(parser: Parser, context: Context): any {

    parser.flags &= ~(Flags.SimpleParameterList | Flags.StrictReserved);

    expect(parser, context, Token.LeftParen);

    const params: ESTree.ArrayPattern | ESTree.RestElement | ESTree.ObjectPattern | ESTree.Identifier[] = [];

    while (parser.token !== Token.RightParen) {
        if (parser.token === Token.Ellipsis) {
            parser.flags |= Flags.SimpleParameterList;
            params.push(parseRestElement(parser, context));
            break;
        }

        params.push(parseFormalParameterList(parser, context));
        if (!consume(parser, context, Token.Comma)) break;
        if (parser.token === Token.RightParen)  break;
    }

    expect(parser, context, Token.RightParen);

    return params;
}

/**
 * Parse formal parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameterList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseFormalParameterList(parser: Parser, context: Context): any {

    const pos = getLocation(parser);

    if (parser.token & (Token.IsIdentifier | Token.Keyword)) {
        if (hasBit(parser.token, Token.FutureReserved)) {
            if (context & Context.Strict) report(parser, Errors.UnexpectedStrictReserved);
            parser.flags |= Flags.StrictFunctionName;
        }
        if (hasBit(parser.token, Token.IsEvalOrArguments)) {
            if (context & Context.Strict) report(parser, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictEvalArguments;
        }
    } else {
        parser.flags |= Flags.SimpleParameterList;
    }

    const left: any = parseBindingIdentifierOrPattern(parser, context);
    if (!consume(parser, context, Token.Assign)) return left;

    if (parser.token & (Token.IsYield | Token.IsAwait) && context & (Context.Yield | Context.Async)) {
        report(parser, parser.token & Token.IsAwait ? Errors.AwaitInParameter : Errors.YieldInParameter);
    }

    parser.flags |= Flags.SimpleParameterList;

    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left: left,
        right: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression)
    });
}

/**
 * Parse class expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassExpression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseClassExpression(parser: Parser, context: Context): ESTree.ClassExpression {
    const pos = getLocation(parser);
    expect(parser, context, Token.ClassKeyword);
    const { token } = parser;
    if (context & Context.Async && token & Token.IsAwait) report(parser, Errors.AwaitBindingIdentifier);
    const id = (token !== Token.LeftBrace && token !== Token.ExtendsKeyword) ?
        parseBindingIdentifier(parser, context | Context.Strict) :
        null;
    const superClass = consume(parser, context, Token.ExtendsKeyword) ?
        parseLeftHandSideExpression(parser, context | Context.Strict, pos) :
        null;
    return finishNode(context, parser, pos, {
        type: 'ClassExpression',
        id,
        superClass,
        body: parseClassBodyAndElementList(parser, context | Context.Strict)
    });
}

/**
 * Parse class body and element list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElementList)
 *
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseClassBodyAndElementList(parser: Parser, context: Context): ESTree.ClassBody {
    const pos = getLocation(parser);
    expect(parser, context, Token.LeftBrace);
    const body: (ESTree.MethodDefinition | ESTree.FieldDefinition)[] = [];
    while (parser.token !== Token.RightBrace) {
        if (!consume(parser, context, Token.Semicolon)) {
            body.push(parseClassElement(parser, context));
        }
    }

    expect(parser, context, Token.RightBrace);

    return finishNode(context, parser, pos, {
        type: 'ClassBody',
        body
    });
}

/**
 * Parse class element and class public instance fields & private instance fields
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElement)
 * @see [Link](https://tc39.github.io/proposal-class-public-fields/)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseClassElement(parser: Parser, context: Context): ESTree.MethodDefinition | ESTree.FieldDefinition {

    const pos = getLocation(parser);

    if (context & Context.OptionsNext && parser.token === Token.Hash) {
        return parsePrivateFields(parser, context, pos);
    }

    let { tokenValue, token } = parser;
    let state = ObjectState.None;

    if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;

    if (parser.token === Token.LeftBracket) state |= ObjectState.Computed;

    if (parser.tokenValue === 'constructor') {
        if (state & ObjectState.Generator) report(parser, Errors.ConstructorIsGenerator);
        state |= ObjectState.Constructor;
    }

    let key = parsePropertyName(parser, context);

    if (context & Context.OptionsNext && parser.token & Token.InstanceField) {
        return parseFieldDefinition(parser, context, key, state, pos);
    }

    let value;

    if (!(parser.token & Token.IsEndMarker)) {

        if (token === Token.StaticKeyword) {
            token = parser.token;
            if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;
            tokenValue = parser.tokenValue;

            if (parser.token === Token.LeftBracket) state |= ObjectState.Computed;
            if (parser.tokenValue === 'prototype') report(parser, Errors.StaticPrototype);

            state |= ObjectState.Static;

            key = parsePropertyName(parser, context);

            if (context & Context.OptionsNext && parser.token & Token.InstanceField) {
                if (tokenValue === 'constructor') report(parser, Errors.Unexpected);
                return parseFieldDefinition(parser, context, key, state, pos);
            }
        }

        if (parser.token !== Token.LeftParen) {

            if (token & Token.IsAsync && !(state & ObjectState.Generator) && !(parser.flags & Flags.NewLine)) {

                token = parser.token;
                tokenValue = parser.tokenValue;
                state |= ObjectState.Async;
                if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;
                if (parser.token === Token.LeftBracket) state |= ObjectState.Computed;
                key = parsePropertyName(parser, context);
            } else if ((token === Token.GetKeyword || token === Token.SetKeyword)) {
                state |= token === Token.GetKeyword ? ObjectState.Getter : ObjectState.Setter;
                tokenValue = parser.tokenValue;
                if (parser.token === Token.LeftBracket) state |= ObjectState.Computed;
                key = parsePropertyName(parser, context);
            }

            if (tokenValue === 'prototype') {
                report(parser, Errors.StaticPrototype);
            } else if (!(state & ObjectState.Static) && tokenValue === 'constructor') {
                report(parser, Errors.ConstructorSpecialMethod);
            }
        }
    }

    if (parser.token === Token.LeftParen) {
        if (!(state & (ObjectState.Getter | ObjectState.Setter))) state |= ObjectState.Method;
        value = parseMethodDeclaration(parser, context | Context.Method, state);
    } else {
        // Class fields - Stage 3 proposal
        if (context & Context.OptionsNext) return parseFieldDefinition(parser, context, key, state, pos);
        report(parser, Errors.UnexpectedToken, tokenDesc(token));
    }

    return parseMethodDefinition(parser, context, key, value, state, pos);

}

function parseMethodDefinition(parser: Parser, context: Context, key: any, value: any, state: ObjectState, pos: Location): ESTree.MethodDefinition {

    return finishNode(context, parser, pos, {
        type: 'MethodDefinition',
        kind: (state & ObjectState.Constructor) ? 'constructor' : (state & ObjectState.Getter) ? 'get' :
            (state & ObjectState.Setter) ? 'set' : 'method',
        static: !!(state & ObjectState.Static),
        computed: !!(state & ObjectState.Computed),
        key,
        value
    });
}

/**
 * Parses field definition.
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseFieldDefinition(parser: Parser, context: Context, key: any, state: ObjectState, pos: Location): ESTree.FieldDefinition {
    if (state & ObjectState.Constructor) report(parser, Errors.Unexpected);
    let value: ESTree.Expression | null = null;

    if (state & (ObjectState.Async | ObjectState.Generator)) report(parser, Errors.Unexpected);
    if (consume(parser, context, Token.Assign)) {
        if (parser.token & Token.IsEvalOrArguments) report(parser, Errors.Unexpected);
        value = parseAssignmentExpression(parser, context);
    }

    consume(parser, context, Token.Comma);

    return finishNode(context, parser, pos, {
        type: 'FieldDefinition',
        key,
        value,
        computed: !!(state & ObjectState.Computed),
        static: !!(state & ObjectState.Static)
    });
}

/**
 * Parse private name
 *
 * @param parser Parser instance
 * @param context Context masks
 */

function parsePrivateName(parser: Parser, context: Context, pos: Location): ESTree.PrivateName {
    const name = parser.tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'PrivateName',
        name
    });
}

/**
 * Parses private instance fields
 *
 * @see [Link](https://tc39.github.io/proposal-class-public-fields/)
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function parsePrivateFields(parser: Parser, context: Context, pos: Location): ESTree.FieldDefinition | ESTree.MethodDefinition {
    expect(parser, context | Context.InClass, Token.Hash);
    if (parser.tokenValue === 'constructor') report(parser, Errors.PrivateFieldConstructor);
    const key = parsePrivateName(parser, context, pos);
    if (parser.token === Token.LeftParen) return parsePrivateMethod(parser, context, key, pos);
    let value: any = null;
    if (consume(parser, context, Token.Assign)) {
        if (parser.token & Token.IsEvalOrArguments) report(parser, Errors.Unexpected);
        value = parseAssignmentExpression(parser, context);
    }

    consume(parser, context, Token.Comma);

    return finishNode(context, parser, pos, {
        type: 'FieldDefinition',
        key,
        value,
        computed: false,
        static: false // Note: This deviates from the ESTree specs. Added to support static field names
    });
}

function parsePrivateMethod(parser: Parser, context: Context, key: any, pos: Location): ESTree.MethodDefinition {
    const value = parseMethodDeclaration(parser, context | Context.Strict | Context.Method, ObjectState.None);
    return parseMethodDefinition(parser, context, key, value, ObjectState.Method, pos);
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseImportExpressions(parser: Parser, context: Context): ESTree.Expression {
    const pos = getLocation(parser);
    const id = parseIdentifier(parser, context);

    // Import.meta - Stage 3 proposal
    if (context & Context.OptionsNext && consume(parser, context, Token.Period)) {
        if (context & Context.Module && parser.tokenValue === 'meta') {
            return parseMetaProperty(parser, context, id, pos);
        }

        report(parser, Errors.UnexpectedToken, tokenDesc(parser.token));
    }

    return finishNode(context, parser, pos, {
        type: 'Import'
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseMetaProperty(parser: Parser, context: Context, meta: ESTree.Identifier, pos: Location): ESTree.MetaProperty {
    return finishNode(context, parser, pos, {
        meta,
        type: 'MetaProperty',
        property: parseIdentifier(parser, context)
    });
}

/**
 * Parse new expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NewExpression)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseNewExpression(parser: Parser, context: Context): ESTree.NewExpression | ESTree.MetaProperty {

    const pos = getLocation(parser);
    const { token, tokenValue } = parser;
    const id = parseIdentifier(parser, context);

    if (consume(parser, context, Token.Period)) {
        if (parser.tokenValue !== 'target' ||
            !(context & (Context.InParameter | Context.InFunctionBody))) report(parser, Errors.MetaNotInFunctionBody);
        return parseMetaProperty(parser, context, id as ESTree.Identifier, pos);
    }

    return finishNode(context, parser, pos, {
        type: 'NewExpression',
        callee: parseMemberExpression(parser, context, pos),
        arguments: parser.token === Token.LeftParen ? parseArgumentList(parser, context) : []
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseSuperProperty(parser: Parser, context: Context): ESTree.Expression {
    const pos = getLocation(parser);

    expect(parser, context, Token.SuperKeyword);

    const { token } = parser;

    return finishNode(context, parser, pos, {
        type: 'Super'
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseTemplateLiteral(parser: Parser, context: Context): ESTree.TemplateLiteral {
    const pos = getLocation(parser);
    return finishNode(context, parser, pos, {
        type: 'TemplateLiteral',
        expressions: [],
        quasis: [parseTemplateSpans(parser, context)]
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseTemplateHead(parser: Parser, context: Context, cooked: string | null = null, raw: string, pos: Location): ESTree.TemplateElement {
    parser.token = consumeTemplateBrace(parser, context);

    return finishNode(context, parser, pos, {
        type: 'TemplateElement',
        value: {
            cooked,
            raw
        },
        tail: false
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseTemplate(
    parser: Parser,
    context: Context,
    expressions: ESTree.Expression[] = [],
    quasis: ESTree.TemplateElement[] = []
): ESTree.TemplateLiteral {
    const pos = getLocation(parser);
    const {
        tokenValue,
        tokenRaw
    } = parser;

    expect(parser, context, Token.TemplateCont);

    expressions.push(parseExpression(parser, context));
    const t = getLocation(parser);
    quasis.push(parseTemplateHead(parser, context, tokenValue, tokenRaw, pos));

    if (parser.token === Token.TemplateTail) {
        quasis.push(parseTemplateSpans(parser, context, t));
    } else {
        parseTemplate(parser, context, expressions, quasis);
    }

    return finishNode(context, parser, pos, {
        type: 'TemplateLiteral',
        expressions,
        quasis
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

function parseTemplateSpans(parser: Parser, context: Context, pos: Location = getLocation(parser)): ESTree.TemplateElement {
    const {
        tokenValue,
        tokenRaw
    } = parser;

    expect(parser, context, Token.TemplateTail);

    return finishNode(context, parser, pos, {
        type: 'TemplateElement',
        value: {
            cooked: tokenValue,
            raw: tokenRaw
        },
        tail: true
    });
}