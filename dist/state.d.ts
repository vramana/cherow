import { Token } from './token';
import { Flags, LabelState } from './common';
import { OnComment, OnToken } from './types';
import { CommentType } from './lexer/comments';
export declare class State {
    index: number;
    startIndex: number;
    lastIndex: number;
    column: number;
    startColumn: number;
    lastColumn: number;
    line: number;
    startLine: number;
    lastLine: number;
    source: string;
    length: number;
    nextChar: number;
    flags: Flags;
    token: Token;
    tokenRaw: string | null;
    tokenRegExp: any;
    onToken: OnToken;
    onComment: OnComment;
    commentState: number | undefined;
    tokenValue: any;
    commentStart: number;
    commentType: CommentType | void;
    capturingParens: number;
    largestBackReference: number;
    assignable: boolean;
    destructible: boolean;
    labelSet: any;
    labelSetStack: {
        [key: string]: boolean;
    }[];
    iterationStack: (boolean | LabelState)[];
    switchStatement: LabelState;
    iterationStatement: LabelState;
    labelDepth: number;
    functionBoundaryStack: any;
    constructor(source: string, onToken: OnToken | void, onComment: OnComment | void);
}
//# sourceMappingURL=state.d.ts.map