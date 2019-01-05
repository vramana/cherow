System.register('cherow', [], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      exports({
        parseSource: parseSource,
        parse: parse,
        parseModule: parseModule,
        parseScript: parseScript,
        validateRegExp: validateRegExp,
        constructError: constructError,
        report: report,
        isIDContinue: isIDContinue,
        isIDStart: isIDStart,
        mustEscape: mustEscape,
        finishNode: finishNode,
        getLocation: getLocation,
        optional: optional,
        expect: expect,
        nextTokenIsLeftParenOrPeriod: nextTokenIsLeftParenOrPeriod,
        nextTokenIsIdentifierOrLeftParen: nextTokenIsIdentifierOrLeftParen,
        nextTokenIsFuncKeywordOnSameLine: nextTokenIsFuncKeywordOnSameLine,
        isLexical: isLexical,
        consumeSemicolon: consumeSemicolon,
        isStartOfExpression: isStartOfExpression,
        addLabel: addLabel,
        addCrossingBoundary: addCrossingBoundary,
        validateContinueLabel: validateContinueLabel,
        validateBreakStatement: validateBreakStatement,
        getLabel: getLabel,
        reinterpret: reinterpret,
        isEqualTagNames: isEqualTagNames
      });

      class State {
          constructor(source, onToken, onComment) {
              this.index = 0;
              this.lastIndex = 0;
              this.startIndex = 0;
              this.line = 1;
              this.lastLine = 0;
              this.startLine = 0;
              this.column = 0;
              this.lastColumn = 0;
              this.startColumn = 0;
              this.source = source || '';
              this.length = source.length;
              this.flags = 0;
              this.tokenValue = '';
              this.nextChar = source.charCodeAt(0);
              this.token = 65536;
              this.tokenRaw = null;
              this.tokenRegExp = undefined;
              this.onToken = onToken;
              this.onComment = onComment;
              this.commentStart = 0;
              this.commentType = undefined;
              this.capturingParens = 0;
              this.largestBackReference = 0;
              this.assignable = true;
              this.destructible = true;
              this.labelSet = undefined;
              this.labelSetStack = [];
              this.iterationStack = [];
              this.labelDepth = 0;
              this.switchStatement = 0;
              this.iterationStatement = 0;
              this.functionBoundaryStack = undefined;
          }
      }

      const KeywordDescTable = exports('KeywordDescTable', [
          'end of source',
          'false', 'true', 'null',
          'template head', 'template body', 'template tail',
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
          'arguments', 'eval',
          'at',
          '#',
          'implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'yield',
          'as', 'async', 'await', 'constructor', 'get', 'set', 'from', 'of',
          'SingleComment', 'MultiComment', 'HTMLComment',
          'space', 'tab', 'line feed', 'carrige return',
          'bigInt',
          'enum',
          'escaped strict reserved', 'escaped keyword',
          'JSXText', 'JSXIdentifier'
      ]);
      const descKeywordTable = exports('descKeywordTable', {
          this: 8283,
          function: 8276,
          if: 8277,
          return: 8280,
          var: 8260,
          else: 8271,
          for: 8275,
          new: 8279,
          in: 301999918,
          typeof: 570433575,
          while: 8286,
          case: 8264,
          break: 8263,
          try: 8285,
          catch: 8265,
          delete: 570433576,
          throw: 8284,
          switch: 8282,
          continue: 8267,
          default: 8269,
          instanceof: 301999919,
          do: 8270,
          void: 570433577,
          finally: 8274,
          arguments: 8388704,
          async: 4205,
          await: 4206,
          class: 8266,
          const: 8262,
          constructor: 4207,
          debugger: 8268,
          enum: 8316,
          eval: 8388705,
          export: 8272,
          extends: 8273,
          false: 8193,
          from: 4210,
          get: 4208,
          implements: 16484,
          import: 8278,
          interface: 16485,
          let: 16453,
          null: 8195,
          of: 4211,
          package: 16486,
          private: 16487,
          protected: 16488,
          public: 16489,
          set: 4209,
          static: 16490,
          super: 8281,
          true: 8194,
          with: 8287,
          yield: 16491,
          as: 4204,
      });

      function isIDContinue(code) {
          return (unicodeLookup[(code >>> 5) + 0] >>> code & 31 & 1) !== 0;
      }
      function isIDStart(code) {
          return (unicodeLookup[(code >>> 5) + 34816] >>> code & 31 & 1) !== 0;
      }
      function mustEscape(code) {
          return (unicodeLookup[(code >>> 5) + 69632] >>> code & 31 & 1) !== 0;
      }
      const unicodeLookup = exports('unicodeLookup', ((compressed, lookup) => {
          const result = new Uint32Array(104448);
          let index = 0;
          let subIndex = 0;
          while (index < 3392) {
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
      })([-1, 2, 28, 2, 29, 2, 5, -1, 0, 77595648, 3, 46, 2, 3, 0, 14, 2, 57, 2, 58, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 59, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 15, 2, 60, 2, 0, 0, 4294836735, 0, 3221225471, 0, 4294901942, 2, 61, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 17, 2, 0, 0, 4294961151, 3, 0, 2, 2, 20, 2, 0, 0, 608174079, 2, 0, 2, 127, 2, 6, 2, 62, -1, 2, 64, 2, 26, 2, 1, 3, 0, 3, 0, 4294901711, 2, 40, 0, 4089839103, 0, 2961209759, 0, 1342439375, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2965387679, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 2, 171, 0, 4294828031, 0, 3825204735, 0, 123747807, 0, 65487, 2, 3, 0, 4092591615, 0, 1080049119, 0, 458703, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247020, 2, 68, 0, 4284449919, 0, 851904, 2, 4, 2, 16, 0, 67076095, -1, 2, 69, 0, 1006628014, 0, 4093591391, -1, 0, 50331649, 0, 3265266687, 2, 34, 0, 4294844415, 0, 4278190047, 2, 23, 2, 125, -1, 3, 0, 2, 2, 33, 2, 0, 2, 9, 2, 0, 2, 13, 2, 14, 3, 0, 10, 2, 71, 2, 0, 2, 72, 2, 73, 2, 74, 2, 0, 2, 75, 2, 0, 2, 10, 0, 261632, 2, 19, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 76, 2, 5, 3, 0, 2, 2, 77, 0, 2088959, 2, 31, 2, 8, 0, 909311, 3, 0, 2, 0, 814743551, 2, 42, 0, 67057664, 3, 0, 2, 2, 45, 2, 0, 2, 32, 2, 0, 2, 18, 2, 7, 0, 268374015, 2, 30, 2, 51, 2, 0, 2, 78, 0, 134153215, -1, 2, 6, 2, 0, 2, 7, 0, 2684354559, 0, 67044351, 0, 1073676416, -2, 3, 0, 2, 2, 43, 0, 1046528, 3, 0, 3, 2, 8, 2, 0, 2, 41, 0, 4294960127, 2, 9, 2, 39, 2, 10, 0, 4294377472, 2, 21, 3, 0, 7, 0, 4227858431, 3, 0, 8, 2, 11, 2, 0, 2, 80, 2, 9, 2, 0, 2, 81, 2, 82, 2, 83, -1, 2, 122, 0, 1048577, 2, 84, 2, 12, -1, 2, 12, 0, 131042, 2, 85, 2, 86, 2, 87, 2, 0, 2, 35, -83, 2, 0, 2, 53, 2, 7, 3, 0, 4, 0, 1046559, 2, 0, 2, 13, 2, 0, 0, 2147516671, 2, 24, 3, 88, 2, 2, 0, -16, 2, 89, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 2, 0, 2, 14, 2, 79, 2, 15, 3, 0, 2, 2, 49, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 70, -1, 2, 17, 2, 9, 3, 0, 8, 2, 91, 2, 119, 2, 0, 0, 3220242431, 3, 0, 3, 2, 20, 2, 22, 2, 92, 3, 0, 2, 2, 93, 2, 21, -1, 2, 22, 2, 0, 2, 27, 2, 0, 2, 8, 3, 0, 2, 0, 67043391, 0, 3909091327, 2, 0, 2, 25, 2, 8, 2, 23, 3, 0, 2, 0, 67076097, 2, 7, 2, 0, 2, 24, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 97, 2, 98, 2, 14, 2, 95, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 99, 2, 100, 2, 6, -264, 3, 0, 11, 2, 25, 3, 0, 2, 2, 21, -1, 0, 3774349439, 2, 101, 2, 102, 3, 0, 2, 2, 20, 2, 26, 3, 0, 10, 2, 9, 2, 17, 2, 0, 2, 47, 2, 0, 2, 27, 2, 103, 2, 19, 0, 1638399, 2, 169, 2, 104, 3, 0, 3, 2, 23, 2, 28, 2, 29, 2, 5, 2, 30, 2, 0, 2, 7, 2, 105, -1, 2, 106, 2, 107, 2, 108, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -3, 2, 146, -4, 2, 23, 2, 0, 2, 37, 0, 1, 2, 0, 2, 63, 2, 32, 2, 16, 2, 9, 2, 0, 2, 109, -1, 3, 0, 4, 2, 9, 2, 33, 2, 110, 2, 6, 2, 0, 2, 111, 2, 0, 2, 50, -4, 3, 0, 9, 2, 24, 2, 18, 2, 27, -4, 2, 112, 2, 113, 2, 18, 2, 24, 2, 7, -2, 2, 114, 2, 18, 2, 21, -2, 2, 0, 2, 115, -2, 0, 4277137519, 0, 2269118463, -1, 3, 23, 2, -1, 2, 34, 2, 38, 2, 0, 3, 18, 2, 2, 36, 2, 20, -3, 3, 0, 2, 2, 35, -1, 2, 0, 2, 36, 2, 0, 2, 36, 2, 0, 2, 48, -14, 2, 23, 2, 44, 2, 37, -5, 3, 0, 2, 2, 38, 0, 2147549120, 2, 0, 2, 16, 2, 17, 2, 130, 2, 0, 2, 52, 0, 4294901872, 0, 5242879, 3, 0, 2, 0, 402595359, -1, 2, 118, 0, 1090519039, -2, 2, 120, 2, 39, 2, 0, 2, 55, 2, 40, 0, 4226678271, 0, 3766565279, 0, 2039759, -4, 3, 0, 2, 0, 1140787199, -1, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 41, 2, 42, -1, 2, 10, 2, 43, -6, 2, 0, 2, 16, -3, 3, 0, 2, 0, 2147484671, -8, 2, 0, 2, 7, 2, 44, 2, 0, 0, 603979727, -1, 2, 0, 2, 45, -8, 2, 54, 2, 46, 0, 67043329, 2, 123, 2, 47, 0, 8388351, -2, 2, 124, 0, 3028287487, 2, 48, 2, 126, 0, 33259519, 2, 42, -9, 2, 24, -8, 3, 0, 28, 2, 21, -3, 3, 0, 3, 2, 49, 3, 0, 6, 2, 50, -85, 3, 0, 33, 2, 49, -126, 3, 0, 18, 2, 38, -269, 3, 0, 17, 2, 45, 2, 7, 2, 42, -2, 2, 17, 2, 51, 2, 0, 2, 24, 0, 67043343, 2, 128, 2, 19, -21, 3, 0, 2, -4, 3, 0, 2, 0, 4294901791, 2, 7, 2, 164, -2, 0, 3, 3, 0, 191, 2, 20, 3, 0, 23, 2, 36, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 129, 0, 1677656575, -166, 0, 4161266656, 0, 4071, 0, 15360, -4, 0, 28, -13, 3, 0, 2, 2, 52, 2, 0, 2, 131, 2, 132, 2, 56, 2, 0, 2, 133, 2, 134, 2, 135, 3, 0, 10, 2, 136, 2, 137, 2, 14, 3, 52, 2, 3, 53, 2, 3, 54, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 90, 2, 0, 0, 2105343, 0, 4160749584, 0, 65534, -42, 0, 4194303871, 0, 2011, -62, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 55, -37, 2, 56, 2, 140, 2, 141, 2, 142, 2, 143, 2, 144, -138, 3, 0, 1334, 2, 24, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 9, 3, 0, 180, 2, 145, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 9, -22583, 3, 0, 7, 2, 19, -6130, 3, 5, 2, -1, 0, 69207040, 3, 46, 2, 3, 0, 14, 2, 57, 2, 58, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 59, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 15, 2, 60, 2, 0, 2, 35, -1, 2, 17, 2, 61, -1, 2, 0, 2, 62, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 19, 2, 63, 3, 0, 2, 0, 131135, 2, 94, 0, 70256639, 0, 71303167, 0, 272, 2, 45, 2, 62, -1, 2, 64, -2, 2, 96, 0, 603979775, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 65, 2, 66, 0, 33554435, 2, 121, 2, 65, 2, 147, 0, 131075, 0, 3594373096, 0, 67094296, 2, 66, -1, 2, 67, 0, 603979263, 2, 156, 0, 3, 0, 4294828001, 0, 602930687, 2, 180, 0, 393219, 2, 67, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 68, 2, 38, -1, 2, 4, 0, 917503, 2, 38, -1, 2, 69, 0, 537783470, 0, 4026531935, -1, 0, 1, -1, 2, 34, 2, 70, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 13, 2, 14, 3, 0, 10, 2, 71, 2, 0, 2, 72, 2, 73, 2, 74, 2, 0, 2, 75, 2, 0, 2, 16, -1, 2, 19, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 76, 2, 5, 3, 0, 2, 2, 77, 0, 253951, 3, 20, 2, 0, 122879, 2, 0, 2, 8, 0, 276824064, -2, 3, 0, 2, 2, 45, 2, 0, 0, 4294903295, 2, 0, 2, 18, 2, 7, -1, 2, 17, 2, 51, 2, 0, 2, 78, 2, 42, -1, 2, 24, 2, 0, 2, 31, -2, 0, 128, -2, 2, 79, 2, 8, 0, 4064, -1, 2, 117, 0, 4227907585, 2, 0, 2, 116, 2, 0, 2, 50, 2, 196, 2, 9, 2, 39, 2, 10, -1, 0, 6544896, 3, 0, 6, -2, 3, 0, 8, 2, 11, 2, 0, 2, 80, 2, 9, 2, 0, 2, 81, 2, 82, 2, 83, -3, 2, 84, 2, 12, -3, 2, 85, 2, 86, 2, 87, 2, 0, 2, 35, -83, 2, 0, 2, 53, 2, 7, 3, 0, 4, 0, 817183, 2, 0, 2, 13, 2, 0, 0, 33023, 2, 24, 3, 88, 2, -17, 2, 89, 0, 524157950, 2, 4, 2, 0, 2, 90, 2, 4, 2, 0, 2, 14, 2, 79, 2, 15, 3, 0, 2, 2, 49, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 70, -1, 2, 17, 2, 9, 3, 0, 8, 2, 91, 0, 3072, 2, 0, 0, 2147516415, 2, 9, 3, 0, 2, 2, 19, 2, 22, 2, 92, 3, 0, 2, 2, 93, 2, 21, -1, 2, 22, 0, 4294965179, 0, 7, 2, 0, 2, 8, 2, 92, 2, 8, -1, 0, 1761345536, 2, 94, 2, 95, 2, 38, 2, 23, 2, 96, 2, 36, 2, 162, 0, 2080440287, 2, 0, 2, 35, 2, 138, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 97, 2, 98, 2, 14, 2, 95, 3, 0, 3, 0, 7, 3, 0, 349, 2, 99, 2, 100, 2, 6, -264, 3, 0, 11, 2, 25, 3, 0, 2, 2, 21, -1, 0, 2700607615, 2, 101, 2, 102, 3, 0, 2, 2, 20, 2, 26, 3, 0, 10, 2, 9, 2, 17, 2, 0, 2, 47, 2, 0, 2, 27, 2, 103, -3, 2, 104, 3, 0, 3, 2, 23, -1, 3, 5, 2, 2, 30, 2, 0, 2, 7, 2, 105, -1, 2, 106, 2, 107, 2, 108, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -8, 2, 23, 2, 0, 2, 37, -1, 2, 0, 2, 63, 2, 32, 2, 18, 2, 9, 2, 0, 2, 109, -1, 3, 0, 4, 2, 9, 2, 17, 2, 110, 2, 6, 2, 0, 2, 111, 2, 0, 2, 50, -4, 3, 0, 9, 2, 24, 2, 18, 2, 27, -4, 2, 112, 2, 113, 2, 18, 2, 24, 2, 7, -2, 2, 114, 2, 18, 2, 21, -2, 2, 0, 2, 115, -2, 0, 4277075969, 2, 18, -1, 3, 23, 2, -1, 2, 34, 2, 139, 2, 0, 3, 18, 2, 2, 36, 2, 20, -3, 3, 0, 2, 2, 35, -1, 2, 0, 2, 36, 2, 0, 2, 36, 2, 0, 2, 50, -14, 2, 23, 2, 44, 2, 116, -5, 2, 117, 2, 41, -2, 2, 117, 2, 19, 2, 17, 2, 35, 2, 117, 2, 38, 0, 4294901776, 0, 4718591, 2, 117, 2, 36, 0, 335544350, -1, 2, 118, 2, 119, -2, 2, 120, 2, 39, 2, 7, -1, 2, 121, 2, 65, 0, 3758161920, 0, 3, -4, 2, 0, 2, 31, 2, 174, -1, 2, 0, 2, 19, 0, 176, -5, 2, 0, 2, 49, 2, 182, -1, 2, 0, 2, 19, 2, 194, -1, 2, 0, 2, 62, -2, 2, 16, -7, 2, 0, 2, 119, -3, 3, 0, 2, 2, 122, -8, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 536871887, -1, 2, 0, 2, 45, -8, 2, 54, 2, 49, 0, 1, 2, 123, 2, 19, -3, 2, 124, 2, 37, 2, 125, 2, 126, 0, 16778239, -10, 2, 36, -8, 3, 0, 28, 2, 21, -3, 3, 0, 3, 2, 49, 3, 0, 6, 2, 50, -85, 3, 0, 33, 2, 49, -126, 3, 0, 18, 2, 38, -269, 3, 0, 17, 2, 45, 2, 7, -3, 2, 17, 2, 127, 2, 0, 2, 19, 2, 50, 2, 128, 2, 19, -21, 3, 0, 2, -4, 3, 0, 2, 0, 65567, -1, 2, 26, -2, 0, 3, 3, 0, 191, 2, 20, 3, 0, 23, 2, 36, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 129, 2, 130, -187, 3, 0, 2, 2, 52, 2, 0, 2, 131, 2, 132, 2, 56, 2, 0, 2, 133, 2, 134, 2, 135, 3, 0, 10, 2, 136, 2, 137, 2, 14, 3, 52, 2, 3, 53, 2, 3, 54, 2, 2, 138, -129, 3, 0, 6, 2, 139, -1, 3, 0, 2, 2, 50, -37, 2, 56, 2, 140, 2, 141, 2, 142, 2, 143, 2, 144, -138, 3, 0, 1334, 2, 24, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 9, 3, 0, 180, 2, 145, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 9, -28719, 2, 0, 0, 1, -1, 2, 122, 2, 0, 0, 8193, -21, 0, 50331648, 0, 10255, 0, 4, -11, 2, 66, 2, 168, -1, 0, 71680, -1, 2, 157, 0, 4292900864, 0, 805306431, -5, 2, 146, -1, 2, 176, -1, 0, 6144, -2, 2, 123, -1, 2, 150, -1, 2, 153, 2, 147, 2, 161, 2, 0, 0, 3223322624, 2, 36, 0, 4, -4, 2, 188, 0, 205128192, 0, 1333757536, 0, 2147483696, 0, 423953, 0, 747766272, 0, 2717763192, 0, 4286578751, 0, 278545, 2, 148, 0, 4294886464, 0, 33292336, 0, 417809, 2, 148, 0, 1329579616, 0, 4278190128, 0, 700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 149, 0, 469762560, 0, 4171219488, 0, 16711728, 2, 149, 0, 202375680, 0, 3214918176, 0, 4294508592, 0, 139280, -1, 0, 983584, 2, 190, 0, 58720275, 0, 3489923072, 0, 10517376, 0, 4293066815, 0, 1, 0, 2013265920, 2, 175, 2, 0, 0, 17816169, 0, 3288339281, 0, 201375904, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2, 146, 0, 4160757760, 2, 0, -6, 2, 163, -11, 0, 3263218176, -1, 0, 49664, 0, 2160197632, 0, 8388802, -1, 0, 12713984, -1, 2, 150, 2, 155, 2, 158, -2, 2, 159, -20, 0, 3758096385, -2, 2, 151, 0, 4292878336, 2, 22, 2, 166, 0, 4294057984, -2, 2, 160, 2, 152, 2, 172, -2, 2, 151, -1, 2, 179, -1, 2, 167, 2, 122, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 154, 0, 939588608, -1, 0, 805306368, -1, 2, 122, 0, 1610612736, 2, 152, 2, 153, 3, 0, 2, -2, 2, 154, 2, 155, -3, 0, 267386880, -1, 2, 156, 0, 7168, -1, 0, 65024, 2, 150, 2, 157, 2, 158, -7, 2, 165, -8, 2, 159, -1, 0, 1426112704, 2, 160, -1, 2, 185, 0, 271581216, 0, 2149777408, 2, 19, 2, 157, 2, 122, 0, 851967, 0, 3758129152, -1, 2, 19, 2, 178, -4, 2, 154, -20, 2, 192, 2, 161, -56, 0, 3145728, 2, 184, -1, 2, 191, 2, 122, -1, 2, 162, 2, 122, -4, 0, 32505856, -1, 2, 163, -1, 0, 2147385088, 2, 22, 1, 2155905152, 2, -3, 2, 164, 2, 0, 2, 165, -2, 2, 166, -6, 2, 167, 0, 4026597375, 0, 1, -1, 0, 1, -1, 2, 168, -3, 2, 139, 2, 66, -2, 2, 162, 2, 177, -1, 2, 173, 2, 122, -6, 2, 122, -213, 2, 167, -657, 2, 17, -36, 2, 169, -1, 2, 186, -10, 0, 4294963200, -5, 2, 170, -5, 2, 158, 2, 0, 2, 24, -1, 0, 4227919872, -1, 2, 170, -2, 0, 4227874752, -3, 0, 2146435072, 2, 155, -2, 0, 1006649344, 2, 122, -1, 2, 22, 0, 201375744, -3, 0, 134217720, 2, 22, 0, 4286677377, 0, 32896, -1, 2, 171, -3, 2, 172, -349, 2, 173, 2, 174, 2, 175, 3, 0, 264, -11, 2, 176, -2, 2, 158, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524284, -11, 2, 19, -1, 2, 183, -1, 2, 181, 0, 3221291007, 2, 158, -1, 0, 524288, 0, 2158720, -3, 2, 155, 0, 1, -4, 2, 122, 0, 3808625411, 0, 3489628288, 0, 4096, 0, 1207959680, 0, 3221274624, 2, 0, -3, 2, 177, 0, 120, 0, 7340032, -2, 0, 4026564608, 2, 4, 2, 19, 2, 160, 3, 0, 4, 2, 155, -1, 2, 178, 2, 175, -1, 0, 8176, 2, 179, 2, 177, 2, 180, -1, 0, 4290773232, 2, 0, -4, 2, 160, 2, 187, 0, 15728640, 2, 175, -1, 2, 157, -1, 0, 4294934512, 3, 0, 4, -9, 2, 22, 2, 167, 2, 181, 3, 0, 4, 0, 704, 0, 1849688064, 0, 4194304, -1, 2, 122, 0, 4294901887, 2, 0, 0, 130547712, 0, 1879048192, 0, 2080374784, 3, 0, 2, -1, 2, 182, 2, 183, -1, 0, 17829776, 0, 2025848832, 0, 4261477888, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 184, 0, 16252928, 0, 3791388672, 2, 39, 3, 0, 2, -2, 2, 193, 2, 0, -1, 2, 26, -1, 0, 66584576, -1, 2, 189, 3, 0, 9, 2, 122, 3, 0, 4, -1, 2, 157, 2, 158, 3, 0, 5, -2, 0, 245760, 0, 2147418112, -1, 2, 146, 2, 199, 0, 4227923456, -1, 2, 185, 2, 186, 2, 22, -2, 2, 176, 0, 4292870145, 0, 262144, 2, 122, 3, 0, 2, 0, 1073758848, 2, 187, -1, 0, 4227921920, 2, 188, 0, 68289024, 0, 528402016, 0, 4292927536, 3, 0, 4, -2, 0, 2483027968, 2, 0, -2, 2, 189, 3, 0, 5, -1, 2, 184, 2, 160, 2, 0, -2, 0, 4227923936, 2, 63, -1, 2, 170, 2, 94, 2, 0, 2, 150, 2, 154, 3, 0, 6, -1, 2, 175, 3, 0, 3, -2, 0, 2146959360, 3, 0, 8, -2, 2, 157, -1, 2, 190, 2, 117, -1, 2, 151, 3, 0, 8, 2, 191, 0, 8388608, 2, 171, 2, 169, 2, 183, 0, 4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 189, 0, 576, 0, 4261707776, 2, 94, 3, 0, 9, 2, 151, 3, 0, 8, -28, 2, 158, 3, 0, 3, -3, 0, 4292902912, -6, 2, 96, 3, 0, 85, -33, 2, 164, 3, 0, 126, -18, 2, 192, 3, 0, 269, -17, 2, 151, 2, 122, 0, 4294917120, 3, 0, 2, 2, 19, 0, 4290822144, -2, 0, 67174336, 0, 520093700, 2, 17, 3, 0, 21, -2, 2, 177, 3, 0, 3, -2, 0, 65504, 2, 122, 2, 49, 3, 0, 2, 2, 92, -191, 2, 123, -23, 2, 26, 3, 0, 296, -8, 2, 122, 3, 0, 2, 2, 19, -11, 2, 175, 3, 0, 72, -3, 0, 3758159872, 0, 201391616, 3, 0, 155, -7, 2, 167, -1, 0, 384, -1, 0, 133693440, -3, 2, 193, -2, 2, 30, 3, 0, 4, 2, 166, -2, 2, 22, 2, 151, 3, 0, 4, -2, 2, 185, -1, 2, 146, 0, 335552923, 2, 194, -1, 0, 538974272, 0, 2214592512, 0, 132000, -10, 0, 192, -8, 0, 12288, -21, 0, 134213632, 0, 4294901761, 3, 0, 42, 0, 100663424, 0, 4294965284, 3, 0, 62, -6, 0, 4286578784, 2, 0, -2, 0, 1006696448, 3, 0, 24, 2, 37, -1, 2, 195, 3, 0, 10, 2, 194, 0, 4110942569, 0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 47, 3, 0, 8, -1, 2, 154, -2, 2, 166, 0, 98304, 0, 65537, 2, 167, 2, 169, -2, 2, 154, -1, 2, 63, 2, 0, 2, 116, 2, 197, 2, 175, 0, 4294770176, 2, 30, 3, 0, 4, -30, 2, 195, 2, 196, -3, 2, 166, -2, 2, 151, 2, 0, 2, 154, -1, 2, 189, -1, 2, 157, 2, 198, 3, 0, 2, 2, 154, 2, 122, -1, 0, 193331200, -1, 0, 4227923960, 2, 197, -1, 3, 0, 3, 2, 198, 3, 0, 44, -1334, 2, 22, 2, 0, -129, 2, 195, -6, 2, 160, -180, 2, 199, -233, 2, 4, 3, 0, 96, -16, 2, 160, 3, 0, 22583, -7, 2, 17, 3, 0, 6128], [4294967295, 4294967291, 4092460543, 4294828015, 4294967294, 134217726, 268435455, 2147483647, 1048575, 1073741823, 3892314111, 1061158911, 536805376, 4294910143, 4160749567, 4294901759, 134217727, 4294901760, 4194303, 65535, 262143, 67108863, 4286578688, 536870911, 8388607, 4294918143, 4294443008, 255, 67043328, 2281701374, 4294967232, 2097151, 4294903807, 4294902783, 4294967039, 511, 524287, 131071, 127, 4294902271, 4294549487, 16777215, 1023, 67047423, 4294901888, 33554431, 4286578687, 4294770687, 67043583, 32767, 15, 2047999, 4292870143, 4294934527, 4294966783, 67045375, 4294967279, 262083, 20511, 4290772991, 41943039, 493567, 2047, 4294959104, 1071644671, 602799615, 65536, 4294828000, 805044223, 4277151126, 8191, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 4294967264, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294909951, 4294967292, 4294965759, 4294966272, 4294901823, 4294967280, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 268369920, 4292804608, 486341884, 4294963199, 3087007615, 1073692671, 4128527, 4279238655, 4294902015, 4294966591, 2445279231, 3670015, 3238002687, 63, 4294967288, 4294705151, 4095, 3221208447, 4294549472, 2147483648, 4294705152, 4294966143, 64, 4294966719, 16383, 3774873592, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4087, 31, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 536870912, 2952790016, 202506752, 139264, 402653184, 4261412864, 4227922944, 2147532800, 61440, 3758096384, 117440512, 65280, 4227858432, 3233808384, 3221225472, 4294965248, 32768, 57152, 4294934528, 67108864, 4293918720, 4290772992, 25165824, 57344, 4278190080, 65472, 4227907584, 65520, 1920, 4026531840, 49152, 4160749568, 4294836224, 63488, 1073741824, 4294967040, 251658240, 196608, 12582912, 2097152, 65408, 64512, 417808, 4227923712, 48, 512, 4294967168, 4294966784, 16, 4292870144, 4227915776, 65528, 4294950912, 65532]));

      const errorMessages = exports('errorMessages', {
          [0]: 'Unexpected token',
          [1]: 'Unterminated string literal',
          [2]: 'Octal escapes are not allowed in strict mode',
          [3]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
          [4]: 'Unterminated MultiLineComment',
          [5]: 'HTML comments are not allowed in modules',
          [6]: 'Missing exponent',
          [7]: 'Identifier starts immediately after numeric literal',
          [8]: 'Missing hexadecimal digits after \'0x\'',
          [9]: 'Missing digits',
          [10]: '\'0\'-prefixed octal literals and octal escape sequences are deprecated; for octal literals use the \'0o\' prefix instead',
          [11]: 'Nothing to repeat',
          [12]: 'Lone quantifier brackets',
          [13]: 'Unterminated group',
          [15]: 'Invalid group',
          [16]: 'Numbers out of order in {} quantifier',
          [17]: 'Incomplete quantifier',
          [18]: 'Invalid capture group name',
          [19]: 'Invalid escape',
          [20]: 'Invalid named reference',
          [14]: 'Invalid unicode escape',
          [21]: 'Unterminated character class',
          [22]: 'Range out of order in character class',
          [24]: 'Invalid regular expression',
          [25]: 'Unexpected token \'%0\'',
          [26]: 'Illegal character \'%0\'',
          [27]: 'Unicode codepoint must not be greater than 0x10FFFF',
          [23]: 'Duplicate regular expression flag \'%0\'',
          [28]: 'Invalid hexadecimal escape sequence',
          [29]: 'Invalid left-hand side in for-%0 loop: Must have a single binding.',
          [30]: 'Missing initializer in %0 declaration',
          [31]: '\'for-%0\' loop variable declaration may not have an initializer',
          [32]: 'In strict mode code, functions can only be declared at top level or inside a block',
          [33]: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
          [34]: 'Function declaration must have a name in this context',
          [35]: 'Strict mode code may not include a with statement',
          [37]: 'Undefined label \'%0\'',
          [38]: 'Label \'%0\' has already been declared',
          [36]: '%0  statement must be nested within an iteration statement',
          [39]: 'Illegal continue statement: no surrounding iteration statement',
          [40]: 'Illegal break statement',
          [41]: 'Illegal newline after throw',
          [42]: 'Illegal return statement',
          [43]: 'Missing catch or finally after try',
          [44]: 'Missing catch clause',
          [45]: 'More than one default clause in switch statement',
          [46]: 'Async functions can only be declared at the top level or inside a block',
          [47]: '%0 declarations may only appear at top level of a module',
          [48]: 'Invalid JSX attribute value',
          [49]: 'JSX attributes must only be assigned a non-empty  \'expression\'',
      });
      function constructError(index, line, column, description) {
          const error = new SyntaxError(`Line ${line}, column ${column}: ${description}`);
          error.index = index;
          error.line = line;
          error.column = column;
          error.description = description;
          return error;
      }
      function report(parser, type, ...params) {
          const { index, line, column } = parser;
          const message = errorMessages[type].replace(/%(\d+)/g, (_, i) => params[i]);
          const error = constructError(index, line, column, message);
          throw error;
      }

      const AsciiLookup = new Uint8Array(0x80)
          .fill(3, 0x24, 0x25)
          .fill(4, 0x30, 0x3A)
          .fill(3, 0x41, 0x5B)
          .fill(3, 0x5F, 0x60)
          .fill(3, 0x61, 0x7B);
      function isIdentifierPart(code) {
          return (AsciiLookup[code] & 1) > 0 || (unicodeLookup[(code >>> 5) + 0] >>> code & 31 & 1) > 0;
      }
      const whiteSpaceMap = new Array(0xFEFF);
      const truthFn = (state) => { state.index++; state.column++; return true; };
      const falsyFn = () => false;
      whiteSpaceMap.fill(falsyFn);
      whiteSpaceMap.fill(truthFn, 0x9, 0xD + 1);
      whiteSpaceMap.fill(truthFn, 0x2000, 0x200A + 1);
      whiteSpaceMap[0xA0] = whiteSpaceMap[0x1680] = whiteSpaceMap[0x202F] = whiteSpaceMap[0x205F] = whiteSpaceMap[0x3000] = whiteSpaceMap[0xFEFF] = truthFn;

      function scanIdentifier(state, context) {
          while ((AsciiLookup[nextChar(state)] & (1 | 4)) > 0) { }
          if (state.startIndex < state.index) {
              state.tokenValue = state.source.slice(state.startIndex, state.index);
              if (state.index >= state.length || state.nextChar <= 127 && state.nextChar !== 92) {
                  if (context & 32)
                      state.tokenRaw = state.tokenValue;
                  if (state.tokenValue.length >= 2 && state.tokenValue.length <= 11) {
                      const t = descKeywordTable[state.tokenValue];
                      if (t > 0)
                          return t;
                  }
                  return 8388608;
              }
          }
          return scanIdentifierRest(state, context);
      }
      function scanIdentifierRest(state, context) {
          let start = state.index;
          let hasEscape = false;
          while (state.index < state.length) {
              if ((state.nextChar & 8) === 8 && state.nextChar === 92) {
                  state.tokenValue += state.source.slice(start, state.index);
                  const cookedChar = scanIdentifierUnicodeEscape(state);
                  if (cookedChar === 92 || !isIdentifierPart(cookedChar))
                      return 32768;
                  state.tokenValue += fromCodePoint(cookedChar);
                  hasEscape = true;
                  start = state.index;
              }
              else {
                  if (!isIdentifierPart(state.source.charCodeAt(state.index)))
                      break;
                  nextChar(state);
              }
          }
          if (start < state.index)
              state.tokenValue += state.source.slice(start, state.index);
          if ((state.nextChar & 0xFC00) === 0xD800) {
              const code = state.nextChar;
              nextChar(state);
              const lo = state.source.charCodeAt(state.index);
              if ((lo & 0xFC00) !== 0xDC00)
                  report(state, 0);
              state.tokenValue += fromCodePoint(0x10000 + ((code & 0x3FF) << 10) + (lo & 0x3FF));
              nextChar(state);
          }
          if (context & 32)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          if (start < state.index &&
              (AsciiLookup[state.nextChar] & 2) > 0 ||
              (unicodeLookup[(state.nextChar >>> 5) + 34816] >>> state.nextChar & 31 & 1) > 0)
              scanIdentifierRest(state, context);
          const t = descKeywordTable[state.tokenValue] || 8388608;
          if (!hasEscape)
              return t;
          if (context & 16384 && (t & 16491 || t & 4206))
              return 32768;
          if (t & 8392704)
              return t;
          if (t & 16384 || t === 16453 || t === 16490) {
              return 125;
          }
          return 126;
      }
      function scanIdentifierUnicodeEscape(state) {
          if (nextChar(state) !== 117)
              report(state, 0);
          let value = 0;
          if (nextChar(state) === 123) {
              let digit = toHex(nextChar(state));
              if (state.nextChar === 125)
                  report(state, 14);
              while (digit >= 0) {
                  value = (value << 4) | digit;
                  if (value > 0x10FFFF)
                      report(state, 27);
                  digit = toHex(nextChar(state));
              }
              if (value < 0 || state.nextChar !== 125)
                  report(state, 14);
              nextChar(state);
              return value;
          }
          for (let i = 0; i < 4; i++) {
              const digit = toHex(state.nextChar);
              if (digit < 0)
                  report(state, 14);
              value = (value << 4) | digit;
              nextChar(state);
          }
          return value;
      }
      function maybeIdentifier(state, context) {
          if ((state.nextChar & 0x53) < 3 &&
              (state.nextChar === 8233 ||
                  state.nextChar === 8232)) {
              return skipToNewLine(state);
          }
          if (whiteSpaceMap[state.nextChar](state))
              return 524288;
          if ((state.nextChar & 0xFC00) === 0xD800) {
              state.index++;
              state.column++;
              const lo = state.source.charCodeAt(state.index);
              if ((lo & 0xFC00) !== 0xDC00)
                  report(state, 0);
              const surrogate = 0x10000 + ((state.nextChar & 0x3FF) << 10) + (lo & 0x3FF);
              state.tokenValue += fromCodePoint(surrogate);
              state.index++;
              state.column++;
          }
          if (state.index < state.length)
              return scanIdentifierRest(state, context);
          if (context & 32)
              state.tokenRaw = state.tokenValue;
          return 8388608;
      }

      function fromCodePoint(code) {
          return code <= 0xFFFF ?
              String.fromCharCode(code) :
              String.fromCharCode(((code - 0x10000) >> 10) + 0xD800, ((code - 0x10000) & (1024 - 1)) + 0xDC00);
      }
      function consume(state, code) {
          if (state.source.charCodeAt(state.index) !== code)
              return false;
          state.index++;
          state.column++;
          return true;
      }
      function skipToNewLine(state) {
          state.index++;
          state.column = 0;
          state.line++;
          state.flags |= 1;
          return 524288;
      }
      function nextChar(state) {
          ++state.column;
          return state.nextChar = state.source.charCodeAt(++state.index);
      }
      function nextUnicodeChar(state) {
          let { index } = state;
          const hi = state.source.charCodeAt(index++);
          if (hi < 0xD800 || hi > 0xDBFF)
              return hi;
          if (index === state.source.length)
              return hi;
          const lo = state.source.charCodeAt(index);
          if (lo < 0xDC00 || lo > 0xDFFF)
              return hi;
          return (hi & 0x3FF) << 10 | lo & 0x3FF | 0x10000;
      }
      function toHex(code) {
          code -= 48;
          if (code <= 9)
              return code;
          code = (code | 0x20) - (97 - 48);
          if (code <= 5)
              return code + 10;
          return -1;
      }
      function mapToToken(token) {
          return state => {
              nextChar(state);
              return token;
          };
      }
      function skipBomAndShebang(state, context) {
          let index = state.index;
          if (state.nextChar === 65519 ||
              state.nextChar === 65518) {
              index++;
              state.index = index;
          }
          if (context & 128 &&
              index < state.source.length &&
              state.source.charCodeAt(index) === 35) {
              index++;
              if (index < state.source.length && state.source.charCodeAt(index) === 33) {
                  state.index = index + 1;
                  while (state.index < state.length) {
                      const next = state.source.charCodeAt(state.index);
                      if ((next & 83) < 3 && (next === 10 ||
                          next === 13 ||
                          next === 8232 ||
                          next === 8233)) {
                          state.flags |= 1;
                          state.index++;
                          state.column = 0;
                          state.line++;
                          if (state.index < state.length && next === 13 &&
                              state.source.charCodeAt(state.index) === 10) {
                              state.index++;
                          }
                          break;
                      }
                      state.index++;
                      state.column++;
                  }
              }
          }
      }
      function scanPrivateName(state, context) {
          nextChar(state);
          if (!(context & 262144) || state.index < state.source.length && !isIDStart(state.nextChar)) {
              report(state, 25, fromCodePoint(state.nextChar));
          }
          state.startIndex = state.index;
          state.startColumn = state.column;
          scanIdentifier(state, context);
          return 8388707;
      }
      function lookAheadOrScan(state, context, callback, isLookahead) {
          const savedIndex = state.index;
          const savedLine = state.line;
          const savedColumn = state.column;
          const savedlastIndex = state.lastIndex;
          const startIndex = state.startIndex;
          const savedLastLine = state.startLine;
          const savedLastColumn = state.lastColumn;
          const savedStartColumn = state.startColumn;
          const savedFlags = state.flags;
          const savedTokenValue = state.tokenValue;
          const savedNextChar = state.nextChar;
          const savedToken = state.token;
          const savedTokenRaw = state.tokenRaw;
          const savedTokenRegExp = state.tokenRegExp;
          const savedCommentStart = state.commentStart;
          const savedCommentType = state.commentType;
          const savedCapturingParens = state.capturingParens;
          const savedAssignable = state.assignable;
          const savedDestructible = state.destructible;
          const result = callback(state, context);
          if (!result || isLookahead) {
              state.index = savedIndex;
              state.line = savedLine;
              state.column = savedColumn;
              state.lastIndex = savedlastIndex;
              state.startIndex = startIndex;
              state.startLine = savedLastLine;
              state.lastColumn = savedLastColumn;
              state.startColumn = savedStartColumn;
              state.flags = savedFlags;
              state.tokenValue = savedTokenValue;
              state.nextChar = savedNextChar;
              state.token = savedToken;
              state.tokenRaw = savedTokenRaw;
              state.tokenRegExp = savedTokenRegExp;
              state.commentStart = savedCommentStart;
              state.commentType = savedCommentType;
              state.capturingParens = savedCapturingParens;
              state.assignable = savedAssignable;
              state.destructible = savedDestructible;
          }
          return result;
      }

      const CommentTypes = [
          'SingleLine',
          'MultiLine',
          'HTMLOpen',
          'HTMLClose',
      ];
      function skipSingleHTMLComment(state, context, type) {
          if (context & 32768)
              report(state, 5);
          return skipSingleLineComment(state, type);
      }
      function skipSingleLineComment(state, type) {
          let lastIsCR = 0;
          if (state.onComment)
              state.commentStart = state.index;
          while (state.index < state.length) {
              const next = state.source.charCodeAt(state.index);
              if ((next & 0x53) < 3 && (next === 10 ||
                  next === 13 ||
                  next === 8232 ||
                  next === 8233)) {
                  if (next === 13)
                      lastIsCR = 2;
                  if (!--lastIsCR)
                      ++state.line;
                  state.flags |= 1;
                  ++state.index;
                  state.column = 0;
                  ++state.line;
                  break;
              }
              else {
                  if (lastIsCR) {
                      ++state.line;
                      lastIsCR = 0;
                  }
                  ++state.index;
                  ++state.column;
              }
          }
          if (state.onComment)
              state.commentType = type | state.index << 24;
          return 1572980;
      }
      function skipMultilineComment(state) {
          let lastIsCR = 0;
          if (state.onComment)
              state.commentStart = state.index;
          while (state.index < state.length) {
              switch (state.source.charCodeAt(state.index)) {
                  case 42:
                      state.index++;
                      state.column++;
                      if (consume(state, 47)) {
                          if (state.onComment)
                              state.commentType = 1 | state.index - 2 << 24;
                          return 1572981;
                      }
                      break;
                  case 13:
                      lastIsCR = 2;
                  case 10:
                  case 8232:
                  case 8233:
                      if (!--lastIsCR)
                          state.line++;
                      state.flags |= 1;
                      state.index++;
                      state.column = 0;
                      break;
                  default:
                      if (lastIsCR) {
                          state.line++;
                          lastIsCR = 0;
                      }
                      state.index++;
                      state.column++;
              }
          }
          report(state, 4);
      }

      function getTokenValue(state, t) {
          if (t & 33554432)
              return KeywordDescTable[t & 255];
          return state.source.slice(state.startIndex, state.index);
      }
      function convertTokenType(t) {
          if (t & 8409088)
              return 'Identifier';
          if (t & 33554432)
              return 'Punctuator';
          if (t & 2097152)
              return 'Numeric';
          if ((t & 4194304) === 4194304)
              return 'StringLiteral';
          if (t & 16777216)
              return 'RegularExpression';
          if (t & 67108864)
              return 'Template';
          if (t === 8195)
              return 'NullLiteral';
          if (t & 24576)
              return 'Keyword';
          return 'BooleanLiteral';
      }

      function scanStringLiteral(state, context) {
          const quote = state.nextChar;
          const nextChar$$1 = state.nextChar;
          let ret = '';
          let ch = readNext(state);
          while (ch !== quote) {
              if (ch === 92) {
                  ch = readNext(state);
                  if (ch >= 0x80) {
                      ret += fromCodePoint(ch);
                  }
                  else {
                      state.nextChar = ch;
                      const code = table[state.nextChar](state, context);
                      if (code >= 0)
                          ret += fromCodePoint(code);
                      else
                          reportInvalidEscapeError(state, code);
                      ch = state.nextChar;
                  }
              }
              else if ((ch & 0x53) < 3 && (ch === 13 || ch === 10)) {
                  report(state, 1);
              }
              else {
                  ret += fromCodePoint(ch);
              }
              ch = readNext(state);
          }
          state.index++;
          state.column++;
          if (context & 1)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          state.tokenValue = ret;
          state.nextChar = nextChar$$1;
          return 4194304;
      }
      const table = new Array(128).fill(nextUnicodeChar);
      table[98] = () => 8;
      table[102] = () => 12;
      table[114] = () => 13;
      table[110] = () => 10;
      table[116] = () => 9;
      table[118] = () => 11;
      table[13] = state => {
          state.column = -1;
          state.line++;
          const { index } = state;
          if (index < state.source.length) {
              const ch = state.source.charCodeAt(index);
              if (ch === 10) {
                  state.nextChar = ch;
                  state.index = index + 1;
              }
          }
          return -1;
      };
      table[10] =
          table[8232] =
              table[8233] = state => {
                  state.column = -1;
                  state.line++;
                  return -1;
              };
      table[13] = state => {
          state.column = -1;
          state.line++;
          const { index } = state;
          if (index < state.source.length) {
              const ch = state.source.charCodeAt(index);
              if (ch === 10) {
                  state.nextChar = ch;
                  state.index = index + 1;
              }
          }
          return -1;
      };
      table[10] =
          table[8232] =
              table[8233] = state => {
                  state.column = -1;
                  state.line++;
                  return -1;
              };
      table[48] = table[49] = table[50] = table[51] = (state, context) => {
          let code = state.nextChar - 48;
          let index = state.index + 1;
          let column = state.column + 1;
          if (index < state.source.length) {
              let next = state.source.charCodeAt(index);
              if (next < 48 || next > 55) {
                  if (code !== 0 || next === 56 || next === 57) {
                      if (context & 16384)
                          return -2;
                      state.flags = state.flags | 2;
                  }
              }
              else if (context & 16384) {
                  return -2;
              }
              else {
                  state.flags = state.flags | 2;
                  state.nextChar = next;
                  code = code * 8 + (next - 48);
                  index++;
                  column++;
                  if (index < state.source.length) {
                      next = state.source.charCodeAt(index);
                      if (next >= 48 && next <= 55) {
                          state.nextChar = next;
                          code = code * 8 + (next - 48);
                          index++;
                          column++;
                      }
                  }
                  state.index = index - 1;
                  state.column = column - 1;
              }
          }
          return code;
      };
      table[52] = table[53] = table[54] = table[55] = (state, context) => {
          if (context & 16384)
              return -2;
          let code = state.nextChar - 48;
          const index = state.index + 1;
          const column = state.column + 1;
          if (index < state.source.length) {
              const next = state.source.charCodeAt(index);
              if (next >= 48 && next <= 55) {
                  code = code * 8 + (next - 48);
                  state.nextChar = next;
                  state.index = index;
                  state.column = column;
              }
          }
          return code;
      };
      table[56] = table[57] = () => -3;
      table[120] = state => {
          const ch1 = nextChar(state);
          const hi = toHex(ch1);
          if (hi < 0 || state.index >= state.length)
              return -4;
          const ch2 = nextChar(state);
          const lo = toHex(ch2);
          if (lo < 0)
              return -4;
          return hi * 16 + lo;
      };
      table[117] = state => {
          if (nextChar(state) === 123) {
              let code = toHex(nextChar(state));
              if (code < 0)
                  return -4;
              nextChar(state);
              while (state.nextChar !== 125) {
                  const digit = toHex(state.nextChar);
                  if (digit < 0)
                      return -4;
                  code = (code << 4) | digit;
                  if (code > 0x10FFFF)
                      return -5;
                  nextChar(state);
              }
              return code;
          }
          else {
              let code = toHex(state.nextChar);
              if (code < 0)
                  return -4;
              for (let i = 0; i < 3; i++) {
                  const digit = toHex(nextChar(state));
                  if (digit < 0)
                      return -4;
                  code = (code << 4) | digit;
              }
              return code;
          }
      };
      function reportInvalidEscapeError(state, type) {
          switch (type) {
              case -2: report(state, 2);
              case -3: report(state, 3);
              case -4: report(state, 28);
              case -5: report(state, 27);
              default: return;
          }
      }
      function readNext(state) {
          if (state.nextChar > 0xFFFF)
              ++state.index;
          const ch = state.nextChar = state.source.charCodeAt(++state.index);
          if (state.index >= state.length)
              report(state, 1);
          ++state.column;
          return ch;
      }

      function scanTemplate(state, context) {
          const { index: start, nextChar: nextChar$$1 } = state;
          let tail = true;
          let ret = '';
          let ch = readNext(state);
          loop: while (ch !== 96) {
              switch (ch) {
                  case 36: {
                      const index = state.index + 1;
                      if (index < state.source.length &&
                          state.source.charCodeAt(index) === 123) {
                          state.index = index;
                          state.column++;
                          tail = false;
                          break loop;
                      }
                      ret += '$';
                      break;
                  }
                  case 92:
                      ch = readNext(state);
                      if (ch >= 0x80) {
                          ret += fromCodePoint(ch);
                      }
                      else {
                          state.nextChar = ch;
                          const code = table[state.nextChar](state, context);
                          if (code >= 0) {
                              ret += fromCodePoint(code);
                          }
                          else if (code !== -1 && context & 65536) {
                              ret = undefined;
                              ch = scanLooserTemplateSegment(state, state.nextChar);
                              if (ch < 0) {
                                  ch = -ch;
                                  tail = false;
                              }
                              break loop;
                          }
                          else {
                              reportInvalidEscapeError(state, code);
                          }
                          ch = state.nextChar;
                      }
                      break;
                  case 13:
                      if (state.index < state.length && state.source.charCodeAt(state.index) === 10) {
                          if (ret !== null)
                              ret += fromCodePoint(ch);
                          ch = state.source.charCodeAt(state.index);
                          state.index++;
                      }
                  case 10:
                  case 8232:
                  case 8233:
                      state.column = -1;
                      state.line++;
                  default:
                      if (ret !== null)
                          ret += fromCodePoint(ch);
              }
              ch = readNext(state);
          }
          state.index++;
          state.column++;
          state.tokenValue = ret;
          state.nextChar = nextChar$$1;
          if (tail) {
              state.tokenRaw = state.source.slice(start + 1, state.index - 1);
              return 67108870;
          }
          else {
              state.tokenRaw = state.source.slice(start + 1, state.index - 2);
              return 67108869;
          }
      }
      function consumeTemplateBrace(parser, context) {
          if (parser.index >= parser.length)
              report(parser, 1);
          parser.index--;
          parser.column--;
          return scanTemplate(parser, context);
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

      const parseLeadingZeroTable = [];
      parseLeadingZeroTable[98] = parseLeadingZeroTable[66] = (state, context) => scanOctalOrBinaryDigits(state, context, 2);
      parseLeadingZeroTable[111] = parseLeadingZeroTable[79] = (state, context) => scanOctalOrBinaryDigits(state, context, 8);
      parseLeadingZeroTable[120] = parseLeadingZeroTable[88] = scanHexDigits;
      parseLeadingZeroTable.fill(scanImplicitOctalDigits, 48, 55 + 1);
      parseLeadingZeroTable[56] = parseLeadingZeroTable[57] = (state, context) => context & 16384 ? report(state, 0) : scanNumeric(state, context, true);
      function scanNumeric(state, context, isFloat = false) {
          if (isFloat) {
              state.tokenValue = 0;
          }
          else {
              const maxDigits = 10;
              let digit = maxDigits - 1;
              state.tokenValue = state.nextChar - 48;
              while (digit >= 0 && nextChar(state) <= 57 && state.nextChar >= 48) {
                  state.tokenValue = state.tokenValue * 10 + state.nextChar - 48;
                  --digit;
              }
              if (digit >= 0 && state.nextChar !== 46 &&
                  ((AsciiLookup[state.nextChar] & 2) < 0 ||
                      (unicodeLookup[(state.nextChar >>> 5) + 34816] >>> state.nextChar & 31 & 1) < 1)) {
                  if (context & 1)
                      state.tokenRaw = state.source.slice(state.startIndex, state.index);
                  return 2097152;
              }
          }
          if (isFloat || state.nextChar === 46) {
              if (!isFloat) {
                  nextChar(state);
                  isFloat = true;
              }
              while (nextChar(state) <= 57 && state.nextChar >= 48) { }
          }
          let isBigInt = false;
          if (state.nextChar === 110) {
              if (isFloat)
                  report(state, 0);
              isBigInt = true;
              nextChar(state);
          }
          if (state.nextChar === 69 || state.nextChar === 101) {
              nextChar(state);
              if (state.nextChar === 43 || state.nextChar === 45) {
                  nextChar(state);
              }
              if (!(state.nextChar >= 48 && state.nextChar <= 57)) {
                  report(state, 6);
              }
              while (nextChar(state) <= 57 && state.nextChar >= 48) { }
          }
          if ((AsciiLookup[state.nextChar] & 2) > 0 ||
              (unicodeLookup[(state.nextChar >>> 5) + 34816] >>> state.nextChar & 31 & 1) > 0) {
              report(state, state.nextChar >= 127 ? 7 : 7);
          }
          if (context & 1)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          state.tokenValue = parseFloat(state.source.slice(state.startIndex, state.index));
          return isBigInt ? 2097275 : 2097152;
      }
      function scanImplicitOctalDigits(state, context) {
          let { index, column } = state;
          if (context & 16384)
              report(state, 0);
          let next = state.source.charCodeAt(state.index);
          state.tokenValue = 0;
          state.flags |= 2;
          while (index < state.length && next >= 48 && next <= 57) {
              if (next >= 56) {
                  if (context & 16384)
                      report(state, 10);
                  return scanNumeric(state, context, false);
              }
              state.tokenValue = state.tokenValue * 8 + (next - 48);
              index++;
              column++;
              next = state.source.charCodeAt(index);
          }
          state.index = index;
          state.column = column;
          if ((AsciiLookup[next] & 2) > 0 || (unicodeLookup[(next >>> 5) + 34816] >>> next & 31 & 1) > 0) {
              report(state, state.nextChar >= 127 ? 7 : 7);
          }
          if (context & 1)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          return 2097152;
      }
      function scanOctalOrBinaryDigits(state, context, base) {
          state.index++;
          state.column++;
          nextChar(state);
          if (!(state.nextChar >= 48 && state.nextChar <= 57))
              report(state, 9);
          let digits = 0;
          state.tokenValue = 0;
          while (state.index < state.length) {
              const converted = state.nextChar - 48;
              if (!(state.nextChar >= 48 && state.nextChar <= 57) || converted >= base)
                  break;
              state.tokenValue = state.tokenValue * base + converted;
              nextChar(state);
              digits++;
          }
          if (digits === 0)
              report(state, 0);
          const isBigInt = consume(state, 110);
          const next = state.source.charCodeAt(state.index);
          if ((AsciiLookup[next] & 2) > 0 || (unicodeLookup[(next >>> 5) + 34816] >>> next & 31 & 1) > 0) {
              report(state, state.nextChar >= 127 ? 7 : 7);
          }
          if (context & 1)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          return isBigInt ? 2097275 : 2097152;
      }
      function scanHexDigits(state, context) {
          state.index++;
          state.column++;
          state.tokenValue = toHex(nextChar(state));
          if (state.tokenValue < 0)
              report(state, 8);
          while (state.index < state.length) {
              const digit = toHex(nextChar(state));
              if (digit < 0)
                  break;
              state.tokenValue = state.tokenValue * 16 + digit;
          }
          const isBigInt = consume(state, 110);
          if (context & 1)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          return isBigInt ? 2097275 : 2097152;
      }

      function validateQuantifierPrefix(parser) {
          let state = 1;
          let min = 0;
          let max = 0;
          let ch = parser.source.charCodeAt(parser.index);
          const missingDigits = !(ch >= 48 && ch <= 57);
          while (ch >= 48 && ch <= 57) {
              state = state | 2;
              parser.index++;
              parser.column++;
              if (state & 1) {
                  state = state & ~1;
                  if (ch === 48) {
                      if (parser.index >= parser.length)
                          return false;
                      ch = parser.source.charCodeAt(parser.index);
                      if (!(ch >= 48 && ch <= 57))
                          break;
                      state = state | 8;
                      parser.index++;
                      parser.column++;
                  }
              }
              min = (min * 10) + (ch - 48);
              ch = parser.source.charCodeAt(parser.index);
          }
          if (consume(parser, 44)) {
              state = state | 1;
              if (parser.index >= parser.length)
                  return false;
              while (parser.index < parser.length) {
                  ch = parser.source.charCodeAt(parser.index);
                  if (!(ch >= 48 && ch <= 57))
                      break;
                  parser.index++;
                  parser.column++;
                  state = state | 4;
                  if (state & 1) {
                      state = state & ~1;
                      if (ch === 48) {
                          if (parser.index >= parser.length)
                              return false;
                          ch = parser.source.charCodeAt(parser.index);
                          if (!(ch >= 48 && ch <= 57))
                              break;
                          state = state | 8;
                          parser.index++;
                          parser.column++;
                      }
                  }
                  max = (max * 10) + (ch - 48);
              }
          }
          if (state & 8 || !consume(parser, 125))
              return false;
          const hasLow = (state & 2) > 0;
          const hasHi = (state & 4) > 0;
          const res = (hasLow !== hasHi || (hasLow && hasHi && min <= max));
          return missingDigits ? res | 67108864 : res;
      }
      function isFlagStart(code) {
          return isIDContinue(code) ||
              code === 92 ||
              code === 36 ||
              code === 95 ||
              code === 8204 ||
              code === 8205;
      }
      function setValidationState(prevState, currState) {
          if (currState & 262144)
              return 262144;
          if (currState & 4096) {
              if (prevState & 65536)
                  return 4096;
              if (prevState & 1024)
                  return 262144;
          }
          else if (currState & 1024) {
              if (prevState & 65536)
                  return 1024;
              if (prevState & 4096)
                  return 262144;
          }
          return prevState;
      }
      function setRegExpState(parser, flagState, bodyState) {
          if (parser.capturingParens < parser.largestBackReference)
              return 262144;
          if (bodyState & 262144 || flagState & 262144)
              return 262144;
          if (bodyState & 1024)
              return flagState & 1024 ? 65536 : 262144;
          if (bodyState & 16384)
              return !(flagState & 1024) ? 65536 : 262144;
          if (bodyState & 4096)
              return !(flagState & 1024) ? 65536 : 262144;
          return 65536;
      }
      function parseBackReferenceIndex(parser, code) {
          let value = code - 48;
          while (parser.index < parser.length) {
              code = parser.source.charCodeAt(parser.index);
              if (code >= 48 && code <= 57) {
                  value = value * 10 + (code - 48);
                  parser.index++;
                  parser.column++;
              }
              else {
                  break;
              }
          }
          parser.largestBackReference = value;
          return 65536;
      }

      function validateRegexBody(parser, context, depth, state) {
          let maybeQuantifier = false;
          while (parser.index !== parser.length) {
              switch (parser.source.charCodeAt(parser.index++)) {
                  case 47:
                      if (depth !== 0)
                          return 262144;
                      return state;
                  case 124:
                      maybeQuantifier = false;
                      break;
                  case 94:
                  case 46:
                  case 36:
                      maybeQuantifier = true;
                      break;
                  case 92:
                      maybeQuantifier = true;
                      if (parser.index >= parser.length) {
                          state = 262144;
                      }
                      else {
                          if (consume(parser, 98) || consume(parser, 66)) {
                              maybeQuantifier = false;
                          }
                          else {
                              state = setValidationState(state, validateAtomEscape(parser));
                          }
                      }
                      break;
                  case 40:
                      let ch = parser.source.charCodeAt(parser.index);
                      if (ch === 63) {
                          parser.index++;
                          parser.column++;
                          ch = parser.source.charCodeAt(parser.index);
                          if (ch === 58 || ch === 61 || ch === 33) {
                              parser.index++;
                              parser.column++;
                          }
                          else
                              state = 262144;
                      }
                      else {
                          ++parser.capturingParens;
                      }
                      maybeQuantifier = true;
                      state = setValidationState(state, validateRegexBody(parser, context, depth + 1, 65536));
                      break;
                  case 41:
                      if (depth > 0)
                          return state;
                      state = 4096;
                      maybeQuantifier = true;
                      break;
                  case 91:
                      state = setValidationState(state, validateCharacterClass(parser));
                      maybeQuantifier = true;
                      break;
                  case 93:
                      state = 4096;
                      maybeQuantifier = true;
                      break;
                  case 42:
                  case 43:
                  case 63:
                      if (maybeQuantifier) {
                          maybeQuantifier = false;
                          if (parser.index < parser.length) {
                              consume(parser, 63);
                          }
                      }
                      else {
                          state = 262144;
                      }
                      break;
                  case 123:
                      if (maybeQuantifier) {
                          let res = validateQuantifierPrefix(parser);
                          if (res & 67108864) {
                              res = res ^ 67108864;
                              state = res ? 4096 : 262144;
                          }
                          else if (!res) {
                              state = 262144;
                          }
                          if (parser.index < parser.length && parser.source.charCodeAt(parser.index) === 63) {
                              parser.index++;
                              parser.column++;
                          }
                          maybeQuantifier = false;
                      }
                      else {
                          state = 262144;
                      }
                      break;
                  case 125:
                      state = 262144;
                      maybeQuantifier = false;
                      break;
                  case 13:
                  case 10:
                  case 8232:
                  case 8233:
                      return 262144;
                  default:
                      maybeQuantifier = true;
              }
          }
          return 262144;
      }
      function validateAtomEscape(parser) {
          const next = parser.source.charCodeAt(parser.index++);
          switch (next) {
              case 100:
              case 68:
              case 115:
              case 83:
              case 119:
              case 87:
              case 102:
              case 110:
              case 114:
              case 116:
              case 118:
              case 94:
              case 36:
              case 92:
              case 46:
              case 42:
              case 43:
              case 63:
              case 40:
              case 41:
              case 91:
              case 93:
              case 123:
              case 125:
              case 47:
              case 124:
                  return 65536;
              case 117:
                  if (consume(parser, 123)) {
                      let ch2 = parser.source.charCodeAt(parser.index);
                      let code = toHex(ch2);
                      if (code < 0)
                          return 262144;
                      parser.index++;
                      ch2 = parser.source.charCodeAt(parser.index);
                      while (ch2 !== 125) {
                          const digit = toHex(ch2);
                          if (digit < 0)
                              return 262144;
                          code = code * 16 + digit;
                          if (code > 0x10FFFF)
                              return 262144;
                          parser.index++;
                          ch2 = parser.source.charCodeAt(parser.index);
                      }
                      parser.index++;
                      return 1024;
                  }
                  if (parser.index >= parser.length || toHex(parser.source.charCodeAt(parser.index)) < 0) {
                      return 262144;
                  }
                  if (parser.index >= parser.length || toHex(parser.source.charCodeAt(parser.index++)) < 0) {
                      return 262144;
                  }
              case 88:
              case 120:
                  if (parser.index >= parser.length || toHex(parser.source.charCodeAt(parser.index++)) < 0) {
                      return 262144;
                  }
                  if (parser.index >= parser.length || toHex(parser.source.charCodeAt(parser.index++)) < 0) {
                      return 262144;
                  }
                  return 65536;
              case 99:
                  {
                      if (parser.index < parser.length) {
                          const letter = parser.source.charCodeAt(parser.index) | 32;
                          if (letter >= 97 && letter <= 122) {
                              parser.index++;
                              parser.column++;
                              return 4096;
                          }
                      }
                      return 262144;
                  }
              case 48:
                  const ch = parser.source.charCodeAt(parser.index);
                  if (parser.index >= parser.length || ch >= 48 && ch <= 57) {
                      return 262144;
                  }
                  return 65536;
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
                  return parseBackReferenceIndex(parser, next);
              case 13:
              case 10:
              case 8233:
              case 8232:
                  return 262144;
              default:
                  if (isFlagStart(next))
                      return 262144;
                  return 4096;
          }
      }
      function validateCharacterClass(parser) {
          if (parser.index >= parser.length)
              return 262144;
          consume(parser, 94);
          const next = parser.source.charCodeAt(parser.index);
          return validateClassRanges(parser, next);
      }
      function validateClassAndClassCharacterEscape(parser) {
          switch (parser.source.charCodeAt(parser.index++)) {
              case 98:
                  return 1114113;
              case 66:
                  return 8;
              case 68:
              case 100:
              case 83:
              case 115:
              case 87:
              case 119:
                  return 1114113;
              case 102:
                  return 12;
              case 110:
                  return 10;
              case 114:
                  return 13;
              case 116:
                  return 9;
              case 118:
                  return 11;
              case 47:
              case 94:
              case 36:
              case 92:
              case 46:
              case 42:
              case 43:
              case 63:
              case 40:
              case 41:
              case 91:
              case 93:
              case 123:
              case 125:
              case 124:
                  return parser.source.charCodeAt(parser.index);
              case 45:
                  return 45;
              case 117:
                  {
                      if (consume(parser, 123)) {
                          let ch = parser.source.charCodeAt(parser.index);
                          let code = toHex(ch);
                          if (code < 0)
                              return 1114112;
                          parser.index++;
                          ch = parser.source.charCodeAt(parser.index);
                          while (ch !== 125) {
                              const digit = toHex(ch);
                              if (digit < 0)
                                  return 1114112;
                              code = code * 16 + digit;
                              if (code > 0x10FFFF)
                                  return 1114112;
                              parser.index++;
                              ch = parser.source.charCodeAt(parser.index);
                          }
                          parser.index++;
                          return code | 16777216;
                      }
                      else {
                          let codePoint = toHex(parser.source.charCodeAt(parser.index));
                          if (codePoint < 0)
                              return 1114112;
                          for (let i = 0; i < 3; i++) {
                              parser.index++;
                              parser.column++;
                              const digit = toHex(parser.source.charCodeAt(parser.index));
                              if (digit < 0)
                                  return 1114112;
                              codePoint = codePoint * 16 + digit;
                          }
                          parser.index++;
                          parser.column++;
                          return codePoint;
                      }
                  }
              case 120:
                  {
                      if (parser.index >= parser.length - 1)
                          return 1114112;
                      const ch1 = parser.source.charCodeAt(parser.index);
                      const hi = toHex(ch1);
                      if (hi < 0)
                          return 1114112;
                      parser.index++;
                      const ch2 = parser.source.charCodeAt(parser.index);
                      const lo = toHex(ch2);
                      if (lo < 0)
                          return 1114112;
                      parser.index++;
                      return (hi << 4) | lo;
                  }
              case 99:
                  if (parser.index < parser.length) {
                      const ch = parser.source.charCodeAt(parser.index);
                      const letter = ch | 32;
                      if (letter >= 97 && letter <= 122) {
                          parser.index++;
                          parser.column++;
                          return ch & 0x1F;
                      }
                  }
                  return 1114112;
              case 48:
                  {
                      if (parser.index < parser.length) {
                          const next = parser.source.charCodeAt(parser.index);
                          if (!(next >= 48 && next <= 57))
                              return 0;
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
                  return 1114112;
              default:
          }
          return 1114112;
      }
      function validateClassRanges(parser, ch) {
          let prevChar = 0;
          let surrogate = 0;
          let leftUnicodeRange = 0;
          let CharacterRange = 0;
          let prevState = 0;
          let subState = 65536;
          let state = 0;
          let count = 0;
          while (parser.index < parser.length) {
              parser.index++;
              parser.column++;
              switch (ch) {
                  case 93:
                      {
                          if (state & 256 &&
                              prevState & 4 &&
                              (leftUnicodeRange === 1114113 ||
                                  prevChar & 1114113 || leftUnicodeRange > prevChar)) {
                              if (subState & 1024 ||
                                  subState & 262144)
                                  return 262144;
                              return 4096;
                          }
                          return subState;
                      }
                  case 92:
                      {
                          ch = validateClassAndClassCharacterEscape(parser);
                          if (ch === 1114112) {
                              subState = 262144;
                          }
                          else if (ch & 16777216) {
                              ch = ch ^ 16777216;
                              if (ch === 1114112)
                                  subState = 262144;
                              else if (subState & 65536)
                                  subState = 1024;
                              else if (subState & 4096)
                                  subState = 262144;
                          }
                      }
              }
              if (prevState & 4 && (ch & 0xFC00) === 0xDC00) {
                  state = state & ~4 | 1;
                  surrogate = (prevChar - 0xD800) * 0x400 + (ch - 0xDC00) + 0x10000;
              }
              else if (!(prevState & 1) && prevState & 4 && (ch & 0x1FFFFF) > 0xFFFF) {
                  state = state & ~4 | 1;
                  surrogate = ch;
              }
              else {
                  state = state & ~(1 | 4);
                  if ((ch & 0xFC00) === 0xD800)
                      state = state | 4;
              }
              if (state & 256) {
                  const rightUnicodeRange = state & 1 ? surrogate : prevState & 4 ? prevChar : ch;
                  if (!(state & 4) ||
                      prevState & 4) {
                      state = state & ~256;
                      if (leftUnicodeRange === 1114113 ||
                          rightUnicodeRange === 1114113 ||
                          leftUnicodeRange > rightUnicodeRange) {
                          if (subState === 1024)
                              subState = 262144;
                          else if (subState !== 262144)
                              subState = 4096;
                      }
                  }
              }
              else if (ch === 45 && count > 0) {
                  state = state | 256;
              }
              else {
                  leftUnicodeRange = state & 1 ? surrogate : ch;
              }
              if (state & 1024) {
                  state = state & ~1024;
                  if (CharacterRange === 1114113 ||
                      ch === 1114113 ||
                      CharacterRange > ch) {
                      if (subState === 4096)
                          subState = 262144;
                      else if (subState !== 262144)
                          subState = 1024;
                  }
              }
              else if (ch === 45 && count > 0) {
                  state = state | 1024;
              }
              else {
                  CharacterRange = ch;
              }
              prevState = state;
              prevChar = ch = parser.source.charCodeAt(parser.index);
              count++;
          }
          return 262144;
      }

      function scanRegularExpression(state, context) {
          const { flags, pattern } = verifyRegExpPattern(state, context);
          state.tokenRegExp = { pattern, flags };
          if (context & 1)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          try {
              state.tokenValue = new RegExp(pattern, flags);
          }
          catch (e) {
              state.tokenValue = null;
          }
          return 16777216;
      }
      function verifyRegExpPattern(parser, context) {
          const bodyStart = parser.index;
          const bodyState = validateRegexBody(parser, context, 0, 65536);
          const bodyEnd = parser.index - 1;
          const { index: flagStart } = parser;
          const flagState = scanRegexFlags(parser);
          const flags = parser.source.slice(flagStart, parser.index);
          const pattern = parser.source.slice(bodyStart, bodyEnd);
          const state = setRegExpState(parser, flagState, bodyState);
          return { flags, pattern, state };
      }
      function scanRegexFlags(parser) {
          let mask = 0;
          loop: while (parser.index < parser.length) {
              const c = parser.source.charCodeAt(parser.index);
              switch (c) {
                  case 103:
                      if (mask & 1)
                          report(parser, 23, 'g');
                      mask |= 1;
                      break;
                  case 105:
                      if (mask & 2)
                          report(parser, 23, 'i');
                      mask |= 2;
                      break;
                  case 109:
                      if (mask & 4)
                          report(parser, 23, 'm');
                      mask |= 4;
                      break;
                  case 117:
                      if (mask & 8) {
                          report(parser, 0, 'u');
                          return 262144;
                      }
                      mask |= 8;
                      break;
                  case 121:
                      if (mask & 16)
                          report(parser, 23, 'y');
                      mask |= 16;
                      break;
                  case 115:
                      if (mask & 32)
                          report(parser, 23, 's');
                      mask |= 32;
                      break;
                  default:
                      if (!isFlagStart(c))
                          break loop;
                      return 262144;
              }
              parser.index++;
              parser.column++;
          }
          return mask & 8 ? 1024 : 4096;
      }

      const unexpectedCharacter = (state) => report(state, 26, String.fromCharCode(state.nextChar));
      const table$1 = new Array(0xFFFF).fill(unexpectedCharacter, 0, 0x80).fill(maybeIdentifier, 0x80);
      table$1[44] = mapToToken(33554447);
      table$1[126] = mapToToken(570425387);
      table$1[63] = mapToToken(33554451);
      table$1[91] = mapToToken(33554448);
      table$1[93] = mapToToken(33554449);
      table$1[123] = mapToToken(33554441);
      table$1[125] = mapToToken(33619980);
      table$1[58] = mapToToken(33554450);
      table$1[59] = mapToToken(33619982);
      table$1[40] = mapToToken(33554440);
      table$1[41] = mapToToken(33554445);
      table$1[64] = mapToToken(8388706);
      table$1[32] =
          table$1[9] =
              table$1[12] =
                  table$1[11] = state => {
                      ++state.index;
                      ++state.column;
                      return 524288;
                  };
      table$1[34] =
          table$1[39] = scanStringLiteral;
      table$1[10] = state => {
          state.column = 0;
          ++state.index;
          ++state.line;
          state.flags |= 1;
          return 524288;
      };
      table$1[13] = state => {
          state.column = 0;
          ++state.index;
          ++state.line;
          state.flags |= 1;
          if (state.index < state.length &&
              state.source.charCodeAt(state.index) === 10) {
              ++state.index;
          }
          return 524288;
      };
      for (let i = 49; i <= 57; i++)
          table$1[i] = (state, context) => scanNumeric(state, context, false);
      for (let i = 65; i <= 90; i++)
          table$1[i] = scanIdentifier;
      for (let i = 97; i <= 122; i++)
          table$1[i] = scanIdentifier;
      table$1[35] = scanPrivateName;
      table$1[36] = table$1[95] = scanIdentifier;
      table$1[92] = scanIdentifierRest;
      table$1[96] = scanTemplate;
      table$1[48] = (state, context) => (parseLeadingZeroTable[state.source.charCodeAt(state.index + 1)] || scanNumeric)(state, context);
      table$1[61] = state => {
          ++state.index;
          ++state.column;
          const next = state.source.charCodeAt(state.index);
          if (next === 61) {
              ++state.index;
              ++state.column;
              if (consume(state, 61)) {
                  return 301991478;
              }
              else {
                  return 301991480;
              }
          }
          else if (next === 62) {
              ++state.index;
              ++state.column;
              return 33554439;
          }
          return 167772186;
      };
      table$1[46] = (state, context) => {
          let index = state.index + 1;
          const next = state.source.charCodeAt(index);
          if (next === 46) {
              index++;
              if (index < state.source.length &&
                  state.source.charCodeAt(index) === 46) {
                  state.index = index + 1;
                  state.column += 3;
                  return 33554443;
              }
          }
          else if (next >= 48 && next <= 57) {
              return scanNumeric(state, context, true);
          }
          state.index++;
          state.column++;
          return 33554442;
      };
      table$1[60] = (state, context) => {
          ++state.index;
          ++state.column;
          if (state.index < state.source.length) {
              const next = state.source.charCodeAt(state.index);
              if (next === 61) {
                  ++state.index;
                  ++state.column;
                  return 301991738;
              }
              else if (next === 60) {
                  ++state.index;
                  ++state.column;
                  if (consume(state, 61))
                      return 167772187;
                  return 301991998;
              }
              else if (context & 16 && next === 47) {
                  const index = state.index + 1;
                  if (index < state.length) {
                      const next = state.source.charCodeAt(index);
                      if (next === 42 || next === 47)
                          report(state, 0);
                  }
                  state.index++;
                  state.column++;
                  return 33554454;
              }
              else if (consume(state, 33) &&
                  consume(state, 45) &&
                  consume(state, 45)) {
                  return skipSingleHTMLComment(state, context, 2);
              }
          }
          return 301991740;
      };
      table$1[47] = (state, context) => {
          ++state.index;
          ++state.column;
          if (state.index < state.length) {
              const next = state.source.charCodeAt(state.index);
              if (context & 1024 && (next !== 42 && next !== 47)) {
                  return scanRegularExpression(state, context);
              }
              if (consume(state, 47)) {
                  return skipSingleLineComment(state, 0);
              }
              else if (consume(state, 42)) {
                  return skipMultilineComment(state);
              }
              else if (next === 61) {
                  ++state.index;
                  ++state.column;
                  return 167772194;
              }
          }
          return 301992498;
      };
      table$1[33] = state => {
          ++state.index;
          ++state.column;
          if (!consume(state, 61))
              return 570425386;
          if (!consume(state, 61))
              return 301991481;
          return 301991479;
      };
      table$1[37] = state => {
          ++state.index;
          ++state.column;
          return consume(state, 61) ? 167772195 : 301992497;
      };
      table$1[38] = state => {
          ++state.index;
          ++state.column;
          const next = state.source.charCodeAt(state.index);
          if (next === 38) {
              ++state.index;
              ++state.column;
              return 302121524;
          }
          if (next === 61) {
              ++state.index;
              ++state.column;
              return 167772198;
          }
          return 301991233;
      };
      table$1[42] = state => {
          ++state.index;
          ++state.column;
          if (state.index >= state.length)
              return 301992496;
          const next = state.source.charCodeAt(state.index);
          if (next === 61) {
              ++state.index;
              ++state.column;
              return 167772193;
          }
          if (next !== 42)
              return 301992496;
          ++state.index;
          ++state.column;
          if (!consume(state, 61))
              return 301992755;
          return 167772190;
      };
      table$1[43] = state => {
          ++state.index;
          ++state.column;
          if (state.index >= state.length)
              return 838863148;
          const next = state.source.charCodeAt(state.index);
          if (next === 43) {
              ++state.index;
              ++state.column;
              return 1107296280;
          }
          if (next === 61) {
              ++state.index;
              ++state.column;
              return 167772191;
          }
          return 838863148;
      };
      table$1[45] = (state, context) => {
          ++state.index;
          ++state.column;
          if (state.index < state.source.length) {
              const next = state.source.charCodeAt(state.index);
              if (next === 45) {
                  ++state.index;
                  ++state.column;
                  if ((state.flags & 1 || state.startIndex === 0) &&
                      consume(state, 62)) {
                      return skipSingleHTMLComment(state, context, 3);
                  }
                  return 1107296281;
              }
              else if (next === 61) {
                  ++state.index;
                  ++state.column;
                  return 167772192;
              }
          }
          return 838863149;
      };
      table$1[94] = state => {
          ++state.index;
          ++state.column;
          if (consume(state, 61))
              return 167772196;
          return 301990979;
      };
      table$1[124] = state => {
          ++state.index;
          ++state.column;
          if (state.index < state.length) {
              const next = state.source.charCodeAt(state.index);
              if (next === 124) {
                  ++state.index;
                  ++state.column;
                  return 302121269;
              }
              if (next === 61) {
                  ++state.index;
                  ++state.column;
                  return 167772197;
              }
          }
          return 301990722;
      };
      table$1[62] = (state, context) => {
          ++state.index;
          ++state.column;
          if (state.index >= state.length)
              return 301991741;
          if (context & 16777216)
              return 301991741;
          let next = state.source.charCodeAt(state.index);
          if (next === 61) {
              ++state.index;
              ++state.column;
              return 301991739;
          }
          if (next !== 62)
              return 301991741;
          ++state.index;
          ++state.column;
          if (state.index < state.length) {
              next = state.source.charCodeAt(state.index);
              if (next === 62) {
                  ++state.index;
                  ++state.column;
                  if (consume(state, 61)) {
                      return 167772189;
                  }
                  else {
                      return 301992000;
                  }
              }
              else if (next === 61) {
                  ++state.index;
                  ++state.column;
                  return 167772188;
              }
          }
          return 301991999;
      };
      function nextToken(state, context) {
          state.flags &= ~1;
          state.lastIndex = state.index;
          state.lastLine = state.line;
          state.lastColumn = state.column;
          const onToken = state.onToken;
          while (state.index < state.length) {
              state.startIndex = state.index;
              state.startColumn = state.column;
              state.startLine = state.line;
              state.nextChar = state.source.charCodeAt(state.index);
              if (((state.token = table$1[state.nextChar](state, context)) & 524288) !== 524288) {
                  if (!(state.flags & 4) && onToken)
                      onToken(convertTokenType(state.token), getTokenValue(state, state.token));
                  return state.token;
              }
          }
          return state.token = 65536;
      }

      function finishNode(state, context, meta, node) {
          if (context & 8) {
              node.start = meta.index;
              node.end = state.lastIndex;
          }
          if (context & 4) {
              node.loc = {
                  start: {
                      line: meta.line,
                      column: meta.column
                  },
                  end: {
                      line: state.lastLine,
                      column: state.lastColumn
                  }
              };
          }
          return node;
      }
      function getLocation(state) {
          return {
              line: state.startLine,
              column: state.startColumn,
              index: state.startIndex
          };
      }
      function optional(state, context, token) {
          if (state.token !== token)
              return false;
          nextToken(state, context);
          return true;
      }
      function expect(state, context, t) {
          if (state.token !== t) {
              report(state, 25, KeywordDescTable[t & 255]);
              return false;
          }
          nextToken(state, context);
          return true;
      }
      function nextTokenIsLeftParenOrPeriod(state, context) {
          nextToken(state, context);
          return state.token === 33554440 || state.token === 33554442;
      }
      function nextTokenIsIdentifierOrLeftParen(state, context) {
          nextToken(state, context);
          return state.token & 8392704 || state.token === 33554440;
      }
      function nextTokenIsFuncKeywordOnSameLine(state, context) {
          const line = state.line;
          nextToken(state, context);
          return state.token === 8276 && state.line === line;
      }
      function isLexical(state, context) {
          nextToken(state, context);
          return (state.token & 8392704) > 0 || state.token === 33554441 || state.token === 33554448 || state.token === 16491 || state.token === 4206;
      }
      function consumeSemicolon(state, context) {
          return (state.token & 65536) === 65536 || state.flags & 1
              ? optional(state, context, 33619982)
              : report(state, 0);
      }
      function isStartOfExpression(t) {
          if (t & (536870912 | 1073741824))
              return true;
          switch (t) {
              case 8388608:
              case 2097152:
              case 4194304:
              case 16777216:
              case 8193:
              case 8194:
              case 8195:
              case 67108864:
              case 33554440:
              case 33554441:
              case 33554448:
              case 167772194:
              case 301992498:
              case 301991740:
              case 8260:
              case 16453:
              case 8262:
              case 8276:
              case 8277:
              case 8278:
              case 8281:
              case 8282:
              case 8283:
              case 8284:
              case 16491:
              case 4206:
              case 8388705:
              case 8388704:
              case 2097275:
                  return true;
              default:
                  return false;
          }
      }
      function isIterationStatement(state) {
          return state.token === 8286 || state.token === 8270 || state.token === 8275;
      }
      function addLabel(state, label) {
          if (state.labelSet === undefined)
              state.labelSet = {};
          state.labelSet[`@${label}`] = true;
          state.labelSetStack[state.labelDepth] = state.labelSet;
          state.iterationStack[state.labelDepth] = isIterationStatement(state);
          state.labelSet = undefined;
          state.labelDepth++;
      }
      function addCrossingBoundary(state) {
          state.labelSetStack[state.labelDepth] = state.functionBoundaryStack;
          state.iterationStack[state.labelDepth] = 0;
          state.labelDepth++;
      }
      function validateContinueLabel(state, label) {
          const sstate = getLabel(state, `@${label}`, true);
          if ((sstate & 1) !== 1) {
              if (sstate & 2) {
                  report(state, 0);
              }
              else {
                  report(state, 0);
              }
          }
      }
      function validateBreakStatement(state, label) {
          const lblstate = getLabel(state, `@${label}`);
          if ((lblstate & 1) !== 1)
              report(state, 0);
      }
      function getLabel(state, label, iterationStatement = false, crossBoundary = false) {
          if (!iterationStatement && state.labelSet && state.labelSet[label] === true) {
              return 1;
          }
          if (!state.labelSetStack)
              return 0;
          let stopAtTheBorder = false;
          for (let i = state.labelDepth - 1; i >= 0; i--) {
              const labelSet = state.labelSetStack[i];
              if (labelSet === state.functionBoundaryStack) {
                  if (crossBoundary) {
                      break;
                  }
                  else {
                      stopAtTheBorder = true;
                      continue;
                  }
              }
              if (iterationStatement && state.iterationStack[i] === false) {
                  continue;
              }
              if (labelSet[label] === true) {
                  return stopAtTheBorder ? 2 : 1;
              }
          }
          return 0;
      }
      function reinterpret(state, context, node) {
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
                          reinterpret(state, context, node.elements[i]);
                      }
                  }
                  return;
              case 'ObjectExpression':
                  node.type = 'ObjectPattern';
                  for (let i = 0; i < node.properties.length; i++) {
                      reinterpret(state, context, node.properties[i]);
                  }
                  return;
              case 'Property':
                  reinterpret(state, context, node.value);
                  return;
              case 'SpreadElement':
                  node.type = 'RestElement';
                  reinterpret(state, context, node.argument);
                  break;
              case 'AssignmentExpression':
                  node.type = 'AssignmentPattern';
                  delete node.operator;
                  reinterpret(state, context, node.left);
                  return;
              case 'MemberExpression':
                  if (!(context & 8192))
                      return;
              default:
                  report(state, 0);
          }
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

      function parseBindingIdentifierOrPattern(state, context) {
          switch (state.token) {
              case 33554441:
                  return parserObjectAssignmentPattern(state, context);
              case 33554448:
                  return parseArrayAssignmentPattern(state, context);
              default:
                  return parseBindingIdentifier(state, context);
          }
      }
      function parseBindingIdentifier(state, context) {
          if (state.token & 8192) {
              report(state, 0);
          }
          else if (context & 16384 &&
              state.token & 16384) {
              report(state, 0);
          }
          const pos = getLocation(state);
          const name = state.tokenValue;
          nextToken(state, context);
          return finishNode(state, context, pos, {
              type: 'Identifier',
              name,
          });
      }
      function parseAssignmentRestElement(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554443);
          const argument = parseBindingIdentifierOrPattern(state, context);
          if (state.token === 33554447)
              report(state, 0);
          return finishNode(state, context, pos, {
              type: 'RestElement',
              argument,
          });
      }
      function AssignmentRestProperty(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554443);
          const argument = parseBindingIdentifierOrPattern(state, context);
          if (state.token === 33554447)
              report(state, 0);
          return finishNode(state, context, pos, {
              type: 'RestElement',
              argument,
          });
      }
      function parseArrayAssignmentPattern(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554448);
          const elements = [];
          while (state.token !== 33554449) {
              if (optional(state, context, 33554447)) {
                  elements.push(null);
              }
              else {
                  if (state.token === 33554443) {
                      elements.push(parseAssignmentRestElement(state, context));
                      break;
                  }
                  else {
                      elements.push(parseBindingInitializer(state, context));
                  }
                  if (state.token !== 33554449)
                      expect(state, context, 33554447);
              }
          }
          expect(state, context, 33554449);
          return finishNode(state, context, pos, {
              type: 'ArrayPattern',
              elements,
          });
      }
      function parserObjectAssignmentPattern(state, context) {
          const pos = getLocation(state);
          const properties = [];
          expect(state, context, 33554441);
          while (state.token !== 33619980) {
              if (state.token === 33554443) {
                  properties.push(AssignmentRestProperty(state, context));
                  break;
              }
              properties.push(parseAssignmentProperty(state, context));
              if (state.token !== 33619980)
                  expect(state, context, 33554447);
          }
          expect(state, context, 33619980);
          return finishNode(state, context, pos, {
              type: 'ObjectPattern',
              properties,
          });
      }
      function parseAssignmentPattern(state, context, left, pos) {
          return finishNode(state, context, pos, {
              type: 'AssignmentPattern',
              left,
              right: parseAssignmentExpression(state, context),
          });
      }
      function parseBindingInitializer(state, context) {
          const pos = getLocation(state);
          const left = parseBindingIdentifierOrPattern(state, context);
          return !optional(state, context, 167772186) ?
              left :
              finishNode(state, context, pos, {
                  type: 'AssignmentPattern',
                  left,
                  right: parseAssignmentExpression(state, context),
              });
      }
      function parseAssignmentProperty(state, context) {
          const pos = getLocation(state);
          const { token } = state;
          let key;
          let value;
          let computed = false;
          let shorthand = false;
          if (token & 8417280) {
              key = parseBindingIdentifier(state, context);
              shorthand = !optional(state, context, 33554450);
              if (shorthand) {
                  const hasInitializer = optional(state, context, 167772186);
                  value = hasInitializer ? parseAssignmentPattern(state, context, key, pos) : key;
              }
              else
                  value = parseBindingInitializer(state, context);
          }
          else {
              computed = token === 33554448;
              key = parsePropertyName(state, context);
              expect(state, context, 33554450);
              value = parseBindingInitializer(state, context);
          }
          return finishNode(state, context, pos, {
              type: 'Property',
              kind: 'init',
              key,
              computed,
              value,
              method: false,
              shorthand,
          });
      }

      function parseDirective(state, context) {
          const pos = getLocation(state);
          const directive = state.source.slice(state.startIndex + 1, state.index - 1);
          const expr = parseExpression(state, context);
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'ExpressionStatement',
              expression: expr,
              directive
          });
      }

      function scanJSXToken(state) {
          if (state.index >= state.source.length)
              return state.token = 65536;
          state.lastIndex = state.startIndex = state.index;
          const char = state.source.charCodeAt(state.index);
          if (char === 60) {
              state.index++;
              state.column++;
              return state.token = consume(state, 47) ? 33554454 : 301991740;
          }
          else if (char === 123) {
              state.index++;
              state.column++;
              return state.token = 33554441;
          }
          while (state.index < state.source.length) {
              state.index++;
              state.column++;
              const next = state.source.charCodeAt(state.index);
              if (next === 123 || next === 60)
                  break;
          }
          return state.token = 128;
      }
      function scanJSXAttributeValue(state, context) {
          state.lastIndex = state.index;
          if (state.nextChar === 39 || state.nextChar === 34) {
              return scanJSXString(state, context, state.nextChar);
          }
          return nextToken(state, context);
      }
      function scanJSXString(state, context, quote) {
          nextChar(state);
          state.tokenValue = '';
          while (state.nextChar !== quote) {
              state.tokenValue += fromCodePoint(state.nextChar);
              nextChar(state);
              if (state.index >= state.source.length)
                  report(state, 1);
          }
          nextChar(state);
          if (context & 1)
              state.tokenRaw = state.source.slice(state.startIndex, state.index);
          return 4194304;
      }
      function scanJSXIdentifier(state) {
          if (state.token & (8388608 | 8417280)) {
              const firstCharPosition = state.index;
              let ch = state.source.charCodeAt(state.index);
              while ((ch === 45 || (AsciiLookup[state.nextChar] & 2) > 0 ||
                  (unicodeLookup[(state.nextChar >>> 5) + 34816] >>> state.nextChar & 31 & 1) > 0)) {
                  ch = readNext(state);
              }
              state.tokenValue += state.source.substr(firstCharPosition, state.index - firstCharPosition);
          }
          return state.token;
      }

      function parseJSXRootElement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          if (state.token === 301991741) {
              return finishNode(state, context, pos, {
                  type: 'JSXFragment',
                  openingElement: parseJSXOpeningFragment(state, context, pos),
                  children: parseJSXChildren(state, context),
                  closingFragment: parseJSXClosingFragment(state, context),
              });
          }
          const name = parseJSXElementNameOrMemberExpression(state, context);
          const attributes = parseJSXAttributes(state, context);
          const selfClosing = optional(state, context, 301992498);
          const openingElement = parseJSXOpeningElement(state, context, name, attributes, selfClosing, pos);
          let children = [];
          let closingElement = null;
          if (!selfClosing) {
              children = parseJSXChildren(state, context);
              closingElement = parseJSXClosingElement(state, context);
              const close = isEqualTagNames(closingElement.name);
              if (isEqualTagNames(openingElement.name) !== close) {
                  report(state, 0, close);
              }
          }
          return finishNode(state, context, pos, {
              type: 'JSXElement',
              children,
              openingElement,
              closingElement,
          });
      }
      function parseJSXOpeningElement(state, context, name, attributes, selfClosing, pos) {
          if (context & 16777216 && selfClosing)
              expect(state, context, 301991741);
          else
              scanJSXToken(state);
          return finishNode(state, context, pos, {
              type: 'JSXOpeningElement',
              name,
              attributes,
              selfClosing,
          });
      }
      function parseJSXClosingFragment(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554454);
          expect(state, context, 301991741);
          return finishNode(state, context, pos, {
              type: 'JSXClosingFragment',
          });
      }
      function parseJSXOpeningFragment(state, context, pos) {
          scanJSXToken(state);
          return finishNode(state, context, pos, {
              type: 'JSXOpeningFragment',
          });
      }
      function parseJSXClosingElement(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554454);
          const name = parseJSXElementNameOrMemberExpression(state, context);
          if (context & 16777216) {
              expect(state, context, 301991741);
          }
          else
              scanJSXToken(state);
          return finishNode(state, context, pos, {
              type: 'JSXClosingElement',
              name,
          });
      }
      function parseJSXElementNameOrMemberExpression(state, context) {
          const pos = getLocation(state);
          scanJSXIdentifier(state);
          let elementName = parseJSXIdentifier(state, context);
          if (state.token === 33554450)
              return parseJSXNamespacedName(state, context, elementName, pos);
          while (optional(state, context, 33554442)) {
              scanJSXIdentifier(state);
              elementName = finishNode(state, context, pos, {
                  type: 'JSXMemberExpression',
                  object: elementName,
                  property: parseJSXIdentifier(state, context),
              });
          }
          return elementName;
      }
      function parseJSXChildren(state, context) {
          const children = [];
          while (state.token !== 33554454) {
              switch (state.token) {
                  case 8388608:
                  case 128:
                      children.push(parseJSXText(state, context));
                      break;
                  case 33554441:
                      children.push(parseJSXExpression(state, context & ~16777216));
                      break;
                  case 301991740:
                      children.push(parseJSXRootElement(state, context & ~16777216));
                      break;
                  default:
                      report(state, 0);
              }
          }
          return children;
      }
      function parseJSXText(state, context) {
          const pos = getLocation(state);
          const value = state.source.slice(state.startIndex, state.index);
          state.token = scanJSXToken(state);
          const node = finishNode(state, context, pos, {
              type: 'JSXText',
              value,
          });
          if (context & 1)
              node.raw = value;
          return node;
      }
      function parseJSXExpressionContainer(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554441);
          if (state.token === 33619980)
              report(state, 49);
          const expression = parseAssignmentExpression(state, context & ~16777216);
          expect(state, context, 33619980);
          return finishNode(state, context, pos, {
              type: 'JSXExpressionContainer',
              expression,
          });
      }
      function parseJSXEmptyExpression(state, context) {
          const pos = getLocation(state);
          return finishNode(state, context, pos, {
              type: 'JSXEmptyExpression',
          });
      }
      function parseJSXSpreadChild(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          const expression = parseExpression(state, context);
          expect(state, context, 33619980);
          return finishNode(state, context, pos, {
              type: 'JSXSpreadChild',
              expression,
          });
      }
      function parseJSXExpression(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554441);
          if (state.token === 33554443)
              return parseJSXSpreadChild(state, context);
          const expression = state.token === 33619980 ?
              parseJSXEmptyExpression(state, context) :
              parseAssignmentExpression(state, context);
          scanJSXToken(state);
          return finishNode(state, context, pos, {
              type: 'JSXExpressionContainer',
              expression,
          });
      }
      function parseJSXAttributes(state, context) {
          const attributes = [];
          while (state.index < state.source.length) {
              if (state.token === 301992498 || state.token === 301991741)
                  break;
              attributes.push(parseJSXAttribute(state, context));
          }
          return attributes;
      }
      function parseJSXSpreadAttribute(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554441);
          expect(state, context, 33554443);
          const expression = parseAssignmentExpression(state, context & ~16777216);
          expect(state, context, 33619980);
          return finishNode(state, context, pos, {
              type: 'JSXSpreadAttribute',
              argument: expression,
          });
      }
      function parseJSXNamespacedName(state, context, namespace, pos) {
          expect(state, context, 33554450);
          const name = parseJSXIdentifier(state, context);
          return finishNode(state, context, pos, {
              type: 'JSXNamespacedName',
              namespace,
              name,
          });
      }
      function parseJSXIdentifier(state, context) {
          if (!(state.token & (8388608 | 8417280)))
              report(state, 0);
          const pos = getLocation(state);
          const tokenValue = state.tokenValue;
          nextToken(state, context);
          return finishNode(state, context, pos, {
              type: 'JSXIdentifier',
              name: tokenValue,
          });
      }
      function parseJSXAttributeName(state, context) {
          const pos = getLocation(state);
          const identifier = parseJSXIdentifier(state, context);
          return state.token === 33554450 ?
              parseJSXNamespacedName(state, context, identifier, pos) :
              identifier;
      }
      function parseJSXAttribute(state, context) {
          const pos = getLocation(state);
          if (state.token === 33554441)
              return parseJSXSpreadAttribute(state, context);
          scanJSXIdentifier(state);
          const attrName = parseJSXAttributeName(state, context);
          let value = null;
          if (state.token === 167772186) {
              switch (scanJSXAttributeValue(state, context)) {
                  case 4194304:
                      value = parseLiteral(state, context);
                      break;
                  case 33554441:
                      value = parseJSXExpressionContainer(state, context | 16777216);
                      break;
                  case 301991740:
                      value = parseJSXRootElement(state, context | 16777216);
                      break;
                  default:
                      report(state, 48);
              }
          }
          return finishNode(state, context, pos, {
              type: 'JSXAttribute',
              value: value,
              name: attrName,
          });
      }

      function parseExpression(state, context) {
          const pos = getLocation(state);
          const expr = parseAssignmentExpression(state, context);
          if (state.token !== 33554447)
              return expr;
          return parseSequenceExpression(state, context, expr, pos);
      }
      function parseSequenceExpression(state, context, left, pos) {
          const expressions = [left];
          while (optional(state, context, 33554447)) {
              expressions.push(parseAssignmentExpression(state, context));
          }
          return finishNode(state, context, pos, {
              type: 'SequenceExpression',
              expressions,
          });
      }
      function parseYieldExpression(state, context, pos) {
          if (context & 8192)
              report(state, 0);
          expect(state, context, 16491);
          let argument = null;
          let delegate = false;
          if (!(state.flags & 1)) {
              delegate = optional(state, context, 301992496);
              if (delegate || isStartOfExpression(state.token)) {
                  argument = parseAssignmentExpression(state, context);
              }
          }
          return finishNode(state, context, pos, {
              type: 'YieldExpression',
              argument,
              delegate,
          });
      }
      function parseAssignmentExpression(state, context) {
          const pos = getLocation(state);
          const t = state.token;
          if (context & 2048 && t === 16491)
              return parseYieldExpression(state, context, pos);
          const isAsync = t === 4205 && lookAheadOrScan(state, context, nextTokenIsIdentifierOrLeftParen, true);
          let expr = parseConditionalExpression(state, context, pos);
          if (isAsync) {
              if (state.token & 8388608) {
                  expr = parseArrowFunction(state, context, pos, [parseIdentifier(state, context)], true);
                  state.assignable = false;
              }
              else if (state.token === 33554439) {
                  expr = parseArrowFunction(state, context, pos, expr, t === 4205);
                  state.assignable = false;
              }
          }
          else if (state.token === 33554439) {
              expr = parseArrowFunction(state, context, pos, t & 8392704 ? [expr] : expr, false);
              state.assignable = false;
          }
          if (state.token & 134217728) {
              const operator = state.token;
              if (state.token === 167772186) {
                  if (expr.type === 'ArrayExpression' ||
                      expr.type === 'ObjectExpression') {
                      reinterpret(state, context, expr);
                  }
              }
              nextToken(state, context | 1024);
              const right = parseAssignmentExpression(state, context);
              return finishNode(state, context, pos, {
                  type: 'AssignmentExpression',
                  left: expr,
                  operator: KeywordDescTable[operator & 255],
                  right,
              });
          }
          return expr;
      }
      function parseConditionalExpression(state, context, pos) {
          const test = parseBinaryExpression(state, context, 0, pos);
          if (!optional(state, context | 1024, 33554451))
              return test;
          const consequent = parseAssignmentExpression(state, context);
          expect(state, context | 1024, 33554450);
          const alternate = parseAssignmentExpression(state, context);
          return finishNode(state, context, pos, {
              type: 'ConditionalExpression',
              test,
              consequent,
              alternate,
          });
      }
      function parseBinaryExpression(state, context, minPrec, pos, left = parseUnaryExpression(state, context)) {
          const bit = (context & 2097152) === 2097152;
          while (state.token & 268435456) {
              const t = state.token;
              const prec = t & 3840;
              const delta = (t === 301992755) << 8;
              if (bit && t === 301999918)
                  break;
              if (prec + delta <= minPrec)
                  break;
              nextToken(state, context | 1024);
              left = finishNode(state, context, pos, {
                  type: t & 131072 ? 'LogicalExpression' : 'BinaryExpression',
                  left,
                  right: parseBinaryExpression(state, context, prec, getLocation(state)),
                  operator: KeywordDescTable[t & 255],
              });
          }
          return left;
      }
      function parseAwaitExpression(state, context, pos) {
          if (context & 8192)
              report(state, 0);
          nextToken(state, context | 1024);
          return finishNode(state, context, pos, {
              type: 'AwaitExpression',
              argument: parseUnaryExpression(state, context | 1024),
          });
      }
      function parseUnaryExpression(state, context) {
          const pos = getLocation(state);
          const t = state.token;
          if (t === 4206 && context & 4096)
              return parseAwaitExpression(state, context, pos);
          if (t & 536870912) {
              nextToken(state, context | 1024);
              const argument = parseUnaryExpression(state, context);
              state.assignable = false;
              return finishNode(state, context, pos, {
                  type: 'UnaryExpression',
                  operator: KeywordDescTable[t & 255],
                  argument,
                  prefix: true,
              });
          }
          return parseUpdateExpression(state, context);
      }
      function parseUpdateExpression(state, context) {
          const pos = getLocation(state);
          const { token } = state;
          if (state.token & 1073741824) {
              nextToken(state, context);
              const expr = parseLeftHandSideExpression(state, context, pos);
              if (!state.assignable)
                  report(state, 0);
              return finishNode(state, context, pos, {
                  type: 'UpdateExpression',
                  argument: expr,
                  operator: KeywordDescTable[token & 255],
                  prefix: true,
              });
          }
          else if (context & 16 && token === 301991740) {
              return parseJSXRootElement(state, context | 16777216);
          }
          const expression = parseLeftHandSideExpression(state, context, pos);
          if (state.token & 1073741824 && (state.flags & 1) < 1) {
              if (!state.assignable)
                  report(state, 0);
              const operator = state.token;
              nextToken(state, context);
              return finishNode(state, context, pos, {
                  type: 'UpdateExpression',
                  argument: expression,
                  operator: KeywordDescTable[operator & 255],
                  prefix: false,
              });
          }
          return expression;
      }
      function parseLeftHandSideExpression(state, context, pos) {
          let expr = parseNewOrMemberExpression(state, context);
          while (true) {
              switch (state.token) {
                  case 33554442:
                      state.assignable = true;
                      state.destructible = false;
                      nextToken(state, context);
                      if (!(state.token & (8388608 | 8417280))) {
                          report(state, 0);
                      }
                      expr = finishNode(state, context, pos, {
                          type: 'MemberExpression',
                          object: expr,
                          computed: false,
                          property: parseIdentifier(state, context),
                      });
                      continue;
                  case 33554448:
                      state.destructible = false;
                      state.assignable = true;
                      nextToken(state, context);
                      expr = finishNode(state, context, pos, {
                          type: 'MemberExpression',
                          object: expr,
                          computed: true,
                          property: parseExpression(state, context),
                      });
                      expect(state, context, 33554449);
                      break;
                  case 33554440:
                      state.assignable = false;
                      state.destructible = false;
                      const args = parseArgumentList(state, context);
                      if (state.token === 33554439)
                          return args;
                      expr = finishNode(state, context, pos, {
                          type: 'CallExpression',
                          callee: expr,
                          arguments: args,
                      });
                      break;
                  case 67108870:
                      state.assignable = false;
                      expr = finishNode(state, context, pos, {
                          type: 'TaggedTemplateExpression',
                          tag: expr,
                          quasi: parseTemplateLiteral(state, context),
                      });
                      break;
                  case 67108869:
                      state.assignable = false;
                      expr = finishNode(state, context, pos, {
                          type: 'TaggedTemplateExpression',
                          tag: expr,
                          quasi: parseTemplate(state, context | 65536),
                      });
                      break;
                  default:
                      return expr;
              }
          }
      }
      function parseSuperProperty(state, context, pos) {
          return finishNode(state, context, pos, {
              type: 'Super',
          });
      }
      function parseMetaProperty(state, context, meta, pos) {
          return finishNode(state, context, pos, {
              meta,
              type: 'MetaProperty',
              property: parseIdentifier(state, context),
          });
      }
      function parseNewTargetExpression(state, context, id, pos) {
          if (context & 524288 && state.tokenValue === 'target') {
              return parseMetaProperty(state, context, id, pos);
          }
          report(state, 0);
      }
      function parseNewOrMemberExpression(state, context) {
          const pos = getLocation(state);
          if (state.token === 8279) {
              let result;
              const id = parseIdentifier(state, context | 1024);
              if (state.token === 8281) {
                  state.assignable = false;
                  result = parseSuperProperty(state, context, pos);
              }
              else if (optional(state, context, 33554442)) {
                  state.assignable = false;
                  return parseNewTargetExpression(state, context, id, pos);
              }
              else {
                  state.assignable = false;
                  result = parseNewOrMemberExpression(state, context);
              }
              return finishNode(state, context, pos, {
                  type: 'NewExpression',
                  callee: result,
                  arguments: state.token === 33554440 ? parseArgumentList(state, context) : [],
              });
          }
          return parseMemberExpression(state, context, pos);
      }
      function parseMemberExpression(state, context, pos) {
          let result;
          if (state.token === 8281) {
              result = parseSuperProperty(state, context, pos);
          }
          else if (state.token === 8278) {
              result = parseImportExpressions(state, context, pos);
          }
          else {
              result = parsePrimaryExpression(state, context, pos);
          }
          return parseMemberExpressionContinuation(state, context, result, pos);
      }
      function parseImportExpressions(state, context, pos) {
          const id = parseIdentifier(state, context);
          if (optional(state, context, 33554442)) {
              if (!(context & 32768) || state.tokenValue !== 'meta') {
                  report(state, 0);
              }
              return parseMetaProperty(state, context, id, pos);
          }
          let expr = parseImportCall(state, context, pos);
          expect(state, context, 33554440);
          const args = parseAssignmentExpression(state, context);
          expect(state, context, 33554445);
          expr = finishNode(state, context, pos, {
              type: 'CallExpression',
              callee: expr,
              arguments: [args],
          });
          return expr;
      }
      function parseImportCall(state, context, pos) {
          return finishNode(state, context, pos, {
              type: 'Import',
          });
      }
      function parseMemberExpressionContinuation(state, context, expr, pos) {
          while (true) {
              switch (state.token) {
                  case 33554442:
                      state.assignable = true;
                      state.destructible = false;
                      nextToken(state, context);
                      if (!(state.token & (8388608 | 8417280))) {
                          report(state, 0);
                      }
                      expr = finishNode(state, context, pos, {
                          type: 'MemberExpression',
                          object: expr,
                          computed: false,
                          property: parseIdentifier(state, context),
                      });
                      continue;
                  case 33554448:
                      state.destructible = false;
                      state.assignable = true;
                      nextToken(state, context);
                      expr = finishNode(state, context, pos, {
                          type: 'MemberExpression',
                          object: expr,
                          computed: true,
                          property: parseExpression(state, context),
                      });
                      expect(state, context, 33554449);
                      break;
                  case 67108870:
                      state.assignable = false;
                      expr = finishNode(state, context, pos, {
                          type: 'TaggedTemplateExpression',
                          tag: expr,
                          quasi: parseTemplateLiteral(state, context),
                      });
                      break;
                  case 67108869:
                      state.assignable = false;
                      expr = finishNode(state, context, pos, {
                          type: 'TaggedTemplateExpression',
                          tag: expr,
                          quasi: parseTemplate(state, context | 65536),
                      });
                      break;
                  default:
                      return expr;
              }
          }
      }
      function parseArgumentList(state, context) {
          nextToken(state, context | 1024);
          const expressions = [];
          while (state.token !== 33554445) {
              expressions.push(state.token === 33554443 ? parseSpreadElement(state, context) : parseAssignmentExpression(state, context));
              if (state.token !== 33554445)
                  expect(state, context | 1024, 33554447);
          }
          expect(state, context, 33554445);
          return expressions;
      }
      function parseTemplateLiteral(parser, context) {
          const pos = getLocation(parser);
          return finishNode(parser, context, pos, {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [parseTemplateSpans(parser, context)],
          });
      }
      function parseTemplateHead(parser, context, cooked = null, raw, pos) {
          parser.token = consumeTemplateBrace(parser, context);
          return finishNode(parser, context, pos, {
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
          expect(parser, context, 67108869);
          expressions.push(parseExpression(parser, context));
          const t = getLocation(parser);
          quasis.push(parseTemplateHead(parser, context, tokenValue, tokenRaw, pos));
          if (parser.token === 67108870) {
              quasis.push(parseTemplateSpans(parser, context, t));
          }
          else {
              parseTemplate(parser, context, expressions, quasis);
          }
          return finishNode(parser, context, pos, {
              type: 'TemplateLiteral',
              expressions,
              quasis,
          });
      }
      function parseTemplateSpans(state, context, pos = getLocation(state)) {
          const { tokenValue, tokenRaw } = state;
          expect(state, context, 67108870);
          return finishNode(state, context, pos, {
              type: 'TemplateElement',
              value: {
                  cooked: tokenValue,
                  raw: tokenRaw,
              },
              tail: true,
          });
      }
      function parsePrimaryExpression(state, context, pos) {
          switch (state.token) {
              case 8388705:
              case 8388704:
              case 16490:
              case 16491:
              case 4206:
              case 125:
              case 8388608:
                  state.assignable = true;
                  return parseIdentifier(state, context | 65536);
              case 4194304:
              case 2097152:
                  state.assignable = true;
                  return parseLiteral(state, context);
              case 2097275:
                  state.assignable = false;
                  return parseBigIntLiteral(state, context);
              case 16777216:
                  state.assignable = false;
                  return parseRegularExpressionLiteral(state, context);
              case 8193:
              case 8194:
              case 8195:
                  state.assignable = false;
                  return parseNullOrTrueOrFalseLiteral(state, context);
              case 8283:
                  state.assignable = false;
                  return parseThisExpression(state, context);
              case 8276:
                  return parseFunctionExpression(state, context, pos, false);
              case 8266:
                  return parseClassExpression(state, context);
              case 16453:
                  return parseLetAsIdentifier(state, context);
              case 4205:
                  const expr = parseIdentifier(state, context);
                  if (state.flags & 1) {
                      if (context & 16384)
                          report(state, 0);
                      return expr;
                  }
                  if (state.token === 8276) {
                      return parseFunctionExpression(state, context, pos, true);
                  }
                  return expr;
              case 67108870:
                  state.assignable = false;
                  return parseTemplateLiteral(state, context);
              case 67108869:
                  state.assignable = false;
                  return parseTemplate(state, context);
              case 33554448:
                  return parseArrayLiteral(state, context);
              case 33554441:
                  return parseObjectLiteral(state, context);
              case 33554440:
                  return parseGroupExpression(state, context);
              default:
                  if (state.token & (16384 | 8392704))
                      return parseIdentifier(state, context | 65536);
                  report(state, 0);
          }
      }
      function parseLetAsIdentifier(state, context) {
          if (context & 16384)
              report(state, 0);
          const pos = getLocation(state);
          const name = state.tokenValue;
          nextToken(state, context);
          if (state.flags & 1 && state.token === 33554448)
              report(state, 0);
          return finishNode(state, context, pos, {
              type: 'Identifier',
              name,
          });
      }
      function parseRegularExpressionLiteral(state, context) {
          const pos = getLocation(state);
          const tokenRegExp = state.tokenRegExp;
          const tokenValue = state.tokenValue;
          const tokenRaw = state.tokenRaw;
          nextToken(state, context);
          const node = finishNode(state, context, pos, {
              type: 'Literal',
              value: tokenValue,
              regex: tokenRegExp,
          });
          if (context & 1)
              node.raw = tokenRaw;
          return node;
      }
      function parseSpreadProperties(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554443);
          const argument = parseAssignmentExpression(state, context);
          return finishNode(state, context, pos, {
              type: 'SpreadElement',
              argument,
          });
      }
      function parseObjectLiteral(state, context) {
          const pos = getLocation(state);
          const properties = [];
          nextToken(state, context);
          context = (context | 2097152) ^ 2097152;
          while (state.token !== 33619980) {
              properties.push(state.token === 33554443 ?
                  parseSpreadProperties(state, context) :
                  parsePropertyDefinition(state, context));
              if (state.token !== 33619980) {
                  expect(state, context, 33554447);
              }
          }
          expect(state, context, 33619980);
          state.assignable = true;
          return finishNode(state, context, pos, {
              type: 'ObjectExpression',
              properties,
          });
      }
      function parsePropertyDefinition(state, context) {
          const pos = getLocation(state);
          let key;
          let value;
          let kind = 'init';
          let shorthand = false;
          let method = false;
          let token = state.token;
          let isComputed = false;
          let isGenerator = optional(state, context | 1024, 301992496);
          let isAsync = false;
          if (state.token & 6291456) {
              key = parseLiteral(state, context);
              if (state.token === 33554440) {
                  method = true;
                  value = parseMethodDeclaration(state, context, isGenerator, isAsync);
              }
              else {
                  expect(state, context | 1024, 33554450);
                  value = parseAssignmentExpression(state, context);
              }
          }
          else if (state.token & (8392704 | 8192 | 16384)) {
              token = state.token;
              key = parseIdentifier(state, context);
              if (state.token & (8392704 | 4194304 | 2097152)) {
                  if (token === 4205) {
                      kind = 'init';
                      method = true;
                      isAsync = true;
                      isGenerator = optional(state, context | 1024, 301992496);
                      key = state.token & 8392704 ? parseIdentifier(state, context) : parseLiteral(state, context);
                  }
                  else {
                      kind = token === 4208 ? 'get' : token === 4209 ? 'set' : 'init';
                      key = parseIdentifier(state, context);
                  }
                  value = parseMethodDeclaration(state, context, isGenerator, isAsync);
              }
              else if (state.token & 16384) {
                  key = parseIdentifier(state, context);
                  isAsync = token === 4205;
                  kind = token === 4208 ? 'get' : token === 4209 ? 'set' : 'init';
                  value = parseMethodDeclaration(state, context, isGenerator, isAsync);
              }
              else if (state.token === 33554448) {
                  nextToken(state, context);
                  key = parseAssignmentExpression(state, context);
                  expect(state, context, 33554449);
                  isAsync = token === 4205;
                  kind = token === 4208 ? 'get' : token === 4209 ? 'set' : 'init';
                  method = token === 4205;
                  value = parseMethodDeclaration(state, context, isGenerator, isAsync);
              }
              else if (state.token === 301992496) {
                  isGenerator = optional(state, context | 1024, 301992496);
                  if (token === 4208 || token === 4209)
                      report(state, 0);
                  isAsync = token === 4205;
                  method = true;
                  key = parseIdentifier(state, context);
                  value = parseMethodDeclaration(state, context, isGenerator, isAsync);
              }
              else if (state.token === 33554440) {
                  method = true;
                  value = parseMethodDeclaration(state, context, isGenerator, isAsync);
              }
              else if (optional(state, context | 1024, 33554450)) {
                  value = parseAssignmentExpression(state, context);
              }
              else if (optional(state, context, 167772186)) {
                  shorthand = true;
                  value = parseAssignmentPattern(state, context, key, pos);
              }
              else {
                  shorthand = true;
                  value = key;
              }
          }
          else if (state.token === 33554448) {
              nextToken(state, context);
              isComputed = true;
              key = parseAssignmentExpression(state, context);
              expect(state, context, 33554449);
              if (state.token === 33554440) {
                  method = true;
                  value = parseMethodDeclaration(state, context, isGenerator, isAsync);
              }
              else if (optional(state, context | 1024, 33554450)) {
                  value = parseAssignmentExpression(state, context);
              }
              else if (optional(state, context, 167772186)) {
                  shorthand = true;
                  value = parseAssignmentPattern(state, context, key, pos);
              }
              else {
                  shorthand = true;
                  value = key;
              }
          }
          else {
              report(state, 0);
          }
          return finishNode(state, context, pos, {
              type: 'Property',
              key,
              value,
              kind,
              computed: isComputed,
              method,
              shorthand,
          });
      }
      function parseArrowFunction(state, context, pos, params, isAsync) {
          nextToken(state, context);
          const expression = state.token !== 33554441;
          for (const i in params)
              reinterpret(state, context | 8192, params[i]);
          context = (context | 2048) ^ 2048;
          context = (context | 4096) ^ 4096;
          context = (context | 8192) ^ 8192;
          if (isAsync)
              context = context | 4096;
          const body = expression ? parseAssignmentExpression(state, context) : parseFunctionBody(state, context | 1048576 | 1024);
          return finishNode(state, context, pos, {
              type: 'ArrowFunctionExpression',
              body,
              params,
              id: null,
              async: isAsync,
              generator: false,
              expression,
          });
      }
      function parseGroupExpression(state, context) {
          nextToken(state, context | 1024);
          if (state.token === 33554445) {
              nextToken(state, context);
              if (state.token !== 33554439)
                  report(state, 0);
              state.assignable = false;
              return [];
          }
          else if (state.token === 33554443) {
              const rest = [parseRestElement(state, context)];
              expect(state, context, 33554445);
              if (state.token !== 33554439)
                  report(state, 0);
              state.assignable = false;
              return rest;
          }
          state.assignable = true;
          const pos = getLocation(state);
          let expr = parseAssignmentExpression(state, context);
          if (state.token === 33554447) {
              const expressions = [expr];
              while (optional(state, context | 1024, 33554447)) {
                  if (state.token === 33554443) {
                      const restElement = parseRestElement(state, context);
                      expect(state, context, 33554445);
                      if (state.token !== 33554439)
                          report(state, 0);
                      expressions.push(restElement);
                      return expressions;
                  }
                  else if (optional(state, context, 33554445)) {
                      if (state.token !== 33554439)
                          report(state, 0);
                      return expressions;
                  }
                  else {
                      expressions.push(parseAssignmentExpression(state, context));
                  }
              }
              expr = finishNode(state, context, pos, {
                  type: 'SequenceExpression',
                  expressions,
              });
              state.assignable = false;
          }
          expect(state, context, 33554445);
          if (state.token === 33554439)
              return expr.type === 'SequenceExpression' ? expr.expressions : [expr];
          return expr;
      }
      function parseSpreadElement(state, context) {
          const pos = getLocation(state);
          expect(state, context | 1024, 33554443);
          const argument = parseAssignmentExpression(state, context);
          return finishNode(state, context, pos, {
              type: 'SpreadElement',
              argument,
          });
      }
      function parseArrayLiteral(state, context) {
          const pos = getLocation(state);
          nextToken(state, context | 1024);
          context = (context | 2097152) ^ 2097152;
          const elements = [];
          while (state.token !== 33554449) {
              if (optional(state, context | 1024, 33554447)) {
                  elements.push(null);
              }
              else if (state.token === 33554443) {
                  elements.push(parseSpreadElement(state, context));
                  if (state.token !== 33554449) {
                      expect(state, context, 33554447);
                  }
              }
              else {
                  elements.push(parseAssignmentExpression(state, context));
                  if (state.token !== 33554449)
                      expect(state, context | 1024, 33554447);
              }
          }
          expect(state, context, 33554449);
          state.assignable = true;
          return finishNode(state, context, pos, {
              type: 'ArrayExpression',
              elements,
          });
      }
      function parseBigIntLiteral(state, context) {
          const pos = getLocation(state);
          const tokenValue = state.tokenValue;
          const tokenRaw = state.tokenRaw;
          nextToken(state, context);
          return finishNode(state, context, pos, {
              type: 'Literal',
              value: tokenValue,
              bigint: tokenRaw,
              raw: tokenRaw,
          });
      }
      function parseNullOrTrueOrFalseLiteral(state, context) {
          const pos = getLocation(state);
          const t = state.token;
          const raw = KeywordDescTable[t & 255];
          nextToken(state, context);
          return finishNode(state, context, pos, {
              type: 'Literal',
              value: t === 8195 ? null : raw === 'true',
          });
      }
      function parseThisExpression(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          return finishNode(state, context, pos, {
              type: 'ThisExpression',
          });
      }
      function parseIdentifier(state, context) {
          const pos = getLocation(state);
          const tokenValue = state.tokenValue;
          nextToken(state, context);
          return finishNode(state, context, pos, {
              type: 'Identifier',
              name: tokenValue
          });
      }
      function parseLiteral(state, context) {
          const pos = getLocation(state);
          const tokenValue = state.tokenValue;
          const tokenRaw = state.tokenRaw;
          nextToken(state, context);
          return finishNode(state, context, pos, {
              type: 'Literal',
              value: tokenValue,
              raw: tokenRaw
          });
      }
      function parseFunctionExpression(state, context, pos, isAsync) {
          nextToken(state, context | 1024);
          const isGenerator = optional(state, context | 1024, 301992496);
          let id = null;
          if (state.token & (10489856 | 16384)) {
              id = parseIdentifier(state, context);
          }
          context = (context | 2048) ^ 2048;
          context = (context | 4096) ^ 4096;
          if (isGenerator)
              context = context | 2048;
          if (isAsync)
              context = context | 4096;
          const params = parseFormalParameters(state, context | 524288 | 8192);
          const body = parseFunctionBody(state, context | 524288 | 1048576);
          return finishNode(state, context, pos, {
              type: 'FunctionExpression',
              params,
              body,
              async: isAsync,
              generator: isGenerator,
              expression: false,
              id,
          });
      }
      function parseFormalParameters(state, context) {
          expect(state, context, 33554440);
          const params = [];
          if (state.token === 33554447)
              report(state, 0);
          while (state.token !== 33554445) {
              if (state.token === 33554443) {
                  params.push(parseRestElement(state, context));
                  break;
              }
              if (optional(state, context, 33554447)) {
                  if (state.token === 33554447)
                      report(state, 0);
              }
              else {
                  params.push(parseFormalParameterList(state, context));
              }
          }
          expect(state, context, 33554445);
          return params;
      }
      function parseFormalParameterList(state, context) {
          const pos = getLocation(state);
          const left = parseBindingIdentifierOrPattern(state, context);
          if (!optional(state, context, 167772186))
              return left;
          return finishNode(state, context, pos, {
              type: 'AssignmentPattern',
              left,
              right: parseAssignmentExpression(state, context),
          });
      }
      function parseFunctionBody(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          const body = [];
          if (state.token !== 33619980) {
              while (state.token & 4194304) {
                  if (state.tokenValue.length === 10 && state.tokenValue === 'use strict') {
                      if (state.flags & 8)
                          report(state, 0);
                      context |= 16384;
                  }
                  body.push(parseDirective(state, context));
              }
              const previousSwitchStatement = state.switchStatement;
              const previousIterationStatement = state.iterationStatement;
              if ((state.switchStatement & 1) === 1) {
                  state.switchStatement = 2;
              }
              if ((state.iterationStatement & 1) === 1) {
                  state.iterationStatement = 2;
              }
              addCrossingBoundary(state);
              while (state.token !== 33619980) {
                  body.push(parseStatementListItem(state, context));
              }
              state.labelDepth--;
              state.switchStatement = previousSwitchStatement;
              state.iterationStatement = previousIterationStatement;
          }
          expect(state, context, 33619980);
          return finishNode(state, context, pos, {
              type: 'BlockStatement',
              body,
          });
      }
      function parseClassExpression(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          context = context |= 16384;
          let id = null;
          let superClass = null;
          if (state.token !== 33554441 && state.token !== 8273) {
              id = parseIdentifier(state, context);
          }
          if (optional(state, context, 8273)) {
              superClass = parseLeftHandSideExpression(state, context | 16384, pos);
          }
          const body = parseClassBodyAndElementList(state, context);
          return finishNode(state, context, pos, {
              type: 'ClassExpression',
              id,
              superClass,
              body,
          });
      }
      function parseClassBodyAndElementList(state, context) {
          const pos = getLocation(state);
          expect(state, context | 1024, 33554441);
          const body = [];
          while (state.token !== 33619980) {
              if (!optional(state, context, 33619982)) {
                  body.push(parseClassElement(state, context));
              }
          }
          expect(state, context | 1024, 33619980);
          return finishNode(state, context, pos, {
              type: 'ClassBody',
              body,
          });
      }
      function parseClassElement(state, context) {
          const pos = getLocation(state);
          let key;
          let value;
          let isStatic = false;
          let isComputed = false;
          let kind = 'method';
          let isGenerator = optional(state, context, 301992496);
          let isAsync = false;
          let token = state.token;
          if (token & 6291456) {
              key = parseLiteral(state, context);
              value = parseMethodDeclaration(state, context, isGenerator, isAsync);
          }
          else if (token & 8392704) {
              kind = state.token === 4207 ? 'constructor' : 'method';
              token = state.token;
              key = parseIdentifier(state, context);
              if (state.token & 8392704) {
                  kind = token === 4209 ? 'set' : token === 4208 ? 'get' : 'method';
                  isAsync = token === 4205;
                  key = parseIdentifier(state, context);
              }
              else if (state.token === 33554448) {
                  isAsync = token === 4205;
                  isComputed = true;
                  kind = token === 4209 ? 'set' : token === 4208 ? 'get' : 'method';
                  nextToken(state, context);
                  key = parseAssignmentExpression(state, context);
                  expect(state, context, 33554449);
              }
              value = parseMethodDeclaration(state, context, isGenerator, isAsync);
          }
          else if (token === 16490) {
              key = parseIdentifier(state, context);
              if (state.token !== 33554450 && state.token !== 33554441 && state.token !== 167772186) {
                  isStatic = true;
                  isGenerator = optional(state, context, 301992496);
                  if (state.token === 4205) {
                      isAsync = true;
                      isGenerator = optional(state, context, 301992496);
                      token = state.token;
                      key = parseIdentifier(state, context);
                  }
                  if (state.token === 4208) {
                      isGenerator = optional(state, context, 301992496);
                      kind = state.token === 33554448 ? 'method' : 'get';
                      token = state.token;
                      key = parseIdentifier(state, context);
                  }
                  else if (state.token === 4209) {
                      isGenerator = optional(state, context, 301992496);
                      token = state.token;
                      key = parseIdentifier(state, context);
                  }
                  if (state.token === 33554448) {
                      isComputed = true;
                      kind = token === 4209 ? 'set' : token === 4208 ? 'get' : 'method';
                      key = parseComputedPropertyName(state, context);
                  }
                  else
                      key = parseIdentifier(state, context);
              }
              value = parseMethodDeclaration(state, context, isGenerator, isAsync);
          }
          else if (state.token === 33554448) {
              isAsync = token === 4205;
              isComputed = true;
              nextToken(state, context);
              key = parseAssignmentExpression(state, context);
              expect(state, context, 33554449);
              value = parseMethodDeclaration(state, context, isGenerator, isAsync);
          }
          else {
              report(state, 0);
          }
          return finishNode(state, context, pos, {
              type: 'MethodDefinition',
              kind,
              static: isStatic,
              computed: isComputed,
              key,
              value,
          });
      }
      function parseMethodDeclaration(state, context, isGenerator, isAsync) {
          const pos = getLocation(state);
          context = (context | 2048) ^ 2048;
          context = (context | 4096) ^ 4096;
          context = (context | 8192) ^ 8192;
          if (isGenerator)
              context = context | 2048;
          if (isAsync)
              context = context | 4096;
          const params = parseFormalParameters(state, context | 524288 | 8192);
          const body = parseFunctionBody(state, context | 524288 | 1048576);
          return finishNode(state, context, pos, {
              type: 'FunctionExpression',
              params,
              body,
              async: isAsync,
              generator: isGenerator,
              expression: false,
              id: null,
          });
      }
      function parseComputedPropertyName(state, context) {
          expect(state, context, 33554448);
          const key = parseAssignmentExpression(state, context);
          expect(state, context, 33554449);
          return key;
      }
      function parsePropertyName(state, context) {
          switch (state.token) {
              case 2097152:
              case 4194304:
                  return parseLiteral(state, context);
              case 33554448:
                  return parseComputedPropertyName(state, context);
              default:
                  return parseIdentifier(state, context);
          }
      }
      function parseRestElement(state, context) {
          const pos = getLocation(state);
          expect(state, context, 33554443);
          const argument = parseBindingIdentifierOrPattern(state, context);
          return finishNode(state, context, pos, {
              type: 'RestElement',
              argument,
          });
      }

      function parseClassDeclaration(state, context) {
          const pos = getLocation(state);
          context |= 16384;
          expect(state, context, 8266);
          let id = null;
          if (state.token & 8392704 && state.token !== 8273) {
              id = parseBindingIdentifier(state, context);
          }
          else if (!(context & 4194304))
              report(state, 0);
          let superClass = null;
          if (optional(state, context, 8273)) {
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
      function parseFunctionDeclaration(state, context, isAsync, pos = getLocation(state)) {
          nextToken(state, context);
          let isGenerator = false;
          if (state.token === 301992496) {
              if (context & 8388608)
                  report(state, 0);
              nextToken(state, context | 1024);
              isGenerator = true;
          }
          let id = null;
          if (state.token !== 33554440) {
              id = parseBindingIdentifier(state, context);
          }
          else if (!(context & 4194304))
              report(state, 0);
          context = (context | 2048) ^ 2048;
          context = (context | 4096) ^ 4096;
          if (isGenerator)
              context = context | 2048;
          if (isAsync)
              context = context | 4096;
          const params = parseFormalParameters(state, context | 524288 | 8192);
          const body = parseFunctionBody(state, context | 524288 | 1048576);
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
      function parseVariableDeclarationList(state, context, type, origin) {
          let elementCount = 1;
          const list = [parseVariableDeclaration(state, context, type, origin)];
          while (optional(state, context, 33554447)) {
              list.push(parseVariableDeclaration(state, context, type, origin));
              ++elementCount;
          }
          if (origin & 1 && isInOrOf(state) && elementCount > 1) {
              report(state, 29, KeywordDescTable[state.token & 255]);
          }
          return list;
      }
      function parseVariableDeclaration(state, context, type, origin) {
          if ((type === 4 || type === 8) && state.token === 16453)
              report(state, 0);
          const isBinding = state.token === 33554441 || state.token === 33554448;
          const pos = getLocation(state);
          const id = parseBindingIdentifierOrPattern(state, context);
          let init = null;
          if (state.token === 167772186) {
              nextToken(state, context | 1024);
              init = parseAssignmentExpression(state, context);
              if (isInOrOf(state) && (origin & 1 || isBinding)) {
                  if (state.token === 301999918) {
                      if (type & 8 || type & 4 || isBinding) {
                          report(state, 31, KeywordDescTable[state.token & 255]);
                      }
                  }
                  else
                      report(state, 31, KeywordDescTable[state.token & 255]);
              }
          }
          else if (!isInOrOf(state) && (type & 8 || isBinding)) {
              report(state, 30, type & 8 ? 'const' : 'destructuring');
          }
          return finishNode(state, context, pos, {
              type: 'VariableDeclarator',
              init,
              id,
          });
      }
      function isInOrOf(state) {
          return state.token === 301999918 || state.token === 4211;
      }

      function parseStatementList(state, context) {
          nextToken(state, context);
          const statements = [];
          while (state.token & 4194304) {
              const tokenValue = state.tokenValue;
              if (!(context & 16384) && tokenValue.length === 10 && tokenValue === 'use strict') {
                  context |= 16384;
              }
              statements.push(parseDirective(state, context));
          }
          while (state.token !== 65536) {
              statements.push(parseStatementListItem(state, context));
          }
          return statements;
      }
      function parseStatementListItem(state, context) {
          switch (state.token) {
              case 8276:
                  return parseFunctionDeclaration(state, context, false);
              case 8266:
                  return parseClassDeclaration(state, context);
              case 8262:
                  return parseVariableStatement(state, context, 8, 32);
              case 16453:
                  return parseLetOrExpressionStatement(state, context);
              case 4205:
                  return parseAsyncFunctionOrExpressionStatement(state, context);
              case 8278:
                  if (context & 2 && lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true)) {
                      return parseExpressionStatement(state, context);
                  }
              case 8272:
                  if (context & 32768) {
                      report(state, 47, KeywordDescTable[state.token & 255]);
                  }
              default:
                  return parseStatement(state, context, 0);
          }
      }
      function parseStatement(state, context, label) {
          switch (state.token) {
              case 8260:
                  return parseVariableStatement(state, context, 2, 32);
              case 33619982:
                  return parseEmptyStatement(state, context);
              case 8282:
                  return parseSwitchStatement(state, context);
              case 33554441:
                  return parseBlockStatement(state, context);
              case 8280:
                  return parseReturnStatement(state, context);
              case 8277:
                  return parseIfStatement(state, context);
              case 8270:
                  return parseDoWhileStatement(state, context);
              case 8286:
                  return parseWhileStatement(state, context);
              case 8287:
                  return parseWithStatement(state, context);
              case 8263:
                  return parseBreakStatement(state, context);
              case 8267:
                  return parseContinueStatement(state, context);
              case 8268:
                  return parseDebuggerStatement(state, context);
              case 8284:
                  return parseThrowStatement(state, context);
              case 8285:
                  return parseTryStatement(state, context);
              case 8275:
                  return parseForStatement(state, context);
              case 4205:
                  if (lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)) {
                      report(state, 46);
                  }
                  return parseExpressionOrLabelledStatement(state, context, label);
              case 8276:
                  report(state, context & 16384 ? 32 : 33);
              case 8266:
                  report(state, 0);
              default:
                  return parseExpressionOrLabelledStatement(state, context, label);
          }
      }
      function parseSwitchStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          expect(state, context | 1024, 33554440);
          const discriminant = parseExpression(state, context);
          expect(state, context, 33554445);
          expect(state, context, 33554441);
          const cases = [];
          let seenDefault = false;
          const previousSwitchStatement = state.switchStatement;
          state.switchStatement = 1;
          while (state.token !== 33619980) {
              const clausePos = getLocation(state);
              let test = null;
              if (optional(state, context, 8264)) {
                  test = parseExpression(state, context);
              }
              else {
                  expect(state, context, 8269);
                  if (seenDefault)
                      report(state, 45);
                  seenDefault = true;
              }
              cases.push(parseCaseOrDefaultClauses(state, context, clausePos, test));
          }
          state.switchStatement = previousSwitchStatement;
          expect(state, context, 33619980);
          return finishNode(state, context, pos, {
              type: 'SwitchStatement',
              discriminant,
              cases
          });
      }
      function parseCaseOrDefaultClauses(state, context, pos, test) {
          expect(state, context, 33554450);
          const consequent = [];
          while (state.token !== 8264 &&
              state.token !== 33619980 &&
              state.token !== 8269) {
              consequent.push(parseStatementListItem(state, context));
          }
          return finishNode(state, context, pos, {
              type: 'SwitchCase',
              test,
              consequent
          });
      }
      function parseIfStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          expect(state, context | 1024, 33554440);
          const test = parseExpression(state, context);
          expect(state, context, 33554445);
          const consequent = parseConsequentOrAlternate(state, context);
          const alternate = optional(state, context, 8271) ? parseConsequentOrAlternate(state, context) : null;
          return finishNode(state, context, pos, {
              type: 'IfStatement',
              test,
              consequent,
              alternate
          });
      }
      function parseConsequentOrAlternate(state, context) {
          return context & 16384 || state.token !== 8276 ?
              parseStatement(state, context, 1) :
              parseFunctionDeclaration(state, context | 8388608, false);
      }
      function parseDoWhileStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          const previousIterationStatement = state.iterationStatement;
          state.iterationStatement = 1;
          const body = parseStatement(state, context, 1);
          state.iterationStatement = previousIterationStatement;
          expect(state, context, 8286);
          expect(state, context, 33554440);
          const test = parseExpression(state, context);
          expect(state, context, 33554445);
          optional(state, context, 33619982);
          return finishNode(state, context, pos, {
              type: 'DoWhileStatement',
              body,
              test
          });
      }
      function parseWhileStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          expect(state, context | 1024, 33554440);
          const test = parseExpression(state, context);
          expect(state, context, 33554445);
          const previousIterationStatement = state.iterationStatement;
          state.iterationStatement = 1;
          const body = parseStatement(state, context, 1);
          state.iterationStatement = previousIterationStatement;
          return finishNode(state, context, pos, {
              type: 'WhileStatement',
              test,
              body
          });
      }
      function parseContinueStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          let label = null;
          if (!(state.flags & 1) && state.token & 8417280) {
              const tokenValue = state.tokenValue;
              label = parseIdentifier(state, context);
              validateContinueLabel(state, tokenValue);
          }
          consumeSemicolon(state, context);
          if (label === null && state.iterationStatement === 0 && state.switchStatement === 0) {
              report(state, 39);
          }
          return finishNode(state, context, pos, {
              type: 'ContinueStatement',
              label
          });
      }
      function parseBreakStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          let label = null;
          if (!(state.flags & 1) && state.token & 8417280) {
              const tokenValue = state.tokenValue;
              label = parseIdentifier(state, context);
              validateBreakStatement(state, tokenValue);
          }
          else if (state.iterationStatement === 0 && state.switchStatement === 0) {
              report(state, 40);
          }
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'BreakStatement',
              label
          });
      }
      function parseWithStatement(state, context) {
          if (context & 16384)
              report(state, 35);
          const pos = getLocation(state);
          nextToken(state, context);
          expect(state, context | 1024, 33554440);
          const object = parseAssignmentExpression(state, context);
          expect(state, context, 33554445);
          const body = parseStatement(state, context, 1);
          return finishNode(state, context, pos, {
              type: 'WithStatement',
              object,
              body
          });
      }
      function parseDebuggerStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'DebuggerStatement'
          });
      }
      function parseBlockStatement(state, context) {
          const pos = getLocation(state);
          const body = [];
          nextToken(state, context);
          while (state.token !== 33619980) {
              body.push(parseStatementListItem(state, context));
          }
          expect(state, context | 1024, 33619980);
          return finishNode(state, context, pos, {
              type: 'BlockStatement',
              body
          });
      }
      function parseReturnStatement(state, context) {
          if (!(context & (64 | 1048576)))
              report(state, 42);
          const pos = getLocation(state);
          nextToken(state, context | 1024);
          const argument = (state.token & 65536) < 1 && (state.flags & 1) < 1 ?
              parseExpression(state, context & ~1048576) :
              null;
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'ReturnStatement',
              argument
          });
      }
      function parseTryStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          const block = parseBlockStatement(state, context);
          const handler = state.token === 8265 ? parseCatchBlock(state, context) : null;
          const finalizer = optional(state, context, 8274) ? parseBlockStatement(state, context) : null;
          if (!handler && !finalizer)
              report(state, 43);
          return finishNode(state, context, pos, {
              type: 'TryStatement',
              block,
              handler,
              finalizer
          });
      }
      function parseCatchBlock(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          let param = null;
          if (optional(state, context, 33554440)) {
              if (state.token === 33554445)
                  report(state, 44);
              param = parseBindingIdentifierOrPattern(state, context);
              if (state.token === 167772186)
                  report(state, 44);
              expect(state, context, 33554445);
          }
          const body = parseBlockStatement(state, context);
          return finishNode(state, context, pos, {
              type: 'CatchClause',
              param,
              body
          });
      }
      function parseThrowStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          if (state.flags & 1)
              report(state, 41);
          const argument = parseExpression(state, context);
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'ThrowStatement',
              argument
          });
      }
      function parseEmptyStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          return finishNode(state, context, pos, {
              type: 'EmptyStatement'
          });
      }
      function parseVariableStatement(state, context, type, origin) {
          const pos = getLocation(state);
          const { token } = state;
          nextToken(state, context);
          const declarations = parseVariableDeclarationList(state, context, type, origin);
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'VariableDeclaration',
              kind: KeywordDescTable[token & 255],
              declarations
          });
      }
      function parseLetOrExpressionStatement(state, context) {
          return lookAheadOrScan(state, context, isLexical, true)
              ? parseVariableStatement(state, context, 4, 32)
              : parseExpressionOrLabelledStatement(state, context, 1);
      }
      function parseAsyncFunctionOrExpressionStatement(state, context) {
          const pos = getLocation(state);
          return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
              ? parseFunctionDeclaration(state, context, true, pos)
              : parseExpressionOrLabelledStatement(state, context, 1);
      }
      function parseExpressionOrLabelledStatement(state, context, label) {
          const pos = getLocation(state);
          const token = state.token;
          const tokenValue = state.tokenValue;
          const expr = parseExpression(state, context);
          if (token & 8417280 && state.token === 33554450) {
              nextToken(state, context | 1024);
              if (context & 32768 && token === 4206) {
                  report(state, 0);
              }
              else if (token & 8192) {
                  report(state, 0);
              }
              else if (context & (2048 | 16384) && token === 16491) {
                  report(state, 0);
              }
              else if (getLabel(state, `@${tokenValue}`, false, true)) {
                  report(state, 38, tokenValue);
              }
              addLabel(state, tokenValue);
              let body = null;
              if (state.token === 8276 && !(context & 16384) &&
                  label === 0) {
                  body = parseFunctionDeclaration(state, context | 8388608, false);
              }
              else
                  body = parseStatement(state, context, state);
              state.labelDepth--;
              return finishNode(state, context, pos, {
                  type: 'LabeledStatement',
                  label: expr,
                  body
              });
          }
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'ExpressionStatement',
              expression: expr
          });
      }
      function parseForStatement(state, context) {
          const pos = getLocation(state);
          nextToken(state, context);
          const forAwait = !!(context & 4096) && optional(state, context, 4206);
          expect(state, context, 33554440);
          let init = null;
          let declarations = null;
          let type = 'ForStatement';
          let test = null;
          let update = null;
          let right;
          const sequencePos = getLocation(state);
          let bindingType = 0;
          if (state.token !== 33619982) {
              const token = state.token;
              if (token === 8260) {
                  bindingType = 2;
              }
              else if (token === 8262) {
                  bindingType = 8;
              }
              else if (token === 16453 && lookAheadOrScan(state, context, isLexical, true)) {
                  bindingType = 4;
              }
              else
                  init = parseExpression(state, context | 2097152);
              if (bindingType & 14) {
                  const vpos = getLocation(state);
                  nextToken(state, context);
                  declarations = parseVariableDeclarationList(state, context | 2097152, bindingType, 1);
                  init = finishNode(state, context, vpos, {
                      type: 'VariableDeclaration',
                      kind: KeywordDescTable[token & 255],
                      declarations
                  });
              }
          }
          if (forAwait ? expect(state, context, 4211) : optional(state, context, 4211)) {
              type = 'ForOfStatement';
              if (bindingType & 14) ;
              else
                  reinterpret(state, context, init);
              right = parseAssignmentExpression(state, context);
          }
          else if (optional(state, context, 301999918)) {
              type = 'ForInStatement';
              if (bindingType & 14) ;
              else
                  reinterpret(state, context, init);
              right = parseExpression(state, context);
          }
          else {
              expect(state, context, 33619982);
              if (state.token !== 33619982) {
                  test = parseExpression(state, context);
              }
              expect(state, context, 33619982);
              if (state.token !== 33554445)
                  update = parseExpression(state, context);
          }
          expect(state, context, 33554445);
          const previousIterationStatement = state.iterationStatement;
          state.iterationStatement = 1;
          const body = parseStatement(state, context, 1);
          state.iterationStatement = previousIterationStatement;
          return finishNode(state, context, pos, type === 'ForOfStatement' ? {
              type,
              body,
              left: init,
              right,
              await: forAwait
          } :
              right ? {
                  type: type,
                  body,
                  left: init,
                  right
              } : {
                  type: type,
                  body,
                  init,
                  test,
                  update
              });
      }
      function parseExpressionStatement(state, context) {
          const pos = getLocation(state);
          const expr = parseExpression(state, context);
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'ExpressionStatement',
              expression: expr
          });
      }

      function parseModuleItemList(state, context) {
          nextToken(state, context);
          const statements = [];
          while (state.token !== 65536) {
              statements.push(state.token & 4194304 ?
                  parseDirective(state, context) :
                  parseModuleItem(state, context));
          }
          return statements;
      }
      function parseModuleItem(state, context) {
          switch (state.token) {
              case 8272:
                  return parseExportDeclaration(state, context);
              case 8278:
                  if ((context & 2) < 1 && !lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true)) {
                      return parseImportDeclaration(state, context);
                  }
              default:
                  return parseStatementListItem(state, context);
          }
      }
      function parseExportDeclaration(state, context) {
          const pos = getLocation(state);
          const specifiers = [];
          let source = null;
          let declaration = null;
          expect(state, context, 8272);
          if (optional(state, context, 8269)) {
              switch (state.token) {
                  case 8276:
                      declaration = parseFunctionDeclaration(state, context | 4194304, false);
                      break;
                  case 8266:
                      declaration = parseClassDeclaration(state, context | 4194304);
                      break;
                  case 4205:
                      declaration = parseAsyncFunctionOrAssignmentExpression(state, context | 4194304);
                      break;
                  default:
                      declaration = parseAssignmentExpression(state, context);
                      consumeSemicolon(state, context);
              }
              return finishNode(state, context, pos, {
                  type: 'ExportDefaultDeclaration',
                  declaration,
              });
          }
          switch (state.token) {
              case 301992496:
                  {
                      nextToken(state, context);
                      source = parseModuleSpecifier(state, context);
                      consumeSemicolon(state, context);
                      return finishNode(state, context, pos, {
                          type: 'ExportAllDeclaration',
                          source,
                      });
                  }
              case 33554441:
                  {
                      nextToken(state, context);
                      let hasKeywordForLocalBindings = false;
                      while (state.token !== 33619980) {
                          if (!(state.token & (8388608 | 8417280)))
                              report(state, 0);
                          if (state.token & 8192)
                              hasKeywordForLocalBindings = true;
                          const bracePos = getLocation(state);
                          const local = parseIdentifier(state, context);
                          let exported;
                          if (state.token === 4204) {
                              nextToken(state, context);
                              if (!(state.token & (8388608 | 8417280)))
                                  report(state, 0);
                              exported = parseIdentifier(state, context);
                          }
                          else
                              exported = local;
                          specifiers.push(finishNode(state, context, bracePos, {
                              type: 'ExportSpecifier',
                              local,
                              exported,
                          }));
                          if (state.token !== 33619980)
                              expect(state, context, 33554447);
                      }
                      expect(state, context, 33619980);
                      if (state.token === 4210) {
                          nextToken(state, context);
                          if ((state.token & 4194304) !== 4194304)
                              report(state, 0);
                          source = parseLiteral(state, context);
                      }
                      else if (hasKeywordForLocalBindings)
                          report(state, 0);
                      consumeSemicolon(state, context);
                      break;
                  }
              case 8266:
                  declaration = (parseClassDeclaration(state, context));
                  break;
              case 16453:
                  declaration = parseVariableStatement(state, context, 4, 8);
                  break;
              case 8262:
                  declaration = parseVariableStatement(state, context, 8, 8);
                  break;
              case 8260:
                  declaration = parseVariableStatement(state, context, 2, 8);
                  break;
              case 8276:
                  declaration = parseFunctionDeclaration(state, context, false);
                  break;
              case 4205:
                  {
                      const pos = getLocation(state);
                      const line = state.line;
                      nextToken(state, context);
                      if (state.line === line) {
                          declaration = parseFunctionDeclaration(state, context, true, pos);
                          break;
                      }
                  }
              default:
                  report(state, 0);
          }
          return finishNode(state, context, pos, {
              type: 'ExportNamedDeclaration',
              source,
              specifiers,
              declaration,
          });
      }
      function parseImportDeclaration(state, context) {
          const pos = getLocation(state);
          expect(state, context, 8278);
          let source;
          const specifiers = [];
          if (state.token & 8388608) {
              specifiers.push(finishNode(state, context, getLocation(state), {
                  type: 'ImportDefaultSpecifier',
                  local: parseIdentifier(state, context),
              }));
              if (optional(state, context, 33554447)) {
                  if (state.token === 301992496) {
                      parseImportNamespace(state, context, specifiers);
                  }
                  else if (state.token === 33554441) {
                      parseImportSpecifierOrNamedImports(state, context, specifiers);
                  }
                  else
                      report(state, 0);
              }
              source = parseModuleSpecifier(state, context);
          }
          else if (state.token & 4194304) {
              source = parseLiteral(state, context);
          }
          else {
              if (state.token === 301992496) {
                  parseImportNamespace(state, context, specifiers);
              }
              else if (state.token === 33554441) {
                  parseImportSpecifierOrNamedImports(state, context, specifiers);
              }
              else
                  report(state, 0);
              source = parseModuleSpecifier(state, context);
          }
          consumeSemicolon(state, context);
          return finishNode(state, context, pos, {
              type: 'ImportDeclaration',
              specifiers,
              source,
          });
      }
      function parseImportSpecifierOrNamedImports(state, context, specifiers) {
          expect(state, context, 33554441);
          while (state.token !== 33619980) {
              const pos = getLocation(state);
              const t = state.token;
              if (!(t & (8388608 | 8417280)))
                  report(state, 0);
              const imported = parseIdentifier(state, context);
              let local;
              if (optional(state, context, 4204)) {
                  local = parseBindingIdentifier(state, context);
              }
              else {
                  if (t & 8192)
                      report(state, 0);
                  local = imported;
              }
              specifiers.push(finishNode(state, context, pos, {
                  type: 'ImportSpecifier',
                  local,
                  imported,
              }));
              if (state.token !== 33619980)
                  expect(state, context, 33554447);
          }
          expect(state, context, 33619980);
      }
      function parseImportNamespace(state, context, specifiers) {
          const pos = getLocation(state);
          nextToken(state, context);
          expect(state, context, 4204);
          const local = parseBindingIdentifier(state, context);
          specifiers.push(finishNode(state, context, pos, {
              type: 'ImportNamespaceSpecifier',
              local,
          }));
      }
      function parseModuleSpecifier(state, context) {
          expect(state, context, 4210);
          if ((state.token & 4194304) !== 4194304)
              report(state, 0);
          return parseLiteral(state, context);
      }
      function parseAsyncFunctionOrAssignmentExpression(state, context) {
          const pos = getLocation(state);
          return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false) ?
              parseFunctionDeclaration(state, context | 4194304, true, pos) :
              parseAssignmentExpression(state, context);
      }

      function parseSource(source, options, context) {
          let onComment;
          let onToken;
          let sourceFile = '';
          if (options !== undefined) {
              if (options.module)
                  context |= 32768;
              if (options.next)
                  context |= 2;
              if (options.jsx)
                  context |= 16;
              if (options.ranges)
                  context |= 8;
              if (options.loc)
                  context |= 4;
              if (options.raw)
                  context |= 1;
              if (options.rawIdentifier)
                  context |= 32;
              if (options.globalReturn)
                  context |= 64;
              if (options.skipShebang)
                  context |= 128;
              if (!!options.source)
                  sourceFile = options.source;
              if (!!options.comments)
                  context |= 256;
              if (options.impliedStrict)
                  context |= 16384;
              if (options.experimental)
                  context |= 512;
              if (options.onToken !== null)
                  onToken = options.onToken;
              if (options.onComment !== null)
                  onComment = options.onComment;
          }
          const state = new State(source, onToken, onComment);
          skipBomAndShebang(state, context);
          const body = (context & 32768) === 32768 ?
              parseModuleItemList(state, context) : parseStatementList(state, context);
          const node = {
              type: 'Program',
              sourceType: context & 32768 ? 'module' : 'script',
              body: body,
          };
          if (context & 8) {
              node.start = 0;
              node.end = source.length;
          }
          if (context & 4) {
              node.loc = {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: state.line,
                      column: state.column
                  }
              };
              if (sourceFile)
                  node.loc.source = sourceFile;
          }
          return node;
      }
      function parse(source, options) {
          return options && options.module ?
              parseModule(source, options) :
              parseScript(source, options);
      }
      function parseScript(source, options) {
          return parseSource(source, options, 0);
      }
      function parseModule(source, options) {
          return parseSource(source, options, 16384 | 32768);
      }



      var estree = /*#__PURE__*/Object.freeze({

      });
      exports('ESTree', estree);



      var index = /*#__PURE__*/Object.freeze({
        nextToken: nextToken,
        CommentTypes: CommentTypes,
        skipSingleHTMLComment: skipSingleHTMLComment,
        skipSingleLineComment: skipSingleLineComment,
        skipMultilineComment: skipMultilineComment,
        fromCodePoint: fromCodePoint,
        consume: consume,
        skipToNewLine: skipToNewLine,
        nextChar: nextChar,
        nextUnicodeChar: nextUnicodeChar,
        toHex: toHex,
        mapToToken: mapToToken,
        skipBomAndShebang: skipBomAndShebang,
        scanPrivateName: scanPrivateName,
        lookAheadOrScan: lookAheadOrScan,
        scanIdentifier: scanIdentifier,
        scanIdentifierRest: scanIdentifierRest,
        scanIdentifierUnicodeEscape: scanIdentifierUnicodeEscape,
        maybeIdentifier: maybeIdentifier,
        parseLeadingZeroTable: parseLeadingZeroTable,
        scanNumeric: scanNumeric,
        scanImplicitOctalDigits: scanImplicitOctalDigits,
        scanOctalOrBinaryDigits: scanOctalOrBinaryDigits,
        scanHexDigits: scanHexDigits,
        scanStringLiteral: scanStringLiteral,
        table: table,
        reportInvalidEscapeError: reportInvalidEscapeError,
        readNext: readNext
      });
      exports('Scanner', index);

      function validateRegExp(source) {
          const parser = new State(source, undefined, undefined);
          if (!consume(parser, 47))
              report(parser, 24);
          const { state } = verifyRegExpPattern(parser, 0);
          if (state === 262144)
              report(parser, 24);
          return (state === 65536) ? true : false;
      }

      const version = exports('version', '__VERSION__');

    }
  };
});
