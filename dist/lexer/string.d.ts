import { Context } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { InvalidEscapeType } from './common';
export declare function scanStringLiteral(state: ParserState, context: Context): Token;
export declare const table: ((state: ParserState, context: Context) => number)[];
export declare function reportInvalidEscapeError(state: ParserState, type: InvalidEscapeType): any;
export declare function readNext(state: ParserState): number;
//# sourceMappingURL=string.d.ts.map