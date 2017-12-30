function isPrologueDirective(node) {
    return node.type === 'ExpressionStatement' &&
        node.expression.type === 'Literal';
}
function hasMask(mask, flags) {
    return (mask & flags) === flags;
}
function fromCodePoint(code) {
    if (code <= 0xFFFF)
        { return String.fromCharCode(code); }
    return String.fromCharCode(((code - 65536 /* NonBMPMin */) >> 10) +
        55296 /* LeadSurrogateMin */, ((code - 65536 /* NonBMPMin */) & (1024 - 1)) + 56320 /* TrailSurrogateMin */);
}
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

var isInOrOfKeyword = function (t) { return t === 2111281 /* InKeyword */ || t === 69746; };
// Fully qualified element name, e.g. <svg:path> returns "svg:path"
function isQualifiedJSXName(elementName) {
    switch (elementName.type) {
        case 'JSXIdentifier':
            return elementName.name;
        case 'JSXNamespacedName':
            return elementName.namespace + ':' + elementName.name;
        case 'JSXMemberExpression':
            return (isQualifiedJSXName(elementName.object) + '.' +
                isQualifiedJSXName(elementName.property));
        /* istanbul ignore next */
        default:
    }
}
function isValidDestructuringAssignmentTarget(expr) {
    switch (expr.type) {
        case 'Identifier':
        case 'ArrayExpression':
        case 'ArrayPattern':
        case 'ObjectExpression':
        case 'RestElement':
        case 'ObjectPattern':
        case 'MemberExpression':
        case 'ClassExpression':
        case 'CallExpression':
        case 'TemplateLiteral':
        case 'AssignmentExpression':
        case 'NewExpression':
            return true;
        default:
            return false;
    }
}
function isValidSimpleAssignmentTarget(expr) {
    switch (expr.type) {
        case 'Identifier':
        case 'MemberExpression':
            return true;
        default:
            return false;
    }
}

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
    'enum',
    /* JSX */
    'JSXText', '#', '@', 'BigInt' ];
/**
 * The conversion function between token and its string description/representation.
 */
function tokenDesc(token) {
    return KeywordDescTable[token & 255 /* Type */];
}
// Used `Object.create(null)` to avoid potential `Object.prototype`
// interference.
var DescKeywordTable = Object.create(null, {
    as: { value: 69739 /* AsKeyword */ },
    async: { value: 151064684 /* AsyncKeyword */ },
    await: { value: 1074073709 /* AwaitKeyword */ },
    break: { value: 12362 /* BreakKeyword */ },
    case: { value: 12363 /* CaseKeyword */ },
    catch: { value: 12364 /* CatchKeyword */ },
    class: { value: 274509 /* ClassKeyword */ },
    const: { value: 8663113 /* ConstKeyword */ },
    constructor: { value: 69742 /* ConstructorKeyword */ },
    continue: { value: 12366 /* ContinueKeyword */ },
    debugger: { value: 12367 /* DebuggerKeyword */ },
    default: { value: 12368 /* DefaultKeyword */ },
    delete: { value: 4468779 /* DeleteKeyword */ },
    do: { value: 12369 /* DoKeyword */ },
    enum: { value: 12403 /* EnumKeyword */ },
    else: { value: 12370 /* ElseKeyword */ },
    export: { value: 12371 /* ExportKeyword */ },
    extends: { value: 12372 /* ExtendsKeyword */ },
    false: { value: 274437 /* FalseKeyword */ },
    finally: { value: 12373 /* FinallyKeyword */ },
    for: { value: 12374 /* ForKeyword */ },
    from: { value: 69745 /* FromKeyword */ },
    function: { value: 274519 /* FunctionKeyword */ },
    get: { value: 16846959 /* GetKeyword */ },
    if: { value: 12376 /* IfKeyword */ },
    implements: { value: 20579 /* ImplementsKeyword */ },
    import: { value: 274521 /* ImportKeyword */ },
    in: { value: 2111281 /* InKeyword */ },
    instanceof: { value: 2111282 /* InstanceofKeyword */ },
    interface: { value: 20580 /* InterfaceKeyword */ },
    let: { value: 8671304 /* LetKeyword */ },
    new: { value: 274522 /* NewKeyword */ },
    null: { value: 274439 /* NullKeyword */ },
    of: { value: 69746 /* OfKeyword */ },
    package: { value: 20581 /* PackageKeyword */ },
    private: { value: 20582 /* PrivateKeyword */ },
    protected: { value: 20583 /* ProtectedKeyword */ },
    public: { value: 20584 /* PublicKeyword */ },
    return: { value: 12379 /* ReturnKeyword */ },
    set: { value: 16846960 /* SetKeyword */ },
    static: { value: 16797801 /* StaticKeyword */ },
    super: { value: 274524 /* SuperKeyword */ },
    switch: { value: 274525 /* SwitchKeyword */ },
    this: { value: 274526 /* ThisKeyword */ },
    throw: { value: 12383 /* ThrowKeyword */ },
    true: { value: 274438 /* TrueKeyword */ },
    try: { value: 12384 /* TryKeyword */ },
    typeof: { value: 4468778 /* TypeofKeyword */ },
    var: { value: 8663111 /* VarKeyword */ },
    void: { value: 4468780 /* VoidKeyword */ },
    while: { value: 12385 /* WhileKeyword */ },
    with: { value: 12386 /* WithKeyword */ },
    yield: { value: 537153642 /* YieldKeyword */ },
});
function descKeyword(value) {
    return (DescKeywordTable[value] | 0);
}

var ErrorMessages = {};
ErrorMessages[0 /* Unexpected */] = 'Unexpected token';
ErrorMessages[1 /* UnexpectedToken */] = 'Unexpected token \'%0\'';
ErrorMessages[2 /* UnterminatedComment */] = 'Unterminated comment';
ErrorMessages[3 /* UnterminatedString */] = 'Unterminated string literal';
ErrorMessages[4 /* UnterminatedRegExp */] = 'Unterminated regular expression literal';
ErrorMessages[5 /* UnicodeOutOfRange */] = 'Unicode escape code point out of range';
ErrorMessages[6 /* InvalidUnicodeEscapeSequence */] = 'Invalid Unicode escape sequence';
ErrorMessages[7 /* StrictOctalEscape */] = 'Octal escapes are not allowed in strict mode';
ErrorMessages[8 /* InvalidEightAndNine */] = 'Escapes \\8 or \\9 are not syntactically valid escapes';
ErrorMessages[9 /* StrictOctalLiteral */] = 'Octal literals are not allowed in strict mode';
ErrorMessages[10 /* MissingShebangExclamation */] = 'Missing exclamation in shebang';
ErrorMessages[11 /* DuplicateRegExpFlag */] = 'Duplicate regular expression flag %0';
ErrorMessages[12 /* UnexpectedTokenRegExp */] = 'Unexpected regular expression';
ErrorMessages[13 /* UnexpectedTokenRegExpFlag */] = 'Unexpected regular expression flag';
ErrorMessages[14 /* BadImportCallArity */] = 'Dynamic import must have one specifier as an argument';
ErrorMessages[15 /* StrictFunction */] = 'In strict mode code, functions can only be declared at top level or inside a block';
ErrorMessages[16 /* BadContinue */] = 'Continue must be inside loop or switch statement';
ErrorMessages[17 /* IllegalBreak */] = 'Unlabeled break must be inside loop or switch';
ErrorMessages[19 /* IllegalReturn */] = 'Illegal return statement';
ErrorMessages[18 /* MultipleDefaultsInSwitch */] = 'More than one default clause in switch statement';
ErrorMessages[20 /* NoCatchOrFinally */] = 'Missing catch or finally after try';
ErrorMessages[21 /* LineBreakAfterThrow */] = 'No line break is allowed between \'throw\' and its expression';
ErrorMessages[22 /* StrictModeWith */] = 'Strict mode code may not include a with statement';
ErrorMessages[23 /* BadGetterArity */] = 'Getter must not have any formal parameters';
ErrorMessages[24 /* BadSetterArity */] = 'Setter must have exactly one formal parameter';
ErrorMessages[25 /* BadSetterRestParameter */] = 'Setter function argument must not be a rest parameter';
ErrorMessages[26 /* IllegalUseStrict */] = 'Illegal \'use strict\' directive in function with non-simple parameter list';
ErrorMessages[27 /* ParameterAfterRestParameter */] = 'Rest parameter must be last formal parameter';
ErrorMessages[28 /* StrictFunctionName */] = 'Function name may not be eval or arguments in strict mode code';
ErrorMessages[29 /* MetaNotInFunctionBody */] = 'new.target only allowed within functions';
ErrorMessages[30 /* DeclarationMissingInitializer */] = 'Missing initializer in destructuring declaration';
ErrorMessages[32 /* InvalidLHSInForLoop */] = 'Invalid left-hand side in for-loop';
ErrorMessages[31 /* InvalidVarInitForOf */] = 'for-of loop variable declaration may not have an initializer';
ErrorMessages[34 /* InvalidLHSInForOf */] = 'Invalid left-hand side in for-of';
ErrorMessages[33 /* InvalidLHSInForIn */] = 'Invalid left-hand side in for-in';
ErrorMessages[35 /* StrictLHSAssignment */] = 'Eval or arguments can\'t be assigned to in strict mode code';
ErrorMessages[36 /* InvalidLHSInAssignment */] = 'Invalid left-hand side in assignment';
ErrorMessages[64 /* MissingArrowAfterParentheses */] = 'Missing => after parentheses';
ErrorMessages[37 /* NoAsAfterImportNamespace */] = 'Missing \'as\' keyword after import namespace';
ErrorMessages[38 /* InvalidModuleSpecifier */] = 'Invalid module specifier';
ErrorMessages[39 /* NonEmptyJSXExpression */] = 'JSX attributes must only be assigned a non-empty  \'expression\'';
ErrorMessages[40 /* ExpectedJSXClosingTag */] = 'Expected corresponding JSX closing tag for %0';
ErrorMessages[41 /* AdjacentJSXElements */] = 'Adjacent JSX elements must be wrapped in an enclosing tag';
ErrorMessages[42 /* InvalidBinaryDigit */] = 'Invalid binary digit';
ErrorMessages[43 /* InvalidOctalDigit */] = 'Invalid octal digit';
ErrorMessages[44 /* StrictDelete */] = 'Identifier expressions must not be deleted in strict mode';
ErrorMessages[45 /* StrictLHSPrefix */] = 'Prefix increment/decrement may not have eval or arguments operand in strict mode';
ErrorMessages[46 /* StrictLHSPostfix */] = 'Postfix increment/decrement may not have eval or arguments operand in strict mode';
ErrorMessages[48 /* ExportDeclAtTopLevel */] = 'Export declarations may only appear at top level of a module';
ErrorMessages[49 /* ImportDeclAtTopLevel */] = 'Import declarations may only appear at top level of a module';
ErrorMessages[50 /* MissingMsgDeclarationAfterExport */] = 'Missing declaration after \'export\' keyword';
ErrorMessages[51 /* ForAwaitNotOf */] = 'For await loop should be used with \'of\'';
ErrorMessages[52 /* LetInLexicalBinding */] = 'let is disallowed as a lexically bound name';
ErrorMessages[53 /* DuplicateProtoProperty */] = 'Property name __proto__ appears more than once in object literal';
ErrorMessages[54 /* StrictParamDupe */] = 'Duplicate argument names not allowed in this context';
ErrorMessages[55 /* InvalidHexEscapeSequence */] = 'Invalid hexadecimal escape sequence';
ErrorMessages[56 /* ConstructorSpecialMethod */] = 'Class constructor may not be an accessor';
ErrorMessages[57 /* BadSuperCall */] = 'super() is only valid in derived class constructors';
ErrorMessages[58 /* DuplicateConstructor */] = 'A class may only have one constructor';
ErrorMessages[59 /* StaticPrototype */] = 'Classes may not have static property named prototype';
ErrorMessages[62 /* LineBreakAfterAsync */] = 'No line break is allowed after async';
ErrorMessages[63 /* UnexpectedEscapedKeyword */] = 'Unexpected escaped keyword';
ErrorMessages[65 /* InvalidParenthesizedPattern */] = 'Invalid parenthesized pattern';
ErrorMessages[66 /* DuplicateIdentifier */] = '\'%0\' has already been declared ';
ErrorMessages[67 /* DuplicateBinding */] = 'Duplicate binding %0';
ErrorMessages[68 /* Redeclaration */] = 'Label \'%0\' has already been declared';
ErrorMessages[69 /* UnknownLabel */] = 'Undefined label \'%0\'';
ErrorMessages[70 /* UnexpectedReservedWord */] = 'Unexpected reserved word';
ErrorMessages[71 /* InvalidShorthandAssignment */] = 'Shorthand property assignments are valid only in destructuring patterns';
ErrorMessages[72 /* UnterminatedTemplate */] = 'Unterminated template literal';
ErrorMessages[73 /* UnexpectedStrictReserved */] = 'Unexpected eval or arguments in strict mode';
ErrorMessages[74 /* StrictParamName */] = 'The identifier \'eval\' or \'arguments\' must not be in binding position in strict mode';
ErrorMessages[75 /* DisallowedInContext */] = '\'%0\' may not be used as an identifier in this context';
ErrorMessages[76 /* IllegalArrowInParamList */] = 'Illegal arrow function parameter list';
ErrorMessages[77 /* UnexpectedBigIntLiteral */] = 'Unexpected BigInt literal';
ErrorMessages[78 /* UnNamedClassStmt */] = 'Class statement requires a name';
ErrorMessages[79 /* UnNamedFunctionStmt */] = 'Function statement requires a name';
ErrorMessages[80 /* InvalidStrictExpPostion */] = 'The identifier \'%0\' must not be in expression position in strict mode';
ErrorMessages[81 /* InvalidBindingStrictMode */] = 'The identifier \'%0\' must not be in binding position in strict mode';
ErrorMessages[82 /* MissingInitializer */] = 'Missing initializer';
ErrorMessages[83 /* InvalidVarDeclInForIn */] = 'Invalid variable declaration in for-in statement';
ErrorMessages[84 /* InvalidVarDeclInForOf */] = 'Invalid variable declaration in for-of statement';
ErrorMessages[85 /* UnexpectedNumber */] = 'Unexpected number';
ErrorMessages[86 /* UnexpectedSurrogate */] = 'Unexpected surrogate pair';
ErrorMessages[87 /* ForbiddenAsStatement */] = '%0 can\'t appear in single-statement context';
ErrorMessages[88 /* InvalidAsyncGenerator */] = 'Generator function or method can\'t be async';
ErrorMessages[89 /* InvalidArrowYieldParam */] = 'Arrow parameters must not contain yield expressions';
ErrorMessages[90 /* InvalidAwaitInArrowParam */] = '\'await\' is not allowed inside an async arrow\'s parameter list';
ErrorMessages[91 /* UnsupportedFeature */] = '%0 isn\'t supported by default. Enable the \'%1\' option to use them';
ErrorMessages[92 /* TemplateOctalLiteral */] = 'Template literals may not contain octal escape sequences';
ErrorMessages[93 /* InvalidNestedStatement */] = '%0  statement must be nested within an iteration statement';
ErrorMessages[94 /* InvalidGeneratorParam */] = 'Generator parameters must not contain yield expressions';
ErrorMessages[96 /* IllegalArrowFuncParamList */] = 'Illegal arrow function parameter list';
ErrorMessages[97 /* ReservedKeyword */] = 'The keyword %0 is reserved';
ErrorMessages[98 /* InvalidPrivateConstructor */] = 'Class constructor may not have a private field';
ErrorMessages[99 /* InvalidAwaitInAsyncFunc */] = 'Can not use await as identifier inside an async function';
ErrorMessages[100 /* NewTargetArrow */] = 'new.target must be within function (but not arrow expression) code';
ErrorMessages[101 /* UndefinedInClassScope */] = '\'%0\'  not defined in class scope';
ErrorMessages[102 /* InvalidComputedClassProperty */] = 'Invalid computed name in private property';
ErrorMessages[103 /* InvalidFieldConstructor */] = 'Classes may not have a private field named \'#constructor\'';
ErrorMessages[104 /* InvalidNumericSeparators */] = 'Numeric separators are not allowed here';
ErrorMessages[105 /* InvalidRestDefaultValue */] = 'Rest elements cannot have a default value';
ErrorMessages[106 /* InvalidBigIntLiteral */] = 'Invalid BigIntLiteral';
ErrorMessages[107 /* InvalidLhsInPostfixOp */] = 'Invalid left-hand side expression in postfix operation';
ErrorMessages[108 /* InvalidLhsInPrefixOp */] = 'Invalid left-hand side expression in prefix operation';
ErrorMessages[109 /* InvalidDestructuringTarget */] = 'Invalid destructuring assignment target';
ErrorMessages[110 /* UnterminatedEscape */] = 'Unterminated escape in regular expression';
ErrorMessages[115 /* AsyncFunctionInSingleStatementContext */] = 'Async functions can only be declared at the top level or inside a block';
ErrorMessages[114 /* InvalidRegExpGroup */] = 'Generators can only be declared at the top level or inside a block';
ErrorMessages[117 /* SloppyFunction */] = 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement';
ErrorMessages[118 /* YieldInParameter */] = 'Yield expression not allowed in formal parameter';
function constructError(msg, column) {
    var error = new Error(msg);
    try {
        throw error;
    }
    catch (base) {
        // istanbul ignore else
        if (Object.create && Object.defineProperty) {
            error = Object.create(base);
            Object.defineProperty(error, 'column', {
                value: column
            });
        }
    }
    // istanbul ignore next
    return error;
}
function createError(type, loc) {
    var params = [], len = arguments.length - 2;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 2 ];

    var description = ErrorMessages[type].replace(/%(\d+)/g, function (_, i) { return params[i]; });
    var error = constructError('Line ' + loc.line + ': ' + description, loc.column);
    error.index = loc.index;
    error.lineNumber = loc.line;
    error.description = description;
    return error;
}

// Unicode v. 10 support
var convert = (function (compressed, dict) {
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
                { code = dict[code]; }
            if (inst & 1)
                { result.fill(code, subIndex, subIndex += compressed[index++]); }
            else
                { result[subIndex++] = code; }
        }
    }
    return result;
})([-1, 2, 28, 2, 29, 2, 5, -1, 0, 77595648, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 55, 2, 56, 2, 4, 0, 4294836479, 0, 3221225471, 0, 4294901942, 2, 57, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 17, 2, 0, 0, 4294961151, 3, 0, 2, 2, 20, 2, 0, 2, 59, 2, 0, 2, 125, 2, 6, 2, 19, -1, 2, 60, 2, 148, 2, 1, 3, 0, 3, 0, 4294901711, 2, 37, 0, 4089839103, 0, 2961209759, 0, 268697551, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2965387679, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 2, 167, 2, 3, 0, 3825204735, 0, 123747807, 0, 65487, 2, 3, 0, 4092591615, 0, 1080049119, 0, 458703, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247020, 2, 64, 0, 4284449919, 0, 851904, 2, 4, 2, 16, 0, 67076095, -1, 2, 65, 0, 1006628014, 0, 4093591391, -1, 0, 50331649, 0, 3265266687, 2, 34, 0, 4294844415, 0, 4278190047, 2, 22, 2, 124, -1, 3, 0, 2, 2, 33, 2, 0, 2, 10, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 0, 3892314111, 0, 261632, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 2088959, 2, 31, 2, 8, 0, 909311, 3, 0, 2, 0, 814743551, 2, 39, 0, 67057664, 3, 0, 2, 2, 9, 2, 0, 2, 32, 2, 0, 2, 18, 2, 7, 0, 268374015, 2, 30, 2, 46, 2, 0, 2, 73, 0, 134153215, -1, 2, 6, 2, 0, 2, 7, 0, 2684354559, 0, 67044351, 0, 1073676416, -2, 3, 0, 2, 2, 40, 0, 1046528, 3, 0, 3, 2, 8, 2, 0, 2, 9, 0, 4294960127, 2, 10, 2, 13, -1, 0, 4294377472, 2, 25, 3, 0, 7, 0, 4227858431, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -1, 2, 121, 0, 1048577, 2, 79, 2, 12, -1, 2, 12, 0, 131042, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 1046559, 2, 0, 2, 14, 2, 0, 0, 2147516671, 2, 23, 3, 83, 2, 2, 0, -16, 2, 84, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 2, 117, 2, 0, 0, 3220242431, 3, 0, 3, 2, 20, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 2, 0, 2, 26, 2, 0, 2, 8, 3, 0, 2, 0, 67043391, 0, 687865855, 2, 0, 2, 24, 2, 8, 2, 22, 3, 0, 2, 0, 67076097, 2, 7, 2, 0, 2, 23, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 3774349439, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, 2, 27, 0, 1638399, 2, 165, 2, 102, 3, 0, 3, 2, 22, 2, 28, 2, 29, 2, 5, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -3, 2, 144, -4, 2, 22, 2, 0, 2, 107, 0, 1, 2, 0, 2, 58, 2, 32, 2, 16, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 33, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277137519, 0, 2265972735, -1, 3, 22, 2, -1, 2, 34, 2, 36, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 3, 0, 2, 2, 36, 0, 2147549120, 2, 0, 2, 16, 2, 17, 2, 128, 2, 0, 2, 48, 2, 17, 0, 5242879, 3, 0, 2, 0, 402594847, -1, 2, 116, 0, 1090519039, -2, 2, 118, 2, 119, 2, 0, 2, 38, 2, 37, 2, 2, 0, 3766565279, 0, 2039759, -4, 3, 0, 2, 2, 38, -1, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 9, 2, 39, -1, 0, 3825205247, 2, 40, -11, 3, 0, 2, 0, 2147484671, -8, 2, 0, 2, 7, 0, 4294901888, 2, 0, 0, 67108815, -1, 2, 0, 2, 45, -8, 2, 50, 2, 41, 0, 67043329, 2, 122, 2, 42, 0, 8388351, -2, 2, 123, 0, 3028287487, 0, 67043583, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, 2, 39, -2, 2, 17, 2, 46, 2, 0, 2, 23, 0, 67043343, 2, 126, 2, 27, -27, 3, 0, 2, 0, 4294901791, 2, 7, 2, 187, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 0, 1677656575, -166, 0, 4161266656, 0, 4071, 0, 15360, -4, 0, 28, -13, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 85, 2, 0, 0, 2105343, 0, 4160749584, 2, 194, -42, 0, 4194303871, 0, 2011, -62, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 38, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -22583, 3, 0, 7, 2, 27, -6130, 3, 5, 2, -1, 0, 69207040, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 55, 2, 56, 2, 4, 2, 26, -1, 2, 17, 2, 57, -1, 2, 0, 2, 19, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 27, 2, 58, 3, 0, 2, 0, 131135, 2, 91, 0, 70256639, 2, 59, 0, 272, 2, 45, 2, 19, -1, 2, 60, -2, 2, 93, 0, 603979775, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 61, 2, 62, 0, 33554435, 2, 120, 2, 61, 2, 145, 0, 131075, 0, 3594373096, 0, 67094296, 2, 62, -1, 2, 63, 0, 603979263, 2, 153, 0, 3, 0, 4294828001, 0, 602930687, 2, 175, 0, 393219, 2, 63, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 64, 2, 36, -1, 2, 4, 0, 917503, 2, 36, -1, 2, 65, 0, 537783470, 0, 4026531935, -1, 0, 1, -1, 2, 34, 2, 47, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 2, 16, -1, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 253951, 3, 20, 2, 0, 122879, 2, 0, 2, 8, 0, 276824064, -2, 3, 0, 2, 2, 9, 2, 0, 0, 4294903295, 2, 0, 2, 18, 2, 7, -1, 2, 17, 2, 46, 2, 0, 2, 73, 2, 39, -1, 2, 23, 2, 0, 2, 31, -2, 0, 128, -2, 2, 74, 2, 8, 0, 4064, -1, 2, 115, 0, 4227907585, 2, 0, 2, 191, 2, 0, 2, 44, 0, 4227915776, 2, 10, 2, 13, -2, 0, 6544896, 3, 0, 6, -2, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -3, 2, 79, 2, 12, -3, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 817183, 2, 0, 2, 14, 2, 0, 0, 33023, 2, 23, 3, 83, 2, -17, 2, 84, 0, 524157950, 2, 4, 2, 0, 2, 85, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 0, 3072, 2, 0, 0, 2147516415, 2, 10, 3, 0, 2, 2, 27, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 0, 4294965179, 0, 7, 2, 0, 2, 8, 2, 88, 2, 8, -1, 0, 687603712, 2, 91, 2, 92, 2, 36, 2, 22, 2, 93, 2, 35, 2, 159, 0, 2080440287, 2, 0, 2, 13, 2, 136, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 7, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 2700607615, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, -3, 2, 102, 3, 0, 3, 2, 22, -1, 3, 5, 2, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -8, 2, 22, 2, 0, 2, 107, -1, 2, 0, 2, 58, 2, 32, 2, 18, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 17, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277075969, 2, 8, -1, 3, 22, 2, -1, 2, 34, 2, 137, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 2, 115, 2, 9, -2, 2, 115, 2, 27, 2, 17, 2, 13, 2, 115, 2, 36, 2, 17, 0, 4718591, 2, 115, 2, 35, 0, 335544350, -1, 2, 116, 2, 117, -2, 2, 118, 2, 119, 2, 7, -1, 2, 120, 2, 61, 0, 3758161920, 0, 3, -4, 2, 0, 2, 31, 2, 170, -1, 2, 0, 2, 27, 0, 176, -5, 2, 0, 2, 43, 2, 177, -1, 2, 0, 2, 27, 2, 189, -1, 2, 0, 2, 19, -2, 2, 25, -12, 3, 0, 2, 2, 121, -8, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 975, -1, 2, 0, 2, 45, -8, 2, 50, 2, 43, 0, 1, 2, 122, 2, 27, -3, 2, 123, 2, 107, 2, 124, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, -3, 2, 17, 2, 125, 2, 0, 2, 27, 2, 44, 2, 126, 2, 27, -27, 3, 0, 2, 0, 65567, -1, 2, 100, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 2, 128, -187, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 2, 136, -129, 3, 0, 6, 2, 137, -1, 3, 0, 2, 2, 44, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -28719, 2, 0, 0, 1, -1, 2, 121, 2, 0, 0, 8193, -21, 0, 50331648, 0, 10255, 0, 4, -11, 2, 62, 2, 163, 0, 1, 0, 71936, -1, 2, 154, 0, 4292933632, 0, 805306431, -5, 2, 144, -1, 2, 172, -1, 0, 6144, -2, 2, 122, -1, 2, 164, -1, 2, 150, 2, 145, 2, 158, 2, 0, 0, 3223322624, 2, 8, 0, 4, -4, 2, 183, 0, 205128192, 0, 1333757536, 0, 3221225520, 0, 423953, 0, 747766272, 0, 2717763192, 0, 4290773055, 0, 278545, 2, 146, 0, 4294886464, 0, 33292336, 0, 417809, 2, 146, 0, 1329579616, 0, 4278190128, 0, 700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 147, 0, 469762560, 0, 4171219488, 0, 16711728, 2, 147, 0, 202375680, 0, 3214918176, 0, 4294508592, 2, 147, -1, 0, 983584, 0, 48, 0, 58720275, 0, 3489923072, 0, 10517376, 0, 4293066815, 0, 1, 0, 2013265920, 2, 171, 2, 0, 0, 17816169, 0, 3288339281, 0, 201375904, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2, 144, 0, 4160757760, 2, 0, -6, 2, 160, -11, 0, 3263218176, -1, 0, 49664, 0, 2160197632, 0, 8388802, -1, 0, 12713984, -1, 0, 402653184, 2, 152, 2, 155, -2, 2, 156, -20, 0, 3758096385, -2, 2, 185, 0, 4292878336, 2, 21, 2, 148, 0, 4294057984, -2, 2, 157, 2, 149, 2, 168, -2, 2, 166, -1, 2, 174, -1, 2, 162, 2, 121, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 151, 0, 939588608, -1, 0, 805306368, -1, 2, 121, 0, 1610612736, 2, 149, 2, 150, 3, 0, 2, -2, 2, 151, 2, 152, -3, 0, 267386880, -1, 2, 153, 0, 7168, -1, 2, 180, 2, 0, 2, 154, 2, 155, -7, 2, 161, -8, 2, 156, -1, 0, 1426112704, 2, 157, -1, 2, 181, 0, 271581216, 0, 2149777408, 2, 27, 2, 154, 2, 121, 0, 851967, 0, 3758129152, -1, 2, 27, 2, 173, -4, 2, 151, -20, 2, 188, 2, 158, -56, 0, 3145728, 2, 179, 2, 184, 0, 4294443520, 2, 73, -1, 2, 159, 2, 121, -4, 0, 32505856, -1, 2, 160, -1, 0, 2147385088, 2, 21, 1, 2155905152, 2, -3, 2, 91, 2, 0, 2, 161, -2, 2, 148, -6, 2, 162, 0, 4026597375, 0, 1, -1, 0, 1, -1, 2, 163, -3, 2, 137, 2, 190, -2, 2, 159, 2, 164, -1, 2, 169, 2, 121, -6, 2, 121, -213, 2, 162, -657, 2, 158, -36, 2, 165, -1, 0, 65408, -10, 2, 193, -5, 2, 166, -5, 0, 4278222848, 2, 0, 2, 23, -1, 0, 4227919872, -1, 2, 166, -2, 0, 4227874752, 2, 157, -2, 0, 2146435072, 2, 152, -2, 0, 1006649344, 2, 121, -1, 2, 21, 0, 201375744, -3, 0, 134217720, 2, 21, 0, 4286677377, 0, 32896, -1, 2, 167, -3, 2, 168, -349, 2, 169, 2, 170, 2, 171, 3, 0, 264, -11, 2, 172, -2, 2, 155, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524284, -11, 2, 27, -1, 2, 178, -1, 2, 176, 0, 3221291007, 2, 155, -1, 0, 524288, 0, 2158720, -3, 2, 152, 0, 1, -4, 2, 121, 0, 3808625411, 0, 3489628288, 0, 4096, 0, 1207959680, 0, 3221274624, 2, 0, -3, 2, 164, 0, 120, 0, 7340032, -2, 0, 4026564608, 2, 4, 2, 27, 2, 157, 3, 0, 4, 2, 152, -1, 2, 173, 2, 171, -1, 0, 8176, 2, 174, 2, 164, 2, 175, -1, 0, 4290773232, 2, 0, -4, 2, 157, 2, 182, 0, 15728640, 2, 171, -1, 2, 154, -1, 0, 4294934512, 3, 0, 4, -9, 2, 21, 2, 162, 2, 176, 3, 0, 4, 0, 704, 0, 1849688064, 0, 4194304, -1, 2, 121, 0, 4294901887, 2, 0, 0, 130547712, 0, 1879048192, 0, 2080374784, 3, 0, 2, -1, 2, 177, 2, 178, -1, 0, 17829776, 0, 2028994560, 0, 4261478144, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 179, 0, 16252928, 0, 3791388672, 2, 119, 3, 0, 2, -2, 2, 180, 2, 0, -1, 2, 100, -1, 0, 66584576, 3, 0, 11, 2, 121, 3, 0, 12, -2, 0, 245760, 0, 2147418112, -1, 2, 144, 2, 195, 0, 4227923456, -1, 2, 181, 2, 169, 2, 21, -2, 2, 172, 0, 4292870145, 0, 262144, 2, 121, 3, 0, 2, 0, 1073758848, 2, 182, -1, 0, 4227921920, 2, 183, 2, 146, 0, 528402016, 0, 4292927536, 3, 0, 4, -2, 0, 3556769792, 2, 0, -2, 2, 186, 3, 0, 5, -1, 2, 179, 2, 157, 2, 0, -2, 0, 4227923936, 2, 58, -1, 2, 166, 2, 91, 2, 0, 2, 184, 2, 151, 3, 0, 11, -2, 0, 2146959360, 3, 0, 8, -2, 2, 154, -1, 0, 536870960, 2, 115, -1, 2, 185, 3, 0, 8, 0, 512, 0, 8388608, 2, 167, 2, 165, 2, 178, 0, 4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 186, 3, 0, 21, -28, 2, 155, 3, 0, 3, -3, 0, 4292902912, -6, 2, 93, 3, 0, 85, -33, 2, 187, 3, 0, 126, -18, 2, 188, 3, 0, 269, -17, 2, 185, 2, 121, 0, 4294917120, 3, 0, 2, 2, 27, 0, 4290822144, -2, 0, 67174336, 0, 520093700, 2, 17, 3, 0, 27, -2, 0, 65504, 2, 121, 2, 43, 3, 0, 2, 2, 88, -191, 2, 58, -23, 2, 100, 3, 0, 296, -8, 2, 121, 3, 0, 2, 2, 27, -11, 2, 171, 3, 0, 72, -3, 0, 3758159872, 0, 201391616, 3, 0, 155, -7, 2, 162, -1, 0, 384, -1, 0, 133693440, -3, 2, 180, -2, 2, 30, 3, 0, 5, -2, 2, 21, 2, 122, 3, 0, 4, -2, 2, 181, -1, 2, 144, 0, 335552923, 2, 189, -1, 0, 538974272, 0, 2214592512, 0, 132000, -10, 0, 192, -8, 0, 12288, -21, 0, 134213632, 0, 4294901761, 3, 0, 42, 0, 100663424, 0, 4294965284, 3, 0, 62, -6, 0, 4286578784, 2, 0, -2, 0, 1006696448, 3, 0, 37, 2, 189, 0, 4110942569, 0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 42, 3, 0, 8, -1, 2, 151, -2, 2, 148, 2, 190, 0, 65537, 2, 162, 2, 165, 2, 159, -1, 2, 151, -1, 2, 58, 2, 0, 2, 191, 0, 65528, 2, 171, 0, 4294770176, 2, 30, 3, 0, 4, -30, 2, 192, 0, 4261470208, -3, 2, 148, -2, 2, 192, 2, 0, 2, 151, -1, 2, 186, -1, 2, 154, 0, 4294950912, 3, 0, 2, 2, 151, 2, 121, 2, 165, 2, 193, 2, 166, 2, 0, 2, 194, 2, 188, 3, 0, 48, -1334, 2, 21, 2, 0, -129, 2, 192, -6, 2, 157, -180, 2, 195, -233, 2, 4, 3, 0, 96, -16, 2, 157, 3, 0, 22583, -7, 2, 17, 3, 0, 6128], [4294967295, 4294967291, 4092460543, 4294828015, 4294967294, 134217726, 268435455, 2147483647, 1048575, 16777215, 1073741823, 1061158911, 536805376, 511, 4294910143, 4160749567, 134217727, 4294901760, 4194303, 2047, 262143, 4286578688, 536870911, 8388607, 4294918143, 67108863, 255, 65535, 67043328, 2281701374, 4294967232, 2097151, 4294903807, 4294902783, 4294967039, 524287, 127, 4294549487, 67045375, 1023, 67047423, 4286578687, 4294770687, 32767, 15, 33554431, 2047999, 8191, 4292870143, 4294934527, 4294966783, 4294967279, 262083, 20511, 4290772991, 4294901759, 41943039, 460799, 4294959104, 71303167, 1071644671, 602799615, 65536, 4294828000, 805044223, 4277151126, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 4294967264, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294868991, 4294909951, 4294967292, 4294965759, 16744447, 4294966272, 4294901823, 4294967280, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 4294443008, 268369920, 4292804608, 486341884, 4294963199, 3087007615, 1073692671, 131071, 4128527, 4279238655, 4294902015, 4294966591, 2445279231, 3670015, 3238002687, 4294967288, 4294705151, 4095, 3221208447, 4294902271, 4294549472, 2147483648, 4294705152, 4294966143, 64, 16383, 3774873592, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4087, 31, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 536870912, 2952790016, 202506752, 139280, 4293918720, 4227922944, 2147532800, 61440, 3758096384, 117440512, 65280, 4227858432, 3233808384, 3221225472, 4294965248, 32768, 57152, 67108864, 4290772992, 25165824, 4160749568, 57344, 4278190080, 65472, 4227907584, 65520, 1920, 4026531840, 49152, 4294836224, 63488, 1073741824, 4294967040, 251658240, 196608, 12582912, 4294966784, 2097152, 64512, 417808, 469762048, 4261412864, 4227923712, 4294934528, 4294967168, 16, 98304, 63, 4292870144, 4294963200, 65534, 65532]);
var isValidIdentifierStart = function (cp) { return (convert[(cp >>> 5) + 34816] >>> cp & 31 & 1) !== 0; };
var isIdentifierStart = function (cp) { return (cp === 36 /* Dollar */) || (cp === 95 /* Underscore */) || // $ (dollar) and _ (underscore)
    (cp >= 65 /* UpperA */ && cp <= 90 /* UpperZ */) || // A..Z
    (cp >= 97 /* LowerA */ && cp <= 122 /* LowerZ */) || // a..z
    (convert[(cp >>> 5) + 34816] >>> cp & 31 & 1) !== 0; };
var isIdentifierPart = function (cp) { return (cp >= 65 /* UpperA */ && cp <= 90 /* UpperZ */) || // A..Z
    (cp >= 97 /* LowerA */ && cp <= 122 /* LowerZ */) || // a..z
    (cp >= 48 /* Zero */ && cp <= 57 /* Nine */) || // 0..9
    (cp === 36 /* Dollar */) || (cp === 95 /* Underscore */) || // $ (dollar) and _ (underscore)
    (convert[(cp >>> 5) + 0] >>> cp & 31 & 1) !== 0; };

var Parser = function Parser(source, options) {
    var this$1 = this;

    this.flags = 0 /* None */;
    this.source = source;
    this.index = 0;
    this.column = 0;
    this.line = 1;
    this.startIndex = 0;
    this.startColumn = 0;
    this.startLine = 1;
    this.lastIndex = 0;
    this.lastColumn = 0;
    this.lastLine = 0;
    this.tokenRaw = '';
    this.token = 0;
    this.trailingComments = [];
    this.leadingComments = [];
    this.commentStack = [];
    this.comments = [];
    this.tokenValue = undefined;
    this.labelSet = undefined;
    this.fieldSet = undefined;
    this.errorLocation = undefined;
    this.tokenRegExp = undefined;
    this.functionScope = undefined;
    this.blockScope = undefined;
    this.parentScope = undefined;
    this.lastChar = undefined;
    this.previousNode = undefined;
    if (options != null) {
        if (options.next)
            { this.flags |= 33554432 /* OptionsNext */; }
        if (options.jsx)
            { this.flags |= 8388608 /* OptionsJSX */; }
        if (options.loc)
            { this.flags |= 2097152 /* OptionsLoc */; }
        if (options.ranges)
            { this.flags |= 1048576 /* OptionsRanges */; }
        if (options.raw)
            { this.flags |= 16777216 /* OptionsRaw */; }
        if (options.attachComment)
            { this.flags |= 1073741824 /* OptionsAttachComment */; }
        if (options.comments)
            { this.flags |= 536870912 /* OptionsComment */; }
        if (options.globalReturn)
            { this.flags |= 67108864 /* OptionsGlobalReturn */; }
        if (options.source) {
            this.flags |= 4194304 /* OptionsSource */;
            this.locSource = options.source;
        }
        if (options.plugins) {
            for (var i = 0; i < options.plugins.length; i++) {
                options.plugins[i](this$1);
            }
        }
    }
};
// https://tc39.github.io/ecma262/#sec-scripts
// https://tc39.github.io/ecma262/#sec-modules
Parser.prototype.parseProgram = function parseProgram (context) {
    this.nextToken(context);
    var isModule = (context & 1 /* Module */) !== 0;
    var body = isModule ?
        this.parseModuleItemList(context & ~134217728 /* TopLevel */) :
        this.parseStatementList(context & ~134217728 /* TopLevel */, 0 /* EndOfSource */);
    var node = {
        type: 'Program',
        body: body,
        sourceType: isModule ? 'module' : 'script',
    };
    if (this.flags & (1048576 /* OptionsRanges */ | 1073741824 /* OptionsAttachComment */)) {
        node.start = 0;
        node.end = this.source.length;
    }
    if (this.flags & 2097152 /* OptionsLoc */) {
        node.loc = {
            start: {
                line: 1,
                column: 0,
            },
            end: {
                line: this.line,
                column: this.column
            }
        };
    }
    // Attach top level comments array
    if (this.flags & 1610612736 /* Comments */) {
        node.comments = this.comments;
    }
    return node;
};
Parser.prototype.error = function error (type) {
        var params = [], len = arguments.length - 1;
        while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    if (this.errorLocation)
        { throw createError.apply(void 0, [ type, this.errorLocation ].concat( params )); }
    throw createError.apply(void 0, [ type, this.getLocations() ].concat( params ));
};
Parser.prototype.saveState = function saveState () {
    return {
        index: this.index,
        column: this.column,
        line: this.line,
        startLine: this.startLine,
        lastLine: this.lastLine,
        startColumn: this.startColumn,
        lastColumn: this.lastColumn,
        token: this.token,
        tokenValue: this.tokenValue,
        tokenRaw: this.tokenRaw,
        startIndex: this.startIndex,
        lastIndex: this.lastIndex,
        tokenRegExp: this.tokenRegExp,
        flags: this.flags
    };
};
Parser.prototype.rewindState = function rewindState (state) {
    this.index = state.index;
    this.column = state.column;
    this.line = state.line;
    this.token = state.token;
    this.tokenValue = state.tokenValue;
    this.startIndex = state.startIndex;
    this.lastIndex = state.lastIndex;
    this.lastLine = state.lastLine;
    this.startLine = state.startLine;
    this.startColumn = state.startColumn;
    this.lastColumn = state.lastColumn;
    this.tokenRegExp = state.tokenRegExp;
    this.tokenRaw = state.tokenRaw;
    this.flags = state.flags;
};
Parser.prototype.nextToken = function nextToken (context) {
    this.lastIndex = this.index;
    this.lastColumn = this.column;
    this.lastLine = this.line;
    if (this.flags & 524288 /* StrictDirective */)
        { context |= 2 /* Strict */; }
    this.token = this.scan(context);
    return this.token;
};
Parser.prototype.hasNext = function hasNext () {
    return this.index < this.source.length;
};
Parser.prototype.nextChar = function nextChar () {
    return this.source.charCodeAt(this.index);
};
Parser.prototype.storeRaw = function storeRaw (start) {
    this.tokenRaw = this.source.slice(start, this.index);
};
Parser.prototype.scanNext = function scanNext (err /* UnterminatedString */) {
        if ( err === void 0 ) err = 3;

    this.advance();
    if (!this.hasNext())
        { this.error(err); }
    return this.nextCodePoint();
};
Parser.prototype.nextCodePoint = function nextCodePoint () {
    var hi = this.source.charCodeAt(this.index);
    if (hi < 55296 /* LeadSurrogateMin */ || hi > 56319 /* LeadSurrogateMax */)
        { return hi; }
    var lo = this.source.charCodeAt(this.index + 1);
    if (lo < 56320 /* TrailSurrogateMin */ || lo > 57343 /* TrailSurrogateMax */)
        { return hi; }
    var a = hi & 0x3FF;
    return 65536 /* NonBMPMin */ + (a << 10) | lo & 0x3FF;
};
Parser.prototype.advance = function advance () {
    this.index++;
    this.column++;
};
Parser.prototype.rewind = function rewind () {
    this.index--;
    this.column--;
};
Parser.prototype.consume = function consume (code) {
    if (this.nextChar() !== code)
        { return false; }
    this.advance();
    return true;
};
Parser.prototype.advanceNewline = function advanceNewline (state /* None */) {
        if ( state === void 0 ) state = 0;

    this.flags |= 1 /* LineTerminator */;
    this.index++;
    if ((state & 2 /* LastIsCR */) === 0) {
        this.column = 0;
        this.line++;
    }
};
/**
 * Scan the entire source code. Skips whitespace and comments, and
 * return the token at the given index.
 *
 * @param context Context
 */
Parser.prototype.scan = function scan (context) {
        var this$1 = this;

    this.flags &= ~(1 /* LineTerminator */ | 2 /* ExtendedUnicodeEscape */);
    var state = this.index === 0 ? 4 /* LineStart */ : 0;
    while (this.hasNext()) {
        if (this$1.index > 0) {
            this$1.startIndex = this$1.index;
            this$1.startColumn = this$1.column;
            this$1.startLine = this$1.line;
        }
        var first = this$1.nextChar();
        if (first >= 128)
            { first = this$1.nextCodePoint(); }
        switch (first) {
            case 13 /* CarriageReturn */:
                state |= 2 /* LastIsCR */ | 4 /* LineStart */;
                this$1.advanceNewline();
                break;
            case 10 /* LineFeed */:
                this$1.advanceNewline(state);
                state = state & ~2 /* LastIsCR */ | 4 /* LineStart */;
                break;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                state = state & ~2 /* LastIsCR */ | 4 /* LineStart */;
                this$1.advanceNewline();
                break;
            case 65519 /* ByteOrderMark */:
            case 9 /* Tab */:
            case 11 /* VerticalTab */:
            case 12 /* FormFeed */:
            case 32 /* Space */:
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
                this$1.advance();
                continue;
            // `/`, `/=`, `/>`
            case 47 /* Slash */:
                {
                    this$1.advance();
                    var next = this$1.nextChar();
                    if (this$1.consume(47 /* Slash */)) {
                        this$1.skipSingleLineComment();
                        continue;
                    }
                    else if (this$1.consume(42 /* Asterisk */)) {
                        this$1.skipBlockComment();
                        continue;
                    }
                    else if (this$1.consume(61 /* EqualSign */)) {
                        return 1310757 /* DivideAssign */;
                    }
                    return 2361909 /* Divide */;
                }
            // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
            case 60 /* LessThan */:
                {
                    this$1.advance();
                    switch (this$1.nextChar()) {
                        case 60 /* LessThan */:
                            {
                                this$1.advance();
                                if (this$1.consume(61 /* EqualSign */)) {
                                    return 1310750 /* ShiftLeftAssign */;
                                }
                                return 2099265 /* ShiftLeft */;
                            }
                        case 61 /* EqualSign */:
                            this$1.advance();
                            return 2099005 /* LessThanOrEqual */;
                        case 33 /* Exclamation */:
                            {
                                if (context & 1 /* Module */)
                                    { continue; }
                                this$1.advance(); // skip `<`
                                // Double 'hyphen' because of the "look and feel" of
                                // the HTML single line comment (<!--)
                                if (this$1.consume(45 /* Hyphen */) && this$1.consume(45 /* Hyphen */)) {
                                    this$1.skipSingleLineComment();
                                    continue;
                                }
                            }
                        case 47 /* Slash */:
                            {
                                if (!(this$1.flags & 8388608 /* OptionsJSX */))
                                    { continue; }
                                this$1.advance();
                                return 25 /* JSXClose */;
                            }
                        default:
                            return 2361151 /* LessThan */;
                    }
                }
            // -, --, -->, -=,
            case 45 /* Hyphen */:
                {
                    this$1.advance(); // skip '-'
                    switch (this$1.nextChar()) {
                        case 45 /* Hyphen */:
                            {
                                this$1.advance();
                                if (this$1.nextChar() === 62 /* GreaterThan */ &&
                                    !(context & 1 /* Module */ || !(state & 4 /* LineStart */))) {
                                    this$1.advance();
                                    this$1.skipSingleLineComment();
                                    continue;
                                }
                                return 786460 /* Decrement */;
                            }
                        case 61 /* EqualSign */:
                            this$1.advance();
                            return 1310755 /* SubtractAssign */;
                        default:
                            return 6555952 /* Subtract */;
                    }
                }
            // `#`
            case 35 /* Hash */:
                this$1.advance();
                if (state & 4 /* LineStart */ &&
                    this$1.consume(33 /* Exclamation */)) {
                    this$1.skipSingleLineComment();
                    continue;
                }
                return 117 /* Hash */;
            // `{`
            case 123 /* LeftBrace */:
                this$1.advance();
                return 393228 /* LeftBrace */;
            // `}`
            case 125 /* RightBrace */:
                this$1.advance();
                return 15 /* RightBrace */;
            // `~`
            case 126 /* Tilde */:
                this$1.advance();
                return 4456494 /* Complement */;
            // `?`
            case 63 /* QuestionMark */:
                this$1.advance();
                return 22 /* QuestionMark */;
            // `[`
            case 91 /* LeftBracket */:
                this$1.advance();
                return 393235 /* LeftBracket */;
            // `]`
            case 93 /* RightBracket */:
                this$1.advance();
                return 20 /* RightBracket */;
            // `,`
            case 44 /* Comma */:
                this$1.advance();
                return 18 /* Comma */;
            // `:`
            case 58 /* Colon */:
                this$1.advance();
                return 21 /* Colon */;
            // `;`
            case 59 /* Semicolon */:
                this$1.advance();
                return 17 /* Semicolon */;
            // `(`
            case 40 /* LeftParen */:
                this$1.advance();
                return 262155 /* LeftParen */;
            // `)`
            case 41 /* RightParen */:
                this$1.advance();
                return 16 /* RightParen */;
            // Template
            case 96 /* Backtick */:
                return this$1.scanTemplate(context);
            // `'string'`, `"string"`
            case 34 /* DoubleQuote */:
            case 39 /* SingleQuote */:
                return this$1.scanString(context, first);
            // `&`, `&&`, `&=`
            case 38 /* Ampersand */:
                {
                    this$1.advance();
                    var next$1 = this$1.nextChar();
                    if (next$1 === 38 /* Ampersand */) {
                        this$1.advance();
                        return 35652151 /* LogicalAnd */;
                    }
                    if (next$1 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310761 /* BitwiseAndAssign */;
                    }
                    return 2098500 /* BitwiseAnd */;
                }
            // `%`, `%=`
            case 37 /* Percent */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2099764 /* Modulo */; }
                return 1310758 /* ModuloAssign */;
            // `!`, `!=`, `!==`
            case 33 /* Exclamation */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 4456493 /* Negate */; }
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2098748 /* LooseNotEqual */; }
                return 2098746 /* StrictNotEqual */;
            // `^`, `^=`
            case 94 /* Caret */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2098246 /* BitwiseXor */; }
                return 1310759 /* BitwiseXorAssign */;
            // `*`, `**`, `*=`, `**=`
            case 42 /* Asterisk */:
                {
                    this$1.advance();
                    if (!this$1.hasNext())
                        { return 270535219 /* Multiply */; }
                    var next$2 = this$1.nextChar();
                    if (next$2 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310756 /* MultiplyAssign */;
                    }
                    if (next$2 !== 42 /* Asterisk */)
                        { return 270535219 /* Multiply */; }
                    this$1.advance();
                    if (!this$1.consume(61 /* EqualSign */))
                        { return 2100022 /* Exponentiate */; }
                    return 1310753 /* ExponentiateAssign */;
                }
            // `+`, `++`, `+=`
            case 43 /* Plus */:
                {
                    this$1.advance();
                    if (!this$1.hasNext())
                        { return 6555951 /* Add */; }
                    var next$3 = this$1.nextChar();
                    if (next$3 === 43 /* Plus */) {
                        this$1.advance();
                        return 786459 /* Increment */;
                    }
                    if (next$3 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310754 /* AddAssign */;
                    }
                    return 6555951 /* Add */;
                }
            // `=`, `==`, `===`, `=>`
            case 61 /* EqualSign */:
                {
                    this$1.advance();
                    var next$4 = this$1.nextChar();
                    if (next$4 === 61 /* EqualSign */) {
                        this$1.advance();
                        if (this$1.consume(61 /* EqualSign */)) {
                            return 2098745 /* StrictEqual */;
                        }
                        else {
                            return 2098747 /* LooseEqual */;
                        }
                    }
                    else if (next$4 === 62 /* GreaterThan */) {
                        this$1.advance();
                        return 10 /* Arrow */;
                    }
                    return 1310749 /* Assign */;
                }
            // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
            case 62 /* GreaterThan */:
                {
                    this$1.advance();
                    // Fixes '<a>= == =</a>'
                    if (context & 8388608 /* Expression */)
                        { return 2099008 /* GreaterThan */; }
                    var next$5 = this$1.nextChar();
                    if (next$5 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 2099006 /* GreaterThanOrEqual */;
                    }
                    if (next$5 !== 62 /* GreaterThan */)
                        { return 2099008 /* GreaterThan */; }
                    this$1.advance();
                    next$5 = this$1.nextChar();
                    if (next$5 === 62 /* GreaterThan */) {
                        this$1.advance();
                        if (this$1.consume(61 /* EqualSign */)) {
                            return 1310752 /* LogicalShiftRightAssign */;
                        }
                        else {
                            return 2099267 /* LogicalShiftRight */;
                        }
                    }
                    else if (next$5 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310751 /* ShiftRightAssign */;
                    }
                    return 2099266 /* ShiftRight */;
                }
            // `|`, `||`, `|=`
            case 124 /* VerticalBar */:
                {
                    this$1.advance();
                    var next$6 = this$1.nextChar();
                    if (next$6 === 124 /* VerticalBar */) {
                        this$1.advance();
                        return 35651896 /* LogicalOr */;
                    }
                    else if (next$6 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310760 /* BitwiseOrAssign */;
                    }
                    return 2097989 /* BitwiseOr */;
                }
            // '.'
            case 46 /* Period */:
                {
                    var index = this$1.index + 1;
                    var next$7 = this$1.source.charCodeAt(index);
                    if (next$7 >= 48 /* Zero */ && next$7 <= 57 /* Nine */) {
                        this$1.scanNumber(context, first);
                        return 262146 /* NumericLiteral */;
                    }
                    if (next$7 === 46 /* Period */) {
                        index++;
                        if (index < this$1.source.length &&
                            this$1.source.charCodeAt(index) === 46 /* Period */) {
                            this$1.index = index + 1;
                            this$1.column += 3;
                            return 14 /* Ellipsis */;
                        }
                    }
                    this$1.advance();
                    return 13 /* Period */;
                }
            // '0' - '9'
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
                return this$1.scanNumber(context, first);
            // '\uVar', `\u{N}var`
            case 92 /* Backslash */:
            // `A`...`Z`
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
                return this$1.scanIdentifier(context);
            default:
                if (isValidIdentifierStart(first)) {
                    return this$1.scanIdentifier(context, true);
                }
                this$1.error(1 /* UnexpectedToken */, fromCodePoint(first));
        }
    }
    return 0 /* EndOfSource */;
};
Parser.prototype.skipSingleLineComment = function skipSingleLineComment () {
        var this$1 = this;

    var startPos = this.index;
    scan: while (this.hasNext()) {
        switch (this$1.nextChar()) {
            case 13 /* CarriageReturn */:
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                break scan;
            default:
                this$1.advance();
        }
    }
    if (this.flags & (536870912 /* OptionsComment */ | 1073741824 /* OptionsAttachComment */)) {
        this.addComment('Line', this.source.slice(startPos, this.index));
    }
};
Parser.prototype.skipBlockComment = function skipBlockComment () {
        var this$1 = this;

    var startPos = this.index;
    var state = 0;
    scan: while (this.hasNext()) {
        var ch = this$1.nextChar();
        switch (ch) {
            case 13 /* CarriageReturn */:
                state |= 2 /* LastIsCR */;
                this$1.advanceNewline();
                break;
            case 10 /* LineFeed */:
                this$1.advanceNewline(state);
                state = state & ~2 /* LastIsCR */;
                break;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                state = state & ~2 /* LastIsCR */;
                this$1.advanceNewline();
                break;
            case 42 /* Asterisk */:
                if (this$1.index + 1 < this$1.source.length &&
                    this$1.source.charCodeAt(this$1.index + 1) === 47 /* Slash */) {
                    this$1.index += 2;
                    this$1.column += 2;
                    state |= 32 /* Terminated */;
                    break scan;
                }
            // falls through
            default:
                this$1.advance();
        }
    }
    if (!(state & 32 /* Terminated */))
        { this.error(2 /* UnterminatedComment */); }
    if (this.flags & (536870912 /* OptionsComment */ | 1073741824 /* OptionsAttachComment */)) {
        this.addComment('Block', this.source.slice(startPos, this.index - 2));
    }
};
Parser.prototype.addComment = function addComment (type, value) {
    var comment = {
        type: type,
        value: value,
        start: this.startIndex,
        end: this.index,
    };
    if (this.flags & 2097152 /* OptionsLoc */) {
        comment.loc = {
            start: {
                line: this.startLine,
                column: this.startColumn,
            },
            end: {
                line: this.lastLine,
                column: this.column
            }
        };
    }
    this.comments.push(comment);
    if (this.flags & 1073741824 /* OptionsAttachComment */) {
        this.trailingComments.push(comment);
        this.leadingComments.push(comment);
    }
};
// TODO! Optimize
Parser.prototype.attachComment = function attachComment (context, node) {
        var this$1 = this;

    if (context & 134217728 /* TopLevel */ && node.body.length > 0)
        { return; }
    var firstIndex;
    var lastIndex;
    var firstChild;
    var lastChild;
    var trailingComments;
    var commentStack = this.commentStack[this.commentStack.length - 1];
    if (this.trailingComments.length > 0) {
        if (this.trailingComments[0].start >= node.end) {
            trailingComments = this.trailingComments;
            this.trailingComments = [];
        }
        else {
            this.trailingComments.length = 0;
        }
    }
    else {
        if (this.commentStack.length > 0) {
            if (commentStack.trailingComments &&
                commentStack.trailingComments[0].start >= node.end) {
                trailingComments = commentStack.trailingComments;
                delete commentStack.trailingComments;
            }
        }
    }
    if (this.commentStack.length > 0 && commentStack.start >= node.start) {
        firstChild = this.commentStack.pop();
    }
    while (this.commentStack.length > 0 &&
        this.commentStack[this.commentStack.length - 1].start >= node.start) {
        lastChild = this$1.commentStack.pop();
    }
    if (!lastChild && firstChild)
        { lastChild = firstChild; }
    if (firstChild && this.leadingComments.length > 0) {
        var lastComment = this.leadingComments[this.leadingComments.length - 1];
        switch (node.type) {
            case 'CallExpression':
                {
                    if (node.arguments && node.arguments.length) {
                        var lastArg = node.arguments[node.arguments.length - 1];
                        if (lastArg && lastComment.start >= lastArg.start && lastComment.end <= node.end) {
                            if (this.previousNode) {
                                if (this.leadingComments.length > 0) {
                                    lastArg.trailingComments = this.leadingComments;
                                    this.leadingComments = [];
                                }
                            }
                        }
                    }
                    break;
                }
            default: // ignore
        }
    }
    if (lastChild) {
        if (lastChild.leadingComments) {
            if (lastChild !== node &&
                lastChild.leadingComments.length > 0 &&
                lastChild.leadingComments[lastChild.leadingComments.length - 1].end <= node.start) {
                node.leadingComments = lastChild.leadingComments;
                delete lastChild.leadingComments;
            }
            else {
                for (firstIndex = lastChild.leadingComments.length - 2; firstIndex >= 0; --firstIndex) {
                    if (lastChild.leadingComments[firstIndex].end <= node.start) {
                        node.leadingComments = lastChild.leadingComments.splice(0, firstIndex + 1);
                        break;
                    }
                }
            }
        }
    }
    else if (this.leadingComments.length > 0) {
        if (this.leadingComments[this.leadingComments.length - 1].end <= node.start) {
            if (this.previousNode) {
                for (lastIndex = 0; lastIndex < this.leadingComments.length; lastIndex++) {
                    if (this$1.leadingComments[lastIndex].end < this$1.previousNode.end) {
                        this$1.leadingComments.splice(lastIndex, 1);
                        lastIndex--;
                    }
                }
            }
            if (this.leadingComments.length > 0) {
                node.leadingComments = this.leadingComments;
                this.leadingComments = [];
            }
        }
        else {
            for (firstIndex = 0; firstIndex !== this.leadingComments.length; firstIndex++) {
                if (this$1.leadingComments[firstIndex].end > node.start)
                    { break; }
            }
            node.leadingComments = this.leadingComments.slice(0, firstIndex);
            if (node.leadingComments.length === 0)
                { delete node.leadingComments; }
            trailingComments = this.leadingComments.slice(firstIndex);
        }
    }
    this.previousNode = node;
    if (trailingComments)
        { node.trailingComments = trailingComments; }
    this.commentStack.push(node);
};
Parser.prototype.scanIdentifier = function scanIdentifier (context, hasUnicode) {
        var this$1 = this;
        if ( hasUnicode === void 0 ) hasUnicode = false;

    var start = this.index;
    var ret = '';
    var hasEscape = false;
    loop: while (this.hasNext()) {
        var ch = this$1.nextChar();
        switch (ch) {
            case 92 /* Backslash */:
                var index = this$1.index;
                var code = this$1.peekUnicodeEscape();
                if (!(code >= 0))
                    { this$1.error(0 /* Unexpected */); }
                ret += this$1.source.slice(start, index);
                ret += fromCodePoint(code);
                hasEscape = true;
                start = this$1.index;
                break;
            default:
                if (ch >= 55296 /* LeadSurrogateMin */ && ch <= 57343 /* TrailSurrogateMax */) {
                    this$1.nextCodePoint();
                }
                else if (!isIdentifierPart(ch))
                    { break loop; }
                this$1.advance();
        }
    }
    if (start < this.index)
        { ret += this.source.slice(start, this.index); }
    var len = ret.length;
    this.tokenValue = ret;
    if (hasEscape)
        { this.flags |= 2 /* ExtendedUnicodeEscape */; }
    if (hasUnicode)
        { return 67371009 /* Identifier */; }
    // Keywords are between 2 and 11 characters long and start with a lowercase letter
    if (len >= 2 && len <= 11) {
        if (context & 33554432 /* ValidateEscape */ && this.flags & 2 /* ExtendedUnicodeEscape */) {
            this.error(63 /* UnexpectedEscapedKeyword */);
        }
        var token = descKeyword(ret);
        if (token > 0)
            { return token; }
    }
    return 67371009 /* Identifier */;
};
/**
 * Peek unicode escape
 */
Parser.prototype.peekUnicodeEscape = function peekUnicodeEscape () {
    var code = -1;
    var index = this.index;
    if (index + 5 < this.source.length) {
        if (this.source.charCodeAt(index + 1) !== 117 /* LowerU */)
            { return -1; }
        this.index += 2;
        this.column += 2;
        code = this.peekExtendedUnicodeEscape();
        if (code >= 55296 /* LeadSurrogateMin */ && code <= 56320 /* TrailSurrogateMin */) {
            this.error(86 /* UnexpectedSurrogate */);
        }
        if (!isIdentifierPart(code)) {
            this.error(6 /* InvalidUnicodeEscapeSequence */);
        }
        this.advance();
    }
    return code;
};
Parser.prototype.peekExtendedUnicodeEscape = function peekExtendedUnicodeEscape () {
        var this$1 = this;

    var ch = this.nextChar();
    var code = 0;
    // '\u{DDDDDDDD}'
    if (ch === 123 /* LeftBrace */) {
        ch = this.scanNext(55 /* InvalidHexEscapeSequence */);
        while (ch !== 125 /* RightBrace */) {
            var digit = toHex(ch);
            if (digit < 0)
                { this$1.error(55 /* InvalidHexEscapeSequence */); }
            code = (code << 4) | digit;
            // Code point out of bounds
            if (code > 1114111 /* LastUnicodeChar */)
                { break; }
            ch = this$1.scanNext(55 /* InvalidHexEscapeSequence */);
        }
        return code;
    }
    // '\uDDDD'
    code = toHex(ch);
    if (code < 0)
        { this.error(55 /* InvalidHexEscapeSequence */); }
    for (var i = 0; i < 3; i++) {
        ch = this$1.scanNext(55 /* InvalidHexEscapeSequence */);
        var digit$1 = toHex(ch);
        if (code < 0)
            { this$1.error(55 /* InvalidHexEscapeSequence */); }
        code = code << 4 | digit$1;
    }
    return code;
};
Parser.prototype.scanNumericFragment = function scanNumericFragment (state) {
    this.flags |= 65536 /* ContainsSeparator */;
    if (!(state & 256 /* AllowSeparator */)) {
        this.error(104 /* InvalidNumericSeparators */);
    }
    state &= ~256 /* AllowSeparator */;
    this.advance();
    return state;
};
Parser.prototype.scanDecimalDigitsOrFragment = function scanDecimalDigitsOrFragment () {
        var this$1 = this;

    var start = this.index;
    var state = 0;
    var ret = '';
    var next = this.flags & 33554432;
    loop: while (this.hasNext()) {
        switch (this$1.nextChar()) {
            case 95 /* Underscore */:
                if (!next)
                    { break loop; }
                if (!(state & 256 /* AllowSeparator */))
                    { this$1.error(104 /* InvalidNumericSeparators */); }
                this$1.flags |= 65536 /* ContainsSeparator */;
                state &= ~256 /* AllowSeparator */;
                ret += this$1.source.substring(start, this$1.index);
                this$1.advance();
                start = this$1.index;
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
                state |= 256 /* AllowSeparator */;
                this$1.advance();
                break;
            default:
                break loop;
        }
    }
    if (next && this.source.charCodeAt(this.index - 1) === 95 /* Underscore */) {
        this.error(104 /* InvalidNumericSeparators */);
    }
    return ret + this.source.substring(start, this.index);
};
Parser.prototype.scanNumber = function scanNumber (context, ch) {
        var this$1 = this;

    var start = this.index;
    var state = 0;
    var value;
    var next = this.flags & 33554432;
    if (ch === 48 /* Zero */) {
        this.advance();
        ch = this.nextChar();
        switch (ch) {
            case 120 /* LowerX */:
            case 88 /* UpperX */:
                {
                    state = 8 /* Hex */ | 256 /* AllowSeparator */;
                    value = toHex(this.scanNext(0 /* Unexpected */));
                    if (value < 0)
                        { this.error(0 /* Unexpected */); }
                    this.advance();
                    while (this.hasNext()) {
                        ch = this$1.nextChar();
                        if (next && ch === 95 /* Underscore */) {
                            state = this$1.scanNumericFragment(state);
                            continue;
                        }
                        state |= 256 /* AllowSeparator */;
                        var digit = toHex(ch);
                        if (digit < 0)
                            { break; }
                        value = value << 4 | digit;
                        this$1.advance();
                    }
                    break;
                }
            case 111 /* LowerO */:
            case 79 /* UpperO */:
                {
                    state = 16 /* Octal */ | 256 /* AllowSeparator */;
                    ch = this.scanNext(0 /* Unexpected */);
                    value = ch - 48 /* Zero */;
                    // we must have at least one octal digit after 'o'/'O'
                    if (ch < 48 /* Zero */ || ch >= 56 /* Eight */)
                        { this.error(85 /* UnexpectedNumber */); }
                    this.advance();
                    while (this.hasNext()) {
                        ch = this$1.nextChar();
                        if (next && ch === 95 /* Underscore */) {
                            state = this$1.scanNumericFragment(state);
                            continue;
                        }
                        state |= 256 /* AllowSeparator */;
                        if (ch < 48 /* Zero */ || 57 /* Nine */ < ch)
                            { break; }
                        if (ch < 48 /* Zero */ || ch >= 56 /* Eight */) {
                            this$1.error(0 /* Unexpected */);
                        }
                        value = (value << 3) | (ch - 48 /* Zero */);
                        this$1.advance();
                    }
                    break;
                }
            case 98 /* LowerB */:
            case 66 /* UpperB */:
                {
                    state = 32 /* Binary */ | 256 /* AllowSeparator */;
                    ch = this.scanNext(0 /* Unexpected */);
                    // Invalid:  '0b'
                    if (ch !== 48 /* Zero */ && ch !== 49 /* One */)
                        { this.error(85 /* UnexpectedNumber */); }
                    value = ch - 48 /* Zero */;
                    this.advance();
                    while (this.hasNext()) {
                        ch = this$1.nextChar();
                        if (next && ch === 95 /* Underscore */) {
                            state = this$1.scanNumericFragment(state);
                            continue;
                        }
                        state |= 256 /* AllowSeparator */;
                        if (ch < 48 /* Zero */ || 57 /* Nine */ < ch)
                            { break; }
                        if (!(ch === 48 /* Zero */ || ch === 49 /* One */)) {
                            this$1.error(0 /* Unexpected */);
                        }
                        value = (value << 1) | (ch - 48 /* Zero */);
                        this$1.advance();
                    }
                    break;
                }
            case 95 /* Underscore */:
                this.flags |= 65536 /* ContainsSeparator */;
                this.advance();
            // falls through
            case 48 /* Zero */:
            case 49 /* One */:
            case 50 /* Two */:
            case 51 /* Three */:
            case 52 /* Four */:
            case 53 /* Five */:
            case 54 /* Six */:
            case 55 /* Seven */:
                {
                    state |= 4 /* ImplicitOctal */ | 256 /* AllowSeparator */;
                    while (this.hasNext()) {
                        ch = this$1.nextChar();
                        if (ch === 95 /* Underscore */) {
                            state = this$1.scanNumericFragment(state);
                            continue;
                        }
                        state |= 256 /* AllowSeparator */;
                        if (ch === 56 /* Eight */ || ch === 57 /* Nine */) {
                            state = 2 /* DecimalWithLeadingZero */;
                            break;
                        }
                        if (!(48 /* Zero */ <= ch && ch <= 55 /* Seven */))
                            { break; }
                        value = (value << 3) | (ch - 48 /* Zero */);
                        this$1.advance();
                    }
                }
                break;
            case 56 /* Eight */:
            case 57 /* Nine */:
                state = 2 /* DecimalWithLeadingZero */;
            default: // ignore
        }
        if (this.flags & 65536 /* ContainsSeparator */) {
            if (this.source.charCodeAt(this.index - 1) === 95 /* Underscore */) {
                this.error(104 /* InvalidNumericSeparators */);
            }
        }
        this.tokenValue = value;
    }
    var mainFragment = '';
    var decimalFragment = '';
    var scientificFragment = '';
    if (this.flags & 33554432 /* OptionsNext */) {
        mainFragment = this.scanDecimalDigitsOrFragment();
        if (this.nextChar() === 46 /* Period */) {
            state |= 128 /* Float */;
            if (state & 4 /* ImplicitOctal */)
                { this.error(85 /* UnexpectedNumber */); }
            this.advance();
            decimalFragment = this.scanDecimalDigitsOrFragment();
        }
    }
    else {
        this.scanDecimalDigitsOrFragment();
        if (this.nextChar() === 46 /* Period */) {
            state |= 128 /* Float */;
            // Invalid: '06.7'
            if (state & 4 /* ImplicitOctal */) {
                var possibleOctal = this.source.charCodeAt(this.index + 1);
                if (possibleOctal >= 48 /* Zero */ && possibleOctal <= 57 /* Nine */)
                    { this.error(85 /* UnexpectedNumber */); }
            }
            else {
                this.advance();
                this.scanDecimalDigitsOrFragment();
            }
        }
    }
    var end = this.index;
    // BigInt - Stage 3 proposal
    if (next && this.nextChar() === 110 /* LowerN */) {
        if (state & (4 /* ImplicitOctal */ | 128 /* Float */))
            { this.error(106 /* InvalidBigIntLiteral */); }
        state |= 64 /* BigInt */;
        this.advance();
    }
    if (!(state & 56 /* Boh */)) {
        state |= 128 /* Float */;
        switch (this.nextChar()) {
            case 69 /* UpperE */:
            case 101 /* LowerE */:
                this.advance();
                switch (this.nextChar()) {
                    case 45 /* Hyphen */:
                    case 43 /* Plus */:
                        this.advance();
                        if (!this.hasNext())
                            { this.error(0 /* Unexpected */); }
                    default: // ignore
                }
                ch = this.nextChar();
                if (!(ch >= 48 /* Zero */ && ch <= 57 /* Nine */))
                    { this.error(106 /* InvalidBigIntLiteral */); }
                if (this.flags & 33554432 /* OptionsNext */) {
                    var preNumericPart = this.index;
                    var finalFragment = this.scanDecimalDigitsOrFragment();
                    scientificFragment = this.source.substring(end, preNumericPart) + finalFragment;
                }
                else {
                    this.scanDecimalDigitsOrFragment();
                }
            default: // ignore
        }
    }
    if (state & 6 /* Noctal */)
        { this.flags |= 32768 /* Octal */; }
    if (this.flags & 33554432 /* OptionsNext */ &&
        !(state & (4 /* ImplicitOctal */ | 56 /* Boh */)) &&
        this.flags & 65536 /* ContainsSeparator */) {
        var result = mainFragment;
        if (decimalFragment)
            { result += '.' + decimalFragment; }
        if (scientificFragment)
            { result += scientificFragment; }
        if (this.flags & 16777216 /* OptionsRaw */)
            { this.tokenRaw = this.source.slice(start, this.index); }
        this.tokenValue = parseFloat(result);
        if (state & 64 /* BigInt */)
            { return 119 /* BigInt */; }
        return 262146 /* NumericLiteral */;
    }
    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
    // The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
    // For example : 3in is an error and not the two input elements 3 and in
    if (isIdentifierStart(this.nextChar()))
        { this.error(0 /* Unexpected */); }
    var rawValue = this.source.slice(start, this.index);
    if (!value || !(state & (4 /* ImplicitOctal */ | 56 /* Boh */))) {
        this.tokenValue = parseFloat(rawValue);
    }
    if (this.flags & 16777216 /* OptionsRaw */)
        { this.tokenRaw = rawValue; }
    return state & 64 /* BigInt */ ? 119 /* BigInt */ : 262146 /* NumericLiteral */;
};
Parser.prototype.scanRegularExpression = function scanRegularExpression () {
        var this$1 = this;

    var bodyStart = this.startIndex + 1;
    var preparseState = 0;
    loop: while (true) {
        var ch = this$1.nextChar();
        this$1.advance();
        if (preparseState & 1 /* Escape */) {
            preparseState &= ~1 /* Escape */;
        }
        else {
            switch (ch) {
                case 47 /* Slash */:
                    if (!preparseState)
                        { break loop; }
                    break;
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
                    this$1.error(12 /* UnexpectedTokenRegExp */);
                default: // ignore
            }
        }
        if (!this$1.hasNext())
            { this$1.error(4 /* UnterminatedRegExp */); }
    }
    var bodyEnd = this.index - 1; // drop the slash from the slice
    var flagsStart = this.index;
    var mask = 0;
    loop: while (this.hasNext()) {
        var code = this$1.nextChar();
        switch (code) {
            case 103 /* LowerG */:
                if (mask & 2 /* Global */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'g'); }
                mask |= 2 /* Global */;
                break;
            case 105 /* LowerI */:
                if (mask & 1 /* IgnoreCase */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'i'); }
                mask |= 1 /* IgnoreCase */;
                break;
            case 109 /* LowerM */:
                if (mask & 4 /* Multiline */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'm'); }
                mask |= 4 /* Multiline */;
                break;
            case 117 /* LowerU */:
                if (mask & 8 /* Unicode */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'u'); }
                mask |= 8 /* Unicode */;
                break;
            case 121 /* LowerY */:
                if (mask & 16 /* Sticky */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'y'); }
                mask |= 16 /* Sticky */;
                break;
            // Stage 3 proposal
            case 115 /* LowerS */:
                if (this$1.flags & 33554432 /* OptionsNext */) {
                    if (mask & 32 /* DotAll */)
                        { this$1.error(11 /* DuplicateRegExpFlag */, 's'); }
                    mask |= 32 /* DotAll */;
                    break;
                }
            default:
                if (!isIdentifierPart(code))
                    { break loop; }
                this$1.error(13 /* UnexpectedTokenRegExpFlag */);
        }
        this$1.advance();
    }
    var flagsEnd = this.index;
    var pattern = this.source.slice(bodyStart, bodyEnd);
    var flags = this.source.slice(flagsStart, flagsEnd);
    this.tokenRegExp = {
        pattern: pattern,
        flags: flags
    };
    this.tokenValue = this.testRegExp(pattern, flags, mask);
    if (this.flags & 16777216 /* OptionsRaw */)
        { this.storeRaw(this.startIndex); }
    return 262148 /* RegularExpression */;
};
Parser.prototype.testRegExp = function testRegExp (pattern, flags, mask) {
    try {
        
    }
    catch (e) {
        this.error(12 /* UnexpectedTokenRegExp */);
    }
    try {
        return new RegExp(pattern, flags);
    }
    catch (exception) {
        return null;
    }
};
Parser.prototype.scanString = function scanString (context, quote) {
        var this$1 = this;

    var ret = '';
    var hasEscape = false;
    this.advance(); // Consume the quote
    var ch = this.nextChar();
    while (ch !== quote) {
        switch (ch) {
            case 13 /* CarriageReturn */:
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.error(3 /* UnterminatedString */);
            case 92 /* Backslash */:
                ch = this$1.scanNext();
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    var code = this$1.scanEscape(context, ch);
                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    }
                    else {
                        this$1.throwStringError(context, code);
                    }
                    this$1.flags |= 2 /* ExtendedUnicodeEscape */;
                    hasEscape = true;
                }
                break;
            default:
                ret += fromCodePoint(ch);
        }
        ch = this$1.scanNext();
    }
    this.advance(); // Consume the quote
    this.storeRaw(this.startIndex);
    if (hasEscape) {
        this.flags |= 2 /* ExtendedUnicodeEscape */;
    }
    else if (ret === 'use strict')
        { this.flags |= 524288 /* StrictDirective */; }
    this.tokenValue = ret;
    return 262147 /* StringLiteral */;
};
Parser.prototype.throwStringError = function throwStringError (context, code) {
    switch (code) {
        case -2 /* StrictOctal */:
            this.error(context & 524288 /* Template */ ? 7 /* StrictOctalEscape */ : 92 /* TemplateOctalLiteral */);
        case -3 /* EightOrNine */:
            this.error(8 /* InvalidEightAndNine */);
        case -4 /* InvalidHex */:
            this.error(55 /* InvalidHexEscapeSequence */);
        case -5 /* OutOfRange */:
            this.error(5 /* UnicodeOutOfRange */);
        default:
    }
};
Parser.prototype.scanEscape = function scanEscape (context, cp) {
        var this$1 = this;

    switch (cp) {
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
            this.column = -1;
            this.line++;
            return -1 /* Empty */;
        case 48 /* Zero */:
        case 49 /* One */:
        case 50 /* Two */:
        case 51 /* Three */:
            {
                // 1 to 3 octal digits
                var code = cp - 48;
                var index = this.index + 1;
                var column = this.column + 1;
                var next = this.source.charCodeAt(index);
                if (next < 48 /* Zero */ || next > 55 /* Seven */) {
                    if ((code !== 0 || next === 56 /* Eight */ || next === 57 /* Nine */) &&
                        context & 2 /* Strict */) {
                        return -2 /* StrictOctal */;
                    }
                }
                else if (context & 2 /* Strict */) {
                    return -2 /* StrictOctal */;
                }
                else {
                    this.lastChar = next;
                    code = (code << 3) | (next - 48 /* Zero */);
                    index++;
                    column++;
                    if (index < this.source.length) {
                        next = this.source.charCodeAt(index);
                        if (next >= 48 /* Zero */ && next <= 55 /* Seven */) {
                            this.lastChar = next;
                            code = (code << 3) | (next - 48 /* Zero */);
                            index++;
                            column++;
                        }
                    }
                    this.index = index - 1;
                    this.column = column - 1;
                }
                return code;
            }
        case 52 /* Four */:
        case 53 /* Five */:
        case 54 /* Six */:
        case 55 /* Seven */:
            {
                // 1 to 2 octal digits
                if (context & 2 /* Strict */)
                    { return -2 /* StrictOctal */; }
                var code$1 = cp - 48;
                var index$1 = this.index + 1;
                var column$1 = this.column + 1;
                var next$1 = this.source.charCodeAt(index$1);
                if (next$1 >= 48 /* Zero */ && next$1 <= 55 /* Seven */) {
                    code$1 = (code$1 << 3) | (next$1 - 48 /* Zero */);
                    this.lastChar = next$1;
                    this.index = index$1;
                    this.column = column$1;
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
                var ch1 = this.scanNext();
                var hi = toHex(ch1);
                if (hi < 0)
                    { return -4 /* InvalidHex */; }
                var ch2 = this.scanNext();
                var lo = toHex(ch2);
                if (lo < 0)
                    { return -4 /* InvalidHex */; }
                return hi << 4 | lo;
            }
        // UCS-2/Unicode escapes
        case 117 /* LowerU */:
            {
                var ch = this.lastChar = this.scanNext();
                if (ch === 123 /* LeftBrace */) {
                    // \u{N}
                    ch = this.lastChar = this.scanNext();
                    var code$2 = toHex(ch);
                    if (code$2 < 0)
                        { return -4 /* InvalidHex */; }
                    ch = this.lastChar = this.scanNext();
                    while (ch !== 125 /* RightBrace */) {
                        var digit = toHex(ch);
                        if (digit < 0)
                            { return -4 /* InvalidHex */; }
                        code$2 = code$2 << 4 | digit;
                        // Code point out of bounds
                        if (code$2 > 1114111 /* LastUnicodeChar */)
                            { return -5 /* OutOfRange */; }
                        ch = this$1.lastChar = this$1.scanNext();
                    }
                    return code$2;
                }
                else {
                    // \uNNNN
                    var code$3 = toHex(ch);
                    if (code$3 < 0)
                        { return -4 /* InvalidHex */; }
                    for (var i = 0; i < 3; i++) {
                        ch = this$1.lastChar = this$1.scanNext();
                        var digit$1 = toHex(ch);
                        if (digit$1 < 0)
                            { return -4 /* InvalidHex */; }
                        code$3 = code$3 << 4 | digit$1;
                    }
                    return code$3;
                }
            }
        default:
            return this.nextCodePoint();
    }
};
Parser.prototype.consumeTemplateBrace = function consumeTemplateBrace (context) {
    if (!this.hasNext())
        { this.error(72 /* UnterminatedTemplate */); }
    // Upon reaching a '}', consume it and rewind the scanner state
    this.rewind();
    return this.scanTemplate(context);
};
Parser.prototype.scanTemplate = function scanTemplate (context) {
        var this$1 = this;

    var start = this.index;
    var lastChar = this.lastChar;
    var tail = true;
    var ret = '';
    var ch = this.scanNext(72 /* UnterminatedTemplate */);
    loop: while (ch !== 96 /* Backtick */) {
        switch (ch) {
            case 36 /* Dollar */:
                {
                    var index = this$1.index + 1;
                    if (index < this$1.source.length &&
                        this$1.source.charCodeAt(index) === 123 /* LeftBrace */) {
                        this$1.index = index;
                        this$1.column++;
                        tail = false;
                        break loop;
                    }
                    ret += '$';
                    break;
                }
            case 92 /* Backslash */:
                ch = this$1.scanNext(72 /* UnterminatedTemplate */);
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    this$1.lastChar = ch;
                    var code = this$1.scanEscape(context | 2 /* Strict */, ch);
                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    }
                    else if (code !== -1 /* Empty */ && context & 1048576 /* TaggedTemplate */) {
                        ret = null;
                        ch = this$1.scanLooserTemplateSegment(this$1.lastChar);
                        if (ch < 0) {
                            tail = false;
                        }
                        break loop;
                    }
                    else {
                        this$1.throwStringError(context | 524288 /* Template */, code);
                    }
                }
                break;
            // Line terminators
            case 13 /* CarriageReturn */:
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.column = -1;
                this$1.line++;
            default:
                if (ret != null)
                    { ret += fromCodePoint(ch); }
        }
        ch = this$1.scanNext(72 /* UnterminatedTemplate */);
    }
    this.advance();
    this.tokenValue = ret;
    this.lastChar = lastChar;
    if (tail) {
        this.tokenRaw = this.source.slice(start + 1, this.index - 1);
        return 262153 /* TemplateTail */;
    }
    else {
        this.tokenRaw = this.source.slice(start + 1, this.index - 2);
        return 262152 /* TemplateCont */;
    }
};
// The loose parser accepts invalid unicode escapes
Parser.prototype.scanLooserTemplateSegment = function scanLooserTemplateSegment (ch) {
        var this$1 = this;

    while (ch !== 96 /* Backtick */) {
        if (ch === 36 /* Dollar */) {
            var index = this$1.index + 1;
            if (index < this$1.source.length &&
                this$1.source.charCodeAt(index) === 123 /* LeftBrace */) {
                this$1.index = index;
                this$1.column++;
                return -ch;
            }
        }
        ch = this$1.scanNext();
    }
    return ch;
};
Parser.prototype.parseModuleItemList = function parseModuleItemList (context) {
        var this$1 = this;

    var statements = [];
    while (this.token !== 0 /* EndOfSource */) {
        statements.push(this$1.token === 262147 /* StringLiteral */ ?
            this$1.parseDirective(context) :
            this$1.parseModuleItem(context | 4 /* AllowIn */));
    }
    return statements;
};
Parser.prototype.parseDirective = function parseDirective (context) {
    var pos = this.getLocations();
    var directive = this.tokenRaw.slice(1, -1);
    var expr = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'ExpressionStatement',
        expression: expr,
        directive: directive
    });
};
Parser.prototype.parseStatementList = function parseStatementList (context, endToken) {
        var this$1 = this;

    var statements = [];
    while (this.token === 262147 /* StringLiteral */) {
        var item = this$1.parseDirective(context);
        statements.push(item);
        if (!isPrologueDirective(item))
            { break; }
        if (this$1.flags & 524288 /* StrictDirective */) {
            if (context & 67108864 /* StrictReserved */)
                { this$1.error(73 /* UnexpectedStrictReserved */); }
            if (this$1.flags & 8192 /* SimpleParameterList */)
                { this$1.error(26 /* IllegalUseStrict */); }
            if (this$1.flags & 1024 /* Binding */)
                { this$1.error(73 /* UnexpectedStrictReserved */); }
            context |= 2 /* Strict */;
        }
    }
    while (this.token !== endToken) {
        statements.push(this$1.parseStatementListItem(context));
    }
    return statements;
};
Parser.prototype.getLocations = function getLocations () {
    return {
        index: this.index,
        start: this.startIndex,
        line: this.startLine,
        column: this.startColumn
    };
};
Parser.prototype.finishNode = function finishNode (context, pos, node, shouldAdvance, root) {
        if ( shouldAdvance === void 0 ) shouldAdvance = false;
        if ( root === void 0 ) root = false;

    if (shouldAdvance)
        { this.nextToken(context); }
    if (this.flags & (1048576 /* OptionsRanges */ | 1073741824 /* OptionsAttachComment */)) {
        node.start = pos.start;
        node.end = this.lastIndex;
    }
    if (this.flags & 2097152 /* OptionsLoc */) {
        node.loc = {
            start: {
                line: pos.line,
                column: pos.column,
            },
            end: {
                line: this.lastLine,
                column: this.lastColumn
            }
        };
    }
    if (this.flags & 1073741824 /* OptionsAttachComment */) {
        this.attachComment(context, node);
    }
    return node;
};
Parser.prototype.parseOptional = function parseOptional (context, t) {
    if (this.token !== t)
        { return false; }
    this.nextToken(context);
    return true;
};
Parser.prototype.expect = function expect (context, t, msg /* Unexpected */) {
        if ( msg === void 0 ) msg = 0;

    if (this.token !== t)
        { this.error(msg); }
    this.nextToken(context);
};
Parser.prototype.isEvalOrArguments = function isEvalOrArguments (value) {
    return value === 'eval' || value === 'arguments';
};
/**
 * Consume a semicolon between tokens, optionally inserting it if necessary.
 */
Parser.prototype.consumeSemicolon = function consumeSemicolon (context) {
    switch (this.token) {
        case 17 /* Semicolon */:
            this.expect(context, 17 /* Semicolon */);
        case 15 /* RightBrace */:
        case 0 /* EndOfSource */:
            break;
        default:
            if (this.flags & 1 /* LineTerminator */)
                { break; }
            this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
    }
};
// 'import', 'import.meta'
Parser.prototype.nextTokenIsLeftParenOrPeriod = function nextTokenIsLeftParenOrPeriod (context) {
    var savedState = this.saveState();
    var t = this.nextToken(context);
    this.rewindState(savedState);
    return t === 262155 /* LeftParen */ || t === 13 /* Period */;
};
Parser.prototype.nextTokenIsFuncKeywordOnSameLine = function nextTokenIsFuncKeywordOnSameLine (context) {
    var savedState = this.saveState();
    var t = this.nextToken(context);
    var line = this.line;
    this.rewindState(savedState);
    return line === this.line && t === 274519 /* FunctionKeyword */;
};
Parser.prototype.isLexical = function isLexical (context) {
    var savedState = this.saveState();
    var savedFlag = this.flags;
    var t = this.nextToken(context);
    var flags = this.flags;
    this.rewindState(savedState);
    return !(savedFlag & 2 /* ExtendedUnicodeEscape */ && flags & 1 /* LineTerminator */) &&
        !!(t & (131072 /* BindingPattern */ | 67108864 /* IsIdentifier */ | 536870912 /* IsYield */) ||
            (t & 69632 /* Contextual */) === 69632 /* Contextual */);
};
Parser.prototype.isIdentifier = function isIdentifier (context, t) {
    if (context & 2 /* Strict */) {
        if (t & 536870912 /* IsYield */)
            { return false; }
        return (t & 67108864 /* IsIdentifier */) === 67108864 /* IsIdentifier */ ||
            (t & 69632 /* Contextual */) === 69632 /* Contextual */;
    }
    return (t & 67108864 /* IsIdentifier */) === 67108864 /* IsIdentifier */ ||
        (t & 69632 /* Contextual */) === 69632 /* Contextual */ ||
        (t & 20480 /* FutureReserved */) === 20480 /* FutureReserved */;
};
Parser.prototype.parseIdentifierName = function parseIdentifierName (context, t) {
    if (t & (67108864 /* IsIdentifier */ | 4096 /* Keyword */))
        { return this.parseIdentifier(context); }
    this.error(1 /* UnexpectedToken */, tokenDesc(t));
};
Parser.prototype.parseExportDefault = function parseExportDefault (context, pos) {
    this.expect(context, 12368 /* DefaultKeyword */);
    var declaration;
    switch (this.token) {
        // export default HoistableDeclaration[Default]
        case 274519 /* FunctionKeyword */:
            declaration = this.parseFunctionDeclaration(context | (16384 /* Optional */ | 1024 /* Declaration */));
            break;
        // export default ClassDeclaration[Default]
        case 274509 /* ClassKeyword */:
            declaration = this.parseClassDeclaration(context | (16384 /* Optional */ | 1024 /* Declaration */));
            break;
        // export default HoistableDeclaration[Default]
        case 151064684 /* AsyncKeyword */:
            if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                declaration = this.parseFunctionDeclaration(context | (16384 /* Optional */ | 1024 /* Declaration */));
                break;
            }
        // falls through
        default:
            // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
            declaration = this.parseAssignmentExpression(context);
            this.consumeSemicolon(context);
    }
    return this.finishNode(context, pos, {
        type: 'ExportDefaultDeclaration',
        declaration: declaration
    });
};
Parser.prototype.parseExportDeclaration = function parseExportDeclaration (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var specifiers = [];
    var source = null;
    var declaration = null;
    this.expect(context | 33554432 /* ValidateEscape */, 12371 /* ExportKeyword */);
    switch (this.token) {
        // export * FromClause ;
        case 270535219 /* Multiply */:
            return this.parseExportAllDeclaration(context, pos);
        case 12368 /* DefaultKeyword */:
            return this.parseExportDefault(context, pos);
        case 393228 /* LeftBrace */:
            var isReserved = false;
            var functionScope = this.functionScope;
            var blockScope = this.blockScope;
            var parentScope = this.parentScope;
            this.functionScope = undefined;
            this.blockScope = undefined;
            if (blockScope != null)
                { this.parentScope = blockScope; }
            this.expect(context, 393228 /* LeftBrace */);
            while (this.token !== 15 /* RightBrace */) {
                if (this$1.token & 12288 /* Reserved */)
                    { isReserved = true; }
                specifiers.push(this$1.parseNamedExportDeclaration(context));
                if (this$1.token !== 15 /* RightBrace */)
                    { this$1.expect(context, 18 /* Comma */); }
            }
            this.expect(context | 33554432 /* ValidateEscape */, 15 /* RightBrace */);
            if (this.token === 69745 /* FromKeyword */) {
                source = this.parseFromClause(context);
            }
            else if (isReserved)
                { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
            this.functionScope = functionScope;
            this.blockScope = blockScope;
            this.parentScope = parentScope;
            this.consumeSemicolon(context);
            break;
        // export ClassDeclaration
        case 274509 /* ClassKeyword */:
            declaration = this.parseClassDeclaration(context | 1024 /* Declaration */);
            break;
        // export LexicalDeclaration
        case 8663113 /* ConstKeyword */:
            declaration = this.parseVariableStatement(context | 536870912 /* Const */);
            break;
        // export LexicalDeclaration
        case 8671304 /* LetKeyword */:
            declaration = this.parseVariableStatement(context | 268435456 /* Let */);
            break;
        // export VariableDeclaration
        case 8663111 /* VarKeyword */:
            declaration = this.parseVariableStatement(context);
            break;
        // export HoistableDeclaration
        case 274519 /* FunctionKeyword */:
            declaration = this.parseFunctionDeclaration(context | 1024 /* Declaration */);
            break;
        // export HoistableDeclaration
        case 151064684 /* AsyncKeyword */:
            if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                declaration = this.parseFunctionDeclaration(context | 1024 /* Declaration */);
                break;
            }
        // Falls through
        default:
            this.error(50 /* MissingMsgDeclarationAfterExport */);
    }
    return this.finishNode(context, pos, {
        type: 'ExportNamedDeclaration',
        source: source,
        specifiers: specifiers,
        declaration: declaration
    });
};
Parser.prototype.parseNamedExportDeclaration = function parseNamedExportDeclaration (context) {
    var pos = this.getLocations();
    if (this.token & 67108864 /* IsIdentifier */)
        { this.addBlockName(context, this.tokenValue); }
    var local = this.parseIdentifierName(context | 33554432 /* ValidateEscape */, this.token);
    var exported = local;
    if (this.parseOptional(context, 69739 /* AsKeyword */)) {
        this.checkIfExistInBlockScope(this.tokenValue);
        exported = this.parseIdentifierName(context, this.token);
    }
    return this.finishNode(context, pos, {
        type: 'ExportSpecifier',
        local: local,
        exported: exported
    });
};
Parser.prototype.parseExportAllDeclaration = function parseExportAllDeclaration (context, pos) {
    this.expect(context, 270535219 /* Multiply */);
    var source = this.parseFromClause(context);
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'ExportAllDeclaration',
        source: source
    });
};
Parser.prototype.parseFromClause = function parseFromClause (context) {
    this.expect(context, 69745 /* FromKeyword */);
    if (this.token !== 262147 /* StringLiteral */)
        { this.error(38 /* InvalidModuleSpecifier */); }
    return this.parseLiteral(context);
};
// import {<foo as bar>} ...;
Parser.prototype.parseImportSpecifier = function parseImportSpecifier (context) {
    var pos = this.getLocations();
    var value = this.tokenValue;
    var t = this.token;
    var imported = this.parseIdentifierName(context | 33554432 /* ValidateEscape */, t);
    var hasAs = false;
    if (this.token & 69632 /* Contextual */) {
        this.expect(context, 69739 /* AsKeyword */);
        this.checkIfExistInBlockScope(this.tokenValue);
        hasAs = true;
    }
    else {
        hasAs = this.parseOptional(context, 69739 /* AsKeyword */);
        this.addBlockName(context, value);
    }
    var local;
    if (!hasAs) {
        if (t & 12288 /* Reserved */)
            { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
        if (this.isEvalOrArguments(value)) {
            this.error(73 /* UnexpectedStrictReserved */);
        }
        local = imported;
    }
    else
        { local = this.parseBindingIdentifier(context); }
    return this.finishNode(context, pos, {
        type: 'ImportSpecifier',
        local: local,
        imported: imported
    });
};
// {foo, bar as bas}
Parser.prototype.parseNamedImport = function parseNamedImport (context, specifiers) {
        var this$1 = this;

    this.expect(context, 393228 /* LeftBrace */);
    while (this.token !== 15 /* RightBrace */) {
        // only accepts identifiers or keywords
        specifiers.push(this$1.parseImportSpecifier(context));
        if (this$1.token !== 15 /* RightBrace */) {
            this$1.expect(context, 18 /* Comma */);
        }
    }
    this.expect(context, 15 /* RightBrace */);
};
// import <* as foo> ...;
Parser.prototype.parseImportNamespaceSpecifier = function parseImportNamespaceSpecifier (context, specifiers) {
    var pos = this.getLocations();
    this.expect(context | 33554432 /* ValidateEscape */, 270535219 /* Multiply */);
    this.expect(context, 69739 /* AsKeyword */, 37 /* NoAsAfterImportNamespace */);
    this.checkIfExistInBlockScope(this.tokenValue);
    var local = this.parseBindingIdentifier(context);
    specifiers.push(this.finishNode(context, pos, {
        type: 'ImportNamespaceSpecifier',
        local: local
    }));
};
// import <foo> ...;
Parser.prototype.parseImportDefaultSpecifier = function parseImportDefaultSpecifier (context) {
    return this.finishNode(context, this.getLocations(), {
        type: 'ImportDefaultSpecifier',
        local: this.parseIdentifierName(context, this.token)
    });
};
Parser.prototype.parseImportDeclaration = function parseImportDeclaration (context) {
    var pos = this.getLocations();
    this.expect(context, 274521 /* ImportKeyword */);
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    var source;
    if (blockScope != null)
        { this.parentScope = blockScope; }
    this.blockScope = undefined;
    // import 'foo';
    if (this.token === 262147 /* StringLiteral */) {
        this.addBlockName(context, this.tokenValue);
        source = this.parseLiteral(context);
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'ImportDeclaration',
            specifiers: [],
            source: source
        });
    }
    var specifiers = this.parseImportClause(context);
    source = this.parseFromClause(context);
    this.consumeSemicolon(context);
    this.blockScope = blockScope;
    if (parentScope != null)
        { this.parentScope = parentScope; }
    return this.finishNode(context, pos, {
        type: 'ImportDeclaration',
        specifiers: specifiers,
        source: source
    });
};
Parser.prototype.parseImportClause = function parseImportClause (context) {
    var assign;
        var specifiers = (assign = [], assign);
    switch (this.token) {
        case 67371009 /* Identifier */:
            {
                this.addBlockName(context, this.tokenValue);
                specifiers.push(this.parseImportDefaultSpecifier(context | 33554432 /* ValidateEscape */));
                if (this.parseOptional(context, 18 /* Comma */)) {
                    var t = this.token;
                    if (t & 268435456 /* IsGenerator */) {
                        this.parseImportNamespaceSpecifier(context, specifiers);
                    }
                    else if (t === 393228 /* LeftBrace */) {
                        this.parseNamedImport(context, specifiers);
                    }
                    else {
                        this.error(1 /* UnexpectedToken */, tokenDesc(t));
                    }
                }
                break;
            }
        // import {bar}
        case 393228 /* LeftBrace */:
            this.parseNamedImport(context | 33554432 /* ValidateEscape */, specifiers);
            break;
        // import * as foo
        case 270535219 /* Multiply */:
            this.parseImportNamespaceSpecifier(context, specifiers);
            break;
        default:
            this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
    }
    return specifiers;
};
Parser.prototype.parseModuleItem = function parseModuleItem (context) {
    switch (this.token) {
        // 'export'
        case 12371 /* ExportKeyword */:
            return this.parseExportDeclaration(context);
        // 'import'
        case 274521 /* ImportKeyword */:
            if (!(this.flags & 33554432 /* OptionsNext */ && this.nextTokenIsLeftParenOrPeriod(context))) {
                return this.parseImportDeclaration(context);
            }
        default:
            return this.parseStatementListItem(context);
    }
};
Parser.prototype.parseStatementListItem = function parseStatementListItem (context) {
    switch (this.token) {
        case 274519 /* FunctionKeyword */:
            return this.parseFunctionDeclaration(context);
        case 274509 /* ClassKeyword */:
            return this.parseClassDeclaration(context);
        case 8671304 /* LetKeyword */:
            // If let follows identifier on the same line, it is an declaration. Parse it as a variable statement
            if (this.isLexical(context)) {
                return this.parseVariableStatement(context | 268435456 /* Let */ | 4 /* AllowIn */);
            }
            return this.parseStatement(context & ~1024 /* Declaration */);
        case 8663113 /* ConstKeyword */:
            return this.parseVariableStatement(context | 536870912 /* Const */ | 4 /* AllowIn */);
        // VariableStatement[?Yield]
        case 12371 /* ExportKeyword */:
            if (context & 1 /* Module */)
                { this.error(48 /* ExportDeclAtTopLevel */); }
        case 274521 /* ImportKeyword */:
            // We must be careful not to parse a 'import()'
            // expression or 'import.meta' as an import declaration.
            if (this.flags & 33554432 /* OptionsNext */ && this.nextTokenIsLeftParenOrPeriod(context)) {
                return this.parseExpressionStatement(context | 4 /* AllowIn */);
            }
            if (context & 1 /* Module */)
                { this.error(49 /* ImportDeclAtTopLevel */); }
        default:
            return this.parseStatement(context);
    }
};
Parser.prototype.parseStatement = function parseStatement (context) {
    switch (this.token) {
        case 67371009 /* Identifier */:
            return this.parseExpressionOrLabeledStatement(context);
        // EmptyStatement
        case 17 /* Semicolon */:
            return this.parseEmptyStatement(context);
        // BlockStatement[?Yield, ?Return]
        case 393228 /* LeftBrace */:
            return this.parseBlockStatement(context);
        // VariableStatement[?Yield]
        case 8663111 /* VarKeyword */:
            return this.parseVariableStatement(context | 4 /* AllowIn */);
        // VariableStatement[?Yield]
        // [+Return] ReturnStatement[?Yield]
        case 12379 /* ReturnKeyword */:
            return this.parseReturnStatement(context);
        // IfStatement[?Yield, ?Return]
        case 12376 /* IfKeyword */:
            return this.parseIfStatement(context);
        // BreakStatement[?Yield]
        case 12362 /* BreakKeyword */:
            return this.parseBreakStatement(context);
        case 12374 /* ForKeyword */:
            return this.parseForStatement(context);
        case 12366 /* ContinueKeyword */:
            return this.parseContinueStatement(context);
        // DebuggerStatement
        case 12367 /* DebuggerKeyword */:
            return this.parseDebuggerStatement(context);
        // BreakableStatement[?Yield, ?Return]
        //
        // BreakableStatement[Yield, Return]:
        //   IterationStatement[?Yield, ?Return]
        //   SwitchStatement[?Yield, ?Return]
        case 12369 /* DoKeyword */:
            return this.parseDoWhileStatement(context);
        case 12385 /* WhileKeyword */:
            return this.parseWhileStatement(context);
        // WithStatement[?Yield, ?Return]
        case 12386 /* WithKeyword */:
            return this.parseWithStatement(context);
        case 274525 /* SwitchKeyword */:
            return this.parseSwitchStatement(context | 1024 /* Declaration */);
        // ThrowStatement[?Yield]
        case 12383 /* ThrowKeyword */:
            return this.parseThrowStatement(context);
        // TryStatement[?Yield, ?Return]
        case 12384 /* TryKeyword */:
            return this.parseTryStatement(context);
        case 537153642 /* YieldKeyword */:
        case 1074073709 /* AwaitKeyword */:
            return this.parseExpressionOrLabeledStatement(context);
        // AsyncFunctionDeclaration[Yield, Await, Default]
        // Both 'class' and 'function' are forbidden by lookahead restriction.
        case 151064684 /* AsyncKeyword */:
            if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                if (context & 1024 /* Declaration */ || this.flags & 32 /* AllowContinue */) {
                    this.error(115 /* AsyncFunctionInSingleStatementContext */);
                }
                return this.parseFunctionDeclaration(context);
            }
            return this.parseExpressionOrLabeledStatement(context | 1024 /* Declaration */);
        case 274519 /* FunctionKeyword */:
            if (context & 4096 /* AnnexB */)
                { return this.parseFunctionDeclaration(context); }
        // falls through
        case 274509 /* ClassKeyword */:
            this.error(87 /* ForbiddenAsStatement */, tokenDesc(this.token));
        default:
            return this.parseExpressionStatement(context | 4 /* AllowIn */);
    }
};
Parser.prototype.parseBlockStatement = function parseBlockStatement (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var body = [];
    this.expect(context, 393228 /* LeftBrace */);
    if (this.token !== 15 /* RightBrace */) {
        var blockScope = this.blockScope;
        var parentScope = this.parentScope;
        if (blockScope !== undefined)
            { this.parentScope = blockScope; }
        this.blockScope = context & 2048 /* ExistingScope */ ? blockScope : undefined;
        var flag = this.flags;
        while (this.token !== 15 /* RightBrace */) {
            body.push(this$1.parseStatementListItem(context & ~2048 /* ExistingScope */ | 1024 /* Declaration */));
        }
        this.flags = flag;
        this.blockScope = context & 2048 /* ExistingScope */ ? undefined : blockScope;
        if (parentScope !== undefined)
            { this.parentScope = parentScope; }
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(context, pos, {
        type: 'BlockStatement',
        body: body
    });
};
Parser.prototype.parseTryStatement = function parseTryStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12384 /* TryKeyword */);
    var block = this.parseBlockStatement(context);
    var handler = null;
    var finalizer = null;
    if (this.token === 12364 /* CatchKeyword */) {
        handler = this.parseCatchClause(context);
    }
    if (this.parseOptional(context, 12373 /* FinallyKeyword */)) {
        finalizer = this.parseBlockStatement(context);
    }
    if (!handler && !finalizer)
        { this.error(20 /* NoCatchOrFinally */); }
    return this.finishNode(context, pos, {
        type: 'TryStatement',
        block: block,
        handler: handler,
        finalizer: finalizer
    });
};
Parser.prototype.parseCatchClause = function parseCatchClause (context) {
    var pos = this.getLocations();
    this.expect(context, 12364 /* CatchKeyword */);
    // Create a lexical scope node around the whole catch clause
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope !== undefined)
        { this.parentScope = blockScope; }
    this.blockScope = undefined;
    var param = null;
    if (this.parseOptional(context, 262155 /* LeftParen */)) {
        if (this.token & 67108864 /* IsIdentifier */)
            { this.addCatchArg(this.tokenValue); }
        param = this.parseBindingIdentifierOrPattern(context);
        this.expect(context, 16 /* RightParen */);
    }
    var body = this.parseBlockStatement(context | 2048 /* ExistingScope */);
    this.blockScope = blockScope;
    if (blockScope !== undefined)
        { this.parentScope = parentScope; }
    return this.finishNode(context, pos, {
        type: 'CatchClause',
        param: param,
        body: body
    });
};
Parser.prototype.parseThrowStatement = function parseThrowStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12383 /* ThrowKeyword */);
    if (this.flags & 1 /* LineTerminator */)
        { this.error(21 /* LineBreakAfterThrow */); }
    var argument = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'ThrowStatement',
        argument: argument
    });
};
Parser.prototype.parseWithStatement = function parseWithStatement (context) {
    var pos = this.getLocations();
    // Strict mode code may not include a WithStatement. The occurrence of a WithStatement in such
    // a context is an grammar error
    if (context & 2 /* Strict */)
        { this.error(22 /* StrictModeWith */); }
    this.expect(context, 12386 /* WithKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var object = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    return this.finishNode(context, pos, {
        type: 'WithStatement',
        object: object,
        body: this.parseStatement(context | 2097152 /* Statement */ | 1024 /* Declaration */)
    });
};
Parser.prototype.parseWhileStatement = function parseWhileStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12385 /* WhileKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var test = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    var savedFlag = this.flags;
    this.flags |= (32 /* AllowContinue */ | 16 /* AllowBreak */);
    var body = this.parseStatement(context & ~1024 /* Declaration */);
    this.flags = savedFlag;
    return this.finishNode(context, pos, {
        type: 'WhileStatement',
        test: test,
        body: body
    });
};
Parser.prototype.parseDoWhileStatement = function parseDoWhileStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12369 /* DoKeyword */);
    var savedFlag = this.flags;
    this.flags |= (16 /* AllowBreak */ | 32 /* AllowContinue */);
    var body = this.parseStatement(context & ~1024 /* Declaration */);
    this.flags = savedFlag;
    this.expect(context, 12385 /* WhileKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var test = this.parseExpression(context & ~1024 /* Declaration */ | 4 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    this.parseOptional(context, 17 /* Semicolon */);
    return this.finishNode(context, pos, {
        type: 'DoWhileStatement',
        body: body,
        test: test
    });
};
Parser.prototype.parseContinueStatement = function parseContinueStatement (context) {
    // Appearing of continue without an IterationStatement leads to syntax error
    if (!(this.flags & 32 /* AllowContinue */)) {
        this.error(93 /* InvalidNestedStatement */, tokenDesc(this.token));
    }
    var pos = this.getLocations();
    var t = this.token;
    this.expect(context, 12366 /* ContinueKeyword */);
    var label = null;
    if (!(this.flags & 1 /* LineTerminator */) && this.token & 67108864 /* IsIdentifier */) {
        label = this.parseIdentifierName(context, this.token);
        var key = '$' + label.name;
        if (this.labelSet !== null && !this.labelSet[key]) {
            this.error(69 /* UnknownLabel */, label.name);
        }
    }
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'ContinueStatement',
        label: label
    });
};
Parser.prototype.parseBreakStatement = function parseBreakStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12362 /* BreakKeyword */);
    var t = this.token;
    var label = null;
    if (!(this.flags & 1 /* LineTerminator */) && t & 67108864 /* IsIdentifier */) {
        label = this.parseIdentifierName(context, t);
        if (this.labelSet !== null && !this.labelSet['$' + label.name]) {
            this.error(69 /* UnknownLabel */, label.name);
        }
    }
    else if (!(this.flags & 16 /* AllowBreak */)) {
        this.error(93 /* InvalidNestedStatement */, tokenDesc(t));
    }
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'BreakStatement',
        label: label
    });
};
Parser.prototype.parseForStatement = function parseForStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12374 /* ForKeyword */);
    var declarations = null;
    var init = null;
    var body;
    // Create a lexical scope node around the whole ForStatement
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    var awaitToken = (context & 32 /* Await */) !== 0 && this.parseOptional(context, 1074073709 /* AwaitKeyword */);
    var savedFlag = this.flags;
    this.blockScope = undefined;
    if (blockScope !== undefined)
        { this.parentScope = blockScope; }
    this.expect(context, 262155 /* LeftParen */);
    var token = this.token;
    context |= 262144 /* ForStatement */ | 33554432 /* ValidateEscape */;
    if (this.token !== 17 /* Semicolon */) {
        var VarDeclStart = this.getLocations();
        if (this.parseOptional(context, 8663111 /* VarKeyword */)) {
            declarations = this.parseVariableDeclarationList(context);
        }
        else if (this.parseOptional(context, 8663113 /* ConstKeyword */)) {
            declarations = this.parseVariableDeclarationList(context | 536870912 /* Const */);
        }
        else if (this.isLexical(context) && this.parseOptional(context, 8671304 /* LetKeyword */)) {
            declarations = this.parseVariableDeclarationList(context | 268435456 /* Let */);
        }
        else {
            init = this.parseExpression(context & ~4 /* AllowIn */, pos);
        }
        if (declarations) {
            init = this.finishNode(context, VarDeclStart, {
                type: 'VariableDeclaration',
                declarations: declarations,
                kind: tokenDesc(token)
            });
        }
    }
    this.flags |= (32 /* AllowContinue */ | 16 /* AllowBreak */);
    if (isInOrOfKeyword(this.token)) {
        var isForOfStatement = false;
        var right;
        if (this.parseOptional(context, 69746 /* OfKeyword */)) {
            isForOfStatement = true;
            if (awaitToken && !(this.flags & 33554432 /* OptionsNext */))
                { this.error(1 /* UnexpectedToken */, tokenDesc(token)); }
            right = this.parseAssignmentExpression(context);
        }
        // else-path will not be taken if we use if / else
        if (this.parseOptional(context, 2111281 /* InKeyword */)) {
            if (awaitToken)
                { this.error(1 /* UnexpectedToken */, tokenDesc(token)); }
            if (declarations && declarations.length !== 1)
                { this.error(0 /* Unexpected */); }
            right = this.parseExpression(context, pos);
        }
        if (!declarations) {
            if (!isValidDestructuringAssignmentTarget(init) || init.type === 'AssignmentExpression') {
                this.errorLocation = pos;
                this.error(32 /* InvalidLHSInForLoop */);
            }
            this.reinterpretAsPattern(context, init);
        }
        this.expect(context, 16 /* RightParen */);
        body = this.parseStatement(context & ~1024 /* Declaration */ | 2048 /* ExistingScope */);
        this.blockScope = blockScope;
        if (blockScope !== undefined)
            { this.parentScope = parentScope; }
        this.flags = savedFlag;
        return this.finishNode(context, pos, isForOfStatement ? {
            type: 'ForOfStatement',
            body: body,
            left: init,
            right: right,
            await: awaitToken
        } : {
            type: 'ForInStatement',
            body: body,
            left: init,
            right: right
        });
    }
    var update = null;
    var test = null;
    this.expect(context, 17 /* Semicolon */);
    if (this.token !== 17 /* Semicolon */)
        { test = this.parseExpression(context, pos); }
    this.expect(context, 17 /* Semicolon */);
    if (this.token !== 16 /* RightParen */)
        { update = this.parseExpression(context, pos); }
    this.expect(context, 16 /* RightParen */);
    body = this.parseStatement(context & ~1024 /* Declaration */);
    this.blockScope = blockScope;
    if (blockScope !== undefined)
        { this.parentScope = parentScope; }
    this.flags = savedFlag;
    return this.finishNode(context, pos, {
        type: 'ForStatement',
        body: body,
        init: init,
        test: test,
        update: update
    });
};
Parser.prototype.parseIfStatementChild = function parseIfStatementChild (context) {
    if (context & 2 /* Strict */ && this.token === 274519 /* FunctionKeyword */) {
        this.error(87 /* ForbiddenAsStatement */, tokenDesc(this.token));
    }
    return this.parseStatement(context | (4096 /* AnnexB */ | 1024 /* Declaration */ | 2097152 /* Statement */));
};
Parser.prototype.parseIfStatement = function parseIfStatement (context) {
    var pos = this.getLocations();
    if (this.flags & 2 /* ExtendedUnicodeEscape */)
        { this.error(63 /* UnexpectedEscapedKeyword */); }
    this.expect(context, 12376 /* IfKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    // An IF node has three kids: test, alternate, and optional else
    var test = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    var savedFlag = this.flags;
    var consequent = this.parseIfStatementChild(context);
    var alternate = null;
    if (this.parseOptional(context, 12370 /* ElseKeyword */))
        { alternate = this.parseIfStatementChild(context); }
    this.flags = savedFlag;
    return this.finishNode(context, pos, {
        type: 'IfStatement',
        test: test,
        alternate: alternate,
        consequent: consequent
    });
};
Parser.prototype.parseDebuggerStatement = function parseDebuggerStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12367 /* DebuggerKeyword */);
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'DebuggerStatement'
    });
};
Parser.prototype.parseSwitchStatement = function parseSwitchStatement (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 274525 /* SwitchKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var discriminant = this.parseExpression(context, pos);
    this.expect(context, 16 /* RightParen */);
    this.expect(context, 393228 /* LeftBrace */);
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope !== undefined)
        { this.parentScope = blockScope; }
    this.blockScope = undefined;
    var cases = [];
    var seenDefault = false;
    var SavedFlag = this.flags;
    this.flags |= 16 /* AllowBreak */;
    while (this.token !== 15 /* RightBrace */) {
        var clause = this$1.parseSwitchCases(context);
        if (clause.test === null) {
            // Error on duplicate 'default' clauses
            if (seenDefault)
                { this$1.error(18 /* MultipleDefaultsInSwitch */); }
            seenDefault = true;
        }
        cases.push(clause);
    }
    this.flags = SavedFlag;
    this.expect(context, 15 /* RightBrace */);
    this.blockScope = blockScope;
    if (blockScope !== undefined)
        { this.parentScope = parentScope; }
    return this.finishNode(context, pos, {
        type: 'SwitchStatement',
        discriminant: discriminant,
        cases: cases
    });
};
Parser.prototype.parseSwitchCases = function parseSwitchCases (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var test = null;
    if (this.parseOptional(context, 12368 /* DefaultKeyword */)) {
        test = null;
    }
    else {
        this.expect(context, 12363 /* CaseKeyword */);
        test = this.parseExpression(context, pos);
    }
    this.expect(context, 21 /* Colon */);
    var consequent = [];
    loop: while (true) {
        switch (this$1.token) {
            case 15 /* RightBrace */:
            case 12368 /* DefaultKeyword */:
            case 12363 /* CaseKeyword */:
                break loop;
            default:
                consequent.push(this$1.parseStatementListItem(context));
        }
    }
    return this.finishNode(context, pos, {
        type: 'SwitchCase',
        test: test,
        consequent: consequent,
    });
};
Parser.prototype.parseEmptyStatement = function parseEmptyStatement (context) {
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(context, pos, {
        type: 'EmptyStatement'
    });
};
Parser.prototype.canParseArgument = function canParseArgument () {
    // Bail out quickly if we have seen a LineTerminator
    if (this.flags & 1 /* LineTerminator */)
        { return false; }
    switch (this.token) {
        case 17 /* Semicolon */:
        case 15 /* RightBrace */:
        case 0 /* EndOfSource */:
            return false;
        default:
            return true;
    }
};
Parser.prototype.parseReturnStatement = function parseReturnStatement (context) {
    var pos = this.getLocations();
    if (!(this.flags & (67108864 /* OptionsGlobalReturn */ | 4 /* InFunctionBody */)))
        { this.error(19 /* IllegalReturn */); }
    this.expect(context, 12379 /* ReturnKeyword */);
    var argument = null;
    if (this.canParseArgument()) {
        argument = this.parseExpression(context | 4 /* AllowIn */, pos);
    }
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'ReturnStatement',
        argument: argument
    });
};
Parser.prototype.parseExpressionOrLabeledStatement = function parseExpressionOrLabeledStatement (context) {
    var pos = this.getLocations();
    var expr = this.parseExpression(context | 33554432 /* ValidateEscape */ | 4 /* AllowIn */, pos);
    var t = this.token;
    if (t === 21 /* Colon */ && expr.type === 'Identifier') {
        this.expect(context, 21 /* Colon */);
        var key = '$' + expr.name;
        if (this.labelSet === undefined)
            { this.labelSet = {}; }
        else if (this.labelSet[key] === true)
            { this.error(68 /* Redeclaration */, expr.name); }
        this.labelSet[key] = true;
        t = this.token;
        switch (t) {
            case 12366 /* ContinueKeyword */:
                // continue's label when present must refer to a loop construct;
                if (this.flags & 32 /* AllowContinue */) {
                    this.error(93 /* InvalidNestedStatement */, tokenDesc(t));
                }
                break;
            case 274519 /* FunctionKeyword */:
                // A labelled function declaration is never permitted in the first of two
                // Statement positions
                if (context & 2097152 /* Statement */ || this.flags & 32 /* AllowContinue */) {
                    this.error(117 /* SloppyFunction */);
                }
                if (context & 2 /* Strict */) {
                    this.error(15 /* StrictFunction */);
                }
            default: // ignore    
        }
        var body = this.parseStatement(context | 4096 /* AnnexB */ | 1024 /* Declaration */);
        this.labelSet[key] = false;
        return this.finishNode(context, pos, {
            type: 'LabeledStatement',
            label: expr,
            body: body
        });
    }
    else {
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'ExpressionStatement',
            expression: expr
        });
    }
};
Parser.prototype.parseExpressionStatement = function parseExpressionStatement (context) {
    var pos = this.getLocations();
    var expr = this.parseExpression(context, pos);
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'ExpressionStatement',
        expression: expr
    });
};
Parser.prototype.parseVariableStatement = function parseVariableStatement (context) {
    var pos = this.getLocations();
    var t = this.token;
    if (this.flags & 2 /* ExtendedUnicodeEscape */)
        { this.error(63 /* UnexpectedEscapedKeyword */); }
    this.nextToken(context);
    var declarations = this.parseVariableDeclarationList(context);
    this.consumeSemicolon(context);
    return this.finishNode(context, pos, {
        type: 'VariableDeclaration',
        declarations: declarations,
        kind: tokenDesc(t)
    });
};
Parser.prototype.parseVariableDeclarationList = function parseVariableDeclarationList (context) {
        var this$1 = this;

    var list = [this.parseVariableDeclaration(context)];
    if (this.token !== 18 /* Comma */)
        { return list; }
    while (this.parseOptional(context, 18 /* Comma */))
        { list.push(this$1.parseVariableDeclaration(context)); }
    return list;
};
Parser.prototype.parseVariableDeclaration = function parseVariableDeclaration (context) {
    var pos = this.getLocations();
    var t = this.token;
    var id = this.parseBindingIdentifierOrPattern(context);
    var init = null;
    if (t & 131072 /* BindingPattern */) {
        if (this.parseOptional(context, 1310749 /* Assign */)) {
            init = this.parseAssignmentExpression(context & ~(805306368 /* Lexical */ | 262144 /* ForStatement */));
            if (!(context & 805306368 /* Lexical */) && context & 262144 /* ForStatement */) {
                if (this.token === 2111281 /* InKeyword */) {
                    this.error(83 /* InvalidVarDeclInForIn */);
                }
                else if (this.token === 69746 /* OfKeyword */) {
                    this.error(30 /* DeclarationMissingInitializer */);
                }
            }
        }
        else if (!isInOrOfKeyword(this.token))
            { this.error(30 /* DeclarationMissingInitializer */); }
    }
    else {
        if (this.parseOptional(context, 1310749 /* Assign */)) {
            init = this.parseAssignmentExpression(context & ~(805306368 /* Lexical */ | 262144 /* ForStatement */));
            if (context & 262144 /* ForStatement */) {
                if (this.token === 69746 /* OfKeyword */)
                    { this.error(31 /* InvalidVarInitForOf */); }
                if (this.token === 2111281 /* InKeyword */ && (context & (2 /* Strict */ | 805306368 /* Lexical */))) {
                    this.error(83 /* InvalidVarDeclInForIn */);
                }
            }
        }
        else if (context & 536870912 /* Const */ && !isInOrOfKeyword(this.token)) {
            this.error(82 /* MissingInitializer */, 'const');
        }
    }
    return this.finishNode(context, pos, {
        type: 'VariableDeclarator',
        init: init,
        id: id
    });
};
Parser.prototype.parseExpression = function parseExpression (context, pos) {
        var this$1 = this;

    var expr = this.parseAssignmentExpression(context);
    if (this.token !== 18 /* Comma */)
        { return expr; }
    var expressions = [expr];
    while (this.parseOptional(context, 18 /* Comma */)) {
        expressions.push(this$1.parseAssignmentExpression(context));
    }
    return this.finishNode(context, pos, {
        type: 'SequenceExpression',
        expressions: expressions
    });
};
Parser.prototype.parseYieldExpression = function parseYieldExpression (context, pos) {
    if (this.flags & 2 /* ExtendedUnicodeEscape */)
        { this.error(63 /* UnexpectedEscapedKeyword */); }
    if (context & 128 /* InParameter */)
        { this.error(118 /* YieldInParameter */); }
    this.expect(context, 537153642 /* YieldKeyword */);
    var argument = null;
    var delegate = false;
    if (!(this.flags & 1 /* LineTerminator */)) {
        delegate = this.parseOptional(context, 270535219 /* Multiply */);
        if (delegate) {
            argument = this.parseAssignmentExpression(context);
        }
        else if (hasMask(this.token, 262144 /* ExpressionStart */)) {
            argument = this.parseAssignmentExpression(context);
        }
    }
    return this.finishNode(context, pos, {
        type: 'YieldExpression',
        argument: argument,
        delegate: delegate
    });
};
Parser.prototype.parseAssignmentExpression = function parseAssignmentExpression (context) {
    var pos = this.getLocations();
    if (context & 16 /* Yield */ && this.token & 536870912 /* IsYield */) {
        // Invalid: 'function* foo(a = 1 + (yield 2)) { }'
        if (context & 128 /* InParameter */ && !(this.flags & 4 /* InFunctionBody */)) {
            this.error(94 /* InvalidGeneratorParam */);
        }
        return this.parseYieldExpression(context, pos);
    }
    var token = this.token;
    var tokenValue = this.tokenValue;
    var expr = this.parseConditionalExpression(context, pos);
    // If that's the case - parse out a arrow function with a single un-parenthesized parameter.
    // An async one, will be parsed out in 'parsePrimaryExpression'
    if (this.token === 10 /* Arrow */ && (this.isIdentifier(context | 8 /* Arrow */, token))) {
        if (!(this.flags & 1 /* LineTerminator */)) {
            if (this.isEvalOrArguments(expr.name)) {
                if (context & 2 /* Strict */)
                    { this.error(73 /* UnexpectedStrictReserved */); }
                this.flags |= 1024 /* Binding */;
            }
            return this.parseArrowFunctionExpression(context & ~(32 /* Await */) | 8 /* Arrow */, pos, [expr]);
        }
    }
    if (hasMask(this.token, 1310720 /* AssignOperator */)) {
        var operator = this.token;
        if (context & 2 /* Strict */ && this.isEvalOrArguments(expr.name)) {
            this.error(35 /* StrictLHSAssignment */);
        }
        else if (this.token === 1310749 /* Assign */) {
            if (context & 64 /* InParenthesis */) {
                this.flags |= 8192 /* SimpleParameterList */;
            }
            else if (this.flags & 512 /* Rest */)
                { this.error(36 /* InvalidLHSInAssignment */); }
            // Note: A functions parameter list is already parsed as pattern, so no need to reinterpret
            this.reinterpretAsPattern(context, expr);
        }
        else if (!isValidSimpleAssignmentTarget(expr)) {
            this.error(36 /* InvalidLHSInAssignment */);
        }
        this.nextToken(context);
        if (context & 16 /* Yield */ && context & 64 /* InParenthesis */ && this.token & 536870912 /* IsYield */) {
            this.flags |= 128 /* Yield */;
        }
        var right = this.parseAssignmentExpression(context | 4 /* AllowIn */);
        return this.finishNode(context, pos, {
            type: 'AssignmentExpression',
            left: expr,
            operator: tokenDesc(operator),
            right: right
        });
    }
    return expr;
};
Parser.prototype.reinterpretAsPattern = function reinterpretAsPattern (context, node) {
        var this$1 = this;

    switch (node.type) {
        case 'Identifier':
            if (context & 512 /* InArrowParameterList */) {
                this.addFunctionArg(node.name);
            }
            if (context & 2 /* Strict */ && this.isEvalOrArguments(node.name)) {
                this.error(81 /* InvalidBindingStrictMode */, node.name);
            }
            return;
        case 'ObjectExpression':
            if (this.flags & 16384 /* ParenthesizedPattern */) {
                this.error(65 /* InvalidParenthesizedPattern */);
            }
            node.type = 'ObjectPattern';
        // falls through
        case 'ObjectPattern':
            // ObjectPattern and ObjectExpression are isomorphic
            for (var i = 0; i < node.properties.length; i++) {
                this$1.reinterpretAsPattern(context, node.properties[i]);
            }
            return;
        case 'ArrayExpression':
            if (this.flags & 16384 /* ParenthesizedPattern */) {
                this.error(65 /* InvalidParenthesizedPattern */);
            }
            node.type = 'ArrayPattern';
        // falls through
        case 'ArrayPattern':
            for (var i$1 = 0; i$1 < node.elements.length; ++i$1) {
                // skip holes in pattern
                if (node.elements[i$1] !== null)
                    { this$1.reinterpretAsPattern(context, node.elements[i$1]); }
            }
            return;
        case 'Property':
            return this.reinterpretAsPattern(context, node.value);
        case 'SpreadElement':
            node.type = 'RestElement';
        // Fall through
        case 'RestElement':
            this.reinterpretAsPattern(context, node.argument);
            if (node.argument.type === 'AssignmentPattern')
                { this.error(105 /* InvalidRestDefaultValue */); }
            return;
        case 'AssignmentExpression':
            if (node.operator !== '=')
                { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
            node.type = 'AssignmentPattern';
            delete node.operator; // operator is not relevant for assignment pattern
        // Fall through
        case 'AssignmentPattern':
            this.reinterpretAsPattern(context, node.left);
            return;
        case 'MemberExpression':
        case 'MetaProperty':
            if (!(context & 512 /* InArrowParameterList */))
                { return; }
        // Fall through
        default:
            this.error(109 /* InvalidDestructuringTarget */);
    }
};
Parser.prototype.parseArrowFunctionExpression = function parseArrowFunctionExpression (context, pos, params) {
        var this$1 = this;

    // A line terminator between ArrowParameters and the => should trigger a SyntaxError.
    if (this.flags & 1 /* LineTerminator */)
        { this.error(62 /* LineBreakAfterAsync */); }
    this.expect(context, 10 /* Arrow */);
    // Unsetting the 'AllowCall' mask here, let the parser fail correctly
    // if a non-simple arrow are followed by a call expression.
    //
    //  (a) => {}()
    //
    if (this.flags & 8 /* AllowCall */)
        { this.flags &= ~8 /* AllowCall */; }
    var functionScope = this.functionScope;
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    this.functionScope = undefined;
    this.blockScope = undefined;
    this.parentScope = undefined;
    // A 'simple arrow' is just a plain identifier and doesn't have any param list.
    if (!(context & 8 /* Arrow */)) {
        for (var i in params)
            { this$1.reinterpretAsPattern(context | 512 /* InArrowParameterList */, params[i]); }
    }
    var body;
    var expression = false;
    // Unset the necessary masks
    context &= ~(64 /* InParenthesis */ | 16 /* Yield */) | 4 /* AllowIn */;
    if (!(this.flags & 4 /* InFunctionBody */))
        { context |= 1024 /* Declaration */; }
    if (this.token === 393228 /* LeftBrace */) {
        body = this.parseFunctionBody(context | 8 /* Arrow */);
    }
    else {
        if (context & 4194304 /* ClassFields */ && this.isEvalOrArguments(this.tokenValue)) {
            this.error(73 /* UnexpectedStrictReserved */);
        }
        body = this.parseAssignmentExpression(context);
        expression = true;
    }
    this.functionScope = functionScope;
    this.blockScope = blockScope;
    this.parentScope = parentScope;
    return this.finishNode(context, pos, {
        type: 'ArrowFunctionExpression',
        body: body,
        params: params,
        id: null,
        async: (context & 32 /* Await */) !== 0,
        generator: (context & 16 /* Yield */) !== 0,
        expression: expression
    });
};
Parser.prototype.parseConditionalExpression = function parseConditionalExpression (context, pos) {
    var expr = this.parseBinaryExpression(context, 0, pos);
    if (!this.parseOptional(context, 22 /* QuestionMark */))
        { return expr; }
    var consequent = this.parseAssignmentExpression(context | 4 /* AllowIn */);
    this.expect(context, 21 /* Colon */);
    if (context & 4194304 /* ClassFields */ && this.isEvalOrArguments(this.tokenValue)) {
        this.error(73 /* UnexpectedStrictReserved */);
    }
    var alternate = this.parseAssignmentExpression(context);
    return this.finishNode(context, pos, {
        type: 'ConditionalExpression',
        test: expr,
        consequent: consequent,
        alternate: alternate
    });
};
Parser.prototype.parseBinaryExpression = function parseBinaryExpression (context, minPrec, pos, expr) {
        var this$1 = this;
        if ( expr === void 0 ) expr = this.parseUnaryExpression(context);

    var bit = context & 4;
    while (hasMask(this.token, 2097152 /* BinaryOperator */)) {
        var t = this$1.token;
        var prec = t & 3840;
        var delta = (t === 2100022 /* Exponentiate */) << 8;
        if (!bit && this$1.token === 2111281 /* InKeyword */)
            { break; }
        if (prec + delta <= minPrec)
            { break; }
        this$1.nextToken(context);
        expr = this$1.finishNode(context, pos, {
            type: t & 33554432 /* IsLogical */ ? 'LogicalExpression' : 'BinaryExpression',
            left: expr,
            right: this$1.parseBinaryExpression(context, prec, this$1.getLocations()),
            operator: tokenDesc(t)
        });
    }
    return expr;
};
// 12.5 Unary Operators
Parser.prototype.isPrivateName = function isPrivateName (expr) {
    return expr.property && expr.property.type === 'PrivateName';
};
Parser.prototype.parseUnaryExpression = function parseUnaryExpression (context) {
    var pos = this.getLocations();
    var t = this.token;
    if (t & 1073741824 /* IsAwait */ && context & 32 /* Await */) {
        return this.parseAwaitExpression(context, pos);
    }
    if (hasMask(t, 4456448 /* UnaryOperator */)) {
        t = this.token;
        this.nextToken(context);
        var argument = this.parseUnaryExpression(context);
        if (this.token === 2100022 /* Exponentiate */)
            { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
        if (context & 4194304 /* ClassFields */ &&
            t === 4468778 /* TypeofKeyword */ &&
            this.isEvalOrArguments(this.tokenValue)) {
            this.error(0 /* Unexpected */);
        }
        if (context & 2 /* Strict */ && t === 4468779 /* DeleteKeyword */) {
            if (argument.type === 'Identifier' || (this.flags & 33554432 /* OptionsNext */ &&
                !(context & 1 /* Module */) && this.isPrivateName(argument))) {
                this.error(44 /* StrictDelete */);
            }
        }
        return this.finishNode(context, pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(t),
            argument: argument,
            prefix: true
        });
    }
    return this.parseUpdateExpression(context, pos);
};
Parser.prototype.parseAwaitExpression = function parseAwaitExpression (context, pos) {
    if (this.flags & 2 /* ExtendedUnicodeEscape */)
        { this.error(63 /* UnexpectedEscapedKeyword */); }
    this.expect(context, 1074073709 /* AwaitKeyword */);
    return this.finishNode(context, pos, {
        type: 'AwaitExpression',
        argument: this.parseUnaryExpression(context)
    });
};
Parser.prototype.parseUpdateExpression = function parseUpdateExpression (context, pos) {
    var expr;
    var hasPrefix;
    var t = this.token;
    if (hasMask(t, 786432 /* UpdateOperator */)) {
        this.nextToken(context);
        hasPrefix = true;
    }
    expr = this.parseLeftHandSideExpression(context, pos);
    if (!hasPrefix) {
        if (hasMask(this.token, 786432 /* UpdateOperator */) && !(this.flags & 1 /* LineTerminator */)) {
            t = this.token;
            this.nextToken(context);
        }
        else
            { return expr; }
    }
    if (context & 2 /* Strict */ && this.isEvalOrArguments(expr.name)) {
        this.error(hasPrefix ? 45 /* StrictLHSPrefix */ : 46 /* StrictLHSPostfix */);
    }
    if (!isValidSimpleAssignmentTarget(expr)) {
        this.error(hasPrefix ? 108 /* InvalidLhsInPrefixOp */ : 107 /* InvalidLhsInPostfixOp */);
    }
    return this.finishNode(context, pos, {
        type: 'UpdateExpression',
        argument: expr,
        operator: tokenDesc(t),
        prefix: !!hasPrefix
    });
};
Parser.prototype.parseSuper = function parseSuper (context) {
    var pos = this.getLocations();
    this.expect(context, 274524 /* SuperKeyword */);
    switch (this.token) {
        // '('
        case 262155 /* LeftParen */:
            // The super property has to be within a class constructor
            if (!(context & 131072 /* AllowConstructor */))
                { this.error(57 /* BadSuperCall */); }
            break;
        // '.'
        case 13 /* Period */:
            if (!(context & 32768 /* Method */))
                { this.error(57 /* BadSuperCall */); }
            break;
        // '['
        case 393235 /* LeftBracket */:
            if (!(context & 32768 /* Method */))
                { this.error(57 /* BadSuperCall */); }
            break;
        default:
            this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
    }
    return this.finishNode(context, pos, {
        type: 'Super'
    });
};
Parser.prototype.parseImportCall = function parseImportCall (context, pos) {
    var id = this.parseIdentifier(context);
    switch (this.token) {
        // Import.meta - Stage 3 proposal
        case 13 /* Period */:
            if (!(context & 1 /* Module */))
                { this.error(0 /* Unexpected */); }
            this.expect(context, 13 /* Period */);
            if (this.tokenValue !== 'meta')
                { this.error(0 /* Unexpected */); }
            return this.parseMetaProperty(context, id, pos);
        default:
            return this.finishNode(context, pos, {
                type: 'Import'
            });
    }
};
// 12.3 Left-Hand-Side Expressions
Parser.prototype.parseLeftHandSideExpression = function parseLeftHandSideExpression (context, pos) {
    // LeftHandSideExpression[Yield]:
    // NewExpression[?Yield]
    // CallExpression[?Yield]
    var expr;
    switch (this.token) {
        // 'super'
        case 274524 /* SuperKeyword */:
            expr = this.parseSuper(context);
            break;
        // 'import'
        case 274521 /* ImportKeyword */:
            if (!(this.flags & 33554432 /* OptionsNext */)) {
                this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
            }
            context |= 8192 /* Import */;
            expr = this.parseImportCall(context | 4 /* AllowIn */, pos);
            break;
        default:
            expr = this.parseMemberExpression(context | 4 /* AllowIn */, pos);
    }
    if (!(this.flags & 8 /* AllowCall */) && expr.type === 'ArrowFunctionExpression') {
        return expr;
    }
    return this.parseCallExpression(context | 4 /* AllowIn */, pos, expr);
};
Parser.prototype.parseMemberExpression = function parseMemberExpression (context, pos, expr) {
        var this$1 = this;
        if ( expr === void 0 ) expr = this.parsePrimaryExpression(context, pos);

    while (true) {
        switch (this$1.token) {
            // '.'
            case 13 /* Period */:
                {
                    this$1.expect(context, 13 /* Period */);
                    var property = context & 32768 /* Method */ && this$1.flags & 33554432 /* OptionsNext */ && this$1.token === 117 /* Hash */ ?
                        this$1.parsePrivateName(context) : this$1.parseIdentifierName(context, this$1.token);
                    expr = this$1.finishNode(context, pos, {
                        type: 'MemberExpression',
                        object: expr,
                        computed: false,
                        property: property,
                    });
                    break;
                }
            // '['
            case 393235 /* LeftBracket */:
                {
                    this$1.expect(context, 393235 /* LeftBracket */);
                    var start = this$1.getLocations();
                    var property$1 = this$1.parseExpression(context | 4 /* AllowIn */, start);
                    this$1.expect(context, 20 /* RightBracket */);
                    expr = this$1.finishNode(context, pos, {
                        type: 'MemberExpression',
                        object: expr,
                        computed: true,
                        property: property$1,
                    });
                    break;
                }
            case 262152 /* TemplateCont */:
            case 262153 /* TemplateTail */:
                {
                    var quasiStart = this$1.getLocations();
                    var quasi = this$1.token === 262152 /* TemplateCont */ ?
                        this$1.parseTemplate(context | 1048576 /* TaggedTemplate */, quasiStart) : this$1.parseTemplateLiteral(context | 1048576 /* TaggedTemplate */, quasiStart);
                    expr = this$1.parseTaggedTemplateExpression(context, expr, quasi, pos);
                    break;
                }
            default:
                return expr;
        }
    }
};
Parser.prototype.parseCallExpression = function parseCallExpression (context, pos, expr) {
        var this$1 = this;

    while (true) {
        expr = this$1.parseMemberExpression(context, pos, expr);
        if (this$1.token !== 262155 /* LeftParen */)
            { return expr; }
        var args = this$1.parseArguments(context);
        if (context & 8192 /* Import */ && args.length !== 1 &&
            expr.type === 'Import')
            { this$1.error(14 /* BadImportCallArity */); }
        expr = this$1.finishNode(context, pos, {
            type: 'CallExpression',
            callee: expr,
            arguments: args
        });
    }
};
Parser.prototype.parseFunctionDeclaration = function parseFunctionDeclaration (context) {
    var prevContext = context;
    return this.parseFunction(context & ~(16 /* Yield */ | 32 /* Await */), prevContext);
};
Parser.prototype.parseFunctionExpression = function parseFunctionExpression (context) {
    return this.parseFunction(context & ~16 /* Yield */);
};
Parser.prototype.parseFunction = function parseFunction (context, prevContext /* None */) {
        if ( prevContext === void 0 ) prevContext = 0;

    var pos = this.getLocations();
    var t = this.token;
    // Unset masks Object / Class Method, and disallow class constructors in this context
    context &= ~(32768 /* Method */ | 131072 /* AllowConstructor */);
    if (t & 134217728 /* IsAsync */) {
        if (this.flags & 2 /* ExtendedUnicodeEscape */) {
            this.error(63 /* UnexpectedEscapedKeyword */);
        }
        this.expect(context, 151064684 /* AsyncKeyword */);
        context |= 32 /* Await */;
    }
    this.expect(context, 274519 /* FunctionKeyword */);
    t = this.token;
    if (t & 268435456 /* IsGenerator */) {
        if (context & 4096 /* AnnexB */) {
            this.error(87 /* ForbiddenAsStatement */, tokenDesc(t));
        }
        if (context & 32 /* Await */ && !(this.flags & 33554432 /* OptionsNext */)) {
            this.error(88 /* InvalidAsyncGenerator */);
        }
        this.expect(context, 270535219 /* Multiply */);
        context |= 16 /* Yield */;
    }
    var id = null;
    t = this.token;
    if (t !== 262155 /* LeftParen */) {
        if (this.isIdentifier(context, t)) {
            if (this.isEvalOrArguments(this.tokenValue)) {
                if (context & 2 /* Strict */)
                    { this.error(35 /* StrictLHSAssignment */); }
                this.errorLocation = this.getLocations();
                context |= 67108864 /* StrictReserved */;
            }
            if (context & (8388608 /* Expression */ | 4096 /* AnnexB */)) {
                if ((context & 32 /* Await */ && t & 1073741824 /* IsAwait */) ||
                    (context & 16 /* Yield */ && t & 536870912 /* IsYield */)) {
                    this.error(75 /* DisallowedInContext */, tokenDesc(t));
                }
                id = this.parseIdentifier(context);
            }
            else {
                if ((prevContext & 32 /* Await */ && t & 1073741824 /* IsAwait */) ||
                    (prevContext & 16 /* Yield */ && t & 536870912 /* IsYield */)) {
                    this.error(75 /* DisallowedInContext */, tokenDesc(t));
                }
                if (context & 1024 /* Declaration */) {
                    var name = this.tokenValue;
                    if (!this.initBlockScope() && name in this.blockScope &&
                        (this.blockScope[name] & 1 /* Shadowable */ ||
                            this.blockScope !== this.functionScope)) {
                        this.error(67 /* DuplicateBinding */, name);
                    }
                    this.blockScope[name] = 1 /* Shadowable */;
                }
                id = this.parseBindingIdentifier(context);
            }
        }
        else {
            this.error(1 /* UnexpectedToken */, tokenDesc(t));
        }
    }
    else if (!(context & (8388608 /* Expression */ | 16384 /* Optional */))) {
        this.error(79 /* UnNamedFunctionStmt */);
    }
    var functionScope = this.functionScope;
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    this.functionScope = undefined;
    this.blockScope = undefined;
    this.parentScope = undefined;
    var params = this.parseParameterList(context | 128 /* InParameter */, 0 /* None */);
    var body = this.parseFunctionBody(context & ~8388608 /* Expression */);
    this.functionScope = functionScope;
    this.blockScope = blockScope;
    this.parentScope = parentScope;
    return this.finishNode(context, pos, {
        type: (context & 8388608 /* Expression */) !== 0 ? 'FunctionExpression' : 'FunctionDeclaration',
        params: params,
        body: body,
        async: (context & 32 /* Await */) !== 0,
        generator: (context & 16 /* Yield */) !== 0,
        expression: false,
        id: id
    });
};
Parser.prototype.parseParameterList = function parseParameterList (context, state) {
        var this$1 = this;

    this.expect(context, 262155 /* LeftParen */);
    var result = [];
    this.flags &= ~8192 /* SimpleParameterList */;
    while (this.token !== 16 /* RightParen */) {
        if (this$1.token === 14 /* Ellipsis */) {
            this$1.errorLocation = this$1.getLocations();
            this$1.flags |= 8192 /* SimpleParameterList */;
            if (state & 32 /* Set */)
                { this$1.error(25 /* BadSetterRestParameter */); }
            this$1.parseOptional(context, 18 /* Comma */);
            result.push(this$1.parseRestElement(context));
            break; // rest parameter must be the last
        }
        if (!(context & 2 /* Strict */) && !(this$1.token & 67108864 /* IsIdentifier */))
            { context |= 16777216 /* Pattern */; }
        result.push(this$1.parseFormalParameters(context));
        if (this$1.token !== 16 /* RightParen */)
            { this$1.expect(context, 18 /* Comma */); }
    }
    if (state & 16 /* Get */ && result.length > 0)
        { this.error(23 /* BadGetterArity */); }
    if (state & 32 /* Set */ && result.length !== 1)
        { this.error(24 /* BadSetterArity */); }
    this.expect(context, 16 /* RightParen */);
    return result;
};
Parser.prototype.parseFormalParameters = function parseFormalParameters (context) {
    var pos = this.getLocations();
    // Handle non-identifiers; Default values and destructuring
    if (!(this.token & 67108864 /* IsIdentifier */)) {
        this.errorLocation = pos;
        this.flags |= 8192 /* SimpleParameterList */;
    }
    else if (this.isEvalOrArguments(this.tokenValue)) {
        if (context & 2 /* Strict */)
            { this.error(35 /* StrictLHSAssignment */); }
        this.errorLocation = pos;
        this.flags |= 1024 /* Binding */;
    }
    var left = this.parseBindingIdentifierOrPattern(context);
    if (this.token !== 1310749 /* Assign */)
        { return left; }
    this.expect(context, 1310749 /* Assign */);
    if (this.token & (536870912 /* IsYield */ | 1073741824 /* IsAwait */) && context & (16 /* Yield */ | 32 /* Await */)) {
        this.error(75 /* DisallowedInContext */, tokenDesc(this.token));
    }
    this.flags |= 8192 /* SimpleParameterList */;
    return this.finishNode(context, pos, {
        type: 'AssignmentPattern',
        left: left,
        right: this.parseAssignmentExpression(context)
    });
};
Parser.prototype.parseAsyncFunctionExpression = function parseAsyncFunctionExpression (context, pos) {
    var hasEscape = (this.flags & 2 /* ExtendedUnicodeEscape */) !== 0;
    // Valid: `(\u0061sync ())`
    if (hasEscape && !(context & 64 /* InParenthesis */)) {
        this.error(0 /* Unexpected */);
    }
    var id = this.parseIdentifier(context);
    var flags = this.flags |= 8192;
    switch (this.token) {
        case 537153642 /* YieldKeyword */:
        case 67371009 /* Identifier */:
            // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
            // we got an LineTerminator. The 'ArrowFunctionExpression' will be parsed out in 'parseAssignmentExpression'
            if (this.flags & 1 /* LineTerminator */)
                { return id; }
            var expr = this.parseIdentifier(context);
            if (this.token === 10 /* Arrow */)
                { return this.parseArrowFunctionExpression(context & ~16 /* Yield */ | 4 /* AllowIn */ | 32 /* Await */, pos, [expr]); }
            // Invalid: 'async abc'
            this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
        // CoverCallExpressionAndAsyncArrowHead[Yield, Await]:
        case 262155 /* LeftParen */:
            // This could be either a CallExpression or the head of an async arrow function
            return this.parseAsyncArguments(context & ~16 /* Yield */ | 4 /* AllowIn */, pos, id, flags, hasEscape);
        default:
            // Async as Identifier
            return id;
    }
};
Parser.prototype.parseAsyncArguments = function parseAsyncArguments (context, pos, id, flags, hasEscape) {
        var this$1 = this;

    // Modified ArgumentList production to deal with async stuff. This so we can
    // speed up the "normal" CallExpression production. This also deal with the
    // CoverCallExpressionAndAsyncArrowHead production directly
    // J.K. Thomas
    this.expect(context, 262155 /* LeftParen */);
    var args = [];
    var state = 0;
    while (this.token !== 16 /* RightParen */) {
        if (this$1.token === 14 /* Ellipsis */) {
            var elem = this$1.parseSpreadExpression(context);
            // Trailing comma in async arrow param list
            if (this$1.token === 18 /* Comma */) {
                state |= 8 /* Trailing */;
                this$1.errorLocation = this$1.errorLocation = this$1.getLocations();
            }
            args.push(elem);
        }
        else {
            if (context & 2 /* Strict */) {
                if (!(state & 1 /* EvalOrArg */) && this$1.isEvalOrArguments(this$1.tokenValue)) {
                    this$1.errorLocation = this$1.errorLocation = this$1.getLocations();
                    state |= 1 /* EvalOrArg */;
                }
            }
            if (this$1.token & 1073741824 /* IsAwait */ && !(state & 2 /* Await */)) {
                this$1.errorLocation = this$1.getLocations();
                state |= 2 /* Await */;
            }
            if (!(state & 4 /* Parenthesized */) && this$1.token === 262155 /* LeftParen */) {
                this$1.errorLocation = this$1.getLocations();
                state |= 4 /* Parenthesized */;
            }
            args.push(this$1.parseAssignmentExpression(context | 256 /* InAsyncArgs */));
        }
        if (this$1.token === 16 /* RightParen */)
            { break; }
        this$1.expect(context, 18 /* Comma */);
        if (this$1.token === 16 /* RightParen */)
            { break; }
    }
    this.expect(context, 16 /* RightParen */);
    if (this.token === 10 /* Arrow */) {
        if (hasEscape)
            { this.error(63 /* UnexpectedEscapedKeyword */); }
        // async arrows cannot have a line terminator between "async" and the formals
        if (flags & 1 /* LineTerminator */)
            { this.error(62 /* LineBreakAfterAsync */); }
        if (this.flags & 256 /* Await */)
            { this.error(90 /* InvalidAwaitInArrowParam */); }
        if (state & 1 /* EvalOrArg */)
            { this.error(74 /* StrictParamName */); }
        if (state & 4 /* Parenthesized */)
            { this.error(65 /* InvalidParenthesizedPattern */); }
        if (state & 8 /* Trailing */)
            { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
        return this.parseArrowFunctionExpression(context | 32 /* Await */, pos, args);
    }
    // We are done, so unset the bitmask
    this.flags &= ~256 /* Await */;
    this.errorLocation = undefined;
    return this.finishNode(context, pos, {
        type: 'CallExpression',
        callee: id,
        arguments: args
    });
};
Parser.prototype.parseFunctionBody = function parseFunctionBody (context) {
    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    var body = [];
    if (this.token !== 15 /* RightBrace */) {
        var previousLabelSet = this.labelSet;
        this.labelSet = undefined;
        var savedFlags = this.flags;
        this.flags |= 4 /* InFunctionBody */;
        this.flags &= ~(16 /* AllowBreak */ | 32 /* AllowContinue */);
        body = this.parseStatementList(context & ~805306368 /* Lexical */, 15 /* RightBrace */);
        this.labelSet = previousLabelSet;
        this.flags = savedFlags;
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(context, pos, {
        type: 'BlockStatement',
        body: body
    });
};
Parser.prototype.parseSpreadExpression = function parseSpreadExpression (context, pos) {
        if ( pos === void 0 ) pos = this.getLocations();

    var t = this.token;
    // Disallow SpreadElement inside dynamic import
    if (context & 8192 /* Import */) {
        this.error(1 /* UnexpectedToken */, tokenDesc(t));
    }
    this.expect(context, 14 /* Ellipsis */);
    var arg = this.parseAssignmentExpression(context);
    // Object rest element needs to be the last AssignmenProperty in
    // ObjectAssignmentPattern. (For..in / of statement)
    if (context & 262144 /* ForStatement */ &&
        this.token === 18 /* Comma */) {
        this.error(1 /* UnexpectedToken */, tokenDesc(t));
    }
    return this.finishNode(context, pos, {
        type: 'SpreadElement',
        argument: arg
    });
};
Parser.prototype.parseArguments = function parseArguments (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 262155 /* LeftParen */);
    var args = [];
    while (this.token !== 16 /* RightParen */) {
        var expr = this$1.token === 14 /* Ellipsis */ ? this$1.parseSpreadExpression(context) :
            this$1.parseAssignmentExpression(context);
        args.push(expr);
        if (this$1.token !== 16 /* RightParen */)
            { this$1.expect(context, 18 /* Comma */); }
    }
    this.expect(context, 16 /* RightParen */);
    return args;
};
Parser.prototype.parseMetaProperty = function parseMetaProperty (context, meta, pos) {
    return this.finishNode(context, pos, {
        meta: meta,
        type: 'MetaProperty',
        property: this.parseIdentifier(context)
    });
};
Parser.prototype.parseNewExpression = function parseNewExpression (context) {
    var pos = this.getLocations();
    // The `new` keyword must not contain Unicode escape sequences.
    if (this.flags & 2 /* ExtendedUnicodeEscape */)
        { this.error(63 /* UnexpectedEscapedKeyword */); }
    var id = this.parseIdentifierName(context, this.token);
    // The `target` contextual keyword must not contain Unicode escape sequences.
    if (this.parseOptional(context | 33554432 /* ValidateEscape */, 13 /* Period */)) {
        if (this.token & 67108864 /* IsIdentifier */) {
            if (this.tokenValue !== 'target')
                { this.error(29 /* MetaNotInFunctionBody */); }
            if (!(context & 128 /* InParameter */)) {
                // An ArrowFunction in global code may not contain `new.target`
                if (context & 8 /* Arrow */ && context & 1024 /* Declaration */) {
                    this.error(100 /* NewTargetArrow */);
                }
                if (!(this.flags & 4 /* InFunctionBody */))
                    { this.error(29 /* MetaNotInFunctionBody */); }
            }
        }
        return this.parseMetaProperty(context, id, pos);
    }
    return this.finishNode(context, pos, {
        type: 'NewExpression',
        callee: this.parseMemberExpression(context, pos),
        arguments: this.token === 262155 /* LeftParen */ ? this.parseArguments(context) : []
    });
};
Parser.prototype.parsePrimaryExpression = function parsePrimaryExpression (context, pos) {
    switch (this.token) {
        case 262146 /* NumericLiteral */:
        case 262147 /* StringLiteral */:
            return this.parseLiteral(context);
        case 119 /* BigInt */:
            return this.parseBigIntLiteral(context, pos);
        case 67371009 /* Identifier */:
            return this.parseIdentifier(context);
        case 274519 /* FunctionKeyword */:
            return this.parseFunctionExpression(context | 8388608 /* Expression */);
        case 274526 /* ThisKeyword */:
            return this.parseThisExpression(context);
        case 274439 /* NullKeyword */:
        case 274438 /* TrueKeyword */:
        case 274437 /* FalseKeyword */:
            return this.parseNullOrTrueOrFalseExpression(context, pos);
        case 262155 /* LeftParen */:
            return this.parseParenthesizedExpression(context | 64 /* InParenthesis */ | 4 /* AllowIn */, pos);
        case 393235 /* LeftBracket */:
            return this.parseArrayInitializer(context);
        case 274522 /* NewKeyword */:
            return this.parseNewExpression(context);
        case 274524 /* SuperKeyword */:
            return this.parseSuper(context);
        case 274509 /* ClassKeyword */:
            return this.parseClassExpression(context | 8388608 /* Expression */);
        case 393228 /* LeftBrace */:
            return this.parseObjectExpression(context);
        case 262153 /* TemplateTail */:
            return this.parseTemplateLiteral(context, pos);
        case 262152 /* TemplateCont */:
            return this.parseTemplate(context, pos);
        case 2361909 /* Divide */:
        case 1310757 /* DivideAssign */:
            return this.parseRegularExpression(context);
        case 151064684 /* AsyncKeyword */:
            if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                return this.parseFunctionExpression(context | 32 /* Await */ | 8388608 /* Expression */);
            }
            return this.parseAsyncFunctionExpression(context, pos);
        case 12383 /* ThrowKeyword */:
            return this.parseThrowExpression(context, pos);
        case 1074073709 /* AwaitKeyword */:
            if (context & 256 /* InAsyncArgs */) {
                this.flags |= 256 /* Await */;
                this.errorLocation = this.getLocations();
            }
            if (context & 1 /* Module */)
                { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
            return this.parseIdentifier(context);
        case 8671304 /* LetKeyword */:
            return this.parseLet(context);
        case 2361151 /* LessThan */:
            if (this.flags & 8388608 /* OptionsJSX */)
                { return this.parseJSXElement(context | 8388608 /* Expression */); }
        case 117 /* Hash */:
            if (context & 32768 /* Method */ && this.flags & 33554432 /* OptionsNext */)
                { return this.parsePrivateName(context); }
        // falls through
        case 537153642 /* YieldKeyword */:
            if (context & 16 /* Yield */)
                { this.error(75 /* DisallowedInContext */, tokenDesc(this.token)); }
        // falls through
        default:
            if (!this.isIdentifier(context, this.token))
                { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
            return this.parseIdentifier(context);
    }
};
Parser.prototype.parseLet = function parseLet (context) {
    var name = this.tokenValue;
    var pos = this.getLocations();
    var flag = this.flags;
    // 'let' must not be in expression position in strict mode
    if (context & 2 /* Strict */)
        { this.error(80 /* InvalidStrictExpPostion */, tokenDesc(this.token)); }
    this.expect(context, 8671304 /* LetKeyword */);
    switch (this.token) {
        case 8671304 /* LetKeyword */:
            this.error(80 /* InvalidStrictExpPostion */, tokenDesc(this.token));
        case 393235 /* LeftBracket */:
            {
                if (this.flags & 1 /* LineTerminator */) {
                    // Note: ExpressionStatement has a lookahead restriction for `let [`.
                    this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
                }
            }
    }
    return this.finishNode(context, pos, {
        type: 'Identifier',
        name: name
    });
};
Parser.prototype.validateClassFields = function validateClassFields () {
        var this$1 = this;

    if (this.fieldSet !== undefined) {
        var scope;
        var method;
        var key;
        for (var i = 0; i < this.fieldSet.length; i++) {
            key = this$1.fieldSet[i].key;
            var mask = this$1.fieldSet[i].mask;
            if (mask & 1 /* Method */) {
                if (method === undefined)
                    { method = {}; }
                method[key] = mask;
            }
            if (mask & 2 /* Scope */) {
                if (scope === undefined)
                    { scope = {}; }
                else if (scope[key])
                    { this$1.error(67 /* DuplicateBinding */, '#' + key); }
                scope[key] = true;
            }
        }
        if (method !== undefined && method[key] & 1 /* Method */) {
            if (!scope || !scope[key])
                { this.error(101 /* UndefinedInClassScope */, '#' + key); }
        }
        this.fieldSet = undefined;
    }
};
Parser.prototype.parseClassDeclaration = function parseClassDeclaration (context) {
    var pos = this.getLocations();
    var id = null;
    this.expect(context, 274509 /* ClassKeyword */);
    if (this.isIdentifier(context, this.token)) {
        var name = this.tokenValue;
        this.checkIfExistInFunctionScope(name);
        this.blockScope[name] = 1 /* Shadowable */;
        id = this.parseBindingIdentifier(context);
    }
    else if (!(context & 16384 /* Optional */))
        { this.error(78 /* UnNamedClassStmt */); }
    return this.parseClassTail(context, id, pos);
};
Parser.prototype.parseClassExpression = function parseClassExpression (context) {
    var pos = this.getLocations();
    this.expect(context, 274509 /* ClassKeyword */);
    var id = null;
    if (this.isIdentifier(context, this.token)) {
        id = this.parseBindingIdentifier(context);
    }
    return this.parseClassTail(context, id, pos);
};
Parser.prototype.parseClassTail = function parseClassTail (context, id, pos) {
    var superClass = null;
    var flags = 0;
    if (this.parseOptional(context, 12372 /* ExtendsKeyword */)) {
        superClass = this.parseLeftHandSideExpression(context & ~16384 /* Optional */ | 2 /* Strict */, pos);
        flags |= 256 /* Heritage */;
    }
    if (this.flags & 33554432 /* OptionsNext */ && !(context & 32768 /* Method */))
        { this.fieldSet = undefined; }
    var body = this.parseClassBody(context | 2 /* Strict */, flags);
    if (this.flags & 33554432 /* OptionsNext */)
        { this.validateClassFields(); }
    return this.finishNode(context, pos, {
        type: context & 8388608 /* Expression */ ? 'ClassExpression' : 'ClassDeclaration',
        id: id,
        superClass: superClass,
        body: body
    });
};
Parser.prototype.parseClassElementList = function parseClassElementList (context, flags) {
        var this$1 = this;

    var body = [];
    while (this.token !== 15 /* RightBrace */) {
        if (!this$1.parseOptional(context, 17 /* Semicolon */)) {
            var node = this$1.parseClassElement(context, flags);
            body.push(node);
            if (node.kind === 'constructor')
                { context |= 65536 /* HasConstructor */; }
        }
    }
    return body;
};
Parser.prototype.parseClassBody = function parseClassBody (context, flags) {
    var pos = this.getLocations();
    this.expect(context | 33554432 /* ValidateEscape */, 393228 /* LeftBrace */);
    var body = [];
    if (this.token !== 15 /* RightBrace */)
        { body = this.parseClassElementList(context, flags); }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(context, pos, {
        type: 'ClassBody',
        body: body
    });
};
Parser.prototype.parsePrivateProperty = function parsePrivateProperty (context, key) {
    var pos = this.getLocations();
    var value = this.parseOptional(context, 1310749 /* Assign */) ? this.parseAssignmentExpression(context) : null;
    // Syntax error if `arguments` or `eval` used in class field
    if (this.isEvalOrArguments(this.tokenValue)) {
        this.error(70 /* UnexpectedReservedWord */);
    }
    this.parseOptional(context, 18 /* Comma */);
    return this.finishNode(context, pos, {
        type: 'ClassProperty',
        key: key,
        value: value,
    });
};
Parser.prototype.parseClassPrivateProperty = function parseClassPrivateProperty (context, state, pos) {
        if ( pos === void 0 ) pos = this.getLocations();

    this.expect(context, 117 /* Hash */);
    var tokenValue = this.tokenValue;
    // It is a Syntax Error if StringValue of PrivateName is "#constructor"
    if (this.token === 69742 /* ConstructorKeyword */) {
        this.error(103 /* InvalidFieldConstructor */);
    }
    // Note: The grammar only supports `#` + IdentifierName
    var key = this.parseIdentifierName(context, this.token);
    var value = null;
    if (this.fieldSet === undefined) {
        this.errorLocation = pos;
        this.fieldSet = [];
    }
    this.fieldSet.push({
        key: tokenValue,
        mask: 2 /* Scope */
    });
    if (this.parseOptional(context, 1310749 /* Assign */)) {
        if (this.isEvalOrArguments(this.tokenValue)) {
            this.error(70 /* UnexpectedReservedWord */);
        }
        value = this.parseAssignmentExpression(context | 4194304 /* ClassFields */);
    }
    this.parseOptional(context, 18 /* Comma */);
    return this.finishNode(context, pos, {
        type: 'PrivateProperty',
        key: key,
        value: value,
        static: (state & 512 /* Static */) !== 0
    });
};
Parser.prototype.parsePrivateName = function parsePrivateName (context) {
    var pos = this.getLocations();
    this.expect(context, 117 /* Hash */);
    if (this.fieldSet === undefined) {
        this.errorLocation = pos;
        this.fieldSet = [];
    }
    this.fieldSet.push({
        key: this.tokenValue,
        mask: 1 /* Method */
    });
    return this.finishNode(context, pos, {
        type: 'PrivateName',
        id: this.parseIdentifierName(context, this.token),
    });
};
Parser.prototype.parseClassElement = function parseClassElement (context, state) {
        var this$1 = this;

    var pos = this.getLocations();
    if (!(context & 1 /* Module */) &&
        this.flags & 33554432 /* OptionsNext */ && this.token === 117 /* Hash */) {
        return this.parseClassPrivateProperty(context | 4 /* AllowIn */, state, pos);
    }
    var t = this.token;
    var modifierState = 0;
    var count = 0;
    var key;
    var value;
    loop: while (t & (67108864 /* IsIdentifier */ | 4096 /* Keyword */)) {
        switch (this$1.token) {
            case 16797801 /* StaticKeyword */:
                state |= modifierState = 512 /* Static */;
                key = this$1.parseIdentifier(context);
                count++;
                break;
            case 16846959 /* GetKeyword */:
                if (state & 48 /* Accessors */)
                    { break loop; }
                if (state & 2 /* Async */)
                    { break loop; }
                state |= modifierState = 16 /* Get */;
                key = this$1.parseIdentifier(context);
                count++;
                break;
            case 16846960 /* SetKeyword */:
                if (state & 2 /* Async */)
                    { break loop; }
                state |= modifierState = 32 /* Set */;
                key = this$1.parseIdentifier(context);
                count++;
                break;
            case 151064684 /* AsyncKeyword */:
                if (this$1.flags & 2 /* ExtendedUnicodeEscape */) {
                    this$1.error(6 /* InvalidUnicodeEscapeSequence */);
                }
                if (state & 48 /* Accessors */)
                    { break loop; }
                state |= modifierState = 2 /* Async */;
                key = this$1.parseIdentifier(context);
                count++;
                break;
            default:
                break loop;
        }
    }
    t = this.token;
    // Generator / Async Iterations ( Stage 3 proposal)
    if (t & 268435456 /* IsGenerator */) {
        if (state & 2 /* Async */ &&
            !(this.flags & 33554432 /* OptionsNext */)) {
            this.error(88 /* InvalidAsyncGenerator */);
        }
        state |= modifierState = 1 /* Yield */;
        this.expect(context, 270535219 /* Multiply */);
        count++;
    }
    t = this.token;
    var tokenValue = this.tokenValue;
    if (tokenValue === 'prototype') {
        state |= 4096 /* Prototype */;
    }
    if (t & (67108864 /* IsIdentifier */ | 4096 /* Keyword */)) {
        if (tokenValue === 'constructor') {
            state |= 1024 /* Constructor */;
        }
        key = this.parseIdentifier(context);
    }
    else {
        switch (t) {
            case 117 /* Hash */:
                {
                    if (this.flags & 33554432 /* OptionsNext */) {
                        // static private class fields forbidden
                        if (state & 512 /* Static */)
                            { this.error(0 /* Unexpected */); }
                        key = this.parseClassPrivateProperty(context, state);
                        if (this.token !== 262155 /* LeftParen */)
                            { return key; }
                        break;
                    }
                }
            default:
                if (t === 393235 /* LeftBracket */) {
                    state |= 4 /* Computed */;
                }
                else if (tokenValue === 'constructor') {
                    state |= 1024 /* Constructor */;
                }
                var res = this.parsePropertyName(context, pos);
                if (res < 0) {
                    if (count && modifierState !== 1 /* Yield */) {
                        state &= ~modifierState;
                        count--;
                    }
                }
                else
                    { key = res; }
        }
    }
    if (this.token === 262155 /* LeftParen */) {
        if (!key && state & 1 /* Yield */) {
            this.error(1 /* UnexpectedToken */, tokenDesc(t));
        }
        if (state & 256 /* Heritage */ && state & 1024 /* Constructor */) {
            context |= 131072 /* AllowConstructor */;
        }
        if (state & 512 /* Static */) {
            if (state & 4096 /* Prototype */) {
                this.error(59 /* StaticPrototype */);
            }
            state &= ~1024 /* Constructor */;
        }
        if (state & 1024 /* Constructor */) {
            if (state & 51 /* Special */) {
                this.error(56 /* ConstructorSpecialMethod */);
            }
            if (context & 65536 /* HasConstructor */) {
                this.error(58 /* DuplicateConstructor */);
            }
        }
        value = this.parseMethodDefinition(context & ~(16 /* Yield */ | 32 /* Await */) | 32768 /* Method */, state);
    }
    else if (!(state & 5632 /* Invalid */) && this.flags & 33554432 /* OptionsNext */) {
        if (this.token === 1310749 /* Assign */) {
            key = this.parsePrivateProperty(context | 4194304 /* ClassFields */, key);
        }
        this.parseOptional(context, 18 /* Comma */);
        return key;
    }
    else {
        this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
    }
    return this.finishNode(context, pos, {
        type: 'MethodDefinition',
        key: key,
        kind: (state & 1024 /* Constructor */) ? 'constructor' : (state & 16 /* Get */) ? 'get' :
            (state & 32 /* Set */) ? 'set' : 'method',
        computed: (state & 4 /* Computed */) !== 0,
        value: value,
        static: (state & 512 /* Static */) !== 0
    });
};
Parser.prototype.parsePropertyName = function parsePropertyName (context, pos) {
    switch (this.token) {
        case 262146 /* NumericLiteral */:
        case 262147 /* StringLiteral */:
            return this.parseLiteral(context);
        case 393235 /* LeftBracket */:
            return this.parseComputedPropertyName(context, pos);
        default:
            return -1;
    }
};
Parser.prototype.parseObjectExpression = function parseObjectExpression (context) {
        var this$1 = this;

    var pos = this.getLocations();
    // Disallow class constructors within object expressions
    context &= ~131072 /* AllowConstructor */;
    this.expect(context, 393228 /* LeftBrace */);
    var properties = [];
    while (this.token !== 15 /* RightBrace */) {
        properties.push(this$1.parseObjectElement(context));
        if (this$1.token !== 15 /* RightBrace */)
            { this$1.expect(context, 18 /* Comma */); }
    }
    this.expect(context, 15 /* RightBrace */);
    if (this.flags & 262144 /* HasDuplicateProtoField */ && this.token !== 1310749 /* Assign */) {
        this.error(53 /* DuplicateProtoProperty */);
    }
    // Unset the 'HasProtoField' flag now, we are done!
    this.flags &= ~(131072 /* HasProtoField */ | 262144 /* HasDuplicateProtoField */);
    return this.finishNode(context, pos, {
        type: 'ObjectExpression',
        properties: properties
    });
};
Parser.prototype.parseObjectElement = function parseObjectElement (context) {
    var pos = this.getLocations();
    var t = this.token;
    if (t === 14 /* Ellipsis */ && this.flags & 33554432 /* OptionsNext */) {
        return this.parseSpreadExpression(context, pos);
    }
    var state = 0;
    var modifierState = 0;
    var key;
    var value;
    var tokenValue = this.tokenValue;
    if (t & 16777216 /* Modifiers */) {
        if (this.flags & 2 /* ExtendedUnicodeEscape */) {
            this.error(63 /* UnexpectedEscapedKeyword */);
        }
        if (t === 16846959 /* GetKeyword */) {
            state |= modifierState = 16 /* Get */;
        }
        if (t === 16846960 /* SetKeyword */) {
            state |= modifierState = 32 /* Set */;
        }
        if (t & 134217728 /* IsAsync */) {
            state |= modifierState = 2 /* Async */;
        }
        key = this.parseIdentifier(context);
    }
    // Generator / Async Iterations ( Stage 3 proposal)
    if (this.token & 268435456 /* IsGenerator */) {
        if (state & 2 /* Async */ && !(this.flags & 33554432 /* OptionsNext */)) {
            this.error(88 /* InvalidAsyncGenerator */);
        }
        state |= modifierState = 1 /* Yield */;
        this.expect(context, 270535219 /* Multiply */);
    }
    if (state & 2 /* Async */ && this.flags & 1 /* LineTerminator */) {
        this.error(62 /* LineBreakAfterAsync */);
    }
    if (this.token === 69742 /* ConstructorKeyword */) {
        state |= 1024 /* Constructor */;
    }
    if (this.token & (67108864 /* IsIdentifier */ | 4096 /* Keyword */)) {
        key = this.parseIdentifier(context);
    }
    else {
        if (this.token === 393235 /* LeftBracket */) {
            state |= 4 /* Computed */;
        }
        var res = this.parsePropertyName(context, pos);
        if (res < 0)
            { state &= ~modifierState; }
        else
            { key = res; }
    }
    switch (this.token) {
        case 262155 /* LeftParen */:
            {
                if (!(state & 48 /* Accessors */)) {
                    state |= 64 /* Method */;
                }
                value = this.parseMethodDefinition(context & ~(16 /* Yield */ | 32 /* Await */) | 32768 /* Method */, state);
                break;
            }
        case 21 /* Colon */:
            {
                if (state & 1 /* Yield */) {
                    this.error(75 /* DisallowedInContext */, tokenDesc(t));
                }
                if (!(state & 4 /* Computed */) &&
                    this.tokenValue === '__proto__') {
                    // Annex B defines an early error for duplicate PropertyName of `__proto__`,
                    // in object initializers, but this does not apply to Object Assignment
                    // patterns, so we need to validate this *after* parsing out the object expr
                    if (this.flags & 131072 /* HasProtoField */) {
                        this.flags |= 262144 /* HasDuplicateProtoField */;
                    }
                    else {
                        this.flags |= 131072 /* HasProtoField */;
                    }
                }
                this.expect(context, 21 /* Colon */);
                value = this.parseAssignmentExpression(context);
                break;
            }
        default:
            if (state & 2 /* Async */ || !this.isIdentifier(context, t)) {
                this.error(1 /* UnexpectedToken */, tokenDesc(t));
            }
            else if (t & (1073741824 /* IsAwait */ | 536870912 /* IsYield */)) {
                if (context & (32 /* Await */ | 16 /* Yield */)) {
                    this.error(75 /* DisallowedInContext */, tokenDesc(t));
                }
                else if (t & (1073741824 /* IsAwait */)) {
                    this.errorLocation = pos;
                    this.flags |= 256 /* Await */;
                }
            }
            state |= 8 /* Shorthand */;
            if (this.parseOptional(context, 1310749 /* Assign */)) {
                if (this.token & (536870912 /* IsYield */ | 1073741824 /* IsAwait */)) {
                    this.errorLocation = pos;
                    if (this.token & 536870912 /* IsYield */ && context & 16 /* Yield */) {
                        this.flags |= 128 /* Yield */;
                    }
                    if (this.token & 1073741824 /* IsAwait */) {
                        this.flags |= 256 /* Await */;
                        this.errorLocation = pos;
                    }
                }
                value = this.finishNode(context, pos, {
                    type: 'AssignmentPattern',
                    left: key,
                    right: this.parseAssignmentExpression(context)
                });
            }
            else {
                value = key;
            }
    }
    return this.finishNode(context, pos, {
        type: 'Property',
        key: key,
        value: value,
        kind: !(state & 48 /* Accessors */) ? 'init' : (state & 32 /* Set */) ? 'set' : 'get',
        computed: (state & 4 /* Computed */) !== 0,
        method: (state & 64 /* Method */) !== 0,
        shorthand: (state & 8 /* Shorthand */) !== 0
    });
};
Parser.prototype.parseMethodDefinition = function parseMethodDefinition (context, state) {
    var pos = this.getLocations();
    if (state & 1 /* Yield */ && !(state & 16 /* Get */))
        { context |= 16 /* Yield */; }
    if (state & 2 /* Async */)
        { context |= 32 /* Await */; }
    var functionScope = this.functionScope;
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    this.functionScope = undefined;
    this.blockScope = undefined;
    this.parentScope = undefined;
    var params = this.parseParameterList(context | 128 /* InParameter */, state);
    var body = this.parseFunctionBody(context);
    this.functionScope = functionScope;
    this.blockScope = blockScope;
    this.parentScope = parentScope;
    return this.finishNode(context, pos, {
        type: 'FunctionExpression',
        params: params,
        body: body,
        async: (context & 32 /* Await */) !== 0,
        generator: (context & 16 /* Yield */) !== 0,
        expression: false,
        id: null
    });
};
Parser.prototype.parseRestElement = function parseRestElement (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    var argument = this.parseBindingIdentifierOrPattern(context);
    if (this.token === 1310749 /* Assign */)
        { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
    if (this.token !== 16 /* RightParen */) {
        this.error(27 /* ParameterAfterRestParameter */);
    }
    return this.finishNode(context, pos, {
        type: 'RestElement',
        argument: argument
    });
};
Parser.prototype.parseThrowExpression = function parseThrowExpression (context, pos) {
    if (!(this.flags & 33554432 /* OptionsNext */)) {
        this.error(91 /* UnsupportedFeature */, tokenDesc(this.token), 'next');
    }
    this.nextToken(context);
    return this.finishNode(context, pos, {
        type: 'ThrowExpression',
        expressions: this.parseUnaryExpression(context)
    });
};
Parser.prototype.parseArrayInitializer = function parseArrayInitializer (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393235 /* LeftBracket */);
    var elements = [];
    while (this.token !== 20 /* RightBracket */) {
        if (this$1.parseOptional(context, 18 /* Comma */)) {
            elements.push(null);
        }
        else if (this$1.token === 14 /* Ellipsis */) {
            var element = this$1.parseSpreadExpression(context);
            if (this$1.token !== 20 /* RightBracket */) {
                this$1.errorLocation = this$1.getLocations();
                this$1.flags |= 512 /* Rest */;
                this$1.expect(context, 18 /* Comma */);
            }
            elements.push(element);
        }
        else {
            elements.push(this$1.parseAssignmentExpression(context | 4 /* AllowIn */));
            if (this$1.token !== 20 /* RightBracket */) {
                this$1.expect(context, 18 /* Comma */);
            }
        }
    }
    this.expect(context, 20 /* RightBracket */);
    return this.finishNode(context, pos, {
        type: 'ArrayExpression',
        elements: elements
    });
};
// ParenthesizedExpression[Yield, Await]:
// CoverParenthesizedExpressionAndArrowParameterList[Yield, Await]:
Parser.prototype.parseParenthesizedExpression = function parseParenthesizedExpression (context, pos) {
        var this$1 = this;

    this.expect(context, 262155 /* LeftParen */);
    var state = 0;
    if (this.parseOptional(context, 16 /* RightParen */)) {
        if (this.token === 10 /* Arrow */) {
            return this.parseArrowFunctionExpression(context & ~(32 /* Await */ | 16 /* Yield */), pos, []);
        }
        this.error(64 /* MissingArrowAfterParentheses */);
    }
    var expr;
    if (this.token === 14 /* Ellipsis */) {
        expr = this.parseRestElement(context);
        this.expect(context, 16 /* RightParen */);
        return this.parseArrowFunctionExpression(context & ~(32 /* Await */ | 16 /* Yield */), pos, [expr]);
    }
    var sequencepos = this.getLocations();
    this.errorLocation = pos;
    var isSequence = false;
    if (context & 16 /* Yield */ && this.token & 536870912 /* IsYield */)
        { this.flags |= 128 /* Yield */; }
    if (this.token === 262155 /* LeftParen */)
        { state |= 4 /* Parenthesized */; }
    if (this.token & 131072 /* BindingPattern */)
        { state |= 16 /* Pattern */; }
    if (this.token & 20480 /* FutureReserved */)
        { state |= 32 /* FutureReserved */; }
    expr = this.parseAssignmentExpression(context);
    if (this.token === 18 /* Comma */) {
        var expressions = [expr];
        while (this.parseOptional(context, 18 /* Comma */)) {
            if (this$1.token === 16 /* RightParen */) {
                var token = this$1.token;
                this$1.expect(context, 16 /* RightParen */);
                if (this$1.token === 10 /* Arrow */)
                    { return this$1.parseArrowFunctionExpression(context & ~(32 /* Await */ | 16 /* Yield */), pos, expressions); }
            }
            else if (this$1.token === 14 /* Ellipsis */) {
                expressions.push(this$1.parseRestElement(context));
                this$1.expect(context, 16 /* RightParen */);
                if (state & 4 /* Parenthesized */)
                    { this$1.error(65 /* InvalidParenthesizedPattern */); }
                return this$1.parseArrowFunctionExpression(context & ~(32 /* Await */ | 16 /* Yield */), pos, expressions);
            }
            else {
                this$1.errorLocation = this$1.getLocations();
                if (this$1.token === 262155 /* LeftParen */)
                    { state |= 4 /* Parenthesized */; }
                expressions.push(this$1.parseAssignmentExpression(context));
            }
        }
        isSequence = true;
        expr = this.finishNode(context, sequencepos, {
            type: 'SequenceExpression',
            expressions: expressions
        });
    }
    if (!(this.flags & 8 /* AllowCall */))
        { this.flags |= 8 /* AllowCall */; }
    this.expect(context, 16 /* RightParen */);
    if (this.token === 10 /* Arrow */) {
        if (state & 16 /* Pattern */) {
            this.flags |= 8192 /* SimpleParameterList */;
        }
        if (this.flags & 256 /* Await */)
            { this.error(90 /* InvalidAwaitInArrowParam */); }
        if (state & 32 /* FutureReserved */)
            { this.flags |= 1024 /* Binding */; }
        if (this.flags & 128 /* Yield */)
            { this.error(89 /* InvalidArrowYieldParam */); }
        if (state & 4 /* Parenthesized */)
            { this.error(65 /* InvalidParenthesizedPattern */); }
        return this.parseArrowFunctionExpression(context, pos, isSequence ? expr.expressions : [expr]);
    }
    this.errorLocation = undefined;
    if (state & 16 /* Pattern */) {
        this.flags |= 16384 /* ParenthesizedPattern */;
    }
    return expr;
};
Parser.prototype.parseRegularExpression = function parseRegularExpression (context) {
    this.scanRegularExpression();
    var pos = this.getLocations();
    var regex = this.tokenRegExp;
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    this.nextToken(context);
    var node = this.finishNode(context, pos, {
        type: 'Literal',
        value: value,
        regex: regex
    });
    if (this.flags & 16777216 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseTemplateLiteral = function parseTemplateLiteral (context, pos) {
    return this.finishNode(context, pos, {
        type: 'TemplateLiteral',
        expressions: [],
        quasis: [this.parseTemplateElement(context)]
    });
};
Parser.prototype.parseTemplateHead = function parseTemplateHead (context, cooked, raw) {
    var pos = this.getLocations();
    this.token = this.consumeTemplateBrace(context);
    return this.finishNode(context, pos, {
        type: 'TemplateElement',
        value: {
            cooked: cooked,
            raw: raw
        },
        tail: false
    });
};
Parser.prototype.parseTemplateElement = function parseTemplateElement (context) {
    var pos = this.getLocations();
    var cooked = this.tokenValue;
    var raw = this.tokenRaw;
    this.expect(context, 262153 /* TemplateTail */);
    return this.finishNode(context, pos, {
        type: 'TemplateElement',
        value: {
            cooked: cooked,
            raw: raw
        },
        tail: true
    });
};
Parser.prototype.parseTaggedTemplateExpression = function parseTaggedTemplateExpression (context, expr, quasi, pos) {
    return this.finishNode(context, pos, {
        type: 'TaggedTemplateExpression',
        tag: expr,
        quasi: quasi
    });
};
Parser.prototype.parseTemplate = function parseTemplate (context, pos, expressions, quasis) {
        if ( expressions === void 0 ) expressions = [];
        if ( quasis === void 0 ) quasis = [];

    var cooked = this.tokenValue;
    var raw = this.tokenRaw;
    this.expect(context, 262152 /* TemplateCont */);
    expressions.push(this.parseExpression(context, pos));
    quasis.push(this.parseTemplateHead(context, cooked, raw));
    if (this.token === 262153 /* TemplateTail */) {
        quasis.push(this.parseTemplateElement(context));
    }
    else {
        this.parseTemplate(context, pos, expressions, quasis);
    }
    return this.finishNode(context, pos, {
        type: 'TemplateLiteral',
        expressions: expressions,
        quasis: quasis
    });
};
Parser.prototype.parseBigIntLiteral = function parseBigIntLiteral (context, pos) {
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    var node = this.finishNode(context, pos, {
        type: 'Literal',
        value: value,
        bigint: raw
    }, true);
    if (this.flags & 16777216 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseLiteral = function parseLiteral (context) {
    var pos = this.getLocations();
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    if (context & 2 /* Strict */ && this.flags & 32768 /* Octal */) {
        this.error(9 /* StrictOctalLiteral */);
    }
    var node = this.finishNode(context, pos, {
        type: 'Literal',
        value: value
    }, true);
    if (this.flags & 16777216 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseNullOrTrueOrFalseExpression = function parseNullOrTrueOrFalseExpression (context, pos) {
    if (this.flags & 2 /* ExtendedUnicodeEscape */)
        { this.error(63 /* UnexpectedEscapedKeyword */); }
    var t = this.token;
    var raw = tokenDesc(t);
    var node = this.finishNode(context, pos, {
        type: 'Literal',
        value: t === 274439 /* NullKeyword */ ? null : raw === 'true'
    }, true);
    if (this.flags & 16777216 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseThisExpression = function parseThisExpression (context) {
    var pos = this.getLocations();
    return this.finishNode(context, pos, {
        type: 'ThisExpression'
    }, true);
};
Parser.prototype.parseIdentifier = function parseIdentifier (context) {
    var name = this.tokenValue;
    var pos = this.getLocations();
    return this.finishNode(context | 1048576 /* TaggedTemplate */, pos, {
        type: 'Identifier',
        name: name
    }, true);
};
// Fast path for catch arguments
Parser.prototype.addCatchArg = function addCatchArg (name, type /* Shadowable */) {
        if ( type === void 0 ) type = 1;

    this.initBlockScope();
    this.blockScope[name] = type;
};
Parser.prototype.initBlockScope = function initBlockScope () {
    if (this.functionScope == null) {
        this.functionScope = Object.create(null);
        this.blockScope = Object.create(this.functionScope);
        this.parentScope = this.blockScope;
    }
    else if (this.blockScope == null) {
        this.blockScope = Object.create(this.parentScope);
        this.parentScope = this.blockScope;
    }
    else {
        return false;
    }
    return true;
};
Parser.prototype.initFunctionScope = function initFunctionScope () {
    if (this.functionScope !== undefined)
        { return false; }
    this.functionScope = Object.create(null);
    this.blockScope = this.functionScope;
    this.parentScope = this.functionScope;
    return true;
};
Parser.prototype.addFunctionArg = function addFunctionArg (name) {
    if (!this.initFunctionScope() && name in this.functionScope)
        { this.error(66 /* DuplicateIdentifier */, name); }
    this.functionScope[name] = 1 /* Shadowable */;
};
Parser.prototype.addVarOrBlock = function addVarOrBlock (context, name) {
    if (context & 805306368 /* Lexical */) {
        this.addBlockName(context, name);
    }
    else {
        this.addVarName(name);
    }
};
Parser.prototype.addVarName = function addVarName (name) {
    if (!this.initFunctionScope() && this.blockScope !== undefined &&
        (this.blockScope[name] & 2 /* NonShadowable */) !== 0) {
        this.error(66 /* DuplicateIdentifier */, name);
    }
    this.functionScope[name] = 1 /* Shadowable */;
};
Parser.prototype.checkIfExistInFunctionScope = function checkIfExistInFunctionScope (name) {
    if (!this.initBlockScope() && (this.blockScope !== this.functionScope && this.blockScope[name] ||
        (this.blockScope[name] & 2 /* NonShadowable */) !== 0)) {
        this.error(66 /* DuplicateIdentifier */, name);
    }
};
Parser.prototype.checkIfExistInBlockScope = function checkIfExistInBlockScope (name) {
    if (!this.initBlockScope() && ((this.blockScope[name] & 1 /* Shadowable */) !== 0 ||
        Object.prototype.hasOwnProperty.call(this.blockScope, name))) {
        this.error(66 /* DuplicateIdentifier */, name);
    }
};
Parser.prototype.addBlockName = function addBlockName (context, name) {
    // Export of global bindings
    if (context & 1 /* Module */ && name === 'Number') {
        this.error(66 /* DuplicateIdentifier */, name);
    }
    else if (!this.initBlockScope() && (
    // Check variables in current block only
    Object.prototype.hasOwnProperty.call(this.blockScope, name) ||
        // Check `var` variables in the current or parent scopes
        (this.blockScope[name] & 1 /* Shadowable */) !== 0)) {
        this.error(66 /* DuplicateIdentifier */, name);
    }
    this.blockScope[name] = 2 /* NonShadowable */;
};
Parser.prototype.parseAssignmentPattern = function parseAssignmentPattern (context, pos, pattern) {
        if ( pos === void 0 ) pos = this.getLocations();
        if ( pattern === void 0 ) pattern = this.parseBindingIdentifierOrPattern(context);

    if (!this.parseOptional(context, 1310749 /* Assign */))
        { return pattern; }
    return this.finishNode(context, pos, {
        type: 'AssignmentPattern',
        left: pattern,
        right: this.parseAssignmentExpression(context)
    });
};
Parser.prototype.parseBindingIdentifierOrPattern = function parseBindingIdentifierOrPattern (context) {
    switch (this.token) {
        case 393235 /* LeftBracket */:
            return this.parseArrayElementsBindingPattern(context);
        case 393228 /* LeftBrace */:
            return this.ObjectAssignmentPattern(context);
        case 537153642 /* YieldKeyword */:
            if (context & (16 /* Yield */ | 2 /* Strict */)) {
                this.error(75 /* DisallowedInContext */, tokenDesc(this.token));
            }
            return this.parseBindingIdentifier(context);
        case 1074073709 /* AwaitKeyword */:
            if (context & (1 /* Module */ | 32 /* Await */))
                { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
        default:
            return this.parseBindingIdentifier(context);
    }
};
Parser.prototype.parseBindingIdentifier = function parseBindingIdentifier (context) {
    var t = this.token;
    if (!this.isIdentifier(context, t)) {
        this.error(1 /* UnexpectedToken */, tokenDesc(t));
    }
    else if (context & 805306368 /* Lexical */ && t === 8671304 /* LetKeyword */) {
        this.error(52 /* LetInLexicalBinding */);
    }
    var pos = this.getLocations();
    var name = this.tokenValue;
    if (!(context & 2048 /* ExistingScope */) && this.isEvalOrArguments(name)) {
        if (context & 2 /* Strict */)
            { this.error(35 /* StrictLHSAssignment */); }
    }
    if (context & 128 /* InParameter */ && context & 16777266 /* MarkAsParamDuplicate */) {
        this.addFunctionArg(name);
    }
    else
        { this.addVarOrBlock(context, name); }
    this.nextToken(context);
    return this.finishNode(context, pos, {
        type: 'Identifier',
        name: name
    });
};
Parser.prototype.parseAssignmentRestElement = function parseAssignmentRestElement (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    var argument = this.parseBindingIdentifierOrPattern(context);
    if (this.token === 1310749 /* Assign */)
        { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
    return this.finishNode(context, pos, {
        type: 'RestElement',
        argument: argument
    });
};
Parser.prototype.parseArrayElementsBindingPattern = function parseArrayElementsBindingPattern (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393235 /* LeftBracket */);
    var elements = [];
    while (this.token !== 20 /* RightBracket */) {
        if (this$1.parseOptional(context, 18 /* Comma */)) {
            elements.push(null);
        }
        else {
            if (this$1.token === 14 /* Ellipsis */) {
                elements.push(this$1.parseAssignmentRestElement(context));
                break;
            }
            elements.push(this$1.parseAssignmentPattern(context | 4 /* AllowIn */));
            if (this$1.token !== 20 /* RightBracket */)
                { this$1.expect(context, 18 /* Comma */); }
        }
    }
    this.expect(context, 20 /* RightBracket */);
    return this.finishNode(context, pos, {
        type: 'ArrayPattern',
        elements: elements
    });
};
Parser.prototype.parseComputedPropertyName = function parseComputedPropertyName (context, pos) {
    this.expect(context, 393235 /* LeftBracket */);
    if (this.token & 536870912 /* IsYield */) {
        this.errorLocation = pos;
        this.flags |= 128 /* Yield */;
    }
    var expression = this.parseAssignmentExpression(context | 4 /* AllowIn */);
    this.expect(context, 20 /* RightBracket */);
    return expression;
};
Parser.prototype.ObjectAssignmentPattern = function ObjectAssignmentPattern (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var properties = [];
    this.expect(context, 393228 /* LeftBrace */);
    while (this.token !== 15 /* RightBrace */) {
        properties.push(this$1.token === 14 /* Ellipsis */ ?
            this$1.parseRestProperty(context) :
            this$1.parseAssignmentProperty(context));
        if (this$1.token !== 15 /* RightBrace */)
            { this$1.parseOptional(context, 18 /* Comma */); }
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(context, pos, {
        type: 'ObjectPattern',
        properties: properties
    });
};
Parser.prototype.parseRestProperty = function parseRestProperty (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    if (!(this.token & 67108864 /* IsIdentifier */))
        { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
    var arg = this.parseBindingIdentifierOrPattern(context);
    if (this.token === 1310749 /* Assign */)
        { this.error(1 /* UnexpectedToken */, tokenDesc(this.token)); }
    return this.finishNode(context, pos, {
        type: 'RestElement',
        argument: arg
    });
};
Parser.prototype.parseAssignmentProperty = function parseAssignmentProperty (context) {
    var pos = this.getLocations();
    var state = 0;
    var key;
    var value;
    var t = this.token;
    if (t & (67108864 /* IsIdentifier */ | 4096 /* Keyword */)) {
        t = this.token;
        key = this.parseIdentifier(context);
        if (this.parseOptional(context, 21 /* Colon */)) {
            value = this.parseAssignmentPattern(context);
        }
        else {
            state |= 8 /* Shorthand */;
            if (context & 16 /* Yield */ && t & 536870912 /* IsYield */) {
                this.error(75 /* DisallowedInContext */, tokenDesc(t));
            }
            value = this.token === 1310749 /* Assign */ ?
                this.parseAssignmentPattern(context, pos, key) :
                key;
        }
    }
    else {
        if (t === 393235 /* LeftBracket */) {
            state |= 4 /* Computed */;
        }
        var res = this.parsePropertyName(context, pos);
        if (res < 0)
            { key = this.parseIdentifier(context); }
        else
            { key = res; }
        this.expect(context, 21 /* Colon */);
        value = this.parseAssignmentPattern(context);
    }
    return this.finishNode(context, pos, {
        type: 'Property',
        kind: 'init',
        key: key,
        computed: !!(state & 4 /* Computed */),
        value: value,
        method: false,
        shorthand: !!(state & 8 /* Shorthand */)
    });
};
/** JSX */
Parser.prototype.parseJSXChildren = function parseJSXChildren (context) {
        var this$1 = this;

    var children = [];
    while (this.token !== 25 /* JSXClose */) {
        children.push(this$1.parseJSXChild(context | 8388608 /* Expression */, this$1.getLocations()));
    }
    return children;
};
Parser.prototype.parseJSXChild = function parseJSXChild (context, pos) {
    switch (this.token) {
        case 116 /* JSXText */:
        case 67371009 /* Identifier */:
            return this.parseJSXText(context);
        case 393228 /* LeftBrace */:
            return this.parseJSXExpressionContainer(context);
        case 2361151 /* LessThan */:
            return this.parseJSXElement(context & ~8388608 /* Expression */);
        default: // ignore
    }
};
Parser.prototype.parseJSXSpreadChild = function parseJSXSpreadChild (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    var expression = this.parseExpression(context, pos);
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(context, pos, {
        type: 'JSXSpreadChild',
        expression: expression
    });
};
Parser.prototype.parseJSXText = function parseJSXText (context) {
    var pos = this.getLocations();
    var value = this.source.slice(this.startIndex, this.index);
    this.nextJSXToken();
    var node = this.finishNode(context, pos, {
        type: 'JSXText',
        value: value
    });
    if (this.flags & 16777216 /* OptionsRaw */)
        { node.raw = value; }
    return node;
};
Parser.prototype.parseJSXEmptyExpression = function parseJSXEmptyExpression (context, pos) {
    return this.finishNode(context, pos, {
        type: 'JSXEmptyExpression'
    });
};
Parser.prototype.parseJSXExpressionContainer = function parseJSXExpressionContainer (context) {
    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    if (this.token === 14 /* Ellipsis */) {
        return this.parseJSXSpreadChild(context);
    }
    var expression = this.token === 15 /* RightBrace */ ?
        this.parseJSXEmptyExpression(context, pos) :
        this.parseAssignmentExpression(context);
    this.nextJSXToken();
    return this.finishNode(context, pos, {
        type: 'JSXExpressionContainer',
        expression: expression
    });
};
Parser.prototype.parseJSXClosingElement = function parseJSXClosingElement (context, isFragment) {
    var pos = this.getLocations();
    this.expect(context, 25 /* JSXClose */);
    if (isFragment) {
        this.expect(context, 2099008 /* GreaterThan */);
        return this.finishNode(context, pos, {
            type: 'JSXClosingFragment'
        });
    }
    var name = this.parseJSXElementName(context);
    if (context & 8388608 /* Expression */) {
        this.expect(context, 2099008 /* GreaterThan */);
    }
    else {
        this.nextJSXToken();
    }
    return this.finishNode(context, pos, {
        type: 'JSXClosingElement',
        name: name
    });
};
Parser.prototype.scanJSXString = function scanJSXString (quote) {
        var this$1 = this;

    var ret = '';
    this.advance();
    var ch = this.nextChar();
    while (ch !== quote) {
        ret += fromCodePoint(ch);
        ch = this$1.scanNext();
    }
    this.advance(); // Consume the quote
    if (this.flags & 16777216 /* OptionsRaw */)
        { this.storeRaw(this.startIndex); }
    this.tokenValue = ret;
    return 262147 /* StringLiteral */;
};
Parser.prototype.scanJSXAttributeValue = function scanJSXAttributeValue (context) {
    this.startIndex = this.index;
    this.startColumn = this.column;
    this.startLine = this.line;
    var ch = this.nextChar();
    switch (ch) {
        case 34 /* DoubleQuote */:
        case 39 /* SingleQuote */:
            return this.scanJSXString(ch);
        default:
            this.nextToken(context);
    }
};
Parser.prototype.parseJSXSpreadAttribute = function parseJSXSpreadAttribute (context) {
    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    this.expect(context, 14 /* Ellipsis */);
    var expression = this.parseExpression(context, pos);
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(context, pos, {
        type: 'JSXSpreadAttribute',
        argument: expression
    });
};
Parser.prototype.parseJSXAttributeName = function parseJSXAttributeName (context) {
    var pos = this.getLocations();
    var identifier = this.parseJSXIdentifier(context);
    if (this.token === 21 /* Colon */)
        { return this.parseJSXNamespacedName(context, identifier, pos); }
    return identifier;
};
Parser.prototype.parseJSXAttribute = function parseJSXAttribute (context) {
    var pos = this.getLocations();
    var value = null;
    var attrName = this.parseJSXAttributeName(context);
    if (this.token === 1310749 /* Assign */) {
        switch (this.scanJSXAttributeValue(context)) {
            case 262147 /* StringLiteral */:
                value = this.parseLiteral(context);
                break;
            default:
                value = this.parseJSXExpressionAttribute(context);
        }
    }
    return this.finishNode(context, pos, {
        type: 'JSXAttribute',
        value: value,
        name: attrName
    });
};
Parser.prototype.parseJSXExpressionAttribute = function parseJSXExpressionAttribute (context) {
    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    var expression = this.parseAssignmentExpression(context);
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(context, pos, {
        type: 'JSXExpressionContainer',
        expression: expression
    });
};
Parser.prototype.parseJSXAttributes = function parseJSXAttributes (context) {
        var this$1 = this;

    var attributes = [];
    while (!(this.token === 2099008 /* GreaterThan */ || this.token === 2361909 /* Divide */)) {
        if (this$1.token === 393228 /* LeftBrace */) {
            attributes.push(this$1.parseJSXSpreadAttribute(context &= ~8388608 /* Expression */));
        }
        else {
            attributes.push(this$1.parseJSXAttribute(context));
        }
    }
    return attributes;
};
Parser.prototype.nextJSXToken = function nextJSXToken () {
        var this$1 = this;

    this.lastIndex = this.startIndex = this.index;
    var next = this.nextChar();
    if (next === 60 /* LessThan */) {
        this.advance();
        if (this.consume(47 /* Slash */)) {
            this.token = 25 /* JSXClose */;
        }
        else {
            this.token = 2361151 /* LessThan */;
        }
    }
    else if (next === 123 /* LeftBrace */) {
        this.advance();
        this.token = 393228 /* LeftBrace */;
    }
    else {
        while (!(this.nextChar() === 123 /* LeftBrace */ || this.nextChar() === 60 /* LessThan */)) {
            this$1.advance();
        }
        this.token = 116 /* JSXText */;
    }
};
Parser.prototype.parseJSXIdentifier = function parseJSXIdentifier (context) {
    var name = this.tokenValue;
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(context, pos, {
        type: 'JSXIdentifier',
        name: name
    });
};
Parser.prototype.parseJSXNamespacedName = function parseJSXNamespacedName (context, namespace, pos) {
    this.expect(context, 21 /* Colon */);
    var name = this.parseJSXIdentifier(context);
    return this.finishNode(context, pos, {
        type: 'JSXNamespacedName',
        namespace: namespace,
        name: name
    });
};
Parser.prototype.parseJSXMemberExpression = function parseJSXMemberExpression (context, expr, pos) {
    return this.finishNode(context, pos, {
        type: 'JSXMemberExpression',
        object: expr,
        property: this.parseJSXIdentifier(context)
    });
};
Parser.prototype.parseJSXElementName = function parseJSXElementName (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var expression = this.parseJSXIdentifier(context | 8388608 /* Expression */);
    // Namespace
    if (this.token === 21 /* Colon */)
        { return this.parseJSXNamespacedName(context, expression, pos); }
    // Member expression
    while (this.parseOptional(context, 13 /* Period */)) {
        expression = this$1.parseJSXMemberExpression(context, expression, pos);
    }
    return expression;
};
Parser.prototype.parseJSXElement = function parseJSXElement (context) {
    var pos = this.getLocations();
    var openingElement = null;
    var selfClosing = false;
    var isFragment = false;
    this.expect(context, 2361151 /* LessThan */);
    if (this.token === 2099008 /* GreaterThan */) {
        isFragment = true;
        this.nextJSXToken();
        openingElement = this.finishNode(context, pos, {
            type: 'JSXOpeningFragment'
        });
    }
    else {
        var tagName = this.parseJSXElementName(context);
        var attributes = this.parseJSXAttributes(context);
        if (this.token === 2099008 /* GreaterThan */) {
            this.nextJSXToken();
        }
        else {
            this.expect(context, 2361909 /* Divide */);
            this.expect(context, 2099008 /* GreaterThan */);
            selfClosing = true;
        }
        openingElement = this.finishNode(context, pos, {
            type: 'JSXOpeningElement',
            name: tagName,
            attributes: attributes,
            selfClosing: selfClosing
        });
    }
    var children = [];
    var closingElement = null;
    if (isFragment || !selfClosing) {
        children = this.parseJSXChildren(context);
        closingElement = this.parseJSXClosingElement(context, isFragment);
        if (isFragment) {
            return this.finishNode(context, pos, {
                type: 'JSXFragment',
                children: children,
                openingElement: openingElement,
                closingElement: closingElement,
            });
        }
        else {
            var open = isQualifiedJSXName(openingElement.name);
            var close = isQualifiedJSXName(closingElement.name);
            if (open !== close)
                { this.error(40 /* ExpectedJSXClosingTag */, close); }
        }
    }
    return this.finishNode(context, pos, {
        type: 'JSXElement',
        children: children,
        openingElement: openingElement,
        closingElement: closingElement,
    });
};

// https://tc39.github.io/ecma262/#sec-scripts
function parseScript(source, options) {
    return new Parser(source, options).parseProgram(options && options.impliedStrict ? 2 /* Strict */ | 134217728 /* TopLevel */ : 134217728 /* TopLevel */);
}
// https://tc39.github.io/ecma262/#sec-modules
function parseModule(source, options) {
    return new Parser(source, options).parseProgram(2 /* Strict */ | 1 /* Module */ | 134217728 /* TopLevel */);
}
var version = '0.20.5';

export { parseScript, parseModule, version };
