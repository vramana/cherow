System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports('parseScript', parseScript);
      exports('parseModule', parseModule);
      exports('constructError', constructError);
      exports('report', report);
      exports('tolerant', tolerant);
      exports('tokenDesc', tokenDesc);
      exports('descKeyword', descKeyword);
      exports('isValidIdentifierPart', isValidIdentifierPart);
      exports('isValidIdentifierStart', isValidIdentifierStart);
      exports('mustEscape', mustEscape);
      exports('validateBreakOrContinueLabel', validateBreakOrContinueLabel);
      exports('addLabel', addLabel);
      exports('popLabel', popLabel);
      exports('hasLabel', hasLabel);
      exports('finishNode', finishNode);
      exports('expect', expect);
      exports('consume', consume);
      exports('nextToken', nextToken);
      exports('consumeSemicolon', consumeSemicolon);
      exports('parseExpressionCoverGrammar', parseExpressionCoverGrammar);
      exports('restoreExpressionCoverGrammar', restoreExpressionCoverGrammar);
      exports('swapContext', swapContext);
      exports('validateParams', validateParams);
      exports('lookahead', lookahead);
      exports('isValidSimpleAssignmentTarget', isValidSimpleAssignmentTarget);
      exports('getLocation', getLocation);
      exports('isValidIdentifier', isValidIdentifier);
      exports('isLexical', isLexical);
      exports('isEndOfCaseOrDefaultClauses', isEndOfCaseOrDefaultClauses);
      exports('nextTokenIsLeftParenOrPeriod', nextTokenIsLeftParenOrPeriod);
      exports('nextTokenisIdentifierOrParen', nextTokenisIdentifierOrParen);
      exports('nextTokenIsLeftParen', nextTokenIsLeftParen);
      exports('nextTokenIsFuncKeywordOnSameLine', nextTokenIsFuncKeywordOnSameLine);
      exports('isPropertyWithPrivateFieldKey', isPropertyWithPrivateFieldKey);
      exports('parseAndValidateIdentifier', parseAndValidateIdentifier);
      exports('nameIsArgumentsOrEval', nameIsArgumentsOrEval);
      exports('setPendingError', setPendingError);
      exports('isEqualTagNames', isEqualTagNames);
      exports('isInstanceField', isInstanceField);
      exports('validateUpdateExpression', validateUpdateExpression);
      exports('setPendingExpressionError', setPendingExpressionError);
      exports('validateCoverParenthesizedExpression', validateCoverParenthesizedExpression);
      exports('validateAsyncArgumentList', validateAsyncArgumentList);
      const KeywordDescTable = [
          'end of source',
          'identifier', 'number', 'string', 'regular expression',
          'false', 'true', 'null',
          'template continuation', 'template end',
          '=>', '(', '{', '.', '...', '}', ')', ';', ',', '[', ']', ':', '?', '\'', '"', '</', '/>',
          '++', '--',
          '=', '<<=', '>>=', '>>>=', '**=', '+=', '-=', '*=', '/=', '%=', '^=', '|=',
          '&=',
          'typeof', 'delete', 'void', '!', '~', '+', '-', 'in', 'instanceof', '*', '%', '/', '**', '&&',
          '||', '===', '!==', '==', '!=', '<=', '>=', '<', '>', '<<', '>>', '>>>', '&', '|', '^',
          'var', 'let', 'const',
          'break', 'case', 'catch', 'class', 'continue', 'debugger', 'default', 'do', 'else', 'export',
          'extends', 'finally', 'for', 'function', 'if', 'import', 'new', 'return', 'super', 'switch',
          'this', 'throw', 'try', 'while', 'with',
          'implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'yield',
          'as', 'async', 'await', 'constructor', 'get', 'set', 'from', 'of',
          '#',
          'eval', 'arguments', 'enum', 'BigInt', '@', 'JSXText',
          'KeyOf', 'ReadOnly', 'is'
      ];
      function tokenDesc(token) {
          return KeywordDescTable[token & 255];
      }
      const DescKeywordTable = Object.create(null, {
          this: { value: 33566815 },
          function: { value: 33566808 },
          if: { value: 12377 },
          return: { value: 12380 },
          var: { value: 33566791 },
          else: { value: 12370 },
          for: { value: 12374 },
          new: { value: 33566811 },
          in: { value: 168834865 },
          typeof: { value: 302002218 },
          while: { value: 12402 },
          case: { value: 12363 },
          break: { value: 12362 },
          try: { value: 12385 },
          catch: { value: 12364 },
          delete: { value: 302002219 },
          throw: { value: 302002272 },
          switch: { value: 33566814 },
          continue: { value: 12366 },
          default: { value: 12368 },
          instanceof: { value: 167786290 },
          do: { value: 12369 },
          void: { value: 302002220 },
          finally: { value: 12373 },
          arguments: { value: 37814389 },
          keyof: { value: 65658 },
          readonly: { value: 65659 },
          is: { value: 65660 },
          as: { value: 36971 },
          async: { value: 299116 },
          await: { value: 33788013 },
          class: { value: 33566797 },
          const: { value: 33566793 },
          constructor: { value: 36974 },
          debugger: { value: 12367 },
          enum: { value: 12406 },
          eval: { value: 37814388 },
          export: { value: 12371 },
          extends: { value: 12372 },
          false: { value: 33566725 },
          from: { value: 36977 },
          get: { value: 36975 },
          implements: { value: 20579 },
          import: { value: 33566810 },
          interface: { value: 20580 },
          let: { value: 33574984 },
          null: { value: 33566727 },
          of: { value: 1085554 },
          package: { value: 20581 },
          private: { value: 20582 },
          protected: { value: 20583 },
          public: { value: 20584 },
          set: { value: 36976 },
          static: { value: 20585 },
          super: { value: 33566813 },
          true: { value: 33566726 },
          with: { value: 12387 },
          yield: { value: 1107316842 },
      });
      function descKeyword(value) {
          return (DescKeywordTable[value] | 0);
      }

      const ErrorMessages = exports('ErrorMessages', {
          [0]: 'Unexpected token',
          [1]: 'Unexpected token \'%0\'',
          [2]: 'Keyword must not contain escaped characters',
          [3]: 'Keyword \'%0\' is reserved',
          [4]: 'Invalid left-hand side in assignment',
          [5]: 'Unterminated string literal',
          [6]: 'Unterminated regular expression literal',
          [7]: 'Unterminated MultiLineComment',
          [8]: 'Unterminated template literal',
          [9]: 'Invalid character \'%0\'',
          [10]: 'Octal escapes are not allowed in strict mode',
          [11]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
          [12]: 'Unicode escape code point out of range',
          [13]: 'Duplicate regular expression flag \'%0\'',
          [14]: 'Unexpected regular expression flag \'%0\'',
          [15]: 'Eval or arguments can\'t be assigned to in strict mode code',
          [16]: 'Illegal return statement',
          [17]: 'In strict mode code, functions can only be declared at top level or inside a block',
          [18]: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
          [19]: '%0 can\'t appear in single-statement context',
          [20]: 'Generators can only be declared at the top level or inside a block',
          [21]: '\'for await\' loop should be used with \'of\'',
          [22]: 'Missing initializer in %0 declaration',
          [23]: '\'for-%0\' loop variable declaration may not have an initializer',
          [24]: 'Invalid left-hand side in for-%0 loop: Must have a single binding.',
          [25]: 'let is disallowed as a lexically bound name',
          [26]: 'Lexical declaration cannot appear in a single-statement context',
          [27]: 'Label \'%0\' has already been declared',
          [28]: '%0  statement must be nested within an iteration statement',
          [29]: 'Illegal continue statement: \'%0\' does not denote an iteration statement',
          [30]: 'Undefined label \'%0\'',
          [31]: 'More than one default clause in switch statement',
          [32]: '%0 declarations may only appear at top level of a module',
          [33]: 'Async functions can only be declared at the top level or inside a block',
          [34]: 'No line break is allowed after \'%0\'',
          [35]: 'Strict mode code may not include a with statement',
          [36]: 'Await is only valid in async functions',
          [37]: 'Function declaration must have a name in this context',
          [38]: '\'%0\' may not be used as an identifier in this context',
          [41]: 'Delete of an unqualified identifier in strict mode',
          [42]: 'Private fields can not be deleted',
          [39]: 'Classes may not have a private field named \'#constructor\'',
          [40]: 'Classes may not have a field named \'constructor\'',
          [43]: 'Class constructor may not be a \'%0\'',
          [44]: 'Unexpected reserved word',
          [45]: 'Unexpected eval or arguments in strict mode',
          [46]: '\'await\' is not a valid identifier inside an async function',
          [47]: '\'yield\' is not a valid identifier inside an generator function',
          [48]: 'Unexpected strict mode reserved word',
          [50]: 'Await expression not allowed in formal parameter',
          [49]: 'Yield expression not allowed in formal parameter',
          [51]: 'new.target only allowed within functions',
          [52]: 'super() is not allowed in this context',
          [53]: 'Member access from super not allowed in this context',
          [54]: 'Only "(" or "." or "[" are allowed after \'super\'',
          [55]: '\'yield\' is a reserved keyword within generator function bodies',
          [56]: 'Only one underscore is allowed as numeric separator',
          [57]: 'Numeric separators are not allowed at the end of numeric literals',
          [58]: 'Numeric separator can not be used after leading 0.',
          [59]: 'Legacy octal literals are not allowed in strict mode',
          [60]: 'Invalid left-hand side in assignment',
          [61]: 'Property name __proto__ appears more than once in object literal',
          [62]: 'Illegal \'use strict\' directive in function with non-simple parameter list',
          [63]: 'Classes may not have a static property named \'prototype\'',
          [64]: '%0 functions must have %1 argument%2',
          [65]: 'Setter function argument must not be a rest parameter',
          [66]: '%0 increment/decrement may not have eval or arguments operand in strict mode',
          [67]: 'Elision not allowed in object property list',
          [68]: 'Rest element must be last element',
          [70]: 'Spread element must be last element',
          [69]: 'Rest parameter may not have a default initializer',
          [71]: 'Invalid destructuring assignment target',
          [72]: 'Unexpected surrogate pair',
          [73]: 'Malformed %0 character escape sequence',
          [74]: 'Template literals may not contain octal escape sequences',
          [75]: 'Invalid binding pattern',
          [76]: 'Rest parameter must be last formal parameter',
          [77]: 'Missing catch or finally after try',
          [78]: 'Illegal newline after throw',
          [79]: 'Duplicate parameter name not allowed in this context',
          [80]: 'Missing keyword \'as\' after import *',
          [81]: 'Labels must be followed by a \':\'',
          [82]: 'JSX attributes must only be assigned a non-empty  \'expression\'',
          [83]: 'Expected corresponding JSX closing tag for %0',
          [84]: 'Adjacent JSX elements must be wrapped in an enclosing tag',
          [85]: 'Invalid JSX attribute value',
          [86]: 'Rest element may not have a trailing comma',
          [87]: 'Undefined Unicode code-point',
          [88]: 'HTML comments are not allowed in modules',
          [89]: 'Invalid shorthand property initializer',
          [90]: 'Trailing decorator may be followed by method',
          [91]: 'Decorators can\'t be used with a constructor',
          [92]: '`...` must be followed by an identifier in declaration contexts',
      });
      function constructError(parser, context, index, line, column, description) {
          const error = new SyntaxError(`Line ${line}, column ${column}: ${description}`);
          error.index = index;
          error.line = line;
          error.column = column;
          error.description = description;
          if (context & 512) {
              parser.errors.push(error);
          }
          else
              throw error;
      }
      function getErrorLocation(parser) {
          let { index, startLine: line, startColumn: column } = parser;
          const errorLoc = parser.errorLocation;
          if (!!errorLoc) {
              index = errorLoc.index;
              line = errorLoc.line;
              column = errorLoc.column;
          }
          return { index, line, column };
      }
      function report(parser, type, ...params) {
          const { index, line, column } = getErrorLocation(parser);
          const errorMessage = ErrorMessages[type].replace(/%(\d+)/g, (_, i) => params[i]);
          constructError(parser, 0, index, line, column, errorMessage);
      }
      function tolerant(parser, context, type, ...params) {
          const { index, line, column } = getErrorLocation(parser);
          const errorMessage = ErrorMessages[type].replace(/%(\d+)/g, (_, i) => params[i]);
          constructError(parser, context, index, line, column, errorMessage);
      }

      const CharacterType = exports('CharacterType', [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          16,
          48,
          16,
          16,
          48,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          16,
          0,
          0,
          0,
          3,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          7,
          7,
          7,
          7,
          7,
          7,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          0,
          0,
          0,
          0,
          3,
          0,
          7,
          7,
          7,
          7,
          7,
          7,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          3,
          0,
          0,
          0,
          0,
          0,
      ]);

      function isValidIdentifierPart(code) {
          const bit = code & 31;
          return (convert[(code >>> 5) + 0] >>> bit & 1) !== 0;
      }
      function isValidIdentifierStart(code) {
          const bit = code & 31;
          return (convert[(code >>> 5) + 34816] >>> bit & 1) !== 0;
      }
      function mustEscape(code) {
          const bit = code & 31;
          return (convert[(code >>> 5) + 69632] >>> bit & 1) !== 0;
      }
      const convert = ((compressed, lookup) => {
          const result = new Uint32Array(104448);
          let index = 0;
          let subIndex = 0;
          while (index < 3293) {
              const inst = compressed[index++];
              if (inst < 0) {
                  subIndex -= inst;
              }
              else {
                  let code = compressed[index++];
                  if (inst & 2)
                      code = lookup[code];
                  if (inst & 1) {
                      result.fill(code, subIndex, subIndex += compressed[index++]);
                  }
                  else {
                      result[subIndex++] = code;
                  }
              }
          }
          return result;
      })([-1, 2, 28, 2, 29, 2, 5, -1, 0, 77595648, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 55, 2, 56, 2, 4, 0, 4294836479, 0, 3221225471, 0, 4294901942, 2, 57, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 17, 2, 0, 0, 4294961151, 3, 0, 2, 2, 20, 2, 0, 2, 59, 2, 0, 2, 125, 2, 6, 2, 19, -1, 2, 60, 2, 148, 2, 1, 3, 0, 3, 0, 4294901711, 2, 37, 0, 4089839103, 0, 2961209759, 0, 268697551, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2965387679, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 2, 167, 2, 3, 0, 3825204735, 0, 123747807, 0, 65487, 2, 3, 0, 4092591615, 0, 1080049119, 0, 458703, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247020, 2, 64, 0, 4284449919, 0, 851904, 2, 4, 2, 16, 0, 67076095, -1, 2, 65, 0, 1006628014, 0, 4093591391, -1, 0, 50331649, 0, 3265266687, 2, 34, 0, 4294844415, 0, 4278190047, 2, 22, 2, 124, -1, 3, 0, 2, 2, 33, 2, 0, 2, 10, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 0, 3892314111, 0, 261632, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 2088959, 2, 31, 2, 8, 0, 909311, 3, 0, 2, 0, 814743551, 2, 39, 0, 67057664, 3, 0, 2, 2, 9, 2, 0, 2, 32, 2, 0, 2, 18, 2, 7, 0, 268374015, 2, 30, 2, 46, 2, 0, 2, 73, 0, 134153215, -1, 2, 6, 2, 0, 2, 7, 0, 2684354559, 0, 67044351, 0, 1073676416, -2, 3, 0, 2, 2, 40, 0, 1046528, 3, 0, 3, 2, 8, 2, 0, 2, 9, 0, 4294960127, 2, 10, 2, 13, -1, 0, 4294377472, 2, 25, 3, 0, 7, 0, 4227858431, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -1, 2, 121, 0, 1048577, 2, 79, 2, 12, -1, 2, 12, 0, 131042, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 1046559, 2, 0, 2, 14, 2, 0, 0, 2147516671, 2, 23, 3, 83, 2, 2, 0, -16, 2, 84, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 2, 117, 2, 0, 0, 3220242431, 3, 0, 3, 2, 20, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 2, 0, 2, 26, 2, 0, 2, 8, 3, 0, 2, 0, 67043391, 0, 687865855, 2, 0, 2, 24, 2, 8, 2, 22, 3, 0, 2, 0, 67076097, 2, 7, 2, 0, 2, 23, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 3774349439, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, 2, 27, 0, 1638399, 2, 165, 2, 102, 3, 0, 3, 2, 22, 2, 28, 2, 29, 2, 5, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -3, 2, 144, -4, 2, 22, 2, 0, 2, 107, 0, 1, 2, 0, 2, 58, 2, 32, 2, 16, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 33, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277137519, 0, 2265972735, -1, 3, 22, 2, -1, 2, 34, 2, 36, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 3, 0, 2, 2, 36, 0, 2147549120, 2, 0, 2, 16, 2, 17, 2, 128, 2, 0, 2, 48, 2, 17, 0, 5242879, 3, 0, 2, 0, 402594847, -1, 2, 116, 0, 1090519039, -2, 2, 118, 2, 119, 2, 0, 2, 38, 2, 37, 2, 2, 0, 3766565279, 0, 2039759, -4, 3, 0, 2, 2, 38, -1, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 9, 2, 39, -1, 0, 3825205247, 2, 40, -11, 3, 0, 2, 0, 2147484671, -8, 2, 0, 2, 7, 0, 4294901888, 2, 0, 0, 67108815, -1, 2, 0, 2, 45, -8, 2, 50, 2, 41, 0, 67043329, 2, 122, 2, 42, 0, 8388351, -2, 2, 123, 0, 3028287487, 0, 67043583, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, 2, 39, -2, 2, 17, 2, 46, 2, 0, 2, 23, 0, 67043343, 2, 126, 2, 27, -27, 3, 0, 2, 0, 4294901791, 2, 7, 2, 187, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 0, 1677656575, -166, 0, 4161266656, 0, 4071, 0, 15360, -4, 0, 28, -13, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 85, 2, 0, 0, 2105343, 0, 4160749584, 2, 194, -42, 0, 4194303871, 0, 2011, -62, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 38, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -22583, 3, 0, 7, 2, 27, -6130, 3, 5, 2, -1, 0, 69207040, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 55, 2, 56, 2, 4, 2, 26, -1, 2, 17, 2, 57, -1, 2, 0, 2, 19, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 27, 2, 58, 3, 0, 2, 0, 131135, 2, 91, 0, 70256639, 2, 59, 0, 272, 2, 45, 2, 19, -1, 2, 60, -2, 2, 93, 0, 603979775, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 61, 2, 62, 0, 33554435, 2, 120, 2, 61, 2, 145, 0, 131075, 0, 3594373096, 0, 67094296, 2, 62, -1, 2, 63, 0, 603979263, 2, 153, 0, 3, 0, 4294828001, 0, 602930687, 2, 175, 0, 393219, 2, 63, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 64, 2, 36, -1, 2, 4, 0, 917503, 2, 36, -1, 2, 65, 0, 537783470, 0, 4026531935, -1, 0, 1, -1, 2, 34, 2, 47, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 2, 16, -1, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 253951, 3, 20, 2, 0, 122879, 2, 0, 2, 8, 0, 276824064, -2, 3, 0, 2, 2, 9, 2, 0, 0, 4294903295, 2, 0, 2, 18, 2, 7, -1, 2, 17, 2, 46, 2, 0, 2, 73, 2, 39, -1, 2, 23, 2, 0, 2, 31, -2, 0, 128, -2, 2, 74, 2, 8, 0, 4064, -1, 2, 115, 0, 4227907585, 2, 0, 2, 191, 2, 0, 2, 44, 0, 4227915776, 2, 10, 2, 13, -2, 0, 6544896, 3, 0, 6, -2, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -3, 2, 79, 2, 12, -3, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 817183, 2, 0, 2, 14, 2, 0, 0, 33023, 2, 23, 3, 83, 2, -17, 2, 84, 0, 524157950, 2, 4, 2, 0, 2, 85, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 0, 3072, 2, 0, 0, 2147516415, 2, 10, 3, 0, 2, 2, 27, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 0, 4294965179, 0, 7, 2, 0, 2, 8, 2, 88, 2, 8, -1, 0, 687603712, 2, 91, 2, 92, 2, 36, 2, 22, 2, 93, 2, 35, 2, 159, 0, 2080440287, 2, 0, 2, 13, 2, 136, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 7, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 2700607615, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, -3, 2, 102, 3, 0, 3, 2, 22, -1, 3, 5, 2, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -8, 2, 22, 2, 0, 2, 107, -1, 2, 0, 2, 58, 2, 32, 2, 18, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 17, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277075969, 2, 8, -1, 3, 22, 2, -1, 2, 34, 2, 137, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 2, 115, 2, 9, -2, 2, 115, 2, 27, 2, 17, 2, 13, 2, 115, 2, 36, 2, 17, 0, 4718591, 2, 115, 2, 35, 0, 335544350, -1, 2, 116, 2, 117, -2, 2, 118, 2, 119, 2, 7, -1, 2, 120, 2, 61, 0, 3758161920, 0, 3, -4, 2, 0, 2, 31, 2, 170, -1, 2, 0, 2, 27, 0, 176, -5, 2, 0, 2, 43, 2, 177, -1, 2, 0, 2, 27, 2, 189, -1, 2, 0, 2, 19, -2, 2, 25, -12, 3, 0, 2, 2, 121, -8, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 975, -1, 2, 0, 2, 45, -8, 2, 50, 2, 43, 0, 1, 2, 122, 2, 27, -3, 2, 123, 2, 107, 2, 124, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, -3, 2, 17, 2, 125, 2, 0, 2, 27, 2, 44, 2, 126, 2, 27, -27, 3, 0, 2, 0, 65567, -1, 2, 100, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 2, 128, -187, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 2, 136, -129, 3, 0, 6, 2, 137, -1, 3, 0, 2, 2, 44, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -28719, 2, 0, 0, 1, -1, 2, 121, 2, 0, 0, 8193, -21, 0, 50331648, 0, 10255, 0, 4, -11, 2, 62, 2, 163, 0, 1, 0, 71936, -1, 2, 154, 0, 4292933632, 0, 805306431, -5, 2, 144, -1, 2, 172, -1, 0, 6144, -2, 2, 122, -1, 2, 164, -1, 2, 150, 2, 145, 2, 158, 2, 0, 0, 3223322624, 2, 8, 0, 4, -4, 2, 183, 0, 205128192, 0, 1333757536, 0, 3221225520, 0, 423953, 0, 747766272, 0, 2717763192, 0, 4290773055, 0, 278545, 2, 146, 0, 4294886464, 0, 33292336, 0, 417809, 2, 146, 0, 1329579616, 0, 4278190128, 0, 700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 147, 0, 469762560, 0, 4171219488, 0, 16711728, 2, 147, 0, 202375680, 0, 3214918176, 0, 4294508592, 2, 147, -1, 0, 983584, 0, 48, 0, 58720275, 0, 3489923072, 0, 10517376, 0, 4293066815, 0, 1, 0, 2013265920, 2, 171, 2, 0, 0, 17816169, 0, 3288339281, 0, 201375904, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2, 144, 0, 4160757760, 2, 0, -6, 2, 160, -11, 0, 3263218176, -1, 0, 49664, 0, 2160197632, 0, 8388802, -1, 0, 12713984, -1, 0, 402653184, 2, 152, 2, 155, -2, 2, 156, -20, 0, 3758096385, -2, 2, 185, 0, 4292878336, 2, 21, 2, 148, 0, 4294057984, -2, 2, 157, 2, 149, 2, 168, -2, 2, 166, -1, 2, 174, -1, 2, 162, 2, 121, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 151, 0, 939588608, -1, 0, 805306368, -1, 2, 121, 0, 1610612736, 2, 149, 2, 150, 3, 0, 2, -2, 2, 151, 2, 152, -3, 0, 267386880, -1, 2, 153, 0, 7168, -1, 2, 180, 2, 0, 2, 154, 2, 155, -7, 2, 161, -8, 2, 156, -1, 0, 1426112704, 2, 157, -1, 2, 181, 0, 271581216, 0, 2149777408, 2, 27, 2, 154, 2, 121, 0, 851967, 0, 3758129152, -1, 2, 27, 2, 173, -4, 2, 151, -20, 2, 188, 2, 158, -56, 0, 3145728, 2, 179, 2, 184, 0, 4294443520, 2, 73, -1, 2, 159, 2, 121, -4, 0, 32505856, -1, 2, 160, -1, 0, 2147385088, 2, 21, 1, 2155905152, 2, -3, 2, 91, 2, 0, 2, 161, -2, 2, 148, -6, 2, 162, 0, 4026597375, 0, 1, -1, 0, 1, -1, 2, 163, -3, 2, 137, 2, 190, -2, 2, 159, 2, 164, -1, 2, 169, 2, 121, -6, 2, 121, -213, 2, 162, -657, 2, 158, -36, 2, 165, -1, 0, 65408, -10, 2, 193, -5, 2, 166, -5, 0, 4278222848, 2, 0, 2, 23, -1, 0, 4227919872, -1, 2, 166, -2, 0, 4227874752, 2, 157, -2, 0, 2146435072, 2, 152, -2, 0, 1006649344, 2, 121, -1, 2, 21, 0, 201375744, -3, 0, 134217720, 2, 21, 0, 4286677377, 0, 32896, -1, 2, 167, -3, 2, 168, -349, 2, 169, 2, 170, 2, 171, 3, 0, 264, -11, 2, 172, -2, 2, 155, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524284, -11, 2, 27, -1, 2, 178, -1, 2, 176, 0, 3221291007, 2, 155, -1, 0, 524288, 0, 2158720, -3, 2, 152, 0, 1, -4, 2, 121, 0, 3808625411, 0, 3489628288, 0, 4096, 0, 1207959680, 0, 3221274624, 2, 0, -3, 2, 164, 0, 120, 0, 7340032, -2, 0, 4026564608, 2, 4, 2, 27, 2, 157, 3, 0, 4, 2, 152, -1, 2, 173, 2, 171, -1, 0, 8176, 2, 174, 2, 164, 2, 175, -1, 0, 4290773232, 2, 0, -4, 2, 157, 2, 182, 0, 15728640, 2, 171, -1, 2, 154, -1, 0, 4294934512, 3, 0, 4, -9, 2, 21, 2, 162, 2, 176, 3, 0, 4, 0, 704, 0, 1849688064, 0, 4194304, -1, 2, 121, 0, 4294901887, 2, 0, 0, 130547712, 0, 1879048192, 0, 2080374784, 3, 0, 2, -1, 2, 177, 2, 178, -1, 0, 17829776, 0, 2028994560, 0, 4261478144, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 179, 0, 16252928, 0, 3791388672, 2, 119, 3, 0, 2, -2, 2, 180, 2, 0, -1, 2, 100, -1, 0, 66584576, 3, 0, 11, 2, 121, 3, 0, 12, -2, 0, 245760, 0, 2147418112, -1, 2, 144, 2, 195, 0, 4227923456, -1, 2, 181, 2, 169, 2, 21, -2, 2, 172, 0, 4292870145, 0, 262144, 2, 121, 3, 0, 2, 0, 1073758848, 2, 182, -1, 0, 4227921920, 2, 183, 2, 146, 0, 528402016, 0, 4292927536, 3, 0, 4, -2, 0, 3556769792, 2, 0, -2, 2, 186, 3, 0, 5, -1, 2, 179, 2, 157, 2, 0, -2, 0, 4227923936, 2, 58, -1, 2, 166, 2, 91, 2, 0, 2, 184, 2, 151, 3, 0, 11, -2, 0, 2146959360, 3, 0, 8, -2, 2, 154, -1, 0, 536870960, 2, 115, -1, 2, 185, 3, 0, 8, 0, 512, 0, 8388608, 2, 167, 2, 165, 2, 178, 0, 4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 186, 3, 0, 21, -28, 2, 155, 3, 0, 3, -3, 0, 4292902912, -6, 2, 93, 3, 0, 85, -33, 2, 187, 3, 0, 126, -18, 2, 188, 3, 0, 269, -17, 2, 185, 2, 121, 0, 4294917120, 3, 0, 2, 2, 27, 0, 4290822144, -2, 0, 67174336, 0, 520093700, 2, 17, 3, 0, 27, -2, 0, 65504, 2, 121, 2, 43, 3, 0, 2, 2, 88, -191, 2, 58, -23, 2, 100, 3, 0, 296, -8, 2, 121, 3, 0, 2, 2, 27, -11, 2, 171, 3, 0, 72, -3, 0, 3758159872, 0, 201391616, 3, 0, 155, -7, 2, 162, -1, 0, 384, -1, 0, 133693440, -3, 2, 180, -2, 2, 30, 3, 0, 5, -2, 2, 21, 2, 122, 3, 0, 4, -2, 2, 181, -1, 2, 144, 0, 335552923, 2, 189, -1, 0, 538974272, 0, 2214592512, 0, 132000, -10, 0, 192, -8, 0, 12288, -21, 0, 134213632, 0, 4294901761, 3, 0, 42, 0, 100663424, 0, 4294965284, 3, 0, 62, -6, 0, 4286578784, 2, 0, -2, 0, 1006696448, 3, 0, 37, 2, 189, 0, 4110942569, 0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 42, 3, 0, 8, -1, 2, 151, -2, 2, 148, 2, 190, 0, 65537, 2, 162, 2, 165, 2, 159, -1, 2, 151, -1, 2, 58, 2, 0, 2, 191, 0, 65528, 2, 171, 0, 4294770176, 2, 30, 3, 0, 4, -30, 2, 192, 0, 4261470208, -3, 2, 148, -2, 2, 192, 2, 0, 2, 151, -1, 2, 186, -1, 2, 154, 0, 4294950912, 3, 0, 2, 2, 151, 2, 121, 2, 165, 2, 193, 2, 166, 2, 0, 2, 194, 2, 188, 3, 0, 48, -1334, 2, 21, 2, 0, -129, 2, 192, -6, 2, 157, -180, 2, 195, -233, 2, 4, 3, 0, 96, -16, 2, 157, 3, 0, 22583, -7, 2, 17, 3, 0, 6128], [4294967295, 4294967291, 4092460543, 4294828015, 4294967294, 134217726, 268435455, 2147483647, 1048575, 16777215, 1073741823, 1061158911, 536805376, 511, 4294910143, 4160749567, 134217727, 4294901760, 4194303, 2047, 262143, 4286578688, 536870911, 8388607, 4294918143, 67108863, 255, 65535, 67043328, 2281701374, 4294967232, 2097151, 4294903807, 4294902783, 4294967039, 524287, 127, 4294549487, 67045375, 1023, 67047423, 4286578687, 4294770687, 32767, 15, 33554431, 2047999, 8191, 4292870143, 4294934527, 4294966783, 4294967279, 262083, 20511, 4290772991, 4294901759, 41943039, 460799, 4294959104, 71303167, 1071644671, 602799615, 65536, 4294828000, 805044223, 4277151126, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 4294967264, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294868991, 4294909951, 4294967292, 4294965759, 16744447, 4294966272, 4294901823, 4294967280, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 4294443008, 268369920, 4292804608, 486341884, 4294963199, 3087007615, 1073692671, 131071, 4128527, 4279238655, 4294902015, 4294966591, 2445279231, 3670015, 3238002687, 4294967288, 4294705151, 4095, 3221208447, 4294902271, 4294549472, 2147483648, 4294705152, 4294966143, 64, 16383, 3774873592, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4087, 31, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 536870912, 2952790016, 202506752, 139280, 4293918720, 4227922944, 2147532800, 61440, 3758096384, 117440512, 65280, 4227858432, 3233808384, 3221225472, 4294965248, 32768, 57152, 67108864, 4290772992, 25165824, 4160749568, 57344, 4278190080, 65472, 4227907584, 65520, 1920, 4026531840, 49152, 4294836224, 63488, 1073741824, 4294967040, 251658240, 196608, 12582912, 4294966784, 2097152, 64512, 417808, 469762048, 4261412864, 4227923712, 4294934528, 4294967168, 16, 98304, 63, 4292870144, 4294963200, 65534, 65532]);

      function nextUnicodeChar(parser) {
          const { index } = parser;
          const hi = parser.source.charCodeAt(index);
          if (hi < 55296 || hi > 56319)
              return hi;
          const lo = parser.source.charCodeAt(index + 1);
          if (lo < 56320 || lo > 57343)
              return hi;
          return 65536 + ((hi & 0x3FF) << 10) | lo & 0x3FF;
      }
      const isIdentifierPart = (code) => (CharacterType[code] & 1) !== 0 || isValidIdentifierPart(code);
      function escapeForPrinting(code) {
          switch (code) {
              case 0:
                  return '\\0';
              case 8:
                  return '\\b';
              case 9:
                  return '\\t';
              case 10:
                  return '\\n';
              case 11:
                  return '\\v';
              case 12:
                  return '\\f';
              case 13:
                  return '\\r';
              default:
                  if (!mustEscape(code))
                      return fromCodePoint(code);
                  if (code < 0x10)
                      return `\\x0${code.toString(16)}`;
                  if (code < 0x100)
                      return `\\x${code.toString(16)}`;
                  if (code < 0x1000)
                      return `\\u0${code.toString(16)}`;
                  if (code < 0x10000)
                      return `\\u${code.toString(16)}`;
                  return `\\u{${code.toString(16)}}`;
          }
      }
      function consumeOpt(parser, code) {
          if (parser.source.charCodeAt(parser.index) !== code)
              return false;
          parser.index++;
          parser.column++;
          return true;
      }
      function consumeLineFeed(parser, state) {
          parser.flags |= 1;
          parser.index++;
          if ((state & 2) === 0) {
              parser.column = 0;
              parser.line++;
          }
      }
      function scanPrivateName(parser, context) {
          if (!(context & 32768) || !isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
              report(parser, 1, tokenDesc(parser.token));
          }
          return 115;
      }
      function advanceNewline(parser) {
          parser.flags |= 1;
          parser.index++;
          parser.column = 0;
          parser.line++;
      }
      const fromCodePoint = (code) => {
          return code <= 0xFFFF ?
              String.fromCharCode(code) :
              String.fromCharCode(((code - 65536) >> 10) +
                  55296, ((code - 65536) & (1024 - 1)) + 56320);
      };
      function readNext(parser) {
          parser.index++;
          parser.column++;
          if (parser.index >= parser.source.length)
              report(parser, 12);
          return nextUnicodeChar(parser);
      }
      function toHex(code) {
          if (code < 48)
              return -1;
          if (code <= 57)
              return code - 48;
          if (code < 65)
              return -1;
          if (code <= 70)
              return code - 65 + 10;
          if (code < 97)
              return -1;
          if (code <= 102)
              return code - 97 + 10;
          return -1;
      }
      function advanceOnMaybeAstral(parser, ch) {
          parser.index++;
          parser.column++;
          if (ch > 0xFFFF)
              parser.index++;
      }

      function scanRegularExpression(parser, context) {
          const bodyStart = parser.index;
          let preparseState = 0;
          loop: while (true) {
              const ch = parser.source.charCodeAt(parser.index);
              parser.index++;
              parser.column++;
              if (preparseState & 1) {
                  preparseState &= ~1;
              }
              else {
                  switch (ch) {
                      case 47:
                          if (!preparseState)
                              break loop;
                          else
                              break;
                      case 92:
                          preparseState |= 1;
                          break;
                      case 91:
                          preparseState |= 2;
                          break;
                      case 93:
                          preparseState &= 1;
                          break;
                      case 13:
                      case 10:
                      case 8232:
                      case 8233:
                          report(parser, 6);
                      default:
                  }
              }
              if (parser.index >= parser.source.length) {
                  report(parser, 6);
              }
          }
          const bodyEnd = parser.index - 1;
          let mask = 0;
          const { index: flagStart } = parser;
          loop: while (parser.index < parser.source.length) {
              const code = parser.source.charCodeAt(parser.index);
              switch (code) {
                  case 103:
                      if (mask & 2)
                          tolerant(parser, context, 13, 'g');
                      mask |= 2;
                      break;
                  case 105:
                      if (mask & 1)
                          tolerant(parser, context, 13, 'i');
                      mask |= 1;
                      break;
                  case 109:
                      if (mask & 4)
                          tolerant(parser, context, 13, 'm');
                      mask |= 4;
                      break;
                  case 117:
                      if (mask & 8)
                          tolerant(parser, context, 13, 'u');
                      mask |= 8;
                      break;
                  case 121:
                      if (mask & 16)
                          tolerant(parser, context, 13, 'y');
                      mask |= 16;
                      break;
                  case 115:
                      if (mask & 32)
                          tolerant(parser, context, 13, 's');
                      mask |= 32;
                      break;
                  default:
                      if (!isIdentifierPart(code))
                          break loop;
                      report(parser, 14, fromCodePoint(code));
              }
              parser.index++;
              parser.column++;
          }
          const flags = parser.source.slice(flagStart, parser.index);
          const pattern = parser.source.slice(bodyStart, bodyEnd);
          parser.tokenRegExp = { pattern, flags };
          if (context & 8)
              parser.tokenRaw = parser.source.slice(parser.startIndex, parser.index);
          parser.tokenValue = validate(parser, context, pattern, flags);
          return 33554436;
      }
      function validate(parser, context, pattern, flags) {
          if (!(context & 1024)) {
              try {
              }
              catch (e) {
                  report(parser, 6);
              }
          }
          try {
              return new RegExp(pattern, flags);
          }
          catch (e) {
              return null;
          }
      }

      function scanEscapeSequence(parser, context, first) {
          switch (first) {
              case 98:
                  return 8;
              case 102:
                  return 12;
              case 114:
                  return 13;
              case 110:
                  return 10;
              case 116:
                  return 9;
              case 118:
                  return 11;
              case 13:
              case 10:
              case 8232:
              case 8233:
                  parser.column = -1;
                  parser.line++;
                  return -1;
              case 48:
              case 49:
              case 50:
              case 51:
                  {
                      let code = first - 48;
                      let index = parser.index + 1;
                      let column = parser.column + 1;
                      let next = parser.source.charCodeAt(index);
                      if (next < 48 || next > 55) {
                          if (code !== 0 || next === 56 || next === 57) {
                              if (context & 4096)
                                  return -2;
                              parser.flags |= 128;
                          }
                      }
                      else if (context & 4096) {
                          return -2;
                      }
                      else {
                          parser.flags |= 128;
                          parser.lastValue = next;
                          code = code * 8 + (next - 48);
                          index++;
                          column++;
                          next = parser.source.charCodeAt(index);
                          if (next >= 48 && next <= 55) {
                              parser.lastValue = next;
                              code = code * 8 + (next - 48);
                              index++;
                              column++;
                          }
                          parser.index = index - 1;
                          parser.column = column - 1;
                      }
                      return code;
                  }
              case 52:
              case 53:
              case 54:
              case 55:
                  {
                      if (context & 4096)
                          return -2;
                      let code = first - 48;
                      const index = parser.index + 1;
                      const column = parser.column + 1;
                      const next = parser.source.charCodeAt(index);
                      if (next >= 48 && next <= 55) {
                          code = code * 8 + (next - 48);
                          parser.lastValue = next;
                          parser.index = index;
                          parser.column = column;
                      }
                      return code;
                  }
              case 56:
              case 57:
                  return -3;
              case 120:
                  {
                      const ch1 = parser.lastValue = readNext(parser);
                      const hi = toHex(ch1);
                      if (hi < 0)
                          return -4;
                      const ch2 = parser.lastValue = readNext(parser);
                      const lo = toHex(ch2);
                      if (lo < 0)
                          return -4;
                      return hi << 4 | lo;
                  }
              case 117:
                  {
                      let ch = parser.lastValue = readNext(parser);
                      if (ch === 123) {
                          ch = parser.lastValue = readNext(parser);
                          let code = toHex(ch);
                          if (code < 0)
                              return -4;
                          ch = parser.lastValue = readNext(parser);
                          while (ch !== 125) {
                              const digit = toHex(ch);
                              if (digit < 0)
                                  return -4;
                              code = code * 16 + digit;
                              if (code > 1114111)
                                  return -5;
                              ch = parser.lastValue = readNext(parser);
                          }
                          return code;
                      }
                      else {
                          let codePoint = toHex(ch);
                          if (codePoint < 0)
                              return -4;
                          for (let i = 0; i < 3; i++) {
                              ch = parser.lastValue = readNext(parser);
                              const digit = toHex(ch);
                              if (digit < 0)
                                  return -4;
                              codePoint = codePoint * 16 + digit;
                          }
                          return codePoint;
                      }
                  }
              default:
                  return parser.source.charCodeAt(parser.index);
          }
      }
      function throwStringError(parser, context, code) {
          switch (code) {
              case -1:
                  return;
              case -2:
                  report(parser, context & 16384 ?
                      74 :
                      10);
              case -3:
                  report(parser, 11);
              case -4:
                  report(parser, 73, 'hexadecimal');
              case -5:
                  report(parser, 12);
              default:
          }
      }
      function scanString(parser, context, quote) {
          const { index: start, lastValue } = parser;
          let ret = '';
          parser.index++;
          parser.column++;
          let ch = parser.source.charCodeAt(parser.index);
          while (ch !== quote) {
              switch (ch) {
                  case 8232:
                  case 8233:
                  case 13:
                  case 10:
                      report(parser, 5);
                  case 92:
                      ch = readNext(parser);
                      if (ch > 128) {
                          ret += fromCodePoint(ch);
                      }
                      else {
                          parser.lastValue = ch;
                          const code = scanEscapeSequence(parser, context, ch);
                          if (code >= 0)
                              ret += fromCodePoint(code);
                          else
                              throwStringError(parser, context, code);
                          ch = parser.lastValue;
                      }
                      break;
                  default:
                      ret += fromCodePoint(ch);
              }
              ch = readNext(parser);
          }
          parser.index++;
          parser.column++;
          parser.tokenRaw = parser.source.slice(start, parser.index);
          parser.tokenValue = ret;
          parser.lastValue = lastValue;
          return 33554435;
      }

      function consumeTemplateBrace(parser, context) {
          if (parser.index >= parser.length)
              report(parser, 8);
          parser.index--;
          parser.column--;
          return scanTemplate(parser, context);
      }
      function scanTemplate(parser, context) {
          const { index: start, lastValue } = parser;
          let tail = true;
          let ret = '';
          let ch = readNext(parser);
          loop: while (ch !== 96) {
              switch (ch) {
                  case 36:
                      {
                          const index = parser.index + 1;
                          if (index < parser.length &&
                              parser.source.charCodeAt(index) === 123) {
                              parser.index = index;
                              parser.column++;
                              tail = false;
                              break loop;
                          }
                          ret += '$';
                          break;
                      }
                  case 92:
                      ch = readNext(parser);
                      if (ch >= 128) {
                          ret += fromCodePoint(ch);
                      }
                      else {
                          parser.lastValue = ch;
                          const code = scanEscapeSequence(parser, context | 4096, ch);
                          if (code >= 0) {
                              ret += fromCodePoint(code);
                          }
                          else if (code !== -1 && context & 16384) {
                              ret = undefined;
                              ch = scanLooserTemplateSegment(parser, parser.lastValue);
                              if (ch < 0) {
                                  tail = false;
                              }
                              break loop;
                          }
                          else {
                              throwStringError(parser, context | 16384, code);
                          }
                          ch = parser.lastValue;
                      }
                      break;
                  case 13:
                  case 10:
                  case 8232:
                  case 8233:
                      parser.column = -1;
                      parser.line++;
                  default:
                      if (ret != null)
                          ret += fromCodePoint(ch);
              }
              ch = readNext(parser);
          }
          parser.index++;
          parser.column++;
          parser.tokenValue = ret;
          parser.lastValue = lastValue;
          if (tail) {
              parser.tokenRaw = parser.source.slice(start + 1, parser.index - 1);
              return 33554441;
          }
          else {
              parser.tokenRaw = parser.source.slice(start + 1, parser.index - 2);
              return 33554440;
          }
      }
      function scanLooserTemplateSegment(parser, ch) {
          while (ch !== 96) {
              if (ch === 36 && parser.source.charCodeAt(parser.index + 1) === 123) {
                  parser.index++;
                  parser.column++;
                  return -ch;
              }
              ch = readNext(parser);
          }
          return ch;
      }

      function scanHexIntegerLiteral(parser, context) {
          parser.index++;
          parser.column++;
          let state = 0;
          let value = toHex(parser.source.charCodeAt(parser.index));
          if (value < 0)
              report(parser, 0);
          parser.index++;
          parser.column++;
          while (parser.index < parser.length) {
              const next = parser.source.charCodeAt(parser.index);
              if (context & 1 && next === 95) {
                  state = scanNumericSeparator(parser, state);
                  continue;
              }
              state &= ~1;
              const digit = toHex(next);
              if (digit < 0)
                  break;
              value = value * 16 + digit;
              parser.index++;
              parser.column++;
          }
          if (state & 1)
              report(parser, 57);
          return assembleNumericLiteral(parser, context, value, consumeOpt(parser, 110));
      }
      function scanOctalOrBinary(parser, context, base) {
          parser.index++;
          parser.column++;
          let digits = 0;
          let ch;
          let value = 0;
          let state = 0;
          while (parser.index < parser.length) {
              ch = parser.source.charCodeAt(parser.index);
              if (context & 1 && ch === 95) {
                  state = scanNumericSeparator(parser, state);
                  continue;
              }
              state &= ~1;
              const converted = ch - 48;
              if (!(ch >= 48 && ch <= 57) || converted >= base)
                  break;
              value = value * base + converted;
              parser.index++;
              parser.column++;
              digits++;
          }
          if (digits === 0)
              report(parser, 0);
          if (state & 1)
              report(parser, 57);
          return assembleNumericLiteral(parser, context, value, consumeOpt(parser, 110));
      }
      function scanImplicitOctalDigits(parser, context) {
          switch (parser.source.charCodeAt(parser.index)) {
              case 48:
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
                  {
                      if (context & 4096)
                          report(parser, 0);
                      let index = parser.index;
                      let column = parser.column;
                      let code = 0;
                      parser.flags |= 128;
                      while (index < parser.length) {
                          const next = parser.source.charCodeAt(index);
                          if (next === 95) {
                              report(parser, 58);
                          }
                          else if (next < 48 || next > 55) {
                              return scanNumericLiteral(parser, context);
                          }
                          else {
                              code = code * 8 + (next - 48);
                              index++;
                              column++;
                          }
                      }
                      parser.index = index;
                      parser.column = column;
                      return assembleNumericLiteral(parser, context, code, consumeOpt(parser, 110));
                  }
              case 56:
              case 57:
                  parser.flags |= 128;
              default:
                  if (context & 1 && parser.source.charCodeAt(parser.index) === 95) {
                      report(parser, 58);
                  }
                  return scanNumericLiteral(parser, context);
          }
      }
      function scanSignedInteger(parser, end) {
          let next = parser.source.charCodeAt(parser.index);
          if (next === 43 || next === 45) {
              parser.index++;
              parser.column++;
              next = parser.source.charCodeAt(parser.index);
          }
          if (!(next >= 48 && next <= 57)) {
              report(parser, 0);
          }
          const preNumericPart = parser.index;
          const finalFragment = scanDecimalDigitsOrSeparator(parser);
          return parser.source.substring(end, preNumericPart) + finalFragment;
      }
      function scanNumericLiteral(parser, context, state = 0) {
          let value = state & 4 ?
              0 :
              scanDecimalAsSmi(parser, context);
          const next = parser.source.charCodeAt(parser.index);
          if (next !== 46 && next !== 95 && !isValidIdentifierStart(next)) {
              return assembleNumericLiteral(parser, context, value);
          }
          if (consumeOpt(parser, 46)) {
              if (context & 1 && parser.source.charCodeAt(parser.index) === 95) {
                  report(parser, 58);
              }
              state |= 4;
              value = value + '.' + scanDecimalDigitsOrSeparator(parser);
          }
          const end = parser.index;
          if (consumeOpt(parser, 110)) {
              if (state & 4)
                  report(parser, 0);
              state |= 8;
          }
          if (consumeOpt(parser, 101) || consumeOpt(parser, 69)) {
              state |= 4;
              value += scanSignedInteger(parser, end);
          }
          if (isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
              report(parser, 0);
          }
          return assembleNumericLiteral(parser, context, state & 4 ? parseFloat(value) : parseInt(value, 10), !!(state & 8));
      }
      function scanNumericSeparator(parser, state) {
          parser.index++;
          parser.column++;
          if (state & 1)
              report(parser, 57);
          state |= 1;
          return state;
      }
      function scanDecimalDigitsOrSeparator(parser) {
          let start = parser.index;
          let state = 0;
          let ret = '';
          loop: while (parser.index < parser.length) {
              switch (parser.source.charCodeAt(parser.index)) {
                  case 95:
                      const preUnderscoreIndex = parser.index;
                      state = scanNumericSeparator(parser, state);
                      ret += parser.source.substring(start, preUnderscoreIndex);
                      start = parser.index;
                      continue;
                  case 48:
                  case 49:
                  case 50:
                  case 51:
                  case 52:
                  case 53:
                  case 54:
                  case 55:
                  case 56:
                  case 57:
                      state = state & ~1;
                      parser.index++;
                      parser.column++;
                      break;
                  default:
                      break loop;
              }
          }
          if (state & 1)
              report(parser, 57);
          return ret + parser.source.substring(start, parser.index);
      }
      function scanDecimalAsSmi(parser, context) {
          let state = 0;
          let value = 0;
          let next = parser.source.charCodeAt(parser.index);
          while (next >= 48 && next <= 57 || next === 95) {
              if (context & 1 && next === 95) {
                  state = scanNumericSeparator(parser, state);
                  next = parser.source.charCodeAt(parser.index);
                  continue;
              }
              state &= ~1;
              value = value * 10 + (next - 48);
              parser.index++;
              parser.column++;
              next = parser.source.charCodeAt(parser.index);
          }
          if (state & 1)
              report(parser, 57);
          return value;
      }
      function assembleNumericLiteral(parser, context, value, isBigInt = false) {
          parser.tokenValue = value;
          if (context & 8)
              parser.tokenRaw = parser.source.slice(parser.startIndex, parser.index);
          return isBigInt ? 33554551 : 33554434;
      }

      function scanIdentifier(parser, context, first) {
          let start = parser.index;
          let ret = '';
          let isEscaped = false;
          if (first)
              advanceOnMaybeAstral(parser, first);
          loop: while (parser.index < parser.length) {
              const index = parser.index;
              let ch = parser.source.charCodeAt(index);
              switch (ch) {
                  case 92:
                      ret += parser.source.slice(start, index);
                      ret += scanUnicodeCodePointEscape(parser);
                      start = parser.index;
                      isEscaped = true;
                      break;
                  default:
                      if (ch >= 0xD800 && ch <= 0xDBFF) {
                          const lo = parser.source.charCodeAt(index + 1);
                          ch = (ch & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
                      }
                      if (!isIdentifierPart(ch))
                          break loop;
                      advanceOnMaybeAstral(parser, ch);
              }
          }
          if (start < parser.index)
              ret += parser.source.slice(start, parser.index);
          parser.tokenValue = ret;
          const len = ret.length;
          if (len >= 2 && len <= 11) {
              const token = descKeyword(ret);
              if (token > 0) {
                  if (isEscaped) {
                      if (context & 536870912) {
                          tolerant(parser, context, 2);
                      }
                      parser.flags |= 32768;
                  }
                  return token;
              }
          }
          if (context & 256)
              parser.tokenRaw = parser.source.slice(start, parser.index);
          return 33619969;
      }
      function scanMaybeIdentifier(parser, context, first) {
          first = nextUnicodeChar(parser);
          if (!isValidIdentifierStart(first)) {
              report(parser, 9, escapeForPrinting(first));
          }
          return scanIdentifier(parser, context, first);
      }
      function scanUnicodeCodePointEscape(parser) {
          const { index } = parser;
          if (index + 5 < parser.length) {
              if (parser.source.charCodeAt(index + 1) !== 117) {
                  report(parser, 0);
              }
              parser.index += 2;
              parser.column += 2;
              const code = scanIdentifierUnicodeEscape(parser);
              if (code >= 55296 && code <= 56319) {
                  report(parser, 72);
              }
              if (!isIdentifierPart(code)) {
                  report(parser, 73, 'unicode');
              }
              return fromCodePoint(code);
          }
          report(parser, 0);
      }
      function scanIdentifierUnicodeEscape(parser) {
          let ch = parser.source.charCodeAt(parser.index);
          let codePoint = 0;
          if (ch === 123) {
              ch = readNext(parser);
              let digit = toHex(ch);
              while (digit >= 0) {
                  codePoint = (codePoint << 4) | digit;
                  if (codePoint > 1114111) {
                      report(parser, 87);
                  }
                  parser.index++;
                  parser.column++;
                  digit = toHex(parser.source.charCodeAt(parser.index));
              }
              if (parser.source.charCodeAt(parser.index) !== 125) {
                  report(parser, 73, 'unicode');
              }
              consumeOpt(parser, 125);
          }
          else {
              for (let i = 0; i < 4; i++) {
                  ch = parser.source.charCodeAt(parser.index);
                  const digit = toHex(ch);
                  if (digit < 0)
                      report(parser, 73, 'unicode');
                  codePoint = (codePoint << 4) | digit;
                  parser.index++;
                  parser.column++;
              }
          }
          return codePoint;
      }

      function skipSingleHTMLComment(parser, context, state, type) {
          if (context & 8192)
              report(parser, 88);
          return skipSingleLineComment(parser, context, state, type);
      }
      function skipSingleLineComment(parser, context, state, type) {
          const start = parser.index;
          const collectable = !!(context & 64);
          while (parser.index < parser.length) {
              switch (parser.source.charCodeAt(parser.index)) {
                  case 13:
                      advanceNewline(parser);
                      if ((parser.index < parser.length) && parser.source.charCodeAt(parser.index) === 10)
                          parser.index++;
                      return state | 1;
                  case 10:
                  case 8232:
                  case 8233:
                      advanceNewline(parser);
                      if (collectable)
                          addComment(parser, context, type, start);
                      return state | 1;
                  default:
                      parser.index++;
                      parser.column++;
              }
          }
          if (collectable)
              addComment(parser, context, type, start);
          return state;
      }
      function skipMultiLineComment(parser, context, state) {
          const start = parser.index;
          const collectable = !!(context & 64);
          while (parser.index < parser.length) {
              switch (parser.source.charCodeAt(parser.index)) {
                  case 42:
                      parser.index++;
                      parser.column++;
                      state &= ~2;
                      if (consumeOpt(parser, 47)) {
                          if (collectable)
                              addComment(parser, context, 'MultiLine', start);
                          return state;
                      }
                      break;
                  case 13:
                      state |= 1 | 2;
                      advanceNewline(parser);
                      break;
                  case 10:
                      consumeLineFeed(parser, state);
                      state = state & ~2 | 1;
                      break;
                  case 8232:
                  case 8233:
                      state = state & ~2 | 1;
                      advanceNewline(parser);
                      break;
                  default:
                      state &= ~2;
                      parser.index++;
                      parser.column++;
              }
          }
          tolerant(parser, context, 7);
      }
      function addComment(parser, context, type, start) {
          const { index, startIndex, startLine, startColumn, lastLine, column } = parser;
          const comment = {
              type,
              value: parser.source.slice(start, type === 'MultiLine' ? index - 2 : index),
              start: startIndex,
              end: index,
          };
          if (context & 16) {
              comment.loc = {
                  start: {
                      line: startLine,
                      column: startColumn,
                  },
                  end: {
                      line: lastLine,
                      column,
                  },
              };
          }
          parser.comments.push(comment);
      }

      function scan(parser, context) {
          parser.flags &= ~1 | 32768;
          const lineStart = parser.index === 0;
          let state = 0;
          while (parser.index < parser.length) {
              if (!lineStart) {
                  parser.startIndex = parser.index;
                  parser.startColumn = parser.column;
                  parser.startLine = parser.line;
              }
              const first = parser.source.charCodeAt(parser.index);
              if (first > 128) {
                  switch (first) {
                      case 8232:
                      case 8233:
                          state = state & ~2 | 1;
                          advanceNewline(parser);
                          break;
                      case 65519:
                      case 160:
                      case 5760:
                      case 8192:
                      case 8193:
                      case 8194:
                      case 8195:
                      case 8196:
                      case 8197:
                      case 8198:
                      case 8199:
                      case 8200:
                      case 8201:
                      case 8202:
                      case 8239:
                      case 8287:
                      case 12288:
                      case 65279:
                      case 8205:
                      case 65279:
                          parser.index++;
                          parser.column++;
                          break;
                      default:
                          return scanMaybeIdentifier(parser, context, first);
                  }
              }
              else {
                  switch (first) {
                      case 13:
                          state |= 1 | 2;
                          advanceNewline(parser);
                          break;
                      case 10:
                          consumeLineFeed(parser, state);
                          state = state & ~2 | 1;
                          break;
                      case 9:
                      case 11:
                      case 12:
                      case 32:
                          parser.index++;
                          parser.column++;
                          break;
                      case 40:
                          parser.index++;
                          parser.column++;
                          return 50331659;
                      case 41:
                          parser.index++;
                          parser.column++;
                          return 16;
                      case 44:
                          parser.index++;
                          parser.column++;
                          return 16777234;
                      case 58:
                          parser.index++;
                          parser.column++;
                          return 16777237;
                      case 59:
                          parser.index++;
                          parser.column++;
                          return 17301521;
                      case 63:
                          parser.index++;
                          parser.column++;
                          return 22;
                      case 93:
                          parser.index++;
                          parser.column++;
                          return 20;
                      case 123:
                          parser.index++;
                          parser.column++;
                          return 41943052;
                      case 125:
                          parser.index++;
                          parser.column++;
                          return 17301519;
                      case 126:
                          parser.index++;
                          parser.column++;
                          return 301989934;
                      case 91:
                          parser.index++;
                          parser.column++;
                          return 41943059;
                      case 64:
                          parser.index++;
                          parser.column++;
                          return 120;
                      case 47:
                          {
                              parser.index++;
                              parser.column++;
                              if (parser.index >= parser.length)
                                  return 167774773;
                              switch (parser.source.charCodeAt(parser.index)) {
                                  case 47:
                                      {
                                          parser.index++;
                                          parser.column++;
                                          state = skipSingleLineComment(parser, context, state, 'SingleLine');
                                          continue;
                                      }
                                  case 42:
                                      {
                                          parser.index++;
                                          parser.column++;
                                          state = skipMultiLineComment(parser, context, state);
                                          continue;
                                      }
                                  case 61:
                                      {
                                          parser.index++;
                                          parser.column++;
                                          return 100663333;
                                      }
                                  default:
                                      return 167774773;
                              }
                          }
                      case 45:
                          {
                              parser.index++;
                              parser.column++;
                              const next = parser.source.charCodeAt(parser.index);
                              switch (next) {
                                  case 45:
                                      {
                                          parser.index++;
                                          parser.column++;
                                          if ((state & 1 || lineStart) &&
                                              consumeOpt(parser, 62)) {
                                              state = skipSingleHTMLComment(parser, context, state, 'HTMLClose');
                                              continue;
                                          }
                                          return 570425372;
                                      }
                                  case 61:
                                      {
                                          parser.index++;
                                          parser.column++;
                                          return 67108899;
                                      }
                                  default:
                                      return 436209968;
                              }
                          }
                      case 60:
                          parser.index++;
                          parser.column++;
                          if (consumeOpt(parser, 33) &&
                              consumeOpt(parser, 45) &&
                              consumeOpt(parser, 45)) {
                              state = skipSingleHTMLComment(parser, context, state, 'HTMLOpen');
                              continue;
                          }
                          switch (parser.source.charCodeAt(parser.index)) {
                              case 60:
                                  parser.index++;
                                  parser.column++;
                                  return consumeOpt(parser, 61) ?
                                      67108894 :
                                      167774273;
                              case 61:
                                  parser.index++;
                                  parser.column++;
                                  return 167774013;
                              case 47:
                                  {
                                      if (!(context & 4))
                                          break;
                                      const index = parser.index + 1;
                                      if (index < parser.length) {
                                          const next = parser.source.charCodeAt(index);
                                          if (next === 42 || next === 47)
                                              break;
                                      }
                                      parser.index++;
                                      parser.column++;
                                      return 25;
                                  }
                              default:
                                  return 167774015;
                          }
                      case 33:
                          parser.index++;
                          parser.column++;
                          if (!consumeOpt(parser, 61))
                              return 301989933;
                          if (!consumeOpt(parser, 61))
                              return 167773756;
                          return 167773754;
                      case 39:
                      case 34:
                          return scanString(parser, context, first);
                      case 37:
                          parser.index++;
                          parser.column++;
                          if (!consumeOpt(parser, 61))
                              return 167774772;
                          return 67108902;
                      case 38:
                          {
                              parser.index++;
                              parser.column++;
                              const next = parser.source.charCodeAt(parser.index);
                              if (next === 38) {
                                  parser.index++;
                                  parser.column++;
                                  return 169869879;
                              }
                              if (next === 61) {
                                  parser.index++;
                                  parser.column++;
                                  return 67108905;
                              }
                              return 167773508;
                          }
                      case 42:
                          {
                              parser.index++;
                              parser.column++;
                              if (parser.index >= parser.length)
                                  return 167774771;
                              const next = parser.source.charCodeAt(parser.index);
                              if (next === 61) {
                                  parser.index++;
                                  parser.column++;
                                  return 67108900;
                              }
                              if (next !== 42)
                                  return 167774771;
                              parser.index++;
                              parser.column++;
                              if (!consumeOpt(parser, 61))
                                  return 167775030;
                              return 67108897;
                          }
                      case 43:
                          {
                              parser.index++;
                              parser.column++;
                              if (parser.index >= parser.length)
                                  return 436209967;
                              const next = parser.source.charCodeAt(parser.index);
                              if (next === 43) {
                                  parser.index++;
                                  parser.column++;
                                  return 570425371;
                              }
                              if (next === 61) {
                                  parser.index++;
                                  parser.column++;
                                  return 67108898;
                              }
                              return 436209967;
                          }
                      case 92:
                          return scanIdentifier(parser, context);
                      case 61:
                          {
                              parser.index++;
                              parser.column++;
                              const next = parser.source.charCodeAt(parser.index);
                              if (next === 61) {
                                  parser.index++;
                                  parser.column++;
                                  if (consumeOpt(parser, 61)) {
                                      return 167773753;
                                  }
                                  else {
                                      return 167773755;
                                  }
                              }
                              else if (next === 62) {
                                  parser.index++;
                                  parser.column++;
                                  return 10;
                              }
                              return 83886109;
                          }
                      case 62:
                          {
                              parser.index++;
                              parser.column++;
                              if (parser.index >= parser.length)
                                  return 167774016;
                              if (context & 268435456)
                                  return 167774016;
                              let next = parser.source.charCodeAt(parser.index);
                              if (next === 61) {
                                  parser.index++;
                                  parser.column++;
                                  return 167774014;
                              }
                              if (next !== 62)
                                  return 167774016;
                              parser.index++;
                              parser.column++;
                              next = parser.source.charCodeAt(parser.index);
                              if (next === 62) {
                                  parser.index++;
                                  parser.column++;
                                  if (consumeOpt(parser, 61)) {
                                      return 67108896;
                                  }
                                  else {
                                      return 167774275;
                                  }
                              }
                              else if (next === 61) {
                                  parser.index++;
                                  parser.column++;
                                  return 67108895;
                              }
                              return 167774274;
                          }
                      case 94:
                          parser.index++;
                          parser.column++;
                          if (!consumeOpt(parser, 61))
                              return 167773254;
                          return 67108903;
                      case 96:
                          return scanTemplate(parser, context);
                      case 124:
                          {
                              parser.index++;
                              parser.column++;
                              const next = parser.source.charCodeAt(parser.index);
                              if (next === 124) {
                                  parser.index++;
                                  parser.column++;
                                  return 169869624;
                              }
                              else if (next === 61) {
                                  parser.index++;
                                  parser.column++;
                                  return 67108904;
                              }
                              return 167772997;
                          }
                      case 46:
                          {
                              let index = parser.index + 1;
                              const next = parser.source.charCodeAt(index);
                              if (next >= 48 && next <= 57) {
                                  scanNumericLiteral(parser, context, 4);
                                  return 33554434;
                              }
                              else if (next === 46) {
                                  index++;
                                  if (index < parser.length &&
                                      parser.source.charCodeAt(index) === 46) {
                                      parser.index = index + 1;
                                      parser.column += 3;
                                      return 14;
                                  }
                              }
                              parser.index++;
                              parser.column++;
                              return 16777229;
                          }
                      case 35:
                          {
                              parser.index++;
                              parser.column++;
                              const index = parser.index;
                              const next = parser.source.charCodeAt(index);
                              if (context & 128 &&
                                  lineStart &&
                                  next === 33) {
                                  parser.index = index + 1;
                                  skipSingleLineComment(parser, context, 0, 'SheBang');
                                  continue;
                              }
                              return scanPrivateName(parser, context);
                          }
                      case 48:
                          {
                              parser.index++;
                              parser.column++;
                              switch (parser.source.charCodeAt(parser.index)) {
                                  case 88:
                                  case 120:
                                      return scanHexIntegerLiteral(parser, context);
                                  case 66:
                                  case 98:
                                      return scanOctalOrBinary(parser, context, 2);
                                  case 79:
                                  case 111:
                                      return scanOctalOrBinary(parser, context, 8);
                                  default:
                                      return scanImplicitOctalDigits(parser, context);
                              }
                          }
                      case 49:
                      case 50:
                      case 51:
                      case 52:
                      case 53:
                      case 54:
                      case 55:
                      case 56:
                      case 57:
                          return scanNumericLiteral(parser, context);
                      case 65:
                      case 66:
                      case 67:
                      case 68:
                      case 69:
                      case 70:
                      case 71:
                      case 72:
                      case 73:
                      case 74:
                      case 75:
                      case 76:
                      case 77:
                      case 78:
                      case 79:
                      case 80:
                      case 81:
                      case 82:
                      case 83:
                      case 84:
                      case 85:
                      case 86:
                      case 87:
                      case 88:
                      case 89:
                      case 90:
                      case 36:
                      case 95:
                      case 97:
                      case 98:
                      case 99:
                      case 100:
                      case 101:
                      case 102:
                      case 103:
                      case 104:
                      case 105:
                      case 106:
                      case 107:
                      case 108:
                      case 109:
                      case 110:
                      case 111:
                      case 112:
                      case 113:
                      case 114:
                      case 115:
                      case 116:
                      case 117:
                      case 118:
                      case 119:
                      case 120:
                      case 121:
                      case 122:
                      default:
                          return scanIdentifier(parser, context, first);
                  }
              }
          }
          return 524288;
      }

      function validateBreakOrContinueLabel(parser, context, label, isContinue) {
          const state = hasLabel(parser, label);
          if (!state)
              tolerant(parser, context, 30, label);
          if (isContinue && !(state & 2))
              tolerant(parser, context, 29, label);
      }
      function addLabel(parser, label) {
          if (parser.labelSet === undefined)
              parser.labelSet = {};
          parser.labelSet['$' + label] = parser.token & 16 ? 2 : 1;
      }
      function popLabel(parser, label) {
          parser.labelSet['$' + label] = 0;
      }
      function hasLabel(parser, label) {
          return !parser.labelSet ? 0 : parser.labelSet['$' + label];
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
                      column: meta.column,
                  },
                  end: {
                      line: lastLine,
                      column: lastColumn,
                  },
              };
              if (sourceFile)
                  node.loc.source = sourceFile;
          }
          return node;
      }
      function expect(parser, context, token, err = 1) {
          if (parser.token !== token)
              report(parser, err, tokenDesc(parser.token));
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
          return parser.token = scan(parser, context);
      }
      const hasBit = exports('hasBit', (mask, flags) => (mask & flags) === flags);
      function consumeSemicolon(parser, context) {
          return parser.token & 524288 || parser.flags & 1 ?
              consume(parser, context, 17301521) :
              report(parser, !(context & 131072) && parser.token & 131072 ?
                  36 :
                  1, tokenDesc(parser.token));
      }
      function parseExpressionCoverGrammar(parser, context, callback) {
          const { flags, pendingExpressionError } = parser;
          parser.flags |= 2 | 4;
          parser.pendingExpressionError = undefined;
          const res = callback(parser, context);
          if (!!parser.pendingExpressionError) {
              const { error, line, column, index } = parser.pendingExpressionError;
              constructError(parser, context, index, line, column, error);
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
              const key = '@' + params[i];
              if (paramSet.get(key)) {
                  tolerant(parser, context, 79);
              }
              else
                  paramSet.set(key, true);
          }
      }
      const reinterpret = exports('reinterpret', (parser, context, node) => {
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
                      tolerant(parser, context, 69);
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
                  tolerant(parser, context, context & 524288
                      ? 75
                      : 71, node.type);
          }
      });
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
          return (node.type === 'Identifier' || node.type === 'MemberExpression') ? true : false;
      }
      function getLocation(parser) {
          return {
              line: parser.startLine,
              column: parser.startColumn,
              index: parser.startIndex,
          };
      }
      function isValidIdentifier(context, t) {
          if (context & 4096) {
              if (context & 8192 && t & 131072)
                  return false;
              if (t & 1073741824)
                  return false;
              return (t & 65536) === 65536 ||
                  (t & 36864) === 36864;
          }
          return (t & 65536) === 65536 ||
              (t & 36864) === 36864 ||
              (t & 20480) === 20480;
      }
      function isLexical(parser, context) {
          nextToken(parser, context);
          const { token } = parser;
          return !!(token & (65536 | 8388608 | 1073741824 | 131072) ||
              token === 33574984 ||
              (token & 36864) === 36864);
      }
      function isEndOfCaseOrDefaultClauses(parser) {
          return parser.token === 12368 ||
              parser.token === 17301519 ||
              parser.token === 12363;
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
                  tolerant(parser, context, 38, tokenDesc(token));
              }
              if (token & 1073741824)
                  tolerant(parser, context, 38, tokenDesc(token));
              if ((token & 65536) === 65536 ||
                  (token & 36864) === 36864) {
                  return parseIdentifier(parser, context);
              }
              report(parser, 1, tokenDesc(token));
          }
          if (context & 262144 && token & 1073741824) {
              tolerant(parser, context, 38, tokenDesc(token));
          }
          else if (context & 131072 && token & 131072) {
              tolerant(parser, context, 38, tokenDesc(token));
          }
          if ((token & 65536) === 65536 ||
              (token & 36864) === 36864 ||
              (token & 20480) === 20480) {
              return parseIdentifier(parser, context);
          }
          report(parser, 1, tokenDesc(parser.token));
      }
      function nameIsArgumentsOrEval(value) {
          return value === 'eval' || value === 'arguments';
      }
      function setPendingError(parser) {
          parser.errorLocation = {
              line: parser.startLine,
              column: parser.startColumn,
              index: parser.startIndex,
          };
      }
      function isEqualTagNames(elementName) {
          switch (elementName.type) {
              case 'JSXIdentifier':
                  return elementName.name;
              case 'JSXNamespacedName':
                  return isEqualTagNames(elementName.namespace) + ':' + isEqualTagNames(elementName.name);
              case 'JSXMemberExpression':
                  return isEqualTagNames(elementName.object) + '.' + isEqualTagNames(elementName.property);
              default:
          }
      }
      function isInstanceField(parser) {
          const { token } = parser;
          return token === 17301519 || token === 17301521 || token === 83886109;
      }
      function validateUpdateExpression(parser, context, expr, prefix) {
          if (context & 4096 && nameIsArgumentsOrEval(expr.name)) {
              tolerant(parser, context, 66, prefix);
          }
          if (!isValidSimpleAssignmentTarget(expr)) {
              tolerant(parser, context, 4);
          }
      }
      function setPendingExpressionError(parser, type) {
          parser.pendingExpressionError = {
              error: ErrorMessages[type],
              line: parser.line,
              column: parser.column,
              index: parser.index,
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
              tolerant(parser, context, 75);
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
                  report(parser, 83, close);
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
          const closingElement = parseJSXClosingFragment(parser, context);
          return finishNode(context, parser, pos, {
              type: 'JSXFragment',
              children,
              openingElement,
              closingElement,
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
              return consumeOpt(parser, 47) ? 25 : 167774015;
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
                  report(parser, 0);
          }
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
                  tolerant(parser, context, 85);
          }
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
              value,
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
              ret += fromCodePoint(ch);
              parser.index++;
              parser.column++;
              ch = parser.source.charCodeAt(parser.index);
              if (parser.index >= parser.source.length)
                  report(parser, 5);
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
              tolerant(parser, context, 82);
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
              tolerant(parser, context, 1, tokenDesc(parser.token));
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
              while ((parser.index < parser.source.length) && (ch === 45 || (isValidIdentifierPart(ch)))) {
                  ch = readNext(parser);
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
              tolerant(parser, context, 49);
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
                              tolerant(parser, context, 45);
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
                  tolerant(parser, context, 15);
              }
              else if (consume(parser, context, 83886109)) {
                  if (!(parser.flags & 4)) {
                      tolerant(parser, context, 71);
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
                      tolerant(parser, context, 4);
                  }
                  parser.flags &= ~(4 | 2);
                  nextToken(parser, context);
              }
              const right = parseExpressionCoverGrammar(parser, context | 65536, parseAssignmentExpression);
              parser.pendingExpressionError = null;
              return finishNode(context, parser, pos, {
                  type: 'AssignmentExpression',
                  left: expr,
                  operator: tokenDesc(token),
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
                  operator: tokenDesc(t),
              });
          }
          return left;
      }
      function parseAwaitExpression(parser, context, pos) {
          if (context & 524288)
              tolerant(parser, context, 50);
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
                  tolerant(parser, context, 2);
              const argument = parseExpressionCoverGrammar(parser, context, parseUnaryExpression);
              if (parser.token === 167775030)
                  tolerant(parser, context, 1, tokenDesc(parser.token));
              if (context & 4096 && token === 302002219) {
                  if (argument.type === 'Identifier') {
                      tolerant(parser, context, 41);
                  }
                  else if (isPropertyWithPrivateFieldKey(argument)) {
                      tolerant(parser, context, 42);
                  }
              }
              return finishNode(context, parser, pos, {
                  type: 'UnaryExpression',
                  operator: tokenDesc(token),
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
                  operator: tokenDesc(token),
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
                  operator: tokenDesc(operator),
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
                  tolerant(parser, context, 38);
              return parseAsyncArrowFunction(parser, context, 2, pos, [parseAndValidateIdentifier(parser, context)]);
          }
          if (parser.flags & 1)
              tolerant(parser, context, 34, 'async');
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
                  tolerant(parser, context, 76);
              }
              else if (state & 8) {
                  if (context & 4096)
                      tolerant(parser, context, 45);
                  parser.flags |= 2048;
              }
              else if (state & 16) {
                  if (context & 4096)
                      tolerant(parser, context, 49);
                  parser.flags |= 64;
              }
              else if (parser.flags & 16384) {
                  tolerant(parser, context, 49);
              }
              else if (state & 32 || parser.flags & 8192) {
                  tolerant(parser, context, 50);
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
                  scanRegularExpression(parser, context);
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
              tolerant(parser, context, 48);
          const pos = getLocation(parser);
          const name = parser.tokenValue;
          nextToken(parser, context);
          if (parser.flags & 1) {
              if (parser.token === 41943059)
                  tolerant(parser, context, 1, 'let');
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
              tolerant(parser, context, 59);
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
          const raw = tokenDesc(token);
          if (parser.flags & 32768)
              tolerant(parser, context, 2);
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
              tolerant(parser, context, 2);
          const pos = getLocation(parser);
          nextToken(parser, context | 536870912);
          return finishNode(context, parser, pos, {
              type: 'ThisExpression',
          });
      }
      function parseIdentifierName(parser, context, t) {
          if (!(t & (65536 | 4096)))
              tolerant(parser, context, 3, tokenDesc(t));
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
                          tolerant(parser, context, 1, tokenDesc(parser.token));
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
                                              tolerant(parser, context, 75);
                                          parser.flags |= 8;
                                          const restElement = parseRestElement(parser, context);
                                          expect(parser, context, 16);
                                          if (parser.token !== 10)
                                              tolerant(parser, context, 76);
                                          parser.flags &= ~2;
                                          expressions.push(restElement);
                                          return expressions;
                                      }
                                  case 16:
                                      {
                                          expect(parser, context, 16);
                                          if (parser.token !== 10)
                                              tolerant(parser, context, 1, tokenDesc(parser.token));
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
                                  tolerant(parser, context, 45);
                              parser.flags |= 2048;
                          }
                          else if (state & 4) {
                              if (context & 4096)
                                  tolerant(parser, context, 48);
                              parser.flags |= 64;
                          }
                          else if (!(parser.flags & 2)) {
                              tolerant(parser, context, 75);
                          }
                          else if (parser.flags & 16384) {
                              tolerant(parser, context, 49);
                          }
                          else if (context & 131072 && parser.flags & 8192) {
                              tolerant(parser, context, 50);
                          }
                          parser.flags &= ~(2 | 8192 | 16384);
                          const params = (state & 1 ? expr.expressions : [expr]);
                          return params;
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
                      tolerant(parser, context, 45);
                  parser.flags |= 2048;
              }
              if (parser.token & 1073741824 && isGenerator & 1) {
                  tolerant(parser, context, 47);
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
                      tolerant(parser, context, 45);
                  parser.flags |= 1024;
              }
              if (token & 131072)
                  tolerant(parser, context, 46);
              if (parser.token & 1073741824 && isGenerator & 1)
                  tolerant(parser, context, 47);
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
                  tolerant(parser, context, 2);
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
                      tolerant(parser, context, 1, tokenDesc(parser.token));
              }
          }
          if (parser.token === 50331659) {
              value = parseMethodDeclaration(parser, context, state);
          }
          else {
              state &= ~32;
              if (parser.token === 16777237) {
                  if ((state & (1 | 2))) {
                      tolerant(parser, context, 1, tokenDesc(parser.token));
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
                      tolerant(parser, context, 1, tokenDesc(t));
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
                              tolerant(parser, context, 44);
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
              tolerant(parser, context, 34, '=>');
          expect(parser, context, 10);
          return parseArrowBody(parser, context & ~131072, params, pos, 0);
      }
      function parseAsyncArrowFunction(parser, context, state, pos, params) {
          parser.flags &= ~(4 | 2);
          if (parser.flags & 1)
              tolerant(parser, context, 34, 'async');
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
                      tolerant(parser, context, 62);
                  }
                  else if (parser.flags & (64 | 1024)) {
                      tolerant(parser, context, 48);
                  }
                  else if (parser.flags & 2048) {
                      tolerant(parser, context, 45);
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
                      tolerant(parser, context, 65);
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
              tolerant(parser, context, 64, 'Setter', 'one', '');
          }
          if (state & 4 && params.length > 0) {
              tolerant(parser, context, 64, 'Getter', 'no', 's');
          }
          expect(parser, context, 16);
          return { params, args };
      }
      function parseFormalParameterList(parser, context, args) {
          const pos = getLocation(parser);
          if (parser.token & (65536 | 4096)) {
              if (hasBit(parser.token, 20480)) {
                  if (context & 4096)
                      tolerant(parser, context, 48);
                  parser.flags |= 1024;
              }
              if (hasBit(parser.token, 4194304)) {
                  if (context & 4096)
                      tolerant(parser, context, 45);
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
              tolerant(parser, context, parser.token & 131072 ? 50 : 49);
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
                  tolerant(parser, context, 46);
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
                          report(parser, 90);
                      if (decorators.length !== 0 && parser.tokenValue === 'constructor') {
                          report(parser, 91);
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
                  tolerant(parser, context, 43, 'generator');
              else if (state & 512)
                  context |= 67108864;
              state |= 256;
          }
          let key = parsePropertyName(parser, context);
          let value;
          if (!(parser.token & 16777216)) {
              if (flags & 32768)
                  tolerant(parser, context, 2);
              if (token === 20585) {
                  token = parser.token;
                  if (consume(parser, context, 167774771))
                      state |= 2;
                  tokenValue = parser.tokenValue;
                  if (parser.token === 41943059)
                      state |= 16;
                  if (parser.tokenValue === 'prototype')
                      tolerant(parser, context, 63);
                  state |= 128;
                  key = parsePropertyName(parser, context);
                  if (context & 1 && isInstanceField(parser)) {
                      if (tokenValue === 'constructor')
                          tolerant(parser, context, 1, tokenDesc(parser.token));
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
                      tolerant(parser, context, 63);
                  }
                  else if (!(state & 128) && tokenValue === 'constructor') {
                      tolerant(parser, context, 43, 'accessor');
                  }
              }
          }
          if (parser.token === 50331659) {
              value = parseMethodDeclaration(parser, context, state);
          }
          else {
              if (context & 1)
                  return parseFieldDefinition(parser, context, key, state, pos, decorators);
              tolerant(parser, context, 1, tokenDesc(token));
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
              tolerant(parser, context, 0);
          let value = null;
          if (state & (1 | 2))
              tolerant(parser, context, 0);
          if (consume(parser, context, 83886109)) {
              if (parser.token & 4194304)
                  tolerant(parser, context, 45);
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
              tolerant(parser, context, 39);
          const key = parsePrivateName(parser, context, pos);
          if (parser.token === 50331659)
              return parsePrivateMethod(parser, context, key, pos, decorators);
          let value = null;
          if (consume(parser, context, 83886109)) {
              if (parser.token & 4194304)
                  tolerant(parser, context, 45);
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
              tolerant(parser, context, 1, tokenDesc(parser.token));
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
                  tolerant(parser, context, 51);
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
                  tolerant(parser, context, 1, tokenDesc(token));
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
                      tolerant(parser, context, 52);
                  break;
              case 41943059:
              case 16777229:
                  if (!(context & 33554432))
                      tolerant(parser, context, 53);
                  break;
              default:
                  tolerant(parser, context, 54);
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
          parser.token = consumeTemplateBrace(parser, context);
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

      function parseBindingIdentifierOrPattern(parser, context, args = []) {
          const { token } = parser;
          if (token & 8388608) {
              return token === 41943052 ?
                  parserObjectAssignmentPattern(parser, context) :
                  parseArrayAssignmentPattern(parser, context, args);
          }
          else if (token & (131072 | 1073741824)) {
              if (token & 131072 && (context & (131072 | 8192))) {
                  tolerant(parser, context, 46);
              }
              else if (token & 1073741824 && (context & (262144 | 4096))) {
                  tolerant(parser, context, 47);
              }
          }
          args.push(parser.tokenValue);
          return parseBindingIdentifier(parser, context);
      }
      function parseBindingIdentifier(parser, context) {
          const { token } = parser;
          if (token & 4194304) {
              if (context & 4096)
                  tolerant(parser, context, 15);
              parser.flags |= 2048;
          }
          else if (context & 4194304 && token === 33574984) {
              tolerant(parser, context, 25);
          }
          else if (hasBit(token, 20480)) {
              if (context & 4096)
                  tolerant(parser, context, 1, tokenDesc(token));
              parser.flags |= 1024;
          }
          else if (!isValidIdentifier(context, token)) {
              tolerant(parser, context, 1, tokenDesc(token));
          }
          const pos = getLocation(parser);
          const name = parser.tokenValue;
          nextToken(parser, context);
          return finishNode(context, parser, pos, {
              type: 'Identifier',
              name,
          });
      }
      function parseAssignmentRestElement(parser, context, args) {
          const pos = getLocation(parser);
          expect(parser, context, 14);
          const argument = parseBindingIdentifierOrPattern(parser, context, args);
          if (parser.token === 16777234)
              tolerant(parser, context, 86);
          return finishNode(context, parser, pos, {
              type: 'RestElement',
              argument,
          });
      }
      function AssignmentRestProperty(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 14);
          const { token } = parser;
          const argument = parseBindingIdentifierOrPattern(parser, context);
          if (hasBit(token, 8388608))
              tolerant(parser, context, 92);
          if (parser.token === 16777234)
              tolerant(parser, context, 86);
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
                  properties.push(AssignmentRestProperty(parser, context));
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
                      tolerant(parser, context, 47);
                  if (!isValidIdentifier(context, token))
                      tolerant(parser, context, 44);
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
                  tolerant(parser, context, 20);
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
              tolerant(parser, context, 47);
          if (context & 131072 && token & 131072)
              tolerant(parser, context, 46);
          if (token !== 50331659) {
              id = parseBindingIdentifier(parser, context);
          }
          else if (!(context & 16777216))
              tolerant(parser, context, 37);
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
                          tolerant(parser, context, 23, tokenDesc(parser.token));
                      }
                  }
                  else
                      tolerant(parser, context, 23, tokenDesc(parser.token));
              }
          }
          else if (!(parser.token & 1048576) && (isConst || isBindingPattern)) {
              tolerant(parser, context, 22, isConst ? 'const' : 'destructuring');
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
              tolerant(parser, context, 24, tokenDesc(parser.token));
          }
          return list;
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
                      tolerant(parser, context, 32, tokenDesc(parser.token));
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
                      tolerant(parser, context, 33);
                  }
                  return parseExpressionOrLabelledStatement(parser, context | 2097152);
              case 33566808:
                  tolerant(parser, context, context & 4096 ? 17 : 18);
              case 33566797:
                  tolerant(parser, context, 19, tokenDesc(parser.token));
              default:
                  return parseExpressionOrLabelledStatement(parser, context);
          }
      }
      function parseEmptyStatement(parser, context) {
          const pos = getLocation(parser);
          nextToken(parser, context);
          return finishNode(context, parser, pos, {
              type: 'EmptyStatement',
          });
      }
      function parseContinueStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 12366);
          if (!(parser.flags & 48)) {
              tolerant(parser, context, 28, tokenDesc(parser.token));
          }
          let label = null;
          const { tokenValue } = parser;
          if (!(parser.flags & 1) && (parser.token & (65536 | 4096))) {
              label = parseIdentifier(parser, context);
              validateBreakOrContinueLabel(parser, context, tokenValue, true);
          }
          consumeSemicolon(parser, context);
          return finishNode(context, parser, pos, {
              type: 'ContinueStatement',
              label,
          });
      }
      function parseBreakStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 12362);
          let label = null;
          const { tokenValue } = parser;
          if (!(parser.flags & 1) && (parser.token & (65536 | 4096))) {
              label = parseIdentifier(parser, context);
              validateBreakOrContinueLabel(parser, context, tokenValue, false);
          }
          else if (!(parser.flags & 48)) {
              tolerant(parser, context, 28, 'break');
          }
          consumeSemicolon(parser, context);
          return finishNode(context, parser, pos, {
              type: 'BreakStatement',
              label,
          });
      }
      function parseIfStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 12377);
          expect(parser, context, 50331659);
          const test = parseExpression(parser, context & ~1073741824 | 65536);
          expect(parser, context, 16);
          const consequent = parseConsequentOrAlternate(parser, context | 536870912);
          const alternate = consume(parser, context, 12370) ? parseConsequentOrAlternate(parser, context) : null;
          return finishNode(context, parser, pos, {
              type: 'IfStatement',
              test,
              consequent,
              alternate,
          });
      }
      function parseConsequentOrAlternate(parser, context) {
          return context & 4096 || parser.token !== 33566808 ?
              parseStatement(parser, context & ~2097152) :
              parseFunctionDeclaration(parser, context);
      }
      function parseDebuggerStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 12367);
          consumeSemicolon(parser, context);
          return finishNode(context, parser, pos, {
              type: 'DebuggerStatement',
          });
      }
      function parseTryStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 12385);
          const block = parseBlockStatement(parser, context);
          const handler = parser.token === 12364 ? parseCatchBlock(parser, context) : null;
          const finalizer = consume(parser, context, 12373) ? parseBlockStatement(parser, context) : null;
          if (!handler && !finalizer)
              tolerant(parser, context, 77);
          return finishNode(context, parser, pos, {
              type: 'TryStatement',
              block,
              handler,
              finalizer,
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
              body,
          });
      }
      function parseThrowStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 302002272);
          if (parser.flags & 1)
              tolerant(parser, context, 78);
          const argument = parseExpression(parser, context & ~1073741824 | 65536);
          consumeSemicolon(parser, context);
          return finishNode(context, parser, pos, {
              type: 'ThrowStatement',
              argument,
          });
      }
      function parseExpressionStatement(parser, context) {
          const pos = getLocation(parser);
          const expr = parseExpression(parser, context & ~1073741824 | 65536);
          consumeSemicolon(parser, context);
          return finishNode(context, parser, pos, {
              type: 'ExpressionStatement',
              expression: expr,
          });
      }
      function parseDirective(parser, context) {
          const pos = getLocation(parser);
          const directive = parser.tokenRaw.slice(1, -1);
          const expr = parseExpression(parser, context & ~1073741824 | 65536);
          consumeSemicolon(parser, context);
          return finishNode(context, parser, pos, {
              type: 'ExpressionStatement',
              expression: expr,
              directive,
          });
      }
      function parseExpressionOrLabelledStatement(parser, context) {
          const pos = getLocation(parser);
          const { tokenValue, token } = parser;
          const expr = parseExpression(parser, context & ~(2097152 | 1073741824) | 65536);
          if (token & (65536 | 4096) && parser.token === 16777237) {
              if (context & 262144 && token & 1073741824)
                  tolerant(parser, context, 55);
              expect(parser, context, 16777237, 81);
              if (hasLabel(parser, tokenValue))
                  tolerant(parser, context, 27, tokenValue);
              addLabel(parser, tokenValue);
              let body;
              if (!(context & 4096) && (context & 2097152) && parser.token === 33566808) {
                  body = parseFunctionDeclaration(parser, context);
              }
              else {
                  body = parseStatement(parser, context);
              }
              popLabel(parser, tokenValue);
              return finishNode(context, parser, pos, {
                  type: 'LabeledStatement',
                  label: expr,
                  body,
              });
          }
          consumeSemicolon(parser, context);
          return finishNode(context, parser, pos, {
              type: 'ExpressionStatement',
              expression: expr,
          });
      }
      function parseDoWhileStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 12369);
          const body = parseIterationStatement(parser, context);
          expect(parser, context, 12402);
          expect(parser, context, 50331659);
          const test = parseExpression(parser, context & ~1073741824 | 65536);
          expect(parser, context, 16);
          consume(parser, context, 17301521);
          return finishNode(context, parser, pos, {
              type: 'DoWhileStatement',
              body,
              test,
          });
      }
      function parseWhileStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 12402);
          expect(parser, context, 50331659);
          const test = parseExpression(parser, context & ~1073741824 | 65536);
          expect(parser, context, 16);
          const body = parseIterationStatement(parser, context);
          return finishNode(context, parser, pos, {
              type: 'WhileStatement',
              test,
              body,
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
              body,
          });
      }
      function parseReturnStatement(parser, context) {
          const pos = getLocation(parser);
          if (!(context & (32 | 1048576))) {
              tolerant(parser, context, 16);
          }
          if (parser.flags & 32768)
              tolerant(parser, context, 2);
          expect(parser, context, 12380);
          const argument = !(parser.token & 524288) && !(parser.flags & 1) ?
              parseExpression(parser, context & ~(1048576 | 1073741824) | 65536) :
              null;
          consumeSemicolon(parser, context);
          return finishNode(context, parser, pos, {
              type: 'ReturnStatement',
              argument,
          });
      }
      function parseIterationStatement(parser, context) {
          const savedFlags = parser.flags;
          parser.flags |= 32 | 4;
          const body = parseStatement(parser, context & ~2097152 | 536870912);
          parser.flags = savedFlags;
          return body;
      }
      function parseWithStatement(parser, context) {
          if (context & 4096)
              tolerant(parser, context, 35);
          const pos = getLocation(parser);
          expect(parser, context, 12387);
          expect(parser, context, 50331659);
          const object = parseExpression(parser, context & ~1073741824 | 65536);
          expect(parser, context, 16);
          const body = parseStatement(parser, context & ~2097152);
          return finishNode(context, parser, pos, {
              type: 'WithStatement',
              object,
              body,
          });
      }
      function parseSwitchStatement(parser, context) {
          const pos = getLocation(parser);
          expect(parser, context, 33566814);
          expect(parser, context, 50331659);
          const discriminant = parseExpression(parser, context & ~1073741824 | 65536);
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
                      tolerant(parser, context, 31);
                  seenDefault = true;
              }
          }
          parser.flags = savedFlags;
          expect(parser, context, 17301519);
          return finishNode(context, parser, pos, {
              type: 'SwitchStatement',
              discriminant,
              cases,
          });
      }
      function parseCaseOrDefaultClauses(parser, context) {
          const pos = getLocation(parser);
          let test = null;
          if (consume(parser, context, 12363)) {
              test = parseExpression(parser, context & ~1073741824 | 65536);
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
              consequent,
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
              kind: tokenDesc(token),
              declarations,
          });
      }
      function parseLetOrExpressionStatement(parser, context, shouldConsume = true) {
          return lookahead(parser, context, isLexical) ?
              parseVariableStatement(parser, context | 4194304, shouldConsume) :
              parseExpressionOrLabelledStatement(parser, context);
      }
      function parseAsyncFunctionDeclarationOrStatement(parser, context) {
          return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine) ?
              parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context) :
              parseStatement(parser, context);
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
              variableStatement = parseVariableStatement(parser, context & ~65536 | 4194304, false);
          }
          else if (token === 33566791) {
              variableStatement = parseVariableStatement(parser, context & ~65536, false);
          }
          else if (token !== 17301521) {
              sequencePos = getLocation(parser);
              init = restoreExpressionCoverGrammar(parser, context & ~65536 | 536870912, parseAssignmentExpression);
          }
          if (consume(parser, context, 1085554)) {
              type = 'ForOfStatement';
              if (init) {
                  if (!(parser.flags & 4) || init.type === 'AssignmentExpression') {
                      tolerant(parser, context, 71);
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
                      tolerant(parser, context, 71);
                  reinterpret(parser, context, init);
              }
              else
                  init = variableStatement;
              type = 'ForInStatement';
              right = parseExpression(parser, context & ~1073741824 | 65536);
          }
          else {
              if (parser.token === 16777234)
                  init = parseSequenceExpression(parser, context, init, sequencePos);
              if (variableStatement)
                  init = variableStatement;
              expect(parser, context, 17301521);
              test = parser.token !== 17301521 ? parseExpression(parser, context & ~1073741824 | 65536) : null;
              expect(parser, context, 17301521);
              update = parser.token !== 16 ? parseExpression(parser, context & ~1073741824 | 65536) : null;
          }
          expect(parser, context, 16);
          const body = parseIterationStatement(parser, context);
          return finishNode(context, parser, pos, type === 'ForOfStatement' ? {
              type,
              body,
              left: init,
              right,
              await: awaitToken,
          } : right ? {
              type,
              body,
              left: init,
              right,
          } : {
              type,
              body,
              init,
              test,
              update,
          });
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
                          tolerant(parser, context, 44);
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
                  report(parser, 1, tokenDesc(parser.token));
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
                                  tolerant(parser, context, 1, tokenDesc(parser.token));
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
                  report(parser, 1, tokenDesc(parser.token));
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
                  tolerant(parser, context, 44);
              if (hasBit(token, 4194304))
                  tolerant(parser, context, 45);
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
              report(parser, 1, tokenDesc(parser.token));
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
              body,
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



      var estree = /*#__PURE__*/Object.freeze({

      });
      exports('ESTree', estree);



      var index = /*#__PURE__*/Object.freeze({
        parseClassDeclaration: parseClassDeclaration,
        parseFunctionDeclaration: parseFunctionDeclaration,
        parseAsyncFunctionOrAsyncGeneratorDeclaration: parseAsyncFunctionOrAsyncGeneratorDeclaration,
        parseVariableDeclarationList: parseVariableDeclarationList,
        parseExpression: parseExpression,
        parseSequenceExpression: parseSequenceExpression,
        parseAssignmentExpression: parseAssignmentExpression,
        parseRestElement: parseRestElement,
        parseLeftHandSideExpression: parseLeftHandSideExpression,
        parsePrimaryExpression: parsePrimaryExpression,
        parseIdentifier: parseIdentifier,
        parseLiteral: parseLiteral,
        parseBigIntLiteral: parseBigIntLiteral,
        parseIdentifierName: parseIdentifierName,
        parseFunctionExpression: parseFunctionExpression,
        parseAsyncFunctionOrAsyncGeneratorExpression: parseAsyncFunctionOrAsyncGeneratorExpression,
        parsePropertyName: parsePropertyName,
        parseObjectLiteral: parseObjectLiteral,
        parseFormalListAndBody: parseFormalListAndBody,
        parseFunctionBody: parseFunctionBody,
        parseFormalParameters: parseFormalParameters,
        parseFormalParameterList: parseFormalParameterList,
        parseClassBodyAndElementList: parseClassBodyAndElementList,
        parseClassElement: parseClassElement,
        parseDecorators: parseDecorators,
        parseModuleItemList: parseModuleItemList,
        parseModuleItem: parseModuleItem,
        parseExportDeclaration: parseExportDeclaration,
        parseImportDeclaration: parseImportDeclaration,
        createParser: createParser,
        parse: parse,
        parseStatementList: parseStatementList,
        parseBindingIdentifierOrPattern: parseBindingIdentifierOrPattern,
        parseBindingIdentifier: parseBindingIdentifier,
        parseAssignmentPattern: parseAssignmentPattern,
        parseStatementListItem: parseStatementListItem,
        parseStatement: parseStatement,
        parseEmptyStatement: parseEmptyStatement,
        parseContinueStatement: parseContinueStatement,
        parseBreakStatement: parseBreakStatement,
        parseIfStatement: parseIfStatement,
        parseDebuggerStatement: parseDebuggerStatement,
        parseTryStatement: parseTryStatement,
        parseCatchBlock: parseCatchBlock,
        parseThrowStatement: parseThrowStatement,
        parseExpressionStatement: parseExpressionStatement,
        parseDirective: parseDirective,
        parseExpressionOrLabelledStatement: parseExpressionOrLabelledStatement,
        parseDoWhileStatement: parseDoWhileStatement,
        parseWhileStatement: parseWhileStatement,
        parseBlockStatement: parseBlockStatement,
        parseReturnStatement: parseReturnStatement,
        parseIterationStatement: parseIterationStatement,
        parseWithStatement: parseWithStatement,
        parseSwitchStatement: parseSwitchStatement,
        parseCaseOrDefaultClauses: parseCaseOrDefaultClauses,
        parseVariableStatement: parseVariableStatement,
        parseJSXRootElement: parseJSXRootElement,
        parseJSXOpeningElement: parseJSXOpeningElement,
        nextJSXToken: nextJSXToken,
        scanJSXToken: scanJSXToken,
        parseJSXText: parseJSXText,
        parseJSXAttributes: parseJSXAttributes,
        parseJSXSpreadAttribute: parseJSXSpreadAttribute,
        parseJSXNamespacedName: parseJSXNamespacedName,
        parseJSXAttributeName: parseJSXAttributeName,
        parseJSXAttribute: parseJSXAttribute,
        parseJSXEmptyExpression: parseJSXEmptyExpression,
        parseJSXSpreadChild: parseJSXSpreadChild,
        parseJSXExpressionContainer: parseJSXExpressionContainer,
        parseJSXExpression: parseJSXExpression,
        parseJSXClosingFragment: parseJSXClosingFragment,
        parseJSXClosingElement: parseJSXClosingElement,
        parseJSXIdentifier: parseJSXIdentifier,
        parseJSXMemberExpression: parseJSXMemberExpression,
        parseJSXElementName: parseJSXElementName,
        scanJSXIdentifier: scanJSXIdentifier
      });
      exports('Parser', index);



      var index$1 = /*#__PURE__*/Object.freeze({
        scanIdentifier: scanIdentifier,
        scanMaybeIdentifier: scanMaybeIdentifier,
        scanHexIntegerLiteral: scanHexIntegerLiteral,
        scanOctalOrBinary: scanOctalOrBinary,
        scanImplicitOctalDigits: scanImplicitOctalDigits,
        scanSignedInteger: scanSignedInteger,
        scanNumericLiteral: scanNumericLiteral,
        scanNumericSeparator: scanNumericSeparator,
        scanDecimalDigitsOrSeparator: scanDecimalDigitsOrSeparator,
        scanDecimalAsSmi: scanDecimalAsSmi,
        scanRegularExpression: scanRegularExpression,
        scan: scan,
        scanEscapeSequence: scanEscapeSequence,
        throwStringError: throwStringError,
        scanString: scanString,
        consumeTemplateBrace: consumeTemplateBrace,
        scanTemplate: scanTemplate,
        skipSingleHTMLComment: skipSingleHTMLComment,
        skipSingleLineComment: skipSingleLineComment,
        skipMultiLineComment: skipMultiLineComment,
        addComment: addComment
      });
      exports('Scanner', index$1);

      function parseScript(source, options) {
          return parse(source, options, 0);
      }
      function parseModule(source, options) {
          return parse(source, options, 4096 | 8192);
      }
      const version = exports('version', '1.5.7');

    }
  };
});
