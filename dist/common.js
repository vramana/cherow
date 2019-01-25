import { KeywordDescTable } from './token';
import { next } from './scanner';
import { report } from './errors';
export function pushComment(context, array) {
    return function (type, value, start, end) {
        const comment = {
            type,
            value
        };
        if (context & 32) {
            comment.start = start;
            comment.end = end;
        }
        array.push(comment);
    };
}
export function pushToken(context, array) {
    return function (token, value, start, end) {
        const tokens = {
            token,
            value
        };
        if (context & 32) {
            tokens.start = start;
            tokens.end = end;
        }
        array.push(tokens);
    };
}
export function finishNode(context, start, end, node) {
    if (context & 2) {
        node.start = start;
        node.end = end;
    }
    return node;
}
export function optional(state, context, t) {
    if (state.token === t) {
        next(state, context);
        return true;
    }
    return false;
}
export function expect(state, context, t) {
    if (state.token === t) {
        next(state, context);
    }
    else {
        report(state, 1, KeywordDescTable[state.token & 255]);
    }
}
export function consumeSemicolon(state, context) {
    if ((state.token & 536870912) === 536870912) {
        optional(state, context, 536870929);
    }
    else if ((state.flags & 1) !== 1) {
        report(state, 1, KeywordDescTable[state.token & 255]);
    }
}
export function addVariable(state, context, scope, bindingType, origin, checkDuplicates, isVarDecl, key) {
    if (scope === -1)
        return;
    if (bindingType & 2) {
        let lex = scope.lex;
        while (lex) {
            const type = lex.type;
            if (lex['@' + key] !== undefined) {
                if (type === 4) {
                    if (isVarDecl && context & 16) {
                        state.inCatch = true;
                    }
                    else {
                        report(state, 42, key);
                    }
                }
                else if (type === 2) {
                    report(state, 98);
                }
                else if (type !== 5) {
                    if (checkForDuplicateLexicals(scope, '@' + key, context, origin) === true) {
                        report(state, 98, key);
                    }
                }
            }
            lex = lex['@'];
        }
        let x = scope.var['@' + key];
        if (x === undefined) {
            x = 1;
        }
        else {
            ++x;
        }
        scope.var['@' + key] = x;
        let lexVars = scope.lexVars;
        while (lexVars) {
            lexVars['@' + key] = true;
            lexVars = lexVars['@'];
        }
    }
    else {
        const lex = scope.lex;
        if (checkDuplicates) {
            checkIfExistInLexicalParentScope(state, context, scope, origin, '@' + key);
            if (lex['@' + key] !== undefined) {
                if (checkForDuplicateLexicals(scope, '@' + key, context, origin) === true) {
                    report(state, 41, key);
                }
            }
        }
        let x = lex['@' + key];
        if (x === undefined)
            x = 1;
        else if (checkDuplicates) {
            if (checkForDuplicateLexicals(scope, '@' + key, context, origin) === true) {
                report(state, 99, key);
            }
        }
        else {
            ++x;
        }
        lex['@' + key] = x;
    }
}
export function checkForDuplicateLexicals(scope, key, context, origin) {
    return context & 1024
        ? true
        : (context & 16) === 0
            ? true
            : origin & 512
                ? true
                : (scope.lex.funcs[key] === true) === false
                    ? true
                    : false;
}
export function checkIfExistInLexicalBindings(state, context, scope, origin, skipParent) {
    const lex = scope.lex;
    for (const key in lex) {
        if (key[0] === '@' && key.length > 1) {
            if (lex[key] > 1)
                return true;
            if (!skipParent)
                checkIfExistInLexicalParentScope(state, context, scope, origin, key);
        }
    }
    return false;
}
export function checkIfExistInLexicalParentScope(state, context, scope, origin, key) {
    const lex = scope.lex;
    const lexParent = lex['@'];
    if (lexParent !== undefined && lexParent[key] !== undefined) {
        if (lexParent.type === 5) {
            report(state, 101);
        }
        else if (lexParent.type === 4) {
            report(state, 100);
        }
    }
    if (scope.lexVars[key] !== undefined) {
        if (checkForDuplicateLexicals(scope, key, context, origin) === true) {
            report(state, 41, key.slice(1));
        }
    }
}
export function addFunctionName(state, context, scope, bindingType, origin, isVarDecl) {
    addVariable(state, context, scope, bindingType, origin, true, isVarDecl, state.tokenValue);
    if (context & 16 && !scope.lex.funcs['@' + state.tokenValue]) {
        scope.lex.funcs['@' + state.tokenValue] = true;
    }
}
export function validateFunctionArgs(state, arg) {
    for (const key in arg) {
        if (key[0] === '@' && key.length > 1 && arg[key] > 1) {
            report(state, 41, key.slice(1));
        }
    }
}
export function lookAheadOrScan(state, context, callback, isLookahead) {
    const savedIndex = state.index;
    const savedLine = state.line;
    const savedColumn = state.column;
    const startIndex = state.startIndex;
    const savedFlags = state.flags;
    const savedTokenValue = state.tokenValue;
    const savedNextChar = state.currentChar;
    const savedToken = state.token;
    const savedTokenRegExp = state.tokenRegExp;
    const result = callback(state, context);
    if (!result || isLookahead) {
        state.index = savedIndex;
        state.line = savedLine;
        state.column = savedColumn;
        state.startIndex = startIndex;
        state.flags = savedFlags;
        state.tokenValue = savedTokenValue;
        state.currentChar = savedNextChar;
        state.token = savedToken;
        state.tokenRegExp = savedTokenRegExp;
    }
    return result;
}
export function isLexical(state, context) {
    next(state, context);
    const { token } = state;
    return !!((token & 405505) === 274432 ||
        (token & 12288) === 12288 ||
        token === 131084 ||
        token === 131091 ||
        state.token & 2097152 ||
        state.token & 524288 ||
        token === 402821192);
}
export function reinterpret(state, ast) {
    switch (ast.type) {
        case 'ArrayExpression':
            ast.type = 'ArrayPattern';
            const elements = ast.elements;
            for (let i = 0, n = elements.length; i < n; ++i) {
                const element = elements[i];
                if (element)
                    reinterpret(state, element);
            }
            break;
        case 'ObjectExpression':
            ast.type = 'ObjectPattern';
            const properties = ast.properties;
            for (let i = 0, n = properties.length; i < n; ++i) {
                reinterpret(state, properties[i]);
            }
            break;
        case 'AssignmentExpression':
            ast.type = 'AssignmentPattern';
            if (ast.operator !== '=')
                report(state, 0);
            delete ast.operator;
            reinterpret(state, ast.left);
            break;
        case 'Property':
            reinterpret(state, ast.value);
            break;
        case 'SpreadElement':
            ast.type = 'RestElement';
            reinterpret(state, ast.argument);
    }
}
export function nameIsArgumentsOrEval(value) {
    return value === 'eval' || value === 'arguments';
}
export function isValidIdentifier(context, t) {
    if (context & 1024) {
        if (context & 2048 && t & 524288)
            return false;
        if (t & 2097152)
            return false;
        return (t & 274432) === 274432 || (t & 12288) === 12288;
    }
    return ((t & 274432) === 274432 ||
        (t & 12288) === 12288 ||
        (t & 36864) === 36864);
}
export function validateBindingIdentifier(state, context, type, token = state.token) {
    if (context & 1024 && token === 36969)
        report(state, 73);
    if ((token & 36864) === 36864) {
        if (context & 1024)
            report(state, 72);
    }
    if ((token & 20480) === 20480) {
        report(state, 72);
    }
    if (context & (4194304 | 2048) && token & 524288) {
        report(state, 71);
    }
    if (context & (2097152 | 1024) && token & 2097152) {
        report(state, 67);
    }
    if (token === 402821192) {
        if (type & 16)
            report(state, 68);
        if (type & (4 | 8))
            report(state, 69);
        if (context & 1024)
            report(state, 70);
    }
    return true;
}
export function addToExportedNamesAndCheckForDuplicates(state, exportedName) {
    if (state.exportedNames !== undefined && exportedName !== '') {
        const hashed = '@' + exportedName;
        if (state.exportedNames[hashed])
            report(state, 48, exportedName);
        state.exportedNames[hashed] = 1;
    }
}
export function addToExportedBindings(state, exportedName) {
    if (state.exportedBindings !== undefined && exportedName !== '') {
        const hashed = '@' + exportedName;
        state.exportedBindings[hashed] = 1;
    }
}
export function nextTokenIsFuncKeywordOnSameLine(state, context) {
    const line = state.line;
    next(state, context);
    return state.token === 151639 && state.line === line;
}
function isIterationStatement(state) {
    return state.token === 20577 || state.token === 20561 || state.token === 20566;
}
export function addLabel(state, label) {
    if (state.labelSet === undefined)
        state.labelSet = {};
    state.labelSet[`@${label}`] = true;
    state.labelSetStack[state.labelDepth] = state.labelSet;
    state.iterationStack[state.labelDepth] = isIterationStatement(state);
    state.labelSet = undefined;
    state.labelDepth++;
}
export function addCrossingBoundary(state) {
    state.labelSetStack[state.labelDepth] = state.functionBoundaryStack;
    state.iterationStack[state.labelDepth] = 0;
    state.labelDepth++;
}
export function validateContinueLabel(state, label) {
    const sstate = getLabel(state, `@${label}`, true);
    if ((sstate & 1) !== 1) {
        if (sstate & 2) {
            report(state, 0);
        }
        else {
            report(state, 96, 'continue');
        }
    }
}
export function validateBreakStatement(state, label) {
    if ((getLabel(state, `@${label}`) & 1) !== 1)
        report(state, 96);
}
export function getLabel(state, label, iterationStatement = false, crossBoundary = false) {
    if (!iterationStatement && state.labelSet && state.labelSet[label] === true) {
        return 1;
    }
    if (!state.labelSetStack)
        return 0;
    let stopAtTheBorder = false;
    for (let i = state.labelDepth - 1; i >= 0; i--) {
        const labelSet = state.labelSetStack[i];
        if (labelSet === state.functionBoundaryStack) {
            if (crossBoundary) {
                break;
            }
            else {
                stopAtTheBorder = true;
                continue;
            }
        }
        if (iterationStatement && state.iterationStack[i] === false) {
            continue;
        }
        if (labelSet[label] === true) {
            return stopAtTheBorder ? 2 : 1;
        }
    }
    return 0;
}
export function addVariableAndDeduplicate(state, context, scope, type, origin, isVarDecl, name) {
    addVariable(state, context, scope, type, origin, true, isVarDecl, name);
    if (context & 16) {
        scope.lex.funcs['#' + state.tokenValue] = false;
    }
}
export function createScope(type) {
    return {
        var: {},
        lexVars: {},
        lex: {
            '@': undefined,
            type,
            funcs: {}
        }
    };
}
export function createSubScope(parent, type) {
    return {
        var: parent.var,
        lexVars: {
            '@': parent.lexVars
        },
        lex: {
            '@': parent.lex,
            type,
            funcs: []
        }
    };
}
export function nextTokenIsLeftParenOrPeriod(state, context) {
    next(state, context);
    return state.token === 131083 || state.token === 13;
}
export function nextTokenIsLeftParen(parser, context) {
    next(parser, context);
    return parser.token === 131083;
}
export function secludeGrammar(state, context, minprec = 0, callback) {
    const { assignable, bindable, pendingCoverInitializeError } = state;
    state.bindable = true;
    state.assignable = true;
    state.pendingCoverInitializeError = null;
    const result = callback(state, context, minprec);
    if (state.pendingCoverInitializeError !== null) {
        report(state, state.pendingCoverInitializeError);
    }
    state.bindable = bindable;
    state.assignable = assignable;
    state.pendingCoverInitializeError = pendingCoverInitializeError;
    return result;
}
export function acquireGrammar(state, context, minprec, callback) {
    const { assignable, bindable, pendingCoverInitializeError } = state;
    state.bindable = true;
    state.assignable = true;
    state.pendingCoverInitializeError = null;
    const result = callback(state, context, minprec);
    state.bindable = state.bindable && bindable;
    state.assignable = state.assignable && assignable;
    state.pendingCoverInitializeError = pendingCoverInitializeError || state.pendingCoverInitializeError;
    return result;
}
export function isValidSimpleAssignmentTarget(node) {
    return node.type === 'Identifier' || node.type === 'MemberExpression' ? true : false;
}
//# sourceMappingURL=common.js.map