import { descKeywordTable } from '../token';
import { isIdentifierStart, isIdentifierPart } from '../chars';
import { report } from '../errors';
import { fromCodePoint } from './common';
export function scanMaybeIdentifier(state, _, first) {
    switch (first) {
        case 160:
        case 5760:
        case 8192:
        case 8193:
        case 8194:
        case 8195:
        case 8196:
        case 8197:
        case 8198:
        case 8199:
        case 8200:
        case 8201:
        case 8202:
        case 8239:
        case 8287:
        case 12288:
        case 8205:
        case 8204:
            state.index++;
            state.column++;
            return 1073741824;
        case 8232:
        case 8233:
            state.flags = (state.flags & ~2) | 1;
            state.index++;
            state.column = 0;
            state.line++;
            return 1073741824;
    }
    report(state, 29, String.fromCharCode(first));
}
export function scanIdentifierOrKeyword(state, context) {
    let { index, column } = state;
    while (isIdentifierPart(state.source.charCodeAt(index))) {
        index++;
        column++;
    }
    state.tokenValue = state.source.slice(state.startIndex, index);
    if (state.source.charCodeAt(index) === 92) {
    }
    state.index = index;
    state.column = column;
    const len = state.tokenValue.length;
    if (len >= 2 && len <= 11) {
        const keyword = descKeywordTable[state.tokenValue];
        if (keyword !== undefined)
            return keyword;
    }
    if (context & 8)
        state.tokenRaw = state.source.slice(state.startIndex, index);
    return 405505;
}
export function scanIdentifier(state, context) {
    let { index, column } = state;
    while (isIdentifierPart(state.source.charCodeAt(index))) {
        index++;
        column++;
    }
    state.tokenValue = state.source.slice(state.startIndex, index);
    if (state.source.charCodeAt(index) === 92) {
    }
    state.index = index;
    state.column = column;
    if (context & 8)
        state.tokenRaw = state.source.slice(state.startIndex, index);
    return 405505;
}
export function scanPrivateName(state, _) {
    let { index, column } = state;
    index++;
    column++;
    const start = index;
    if (!isIdentifierStart(state.source.charCodeAt(index))) {
        report(state, 1, fromCodePoint(state.source.charCodeAt(index)));
    }
    while (isIdentifierStart(state.source.charCodeAt(index))) {
        index++;
        column++;
    }
    state.tokenValue = state.source.slice(start, index);
    state.index = index;
    state.column = column;
    return 119;
}
//# sourceMappingURL=identifier.js.map