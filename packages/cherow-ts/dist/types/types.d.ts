import { Token } from 'cherow';
export interface Options {
    module?: boolean;
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
export interface IParser {
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
