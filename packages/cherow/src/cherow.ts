import { parse, parseModule, parseScript } from './parser/parser';
import * as ESTree from './estree';
import * as Scanner from './lexer/index';

export const version = '__VERSION__';

export { ESTree, Scanner, parse, parseModule, parseScript };
export * from './chars';
export * from './errors';
export * from './token';
export * from './types';
export * from './unicode';
export * from './utilities';
