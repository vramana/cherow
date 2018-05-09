import * as ESTree from '../estree';
import { Parser, CommentType } from '../types';
import { Context, ScannerState } from '../utilities';
export declare function skipSingleHTMLComment(parser: Parser, context: Context, state: ScannerState, type: CommentType): ScannerState;
export declare function skipSingleLineComment(parser: Parser, context: Context, state: ScannerState, type: CommentType): ScannerState;
export declare function skipMultiLineComment(parser: Parser, context: Context, state: ScannerState): any;
export declare function addComment(parser: Parser, context: Context, type: ESTree.CommentType, start: number): void;
