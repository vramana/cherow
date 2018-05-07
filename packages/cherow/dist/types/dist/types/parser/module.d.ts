import * as ESTree from '../estree';
import { IParser } from '../types';
import { Context } from '../utilities';
export declare function parseModuleItemList(parser: IParser, context: Context): ESTree.Statement[];
export declare function parseModuleItem(parser: IParser, context: Context): any;
export declare function parseExportDeclaration(parser: IParser, context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration;
export declare function parseImportDeclaration(parser: IParser, context: Context): ESTree.ImportDeclaration;
