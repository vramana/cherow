import { ParserState, Location } from './../types';
import { Context, finishNode, getLocation, optional, expect, BindingType, BindingOrigin } from '../common';
import { Token, KeywordDescTable } from '../token';
import { nextToken } from '../lexer/scan';
import * as ESTree from '../estree';
import { Errors, report } from '../errors';
import { parseBindingIdentifier, parseBindingIdentifierOrPattern } from './pattern';
import { parseLeftHandSideExpression, parseClassBodyAndElementList, parseFormalParameters, parseFunctionBody, parseAssignmentExpression } from './expressions';

/**
 * Parses class declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseClassDeclaration(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  context |= Context.Strict;
  expect(state, context, Token.ClassKeyword);
  let id: ESTree.Identifier | null = null;
  if (state.token & Token.IdentifierOrContextual && state.token !== Token.ExtendsKeyword) {
      id = parseBindingIdentifier(state, context);
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.Unexpected);
  let superClass: ESTree.Expression | null = null;
  if (optional(state, context, Token.ExtendsKeyword)) {
      superClass = parseLeftHandSideExpression(state, context, pos);
  }

  const body = parseClassBodyAndElementList(state, context);

  return finishNode(state, context, pos, {
      type: 'ClassDeclaration',
      id,
      superClass,
      body
  });
}

/**
* Parses function declaration
*
* @see [Link](https://tc39.github.io/ecma262/#prod-FunctionDeclaration)
*
* @param parser  Parser object
* @param context Context masks
*/
export function parseFunctionDeclaration(
  state: ParserState,
  context: Context,
  isAsync: boolean,
  pos: Location = getLocation(state),
): ESTree.FunctionDeclaration {
  nextToken(state, context);
  const isGenerator = optional(state, context | Context.ExpressionStart, Token.Multiply);
  let id: ESTree.Identifier | null = null;
  if (state.token !== Token.LeftParen) {
      id = parseBindingIdentifier(state, context);
  } else if (!(context & Context.RequireIdentifier)) report(state, Errors.Unexpected);

  context = (context | Context.InGenerator) ^ Context.InGenerator;
  context = (context | Context.InAsync) ^ Context.InAsync;

  if (isGenerator) context = context | Context.InGenerator;
  if (isAsync) context = context | Context.InAsync;

  const params = parseFormalParameters(state, context | Context.NewTarget | Context.InParam);
  const body = parseFunctionBody(state, context | Context.NewTarget | Context.InFunctionBody);

  return finishNode(state, context, pos, {
      type: 'FunctionDeclaration',
      params,
      body,
      async: isAsync,
      generator: isGenerator,
      expression: false,
      id,
  });
}

/**
* Parses variable declaration list
*
* @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclarationList)
*
* @param parser  Parser object
* @param context Context masks
*/

export function parseVariableDeclarationList(state: ParserState, context: Context,  type: BindingType, origin: BindingOrigin): ESTree.VariableDeclarator[] {
  let elementCount = 1;
  const list: ESTree.VariableDeclarator[] = [parseVariableDeclaration(state, context, type, origin)];
  while (optional(state, context, Token.Comma)) {
    list.push(parseVariableDeclaration(state, context, type, origin));
    ++elementCount;
  }
  if (origin & BindingOrigin.ForStatement && isInOrOf(state) && elementCount > 1) {
    report(state, Errors.ForInOfLoopMultiBindings, KeywordDescTable[state.token & Token.Type]);
  }
  return list;
}

/**
 * VariableDeclaration :
 *   BindingIdentifier Initializeropt
 *   BindingPattern Initializer
 *
 * VariableDeclarationNoIn :
 *   BindingIdentifier InitializerNoInopt
 *   BindingPattern InitializerNoIn
 *
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseVariableDeclaration(state: ParserState, context: Context, type: BindingType, origin: BindingOrigin): ESTree.VariableDeclarator {
  const isBinding = state.token === Token.LeftBrace || state.token === Token.LeftBracket;
  const pos = getLocation(state);
  const id = parseBindingIdentifierOrPattern(state, context);
  let init: ESTree.Expression | null = null;
  if (state.token === Token.Assign) {
      nextToken(state, context | Context.ExpressionStart);
      init = parseAssignmentExpression(state, context);
      if (isInOrOf(state) && (origin & BindingOrigin.ForStatement || isBinding)) {
          if (state.token === Token.InKeyword) {
              // https://github.com/tc39/test262/blob/master/test/annexB/language/statements/for-in/strict-initializer.js
              if (type & BindingType.Const || type & BindingType.Let || isBinding) {
                  report(state, Errors.ForInOfLoopInitializer, KeywordDescTable[state.token & Token.Type]);
              }
          } else report(state, Errors.ForInOfLoopInitializer, KeywordDescTable[state.token & Token.Type]);
      }
  } else if (!isInOrOf(state) && (type & BindingType.Const || isBinding)) {
      report(state, Errors.DeclarationMissingInitializer, type & BindingType.Const ? 'const' : 'destructuring');
  }
  return finishNode(state, context, pos, {
      type: 'VariableDeclarator',
      init,
      id,
  });
}

export function isInOrOf(state: ParserState): boolean {
  return state.token === Token.InKeyword || state.token === Token.OfKeyword;
}
