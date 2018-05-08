import { ESTree, IParser, Context, Location } from 'cherow';
export declare function parseBindingIdentifierOrPattern(parser: IParser, context: Context, args?: string[]): ESTree.PatternTop;
export declare function parseBindingIdentifier(parser: IParser, context: Context): ESTree.Identifier;
export declare function parseAssignmentRestElement(parser: IParser, context: Context, args: string[]): ESTree.RestElement;
export declare function parseAssignmentPattern(parser: IParser, context: Context, left: ESTree.PatternTop, pos: Location): ESTree.AssignmentPattern;
export declare function parseBindingInitializer(parser: IParser, context: Context): ESTree.AssignmentPattern;
