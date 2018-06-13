import { Parser } from '../types';
import { Token } from '../token';
import { Context } from '../common';
export declare function scanIdentifier(parser: Parser, context: Context, code: number): Token;
export declare function scanMaybeIdentifier(parser: Parser, context: Context, first: number): Token;
