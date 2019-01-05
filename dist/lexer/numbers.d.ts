import { ParserState } from '../types';
import { Token } from '../token';
import { Context } from '../common';
export declare const parseLeadingZeroTable: Array<Function>;
export declare function scanNumeric(state: ParserState, context: Context, isFloat?: boolean): Token;
export declare function scanImplicitOctalDigits(state: ParserState, context: Context): Token;
export declare function scanOctalOrBinaryDigits(state: ParserState, context: Context, base: number): Token;
export declare function scanHexDigits(state: ParserState, context: Context): Token;
//# sourceMappingURL=numbers.d.ts.map