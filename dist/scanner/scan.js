import { consumeOpt, consumeLineFeed } from './common';
import { skipBlockComment, skipSingleLineComment, skipSingleHTMLComment } from './comments';
import { scanStringLiteral } from './string';
import { scanTemplate } from './template';
import { scanRegularExpression } from './regexp';
import { scanNumeric, scanHexIntegerLiteral, scanBinaryOrOctalDigits, scanImplicitOctalDigits } from './numeric';
import { scanIdentifier, scanIdentifierOrKeyword, scanMaybeIdentifier, scanPrivateName } from './identifier';
const OneCharPunc = new Array(128).fill(0);
const table = new Array(0xffff).fill(scanMaybeIdentifier, 0x80);
function scanChar(state, _, first) {
    state.index++;
    state.column++;
    return OneCharPunc[first];
}
table[35] = scanPrivateName;
table[36] = scanIdentifier;
table[34] = scanStringLiteral;
table[39] = scanStringLiteral;
table[40] = scanChar;
OneCharPunc[40] = 131083;
table[41] = scanChar;
OneCharPunc[41] = 16;
for (let i = 49; i <= 57; i++) {
    table[i] = scanNumeric;
}
table[58] = scanChar;
OneCharPunc[58] = 21;
table[59] = scanChar;
OneCharPunc[59] = 536870929;
table[48] = (state, context) => {
    const index = state.index + 1;
    if (index < state.length) {
        const next = state.source.charCodeAt(index);
        if (next === 88 || next === 120) {
            state.index = index + 1;
            state.column += 2;
            return scanHexIntegerLiteral(state);
        }
        else if (next === 66 || next === 98) {
            state.index = index + 1;
            state.column += 2;
            return scanBinaryOrOctalDigits(state, 2);
        }
        else if (next === 79 || next === 111) {
            state.index = index + 1;
            state.column += 2;
            return scanBinaryOrOctalDigits(state, 8);
        }
        else if (index < state.length && (next >= 48 && next <= 57)) {
            return scanImplicitOctalDigits(state, context);
        }
    }
    return scanNumeric(state, context);
};
table[33] = state => {
    state.index++;
    state.column++;
    if (consumeOpt(state, 61)) {
        if (consumeOpt(state, 61)) {
            return 16909882;
        }
        return 16909884;
    }
    return 33685549;
};
table[37] = state => {
    state.index++;
    state.column++;
    return consumeOpt(state, 61) ? 8388646 : 16910900;
};
table[38] = state => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (next === 38) {
            state.index++;
            state.column++;
            return 16974391;
        }
        else if (next === 61) {
            state.index++;
            state.column++;
            return 8388649;
        }
    }
    return 16909636;
};
table[42] = state => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (next === 42) {
            state.index++;
            state.column++;
            return consumeOpt(state, 61) ? 8388641 : 16911158;
        }
        else if (next === 61) {
            state.index++;
            state.column++;
            return 8388644;
        }
    }
    return 21105203;
};
table[43] = state => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (next === 43) {
            state.index++;
            state.column++;
            return 67239963;
        }
        else if (next === 61) {
            state.index++;
            state.column++;
            return 8388642;
        }
    }
    return 50465071;
};
table[44] = scanChar;
OneCharPunc[44] = 18;
table[45] = (state, context) => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (next === 45) {
            state.index++;
            state.column++;
            if ((context & 16) === 0 &&
                ((state.flags & 1 || state.startIndex === 0) && consumeOpt(state, 62))) {
                return skipSingleHTMLComment(state, context, 3);
            }
            return 67239964;
        }
        else if (next === 61) {
            state.index++;
            state.column++;
            return 8388643;
        }
    }
    return 50465072;
};
table[46] = (state, context) => {
    let index = state.index + 1;
    if (index < state.length) {
        const next = state.source.charCodeAt(index);
        if (next === 46) {
            index++;
            if (index < state.length && state.source.charCodeAt(index) === 46) {
                state.index = index + 1;
                state.column += 3;
                return 14;
            }
        }
        else if (next >= 48 && next <= 57) {
            scanNumeric(state, context);
            return 131074;
        }
    }
    state.index++;
    state.column++;
    return 13;
};
table[47] = (state, context) => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (context & 32768 && (next !== 42 && next !== 47)) {
            return scanRegularExpression(state, context);
        }
        else if (next === 47) {
            state.index++;
            state.column++;
            return skipSingleLineComment(state, 0);
        }
        else if (next === 42) {
            state.index++;
            state.column++;
            return skipBlockComment(state);
        }
        else if (next === 61) {
            state.index++;
            state.column++;
            return 8519717;
        }
        else if (next === 62) {
            state.index++;
            state.column++;
            return 26;
        }
    }
    return 16910901;
};
table[60] = (state, context) => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        switch (state.source.charCodeAt(state.index)) {
            case 60:
                state.index++;
                state.column++;
                return consumeOpt(state, 61) ? 8388638 : 16910401;
            case 61:
                state.index++;
                state.column++;
                return 16910141;
            case 33: {
                const index = state.index + 1;
                const next = state.source.charCodeAt(index);
                if (next === 45 && state.source.charCodeAt(index + 1) === 45) {
                    state.index = index;
                    state.column++;
                    return skipSingleHTMLComment(state, context, 2);
                }
            }
            case 47: {
                if (!(context & 4))
                    break;
                const index = state.index + 1;
                if (index < state.length) {
                    const next = state.source.charCodeAt(index);
                    if (next === 42 || next === 47)
                        break;
                }
                state.index++;
                state.column++;
                return 25;
            }
            default:
        }
    }
    return 16910143;
};
table[61] = state => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (next === 61) {
            state.index++;
            state.column++;
            return consumeOpt(state, 61) ? 16909881 : 16909883;
        }
        else if (next === 62) {
            state.index++;
            state.column++;
            return 131082;
        }
    }
    return 8388637;
};
table[62] = state => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (next === 62) {
            state.index++;
            state.column++;
            if (state.index < state.length) {
                const next = state.source.charCodeAt(state.index);
                if (next === 62) {
                    state.index++;
                    state.column++;
                    return consumeOpt(state, 61) ? 8388640 : 16910403;
                }
                else if (next === 61) {
                    state.index++;
                    state.column++;
                    return 8388639;
                }
            }
            return 16910402;
        }
        else if (next === 61) {
            state.index++;
            state.column++;
            return 16910142;
        }
    }
    return 16910144;
};
table[63] = scanChar;
OneCharPunc[63] = 22;
for (let i = 65; i <= 90; i++) {
    table[i] = scanIdentifier;
}
for (let i = 97; i <= 122; i++) {
    table[i] = scanIdentifierOrKeyword;
}
table[91] = scanChar;
OneCharPunc[91] = 131091;
table[92] = scanIdentifierOrKeyword;
table[93] = scanChar;
OneCharPunc[93] = 20;
table[95] = scanIdentifier;
table[96] = scanTemplate;
table[123] = scanChar;
OneCharPunc[123] = 131084;
table[125] = scanChar;
OneCharPunc[125] = 536870927;
table[126] = scanChar;
OneCharPunc[126] = 33685550;
table[94] = state => {
    state.index++;
    state.column++;
    return consumeOpt(state, 61) ? 8388647 : 16909382;
};
table[124] = state => {
    state.index++;
    state.column++;
    if (state.index < state.length) {
        const next = state.source.charCodeAt(state.index);
        if (next === 124) {
            state.index++;
            state.column++;
            return 16974136;
        }
        else if (next === 61) {
            state.index++;
            state.column++;
            return 8388648;
        }
    }
    return 16909125;
};
table[32] = table[9] = table[12] = table[11] = state => {
    state.index++;
    state.column++;
    return 1073741824;
};
table[10] = state => {
    consumeLineFeed(state, (state.flags & 2) > 0);
    state.flags = (state.flags & ~2) | 1;
    return 1073741824;
};
table[13] = state => {
    state.flags |= 1 | 2;
    state.index++;
    state.column = 0;
    state.line++;
    return 1073741824;
};
export function next(state, context) {
    state.flags &= ~1;
    while (state.index < state.length) {
        state.startIndex = state.index;
        const first = state.source.charCodeAt(state.index);
        if (((state.token = table[first](state, context, first)) & 1073741824) !== 1073741824) {
            if (state.onToken)
                state.onToken(state.token, state.startIndex, state.index);
            return state.token;
        }
    }
    return (state.token = 536870912);
}
//# sourceMappingURL=scan.js.map