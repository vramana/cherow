import { ParserState, Context } from '../common';
import { Token } from '../token';
export declare function returnBigIntOrNumericToken(state: ParserState): Token;
export declare function scanNumeric(state: ParserState, context: Context, first: number): Token;
export declare function scanHexIntegerLiteral(state: ParserState): number;
export declare function scanBinaryOrOctalDigits(state: ParserState, base: 2 | 8): Token;
export declare function scanImplicitOctalDigits(state: ParserState, context: Context, first: number): number;
//# sourceMappingURL=numeric.d.ts.map