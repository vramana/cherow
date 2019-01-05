import { ParserState } from '../types';
import { Chars } from '../chars';
import { Context } from '../common';
import { RegexpState } from './common';
export declare function validateRegexBody(parser: ParserState, context: Context, depth: number, state: RegexpState): RegexpState;
export declare function validateClassAndClassCharacterEscape(parser: ParserState): RegexpState | Chars;
//# sourceMappingURL=regexp.d.ts.map