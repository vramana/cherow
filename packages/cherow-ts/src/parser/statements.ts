import {
  Parser,
  Location,
  Token,
  ESTree,
  Context,
  Flags,
  getLocation,
  consume,
  finishNode,
  expect,
  consumeSemicolon,
  nextToken,
  IParser
} from 'cherow';

/**
 * Parses expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseExpressionStatement(parser: IParser, context: Context): ESTree.ExpressionStatement {
  const pos = getLocation(parser);
  const expr: ESTree.Expression = Parser.parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
    type: 'ExpressionStatement',
    expression: expr
  });
}
