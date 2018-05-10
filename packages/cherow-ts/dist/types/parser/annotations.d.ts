import { Parser, Token, Context } from 'cherow';
export declare function parseTypeParameter(parser: Parser, context: Context): any;
export declare function parseTypeParameters(parser: Parser, context: Context): any;
export declare function parseTypeOrTypePredicateAnnotation(parser: Parser, context: Context, token: Token): any;
export declare function parseType(parser: Parser, context: Context): any;
export declare function parseTypeArguments(parser: Parser, context: Context): any;
/**
 * Parse type annotation
 *
 * @param parser Parser object
 * @param context  Context masks
 * @param consumeColon True if should consume semicolon
 */
export declare function parseTypeAnnotation(parser: Parser, context: Context, consumeColon?: boolean): any;
export declare function parseSignatureMember(parser: Parser, context: Context, type: string): any;
export declare function parseObjectTypeMembers(parser: Parser, context: Context): any;
