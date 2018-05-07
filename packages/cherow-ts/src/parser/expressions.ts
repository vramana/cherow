import { Parser, Location } from '../../../cherow/src/types';
import * as ESTree from '../../../cherow/src/estree';
import { Context, Flags, getLocation, consume, finishNode, expect, consumeSemicolon, nextToken } from '../../../cherow/src/utilities';

/**
 * Parses identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Identifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

export function parseIdentifier(parser: Parser, context: Context): ESTree.Identifier {
  const pos = getLocation(parser);
  const name = parser.tokenValue;
  nextToken(parser, context | Context.TaggedTemplate);
  const node: any = finishNode(context, parser, pos, {
      type: 'Identifier',
      name,
      typeAnnotation: null
  });

  if (context & Context.OptionsRawidentifiers) node.raw = parser.tokenRaw;
  return node;
}
