/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
  Empty = 0,

  OptionsNext = 1 << 0,
  OptionsRanges = 1 << 1,
  OptionsLoc = 1 << 2,
  OptionsDirectives = 1 << 3,
  OptionsJSX = 1 << 4,
  OptionsGlobalReturn = 1 << 5,
  OptionsGlobalAwait = 1 << 6,
  OptionsWebCompat = 1 << 7,
  OptionsRaw = 1 << 8,
  Strict = 1 << 9,
  Module = 1 << 10,
  InDeclarationContext = 1 << 11,
  DisallowInContext = 1 << 12,
  Statement = 1 << 13,
  AllowRegExp = 1 << 14,
  TaggedTemplate = 1 << 15,
  AllowFunctionDeclaration = 1 << 16,
  SuperProperty = 1 << 17,
  SuperCall = 1 << 18,
  RewindTemplate = 1 << 19,
  InYieldContext = 1 << 20,
  InAwaitContext = 1 << 21,
  InArgList = 1 << 22,
  InConstructor = 1 << 23,
  InMethod = 1 << 24,
  AllowNewTarget = 1 << 25,
  InGlobal = 1 << 26,
  DisallowAssignment = 1 << 27,
  InSwitch = 1 << 28,
  InIteration = 1 << 29, // (fkleuver) Happy now?
  InSwitchOrIteration = InSwitch | InIteration
}

/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
  Empty = 0,
  NewLine = 1 << 0,
  HasOctal = 1 << 1
}

/**
 * The parser interface.
 */
export interface ParserState {
  source: string;

  flags: Flags;
  index: number;
  line: number;
  column: number;
  token: any;
  startIndex: number;
  currentChar: number;
  length: number;
  tokenValue: any;
  tokenRaw: string;
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };

  // For the scanner to work around lack of multiple return.
  lastChar: number;
}
