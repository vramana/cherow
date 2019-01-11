import { ParserState } from './common';
import { RegexpState } from './scanner/common';

/*@internal*/
export const enum Errors {
  Unexpected,
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
  InvalidLOExponentation
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
    'Unary expressions as the left operand of an exponentation expression must be disambiguated with parentheses'
};

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(`Line ${line}, column ${column}: ${description}`);

  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  return error;
}

export function reportRegExp(state: ParserState, type: Errors, ...params: string[]): RegexpState {
  state.lastRegExpError = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  return RegexpState.Invalid;
}

export function report(parser: ParserState, type: Errors, ...params: string[]): never {
  const { index, line, column } = parser;
  const message = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error = constructError(index, line, column, message);
  throw error;
}
