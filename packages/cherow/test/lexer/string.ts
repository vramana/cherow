import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { createParserObject } from '../../src/parser/parser';
import { Context } from '../../src/common';
import { Token, tokenDesc } from '../../src/token';

describe('Lexer - String literals', () => {

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
});
