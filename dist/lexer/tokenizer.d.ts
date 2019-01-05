import { ParserState } from '../types';
import { Token } from '../token';
export declare const enum TokenType {
    End = 0,
    Keyword = 1,
    Punctuator = 2,
    Null = 3,
    Boolean = 4,
    Identifier = 5,
    String = 6,
    Numeric = 7,
    RegularExpression = 8,
    Template = 9
}
export declare const TokenTypes: string[];
export declare function edgeCaseCrap(state: ParserState, t: Token, type: TokenType): void;
export declare function getTokenValue(state: ParserState, t: Token): string;
export declare function convertTokenType(t: Token): string;
//# sourceMappingURL=tokenizer.d.ts.map