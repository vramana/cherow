/**
 * The token types and attributes.
 */
export const enum Token {
  Type                    = 0b0000000000000000000_0000_11111111,

  /* Precedence for binary operators (always positive) */
  PrecStart               = 0b0000000000000000000_0000_00001000,
  Precedence              = 0b0000000000000000000_1111_00000000, // 8-11

  /* Attribute names */
  Keyword                 = 0b0000000000000000001_0000_00000000,
  Contextual              = 0b0000000000000000011_0000_00000000,
  Reserved                = 0b0000000000000000101_0000_00000000,
  FutureReserved          = 0b0000000000000001001_0000_00000000,
  IsLogical               = 0b0000000000000010000_0000_00000000,
  IsExpressionStart       = 0b0000000000000100000_0000_00000000,
  IsIdentifier            = 0b0000000000001000011_0000_00000000,
  IsAwait                 = 0b0000000000010000000_0000_00000000,
  IsAsync                 = 0b0000000000100000000_0000_00000000,
  IsYield                 = 0b0000000001000000000_0000_00000000,
  IsGenerator             = 0b0000000010000000000_0000_00000000,
  IsAssignOp              = 0b0000000100000000000_0000_00000000,
  IsBinaryOp              = 0b0000001000000100000_0000_00000000,
  IsUnaryOp               = 0b0000010000000100000_0000_00000000,
  IsUpdateOp              = 0b0000100000000100000_0000_00000000,
  IsLexical               = 0b0001000000000000000_0000_00000000,
  IsVarDecl               = 0b0010000000000000000_0000_00000000,
  ASI                     = 0b0100000000000000000_0000_00000000,
  WhiteSpace              = 0b1000000000000000000_0000_00000000,

  /* Node types */
  EndOfSource             = 0b0100000000000000000_0000_00000000, // Pseudo

  /* Constants/Bindings */
  Identifier              = 0b0000000000001100011_0000_00000001,
  NumericLiteral          = 0b0000000000000100000_0000_00000010,
  StringLiteral           = 0b0000000000000100000_0000_00000011,
  RegularExpression       = 0b0000000000000100000_0000_00000100,
  FalseKeyword            = 0b0000000000000100101_0000_00000101,
  TrueKeyword             = 0b0000000000000100101_0000_00000110,
  NullKeyword             = 0b0000000000000100101_0000_00000111,

  /* Template nodes */
  TemplateCont            = 0b0000000000000100000_0000_00001000,
  TemplateTail            = 0b0000000000000100000_0000_00001001,

  /* Punctuators */
  Arrow                   = 0b0000000000000100000_0000_00001010, // =>
  LeftParen               = 0b0000000000000100000_0000_00001011, // (
  LeftBrace               = 0b0000000000000100000_0000_00001100, // {
  Period                  = 0b0000000000000000000_0000_00001101, // .
  Ellipsis                = 0b0000000000000000000_0000_00001110, // ...
  RightBrace              = 0b0100000000000000000_0000_00001111, // }
  RightParen              = 0b0000000000000000000_0000_00010000, // )
  Semicolon               = 0b0100000000000000000_0000_00010001, // ;
  Comma                   = 0b0000000000000000000_0000_00010010, // ,
  LeftBracket             = 0b0000000000000100000_0000_00010011, // [
  RightBracket            = 0b0000000000000000000_0000_00010100, // ]
  Colon                   = 0b0000000000000000000_0000_00010101, // :
  QuestionMark            = 0b0000000000000000000_0000_00010110, // ?
  SingleQuote             = 0b0000000000000000000_0000_00010111, // '
  DoubleQuote             = 0b0000000000000000000_0000_00011000, // "
  JSXClose                = 0b0000000000000000000_0000_00011001, // </
  JSXAutoClose            = 0b0000000000000000000_0000_00011010, // />

  /* Update operators */
  Increment               = 0b0000100000000100000_0000_00011011, // ++
  Decrement               = 0b0000100000000100000_0000_00011100, // --

  /* Assign operators */
  Assign                  = 0b0000000100000000000_0000_00011101, // =
  ShiftLeftAssign         = 0b0000000100000000000_0000_00011110, // <<=
  ShiftRightAssign        = 0b0000000100000000000_0000_00011111, // >>=
  LogicalShiftRightAssign = 0b0000000100000000000_0000_00100000, // >>>=
  ExponentiateAssign      = 0b0000000100000000000_0000_00100001, // **=
  AddAssign               = 0b0000000100000000000_0000_00100010, // +=
  SubtractAssign          = 0b0000000100000000000_0000_00100011, // -=
  MultiplyAssign          = 0b0000000100000000000_0000_00100100, // *=
  DivideAssign            = 0b0000000100000100000_0000_00100101, // /=
  ModuloAssign            = 0b0000000100000000000_0000_00100110, // %=
  BitwiseXorAssign        = 0b0000000100000000000_0000_00100111, // ^=
  BitwiseOrAssign         = 0b0000000100000000000_0000_00101000, // |=
  BitwiseAndAssign        = 0b0000000100000000000_0000_00101001, // &=

  /* Unary/binary operators */
  TypeofKeyword           = 0b0000010000000100101_0000_00101010,
  DeleteKeyword           = 0b0000010000000100101_0000_00101011,
  VoidKeyword             = 0b0000010000000100101_0000_00101100,
  Negate                  = 0b0000010000000100000_0000_00101101, // !
  Complement              = 0b0000010000000100000_0000_00101110, // ~
  Add                     = 0b0000011000000100000_1001_00101111, // +
  Subtract                = 0b0000011000000100000_1001_00110000, // -
  InKeyword               = 0b0000010000000100101_0111_00110001,
  InstanceofKeyword       = 0b0000001000000100101_0111_00110010,
  Multiply                = 0b0000001010000100000_1010_00110011, // *
  Modulo                  = 0b0000001000000100000_1010_00110100, // %
  Divide                  = 0b0000001000000100000_1010_00110101, // /
  Exponentiate            = 0b0000001000000100000_1011_00110110, // **
  LogicalAnd              = 0b0000001000000110000_0010_00110111, // &&
  LogicalOr               = 0b0000001000000110000_0001_00111000, // ||
  StrictEqual             = 0b0000001000000100000_0110_00111001, // ===
  StrictNotEqual          = 0b0000001000000100000_0110_00111010, // !==
  LooseEqual              = 0b0000001000000100000_0110_00111011, // ==
  LooseNotEqual           = 0b0000001000000100000_0110_00111100, // !=
  LessThanOrEqual         = 0b0000001000000100000_0111_00111101, // <=
  GreaterThanOrEqual      = 0b0000001000000100000_0111_00111110, // >=
  LessThan                = 0b0000001000000100000_0111_00111111, // <
  GreaterThan             = 0b0000001000000100000_0111_01000000, // >
  ShiftLeft               = 0b0000001000000100000_1000_01000001, // <<
  ShiftRight              = 0b0000001000000100000_1000_01000010, // >>
  LogicalShiftRight       = 0b0000001000000100000_1000_01000011, // >>>
  BitwiseAnd              = 0b0000001000000100000_0101_01000100, // &
  BitwiseOr               = 0b0000001000000100000_0011_01000101, // |
  BitwiseXor              = 0b0000001000000100000_0100_01000110, // ^

  /* Variable declaration kinds */
  VarKeyword              = 0b0010000000000100101_0000_01000111,
  LetKeyword              = 0b0011000000000101001_0000_01001000,
  ConstKeyword            = 0b0011000000000100101_0000_01001001,

  /* Other reserved words */
  BreakKeyword            = 0b0000000000000000101_0000_01001010,
  CaseKeyword             = 0b0000000000000000101_0000_01001011,
  CatchKeyword            = 0b0000000000000000101_0000_01001100,
  ClassKeyword            = 0b0000000000000100101_0000_01001101,
  ContinueKeyword         = 0b0000000000000000101_0000_01001110,
  DebuggerKeyword         = 0b0000000000000000101_0000_01001111,
  DefaultKeyword          = 0b0000000000000000101_0000_01010000,
  DoKeyword               = 0b0000000000000000101_0000_01010001,
  ElseKeyword             = 0b0000000000000000101_0000_01010010,
  ExportKeyword           = 0b0000000000000000101_0000_01010011,
  ExtendsKeyword          = 0b0000000000000000101_0000_01010100,
  FinallyKeyword          = 0b0000000000000000101_0000_01010101,
  ForKeyword              = 0b0000000000000000101_0000_01010110,
  FunctionKeyword         = 0b0000000000000100101_0000_01010111,
  IfKeyword               = 0b0000000000000000101_0000_01011000,
  ImportKeyword           = 0b0000000000000100101_0000_01011001,
  NewKeyword              = 0b0000000000000100101_0000_01011010,
  ReturnKeyword           = 0b0000000000000000101_0000_01011011,
  SuperKeyword            = 0b0000000000000100101_0000_01011100,
  SwitchKeyword           = 0b0000000000000100101_0000_01011101,
  ThisKeyword             = 0b0000000000000100101_0000_01011110,
  ThrowKeyword            = 0b0000000000000100101_0000_01011111,
  TryKeyword              = 0b0000000000000000101_0000_01100000,
  WhileKeyword            = 0b0000000000000000101_0000_01100001,
  WithKeyword             = 0b0000000000000000101_0000_01100010,

  /* Strict mode reserved words */
  ImplementsKeyword       = 0b0000000000000001001_0000_01100011,
  InterfaceKeyword        = 0b0000000000000001001_0000_01100100,
  PackageKeyword          = 0b0000000000000001001_0000_01100101,
  PrivateKeyword          = 0b0000000000000001001_0000_01100110,
  ProtectedKeyword        = 0b0000000000000001001_0000_01100111,
  PublicKeyword           = 0b0000000000000001001_0000_01101000,
  StaticKeyword           = 0b0000000000000001001_0000_01101001,
  YieldKeyword            = 0b0000000001000101001_0000_01101010,

  /* Contextual keywords */
  AsKeyword               = 0b0000001000000100011_0000_01101011,
  AsyncKeyword            = 0b0000000000100000011_0000_01101100,
  AwaitKeyword            = 0b0000000000010100011_0000_01101101,
  ConstructorKeyword      = 0b0000000000000000011_0000_01101110,
  GetKeyword              = 0b0000000000000000011_0000_01101111,
  SetKeyword              = 0b0000000000000000011_0000_01110000,
  FromKeyword             = 0b0000000000000000011_0000_01110001,
  OfKeyword               = 0b0000000000000000011_0000_01110010,
  EnumKeyword             = 0b0000000000000000101_0000_01110011,

  /** Others */
  At                      = 0b0000000000000000000_0000_01110011,
  BigIntLiteral           = 0b0000000000000000000_0000_01110100,
  JSXText                 = 0b0000000000000000000_0000_01110101,
  PrivateName             = 0b0000000000000000000_0000_01110111,
  Global                  = 0b0000000000000000000_0000_01111100
}

// Note: this *must* be kept in sync with the enum's order.
//
// It exploits the enum value ordering, and it's necessarily a complete and
// utter hack.
//
// All to lower it to a single monomorphic array access.
export const KeywordDescTable = [
  'end of source',

  /* Constants/Bindings */
  'identifier',
  'number',
  'string',
  'regular expression',
  'false',
  'true',
  'null',

  /* Template nodes */
  'template continuation',
  'template end',

  /* Punctuators */
  '=>',
  '(',
  '{',
  '.',
  '...',
  '}',
  ')',
  ';',
  ',',
  '[',
  ']',
  ':',
  '?',
  '\'',
  '"',
  '</',
  '/>',

  /* Update operators */
  '++',
  '--',

  /* Assign operators */
  '=',
  '<<=',
  '>>=',
  '>>>=',
  '**=',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '^=',
  '|=',
  '&=',

  /* Unary/binary operators */
  'typeof',
  'delete',
  'void',
  '!',
  '~',
  '+',
  '-',
  'in',
  'instanceof',
  '*',
  '%',
  '/',
  '**',
  '&&',
  '||',
  '===',
  '!==',
  '==',
  '!=',
  '<=',
  '>=',
  '<',
  '>',
  '<<',
  '>>',
  '>>>',
  '&',
  '|',
  '^',

  /* Variable declaration kinds */
  'var',
  'let',
  'const',

  /* Other reserved words */
  'break',
  'case',
  'catch',
  'class',
  'continue',
  'debugger',
  'default',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'while',
  'with',

  /* Strict mode reserved words */
  'implements',
  'interface',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield',

  /* Contextual keywords */
  'as',
  'async',
  'await',
  'constructor',
  'get',
  'set',
  'from',
  'of',
  'enum',
  '@',
  'BigInt',
  'JSXText',
  '#',
  'Global'
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
  as: { value: Token.AsKeyword }
});
