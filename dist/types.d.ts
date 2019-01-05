import { Token } from './token';
import { Flags, LabelState } from './common';
import { Comment } from './estree';
import { CommentType } from './lexer/comments';
export declare type OnToken = void | ((token: string, value: string, line?: number, column?: number) => void);
export declare type OnError = void | ((error: string, line: number, column: number) => void);
export declare type OnComment = void | Comment[] | ((type: string, value: string, start: number, end: number) => any);
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
    edit?: OnError;
    onToken?: OnToken;
    node?: boolean;
    tokenize?: boolean;
    onComment?: OnComment;
}
export interface ParserState {
    index: number;
    startIndex: number;
    lastIndex: number;
    line: number;
    startLine: number;
    lastLine: number;
    column: number;
    startColumn: number;
    lastColumn: number;
    source: string;
    flags: Flags;
    length: number;
    commentState: number | undefined;
    nextChar: number;
    tokenRaw: string | null;
    token: Token;
    onToken: any;
    onComment: any;
    commentStart: number;
    commentType: CommentType | void;
    tokenValue: any;
    tokenRegExp: any;
    capturingParens: number;
    largestBackReference: number;
    assignable: boolean;
    destructible: boolean;
    labelSet: any;
    functionBoundaryStack: any;
    labelSetStack: {
        [key: string]: boolean;
    }[];
    iterationStack: (boolean | LabelState)[];
    switchStatement: LabelState;
    iterationStatement: LabelState;
    labelDepth: number;
}
export interface Location {
    index: number;
    column: number;
    line: number;
}
//# sourceMappingURL=types.d.ts.map