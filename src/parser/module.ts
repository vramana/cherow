import * as ESTree from '../estree';
import {
  Context,
  Flags,
  ParserState,
  consumeSemicolon,
  Type,
  Origin,
  validateBindingIdentifier,
  addToExportedNamesAndCheckForDuplicates,
  addToExportedBindings,
  recordTokenValueAndDeduplicate,
  ScopeState,
  nextTokenIsLeftParenOrPeriod,
  nextTokenIsFuncKeywordOnSameLine,
  finishNode
} from '../common';
import { Token, KeywordDescTable } from '../token';
import { scanSingleToken } from '../scanner';
import { optional, expect, recordTokenValue, checkIfLexicalAlreadyBound, lookAheadOrScan } from '../common';
import { report, Errors } from '../errors';
import { parseDirective, parseStatementListItem, parseVariableStatement } from './statement';
import {
  parseHoistableFunctionDeclaration,
  parseHostedClassDeclaration,
  parseLexicalDeclaration
} from './declarations';
import { parseAssignmentExpression, parseIdentifier, parseLiteral } from './expression';

/**
 * Parse a module body, function body, script body, etc.
 */
export function parseModuleItem(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  const statements: ESTree.Statement[] = [];
  while (state.token === Token.StringLiteral) {
    // "use strict" must be the exact literal without escape sequences or line continuation.
    if (state.index - state.startIndex < 13 && state.tokenValue === 'use strict') {
      context |= Context.Strict;
    }
    statements.push(parseDirective(state, context, scope));
  }

  while (state.token !== Token.EndOfSource) {
    statements.push(parseModuleItemList(state, context, scope));
  }

  return statements;
}

function parseModuleItemList(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement {
  state.assignable = state.bindable = true;
  switch (state.token) {
    case Token.ExportKeyword:
      return parseExportDeclaration(state, context, scope);
    case Token.ImportKeyword:
      // 'Dynamic Import' or meta property disallowed here
      if (!(context & Context.OptionsNext && lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true))) {
        return parseImportDeclaration(state, context, scope);
      }
    // falls through
    default:
      return parseStatementListItem(state, context, scope);
  }
}

/**
 * Parse export declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExportDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExportDeclaration(state: ParserState, context: Context, scope: ScopeState): any {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  expect(state, context, Token.ExportKeyword);
  const specifiers: any[] = [];

  let declaration: any = null;
  let source: ESTree.Literal | null = null;
  if (optional(state, context | Context.AllowPossibleRegEx, Token.DefaultKeyword)) {
    switch (state.token) {
      // export default HoistableDeclaration[Default]
      case Token.FunctionKeyword: {
        declaration = parseHoistableFunctionDeclaration(
          state,
          context | Context.RequireIdentifier,
          scope,
          Origin.ExportDefault,
          false
        );
        break;
      }
      // export default ClassDeclaration[Default]
      case Token.ClassKeyword:
        declaration = parseHostedClassDeclaration(state, context | Context.RequireIdentifier, scope, true);
        break;

      // export default HoistableDeclaration[Default]
      case Token.AsyncKeyword:
        declaration = parseAsyncFunctionOrAssignmentExpression(
          state,
          context | Context.RequireIdentifier,
          scope,
          Origin.ExportDefault
        );
        break;

      default:
        // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
        declaration = parseAssignmentExpression(state, context);
        consumeSemicolon(state, context);
    }

    // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportednames
    addToExportedNamesAndCheckForDuplicates(state, 'default');

    // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportedbindings
    addToExportedBindings(state, '*default*');
    recordTokenValue(state, context, scope, Type.None, Origin.None, true, false, '*default*');

    return finishNode(state, context, start, line, column, {
      type: 'ExportDefaultDeclaration',
      declaration
    });
  }

  switch (state.token) {
    case Token.Multiply: {
      scanSingleToken(state, context); // '*'
      if (context & Context.OptionsExperimental && optional(state, context, Token.AsKeyword)) {
        recordTokenValueAndDeduplicate(state, context, scope, Type.None, Origin.None, false, state.tokenValue);
        specifiers.push(
          finishNode(state, context, state.startIndex, state.startLine, state.startColumn, {
            type: 'ExportNamespaceSpecifier',
            specifier: parseIdentifier(state, context)
          } as any)
        );
      }
      expect(state, context, Token.FromKeyword);
      if (state.token !== <Token>Token.StringLiteral) report(state, Errors.InvalidExportImportSource, 'Export');
      source = parseLiteral(state, context);
      consumeSemicolon(state, context);
      return context & Context.OptionsExperimental && specifiers
        ? finishNode(state, context, start, line, column, {
            type: 'ExportNamedDeclaration',
            source,
            specifiers
          } as any)
        : finishNode(state, context, start, line, column, {
            type: 'ExportAllDeclaration',
            source
          } as any);
    }
    case Token.LeftBrace: {
      const exportedNames: string[] = [];
      const exportedBindings: string[] = [];

      expect(state, context, Token.LeftBrace);
      while (state.token & Token.IsIdentifier) {
        const tokenValue = state.tokenValue;
        const local = parseIdentifier(state, context);
        let exported: any;
        if (state.token === <Token>Token.AsKeyword) {
          scanSingleToken(state, context);
          if ((state.token & Token.IsIdentifier) === 0) report(state, Errors.InvalidKeywordAsAlias);
          exportedNames.push(state.tokenValue);
          exportedBindings.push(tokenValue);
          exported = parseIdentifier(state, context);
        } else {
          exportedNames.push(state.tokenValue);
          exportedBindings.push(state.tokenValue);
          exported = local;
        }

        specifiers.push(
          finishNode(state, context, start, line, column, {
            type: 'ExportSpecifier',
            local,
            exported
          })
        );

        if (state.token !== <Token>Token.RightBrace) expect(state, context, Token.Comma);
      }

      expect(state, context, Token.RightBrace);

      if (optional(state, context, Token.FromKeyword)) {
        //  The left hand side can't be a keyword where there is no
        // 'from' keyword since it references a local binding.
        if (state.token !== <Token>Token.StringLiteral) report(state, Errors.InvalidExportImportSource, 'Export');
        source = parseLiteral(state, context);
      } else {
        let i = 0;
        let iMax = exportedNames.length;
        for (; i < iMax; i++) {
          addToExportedNamesAndCheckForDuplicates(state, exportedNames[i]);
        }
        i = 0;
        iMax = exportedBindings.length;
        for (; i < iMax; i++) {
          addToExportedBindings(state, exportedBindings[i]);
        }
      }

      consumeSemicolon(state, context);

      break;
    }

    case Token.ClassKeyword:
      declaration = parseHostedClassDeclaration(state, context, scope, false);
      break;
    case Token.LetKeyword:
      declaration = parseLexicalDeclaration(state, context, Type.Let, Origin.Export, scope);
      if (checkIfLexicalAlreadyBound(state, context, scope, Origin.None, false))
        report(state, Errors.DuplicateExportBinding, 'let');
      break;
    case Token.ConstKeyword:
      declaration = parseLexicalDeclaration(state, context, Type.Const, Origin.Export, scope);
      if (checkIfLexicalAlreadyBound(state, context, scope, Origin.None, false))
        report(state, Errors.DuplicateExportBinding, 'const');
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatement(state, context, Type.Variable, Origin.Export, scope);
      break;
    case Token.FunctionKeyword:
      declaration = parseHoistableFunctionDeclaration(state, context, scope, Origin.Export, false);
      break;
    case Token.AsyncKeyword:
      scanSingleToken(state, context);
      if ((state.flags & Flags.NewLine) === 0 && (state.token as Token) === Token.FunctionKeyword) {
        declaration = parseHoistableFunctionDeclaration(state, context, scope, Origin.Export, true);
        break;
      }
    // falls through
    default:
      report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);
  }

  return finishNode(state, context, start, line, column, {
    type: 'ExportNamedDeclaration',
    source,
    specifiers,
    declaration
  });
}

/**
 * Parse import declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseImportDeclaration(state: ParserState, context: Context, scope: ScopeState): any {
  const { startIndex: start, startLine: line, startColumn: column } = state;
  expect(state, context, Token.ImportKeyword);

  let source: ESTree.Literal;
  const specifiers: ESTree.Specifiers[] = [];

  // 'import' ModuleSpecifier ';'
  if (state.token & Token.IsIdentifier) {
    // V8: 'VariableMode::kConst',
    // Cherow: 'Type.Const'
    validateBindingIdentifier(state, context, Type.Const);
    recordTokenValueAndDeduplicate(state, context, scope, Type.None, Origin.None, false, state.tokenValue);
    specifiers.push(
      finishNode(state, context, start, line, column, {
        type: 'ImportDefaultSpecifier',
        local: parseIdentifier(state, context)
      })
    );

    // NameSpaceImport
    if (optional(state, context, Token.Comma)) {
      if (state.token === Token.Multiply) {
        parseImportNamespace(state, context, scope, start, line, column, specifiers);
      } else if (state.token === Token.LeftBrace) {
        parseImportSpecifierOrNamedImports(state, context, scope, start, line, column, specifiers);
      } else report(state, Errors.InvalidDefaultImport);
    }

    source = parseModuleSpecifier(state, context);

    // 'import' ModuleSpecifier ';'
  } else if (state.token === Token.StringLiteral) {
    source = parseLiteral(state, context);
  } else {
    if (state.token === Token.Multiply) {
      parseImportNamespace(state, context, scope, start, line, column, specifiers);
    } else if (state.token === Token.LeftBrace) {
      parseImportSpecifierOrNamedImports(state, context, scope, start, line, column, specifiers);
    } else report(state, Errors.UnexpectedToken, KeywordDescTable[state.token & Token.Type]);

    source = parseModuleSpecifier(state, context);
  }

  consumeSemicolon(state, context);

  return finishNode(state, context, start, line, column, {
    type: 'ImportDeclaration',
    specifiers,
    source
  });
}

/**
 * Parse named imports or import specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NamedImports)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportSpecifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseImportSpecifierOrNamedImports(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  start: number,
  line: number,
  column: number,
  specifiers: ESTree.Specifiers[]
): void {
  // NamedImports :
  //   '{' '}'
  //   '{' ImportsList '}'
  //   '{' ImportsList ',' '}'
  //
  // ImportsList :
  //   ImportSpecifier
  //   ImportsList ',' ImportSpecifier
  //
  // ImportSpecifier :
  //   BindingIdentifier
  //   IdentifierName 'as' BindingIdentifier
  expect(state, context, Token.LeftBrace);

  while (state.token & Token.IsIdentifier) {
    const { token, tokenValue } = state;
    const imported = parseIdentifier(state, context);
    let local: ESTree.Identifier;
    if (optional(state, context, Token.AsKeyword)) {
      if ((state.token & Token.IsIdentifier) === 0) report(state, Errors.InvalidKeywordAsAlias);
      validateBindingIdentifier(state, context, Type.Const);
      recordTokenValueAndDeduplicate(state, context, scope, Type.Const, Origin.None, false, state.tokenValue);
      local = parseIdentifier(state, context);
    } else {
      // An import name that is a keyword is a syntax error if it is not followed
      // by the keyword 'as'.
      validateBindingIdentifier(state, context, Type.Const, token);
      recordTokenValueAndDeduplicate(state, context, scope, Type.Const, Origin.None, false, tokenValue);
      local = imported;
    }

    specifiers.push(
      finishNode(state, context, start, line, column, {
        type: 'ImportSpecifier',
        local,
        imported
      })
    );

    if (state.token !== <Token>Token.RightBrace) expect(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);
}

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NameSpaceImport)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseImportNamespace(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  start: number,
  line: number,
  column: number,
  specifiers: ESTree.Specifiers[]
): void {
  // NameSpaceImport:
  //  * as ImportedBinding
  scanSingleToken(state, context);
  expect(state, context, Token.AsKeyword);
  // 'import * as class from "foo":'
  validateBindingIdentifier(state, context, Type.Const);
  recordTokenValue(state, context, scope, Type.Const, Origin.None, true, false, state.tokenValue);
  const local = parseIdentifier(state, context);
  specifiers.push(
    finishNode(state, context, start, line, column, {
      type: 'ImportNamespaceSpecifier',
      local
    })
  );
}

/**
 * Parse module specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleSpecifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseModuleSpecifier(state: ParserState, context: Context): ESTree.Literal {
  // ModuleSpecifier :
  //   StringLiteral
  expect(state, context, Token.FromKeyword);
  if (state.token !== Token.StringLiteral) report(state, Errors.InvalidExportImportSource, 'Import');
  return parseLiteral(state, context);
}

/**
 * Parses either async function or assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseAsyncFunctionOrAssignmentExpression(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin
): ESTree.FunctionDeclaration | ESTree.AssignmentExpression {
  return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
    ? parseHoistableFunctionDeclaration(state, context, scope, origin, true)
    : parseAssignmentExpression(state, context);
}
