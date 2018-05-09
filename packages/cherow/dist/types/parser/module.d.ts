import * as ESTree from '../estree';
import { Parser } from '../types';
import { parseDirective } from './statements';
import { Context } from '../utilities';
export declare function parseModuleItemList(parser: Parser, context: Context): (ReturnType<typeof parseDirective | typeof parseModuleItem>)[];
export declare function parseModuleItem(parser: Parser, context: Context): ESTree.ExpressionStatement | ESTree.Decorator[] | ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration | ESTree.ImportDeclaration | ESTree.BlockStatement | ESTree.EmptyStatement | ESTree.DebuggerStatement | ESTree.WithStatement | ESTree.ReturnStatement | ESTree.LabeledStatement | ESTree.BreakStatement | ESTree.ContinueStatement | ESTree.IfStatement | ESTree.SwitchStatement | ESTree.ThrowStatement | ESTree.TryStatement | ESTree.WhileStatement | ESTree.DoWhileStatement | ESTree.ForStatement | ESTree.ForInStatement | ESTree.ForOfStatement | ESTree.FunctionDeclaration | ESTree.VariableDeclaration | ESTree.ClassDeclaration;
export declare function parseExportDeclaration(parser: Parser, context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration;
export declare function parseImportDeclaration(parser: Parser, context: Context): ESTree.ImportDeclaration;
