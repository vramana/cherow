// Note: this *must* be kept in sync with the enum's order.
//
// It exploits the enum value ordering, and it's necessarily a complete and
// utter hack.
//
// All to lower it to a single monomorphic array access.
var KeywordDescTable = [
    'end of source',
    /* Constants/Bindings */
    'identifier', 'number', 'string', 'regular expression',
    'false', 'true', 'null',
    /* Template nodes */
    'template continuation', 'template end',
    /* Punctuators */
    '=>', '(', '{', '.', '...', '}', ')', ';', ',', '[', ']', ':', '?', '\'', '"', '</', '/>',
    /* Update operators */
    '++', '--',
    /* Assign operators */
    '=', '<<=', '>>=', '>>>=', '**=', '+=', '-=', '*=', '/=', '%=', '^=', '|=',
    '&=',
    /* Unary/binary operators */
    'typeof', 'delete', 'void', '!', '~', '+', '-', 'in', 'instanceof', '*', '%', '/', '**', '&&',
    '||', '===', '!==', '==', '!=', '<=', '>=', '<', '>', '<<', '>>', '>>>', '&', '|', '^',
    /* Variable declaration kinds */
    'var', 'let', 'const',
    /* Other reserved words */
    'break', 'case', 'catch', 'class', 'continue', 'debugger', 'default', 'do', 'else', 'export',
    'extends', 'finally', 'for', 'function', 'if', 'import', 'new', 'return', 'super', 'switch',
    'this', 'throw', 'try', 'while', 'with',
    /* Strict mode reserved words */
    'implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'yield',
    /* Contextual keywords */
    'as', 'async', 'await', 'constructor', 'get', 'set', 'from', 'of',
    '#',
    'eval', 'arguments', 'enum', 'BigInt', '@'
];
/**
 * The conversion function between token and its string description/representation.
 */
function tokenDesc(token) {
    return KeywordDescTable[token & 255 /* Type */];
}
// Used `Object.create(null)` to avoid potential `Object.prototype`
// interference.
var DescKeywordTable = Object.create(null, {
    this: { value: 19551 /* ThisKeyword */ },
    function: { value: 19544 /* FunctionKeyword */ },
    if: { value: 3161 /* IfKeyword */ },
    return: { value: 3164 /* ReturnKeyword */ },
    var: { value: 19527 /* VarKeyword */ },
    else: { value: 3154 /* ElseKeyword */ },
    for: { value: 1073744982 /* ForKeyword */ },
    new: { value: 19547 /* NewKeyword */ },
    in: { value: 537022257 /* InKeyword */ },
    typeof: { value: 281642 /* TypeofKeyword */ },
    while: { value: 1073744994 /* WhileKeyword */ },
    case: { value: 3147 /* CaseKeyword */ },
    break: { value: 3146 /* BreakKeyword */ },
    try: { value: 3169 /* TryKeyword */ },
    catch: { value: 3148 /* CatchKeyword */ },
    delete: { value: 281643 /* DeleteKeyword */ },
    throw: { value: 3168 /* ThrowKeyword */ },
    switch: { value: 19550 /* SwitchKeyword */ },
    continue: { value: 3150 /* ContinueKeyword */ },
    default: { value: 3152 /* DefaultKeyword */ },
    instanceof: { value: 151346 /* InstanceofKeyword */ },
    do: { value: 1073744977 /* DoKeyword */ },
    void: { value: 281644 /* VoidKeyword */ },
    finally: { value: 3157 /* FinallyKeyword */ },
    arguments: { value: 201343093 /* Arguments */ },
    as: { value: 9323 /* AsKeyword */ },
    async: { value: 4203628 /* AsyncKeyword */ },
    await: { value: 69231725 /* AwaitKeyword */ },
    class: { value: 19533 /* ClassKeyword */ },
    const: { value: 19529 /* ConstKeyword */ },
    constructor: { value: 9326 /* ConstructorKeyword */ },
    debugger: { value: 3151 /* DebuggerKeyword */ },
    enum: { value: 3190 /* EnumKeyword */ },
    eval: { value: 201343092 /* Eval */ },
    export: { value: 3155 /* ExportKeyword */ },
    extends: { value: 3156 /* ExtendsKeyword */ },
    false: { value: 19461 /* FalseKeyword */ },
    from: { value: 9329 /* FromKeyword */ },
    get: { value: 9327 /* GetKeyword */ },
    implements: { value: 5219 /* ImplementsKeyword */ },
    import: { value: 19546 /* ImportKeyword */ },
    interface: { value: 5220 /* InterfaceKeyword */ },
    let: { value: 21576 /* LetKeyword */ },
    null: { value: 19463 /* NullKeyword */ },
    of: { value: 536880242 /* OfKeyword */ },
    package: { value: 5221 /* PackageKeyword */ },
    private: { value: 5222 /* PrivateKeyword */ },
    protected: { value: 5223 /* ProtectedKeyword */ },
    public: { value: 5224 /* PublicKeyword */ },
    set: { value: 9328 /* SetKeyword */ },
    static: { value: 5225 /* StaticKeyword */ },
    super: { value: 19549 /* SuperKeyword */ },
    true: { value: 19462 /* TrueKeyword */ },
    with: { value: 3171 /* WithKeyword */ },
    yield: { value: 1070186 /* YieldKeyword */ },
});
function descKeyword(value) {
    return (DescKeywordTable[value] | 0);
}

var ErrorMessages = {};
ErrorMessages[0 /* Unexpected */] = 'Unexpected token';
ErrorMessages[1 /* UnexpectedToken */] = 'Unexpected token \'%0\'';
ErrorMessages[2 /* UnexpectedKeyword */] = 'Keyword \'%0\' is reserved';
ErrorMessages[3 /* InvalidLHSInAssignment */] = 'Invalid left-hand side in assignment';
ErrorMessages[4 /* UnterminatedString */] = 'Unterminated string literal';
ErrorMessages[5 /* UnterminatedRegExp */] = 'Unterminated regular expression literal';
ErrorMessages[6 /* UnterminatedComment */] = 'Unterminated MultiLineComment';
ErrorMessages[7 /* UnterminatedTemplate */] = 'Unterminated template literal';
ErrorMessages[8 /* UnexpectedChar */] = 'Invalid character \'%0\'';
ErrorMessages[9 /* StrictOctalEscape */] = 'Octal escapes are not allowed in strict mode';
ErrorMessages[10 /* InvalidEightAndNine */] = 'Escapes \\8 or \\9 are not syntactically valid escapes';
ErrorMessages[11 /* InvalidHexEscapeSequence */] = 'Invalid hexadecimal escape sequence';
ErrorMessages[12 /* UnicodeOutOfRange */] = 'Unicode escape code point out of range';
ErrorMessages[13 /* DuplicateRegExpFlag */] = 'Duplicate regular expression flag \'%0\'';
ErrorMessages[14 /* UnexpectedTokenRegExpFlag */] = 'Unexpected regular expression flag \'%0\'';
ErrorMessages[15 /* StrictLHSAssignment */] = 'Eval or arguments can\'t be assigned to in strict mode code';
ErrorMessages[16 /* IllegalReturn */] = 'Illegal return statement';
ErrorMessages[17 /* StrictFunction */] = 'In strict mode code, functions can only be declared at top level or inside a block';
ErrorMessages[18 /* SloppyFunction */] = 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement';
ErrorMessages[19 /* ForbiddenAsStatement */] = '%0 can\'t appear in single-statement context';
ErrorMessages[20 /* GeneratorInSingleStatementContext */] = 'Generators can only be declared at the top level or inside a block';
ErrorMessages[21 /* ForAwaitNotOf */] = '\'for await\' loop should be used with \'of\'';
ErrorMessages[22 /* DeclarationMissingInitializer */] = 'Missing initializer in %0 declaration';
ErrorMessages[23 /* ForInOfLoopInitializer */] = '\'for-%0\' loop variable declaration may not have an initializer';
ErrorMessages[24 /* ForInOfLoopMultiBindings */] = 'Invalid left-hand side in for-%0 loop: Must have a single binding.';
ErrorMessages[25 /* LetInLexicalBinding */] = 'let is disallowed as a lexically bound name';
ErrorMessages[26 /* UnexpectedLexicalDeclaration */] = 'Lexical declaration cannot appear in a single-statement context';
ErrorMessages[27 /* LabelRedeclaration */] = 'Label \'%0\' has already been declared';
ErrorMessages[28 /* InvalidNestedStatement */] = '%0  statement must be nested within an iteration statement';
ErrorMessages[29 /* IllegalContinue */] = 'Illegal continue statement: \'%0\' does not denote an iteration statement';
ErrorMessages[30 /* UnknownLabel */] = 'Undefined label \'%0\'';
ErrorMessages[31 /* MultipleDefaultsInSwitch */] = 'More than one default clause in switch statement';
ErrorMessages[33 /* ExportDeclAtTopLevel */] = 'Export declarations may only appear at top level of a module';
ErrorMessages[32 /* ImportDeclAtTopLevel */] = 'Import declarations may only appear at top level of a module';
ErrorMessages[34 /* AsyncFunctionInSingleStatementContext */] = 'Async functions can only be declared at the top level or inside a block';
ErrorMessages[35 /* LineBreakAfterAsync */] = 'No line break is allowed after async';
ErrorMessages[36 /* StrictModeWith */] = 'Strict mode code may not include a with statement';
ErrorMessages[37 /* AwaitOutsideAsync */] = 'Await is only valid in async functions';
ErrorMessages[38 /* UnNamedFunctionDecl */] = 'Function declaration must have a name in this context';
ErrorMessages[39 /* DisallowedInContext */] = '\'%0\' may not be used as an identifier in this context';
ErrorMessages[40 /* PrivateFieldConstructor */] = 'Classes may not have a private field named \'#constructor\'';
ErrorMessages[41 /* PublicFieldConstructor */] = 'Classes may not have a field named \'constructor\'';
ErrorMessages[42 /* StrictDelete */] = 'Identifier expressions must not be deleted in strict mode';
ErrorMessages[43 /* DeletePrivateField */] = 'Private fields can not be deleted';
ErrorMessages[44 /* ConstructorIsGenerator */] = 'Class constructor may not be a generator';
ErrorMessages[45 /* ConstructorSpecialMethod */] = 'Class constructor may not be an accessor';
ErrorMessages[46 /* UnexpectedReserved */] = 'Unexpected reserved word';
ErrorMessages[47 /* StrictEvalArguments */] = 'Unexpected eval or arguments in strict mode';
ErrorMessages[48 /* AwaitBindingIdentifier */] = '\'await\' is not a valid identifier inside an async function';
ErrorMessages[49 /* YieldBindingIdentifier */] = '\'yield\' is not a valid identifier inside an generator function';
ErrorMessages[50 /* UnexpectedStrictReserved */] = 'Unexpected strict mode reserved word';
ErrorMessages[52 /* AwaitInParameter */] = 'Await expression not allowed in formal parameter';
ErrorMessages[51 /* YieldInParameter */] = 'Yield expression not allowed in formal parameter';
ErrorMessages[53 /* MetaNotInFunctionBody */] = 'new.target only allowed within functions';
ErrorMessages[54 /* BadSuperCall */] = 'super() is not allowed in this context';
ErrorMessages[55 /* UnexpectedSuper */] = 'Member access from super not allowed in this context';
ErrorMessages[56 /* LoneSuper */] = 'Only "(" or "." or "[" are allowed after \'super\'';
ErrorMessages[57 /* YieldReservedKeyword */] = '\'yield\' is a reserved keyword within generator function bodies';
ErrorMessages[58 /* ContinuousNumericSeparator */] = 'Only one underscore is allowed as numeric separator';
ErrorMessages[59 /* TrailingNumericSeparator */] = 'Numeric separators are not allowed at the end of numeric literals';
ErrorMessages[60 /* ZeroDigitNumericSeparator */] = 'Numeric separator can not be used after leading 0.';
ErrorMessages[61 /* StrictOctalLiteral */] = 'Legacy octal literals are not allowed in strict mode';
ErrorMessages[62 /* InvalidOrUnexpectedToken */] = 'Invalid or unexpected token';
ErrorMessages[63 /* InvalidLhsInAssignment */] = 'Invalid left-hand side in assignment';
ErrorMessages[64 /* DuplicateProto */] = 'Duplicate __proto__ fields are not allowed in object literals';
ErrorMessages[65 /* IllegalUseStrict */] = 'Illegal \'use strict\' directive in function with non-simple parameter list';
ErrorMessages[66 /* StaticPrototype */] = 'Classes may not have a static property named \'prototype\'';
ErrorMessages[67 /* BadImportCallArity */] = 'Unexpected token';
ErrorMessages[68 /* BadGetterArity */] = 'Getter must not have any formal parameters';
ErrorMessages[69 /* BadSetterArity */] = 'Setter must have exactly one formal parameter';
ErrorMessages[70 /* BadSetterRestParameter */] = 'Setter function argument must not be a rest parameter';
ErrorMessages[71 /* StrictLHSPrefixPostFix */] = '%0 increment/decrement may not have eval or arguments operand in strict mode';
ErrorMessages[35 /* LineBreakAfterAsync */] = 'No line break is allowed after async';
ErrorMessages[72 /* InvalidElisonInObjPropList */] = 'Elision not allowed in object property list';
ErrorMessages[73 /* ElementAfterRest */] = 'Rest element must be last element';
ErrorMessages[75 /* ElementAfterSpread */] = 'Spread element must be last element';
ErrorMessages[74 /* RestDefaultInitializer */] = 'Rest parameter may not have a default initializer';
ErrorMessages[76 /* InvalidDestructuringTarget */] = 'Invalid destructuring assignment target';
ErrorMessages[77 /* UnexpectedSurrogate */] = 'Unexpected surrogate pair';
ErrorMessages[78 /* InvalidUnicodeEscapeSequence */] = 'Invalid Unicode escape sequence';
ErrorMessages[79 /* TemplateOctalLiteral */] = 'Template literals may not contain octal escape sequences';
ErrorMessages[80 /* NotBindable */] = '\'%0\' can not be treated as an actual binding pattern';
ErrorMessages[81 /* ParamAfterRest */] = 'Rest parameter must be last formal parameter';
ErrorMessages[82 /* LineBreakAfterArrow */] = 'No line break is allowed after \'=>\'';
ErrorMessages[83 /* NoCatchOrFinally */] = 'Missing catch or finally after try';
ErrorMessages[84 /* NewlineAfterThrow */] = 'Illegal newline after throw';
ErrorMessages[85 /* ParamDupe */] = 'Duplicate parameter name not allowed in this context';
ErrorMessages[86 /* UnexpectedAsBinding */] = 'Unexpected token \'%0\' before imported binding name';
ErrorMessages[87 /* LabelNoColon */] = 'Labels must be followed by a \':\'';
/**
 * Collect line, index, and colum from either the recorded error
 * or directly from the parser and returns it
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param index  The 0-based end index of the error.
 * @param line The 0-based line position of the error.
 * @param column The 0-based column position of the error.
 * @param parser The 0-based end index of the current node.
 * @param description Error description
 */
function constructError(parser, context, index, line, column, description) {
    var error = new SyntaxError(("Line " + line + ", column " + column + ": " + description));
    error.index = index;
    error.line = line;
    error.column = column;
    error.description = description;
    if (context & 4096 /* OptionsTolerant */) {
        parser.errors.push(error);
    }
    else
        { throw error; }
}
/**
 * Collect line, index, and colum from either the recorded error
 * or directly from the parser and returns it
 *
 * @param parser Parser instance
 */
function getErrorLocation(parser) {
    var index = parser.index;
    var line = parser.line;
    var column = parser.column;
    var errorLoc = parser.errorLocation;
    if (!!errorLoc) {
        index = errorLoc.index;
        line = errorLoc.line;
        column = errorLoc.column;
    }
    return { index: index, line: line, column: column };
}
/**
 * Throws an error
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param type Error type
 * @param params Error params
 */
function report(parser, type) {
    var params = [], len = arguments.length - 2;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 2 ];

    var ref = getErrorLocation(parser);
    var index = ref.index;
    var line = ref.line;
    var column = ref.column;
    var errorMessage = ErrorMessages[type].replace(/%(\d+)/g, function (_, i) { return params[i]; });
    constructError(parser, 0 /* Empty */, index, line, column, errorMessage);
}
/**
 * If in tolerant mode, all errors are pushed to a top-level error array containing
 * otherwise throws
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param type Error type
 * @param params Error params
 */
function tolerant(parser, context, type) {
    var params = [], len = arguments.length - 3;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 3 ];

    var ref = getErrorLocation(parser);
    var index = ref.index;
    var line = ref.line;
    var column = ref.column;
    var errorMessage = ErrorMessages[type].replace(/%(\d+)/g, function (_, i) { return params[i]; });
    constructError(parser, context, index, line, column, errorMessage);
}

// Unicode v. 10 support
function isValidIdentifierPart(code) {
    var bit = code & 31;
    return (convert[(code >>> 5) + 0] >>> bit & 1) !== 0;
}
function isValidIdentifierStart(code) {
    var bit = code & 31;
    return (convert[(code >>> 5) + 34816] >>> bit & 1) !== 0;
}
function mustEscape(code) {
    var bit = code & 31;
    return (convert[(code >>> 5) + 69632] >>> bit & 1) !== 0;
}
var convert = (function (compressed, lookup) {
    var result = new Uint32Array(104448);
    var index = 0;
    var subIndex = 0;
    while (index < 3293) {
        var inst = compressed[index++];
        if (inst < 0) {
            subIndex -= inst;
        }
        else {
            var code = compressed[index++];
            if (inst & 2)
                { code = lookup[code]; }
            if (inst & 1) {
                result.fill(code, subIndex, subIndex += compressed[index++]);
            }
            else {
                result[subIndex++] = code;
            }
        }
    }
    return result;
})([-1, 2, 28, 2, 29, 2, 5, -1, 0, 77595648, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 55, 2, 56, 2, 4, 0, 4294836479, 0, 3221225471, 0, 4294901942, 2, 57, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 17, 2, 0, 0, 4294961151, 3, 0, 2, 2, 20, 2, 0, 2, 59, 2, 0, 2, 125, 2, 6, 2, 19, -1, 2, 60, 2, 148, 2, 1, 3, 0, 3, 0, 4294901711, 2, 37, 0, 4089839103, 0, 2961209759, 0, 268697551, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2965387679, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 2, 167, 2, 3, 0, 3825204735, 0, 123747807, 0, 65487, 2, 3, 0, 4092591615, 0, 1080049119, 0, 458703, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247020, 2, 64, 0, 4284449919, 0, 851904, 2, 4, 2, 16, 0, 67076095, -1, 2, 65, 0, 1006628014, 0, 4093591391, -1, 0, 50331649, 0, 3265266687, 2, 34, 0, 4294844415, 0, 4278190047, 2, 22, 2, 124, -1, 3, 0, 2, 2, 33, 2, 0, 2, 10, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 0, 3892314111, 0, 261632, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 2088959, 2, 31, 2, 8, 0, 909311, 3, 0, 2, 0, 814743551, 2, 39, 0, 67057664, 3, 0, 2, 2, 9, 2, 0, 2, 32, 2, 0, 2, 18, 2, 7, 0, 268374015, 2, 30, 2, 46, 2, 0, 2, 73, 0, 134153215, -1, 2, 6, 2, 0, 2, 7, 0, 2684354559, 0, 67044351, 0, 1073676416, -2, 3, 0, 2, 2, 40, 0, 1046528, 3, 0, 3, 2, 8, 2, 0, 2, 9, 0, 4294960127, 2, 10, 2, 13, -1, 0, 4294377472, 2, 25, 3, 0, 7, 0, 4227858431, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -1, 2, 121, 0, 1048577, 2, 79, 2, 12, -1, 2, 12, 0, 131042, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 1046559, 2, 0, 2, 14, 2, 0, 0, 2147516671, 2, 23, 3, 83, 2, 2, 0, -16, 2, 84, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 2, 117, 2, 0, 0, 3220242431, 3, 0, 3, 2, 20, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 2, 0, 2, 26, 2, 0, 2, 8, 3, 0, 2, 0, 67043391, 0, 687865855, 2, 0, 2, 24, 2, 8, 2, 22, 3, 0, 2, 0, 67076097, 2, 7, 2, 0, 2, 23, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 3774349439, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, 2, 27, 0, 1638399, 2, 165, 2, 102, 3, 0, 3, 2, 22, 2, 28, 2, 29, 2, 5, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -3, 2, 144, -4, 2, 22, 2, 0, 2, 107, 0, 1, 2, 0, 2, 58, 2, 32, 2, 16, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 33, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277137519, 0, 2265972735, -1, 3, 22, 2, -1, 2, 34, 2, 36, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 3, 0, 2, 2, 36, 0, 2147549120, 2, 0, 2, 16, 2, 17, 2, 128, 2, 0, 2, 48, 2, 17, 0, 5242879, 3, 0, 2, 0, 402594847, -1, 2, 116, 0, 1090519039, -2, 2, 118, 2, 119, 2, 0, 2, 38, 2, 37, 2, 2, 0, 3766565279, 0, 2039759, -4, 3, 0, 2, 2, 38, -1, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 9, 2, 39, -1, 0, 3825205247, 2, 40, -11, 3, 0, 2, 0, 2147484671, -8, 2, 0, 2, 7, 0, 4294901888, 2, 0, 0, 67108815, -1, 2, 0, 2, 45, -8, 2, 50, 2, 41, 0, 67043329, 2, 122, 2, 42, 0, 8388351, -2, 2, 123, 0, 3028287487, 0, 67043583, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, 2, 39, -2, 2, 17, 2, 46, 2, 0, 2, 23, 0, 67043343, 2, 126, 2, 27, -27, 3, 0, 2, 0, 4294901791, 2, 7, 2, 187, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 0, 1677656575, -166, 0, 4161266656, 0, 4071, 0, 15360, -4, 0, 28, -13, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 85, 2, 0, 0, 2105343, 0, 4160749584, 2, 194, -42, 0, 4194303871, 0, 2011, -62, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 38, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -22583, 3, 0, 7, 2, 27, -6130, 3, 5, 2, -1, 0, 69207040, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 55, 2, 56, 2, 4, 2, 26, -1, 2, 17, 2, 57, -1, 2, 0, 2, 19, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 27, 2, 58, 3, 0, 2, 0, 131135, 2, 91, 0, 70256639, 2, 59, 0, 272, 2, 45, 2, 19, -1, 2, 60, -2, 2, 93, 0, 603979775, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 61, 2, 62, 0, 33554435, 2, 120, 2, 61, 2, 145, 0, 131075, 0, 3594373096, 0, 67094296, 2, 62, -1, 2, 63, 0, 603979263, 2, 153, 0, 3, 0, 4294828001, 0, 602930687, 2, 175, 0, 393219, 2, 63, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 64, 2, 36, -1, 2, 4, 0, 917503, 2, 36, -1, 2, 65, 0, 537783470, 0, 4026531935, -1, 0, 1, -1, 2, 34, 2, 47, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 2, 16, -1, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 253951, 3, 20, 2, 0, 122879, 2, 0, 2, 8, 0, 276824064, -2, 3, 0, 2, 2, 9, 2, 0, 0, 4294903295, 2, 0, 2, 18, 2, 7, -1, 2, 17, 2, 46, 2, 0, 2, 73, 2, 39, -1, 2, 23, 2, 0, 2, 31, -2, 0, 128, -2, 2, 74, 2, 8, 0, 4064, -1, 2, 115, 0, 4227907585, 2, 0, 2, 191, 2, 0, 2, 44, 0, 4227915776, 2, 10, 2, 13, -2, 0, 6544896, 3, 0, 6, -2, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -3, 2, 79, 2, 12, -3, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 817183, 2, 0, 2, 14, 2, 0, 0, 33023, 2, 23, 3, 83, 2, -17, 2, 84, 0, 524157950, 2, 4, 2, 0, 2, 85, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 0, 3072, 2, 0, 0, 2147516415, 2, 10, 3, 0, 2, 2, 27, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 0, 4294965179, 0, 7, 2, 0, 2, 8, 2, 88, 2, 8, -1, 0, 687603712, 2, 91, 2, 92, 2, 36, 2, 22, 2, 93, 2, 35, 2, 159, 0, 2080440287, 2, 0, 2, 13, 2, 136, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 7, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 2700607615, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, -3, 2, 102, 3, 0, 3, 2, 22, -1, 3, 5, 2, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -8, 2, 22, 2, 0, 2, 107, -1, 2, 0, 2, 58, 2, 32, 2, 18, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 17, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277075969, 2, 8, -1, 3, 22, 2, -1, 2, 34, 2, 137, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 2, 115, 2, 9, -2, 2, 115, 2, 27, 2, 17, 2, 13, 2, 115, 2, 36, 2, 17, 0, 4718591, 2, 115, 2, 35, 0, 335544350, -1, 2, 116, 2, 117, -2, 2, 118, 2, 119, 2, 7, -1, 2, 120, 2, 61, 0, 3758161920, 0, 3, -4, 2, 0, 2, 31, 2, 170, -1, 2, 0, 2, 27, 0, 176, -5, 2, 0, 2, 43, 2, 177, -1, 2, 0, 2, 27, 2, 189, -1, 2, 0, 2, 19, -2, 2, 25, -12, 3, 0, 2, 2, 121, -8, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 975, -1, 2, 0, 2, 45, -8, 2, 50, 2, 43, 0, 1, 2, 122, 2, 27, -3, 2, 123, 2, 107, 2, 124, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, -3, 2, 17, 2, 125, 2, 0, 2, 27, 2, 44, 2, 126, 2, 27, -27, 3, 0, 2, 0, 65567, -1, 2, 100, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 2, 128, -187, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 2, 136, -129, 3, 0, 6, 2, 137, -1, 3, 0, 2, 2, 44, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -28719, 2, 0, 0, 1, -1, 2, 121, 2, 0, 0, 8193, -21, 0, 50331648, 0, 10255, 0, 4, -11, 2, 62, 2, 163, 0, 1, 0, 71936, -1, 2, 154, 0, 4292933632, 0, 805306431, -5, 2, 144, -1, 2, 172, -1, 0, 6144, -2, 2, 122, -1, 2, 164, -1, 2, 150, 2, 145, 2, 158, 2, 0, 0, 3223322624, 2, 8, 0, 4, -4, 2, 183, 0, 205128192, 0, 1333757536, 0, 3221225520, 0, 423953, 0, 747766272, 0, 2717763192, 0, 4290773055, 0, 278545, 2, 146, 0, 4294886464, 0, 33292336, 0, 417809, 2, 146, 0, 1329579616, 0, 4278190128, 0, 700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 147, 0, 469762560, 0, 4171219488, 0, 16711728, 2, 147, 0, 202375680, 0, 3214918176, 0, 4294508592, 2, 147, -1, 0, 983584, 0, 48, 0, 58720275, 0, 3489923072, 0, 10517376, 0, 4293066815, 0, 1, 0, 2013265920, 2, 171, 2, 0, 0, 17816169, 0, 3288339281, 0, 201375904, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2, 144, 0, 4160757760, 2, 0, -6, 2, 160, -11, 0, 3263218176, -1, 0, 49664, 0, 2160197632, 0, 8388802, -1, 0, 12713984, -1, 0, 402653184, 2, 152, 2, 155, -2, 2, 156, -20, 0, 3758096385, -2, 2, 185, 0, 4292878336, 2, 21, 2, 148, 0, 4294057984, -2, 2, 157, 2, 149, 2, 168, -2, 2, 166, -1, 2, 174, -1, 2, 162, 2, 121, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 151, 0, 939588608, -1, 0, 805306368, -1, 2, 121, 0, 1610612736, 2, 149, 2, 150, 3, 0, 2, -2, 2, 151, 2, 152, -3, 0, 267386880, -1, 2, 153, 0, 7168, -1, 2, 180, 2, 0, 2, 154, 2, 155, -7, 2, 161, -8, 2, 156, -1, 0, 1426112704, 2, 157, -1, 2, 181, 0, 271581216, 0, 2149777408, 2, 27, 2, 154, 2, 121, 0, 851967, 0, 3758129152, -1, 2, 27, 2, 173, -4, 2, 151, -20, 2, 188, 2, 158, -56, 0, 3145728, 2, 179, 2, 184, 0, 4294443520, 2, 73, -1, 2, 159, 2, 121, -4, 0, 32505856, -1, 2, 160, -1, 0, 2147385088, 2, 21, 1, 2155905152, 2, -3, 2, 91, 2, 0, 2, 161, -2, 2, 148, -6, 2, 162, 0, 4026597375, 0, 1, -1, 0, 1, -1, 2, 163, -3, 2, 137, 2, 190, -2, 2, 159, 2, 164, -1, 2, 169, 2, 121, -6, 2, 121, -213, 2, 162, -657, 2, 158, -36, 2, 165, -1, 0, 65408, -10, 2, 193, -5, 2, 166, -5, 0, 4278222848, 2, 0, 2, 23, -1, 0, 4227919872, -1, 2, 166, -2, 0, 4227874752, 2, 157, -2, 0, 2146435072, 2, 152, -2, 0, 1006649344, 2, 121, -1, 2, 21, 0, 201375744, -3, 0, 134217720, 2, 21, 0, 4286677377, 0, 32896, -1, 2, 167, -3, 2, 168, -349, 2, 169, 2, 170, 2, 171, 3, 0, 264, -11, 2, 172, -2, 2, 155, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524284, -11, 2, 27, -1, 2, 178, -1, 2, 176, 0, 3221291007, 2, 155, -1, 0, 524288, 0, 2158720, -3, 2, 152, 0, 1, -4, 2, 121, 0, 3808625411, 0, 3489628288, 0, 4096, 0, 1207959680, 0, 3221274624, 2, 0, -3, 2, 164, 0, 120, 0, 7340032, -2, 0, 4026564608, 2, 4, 2, 27, 2, 157, 3, 0, 4, 2, 152, -1, 2, 173, 2, 171, -1, 0, 8176, 2, 174, 2, 164, 2, 175, -1, 0, 4290773232, 2, 0, -4, 2, 157, 2, 182, 0, 15728640, 2, 171, -1, 2, 154, -1, 0, 4294934512, 3, 0, 4, -9, 2, 21, 2, 162, 2, 176, 3, 0, 4, 0, 704, 0, 1849688064, 0, 4194304, -1, 2, 121, 0, 4294901887, 2, 0, 0, 130547712, 0, 1879048192, 0, 2080374784, 3, 0, 2, -1, 2, 177, 2, 178, -1, 0, 17829776, 0, 2028994560, 0, 4261478144, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 179, 0, 16252928, 0, 3791388672, 2, 119, 3, 0, 2, -2, 2, 180, 2, 0, -1, 2, 100, -1, 0, 66584576, 3, 0, 11, 2, 121, 3, 0, 12, -2, 0, 245760, 0, 2147418112, -1, 2, 144, 2, 195, 0, 4227923456, -1, 2, 181, 2, 169, 2, 21, -2, 2, 172, 0, 4292870145, 0, 262144, 2, 121, 3, 0, 2, 0, 1073758848, 2, 182, -1, 0, 4227921920, 2, 183, 2, 146, 0, 528402016, 0, 4292927536, 3, 0, 4, -2, 0, 3556769792, 2, 0, -2, 2, 186, 3, 0, 5, -1, 2, 179, 2, 157, 2, 0, -2, 0, 4227923936, 2, 58, -1, 2, 166, 2, 91, 2, 0, 2, 184, 2, 151, 3, 0, 11, -2, 0, 2146959360, 3, 0, 8, -2, 2, 154, -1, 0, 536870960, 2, 115, -1, 2, 185, 3, 0, 8, 0, 512, 0, 8388608, 2, 167, 2, 165, 2, 178, 0, 4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 186, 3, 0, 21, -28, 2, 155, 3, 0, 3, -3, 0, 4292902912, -6, 2, 93, 3, 0, 85, -33, 2, 187, 3, 0, 126, -18, 2, 188, 3, 0, 269, -17, 2, 185, 2, 121, 0, 4294917120, 3, 0, 2, 2, 27, 0, 4290822144, -2, 0, 67174336, 0, 520093700, 2, 17, 3, 0, 27, -2, 0, 65504, 2, 121, 2, 43, 3, 0, 2, 2, 88, -191, 2, 58, -23, 2, 100, 3, 0, 296, -8, 2, 121, 3, 0, 2, 2, 27, -11, 2, 171, 3, 0, 72, -3, 0, 3758159872, 0, 201391616, 3, 0, 155, -7, 2, 162, -1, 0, 384, -1, 0, 133693440, -3, 2, 180, -2, 2, 30, 3, 0, 5, -2, 2, 21, 2, 122, 3, 0, 4, -2, 2, 181, -1, 2, 144, 0, 335552923, 2, 189, -1, 0, 538974272, 0, 2214592512, 0, 132000, -10, 0, 192, -8, 0, 12288, -21, 0, 134213632, 0, 4294901761, 3, 0, 42, 0, 100663424, 0, 4294965284, 3, 0, 62, -6, 0, 4286578784, 2, 0, -2, 0, 1006696448, 3, 0, 37, 2, 189, 0, 4110942569, 0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 42, 3, 0, 8, -1, 2, 151, -2, 2, 148, 2, 190, 0, 65537, 2, 162, 2, 165, 2, 159, -1, 2, 151, -1, 2, 58, 2, 0, 2, 191, 0, 65528, 2, 171, 0, 4294770176, 2, 30, 3, 0, 4, -30, 2, 192, 0, 4261470208, -3, 2, 148, -2, 2, 192, 2, 0, 2, 151, -1, 2, 186, -1, 2, 154, 0, 4294950912, 3, 0, 2, 2, 151, 2, 121, 2, 165, 2, 193, 2, 166, 2, 0, 2, 194, 2, 188, 3, 0, 48, -1334, 2, 21, 2, 0, -129, 2, 192, -6, 2, 157, -180, 2, 195, -233, 2, 4, 3, 0, 96, -16, 2, 157, 3, 0, 22583, -7, 2, 17, 3, 0, 6128], [4294967295, 4294967291, 4092460543, 4294828015, 4294967294, 134217726, 268435455, 2147483647, 1048575, 16777215, 1073741823, 1061158911, 536805376, 511, 4294910143, 4160749567, 134217727, 4294901760, 4194303, 2047, 262143, 4286578688, 536870911, 8388607, 4294918143, 67108863, 255, 65535, 67043328, 2281701374, 4294967232, 2097151, 4294903807, 4294902783, 4294967039, 524287, 127, 4294549487, 67045375, 1023, 67047423, 4286578687, 4294770687, 32767, 15, 33554431, 2047999, 8191, 4292870143, 4294934527, 4294966783, 4294967279, 262083, 20511, 4290772991, 4294901759, 41943039, 460799, 4294959104, 71303167, 1071644671, 602799615, 65536, 4294828000, 805044223, 4277151126, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 4294967264, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294868991, 4294909951, 4294967292, 4294965759, 16744447, 4294966272, 4294901823, 4294967280, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 4294443008, 268369920, 4292804608, 486341884, 4294963199, 3087007615, 1073692671, 131071, 4128527, 4279238655, 4294902015, 4294966591, 2445279231, 3670015, 3238002687, 4294967288, 4294705151, 4095, 3221208447, 4294902271, 4294549472, 2147483648, 4294705152, 4294966143, 64, 16383, 3774873592, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4087, 31, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 536870912, 2952790016, 202506752, 139280, 4293918720, 4227922944, 2147532800, 61440, 3758096384, 117440512, 65280, 4227858432, 3233808384, 3221225472, 4294965248, 32768, 57152, 67108864, 4290772992, 25165824, 4160749568, 57344, 4278190080, 65472, 4227907584, 65520, 1920, 4026531840, 49152, 4294836224, 63488, 1073741824, 4294967040, 251658240, 196608, 12582912, 4294966784, 2097152, 64512, 417808, 469762048, 4261412864, 4227923712, 4294934528, 4294967168, 16, 98304, 63, 4292870144, 4294963200, 65534, 65532]);

/**
 * Validate break and continue statement
 *
 * @param parser Parser instance
 * @param label label
 * @param isContinue true if validation continue statement
 */
function validateBreakOrContinueLabel(parser, context, label, isContinue) {
    if ( isContinue === void 0 ) isContinue = false;

    var state = hasLabel(parser, label);
    if (!state)
        { tolerant(parser, context, 30 /* UnknownLabel */, label); }
    if (isContinue && !(state & 2 /* Nested */))
        { tolerant(parser, context, 29 /* IllegalContinue */, label); }
}
/**
 * Add label to the stack
 *
 * @param parser Parser instance
 * @param label label
 */
function addLabel(parser, label) {
    if (parser.labelSet === undefined)
        { parser.labelSet = {}; }
    parser.labelSet['$' + label] = parser.token & 1073741824 /* IsIterationStatement */ ? 2 /* Nested */ : 1 /* NotNested */;
}
/**
 * Remove label from the stack
 *
 * @param parser Parser instance
 * @param label label
 */
function popLabel(parser, label) {
    parser.labelSet['$' + label] = 0 /* None */;
}
/**
 * Returns either true or false. Depends if the label exist.
 *
 * @param parser Parser instance
 * @param label Label
 */
function hasLabel(parser, label) {
    return !parser.labelSet ? 0 /* None */ : parser.labelSet['$' + label];
}
/**
 * Finish each the node for each parse. Set line / and column on the node if the
 * options are set for it
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param meta Line / column
 * @param node AST node
 */
function finishNode(context, parser, meta, node) {
    if (context & 2 /* OptionsRanges */) {
        node.start = meta.index;
        node.end = parser.lastIndex;
    }
    if (context & 16 /* OptionsLoc */) {
        node.loc = {
            start: {
                line: meta.line,
                column: meta.column,
            },
            end: {
                line: parser.lastLine,
                column: parser.lastColumn
            }
        };
        if (parser.sourceFile) {
            node.loc.source = parser.sourceFile;
        }
    }
    if (context & 32 /* OptionsDelegate */) {
        parser.delegate(node, meta.index, parser.index);
    }
    return node;
}
/**
 * Finish each the node for each parse. Set line / and column on the node if the
 * options are set for it
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param meta Line / column
 * @param node AST node
 */
var isIdentifierPart = function (code) { return isValidIdentifierPart(code) ||
    code === 92 /* Backslash */ ||
    code === 36 /* Dollar */ ||
    code === 95 /* Underscore */ ||
    (code >= 48 /* Zero */ && code <= 57 /* Nine */); }; // 0..9;
/**
 * Expect token. Throws if no match
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param t Token
 * @param Err Errors
 */
function expect(parser, context, t, err /* UnexpectedToken */) {
    if ( err === void 0 ) err = 1;

    if (parser.token !== t) {
        report(parser, err, tokenDesc(parser.token));
    }
    nextToken(parser, context);
    return true;
}
/**
 * Consume token and advance if it exist, else return false
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param t Token
 */
function consume(parser, context, t) {
    if (parser.token === t) {
        nextToken(parser, context);
        return true;
    }
    return false;
}
/**
 * Advance and return the next token in the stream
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function nextToken(parser, context) {
    parser.lastIndex = parser.index;
    parser.lastLine = parser.line;
    parser.lastColumn = parser.column;
    return parser.token = scan$1(parser, context);
}
var hasBit = function (mask, flags) { return (mask & flags) === flags; };
/**
 * Scans private name. Stage 3 proposal related
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function scanPrivateName(parser, context) {
    if (!(context & 131072 /* InClass */) || !isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
        report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    if (context & 32768 /* Module */)
        { report(parser, 0 /* Unexpected */); }
    return 115 /* Hash */;
}
/**
 * Automatic Semicolon Insertion
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
 *
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function consumeSemicolon(parser, context) {
    var token = parser.token;
    if (token & 268435456 /* ASI */ || parser.flags & 1 /* NewLine */) { // EOF, '}', ';'
        return consume(parser, context, 301990417 /* Semicolon */);
    }
    report(parser, !(context & 524288 /* Async */) && token & 2097152 /* IsAwait */ ?
        37 /* AwaitOutsideAsync */ :
        1 /* UnexpectedToken */, tokenDesc(token));
    return false;
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
    var prevFlags = parser.flags;
    var prevpendingExpressionError = parser.pendingExpressionError;
    parser.flags |= 2 /* AllowBinding */ | 4 /* AllowDestructuring */;
    parser.pendingExpressionError = undefined;
    var res = callback(parser, context);
    // If there exist an pending expression error, we throw an error at
    // the same location it was recorded
    if (!!parser.pendingExpressionError) {
        var ref = parser.pendingExpressionError;
        var error = ref.error;
        var line = ref.line;
        var column = ref.column;
        var index = ref.index;
        constructError(parser, context, index, line, column, error);
    }
    parser.flags &= ~(2 /* AllowBinding */ | 4 /* AllowDestructuring */);
    if (prevFlags & 2 /* AllowBinding */)
        { parser.flags |= 2 /* AllowBinding */; }
    if (prevFlags & 4 /* AllowDestructuring */)
        { parser.flags |= 4 /* AllowDestructuring */; }
    parser.pendingExpressionError = prevpendingExpressionError;
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
    var prevFlags = parser.flags;
    var prevpendingExpressionError = parser.pendingExpressionError;
    parser.flags |= 2 /* AllowBinding */ | 4 /* AllowDestructuring */;
    parser.pendingExpressionError = undefined;
    var res = callback(parser, context);
    if (parser.flags & 2 /* AllowBinding */ && prevFlags & 2 /* AllowBinding */)
        { parser.flags |= 2 /* AllowBinding */; }
    else
        { parser.flags &= ~2 /* AllowBinding */; }
    if (parser.flags & 4 /* AllowDestructuring */ && prevFlags & 4 /* AllowDestructuring */)
        { parser.flags |= 4 /* AllowDestructuring */; }
    else
        { parser.flags &= ~4 /* AllowDestructuring */; }
    parser.pendingExpressionError = prevpendingExpressionError || parser.pendingExpressionError;
    return res;
}
/**
 * Set / unset yield / await context masks based on the
 * ModifierState masks before invoking the callback and
 * returning it's content
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param state Modifier state
 * @param callback Callback function to be invoked
 * @param methodState Optional Objectstate.
 */
function swapContext(parser, context, state, callback, methodState /* None */) {
    if ( methodState === void 0 ) methodState = 0;

    context &= ~(524288 /* Async */ | 1048576 /* Yield */);
    if (state & 1 /* Generator */)
        { context |= 1048576 /* Yield */; }
    if (state & 2 /* Await */)
        { context |= 524288 /* Async */; }
    return callback(parser, context, methodState);
}
/**
 * Return the next codepoint in the stream
 *
 * @param parser Parser instance
 */
function hasNext(parser) {
    return parser.index < parser.source.length;
}
function advance(parser) {
    parser.index++;
    parser.column++;
}
function advanceOnMaybeAstral(parser, ch) {
    advance(parser);
    if (ch > 0xFFFF)
        { parser.index++; }
}
/**
 * Return the next codepoint in the stream by index
 *
 * @param parser Parser instance
 */
function nextChar(parser) {
    return parser.source.charCodeAt(parser.index);
}
/**
 * Return the next unicodechar in the stream
 *
 * @param parser Parser instance
 */
function nextUnicodeChar(parser) {
    var index = parser.index;
    var hi = parser.source.charCodeAt(index);
    if (hi < 55296 /* LeadSurrogateMin */ || hi > 56319 /* LeadSurrogateMax */)
        { return hi; }
    var lo = parser.source.charCodeAt(index + 1);
    if (lo < 56320 /* TrailSurrogateMin */ || lo > 57343 /* TrailSurrogateMax */)
        { return hi; }
    return 65536 /* NonBMPMin */ + ((hi & 0x3FF) << 10) | lo & 0x3FF;
}
/**
 * Validates function params
 *
 * Note! In case anyone want to enable full scoping, replace 'paramSet' with an similiar
 * object on the parser object itself. Then push / set the tokenValue to
 * it an use an bitmask to mark it as an 'variable' not 'blockscope'. Then when
 * implementing lexical scoping, you can use that for validation.
 *
 * @param parser  Parser instance
 * @param context Context masks
 * @param params Array of token values
 */
function validateParams(parser, context, params) {
    var paramSet = new Map();
    for (var i = 0; i < params.length; i++) {
        var key = '@' + params[i];
        if (paramSet.get(key)) {
            tolerant(parser, context, 85 /* ParamDupe */);
        }
        else
            { paramSet.set(key, true); }
    }
}
/**
 * Reinterpret various expressions as pattern
 * This Is only used for assignment and arrow parameter list
 *
 * @param parser  Parser instance
 * @param context Context masks
 * @param node AST node
 */
var reinterpret = function (parser, context, node) {
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
            for (var i = 0; i < node.elements.length; ++i) {
                // skip holes in pattern
                if (node.elements[i] !== null) {
                    reinterpret(parser, context, node.elements[i]);
                }
            }
            return;
        case 'ObjectExpression':
            node.type = 'ObjectPattern';
            for (var i$1 = 0; i$1 < node.properties.length; i$1++) {
                reinterpret(parser, context, node.properties[i$1]);
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
                tolerant(parser, context, 74 /* RestDefaultInitializer */);
            }
            reinterpret(parser, context, node.argument);
            break;
        case 'AssignmentExpression':
            node.type = 'AssignmentPattern';
            delete node.operator; // operator is not relevant for assignment pattern
            reinterpret(parser, context, node.left); // recursive descent
            return;
        case 'MemberExpression':
            if (!(context & 2097152 /* InParameter */))
                { return; }
        // Fall through
        default:
            tolerant(parser, context, context & 2097152 /* InParameter */ ? 80 /* NotBindable */ : 76 /* InvalidDestructuringTarget */, node.type);
    }
};
function advanceAndOrSkipUC(parser) {
    var hi = parser.source.charCodeAt(parser.index++);
    var code = hi;
    if (hi >= 0xd800 && hi <= 0xdbff && hasNext(parser)) {
        var lo = parser.source.charCodeAt(parser.index);
        if (lo >= 0xdc00 && lo <= 0xdfff) {
            code = (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
            parser.index++;
        }
    }
    parser.column++;
    return code;
}
function consumeOpt(parser, code) {
    if (parser.source.charCodeAt(parser.index) !== code)
        { return false; }
    parser.index++;
    parser.column++;
    return true;
}
function consumeLineFeed(parser, state) {
    parser.flags |= 1 /* NewLine */;
    parser.index++;
    if ((state & 4 /* LastIsCR */) === 0) {
        parser.column = 0;
        parser.line++;
    }
}
function advanceNewline(parser) {
    parser.flags |= 1 /* NewLine */;
    parser.index++;
    parser.column = 0;
    parser.line++;
}
var fromCodePoint = function (code) {
    return code <= 0xFFFF ?
        String.fromCharCode(code) :
        String.fromCharCode(((code - 65536 /* NonBMPMin */) >> 10) +
            55296 /* LeadSurrogateMin */, ((code - 65536 /* NonBMPMin */) & (1024 - 1)) + 56320 /* TrailSurrogateMin */);
};
function toHex(code) {
    if (code < 48 /* Zero */)
        { return -1; }
    if (code <= 57 /* Nine */)
        { return code - 48 /* Zero */; }
    if (code < 65 /* UpperA */)
        { return -1; }
    if (code <= 70 /* UpperF */)
        { return code - 65 /* UpperA */ + 10; }
    if (code < 97 /* LowerA */)
        { return -1; }
    if (code <= 102 /* LowerF */)
        { return code - 97 /* LowerA */ + 10; }
    return -1;
}
function storeRaw(parser, start) {
    parser.tokenRaw = parser.source.slice(start, parser.index);
}
function lookahead(parser, context, callback) {
    var savePos = parser.index;
    var tokenValue = parser.tokenValue;
    var flags = parser.flags;
    var line = parser.line;
    var column = parser.column;
    var startColumn = parser.startColumn;
    var lastColumn = parser.lastColumn;
    var startLine = parser.startLine;
    var lastLine = parser.lastLine;
    var lastIndex = parser.lastIndex;
    var startIndex = parser.startIndex;
    var tokenRaw = parser.tokenRaw;
    var token = parser.token;
    var lastValue = parser.lastValue;
    var tokenRegExp = parser.tokenRegExp;
    var res = callback(parser, context);
    parser.index = savePos;
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
function escapeForPrinting(code) {
    switch (code) {
        case 0 /* Null */:
            return '\\0';
        case 8 /* Backspace */:
            return '\\b';
        case 9 /* Tab */:
            return '\\t';
        case 10 /* LineFeed */:
            return '\\n';
        case 11 /* VerticalTab */:
            return '\\v';
        case 12 /* FormFeed */:
            return '\\f';
        case 13 /* CarriageReturn */:
            return '\\r';
        default:
            if (!mustEscape(code))
                { return fromCodePoint(code); }
            if (code < 0x10)
                { return ("\\x0" + (code.toString(16))); }
            if (code < 0x100)
                { return ("\\x" + (code.toString(16))); }
            if (code < 0x1000)
                { return ("\\u0" + (code.toString(16))); }
            if (code < 0x10000)
                { return ("\\u" + (code.toString(16))); }
            return ("\\u{" + (code.toString(16)) + "}");
    }
}
function isValidSimpleAssignmentTarget(node) {
    if (node.type === 'Identifier' || node.type === 'MemberExpression') {
        return true;
    }
    return false;
}
function getLocation(parser) {
    return {
        line: parser.startLine,
        column: parser.startColumn,
        index: parser.startIndex,
    };
}
function isIdentifier(context, t) {
    if (context & 16384 /* Strict */) {
        if (context & 32768 /* Module */ && t & 2097152 /* IsAwait */)
            { return false; }
        if (t & 1048576 /* IsYield */)
            { return false; }
        return (t & 67108864 /* IsIdentifier */) === 67108864 /* IsIdentifier */ ||
            (t & 9216 /* Contextual */) === 9216 /* Contextual */;
    }
    return (t & 67108864 /* IsIdentifier */) === 67108864 /* IsIdentifier */ ||
        (t & 9216 /* Contextual */) === 9216 /* Contextual */ ||
        (t & 5120 /* FutureReserved */) === 5120 /* FutureReserved */;
}
function isLexical(parser, context) {
    nextToken(parser, context);
    var token = parser.token;
    return !!(token & (67108864 /* IsIdentifier */ | 16777216 /* IsBindingPattern */ | 1048576 /* IsYield */ | 2097152 /* IsAwait */) ||
        token === 21576 /* LetKeyword */ ||
        (token & 9216 /* Contextual */) === 9216 /* Contextual */);
}
function isEndOfCaseOrDefaultClauses(parser) {
    return parser.token === 3152 /* DefaultKeyword */ ||
        parser.token === 301990415 /* RightBrace */ ||
        parser.token === 3147 /* CaseKeyword */;
}
function nextTokenIsLeftParenOrPeriod(parser, context) {
    nextToken(parser, context);
    return parser.token === 33570827 /* LeftParen */ || parser.token === 33554445 /* Period */;
}
function nextTokenisIdentifierOrParen(parser, context) {
    nextToken(parser, context);
    var token = parser.token;
    var flags = parser.flags;
    return token & (67108864 /* IsIdentifier */ | 1048576 /* IsYield */) || token === 33570827 /* LeftParen */;
}
function nextTokenIsLeftParen(parser, context) {
    nextToken(parser, context);
    return parser.token === 33570827 /* LeftParen */ || parser.token === 16793619 /* LeftBracket */;
}
function nextTokenIsFuncKeywordOnSameLine(parser, context) {
    nextToken(parser, context);
    return !(parser.flags & 1 /* NewLine */) && parser.token === 19544 /* FunctionKeyword */;
}
function isPropertyWithPrivateFieldKey(context, expr) {
    if (!expr.property)
        { return false; }
    return expr.property.type === 'PrivateName';
}
var isPrologueDirective = function (node) { return node.type === 'ExpressionStatement' && node.expression.type === 'Literal'; };
function parseAndDisallowDestructuringAndBinding(parser, context, callback) {
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    return callback(parser, context);
}
function parseAndValidateIdentifier(parser, context) {
    var token = parser.token;
    if (context & 16384 /* Strict */) {
        // Module code is also "strict mode code"
        if (context & 32768 /* Module */ && token & 2097152 /* IsAwait */) {
            tolerant(parser, context, 39 /* DisallowedInContext */, tokenDesc(token));
        }
        if (token & 1048576 /* IsYield */)
            { tolerant(parser, context, 39 /* DisallowedInContext */, tokenDesc(token)); }
        if ((token & 67108864 /* IsIdentifier */) === 67108864 /* IsIdentifier */ ||
            (token & 9216 /* Contextual */) === 9216 /* Contextual */) {
            return parseIdentifier(parser, context);
        }
        report(parser, 1 /* UnexpectedToken */, tokenDesc(token));
    }
    if (context & 1048576 /* Yield */ && token & 1048576 /* IsYield */) {
        tolerant(parser, context, 39 /* DisallowedInContext */, tokenDesc(token));
    }
    else if (context & 524288 /* Async */ && token & 2097152 /* IsAwait */) {
        tolerant(parser, context, 39 /* DisallowedInContext */, tokenDesc(token));
    }
    if ((token & 67108864 /* IsIdentifier */) === 67108864 /* IsIdentifier */ ||
        (token & 9216 /* Contextual */) === 9216 /* Contextual */ ||
        (token & 5120 /* FutureReserved */) === 5120 /* FutureReserved */) {
        return parseIdentifier(parser, context);
    }
    report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token));
}
// https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
function parseDirective(parser, context) {
    var pos = getLocation(parser);
    var directive = parser.tokenRaw.slice(1, -1);
    var expr = parseExpression(parser, context | 262144 /* AllowIn */);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ExpressionStatement',
        expression: expr,
        directive: directive
    });
}
function isEvalOrArguments(value) {
    return value === 'eval' || value === 'arguments';
}
function recordError(parser) {
    parser.errorLocation = {
        line: parser.line,
        column: parser.column,
        index: parser.index,
    };
}
function readNext(parser, prev) {
    advance(parser);
    if (!hasNext(parser))
        { report(parser, 12 /* UnicodeOutOfRange */); }
    return nextUnicodeChar(parser);
}

// 11.4 Comments
/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param parser Parser instance
 * @param state  Scanner state
 */
function skipSingleLineComment(parser, context, state, type) {
    var start = parser.index;
    scan: while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case 13 /* CarriageReturn */:
                advanceNewline(parser);
                if (hasNext(parser) && nextChar(parser) === 10 /* LineFeed */) {
                    parser.index++;
                }
                break scan;
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                advanceNewline(parser);
                break scan;
            default:
                advanceAndOrSkipUC(parser);
        }
    }
    if (context & (512 /* OptionsComments */ | context & 32 /* OptionsDelegate */)) {
        addComment(parser, context, type, state, start);
    }
    return state;
}
/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param parser
 * @param state
 */
function skipMultiLineComment(parser, context, state) {
    var start = parser.index;
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case 42 /* Asterisk */:
                advance(parser);
                state &= ~4 /* LastIsCR */;
                if (consumeOpt(parser, 47 /* Slash */)) {
                    if (context & (512 /* OptionsComments */ | context & 32 /* OptionsDelegate */)) {
                        addComment(parser, context, 'Multiline', state, start);
                    }
                    return state;
                }
                break;
            // Mark multiline comments containing linebreaks as new lines
            // so we can perfectly handle edge cases like: '1/*\n*/--> a comment'
            case 13 /* CarriageReturn */:
                state |= 1 /* NewLine */ | 4 /* LastIsCR */;
                advanceNewline(parser);
                break;
            case 10 /* LineFeed */:
                consumeLineFeed(parser, state);
                state = state & ~4 /* LastIsCR */ | 1 /* NewLine */;
                break;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                state = state & ~4 /* LastIsCR */ | 1 /* NewLine */;
                advanceNewline(parser);
                break;
            default:
                state &= ~4 /* LastIsCR */;
                advanceAndOrSkipUC(parser);
        }
    }
    tolerant(parser, context, 6 /* UnterminatedComment */);
}
function addComment(parser, context, type, state, start) {
    var index = parser.index;
    var startIndex = parser.startIndex;
    var startLine = parser.startLine;
    var startColumn = parser.startColumn;
    var lastLine = parser.lastLine;
    var column = parser.column;
    var comment = {
        type: type,
        value: parser.source.slice(start, type === 'MultiLine' ? index - 2 : index),
        start: startIndex,
        end: index,
    };
    if (context & 16 /* OptionsLoc */) {
        comment.loc = {
            start: {
                line: startLine,
                column: startColumn,
            },
            end: {
                line: lastLine,
                column: column
            }
        };
    }
    if (context & 32 /* OptionsDelegate */) {
        parser.delegate(comment, startIndex, index);
    }
    parser.comments.push(comment);
}

/**
 * Scan
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-punctuatorss)
 * @see [Link](https://tc39.github.io/ecma262/#sec-names-and-keywords)
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function scan$1(parser, context) {
    parser.flags &= ~1 /* NewLine */;
    var lineStart = parser.index === 0;
    var state = 0;
    while (hasNext(parser)) {
        if (!lineStart) {
            parser.startIndex = parser.index;
            parser.startColumn = parser.column;
            parser.startLine = parser.line;
        }
        var first = nextChar(parser);
        if (first >= 128) {
            switch (first) {
                case 8232 /* LineSeparator */:
                case 8233 /* ParagraphSeparator */:
                    state = state & ~4 /* LastIsCR */ | 1 /* NewLine */;
                    advanceNewline(parser);
                    break;
                case 65519 /* ByteOrderMark */:
                case 160 /* NonBreakingSpace */:
                case 5760 /* Ogham */:
                case 8192 /* EnQuad */:
                case 8193 /* EmQuad */:
                case 8194 /* EnSpace */:
                case 8195 /* EmSpace */:
                case 8196 /* ThreePerEmSpace */:
                case 8197 /* FourPerEmSpace */:
                case 8198 /* SixPerEmSpace */:
                case 8199 /* FigureSpace */:
                case 8200 /* PunctuationSpace */:
                case 8201 /* ThinSpace */:
                case 8202 /* HairSpace */:
                case 8239 /* NarrowNoBreakSpace */:
                case 8287 /* MathematicalSpace */:
                case 12288 /* IdeographicSpace */:
                case 65279 /* ZeroWidthNoBreakSpace */:
                case 8204 /* ZeroWidthJoiner */:
                case 8205 /* ZeroWidthNonJoiner */:
                    state |= 2 /* SameLine */;
                    advance(parser);
                    break;
                default:
                    first = nextUnicodeChar(parser);
                    if (isValidIdentifierStart(first))
                        { return scanIdentifier(parser, context, first); }
                    report(parser, 8 /* UnexpectedChar */, escapeForPrinting(nextUnicodeChar(parser)));
            }
        }
        else {
            switch (first) {
                case 13 /* CarriageReturn */:
                    state |= 1 /* NewLine */ | 4 /* LastIsCR */;
                    advanceNewline(parser);
                    break;
                case 10 /* LineFeed */:
                    consumeLineFeed(parser, state);
                    state = state & ~4 /* LastIsCR */ | 1 /* NewLine */;
                    break;
                case 9 /* Tab */:
                case 11 /* VerticalTab */:
                case 12 /* FormFeed */:
                case 32 /* Space */:
                    state |= 2 /* SameLine */;
                    advance(parser);
                    break;
                // `/`, `/=`, `/>`
                case 47 /* Slash */:
                    {
                        advance(parser);
                        state |= 2 /* SameLine */;
                        if (!hasNext(parser))
                            { return 150069 /* Divide */; }
                        switch (nextChar(parser)) {
                            case 47 /* Slash */:
                                {
                                    advance(parser);
                                    state = skipSingleLineComment(parser, context, state, 'SingleLine');
                                    continue;
                                }
                            case 42 /* Asterisk */:
                                {
                                    advance(parser);
                                    state = skipMultiLineComment(parser, context, state);
                                    continue;
                                }
                            case 61 /* EqualSign */:
                                {
                                    advance(parser);
                                    return 81957 /* DivideAssign */;
                                }
                            default:
                                return 150069 /* Divide */;
                        }
                    }
                // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
                case 60 /* LessThan */:
                    advance(parser); // skip `<`
                    if (!(context & 32768 /* Module */) &&
                        consumeOpt(parser, 33 /* Exclamation */) &&
                        consumeOpt(parser, 45 /* Hyphen */) &&
                        consumeOpt(parser, 45 /* Hyphen */)) {
                        state = skipSingleLineComment(parser, context, state, 'HTMLOpen');
                        continue;
                    }
                    switch (nextChar(parser)) {
                        case 60 /* LessThan */:
                            advance(parser);
                            return consumeOpt(parser, 61 /* EqualSign */) ?
                                65566 /* ShiftLeftAssign */ :
                                149569 /* ShiftLeft */;
                        case 61 /* EqualSign */:
                            advance(parser);
                            return 149309 /* LessThanOrEqual */;
                        default: // ignore
                            return 149311 /* LessThan */;
                    }
                // `-`, `--`, `-=`
                case 45 /* Hyphen */:
                    {
                        advance(parser); // skip `-`
                        var next = nextChar(parser);
                        switch (next) {
                            case 45 /* Hyphen */:
                                {
                                    advance(parser);
                                    if ((state & 1 /* NewLine */ || lineStart) &&
                                        nextChar(parser) === 62 /* GreaterThan */) {
                                        if (!(context & 32768 /* Module */)) {
                                            advance(parser);
                                            state = skipSingleLineComment(parser, context, state, 'HTMLClose');
                                        }
                                        continue;
                                    }
                                    return 540700 /* Decrement */;
                                }
                            case 61 /* EqualSign */:
                                {
                                    advance(parser);
                                    return 65571 /* SubtractAssign */;
                                }
                            default:
                                return 411952 /* Subtract */;
                        }
                    }
                // `!`, `!=`, `!==`
                case 33 /* Exclamation */:
                    advance(parser);
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 278573 /* Negate */; }
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 149052 /* LooseNotEqual */; }
                    return 149050 /* StrictNotEqual */;
                // `'string'`, `"string"`
                case 39 /* SingleQuote */:
                case 34 /* DoubleQuote */:
                    return scanString(parser, context, first);
                // `%`, `%=`
                case 37 /* Percent */:
                    advance(parser);
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 150068 /* Modulo */; }
                    return 65574 /* ModuloAssign */;
                // `&`, `&&`, `&=`
                case 38 /* Ampersand */:
                    {
                        advance(parser);
                        var next$1 = nextChar(parser);
                        if (next$1 === 38 /* Ampersand */) {
                            advance(parser);
                            return 8536631 /* LogicalAnd */;
                        }
                        if (next$1 === 61 /* EqualSign */) {
                            advance(parser);
                            return 65577 /* BitwiseAndAssign */;
                        }
                        return 148804 /* BitwiseAnd */;
                    }
                // `*`, `**`, `*=`, `**=`
                case 42 /* Asterisk */:
                    {
                        advance(parser);
                        if (!hasNext(parser))
                            { return 150067 /* Multiply */; }
                        var next$2 = nextChar(parser);
                        if (next$2 === 61 /* EqualSign */) {
                            advance(parser);
                            return 65572 /* MultiplyAssign */;
                        }
                        if (next$2 !== 42 /* Asterisk */)
                            { return 150067 /* Multiply */; }
                        advance(parser);
                        if (!consumeOpt(parser, 61 /* EqualSign */))
                            { return 150326 /* Exponentiate */; }
                        return 65569 /* ExponentiateAssign */;
                    }
                // `+`, `++`, `+=`
                case 43 /* Plus */:
                    {
                        advance(parser);
                        if (!hasNext(parser))
                            { return 411951 /* Add */; }
                        var next$3 = nextChar(parser);
                        if (next$3 === 43 /* Plus */) {
                            advance(parser);
                            return 540699 /* Increment */;
                        }
                        if (next$3 === 61 /* EqualSign */) {
                            advance(parser);
                            return 65570 /* AddAssign */;
                        }
                        return 411951 /* Add */;
                    }
                // `.`, `...`, `.123` (numeric literal)
                case 46 /* Period */:
                    {
                        var index = parser.index + 1;
                        var next$4 = parser.source.charCodeAt(index);
                        if (next$4 >= 48 /* Zero */ && next$4 <= 57 /* Nine */) {
                            scanNumericLiteral(parser, context, 4 /* Float */);
                            return 16386 /* NumericLiteral */;
                        }
                        else if (next$4 === 46 /* Period */) {
                            index++;
                            if (index < parser.source.length &&
                                parser.source.charCodeAt(index) === 46 /* Period */) {
                                parser.index = index + 1;
                                parser.column += 3;
                                return 14 /* Ellipsis */;
                            }
                        }
                        advance(parser);
                        return 33554445 /* Period */;
                    }
                // `0`...`9`
                case 48 /* Zero */:
                    {
                        advance(parser);
                        switch (nextChar(parser)) {
                            // Hex number - '0x', '0X'
                            case 88 /* UpperX */:
                            case 120 /* LowerX */:
                                return scanHexIntegerLiteral(parser, context);
                            // Binary number - '0b', '0B'
                            case 66 /* UpperB */:
                            case 98 /* LowerB */:
                                return scanOctalOrBinary(parser, context, 2);
                            // Octal number - '0o', '0O'
                            case 79 /* UpperO */:
                            case 111 /* LowerO */:
                                return scanOctalOrBinary(parser, context, 8);
                            default:
                                // Implicit octal digits startign with '0'
                                return scanImplicitOctalDigits(parser, context);
                        }
                    }
                case 49 /* One */:
                case 50 /* Two */:
                case 51 /* Three */:
                case 52 /* Four */:
                case 53 /* Five */:
                case 54 /* Six */:
                case 55 /* Seven */:
                case 56 /* Eight */:
                case 57 /* Nine */:
                    return scanNumericLiteral(parser, context);
                // `#`
                case 35 /* Hash */:
                    {
                        advance(parser);
                        var index$1 = parser.index;
                        var next$5 = parser.source.charCodeAt(index$1);
                        if (context & 1024 /* OptionsShebang */ &&
                            lineStart &&
                            next$5 === 33 /* Exclamation */) {
                            parser.index = index$1 + 1;
                            skipSingleLineComment(parser, context, 0 /* None */, 'SheBang');
                            continue;
                        }
                        return scanPrivateName(parser, context);
                    }
                // `(`
                case 40 /* LeftParen */:
                    advance(parser);
                    return 33570827 /* LeftParen */;
                // `)`
                case 41 /* RightParen */:
                    advance(parser);
                    return 16 /* RightParen */;
                // `,`
                case 44 /* Comma */:
                    advance(parser);
                    return 33554450 /* Comma */;
                // `:`
                case 58 /* Colon */:
                    advance(parser);
                    return 33554453 /* Colon */;
                // `@`
                case 64 /* At */:
                    advance(parser);
                    return 120 /* At */;
                // `;`
                case 59 /* Semicolon */:
                    advance(parser);
                    return 301990417 /* Semicolon */;
                // `?`
                case 63 /* QuestionMark */:
                    advance(parser);
                    return 22 /* QuestionMark */;
                // `]`
                case 93 /* RightBracket */:
                    advance(parser);
                    return 20 /* RightBracket */;
                // `{`
                case 123 /* LeftBrace */:
                    advance(parser);
                    return 16793612 /* LeftBrace */;
                // `}`
                case 125 /* RightBrace */:
                    advance(parser);
                    return 301990415 /* RightBrace */;
                // `~`
                case 126 /* Tilde */:
                    advance(parser);
                    return 278574 /* Complement */;
                // `=`, `==`, `===`, `=>`
                case 61 /* EqualSign */:
                    {
                        advance(parser);
                        var next$6 = nextChar(parser);
                        if (next$6 === 61 /* EqualSign */) {
                            advance(parser);
                            if (consumeOpt(parser, 61 /* EqualSign */)) {
                                return 149049 /* StrictEqual */;
                            }
                            else {
                                return 149051 /* LooseEqual */;
                            }
                        }
                        else if (next$6 === 62 /* GreaterThan */) {
                            advance(parser);
                            return 10 /* Arrow */;
                        }
                        return 33620509 /* Assign */;
                    }
                // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
                case 62 /* GreaterThan */:
                    {
                        advance(parser);
                        if (!hasNext(parser))
                            { return 149312 /* GreaterThan */; }
                        var next$7 = nextChar(parser);
                        if (next$7 === 61 /* EqualSign */) {
                            advance(parser);
                            return 149310 /* GreaterThanOrEqual */;
                        }
                        if (next$7 !== 62 /* GreaterThan */)
                            { return 149312 /* GreaterThan */; }
                        advance(parser);
                        next$7 = nextChar(parser);
                        if (next$7 === 62 /* GreaterThan */) {
                            advance(parser);
                            if (consumeOpt(parser, 61 /* EqualSign */)) {
                                return 65568 /* LogicalShiftRightAssign */;
                            }
                            else {
                                return 149571 /* LogicalShiftRight */;
                            }
                        }
                        else if (next$7 === 61 /* EqualSign */) {
                            advance(parser);
                            return 65567 /* ShiftRightAssign */;
                        }
                        return 149570 /* ShiftRight */;
                    }
                // `[`
                case 91 /* LeftBracket */:
                    advance(parser);
                    return 16793619 /* LeftBracket */;
                // `\\u{N}var`
                case 92 /* Backslash */:
                    return scanIdentifier(parser, context);
                // `^`, `^=`
                case 94 /* Caret */:
                    advance(parser);
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 148550 /* BitwiseXor */; }
                    return 65575 /* BitwiseXorAssign */;
                // ``string``
                case 96 /* Backtick */:
                    return scanTemplate(parser, context, first);
                // `|`, `||`, `|=`
                case 124 /* VerticalBar */:
                    {
                        advance(parser);
                        var next$8 = nextChar(parser);
                        if (next$8 === 124 /* VerticalBar */) {
                            advance(parser);
                            return 8536376 /* LogicalOr */;
                        }
                        else if (next$8 === 61 /* EqualSign */) {
                            advance(parser);
                            return 65576 /* BitwiseOrAssign */;
                        }
                        return 148293 /* BitwiseOr */;
                    }
                // `a`...`z`, `A`...`Z`, `_var`, `$var`
                case 65 /* UpperA */:
                case 66 /* UpperB */:
                case 67 /* UpperC */:
                case 68 /* UpperD */:
                case 69 /* UpperE */:
                case 70 /* UpperF */:
                case 71 /* UpperG */:
                case 72 /* UpperH */:
                case 73 /* UpperI */:
                case 74 /* UpperJ */:
                case 75 /* UpperK */:
                case 76 /* UpperL */:
                case 77 /* UpperM */:
                case 78 /* UpperN */:
                case 79 /* UpperO */:
                case 80 /* UpperP */:
                case 81 /* UpperQ */:
                case 82 /* UpperR */:
                case 83 /* UpperS */:
                case 84 /* UpperT */:
                case 85 /* UpperU */:
                case 86 /* UpperV */:
                case 87 /* UpperW */:
                case 88 /* UpperX */:
                case 89 /* UpperY */:
                case 90 /* UpperZ */:
                case 36 /* Dollar */:
                case 95 /* Underscore */:
                case 97 /* LowerA */:
                case 98 /* LowerB */:
                case 99 /* LowerC */:
                case 100 /* LowerD */:
                case 101 /* LowerE */:
                case 102 /* LowerF */:
                case 103 /* LowerG */:
                case 104 /* LowerH */:
                case 105 /* LowerI */:
                case 106 /* LowerJ */:
                case 107 /* LowerK */:
                case 108 /* LowerL */:
                case 109 /* LowerM */:
                case 110 /* LowerN */:
                case 111 /* LowerO */:
                case 112 /* LowerP */:
                case 113 /* LowerQ */:
                case 114 /* LowerR */:
                case 115 /* LowerS */:
                case 116 /* LowerT */:
                case 117 /* LowerU */:
                case 118 /* LowerV */:
                case 119 /* LowerW */:
                case 120 /* LowerX */:
                case 121 /* LowerY */:
                case 122 /* LowerZ */:
                    return scanIdentifier(parser, context, first);
                default:
                    first = nextChar(parser);
                    if (isValidIdentifierStart(first))
                        { return scanIdentifier(parser, context, first); }
                    report(parser, 8 /* UnexpectedChar */, escapeForPrinting(nextUnicodeChar(parser)));
            }
        }
    }
    return 268435456 /* EndOfSource */;
}
// 11.8.3 Numeric Literals
/**
 * Scans hex integer literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-HexIntegerLiteral)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanHexIntegerLiteral(parser, context) {
    advance(parser);
    var state = 0;
    var value = toHex(nextChar(parser));
    if (value < 0)
        { report(parser, 0 /* Unexpected */); }
    advance(parser);
    while (hasNext(parser)) {
        var next = nextChar(parser);
        if (context & 1 /* OptionsNext */ && next === 95 /* Underscore */) {
            state = scanNumericSeparator(parser, state);
            continue;
        }
        state &= ~1 /* SeenSeparator */;
        var digit = toHex(next);
        if (digit < 0)
            { break; }
        value = value * 16 + digit;
        advance(parser);
    }
    if (state & 1 /* SeenSeparator */)
        { report(parser, 59 /* TrailingNumericSeparator */); }
    return assembleNumericLiteral(parser, context, value, consumeOpt(parser, 110 /* LowerN */));
}
/**
 * Scans binary and octal integer literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-OctalIntegerLiteral)
 * @see [Link](https://tc39.github.io/ecma262/#prod-BinaryIntegerLiteral)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanOctalOrBinary(parser, context, base) {
    advance(parser);
    var digits = 0;
    var ch;
    var value = 0;
    var state = 0;
    while (hasNext(parser)) {
        ch = nextChar(parser);
        if (context & 1 /* OptionsNext */ && ch === 95 /* Underscore */) {
            state = scanNumericSeparator(parser, state);
            continue;
        }
        state &= ~1 /* SeenSeparator */;
        var converted = ch - 48;
        if (!(ch >= 48 /* Zero */ && ch <= 57 /* Nine */) || converted >= base)
            { break; }
        value = value * base + converted;
        advance(parser);
        digits++;
    }
    if (digits === 0)
        { report(parser, 62 /* InvalidOrUnexpectedToken */); }
    if (state & 1 /* SeenSeparator */)
        { report(parser, 59 /* TrailingNumericSeparator */); }
    return assembleNumericLiteral(parser, context, value, consumeOpt(parser, 110 /* LowerN */));
}
/**
 * Scans implicit octal digits
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-OctalDigits)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanImplicitOctalDigits(parser, context) {
    switch (nextChar(parser)) {
        case 48 /* Zero */:
        case 49 /* One */:
        case 50 /* Two */:
        case 51 /* Three */:
        case 52 /* Four */:
        case 53 /* Five */:
        case 54 /* Six */:
        case 55 /* Seven */:
            {
                if (context & 16384 /* Strict */)
                    { report(parser, 0 /* Unexpected */); }
                var index = parser.index;
                var column = parser.column;
                var code = 0;
                parser.flags |= 128 /* Octal */;
                // Implicit octal, unless there is a non-octal digit.
                // (Annex B.1.1 on Numeric Literals)
                while (index < parser.source.length) {
                    var next = parser.source.charCodeAt(index);
                    if (next === 95 /* Underscore */) {
                        report(parser, 60 /* ZeroDigitNumericSeparator */);
                    }
                    else if (next < 48 /* Zero */ || next > 55 /* Seven */) {
                        return scanNumericLiteral(parser, context);
                    }
                    else {
                        code = code * 8 + (next - 48 /* Zero */);
                        index++;
                        column++;
                    }
                }
                parser.index = index;
                parser.column = column;
                return assembleNumericLiteral(parser, context, code, consumeOpt(parser, 110 /* LowerN */));
            }
        case 56 /* Eight */:
        case 57 /* Nine */:
            parser.flags |= 128 /* Octal */;
        default:
            if (context & 1 /* OptionsNext */ && nextChar(parser) === 95 /* Underscore */) {
                report(parser, 60 /* ZeroDigitNumericSeparator */);
            }
            return scanNumericLiteral(parser, context);
    }
}
/**
 * Scans signed integer
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SignedInteger)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanSignedInteger(parser, context, end) {
    var next = nextChar(parser);
    if (next === 43 /* Plus */ || next === 45 /* Hyphen */) {
        advance(parser);
        next = nextChar(parser);
    }
    if (!(next >= 48 /* Zero */ && next <= 57 /* Nine */)) {
        report(parser, 62 /* InvalidOrUnexpectedToken */);
    }
    var preNumericPart = parser.index;
    var finalFragment = scanDecimalDigitsOrSeparator(parser, context);
    return parser.source.substring(end, preNumericPart) + finalFragment;
}
/**
 * Scans numeric literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NumericLiteral)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanNumericLiteral(parser, context, state /* None */) {
    if ( state === void 0 ) state = 0;

    var value = state & 4 /* Float */ ?
        0 :
        scanDecimalAsSmi(parser, context);
    var next = nextChar(parser);
    // I know I'm causing a bug here. The question is - will anyone figure this out?
    if (next !== 46 /* Period */ && next !== 46 /* Period */ && !isValidIdentifierStart(next)) {
        return assembleNumericLiteral(parser, context, value);
    }
    if (consumeOpt(parser, 46 /* Period */)) {
        if (context & 1 /* OptionsNext */ && nextChar(parser) === 95 /* Underscore */) {
            report(parser, 60 /* ZeroDigitNumericSeparator */);
        }
        state |= 4 /* Float */;
        value = value + '.' + scanDecimalDigitsOrSeparator(parser, context);
    }
    var end = parser.index;
    if (consumeOpt(parser, 110 /* LowerN */)) {
        if (state & 4 /* Float */)
            { report(parser, 0 /* Unexpected */); }
        state |= 8 /* BigInt */;
    }
    if (consumeOpt(parser, 101 /* LowerE */) || consumeOpt(parser, 69 /* UpperE */)) {
        state |= 4 /* Float */;
        value += scanSignedInteger(parser, context, end);
    }
    if (isValidIdentifierStart(nextChar(parser))) {
        report(parser, 0 /* Unexpected */);
    }
    return assembleNumericLiteral(parser, context, state & 4 /* Float */ ? parseFloat(value) : parseInt(value, 10), !!(state & 8 /* BigInt */));
}
/**
 * Internal helper function for scanning numeric separators.
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 * @param {state} NumericState state
 */
function scanNumericSeparator(parser, state) {
    advance(parser);
    if (state & 1 /* SeenSeparator */)
        { report(parser, 59 /* TrailingNumericSeparator */); }
    state |= 1 /* SeenSeparator */;
    return state;
}
/**
 * Internal helper function that scans numeric values
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanDecimalDigitsOrSeparator(parser, context) {
    var start = parser.index;
    var state = 0;
    var ret = '';
    loop: while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case 95 /* Underscore */:
                var preUnderscoreIndex = parser.index;
                state = scanNumericSeparator(parser, state);
                ret += parser.source.substring(start, preUnderscoreIndex);
                start = parser.index;
                continue;
            case 48 /* Zero */:
            case 49 /* One */:
            case 50 /* Two */:
            case 51 /* Three */:
            case 52 /* Four */:
            case 53 /* Five */:
            case 54 /* Six */:
            case 55 /* Seven */:
            case 56 /* Eight */:
            case 57 /* Nine */:
                state = state & ~1 /* SeenSeparator */;
                advance(parser);
                break;
            default:
                break loop;
        }
    }
    if (state & 1 /* SeenSeparator */)
        { report(parser, 59 /* TrailingNumericSeparator */); }
    return ret + parser.source.substring(start, parser.index);
}
/**
 * Internal helper function that scans numeric values
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanDecimalAsSmi(parser, context) {
    var state = 0;
    var value = 0;
    var next = nextChar(parser);
    while (next >= 48 /* Zero */ && next <= 57 /* Nine */ || next === 95 /* Underscore */) {
        if (context & 1 /* OptionsNext */ && next === 95 /* Underscore */) {
            state = scanNumericSeparator(parser, state);
            next = nextChar(parser);
            continue;
        }
        state &= ~1 /* SeenSeparator */;
        value = value * 10 + (next - 48 /* Zero */);
        advance(parser);
        next = nextChar(parser);
    }
    if (state & 1 /* SeenSeparator */)
        { report(parser, 59 /* TrailingNumericSeparator */); }
    return value;
}
/**
 * Internal helper function that assamble the number scanning parts and return
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 * @param {value} The numeric value
 */
function assembleNumericLiteral(parser, context, value, isBigInt) {
    if ( isBigInt === void 0 ) isBigInt = false;

    parser.tokenValue = value;
    if (context & 8 /* OptionsRaw */)
        { storeRaw(parser, parser.startIndex); }
    return isBigInt ? 16503 /* BigIntLiteral */ : 16386 /* NumericLiteral */;
}
/**
 * Scan identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-names-and-keywords)
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanIdentifier(parser, context, first) {
    var start = parser.index;
    var ret = '';
    if (first)
        { advanceOnMaybeAstral(parser, first); }
    loop: while (hasNext(parser)) {
        var index = parser.index;
        var ch = parser.source.charCodeAt(index);
        switch (ch) {
            case 92 /* Backslash */:
                ret += parser.source.slice(start, index);
                ret += scanUnicodeCodePointEscape(parser, context);
                start = parser.index;
                break;
            default:
                if (ch >= 0xD800 && ch <= 0xDBFF) {
                    var lo = parser.source.charCodeAt(index + 1);
                    ch = (ch & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
                }
                if (!isIdentifierPart(ch))
                    { break loop; }
                advanceOnMaybeAstral(parser, ch);
        }
    }
    if (start < parser.index)
        { ret += parser.source.slice(start, parser.index); }
    parser.tokenValue = ret;
    var len = ret.length;
    // Keywords are between 2 and 11 characters long and start with a lowercase letter
    // https://tc39.github.io/ecma262/#sec-keywords
    if (len >= 2 && len <= 11) {
        var token = descKeyword(ret);
        if (token > 0)
            { return token; }
    }
    if (context & 2048 /* OptionsRawidentifiers */)
        { storeRaw(parser, start); }
    return 67125249 /* Identifier */;
}
/**
 * Scan unicode codepoint escape
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanUnicodeCodePointEscape(parser, context) {
    var index = parser.index;
    if (index + 5 < parser.source.length) {
        if (parser.source.charCodeAt(index + 1) !== 117 /* LowerU */) {
            report(parser, 0 /* Unexpected */);
        }
        parser.index += 2;
        parser.column += 2;
        var code = scanIdentifierUnicodeEscape(parser);
        if (code >= 55296 /* LeadSurrogateMin */ && code <= 56319 /* LeadSurrogateMax */) {
            report(parser, 77 /* UnexpectedSurrogate */);
        }
        if (!isIdentifierPart(code)) {
            report(parser, 78 /* InvalidUnicodeEscapeSequence */);
        }
        return fromCodePoint(code);
    }
    report(parser, 0 /* Unexpected */);
}
/**
 * Scan identifier unicode escape
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanIdentifierUnicodeEscape(parser) {
    // Accept both \uxxxx and \u{xxxxxx}. In the latter case, the number of
    // hex digits between { } is arbitrary. \ and u have already been read.
    var ch = nextChar(parser);
    var codePoint = 0;
    // '\u{DDDDDDDD}'
    if (ch === 123 /* LeftBrace */) { // {
        ch = readNext(parser, ch);
        var digit = toHex(ch);
        while (digit >= 0) {
            codePoint = (codePoint << 4) | digit;
            if (codePoint > 1114111 /* LastUnicodeChar */) {
                report(parser, 0 /* Unexpected */);
            }
            advance(parser);
            digit = toHex(nextChar(parser));
        }
        if (nextChar(parser) !== 125 /* RightBrace */) {
            report(parser, 11 /* InvalidHexEscapeSequence */);
        }
        consumeOpt(parser, 125 /* RightBrace */);
        // '\uDDDD'
    }
    else {
        for (var i = 0; i < 4; i++) {
            ch = nextChar(parser);
            var digit$1 = toHex(ch);
            if (digit$1 < 0)
                { report(parser, 11 /* InvalidHexEscapeSequence */); }
            codePoint = (codePoint << 4) | digit$1;
            advance(parser);
        }
    }
    return codePoint;
}
/**
 * Scan escape sequence
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanEscapeSequence(parser, context, first) {
    switch (first) {
        case 98 /* LowerB */:
            return 8 /* Backspace */;
        case 102 /* LowerF */:
            return 12 /* FormFeed */;
        case 114 /* LowerR */:
            return 13 /* CarriageReturn */;
        case 110 /* LowerN */:
            return 10 /* LineFeed */;
        case 116 /* LowerT */:
            return 9 /* Tab */;
        case 118 /* LowerV */:
            return 11 /* VerticalTab */;
        case 13 /* CarriageReturn */:
        case 10 /* LineFeed */:
        case 8232 /* LineSeparator */:
        case 8233 /* ParagraphSeparator */:
            parser.column = -1;
            parser.line++;
            return -1 /* Empty */;
        case 48 /* Zero */:
        case 49 /* One */:
        case 50 /* Two */:
        case 51 /* Three */:
            {
                // 1 to 3 octal digits
                var code = first - 48;
                var index = parser.index + 1;
                var column = parser.column + 1;
                if (index < parser.source.length) {
                    var next = parser.source.charCodeAt(index);
                    if (next < 48 /* Zero */ || next > 55 /* Seven */) {
                        // Strict mode code allows only \0, then a non-digit.
                        if (code !== 0 || next === 56 /* Eight */ || next === 57 /* Nine */) {
                            if (context & 16384 /* Strict */)
                                { return -2 /* StrictOctal */; }
                            parser.flags |= 128 /* Octal */;
                        }
                    }
                    else if (context & 16384 /* Strict */) {
                        return -2 /* StrictOctal */;
                    }
                    else {
                        parser.lastValue = next;
                        code = code * 8 + (next - 48 /* Zero */);
                        index++;
                        column++;
                        if (index < parser.source.length) {
                            next = parser.source.charCodeAt(index);
                            if (next >= 48 /* Zero */ && next <= 55 /* Seven */) {
                                parser.lastValue = next;
                                code = code * 8 + (next - 48 /* Zero */);
                                index++;
                                column++;
                            }
                        }
                        parser.index = index - 1;
                        parser.column = column - 1;
                    }
                }
                return code;
            }
        case 52 /* Four */:
        case 53 /* Five */:
        case 54 /* Six */:
        case 55 /* Seven */:
            {
                // 1 to 2 octal digits
                if (context & 16384 /* Strict */)
                    { return -2 /* StrictOctal */; }
                var code$1 = first - 48;
                var index$1 = parser.index + 1;
                var column$1 = parser.column + 1;
                if (index$1 < parser.source.length) {
                    var next$1 = parser.source.charCodeAt(index$1);
                    if (next$1 >= 48 /* Zero */ && next$1 <= 55 /* Seven */) {
                        code$1 = code$1 * 8 + (next$1 - 48 /* Zero */);
                        parser.lastValue = next$1;
                        parser.index = index$1;
                        parser.column = column$1;
                    }
                }
                return code$1;
            }
        // `8`, `9` (invalid escapes)
        case 56 /* Eight */:
        case 57 /* Nine */:
            return -3 /* EightOrNine */;
        // ASCII escapes
        case 120 /* LowerX */:
            {
                var ch1 = parser.lastValue = readNext(parser, first);
                var hi = toHex(ch1);
                if (hi < 0)
                    { return -4 /* InvalidHex */; }
                var ch2 = parser.lastValue = readNext(parser, ch1);
                var lo = toHex(ch2);
                if (lo < 0)
                    { return -4 /* InvalidHex */; }
                return hi << 4 | lo;
            }
        // UCS-2/Unicode escapes
        case 117 /* LowerU */:
            {
                var ch = parser.lastValue = readNext(parser, first);
                if (ch === 123 /* LeftBrace */) {
                    ch = parser.lastValue = readNext(parser, ch);
                    var code$2 = toHex(ch);
                    if (code$2 < 0)
                        { return -4 /* InvalidHex */; }
                    ch = parser.lastValue = readNext(parser, ch);
                    while (ch !== 125 /* RightBrace */) {
                        var digit = toHex(ch);
                        if (digit < 0)
                            { return -4 /* InvalidHex */; }
                        code$2 = code$2 * 16 + digit;
                        // Code point out of bounds
                        if (code$2 > 1114111 /* LastUnicodeChar */)
                            { return -5 /* OutOfRange */; }
                        ch = parser.lastValue = readNext(parser, ch);
                    }
                    return code$2;
                }
                else {
                    // \uNNNN
                    var codePoint = toHex(ch);
                    if (codePoint < 0)
                        { return -4 /* InvalidHex */; }
                    for (var i = 0; i < 3; i++) {
                        ch = parser.lastValue = readNext(parser, ch);
                        var digit$1 = toHex(ch);
                        if (digit$1 < 0)
                            { return -4 /* InvalidHex */; }
                        codePoint = codePoint * 16 + digit$1;
                    }
                    return codePoint;
                }
            }
        default:
            return nextChar(parser);
    }
}
/**
 * Throws a string error for either string or template literal
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function throwStringError(parser, context, code) {
    switch (code) {
        case -1 /* Empty */:
            return;
        case -2 /* StrictOctal */:
            report(parser, context & 65536 /* TaggedTemplate */ ?
                79 /* TemplateOctalLiteral */ :
                9 /* StrictOctalEscape */);
        case -3 /* EightOrNine */:
            report(parser, 10 /* InvalidEightAndNine */);
        case -4 /* InvalidHex */:
            report(parser, 11 /* InvalidHexEscapeSequence */);
        case -5 /* OutOfRange */:
            report(parser, 12 /* UnicodeOutOfRange */);
        default:
        // ignore
    }
}
/**
 * Scan a string literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 * @param {context} quote codepoint
 */
function scanString(parser, context, quote) {
    var start = parser.index;
    var lastValue = parser.lastValue;
    var ret = '';
    var ch = readNext(parser, quote);
    while (ch !== quote) {
        switch (ch) {
            case 13 /* CarriageReturn */:
            case 10 /* LineFeed */:
                report(parser, 4 /* UnterminatedString */);
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                // Stage 3 proposal
                if (context & 1 /* OptionsNext */)
                    { advance(parser); }
                report(parser, 4 /* UnterminatedString */);
            case 92 /* Backslash */:
                ch = readNext(parser, ch);
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    parser.lastValue = ch;
                    var code = scanEscapeSequence(parser, context, ch);
                    if (code >= 0)
                        { ret += fromCodePoint(code); }
                    else
                        { throwStringError(parser, context, code); }
                    ch = parser.lastValue;
                }
                break;
            default:
                ret += fromCodePoint(ch);
        }
        ch = readNext(parser, ch);
    }
    advance(parser);
    storeRaw(parser, start);
    parser.tokenValue = ret;
    parser.lastValue = lastValue;
    return 16387 /* StringLiteral */;
}
/**
 * Scan looser template segment
 *
 * @param {Parser} Parser instance
 * @param {context} codepoint
 */
function scanLooserTemplateSegment(parser, ch) {
    while (ch !== 96 /* Backtick */) {
        if (ch === 36 /* Dollar */) {
            var index = parser.index + 1;
            if (index < parser.source.length &&
                parser.source.charCodeAt(index) === 123 /* LeftBrace */) {
                parser.index = index;
                parser.column++;
                return -ch;
            }
        }
        // Skip '\' and continue to scan the template token to search
        // for the end, without validating any escape sequences
        ch = readNext(parser, ch);
    }
    return ch;
}
/**
 * Consumes template brace
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function consumeTemplateBrace(parser, context) {
    if (!hasNext(parser))
        { report(parser, 7 /* UnterminatedTemplate */); }
    // Upon reaching a '}', consume it and rewind the scanner state
    parser.index--;
    parser.column--;
    return scanTemplate(parser, context, 125 /* RightBrace */);
}
/**
 * Scan template
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 * @param {first} Codepoint
 */
function scanTemplate(parser, context, first) {
    var start = parser.index;
    var lastValue = parser.lastValue;
    var tail = true;
    var ret = '';
    var ch = readNext(parser, first);
    loop: while (ch !== 96 /* Backtick */) {
        switch (ch) {
            // Break after a literal `${` (thus the dedicated code path).
            case 36 /* Dollar */:
                {
                    var index = parser.index + 1;
                    if (index < parser.source.length &&
                        parser.source.charCodeAt(index) === 123 /* LeftBrace */) {
                        parser.index = index;
                        parser.column++;
                        tail = false;
                        break loop;
                    }
                    ret += '$';
                    break;
                }
            case 92 /* Backslash */:
                ch = readNext(parser, ch);
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    parser.lastValue = ch;
                    // Because octals are forbidden in escaped template sequences and the fact that
                    // both string and template scanning uses the same method - 'scanEscapeSequence',
                    // we set the strict context mask.
                    var code = scanEscapeSequence(parser, context | 16384 /* Strict */, ch);
                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    }
                    else if (code !== -1 /* Empty */ && context & 65536 /* TaggedTemplate */) {
                        ret = undefined;
                        ch = scanLooserTemplateSegment(parser, parser.lastValue);
                        if (ch < 0) {
                            ch = -ch;
                            tail = false;
                        }
                        break loop;
                    }
                    else {
                        throwStringError(parser, context | 65536 /* TaggedTemplate */, code);
                    }
                    ch = parser.lastValue;
                }
                break;
            case 13 /* CarriageReturn */:
                if (hasNext(parser) && nextChar(parser) === 10 /* LineFeed */) {
                    if (ret != null)
                        { ret += fromCodePoint(ch); }
                    ch = nextChar(parser);
                    parser.index++;
                }
            // falls through
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                parser.column = -1;
                parser.line++;
            // falls through
            default:
                if (ret != null)
                    { ret += fromCodePoint(ch); }
        }
        ch = readNext(parser, ch);
    }
    advance(parser);
    parser.tokenValue = ret;
    parser.lastValue = lastValue;
    if (tail) {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 1);
        return 16393 /* TemplateTail */;
    }
    else {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 2);
        return 16392 /* TemplateCont */;
    }
}
function scanRegularExpression(parser, context) {
    var bodyStart = parser.index;
    var preparseState = 0;
    loop: while (true) {
        var ch = nextChar(parser);
        advance(parser);
        if (preparseState & 1 /* Escape */) {
            preparseState &= ~1 /* Escape */;
        }
        else {
            switch (ch) {
                case 47 /* Slash */:
                    if (!preparseState)
                        { break loop; }
                    else
                        { break; }
                case 92 /* Backslash */:
                    preparseState |= 1 /* Escape */;
                    break;
                case 91 /* LeftBracket */:
                    preparseState |= 2 /* Class */;
                    break;
                case 93 /* RightBracket */:
                    preparseState &= 1 /* Escape */;
                    break;
                case 13 /* CarriageReturn */:
                case 10 /* LineFeed */:
                case 8232 /* LineSeparator */:
                case 8233 /* ParagraphSeparator */:
                    report(parser, 5 /* UnterminatedRegExp */);
                default: // ignore
            }
        }
        if (!hasNext(parser)) {
            report(parser, 5 /* UnterminatedRegExp */);
        }
    }
    var bodyEnd = parser.index - 1;
    var mask = 0;
    var flagStart = parser.index;
    loop: while (hasNext(parser)) {
        var code = nextChar(parser);
        switch (code) {
            case 103 /* LowerG */:
                if (mask & 2 /* Global */)
                    { report(parser, 13 /* DuplicateRegExpFlag */, 'g'); }
                mask |= 2 /* Global */;
                break;
            case 105 /* LowerI */:
                if (mask & 1 /* IgnoreCase */)
                    { report(parser, 13 /* DuplicateRegExpFlag */, 'i'); }
                mask |= 1 /* IgnoreCase */;
                break;
            case 109 /* LowerM */:
                if (mask & 4 /* Multiline */)
                    { report(parser, 13 /* DuplicateRegExpFlag */, 'm'); }
                mask |= 4 /* Multiline */;
                break;
            case 117 /* LowerU */:
                if (mask & 8 /* Unicode */)
                    { report(parser, 13 /* DuplicateRegExpFlag */, 'u'); }
                mask |= 8 /* Unicode */;
                break;
            case 121 /* LowerY */:
                if (mask & 16 /* Sticky */)
                    { report(parser, 13 /* DuplicateRegExpFlag */, 'y'); }
                mask |= 16 /* Sticky */;
                break;
            case 115 /* LowerS */:
                if (mask & 32 /* DotAll */)
                    { report(parser, 13 /* DuplicateRegExpFlag */, 's'); }
                mask |= 32 /* DotAll */;
                break;
            default:
                if (!isIdentifierPart(code))
                    { break loop; }
                report(parser, 14 /* UnexpectedTokenRegExpFlag */, fromCodePoint(code));
        }
        advance(parser);
    }
    var flags = parser.source.slice(flagStart, parser.index);
    var pattern = parser.source.slice(bodyStart, bodyEnd);
    parser.tokenRegExp = { pattern: pattern, flags: flags };
    if (context & 8 /* OptionsRaw */)
        { storeRaw(parser, parser.startIndex); }
    parser.tokenValue = validate(parser, pattern, context, bodyStart, bodyEnd, !!(mask & 8 /* Unicode */), flags);
    return 16388 /* RegularExpression */;
}
/**
 * Validates regular expressions
 *
  *
 * @param parser Parser instance
 * @param context Context masks
 * @param start Start of regexp pattern to validate
 * @param end End of regexp pattern to validate
 * @param isUnicode True if unicode
 * @param flags Regexp flags
 */
function validate(parser, pattern, context, start, end, isUnicode, flags) {
    try {
        
    }
    catch (e) {
        report(parser, 5 /* UnterminatedRegExp */);
    }
    try {
        return new RegExp(pattern, flags);
    }
    catch (e) {
        return undefined;
    }
}

/**
 * Parse expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Expression)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseExpression(parser, context) {
    var pos = getLocation(parser);
    var expr = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    return parser.token === 33554450 /* Comma */ ?
        parseSequenceExpression(parser, context, expr, pos) :
        expr;
}
/**
 * Parse secuence expression
 *
 * @param Parser instance
 * @param Context masks
 */
function parseSequenceExpression(parser, context, left, pos) {
    var expressions = [left];
    while (consume(parser, context, 33554450 /* Comma */)) {
        expressions.push(parseExpressionCoverGrammar(parser, context, parseAssignmentExpression));
    }
    return finishNode(context, parser, pos, {
        type: 'SequenceExpression',
        expressions: expressions
    });
}
/**
 * Parse yield expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-YieldExpression)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseYieldExpression(parser, context, pos) {
    // https://tc39.github.io/ecma262/#sec-generator-function-definitions-static-semantics-early-errors
    if (context & 2097152 /* InParameter */)
        { tolerant(parser, context, 51 /* YieldInParameter */); }
    expect(parser, context, 1070186 /* YieldKeyword */);
    var argument = null;
    var delegate = false;
    if (!(parser.flags & 1 /* NewLine */)) {
        delegate = consume(parser, context, 150067 /* Multiply */);
        if (delegate || parser.token & 16384 /* IsExpressionStart */) {
            argument = parseAssignmentExpression(parser, context);
        }
    }
    return finishNode(context, parser, pos, {
        type: 'YieldExpression',
        argument: argument,
        delegate: delegate
    });
}
/**
 * Parse assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseAssignmentExpression(parser, context) {
    var pos = getLocation(parser);
    var token = parser.token;
    if (context & 1048576 /* Yield */ && token & 1048576 /* IsYield */)
        { return parseYieldExpression(parser, context, pos); }
    var isAsync = token & 4194304 /* IsAsync */ && lookahead(parser, context, nextTokenisIdentifierOrParen);
    var expr = isAsync ? parserCoverCallExpressionAndAsyncArrowHead(parser, context) : parseConditionalExpression(parser, context, pos);
    if (parser.token === 10 /* Arrow */) {
        if (token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
            if (token & (5120 /* FutureReserved */ | 134217728 /* IsEvalOrArguments */)) {
                if (context & 16384 /* Strict */) {
                    tolerant(parser, context, 47 /* StrictEvalArguments */);
                }
                parser.flags |= 64 /* StrictReserved */;
            }
            expr = [expr];
        }
        return parseArrowFunction(parser, context &= ~524288 /* Async */, pos, expr);
    }
    if (hasBit(parser.token, 65536 /* IsAssignOp */)) {
        token = parser.token;
        if (context & 16384 /* Strict */ && isEvalOrArguments(expr.name)) {
            tolerant(parser, context, 15 /* StrictLHSAssignment */);
        }
        else if (consume(parser, context, 33620509 /* Assign */)) {
            if (!(parser.flags & 4 /* AllowDestructuring */)) {
                tolerant(parser, context, 76 /* InvalidDestructuringTarget */);
            }
            // Only re-interpret if not inside a formal parameter list
            if (!(context & 2097152 /* InParameter */))
                { reinterpret(parser, context, expr); }
            if (context & 1073741824 /* InParen */)
                { parser.flags |= 8 /* SimpleParameterList */; }
            if (parser.token & 2097152 /* IsAwait */) {
                recordError(parser);
                parser.flags |= 16384 /* HasAwait */;
            }
            else if (context & 1073741824 /* InParen */ &&
                context & (16384 /* Strict */ | 1048576 /* Yield */) &&
                parser.token & 1048576 /* IsYield */) {
                recordError(parser);
                parser.flags |= 32768 /* HasYield */;
            }
        }
        else {
            if (!isValidSimpleAssignmentTarget(expr)) {
                tolerant(parser, context, 3 /* InvalidLHSInAssignment */);
            }
            parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
            nextToken(parser, context);
        }
        var right = parseExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentExpression);
        parser.pendingExpressionError = null;
        return finishNode(context, parser, pos, {
            type: 'AssignmentExpression',
            left: expr,
            operator: tokenDesc(token),
            right: right
        });
    }
    return expr;
}
/**
 * Parse conditional expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ConditionalExpression)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseConditionalExpression(parser, context, pos) {
    var test = parseBinaryExpression(parser, context, 0, pos);
    if (!consume(parser, context, 22 /* QuestionMark */))
        { return test; }
    var consequent = parseExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentExpression);
    expect(parser, context, 33554453 /* Colon */);
    return finishNode(context, parser, pos, {
        type: 'ConditionalExpression',
        test: test,
        consequent: consequent,
        alternate: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression)
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
 * @param parser Parser instance
 * @param context Context masks
 * @param minPrec Minimum precedence value
 * @param pos Line / Column info
 * @param Left Left hand side of the binary expression
 */
function parseBinaryExpression(parser, context, minPrec, pos, left) {
    if ( left === void 0 ) left = parseUnaryExpression(parser, context);

    // Shift-reduce parser for the binary operator part of the JS expression
    // syntax.
    var bit = context & 262144 /* AllowIn */ ^ 262144;
    if (!hasBit(parser.token, 147456 /* IsBinaryOp */))
        { return left; }
    while (hasBit(parser.token, 147456 /* IsBinaryOp */)) {
        var t = parser.token;
        if (bit && t === 537022257 /* InKeyword */)
            { break; }
        var prec = t & 3840;
        var delta = (t === 150326 /* Exponentiate */) << 8;
        // When the next token is no longer a binary operator, it's potentially the
        // start of an expression, so we break the loop
        if (prec + delta <= minPrec)
            { break; }
        nextToken(parser, context);
        left = finishNode(context, parser, pos, {
            type: t & 8388608 /* IsLogical */ ? 'LogicalExpression' : 'BinaryExpression',
            left: left,
            right: parseBinaryExpression(parser, context & ~262144 /* AllowIn */, prec, getLocation(parser)),
            operator: tokenDesc(t)
        });
    }
    return left;
}
/**
 * Parse await expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AwaitExpression)
 *
 * @param Parser instance
 * @param Context masks
 * @param {loc} pas Location info
 */
function parseAwaitExpression(parser, context, pos) {
    expect(parser, context, 69231725 /* AwaitKeyword */);
    return finishNode(context, parser, pos, {
        type: 'AwaitExpression',
        argument: parseUnaryExpression(parser, context)
    });
}
/**
 * Parses unary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UnaryExpression)
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function parseUnaryExpression(parser, context) {
    var pos = getLocation(parser);
    var token = parser.token;
    // Note: 'await' is an unary operator, but we keep it separate due to performance reasons
    if (context & 524288 /* Async */ && token === 69231725 /* AwaitKeyword */)
        { return parseAwaitExpression(parser, context, pos); }
    if (hasBit(token, 278528 /* IsUnaryOp */)) {
        token = parser.token;
        nextToken(parser, context);
        var argument = parseExpressionCoverGrammar(parser, context, parseUnaryExpression);
        if (parser.token === 150326 /* Exponentiate */) {
            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
        }
        if (context & 16384 /* Strict */ && token === 281643 /* DeleteKeyword */) {
            if (argument.type === 'Identifier') {
                tolerant(parser, context, 42 /* StrictDelete */);
            }
            else if (isPropertyWithPrivateFieldKey(context, argument)) {
                tolerant(parser, context, 43 /* DeletePrivateField */);
            }
        }
        return finishNode(context, parser, pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(token),
            argument: argument,
            prefix: true
        });
    }
    return parseUpdateExpression(parser, context, pos);
}
/**
 * Parses update expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
 *
 * @param Parser Parser instance
 * @param context Context masks
 */
function parseUpdateExpression(parser, context, pos) {
    var prefix = false;
    var operator;
    if (hasBit(parser.token, 540672 /* IsUpdateOp */)) {
        operator = parser.token;
        prefix = true;
        nextToken(parser, context);
    }
    var token = parser.token;
    var argument = parseLeftHandSideExpression(parser, context, pos);
    var isPostfix = !(parser.flags & 1 /* NewLine */) && hasBit(parser.token, 540672 /* IsUpdateOp */);
    if (!prefix && !isPostfix)
        { return argument; }
    if (!prefix) {
        operator = parser.token;
        nextToken(parser, context);
    }
    if (context & 16384 /* Strict */ && isEvalOrArguments(argument.name)) {
        tolerant(parser, context, 71 /* StrictLHSPrefixPostFix */, prefix ? 'Prefix' : 'Postfix');
    }
    else if (!isValidSimpleAssignmentTarget(argument)) {
        tolerant(parser, context, 3 /* InvalidLHSInAssignment */);
    }
    return finishNode(context, parser, pos, {
        type: 'UpdateExpression',
        argument: argument,
        operator: tokenDesc(operator),
        prefix: prefix
    });
}
/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param Parser Parser instance
 * @param context Context masks
 */
function parseRestElement(parser, context, args) {
    if ( args === void 0 ) args = [];

    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var argument = parseBindingIdentifierOrPattern(parser, context, args);
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument: argument
    });
}
/**
 * Parse spread element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SpreadElement)
 *
 * @param Parser Parser instance
 * @param context Context masks
 */
function parseSpreadElement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var token = parser.token;
    var argument = restoreExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentExpression);
    return finishNode(context, parser, pos, {
        type: 'SpreadElement',
        argument: argument
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
    var expr = parser.token === 19546 /* ImportKeyword */ ?
        parseImportExpressions(parser, context | 262144 /* AllowIn */, pos) :
        parseMemberExpression(parser, context | 262144 /* AllowIn */, pos);
    return parseCallExpression(parser, context | 262144 /* AllowIn */, pos, expr);
}
/**
 * Parse member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param Parser Parser instance
 * @param context Context masks
 * @param pos Location info
 * @param expr Expression
 */
function parseMemberExpression(parser, context, pos, expr) {
    if ( expr === void 0 ) expr = parsePrimaryExpression(parser, context);

    while (true) {
        if (consume(parser, context, 33554445 /* Period */)) {
            parser.flags = parser.flags & ~2 /* AllowBinding */ | 4 /* AllowDestructuring */;
            var property = parseIdentifierNameOrPrivateName(parser, context);
            expr = finishNode(context, parser, pos, {
                type: 'MemberExpression',
                object: expr,
                computed: false,
                property: property,
            });
            continue;
        }
        if (consume(parser, context, 16793619 /* LeftBracket */)) {
            parser.flags = parser.flags & ~2 /* AllowBinding */ | 4 /* AllowDestructuring */;
            var property$1 = parseExpression(parser, context);
            expect(parser, context, 20 /* RightBracket */);
            expr = finishNode(context, parser, pos, {
                type: 'MemberExpression',
                object: expr,
                computed: true,
                property: property$1,
            });
            continue;
        }
        else {
            if (parser.token === 16393 /* TemplateTail */) {
                expr = finishNode(context, parser, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplateLiteral(parser, context)
                });
            }
            else if (parser.token === 16392 /* TemplateCont */) {
                expr = finishNode(context, parser, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplate(parser, context | 65536 /* TaggedTemplate */)
                });
                continue;
            }
        }
        return expr;
    }
}
/**
 * Parse call expression
 *
 * Note! This is really a part of 'CoverCallExpressionAndAsyncArrowHead', but separated because of performance reasons
 *
 * @param Parser Parer instance
 * @param Context Context masks
 * @param pos Line / Colum info
 */
function parseCallExpression(parser, context, pos, expr) {
    while (true) {
        expr = parseMemberExpression(parser, context, pos, expr);
        if (parser.token !== 33570827 /* LeftParen */)
            { return expr; }
        var args = parseArgumentList(parser, context);
        expr = finishNode(context, parser, pos, {
            type: 'CallExpression',
            callee: expr,
            arguments: args
        });
    }
}
/**
 * Parse cover call expression and async arrow head
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CoverCallExpressionAndAsyncArrowHead)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parserCoverCallExpressionAndAsyncArrowHead(parser, context) {
    var pos = getLocation(parser);
    var expr = parseMemberExpression(parser, context | 262144 /* AllowIn */, pos);
    // Here we jump right into it and parse a simple, faster sub-grammar for
    // async arrow / async identifier + call expression. This could have been done different
    // but ESTree sucks!
    //
    // - J.K. Thomas
    if (parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
        if (parser.token & 2097152 /* IsAwait */)
            { tolerant(parser, context, 39 /* DisallowedInContext */); }
        return parseAsyncArrowFunction(parser, context, 2 /* Await */, pos, [parseAndValidateIdentifier(parser, context)]);
    }
    if (parser.flags & 1 /* NewLine */)
        { tolerant(parser, context, 35 /* LineBreakAfterAsync */); }
    while (parser.token === 33570827 /* LeftParen */) {
        expr = parseMemberExpression(parser, context, pos, expr);
        var args = parseAsyncArgumentList(parser, context);
        if (parser.token === 10 /* Arrow */) {
            expr = parseAsyncArrowFunction(parser, context, 2 /* Await */, pos, args);
            break;
        }
        expr = finishNode(context, parser, pos, {
            type: 'CallExpression',
            callee: expr,
            arguments: args
        });
    }
    return expr;
}
/**
 * Parse argument list
 *
 * @see [https://tc39.github.io/ecma262/#prod-grammar-notation-ArgumentList)
 *
 * @param Parser Parser instance
 * @param Context Context masks
 */
function parseArgumentList(parser, context) {
    expect(parser, context, 33570827 /* LeftParen */);
    var expressions = [];
    while (parser.token !== 16 /* RightParen */) {
        expressions.push(parser.token === 14 /* Ellipsis */ ?
            parseSpreadElement(parser, context) :
            parseExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentExpression));
        if (parser.token === 16 /* RightParen */)
            { break; }
        expect(parser, context, 33554450 /* Comma */);
        if (parser.token === 16 /* RightParen */)
            { break; }
    }
    expect(parser, context, 16 /* RightParen */);
    return expressions;
}
/**
 * Parse argument list for async arrow / async call expression
 *
 * @see [https://tc39.github.io/ecma262/#prod-grammar-notation-ArgumentList)
 *
 * @param Parser Parser instance
 * @param Context Context masks
 */
function parseAsyncArgumentList(parser, context) {
    // Here we are parsing an "extended" argument list tweaked to handle async arrows. This is
    // done here to avoid overhead and possible performance loss if we only
    // parse out a simple call expression - E.g 'async(foo, bar)' or 'async(foo, bar)()';
    //
    // - J.K. Thomas
    expect(parser, context, 33570827 /* LeftParen */);
    var args = [];
    var token = parser.token;
    var state = 0;
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            parser.flags |= 8 /* SimpleParameterList */;
            args.push(parseSpreadElement(parser, context));
            parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
            state = 2 /* HasSpread */;
        }
        else {
            token = parser.token;
            if (hasBit(token, 134217728 /* IsEvalOrArguments */))
                { state |= 8 /* EvalOrArguments */; }
            if (hasBit(token, 1048576 /* IsYield */))
                { state |= 16 /* Yield */; }
            if (hasBit(token, 2097152 /* IsAwait */))
                { state |= 32 /* Await */; }
            if (!(parser.flags & 2 /* AllowBinding */))
                { tolerant(parser, context, 80 /* NotBindable */); }
            args.push(restoreExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentExpression));
        }
        if (consume(parser, context, 33554450 /* Comma */)) {
            parser.flags &= ~4 /* AllowDestructuring */;
            if (state & 2 /* HasSpread */)
                { state = 1 /* SeenSpread */; }
        }
        if (parser.token === 16 /* RightParen */)
            { break; }
    }
    expect(parser, context, 16 /* RightParen */);
    if (parser.token === 10 /* Arrow */) {
        if (state & 1 /* SeenSpread */)
            { tolerant(parser, context, 81 /* ParamAfterRest */); }
        if (!(token & 67108864 /* IsIdentifier */))
            { parser.flags |= 8 /* SimpleParameterList */; }
        if (state & 32 /* Await */ || parser.flags & 16384 /* HasAwait */)
            { tolerant(parser, context, 52 /* AwaitInParameter */); }
        if (state & 16 /* Yield */ || parser.flags & 32768 /* HasYield */)
            { tolerant(parser, context, 51 /* YieldInParameter */); }
        if (state & 8 /* EvalOrArguments */) {
            if (context & 16384 /* Strict */)
                { tolerant(parser, context, 47 /* StrictEvalArguments */); }
            parser.flags |= 4096 /* StrictEvalArguments */;
        }
        parser.flags &= ~(16384 /* HasAwait */ | 32768 /* HasYield */);
    }
    return args;
}
/**
 * Parse primary expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PrimaryExpression)
 *
 * @param Parser Parser instance
 * @param Context Context masks
 */
function parsePrimaryExpression(parser, context) {
    switch (parser.token) {
        case 16386 /* NumericLiteral */:
        case 16387 /* StringLiteral */:
            return parseLiteral(parser, context);
        case 16503 /* BigIntLiteral */:
            return parseBigIntLiteral(parser, context);
        case 67125249 /* Identifier */:
            return parseIdentifier(parser, context);
        case 19463 /* NullKeyword */:
        case 19462 /* TrueKeyword */:
        case 19461 /* FalseKeyword */:
            return parseNullOrTrueOrFalseLiteral(parser, context);
        case 19544 /* FunctionKeyword */:
            return parseFunctionExpression(parser, context);
        case 19551 /* ThisKeyword */:
            return parseThisExpression(parser, context);
        case 4203628 /* AsyncKeyword */:
            return parseAsyncFunctionOrIdentifier(parser, context);
        case 33570827 /* LeftParen */:
            return parseCoverParenthesizedExpressionAndArrowParameterList(parser, context | 1073741824 /* InParen */);
        case 16793619 /* LeftBracket */:
            return restoreExpressionCoverGrammar(parser, context, parseArrayLiteral);
        case 16793612 /* LeftBrace */:
            return restoreExpressionCoverGrammar(parser, context, parseObjectLiteral);
        case 115 /* Hash */:
            return parseIdentifierNameOrPrivateName(parser, context);
        case 19533 /* ClassKeyword */:
            return parseClassExpression(parser, context);
        case 19547 /* NewKeyword */:
            return parseNewExpression(parser, context);
        case 19549 /* SuperKeyword */:
            return parseSuperProperty(parser, context);
        case 150069 /* Divide */:
        case 81957 /* DivideAssign */:
            if (scanRegularExpression(parser, context) === 16388 /* RegularExpression */) {
                return parseRegularExpressionLiteral(parser, context);
            }
            tolerant(parser, context, 5 /* UnterminatedRegExp */);
        case 16393 /* TemplateTail */:
            return parseTemplateLiteral(parser, context);
        case 16392 /* TemplateCont */:
            return parseTemplate(parser, context);
        case 21576 /* LetKeyword */:
            return parseLetAsIdentifier(parser, context);
        default:
            return parseAndValidateIdentifier(parser, context);
    }
}
/**
 * Parse 'let' as identifier in 'sloppy mode', and throws
 * in 'strict mode'  / 'module code'
 *
 * @param parser Parser instance
 * @param context context mask
 */
function parseLetAsIdentifier(parser, context) {
    if (context & 16384 /* Strict */)
        { tolerant(parser, context, 50 /* UnexpectedStrictReserved */); }
    var pos = getLocation(parser);
    var name = parser.tokenValue;
    nextToken(parser, context);
    if (parser.flags & 1 /* NewLine */) {
        if (parser.token === 16793619 /* LeftBracket */)
            { tolerant(parser, context, 1 /* UnexpectedToken */, 'let'); }
    }
    return finishNode(context, parser, pos, {
        type: 'Identifier',
        name: name
    });
}
/**
 * Parse either async function expression or identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Identifier)
 *
 * @param parser Parser instance
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
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseIdentifier(parser, context) {
    var pos = getLocation(parser);
    var name = parser.tokenValue;
    nextToken(parser, context | 65536 /* TaggedTemplate */);
    var node = finishNode(context, parser, pos, {
        type: 'Identifier',
        name: name
    });
    if (context & 2048 /* OptionsRawidentifiers */)
        { node.raw = parser.tokenRaw; }
    return node;
}
/**
 * Parse regular expression literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseRegularExpressionLiteral(parser, context) {
    var pos = getLocation(parser);
    var tokenRegExp = parser.tokenRegExp;
    var tokenValue = parser.tokenValue;
    var tokenRaw = parser.tokenRaw;
    nextToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'Literal',
        value: tokenValue,
        regex: tokenRegExp
    });
    if (context & 8 /* OptionsRaw */)
        { node.raw = tokenRaw; }
    return node;
}
/**
 * Parses string and number literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NumericLiteral)
 * @see [Link](https://tc39.github.io/ecma262/#prod-StringLiteral)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseLiteral(parser, context) {
    var pos = getLocation(parser);
    var value = parser.tokenValue;
    if (context & 16384 /* Strict */ && parser.flags & 128 /* Octal */) {
        tolerant(parser, context, 61 /* StrictOctalLiteral */);
    }
    nextToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'Literal',
        value: value
    });
    if (context & 8 /* OptionsRaw */)
        { node.raw = parser.tokenRaw; }
    return node;
}
/**
 * Parses BigInt literal
 *
 * @see [Link](https://tc39.github.io/proposal-bigint/)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseBigIntLiteral(parser, context) {
    var pos = getLocation(parser);
    var tokenValue = parser.tokenValue;
    var tokenRaw = parser.tokenRaw;
    nextToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'Literal',
        value: tokenValue,
        bigint: tokenRaw
    });
    if (context & 8 /* OptionsRaw */)
        { node.raw = parser.tokenRaw; }
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
    var pos = getLocation(parser);
    var token = parser.token;
    var raw = tokenDesc(token);
    nextToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'Literal',
        value: token === 19463 /* NullKeyword */ ? null : raw === 'true'
    });
    if (context & 8 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
}
/**
 * Parse this expression
 *
 * @param Parser instance
 * @param Context masks
 */
function parseThisExpression(parser, context) {
    var pos = getLocation(parser);
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ThisExpression'
    });
}
/**
 * Parse identifier name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-IdentifierName)
 *
 * @param Parser instance
 * @param Context masks
 * @param t token
 */
function parseIdentifierName(parser, context, t) {
    if (!(t & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)))
        { tolerant(parser, context, 2 /* UnexpectedKeyword */, tokenDesc(t)); }
    return parseIdentifier(parser, context);
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseIdentifierNameOrPrivateName(parser, context) {
    if (!consume(parser, context, 115 /* Hash */))
        { return parseIdentifierName(parser, context, parser.token); }
    var token = parser.token;
    var tokenValue = parser.tokenValue;
    if (!(parser.token & 67108864 /* IsIdentifier */))
        { tolerant(parser, context, 2 /* UnexpectedKeyword */, tokenDesc(token)); }
    var pos = getLocation(parser);
    var name = tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'PrivateName',
        name: name
    });
}
/**
 * Parse array literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayLiteral)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseArrayLiteral(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 16793619 /* LeftBracket */);
    var elements = [];
    while (parser.token !== 20 /* RightBracket */) {
        if (consume(parser, context, 33554450 /* Comma */)) {
            elements.push(null);
        }
        else if (parser.token === 14 /* Ellipsis */) {
            var element = parseSpreadElement(parser, context);
            if (parser.token !== 20 /* RightBracket */) {
                parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
                expect(parser, context, 33554450 /* Comma */);
            }
            elements.push(element);
        }
        else {
            elements.push(restoreExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentExpression));
            if (parser.token !== 20 /* RightBracket */)
                { expect(parser, context, 33554450 /* Comma */); }
        }
    }
    expect(parser, context, 20 /* RightBracket */);
    return finishNode(context, parser, pos, {
        type: 'ArrayExpression',
        elements: elements
    });
}
/**
 * Parses cover parenthesized expression and arrow parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-parseCoverParenthesizedExpressionAndArrowParameterList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseCoverParenthesizedExpressionAndArrowParameterList(parser, context) {
    expect(parser, context, 33570827 /* LeftParen */);
    switch (parser.token) {
        // ')'
        case 16 /* RightParen */:
            {
                expect(parser, context, 16 /* RightParen */);
                parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
                if (parser.token === 10 /* Arrow */)
                    { return []; }
            }
        // '...'
        case 14 /* Ellipsis */:
            {
                var expr = parseRestElement(parser, context);
                expect(parser, context, 16 /* RightParen */);
                parser.flags |= 8 /* SimpleParameterList */;
                parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
                if (parser.token !== 10 /* Arrow */)
                    { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
                return [expr];
            }
        default:
            {
                var state = 0;
                // Record the sequence position
                var sequencepos = getLocation(parser);
                if (hasBit(parser.token, 134217728 /* IsEvalOrArguments */)) {
                    recordError(parser);
                    state |= 2 /* HasEvalOrArguments */;
                }
                else if (hasBit(parser.token, 5120 /* FutureReserved */)) {
                    recordError(parser);
                    state |= 4 /* HasReservedWords */;
                }
                if (parser.token & 16777216 /* IsBindingPattern */)
                    { state |= 16 /* HasBinding */; }
                var expr$1 = restoreExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentExpression);
                // Sequence expression
                if (parser.token === 33554450 /* Comma */) {
                    state |= 1 /* SequenceExpression */;
                    var expressions = [expr$1];
                    while (consume(parser, context, 33554450 /* Comma */)) {
                        parser.flags &= ~4 /* AllowDestructuring */;
                        switch (parser.token) {
                            // '...'
                            case 14 /* Ellipsis */:
                                {
                                    if (!(parser.flags & 2 /* AllowBinding */))
                                        { tolerant(parser, context, 80 /* NotBindable */); }
                                    parser.flags |= 8 /* SimpleParameterList */;
                                    var restElement = parseRestElement(parser, context);
                                    expect(parser, context, 16 /* RightParen */);
                                    if (parser.token !== 10 /* Arrow */)
                                        { tolerant(parser, context, 81 /* ParamAfterRest */); }
                                    parser.flags &= ~2 /* AllowBinding */;
                                    expressions.push(restElement);
                                    return expressions;
                                }
                            // ')'
                            case 16 /* RightParen */:
                                {
                                    expect(parser, context, 16 /* RightParen */);
                                    if (parser.token !== 10 /* Arrow */)
                                        { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
                                    return expressions;
                                }
                            default:
                                {
                                    if (hasBit(parser.token, 134217728 /* IsEvalOrArguments */)) {
                                        recordError(parser);
                                        state |= 2 /* HasEvalOrArguments */;
                                    }
                                    else if (hasBit(parser.token, 5120 /* FutureReserved */)) {
                                        recordError(parser);
                                        state |= 4 /* HasReservedWords */;
                                    }
                                    if (parser.token & 16777216 /* IsBindingPattern */) {
                                        state |= 16 /* HasBinding */;
                                    }
                                    expressions.push(restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression));
                                }
                        }
                    }
                    expr$1 = finishNode(context, parser, sequencepos, {
                        type: 'SequenceExpression',
                        expressions: expressions
                    });
                }
                expect(parser, context, 16 /* RightParen */);
                if (parser.token === 10 /* Arrow */) {
                    if (state & 2 /* HasEvalOrArguments */) {
                        if (context & 16384 /* Strict */)
                            { tolerant(parser, context, 47 /* StrictEvalArguments */); }
                        parser.flags |= 4096 /* StrictEvalArguments */;
                    }
                    else if (state & 4 /* HasReservedWords */) {
                        if (context & 16384 /* Strict */)
                            { tolerant(parser, context, 50 /* UnexpectedStrictReserved */); }
                        parser.flags |= 64 /* StrictReserved */;
                    }
                    else if (!(parser.flags & 2 /* AllowBinding */)) {
                        tolerant(parser, context, 80 /* NotBindable */);
                    }
                    if (parser.flags & 32768 /* HasYield */)
                        { tolerant(parser, context, 51 /* YieldInParameter */); }
                    if (parser.flags & 16384 /* HasAwait */)
                        { tolerant(parser, context, 52 /* AwaitInParameter */); }
                    parser.flags &= ~(16384 /* HasAwait */ | 32768 /* HasYield */);
                    if (state & 16 /* HasBinding */)
                        { parser.flags |= 8 /* SimpleParameterList */; }
                    parser.flags &= ~2 /* AllowBinding */;
                    var params = (state & 1 /* SequenceExpression */ ? expr$1.expressions : [expr$1]);
                    return params;
                }
                parser.flags &= ~(16384 /* HasAwait */ | 32768 /* HasYield */ | 2 /* AllowBinding */);
                if (!isValidSimpleAssignmentTarget(expr$1))
                    { parser.flags &= ~4 /* AllowDestructuring */; }
                return expr$1;
            }
    }
}
/**
 * Parses function expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionExpression)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseFunctionExpression(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 19544 /* FunctionKeyword */);
    var isGenerator = consume(parser, context, 150067 /* Multiply */) ? 1 /* Generator */ : 0;
    var id = null;
    var token = parser.token;
    if (token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
        if (hasBit(token, 134217728 /* IsEvalOrArguments */)) {
            if (context & 16384 /* Strict */)
                { tolerant(parser, context, 47 /* StrictEvalArguments */); }
            parser.flags |= 2048 /* StrictFunctionName */;
        }
        id = parseFunctionOrClassExpressionName(parser, context, isGenerator);
    }
    var ref = swapContext(parser, context & ~(268435456 /* Method */ | 536870912 /* AllowSuperProperty */), isGenerator, parseFormalListAndBody);
    var params = ref.params;
    var body = ref.body;
    return finishNode(context, parser, pos, {
        type: 'FunctionExpression',
        params: params,
        body: body,
        async: false,
        generator: !!(isGenerator & 1 /* Generator */),
        expression: false,
        id: id
    });
}
/**
 * Parses async function or async generator expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionExpression)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAsyncFunctionOrAsyncGeneratorExpression(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 4203628 /* AsyncKeyword */);
    expect(parser, context, 19544 /* FunctionKeyword */);
    var isGenerator = consume(parser, context, 150067 /* Multiply */) ? 1 /* Generator */ : 0;
    var isAwait = 2;
    var id = null;
    var token = parser.token;
    if (token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
        if (hasBit(token, 134217728 /* IsEvalOrArguments */)) {
            if (context & 16384 /* Strict */ || isAwait & 2 /* Await */)
                { tolerant(parser, context, 47 /* StrictEvalArguments */); }
            parser.flags |= 2048 /* StrictFunctionName */;
        }
        if (token & 2097152 /* IsAwait */)
            { tolerant(parser, context, 48 /* AwaitBindingIdentifier */); }
        id = parseFunctionOrClassExpressionName(parser, context, isGenerator);
    }
    var ref = swapContext(parser, context & ~(268435456 /* Method */ | 536870912 /* AllowSuperProperty */), isGenerator | isAwait, parseFormalListAndBody);
    var params = ref.params;
    var body = ref.body;
    return finishNode(context, parser, pos, {
        type: 'FunctionExpression',
        params: params,
        body: body,
        async: true,
        generator: !!(isGenerator & 1 /* Generator */),
        expression: false,
        id: id
    });
}
/**
 * Shared helper function for "parseFunctionExpression" and "parseAsyncFunctionOrAsyncGeneratorExpression"
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseFunctionOrClassExpressionName(parser, context, state) {
    if (parser.token & 1048576 /* IsYield */ && state & 1 /* Generator */) {
        tolerant(parser, context, 49 /* YieldBindingIdentifier */);
    }
    return parseBindingIdentifier(parser, context);
}
/**
 * Parse computed property names
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ComputedPropertyName)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseComputedPropertyName(parser, context) {
    expect(parser, context, 16793619 /* LeftBracket */);
    // if (context & Context.Yield && parser.token & Token.IsYield) tolerant(parser, context, Errors.YieldInParameter);
    var key = parseAssignmentExpression(parser, context | 262144 /* AllowIn */);
    expect(parser, context, 20 /* RightBracket */);
    return key;
}
/**
 * Parse property name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PropertyName)
 *
 * @param Parser instance
 * @param Context masks
 */
function parsePropertyName(parser, context) {
    switch (parser.token) {
        case 16386 /* NumericLiteral */:
        case 16387 /* StringLiteral */:
            return parseLiteral(parser, context);
        case 16793619 /* LeftBracket */:
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
 * @param Parser instance
 * @param Context masks
 */
function parseSpreadProperties(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var token = parser.token;
    if (parser.token & 16777216 /* IsBindingPattern */)
        { parser.flags &= ~4 /* AllowDestructuring */; }
    var argument = parseAssignmentExpression(parser, context | 262144 /* AllowIn */);
    return finishNode(context, parser, pos, {
        type: 'SpreadElement',
        argument: argument
    });
}
/**
 * Parses object literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ObjectLiteral)
 *
 * @param parser
 * @param context
 */
function parseObjectLiteral(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 16793612 /* LeftBrace */);
    var properties = [];
    while (parser.token !== 301990415 /* RightBrace */) {
        properties.push(parser.token === 14 /* Ellipsis */ ?
            parseSpreadProperties(parser, context) :
            parsePropertyDefinition(parser, context));
        if (parser.token !== 301990415 /* RightBrace */)
            { expect(parser, context, 33554450 /* Comma */); }
    }
    if (parser.flags & 1024 /* HasDuplicateProto */ && parser.token !== 33620509 /* Assign */) {
        tolerant(parser, context, 64 /* DuplicateProto */);
    }
    // Unset the 'HasProtoField' flag now, we are done!
    parser.flags &= ~(512 /* HasProtoField */ | 1024 /* HasDuplicateProto */);
    expect(parser, context, 301990415 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'ObjectExpression',
        properties: properties
    });
}
/**
 * Parse property definition
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PropertyDefinition)
 *
 * @param Parser instance
 * @param Context masks
 */
function parsePropertyDefinition(parser, context) {
    var pos = getLocation(parser);
    var value;
    var state = 0;
    if (consume(parser, context, 150067 /* Multiply */))
        { state |= 2 /* Generator */; }
    var t = parser.token;
    if (parser.token === 16793619 /* LeftBracket */)
        { state |= 16 /* Computed */; }
    var key = parsePropertyName(parser, context);
    if (!(parser.token & 33554432 /* IsEndMarker */)) {
        if (!(state & 2 /* Generator */) && t & 4194304 /* IsAsync */ && !(parser.flags & 1 /* NewLine */)) {
            t = parser.token;
            state |= 1 /* Async */;
            if (consume(parser, context, 150067 /* Multiply */))
                { state |= 2 /* Generator */; }
            key = parsePropertyName(parser, context);
        }
        else if ((t === 9327 /* GetKeyword */ || t === 9328 /* SetKeyword */)) {
            if (state & 2 /* Generator */) {
                tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
            }
            state |= t === 9327 /* GetKeyword */ ? 4 /* Getter */ : 8 /* Setter */;
            key = parsePropertyName(parser, context);
        }
    }
    // method
    if (parser.token === 33570827 /* LeftParen */) {
        if (!(state & (4 /* Getter */ | 8 /* Setter */))) {
            state |= 32 /* Method */;
            parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
        }
        value = parseMethodDeclaration(parser, context | 268435456 /* Method */, state);
    }
    else {
        if (state & (2 /* Generator */ | 1 /* Async */)) {
            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
        }
        if (parser.token === 33554453 /* Colon */) {
            if (!(state & 16 /* Computed */) && parser.tokenValue === '__proto__') {
                // Annex B defines an tolerate error for duplicate PropertyName of `__proto__`,
                // in object initializers, but this does not apply to Object Assignment
                // patterns, so we need to validate this *after* done parsing
                // the object expression
                parser.flags |= parser.flags & 512 /* HasProtoField */ ? 1024 /* HasDuplicateProto */ : 512 /* HasProtoField */;
            }
            expect(parser, context, 33554453 /* Colon */);
            if (parser.token & 2097152 /* IsAwait */)
                { parser.flags |= 16384 /* HasAwait */; }
            value = restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression);
        }
        else {
            if (state & 1 /* Async */ || !isIdentifier(context, t)) {
                tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(t));
            }
            else if (context & (16384 /* Strict */ | 1048576 /* Yield */) && t & 1048576 /* IsYield */) {
                recordError(parser);
                parser.flags |= 32768 /* HasYield */;
            }
            state |= 64 /* Shorthand */;
            if (consume(parser, context, 33620509 /* Assign */)) {
                if (context & (16384 /* Strict */ | 1048576 /* Yield */) && parser.token & 1048576 /* IsYield */) {
                    recordError(parser);
                    parser.flags |= 32768 /* HasYield */;
                }
                value = parseAssignmentPattern(parser, context | 262144 /* AllowIn */, key, pos);
                parser.pendingExpressionError = {
                    error: 3 /* InvalidLHSInAssignment */,
                    line: parser.startLine,
                    column: parser.startColumn,
                    index: parser.startIndex,
                };
            }
            else {
                if (t & 2097152 /* IsAwait */) {
                    if (context & 524288 /* Async */)
                        { tolerant(parser, context, 46 /* UnexpectedReserved */); }
                    recordError(parser);
                    parser.flags |= 16384 /* HasAwait */;
                }
                value = key;
            }
        }
    }
    return finishNode(context, parser, pos, {
        type: 'Property',
        key: key,
        value: value,
        kind: !(state & 4 /* Getter */ | state & 8 /* Setter */) ? 'init' : (state & 8 /* Setter */) ? 'set' : 'get',
        computed: !!(state & 16 /* Computed */),
        method: !!(state & 32 /* Method */),
        shorthand: !!(state & 64 /* Shorthand */)
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseMethodDeclaration(parser, context, state) {
    var pos = getLocation(parser);
    var isGenerator = state & 2 /* Generator */ ? 1 /* Generator */ : 0;
    var isAsync = state & 1 /* Async */ ? 2 /* Await */ : 0;
    var ref = swapContext(parser, context, isGenerator | isAsync, parseFormalListAndBody, state);
    var params = ref.params;
    var body = ref.body;
    return finishNode(context, parser, pos, {
        type: 'FunctionExpression',
        params: params,
        body: body,
        async: !!(state & 1 /* Async */),
        generator: !!(state & 2 /* Generator */),
        expression: false,
        id: null
    });
}
/**
 * Parse arrow function
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrowFunction)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseArrowFunction(parser, context, pos, params) {
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    if (parser.flags & 1 /* NewLine */)
        { tolerant(parser, context, 82 /* LineBreakAfterArrow */); }
    expect(parser, context, 10 /* Arrow */);
    return parseArrowBody(parser, context, params, pos, 0 /* None */);
}
/**
 * Parse async arrow function
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseAsyncArrowFunction(parser, context, state, pos, params) {
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    if (parser.flags & 1 /* NewLine */)
        { tolerant(parser, context, 35 /* LineBreakAfterAsync */); }
    expect(parser, context, 10 /* Arrow */);
    return parseArrowBody(parser, context, params, pos, state);
}
/**
 * Shared helper function for both async arrow and arrows
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrowFunction)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param Parser instance
 * @param Context masks
 */
// https://tc39.github.io/ecma262/#prod-AsyncArrowFunction
function parseArrowBody(parser, context, params, pos, state) {
    var token = parser.token;
    parser.pendingExpressionError = null;
    for (var i in params)
        { reinterpret(parser, context | 2097152 /* InParameter */, params[i]); }
    var expression = parser.token !== 16793612;
    var body = expression ? parseExpressionCoverGrammar(parser, context | 524288 /* Async */, parseAssignmentExpression) :
        swapContext(parser, context | 8388608 /* InFunctionBody */, state, parseFunctionBody);
    return finishNode(context, parser, pos, {
        type: 'ArrowFunctionExpression',
        body: body,
        params: params,
        id: null,
        async: !!(state & 2 /* Await */),
        generator: false,
        expression: expression
    });
}
/**
 * Parses formal parameters and function body.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameters)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseFormalListAndBody(parser, context, state) {
    var paramList = parseFormalParameters(parser, context | 2097152 /* InParameter */, state);
    var args = paramList.args;
    var params = paramList.params;
    var body = parseFunctionBody(parser, context | 8388608 /* InFunctionBody */, args);
    return { params: params, body: body };
}
/**
 * Parse funciton body
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionBody)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseFunctionBody(parser, context, params) {
    // Note! The 'params' has an 'any' type now because it's really shouldn't be there. This should have been
    // on the parser object instead. So for now the 'params' arg are only used within the
    // 'parseFormalListAndBody' method, and not within the arrow function body.
    var pos = getLocation(parser);
    expect(parser, context, 16793612 /* LeftBrace */);
    var body = [];
    while (parser.token === 16387 /* StringLiteral */) {
        var item = parseDirective(parser, context);
        body.push(item);
        if (!isPrologueDirective(item))
            { break; }
        if (item.expression.value === 'use strict') {
            // See: https://tc39.github.io/ecma262/#sec-function-definitions-static-semantics-early-errors
            if (parser.flags & 8 /* SimpleParameterList */) {
                tolerant(parser, context, 65 /* IllegalUseStrict */);
            }
            else if (parser.flags & 64 /* StrictReserved */) {
                tolerant(parser, context, 50 /* UnexpectedStrictReserved */);
            }
            else if (parser.flags & 2048 /* StrictFunctionName */) {
                tolerant(parser, context, 50 /* UnexpectedStrictReserved */);
            }
            else if (parser.flags & 4096 /* StrictEvalArguments */) {
                tolerant(parser, context, 47 /* StrictEvalArguments */);
            }
            context |= 16384 /* Strict */;
        }
    }
    if (context & 16384 /* Strict */) {
        validateParams(parser, context, params);
    }
    var labelSet = parser.labelSet;
    parser.labelSet = {};
    var savedFlags = parser.flags;
    // Here we need to unset the 'StrictFunctionName' and 'StrictEvalArguments' masks
    // to avoid conflicts in nested functions
    parser.flags &= ~(2048 /* StrictFunctionName */ | 4096 /* StrictEvalArguments */ | 16 /* Switch */ | 32 /* Iteration */);
    while (parser.token !== 301990415 /* RightBrace */) {
        body.push(parseStatementListItem(parser, context));
    }
    if (savedFlags & 32 /* Iteration */)
        { parser.flags |= 32 /* Iteration */; }
    if (savedFlags & 16 /* Switch */)
        { parser.flags |= 16 /* Switch */; }
    parser.labelSet = labelSet;
    expect(parser, context, 301990415 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'BlockStatement',
        body: body
    });
}
/**
 * Parse formal parameters
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameters)
 *
 * @param Parser instance
 * @param Context masks
 * @param {state} Optional objectstate. Default to none
 */
function parseFormalParameters(parser, context, state) {
    parser.flags &= ~(8 /* SimpleParameterList */ | 64 /* StrictReserved */);
    expect(parser, context, 33570827 /* LeftParen */);
    var args = [];
    var params = [];
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            if (state & 8 /* Setter */)
                { tolerant(parser, context, 70 /* BadSetterRestParameter */); }
            parser.flags |= 8 /* SimpleParameterList */;
            params.push(parseRestElement(parser, context, args));
            break;
        }
        params.push(parseFormalParameterList(parser, context, args));
        if (!consume(parser, context, 33554450 /* Comma */))
            { break; }
        if (parser.token === 16 /* RightParen */)
            { break; }
    }
    if (state & 8 /* Setter */ && params.length !== 1) {
        tolerant(parser, context, 69 /* BadSetterArity */);
    }
    if (state & 4 /* Getter */ && params.length > 0) {
        tolerant(parser, context, 68 /* BadGetterArity */);
    }
    expect(parser, context, 16 /* RightParen */);
    return { params: params, args: args };
}
/**
 * Parse formal parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameterList)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseFormalParameterList(parser, context, args) {
    var pos = getLocation(parser);
    if (parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
        if (hasBit(parser.token, 5120 /* FutureReserved */)) {
            if (context & 16384 /* Strict */)
                { tolerant(parser, context, 50 /* UnexpectedStrictReserved */); }
            parser.flags |= 2048 /* StrictFunctionName */;
        }
        if (hasBit(parser.token, 134217728 /* IsEvalOrArguments */)) {
            if (context & 16384 /* Strict */)
                { tolerant(parser, context, 47 /* StrictEvalArguments */); }
            parser.flags |= 4096 /* StrictEvalArguments */;
        }
    }
    else {
        parser.flags |= 8 /* SimpleParameterList */;
    }
    var left = parseBindingIdentifierOrPattern(parser, context, args);
    if (!consume(parser, context, 33620509 /* Assign */))
        { return left; }
    if (parser.token & (1048576 /* IsYield */ | 2097152 /* IsAwait */) && context & (1048576 /* Yield */ | 524288 /* Async */)) {
        tolerant(parser, context, parser.token & 2097152 /* IsAwait */ ? 52 /* AwaitInParameter */ : 51 /* YieldInParameter */);
    }
    parser.flags |= 8 /* SimpleParameterList */;
    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left: left,
        right: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression)
    });
}
/**
 * Parse class expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassExpression)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseClassExpression(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 19533 /* ClassKeyword */);
    var token = parser.token;
    var state = 0;
    if (context & 524288 /* Async */ && token & 2097152 /* IsAwait */)
        { tolerant(parser, context, 48 /* AwaitBindingIdentifier */); }
    var id = (token !== 16793612 /* LeftBrace */ && token !== 3156 /* ExtendsKeyword */) ?
        parseBindingIdentifier(parser, context | 16384 /* Strict */) :
        null;
    var superClass = null;
    if (consume(parser, context, 3156 /* ExtendsKeyword */)) {
        superClass = parseLeftHandSideExpression(parser, context | 16384 /* Strict */, pos);
        state |= 512 /* Heritage */;
    }
    return finishNode(context, parser, pos, {
        type: 'ClassExpression',
        id: id,
        superClass: superClass,
        body: parseClassBodyAndElementList(parser, context | 16384 /* Strict */, state)
    });
}
/**
 * Parse class body and element list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElementList)
 *
 *
 * @param Parser instance
 * @param Context masks
 */
function parseClassBodyAndElementList(parser, context, state) {
    var pos = getLocation(parser);
    expect(parser, context, 16793612 /* LeftBrace */);
    var body = [];
    while (parser.token !== 301990415 /* RightBrace */) {
        if (!consume(parser, context, 301990417 /* Semicolon */)) {
            body.push(parseClassElement(parser, context, state));
        }
    }
    expect(parser, context, 301990415 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'ClassBody',
        body: body
    });
}
/**
 * Parse class element and class public instance fields & private instance fields
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElement)
 * @see [Link](https://tc39.github.io/proposal-class-public-fields/)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseClassElement(parser, context, state) {
    var pos = getLocation(parser);
    if (context & 1 /* OptionsNext */ && parser.token === 115 /* Hash */) {
        return parsePrivateFields(parser, context, pos);
    }
    var tokenValue = parser.tokenValue;
    var token = parser.token;
    if (consume(parser, context, 150067 /* Multiply */))
        { state |= 2 /* Generator */; }
    if (parser.token === 16793619 /* LeftBracket */)
        { state |= 16 /* Computed */; }
    if (parser.tokenValue === 'constructor') {
        if (state & 2 /* Generator */)
            { tolerant(parser, context, 44 /* ConstructorIsGenerator */); }
        state |= 256 /* Constructor */;
    }
    var key = parsePropertyName(parser, context);
    if (context & 1 /* OptionsNext */ && parser.token & 512 /* InstanceField */) {
        return parseFieldDefinition(parser, context, key, state, pos);
    }
    var value;
    if (!(parser.token & 33554432 /* IsEndMarker */)) {
        if (token === 5225 /* StaticKeyword */) {
            token = parser.token;
            if (consume(parser, context, 150067 /* Multiply */))
                { state |= 2 /* Generator */; }
            tokenValue = parser.tokenValue;
            if (parser.token === 16793619 /* LeftBracket */)
                { state |= 16 /* Computed */; }
            if (parser.tokenValue === 'prototype')
                { tolerant(parser, context, 66 /* StaticPrototype */); }
            state |= 128 /* Static */;
            key = parsePropertyName(parser, context);
            if (context & 1 /* OptionsNext */ && parser.token & 512 /* InstanceField */) {
                if (tokenValue === 'constructor')
                    { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
                return parseFieldDefinition(parser, context, key, state, pos);
            }
        }
        if (parser.token !== 33570827 /* LeftParen */) {
            if (token & 4194304 /* IsAsync */ && !(state & 2 /* Generator */) && !(parser.flags & 1 /* NewLine */)) {
                token = parser.token;
                tokenValue = parser.tokenValue;
                state |= 1 /* Async */;
                if (consume(parser, context, 150067 /* Multiply */))
                    { state |= 2 /* Generator */; }
                if (parser.token === 16793619 /* LeftBracket */)
                    { state |= 16 /* Computed */; }
                key = parsePropertyName(parser, context);
            }
            else if ((token === 9327 /* GetKeyword */ || token === 9328 /* SetKeyword */)) {
                state |= token === 9327 /* GetKeyword */ ? 4 /* Getter */ : 8 /* Setter */;
                tokenValue = parser.tokenValue;
                if (parser.token === 16793619 /* LeftBracket */)
                    { state |= 16 /* Computed */; }
                key = parsePropertyName(parser, context);
            }
            if (tokenValue === 'prototype') {
                tolerant(parser, context, 66 /* StaticPrototype */);
            }
            else if (!(state & 128 /* Static */) && tokenValue === 'constructor') {
                tolerant(parser, context, 45 /* ConstructorSpecialMethod */);
            }
        }
    }
    if (parser.token === 33570827 /* LeftParen */) {
        if (!(state & (4 /* Getter */ | 8 /* Setter */)))
            { state |= 32 /* Method */; }
        if (state & 512 /* Heritage */ && state & 256 /* Constructor */) {
            context |= 536870912 /* AllowSuperProperty */;
        }
        value = parseMethodDeclaration(parser, context | 268435456 /* Method */, state);
    }
    else {
        // Class fields - Stage 3 proposal
        if (context & 1 /* OptionsNext */)
            { return parseFieldDefinition(parser, context, key, state, pos); }
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token));
    }
    return parseMethodDefinition(parser, context, key, value, state, pos);
}
function parseMethodDefinition(parser, context, key, value, state, pos) {
    return finishNode(context, parser, pos, {
        type: 'MethodDefinition',
        kind: (state & 256 /* Constructor */) ? 'constructor' : (state & 4 /* Getter */) ? 'get' :
            (state & 8 /* Setter */) ? 'set' : 'method',
        static: !!(state & 128 /* Static */),
        computed: !!(state & 16 /* Computed */),
        key: key,
        value: value
    });
}
/**
 * Parses field definition.
 *
 * @param Parser instance
 * @param Context masks
 */
function parseFieldDefinition(parser, context, key, state, pos) {
    if (state & 256 /* Constructor */)
        { tolerant(parser, context, 0 /* Unexpected */); }
    var value = null;
    if (state & (1 /* Async */ | 2 /* Generator */))
        { tolerant(parser, context, 0 /* Unexpected */); }
    if (consume(parser, context, 33620509 /* Assign */)) {
        if (parser.token & 134217728 /* IsEvalOrArguments */)
            { tolerant(parser, context, 47 /* StrictEvalArguments */); }
        value = parseAssignmentExpression(parser, context);
    }
    consume(parser, context, 33554450 /* Comma */);
    return finishNode(context, parser, pos, {
        type: 'FieldDefinition',
        key: key,
        value: value,
        computed: !!(state & 16 /* Computed */),
        static: !!(state & 128 /* Static */)
    });
}
/**
 * Parse private name
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function parsePrivateName(parser, context, pos) {
    var name = parser.tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'PrivateName',
        name: name
    });
}
/**
 * Parses private instance fields
 *
 * @see [Link](https://tc39.github.io/proposal-class-public-fields/)
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function parsePrivateFields(parser, context, pos) {
    expect(parser, context | 131072 /* InClass */, 115 /* Hash */);
    if (parser.tokenValue === 'constructor')
        { tolerant(parser, context, 40 /* PrivateFieldConstructor */); }
    var key = parsePrivateName(parser, context, pos);
    if (parser.token === 33570827 /* LeftParen */)
        { return parsePrivateMethod(parser, context, key, pos); }
    var value = null;
    if (consume(parser, context, 33620509 /* Assign */)) {
        if (parser.token & 134217728 /* IsEvalOrArguments */)
            { tolerant(parser, context, 47 /* StrictEvalArguments */); }
        value = parseAssignmentExpression(parser, context);
    }
    consume(parser, context, 33554450 /* Comma */);
    return finishNode(context, parser, pos, {
        type: 'FieldDefinition',
        key: key,
        value: value,
        computed: false,
        static: false // Note: This deviates from the ESTree specs. Added to support static field names
    });
}
function parsePrivateMethod(parser, context, key, pos) {
    var value = parseMethodDeclaration(parser, context | 16384 /* Strict */ | 268435456 /* Method */, 0 /* None */);
    return parseMethodDefinition(parser, context, key, value, 32 /* Method */, pos);
}
/**
 * Parse import expressions
 *
 * @param Parser instance
 * @param Context masks
 */
function parseImportExpressions(parser, context, poss) {
    if (!(context & 1 /* OptionsNext */))
        { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
    var pos = getLocation(parser);
    var id = parseIdentifier(parser, context);
    // Import.meta - Stage 3 proposal
    if (context & 1 /* OptionsNext */ && consume(parser, context, 33554445 /* Period */)) {
        if (context & 32768 /* Module */ && parser.tokenValue === 'meta') {
            return parseMetaProperty(parser, context, id, pos);
        }
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    var expr = finishNode(context, parser, pos, {
        type: 'Import'
    });
    expect(parser, context, 33570827 /* LeftParen */);
    var args = parseExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentExpression);
    expect(parser, context, 16 /* RightParen */);
    expr = finishNode(context, parser, pos, {
        type: 'CallExpression',
        callee: expr,
        arguments: [args]
    });
    return expr;
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseMetaProperty(parser, context, meta, pos) {
    return finishNode(context, parser, pos, {
        meta: meta,
        type: 'MetaProperty',
        property: parseIdentifier(parser, context)
    });
}
/**
 * Parse new expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NewExpression)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseNewExpression(parser, context) {
    var pos = getLocation(parser);
    var token = parser.token;
    var tokenValue = parser.tokenValue;
    var id = parseIdentifier(parser, context);
    if (consume(parser, context, 33554445 /* Period */)) {
        if (parser.tokenValue !== 'target' ||
            !(context & (2097152 /* InParameter */ | 8388608 /* InFunctionBody */)))
            { tolerant(parser, context, 53 /* MetaNotInFunctionBody */); }
        return parseMetaProperty(parser, context, id, pos);
    }
    return finishNode(context, parser, pos, {
        type: 'NewExpression',
        callee: parseImportOrMemberExpression(parser, context, pos),
        arguments: parser.token === 33570827 /* LeftParen */ ? parseArgumentList(parser, context) : []
    });
}
/**
 * Parse either import or member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseImportOrMemberExpression(parser, context, pos) {
    var token = parser.token;
    if (context & 1 /* OptionsNext */ && token === 19546 /* ImportKeyword */) {
        // Invalid: '"new import(x)"'
        if (lookahead(parser, context, nextTokenIsLeftParen))
            { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token)); }
        // Fixes cases like ''new import.meta','
        return parseImportExpressions(parser, context, pos);
    }
    return parseMemberExpression(parser, context, pos);
}
/**
 * Parse super property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SuperProperty)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseSuperProperty(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 19549 /* SuperKeyword */);
    var token = parser.token;
    if (token === 33570827 /* LeftParen */) {
        // The super property has to be within a class constructor
        if (!(context & 536870912 /* AllowSuperProperty */)) {
            tolerant(parser, context, 54 /* BadSuperCall */);
        }
    }
    else if (token === 16793619 /* LeftBracket */ || token === 33554445 /* Period */) {
        if (!(context & 268435456 /* Method */))
            { tolerant(parser, context, 55 /* UnexpectedSuper */); }
    }
    else {
        tolerant(parser, context, 56 /* LoneSuper */);
    }
    return finishNode(context, parser, pos, {
        type: 'Super'
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseTemplateLiteral(parser, context) {
    var pos = getLocation(parser);
    return finishNode(context, parser, pos, {
        type: 'TemplateLiteral',
        expressions: [],
        quasis: [parseTemplateSpans(parser, context)]
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseTemplateHead(parser, context, cooked, raw, pos) {
    if ( cooked === void 0 ) cooked = null;

    parser.token = consumeTemplateBrace(parser, context);
    return finishNode(context, parser, pos, {
        type: 'TemplateElement',
        value: {
            cooked: cooked,
            raw: raw
        },
        tail: false
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseTemplate(parser, context, expressions, quasis) {
    if ( expressions === void 0 ) expressions = [];
    if ( quasis === void 0 ) quasis = [];

    var pos = getLocation(parser);
    var tokenValue = parser.tokenValue;
    var tokenRaw = parser.tokenRaw;
    expect(parser, context, 16392 /* TemplateCont */);
    expressions.push(parseExpression(parser, context));
    var t = getLocation(parser);
    quasis.push(parseTemplateHead(parser, context, tokenValue, tokenRaw, pos));
    if (parser.token === 16393 /* TemplateTail */) {
        quasis.push(parseTemplateSpans(parser, context, t));
    }
    else {
        parseTemplate(parser, context, expressions, quasis);
    }
    return finishNode(context, parser, pos, {
        type: 'TemplateLiteral',
        expressions: expressions,
        quasis: quasis
    });
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
function parseTemplateSpans(parser, context, pos) {
    if ( pos === void 0 ) pos = getLocation(parser);

    var tokenValue = parser.tokenValue;
    var tokenRaw = parser.tokenRaw;
    expect(parser, context, 16393 /* TemplateTail */);
    return finishNode(context, parser, pos, {
        type: 'TemplateElement',
        value: {
            cooked: tokenValue,
            raw: tokenRaw
        },
        tail: true
    });
}

// 12.15.5 Destructuring Assignment
/**
 * Parses either a binding identifier or binding pattern
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseBindingIdentifierOrPattern(parser, context, args) {
    if ( args === void 0 ) args = [];

    var token = parser.token;
    if (token & 16777216 /* IsBindingPattern */) {
        if (token === 16793619 /* LeftBracket */)
            { return parseArrayAssignmentPattern(parser, context); }
        return parserObjectAssignmentPattern(parser, context);
    }
    if (token & 2097152 /* IsAwait */ && (context & (524288 /* Async */ | 32768 /* Module */))) {
        tolerant(parser, context, 48 /* AwaitBindingIdentifier */);
    }
    else if (token & 1048576 /* IsYield */ && (context & (1048576 /* Yield */ | 16384 /* Strict */))) {
        tolerant(parser, context, 49 /* YieldBindingIdentifier */);
    }
    args.push(parser.tokenValue);
    return parseBindingIdentifier(parser, context);
}
/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseBindingIdentifier(parser, context) {
    var token = parser.token;
    if (token & 134217728 /* IsEvalOrArguments */) {
        if (context & 16384 /* Strict */)
            { tolerant(parser, context, 15 /* StrictLHSAssignment */); }
        parser.flags |= 64 /* StrictReserved */;
    }
    else if (context & 33554432 /* BlockScope */ && token === 21576 /* LetKeyword */) {
        // let is disallowed as a lexically bound name
        tolerant(parser, context, 25 /* LetInLexicalBinding */);
    }
    else if (hasBit(token, 5120 /* FutureReserved */)) {
        if (context & 16384 /* Strict */)
            { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token)); }
        parser.flags |= 2048 /* StrictFunctionName */;
    }
    else if (!isIdentifier(context, token)) {
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token));
    }
    var pos = getLocation(parser);
    var name = parser.tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'Identifier',
        name: name
    });
}
/**
 * Parse assignment rest element or assignment rest property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestProperty)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAssignmentRestElementOrProperty(parser, context, endToken) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var argument = parseBindingIdentifierOrPattern(parser, context);
    if (parser.token !== endToken)
        { tolerant(parser, context, 73 /* ElementAfterRest */); }
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument: argument
    });
}
/**
 * Parse array assignment pattern
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function parseArrayAssignmentPattern(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 16793619 /* LeftBracket */);
    var elements = [];
    while (parser.token !== 20 /* RightBracket */) {
        if (consume(parser, context, 33554450 /* Comma */)) {
            elements.push(null);
        }
        else {
            if (parser.token === 14 /* Ellipsis */) {
                elements.push(parseAssignmentRestElementOrProperty(parser, context, 20 /* RightBracket */));
                break;
            }
            else {
                elements.push(parseExpressionCoverGrammar(parser, context | 262144 /* AllowIn */, parseAssignmentOrArrayAssignmentPattern));
            }
            if (parser.token !== 20 /* RightBracket */) {
                expect(parser, context, 33554450 /* Comma */);
            }
        }
    }
    expect(parser, context, 20 /* RightBracket */);
    return finishNode(context, parser, pos, {
        type: 'ArrayPattern',
        elements: elements
    });
}
/**
 * Parse object assignment pattern
 *
 * @param Parser Parser instance
 * @param Context Context masks
 */
function parserObjectAssignmentPattern(parser, context) {
    var pos = getLocation(parser);
    var properties = [];
    expect(parser, context, 16793612 /* LeftBrace */);
    while (parser.token !== 301990415 /* RightBrace */) {
        if (parser.token === 14 /* Ellipsis */) {
            properties.push(parseAssignmentRestElementOrProperty(parser, context, 301990415 /* RightBrace */));
            break;
        }
        properties.push(parseBindingProperty(parser, context));
        if (parser.token !== 301990415 /* RightBrace */)
            { expect(parser, context, 33554450 /* Comma */); }
    }
    expect(parser, context, 301990415 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'ObjectPattern',
        properties: properties
    });
}
/** Parse assignment pattern
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentPattern)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param left LHS of assignment pattern
 * @param pos Location
 */
function parseAssignmentPattern(parser, context, left, pos) {
    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left: left,
        right: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression)
    });
}
/**
 * Parse assignment pattern or array assignment pattern
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentPattern)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param left LHS of assignment pattern
 * @param pos Location
 */
function parseAssignmentOrArrayAssignmentPattern(parser, context, pos, left) {
    if ( pos === void 0 ) pos = getLocation(parser);
    if ( left === void 0 ) left = parseBindingIdentifierOrPattern(parser, context);

    if (!consume(parser, context, 33620509 /* Assign */))
        { return left; }
    if (context & (1073741824 /* InParen */ | 8388608 /* InFunctionBody */)) {
        if (parser.token & 1048576 /* IsYield */ && context & 1048576 /* Yield */) {
            tolerant(parser, context, 49 /* YieldBindingIdentifier */);
        }
    }
    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left: left,
        right: parseAssignmentExpression(parser, context | 262144 /* AllowIn */)
    });
}
/**
 * Parse object binding property
 *
 * @param parser Parser instance
 * @param context Context masks
 */
function parseBindingProperty(parser, context) {
    var pos = getLocation(parser);
    var token = parser.token;
    var key;
    var value;
    var computed = false;
    var shorthand = false;
    // single name binding
    if (token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
        key = parseIdentifier(parser, context);
        shorthand = !consume(parser, context, 33554453 /* Colon */);
        if (shorthand) {
            if (context & (16384 /* Strict */ | 1048576 /* Yield */) &&
                (token & 1048576 /* IsYield */ || parser.token & 1048576 /* IsYield */)) {
                tolerant(parser, context, context & 2097152 /* InParameter */ ? 51 /* YieldInParameter */ : 49 /* YieldBindingIdentifier */);
            }
            if (consume(parser, context, 33620509 /* Assign */)) {
                value = parseAssignmentPattern(parser, context | 262144 /* AllowIn */, key, pos);
            }
            else {
                if (!isIdentifier(context, token))
                    { tolerant(parser, context, 46 /* UnexpectedReserved */); }
                value = key;
            }
        }
        else
            { value = parseAssignmentOrArrayAssignmentPattern(parser, context); }
    }
    else {
        computed = token === 16793619 /* LeftBracket */;
        key = parsePropertyName(parser, context);
        expect(parser, context, 33554453 /* Colon */);
        value = parseExpressionCoverGrammar(parser, context, parseAssignmentOrArrayAssignmentPattern);
    }
    return finishNode(context, parser, pos, {
        type: 'Property',
        kind: 'init',
        key: key,
        computed: computed,
        value: value,
        method: false,
        shorthand: shorthand
    });
}

// Declarations
/**
 * Parses class declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseClassDeclaration(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 19533 /* ClassKeyword */);
    var token = parser.token;
    var id = (context & 134217728 /* RequireIdentifier */ && (parser.token !== 67125249 /* Identifier */)) ? null : parseBindingIdentifier(parser, context | 16384 /* Strict */);
    var state = 0;
    var superClass = null;
    if (consume(parser, context, 3156 /* ExtendsKeyword */)) {
        superClass = parseLeftHandSideExpression(parser, context | 16384 /* Strict */, pos);
        state |= 512 /* Heritage */;
    }
    return finishNode(context, parser, pos, {
        type: 'ClassDeclaration',
        id: id,
        superClass: superClass,
        body: parseClassBodyAndElementList(parser, context & ~134217728 /* RequireIdentifier */ | 16384 /* Strict */ | 131072 /* InClass */, state)
    });
}
/**
 * Parses function declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseFunctionDeclaration(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 19544 /* FunctionKeyword */);
    var isGenerator = 0;
    if (consume(parser, context, 150067 /* Multiply */)) {
        if (!(context & 8388608 /* InFunctionBody */) && context & 16777216 /* AllowSingleStatement */) {
            tolerant(parser, context, 20 /* GeneratorInSingleStatementContext */);
        }
        isGenerator = 1 /* Generator */;
    }
    return parseFunctionDeclarationBody(parser, context & ~(16777216 /* AllowSingleStatement */ | 268435456 /* Method */ | 536870912 /* AllowSuperProperty */), isGenerator, pos);
}
/**
 * Parses out a function declartion body
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser Parser instance
 * @param context Context mask
 * @param state Modifier state
 * @param pos Current location
 */
function parseFunctionDeclarationBody(parser, context, state, pos) {
    var id = parseFunctionDeclarationName(parser, context);
    var ref = swapContext(parser, context & ~134217728 /* RequireIdentifier */, state, parseFormalListAndBody);
    var params = ref.params;
    var body = ref.body;
    return finishNode(context, parser, pos, {
        type: 'FunctionDeclaration',
        params: params,
        body: body,
        async: !!(state & 2 /* Await */),
        generator: !!(state & 1 /* Generator */),
        expression: false,
        id: id
    });
}
/**
 * Parses async function or async generator declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 4203628 /* AsyncKeyword */);
    expect(parser, context, 19544 /* FunctionKeyword */);
    var isAwait = 2;
    var isGenerator = 0;
    if (consume(parser, context, 150067 /* Multiply */)) {
        if (!(context & 8388608 /* InFunctionBody */) && context & 16777216 /* AllowSingleStatement */) {
            tolerant(parser, context, 20 /* GeneratorInSingleStatementContext */);
        }
        isGenerator = 1 /* Generator */;
    }
    return parseFunctionDeclarationBody(parser, context & ~(16777216 /* AllowSingleStatement */ | 268435456 /* Method */ | 536870912 /* AllowSuperProperty */), isGenerator | isAwait, pos);
}
/**
 * Shared helper function for "parseFunctionDeclaration" and "parseAsyncFunctionOrAsyncGeneratorDeclaration"
 * so we can re-use the same logic when parsing out the function name, or throw an
 * error if the 'RequireIdentifier' mask is not set
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseFunctionDeclarationName(parser, context) {
    var token = parser.token;
    var id = null;
    if (context & 1048576 /* Yield */ && token & 1048576 /* IsYield */)
        { tolerant(parser, context, 49 /* YieldBindingIdentifier */); }
    if (context & 524288 /* Async */ && token & 2097152 /* IsAwait */)
        { tolerant(parser, context, 48 /* AwaitBindingIdentifier */); }
    if (hasBit(token, 134217728 /* IsEvalOrArguments */)) {
        if (context & 16384 /* Strict */)
            { tolerant(parser, context, 47 /* StrictEvalArguments */); }
        parser.flags |= 4096 /* StrictEvalArguments */;
    }
    if (token !== 33570827 /* LeftParen */) {
        id = parseBindingIdentifier(parser, context);
    }
    else if (!(context & 134217728 /* RequireIdentifier */))
        { tolerant(parser, context, 38 /* UnNamedFunctionDecl */); }
    return id;
}
/**
 * Parses variable declaration.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseVariableDeclaration(parser, context, isConst) {
    var pos = getLocation(parser);
    var isBindingPattern = (parser.token & 16777216 /* IsBindingPattern */) !== 0;
    var id = parseBindingIdentifierOrPattern(parser, context);
    var init = null;
    if (consume(parser, context, 33620509 /* Assign */)) {
        init = parseExpressionCoverGrammar(parser, context & ~(33554432 /* BlockScope */ | 67108864 /* ForStatement */), parseAssignmentExpression);
        if (parser.token & 536870912 /* IsInOrOf */ && (context & 67108864 /* ForStatement */ || isBindingPattern)) {
            tolerant(parser, context, context & (33554432 /* BlockScope */ | 16384 /* Strict */) ?
                23 /* ForInOfLoopInitializer */ :
                23 /* ForInOfLoopInitializer */, tokenDesc(parser.token));
        }
        // Initializers are required for 'const' and binding patterns
    }
    else if (!(parser.token & 536870912 /* IsInOrOf */) && (isConst || isBindingPattern)) {
        tolerant(parser, context, 22 /* DeclarationMissingInitializer */, isConst ? 'const' : 'destructuring');
    }
    return finishNode(context, parser, pos, {
        type: 'VariableDeclarator',
        init: init,
        id: id
    });
}
/**
 * Parses variable declaration list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclarationList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseVariableDeclarationList(parser, context, isConst) {
    var list = [parseVariableDeclaration(parser, context, isConst)];
    while (consume(parser, context, 33554450 /* Comma */)) {
        list.push(parseVariableDeclaration(parser, context, isConst));
    }
    if (context & 67108864 /* ForStatement */ && parser.token & 536870912 /* IsInOrOf */ && list.length !== 1) {
        tolerant(parser, context, 24 /* ForInOfLoopMultiBindings */, tokenDesc(parser.token));
    }
    return list;
}

// Statements
/**
 * Parses statement list items
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementListItem)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseStatementListItem(parser, context) {
    switch (parser.token) {
        case 19544 /* FunctionKeyword */:
            return parseFunctionDeclaration(parser, context);
        case 19533 /* ClassKeyword */:
            return parseClassDeclaration(parser, context);
        case 21576 /* LetKeyword */:
            return parseLetOrExpressionStatement(parser, context | 262144 /* AllowIn */);
        case 19529 /* ConstKeyword */:
            return parseVariableStatement(parser, context | 33554432 /* BlockScope */ | 262144 /* AllowIn */);
        case 4203628 /* AsyncKeyword */:
            return parseAsyncFunctionDeclarationOrStatement(parser, context);
        case 3155 /* ExportKeyword */:
            if (context & 32768 /* Module */)
                { tolerant(parser, context, 33 /* ExportDeclAtTopLevel */); }
            break;
        case 19546 /* ImportKeyword */:
            // We must be careful not to parse a 'import()'
            // expression or 'import.meta' as an import declaration.
            if (context & 1 /* OptionsNext */ && lookahead(parser, context, nextTokenIsLeftParenOrPeriod)) {
                return parseExpressionStatement(parser, context | 262144 /* AllowIn */);
            }
            if (context & 32768 /* Module */)
                { tolerant(parser, context, 32 /* ImportDeclAtTopLevel */); }
            break;
        default: // ignore
    }
    return parseStatement(parser, context | 16777216 /* AllowSingleStatement */);
}
/**
 * Parses statements
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseStatement(parser, context) {
    switch (parser.token) {
        case 19527 /* VarKeyword */:
            return parseVariableStatement(parser, context | 262144 /* AllowIn */);
        case 301990417 /* Semicolon */:
            return parseEmptyStatement(parser, context);
        case 19550 /* SwitchKeyword */:
            return parseSwitchStatement(parser, context);
        case 16793612 /* LeftBrace */:
            return parseBlockStatement(parser, context);
        case 3164 /* ReturnKeyword */:
            return parseReturnStatement(parser, context);
        case 3161 /* IfKeyword */:
            return parseIfStatement(parser, context);
        case 1073744977 /* DoKeyword */:
            return parseDoWhileStatement(parser, context);
        case 1073744994 /* WhileKeyword */:
            return parseWhileStatement(parser, context);
        case 3171 /* WithKeyword */:
            return parseWithStatement(parser, context);
        case 3146 /* BreakKeyword */:
            return parseBreakStatement(parser, context);
        case 3150 /* ContinueKeyword */:
            return parseContinueStatement(parser, context);
        case 3151 /* DebuggerKeyword */:
            return parseDebuggerStatement(parser, context);
        case 3168 /* ThrowKeyword */:
            return parseThrowStatement(parser, context);
        case 3169 /* TryKeyword */:
            return parseTryStatement(parser, context);
        case 1073744982 /* ForKeyword */:
            return parseForStatement(parser, context | 67108864 /* ForStatement */);
        case 4203628 /* AsyncKeyword */:
            if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
                tolerant(parser, context, 34 /* AsyncFunctionInSingleStatementContext */);
            }
            return parseExpressionOrLabelledStatement(parser, context | 16777216 /* AllowSingleStatement */);
        case 19544 /* FunctionKeyword */:
            // V8
            tolerant(parser, context, context & 16384 /* Strict */ ? 17 /* StrictFunction */ : 18 /* SloppyFunction */);
        case 19533 /* ClassKeyword */:
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
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseEmptyStatement(parser, context) {
    var pos = getLocation(parser);
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'EmptyStatement'
    });
}
/**
 * Parses the continue statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ContinueStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseContinueStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 3150 /* ContinueKeyword */);
    // Appearing of continue without an IterationStatement leads to syntax error
    if (!(parser.flags & 48 /* AllowBreakOrContinue */)) {
        tolerant(parser, context, 28 /* InvalidNestedStatement */, tokenDesc(parser.token));
    }
    var label = null;
    var tokenValue = parser.tokenValue;
    if (!(parser.flags & 1 /* NewLine */) && (parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */))) {
        label = parseIdentifier(parser, context);
        validateBreakOrContinueLabel(parser, context, tokenValue, /* isContinue */ true);
    }
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ContinueStatement',
        label: label
    });
}
/**
 * Parses the break statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BreakStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseBreakStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 3146 /* BreakKeyword */);
    var label = null;
    // Use 'tokenValue' to avoid accessing another object shape which in turn can lead to
    // a "'deopt" when getting the identifier value (*if any*)
    var tokenValue = parser.tokenValue;
    if (!(parser.flags & 1 /* NewLine */) && (parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */))) {
        label = parseIdentifier(parser, context);
        validateBreakOrContinueLabel(parser, context, tokenValue, /* isContinue */ false);
    }
    else if (!(parser.flags & 48 /* AllowBreakOrContinue */)) {
        tolerant(parser, context, 28 /* InvalidNestedStatement */, 'break');
    }
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'BreakStatement',
        label: label
    });
}
/**
 * Parses the if statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-if-statement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseIfStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 3161 /* IfKeyword */);
    expect(parser, context, 33570827 /* LeftParen */);
    var test = parseExpression(parser, context | 262144 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    var consequent = parseConsequentOrAlternate(parser, context);
    var alternate = consume(parser, context, 3154 /* ElseKeyword */) ? parseConsequentOrAlternate(parser, context) : null;
    return finishNode(context, parser, pos, {
        type: 'IfStatement',
        test: test,
        consequent: consequent,
        alternate: alternate
    });
}
/**
 * Parse either consequent or alternate. Supports AnnexB.
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseConsequentOrAlternate(parser, context) {
    return context & 16384 /* Strict */ || parser.token !== 19544 /* FunctionKeyword */ ?
        parseStatement(parser, context & ~16777216 /* AllowSingleStatement */) :
        parseFunctionDeclaration(parser, context);
}
/**
 * Parses the debugger statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-DebuggerStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseDebuggerStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 3151 /* DebuggerKeyword */);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'DebuggerStatement',
    });
}
/**
 * Parses try statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseTryStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 3169 /* TryKeyword */);
    var block = parseBlockStatement(parser, context);
    var handler = parser.token === 3148 /* CatchKeyword */ ? parseCatchBlock(parser, context) : null;
    var finalizer = consume(parser, context, 3157 /* FinallyKeyword */) ? parseBlockStatement(parser, context) : null;
    if (!handler && !finalizer)
        { tolerant(parser, context, 83 /* NoCatchOrFinally */); }
    return finishNode(context, parser, pos, {
        type: 'TryStatement',
        block: block,
        handler: handler,
        finalizer: finalizer
    });
}
/**
 * Parsescatch block
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Catch)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseCatchBlock(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 3148 /* CatchKeyword */);
    var param = null;
    if (context & 1 /* OptionsNext */
        ? consume(parser, context, 33570827 /* LeftParen */)
        : expect(parser, context, 33570827 /* LeftParen */)) {
        param = parseBindingIdentifierOrPattern(parser, context);
        expect(parser, context, 16 /* RightParen */);
    }
    var body = parseBlockStatement(parser, context);
    return finishNode(context, parser, pos, {
        type: 'CatchClause',
        param: param,
        body: body
    });
}
/**
 * Parses throw statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ThrowStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseThrowStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 3168 /* ThrowKeyword */);
    if (parser.flags & 1 /* NewLine */)
        { tolerant(parser, context, 84 /* NewlineAfterThrow */); }
    var argument = parseExpression(parser, context | 262144 /* AllowIn */);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ThrowStatement',
        argument: argument
    });
}
/**
 * Parses expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseExpressionStatement(parser, context) {
    var pos = getLocation(parser);
    var expr = parseExpression(parser, context | 262144 /* AllowIn */);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ExpressionStatement',
        expression: expr
    });
}
/**
 * Parses either expression or labelled statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-LabelledStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseExpressionOrLabelledStatement(parser, context) {
    var pos = getLocation(parser);
    var tokenValue = parser.tokenValue;
    var token = parser.token;
    var expr = parseExpression(parser, context | 262144 /* AllowIn */);
    if (token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */) && parser.token === 33554453 /* Colon */) {
        // If within generator function bodies, we do it like this so we can throw an nice error message
        if (context & 1048576 /* Yield */ && token & 1048576 /* IsYield */)
            { tolerant(parser, context, 57 /* YieldReservedKeyword */); }
        expect(parser, context, 33554453 /* Colon */, 87 /* LabelNoColon */);
        if (hasLabel(parser, tokenValue))
            { tolerant(parser, context, 27 /* LabelRedeclaration */, tokenValue); }
        addLabel(parser, tokenValue);
        var body;
        if (!(context & 16384 /* Strict */) && (context & 16777216 /* AllowSingleStatement */) && parser.token === 19544 /* FunctionKeyword */) {
            body = parseFunctionDeclaration(parser, context);
        }
        else {
            body = parseStatement(parser, context);
        }
        popLabel(parser, tokenValue);
        return finishNode(context, parser, pos, {
            type: 'LabeledStatement',
            label: expr,
            body: body
        });
    }
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ExpressionStatement',
        expression: expr
    });
}
/**
 * Parses either a binding identifier or bindign pattern
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-EmptyStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseDoWhileStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 1073744977 /* DoKeyword */);
    var body = parseIterationStatement(parser, context);
    expect(parser, context, 1073744994 /* WhileKeyword */);
    expect(parser, context, 33570827 /* LeftParen */);
    var test = parseExpression(parser, context | 262144 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    consume(parser, context, 301990417 /* Semicolon */);
    return finishNode(context, parser, pos, {
        type: 'DoWhileStatement',
        body: body,
        test: test
    });
}
/**
 * Parses while statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-WhileStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseWhileStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 1073744994 /* WhileKeyword */);
    expect(parser, context, 33570827 /* LeftParen */);
    var test = parseExpression(parser, context | 262144 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    var body = parseIterationStatement(parser, context);
    return finishNode(context, parser, pos, {
        type: 'WhileStatement',
        test: test,
        body: body
    });
}
/**
 * Parses block statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Block)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseBlockStatement(parser, context) {
    var pos = getLocation(parser);
    var body = [];
    expect(parser, context, 16793612 /* LeftBrace */);
    while (parser.token !== 301990415 /* RightBrace */) {
        body.push(parseStatementListItem(parser, context));
    }
    expect(parser, context, 301990415 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'BlockStatement',
        body: body
    });
}
/**
 * Parses return statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ReturnStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseReturnStatement(parser, context) {
    var pos = getLocation(parser);
    if (!(context & (128 /* OptionsGlobalReturn */ | 8388608 /* InFunctionBody */))) {
        tolerant(parser, context, 16 /* IllegalReturn */);
    }
    expect(parser, context, 3164 /* ReturnKeyword */);
    var argument = !(parser.token & 268435456 /* ASI */) && !(parser.flags & 1 /* NewLine */) ?
        parseExpression(parser, context & ~8388608 /* InFunctionBody */ | 262144 /* AllowIn */) :
        null;
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ReturnStatement',
        argument: argument
    });
}
/**
 * Sets the necessary mutable parser flags. The parser flags will
 * be unset after done parsing out the statements.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-IterationStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseIterationStatement(parser, context) {
    // Note: We are deviating from the original grammar here beauce the original grammar says that the
    // 'iterationStatement' should return either'for', 'do' or 'while' statements. We are doing some
    // bitfiddling before and after to modify the parser state before we let the 'parseStatement'
    // return the mentioned statements (to match the original grammar).
    var savedFlags = parser.flags;
    parser.flags |= 32 /* Iteration */;
    var body = parseStatement(parser, context & ~16777216 /* AllowSingleStatement */);
    parser.flags = savedFlags;
    return body;
}
/**
 * Parses with statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-WithStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseWithStatement(parser, context) {
    if (context & 16384 /* Strict */)
        { tolerant(parser, context, 36 /* StrictModeWith */); }
    var pos = getLocation(parser);
    expect(parser, context, 3171 /* WithKeyword */);
    expect(parser, context, 33570827 /* LeftParen */);
    var object = parseExpression(parser, context |= 262144 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    var body = parseStatement(parser, context & ~16777216 /* AllowSingleStatement */);
    return finishNode(context, parser, pos, {
        type: 'WithStatement',
        object: object,
        body: body
    });
}
/**
 * Parses switch statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SwitchStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseSwitchStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 19550 /* SwitchKeyword */);
    expect(parser, context, 33570827 /* LeftParen */);
    var discriminant = parseExpression(parser, context | 262144 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    expect(parser, context, 16793612 /* LeftBrace */);
    var cases = [];
    var savedFlags = parser.flags;
    parser.flags |= 16 /* Switch */;
    while (parser.token !== 301990415 /* RightBrace */) {
        cases.push(parseCaseOrDefaultClauses(parser, context));
    }
    parser.flags = savedFlags;
    expect(parser, context, 301990415 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'SwitchStatement',
        discriminant: discriminant,
        cases: cases
    });
}
/**
 * Parses either default clause or case clauses
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CaseClauses)
 * @see [Link](https://tc39.github.io/ecma262/#prod-DefaultClause)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseCaseOrDefaultClauses(parser, context) {
    var pos = getLocation(parser);
    var seenDefault = consume(parser, context, 3152 /* DefaultKeyword */);
    var test = !seenDefault && consume(parser, context, 3147 /* CaseKeyword */)
        ? parseExpression(parser, context | 262144 /* AllowIn */) : null;
    expect(parser, context, 33554453 /* Colon */);
    var consequent = [];
    while (!isEndOfCaseOrDefaultClauses(parser)) {
        consequent.push(parseStatementListItem(parser, context | 262144 /* AllowIn */));
        if (parser.token === 3152 /* DefaultKeyword */) {
            if (seenDefault)
                { tolerant(parser, context, 31 /* MultipleDefaultsInSwitch */); }
            seenDefault = true;
        }
    }
    return finishNode(context, parser, pos, {
        type: 'SwitchCase',
        test: test,
        consequent: consequent
    });
}
/**
 * Parses variable statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseVariableStatement(parser, context, shouldConsume) {
    if ( shouldConsume === void 0 ) shouldConsume = true;

    var pos = getLocation(parser);
    var token = parser.token;
    var isConst = token === 19529;
    nextToken(parser, context);
    var declarations = parseVariableDeclarationList(parser, context, isConst);
    // Only consume semicolons if not inside the 'ForStatement' production
    if (shouldConsume)
        { consumeSemicolon(parser, context); }
    return finishNode(context, parser, pos, {
        type: 'VariableDeclaration',
        kind: tokenDesc(token),
        declarations: declarations
    });
}
/**
 * Parses either an lexical declaration (let) or an expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseLetOrExpressionStatement(parser, context, shouldConsume) {
    if ( shouldConsume === void 0 ) shouldConsume = true;

    return lookahead(parser, context, isLexical) ?
        parseVariableStatement(parser, context | 33554432 /* BlockScope */, shouldConsume) :
        parseExpressionOrLabelledStatement(parser, context);
}
/**
 * Parses either async function declaration or statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAsyncFunctionDeclarationOrStatement(parser, context) {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
        parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context) :
        parseStatement(parser, context);
}
/**
 * Parses either For, ForIn or ForOf statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-statement)
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseForStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 1073744982 /* ForKeyword */);
    var awaitToken = !!(context & 524288 /* Async */ && consume(parser, context, 69231725 /* AwaitKeyword */));
    expect(parser, context, 33570827 /* LeftParen */);
    var token = parser.token;
    var init = null;
    var sequencePos = null;
    var variableStatement = null;
    var type = 'ForStatement';
    var test = null;
    var update = null;
    var right;
    // TODO! Scoping
    if (token === 19529 /* ConstKeyword */ || (token === 21576 /* LetKeyword */ && lookahead(parser, context, isLexical))) {
        variableStatement = parseVariableStatement(parser, context & ~262144 /* AllowIn */ | 33554432 /* BlockScope */, /* shouldConsume */ false);
    }
    else if (token === 19527 /* VarKeyword */) {
        variableStatement = parseVariableStatement(parser, context & ~262144 /* AllowIn */, /* shouldConsume */ false);
    }
    else if (token !== 301990417 /* Semicolon */) {
        sequencePos = getLocation(parser);
        init = restoreExpressionCoverGrammar(parser, context & ~262144 /* AllowIn */, parseAssignmentExpression);
    }
    if (consume(parser, context, 536880242 /* OfKeyword */)) {
        type = 'ForOfStatement';
        if (init) {
            if (!(parser.flags & 4 /* AllowDestructuring */) || init.type === 'AssignmentExpression') {
                tolerant(parser, context, 76 /* InvalidDestructuringTarget */);
            }
            reinterpret(parser, context, init);
        }
        else
            { init = variableStatement; }
        right = parseAssignmentExpression(parser, context | 262144 /* AllowIn */);
    }
    else if (consume(parser, context, 537022257 /* InKeyword */)) {
        if (init) {
            if (!(parser.flags & 4 /* AllowDestructuring */))
                { tolerant(parser, context, 76 /* InvalidDestructuringTarget */); }
            reinterpret(parser, context, init);
        }
        else
            { init = variableStatement; }
        type = 'ForInStatement';
        right = parseExpression(parser, context | 262144 /* AllowIn */);
    }
    else {
        if (parser.token === 33554450 /* Comma */)
            { init = parseSequenceExpression(parser, context, init, sequencePos); }
        if (variableStatement)
            { init = variableStatement; }
        expect(parser, context, 301990417 /* Semicolon */);
        test = parser.token !== 301990417 /* Semicolon */ ? parseExpression(parser, context | 262144 /* AllowIn */) : null;
        expect(parser, context, 301990417 /* Semicolon */);
        update = parser.token !== 16 /* RightParen */ ? parseExpression(parser, context | 262144 /* AllowIn */) : null;
    }
    expect(parser, context, 16 /* RightParen */);
    var body = parseIterationStatement(parser, context);
    return finishNode(context, parser, pos, type === 'ForOfStatement' ? {
        type: type,
        body: body,
        left: init,
        right: right,
        await: awaitToken,
    } : right ? {
        type: type,
        body: body,
        left: init,
        right: right
    } : {
        type: type,
        body: body,
        init: init,
        test: test,
        update: update
    });
}

// 15.2 Modules
/**
 * Parse module item list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItemList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseModuleItemList(parser, context) {
    // Prime the scanner
    nextToken(parser, context);
    var statements = [];
    while (parser.token !== 268435456 /* EndOfSource */) {
        statements.push(parser.token === 16387 /* StringLiteral */ ?
            parseDirective(parser, context) :
            parseModuleItem(parser, context | 262144 /* AllowIn */));
    }
    return statements;
}
/**
 * Parse module item
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItem)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseModuleItem(parser, context) {
    switch (parser.token) {
        // ExportDeclaration
        case 3155 /* ExportKeyword */:
            return parseExportDeclaration(parser, context);
        // ImportDeclaration
        case 19546 /* ImportKeyword */:
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
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseExportDeclaration(parser, context) {
    var pos = getLocation(parser);
    var specifiers = [];
    var source = null;
    var declaration = null;
    expect(parser, context, 3155 /* ExportKeyword */);
    switch (parser.token) {
        // export * FromClause ;
        case 150067 /* Multiply */:
            return parseExportAllDeclaration(parser, context, pos);
        case 3152 /* DefaultKeyword */:
            return parseExportDefault(parser, context, pos);
        case 16793612 /* LeftBrace */:
            {
                // export ExportClause FromClause ;
                // export ExportClause ;
                expect(parser, context, 16793612 /* LeftBrace */);
                var hasReservedWord = false;
                while (parser.token !== 301990415 /* RightBrace */) {
                    if (parser.token & 3072 /* Reserved */) {
                        hasReservedWord = true;
                        recordError(parser);
                    }
                    specifiers.push(parseNamedExportDeclaration(parser, context));
                    if (parser.token !== 301990415 /* RightBrace */)
                        { expect(parser, context, 33554450 /* Comma */); }
                }
                expect(parser, context, 301990415 /* RightBrace */);
                if (parser.token === 9329 /* FromKeyword */) {
                    source = parseModuleSpecifier(parser, context);
                }
                else if (hasReservedWord) {
                    tolerant(parser, context, 46 /* UnexpectedReserved */);
                }
                consumeSemicolon(parser, context);
                break;
            }
        // export ClassDeclaration
        case 19533 /* ClassKeyword */:
            declaration = (parseClassDeclaration(parser, context));
            break;
        // export LexicalDeclaration
        case 19529 /* ConstKeyword */:
            declaration = parseVariableStatement(parser, context);
            break;
        // export LexicalDeclaration
        case 21576 /* LetKeyword */:
            declaration = parseVariableStatement(parser, context);
            break;
        // export VariableDeclaration
        case 19527 /* VarKeyword */:
            declaration = parseVariableStatement(parser, context);
            break;
        // export HoistableDeclaration
        case 19544 /* FunctionKeyword */:
            declaration = parseFunctionDeclaration(parser, context);
            break;
        // export HoistableDeclaration
        case 4203628 /* AsyncKeyword */:
            if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
                declaration = parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context);
                break;
            }
        // Falls through
        default:
            report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    return finishNode(context, parser, pos, {
        type: 'ExportNamedDeclaration',
        source: source,
        specifiers: specifiers,
        declaration: declaration
    });
}
/**
 * Parse export all declaration
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseExportAllDeclaration(parser, context, pos) {
    expect(parser, context, 150067 /* Multiply */);
    var source = parseModuleSpecifier(parser, context);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ExportAllDeclaration',
        source: source
    });
}
/**
 * Parse named export declaration
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseNamedExportDeclaration(parser, context) {
    var pos = getLocation(parser);
    // ExportSpecifier :
    // IdentifierName
    // IdentifierName as IdentifierName
    var local = parseIdentifierName(parser, context, parser.token);
    var exported = consume(parser, context, 9323 /* AsKeyword */)
        ? parseIdentifierName(parser, context, parser.token)
        : local;
    return finishNode(context, parser, pos, {
        type: 'ExportSpecifier',
        local: local,
        exported: exported
    });
}
/**
 * Parse export default
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 * @param pos Location
 */
function parseExportDefault(parser, context, pos) {
    expect(parser, context, 3152 /* DefaultKeyword */);
    var declaration;
    switch (parser.token) {
        // export default HoistableDeclaration[Default]
        case 19544 /* FunctionKeyword */:
            declaration = parseFunctionDeclaration(parser, context | 134217728 /* RequireIdentifier */);
            break;
        // export default ClassDeclaration[Default]
        case 19533 /* ClassKeyword */:
            declaration = parseClassDeclaration(parser, context & ~262144 /* AllowIn */ | 134217728 /* RequireIdentifier */);
            break;
        // export default HoistableDeclaration[Default]
        case 4203628 /* AsyncKeyword */:
            declaration = parseAsyncFunctionOrAssignmentExpression(parser, context | 134217728 /* RequireIdentifier */);
            break;
        default:
            {
                // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
                declaration = parseAssignmentExpression(parser, context | 262144 /* AllowIn */);
                consumeSemicolon(parser, context);
            }
    }
    return finishNode(context, parser, pos, {
        type: 'ExportDefaultDeclaration',
        declaration: declaration
    });
}
/**
 * Parse import declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseImportDeclaration(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 19546 /* ImportKeyword */);
    var source;
    var specifiers = [];
    // 'import' ModuleSpecifier ';'
    if (parser.token === 16387 /* StringLiteral */) {
        source = parseLiteral(parser, context);
    }
    else {
        specifiers = parseImportClause(parser, context);
        source = parseModuleSpecifier(parser, context);
    }
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ImportDeclaration',
        specifiers: specifiers,
        source: source
    });
}
/**
 * Parse import clause
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportClause)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseImportClause(parser, context) {
    var specifiers = [];
    switch (parser.token) {
        // 'import' ModuleSpecifier ';'
        case 67125249 /* Identifier */:
            {
                specifiers.push(parseImportDefaultSpecifier(parser, context));
                if (consume(parser, context, 33554450 /* Comma */)) {
                    switch (parser.token) {
                        // import a, * as foo
                        case 150067 /* Multiply */:
                            parseImportNamespaceSpecifier(parser, context, specifiers);
                            break;
                        // import a, {bar}
                        case 16793612 /* LeftBrace */:
                            parseNamedImports(parser, context, specifiers);
                            break;
                        default:
                            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
                    }
                }
                break;
            }
        // import {bar}
        case 16793612 /* LeftBrace */:
            parseNamedImports(parser, context, specifiers);
            break;
        // import * as foo
        case 150067 /* Multiply */:
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
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseNamedImports(parser, context, specifiers) {
    expect(parser, context, 16793612 /* LeftBrace */);
    while (parser.token !== 301990415 /* RightBrace */) {
        // only accepts identifiers or keywords
        specifiers.push(parseImportSpecifier(parser, context));
        if (parser.token !== 301990415 /* RightBrace */) {
            expect(parser, context, 33554450 /* Comma */);
        }
    }
    expect(parser, context, 301990415 /* RightBrace */);
}
/**
 * Parse import specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportSpecifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseImportSpecifier(parser, context) {
    var pos = getLocation(parser);
    var token = parser.token;
    var imported = parseIdentifierName(parser, context, token);
    var local;
    if (parser.token === 9323 /* AsKeyword */) {
        expect(parser, context, 9323 /* AsKeyword */);
        local = parseBindingIdentifier(parser, context);
    }
    else {
        if ((token & 3072 /* Reserved */) === 3072 /* Reserved */) {
            tolerant(parser, context, 46 /* UnexpectedReserved */);
        }
        if ((token & 134217728 /* IsEvalOrArguments */) === 134217728 /* IsEvalOrArguments */) {
            tolerant(parser, context, 47 /* StrictEvalArguments */);
        }
        local = imported;
    }
    return finishNode(context, parser, pos, {
        type: 'ImportSpecifier',
        local: local,
        imported: imported
    });
}
/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NameSpaceImport)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseImportNamespaceSpecifier(parser, context, specifiers) {
    var pos = getLocation(parser);
    expect(parser, context, 150067 /* Multiply */);
    expect(parser, context, 9323 /* AsKeyword */, 86 /* UnexpectedAsBinding */);
    var local = parseBindingIdentifier(parser, context);
    specifiers.push(finishNode(context, parser, pos, {
        type: 'ImportNamespaceSpecifier',
        local: local
    }));
}
/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseModuleSpecifier(parser, context) {
    expect(parser, context, 9329 /* FromKeyword */);
    if (parser.token !== 16387 /* StringLiteral */)
        { report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
    return parseLiteral(parser, context);
}
/**
 * Parse import default specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseImportDefaultSpecifier(parser, context) {
    return finishNode(context, parser, getLocation(parser), {
        type: 'ImportDefaultSpecifier',
        local: parseIdentifier(parser, context)
    });
}
/**
 * Parses either async function or assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAsyncFunctionOrAssignmentExpression(parser, context) {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
        parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context | 134217728 /* RequireIdentifier */) :
        parseAssignmentExpression(parser, context | 262144 /* AllowIn */);
}

/**
 * Creates the parser object
 *
 * @param source The source coode to parser
 * @param sourceFile Optional source file info to be attached in every node
 * @param delegate  Optional callback function to be invoked for each syntax node (as the node is constructed)
 */
function createParser(source, sourceFile, delegate) {
    return {
        // The source code to parse
        source: source,
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
        token: 268435456 /* EndOfSource */,
        tokenRaw: '',
        lastValue: 0,
        numCapturingParens: 0,
        maxBackReference: 0,
        comments: [],
        sourceFile: sourceFile,
        tokenRegExp: undefined,
        tokenValue: undefined,
        labelSet: undefined,
        errorLocation: undefined,
        delegate: delegate,
        errors: []
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
    var sourceFile = '';
    var delegate;
    if (!!options) {
        // The flag to enable stage 3 support (ESNext)
        if (options.next)
            { context |= 1 /* OptionsNext */; }
        // The flag to enable React JSX parsing
        if (options.jsx)
            { context |= 4 /* OptionsJSX */; }
        // The flag to enable start and end offsets to each node
        if (options.ranges)
            { context |= 2 /* OptionsRanges */; }
        // The flag to enable line/column location information to each node
        if (options.loc)
            { context |= 16 /* OptionsLoc */; }
        // The flag to attach raw property to each literal node
        if (options.raw)
            { context |= 8 /* OptionsRaw */; }
        // The flag to allow return in the global scope
        if (options.globalReturn)
            { context |= 128 /* OptionsGlobalReturn */; }
        // The flag to allow 'await' in the global scope
        if (options.globalAwait)
            { context |= 256 /* OptionsGlobalAwait */; }
        // The flag to allow to skip shebang - '#'
        if (options.skipShebang)
            { context |= 1024 /* OptionsShebang */; }
        // Attach raw property to each identifier node
        if (options.rawIdentifier)
            { context |= 2048 /* OptionsRawidentifiers */; }
        // Enable tolerant mode
        if (options.tolerant)
            { context |= 4096 /* OptionsTolerant */; }
        // Set to true to record the source file in every node's loc object when the loc option is set.
        if (!!options.source)
            { sourceFile = options.source; }
        // Create a top-level comments array containing all comments
        if (!!options.comments)
            { context |= 512 /* OptionsComments */; }
        // The flag to enable implied strict mode
        if (options.impliedStrict)
            { context |= 64 /* OptionsImpliedStrict */; }
        // The flag to set to bypass methods in Node
        if (options.node)
            { context |= 8192 /* OptionsNode */; }
        // Accepts a callback function to be invoked for each syntax node (as the node is constructed)
        if (typeof options.delegate === 'function') {
            context |= 32 /* OptionsDelegate */;
            delegate = options.delegate;
        }
    }
    var parser = createParser(source, sourceFile, delegate);
    var body = context & 32768 /* Module */ ? parseModuleItemList(parser, context) : parseStatementList(parser, context);
    var node = {
        type: 'Program',
        sourceType: context & 32768 /* Module */ ? 'module' : 'script',
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
                column: parser.column
            }
        };
        if (sourceFile)
            { node.loc.source = sourceFile; }
    }
    if (context & 512 /* OptionsComments */)
        { node.comments = parser.comments; }
    if (context & 4096 /* OptionsTolerant */)
        { node.errors = parser.errors; }
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
    var statements = [];
    nextToken(parser, context);
    while (parser.token === 16387 /* StringLiteral */) {
        var item = parseDirective(parser, context);
        statements.push(item);
        if (!isPrologueDirective(item))
            { break; }
        if (item.expression.value === 'use strict') {
            context |= 16384 /* Strict */;
        }
    }
    while (parser.token !== 268435456 /* EndOfSource */) {
        statements.push(parseStatementListItem(parser, context));
    }
    return statements;
}



var estree = Object.freeze({

});



var index = Object.freeze({
	parseClassDeclaration: parseClassDeclaration,
	parseFunctionDeclaration: parseFunctionDeclaration,
	parseAsyncFunctionOrAsyncGeneratorDeclaration: parseAsyncFunctionOrAsyncGeneratorDeclaration,
	parseVariableDeclarationList: parseVariableDeclarationList,
	parseExpression: parseExpression,
	parseSequenceExpression: parseSequenceExpression,
	parseAssignmentExpression: parseAssignmentExpression,
	parseRestElement: parseRestElement,
	parseLeftHandSideExpression: parseLeftHandSideExpression,
	parsePrimaryExpression: parsePrimaryExpression,
	parseIdentifier: parseIdentifier,
	parseLiteral: parseLiteral,
	parseBigIntLiteral: parseBigIntLiteral,
	parseIdentifierName: parseIdentifierName,
	parseFunctionExpression: parseFunctionExpression,
	parseAsyncFunctionOrAsyncGeneratorExpression: parseAsyncFunctionOrAsyncGeneratorExpression,
	parsePropertyName: parsePropertyName,
	parseObjectLiteral: parseObjectLiteral,
	parseFormalListAndBody: parseFormalListAndBody,
	parseFunctionBody: parseFunctionBody,
	parseFormalParameters: parseFormalParameters,
	parseFormalParameterList: parseFormalParameterList,
	parseClassBodyAndElementList: parseClassBodyAndElementList,
	parseClassElement: parseClassElement,
	parseModuleItemList: parseModuleItemList,
	parseModuleItem: parseModuleItem,
	parseExportDeclaration: parseExportDeclaration,
	parseImportDeclaration: parseImportDeclaration,
	createParser: createParser,
	parse: parse,
	parseStatementList: parseStatementList,
	parseBindingIdentifierOrPattern: parseBindingIdentifierOrPattern,
	parseBindingIdentifier: parseBindingIdentifier,
	parseAssignmentPattern: parseAssignmentPattern,
	parseStatementListItem: parseStatementListItem,
	parseStatement: parseStatement,
	parseEmptyStatement: parseEmptyStatement,
	parseContinueStatement: parseContinueStatement,
	parseBreakStatement: parseBreakStatement,
	parseIfStatement: parseIfStatement,
	parseDebuggerStatement: parseDebuggerStatement,
	parseTryStatement: parseTryStatement,
	parseCatchBlock: parseCatchBlock,
	parseThrowStatement: parseThrowStatement,
	parseExpressionStatement: parseExpressionStatement,
	parseExpressionOrLabelledStatement: parseExpressionOrLabelledStatement,
	parseDoWhileStatement: parseDoWhileStatement,
	parseWhileStatement: parseWhileStatement,
	parseBlockStatement: parseBlockStatement,
	parseReturnStatement: parseReturnStatement,
	parseIterationStatement: parseIterationStatement,
	parseWithStatement: parseWithStatement,
	parseSwitchStatement: parseSwitchStatement,
	parseCaseOrDefaultClauses: parseCaseOrDefaultClauses,
	parseVariableStatement: parseVariableStatement
});

/**
 * Parse script code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 *
 * @param source  source code to parse
 * @param options parser options
 */
function parseScript(source, options) {
    return parse(source, options, 0 /* Empty */);
}
/**
 * Parse module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source  source code to parse
 * @param options parser options
 */
function parseModule(source, options) {
    return parse(source, options, 16384 /* Strict */ | 32768 /* Module */);
}
var version = '1.4.0';

export { parseScript, parseModule, version, estree as ESTree, index as Parser, skipSingleLineComment, skipMultiLineComment, addComment, ErrorMessages, constructError, report, tolerant, scan$1 as scan, scanHexIntegerLiteral, scanOctalOrBinary, scanImplicitOctalDigits, scanSignedInteger, scanNumericLiteral, scanNumericSeparator, scanDecimalDigitsOrSeparator, scanDecimalAsSmi, scanIdentifier, scanString, consumeTemplateBrace, scanTemplate, scanRegularExpression, tokenDesc, descKeyword, isValidIdentifierPart, isValidIdentifierStart, mustEscape, validateBreakOrContinueLabel, addLabel, popLabel, hasLabel, finishNode, isIdentifierPart, expect, consume, nextToken, hasBit, scanPrivateName, consumeSemicolon, parseExpressionCoverGrammar, restoreExpressionCoverGrammar, swapContext, hasNext, advance, advanceOnMaybeAstral, nextChar, nextUnicodeChar, validateParams, reinterpret, advanceAndOrSkipUC, consumeOpt, consumeLineFeed, advanceNewline, fromCodePoint, toHex, storeRaw, lookahead, escapeForPrinting, isValidSimpleAssignmentTarget, getLocation, isIdentifier, isLexical, isEndOfCaseOrDefaultClauses, nextTokenIsLeftParenOrPeriod, nextTokenisIdentifierOrParen, nextTokenIsLeftParen, nextTokenIsFuncKeywordOnSameLine, isPropertyWithPrivateFieldKey, isPrologueDirective, parseAndDisallowDestructuringAndBinding, parseAndValidateIdentifier, parseDirective, isEvalOrArguments, recordError, readNext };
