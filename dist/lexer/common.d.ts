import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { Context } from '../common';
export declare const enum InvalidEscapeType {
    Empty = -1,
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex = -4,
    OutOfRange = -5
}
export declare function fromCodePoint(code: Chars): string;
export declare function consume(state: ParserState, code: number): boolean;
export declare function skipToNewLine(state: ParserState): Token;
export declare function nextChar(state: ParserState): number;
export declare function nextUnicodeChar(state: ParserState): number;
export declare function toHex(code: number): number;
export declare function mapToToken(token: Token): (state: ParserState) => Token;
export declare function skipBomAndShebang(state: ParserState, context: Context): void;
export declare function scanPrivateName(state: ParserState, context: Context): Token;
export declare function lookAheadOrScan<T>(state: ParserState, context: Context, callback: (state: ParserState, context: Context) => T, isLookahead: boolean): T;
//# sourceMappingURL=common.d.ts.map