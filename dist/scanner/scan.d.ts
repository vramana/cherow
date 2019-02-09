import { ParserState, Context } from '../common';
import { Token } from '../token';
export declare function tableLookUp(state: ParserState, context: Context, first: number): Token;
export declare type ScanSingleTokenAlternativeCallback = (state: ParserState, context: Context, first: number) => Token;
export declare function scanSingleToken(state: ParserState, context: Context, scanSingleTokenAlternative?: ScanSingleTokenAlternativeCallback | undefined): Token;
//# sourceMappingURL=scan.d.ts.map