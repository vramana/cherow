import { isIdentifierPart } from '../chars';
import { report } from '../errors';
import { fromCodePoint } from './common';
export var RegexState;
(function (RegexState) {
    RegexState[RegexState["Empty"] = 0] = "Empty";
    RegexState[RegexState["Escape"] = 1] = "Escape";
    RegexState[RegexState["Class"] = 2] = "Class";
})(RegexState || (RegexState = {}));
export var RegexFlags;
(function (RegexFlags) {
    RegexFlags[RegexFlags["Empty"] = 0] = "Empty";
    RegexFlags[RegexFlags["IgnoreCase"] = 1] = "IgnoreCase";
    RegexFlags[RegexFlags["Global"] = 2] = "Global";
    RegexFlags[RegexFlags["Multiline"] = 4] = "Multiline";
    RegexFlags[RegexFlags["Unicode"] = 8] = "Unicode";
    RegexFlags[RegexFlags["Sticky"] = 16] = "Sticky";
    RegexFlags[RegexFlags["DotAll"] = 32] = "DotAll";
})(RegexFlags || (RegexFlags = {}));
export function scanRegularExpression(state, context) {
    const bodyStart = state.index;
    let preparseState = RegexState.Empty;
    loop: while (true) {
        const ch = state.source.charCodeAt(state.index);
        state.index++;
        state.column++;
        if (preparseState & RegexState.Escape) {
            preparseState &= ~RegexState.Escape;
        }
        else {
            switch (ch) {
                case 47:
                    if (!preparseState)
                        break loop;
                    else
                        break;
                case 92:
                    preparseState |= RegexState.Escape;
                    break;
                case 91:
                    preparseState |= RegexState.Class;
                    break;
                case 93:
                    preparseState &= RegexState.Escape;
                    break;
                case 13:
                case 10:
                case 8232:
                case 8233:
                    report(state, 64);
                default:
            }
        }
        if (state.index >= state.source.length) {
            report(state, 64);
        }
    }
    const bodyEnd = state.index - 1;
    let mask = RegexFlags.Empty;
    const { index: flagStart } = state;
    loop: while (state.index < state.source.length) {
        const code = state.source.charCodeAt(state.index);
        switch (code) {
            case 103:
                if (mask & RegexFlags.Global)
                    report(state, 26, 'g');
                mask |= RegexFlags.Global;
                break;
            case 105:
                if (mask & RegexFlags.IgnoreCase)
                    report(state, 26, 'i');
                mask |= RegexFlags.IgnoreCase;
                break;
            case 109:
                if (mask & RegexFlags.Multiline)
                    report(state, 26, 'm');
                mask |= RegexFlags.Multiline;
                break;
            case 117:
                if (mask & RegexFlags.Unicode)
                    report(state, 26, 'u');
                mask |= RegexFlags.Unicode;
                break;
            case 121:
                if (mask & RegexFlags.Sticky)
                    report(state, 26, 'y');
                mask |= RegexFlags.Sticky;
                break;
            case 115:
                if (mask & RegexFlags.DotAll)
                    report(state, 26, 's');
                mask |= RegexFlags.DotAll;
                break;
            default:
                if (!isIdentifierPart(code))
                    break loop;
                report(state, 65, fromCodePoint(code));
        }
        state.index++;
        state.column++;
    }
    const flags = state.source.slice(flagStart, state.index);
    const pattern = state.source.slice(bodyStart, bodyEnd);
    state.tokenRegExp = { pattern, flags };
    if (context & 8)
        state.tokenRaw = state.source.slice(state.startIndex, state.index);
    state.tokenValue = validate(state, pattern, flags);
    return 131076;
}
function validate(state, pattern, flags) {
    try {
        RegExp(pattern);
    }
    catch (e) {
        report(state, 64);
    }
    try {
        return new RegExp(pattern, flags);
    }
    catch (e) {
        return null;
    }
}
//# sourceMappingURL=regexp.js.map