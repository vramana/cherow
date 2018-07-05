import { Context } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import {  recordStringErrors, table } from './string';
import { report, Errors } from '../errors';
import { fromCodePoint, Escape, nextUnicodeChar } from './common';

// Note! This will be refactored once I start with the parser. - K.F

// Note: This can be optimized further, but not in the same way as string literal.
// If we try that, we loose around 300ms

export function readNext(state: ParserState, ch: number): number {
  state.index++;
  state.column++;
  if (ch > 0xFFFF) state.index++;
  if (state.index >= state.length) report(state, Errors.Unexpected);
  return state.nextChar = nextUnicodeChar(state);
}
/**
 * Scan template
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first Codepoint
 */
export function scanTemplate(parser: ParserState, context: Context): Token {
  const { index: start, nextChar: first } = parser;
  let tail = true;
  let ret: string | void = '';

  let ch = readNext(parser, first);

  loop:
      while (ch !== Chars.Backtick) {

          switch (ch) {

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

                  if (ch >= Chars.MaxAsciiCharacter) {
                      ret += fromCodePoint(ch);
                  } else {
                      const code = table[ch](parser, context);

                      if (code >= 0) {
                          ret += fromCodePoint(code);
                      } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                          ret = undefined;
                          ch = scanLooserTemplateSegment(parser, parser.nextChar);
                          if (ch < 0) {
                              ch = -ch;
                              tail = false;
                          }
                          break loop;
                      } else {
                          recordStringErrors(parser, code as Escape);
                      }
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
  (parser.tokenValue as any) = ret;

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
export function consumeTemplateBrace(parser: ParserState, context: Context): Token {
  if (parser.index >= parser.length) report(parser, Errors.UnterminatedString);
  // Upon reaching a '}', consume it and rewind the scanner state
  parser.index--;
  parser.column--;
  return scanTemplate(parser, context);
}

/**
 * Scan looser template segment
 *
 * @param parser Parser object
 * @param ch codepoint
 */
function scanLooserTemplateSegment(parser: ParserState, ch: number): number {
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
