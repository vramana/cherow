/**
 * The token types and attributes.
 */
export const enum Token {
    Type = 0xff,

    PrecStart = 8,
    Precedence = 15 << PrecStart, // 8-11

    /* Attribute names */
    Contextual         = 1 << 12,
    Reserved           = 1 << 13,
    FutureReserved     = 1 << 14,
    Error              = 1 << 16,
    ASI                = 1 << 17,
    /* ECMA tokens */
    Whitespace         = 1 << 18,
    Comments           = 1 << 19 | Whitespace,
    NumericLiteral     = 1 << 20,
    BooleanLiteral     = 1 << 21,
    StringLiteral      = 1 << 22,
    Identifier         = 1 << 23,
    RegularExpression  = 1 << 24,
    Punctuators        = 1 << 25,
    Template           = 1 << 26,

    /* Node types */
    EndOfSource = 0, // Pseudo

    /* Constants/Bindings */
    FalseKeyword      = 1 | BooleanLiteral | Reserved,
    TrueKeyword       = 2 | BooleanLiteral | Reserved,
    NullKeyword       = 3 | Reserved,

    /* Template nodes */
    TemplateHead  = 4 | Template,
    TemplateBody  = 5 | Template,
    TemplateTail  = 6 | Template,

    /* Punctuators */
    Arrow        = 7  | Punctuators, // =>
    LeftParen    = 8  | Punctuators, // (
    LeftBrace    = 9  | Punctuators, // {
    Period       = 10 | Punctuators, // .
    Ellipsis     = 11 | Punctuators, // ...
    RightBrace   = 12 | Punctuators, // }
    RightParen   = 13 | Punctuators, // )
    Semicolon    = 14 | Punctuators, // ;
    Comma        = 15 | Punctuators, // ,
    LeftBracket  = 16 | Punctuators, // [
    RightBracket = 17 | Punctuators, // ]
    Colon        = 18 | Punctuators, // :
    QuestionMark = 19 | Punctuators, // ?
    SingleQuote  = 20 | Punctuators, // '
    DoubleQuote  = 21 | Punctuators, // "
    JSXClose     = 22 | Punctuators, // </
    JSXAutoClose = 23 | Punctuators, // />

    /* Update operators */
    Increment = 24, // ++
    Decrement = 25, // --

    /* Assign operators */
    Assign                  = 26, // =
    ShiftLeftAssign         = 27, // <<=
    ShiftRightAssign        = 28, // >>=
    LogicalShiftRightAssign = 29, // >>>=
    ExponentiateAssign      = 30, // **=
    AddAssign               = 31, // +=
    SubtractAssign          = 32, // -=
    MultiplyAssign          = 33, // *=
    DivideAssign            = 34, // /=
    ModuloAssign            = 35, // %=
    BitwiseXorAssign        = 36, // ^=
    BitwiseOrAssign         = 37, // |=
    BitwiseAndAssign        = 38, // &=

    /* Unary/binary operators */
    TypeofKeyword      = 39 | Reserved,
    DeleteKeyword      = 40 | Reserved,
    VoidKeyword        = 41 | Reserved,
    Negate             = 42, // !
    Complement         = 43, // ~
    Add                = 44 | 9 << PrecStart, // +
    Subtract           = 45 | 9 << PrecStart, // -
    InKeyword          = 46 | 7 << PrecStart | Reserved,
    InstanceofKeyword  = 47 | 7 << PrecStart | Reserved,
    Multiply           = 48 | 10 << PrecStart, // *
    Modulo             = 49 | 10 << PrecStart, // %
    Divide             = 50 | 10 << PrecStart, // /
    Exponentiate       = 51 | 11 << PrecStart, // **
    LogicalAnd         = 52 | 2 << PrecStart, // &&
    LogicalOr          = 53 | 1 << PrecStart, // ||
    StrictEqual        = 54 | 6 << PrecStart, // ===
    StrictNotEqual     = 55 | 6 << PrecStart, // !==
    LooseEqual         = 56 | 6 << PrecStart, // ==
    LooseNotEqual      = 57 | 6 << PrecStart, // !=
    LessThanOrEqual    = 58 | 7 << PrecStart, // <=
    GreaterThanOrEqual = 59 | 7 << PrecStart, // >=
    LessThan           = 60 | 7 << PrecStart, // <
    GreaterThan        = 61 | 7 << PrecStart, // >
    ShiftLeft          = 62 | 8 << PrecStart, // <<
    ShiftRight         = 63 | 8 << PrecStart, // >>
    LogicalShiftRight  = 64 | 8 << PrecStart, // >>>
    BitwiseAnd         = 65 | 5 << PrecStart, // &
    BitwiseOr          = 66 | 3 << PrecStart, // |
    BitwiseXor         = 67 | 4 << PrecStart, // ^

    /* Variable declaration kinds */
    VarKeyword   = 68 | Reserved,
    LetKeyword   = 69 | FutureReserved,
    ConstKeyword = 70 | Reserved,

    /* Other reserved words */
    BreakKeyword    = 71 | Reserved,
    CaseKeyword     = 72 | Reserved,
    CatchKeyword    = 73 | Reserved,
    ClassKeyword    = 74 | Reserved,
    ContinueKeyword = 75 | Reserved,
    DebuggerKeyword = 76 | Reserved,
    DefaultKeyword  = 77 | Reserved,
    DoKeyword       = 78 | Reserved,
    ElseKeyword     = 79 | Reserved,
    ExportKeyword   = 80 | Reserved,
    ExtendsKeyword  = 81 | Reserved,
    FinallyKeyword  = 82 | Reserved,
    ForKeyword      = 83 | Reserved,
    FunctionKeyword = 84 | Reserved,
    IfKeyword       = 85 | Reserved,
    ImportKeyword   = 86 | Reserved,
    NewKeyword      = 87 | Reserved,
    ReturnKeyword   = 88 | Reserved,
    SuperKeyword    = 89 | Reserved,
    SwitchKeyword   = 90 | Reserved,
    ThisKeyword     = 91 | Reserved,
    ThrowKeyword    = 92 | Reserved,
    TryKeyword      = 93 | Reserved,
    WhileKeyword    = 94 | Reserved,
    WithKeyword     = 95 | Reserved,

    /* Strict mode reserved words */
    ImplementsKeyword = 96 | FutureReserved,
    InterfaceKeyword  = 97 | FutureReserved,
    PackageKeyword    = 98 | FutureReserved,
    PrivateKeyword    = 99 | FutureReserved,
    ProtectedKeyword  = 100 | FutureReserved,
    PublicKeyword     = 101 | FutureReserved,
    StaticKeyword     = 102 | FutureReserved,
    YieldKeyword      = 103 | FutureReserved,

    /* Contextual keywords */
    AsKeyword          = 104 | Contextual,
    AsyncKeyword       = 105 | Contextual,
    AwaitKeyword       = 106 | Contextual,
    ConstructorKeyword = 107 | Contextual,
    GetKeyword         = 108 | Contextual,
    SetKeyword         = 109 | Contextual,
    FromKeyword        = 110 | Contextual,
    OfKeyword          = 111 | Contextual,

    /* Comments */
    SingleComment      = 112 | Whitespace | Comments,
    MultiComment       = 113 | Whitespace | Comments,
    HTMLComment        = 114 | Whitespace | Comments,

    /* Whitespace */
    Space              = 115 | Whitespace,
    Tab                = 116 | Whitespace,
    LineFeed           = 117 | Whitespace,
    CarriageReturn     = 118 | Whitespace,

    /* Numbers */
    Hex                = 119 | NumericLiteral,
    Decimal            = 120 | NumericLiteral,
    Binary             = 121 | NumericLiteral,
    Octal              = 122 | NumericLiteral,
    Implicit           = 123 | NumericLiteral,
}

// Note: this *must* be kept in sync with the enum's order.
//
// It exploits the enum value ordering, and it's necessarily a complete and
// utter hack.
//
// All to lower it to a single monomorphic array access.
const KeywordDescTable = [
    'end of source',

    /* Constants/Bindings */
    'false', 'true', 'null',

    /* Template nodes */
    'template head', 'template body', 'template tail',

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

    /* Comments */
    'SingleComment', 'MultiComment', 'HTMLComment',

    /* Whitespace */
    'space', 'tab', 'line feed', 'carrigbe return',

    /* Whitespace */
    'number', 'number', 'number', 'number', 'number'
];

/**
 * The conversion function between token and its string description/representation.
 */
export function tokenDesc(token: Token): string {
    if ((token & Token.Type) < KeywordDescTable.length) {
        return KeywordDescTable[token & Token.Type];
    } else {
        throw new Error('unreachable');
    }
}
