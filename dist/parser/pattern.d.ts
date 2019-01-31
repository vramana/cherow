import * as ESTree from '../estree';
import { Context, ParserState, Type, Origin, ScopeState } from '../common';
export declare function parseBindingIdentifierOrPattern(state: ParserState, context: Context, scope: ScopeState, type: Type, origin: Origin, verifyDuplicates: boolean): ESTree.Pattern;
export declare function parseBindingIdentifier(state: ParserState, context: Context, scope: ScopeState, type: Type, origin: Origin, checkForDuplicates: boolean): ESTree.Identifier;
export declare function parseAssignmentRestElement(state: ParserState, context: Context, scope: ScopeState, type: Type, origin: Origin, verifyDuplicates: boolean): any;
export declare function parseArrayAssignmentPattern(state: ParserState, context: Context, scope: ScopeState, type: Type, origin: Origin, verifyDuplicates: boolean): ESTree.ArrayPattern;
export declare function parserObjectAssignmentPattern(state: ParserState, context: Context, scope: ScopeState, type: Type, origin: Origin, verifyDuplicates: boolean): ESTree.ObjectPattern;
export declare function parseAssignmentPattern(state: ParserState, context: Context, left: ESTree.Pattern, start: number): any;
export declare function parseBindingInitializer(state: ParserState, context: Context, scope: ScopeState, type: Type, origin: Origin, verifyDuplicates: boolean): ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.MemberExpression | ESTree.AssignmentPattern;
//# sourceMappingURL=pattern.d.ts.map