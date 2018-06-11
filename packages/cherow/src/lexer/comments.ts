import { Token, tokenDesc } from '../token';
import { Context, Flags } from '../common';
import { consumeOpt, advanceNewline, skipToNewline, consumeLineFeed } from './common';
import { Chars } from '../chars';
import { Parser } from '../types';
import { Errors, recordErrors, } from '../errors';

export function skipSingleHTMLComment(parser: Parser, context: Context): Token {
   if (context & Context.Module) recordErrors(parser, context, Errors.HtmlCommentInModule);
   skipSingleLineComment(parser);
   return Token.HTMLComment;
}

export function skipSingleLineComment(parser: Parser): boolean {
  while (parser.index < parser.length) {
      const ch = parser.source.charCodeAt(parser.index);
      switch (ch) {
          case Chars.CarriageReturn:
          case Chars.LineFeed:
          case Chars.LineSeparator:
          case Chars.ParagraphSeparator:
              advanceNewline(parser, ch);
              return true;
          default:
              parser.index++;
              parser.column++;
      }
  }

  return false;
}

export function skipMultilineComment(parser: Parser): any {
    while (parser.index < parser.length) {
        const ch = parser.source.charCodeAt(parser.index);
        switch (ch) {
            case Chars.Asterisk:
                parser.index++; parser.column++;
                if (consumeOpt(parser, Chars.Slash)) return Token.MultiComment;
                break;
            case Chars.CarriageReturn: case Chars.LineFeed: case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                advanceNewline(parser, ch);
                break;

            default:
                 parser.index++; parser.column++;
        }
    }
}
