import { Token } from '../token';
import { ParserState } from '../types';
import { Context } from '../common';
export declare function scanIdentifier(state: ParserState, context: Context): Token;
export declare function scanIdentifierRest(state: ParserState, context: Context): Token;
export declare function scanIdentifierUnicodeEscape(state: ParserState): number;
export declare function maybeIdentifier(state: ParserState, context: Context): Token;
//# sourceMappingURL=identifier.d.ts.map