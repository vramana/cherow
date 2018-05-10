import { report, tokenDesc, tolerant, Scanner, constructError, errorMessages, Parser, getLocation, consume, finishNode, expect, consumeSemicolon, nextToken, isValidIdentifierPart } from 'cherow';

/**
 * Validate break and continue statement
 *
 * @param parser Parser object
 * @param label label
 * @param isContinue true if validation continue statement
 */
function validateBreakOrContinueLabel(parser, context, label, isContinue) {
    const state = hasLabel(parser, label);
    if (!state)
        tolerant(parser, context, 30 /* UnknownLabel */, label);
    if (isContinue && !(state & 2 /* Nested */))
        tolerant(parser, context, 29 /* IllegalContinue */, label);
}
/**
 * Add label to the stack
 *
 * @param parser Parser object
 * @param label label
 */
function addLabel(parser, label) {
    if (parser.labelSet === undefined)
        parser.labelSet = {};
    parser.labelSet[`$${label}`] = parser.token & 16 /* IsIterationStatement */ ? 2 /* Nested */ : 1 /* NotNested */;
}
/**
 * Remove label from the stack
 *
 * @param parser Parser object
 * @param label label
 */
function popLabel(parser, label) {
    parser.labelSet[`$${label}`] = 0 /* None */;
}
/**
 * Returns either true or false. Depends if the label exist.
 *
 * @param parser Parser object
 * @param label Label
 */
function hasLabel(parser, label) {
    return !parser.labelSet ? 0 /* None */ : parser.labelSet[`$${label}`];
}
/**
 * Finish each the node for each parse. Set line / and column on the node if the
 * options are set for it
 *
 * @param parser Parser object
 * @param context Context masks
 * @param meta Line / column
 * @param node AST node
 */
function finishNode$1(context, parser, meta, node) {
    const { lastIndex, lastLine, lastColumn, sourceFile, index } = parser;
    if (context & 2 /* OptionsRanges */) {
        node.start = meta.index;
        node.end = lastIndex;
    }
    if (context & 16 /* OptionsLoc */) {
        node.loc = {
            start: {
                line: meta.line,
                column: meta.column
            },
            end: {
                line: lastLine,
                column: lastColumn
            }
        };
        if (sourceFile)
            node.loc.source = sourceFile;
    }
    return node;
}
/**
 * Consumes the next token. If the consumed token is not of the expected type
 * then report an error and return null. Otherwise return true.
 *
 * @param parser Parser object
 * @param context Context masks
 * @param t Token
 * @param Err Optionally error message to be thrown
 */
function expect$1(parser, context, token, err = 1 /* UnexpectedToken */) {
    if (parser.token !== token)
        report(parser, err, tokenDesc(parser.token));
    nextToken$1(parser, context);
    return true;
}
/**
 * If the next token matches the given token, this consumes the token
 * and returns true. Otherwise return false.
 *
 * @param parser Parser object
 * @param context Context masks
 * @param t Token
 */
function consume$1(parser, context, token) {
    if (parser.token !== token)
        return false;
    nextToken$1(parser, context);
    return true;
}
/**
 * Advance and return the next token in the stream
 *
 * @param parser Parser object
 * @param context Context masks
 */
function nextToken$1(parser, context) {
    parser.lastIndex = parser.index;
    parser.lastLine = parser.line;
    parser.lastColumn = parser.column;
    return (parser.token = Scanner.scan(parser, context));
}
const hasBit = (mask, flags) => (mask & flags) === flags;
/**
 * Automatic Semicolon Insertion
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function consumeSemicolon$1(parser, context) {
    return parser.token & 524288 /* ASI */ || parser.flags & 1 /* NewLine */ ?
        consume$1(parser, context, 17301521 /* Semicolon */) :
        report(parser, !(context & 131072 /* Async */) && parser.token & 131072 /* IsAwait */ ? 36 /* AwaitOutsideAsync */ : 1 /* UnexpectedToken */, tokenDesc(parser.token));
}
/**
 * Bit fiddle current grammar state and keep track of the state during the parse and restore
 * it back to original state after finish parsing or throw.
 *
 * Ideas for this is basicly from V8 and SM, but also the Esprima parser does this in a similar way.
 *
 * However this implementation is an major improvement over similiar implementations, and
 * does not require additonal bitmasks to be set / unset during the parsing outside this function.
 *
 * @param parser Parser state
 * @param context Context mask
 * @param callback Callback function
 * @param errMsg Optional error message
 */
function parseExpressionCoverGrammar(parser, context, callback) {
    const { flags, pendingExpressionError } = parser;
    parser.flags |= 2 /* AllowBinding */ | 4 /* AllowDestructuring */;
    parser.pendingExpressionError = undefined;
    const res = callback(parser, context);
    // If there exist an pending expression error, we throw an error at
    // the same location it was recorded
    if (!!parser.pendingExpressionError) {
        const { error, line, column, index } = parser.pendingExpressionError;
        constructError(parser, context, index, line, column, error);
    }
    // Here we - just in case - disallow both binding and destructuring
    // and only set the bitmaks if the previous flags (before the callback)
    // is positive.
    // Note that this bitmasks may have been turned off during parsing
    // the callback
    parser.flags &= ~(2 /* AllowBinding */ | 4 /* AllowDestructuring */);
    if (flags & 2 /* AllowBinding */)
        parser.flags |= 2 /* AllowBinding */;
    if (flags & 4 /* AllowDestructuring */)
        parser.flags |= 4 /* AllowDestructuring */;
    parser.pendingExpressionError = pendingExpressionError;
    return res;
}
/**
 * Restor current grammar to previous state, or unset necessary bitmasks
 *
 * @param parser Parser state
 * @param context Context mask
 * @param callback Callback function
 */
function restoreExpressionCoverGrammar(parser, context, callback) {
    const { flags, pendingExpressionError } = parser;
    parser.flags |= 2 /* AllowBinding */ | 4 /* AllowDestructuring */;
    // Clear pending expression error
    parser.pendingExpressionError = undefined;
    const res = callback(parser, context);
    // Both the previous bitmasks and bitmasks set during parsing the callback
    // has to be positive for us to allow further binding or destructuring.
    // Note that we allow both before the callback, so this is the only thing
    // we need to check for.
    if (!(parser.flags & 2 /* AllowBinding */) || !(flags & 2 /* AllowBinding */)) {
        parser.flags &= ~2 /* AllowBinding */;
    }
    if (!(parser.flags & 4 /* AllowDestructuring */) || !(flags & 4 /* AllowDestructuring */)) {
        parser.flags &= ~4 /* AllowDestructuring */;
    }
    // Here we either
    //  1) restore to previous pending expression error
    //  or
    //  2) if a pending expression error have been set during the parse (*only in object literal*)
    //  we overwrite previous error, and keep the new one
    parser.pendingExpressionError = pendingExpressionError || parser.pendingExpressionError;
    return res;
}
/**
 * Set / unset yield / await context masks based on the
 * ModifierState masks before invoking the callback and
 * returning it's content
 *
 * @param parser Parser object
 * @param context Context masks
 * @param state Modifier state
 * @param callback Callback function to be invoked
 * @param methodState Optional Objectstate.
 */
function swapContext(parser, context, state, callback, methodState = 0 /* None */) {
    context &= ~(131072 /* Async */ | 262144 /* Yield */ | 524288 /* InParameter */);
    if (state & 1 /* Generator */)
        context |= 262144 /* Yield */;
    if (state & 2 /* Await */)
        context |= 131072 /* Async */;
    return callback(parser, context, methodState);
}
/**
 * Validates function params
 *
 * Note! In case anyone want to enable full scoping, replace 'paramSet' with an similiar
 * object on the parser object itself. Then push / set the tokenValue to
 * it an use an bitmask to mark it as an 'variable' not 'blockscope'. Then when
 * implementing lexical scoping, you can use that for validation.
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param params Array of token values
 */
function validateParams(parser, context, params) {
    const paramSet = new Map();
    for (let i = 0; i < params.length; i++) {
        const key = `@${params[i]}`;
        if (paramSet.get(key)) {
            tolerant(parser, context, 79 /* ParamDupe */);
        }
        else
            paramSet.set(key, true);
    }
}
/**
 * Reinterpret various expressions as pattern
 * This is only used for assignment and arrow parameter list
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param node AST node
 */
const reinterpret = (parser, context, node) => {
    switch (node.type) {
        case 'Identifier':
        case 'ArrayPattern':
        case 'AssignmentPattern':
        case 'ObjectPattern':
        case 'RestElement':
        case 'MetaProperty':
            return;
        case 'ArrayExpression':
            node.type = 'ArrayPattern';
            for (let i = 0; i < node.elements.length; ++i) {
                // skip holes in pattern
                if (node.elements[i] !== null) {
                    reinterpret(parser, context, node.elements[i]);
                }
            }
            return;
        case 'ObjectExpression':
            node.type = 'ObjectPattern';
            for (let i = 0; i < node.properties.length; i++) {
                reinterpret(parser, context, node.properties[i]);
            }
            return;
        case 'Property':
            reinterpret(parser, context, node.value);
            return;
        case 'SpreadElement':
            node.type = 'RestElement';
            if (node.argument.type !== 'ArrayExpression' &&
                node.argument.type !== 'ObjectExpression' &&
                !isValidSimpleAssignmentTarget(node.argument)) {
                tolerant(parser, context, 69 /* RestDefaultInitializer */);
            }
            reinterpret(parser, context, node.argument);
            break;
        case 'AssignmentExpression':
            node.type = 'AssignmentPattern';
            delete node.operator; // operator is not relevant for assignment pattern
            reinterpret(parser, context, node.left); // recursive descent
            return;
        case 'MemberExpression':
            if (!(context & 524288 /* InParameter */))
                return;
        // Fall through
        default:
            tolerant(parser, context, context & 524288 /* InParameter */ ? 75 /* NotBindable */ : 71 /* InvalidDestructuringTarget */, node.type);
    }
};
/**
 * Does a lookahead.
 *
 * @param parser Parser object
 * @param context  Context masks
 * @param callback Callback function to be invoked
 */
function lookahead(parser, context, callback) {
    const { tokenValue, flags, line, column, startColumn, index, lastColumn, startLine, lastLine, lastIndex, startIndex, tokenRaw, token, lastValue, tokenRegExp } = parser;
    const res = callback(parser, context);
    parser.index = index;
    parser.token = token;
    parser.tokenValue = tokenValue;
    parser.tokenValue = tokenValue;
    parser.flags = flags;
    parser.line = line;
    parser.column = column;
    parser.tokenRaw = tokenRaw;
    parser.lastValue = lastValue;
    parser.startColumn = startColumn;
    parser.lastColumn = lastColumn;
    parser.startLine = startLine;
    parser.lastLine = lastLine;
    parser.lastIndex = lastIndex;
    parser.startIndex = startIndex;
    parser.tokenRegExp = tokenRegExp;
    return res;
}
/**
 * Returns true if this an valid simple assignment target
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function isValidSimpleAssignmentTarget(node) {
    return node.type === 'Identifier' || node.type === 'MemberExpression' ? true : false;
}
/**
 * Get current node location
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function getLocation$1(parser) {
    return {
        line: parser.startLine,
        column: parser.startColumn,
        index: parser.startIndex
    };
}
/**
 * Returns true if this is an valid identifier
 *
 * @param context  Context masks
 * @param t  Token
 */
function isValidIdentifier(context, t) {
    if (context & 4096 /* Strict */) {
        if (context & 8192 /* Module */ && t & 131072 /* IsAwait */)
            return false;
        if (t & 1073741824 /* IsYield */)
            return false;
        return (t & 65536 /* IsIdentifier */) === 65536 /* IsIdentifier */ || (t & 36864 /* Contextual */) === 36864 /* Contextual */;
    }
    return ((t & 65536 /* IsIdentifier */) === 65536 /* IsIdentifier */ ||
        (t & 36864 /* Contextual */) === 36864 /* Contextual */ ||
        (t & 20480 /* FutureReserved */) === 20480 /* FutureReserved */);
}
/**
 * Returns true if this an valid lexical binding and not an identifier
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function isLexical(parser, context) {
    nextToken$1(parser, context);
    const { token } = parser;
    return !!(token & (65536 /* IsIdentifier */ | 8388608 /* IsBindingPattern */ | 1073741824 /* IsYield */ | 131072 /* IsAwait */) ||
        token === 33574984 /* LetKeyword */ ||
        (token & 36864 /* Contextual */) === 36864 /* Contextual */);
}
/**
 * Returns true if this is end of case or default clauses
 *
 * @param parser Parser object
 */
function isEndOfCaseOrDefaultClauses(parser) {
    return (parser.token === 12368 /* DefaultKeyword */ || parser.token === 17301519 /* RightBrace */ || parser.token === 12363 /* CaseKeyword */);
}
/**
 * Validates if the next token in the stream is a left paren or a period
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function nextTokenIsLeftParenOrPeriod(parser, context) {
    nextToken$1(parser, context);
    return parser.token === 50331659 /* LeftParen */ || parser.token === 16777229 /* Period */;
}
/**
 * Validates if the next token in the stream is a identifier or left paren
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function nextTokenisIdentifierOrParen(parser, context) {
    nextToken$1(parser, context);
    const { token } = parser;
    return token & (65536 /* IsIdentifier */ | 1073741824 /* IsYield */) || token === 50331659 /* LeftParen */;
}
/**
 * Validates if the next token in the stream is left parenthesis.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function nextTokenIsLeftParen(parser, context) {
    nextToken$1(parser, context);
    return parser.token === 50331659 /* LeftParen */;
}
/**
 * Validates if the next token in the stream is a function keyword on the same line.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function nextTokenIsFuncKeywordOnSameLine(parser, context) {
    nextToken$1(parser, context);
    return !(parser.flags & 1 /* NewLine */) && parser.token === 33566808 /* FunctionKeyword */;
}
/**
 * Checks if the property has any private field key
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function isPropertyWithPrivateFieldKey(expr) {
    return !expr.property ? false : expr.property.type === 'PrivateName';
}
/**
 * Validates an identifier and either parse it or throw
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseAndValidateIdentifier(parser, context) {
    const { token } = parser;
    if (context & 4096 /* Strict */) {
        // Module code is also "strict mode code"
        if (context & 8192 /* Module */ && token & 131072 /* IsAwait */) {
            tolerant(parser, context, 38 /* DisallowedInContext */, tokenDesc(token));
        }
        if (token & 1073741824 /* IsYield */)
            tolerant(parser, context, 38 /* DisallowedInContext */, tokenDesc(token));
        if ((token & 65536 /* IsIdentifier */) === 65536 /* IsIdentifier */ || (token & 36864 /* Contextual */) === 36864 /* Contextual */) {
            return parseIdentifier(parser, context);
        }
        report(parser, 1 /* UnexpectedToken */, tokenDesc(token));
    }
    if (context & 262144 /* Yield */ && token & 1073741824 /* IsYield */) {
        tolerant(parser, context, 38 /* DisallowedInContext */, tokenDesc(token));
    }
    else if (context & 131072 /* Async */ && token & 131072 /* IsAwait */) {
        tolerant(parser, context, 38 /* DisallowedInContext */, tokenDesc(token));
    }
    if ((token & 65536 /* IsIdentifier */) === 65536 /* IsIdentifier */ ||
        (token & 36864 /* Contextual */) === 36864 /* Contextual */ ||
        (token & 20480 /* FutureReserved */) === 20480 /* FutureReserved */) {
        return parseIdentifier(parser, context);
    }
    report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token));
}
function nameIsArgumentsOrEval(value) {
    return value === 'eval' || value === 'arguments';
}
/**
 * Records an error from current position. If we report an error later, we'll do it from
 * this position.
 *
 * @param parser Parser object
 */
function setPendingError(parser) {
    parser.errorLocation = {
        line: parser.startLine,
        column: parser.startColumn,
        index: parser.startIndex
    };
}
/**
 * Returns tagName for JSX element
 *
 * @param elementName JSX Element name
 */
function isEqualTagNames(elementName) {
    // tslint:disable-next-line:switch-default | this switch is exhaustive
    switch (elementName.type) {
        case 'JSXIdentifier':
            return elementName.name;
        case 'JSXNamespacedName':
            return `${isEqualTagNames(elementName.namespace)}:${isEqualTagNames(elementName.name)}`;
        case 'JSXMemberExpression':
            return `${isEqualTagNames(elementName.object)}.${isEqualTagNames(elementName.property)}`;
    }
}
/**
 * Returns true if this is an instance field ( stage 3 proposal)
 *
 * @param parser Parser object
 */
function isInstanceField(parser) {
    const { token } = parser;
    return token === 17301519 /* RightBrace */ || token === 17301521 /* Semicolon */ || token === 83886109 /* Assign */;
}
/**
 *
 * @param parser Parser object
 * @param context Context masks
 * @param expr  AST expressions
 * @param prefix prefix
 */
function validateUpdateExpression(parser, context, expr, prefix) {
    if (context & 4096 /* Strict */ && nameIsArgumentsOrEval(expr.name)) {
        tolerant(parser, context, 66 /* StrictLHSPrefixPostFix */, prefix);
    }
    if (!isValidSimpleAssignmentTarget(expr)) {
        tolerant(parser, context, 4 /* InvalidLHSInAssignment */);
    }
}
/**
 * Record expression error
 *
 * @param parser Parser object
 * @param error Error message
 */
function setPendingExpressionError(parser, type) {
    parser.pendingExpressionError = {
        error: errorMessages[type],
        line: parser.line,
        column: parser.column,
        index: parser.index
    };
}
/**
 * Validate coer parenthesized expression
 *
 * @param parser Parser object
 * @param state CoverParenthesizedState
 */
function validateCoverParenthesizedExpression(parser, state) {
    const { token } = parser;
    if (token & 8388608 /* IsBindingPattern */) {
        parser.flags |= 8 /* SimpleParameterList */;
    }
    else {
        if ((token & 4194304 /* IsEvalOrArguments */) === 4194304 /* IsEvalOrArguments */) {
            setPendingError(parser);
            state |= 2 /* HasEvalOrArguments */;
        }
        else if ((token & 20480 /* FutureReserved */) === 20480 /* FutureReserved */) {
            setPendingError(parser);
            state |= 4 /* HasReservedWords */;
        }
        else if ((token & 131072 /* IsAwait */) === 131072 /* IsAwait */) {
            setPendingError(parser);
            parser.flags |= 8192 /* HasAwait */;
        }
    }
    return state;
}
/**
 * Validate coer parenthesized expression
 *
 * @param parser Parser object
 * @param state CoverParenthesizedState
 */
function validateAsyncArgumentList(parser, context, state) {
    const { token } = parser;
    if (!(parser.flags & 2 /* AllowBinding */)) {
        tolerant(parser, context, 75 /* NotBindable */);
    }
    else if (token & 8388608 /* IsBindingPattern */) {
        parser.flags |= 8 /* SimpleParameterList */;
    }
    else {
        if ((token & 4194304 /* IsEvalOrArguments */) === 4194304 /* IsEvalOrArguments */) {
            setPendingError(parser);
            state |= 8 /* EvalOrArguments */;
        }
        else if ((token & 131072 /* IsAwait */) === 131072 /* IsAwait */) {
            setPendingError(parser);
            state |= 32 /* Await */;
        }
        else if ((token & 1073741824 /* IsYield */) === 1073741824 /* IsYield */) {
            setPendingError(parser);
            state |= 16 /* Yield */;
        }
    }
    return state;
}
function isStartOfFunctionType(parser, context) {
    switch (parser.token) {
        case 167774015 /* LessThan */:
            return true;
        case 50331659 /* LeftParen */:
            // falls through
            return lookahead(parser, context, isUnambiguouslyStartOfFunctionType);
        default:
            return false;
    }
}
function isUnambiguouslyStartOfFunctionType(parser, context) {
    nextToken$1(parser, context);
    switch (parser.token) {
        case 16 /* RightParen */:
        case 14 /* Ellipsis */:
            return true;
        case 33619969 /* Identifier */:
        case 33566815 /* ThisKeyword */:
            {
                nextToken$1(parser, context);
                switch (parser.token) {
                    case 16777237 /* Colon */:
                    case 16777234 /* Comma */:
                    case 22 /* QuestionMark */:
                    case 83886109 /* Assign */:
                        return true;
                    case 16 /* RightParen */:
                        {
                            nextToken$1(parser, context);
                            if (parser.token === 10 /* Arrow */)
                                return true;
                        }
                    default:
                        return false;
                }
            }
        default:
            return false;
    }
}
function keywordTypeFromName(value) {
    switch (value) {
        case 'any':
            return 'TSAnyKeyword';
        case 'boolean':
            return 'TSBooleanKeyword';
        case 'never':
            return 'TSNeverKeyword';
        case 'number':
            return 'TSNumberKeyword';
        case 'object':
            return 'TSObjectKeyword';
        case 'string':
            return 'TSStringKeyword';
        case 'symbol':
            return 'TSSymbolKeyword';
        case 'undefined':
            return 'TSUndefinedKeyword';
        default:
            return undefined;
    }
}
function iStartOfMappedType(parser, context) {
    nextToken$1(parser, context);
    if (parser.token === 65659 /* ReadOnlyKeyword */) {
        nextToken$1(parser, context);
    }
    if (parser.token !== 41943059 /* LeftBracket */) {
        return false;
    }
    nextToken$1(parser, context);
    if (!(parser.token & 65536 /* IsIdentifier */))
        return false;
    nextToken$1(parser, context);
    return parser.token === 168834865 /* InKeyword */;
}
function isUnambiguouslyIndexSignature(parser, context) {
    nextToken$1(parser, context);
    if (!(parser.token & 65536 /* IsIdentifier */))
        return false;
    nextToken$1(parser, context);
    return parser.token === 16777237 /* Colon */;
}
function isNextTokenCanFollowModifier(parser, context) {
    nextToken$1(parser, context);
    return (!(parser.flags & 1 /* NewLine */) &&
        parser.token !== 50331659 /* LeftParen */ &&
        parser.token !== 16777237 /* Colon */ &&
        parser.token !== 83886109 /* Assign */ &&
        parser.token !== 22 /* QuestionMark */);
}
function isTypePredicatePrefix(parser, context) {
    nextToken$1(parser, context);
    return parser.token === 65660 /* IsKeyword */ && !(parser.flags & 1 /* NewLine */);
}
function nextTokenIsStartOfConstructSignature(parser, context) {
    nextToken$1(parser, context);
    return parser.token === 50331659 /* LeftParen */ || parser.token === 167774015 /* LessThan */;
}

// AST from Babylon / ESLint
/*
 * Parses mapped type parameter
 *
 * @param {Parser} parser object
 * @param {Context} context Context masks
 * @returns {*}
 */
function parseMappedTypeParameter(parser, context) {
    const pos = getLocation(parser);
    const name = parseIdentifier(parser, context);
    expect(parser, context, 168834865 /* InKeyword */);
    const constraint = parseType(parser, context);
    return finishNode(context, parser, pos, {
        type: 'TypeParameter',
        name
    });
}
/*
* Parser TS intersection types
*
* @param {Parser} parser Parser object
* @param {Context} context Context masks
* @returns {*}
*/
function parseIntersectionType(parser, context) {
    const pos = getLocation(parser);
    consume(parser, context, 167773508 /* BitwiseAnd */);
    const tsType = parseTypeOperator(parser, context);
    const types = [tsType];
    if (parser.token !== 167773508 /* BitwiseAnd */)
        return tsType;
    while (consume(parser, context, 167773508 /* BitwiseAnd */)) {
        types.push(parseTypeOperator(parser, context));
    }
    return finishNode(context, parser, pos, {
        type: 'TSIntersectionType',
        types
    });
}
function parseTypeParameter(parser, context) {
    const pos = getLocation(parser);
    const { tokenValue: name } = parser;
    nextToken(parser, context);
    consume(parser, context, 83886109 /* Assign */);
    return finishNode(context, parser, pos, {
        type: 'TSTypeParameter',
        name,
        constraint: consume(parser, context, 12372 /* ExtendsKeyword */) ? parseType(parser, context) : null,
        default: consume(parser, context, 83886109 /* Assign */) ? parseType(parser, context) : null
    });
}
function parseTypeParameters(parser, context) {
    const params = [];
    if (parser.token !== 167774015 /* LessThan */)
        return params;
    const pos = getLocation(parser);
    if (parser.token === 167774015 /* LessThan */ || parser.token === 25 /* JSXClose */) {
        nextToken(parser, context);
    }
    else {
        report(parser, 0 /* Unexpected */);
    }
    while (!consume(parser, context, 167774016 /* GreaterThan */)) {
        params.push(parseTypeParameter(parser, context));
    }
    return finishNode(context, parser, pos, {
        type: 'TSTypeParameterDeclaration',
        params
    });
}
function parseFunctionType(parser, context) {
    const pos = getLocation(parser);
    const typeParameters = parseTypeParameters(parser, context);
    expect(parser, context, 50331659 /* LeftParen */);
    const parameters = [];
    while (parser.token !== 16 /* RightParen */) {
        parameters.push(parser.token === 14 /* Ellipsis */
            ? parseRestElement(parser, context)
            : parseBindingIdentifier(parser, context));
        consume(parser, context, 16777234 /* Comma */);
    }
    expect(parser, context, 16 /* RightParen */);
    let typeAnnotation = null;
    if (parser.token === 10 /* Arrow */) {
        typeAnnotation = parseTypeOrTypePredicateAnnotation(parser, context, 10 /* Arrow */);
    }
    return finishNode(context, parser, pos, {
        type: 'TSFunctionType',
        typeParameters,
        parameters,
        typeAnnotation
    });
}
function parseTypeOrTypePredicateAnnotation(parser, context, token) {
    expect(parser, context, token);
    if (!lookahead(parser, context, isTypePredicatePrefix)) {
        return parseTypeAnnotation(parser, context, false);
    }
    const pos = getLocation(parser);
    const parameterName = parseIdentifier(parser, context);
    nextToken(parser, context);
    const typeAnnotation = parseTypeAnnotation(parser, context, false);
    return finishNode(context, parser, pos, {
        type: 'TSTypePredicate',
        parameterName,
        typeAnnotation
    });
}
function parseConstructorType(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 33566811 /* NewKeyword */);
    return finishNode(context, parser, pos, {
        type: 'TSConstructorType'
    });
}
function parseType(parser, context) {
    if (isStartOfFunctionType(parser, context)) {
        return parseFunctionType(parser, context);
    }
    else if (consume(parser, context, 33566811 /* NewKeyword */)) {
        return parseConstructorType(parser, context);
    }
    return parseUnionType(parser, context);
}
function parseUnionType(parser, context) {
    const pos = getLocation(parser);
    consume(parser, context, 167772997 /* BitwiseOr */);
    const type = parseIntersectionType(parser, context);
    if (parser.token !== 167772997 /* BitwiseOr */)
        return type;
    const types = [type];
    while (consume(parser, context, 167772997 /* BitwiseOr */)) {
        types.push(parseIntersectionType(parser, context));
    }
    return finishNode(context, parser, pos, {
        type: 'TSUnionType',
        types
    });
}
function parseMappedType(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 41943052 /* LeftBrace */);
    const readonly = consume(parser, context, 65659 /* ReadOnlyKeyword */);
    expect(parser, context, 41943059 /* LeftBracket */);
    const typeParameter = parseMappedTypeParameter(parser, context);
    expect(parser, context, 20 /* RightBracket */);
    const optional = consume(parser, context, 22 /* QuestionMark */);
    let typeAnnotation;
    if (consume(parser, context, 16777237 /* Colon */))
        typeAnnotation = parseType(parser, context);
    consumeSemicolon(parser, context);
    expect(parser, context, 17301519 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'TSMappedType',
        readonly,
        typeParameter,
        optional,
        typeAnnotation
    });
}
function parseIdentifierTypedNode(parser, context) {
    const pos = getLocation(parser);
    const tsType = keywordTypeFromName(parser.tokenValue);
    if (tsType) {
        expect(parser, context, 33619969 /* Identifier */);
        return finishNode(context, parser, pos, {
            type: tsType
        });
    }
    return parseTypeReference(parser, context);
}
function parseEntityName(parser, context) {
    const pos = getLocation(parser);
    let entity = parseIdentifier(parser, context);
    while (consume(parser, context, 16777229 /* Period */)) {
        entity = finishNode(context, parser, pos, {
            type: 'TSQualifiedName',
            left: entity,
            right: parseIdentifier(parser, context)
        });
    }
    return entity;
}
function parseTypeArguments(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 167774015 /* LessThan */);
    const params = [];
    while (parser.token !== 167774016 /* GreaterThan */) {
        params.push(parseType(parser, context));
    }
    expect(parser, context, 167774016 /* GreaterThan */);
    return finishNode(context, parser, pos, {
        type: 'TypeParameterInstantiation',
        params
    });
}
function parseTypeReference(parser, context) {
    const pos = getLocation(parser);
    const typeName = parseEntityName(parser, context);
    let typeParameters = [];
    if (!(parser.flags & 1 /* NewLine */) && parser.token === 167774015 /* LessThan */) {
        typeParameters = parseTypeArguments(parser, context);
    }
    return finishNode(context, parser, pos, {
        type: 'TSTypeReference',
        typeName,
        typeParameters
    });
}
function parseNullTypedNode(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 33566727 /* NullKeyword */);
    return finishNode(context, parser, pos, {
        type: 'TSNullKeyword'
    });
}
function parseSubtractTypeNode(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 436209968 /* Subtract */);
    // has to be followed by a numeric value
    if (parser.token !== 33554434 /* NumericLiteral */)
        report(parser, 0 /* Unexpected */);
    return finishNode(context, parser, pos, {
        type: 'TSLiteralType',
        literal: Parser.parseLiteral(parser, context)
    });
}
function parseThisTypeNode(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 33566815 /* ThisKeyword */);
    return finishNode(context, parser, pos, {
        type: 'TSThisType',
        literal: Parser.parseLiteral(parser, context)
    });
}
function parseThisTypePredicate(parser, context, parameterName) {
    const pos = getLocation(parser);
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'TSTypePredicate',
        parameterName,
        typeAnnotation: parseTypeAnnotation(parser, context, false)
    });
}
/**
 * Parse type annotation
 *
 * @param parser Parser object
 * @param context  Context masks
 * @param consumeColon True if should consume semicolon
 */
function parseTypeAnnotation(parser, context, consumeColon = true) {
    const pos = getLocation(parser);
    if (consumeColon)
        expect(parser, context, 16777237 /* Colon */);
    return finishNode(context, parser, pos, {
        type: 'TypeAnnotation',
        typeAnnotation: parseType(parser, context)
    });
}
function parseVoidTypedNode(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 302002220 /* VoidKeyword */);
    return finishNode(context, parser, pos, {
        type: 'TSVoidKeyword'
    });
}
function parseLiteralTypedNode(parser, context) {
    const pos = getLocation(parser);
    let literal;
    switch (parser.token) {
        case 33554435 /* StringLiteral */:
        case 33554434 /* NumericLiteral */:
            literal = Parser.parseLiteral(parser, context);
            break;
        case 33566726 /* TrueKeyword */:
            literal = {
                type: 'Literal',
                value: true
            };
            nextToken(parser, context);
            break;
        case 33566725 /* FalseKeyword */:
            literal = {
                type: 'Literal',
                value: false
            };
            nextToken(parser, context);
            break;
        default:
            report(parser, 0 /* Unexpected */);
    }
    return finishNode(context, parser, pos, {
        type: 'TSLiteralType',
        literal
    });
}
function parseNonArrayType(parser, context) {
    switch (parser.token) {
        case 33619969 /* Identifier */:
            return parseIdentifierTypedNode(parser, context);
        case 302002220 /* VoidKeyword */:
            return parseVoidTypedNode(parser, context);
        case 33566727 /* NullKeyword */:
            return parseNullTypedNode(parser, context);
        case 33554435 /* StringLiteral */:
        case 33554434 /* NumericLiteral */:
        case 33566726 /* TrueKeyword */:
        case 33566725 /* FalseKeyword */:
            return parseLiteralTypedNode(parser, context);
        case 436209968 /* Subtract */:
            return parseSubtractTypeNode(parser, context);
        case 33566815 /* ThisKeyword */:
            const thisType = parseThisTypeNode(parser, context);
            switch (parser.token) {
                case 65660 /* IsKeyword */:
                    if (!(parser.flags & 1 /* NewLine */))
                        return parseThisTypePredicate(parser, context, thisType);
                // falls through
                default:
                    return thisType;
            }
        case 302002218 /* TypeofKeyword */:
            return parseTypeQuery(parser, context);
        case 41943052 /* LeftBrace */:
            return lookahead(parser, context, iStartOfMappedType)
                ? parseMappedType(parser, context)
                : parseTypeLiteral(parser, context);
        case 41943059 /* LeftBracket */:
            return parseTupleType(parser, context);
        case 50331659 /* LeftParen */:
            return parseParenthesizedType(parser, context);
        default:
            report(parser, 0 /* Unexpected */);
    }
}
function parseParenthesizedType(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 50331659 /* LeftParen */);
    const typeAnnotation = parseType(parser, context);
    expect(parser, context, 16 /* RightParen */);
    return finishNode(context, parser, pos, {
        type: 'TSParenthesizedType',
        typeAnnotation
    });
}
function parseTupleType(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 41943059 /* LeftBracket */);
    const elementTypes = [parseType(parser, context)];
    while (consume(parser, context, 16777234 /* Comma */)) {
        elementTypes.push(parseType(parser, context));
    }
    expect(parser, context, 20 /* RightBracket */);
    return finishNode(context, parser, pos, {
        type: 'TSTupleType',
        elementTypes
    });
}
function parseTypeLiteral(parser, context) {
    const pos = getLocation(parser);
    return finishNode(context, parser, pos, {
        type: 'TSTypeLiteral',
        members: parseObjectTypeMembers(parser, context)
    });
}
function parseTypeQuery(parser, context) {
    const pos = getLocation(parser);
    expect(parser, context, 302002218 /* TypeofKeyword */);
    return finishNode(context, parser, pos, {
        type: 'TSTypeQuery',
        exprName: parseEntityName(parser, context)
    });
}
function parseIndexSignature(parser, context) {
    if (!(parser.token === 41943059 /* LeftBracket */ && lookahead(parser, context, isUnambiguouslyIndexSignature))) {
        return null;
    }
    const pos = getLocation(parser);
    expect(parser, context, 41943059 /* LeftBracket */);
    const id = parseIdentifierWTypeAnnotation(parser, context);
    expect(parser, context, 20 /* RightBracket */);
    const typeAnnotation = parser.token === 16777237 /* Colon */ ? parseTypeAnnotation(parser, context, true) : null;
    if (parser.token !== 16777234 /* Comma */)
        consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'TSIndexSignature',
        typeAnnotation,
        parameters: [id]
    });
}
function parsePropertyOrMethodSignature(parser, context, readonly) {
    const pos = getLocation(parser);
    const key = Parser.parsePropertyName(parser, context);
    const option = consume(parser, context, 22 /* QuestionMark */);
    if (!readonly && (parser.token === 50331659 /* LeftParen */ || parser.token === 167774015 /* LessThan */)) {
        const typeParameters = parseTypeParameters(parser, context);
        expect(parser, context, 50331659 /* LeftParen */);
        const parameters = [];
        while (parser.token !== 16 /* RightParen */) {
            parameters.push(parser.token === 14 /* Ellipsis */ ?
                parseRestElement(parser, context) :
                parseBindingIdentifier(parser, context));
            consume(parser, context, 16777234 /* Comma */);
        }
        expect(parser, context, 16 /* RightParen */);
        let typeAnnotation = null;
        if (parser.token === 16777237 /* Colon */) {
            typeAnnotation = parseTypeOrTypePredicateAnnotation(parser, context, 16777237 /* Colon */);
        }
        if (parser.token !== 16777234 /* Comma */)
            consumeSemicolon(parser, context);
        return finishNode(context, parser, pos, {
            type: 'TSMethodSignature',
            key,
            computed: false,
            parameters,
            typeAnnotation,
            readonly
        });
    }
    else {
        const typeAnnotation = parser.token === 16777237 /* Colon */ ? parseTypeAnnotation(parser, context) : null;
        if (parser.token === 17301521 /* Semicolon */)
            consumeSemicolon(parser, context);
        return finishNode(context, parser, pos, {
            type: 'TSPropertySignature',
            computed: false,
            key,
            typeAnnotation
        });
    }
}
function parseModifier(parser, context, allowedModifiers) {
    if (!(parser.token & 65536 /* IsIdentifier */))
        return false;
    if (allowedModifiers.indexOf(parser.tokenValue) !== -1 &&
        lookahead(parser, context, isNextTokenCanFollowModifier)) {
        return parser.tokenValue;
    }
    return false;
}
function parseTypeMember(parser, context) {
    // call
    if (parser.token === 50331659 /* LeftParen */ || parser.token === 167774015 /* LessThan */) {
        return parseSignatureMember(parser, context, 'TSConstructSignatureDeclaration');
    }
    if (parser.token === 33566811 /* NewKeyword */ && lookahead(parser, context, nextTokenIsStartOfConstructSignature)) {
        expect(parser, context, 33566811 /* NewKeyword */);
        return parseSignatureMember(parser, context, 'TSConstructSignatureDeclaration');
    }
    const readonly = parseModifier(parser, context, ['readonly']);
    const idx = parseIndexSignature(parser, context);
    if (idx)
        return idx;
    return parsePropertyOrMethodSignature(parser, context, readonly);
}
function parseSignatureMember(parser, context, type) {
    const pos = getLocation(parser);
    expect(parser, context, 50331659 /* LeftParen */);
    const parameters = [];
    while (parser.token !== 16 /* RightParen */) {
        parameters.push(parser.token === 14 /* Ellipsis */
            ? parseRestElement(parser, context)
            : parseBindingIdentifier(parser, context));
        consume(parser, context, 16777234 /* Comma */);
    }
    expect(parser, context, 16 /* RightParen */);
    let typeAnnotation = null;
    if (parser.token === 16777237 /* Colon */) {
        typeAnnotation = parseTypeOrTypePredicateAnnotation(parser, context, 16777237 /* Colon */);
    }
    if (parser.token !== 16777234 /* Comma */)
        consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type,
        parameters,
        typeAnnotation
    });
}
function parseObjectTypeMembers(parser, context) {
    const members = [];
    expect(parser, context, 41943052 /* LeftBrace */);
    while (parser.token !== 17301519 /* RightBrace */) {
        members.push(parseTypeMember(parser, context));
    }
    expect(parser, context, 17301519 /* RightBrace */);
    return members;
}
function parseArrayType(parser, context) {
    const pos = getLocation(parser);
    let elementType = parseNonArrayType(parser, context);
    while (!(parser.flags & 1 /* NewLine */) && consume(parser, context, 41943059 /* LeftBracket */)) {
        if (consume(parser, context, 20 /* RightBracket */)) {
            elementType = finishNode(context, parser, pos, {
                type: 'TSArrayType',
                elementType
            });
        }
        else {
            const indexType = parseType(parser, context);
            expect(parser, context, 20 /* RightBracket */);
            elementType = finishNode(context, parser, pos, {
                type: 'TSIndexedAccessType',
                elementType,
                indexType
            });
        }
    }
    return elementType;
}
function parseTypeOperator(parser, context) {
    if (parser.token !== 65658 /* KeyOfKeyword */ && parser.token !== 65661 /* UniqueKeyword */) {
        return parseArrayType(parser, context);
    }
    const pos = getLocation(parser);
    const operator = parser.token;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'TSTypeOperator',
        operator: tokenDesc(operator),
        typeAnnotation: parseTypeOperator(parser, context)
    });
}

/**
 * Parse either expression statement or declare (TypeScript)
 *
 * @export
 * @param {Parser} parser Parser object
 * @param {Context} context Context masks
 * @returns {*}
 */
function parseExpressionOrDeclareStatement(parser, context) {
    const pos = getLocation$1(parser);
    const { tokenValue, flags, line, column, startColumn, index, lastColumn, startLine, lastLine, lastIndex, startIndex, tokenRaw, token, lastValue, tokenRegExp } = parser;
    switch (parser.token) {
        // 'declare'
        case 65662 /* DeclareKeyword */:
            {
                switch (nextToken$1(parser, context)) {
                    case 33566793 /* ConstKeyword */: {
                        switch (nextToken$1(parser, context)) {
                            case 12406 /* EnumKeyword */:
                                expect$1(parser, context, 12406 /* EnumKeyword */);
                                return parseEnumDeclaration(parser, context, true);
                            default:
                                return parseVariableStatement(parser, context | 4194304 /* BlockScope */, false);
                        }
                    }
                    case 33566791 /* VarKeyword */:
                        return parseVariableStatement(parser, context);
                    case 33574984 /* LetKeyword */:
                        return parseVariableStatement(parser, context | 4194304 /* BlockScope */);
                    case 33566808 /* FunctionKeyword */:
                        return parseFunctionDeclaration(parser, context);
                    case 120 /* At */:
                    case 33566797 /* ClassKeyword */:
                        return parseClassDeclaration(parser, context);
                    case 299116 /* AsyncKeyword */:
                        return parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context);
                    // 'abstract'
                    case 65665 /* AbstractKeyword */:
                        switch (nextToken$1(parser, context)) {
                            case 33566797 /* ClassKeyword */:
                            default: // ignore
                        }
                    // 'namespace'
                    case 65664 /* NameSpaceKeyword */:
                        switch (nextToken$1(parser, context)) {
                            case 33619969 /* Identifier */:
                            default: // ignore
                        }
                    // 'interface'
                    case 20580 /* InterfaceKeyword */:
                        switch (nextToken$1(parser, context)) {
                            case 33619969 /* Identifier */:
                                return parseInterfaceDeclaration(parser, context);
                            default: // ignore
                        }
                    // 'enum'
                    case 12406 /* EnumKeyword */:
                        switch (nextToken$1(parser, context)) {
                            case 33619969 /* Identifier */:
                            default: // ignore
                        }
                    // 'module'
                    case 65666 /* ModuleKeyword */:
                        switch (nextToken$1(parser, context)) {
                            case 33554435 /* StringLiteral */:
                            case 33619969 /* Identifier */:
                            default: // ignore
                        }
                    // 'type'
                    case 65663 /* TypeKeyword */:
                        switch (nextToken$1(parser, context)) {
                            case 33619969 /* Identifier */:
                            default: // ignore
                        }
                    default: // ignore
                }
                break;
            }
        // 'interface'
        case 20580 /* InterfaceKeyword */:
            {
                switch (nextToken$1(parser, context)) {
                    case 33619969 /* Identifier */:
                        return parseInterfaceDeclaration(parser, context);
                    default: // ignore
                }
                break;
            }
        // 'type'
        case 65663 /* TypeKeyword */:
            {
                switch (nextToken$1(parser, context)) {
                    case 33619969 /* Identifier */:
                        return parseTypeAlias(parser, context, pos);
                    default: // ignore
                }
                break;
            }
        default: // ignore
    }
    // Note: this 'rewind' will only happen if 'types', 'declare' or 'interface'
    // should be treated as identifer. E.g 'interface:foo' is valid JS syntax.
    parser.index = index;
    parser.token = token;
    parser.tokenValue = tokenValue;
    parser.flags = flags;
    parser.line = line;
    parser.column = column;
    parser.tokenRaw = tokenRaw;
    parser.lastValue = lastValue;
    parser.startColumn = startColumn;
    parser.lastColumn = lastColumn;
    parser.startLine = startLine;
    parser.lastLine = lastLine;
    parser.lastIndex = lastIndex;
    parser.startIndex = startIndex;
    parser.tokenRegExp = tokenRegExp;
    return parseExpressionOrLabelledStatement(parser, context);
}
/**
* Parses type alias
*
* @param {Parser} parser  Parser object
* @param {Context} context  Context object
* @param {Location} pos  Location
* @returns {*}
*/
function parseTypeAlias(parser, context, pos) {
    const id = parseIdentifier(parser, context);
    let typeParameters = null;
    if (parser.token === 167774015 /* LessThan */) {
        typeParameters = parseTypeParameters(parser, context);
    }
    expect$1(parser, context, 83886109 /* Assign */);
    const typeAnnotation = parseType(parser, context);
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'TSTypeAliasDeclaration',
        typeParameters,
        id,
        typeAnnotation
    });
}
// HeritageClauseElement
// tsParseExpressionWithTypeArguments
function parseHeritageClause(parser, context) {
    const clauses = [];
    while (parser.token !== 41943052 /* LeftBrace */) {
        clauses.push(parseExpressionWithTypeArguments(parser, context));
    }
    return clauses;
}
function parseExpressionWithTypeArguments(parser, context) {
    const pos = getLocation$1(parser);
    const expression = parseEntityName$1(parser, context);
    let typeParameters = null;
    if (parser.token === 167774015 /* LessThan */) {
        typeParameters = parseTypeArguments(parser, context);
    }
    return finishNode$1(context, parser, pos, {
        type: 'TSExpressionWithTypeArguments',
        expression,
        typeParameters
    });
}
function parseEntityName$1(parser, context) {
    const pos = getLocation$1(parser);
    let entity = parseIdentifier(parser, context);
    while (consume$1(parser, context, 16777229 /* Period */)) {
        entity = finishNode$1(context, parser, getLocation$1(parser), {
            type: 'TSQualifiedName',
            left: entity,
            right: parseIdentifier(parser, context)
        });
    }
    return entity;
}
function parseInterfaceDeclarationBody(parser, context) {
    const pos = getLocation$1(parser);
    return finishNode$1(context, parser, pos, {
        type: 'TSInterfaceBody',
        body: parseObjectTypeMembers(parser, context)
    });
}
function parseInterfaceDeclaration(parser, context, id = parseIdentifier(parser, context)) {
    const pos = getLocation$1(parser);
    const typeParameters = parser.token === 16777237 /* Colon */ ? parseTypeParameters(parser, context) : null;
    let extend = null;
    if (consume$1(parser, context, 12372 /* ExtendsKeyword */)) {
        extend = parseHeritageClause(parser, context);
    }
    const body = parseInterfaceDeclarationBody(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'TSInterfaceDeclaration',
        id,
        body,
        extends: extend,
        typeParameters
    });
}
function parseEnumDeclaration(parser, context, isConst = false) {
    const pos = getLocation$1(parser);
    const id = parseIdentifier(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'TSEnumDeclaration',
        const: isConst,
        id
    });
}
// TEMPORARY!!!!
function parseVariableStatement(parser, context, shouldConsume = true) {
    const pos = getLocation$1(parser);
    const { token } = parser;
    const isConst = token === 33566793 /* ConstKeyword */;
    if (shouldConsume)
        nextToken$1(parser, context);
    const declarations = parseVariableDeclarationList(parser, context, isConst);
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'VariableDeclaration',
        kind: tokenDesc(token),
        declarations
    });
}

// Statements
/**
 * Parses statement list items
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementListItem)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseStatementListItem(parser, context) {
    switch (parser.token) {
        case 33566808 /* FunctionKeyword */:
            return parseFunctionDeclaration(parser, context);
        case 120 /* At */:
        case 33566797 /* ClassKeyword */:
            return parseClassDeclaration(parser, context);
        case 33574984 /* LetKeyword */:
            return parseLetOrExpressionStatement(parser, context | 65536 /* AllowIn */);
        case 33566793 /* ConstKeyword */:
            return parseVariableStatement$1(parser, context | 4194304 /* BlockScope */ | 65536 /* AllowIn */);
        case 299116 /* AsyncKeyword */:
            return parseAsyncFunctionDeclarationOrStatement(parser, context);
        case 33566810 /* ImportKeyword */: {
            if (context & 1 /* OptionsNext */ && lookahead(parser, context, nextTokenIsLeftParenOrPeriod)) {
                return parseExpressionStatement(parser, context | 65536 /* AllowIn */);
            }
        }
        case 12371 /* ExportKeyword */:
            if (context & 8192 /* Module */) {
                tolerant(parser, context, 32 /* ImportExportDeclAtTopLevel */, tokenDesc(parser.token));
            }
        default:
            return parseStatement(parser, context | 2097152 /* AllowSingleStatement */);
    }
}
/**
 * Parses statements
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseStatement(parser, context) {
    switch (parser.token) {
        case 33566791 /* VarKeyword */:
            return parseVariableStatement$1(parser, context | 65536 /* AllowIn */);
        case 17301521 /* Semicolon */:
            return parseEmptyStatement(parser, context);
        case 33566814 /* SwitchKeyword */:
            return parseSwitchStatement(parser, context);
        case 41943052 /* LeftBrace */:
            return parseBlockStatement(parser, context);
        case 12380 /* ReturnKeyword */:
            return parseReturnStatement(parser, context);
        case 12377 /* IfKeyword */:
            return parseIfStatement(parser, context);
        case 12369 /* DoKeyword */:
            return parseDoWhileStatement(parser, context);
        case 12402 /* WhileKeyword */:
            return parseWhileStatement(parser, context);
        case 12387 /* WithKeyword */:
            return parseWithStatement(parser, context);
        case 12362 /* BreakKeyword */:
            return parseBreakStatement(parser, context);
        case 12366 /* ContinueKeyword */:
            return parseContinueStatement(parser, context);
        case 12367 /* DebuggerKeyword */:
            return parseDebuggerStatement(parser, context);
        case 302002272 /* ThrowKeyword */:
            return parseThrowStatement(parser, context);
        case 12385 /* TryKeyword */:
            return parseTryStatement(parser, context | 536870912 /* DisallowEscapedKeyword */);
        case 12374 /* ForKeyword */:
            return parseForStatement(parser, context | 8388608 /* ForStatement */);
        case 299116 /* AsyncKeyword */:
            if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
                tolerant(parser, context, 33 /* AsyncFunctionInSingleStatementContext */);
            }
            return parseExpressionOrLabelledStatement(parser, context | 2097152 /* AllowSingleStatement */);
        case 65662 /* DeclareKeyword */:
        case 20580 /* InterfaceKeyword */:
        case 65663 /* TypeKeyword */:
            return parseExpressionOrDeclareStatement(parser, context);
        case 33566808 /* FunctionKeyword */:
            // V8
            tolerant(parser, context, context & 4096 /* Strict */ ? 17 /* StrictFunction */ : 18 /* SloppyFunction */);
        case 33566797 /* ClassKeyword */:
            tolerant(parser, context, 19 /* ForbiddenAsStatement */, tokenDesc(parser.token));
        default:
            return parseExpressionOrLabelledStatement(parser, context);
    }
}
/**
 * Parses empty statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-EmptyStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseEmptyStatement(parser, context) {
    const pos = getLocation$1(parser);
    nextToken$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'EmptyStatement'
    });
}
/**
 * Parses the continue statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ContinueStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseContinueStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12366 /* ContinueKeyword */);
    // Appearing of continue without an IterationStatement leads to syntax error
    if (!(parser.flags & 48 /* AllowBreakOrContinue */)) {
        tolerant(parser, context, 28 /* InvalidNestedStatement */, tokenDesc(parser.token));
    }
    let label = null;
    const { tokenValue } = parser;
    if (!(parser.flags & 1 /* NewLine */) && parser.token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
        label = parseIdentifier(parser, context);
        validateBreakOrContinueLabel(parser, context, tokenValue, /* isContinue */ true);
    }
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'ContinueStatement',
        label
    });
}
/**
 * Parses the break statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BreakStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBreakStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12362 /* BreakKeyword */);
    let label = null;
    // Use 'tokenValue' to avoid accessing another object shape which in turn can lead to
    // a "'deopt" when getting the identifier value (*if any*)
    const { tokenValue } = parser;
    if (!(parser.flags & 1 /* NewLine */) && parser.token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
        label = parseIdentifier(parser, context);
        validateBreakOrContinueLabel(parser, context, tokenValue, /* isContinue */ false);
    }
    else if (!(parser.flags & 48 /* AllowBreakOrContinue */)) {
        tolerant(parser, context, 28 /* InvalidNestedStatement */, 'break');
    }
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'BreakStatement',
        label
    });
}
/**
 * Parses the if statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-if-statement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseIfStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12377 /* IfKeyword */);
    expect$1(parser, context, 50331659 /* LeftParen */);
    const test = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    expect$1(parser, context, 16 /* RightParen */);
    const consequent = parseConsequentOrAlternate(parser, context | 536870912 /* DisallowEscapedKeyword */);
    const alternate = consume$1(parser, context, 12370 /* ElseKeyword */) ? parseConsequentOrAlternate(parser, context) : null;
    return finishNode$1(context, parser, pos, {
        type: 'IfStatement',
        test,
        consequent,
        alternate
    });
}
/**
 * Parse either consequent or alternate. Supports AnnexB.
 * @param parser  Parser object
 * @param context Context masks
 */
function parseConsequentOrAlternate(parser, context) {
    return context & 4096 /* Strict */ || parser.token !== 33566808 /* FunctionKeyword */
        ? parseStatement(parser, context & ~2097152 /* AllowSingleStatement */)
        : parseFunctionDeclaration(parser, context);
}
/**
 * Parses the debugger statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-DebuggerStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseDebuggerStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12367 /* DebuggerKeyword */);
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'DebuggerStatement'
    });
}
/**
 * Parses try statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseTryStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12385 /* TryKeyword */);
    const block = parseBlockStatement(parser, context);
    const handler = parser.token === 12364 /* CatchKeyword */ ? parseCatchBlock(parser, context) : null;
    const finalizer = consume$1(parser, context, 12373 /* FinallyKeyword */) ? parseBlockStatement(parser, context) : null;
    if (!handler && !finalizer)
        tolerant(parser, context, 77 /* NoCatchOrFinally */);
    return finishNode$1(context, parser, pos, {
        type: 'TryStatement',
        block,
        handler,
        finalizer
    });
}
/**
 * Parsescatch block
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Catch)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseCatchBlock(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12364 /* CatchKeyword */);
    let param = null;
    if (context & 1 /* OptionsNext */
        ? consume$1(parser, context, 50331659 /* LeftParen */)
        : expect$1(parser, context, 50331659 /* LeftParen */)) {
        const params = [];
        param = parseBindingIdentifierOrPattern(parser, context, params);
        validateParams(parser, context, params);
        expect$1(parser, context, 16 /* RightParen */);
    }
    const body = parseBlockStatement(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'CatchClause',
        param,
        body
    });
}
/**
 * Parses throw statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ThrowStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseThrowStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 302002272 /* ThrowKeyword */);
    if (parser.flags & 1 /* NewLine */)
        tolerant(parser, context, 78 /* NewlineAfterThrow */);
    const argument = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'ThrowStatement',
        argument
    });
}
/**
 * Parses expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExpressionStatement(parser, context) {
    const pos = getLocation$1(parser);
    const expr = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'ExpressionStatement',
        expression: expr
    });
}
/**
 * Parse directive node
 *
 * * @see [Link](https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseDirective(parser, context) {
    const pos = getLocation$1(parser);
    const directive = parser.tokenRaw.slice(1, -1);
    const expr = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'ExpressionStatement',
        expression: expr,
        directive
    });
}
/**
 * Parses either expression or labelled statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-LabelledStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExpressionOrLabelledStatement(parser, context) {
    const pos = getLocation$1(parser);
    const { tokenValue, token } = parser;
    const expr = parseExpression(parser, (context & ~(2097152 /* AllowSingleStatement */ | 1073741824 /* AllowDecorator */)) | 65536 /* AllowIn */);
    if (token & (65536 /* IsIdentifier */ | 4096 /* Keyword */) && parser.token === 16777237 /* Colon */) {
        // If within generator function bodies, we do it like this so we can throw an nice error message
        if (context & 262144 /* Yield */ && token & 1073741824 /* IsYield */)
            tolerant(parser, context, 55 /* YieldReservedKeyword */);
        expect$1(parser, context, 16777237 /* Colon */, 81 /* LabelNoColon */);
        if (hasLabel(parser, tokenValue))
            tolerant(parser, context, 27 /* LabelRedeclaration */, tokenValue);
        addLabel(parser, tokenValue);
        let body;
        if (!(context & 4096 /* Strict */) &&
            context & 2097152 /* AllowSingleStatement */ &&
            parser.token === 33566808 /* FunctionKeyword */) {
            body = parseFunctionDeclaration(parser, context);
        }
        else {
            body = parseStatement(parser, context);
        }
        popLabel(parser, tokenValue);
        return finishNode$1(context, parser, pos, {
            type: 'LabeledStatement',
            label: expr,
            body
        });
    }
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'ExpressionStatement',
        expression: expr
    });
}
/**
 * Parses either a binding identifier or bindign pattern
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-EmptyStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseDoWhileStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12369 /* DoKeyword */);
    const body = parseIterationStatement(parser, context);
    expect$1(parser, context, 12402 /* WhileKeyword */);
    expect$1(parser, context, 50331659 /* LeftParen */);
    const test = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    expect$1(parser, context, 16 /* RightParen */);
    consume$1(parser, context, 17301521 /* Semicolon */);
    return finishNode$1(context, parser, pos, {
        type: 'DoWhileStatement',
        body,
        test
    });
}
/**
 * Parses while statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-WhileStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseWhileStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12402 /* WhileKeyword */);
    expect$1(parser, context, 50331659 /* LeftParen */);
    const test = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    expect$1(parser, context, 16 /* RightParen */);
    const body = parseIterationStatement(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'WhileStatement',
        test,
        body
    });
}
/**
 * Parses block statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Block)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBlockStatement(parser, context) {
    const pos = getLocation$1(parser);
    const body = [];
    expect$1(parser, context, 41943052 /* LeftBrace */);
    while (parser.token !== 17301519 /* RightBrace */) {
        body.push(parseStatementListItem(parser, context));
    }
    expect$1(parser, context, 17301519 /* RightBrace */);
    return finishNode$1(context, parser, pos, {
        type: 'BlockStatement',
        body
    });
}
/**
 * Parses return statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ReturnStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseReturnStatement(parser, context) {
    const pos = getLocation$1(parser);
    if (!(context & (32 /* OptionsGlobalReturn */ | 1048576 /* InFunctionBody */))) {
        tolerant(parser, context, 16 /* IllegalReturn */);
    }
    if (parser.flags & 32768 /* EscapedKeyword */)
        tolerant(parser, context, 2 /* InvalidEscapedReservedWord */);
    expect$1(parser, context, 12380 /* ReturnKeyword */);
    const argument = !(parser.token & 524288 /* ASI */) && !(parser.flags & 1 /* NewLine */)
        ? parseExpression(parser, (context & ~(1048576 /* InFunctionBody */ | 1073741824 /* AllowDecorator */)) | 65536 /* AllowIn */)
        : null;
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'ReturnStatement',
        argument
    });
}
/**
 * Sets the necessary mutable parser flags. The parser flags will
 * be unset after done parsing out the statements.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-IterationStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseIterationStatement(parser, context) {
    // Note: We are deviating from the original grammar here beauce the original grammar says that the
    // 'iterationStatement' should return either'for', 'do' or 'while' statements. We are doing some
    // bitfiddling before and after to modify the parser state before we let the 'parseStatement'
    // return the mentioned statements (to match the original grammar).
    const savedFlags = parser.flags;
    parser.flags |= 32 /* InIterationStatement */ | 4 /* AllowDestructuring */;
    const body = parseStatement(parser, (context & ~2097152 /* AllowSingleStatement */) | 536870912 /* DisallowEscapedKeyword */);
    parser.flags = savedFlags;
    return body;
}
/**
 * Parses with statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-WithStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseWithStatement(parser, context) {
    if (context & 4096 /* Strict */)
        tolerant(parser, context, 35 /* StrictModeWith */);
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12387 /* WithKeyword */);
    expect$1(parser, context, 50331659 /* LeftParen */);
    const object = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    expect$1(parser, context, 16 /* RightParen */);
    const body = parseStatement(parser, context & ~2097152 /* AllowSingleStatement */);
    return finishNode$1(context, parser, pos, {
        type: 'WithStatement',
        object,
        body
    });
}
/**
 * Parses switch statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SwitchStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseSwitchStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 33566814 /* SwitchKeyword */);
    expect$1(parser, context, 50331659 /* LeftParen */);
    const discriminant = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    expect$1(parser, context, 16 /* RightParen */);
    expect$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 41943052 /* LeftBrace */);
    const cases = [];
    const savedFlags = parser.flags;
    parser.flags |= 16 /* InSwitchStatement */;
    let seenDefault = false;
    while (parser.token !== 17301519 /* RightBrace */) {
        const clause = parseCaseOrDefaultClauses(parser, context);
        cases.push(clause);
        if (clause.test === null) {
            if (seenDefault)
                tolerant(parser, context, 31 /* MultipleDefaultsInSwitch */);
            seenDefault = true;
        }
    }
    parser.flags = savedFlags;
    expect$1(parser, context, 17301519 /* RightBrace */);
    return finishNode$1(context, parser, pos, {
        type: 'SwitchStatement',
        discriminant,
        cases
    });
}
/**
 * Parses either default clause or case clauses
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CaseClauses)
 * @see [Link](https://tc39.github.io/ecma262/#prod-DefaultClause)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseCaseOrDefaultClauses(parser, context) {
    const pos = getLocation$1(parser);
    let test = null;
    if (consume$1(parser, context, 12363 /* CaseKeyword */)) {
        test = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    }
    else {
        expect$1(parser, context, 12368 /* DefaultKeyword */);
    }
    expect$1(parser, context, 16777237 /* Colon */);
    const consequent = [];
    while (!isEndOfCaseOrDefaultClauses(parser)) {
        consequent.push(parseStatementListItem(parser, context | 65536 /* AllowIn */));
    }
    return finishNode$1(context, parser, pos, {
        type: 'SwitchCase',
        test,
        consequent
    });
}
/**
 * Parses variable statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseVariableStatement$1(parser, context, shouldConsume = true) {
    const pos = getLocation$1(parser);
    const { token } = parser;
    const isConst = token === 33566793 /* ConstKeyword */;
    nextToken$1(parser, context);
    const declarations = parseVariableDeclarationList(parser, context, isConst);
    // Only consume semicolons if not inside the 'ForStatement' production
    if (shouldConsume)
        consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'VariableDeclaration',
        kind: tokenDesc(token),
        declarations
    });
}
/**
 * Parses either an lexical declaration (let) or an expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseLetOrExpressionStatement(parser, context, shouldConsume = true) {
    return lookahead(parser, context, isLexical)
        ? parseVariableStatement$1(parser, context | 4194304 /* BlockScope */, shouldConsume)
        : parseExpressionOrLabelledStatement(parser, context);
}
/**
 * Parses either async function declaration or statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionDeclarationOrStatement(parser, context) {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)
        ? parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context)
        : parseStatement(parser, context);
}
/**
 * Parses either For, ForIn or ForOf statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-statement)
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseForStatement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 12374 /* ForKeyword */);
    const awaitToken = !!(context & 131072 /* Async */ && consume$1(parser, context, 33788013 /* AwaitKeyword */));
    expect$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 50331659 /* LeftParen */);
    const { token } = parser;
    let init = null;
    let sequencePos = null;
    let variableStatement = null;
    let type = 'ForStatement';
    let test = null;
    let update = null;
    let right;
    if (token === 33566793 /* ConstKeyword */ || (token === 33574984 /* LetKeyword */ && lookahead(parser, context, isLexical))) {
        variableStatement = parseVariableStatement$1(parser, (context & ~65536 /* AllowIn */) | 4194304 /* BlockScope */, /* shouldConsume */ false);
    }
    else if (token === 33566791 /* VarKeyword */) {
        variableStatement = parseVariableStatement$1(parser, context & ~65536 /* AllowIn */, /* shouldConsume */ false);
    }
    else if (token !== 17301521 /* Semicolon */) {
        sequencePos = getLocation$1(parser);
        init = restoreExpressionCoverGrammar(parser, (context & ~65536 /* AllowIn */) | 536870912 /* DisallowEscapedKeyword */, parseAssignmentExpression);
    }
    if (consume$1(parser, context, 1085554 /* OfKeyword */)) {
        type = 'ForOfStatement';
        if (init) {
            if (!(parser.flags & 4 /* AllowDestructuring */) || init.type === 'AssignmentExpression') {
                tolerant(parser, context, 71 /* InvalidDestructuringTarget */);
            }
            reinterpret(parser, context, init);
        }
        else
            init = variableStatement;
        right = parseAssignmentExpression(parser, context | 65536 /* AllowIn */);
    }
    else if (consume$1(parser, context, 168834865 /* InKeyword */)) {
        if (init) {
            if (!(parser.flags & 4 /* AllowDestructuring */))
                tolerant(parser, context, 71 /* InvalidDestructuringTarget */);
            reinterpret(parser, context, init);
        }
        else
            init = variableStatement;
        type = 'ForInStatement';
        right = parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */);
    }
    else {
        if (parser.token === 16777234 /* Comma */)
            init = parseSequenceExpression(parser, context, init, sequencePos);
        if (variableStatement)
            init = variableStatement;
        expect$1(parser, context, 17301521 /* Semicolon */);
        test = parser.token !== 17301521 /* Semicolon */
            ? parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */)
            : null;
        expect$1(parser, context, 17301521 /* Semicolon */);
        update = parser.token !== 16 /* RightParen */
            ? parseExpression(parser, (context & ~1073741824 /* AllowDecorator */) | 65536 /* AllowIn */)
            : null;
    }
    expect$1(parser, context, 16 /* RightParen */);
    const body = parseIterationStatement(parser, context);
    return finishNode$1(context, parser, pos, type === 'ForOfStatement'
        ? {
            type,
            body,
            left: init,
            right,
            await: awaitToken
        }
        : right
            ? {
                type: type,
                body,
                left: init,
                right
            }
            : {
                type: type,
                body,
                init,
                test,
                update
            });
}

// JSX Specification
// https://facebook.github.io/jsx/
/**
 * Parses JSX element or JSX fragment
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXRootElement(parser, context) {
    const pos = getLocation$1(parser);
    let children = [];
    let closingElement = null;
    let selfClosing = false;
    let openingElement;
    expect$1(parser, context, 167774015 /* LessThan */);
    const isFragment = parser.token === 167774016 /* GreaterThan */;
    if (isFragment) {
        openingElement = parseJSXOpeningFragment(parser, context, pos);
    }
    else {
        const name = parseJSXElementName(parser, context);
        const attributes = parseJSXAttributes(parser, context);
        selfClosing = consume$1(parser, context, 167774773 /* Divide */);
        openingElement = parseJSXOpeningElement(parser, context, name, attributes, selfClosing, pos);
    }
    if (isFragment)
        return parseJSXFragment(parser, context, openingElement, pos);
    if (!selfClosing) {
        children = parseJSXChildren(parser, context);
        closingElement = parseJSXClosingElement(parser, context);
        const open = isEqualTagNames(openingElement.name);
        const close = isEqualTagNames(closingElement.name);
        if (open !== close)
            report(parser, 83 /* ExpectedJSXClosingTag */, close);
    }
    return finishNode$1(context, parser, pos, {
        type: 'JSXElement',
        children,
        openingElement,
        closingElement,
    });
}
/**
 * Parses JSX opening element
 *
 * @param parser Parser object
 * @param context Context masks
 * @param name Element name
 * @param attributes Element attributes
 * @param selfClosing True if this is a selfclosing JSX Element
 * @param pos Line / Column tracking
 */
function parseJSXOpeningElement(parser, context, name, attributes, selfClosing, pos) {
    if (context & 268435456 /* InJSXChild */ && selfClosing)
        expect$1(parser, context, 167774016 /* GreaterThan */);
    else
        nextJSXToken(parser);
    return finishNode$1(context, parser, pos, {
        type: 'JSXOpeningElement',
        name,
        attributes,
        selfClosing,
    });
}
/**
 * Parse JSX fragment
 *
 * @param parser Parser object
 * @param context Context masks
 * @param openingElement Opening fragment
 * @param pos Line / Column location
 */
function parseJSXFragment(parser, context, openingElement, pos) {
    const children = parseJSXChildren(parser, context);
    const closingFragment = parseJSXClosingFragment(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'JSXFragment',
        children,
        openingElement,
        closingFragment,
    });
}
/**
 * Parse JSX opening fragmentD
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */
function parseJSXOpeningFragment(parser, context, pos) {
    nextJSXToken(parser);
    return finishNode$1(context, parser, pos, {
        type: 'JSXOpeningFragment',
    });
}
/**
 * Prime the scanner and advance to the next JSX token in the stream
 *
 * @param parser Parser object
 * @param context Context masks
 */
function nextJSXToken(parser) {
    return parser.token = scanJSXToken(parser);
}
/**
 * Mini scanner
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanJSXToken(parser) {
    if (parser.index >= parser.source.length)
        return 524288 /* EndOfSource */;
    parser.lastIndex = parser.startIndex = parser.index;
    const char = parser.source.charCodeAt(parser.index);
    if (char === 60 /* LessThan */) {
        parser.index++;
        parser.column++;
        return Scanner.consumeOpt(parser, 47 /* Slash */) ? 25 /* JSXClose */ : 167774015 /* LessThan */;
    }
    else if (char === 123 /* LeftBrace */) {
        parser.index++;
        parser.column++;
        return 41943052 /* LeftBrace */;
    }
    while (parser.index < parser.source.length) {
        parser.index++;
        parser.column++;
        const next = parser.source.charCodeAt(parser.index);
        if (next === 123 /* LeftBrace */ || next === 60 /* LessThan */)
            break;
    }
    return 121 /* JSXText */;
}
/**
 * Parses JSX children
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXChildren(parser, context) {
    const children = [];
    while (parser.token !== 25 /* JSXClose */) {
        children.push(parseJSXChild(parser, context));
    }
    return children;
}
/**
 * Parses JSX Text
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXText(parser, context) {
    const pos = getLocation$1(parser);
    const value = parser.source.slice(parser.startIndex, parser.index);
    parser.token = scanJSXToken(parser);
    const node = finishNode$1(context, parser, pos, {
        type: 'JSXText',
        value,
    });
    if (context & 8 /* OptionsRaw */)
        node.raw = value;
    return node;
}
/**
 * Parses JSX Child
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXChild(parser, context) {
    switch (parser.token) {
        case 33619969 /* Identifier */:
        case 121 /* JSXText */:
            return parseJSXText(parser, context);
        case 41943052 /* LeftBrace */:
            return parseJSXExpression(parser, context & ~268435456 /* InJSXChild */);
        case 167774015 /* LessThan */:
            return parseJSXRootElement(parser, context & ~268435456 /* InJSXChild */);
        default:
            report(parser, 0 /* Unexpected */);
    }
    return undefined; // note: get rid of this
}
/**
 * Parses JSX attributes
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXAttributes(parser, context) {
    const attributes = [];
    while (parser.index < parser.source.length) {
        if (parser.token === 167774773 /* Divide */ || parser.token === 167774016 /* GreaterThan */)
            break;
        attributes.push(parseJSXAttribute(parser, context));
    }
    return attributes;
}
/**
 * Parses JSX spread attribute
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXSpreadAttribute(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 41943052 /* LeftBrace */);
    expect$1(parser, context, 14 /* Ellipsis */);
    const expression = parseExpressionCoverGrammar(parser, context & ~268435456 /* InJSXChild */, parseAssignmentExpression);
    expect$1(parser, context, 17301519 /* RightBrace */);
    return finishNode$1(context, parser, pos, {
        type: 'JSXSpreadAttribute',
        argument: expression,
    });
}
/**
 * Parses JSX namespace name
 *
 * @param parser Parser object
 * @param context Context masks
 * @param namespace Identifier
 * @param pos Line / Column location
 */
function parseJSXNamespacedName(parser, context, namespace, pos) {
    expect$1(parser, context, 16777237 /* Colon */);
    const name = parseJSXIdentifier(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'JSXNamespacedName',
        namespace,
        name,
    });
}
/**
 * Parses JSX attribute name
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXAttributeName(parser, context) {
    const pos = getLocation$1(parser);
    const identifier = parseJSXIdentifier(parser, context);
    return parser.token === 16777237 /* Colon */ ?
        parseJSXNamespacedName(parser, context, identifier, pos) :
        identifier;
}
/**
 * Parses JSX Attribute value
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXAttributeValue(parser, context) {
    switch (scanJSXAttributeValue(parser, context)) {
        case 33554435 /* StringLiteral */:
            return parseLiteral(parser, context);
        case 41943052 /* LeftBrace */:
            return parseJSXExpressionContainer(parser, context | 268435456 /* InJSXChild */);
        case 167774015 /* LessThan */:
            return parseJSXRootElement(parser, context | 268435456 /* InJSXChild */);
        default:
            tolerant(parser, context, 85 /* InvalidJSXAttributeValue */);
    }
    return undefined; // note: get rid of this
}
/**
 * Parses JSX Attribute
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXAttribute(parser, context) {
    const pos = getLocation$1(parser);
    if (parser.token === 41943052 /* LeftBrace */)
        return parseJSXSpreadAttribute(parser, context);
    scanJSXIdentifier(parser);
    const attrName = parseJSXAttributeName(parser, context);
    const value = parser.token === 83886109 /* Assign */ ? parseJSXAttributeValue(parser, context) : null;
    return finishNode$1(context, parser, pos, {
        type: 'JSXAttribute',
        value: value,
        name: attrName,
    });
}
/**
 * Parses JSX Attribute value
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanJSXAttributeValue(parser, context) {
    parser.lastIndex = parser.index;
    const ch = parser.source.charCodeAt(parser.index);
    switch (ch) {
        case 34 /* DoubleQuote */:
        case 39 /* SingleQuote */:
            return scanJSXString(parser, context, ch);
        default:
            return nextToken$1(parser, context);
    }
}
/**
 * Parses JSX String
 *
 * @param parser Parser object
 * @param context Context masks
 * @param quote Code point
 */
function scanJSXString(parser, context, quote) {
    const rawStart = parser.index;
    parser.index++;
    parser.column++;
    let ret = '';
    let ch = parser.source.charCodeAt(parser.index);
    while (ch !== quote) {
        ret += Scanner.fromCodePoint(ch);
        parser.index++;
        parser.column++;
        ch = parser.source.charCodeAt(parser.index);
        if (parser.index >= parser.source.length)
            report(parser, 5 /* UnterminatedString */);
    }
    parser.index++;
    parser.column++; // skip the quote
    // raw
    if (context & 8 /* OptionsRaw */)
        parser.tokenRaw = parser.source.slice(rawStart, parser.index);
    parser.tokenValue = ret;
    return 33554435 /* StringLiteral */;
}
/**
 * Parses JJSX Empty Expression
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXEmptyExpression(parser, context) {
    const pos = getLocation$1(parser);
    return finishNode$1(context, parser, pos, {
        type: 'JSXEmptyExpression',
    });
}
/**
 * Parses JSX Spread child
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXSpreadChild(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 14 /* Ellipsis */);
    const expression = parseExpression(parser, context);
    expect$1(parser, context, 17301519 /* RightBrace */);
    return finishNode$1(context, parser, pos, {
        type: 'JSXSpreadChild',
        expression,
    });
}
/**
 * Parses JSX Expression container
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXExpressionContainer(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 41943052 /* LeftBrace */);
    // Note: JSX Expressions can't be empty
    if (parser.token === 17301519 /* RightBrace */)
        tolerant(parser, context, 82 /* NonEmptyJSXExpression */);
    const expression = parseExpressionCoverGrammar(parser, context & ~268435456 /* InJSXChild */, parseAssignmentExpression);
    expect$1(parser, context, 17301519 /* RightBrace */);
    return finishNode$1(context, parser, pos, {
        type: 'JSXExpressionContainer',
        expression,
    });
}
/**
 * Parses JSX Expression
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */
function parseJSXExpression(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 41943052 /* LeftBrace */);
    if (parser.token === 14 /* Ellipsis */)
        return parseJSXSpreadChild(parser, context);
    const expression = parser.token === 17301519 /* RightBrace */ ?
        parseJSXEmptyExpression(parser, context) :
        parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    nextJSXToken(parser);
    return finishNode$1(context, parser, pos, {
        type: 'JSXExpressionContainer',
        expression,
    });
}
/**
 * Parses JSX Closing fragment
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXClosingFragment(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 25 /* JSXClose */);
    expect$1(parser, context, 167774016 /* GreaterThan */);
    return finishNode$1(context, parser, pos, {
        type: 'JSXClosingFragment',
    });
}
/**
 * Parses JSX Closing Element
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */
function parseJSXClosingElement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 25 /* JSXClose */);
    const name = parseJSXElementName(parser, context);
    if (context & 268435456 /* InJSXChild */)
        expect$1(parser, context, 167774016 /* GreaterThan */);
    else
        nextJSXToken(parser);
    return finishNode$1(context, parser, pos, {
        type: 'JSXClosingElement',
        name,
    });
}
/**
 * Parses JSX Identifier
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXIdentifier(parser, context) {
    const { token, tokenValue: name, tokenRaw: raw } = parser;
    if (!(token & (65536 /* IsIdentifier */ | 4096 /* Keyword */))) {
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    const pos = getLocation$1(parser);
    nextToken$1(parser, context);
    const node = finishNode$1(context, parser, pos, {
        type: 'JSXIdentifier',
        name,
    });
    if (context & 256 /* OptionsRawidentifiers */)
        node.raw = raw;
    return node;
}
/**
 * Parses JSX Member expression
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */
function parseJSXMemberExpression(parser, context, expr, pos) {
    // Note: In order to be able to parse cases like ''<A.B.C.D.E.foo-bar />', where the dash is located at the
    // end, we must rescan for the JSX Identifier now. This because JSX identifiers differ from normal identifiers
    scanJSXIdentifier(parser);
    return finishNode$1(context, parser, pos, {
        type: 'JSXMemberExpression',
        object: expr,
        property: parseJSXIdentifier(parser, context),
    });
}
/**
 * Parses JSX Element name
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXElementName(parser, context) {
    const pos = getLocation$1(parser);
    scanJSXIdentifier(parser);
    let elementName = parseJSXIdentifier(parser, context);
    if (parser.token === 16777237 /* Colon */)
        return parseJSXNamespacedName(parser, context, elementName, pos);
    while (consume$1(parser, context, 16777229 /* Period */)) {
        elementName = parseJSXMemberExpression(parser, context, elementName, pos);
    }
    return elementName;
}
/**
 * Scans JSX Identifier
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanJSXIdentifier(parser) {
    const { token } = parser;
    if (token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
        const firstCharPosition = parser.index;
        let ch = parser.source.charCodeAt(parser.index);
        while ((parser.index < parser.source.length) && (ch === 45 /* Hyphen */ || (isValidIdentifierPart(ch)))) {
            ch = Scanner.readNext(parser);
        }
        parser.tokenValue += parser.source.substr(firstCharPosition, parser.index - firstCharPosition);
    }
    return parser.token;
}

/**
 * Expression :
 *   AssignmentExpression
 *   Expression , AssignmentExpression
 *
 * ExpressionNoIn :
 *   AssignmentExpressionNoIn
 *   ExpressionNoIn , AssignmentExpressionNoIn
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Expression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseExpression(parser, context) {
    const pos = getLocation$1(parser);
    const saveDecoratorContext = parser.flags;
    const expr = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    return parser.token === 16777234 /* Comma */ ?
        parseSequenceExpression(parser, context, expr, pos) :
        expr;
}
/**
 * Parse secuence expression
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseSequenceExpression(parser, context, left, pos) {
    const expressions = [left];
    while (consume$1(parser, context, 16777234 /* Comma */)) {
        expressions.push(parseExpressionCoverGrammar(parser, context, parseAssignmentExpression));
    }
    return finishNode$1(context, parser, pos, {
        type: 'SequenceExpression',
        expressions,
    });
}
/**
 * Parse yield expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-YieldExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseYieldExpression(parser, context, pos) {
    // YieldExpression[In] :
    //    yield
    //    yield [no LineTerminator here] AssignmentExpression[?In, Yield]
    //    yield [no LineTerminator here] * AssignmentExpression[?In, Yield]
    // https://tc39.github.io/ecma262/#sec-generator-function-definitions-static-semantics-early-errors
    if (context & 524288 /* InParameter */)
        tolerant(parser, context, 49 /* YieldInParameter */);
    expect$1(parser, context, 1107316842 /* YieldKeyword */);
    let argument = null;
    let delegate = false;
    if (!(parser.flags & 1 /* NewLine */)) {
        delegate = consume$1(parser, context, 167774771 /* Multiply */);
        // 'Token.IsExpressionStart' bitmask contains the complete set of
        // tokens that can appear after an AssignmentExpression, and none of them
        // can start an AssignmentExpression.
        if (delegate || parser.token & 33554432 /* IsExpressionStart */) {
            argument = parseAssignmentExpression(parser, context);
        }
    }
    return finishNode$1(context, parser, pos, {
        type: 'YieldExpression',
        argument,
        delegate,
    });
}
/**
 * AssignmentExpression :
 *   ConditionalExpression
 *   YieldExpression
 *   ArrowFunction
 *   AsyncArrowFunction
 *   LeftHandSideExpression = AssignmentExpression
 *   LeftHandSideExpression AssignmentOperator AssignmentExpression
 *
 * AssignmentExpressionNoIn :
 *   ConditionalExpressionNoIn
 *   YieldExpression
 *   ArrowFunction
 *   AsyncArrowFunction
 *   LeftHandSideExpression = AssignmentExpressionNoIn
 *   LeftHandSideExpression AssignmentOperator AssignmentExpressionNoIn
 *
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseAssignmentExpression(parser, context) {
    const pos = getLocation$1(parser);
    let { token } = parser;
    if (context & 262144 /* Yield */ && token & 1073741824 /* IsYield */)
        return parseYieldExpression(parser, context, pos);
    let expr = token & 262144 /* IsAsync */ && lookahead(parser, context, nextTokenisIdentifierOrParen)
        ? parserCoverCallExpressionAndAsyncArrowHead(parser, context)
        : parseConditionalExpression(parser, context, pos);
    if (parser.token === 10 /* Arrow */) {
        if (token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
            if (token & (20480 /* FutureReserved */ | 4194304 /* IsEvalOrArguments */)) {
                // Invalid: ' yield => { 'use strict'; 0 };'
                if (token & 20480 /* FutureReserved */) {
                    parser.flags |= 64 /* HasStrictReserved */;
                }
                if (token & 4194304 /* IsEvalOrArguments */) {
                    if (context & 4096 /* Strict */)
                        tolerant(parser, context, 45 /* StrictEvalArguments */);
                    parser.flags |= 2048 /* StrictEvalArguments */;
                }
            }
            expr = [expr];
        }
        return parseArrowFunction(parser, context &= ~131072 /* Async */, pos, expr);
    }
    if (hasBit(parser.token, 67108864 /* IsAssignOp */)) {
        token = parser.token;
        if (context & 4096 /* Strict */ && nameIsArgumentsOrEval(expr.name)) {
            tolerant(parser, context, 15 /* StrictLHSAssignment */);
        }
        else if (consume$1(parser, context, 83886109 /* Assign */)) {
            if (!(parser.flags & 4 /* AllowDestructuring */)) {
                tolerant(parser, context, 71 /* InvalidDestructuringTarget */);
            }
            // Only re-interpret if not inside a formal parameter list
            if (!(context & 524288 /* InParameter */))
                reinterpret(parser, context, expr);
            if (context & 134217728 /* InParen */)
                parser.flags |= 8 /* SimpleParameterList */;
            if (parser.token & 131072 /* IsAwait */) {
                setPendingError(parser);
                parser.flags |= 8192 /* HasAwait */;
            }
            else if (context & 134217728 /* InParen */ &&
                context & (4096 /* Strict */ | 262144 /* Yield */) &&
                parser.token & 1073741824 /* IsYield */) {
                setPendingError(parser);
                parser.flags |= 16384 /* HasYield */;
            }
        }
        else {
            if (!isValidSimpleAssignmentTarget(expr)) {
                tolerant(parser, context, 4 /* InvalidLHSInAssignment */);
            }
            parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
            nextToken$1(parser, context);
        }
        const right = parseExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseAssignmentExpression);
        parser.pendingExpressionError = null;
        return finishNode$1(context, parser, pos, {
            type: 'AssignmentExpression',
            left: expr,
            operator: tokenDesc(token),
            right,
        });
    }
    return expr;
}
/**
 * Parse conditional expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ConditionalExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseConditionalExpression(parser, context, pos) {
    const test = parseBinaryExpression(parser, context, 0, pos);
    if (!consume$1(parser, context, 22 /* QuestionMark */))
        return test;
    const consequent = parseExpressionCoverGrammar(parser, context & ~1073741824 /* AllowDecorator */ | 65536 /* AllowIn */, parseAssignmentExpression);
    expect$1(parser, context, 16777237 /* Colon */);
    return finishNode$1(context, parser, pos, {
        type: 'ConditionalExpression',
        test,
        consequent,
        alternate: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression),
    });
}
/**
 * Parse binary expression.
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-exp-operator)
 * @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-additive-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-bitwise-shift-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-equality-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-relational-operators)
 * @see [Link](https://tc39.github.io/ecma262/#sec-multiplicative-operators)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param minPrec Minimum precedence value
 * @param pos Line / Column info
 * @param Left Left hand side of the binary expression
 */
function parseBinaryExpression(parser, context, minPrec, pos, left = parseUnaryExpression(parser, context)) {
    // Shift-reduce parser for the binary operator part of the JS expression
    // syntax.
    const bit = context & 65536 /* AllowIn */ ^ 65536 /* AllowIn */;
    while (hasBit(parser.token, 167772160 /* IsBinaryOp */)) {
        const t = parser.token;
        if (bit && t === 168834865 /* InKeyword */)
            break;
        const prec = t & 3840 /* Precedence */;
        const delta = (t === 167775030 /* Exponentiate */) << 8 /* PrecStart */;
        // When the next token is no longer a binary operator, it's potentially the
        // start of an expression, so we break the loop
        if (prec + delta <= minPrec)
            break;
        nextToken$1(parser, context);
        left = finishNode$1(context, parser, pos, {
            type: t & 2097152 /* IsLogical */ ? 'LogicalExpression' : 'BinaryExpression',
            left,
            right: parseBinaryExpression(parser, context & ~65536 /* AllowIn */, prec, getLocation$1(parser)),
            operator: tokenDesc(t),
        });
    }
    return left;
}
/**
 * Parse await expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AwaitExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location info
 */
function parseAwaitExpression(parser, context, pos) {
    if (context & 524288 /* InParameter */)
        tolerant(parser, context, 50 /* AwaitInParameter */);
    expect$1(parser, context, 33788013 /* AwaitKeyword */);
    return finishNode$1(context, parser, pos, {
        type: 'AwaitExpression',
        argument: parseUnaryExpression(parser, context),
    });
}
/**
 * Parses unary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UnaryExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseUnaryExpression(parser, context) {
    const pos = getLocation$1(parser);
    const { token } = parser;
    if (hasBit(token, 301989888 /* IsUnaryOp */)) {
        nextToken$1(parser, context);
        if (parser.flags & 32768 /* EscapedKeyword */)
            tolerant(parser, context, 2 /* InvalidEscapedReservedWord */);
        const argument = parseExpressionCoverGrammar(parser, context, parseUnaryExpression);
        if (parser.token === 167775030 /* Exponentiate */)
            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
        if (context & 4096 /* Strict */ && token === 302002219 /* DeleteKeyword */) {
            if (argument.type === 'Identifier') {
                tolerant(parser, context, 41 /* StrictDelete */);
            }
            else if (isPropertyWithPrivateFieldKey(argument)) {
                tolerant(parser, context, 42 /* DeletePrivateField */);
            }
        }
        return finishNode$1(context, parser, pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(token),
            argument,
            prefix: true,
        });
    }
    return context & 131072 /* Async */ && token & 131072 /* IsAwait */
        ? parseAwaitExpression(parser, context, pos)
        : parseUpdateExpression(parser, context, pos);
}
/**
 * Parses update expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseUpdateExpression(parser, context, pos) {
    const { token } = parser;
    if (hasBit(parser.token, 570425344 /* IsUpdateOp */)) {
        nextToken$1(parser, context);
        const expr = parseLeftHandSideExpression(parser, context, pos);
        validateUpdateExpression(parser, context, expr, 'Prefix');
        return finishNode$1(context, parser, pos, {
            type: 'UpdateExpression',
            argument: expr,
            operator: tokenDesc(token),
            prefix: true,
        });
    }
    else if (context & 4 /* OptionsJSX */ && token === 167774015 /* LessThan */) {
        return parseJSXRootElement(parser, context | 268435456 /* InJSXChild */);
    }
    const expression = parseLeftHandSideExpression(parser, context, pos);
    if (hasBit(parser.token, 570425344 /* IsUpdateOp */) && !(parser.flags & 1 /* NewLine */)) {
        validateUpdateExpression(parser, context, expression, 'Postfix');
        const operator = parser.token;
        nextToken$1(parser, context);
        return finishNode$1(context, parser, pos, {
            type: 'UpdateExpression',
            argument: expression,
            operator: tokenDesc(operator),
            prefix: false,
        });
    }
    return expression;
}
/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseRestElement(parser, context, args = []) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 14 /* Ellipsis */);
    if (context & 134217728 /* InParen */ && parser.token & 131072 /* IsAwait */)
        parser.flags |= 8192 /* HasAwait */;
    const argument = parseBindingIdentifierOrPattern(parser, context, args);
    return finishNode$1(context, parser, pos, {
        type: 'RestElement',
        argument,
    });
}
/**
 * Parse spread element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SpreadElement)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseSpreadElement(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 14 /* Ellipsis */);
    const argument = restoreExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseAssignmentExpression);
    return finishNode$1(context, parser, pos, {
        type: 'SpreadElement',
        argument,
    });
}
/**
 * Parse left hand side expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-LeftHandSideExpression)
 *
 * @param Parser Parer instance
 * @param Context Contextmasks
 * @param pos Location info
 */
function parseLeftHandSideExpression(parser, context, pos) {
    const expr = context & 1 /* OptionsNext */ && parser.token === 33566810 /* ImportKeyword */ ?
        parseCallImportOrMetaProperty(parser, context | 65536 /* AllowIn */) :
        parseMemberExpression(parser, context | 65536 /* AllowIn */, pos);
    return parseCallExpression(parser, context | 65536 /* AllowIn */, pos, expr);
}
/**
 * Parse member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location info
 * @param expr Expression
 */
function parseMemberExpression(parser, context, pos, expr = parsePrimaryExpression(parser, context)) {
    while (true) {
        switch (parser.token) {
            case 16777229 /* Period */: {
                consume$1(parser, context, 16777229 /* Period */);
                parser.flags = parser.flags & ~2 /* AllowBinding */ | 4 /* AllowDestructuring */;
                const property = parseIdentifierNameOrPrivateName(parser, context);
                expr = finishNode$1(context, parser, pos, {
                    type: 'MemberExpression',
                    object: expr,
                    computed: false,
                    property,
                });
                continue;
            }
            case 41943059 /* LeftBracket */: {
                consume$1(parser, context, 41943059 /* LeftBracket */);
                parser.flags = parser.flags & ~2 /* AllowBinding */ | 4 /* AllowDestructuring */;
                const property = parseExpression(parser, context);
                expect$1(parser, context, 20 /* RightBracket */);
                expr = finishNode$1(context, parser, pos, {
                    type: 'MemberExpression',
                    object: expr,
                    computed: true,
                    property,
                });
                continue;
            }
            case 33554441 /* TemplateTail */: {
                expr = finishNode$1(context, parser, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplateLiteral(parser, context),
                });
                continue;
            }
            case 33554440 /* TemplateCont */: {
                expr = finishNode$1(context, parser, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplate(parser, context | 16384 /* TaggedTemplate */),
                });
                continue;
            }
            default:
                return expr;
        }
    }
}
/**
 * Parse call expression
 *
 * @param parser Parer instance
 * @param context Context masks
 * @param pos Line / Colum info
 * @param expr Expression
 */
function parseCallExpression(parser, context, pos, expr) {
    while (true) {
        expr = parseMemberExpression(parser, context, pos, expr);
        if (parser.token !== 50331659 /* LeftParen */)
            return expr;
        const args = parseArgumentList(parser, context & ~1073741824 /* AllowDecorator */);
        expr = finishNode$1(context, parser, pos, {
            type: 'CallExpression',
            callee: expr,
            arguments: args,
        });
    }
}
/**
 * Parse cover call expression and async arrow head
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CoverCallExpressionAndAsyncArrowHead)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parserCoverCallExpressionAndAsyncArrowHead(parser, context) {
    const pos = getLocation$1(parser);
    let expr = parseMemberExpression(parser, context | 65536 /* AllowIn */, pos);
    // Here we jump right into it and parse a simple, faster sub-grammar for
    // async arrow / async identifier + call expression. This could have been done different
    // but ESTree sucks!
    //
    // - J.K. Thomas
    if (parser.token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (parser.token & 131072 /* IsAwait */)
            tolerant(parser, context, 38 /* DisallowedInContext */);
        return parseAsyncArrowFunction(parser, context, 2 /* Await */, pos, [parseAndValidateIdentifier(parser, context)]);
    }
    if (parser.flags & 1 /* NewLine */)
        tolerant(parser, context, 34 /* InvalidLineBreak */, 'async');
    while (parser.token === 50331659 /* LeftParen */) {
        expr = parseMemberExpression(parser, context, pos, expr);
        const args = parseAsyncArgumentList(parser, context);
        if (parser.token === 10 /* Arrow */) {
            expr = parseAsyncArrowFunction(parser, context, 2 /* Await */, pos, args);
            break;
        }
        expr = finishNode$1(context, parser, pos, {
            type: 'CallExpression',
            callee: expr,
            arguments: args,
        });
    }
    return expr;
}
/**
 * Parse argument list
 *
 * @see [https://tc39.github.io/ecma262/#prod-ArgumentList)
 *
 * @param Parser Parser object
 * @param Context Context masks
 */
function parseArgumentList(parser, context) {
    // ArgumentList :
    //   AssignmentOrSpreadExpression
    //   ArgumentList , AssignmentOrSpreadExpression
    //
    // AssignmentOrSpreadExpression :
    //   ... AssignmentExpression
    //   AssignmentExpression
    expect$1(parser, context, 50331659 /* LeftParen */);
    const expressions = [];
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            expressions.push(parseSpreadElement(parser, context));
        }
        else {
            if (context & 262144 /* Yield */ && hasBit(parser.token, 1073741824 /* IsYield */)) {
                parser.flags |= 16384 /* HasYield */;
                setPendingError(parser);
            }
            expressions.push(parseExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseAssignmentExpression));
        }
        if (parser.token !== 16 /* RightParen */)
            expect$1(parser, context, 16777234 /* Comma */);
    }
    expect$1(parser, context, 16 /* RightParen */);
    return expressions;
}
/**
 * Parse argument list for async arrow / async call expression
 *
 * @see [https://tc39.github.io/ecma262/#prod-ArgumentList)
 *
 * @param Parser Parser object
 * @param Context Context masks
 */
function parseAsyncArgumentList(parser, context) {
    // Here we are parsing an "extended" argument list tweaked to handle async arrows. This is
    // done here to avoid overhead and possible performance loss if we only
    // parse out a simple call expression - E.g 'async(foo, bar)' or 'async(foo, bar)()';
    //
    // - J.K. Thomas
    expect$1(parser, context, 50331659 /* LeftParen */);
    const args = [];
    let { token } = parser;
    let state = 0 /* Empty */;
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            parser.flags |= 8 /* SimpleParameterList */;
            args.push(parseSpreadElement(parser, context));
            state = 2 /* HasSpread */;
        }
        else {
            token = parser.token;
            state = validateAsyncArgumentList(parser, context, state);
            args.push(restoreExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseAssignmentExpression));
        }
        if (consume$1(parser, context, 16777234 /* Comma */)) {
            parser.flags &= ~4 /* AllowDestructuring */;
            if (state & 2 /* HasSpread */)
                state = 1 /* SeenSpread */;
        }
        if (parser.token === 16 /* RightParen */)
            break;
    }
    expect$1(parser, context, 16 /* RightParen */);
    if (parser.token === 10 /* Arrow */) {
        if (state & 1 /* SeenSpread */) {
            tolerant(parser, context, 76 /* ParamAfterRest */);
        }
        else if (state & 8 /* EvalOrArguments */) {
            if (context & 4096 /* Strict */)
                tolerant(parser, context, 45 /* StrictEvalArguments */);
            parser.flags |= 2048 /* StrictEvalArguments */;
        }
        else if (state & 16 /* Yield */) {
            if (context & 4096 /* Strict */)
                tolerant(parser, context, 49 /* YieldInParameter */);
            parser.flags |= 64 /* HasStrictReserved */;
        }
        else if (parser.flags & 16384 /* HasYield */) {
            tolerant(parser, context, 49 /* YieldInParameter */);
        }
        else if (state & 32 /* Await */ || parser.flags & 8192 /* HasAwait */) {
            tolerant(parser, context, 50 /* AwaitInParameter */);
        }
    }
    return args;
}
/**
 * Parse primary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PrimaryExpression)
 *
 * @param Parser Parser object
 * @param Context Context masks
 */
function parsePrimaryExpression(parser, context) {
    switch (parser.token) {
        case 33554434 /* NumericLiteral */:
        case 33554435 /* StringLiteral */:
            return parseLiteral(parser, context);
        case 33554551 /* BigIntLiteral */:
            return parseBigIntLiteral(parser, context);
        case 33619969 /* Identifier */:
            return parseIdentifier(parser, context);
        case 33566727 /* NullKeyword */:
        case 33566726 /* TrueKeyword */:
        case 33566725 /* FalseKeyword */:
            return parseNullOrTrueOrFalseLiteral(parser, context);
        case 33566808 /* FunctionKeyword */:
            return parseFunctionExpression(parser, context);
        case 33566815 /* ThisKeyword */:
            return parseThisExpression(parser, context);
        case 299116 /* AsyncKeyword */:
            return parseAsyncFunctionOrIdentifier(parser, context);
        case 50331659 /* LeftParen */:
            return parseCoverParenthesizedExpressionAndArrowParameterList(parser, context | 134217728 /* InParen */);
        case 41943059 /* LeftBracket */:
            return restoreExpressionCoverGrammar(parser, context, parseArrayLiteral);
        case 41943052 /* LeftBrace */:
            return restoreExpressionCoverGrammar(parser, context, parseObjectLiteral);
        case 115 /* Hash */:
            return parseIdentifierNameOrPrivateName(parser, context);
        case 120 /* At */:
        case 33566797 /* ClassKeyword */:
            return parseClassExpression(parser, context);
        case 33566811 /* NewKeyword */:
            return parseNewExpressionOrMetaProperty(parser, context);
        case 33566813 /* SuperKeyword */:
            return parseSuperProperty(parser, context);
        case 167774773 /* Divide */:
        case 100663333 /* DivideAssign */:
            Scanner.scanRegularExpression(parser, context);
            return parseRegularExpressionLiteral(parser, context);
        case 33554441 /* TemplateTail */:
            return parseTemplateLiteral(parser, context);
        case 33554440 /* TemplateCont */:
            return parseTemplate(parser, context);
        case 33574984 /* LetKeyword */:
            return parseLetAsIdentifier(parser, context);
        default:
            return parseAndValidateIdentifier(parser, context);
    }
}
/**
 * Parse 'let' as identifier in 'sloppy mode', and throws
 * in 'strict mode'  / 'module code'. We also avoid a lookahead on the
 * ASI restictions while checking this after parsing out the 'let' keyword
 *
 * @param parser Parser object
 * @param context context mask
 */
function parseLetAsIdentifier(parser, context) {
    if (context & 4096 /* Strict */)
        tolerant(parser, context, 48 /* UnexpectedStrictReserved */);
    const pos = getLocation$1(parser);
    const name = parser.tokenValue;
    nextToken$1(parser, context);
    if (parser.flags & 1 /* NewLine */) {
        if (parser.token === 41943059 /* LeftBracket */)
            tolerant(parser, context, 1 /* UnexpectedToken */, 'let');
    }
    return finishNode$1(context, parser, pos, {
        type: 'Identifier',
        name,
    });
}
/**
 * Parse either async function expression or identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Identifier)
 *
 * @param parser Parser object
 * @param context  context mask
 */
function parseAsyncFunctionOrIdentifier(parser, context) {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
        parseAsyncFunctionOrAsyncGeneratorExpression(parser, context) :
        parseIdentifier(parser, context);
}
/**
 * Parses identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Identifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseIdentifier(parser, context) {
    const pos = getLocation$1(parser);
    const name = parser.tokenValue;
    nextToken$1(parser, context | 16384 /* TaggedTemplate */);
    const node = finishNode$1(context, parser, pos, {
        type: 'Identifier',
        name,
    });
    if (context & 256 /* OptionsRawidentifiers */)
        node.raw = parser.tokenRaw;
    return node;
}
function parseIdentifierWTypeAnnotation(parser, context) {
    const pos = getLocation$1(parser);
    const name = parser.tokenValue;
    nextToken$1(parser, context | 16384 /* TaggedTemplate */);
    const node = finishNode$1(context, parser, pos, {
        type: 'Identifier',
        name,
        typeAnnotation: parser.token === 16777237 /* Colon */ ? parseTypeAnnotation(parser, context, true) : null
    });
    if (context & 256 /* OptionsRawidentifiers */)
        node.raw = parser.tokenRaw;
    return node;
}
/**
 * Parse regular expression literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseRegularExpressionLiteral(parser, context) {
    const pos = getLocation$1(parser);
    const { tokenRegExp, tokenValue, tokenRaw } = parser;
    nextToken$1(parser, context);
    const node = finishNode$1(context, parser, pos, {
        type: 'Literal',
        value: tokenValue,
        regex: tokenRegExp,
    });
    if (context & 8 /* OptionsRaw */)
        node.raw = tokenRaw;
    return node;
}
/**
 * Parses string and number literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NumericLiteral)
 * @see [Link](https://tc39.github.io/ecma262/#prod-StringLiteral)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseLiteral(parser, context) {
    const pos = getLocation$1(parser);
    const value = parser.tokenValue;
    if (context & 4096 /* Strict */ && parser.flags & 128 /* HasOctal */) {
        tolerant(parser, context, 59 /* StrictOctalLiteral */);
    }
    nextToken$1(parser, context);
    const node = finishNode$1(context, parser, pos, {
        type: 'Literal',
        value,
    });
    if (context & 8 /* OptionsRaw */)
        node.raw = parser.tokenRaw;
    return node;
}
/**
 * Parses BigInt literal (stage 3 proposal)
 *
 * @see [Link](https://tc39.github.io/proposal-bigint/)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBigIntLiteral(parser, context) {
    const pos = getLocation$1(parser);
    const { tokenValue, tokenRaw } = parser;
    nextToken$1(parser, context);
    const node = finishNode$1(context, parser, pos, {
        type: 'Literal',
        value: tokenValue,
        bigint: tokenRaw,
    });
    if (context & 8 /* OptionsRaw */)
        node.raw = parser.tokenRaw;
    return node;
}
/**
 * Parses either null or boolean literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BooleanLiteral)
 *
 * @param parser
 * @param context
 */
function parseNullOrTrueOrFalseLiteral(parser, context) {
    const pos = getLocation$1(parser);
    const { token } = parser;
    const raw = tokenDesc(token);
    if (parser.flags & 32768 /* EscapedKeyword */)
        tolerant(parser, context, 2 /* InvalidEscapedReservedWord */);
    nextToken$1(parser, context);
    const node = finishNode$1(context, parser, pos, {
        type: 'Literal',
        value: token === 33566727 /* NullKeyword */ ? null : raw === 'true',
    });
    if (context & 8 /* OptionsRaw */)
        node.raw = raw;
    return node;
}
/**
 * Parse this expression
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseThisExpression(parser, context) {
    if (parser.flags & 32768 /* EscapedKeyword */)
        tolerant(parser, context, 2 /* InvalidEscapedReservedWord */);
    const pos = getLocation$1(parser);
    nextToken$1(parser, context | 536870912 /* DisallowEscapedKeyword */);
    return finishNode$1(context, parser, pos, {
        type: 'ThisExpression',
    });
}
/**
 * Parse identifier name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-IdentifierName)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param t token
 */
function parseIdentifierName(parser, context, t) {
    if (!(t & (65536 /* IsIdentifier */ | 4096 /* Keyword */)))
        tolerant(parser, context, 3 /* UnexpectedKeyword */, tokenDesc(t));
    return parseIdentifier(parser, context);
}
/**
 * Parse identifier name or private name (stage 3 proposal)
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseIdentifierNameOrPrivateName(parser, context) {
    if (!consume$1(parser, context, 115 /* Hash */))
        return parseIdentifierName(parser, context, parser.token);
    const { tokenValue } = parser;
    const pos = getLocation$1(parser);
    const name = tokenValue;
    nextToken$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'PrivateName',
        name,
    });
}
/**
 * Parse array literal
 *
 * ArrayLiteral :
 *   [ Elisionopt ]
 *   [ ElementList ]
 *   [ ElementList , Elisionopt ]
 *
 * ElementList :
 *   Elisionopt AssignmentExpression
 *   Elisionopt ... AssignmentExpression
 *   ElementList , Elisionopt AssignmentExpression
 *   ElementList , Elisionopt SpreadElement
 *
 * Elision :
 *   ,
 *   Elision ,
 *
 * SpreadElement :
 *   ... AssignmentExpression
 *
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayLiteral)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseArrayLiteral(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 41943059 /* LeftBracket */);
    const elements = [];
    while (parser.token !== 20 /* RightBracket */) {
        if (consume$1(parser, context, 16777234 /* Comma */)) {
            elements.push(null);
        }
        else if (parser.token === 14 /* Ellipsis */) {
            elements.push(parseSpreadElement(parser, context));
            if (parser.token !== 20 /* RightBracket */) {
                parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
                expect$1(parser, context, 16777234 /* Comma */);
            }
        }
        else {
            elements.push(restoreExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseAssignmentExpression));
            if (parser.token !== 20 /* RightBracket */)
                expect$1(parser, context, 16777234 /* Comma */);
        }
    }
    expect$1(parser, context, 20 /* RightBracket */);
    return finishNode$1(context, parser, pos, {
        type: 'ArrayExpression',
        elements,
    });
}
/**
 * Parses cover parenthesized expression and arrow parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-parseCoverParenthesizedExpressionAndArrowParameterList)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseCoverParenthesizedExpressionAndArrowParameterList(parser, context) {
    expect$1(parser, context, 50331659 /* LeftParen */);
    switch (parser.token) {
        // ')'
        case 16 /* RightParen */:
            {
                expect$1(parser, context, 16 /* RightParen */);
                parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
                if (parser.token === 10 /* Arrow */)
                    return [];
            }
        // '...'
        case 14 /* Ellipsis */:
            {
                const expr = parseRestElement(parser, context);
                expect$1(parser, context, 16 /* RightParen */);
                parser.flags = parser.flags & ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */) | 8 /* SimpleParameterList */;
                if (parser.token !== 10 /* Arrow */)
                    tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
                return [expr];
            }
        default:
            {
                let state = 0 /* None */;
                // Record the sequence position
                const sequencepos = getLocation$1(parser);
                state = validateCoverParenthesizedExpression(parser, state);
                if (parser.token & 8388608 /* IsBindingPattern */)
                    state |= 16 /* HasBinding */;
                let expr = restoreExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseAssignmentExpression);
                // Sequence expression
                if (parser.token === 16777234 /* Comma */) {
                    state |= 1 /* SequenceExpression */;
                    const expressions = [expr];
                    while (consume$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 16777234 /* Comma */)) {
                        parser.flags &= ~4 /* AllowDestructuring */;
                        switch (parser.token) {
                            // '...'
                            case 14 /* Ellipsis */:
                                {
                                    if (!(parser.flags & 2 /* AllowBinding */))
                                        tolerant(parser, context, 75 /* NotBindable */);
                                    parser.flags |= 8 /* SimpleParameterList */;
                                    const restElement = parseRestElement(parser, context);
                                    expect$1(parser, context, 16 /* RightParen */);
                                    if (parser.token !== 10 /* Arrow */)
                                        tolerant(parser, context, 76 /* ParamAfterRest */);
                                    parser.flags &= ~2 /* AllowBinding */;
                                    expressions.push(restElement);
                                    return expressions;
                                }
                            // ')'
                            case 16 /* RightParen */:
                                {
                                    expect$1(parser, context, 16 /* RightParen */);
                                    if (parser.token !== 10 /* Arrow */)
                                        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
                                    return expressions;
                                }
                            default:
                                {
                                    state = validateCoverParenthesizedExpression(parser, state);
                                    expressions.push(restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression));
                                }
                        }
                    }
                    expr = finishNode$1(context, parser, sequencepos, {
                        type: 'SequenceExpression',
                        expressions,
                    });
                }
                expect$1(parser, context, 16 /* RightParen */);
                if (parser.token === 10 /* Arrow */) {
                    if (state & 2 /* HasEvalOrArguments */) {
                        if (context & 4096 /* Strict */)
                            tolerant(parser, context, 45 /* StrictEvalArguments */);
                        parser.flags |= 2048 /* StrictEvalArguments */;
                    }
                    else if (state & 4 /* HasReservedWords */) {
                        if (context & 4096 /* Strict */)
                            tolerant(parser, context, 48 /* UnexpectedStrictReserved */);
                        parser.flags |= 64 /* HasStrictReserved */;
                    }
                    else if (!(parser.flags & 2 /* AllowBinding */)) {
                        tolerant(parser, context, 75 /* NotBindable */);
                    }
                    else if (parser.flags & 16384 /* HasYield */) {
                        tolerant(parser, context, 49 /* YieldInParameter */);
                    }
                    else if (context & 131072 /* Async */ && parser.flags & 8192 /* HasAwait */) {
                        tolerant(parser, context, 50 /* AwaitInParameter */);
                    }
                    parser.flags &= ~(2 /* AllowBinding */ | 8192 /* HasAwait */ | 16384 /* HasYield */);
                    return (state & 1 /* SequenceExpression */ ? expr.expressions : [expr]);
                }
                parser.flags &= ~(8192 /* HasAwait */ | 16384 /* HasYield */ | 2 /* AllowBinding */);
                if (!isValidSimpleAssignmentTarget(expr))
                    parser.flags &= ~4 /* AllowDestructuring */;
                return expr;
            }
    }
}
/**
 * Parses function expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionExpression)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseFunctionExpression(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 33566808 /* FunctionKeyword */);
    const isGenerator = consume$1(parser, context, 167774771 /* Multiply */) ? 1 /* Generator */ : 0 /* None */;
    let id = null;
    let typeParameters = null;
    const { token } = parser;
    if (token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (token & 4194304 /* IsEvalOrArguments */) {
            if (context & 4096 /* Strict */)
                tolerant(parser, context, 45 /* StrictEvalArguments */);
            parser.flags |= 2048 /* StrictEvalArguments */;
        }
        if (parser.token & 1073741824 /* IsYield */ && isGenerator & 1 /* Generator */) {
            tolerant(parser, context, 47 /* YieldBindingIdentifier */);
        }
        id = parseBindingIdentifier(parser, context);
    }
    else if (parser.token === 167774015 /* LessThan */) {
        typeParameters = parseTypeParameters(parser, context);
    }
    const { params, body, returnType } = swapContext(parser, context & ~(33554432 /* Method */ | 67108864 /* AllowSuperProperty */), isGenerator, parseFormalListAndBody);
    return finishNode$1(context, parser, pos, {
        type: 'FunctionExpression',
        params,
        body,
        async: false,
        generator: !!(isGenerator & 1 /* Generator */),
        expression: false,
        id,
        typeParameters,
        returnType
    });
}
/**
 * Parses async function or async generator expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionExpression)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionOrAsyncGeneratorExpression(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 299116 /* AsyncKeyword */);
    expect$1(parser, context, 33566808 /* FunctionKeyword */);
    const isGenerator = consume$1(parser, context, 167774771 /* Multiply */) ? 1 /* Generator */ : 0 /* None */;
    const isAwait = 2 /* Await */;
    let id = null;
    let typeParameters = null;
    const { token } = parser;
    if (token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (token & 4194304 /* IsEvalOrArguments */) {
            if (context & 4096 /* Strict */ || isAwait & 2 /* Await */)
                tolerant(parser, context, 45 /* StrictEvalArguments */);
            parser.flags |= 1024 /* StrictFunctionName */;
        }
        if (token & 131072 /* IsAwait */)
            tolerant(parser, context, 46 /* AwaitBindingIdentifier */);
        if (parser.token & 1073741824 /* IsYield */ && isGenerator & 1 /* Generator */)
            tolerant(parser, context, 47 /* YieldBindingIdentifier */);
        id = parseBindingIdentifier(parser, context);
    }
    else if (parser.token === 167774015 /* LessThan */) {
        typeParameters = parseTypeParameters(parser, context);
    }
    const { params, body, returnType } = swapContext(parser, context & ~(33554432 /* Method */ | 67108864 /* AllowSuperProperty */), isGenerator | isAwait, parseFormalListAndBody);
    return finishNode$1(context, parser, pos, {
        type: 'FunctionExpression',
        params,
        body,
        async: true,
        generator: !!(isGenerator & 1 /* Generator */),
        expression: false,
        id,
        typeParameters,
        returnType
    });
}
/**
 * Parse computed property names
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ComputedPropertyName)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseComputedPropertyName(parser, context) {
    expect$1(parser, context, 41943059 /* LeftBracket */);
    const key = parseAssignmentExpression(parser, context | 65536 /* AllowIn */);
    expect$1(parser, context, 20 /* RightBracket */);
    return key;
}
/**
 * Parse property name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PropertyName)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parsePropertyName(parser, context) {
    switch (parser.token) {
        case 33554434 /* NumericLiteral */:
        case 33554435 /* StringLiteral */:
            return parseLiteral(parser, context);
        case 41943059 /* LeftBracket */:
            return parseComputedPropertyName(parser, context);
        default:
            return parseIdentifier(parser, context);
    }
}
/**
 * Parse object spread properties
 *
 * @see [Link](https://tc39.github.io/proposal-object-rest-spread/#Spread)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseSpreadProperties(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 14 /* Ellipsis */);
    if (parser.token & 8388608 /* IsBindingPattern */)
        parser.flags &= ~4 /* AllowDestructuring */;
    const argument = parseAssignmentExpression(parser, context | 65536 /* AllowIn */);
    return finishNode$1(context, parser, pos, {
        type: 'SpreadElement',
        argument,
    });
}
/**
 * Parses object literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ObjectLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseObjectLiteral(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 41943052 /* LeftBrace */);
    const properties = [];
    while (parser.token !== 17301519 /* RightBrace */) {
        properties.push(parser.token === 14 /* Ellipsis */ ?
            parseSpreadProperties(parser, context) :
            parsePropertyDefinition(parser, context));
        if (parser.token !== 17301519 /* RightBrace */)
            expect$1(parser, context, 16777234 /* Comma */);
    }
    expect$1(parser, context, 17301519 /* RightBrace */);
    parser.flags &= ~512 /* HasProtoField */;
    return finishNode$1(context, parser, pos, {
        type: 'ObjectExpression',
        properties,
    });
}
/**
 * Parse property definition
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PropertyDefinition)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parsePropertyDefinition(parser, context) {
    const pos = getLocation$1(parser);
    const flags = parser.flags;
    let value;
    let state = consume$1(parser, context, 167774771 /* Multiply */) ? 2 /* Generator */ | 32 /* Method */ : 32 /* Method */;
    const t = parser.token;
    let key = parsePropertyName(parser, context);
    if (!(parser.token & 16777216 /* IsShorthandProperty */)) {
        if (flags & 32768 /* EscapedKeyword */) {
            tolerant(parser, context, 2 /* InvalidEscapedReservedWord */);
        }
        else if (!(state & 2 /* Generator */) && t & 262144 /* IsAsync */ && !(parser.flags & 1 /* NewLine */)) {
            state |= consume$1(parser, context, 167774771 /* Multiply */) ? 2 /* Generator */ | 1 /* Async */ : 1 /* Async */;
            key = parsePropertyName(parser, context);
        }
        else if (t === 36975 /* GetKeyword */) {
            state = state & ~32 /* Method */ | 4 /* Getter */;
            key = parsePropertyName(parser, context);
        }
        else if (t === 36976 /* SetKeyword */) {
            state = state & ~32 /* Method */ | 8 /* Setter */;
            key = parsePropertyName(parser, context);
        }
        if (state & (4 /* Getter */ | 8 /* Setter */)) {
            if (state & 2 /* Generator */)
                tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
        }
    }
    if (parser.token === 50331659 /* LeftParen */) {
        value = parseMethodDeclaration(parser, context, state);
    }
    else {
        state &= ~32 /* Method */;
        if (parser.token === 16777237 /* Colon */) {
            if ((state & (1 /* Async */ | 2 /* Generator */))) {
                tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
            }
            else if (t !== 41943059 /* LeftBracket */ && parser.tokenValue === '__proto__') {
                if (parser.flags & 512 /* HasProtoField */) {
                    // Record the error and put it on hold until we've determined
                    // whether or not we're destructuring
                    setPendingExpressionError(parser, 61 /* DuplicateProto */);
                }
                else
                    parser.flags |= 512 /* HasProtoField */;
            }
            expect$1(parser, context, 16777237 /* Colon */);
            // Invalid: 'async ({a: await}) => 1'
            if (parser.token & 131072 /* IsAwait */)
                parser.flags |= 8192 /* HasAwait */;
            value = restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression);
        }
        else {
            if ((state & (2 /* Generator */ | 1 /* Async */)) || !isValidIdentifier(context, t)) {
                tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(t));
            }
            else if (context & (4096 /* Strict */ | 262144 /* Yield */) && t & 1073741824 /* IsYield */) {
                setPendingError(parser);
                parser.flags |= 16384 /* HasYield */;
            }
            state |= 64 /* Shorthand */;
            if (parser.token === 83886109 /* Assign */) {
                setPendingExpressionError(parser, 89 /* InvalidCoverInitializedName */);
                expect$1(parser, context, 83886109 /* Assign */);
                if (context & (4096 /* Strict */ | 262144 /* Yield */ | 131072 /* Async */) && parser.token & (1073741824 /* IsYield */ | 131072 /* IsAwait */)) {
                    setPendingError(parser);
                    parser.flags |= parser.token & 1073741824 /* IsYield */ ? 16384 /* HasYield */ : 8192 /* HasAwait */;
                }
                value = parseAssignmentPattern(parser, context, key, pos);
            }
            else {
                if (t & 131072 /* IsAwait */) {
                    if (context & 131072 /* Async */)
                        tolerant(parser, context, 44 /* UnexpectedReserved */);
                    setPendingError(parser);
                    parser.flags |= 8192 /* HasAwait */;
                }
                value = key;
            }
        }
    }
    return finishNode$1(context, parser, pos, {
        type: 'Property',
        key,
        value,
        kind: !(state & 4 /* Getter */ | state & 8 /* Setter */) ? 'init' : (state & 8 /* Setter */) ? 'set' : 'get',
        computed: t === 41943059 /* LeftBracket */,
        method: !!(state & 32 /* Method */),
        shorthand: !!(state & 64 /* Shorthand */),
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseMethodDeclaration(parser, context, state) {
    const pos = getLocation$1(parser);
    const isGenerator = state & 2 /* Generator */ ? 1 /* Generator */ : 0 /* None */;
    const isAsync = state & 1 /* Async */ ? 2 /* Await */ : 0 /* None */;
    const { params, body, returnType } = swapContext(parser, context | 33554432 /* Method */, isGenerator | isAsync, parseFormalListAndBody, state);
    return finishNode$1(context, parser, pos, {
        type: 'FunctionExpression',
        params,
        body,
        async: !!(state & 1 /* Async */),
        generator: !!(state & 2 /* Generator */),
        expression: false,
        id: null,
        returnType
    });
}
/**
 * Parse arrow function
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrowFunction)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseArrowFunction(parser, context, pos, params) {
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    if (parser.flags & 1 /* NewLine */)
        tolerant(parser, context, 34 /* InvalidLineBreak */, '=>');
    expect$1(parser, context, 10 /* Arrow */);
    return parseArrowBody(parser, context & ~131072 /* Async */, params, pos, 0 /* None */);
}
/**
 * Parse async arrow function
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseAsyncArrowFunction(parser, context, state, pos, params) {
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    if (parser.flags & 1 /* NewLine */)
        tolerant(parser, context, 34 /* InvalidLineBreak */, 'async');
    expect$1(parser, context, 10 /* Arrow */);
    return parseArrowBody(parser, context | 131072 /* Async */, params, pos, state);
}
/**
 * Shared helper function for both async arrow and arrows
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrowFunction)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param parser Parser object
 * @param context Context masks
 */
// https://tc39.github.io/ecma262/#prod-AsyncArrowFunction
function parseArrowBody(parser, context, params, pos, state) {
    parser.pendingExpressionError = null;
    for (const i in params)
        reinterpret(parser, context | 524288 /* InParameter */, params[i]);
    const expression = parser.token !== 41943052 /* LeftBrace */;
    const body = expression ? parseExpressionCoverGrammar(parser, context & ~(262144 /* Yield */ | 524288 /* InParameter */), parseAssignmentExpression) :
        swapContext(parser, context & ~(262144 /* Yield */ | 1073741824 /* AllowDecorator */) | 1048576 /* InFunctionBody */, state, parseFunctionBody);
    return finishNode$1(context, parser, pos, {
        type: 'ArrowFunctionExpression',
        body,
        params,
        id: null,
        async: !!(state & 2 /* Await */),
        generator: false,
        expression,
    });
}
/**
 * Parses formal parameters and function body.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameters)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseFormalListAndBody(parser, context, state) {
    const paramList = parseFormalParameters(parser, context | 524288 /* InParameter */, state);
    const args = paramList.args;
    const params = paramList.params;
    let returnType = null;
    if (parser.token === 16777237 /* Colon */) {
        returnType = parseTypeOrTypePredicateAnnotation(parser, context, 16777237 /* Colon */);
    }
    const body = parseFunctionBody(parser, context & ~1073741824 /* AllowDecorator */ | 1048576 /* InFunctionBody */, args);
    return { params, body, returnType };
}
/**
 * Parse funciton body
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionBody)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseFunctionBody(parser, context, params) {
    // Note! The 'params' has an 'any' type now because it's really shouldn't be there. This should have been
    // on the parser object instead. So for now the 'params' arg are only used within the
    // 'parseFormalListAndBody' method, and not within the arrow function body.
    const pos = getLocation$1(parser);
    expect$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 41943052 /* LeftBrace */);
    const body = [];
    while (parser.token === 33554435 /* StringLiteral */) {
        const { tokenRaw, tokenValue } = parser;
        body.push(parseDirective(parser, context));
        if (tokenRaw.length === /* length of prologue*/ 12 && tokenValue === 'use strict') {
            if (parser.flags & 8 /* SimpleParameterList */) {
                tolerant(parser, context, 62 /* IllegalUseStrict */);
            }
            else if (parser.flags & (64 /* HasStrictReserved */ | 1024 /* StrictFunctionName */)) {
                tolerant(parser, context, 48 /* UnexpectedStrictReserved */);
            }
            else if (parser.flags & 2048 /* StrictEvalArguments */) {
                tolerant(parser, context, 45 /* StrictEvalArguments */);
            }
            context |= 4096 /* Strict */;
        }
    }
    if (context & 4096 /* Strict */) {
        validateParams(parser, context, params);
    }
    const { labelSet } = parser;
    parser.labelSet = {};
    const savedFlags = parser.flags;
    parser.flags = parser.flags & ~(1024 /* StrictFunctionName */ | 2048 /* StrictEvalArguments */ | 16 /* InSwitchStatement */ | 32 /* InIterationStatement */) | 4 /* AllowDestructuring */;
    while (parser.token !== 17301519 /* RightBrace */) {
        body.push(parseStatementListItem(parser, context));
    }
    if (savedFlags & 32 /* InIterationStatement */)
        parser.flags |= 32 /* InIterationStatement */;
    if (savedFlags & 16 /* InSwitchStatement */)
        parser.flags |= 16 /* InSwitchStatement */;
    parser.labelSet = labelSet;
    expect$1(parser, context, 17301519 /* RightBrace */);
    return finishNode$1(context, parser, pos, {
        type: 'BlockStatement',
        body,
    });
}
/**
 * Parse formal parameters
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameters)
 *
 * @param Parser object
 * @param Context masks
 * @param Optional objectstate. Default to none
 */
function parseFormalParameters(parser, context, state) {
    // FormalParameterList :
    //   [empty]
    //   FunctionRestParameter
    //   FormalsList
    //   FormalsList , FunctionRestParameter
    //
    // FunctionRestParameter :
    //   ... BindingIdentifier
    //
    // FormalsList :
    //   FormalParameter
    //   FormalsList , FormalParameter
    //
    // FormalParameter :
    //   BindingElement
    //
    // BindingElement :
    //   SingleNameBinding
    //   BindingPattern Initializeropt
    expect$1(parser, context, 50331659 /* LeftParen */);
    parser.flags &= ~(8 /* SimpleParameterList */ | 64 /* HasStrictReserved */);
    const args = [];
    const params = [];
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            if (state & 8 /* Setter */)
                tolerant(parser, context, 65 /* BadSetterRestParameter */);
            parser.flags |= 8 /* SimpleParameterList */;
            params.push(parseRestElement(parser, context, args));
            break;
        }
        params.push(parseFormalParameterList(parser, context, args));
        if (!consume$1(parser, context, 16777234 /* Comma */))
            break;
        if (parser.token === 16 /* RightParen */)
            break;
    }
    if (state & 8 /* Setter */ && params.length !== 1) {
        tolerant(parser, context, 64 /* AccessorWrongArgs */, 'Setter', 'one', '');
    }
    if (state & 4 /* Getter */ && params.length > 0) {
        tolerant(parser, context, 64 /* AccessorWrongArgs */, 'Getter', 'no', 's');
    }
    expect$1(parser, context, 16 /* RightParen */);
    return { params, args };
}
/**
 * Parse formal parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameterList)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseFormalParameterList(parser, context, args) {
    const pos = getLocation$1(parser);
    if (parser.token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (hasBit(parser.token, 20480 /* FutureReserved */)) {
            if (context & 4096 /* Strict */)
                tolerant(parser, context, 48 /* UnexpectedStrictReserved */);
            parser.flags |= 1024 /* StrictFunctionName */;
        }
        if (hasBit(parser.token, 4194304 /* IsEvalOrArguments */)) {
            if (context & 4096 /* Strict */)
                tolerant(parser, context, 45 /* StrictEvalArguments */);
            parser.flags |= 2048 /* StrictEvalArguments */;
        }
    }
    else {
        parser.flags |= 8 /* SimpleParameterList */;
    }
    const left = parseBindingIdentifierOrPattern(parser, context, args);
    if (!consume$1(parser, context, 83886109 /* Assign */))
        return left;
    if (parser.token & (1073741824 /* IsYield */ | 131072 /* IsAwait */) && context & (262144 /* Yield */ | 131072 /* Async */)) {
        tolerant(parser, context, parser.token & 131072 /* IsAwait */ ? 50 /* AwaitInParameter */ : 49 /* YieldInParameter */);
    }
    parser.flags |= 8 /* SimpleParameterList */;
    return finishNode$1(context, parser, pos, {
        type: 'AssignmentPattern',
        left,
        right: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression),
    });
}
/**
 * Parse class expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseClassExpression(parser, context) {
    const pos = getLocation$1(parser);
    let decorators = [];
    if (context & 2048 /* OptionsExperimental */)
        decorators = parseDecorators(parser, context);
    expect$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 33566797 /* ClassKeyword */);
    const { token } = parser;
    let state = 0 /* None */;
    let id = null;
    let superClass = null;
    if ((token !== 41943052 /* LeftBrace */ && token !== 12372 /* ExtendsKeyword */)) {
        if (context & 131072 /* Async */ && token & 131072 /* IsAwait */) {
            tolerant(parser, context, 46 /* AwaitBindingIdentifier */);
        }
        id = parseBindingIdentifier(parser, context | 4096 /* Strict */);
    }
    if (consume$1(parser, context, 12372 /* ExtendsKeyword */)) {
        superClass = parseLeftHandSideExpression(parser, context | 4096 /* Strict */, pos);
        state |= 512 /* Heritage */;
    }
    const body = parseClassBodyAndElementList(parser, context | 4096 /* Strict */, state);
    return finishNode$1(context, parser, pos, context & 2048 /* OptionsExperimental */ ? {
        type: 'ClassExpression',
        id,
        superClass,
        body,
        decorators
    } : {
        type: 'ClassExpression',
        id,
        superClass,
        body,
    });
}
/**
 * Parse class body and element list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElementList)
 *
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseClassBodyAndElementList(parser, context, state) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 41943052 /* LeftBrace */);
    const body = [];
    let decorators = [];
    while (parser.token !== 17301519 /* RightBrace */) {
        if (!consume$1(parser, context, 17301521 /* Semicolon */)) {
            if (context & 2048 /* OptionsExperimental */) {
                decorators = parseDecorators(parser, context);
                if (parser.token === 17301519 /* RightBrace */)
                    report(parser, 90 /* TrailingDecorators */);
                if (decorators.length !== 0 && parser.tokenValue === 'constructor') {
                    report(parser, 91 /* GeneratorConstructor */);
                }
            }
            body.push(context & 1 /* OptionsNext */ && parser.token === 115 /* Hash */
                ? parsePrivateFields(parser, context, decorators)
                : parseClassElement(parser, context, state, decorators));
        }
    }
    expect$1(parser, context, 17301519 /* RightBrace */);
    return finishNode$1(context, parser, pos, {
        type: 'ClassBody',
        body,
    });
}
/**
 * Parse class element and class public instance fields & private instance fields
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElement)
 * @see [Link](https://tc39.github.io/proposal-class-public-fields/)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseClassElement(parser, context, state, decorators) {
    const pos = getLocation$1(parser);
    let { tokenValue, token } = parser;
    const flags = parser.flags;
    if (consume$1(parser, context, 167774771 /* Multiply */)) {
        state |= 2 /* Generator */;
    }
    if (parser.token === 41943059 /* LeftBracket */)
        state |= 16 /* Computed */;
    if (parser.tokenValue === 'constructor') {
        if (state & 2 /* Generator */)
            tolerant(parser, context, 43 /* InvalidConstructor */, 'generator');
        else if (state & 512 /* Heritage */)
            context |= 67108864 /* AllowSuperProperty */;
        state |= 256 /* Constructor */;
    }
    let key = parsePropertyName(parser, context);
    let value;
    if (!(parser.token & 16777216 /* IsShorthandProperty */)) {
        if (flags & 32768 /* EscapedKeyword */)
            tolerant(parser, context, 2 /* InvalidEscapedReservedWord */);
        if (token === 20585 /* StaticKeyword */) {
            token = parser.token;
            if (consume$1(parser, context, 167774771 /* Multiply */))
                state |= 2 /* Generator */;
            tokenValue = parser.tokenValue;
            if (parser.token === 41943059 /* LeftBracket */)
                state |= 16 /* Computed */;
            if (parser.tokenValue === 'prototype')
                tolerant(parser, context, 63 /* StaticPrototype */);
            state |= 128 /* Static */;
            key = parsePropertyName(parser, context);
            if (context & 1 /* OptionsNext */ && isInstanceField(parser)) {
                if (tokenValue === 'constructor')
                    tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
                return parseFieldDefinition(parser, context, key, state, pos, decorators);
            }
        }
        if (parser.token !== 50331659 /* LeftParen */) {
            if (token & 262144 /* IsAsync */ && !(state & 2 /* Generator */) && !(parser.flags & 1 /* NewLine */)) {
                token = parser.token;
                tokenValue = parser.tokenValue;
                state |= 1 /* Async */;
                if (consume$1(parser, context, 167774771 /* Multiply */))
                    state |= 2 /* Generator */;
                if (parser.token === 41943059 /* LeftBracket */)
                    state |= 16 /* Computed */;
                key = parsePropertyName(parser, context);
            }
            else if ((token === 36975 /* GetKeyword */ || token === 36976 /* SetKeyword */)) {
                state |= token === 36975 /* GetKeyword */ ? 4 /* Getter */ : 8 /* Setter */;
                tokenValue = parser.tokenValue;
                if (parser.token === 41943059 /* LeftBracket */)
                    state |= 16 /* Computed */;
                key = parsePropertyName(parser, context);
            }
            if (tokenValue === 'prototype') {
                tolerant(parser, context, 63 /* StaticPrototype */);
            }
            else if (!(state & 128 /* Static */) && tokenValue === 'constructor') {
                tolerant(parser, context, 43 /* InvalidConstructor */, 'accessor');
            }
        }
    }
    if (parser.token === 50331659 /* LeftParen */) {
        value = parseMethodDeclaration(parser, context, state);
    }
    else {
        if (context & 1 /* OptionsNext */)
            return parseFieldDefinition(parser, context, key, state, pos, decorators);
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token));
    }
    const kind = (state & 256 /* Constructor */) ? 'constructor' : (state & 4 /* Getter */) ? 'get' :
        (state & 8 /* Setter */) ? 'set' : 'method';
    return finishNode$1(context, parser, pos, context & 2048 /* OptionsExperimental */ ? {
        type: 'MethodDefinition',
        kind,
        static: !!(state & 128 /* Static */),
        computed: !!(state & 16 /* Computed */),
        key,
        value,
        decorators
    } : {
        type: 'MethodDefinition',
        kind,
        static: !!(state & 128 /* Static */),
        computed: !!(state & 16 /* Computed */),
        key,
        value,
    });
}
/**
 * Parses field definition.
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseFieldDefinition(parser, context, key, state, pos, decorators) {
    if (state & 256 /* Constructor */)
        tolerant(parser, context, 0 /* Unexpected */);
    let value = null;
    if (state & (1 /* Async */ | 2 /* Generator */))
        tolerant(parser, context, 0 /* Unexpected */);
    if (consume$1(parser, context, 83886109 /* Assign */)) {
        if (parser.token & 4194304 /* IsEvalOrArguments */)
            tolerant(parser, context, 45 /* StrictEvalArguments */);
        value = parseAssignmentExpression(parser, context);
    }
    consume$1(parser, context, 16777234 /* Comma */);
    return finishNode$1(context, parser, pos, context & 2048 /* OptionsExperimental */ ? {
        type: 'FieldDefinition',
        key,
        value,
        computed: !!(state & 16 /* Computed */),
        static: !!(state & 128 /* Static */),
        decorators
    } : {
        type: 'FieldDefinition',
        key,
        value,
        computed: !!(state & 16 /* Computed */),
        static: !!(state & 128 /* Static */),
    });
}
/**
 * Parse private name
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parsePrivateName(parser, context, pos) {
    const name = parser.tokenValue;
    nextToken$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'PrivateName',
        name,
    });
}
/**
 * Parses private instance fields
 *
 * @see [Link](https://tc39.github.io/proposal-class-public-fields/)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parsePrivateFields(parser, context, decorators) {
    const pos = getLocation$1(parser);
    expect$1(parser, context | 32768 /* InClass */, 115 /* Hash */);
    if (parser.tokenValue === 'constructor')
        tolerant(parser, context, 39 /* PrivateFieldConstructor */);
    const key = parsePrivateName(parser, context, pos);
    if (parser.token === 50331659 /* LeftParen */)
        return parsePrivateMethod(parser, context, key, pos, decorators);
    let value = null;
    if (consume$1(parser, context, 83886109 /* Assign */)) {
        if (parser.token & 4194304 /* IsEvalOrArguments */)
            tolerant(parser, context, 45 /* StrictEvalArguments */);
        value = parseAssignmentExpression(parser, context);
    }
    consume$1(parser, context, 16777234 /* Comma */);
    return finishNode$1(context, parser, pos, context & 2048 /* OptionsExperimental */ ? {
        type: 'FieldDefinition',
        key,
        value,
        computed: false,
        static: false,
        decorators
    } : {
        type: 'FieldDefinition',
        key,
        value,
        computed: false,
        static: false,
    });
}
function parsePrivateMethod(parser, context, key, pos, decorators) {
    const value = parseMethodDeclaration(parser, context | 4096 /* Strict */, 0 /* None */);
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    return finishNode$1(context, parser, pos, context & 2048 /* OptionsExperimental */ ? {
        type: 'MethodDefinition',
        kind: 'method',
        static: false,
        computed: false,
        key,
        value,
        decorators
    } : {
        type: 'MethodDefinition',
        kind: 'method',
        static: false,
        computed: false,
        key,
        value,
    });
}
/**
 * Parse either call expression or import expressions
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseCallImportOrMetaProperty(parser, context) {
    const pos = getLocation$1(parser);
    const id = parseIdentifier(parser, context);
    // Import.meta - Stage 3 proposal
    if (consume$1(parser, context, 16777229 /* Period */)) {
        if (context & 8192 /* Module */ && parser.tokenValue === 'meta')
            return parseMetaProperty(parser, context, id, pos);
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    let expr = parseImportExpression(parser, context, pos);
    expect$1(parser, context, 50331659 /* LeftParen */);
    const args = parseExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseAssignmentExpression);
    expect$1(parser, context, 16 /* RightParen */);
    expr = finishNode$1(context, parser, pos, {
        type: 'CallExpression',
        callee: expr,
        arguments: [args],
    });
    return expr;
}
/**
 * Parse Import() expression. (Stage 3 proposal)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location
 */
function parseImportExpression(parser, context, pos) {
    return finishNode$1(context, parser, pos, {
        type: 'Import',
    });
}
/**
 * Parse meta property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param meta Identifier
 * @param pos Location
 */
function parseMetaProperty(parser, context, meta, pos) {
    return finishNode$1(context, parser, pos, {
        meta,
        type: 'MetaProperty',
        property: parseIdentifier(parser, context),
    });
}
/**
 * Parse new expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NewExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseNewExpressionOrMetaProperty(parser, context) {
    const pos = getLocation$1(parser);
    const id = parseIdentifier(parser, context);
    if (consume$1(parser, context, 16777229 /* Period */)) {
        if (parser.tokenValue !== 'target' ||
            !(context & (524288 /* InParameter */ | 1048576 /* InFunctionBody */)))
            tolerant(parser, context, 51 /* MetaNotInFunctionBody */);
        return parseMetaProperty(parser, context, id, pos);
    }
    return finishNode$1(context, parser, pos, {
        type: 'NewExpression',
        callee: parseImportOrMemberExpression(parser, context, pos),
        arguments: parser.token === 50331659 /* LeftParen */ ? parseArgumentList(parser, context) : [],
    });
}
/**
 * Parse either import or member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseImportOrMemberExpression(parser, context, pos) {
    const { token } = parser;
    if (context & 1 /* OptionsNext */ && token === 33566810 /* ImportKeyword */) {
        // Invalid: '"new import(x)"'
        if (lookahead(parser, context, nextTokenIsLeftParen))
            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token));
        // Fixes cases like ''new import.meta','
        return parseCallImportOrMetaProperty(parser, context);
    }
    return parseMemberExpression(parser, context, pos);
}
/**
 * Parse super property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SuperProperty)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseSuperProperty(parser, context) {
    // SuperProperty[Yield, Await]:
    //  super[Expression[+In, ?Yield, ?Await]]
    //  super.IdentifierName
    const pos = getLocation$1(parser);
    expect$1(parser, context, 33566813 /* SuperKeyword */);
    switch (parser.token) {
        case 50331659 /* LeftParen */:
            // The super property has to be within a class constructor
            if (!(context & 67108864 /* AllowSuperProperty */))
                tolerant(parser, context, 52 /* BadSuperCall */);
            break;
        case 41943059 /* LeftBracket */:
        case 16777229 /* Period */:
            if (!(context & 33554432 /* Method */))
                tolerant(parser, context, 53 /* UnexpectedSuper */);
            break;
        default:
            tolerant(parser, context, 54 /* LoneSuper */);
    }
    return finishNode$1(context, parser, pos, {
        type: 'Super',
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseTemplateLiteral(parser, context) {
    const pos = getLocation$1(parser);
    return finishNode$1(context, parser, pos, {
        type: 'TemplateLiteral',
        expressions: [],
        quasis: [parseTemplateSpans(parser, context)],
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseTemplateHead(parser, context, cooked = null, raw, pos) {
    parser.token = Scanner.consumeTemplateBrace(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'TemplateElement',
        value: {
            cooked,
            raw,
        },
        tail: false,
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseTemplate(parser, context, expressions = [], quasis = []) {
    const pos = getLocation$1(parser);
    const { tokenValue, tokenRaw } = parser;
    expect$1(parser, context, 33554440 /* TemplateCont */);
    expressions.push(parseExpression(parser, context));
    const t = getLocation$1(parser);
    quasis.push(parseTemplateHead(parser, context, tokenValue, tokenRaw, pos));
    if (parser.token === 33554441 /* TemplateTail */) {
        quasis.push(parseTemplateSpans(parser, context, t));
    }
    else {
        parseTemplate(parser, context, expressions, quasis);
    }
    return finishNode$1(context, parser, pos, {
        type: 'TemplateLiteral',
        expressions,
        quasis,
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseTemplateSpans(parser, context, pos = getLocation$1(parser)) {
    const { tokenValue, tokenRaw } = parser;
    expect$1(parser, context, 33554441 /* TemplateTail */);
    return finishNode$1(context, parser, pos, {
        type: 'TemplateElement',
        value: {
            cooked: tokenValue,
            raw: tokenRaw,
        },
        tail: true,
    });
}
/**
 * Parses decorators
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseDecoratorList(parser, context) {
    const pos = getLocation$1(parser);
    return finishNode$1(context, parser, pos, {
        type: 'Decorator',
        expression: parseLeftHandSideExpression(parser, context, pos)
    });
}
/**
 * Parses a list of decorators
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseDecorators(parser, context) {
    const decoratorList = [];
    while (consume$1(parser, context, 120 /* At */)) {
        decoratorList.push(parseDecoratorList(parser, context | 1073741824 /* AllowDecorator */));
    }
    return decoratorList;
}

// 12.15.5 Destructuring Assignment
/**
 * Parses either a binding identifier or binding pattern
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBindingIdentifierOrPattern(parser, context, args = []) {
    const { token } = parser;
    if (token & 8388608 /* IsBindingPattern */) {
        return token === 41943052 /* LeftBrace */ ?
            parserObjectAssignmentPattern(parser, context) :
            parseArrayAssignmentPattern(parser, context, args);
    }
    else if (token & (131072 /* IsAwait */ | 1073741824 /* IsYield */)) {
        if (token & 131072 /* IsAwait */ && (context & (131072 /* Async */ | 8192 /* Module */))) {
            tolerant(parser, context, 46 /* AwaitBindingIdentifier */);
        }
        else if (token & 1073741824 /* IsYield */ && (context & (262144 /* Yield */ | 4096 /* Strict */))) {
            tolerant(parser, context, 47 /* YieldBindingIdentifier */);
        }
    }
    args.push(parser.tokenValue);
    return parseBindingIdentifier(parser, context);
}
/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBindingIdentifier(parser, context) {
    const { token } = parser;
    if (token & 4194304 /* IsEvalOrArguments */) {
        if (context & 4096 /* Strict */)
            tolerant(parser, context, 15 /* StrictLHSAssignment */);
        parser.flags |= 2048 /* StrictEvalArguments */;
    }
    else if (context & 4194304 /* BlockScope */ && token === 33574984 /* LetKeyword */) {
        // let is disallowed as a lexically bound name
        tolerant(parser, context, 25 /* LetInLexicalBinding */);
    }
    else if (hasBit(token, 20480 /* FutureReserved */)) {
        if (context & 4096 /* Strict */)
            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token));
        parser.flags |= 1024 /* StrictFunctionName */;
    }
    else if (!isValidIdentifier(context, token)) {
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token));
    }
    const pos = getLocation$1(parser);
    const name = parser.tokenValue;
    nextToken$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'Identifier',
        name,
        typeAnnotation: parser.token === 16777237 /* Colon */ ? parseTypeAnnotation(parser, context) : null
    });
}
/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAssignmentRestElement(parser, context, args) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 14 /* Ellipsis */);
    const argument = parseBindingIdentifierOrPattern(parser, context, args);
    if (parser.token === 16777234 /* Comma */)
        tolerant(parser, context, 86 /* RestWithComma */);
    return finishNode$1(context, parser, pos, {
        type: 'RestElement',
        argument,
    });
}
/**
 * Parse rest property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestProperty)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function assignmentRestProperty(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 14 /* Ellipsis */);
    const { token } = parser;
    const argument = parseBindingIdentifierOrPattern(parser, context);
    if (hasBit(token, 8388608 /* IsBindingPattern */))
        tolerant(parser, context, 92 /* InvalidRestBindingPattern */);
    if (parser.token === 16777234 /* Comma */)
        tolerant(parser, context, 86 /* RestWithComma */);
    return finishNode$1(context, parser, pos, {
        type: 'RestElement',
        argument,
    });
}
/**
 * ArrayAssignmentPattern[Yield] :
 *   [ Elisionopt AssignmentRestElement[?Yield]opt ]
 *   [ AssignmentElementList[?Yield] ]
 *   [ AssignmentElementList[?Yield] , Elisionopt AssignmentRestElement[?Yield]opt ]
 *
 * AssignmentRestElement[Yield] :
 *   ... DestructuringAssignmentTarget[?Yield]
 *
 * AssignmentElementList[Yield] :
 *   AssignmentElisionElement[?Yield]
 *   AssignmentElementList[?Yield] , AssignmentElisionElement[?Yield]
 *
 * AssignmentElisionElement[Yield] :
 *   Elisionopt AssignmentElement[?Yield]
 *
 * AssignmentElement[Yield] :
 *   DestructuringAssignmentTarget[?Yield] Initializer[In,?Yield]opt
 *
 * DestructuringAssignmentTarget[Yield] :
 *   LeftHandSideExpression[?Yield]
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param {Parser} Parser object
 * @param {context} Context masks
 */
function parseArrayAssignmentPattern(parser, context, args) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 41943059 /* LeftBracket */);
    const elements = [];
    while (parser.token !== 20 /* RightBracket */) {
        if (consume$1(parser, context, 16777234 /* Comma */)) {
            elements.push(null);
        }
        else {
            if (parser.token === 14 /* Ellipsis */) {
                elements.push(parseAssignmentRestElement(parser, context, args));
                break;
            }
            else {
                elements.push(parseExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseBindingInitializer));
            }
            if (parser.token !== 20 /* RightBracket */)
                expect$1(parser, context, 16777234 /* Comma */);
        }
    }
    expect$1(parser, context, 20 /* RightBracket */);
    // tslint:disable-next-line:no-object-literal-type-assertion
    return finishNode$1(context, parser, pos, {
        type: 'ArrayPattern',
        elements,
        typeAnnotation: parser.token === 16777237 /* Colon */ ? parseTypeAnnotation(parser, context) : null,
    });
}
/**
 * Parse object assignment pattern
 *
 * @param Parser Parser object
 * @param Context Context masks
 */
function parserObjectAssignmentPattern(parser, context) {
    const pos = getLocation$1(parser);
    const properties = [];
    expect$1(parser, context, 41943052 /* LeftBrace */);
    while (parser.token !== 17301519 /* RightBrace */) {
        if (parser.token === 14 /* Ellipsis */) {
            properties.push(assignmentRestProperty(parser, context));
            break;
        }
        properties.push(parseAssignmentProperty(parser, context));
        if (parser.token !== 17301519 /* RightBrace */)
            expect$1(parser, context, 16777234 /* Comma */);
    }
    expect$1(parser, context, 17301519 /* RightBrace */);
    return finishNode$1(context, parser, pos, {
        type: 'ObjectPattern',
        properties,
    });
}
/** Parse assignment pattern
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentPattern)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param left LHS of assignment pattern
 * @param pos Location
 */
function parseAssignmentPattern(parser, context, left, pos) {
    return finishNode$1(context, parser, pos, {
        type: 'AssignmentPattern',
        left,
        right: parseExpressionCoverGrammar(parser, context | 65536 /* AllowIn */, parseAssignmentExpression),
    });
}
/**
 * Parse binding initializer
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentPattern)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseBindingInitializer(parser, context) {
    const pos = getLocation$1(parser);
    const left = parseBindingIdentifierOrPattern(parser, context);
    return !consume$1(parser, context, 83886109 /* Assign */) ?
        left :
        finishNode$1(context, parser, pos, {
            type: 'AssignmentPattern',
            left,
            right: parseAssignmentExpression(parser, context | 65536 /* AllowIn */),
        });
}
/**
 * Parse assignment property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentProperty)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseAssignmentProperty(parser, context) {
    const pos = getLocation$1(parser);
    const { token } = parser;
    let key;
    let value;
    let computed = false;
    let shorthand = false;
    // single name binding
    if (token & (65536 /* IsIdentifier */ | 4096 /* Keyword */)) {
        key = parseIdentifier(parser, context);
        shorthand = !consume$1(parser, context, 16777237 /* Colon */);
        if (shorthand) {
            const hasInitializer = consume$1(parser, context, 83886109 /* Assign */);
            if (context & 262144 /* Yield */ && token & 1073741824 /* IsYield */)
                tolerant(parser, context, 47 /* YieldBindingIdentifier */);
            if (!isValidIdentifier(context, token))
                tolerant(parser, context, 44 /* UnexpectedReserved */);
            value = hasInitializer ? parseAssignmentPattern(parser, context, key, pos) : key;
        }
        else
            value = parseBindingInitializer(parser, context);
    }
    else {
        computed = token === 41943059 /* LeftBracket */;
        key = parsePropertyName(parser, context);
        expect$1(parser, context, 16777237 /* Colon */);
        value = parseExpressionCoverGrammar(parser, context, parseBindingInitializer);
    }
    // Note! The specs specifically state that this is "assignment property", but
    // nothing in ESTree specs explains the difference between this "property" and the "property" for object literals.
    return finishNode$1(context, parser, pos, {
        type: 'Property',
        kind: 'init',
        key,
        computed,
        value,
        method: false,
        shorthand,
    });
}

// Declarations
/**
 * Parses class declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseClassDeclaration(parser, context) {
    const pos = getLocation$1(parser);
    let decorators = [];
    if (context & 2048 /* OptionsExperimental */)
        decorators = parseDecorators(parser, context);
    expect$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 33566797 /* ClassKeyword */);
    const id = (context & 16777216 /* RequireIdentifier */ && (parser.token !== 33619969 /* Identifier */))
        ? null :
        parseBindingIdentifier(parser, context | 4096 /* Strict */ | 536870912 /* DisallowEscapedKeyword */);
    let state = 0 /* None */;
    let superClass = null;
    if (consume$1(parser, context, 12372 /* ExtendsKeyword */)) {
        superClass = parseLeftHandSideExpression(parser, context | 4096 /* Strict */, pos);
        state |= 512 /* Heritage */;
    }
    const body = parseClassBodyAndElementList(parser, context & ~16777216 /* RequireIdentifier */ | 4096 /* Strict */ | 32768 /* InClass */, state);
    return finishNode$1(context, parser, pos, context & 2048 /* OptionsExperimental */ ? {
        type: 'ClassDeclaration',
        id,
        superClass,
        body,
        decorators
    } : {
        type: 'ClassDeclaration',
        id,
        superClass,
        body
    });
}
/**
 * Parses function declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseFunctionDeclaration(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 33566808 /* FunctionKeyword */);
    let isGenerator = 0 /* None */;
    if (consume$1(parser, context, 167774771 /* Multiply */)) {
        if (context & 2097152 /* AllowSingleStatement */ && !(context & 1048576 /* InFunctionBody */)) {
            tolerant(parser, context, 20 /* GeneratorInSingleStatementContext */);
        }
        isGenerator = 1 /* Generator */;
    }
    return parseFunctionDeclarationBody(parser, context, isGenerator, pos);
}
/**
 * Parses out a function declartion body
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser Parser object
 * @param context Context mask
 * @param state Modifier state
 * @param pos Current location
 */
function parseFunctionDeclarationBody(parser, context, state, pos) {
    const { token } = parser;
    let id = null;
    let typeParameters = null;
    if (context & 262144 /* Yield */ && token & 1073741824 /* IsYield */)
        tolerant(parser, context, 47 /* YieldBindingIdentifier */);
    if (context & 131072 /* Async */ && token & 131072 /* IsAwait */)
        tolerant(parser, context, 46 /* AwaitBindingIdentifier */);
    if (token !== 50331659 /* LeftParen */) {
        id = parseBindingIdentifier(parser, context);
        if (parser.token === 167774015 /* LessThan */) {
            typeParameters = parseTypeParameters(parser, context);
        }
        // Unnamed functions are forbidden in statement context.
    }
    else if (!(context & 16777216 /* RequireIdentifier */))
        tolerant(parser, context, 37 /* UnNamedFunctionDecl */);
    const { params, body, returnType } = swapContext(parser, context & ~(33554432 /* Method */ | 67108864 /* AllowSuperProperty */ | 16777216 /* RequireIdentifier */), state, parseFormalListAndBody);
    return finishNode$1(context, parser, pos, {
        type: 'FunctionDeclaration',
        params,
        body,
        async: !!(state & 2 /* Await */),
        generator: !!(state & 1 /* Generator */),
        expression: false,
        id,
        typeParameters,
        returnType
    });
}
/**
 * Parses async function or async generator declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 299116 /* AsyncKeyword */);
    expect$1(parser, context, 33566808 /* FunctionKeyword */);
    const isAwait = 2 /* Await */;
    const isGenerator = consume$1(parser, context, 167774771 /* Multiply */) ? 1 /* Generator */ : 0 /* None */;
    return parseFunctionDeclarationBody(parser, context, isGenerator | isAwait, pos);
}
/**
 * VariableDeclaration :
 *   BindingIdentifier Initializeropt
 *   BindingPattern Initializer
 *
 * VariableDeclarationNoIn :
 *   BindingIdentifier InitializerNoInopt
 *   BindingPattern InitializerNoIn
 *
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseVariableDeclaration(parser, context, isConst) {
    const pos = getLocation$1(parser);
    const isBindingPattern = (parser.token & 8388608 /* IsBindingPattern */) !== 0;
    const id = parseBindingIdentifierOrPattern(parser, context);
    let init = null;
    if (consume$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 83886109 /* Assign */)) {
        init = parseExpressionCoverGrammar(parser, context & ~(4194304 /* BlockScope */ | 8388608 /* ForStatement */), parseAssignmentExpression);
        if (parser.token & 1048576 /* IsInOrOf */ && (context & 8388608 /* ForStatement */ || isBindingPattern)) {
            if (parser.token === 168834865 /* InKeyword */) {
                // https://github.com/tc39/test262/blob/master/test/annexB/language/statements/for-in/strict-initializer.js
                if (context & (4194304 /* BlockScope */ | 4096 /* Strict */ | 131072 /* Async */) || isBindingPattern) {
                    tolerant(parser, context, 23 /* ForInOfLoopInitializer */, tokenDesc(parser.token));
                }
            }
            else
                tolerant(parser, context, 23 /* ForInOfLoopInitializer */, tokenDesc(parser.token));
        }
        // Note: Initializers are required for 'const' and binding patterns
    }
    else if (!(parser.token & 1048576 /* IsInOrOf */) && (isConst || isBindingPattern)) {
        tolerant(parser, context, 22 /* DeclarationMissingInitializer */, isConst ? 'const' : 'destructuring');
    }
    return finishNode$1(context, parser, pos, {
        type: 'VariableDeclarator',
        init,
        id,
    });
}
/**
 * Parses variable declaration list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclarationList)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseVariableDeclarationList(parser, context, isConst) {
    const list = [parseVariableDeclaration(parser, context, isConst)];
    while (consume$1(parser, context, 16777234 /* Comma */))
        list.push(parseVariableDeclaration(parser, context, isConst));
    if (context & 8388608 /* ForStatement */ && parser.token & 1048576 /* IsInOrOf */ && list.length !== 1) {
        tolerant(parser, context, 24 /* ForInOfLoopMultiBindings */, tokenDesc(parser.token));
    }
    return list;
}

// 15.2 Modules
/**
 * Parse module item list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItemList)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleItemList(parser, context) {
    // Prime the scanner
    nextToken$1(parser, context);
    const statements = [];
    while (parser.token !== 524288 /* EndOfSource */) {
        statements.push(parser.token === 33554435 /* StringLiteral */ ?
            parseDirective(parser, context) :
            parseModuleItem(parser, context | 65536 /* AllowIn */));
    }
    return statements;
}
/**
 * Parse module item
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItem)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleItem(parser, context) {
    switch (parser.token) {
        // @decorator
        case 120 /* At */:
            return parseDecorators(parser, context);
        // ExportDeclaration
        case 12371 /* ExportKeyword */:
            return parseExportDeclaration(parser, context);
        // ImportDeclaration
        case 33566810 /* ImportKeyword */:
            // 'Dynamic Import' or meta property disallowed here
            if (!(context & 1 /* OptionsNext */ && lookahead(parser, context, nextTokenIsLeftParenOrPeriod))) {
                return parseImportDeclaration(parser, context);
            }
        default:
            return parseStatementListItem(parser, context);
    }
}
/**
 * Parse export declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExportDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExportDeclaration(parser, context) {
    const pos = getLocation$1(parser);
    const specifiers = [];
    let source = null;
    let declaration = null;
    expect$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 12371 /* ExportKeyword */);
    switch (parser.token) {
        // export * FromClause ;
        case 167774771 /* Multiply */:
            return parseExportAllDeclaration(parser, context, pos);
        case 12368 /* DefaultKeyword */:
            return parseExportDefault(parser, context, pos);
        case 41943052 /* LeftBrace */:
            {
                // export ExportClause FromClause ;
                // export ExportClause ;
                expect$1(parser, context, 41943052 /* LeftBrace */);
                let hasReservedWord = false;
                while (parser.token !== 17301519 /* RightBrace */) {
                    if (parser.token & 12288 /* Reserved */) {
                        hasReservedWord = true;
                        setPendingError(parser);
                    }
                    specifiers.push(parseNamedExportDeclaration(parser, context));
                    if (parser.token !== 17301519 /* RightBrace */)
                        expect$1(parser, context, 16777234 /* Comma */);
                }
                expect$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 17301519 /* RightBrace */);
                if (parser.token === 36977 /* FromKeyword */) {
                    source = parseModuleSpecifier(parser, context);
                    //  The left hand side can't be a keyword where there is no
                    // 'from' keyword since it references a local binding.
                }
                else if (hasReservedWord) {
                    tolerant(parser, context, 44 /* UnexpectedReserved */);
                }
                consumeSemicolon$1(parser, context);
                break;
            }
        // export ClassDeclaration
        case 33566797 /* ClassKeyword */:
            declaration = (parseClassDeclaration(parser, context));
            break;
        // export LexicalDeclaration
        case 33574984 /* LetKeyword */:
        case 33566793 /* ConstKeyword */:
            declaration = parseVariableStatement$1(parser, context | 4194304 /* BlockScope */);
            break;
        // export VariableDeclaration
        case 33566791 /* VarKeyword */:
            declaration = parseVariableStatement$1(parser, context);
            break;
        // export HoistableDeclaration
        case 33566808 /* FunctionKeyword */:
            declaration = parseFunctionDeclaration(parser, context);
            break;
        // export HoistableDeclaration
        case 299116 /* AsyncKeyword */:
            if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
                declaration = parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context);
                break;
            }
        // Falls through
        default:
            report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    return finishNode$1(context, parser, pos, {
        type: 'ExportNamedDeclaration',
        source,
        specifiers,
        declaration,
    });
}
/**
 * Parse export all declaration
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExportAllDeclaration(parser, context, pos) {
    expect$1(parser, context, 167774771 /* Multiply */);
    const source = parseModuleSpecifier(parser, context);
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'ExportAllDeclaration',
        source,
    });
}
/**
 * Parse named export declaration
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseNamedExportDeclaration(parser, context) {
    const pos = getLocation$1(parser);
    // ExportSpecifier :
    // IdentifierName
    // IdentifierName as IdentifierName
    const local = parseIdentifierName(parser, context | 536870912 /* DisallowEscapedKeyword */, parser.token);
    const exported = consume$1(parser, context, 36971 /* AsKeyword */)
        ? parseIdentifierName(parser, context, parser.token)
        : local;
    return finishNode$1(context, parser, pos, {
        type: 'ExportSpecifier',
        local,
        exported,
    });
}
/**
 * Parse export default
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param pos Location
 */
function parseExportDefault(parser, context, pos) {
    expect$1(parser, context | 536870912 /* DisallowEscapedKeyword */, 12368 /* DefaultKeyword */);
    let declaration;
    switch (parser.token) {
        // export default HoistableDeclaration[Default]
        case 33566808 /* FunctionKeyword */:
            declaration = parseFunctionDeclaration(parser, context | 16777216 /* RequireIdentifier */);
            break;
        // export default ClassDeclaration[Default]
        // export default  @decl ClassDeclaration[Default]
        case 120 /* At */:
        case 33566797 /* ClassKeyword */:
            declaration = parseClassDeclaration(parser, context & ~65536 /* AllowIn */ | 16777216 /* RequireIdentifier */);
            break;
        // export default HoistableDeclaration[Default]
        case 299116 /* AsyncKeyword */:
            declaration = parseAsyncFunctionOrAssignmentExpression(parser, context | 16777216 /* RequireIdentifier */);
            break;
        default:
            {
                // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
                declaration = parseAssignmentExpression(parser, context | 65536 /* AllowIn */);
                consumeSemicolon$1(parser, context);
            }
    }
    return finishNode$1(context, parser, pos, {
        type: 'ExportDefaultDeclaration',
        declaration,
    });
}
/**
 * Parse import declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportDeclaration(parser, context) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 33566810 /* ImportKeyword */);
    let source;
    let specifiers = [];
    // 'import' ModuleSpecifier ';'
    if (parser.token === 33554435 /* StringLiteral */) {
        source = parseLiteral(parser, context);
    }
    else {
        specifiers = parseImportClause(parser, context | 536870912 /* DisallowEscapedKeyword */);
        source = parseModuleSpecifier(parser, context);
    }
    consumeSemicolon$1(parser, context);
    return finishNode$1(context, parser, pos, {
        type: 'ImportDeclaration',
        specifiers,
        source,
    });
}
/**
 * Parse import clause
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportClause)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportClause(parser, context) {
    const specifiers = [];
    switch (parser.token) {
        // 'import' ModuleSpecifier ';'
        case 33619969 /* Identifier */:
            {
                specifiers.push(parseImportDefaultSpecifier(parser, context));
                if (consume$1(parser, context, 16777234 /* Comma */)) {
                    switch (parser.token) {
                        // import a, * as foo
                        case 167774771 /* Multiply */:
                            parseImportNamespaceSpecifier(parser, context, specifiers);
                            break;
                        // import a, {bar}
                        case 41943052 /* LeftBrace */:
                            parseNamedImports(parser, context, specifiers);
                            break;
                        default:
                            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
                    }
                }
                break;
            }
        // import {bar}
        case 41943052 /* LeftBrace */:
            parseNamedImports(parser, context, specifiers);
            break;
        // import * as foo
        case 167774771 /* Multiply */:
            parseImportNamespaceSpecifier(parser, context, specifiers);
            break;
        default:
            report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    return specifiers;
}
/**
 * Parse named imports
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NamedImports)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseNamedImports(parser, context, specifiers) {
    expect$1(parser, context, 41943052 /* LeftBrace */);
    while (parser.token !== 17301519 /* RightBrace */) {
        specifiers.push(parseImportSpecifier(parser, context));
        if (parser.token !== 17301519 /* RightBrace */) {
            expect$1(parser, context, 16777234 /* Comma */);
        }
    }
    expect$1(parser, context, 17301519 /* RightBrace */);
}
/**
 * Parse import specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportSpecifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportSpecifier(parser, context) {
    const pos = getLocation$1(parser);
    const { token } = parser;
    const imported = parseIdentifierName(parser, context | 536870912 /* DisallowEscapedKeyword */, token);
    let local;
    if (parser.token === 36971 /* AsKeyword */) {
        expect$1(parser, context, 36971 /* AsKeyword */);
        local = parseBindingIdentifier(parser, context);
    }
    else {
        // An import name that is a keyword is a syntax error if it is not followed
        // by the keyword 'as'.
        if (hasBit(token, 12288 /* Reserved */))
            tolerant(parser, context, 44 /* UnexpectedReserved */);
        if (hasBit(token, 4194304 /* IsEvalOrArguments */))
            tolerant(parser, context, 45 /* StrictEvalArguments */);
        local = imported;
    }
    return finishNode$1(context, parser, pos, {
        type: 'ImportSpecifier',
        local,
        imported,
    });
}
/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NameSpaceImport)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportNamespaceSpecifier(parser, context, specifiers) {
    const pos = getLocation$1(parser);
    expect$1(parser, context, 167774771 /* Multiply */);
    expect$1(parser, context, 36971 /* AsKeyword */, 80 /* AsAfterImportStart */);
    const local = parseBindingIdentifier(parser, context);
    specifiers.push(finishNode$1(context, parser, pos, {
        type: 'ImportNamespaceSpecifier',
        local,
    }));
}
/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleSpecifier(parser, context) {
    // ModuleSpecifier :
    //   StringLiteral
    expect$1(parser, context, 36977 /* FromKeyword */);
    if (parser.token !== 33554435 /* StringLiteral */)
        report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    return parseLiteral(parser, context);
}
/**
 * Parse import default specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportDefaultSpecifier(parser, context) {
    return finishNode$1(context, parser, getLocation$1(parser), {
        type: 'ImportDefaultSpecifier',
        local: parseIdentifier(parser, context),
    });
}
/**
 * Parses either async function or assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionOrAssignmentExpression(parser, context) {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
        parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context | 16777216 /* RequireIdentifier */) :
        parseAssignmentExpression(parser, context | 65536 /* AllowIn */);
}

/**
 * Creates the parser object
 *
 * @param source The source coode to parser
 * @param sourceFile Optional source file info to be attached in every node
 */
function createParser(source, sourceFile) {
    return {
        // The source code to parse
        source,
        // Source length
        length: source.length,
        // Current position
        index: 0,
        // Current line
        line: 1,
        // Current column
        column: 0,
        // Start position  before current token
        startIndex: 0,
        // Start position column before current token
        startColumn: 0,
        // Start position line before current token
        startLine: 1,
        // End position after parsing after current token
        lastIndex: 0,
        // End column position after current token
        lastColumn: 0,
        // End line position after current token
        lastLine: 0,
        // Pending cover grammar errors
        pendingExpressionError: undefined,
        // Mutable parser flags. Allows destructuring by default.
        flags: 4 /* AllowDestructuring */,
        // The tokens
        token: 524288 /* EndOfSource */,
        // Misc
        tokenRaw: '',
        lastValue: 0,
        comments: [],
        sourceFile,
        tokenRegExp: undefined,
        tokenValue: undefined,
        labelSet: undefined,
        errorLocation: undefined,
        errors: [],
    };
}
/**
 * Creating the parser
 *
 * @param source The source coode to parser
 * @param options The parser options
 * @param context Context masks
 */
function parse(source, options, context) {
    let sourceFile = '';
    if (!!options) {
        // The flag to enable stage 3 support (ESNext)
        if (options.next)
            context |= 1 /* OptionsNext */;
        // The flag to enable React JSX parsing
        if (options.jsx)
            context |= 4 /* OptionsJSX */;
        // The flag to enable start and end offsets to each node
        if (options.ranges)
            context |= 2 /* OptionsRanges */;
        // The flag to enable line/column location information to each node
        if (options.loc)
            context |= 16 /* OptionsLoc */;
        // The flag to attach raw property to each literal node
        if (options.raw)
            context |= 8 /* OptionsRaw */;
        // Attach raw property to each identifier node
        if (options.rawIdentifier)
            context |= 256 /* OptionsRawidentifiers */;
        // The flag to allow return in the global scope
        if (options.globalReturn)
            context |= 32 /* OptionsGlobalReturn */;
        // The flag to allow to skip shebang - '#'
        if (options.skipShebang)
            context |= 128 /* OptionsShebang */;
        // Enable tolerant mode
        if (options.tolerant)
            context |= 512 /* OptionsTolerant */;
        // Set to true to record the source file in every node's loc object when the loc option is set.
        if (!!options.source)
            sourceFile = options.source;
        // Create a top-level comments array containing all comments
        if (!!options.comments)
            context |= 64 /* OptionsComments */;
        // The flag to enable implied strict mode
        if (options.impliedStrict)
            context |= 4096 /* Strict */;
        // The flag to enable experimental features
        if (options.experimental)
            context |= 2048 /* OptionsExperimental */;
        // The flag to set to bypass methods in Node
        if (options.node)
            context |= 1024 /* OptionsNode */;
        // Accepts a callback function to be invoked for each syntax node (as the node is constructed)
    }
    const parser = createParser(source, sourceFile);
    const body = context & 8192 /* Module */
        ? parseModuleItemList(parser, context)
        : parseStatementList(parser, context);
    const node = {
        type: 'Program',
        sourceType: context & 8192 /* Module */ ? 'module' : 'script',
        body: body,
    };
    if (context & 2 /* OptionsRanges */) {
        node.start = 0;
        node.end = source.length;
    }
    if (context & 16 /* OptionsLoc */) {
        node.loc = {
            start: {
                line: 1,
                column: 0,
            },
            end: {
                line: parser.line,
                column: parser.column,
            },
        };
        if (sourceFile)
            node.loc.source = sourceFile;
    }
    if (context & 64 /* OptionsComments */)
        node.comments = parser.comments;
    if (context & 512 /* OptionsTolerant */)
        node.errors = parser.errors;
    return node;
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function parseStatementList(parser, context) {
    const statements = [];
    nextToken$1(parser, context | 536870912 /* DisallowEscapedKeyword */);
    while (parser.token === 33554435 /* StringLiteral */) {
        // We do a strict check here too speed up things in case someone is crazy eenough to
        // write "use strict"; "use strict"; at Top-level. // J.K
        if (!(context & 4096 /* Strict */) && parser.tokenRaw.length === /* length of prologue*/ 12 && parser.tokenValue === 'use strict') {
            context |= 4096 /* Strict */;
        }
        statements.push(parseDirective(parser, context));
    }
    while (parser.token !== 524288 /* EndOfSource */) {
        statements.push(parseStatementListItem(parser, context));
    }
    return statements;
}

/**
 * Parse TypeScript
 *
 * @param source source code to parse
 * @param options parser options
 */
function parseTS(source, options) {
    return options && options.module
        ? parse(source, options, 4096 /* Strict */ | 8192 /* Module */)
        : parse(source, options, 0 /* Empty */);
}

export { parseTS };
