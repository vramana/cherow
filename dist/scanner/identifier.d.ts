import { ParserState, Context } from '../common';
import { Token } from '../token';
export declare function scanMaybeIdentifier(state: ParserState, _: Context, first: number): Token | void;
export declare function scanIdentifier(state: ParserState): Token;
export declare function scanPrivateName(state: ParserState, _: Context): Token;
//# sourceMappingURL=identifier.d.ts.map