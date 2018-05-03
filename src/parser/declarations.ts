import * as ESTree from '../estree';
import { Token, tokenDesc } from '../token';
import { Errors, tolerant } from '../errors';
import { parseBindingIdentifierOrPattern, parseBindingIdentifier } from './pattern';
import { parseAssignmentExpression, parseFormalListAndBody } from './expressions';
import { Parser, Location } from '../types';
import { parseClassBodyAndElementList,  parseLeftHandSideExpression, parseDecoratorList } from './expressions';
import {
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
    let decorators: ESTree.Decorator[] = [];
    if (context & Context.OptionsExperimental) {
        decorators = parseDecoratorList(parser, context)
    }
    expect(parser, context | Context.DisallowEscapedKeyword, Token.ClassKeyword);
    const id = (context & Context.RequireIdentifier && (parser.token !== Token.Identifier))
        ? null :
        parseBindingIdentifier(parser, context | Context.Strict | Context.DisallowEscapedKeyword);
    let state = ObjectState.None;
    let superClass: ESTree.Expression | null = null;
    if (consume(parser, context, Token.ExtendsKeyword)) {
        superClass = parseLeftHandSideExpression(parser, context | Context.Strict, pos);
        state |= ObjectState.Heritage;
    }
    
    const body = parseClassBodyAndElementList(parser, context & ~Context.RequireIdentifier | Context.Strict | Context.InClass, state);

    return finishNode(context, parser, pos, context & Context.OptionsExperimental ? {
        type: 'ClassDeclaration',
        id,
        superClass,
        body,
        decorators 
    } : {
        type: 'ClassDeclaration',
        id,
        superClass,
        body
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
        if (context & Context.AllowSingleStatement && !(context & Context.InFunctionBody)) {
            tolerant(parser, context, Errors.GeneratorInSingleStatementContext);
        }

        isGenerator = ModifierState.Generator;
    }
    return parseFunctionDeclarationBody(parser, context, isGenerator, pos);
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
    const { params, body } = swapContext(parser, context & ~(Context.Method | Context.AllowSuperProperty | Context.RequireIdentifier), state, parseFormalListAndBody);
    return finishNode(context, parser, pos, {
        type: 'FunctionDeclaration',
        params,
        body,
        async: !!(state & ModifierState.Await),
        generator: !!(state & ModifierState.Generator),
        expression: false,
        id,
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
    const isGenerator = consume(parser, context, Token.Multiply) ? ModifierState.Generator : ModifierState.None;
    return parseFunctionDeclarationBody(parser, context, isGenerator | isAwait, pos);
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
    if (context & Context.Yield && token & Token.IsYield) tolerant(parser, context, Errors.YieldBindingIdentifier);
    if (context & Context.Async && token & Token.IsAwait) tolerant(parser, context, Errors.AwaitBindingIdentifier);
    if (token !== Token.LeftParen) {
        id = parseBindingIdentifier(parser, context);
    // Unnamed functions are forbidden in statement context.
    } else if (!(context & Context.RequireIdentifier)) tolerant(parser, context, Errors.UnNamedFunctionDecl);
    return id as ESTree.Identifier;
}

/**
 * VariableDeclaration :
 *   BindingIdentifier Initializeropt
 *   BindingPattern Initializer
 *
 * VariableDeclarationNoIn :
 *   BindingIdentifier InitializerNoInopt
 *   BindingPattern InitializerNoIn
 *
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

    if (consume(parser, context | Context.DisallowEscapedKeyword, Token.Assign)) {
        init = parseExpressionCoverGrammar(parser, context & ~(Context.BlockScope | Context.ForStatement), parseAssignmentExpression);
        if (parser.token & Token.IsInOrOf && (context & Context.ForStatement || isBindingPattern)) {
            tolerant(parser, context, Errors.ForInOfLoopInitializer, tokenDesc(parser.token));
        }
        // Note: Initializers are required for 'const' and binding patterns
    } else if (!(parser.token & Token.IsInOrOf) && (isConst || isBindingPattern)) {
        tolerant(parser, context, Errors.DeclarationMissingInitializer, isConst ? 'const' : 'destructuring');
    }
    return finishNode(context, parser, pos, {
        type: 'VariableDeclarator',
        init,
        id,
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
    while (consume(parser, context, Token.Comma)) list.push(parseVariableDeclaration(parser, context, isConst));
    if (context & Context.ForStatement && parser.token & Token.IsInOrOf && list.length !== 1) {
        tolerant(parser, context, Errors.ForInOfLoopMultiBindings, tokenDesc(parser.token));
    }
    return list;
}
