import { Parser } from '../types';
import { Token } from '../token';
import { Context } from '../utilities';
export declare function scanIdentifier(parser: Parser, context: Context, first?: number): Token;
export declare function scanMaybeIdentifier(parser: Parser, context: Context, first: number): Token;
