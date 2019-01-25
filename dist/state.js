import { consumeSemicolon, reinterpret, validateBindingIdentifier, addToExportedNamesAndCheckForDuplicates, addToExportedBindings, nextTokenIsFuncKeywordOnSameLine, isValidSimpleAssignmentTarget, getLabel, validateContinueLabel, validateBreakStatement, addCrossingBoundary, addLabel, addVariableAndDeduplicate, isValidIdentifier, createSubScope, createScope, nextTokenIsLeftParenOrPeriod, nextTokenIsLeftParen, acquireGrammar, secludeGrammar, nameIsArgumentsOrEval } from './common';
import { KeywordDescTable } from './token';
import { next } from './scanner';
import { scanTemplateTail } from './scanner/template';
import { optional, expect, addVariable, checkIfExistInLexicalBindings, validateFunctionArgs, addFunctionName, isLexical, lookAheadOrScan } from './common';
import { report } from './errors';
export function create(source, onComment, onToken) {
    return {
        source,
        onComment,
        onToken,
        flags: 0,
        grammar: 3,
        index: 0,
        line: 1,
        column: 0,
        startIndex: 0,
        startLine: 1,
        startColumn: 0,
        token: 536870912,
        tokenValue: undefined,
        tokenRaw: '',
        tokenRegExp: undefined,
        lastRegExpError: undefined,
        numCapturingParens: 0,
        largestBackReference: 0,
        length: source.length,
        currentChar: source.charCodeAt(0),
        lastChar: 0,
        inCatch: false,
        assignable: true,
        bindable: true,
        exportedNames: [],
        exportedBindings: [],
        labelSet: undefined,
        labelSetStack: [],
        iterationStack: [],
        labelDepth: 0,
        switchStatement: 0,
        iterationStatement: 0,
        functionBoundaryStack: undefined,
        pendingCoverInitializeError: null
    };
}
export function parseModuleItem(state, context, scope) {
    next(state, context | 32768);
    const statements = [];
    while (state.token === 131075) {
        const tokenValue = state.tokenValue;
        if (!(context & 1024) && tokenValue.length === 10 && tokenValue === 'use strict') {
            context |= 1024;
        }
        statements.push(parseDirective(state, context, scope));
    }
    while (state.token !== 536870912) {
        statements.push(parseModuleItemList(state, context, scope));
    }
    return statements;
}
export function parseStatementList(state, context, scope) {
    next(state, context | 32768);
    const statements = [];
    while (state.token === 131075) {
        const tokenValue = state.tokenValue;
        if (!(context & 1024) && tokenValue.length === 10 && tokenValue === 'use strict') {
            context |= 1024;
        }
        statements.push(parseDirective(state, context, scope));
    }
    while (state.token !== 536870912) {
        statements.push(parseStatementListItem(state, context, scope));
    }
    return statements;
}
export function parseDirective(state, context, scope) {
    if ((context & 131072) < 1)
        return parseStatementListItem(state, context, scope);
    const directive = state.tokenRaw.slice(1, -1);
    const expression = parseExpression(state, context);
    consumeSemicolon(state, context);
    return {
        type: 'ExpressionStatement',
        expression,
        directive
    };
}
function parseAsyncFunctionOrAssignmentExpression(state, context, scope, isDefault) {
    return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
        ? parseHoistableFunctionDeclaration(state, context, scope, isDefault, true)
        : parseAssignmentExpression(state, context);
}
function parseStatementListItem(state, context, scope) {
    state.assignable = state.bindable = true;
    switch (state.token) {
        case 151639:
            return parseFunctionDeclaration(state, context, scope, 128, false);
        case 151629:
            return parseClassDeclaration(state, context, scope);
        case 402804809:
            return parseLexicalDeclaration(state, context, 8, 1, scope);
        case 402821192:
            return parseLetOrExpressionStatement(state, context, scope);
        case 1060972:
            return parseAsyncFunctionOrExpressionStatement(state, context, scope);
        default:
            return parseStatement(state, (context | 4096) ^ 4096, scope, 1);
    }
}
function parseAsyncFunctionOrExpressionStatement(state, context, scope) {
    return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
        ? parseFunctionDeclaration(state, context, scope, 512, true)
        : parseExpressionOrLabelledStatement(state, context, scope, 2);
}
function parseLetOrExpressionStatement(state, context, scope) {
    return lookAheadOrScan(state, context, isLexical, true)
        ? parseLexicalDeclaration(state, context, 4, 1, scope)
        : parseExpressionOrLabelledStatement(state, context, scope, 2);
}
function parseStatement(state, context, scope, label) {
    switch (state.token) {
        case 268587079:
            return parseVariableStatement(state, context, 2, 1, scope);
        case 151645:
            return parseSwitchStatement(state, context, scope);
        case 20561:
            return parseDoWhileStatement(state, context, scope);
        case 20571:
            return parseReturnStatement(state, context);
        case 20577:
            return parseWhileStatement(state, context, scope);
        case 20578:
            return parseWithStatement(state, context, scope);
        case 20554:
            return parseBreakStatement(state, context);
        case 20558:
            return parseContinueStatement(state, context);
        case 20559:
            return parseDebuggerStatement(state, context);
        case 20576:
            return parseTryStatement(state, context, scope);
        case 151647:
            return parseThrowStatement(state, context);
        case 20568:
            return parseIfStatement(state, context, scope);
        case 536870929:
            return parseEmptyStatement(state, context);
        case 131084:
            return parseBlockStatement(state, (context | 4096) ^ 4096, createSubScope(scope, 1));
        case 20566:
            return parseForStatement(state, context, scope);
        case 1060972:
            if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
                report(state, 76);
            }
            return parseExpressionOrLabelledStatement(state, context, scope, label);
        case 151639:
            report(state, context & 1024 ? 44 : 43);
        case 151629:
            report(state, 75, KeywordDescTable[state.token & 255]);
        default:
            return parseExpressionOrLabelledStatement(state, context, scope, label);
    }
}
function parseModuleItemList(state, context, scope) {
    state.assignable = state.bindable = true;
    switch (state.token) {
        case 20563:
            return parseExportDeclaration(state, context, scope);
        case 151641:
            if (!(context & 1 && lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true))) {
                return parseImportDeclaration(state, context, scope);
            }
        default:
            return parseStatementListItem(state, context, scope);
    }
}
function parseExportDeclaration(state, context, scope) {
    expect(state, context, 20563);
    const specifiers = [];
    let declaration = null;
    let source = null;
    if (optional(state, context | 32768, 20560)) {
        switch (state.token) {
            case 151639: {
                declaration = parseHoistableFunctionDeclaration(state, context | 512, scope, true, false);
                break;
            }
            case 151629:
                declaration = parseHostedClassDeclaration(state, context | 512, scope, true);
                break;
            case 1060972:
                declaration = parseAsyncFunctionOrAssignmentExpression(state, context | 512, scope, true);
                break;
            default:
                declaration = parseAssignmentExpression(state, context);
                consumeSemicolon(state, context);
        }
        addToExportedNamesAndCheckForDuplicates(state, 'default');
        addToExportedBindings(state, '*default*');
        addVariable(state, context, scope, 0, 0, true, false, '*default*');
        return {
            type: 'ExportDefaultDeclaration',
            declaration
        };
    }
    switch (state.token) {
        case 21105203: {
            next(state, context);
            expect(state, context, 12401);
            if (state.token !== 131075)
                report(state, 0);
            source = parseLiteral(state, context, state.tokenValue);
            consumeSemicolon(state, context);
            return {
                type: 'ExportAllDeclaration',
                source
            };
        }
        case 131084: {
            const exportedNames = [];
            const exportedBindings = [];
            expect(state, context, 131084);
            while (state.token !== 536870927) {
                const tokenValue = state.tokenValue;
                const token = state.token;
                const local = parseIdentifier(state, context);
                let exported;
                if (state.token === 16920683) {
                    next(state, context);
                    if (!(state.token & 274432))
                        report(state, 0);
                    exportedNames.push(state.tokenValue);
                    exportedBindings.push(tokenValue);
                    exported = parseIdentifier(state, context);
                }
                else {
                    validateBindingIdentifier(state, context, 8, token);
                    exportedNames.push(state.tokenValue);
                    exportedBindings.push(state.tokenValue);
                    exported = local;
                }
                specifiers.push({
                    type: 'ExportSpecifier',
                    local,
                    exported
                });
                if (state.token !== 536870927)
                    expect(state, context, 18);
            }
            expect(state, context, 536870927);
            if (state.token === 12401) {
                next(state, context);
                if (state.token !== 131075)
                    report(state, 0);
                source = parseLiteral(state, context, state.tokenValue);
            }
            else {
                let i = 0;
                let iMax = exportedNames.length;
                for (; i < iMax; i++) {
                    addToExportedNamesAndCheckForDuplicates(state, exportedNames[i]);
                }
                i = 0;
                iMax = exportedBindings.length;
                for (; i < iMax; i++) {
                    addToExportedBindings(state, exportedBindings[i]);
                }
            }
            consumeSemicolon(state, context);
            break;
        }
        case 151629:
            declaration = parseHostedClassDeclaration(state, context, scope, false);
            break;
        case 402821192:
            declaration = parseLexicalDeclaration(state, context, 4, 4, scope);
            if (checkIfExistInLexicalBindings(state, context, scope, 0, false))
                report(state, 0);
            break;
        case 402804809:
            declaration = parseLexicalDeclaration(state, context, 8, 4, scope);
            if (checkIfExistInLexicalBindings(state, context, scope, 0, false))
                report(state, 0);
            break;
        case 268587079:
            declaration = parseVariableStatement(state, context, 2, 4, scope);
            break;
        case 151639:
            declaration = parseHoistableFunctionDeclaration(state, context, scope, true, false);
            break;
        case 1060972:
            declaration = parseAsyncFunctionOrAssignmentExpression(state, context, scope, false);
            break;
        default:
            report(state, 0);
    }
    return {
        type: 'ExportNamedDeclaration',
        source,
        specifiers,
        declaration
    };
}
export function parseImportDeclaration(state, context, scope) {
    expect(state, context, 151641);
    let source;
    const specifiers = [];
    if ((state.token & 274432) === 274432) {
        validateBindingIdentifier(state, context, 8);
        addVariable(state, context, scope, 0, 0, true, false, state.tokenValue);
        specifiers.push({
            type: 'ImportDefaultSpecifier',
            local: parseIdentifier(state, context)
        });
        if (optional(state, context, 18)) {
            if (state.token === 21105203) {
                parseImportNamespace(state, context, scope, specifiers);
            }
            else if (state.token === 131084) {
                parseImportSpecifierOrNamedImports(state, context, scope, specifiers);
            }
            else
                report(state, 0);
        }
        source = parseModuleSpecifier(state, context);
    }
    else if (state.token === 131075) {
        source = parseLiteral(state, context, state.tokenValue);
    }
    else {
        if (state.token === 21105203) {
            parseImportNamespace(state, context, scope, specifiers);
        }
        else if (state.token === 131084) {
            parseImportSpecifierOrNamedImports(state, context, scope, specifiers);
        }
        else
            report(state, 0);
        source = parseModuleSpecifier(state, context);
    }
    consumeSemicolon(state, context);
    return {
        type: 'ImportDeclaration',
        specifiers,
        source
    };
}
function parseImportSpecifierOrNamedImports(state, context, scope, specifiers) {
    expect(state, context, 131084);
    while (state.token !== 536870927) {
        const tokenValue = state.tokenValue;
        const token = state.token;
        if (!(state.token & 274432))
            report(state, 0);
        const imported = parseIdentifier(state, context);
        let local;
        if (optional(state, context, 16920683)) {
            validateBindingIdentifier(state, context, 8);
            addVariable(state, context, scope, 8, 0, true, false, state.tokenValue);
            local = parseIdentifier(state, context);
        }
        else {
            validateBindingIdentifier(state, context, 8, token);
            addVariable(state, context, scope, 8, 0, true, false, tokenValue);
            local = imported;
        }
        specifiers.push({
            type: 'ImportSpecifier',
            local,
            imported
        });
        if (state.token !== 536870927)
            expect(state, context, 18);
    }
    expect(state, context, 536870927);
}
function parseImportNamespace(state, context, scope, specifiers) {
    next(state, context);
    expect(state, context, 16920683);
    validateBindingIdentifier(state, context, 8);
    addVariable(state, context, scope, 8, 0, true, false, state.tokenValue);
    const local = parseIdentifier(state, context);
    specifiers.push({
        type: 'ImportNamespaceSpecifier',
        local
    });
}
function parseModuleSpecifier(state, context) {
    expect(state, context, 12401);
    if (state.token !== 131075)
        report(state, 0);
    return parseLiteral(state, context, state.tokenValue);
}
export function parseBlockStatement(state, context, scope) {
    const body = [];
    next(state, context);
    while (state.token !== 536870927) {
        body.push(parseStatementListItem(state, context, scope));
    }
    expect(state, context | 32768, 536870927);
    return {
        type: 'BlockStatement',
        body
    };
}
export function parseEmptyStatement(state, context) {
    next(state, context | 32768);
    return {
        type: 'EmptyStatement'
    };
}
export function parseThrowStatement(state, context) {
    next(state, context);
    if (state.flags & 1)
        report(state, 54);
    const argument = parseExpression(state, context);
    consumeSemicolon(state, context);
    return {
        type: 'ThrowStatement',
        argument
    };
}
export function parseIfStatement(state, context, scope) {
    next(state, context);
    expect(state, context | 32768, 131083);
    const test = parseExpression(state, context);
    expect(state, context, 16);
    const consequent = parseConsequentOrAlternate(state, context, scope);
    const alternate = optional(state, context, 20562)
        ? parseConsequentOrAlternate(state, context, scope)
        : null;
    return {
        type: 'IfStatement',
        test,
        consequent,
        alternate
    };
}
function parseConsequentOrAlternate(state, context, scope) {
    return context & 1024 || (context & 16) === 0 || state.token !== 151639
        ? parseStatement(state, (context | 4096) ^ 4096, scope, 2)
        : parseFunctionDeclaration(state, context, scope, 1, false);
}
function parseSwitchStatement(state, context, scope) {
    next(state, context);
    expect(state, context | 32768, 131083);
    const discriminant = parseExpression(state, context);
    expect(state, context, 16);
    expect(state, context, 131084);
    const cases = [];
    let seenDefault = false;
    const switchScope = createSubScope(scope, 3);
    const previousSwitchStatement = state.switchStatement;
    state.switchStatement = 1;
    while (state.token !== 536870927) {
        let test = null;
        if (optional(state, context, 20555)) {
            test = parseExpression(state, context);
        }
        else {
            expect(state, context, 20560);
            if (seenDefault)
                report(state, 0);
            seenDefault = true;
        }
        cases.push(parseCaseOrDefaultClauses(state, context, test, switchScope));
    }
    state.switchStatement = previousSwitchStatement;
    expect(state, context, 536870927);
    return {
        type: 'SwitchStatement',
        discriminant,
        cases
    };
}
export function parseReturnStatement(state, context) {
    if ((context & (64 | 134217728)) < 1)
        report(state, 55);
    next(state, context | 32768);
    const argument = (state.token & 536870912) < 1 && (state.flags & 1) < 1
        ? parseExpression(state, context & ~134217728)
        : null;
    consumeSemicolon(state, context);
    return {
        type: 'ReturnStatement',
        argument
    };
}
export function parseWhileStatement(state, context, scope) {
    next(state, context);
    expect(state, context | 32768, 131083);
    const test = parseExpression(state, context);
    expect(state, context, 16);
    const previousIterationStatement = state.iterationStatement;
    state.iterationStatement = 1;
    const body = parseStatement(state, (context | 4096) ^ 4096, scope, 2);
    state.iterationStatement = previousIterationStatement;
    return {
        type: 'WhileStatement',
        test,
        body
    };
}
export function parseContinueStatement(state, context) {
    next(state, context);
    let label = null;
    if (!(state.flags & 1) && state.token & 4096) {
        const tokenValue = state.tokenValue;
        label = parseIdentifier(state, context);
        validateContinueLabel(state, tokenValue);
    }
    consumeSemicolon(state, context);
    if (label === null && state.iterationStatement === 0 && state.switchStatement === 0) {
        report(state, 50);
    }
    return {
        type: 'ContinueStatement',
        label
    };
}
export function parseBreakStatement(state, context) {
    next(state, context);
    let label = null;
    if (!(state.flags & 1) && state.token & 4096) {
        const tokenValue = state.tokenValue;
        label = parseIdentifier(state, context);
        validateBreakStatement(state, tokenValue);
    }
    else if (state.iterationStatement === 0 && state.switchStatement === 0) {
        report(state, 51);
    }
    consumeSemicolon(state, context);
    return {
        type: 'BreakStatement',
        label
    };
}
export function parseWithStatement(state, context, scope) {
    if (context & 1024)
        report(state, 52);
    next(state, context);
    expect(state, context | 32768, 131083);
    const object = parseExpression(state, context);
    expect(state, context, 16);
    const body = parseStatement(state, (context | 4096) ^ 4096, scope, 2);
    return {
        type: 'WithStatement',
        object,
        body
    };
}
export function parseDebuggerStatement(state, context) {
    next(state, context);
    consumeSemicolon(state, context);
    return {
        type: 'DebuggerStatement'
    };
}
export function parseTryStatement(state, context, scope) {
    next(state, context);
    const block = parseBlockStatement(state, context, createSubScope(scope, 1));
    const handler = optional(state, context, 20556) ? parseCatchBlock(state, context, scope) : null;
    const finalizer = optional(state, context, 20565)
        ? parseBlockStatement(state, (context | 4096) ^ 4096, createSubScope(scope, 1))
        : null;
    if (!handler && !finalizer)
        report(state, 0);
    return {
        type: 'TryStatement',
        block,
        handler,
        finalizer
    };
}
export function parseCatchBlock(state, context, scope) {
    let param = null;
    let secondScope = scope;
    if (optional(state, context, 131083)) {
        const catchScope = createSubScope(scope, 4);
        if (state.token === 16)
            report(state, 0);
        param = parseBindingIdentifierOrPattern(state, context, catchScope, 1, 8, false);
        if (state.token === 8388637)
            report(state, 0);
        if (checkIfExistInLexicalBindings(state, context, catchScope, 0, true))
            report(state, 45, state.tokenValue);
        expect(state, context, 16);
        secondScope = createSubScope(catchScope, 1);
    }
    const body = parseBlockStatement(state, context, secondScope);
    return {
        type: 'CatchClause',
        param,
        body
    };
}
export function parseDoWhileStatement(state, context, scope) {
    expect(state, context, 20561);
    const previousIterationStatement = state.iterationStatement;
    state.iterationStatement = 1;
    const body = parseStatement(state, (context | 4096) ^ 4096, scope, 2);
    state.iterationStatement = previousIterationStatement;
    expect(state, context, 20577);
    expect(state, context, 131083);
    const test = parseExpression(state, context);
    expect(state, context, 16);
    optional(state, context, 536870929);
    return {
        type: 'DoWhileStatement',
        body,
        test
    };
}
export function parseCaseOrDefaultClauses(state, context, test, scope) {
    expect(state, context, 21);
    const consequent = [];
    while (state.token !== 20555 &&
        state.token !== 536870927 &&
        state.token !== 20560) {
        consequent.push(parseStatementListItem(state, (context | 4096) ^ 4096, scope));
    }
    return {
        type: 'SwitchCase',
        test,
        consequent
    };
}
function parseForStatement(state, context, scope) {
    next(state, context);
    const forAwait = context & 4194304 ? optional(state, context, 667757) : false;
    scope = createSubScope(scope, 2);
    expect(state, context, 131083);
    let init = null;
    let declarations = null;
    let test = null;
    let update = null;
    let right;
    let isPattern = false;
    if (state.token !== 536870929) {
        if ((state.token & 268435456) > 0) {
            const kind = KeywordDescTable[state.token & 255];
            if (optional(state, context, 268587079)) {
                init = {
                    type: 'VariableDeclaration',
                    kind,
                    declarations: parseVariableDeclarationList(state, context | 8192, 2, 2, false, scope)
                };
            }
            else if (state.token === 402821192) {
                if (lookAheadOrScan(state, context, isLexical, false)) {
                    init = {
                        type: 'VariableDeclaration',
                        kind,
                        declarations: parseVariableDeclarationList(state, context, 4, 2, true, scope)
                    };
                }
                else {
                    isPattern = true;
                    init = acquireGrammar(state, context | 8192, 0, parseAssignmentExpression);
                }
            }
            else if (optional(state, context, 402804809)) {
                declarations = parseVariableDeclarationList(state, context, 8, 2, false, scope);
                if (checkIfExistInLexicalBindings(state, context, scope, 0, true))
                    report(state, 45, state.tokenValue);
                init = { type: 'VariableDeclaration', kind, declarations };
            }
        }
        else {
            isPattern = state.token === 131091 || state.token === 131084;
            init = acquireGrammar(state, context | 8192, 0, parseAssignmentExpression);
        }
    }
    if (optional(state, context | 32768, 12402)) {
        if (state.inCatch)
            report(state, 0);
        if (isPattern) {
            if (!state.assignable || init.type === 'AssignmentExpression') {
                report(state, 90);
            }
            reinterpret(state, init);
        }
        right = parseAssignmentExpression(state, context);
        expect(state, context, 16);
        const previousIterationStatement = state.iterationStatement;
        state.iterationStatement = 1;
        const body = parseStatement(state, (context | 4096) ^ 4096, scope, 2);
        state.iterationStatement = previousIterationStatement;
        return {
            type: 'ForOfStatement',
            body,
            left: init,
            right,
            await: forAwait
        };
    }
    if (optional(state, context, 33707825)) {
        if (isPattern) {
            if (!state.assignable || init.type === 'AssignmentExpression') {
                report(state, 89);
            }
            reinterpret(state, init);
        }
        right = parseExpression(state, context);
        expect(state, context, 16);
        const previousIterationStatement = state.iterationStatement;
        state.iterationStatement = 1;
        const body = parseStatement(state, (context | 4096) ^ 4096, scope, 2);
        state.iterationStatement = previousIterationStatement;
        return {
            type: 'ForInStatement',
            body,
            left: init,
            right
        };
    }
    if (state.token === 18) {
        init = parseSequenceExpression(state, context, init);
    }
    expect(state, context, 536870929);
    if (state.token !== 536870929) {
        test = parseExpression(state, context);
    }
    expect(state, context, 536870929);
    if (state.token !== 16)
        update = parseExpression(state, context);
    expect(state, context, 16);
    const previousIterationStatement = state.iterationStatement;
    state.iterationStatement = 1;
    const body = parseStatement(state, (context | 4096) ^ 4096, scope, 2);
    state.iterationStatement = previousIterationStatement;
    return {
        type: 'ForStatement',
        body,
        init,
        test,
        update
    };
}
export function parseExpressionOrLabelledStatement(state, context, scope, label) {
    const token = state.token;
    const tokenValue = state.tokenValue;
    const expr = parseExpression(state, context);
    if (token & 4096 && state.token === 21) {
        next(state, context | 32768);
        validateBindingIdentifier(state, context, 0, token);
        if (getLabel(state, `@${tokenValue}`, false, true)) {
            report(state, 53, tokenValue);
        }
        addLabel(state, tokenValue);
        let body = null;
        if (state.token === 151639 &&
            (context & 1024) === 0 &&
            context & 16 &&
            label === 1) {
            body = parseFunctionDeclaration(state, context, scope, 1, false);
        }
        else
            body = parseStatement(state, (context | 4096) ^ 4096, scope, label);
        state.labelDepth--;
        return {
            type: 'LabeledStatement',
            label: expr,
            body
        };
    }
    consumeSemicolon(state, context);
    return {
        type: 'ExpressionStatement',
        expression: expr
    };
}
export function parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates) {
    switch (state.token) {
        case 131084:
            return parserObjectAssignmentPattern(state, context, scope, type, origin, verifyDuplicates);
        case 131091:
            return parseArrayAssignmentPattern(state, context, scope, type, origin, verifyDuplicates);
        default:
            return parseBindingIdentifier(state, context, scope, type, origin, verifyDuplicates);
    }
}
export function parseBindingIdentifier(state, context, scope, type, origin, checkForDuplicates) {
    const name = state.tokenValue;
    if (context & 1024) {
        if (nameIsArgumentsOrEval(name) || name === 'enum')
            report(state, 0);
    }
    else if (name === 'enum')
        report(state, 0);
    validateBindingIdentifier(state, context, type);
    addVariable(state, context, scope, type, origin, checkForDuplicates, (origin === 1 || origin === 2 || origin === 4) &&
        type === 2
        ? true
        : false, name);
    if (origin === 4) {
        addToExportedNamesAndCheckForDuplicates(state, state.tokenValue);
        addToExportedBindings(state, state.tokenValue);
    }
    next(state, context | 32768);
    return {
        type: 'Identifier',
        name
    };
}
export function parseAssignmentRestElement(state, context, scope, type, origin, verifyDuplicates) {
    expect(state, context, 14);
    const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
    return {
        type: 'RestElement',
        argument
    };
}
function AssignmentRestProperty(state, context, scope, type, origin, verifyDuplicates) {
    expect(state, context, 14);
    const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
    return {
        type: 'RestElement',
        argument
    };
}
export function parseArrayAssignmentPattern(state, context, scope, type, origin, verifyDuplicates) {
    expect(state, context, 131091);
    const elements = [];
    while (state.token !== 20) {
        if (optional(state, context, 18)) {
            elements.push(null);
        }
        else {
            if (state.token === 14) {
                elements.push(parseAssignmentRestElement(state, context, scope, type, origin, verifyDuplicates));
                break;
            }
            else {
                elements.push(parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates));
            }
            if (state.token !== 20)
                expect(state, context, 18);
        }
    }
    expect(state, context, 20);
    return {
        type: 'ArrayPattern',
        elements
    };
}
export function parserObjectAssignmentPattern(state, context, scope, type, origin, verifyDuplicates) {
    const properties = [];
    expect(state, context, 131084);
    while (state.token !== 536870927) {
        if (state.token === 14) {
            properties.push(AssignmentRestProperty(state, context, scope, type, origin, verifyDuplicates));
            break;
        }
        properties.push(parseAssignmentProperty(state, context, scope, type, origin, verifyDuplicates));
        if (state.token !== 536870927)
            expect(state, context, 18);
    }
    expect(state, context, 536870927);
    return {
        type: 'ObjectPattern',
        properties
    };
}
export function parseAssignmentPattern(state, context, left) {
    return {
        type: 'AssignmentPattern',
        left,
        right: secludeGrammar(state, context, 0, parseAssignmentExpression)
    };
}
export function parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates) {
    const left = parseBindingIdentifierOrPattern(state, context, scope, type, origin, verifyDuplicates);
    return !optional(state, context, 8388637)
        ? left
        : {
            type: 'AssignmentPattern',
            left,
            right: secludeGrammar(state, context, 0, parseAssignmentExpression)
        };
}
export function parseComputedPropertyName(state, context) {
    expect(state, context, 131091);
    const key = secludeGrammar(state, context, 0, parseAssignmentExpression);
    expect(state, context, 20);
    return key;
}
function parseAssignmentProperty(state, context, scope, type, origin, verifyDuplicates) {
    const { token } = state;
    let key;
    let value;
    let computed = false;
    let shorthand = false;
    if (token & 4096) {
        key = parseBindingIdentifier(state, context, scope, type, origin, verifyDuplicates);
        shorthand = !optional(state, context, 21);
        if (shorthand) {
            const hasInitializer = optional(state, context, 8388637);
            value = hasInitializer ? parseAssignmentPattern(state, context, key) : key;
        }
        else
            value = parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates);
    }
    else {
        if (state.token === 131075 || state.token === 131074) {
            key = parseLiteral(state, context, state.tokenValue);
        }
        else if (state.token === 131091) {
            computed = true;
            key = parseComputedPropertyName(state, context);
        }
        else
            key = parseBindingIdentifier(state, context, scope, type, origin, verifyDuplicates);
        expect(state, context, 21);
        value = parseBindingInitializer(state, context, scope, type, origin, verifyDuplicates);
    }
    return {
        type: 'Property',
        kind: 'init',
        key,
        computed,
        value,
        method: false,
        shorthand
    };
}
export function parseFunctionDeclaration(state, context, scope, origin, isAsync) {
    next(state, context);
    const isGenerator = (origin & 1) < 1 && optional(state, context, 21105203);
    let funcScope = createScope(1);
    let id = null;
    let firstRestricted;
    if (state.token & 274432) {
        validateBindingIdentifier(state, ((context | (2097152 | 4194304)) ^ (2097152 | 4194304)) |
            (context & 1024
                ? 2097152
                : context & 2097152
                    ? 2097152
                    : 0 | (context & 2048)
                        ? 4194304
                        : context & 4194304
                            ? 4194304
                            : 0), context & 4096 && (context & 2048) < 1 ? 2 : 4);
        if (origin & 1) {
            scope = createSubScope(scope, 1);
        }
        addFunctionName(state, context, scope, context & 4096 && (context & 2048) < 1 ? 2 : 4, origin, true);
        funcScope = createSubScope(funcScope, 1);
        firstRestricted = state.tokenValue;
        id = parseIdentifier(state, context);
    }
    else if (!(context & 512))
        report(state, 0);
    context =
        (context |
            4194304 |
            2097152 |
            8388608 |
            262144 |
            524288 |
            16777216) ^
            (4194304 |
                2097152 |
                8388608 |
                262144 |
                524288 |
                16777216);
    if (isAsync)
        context |= 4194304;
    if (isGenerator)
        context |= 2097152;
    const paramScoop = createSubScope(funcScope, 5);
    const params = parseFormalParameters(state, context | 67108864 | 8388608, paramScoop, 32, 0);
    const body = parseFunctionBody(state, context | 67108864, createSubScope(paramScoop, 1), firstRestricted, origin);
    return {
        type: 'FunctionDeclaration',
        params,
        body,
        async: (context & 4194304) > 0,
        generator: isGenerator,
        id
    };
}
function parseHostedClassDeclaration(state, context, scope, isNotDefault) {
    next(state, context);
    context = (context | 1024 | 16777216) ^ (1024 | 16777216);
    let id = null;
    let superClass = null;
    let name = '';
    if (state.token & 274432 && state.token !== 20564) {
        name = state.tokenValue;
        validateBindingIdentifier(state, context, 16);
        addVariableAndDeduplicate(state, context, scope, 4, 0, true, name);
        id = parseIdentifier(state, context);
    }
    if (isNotDefault)
        addToExportedNamesAndCheckForDuplicates(state, name);
    addToExportedBindings(state, name);
    if (optional(state, context, 20564)) {
        superClass = parseLeftHandSideExpression(state, context);
        context |= 524288;
    }
    else
        context = (context | 524288) ^ 524288;
    context |= 262144;
    const body = parseClassBodyAndElementList(state, context, 128);
    return {
        type: 'ClassDeclaration',
        id,
        superClass,
        body
    };
}
export function parseHoistableFunctionDeclaration(state, context, scope, isNotDefault, isAsync) {
    next(state, context);
    const isGenerator = optional(state, context, 21105203);
    let funcScope = createScope(1);
    let id = null;
    let name = '';
    if (state.token & 274432) {
        name = state.tokenValue;
        validateBindingIdentifier(state, context, 4);
        addFunctionName(state, context, scope, 4, 0, true);
        funcScope = createSubScope(funcScope, 1);
        id = parseIdentifier(state, context);
    }
    if (isNotDefault)
        addToExportedNamesAndCheckForDuplicates(state, name);
    addToExportedBindings(state, name);
    context =
        (context | 4194304 | 2097152 | 8388608 | 262144) ^
            (4194304 | 2097152 | 8388608 | 262144);
    if (isAsync)
        context |= 4194304;
    if (isGenerator)
        context |= 2097152;
    const paramScoop = createSubScope(funcScope, 5);
    const params = parseFormalParameters(state, context | 67108864 | 8388608, paramScoop, 32, 0);
    const body = parseFunctionBody(state, context | 67108864, createSubScope(paramScoop, 1), undefined, 0);
    return {
        type: 'FunctionDeclaration',
        params,
        body,
        async: (context & 4194304) > 0,
        generator: isGenerator,
        id
    };
}
export function parseFormalParameters(state, context, scope, origin, objState) {
    expect(state, context, 131083);
    const params = [];
    state.flags &= ~64;
    if (state.token === 18)
        report(state, 0);
    let hasComplexArgs = false;
    while (state.token !== 16) {
        if (state.token === 14) {
            state.flags |= 64;
            if (objState & 512)
                report(state, 95);
            params.push(parseRestElement(state, context, scope, 1, 0));
            break;
        }
        if ((state.token & 405505) !== 405505)
            state.flags |= 64;
        let left = parseBindingIdentifierOrPattern(state, context, scope, 1, origin, false);
        if (optional(state, context | 32768, 8388637)) {
            state.flags |= 64;
            if ((state.token & 405505) === 405505) {
                hasComplexArgs = true;
            }
            else if (state.token & 2097152 && context & (1024 | 2097152))
                report(state, 0);
            left = parseAssignmentPattern(state, context, left);
        }
        params.push(left);
        if (optional(state, context, 18)) {
            if (state.token === 18)
                report(state, 0);
        }
    }
    if (objState & 512 && params.length !== 1) {
        report(state, 94, 'Setter', 'one', '');
    }
    if (objState & 256 && params.length > 0) {
        report(state, 94, 'Getter', 'no', 's');
    }
    expect(state, context, 16);
    if (hasComplexArgs || (context & (1024 | 33554432)) > 0) {
        validateFunctionArgs(state, scope.lex);
    }
    return params;
}
export function parseRestElement(state, context, scope, type, origin) {
    expect(state, context, 14);
    const argument = parseBindingIdentifierOrPattern(state, context, scope, type, origin, false);
    return {
        type: 'RestElement',
        argument
    };
}
export function parseFunctionBody(state, context, scope, firstRestricted, origin) {
    const body = [];
    expect(state, context, 131084);
    const isStrict = (context & 1024) === 1024;
    context = context | (4096 | 134217728);
    while (state.token === 131075) {
        if (state.tokenValue.length === 10 && state.tokenValue === 'use strict') {
            if (state.flags & 64)
                report(state, 61);
            context |= 1024;
        }
        body.push(parseDirective(state, context, scope));
    }
    if (context & 1024) {
        if ((state.flags & 512) === 512)
            report(state, 86);
        if (state.flags & 1024) {
            report(state, 85);
        }
        if ((firstRestricted && firstRestricted === 'eval') || firstRestricted === 'arguments')
            report(state, 61);
    }
    state.flags =
        (state.flags | (1024 | 512)) ^
            (1024 | 512);
    if (!isStrict && (context & 1024) > 0)
        validateFunctionArgs(state, scope.lex['@']);
    if (state.token !== 536870927) {
        const previousSwitchStatement = state.switchStatement;
        const previousIterationStatement = state.iterationStatement;
        if ((state.iterationStatement & 1) === 1) {
            state.iterationStatement = 2;
        }
        addCrossingBoundary(state);
        while (state.token !== 536870927) {
            body.push(parseStatementListItem(state, context, scope));
        }
        state.labelDepth--;
        state.switchStatement = previousSwitchStatement;
        state.iterationStatement = previousIterationStatement;
    }
    expect(state, origin & 128 ? context | 32768 : context, 536870927);
    return {
        type: 'BlockStatement',
        body
    };
}
export function parseVariableStatement(state, context, type, origin, scope) {
    const { token } = state;
    next(state, context);
    const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
    consumeSemicolon(state, context);
    return {
        type: 'VariableDeclaration',
        kind: KeywordDescTable[token & 255],
        declarations
    };
}
export function parseLexicalDeclaration(state, context, type, origin, scope) {
    const { token } = state;
    next(state, context);
    const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
    if (checkIfExistInLexicalBindings(state, context, scope, origin, false))
        report(state, 0);
    consumeSemicolon(state, context);
    return {
        type: 'VariableDeclaration',
        kind: KeywordDescTable[token & 255],
        declarations
    };
}
export function parseVariableDeclarationList(state, context, type, origin, checkForDuplicates, scope) {
    let bindingCount = 1;
    const list = [parseVariableDeclaration(state, context, type, origin, checkForDuplicates, scope)];
    while (optional(state, context, 18)) {
        list.push(parseVariableDeclaration(state, context, type, origin, checkForDuplicates, scope));
        ++bindingCount;
    }
    if (origin & 2 && isInOrOf(state) && bindingCount > 1) {
        report(state, 0);
    }
    return list;
}
export function isInOrOf(state) {
    return state.token === 33707825 || state.token === 12402;
}
function parseVariableDeclaration(state, context, type, origin, checkForDuplicates, scope) {
    const isBinding = state.token === 131084 || state.token === 131091;
    const id = parseBindingIdentifierOrPattern(state, context, scope, type, origin, checkForDuplicates);
    let init = null;
    if (optional(state, context | 32768, 8388637)) {
        init = secludeGrammar(state, context, 0, parseAssignmentExpression);
        if (isInOrOf(state) && (origin & 2 || isBinding)) {
            if ((type & 2) < 1 || context & (16 | 1024) || isBinding) {
                report(state, 0);
            }
        }
    }
    else if ((type & 8 || isBinding) && !isInOrOf(state)) {
        report(state, 0, type & 8 ? 'const' : 'destructuring');
    }
    return {
        type: 'VariableDeclarator',
        init,
        id
    };
}
export function parseExpression(state, context) {
    const expr = secludeGrammar(state, context, 0, parseAssignmentExpression);
    if (state.token !== 18)
        return expr;
    return parseSequenceExpression(state, context, expr);
}
export function parseSequenceExpression(state, context, left) {
    const expressions = [left];
    while (optional(state, context | 32768, 18)) {
        expressions.push(secludeGrammar(state, context, 0, parseAssignmentExpression));
    }
    return {
        type: 'SequenceExpression',
        expressions
    };
}
function parseYieldExpression(state, context) {
    expect(state, context | 32768, 2265194);
    let argument = null;
    let delegate = false;
    if ((state.flags & 1) < 1) {
        delegate = optional(state, context, 21105203);
        if (state.token & 131072 || delegate) {
            argument = parseAssignmentExpression(state, context);
        }
    }
    return {
        type: 'YieldExpression',
        argument,
        delegate
    };
}
function parseAssignmentExpression(state, context) {
    const { token, tokenValue } = state;
    if (token & 2097152 && context & 2097152)
        return parseYieldExpression(state, context);
    const expr = acquireGrammar(state, context, 0, parseBinaryExpression);
    if (token & 1048576 &&
        (state.flags & 1) < 1 &&
        ((state.token & 274432) === 274432 || (state.token & 2097152) === 2097152)) {
        const scope = createScope(5);
        addVariableAndDeduplicate(state, context, scope, 1, 0, true, state.tokenValue);
        const arg = parseIdentifier(state, context);
        if (state.flags & 1)
            report(state, 0);
        return parseArrowFunctionExpression(state, context, scope, [arg], true, 64);
    }
    if (state.token === 131082) {
        let { type, scope: arrowScope, params } = expr;
        if (type & (2 | 4)) {
            if (state.flags & 1)
                report(state, 0);
            state.pendingCoverInitializeError = null;
            state.bindable = state.assignable = false;
        }
        else {
            if ((token & 36864) === 36864) {
                state.flags |= 512;
            }
            else if (tokenValue === 'eval' || tokenValue === 'arguments') {
                if (context & 1024)
                    report(state, 85);
                state.flags |= 1024;
            }
            arrowScope = createScope(5);
            params = [expr];
            type = 64;
            addVariableAndDeduplicate(state, context, arrowScope, 1, 0, true, tokenValue);
        }
        return parseArrowFunctionExpression(state, context, arrowScope, params, (type & 4) > 0, type);
    }
    if ((state.token & 8388608) === 8388608) {
        if (context & 1024 && nameIsArgumentsOrEval(expr.name)) {
            report(state, 0);
        }
        else if (state.token === 8388637) {
            if (!state.assignable)
                report(state, 84);
            reinterpret(state, expr);
        }
        else {
            if (!state.assignable || !isValidSimpleAssignmentTarget(expr))
                report(state, 84);
            state.bindable = state.assignable = false;
        }
        const operator = state.token;
        next(state, context | 32768);
        const right = secludeGrammar(state, context, 0, parseAssignmentExpression);
        state.pendingCoverInitializeError = null;
        return {
            type: 'AssignmentExpression',
            left: expr,
            operator: KeywordDescTable[operator & 255],
            right
        };
    }
    return parseConditionalExpression(state, context, expr);
}
function parseConditionalExpression(state, context, test) {
    if (!optional(state, context | 32768, 22))
        return test;
    const consequent = secludeGrammar(state, context, 0, parseAssignmentExpression);
    expect(state, context | 32768, 21);
    const alternate = secludeGrammar(state, context, 0, parseAssignmentExpression);
    state.bindable = state.assignable = false;
    return {
        type: 'ConditionalExpression',
        test,
        consequent,
        alternate
    };
}
function parseBinaryExpression(state, context, minPrec, left = parseUnaryExpression(state, context)) {
    const bit = -((context & 8192) > 0) & 33707825;
    let t;
    let prec;
    while (state.token & 16908288) {
        t = state.token;
        prec = t & 3840;
        if (prec + ((t === 16911158) << 8) - ((bit === t) << 12) <= minPrec)
            break;
        next(state, context | 32768);
        left = {
            type: t & 65536 ? 'LogicalExpression' : 'BinaryExpression',
            left,
            right: secludeGrammar(state, context, prec, parseBinaryExpression),
            operator: KeywordDescTable[t & 255]
        };
        state.assignable = state.bindable = false;
    }
    return left;
}
function parseAwaitExpression(state, context) {
    next(state, context | 32768);
    return {
        type: 'AwaitExpression',
        argument: parseUnaryExpression(state, context)
    };
}
function parseUnaryExpression(state, context) {
    if ((state.token & 33685504) === 33685504) {
        const unaryOperator = state.token;
        next(state, context | 32768);
        const argument = secludeGrammar(state, context, 0, parseUnaryExpression);
        if (state.token === 16911158)
            report(state, 57);
        if (context & 1024 && (unaryOperator & 33706027) === 33706027) {
            if (argument.type === 'Identifier') {
                report(state, 56);
            }
            else if (context & 1 && state.flags & 128) {
                report(state, 82);
            }
        }
        state.bindable = state.assignable = false;
        return {
            type: 'UnaryExpression',
            operator: KeywordDescTable[unaryOperator & 255],
            argument,
            prefix: true
        };
    }
    return context & 4194304 && state.token & 524288
        ? parseAwaitExpression(state, context)
        : parseUpdateExpression(state, context);
}
function parseUpdateExpression(state, context) {
    const { token } = state;
    if ((state.token & 67239936) === 67239936) {
        next(state, context | 32768);
        const expr = parseLeftHandSideExpression(state, context);
        if (context & 1024 && (expr.name === 'eval' || expr.name === 'arguments')) {
            report(state, 83, 'Prefix');
        }
        if (!state.assignable)
            report(state, 84);
        state.bindable = state.assignable = false;
        return {
            type: 'UpdateExpression',
            argument: expr,
            operator: KeywordDescTable[token & 255],
            prefix: true
        };
    }
    const expression = parseLeftHandSideExpression(state, context);
    if ((state.token & 67239936) === 67239936 && (state.flags & 1) < 1) {
        if (context & 1024 && (expression.name === 'eval' || expression.name === 'arguments')) {
            report(state, 83, 'PostFix');
        }
        if (!state.assignable)
            report(state, 84);
        const operator = state.token;
        next(state, context | 32768);
        state.bindable = state.assignable = false;
        return {
            type: 'UpdateExpression',
            argument: expression,
            operator: KeywordDescTable[operator & 255],
            prefix: false
        };
    }
    return expression;
}
export function parseLeftHandSideExpression(state, context) {
    const expr = context & 1 && state.token === 151641
        ? parseCallImportOrMetaProperty(state, context)
        : state.token === 151644
            ? parseSuperExpression(state, context)
            : parseMemberExpression(state, context, parsePrimaryExpression(state, context));
    return parseCallExpression(state, context, expr);
}
function parseCallExpression(state, context, callee) {
    const scope = state.bindable && callee.name === 'async' ? createScope(1) : null;
    const { flags } = state;
    while (true) {
        callee = parseMemberExpression(state, context, callee);
        if (state.token !== 131083)
            return callee;
        expect(state, context | 32768, 131083);
        let seenSpread = false;
        let spreadCount = 0;
        const params = [];
        while (state.token !== 16) {
            if (state.token === 14) {
                params.push(parseSpreadElement(state, context));
                seenSpread = true;
            }
            else {
                params.push(secludeGrammar(state, context, 0, parseAsyncArgument));
            }
            if (state.token === 16)
                break;
            expect(state, context | 32768, 18);
            state.assignable = false;
            if (seenSpread)
                spreadCount++;
        }
        expect(state, context, 16);
        if (state.token === 131082) {
            if (flags & 1)
                report(state, 0);
            if (!state.bindable)
                report(state, 0);
            state.bindable = state.assignable = false;
            if (spreadCount > 0)
                report(state, 92);
            state.bindable = false;
            return {
                type: 4,
                scope,
                params
            };
        }
        state.bindable = state.assignable = false;
        callee = {
            type: 'CallExpression',
            callee,
            arguments: params
        };
    }
}
function parseCallImportOrMetaProperty(state, context) {
    const id = parseIdentifier(state, context);
    if (optional(state, context, 13)) {
        if (context & 2048 && state.tokenValue === 'meta')
            return parseMetaProperty(state, context, id);
        report(state, 1, KeywordDescTable[state.token & 255]);
    }
    const expr = parseImportExpression();
    return parseCallExpression(state, context, expr);
}
function parseImportExpression() {
    return {
        type: 'Import'
    };
}
export function parseMetaProperty(state, context, id) {
    return {
        meta: id,
        type: 'MetaProperty',
        property: parseIdentifier(state, context)
    };
}
function parseSuperExpression(state, context) {
    next(state, context);
    state.assignable = state.bindable = false;
    if (state.token === 131091 || state.token === 13) {
        if ((context & 262144) < 1)
            report(state, 59);
        state.assignable = true;
    }
    else if ((context & 524288) < 1 && state.token === 131083) {
        report(state, 58);
    }
    return { type: 'Super' };
}
function parseIdentifierNameOrPrivateName(state, context) {
    if (!optional(state, context, 119))
        return parseIdentifierName(state, context);
    state.flags |= 128;
    return {
        type: 'PrivateName',
        name: state.tokenValue
    };
}
function parseIdentifierName(state, context) {
    if ((state.token & (274432 | 4096)) !== 274432 &&
        (state.token & 4096) !== 4096)
        report(state, 0);
    return parseIdentifier(state, context);
}
function parseMemberExpression(state, context, expr) {
    while (true) {
        switch (state.token) {
            case 13:
                next(state, context);
                state.bindable = false;
                state.assignable = true;
                expr = {
                    type: 'MemberExpression',
                    object: expr,
                    computed: false,
                    property: context & 1
                        ? parseIdentifierNameOrPrivateName(state, context)
                        : parseIdentifierName(state, context)
                };
                continue;
            case 131091:
                next(state, context | 32768);
                state.bindable = false;
                state.assignable = true;
                expr = {
                    type: 'MemberExpression',
                    object: expr,
                    computed: true,
                    property: parseExpression(state, context)
                };
                expect(state, context, 20);
                break;
            case 131081:
                state.bindable = state.assignable = false;
                expr = {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplateLiteral(state, context)
                };
                break;
            case 131080:
                state.bindable = state.assignable = false;
                expr = {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplate(state, context | 65536)
                };
                break;
            default:
                return expr;
        }
    }
}
function parseTemplateLiteral(parser, context) {
    return {
        type: 'TemplateLiteral',
        expressions: [],
        quasis: [parseTemplateTail(parser, context)]
    };
}
function parseTemplateSpans(state, tail) {
    return {
        type: 'TemplateElement',
        value: {
            cooked: state.tokenValue,
            raw: state.tokenRaw
        },
        tail
    };
}
function parseTemplate(state, context) {
    const quasis = [parseTemplateSpans(state, false)];
    expect(state, context | 32768, 131080);
    const expressions = [parseExpression(state, context)];
    while ((state.token = scanTemplateTail(state, context)) !== 131081) {
        quasis.push(parseTemplateSpans(state, false));
        expect(state, context | 32768, 131080);
        expressions.push(parseExpression(state, context));
    }
    quasis.push(parseTemplateSpans(state, true));
    state.assignable = state.bindable = false;
    next(state, context);
    return {
        type: 'TemplateLiteral',
        expressions,
        quasis
    };
}
function parseTemplateTail(state, context) {
    const { tokenValue, tokenRaw } = state;
    expect(state, context | 32768, 131081);
    return {
        type: 'TemplateElement',
        value: {
            cooked: tokenValue,
            raw: tokenRaw
        },
        tail: true
    };
}
function parseArgumentList(state, context) {
    expect(state, context | 32768, 131083);
    const expressions = [];
    while (state.token !== 16) {
        if (state.token === 14) {
            expressions.push(parseSpreadElement(state, context));
            if (state.token === 16)
                break;
            expect(state, context, 18);
            continue;
        }
        else {
            expressions.push(secludeGrammar(state, context, 0, parseAssignmentExpression));
        }
        if (!optional(state, context | 32768, 18))
            break;
    }
    expect(state, context, 16);
    return expressions;
}
function parseSpreadElement(state, context) {
    expect(state, context | 32768, 14);
    const argument = acquireGrammar(state, context, 0, parseAssignmentExpression);
    return {
        type: 'SpreadElement',
        argument
    };
}
function parseAsyncArgument(state, context) {
    const arg = parseAssignmentExpression(state, context);
    state.pendingCoverInitializeError = null;
    return arg;
}
function parseNewExpression(state, context) {
    const id = parseIdentifier(state, context | 32768);
    if (optional(state, context, 13)) {
        return (context & 67108864) < 1 || state.tokenValue !== 'target'
            ? report(state, 0)
            : parseMetaProperty(state, context, id);
    }
    let callee;
    if (context & 1 && state.token === 151641) {
        if (lookAheadOrScan(state, context, nextTokenIsLeftParen, true))
            report(state, 1, KeywordDescTable[state.token & 255]);
        callee = parseCallImportOrMetaProperty(state, context);
    }
    else {
        callee = secludeGrammar(state, context, 0, parseMemberExpressionOrHigher);
    }
    return {
        type: 'NewExpression',
        callee,
        arguments: state.token === 131083 ? parseArgumentList(state, context) : []
    };
}
function parseMemberExpressionOrHigher(state, context) {
    return parseMemberExpression(state, context, parsePrimaryExpression(state, context));
}
export function parsePrimaryExpression(state, context) {
    switch (state.token) {
        case 131074:
        case 131075:
            state.bindable = state.assignable = false;
            return parseLiteral(state, context, state.tokenValue);
        case 116:
            state.bindable = state.assignable = false;
            return parseBigIntLiteral(state, context);
        case 131076:
            state.bindable = state.assignable = false;
            return parseRegularExpressionLiteral(state, context);
        case 151558:
        case 151557:
            state.bindable = state.assignable = false;
            return parseLiteral(state, context, state.tokenValue === 'true');
        case 151559:
            state.bindable = state.assignable = false;
            return parseLiteral(state, context, null);
        case 151646:
            state.bindable = state.assignable = false;
            return parseThisExpression(state, context);
        case 131091:
            return parseArrayLiteral(state, context & ~8192);
        case 131083:
            return parseParenthesizedExpression(state, context);
        case 131084:
            return parseObjectLiteral(state, context & ~8192, -1, 0);
        case 151639:
            state.bindable = state.assignable = false;
            return parseFunctionExpression(state, context, false);
        case 151629:
            state.bindable = state.assignable = false;
            return parseClassExpression(state, context);
        case 131081:
            state.bindable = state.assignable = false;
            return parseTemplateLiteral(state, context);
        case 131080:
            state.bindable = state.assignable = false;
            return parseTemplate(state, context);
        case 151642:
            state.bindable = state.assignable = false;
            return parseNewExpression(state, context);
        case 151644:
            state.bindable = state.assignable = false;
            return parseSuperExpression(state, context);
        case 119:
            state.bindable = state.assignable = false;
            return parseIdentifierNameOrPrivateName(state, context);
        case 1060972: {
            if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
                state.bindable = state.assignable = false;
                return parseFunctionExpression(state, context, true);
            }
            return parseIdentifier(state, context);
        }
        case 402821192: {
            if (context & 1024)
                report(state, 86);
            next(state, context);
            if (state.flags & 1 && state.token === 131091) {
                report(state, 97);
            }
            return context & 8
                ? {
                    type: 'Identifier',
                    name: 'let',
                    raw: 'let'
                }
                : {
                    type: 'Identifier',
                    name: 'let'
                };
        }
        case 20561:
            return parseDoExpression(state, context);
        case 2265194:
            if (context & (2097152 | 1024))
                report(state, 67);
        default:
            if (isValidIdentifier(context, state.token)) {
                return parseIdentifier(state, context | 65536);
            }
            report(state, 0);
    }
}
function parseDoExpression(state, context) {
    if ((context & 128) < 1)
        report(state, 91);
    expect(state, context, 20561);
    return {
        type: 'DoExpression',
        body: parseBlockStatement(state, context, createScope(1))
    };
}
export function parseArrayLiteral(state, context) {
    next(state, context | 32768);
    const elements = [];
    while (state.token !== 20) {
        if (optional(state, context, 18)) {
            elements.push(null);
            if (state.token === 131091) {
                break;
            }
        }
        else if (state.token === 14) {
            expect(state, context | 32768, 14);
            const argument = acquireGrammar(state, context, 0, parseAssignmentExpression);
            if (!state.assignable && state.pendingCoverInitializeError)
                report(state, 0);
            if (argument.type !== 'ArrayExpression' &&
                argument.type !== 'ObjectExpression' &&
                !isValidSimpleAssignmentTarget(argument)) {
                state.bindable = state.assignable = false;
            }
            elements.push({
                type: 'SpreadElement',
                argument
            });
            if (state.token !== 20) {
                state.bindable = state.assignable = false;
                expect(state, context, 18);
            }
        }
        else {
            elements.push(acquireGrammar(state, context, 0, parseAssignmentExpression));
            if (optional(state, context, 18)) {
                if (state.token === 20) {
                    break;
                }
            }
            else {
                break;
            }
        }
    }
    expect(state, context, 20);
    return {
        type: 'ArrayExpression',
        elements
    };
}
function parseFunctionExpression(state, context, isAsync) {
    expect(state, context, 151639);
    const isGenerator = optional(state, context, 21105203);
    let functionScope = createScope(1);
    let id = null;
    let firstRestricted;
    if (state.token & 274432) {
        validateBindingIdentifier(state, context & 1024
            ? 2097152
            : isGenerator
                ? 2097152
                : 0 | (context & 2048) || isGenerator
                    ? 4194304
                    : 0, 2);
        addVariableAndDeduplicate(state, context, functionScope, 2, 0, true, state.tokenValue);
        functionScope = createSubScope(functionScope, 1);
        firstRestricted = state.tokenValue;
        id = parseIdentifier(state, context);
    }
    context =
        (context |
            4194304 |
            2097152 |
            8388608 |
            262144 |
            524288 |
            16777216) ^
            (4194304 |
                2097152 |
                8388608 |
                262144 |
                524288 |
                16777216);
    if (isAsync)
        context |= 4194304;
    if (isGenerator)
        context |= 2097152;
    const paramScoop = createSubScope(functionScope, 5);
    const params = parseFormalParameters(state, context | 67108864 | 8388608, paramScoop, 32, 0);
    const body = parseFunctionBody(state, context | 67108864, createSubScope(paramScoop, 1), firstRestricted, 0);
    return {
        type: 'FunctionExpression',
        params,
        body,
        async: isAsync,
        generator: isGenerator,
        id
    };
}
function parseArrowFunctionExpression(state, context, scope, params, isAsync, type) {
    if (type & 64) {
        expect(state, context | 32768, 131082);
    }
    else {
        expect(state, context, 131082);
        for (let i = 0; i < params.length; ++i)
            reinterpret(state, params[i]);
    }
    if (state.flags & 1)
        report(state, 0);
    if (checkIfExistInLexicalBindings(state, context, scope, 0, true))
        report(state, 41);
    context =
        (context | 4194304 | 2097152 | 8388608) ^
            (4194304 | 2097152 | 8388608);
    if (isAsync)
        context |= 4194304;
    const expression = state.token !== 131084;
    const body = expression
        ? secludeGrammar(state, context, 0, parseAssignmentExpression)
        : parseFunctionBody(state, context, createSubScope(scope, 1), state.tokenValue, 0);
    return {
        type: 'ArrowFunctionExpression',
        body,
        params,
        id: null,
        async: isAsync,
        expression
    };
}
export function parseParenthesizedExpression(state, context) {
    expect(state, context | 32768, 131083);
    const scope = createScope(5);
    if (optional(state, context, 16)) {
        if (state.token !== 131082)
            report(state, 0);
        state.assignable = state.bindable = false;
        return {
            type: 2,
            scope,
            params: []
        };
    }
    else if (state.token === 14) {
        const rest = parseRestElement(state, context, scope, 1, 0);
        expect(state, context, 16);
        if (state.token !== 131082)
            report(state, 0);
        state.assignable = state.bindable = false;
        return {
            type: 2,
            scope,
            params: [rest]
        };
    }
    let expr = acquireGrammar(state, context, 0, parseAssignmentExpression);
    let isSequence = false;
    if (state.token === 18) {
        state.assignable = false;
        isSequence = true;
        const params = [expr];
        while (optional(state, context | 32768, 18)) {
            if (optional(state, context, 16)) {
                if (state.token !== 131082)
                    report(state, 0);
                return {
                    type: 2,
                    scope,
                    params: params
                };
            }
            state.assignable = false;
            if (state.token === 14) {
                if (!state.bindable)
                    report(state, 0);
                const restElement = parseRestElement(state, context, scope, 1, 0);
                expect(state, context, 16);
                if (state.token !== 131082)
                    report(state, 0);
                state.bindable = false;
                params.push(restElement);
                return {
                    type: 2,
                    scope,
                    params: params
                };
            }
            else if (optional(state, context, 16)) {
                if (state.token !== 131082)
                    report(state, 0);
                return {
                    type: 2,
                    scope,
                    params: params
                };
            }
            else {
                params.push(acquireGrammar(state, context, 0, parseAssignmentExpression));
            }
        }
        expr = {
            type: 'SequenceExpression',
            expressions: params
        };
    }
    expect(state, context, 16);
    if ((state.flags & 1) < 1 && state.token === 131082) {
        if (!state.bindable)
            report(state, 88);
        state.bindable = false;
        return {
            type: 2,
            scope,
            params: isSequence ? expr.expressions : [expr],
            async: false
        };
    }
    state.bindable = false;
    if (!isValidSimpleAssignmentTarget(expr))
        state.assignable = false;
    return expr;
}
function parseClassDeclaration(state, context, scope) {
    next(state, context);
    context = (context | 1024 | 16777216) ^ 16777216;
    let id = null;
    let superClass = null;
    if (state.token & 274432 && state.token !== 20564) {
        validateBindingIdentifier(state, context | 1024, 16);
        addVariableAndDeduplicate(state, context, scope, 4, 0, true, state.tokenValue);
        id = parseIdentifier(state, context);
    }
    else if (!(context & 512))
        report(state, 0);
    if (optional(state, context, 20564)) {
        superClass = secludeGrammar(state, context, 0, parseLeftHandSideExpression);
        context |= 524288;
    }
    else
        context = (context | 524288) ^ 524288;
    context |= 262144;
    const body = parseClassBodyAndElementList(state, context, 128);
    return {
        type: 'ClassDeclaration',
        id,
        superClass,
        body
    };
}
function parseClassExpression(state, context) {
    next(state, context);
    context = (context | (1024 | 16777216)) ^ (1024 | 16777216);
    let id = null;
    let superClass = null;
    if (state.token & 274432 && state.token !== 20564) {
        validateBindingIdentifier(state, context | 1024, 16);
        addVariable(state, context, -1, 4, 0, false, false, state.tokenValue);
        id = parseIdentifier(state, context);
    }
    if (optional(state, context, 20564)) {
        superClass = secludeGrammar(state, context, 0, parseLeftHandSideExpression);
        context |= 524288;
    }
    else
        context = (context | 524288) ^ 524288;
    context |= 262144;
    const body = parseClassBodyAndElementList(state, context, 0);
    return {
        type: 'ClassExpression',
        id,
        superClass,
        body
    };
}
export function parseClassBodyAndElementList(state, context, origin) {
    expect(state, context | 32768, 131084);
    const body = [];
    while (state.token !== 536870927) {
        if (optional(state, context, 536870929))
            continue;
        body.push(parseClassElementList(state, context, 0));
    }
    expect(state, origin & 128 ? context | 32768 : context, 536870927);
    state.flags &= ~2048;
    return {
        type: 'ClassBody',
        body
    };
}
function parseClassElementList(state, context, modifier) {
    let key;
    let { token, tokenValue } = state;
    if (state.token & 274432) {
        key = parseIdentifier(state, context);
        switch (token) {
            case 36969:
                if ((modifier & 32) === 0 && state.token !== 131083) {
                    return parseClassElementList(state, context, 32);
                }
                break;
            case 1060972:
                if (state.token !== 131083 && (state.flags & 1) === 0) {
                    if (optional(state, context, 21105203))
                        modifier |= 8;
                    tokenValue = state.tokenValue;
                    if (state.token & 274432) {
                        key = parseIdentifier(state, context);
                        if (state.flags & 1)
                            report(state, 0);
                    }
                    else if (state.token === 131074 || state.token === 131075) {
                        key = parseLiteral(state, context, state.tokenValue);
                    }
                    else if (state.token === 131091) {
                        modifier |= 2;
                        key = parseComputedPropertyName(state, context);
                    }
                    else {
                        report(state, 0);
                    }
                    modifier |= 16;
                }
                break;
            case 12399:
                if (state.token !== 131083) {
                    tokenValue = state.tokenValue;
                    if (state.token & 274432) {
                        key = parseIdentifier(state, context);
                    }
                    else if (state.token === 131074 || state.token === 131075) {
                        key = parseLiteral(state, context, state.tokenValue);
                    }
                    else if (state.token === 131091) {
                        modifier |= 2;
                        key = parseComputedPropertyName(state, context);
                    }
                    else {
                        report(state, 0);
                    }
                    modifier |= 256;
                }
                break;
            case 12400:
                if (state.token !== 131083) {
                    tokenValue = state.tokenValue;
                    if (state.token & 274432) {
                        key = parseIdentifier(state, context);
                    }
                    else if (state.token === 131074 || state.token === 131075) {
                        key = parseLiteral(state, context, state.tokenValue);
                    }
                    else if (state.token === 131091) {
                        modifier |= 2;
                        key = parseComputedPropertyName(state, context);
                    }
                    else {
                        report(state, 0);
                    }
                    modifier |= 512;
                }
                break;
            default:
        }
    }
    else if (state.token === 131091) {
        modifier |= 2;
        key = parseComputedPropertyName(state, context);
    }
    else if (state.token === 131074 || state.token === 131075) {
        if (state.tokenValue === 'constructor')
            modifier |= 64;
        key = parseLiteral(state, context, state.tokenValue);
    }
    else if (state.token === 21105203) {
        next(state, context);
        tokenValue = state.tokenValue;
        if (state.token & 274432) {
            key = parseIdentifier(state, context);
        }
        else if (state.token === 131074 || state.token === 131075) {
            key = parseLiteral(state, context, state.tokenValue);
        }
        else if (state.token === 131091) {
            modifier |= 2;
            key = parseComputedPropertyName(state, context);
        }
        else {
            report(state, 0);
        }
        modifier |= 8;
    }
    else if (state.token === 536870929) {
        next(state, context);
    }
    else {
        report(state, 1, KeywordDescTable[state.token & 255]);
    }
    if ((modifier & 2) === 0 &&
        modifier & (32 | 768) &&
        state.tokenValue === 'prototype') {
        report(state, 62);
    }
    if (tokenValue === 'constructor') {
        if ((modifier & 32) === 0) {
            if (modifier & (768 | 16 | 8))
                report(state, 63, 'accessor');
            if ((context & 524288) === 0 && (modifier & 2) === 0) {
                if (state.flags & 2048)
                    report(state, 60);
                else
                    state.flags |= 2048;
            }
        }
        modifier |= 64;
    }
    if (state.token !== 131083)
        report(state, 0);
    return {
        type: 'MethodDefinition',
        kind: (modifier & 32) === 0 && modifier & 64
            ? 'constructor'
            : modifier & 256
                ? 'get'
                : modifier & 512
                    ? 'set'
                    : 'method',
        static: (modifier & 32) !== 0,
        computed: (modifier & 2) !== 0,
        key,
        value: parseMethodDeclaration(state, context, modifier)
    };
}
function parseObjectLiteral(state, context, scope, type) {
    next(state, context);
    let key = null;
    let token = state.token;
    let tokenValue = state.tokenValue;
    let value;
    let hasProto = false;
    const properties = [];
    let objState = 0;
    const { assignable, bindable, pendingCoverInitializeError } = state;
    state.bindable = true;
    state.assignable = true;
    state.pendingCoverInitializeError = null;
    while (state.token !== 536870927) {
        if (state.token === 14) {
            properties.push(parseSpreadElement(state, context));
        }
        else {
            if (state.token & 274432) {
                token = state.token;
                tokenValue = state.tokenValue;
                objState = 0;
                key = parseIdentifier(state, context);
                const newLine = (state.flags & 1) > 0;
                if (state.token === 18 ||
                    state.token === 536870927 ||
                    state.token === 8388637) {
                    objState |= 4;
                    if (tokenValue !== 'eval' || tokenValue !== 'arguments')
                        validateBindingIdentifier(state, context, type, token);
                    addVariable(state, context, scope, type, 0, false, false, tokenValue);
                    if (state.token === 8388637) {
                        state.pendingCoverInitializeError = 87;
                        expect(state, context, 8388637);
                        value = parseAssignmentPattern(state, context, key);
                    }
                    else {
                        value = key;
                    }
                }
                else if (optional(state, context | 32768, 21)) {
                    if (tokenValue === '__proto__') {
                        if (hasProto) {
                            state.pendingCoverInitializeError = 87;
                        }
                        else
                            hasProto = true;
                    }
                    if ((state.token & 274432) > 0)
                        addVariable(state, context, scope, type, 0, false, false, tokenValue);
                    value = acquireGrammar(state, context, 0, parseAssignmentExpression);
                }
                else if (state.token === 131091) {
                    key = parseComputedPropertyName(state, context);
                    if (token === 1060972) {
                        if (newLine)
                            report(state, 0);
                        objState |= 16 | 2 | 1;
                    }
                    else {
                        if (token === 12399)
                            objState = (objState & ~512) | 256;
                        else if ((token & 12400) === 12400)
                            objState = (objState & ~256) | 512;
                        objState |= 2 & ~1;
                    }
                    if (state.token !== 131083)
                        report(state, 0);
                    state.bindable = state.assignable = false;
                    value = parseMethodDeclaration(state, context, objState);
                }
                else if (state.token === 131083) {
                    objState = objState | (1 & ~(16 | 8));
                    state.bindable = state.assignable = false;
                    value = parseMethodDeclaration(state, context, objState);
                }
                else {
                    if (optional(state, context, 21105203))
                        objState |= 8;
                    if ((state.token & 274432) > 0) {
                        key = parseIdentifier(state, context);
                        if (state.token !== 131083)
                            report(state, 0);
                        if (token === 1060972) {
                            if (newLine)
                                report(state, 0);
                            objState |= 16 | 1;
                        }
                        else if (token === 12399) {
                            objState = (objState & ~512) | 256;
                        }
                        else if (token === 12400) {
                            objState = (objState & ~256) | 512;
                        }
                        state.bindable = state.assignable = false;
                        value = parseMethodDeclaration(state, context, objState);
                    }
                    else if (state.token === 131074 || state.token === 131075) {
                        key = parseLiteral(state, context, state.tokenValue);
                        if (state.token !== 131083)
                            report(state, 0);
                        if (token === 1060972) {
                            if (newLine)
                                report(state, 0);
                            objState |= 16 | 1;
                        }
                        else if (token === 12399) {
                            objState = (objState & ~512) | 256;
                        }
                        else if (token === 12400) {
                            objState = (objState & ~256) | 512;
                        }
                        state.bindable = state.assignable = false;
                        value = parseMethodDeclaration(state, context, objState);
                    }
                    else if (state.token === 131091) {
                        if (token === 1060972) {
                            if (newLine)
                                report(state, 0);
                            objState |= 16 | 1;
                        }
                        else if (token === 12399) {
                            objState = (objState & ~512) | 256;
                        }
                        else if (token === 12400) {
                            objState = (objState & ~256) | 512;
                        }
                        key = parseComputedPropertyName(state, context);
                        value = parseMethodDeclaration(state, context, objState);
                    }
                }
            }
            else if (state.token === 131074 || state.token === 131075) {
                tokenValue = state.tokenValue;
                key = parseLiteral(state, context, tokenValue);
                if (state.token === 8388637)
                    report(state, 0);
                if (optional(state, context | 32768, 21)) {
                    if (tokenValue === '__proto__') {
                        if (hasProto) {
                            state.pendingCoverInitializeError = 87;
                        }
                        else
                            hasProto = true;
                    }
                    value = acquireGrammar(state, context, 0, parseAssignmentExpression);
                    addVariable(state, context, scope, type, 0, false, false, tokenValue);
                }
                else {
                    state.bindable = state.assignable = false;
                    value = parseMethodDeclaration(state, context, objState);
                    objState |= 1;
                }
            }
            else if (state.token === 131091) {
                key = parseComputedPropertyName(state, context);
                objState = (objState & ~(16 | 8 | 768)) | 2;
                if (state.token === 21) {
                    next(state, context);
                    value = parseAssignmentExpression(state, context | 32768);
                }
                else {
                    objState |= 1;
                    if (state.token !== 131083)
                        report(state, 0);
                    state.bindable = state.assignable = false;
                    value = parseMethodDeclaration(state, context, objState);
                }
            }
            else if (state.token & 21105203) {
                next(state, context);
                if (state.token & 274432) {
                    token = state.token;
                    objState &= ~(1 | 16);
                    key = parseIdentifier(state, context);
                    if (state.token === 131083) {
                        state.bindable = state.assignable = false;
                        value = parseMethodDeclaration(state, context, objState | 8);
                        objState |= 1 | 8;
                    }
                    else {
                        if (token === 1060972)
                            report(state, 0);
                        if (token === 12399 || (token & 12400) === 12400)
                            report(state, 0);
                        if (token === 21)
                            report(state, 0);
                        report(state, 0);
                    }
                }
                else if (state.token === 131074 || state.token === 131075) {
                    key = parseLiteral(state, context, state.tokenValue);
                    state.bindable = state.assignable = false;
                    value = parseMethodDeclaration(state, context, objState | 8);
                    objState |= 1;
                }
                else if (state.token === 131091) {
                    key = parseComputedPropertyName(state, context);
                    state.bindable = state.assignable = false;
                    value = parseMethodDeclaration(state, context, objState | 8);
                    objState |= 1 | 2;
                }
                else {
                    report(state, 1, KeywordDescTable[state.token & 255]);
                }
            }
            else {
                report(state, 1, KeywordDescTable[state.token & 255]);
            }
            properties.push({
                type: 'Property',
                key,
                value,
                kind: !(objState & 768) ? 'init' : objState & 512 ? 'set' : 'get',
                computed: (objState & 2) > 0,
                method: (objState & 1) > 0,
                shorthand: (objState & 4) > 0
            });
        }
        optional(state, context, 18);
    }
    expect(state, context, 536870927);
    state.flags &= ~32;
    state.bindable = state.bindable && bindable;
    state.assignable = state.assignable && assignable;
    state.pendingCoverInitializeError = pendingCoverInitializeError || state.pendingCoverInitializeError;
    return {
        type: 'ObjectExpression',
        properties
    };
}
function parseMethodDeclaration(state, context, objState) {
    state.assignable = state.bindable = false;
    const { assignable, bindable, pendingCoverInitializeError } = state;
    state.bindable = state.assignable = true;
    state.pendingCoverInitializeError = null;
    const result = parsePropertyMethod(state, context | 33554432, objState);
    if (state.pendingCoverInitializeError !== null) {
        report(state, 0);
    }
    state.bindable = bindable;
    state.assignable = assignable;
    state.pendingCoverInitializeError = pendingCoverInitializeError;
    return result;
}
function parsePropertyMethod(state, context, objState) {
    let functionScope = createScope(1);
    let id = null;
    let firstRestricted;
    if (state.token & 274432) {
        validateBindingIdentifier(state, context & 1024
            ? 2097152
            : (objState & 8) > 0
                ? 2097152
                : 0 | (context & 2048) || (objState & 8) > 0
                    ? 4194304
                    : 0, 2);
        addVariableAndDeduplicate(state, context, functionScope, 2, 0, true, state.tokenValue);
        functionScope = createSubScope(functionScope, 1);
        firstRestricted = state.tokenValue;
        id = parseIdentifier(state, context);
    }
    context =
        (context |
            262144 |
            4194304 |
            2097152 |
            8388608 |
            ((objState & 64) === 0 ? 16777216 | 524288 : 0)) ^
            (4194304 |
                2097152 |
                8388608 |
                ((objState & 64) < 1 ? 16777216 | 524288 : 0));
    if (objState & 16)
        context |= 4194304;
    if (objState & 8)
        context |= 2097152;
    if (objState & 64)
        context |= 16777216;
    const paramScoop = createSubScope(functionScope, 5);
    const params = parseFormalParameters(state, context | 67108864 | 33554432 | 8388608, paramScoop, 32, objState);
    const body = parseFunctionBody(state, context | 67108864 | 33554432, createSubScope(paramScoop, 1), firstRestricted, 0);
    return {
        type: 'FunctionExpression',
        params,
        body,
        async: (objState & 16) > 0,
        generator: (objState & 8) > 0,
        id
    };
}
export function parseLiteral(state, context, value) {
    const { tokenRaw: raw } = state;
    if (context & 1024 && state.flags & 8)
        report(state, 93);
    next(state, context);
    return context & 8
        ? {
            type: 'Literal',
            value,
            raw
        }
        : {
            type: 'Literal',
            value
        };
}
function parseThisExpression(state, context) {
    next(state, context);
    return {
        type: 'ThisExpression'
    };
}
export function parseIdentifier(state, context) {
    const { tokenRaw: raw, tokenValue: name } = state;
    next(state, context);
    return context & 8
        ? {
            type: 'Identifier',
            name,
            raw
        }
        : {
            type: 'Identifier',
            name
        };
}
function parseRegularExpressionLiteral(state, context) {
    const { tokenRegExp: regex, tokenValue: value } = state;
    next(state, context);
    return {
        type: 'Literal',
        value,
        regex
    };
}
export function parseBigIntLiteral(state, context) {
    const { tokenRaw: raw, tokenValue: value } = state;
    next(state, context);
    return {
        type: 'Literal',
        value,
        bigint: raw,
        raw
    };
}
//# sourceMappingURL=state.js.map