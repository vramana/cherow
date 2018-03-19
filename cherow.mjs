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
    'eval', 'arguments'
];
/**
 * The conversion function between token and its string description/representation.
 */
function tokenDesc(token) {
    if ((token & 255 /* Type */) < KeywordDescTable.length) {
        return KeywordDescTable[token & 255 /* Type */];
    }
    else {
        throw new Error('unreachable');
    }
}
// Used `Object.create(null)` to avoid potential `Object.prototype`
// interference.
var DescKeywordTable = Object.create(null, {
    arguments: { value: 201326709 /* Arguments */ },
    as: { value: 9323 /* AsKeyword */ },
    async: { value: 9324 /* AsyncKeyword */ },
    await: { value: 2122861 /* AwaitKeyword */ },
    break: { value: 3146 /* BreakKeyword */ },
    case: { value: 3147 /* CaseKeyword */ },
    catch: { value: 3148 /* CatchKeyword */ },
    class: { value: 19533 /* ClassKeyword */ },
    const: { value: 19529 /* ConstKeyword */ },
    constructor: { value: 9326 /* ConstructorKeyword */ },
    continue: { value: 3150 /* ContinueKeyword */ },
    debugger: { value: 3151 /* DebuggerKeyword */ },
    default: { value: 3152 /* DefaultKeyword */ },
    delete: { value: 281643 /* DeleteKeyword */ },
    do: { value: 1073744977 /* DoKeyword */ },
    else: { value: 3154 /* ElseKeyword */ },
    eval: { value: 201326708 /* Eval */ },
    export: { value: 3155 /* ExportKeyword */ },
    extends: { value: 3156 /* ExtendsKeyword */ },
    false: { value: 19461 /* FalseKeyword */ },
    finally: { value: 3157 /* FinallyKeyword */ },
    for: { value: 1073744982 /* ForKeyword */ },
    from: { value: 9329 /* FromKeyword */ },
    function: { value: 19544 /* FunctionKeyword */ },
    get: { value: 9327 /* GetKeyword */ },
    if: { value: 3161 /* IfKeyword */ },
    implements: { value: 5219 /* ImplementsKeyword */ },
    import: { value: 19546 /* ImportKeyword */ },
    in: { value: 537022257 /* InKeyword */ },
    instanceof: { value: 151346 /* InstanceofKeyword */ },
    interface: { value: 5220 /* InterfaceKeyword */ },
    let: { value: 21576 /* LetKeyword */ },
    new: { value: 19547 /* NewKeyword */ },
    null: { value: 19463 /* NullKeyword */ },
    of: { value: 536880242 /* OfKeyword */ },
    package: { value: 5221 /* PackageKeyword */ },
    private: { value: 5222 /* PrivateKeyword */ },
    protected: { value: 5223 /* ProtectedKeyword */ },
    public: { value: 5224 /* PublicKeyword */ },
    return: { value: 3164 /* ReturnKeyword */ },
    set: { value: 9328 /* SetKeyword */ },
    static: { value: 5225 /* StaticKeyword */ },
    super: { value: 19549 /* SuperKeyword */ },
    switch: { value: 19550 /* SwitchKeyword */ },
    this: { value: 3167 /* ThisKeyword */ },
    throw: { value: 3168 /* ThrowKeyword */ },
    true: { value: 19462 /* TrueKeyword */ },
    try: { value: 3169 /* TryKeyword */ },
    typeof: { value: 281642 /* TypeofKeyword */ },
    var: { value: 19527 /* VarKeyword */ },
    void: { value: 281644 /* VoidKeyword */ },
    while: { value: 1073744994 /* WhileKeyword */ },
    with: { value: 3171 /* WithKeyword */ },
    yield: { value: 21610 /* YieldKeyword */ },
});
function descKeyword(value) {
    return (DescKeywordTable[value] | 0);
}

var ErrorMessages = {};
ErrorMessages[0 /* Unexpected */] = 'Unexpected token';
ErrorMessages[1 /* UnexpectedToken */] = 'Unexpected token \'%0\'';
ErrorMessages[2 /* InvalidLHSInAssignment */] = 'Invalid left-hand side in assignment';
ErrorMessages[3 /* UnterminatedString */] = 'Unterminated string literal';
ErrorMessages[4 /* UnterminatedRegExp */] = 'Unterminated regular expression literal';
ErrorMessages[5 /* UnterminatedComment */] = 'Unterminated MultiLineComment';
ErrorMessages[6 /* UnterminatedTemplate */] = 'Unterminated template literal';
ErrorMessages[7 /* UnexpectedChar */] = 'Invalid character \'%0\'';
ErrorMessages[8 /* StrictOctalEscape */] = 'Octal escapes are not allowed in strict mode';
ErrorMessages[9 /* InvalidEightAndNine */] = 'Escapes \\8 or \\9 are not syntactically valid escapes';
ErrorMessages[10 /* InvalidHexEscapeSequence */] = 'Invalid hexadecimal escape sequence';
ErrorMessages[11 /* UnicodeOutOfRange */] = 'Unicode escape code point out of range';
ErrorMessages[12 /* DuplicateRegExpFlag */] = 'Duplicate regular expression flag \'%0\'';
ErrorMessages[13 /* UnexpectedTokenRegExpFlag */] = 'Unexpected regular expression flag \'%0\'';
ErrorMessages[14 /* StrictLHSAssignment */] = 'Eval or arguments can\'t be assigned to in strict mode code';
ErrorMessages[15 /* IllegalReturn */] = 'Illegal return statement';
ErrorMessages[16 /* StrictFunction */] = 'In strict mode code, functions can only be declared at top level or inside a block';
ErrorMessages[17 /* SloppyFunction */] = 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement';
ErrorMessages[18 /* ForbiddenAsStatement */] = '%0 can\'t appear in single-statement context';
ErrorMessages[19 /* GeneratorInSingleStatementContext */] = 'Generators can only be declared at the top level or inside a block';
ErrorMessages[20 /* ForAwaitNotOf */] = '\'for await\' loop should be used with \'of\'';
ErrorMessages[21 /* DeclarationMissingInitializer */] = 'Missing initializer in %0 declaration';
ErrorMessages[22 /* ForInOfLoopInitializer */] = '\'for-%0\' loop variable declaration may not have an initializer';
ErrorMessages[23 /* ForInOfLoopMultiBindings */] = 'Invalid left-hand side in for-%0 loop: Must have a single binding.';
ErrorMessages[24 /* LetInLexicalBinding */] = 'let is disallowed as a lexically bound name';
ErrorMessages[25 /* UnexpectedLexicalDeclaration */] = 'Lexical declaration cannot appear in a single-statement context';
ErrorMessages[26 /* LabelRedeclaration */] = 'Label \'%0\' has already been declared';
ErrorMessages[27 /* InvalidNestedStatement */] = '%0  statement must be nested within an iteration statement';
ErrorMessages[28 /* IllegalContinue */] = 'Illegal continue statement: \'%0\' does not denote an iteration statement';
ErrorMessages[29 /* UnknownLabel */] = 'Undefined label \'%0\'';
function report(parser, type) {
    var params = [], len = arguments.length - 2;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 2 ];

    var index = parser.index;
    var line = parser.line;
    var column = parser.column;
    var description = ErrorMessages[type].replace(/%(\d+)/g, function (_, i) { return params[i]; });
    var error = new SyntaxError(("Line " + line + ", column " + column + ": " + description));
    error.index = index;
    error.line = line;
    error.column = column;
    error.description = description;
    throw error;
}

// Unicode v. 10 support
function isValidIdentifierPart(code) {
    var bit = code & 31;
    return (convert[(code >>> 5) + 0] >>> bit & 1) !== 0;
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
function validateBreakOrContinueLabel(parser, label, isContinue) {
    if ( isContinue === void 0 ) isContinue = false;

    var state = hasLabel(parser, label);
    if (!state)
        { report(parser, 29 /* UnknownLabel */, label); }
    if (isContinue && !(state & 2 /* Nested */))
        { report(parser, 28 /* IllegalContinue */, label); }
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
    if (!parser.labelSet)
        { return 0 /* None */; }
    return parser.labelSet['$' + label];
}
/**
 * A simple `unimplemented` helper.
 */
function unimplemented() {
    throw new Error('unimplemented');
}
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
    }
    return node;
}
function expect(parser, context, t) {
    if (parser.token !== t) {
        return report(parser, 0 /* Unexpected */);
    }
    nextToken(parser, context);
}
function scanPrivateName(parser, context, ch) {
    /*    if (!(context & Context.InClass) || !isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
            return Errors.report(
                parser.index--,
                parser.line,
                parser.column--,
                Errors.unterminatedComment(),
            );
        }*/
    return 115 /* Hash */;
}
function hasNext(parser) {
    return parser.index < parser.source.length;
}
function advanceOne(parser) {
    parser.index++;
    parser.column++;
}
function advance(parser, ch) {
    advanceOne(parser);
    if (ch > 0xffff)
        { parser.index++; }
}
function nextChar(parser) {
    return parser.source.charCodeAt(parser.index);
}
function nextUnicodeChar(parser) {
    var index = parser.index;
    var hi = parser.source.charCodeAt(index++);
    if (hi < 0xd800 || hi > 0xdbff)
        { return hi; }
    if (index === parser.source.length)
        { return hi; }
    var lo = parser.source.charCodeAt(index);
    if (lo < 0xdc00 || lo > 0xdfff)
        { return hi; }
    return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
}
// This tags its result if it's an escaped identifier.
//
// It does everything raw since it's pure lookahead. It does store some metadata in the returned
// character to speed up the advance mechanism.


/**
 * An optimized equivalent of `advance(parser, nextUnicodeChar(parser))` that returns its result.
 */
function consumeAny(parser) {
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
/**
 * Use to consume a line feed instead of `advanceNewline`.
 */
function consumeLineFeed(parser, lastIsCR) {
    parser.index++;
    if (!lastIsCR) {
        parser.column = 0;
        parser.line++;
    }
}
function advanceNewline(parser) {
    parser.index++;
    parser.column = 0;
    parser.line++;
}
// Avoid 90% of the ceremony of String.fromCodePoint
function fromCodePoint(code) {
    if (code > 0xffff) {
        return String.fromCharCode(code >>> 10) +
            String.fromCharCode(code & 0x3ff);
    }
    else {
        return String.fromCharCode(code);
    }
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
function storeRaw(parser, start) {
    parser.tokenRaw = parser.source.slice(start, parser.index);
}



function lookahead(parser, context, callback) {
    var savePos = parser.index;
    var saveTokenValue = parser.tokenValue;
    var saveFlags = parser.flags;
    var saveLine = parser.line;
    var saveColumn = parser.column;
    var a = parser.startColumn;
    var b = parser.lastColumn;
    var c = parser.startLine;
    var d = parser.lastLine;
    var e = parser.lastIndex;
    var f = parser.startIndex;
    var saveTokenRaw = parser.tokenRaw;
    var saveToken = parser.token;
    var saveLastChar = parser.lastChar;
    var savetokenRegExp = parser.tokenRegExp;
    var janie = callback(parser, context);
    parser.index = savePos;
    parser.token = saveToken;
    parser.tokenValue = saveTokenValue;
    parser.tokenValue = saveTokenValue;
    parser.flags = saveFlags;
    parser.line = saveLine;
    parser.column = saveColumn;
    parser.tokenRaw = saveTokenRaw;
    parser.lastChar = saveLastChar;
    parser.startColumn = a;
    parser.lastColumn = b;
    parser.startLine = c;
    parser.lastLine = d;
    parser.lastIndex = e;
    parser.startIndex = f;
    parser.tokenRegExp = savetokenRegExp; //    advanceOnMatch(parser, context, isLexical);
    return janie;
}
// Sanitizes characters for better human readability.
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
function nextToken(parser, context) {
    parser.lastIndex = parser.index;
    parser.lastLine = parser.line;
    parser.lastColumn = parser.column;
    return parser.token = seek(parser, context);
}
function consume(parser, context, t) {
    if (parser.token === t) {
        nextToken(parser, context);
        return true;
    }
    return false;
}
var hasBit = function (mask, flags) { return (mask & flags) === flags; };
function isolateCoverGrammar(parser, context, callback, precedence) {
    if ( precedence === void 0 ) precedence = 0;

    var savedBinding = !!(parser.flags & 2 /* AllowBinding */);
    var savedAssignment = !!(parser.flags & 4 /* AllowDestructuring */);
    var previouspendingExpressionError = parser.pendingExpressionError;
    parser.flags |= 2 /* AllowBinding */ | 4 /* AllowDestructuring */;
    parser.pendingExpressionError = null;
    var result = precedence > 0 ? callback(parser, context, precedence) : callback(parser, context, 0);
    if (parser.pendingExpressionError !== null) {
        return report(parser, 0 /* Unexpected */);
    }
    if (savedBinding)
        { parser.flags |= 2 /* AllowBinding */; }
    else
        { parser.flags &= ~2 /* AllowBinding */; }
    if (savedAssignment)
        { parser.flags |= 4 /* AllowDestructuring */; }
    else
        { parser.flags &= ~4 /* AllowDestructuring */; }
    parser.pendingExpressionError = previouspendingExpressionError;
    return result;
}
function isolateCoverGrammarWithLocation(parser, context, callback, pos, precedence) {
    if ( precedence === void 0 ) precedence = 0;

    var savedBinding = !!(parser.flags & 2 /* AllowBinding */);
    var savedAssignment = !!(parser.flags & 4 /* AllowDestructuring */);
    var previouspendingExpressionError = parser.pendingExpressionError;
    parser.flags |= 2 /* AllowBinding */ | 4 /* AllowDestructuring */;
    parser.pendingExpressionError = null;
    var result = callback(parser, context, precedence, pos);
    if (parser.pendingExpressionError !== null) {
        return report(parser, 0 /* Unexpected */);
    }
    if (savedBinding) {
        parser.flags |= 2 /* AllowBinding */;
    }
    else
        { parser.flags &= ~2 /* AllowBinding */; }
    if (savedAssignment) {
        parser.flags |= 4 /* AllowDestructuring */;
    }
    else
        { parser.flags &= ~4 /* AllowDestructuring */; }
    parser.pendingExpressionError = previouspendingExpressionError;
    return result;
}
function deriveGrammar(parser, context, callback) {
    var savedBinding = !!(parser.flags & 2 /* AllowBinding */);
    var savedAssignment = !!(parser.flags & 4 /* AllowDestructuring */);
    var previouspendingExpressionError = parser.pendingExpressionError;
    parser.flags |= 2 /* AllowBinding */ | 4 /* AllowDestructuring */;
    parser.pendingExpressionError = null;
    var result = callback(parser, context, 0);
    if (parser.flags & 2 /* AllowBinding */ && savedBinding)
        { parser.flags |= 2 /* AllowBinding */; }
    else
        { parser.flags &= ~2 /* AllowBinding */; }
    if (!!(parser.flags & 4 /* AllowDestructuring */) &&
        savedAssignment)
        { parser.flags |= 4 /* AllowDestructuring */; }
    else
        { parser.flags &= ~4 /* AllowDestructuring */; }
    parser.pendingExpressionError = previouspendingExpressionError || parser.pendingExpressionError;
    return result;
}
// deriveGrammarGrammarWithLocation(parser, context, parseBinaryExpression, 0, pos);
// const test = parseBinaryExpression(parser, context, 0, pos);
function deriveGrammarGrammarWithLocation(parser, context, callback, pos, precedence) {
    if ( precedence === void 0 ) precedence = 0;

    var savedBinding = !!(parser.flags & 2 /* AllowBinding */);
    var savedAssignment = !!(parser.flags & 4 /* AllowDestructuring */);
    var previouspendingExpressionError = parser.pendingExpressionError;
    parser.flags |= 2 /* AllowBinding */ | 4 /* AllowDestructuring */;
    parser.pendingExpressionError = null;
    var result = callback(parser, context, 0, pos);
    if (parser.flags & 2 /* AllowBinding */ && savedBinding)
        { parser.flags |= 2 /* AllowBinding */; }
    else
        { parser.flags &= ~2 /* AllowBinding */; }
    if (!!(parser.flags & 4 /* AllowDestructuring */) &&
        savedAssignment)
        { parser.flags |= 4 /* AllowDestructuring */; }
    else
        { parser.flags &= ~4 /* AllowDestructuring */; }
    parser.pendingExpressionError = previouspendingExpressionError || parser.pendingExpressionError;
    return result;
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
var toAssignable = function (parser, context, node) {
    switch (node.type) {
        case 'ArrayPattern':
        case 'AssignmentPattern':
        case 'ObjectPattern':
        case 'RestElement':
        case 'MetaProperty':
        case 'Identifier':
            return;
        case 'ArrayExpression':
            node.type = 'ArrayPattern';
            for (var i = 0; i < node.elements.length; ++i) {
                // skip holes in pattern
                if (node.elements[i] !== null) {
                    toAssignable(parser, context, node.elements[i]);
                }
            }
            return;
        case 'ObjectExpression':
            node.type = 'ObjectPattern';
            for (var i$1 = 0; i$1 < node.properties.length; i$1++) {
                toAssignable(parser, context, node.properties[i$1]);
            }
            return;
        case 'Property':
            toAssignable(parser, context, node.value);
            return;
        case 'SpreadElement':
            node.type = 'RestElement';
            toAssignable(parser, context, node.argument);
            break;
        case 'AssignmentExpression':
            if (node.operator !== '=') {
                return report(parser, 0 /* Unexpected */);
            }
            node.type = 'AssignmentPattern';
            delete node.operator; // operator is not relevant for assignment pattern
            toAssignable(parser, context, node.left); // recursive descent
            return;
        case 'MemberExpression':
            if (!(context & 65536 /* InParameter */))
                { return; }
        // Fall through
        default:
            report(parser, 0 /* Unexpected */);
    }
};
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
    if (parser.flags & 1 /* NewLine */)
        { return true; }
    if (token & 268435456 /* ASI */) {
        return consume(parser, context, 268435473 /* Semicolon */);
    }
    report(parser, 1 /* UnexpectedToken */, tokenDesc(token));
    return false;
}
function isIdentifier(context, t) {
    if (context & 256 /* Strict */) {
        if (t & 1048576 /* IsYield */)
            { return false; }
        return (t & 67108864 /* IsIdentifier */) === 67108864 /* IsIdentifier */ ||
            (t & 9216 /* Contextual */) === 9216 /* Contextual */;
    }
    return (t & 67108864 /* IsIdentifier */) === 67108864 /* IsIdentifier */ ||
        (t & 9216 /* Contextual */) === 9216 /* Contextual */ ||
        (t & 5120 /* FutureReserved */) === 5120 /* FutureReserved */;
}
/*
function isLet() const {
    return CurrentMatches(Token::LET) ||
           CurrentMatchesContextualEscaped(Token::LET);
  } */
function isLexical(parser, context) {
    nextToken(parser, context);
    var token = parser.token;
    return !!(token & (67108864 /* IsIdentifier */ | 16777216 /* IsBindingPattern */ | 1048576 /* IsYield */ | 2097152 /* IsAwait */) ||
        token === 21576 /* LetKeyword */ ||
        (token & 9216 /* Contextual */) === 9216 /* Contextual */);
}
function isEndOfCaseOrDefaultClauses(parser) {
    return parser.token === 3152 /* DefaultKeyword */ ||
        parser.token === 301989903 /* RightBrace */ ||
        parser.token === 3147 /* CaseKeyword */;
}

function skipToNewline(parser, state) {
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case 13 /* CarriageReturn */:
                parser.flags |= 1 /* NewLine */;
                advanceNewline(parser);
                if (hasNext(parser) && nextChar(parser) === 10 /* LineFeed */)
                    { parser.index++; }
                return state | 1 /* NewLine */;
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                parser.flags |= 1 /* NewLine */;
                advanceNewline(parser);
                return state | 1 /* NewLine */;
            default:
                consumeAny(parser);
        }
    }
    return state;
}
function skipBlockComment(parser, state) {
    while (hasNext(parser)) {
        switch (nextChar(parser)) {
            case 42 /* Asterisk */:
                advanceOne(parser);
                state &= ~4 /* LastIsCR */;
                if (consumeOpt(parser, 47 /* Slash */))
                    { return state; }
                break;
            case 13 /* CarriageReturn */:
                parser.flags |= 1 /* NewLine */;
                state |= 1 /* NewLine */ | 4 /* LastIsCR */;
                advanceNewline(parser);
                break;
            case 10 /* LineFeed */:
                parser.flags |= 1 /* NewLine */;
                consumeLineFeed(parser, (state & 4 /* LastIsCR */) !== 0);
                state = state & ~4 /* LastIsCR */ | 1 /* NewLine */;
                break;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                parser.flags |= 1 /* NewLine */;
                state = state & ~4 /* LastIsCR */ | 1 /* NewLine */;
                advanceNewline(parser);
                break;
            default:
                state &= ~4 /* LastIsCR */;
                consumeAny(parser);
        }
    }
    report(parser, 5 /* UnterminatedComment */);
}
function seek(parser, context) {
    parser.flags &= ~1 /* NewLine */;
    var state = parser.index === 0 ? 8 /* LineStart */ : 0;
    while (hasNext(parser)) {
        if (context & 2 /* OptionsRanges */ && !(state & 8 /* LineStart */)) {
            parser.startIndex = parser.index;
            parser.startColumn = parser.column;
            parser.startLine = parser.line;
        }
        var first = nextChar(parser);
        if (first >= 128 /* Size */)
            { return scanMaybeIdentifier(parser, context); }
        switch (first) {
            case 13 /* CarriageReturn */:
                parser.flags |= 1 /* NewLine */;
                state |= 1 /* NewLine */ | 4 /* LastIsCR */;
                advanceNewline(parser);
                break;
            case 10 /* LineFeed */:
                parser.flags |= 1 /* NewLine */;
                consumeLineFeed(parser, (state & 4 /* LastIsCR */) !== 0);
                state = state & ~4 /* LastIsCR */ | 1 /* NewLine */;
                break;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                parser.flags |= 1 /* NewLine */;
                state = state & ~4 /* LastIsCR */ | 1 /* NewLine */;
                advanceNewline(parser);
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
                state |= 2 /* SameLine */;
                advanceOne(parser);
                break;
            // `/`, `/=`, `/>`
            case 47 /* Slash */:
                {
                    advanceOne(parser);
                    state |= 2 /* SameLine */;
                    if (hasNext(parser)) {
                        var ch = nextChar(parser);
                        if (ch === 47 /* Slash */) {
                            advanceOne(parser);
                            state = skipToNewline(parser, state);
                            continue;
                        }
                        else if (ch === 42 /* Asterisk */) {
                            advanceOne(parser);
                            state = skipBlockComment(parser, state);
                            continue;
                        }
                        else if (ch === 61 /* EqualSign */) {
                            advanceOne(parser);
                            return 81957 /* DivideAssign */;
                        }
                        else if (ch === 62 /* GreaterThan */) {
                            advanceOne(parser);
                            return 26 /* JSXAutoClose */;
                        }
                    }
                    return 150069 /* Divide */;
                }
            // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
            case 60 /* LessThan */:
                advanceOne(parser); // skip `<`
                if (!hasNext(parser))
                    { return 149311 /* LessThan */; }
                if (!(context & 512 /* Module */) &&
                    consumeOpt(parser, 33 /* Exclamation */) &&
                    consumeOpt(parser, 45 /* Hyphen */) &&
                    consumeOpt(parser, 45 /* Hyphen */)) {
                    state = skipToNewline(parser, state);
                    continue;
                }
                switch (nextChar(parser)) {
                    case 60 /* LessThan */:
                        advanceOne(parser);
                        if (consumeOpt(parser, 61 /* EqualSign */)) {
                            return 65566 /* ShiftLeftAssign */;
                        }
                        else {
                            return 149569 /* ShiftLeft */;
                        }
                    case 61 /* EqualSign */:
                        advanceOne(parser);
                        return 149309 /* LessThanOrEqual */;
                    case 47 /* Slash */:
                        {
                            if (!(context & 4 /* OptionsJSX */))
                                { break; }
                            var index = parser.index + 1;
                            // Check that it's not a comment start.
                            if (index < parser.source.length) {
                                var next = parser.source.charCodeAt(index);
                                if (next === 42 /* Asterisk */ || next === 47 /* Slash */)
                                    { break; }
                            }
                            advanceOne(parser);
                            return 25 /* JSXClose */;
                        }
                    default:// ignore
                        return 149311 /* LessThan */;
                }
            // `-`, `--`, `-=`
            case 45 /* Hyphen */:
                {
                    advanceOne(parser); // skip `-`
                    if (!hasNext(parser))
                        { return 411952 /* Subtract */; }
                    var next$1 = nextChar(parser);
                    if (next$1 === 45 /* Hyphen */) {
                        advanceOne(parser);
                        if (!consumeOpt(parser, 62 /* GreaterThan */))
                            { return 540700 /* Decrement */; }
                        if (state & (8 /* LineStart */ | 1 /* NewLine */)) {
                            state = skipToNewline(parser, state);
                            continue;
                        }
                    }
                    if (next$1 === 61 /* EqualSign */) {
                        advanceOne(parser);
                        return 65571 /* SubtractAssign */;
                    }
                    return 411952 /* Subtract */;
                }
            // `!`, `!=`, `!==`
            case 33 /* Exclamation */:
                advanceOne(parser);
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
                advanceOne(parser);
                if (!consumeOpt(parser, 61 /* EqualSign */))
                    { return 150068 /* Modulo */; }
                return 65574 /* ModuloAssign */;
            // `&`, `&&`, `&=`
            case 38 /* Ampersand */:
                {
                    advanceOne(parser);
                    if (!hasNext(parser))
                        { return 148804 /* BitwiseAnd */; }
                    var next$2 = nextChar(parser);
                    if (next$2 === 38 /* Ampersand */) {
                        advanceOne(parser);
                        return 8536631 /* LogicalAnd */;
                    }
                    if (next$2 === 61 /* EqualSign */) {
                        advanceOne(parser);
                        return 65577 /* BitwiseAndAssign */;
                    }
                    return 148804 /* BitwiseAnd */;
                }
            // `*`, `**`, `*=`, `**=`
            case 42 /* Asterisk */:
                {
                    advanceOne(parser);
                    if (!hasNext(parser))
                        { return 1198643 /* Multiply */; }
                    var next$3 = nextChar(parser);
                    if (next$3 === 61 /* EqualSign */) {
                        advanceOne(parser);
                        return 65572 /* MultiplyAssign */;
                    }
                    if (next$3 !== 42 /* Asterisk */)
                        { return 1198643 /* Multiply */; }
                    advanceOne(parser);
                    if (!consumeOpt(parser, 61 /* EqualSign */))
                        { return 150326 /* Exponentiate */; }
                    return 65569 /* ExponentiateAssign */;
                }
            // `+`, `++`, `+=`
            case 43 /* Plus */:
                {
                    advanceOne(parser);
                    if (!hasNext(parser))
                        { return 411951 /* Add */; }
                    var next$4 = nextChar(parser);
                    if (next$4 === 43 /* Plus */) {
                        advanceOne(parser);
                        return 540699 /* Increment */;
                    }
                    if (next$4 === 61 /* EqualSign */) {
                        advanceOne(parser);
                        return 65570 /* AddAssign */;
                    }
                    return 411951 /* Add */;
                }
            // `.`, `...`, `.123` (numeric literal)
            case 46 /* Period */:
                {
                    var index$1 = parser.index + 1;
                    if (index$1 < parser.source.length) {
                        var next$5 = parser.source.charCodeAt(index$1);
                        if (next$5 === 46 /* Period */) {
                            index$1++;
                            if (index$1 < parser.source.length &&
                                parser.source.charCodeAt(index$1) === 46 /* Period */) {
                                parser.index = index$1 + 1;
                                parser.column += 3;
                                return 14 /* Ellipsis */;
                            }
                        }
                        else if (next$5 >= 48 /* Zero */ && next$5 <= 57 /* Nine */) {
                            // Rewind the initial token.
                            scanNumeric(parser, context);
                            return 16386 /* NumericLiteral */;
                        }
                    }
                    advanceOne(parser);
                    return 33554445 /* Period */;
                }
            // `0`...`9`
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
                return scanNumeric(parser, context);
            // `#`
            case 35 /* Hash */:
                {
                    advanceOne(parser);
                    var index$2 = parser.index + 1;
                    var next$6 = parser.source.charCodeAt(index$2);
                    if (state & 8 /* LineStart */ &&
                        next$6 === 33 /* Exclamation */) {
                        parser.index = index$2 + 1;
                        skipToNewline(parser, 0 /* None */);
                        continue;
                    }
                    return scanPrivateName(parser, context, first);
                }
            // `(`
            case 40 /* LeftParen */:
                advanceOne(parser);
                return 33570827 /* LeftParen */;
            // `)`
            case 41 /* RightParen */:
                advanceOne(parser);
                return 16 /* RightParen */;
            // `,`
            case 44 /* Comma */:
                advanceOne(parser);
                return 33554450 /* Comma */;
            // `:`
            case 58 /* Colon */:
                advanceOne(parser);
                return 33554453 /* Colon */;
            // `;`
            case 59 /* Semicolon */:
                advanceOne(parser);
                return 268435473 /* Semicolon */;
            // `?`
            case 63 /* QuestionMark */:
                advanceOne(parser);
                return 22 /* QuestionMark */;
            // `]`
            case 93 /* RightBracket */:
                advanceOne(parser);
                return 20 /* RightBracket */;
            // `{`
            case 123 /* LeftBrace */:
                advanceOne(parser);
                return 16793612 /* LeftBrace */;
            // `}`
            case 125 /* RightBrace */:
                advanceOne(parser);
                return 301989903 /* RightBrace */;
            // `~`
            case 126 /* Tilde */:
                advanceOne(parser);
                return 278574 /* Complement */;
            // `=`, `==`, `===`, `=>`
            case 61 /* EqualSign */:
                {
                    advanceOne(parser);
                    if (!hasNext(parser))
                        { return 33619997 /* Assign */; }
                    var next$7 = nextChar(parser);
                    if (next$7 === 61 /* EqualSign */) {
                        advanceOne(parser);
                        if (consumeOpt(parser, 61 /* EqualSign */)) {
                            return 149049 /* StrictEqual */;
                        }
                        else {
                            return 149051 /* LooseEqual */;
                        }
                    }
                    else if (next$7 === 62 /* GreaterThan */) {
                        advanceOne(parser);
                        return 10 /* Arrow */;
                    }
                    return 33619997 /* Assign */;
                }
            // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
            case 62 /* GreaterThan */:
                {
                    advanceOne(parser);
                    if (!hasNext(parser))
                        { return 149312 /* GreaterThan */; }
                    var next$8 = nextChar(parser);
                    if (next$8 === 61 /* EqualSign */) {
                        advanceOne(parser);
                        return 149310 /* GreaterThanOrEqual */;
                    }
                    if (next$8 !== 62 /* GreaterThan */)
                        { return 149312 /* GreaterThan */; }
                    advanceOne(parser);
                    if (hasNext(parser)) {
                        var next$9 = nextChar(parser);
                        if (next$9 === 62 /* GreaterThan */) {
                            advanceOne(parser);
                            if (consumeOpt(parser, 61 /* EqualSign */)) {
                                return 65568 /* LogicalShiftRightAssign */;
                            }
                            else {
                                return 149571 /* LogicalShiftRight */;
                            }
                        }
                        else if (next$9 === 61 /* EqualSign */) {
                            advanceOne(parser);
                            return 65567 /* ShiftRightAssign */;
                        }
                    }
                    return 149570 /* ShiftRight */;
                }
            // `[`
            case 91 /* LeftBracket */:
                advanceOne(parser);
                return 16793619 /* LeftBracket */;
            // `\\u{N}var`
            case 92 /* Backslash */:
                return scanKnownIdentifier(parser, context);
            // `^`, `^=`
            case 94 /* Caret */:
                advanceOne(parser);
                if (!consumeOpt(parser, 61 /* EqualSign */))
                    { return 148550 /* BitwiseXor */; }
                return 65575 /* BitwiseXorAssign */;
            // ``string``
            case 96 /* Backtick */:
                return scanTemplate(parser, context, first);
            // `|`, `||`, `|=`
            case 124 /* VerticalBar */:
                {
                    advanceOne(parser);
                    if (!hasNext(parser))
                        { return 148293 /* BitwiseOr */; }
                    var next$10 = nextChar(parser);
                    if (next$10 === 124 /* VerticalBar */) {
                        advanceOne(parser);
                        return 8536376 /* LogicalOr */;
                    }
                    else if (next$10 === 61 /* EqualSign */) {
                        advanceOne(parser);
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
                return scanKnownIdentifier(parser, context);
            default:
                report(parser, 7 /* UnexpectedChar */, escapeForPrinting(nextUnicodeChar(parser)));
        }
    }
    return 268435456 /* EndOfSource */;
}

function scanKnownIdentifier(parser, context) {
    var start = parser.index;
    var ret = '';
    while (hasNext(parser)) {
        var ch = nextChar(parser);
        if (!isValidIdentifierPart(ch))
            { break; }
        advanceOne(parser);
    }
    if (start < parser.index)
        { ret += parser.source.slice(start, parser.index); }
    parser.tokenValue = ret;
    var len = ret.length;
    // Keywords are between 2 and 11 characters long and start with a lowercase letter
    if (len >= 2 && len <= 11) {
        var token = descKeyword(ret);
        if (token > 0)
            { return token; }
    }
    return 67125249 /* Identifier */;
}
function scanMaybeIdentifier(parser, context) {
    // TODO
    return unimplemented();
}
// TODO
// - Split into strict/sloppy (performance)
// - Handle initial 0 and 1-9 separately
function scanNumeric(parser, context) {
    // TODO
    var start = parser.index;
    var value = 0;
    while (hasNext(parser)) {
        var ch = nextChar(parser);
        if (ch >= 48 /* Zero */ && ch <= 57 /* Nine */) {
            value = value * 10 + (ch - 48 /* Zero */);
            advanceOne(parser);
        }
        else
            { break; }
    }
    parser.tokenValue = value;
    if (context & 8 /* OptionsRaw */)
        { storeRaw(parser, start); }
    return 16386 /* NumericLiteral */;
}
// This actually handles all normal string character parsing, including both strings and templates.
// It returns a number to avoid prematurely allocating a string, and so I can return some signaling
// negatives in case of atypical conditions (e.g. errors, escaped line terminators), since templates
// should only error in the cases of unterminated strings.
function readNext(parser, prev) {
    advance(parser, prev);
    if (!hasNext(parser))
        { report(parser, 11 /* UnicodeOutOfRange */); }
    return nextUnicodeChar(parser);
}
function parseEscape(parser, context, first) {
    switch (first) {
        // Magic escapes
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
        // Line continuations
        case 13 /* CarriageReturn */:
            {
                var index = parser.index;
                if (index < parser.source.length) {
                    var ch = parser.source.charCodeAt(index);
                    if (ch === 10 /* LineFeed */) {
                        parser.lastChar = ch;
                        parser.index = index + 1;
                    }
                }
            }
        // falls through
        case 10 /* LineFeed */:
        case 8232 /* LineSeparator */:
        case 8233 /* ParagraphSeparator */:
            parser.column = -1;
            parser.line++;
            return -1 /* Empty */;
        // Null character, octals
        case 48 /* Zero */:
        case 49 /* One */:
        case 50 /* Two */:
        case 51 /* Three */:
            {
                var code = first - 48;
                var index$1 = parser.index + 1;
                var column = parser.column + 1;
                if (index$1 < parser.source.length) {
                    var next = parser.source.charCodeAt(index$1);
                    if (next < 48 /* Zero */ || next > 55 /* Seven */) {
                        // Verify that it's `\0` if we're in strict mode.
                        if (code !== 0 && context & 256 /* Strict */)
                            { return -2 /* StrictOctal */; }
                    }
                    else if (context & 256 /* Strict */) {
                        // This happens in cases like `\00` in strict mode.
                        return -2 /* StrictOctal */;
                    }
                    else {
                        parser.lastChar = next;
                        code = (code << 3) | (next - 48 /* Zero */);
                        index$1++;
                        column++;
                        if (index$1 < parser.source.length) {
                            var next$1 = parser.source.charCodeAt(index$1);
                            if (next$1 >= 48 /* Zero */ && next$1 <= 55 /* Seven */) {
                                parser.lastChar = next$1;
                                code = (code << 3) | (next$1 - 48 /* Zero */);
                                index$1++;
                                column++;
                            }
                        }
                        parser.index = index$1 - 1;
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
                if (context & 256 /* Strict */)
                    { return -2 /* StrictOctal */; }
                var code$1 = first - 48;
                var index$2 = parser.index + 1;
                var column$1 = parser.column + 1;
                if (index$2 < parser.source.length) {
                    var next$2 = parser.source.charCodeAt(index$2);
                    if (next$2 >= 48 /* Zero */ && next$2 <= 55 /* Seven */) {
                        code$1 = (code$1 << 3) | (next$2 - 48 /* Zero */);
                        parser.lastChar = next$2;
                        parser.index = index$2;
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
                var ch1 = parser.lastChar = readNext(parser, first);
                var hi = toHex(ch1);
                if (hi < 0)
                    { return -4 /* InvalidHex */; }
                var ch2 = parser.lastChar = readNext(parser, ch1);
                var lo = toHex(ch2);
                if (lo < 0)
                    { return -4 /* InvalidHex */; }
                return hi << 4 | lo;
            }
        // UCS-2/Unicode escapes
        case 117 /* LowerU */:
            {
                var ch$1 = parser.lastChar = readNext(parser, first);
                if (ch$1 === 123 /* LeftBrace */) {
                    // \u{N}
                    // The first digit is required, so handle it *out* of the loop.
                    ch$1 = parser.lastChar = readNext(parser, ch$1);
                    var code$2 = toHex(ch$1);
                    if (code$2 < 0)
                        { return -4 /* InvalidHex */; }
                    ch$1 = parser.lastChar = readNext(parser, ch$1);
                    while (ch$1 !== 125 /* RightBrace */) {
                        var digit = toHex(ch$1);
                        if (digit < 0)
                            { return -4 /* InvalidHex */; }
                        code$2 = code$2 << 4 | digit;
                        // Check this early to avoid `code` wrapping to a negative on overflow (which is
                        // reserved for abnormal conditions).
                        if (code$2 > 1114111 /* LastUnicodeChar */)
                            { return -5 /* OutOfRange */; }
                        ch$1 = parser.lastChar = readNext(parser, ch$1);
                    }
                    return code$2;
                }
                else {
                    // \uNNNN
                    var code$3 = toHex(ch$1);
                    if (code$3 < 0)
                        { return -4 /* InvalidHex */; }
                    for (var i = 0; i < 3; i++) {
                        ch$1 = parser.lastChar = readNext(parser, ch$1);
                        var digit$1 = toHex(ch$1);
                        if (digit$1 < 0)
                            { return -4 /* InvalidHex */; }
                        code$3 = code$3 << 4 | digit$1;
                    }
                    return code$3;
                }
            }
        default:
            return nextUnicodeChar(parser);
    }
}
function handleStringError(parser, code, index, line, column) {
    switch (code) {
        case -1 /* Empty */:
            return;
        case -2 /* StrictOctal */:
            report(parser, 8 /* StrictOctalEscape */);
        case -3 /* EightOrNine */:
            report(parser, 9 /* InvalidEightAndNine */);
        case -4 /* InvalidHex */:
            report(parser, 10 /* InvalidHexEscapeSequence */);
        case -5 /* OutOfRange */:
            report(parser, 11 /* UnicodeOutOfRange */);
        default:
    }
}
/**
 * Scan a string token.
 */
function scanString(parser, context, quote) {
    var start = parser.index;
    var lastChar = parser.lastChar;
    var ret = '';
    var ch = readNext(parser, quote);
    while (ch !== quote) {
        var index = parser.index;
        var line = parser.line;
        var column = parser.column;
        switch (ch) {
            case 13 /* CarriageReturn */:
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                report(parser, 3 /* UnterminatedString */);
            case 92 /* Backslash */:
                ch = readNext(parser, ch);
                if (ch >= 128 /* Size */) {
                    ret += fromCodePoint(ch);
                }
                else {
                    parser.lastChar = ch;
                    var code = parseEscape(parser, context, ch);
                    if (code >= 0)
                        { ret += fromCodePoint(code); }
                    else
                        { handleStringError(parser, code, index, line, column); }
                    ch = parser.lastChar;
                }
                break;
            default:
                ret += fromCodePoint(ch);
        }
        ch = readNext(parser, ch);
    }
    advance(parser, ch); // Consume the quote
    if (context & 8 /* OptionsRaw */)
        { storeRaw(parser, start); }
    parser.tokenValue = ret;
    parser.lastChar = lastChar;
    return 16387 /* StringLiteral */;
}
// Fallback for looser template segment validation (no actual parsing).
// It returns `ch` as negative iff the segment ends with `${`
function scanBadTemplate(parser, ch) {
    while (ch !== 96 /* Backtick */) {
        // Break after a literal `${` (thus the dedicated code path).
        switch (ch) {
            case 36 /* Dollar */:
                {
                    var index = parser.index + 1;
                    if (index < parser.source.length &&
                        parser.source.charCodeAt(index) === 123 /* LeftBrace */) {
                        parser.index = index;
                        parser.column++;
                        return -ch;
                    }
                    break;
                }
            case 92 /* Backslash */:
                ch = readNext(parser, ch);
                break;
            case 13 /* CarriageReturn */:
                if (hasNext(parser) && nextChar(parser) === 10 /* LineFeed */) {
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
        }
        ch = readNext(parser, ch);
    }
    return ch;
}
/**
 * Scan a template section. It can start either from the quote or closing brace.
 */
function scanTemplate(parser, context, first) {
    var start = parser.index;
    var lastChar = parser.lastChar;
    var tail = true;
    var ret = '';
    var ch = readNext(parser, first);
    loop: while (ch !== 96 /* Backtick */) {
        var index = parser.index;
        var line = parser.line;
        var column = parser.column;
        switch (ch) {
            // Break after a literal `${` (thus the dedicated code path).
            case 36 /* Dollar */:
                {
                    var index$1 = parser.index + 1;
                    if (index$1 < parser.source.length &&
                        parser.source.charCodeAt(index$1) === 123 /* LeftBrace */) {
                        parser.index = index$1;
                        parser.column++;
                        tail = false;
                        break loop;
                    }
                    ret += '$';
                    break;
                }
            case 92 /* Backslash */:
                ch = readNext(parser, ch);
                if (ch >= 128 /* Size */) {
                    ret += fromCodePoint(ch);
                }
                else {
                    parser.lastChar = ch;
                    var code = parseEscape(parser, context, ch);
                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    }
                    else if (code !== -1 /* Empty */ && context & 2048 /* TaggedTemplate */) {
                        ret = undefined;
                        ch = scanBadTemplate(parser, parser.lastChar);
                        if (ch < 0) {
                            ch = -ch;
                            tail = false;
                        }
                        break loop;
                    }
                    else {
                        handleStringError(parser, code, index, line, column);
                    }
                    ch = parser.lastChar;
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
    advance(parser, ch); // Consume the quote or opening brace
    parser.tokenValue = ret;
    parser.lastChar = lastChar;
    if (tail) {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 1);
        return 16393 /* TemplateTail */;
    }
    else {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 2);
        return 16392 /* TemplateCont */;
    }
}

// 12.15.5 Destructuring Assignment
/**
 * Parses either a binding identifier or binding pattern
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseBindingIdentifierOrPattern(parser, context) {
    var token = parser.token;
    if (token === 16793619 /* LeftBracket */) {
        return parseArrayAssignmentPattern(parser, context);
    }
    else if (token === 16793612 /* LeftBrace */) {
        return parserObjectAssignmentPattern(parser, context);
    }
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
    if (context & 256 /* Strict */ && token & 134217728 /* IsEvalOrArguments */) {
        report(parser, 14 /* StrictLHSAssignment */);
    }
    else if (context & 1048576 /* BlockScope */ && token === 21576 /* LetKeyword */) {
        // let is disallowed as a lexically bound name
        report(parser, 24 /* LetInLexicalBinding */);
    }
    else if (!isIdentifier(context, token)) {
        report(parser, 1 /* UnexpectedToken */, tokenDesc(token));
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
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAssignmentRestElement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var argument = parseBindingIdentifierOrPattern(parser, context);
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
                elements.push(parseAssignmentRestElement(parser, context));
                break;
            }
            else {
                elements.push(parseAssignmentOrArrayAssignmentPattern(parser, context | 8192 /* AllowIn */));
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
 * Parse object rest property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestProperty)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function parseAssignmentRestProperty(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var argument = parseBindingIdentifierOrPattern(parser, context);
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument: argument
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
    while (parser.token !== 301989903 /* RightBrace */) {
        if (parser.token === 14 /* Ellipsis */) {
            properties.push(parseAssignmentRestProperty(parser, context));
        }
        else {
            properties.push(parseBindingProperty(parser, context));
            if (parser.token !== 301989903 /* RightBrace */)
                { consume(parser, context, 33554450 /* Comma */); }
        }
    }
    expect(parser, context, 301989903 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'ObjectPattern',
        properties: properties
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

    if (!consume(parser, context, 33619997 /* Assign */))
        { return left; }
    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left: left,
        right: parseAssignmentExpression(parser, context)
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
    var key;
    var value;
    var computed = false;
    var shorthand = false;
    // single name binding
    if (parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
        key = parseIdentifier(parser, context);
        shorthand = !consume(parser, context, 33554453 /* Colon */);
        value = shorthand ?
            parseAssignmentOrArrayAssignmentPattern(parser, context, pos, key) :
            parseAssignmentOrArrayAssignmentPattern(parser, context);
    }
    else {
        computed = parser.token === 16793619 /* LeftBracket */;
        key = parsePropertyName(parser, context);
        expect(parser, context, 33554453 /* Colon */);
        value = parseAssignmentOrArrayAssignmentPattern(parser, context);
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

// Statements and Declarations
// TODO!
//
// - Async
/**
 * Parses statement list items
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementListItem)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseStatementListItem(parser, context) {
    // Sets necessary masks to allow destructuring and binding pattern
    parser.flags |= (4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    switch (parser.token) {
        case 19544 /* FunctionKeyword */:
            return parseFunctionDeclaration(parser, context);
        case 21576 /* LetKeyword */:
            return parseLetOrExpressionStatement(parser, context);
        case 19529 /* ConstKeyword */:
            return parseVariableStatement(parser, context | 1048576 /* BlockScope */);
        default:
            return parseStatement(parser, context | 524288 /* AllowSingleStatement */);
    }
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
            return parseVariableStatement(parser, context);
        case 268435473 /* Semicolon */:
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
            return parseForStatement(parser, context | 2097152 /* ForStatement */);
        case 19544 /* FunctionKeyword */:
            report(parser, context & 256 /* Strict */ ? 16 /* StrictFunction */ : 17 /* SloppyFunction */);
        case 19533 /* ClassKeyword */:
            report(parser, 18 /* ForbiddenAsStatement */, tokenDesc(parser.token));
        default:
            return parseExpressionOrLabeledStatement(parser, context);
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
        report(parser, 27 /* InvalidNestedStatement */, tokenDesc(parser.token));
    }
    var label = null;
    var tokenValue = parser.tokenValue;
    if (!(parser.flags & 1 /* NewLine */) && (parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */))) {
        label = parseIdentifier(parser, context);
        validateBreakOrContinueLabel(parser, tokenValue, /* isContinue */ true);
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
    // a 'deopt' when getting the identifier value (*if any*)
    var tokenValue = parser.tokenValue;
    if (!(parser.flags & 1 /* NewLine */) && (parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */))) {
        label = parseIdentifier(parser, context);
        validateBreakOrContinueLabel(parser, tokenValue, /* isContinue */ false);
    }
    else if (!(parser.flags & 48 /* AllowBreakOrContinue */)) {
        this.tolerate(context, 27 /* InvalidNestedStatement */, 'break');
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
    var test = parseExpression(parser, context | 8192 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    var consequent = parseConsequentOrAlternate(parser, context);
    var alternate = null;
    if (consume(parser, context, 3154 /* ElseKeyword */)) {
        alternate = parseConsequentOrAlternate(parser, context);
    }
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
    return context & 256 /* Strict */ || parser.token !== 19544 /* FunctionKeyword */ ?
        parseStatement(parser, context & ~524288 /* AllowSingleStatement */) :
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
    if (!handler && !finalizer) {
        report(parser, 0 /* Unexpected */);
    }
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
    var hasBinding;
    // Optional catch binding - Stage 3 proposal
    if (context & 1 /* OptionsNext */) {
        hasBinding = consume(parser, context, 33570827 /* LeftParen */);
    }
    else {
        hasBinding = true;
        expect(parser, context, 33570827 /* LeftParen */);
    }
    if (hasBinding) {
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
        { report(parser, 0 /* Unexpected */); }
    var argument = parseExpression(parser, context | 8192 /* AllowIn */);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ThrowStatement',
        argument: argument
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
function parseExpressionOrLabeledStatement(parser, context) {
    var pos = getLocation(parser);
    var tokenValue = parser.tokenValue;
    var expr = parseExpression(parser, context | 8192 /* AllowIn */);
    if (parser.token === 33554453 /* Colon */ && expr.type === 'Identifier') {
        expect(parser, context, 33554453 /* Colon */);
        if (hasLabel(parser, tokenValue))
            { report(parser, 26 /* LabelRedeclaration */, tokenValue); }
        addLabel(parser, tokenValue);
        var body;
        if (!(context & 256 /* Strict */) &&
            (context & 524288 /* AllowSingleStatement */) &&
            parser.token === 19544 /* FunctionKeyword */) {
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
    var savedFlags = parser.flags;
    parser.flags |= 32 /* Iteration */;
    var body = parseStatement(parser, context & ~524288 /* AllowSingleStatement */);
    parser.flags = savedFlags;
    expect(parser, context, 1073744994 /* WhileKeyword */);
    expect(parser, context, 33570827 /* LeftParen */);
    var test = parseExpression(parser, context | 8192 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    consume(parser, context, 268435473 /* Semicolon */);
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
    var test = parseExpression(parser, context | 8192 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    var savedFlags = parser.flags;
    parser.flags |= 32 /* Iteration */;
    var body = parseStatement(parser, context & ~524288 /* AllowSingleStatement */);
    parser.flags = savedFlags;
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
    if (parser.token !== 301989903 /* RightBrace */) {
        while (parser.token !== 301989903 /* RightBrace */) {
            body.push(parseStatementListItem(parser, context));
        }
    }
    expect(parser, context, 301989903 /* RightBrace */);
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
    if (!(context & 262144 /* Return */))
        { report(parser, 15 /* IllegalReturn */); }
    expect(parser, context, 3164 /* ReturnKeyword */);
    var argument = null;
    if (!(parser.token & 268435456 /* ASI */) && !(parser.flags & 1 /* NewLine */)) {
        argument = parseExpression(parser, context | 8192 /* AllowIn */);
    }
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ReturnStatement',
        argument: argument
    });
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
    var pos = getLocation(parser);
    expect(parser, context, 3171 /* WithKeyword */);
    expect(parser, context, 33570827 /* LeftParen */);
    var object = parseExpression(parser, context |= 8192 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    var body = parseStatement(parser, context & ~524288 /* AllowSingleStatement */);
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
    var discriminant = parseExpression(parser, context | 8192 /* AllowIn */);
    expect(parser, context, 16 /* RightParen */);
    expect(parser, context, 16793612 /* LeftBrace */);
    var cases = [];
    var savedFlags = parser.flags;
    parser.flags |= 16 /* Switch */;
    while (parser.token !== 301989903 /* RightBrace */) {
        cases.push(parseCaseOrDefaultClauses(parser, context));
    }
    parser.flags = savedFlags;
    expect(parser, context, 301989903 /* RightBrace */);
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
function parseCaseOrDefaultClauses(parser, context, cases) {
    if ( cases === void 0 ) cases = [];

    var pos = getLocation(parser);
    var test;
    if (consume(parser, context, 3152 /* DefaultKeyword */)) {
        test = null;
    }
    else {
        expect(parser, context, 3147 /* CaseKeyword */);
        test = parseExpression(parser, context);
    }
    expect(parser, context, 33554453 /* Colon */);
    var consequent = [];
    while (!isEndOfCaseOrDefaultClauses(parser)) {
        consequent.push(parseStatementListItem(parser, context));
    }
    return finishNode(context, parser, pos, {
        type: 'SwitchCase',
        test: test,
        consequent: consequent
    });
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
    if (consume(parser, context, 33619997 /* Assign */)) {
        init = parseAssignmentExpression(parser, context & ~(1048576 /* BlockScope */ | 2097152 /* ForStatement */));
        if (parser.token & 536870912 /* IsInOrOf */ && (context & 2097152 /* ForStatement */ || isBindingPattern)) {
            report(parser, 22 /* ForInOfLoopInitializer */, tokenDesc(parser.token));
        }
        // Initializers are required for 'const' and binding patterns
    }
    else if (!(parser.token & 536870912 /* IsInOrOf */) && (isConst || isBindingPattern)) {
        report(parser, 21 /* DeclarationMissingInitializer */, isConst ? 'const' : 'destructuring');
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
    if (context & 2097152 /* ForStatement */ && parser.token & 536870912 /* IsInOrOf */ && list.length !== 1) {
        report(parser, 23 /* ForInOfLoopMultiBindings */, tokenDesc(parser.token));
    }
    return list;
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
        parseVariableStatement(parser, context | 1048576 /* BlockScope */, shouldConsume) :
        parseExpressionOrLabeledStatement(parser, context);
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
    var awaitToken = !!(context & 16384 /* Async */ && consume(parser, context, 2122861 /* AwaitKeyword */));
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
        variableStatement = parseVariableStatement(parser, context & ~8192 /* AllowIn */ | 1048576 /* BlockScope */, /* shouldConsume */ false);
    }
    else if (token === 19527 /* VarKeyword */) {
        variableStatement = parseVariableStatement(parser, context & ~8192 /* AllowIn */, /* shouldConsume */ false);
    }
    else if (token !== 268435473 /* Semicolon */) {
        sequencePos = getLocation(parser);
        // Similar to what's done in SM. Restore the cover grammar to original state, so we avoid
        // unpleasant surprises in the expression code
        init = deriveGrammar(parser, context & ~8192 /* AllowIn */, parseAssignmentExpression);
    }
    if (awaitToken ? expect(parser, context, 536880242 /* OfKeyword */) : consume(parser, context, 536880242 /* OfKeyword */)) {
        type = 'ForOfStatement';
        if (init) {
            if (!(parser.flags & 4 /* AllowDestructuring */) || init.type === 'AssignmentExpression') {
                report(parser, 0 /* Unexpected */);
            }
            toAssignable(parser, context, init);
        }
        else
            { init = variableStatement; }
        right = parseAssignmentExpression(parser, context | 8192 /* AllowIn */);
    }
    else if (consume(parser, context, 537022257 /* InKeyword */)) {
        if (awaitToken)
            { report(parser, 20 /* ForAwaitNotOf */); }
        if (init) {
            if (!(parser.flags & 4 /* AllowDestructuring */))
                { report(parser, 0 /* Unexpected */); }
            toAssignable(parser, context, init);
        }
        else
            { init = variableStatement; }
        type = 'ForInStatement';
        right = parseExpression(parser, context | 8192 /* AllowIn */);
    }
    else {
        if (awaitToken)
            { report(parser, 20 /* ForAwaitNotOf */); }
        if (parser.token === 33554450 /* Comma */)
            { init = parseSequenceExpression(parser, context, init, sequencePos); }
        if (variableStatement)
            { init = variableStatement; }
        expect(parser, context, 268435473 /* Semicolon */);
        test = parser.token !== 268435473 /* Semicolon */ ? parseExpression(parser, context | 8192 /* AllowIn */) : null;
        expect(parser, context, 268435473 /* Semicolon */);
        update = parser.token !== 16 /* RightParen */ ? parseExpression(parser, context | 8192 /* AllowIn */) : null;
    }
    expect(parser, context, 16 /* RightParen */);
    var savedFlags = parser.flags;
    parser.flags |= 32 /* Iteration */;
    var body = parseStatement(parser, context & ~524288 /* AllowSingleStatement */);
    parser.flags = savedFlags;
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

var Parser = function Parser(source, onComment) {
    this.source = source;
    this.onComment = onComment;
    this.flags = 0 /* None */;
    this.index = 0;
    this.line = 1;
    this.column = 0;
    this.startIndex = 0;
    this.startColumn = 0;
    this.startLine = 1;
    this.lastIndex = 0;
    this.lastColumn = 0;
    this.lastLine = 0;
    this.tokenRaw = '';
    this.lastChar = 0;
    this.parsingContext = 0;
    this.token = 0;
    this.pendingExpressionError = 0;
    this.tokenRegExp = undefined;
    this.tokenValue = undefined;
    this.labelSet = undefined;
};
function parseProgram(source, options, context) {
    var onComment;
    if (options != null) {
        if (options.next)
            { context |= 1 /* OptionsNext */; }
        if (options.jsx)
            { context |= 4 /* OptionsJSX */; }
        if (options.ranges)
            { context |= 2 /* OptionsRanges */; }
        if (options.raw)
            { context |= 8 /* OptionsRaw */; }
        if (options.onComment != null)
            { onComment = options.onComment; }
    }
    var parser = new Parser(source, onComment);
    var body = parseStatementList(parser, context);
    var node = {
        type: 'Program',
        sourceType: context & 512 /* Module */ ? 'module' : 'script',
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
    }
    return node;
}
/**
 * Parse a module body, function body, script body, etc.
 */
function parseStatementList(parser, context) {
    var statements = [];
    var directive = parseDirective(parser, context);
    if (directive) {
        if (directive === 2 /* Strict */) {
            context |= 256 /* Strict */;
        }
        statements.push(parseDirectiveNode(parser, context));
    }
    while (parser.token !== 268435456 /* EndOfSource */) {
        statements.push(parseStatementListItem(parser, context));
    }
    return statements;
}
function parseDirective(parser, context) {
    var index = parser.index;
    var token = seek(parser, context);
    var directive = 0;
    if (token !== 16387 /* StringLiteral */) {
        parser.token = token;
        return directive;
    }
    var raw = parser.source.slice(index, parser.index);
    if ((parser.index - index - /* quotes */ 2) === parser.tokenValue.length && parser.tokenValue === 'use strict') {
        directive = 2 /* Strict */;
    }
    else {
        directive = 1 /* Other */;
    }
    parser.token = token;
    parser.tokenRaw = raw.slice(1, -1);
    return directive;
}
function parseDirectiveNode(parser, context) {
    var pos = getLocation(parser);
    var expr = parseExpression(parser, context | 8192 /* AllowIn */);
    consumeSemicolon(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ExpressionStatement',
        expression: expr,
        directive: parser.tokenRaw
    });
}
function parseRestElement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var argument = parseBindingIdentifierOrPattern(parser, context);
    if (parser.token === 33619997 /* Assign */) {
        return report(parser, 0 /* Unexpected */);
    }
    if (parser.token === 33554450 /* Comma */) {
        return report(parser, 0 /* Unexpected */);
    }
    return finishNode(context, parser, pos, {
        type: 'RestElement',
        argument: argument
    });
}
function parseSpreadElement(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 14 /* Ellipsis */);
    var token = parser.token;
    var argument = deriveGrammar(parser, context | 8192 /* AllowIn */, parseAssignmentExpression);
    return finishNode(context, parser, pos, {
        type: 'SpreadElement',
        argument: argument
    });
}
function parseExpression(parser, context) {
    var pos = getLocation(parser);
    var expr = isolateCoverGrammar(parser, context, parseAssignmentExpression);
    return parser.token === 33554450 /* Comma */ ?
        parseSequenceExpression(parser, context, expr, pos) :
        expr;
}
function parseSequenceExpression(parser, context, left, pos) {
    var expressions = [left];
    while (consume(parser, context, 33554450 /* Comma */)) {
        expressions.push(isolateCoverGrammar(parser, context, parseAssignmentExpression));
    }
    return finishNode(context, parser, pos, {
        type: 'SequenceExpression',
        expressions: expressions
    });
}
function parseYieldExpression(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 21610 /* YieldKeyword */);
    var argument = null;
    var delegate = false;
    if (!(parser.flags & 1 /* NewLine */)) {
        delegate = consume(parser, context, 1198643 /* Multiply */);
        argument = delegate ?
            parseAssignmentExpression(parser, context) :
            parser.token & 16384 /* IsExpressionStart */ ?
                parseAssignmentExpression(parser, context) :
                null;
    }
    return finishNode(context, parser, pos, {
        type: 'YieldExpression',
        argument: argument,
        delegate: delegate
    });
}
function parseAssignmentExpression(parser, context) {
    if (context & 32768 /* Yield */ && parser.token === 21610 /* YieldKeyword */)
        { return parseYieldExpression(parser, context); }
    var pos = getLocation(parser);
    var token = parser.token;
    var expr = parseConditionalExpression(parser, context, pos);
    if (parser.token === 10 /* Arrow */ && token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
        if (token & 5120 /* FutureReserved */) {
            report(parser, 2 /* InvalidLHSInAssignment */);
            context |= 131072 /* IsReserved */;
        }
        /*    if (t & Token.IsEvalArguments) {
                if (context & Context.Strict) this.tolerate(context, Errors.InvalidBindingStrictMode, tokenDesc(t));
                this.errorLocation = this.getLocation();
                this.flags |= Flags.ReservedWords;
            }*/
        return parseArrowFunctionExpression(parser, context, pos, [expr]);
    }
    if (!hasBit(parser.token, 65536 /* IsAssignOp */))
        { return expr; }
    if (!(parser.flags & 4 /* AllowDestructuring */)) {
        return report(parser, 2 /* InvalidLHSInAssignment */);
    }
    var operator = parser.token;
    if (parser.token === 33619997 /* Assign */) {
        toAssignable(parser, context, expr);
    }
    else {
        if (!isValidSimpleAssignmentTarget(expr)) {
            return report(parser, 2 /* InvalidLHSInAssignment */);
        }
        parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    }
    nextToken(parser, context);
    var right = isolateCoverGrammar(parser, context | 8192 /* AllowIn */, parseAssignmentExpression);
    parser.pendingExpressionError = null;
    return finishNode(context, parser, pos, {
        type: 'AssignmentExpression',
        left: expr,
        operator: tokenDesc(operator),
        right: right
    });
}
function parseConditionalExpression(parser, context, pos) {
    var test = deriveGrammarGrammarWithLocation(parser, context, parseBinaryExpression, pos, 0);
    if (!consume(parser, context, 22 /* QuestionMark */))
        { return test; }
    var consequent = isolateCoverGrammar(parser, context | 8192 /* AllowIn */, parseAssignmentExpression);
    expect(parser, context, 33554453 /* Colon */);
    var alternate = isolateCoverGrammar(parser, context, parseAssignmentExpression);
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    return finishNode(context, parser, pos, {
        type: 'ConditionalExpression',
        test: test,
        consequent: consequent,
        alternate: alternate
    });
}
function parseBinaryExpression(parser, context, minPrec, pos, left) {
    if ( left === void 0 ) left = parseUnaryExpression(parser, context);

    // Shift-reduce parser for the binary operator part of the JS expression
    // syntax.
    var bit = context & 8192 /* AllowIn */ ^ 8192;
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
            right: isolateCoverGrammarWithLocation(parser, context & ~8192 /* AllowIn */, parseBinaryExpression, getLocation(parser), prec),
            //right: parseBinaryExpression(parser, context & ~Context.AllowIn, prec, getLocation(parser)),
            operator: tokenDesc(t)
        });
    }
    return left;
}
function parseUnaryExpression(parser, context) {
    var pos = getLocation(parser);
    var t = parser.token;
    //if (t === Token.AwaitKeyword) return parseAwaitExpression(parser, context, pos);
    if (hasBit(t, 278528 /* IsUnaryOp */)) {
        t = parser.token;
        nextToken(parser, context);
        var argument = isolateCoverGrammar(parser, context, parseUnaryExpression);
        if (parser.token === 150326 /* Exponentiate */) {
            return report(parser, 0 /* Unexpected */);
        }
        /*if (context & Context.Strict && t === Token.DeleteKeyword) {
            if (argument.type === 'Identifier') {
                this.tolerate(context, Errors.StrictDelete);
            } else if (isPropertyWithPrivateFieldKey(context, argument)) {
                this.tolerate(context, Errors.DeletePrivateField);
            }
        }*/
        parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
        return finishNode(context, parser, pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(t),
            argument: argument,
            prefix: true
        });
    }
    return parseUpdateExpression(parser, context, pos);
}
// https://tc39.github.io/ecma262/#sec-update-expressions
function parseUpdateExpression(parser, context, pos) {
    var prefix = false;
    var operator;
    if (hasBit(parser.token, 540672 /* IsUpdateOp */)) {
        operator = parser.token;
        prefix = true;
        nextToken(parser, context);
    }
    var argument = parseLeftHandSideExpression(parser, context, pos);
    var isPostfix = !(parser.flags & 1 /* NewLine */) && hasBit(parser.token, 540672 /* IsUpdateOp */);
    if (!prefix && !isPostfix)
        { return argument; }
    if (!prefix) {
        operator = parser.token;
        nextToken(parser, context);
    }
    // if (!(parser.flags & Flags.AllowDestructuring)) {
    if (!isValidSimpleAssignmentTarget(argument)) {
        return report(parser, 2 /* InvalidLHSInAssignment */);
    }
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    return finishNode(context, parser, pos, {
        type: 'UpdateExpression',
        argument: argument,
        operator: tokenDesc(operator),
        prefix: prefix
    });
}
function parseLeftHandSideExpression(parser, context, pos) {
    var expr = parseMemberExpression(parser, context | 8192 /* AllowIn */, pos);
    return parseCallExpression(parser, context | 8192 /* AllowIn */, pos, expr);
}
function parseMemberExpression(parser, context, pos, expr) {
    if ( expr === void 0 ) expr = parsePrimaryExpression(parser, context);

    while (true) {
        if (consume(parser, context, 33554445 /* Period */)) {
            parser.flags = parser.flags & ~2 /* AllowBinding */ | 4 /* AllowDestructuring */;
            var property = parseIdentifier(parser, context);
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
        return expr;
    }
}
function parseCallExpression(parser, context, pos, expr) {
    while (true) {
        expr = parseMemberExpression(parser, context, pos, expr);
        if (parser.token !== 33570827 /* LeftParen */)
            { return expr; }
        parser.flags & ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
        var args = parseArgumentList(parser, context);
        expr = finishNode(context, parser, pos, {
            type: 'CallExpression',
            callee: expr,
            arguments: args
        });
    }
}
function parseArgumentList(parser, context) {
    expect(parser, context, 33570827 /* LeftParen */);
    var expressions = [];
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            expressions.push(parseSpreadElement(parser, context));
        }
        else {
            expressions.push(parseAssignmentExpression(parser, context | 8192 /* AllowIn */));
        }
        if (parser.token === 16 /* RightParen */)
            { break; }
        expect(parser, context, 33554450 /* Comma */);
        if (parser.token === 16 /* RightParen */)
            { break; }
    }
    expect(parser, context, 16 /* RightParen */);
    return expressions;
}
function parsePrimaryExpression(parser, context) {
    switch (parser.token) {
        case 16386 /* NumericLiteral */:
        case 16387 /* StringLiteral */:
            parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
            return parseLiteralExpression(parser, context);
        case 67125249 /* Identifier */:
            return parseIdentifier(parser, context);
        case 19463 /* NullKeyword */:
        case 19462 /* TrueKeyword */:
        case 19461 /* FalseKeyword */:
            parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
            return parseNullOrTrueOrFalseExpression(parser, context);
        case 19544 /* FunctionKeyword */:
            return parseFunctionExpression(parser, context);
        case 3167 /* ThisKeyword */:
            return parseThisExpression(parser, context);
        case 33570827 /* LeftParen */:
            {
                parser.flags &= ~2 /* AllowBinding */;
                return deriveGrammar(parser, context, parseParenthesizedExpression);
            }
        case 16793619 /* LeftBracket */:
            return deriveGrammar(parser, context, parseArrayInitializer);
        case 16793612 /* LeftBrace */:
            return deriveGrammar(parser, context, parseObjectInitializer);
        case 21576 /* LetKeyword */:
            if (context & 256 /* Strict */)
                { report(parser, 0 /* Unexpected */); }
            var pos = getLocation(parser);
            var name = parser.tokenValue;
            nextToken(parser, context);
            if (parser.flags & 1 /* NewLine */) {
                if (parser.token === 16793619 /* LeftBracket */) {
                    report(parser, 1 /* UnexpectedToken */, 'let');
                }
            }
            return finishNode(context, parser, pos, {
                type: 'Identifier',
                name: name
            });
        case 21610 /* YieldKeyword */:
            if (context & 256 /* Strict */)
                { report(parser, 0 /* Unexpected */); }
        default:
            if (parser.token & (1024 /* Keyword */ | 134217728 /* IsEvalOrArguments */))
                { return parseIdentifier(parser, context); }
            return report(parser, 0 /* Unexpected */);
    }
}
function parseThisExpression(parser, context) {
    var pos = getLocation(parser);
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'ThisExpression'
    });
}
function parseArrayInitializer(parser, context) {
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
            elements.push(deriveGrammar(parser, context | 8192 /* AllowIn */, parseAssignmentExpression));
            if (parser.token !== 20 /* RightBracket */) {
                expect(parser, context, 33554450 /* Comma */);
            }
        }
    }
    expect(parser, context, 20 /* RightBracket */);
    return finishNode(context, parser, pos, {
        type: 'ArrayExpression',
        elements: elements
    });
}
function parseAssignmentPattern11(parser, context, left, pos) {
    return finishNode(context, parser, pos, {
        type: 'AssignmentPattern',
        left: left,
        right: isolateCoverGrammar(parser, context, parseAssignmentExpression)
    });
}
function parseObjectInitializer(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 16793612 /* LeftBrace */);
    var properties = [];
    while (parser.token !== 301989903 /* RightBrace */) {
        properties.push(parser.token === 14 /* Ellipsis */ ?
            parseSpreadElement(parser, context) :
            parsePropertyDefinition(parser, context));
        if (parser.token !== 301989903 /* RightBrace */)
            { expect(parser, context, 33554450 /* Comma */); }
    }
    expect(parser, context, 301989903 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'ObjectExpression',
        properties: properties
    });
}
function parseComputedPropertyName(parser, context) {
    expect(parser, context, 16793619 /* LeftBracket */);
    var key = parseAssignmentExpression(parser, context | 8192 /* AllowIn */);
    expect(parser, context, 20 /* RightBracket */);
    return key;
}
function parsePropertyName(parser, context) {
    switch (parser.token) {
        case 16386 /* NumericLiteral */:
        case 16387 /* StringLiteral */:
            return parseLiteralExpression(parser, context);
        case 16793619 /* LeftBracket */:
            return parseComputedPropertyName(parser, context);
        default:
            return parseIdentifier(parser, context);
    }
}
// http://www.ecma-international.org/ecma-262/8.0/#prod-PropertyDefinition
function parsePropertyDefinitionShorthandOrMethod(parser, context, key, state, pos) {
    var value;
    var shorthand = false;
    // method
    if (parser.token === 33570827 /* LeftParen */) {
        state |= 32 /* Method */;
        value = parseMethodDeclaration(parser, context, state);
    }
    else {
        shorthand = !consume(parser, context, 33554453 /* Colon */);
        value = shorthand ? key : deriveGrammar(parser, context, parseAssignmentExpression);
        if (consume(parser, context, 33619997 /* Assign */)) {
            parser.pendingExpressionError = 2 /* InvalidLHSInAssignment */;
            value = parseAssignmentPattern11(parser, context | 8192 /* AllowIn */, value, pos);
        }
    }
    return finishNode(context, parser, pos, {
        type: 'Property',
        key: key,
        value: value,
        kind: 'init',
        computed: !!(state & 16 /* Computed */),
        method: !!(state & 32 /* Method */),
        shorthand: shorthand
    });
}
function parsePropertyDefinition(parser, context) {
    var pos = getLocation(parser);
    var state = 0;
    if (consume(parser, context, 1198643 /* Multiply */))
        { state |= 2 /* Generator */; }
    var t = parser.token;
    if (parser.token === 16793619 /* LeftBracket */)
        { state |= 16 /* Computed */; }
    var key = parsePropertyName(parser, context);
    if (parser.token & 33554432 /* IsShorthand */) {
        return parsePropertyDefinitionShorthandOrMethod(parser, context, key, state, pos);
    }
    if (!(state & 2 /* Generator */) && t === 9324 /* AsyncKeyword */ && !(parser.flags & 1 /* NewLine */)) {
        state |= 1 /* Async */ | 32 /* Method */;
        t = parser.token;
        if (t === 1198643 /* Multiply */) {
            consume(parser, context, 1198643 /* Multiply */);
            t === parser.token;
            state |= 2 /* Generator */;
        }
        key = parsePropertyName(parser, context);
    }
    if (parser.token !== 33570827 /* LeftParen */ && (t === 9327 /* GetKeyword */ || t === 9328 /* SetKeyword */)) {
        state |= t === 9327 /* GetKeyword */ ? 4 /* Getter */ : 8 /* Setter */;
        key = parsePropertyName(parser, context);
    }
    return finishNode(context, parser, pos, {
        type: 'Property',
        key: key,
        value: parseMethodDeclaration(parser, context, state),
        kind: !(state & 4 /* Getter */ | state & 8 /* Setter */) ? 'init' : (state & 8 /* Setter */) ? 'set' : 'get',
        computed: !!(state & 16 /* Computed */),
        method: !!(state & 32 /* Method */),
        shorthand: false
    });
}
function parseMethodDeclaration(parser, context, state) {
    var pos = getLocation(parser);
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    var params = parseFormalParameterList(parser, context | 65536 /* InParameter */);
    var body = parseFunctionBody(parser, context | 262144 /* Return */);
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
function parseFormalParameterList(parser, context) {
    expect(parser, context, 33570827 /* LeftParen */);
    parser.flags &= ~8 /* SimpleParameterList */;
    var params = [];
    while (parser.token !== 16 /* RightParen */) {
        if (parser.token === 14 /* Ellipsis */) {
            parser.flags |= 8 /* SimpleParameterList */;
            params.push(parseRestElement(parser, context));
            break;
        }
        else {
            var pos = getLocation(parser);
            if (!(parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */))) {
                parser.flags |= 8 /* SimpleParameterList */;
            }
            var left = parseBindingIdentifierOrPattern(parser, context);
            if (consume(parser, context, 33619997 /* Assign */)) {
                parser.flags |= 8 /* SimpleParameterList */;
                params.push(finishNode(context, parser, pos, {
                    type: 'AssignmentPattern',
                    left: left,
                    right: parseAssignmentExpression(parser, context)
                }));
            }
            else {
                params.push(left);
            }
        }
        if (!consume(parser, context, 33554450 /* Comma */))
            { break; }
        if (parser.token === 16 /* RightParen */) {
            // allow the trailing comma
            break;
        }
    }
    expect(parser, context, 16 /* RightParen */);
    return params;
}
function parseFunctionBody(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 16793612 /* LeftBrace */);
    var body = [];
    var t = parser.labelSet;
    parser.labelSet = {};
    // Todo! Check for directives and if strict, throw on this mask 'IsReserved'
    while (parser.token !== 301989903 /* RightBrace */) {
        body.push(parseStatementListItem(parser, context));
    }
    parser.labelSet = t;
    expect(parser, context, 301989903 /* RightBrace */);
    return finishNode(context, parser, pos, {
        type: 'BlockStatement',
        body: body
    });
}
function parseNullOrTrueOrFalseExpression(parser, context) {
    var pos = getLocation(parser);
    var t = parser.token;
    var raw = tokenDesc(t);
    nextToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'Literal',
        value: t === 19463 /* NullKeyword */ ? null : raw === 'true'
    });
    if (context & 8 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
}
function parseParenthesizedExpression(parser, context) {
    var pos = getLocation(parser);
    expect(parser, context, 33570827 /* LeftParen */);
    var expr;
    if (consume(parser, context, 16 /* RightParen */)) {
        if (parser.token === 10 /* Arrow */) {
            return parseArrowFunctionExpression(parser, context, pos, []);
        }
    }
    if (parser.token === 14 /* Ellipsis */) {
        expr = parseRestElement(parser, context);
        expect(parser, context, 16 /* RightParen */);
        return parseArrowFunctionExpression(parser, context, pos, [expr]);
    }
    parser.flags |= 2 /* AllowBinding */;
    var sequencepos = getLocation(parser);
    expr = deriveGrammar(parser, context, parseAssignmentExpression);
    var isSequence = parser.token === 33554450;
    if (isSequence) {
        parser.flags &= ~4 /* AllowDestructuring */;
        var expressions = [expr];
        while (consume(parser, context, 33554450 /* Comma */)) {
            if (parser.token === 16 /* RightParen */) {
            }
            else if (parser.token === 14 /* Ellipsis */) {
                if (!(parser.flags & 2 /* AllowBinding */)) {
                    return report(parser, 0 /* Unexpected */);
                }
                expressions.push(parseRestElement(parser, context));
                expect(parser, context, 16 /* RightParen */);
                if (parser.token === 10 /* Arrow */) {
                    parser.flags &= ~2 /* AllowBinding */;
                    return parseArrowFunctionExpression(parser, context, pos, expressions);
                }
            }
            else {
                expressions.push(deriveGrammar(parser, context, parseAssignmentExpression));
            }
        }
        expr = finishNode(context, parser, sequencepos, {
            type: 'SequenceExpression',
            expressions: expressions
        });
    }
    expect(parser, context, 16 /* RightParen */);
    if (parser.token === 10 /* Arrow */) {
        if (!(parser.flags & 2 /* AllowBinding */)) {
            return report(parser, 0 /* Unexpected */);
        }
        var params = (expr.type === 'SequenceExpression' ? expr.expressions : [expr]);
        return parseArrowFunctionExpression(parser, context, pos, params);
    }
    parser.flags &= ~2 /* AllowBinding */;
    // ({ a, b }) = {a: 1, b: 2}
    if (!isValidSimpleAssignmentTarget(expr)) {
        parser.flags &= ~4 /* AllowDestructuring */;
    }
    return expr;
}
function parseArrowFunctionExpression(parser, context, pos, params) {
    parser.flags &= ~(4 /* AllowDestructuring */ | 2 /* AllowBinding */);
    expect(parser, context, 10 /* Arrow */);
    if (parser.flags & 1 /* NewLine */)
        { return report(parser, 0 /* Unexpected */); }
    var newContext = getNewContext(false, context);
    var token = parser.token;
    parser.pendingExpressionError = null;
    for (var i in params) {
        toAssignable(parser, context | 65536 /* InParameter */, params[i]);
    }
    var body;
    var expression = false;
    if (token === 16793612 /* LeftBrace */) {
        body = parseFunctionBody(parser, newContext | 262144 /* Return */);
    }
    else {
        expression = true;
        body = isolateCoverGrammar(parser, context, parseAssignmentExpression);
    }
    return finishNode(context, parser, pos, {
        type: 'ArrowFunctionExpression',
        body: body,
        params: params,
        id: null,
        async: false,
        generator: false,
        expression: expression
    });
}
function parseLiteralExpression(parser, context) {
    var pos = getLocation(parser);
    var value = parser.tokenValue;
    nextToken(parser, context);
    var node = finishNode(context, parser, pos, {
        type: 'Literal',
        value: value
    });
    if (context & 8 /* OptionsRaw */)
        { node.raw = parser.tokenRaw; }
    return node;
}
function parseIdentifier(parser, context) {
    var pos = getLocation(parser);
    var name = parser.tokenValue;
    nextToken(parser, context);
    return finishNode(context, parser, pos, {
        type: 'Identifier',
        name: name
    });
}
function parseParamsAndBody(parser, context) {
    var paramList = parseFormalParameterList(parser, context | 65536 /* InParameter */);
    var body = parseFunctionBody(parser, context | 262144 /* Return */);
    return {
        params: paramList,
        body: body
    };
}
function getNewContext(asGenerator, context) {
    var newContext = context;
    if (asGenerator) {
        context |= 32768 /* Yield */;
        context &= ~16384 /* Async */;
    }
    else {
        context &= ~(32768 /* Yield */ | 16384 /* Async */);
    }
    return newContext;
}
function parseFunctionExpression(parser, context) {
    var pos = getLocation(parser);
    var async = consume(parser, context, 9324 /* AsyncKeyword */);
    expect(parser, context, 19544 /* FunctionKeyword */);
    var generator = consume(parser, context, 1198643 /* Multiply */);
    var id = null;
    var newContext = getNewContext(generator, context);
    if (parser.token & (67108864 /* IsIdentifier */ | 1024 /* Keyword */)) {
        id = parseBindingIdentifier(parser, context);
    }
    var ref = parseParamsAndBody(parser, context);
    var params = ref.params;
    var body = ref.body;
    return finishNode(context, parser, pos, {
        type: 'FunctionExpression',
        params: params,
        body: body,
        async: async,
        generator: generator,
        expression: false,
        id: id
    });
}
function parseFunctionDeclaration(parser, context) {
    var pos = getLocation(parser);
    var async = consume(parser, context, 9324 /* AsyncKeyword */);
    expect(parser, context, 19544 /* FunctionKeyword */);
    var generator = consume(parser, context, 1198643 /* Multiply */);
    if (generator && context & 524288 /* AllowSingleStatement */) {
        report(parser, 19 /* GeneratorInSingleStatementContext */);
    }
    if (generator)
        { context |= 32768 /* Yield */; }
    var id = parseBindingIdentifier(parser, context);
    var newContext = getNewContext(generator, context);
    var ref = parseParamsAndBody(parser, context);
    var params = ref.params;
    var body = ref.body;
    return finishNode(context, parser, pos, {
        type: 'FunctionDeclaration',
        params: params,
        body: body,
        async: async,
        generator: generator,
        expression: false,
        id: id
    });
}

/**
 * Parse script code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 *
 * @param source  source code to parse
 * @param options parser options
 */
function parseScript(source, options) {
    return parseProgram(source, options, 0 /* Empty */);
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
    return parseProgram(source, options, 256 /* Strict */ | 512 /* Module */);
}

export { parseScript, parseModule };
