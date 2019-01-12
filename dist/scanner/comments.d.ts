import { Token } from '../token';
import { Context } from '../common';
import { ParserState } from '../common';
export declare const enum CommentType {
    Single = 0,
    Multi = 1,
    HTMLOpen = 2,
    HTMLClose = 3,
    HashBang = 4
}
export declare const CommentTypes: string[];
export declare function skipHashBang(state: ParserState, context: Context): void;
export declare function skipSingleHTMLComment(state: ParserState, context: Context, type: CommentType): Token;
export declare function skipSingleLineComment(state: ParserState, type: CommentType): Token;
export declare function skipBlockComment(state: ParserState): Token;
//# sourceMappingURL=comments.d.ts.map