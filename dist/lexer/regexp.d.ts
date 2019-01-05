import { ParserState } from '../types';
import { Context } from '../common';
import { Token } from '../token';
import { RegexpState } from '../runtime/common';
export declare function scanRegularExpression(state: ParserState, context: Context): Token;
export declare function verifyRegExpPattern(parser: ParserState, context: Context): {
    flags: string;
    pattern: string;
    state: RegexpState;
};
//# sourceMappingURL=regexp.d.ts.map