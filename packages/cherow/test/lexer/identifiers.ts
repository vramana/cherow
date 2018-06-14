import { Identifier } from './../../dist/types/estree.d';
import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { createParserObject } from '../../src/parser/parser';
import { Context } from '../../src/common';
import { Token, tokenDesc } from '../../src/token';

describe('Lexer - Identifier', () => {

  function pass(name: string, opts: any) {
    function test(name: string, context: Context) {
        it(name, () => {
            if (opts.strict !== true) {
                const parser = createParserObject(opts.source, undefined);
let ttt = nextToken(parser, context)
console.log(tokenDesc(ttt))
                t.deepEqual({
                    token: ttt,
                    value: parser.tokenValue,
                    line: parser.line,
                    column: parser.column,
                }, {
                    token: opts.token,
                    value: opts.value,
                    line: opts.line,
                    column: opts.column,
                });
            }
        });
    }
    test(`${name}`, Context.OptionsRaw);
}

pass("scans 'a℘'", {
  source: "a℘",
  "value": "a℘",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans 'a℮'", {
  source: "a℮",
  "value": "a℮",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans 'a፭'", {
  source: "a፭",
  "value": "a፭",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans 'a፭'", {
  source: "a፭",
  "value": "a፭",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans 'a፰'", {
  source: "a፰",
  "value": "a፰",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans 'a℘'", {
  source: "a℘",
  "value": "a℘",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans 'a᧚'", {
  source: "a᧚",
  "value": "a᧚",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans 'a·'", {
  source: "a·",
  "value": "a·",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans '℘'", {
  source: "℘",
  "value": "℘",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 1,
});

pass("scans '℮'", {
  source: "℮",
  "value": "℮",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 1,
});

pass("scans '゛'", {
  source: "゛",
  "value": "゛",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 1,
});

pass("scans 'ᢆ'", {
  source: " ᢆ",
  "value": "ᢆ",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans '$4'", {
  source: "$4",
  "value": "$4",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans '$$'", {
  source: "$$",
  "value": "$$",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

pass("scans '$_'", {
  source: "$_",
  "value": "$_",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 2,
});

/*
pass("scans 'cla\\u{73}s'", {
  source: "cla\\u{73}s",
  "value": "class",
  raw: "'abc'",
  token: Token.EscapedKeyword,
  line: 1, column: 10 ,
});
-*/
pass("scans '\\u0052oo'", {
  source: "\\u0052oo",
  "value": "Roo",
  raw: "'abc'",
  token: Token.Identifier,
  line: 1, column: 8,
});
/*
pass("scans 'cla\\u{73}s'", {
  source: "cla\\u{73}s",
  "value": "class",
  raw: "'abc'",
  token: Token.EscapedKeyword,
  line: 1, column: 10,
});
*/

pass("scans 'var'", {
  source: "var",
  value: "var",
  raw: "'var'",
  token: Token.VarKeyword,
  line: 1, column: 3,
});

  });
