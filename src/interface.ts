import { Flags } from './masks';
import { Token } from './token';
import { Comment } from './estree';

export interface Options {
    next?: boolean;
    ranges?: boolean;
    locations?: boolean;
    comments?: EmitComments;
    loc?: boolean;
    raw?: boolean;
    directives?: boolean;
    jsx?: boolean;
    flow?: boolean;
    source?: string;
    globalReturn?: boolean;
    tolerant?: any;
    sourceType?: 'module' | 'script';
    v8?: boolean;
    plugins?: any;
    impliedStrict?: boolean;
}

export interface SavedState {
    index: number;
    column: number;
    line: number;
    token: Token;
    tokenValue: any;
    flags: Flags;
    startIndex: number;
    lastIndex: number;
    startLine: number;
    lastLine: number;
    startColumn: number;
    lastColumn: number;
    tokenRegExp: any;
    tokenRaw: any;
}

export interface Location {
    index: number;
    start: number;
    line: number;
    column: number;
}

export type EmitComments = void | Comment[] | (
    (type: string, value: string, start: number, end: number, loc: any) => void
);