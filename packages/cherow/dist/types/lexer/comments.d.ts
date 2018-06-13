import { Token } from '../token';
import { Context } from '../common';
import { Parser } from '../types';
export declare function skipSingleHTMLComment(parser: Parser, context: Context): Token;
export declare function skipSingleLineComment(parser: Parser, returnToken?: Token): Token;
export declare function skipMultilineComment(parser: Parser): any;
