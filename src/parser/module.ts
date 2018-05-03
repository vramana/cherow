import * as ESTree from '../estree';
import { Token, tokenDesc } from '../token';
import { Errors, report, tolerant } from '../errors';
import { Location, Parser } from '../types';
import { parseBindingIdentifier } from './pattern';
import { parseStatementListItem, parseVariableStatement, parseDirective } from './statements';
import { parseIdentifierName, parseLiteral,  parseIdentifier,  parseAssignmentExpression } from './expressions';
import { parseClassDeclaration, parseFunctionDeclaration,  parseAsyncFunctionOrAsyncGeneratorDeclaration } from './declarations';
import {
    expect,
    Context,
    finishNode,
    nextToken,
    consume,
    getLocation,
    consumeSemicolon,
    lookahead,
    nextTokenIsFuncKeywordOnSameLine,
    nextTokenIsLeftParenOrPeriod,
    setPendingError,
    hasBit,
} from '../utilities';

// 15.2 Modules

/**
 * Parse module item list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItemList)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseModuleItemList(parser: Parser, context: Context): ESTree.Statement[] {

    // Prime the scanner
    nextToken(parser, context);

    const statements: ESTree.Statement[] = [];

    while (parser.token !== Token.EndOfSource) {
        statements.push(parser.token === Token.StringLiteral ?
            parseDirective(parser, context) :
            parseModuleItem(parser, context | Context.AllowIn));
    }

    return statements;
}

/**
 * Parse module item
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItem)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseModuleItem(parser: Parser, context: Context) {
    switch (parser.token) {

        // ExportDeclaration
        case Token.ExportKeyword:
            return parseExportDeclaration(parser, context);

            // ImportDeclaration
        case Token.ImportKeyword:
            // 'Dynamic Import' or meta property disallowed here
            if (!(context & Context.OptionsNext && lookahead(parser, context, nextTokenIsLeftParenOrPeriod))) {
                return parseImportDeclaration(parser, context);
            }

        default:
            return parseStatementListItem(parser, context);
    }
}

/**
 * Parse export declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExportDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseExportDeclaration(parser: Parser, context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration {

    const pos = getLocation(parser);
    const specifiers: ESTree.ExportSpecifier[] = [];

    let source = null;
    let declaration: ESTree.Statement | null = null;

    expect(parser, context | Context.DisallowEscapedKeyword, Token.ExportKeyword);

    switch (parser.token) {
        // export * FromClause ;
        case Token.Multiply:
            return parseExportAllDeclaration(parser, context, pos);

        case Token.DefaultKeyword:
            return parseExportDefault(parser, context, pos);

        case Token.LeftBrace:
            {
                // export ExportClause FromClause ;
                // export ExportClause ;
                expect(parser, context, Token.LeftBrace);

                let hasReservedWord = false;

                while (parser.token !== Token.RightBrace) {
                    if (parser.token & Token.Reserved) {
                        hasReservedWord = true;
                        setPendingError(parser);
                    }
                    specifiers.push(parseNamedExportDeclaration(parser, context));
                    if (parser.token !== Token.RightBrace) expect(parser, context, Token.Comma);
                }

                expect(parser, context | Context.DisallowEscapedKeyword, Token.RightBrace);

                if (parser.token === Token.FromKeyword) {
                    source = parseModuleSpecifier(parser, context);
                //  The left hand side can't be a keyword where there is no
                // 'from' keyword since it references a local binding.
                } else if (hasReservedWord) {
                    tolerant(parser, context, Errors.UnexpectedReserved);
                }

                consumeSemicolon(parser, context);

                break;
            }

            // export ClassDeclaration
            // export @decl ClassDeclaration
        case Token.At:
        case Token.ClassKeyword:
            declaration = (parseClassDeclaration(parser, context));
            break;

            // export LexicalDeclaration
        case Token.LetKeyword:
        case Token.ConstKeyword:
            declaration = parseVariableStatement(parser, context | Context.BlockScope);
            break;

          // export VariableDeclaration
        case Token.VarKeyword:
            declaration = parseVariableStatement(parser, context);
            break;

            // export HoistableDeclaration
        case Token.FunctionKeyword:
            declaration = parseFunctionDeclaration(parser, context);
            break;

            // export HoistableDeclaration
        case Token.AsyncKeyword:
            if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
                declaration = parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context);
                break;
            }
            // Falls through
        default:
            report(parser, Errors.UnexpectedToken, tokenDesc(parser.token));
    }

    return finishNode(context, parser, pos, {
        type: 'ExportNamedDeclaration',
        source,
        specifiers,
        declaration,
    });
}

/**
 * Parse export all declaration
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExportAllDeclaration(parser: Parser, context: Context, pos: Location): ESTree.ExportAllDeclaration {
    expect(parser, context, Token.Multiply);
    const source = parseModuleSpecifier(parser, context);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ExportAllDeclaration',
        source,
    });
}

/**
 * Parse named export declaration
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseNamedExportDeclaration(parser: Parser, context: Context): ESTree.ExportSpecifier {
    const pos = getLocation(parser);
    // ExportSpecifier :
    // IdentifierName
    // IdentifierName as IdentifierName
    const local = parseIdentifierName(parser, context | Context.DisallowEscapedKeyword, parser.token);
    const exported = consume(parser, context, Token.AsKeyword)
        ? parseIdentifierName(parser, context, parser.token)
        : local;
    return finishNode(context, parser, pos, {
        type: 'ExportSpecifier',
        local,
        exported,
    });
}

/**
 * Parse export default
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param pos Location
 */
function parseExportDefault(parser: Parser, context: Context, pos: Location): ESTree.ExportDefaultDeclaration {

    expect(parser, context | Context.DisallowEscapedKeyword, Token.DefaultKeyword);

    let declaration: ESTree.FunctionDeclaration | ESTree.ClassDeclaration | ESTree.Expression;

    switch (parser.token) {

        // export default HoistableDeclaration[Default]
        case Token.FunctionKeyword:
            declaration = parseFunctionDeclaration(parser, context | Context.RequireIdentifier);
            break;

            // export default ClassDeclaration[Default]
            // export default  @decl ClassDeclaration[Default]
        case Token.At:
        case Token.ClassKeyword:
            declaration = parseClassDeclaration(parser, context & ~Context.AllowIn | Context.RequireIdentifier);
            break;

            // export default HoistableDeclaration[Default]
        case Token.AsyncKeyword:
            declaration = parseAsyncFunctionOrAssignmentExpression(parser, context | Context.RequireIdentifier);
            break;

        default:
            {
                // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
                declaration = parseAssignmentExpression(parser, context | Context.AllowIn);
                consumeSemicolon(parser, context);
            }
    }

    return finishNode(context, parser, pos, {
        type: 'ExportDefaultDeclaration',
        declaration,
    });
}

/**
 * Parse import declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseImportDeclaration(parser: Parser, context: Context): ESTree.ImportDeclaration {

    const pos = getLocation(parser);

    expect(parser, context, Token.ImportKeyword);

    let source: ESTree.Literal;
    let specifiers: ESTree.Specifiers[] = [];

    // 'import' ModuleSpecifier ';'
    if (parser.token === Token.StringLiteral) {
        source = parseLiteral(parser, context);
    } else {
        specifiers = parseImportClause(parser, context | Context.DisallowEscapedKeyword);
        source = parseModuleSpecifier(parser, context);
    }

    consumeSemicolon(parser, context);

    return finishNode(context, parser, pos, {
        type: 'ImportDeclaration',
        specifiers,
        source,
    });
}

/**
 * Parse import clause
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportClause)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseImportClause(parser: Parser, context: Context): ESTree.Specifiers[] {

    const specifiers: ESTree.Specifiers[] = [];

    switch (parser.token) {

        // 'import' ModuleSpecifier ';'
        case Token.Identifier:
            {
                specifiers.push(parseImportDefaultSpecifier(parser, context));

                if (consume(parser, context, Token.Comma)) {
                    switch (parser.token) {
                        // import a, * as foo
                        case Token.Multiply:
                            parseImportNamespaceSpecifier(parser, context, specifiers);
                            break;
                            // import a, {bar}
                        case Token.LeftBrace:
                            parseNamedImports(parser, context, specifiers);
                            break;
                        default:
                            tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(parser.token));
                    }
                }

                break;
            }

            // import {bar}
        case Token.LeftBrace:
            parseNamedImports(parser, context, specifiers);
            break;

            // import * as foo
        case Token.Multiply:
            parseImportNamespaceSpecifier(parser, context, specifiers);
            break;

        default:
            report(parser, Errors.UnexpectedToken, tokenDesc(parser.token));
    }
    return specifiers;
}

/**
 * Parse named imports
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NamedImports)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseNamedImports(parser: Parser, context: Context, specifiers: ESTree.Specifiers[]) {

    expect(parser, context, Token.LeftBrace);

    while (parser.token !== Token.RightBrace) {
        specifiers.push(parseImportSpecifier(parser, context));
        if (parser.token !== Token.RightBrace) {
            expect(parser, context, Token.Comma);
        }
    }

    expect(parser, context, Token.RightBrace);
}

/**
 * Parse import specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportSpecifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseImportSpecifier(parser: Parser, context: Context): ESTree.ImportSpecifier {

    const pos = getLocation(parser);
    const { token } = parser;
    const imported = parseIdentifierName(parser, context | Context.DisallowEscapedKeyword, token);

    let local: ESTree.Identifier;

    if (parser.token === Token.AsKeyword) {
        expect(parser, context, Token.AsKeyword);
        local = parseBindingIdentifier(parser, context);
    } else {
         // An import name that is a keyword is a syntax error if it is not followed
         // by the keyword 'as'.
        if (hasBit(token, Token.Reserved)) tolerant(parser, context, Errors.UnexpectedReserved);
        if (hasBit(token, Token.IsEvalOrArguments)) tolerant(parser, context, Errors.StrictEvalArguments);
        local = imported;
    }

    return finishNode(context, parser, pos, {
        type: 'ImportSpecifier',
        local,
        imported,
    });
}

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NameSpaceImport)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseImportNamespaceSpecifier(parser: Parser, context: Context, specifiers: ESTree.Specifiers[]) {
    const pos = getLocation(parser);
    expect(parser, context, Token.Multiply);
    expect(parser, context, Token.AsKeyword, Errors.UnexpectedAsBinding);
    const local = parseBindingIdentifier(parser, context);
    specifiers.push(finishNode(context, parser, pos, {
        type: 'ImportNamespaceSpecifier',
        local,
    }));
}

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleSpecifier(parser: Parser, context: Context): ESTree.Literal {
    // ModuleSpecifier :
    //   StringLiteral
    expect(parser, context, Token.FromKeyword);
    if (parser.token !== Token.StringLiteral) report(parser, Errors.UnexpectedToken, tokenDesc(parser.token));
    return parseLiteral(parser, context);
}

/**
 * Parse import default specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportDefaultSpecifier(parser: Parser, context: Context): ESTree.ImportDefaultSpecifier {
    return finishNode(context, parser, getLocation(parser), {
        type: 'ImportDefaultSpecifier',
        local: parseIdentifier(parser, context),
    });
}

/**
 * Parses either async function or assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionOrAssignmentExpression(parser: Parser, context: Context): ESTree.FunctionDeclaration | ESTree.AssignmentExpression {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
        parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context | Context.RequireIdentifier) :
        parseAssignmentExpression(parser, context | Context.AllowIn);
}
