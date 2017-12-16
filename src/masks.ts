// Simple immutable bit set passed around as arguments
export const enum Context {
    None                   = 0,
    Module                 = 1 << 0,   // If node was parsed in module code
    Strict                 = 1 << 1,   // If node was parsed in strict mode
    AllowIn                = 1 << 2,   // If node was parsed in a context where 'in-expressions' are allowed
    Arrow                  = 1 << 3,   // If node was parsed in a arrow context as plain identifier
    Yield                  = 1 << 4,   // If node was parsed in the 'yield' context created when parsing a generator
    Await                  = 1 << 5,   // If node was parsed in the 'await' context created when parsing an async function
    InParenthesis          = 1 << 6,   // If node was parsed in a parenthesized expression context
    InParameter            = 1 << 7,   // If node was parsed in the formal list of an function
    InAsyncArgs            = 1 << 8,   // If node was parsed in the formal list of an async arrow function
    InArrowParameterList   = 1 << 9,   // If node was parsed in the formal list of an arrow function
    Declaration            = 1 << 10,  
    ExistingScope          = 1 << 11,  // If node was parsed in a context where the scope shouldn't be undefined
    AnnexB                 = 1 << 12,  // If node was parsed in the 'if statement' with the AnnexB semtantic
    Import                 = 1 << 13,  // Module ( strict and non-strict)
    OptionalIdentifier     = 1 << 14,  // Optional identifier for export of either anonymous class or function declaration
    Method                 = 1 << 15,  // If node was parsed in a object / class method definition context
    HasConstructor         = 1 << 16,  // If node was parsed inside Class and allow super
    Constructor            = 1 << 17,  // Class declaration / expression
    ForStatement           = 1 << 18,  // If node was parsed in a for / for - in / for -of context
    Template               = 1 << 19,  //
    TaggedTemplate         = 1 << 20,  //
    Labelled               = 1 << 21,  //
    Statement              = 1 << 22,  //
    Fields                 = 1 << 23,  // If node was parsed in a class fields context
    LocationTracking       = 1 << 24,
    Expression             = 1 << 25,
    Pattern                = 1 << 26,
    ValidateEscape         = 1 << 27,  // If node was parsed in a context where escaped keywords are forbidden
    Let                    = 1 << 28,  // Variable declaration
    Const                  = 1 << 29,  // Variable declaration
    ImportExport           = 1 << 30,  // Variable declaration
    
    // An Lexical declaration can be either 'const¨' or 'let
    Lexical = Let | Const,

    YieldAwait = Yield | Await
    
}

// Mutable parser flags
export const enum Flags {
    None                         = 0,
    PrecedingLineBreak           = 1 << 0,
    ExtendedUnicodeEscape        = 1 << 1, // If node has any escaped unicode sequences (escaped characters in keywords).
    InFunctionBody               = 1 << 2, // If node was parsed in a function body
    AllowCall                    = 1 << 3, // If node was parsed in a context where call should be allowed
    BreakStatement               = 1 << 4,
    IterationStatement           = 1 << 5,
    SwitchStatement              = 1 << 6,
    HasPrototype                 = 1 << 7,
    Yield                        = 1 << 8,  // Used if we have seen a 'yield' token. E.g. in arrow formal param list
    Await                        = 1 << 9,  // Used if we have seen a 'await' token. E.g. in async arrow formal param list
    Rest                         = 1 << 10,
    Binding                      = 1 << 11, // Used if an "identifier" are used in binding position in strict mode
    DirectivePrologue            = 1 << 12, // Only used if we have seen a "use strict"; directive
    BigInt                       = 1 << 13, // e.g. `100n`
    SimpleParameterList          = 1 << 14,
    ParenthesizedPattern         = 1 << 15,
    Octal                        = 1 << 16, // e.g. `0777`

    /* Options */
    OptionsRanges                = 1 << 17, // Enable / disable "ranges"
    OptionsLoc                   = 1 << 18, // Enable / disable location tracking on the node
    OptionsSource                = 1 << 19,
    OptionsJSX                   = 1 << 20, // Enable / disable JSX extension
    OptionsRaw                   = 1 << 21, // Enable / disable "raw" property on the node
    OptionsNext                  = 1 << 22, // Enable / disable Stage 3 proposals
    OptionsDirectives            = 1 << 23, // Enable / disable directives on the node
    OptionsDelegate              = 1 << 24, // Enable / disable token syntax delegate
    OptionsGlobalReturn          = 1 << 25, // Allow return statement in global scope,
    OptionsSourceType            = 1 << 26, // Allow legacy method for settings sourceType - e.g. 'module' or 'script'
    OptionsTolerant              = 1 << 27,
    OptionsPlugins               = 1 << 28,
    Duplicate                    = 1 << 29,
    ContainsSeparator            = 1 << 30,

    // Common mask used to verify if either ranges or locations are enabled
    LocationTracking = OptionsRanges | OptionsLoc,

    GlobalReturn = OptionsGlobalReturn |  InFunctionBody
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
    Yield  = 1 << 6,
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
    Constructor     = 1 << 10,
    Super           = 1 << 11,
    Prototype       = 1 << 12,
    Delete       = 1 << 13,
    Accessors = Get | Set,
    Modifiers = Accessors | Method | Yield,
    Special = Accessors | Yield | Async
}

// A set of flags for  maintaining the internal state machine.
export const enum ScanState {
    None            = 0,
    LastIsCR        = 1 << 1, // Tracks if previous scanned character was CR
    LineStart       = 1 << 2, // Tracks if this is start of line
    MultiLine       = 1 << 3, // MultiLine comment
    SingleLine      = 1 << 4, // SingleLine comment (HTML, Shebang or plain)
    Terminated      = 1 << 5, // If the node was closed or not
    Unicode         = 1 << 6, // If the node was closed or not
    SameLine        = 1 << 7, // If the node was closed or not

    // Collectable comments - single and multiline (shebang excluded)
    Collectable = SingleLine | MultiLine
}

export const enum NumericState {
   None = 0,
   Decimal                  = 1 << 0,
   DecimalWithLeadingZero   = 1 << 1,
   ImplicitOctal            = 1 << 2,
   Hex                      = 1 << 3,
   Octal                    = 1 << 4,
   Binary                   = 1 << 5,
   BigInt                   = 1 << 6,
   Float                    = 1 << 7,
   AllowSeparator           = 1 << 8, // Numeric Separator specific

   Noctal = ImplicitOctal | DecimalWithLeadingZero,
   
   Boh = Binary | Octal | Hex
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

export const enum FieldState {
    None = 0,
    Method = 1 << 0,
    Scope = 1 << 1,
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
