define('cherow-ts', ['exports', 'cherow'], function (exports, cherow) { 'use strict';

  function validateBreakOrContinueLabel(parser, context, label, isContinue) {
      const state = hasLabel(parser, label);
      if (!state)
          cherow.tolerant(parser, context, 30, label);
      if (isContinue && !(state & 2))
          cherow.tolerant(parser, context, 29, label);
  }
  function addLabel(parser, label) {
      if (parser.labelSet === undefined)
          parser.labelSet = {};
      parser.labelSet[`$${label}`] = parser.token & 16 ? 2 : 1;
  }
  function popLabel(parser, label) {
      parser.labelSet[`$${label}`] = 0;
  }
  function hasLabel(parser, label) {
      return !parser.labelSet ? 0 : parser.labelSet[`$${label}`];
  }
  function finishNode(context, parser, meta, node) {
      const { lastIndex, lastLine, lastColumn, sourceFile, index } = parser;
      if (context & 2) {
          node.start = meta.index;
          node.end = lastIndex;
      }
      if (context & 16) {
          node.loc = {
              start: {
                  line: meta.line,
                  column: meta.column
              },
              end: {
                  line: lastLine,
                  column: lastColumn
              }
          };
          if (sourceFile)
              node.loc.source = sourceFile;
      }
      return node;
  }
  function expect(parser, context, token, err = 1) {
      if (parser.token !== token)
          cherow.report(parser, err, cherow.tokenDesc(parser.token));
      nextToken(parser, context);
      return true;
  }
  function consume(parser, context, token) {
      if (parser.token !== token)
          return false;
      nextToken(parser, context);
      return true;
  }
  function nextToken(parser, context) {
      parser.lastIndex = parser.index;
      parser.lastLine = parser.line;
      parser.lastColumn = parser.column;
      return (parser.token = cherow.Scanner.scan(parser, context));
  }
  const hasBit = (mask, flags) => (mask & flags) === flags;
  function consumeSemicolon(parser, context) {
      return parser.token & 524288 || parser.flags & 1 ?
          consume(parser, context, 17301521) :
          cherow.report(parser, !(context & 131072) && parser.token & 131072 ? 36 : 1, cherow.tokenDesc(parser.token));
  }
  function parseExpressionCoverGrammar(parser, context, callback) {
      const { flags, pendingExpressionError } = parser;
      parser.flags |= 2 | 4;
      parser.pendingExpressionError = undefined;
      const res = callback(parser, context);
      if (!!parser.pendingExpressionError) {
          const { error, line, column, index } = parser.pendingExpressionError;
          cherow.constructError(parser, context, index, line, column, error);
      }
      parser.flags &= ~(2 | 4);
      if (flags & 2)
          parser.flags |= 2;
      if (flags & 4)
          parser.flags |= 4;
      parser.pendingExpressionError = pendingExpressionError;
      return res;
  }
  function restoreExpressionCoverGrammar(parser, context, callback) {
      const { flags, pendingExpressionError } = parser;
      parser.flags |= 2 | 4;
      parser.pendingExpressionError = undefined;
      const res = callback(parser, context);
      if (!(parser.flags & 2) || !(flags & 2)) {
          parser.flags &= ~2;
      }
      if (!(parser.flags & 4) || !(flags & 4)) {
          parser.flags &= ~4;
      }
      parser.pendingExpressionError = pendingExpressionError || parser.pendingExpressionError;
      return res;
  }
  function swapContext(parser, context, state, callback, methodState = 0) {
      context &= ~(131072 | 262144 | 524288);
      if (state & 1)
          context |= 262144;
      if (state & 2)
          context |= 131072;
      return callback(parser, context, methodState);
  }
  function validateParams(parser, context, params) {
      const paramSet = new Map();
      for (let i = 0; i < params.length; i++) {
          const key = `@${params[i]}`;
          if (paramSet.get(key)) {
              cherow.tolerant(parser, context, 79);
          }
          else
              paramSet.set(key, true);
      }
  }
  const reinterpret = (parser, context, node) => {
      switch (node.type) {
          case 'Identifier':
          case 'ArrayPattern':
          case 'AssignmentPattern':
          case 'ObjectPattern':
          case 'RestElement':
          case 'MetaProperty':
              return;
          case 'ArrayExpression':
              node.type = 'ArrayPattern';
              for (let i = 0; i < node.elements.length; ++i) {
                  if (node.elements[i] !== null) {
                      reinterpret(parser, context, node.elements[i]);
                  }
              }
              return;
          case 'ObjectExpression':
              node.type = 'ObjectPattern';
              for (let i = 0; i < node.properties.length; i++) {
                  reinterpret(parser, context, node.properties[i]);
              }
              return;
          case 'Property':
              reinterpret(parser, context, node.value);
              return;
          case 'SpreadElement':
              node.type = 'RestElement';
              if (node.argument.type !== 'ArrayExpression' &&
                  node.argument.type !== 'ObjectExpression' &&
                  !isValidSimpleAssignmentTarget(node.argument)) {
                  cherow.tolerant(parser, context, 69);
              }
              reinterpret(parser, context, node.argument);
              break;
          case 'AssignmentExpression':
              node.type = 'AssignmentPattern';
              delete node.operator;
              reinterpret(parser, context, node.left);
              return;
          case 'MemberExpression':
              if (!(context & 524288))
                  return;
          default:
              cherow.tolerant(parser, context, context & 524288 ? 75 : 71, node.type);
      }
  };
  function lookahead(parser, context, callback) {
      const { tokenValue, flags, line, column, startColumn, index, lastColumn, startLine, lastLine, lastIndex, startIndex, tokenRaw, token, lastValue, tokenRegExp } = parser;
      const res = callback(parser, context);
      parser.index = index;
      parser.token = token;
      parser.tokenValue = tokenValue;
      parser.tokenValue = tokenValue;
      parser.flags = flags;
      parser.line = line;
      parser.column = column;
      parser.tokenRaw = tokenRaw;
      parser.lastValue = lastValue;
      parser.startColumn = startColumn;
      parser.lastColumn = lastColumn;
      parser.startLine = startLine;
      parser.lastLine = lastLine;
      parser.lastIndex = lastIndex;
      parser.startIndex = startIndex;
      parser.tokenRegExp = tokenRegExp;
      return res;
  }
  function isValidSimpleAssignmentTarget(node) {
      return node.type === 'Identifier' || node.type === 'MemberExpression' ? true : false;
  }
  function getLocation(parser) {
      return {
          line: parser.startLine,
          column: parser.startColumn,
          index: parser.startIndex
      };
  }
  function isValidIdentifier(context, t) {
      if (context & 4096) {
          if (context & 8192 && t & 131072)
              return false;
          if (t & 1073741824)
              return false;
          return (t & 65536) === 65536 || (t & 36864) === 36864;
      }
      return ((t & 65536) === 65536 ||
          (t & 36864) === 36864 ||
          (t & 20480) === 20480);
  }
  function isLexical(parser, context) {
      nextToken(parser, context);
      const { token } = parser;
      return !!(token & (65536 | 8388608 | 1073741824 | 131072) ||
          token === 33574984 ||
          (token & 36864) === 36864);
  }
  function isEndOfCaseOrDefaultClauses(parser) {
      return (parser.token === 12368 || parser.token === 17301519 || parser.token === 12363);
  }
  function nextTokenIsLeftParenOrPeriod(parser, context) {
      nextToken(parser, context);
      return parser.token === 50331659 || parser.token === 16777229;
  }
  function nextTokenisIdentifierOrParen(parser, context) {
      nextToken(parser, context);
      const { token } = parser;
      return token & (65536 | 1073741824) || token === 50331659;
  }
  function nextTokenIsLeftParen(parser, context) {
      nextToken(parser, context);
      return parser.token === 50331659;
  }
  function nextTokenIsFuncKeywordOnSameLine(parser, context) {
      nextToken(parser, context);
      return !(parser.flags & 1) && parser.token === 33566808;
  }
  function isPropertyWithPrivateFieldKey(expr) {
      return !expr.property ? false : expr.property.type === 'PrivateName';
  }
  function parseAndValidateIdentifier(parser, context) {
      const { token } = parser;
      if (context & 4096) {
          if (context & 8192 && token & 131072) {
              cherow.tolerant(parser, context, 38, cherow.tokenDesc(token));
          }
          if (token & 1073741824)
              cherow.tolerant(parser, context, 38, cherow.tokenDesc(token));
          if ((token & 65536) === 65536 || (token & 36864) === 36864) {
              return parseIdentifier(parser, context);
          }
          cherow.report(parser, 1, cherow.tokenDesc(token));
      }
      if (context & 262144 && token & 1073741824) {
          cherow.tolerant(parser, context, 38, cherow.tokenDesc(token));
      }
      else if (context & 131072 && token & 131072) {
          cherow.tolerant(parser, context, 38, cherow.tokenDesc(token));
      }
      if ((token & 65536) === 65536 ||
          (token & 36864) === 36864 ||
          (token & 20480) === 20480) {
          return parseIdentifier(parser, context);
      }
      cherow.report(parser, 1, cherow.tokenDesc(parser.token));
  }
  function nameIsArgumentsOrEval(value) {
      return value === 'eval' || value === 'arguments';
  }
  function setPendingError(parser) {
      parser.errorLocation = {
          line: parser.startLine,
          column: parser.startColumn,
          index: parser.startIndex
      };
  }
  function isEqualTagNames(elementName) {
      switch (elementName.type) {
          case 'JSXIdentifier':
              return elementName.name;
          case 'JSXNamespacedName':
              return `${isEqualTagNames(elementName.namespace)}:${isEqualTagNames(elementName.name)}`;
          case 'JSXMemberExpression':
              return `${isEqualTagNames(elementName.object)}.${isEqualTagNames(elementName.property)}`;
      }
  }
  function isInstanceField(parser) {
      const { token } = parser;
      return token === 17301519 || token === 17301521 || token === 83886109;
  }
  function validateUpdateExpression(parser, context, expr, prefix) {
      if (context & 4096 && nameIsArgumentsOrEval(expr.name)) {
          cherow.tolerant(parser, context, 66, prefix);
      }
      if (!isValidSimpleAssignmentTarget(expr)) {
          cherow.tolerant(parser, context, 4);
      }
  }
  function setPendingExpressionError(parser, type) {
      parser.pendingExpressionError = {
          error: cherow.errorMessages[type],
          line: parser.line,
          column: parser.column,
          index: parser.index
      };
  }
  function validateCoverParenthesizedExpression(parser, state) {
      const { token } = parser;
      if (token & 8388608) {
          parser.flags |= 8;
      }
      else {
          if ((token & 4194304) === 4194304) {
              setPendingError(parser);
              state |= 2;
          }
          else if ((token & 20480) === 20480) {
              setPendingError(parser);
              state |= 4;
          }
          else if ((token & 131072) === 131072) {
              setPendingError(parser);
              parser.flags |= 8192;
          }
      }
      return state;
  }
  function validateAsyncArgumentList(parser, context, state) {
      const { token } = parser;
      if (!(parser.flags & 2)) {
          cherow.tolerant(parser, context, 75);
      }
      else if (token & 8388608) {
          parser.flags |= 8;
      }
      else {
          if ((token & 4194304) === 4194304) {
              setPendingError(parser);
              state |= 8;
          }
          else if ((token & 131072) === 131072) {
              setPendingError(parser);
              state |= 32;
          }
          else if ((token & 1073741824) === 1073741824) {
              setPendingError(parser);
              state |= 16;
          }
      }
      return state;
  }
  function isStartOfFunctionType(parser, context) {
      switch (parser.token) {
          case 167774015:
              return true;
          case 50331659:
              return lookahead(parser, context, isUnambiguouslyStartOfFunctionType);
          default:
              return false;
      }
  }
  function isUnambiguouslyStartOfFunctionType(parser, context) {
      nextToken(parser, context);
      switch (parser.token) {
          case 16:
          case 14:
              return true;
          case 33619969:
          case 33566815:
              {
                  nextToken(parser, context);
                  switch (parser.token) {
                      case 16777237:
                      case 16777234:
                      case 22:
                      case 83886109:
                          return true;
                      case 16:
                          {
                              nextToken(parser, context);
                              if (parser.token === 10)
                                  return true;
                          }
                      default:
                          return false;
                  }
              }
          default:
              return false;
      }
  }
  function keywordTypeFromName(value) {
      switch (value) {
          case 'any':
              return 'TSAnyKeyword';
          case 'boolean':
              return 'TSBooleanKeyword';
          case 'never':
              return 'TSNeverKeyword';
          case 'number':
              return 'TSNumberKeyword';
          case 'object':
              return 'TSObjectKeyword';
          case 'string':
              return 'TSStringKeyword';
          case 'symbol':
              return 'TSSymbolKeyword';
          case 'undefined':
              return 'TSUndefinedKeyword';
          default:
              return undefined;
      }
  }
  function iStartOfMappedType(parser, context) {
      nextToken(parser, context);
      if (parser.token === 65659) {
          nextToken(parser, context);
      }
      if (parser.token !== 41943059) {
          return false;
      }
      nextToken(parser, context);
      if (!(parser.token & 65536))
          return false;
      nextToken(parser, context);
      return parser.token === 168834865;
  }
  function isUnambiguouslyIndexSignature(parser, context) {
      nextToken(parser, context);
      if (!(parser.token & 65536))
          return false;
      nextToken(parser, context);
      return parser.token === 16777237;
  }

  function parseStatementListItem(parser, context) {
      switch (parser.token) {
          case 33566808:
              return parseFunctionDeclaration(parser, context);
          case 120:
          case 33566797:
              return parseClassDeclaration(parser, context);
          case 33574984:
              return parseLetOrExpressionStatement(parser, context | 65536);
          case 33566793:
              return parseVariableStatement(parser, context | 4194304 | 65536);
          case 299116:
              return parseAsyncFunctionDeclarationOrStatement(parser, context);
          case 33566810: {
              if (context & 1 && lookahead(parser, context, nextTokenIsLeftParenOrPeriod)) {
                  return parseExpressionStatement(parser, context | 65536);
              }
          }
          case 12371:
              if (context & 8192) {
                  cherow.tolerant(parser, context, 32, cherow.tokenDesc(parser.token));
              }
          default:
              return parseStatement(parser, context | 2097152);
      }
  }
  function parseStatement(parser, context) {
      switch (parser.token) {
          case 33566791:
              return parseVariableStatement(parser, context | 65536);
          case 17301521:
              return parseEmptyStatement(parser, context);
          case 33566814:
              return parseSwitchStatement(parser, context);
          case 41943052:
              return parseBlockStatement(parser, context);
          case 12380:
              return parseReturnStatement(parser, context);
          case 12377:
              return parseIfStatement(parser, context);
          case 12369:
              return parseDoWhileStatement(parser, context);
          case 12402:
              return parseWhileStatement(parser, context);
          case 12387:
              return parseWithStatement(parser, context);
          case 12362:
              return parseBreakStatement(parser, context);
          case 12366:
              return parseContinueStatement(parser, context);
          case 12367:
              return parseDebuggerStatement(parser, context);
          case 302002272:
              return parseThrowStatement(parser, context);
          case 12385:
              return parseTryStatement(parser, context | 536870912);
          case 12374:
              return parseForStatement(parser, context | 8388608);
          case 299116:
              if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
                  cherow.tolerant(parser, context, 33);
              }
              return parseExpressionOrLabelledStatement(parser, context | 2097152);
          case 33566808:
              cherow.tolerant(parser, context, context & 4096 ? 17 : 18);
          case 33566797:
              cherow.tolerant(parser, context, 19, cherow.tokenDesc(parser.token));
          default:
              return parseExpressionOrLabelledStatement(parser, context);
      }
  }
  function parseEmptyStatement(parser, context) {
      const pos = getLocation(parser);
      nextToken(parser, context);
      return finishNode(context, parser, pos, {
          type: 'EmptyStatement'
      });
  }
  function parseContinueStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12366);
      if (!(parser.flags & 48)) {
          cherow.tolerant(parser, context, 28, cherow.tokenDesc(parser.token));
      }
      let label = null;
      const { tokenValue } = parser;
      if (!(parser.flags & 1) && parser.token & (65536 | 4096)) {
          label = parseIdentifier(parser, context);
          validateBreakOrContinueLabel(parser, context, tokenValue, true);
      }
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'ContinueStatement',
          label
      });
  }
  function parseBreakStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12362);
      let label = null;
      const { tokenValue } = parser;
      if (!(parser.flags & 1) && parser.token & (65536 | 4096)) {
          label = parseIdentifier(parser, context);
          validateBreakOrContinueLabel(parser, context, tokenValue, false);
      }
      else if (!(parser.flags & 48)) {
          cherow.tolerant(parser, context, 28, 'break');
      }
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'BreakStatement',
          label
      });
  }
  function parseIfStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12377);
      expect(parser, context, 50331659);
      const test = parseExpression(parser, (context & ~1073741824) | 65536);
      expect(parser, context, 16);
      const consequent = parseConsequentOrAlternate(parser, context | 536870912);
      const alternate = consume(parser, context, 12370) ? parseConsequentOrAlternate(parser, context) : null;
      return finishNode(context, parser, pos, {
          type: 'IfStatement',
          test,
          consequent,
          alternate
      });
  }
  function parseConsequentOrAlternate(parser, context) {
      return context & 4096 || parser.token !== 33566808
          ? parseStatement(parser, context & ~2097152)
          : parseFunctionDeclaration(parser, context);
  }
  function parseDebuggerStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12367);
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'DebuggerStatement'
      });
  }
  function parseTryStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12385);
      const block = parseBlockStatement(parser, context);
      const handler = parser.token === 12364 ? parseCatchBlock(parser, context) : null;
      const finalizer = consume(parser, context, 12373) ? parseBlockStatement(parser, context) : null;
      if (!handler && !finalizer)
          cherow.tolerant(parser, context, 77);
      return finishNode(context, parser, pos, {
          type: 'TryStatement',
          block,
          handler,
          finalizer
      });
  }
  function parseCatchBlock(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12364);
      let param = null;
      if (context & 1
          ? consume(parser, context, 50331659)
          : expect(parser, context, 50331659)) {
          const params = [];
          param = parseBindingIdentifierOrPattern(parser, context, params);
          validateParams(parser, context, params);
          expect(parser, context, 16);
      }
      const body = parseBlockStatement(parser, context);
      return finishNode(context, parser, pos, {
          type: 'CatchClause',
          param,
          body
      });
  }
  function parseThrowStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 302002272);
      if (parser.flags & 1)
          cherow.tolerant(parser, context, 78);
      const argument = parseExpression(parser, (context & ~1073741824) | 65536);
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'ThrowStatement',
          argument
      });
  }
  function parseExpressionStatement(parser, context) {
      const pos = getLocation(parser);
      const expr = parseExpression(parser, (context & ~1073741824) | 65536);
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'ExpressionStatement',
          expression: expr
      });
  }
  function parseDirective(parser, context) {
      const pos = getLocation(parser);
      const directive = parser.tokenRaw.slice(1, -1);
      const expr = parseExpression(parser, (context & ~1073741824) | 65536);
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'ExpressionStatement',
          expression: expr,
          directive
      });
  }
  function parseExpressionOrLabelledStatement(parser, context) {
      const pos = getLocation(parser);
      const { tokenValue, token } = parser;
      const expr = parseExpression(parser, (context & ~(2097152 | 1073741824)) | 65536);
      if (token & (65536 | 4096) && parser.token === 16777237) {
          if (context & 262144 && token & 1073741824)
              cherow.tolerant(parser, context, 55);
          expect(parser, context, 16777237, 81);
          if (hasLabel(parser, tokenValue))
              cherow.tolerant(parser, context, 27, tokenValue);
          addLabel(parser, tokenValue);
          let body;
          if (!(context & 4096) &&
              context & 2097152 &&
              parser.token === 33566808) {
              body = parseFunctionDeclaration(parser, context);
          }
          else {
              body = parseStatement(parser, context);
          }
          popLabel(parser, tokenValue);
          return finishNode(context, parser, pos, {
              type: 'LabeledStatement',
              label: expr,
              body
          });
      }
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'ExpressionStatement',
          expression: expr
      });
  }
  function parseDoWhileStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12369);
      const body = parseIterationStatement(parser, context);
      expect(parser, context, 12402);
      expect(parser, context, 50331659);
      const test = parseExpression(parser, (context & ~1073741824) | 65536);
      expect(parser, context, 16);
      consume(parser, context, 17301521);
      return finishNode(context, parser, pos, {
          type: 'DoWhileStatement',
          body,
          test
      });
  }
  function parseWhileStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12402);
      expect(parser, context, 50331659);
      const test = parseExpression(parser, (context & ~1073741824) | 65536);
      expect(parser, context, 16);
      const body = parseIterationStatement(parser, context);
      return finishNode(context, parser, pos, {
          type: 'WhileStatement',
          test,
          body
      });
  }
  function parseBlockStatement(parser, context) {
      const pos = getLocation(parser);
      const body = [];
      expect(parser, context, 41943052);
      while (parser.token !== 17301519) {
          body.push(parseStatementListItem(parser, context));
      }
      expect(parser, context, 17301519);
      return finishNode(context, parser, pos, {
          type: 'BlockStatement',
          body
      });
  }
  function parseReturnStatement(parser, context) {
      const pos = getLocation(parser);
      if (!(context & (32 | 1048576))) {
          cherow.tolerant(parser, context, 16);
      }
      if (parser.flags & 32768)
          cherow.tolerant(parser, context, 2);
      expect(parser, context, 12380);
      const argument = !(parser.token & 524288) && !(parser.flags & 1)
          ? parseExpression(parser, (context & ~(1048576 | 1073741824)) | 65536)
          : null;
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'ReturnStatement',
          argument
      });
  }
  function parseIterationStatement(parser, context) {
      const savedFlags = parser.flags;
      parser.flags |= 32 | 4;
      const body = parseStatement(parser, (context & ~2097152) | 536870912);
      parser.flags = savedFlags;
      return body;
  }
  function parseWithStatement(parser, context) {
      if (context & 4096)
          cherow.tolerant(parser, context, 35);
      const pos = getLocation(parser);
      expect(parser, context, 12387);
      expect(parser, context, 50331659);
      const object = parseExpression(parser, (context & ~1073741824) | 65536);
      expect(parser, context, 16);
      const body = parseStatement(parser, context & ~2097152);
      return finishNode(context, parser, pos, {
          type: 'WithStatement',
          object,
          body
      });
  }
  function parseSwitchStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 33566814);
      expect(parser, context, 50331659);
      const discriminant = parseExpression(parser, (context & ~1073741824) | 65536);
      expect(parser, context, 16);
      expect(parser, context | 536870912, 41943052);
      const cases = [];
      const savedFlags = parser.flags;
      parser.flags |= 16;
      let seenDefault = false;
      while (parser.token !== 17301519) {
          const clause = parseCaseOrDefaultClauses(parser, context);
          cases.push(clause);
          if (clause.test === null) {
              if (seenDefault)
                  cherow.tolerant(parser, context, 31);
              seenDefault = true;
          }
      }
      parser.flags = savedFlags;
      expect(parser, context, 17301519);
      return finishNode(context, parser, pos, {
          type: 'SwitchStatement',
          discriminant,
          cases
      });
  }
  function parseCaseOrDefaultClauses(parser, context) {
      const pos = getLocation(parser);
      let test = null;
      if (consume(parser, context, 12363)) {
          test = parseExpression(parser, (context & ~1073741824) | 65536);
      }
      else {
          expect(parser, context, 12368);
      }
      expect(parser, context, 16777237);
      const consequent = [];
      while (!isEndOfCaseOrDefaultClauses(parser)) {
          consequent.push(parseStatementListItem(parser, context | 65536));
      }
      return finishNode(context, parser, pos, {
          type: 'SwitchCase',
          test,
          consequent
      });
  }
  function parseVariableStatement(parser, context, shouldConsume = true) {
      const pos = getLocation(parser);
      const { token } = parser;
      const isConst = token === 33566793;
      nextToken(parser, context);
      const declarations = parseVariableDeclarationList(parser, context, isConst);
      if (shouldConsume)
          consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'VariableDeclaration',
          kind: cherow.tokenDesc(token),
          declarations
      });
  }
  function parseLetOrExpressionStatement(parser, context, shouldConsume = true) {
      return lookahead(parser, context, isLexical)
          ? parseVariableStatement(parser, context | 4194304, shouldConsume)
          : parseExpressionOrLabelledStatement(parser, context);
  }
  function parseAsyncFunctionDeclarationOrStatement(parser, context) {
      return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)
          ? parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context)
          : parseStatement(parser, context);
  }
  function parseForStatement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 12374);
      const awaitToken = !!(context & 131072 && consume(parser, context, 33788013));
      expect(parser, context | 536870912, 50331659);
      const { token } = parser;
      let init = null;
      let sequencePos = null;
      let variableStatement = null;
      let type = 'ForStatement';
      let test = null;
      let update = null;
      let right;
      if (token === 33566793 || (token === 33574984 && lookahead(parser, context, isLexical))) {
          variableStatement = parseVariableStatement(parser, (context & ~65536) | 4194304, false);
      }
      else if (token === 33566791) {
          variableStatement = parseVariableStatement(parser, context & ~65536, false);
      }
      else if (token !== 17301521) {
          sequencePos = getLocation(parser);
          init = restoreExpressionCoverGrammar(parser, (context & ~65536) | 536870912, parseAssignmentExpression);
      }
      if (consume(parser, context, 1085554)) {
          type = 'ForOfStatement';
          if (init) {
              if (!(parser.flags & 4) || init.type === 'AssignmentExpression') {
                  cherow.tolerant(parser, context, 71);
              }
              reinterpret(parser, context, init);
          }
          else
              init = variableStatement;
          right = parseAssignmentExpression(parser, context | 65536);
      }
      else if (consume(parser, context, 168834865)) {
          if (init) {
              if (!(parser.flags & 4))
                  cherow.tolerant(parser, context, 71);
              reinterpret(parser, context, init);
          }
          else
              init = variableStatement;
          type = 'ForInStatement';
          right = parseExpression(parser, (context & ~1073741824) | 65536);
      }
      else {
          if (parser.token === 16777234)
              init = parseSequenceExpression(parser, context, init, sequencePos);
          if (variableStatement)
              init = variableStatement;
          expect(parser, context, 17301521);
          test = parser.token !== 17301521
              ? parseExpression(parser, (context & ~1073741824) | 65536)
              : null;
          expect(parser, context, 17301521);
          update = parser.token !== 16
              ? parseExpression(parser, (context & ~1073741824) | 65536)
              : null;
      }
      expect(parser, context, 16);
      const body = parseIterationStatement(parser, context);
      return finishNode(context, parser, pos, type === 'ForOfStatement'
          ? {
              type,
              body,
              left: init,
              right,
              await: awaitToken
          }
          : right
              ? {
                  type: type,
                  body,
                  left: init,
                  right
              }
              : {
                  type: type,
                  body,
                  init,
                  test,
                  update
              });
  }

  function parseJSXRootElement(parser, context) {
      const pos = getLocation(parser);
      let children = [];
      let closingElement = null;
      let selfClosing = false;
      let openingElement;
      expect(parser, context, 167774015);
      const isFragment = parser.token === 167774016;
      if (isFragment) {
          openingElement = parseJSXOpeningFragment(parser, context, pos);
      }
      else {
          const name = parseJSXElementName(parser, context);
          const attributes = parseJSXAttributes(parser, context);
          selfClosing = consume(parser, context, 167774773);
          openingElement = parseJSXOpeningElement(parser, context, name, attributes, selfClosing, pos);
      }
      if (isFragment)
          return parseJSXFragment(parser, context, openingElement, pos);
      if (!selfClosing) {
          children = parseJSXChildren(parser, context);
          closingElement = parseJSXClosingElement(parser, context);
          const open = isEqualTagNames(openingElement.name);
          const close = isEqualTagNames(closingElement.name);
          if (open !== close)
              cherow.report(parser, 83, close);
      }
      return finishNode(context, parser, pos, {
          type: 'JSXElement',
          children,
          openingElement,
          closingElement,
      });
  }
  function parseJSXOpeningElement(parser, context, name, attributes, selfClosing, pos) {
      if (context & 268435456 && selfClosing)
          expect(parser, context, 167774016);
      else
          nextJSXToken(parser);
      return finishNode(context, parser, pos, {
          type: 'JSXOpeningElement',
          name,
          attributes,
          selfClosing,
      });
  }
  function parseJSXFragment(parser, context, openingElement, pos) {
      const children = parseJSXChildren(parser, context);
      const closingFragment = parseJSXClosingFragment(parser, context);
      return finishNode(context, parser, pos, {
          type: 'JSXFragment',
          children,
          openingElement,
          closingFragment,
      });
  }
  function parseJSXOpeningFragment(parser, context, pos) {
      nextJSXToken(parser);
      return finishNode(context, parser, pos, {
          type: 'JSXOpeningFragment',
      });
  }
  function nextJSXToken(parser) {
      return parser.token = scanJSXToken(parser);
  }
  function scanJSXToken(parser) {
      if (parser.index >= parser.source.length)
          return 524288;
      parser.lastIndex = parser.startIndex = parser.index;
      const char = parser.source.charCodeAt(parser.index);
      if (char === 60) {
          parser.index++;
          parser.column++;
          return cherow.Scanner.consumeOpt(parser, 47) ? 25 : 167774015;
      }
      else if (char === 123) {
          parser.index++;
          parser.column++;
          return 41943052;
      }
      while (parser.index < parser.source.length) {
          parser.index++;
          parser.column++;
          const next = parser.source.charCodeAt(parser.index);
          if (next === 123 || next === 60)
              break;
      }
      return 121;
  }
  function parseJSXChildren(parser, context) {
      const children = [];
      while (parser.token !== 25) {
          children.push(parseJSXChild(parser, context));
      }
      return children;
  }
  function parseJSXText(parser, context) {
      const pos = getLocation(parser);
      const value = parser.source.slice(parser.startIndex, parser.index);
      parser.token = scanJSXToken(parser);
      const node = finishNode(context, parser, pos, {
          type: 'JSXText',
          value,
      });
      if (context & 8)
          node.raw = value;
      return node;
  }
  function parseJSXChild(parser, context) {
      switch (parser.token) {
          case 33619969:
          case 121:
              return parseJSXText(parser, context);
          case 41943052:
              return parseJSXExpression(parser, context & ~268435456);
          case 167774015:
              return parseJSXRootElement(parser, context & ~268435456);
          default:
              cherow.report(parser, 0);
      }
      return undefined;
  }
  function parseJSXAttributes(parser, context) {
      const attributes = [];
      while (parser.index < parser.source.length) {
          if (parser.token === 167774773 || parser.token === 167774016)
              break;
          attributes.push(parseJSXAttribute(parser, context));
      }
      return attributes;
  }
  function parseJSXSpreadAttribute(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 41943052);
      expect(parser, context, 14);
      const expression = parseExpressionCoverGrammar(parser, context & ~268435456, parseAssignmentExpression);
      expect(parser, context, 17301519);
      return finishNode(context, parser, pos, {
          type: 'JSXSpreadAttribute',
          argument: expression,
      });
  }
  function parseJSXNamespacedName(parser, context, namespace, pos) {
      expect(parser, context, 16777237);
      const name = parseJSXIdentifier(parser, context);
      return finishNode(context, parser, pos, {
          type: 'JSXNamespacedName',
          namespace,
          name,
      });
  }
  function parseJSXAttributeName(parser, context) {
      const pos = getLocation(parser);
      const identifier = parseJSXIdentifier(parser, context);
      return parser.token === 16777237 ?
          parseJSXNamespacedName(parser, context, identifier, pos) :
          identifier;
  }
  function parseJSXAttributeValue(parser, context) {
      switch (scanJSXAttributeValue(parser, context)) {
          case 33554435:
              return parseLiteral(parser, context);
          case 41943052:
              return parseJSXExpressionContainer(parser, context | 268435456);
          case 167774015:
              return parseJSXRootElement(parser, context | 268435456);
          default:
              cherow.tolerant(parser, context, 85);
      }
      return undefined;
  }
  function parseJSXAttribute(parser, context) {
      const pos = getLocation(parser);
      if (parser.token === 41943052)
          return parseJSXSpreadAttribute(parser, context);
      scanJSXIdentifier(parser);
      const attrName = parseJSXAttributeName(parser, context);
      const value = parser.token === 83886109 ? parseJSXAttributeValue(parser, context) : null;
      return finishNode(context, parser, pos, {
          type: 'JSXAttribute',
          value: value,
          name: attrName,
      });
  }
  function scanJSXAttributeValue(parser, context) {
      parser.lastIndex = parser.index;
      const ch = parser.source.charCodeAt(parser.index);
      switch (ch) {
          case 34:
          case 39:
              return scanJSXString(parser, context, ch);
          default:
              return nextToken(parser, context);
      }
  }
  function scanJSXString(parser, context, quote) {
      const rawStart = parser.index;
      parser.index++;
      parser.column++;
      let ret = '';
      let ch = parser.source.charCodeAt(parser.index);
      while (ch !== quote) {
          ret += cherow.Scanner.fromCodePoint(ch);
          parser.index++;
          parser.column++;
          ch = parser.source.charCodeAt(parser.index);
          if (parser.index >= parser.source.length)
              cherow.report(parser, 5);
      }
      parser.index++;
      parser.column++;
      if (context & 8)
          parser.tokenRaw = parser.source.slice(rawStart, parser.index);
      parser.tokenValue = ret;
      return 33554435;
  }
  function parseJSXEmptyExpression(parser, context) {
      const pos = getLocation(parser);
      return finishNode(context, parser, pos, {
          type: 'JSXEmptyExpression',
      });
  }
  function parseJSXSpreadChild(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 14);
      const expression = parseExpression(parser, context);
      expect(parser, context, 17301519);
      return finishNode(context, parser, pos, {
          type: 'JSXSpreadChild',
          expression,
      });
  }
  function parseJSXExpressionContainer(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 41943052);
      if (parser.token === 17301519)
          cherow.tolerant(parser, context, 82);
      const expression = parseExpressionCoverGrammar(parser, context & ~268435456, parseAssignmentExpression);
      expect(parser, context, 17301519);
      return finishNode(context, parser, pos, {
          type: 'JSXExpressionContainer',
          expression,
      });
  }
  function parseJSXExpression(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 41943052);
      if (parser.token === 14)
          return parseJSXSpreadChild(parser, context);
      const expression = parser.token === 17301519 ?
          parseJSXEmptyExpression(parser, context) :
          parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
      nextJSXToken(parser);
      return finishNode(context, parser, pos, {
          type: 'JSXExpressionContainer',
          expression,
      });
  }
  function parseJSXClosingFragment(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 25);
      expect(parser, context, 167774016);
      return finishNode(context, parser, pos, {
          type: 'JSXClosingFragment',
      });
  }
  function parseJSXClosingElement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 25);
      const name = parseJSXElementName(parser, context);
      if (context & 268435456)
          expect(parser, context, 167774016);
      else
          nextJSXToken(parser);
      return finishNode(context, parser, pos, {
          type: 'JSXClosingElement',
          name,
      });
  }
  function parseJSXIdentifier(parser, context) {
      const { token, tokenValue: name, tokenRaw: raw } = parser;
      if (!(token & (65536 | 4096))) {
          cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
      }
      const pos = getLocation(parser);
      nextToken(parser, context);
      const node = finishNode(context, parser, pos, {
          type: 'JSXIdentifier',
          name,
      });
      if (context & 256)
          node.raw = raw;
      return node;
  }
  function parseJSXMemberExpression(parser, context, expr, pos) {
      scanJSXIdentifier(parser);
      return finishNode(context, parser, pos, {
          type: 'JSXMemberExpression',
          object: expr,
          property: parseJSXIdentifier(parser, context),
      });
  }
  function parseJSXElementName(parser, context) {
      const pos = getLocation(parser);
      scanJSXIdentifier(parser);
      let elementName = parseJSXIdentifier(parser, context);
      if (parser.token === 16777237)
          return parseJSXNamespacedName(parser, context, elementName, pos);
      while (consume(parser, context, 16777229)) {
          elementName = parseJSXMemberExpression(parser, context, elementName, pos);
      }
      return elementName;
  }
  function scanJSXIdentifier(parser) {
      const { token } = parser;
      if (token & (65536 | 4096)) {
          const firstCharPosition = parser.index;
          let ch = parser.source.charCodeAt(parser.index);
          while ((parser.index < parser.source.length) && (ch === 45 || (cherow.isValidIdentifierPart(ch)))) {
              ch = cherow.Scanner.readNext(parser);
          }
          parser.tokenValue += parser.source.substr(firstCharPosition, parser.index - firstCharPosition);
      }
      return parser.token;
  }

  function parseExpression(parser, context) {
      const pos = getLocation(parser);
      const saveDecoratorContext = parser.flags;
      const expr = parseExpressionCoverGrammar(parser, context, parseAssignmentExpression);
      return parser.token === 16777234 ?
          parseSequenceExpression(parser, context, expr, pos) :
          expr;
  }
  function parseSequenceExpression(parser, context, left, pos) {
      const expressions = [left];
      while (consume(parser, context, 16777234)) {
          expressions.push(parseExpressionCoverGrammar(parser, context, parseAssignmentExpression));
      }
      return finishNode(context, parser, pos, {
          type: 'SequenceExpression',
          expressions,
      });
  }
  function parseYieldExpression(parser, context, pos) {
      if (context & 524288)
          cherow.tolerant(parser, context, 49);
      expect(parser, context, 1107316842);
      let argument = null;
      let delegate = false;
      if (!(parser.flags & 1)) {
          delegate = consume(parser, context, 167774771);
          if (delegate || parser.token & 33554432) {
              argument = parseAssignmentExpression(parser, context);
          }
      }
      return finishNode(context, parser, pos, {
          type: 'YieldExpression',
          argument,
          delegate,
      });
  }
  function parseAssignmentExpression(parser, context) {
      const pos = getLocation(parser);
      let { token } = parser;
      if (context & 262144 && token & 1073741824)
          return parseYieldExpression(parser, context, pos);
      let expr = token & 262144 && lookahead(parser, context, nextTokenisIdentifierOrParen)
          ? parserCoverCallExpressionAndAsyncArrowHead(parser, context)
          : parseConditionalExpression(parser, context, pos);
      if (parser.token === 10) {
          if (token & (65536 | 4096)) {
              if (token & (20480 | 4194304)) {
                  if (token & 20480) {
                      parser.flags |= 64;
                  }
                  if (token & 4194304) {
                      if (context & 4096)
                          cherow.tolerant(parser, context, 45);
                      parser.flags |= 2048;
                  }
              }
              expr = [expr];
          }
          return parseArrowFunction(parser, context &= ~131072, pos, expr);
      }
      if (hasBit(parser.token, 67108864)) {
          token = parser.token;
          if (context & 4096 && nameIsArgumentsOrEval(expr.name)) {
              cherow.tolerant(parser, context, 15);
          }
          else if (consume(parser, context, 83886109)) {
              if (!(parser.flags & 4)) {
                  cherow.tolerant(parser, context, 71);
              }
              if (!(context & 524288))
                  reinterpret(parser, context, expr);
              if (context & 134217728)
                  parser.flags |= 8;
              if (parser.token & 131072) {
                  setPendingError(parser);
                  parser.flags |= 8192;
              }
              else if (context & 134217728 &&
                  context & (4096 | 262144) &&
                  parser.token & 1073741824) {
                  setPendingError(parser);
                  parser.flags |= 16384;
              }
          }
          else {
              if (!isValidSimpleAssignmentTarget(expr)) {
                  cherow.tolerant(parser, context, 4);
              }
              parser.flags &= ~(4 | 2);
              nextToken(parser, context);
          }
          const right = parseExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression);
          parser.pendingExpressionError = null;
          return finishNode(context, parser, pos, {
              type: 'AssignmentExpression',
              left: expr,
              operator: cherow.tokenDesc(token),
              right,
          });
      }
      return expr;
  }
  function parseConditionalExpression(parser, context, pos) {
      const test = parseBinaryExpression(parser, context, 0, pos);
      if (!consume(parser, context, 22))
          return test;
      const consequent = parseExpressionCoverGrammar(parser, context & ~1073741824 | 65536, parseAssignmentExpression);
      expect(parser, context, 16777237);
      return finishNode(context, parser, pos, {
          type: 'ConditionalExpression',
          test,
          consequent,
          alternate: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression),
      });
  }
  function parseBinaryExpression(parser, context, minPrec, pos, left = parseUnaryExpression(parser, context)) {
      const bit = context & 65536 ^ 65536;
      while (hasBit(parser.token, 167772160)) {
          const t = parser.token;
          if (bit && t === 168834865)
              break;
          const prec = t & 3840;
          const delta = (t === 167775030) << 8;
          if (prec + delta <= minPrec)
              break;
          nextToken(parser, context);
          left = finishNode(context, parser, pos, {
              type: t & 2097152 ? 'LogicalExpression' : 'BinaryExpression',
              left,
              right: parseBinaryExpression(parser, context & ~65536, prec, getLocation(parser)),
              operator: cherow.tokenDesc(t),
          });
      }
      return left;
  }
  function parseAwaitExpression(parser, context, pos) {
      if (context & 524288)
          cherow.tolerant(parser, context, 50);
      expect(parser, context, 33788013);
      return finishNode(context, parser, pos, {
          type: 'AwaitExpression',
          argument: parseUnaryExpression(parser, context),
      });
  }
  function parseUnaryExpression(parser, context) {
      const pos = getLocation(parser);
      const { token } = parser;
      if (hasBit(token, 301989888)) {
          nextToken(parser, context);
          if (parser.flags & 32768)
              cherow.tolerant(parser, context, 2);
          const argument = parseExpressionCoverGrammar(parser, context, parseUnaryExpression);
          if (parser.token === 167775030)
              cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
          if (context & 4096 && token === 302002219) {
              if (argument.type === 'Identifier') {
                  cherow.tolerant(parser, context, 41);
              }
              else if (isPropertyWithPrivateFieldKey(argument)) {
                  cherow.tolerant(parser, context, 42);
              }
          }
          return finishNode(context, parser, pos, {
              type: 'UnaryExpression',
              operator: cherow.tokenDesc(token),
              argument,
              prefix: true,
          });
      }
      return context & 131072 && token & 131072
          ? parseAwaitExpression(parser, context, pos)
          : parseUpdateExpression(parser, context, pos);
  }
  function parseUpdateExpression(parser, context, pos) {
      const { token } = parser;
      if (hasBit(parser.token, 570425344)) {
          nextToken(parser, context);
          const expr = parseLeftHandSideExpression(parser, context, pos);
          validateUpdateExpression(parser, context, expr, 'Prefix');
          return finishNode(context, parser, pos, {
              type: 'UpdateExpression',
              argument: expr,
              operator: cherow.tokenDesc(token),
              prefix: true,
          });
      }
      else if (context & 4 && token === 167774015) {
          return parseJSXRootElement(parser, context | 268435456);
      }
      const expression = parseLeftHandSideExpression(parser, context, pos);
      if (hasBit(parser.token, 570425344) && !(parser.flags & 1)) {
          validateUpdateExpression(parser, context, expression, 'Postfix');
          const operator = parser.token;
          nextToken(parser, context);
          return finishNode(context, parser, pos, {
              type: 'UpdateExpression',
              argument: expression,
              operator: cherow.tokenDesc(operator),
              prefix: false,
          });
      }
      return expression;
  }
  function parseRestElement(parser, context, args = []) {
      const pos = getLocation(parser);
      expect(parser, context, 14);
      if (context & 134217728 && parser.token & 131072)
          parser.flags |= 8192;
      const argument = parseBindingIdentifierOrPattern(parser, context, args);
      return finishNode(context, parser, pos, {
          type: 'RestElement',
          argument,
      });
  }
  function parseSpreadElement(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 14);
      const argument = restoreExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression);
      return finishNode(context, parser, pos, {
          type: 'SpreadElement',
          argument,
      });
  }
  function parseLeftHandSideExpression(parser, context, pos) {
      const expr = context & 1 && parser.token === 33566810 ?
          parseCallImportOrMetaProperty(parser, context | 65536) :
          parseMemberExpression(parser, context | 65536, pos);
      return parseCallExpression(parser, context | 65536, pos, expr);
  }
  function parseMemberExpression(parser, context, pos, expr = parsePrimaryExpression(parser, context)) {
      while (true) {
          switch (parser.token) {
              case 16777229: {
                  consume(parser, context, 16777229);
                  parser.flags = parser.flags & ~2 | 4;
                  const property = parseIdentifierNameOrPrivateName(parser, context);
                  expr = finishNode(context, parser, pos, {
                      type: 'MemberExpression',
                      object: expr,
                      computed: false,
                      property,
                  });
                  continue;
              }
              case 41943059: {
                  consume(parser, context, 41943059);
                  parser.flags = parser.flags & ~2 | 4;
                  const property = parseExpression(parser, context);
                  expect(parser, context, 20);
                  expr = finishNode(context, parser, pos, {
                      type: 'MemberExpression',
                      object: expr,
                      computed: true,
                      property,
                  });
                  continue;
              }
              case 33554441: {
                  expr = finishNode(context, parser, pos, {
                      type: 'TaggedTemplateExpression',
                      tag: expr,
                      quasi: parseTemplateLiteral(parser, context),
                  });
                  continue;
              }
              case 33554440: {
                  expr = finishNode(context, parser, pos, {
                      type: 'TaggedTemplateExpression',
                      tag: expr,
                      quasi: parseTemplate(parser, context | 16384),
                  });
                  continue;
              }
              default:
                  return expr;
          }
      }
  }
  function parseCallExpression(parser, context, pos, expr) {
      while (true) {
          expr = parseMemberExpression(parser, context, pos, expr);
          if (parser.token !== 50331659)
              return expr;
          const args = parseArgumentList(parser, context & ~1073741824);
          expr = finishNode(context, parser, pos, {
              type: 'CallExpression',
              callee: expr,
              arguments: args,
          });
      }
  }
  function parserCoverCallExpressionAndAsyncArrowHead(parser, context) {
      const pos = getLocation(parser);
      let expr = parseMemberExpression(parser, context | 65536, pos);
      if (parser.token & (65536 | 4096)) {
          if (parser.token & 131072)
              cherow.tolerant(parser, context, 38);
          return parseAsyncArrowFunction(parser, context, 2, pos, [parseAndValidateIdentifier(parser, context)]);
      }
      if (parser.flags & 1)
          cherow.tolerant(parser, context, 34, 'async');
      while (parser.token === 50331659) {
          expr = parseMemberExpression(parser, context, pos, expr);
          const args = parseAsyncArgumentList(parser, context);
          if (parser.token === 10) {
              expr = parseAsyncArrowFunction(parser, context, 2, pos, args);
              break;
          }
          expr = finishNode(context, parser, pos, {
              type: 'CallExpression',
              callee: expr,
              arguments: args,
          });
      }
      return expr;
  }
  function parseArgumentList(parser, context) {
      expect(parser, context, 50331659);
      const expressions = [];
      while (parser.token !== 16) {
          if (parser.token === 14) {
              expressions.push(parseSpreadElement(parser, context));
          }
          else {
              if (context & 262144 && hasBit(parser.token, 1073741824)) {
                  parser.flags |= 16384;
                  setPendingError(parser);
              }
              expressions.push(parseExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression));
          }
          if (parser.token !== 16)
              expect(parser, context, 16777234);
      }
      expect(parser, context, 16);
      return expressions;
  }
  function parseAsyncArgumentList(parser, context) {
      expect(parser, context, 50331659);
      const args = [];
      let { token } = parser;
      let state = 0;
      while (parser.token !== 16) {
          if (parser.token === 14) {
              parser.flags |= 8;
              args.push(parseSpreadElement(parser, context));
              state = 2;
          }
          else {
              token = parser.token;
              state = validateAsyncArgumentList(parser, context, state);
              args.push(restoreExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression));
          }
          if (consume(parser, context, 16777234)) {
              parser.flags &= ~4;
              if (state & 2)
                  state = 1;
          }
          if (parser.token === 16)
              break;
      }
      expect(parser, context, 16);
      if (parser.token === 10) {
          if (state & 1) {
              cherow.tolerant(parser, context, 76);
          }
          else if (state & 8) {
              if (context & 4096)
                  cherow.tolerant(parser, context, 45);
              parser.flags |= 2048;
          }
          else if (state & 16) {
              if (context & 4096)
                  cherow.tolerant(parser, context, 49);
              parser.flags |= 64;
          }
          else if (parser.flags & 16384) {
              cherow.tolerant(parser, context, 49);
          }
          else if (state & 32 || parser.flags & 8192) {
              cherow.tolerant(parser, context, 50);
          }
      }
      return args;
  }
  function parsePrimaryExpression(parser, context) {
      switch (parser.token) {
          case 33554434:
          case 33554435:
              return parseLiteral(parser, context);
          case 33554551:
              return parseBigIntLiteral(parser, context);
          case 33619969:
              return parseIdentifier(parser, context);
          case 33566727:
          case 33566726:
          case 33566725:
              return parseNullOrTrueOrFalseLiteral(parser, context);
          case 33566808:
              return parseFunctionExpression(parser, context);
          case 33566815:
              return parseThisExpression(parser, context);
          case 299116:
              return parseAsyncFunctionOrIdentifier(parser, context);
          case 50331659:
              return parseCoverParenthesizedExpressionAndArrowParameterList(parser, context | 134217728);
          case 41943059:
              return restoreExpressionCoverGrammar(parser, context, parseArrayLiteral);
          case 41943052:
              return restoreExpressionCoverGrammar(parser, context, parseObjectLiteral);
          case 115:
              return parseIdentifierNameOrPrivateName(parser, context);
          case 120:
          case 33566797:
              return parseClassExpression(parser, context);
          case 33566811:
              return parseNewExpressionOrMetaProperty(parser, context);
          case 33566813:
              return parseSuperProperty(parser, context);
          case 167774773:
          case 100663333:
              cherow.Scanner.scanRegularExpression(parser, context);
              return parseRegularExpressionLiteral(parser, context);
          case 33554441:
              return parseTemplateLiteral(parser, context);
          case 33554440:
              return parseTemplate(parser, context);
          case 33574984:
              return parseLetAsIdentifier(parser, context);
          default:
              return parseAndValidateIdentifier(parser, context);
      }
  }
  function parseLetAsIdentifier(parser, context) {
      if (context & 4096)
          cherow.tolerant(parser, context, 48);
      const pos = getLocation(parser);
      const name = parser.tokenValue;
      nextToken(parser, context);
      if (parser.flags & 1) {
          if (parser.token === 41943059)
              cherow.tolerant(parser, context, 1, 'let');
      }
      return finishNode(context, parser, pos, {
          type: 'Identifier',
          name,
      });
  }
  function parseAsyncFunctionOrIdentifier(parser, context) {
      return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
          parseAsyncFunctionOrAsyncGeneratorExpression(parser, context) :
          parseIdentifier(parser, context);
  }
  function parseIdentifier(parser, context) {
      const pos = getLocation(parser);
      const name = parser.tokenValue;
      nextToken(parser, context | 16384);
      const node = finishNode(context, parser, pos, {
          type: 'Identifier',
          name,
      });
      if (context & 256)
          node.raw = parser.tokenRaw;
      return node;
  }
  function parseRegularExpressionLiteral(parser, context) {
      const pos = getLocation(parser);
      const { tokenRegExp, tokenValue, tokenRaw } = parser;
      nextToken(parser, context);
      const node = finishNode(context, parser, pos, {
          type: 'Literal',
          value: tokenValue,
          regex: tokenRegExp,
      });
      if (context & 8)
          node.raw = tokenRaw;
      return node;
  }
  function parseLiteral(parser, context) {
      const pos = getLocation(parser);
      const value = parser.tokenValue;
      if (context & 4096 && parser.flags & 128) {
          cherow.tolerant(parser, context, 59);
      }
      nextToken(parser, context);
      const node = finishNode(context, parser, pos, {
          type: 'Literal',
          value,
      });
      if (context & 8)
          node.raw = parser.tokenRaw;
      return node;
  }
  function parseBigIntLiteral(parser, context) {
      const pos = getLocation(parser);
      const { tokenValue, tokenRaw } = parser;
      nextToken(parser, context);
      const node = finishNode(context, parser, pos, {
          type: 'Literal',
          value: tokenValue,
          bigint: tokenRaw,
      });
      if (context & 8)
          node.raw = parser.tokenRaw;
      return node;
  }
  function parseNullOrTrueOrFalseLiteral(parser, context) {
      const pos = getLocation(parser);
      const { token } = parser;
      const raw = cherow.tokenDesc(token);
      if (parser.flags & 32768)
          cherow.tolerant(parser, context, 2);
      nextToken(parser, context);
      const node = finishNode(context, parser, pos, {
          type: 'Literal',
          value: token === 33566727 ? null : raw === 'true',
      });
      if (context & 8)
          node.raw = raw;
      return node;
  }
  function parseThisExpression(parser, context) {
      if (parser.flags & 32768)
          cherow.tolerant(parser, context, 2);
      const pos = getLocation(parser);
      nextToken(parser, context | 536870912);
      return finishNode(context, parser, pos, {
          type: 'ThisExpression',
      });
  }
  function parseIdentifierName(parser, context, t) {
      if (!(t & (65536 | 4096)))
          cherow.tolerant(parser, context, 3, cherow.tokenDesc(t));
      return parseIdentifier(parser, context);
  }
  function parseIdentifierNameOrPrivateName(parser, context) {
      if (!consume(parser, context, 115))
          return parseIdentifierName(parser, context, parser.token);
      const { tokenValue } = parser;
      const pos = getLocation(parser);
      const name = tokenValue;
      nextToken(parser, context);
      return finishNode(context, parser, pos, {
          type: 'PrivateName',
          name,
      });
  }
  function parseArrayLiteral(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 41943059);
      const elements = [];
      while (parser.token !== 20) {
          if (consume(parser, context, 16777234)) {
              elements.push(null);
          }
          else if (parser.token === 14) {
              elements.push(parseSpreadElement(parser, context));
              if (parser.token !== 20) {
                  parser.flags &= ~(4 | 2);
                  expect(parser, context, 16777234);
              }
          }
          else {
              elements.push(restoreExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression));
              if (parser.token !== 20)
                  expect(parser, context, 16777234);
          }
      }
      expect(parser, context, 20);
      return finishNode(context, parser, pos, {
          type: 'ArrayExpression',
          elements,
      });
  }
  function parseCoverParenthesizedExpressionAndArrowParameterList(parser, context) {
      expect(parser, context, 50331659);
      switch (parser.token) {
          case 16:
              {
                  expect(parser, context, 16);
                  parser.flags &= ~(4 | 2);
                  if (parser.token === 10)
                      return [];
              }
          case 14:
              {
                  const expr = parseRestElement(parser, context);
                  expect(parser, context, 16);
                  parser.flags = parser.flags & ~(4 | 2) | 8;
                  if (parser.token !== 10)
                      cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
                  return [expr];
              }
          default:
              {
                  let state = 0;
                  const sequencepos = getLocation(parser);
                  state = validateCoverParenthesizedExpression(parser, state);
                  if (parser.token & 8388608)
                      state |= 16;
                  let expr = restoreExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression);
                  if (parser.token === 16777234) {
                      state |= 1;
                      const expressions = [expr];
                      while (consume(parser, context | 536870912, 16777234)) {
                          parser.flags &= ~4;
                          switch (parser.token) {
                              case 14:
                                  {
                                      if (!(parser.flags & 2))
                                          cherow.tolerant(parser, context, 75);
                                      parser.flags |= 8;
                                      const restElement = parseRestElement(parser, context);
                                      expect(parser, context, 16);
                                      if (parser.token !== 10)
                                          cherow.tolerant(parser, context, 76);
                                      parser.flags &= ~2;
                                      expressions.push(restElement);
                                      return expressions;
                                  }
                              case 16:
                                  {
                                      expect(parser, context, 16);
                                      if (parser.token !== 10)
                                          cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
                                      return expressions;
                                  }
                              default:
                                  {
                                      state = validateCoverParenthesizedExpression(parser, state);
                                      expressions.push(restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression));
                                  }
                          }
                      }
                      expr = finishNode(context, parser, sequencepos, {
                          type: 'SequenceExpression',
                          expressions,
                      });
                  }
                  expect(parser, context, 16);
                  if (parser.token === 10) {
                      if (state & 2) {
                          if (context & 4096)
                              cherow.tolerant(parser, context, 45);
                          parser.flags |= 2048;
                      }
                      else if (state & 4) {
                          if (context & 4096)
                              cherow.tolerant(parser, context, 48);
                          parser.flags |= 64;
                      }
                      else if (!(parser.flags & 2)) {
                          cherow.tolerant(parser, context, 75);
                      }
                      else if (parser.flags & 16384) {
                          cherow.tolerant(parser, context, 49);
                      }
                      else if (context & 131072 && parser.flags & 8192) {
                          cherow.tolerant(parser, context, 50);
                      }
                      parser.flags &= ~(2 | 8192 | 16384);
                      return (state & 1 ? expr.expressions : [expr]);
                  }
                  parser.flags &= ~(8192 | 16384 | 2);
                  if (!isValidSimpleAssignmentTarget(expr))
                      parser.flags &= ~4;
                  return expr;
              }
      }
  }
  function parseFunctionExpression(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 33566808);
      const isGenerator = consume(parser, context, 167774771) ? 1 : 0;
      let id = null;
      const { token } = parser;
      if (token & (65536 | 4096)) {
          if (token & 4194304) {
              if (context & 4096)
                  cherow.tolerant(parser, context, 45);
              parser.flags |= 2048;
          }
          if (parser.token & 1073741824 && isGenerator & 1) {
              cherow.tolerant(parser, context, 47);
          }
          id = parseBindingIdentifier(parser, context);
      }
      const { params, body } = swapContext(parser, context & ~(33554432 | 67108864), isGenerator, parseFormalListAndBody);
      return finishNode(context, parser, pos, {
          type: 'FunctionExpression',
          params,
          body,
          async: false,
          generator: !!(isGenerator & 1),
          expression: false,
          id,
      });
  }
  function parseAsyncFunctionOrAsyncGeneratorExpression(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 299116);
      expect(parser, context, 33566808);
      const isGenerator = consume(parser, context, 167774771) ? 1 : 0;
      const isAwait = 2;
      let id = null;
      const { token } = parser;
      if (token & (65536 | 4096)) {
          if (token & 4194304) {
              if (context & 4096 || isAwait & 2)
                  cherow.tolerant(parser, context, 45);
              parser.flags |= 1024;
          }
          if (token & 131072)
              cherow.tolerant(parser, context, 46);
          if (parser.token & 1073741824 && isGenerator & 1)
              cherow.tolerant(parser, context, 47);
          id = parseBindingIdentifier(parser, context);
      }
      const { params, body } = swapContext(parser, context & ~(33554432 | 67108864), isGenerator | isAwait, parseFormalListAndBody);
      return finishNode(context, parser, pos, {
          type: 'FunctionExpression',
          params,
          body,
          async: true,
          generator: !!(isGenerator & 1),
          expression: false,
          id,
      });
  }
  function parseComputedPropertyName(parser, context) {
      expect(parser, context, 41943059);
      const key = parseAssignmentExpression(parser, context | 65536);
      expect(parser, context, 20);
      return key;
  }
  function parsePropertyName(parser, context) {
      switch (parser.token) {
          case 33554434:
          case 33554435:
              return parseLiteral(parser, context);
          case 41943059:
              return parseComputedPropertyName(parser, context);
          default:
              return parseIdentifier(parser, context);
      }
  }
  function parseSpreadProperties(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 14);
      if (parser.token & 8388608)
          parser.flags &= ~4;
      const argument = parseAssignmentExpression(parser, context | 65536);
      return finishNode(context, parser, pos, {
          type: 'SpreadElement',
          argument,
      });
  }
  function parseObjectLiteral(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 41943052);
      const properties = [];
      while (parser.token !== 17301519) {
          properties.push(parser.token === 14 ?
              parseSpreadProperties(parser, context) :
              parsePropertyDefinition(parser, context));
          if (parser.token !== 17301519)
              expect(parser, context, 16777234);
      }
      expect(parser, context, 17301519);
      parser.flags &= ~512;
      return finishNode(context, parser, pos, {
          type: 'ObjectExpression',
          properties,
      });
  }
  function parsePropertyDefinition(parser, context) {
      const pos = getLocation(parser);
      const flags = parser.flags;
      let value;
      let state = consume(parser, context, 167774771) ? 2 | 32 : 32;
      const t = parser.token;
      let key = parsePropertyName(parser, context);
      if (!(parser.token & 16777216)) {
          if (flags & 32768) {
              cherow.tolerant(parser, context, 2);
          }
          else if (!(state & 2) && t & 262144 && !(parser.flags & 1)) {
              state |= consume(parser, context, 167774771) ? 2 | 1 : 1;
              key = parsePropertyName(parser, context);
          }
          else if (t === 36975) {
              state = state & ~32 | 4;
              key = parsePropertyName(parser, context);
          }
          else if (t === 36976) {
              state = state & ~32 | 8;
              key = parsePropertyName(parser, context);
          }
          if (state & (4 | 8)) {
              if (state & 2)
                  cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
          }
      }
      if (parser.token === 50331659) {
          value = parseMethodDeclaration(parser, context, state);
      }
      else {
          state &= ~32;
          if (parser.token === 16777237) {
              if ((state & (1 | 2))) {
                  cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
              }
              else if (t !== 41943059 && parser.tokenValue === '__proto__') {
                  if (parser.flags & 512) {
                      setPendingExpressionError(parser, 61);
                  }
                  else
                      parser.flags |= 512;
              }
              expect(parser, context, 16777237);
              if (parser.token & 131072)
                  parser.flags |= 8192;
              value = restoreExpressionCoverGrammar(parser, context, parseAssignmentExpression);
          }
          else {
              if ((state & (2 | 1)) || !isValidIdentifier(context, t)) {
                  cherow.tolerant(parser, context, 1, cherow.tokenDesc(t));
              }
              else if (context & (4096 | 262144) && t & 1073741824) {
                  setPendingError(parser);
                  parser.flags |= 16384;
              }
              state |= 64;
              if (parser.token === 83886109) {
                  setPendingExpressionError(parser, 89);
                  expect(parser, context, 83886109);
                  if (context & (4096 | 262144 | 131072) && parser.token & (1073741824 | 131072)) {
                      setPendingError(parser);
                      parser.flags |= parser.token & 1073741824 ? 16384 : 8192;
                  }
                  value = parseAssignmentPattern(parser, context, key, pos);
              }
              else {
                  if (t & 131072) {
                      if (context & 131072)
                          cherow.tolerant(parser, context, 44);
                      setPendingError(parser);
                      parser.flags |= 8192;
                  }
                  value = key;
              }
          }
      }
      return finishNode(context, parser, pos, {
          type: 'Property',
          key,
          value,
          kind: !(state & 4 | state & 8) ? 'init' : (state & 8) ? 'set' : 'get',
          computed: t === 41943059,
          method: !!(state & 32),
          shorthand: !!(state & 64),
      });
  }
  function parseMethodDeclaration(parser, context, state) {
      const pos = getLocation(parser);
      const isGenerator = state & 2 ? 1 : 0;
      const isAsync = state & 1 ? 2 : 0;
      const { params, body } = swapContext(parser, context | 33554432, isGenerator | isAsync, parseFormalListAndBody, state);
      return finishNode(context, parser, pos, {
          type: 'FunctionExpression',
          params,
          body,
          async: !!(state & 1),
          generator: !!(state & 2),
          expression: false,
          id: null,
      });
  }
  function parseArrowFunction(parser, context, pos, params) {
      parser.flags &= ~(4 | 2);
      if (parser.flags & 1)
          cherow.tolerant(parser, context, 34, '=>');
      expect(parser, context, 10);
      return parseArrowBody(parser, context & ~131072, params, pos, 0);
  }
  function parseAsyncArrowFunction(parser, context, state, pos, params) {
      parser.flags &= ~(4 | 2);
      if (parser.flags & 1)
          cherow.tolerant(parser, context, 34, 'async');
      expect(parser, context, 10);
      return parseArrowBody(parser, context | 131072, params, pos, state);
  }
  function parseArrowBody(parser, context, params, pos, state) {
      parser.pendingExpressionError = null;
      for (const i in params)
          reinterpret(parser, context | 524288, params[i]);
      const expression = parser.token !== 41943052;
      const body = expression ? parseExpressionCoverGrammar(parser, context & ~(262144 | 524288), parseAssignmentExpression) :
          swapContext(parser, context & ~(262144 | 1073741824) | 1048576, state, parseFunctionBody);
      return finishNode(context, parser, pos, {
          type: 'ArrowFunctionExpression',
          body,
          params,
          id: null,
          async: !!(state & 2),
          generator: false,
          expression,
      });
  }
  function parseFormalListAndBody(parser, context, state) {
      const paramList = parseFormalParameters(parser, context | 524288, state);
      const args = paramList.args;
      const params = paramList.params;
      const body = parseFunctionBody(parser, context & ~1073741824 | 1048576, args);
      return { params, body };
  }
  function parseFunctionBody(parser, context, params) {
      const pos = getLocation(parser);
      expect(parser, context | 536870912, 41943052);
      const body = [];
      while (parser.token === 33554435) {
          const { tokenRaw, tokenValue } = parser;
          body.push(parseDirective(parser, context));
          if (tokenRaw.length === 12 && tokenValue === 'use strict') {
              if (parser.flags & 8) {
                  cherow.tolerant(parser, context, 62);
              }
              else if (parser.flags & (64 | 1024)) {
                  cherow.tolerant(parser, context, 48);
              }
              else if (parser.flags & 2048) {
                  cherow.tolerant(parser, context, 45);
              }
              context |= 4096;
          }
      }
      if (context & 4096) {
          validateParams(parser, context, params);
      }
      const { labelSet } = parser;
      parser.labelSet = {};
      const savedFlags = parser.flags;
      parser.flags = parser.flags & ~(1024 | 2048 | 16 | 32) | 4;
      while (parser.token !== 17301519) {
          body.push(parseStatementListItem(parser, context));
      }
      if (savedFlags & 32)
          parser.flags |= 32;
      if (savedFlags & 16)
          parser.flags |= 16;
      parser.labelSet = labelSet;
      expect(parser, context, 17301519);
      return finishNode(context, parser, pos, {
          type: 'BlockStatement',
          body,
      });
  }
  function parseFormalParameters(parser, context, state) {
      expect(parser, context, 50331659);
      parser.flags &= ~(8 | 64);
      const args = [];
      const params = [];
      while (parser.token !== 16) {
          if (parser.token === 14) {
              if (state & 8)
                  cherow.tolerant(parser, context, 65);
              parser.flags |= 8;
              params.push(parseRestElement(parser, context, args));
              break;
          }
          params.push(parseFormalParameterList(parser, context, args));
          if (!consume(parser, context, 16777234))
              break;
          if (parser.token === 16)
              break;
      }
      if (state & 8 && params.length !== 1) {
          cherow.tolerant(parser, context, 64, 'Setter', 'one', '');
      }
      if (state & 4 && params.length > 0) {
          cherow.tolerant(parser, context, 64, 'Getter', 'no', 's');
      }
      expect(parser, context, 16);
      return { params, args };
  }
  function parseFormalParameterList(parser, context, args) {
      const pos = getLocation(parser);
      if (parser.token & (65536 | 4096)) {
          if (hasBit(parser.token, 20480)) {
              if (context & 4096)
                  cherow.tolerant(parser, context, 48);
              parser.flags |= 1024;
          }
          if (hasBit(parser.token, 4194304)) {
              if (context & 4096)
                  cherow.tolerant(parser, context, 45);
              parser.flags |= 2048;
          }
      }
      else {
          parser.flags |= 8;
      }
      const left = parseBindingIdentifierOrPattern(parser, context, args);
      if (!consume(parser, context, 83886109))
          return left;
      if (parser.token & (1073741824 | 131072) && context & (262144 | 131072)) {
          cherow.tolerant(parser, context, parser.token & 131072 ? 50 : 49);
      }
      parser.flags |= 8;
      return finishNode(context, parser, pos, {
          type: 'AssignmentPattern',
          left,
          right: parseExpressionCoverGrammar(parser, context, parseAssignmentExpression),
      });
  }
  function parseClassExpression(parser, context) {
      const pos = getLocation(parser);
      let decorators = [];
      if (context & 2048)
          decorators = parseDecorators(parser, context);
      expect(parser, context | 536870912, 33566797);
      const { token } = parser;
      let state = 0;
      let id = null;
      let superClass = null;
      if ((token !== 41943052 && token !== 12372)) {
          if (context & 131072 && token & 131072) {
              cherow.tolerant(parser, context, 46);
          }
          id = parseBindingIdentifier(parser, context | 4096);
      }
      if (consume(parser, context, 12372)) {
          superClass = parseLeftHandSideExpression(parser, context | 4096, pos);
          state |= 512;
      }
      const body = parseClassBodyAndElementList(parser, context | 4096, state);
      return finishNode(context, parser, pos, context & 2048 ? {
          type: 'ClassExpression',
          id,
          superClass,
          body,
          decorators
      } : {
          type: 'ClassExpression',
          id,
          superClass,
          body,
      });
  }
  function parseClassBodyAndElementList(parser, context, state) {
      const pos = getLocation(parser);
      expect(parser, context, 41943052);
      const body = [];
      let decorators = [];
      while (parser.token !== 17301519) {
          if (!consume(parser, context, 17301521)) {
              if (context & 2048) {
                  decorators = parseDecorators(parser, context);
                  if (parser.token === 17301519)
                      cherow.report(parser, 90);
                  if (decorators.length !== 0 && parser.tokenValue === 'constructor') {
                      cherow.report(parser, 91);
                  }
              }
              body.push(context & 1 && parser.token === 115
                  ? parsePrivateFields(parser, context, decorators)
                  : parseClassElement(parser, context, state, decorators));
          }
      }
      expect(parser, context, 17301519);
      return finishNode(context, parser, pos, {
          type: 'ClassBody',
          body,
      });
  }
  function parseClassElement(parser, context, state, decorators) {
      const pos = getLocation(parser);
      let { tokenValue, token } = parser;
      const flags = parser.flags;
      if (consume(parser, context, 167774771)) {
          state |= 2;
      }
      if (parser.token === 41943059)
          state |= 16;
      if (parser.tokenValue === 'constructor') {
          if (state & 2)
              cherow.tolerant(parser, context, 43, 'generator');
          else if (state & 512)
              context |= 67108864;
          state |= 256;
      }
      let key = parsePropertyName(parser, context);
      let value;
      if (!(parser.token & 16777216)) {
          if (flags & 32768)
              cherow.tolerant(parser, context, 2);
          if (token === 20585) {
              token = parser.token;
              if (consume(parser, context, 167774771))
                  state |= 2;
              tokenValue = parser.tokenValue;
              if (parser.token === 41943059)
                  state |= 16;
              if (parser.tokenValue === 'prototype')
                  cherow.tolerant(parser, context, 63);
              state |= 128;
              key = parsePropertyName(parser, context);
              if (context & 1 && isInstanceField(parser)) {
                  if (tokenValue === 'constructor')
                      cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
                  return parseFieldDefinition(parser, context, key, state, pos, decorators);
              }
          }
          if (parser.token !== 50331659) {
              if (token & 262144 && !(state & 2) && !(parser.flags & 1)) {
                  token = parser.token;
                  tokenValue = parser.tokenValue;
                  state |= 1;
                  if (consume(parser, context, 167774771))
                      state |= 2;
                  if (parser.token === 41943059)
                      state |= 16;
                  key = parsePropertyName(parser, context);
              }
              else if ((token === 36975 || token === 36976)) {
                  state |= token === 36975 ? 4 : 8;
                  tokenValue = parser.tokenValue;
                  if (parser.token === 41943059)
                      state |= 16;
                  key = parsePropertyName(parser, context);
              }
              if (tokenValue === 'prototype') {
                  cherow.tolerant(parser, context, 63);
              }
              else if (!(state & 128) && tokenValue === 'constructor') {
                  cherow.tolerant(parser, context, 43, 'accessor');
              }
          }
      }
      if (parser.token === 50331659) {
          value = parseMethodDeclaration(parser, context, state);
      }
      else {
          if (context & 1)
              return parseFieldDefinition(parser, context, key, state, pos, decorators);
          cherow.tolerant(parser, context, 1, cherow.tokenDesc(token));
      }
      const kind = (state & 256) ? 'constructor' : (state & 4) ? 'get' :
          (state & 8) ? 'set' : 'method';
      return finishNode(context, parser, pos, context & 2048 ? {
          type: 'MethodDefinition',
          kind,
          static: !!(state & 128),
          computed: !!(state & 16),
          key,
          value,
          decorators
      } : {
          type: 'MethodDefinition',
          kind,
          static: !!(state & 128),
          computed: !!(state & 16),
          key,
          value,
      });
  }
  function parseFieldDefinition(parser, context, key, state, pos, decorators) {
      if (state & 256)
          cherow.tolerant(parser, context, 0);
      let value = null;
      if (state & (1 | 2))
          cherow.tolerant(parser, context, 0);
      if (consume(parser, context, 83886109)) {
          if (parser.token & 4194304)
              cherow.tolerant(parser, context, 45);
          value = parseAssignmentExpression(parser, context);
      }
      consume(parser, context, 16777234);
      return finishNode(context, parser, pos, context & 2048 ? {
          type: 'FieldDefinition',
          key,
          value,
          computed: !!(state & 16),
          static: !!(state & 128),
          decorators
      } : {
          type: 'FieldDefinition',
          key,
          value,
          computed: !!(state & 16),
          static: !!(state & 128),
      });
  }
  function parsePrivateName(parser, context, pos) {
      const name = parser.tokenValue;
      nextToken(parser, context);
      return finishNode(context, parser, pos, {
          type: 'PrivateName',
          name,
      });
  }
  function parsePrivateFields(parser, context, decorators) {
      const pos = getLocation(parser);
      expect(parser, context | 32768, 115);
      if (parser.tokenValue === 'constructor')
          cherow.tolerant(parser, context, 39);
      const key = parsePrivateName(parser, context, pos);
      if (parser.token === 50331659)
          return parsePrivateMethod(parser, context, key, pos, decorators);
      let value = null;
      if (consume(parser, context, 83886109)) {
          if (parser.token & 4194304)
              cherow.tolerant(parser, context, 45);
          value = parseAssignmentExpression(parser, context);
      }
      consume(parser, context, 16777234);
      return finishNode(context, parser, pos, context & 2048 ? {
          type: 'FieldDefinition',
          key,
          value,
          computed: false,
          static: false,
          decorators
      } : {
          type: 'FieldDefinition',
          key,
          value,
          computed: false,
          static: false,
      });
  }
  function parsePrivateMethod(parser, context, key, pos, decorators) {
      const value = parseMethodDeclaration(parser, context | 4096, 0);
      parser.flags &= ~(4 | 2);
      return finishNode(context, parser, pos, context & 2048 ? {
          type: 'MethodDefinition',
          kind: 'method',
          static: false,
          computed: false,
          key,
          value,
          decorators
      } : {
          type: 'MethodDefinition',
          kind: 'method',
          static: false,
          computed: false,
          key,
          value,
      });
  }
  function parseCallImportOrMetaProperty(parser, context) {
      const pos = getLocation(parser);
      const id = parseIdentifier(parser, context);
      if (consume(parser, context, 16777229)) {
          if (context & 8192 && parser.tokenValue === 'meta')
              return parseMetaProperty(parser, context, id, pos);
          cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
      }
      let expr = parseImportExpression(parser, context, pos);
      expect(parser, context, 50331659);
      const args = parseExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression);
      expect(parser, context, 16);
      expr = finishNode(context, parser, pos, {
          type: 'CallExpression',
          callee: expr,
          arguments: [args],
      });
      return expr;
  }
  function parseImportExpression(parser, context, pos) {
      return finishNode(context, parser, pos, {
          type: 'Import',
      });
  }
  function parseMetaProperty(parser, context, meta, pos) {
      return finishNode(context, parser, pos, {
          meta,
          type: 'MetaProperty',
          property: parseIdentifier(parser, context),
      });
  }
  function parseNewExpressionOrMetaProperty(parser, context) {
      const pos = getLocation(parser);
      const id = parseIdentifier(parser, context);
      if (consume(parser, context, 16777229)) {
          if (parser.tokenValue !== 'target' ||
              !(context & (524288 | 1048576)))
              cherow.tolerant(parser, context, 51);
          return parseMetaProperty(parser, context, id, pos);
      }
      return finishNode(context, parser, pos, {
          type: 'NewExpression',
          callee: parseImportOrMemberExpression(parser, context, pos),
          arguments: parser.token === 50331659 ? parseArgumentList(parser, context) : [],
      });
  }
  function parseImportOrMemberExpression(parser, context, pos) {
      const { token } = parser;
      if (context & 1 && token === 33566810) {
          if (lookahead(parser, context, nextTokenIsLeftParen))
              cherow.tolerant(parser, context, 1, cherow.tokenDesc(token));
          return parseCallImportOrMetaProperty(parser, context);
      }
      return parseMemberExpression(parser, context, pos);
  }
  function parseSuperProperty(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 33566813);
      switch (parser.token) {
          case 50331659:
              if (!(context & 67108864))
                  cherow.tolerant(parser, context, 52);
              break;
          case 41943059:
          case 16777229:
              if (!(context & 33554432))
                  cherow.tolerant(parser, context, 53);
              break;
          default:
              cherow.tolerant(parser, context, 54);
      }
      return finishNode(context, parser, pos, {
          type: 'Super',
      });
  }
  function parseTemplateLiteral(parser, context) {
      const pos = getLocation(parser);
      return finishNode(context, parser, pos, {
          type: 'TemplateLiteral',
          expressions: [],
          quasis: [parseTemplateSpans(parser, context)],
      });
  }
  function parseTemplateHead(parser, context, cooked = null, raw, pos) {
      parser.token = cherow.Scanner.consumeTemplateBrace(parser, context);
      return finishNode(context, parser, pos, {
          type: 'TemplateElement',
          value: {
              cooked,
              raw,
          },
          tail: false,
      });
  }
  function parseTemplate(parser, context, expressions = [], quasis = []) {
      const pos = getLocation(parser);
      const { tokenValue, tokenRaw } = parser;
      expect(parser, context, 33554440);
      expressions.push(parseExpression(parser, context));
      const t = getLocation(parser);
      quasis.push(parseTemplateHead(parser, context, tokenValue, tokenRaw, pos));
      if (parser.token === 33554441) {
          quasis.push(parseTemplateSpans(parser, context, t));
      }
      else {
          parseTemplate(parser, context, expressions, quasis);
      }
      return finishNode(context, parser, pos, {
          type: 'TemplateLiteral',
          expressions,
          quasis,
      });
  }
  function parseTemplateSpans(parser, context, pos = getLocation(parser)) {
      const { tokenValue, tokenRaw } = parser;
      expect(parser, context, 33554441);
      return finishNode(context, parser, pos, {
          type: 'TemplateElement',
          value: {
              cooked: tokenValue,
              raw: tokenRaw,
          },
          tail: true,
      });
  }
  function parseDecoratorList(parser, context) {
      const pos = getLocation(parser);
      return finishNode(context, parser, pos, {
          type: 'Decorator',
          expression: parseLeftHandSideExpression(parser, context, pos)
      });
  }
  function parseDecorators(parser, context) {
      const decoratorList = [];
      while (consume(parser, context, 120)) {
          decoratorList.push(parseDecoratorList(parser, context | 1073741824));
      }
      return decoratorList;
  }

  function parseMappedTypeParameter(parser, context) {
      const pos = cherow.getLocation(parser);
      const name = parseIdentifier(parser, context);
      cherow.expect(parser, context, 168834865);
      const constraint = parseType(parser, context);
      return cherow.finishNode(context, parser, pos, {
          type: 'TypeParameter',
          name
      });
  }
  function parseIntersectionType(parser, context) {
      const pos = cherow.getLocation(parser);
      const tsType = parseTypeOperator(parser, context);
      if (parser.token !== 167773508)
          return tsType;
      const types = [tsType];
      while (cherow.consume(parser, context, 167773508)) {
          types.push(parseTypeOperator(parser, context));
      }
      return cherow.finishNode(context, parser, pos, {
          type: 'TSIntersectionType',
          types
      });
  }
  function parseTypeParameter(parser, context) {
      const pos = cherow.getLocation(parser);
      const { tokenValue: name } = parser;
      cherow.nextToken(parser, context);
      cherow.consume(parser, context, 83886109);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSTypeParameter',
          name,
          constraint: cherow.consume(parser, context, 12372) ? parseType(parser, context) : null,
          default: cherow.consume(parser, context, 83886109) ? parseType(parser, context) : null
      });
  }
  function parseTypeParameters(parser, context) {
      const params = [];
      if (parser.token !== 167774015)
          return params;
      const pos = cherow.getLocation(parser);
      if (parser.token === 167774015 || parser.token === 25) {
          cherow.nextToken(parser, context);
      }
      else {
          cherow.report(parser, 0);
      }
      while (!cherow.consume(parser, context, 167774016)) {
          params.push(parseTypeParameter(parser, context));
      }
      return cherow.finishNode(context, parser, pos, {
          type: 'TSTypeParameterDeclaration',
          params
      });
  }
  function parseFunctionType(parser, context) {
      const pos = cherow.getLocation(parser);
      const typeParameters = parseTypeParameters(parser, context);
      cherow.expect(parser, context, 50331659);
      const parameters = [];
      while (parser.token !== 16) {
          parameters.push(parser.token === 14
              ? parseRestElement(parser, context)
              : parseBindingIdentifier(parser, context));
          cherow.consume(parser, context, 16777234);
      }
      cherow.expect(parser, context, 16);
      let typeAnnotation = null;
      if (parser.token === 10) {
          typeAnnotation = parseTypeOrTypePredicateAnnotation(parser, context, 10);
      }
      return cherow.finishNode(context, parser, pos, {
          type: 'TSFunctionType',
          typeParameters,
          parameters,
          typeAnnotation
      });
  }
  function parseTypeOrTypePredicateAnnotation(parser, context, token) {
      cherow.expect(parser, context, token);
      const typePredicateVariable = parser.token & 65536 && (parser.token === 16777237 ? parseTypeAnnotation(parser, context) : false);
      return parseTypeAnnotation(parser, context, false);
  }
  function parseConstructorType(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 33566811);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSConstructorType'
      });
  }
  function parseType(parser, context) {
      if (isStartOfFunctionType(parser, context)) {
          return parseFunctionType(parser, context);
      }
      else if (cherow.consume(parser, context, 33566811)) {
          return parseConstructorType(parser, context);
      }
      return parseUnionType(parser, context);
  }
  function parseUnionType(parser, context) {
      const pos = cherow.getLocation(parser);
      const tsType = parseIntersectionType(parser, context);
      if (parser.token !== 167772997)
          return tsType;
      const types = [tsType];
      while (cherow.consume(parser, context, 167772997)) {
          types.push(parseIntersectionType(parser, context));
      }
      return cherow.finishNode(context, parser, pos, {
          type: 'TSUnionType',
          types
      });
  }
  function parseMappedType(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 41943052);
      const readonly = cherow.consume(parser, context, 65659);
      cherow.expect(parser, context, 41943059);
      const typeParameter = parseMappedTypeParameter(parser, context);
      cherow.expect(parser, context, 20);
      const optional = cherow.consume(parser, context, 22);
      let typeAnnotation;
      if (cherow.consume(parser, context, 16777237))
          typeAnnotation = parseType(parser, context);
      cherow.consumeSemicolon(parser, context);
      cherow.expect(parser, context, 17301519);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSMappedType',
          readonly,
          typeParameter,
          optional,
          typeAnnotation
      });
  }
  function parseIdentifierTypedNode(parser, context) {
      const pos = cherow.getLocation(parser);
      const tsType = keywordTypeFromName(parser.tokenValue);
      if (tsType) {
          cherow.expect(parser, context, 33619969);
          return cherow.finishNode(context, parser, pos, {
              type: keywordTypeFromName(parser.tokenValue)
          });
      }
      return parseTypeReference(parser, context);
  }
  function parseEntityName(parser, context) {
      const pos = cherow.getLocation(parser);
      let entity = parseIdentifier(parser, context);
      while (cherow.consume(parser, context, 16777229)) {
          entity = cherow.finishNode(context, parser, pos, {
              type: 'TSQualifiedName',
              left: entity,
              right: parseIdentifier(parser, context)
          });
      }
      return entity;
  }
  function parseTypeArguments(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 167774015);
      const params = [];
      while (parser.token !== 167774016) {
          params.push(parseType(parser, context));
      }
      cherow.expect(parser, context, 167774016);
      return cherow.finishNode(context, parser, pos, {
          type: 'TypeParameterInstantiation',
          params
      });
  }
  function parseTypeReference(parser, context) {
      const pos = cherow.getLocation(parser);
      const typeName = parseEntityName(parser, context);
      let typeParameters = [];
      if (!(parser.flags & 1) && parser.token === 167774015) {
          typeParameters = parseTypeArguments(parser, context);
      }
      return cherow.finishNode(context, parser, pos, {
          type: 'TSTypeReference',
          typeName,
          typeParameters
      });
  }
  function parseNullTypedNode(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 33566727);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSNullKeyword'
      });
  }
  function parseSubtractTypeNode(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 436209968);
      if (parser.token !== 33554434)
          cherow.report(parser, 0);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSLiteralType',
          literal: cherow.Parser.parseLiteral(parser, context)
      });
  }
  function parseThisTypeNode(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 33566815);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSThisType',
          literal: cherow.Parser.parseLiteral(parser, context)
      });
  }
  function parseThisTypePredicate(parser, context, parameterName) {
      const pos = cherow.getLocation(parser);
      cherow.nextToken(parser, context);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSTypePredicate',
          parameterName,
          typeAnnotation: parseTypeAnnotation(parser, context, false)
      });
  }
  function parseTypeAnnotation(parser, context, consumeColon = true) {
      const pos = cherow.getLocation(parser);
      if (consumeColon)
          cherow.expect(parser, context, 16777237);
      return cherow.finishNode(context, parser, pos, {
          type: 'TypeAnnotation',
          typeAnnotation: parseType(parser, context)
      });
  }
  function parseVoidTypedNode(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 302002220);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSVoidKeyword'
      });
  }
  function parseLiteralTypedNode(parser, context) {
      const pos = cherow.getLocation(parser);
      let literal;
      switch (parser.token) {
          case 33554435:
          case 33554434:
              literal = cherow.Parser.parseLiteral(parser, context);
              break;
          case 33566726:
              literal = {
                  type: 'Literal',
                  value: true
              };
              cherow.nextToken(parser, context);
              break;
          case 33566725:
              literal = {
                  type: 'Literal',
                  value: false
              };
              cherow.nextToken(parser, context);
              break;
          default:
              cherow.report(parser, 0);
      }
      return cherow.finishNode(context, parser, pos, {
          type: 'TSLiteralType',
          literal
      });
  }
  function parseNonArrayType(parser, context) {
      switch (parser.token) {
          case 33619969:
              return parseIdentifierTypedNode(parser, context);
          case 302002220:
              return parseVoidTypedNode(parser, context);
          case 33566727:
              return parseNullTypedNode(parser, context);
          case 33554435:
          case 33554434:
          case 33566726:
          case 33566725:
              return parseLiteralTypedNode(parser, context);
          case 436209968:
              return parseSubtractTypeNode(parser, context);
          case 33566815:
              const thisType = parseThisTypeNode(parser, context);
              switch (parser.token) {
                  case 65660:
                      if (!(parser.flags & 1))
                          return parseThisTypePredicate(parser, context, thisType);
                  default:
                      return thisType;
              }
          case 302002218:
              return parseTypeQuery(parser, context);
          case 41943052:
              return lookahead(parser, context, iStartOfMappedType)
                  ? parseMappedType(parser, context)
                  : parseTypeLiteral(parser, context);
          case 41943059:
              return parseTupleType(parser, context);
          case 50331659:
              return parseParenthesizedType(parser, context);
          default:
              cherow.report(parser, 0);
      }
  }
  function parseParenthesizedType(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 50331659);
      const typeAnnotation = parseType(parser, context);
      cherow.expect(parser, context, 16);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSParenthesizedType',
          typeAnnotation
      });
  }
  function parseTupleType(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 41943059);
      const elementTypes = [parseType(parser, context)];
      while (cherow.consume(parser, context, 16777234)) {
          elementTypes.push(parseType(parser, context));
      }
      cherow.expect(parser, context, 20);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSTupleType',
          elementTypes
      });
  }
  function parseTypeLiteral(parser, context) {
      const pos = cherow.getLocation(parser);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSTypeLiteral',
          members: parseObjectTypeMembers(parser, context)
      });
  }
  function parseTypeQuery(parser, context) {
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 65658);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSTypeQuery',
          exprName: parseEntityName(parser, context)
      });
  }
  function parseIndexSignature(parser, context) {
      if (!(parser.token === 41943059 && lookahead(parser, context, isUnambiguouslyIndexSignature))) {
          return undefined;
      }
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 41943059);
      const id = parseIdentifier(parser, context);
      const typeAnnotation = parseTypeAnnotation(parser, context, true);
      cherow.expect(parser, context, 20);
      const type = parser.token === 16777237 ? parseTypeAnnotation(parser, context, true) : null;
      if (parser.token !== 16777234)
          cherow.consumeSemicolon(parser, context);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSIndexSignature',
          typeAnnotation: type,
          parameters: [id]
      });
  }
  function parsePropertyOrMethodSignature(parser, context, readonly) {
      const pos = cherow.getLocation(parser);
      const key = cherow.Parser.parsePropertyName(parser, context);
      const option = cherow.consume(parser, context, 22);
      if (!readonly && (parser.token === 50331659 || parser.token === 167774015)) {
          if (parser.token !== 16777234)
              cherow.consumeSemicolon(parser, context);
          return cherow.finishNode(context, parser, pos, {
              type: 'TSMethodSignature',
              readonly
          });
      }
      else {
          const typeAnnotation = parseTypeAnnotation(parser, context);
          if (parser.token === 17301521)
              cherow.consumeSemicolon(parser, context);
          return cherow.finishNode(context, parser, pos, {
              type: 'TSPropertySignature',
              readonly,
              typeAnnotation
          });
      }
  }
  function parseTypeMember(parser, context) {
      if (parser.token === 50331659 || parser.token === 167774015) ;
      const readonly = false;
      const idx = parseIndexSignature(parser, context);
      if (idx)
          return idx;
      return parsePropertyOrMethodSignature(parser, context, readonly);
  }
  function parseObjectTypeMembers(parser, context) {
      const members = [];
      cherow.expect(parser, context, 41943052);
      while (parser.token !== 17301519) {
          members.push(parseTypeMember(parser, context));
      }
      cherow.expect(parser, context, 17301519);
      return members;
  }
  function parseArrayType(parser, context) {
      const pos = cherow.getLocation(parser);
      let elementType = parseNonArrayType(parser, context);
      while (!(parser.flags & 1) && cherow.consume(parser, context, 41943059)) {
          if (cherow.consume(parser, context, 20)) {
              elementType = cherow.finishNode(context, parser, pos, {
                  type: 'TSArrayType',
                  elementType
              });
          }
          else {
              const indexType = parseType(parser, context);
              cherow.expect(parser, context, 20);
              elementType = cherow.finishNode(context, parser, pos, {
                  type: 'TSIndexedAccessType',
                  elementType,
                  indexType
              });
          }
      }
      return elementType;
  }
  function parseTypeOperator(parser, context) {
      if (parser.token !== 65658) {
          return parseArrayType(parser, context);
      }
      const pos = cherow.getLocation(parser);
      cherow.expect(parser, context, 65658);
      return cherow.finishNode(context, parser, pos, {
          type: 'TSTypeOperator',
          operator: cherow.tokenDesc(65658),
          typeAnnotation: parseTypeOperator(parser, context)
      });
  }

  function parseBindingIdentifierOrPattern(parser, context, args = []) {
      const { token } = parser;
      if (token & 8388608) {
          return token === 41943052 ?
              parserObjectAssignmentPattern(parser, context) :
              parseArrayAssignmentPattern(parser, context, args);
      }
      else if (token & (131072 | 1073741824)) {
          if (token & 131072 && (context & (131072 | 8192))) {
              cherow.tolerant(parser, context, 46);
          }
          else if (token & 1073741824 && (context & (262144 | 4096))) {
              cherow.tolerant(parser, context, 47);
          }
      }
      args.push(parser.tokenValue);
      return parseBindingIdentifier(parser, context);
  }
  function parseBindingIdentifier(parser, context) {
      const { token } = parser;
      if (token & 4194304) {
          if (context & 4096)
              cherow.tolerant(parser, context, 15);
          parser.flags |= 2048;
      }
      else if (context & 4194304 && token === 33574984) {
          cherow.tolerant(parser, context, 25);
      }
      else if (hasBit(token, 20480)) {
          if (context & 4096)
              cherow.tolerant(parser, context, 1, cherow.tokenDesc(token));
          parser.flags |= 1024;
      }
      else if (!isValidIdentifier(context, token)) {
          cherow.tolerant(parser, context, 1, cherow.tokenDesc(token));
      }
      const pos = getLocation(parser);
      const name = parser.tokenValue;
      nextToken(parser, context);
      return finishNode(context, parser, pos, {
          type: 'Identifier',
          name,
          typeAnnotation: parser.token === 16777237 ? parseTypeAnnotation(parser, context) : null
      });
  }
  function parseAssignmentRestElement(parser, context, args) {
      const pos = getLocation(parser);
      expect(parser, context, 14);
      const argument = parseBindingIdentifierOrPattern(parser, context, args);
      if (parser.token === 16777234)
          cherow.tolerant(parser, context, 86);
      return finishNode(context, parser, pos, {
          type: 'RestElement',
          argument,
      });
  }
  function assignmentRestProperty(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 14);
      const { token } = parser;
      const argument = parseBindingIdentifierOrPattern(parser, context);
      if (hasBit(token, 8388608))
          cherow.tolerant(parser, context, 92);
      if (parser.token === 16777234)
          cherow.tolerant(parser, context, 86);
      return finishNode(context, parser, pos, {
          type: 'RestElement',
          argument,
      });
  }
  function parseArrayAssignmentPattern(parser, context, args) {
      const pos = getLocation(parser);
      expect(parser, context, 41943059);
      const elements = [];
      while (parser.token !== 20) {
          if (consume(parser, context, 16777234)) {
              elements.push(null);
          }
          else {
              if (parser.token === 14) {
                  elements.push(parseAssignmentRestElement(parser, context, args));
                  break;
              }
              else {
                  elements.push(parseExpressionCoverGrammar(parser, context | 65536, parseBindingInitializer));
              }
              if (parser.token !== 20)
                  expect(parser, context, 16777234);
          }
      }
      expect(parser, context, 20);
      return finishNode(context, parser, pos, {
          type: 'ArrayPattern',
          elements,
      });
  }
  function parserObjectAssignmentPattern(parser, context) {
      const pos = getLocation(parser);
      const properties = [];
      expect(parser, context, 41943052);
      while (parser.token !== 17301519) {
          if (parser.token === 14) {
              properties.push(assignmentRestProperty(parser, context));
              break;
          }
          properties.push(parseAssignmentProperty(parser, context));
          if (parser.token !== 17301519)
              expect(parser, context, 16777234);
      }
      expect(parser, context, 17301519);
      return finishNode(context, parser, pos, {
          type: 'ObjectPattern',
          properties,
      });
  }
  function parseAssignmentPattern(parser, context, left, pos) {
      return finishNode(context, parser, pos, {
          type: 'AssignmentPattern',
          left,
          right: parseExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression),
      });
  }
  function parseBindingInitializer(parser, context) {
      const pos = getLocation(parser);
      const left = parseBindingIdentifierOrPattern(parser, context);
      return !consume(parser, context, 83886109) ?
          left :
          finishNode(context, parser, pos, {
              type: 'AssignmentPattern',
              left,
              right: parseAssignmentExpression(parser, context | 65536),
          });
  }
  function parseAssignmentProperty(parser, context) {
      const pos = getLocation(parser);
      const { token } = parser;
      let key;
      let value;
      let computed = false;
      let shorthand = false;
      if (token & (65536 | 4096)) {
          key = parseIdentifier(parser, context);
          shorthand = !consume(parser, context, 16777237);
          if (shorthand) {
              const hasInitializer = consume(parser, context, 83886109);
              if (context & 262144 && token & 1073741824)
                  cherow.tolerant(parser, context, 47);
              if (!isValidIdentifier(context, token))
                  cherow.tolerant(parser, context, 44);
              value = hasInitializer ? parseAssignmentPattern(parser, context, key, pos) : key;
          }
          else
              value = parseBindingInitializer(parser, context);
      }
      else {
          computed = token === 41943059;
          key = parsePropertyName(parser, context);
          expect(parser, context, 16777237);
          value = parseExpressionCoverGrammar(parser, context, parseBindingInitializer);
      }
      return finishNode(context, parser, pos, {
          type: 'Property',
          kind: 'init',
          key,
          computed,
          value,
          method: false,
          shorthand,
      });
  }

  function parseClassDeclaration(parser, context) {
      const pos = getLocation(parser);
      let decorators = [];
      if (context & 2048)
          decorators = parseDecorators(parser, context);
      expect(parser, context | 536870912, 33566797);
      const id = (context & 16777216 && (parser.token !== 33619969))
          ? null :
          parseBindingIdentifier(parser, context | 4096 | 536870912);
      let state = 0;
      let superClass = null;
      if (consume(parser, context, 12372)) {
          superClass = parseLeftHandSideExpression(parser, context | 4096, pos);
          state |= 512;
      }
      const body = parseClassBodyAndElementList(parser, context & ~16777216 | 4096 | 32768, state);
      return finishNode(context, parser, pos, context & 2048 ? {
          type: 'ClassDeclaration',
          id,
          superClass,
          body,
          decorators
      } : {
          type: 'ClassDeclaration',
          id,
          superClass,
          body
      });
  }
  function parseFunctionDeclaration(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 33566808);
      let isGenerator = 0;
      if (consume(parser, context, 167774771)) {
          if (context & 2097152 && !(context & 1048576)) {
              cherow.tolerant(parser, context, 20);
          }
          isGenerator = 1;
      }
      return parseFunctionDeclarationBody(parser, context, isGenerator, pos);
  }
  function parseFunctionDeclarationBody(parser, context, state, pos) {
      const id = parseFunctionDeclarationName(parser, context);
      const { params, body } = swapContext(parser, context & ~(33554432 | 67108864 | 16777216), state, parseFormalListAndBody);
      return finishNode(context, parser, pos, {
          type: 'FunctionDeclaration',
          params,
          body,
          async: !!(state & 2),
          generator: !!(state & 1),
          expression: false,
          id,
      });
  }
  function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 299116);
      expect(parser, context, 33566808);
      const isAwait = 2;
      const isGenerator = consume(parser, context, 167774771) ? 1 : 0;
      return parseFunctionDeclarationBody(parser, context, isGenerator | isAwait, pos);
  }
  function parseFunctionDeclarationName(parser, context) {
      const { token } = parser;
      let id = null;
      if (context & 262144 && token & 1073741824)
          cherow.tolerant(parser, context, 47);
      if (context & 131072 && token & 131072)
          cherow.tolerant(parser, context, 46);
      if (token !== 50331659) {
          id = parseBindingIdentifier(parser, context);
      }
      else if (!(context & 16777216))
          cherow.tolerant(parser, context, 37);
      return id;
  }
  function parseVariableDeclaration(parser, context, isConst) {
      const pos = getLocation(parser);
      const isBindingPattern = (parser.token & 8388608) !== 0;
      const id = parseBindingIdentifierOrPattern(parser, context);
      let init = null;
      if (consume(parser, context | 536870912, 83886109)) {
          init = parseExpressionCoverGrammar(parser, context & ~(4194304 | 8388608), parseAssignmentExpression);
          if (parser.token & 1048576 && (context & 8388608 || isBindingPattern)) {
              if (parser.token === 168834865) {
                  if (context & (4194304 | 4096 | 131072) || isBindingPattern) {
                      cherow.tolerant(parser, context, 23, cherow.tokenDesc(parser.token));
                  }
              }
              else
                  cherow.tolerant(parser, context, 23, cherow.tokenDesc(parser.token));
          }
      }
      else if (!(parser.token & 1048576) && (isConst || isBindingPattern)) {
          cherow.tolerant(parser, context, 22, isConst ? 'const' : 'destructuring');
      }
      return finishNode(context, parser, pos, {
          type: 'VariableDeclarator',
          init,
          id,
      });
  }
  function parseVariableDeclarationList(parser, context, isConst) {
      const list = [parseVariableDeclaration(parser, context, isConst)];
      while (consume(parser, context, 16777234))
          list.push(parseVariableDeclaration(parser, context, isConst));
      if (context & 8388608 && parser.token & 1048576 && list.length !== 1) {
          cherow.tolerant(parser, context, 24, cherow.tokenDesc(parser.token));
      }
      return list;
  }

  function parseModuleItemList(parser, context) {
      nextToken(parser, context);
      const statements = [];
      while (parser.token !== 524288) {
          statements.push(parser.token === 33554435 ?
              parseDirective(parser, context) :
              parseModuleItem(parser, context | 65536));
      }
      return statements;
  }
  function parseModuleItem(parser, context) {
      switch (parser.token) {
          case 120:
              return parseDecorators(parser, context);
          case 12371:
              return parseExportDeclaration(parser, context);
          case 33566810:
              if (!(context & 1 && lookahead(parser, context, nextTokenIsLeftParenOrPeriod))) {
                  return parseImportDeclaration(parser, context);
              }
          default:
              return parseStatementListItem(parser, context);
      }
  }
  function parseExportDeclaration(parser, context) {
      const pos = getLocation(parser);
      const specifiers = [];
      let source = null;
      let declaration = null;
      expect(parser, context | 536870912, 12371);
      switch (parser.token) {
          case 167774771:
              return parseExportAllDeclaration(parser, context, pos);
          case 12368:
              return parseExportDefault(parser, context, pos);
          case 41943052:
              {
                  expect(parser, context, 41943052);
                  let hasReservedWord = false;
                  while (parser.token !== 17301519) {
                      if (parser.token & 12288) {
                          hasReservedWord = true;
                          setPendingError(parser);
                      }
                      specifiers.push(parseNamedExportDeclaration(parser, context));
                      if (parser.token !== 17301519)
                          expect(parser, context, 16777234);
                  }
                  expect(parser, context | 536870912, 17301519);
                  if (parser.token === 36977) {
                      source = parseModuleSpecifier(parser, context);
                  }
                  else if (hasReservedWord) {
                      cherow.tolerant(parser, context, 44);
                  }
                  consumeSemicolon(parser, context);
                  break;
              }
          case 33566797:
              declaration = (parseClassDeclaration(parser, context));
              break;
          case 33574984:
          case 33566793:
              declaration = parseVariableStatement(parser, context | 4194304);
              break;
          case 33566791:
              declaration = parseVariableStatement(parser, context);
              break;
          case 33566808:
              declaration = parseFunctionDeclaration(parser, context);
              break;
          case 299116:
              if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
                  declaration = parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context);
                  break;
              }
          default:
              cherow.report(parser, 1, cherow.tokenDesc(parser.token));
      }
      return finishNode(context, parser, pos, {
          type: 'ExportNamedDeclaration',
          source,
          specifiers,
          declaration,
      });
  }
  function parseExportAllDeclaration(parser, context, pos) {
      expect(parser, context, 167774771);
      const source = parseModuleSpecifier(parser, context);
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'ExportAllDeclaration',
          source,
      });
  }
  function parseNamedExportDeclaration(parser, context) {
      const pos = getLocation(parser);
      const local = parseIdentifierName(parser, context | 536870912, parser.token);
      const exported = consume(parser, context, 36971)
          ? parseIdentifierName(parser, context, parser.token)
          : local;
      return finishNode(context, parser, pos, {
          type: 'ExportSpecifier',
          local,
          exported,
      });
  }
  function parseExportDefault(parser, context, pos) {
      expect(parser, context | 536870912, 12368);
      let declaration;
      switch (parser.token) {
          case 33566808:
              declaration = parseFunctionDeclaration(parser, context | 16777216);
              break;
          case 120:
          case 33566797:
              declaration = parseClassDeclaration(parser, context & ~65536 | 16777216);
              break;
          case 299116:
              declaration = parseAsyncFunctionOrAssignmentExpression(parser, context | 16777216);
              break;
          default:
              {
                  declaration = parseAssignmentExpression(parser, context | 65536);
                  consumeSemicolon(parser, context);
              }
      }
      return finishNode(context, parser, pos, {
          type: 'ExportDefaultDeclaration',
          declaration,
      });
  }
  function parseImportDeclaration(parser, context) {
      const pos = getLocation(parser);
      expect(parser, context, 33566810);
      let source;
      let specifiers = [];
      if (parser.token === 33554435) {
          source = parseLiteral(parser, context);
      }
      else {
          specifiers = parseImportClause(parser, context | 536870912);
          source = parseModuleSpecifier(parser, context);
      }
      consumeSemicolon(parser, context);
      return finishNode(context, parser, pos, {
          type: 'ImportDeclaration',
          specifiers,
          source,
      });
  }
  function parseImportClause(parser, context) {
      const specifiers = [];
      switch (parser.token) {
          case 33619969:
              {
                  specifiers.push(parseImportDefaultSpecifier(parser, context));
                  if (consume(parser, context, 16777234)) {
                      switch (parser.token) {
                          case 167774771:
                              parseImportNamespaceSpecifier(parser, context, specifiers);
                              break;
                          case 41943052:
                              parseNamedImports(parser, context, specifiers);
                              break;
                          default:
                              cherow.tolerant(parser, context, 1, cherow.tokenDesc(parser.token));
                      }
                  }
                  break;
              }
          case 41943052:
              parseNamedImports(parser, context, specifiers);
              break;
          case 167774771:
              parseImportNamespaceSpecifier(parser, context, specifiers);
              break;
          default:
              cherow.report(parser, 1, cherow.tokenDesc(parser.token));
      }
      return specifiers;
  }
  function parseNamedImports(parser, context, specifiers) {
      expect(parser, context, 41943052);
      while (parser.token !== 17301519) {
          specifiers.push(parseImportSpecifier(parser, context));
          if (parser.token !== 17301519) {
              expect(parser, context, 16777234);
          }
      }
      expect(parser, context, 17301519);
  }
  function parseImportSpecifier(parser, context) {
      const pos = getLocation(parser);
      const { token } = parser;
      const imported = parseIdentifierName(parser, context | 536870912, token);
      let local;
      if (parser.token === 36971) {
          expect(parser, context, 36971);
          local = parseBindingIdentifier(parser, context);
      }
      else {
          if (hasBit(token, 12288))
              cherow.tolerant(parser, context, 44);
          if (hasBit(token, 4194304))
              cherow.tolerant(parser, context, 45);
          local = imported;
      }
      return finishNode(context, parser, pos, {
          type: 'ImportSpecifier',
          local,
          imported,
      });
  }
  function parseImportNamespaceSpecifier(parser, context, specifiers) {
      const pos = getLocation(parser);
      expect(parser, context, 167774771);
      expect(parser, context, 36971, 80);
      const local = parseBindingIdentifier(parser, context);
      specifiers.push(finishNode(context, parser, pos, {
          type: 'ImportNamespaceSpecifier',
          local,
      }));
  }
  function parseModuleSpecifier(parser, context) {
      expect(parser, context, 36977);
      if (parser.token !== 33554435)
          cherow.report(parser, 1, cherow.tokenDesc(parser.token));
      return parseLiteral(parser, context);
  }
  function parseImportDefaultSpecifier(parser, context) {
      return finishNode(context, parser, getLocation(parser), {
          type: 'ImportDefaultSpecifier',
          local: parseIdentifier(parser, context),
      });
  }
  function parseAsyncFunctionOrAssignmentExpression(parser, context) {
      return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
          parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context | 16777216) :
          parseAssignmentExpression(parser, context | 65536);
  }

  function createParser(source, sourceFile) {
      return {
          source,
          length: source.length,
          index: 0,
          line: 1,
          column: 0,
          startIndex: 0,
          startColumn: 0,
          startLine: 1,
          lastIndex: 0,
          lastColumn: 0,
          lastLine: 0,
          pendingExpressionError: undefined,
          flags: 4,
          token: 524288,
          tokenRaw: '',
          lastValue: 0,
          comments: [],
          sourceFile,
          tokenRegExp: undefined,
          tokenValue: undefined,
          labelSet: undefined,
          errorLocation: undefined,
          errors: [],
      };
  }
  function parse(source, options, context) {
      let sourceFile = '';
      if (!!options) {
          if (options.next)
              context |= 1;
          if (options.jsx)
              context |= 4;
          if (options.ranges)
              context |= 2;
          if (options.loc)
              context |= 16;
          if (options.raw)
              context |= 8;
          if (options.rawIdentifier)
              context |= 256;
          if (options.globalReturn)
              context |= 32;
          if (options.skipShebang)
              context |= 128;
          if (options.tolerant)
              context |= 512;
          if (!!options.source)
              sourceFile = options.source;
          if (!!options.comments)
              context |= 64;
          if (options.impliedStrict)
              context |= 4096;
          if (options.experimental)
              context |= 2048;
          if (options.node)
              context |= 1024;
      }
      const parser = createParser(source, sourceFile);
      const body = context & 8192
          ? parseModuleItemList(parser, context)
          : parseStatementList(parser, context);
      const node = {
          type: 'Program',
          sourceType: context & 8192 ? 'module' : 'script',
          body: body,
      };
      if (context & 2) {
          node.start = 0;
          node.end = source.length;
      }
      if (context & 16) {
          node.loc = {
              start: {
                  line: 1,
                  column: 0,
              },
              end: {
                  line: parser.line,
                  column: parser.column,
              },
          };
          if (sourceFile)
              node.loc.source = sourceFile;
      }
      if (context & 64)
          node.comments = parser.comments;
      if (context & 512)
          node.errors = parser.errors;
      return node;
  }
  function parseStatementList(parser, context) {
      const statements = [];
      nextToken(parser, context | 536870912);
      while (parser.token === 33554435) {
          if (!(context & 4096) && parser.tokenRaw.length === 12 && parser.tokenValue === 'use strict') {
              context |= 4096;
          }
          statements.push(parseDirective(parser, context));
      }
      while (parser.token !== 524288) {
          statements.push(parseStatementListItem(parser, context));
      }
      return statements;
  }

  function parseTS(source, options) {
      return options && options.module
          ? parse(source, options, 4096 | 8192)
          : parse(source, options, 0);
  }

  exports.parseTS = parseTS;

  Object.defineProperty(exports, '__esModule', { value: true });

});
