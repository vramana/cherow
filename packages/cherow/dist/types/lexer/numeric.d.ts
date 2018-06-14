import { Parser } from '../types';
import { Token } from '../token';
import { Context } from '../common';
/**
 *  Scans numeric and decimal literal literal
 *
 * @see [https://tc39.github.io/ecma262/#prod-DecimalLiteral)
 * @see [https://tc39.github.io/ecma262/#prod-NumericLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export declare function scanNumeric(parser: Parser): Token;
/**
 *  Scans binary, octal, hex literal, and numeric literals (Annex B.1.1)
 *
 * @see [https://tc39.github.io/ecma262/#prod-BinaryIntegerLiteral)
 * @see [https://tc39.github.io/ecma262/#prod-OctalIntegerLiteral)
 * @see [https://tc39.github.io/ecma262/#prod-HexIntegerLiteral)
 * @see [https://tc39.github.io/ecma262/#sec-additional-syntax-numeric-literals)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export declare function parseLeadingZero(parser: Parser, context: Context): Token;
/**
 * Scans octal or binary digits
 *
 * @see [https://tc39.github.io/ecma262/#prod-BinaryDigits)
 * @see [https://tc39.github.io/ecma262/#prod-OctalDigit)
 *
 * @param parser Parser object
 * @param base base number
 */
export declare function scanOctalOrBinaryDigits(parser: Parser, base: number): Token;
/**
 * Scans hex digits
 *
 * @see [https://tc39.github.io/ecma262/#prod-HexDigits)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export declare function scanHexDigits(parser: Parser): Token;
/**
* Scans implicit octals
*
* @see [https://tc39.github.io/ecma262/#sec-additional-syntax-numeric-literals)
*
* @param parser Parser object
* @param context Context masks
*/
export declare function scanImplicitOctalDigits(parser: Parser, context: Context): Token;
/**
* Scans decimal digit or separator
*
* @param parser Parser object
* @param context Context masks
*/
export declare function scanDecimalDigitsOrSeparator(parser: Parser): string;
