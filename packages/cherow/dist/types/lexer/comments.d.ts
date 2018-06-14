import { Token } from '../token';
import { Context } from '../common';
import { Parser } from '../types';
/**
 * Skips single HTML comments. Same behavior as in V8.
 *
 * @param parser Parser Object
 * @param context Context masks.
 */
export declare function skipSingleHTMLComment(parser: Parser, context: Context): Token;
/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param parser Parser object
 * @param returnToken Token to be returned
 */
export declare function skipSingleLineComment(parser: Parser, returnToken?: Token): Token;
/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param parser Parser object
 */
export declare function skipMultilineComment(parser: Parser): any;
