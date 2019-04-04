/**
 * The token types and attributes.
 */
export const enum Token {
    Type = 0xff,

    /* Precedence for binary operators (always positive) */
    PrecStart = 8,
    Precedence = 15 << PrecStart, // 8-11

    /* Attribute names */
    Contextual     = 1 << 12,
    Reserved       = 1 << 13,
    FutureReserved = 1 << 14,
    Template = 1 << 15,
    IsIdentifier = 1 << 16,
    IsStringOrNumber = 1 << 17,
    IsIdentifierName = 1 << 18 | IsIdentifier | Contextual | Reserved,
    BadEscape = 1 << 19,
    IsPatternStart = 1 << 20,
    IsLogical = 1 << 21,
    IsExpressionStart    = 1 << 22,
    IsAssignOp           = 1 << 23,
    IsBinaryOp           = 1 << 24 | IsExpressionStart,
    IsUnaryOp            = 1 << 25 | IsExpressionStart,
    IsUpdateOp           = 1 << 26 | IsExpressionStart,
    ASI                  = 1 << 27,
    VarDecl              = 1 << 28,

    /* Node types */
    EndOfSource = 0 | ASI, // Pseudo

    /* Constants/Bindings */
    Identifier        = 1 | IsIdentifier,
    NumericLiteral    = 2 | IsStringOrNumber,
    StringLiteral     = 3 | IsStringOrNumber,
    RegularExpression = 4,
    FalseKeyword      = 5 | Reserved,
    TrueKeyword       = 6 | Reserved,
    NullKeyword       = 7 | Reserved,

    /* Template nodes */
    TemplateSpan = 8 | Template | IsExpressionStart,
    TemplateTail = 9 | Template | IsExpressionStart,

    /* Punctuators */
    Arrow        = 10, // =>
    LeftParen    = 11 | IsExpressionStart, // (
    LeftBrace    = 12 | IsExpressionStart | IsPatternStart, // {
    Period       = 13, // .
    Ellipsis     = 14, // ...
    RightBrace   = 15 | ASI, // }
    RightParen   = 16, // )
    Semicolon    = 17 | ASI, // ;
    Comma        = 18, // ,
    LeftBracket  = 19 | IsPatternStart | IsExpressionStart, // [
    RightBracket = 20, // ]
    Colon        = 21, // :
    QuestionMark = 22, // ?
    SingleQuote  = 23, // '
    DoubleQuote  = 24, // "
    JSXClose     = 25, // </
    JSXAutoClose = 26, // />

    /* Update operators */
    Increment = 27 | IsUpdateOp, // ++
    Decrement = 28 | IsUpdateOp, // --

    /* Assign operators */
    Assign                  = 29 | IsAssignOp, // =
    ShiftLeftAssign         = 30 | IsAssignOp, // <<=
    ShiftRightAssign        = 31 | IsAssignOp, // >>=
    LogicalShiftRightAssign = 32 | IsAssignOp, // >>>=
    ExponentiateAssign      = 33 | IsAssignOp, // **=
    AddAssign               = 34 | IsAssignOp, // +=
    SubtractAssign          = 35 | IsAssignOp, // -=
    MultiplyAssign          = 36 | IsAssignOp, // *=
    DivideAssign            = 37 | IsAssignOp | IsExpressionStart, // /=
    ModuloAssign            = 38 | IsAssignOp, // %=
    BitwiseXorAssign        = 39 | IsAssignOp, // ^=
    BitwiseOrAssign         = 40 | IsAssignOp, // |=
    BitwiseAndAssign        = 41 | IsAssignOp, // &=

    /* Unary/binary operators */
    TypeofKeyword      = 42 | IsUnaryOp   | Reserved,
      DeleteKeyword      = 43 | IsUnaryOp   | Reserved,
      VoidKeyword        = 44 | IsUnaryOp   | Reserved,
      Negate             = 45 | IsUnaryOp, // !
      Complement         = 46 | IsUnaryOp, // ~
      Add                = 47 | IsUnaryOp   | IsBinaryOp | 9 << PrecStart, // +
      Subtract           = 48 | IsUnaryOp   | IsBinaryOp | 9 << PrecStart, // -
      InKeyword          = 49 | IsBinaryOp  | 7 << PrecStart | Reserved,
      InstanceofKeyword  = 50 | IsBinaryOp  | 7 << PrecStart | Reserved,
      Multiply           = 51 | IsBinaryOp  |  10 << PrecStart, // *
      Modulo             = 52 | IsBinaryOp  | 10 << PrecStart, // %
      Divide             = 53 | IsExpressionStart | IsBinaryOp  | 10 << PrecStart, // /
      Exponentiate       = 54 | IsBinaryOp  | 11 << PrecStart, // **
      LogicalAnd         = 55 | IsLogical | IsBinaryOp  | 2 << PrecStart, // &&
      LogicalOr          = 56 | IsLogical | IsBinaryOp  | 1 << PrecStart, // ||
      StrictEqual        = 57 | IsBinaryOp  | 6 << PrecStart, // ===
      StrictNotEqual     = 58 | IsBinaryOp  | 6 << PrecStart, // !==
      LooseEqual         = 59 | IsBinaryOp  | 6 << PrecStart, // ==
      LooseNotEqual      = 60 | IsBinaryOp  | 6 << PrecStart, // !=
      LessThanOrEqual    = 61 | IsBinaryOp  | 7 << PrecStart, // <=
      GreaterThanOrEqual = 62 | IsBinaryOp  | 7 << PrecStart, // >=
      LessThan           = 63 | IsExpressionStart | IsBinaryOp  | 7 << PrecStart, // <
      GreaterThan        = 64 | IsBinaryOp  | 7 << PrecStart, // >
      ShiftLeft          = 65 | IsBinaryOp  | 8 << PrecStart, // <<
      ShiftRight         = 66 | IsBinaryOp  | 8 << PrecStart, // >>
      LogicalShiftRight  = 67 | IsBinaryOp  | 8 << PrecStart, // >>>
      BitwiseAnd         = 68 | IsBinaryOp  | 5 << PrecStart, // &
      BitwiseOr          = 69 | IsBinaryOp  | 3 << PrecStart, // |
      BitwiseXor         = 70 | IsBinaryOp  | 4 << PrecStart, // ^

    /* Variable declaration kinds */
    VarKeyword   = 71 | Reserved | VarDecl | IsExpressionStart,
    LetKeyword   = 72 | FutureReserved | VarDecl | IsExpressionStart,
    ConstKeyword = 73 | Reserved | VarDecl | IsExpressionStart,

    /* Other reserved words */
    BreakKeyword    = 74 | Reserved,
    CaseKeyword     = 75 | Reserved,
    CatchKeyword    = 76 | Reserved,
    ClassKeyword    = 77 | Reserved | IsExpressionStart,
    ContinueKeyword = 78 | Reserved,
    DebuggerKeyword = 79 | Reserved,
    DefaultKeyword  = 80 | Reserved,
    DoKeyword       = 81 | Reserved,
    ElseKeyword     = 82 | Reserved,
    ExportKeyword   = 83 | Reserved,
    ExtendsKeyword  = 84 | Reserved,
    FinallyKeyword  = 85 | Reserved,
    ForKeyword      = 86 | Reserved,
    FunctionKeyword = 87 | Reserved | IsExpressionStart,
    IfKeyword       = 88 | Reserved,
    ImportKeyword   = 89 | Reserved | IsExpressionStart,
    NewKeyword      = 90 | Reserved | IsExpressionStart,
    ReturnKeyword   = 91 | Reserved,
    SuperKeyword    = 92 | Reserved | IsExpressionStart,
    SwitchKeyword   = 93 | Reserved | IsExpressionStart,
    ThisKeyword     = 94 | Reserved | IsExpressionStart,
    ThrowKeyword    = 95 | Reserved | IsExpressionStart,
    TryKeyword      = 96 | Reserved,
    WhileKeyword    = 97 | Reserved,
    WithKeyword     = 98 | Reserved,

    /* Strict mode reserved words */
    ImplementsKeyword = 99 | FutureReserved,
    InterfaceKeyword  = 100 | FutureReserved,
    PackageKeyword    = 101 | FutureReserved,
    PrivateKeyword    = 102 | FutureReserved,
    ProtectedKeyword  = 103 | FutureReserved,
    PublicKeyword     = 104 | FutureReserved,
    StaticKeyword     = 105 | FutureReserved,
    YieldKeyword      = 106 | FutureReserved | IsExpressionStart,

    /* Contextual keywords */
    AsKeyword          = 107 | Contextual,
    AsyncKeyword       = 108 | Contextual,
    AwaitKeyword       = 109 | Contextual | IsIdentifier,
    ConstructorKeyword = 110 | Contextual,
    GetKeyword         = 111 | Contextual,
    SetKeyword         = 112 | Contextual,
    FromKeyword        = 113 | Contextual,
    OfKeyword          = 114 | Contextual,
    EnumKeyword        = 115 | Reserved,

    Decorator          = 116 | Reserved,
    PrivateField       = 117 | Reserved,

    EscapedStrictReserved = 118 | IsIdentifier,
    EscapedKeyword       = 119 | IsIdentifier,

    Bigint  = 120 | IsExpressionStart,

    WhiteSpace = 121,
    LineTerminator = 122,

    Eval = 123 | IsIdentifier | IsExpressionStart,
    Arguments = 124 | IsIdentifier | IsExpressionStart,

    Illegal = 125
}

// Note: this *must* be kept in sync with the enum's order.
//
// It exploits the enum value ordering, and it's necessarily a complete and
// utter hack.
//
// All to lower it to a single monomorphic array access.
export const KeywordDescTable = [
    "end of source",

    /* Constants/Bindings */
    "identifier", "number", "string", "regular expression",
    "false", "true", "null",

    /* Template nodes */
    "template span", "template tail",

    /* Punctuators */
    "=>", "(", "{", ".", "...", "}", ")", ";", ",", "[", "]", ":", "?", "'", "\"", "</", "/>",

    /* Update operators */
    "++", "--",

    /* Assign operators */
    "=", "<<=", ">>=", ">>>=", "**=", "+=", "-=", "*=", "/=", "%=", "^=", "|=",
    "&=",

    /* Unary/binary operators */
    "typeof", "delete", "void", "!", "~", "+", "-", "in", "instanceof", "*", "%", "/", "**", "&&",
    "||", "===", "!==", "==", "!=", "<=", ">=", "<", ">", "<<", ">>", ">>>", "&", "|", "^",

    /* Variable declaration kinds */
    "var", "let", "const",

    /* Other reserved words */
    "break", "case", "catch", "class", "continue", "debugger", "default", "do", "else", "export",
    "extends", "finally", "for", "function", "if", "import", "new", "return", "super", "switch",
    "this", "throw", "try", "while", "with",

    /* Strict mode reserved words */
    "implements", "interface", "package", "private", "protected", "public", "static", "yield",

    /* Contextual keywords */
    "as", "async", "await", "constructor", "get", "set", "from", "of", "enum",

    /* Others */

    "@", "#", 'escaped strict reserved', 'escaped keyword', 'Bigint', 'Whitespace,', 'LineTerminator',

    "eval", "arguments", 'Illegal'
];

// Normal object is much faster than Object.create(null), even with typeof check to avoid Object.prototype interference
export const descKeywordTable: { [key: string]: Token } = Object.create(null, {
  this: { value: Token.ThisKeyword },
  function: { value: Token.FunctionKeyword },
  if: { value: Token.IfKeyword },
  return: { value: Token.ReturnKeyword },
  var: { value: Token.VarKeyword },
  else: { value: Token.ElseKeyword },
  for: { value: Token.ForKeyword },
  new: { value: Token.NewKeyword },
  in: { value: Token.InKeyword },
  typeof: { value: Token.TypeofKeyword },
  while: { value: Token.WhileKeyword },
  case: { value: Token.CaseKeyword },
  break: { value: Token.BreakKeyword },
  try: { value: Token.TryKeyword },
  catch: { value: Token.CatchKeyword },
  delete: { value: Token.DeleteKeyword },
  throw: { value: Token.ThrowKeyword },
  switch: { value: Token.SwitchKeyword },
  continue: { value: Token.ContinueKeyword },
  default: { value: Token.DefaultKeyword },
  instanceof: { value: Token.InstanceofKeyword },
  do: { value: Token.DoKeyword },
  void: { value: Token.VoidKeyword },
  finally: { value: Token.FinallyKeyword },
  async: { value: Token.AsyncKeyword },
  await: { value: Token.AwaitKeyword },
  class: { value: Token.ClassKeyword },
  const: { value: Token.ConstKeyword },
  constructor: { value: Token.ConstructorKeyword },
  debugger: { value: Token.DebuggerKeyword },
  export: { value: Token.ExportKeyword },
  extends: { value: Token.ExtendsKeyword },
  false: { value: Token.FalseKeyword },
  from: { value: Token.FromKeyword },
  get: { value: Token.GetKeyword },
  implements: { value: Token.ImplementsKeyword },
  import: { value: Token.ImportKeyword },
  interface: { value: Token.InterfaceKeyword },
  let: { value: Token.LetKeyword },
  null: { value: Token.NullKeyword },
  of: { value: Token.OfKeyword },
  package: { value: Token.PackageKeyword },
  private: { value: Token.PrivateKeyword },
  protected: { value: Token.ProtectedKeyword },
  public: { value: Token.PublicKeyword },
  set: { value: Token.SetKeyword },
  static: { value: Token.StaticKeyword },
  super: { value: Token.SuperKeyword },
  true: { value: Token.TrueKeyword },
  with: { value: Token.WithKeyword },
  yield: { value: Token.YieldKeyword },
  enum: { value: Token.EnumKeyword },
  as: { value: Token.AsKeyword },
  eval: { value: Token.Eval },
  arguments: { value: Token.Arguments },
});
