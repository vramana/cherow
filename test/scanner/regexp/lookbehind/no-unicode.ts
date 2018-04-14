import * as assert from 'clean-assert';
import * as t from 'assert';
import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('Lookbehind', () => {

    describe('Failure', () => {
        const invalidSyntax = [
            '/(?<a)/',
            "/(?<a)/", 
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {

                t.throws(() => {
                    validateRegExp(`${arg}`, ValidatorState.Empty);
                });
            });
        }
    });

    describe('Pass', () => {
        const vadlidSyntax = [
            "/(?<=a)/",
            "/(?<!a)/",
            "/^.(?<=a)/",
            "/^f\w\w(?<=\woo)/",
            "/(?<=a[a-z][a-z])\w\w\w/",
            "/(?<=[a|b|c]*)[^a|b|c]{3}/",
            "/(?<=^abc)def/",
            "/(?<=^[a-c]{3})def/",
            "/(?<=\b)[d-f]{3}/",
            "/(?<=\B)\w{3}/",
            "/(?<=\B)(?<=c(?<=\w))\w{3}/",
            "/(?<=\b)[d-f]{3}/",
            "/(?<!abc)\w\w\w/",
            "/(?<!a.c)\w\w\w/",
            "/(?<!a[a-z]{2})\w\w\w/",
            "/(?<=\b)[d-f]{3}/",
            "/(?<!abc)def/",
            "/(?<!a.c)def/",
            "/(?<=\b)[d-f]{3}/",
            '/(?<!a[a-z][a-z])def/',
            "/(?<!a[a-z]{2})def/",
            "/(?<!a{1}[a-z]{2})def/",
            "/(?<=(c))def/",
            "/(?<=(\w{2}))def/",
            "/(?<=(\w){3})def/",
            '/(?<=(bc)|(cd))./',
            '/(?<=([ab]{1,2})\D|(abc))\w/',
            '/\D(?<=([ab]+))(\w)/',
            '/(?<=[b-e])\w{2}/',
            '/(?<!(^|[ab]))\w{2}/',
            '/(?<=a(?=([^a]{2})d)\w{3})\w\w/',
            '/((\w)\w)(?<=\\1\\2\\1)/',
            '/(..)(?<=\\1\\1\\1)/',
            "/(?<=a)?/", 
            "/(?<!a)?/",
            "/(?<!a)*/",

            "/(..)(?<=\\1\\1\\1)/",
            "/(..)(?<=\\1\\1\\1)/",
            "/(..)(?<=\\1\\1\\1)/",
            "/(?<=\\1(\w+))c/",
            "/.*(?<=(..|...|....))(.*)/",
            "/.*(?<=(xx|...|....))(.*)/",
            "/.*(?<=(xx|...))(.*)/",
            "/.*(?<=(xx|xxx))(.*)/",
            "/(?<=(b+))c/",
            "/(?<=(b\d+))c/",
            "/(?<=((?:b\d{2})+))c/",
            "/(?<=^(\w+))def/",
            "/(?<=$abc)def/",
            "/^foo(?<=foo)$/",
            "/^f.o(?<=foo)$/",
            "/^f.o(?<=foo)$/",
            "/^foo(?<!foo)$/",
            "/^f.o(?<!foo)$/",
            "/^foooo(?<=fo*)$/",
            "/(abc\\1)/",
            "/(?=(abcdefghijklmn))(?<=\\1)a/",
            "/(?=(abcdefghijklmn))(?<=\\1)a/",
            "/(?<=a(.\\2)b(\\1)).{4}/",
            "/(?<=a(\\2)b(..\\1))b/",
            "/(?<=(?:\\1b)(aa))./",
            "/(?<=(?:\\1|b)(aa))./",
            "/(?<=(?<a>\\w){3})f/u",
            "/(?<a>(?<!\\D{3}))f|f/",
            "/(?<a>(?<=\\w{3}))f/",
            "/((?<=\\w{3}))f/",
            "/(?<=(?<a>\\w){3})f/",
            "/(?<!a){1}/",
        ]

        for (const arg of vadlidSyntax) {

            it(`${arg}`, () => {

                t.doesNotThrow(() => {
                    validateRegExp(`${arg}`, ValidatorState.Empty);
                });
            });
        }
    });
});