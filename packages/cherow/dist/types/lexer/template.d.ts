import { Parser } from '../types';
import { Token } from '../token';
import { Context } from '../utilities';
export declare function consumeTemplateBrace(parser: Parser, context: Context): Token;
export declare function scanTemplate(parser: Parser, context: Context): Token;
