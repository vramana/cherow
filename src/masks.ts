export const enum Context {
    None                   = 0,
    Module                 = 1 << 0,   // If node was parsed in module code
    Strict                 = 1 << 1,   // If node was parsed in strict mode
    Statement              = 1 << 2,   // If node was parsed in a statement context
    JSXChild               = 1 << 3,   // If node was parsed in a JSX context and has JSX children
    SimpleArrow            = 1 << 4,   // If node was parsed in a arrow context as plain identifier
    Arrow                  = 1 << 5,   // If node was parsed in a arrow context
    AsyncFunctionBody      = 1 << 6,   // If node was parsed in a async arrow body context
    ConciseBody            = 1 << 7,   // If node was parsed in a arrow body context with concise body
    Parenthesis            = 1 << 8,   // If node was parsed in a parenthesized expression context
    Await                  = 1 << 9,   // If node was parsed in the 'await' context created when parsing an async function
    Yield                  = 1 << 10,  // If node was parsed in the 'yield' context created when parsing a generator
    AllowIn                = 1 << 11,  // If node was parsed in a context where 'in-expressions' are allowed
    ForStatement           = 1 << 12,  // If node was parsed in a for / for - in / for -of context
    AnnexB                 = 1 << 13,  // If node was parsed in the 'if statement' with the AnnexB semtantic
    OptionalIdentifier     = 1 << 14,  // Optional identifier for export of either anonymous class or function declaration
    IfClause               = 1 << 15,  // If node was parsed in a if statement (early error related)
    Super                  = 1 << 16,  // If super are required
    DynamicImport          = 1 << 17,  // If node was parsed in dynamic import context (ESNext feature)
    NewExpression          = 1 << 18,  // If node was parsed in the 'New' expression
    Method                 = 1 << 19,  // If node was parsed in a object method context
    Binding                = 1 << 20,  // If node was parsed in a binding context
    Constructor            = 1 << 21,  // Class declaration / expression
    HasConstructor         = 1 << 22,  // If node was parsed inside Class and allow super
    IfStatement            = 1 << 23,  // If node was parsed in a binding context
    RequireInitializer     = 1 << 24,  // If node was parsed in a context where a variable declaration initializer are required (export)
    Export                 = 1 << 25,  // Variable declaration
    Const                  = 1 << 26,  // Variable declaration
    Let                    = 1 << 27,  // Variable declaration
    Var                    = 1 << 28,  // Variable declaration
    Declaration            = 1 << 29,  // Variable declaration

    // An Lexical declaration can be either 'const¨' or 'let
    Lexical = Let | Const,

    // Error tracker related
    AwaitOrYield = Await | Yield
}

export const enum Flags {
    None                         = 0,
    LineTerminator               = 1 << 0,
    JSX                          = 1 << 1,  // Allows JSX extension
    InFunctionBody               = 1 << 2,  // If node was parsed in a function body
    HasRest                      = 1 << 3,
    HasPrototype                 = 1 << 4,
    HasMemberExpression          = 1 << 5,  // If the program contain a member expression - '([a.a]) => 42'
    HasReservedWord              = 1 << 6,  // If the program contains a reserved word
    HasEvalArgInParam            = 1 << 7,  // If the source contain either 'eval' or 'arguments'
    NonSimpleParameter           = 1 << 8,
    ArgumentList                 = 1 << 9,
    Break                        = 1 << 10,
    Continue                     = 1 << 11,
    Switch                       = 1 << 12,
    AllowConstructorWithSupoer   = 1 << 13,
    Arrow                        = 1 << 14, // If node was parsed in the 'arrow' context
    AsyncArrow                   = 1 << 15, // If node was parsed in the 'async' context
    HasUnicode                   = 1 << 16,

    /* Numeric */
    Noctal                       = 1 << 17, // e.g. `0777`
    BigInt                       = 1 << 18, // e.g. `100n`
    Float                        = 1 << 19, // e.g. `09.01`
    Exponent                     = 1 << 20, // e.g. `10e2`

    /* Options */
    OptionsRanges                = 1 << 21,
    OptionsLoc                   = 1 << 22,
    OptionsSource                = 1 << 23,
    OptionsJSX                   = 1 << 24,
    OptionsRaw                   = 1 << 25,
    OptionsNext                  = 1 << 26,
    OptionsOnComment             = 1 << 27,
    OptionsOnToken               = 1 << 28,
    OptionsV8                    = 1 << 29,

    // BigInt implementation can't handle either float or exponent acc. TC-39
    FloatOrExponent = Float | Exponent
}

export const enum IterationState {
    None                = 0,
    Var                 = 1 << 0,  // Variable declaration
    Let                 = 1 << 1,  // Variable declaration
    Const               = 1 << 2,  // Variable declaration
    Await               = 1 << 3,  // If node was parsed in the 'await' context (Asynchronous Iteration)
    Variable = Var | Let | Const
}

export const enum ObjectState {
    None                = 0,
    Method          = 1 << 0, // Methoddefinition kind
    Static          = 1 << 1,
    Async           = 1 << 2,
    Get             = 1 << 3,
    Set             = 1 << 4,
    Yield           = 1 << 5,
    Computed        = 1 << 6,
    Constructor     = 1 << 7,
    Super           = 1 << 8,
    Heritage        = 1 << 9,
    Shorthand       = 1 << 10,
    Special         = 1 << 11,
    HasUnicode      = 1 << 12, // If node contains extended unicodeEscape
    HasConstructor  = 1 << 13, // Class declaration / class
    Accessors       = Get | Set,
    Modifiers       = Accessors | Method | Yield
}

export const enum ParenthesizedState {
    None           = 0,
    Reserved       = 1 << 1,
    WrappedInParen = 1 << 2,
    TrailingComma  = 1 << 3,
}

export const enum ScopeMasks {
    Shadowable = 0x1,
    NonShadowable = 0x2,
}

// Regular expression scanning
export const enum RegExpState {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2,
}

// Spidermonkey values
export const enum RegExpFlag {
    None = 0x00,
    Global = 0x01,
    Unicode = 0x02,
    Sticky = 0x04,
    Multiline = 0x08,
    IgnoreCase = 0x10,
    DotAll = 0x20,
}