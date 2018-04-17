import * as ESTree from './estree';
import { Chars } from './chars';
import { Errors, report, tolerant } from './errors';
import { Parser, Options, CommentType } from './types';
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
export function skipSingleLineComment(parser: Parser, context: Context, state: ScannerState, type: CommentType): ScannerState {

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

    if (context & (Context.OptionsComments | context & Context.OptionsDelegate)) {
        addComment(parser, context, type, state, start);
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
export function skipMultiLineComment(parser: Parser, context: Context, state: ScannerState): any {

    const start = parser.index;

    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case Chars.Asterisk:
                advance(parser);
                state &= ~ScannerState.LastIsCR;
                if (consumeOpt(parser, Chars.Slash)) {
                    if (context & (Context.OptionsComments | context & Context.OptionsDelegate)) {
                        addComment(parser, context, 'Multiline', state, start);
                    }
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
                advanceAndOrSkipUC(parser);
        }
    }

    tolerant(parser, context, Errors.UnterminatedComment);
}

export function addComment(parser: Parser, context: Context, type: any, state: ScannerState, start: number) {
    const { index, startIndex, startLine, startColumn, lastLine, column } = parser;

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