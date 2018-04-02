import * as ESTree from './estree';
import { Chars } from './chars';
import { Errors, report } from './errors';
import { Parser } from './types';
import { Token, tokenDesc } from './token';
import { scan } from './scanner';
import {
    ScannerState,
    nextChar,
    hasNext,
    advanceNewline,
    advance,
    consumeLineFeed,
    advanceAndOrSkipUC,
    consumeOpt,
    Flags,
    Context
} from './utilities';

// 11.4 Comments

// TODO
//
// - Collecting of comments
// - Comment injection into the AST

/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param parser Parser instance
 * @param state  Scanner state
 */
export function skipSingleLineComment(parser: Parser, state: ScannerState): ScannerState {

    const start = parser.index;

    scan:
        while (hasNext(parser)) {
            switch (nextChar(parser)) {
                case Chars.CarriageReturn:
                    advanceNewline(parser);
                    if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) {
                        parser.index++;
                    }
                    break scan;
                case Chars.LineFeed:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    advanceNewline(parser);
                    break scan;
                default:
                    advanceAndOrSkipUC(parser);
            }
        }

    return state;
}

/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param parser
 * @param state
 */
export function skipMultiLineComment(parser: Parser, state: ScannerState): ScannerState {

    const start = parser.index;

    scan:
        while (hasNext(parser)) {
            switch (nextChar(parser)) {
                case Chars.Asterisk:
                    advance(parser);
                    state &= ~ScannerState.LastIsCR;
                    if (consumeOpt(parser, Chars.Slash)) {
                        state |= ScannerState.Terminated;
                        break scan;
                    }
                    break;

                // Mark multiline comments containing linebreaks as new lines
                // so we can perfectly handle edge cases like: '1/*\n*/--> a comment'
                case Chars.CarriageReturn:
                    state |= ScannerState.NewLine | ScannerState.LastIsCR;
                    advanceNewline(parser);
                    break;

                case Chars.LineFeed:
                    consumeLineFeed(parser, state);
                    state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                    break;

                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                    advanceNewline(parser);
                    break;

                default:
                    state &= ~ScannerState.LastIsCR;
                    advanceAndOrSkipUC(parser);
            }
        }

    if (!(state & ScannerState.Terminated)) report(parser, Errors.UnterminatedComment);

    return state;
}

export function addComment(parser: Parser, context: Context, state: ScannerState, commentStart: number) {

}

export function attachComment(parser: Parser, context: Context, state: ScannerState, commentStart: number) {
    // TODO
}