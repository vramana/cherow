import * as ESTree from '../estree';
import { Location, Parser } from '../types';
import { Context } from '../utilities';
export declare function parseBindingIdentifierOrPattern(parser: Parser, context: Context, args?: string[]): ESTree.Node;
export declare function parseBindingIdentifier(parser: Parser, context: Context): ESTree.Identifier;
export declare function parseAssignmentPattern(parser: Parser, context: Context, left: ESTree.Node, pos: Location): ESTree.AssignmentPattern;
