import { CommentType, Comment } from './estree';
import { Flags } from './utilities';
import { Token } from './token';

// TODO: Wrap it into a namespace?

/**
   ForStatement types.
*/
export type ForStatementType = 'ForStatement' | 'ForOfStatement' | 'ForInStatement';

/**
 * Delegate
 */
export type Delegate = (node: any) => void;

/**
 * The parser options.
 */

export interface Options {

    // Create a top-level comments array containing all comments
    comment?: Comments;

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

    // Accepts a callback function to be invoked for each syntax node (as the node is constructed)
    delegate?: boolean;

     // Set to true to record the source file in every node's loc object when the loc option is set.
    source?: string;

    // The flag to enable implied strict mode
    impliedStrict?: boolean;

    // The flag to allow return in the global scope
    globalReturn?: boolean;

    // The flag to allow 'await' in the global scope
    globalAwait?: boolean;

    // The flag to allow to skip shebang - '#'
    skipShebang?: boolean;
}

/**
 * The parser interface.
 */
export interface Parser {

    // The source code to parse
    source: string;

    // Current position
    index: number;

    // Current line position
    line: number;

    // Current column position
    column: number;

    // Start position  before current token
    startIndex: number;

    // Start position column before current token
    startColumn: number;

    // Start position line before current token
    startLine: number;

    // End position after parsing after current token
    lastIndex: number;

    // End column position after current token
    lastColumn: number;

    // End line position after current token
    lastLine: number;

    // Pending cover grammar errors
    pendingExpressionError: any;

    // Mutable parser flags
    flags: Flags;

    // Mutable parser flags
    sourceFile: string | void;

    labelSet: any;
    onComment: Comments;
    tokenValue: any;
    tokenRaw: string;
    lastChar: number;
    parsingContext: any;
    tokenRegExp: any;
    token: Token;
    delegate: Delegate | void;
}

/**
 * The type of the `comment` option.
 */
export type Comments = void | Comment[] | (
    (type: CommentType, value: string, start: number, end: number, loc: any) => any
);

/**
 *  Line / column location
 *
 */
export interface Location {
    index: number;
    column: number;
    line: number;
}