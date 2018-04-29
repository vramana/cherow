import * as ESTree from '../estree';
import { Chars } from '../chars';
import { Errors, tolerant } from '../errors';
import { Parser, CommentType } from '../types';
import { Context, ScannerState } from '../utilities';
import {
    consumeLineFeed,
    consumeOpt,
    nextChar,
    hasNext,
    advanceNewline,
    advance,
} from './common';

// 11.4 Comments

/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param state  Scanner state
 * @param type   Comment type
 */

export function skipSingleLineComment(
    parser: Parser,
    context: Context,
    state: ScannerState,
    type: CommentType
): ScannerState {
    const start = parser.index;
    const collectable = !!(context & (Context.OptionsComments | context & Context.OptionsDelegate));
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.CarriageReturn:
                advanceNewline(parser);
                if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) parser.index++;
                return state | ScannerState.NewLine;
            case Chars.LineFeed:
            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                advanceNewline(parser);
                if (collectable) addComment(parser, context, type, start);
                return state | ScannerState.NewLine;

            default:
                advance(parser);
        }
    }

    if (collectable) addComment(parser, context, type, start);

    return state;
}

/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param parser
 * @param context Context masks
 * @param state
 */
export function skipMultiLineComment(
    parser: Parser,
    context: Context,
    state: ScannerState): any {

    const start = parser.index;
    const collectable = !!(context & (Context.OptionsComments | context & Context.OptionsDelegate));

    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.Asterisk:
                advance(parser);
                state &= ~ScannerState.LastIsCR;
                if (consumeOpt(parser, Chars.Slash)) {
                    if (collectable) addComment(parser, context, 'Multiline', start);
                    return state;
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
                advance(parser);
        }
    }

    tolerant(parser, context, Errors.UnterminatedComment);
}

export function addComment(parser: Parser, context: Context, type: any, start: number) {
    const {index, startIndex, startLine, startColumn, lastLine, column} = parser;
    const comment: ESTree.Comment = {
        type,
        value: parser.source.slice(start, type === 'MultiLine' ? index - 2 : index),
        start: startIndex,
        end: index,
    };

    if (context & Context.OptionsLoc) {
        comment.loc = {
            start: {
                line: startLine,
                column: startColumn,
            },
            end: {
                line: lastLine,
                column: column
            }
        };
    }

    if (context & Context.OptionsDelegate) {
        (parser.delegate as any)(comment, startIndex, index);
    }

    parser.comments.push(comment);
}
