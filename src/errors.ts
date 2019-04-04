import { ParserState } from './common';

/*@internal*/
export const enum Errors {
  Unexpected,
  UnterminatedString,
  UnterminatedRegExp,
  UnterminatedComment,
  UnterminatedTemplate,
  UnexpectedChar,
  StrictOctalEscape,
  InvalidEightAndNine,
  UnicodeOutOfRange,
  DuplicateRegExpFlag,
  UnexpectedTokenRegExpFlag,
  InvalidExtendedUnicodeEscape,
  InvalidDynamicUnicode,
  InvalidUnicodeIdentName,
  InvalidIdentCharIdentEscape,
  IDStartAfterNumber,
  MissingExponent,
  InvalidNumber,
  InvalidBigInt,
  LegacyOctalsInStrictMode,
  InvalidRegExp,
  ExpectedNumberInRadix,
  MissingHexDigits
}

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.Unexpected]: 'Unexpected token',
  [Errors.UnterminatedString]: 'Unterminated string literal',
  [Errors.UnterminatedRegExp]: 'Unterminated regular expression literal',
  [Errors.UnterminatedComment]: 'Unterminated MultiLineComment',
  [Errors.UnterminatedTemplate]: 'Unterminated template literal',
  [Errors.UnexpectedChar]: "Invalid character '%0'",
  [Errors.StrictOctalEscape]: 'Octal escapes are not allowed in strict mode',
  [Errors.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
  [Errors.UnicodeOutOfRange]: 'Unicode codepoint must not be greater than 0x10FFFF',
  [Errors.InvalidRegExp]: 'Invalid regular expression',
  [Errors.DuplicateRegExpFlag]: "Duplicate regular expression flag '%0'",
  [Errors.UnexpectedTokenRegExpFlag]: "Unexpected regular expression flag '%0'",
  [Errors.InvalidExtendedUnicodeEscape]: 'Invalid extended unicode escape',
  [Errors.InvalidDynamicUnicode]: 'The identifier contained dynamic unicode escape that was not closed',
  [Errors.InvalidUnicodeIdentName]: 'Only unicode escapes are supported',
  [Errors.InvalidIdentCharIdentEscape]: 'Identifier escape did not yield a valid identifier character',
  [Errors.IDStartAfterNumber]: 'Identifier starts immediately after numeric literal',
  [Errors.MissingExponent]: 'Missing exponent',
  [Errors.InvalidNumber]: 'Invalid number',
  [Errors.InvalidBigInt]: 'Invalid BigIntLiteral',
  [Errors.LegacyOctalsInStrictMode]: 'Legacy octal literals are not allowed in strict mode',
  [Errors.ExpectedNumberInRadix]: 'Expected number in radix %0',
  [Errors.MissingHexDigits]: 'Missing hex digits'
};

/**
 * Report an error with an appropriate index, line, column, and description string. This currently
 * throws.
 */
export function report(state: ParserState, type: Errors, ...params: string[]): never {
  const { index, line, column } = state;
  const description = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error: any = new SyntaxError(`Line ${line}, column ${column}: ${description}`);
  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  throw error;
}
