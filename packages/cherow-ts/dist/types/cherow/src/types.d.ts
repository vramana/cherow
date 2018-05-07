import { Flags } from './utilities';
import { Token } from './token';
export declare type ForStatementType = 'ForStatement' | 'ForOfStatement' | 'ForInStatement';
export declare type CommentType = 'MultiLine' | 'SingleLine' | 'SheBang' | 'HTMLOpen' | 'HTMLClose';
export interface Options {
    comments?: boolean;
    next?: boolean;
    ranges?: boolean;
    loc?: boolean;
    jsx?: boolean;
    raw?: boolean;
    rawIdentifier?: boolean;
    source?: string;
    impliedStrict?: boolean;
    globalReturn?: boolean;
    experimental?: boolean;
    skipShebang?: boolean;
    tolerant?: boolean;
    node?: boolean;
}
export interface Parser {
    source: string;
    length: number;
    index: number;
    line: number;
    column: number;
    startIndex: number;
    startColumn: number;
    startLine: number;
    lastIndex: number;
    lastColumn: number;
    lastLine: number;
    pendingExpressionError: any;
    flags: Flags;
    sourceFile: string | void;
    errorLocation: any;
    labelSet: any;
    comments: any;
    tokenValue: any;
    tokenRaw: string;
    lastValue: number;
    tokenRegExp: any;
    token: Token;
    errors: any[];
}
export interface Location {
    index: number;
    column: number;
    line: number;
}
