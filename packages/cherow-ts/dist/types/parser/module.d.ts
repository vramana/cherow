import { Parser, ESTree, Context } from 'cherow';
import { parseDirective } from './statements';
/**
* Parse module item list
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItemList)
*
* @param parser  Parser object
* @param context Context masks
*/
export declare function parseModuleItemList(parser: Parser, context: Context): (ReturnType<typeof parseDirective | typeof parseModuleItem>)[];
/**
* Parse module item
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItem)
*
* @param parser  Parser object
* @param context Context masks
*/
export declare function parseModuleItem(parser: Parser, context: Context): any;
/**
* Parse export declaration
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ExportDeclaration)
*
* @param parser  Parser object
* @param context Context masks
*/
export declare function parseExportDeclaration(parser: Parser, context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration;
/**
* Parse import declaration
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ImportDeclaration)
*
* @param parser  Parser object
* @param context Context masks
*/
export declare function parseImportDeclaration(parser: Parser, context: Context): ESTree.ImportDeclaration;
/**
 * Parses export assignment
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseModuleOrNamespaceDeclaration(parser: Parser, context: Context): any;
/**
 * Parses module block
 *
 * @param parser Parser object
 * @param context Context mask
 */
export declare function parseModuleBlock(parser: Parser, context: Context): any;
/**
 * Parses export name declaration
 *
 * @param parser Parser object
 * @param context Context mask
 */
export declare function parseExportNamedDeclaration(parser: Parser, context: Context): any;
/**
* Parses export assignment
*
* @param parser  Parser object
* @param context Context masks
*/
export declare function parseModuleDeclaration(parser: Parser, context: Context): any;
export declare function parseEntityName1(parser: Parser, context: Context): any;
