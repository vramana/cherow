import { Token } from './token';
import { Flags, LabelState } from './common';
import { Comment } from './estree';
import { CommentType } from './lexer/comments';

/**
 * `onToken` option.
 */
export type OnToken = void | ((token: string, value: string, line?: number, column?: number) => void);

/**
 * `onError` option.
 */
export type OnError = void | ((error: string, line: number, column: number) => void);

/**
 * `onComment` option.
 */
export type OnComment = void | Comment[] | ((type: string, value: string, start: number, end: number) => any);

/**
 * The parser options.
 */
export interface Options {

  // The flag to allow module code
  module?: boolean;

  // Create a top-level comments array containing all comments
  comments?: boolean;

  // The flag to enable stage 3 support (ESNext)
  next?: boolean;

  // The flag to enable start and end offsets to each node
  ranges?: boolean;

  // The flag to enable line/column location information to each node
  loc?: boolean;

  // The flag to enable React JSX parsing
  jsx?: boolean;

  // The flag to attach raw property to each literal node
  raw?: boolean;

  // Attach raw property to each identifier node
  rawIdentifier?: boolean;

  // Set to true to record the source file in every node's loc object when the loc option is set.
  source?: string;

  // The flag to enable implied strict mode
  impliedStrict?: boolean;

  // The flag to allow return in the global scope
  globalReturn?: boolean;

  // The flag to allow experimental features
  experimental?: boolean;

   // The flag to allow to skip shebang - '#'
  skipShebang?: boolean;

  // Enable editor mode
  edit?: OnError;

  // Enable editor mode
  onToken?: OnToken;

  // Enables method that should be bypassed when running on NodeJS
  node?: boolean;

  // Enabled tokenizing
  tokenize?: boolean;

  // Option to enable either array or callback for comments
  onComment?: OnComment;
}

export interface ParserState {
    index: number;
    startIndex: number;
    lastIndex: number;
    line: number;
    startLine: number;
    lastLine: number;
    column: number;
    startColumn: number;
    lastColumn: number;
    source: string;
    flags: Flags;
    length: number;
    commentState: number | undefined;
    nextChar: number;
    tokenRaw: string | null;
    token: Token;
    onToken: any;
    onComment: any;
    commentStart: number;
    commentType: CommentType | void;
    tokenValue: any;
    tokenRegExp: any;
     // Regular expression
    capturingParens: number;
    largestBackReference: number;
    //
    assignable: boolean;
    destructible: boolean;
    labelSet: any;
    functionBoundaryStack: any;
    labelSetStack: {[key: string]: boolean}[];
    iterationStack: (boolean | LabelState)[];
    switchStatement: LabelState;
    iterationStatement: LabelState;
    labelDepth: number;
}

/**
 *  Line / column location
 *
 */
export interface Location {
  index: number;
  column: number;
  line: number;
}
