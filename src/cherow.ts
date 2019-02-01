import { create } from './state';
import { parseModuleItem } from './parser/module';
import { parseStatementList } from './parser/statement';
import { parseExpression } from './parser/expression';
import * as ESTree from './estree';
import { OnComment, OnToken, pushComment, pushToken, Context, createScope, ScopeType } from './common';
import { skipHashBang, scanSingleToken } from './scanner';
import { report, Errors } from './errors';

/**
 * `ECMAScript version
 */
export type EcmaVersion = 1 | 2 | 3 | 4 | 5 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020;

/**
 * The parser options.
 */
export interface Options {
  // Set to 3, 5 (default), 6, 7, 8, 9, or 10 to specify the version of ECMAScript syntax you want to use.
  // You can also set to 2015 (same as 6), 2016 (same as 7), 2017 (same as 8), 2018 (same as 9), or 2019 (same as 10) to use the year-based naming.
  ecmaVersion?: EcmaVersion;

  // The flag to allow module code
  module?: boolean;

  // Create a top-level comments array containing all comments
  attachComments?: boolean;

  // The flag to enable stage 3 support (ESNext)
  next?: boolean;

  // The flag to enable start and end offsets to each node
  ranges?: boolean;

  // The flag to enable line/column location information to each node
  loc?: boolean;

  // The flag to enable React JSX parsing
  jsx?: boolean;

  // The flag to attach raw property to each literal and identifier node
  raw?: boolean;

  // Set to true to record the source file in every node's loc object when the loc option is set.
  source?: string;

  // The flag to enable implied strict mode
  impliedStrict?: boolean;

  // The flag to allow return in the global scope
  globalReturn?: boolean;

  // The flag to allow experimental features
  experimental?: boolean;

  // Enables method that should be bypassed when running on NodeJS
  native?: boolean;

  // Enabled tokenizing
  tokenize?: boolean;

  // Enable web compability (AnnexB)
  webCompat?: boolean;

  onComment?: OnComment;

  onToken?: OnToken;

  // Enabled directives
  directives?: boolean;
}

export const version = '2.0'; // TODO: (fkleuver) Add back Rollup replace plugin for bundle

/**
 * Parse a module body, function body, script body, etc.
 *
 * @param source The source coode to parser
 * @param options The parser options
 * @param context Context masks
 */

export function parseSource(source: string, options: Options | void, context: Context): ESTree.Program {
  let onComment: OnComment;
  let onToken: OnToken;

  if (options != null) {
    // The flag to enable module syntax support
    if (options.module) context |= Context.Module;
    // The flag to enable stage 3 support (ESNext)
    if (options.next) context |= Context.OptionsNext;
    // The flag to enable React JSX parsing
    if (options.jsx) context |= Context.OptionsJSX;
    // The flag to enable start and end offsets to each node
    if (options.ranges) context |= Context.OptionsRanges;
    // The flag to enable line/column location information to each node
    if (options.loc) context |= Context.OptionsLoc;
    // The flag to attach raw property to each literal and identifier node
    if (options.raw) context |= Context.OptionsRaw;
    // The flag to allow return in the global scope
    if (options.globalReturn) context |= Context.OptionsGlobalReturn;
    // The flag to enable implied strict mode
    if (options.impliedStrict) context |= Context.Strict;
    // The flag to enable experimental features
    if (options.experimental) context |= Context.OptionsExperimental;
    // The flag to enable "native" NodeJS / V8 features
    if (options.native) context |= Context.OptionsNative;
    // The flag to disable web compability (AnnexB)
    if (options.webCompat) context |= Context.OptionsWebCompat;
    // The flag to enable stage 3 support (ESNext)
    if (options.next) context |= Context.OptionsNext;
    // The flag to enable start and end offsets to each node
    if (options.ranges) context |= Context.OptionsRanges;
    // The flag to enable start and end offsets to each node
    if (options.directives) context |= Context.OptionsDirectives | Context.OptionsRaw;
    // The flag to attach raw property to each literal and identifier node
    if (options.raw) context |= Context.OptionsRaw;
    // Accepts either a callback function to be invoked or an array to collect comments (as the node is constructed)
    if (options.onComment != null) {
      onComment = Array.isArray(options.onComment) ? pushComment(context, options.onComment) : options.onComment;
    }
    // Accepts a callback function or an array to be invoked for each syntax node (as the node is constructed)
    if (options.onToken != null) {
      onToken = Array.isArray(options.onToken) ? pushToken(context, options.onToken) : options.onToken;
    }
  }

  const state = create(source, onComment, onToken);

  // Stage 3 - HashBang grammar
  skipHashBang(state, context);

  const scope = createScope(ScopeType.BlockStatement);
  let body;

  // Prime the scanner
  scanSingleToken(state, context | Context.AllowPossibleRegEx);

  if (context & Context.Expression) {
    body = parseExpression(state, context);
  } else if (context & Context.Module) {
    body = parseModuleItem(state, context | Context.TopLevel, scope);
    for (const key in state.exportedBindings) {
      if (key[0] === '@' && key !== '#default' && (scope.var[key] === undefined && scope.lex[key] === undefined)) {
        report(state, Errors.UndeclaredExportedBinding, key.slice(1));
      }
    }
  } else {
    body = parseStatementList(state, context | Context.TopLevel, scope);
  }

  const node: ESTree.Program = {
    type: 'Program',
    sourceType: context & Context.Module ? 'module' : 'script',
    body
  };

  if (context & Context.OptionsRanges) {
    node.start = 0;
    node.end = source.length;
  }

  /* TODO
  if (context & Context.OptionsLoc) {
    node.loc = {
      start: { line: 1, column: 0 },
      end: { line: state.line, column: state.column }
    };
  } */

  return node;
}

/**
 * Parse either script code or module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parse(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, options && options.module ? Context.Strict | Context.Module : Context.Empty);
}

/**
 * Parse script code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseScript(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, Context.Empty);
}

/**
 * Parse module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseModule(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, Context.Strict | Context.Module);
}

/**
 * Parse expressions in either script code or module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseExpressions(source: string, options?: Options): ESTree.Program {
  return parseSource(
    source,
    options,
    options && options.module ? Context.Expression | Context.Strict | Context.Module : Context.Expression
  );
}
