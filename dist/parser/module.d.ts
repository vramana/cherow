import * as ESTree from '../estree';
import { ParserState } from '../types';
import { parseStatementListItem } from './statements';
import { Context } from '../common';
export declare function parseModuleItemList(state: ParserState, context: Context): ESTree.Statement[];
export declare function parseModuleItem(state: ParserState, context: Context): ReturnType<typeof parseExportDeclaration | typeof parseImportDeclaration | typeof parseStatementListItem>;
export declare function parseExportDeclaration(state: ParserState, context: Context): any;
export declare function parseImportDeclaration(state: ParserState, context: Context): ESTree.ImportDeclaration;
//# sourceMappingURL=module.d.ts.map