import { report } from '../errors';
import { consumeOpt, consumeLineFeed } from './common';
export const CommentTypes = ['SingleLine', 'MultiLine', 'HTMLOpen', 'HTMLClose', 'HashbangComment'];
export function skipHashBang(state, context) {
    let index = state.index;
    if (index === state.source.length)
        return;
    if (state.source.charCodeAt(index) === 65519) {
        index++;
        state.index = index;
    }
    if (context & 1 && index < state.source.length && state.source.charCodeAt(index) === 35) {
        index++;
        if (index < state.source.length && state.source.charCodeAt(index) === 33) {
            state.index = index + 1;
            skipSingleLineComment(state, 4);
        }
        else {
            report(state, 0);
        }
    }
}
export function skipSingleHTMLComment(state, context, type) {
    if (context & 2048)
        report(state, 28);
    return skipSingleLineComment(state, type);
}
export function skipSingleLineComment(state, type) {
    const { index: start } = state;
    while (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if ((next & 8) === 8 && (next & 83) < 3) {
            if (next === 13) {
                ++state.index;
                state.column = 0;
                ++state.line;
                if (state.index < state.length && state.source.charCodeAt(state.index) === 10)
                    state.index++;
                state.flags |= 1;
                break;
            }
            else if (next === 10 || (next ^ 8233) <= 1) {
                ++state.index;
                state.column = 0;
                ++state.line;
                state.flags |= 1;
                break;
            }
            else {
                ++state.index;
                ++state.column;
            }
        }
        else {
            ++state.index;
            ++state.column;
        }
    }
    if (state.onComment)
        state.onComment(CommentTypes[type & 0xff], state.source.slice(start, state.index), start, state.index);
    return 1073741824;
}
export function skipBlockComment(state) {
    const { index: start } = state;
    while (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (next === 42) {
            state.index++;
            state.column++;
            state.flags &= ~2;
            if (consumeOpt(state, 47)) {
                if (state.onComment)
                    state.onComment(CommentTypes[1 & 0xff], state.source.slice(start, state.index - 2), start, state.index);
                return 1073741824;
            }
        }
        else if ((next & 8) === 8) {
            if ((next & 83) < 3 && next === 13) {
                state.flags |= 1 | 2;
                state.index++;
                state.column = 0;
                state.line++;
            }
            else if (next === 10) {
                consumeLineFeed(state, (state.flags & 2) !== 0);
                state.flags = (state.flags & ~2) | 1;
            }
            else if ((next ^ 8233) <= 1) {
                state.flags = (state.flags & ~2) | 1;
                state.index++;
                state.column = 0;
                state.line++;
            }
            else {
                state.flags &= ~2;
                state.index++;
                state.column++;
            }
        }
        else {
            state.flags &= ~2;
            state.index++;
            state.column++;
        }
    }
    return report(state, 27);
}
//# sourceMappingURL=comments.js.map