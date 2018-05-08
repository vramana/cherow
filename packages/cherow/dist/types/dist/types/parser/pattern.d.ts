import * as ESTree from '../estree';
import { Location, Parser } from '../types';
import { Context } from '../utilities';
export declare function parseBindingIdentifierOrPattern(parser: Parser, context: Context, args?: string[]): ESTree.PatternTop;
export declare function parseBindingIdentifier(parser: Parser, context: Context): ESTree.Identifier;
export declare function parseAssignmentRestElement(parser: Parser, context: Context, args: string[]): ESTree.RestElement;
export declare function parseAssignmentPattern(parser: Parser, context: Context, left: ESTree.PatternTop, pos: Location): ESTree.AssignmentPattern;
export declare function parseBindingInitializer(parser: Parser, context: Context): ESTree.AssignmentPattern;
