import { ParserState } from '../common';
import { Errors } from '../errors';
export declare const enum Type {
    None = 0,
    MaybeQuantifier = 1,
    SeenAssertion = 2,
    SeenUnfixableAssertion = 4,
    TopLevel = 4
}
export declare const enum RegexpState {
    None = 0,
    Valid = 1,
    Invalid = 4,
    Unicode = 16,
    Plain = 32,
    MissingDigits = 64,
    InvalidPlainClass = 8388608,
    InvalidUnicodeClass = 16777216,
    Escape = 33554432,
    InvalidClass = 1114112,
    InvalidClassRange = 1114113
}
export declare const enum Escape {
    Empty = -1,
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex = -4,
    OutOfRange = -5
}
export declare function scanNext(state: ParserState, err: Errors): number;
export declare function isFlagStart(code: number): boolean;
export declare function nextChar(parser: ParserState): number;
export declare function nextUnicodeChar(state: ParserState): number;
export declare function consumeAny(state: ParserState): number;
export declare function consumeOpt(state: ParserState, code: number): boolean;
export declare function consumeLineFeed(state: ParserState, lastIsCR: boolean): void;
export declare function fromCodePoint(code: number): string;
export declare function toHex(code: number): number;
export declare function isDigit(ch: number): boolean;
//# sourceMappingURL=common.d.ts.map