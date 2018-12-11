import { State } from '../state';
import { Context } from '../common';
import { Chars } from '../chars';
import { consume } from '../lexer/common';
import { RegexpState } from '../runtime/common';
import { verifyRegExpPattern } from '../lexer/regexp';
import { Errors, report, } from '../errors';

/**
 * Validate regular expressions
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 */
export function validateRegExp(source: string): boolean {
  const parser = new State(source, undefined, undefined);
  if (!consume(parser, Chars.Slash)) report(parser, Errors.InvalidRegularExp);
  const { state } = verifyRegExpPattern(parser, Context.Empty);
  if (state === RegexpState.Invalid) report(parser, Errors.InvalidRegularExp);
  return (state === RegexpState.Valid) ? true : false;
}
