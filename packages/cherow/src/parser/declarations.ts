import { ParserState } from './../types';
import { Context, finishNode, getLocation, optional, expect } from '../common';
import { Token } from '../token';
import { nextToken } from '../lexer/scan';
import * as ESTree from '../estree';
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
  }
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
): ESTree.FunctionDeclaration {
  const pos = getLocation(state);
  nextToken(state, context);
  const isGenerator = optional(state, context | Context.ExpressionStart, Token.Multiply);
  let id: ESTree.Identifier | null = null;
  if (state.token !== Token.LeftParen) {
      id = parseBindingIdentifier(state, context);
  }
  context = (context | Context.InGenerator) ^ Context.InGenerator;
  context = (context | Context.InAsync) ^ Context.InAsync;
  context = (context | Context.InParam) ^ Context.InParam;

  if (isGenerator) context = context | Context.InGenerator;
  if (isAsync) context = context | Context.InAsync;

  const params = parseFormalParameters(state, context | Context.NewTarget);
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

function parseVariableDeclaration(state: ParserState, context: Context): ESTree.VariableDeclarator {

  const pos = getLocation(state);
  const id = parseBindingIdentifierOrPattern(state, context);

  let init: ESTree.Expression | null = null;

  if (optional(state, context, Token.Assign)) {
      init = parseAssignmentExpression(state, context);
  }
  return finishNode(state, context, pos, {
      type: 'VariableDeclarator',
      init,
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

export function parseVariableDeclarationList(state: ParserState, context: Context): ESTree.VariableDeclarator[] {
  const list: ESTree.VariableDeclarator[] = [parseVariableDeclaration(state, context)];
  while (optional(state, context, Token.Comma)) list.push(parseVariableDeclaration(state, context));
  return list;
}
