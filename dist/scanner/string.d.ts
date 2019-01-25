import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Escape } from './common';
export declare function scanStringLiteral(state: ParserState, context: Context, quote: number): Token;
export declare const table: ((state: ParserState, context: Context, first: number) => number)[];
export declare function reportInvalidEscapeError(state: ParserState, code: Escape): void;
//# sourceMappingURL=string.d.ts.map