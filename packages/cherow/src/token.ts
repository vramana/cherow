/**
 * https://tc39.github.io/ecma262/#sec-ecmascript-language-source-code
 */
export const enum Token {
    Type = 0xff,

    /* Precedence */
    PrecStart          = 8,
    Precedence         = 15 << PrecStart, // 8-11

    /* Attribute names */
    Contextual         = 1 << 12,
    Reserved           = 1 << 13,
    FutureReserved     = 1 << 14,
    Invalid            = 1 << 16,
    ASI                = 1 << 17,
    IsLogical          = 1 << 18,

    /* ECMA tokens */
    WhiteSpace         = 1 << 19, // Note: LineTerminator and WhiteSpace are treated as one token
    Comments           = 1 << 20 | WhiteSpace,
    NumericLiteral     = 1 << 21,
    StringLiteral      = 1 << 22,
    Identifier         = 1 << 23,
    RegularExpression  = 1 << 24,
    Punctuator        = 1 << 25,
    Template           = 1 << 26,

    /** Misc */
    IsAssignOp         = 1 << 27,
    IsBinaryOp         = 1 << 28,
    IsUnaryOp          = 1 << 29,
    IsUpdateOp         = 1 << 30,

    /** Constants */
    Keyword = Token.Identifier | Token.Reserved | Token.FutureReserved | Token.Contextual,

    /* Node types */
    EndOfSource       = 0 | ASI, // Pseudo

    /* Booleans */
    FalseKeyword      = 1 | Reserved,
    TrueKeyword       = 2 | Reserved,

    /* Null literal */
    NullKeyword       = 3 | Reserved,

    /* Template nodes */
    TemplateCont = 4 | Template,
    TemplateTail = 5 | Template,

    /* Punctuators */
    Arrow        = 6  | Punctuator, // =>
    LeftParen    = 7  | Punctuator, // (
    LeftBrace    = 8  | Punctuator, // {
    Period       = 9 | Punctuator, // .
    Ellipsis     = 10 | Punctuator, // ...
    RightBrace   = 11 | Punctuator | ASI, // }
    RightParen   = 12 | Punctuator, // )
    Semicolon    = 13 | Punctuator | ASI, // ;
    Comma        = 14 | Punctuator, // ,
    LeftBracket  = 15 | Punctuator, // [
    RightBracket = 16 | Punctuator, // ]
    Colon        = 17 | Punctuator, // :
    QuestionMark = 18 | Punctuator, // ?
    SingleQuote  = 19 | Punctuator, // '
    DoubleQuote  = 20 | Punctuator, // "
    JSXClose     = 21 | Punctuator, // </
    JSXAutoClose = 22 | Punctuator, // />

    /* Update operators */
    Increment = 23 | Punctuator | IsUpdateOp, // ++
    Decrement = 24 | Punctuator | IsUpdateOp, // --

    /* Assign operators */
    Assign                  = 25  | Punctuator | IsAssignOp, // =
    ShiftLeftAssign         = 26  | Punctuator | IsAssignOp, // <<=
    ShiftRightAssign        = 27  | Punctuator | IsAssignOp, // >>=
    LogicalShiftRightAssign = 28  | Punctuator | IsAssignOp, // >>>=
    ExponentiateAssign      = 29  | Punctuator | IsAssignOp, // **=
    AddAssign               = 30  | Punctuator | IsAssignOp, // +=
    SubtractAssign          = 31  | Punctuator | IsAssignOp, // -=
    MultiplyAssign          = 32  | Punctuator | IsAssignOp, // *=
    DivideAssign            = 33  | Punctuator | IsAssignOp, // /=
    ModuloAssign            = 34  | Punctuator | IsAssignOp, // %=
    BitwiseXorAssign        = 35  | Punctuator | IsAssignOp, // ^=
    BitwiseOrAssign         = 36  | Punctuator | IsAssignOp, // |=
    BitwiseAndAssign        = 37  | Punctuator | IsAssignOp, // &=

    /* Unary/binary operators */
    TypeofKeyword      = 38  | IsUnaryOp | Punctuator | Reserved,
    DeleteKeyword      = 39  | IsUnaryOp | Punctuator | Reserved,
    VoidKeyword        = 40  | IsUnaryOp | Punctuator | Reserved,
    Negate             = 41  | IsUnaryOp | Punctuator, // !
    Complement         = 42  | IsUnaryOp | Punctuator, // ~
    Add                = 43  | IsUnaryOp | IsBinaryOp | Punctuator | 9 << PrecStart, // +
    Subtract           = 44  | IsUnaryOp | IsBinaryOp | Punctuator | 9 << PrecStart, // -
    InKeyword          = 45  | IsBinaryOp | Punctuator | 7 << PrecStart | Reserved,
    InstanceofKeyword  = 46  | IsBinaryOp | Punctuator | 7 << PrecStart | Reserved,
    Multiply           = 47  | IsBinaryOp | Punctuator | 10 << PrecStart, // *
    Modulo             = 48  | IsBinaryOp | Punctuator | 10 << PrecStart, // %
    Divide             = 49  | IsBinaryOp | Punctuator | 10 << PrecStart, // /
    Exponentiate       = 50  | IsBinaryOp | Punctuator | 11 << PrecStart, // **
    LogicalAnd         = 51  | IsBinaryOp | Punctuator | 2 << PrecStart, // &&
    LogicalOr          = 52  | IsBinaryOp | Punctuator | 1 << PrecStart, // ||
    StrictEqual        = 53  | IsBinaryOp | Punctuator | 6 << PrecStart, // ===
    StrictNotEqual     = 54  | IsBinaryOp | Punctuator | 6 << PrecStart, // !==
    LooseEqual         = 55  | IsBinaryOp | Punctuator | 6 << PrecStart, // ==
    LooseNotEqual      = 56  | IsBinaryOp | Punctuator | 6 << PrecStart, // !=
    LessThanOrEqual    = 57  | IsBinaryOp | Punctuator | 7 << PrecStart, // <=
    GreaterThanOrEqual = 58  | IsBinaryOp | Punctuator | 7 << PrecStart, // >=
    LessThan           = 59  | IsBinaryOp | Punctuator | 7 << PrecStart, // <
    GreaterThan        = 60  | IsBinaryOp | Punctuator | 7 << PrecStart, // >
    ShiftLeft          = 61  | IsBinaryOp | Punctuator | 8 << PrecStart, // <<
    ShiftRight         = 62  | IsBinaryOp | Punctuator | 8 << PrecStart, // >>
    LogicalShiftRight  = 63  | IsBinaryOp | Punctuator | 8 << PrecStart, // >>>
    BitwiseAnd         = 64  | IsBinaryOp | Punctuator | 5 << PrecStart, // &
    BitwiseOr          = 65  | IsBinaryOp | Punctuator | 3 << PrecStart, // |
    BitwiseXor         = 66  | IsBinaryOp | Punctuator | 4 << PrecStart, // ^

    /* Variable declaration kinds */
    VarKeyword   = 67 | Reserved,
    LetKeyword   = 68 | FutureReserved,
    ConstKeyword = 69 | Reserved,

    /* Other reserved words */
    BreakKeyword    = 70 | Reserved,
    CaseKeyword     = 71 | Reserved,
    CatchKeyword    = 72 | Reserved,
    ClassKeyword    = 73 | Reserved,
    ContinueKeyword = 74 | Reserved,
    DebuggerKeyword = 75 | Reserved,
    DefaultKeyword  = 76 | Reserved,
    DoKeyword       = 77 | Reserved,
    ElseKeyword     = 78 | Reserved,
    ExportKeyword   = 79 | Reserved,
    ExtendsKeyword  = 80 | Reserved,
    FinallyKeyword  = 81 | Reserved,
    ForKeyword      = 82 | Reserved,
    FunctionKeyword = 83 | Reserved,
    IfKeyword       = 84 | Reserved,
    ImportKeyword   = 85 | Reserved,
    NewKeyword      = 86 | Reserved,
    ReturnKeyword   = 87 | Reserved,
    SuperKeyword    = 88 | Reserved,
    SwitchKeyword   = 89 | Reserved,
    ThisKeyword     = 90 | Reserved,
    ThrowKeyword    = 91 | Reserved,
    TryKeyword      = 92 | Reserved,
    WhileKeyword    = 93 | Reserved,
    WithKeyword     = 94 | Reserved,

    /* Eval & arguments */
    Arguments        = 95 | Identifier,
    Eval             = 96 | Identifier,

    /* Decorators */
    At               = 97 | Identifier,

    /* Private names or shebang comment start */
    Hash             = 98 | Identifier,

    /* Strict mode reserved words */
    ImplementsKeyword = 99 | FutureReserved,
    InterfaceKeyword  = 100 | FutureReserved,
    PackageKeyword    = 101 | FutureReserved,
    PrivateKeyword    = 102 | FutureReserved,
    ProtectedKeyword  = 103 | FutureReserved,
    PublicKeyword     = 104 | FutureReserved,
    StaticKeyword     = 105 | FutureReserved,
    YieldKeyword      = 106 | FutureReserved,

    /* Contextual keywords */
    AsKeyword          = 107 | Contextual,
    AsyncKeyword       = 108 | Contextual,
    AwaitKeyword       = 109 | Contextual,
    ConstructorKeyword = 110 | Contextual,
    GetKeyword         = 111 | Contextual,
    SetKeyword         = 112 | Contextual,
    FromKeyword        = 113 | Contextual,
    OfKeyword          = 114 | Contextual,

    /* Comments */
    SingleComment      = 115 | WhiteSpace | Comments,
    MultiComment       = 116 | WhiteSpace | Comments,
    HTMLComment        = 117 | WhiteSpace | Comments,

    /* WhiteSpace */
    Space              = 118 | WhiteSpace,
    Tab                = 119 | WhiteSpace,
    LineFeed           = 120 | WhiteSpace,
    CarriageReturn     = 121 | WhiteSpace,

    /* Numbers */
    BigInt             = 122 | NumericLiteral,

    /* Enum */
    EnumKeyword        = 123 | Reserved,
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

    /* Punctuator */
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

     /* Eval & arguments */
     'arguments', 'eval',

     /* Decorators */
     'at',

     /* Private names or shebang comment start */
     '#',

    /* Strict mode reserved words */
    'implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'yield',

    /* Contextual keywords */
    'as', 'async', 'await', 'constructor', 'get', 'set', 'from', 'of',

    /* Comments */
    'SingleComment', 'MultiComment', 'HTMLComment',

    /* WhiteSpace */
    'space', 'tab', 'line feed', 'carrige return',

    /* Numbers */
    'bigInt',

    /* Enum */

    'enum'
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

// Used `Object.create(null)` to avoid potential `Object.prototype`
// interference.
const descKeywordTable: {[key: string]: Token} = Object.create(null, {
    this: {value: Token.ThisKeyword},
    function: {value: Token.FunctionKeyword},
    if: {value: Token.IfKeyword},
    return: {value: Token.ReturnKeyword},
    var: {value: Token.VarKeyword},
    else: {value: Token.ElseKeyword},
    for: {value: Token.ForKeyword},
    new: {value: Token.NewKeyword},
    in: {value: Token.InKeyword},
    typeof: {value: Token.TypeofKeyword},
    while: {value: Token.WhileKeyword},
    case: {value: Token.CaseKeyword},
    break: {value: Token.BreakKeyword},
    try: {value: Token.TryKeyword},
    catch: {value: Token.CatchKeyword},
    delete: {value: Token.DeleteKeyword},
    throw: {value: Token.ThrowKeyword},
    switch: {value: Token.SwitchKeyword},
    continue: {value: Token.ContinueKeyword},
    default: {value: Token.DefaultKeyword},
    instanceof: {value: Token.InstanceofKeyword},
    do: {value: Token.DoKeyword},
    void: {value: Token.VoidKeyword},
    finally: {value: Token.FinallyKeyword},
    arguments: {value: Token.Arguments},
    async: {value: Token.AsyncKeyword},
    await: {value: Token.AwaitKeyword},
    class: {value: Token.ClassKeyword},
    const: {value: Token.ConstKeyword},
    constructor: {value: Token.ConstructorKeyword},
    debugger: {value: Token.DebuggerKeyword},
    enum: {value: Token.EnumKeyword},
    eval: {value: Token.Eval},
    export: {value: Token.ExportKeyword},
    extends: {value: Token.ExtendsKeyword},
    false: {value: Token.FalseKeyword},
    from: {value: Token.FromKeyword},
    get: {value: Token.GetKeyword},
    implements: {value: Token.ImplementsKeyword},
    import: {value: Token.ImportKeyword},
    interface: {value: Token.InterfaceKeyword},
    let: {value: Token.LetKeyword},
    null: {value: Token.NullKeyword},
    of: {value: Token.OfKeyword},
    package: {value: Token.PackageKeyword},
    private: {value: Token.PrivateKeyword},
    protected: {value: Token.ProtectedKeyword},
    public: {value: Token.PublicKeyword},
    set: {value: Token.SetKeyword},
    static: {value: Token.StaticKeyword},
    super: {value: Token.SuperKeyword},
    true: {value: Token.TrueKeyword},
    with: {value: Token.WithKeyword},
    yield: {value: Token.YieldKeyword},
    as: {value: Token.AsKeyword},
 });

export function descKeyword(value: string): Token {
    return (descKeywordTable[value] | 0) as Token;
}
