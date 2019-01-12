import { Context, ParserState } from '../common';
import { RegexpState, Type } from './common';
import { Token } from '../token';
export declare function scanRegularExpression(state: ParserState, context: Context): Token;
export declare function validateRegularExpression(state: ParserState, context: Context, depth: number, regExpState: RegexpState, type: Type): RegexpState;
//# sourceMappingURL=regexp.d.ts.map