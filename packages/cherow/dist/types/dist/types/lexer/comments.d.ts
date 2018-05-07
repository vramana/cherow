import * as ESTree from '../estree';
import { IParser, CommentType } from '../types';
import { Context, ScannerState } from '../utilities';
export declare function skipSingleHTMLComment(parser: IParser, context: Context, state: ScannerState, type: CommentType): ScannerState;
export declare function skipSingleLineComment(parser: IParser, context: Context, state: ScannerState, type: CommentType): ScannerState;
export declare function skipMultiLineComment(parser: IParser, context: Context, state: ScannerState): any;
export declare function addComment(parser: IParser, context: Context, type: ESTree.CommentType, start: number): void;
