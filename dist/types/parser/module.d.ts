import * as ESTree from '../estree';
import { Parser } from '../types';
import { Context } from '../utilities';
export declare function parseModuleItemList(parser: Parser, context: Context): ESTree.Statement[];
export declare function parseModuleItem(parser: Parser, context: Context): any;
export declare function parseExportDeclaration(parser: Parser, context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration;
export declare function parseImportDeclaration(parser: Parser, context: Context): ESTree.ImportDeclaration;
