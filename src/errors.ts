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
  LoneQuantifierBrackets
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
  [Errors.LoneQuantifierBrackets]: 'Lone quantifier brackets'
};

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(`Line ${line}, column ${column}: ${description}`);

  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  return error;
}

/**
 * Report invalid regular expression
 * NOTE: The errors can't be thrown
 *
 * @param {Parser} state
 * @param {Errors} type
 * @param {...string[]} params
 * @returns {(RegexpState | any)}
 */
export function reportRegExp(state: ParserState, type: Errors, ...params: string[]): RegexpState | any {
  state.lastRegExpError = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  return RegexpState.Invalid;
}

export function report1(parser: ParserState, type: Errors, ...params: string[]): any {
  const { index, line, column } = parser;
  const message = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error = constructError(index, line, column, message);
  throw error;
}
