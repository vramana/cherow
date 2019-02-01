import { ParserState } from '../common';
import { Errors } from '../errors';
export declare const enum Type {
    None = 0,
    MaybeQuantifier = 1,
    SeenAssertion = 2,
    SeenUnfixableAssertion = 4,
    TopLevel = 4
}
export declare const enum Escape {
    Empty = -1,
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex = -4,
    OutOfRange = -5
}
export declare function scanNext(state: ParserState, err: Errors): number;
export declare function consumeOpt(state: ParserState, code: number): boolean;
export declare function consumeLineFeed(state: ParserState, lastIsCR: boolean): void;
export declare function fromCodePoint(code: number): string;
export declare function toHex(code: number): number;
export declare function isDigit(ch: number): boolean;
//# sourceMappingURL=common.d.ts.map