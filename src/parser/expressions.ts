import * as ESTree from '../estree';
import { Token, tokenDesc } from '../token';
import { scanRegularExpression } from '../scanner/regexp';
import { consumeTemplateBrace } from '../scanner/template';
import { Errors, report, tolerant } from '../errors';
import { parseBindingIdentifierOrPattern, parseBindingIdentifier, parseAssignmentPattern } from './pattern';
import { Location, Parser } from '../types';
import { parseStatementListItem, parseDirective } from './statements';
import { parseJSXRootElement } from './jsx';
import {
    expect,
    Context,
    hasBit,
    finishNode,
    Flags,
    nextToken,
    consume,
    isInstanceField,
    restoreExpressionCoverGrammar,
    parseAndValidateIdentifier,
    parseExpressionCoverGrammar,
    isValidSimpleAssignmentTarget,
    validateUpdateExpression,
    swapContext,
    ModifierState,
    getLocation,
    reinterpret,
    nextTokenIsFuncKeywordOnSameLine,
    lookahead,
    isPropertyWithPrivateFieldKey,
    ObjectState,
    CoverParenthesizedState,
    isValidIdentifier,
    nextTokenIsLeftParen,
    nameIsArgumentsOrEval,
    nextTokenisIdentifierOrParen,
    setPendingError,
    CoverCallState,
    validateParams
} from '../utilities';

/**
 * Expression :
 *   AssignmentExpression
 *   Expression , AssignmentExpression
 *
 * ExpressionNoIn :
 *   AssignmentExpressionNoIn
 *   ExpressionNoIn , AssignmentExpressionNoIn
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Expression)
 *
 * @param Parser object
 * @param Context masks
 */

export function parseExpression(parser: Parser, context: Context): ESTree.Expression {
    const pos = getLocation(parser);
    const expr = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    return parser.token === Token.Comma ?
        parseSequenceExpression(parser, context, expr, pos) :
        expr;
}

/**
 * Parse secuence expression
 *
 * @param Parser object
 * @param Context masks
 */

export function parseSequenceExpression(parser: Parser, context: Context, left: ESTree.Expression, pos: Location): ESTree.SequenceExpression {
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
 * @param Parser object
 * @param Context masks
 */

function parseYieldExpression(parser: Parser, context: Context, pos: Location): ESTree.YieldExpression | ESTree.Identifier {

    // YieldExpression[In] :
    //    yield
    //    yield [no LineTerminator here] AssignmentExpression[?In, Yield]
    //    yield [no LineTerminator here] * AssignmentExpression[?In, Yield]

    // https://tc39.github.io/ecma262/#sec-generator-function-definitions-static-semantics-early-errors
   if (context & Context.InParameter) tolerant(parser, context, Errors.YieldInParameter);

   expect(parser, context, Token.YieldKeyword);

   let argument: ESTree.Expression | null = null;
   let delegate = false;

   if (!(parser.flags & Flags.NewLine)) {
        delegate = consume(parser, context, Token.Multiply);
         // 'Token.IsExpressionStart' bitmask contains the complete set of
         // tokens that can appear after an AssignmentExpression, and none of them
         // can start an AssignmentExpression.
        if (delegate || parser.token & Token.IsExpressionStart) {
            argument = parseAssignmentExpression(parser, context);
        }
    }

   return finishNode(context, parser, pos, {
        type: 'YieldExpression',
        argument,
        delegate
    });
}

/**
 * AssignmentExpression :
 *   ConditionalExpression
 *   YieldExpression
 *   ArrowFunction
 *   AsyncArrowFunction
 *   LeftHandSideExpression = AssignmentExpression
 *   LeftHandSideExpression AssignmentOperator AssignmentExpression
 *
 * AssignmentExpressionNoIn :
 *   ConditionalExpressionNoIn
 *   YieldExpression
 *   ArrowFunction
 *   AsyncArrowFunction
 *   LeftHandSideExpression = AssignmentExpressionNoIn
 *   LeftHandSideExpression AssignmentOperator AssignmentExpressionNoIn
 *
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 *
 * @param Parser object
 * @param Context masks
 */

export function parseAssignmentExpression(parser: Parser, context: Context): any {

    const pos = getLocation(parser);

    let { token } = parser;

    if (context & Context.Yield && token & Token.IsYield) return parseYieldExpression(parser, context, pos);

    let expr: any = token & Token.IsAsync && lookahead(parser, context, nextTokenisIdentifierOrParen)
            ? parserCoverCallExpressionAndAsyncArrowHead(parser, context)
            : parseConditionalExpression(parser, context, pos);

    if (parser.token === Token.Arrow) {
        if (token & (Token.IsIdentifier | Token.Keyword)) {
            if (token & (Token.FutureReserved | Token.IsEvalOrArguments)) {
                // Invalid: ' yield => { 'use strict'; 0 };'
                if (token & Token.FutureReserved) {
                    parser.flags |= Flags.HasStrictReserved;
                }
                if (token & Token.IsEvalOrArguments) {
                    if (context & Context.Strict)  tolerant(parser, context, Errors.StrictEvalArguments);
                    parser.flags |= Flags.StrictEvalArguments;
                }
            }
            expr = [expr];
        }
        return parseArrowFunction(parser, context &= ~Context.Async, pos, expr);
    }

    if (hasBit(parser.token, Token.IsAssignOp)) {

        token = parser.token;

        if (context & Context.Strict && nameIsArgumentsOrEval((expr as ESTree.Identifier).name)) {
            tolerant(parser, context, Errors.StrictLHSAssignment);
        } else if (consume(parser, context, Token.Assign)) {

            if (!(parser.flags & Flags.AllowDestructuring)) {
                tolerant(parser, context, Errors.InvalidDestructuringTarget);
            }

            // Only re-interpret if not inside a formal parameter list
            if (!(context & Context.InParameter)) reinterpret(parser, context, expr);
            if (context & Context.InParen) parser.flags |= Flags.SimpleParameterList;

            if (parser.token & Token.IsAwait) {
                setPendingError(parser);
                parser.flags |= Flags.HasAwait;
            } else if (context & Context.InParen &&
                context & (Context.Strict | Context.Yield) &&
                parser.token & Token.IsYield) {
                setPendingError(parser);
                parser.flags |= Flags.HasYield;
            }
        } else {
            if (!isValidSimpleAssignmentTarget(expr)) {
                tolerant(parser, context, Errors.InvalidLHSInAssignment);
            }
            parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
            nextToken(parser, context);
        }

        const right = parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression);

        parser.pendingExpressionError = null;

        return finishNode(context, parser, pos, {
            type: 'AssignmentExpression',
            left: expr,
            operator: tokenDesc(token),
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
 * @param Parser object
 * @param Context masks
 */

function parseConditionalExpression(parser: Parser, context: Context, pos: any): ESTree.Expression {
    const test = parseBinaryExpression(parser, context, 0, pos);
    if (!consume(parser, context, Token.QuestionMark)) return test;
    const consequent = parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression);
    expect(parser, context, Token.Colon);
    return finishNode(context, parser, pos, {
        type: 'ConditionalExpression',
        test,
        consequent,
        alternate: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression)
    });
}

/**
 * Parse binary expression.
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-exp-operator)
 * @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-additive-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-bitwise-shift-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-equality-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-relational-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-multiplicative-operators)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param minPrec Minimum precedence value
 * @param pos Line / Column info
 * @param Left Left hand side of the binary expression
 */
function parseBinaryExpression(
    parser: Parser,
    context: Context,
    minPrec: number,
    pos: Location,
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
 * @param Parser object
 * @param Context masks
 * @param {loc} pas Location info
 */

function parseAwaitExpression(parser: Parser, context: Context, pos: Location): ESTree.AwaitExpression {
    if (context & Context.InParameter) tolerant(parser, context, Errors.AwaitInParameter);
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
 * @param parser Parser object
 * @param context Context masks
 */
function parseUnaryExpression(parser: Parser, context: Context): ESTree.UnaryExpression | ESTree.Expression {
    const pos = getLocation(parser);
    const { token } = parser;

    if (hasBit(token, Token.IsUnaryOp)) {
        nextToken(parser, context);
        if (parser.flags & Flags.EscapedKeyword) tolerant(parser, context,  Errors.InvalidEscapedReservedWord);
        const argument = parseExpressionCoverGrammar(parser, context, parseUnaryExpression);
        if (parser.token === Token.Exponentiate) tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
        if (context & Context.Strict && token === Token.DeleteKeyword) {
            if (argument.type === 'Identifier') {
                tolerant(parser, context, Errors.StrictDelete);
            } else if (isPropertyWithPrivateFieldKey(argument)) {
                tolerant(parser, context, Errors.DeletePrivateField);
            }
        }
        return finishNode(context, parser, pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(token),
            argument,
            prefix: true
        });
    }

    return context & Context.Async && token & Token.IsAwait
    ? parseAwaitExpression(parser, context, pos)
    : parseUpdateExpression(parser, context, pos);
}

/**
 * Parses update expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
 *
 * @param Parser Parser object
 * @param context Context masks
 */
function parseUpdateExpression(parser: Parser, context: Context, pos: Location): ESTree.Expression {
    const { token } = parser;
    if (hasBit(parser.token, Token.IsUpdateOp)) {
        nextToken(parser, context);
        const expr = parseLeftHandSideExpression(parser, context, pos);
        validateUpdateExpression(parser, context, expr, 'Prefix');
        return finishNode(context, parser, pos, {
            type: 'UpdateExpression',
            argument: expr,
            operator: tokenDesc(token as Token),
            prefix: true
        });
    } else if (context & Context.OptionsJSX && token === Token.LessThan) {
        return parseJSXRootElement(parser, context | Context.InJSXChild);
    }
    const expression = parseLeftHandSideExpression(parser, context, pos);
    if (hasBit(parser.token, Token.IsUpdateOp) && !(parser.flags & Flags.NewLine)) {
        validateUpdateExpression(parser, context, expression, 'Postfix');
        const operator = parser.token;
        nextToken(parser, context);
        return finishNode(context, parser, pos, {
            type: 'UpdateExpression',
            argument: expression,
            operator: tokenDesc(operator as Token),
            prefix: false
        });
    }

    return expression;
}

/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param Parser Parser object
 * @param context Context masks
 */

export function parseRestElement(parser: Parser, context: Context, args: string[] = []): any {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    if (context & Context.InParen && parser.token & Token.IsAwait) parser.flags |= Flags.HasAwait;
    const argument = parseBindingIdentifierOrPattern(parser, context, args);
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
 * @param Parser Parser object
 * @param context Context masks
 */
function parseSpreadElement(parser: Parser, context: Context): any {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
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
 * @param Parser Parer instance
 * @param Context Contextmasks
 * @param pos Location info
 */

export function parseLeftHandSideExpression(parser: Parser, context: Context, pos: Location): ESTree.Expression {
    const expr = parser.token === Token.ImportKeyword ?
        parseImportExpressions(parser, context | Context.AllowIn) :
        parseMemberExpression(parser, context | Context.AllowIn, pos);
    return parseCallExpression(parser, context | Context.AllowIn, pos, expr);
}

/**
 * Parse member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param Parser Parser object
 * @param context Context masks
 * @param pos Location info
 * @param expr Expression
 */

function parseMemberExpression(
    parser: Parser,
    context: Context,
    pos: Location,
    expr: ESTree.CallExpression | ESTree.Expression = parsePrimaryExpression(parser, context)
): ESTree.Expression {

    while (true) {

        switch (parser.token) {
            case Token.Period: {
                consume(parser, context, Token.Period);
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

            case Token.LeftBracket: {

                    consume(parser, context, Token.LeftBracket);
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
            case Token.TemplateTail: {
                expr = finishNode(context, parser, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplateLiteral(parser, context)
                });
                continue;
            }
            case Token.TemplateCont: {
                expr = finishNode(context, parser, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplate(parser, context | Context.TaggedTemplate)
                });

                continue;
            }
            default:
            return expr;
        }
    }
}

/**
 * Parse call expression
 *
 * Note! This is really a part of 'CoverCallExpressionAndAsyncArrowHead', but separated because of performance reasons
 *
 * @param Parser Parer instance
 * @param Context Context masks
 * @param pos Line / Colum info
 * @param expr Expression
 */
function parseCallExpression(parser: Parser, context: Context, pos: Location, expr: ESTree.Expression): ESTree.Expression | ESTree.CallExpression {

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
 * Parse cover call expression and async arrow head
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CoverCallExpressionAndAsyncArrowHead)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parserCoverCallExpressionAndAsyncArrowHead(parser: Parser, context: Context): ESTree.Expression {
    const pos = getLocation(parser);
    let expr = parseMemberExpression(parser, context | Context.AllowIn, pos);
    // Here we jump right into it and parse a simple, faster sub-grammar for
    // async arrow / async identifier + call expression. This could have been done different
    // but ESTree sucks!
    //
    // - J.K. Thomas

    if (parser.token & (Token.IsIdentifier | Token.Keyword)) {
        if (parser.token & Token.IsAwait) tolerant(parser, context, Errors.DisallowedInContext);
        return parseAsyncArrowFunction(parser, context, ModifierState.Await, pos, [parseAndValidateIdentifier(parser, context)]);
    }
    if (parser.flags & Flags.NewLine) tolerant(parser, context, Errors.LineBreakAfterAsync);

    while (parser.token === Token.LeftParen) {
        expr = parseMemberExpression(parser, context, pos, expr);
        const args = parseAsyncArgumentList(parser, context);
        if (parser.token === Token.Arrow) {
            expr = parseAsyncArrowFunction(parser, context, ModifierState.Await, pos, args);
            break;
        }
        expr = finishNode(context, parser, pos, {
            type: 'CallExpression',
            callee: expr,
            arguments: args
        });
    }
    return expr;
}

/**
 * Parse argument list
 *
 * @see [https://tc39.github.io/ecma262/#prod-ArgumentList)
 *
 * @param Parser Parser object
 * @param Context Context masks
 */
function parseArgumentList(parser: Parser, context: Context): (ESTree.Expression | ESTree.SpreadElement)[] {
    // ArgumentList :
    //   AssignmentOrSpreadExpression
    //   ArgumentList , AssignmentOrSpreadExpression
    //
    // AssignmentOrSpreadExpression :
    //   ... AssignmentExpression
    //   AssignmentExpression
    expect(parser, context, Token.LeftParen);
    const expressions: (ESTree.Expression | ESTree.SpreadElement)[] = [];
    while (parser.token !== Token.RightParen) {
        if (parser.token === Token.Ellipsis) {
            expressions.push(parseSpreadElement(parser, context));
        } else {
            if (context & Context.Yield && hasBit(parser.token, Token.IsYield)) {
                parser.flags |= Flags.HasYield;
                setPendingError(parser);
            }
            expressions.push(parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression));
        }

        if (parser.token !== Token.RightParen) expect(parser, context, Token.Comma);
    }

    expect(parser, context, Token.RightParen);
    return expressions;
}

/**
 * Parse argument list for async arrow / async call expression
 *
 * @see [https://tc39.github.io/ecma262/#prod-ArgumentList)
 *
 * @param Parser Parser object
 * @param Context Context masks
 */

function parseAsyncArgumentList(parser: Parser, context: Context): ESTree.Expression[] {
    // Here we are parsing an "extended" argument list tweaked to handle async arrows. This is
    // done here to avoid overhead and possible performance loss if we only
    // parse out a simple call expression - E.g 'async(foo, bar)' or 'async(foo, bar)()';
    //
    // - J.K. Thomas

    expect(parser, context, Token.LeftParen);

    const args: any[] = [];

    let { token } = parser;
    let state = CoverCallState.Empty;

    while (parser.token !== Token.RightParen) {
        if (parser.token === Token.Ellipsis) {
            parser.flags |= Flags.SimpleParameterList;
            args.push(parseSpreadElement(parser, context));
            state = CoverCallState.HasSpread;
        } else {
            token = parser.token;
            if (hasBit(token, Token.IsEvalOrArguments)) {
                setPendingError(parser);
                state |= CoverCallState.EvalOrArguments;
            }
            if (hasBit(token, Token.IsYield)) {
                setPendingError(parser);
                state |= CoverCallState.Yield;
            }
            if (hasBit(token, Token.IsAwait)) {
                setPendingError(parser);
                state |= CoverCallState.Await;
            }
            if (!(parser.flags & Flags.AllowBinding)) {
                tolerant(parser, context, Errors.NotBindable);
            }
            args.push(restoreExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression));
        }

        if (consume(parser, context, Token.Comma)) {
            parser.flags &= ~Flags.AllowDestructuring;
            if (state & CoverCallState.HasSpread) state = CoverCallState.SeenSpread;
        }

        if (parser.token === Token.RightParen) break;
    }

    expect(parser, context, Token.RightParen);
    if (parser.token === Token.Arrow) {
        if (state & CoverCallState.SeenSpread) tolerant(parser, context, Errors.ParamAfterRest);
        if (!(token & Token.IsIdentifier)) parser.flags |= Flags.SimpleParameterList;
        if (state & CoverCallState.Await || parser.flags & Flags.HasAwait) tolerant(parser, context, Errors.AwaitInParameter);
        if (state & CoverCallState.Yield || parser.flags & Flags.HasYield) tolerant(parser, context, Errors.YieldInParameter);
        if (state & CoverCallState.EvalOrArguments) {
            if (context & Context.Strict) tolerant(parser, context, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictEvalArguments;
        }
        parser.flags &= ~(Flags.HasAwait | Flags.HasYield);

    }

    return args;
}

/**
 * Parse primary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PrimaryExpression)
 *
 * @param Parser Parser object
 * @param Context Context masks
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
            return parseAsyncFunctionOrIdentifier(parser, context);
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
            scanRegularExpression(parser, context);
            return parseRegularExpressionLiteral(parser, context);
        case Token.TemplateTail:
            return parseTemplateLiteral(parser, context);
        case Token.TemplateCont:
            return parseTemplate(parser, context);
        case Token.LetKeyword:
            return parseLetAsIdentifier(parser, context);
        default:
            return parseAndValidateIdentifier(parser, context);
    }
}

/**
 * Parse 'let' as identifier in 'sloppy mode', and throws
 * in 'strict mode'  / 'module code'. We also avoid a lookahead on the
 * ASI restictions while checking this after parsing out the 'let' keyword
 *
 * @param parser Parser object
 * @param context context mask
 */
function parseLetAsIdentifier(parser: Parser, context: Context): ESTree.Identifier {
    if (context & Context.Strict) tolerant(parser, context, Errors.UnexpectedStrictReserved);
    const pos = getLocation(parser);
    const name = parser.tokenValue;
    nextToken(parser, context);
    if (parser.flags & Flags.NewLine) {
        if (parser.token === Token.LeftBracket) tolerant(parser, context, Errors.UnexpectedToken, 'let');
    }
    return finishNode(context, parser, pos, {
        type: 'Identifier',
        name
    });
}

/**
 * Parse either async function expression or identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Identifier)
 *
 * @param parser Parser object
 * @param context  context mask
 */
function parseAsyncFunctionOrIdentifier(parser: Parser, context: Context) {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
        parseAsyncFunctionOrAsyncGeneratorExpression(parser, context) :
        parseIdentifier(parser, context);
}

/**
 * Parses identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Identifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

export function parseIdentifier(parser: Parser, context: Context): ESTree.Identifier {
    const pos = getLocation(parser);
    const name = parser.tokenValue;
    nextToken(parser, context | Context.TaggedTemplate);
    const node: any = finishNode(context, parser, pos, {
        type: 'Identifier',
        name
    });

    if (context & Context.OptionsRawidentifiers) node.raw = parser.tokenRaw;
    return node;
}

/**
 * Parse regular expression literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals)
 *
 * @param Parser object
 * @param Context masks
 */

function parseRegularExpressionLiteral(parser: Parser, context: Context): ESTree.RegExpLiteral {
    const pos = getLocation(parser);
    const { tokenRegExp, tokenValue, tokenRaw } = parser;
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
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseLiteral(parser: Parser, context: Context): ESTree.Literal {
    const pos = getLocation(parser);
    const value = parser.tokenValue;
    if (context & Context.Strict && parser.flags & Flags.HasOctal) {
        tolerant(parser, context, Errors.StrictOctalLiteral);
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
 * Parses BigInt literal (stage 3 proposal)
 *
 * @see [Link](https://tc39.github.io/proposal-bigint/)
 *
 * @param parser  Parser object
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
    if (parser.flags & Flags.EscapedKeyword) tolerant(parser, context,  Errors.InvalidEscapedReservedWord);
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
 * @param Parser object
 * @param Context masks
 */

function parseThisExpression(parser: Parser, context: Context): ESTree.ThisExpression {
   if (parser.flags & Flags.EscapedKeyword) tolerant(parser, context,  Errors.InvalidEscapedReservedWord);
   const pos = getLocation(parser);
   nextToken(parser, context | Context.DisallowEscapedKeyword);
   return finishNode(context, parser, pos, {
        type: 'ThisExpression'
    });
}

/**
 * Parse identifier name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-IdentifierName)
 *
 * @param Parser object
 * @param Context masks
 * @param t token
 */

export function parseIdentifierName(parser: Parser, context: Context, t: Token): ESTree.Identifier {
    if (!(t & (Token.IsIdentifier | Token.Keyword))) tolerant(parser, context, Errors.UnexpectedKeyword, tokenDesc(t));
    return parseIdentifier(parser, context);
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser object
 * @param Context masks
 */

function parseIdentifierNameOrPrivateName(parser: Parser, context: Context): ESTree.PrivateName | ESTree.Identifier {
    if (!consume(parser, context, Token.Hash)) return parseIdentifierName(parser, context, parser.token);
    const { tokenValue } = parser;
    const pos = getLocation(parser);
    const name = tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'PrivateName',
        name
    });
}

/**
 * Parse array literal
 *
 * ArrayLiteral :
 *   [ Elisionopt ]
 *   [ ElementList ]
 *   [ ElementList , Elisionopt ]
 *
 * ElementList :
 *   Elisionopt AssignmentExpression
 *   Elisionopt ... AssignmentExpression
 *   ElementList , Elisionopt AssignmentExpression
 *   ElementList , Elisionopt SpreadElement
 *
 * Elision :
 *   ,
 *   Elision ,
 *
 * SpreadElement :
 *   ... AssignmentExpression
 *
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayLiteral)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseArrayLiteral(parser: Parser, context: Context): ESTree.ArrayExpression {

    const pos = getLocation(parser);

    expect(parser, context, Token.LeftBracket);

    const elements: (ESTree.Expression | null)[] = [];

    while (parser.token !== Token.RightBracket) {
        if (consume(parser, context, Token.Comma)) {
            elements.push(null);
        } else if (parser.token === Token.Ellipsis) {
            elements.push(parseSpreadElement(parser, context));
            if (parser.token !== Token.RightBracket) {
                parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
                expect(parser, context, Token.Comma);
            }
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
 * Parses cover parenthesized expression and arrow parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-parseCoverParenthesizedExpressionAndArrowParameterList)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseCoverParenthesizedExpressionAndArrowParameterList(parser: Parser, context: Context): any {
    expect(parser, context, Token.LeftParen);

    switch (parser.token) {

        // ')'
        case Token.RightParen:
            {
                expect(parser, context, Token.RightParen);
                parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
                if (parser.token === Token.Arrow) return [];
            }
            // '...'
        case Token.Ellipsis:
            {
                const expr = parseRestElement(parser, context);
                expect(parser, context, Token.RightParen);
                parser.flags = parser.flags & ~(Flags.AllowDestructuring | Flags.AllowBinding) | Flags.SimpleParameterList;
                if (parser.token !== Token.Arrow) tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
                return [expr];
            }

        default:
            {
                let state = CoverParenthesizedState.None;

                // Record the sequence position
                const sequencepos = getLocation(parser);

                if (hasBit(parser.token, Token.IsEvalOrArguments)) {
                    setPendingError(parser);
                    state |= CoverParenthesizedState.HasEvalOrArguments;
                } else if (hasBit(parser.token, Token.FutureReserved)) {
                    setPendingError(parser);
                    state |= CoverParenthesizedState.HasReservedWords;
                } else if (hasBit(parser.token, Token.IsAwait)) {
                    setPendingError(parser);
                    parser.flags |= Flags.HasAwait;
                }

                if (parser.token & Token.IsBindingPattern) state |= CoverParenthesizedState.HasBinding;

                let expr = restoreExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression);

                // Sequence expression
                if (parser.token === Token.Comma) {

                    state |= CoverParenthesizedState.SequenceExpression;

                    const expressions: ESTree.Expression[] = [expr];

                    while (consume(parser, context | Context.DisallowEscapedKeyword, Token.Comma)) {
                        parser.flags &= ~Flags.AllowDestructuring;
                        switch (parser.token) {

                            // '...'
                            case Token.Ellipsis:
                                {
                                    if (!(parser.flags & Flags.AllowBinding)) tolerant(parser, context, Errors.NotBindable);
                                    parser.flags |= Flags.SimpleParameterList;
                                    const restElement = parseRestElement(parser, context);
                                    expect(parser, context, Token.RightParen);
                                    if (parser.token !== Token.Arrow) tolerant(parser, context, Errors.ParamAfterRest);
                                    parser.flags &= ~Flags.AllowBinding;
                                    expressions.push(restElement);
                                    return expressions;
                                }

                                // ')'
                            case Token.RightParen:
                                {
                                    expect(parser, context, Token.RightParen);
                                    if (parser.token !== Token.Arrow) tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
                                    return expressions;
                                }

                            default:
                                {
                                    if (hasBit(parser.token, Token.IsEvalOrArguments)) {
                                        setPendingError(parser);
                                        state |= CoverParenthesizedState.HasEvalOrArguments;
                                    } else if (hasBit(parser.token, Token.FutureReserved)) {
                                        setPendingError(parser);
                                        state |= CoverParenthesizedState.HasReservedWords;
                                    } else if (hasBit(parser.token, Token.IsAwait)) {
                                        setPendingError(parser);
                                        parser.flags |= Flags.HasAwait;
                                    }
                                    if (parser.token & Token.IsBindingPattern) {
                                        state |= CoverParenthesizedState.HasBinding;
                                    }
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
                        if (context & Context.Strict) tolerant(parser, context, Errors.StrictEvalArguments);
                        parser.flags |= Flags.StrictEvalArguments;
                    } else if (state & CoverParenthesizedState.HasReservedWords) {
                        if (context & Context.Strict) tolerant(parser, context, Errors.UnexpectedStrictReserved);
                        parser.flags |= Flags.HasStrictReserved;
                    } else if (!(parser.flags & Flags.AllowBinding)) {
                        tolerant(parser, context, Errors.NotBindable);
                    }
                    if (parser.flags & Flags.HasYield) tolerant(parser, context, Errors.YieldInParameter);
                    if (parser.flags & Flags.HasAwait) tolerant(parser, context, Errors.AwaitInParameter);
                    parser.flags &= ~(Flags.HasAwait | Flags.HasYield);
                    if (state & CoverParenthesizedState.HasBinding) parser.flags |= Flags.SimpleParameterList;
                    parser.flags &= ~Flags.AllowBinding;
                    const params = (state & CoverParenthesizedState.SequenceExpression ? expr.expressions : [expr]);
                    return params;
                }

                parser.flags &= ~(Flags.HasAwait | Flags.HasYield | Flags.AllowBinding);

                if (!isValidSimpleAssignmentTarget(expr)) parser.flags &= ~Flags.AllowDestructuring;

                return expr;
            }
    }
}

/**
 * Parses function expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionExpression)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

export function parseFunctionExpression(parser: Parser, context: Context): ESTree.FunctionExpression {
    const pos = getLocation(parser);
    expect(parser, context, Token.FunctionKeyword);
    const isGenerator = consume(parser, context, Token.Multiply) ? ModifierState.Generator : ModifierState.None;
    let id: ESTree.Identifier | null = null;
    const { token } = parser;

    if (token & (Token.IsIdentifier | Token.Keyword)) {
        if (token & Token.IsEvalOrArguments) {
            if (context & Context.Strict) tolerant(parser, context, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictEvalArguments;
        }
        if (parser.token & Token.IsYield && isGenerator & ModifierState.Generator) {
            tolerant(parser, context, Errors.YieldBindingIdentifier);
        }
        id = parseBindingIdentifier(parser, context);
    }

    const { params, body } = swapContext(parser, context & ~(Context.Method | Context.AllowSuperProperty), isGenerator, parseFormalListAndBody);

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
 * @param parser  Parser object
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
        if (token & Token.IsEvalOrArguments) {
            if (context & Context.Strict || isAwait & ModifierState.Await) tolerant(parser, context, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictFunctionName;
        }
        if (token & Token.IsAwait) tolerant(parser, context, Errors.AwaitBindingIdentifier);
        if (parser.token & Token.IsYield && isGenerator & ModifierState.Generator) tolerant(parser, context, Errors.YieldBindingIdentifier);
        id = parseBindingIdentifier(parser, context);
    }
    const { params, body } = swapContext(parser, context & ~(Context.Method | Context.AllowSuperProperty), isGenerator | isAwait, parseFormalListAndBody);

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
 * Parse computed property names
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ComputedPropertyName)
 *
 * @param Parser object
 * @param Context masks
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
 * @param Parser object
 * @param Context masks
 */

export function parsePropertyName(parser: Parser, context: Context): ESTree.Expression {
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
 * Parse object spread properties
 *
 * @see [Link](https://tc39.github.io/proposal-object-rest-spread/#Spread)
 *
 * @param Parser object
 * @param Context masks
 */
function parseSpreadProperties(parser: Parser, context: Context): any {
    const pos = getLocation(parser);
    expect(parser, context, Token.Ellipsis);
    if (parser.token & Token.IsBindingPattern) parser.flags &= ~Flags.AllowDestructuring;
    const argument = parseAssignmentExpression(parser, context | Context.AllowIn);
    return finishNode(context, parser, pos, {
        type: 'SpreadElement',
        argument
    });
}

/**
 * Parses object literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ObjectLiteral)
 *
 * @param parser
 * @param context
 */

export function parseObjectLiteral(parser: Parser, context: Context): ESTree.ObjectExpression {
    const pos = getLocation(parser);
    expect(parser, context, Token.LeftBrace);
    const properties: ESTree.Property[] = [];

    while (parser.token !== Token.RightBrace) {
        properties.push(parser.token === Token.Ellipsis ?
            parseSpreadProperties(parser, context) :
            parsePropertyDefinition(parser, context));
        if (parser.token !== Token.RightBrace) expect(parser, context, Token.Comma);
    }

    if (parser.flags & Flags.HasDuplicateProto && parser.token !== Token.Assign) {
        tolerant(parser, context, Errors.DuplicateProto);
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
 * @param Parser object
 * @param Context masks
 */

function parsePropertyDefinition(parser: Parser, context: Context): ESTree.Property {
    const pos = getLocation(parser);
    let value;
    let state = ObjectState.None;
    const isEscaped = !!(parser.flags & Flags.EscapedKeyword);
    if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;

    let t = parser.token;

    if (parser.token === Token.LeftBracket) state |= ObjectState.Computed;

    let key = parsePropertyName(parser, context);

    if (!(parser.token & Token.IsEndMarker)) {

        if (!(state & ObjectState.Generator) && t & Token.IsAsync && !(parser.flags & Flags.NewLine)) {
            t = parser.token;
            if (isEscaped) tolerant(parser, context, Errors.InvalidEscapedReservedWord);
            state |= ObjectState.Async;
            if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;
            key = parsePropertyName(parser, context);
        } else if ((t === Token.GetKeyword || t === Token.SetKeyword)) {
            if (isEscaped) tolerant(parser, context, Errors.InvalidEscapedReservedWord);
            if (state & ObjectState.Generator) {
                tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
            }
            state |= t === Token.GetKeyword ? ObjectState.Getter : ObjectState.Setter;
            key = parsePropertyName(parser, context);
        }
    }
    // method
    if (parser.token === Token.LeftParen) {
        if (!(state & (ObjectState.Getter | ObjectState.Setter))) {
            state |= ObjectState.Method;
            parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
        }
        value = parseMethodDeclaration(parser, context | Context.Method, state);
    } else {

        if (state & (ObjectState.Generator | ObjectState.Async)) {
            tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
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

            if (parser.token & Token.IsAwait) parser.flags |= Flags.HasAwait;
            value = restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression);
        } else {

            if (state & ObjectState.Async || !isValidIdentifier(context, t)) {
                tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(t));
            } else if (context & (Context.Strict | Context.Yield) && t & Token.IsYield) {
                setPendingError(parser);
                parser.flags |= Flags.HasYield;
            }

            state |= ObjectState.Shorthand;

            if (consume(parser, context, Token.Assign)) {
                if (context & (Context.Strict | Context.Yield) && parser.token & Token.IsYield) {
                    setPendingError(parser);
                    parser.flags |= Flags.HasYield;
                } else if (context & (Context.Strict | Context.Async) && parser.token & Token.IsAwait) {
                    setPendingError(parser);
                    parser.flags |= Flags.HasAwait;
                }

                value = parseAssignmentPattern(parser, context | Context.AllowIn, key, pos);
                parser.pendingExpressionError = {
                    error: Errors.InvalidLHSInAssignment,
                    line: parser.startLine,
                    column: parser.startColumn,
                    index: parser.startIndex,
                };

            } else {
                if (t & Token.IsAwait) {
                    if (context & Context.Async) tolerant(parser, context, Errors.UnexpectedReserved);
                    setPendingError(parser);
                    parser.flags |= Flags.HasAwait;
                }
                value = key;
            }
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
 * @param Parser object
 * @param Context masks
 */

function parseMethodDeclaration(parser: Parser, context: Context, state: ObjectState): ESTree.FunctionExpression {
    const pos = getLocation(parser);
    const isGenerator = state & ObjectState.Generator ? ModifierState.Generator : ModifierState.None;
    const isAsync = state & ObjectState.Async ? ModifierState.Await : ModifierState.None;
    const { params, body } = swapContext(parser, context, isGenerator | isAsync, parseFormalListAndBody, state);

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
 * @param Parser object
 * @param Context masks
 */

function parseArrowFunction(parser: Parser, context: Context, pos: Location, params: string[]): ESTree.ArrowFunctionExpression {
    parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
    if (parser.flags & Flags.NewLine) tolerant(parser, context, Errors.LineBreakAfterArrow);
    expect(parser, context, Token.Arrow);
    return parseArrowBody(parser, context & ~Context.Async, params, pos, ModifierState.None);
}

/**
 * Parse async arrow function
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param Parser object
 * @param Context masks
 */

function parseAsyncArrowFunction(parser: Parser, context: Context, state: ModifierState, pos: Location, params: any): ESTree.ArrowFunctionExpression {
    parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
    if (parser.flags & Flags.NewLine) tolerant(parser, context, Errors.LineBreakAfterAsync);
    expect(parser, context, Token.Arrow);
    return parseArrowBody(parser, context | Context.Async, params, pos, state);
}

/**
 * Shared helper function for both async arrow and arrows
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrowFunction)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param Parser object
 * @param Context masks
 */

// https://tc39.github.io/ecma262/#prod-AsyncArrowFunction

function parseArrowBody(parser: Parser, context: Context, params: any, pos: Location, state: ModifierState): ESTree.ArrowFunctionExpression {
    parser.pendingExpressionError = null;
    for (const i in params) reinterpret(parser, context | Context.InParameter, params[i]);
    const expression = parser.token !== Token.LeftBrace;
    const body = expression ? parseExpressionCoverGrammar(parser, context & ~(Context.Yield | Context.InParameter), parseAssignmentExpression) :
        swapContext(parser, context & ~Context.Yield | Context.InFunctionBody, state, parseFunctionBody);
    return finishNode(context, parser, pos, {
        type: 'ArrowFunctionExpression',
        body,
        params,
        id: null,
        async: !!(state & ModifierState.Await),
        generator: false,
        expression
    });
}

/**
 * Parses formal parameters and function body.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameters)
 *
 * @param Parser object
 * @param Context masks
 */

export function parseFormalListAndBody(parser: Parser, context: Context, state: ObjectState) {
    const paramList = parseFormalParameters(parser, context | Context.InParameter, state);
    const args = paramList.args;
    const params = paramList.params;
    const body = parseFunctionBody(parser, context | Context.InFunctionBody, args);
    return { params, body };
}

/**
 * Parse funciton body
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionBody)
 *
 * @param Parser object
 * @param Context masks
 */

export function parseFunctionBody(parser: Parser, context: Context, params: any): ESTree.BlockStatement {
    // Note! The 'params' has an 'any' type now because it's really shouldn't be there. This should have been
    // on the parser object instead. So for now the 'params' arg are only used within the
    // 'parseFormalListAndBody' method, and not within the arrow function body.
    const pos = getLocation(parser);
    expect(parser, context | Context.DisallowEscapedKeyword, Token.LeftBrace);

    const body: ESTree.Statement[] = [];
    while (parser.token === Token.StringLiteral) {
        const { tokenRaw, tokenValue} = parser;
        body.push(parseDirective(parser, context));
        if (tokenRaw.length === /* length of prologue*/ 12 && tokenValue === 'use strict') {
            if (parser.flags & Flags.SimpleParameterList) {
                tolerant(parser, context, Errors.IllegalUseStrict);
            } else if (parser.flags & (Flags.HasStrictReserved | Flags.StrictFunctionName)) {
                tolerant(parser, context, Errors.UnexpectedStrictReserved);
            } else if (parser.flags & Flags.StrictEvalArguments) {
                tolerant(parser, context, Errors.StrictEvalArguments);
            }
            context |= Context.Strict;
        }
    }

    if (context & Context.Strict) {
        validateParams(parser, context, params);
    }

    const { labelSet } = parser;

    parser.labelSet = {};

    const savedFlags = parser.flags;

    parser.flags = parser.flags & ~(Flags.StrictFunctionName | Flags.StrictEvalArguments | Flags.InSwitchStatement | Flags.InIterationStatement) | Flags.AllowDestructuring;

    while (parser.token !== Token.RightBrace) {
        body.push(parseStatementListItem(parser, context));
    }

    if (savedFlags & Flags.InIterationStatement) parser.flags |= Flags.InIterationStatement;
    if (savedFlags & Flags.InSwitchStatement) parser.flags |= Flags.InSwitchStatement;

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
 * @param Parser object
 * @param Context masks
 * @param {state} Optional objectstate. Default to none
 */

export function parseFormalParameters(
    parser: Parser,
    context: Context,
    state: ObjectState
): { params: ESTree.Identifier[]; args: string[]; } {

    // FormalParameterList :
    //   [empty]
    //   FunctionRestParameter
    //   FormalsList
    //   FormalsList , FunctionRestParameter
    //
    // FunctionRestParameter :
    //   ... BindingIdentifier
    //
    // FormalsList :
    //   FormalParameter
    //   FormalsList , FormalParameter
    //
    // FormalParameter :
    //   BindingElement
    //
    // BindingElement :
    //   SingleNameBinding
    //   BindingPattern Initializeropt

    expect(parser, context, Token.LeftParen);

    parser.flags &= ~(Flags.SimpleParameterList | Flags.HasStrictReserved);

    const args: string[] = [];
    const params: ESTree.ArrayPattern | ESTree.RestElement | ESTree.ObjectPattern | ESTree.Identifier[] = [];

    while (parser.token !== Token.RightParen) {
        if (parser.token === Token.Ellipsis) {
            if (state & ObjectState.Setter) tolerant(parser, context, Errors.BadSetterRestParameter);
            parser.flags |= Flags.SimpleParameterList;
            params.push(parseRestElement(parser, context, args));
            break;
        }

        params.push(parseFormalParameterList(parser, context, args));
        if (!consume(parser, context, Token.Comma)) break;
        if (parser.token === Token.RightParen) break;
    }

    if (state & ObjectState.Setter && params.length !== 1) {
        tolerant(parser, context, Errors.BadSetterArity);
    }

    if (state & ObjectState.Getter && params.length > 0) {
        tolerant(parser, context, Errors.BadGetterArity);
    }

    expect(parser, context, Token.RightParen);

    return { params, args };
}

/**
 * Parse formal parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameterList)
 *
 * @param Parser object
 * @param Context masks
 */

export function parseFormalParameterList(parser: Parser, context: Context, args: string[]): any {

    const pos = getLocation(parser);

    if (parser.token & (Token.IsIdentifier | Token.Keyword)) {
        if (hasBit(parser.token, Token.FutureReserved)) {
            if (context & Context.Strict) tolerant(parser, context, Errors.UnexpectedStrictReserved);
            parser.flags |= Flags.StrictFunctionName;
        }
        if (hasBit(parser.token, Token.IsEvalOrArguments)) {
            if (context & Context.Strict) tolerant(parser, context, Errors.StrictEvalArguments);
            parser.flags |= Flags.StrictEvalArguments;
        }
    } else {
        parser.flags |= Flags.SimpleParameterList;
    }

    const left: any = parseBindingIdentifierOrPattern(parser, context, args);
    if (!consume(parser, context, Token.Assign)) return left;

    if (parser.token & (Token.IsYield | Token.IsAwait) && context & (Context.Yield | Context.Async)) {
        tolerant(parser, context, parser.token & Token.IsAwait ? Errors.AwaitInParameter : Errors.YieldInParameter);
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
 * @param Parser object
 * @param Context masks
 */

function parseClassExpression(parser: Parser, context: Context): ESTree.ClassExpression {
    const pos = getLocation(parser);
    expect(parser, context | Context.DisallowEscapedKeyword, Token.ClassKeyword);
    const { token } = parser;
    let state = ObjectState.None;
    if (context & Context.Async && token & Token.IsAwait) tolerant(parser, context, Errors.AwaitBindingIdentifier);
    const id = (token !== Token.LeftBrace && token !== Token.ExtendsKeyword) ?
        parseBindingIdentifier(parser, context | Context.Strict) :
        null;
    let superClass: ESTree.Expression | null = null;

    if (consume(parser, context, Token.ExtendsKeyword)) {
        superClass = parseLeftHandSideExpression(parser, context | Context.Strict, pos);
        state |= ObjectState.Heritage;
    }
    return finishNode(context, parser, pos, {
        type: 'ClassExpression',
        id,
        superClass,
        body: parseClassBodyAndElementList(parser, context | Context.Strict, state)
    });
}

/**
 * Parse class body and element list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElementList)
 *
 *
 * @param Parser object
 * @param Context masks
 */

export function parseClassBodyAndElementList(parser: Parser, context: Context, state: ObjectState): ESTree.ClassBody {
    const pos = getLocation(parser);
    expect(parser, context, Token.LeftBrace);
    const body: (ESTree.MethodDefinition | ESTree.FieldDefinition)[] = [];
    while (parser.token !== Token.RightBrace) {
        if (!consume(parser, context, Token.Semicolon)) {
            body.push(parseClassElement(parser, context, state));
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
 * @param Parser object
 * @param Context masks
 */

export function parseClassElement(parser: Parser, context: Context, state: ObjectState): ESTree.MethodDefinition | ESTree.FieldDefinition {

    const pos = getLocation(parser);

    if (context & Context.OptionsNext && parser.token === Token.Hash) {
        return parsePrivateFields(parser, context, pos);
    }

    let { tokenValue, token } = parser;
    const isEscaped = !!(parser.flags & Flags.EscapedKeyword);
    if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;

    if (parser.token === Token.LeftBracket) state |= ObjectState.Computed;

    if (parser.tokenValue === 'constructor') {
        if (state & ObjectState.Generator) tolerant(parser, context, Errors.ConstructorIsGenerator);
        state |= ObjectState.Constructor;
    }

    let key = parsePropertyName(parser, context);

    if (context & Context.OptionsNext && isInstanceField(parser)) {
        return parseFieldDefinition(parser, context, key, state, pos);
    }

    let value;

    if (!(parser.token & Token.IsEndMarker)) {

        if (token === Token.StaticKeyword) {
            token = parser.token;
            if (consume(parser, context, Token.Multiply)) state |= ObjectState.Generator;
            tokenValue = parser.tokenValue;
            if (isEscaped) tolerant(parser, context, Errors.InvalidEscapedReservedWord);
            if (parser.token === Token.LeftBracket) state |= ObjectState.Computed;
            if (parser.tokenValue === 'prototype') tolerant(parser, context, Errors.StaticPrototype);

            state |= ObjectState.Static;

            key = parsePropertyName(parser, context);
            if (context & Context.OptionsNext && isInstanceField(parser)) {
                if (tokenValue === 'constructor') tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
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
                tolerant(parser, context, Errors.StaticPrototype);
            } else if (!(state & ObjectState.Static) && tokenValue === 'constructor') {
                tolerant(parser, context, Errors.ConstructorSpecialMethod);
            }
        }
    }

    if (parser.token === Token.LeftParen) {
        if (!(state & (ObjectState.Getter | ObjectState.Setter))) state |= ObjectState.Method;
        if (state & ObjectState.Heritage && state & ObjectState.Constructor) {
            context |= Context.AllowSuperProperty;
        }
        value = parseMethodDeclaration(parser, context | Context.Method, state);
    } else {
        // Class fields - Stage 3 proposal
        if (context & Context.OptionsNext) return parseFieldDefinition(parser, context, key, state, pos);
        tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(token));
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
 * @param Parser object
 * @param Context masks
 */

function parseFieldDefinition(parser: Parser, context: Context, key: any, state: ObjectState, pos: Location): ESTree.FieldDefinition {
    if (state & ObjectState.Constructor) tolerant(parser, context, Errors.Unexpected);
    let value: ESTree.Expression | null = null;

    if (state & (ObjectState.Async | ObjectState.Generator)) tolerant(parser, context, Errors.Unexpected);
    if (consume(parser, context, Token.Assign)) {
        if (parser.token & Token.IsEvalOrArguments) tolerant(parser, context, Errors.StrictEvalArguments);
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
 * @param parser Parser object
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
 * @param parser Parser object
 * @param context Context masks
 */
function parsePrivateFields(parser: Parser, context: Context, pos: Location): ESTree.FieldDefinition | ESTree.MethodDefinition {
    expect(parser, context | Context.InClass, Token.Hash);
    if (parser.tokenValue === 'constructor') tolerant(parser, context, Errors.PrivateFieldConstructor);
    const key = parsePrivateName(parser, context, pos);
    if (parser.token === Token.LeftParen) return parsePrivateMethod(parser, context, key, pos);
    let value: any = null;
    if (consume(parser, context, Token.Assign)) {
        if (parser.token & Token.IsEvalOrArguments) tolerant(parser, context, Errors.StrictEvalArguments);
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
    parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
    return parseMethodDefinition(parser, context, key, value, ObjectState.Method, pos);
}

/**
 * Parse import expressions
 *
 * @param Parser object
 * @param Context masks
 */

function parseImportExpressions(parser: Parser, context: Context): ESTree.Expression {
    if (!(context & Context.OptionsNext)) tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
    const pos = getLocation(parser);
    const id = parseIdentifier(parser, context);

    // Import.meta - Stage 3 proposal
    if (context & Context.OptionsNext && consume(parser, context, Token.Period)) {
        if (context & Context.Module && parser.tokenValue === 'meta') {
            return parseMetaProperty(parser, context, id, pos);
        }

        tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
    }

    let expr: ESTree.ImportExpression = finishNode(context, parser, pos, {
        type: 'Import'
    });

    expect(parser, context, Token.LeftParen);
    const args = parseExpressionCoverGrammar(parser, context | Context.AllowIn, parseAssignmentExpression);
    expect(parser, context, Token.RightParen);
    expr = finishNode(context, parser, pos, {
        type: 'CallExpression',
        callee: expr,
        arguments: [args]
    });
    return expr;
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser object
 * @param Context masks
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
 * @param Parser object
 * @param Context masks
 */

function parseNewExpression(parser: Parser, context: Context): ESTree.NewExpression | ESTree.MetaProperty {

    const pos = getLocation(parser);
    const id = parseIdentifier(parser, context);

    if (consume(parser, context, Token.Period)) {
        if (parser.tokenValue !== 'target' ||
            !(context & (Context.InParameter | Context.InFunctionBody))) tolerant(parser, context, Errors.MetaNotInFunctionBody);
        return parseMetaProperty(parser, context, id as ESTree.Identifier, pos);
    }

    return finishNode(context, parser, pos, {
        type: 'NewExpression',
        callee: parseImportOrMemberExpression(parser, context, pos),
        arguments: parser.token === Token.LeftParen ? parseArgumentList(parser, context) : []
    });
}

/**
 * Parse either import or member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param Parser object
 * @param Context masks
 */

function parseImportOrMemberExpression(parser: Parser, context: Context, pos: Location): ESTree.Expression {
    const { token } = parser;
    if (context & Context.OptionsNext && token === Token.ImportKeyword) {
        // Invalid: '"new import(x)"'
        if (lookahead(parser, context, nextTokenIsLeftParen)) tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(token));
        // Fixes cases like ''new import.meta','
        return parseImportExpressions(parser, context);
    }
    return parseMemberExpression(parser, context, pos);
}

/**
 * Parse super property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SuperProperty)
 *
 * @param Parser object
 * @param Context masks
 */

function parseSuperProperty(parser: Parser, context: Context): ESTree.Super {
    // SuperProperty[Yield, Await]:
    //  super[Expression[+In, ?Yield, ?Await]]
    //  super.IdentifierName
    const pos = getLocation(parser);
    expect(parser, context, Token.SuperKeyword);

    switch (parser.token) {
        case Token.LeftParen:
            // The super property has to be within a class constructor
            if (!(context & Context.AllowSuperProperty)) tolerant(parser, context, Errors.BadSuperCall);
            break;
        case Token.LeftBracket:
        case Token.Period:
            if (!(context & Context.Method)) tolerant(parser, context, Errors.UnexpectedSuper);
            break;
        default:
            tolerant(parser, context, Errors.LoneSuper);
    }

    return finishNode(context, parser, pos, {
        type: 'Super'
    });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser object
 * @param Context masks
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
 * @param Parser object
 * @param Context masks
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
 * @param Parser object
 * @param Context masks
 */

function parseTemplate(
    parser: Parser,
    context: Context,
    expressions: ESTree.Expression[] = [],
    quasis: ESTree.TemplateElement[] = []
): ESTree.TemplateLiteral {
    const pos = getLocation(parser);
    const { tokenValue, tokenRaw } = parser;

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
 * @param Parser object
 * @param Context masks
 */

function parseTemplateSpans(parser: Parser, context: Context, pos: Location = getLocation(parser)): ESTree.TemplateElement {
    const { tokenValue, tokenRaw } = parser;

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