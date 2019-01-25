import { toHex, isDigit } from './common';
import { isIdentifierStart } from '../chars';
import { report } from '../errors';
export function returnBigIntOrNumericToken(state) {
    if (state.source.charCodeAt(state.index) === 110) {
        if (state.flags & 4)
            report(state, 38);
        state.index++;
        state.column++;
        return 116;
    }
    else {
        if ((state.flags & (16 | 8)) === 0)
            state.tokenValue = +state.tokenValue;
        return 131074;
    }
}
export function scanNumeric(state, context) {
    let { index, column } = state;
    while (isDigit(state.source.charCodeAt(index))) {
        index++;
        column++;
    }
    if (state.source.charCodeAt(index) === 46) {
        index++;
        column++;
        state.flags = 4;
        while (isDigit(state.source.charCodeAt(index))) {
            index++;
            column++;
        }
    }
    let end = index;
    switch (state.source.charCodeAt(index)) {
        case 69:
        case 101: {
            index++;
            column++;
            state.flags = 4;
            if (state.source.charCodeAt(index) === 43 || state.source.charCodeAt(index) === 45) {
                index++;
                column++;
            }
            if (!isDigit(state.source.charCodeAt(index)))
                report(state, 36);
            index++;
            column++;
            while (isDigit(state.source.charCodeAt(index))) {
                index++;
                column++;
            }
            end = index;
        }
        default:
    }
    const code = state.source.charCodeAt(index);
    if (code !== 110 && (isDigit(code) || isIdentifierStart(code)))
        report(state, 37);
    state.index = index;
    state.column = column;
    state.tokenValue = state.source.slice(state.startIndex, end);
    if (context & 8)
        state.tokenRaw = state.tokenValue;
    return returnBigIntOrNumericToken(state);
}
export function scanHexIntegerLiteral(state) {
    let { index, column } = state;
    let value = toHex(state.source.charCodeAt(index));
    if (value < 0)
        report(state, 0);
    index++;
    column++;
    while (index < state.length) {
        const digit = toHex(state.source.charCodeAt(index));
        if (digit < 0)
            break;
        value = value * 16 + digit;
        index++;
        column++;
    }
    state.index = index;
    state.column = column;
    state.tokenValue = value;
    return returnBigIntOrNumericToken(state);
}
export function scanBinaryOrOctalDigits(state, base) {
    let { index, column } = state;
    let value = 0;
    let numberOfDigits = 0;
    while (index < state.length) {
        const ch = state.source.charCodeAt(index);
        const converted = ch - 48;
        if (!(ch >= 48 && ch <= 57) || converted >= base)
            break;
        value = value * base + converted;
        index++;
        column++;
        numberOfDigits++;
    }
    if (numberOfDigits === 0)
        report(state, 39, '' + base);
    state.flags |= 16;
    state.index = index;
    state.column = column;
    state.tokenValue = value;
    return returnBigIntOrNumericToken(state);
}
export function scanImplicitOctalDigits(state, context) {
    if ((context & 1024) !== 0)
        report(state, 40);
    let { index, column } = state;
    let code = 0;
    while (index < state.length) {
        const next = state.source.charCodeAt(index);
        if (next < 48 || next > 55) {
            state.flags |= 4;
            return scanNumeric(state, context);
        }
        else {
            code = code * 8 + (next - 48);
            index++;
            column++;
        }
    }
    state.flags |= 8;
    state.index = index;
    state.column = column;
    state.tokenValue = code;
    return 131074;
}
//# sourceMappingURL=numeric.js.map