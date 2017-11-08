// Simple immutable bit set passed around as arguments
export const enum Context {
    None                   = 0,
    Module                 = 1 << 0,   // If node was parsed in module code
    Strict                 = 1 << 1,   // If node was parsed in strict mode
    AllowIn                = 1 << 2,   // If node was parsed in a context where 'in-expressions' are allowed
    SimpleArrow            = 1 << 3,   // If node was parsed in a arrow context as plain identifier
    Yield                  = 1 << 4,   // If node was parsed in the 'yield' context created when parsing a generator
    Await                  = 1 << 5,   // If node was parsed in the 'await' context created when parsing an async function
    InParenthesis          = 1 << 6,   // If node was parsed in a parenthesized expression context
    InParameter            = 1 << 7,   // If node was parsed in the formal list of an function
    InAsyncParameterList   = 1 << 8,   // If node was parsed in the formal list of an async arrow function
    InArrowParameterList   = 1 << 9,   // If node was parsed in the formal list of an arrow function
    TopLevel               = 1 << 10,  // If node was parsed at the TopLevel
    IfClause               = 1 << 11,  // If node was parsed in a if statement (early error related)
    AnnexB                 = 1 << 12,  // If node was parsed in the 'if statement' with the AnnexB semtantic
    Assignment             = 1 << 13,  
    JSXChild               = 1 << 14,  // If node was parsed in a JSX context and has JSX children
    Import                 = 1 << 15,  // Module ( strict and non-strict)
    OptionalIdentifier     = 1 << 16,  // Optional identifier for export of either anonymous class or function declaration
    Method                 = 1 << 17,  // If node was parsed in a object / class method definition context
    HasConstructor         = 1 << 18,  // If node was parsed inside Class and allow super
    Constructor            = 1 << 19,  // Class declaration / expression
    ForStatement           = 1 << 20,  // If node was parsed in a for / for - in / for -of context
    TaggedTemplate         = 1 << 21,  // 
    Labelled               = 1 << 22,  // 
    Iteration              = 1 << 23,  // 
    LocationTracking       = 1 << 24,
    Expression             = 1 << 25,
    Let                    = 1 << 26,  // Variable declaration
    Const                  = 1 << 27,  // Variable declaration


    // An Lexical declaration can be either 'const¨' or 'let
    Lexical = Let | Const,
}

// Mutable parser flags
export const enum Flags {
    None                         = 0,
    LineTerminator               = 1 << 0, // If node has a LT
    HasUnicode                   = 1 << 1, // If node has any escaped unicode sequences (escaped characters in keywords).
    InFunctionBody               = 1 << 2, // If node was parsed in a function body
    AllowCall                    = 1 << 3, // If node was parsed in a context where call should be allowed
    Break                        = 1 << 4,
    Iteration                    = 1 << 5,
    Switch                       = 1 << 6,
    HasPrototype                 = 1 << 7,
    HaveSeenYield                = 1 << 8,  // Used if we have seen a 'yield' token. E.g. in arrow formal param list
    HaveSeenAwait                = 1 << 9,  // Used if we have seen a 'await' token. E.g. in async arrow formal param list
    BindingPosition              = 1 << 10, // Used if an "identifier" are used in binding position in strict mode
    HasStrictDirective           = 1 << 11, // Only used if we have seen a "use strict"; directive
    Noctal                       = 1 << 12, // e.g. `0777`
    BigInt                       = 1 << 13, // e.g. `100n`
    SimpleParameterList          = 1 << 14,
    ParenthesizedPattern         = 1 << 15,

    /* Options */
    OptionsRanges                = 1 << 16, // Enable / disable "ranges"
    OptionsLoc                   = 1 << 17, // Enable / disable location tracking on the node
    OptionsSource                = 1 << 18,
    OptionsJSX                   = 1 << 19, // Enable / disable JSX extension
    OptionsRaw                   = 1 << 20, // Enable / disable "raw" property on the node
    OptionsNext                  = 1 << 21, // Enable / disable Stage 3 proposals
    OptionsDirectives            = 1 << 22, // Enable / disable directives on the node
    OptionsComments              = 1 << 23, // Enable / disable comment collecting
    OptionsDelegate              = 1 << 24, // Enable / disable token syntax delegate
    OptionsV8                    = 1 << 25, // Enable / disable V8 experimental features
    OptionsGlobalReturn          = 1 << 26, // Allow return statement in global scope,
    OptionsSourceType            = 1 << 27, // Allow legacy method for settings sourceType - e.g. 'module' or 'script'

    // Common mask used to verify if either ranges or locations are enabled
    LocationTracking = OptionsRanges | OptionsLoc,

    GlobalReturn = OptionsGlobalReturn |  InFunctionBody
}

// Flags used in 'ForStatement'
export const enum IterationState {
    None        = 0,
    Var         = 1 << 0,
    Const       = 1 << 1,
    Let         = 1 << 2,
    Await       = 1 << 3,
    Lexical     = Const | Let,
    Variable    = Var | Const | Let,
}

export const enum NumberState {
    None        = 0,
    Float       = 1 << 1, // e.g. `09.01`
    Exponent    = 1 << 2, // e.g. `10e2`
    BigInt      = 1 << 3, // e.g. `100n`

    // BigInt implementation can't handle either float or exponent acc. TC-39
    FloatOrExponent = Float | Exponent,
}

// Flags used in parenthesized to validate arrow formal list
export const enum ParenthesizedState {
    None            = 0,
    EvalOrArg       = 1 << 0, // If (async) arrow contains eval or agruments
    Await           = 1 << 1, // If async arrow contains 'await'
    Parenthesized   = 1 << 2, // Tracks invalid parenthesized pattern
    Trailing        = 1 << 3, // Tracks trailing commas
    Pattern         = 1 << 4,
    FutureReserved  = 1 << 5,
}

// Flags used by both object expression and class decl / expr
export const enum ObjectState {
    None            = 0,
    Yield           = 1 << 0,
    Async           = 1 << 1,
    Computed        = 1 << 2,
    Shorthand       = 1 << 3,
    Get             = 1 << 4,
    Set             = 1 << 5,
    Method          = 1 << 6,
    HasConstructor  = 1 << 7,
    Heritage        = 1 << 8,
    Static          = 1 << 9,
    Special         = 1 << 10,
    Constructor     = 1 << 11,
    Accessors = Get | Set,
    Modifiers = Accessors | Method | Yield
}

// A set of flags for  maintaining the internal state machine.
export const enum Scanner {
    None            = 0,
    LastIsCR        = 1 << 1, // Tracks if previous scanned character was CR
    LineStart       = 1 << 2, // Tracks if this is start of line
    MultiLine       = 1 << 3, // MultiLine comment
    SingleLine      = 1 << 4, // SingleLine comment (HTML, Shebang or plain)
    Closed          = 1 << 5, // If the node was closed or not

    // Collectable comments - single and multiline (shebang excluded)
    Collectable = SingleLine | MultiLine
}

export const enum ArrayState {
    None      = 0,
    EvalArg   = 1 << 0,
    Spread    = 1 << 1,
}

// Regular expression scanning
export const enum RegExpState {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2,
}

// Spidermonkey values
export const enum RegexFlags {
    None = 0,
    IgnoreCase = 1 << 0,
    Global     = 1 << 1,
    Multiline  = 1 << 2,
    Unicode    = 1 << 3,
    Sticky     = 1 << 4,
    DotAll     = 1 << 5,
}

export const enum ScopeMasks {
    Shadowable = 0x1,
    NonShadowable = 0x2,
}

export const enum Escape {
    Empty       = -1,
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex  = -4,
    OutOfRange  = -5,
    TemplateOctalLiteral = -6,
}

