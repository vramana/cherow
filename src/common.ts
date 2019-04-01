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
  OptionsExperimental = 1 << 7,
  OptionsWebCompat = 1 << 8,
  OptionsRaw = 1 << 9,
  Strict = 1 << 10,
  Module = 1 << 11,
  InDeclarationContext = 1 << 12,
  DisallowInContext = 1 << 13,
  Statement = 1 << 14,
  AllowRegExp = 1 << 15,
  TaggedTemplate = 1 << 16,
  AllowFunctionDeclaration = 1 << 17,
  SuperProperty = 1 << 18,
  SuperCall = 1 << 19,
  InYieldContext = 1 << 21,
  InAwaitContext = 1 << 22,
  InArgList = 1 << 23,
  InConstructor = 1 << 24,
  InMethod = 1 << 25,
  AllowNewTarget = 1 << 26,
  InGlobal = 1 << 27,
  DisallowAssignment = 1 << 28,
  InSwitch = 1 << 29,
  InIteration = 1 << 30,
  InSwitchOrIteration = InSwitch | InIteration
}

/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
  Empty = 0
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

// Note: this is intentionally ambient, since it should never be called. (It should be a guaranteed
// runtime error.)
export declare function unreachable(...values: never[]): never;
