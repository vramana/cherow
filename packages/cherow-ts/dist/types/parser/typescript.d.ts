import { ESTree, Context, Parser, Location } from 'cherow';
/**
 * Parse either expression statement or declare (TypeScript)
 *
 * @export
 * @param parser Parser object
 * @param context Context masks
 */
export declare function parseExpressionOrDeclareStatement(parser: Parser, context: Context): any;
export declare function parseAmbientExternalModuleDeclaration(parser: Parser, context: Context): any;
export declare function parseNamespaceDeclaration(parser: Parser, context: Context): any;
export declare function parseStatementListBlock(parser: Parser, context: Context): any;
export declare function parseTypeAlias(parser: Parser, context: Context, pos?: Location): any;
export declare function parseEnumMembers(parser: Parser, context: Context): any;
export declare function parseEnumDeclaration(parser: Parser, context: Context, isConst?: boolean): any;
export declare function parseVariableStatement(parser: Parser, context: Context, shouldConsume?: boolean): ESTree.VariableDeclaration;
