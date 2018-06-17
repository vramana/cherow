import { Token } from '../token';
import { Context } from '../common';
import { consumeOpt, advanceNewline } from './common';
import { Chars } from '../chars';
import { Parser } from '../types';
import { Errors, report } from '../errors';

// 11.4 Comments
/**
 * Skips single HTML comments. Same behavior as in V8.
 *
 * @param parser Parser Object
 * @param context Context masks.
 */
export function skipSingleHTMLComment(parser: Parser, context: Context): Token {
   if (context & Context.Module) report(parser, Errors.HtmlCommentInModule);
   skipSingleLineComment(parser, Token.HTMLComment);
   return Token.HTMLComment;
}

/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param parser Parser object
 * @param returnToken Token to be returned
 */
export function skipSingleLineComment(parser: Parser, returnToken: Token = Token.SingleComment): Token {

  while (parser.index < parser.length) {
      const ch = parser.source.charCodeAt(parser.index);
      switch (ch) {
          case Chars.CarriageReturn:
          case Chars.LineFeed:
          case Chars.LineSeparator:
          case Chars.ParagraphSeparator:
              advanceNewline(parser, ch);
              return returnToken;
          default:
              parser.index++;
              parser.column++;
      }
  }

  return returnToken;
}

/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param parser Parser object
 */
export function skipMultilineComment(parser: Parser): any {
    while (parser.index < parser.length) {
        const ch = parser.source.charCodeAt(parser.index);
        switch (ch) {
            case Chars.Asterisk:
                parser.index++; parser.column++;
                if (consumeOpt(parser, Chars.Slash)) return Token.MultiComment;
                break;
            case Chars.CarriageReturn:
            case Chars.LineFeed:
            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                advanceNewline(parser, ch);
                break;
            default:
                 parser.index++; parser.column++;
        }
    }

    report(parser, Errors.Unexpected);
}
