import { ParserState, Location } from './../types';
import { Context } from '../common';
import * as ESTree from '../estree';
export declare function parseBindingIdentifierOrPattern(state: ParserState, context: Context): ESTree.PatternTop;
export declare function parseBindingIdentifier(state: ParserState, context: Context): ESTree.Identifier;
export declare function parseAssignmentRestElement(state: ParserState, context: Context): ESTree.RestElement;
export declare function parseArrayAssignmentPattern(state: ParserState, context: Context): ESTree.ArrayPattern;
export declare function parserObjectAssignmentPattern(state: ParserState, context: Context): ESTree.ObjectPattern;
export declare function parseAssignmentPattern(state: ParserState, context: Context, left: ESTree.PatternTop, pos: Location): ESTree.AssignmentPattern;
export declare function parseBindingInitializer(state: ParserState, context: Context): ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.MemberExpression | ESTree.AssignmentPattern;
//# sourceMappingURL=pattern.d.ts.map