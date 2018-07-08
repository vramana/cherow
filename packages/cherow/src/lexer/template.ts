import { Context } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { reportInvalidEscapeError, table, readNext } from './string';
import { report, Errors } from '../errors';
import { fromCodePoint, InvalidEscapeType } from './common';

/**
 * Scan template
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanTemplate(state: ParserState, context: Context): Token {
  const {index: start, nextChar} = state;
  let tail = true;
  let ret: string | void = '';

  let ch = readNext(state);

  loop:
  while (ch !== Chars.Backtick) {
      switch (ch) {
          // Break after a literal `${` (thus the dedicated code path).
          case Chars.Dollar: {
              const index = state.index + 1;
              if (index < state.source.length &&
                      state.source.charCodeAt(index) === Chars.LeftBrace) {
                  state.index = index;
                  state.column++;
                  tail = false;
                  break loop;
              }
              ret += '$';
              break;
          }

          case Chars.Backslash:
              ch = readNext(state);

              if (ch >= 0x80) {
                  ret += fromCodePoint(ch);
              } else {
                  state.nextChar = ch;
                  const code = table[state.nextChar](state, context);

                  if (code >= 0) {
                      ret += fromCodePoint(code);
                  } else if (code !== InvalidEscapeType.Empty && context & Context.TaggedTemplate) {
                      ret = undefined;
                      ch = scanLooserTemplateSegment(state, state.nextChar);
                      if (ch < 0) { ch = -ch; tail = false; }
                      break loop;
                  } else {
                    reportInvalidEscapeError(state, code as InvalidEscapeType);
                  }
                  ch = state.nextChar;
              }

              break;

          case Chars.CarriageReturn:
              if (state.index < state.length && state.source.charCodeAt(state.index) === Chars.LineFeed) {
                  if (ret != null) ret += fromCodePoint(ch);
                  ch = state.source.charCodeAt(state.index);
                  state.index++;
              }
              // falls through
          case Chars.LineFeed: case Chars.LineSeparator: case Chars.ParagraphSeparator:
              state.column = -1;
              state.line++;
              // falls through
          default:
              if (ret != null) ret += fromCodePoint(ch);
      }

      ch = readNext(state);
  }

  state.index++; // Consume the quote or opening brace
  state.column++;

  state.tokenValue = ret;

  state.nextChar = nextChar;
  if (tail) {
      state.tokenRaw = state.source.slice(start + 1, state.index - 1);
      return Token.TemplateTail;
  } else {
      state.tokenRaw = state.source.slice(start + 1, state.index - 2);
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
export function scanLooserTemplateSegment(parser: ParserState, ch: number): number {
  while (ch !== Chars.Backtick) {
      if (ch === Chars.Dollar && parser.source.charCodeAt(parser.index + 1) === Chars.LeftBrace) {
          parser.index++;
          parser.column++;
          return -ch;
      }

      // Skip '\' and continue to scan the template token to search
      // for the end, without validating any escape sequences
      ch = readNext(parser);
  }

  return ch;
}
