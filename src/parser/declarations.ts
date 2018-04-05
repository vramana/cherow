import * as ESTree from '../estree';
import { Token, tokenDesc } from '../token';
import { Errors, report } from '../errors';
import { parseBindingIdentifierOrPattern, parseBindingIdentifier } from './pattern';
import { parseAssignmentExpression, parseFormalListAndBody } from './expressions';
import { Parser } from './parser';
import {
    parseClassBodyAndElementList,
    parseLeftHandSideExpression
} from './expressions';
import {
    Flags,
    hasBit,
    expect,
    Context,
    finishNode,
    consume,
    getLocation,
    ModifierState,
    swapContext,
    parseExpressionCoverGrammar,
    ObjectState
} from '../utilities';

// Declarations

/**
 * Parses class declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseClassDeclaration(parser: Parser, context: Context): ESTree.ClassDeclaration {
    const pos = getLocation(parser);
    expect(parser, context, Token.ClassKeyword);
    const { token } = parser;
    let id: ESTree.Identifier | null = null;
    if (token !== Token.LeftBrace && token !== Token.ExtendsKeyword) {
        id = parseFunctionOrClassDeclarationName(parser, context | Context.Strict);
        // Class statements must have a bound name
    } else if (!(context & Context.RequireIdentifier)) report(parser, Errors.UnexpectedToken, tokenDesc(token));
    let superClass: ESTree.Expression | null = null;
    let state = ObjectState.None;
    if (consume(parser, context, Token.ExtendsKeyword)) {
        superClass = parseLeftHandSideExpression(parser, context | Context.Strict, pos);
        state |= ObjectState.Heritage;
    }
    parseLeftHandSideExpression(parser, context | Context.Strict, pos) :
        null;
    return finishNode(context, parser, pos, {
        type: 'ClassDeclaration',
        id,
        superClass,
        body: parseClassBodyAndElementList(parser, context & ~Context.RequireIdentifier | Context.Strict, state)
    });
}

/**
 * Parses function declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseFunctionDeclaration(parser: Parser, context: Context): ESTree.FunctionDeclaration {
    const pos = getLocation(parser);
    expect(parser, context, Token.FunctionKeyword);
    const isGenerator = consume(parser, context, Token.Multiply) ? ModifierState.Generator : ModifierState.None;
    if (isGenerator & ModifierState.Generator && context & Context.AllowSingleStatement) report(parser, Errors.GeneratorInSingleStatementContext);
    const id = parseFunctionOrClassDeclarationName(parser, context);
    const { params,  body } = swapContext(parser, context & ~(Context.AllowSingleStatement | Context.Method | Context.AllowSuperProperty | Context.RequireIdentifier), isGenerator, parseFormalListAndBody);
    return finishNode(context, parser, pos, {
        type: 'FunctionDeclaration',
        params,
        body,
        async: false,
        generator: !!(isGenerator & ModifierState.Generator),
        expression: false,
        id
    });
}

/**
 * Parses async function or async generator declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser: Parser, context: Context): ESTree.FunctionDeclaration {
    const pos = getLocation(parser);
    expect(parser, context, Token.AsyncKeyword);
    expect(parser, context, Token.FunctionKeyword);
    const isGenerator = consume(parser, context, Token.Multiply) ? ModifierState.Generator : ModifierState.None;
    const id = parseFunctionOrClassDeclarationName(parser, context);
    const { params, body } = swapContext(parser, context & ~(Context.AllowSingleStatement | Context.Method | Context.RequireIdentifier), isGenerator | ModifierState.Await, parseFormalListAndBody);

    return finishNode(context, parser, pos, {
        type: 'FunctionDeclaration',
        params,
        body,
        async: true,
        generator: !!(isGenerator & ModifierState.Generator),
        expression: false,
        id
    });
}

/**
 * Shared helper function for "parseFunctionDeclaration" and "parseAsyncFunctionOrAsyncGeneratorDeclaration"
 * so we can re-use the same logic when parsing out the function name, or throw an
 * error if the 'RequireIdentifier' mask is not set
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseFunctionOrClassDeclarationName(parser: Parser, context: Context): ESTree.Identifier | null {
    const { token } = parser;
    let id: ESTree.Identifier | undefined | null = null;
    if (context & Context.Yield && token & Token.IsYield) report(parser, Errors.YieldBindingIdentifier);
    if (context & Context.Async && token & Token.IsAwait) report(parser, Errors.AwaitBindingIdentifier);
    if (hasBit(token, Token.IsEvalOrArguments)) {
        if (context & Context.Strict) report(parser, Errors.StrictEvalArguments);
        parser.flags |= Flags.StrictEvalArguments;
    }
    if (token !== Token.LeftParen) {

        id = parseBindingIdentifier(parser, context);
    }
    else if (!(context & Context.RequireIdentifier)) report(parser, Errors.UnNamedFunctionDecl);
    return id;
}

/**
 * Parses variable declaration.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

function parseVariableDeclaration(parser: Parser, context: Context, isConst: boolean): ESTree.VariableDeclarator {

    const pos = getLocation(parser);
    const isBindingPattern = (parser.token & Token.IsBindingPattern) !== 0;
    const id = parseBindingIdentifierOrPattern(parser, context);

    let init: ESTree.Expression | null = null;

    if (consume(parser, context, Token.Assign)) {
        init = parseExpressionCoverGrammar(parser, context & ~(Context.BlockScope | Context.ForStatement), parseAssignmentExpression);

        if (parser.token & Token.IsInOrOf && (context & Context.ForStatement || isBindingPattern)) {
            if (context & (Context.BlockScope | Context.Strict) || parser.token === Token.OfKeyword) {
                report(parser, Errors.ForInOfLoopInitializer, tokenDesc(parser.token));
            }
        }
        // Initializers are required for 'const' and binding patterns
    } else if (!(parser.token & Token.IsInOrOf) && (isConst || isBindingPattern)) {
        report(parser, Errors.DeclarationMissingInitializer, isConst ? 'const' : 'destructuring');
    }
    return finishNode(context, parser, pos, {
        type: 'VariableDeclarator',
        init,
        id
    });
}

/**
 * Parses variable declaration list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclarationList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseVariableDeclarationList(parser: Parser, context: Context, isConst: boolean): ESTree.VariableDeclarator[] {
    const list: ESTree.VariableDeclarator[] = [parseVariableDeclaration(parser, context, isConst)];
    while (consume(parser, context, Token.Comma)) {
        list.push(parseVariableDeclaration(parser, context, isConst));
    }
    if (context & Context.ForStatement && parser.token & Token.IsInOrOf && list.length !== 1) {
        report(parser, Errors.ForInOfLoopMultiBindings, tokenDesc(parser.token));
    }
    return list;
}