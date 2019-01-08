import * as ESTree from './estree';
import { Token } from './token';
import { next } from './scanner';
import { Errors, report } from './errors';

/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
  Empty = 0,
  OptionsNext = 1 << 0,
  OptionsRanges = 1 << 1,
  OptionsJSX = 1 << 2,
  OptionsRaw = 1 << 3,
  OptionsDisableWebCompat = 1 << 4,
  OptionsLoc = 1 << 5,
  OptionsGlobalReturn = 1 << 6,
  OptionsExperimental = 1 << 7,
  OptionsNative = 1 << 8,

  Strict = 1 << 10,
  Module = 1 << 11,

  TopLevel = 1 << 12,

  DisallowIn = 1 << 13,
  ExpressionStart = 1 << 15,
  TaggedTemplate = 1 << 16,
  SuperProperty = 1 << 18,
  SuperCall = 1 << 10,

  InGlobal = 1 << 20,
  InGenerator = 1 << 21,
  InAsync = 1 << 22,
  InArguments = 1 << 23,
  InConstructor = 1 << 24,
  InMethod = 1 << 25,

  NewTarget = 1 << 26,
  InFunctionBody = 1 << 27,
  Statement = 1 << 30
}

/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
  Empty = 0,
  NewLine = 1 << 0,
  LastIsCR = 1 << 1,
  Float = 1 << 2,
  Octal = 1 << 3,
  Binary = 1 << 4
}

/**
 * The type of the `onComment` option.
 */
export type OnComment = void | ESTree.Comment[] | ((type: string, value: string, start?: number, end?: number) => any);
export type OnToken = void | Token[] | ((token: Token, start?: number, end?: number) => any);

/**
 * The parser interface.
 */
export interface ParserState {
  source: string;
  onComment: any;
  onToken: any;
  flags: Flags;
  index: number;
  line: number;
  startIndex: number;
  column: number;
  token: Token;
  tokenValue: any;
  tokenRaw: string;
  currentChar: any;
  length: number;
  lastRegExpError: any;
  numCapturingParens: number;
  largestBackReference: number;
  lastChar: number;
  inCatch: boolean;
  exportedNames: any[];
  exportedBindings: any[];
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };
}

/**
 * A simple `unimplemented` helper.
 */
export function unimplemented(): never {
  throw new Error('unimplemented');
}

// Note: this is intentionally ambient, since it should never be called. (It should be a guaranteed
// runtime error.)
export declare function unreachable(...values: never[]): never;

export function pushComment(context: Context, array: any[]): any {
  return function(type: string, value: string, start: number, end: number) {
    const comment: any = {
      type,
      value
    };

    if (context & Context.OptionsLoc) {
      comment.start = start;
      comment.end = end;
    }
    array.push(comment);
  };
}

export function pushToken(context: Context, array: any[]): any {
  return function(token: string, value: string, start: number, end: number) {
    const tokens: any = {
      token,
      value
    };

    if (context & Context.OptionsLoc) {
      tokens.start = start;
      tokens.end = end;
    }
    array.push(tokens);
  };
}

export function finishNode<T extends ESTree.Node>(context: Context, start: number, end: number, node: T): T {
  if (context & Context.OptionsRanges) {
    node.start = start;
    node.end = end;
  }

  return node;
}

export function optional(state: ParserState, context: Context, token: Token): boolean {
  if (state.token !== token) return false;
  next(state, context);
  return true;
}

export function expect(state: ParserState, context: Context, t: Token): boolean {
  if (state.token !== t) {
    report(state, Errors.Unexpected);
    return false;
  }
  next(state, context);
  return true;
}

/**
 * Automatic Semicolon Insertion
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function consumeSemicolon(state: ParserState, context: Context): void | boolean {
  return (state.token & Token.ASI) === Token.ASI || state.flags & Flags.NewLine
    ? optional(state, context, Token.Semicolon)
    : report(state, Errors.Unexpected);
}
