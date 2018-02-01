export const enum Context {
    None = 0,

    /* options */
    OptionsNext             = 1 << 0,
    OptionsRanges           = 1 << 1,
    OptionsLoc              = 1 << 2,
    OptionsJSX              = 1 << 3,
    OptionsRaw              = 1 << 4,
    OptionsSource           = 1 << 5,
    OptionsComments         = 1 << 6,
    OptionsTolerant         = 1 << 7,

    AllowIn                 = 1 << 8,
    Strict                  = 1 << 9,
    Module                  = 1 << 10,
    TaggedTemplate          = 1 << 11,
    AnnexB                  = 1 << 12,
    Expression              = 1 << 13,
    InParameter             = 1 << 14,
    Yield                   = 1 << 15,
    Async                   = 1 << 16,
    InArrowParameterList    = 1 << 17,
    ArrowFunction           = 1 << 18,
    TopLevel                = 1 << 19,
    Optional                = 1 << 20,
    AllowConstructor        = 1 << 21,
    ValidateEscape          = 1 << 22,
    Lexical                 = 1 << 23,
    Const                   = 1 << 24,
    StrictReserved          = 1 << 25,
    Method                  = 1 << 26,
    AsyncFunction           = 1 << 27,
    ProhibitWhitespace      = 1 << 28,
    ForStatement            = 1 << 29,
    InParenthesis           = 1 << 30,
    InClass                 = 1 << 31,

}

export const enum Expression {
    None        = 0,
    Statement   = 1 << 0,
    Async      = 1 << 1
}

export const enum Flags {
    None = 0,
    LineTerminator          = 1 << 0,
    AllowContinue           = 1 << 1,
    AllowBreak              = 1 << 2,
    InFunctionBody          = 1 << 3,
    SimpleParameterList     = 1 << 4,
    Octal                   = 1 << 5,
    ContainsSeparator       = 1 << 6,
    ProtoField              = 1 << 7,
    DuplicateProtoField     = 1 << 8,
    ExtendedUnicodeEscape   = 1 << 9,
    StrictDirective         = 1 << 10,
    Await                   = 1 << 11,
    WhiteSpace              = 1 << 12,
    ReservedWords           = 1 << 13,
    Yield = 1 << 14,
    HasCommaSeparator = 1 << 15,
}

export const enum ObjectState {
    None            = 0,
    Static          = 1 << 0,
    Computed        = 1 << 1,
    Set             = 1 << 2,
    Get             = 1 << 3,
    Generator       = 1 << 4,
    Async           = 1 << 5,
    Constructor     = 1 << 6,
    Method          = 1 << 7,
    Shorthand       = 1 << 8,
    PrivateField    = 1 << 9,
    Prototype       = 1 << 10,
    Heritage        = 1 << 11,
    HasRest         = 1 << 12,
    HasConstructor  = 1 << 13,
    Accessors = Get | Set,
    Special = Accessors | Generator | Async
}

export const enum ScannerState {
    None        = 0,
    NewLine     = 1 << 0,
    SameLine    = 1 << 1,
    LastIsCR    = 1 << 2,
    LineStart   = 1 << 3,

    /* comments */
    SingleLine  = 1 << 4,
    HTMLOpen    = 1 << 5,
    HTMLClose   = 1 << 6,
    SheBang     = 1 << 7,
    FlowComment = 1 << 8,
}

export const enum Escape {
    Empty = -1,
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex = -4,
    OutOfRange = -5,
}

// Regular expression scanning
export const enum RegExpState {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2,
}

// Spidermonkey values
export const enum RegexFlags {
    None        = 0,
    IgnoreCase = 1 << 0,
    Global     = 1 << 1,
    Multiline  = 1 << 2,
    Unicode    = 1 << 3,
    Sticky     = 1 << 4,
    DotAll     = 1 << 5,
}

export const enum NumericState {
    None                    = 0,
    Decimal                 = 1 << 0,
    DecimalWithLeadingZero  = 1 << 1,
    Hexadecimal             = 1 << 2,
    Octal                   = 1 << 3,
    ImplicitOctal           = 1 << 4,
    Binary                  = 1 << 5,
    Float                   = 1 << 6,
    AllowSeparator          = 1 << 7,
    ContainsSeparator       = 1 << 8,
    BigInt                  = 1 << 9,

    Hibo = Hexadecimal | ImplicitOctal | Binary | Octal
}

export const enum ParenthesizedState {
    None               = 0,
    NestedParenthesis  = 1 << 0,   // E.g. '((a = function b() {}))'
    BindingPattern     = 1 << 1,   // E.g. '({foo: bar})', '{[()]}'
    FutureReserved     = 1 << 2,    // E.g. '(package')
    EvalOrArguments    = 1 << 3,   // Use this to track 'eval' and 'arguments
    Await              = 1 << 4,
    Yield              = 1 << 5,
    Trailing           = 1 << 6,
}

export const enum ArrayState {
    None = 0,
    CommaSeparator = 1 << 0
}