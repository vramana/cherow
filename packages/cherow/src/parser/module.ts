import * as ESTree from '../estree';
import { ParserState, Location } from '../types';
import { parseLiteral, parseIdentifier, parseAssignmentExpression } from './expressions';
import { Token } from '../token';
import { nextToken } from '../lexer/scan';
import { parseFunctionDeclaration, parseClassDeclaration } from './declarations';
import { lookAheadOrScan } from '../lexer/common';
import { parseBindingIdentifier } from './pattern';
import { Errors, report } from '../errors';
import { parseVariableStatement, parseStatementListItem } from './statements';
import {
  Context,
  finishNode,
  getLocation,
  consumeSemicolon,
  nextTokenIsFuncKeywordOnSameLine,
  nextTokenIsLeftParenOrPeriod,
  parseIdentifierName,
  expect,
  optional,
  BindingOrigin,
  BindingType,
} from '../common';

export function parseModuleItemList(state: ParserState, context: Context): any {
    // Prime the scanner
    nextToken(state, context);

    const statements: any[] = [];

    while (state.token !== Token.EndOfSource) {
        statements.push(//state.token & Token.StringLiteral ?
            //parseDirective(parser, context) :
            parseModuleItem(state, context));
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
export function parseModuleItem(state: ParserState, context: Context): ReturnType<
| typeof parseExportDeclaration
| typeof parseImportDeclaration
| typeof parseStatementListItem  > {

    switch (state.token) {

        // @decorator
        case Token.At:
            //  return parseDecorators(parser, context);
            // ExportDeclaration
        case Token.ExportKeyword:
            return parseExportDeclaration(state, context);

            // ImportDeclaration
        case Token.ImportKeyword:
            // 'Dynamic Import' or meta property disallowed here
            if (!(context & Context.OptionsNext && lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true))) {
                return parseImportDeclaration(state, context);
            }
            // falls through
        default:
            return parseStatementListItem(state, context);
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
export function parseExportDeclaration(state: ParserState, context: Context): any {
    // ExportDeclaration:
    // export * FromClause;
    // export ExportClause FromClause;
    // export VariableStatement
    // export Declaration
    // export HoistableDeclaration
    // export ClassDeclaration
    // export AssignmentExpression
    const pos = getLocation(state);
    const specifiers: ESTree.ExportSpecifier[] = [];

    let source: ESTree.Literal | null = null;
    let declaration: ESTree.Statement | null = null;

    expect(state, context, Token.ExportKeyword);

    switch (state.token) {

        case Token.Multiply:
            // export * from 'foo';
            return parseExportAllDeclaration(state, context, pos);

        case Token.DefaultKeyword:
            return parseExportDefault(state, context, pos);

        case Token.LeftBrace:
            {
                // export {}
                // export {} from 'foo'
                expect(state, context, Token.LeftBrace);

                let hasReservedWord = false;

                while (state.token !== Token.RightBrace) {
                    if (state.token & Token.Reserved) {
                        hasReservedWord = true;
                    }
                    specifiers.push(parseNamedExportDeclaration(state, context));
                    if (state.token !== Token.RightBrace) expect(state, context, Token.Comma);
                }

                expect(state, context, Token.RightBrace);

                if (state.token === Token.FromKeyword) {
                    source = parseModuleSpecifier(state, context);
                    //  The left hand side can't be a keyword where there is no
                    // 'from' keyword since it references a local binding.
                } else if (hasReservedWord) report(state, Errors.Unexpected);

                consumeSemicolon(state, context);

                break;
            }
        case Token.ClassKeyword:
            // export class foo {}
            declaration = (parseClassDeclaration(state, context));
            break;

        case Token.LetKeyword:
            // export let z = 0;
            // export let x
            declaration = parseVariableStatement(state, context, BindingType.Let, BindingOrigin.Export);
            break;

        case Token.ConstKeyword:
            // export const z = 0;
            // export const x
            declaration = parseVariableStatement(state, context, BindingType.Const, BindingOrigin.Export);
            break;

        case Token.VarKeyword:
            // export var ariya = 123;
            // export var a, b, c;
            declaration = parseVariableStatement(state, context, BindingType.Var, BindingOrigin.Export);
            break;

            // export HoistableDeclaration
        case Token.FunctionKeyword:
            // export function foo () {}
            // export function () {}
            // export function *foo() {}
            // export function *() {}
            declaration = parseFunctionDeclaration(state, context, false);
            break;

        case Token.AsyncKeyword:
            // export async function *foo () {}
            // export async function foo () {}
            // export async function *() {}
            // export async function f(){}
            // export async function(){}
            // export async () => y
            // export async (x) => y
            // export async x => y
            if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
                declaration = parseFunctionDeclaration(state, context, true);
                break;
            }
            // Falls through
        default:
            report(state, Errors.Unexpected);
    }

    return finishNode(state, context, pos, {
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
function parseExportAllDeclaration(state: ParserState, context: Context, pos: Location): ESTree.ExportAllDeclaration {
    expect(state, context, Token.Multiply);
    const source = parseModuleSpecifier(state, context);
    consumeSemicolon(state, context);
    return finishNode(state, context, pos, {
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
function parseNamedExportDeclaration(state: ParserState, context: Context): ESTree.ExportSpecifier {
    const pos = getLocation(state);
    // ExportSpecifier :
    // IdentifierName
    // IdentifierName as IdentifierName
    const local = parseIdentifierName(state, context, state.token);
    const exported = optional(state, context, Token.AsKeyword) ?
        parseIdentifierName(state, context, state.token) :
        local;
    return finishNode(state, context, pos, {
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
function parseExportDefault(state: ParserState, context: Context, pos: Location): ESTree.ExportDefaultDeclaration {

    expect(state, context, Token.DefaultKeyword);

    let declaration: ESTree.FunctionDeclaration | ESTree.ClassDeclaration | ESTree.Expression;

    switch (state.token) {

        // export default HoistableDeclaration[Default]
        case Token.FunctionKeyword:
            declaration = parseFunctionDeclaration(state, context | Context.RequireIdentifier, false);
            break;

            // export default ClassDeclaration[Default]
            // export default  @decl ClassDeclaration[Default]
        case Token.At:
        case Token.ClassKeyword:
            declaration = parseClassDeclaration(state, context | Context.RequireIdentifier);
            break;

            // export default HoistableDeclaration[Default]
        case Token.AsyncKeyword:
            declaration = parseAsyncFunctionOrAssignmentExpression(state, context | Context.RequireIdentifier);
            break;

        default:
            // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
            declaration = parseAssignmentExpression(state, context);

            consumeSemicolon(state, context);
    }

    return finishNode(state, context, pos, {
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
export function parseImportDeclaration(state: ParserState, context: Context): ESTree.ImportDeclaration {
    const pos = getLocation(state);
    expect(state, context, Token.ImportKeyword);

    let source: ESTree.Literal;
    const specifiers: ESTree.Specifiers[] = [];

    // 'import' ModuleSpecifier ';'
    if ((state.token & Token.Identifier) === Token.Identifier) {

        specifiers.push(parseImportDefaultSpecifier(state, context));

        if (optional(state, context, Token.Comma)) {
            if (state.token === Token.Multiply) {
                parseNameSpaceImport(state, context, specifiers);
            } else if (state.token === Token.LeftBrace) {
                parseNamedImports(state, context, specifiers);
            } else report(state, Errors.Unexpected);
        }

        source = parseModuleSpecifier(state, context);

        // 'import' ModuleSpecifier ';'
    } else if ((state.token & Token.StringLiteral) === Token.StringLiteral) {
        source = parseLiteral(state, context);
    } else {
        if (state.token === Token.Multiply) {
            parseNameSpaceImport(state, context, specifiers);
        } else if (state.token === Token.LeftBrace) {
            parseNamedImports(state, context, specifiers);
        } else report(state, Errors.Unexpected);

        source = parseModuleSpecifier(state, context);
    }

    consumeSemicolon(state, context);

    return finishNode(state, context, pos, {
        type: 'ImportDeclaration',
        specifiers,
        source,
    });
}

/**
 * Parse named imports
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NamedImports)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseNamedImports(state: ParserState, context: Context, specifiers: ESTree.Specifiers[]): void {

    expect(state, context, Token.LeftBrace);

    while (state.token !== Token.RightBrace) {
        specifiers.push(parseImportSpecifier(state, context));
        if (state.token !== Token.RightBrace) expect(state, context, Token.Comma);
    }

    expect(state, context, Token.RightBrace);
}

/**
 * Parse import specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportSpecifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseImportSpecifier(state: ParserState, context: Context): ESTree.ImportSpecifier {
    const pos = getLocation(state);
    const token = state.token;
    const imported = parseIdentifierName(state, context, state.token);

    let local: ESTree.Identifier;

    if (optional(state, context, Token.AsKeyword)) {
        local = parseBindingIdentifier(state, context);
    } else {
        // An import name that is a keyword is a syntax error if it is not followed
        // by the keyword 'as'.
        if ((token & Token.Reserved) === Token.Reserved) report(state, Errors.Unexpected);
        local = imported;
    }

    return finishNode(state, context, pos, {
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

function parseNameSpaceImport(state: ParserState, context: Context, specifiers: ESTree.Specifiers[]): void {
    // NameSpaceImport:
    //  * as ImportedBinding
    const pos = getLocation(state);
    expect(state, context, Token.Multiply);
    expect(state, context, Token.AsKeyword);
    const local = parseBindingIdentifier(state, context);
    specifiers.push(finishNode(state, context, pos, {
        type: 'ImportNamespaceSpecifier',
        local,
    }));
}

/**
 * Parse module specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleSpecifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleSpecifier(state: ParserState, context: Context): ESTree.Literal {
    // ModuleSpecifier :
    //   StringLiteral
    expect(state, context, Token.FromKeyword);
    if ((state.token & Token.StringLiteral) !== Token.StringLiteral) {
      report(state, Errors.Unexpected);
    }
    return parseLiteral(state, context);
}

/**
 * Parse import default specifier
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportDefaultSpecifier(state: ParserState, context: Context): ESTree.ImportDefaultSpecifier {
    return finishNode(state, context, getLocation(state), {
        type: 'ImportDefaultSpecifier',
        local: parseIdentifier(state, context),
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
function parseAsyncFunctionOrAssignmentExpression(
  state: ParserState,
  context: Context
): ESTree.FunctionDeclaration | ESTree.AssignmentExpression {
    return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false) ?
        parseFunctionDeclaration(state, context | Context.RequireIdentifier, true) :
        parseAssignmentExpression(state, context) as any;
}
