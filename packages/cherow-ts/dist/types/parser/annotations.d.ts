import { Parser, Token, Context } from 'cherow';
export declare function parseTypeParameters(parser: Parser, context: Context): any;
export declare function parseTypeOrTypePredicateAnnotation(parser: Parser, context: Context, token: Token): any;
export declare function parseTypeAnnotation(parser: Parser, context: Context, consumeColon?: boolean): any;
