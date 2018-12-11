import { parseSource, parse, parseModule, parseScript } from './parser/parser';
import * as ESTree from './estree';
import * as Scanner from './lexer/index';
import { validateRegExp } from './runtime/validateRegExp';

export const version = '__VERSION__';

export { ESTree, Scanner, parseSource, parse, parseModule, parseScript, validateRegExp };
export * from './errors';
export * from './token';
export * from './types';
export * from './unicode';
export * from './common';
