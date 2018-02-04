export const enum Context {
    None = 0,

    /* options */
    OptionsNext             = 1 << 0,
    OptionsRanges           = 1 << 1,
    OptionsLoc              = 1 << 2,
    OptionsRaw              = 1 << 3,
    OptionsSource           = 1 << 4,
    OptionsComments         = 1 << 5,
    OptionsEarly            = 1 << 6,

    /* miscellaneous */
    AllowIn                 = 1 << 7,  // Node was parsed in a context where 'in-expressions' are allowed
    Strict                  = 1 << 8,  // Node was parsed in a strict mode context
    Module                  = 1 << 9, // Node was parsed in a module code context
    TaggedTemplate          = 1 << 10, // Node was parsed as the body of an IFStatement - 'consequent' or 'alternate'
    IfBody                  = 1 << 11,
    Expression              = 1 << 12,
    InParameter             = 1 << 13,
    YieldContext            = 1 << 14,  // Node was parsed in the 'yield' context created when parsing an async function
    AsyncContext            = 1 << 15,  // Node was parsed in the 'async' context created when parsing an async function
    InArrowParameterList    = 1 << 16,
    ArrowFunction           = 1 << 17,
    TopLevel                = 1 << 18,
    AllowSuperProperty      = 1 << 19,
    ValidateEscape          = 1 << 20,
    Let                     = 1 << 21,  // Variable declaration
    Const                   = 1 << 22,  // Variable declaration
    Statement               = 1 << 23,
    Method                  = 1 << 24,
    AsyncFunction           = 1 << 25,
    ProhibitWhitespace      = 1 << 26, // Scanner related.
    ForStatement            = 1 << 27,
    InParenthesis           = 1 << 28,
    InClass                 = 1 << 29,
    InTypeAnnotation        = 1 << 30,
    BlockScoped  = Let | Const

}

/* Mutable parser flags */

export const enum Flags {
    None                    = 0,
    LineTerminator          = 1 << 0,
    AllowContinue           = 1 << 1, // If node was parsed in a context where 'continue' are allowed
    AllowBreak              = 1 << 2, // If node was parsed in a context where 'breal' are allowed
    InFunctionBody          = 1 << 3, // If node was parsed inside a functions body
    SimpleParameterList     = 1 << 4,
    Octal                   = 1 << 5, // If node contains and legacy octal numbers
    ContainsSeparator       = 1 << 6, // Stage 3 related;
    ProtoField              = 1 << 7, // If node contains any '__proto__' fields
    DuplicateProtoField     = 1 << 8, // If node contains any duplicate '__proto__' fields
    ExtendedUnicodeEscape   = 1 << 9,
    StrictDirective         = 1 << 10, // If node was parsed in a strict directive context
    HasAwait                = 1 << 11,
    HasYield                = 1 << 12,
    WhiteSpace              = 1 << 13,
    ReservedWords           = 1 << 14,
    HasCommaSeparator       = 1 << 15,
    DisallowArrowFunction   = 1 << 16, // Disallow arrows in 'new expression' context
    CoverInitializedName = 1 << 17,
    CoverGrammer = 1 << 18
}

/** Shared between class and objects */

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

/* Scanner */

export const enum ScannerState {
    None        = 0,
    NewLine     = 1 << 0,
    SameLine    = 1 << 1,
    LastIsCR    = 1 << 2,
    LineStart   = 1 << 3,

    /* Misc */

    Escape = 1 << 4,

    /* comments */
    SingleLine  = 1 << 5,
    HTMLOpen    = 1 << 6,
    HTMLClose   = 1 << 7,
    SheBang     = 1 << 8,
    FlowComment = 1 << 9,
}

/* Shared between string literal and templates */
export const enum Escape {
    Empty = -1,
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex = -4,
    OutOfRange = -5,
}

/* Regular expression scanning */
export const enum RegExpState {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2,
}

/* Spidermonkey values */
export const enum RegexFlags {
    None        = 0,
    IgnoreCase = 1 << 0,
    Global     = 1 << 1,
    Multiline  = 1 << 2,
    Unicode    = 1 << 3,
    Sticky     = 1 << 4,
    DotAll     = 1 << 5,
}

/* Numeric literal state flags */

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
    NestedParenthesis  = 1 << 0,  // E.g. '((a = function b() {}))'
    BindingPattern     = 1 << 1,  // E.g. '({foo: bar})', '{[()]}'
    FutureReserved     = 1 << 2,  // E.g. '(package')
    EvalOrArguments    = 1 << 3,  // Use this to track 'eval' and 'arguments
    Await              = 1 << 4,
    Yield              = 1 << 5,
    Trailing           = 1 << 6,
}

export const enum ArrayState {
    None                = 0,
    CommaSeparator      = 1 << 0,
    EvalOrArguments     = 1 << 1,
}