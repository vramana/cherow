import { ParserState, Context } from '../common';
import { Token } from '../token';
export declare function scanIdentifierOrKeyword(state: ParserState, context: Context, first: number): Token;
export declare function scanIdentifier(state: ParserState, context: Context, first: number): Token;
export declare function scanMaybeIdentifier(state: ParserState, _: Context, first: number): Token | void;
export declare function scanPrivateName(state: ParserState, _: Context): Token;
export declare function nextIdentifierChar(state: ParserState): number;
export declare function scanIdentifierRest(state: ParserState, context: Context): Token;
export declare function scanIdentifierUnicodeEscape(state: ParserState): number;
//# sourceMappingURL=identifier.d.ts.map