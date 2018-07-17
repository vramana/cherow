import { ParserState } from './types';

/*@internal*/
export const enum Errors {
  Unexpected,
  UnterminatedString,
  StrictOctalEscape,
  InvalidEightAndNine,
  UnterminatedComment,
  HtmlCommentInModule,
  MissingExponent,
  IDStartAfterNumber,
  MissingHexDigits,
  MissingDigits,
  DeprecatedOctal,
  NothingToRepeat,
  LoneQuantifierBrackets,
  UnterminatedGroup,
  InvalidUnicodeEscape,
  InvalidGroup,
  RegexpOutOfOrder,
  IncompleteQuantifier,
  InvalidGroupName,
  InvalidEscape,
  InvalidNamedReference,
  UnterminatedCharacterClass,
  OutOfOrderCharacterClass,
  DuplicateRegExpFlag,
  InvalidRegularExp,
  UnexpectedToken,
  IllegalCaracter,
  UnicodeOverflow,
  InvalidHexEscapeSequence,
  ForInOfLoopMultiBindings,
  DeclarationMissingInitializer,
  ForInOfLoopInitializer,
  StrictFunction,
  SloppyFunction,
  UnNamedFunctionDecl,
  StrictModeWith,
  InvalidNestedStatement,
  UnknownLabel,
  LabelRedeclaration,
  IllegalContinue,
  IllegalBreak,
  NewlineAfterThrow,
  IllegalReturn,
  NoCatchOrFinally,
  NoCatchClause,
  MultipleDefaultsInSwitch,
  AsyncFunctionInSingleStatementContext,
  ImportExportDeclAtTopLevel
}

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.Unexpected]: 'Unexpected token',
  [Errors.UnterminatedString]: 'Unterminated string literal',
  [Errors.StrictOctalEscape]: 'Octal escapes are not allowed in strict mode',
  [Errors.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
  [Errors.UnterminatedComment]: 'Unterminated MultiLineComment',
  [Errors.HtmlCommentInModule]: 'HTML comments are not allowed in modules',
  [Errors.MissingExponent]: 'Missing exponent',
  [Errors.IDStartAfterNumber]: 'Identifier starts immediately after numeric literal',
  [Errors.MissingHexDigits]: 'Missing hexadecimal digits after \'0x\'',
  [Errors.MissingDigits]: 'Missing digits',
  [Errors.DeprecatedOctal]: '\'0\'-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the \'0o\' prefix instead',
  [Errors.NothingToRepeat]: 'Nothing to repeat',
  [Errors.LoneQuantifierBrackets]: 'Lone quantifier brackets',
  [Errors.UnterminatedGroup]: 'Unterminated group',
  [Errors.InvalidGroup]: 'Invalid group',
  [Errors.RegexpOutOfOrder]: 'Numbers out of order in {} quantifier',
  [Errors.IncompleteQuantifier]: 'Incomplete quantifier',
  [Errors.InvalidGroupName]: 'Invalid capture group name',
  [Errors.InvalidEscape]: 'Invalid escape',
  [Errors.InvalidNamedReference]: 'Invalid named reference',
  [Errors.InvalidUnicodeEscape]: 'Invalid unicode escape',
  [Errors.UnterminatedCharacterClass]: 'Unterminated character class',
  [Errors.OutOfOrderCharacterClass]: 'Range out of order in character class',
  [Errors.InvalidRegularExp]: 'Invalid regular expression',
  [Errors.UnexpectedToken]: 'Unexpected token \'%0\'',
  [Errors.IllegalCaracter]: 'Illegal character \'%0\'',
  [Errors.UnicodeOverflow]: 'Unicode codepoint must not be greater than 0x10FFFF',
  [Errors.DuplicateRegExpFlag]: 'Duplicate regular expression flag \'%0\'',
  [Errors.InvalidHexEscapeSequence]: 'Invalid hexadecimal escape sequence',
  [Errors.ForInOfLoopMultiBindings]: 'Invalid left-hand side in for-%0 loop: Must have a single binding.',
  [Errors.DeclarationMissingInitializer]: 'Missing initializer in %0 declaration',
  [Errors.ForInOfLoopInitializer]: '\'for-%0\' loop variable declaration may not have an initializer',
  [Errors.StrictFunction]: 'In strict mode code, functions can only be declared at top level or inside a block',
  [Errors.SloppyFunction]: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
  [Errors.UnNamedFunctionDecl]: 'Function declaration must have a name in this context',
  [Errors.StrictModeWith]: 'Strict mode code may not include a with statement',
  [Errors.UnknownLabel]: 'Undefined label \'%0\'',
  [Errors.LabelRedeclaration]: 'Label \'%0\' has already been declared',
  [Errors.InvalidNestedStatement]: '%0  statement must be nested within an iteration statement',
  [Errors.IllegalContinue]: 'Illegal continue statement: no surrounding iteration statement',
  [Errors.IllegalBreak]: 'Illegal break statement',
  [Errors.NewlineAfterThrow]: 'Illegal newline after throw',
  [Errors.IllegalReturn]: 'Illegal return statement',
  [Errors.NoCatchOrFinally]: 'Missing catch or finally after try',
  [Errors.NoCatchClause]: 'Missing catch clause',
  [Errors.MultipleDefaultsInSwitch]: 'More than one default clause in switch statement',
  [Errors.AsyncFunctionInSingleStatementContext]: 'Async functions can only be declared at the top level or inside a block',
  [Errors.ImportExportDeclAtTopLevel]: '%0 declarations may only appear at top level of a module',
};

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(
      `Line ${line}, column ${column}: ${description}`,
  );

  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  return error;
}

export function report(parser: ParserState, type: Errors, ...params: string[]): any {
  const { index, line, column } = parser;
  const message = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error = constructError(index, line, column, message);
  throw error;
}
