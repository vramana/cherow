import { IParser } from '../types';
import { Token } from '../token';
import { Context } from '../utilities';
export declare function consumeTemplateBrace(parser: IParser, context: Context): Token;
export declare function scanTemplate(parser: IParser, context: Context): Token;
