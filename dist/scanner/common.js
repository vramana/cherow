import { report } from '../errors';
import { isIDContinue } from '../unicode';
export function scanNext(state, err) {
    state.index++;
    state.column++;
    if (state.index >= state.length)
        report(state, err);
    return state.source.charCodeAt(state.index);
}
export function isFlagStart(code) {
    return (isIDContinue(code) ||
        code === 92 ||
        code === 36 ||
        code === 95 ||
        code === 8204 ||
        code === 8205);
}
export function nextChar(parser) {
    return parser.source.charCodeAt(parser.index);
}
export function nextUnicodeChar(state) {
    let { index } = state;
    const hi = state.source.charCodeAt(index++);
    if (hi < 0xd800 || hi > 0xdbff)
        return hi;
    if (index === state.source.length)
        return hi;
    const lo = state.source.charCodeAt(index);
    if (lo < 0xdc00 || lo > 0xdfff)
        return hi;
    return ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
}
export function consumeAny(state) {
    const hi = state.source.charCodeAt(state.index++);
    let code = hi;
    if (hi >= 0xd800 && hi <= 0xdbff && state.index < state.length) {
        const lo = state.source.charCodeAt(state.index);
        if (lo >= 0xdc00 && lo <= 0xdfff) {
            code = ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
            state.index++;
        }
    }
    state.column++;
    return code;
}
export function consumeOpt(state, code) {
    if (state.source.charCodeAt(state.index) !== code)
        return false;
    state.index++;
    state.column++;
    return true;
}
export function consumeLineFeed(state, lastIsCR) {
    state.index++;
    if (!lastIsCR) {
        state.column = 0;
        state.line++;
    }
}
export function fromCodePoint(code) {
    if (code > 0xffff) {
        return String.fromCharCode(code >>> 10) + String.fromCharCode(code & 0x3ff);
    }
    else {
        return String.fromCharCode(code);
    }
}
export function toHex(code) {
    if (code < 48)
        return -1;
    if (code <= 57)
        return code - 48;
    if (code < 65)
        return -1;
    if (code <= 70)
        return code - 65 + 10;
    if (code < 97)
        return -1;
    if (code <= 102)
        return code - 97 + 10;
    return -1;
}
export function isDigit(ch) {
    return ch >= 48 && ch <= 57;
}
//# sourceMappingURL=common.js.map