import * as ESTree from '../estree';
import { Token } from '../token';
import {  Options, Delegate, Location, Parser } from '../types';
import { parseStatementListItem } from './statements';
import { parseModuleItemList } from './module';
import {
    Context,
    Flags,
    nextToken,
    isPrologueDirective,
    parseDirective
} from '../utilities';

/**
 * Creates the parser object
 * 
 * @param source The source coode to parser
 * @param sourceFile Optional source file info to be attached in every node
 * @param delegate  Optional callback function to be invoked for each syntax node (as the node is constructed)
 */
export function createParser(
    source: string,
    sourceFile: string | void,
    delegate: Delegate | void
): Parser {
    return {
        // The source code to parse
        source: source,
        // Current position
        index: 0,
        // Current line
        line: 1,
        // Current column
        column: 0,
        // Start position  before current token
        startIndex: 0,
        // Start position column before current token
        startColumn: 0,
        // Start position line before current token
        startLine: 1,
        // End position after parsing after current token
        lastIndex: 0,
        // End column position after current token
        lastColumn: 0,
        // End line position after current token
        lastLine: 0,
        // Pending cover grammar errors
        pendingExpressionError: undefined,
        // Mutable parser flags. Allows destructuring by default.
        flags: Flags.AllowDestructuring,
        // The tokens
        token: Token.EndOfSource,
        tokenRaw: '',
        lastValue: 0,
        comments: [],
        sourceFile: sourceFile,
        tokenRegExp: undefined,
        tokenValue: undefined,
        labelSet: undefined,
        errorLocation: undefined,
        delegate: delegate,
        errors: [],
    }
}

/**
 * Creating the parser
 * 
 * @param source The source coode to parser
 * @param options The parser options
 * @param context Context masks
 */

export function parse(source: string, options: Options | void, context: Context): ESTree.Program {

    let sourceFile: string = '';
    let delegate;

    if (!!options) {
        // The flag to enable stage 3 support (ESNext)
        if (options.next) context |= Context.OptionsNext;
        // The flag to enable React JSX parsing
        if (options.jsx) context |= Context.OptionsJSX;
        // The flag to enable start and end offsets to each node
        if (options.ranges) context |= Context.OptionsRanges;
        // The flag to enable line/column location information to each node
        if (options.loc) context |= Context.OptionsLoc;
        // The flag to attach raw property to each literal node
        if (options.raw) context |= Context.OptionsRaw;
        // The flag to allow return in the global scope
        if (options.globalReturn) context |= Context.OptionsGlobalReturn;
        // The flag to allow 'await' in the global scope
        if (options.globalAwait) context |= Context.OptionsGlobalAwait;
        // The flag to allow to skip shebang - '#'
        if (options.skipShebang) context |= Context.OptionsShebang;
        // Attach raw property to each identifier node
        if (options.rawIdentifier) context |= Context.OptionsRawidentifiers;
        // Enable tolerant mode
        if (options.tolerant) context |= Context.OptionsTolerant;
        // Set to true to record the source file in every node's loc object when the loc option is set.
        if (!!options.source) sourceFile = options.source;
        // Create a top-level comments array containing all comments
        if (!!options.comments) context |= Context.OptionsComments;
        // The flag to enable implied strict mode
        if (options.impliedStrict) context |= Context.OptionsImpliedStrict
        // Accepts a callback function to be invoked for each syntax node (as the node is constructed)
        if (typeof options.delegate === 'function') {
            context |= Context.OptionsDelegate;
            delegate = options.delegate;
        }
    }

    const parser = createParser(source, sourceFile, delegate);

    const body = context & Context.Module ? parseModuleItemList(parser, context) : parseStatementList(parser, context);

    const node: ESTree.Program = {
        type: 'Program',
        sourceType: context & Context.Module ? 'module' : 'script',
        body,
    };

    if (context & Context.OptionsRanges) {
        node.start = 0;
        node.end = source.length;
    }

    if (context & Context.OptionsLoc) {

        node.loc = {
            start: {
                line: 1,
                column: 0,
            },
            end: {
                line: parser.line,
                column: parser.column
            }
        };

        if (sourceFile) node.loc.source = sourceFile;

    }

    if (context & Context.OptionsComments) node.comments = parser.comments;

    if (context & Context.OptionsTolerant) node.errors = parser.errors;

    return node;
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function parseStatementList(parser: Parser, context: Context): ESTree.Statement[] {
    const statements: ESTree.Statement[] = [];

    nextToken(parser, context);

    while (parser.token === Token.StringLiteral) {
        const item: ESTree.Statement = parseDirective(parser, context);
        statements.push(item);

        if (!isPrologueDirective(item)) break;

        if (item.expression.value === 'use strict') {

            context |= Context.Strict;
        }
    }
    while (parser.token !== Token.EndOfSource) {
        statements.push(parseStatementListItem(parser, context));
    }

    return statements;
}