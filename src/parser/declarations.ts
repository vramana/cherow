import * as ESTree from '../estree';
import { Token, tokenDesc, } from '../token';
import { Errors, tolerant } from '../errors';
import { parseBindingIdentifierOrPattern, parseBindingIdentifier } from './pattern';
import { parseAssignmentExpression, parseFormalListAndBody } from './expressions';
import { Parser, Location } from '../types';
import { parseClassBodyAndElementList,  parseLeftHandSideExpression } from './expressions';
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
    ObjectState,
    parseExpressionCoverGrammar
} from '../utilities';

// Declarations

/**
 * Parses class declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseClassDeclaration(parser: Parser, context: Context): ESTree.ClassDeclaration {
    const pos = getLocation(parser);
    expect(parser, context, Token.ClassKeyword);
    const { token } = parser;
    const id = (context & Context.RequireIdentifier && (parser.token !== Token.Identifier)) ? null : parseBindingIdentifier(parser, context | Context.Strict);
    let state = ObjectState.None;
    let superClass: ESTree.Expression | null = null;
    if (consume(parser, context, Token.ExtendsKeyword)) {
        superClass = parseLeftHandSideExpression(parser, context | Context.Strict, pos);
        state |= ObjectState.Heritage;
    }

    return finishNode(context, parser, pos, {
        type: 'ClassDeclaration',
        id,
        superClass,
        body: parseClassBodyAndElementList(parser, context & ~Context.RequireIdentifier | Context.Strict | Context.InClass, state)
    });
}

/**
 * Parses function declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseFunctionDeclaration(parser: Parser, context: Context): ESTree.FunctionDeclaration {
    const pos = getLocation(parser);
    expect(parser, context, Token.FunctionKeyword);
    let isGenerator = ModifierState.None;
    if (consume(parser, context, Token.Multiply)) {
        if (!(context & Context.InFunctionBody) && context & Context.AllowSingleStatement) {
            tolerant(parser, context, Errors.GeneratorInSingleStatementContext);
        }

        isGenerator = ModifierState.Generator;
    }
    return parseFunctionDeclarationBody(parser, context & ~(Context.AllowSingleStatement | Context.Method | Context.AllowSuperProperty), isGenerator, pos);
}

/**
 * Parses out a function declartion body
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser Parser object
 * @param context Context mask
 * @param state Modifier state
 * @param pos Current location
 */
function parseFunctionDeclarationBody(parser: Parser, context: Context, state: ModifierState, pos: Location): ESTree.FunctionDeclaration {
    const id = parseFunctionDeclarationName(parser, context);
    const { params, body } = swapContext(parser, context & ~Context.RequireIdentifier, state, parseFormalListAndBody);
    return finishNode(context, parser, pos, {
        type: 'FunctionDeclaration',
        params,
        body,
        async: !!(state & ModifierState.Await),
        generator: !!(state & ModifierState.Generator),
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
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser: Parser, context: Context): ESTree.FunctionDeclaration {
    const pos = getLocation(parser);
    expect(parser, context, Token.AsyncKeyword);
    expect(parser, context, Token.FunctionKeyword);
    const isAwait = ModifierState.Await;
    let isGenerator = ModifierState.None;
    if (consume(parser, context, Token.Multiply)) isGenerator = ModifierState.Generator;
    return parseFunctionDeclarationBody(parser, context & ~(Context.AllowSingleStatement | Context.Method | Context.AllowSuperProperty), isGenerator | isAwait, pos);
}

/**
 * Shared helper function for "parseFunctionDeclaration" and "parseAsyncFunctionOrAsyncGeneratorDeclaration"
 * so we can re-use the same logic when parsing out the function name, or throw an
 * error if the 'RequireIdentifier' mask is not set
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseFunctionDeclarationName(parser: Parser, context: Context): ESTree.Identifier | null {
    const { token } = parser;
    let id: ESTree.Identifier | undefined | null = null;
    if (hasBit(token, Token.IsEvalOrArguments)) {
        if (context & Context.Strict) tolerant(parser, context, Errors.StrictEvalArguments);
        parser.flags |= Flags.StrictEvalArguments;
    }
    if (context & Context.Yield && token & Token.IsYield) tolerant(parser, context, Errors.YieldBindingIdentifier);
    if (context & Context.Async && token & Token.IsAwait) tolerant(parser, context, Errors.AwaitBindingIdentifier);

    if (token !== Token.LeftParen) {
        id = parseBindingIdentifier(parser, context);
    } else if (!(context & Context.RequireIdentifier)) tolerant(parser, context, Errors.UnNamedFunctionDecl);
    return id as ESTree.Identifier;
}

/**
 * Parses variable declaration.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclaration)
 *
 * @param parser  Parser object
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
            tolerant(parser, context, context & (Context.BlockScope | Context.Strict) ?
                Errors.ForInOfLoopInitializer :
                Errors.ForInOfLoopInitializer, tokenDesc(parser.token));
        }
        // Initializers are required for 'const' and binding patterns
    } else if (!(parser.token & Token.IsInOrOf) && (isConst || isBindingPattern)) {
        tolerant(parser, context, Errors.DeclarationMissingInitializer, isConst ? 'const' : 'destructuring');
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
 * @param parser  Parser object
 * @param context Context masks
 */

export function parseVariableDeclarationList(parser: Parser, context: Context, isConst: boolean): ESTree.VariableDeclarator[] {
    const list: ESTree.VariableDeclarator[] = [parseVariableDeclaration(parser, context, isConst)];
    while (consume(parser, context, Token.Comma)) {
        list.push(parseVariableDeclaration(parser, context, isConst));
    }
    if (context & Context.ForStatement && parser.token & Token.IsInOrOf && list.length !== 1) {
        tolerant(parser, context, Errors.ForInOfLoopMultiBindings, tokenDesc(parser.token));
    }
    return list;
}