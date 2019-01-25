import { fromCodePoint, scanNext } from './common';
import { table, reportInvalidEscapeError } from './string';
import { report } from '../errors';
export function scanTemplate(state, context) {
    const { index: start, lastChar } = state;
    let tail = true;
    let ret = '';
    let ch = scanNext(state, 35);
    loop: while (ch !== 96) {
        switch (ch) {
            case 36: {
                if (state.index + 1 < state.source.length && state.source.charCodeAt(state.index + 1) === 123) {
                    state.index++;
                    state.column++;
                    tail = false;
                    break loop;
                }
                ret += '$';
                break;
            }
            case 92:
                ch = scanNext(state, 35);
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    state.lastChar = ch;
                    const code = table[ch](state, context, ch);
                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    }
                    else if (code !== -1 && context & 65536) {
                        ret = undefined;
                        ch = scanLooserTemplateSegment(state, state.lastChar);
                        if (ch < 0) {
                            ch = -ch;
                            tail = false;
                        }
                        break loop;
                    }
                    else {
                        reportInvalidEscapeError(state, code);
                    }
                    ch = state.lastChar;
                }
                break;
            case 13:
                if (state.index < state.length && state.source.charCodeAt(state.index) === 10) {
                    if (ret != null)
                        ret += fromCodePoint(ch);
                    ch = state.source.charCodeAt(state.index);
                    state.index++;
                }
            case 10:
            case 8232:
            case 8233:
                state.column = -1;
                state.line++;
            default:
                if (ret != null)
                    ret += fromCodePoint(ch);
        }
        ch = scanNext(state, 35);
    }
    state.index++;
    state.column++;
    state.tokenValue = ret;
    state.lastChar = lastChar;
    if (tail) {
        state.tokenRaw = state.source.slice(start + 1, state.index - 1);
        return 131081;
    }
    else {
        state.tokenRaw = state.source.slice(start + 1, state.index - 2);
        return 131080;
    }
}
function scanLooserTemplateSegment(state, ch) {
    while (ch !== 96) {
        if (ch === 36 && state.source.charCodeAt(state.index + 1) === 123) {
            state.index++;
            state.column++;
            return -ch;
        }
        ch = scanNext(state, 35);
    }
    return ch;
}
export function scanTemplateTail(state, context) {
    if (state.index >= state.length)
        return report(state, 0);
    state.index--;
    state.column--;
    return scanTemplate(state, context);
}
//# sourceMappingURL=template.js.map