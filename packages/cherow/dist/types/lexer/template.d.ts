import { Parser } from '../types';
import { Token } from '../token';
import { Context } from '../common';
/**
 * Scan template
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first Codepoint
 */
export declare function scanTemplate(parser: Parser, context: Context, first: number): Token;
/**
* Consumes template brace
*
* @param parser Parser object
* @param context Context masks
*/
export declare function consumeTemplateBrace(parser: Parser, context: Context): Token;
