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
    'eval', 'arguments', 'enum', 'BigInt', '@', 'JSXText'
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
    this: { value: 77919 /* ThisKeyword */ },
    function: { value: 77912 /* FunctionKeyword */ },
    if: { value: 12377 /* IfKeyword */ },
    return: { value: 12380 /* ReturnKeyword */ },
    var: { value: 77895 /* VarKeyword */ },
    else: { value: 12370 /* ElseKeyword */ },
    for: { value: 12374 /* ForKeyword */ },
    new: { value: 77915 /* NewKeyword */ },
    in: { value: 1074083633 /* InKeyword */ },
    typeof: { value: 602154 /* TypeofKeyword */ },
    while: { value: 12402 /* WhileKeyword */ },
    case: { value: 12363 /* CaseKeyword */ },
    break: { value: 12362 /* BreakKeyword */ },
    try: { value: 12385 /* TryKeyword */ },
    catch: { value: 12364 /* CatchKeyword */ },
    delete: { value: 602155 /* DeleteKeyword */ },
    throw: { value: 602208 /* ThrowKeyword */ },
    switch: { value: 77918 /* SwitchKeyword */ },
    continue: { value: 12366 /* ContinueKeyword */ },
    default: { value: 12368 /* DefaultKeyword */ },
    instanceof: { value: 341810 /* InstanceofKeyword */ },
    do: { value: 12369 /* DoKeyword */ },
    void: { value: 602156 /* VoidKeyword */ },
    finally: { value: 12373 /* FinallyKeyword */ },
    arguments: { value: 402718837 /* Arguments */ },
    as: { value: 36971 /* AsKeyword */ },
    async: { value: 8425580 /* AsyncKeyword */ },
    await: { value: 138514541 /* AwaitKeyword */ },
    class: { value: 77901 /* ClassKeyword */ },
    const: { value: 77897 /* ConstKeyword */ },
    constructor: { value: 36974 /* ConstructorKeyword */ },
    debugger: { value: 12367 /* DebuggerKeyword */ },
    enum: { value: 12406 /* EnumKeyword */ },
    eval: { value: 402718836 /* Eval */ },
    export: { value: 12371 /* ExportKeyword */ },
    extends: { value: 12372 /* ExtendsKeyword */ },
    false: { value: 77829 /* FalseKeyword */ },
    from: { value: 36977 /* FromKeyword */ },
    get: { value: 36975 /* GetKeyword */ },
    implements: { value: 20579 /* ImplementsKeyword */ },
    import: { value: 77914 /* ImportKeyword */ },
    interface: { value: 20580 /* InterfaceKeyword */ },
    let: { value: 86088 /* LetKeyword */ },
    null: { value: 77831 /* NullKeyword */ },
    of: { value: 1073778802 /* OfKeyword */ },
    package: { value: 20581 /* PackageKeyword */ },
    private: { value: 20582 /* PrivateKeyword */ },
    protected: { value: 20583 /* ProtectedKeyword */ },
    public: { value: 20584 /* PublicKeyword */ },
    set: { value: 36976 /* SetKeyword */ },
    static: { value: 20585 /* StaticKeyword */ },
    super: { value: 77917 /* SuperKeyword */ },
    true: { value: 77830 /* TrueKeyword */ },
    with: { value: 12387 /* WithKeyword */ },
    yield: { value: 2183274 /* YieldKeyword */ },
});
function descKeyword(value) {
    return (DescKeywordTable[value] | 0);
}

var ErrorMessages = {};
ErrorMessages[0 /* Unexpected */] = 'Unexpected token';
ErrorMessages[1 /* UnexpectedToken */] = 'Unexpected token \'%0\'';
ErrorMessages[2 /* UnexpectedEscapedKeyword */] = 'Unexpected escaped keyword \'%0\'';
ErrorMessages[3 /* UnexpectedKeyword */] = 'Keyword \'%0\' is reserved';
ErrorMessages[4 /* InvalidLHSInAssignment */] = 'Invalid left-hand side in assignment';
ErrorMessages[5 /* UnterminatedString */] = 'Unterminated string literal';
ErrorMessages[6 /* UnterminatedRegExp */] = 'Unterminated regular expression literal';
ErrorMessages[7 /* UnterminatedComment */] = 'Unterminated MultiLineComment';
ErrorMessages[8 /* UnterminatedTemplate */] = 'Unterminated template literal';
ErrorMessages[9 /* UnexpectedChar */] = 'Invalid character \'%0\'';
ErrorMessages[10 /* StrictOctalEscape */] = 'Octal escapes are not allowed in strict mode';
ErrorMessages[11 /* InvalidEightAndNine */] = 'Escapes \\8 or \\9 are not syntactically valid escapes';
ErrorMessages[12 /* InvalidHexEscapeSequence */] = 'Invalid hexadecimal escape sequence';
ErrorMessages[13 /* UnicodeOutOfRange */] = 'Unicode escape code point out of range';
ErrorMessages[14 /* DuplicateRegExpFlag */] = 'Duplicate regular expression flag \'%0\'';
ErrorMessages[15 /* UnexpectedTokenRegExpFlag */] = 'Unexpected regular expression flag \'%0\'';
ErrorMessages[16 /* StrictLHSAssignment */] = 'Eval or arguments can\'t be assigned to in strict mode code';
ErrorMessages[17 /* IllegalReturn */] = 'Illegal return statement';
ErrorMessages[18 /* StrictFunction */] = 'In strict mode code, functions can only be declared at top level or inside a block';
ErrorMessages[19 /* SloppyFunction */] = 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement';
ErrorMessages[20 /* ForbiddenAsStatement */] = '%0 can\'t appear in single-statement context';
ErrorMessages[21 /* GeneratorInSingleStatementContext */] = 'Generators can only be declared at the top level or inside a block';
ErrorMessages[22 /* ForAwaitNotOf */] = '\'for await\' loop should be used with \'of\'';
ErrorMessages[23 /* DeclarationMissingInitializer */] = 'Missing initializer in %0 declaration';
ErrorMessages[24 /* ForInOfLoopInitializer */] = '\'for-%0\' loop variable declaration may not have an initializer';
ErrorMessages[25 /* ForInOfLoopMultiBindings */] = 'Invalid left-hand side in for-%0 loop: Must have a single binding.';
ErrorMessages[26 /* LetInLexicalBinding */] = 'let is disallowed as a lexically bound name';
ErrorMessages[27 /* UnexpectedLexicalDeclaration */] = 'Lexical declaration cannot appear in a single-statement context';
ErrorMessages[28 /* LabelRedeclaration */] = 'Label \'%0\' has already been declared';
ErrorMessages[29 /* InvalidNestedStatement */] = '%0  statement must be nested within an iteration statement';
ErrorMessages[30 /* IllegalContinue */] = 'Illegal continue statement: \'%0\' does not denote an iteration statement';
ErrorMessages[31 /* UnknownLabel */] = 'Undefined label \'%0\'';
ErrorMessages[32 /* MultipleDefaultsInSwitch */] = 'More than one default clause in switch statement';
ErrorMessages[34 /* ExportDeclAtTopLevel */] = 'Export declarations may only appear at top level of a module';
ErrorMessages[33 /* ImportDeclAtTopLevel */] = 'Import declarations may only appear at top level of a module';
ErrorMessages[35 /* AsyncFunctionInSingleStatementContext */] = 'Async functions can only be declared at the top level or inside a block';
ErrorMessages[36 /* LineBreakAfterAsync */] = 'No line break is allowed after async';
ErrorMessages[37 /* StrictModeWith */] = 'Strict mode code may not include a with statement';
ErrorMessages[38 /* AwaitOutsideAsync */] = 'Await is only valid in async functions';
ErrorMessages[39 /* UnNamedFunctionDecl */] = 'Function declaration must have a name in this context';
ErrorMessages[40 /* DisallowedInContext */] = '\'%0\' may not be used as an identifier in this context';
ErrorMessages[41 /* PrivateFieldConstructor */] = 'Classes may not have a private field named \'#constructor\'';
ErrorMessages[42 /* PublicFieldConstructor */] = 'Classes may not have a field named \'constructor\'';
ErrorMessages[43 /* StrictDelete */] = 'Delete of an unqualified identifier in strict mode';
ErrorMessages[44 /* DeletePrivateField */] = 'Private fields can not be deleted';
ErrorMessages[45 /* ConstructorIsGenerator */] = 'Class constructor may not be a generator';
ErrorMessages[46 /* ConstructorSpecialMethod */] = 'Class constructor may not be an accessor';
ErrorMessages[47 /* UnexpectedReserved */] = 'Unexpected reserved word';
ErrorMessages[48 /* StrictEvalArguments */] = 'Unexpected eval or arguments in strict mode';
ErrorMessages[49 /* AwaitBindingIdentifier */] = '\'await\' is not a valid identifier inside an async function';
ErrorMessages[50 /* YieldBindingIdentifier */] = '\'yield\' is not a valid identifier inside an generator function';
ErrorMessages[51 /* UnexpectedStrictReserved */] = 'Unexpected strict mode reserved word';
ErrorMessages[53 /* AwaitInParameter */] = 'Await expression not allowed in formal parameter';
ErrorMessages[52 /* YieldInParameter */] = 'Yield expression not allowed in formal parameter';
ErrorMessages[54 /* MetaNotInFunctionBody */] = 'new.target only allowed within functions';
ErrorMessages[55 /* BadSuperCall */] = 'super() is not allowed in this context';
ErrorMessages[56 /* UnexpectedSuper */] = 'Member access from super not allowed in this context';
ErrorMessages[57 /* LoneSuper */] = 'Only "(" or "." or "[" are allowed after \'super\'';
ErrorMessages[58 /* YieldReservedKeyword */] = '\'yield\' is a reserved keyword within generator function bodies';
ErrorMessages[59 /* ContinuousNumericSeparator */] = 'Only one underscore is allowed as numeric separator';
ErrorMessages[60 /* TrailingNumericSeparator */] = 'Numeric separators are not allowed at the end of numeric literals';
ErrorMessages[61 /* ZeroDigitNumericSeparator */] = 'Numeric separator can not be used after leading 0.';
ErrorMessages[62 /* StrictOctalLiteral */] = 'Legacy octal literals are not allowed in strict mode';
ErrorMessages[63 /* InvalidOrUnexpectedToken */] = 'Invalid or unexpected token';
ErrorMessages[64 /* InvalidLhsInAssignment */] = 'Invalid left-hand side in assignment';
ErrorMessages[65 /* DuplicateProto */] = 'Duplicate __proto__ fields are not allowed in object literals';
ErrorMessages[66 /* IllegalUseStrict */] = 'Illegal \'use strict\' directive in function with non-simple parameter list';
ErrorMessages[67 /* StaticPrototype */] = 'Classes may not have a static property named \'prototype\'';
ErrorMessages[68 /* BadImportCallArity */] = 'Unexpected token';
ErrorMessages[69 /* BadGetterArity */] = 'Getter must not have any formal parameters';
ErrorMessages[70 /* BadSetterArity */] = 'Setter must have exactly one formal parameter';
ErrorMessages[71 /* BadSetterRestParameter */] = 'Setter function argument must not be a rest parameter';
ErrorMessages[72 /* StrictLHSPrefixPostFix */] = '%0 increment/decrement may not have eval or arguments operand in strict mode';
ErrorMessages[36 /* LineBreakAfterAsync */] = 'No line break is allowed after async';
ErrorMessages[73 /* InvalidElisonInObjPropList */] = 'Elision not allowed in object property list';
ErrorMessages[74 /* ElementAfterRest */] = 'Rest element must be last element';
ErrorMessages[76 /* ElementAfterSpread */] = 'Spread element must be last element';
ErrorMessages[75 /* RestDefaultInitializer */] = 'Rest parameter may not have a default initializer';
ErrorMessages[77 /* InvalidDestructuringTarget */] = 'Invalid destructuring assignment target';
ErrorMessages[78 /* UnexpectedSurrogate */] = 'Unexpected surrogate pair';
ErrorMessages[79 /* InvalidUnicodeEscapeSequence */] = 'Invalid Unicode escape sequence';
ErrorMessages[80 /* TemplateOctalLiteral */] = 'Template literals may not contain octal escape sequences';
ErrorMessages[81 /* NotBindable */] = 'Invalid binding pattern';
ErrorMessages[82 /* ParamAfterRest */] = 'Rest parameter must be last formal parameter';
ErrorMessages[83 /* LineBreakAfterArrow */] = 'No line break is allowed after \'=>\'';
ErrorMessages[84 /* NoCatchOrFinally */] = 'Missing catch or finally after try';
ErrorMessages[85 /* NewlineAfterThrow */] = 'Illegal newline after throw';
ErrorMessages[86 /* ParamDupe */] = 'Duplicate parameter name not allowed in this context';
ErrorMessages[87 /* UnexpectedAsBinding */] = 'Unexpected token \'%0\' before imported binding name';
ErrorMessages[88 /* LabelNoColon */] = 'Labels must be followed by a \':\'';
ErrorMessages[89 /* NonEmptyJSXExpression */] = 'JSX attributes must only be assigned a non-empty  \'expression\'';
ErrorMessages[90 /* ExpectedJSXClosingTag */] = 'Expected corresponding JSX closing tag for %0';
ErrorMessages[91 /* AdjacentJSXElements */] = 'Adjacent JSX elements must be wrapped in an enclosing tag';
ErrorMessages[92 /* InvalidJSXAttributeValue */] = 'Invalid JSX attribute value';
ErrorMessages[93 /* RestWithComma */] = 'Rest element may not have a trailing comma';
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
    if (context & 2048 /* OptionsTolerant */) {
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
 * @param parser Parser object
 * @param label label
 * @param isContinue true if validation continue statement
 */
function validateBreakOrContinueLabel(parser, context, label, isContinue) {
    var state = hasLabel(parser, label);
    if (!state)
        { tolerant(parser, context, 31 /* UnknownLabel */, label); }
    if (isContinue && !(state & 2 /* Nested */))
        { tolerant(parser, context, 30 /* IllegalContinue */, label); }
}
/**
 * Add label to the stack
 *
 * @param parser Parser object
 * @param label label
 */
function addLabel(parser, label) {
    if (parser.labelSet === undefined)
        { parser.labelSet = {}; }
    parser.labelSet['$' + label] = parser.token & 16 /* IsIterationStatement */ ? 2 /* Nested */ : 1 /* NotNested */;
}
/**
 * Remove label from the stack
 *
 * @param parser Parser object
 * @param label label
 */
function popLabel(parser, label) {
    parser.labelSet['$' + label] = 0 /* None */;
}
/**
 * Returns either true or false. Depends if the label exist.
 *
 * @param parser Parser object
 * @param label Label
 */
function hasLabel(parser, label) {
    return !parser.labelSet ? 0 /* None */ : parser.labelSet['$' + label];
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
function finishNode(context, parser, meta, node) {
    var lastIndex = parser.lastIndex;
    var lastLine = parser.lastLine;
    var lastColumn = parser.lastColumn;
    var sourceFile = parser.sourceFile;
    var index = parser.index;
    var delegate = parser.delegate;
    if (context & 2 /* OptionsRanges */) {
        node.start = meta.index;
        node.end = lastIndex;
    }
    if (context & 16 /* OptionsLoc */) {
        node.loc = {
            start: {
                line: meta.line,
                column: meta.column,
            },
            end: {
                line: lastLine,
                column: lastColumn
            }
        };
        if (sourceFile)
            { node.loc.source = sourceFile; }
    }
    if (context & 32 /* OptionsDelegate */)
        { delegate(node, meta.index, index); }
    return node;
}
/**
 * Returns true if this is a vlid identifier part
 *
 * @param parser Parser object
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
 * Consumes the next token. If the consumed token is not of the expected type
 * then report an error and return null. Otherwise return true.
 *
 * @param parser Parser object
 * @param context Context masks
 * @param t Token
 * @param Err Optionally error message to be thrown
 */
function expect(parser, context, t, err /* UnexpectedToken */) {
    if ( err === void 0 ) err = 1;

    if (parser.token !== t)
        { report(parser, err, tokenDesc(parser.token)); }
    nextToken(parser, context);
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
function consume(parser, context, t) {
    if (parser.token !== t)
        { return false; }
    nextToken(parser, context);
    return true;
}
/**
 * Advance and return the next token in the stream
 *
 * @param parser Parser object
 * @param context Context masks
 */
function nextToken(parser, context) {
    parser.lastIndex = parser.index;
    parser.lastLine = parser.line;
    parser.lastColumn = parser.column;
    return parser.token = scan(parser, context);
}
var hasBit = function (mask, flags) { return (mask & flags) === flags; };
/**
 * Scans private name. Stage 3 proposal related
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanPrivateName(parser, context) {
    if (!(context & 65536 /* InClass */) || !isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
        report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    return 115 /* Hash */;
}
/**
 * Automatic Semicolon Insertion
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function consumeSemicolon(parser, context) {
    var token = parser.token;
    if (token & 536870912 /* ASI */ || parser.flags & 1 /* NewLine */) { // EOF, '}', ';'
        return consume(parser, context, 603979793 /* Semicolon */);
    }
    report(parser, !(context & 262144 /* Async */) && token & 4194304 /* IsAwait */ ?
        38 /* AwaitOutsideAsync */ :
        1 /* UnexpectedToken */, tokenDesc(token));
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
    // Clear pending expression error
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
 * @param parser Parser object
 * @param context Context masks
 * @param state Modifier state
 * @param callback Callback function to be invoked
 * @param methodState Optional Objectstate.
 */
function swapContext(parser, context, state, callback, methodState /* None */) {
    if ( methodState === void 0 ) methodState = 0;

    context &= ~(262144 /* Async */ | 524288 /* Yield */ | 1048576 /* InParameter */);
    if (state & 1 /* Generator */)
        { context |= 524288 /* Yield */; }
    if (state & 2 /* Await */)
        { context |= 262144 /* Async */; }
    return callback(parser, context, methodState);
}
/**
 * Return the next codepoint in the stream
 *
 * @param parser Parser object
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
 * @param parser Parser object
 */
function nextChar(parser) {
    return parser.source.charCodeAt(parser.index);
}
/**
 * Return the next unicodechar in the stream
 *
 * @param parser Parser object
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
 * @param parser  Parser object
 * @param context Context masks
 * @param params Array of token values
 */
function validateParams(parser, context, params) {
    var paramSet = new Map();
    for (var i = 0; i < params.length; i++) {
        var key = '@' + params[i];
        if (paramSet.get(key)) {
            tolerant(parser, context, 86 /* ParamDupe */);
        }
        else
            { paramSet.set(key, true); }
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
                tolerant(parser, context, 75 /* RestDefaultInitializer */);
            }
            reinterpret(parser, context, node.argument);
            break;
        case 'AssignmentExpression':
            node.type = 'AssignmentPattern';
            delete node.operator; // operator is not relevant for assignment pattern
            reinterpret(parser, context, node.left); // recursive descent
            return;
        case 'MemberExpression':
            if (!(context & 1048576 /* InParameter */))
                { return; }
        // Fall through
        default:
            tolerant(parser, context, context & 1048576 /* InParameter */
                ? 81 /* NotBindable */
                : 77 /* InvalidDestructuringTarget */, node.type);
    }
};
/**
 * Consume an token in the scanner on match. This is an equalent to
 * 'consume' used in the parser code itself.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function consumeOpt(parser, code) {
    if (parser.source.charCodeAt(parser.index) !== code)
        { return false; }
    parser.index++;
    parser.column++;
    return true;
}
/**
 * Consumes line feed
 *
 * @param parser Parser object
 * @param state  Scanner state
 */
function consumeLineFeed(parser, state) {
    parser.flags |= 1 /* NewLine */;
    parser.index++;
    if ((state & 2 /* LastIsCR */) === 0) {
        parser.column = 0;
        parser.line++;
    }
}
/**
* Advance to new line
*
* @param parser Parser object
*/
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
/**
 * Does a lookahead.
 *
 * @param parser Parser object
 * @param context  Context masks
 * @param callback Callback function to be invoked
 */
function lookahead(parser, context, callback) {
    var tokenValue = parser.tokenValue;
    var flags = parser.flags;
    var line = parser.line;
    var column = parser.column;
    var startColumn = parser.startColumn;
    var index = parser.index;
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
/**
 * Returns true if this an valid simple assignment target
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function isValidSimpleAssignmentTarget(node) {
    return (node.type === 'Identifier' || node.type === 'MemberExpression') ? true : false;
}
/**
 * Get current node location
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function getLocation(parser) {
    return {
        line: parser.startLine,
        column: parser.startColumn,
        index: parser.startIndex,
    };
}
/**
 * Returns true if this is an valid identifier
 *
 * @param context  Context masks
 * @param t  Token
 */
function isValidIdentifier(context, t) {
    if (context & 8192 /* Strict */) {
        if (context & 16384 /* Module */ && t & 4194304 /* IsAwait */)
            { return false; }
        if (t & 2097152 /* IsYield */)
            { return false; }
        return (t & 134217728 /* IsIdentifier */) === 134217728 /* IsIdentifier */ ||
            (t & 36864 /* Contextual */) === 36864 /* Contextual */;
    }
    return (t & 134217728 /* IsIdentifier */) === 134217728 /* IsIdentifier */ ||
        (t & 36864 /* Contextual */) === 36864 /* Contextual */ ||
        (t & 20480 /* FutureReserved */) === 20480 /* FutureReserved */;
}
/**
 * Returns true if this an valid lexical binding and not an identifier
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function isLexical(parser, context) {
    nextToken(parser, context);
    var token = parser.token;
    return !!(token & (134217728 /* IsIdentifier */ | 33554432 /* IsBindingPattern */ | 2097152 /* IsYield */ | 4194304 /* IsAwait */) ||
        token === 86088 /* LetKeyword */ ||
        (token & 36864 /* Contextual */) === 36864 /* Contextual */);
}
/**
 * Returns true if this is end of case or default clauses
 *
 * @param parser Parser object
 */
function isEndOfCaseOrDefaultClauses(parser) {
    return parser.token === 12368 /* DefaultKeyword */ ||
        parser.token === 603979791 /* RightBrace */ ||
        parser.token === 12363 /* CaseKeyword */;
}
/**
 * Validates if the next token in the stream is a left paren or a period
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function nextTokenIsLeftParenOrPeriod(parser, context) {
    nextToken(parser, context);
    return parser.token === 67174411 /* LeftParen */ || parser.token === 67108877 /* Period */;
}
/**
 * Validates if the next token in the stream is a identifier or left paren
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function nextTokenisIdentifierOrParen(parser, context) {
    nextToken(parser, context);
    var token = parser.token;
    var flags = parser.flags;
    return token & (134217728 /* IsIdentifier */ | 2097152 /* IsYield */) || token === 67174411 /* LeftParen */;
}
/**
 * Validates if the next token in the stream is left parenthesis.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function nextTokenIsLeftParen(parser, context) {
    nextToken(parser, context);
    return parser.token === 67174411 /* LeftParen */ || parser.token === 33619987 /* LeftBracket */;
}
/**
 * Validates if the next token in the stream is a function keyword on the same line.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function nextTokenIsFuncKeywordOnSameLine(parser, context) {
    nextToken(parser, context);
    return !(parser.flags & 1 /* NewLine */) && parser.token === 77912 /* FunctionKeyword */;
}
/**
 * Checks if the property has any private field key
 *
 * @param parser Parser object
 * @param context  Context masks
 */
function isPropertyWithPrivateFieldKey(context, expr) {
    return !expr.property ? false : expr.property.type === 'PrivateName';
}
/**
 * Validates an identifier and either parse it or throw
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseAndValidateIdentifier(parser, context) {
    var token = parser.token;
    if (context & 8192 /* Strict */) {
        // Module code is also "strict mode code"
        if (context & 16384 /* Module */ && token & 4194304 /* IsAwait */) {
            tolerant(parser, context, 40 /* DisallowedInContext */, tokenDesc(token));
        }
        if (token & 2097152 /* IsYield */)
            { tolerant(parser, context, 40 /* DisallowedInContext */, tokenDesc(token)); }
        if ((token & 134217728 /* IsIdentifier */) === 134217728 /* IsIdentifier */ ||
            (token & 36864 /* Contextual */) === 36864 /* Contextual */) {
            return parseIdentifier(parser, context);
        }
        report(parser, 1 /* UnexpectedToken */, tokenDesc(token));
    }
    if (context & 524288 /* Yield */ && token & 2097152 /* IsYield */) {
        tolerant(parser, context, 40 /* DisallowedInContext */, tokenDesc(token));
    }
    else if (context & 262144 /* Async */ && token & 4194304 /* IsAwait */) {
        tolerant(parser, context, 40 /* DisallowedInContext */, tokenDesc(token));
    }
    if ((token & 134217728 /* IsIdentifier */) === 134217728 /* IsIdentifier */ ||
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
        line: parser.line,
        column: parser.column,
        index: parser.index,
    };
}
function readNext(parser, prev) {
    advance(parser);
    if (!hasNext(parser))
        { report(parser, 13 /* UnicodeOutOfRange */); }
    return nextUnicodeChar(parser);
}
// Fully qualified element name, e.g. <svg:path> returns "svg:path"
function isEqualTagNames(elementName) {
    switch (elementName.type) {
        case 'JSXIdentifier':
            return elementName.name;
        case 'JSXNamespacedName':
            var ns = elementName;
            return isEqualTagNames(ns.namespace) + ':' +
                isEqualTagNames(ns.name);
        case 'JSXMemberExpression':
            return (isEqualTagNames(elementName.object) + '.' +
                isEqualTagNames(elementName.property));
        /* istanbul ignore next */
        default:
        // ignore
    }
}
function isInstanceField(parser) {
    var token = parser.token;
    return token === 603979791 /* RightBrace */ || token === 603979793 /* Semicolon */ || token === 67239965 /* Assign */;
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
 * @param context Context masks
 * @param state  Scanner state
 * @param type   Comment type
 */
function skipSingleLineComment(parser, context, state, type) {
    var start = parser.index;
    var collectable = !!(context & (256 /* OptionsComments */ | context & 32 /* OptionsDelegate */));
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case 13 /* CarriageReturn */:
                advanceNewline(parser);
                if (hasNext(parser) && nextChar(parser) === 10 /* LineFeed */)
                    { parser.index++; }
                return state | 1 /* NewLine */;
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                advanceNewline(parser);
                if (collectable)
                    { addComment(parser, context, type, start); }
                return state | 1 /* NewLine */;
            default:
                advance(parser);
        }
    }
    if (collectable)
        { addComment(parser, context, type, start); }
    return state;
}
/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param parser
 * @param context Context masks
 * @param state
 */
function skipMultiLineComment(parser, context, state) {
    var start = parser.index;
    var collectable = !!(context & (256 /* OptionsComments */ | context & 32 /* OptionsDelegate */));
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case 42 /* Asterisk */:
                advance(parser);
                state &= ~2 /* LastIsCR */;
                if (consumeOpt(parser, 47 /* Slash */)) {
                    if (collectable)
                        { addComment(parser, context, 'Multiline', start); }
                    return state;
                }
                break;
            // Mark multiline comments containing linebreaks as new lines
            // so we can perfectly handle edge cases like: '1/*\n*/--> a comment'
            case 13 /* CarriageReturn */:
                state |= 1 /* NewLine */ | 2 /* LastIsCR */;
                advanceNewline(parser);
                break;
            case 10 /* LineFeed */:
                consumeLineFeed(parser, state);
                state = state & ~2 /* LastIsCR */ | 1 /* NewLine */;
                break;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                state = state & ~2 /* LastIsCR */ | 1 /* NewLine */;
                advanceNewline(parser);
                break;
            default:
                state &= ~2 /* LastIsCR */;
                advance(parser);
        }
    }
    tolerant(parser, context, 7 /* UnterminatedComment */);
}
function addComment(parser, context, type, start) {
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
function scan(parser, context) {
    parser.flags &= ~1 /* NewLine */ | 65536 /* EscapedKeyword */;
    var lineStart = parser.index === 0;
    var state = 0 /* None */;
    while (hasNext(parser)) {
        if (!lineStart) {
            parser.startIndex = parser.index;
            parser.startColumn = parser.column;
            parser.startLine = parser.line;
        }
        var first = nextChar(parser);
        if (first > 128 /* MaxAsciiCharacter */) {
            switch (first) {
                case 8232 /* LineSeparator */:
                case 8233 /* ParagraphSeparator */:
                    state = state & ~2 /* LastIsCR */ | 1 /* NewLine */;
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
                case 65279 /* Zwnbs */:
                case 8205 /* Zwj */:
                case 65279 /* Zwnbs */:
                    advance(parser);
                    break;
                default:
                    return parseMaybeIdentifier(parser, context, first);
            }
        }
        else {
            switch (first) {
                case 13 /* CarriageReturn */:
                    state |= 1 /* NewLine */ | 2 /* LastIsCR */;
                    advanceNewline(parser);
                    break;
                case 10 /* LineFeed */:
                    consumeLineFeed(parser, state);
                    state = state & ~2 /* LastIsCR */ | 1 /* NewLine */;
                    break;
                case 9 /* Tab */:
                case 11 /* VerticalTab */:
                case 12 /* FormFeed */:
                case 32 /* Space */:
                    advance(parser);
                    break;
                // `/`, `/=`, `/>`
                case 47 /* Slash */:
                    {
                        advance(parser);
                        if (!hasNext(parser))
                            { return 330293 /* Divide */; }
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
                                    return 196645 /* DivideAssign */;
                                }
                            default:
                                return 330293 /* Divide */;
                        }
                    }
                // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
                case 60 /* LessThan */:
                    advance(parser); // skip `<`
                    if (!(context & 16384 /* Module */) &&
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
                                131102 /* ShiftLeftAssign */ :
                                329793 /* ShiftLeft */;
                        case 61 /* EqualSign */:
                            advance(parser);
                            return 329533 /* LessThanOrEqual */;
                        case 47 /* Slash */: {
                            if (!(context & 4 /* OptionsJSX */))
                                { break; }
                            var index = parser.index + 1;
                            // Check that it's not a comment start.
                            if (index < parser.source.length) {
                                var next = parser.source.charCodeAt(index);
                                if (next === 42 /* Asterisk */ || next === 47 /* Slash */)
                                    { break; }
                            }
                            advance(parser);
                            return 25 /* JSXClose */;
                        }
                        default: // ignore
                            return 329535 /* LessThan */;
                    }
                // `-`, `--`, `-=`
                case 45 /* Hyphen */:
                    {
                        advance(parser); // skip `-`
                        var next$1 = nextChar(parser);
                        switch (next$1) {
                            case 45 /* Hyphen */:
                                {
                                    advance(parser);
                                    if ((state & 1 /* NewLine */ || lineStart) &&
                                        nextChar(parser) === 62 /* GreaterThan */) {
                                        if (!(context & 16384 /* Module */)) {
                                            advance(parser);
                                            state = skipSingleLineComment(parser, context, state, 'HTMLClose');
                                        }
                                        continue;
                                    }
                                    return 1114140 /* Decrement */;
                                }
                            case 61 /* EqualSign */:
                                {
                                    advance(parser);
                                    return 131107 /* SubtractAssign */;
                                }
                            default:
                                return 854320 /* Subtract */;
                        }
                    }
                // `!`, `!=`, `!==`
                case 33 /* Exclamation */:
                    advance(parser);
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 589869 /* Negate */; }
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 329276 /* LooseNotEqual */; }
                    return 329274 /* StrictNotEqual */;
                // `'string'`, `"string"`
                case 39 /* SingleQuote */:
                case 34 /* DoubleQuote */:
                    return scanString(parser, context, first);
                // `%`, `%=`
                case 37 /* Percent */:
                    advance(parser);
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 330292 /* Modulo */; }
                    return 131110 /* ModuloAssign */;
                // `&`, `&&`, `&=`
                case 38 /* Ampersand */:
                    {
                        advance(parser);
                        var next$2 = nextChar(parser);
                        if (next$2 === 38 /* Ampersand */) {
                            advance(parser);
                            return 17105463 /* LogicalAnd */;
                        }
                        if (next$2 === 61 /* EqualSign */) {
                            advance(parser);
                            return 131113 /* BitwiseAndAssign */;
                        }
                        return 329028 /* BitwiseAnd */;
                    }
                // `*`, `**`, `*=`, `**=`
                case 42 /* Asterisk */:
                    {
                        advance(parser);
                        if (!hasNext(parser))
                            { return 330291 /* Multiply */; }
                        var next$3 = nextChar(parser);
                        if (next$3 === 61 /* EqualSign */) {
                            advance(parser);
                            return 131108 /* MultiplyAssign */;
                        }
                        if (next$3 !== 42 /* Asterisk */)
                            { return 330291 /* Multiply */; }
                        advance(parser);
                        if (!consumeOpt(parser, 61 /* EqualSign */))
                            { return 330550 /* Exponentiate */; }
                        return 131105 /* ExponentiateAssign */;
                    }
                // `+`, `++`, `+=`
                case 43 /* Plus */:
                    {
                        advance(parser);
                        if (!hasNext(parser))
                            { return 854319 /* Add */; }
                        var next$4 = nextChar(parser);
                        if (next$4 === 43 /* Plus */) {
                            advance(parser);
                            return 1114139 /* Increment */;
                        }
                        if (next$4 === 61 /* EqualSign */) {
                            advance(parser);
                            return 131106 /* AddAssign */;
                        }
                        return 854319 /* Add */;
                    }
                // `.`, `...`, `.123` (numeric literal)
                case 46 /* Period */:
                    {
                        var index$1 = parser.index + 1;
                        var next$5 = parser.source.charCodeAt(index$1);
                        if (next$5 >= 48 /* Zero */ && next$5 <= 57 /* Nine */) {
                            scanNumericLiteral(parser, context, 4 /* Float */);
                            return 65538 /* NumericLiteral */;
                        }
                        else if (next$5 === 46 /* Period */) {
                            index$1++;
                            if (index$1 < parser.source.length &&
                                parser.source.charCodeAt(index$1) === 46 /* Period */) {
                                parser.index = index$1 + 1;
                                parser.column += 3;
                                return 14 /* Ellipsis */;
                            }
                        }
                        advance(parser);
                        return 67108877 /* Period */;
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
                        var index$2 = parser.index;
                        var next$6 = parser.source.charCodeAt(index$2);
                        if (context & 512 /* OptionsShebang */ &&
                            lineStart &&
                            next$6 === 33 /* Exclamation */) {
                            parser.index = index$2 + 1;
                            skipSingleLineComment(parser, context, 0 /* None */, 'SheBang');
                            continue;
                        }
                        return scanPrivateName(parser, context);
                    }
                // `(`
                case 40 /* LeftParen */:
                    advance(parser);
                    return 67174411 /* LeftParen */;
                // `)`
                case 41 /* RightParen */:
                    advance(parser);
                    return 16 /* RightParen */;
                // `,`
                case 44 /* Comma */:
                    advance(parser);
                    return 67108882 /* Comma */;
                // `:`
                case 58 /* Colon */:
                    advance(parser);
                    return 67108885 /* Colon */;
                // `@`
                case 64 /* At */:
                    advance(parser);
                    return 120 /* At */;
                // `;`
                case 59 /* Semicolon */:
                    advance(parser);
                    return 603979793 /* Semicolon */;
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
                    return 33619980 /* LeftBrace */;
                // `}`
                case 125 /* RightBrace */:
                    advance(parser);
                    return 603979791 /* RightBrace */;
                // `~`
                case 126 /* Tilde */:
                    advance(parser);
                    return 589870 /* Complement */;
                // `=`, `==`, `===`, `=>`
                case 61 /* EqualSign */:
                    {
                        advance(parser);
                        var next$7 = nextChar(parser);
                        if (next$7 === 61 /* EqualSign */) {
                            advance(parser);
                            if (consumeOpt(parser, 61 /* EqualSign */)) {
                                return 329273 /* StrictEqual */;
                            }
                            else {
                                return 329275 /* LooseEqual */;
                            }
                        }
                        else if (next$7 === 62 /* GreaterThan */) {
                            advance(parser);
                            return 10 /* Arrow */;
                        }
                        return 67239965 /* Assign */;
                    }
                // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
                case 62 /* GreaterThan */:
                    {
                        advance(parser);
                        if (!hasNext(parser))
                            { return 329536 /* GreaterThan */; }
                        if (context & 536870912 /* InJSXChild */)
                            { return 329536 /* GreaterThan */; }
                        var next$8 = nextChar(parser);
                        if (next$8 === 61 /* EqualSign */) {
                            advance(parser);
                            return 329534 /* GreaterThanOrEqual */;
                        }
                        if (next$8 !== 62 /* GreaterThan */)
                            { return 329536 /* GreaterThan */; }
                        advance(parser);
                        next$8 = nextChar(parser);
                        if (next$8 === 62 /* GreaterThan */) {
                            advance(parser);
                            if (consumeOpt(parser, 61 /* EqualSign */)) {
                                return 131104 /* LogicalShiftRightAssign */;
                            }
                            else {
                                return 329795 /* LogicalShiftRight */;
                            }
                        }
                        else if (next$8 === 61 /* EqualSign */) {
                            advance(parser);
                            return 131103 /* ShiftRightAssign */;
                        }
                        return 329794 /* ShiftRight */;
                    }
                // `[`
                case 91 /* LeftBracket */:
                    advance(parser);
                    return 33619987 /* LeftBracket */;
                // `\\u{N}var`
                case 92 /* Backslash */:
                    return scanIdentifier(parser, context);
                // `^`, `^=`
                case 94 /* Caret */:
                    advance(parser);
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 328774 /* BitwiseXor */; }
                    return 131111 /* BitwiseXorAssign */;
                // ``string``
                case 96 /* Backtick */:
                    return scanTemplate(parser, context, first);
                // `|`, `||`, `|=`
                case 124 /* VerticalBar */:
                    {
                        advance(parser);
                        var next$9 = nextChar(parser);
                        if (next$9 === 124 /* VerticalBar */) {
                            advance(parser);
                            return 17105208 /* LogicalOr */;
                        }
                        else if (next$9 === 61 /* EqualSign */) {
                            advance(parser);
                            return 131112 /* BitwiseOrAssign */;
                        }
                        return 328517 /* BitwiseOr */;
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
                default:
                    return scanIdentifier(parser, context, first);
            }
        }
    }
    return 536870912 /* EndOfSource */;
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
    var state = 0 /* None */;
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
        { report(parser, 60 /* TrailingNumericSeparator */); }
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
    var state = 0 /* None */;
    while (hasNext(parser)) {
        ch = nextChar(parser);
        if (context & 1 /* OptionsNext */ && ch === 95 /* Underscore */) {
            state = scanNumericSeparator(parser, state);
            continue;
        }
        state &= ~1 /* SeenSeparator */;
        var converted = ch - 48 /* Zero */;
        if (!(ch >= 48 /* Zero */ && ch <= 57 /* Nine */) || converted >= base)
            { break; }
        value = value * base + converted;
        advance(parser);
        digits++;
    }
    if (digits === 0)
        { report(parser, 63 /* InvalidOrUnexpectedToken */); }
    if (state & 1 /* SeenSeparator */)
        { report(parser, 60 /* TrailingNumericSeparator */); }
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
                if (context & 8192 /* Strict */)
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
                        report(parser, 61 /* ZeroDigitNumericSeparator */);
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
                report(parser, 61 /* ZeroDigitNumericSeparator */);
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
function scanSignedInteger(parser, end) {
    var next = nextChar(parser);
    if (next === 43 /* Plus */ || next === 45 /* Hyphen */) {
        advance(parser);
        next = nextChar(parser);
    }
    if (!(next >= 48 /* Zero */ && next <= 57 /* Nine */)) {
        report(parser, 63 /* InvalidOrUnexpectedToken */);
    }
    var preNumericPart = parser.index;
    var finalFragment = scanDecimalDigitsOrSeparator(parser);
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
    if (next !== 46 /* Period */ && next !== 95 /* Underscore */ && !isValidIdentifierStart(next)) {
        return assembleNumericLiteral(parser, context, value);
    }
    if (consumeOpt(parser, 46 /* Period */)) {
        if (context & 1 /* OptionsNext */ && nextChar(parser) === 95 /* Underscore */) {
            report(parser, 61 /* ZeroDigitNumericSeparator */);
        }
        state |= 4 /* Float */;
        value = value + '.' + scanDecimalDigitsOrSeparator(parser);
    }
    var end = parser.index;
    if (consumeOpt(parser, 110 /* LowerN */)) {
        if (state & 4 /* Float */)
            { report(parser, 0 /* Unexpected */); }
        state |= 8 /* BigInt */;
    }
    if (consumeOpt(parser, 101 /* LowerE */) || consumeOpt(parser, 69 /* UpperE */)) {
        state |= 4 /* Float */;
        value += scanSignedInteger(parser, end);
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
        { report(parser, 60 /* TrailingNumericSeparator */); }
    state |= 1 /* SeenSeparator */;
    return state;
}
/**
 * Internal helper function that scans numeric values
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanDecimalDigitsOrSeparator(parser) {
    var start = parser.index;
    var state = 0 /* None */;
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
        { report(parser, 60 /* TrailingNumericSeparator */); }
    return ret + parser.source.substring(start, parser.index);
}
/**
 * Internal helper function that scans numeric values
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanDecimalAsSmi(parser, context) {
    var state = 0 /* None */;
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
        { report(parser, 60 /* TrailingNumericSeparator */); }
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
        { parser.tokenRaw = parser.source.slice(parser.startIndex, parser.index); }
    return isBigInt ? 65655 /* BigIntLiteral */ : 65538 /* NumericLiteral */;
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
    var isEscaped = false;
    if (first)
        { advanceOnMaybeAstral(parser, first); }
    loop: while (hasNext(parser)) {
        var index = parser.index;
        var ch = parser.source.charCodeAt(index);
        switch (ch) {
            case 92 /* Backslash */:
                ret += parser.source.slice(start, index);
                ret += scanUnicodeCodePointEscape(parser);
                start = parser.index;
                isEscaped = true;
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
        if (token > 0) {
            if (isEscaped) {
                if (context & 1073741824 /* DisallowEscapedKeyword */) {
                    tolerant(parser, context, 2 /* UnexpectedEscapedKeyword */, tokenDesc(token));
                }
                // Here we fall back to a mutual parser flag if the escaped keyword isn't disallowed through
                // context masks. This is similiar to how V8 does it - they are using an
                // 'escaped_keyword' token.
                // - J.K. Thomas
                parser.flags |= 65536 /* EscapedKeyword */;
            }
            return token;
        }
    }
    if (context & 1024 /* OptionsRawidentifiers */)
        { parser.tokenRaw = parser.source.slice(start, parser.index); }
    return 134283265 /* Identifier */;
}
/**
 * Scanning chars in the range 0...127, and treat them as an possible
 * identifier. This allows subsequent checking to be faster.
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param first Code point
 */
function parseMaybeIdentifier(parser, context, first) {
    first = nextUnicodeChar(parser);
    if (!isValidIdentifierStart(first)) {
        report(parser, 9 /* UnexpectedChar */, escapeForPrinting(first));
    }
    return scanIdentifier(parser, context, first);
}
/**
 * Scan unicode codepoint escape
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanUnicodeCodePointEscape(parser) {
    var index = parser.index;
    if (index + 5 < parser.source.length) {
        if (parser.source.charCodeAt(index + 1) !== 117 /* LowerU */) {
            report(parser, 0 /* Unexpected */);
        }
        parser.index += 2;
        parser.column += 2;
        var code = scanIdentifierUnicodeEscape(parser);
        if (code >= 55296 /* LeadSurrogateMin */ && code <= 56319 /* LeadSurrogateMax */) {
            report(parser, 78 /* UnexpectedSurrogate */);
        }
        if (!isIdentifierPart(code)) {
            report(parser, 79 /* InvalidUnicodeEscapeSequence */);
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
            if (codePoint > 1114111 /* NonBMPMax */) {
                report(parser, 0 /* Unexpected */);
            }
            advance(parser);
            digit = toHex(nextChar(parser));
        }
        if (nextChar(parser) !== 125 /* RightBrace */) {
            report(parser, 12 /* InvalidHexEscapeSequence */);
        }
        consumeOpt(parser, 125 /* RightBrace */);
        // '\uDDDD'
    }
    else {
        for (var i = 0; i < 4; i++) {
            ch = nextChar(parser);
            var digit$1 = toHex(ch);
            if (digit$1 < 0)
                { report(parser, 12 /* InvalidHexEscapeSequence */); }
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
                var code = first - 48 /* Zero */;
                var index = parser.index + 1;
                var column = parser.column + 1;
                var next = parser.source.charCodeAt(index);
                if (next < 48 /* Zero */ || next > 55 /* Seven */) {
                    // Strict mode code allows only \0, then a non-digit.
                    if (code !== 0 || next === 56 /* Eight */ || next === 57 /* Nine */) {
                        if (context & 8192 /* Strict */)
                            { return -2 /* StrictOctal */; }
                        parser.flags |= 128 /* Octal */;
                    }
                }
                else if (context & 8192 /* Strict */) {
                    return -2 /* StrictOctal */;
                }
                else {
                    parser.flags |= 128 /* Octal */;
                    parser.lastValue = next;
                    code = code * 8 + (next - 48 /* Zero */);
                    index++;
                    column++;
                    next = parser.source.charCodeAt(index);
                    if (next >= 48 /* Zero */ && next <= 55 /* Seven */) {
                        parser.lastValue = next;
                        code = code * 8 + (next - 48 /* Zero */);
                        index++;
                        column++;
                    }
                    parser.index = index - 1;
                    parser.column = column - 1;
                }
                return code;
            }
        case 52 /* Four */:
        case 53 /* Five */:
        case 54 /* Six */:
        case 55 /* Seven */:
            {
                // 1 to 2 octal digits
                if (context & 8192 /* Strict */)
                    { return -2 /* StrictOctal */; }
                var code$1 = first - 48 /* Zero */;
                var index$1 = parser.index + 1;
                var column$1 = parser.column + 1;
                var next$1 = parser.source.charCodeAt(index$1);
                if (next$1 >= 48 /* Zero */ && next$1 <= 55 /* Seven */) {
                    code$1 = code$1 * 8 + (next$1 - 48 /* Zero */);
                    parser.lastValue = next$1;
                    parser.index = index$1;
                    parser.column = column$1;
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
                        if (code$2 > 1114111 /* NonBMPMax */)
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
            report(parser, context & 32768 /* TaggedTemplate */ ?
                80 /* TemplateOctalLiteral */ :
                10 /* StrictOctalEscape */);
        case -3 /* EightOrNine */:
            report(parser, 11 /* InvalidEightAndNine */);
        case -4 /* InvalidHex */:
            report(parser, 12 /* InvalidHexEscapeSequence */);
        case -5 /* OutOfRange */:
            report(parser, 13 /* UnicodeOutOfRange */);
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
                report(parser, 5 /* UnterminatedString */);
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                // Stage 3 proposal
                if (context & 1 /* OptionsNext */)
                    { advance(parser); }
                report(parser, 5 /* UnterminatedString */);
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
    parser.tokenRaw = parser.source.slice(start, parser.index);
    parser.tokenValue = ret;
    parser.lastValue = lastValue;
    return 65539 /* StringLiteral */;
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
            if (parser.source.charCodeAt(index) === 123 /* LeftBrace */) {
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
        { report(parser, 8 /* UnterminatedTemplate */); }
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
                    var code = scanEscapeSequence(parser, context | 8192 /* Strict */, ch);
                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    }
                    else if (code !== -1 /* Empty */ && context & 32768 /* TaggedTemplate */) {
                        ret = undefined;
                        ch = scanLooserTemplateSegment(parser, parser.lastValue);
                        if (ch < 0) {
                            tail = false;
                        }
                        break loop;
                    }
                    else {
                        throwStringError(parser, context | 32768 /* TaggedTemplate */, code);
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
        return 65545 /* TemplateTail */;
    }
    else {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 2);
        return 65544 /* TemplateCont */;
    }
}
function scanRegularExpression(parser, context) {
    var bodyStart = parser.index;
    var preparseState = 0 /* Empty */;
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
                    report(parser, 6 /* UnterminatedRegExp */);
                default: // ignore
            }
        }
        if (!hasNext(parser)) {
            report(parser, 6 /* UnterminatedRegExp */);
        }
    }
    var bodyEnd = parser.index - 1;
    var mask = 0 /* Empty */;
    var flagStart = parser.index;
    loop: while (hasNext(parser)) {
        var code = nextChar(parser);
        switch (code) {
            case 103 /* LowerG */:
                if (mask & 2 /* Global */)
                    { report(parser, 14 /* DuplicateRegExpFlag */, 'g'); }
                mask |= 2 /* Global */;
                break;
            case 105 /* LowerI */:
                if (mask & 1 /* IgnoreCase */)
                    { report(parser, 14 /* DuplicateRegExpFlag */, 'i'); }
                mask |= 1 /* IgnoreCase */;
                break;
            case 109 /* LowerM */:
                if (mask & 4 /* Multiline */)
                    { report(parser, 14 /* DuplicateRegExpFlag */, 'm'); }
                mask |= 4 /* Multiline */;
                break;
            case 117 /* LowerU */:
                if (mask & 8 /* Unicode */)
                    { report(parser, 14 /* DuplicateRegExpFlag */, 'u'); }
                mask |= 8 /* Unicode */;
                break;
            case 121 /* LowerY */:
                if (mask & 16 /* Sticky */)
                    { report(parser, 14 /* DuplicateRegExpFlag */, 'y'); }
                mask |= 16 /* Sticky */;
                break;
            case 115 /* LowerS */:
                if (mask & 32 /* DotAll */)
                    { report(parser, 14 /* DuplicateRegExpFlag */, 's'); }
                mask |= 32 /* DotAll */;
                break;
            default:
                if (!isIdentifierPart(code))
                    { break loop; }
                report(parser, 15 /* UnexpectedTokenRegExpFlag */, fromCodePoint(code));
        }
        advance(parser);
    }
    var flags = parser.source.slice(flagStart, parser.index);
    var pattern = parser.source.slice(bodyStart, bodyEnd);
    parser.tokenRegExp = { pattern: pattern, flags: flags };
    if (context & 8 /* OptionsRaw */)
        { parser.tokenRaw = parser.source.slice(parser.startIndex, parser.index); }
    parser.tokenValue = validate(parser, context, pattern, flags);
    return 65540 /* RegularExpression */;
}
/**
 * Validates regular expressions
 *
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param pattern Regexp body
 * @param flags Regexp flags
 */
function validate(parser, context, pattern, flags) {
    if (!(context & 4096 /* OptionsNode */)) {
        try {
        }
        catch (e) {
            report(parser, 6 /* UnterminatedRegExp */);
        }
    }
    try {
        return new RegExp(pattern, flags);
    }
    catch (e) {
        return null;
    }
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
    var pos = getLocation(parser);
    var children = [];
    var closingElement = null;
    var selfClosing = false;
    var openingElement;
    expect(parser, context, 329535 /* LessThan */);
    var isFragment = parser.token === 329536 /* GreaterThan */;
    if (isFragment) {
        openingElement = parseJSXOpeningFragment(parser, context, pos);
    }
    else {
        var name = parseJSXElementName(parser, context);
        var attributes = parseJSXAttributes(parser, context);
        selfClosing = consume(parser, context, 330293 /* Divide */);
        openingElement = parseJSXOpeningElement(parser, context, name, attributes, selfClosing, pos);
    }
    if (isFragment)
        { return parseJSXFragment(parser, context, openingElement, pos); }
    if (!selfClosing) {
        children = parseJSXChildren(parser, context);
        closingElement = parseJSXClosingElement(parser, context);
        var open = isEqualTagNames(openingElement.name);
        var close = isEqualTagNames(closingElement.name);
        if (open !== close)
            { report(parser, 90 /* ExpectedJSXClosingTag */, close); }
    }
    return finishNode(context, parser, pos, {
        type: 'JSXElement',
        children: children,
        openingElement: openingElement,
        closingElement: closingElement,
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
    if (context & 536870912 /* InJSXChild */ && selfClosing)
        { expect(parser, context, 329536 /* GreaterThan */); }
    else
        { nextJSXToken(parser, context); }
    return finishNode(context, parser, pos, {
        type: 'JSXOpeningElement',
        name: name,
        attributes: attributes,
        selfClosing: selfClosing
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
    var children = parseJSXChildren(parser, context);
    var closingElement = parseJSXClosingFragment(parser, context);
    return finishNode(context, parser, pos, {
        type: 'JSXFragment',
        children: children,
        openingElement: openingElement,
        closingElement: closingElement,
    });
}
/**
 * Parse JSX opening fragment
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Line / Column location
 */
function parseJSXOpeningFragment(parser, context, pos) {
    nextJSXToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'JSXOpeningFragment'
    });
}
/**
 * Prime the scanner and advance to the next JSX token in the stream
 *
 * @param parser Parser object
 * @param context Context masks
 */
function nextJSXToken(parser, context) {
    return parser.token = scanJSXToken(parser, context);
}
/**
 * Mini scanner
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanJSXToken(parser, context) {
    if (!hasNext(parser))
        { return 536870912 /* EndOfSource */; }
    parser.lastIndex = parser.startIndex = parser.index;
    var char = nextChar(parser);
    if (char === 60 /* LessThan */) {
        advance(parser);
        return consumeOpt(parser, 47 /* Slash */) ? 25 /* JSXClose */ : 329535 /* LessThan */;
    }
    else if (char === 123 /* LeftBrace */) {
        advance(parser);
        return 33619980 /* LeftBrace */;
    }
    while (hasNext(parser)) {
        advance(parser);
        var next = nextChar(parser);
        if (next === 123 /* LeftBrace */ || next === 60 /* LessThan */)
            { break; }
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
    var children = [];
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
    var pos = getLocation(parser);
    var value = parser.source.slice(parser.startIndex, parser.index);
    parser.token = scanJSXToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'JSXText',
        value: value
    });
    if (context & 8 /* OptionsRaw */)
        { node.raw = value; }
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
        case 134283265 /* Identifier */:
        case 121 /* JSXText */:
            return parseJSXText(parser, context);
        case 33619980 /* LeftBrace */:
            return parseJSXExpression(parser, context & ~536870912 /* InJSXChild */);
        case 329535 /* LessThan */:
            return parseJSXRootElement(parser, context & ~536870912 /* InJSXChild */);
        default:
            report(parser, 0 /* Unexpected */);
    }
}
/**
 * Parses JSX attributes
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXAttributes(parser, context) {
    var attributes = [];
    while (hasNext(parser)) {
        if (parser.token === 330293 /* Divide */ || parser.token === 329536 /* GreaterThan */)
            { break; }
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
    var pos = getLocation(parser);
    expect(parser, context, 33619980 /* LeftBrace */);
    expect(parser, context, 14 /* Ellipsis */);
    var expression = parseExpressionCoverGrammar(parser, context & ~536870912 /* InJSXChild */, parseAssignmentExpression);
    expect(parser, context, 603979791 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'JSXSpreadAttribute',
        argument: expression
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
    expect(parser, context, 67108885 /* Colon */);
    var name = parseJSXIdentifier(parser, context);
    return finishNode(context, parser, pos, {
        type: 'JSXNamespacedName',
        namespace: namespace,
        name: name
    });
}
/**
 * Parses JSX attribute name
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXAttributeName(parser, context) {
    var pos = getLocation(parser);
    var identifier = parseJSXIdentifier(parser, context);
    return parser.token === 67108885 /* Colon */ ?
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
        case 65539 /* StringLiteral */:
            return parseLiteral(parser, context);
        case 33619980 /* LeftBrace */:
            return parseJSXExpressionContainer(parser, context | 536870912 /* InJSXChild */);
        case 329535 /* LessThan */:
            return parseJSXRootElement(parser, context | 536870912 /* InJSXChild */);
        default:
            tolerant(parser, context, 92 /* InvalidJSXAttributeValue */);
    }
}
/**
 * Parses JSX Attribute
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXAttribute(parser, context) {
    var pos = getLocation(parser);
    if (parser.token === 33619980 /* LeftBrace */)
        { return parseJSXSpreadAttribute(parser, context); }
    scanJSXIdentifier(parser, context);
    var attrName = parseJSXAttributeName(parser, context);
    var value = parser.token === 67239965 /* Assign */ ? parseJSXAttributeValue(parser, context) : null;
    return finishNode(context, parser, pos, {
        type: 'JSXAttribute',
        value: value,
        name: attrName
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
    var ch = nextChar(parser);
    switch (ch) {
        case 34 /* DoubleQuote */:
        case 39 /* SingleQuote */:
            return scanJSXString(parser, context, ch);
        default:
            return nextToken(parser, context);
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
    var rawStart = parser.index;
    advance(parser);
    var ret = '';
    var start = parser.index;
    var ch = nextChar(parser);
    while (ch !== quote) {
        ret += fromCodePoint(ch);
        advance(parser);
        ch = nextChar(parser);
        if (!hasNext(parser))
            { report(parser, 5 /* UnterminatedString */); }
    }
    advance(parser); // skip the quote
    // raw
    if (context & 8 /* OptionsRaw */)
        { parser.tokenRaw = parser.source.slice(rawStart, parser.index); }
    parser.tokenValue = ret;
    return 65539 /* StringLiteral */;
}
/**
 * Parses JJSX Empty Expression
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXEmptyExpression(parser, context) {
    var pos = getLocation(parser);
    return finishNode(context, parser, pos, {
        type: 'JSXEmptyExpression'
    });
}
/**
 * Parses JSX Spread child
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXSpreadChild(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var expression = parseExpression(parser, context);
    expect(parser, context, 603979791 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'JSXSpreadChild',
        expression: expression
    });
}
/**
 * Parses JSX Expression container
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXExpressionContainer(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 33619980 /* LeftBrace */);
    // Note: JSX Expressions can't be empty
    if (parser.token === 603979791 /* RightBrace */)
        { tolerant(parser, context, 89 /* NonEmptyJSXExpression */); }
    var expression = parseExpressionCoverGrammar(parser, context & ~536870912 /* InJSXChild */, parseAssignmentExpression);
    expect(parser, context, 603979791 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'JSXExpressionContainer',
        expression: expression
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
    var pos = getLocation(parser);
    expect(parser, context, 33619980 /* LeftBrace */);
    if (parser.token === 14 /* Ellipsis */)
        { return parseJSXSpreadChild(parser, context); }
    var expression = parser.token === 603979791 /* RightBrace */ ?
        parseJSXEmptyExpression(parser, context) :
        parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    nextJSXToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'JSXExpressionContainer',
        expression: expression
    });
}
/**
 * Parses JSX Closing fragment
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXClosingFragment(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 25 /* JSXClose */);
    expect(parser, context, 329536 /* GreaterThan */);
    return finishNode(context, parser, pos, {
        type: 'JSXClosingFragment'
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
    var pos = getLocation(parser);
    expect(parser, context, 25 /* JSXClose */);
    var name = parseJSXElementName(parser, context);
    if (context & 536870912 /* InJSXChild */)
        { expect(parser, context, 329536 /* GreaterThan */); }
    else
        { nextJSXToken(parser, context); }
    return finishNode(context, parser, pos, {
        type: 'JSXClosingElement',
        name: name
    });
}
/**
 * Parses JSX Identifier
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXIdentifier(parser, context) {
    var token = parser.token;
    var name = parser.tokenValue;
    var raw = parser.tokenRaw;
    if (!(token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */))) {
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    var pos = getLocation(parser);
    nextToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'JSXIdentifier',
        name: name
    });
    if (context & 1024 /* OptionsRawidentifiers */)
        { node.raw = raw; }
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
    scanJSXIdentifier(parser, context);
    return finishNode(context, parser, pos, {
        type: 'JSXMemberExpression',
        object: expr,
        property: parseJSXIdentifier(parser, context)
    });
}
/**
 * Parses JSX Element name
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseJSXElementName(parser, context) {
    var pos = getLocation(parser);
    scanJSXIdentifier(parser, context);
    var elementName = parseJSXIdentifier(parser, context);
    if (parser.token === 67108885 /* Colon */)
        { return parseJSXNamespacedName(parser, context, elementName, pos); }
    while (consume(parser, context, 67108877 /* Period */)) {
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
function scanJSXIdentifier(parser, context) {
    var token = parser.token;
    var index = parser.index;
    if (token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */)) {
        var firstCharPosition = parser.index;
        var ch = nextChar(parser);
        while (hasNext(parser) && (ch === 45 /* Hyphen */ || (isValidIdentifierPart(ch)))) {
            ch = readNext(parser, ch);
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
 * @param Parser object
 * @param Context masks
 */
function parseExpression(parser, context) {
    var pos = getLocation(parser);
    var expr = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
    return parser.token === 67108882 /* Comma */ ?
        parseSequenceExpression(parser, context, expr, pos) :
        expr;
}
/**
 * Parse secuence expression
 *
 * @param Parser object
 * @param Context masks
 */
function parseSequenceExpression(parser, context, left, pos) {
    var expressions = [left];
    while (consume(parser, context, 67108882 /* Comma */)) {
        expressions.push(parseExpressionCoverGrammar(parser, context, parseAssignmentExpression));
    }
    return finishNode(context, parser, pos, {
        type: 'SequenceExpression',
        expressions: expressions
    });
}
/**
 * YieldExpression[In] :
 *   yield
 *   yield [no LineTerminator here] AssignmentExpression[?In, Yield]
 *   yield [no LineTerminator here] * AssignmentExpression[?In, Yield]
 *
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-YieldExpression)
 *
 * @param Parser object
 * @param Context masks
 */
function parseYieldExpression(parser, context, pos) {
    // https://tc39.github.io/ecma262/#sec-generator-function-definitions-static-semantics-early-errors
    if (context & 1048576 /* InParameter */)
        { tolerant(parser, context, 52 /* YieldInParameter */); }
    if (parser.flags & 65536 /* EscapedKeyword */)
        { report(parser, 2 /* UnexpectedEscapedKeyword */); }
    expect(parser, context, 2183274 /* YieldKeyword */);
    var argument = null;
    var delegate = false;
    if (!(parser.flags & 1 /* NewLine */)) {
        delegate = consume(parser, context, 330291 /* Multiply */);
        // 'Token.IsExpressionStart' bitmask contains the complete set of
        // tokens that can appear after an AssignmentExpression, and none of them
        // can start an AssignmentExpression.
        if (delegate || parser.token & 65536 /* IsExpressionStart */) {
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
 * @param Parser object
 * @param Context masks
 */
function parseAssignmentExpression(parser, context) {
    var pos = getLocation(parser);
    var token = parser.token;
    if (context & 524288 /* Yield */ && token & 2097152 /* IsYield */)
        { return parseYieldExpression(parser, context, pos); }
    var expr = token & 8388608 /* IsAsync */ && lookahead(parser, context, nextTokenisIdentifierOrParen)
        ? parserCoverCallExpressionAndAsyncArrowHead(parser, context)
        : parseConditionalExpression(parser, context, pos);
    if (parser.token === 10 /* Arrow */) {
        if (token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */)) {
            if (token & (20480 /* FutureReserved */ | 268435456 /* IsEvalOrArguments */)) {
                // Invalid: ' yield => { 'use strict'; 0 };'
                if (token & 20480 /* FutureReserved */) {
                    parser.flags |= 64 /* StrictReserved */;
                }
                if (token & 268435456 /* IsEvalOrArguments */) {
                    if (context & 8192 /* Strict */)
                        { tolerant(parser, context, 48 /* StrictEvalArguments */); }
                    parser.flags |= 4096 /* StrictEvalArguments */;
                }
            }
            expr = [expr];
        }
        return parseArrowFunction(parser, context &= ~262144 /* Async */, pos, expr);
    }
    if (hasBit(parser.token, 131072 /* IsAssignOp */)) {
        token = parser.token;
        if (context & 8192 /* Strict */ && nameIsArgumentsOrEval(expr.name)) {
            tolerant(parser, context, 16 /* StrictLHSAssignment */);
        }
        else if (consume(parser, context, 67239965 /* Assign */)) {
            if (!(parser.flags & 4 /* AllowDestructuring */)) {
                tolerant(parser, context, 77 /* InvalidDestructuringTarget */);
            }
            // Only re-interpret if not inside a formal parameter list
            if (!(context & 1048576 /* InParameter */))
                { reinterpret(parser, context, expr); }
            if (context & 268435456 /* InParen */)
                { parser.flags |= 8 /* SimpleParameterList */; }
            if (parser.token & 4194304 /* IsAwait */) {
                setPendingError(parser);
                parser.flags |= 16384 /* HasAwait */;
            }
            else if (context & 268435456 /* InParen */ &&
                context & (8192 /* Strict */ | 524288 /* Yield */) &&
                parser.token & 2097152 /* IsYield */) {
                setPendingError(parser);
                parser.flags |= 32768 /* HasYield */;
            }
        }
        else {
            if (!isValidSimpleAssignmentTarget(expr)) {
                tolerant(parser, context, 4 /* InvalidLHSInAssignment */);
            }
            parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
            nextToken(parser, context);
        }
        var right = parseExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseAssignmentExpression);
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
 * @param Parser object
 * @param Context masks
 */
function parseConditionalExpression(parser, context, pos) {
    var test = parseBinaryExpression(parser, context, 0, pos);
    if (!consume(parser, context, 22 /* QuestionMark */))
        { return test; }
    var consequent = parseExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseAssignmentExpression);
    expect(parser, context, 67108885 /* Colon */);
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
 * @param parser Parser object
 * @param context Context masks
 * @param minPrec Minimum precedence value
 * @param pos Line / Column info
 * @param Left Left hand side of the binary expression
 */
function parseBinaryExpression(parser, context, minPrec, pos, left) {
    if ( left === void 0 ) left = parseUnaryExpression(parser, context);

    // Shift-reduce parser for the binary operator part of the JS expression
    // syntax.
    var bit = context & 131072 /* AllowIn */ ^ 131072 /* AllowIn */;
    if (!hasBit(parser.token, 327680 /* IsBinaryOp */))
        { return left; }
    while (hasBit(parser.token, 327680 /* IsBinaryOp */)) {
        var t = parser.token;
        if (bit && t === 1074083633 /* InKeyword */)
            { break; }
        var prec = t & 3840 /* Precedence */;
        var delta = (t === 330550 /* Exponentiate */) << 8 /* PrecStart */;
        // When the next token is no longer a binary operator, it's potentially the
        // start of an expression, so we break the loop
        if (prec + delta <= minPrec)
            { break; }
        nextToken(parser, context);
        left = finishNode(context, parser, pos, {
            type: t & 16777216 /* IsLogical */ ? 'LogicalExpression' : 'BinaryExpression',
            left: left,
            right: parseBinaryExpression(parser, context & ~131072 /* AllowIn */, prec, getLocation(parser)),
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
 * @param Parser object
 * @param Context masks
 * @param {loc} pas Location info
 */
function parseAwaitExpression(parser, context, pos) {
    if (context & 1048576 /* InParameter */)
        { tolerant(parser, context, 53 /* AwaitInParameter */); }
    if (parser.flags & 65536 /* EscapedKeyword */)
        { report(parser, 2 /* UnexpectedEscapedKeyword */); }
    expect(parser, context, 138514541 /* AwaitKeyword */);
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
 * @param parser Parser object
 * @param context Context masks
 */
function parseUnaryExpression(parser, context) {
    var pos = getLocation(parser);
    var token = parser.token;
    if (hasBit(token, 589824 /* IsUnaryOp */)) {
        nextToken(parser, context);
        if (parser.flags & 65536 /* EscapedKeyword */)
            { report(parser, 2 /* UnexpectedEscapedKeyword */); }
        var argument = parseExpressionCoverGrammar(parser, context, parseUnaryExpression);
        if (parser.token === 330550 /* Exponentiate */)
            { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
        if (context & 8192 /* Strict */ && token === 602155 /* DeleteKeyword */) {
            if (argument.type === 'Identifier') {
                tolerant(parser, context, 43 /* StrictDelete */);
            }
            else if (isPropertyWithPrivateFieldKey(context, argument)) {
                tolerant(parser, context, 44 /* DeletePrivateField */);
            }
        }
        return finishNode(context, parser, pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(token),
            argument: argument,
            prefix: true
        });
    }
    return context & 262144 /* Async */ && token & 4194304 /* IsAwait */
        ? parseAwaitExpression(parser, context, pos)
        : parseUpdateExpression(parser, context, pos);
}
/**
 * Parses update expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
 *
 * @param Parser Parser object
 * @param context Context masks
 */
function parseUpdateExpression(parser, context, pos) {
    var prefix = false;
    var operator;
    if (hasBit(parser.token, 1114112 /* IsUpdateOp */)) {
        operator = parser.token;
        prefix = true;
        nextToken(parser, context);
    }
    var token = parser.token;
    var argument = parseLeftHandSideExpression(parser, context, pos);
    var isPostfix = !(parser.flags & 1 /* NewLine */) && hasBit(parser.token, 1114112 /* IsUpdateOp */);
    if (!prefix && !isPostfix)
        { return argument; }
    if (!prefix) {
        operator = parser.token;
        nextToken(parser, context);
    }
    if (context & 8192 /* Strict */ && nameIsArgumentsOrEval(argument.name)) {
        tolerant(parser, context, 72 /* StrictLHSPrefixPostFix */, prefix ? 'Prefix' : 'Postfix');
    }
    else if (!isValidSimpleAssignmentTarget(argument)) {
        tolerant(parser, context, 4 /* InvalidLHSInAssignment */);
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
 * @param Parser Parser object
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
 * @param Parser Parser object
 * @param context Context masks
 */
function parseSpreadElement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var token = parser.token;
    var argument = restoreExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseAssignmentExpression);
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
    var expr = parser.token === 77914 /* ImportKeyword */ ?
        parseImportExpressions(parser, context | 131072 /* AllowIn */, pos) :
        parseMemberExpression(parser, context | 131072 /* AllowIn */, pos);
    return parseCallExpression(parser, context | 131072 /* AllowIn */, pos, expr);
}
/**
 * Parse member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param Parser Parser object
 * @param context Context masks
 * @param pos Location info
 * @param expr Expression
 */
function parseMemberExpression(parser, context, pos, expr) {
    if ( expr === void 0 ) expr = parsePrimaryExpression(parser, context);

    while (true) {
        switch (parser.token) {
            case 67108877 /* Period */: {
                consume(parser, context, 67108877 /* Period */);
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
            case 33619987 /* LeftBracket */: {
                consume(parser, context, 33619987 /* LeftBracket */);
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
            case 65545 /* TemplateTail */: {
                expr = finishNode(context, parser, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplateLiteral(parser, context)
                });
                continue;
            }
            case 65544 /* TemplateCont */: {
                expr = finishNode(context, parser, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi: parseTemplate(parser, context | 32768 /* TaggedTemplate */)
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
 * Note! This is really a part of 'CoverCallExpressionAndAsyncArrowHead', but separated because of performance reasons
 *
 * @param Parser Parer instance
 * @param Context Context masks
 * @param pos Line / Colum info
 * @param expr Expression
 */
function parseCallExpression(parser, context, pos, expr) {
    while (true) {
        expr = parseMemberExpression(parser, context, pos, expr);
        if (parser.token !== 67174411 /* LeftParen */)
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parserCoverCallExpressionAndAsyncArrowHead(parser, context) {
    var pos = getLocation(parser);
    var expr = parseMemberExpression(parser, context | 131072 /* AllowIn */, pos);
    // Here we jump right into it and parse a simple, faster sub-grammar for
    // async arrow / async identifier + call expression. This could have been done different
    // but ESTree sucks!
    //
    // - J.K. Thomas
    if (parser.token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (parser.token & 4194304 /* IsAwait */)
            { tolerant(parser, context, 40 /* DisallowedInContext */); }
        return parseAsyncArrowFunction(parser, context, 2 /* Await */, pos, [parseAndValidateIdentifier(parser, context)]);
    }
    if (parser.flags & 1 /* NewLine */)
        { tolerant(parser, context, 36 /* LineBreakAfterAsync */); }
    while (parser.token === 67174411 /* LeftParen */) {
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
    expect(parser, context, 67174411 /* LeftParen */);
    var expressions = [];
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            expressions.push(parseSpreadElement(parser, context));
        }
        else {
            if (context & 524288 /* Yield */ && hasBit(parser.token, 2097152 /* IsYield */)) {
                parser.flags |= 32768 /* HasYield */;
                setPendingError(parser);
            }
            expressions.push(parseExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseAssignmentExpression));
        }
        if (parser.token !== 16 /* RightParen */)
            { expect(parser, context, 67108882 /* Comma */); }
    }
    expect(parser, context, 16 /* RightParen */);
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
    expect(parser, context, 67174411 /* LeftParen */);
    var args = [];
    var token = parser.token;
    var state = 0 /* Empty */;
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            parser.flags |= 8 /* SimpleParameterList */;
            args.push(parseSpreadElement(parser, context));
            state = 2 /* HasSpread */;
        }
        else {
            token = parser.token;
            if (hasBit(token, 268435456 /* IsEvalOrArguments */)) {
                setPendingError(parser);
                state |= 8 /* EvalOrArguments */;
            }
            if (hasBit(token, 2097152 /* IsYield */)) {
                setPendingError(parser);
                state |= 16 /* Yield */;
            }
            if (hasBit(token, 4194304 /* IsAwait */)) {
                setPendingError(parser);
                state |= 32 /* Await */;
            }
            if (!(parser.flags & 2 /* AllowBinding */)) {
                tolerant(parser, context, 81 /* NotBindable */);
            }
            args.push(restoreExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseAssignmentExpression));
        }
        if (consume(parser, context, 67108882 /* Comma */)) {
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
            { tolerant(parser, context, 82 /* ParamAfterRest */); }
        if (!(token & 134217728 /* IsIdentifier */))
            { parser.flags |= 8 /* SimpleParameterList */; }
        if (state & 32 /* Await */ || parser.flags & 16384 /* HasAwait */)
            { tolerant(parser, context, 53 /* AwaitInParameter */); }
        if (state & 16 /* Yield */ || parser.flags & 32768 /* HasYield */)
            { tolerant(parser, context, 52 /* YieldInParameter */); }
        if (state & 8 /* EvalOrArguments */) {
            if (context & 8192 /* Strict */)
                { tolerant(parser, context, 48 /* StrictEvalArguments */); }
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
 * @param Parser Parser object
 * @param Context Context masks
 */
function parsePrimaryExpression(parser, context) {
    switch (parser.token) {
        case 65538 /* NumericLiteral */:
        case 65539 /* StringLiteral */:
            return parseLiteral(parser, context);
        case 65655 /* BigIntLiteral */:
            return parseBigIntLiteral(parser, context);
        case 134283265 /* Identifier */:
            return parseIdentifier(parser, context);
        case 77831 /* NullKeyword */:
        case 77830 /* TrueKeyword */:
        case 77829 /* FalseKeyword */:
            return parseNullOrTrueOrFalseLiteral(parser, context);
        case 77912 /* FunctionKeyword */:
            return parseFunctionExpression(parser, context);
        case 77919 /* ThisKeyword */:
            return parseThisExpression(parser, context);
        case 8425580 /* AsyncKeyword */:
            return parseAsyncFunctionOrIdentifier(parser, context);
        case 67174411 /* LeftParen */:
            return parseCoverParenthesizedExpressionAndArrowParameterList(parser, context | 268435456 /* InParen */);
        case 33619987 /* LeftBracket */:
            return restoreExpressionCoverGrammar(parser, context, parseArrayLiteral);
        case 33619980 /* LeftBrace */:
            return restoreExpressionCoverGrammar(parser, context, parseObjectLiteral);
        case 115 /* Hash */:
            return parseIdentifierNameOrPrivateName(parser, context);
        case 77901 /* ClassKeyword */:
            return parseClassExpression(parser, context);
        case 77915 /* NewKeyword */:
            return parseNewExpression(parser, context);
        case 77917 /* SuperKeyword */:
            return parseSuperProperty(parser, context);
        case 330293 /* Divide */:
        case 196645 /* DivideAssign */:
            scanRegularExpression(parser, context);
            return parseRegularExpressionLiteral(parser, context);
        case 65545 /* TemplateTail */:
            return parseTemplateLiteral(parser, context);
        case 65544 /* TemplateCont */:
            return parseTemplate(parser, context);
        case 86088 /* LetKeyword */:
            return parseLetAsIdentifier(parser, context);
        case 329535 /* LessThan */:
            if (context & 4 /* OptionsJSX */)
                { return parseJSXRootElement(parser, context | 536870912 /* InJSXChild */); }
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
    if (context & 8192 /* Strict */)
        { tolerant(parser, context, 51 /* UnexpectedStrictReserved */); }
    var pos = getLocation(parser);
    var name = parser.tokenValue;
    nextToken(parser, context);
    if (parser.flags & 1 /* NewLine */) {
        if (parser.token === 33619987 /* LeftBracket */)
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
    var pos = getLocation(parser);
    var name = parser.tokenValue;
    nextToken(parser, context | 32768 /* TaggedTemplate */);
    var node = finishNode(context, parser, pos, {
        type: 'Identifier',
        name: name
    });
    if (context & 1024 /* OptionsRawidentifiers */)
        { node.raw = parser.tokenRaw; }
    return node;
}
/**
 * Parse regular expression literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals)
 *
 * @param Parser object
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
        { node.raw = parser.tokenRaw; }
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
    var pos = getLocation(parser);
    var value = parser.tokenValue;
    if (context & 8192 /* Strict */ && parser.flags & 128 /* Octal */) {
        tolerant(parser, context, 62 /* StrictOctalLiteral */);
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
 * Parses BigInt literal (stage 3 proposal)
 *
 * @see [Link](https://tc39.github.io/proposal-bigint/)
 *
 * @param parser  Parser object
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
    if (parser.flags & 65536 /* EscapedKeyword */)
        { report(parser, 2 /* UnexpectedEscapedKeyword */); }
    nextToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'Literal',
        value: token === 77831 /* NullKeyword */ ? null : raw === 'true'
    });
    if (context & 8 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
}
/**
 * Parse this expression
 *
 * @param Parser object
 * @param Context masks
 */
function parseThisExpression(parser, context) {
    if (parser.flags & 65536 /* EscapedKeyword */)
        { report(parser, 2 /* UnexpectedEscapedKeyword */); }
    var pos = getLocation(parser);
    nextToken(parser, context | 1073741824 /* DisallowEscapedKeyword */);
    return finishNode(context, parser, pos, {
        type: 'ThisExpression'
    });
}
/**
 * Parse identifier name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-IdentifierName)
 *
 * @param Parser object
 * @param Context masks
 * @param t token
 */
function parseIdentifierName(parser, context, t) {
    if (!(t & (134217728 /* IsIdentifier */ | 4096 /* Keyword */)))
        { tolerant(parser, context, 3 /* UnexpectedKeyword */, tokenDesc(t)); }
    return parseIdentifier(parser, context);
}
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser object
 * @param Context masks
 */
function parseIdentifierNameOrPrivateName(parser, context) {
    if (!consume(parser, context, 115 /* Hash */))
        { return parseIdentifierName(parser, context, parser.token); }
    var token = parser.token;
    var tokenValue = parser.tokenValue;
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
    var pos = getLocation(parser);
    expect(parser, context, 33619987 /* LeftBracket */);
    var elements = [];
    while (parser.token !== 20 /* RightBracket */) {
        if (consume(parser, context, 67108882 /* Comma */)) {
            elements.push(null);
        }
        else if (parser.token === 14 /* Ellipsis */) {
            elements.push(parseSpreadElement(parser, context));
            if (parser.token !== 20 /* RightBracket */) {
                parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
                expect(parser, context, 67108882 /* Comma */);
            }
        }
        else {
            elements.push(restoreExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseAssignmentExpression));
            if (parser.token !== 20 /* RightBracket */)
                { expect(parser, context, 67108882 /* Comma */); }
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseCoverParenthesizedExpressionAndArrowParameterList(parser, context) {
    expect(parser, context, 67174411 /* LeftParen */);
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
                parser.flags = parser.flags & ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */) | 8 /* SimpleParameterList */;
                if (parser.token !== 10 /* Arrow */)
                    { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
                return [expr];
            }
        default:
            {
                var state = 0 /* None */;
                // Record the sequence position
                var sequencepos = getLocation(parser);
                if (hasBit(parser.token, 268435456 /* IsEvalOrArguments */)) {
                    setPendingError(parser);
                    state |= 2 /* HasEvalOrArguments */;
                }
                else if (hasBit(parser.token, 20480 /* FutureReserved */)) {
                    setPendingError(parser);
                    state |= 4 /* HasReservedWords */;
                }
                if (parser.token & 33554432 /* IsBindingPattern */)
                    { state |= 16 /* HasBinding */; }
                var expr$1 = restoreExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseAssignmentExpression);
                // Sequence expression
                if (parser.token === 67108882 /* Comma */) {
                    state |= 1 /* SequenceExpression */;
                    var expressions = [expr$1];
                    while (consume(parser, context, 67108882 /* Comma */)) {
                        parser.flags &= ~4 /* AllowDestructuring */;
                        switch (parser.token) {
                            // '...'
                            case 14 /* Ellipsis */:
                                {
                                    if (!(parser.flags & 2 /* AllowBinding */))
                                        { tolerant(parser, context, 81 /* NotBindable */); }
                                    parser.flags |= 8 /* SimpleParameterList */;
                                    var restElement = parseRestElement(parser, context);
                                    expect(parser, context, 16 /* RightParen */);
                                    if (parser.token !== 10 /* Arrow */)
                                        { tolerant(parser, context, 82 /* ParamAfterRest */); }
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
                                    if (hasBit(parser.token, 268435456 /* IsEvalOrArguments */)) {
                                        setPendingError(parser);
                                        state |= 2 /* HasEvalOrArguments */;
                                    }
                                    else if (hasBit(parser.token, 20480 /* FutureReserved */)) {
                                        setPendingError(parser);
                                        state |= 4 /* HasReservedWords */;
                                    }
                                    if (parser.token & 33554432 /* IsBindingPattern */) {
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
                        if (context & 8192 /* Strict */)
                            { tolerant(parser, context, 48 /* StrictEvalArguments */); }
                        parser.flags |= 4096 /* StrictEvalArguments */;
                    }
                    else if (state & 4 /* HasReservedWords */) {
                        if (context & 8192 /* Strict */)
                            { tolerant(parser, context, 51 /* UnexpectedStrictReserved */); }
                        parser.flags |= 64 /* StrictReserved */;
                    }
                    else if (!(parser.flags & 2 /* AllowBinding */)) {
                        tolerant(parser, context, 81 /* NotBindable */);
                    }
                    if (parser.flags & 32768 /* HasYield */)
                        { tolerant(parser, context, 52 /* YieldInParameter */); }
                    if (parser.flags & 16384 /* HasAwait */)
                        { tolerant(parser, context, 53 /* AwaitInParameter */); }
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseFunctionExpression(parser, context) {
    var pos = getLocation(parser);
    if (parser.flags & 65536 /* EscapedKeyword */)
        { report(parser, 2 /* UnexpectedEscapedKeyword */); }
    expect(parser, context, 77912 /* FunctionKeyword */);
    var isGenerator = consume(parser, context, 330291 /* Multiply */) ? 1 /* Generator */ : 0 /* None */;
    var id = null;
    var token = parser.token;
    if (token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (token & 268435456 /* IsEvalOrArguments */) {
            if (context & 8192 /* Strict */)
                { tolerant(parser, context, 48 /* StrictEvalArguments */); }
            parser.flags |= 4096 /* StrictEvalArguments */;
        }
        if (parser.token & 2097152 /* IsYield */ && isGenerator & 1 /* Generator */) {
            tolerant(parser, context, 50 /* YieldBindingIdentifier */);
        }
        id = parseBindingIdentifier(parser, context);
    }
    var ref = swapContext(parser, context & ~(67108864 /* Method */ | 134217728 /* AllowSuperProperty */), isGenerator, parseFormalListAndBody);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionOrAsyncGeneratorExpression(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 8425580 /* AsyncKeyword */);
    expect(parser, context, 77912 /* FunctionKeyword */);
    var isGenerator = consume(parser, context, 330291 /* Multiply */) ? 1 /* Generator */ : 0 /* None */;
    var isAwait = 2 /* Await */;
    var id = null;
    var token = parser.token;
    if (token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (token & 268435456 /* IsEvalOrArguments */) {
            if (context & 8192 /* Strict */ || isAwait & 2 /* Await */)
                { tolerant(parser, context, 48 /* StrictEvalArguments */); }
            parser.flags |= 2048 /* StrictFunctionName */;
        }
        if (token & 4194304 /* IsAwait */)
            { tolerant(parser, context, 49 /* AwaitBindingIdentifier */); }
        if (parser.token & 2097152 /* IsYield */ && isGenerator & 1 /* Generator */)
            { tolerant(parser, context, 50 /* YieldBindingIdentifier */); }
        id = parseBindingIdentifier(parser, context);
    }
    var ref = swapContext(parser, context & ~(67108864 /* Method */ | 134217728 /* AllowSuperProperty */), isGenerator | isAwait, parseFormalListAndBody);
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
 * Parse computed property names
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ComputedPropertyName)
 *
 * @param Parser object
 * @param Context masks
 */
function parseComputedPropertyName(parser, context) {
    expect(parser, context, 33619987 /* LeftBracket */);
    var key = parseAssignmentExpression(parser, context | 131072 /* AllowIn */);
    expect(parser, context, 20 /* RightBracket */);
    return key;
}
/**
 * Parse property name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PropertyName)
 *
 * @param Parser object
 * @param Context masks
 */
function parsePropertyName(parser, context) {
    switch (parser.token) {
        case 65538 /* NumericLiteral */:
        case 65539 /* StringLiteral */:
            return parseLiteral(parser, context);
        case 33619987 /* LeftBracket */:
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
 * @param Parser object
 * @param Context masks
 */
function parseSpreadProperties(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var token = parser.token;
    if (parser.token & 33554432 /* IsBindingPattern */)
        { parser.flags &= ~4 /* AllowDestructuring */; }
    var argument = parseAssignmentExpression(parser, context | 131072 /* AllowIn */);
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
    expect(parser, context, 33619980 /* LeftBrace */);
    var properties = [];
    while (parser.token !== 603979791 /* RightBrace */) {
        properties.push(parser.token === 14 /* Ellipsis */ ?
            parseSpreadProperties(parser, context) :
            parsePropertyDefinition(parser, context));
        if (parser.token !== 603979791 /* RightBrace */)
            { expect(parser, context, 67108882 /* Comma */); }
    }
    if (parser.flags & 1024 /* HasDuplicateProto */ && parser.token !== 67239965 /* Assign */) {
        tolerant(parser, context, 65 /* DuplicateProto */);
    }
    // Unset the 'HasProtoField' flag now, we are done!
    parser.flags &= ~(512 /* HasProtoField */ | 1024 /* HasDuplicateProto */);
    expect(parser, context, 603979791 /* RightBrace */);
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
 * @param Parser object
 * @param Context masks
 */
function parsePropertyDefinition(parser, context) {
    var pos = getLocation(parser);
    var value;
    var state = 0 /* None */;
    if (consume(parser, context, 330291 /* Multiply */))
        { state |= 2 /* Generator */; }
    var t = parser.token;
    if (parser.token === 33619987 /* LeftBracket */)
        { state |= 16 /* Computed */; }
    var key = parsePropertyName(parser, context);
    if (!(parser.token & 67108864 /* IsEndMarker */)) {
        if (!(state & 2 /* Generator */) && t & 8388608 /* IsAsync */ && !(parser.flags & 1 /* NewLine */)) {
            t = parser.token;
            if (parser.flags & 65536 /* EscapedKeyword */)
                { report(parser, 2 /* UnexpectedEscapedKeyword */); }
            state |= 1 /* Async */;
            if (consume(parser, context, 330291 /* Multiply */))
                { state |= 2 /* Generator */; }
            key = parsePropertyName(parser, context);
        }
        else if ((t === 36975 /* GetKeyword */ || t === 36976 /* SetKeyword */)) {
            if (parser.flags & 65536 /* EscapedKeyword */)
                { report(parser, 2 /* UnexpectedEscapedKeyword */); }
            if (state & 2 /* Generator */) {
                tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
            }
            state |= t === 36975 /* GetKeyword */ ? 4 /* Getter */ : 8 /* Setter */;
            key = parsePropertyName(parser, context);
        }
    }
    // method
    if (parser.token === 67174411 /* LeftParen */) {
        if (!(state & (4 /* Getter */ | 8 /* Setter */))) {
            state |= 32 /* Method */;
            parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
        }
        value = parseMethodDeclaration(parser, context | 67108864 /* Method */, state);
    }
    else {
        if (state & (2 /* Generator */ | 1 /* Async */)) {
            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
        }
        if (parser.token === 67108885 /* Colon */) {
            if (!(state & 16 /* Computed */) && parser.tokenValue === '__proto__') {
                // Annex B defines an tolerate error for duplicate PropertyName of `__proto__`,
                // in object initializers, but this does not apply to Object Assignment
                // patterns, so we need to validate this *after* done parsing
                // the object expression
                parser.flags |= parser.flags & 512 /* HasProtoField */ ? 1024 /* HasDuplicateProto */ : 512 /* HasProtoField */;
            }
            expect(parser, context, 67108885 /* Colon */);
            if (parser.token & 4194304 /* IsAwait */)
                { parser.flags |= 16384 /* HasAwait */; }
            value = restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression);
        }
        else {
            if (state & 1 /* Async */ || !isValidIdentifier(context, t)) {
                tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(t));
            }
            else if (context & (8192 /* Strict */ | 524288 /* Yield */) && t & 2097152 /* IsYield */) {
                setPendingError(parser);
                parser.flags |= 32768 /* HasYield */;
            }
            state |= 64 /* Shorthand */;
            if (consume(parser, context, 67239965 /* Assign */)) {
                if (context & (8192 /* Strict */ | 524288 /* Yield */) && parser.token & 2097152 /* IsYield */) {
                    setPendingError(parser);
                    parser.flags |= 32768 /* HasYield */;
                }
                else if (context & (8192 /* Strict */ | 262144 /* Async */) && parser.token & 4194304 /* IsAwait */) {
                    setPendingError(parser);
                    parser.flags |= 16384 /* HasAwait */;
                }
                value = parseAssignmentPattern(parser, context | 131072 /* AllowIn */, key, pos);
                parser.pendingExpressionError = {
                    error: 4 /* InvalidLHSInAssignment */,
                    line: parser.startLine,
                    column: parser.startColumn,
                    index: parser.startIndex,
                };
            }
            else {
                if (t & 4194304 /* IsAwait */) {
                    if (context & 262144 /* Async */)
                        { tolerant(parser, context, 47 /* UnexpectedReserved */); }
                    setPendingError(parser);
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
 * @param Parser object
 * @param Context masks
 */
function parseMethodDeclaration(parser, context, state) {
    var pos = getLocation(parser);
    var isGenerator = state & 2 /* Generator */ ? 1 /* Generator */ : 0 /* None */;
    var isAsync = state & 1 /* Async */ ? 2 /* Await */ : 0 /* None */;
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
 * @param Parser object
 * @param Context masks
 */
function parseArrowFunction(parser, context, pos, params) {
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    if (parser.flags & 1 /* NewLine */)
        { tolerant(parser, context, 83 /* LineBreakAfterArrow */); }
    expect(parser, context, 10 /* Arrow */);
    return parseArrowBody(parser, context & ~262144 /* Async */, params, pos, 0 /* None */);
}
/**
 * Parse async arrow function
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param Parser object
 * @param Context masks
 */
function parseAsyncArrowFunction(parser, context, state, pos, params) {
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    if (parser.flags & 1 /* NewLine */)
        { tolerant(parser, context, 36 /* LineBreakAfterAsync */); }
    expect(parser, context, 10 /* Arrow */);
    return parseArrowBody(parser, context | 262144 /* Async */, params, pos, state);
}
/**
 * Shared helper function for both async arrow and arrows
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrowFunction)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncArrowFunction)
 *
 * @param Parser object
 * @param Context masks
 */
// https://tc39.github.io/ecma262/#prod-AsyncArrowFunction
function parseArrowBody(parser, context, params, pos, state) {
    var token = parser.token;
    parser.pendingExpressionError = null;
    for (var i in params)
        { reinterpret(parser, context | 1048576 /* InParameter */, params[i]); }
    var expression = parser.token !== 33619980 /* LeftBrace */;
    var body = expression ? parseExpressionCoverGrammar(parser, context & ~(524288 /* Yield */ | 1048576 /* InParameter */), parseAssignmentExpression) :
        swapContext(parser, context & ~524288 /* Yield */ | 2097152 /* InFunctionBody */, state, parseFunctionBody);
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
 * @param Parser object
 * @param Context masks
 */
function parseFormalListAndBody(parser, context, state) {
    var paramList = parseFormalParameters(parser, context | 1048576 /* InParameter */, state);
    var args = paramList.args;
    var params = paramList.params;
    var body = parseFunctionBody(parser, context | 2097152 /* InFunctionBody */, args);
    return { params: params, body: body };
}
/**
 * Parse funciton body
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionBody)
 *
 * @param Parser object
 * @param Context masks
 */
function parseFunctionBody(parser, context, params) {
    // Note! The 'params' has an 'any' type now because it's really shouldn't be there. This should have been
    // on the parser object instead. So for now the 'params' arg are only used within the
    // 'parseFormalListAndBody' method, and not within the arrow function body.
    var pos = getLocation(parser);
    expect(parser, context, 33619980 /* LeftBrace */);
    var body = [];
    while (parser.token === 65539 /* StringLiteral */) {
        var tokenRaw = parser.tokenRaw;
        var tokenValue = parser.tokenValue;
        body.push(parseDirective(parser, context));
        if (tokenRaw.length === /* length of prologue*/ 12 && tokenValue === 'use strict') {
            if (parser.flags & 8 /* SimpleParameterList */) {
                tolerant(parser, context, 66 /* IllegalUseStrict */);
            }
            else if (parser.flags & (64 /* StrictReserved */ | 2048 /* StrictFunctionName */)) {
                tolerant(parser, context, 51 /* UnexpectedStrictReserved */);
            }
            else if (parser.flags & 4096 /* StrictEvalArguments */) {
                tolerant(parser, context, 48 /* StrictEvalArguments */);
            }
            context |= 8192 /* Strict */;
        }
    }
    if (context & 8192 /* Strict */) {
        validateParams(parser, context, params);
    }
    var labelSet = parser.labelSet;
    parser.labelSet = {};
    var savedFlags = parser.flags;
    parser.flags = parser.flags & ~(2048 /* StrictFunctionName */ | 4096 /* StrictEvalArguments */ | 16 /* Switch */ | 32 /* Iteration */) | 4 /* AllowDestructuring */;
    while (parser.token !== 603979791 /* RightBrace */) {
        body.push(parseStatementListItem(parser, context));
    }
    if (savedFlags & 32 /* Iteration */)
        { parser.flags |= 32 /* Iteration */; }
    if (savedFlags & 16 /* Switch */)
        { parser.flags |= 16 /* Switch */; }
    parser.labelSet = labelSet;
    expect(parser, context, 603979791 /* RightBrace */);
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
 * @param Parser object
 * @param Context masks
 * @param {state} Optional objectstate. Default to none
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
    expect(parser, context, 67174411 /* LeftParen */);
    parser.flags &= ~(8 /* SimpleParameterList */ | 64 /* StrictReserved */);
    var args = [];
    var params = [];
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            if (state & 8 /* Setter */)
                { tolerant(parser, context, 71 /* BadSetterRestParameter */); }
            parser.flags |= 8 /* SimpleParameterList */;
            params.push(parseRestElement(parser, context, args));
            break;
        }
        params.push(parseFormalParameterList(parser, context, args));
        if (!consume(parser, context, 67108882 /* Comma */))
            { break; }
        if (parser.token === 16 /* RightParen */)
            { break; }
    }
    if (state & 8 /* Setter */ && params.length !== 1) {
        tolerant(parser, context, 70 /* BadSetterArity */);
    }
    if (state & 4 /* Getter */ && params.length > 0) {
        tolerant(parser, context, 69 /* BadGetterArity */);
    }
    expect(parser, context, 16 /* RightParen */);
    return { params: params, args: args };
}
/**
 * Parse formal parameter list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FormalParameterList)
 *
 * @param Parser object
 * @param Context masks
 */
function parseFormalParameterList(parser, context, args) {
    var pos = getLocation(parser);
    if (parser.token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (hasBit(parser.token, 20480 /* FutureReserved */)) {
            if (context & 8192 /* Strict */)
                { tolerant(parser, context, 51 /* UnexpectedStrictReserved */); }
            parser.flags |= 2048 /* StrictFunctionName */;
        }
        if (hasBit(parser.token, 268435456 /* IsEvalOrArguments */)) {
            if (context & 8192 /* Strict */)
                { tolerant(parser, context, 48 /* StrictEvalArguments */); }
            parser.flags |= 4096 /* StrictEvalArguments */;
        }
    }
    else {
        parser.flags |= 8 /* SimpleParameterList */;
    }
    var left = parseBindingIdentifierOrPattern(parser, context, args);
    if (!consume(parser, context, 67239965 /* Assign */))
        { return left; }
    if (parser.token & (2097152 /* IsYield */ | 4194304 /* IsAwait */) && context & (524288 /* Yield */ | 262144 /* Async */)) {
        tolerant(parser, context, parser.token & 4194304 /* IsAwait */ ? 53 /* AwaitInParameter */ : 52 /* YieldInParameter */);
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
 * @param Parser object
 * @param Context masks
 */
function parseClassExpression(parser, context) {
    var pos = getLocation(parser);
    if (parser.flags & 65536 /* EscapedKeyword */)
        { report(parser, 2 /* UnexpectedEscapedKeyword */); }
    expect(parser, context | 1073741824 /* DisallowEscapedKeyword */, 77901 /* ClassKeyword */);
    var token = parser.token;
    var state = 0 /* None */;
    if (context & 262144 /* Async */ && token & 4194304 /* IsAwait */)
        { tolerant(parser, context, 49 /* AwaitBindingIdentifier */); }
    var id = (token !== 33619980 /* LeftBrace */ && token !== 12372 /* ExtendsKeyword */) ?
        parseBindingIdentifier(parser, context | 8192 /* Strict */ | 1073741824 /* DisallowEscapedKeyword */) :
        null;
    var superClass = null;
    if (consume(parser, context, 12372 /* ExtendsKeyword */)) {
        superClass = parseLeftHandSideExpression(parser, context | 8192 /* Strict */, pos);
        state |= 512 /* Heritage */;
    }
    return finishNode(context, parser, pos, {
        type: 'ClassExpression',
        id: id,
        superClass: superClass,
        body: parseClassBodyAndElementList(parser, context | 8192 /* Strict */, state)
    });
}
/**
 * Parse class body and element list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElementList)
 *
 *
 * @param Parser object
 * @param Context masks
 */
function parseClassBodyAndElementList(parser, context, state) {
    var pos = getLocation(parser);
    expect(parser, context, 33619980 /* LeftBrace */);
    var body = [];
    while (parser.token !== 603979791 /* RightBrace */) {
        if (!consume(parser, context, 603979793 /* Semicolon */)) {
            body.push(parseClassElement(parser, context, state));
        }
    }
    expect(parser, context, 603979791 /* RightBrace */);
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
 * @param Parser object
 * @param Context masks
 */
function parseClassElement(parser, context, state) {
    var pos = getLocation(parser);
    if (context & 1 /* OptionsNext */ && parser.token === 115 /* Hash */) {
        return parsePrivateFields(parser, context, pos);
    }
    var tokenValue = parser.tokenValue;
    var token = parser.token;
    if (consume(parser, context, 330291 /* Multiply */))
        { state |= 2 /* Generator */; }
    if (parser.token === 33619987 /* LeftBracket */)
        { state |= 16 /* Computed */; }
    if (parser.tokenValue === 'constructor') {
        if (state & 2 /* Generator */)
            { tolerant(parser, context, 45 /* ConstructorIsGenerator */); }
        state |= 256 /* Constructor */;
    }
    var key = parsePropertyName(parser, context);
    if (context & 1 /* OptionsNext */ && isInstanceField(parser)) {
        return parseFieldDefinition(parser, context, key, state, pos);
    }
    var value;
    if (!(parser.token & 67108864 /* IsEndMarker */)) {
        if (token === 20585 /* StaticKeyword */) {
            token = parser.token;
            if (consume(parser, context, 330291 /* Multiply */))
                { state |= 2 /* Generator */; }
            tokenValue = parser.tokenValue;
            if (parser.token === 33619987 /* LeftBracket */)
                { state |= 16 /* Computed */; }
            if (parser.tokenValue === 'prototype')
                { tolerant(parser, context, 67 /* StaticPrototype */); }
            state |= 128 /* Static */;
            key = parsePropertyName(parser, context);
            if (context & 1 /* OptionsNext */ && isInstanceField(parser)) {
                if (tokenValue === 'constructor')
                    { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
                return parseFieldDefinition(parser, context, key, state, pos);
            }
        }
        if (parser.token !== 67174411 /* LeftParen */) {
            if (token & 8388608 /* IsAsync */ && !(state & 2 /* Generator */) && !(parser.flags & 1 /* NewLine */)) {
                token = parser.token;
                tokenValue = parser.tokenValue;
                state |= 1 /* Async */;
                if (consume(parser, context, 330291 /* Multiply */))
                    { state |= 2 /* Generator */; }
                if (parser.token === 33619987 /* LeftBracket */)
                    { state |= 16 /* Computed */; }
                key = parsePropertyName(parser, context);
            }
            else if ((token === 36975 /* GetKeyword */ || token === 36976 /* SetKeyword */)) {
                state |= token === 36975 /* GetKeyword */ ? 4 /* Getter */ : 8 /* Setter */;
                tokenValue = parser.tokenValue;
                if (parser.token === 33619987 /* LeftBracket */)
                    { state |= 16 /* Computed */; }
                key = parsePropertyName(parser, context);
            }
            if (tokenValue === 'prototype') {
                tolerant(parser, context, 67 /* StaticPrototype */);
            }
            else if (!(state & 128 /* Static */) && tokenValue === 'constructor') {
                tolerant(parser, context, 46 /* ConstructorSpecialMethod */);
            }
        }
    }
    if (parser.token === 67174411 /* LeftParen */) {
        if (!(state & (4 /* Getter */ | 8 /* Setter */)))
            { state |= 32 /* Method */; }
        if (state & 512 /* Heritage */ && state & 256 /* Constructor */) {
            context |= 134217728 /* AllowSuperProperty */;
        }
        value = parseMethodDeclaration(parser, context | 67108864 /* Method */, state);
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
 * @param Parser object
 * @param Context masks
 */
function parseFieldDefinition(parser, context, key, state, pos) {
    if (state & 256 /* Constructor */)
        { tolerant(parser, context, 0 /* Unexpected */); }
    var value = null;
    if (state & (1 /* Async */ | 2 /* Generator */))
        { tolerant(parser, context, 0 /* Unexpected */); }
    if (consume(parser, context, 67239965 /* Assign */)) {
        if (parser.token & 268435456 /* IsEvalOrArguments */)
            { tolerant(parser, context, 48 /* StrictEvalArguments */); }
        value = parseAssignmentExpression(parser, context);
    }
    consume(parser, context, 67108882 /* Comma */);
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
 * @param parser Parser object
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
 * @param parser Parser object
 * @param context Context masks
 */
function parsePrivateFields(parser, context, pos) {
    expect(parser, context | 65536 /* InClass */, 115 /* Hash */);
    if (parser.tokenValue === 'constructor')
        { tolerant(parser, context, 41 /* PrivateFieldConstructor */); }
    var key = parsePrivateName(parser, context, pos);
    if (parser.token === 67174411 /* LeftParen */)
        { return parsePrivateMethod(parser, context, key, pos); }
    var value = null;
    if (consume(parser, context, 67239965 /* Assign */)) {
        if (parser.token & 268435456 /* IsEvalOrArguments */)
            { tolerant(parser, context, 48 /* StrictEvalArguments */); }
        value = parseAssignmentExpression(parser, context);
    }
    consume(parser, context, 67108882 /* Comma */);
    return finishNode(context, parser, pos, {
        type: 'FieldDefinition',
        key: key,
        value: value,
        computed: false,
        static: false // Note: This deviates from the ESTree specs. Added to support static field names
    });
}
function parsePrivateMethod(parser, context, key, pos) {
    var value = parseMethodDeclaration(parser, context | 8192 /* Strict */ | 67108864 /* Method */, 0 /* None */);
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    return parseMethodDefinition(parser, context, key, value, 32 /* Method */, pos);
}
/**
 * Parse import expressions
 *
 * @param Parser object
 * @param Context masks
 */
function parseImportExpressions(parser, context, poss) {
    if (!(context & 1 /* OptionsNext */))
        { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
    var pos = getLocation(parser);
    var id = parseIdentifier(parser, context);
    // Import.meta - Stage 3 proposal
    if (context & 1 /* OptionsNext */ && consume(parser, context, 67108877 /* Period */)) {
        if (context & 16384 /* Module */ && parser.tokenValue === 'meta') {
            return parseMetaProperty(parser, context, id, pos);
        }
        tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
    }
    var expr = finishNode(context, parser, pos, {
        type: 'Import'
    });
    expect(parser, context, 67174411 /* LeftParen */);
    var args = parseExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseAssignmentExpression);
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
 * @param Parser object
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
 * @param Parser object
 * @param Context masks
 */
function parseNewExpression(parser, context) {
    var pos = getLocation(parser);
    var token = parser.token;
    var tokenValue = parser.tokenValue;
    var id = parseIdentifier(parser, context);
    if (consume(parser, context, 67108877 /* Period */)) {
        if (parser.tokenValue !== 'target' ||
            !(context & (1048576 /* InParameter */ | 2097152 /* InFunctionBody */)))
            { tolerant(parser, context, 54 /* MetaNotInFunctionBody */); }
        return parseMetaProperty(parser, context, id, pos);
    }
    return finishNode(context, parser, pos, {
        type: 'NewExpression',
        callee: parseImportOrMemberExpression(parser, context, pos),
        arguments: parser.token === 67174411 /* LeftParen */ ? parseArgumentList(parser, context) : []
    });
}
/**
 * Parse either import or member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param Parser object
 * @param Context masks
 */
function parseImportOrMemberExpression(parser, context, pos) {
    var token = parser.token;
    if (context & 1 /* OptionsNext */ && token === 77914 /* ImportKeyword */) {
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
 * @param Parser object
 * @param Context masks
 */
function parseSuperProperty(parser, context) {
    var pos = getLocation(parser);
    if (parser.flags & 65536 /* EscapedKeyword */)
        { report(parser, 2 /* UnexpectedEscapedKeyword */); }
    expect(parser, context, 77917 /* SuperKeyword */);
    var token = parser.token;
    if (token === 67174411 /* LeftParen */) {
        // The super property has to be within a class constructor
        if (!(context & 134217728 /* AllowSuperProperty */)) {
            tolerant(parser, context, 55 /* BadSuperCall */);
        }
    }
    else if (token === 33619987 /* LeftBracket */ || token === 67108877 /* Period */) {
        if (!(context & 67108864 /* Method */))
            { tolerant(parser, context, 56 /* UnexpectedSuper */); }
    }
    else {
        tolerant(parser, context, 57 /* LoneSuper */);
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
 * @param Parser object
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
 * @param Parser object
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
 * @param Parser object
 * @param Context masks
 */
function parseTemplate(parser, context, expressions, quasis) {
    if ( expressions === void 0 ) expressions = [];
    if ( quasis === void 0 ) quasis = [];

    var pos = getLocation(parser);
    var tokenValue = parser.tokenValue;
    var tokenRaw = parser.tokenRaw;
    expect(parser, context, 65544 /* TemplateCont */);
    expressions.push(parseExpression(parser, context));
    var t = getLocation(parser);
    quasis.push(parseTemplateHead(parser, context, tokenValue, tokenRaw, pos));
    if (parser.token === 65545 /* TemplateTail */) {
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
 * @param Parser object
 * @param Context masks
 */
function parseTemplateSpans(parser, context, pos) {
    if ( pos === void 0 ) pos = getLocation(parser);

    var tokenValue = parser.tokenValue;
    var tokenRaw = parser.tokenRaw;
    expect(parser, context, 65545 /* TemplateTail */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBindingIdentifierOrPattern(parser, context, args) {
    if ( args === void 0 ) args = [];

    var token = parser.token;
    if (token & 33554432 /* IsBindingPattern */) {
        return token === 33619980 /* LeftBrace */ ?
            parserObjectAssignmentPattern(parser, context) :
            parseArrayAssignmentPattern(parser, context);
    }
    else if (token & (4194304 /* IsAwait */ | 2097152 /* IsYield */)) {
        if (token & 4194304 /* IsAwait */ && (context & (262144 /* Async */ | 16384 /* Module */))) {
            tolerant(parser, context, 49 /* AwaitBindingIdentifier */);
        }
        else if (token & 2097152 /* IsYield */ && (context & (524288 /* Yield */ | 8192 /* Strict */))) {
            tolerant(parser, context, 50 /* YieldBindingIdentifier */);
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
    var token = parser.token;
    if (token & 268435456 /* IsEvalOrArguments */) {
        if (context & 8192 /* Strict */)
            { tolerant(parser, context, 16 /* StrictLHSAssignment */); }
        parser.flags |= 4096 /* StrictEvalArguments */;
    }
    else if (context & 8388608 /* BlockScope */ && token === 86088 /* LetKeyword */) {
        // let is disallowed as a lexically bound name
        tolerant(parser, context, 26 /* LetInLexicalBinding */);
    }
    else if (hasBit(token, 20480 /* FutureReserved */)) {
        if (context & 8192 /* Strict */)
            { tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(token)); }
        parser.flags |= 2048 /* StrictFunctionName */;
    }
    else if (!isValidIdentifier(context, token)) {
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAssignmentRestElementOrProperty(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var argument = parseBindingIdentifierOrPattern(parser, context);
    if (parser.token == 67108882 /* Comma */)
        { tolerant(parser, context, 93 /* RestWithComma */); }
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument: argument
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
function parseArrayAssignmentPattern(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 33619987 /* LeftBracket */);
    var elements = [];
    while (parser.token !== 20 /* RightBracket */) {
        if (consume(parser, context, 67108882 /* Comma */)) {
            elements.push(null);
        }
        else {
            if (parser.token === 14 /* Ellipsis */) {
                elements.push(parseAssignmentRestElementOrProperty(parser, context));
                break;
            }
            else {
                elements.push(parseExpressionCoverGrammar(parser, context | 131072 /* AllowIn */, parseBindingInitializer));
            }
            if (parser.token !== 20 /* RightBracket */)
                { expect(parser, context, 67108882 /* Comma */); }
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
 * @param Parser Parser object
 * @param Context Context masks
 */
function parserObjectAssignmentPattern(parser, context) {
    var pos = getLocation(parser);
    var properties = [];
    expect(parser, context, 33619980 /* LeftBrace */);
    while (parser.token !== 603979791 /* RightBrace */) {
        if (parser.token === 14 /* Ellipsis */) {
            properties.push(parseAssignmentRestElementOrProperty(parser, context));
            break;
        }
        properties.push(parseAssignmentProperty(parser, context));
        if (parser.token !== 603979791 /* RightBrace */)
            { expect(parser, context, 67108882 /* Comma */); }
    }
    expect(parser, context, 603979791 /* RightBrace */);
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
 * @param parser Parser object
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
 * Parse binding initializer
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentPattern)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function parseBindingInitializer(parser, context) {
    var pos = getLocation(parser);
    var left = parseBindingIdentifierOrPattern(parser, context);
    return !consume(parser, context, 67239965 /* Assign */) ?
        left :
        finishNode(context, parser, pos, {
            type: 'AssignmentPattern',
            left: left,
            right: parseAssignmentExpression(parser, context | 131072 /* AllowIn */)
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
    var pos = getLocation(parser);
    var token = parser.token;
    var key;
    var value;
    var computed = false;
    var shorthand = false;
    // single name binding
    if (token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */)) {
        key = parseIdentifier(parser, context);
        shorthand = !consume(parser, context, 67108885 /* Colon */);
        if (shorthand) {
            var hasInitializer = consume(parser, context, 67239965 /* Assign */);
            if (context & 524288 /* Yield */ && token & 2097152 /* IsYield */)
                { tolerant(parser, context, 50 /* YieldBindingIdentifier */); }
            if (!isValidIdentifier(context, token))
                { tolerant(parser, context, 47 /* UnexpectedReserved */); }
            value = hasInitializer ? parseAssignmentPattern(parser, context | 131072 /* AllowIn */, key, pos) : key;
        }
        else
            { value = parseBindingInitializer(parser, context); }
    }
    else {
        computed = token === 33619987 /* LeftBracket */;
        key = parsePropertyName(parser, context);
        expect(parser, context, 67108885 /* Colon */);
        value = parseExpressionCoverGrammar(parser, context, parseBindingInitializer);
    }
    // Note! The specs specifically state that this is "assignment property", but
    // nothing in ESTree specs explains the difference between this "property" and the "property" for object literals.
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseClassDeclaration(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 77901 /* ClassKeyword */);
    var token = parser.token;
    var id = (context & 33554432 /* RequireIdentifier */ && (parser.token !== 134283265 /* Identifier */))
        ? null :
        parseBindingIdentifier(parser, context | 8192 /* Strict */);
    var state = 0 /* None */;
    var superClass = null;
    if (consume(parser, context, 12372 /* ExtendsKeyword */)) {
        superClass = parseLeftHandSideExpression(parser, context | 8192 /* Strict */, pos);
        state |= 512 /* Heritage */;
    }
    return finishNode(context, parser, pos, {
        type: 'ClassDeclaration',
        id: id,
        superClass: superClass,
        body: parseClassBodyAndElementList(parser, context & ~33554432 /* RequireIdentifier */ | 8192 /* Strict */ | 65536 /* InClass */, state)
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
    var pos = getLocation(parser);
    expect(parser, context, 77912 /* FunctionKeyword */);
    var isGenerator = 0 /* None */;
    if (consume(parser, context, 330291 /* Multiply */)) {
        if (context & 4194304 /* AllowSingleStatement */ && !(context & 2097152 /* InFunctionBody */)) {
            tolerant(parser, context, 21 /* GeneratorInSingleStatementContext */);
        }
        isGenerator = 1 /* Generator */;
    }
    return parseFunctionDeclarationBody(parser, context & ~(4194304 /* AllowSingleStatement */ | 67108864 /* Method */ | 134217728 /* AllowSuperProperty */), isGenerator, pos);
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
    var id = parseFunctionDeclarationName(parser, context);
    var ref = swapContext(parser, context & ~33554432 /* RequireIdentifier */, state, parseFormalListAndBody);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 8425580 /* AsyncKeyword */);
    expect(parser, context, 77912 /* FunctionKeyword */);
    var isAwait = 2 /* Await */;
    var isGenerator = consume(parser, context, 330291 /* Multiply */) ? 1 /* Generator */ : 0 /* None */;
    return parseFunctionDeclarationBody(parser, context & ~(4194304 /* AllowSingleStatement */ | 67108864 /* Method */ | 134217728 /* AllowSuperProperty */), isGenerator | isAwait, pos);
}
/**
 * Shared helper function for "parseFunctionDeclaration" and "parseAsyncFunctionOrAsyncGeneratorDeclaration"
 * so we can re-use the same logic when parsing out the function name, or throw an
 * error if the 'RequireIdentifier' mask is not set
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseFunctionDeclarationName(parser, context) {
    var token = parser.token;
    var id = null;
    if (context & 524288 /* Yield */ && token & 2097152 /* IsYield */)
        { tolerant(parser, context, 50 /* YieldBindingIdentifier */); }
    if (context & 262144 /* Async */ && token & 4194304 /* IsAwait */)
        { tolerant(parser, context, 49 /* AwaitBindingIdentifier */); }
    if (token !== 67174411 /* LeftParen */) {
        id = parseBindingIdentifier(parser, context);
        // Unnamed functions are forbidden in statement context.
    }
    else if (!(context & 33554432 /* RequireIdentifier */))
        { tolerant(parser, context, 39 /* UnNamedFunctionDecl */); }
    return id;
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
    var pos = getLocation(parser);
    var isBindingPattern = (parser.token & 33554432 /* IsBindingPattern */) !== 0;
    var id = parseBindingIdentifierOrPattern(parser, context);
    var init = null;
    if (consume(parser, context, 67239965 /* Assign */)) {
        init = parseExpressionCoverGrammar(parser, context & ~(8388608 /* BlockScope */ | 16777216 /* ForStatement */), parseAssignmentExpression);
        if (parser.token & 1073741824 /* IsInOrOf */ && (context & 16777216 /* ForStatement */ || isBindingPattern)) {
            tolerant(parser, context, 24 /* ForInOfLoopInitializer */, tokenDesc(parser.token));
        }
        // Note: Initializers are required for 'const' and binding patterns
    }
    else if (!(parser.token & 1073741824 /* IsInOrOf */) && (isConst || isBindingPattern)) {
        tolerant(parser, context, 23 /* DeclarationMissingInitializer */, isConst ? 'const' : 'destructuring');
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseVariableDeclarationList(parser, context, isConst) {
    var list = [parseVariableDeclaration(parser, context, isConst)];
    while (consume(parser, context, 67108882 /* Comma */))
        { list.push(parseVariableDeclaration(parser, context, isConst)); }
    if (context & 16777216 /* ForStatement */ && parser.token & 1073741824 /* IsInOrOf */ && list.length !== 1) {
        tolerant(parser, context, 25 /* ForInOfLoopMultiBindings */, tokenDesc(parser.token));
    }
    return list;
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
        case 77912 /* FunctionKeyword */:
            return parseFunctionDeclaration(parser, context);
        case 77901 /* ClassKeyword */:
            return parseClassDeclaration(parser, context);
        case 86088 /* LetKeyword */:
            return parseLetOrExpressionStatement(parser, context | 131072 /* AllowIn */);
        case 77897 /* ConstKeyword */:
            return parseVariableStatement(parser, context | 8388608 /* BlockScope */ | 131072 /* AllowIn */);
        case 8425580 /* AsyncKeyword */:
            return parseAsyncFunctionDeclarationOrStatement(parser, context);
        case 77914 /* ImportKeyword */: {
            if (context & 1 /* OptionsNext */ && lookahead(parser, context, nextTokenIsLeftParenOrPeriod)) {
                return parseExpressionStatement(parser, context | 131072 /* AllowIn */);
            }
        }
        case 12371 /* ExportKeyword */:
            if (context & 16384 /* Module */) {
                tolerant(parser, context, parser.token == 77914 /* ImportKeyword */ ? 33 /* ImportDeclAtTopLevel */ : 34 /* ExportDeclAtTopLevel */);
            }
        default:
            return parseStatement(parser, context | 4194304 /* AllowSingleStatement */);
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
        case 77895 /* VarKeyword */:
            return parseVariableStatement(parser, context | 131072 /* AllowIn */);
        case 603979793 /* Semicolon */:
            return parseEmptyStatement(parser, context);
        case 77918 /* SwitchKeyword */:
            return parseSwitchStatement(parser, context);
        case 33619980 /* LeftBrace */:
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
        case 602208 /* ThrowKeyword */:
            return parseThrowStatement(parser, context);
        case 12385 /* TryKeyword */:
            return parseTryStatement(parser, context);
        case 12374 /* ForKeyword */:
            return parseForStatement(parser, context | 16777216 /* ForStatement */);
        case 8425580 /* AsyncKeyword */:
            if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
                tolerant(parser, context, 35 /* AsyncFunctionInSingleStatementContext */);
            }
            return parseExpressionOrLabelledStatement(parser, context | 4194304 /* AllowSingleStatement */);
        case 77912 /* FunctionKeyword */:
            // V8
            tolerant(parser, context, context & 8192 /* Strict */ ? 18 /* StrictFunction */ : 19 /* SloppyFunction */);
        case 77901 /* ClassKeyword */:
            tolerant(parser, context, 20 /* ForbiddenAsStatement */, tokenDesc(parser.token));
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseContinueStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 12366 /* ContinueKeyword */);
    // Appearing of continue without an IterationStatement leads to syntax error
    if (!(parser.flags & 48 /* AllowBreakOrContinue */)) {
        tolerant(parser, context, 29 /* InvalidNestedStatement */, tokenDesc(parser.token));
    }
    var label = null;
    var tokenValue = parser.tokenValue;
    if (!(parser.flags & 1 /* NewLine */) && (parser.token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */))) {
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBreakStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 12362 /* BreakKeyword */);
    var label = null;
    // Use 'tokenValue' to avoid accessing another object shape which in turn can lead to
    // a "'deopt" when getting the identifier value (*if any*)
    var tokenValue = parser.tokenValue;
    if (!(parser.flags & 1 /* NewLine */) && (parser.token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */))) {
        label = parseIdentifier(parser, context);
        validateBreakOrContinueLabel(parser, context, tokenValue, /* isContinue */ false);
    }
    else if (!(parser.flags & 48 /* AllowBreakOrContinue */)) {
        tolerant(parser, context, 29 /* InvalidNestedStatement */, 'break');
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseIfStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 12377 /* IfKeyword */);
    expect(parser, context, 67174411 /* LeftParen */);
    var test = parseExpression(parser, context | 131072 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    var consequent = parseConsequentOrAlternate(parser, context | 1073741824 /* DisallowEscapedKeyword */);
    var alternate = consume(parser, context, 12370 /* ElseKeyword */) ? parseConsequentOrAlternate(parser, context) : null;
    return finishNode(context, parser, pos, {
        type: 'IfStatement',
        test: test,
        consequent: consequent,
        alternate: alternate
    });
}
/**
 * Parse either consequent or alternate. Supports AnnexB.
 * @param parser  Parser object
 * @param context Context masks
 */
function parseConsequentOrAlternate(parser, context) {
    return context & 8192 /* Strict */ || parser.token !== 77912 /* FunctionKeyword */ ?
        parseStatement(parser, context & ~4194304 /* AllowSingleStatement */) :
        parseFunctionDeclaration(parser, context);
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
    var pos = getLocation(parser);
    expect(parser, context, 12367 /* DebuggerKeyword */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseTryStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 12385 /* TryKeyword */);
    var block = parseBlockStatement(parser, context | 1073741824 /* DisallowEscapedKeyword */);
    var handler = parser.token === 12364 /* CatchKeyword */ ? parseCatchBlock(parser, context | 1073741824 /* DisallowEscapedKeyword */) : null;
    var finalizer = consume(parser, context, 12373 /* FinallyKeyword */) ? parseBlockStatement(parser, context) : null;
    if (!handler && !finalizer)
        { tolerant(parser, context, 84 /* NoCatchOrFinally */); }
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseCatchBlock(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 12364 /* CatchKeyword */);
    var param = null;
    if (context & 1 /* OptionsNext */
        ? consume(parser, context, 67174411 /* LeftParen */)
        : expect(parser, context, 67174411 /* LeftParen */)) {
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseThrowStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 602208 /* ThrowKeyword */);
    if (parser.flags & 1 /* NewLine */)
        { tolerant(parser, context, 85 /* NewlineAfterThrow */); }
    var argument = parseExpression(parser, context | 131072 /* AllowIn */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExpressionStatement(parser, context) {
    var pos = getLocation(parser);
    var expr = parseExpression(parser, context | 131072 /* AllowIn */);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
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
    var pos = getLocation(parser);
    var directive = parser.tokenRaw.slice(1, -1);
    var expr = parseExpression(parser, context | 131072 /* AllowIn */);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ExpressionStatement',
        expression: expr,
        directive: directive
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
    var pos = getLocation(parser);
    var tokenValue = parser.tokenValue;
    var token = parser.token;
    var expr = parseExpression(parser, context | 131072 /* AllowIn */);
    if (token & (134217728 /* IsIdentifier */ | 4096 /* Keyword */) && parser.token === 67108885 /* Colon */) {
        // If within generator function bodies, we do it like this so we can throw an nice error message
        if (context & 524288 /* Yield */ && token & 2097152 /* IsYield */)
            { tolerant(parser, context, 58 /* YieldReservedKeyword */); }
        expect(parser, context, 67108885 /* Colon */, 88 /* LabelNoColon */);
        if (hasLabel(parser, tokenValue))
            { tolerant(parser, context, 28 /* LabelRedeclaration */, tokenValue); }
        addLabel(parser, tokenValue);
        var body;
        if (!(context & 8192 /* Strict */) && (context & 4194304 /* AllowSingleStatement */) && parser.token === 77912 /* FunctionKeyword */) {
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseDoWhileStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 12369 /* DoKeyword */);
    var body = parseIterationStatement(parser, context);
    expect(parser, context, 12402 /* WhileKeyword */);
    expect(parser, context, 67174411 /* LeftParen */);
    var test = parseExpression(parser, context | 131072 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    consume(parser, context, 603979793 /* Semicolon */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseWhileStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 12402 /* WhileKeyword */);
    expect(parser, context, 67174411 /* LeftParen */);
    var test = parseExpression(parser, context | 131072 /* AllowIn */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseBlockStatement(parser, context) {
    var pos = getLocation(parser);
    var body = [];
    expect(parser, context, 33619980 /* LeftBrace */);
    while (parser.token !== 603979791 /* RightBrace */) {
        body.push(parseStatementListItem(parser, context));
    }
    expect(parser, context, 603979791 /* RightBrace */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseReturnStatement(parser, context) {
    var pos = getLocation(parser);
    if (!(context & (128 /* OptionsGlobalReturn */ | 2097152 /* InFunctionBody */))) {
        tolerant(parser, context, 17 /* IllegalReturn */);
    }
    if (parser.flags & 65536 /* EscapedKeyword */)
        { report(parser, 2 /* UnexpectedEscapedKeyword */); }
    expect(parser, context, 12380 /* ReturnKeyword */);
    var argument = !(parser.token & 536870912 /* ASI */) && !(parser.flags & 1 /* NewLine */) ?
        parseExpression(parser, context & ~2097152 /* InFunctionBody */ | 131072 /* AllowIn */) :
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseIterationStatement(parser, context) {
    // Note: We are deviating from the original grammar here beauce the original grammar says that the
    // 'iterationStatement' should return either'for', 'do' or 'while' statements. We are doing some
    // bitfiddling before and after to modify the parser state before we let the 'parseStatement'
    // return the mentioned statements (to match the original grammar).
    var savedFlags = parser.flags;
    parser.flags |= 32 /* Iteration */ | 4 /* AllowDestructuring */;
    var body = parseStatement(parser, context & ~4194304 /* AllowSingleStatement */ | 1073741824 /* DisallowEscapedKeyword */);
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
    if (context & 8192 /* Strict */)
        { tolerant(parser, context, 37 /* StrictModeWith */); }
    var pos = getLocation(parser);
    expect(parser, context, 12387 /* WithKeyword */);
    expect(parser, context, 67174411 /* LeftParen */);
    var object = parseExpression(parser, context |= 131072 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    var body = parseStatement(parser, context & ~4194304 /* AllowSingleStatement */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseSwitchStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 77918 /* SwitchKeyword */);
    expect(parser, context, 67174411 /* LeftParen */);
    var discriminant = parseExpression(parser, context | 131072 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    expect(parser, context | 1073741824 /* DisallowEscapedKeyword */, 33619980 /* LeftBrace */);
    var cases = [];
    var savedFlags = parser.flags;
    parser.flags |= 16 /* Switch */;
    var seenDefault = false;
    while (parser.token !== 603979791 /* RightBrace */) {
        var clause = parseCaseOrDefaultClauses(parser, context);
        cases.push(clause);
        if (clause.test === null) {
            if (seenDefault)
                { tolerant(parser, context, 32 /* MultipleDefaultsInSwitch */); }
            seenDefault = true;
        }
    }
    parser.flags = savedFlags;
    expect(parser, context, 603979791 /* RightBrace */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseCaseOrDefaultClauses(parser, context) {
    var pos = getLocation(parser);
    var test = null;
    if (consume(parser, context, 12363 /* CaseKeyword */)) {
        test = parseExpression(parser, context | 131072 /* AllowIn */);
    }
    else {
        expect(parser, context, 12368 /* DefaultKeyword */);
    }
    expect(parser, context, 67108885 /* Colon */);
    var consequent = [];
    while (!isEndOfCaseOrDefaultClauses(parser)) {
        consequent.push(parseStatementListItem(parser, context | 131072 /* AllowIn */));
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseVariableStatement(parser, context, shouldConsume) {
    if ( shouldConsume === void 0 ) shouldConsume = true;

    var pos = getLocation(parser);
    var token = parser.token;
    var isConst = token === 77897 /* ConstKeyword */;
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseLetOrExpressionStatement(parser, context, shouldConsume) {
    if ( shouldConsume === void 0 ) shouldConsume = true;

    return lookahead(parser, context, isLexical) ?
        parseVariableStatement(parser, context | 8388608 /* BlockScope */, shouldConsume) :
        parseExpressionOrLabelledStatement(parser, context);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseForStatement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 12374 /* ForKeyword */);
    var awaitToken = !!(context & 262144 /* Async */ && consume(parser, context, 138514541 /* AwaitKeyword */));
    expect(parser, context | 1073741824 /* DisallowEscapedKeyword */, 67174411 /* LeftParen */);
    var token = parser.token;
    var init = null;
    var sequencePos = null;
    var variableStatement = null;
    var type = 'ForStatement';
    var test = null;
    var update = null;
    var right;
    if (token === 77897 /* ConstKeyword */ || (token === 86088 /* LetKeyword */ && lookahead(parser, context, isLexical))) {
        variableStatement = parseVariableStatement(parser, context & ~131072 /* AllowIn */ | 8388608 /* BlockScope */, /* shouldConsume */ false);
    }
    else if (token === 77895 /* VarKeyword */) {
        variableStatement = parseVariableStatement(parser, context & ~131072 /* AllowIn */, /* shouldConsume */ false);
    }
    else if (token !== 603979793 /* Semicolon */) {
        sequencePos = getLocation(parser);
        init = restoreExpressionCoverGrammar(parser, context & ~131072 /* AllowIn */, parseAssignmentExpression);
    }
    if (consume(parser, context, 1073778802 /* OfKeyword */)) {
        type = 'ForOfStatement';
        if (init) {
            if (!(parser.flags & 4 /* AllowDestructuring */) || init.type === 'AssignmentExpression') {
                tolerant(parser, context, 77 /* InvalidDestructuringTarget */);
            }
            reinterpret(parser, context, init);
        }
        else
            { init = variableStatement; }
        right = parseAssignmentExpression(parser, context | 131072 /* AllowIn */);
    }
    else if (consume(parser, context, 1074083633 /* InKeyword */)) {
        if (init) {
            if (!(parser.flags & 4 /* AllowDestructuring */))
                { tolerant(parser, context, 77 /* InvalidDestructuringTarget */); }
            reinterpret(parser, context, init);
        }
        else
            { init = variableStatement; }
        type = 'ForInStatement';
        right = parseExpression(parser, context | 131072 /* AllowIn */);
    }
    else {
        if (parser.token === 67108882 /* Comma */)
            { init = parseSequenceExpression(parser, context, init, sequencePos); }
        if (variableStatement)
            { init = variableStatement; }
        expect(parser, context, 603979793 /* Semicolon */);
        test = parser.token !== 603979793 /* Semicolon */ ? parseExpression(parser, context | 131072 /* AllowIn */) : null;
        expect(parser, context, 603979793 /* Semicolon */);
        update = parser.token !== 16 /* RightParen */ ? parseExpression(parser, context | 131072 /* AllowIn */) : null;
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleItemList(parser, context) {
    // Prime the scanner
    nextToken(parser, context);
    var statements = [];
    while (parser.token !== 536870912 /* EndOfSource */) {
        statements.push(parser.token === 65539 /* StringLiteral */ ?
            parseDirective(parser, context) :
            parseModuleItem(parser, context | 131072 /* AllowIn */));
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
        // ExportDeclaration
        case 12371 /* ExportKeyword */:
            return parseExportDeclaration(parser, context);
        // ImportDeclaration
        case 77914 /* ImportKeyword */:
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
    var pos = getLocation(parser);
    var specifiers = [];
    var source = null;
    var declaration = null;
    expect(parser, context | 1073741824 /* DisallowEscapedKeyword */, 12371 /* ExportKeyword */);
    switch (parser.token) {
        // export * FromClause ;
        case 330291 /* Multiply */:
            return parseExportAllDeclaration(parser, context, pos);
        case 12368 /* DefaultKeyword */:
            return parseExportDefault(parser, context, pos);
        case 33619980 /* LeftBrace */:
            {
                // export ExportClause FromClause ;
                // export ExportClause ;
                expect(parser, context, 33619980 /* LeftBrace */);
                var hasReservedWord = false;
                while (parser.token !== 603979791 /* RightBrace */) {
                    if (parser.token & 12288 /* Reserved */) {
                        hasReservedWord = true;
                        setPendingError(parser);
                    }
                    specifiers.push(parseNamedExportDeclaration(parser, context));
                    if (parser.token !== 603979791 /* RightBrace */)
                        { expect(parser, context, 67108882 /* Comma */); }
                }
                expect(parser, context | 1073741824 /* DisallowEscapedKeyword */, 603979791 /* RightBrace */);
                if (parser.token === 36977 /* FromKeyword */) {
                    source = parseModuleSpecifier(parser, context);
                    //  The left hand side can't be a keyword where there is no
                    // 'from' keyword since it references a local binding.
                }
                else if (hasReservedWord) {
                    tolerant(parser, context, 47 /* UnexpectedReserved */);
                }
                consumeSemicolon(parser, context);
                break;
            }
        // export ClassDeclaration
        case 77901 /* ClassKeyword */:
            declaration = (parseClassDeclaration(parser, context));
            break;
        // export LexicalDeclaration
        case 86088 /* LetKeyword */:
        case 77897 /* ConstKeyword */:
            declaration = parseVariableStatement(parser, context | 8388608 /* BlockScope */);
            break;
        // export VariableDeclaration
        case 77895 /* VarKeyword */:
            declaration = parseVariableStatement(parser, context);
            break;
        // export HoistableDeclaration
        case 77912 /* FunctionKeyword */:
            declaration = parseFunctionDeclaration(parser, context);
            break;
        // export HoistableDeclaration
        case 8425580 /* AsyncKeyword */:
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExportAllDeclaration(parser, context, pos) {
    expect(parser, context, 330291 /* Multiply */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseNamedExportDeclaration(parser, context) {
    var pos = getLocation(parser);
    // ExportSpecifier :
    // IdentifierName
    // IdentifierName as IdentifierName
    var local = parseIdentifierName(parser, context | 1073741824 /* DisallowEscapedKeyword */, parser.token);
    var exported = consume(parser, context, 36971 /* AsKeyword */)
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
 * @param parser  Parser object
 * @param context Context masks
 * @param pos Location
 */
function parseExportDefault(parser, context, pos) {
    expect(parser, context | 1073741824 /* DisallowEscapedKeyword */, 12368 /* DefaultKeyword */);
    var declaration;
    switch (parser.token) {
        // export default HoistableDeclaration[Default]
        case 77912 /* FunctionKeyword */:
            declaration = parseFunctionDeclaration(parser, context | 33554432 /* RequireIdentifier */);
            break;
        // export default ClassDeclaration[Default]
        case 77901 /* ClassKeyword */:
            declaration = parseClassDeclaration(parser, context & ~131072 /* AllowIn */ | 33554432 /* RequireIdentifier */);
            break;
        // export default HoistableDeclaration[Default]
        case 8425580 /* AsyncKeyword */:
            declaration = parseAsyncFunctionOrAssignmentExpression(parser, context | 33554432 /* RequireIdentifier */);
            break;
        default:
            {
                // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
                declaration = parseAssignmentExpression(parser, context | 131072 /* AllowIn */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportDeclaration(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 77914 /* ImportKeyword */);
    var source;
    var specifiers = [];
    // 'import' ModuleSpecifier ';'
    if (parser.token === 65539 /* StringLiteral */) {
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportClause(parser, context) {
    var specifiers = [];
    switch (parser.token) {
        // 'import' ModuleSpecifier ';'
        case 134283265 /* Identifier */:
            {
                specifiers.push(parseImportDefaultSpecifier(parser, context | 1073741824 /* DisallowEscapedKeyword */));
                if (consume(parser, context, 67108882 /* Comma */)) {
                    switch (parser.token) {
                        // import a, * as foo
                        case 330291 /* Multiply */:
                            parseImportNamespaceSpecifier(parser, context, specifiers);
                            break;
                        // import a, {bar}
                        case 33619980 /* LeftBrace */:
                            parseNamedImports(parser, context, specifiers);
                            break;
                        default:
                            tolerant(parser, context, 1 /* UnexpectedToken */, tokenDesc(parser.token));
                    }
                }
                break;
            }
        // import {bar}
        case 33619980 /* LeftBrace */:
            parseNamedImports(parser, context | 1073741824 /* DisallowEscapedKeyword */, specifiers);
            break;
        // import * as foo
        case 330291 /* Multiply */:
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
    expect(parser, context, 33619980 /* LeftBrace */);
    while (parser.token !== 603979791 /* RightBrace */) {
        specifiers.push(parseImportSpecifier(parser, context));
        if (parser.token !== 603979791 /* RightBrace */) {
            expect(parser, context, 67108882 /* Comma */);
        }
    }
    expect(parser, context, 603979791 /* RightBrace */);
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
    var pos = getLocation(parser);
    var token = parser.token;
    var imported = parseIdentifierName(parser, context | 1073741824 /* DisallowEscapedKeyword */, token);
    var local;
    if (parser.token === 36971 /* AsKeyword */) {
        expect(parser, context, 36971 /* AsKeyword */);
        local = parseBindingIdentifier(parser, context);
    }
    else {
        // An import name that is a keyword is a syntax error if it is not followed
        // by the keyword 'as'.
        if (hasBit(token, 12288 /* Reserved */))
            { tolerant(parser, context, 47 /* UnexpectedReserved */); }
        if (hasBit(token, 268435456 /* IsEvalOrArguments */))
            { tolerant(parser, context, 48 /* StrictEvalArguments */); }
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseImportNamespaceSpecifier(parser, context, specifiers) {
    var pos = getLocation(parser);
    expect(parser, context | 1073741824 /* DisallowEscapedKeyword */, 330291 /* Multiply */);
    expect(parser, context, 36971 /* AsKeyword */, 87 /* UnexpectedAsBinding */);
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleSpecifier(parser, context) {
    // ModuleSpecifier :
    //   StringLiteral
    expect(parser, context, 36977 /* FromKeyword */);
    if (parser.token !== 65539 /* StringLiteral */)
        { report(parser, 1 /* UnexpectedToken */, tokenDesc(parser.token)); }
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
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionOrAssignmentExpression(parser, context) {
    return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
        parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context | 33554432 /* RequireIdentifier */) :
        parseAssignmentExpression(parser, context | 131072 /* AllowIn */);
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
        token: 536870912 /* EndOfSource */,
        // Misc
        tokenRaw: '',
        lastValue: 0,
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
        // The flag to allow to skip shebang - '#'
        if (options.skipShebang)
            { context |= 512 /* OptionsShebang */; }
        // Attach raw property to each identifier node
        if (options.rawIdentifier)
            { context |= 1024 /* OptionsRawidentifiers */; }
        // Enable tolerant mode
        if (options.tolerant)
            { context |= 2048 /* OptionsTolerant */; }
        // Set to true to record the source file in every node's loc object when the loc option is set.
        if (!!options.source)
            { sourceFile = options.source; }
        // Create a top-level comments array containing all comments
        if (!!options.comments)
            { context |= 256 /* OptionsComments */; }
        // The flag to enable implied strict mode
        if (options.impliedStrict)
            { context |= 64 /* OptionsImpliedStrict */; }
        // The flag to set to bypass methods in Node
        if (options.node)
            { context |= 4096 /* OptionsNode */; }
        // Accepts a callback function to be invoked for each syntax node (as the node is constructed)
        if (typeof options.delegate === 'function') {
            context |= 32 /* OptionsDelegate */;
            delegate = options.delegate;
        }
    }
    var parser = createParser(source, sourceFile, delegate);
    var body = context & 16384 /* Module */
        ? parseModuleItemList(parser, context)
        : parseStatementList(parser, context);
    var node = {
        type: 'Program',
        sourceType: context & 16384 /* Module */ ? 'module' : 'script',
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
    if (context & 256 /* OptionsComments */)
        { node.comments = parser.comments; }
    if (context & 2048 /* OptionsTolerant */)
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
    nextToken(parser, context | 1073741824 /* DisallowEscapedKeyword */);
    while (parser.token === 65539 /* StringLiteral */) {
        // We do a strict check here too speed up things in case someone is crazy eenough to
        // write "use strict"; "use strict"; at Top-level. // J.K
        if (!(context & 8192 /* Strict */) && parser.tokenRaw.length === /* length of prologue*/ 12 && parser.tokenValue === 'use strict') {
            context |= 8192 /* Strict */;
        }
        statements.push(parseDirective(parser, context));
    }
    while (parser.token !== 536870912 /* EndOfSource */) {
        statements.push(parseStatementListItem(parser, context));
    }
    return statements;
}



var estree = /*#__PURE__*/Object.freeze({

});



var index = /*#__PURE__*/Object.freeze({
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
    parseDirective: parseDirective,
    parseExpressionOrLabelledStatement: parseExpressionOrLabelledStatement,
    parseDoWhileStatement: parseDoWhileStatement,
    parseWhileStatement: parseWhileStatement,
    parseBlockStatement: parseBlockStatement,
    parseReturnStatement: parseReturnStatement,
    parseIterationStatement: parseIterationStatement,
    parseWithStatement: parseWithStatement,
    parseSwitchStatement: parseSwitchStatement,
    parseCaseOrDefaultClauses: parseCaseOrDefaultClauses,
    parseVariableStatement: parseVariableStatement,
    parseJSXRootElement: parseJSXRootElement,
    parseJSXOpeningElement: parseJSXOpeningElement,
    nextJSXToken: nextJSXToken,
    scanJSXToken: scanJSXToken,
    parseJSXChildren: parseJSXChildren,
    parseJSXText: parseJSXText,
    parseJSXChild: parseJSXChild,
    parseJSXAttributes: parseJSXAttributes,
    parseJSXSpreadAttribute: parseJSXSpreadAttribute,
    parseJSXNamespacedName: parseJSXNamespacedName,
    parseJSXAttributeName: parseJSXAttributeName,
    parseJSXAttributeValue: parseJSXAttributeValue,
    parseJSXAttribute: parseJSXAttribute,
    parseJSXEmptyExpression: parseJSXEmptyExpression,
    parseJSXSpreadChild: parseJSXSpreadChild,
    parseJSXExpressionContainer: parseJSXExpressionContainer,
    parseJSXExpression: parseJSXExpression,
    parseJSXClosingFragment: parseJSXClosingFragment,
    parseJSXClosingElement: parseJSXClosingElement,
    parseJSXIdentifier: parseJSXIdentifier,
    parseJSXMemberExpression: parseJSXMemberExpression,
    parseJSXElementName: parseJSXElementName,
    scanJSXIdentifier: scanJSXIdentifier
});

/**
 * A list of character constants with much more human-readable names.
 */

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
    return parse(source, options, 8192 /* Strict */ | 16384 /* Module */);
}
var version = '1.4.12';

export { parseScript, parseModule, version, estree as ESTree, index as Parser, skipSingleLineComment, skipMultiLineComment, addComment, ErrorMessages, constructError, report, tolerant, scan, scanHexIntegerLiteral, scanOctalOrBinary, scanImplicitOctalDigits, scanSignedInteger, scanNumericLiteral, scanNumericSeparator, scanDecimalDigitsOrSeparator, scanDecimalAsSmi, scanIdentifier, scanString, consumeTemplateBrace, scanTemplate, scanRegularExpression, tokenDesc, descKeyword, isValidIdentifierPart, isValidIdentifierStart, mustEscape, validateBreakOrContinueLabel, addLabel, popLabel, hasLabel, finishNode, isIdentifierPart, expect, consume, nextToken, hasBit, scanPrivateName, consumeSemicolon, parseExpressionCoverGrammar, restoreExpressionCoverGrammar, swapContext, hasNext, advance, advanceOnMaybeAstral, nextChar, nextUnicodeChar, validateParams, reinterpret, consumeOpt, consumeLineFeed, advanceNewline, fromCodePoint, toHex, lookahead, escapeForPrinting, isValidSimpleAssignmentTarget, getLocation, isValidIdentifier, isLexical, isEndOfCaseOrDefaultClauses, nextTokenIsLeftParenOrPeriod, nextTokenisIdentifierOrParen, nextTokenIsLeftParen, nextTokenIsFuncKeywordOnSameLine, isPropertyWithPrivateFieldKey, parseAndValidateIdentifier, nameIsArgumentsOrEval, setPendingError, readNext, isEqualTagNames, isInstanceField };
