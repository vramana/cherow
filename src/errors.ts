import { ParserState } from './common';

/*@internal*/
export const enum Errors {
  Unexpected,
  UnexpectedToken,
  NothingToRepat,
  AtEndOfPattern,
  InvalidPropertyName,
  InvalidDecimalEscape,
  InvalidBackReferenceNumber,
  InvalidNamedReference,
  InvalidRegExp,
  InvalidEscape,
  InvalidUnicodeEscape,
  InvalidRegExpNoUFlag,
  InvalidRegExpWithUFlag,
  RangeOutOfOrder,
  RangeInvalid,
  UnterminatedCharClass,
  InvalidQuantifier,
  InvalidQuantifierNoUFlagAB,
  UnclosedRegExpGroup,
  InvalidRegExpGroup,
  InvalidCaptureGroupName,
  InvalidExtendedUnicodeEscape,
  AlreadyDeclaredGroupName,
  UnterminatedGroup,
  InvalidCaptureRef,
  LoneQuantifierBrackets,
  DuplicateRegExpFlag,
  UnterminatedComment,
  HtmlCommentInModule,
  IllegalCaracter,
  UnicodeOverflow,
  InvalidHexEscapeSequence,
  InvalidEightAndNine,
  StrictOctalEscape,
  UnterminatedString,
  UnterminatedTemplate,
  MissingExponent,
  IDStartAfterNumber,
  InvalidBigInt,
  ExpectedNumberInRadix,
  LegacyOctalsInStrictMode,
  AlreadyDeclared,
  InvalidCatchVarBinding,
  SloppyFunction,
  StrictFunction,
  InvalidDuplicateBinding,
  InvalidLetInStrict,
  UndeclaredExportedBinding,
  InvalidDuplicateExportedBinding,
  MissingInitInConstDecl,
  IllegalContinue,
  IllegalBreak,
  StrictModeWith,
  LabelRedeclaration,
  NewlineAfterThrow,
  IllegalReturn,
  StrictDelete,
  InvalidLOExponentation,
  SuperNoConstructor,
  InvalidSuperProperty,
  DuplicateConstructor,
  StrictFunctionName,
  StaticPrototype,
  InvalidConstructor,
  UnterminatedRegExp,
  UnexpectedTokenRegExpFlag,
  YieldReservedKeyword,
  DisallowedInContext,
  InvalidLetClassName,
  InvalidLetConstBinding,
  InvalidStrictLet,
  AwaitOutsideAsync,
  InvalidStrictReservedWord,
  InvalidStrictStatic,
  InvalidReservedWordStrict,
  ForbiddenAsStatement,
  AsyncFunctionInSingleStatementContext,
  PrivateFieldConstructor,
  PublicFieldConstructor,
  PrivateStaticPrototype,
  AsyncRestricedProd,
  OnlyMethodInClass,
  DeletePrivateField,
  StrictLHSPrefixPostFix,
  InvalidLHSInAssignment,
  StrictEvalArguments,
  UnexpectedStrictReserved,
  InvalidCoverInitializedName,
  InvalidArrowFuncParamList,
  InvalidLHSInForIn,
  InvalidLHSInForLoop,
  NoExperimentalOption,
  TrailingCommaAfterRest
}

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.Unexpected]: 'Unexpected token',
  [Errors.NothingToRepat]: 'Nothing to repeat',
  [Errors.AtEndOfPattern]: '\\ at end of pattern',
  [Errors.InvalidPropertyName]: 'Invalid property name',
  [Errors.InvalidDecimalEscape]: 'Invalid decimal escape',
  [Errors.InvalidBackReferenceNumber]: 'Back references can not have more two or more consecutive numbers',
  [Errors.InvalidNamedReference]: 'Invalid named reference',
  [Errors.InvalidRegExp]: 'Invalid regular expression',
  [Errors.InvalidEscape]: 'Invalid Escape',
  [Errors.InvalidCaptureRef]: 'Invalid named capture referenced',
  [Errors.InvalidRegExpNoUFlag]: 'Invalid regular expression without u-flag',
  [Errors.InvalidRegExpWithUFlag]: 'Invalid regular expression with u-flag',
  [Errors.InvalidUnicodeEscape]: 'Invalid unicode Escape',
  [Errors.RangeOutOfOrder]: 'Range out of order in character class',
  [Errors.RangeInvalid]: 'Invalid character class',
  [Errors.UnterminatedCharClass]: 'Unterminated character class',
  [Errors.UnterminatedGroup]: 'No group to terminate',
  [Errors.InvalidQuantifier]: 'Invalid quantifier',
  [Errors.InvalidQuantifierNoUFlagAB]: 'Invalid quantifier without u-flag and web compatible mode',
  [Errors.UnclosedRegExpGroup]: 'Unclosed group',
  [Errors.InvalidRegExpGroup]: 'Invalid group',
  [Errors.InvalidCaptureGroupName]: 'Invalid capture group name',
  [Errors.InvalidExtendedUnicodeEscape]: 'Invalid extended unicode escape',
  [Errors.AlreadyDeclaredGroupName]: "Already declared group name '%0'",
  [Errors.LoneQuantifierBrackets]: 'Lone quantifier brackets',
  [Errors.DuplicateRegExpFlag]: "Duplicate regular expression flag '%0'",
  [Errors.UnterminatedComment]: 'Unterminated MultiLineComment',
  [Errors.HtmlCommentInModule]: 'HTML comments are not allowed in modules',
  [Errors.IllegalCaracter]: "Illegal character '%0'",
  [Errors.UnterminatedString]: 'Unterminated string literal',
  [Errors.UnterminatedTemplate]: 'Unterminated template literal',
  [Errors.StrictOctalEscape]: 'Octal escapes are not allowed in strict mode',
  [Errors.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
  [Errors.InvalidHexEscapeSequence]: 'Invalid hexadecimal escape sequence',
  [Errors.UnicodeOverflow]: 'Unicode codepoint must not be greater than 0x10FFFF',
  [Errors.MissingExponent]: 'Missing exponent',
  [Errors.InvalidBigInt]: 'Invalid BigIntLiteral',
  [Errors.IDStartAfterNumber]: 'Identifier starts immediately after numeric literal',
  [Errors.ExpectedNumberInRadix]: 'Expected number in radix %0',
  [Errors.LegacyOctalsInStrictMode]: 'Legacy octal literals are not allowed in strict mode',
  [Errors.AlreadyDeclared]: "Identifier '%0' has already been declared",
  [Errors.InvalidDuplicateBinding]: "Duplicate binding '%0'",
  [Errors.InvalidCatchVarBinding]: "The `catch` var '%0' can't be redefined",
  [Errors.StrictFunction]: 'In strict mode code, functions can only be declared at top level or inside a block',
  [Errors.SloppyFunction]:
    'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
  [Errors.InvalidLetInStrict]: "let can't be a variable name in strict mode",
  [Errors.UndeclaredExportedBinding]: "Exported binding '%0' is not declared",
  [Errors.InvalidDuplicateExportedBinding]: "Exported binding '%0' has already been declared",
  [Errors.MissingInitInConstDecl]: 'Missing initializer in const declaration',
  [Errors.NewlineAfterThrow]: 'Illegal newline after throw',
  [Errors.IllegalReturn]: 'Illegal return statement',
  [Errors.IllegalContinue]: 'Illegal continue statement: no surrounding iteration statement',
  [Errors.IllegalBreak]: 'Illegal break statement',
  [Errors.LabelRedeclaration]: "Label '%0' has already been declared",
  [Errors.StrictModeWith]: 'Strict mode code may not include a with statement',
  [Errors.StrictDelete]: 'Delete of an unqualified identifier in strict mode',
  [Errors.InvalidLOExponentation]:
    'Unary expressions as the left operand of an exponentation expression must be disambiguated with parentheses',
  [Errors.SuperNoConstructor]:
    'Calls to super must be in the "constructor" method of a class expression or class declaration that has a superclass',
  [Errors.InvalidSuperProperty]: 'Member access on super must be in a method',
  [Errors.UnexpectedToken]: "Unexpected token '%0'",
  [Errors.DuplicateConstructor]: 'Duplicate constructor method in class',
  [Errors.StrictFunctionName]: 'Function name may not be eval or arguments in strict mode',
  [Errors.StaticPrototype]: "Classes may not have a static property named 'prototype'",
  [Errors.InvalidConstructor]: 'Class constructor may not be a %0',
  [Errors.UnterminatedRegExp]: 'Unterminated regular expression',
  [Errors.UnexpectedTokenRegExpFlag]: 'Unexpected regular expression flag',
  [Errors.YieldReservedKeyword]: "'yield' is a reserved keyword within generator function bodies",
  [Errors.DisallowedInContext]: "'%0' may not be used as an identifier in this context",
  [Errors.InvalidLetClassName]: "Can not use 'let' as a class name",
  [Errors.InvalidLetConstBinding]: 'Can not use `let` when binding through `let` or `const`',
  [Errors.InvalidStrictLet]: 'Can not use `let` as variable name in strict mode',
  [Errors.AwaitOutsideAsync]: 'Await is only valid in async functions',
  [Errors.InvalidStrictReservedWord]: 'Invalid use of reserved word as variable name',
  [Errors.InvalidStrictStatic]: '`Static` is a reserved word in strict mode',
  [Errors.InvalidReservedWordStrict]: ' Invalid use of reserved word as a variable name in strict mode',
  [Errors.ForbiddenAsStatement]: "%0 can't appear in single-statement context",
  [Errors.AsyncFunctionInSingleStatementContext]:
    'Async functions can only be declared at the top level or inside a block',
  [Errors.PrivateFieldConstructor]: "Classes may not have a private field named '#constructor'",
  [Errors.PublicFieldConstructor]: "Classes may not have a field named 'constructor'",
  [Errors.PrivateStaticPrototype]: "Classes may not have a static private property named '#prototype'",
  [Errors.AsyncRestricedProd]: 'Async methods are a restricted production and cannot have a newline following it',
  [Errors.OnlyMethodInClass]: 'Only methods are allowed in classes',
  [Errors.DeletePrivateField]: 'Private fields can not be deleted',
  [Errors.StrictLHSPrefixPostFix]: 'Private fields can not be deleted',
  [Errors.StrictLHSPrefixPostFix]: '%0 increment/decrement may not have eval or arguments operand in strict mode',
  [Errors.InvalidLHSInAssignment]: 'Invalid left-hand side in assignment',
  [Errors.StrictEvalArguments]: 'Unexpected eval or arguments in strict mode',
  [Errors.UnexpectedStrictReserved]: 'Unexpected strict mode reserved word',
  [Errors.InvalidCoverInitializedName]: 'Invalid shorthand property initializer',
  [Errors.InvalidArrowFuncParamList]: 'Illegal arrow function parameter list',
  [Errors.InvalidLHSInForIn]: 'Invalid left-hand side in for-in',
  [Errors.InvalidLHSInForLoop]: 'Invalid left-hand side in for-loop',
  [Errors.NoExperimentalOption]: 'Enable the experimental option for V8 experimental features',
  [Errors.TrailingCommaAfterRest]: 'A trailing comma is not permitted after the rest element '
};

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(`Line ${line}, column ${column}: ${description}`);

  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  return error;
}

export function report(parser: ParserState, type: Errors, ...params: string[]): never {
  const { index, line, column } = parser;
  const message = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error = constructError(index, line, column, message);
  throw error;
}
