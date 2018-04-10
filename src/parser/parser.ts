import * as ESTree from '../estree';
import { Token } from '../token';
import {  Options, Delegate, Location } from '../types';
import { parseStatementListItem } from './statements';
import { parseModuleItemList } from './module';
import {
    Context,
    Flags,
    nextToken,
    isPrologueDirective,
    parseDirective
} from '../utilities';

export class Parser {

    // The source code to parse
    public readonly source: string;

    // Current position
    public index: number;

    // Current line position
    public line: number;

    // Current column position
    public column: number;

    // Start position  before current token
    public startIndex: number;

    // Start position column before current token
    public startColumn: number;

    // Start position line before current token
    public startLine: number;

    // End position after parsing after current token
    public lastIndex: number;

    // End column position after current token
    public lastColumn: number;

    // End line position after current token
    public lastLine: number;

    // Pending cover grammar errors
    public pendingExpressionError: any;

    // Mutable parser flags
    public flags: Flags;

    // Mutable parser flags
    public sourceFile: string | void;

    public labelSet: any;

    public comments: any[];
    public tokenValue: any;
    public tokenRaw: string;
    public lastValue: number;
    public parsingContext: any;
    public tokenRegExp: undefined;
    public token: Token;
    public errorLocation: Location | void;
    public delegate: Delegate | void;
    public errors: any[];

    constructor(source: string, sourceFile: string | void, delegate: Delegate | void) {
        this.source = source;
        this.comments = [];
        this.sourceFile = sourceFile;
        this.flags = Flags.AllowDestructuring;
        this.index = 0;
        this.line = 1;
        this.column = 0;
        this.startIndex = 0;
        this.startColumn = 0;
        this.startLine = 1;
        this.lastIndex = 0;
        this.lastColumn = 0;
        this.lastLine = 0;
        this.tokenRaw = '';
        this.lastValue = 0;
        this.parsingContext = 0;
        this.token = 0;
        this.pendingExpressionError = undefined;
        this.tokenRegExp = undefined;
        this.tokenValue = undefined;
        this.labelSet = undefined;
        this.errorLocation = undefined;
        this.delegate = delegate;
        this.errors = [];
    }
}

export function parse(source: string, options: Options | void, context: Context): ESTree.Program {

    let sourceFile: string = '';
    let delegate;

    if (!!options) {
        if (options.next) context |= Context.OptionsNext;
        if (options.jsx) context |= Context.OptionsJSX;
        if (options.ranges) context |= Context.OptionsRanges;
        if (options.loc) context |= Context.OptionsLoc;
        if (options.raw) context |= Context.OptionsRaw;
        if (options.delegate) context |= Context.OptionsDelegate;
        if (options.globalReturn) context |= Context.OptionsGlobalReturn;
        if (options.globalAwait) context |= Context.OptionsGlobalAwait;
        if (options.skipShebang) context |= Context.OptionsShebang;
        if (options.rawIdentifier) context |= Context.OptionsRawidentifiers;
        if (options.tolerant) context |= Context.OptionsTolerant;
        if (!!options.source) sourceFile = options.source;
        if (!!options.comments) context |= Context.OptionsComments;

        if (options.impliedStrict) context |= Context.OptionsImpliedStrict;
        // TODO! Refactor!
        if (typeof options.delegate === 'function') {
            delegate = options.delegate;
            context |= Context.OptionsDelegate;
        }
    }

    const parser = new Parser(source, sourceFile, delegate);

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

        if (sourceFile) {
            node.loc.source = sourceFile;
        }
    }

    if (context & Context.OptionsComments) {
        node.comments = parser.comments;
    }

    if (context & Context.OptionsTolerant) {
        node.errors = parser.errors;
    }

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