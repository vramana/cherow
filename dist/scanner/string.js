import { report } from '../errors';
import { fromCodePoint, toHex, nextChar, scanNext } from './common';
export function scanStringLiteral(state, context, quote) {
    const { index: start, lastChar } = state;
    let ret = '';
    let ch = scanNext(state, 34);
    while (ch !== quote) {
        if ((ch & 8) === 8) {
            if (ch === 92) {
                ch = scanNext(state, 34);
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    state.lastChar = ch;
                    const code = table[ch](state, context, ch);
                    if (code >= 0)
                        ret += fromCodePoint(code);
                    else
                        reportInvalidEscapeError(state, code);
                    ch = state.lastChar;
                }
            }
            else if (((ch & 83) < 3 && ch === 13) || ch === 10) {
                report(state, 0);
            }
            else
                ret += fromCodePoint(ch);
        }
        else
            ret += fromCodePoint(ch);
        ch = scanNext(state, 34);
    }
    state.index++;
    state.column++;
    if (context & 8)
        state.tokenRaw = state.source.slice(start, state.index);
    state.tokenValue = ret;
    state.lastChar = lastChar;
    return 131075;
}
export const table = new Array(128).fill(nextChar);
table[98] = () => 8;
table[102] = () => 12;
table[114] = () => 13;
table[110] = () => 10;
table[116] = () => 9;
table[118] = () => 11;
table[13] = state => {
    state.column = -1;
    state.line++;
    const { index } = state;
    if (index < state.source.length) {
        const ch = state.source.charCodeAt(index);
        if (ch === 10) {
            state.lastChar = ch;
            state.index = index + 1;
        }
    }
    return -1;
};
table[10] = table[8232] = table[8233] = state => {
    state.column = -1;
    state.line++;
    return -1;
};
table[48] = table[49] = table[50] = table[51] = (state, context, first) => {
    let code = first - 48;
    let index = state.index + 1;
    let column = state.column + 1;
    if (index < state.source.length) {
        const next = state.source.charCodeAt(index);
        if (next < 48 || next > 55) {
            if (code !== 0 || next === 56 || next === 57) {
                if (context & 1024)
                    return -2;
                state.flags = state.flags | 8;
            }
        }
        else if (context & 1024) {
            return -2;
        }
        else {
            state.flags = state.flags | 8;
            state.lastChar = next;
            code = code * 8 + (next - 48);
            index++;
            column++;
            if (index < state.source.length) {
                const next = state.source.charCodeAt(index);
                if (next >= 48 && next <= 55) {
                    state.lastChar = next;
                    code = code * 8 + (next - 48);
                    index++;
                    column++;
                }
            }
            state.index = index - 1;
            state.column = column - 1;
        }
    }
    return code;
};
table[52] = table[53] = table[54] = table[55] = (state, context, first) => {
    if (context & 1024)
        return -2;
    let code = first - 48;
    const index = state.index + 1;
    const column = state.column + 1;
    if (index < state.source.length) {
        const next = state.source.charCodeAt(index);
        if (next >= 48 && next <= 55) {
            code = code * 8 + (next - 48);
            state.lastChar = next;
            state.index = index;
            state.column = column;
        }
    }
    return code;
};
table[56] = table[57] = () => -3;
table[120] = state => {
    const ch1 = (state.lastChar = scanNext(state, 31));
    const hi = toHex(ch1);
    if (hi < 0)
        return -4;
    const ch2 = (state.lastChar = scanNext(state, 31));
    const lo = toHex(ch2);
    if (lo < 0)
        return -4;
    return hi * 16 + lo;
};
table[117] = state => {
    let ch = (state.lastChar = scanNext(state, 10));
    if (ch === 123) {
        ch = state.lastChar = scanNext(state, 10);
        let code = toHex(ch);
        if (code < 0)
            return -4;
        ch = state.lastChar = scanNext(state, 10);
        while (ch !== 125) {
            const digit = toHex(ch);
            if (digit < 0)
                return -4;
            code = code * 16 + digit;
            if (code > 0x10fff)
                return -5;
            ch = state.lastChar = scanNext(state, 10);
        }
        return code;
    }
    else {
        let code = toHex(ch);
        if (code < 0)
            return -4;
        for (let i = 0; i < 3; i++) {
            ch = state.lastChar = scanNext(state, 10);
            const digit = toHex(ch);
            if (digit < 0)
                return -4;
            code = code * 16 + digit;
        }
        return code;
    }
};
export function reportInvalidEscapeError(state, code) {
    switch (code) {
        case -2:
            return report(state, 33);
        case -3:
            return report(state, 32);
        case -4:
            return report(state, 31);
        case -5:
            return report(state, 30);
        default:
            return;
    }
}
//# sourceMappingURL=string.js.map