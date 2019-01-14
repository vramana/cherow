import { Context, ParserState } from '../common';
import { Token } from '../token';
export declare enum RegexState {
    Empty = 0,
    Escape = 1,
    Class = 2
}
export declare enum RegexFlags {
    Empty = 0,
    IgnoreCase = 1,
    Global = 2,
    Multiline = 4,
    Unicode = 8,
    Sticky = 16,
    DotAll = 32
}
export declare function scanRegularExpression(state: ParserState, context: Context): Token;
//# sourceMappingURL=regexp.d.ts.map