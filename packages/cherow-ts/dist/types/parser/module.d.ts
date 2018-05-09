import { Parser, ESTree, Context } from 'cherow';
import { parseDirective } from './statements';
export declare function parseModuleItemList(parser: Parser, context: Context): (ReturnType<typeof parseDirective | typeof parseModuleItem>)[];
export declare function parseModuleItem(parser: Parser, context: Context): any;
export declare function parseExportDeclaration(parser: Parser, context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration;
export declare function parseImportDeclaration(parser: Parser, context: Context): ESTree.ImportDeclaration;
