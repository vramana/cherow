import { Parser } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { Context, Flags } from '../common';
import { readNext, fromCodePoint, Escape, recordStringErrors } from './common';
import { Errors, report } from '../errors';
import { table } from './string';

/**
 * Scan template
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first Codepoint
 */
export function scanTemplate(parser: Parser, context: Context, first: number): Token {
  const { index: start, lastValue } = parser;
  let tail = true;
  let ret: string | void = '';

  let ch = readNext(parser, first);

  loop:
      while (ch !== Chars.Backtick) {

          switch (ch) {
              // Break after a literal `${` (thus the dedicated code path).
              case Chars.Dollar:
                  {
                      const index = parser.index + 1;
                      if (index < parser.source.length &&
                          parser.source.charCodeAt(index) === Chars.LeftBrace) {
                          parser.index = index;
                          parser.column++;
                          tail = false;
                          break loop;
                      }
                      ret += '$';
                      break;
                  }

              case Chars.Backslash:
                  ch = readNext(parser, ch);

                  if (ch >= 128) {
                      ret += fromCodePoint(ch);
                  } else {
                      parser.lastValue = ch;
                      const code = table[ch](parser, context, ch);

                      if (code >= 0) {
                          ret += fromCodePoint(code);
                      } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                          ret = undefined;
                          ch = scanLooserTemplateSegment(parser, parser.lastValue);
                          if (ch < 0) {
                              ch = -ch;
                              tail = false;
                          }
                          break loop;
                      } else {
                          recordStringErrors(parser, code as Escape);
                      }
                      ch = parser.lastValue;
                  }

                  break;

              case Chars.CarriageReturn:
                  if (parser.index < parser.length && parser.source.charCodeAt(parser.index) === Chars.LineFeed) {
                      if (ret != null) ret += fromCodePoint(ch);
                      ch = parser.source.charCodeAt(parser.index);
                      parser.index++;
                  }
                  // falls through
              case Chars.LineFeed:
              case Chars.LineSeparator:
              case Chars.ParagraphSeparator:
                  parser.column = -1;
                  parser.line++;
                  // falls through
              default:
                  if (ret != null) ret += fromCodePoint(ch);
          }

          ch = readNext(parser, ch);
      }

  parser.index++;
  parser.column++;
  parser.tokenValue = ret;
  parser.lastValue = lastValue;

  if (tail) {
      parser.tokenRaw = parser.source.slice(start + 1, parser.index - 1);
      return Token.TemplateTail;
  } else {
      parser.tokenRaw = parser.source.slice(start + 1, parser.index - 2);
      return Token.TemplateCont;
  }
}

/**
* Consumes template brace
*
* @param parser Parser object
* @param context Context masks
*/

export function consumeTemplateBrace(parser: Parser, context: Context): Token {
  if (parser.index >= parser.length) report(parser, Errors.UnterminatedTemplate);
  // Upon reaching a '}', consume it and rewind the scanner state
  parser.index--;
  parser.column--;
  return scanTemplate(parser, context, Chars.RightBrace);
}

/**
* Scan looser template segment
*
* @param parser Parser object
* @param ch codepoint
*/
function scanLooserTemplateSegment(parser: Parser, ch: number): number {
  while (ch !== Chars.Backtick) {
      if (ch === Chars.Dollar && parser.source.charCodeAt(parser.index + 1) === Chars.LeftBrace) {
          parser.index++;
          parser.column++;
          return -ch;
      }

      // Skip '\' and continue to scan the template token to search
      // for the end, without validating any escape sequences
      ch = readNext(parser, ch);
  }

  return ch;
}
