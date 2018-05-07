import { Parser, Location } from '../../../cherow/src/types';
import { Token } from '../../../cherow/src/token';
import { parseExpression } from '../../../cherow/src/parser/expressions';
import * as ESTree from '../../../cherow/src/estree';
import { Context, Flags, getLocation, consume, finishNode, expect, consumeSemicolon, nextToken } from '../../../cherow/src/utilities';

/**
 * Parses expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseExpressionStatement(parser: Parser, context: Context): ESTree.ExpressionStatement {
  const pos = getLocation(parser);
  const expr: ESTree.Expression = parseExpression(parser, context & ~Context.AllowDecorator | Context.AllowIn);
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
      type: 'ExpressionStatement',
      expression: expr,
  });
}
