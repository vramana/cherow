import { ParserState } from './../types';
import { Context, consumeSemicolon, finishNode, getLocation } from '../common';
import { Token, KeywordDescTable } from '../token';
import { nextToken } from '../lexer/scan';
import * as ESTree from '../estree';
import { Errors, report } from '../errors';
import { parseBindingIdentifier, parseBindingIdentifierOrPattern } from './pattern';
import { parseExpression } from './expressions';

/**
 * Parse directive node
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive)
 *
 * @param parser Parser instance
 * @param context Context masks
 */
export function parseDirective(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  const directive = state.source.slice(state.startIndex + 1, state.index - 1);
  const expr = parseExpression(state, context);
  consumeSemicolon(state, context);
  return finishNode(state, context, pos, {
    type: 'ExpressionStatement',
    expression: expr,
    directive
  });
}
