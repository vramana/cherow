import { Token } from '../token';
import { Context } from '../common';
import { consumeOpt, advanceNewline } from './common';
import { Chars } from '../chars';
import { Parser } from '../types';
import { Errors, report } from '../errors';

export function skipSingleHTMLComment(parser: Parser, context: Context): Token {
   if (context & Context.Module) report(parser, Errors.HtmlCommentInModule);
   skipSingleLineComment(parser, Token.HTMLComment);
   return Token.HTMLComment;
}

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
