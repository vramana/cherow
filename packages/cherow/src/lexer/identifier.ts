import { Parser } from '../types';
import { Chars } from '../chars';
import { Token, descKeyword } from '../token';
import { Context, Flags } from '../common';
import { isValidIdentifierStart } from '../unicode';
import { advanceNewline, nextUnicodeChar, escapeInvalidCharacters, isIdentifierPart } from './common';
import { Errors, report } from '../errors';

export function scanIdentifier(parser: Parser, context: Context, code: number): Token {
    const { index: start } = parser;
    let c = context;
    while (parser.index < parser.length && isIdentifierPart(code)) {
        parser.index++; parser.column++;
        code = parser.source.charCodeAt(parser.index);
    }
    parser.tokenValue = parser.source.slice(start, parser.index);
    return getIdentifierToken(parser);
}

function getIdentifierToken(parser: Parser): Token {
  const len = parser.tokenValue.length;
  if (len >= 2 && len <= 11) {
    const token = descKeyword(parser.tokenValue);
    if (token > 0) {
        return token;
    }
}
  return Token.Identifier;
}

export function scanMaybeIdentifier(parser: Parser, context: Context, first: number): Token {

    switch (first) {

        case Chars.LineSeparator:
        case Chars.ParagraphSeparator:
            advanceNewline(parser, first);
            parser.flags |= Flags.NewLine;
            return Token.WhiteSpace;

        case Chars.ByteOrderMark:
        case Chars.NonBreakingSpace:
        case Chars.Ogham:
        case Chars.EnQuad:
        case Chars.EmQuad:
        case Chars.EnSpace:
        case Chars.EmSpace:
        case Chars.ThreePerEmSpace:
        case Chars.FourPerEmSpace:
        case Chars.SixPerEmSpace:
        case Chars.FigureSpace:
        case Chars.PunctuationSpace:
        case Chars.ThinSpace:
        case Chars.HairSpace:
        case Chars.NarrowNoBreakSpace:
        case Chars.MathematicalSpace:
        case Chars.IdeographicSpace:
        case Chars.Zwnbs:
        case Chars.Zwj:
            parser.index++; parser.column++;
            return Token.WhiteSpace;
        default:
            first = nextUnicodeChar(parser);
            if (!isValidIdentifierStart(first)) {
                report(parser, Errors.Unexpected, escapeInvalidCharacters(first));
            }
            return scanIdentifier(parser, context, first);
    }
}
