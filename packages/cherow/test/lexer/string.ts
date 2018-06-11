import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { createParserObject } from '../../src/parser/parser';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - String literals', () => {

  function pass(name: string, opts: any) {
    function test(name: string, context: Context, isEnd: boolean) {
        it(name, () => {
            if (opts.strict !== true) {
                const parser = createParserObject(isEnd ? opts.source : `${opts.source} `, undefined);

                t.deepEqual({
                    token: nextToken(parser, context),
                  //  hasNext: hasNext(parser),
                    value: parser.tokenValue,
                    raw: context & Context.OptionsRaw ? parser.tokenRaw : undefined,
                    line: parser.line,
                    column: parser.column,
                }, {
                    token: Token.StringLiteral,
               //     hasNext: !isEnd,
                    value: opts.value,
                    raw: context & Context.OptionsRaw ? opts.raw : undefined,
                    line: opts.line,
                    column: opts.column,
                });
            }

            if (opts.strict !== false) {
                const parser = createParserObject(isEnd ? opts.source : `${opts.source} `, undefined);

                t.deepEqual({
                    token: nextToken(parser, context | Context.Strict),
               //     hasNext: hasNext(parser),
                    value: parser.tokenValue,
                    raw: context & Context.OptionsRaw ? parser.tokenRaw : undefined,
                    line: parser.line,
                    column: parser.column,
                }, {
                    token: Token.StringLiteral,
//                    hasNext: !isEnd,
                    value: opts.value,
                    raw: context & Context.OptionsRaw ? opts.raw : undefined,
                    line: opts.line,
                    column: opts.column,
                });
            }
        });
    }

    test(`${name} (normal, has next)`, Context.Empty, false);
    test(`${name} (with raw, has next)`, Context.OptionsRaw, false);
    test(`${name} (normal, end)`, Context.Empty, true);
    test(`${name} (with raw, end)`, Context.OptionsRaw, true);
}


pass("scans ''", {
  source: "''",
  value: "",
  raw: "''",
  line: 1, column: 2,
});

pass("scans \"\"", {
  source: "\"\"",
  value: "",
  raw: "\"\"",
  line: 1, column: 2,
});

pass("scans 'abc'", {
  source: "'abc'",
  value: "abc",
  raw: "'abc'",
  line: 1, column: 5,
});

pass("scans \"abc\"", {
  source: "\"abc\"",
  value: "abc",
  raw: "\"abc\"",
  line: 1, column: 5,
});

pass("scans '123'", {
  source: "'123'",
  value: "123",
  raw: "'123'",
  line: 1, column: 5,
});

pass("scans \"123\"", {
  source: "\"123\"",
  value: "123",
  raw: "\"123\"",
  line: 1, column: 5,
});


    describe("Pass", () => {

        const inputData: any = [
            [Context.Empty, `"我是一个胖胖的愚蠢的狼"`, Token.StringLiteral, `我是一个胖胖的愚蠢的狼`],
            [Context.Empty, `"中文！！"`, Token.StringLiteral, `中文！！`],
            [Context.Empty, `"English string"`, Token.StringLiteral, `English string`],

        ];

        for (const [ctx, source, token, parsed] of inputData) {
            it(`scans '${source}'`, () => {
                const parser = createParserObject(source, undefined);
                const found = nextToken(parser, ctx);
                t.deepEqual({
                    value: parser.tokenValue,
                    token: found,
                    line: parser.line,
                }, {
                    value: parsed,
                    token,
                    line: 1,
                });
            });
        }
    });

    const enum Chars {
      EnglishUpperA = 0x41,
      EnglishUpperZ = 0x5A,
      EnglishLowerA = 0x61,
      EnglishLowerZ = 0x7A,
      RussianUpperА = 0x410,
      RussianUpperЯ = 0x42F,
      RussianUpperЁ = 0x401,
      RussianLowerА = 0x430,
      RussianLowerЯ = 0x44F,
      RussianLowerЁ = 0x451,
      Zero = 0x30,
      Nine = 0x39,
  }



      for (let code = Chars.EnglishUpperA; code <= Chars.EnglishUpperZ; code++) {
        const letter = String.fromCharCode(code);
        console.log(letter)

        pass("scans " + letter, {
          source: `'${letter}'`,
          value: letter,
          raw: `'${letter}'`,
          line: 1, column: `'${letter}'`.length,
        });


      //    testChar(code);
      }

      for (let code = Chars.EnglishLowerA; code <= Chars.EnglishLowerZ; code++) {
        const letter = String.fromCharCode(code);
        console.log(letter)

        pass("scans " + letter, {
          source: `'${letter}'`,
          value: letter,
          raw: `'${letter}'`,
          line: 1, column: `'${letter}'`.length,
        });


      //    testChar(code);
      }

      for (let code = Chars.RussianUpperА; code <= Chars.RussianUpperЯ; code++) {
        const letter = String.fromCharCode(code);
        console.log(letter)

        pass("scans " + letter, {
          source: `'${letter}'`,
          value: letter,
          raw: `'${letter}'`,
          line: 1, column: `'${letter}'`.length,
        });
      }

      for (let code = Chars.RussianLowerА; code <= Chars.RussianLowerЯ; code++) {
        const letter = String.fromCharCode(code);
        console.log(letter)

        pass("scans " + letter, {
          source: `'${letter}'`,
          value: letter,
          raw: `'${letter}'`,
          line: 1, column: `'${letter}'`.length,
        });
      }
});
