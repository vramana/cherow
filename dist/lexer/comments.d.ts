import { Token } from '../token';
import { Context } from '../common';
import { ParserState } from '../types';
export declare const enum CommentType {
    Single = 0,
    Multi = 1,
    HTMLOpen = 2,
    HTMLClose = 3
}
export declare const CommentTypes: string[];
export declare function skipSingleHTMLComment(state: ParserState, context: Context, type: CommentType): Token;
export declare function skipSingleLineComment(state: ParserState, type: CommentType): Token;
export declare function skipMultilineComment(state: ParserState): any;
//# sourceMappingURL=comments.d.ts.map