import { IParser } from '../types';
import { Token } from '../token';
import { Context } from '../utilities';
export declare function scanIdentifier(parser: IParser, context: Context, first?: number): Token;
export declare function scanMaybeIdentifier(parser: IParser, context: Context, first: number): Token;
