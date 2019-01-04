import * as t from 'assert';
import { Context } from '../../src/common';
import { create } from '../../src/parser';
import { Token, tokenDesc } from '../../src/token';
import { validateRegularExpressions, RegexpState } from '../../src/scanner/regexp';

/**
 * Note! This file tests regular expression both with and without web compability.
 *
 * ------- STILL EARLY WORK IN PROGRESS!! -------
 */

describe('Lexer - Regular expressions', () => {
  function fail(source: string, ctx: Context) {
    it(`Invalid regular expressions - ${source}`, () => {
      const parser = create(`${source}`, undefined);
      t.throws(() => {
        validateRegularExpressions(parser, ctx);
      });
    });
  }

  fail('(/', Context.Empty);
  fail('(?/', Context.Empty);
  fail('(?=/', Context.Empty);
  fail('(?=foo/', Context.Empty);
  fail('(?!/', Context.Empty);
  fail('(?!foo/', Context.Empty);
  fail('(/', Context.OptionsDisableWebCompat);
  fail('(?/', Context.OptionsDisableWebCompat);
  fail('(?=/', Context.OptionsDisableWebCompat);
  fail('(?=foo/', Context.OptionsDisableWebCompat);
  fail('(?!/', Context.OptionsDisableWebCompat);
  fail('(?!foo/', Context.OptionsDisableWebCompat);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('(a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{2,1}?/', Context.OptionsDisableWebCompat);
  fail('(*)/', Context.OptionsDisableWebCompat);
  fail('+/', Context.OptionsDisableWebCompat);
  fail('?/', Context.OptionsDisableWebCompat);
  fail(')/', Context.OptionsDisableWebCompat);
  fail('[/', Context.OptionsDisableWebCompat);
  fail('^*/', Context.OptionsDisableWebCompat);
  fail('$*/', Context.OptionsDisableWebCompat);
  fail('${1,2}/', Context.OptionsDisableWebCompat);
  fail('${2,1}/', Context.OptionsDisableWebCompat);
  fail('\\2(a)(/', Context.OptionsDisableWebCompat);
  fail('(?a/', Context.OptionsDisableWebCompat);
  fail('(?a)/', Context.OptionsDisableWebCompat);
  fail('(?:/', Context.OptionsDisableWebCompat);
  fail('(?:a/', Context.OptionsDisableWebCompat);
  fail('(:a/', Context.OptionsDisableWebCompat);
  fail('[b-a]/', Context.OptionsDisableWebCompat);
  fail('[a-b--+]/', Context.OptionsDisableWebCompat);
  fail('[\\u0001-\\u0000]/', Context.OptionsDisableWebCompat);
  fail('[\\u{1}-\\u{2}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{2}-\\u{1}]/', Context.OptionsDisableWebCompat);
  fail('[\\z-\\a]/', Context.OptionsDisableWebCompat);
  fail('[0-9--+]/', Context.OptionsDisableWebCompat);
  fail('(?:a/', Context.Empty);
  fail('(:a/', Context.Empty);
  fail('[b-a]/', Context.Empty);
  fail('[a-b--+]/', Context.Empty);
  fail('[\\u0001-\\u0000]/', Context.Empty);
  fail('[\\u{1}-\\u{2}]/', Context.Empty);
  fail('[\\u{2}-\\u{1}]/', Context.Empty);
  fail('[\\z-\\a]/', Context.Empty);
  fail('[0-9--+]/', Context.Empty);
  fail('[\\c-a]/', Context.OptionsDisableWebCompat);
  fail('[🌷-🌸]/', Context.OptionsDisableWebCompat);
  fail('[🌸-🌷]/', Context.OptionsDisableWebCompat);
  fail('\\\r/', Context.OptionsDisableWebCompat);
  fail('\\\n/', Context.OptionsDisableWebCompat);
  fail('\\/', Context.OptionsDisableWebCompat);
  fail('\n/', Context.OptionsDisableWebCompat);

  fail('(?<\\u{ffffff}/', Context.OptionsDisableWebCompat);
  fail('(?<$𐒤>a)/', Context.OptionsDisableWebCompat);
  fail('\n/', Context.OptionsDisableWebCompat);
  fail('\n/', Context.OptionsDisableWebCompat);
  fail('\n/', Context.OptionsDisableWebCompat);
  fail('\n/', Context.OptionsDisableWebCompat);
  fail('\n/', Context.OptionsDisableWebCompat);

  fail('(?<a>a)\\k<ab>/', Context.OptionsDisableWebCompat);
  fail('\\k<a(?<a>a)/', Context.OptionsDisableWebCompat);
  fail('(?<>a)/', Context.OptionsDisableWebCompat);
  fail('./G', Context.OptionsDisableWebCompat);
  fail('./gig', Context.OptionsDisableWebCompat);
  fail('(?<a>\\a)/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k<ab>/u', Context.OptionsDisableWebCompat);
  fail('(?<42a>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<a:>a)/u', Context.OptionsDisableWebCompat);
  fail('?<a\\uDCA4>.)/u', Context.OptionsDisableWebCompat);
  fail('(?<a\\uD801>.)/u', Context.OptionsDisableWebCompat);
  fail('(?=a)?/u', Context.OptionsDisableWebCompat);
  fail('(?=a){}/u', Context.OptionsDisableWebCompat);
  fail('(?=a){1,}/u', Context.OptionsDisableWebCompat);
  fail('(?=a){1}/u', Context.OptionsDisableWebCompat);
  fail('(?=a){a}/u', Context.OptionsDisableWebCompat);
  fail('(?=a){1,2}/u', Context.OptionsDisableWebCompat);
  fail('a{/u', Context.OptionsDisableWebCompat);
  fail('a{}/u', Context.OptionsDisableWebCompat);
  fail('a{a}/u', Context.OptionsDisableWebCompat);
  fail('a{1/u', Context.OptionsDisableWebCompat);
  fail('a{1,/u', Context.OptionsDisableWebCompat);
  fail('a{1,2/u', Context.OptionsDisableWebCompat);
  fail('(a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{?/u', Context.OptionsDisableWebCompat);
  fail('a{1?/u', Context.OptionsDisableWebCompat);
  fail('a{1,2?/u', Context.OptionsDisableWebCompat);
  fail(')/', Context.OptionsDisableWebCompat);
  fail('[/', Context.OptionsDisableWebCompat);
  fail('^*/', Context.OptionsDisableWebCompat);
  fail('$*/', Context.OptionsDisableWebCompat);
  fail('a{2,1?/u', Context.OptionsDisableWebCompat);
  fail('(*)/u', Context.OptionsDisableWebCompat);
  fail('(/', Context.OptionsDisableWebCompat);
  fail('[/u', Context.OptionsDisableWebCompat);
  fail(']/u', Context.Empty);
  fail('{/u', Context.OptionsDisableWebCompat);
  fail('^*/u', Context.OptionsDisableWebCompat);
  fail('$*/u', Context.OptionsDisableWebCompat);
  fail('$*/u', Context.Empty);
  fail('[b-a]/', Context.OptionsDisableWebCompat);
  fail('[a-b--+]/', Context.OptionsDisableWebCompat);
  fail('${2,1}/u', Context.OptionsDisableWebCompat);
  fail('\\1/u', Context.OptionsDisableWebCompat);
  fail('\\2(a)(/u', Context.OptionsDisableWebCompat);
  fail('(?:a)\\1/u', Context.OptionsDisableWebCompat);
  fail('(?:a)\\2/u', Context.OptionsDisableWebCompat);
  fail('(?:a)\\1/u', Context.Empty);
  fail('[b-a]/', Context.Empty);
  fail('[a-b--+]/', Context.Empty);
  fail('${2,1}/u', Context.Empty);
  fail('\\1/u', Context.Empty);
  fail('\\2(a)(/u', Context.Empty);
  fail('(?:a)\\1/u', Context.Empty);
  fail('(?:a)\\2/u', Context.Empty);
  fail('(?:a)\\1/u', Context.Empty);
  fail('(?:a)\\2/u', Context.Empty);
  fail('${1,2}/', Context.OptionsDisableWebCompat);
  fail('a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/u', Context.OptionsDisableWebCompat);
  fail('a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/u', Context.Empty);
  fail('(?/', Context.OptionsDisableWebCompat);
  fail('(?/', Context.Empty);
  fail('(?a/u', Context.OptionsDisableWebCompat);
  fail('(?a/u', Context.Empty);
  fail('(?:a/', Context.OptionsDisableWebCompat);

  fail('[d-G\\x0061]/', Context.OptionsDisableWebCompat);
  fail('(?a/u', Context.Empty);
  fail('(?:a/', Context.OptionsDisableWebCompat);
  fail('(?/', Context.Empty);
  fail('[b-G\\0]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\r]/', Context.Empty);
  fail('(?:a/', Context.OptionsDisableWebCompat);
  fail('(?/', Context.Empty);
  fail('[\\sb-G]/u', Context.OptionsDisableWebCompat);
  fail('**a/u', Context.Empty);
  fail('(?:a/', Context.OptionsDisableWebCompat);
  fail('[d-G\\a]/', Context.OptionsDisableWebCompat);
  fail('[b-ac-e]/', Context.OptionsDisableWebCompat);
  fail('[a-dc-b]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\0]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\D]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\0]/', Context.Empty);
  fail('[b-G\\D]/', Context.Empty);
  fail('[b-G\\W]/', Context.OptionsDisableWebCompat);
  fail('[\\u0061d-G]/', Context.OptionsDisableWebCompat);
  fail('[\\vd-G]/', Context.OptionsDisableWebCompat);
  fail('[a--z]/', Context.OptionsDisableWebCompat);
  fail('[\\wb-G]/', Context.OptionsDisableWebCompat);
  fail('[\\td-G]/', Context.OptionsDisableWebCompat);
  fail('[\\sb-G]/', Context.OptionsDisableWebCompat);
  fail('[\\nd-G]/', Context.OptionsDisableWebCompat);
  fail('x{0,1}{1,}/', Context.OptionsDisableWebCompat);
  fail('x{1,2}{1}/', Context.OptionsDisableWebCompat);
  fail('x{1}{1,}/', Context.OptionsDisableWebCompat);
  fail('[\\ad-G]/', Context.OptionsDisableWebCompat);
  fail('**a/', Context.OptionsDisableWebCompat);
  fail('[\\0b-G]/', Context.OptionsDisableWebCompat);
  fail('[\\10b-G]/', Context.OptionsDisableWebCompat);
  fail('[\\Bd-G]/', Context.OptionsDisableWebCompat);
  fail('[\\Db-G]/', Context.OptionsDisableWebCompat);
  fail('0{2,1}/', Context.OptionsDisableWebCompat);
  fail('[\\Sb-G]/', Context.OptionsDisableWebCompat);
  fail('[\\bd-G]/', Context.OptionsDisableWebCompat);
  fail('[\\db-G]/', Context.OptionsDisableWebCompat);
  fail('[\\Bd-G]/', Context.Empty);
  fail('[\\Db-G]/', Context.Empty);
  fail('[\\Sb-G]/', Context.Empty);
  fail('[\\bd-G]/', Context.Empty);
  fail('[\\db-G]/', Context.Empty);
  fail('(?:a/u', Context.OptionsDisableWebCompat);
  fail('(?:a/', Context.Empty);
  fail('(?:a/u', Context.Empty);
  fail('(:a/u', Context.OptionsDisableWebCompat);
  fail('\\c1/u', Context.OptionsDisableWebCompat);
  fail('\\c/u', Context.OptionsDisableWebCompat);
  fail('\\u/u', Context.OptionsDisableWebCompat);
  fail('\\u12/u', Context.OptionsDisableWebCompat);
  fail('\\u123/u', Context.OptionsDisableWebCompat);
  fail('\\u{/u', Context.OptionsDisableWebCompat);
  fail('\\u{20/u', Context.OptionsDisableWebCompat);
  fail('\\u{110000}/u', Context.OptionsDisableWebCompat);
  fail('\\377/u', Context.OptionsDisableWebCompat);
  fail('\\400/u', Context.OptionsDisableWebCompat);
  fail('\\a/u', Context.OptionsDisableWebCompat);
  fail('[b-a]/u', Context.OptionsDisableWebCompat);
  fail('[b-a]/u', Context.Empty);
  fail('[a-b--+]/', Context.OptionsDisableWebCompat);
  fail('[\\c]/u', Context.OptionsDisableWebCompat);
  fail('[\\x]/u', Context.OptionsDisableWebCompat);
  fail('[\\xz]/u', Context.OptionsDisableWebCompat);
  fail('[\\u1]/u', Context.OptionsDisableWebCompat);
  fail('[\\u12]/u', Context.OptionsDisableWebCompat);
  fail('(:a/u', Context.Empty);
  fail('\\c1/u', Context.Empty);
  fail('\\c/u', Context.Empty);
  fail('\\/', Context.Empty);
  fail('\\', Context.Empty);
  fail('(?=', Context.Empty);
  fail('(?!', Context.Empty);
  fail('(?<=', Context.Empty);
  fail('(?<!', Context.Empty);
  fail('(?<abc>', Context.Empty);
  fail('(?!', Context.Empty);
  fail('(?<', Context.Empty);
  fail('(', Context.Empty);
  fail('{', Context.Empty);
  fail('(?/', Context.Empty);
  fail('(?', Context.Empty);
  fail('\\u', Context.Empty);
  fail('\\u1', Context.Empty);
  fail('\\u123', Context.Empty);
  fail('\\u{', Context.Empty);
  fail('\\u{2', Context.Empty);
  fail('\\u/u', Context.Empty);
  fail('\\u12/u', Context.Empty);
  fail('\\u123/u', Context.Empty);
  fail('\\u{/u', Context.Empty);
  fail('\\u{20/u', Context.Empty);
  fail('\\u{110000}/u', Context.Empty);
  fail('\\u{', Context.Empty);
  fail('\\3', Context.Empty);
  fail('\\377/u', Context.Empty);
  fail('\\400/u', Context.Empty);
  fail('\\a/u', Context.Empty);
  fail('[b-a]/u', Context.Empty);
  fail('[b-a]/u', Context.Empty);
  fail('[a-b--+]/', Context.Empty);
  fail('[\\c]/u', Context.Empty);
  fail('[\\x]/u', Context.Empty);
  fail('[\\xz]/u', Context.Empty);
  fail('[\\u1]/u', Context.Empty);
  fail('[\\u12]/u', Context.Empty);
  fail('[\\u123]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{20]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{110000}]/u', Context.OptionsDisableWebCompat);
  fail('[\\377]/u', Context.OptionsDisableWebCompat);
  fail('[\\377]/u', Context.Empty);
  fail('[\\', Context.Empty);
  fail('[\\3', Context.Empty);
  fail('[\\a]/u', Context.OptionsDisableWebCompat);
  fail('[\\D-\\uFFFF]/u', Context.OptionsDisableWebCompat);
  fail('[\\s-\\uFFFF]/u', Context.OptionsDisableWebCompat);
  fail('[\\S-\\uFFFF]/u', Context.OptionsDisableWebCompat);
  fail('[\\W-\\uFFFF]/u', Context.OptionsDisableWebCompat);
  fail('[\\u0000-\\D]/u', Context.OptionsDisableWebCompat);
  fail('[\\u0000-\\W]/u', Context.OptionsDisableWebCompat);
  fail('[\\D-\\uFFFF]/u', Context.Empty);
  fail('[\\s-\\uFFFF]/u', Context.Empty);
  fail('[\\S-\\uFFFF]/u', Context.Empty);
  fail('[\\W-\\uFFFF]/u', Context.Empty);
  fail('[\\u0000-\\D]/u', Context.Empty);
  fail('[\\u0000-\\W]/u', Context.Empty);
  fail('[\\u0001-\\u0000]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{1}-\\u{2}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{2}-\\u{1}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{2}-\\u{1}]/u', Context.OptionsDisableWebCompat);
  fail('[\\D-\\uFFFF]/u', Context.Empty);
  fail('[\\s-\\uFFFF]/u', Context.Empty);
  fail('[\\S-\\uFFFF]/u', Context.Empty);
  fail('[\\W-\\uFFFF]/u', Context.Empty);
  fail('[\\u0000-\\D]/u', Context.Empty);
  fail('[\\u0000-\\W]/u', Context.Empty);
  fail('[\\u0001-\\u0000]/u', Context.Empty);
  fail('[\\u{1}-\\u{2}]/', Context.Empty);
  fail('[\\u{2}-\\u{1}]/', Context.Empty);
  fail('[\\u{2}-\\u{1}]/u', Context.Empty);
  fail('[/', Context.OptionsDisableWebCompat);
  fail('^*/', Context.OptionsDisableWebCompat);
  fail('[\\a-\\z]/u', Context.OptionsDisableWebCompat);
  fail('[\\z-\\a]/', Context.OptionsDisableWebCompat);
  fail('[0-9--+]/', Context.OptionsDisableWebCompat);
  fail('[\\c-a]/', Context.OptionsDisableWebCompat);
  fail('[\\c0-]/u', Context.OptionsDisableWebCompat);
  fail('[🌷-🌸]/', Context.OptionsDisableWebCompat);
  fail('[\\u0000-\\ud83c\\udf38-\\u0000]/', Context.OptionsDisableWebCompat);
  fail('[🌸-🌷]/', Context.OptionsDisableWebCompat);
  fail('[\\uD834\\uDF06-\\uD834\\uDF08a-z]/', Context.OptionsDisableWebCompat);
  fail('[\\d][\\12-\\14]{1,}[^\\d]/u', Context.OptionsDisableWebCompat);
  fail('[\\d][\\12-\\14]{1,}[^\\d]/u', Context.Empty);
  fail('*/', Context.OptionsDisableWebCompat);
  fail('(?<a)/', Context.OptionsDisableWebCompat);
  fail('(?<a)/u', Context.OptionsDisableWebCompat);
  fail('(?<=a)?/', Context.OptionsDisableWebCompat);
  fail('(?<=a)?/u', Context.OptionsDisableWebCompat);
  fail('(?<=a)+/', Context.OptionsDisableWebCompat);
  fail('(?<=a)+/u', Context.OptionsDisableWebCompat);
  fail('(?<=a)*/', Context.OptionsDisableWebCompat);
  fail('(?<=a)*/u', Context.OptionsDisableWebCompat);
  fail('(?<=a){1}/', Context.OptionsDisableWebCompat);
  fail('(?<=a){1}/u', Context.OptionsDisableWebCompat);
  fail('(?<!a)?/', Context.OptionsDisableWebCompat);
  fail('(?<!a)?/u', Context.OptionsDisableWebCompat);
  fail('(?<!a)+/', Context.OptionsDisableWebCompat);
  fail('(?<!a)+/u', Context.OptionsDisableWebCompat);
  fail('(?<!a)*/', Context.OptionsDisableWebCompat);
  fail('(?<!a)*/u', Context.OptionsDisableWebCompat);
  fail('(?<!a){1}/', Context.OptionsDisableWebCompat);
  fail('(?<!a){1}/u', Context.OptionsDisableWebCompat);
  fail('(?a/', Context.OptionsDisableWebCompat);
  fail('(?a)/', Context.OptionsDisableWebCompat);
  fail('(?</', Context.OptionsDisableWebCompat);
  fail('(?<)/', Context.OptionsDisableWebCompat);
  fail('(?<a)/', Context.OptionsDisableWebCompat);
  fail('\\k/u', Context.OptionsDisableWebCompat);
  fail('\\k<a>/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k</', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k</u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k<a/', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k<a/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\2/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k<b>/', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k<b>/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)(?<a>a)/', Context.OptionsDisableWebCompat);
  fail('(?<a>a)(?<a>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)(?<\\u{61}>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<a', Context.OptionsDisableWebCompat);
  fail('(?<a>a)(?<\\u0061>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<☀>a)\\k<☀>/u', Context.Empty);
  fail('(?<\\u0020>a)\\k<\\u0020>/u', Context.OptionsDisableWebCompat);
  fail('(?<\\u0061\\u0062\\u0063>a)\\k<abd>/u', Context.OptionsDisableWebCompat);
  fail('(?<11>a)\\k<11>/u', Context.OptionsDisableWebCompat);
  fail('\\p{<?...?>} \\P{<?...?>}', Context.OptionsDisableWebCompat);
  fail('\\p{', Context.OptionsDisableWebCompat);
  fail('\\p{<', Context.OptionsDisableWebCompat);
  fail('\\p{<?', Context.OptionsDisableWebCompat);
  fail('\\p{<?...?>} \\P{<?...?>}', Context.OptionsDisableWebCompat);
  fail('\\p{?', Context.OptionsDisableWebCompat);
  fail('\\p{>}', Context.OptionsDisableWebCompat);
  fail('\\p{<?...?>}', Context.OptionsDisableWebCompat);
  fail('\\p/u', Context.OptionsDisableWebCompat);
  fail('\\p{/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)(?<a>a)/', Context.OptionsDisableWebCompat);
  fail('[\\uD834\\uDF06-\\uD834\\uDF08a-z]/', Context.OptionsDisableWebCompat);
  fail('(?<abc>/', Context.OptionsDisableWebCompat);
  fail('(?<abc>/', Context.OptionsDisableWebCompat);
  fail('+a/u', Context.OptionsDisableWebCompat);
  fail('+', Context.OptionsDisableWebCompat);
  fail('?', Context.OptionsDisableWebCompat);
  fail('??', Context.OptionsDisableWebCompat);
  fail('??/u', Context.OptionsDisableWebCompat);
  fail('+?/u', Context.OptionsDisableWebCompat);
  fail('|*/u', Context.OptionsDisableWebCompat);
  fail('|?/u', Context.OptionsDisableWebCompat);
  fail('|+/u', Context.OptionsDisableWebCompat);
  fail('abc', Context.OptionsDisableWebCompat);
  fail('a{ 1}/u', Context.OptionsDisableWebCompat);
  fail('a{1 }/u', Context.OptionsDisableWebCompat);
  fail('a{ 1}/u', Context.OptionsDisableWebCompat);
  fail('a{1,1 }/u', Context.OptionsDisableWebCompat);
  fail('a{100,45}/u', Context.OptionsDisableWebCompat);
  fail('a{03,04}/u', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/u', Context.OptionsDisableWebCompat);
  fail('a{0x15,02}/u', Context.OptionsDisableWebCompat);
  fail('a{0x01,1}/u', Context.OptionsDisableWebCompat);
  fail('a{0b01,04}/u', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/u', Context.OptionsDisableWebCompat);
  fail('a{00,00}/u', Context.OptionsDisableWebCompat);
  fail('foo/myuy', Context.OptionsDisableWebCompat);
  fail('foo/uiug', Context.OptionsDisableWebCompat);
  fail('a{1, 1}/u', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/u', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1}/u', Context.OptionsDisableWebCompat);
  fail('a{1,1 }/u', Context.OptionsDisableWebCompat);
  fail('a{1, 1 }/u', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1 }/u', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1 }/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)(?<a>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)(?<\\u{61}>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)(?<\\u0061>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<\\u0020>a)\\k<\\u0020>/u', Context.OptionsDisableWebCompat);
  fail('(?<\\u0061\\u0062\\u0063>a)\\k<abd>/u', Context.OptionsDisableWebCompat);
  fail('\\k<a>/u', Context.OptionsDisableWebCompat);
  fail('\\E/u', Context.OptionsDisableWebCompat);
  fail('\\F/u', Context.OptionsDisableWebCompat);
  fail('\\G/u', Context.OptionsDisableWebCompat);
  fail('\\H/u', Context.OptionsDisableWebCompat);
  fail('\\I/u', Context.OptionsDisableWebCompat);
  fail('\\J/u', Context.OptionsDisableWebCompat);
  fail('\\K/u', Context.OptionsDisableWebCompat);
  fail('\\L/u', Context.OptionsDisableWebCompat);
  fail('\\M/u', Context.Empty);
  fail('\\N/u', Context.Empty);
  fail('\\O/u', Context.Empty);
  fail('\\P/u', Context.Empty);
  fail('\\Q/u', Context.Empty);
  fail('\\R/u', Context.Empty);
  fail('\\T/u', Context.Empty);
  fail('\\U/u', Context.Empty);
  fail('\\V/u', Context.Empty);
  fail('\\X/u', Context.Empty);
  fail('\\Y/u', Context.Empty);
  fail('\\Z/u', Context.Empty);
  fail('\\X/u', Context.Empty);
  fail('\\Y/u', Context.Empty);
  fail('\\Z/u', Context.Empty);
  fail('\\X/u', Context.Empty);
  fail('\\M/u', Context.OptionsDisableWebCompat);
  fail('\\N/u', Context.OptionsDisableWebCompat);
  fail('\\O/u', Context.OptionsDisableWebCompat);
  fail('\\P/u', Context.OptionsDisableWebCompat);
  fail('\\Q/u', Context.OptionsDisableWebCompat);
  fail('\\R/u', Context.OptionsDisableWebCompat);
  fail('\\T/u', Context.OptionsDisableWebCompat);
  fail('\\U/u', Context.OptionsDisableWebCompat);
  fail('\\V/u', Context.OptionsDisableWebCompat);
  fail('\\X/u', Context.OptionsDisableWebCompat);
  fail('\\Y/u', Context.OptionsDisableWebCompat);
  fail('\\Z/u', Context.OptionsDisableWebCompat);
  fail('\\X/u', Context.OptionsDisableWebCompat);
  fail('\\Y/u', Context.OptionsDisableWebCompat);
  fail('\\Z/u', Context.OptionsDisableWebCompat);
  fail('\\X/u', Context.OptionsDisableWebCompat);
  fail('\\Y/u', Context.OptionsDisableWebCompat);
  fail('\\Z/u', Context.OptionsDisableWebCompat);
  fail('\\e/u', Context.OptionsDisableWebCompat);
  fail('\\i/u', Context.OptionsDisableWebCompat);
  fail('\\l/u', Context.OptionsDisableWebCompat);
  fail('\\x/u', Context.OptionsDisableWebCompat);
  fail('\\z/u', Context.OptionsDisableWebCompat);
  fail('abc\\a/u', Context.OptionsDisableWebCompat);
  fail('abc\\e/u', Context.OptionsDisableWebCompat);
  fail('abc\\g/u', Context.OptionsDisableWebCompat);
  fail('abc\\h/u', Context.OptionsDisableWebCompat);
  fail('abc\\i/u', Context.OptionsDisableWebCompat);
  fail('abc\\j/u', Context.OptionsDisableWebCompat);
  fail('abc\\k/u', Context.OptionsDisableWebCompat);
  fail('abc\\l/u', Context.OptionsDisableWebCompat);
  fail('abc\\m/u', Context.OptionsDisableWebCompat);
  fail('abc\\o/u', Context.OptionsDisableWebCompat);
  fail('abc\\p/u', Context.OptionsDisableWebCompat);
  fail('abc\\q/u', Context.OptionsDisableWebCompat);
  fail('abc\\u/u', Context.OptionsDisableWebCompat);
  fail('abc\\x/u', Context.OptionsDisableWebCompat);
  fail('abc\\y/u', Context.OptionsDisableWebCompat);
  fail('abc\\z/u', Context.OptionsDisableWebCompat);
  fail('abc\\A/u', Context.Empty);
  fail('abc\\E/u', Context.Empty);
  fail('abc\\F/u', Context.Empty);
  fail('abc\\G/u', Context.Empty);
  fail('abc\\H/u', Context.Empty);
  fail('abc\\I/u', Context.Empty);
  fail('abc\\J/u', Context.Empty);
  fail('abc\\K/u', Context.Empty);
  fail('abc\\L/u', Context.Empty);
  fail('abc\\M/u', Context.Empty);
  fail('abc\\N/u', Context.Empty);
  fail('abc\\O/u', Context.Empty);
  fail('abc\\P/u', Context.Empty);
  fail('abc\\Q/u', Context.Empty);
  fail('abc\\A/u', Context.OptionsDisableWebCompat);
  fail('abc\\E/u', Context.OptionsDisableWebCompat);
  fail('abc\\F/u', Context.OptionsDisableWebCompat);
  fail('abc\\G/u', Context.OptionsDisableWebCompat);
  fail('abc\\H/u', Context.OptionsDisableWebCompat);
  fail('abc\\I/u', Context.OptionsDisableWebCompat);
  fail('abc\\J/u', Context.OptionsDisableWebCompat);
  fail('abc\\K/u', Context.OptionsDisableWebCompat);
  fail('abc\\L/u', Context.OptionsDisableWebCompat);
  fail('abc\\M/u', Context.OptionsDisableWebCompat);
  fail('abc\\N/u', Context.OptionsDisableWebCompat);
  fail('abc\\O/u', Context.OptionsDisableWebCompat);
  fail('abc\\P/u', Context.OptionsDisableWebCompat);
  fail('abc\\Q/u', Context.OptionsDisableWebCompat);
  fail('abc\\R/u', Context.OptionsDisableWebCompat);
  fail('abc\\T/u', Context.OptionsDisableWebCompat);
  fail('abc\\U/u', Context.OptionsDisableWebCompat);
  fail('abc\\V/u', Context.OptionsDisableWebCompat);
  fail('abc\\X/u', Context.OptionsDisableWebCompat);
  fail('abc\\Y/u', Context.OptionsDisableWebCompat);
  fail('abc\\Z/u', Context.OptionsDisableWebCompat);
  fail('\\aabcd/u', Context.OptionsDisableWebCompat);
  fail('\\eabcd/u', Context.OptionsDisableWebCompat);
  fail('\\gabcd/u', Context.OptionsDisableWebCompat);
  fail('\\habcd/u', Context.OptionsDisableWebCompat);
  fail('\\iabcd/u', Context.OptionsDisableWebCompat);
  fail('\\jabcd/u', Context.OptionsDisableWebCompat);
  fail('\\kabcd/u', Context.OptionsDisableWebCompat);
  fail('\\labcd/u', Context.OptionsDisableWebCompat);
  fail('\\mabcd/u', Context.OptionsDisableWebCompat);
  fail('\\oabcd/u', Context.OptionsDisableWebCompat);
  fail('\\pabcd/u', Context.OptionsDisableWebCompat);
  fail('\\qabcd/u', Context.OptionsDisableWebCompat);
  fail('\\yabcd/u', Context.OptionsDisableWebCompat);
  fail('\\zabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Aabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Cabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Eabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Fabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Gabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Habcd/u', Context.OptionsDisableWebCompat);
  fail('\\Iabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Jabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Kabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Labcd/u', Context.OptionsDisableWebCompat);
  fail('\\Mabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Nabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Oabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Pabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Qabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Rabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Tabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Uabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Vabcd/u', Context.Empty);
  fail('\\Yabcd/u', Context.Empty);
  fail('\\Zabcd/u', Context.Empty);
  fail('abc\\adeff/u', Context.Empty);
  fail('abc\\gdeff/u', Context.Empty);
  fail('abc\\hdeff/u', Context.Empty);
  fail('abc\\ideff/u', Context.Empty);
  fail('abc\\jdeff/u', Context.Empty);
  fail('abc\\kdeff/u', Context.Empty);
  fail('abc\\ldeff/u', Context.Empty);
  fail('\\Vabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Yabcd/u', Context.OptionsDisableWebCompat);
  fail('\\Zabcd/u', Context.OptionsDisableWebCompat);
  fail('abc\\adeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\gdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\hdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\ideff/u', Context.OptionsDisableWebCompat);
  fail('abc\\jdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\kdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\ldeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\mdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\odeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\pdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\qdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\ydeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\zdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Adeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Cdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Edeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Fdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Gdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Hdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Ideff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Jdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Kdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Ldeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Mdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Ndeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Odeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Pdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Qdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Rdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Tdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Udeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Vdeff/u', Context.OptionsDisableWebCompat);
  fail('abc\\Ydeff/u', Context.OptionsDisableWebCompat);
  fail('}/u', Context.OptionsDisableWebCompat);
  fail('{/u', Context.OptionsDisableWebCompat);
  fail(']/u', Context.OptionsDisableWebCompat);
  fail('a|({)/u', Context.OptionsDisableWebCompat);
  fail('a|(})/u', Context.OptionsDisableWebCompat);
  fail('a(?)/u', Context.OptionsDisableWebCompat);
  fail('a(*)/u', Context.OptionsDisableWebCompat);
  fail('\\/u', Context.OptionsDisableWebCompat);
  fail('a|(})/u', Context.OptionsDisableWebCompat);
  fail('a|({)/u', Context.OptionsDisableWebCompat);
  fail('a|(])/u', Context.OptionsDisableWebCompat);
  fail('a(+)/u', Context.OptionsDisableWebCompat);
  fail('\\x0/u', Context.Empty);
  fail('\\x1/u', Context.Empty);
  fail('\\x2/u', Context.Empty);
  fail('\\x5/u', Context.Empty);
  fail('\\x7/u', Context.Empty);
  fail('\\x8/u', Context.Empty);
  fail('\\x0/u', Context.OptionsDisableWebCompat);
  fail('\\x1/u', Context.OptionsDisableWebCompat);
  fail('\\x2/u', Context.OptionsDisableWebCompat);
  fail('\\x5/u', Context.OptionsDisableWebCompat);
  fail('\\x7/u', Context.OptionsDisableWebCompat);
  fail('\\x8/u', Context.OptionsDisableWebCompat);
  fail('\\x9/u', Context.OptionsDisableWebCompat);
  fail('\\03b/u', Context.OptionsDisableWebCompat);
  fail('a\\04b/u', Context.OptionsDisableWebCompat);
  fail('\\06(b)/u', Context.OptionsDisableWebCompat);
  fail('(\\07)/u', Context.OptionsDisableWebCompat);
  fail('/\\00/u', Context.OptionsDisableWebCompat);
  fail('\\1(a)', Context.OptionsDisableWebCompat);
  fail('(a)\\1', Context.OptionsDisableWebCompat);
  fail('(\\1)', Context.OptionsDisableWebCompat);
  fail('\\1x(a)', Context.OptionsDisableWebCompat);
  fail('(a)|\\10/u', Context.OptionsDisableWebCompat);
  fail('(\\12|a)/u', Context.OptionsDisableWebCompat);
  fail('(a|\\13)/u', Context.OptionsDisableWebCompat);
  fail('(a)\\3/u', Context.OptionsDisableWebCompat);
  fail('\\2(a)/u', Context.OptionsDisableWebCompat);
  fail('(a)\\1', Context.OptionsDisableWebCompat);
  fail('\\1x(a)', Context.OptionsDisableWebCompat);
  fail('((((((((((((((a))))))))))))))\\15/u', Context.OptionsDisableWebCompat);
  fail('(a|\\13)/u', Context.Empty);
  fail('(a)\\3/u', Context.Empty);
  fail('\\2(a)/u', Context.Empty);
  fail('(a)\\1', Context.Empty);
  fail('\\1x(a)', Context.Empty);
  fail('((((((((((((((((((((a))))))))))))))))))))\\21/u', Context.OptionsDisableWebCompat);
  fail('((((((((a))))))))\\9/u', Context.OptionsDisableWebCompat);
  fail('((((((((((((a))))))))))))\\13/u', Context.OptionsDisableWebCompat);
  fail('a\\1/u', Context.OptionsDisableWebCompat);
  fail('(a)\\2/u', Context.OptionsDisableWebCompat);
  fail('((a))\\3/u', Context.OptionsDisableWebCompat);
  fail('(((a)))\\4/u', Context.OptionsDisableWebCompat);
  fail('((((a))))\\5/u', Context.OptionsDisableWebCompat);
  fail('(((((a)))))\\6/u', Context.OptionsDisableWebCompat);
  fail('((((((a))))))\\7/u', Context.OptionsDisableWebCompat);
  fail('(((((((a)))))))\\8/u', Context.OptionsDisableWebCompat);
  fail('((((((((a))))))))\\9/u', Context.OptionsDisableWebCompat);
  fail('(((((((((a)))))))))\\10/u', Context.OptionsDisableWebCompat);
  fail('((((((((((a))))))))))\\11/u', Context.OptionsDisableWebCompat);
  fail('(((((((((((a)))))))))))\\12/u', Context.OptionsDisableWebCompat);
  fail('((((((((((((a))))))))))))\\13/u', Context.OptionsDisableWebCompat);
  fail('(((((((((((((a)))))))))))))\\14/u', Context.OptionsDisableWebCompat);
  fail('((((((((((((((a))))))))))))))\\15/u', Context.OptionsDisableWebCompat);
  fail('(((((((((((((((a)))))))))))))))\\16/u', Context.OptionsDisableWebCompat);
  fail('((((((((((((((((a))))))))))))))))\\17/u', Context.OptionsDisableWebCompat);
  fail('(((((((((((((((((a)))))))))))))))))\\18/u', Context.OptionsDisableWebCompat);
  fail('((((((((((((((((((a))))))))))))))))))\\19/u', Context.OptionsDisableWebCompat);
  fail('(((((((((((((((((((a)))))))))))))))))))\\20/u', Context.OptionsDisableWebCompat);
  fail('((((((((((((((((((((a))))))))))))))))))))\\21/u', Context.OptionsDisableWebCompat);
  fail('[\\12]/u', Context.Empty);
  fail('[\\23]/u', Context.Empty);
  fail('[\\89]/u', Context.Empty);
  fail('[\\91]/u', Context.Empty);
  fail('[\\01]/u', Context.Empty);
  fail('[\\02]/u', Context.Empty);
  fail('[\\03]/u', Context.Empty);
  fail('[\\06]/u', Context.Empty);
  fail('[\\09]/u', Context.Empty);
  fail('[\\4]/u', Context.Empty);
  fail('[\\1]/u', Context.Empty);
  fail('[\\8]/u', Context.Empty);
  fail('[\\9]/u', Context.Empty);
  fail('[\\12]/u', Context.OptionsDisableWebCompat);
  fail('[\\23]/u', Context.OptionsDisableWebCompat);
  fail('[\\89]/u', Context.OptionsDisableWebCompat);
  fail('[\\91]/u', Context.OptionsDisableWebCompat);
  fail('[\\01]/u', Context.OptionsDisableWebCompat);
  fail('[\\02]/u', Context.OptionsDisableWebCompat);
  fail('[\\03]/u', Context.OptionsDisableWebCompat);
  fail('[\\06]/u', Context.OptionsDisableWebCompat);
  fail('[\\09]/u', Context.OptionsDisableWebCompat);
  fail('[\\4]/u', Context.OptionsDisableWebCompat);
  fail('[\\1]/u', Context.OptionsDisableWebCompat);
  fail('[\\8]/u', Context.OptionsDisableWebCompat);
  fail('[\\9]/u', Context.OptionsDisableWebCompat);
  fail('[\\07]/u', Context.OptionsDisableWebCompat);
  fail('[\\4]/u', Context.OptionsDisableWebCompat);
  fail('[\\1]/u', Context.OptionsDisableWebCompat);
  fail('[\\a]/u', Context.OptionsDisableWebCompat);
  fail('[\\e]/u', Context.OptionsDisableWebCompat);
  fail('[\\g]/u', Context.OptionsDisableWebCompat);
  fail('[\\h]/u', Context.OptionsDisableWebCompat);
  fail('[\\i]/u', Context.OptionsDisableWebCompat);
  fail('[\\j]/u', Context.OptionsDisableWebCompat);
  fail('[\\k]/u', Context.OptionsDisableWebCompat);
  fail('[\\l]/u', Context.OptionsDisableWebCompat);
  fail('[\\m]/u', Context.OptionsDisableWebCompat);
  fail('[\\o]/u', Context.OptionsDisableWebCompat);
  fail('[\\p]/u', Context.OptionsDisableWebCompat);
  fail('[\\q]/u', Context.OptionsDisableWebCompat);
  fail('[\\u]/u', Context.OptionsDisableWebCompat);
  fail('[\\x]/u', Context.OptionsDisableWebCompat);
  fail('[\\y]/u', Context.OptionsDisableWebCompat);
  fail('[\\z]/u', Context.OptionsDisableWebCompat);
  fail('[\\I]/u', Context.OptionsDisableWebCompat);
  fail('[\\J]/u', Context.OptionsDisableWebCompat);
  fail('[\\K]/u', Context.OptionsDisableWebCompat);
  fail('[\\L]/u', Context.OptionsDisableWebCompat);
  fail('[\\M]/u', Context.OptionsDisableWebCompat);
  fail('[\\N]/u', Context.OptionsDisableWebCompat);
  fail('[\\O]/u', Context.OptionsDisableWebCompat);
  fail('[\\P]/u', Context.OptionsDisableWebCompat);
  fail('[\\Q]/u', Context.OptionsDisableWebCompat);
  fail('[\\R]/u', Context.OptionsDisableWebCompat);
  fail('[\\T]/u', Context.OptionsDisableWebCompat);
  fail('[\\U]/u', Context.OptionsDisableWebCompat);
  fail('[\\V]/u', Context.OptionsDisableWebCompat);
  fail('[\\X]/u', Context.Empty);
  fail('[\\Y]/u', Context.Empty);
  fail('[\\Z]/u', Context.Empty);
  fail('[abc\\a]/u', Context.Empty);
  fail('[abc\\e]/u', Context.Empty);
  fail('[abc\\g]/u', Context.Empty);
  fail('[abc\\h]/u', Context.Empty);
  fail('[abc\\i]/u', Context.Empty);
  fail('[abc\\j]/u', Context.Empty);
  fail('[abc\\k]/u', Context.Empty);
  fail('[abc\\l]/u', Context.Empty);
  fail('[abc\\m]/u', Context.Empty);
  fail('[abc\\o]/u', Context.Empty);
  fail('abc\\A]/u', Context.Empty);
  fail('[abc\\E]/u', Context.Empty);
  fail('[abc\\F]/u', Context.Empty);
  fail('[abc\\G]/u', Context.Empty);
  fail('[abc\\H]/u', Context.Empty);
  fail('[abc\\I]/u', Context.Empty);
  fail('[abc\\J]/u', Context.Empty);
  fail('[abc\\K]/u', Context.Empty);
  fail('[abc\\L]/u', Context.Empty);
  fail('[abc\\M]/u', Context.Empty);
  fail('[\\X]/u', Context.OptionsDisableWebCompat);
  fail('[\\Y]/u', Context.OptionsDisableWebCompat);
  fail('[\\Z]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\a]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\e]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\g]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\h]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\i]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\j]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\k]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\l]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\m]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\o]/u', Context.OptionsDisableWebCompat);
  fail('abc\\A]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\E]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\F]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\G]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\H]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\I]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\J]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\K]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\L]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\M]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\N]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\O]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\P]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Q]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\R]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\T]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\U]/u', Context.OptionsDisableWebCompat);
  fail('[\\aabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\eabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\gabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\habcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\iabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\jabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\kabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\labcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\mabcd]/u', Context.OptionsDisableWebCompat);
  fail('\\oabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\pabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\qabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Aabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Cabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Eabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Fabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Gabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Habcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Iabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Jabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Kabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Labcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Mabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Nabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Oabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Pabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Qabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Rabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Tabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Uabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Vabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Xabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Xabcd]/u', Context.Empty);
  fail('[\\Yabcd]/u', Context.Empty);
  fail('[\\Zabcd]/u', Context.Empty);
  fail('[abc\\adeff]/u', Context.Empty);
  fail('[abc\\gdeff]/u', Context.Empty);
  fail('[abc\\hdeff]/u', Context.Empty);
  fail('[abc\\ideff]/u', Context.Empty);
  fail('[abc\\jdeff]/u', Context.Empty);
  fail('[abc\\kdeff]/u', Context.Empty);
  fail('[abc\\ldeff]/u', Context.Empty);
  fail('abc\\mdeff]/u', Context.Empty);
  fail('[abc\\odeff]/u', Context.Empty);
  fail('[abc\\pdeff]/u', Context.Empty);
  fail('[abc\\qdeff]/u', Context.Empty);
  fail('[abc\\Adeff]/u', Context.Empty);
  fail('[abc\\Cdeff]/u', Context.Empty);
  fail('[abc\\Edeff]/u', Context.Empty);
  fail('[abc\\Fdeff]/u', Context.Empty);
  fail('[abc\\Gdeff]/u', Context.Empty);
  fail('[abc\\Hdeff]/u', Context.Empty);
  fail('[\\Yabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Zabcd]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\adeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\gdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\hdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\ideff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\jdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\kdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\ldeff]/u', Context.OptionsDisableWebCompat);
  fail('abc\\mdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\odeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\pdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\qdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Adeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Cdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Edeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Fdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Gdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Hdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Ideff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Jdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Kdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Ldeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Mdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Ndeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Odeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Pdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Qdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Rdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Tdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Udeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Vdeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Ydeff]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\Zdeff]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{afail}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{0fail}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{xxxx}]/u', Context.OptionsDisableWebCompat);
  fail('[\\x1]/u', Context.OptionsDisableWebCompat);
  fail('[\\x3]/u', Context.OptionsDisableWebCompat);
  fail('[\\x5]/u', Context.OptionsDisableWebCompat);
  fail('[\\x7]/u', Context.OptionsDisableWebCompat);
  fail('[\\x9]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{xxxx}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{afail}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{fail}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{af]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{a]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{0fail}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{afail}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{01234]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{af]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{a]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{', Context.OptionsDisableWebCompat);
  fail('[\\u{01234]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{012345]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{af]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{a', Context.OptionsDisableWebCompat);
  fail('[\\u{110000}]/u', Context.Empty);
  fail('[\\u{120000}]/u', Context.Empty);
  fail('[\\u{900000}]/u', Context.Empty);
  fail('[\\u{123456789}]/u', Context.Empty);
  fail('[\\u{ffffffffffffffff}]/u', Context.Empty);
  fail('[\\u{10000000000000000}]/u', Context.Empty);
  fail('[\\u{fffffffffffffffffffff}]/u', Context.Empty);
  fail('[\\u{00000000000000000000110000}]/u', Context.Empty);
  fail('[\\u{0000000000123456789}]/u', Context.Empty);
  fail('[\\u{000000ffffffffffffffff}]/u', Context.Empty);
  fail('[\\s-z]/u', Context.Empty);
  fail('[\\S-S]/u', Context.Empty);
  fail('[\\W-Z]/u', Context.Empty);
  fail('[\\d-z]/u', Context.Empty);
  fail('[x\\D-Z]/u', Context.Empty);
  fail('[x\\s-z]/u', Context.Empty);
  fail('[x\\S-S]/u', Context.Empty);
  fail('[x\\w-z]/u', Context.Empty);
  fail('[A-\\Dx]/u', Context.Empty);
  fail('[\\u{110000}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{120000}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{900000}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{123456789}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{ffffffffffffffff}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{10000000000000000}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{fffffffffffffffffffff}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{00000000000000000000110000}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{0000000000123456789}]/u', Context.OptionsDisableWebCompat);
  fail('[\\u{000000ffffffffffffffff}]/u', Context.OptionsDisableWebCompat);
  fail('[\\s-z]/u', Context.OptionsDisableWebCompat);
  fail('[\\S-S]/u', Context.OptionsDisableWebCompat);
  fail('[\\W-Z]/u', Context.OptionsDisableWebCompat);
  fail('[\\d-z]/u', Context.OptionsDisableWebCompat);
  fail('[x\\D-Z]/u', Context.OptionsDisableWebCompat);
  fail('[x\\s-z]/u', Context.OptionsDisableWebCompat);
  fail('[x\\S-S]/u', Context.OptionsDisableWebCompat);
  fail('[x\\w-z]/u', Context.OptionsDisableWebCompat);
  fail('[A-\\Dx]/u', Context.OptionsDisableWebCompat);
  fail('[a-\\sx]/u', Context.OptionsDisableWebCompat);
  fail('[A-\\Sx]/u', Context.OptionsDisableWebCompat);
  fail('[a-\\wx]/u', Context.OptionsDisableWebCompat);
  fail('\\2(x)/u', Context.OptionsDisableWebCompat);
  fail('[9-1]/u', Context.OptionsDisableWebCompat);
  fail('[\\u6000-\\u5000]/u', Context.OptionsDisableWebCompat);

  fail('[a-\\wx]/u', Context.OptionsDisableWebCompat);
  fail('[A-\\Dx]/u', Context.OptionsDisableWebCompat);
  fail('[a-\\sx]/u', Context.OptionsDisableWebCompat);
  fail('[A-\\Sx]/u', Context.OptionsDisableWebCompat);
  fail('[a-\\wx]/u', Context.OptionsDisableWebCompat);
  fail('[--+]/u', Context.Empty);
  fail('[0--]/u', Context.Empty);
  fail('[x---]/u', Context.Empty);
  fail('[0---]/u', Context.Empty);
  fail('[x-\\uD83D\\uDE07--+]/u', Context.Empty);
  fail('[x-\\uD83D\\uDE07--x-\\uD83D\\uDE07--]/u', Context.Empty);
  fail('a(b)', Context.Empty);
  fail('a(b)c', Context.Empty);
  fail('(', Context.Empty);
  fail(')', Context.Empty);
  fail('\\5/u', Context.Empty);
  fail('\\4/u', Context.Empty);
  fail('\\8/u', Context.Empty);
  fail('./u\\u0067', Context.Empty);
  fail('./\\u0067u', Context.Empty);
  fail('abc/ub', Context.Empty);
  fail('abc/au', Context.Empty);
  fail('a(?!b)', Context.Empty);
  fail('(?=(?=b)', Context.Empty);
  fail('(?=a(?=b))', Context.Empty);
  fail('a(?=a(?=b)', Context.Empty);
  fail('(?=b)c', Context.Empty);
  fail('(?:a(?:b))', Context.Empty);
  fail(')', Context.Empty);
  fail(')', Context.Empty);
  fail('[--+]/u', Context.OptionsDisableWebCompat);
  fail('[0--]/u', Context.OptionsDisableWebCompat);
  fail('[x---]/u', Context.OptionsDisableWebCompat);
  fail('[0---]/u', Context.OptionsDisableWebCompat);
  fail('[x-\\uD83D\\uDE07--+]/u', Context.OptionsDisableWebCompat);
  fail('[x-\\uD83D\\uDE07--x-\\uD83D\\uDE07--]/u', Context.OptionsDisableWebCompat);
  fail('a(b)', Context.OptionsDisableWebCompat);
  fail('a(b)c', Context.OptionsDisableWebCompat);
  fail('(', Context.OptionsDisableWebCompat);
  fail(')', Context.OptionsDisableWebCompat);
  fail('\\5/u', Context.OptionsDisableWebCompat);
  fail('\\4/u', Context.OptionsDisableWebCompat);
  fail('\\8/u', Context.OptionsDisableWebCompat);
  fail('./u\\u0067', Context.OptionsDisableWebCompat);
  fail('./\\u0067u', Context.OptionsDisableWebCompat);
  fail('abc/ub', Context.OptionsDisableWebCompat);
  fail('abc/au', Context.OptionsDisableWebCompat);
  fail('a(?!b)', Context.Empty);
  fail('(?=(?=b)', Context.Empty);
  fail('(?=a(?=b))', Context.Empty);
  fail('a(?=a(?=b)', Context.Empty);
  fail('(?=b)c', Context.Empty);
  fail('(?:a(?:b))', Context.Empty);
  fail(')', Context.Empty);
  fail(')', Context.Empty);
  fail(')', Context.Empty);
  fail('((b))', Context.Empty);
  fail('(a(b)', Context.Empty);
  fail('a(a(b)', Context.Empty);
  fail('a(a(b))', Context.Empty);
  fail('(?:b)', Context.Empty);
  fail('a(?:b)', Context.Empty);
  fail('(', Context.Empty);
  fail(')', Context.Empty);
  fail('(', Context.Empty);
  fail(')', Context.Empty);
  fail('(', Context.Empty);
  fail(')', Context.Empty);
  fail('a(bcde/u', Context.Empty);
  fail('a(b(cde/u', Context.Empty);
  fail('a(b(?:cd)e/u', Context.Empty);
  fail('a(b(?:cde/u', Context.Empty);
  fail('a(b(?=cd)e/u', Context.Empty);
  fail('a(b(?=cde/u', Context.Empty);
  fail('a(b(?!cd)e/u', Context.Empty);
  fail('a(b(?!cde/u', Context.Empty);
  fail('a(?:b(cd)e/u', Context.Empty);
  fail('a(?:b(cde/u', Context.Empty);
  fail('a(?:b(?:cd)e/u', Context.Empty);
  fail('a(?:b(?:cde/u', Context.Empty);
  fail('a(?:b(?=cd)e/u', Context.Empty);
  fail('a(?:b(?=cde/u', Context.Empty);
  fail('a(?!b)', Context.OptionsDisableWebCompat);
  fail('(?=(?=b)', Context.OptionsDisableWebCompat);
  fail('(?=a(?=b))', Context.OptionsDisableWebCompat);
  fail('a(?=a(?=b)', Context.OptionsDisableWebCompat);
  fail('(?=b)c', Context.OptionsDisableWebCompat);
  fail('(?:a(?:b))', Context.OptionsDisableWebCompat);
  fail(')', Context.OptionsDisableWebCompat);
  fail(')', Context.OptionsDisableWebCompat);
  fail(')', Context.OptionsDisableWebCompat);
  fail('((b))', Context.OptionsDisableWebCompat);
  fail('(a(b)', Context.OptionsDisableWebCompat);
  fail('a(a(b)', Context.OptionsDisableWebCompat);
  fail('a(a(b))', Context.OptionsDisableWebCompat);
  fail('(?:b)', Context.OptionsDisableWebCompat);
  fail('a(?:b)', Context.OptionsDisableWebCompat);
  fail('(', Context.OptionsDisableWebCompat);
  fail(')', Context.OptionsDisableWebCompat);
  fail('(', Context.OptionsDisableWebCompat);
  fail(')', Context.OptionsDisableWebCompat);
  fail('(', Context.OptionsDisableWebCompat);
  fail(')', Context.OptionsDisableWebCompat);
  fail('a(bcde/u', Context.OptionsDisableWebCompat);
  fail('a(b(cde/u', Context.OptionsDisableWebCompat);
  fail('a(b(?:cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(b(?:cde/u', Context.OptionsDisableWebCompat);
  fail('a(b(?=cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(b(?=cde/u', Context.OptionsDisableWebCompat);
  fail('a(b(?!cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(b(?!cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?:cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?:cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?=cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?=cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?!cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?!cde/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(cde/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?:cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?:cde/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?=cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?=cde/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?!cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?!cde/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(c)de/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(cde/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?:cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?:cde/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?=cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?=cde/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?!cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?!cde/u', Context.OptionsDisableWebCompat);
  fail('0{2,1}/u', Context.OptionsDisableWebCompat);
  fail('^[z-a]$/u', Context.OptionsDisableWebCompat);
  fail('a**/u', Context.OptionsDisableWebCompat);
  fail('a***/u', Context.OptionsDisableWebCompat);
  fail('a++/u', Context.OptionsDisableWebCompat);
  fail('a+++/u', Context.OptionsDisableWebCompat);
  fail('a???/u', Context.OptionsDisableWebCompat);
  fail('a????/u', Context.OptionsDisableWebCompat);
  fail('x{1}{1,}/u', Context.OptionsDisableWebCompat);
  fail('x{1,2}{1}/u', Context.OptionsDisableWebCompat);
  fail('x{1,}{1}/u', Context.Empty);
  fail('x{0,1}{1,}/u', Context.Empty);
  fail('+a/u', Context.Empty);
  fail('++a/u', Context.Empty);
  fail('?a/u', Context.Empty);
  fail('??a/u', Context.Empty);
  fail('[b-ac-e]/u', Context.Empty);
  fail('[a-dc-b]/u', Context.Empty);
  fail('[\\db-G]/u', Context.Empty);
  fail('[\\Db-G]/u', Context.Empty);
  fail('[\\sb-G]/u', Context.Empty);
  fail('[\\Sb-G]/u', Context.Empty);
  fail('[\\wb-G]/u', Context.Empty);
  fail('[\\Wb-G]/u', Context.Empty);
  fail('[\\0b-G]/u', Context.Empty);
  fail('[\\10b-G]/u', Context.Empty);
  fail('[\\bd-G]/u', Context.Empty);
  fail('[\\Bd-G]/u', Context.Empty);
  fail('[\\td-G]/u', Context.Empty);
  fail('[\\nd-G]/u', Context.Empty);
  fail('[\\vd-G]/u', Context.Empty);
  fail('[\\fd-G]/u', Context.Empty);
  fail('[\\rd-G]/u', Context.Empty);
  fail('[\\c0001d-G]/u', Context.Empty);
  fail('[\\x0061d-G]/u', Context.Empty);
  fail('[\\u0061d-G]/u', Context.Empty);
  fail('[\\ad-G]/u', Context.Empty);
  fail('[c-eb-a]/u', Context.Empty);
  fail('[b-G\\d]/u', Context.Empty);
  fail('[b-G\\D]/u', Context.Empty);
  fail('[b-G\\s]/u', Context.Empty);
  fail('[b-G\\S]/u', Context.Empty);
  fail('[b-G\\w]/u', Context.Empty);
  fail('[b-G\\W]/u', Context.Empty);
  fail('[b-G\\0]/u', Context.Empty);
  fail('[b-G\\10]/u', Context.Empty);
  fail('[d-G\\b]/u', Context.Empty);
  fail('[d-G\\B]/u', Context.Empty);
  fail('[d-G\\t]/u', Context.Empty);
  fail('[d-G\\n]/u', Context.Empty);
  fail('[d-G\\v]/u', Context.Empty);
  fail('[d-G\\f]/u', Context.Empty);
  fail('[d-G\\r]/u', Context.Empty);
  fail('[d-G\\c0001]/u', Context.Empty);
  fail('[d-G\\x0061]/u', Context.Empty);
  fail('[d-G\\u0061]/u', Context.Empty);
  fail('[d-G\\a]/u', Context.Empty);
  fail('\\\rn/u', Context.Empty);
  fail('\\b*/u', Context.Empty);
  fail('\\b+/u', Context.Empty);
  fail('\\b?/u', Context.Empty);
  fail('x{1,}{1}/u', Context.OptionsDisableWebCompat);
  fail('x{0,1}{1,}/u', Context.OptionsDisableWebCompat);
  fail('+a/u', Context.OptionsDisableWebCompat);
  fail('++a/u', Context.OptionsDisableWebCompat);
  fail('?a/u', Context.OptionsDisableWebCompat);
  fail('??a/u', Context.OptionsDisableWebCompat);
  fail('[b-ac-e]/u', Context.OptionsDisableWebCompat);
  fail('[a-dc-b]/u', Context.OptionsDisableWebCompat);
  fail('[\\db-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\Db-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\sb-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\Sb-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\wb-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\Wb-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\0b-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\10b-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\bd-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\Bd-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\td-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\nd-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\vd-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\fd-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\rd-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\c0001d-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\x0061d-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\u0061d-G]/u', Context.OptionsDisableWebCompat);
  fail('[\\ad-G]/u', Context.OptionsDisableWebCompat);
  fail('[c-eb-a]/u', Context.OptionsDisableWebCompat);
  fail('[b-G\\d]/u', Context.OptionsDisableWebCompat);
  fail('[b-G\\D]/u', Context.OptionsDisableWebCompat);
  fail('[b-G\\s]/u', Context.OptionsDisableWebCompat);
  fail('[b-G\\S]/u', Context.OptionsDisableWebCompat);
  fail('[b-G\\w]/u', Context.OptionsDisableWebCompat);
  fail('[b-G\\W]/u', Context.OptionsDisableWebCompat);
  fail('[b-G\\0]/u', Context.OptionsDisableWebCompat);
  fail('[b-G\\10]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\b]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\B]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\t]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\n]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\v]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\f]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\r]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\c0001]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\x0061]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\u0061]/u', Context.OptionsDisableWebCompat);
  fail('[d-G\\a]/u', Context.OptionsDisableWebCompat);
  fail('\\\rn/u', Context.OptionsDisableWebCompat);
  fail('\\b*/u', Context.OptionsDisableWebCompat);
  fail('\\b+/u', Context.OptionsDisableWebCompat);
  fail('\\b?/u', Context.OptionsDisableWebCompat);
  fail('\\b{1}/u', Context.OptionsDisableWebCompat);
  fail('\\b**/u', Context.OptionsDisableWebCompat);
  fail('\\b++/u', Context.OptionsDisableWebCompat);
  fail('\\b?+/u', Context.OptionsDisableWebCompat);
  fail('\\b{1}+/u', Context.OptionsDisableWebCompat);
  fail('(?=.)**/u', Context.OptionsDisableWebCompat);
  fail('(?=.)++/u', Context.OptionsDisableWebCompat);
  fail('(?=.)?+/u', Context.OptionsDisableWebCompat);
  fail('(?=.){1}+/u', Context.OptionsDisableWebCompat);
  fail('\\B*/u', Context.OptionsDisableWebCompat);
  fail('\\B+/u', Context.OptionsDisableWebCompat);
  fail('\\B?/u', Context.OptionsDisableWebCompat);
  fail('\\B{1}/u', Context.OptionsDisableWebCompat);
  fail('\\B**/u', Context.OptionsDisableWebCompat);
  fail('\\B++/u', Context.OptionsDisableWebCompat);
  fail('\\B?+/u', Context.OptionsDisableWebCompat);
  fail('\\B{1}+/u', Context.OptionsDisableWebCompat);
  fail('(?!.)**/u', Context.OptionsDisableWebCompat);
  fail('(?!.)++/u', Context.OptionsDisableWebCompat);
  fail('(?!.)?+/u', Context.OptionsDisableWebCompat);
  fail('(?!.){1}+/u', Context.OptionsDisableWebCompat);
  fail('(?=.)+/u', Context.OptionsDisableWebCompat);
  fail('(?=.)?/u', Context.OptionsDisableWebCompat);
  fail('(?=.){1}/u', Context.OptionsDisableWebCompat);
  fail('(?!.)*/u', Context.OptionsDisableWebCompat);
  fail('(?!.){1}/u', Context.OptionsDisableWebCompat);
  fail('(?!.)+/u', Context.OptionsDisableWebCompat);
  fail('(?!.)+/u', Context.OptionsDisableWebCompat);
  fail(`abc\\?]/u`, Context.OptionsDisableWebCompat);
  fail('[b\\-a]/u', Context.Empty);
  fail('[b\\-a]/u', Context.Empty);
  fail('[\\kabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Kabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Labcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Mabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\Nabcd]/u', Context.OptionsDisableWebCompat);
  fail('[\\k]/u', Context.OptionsDisableWebCompat);
  fail('[\\K]/u', Context.OptionsDisableWebCompat);
  fail('[b\\-a]/u', Context.Empty);
  fail('(?:b)c', Context.OptionsDisableWebCompat);
  fail('a(?=b)', Context.OptionsDisableWebCompat);
  fail('[a\\-b]/', Context.OptionsDisableWebCompat);
  fail('+a/', Context.OptionsDisableWebCompat);
  fail('?a/', Context.OptionsDisableWebCompat);
  fail('|?/', Context.OptionsDisableWebCompat);
  fail('|+/', Context.OptionsDisableWebCompat);
  fail('|*/', Context.OptionsDisableWebCompat);
  fail('a??', Context.OptionsDisableWebCompat);
  fail('a++/', Context.OptionsDisableWebCompat);
  fail('a?+/', Context.OptionsDisableWebCompat);
  fail('a**/', Context.OptionsDisableWebCompat);
  fail('abc', Context.OptionsDisableWebCompat);
  fail('abc', Context.OptionsDisableWebCompat);
  fail('a||', Context.OptionsDisableWebCompat);
  fail('|', Context.OptionsDisableWebCompat);
  fail('a|', Context.OptionsDisableWebCompat);
  fail('|a', Context.OptionsDisableWebCompat);
  fail('|a', Context.OptionsDisableWebCompat);
  fail('a??', Context.OptionsDisableWebCompat);
  fail('a++', Context.OptionsDisableWebCompat);
  fail('+?', Context.OptionsDisableWebCompat);
  fail('+a', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{1 }/', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{1,1 }/', Context.OptionsDisableWebCompat);
  fail('a{1,0}/', Context.OptionsDisableWebCompat);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{01,1}/', Context.OptionsDisableWebCompat);
  fail('a{1,02}/', Context.OptionsDisableWebCompat);
  fail('a{03,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,00}/', Context.OptionsDisableWebCompat);
  fail('a{0x01,1}/', Context.OptionsDisableWebCompat);
  fail('a{0x15,02}/', Context.OptionsDisableWebCompat);
  fail('a{0b01,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/', Context.OptionsDisableWebCompat);

  fail('a{11,0}/', Context.OptionsDisableWebCompat);
  fail('a{90,9}/', Context.OptionsDisableWebCompat);
  fail('a{89,8}/', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1 }/', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1 }/', Context.OptionsDisableWebCompat);
  fail('a{45,4}/', Context.OptionsDisableWebCompat);
  fail('a{1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{1 ,1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/', Context.OptionsDisableWebCompat);

  fail('a{03,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,00}/', Context.OptionsDisableWebCompat);
  fail('a{01,1}/', Context.OptionsDisableWebCompat);
  fail('foo/gg', Context.OptionsDisableWebCompat);
  fail('foo/ii', Context.OptionsDisableWebCompat);
  fail('foo/mm', Context.OptionsDisableWebCompat);
  fail('foo/yy', Context.OptionsDisableWebCompat);
  fail('foo/igyi', Context.OptionsDisableWebCompat);
  fail('foo/myiy', Context.OptionsDisableWebCompat);
  fail('foo/ggymi', Context.OptionsDisableWebCompat);
  fail('foo/gmmi', Context.OptionsDisableWebCompat);
  fail('\\^', Context.OptionsDisableWebCompat);
  fail('\\$', Context.OptionsDisableWebCompat);
  fail('\\\\', Context.OptionsDisableWebCompat);
  fail('\\.', Context.OptionsDisableWebCompat);
  fail('\\*', Context.OptionsDisableWebCompat);
  fail('\\+', Context.OptionsDisableWebCompat);
  fail('\\?', Context.OptionsDisableWebCompat);
  fail('\\(', Context.OptionsDisableWebCompat);
  fail('\\)', Context.OptionsDisableWebCompat);
  fail('\\[', Context.OptionsDisableWebCompat);
  fail('\\]', Context.OptionsDisableWebCompat);
  fail('\\{', Context.OptionsDisableWebCompat);
  fail('\\}', Context.OptionsDisableWebCompat);
  fail('\\|', Context.OptionsDisableWebCompat);
  fail('\\/', Context.OptionsDisableWebCompat);
  fail('a|\\/', Context.OptionsDisableWebCompat);
  fail('a|}/', Context.OptionsDisableWebCompat);
  fail('a|{/', Context.OptionsDisableWebCompat);
  fail('a|]/', Context.OptionsDisableWebCompat);
  fail('a|)/', Context.OptionsDisableWebCompat);
  fail('a|?/', Context.OptionsDisableWebCompat);
  fail('a|+/', Context.OptionsDisableWebCompat);
  fail('a|*/', Context.OptionsDisableWebCompat);
  fail('a(*)/', Context.OptionsDisableWebCompat);
  fail('a(+)/', Context.OptionsDisableWebCompat);
  fail('a(?)/', Context.OptionsDisableWebCompat);
  fail('a|(])/', Context.OptionsDisableWebCompat);
  fail('a|({)/', Context.OptionsDisableWebCompat);
  fail('a|(})/', Context.OptionsDisableWebCompat);
  fail('a|)/', Context.OptionsDisableWebCompat);
  fail('a|?/', Context.OptionsDisableWebCompat);
  fail('a|+/', Context.OptionsDisableWebCompat);
  fail('a|*/', Context.OptionsDisableWebCompat);
  fail('a(*)/', Context.OptionsDisableWebCompat);
  fail('a(+)/', Context.OptionsDisableWebCompat);
  fail('a(?)/', Context.OptionsDisableWebCompat);
  fail('}/', Context.OptionsDisableWebCompat);
  fail('{/', Context.OptionsDisableWebCompat);
  fail(']/', Context.OptionsDisableWebCompat);
  fail(')/', Context.OptionsDisableWebCompat);
  fail('?/', Context.OptionsDisableWebCompat);
  fail('+/', Context.OptionsDisableWebCompat);
  fail('[b\\-a]/u', Context.Empty);
  fail('\\ca', Context.OptionsDisableWebCompat);
  fail('\\cb', Context.OptionsDisableWebCompat);
  fail('\\cc', Context.OptionsDisableWebCompat);
  fail('\\cd', Context.OptionsDisableWebCompat);
  fail('\\cj', Context.OptionsDisableWebCompat);
  fail('\\cG', Context.OptionsDisableWebCompat);
  fail('\\cH', Context.OptionsDisableWebCompat);
  fail('[d-G\\v]/u', Context.Empty);
  fail('[d-G\\f]/u', Context.Empty);
  fail('[d-G\\r]/u', Context.Empty);
  fail('[d-G\\c0001]/u', Context.Empty);
  fail('[d-G\\x0061]/u', Context.Empty);
  fail('[d-G\\u0061]/u', Context.Empty);
  fail('[d-G\\a]/u', Context.Empty);
  fail('\\\rn/u', Context.Empty);
  fail('\\b*/u', Context.Empty);
  fail('\\b+/u', Context.Empty);
  fail('\\b?/u', Context.Empty);
  fail('\\b{1}/u', Context.Empty);
  fail('\\b**/u', Context.Empty);
  fail('\\b++/u', Context.Empty);
  fail('\\b?+/u', Context.Empty);
  fail('\\b{1}+/u', Context.Empty);
  fail('(?=.)**/u', Context.Empty);
  fail('(?=.)++/u', Context.Empty);
  fail('(?=.)?+/u', Context.Empty);
  fail('(?=.){1}+/u', Context.Empty);
  fail('\\B*/u', Context.Empty);
  fail('\\B+/u', Context.Empty);
  fail('\\B?/u', Context.Empty);
  fail('\\B{1}/u', Context.Empty);
  fail('\\B**/u', Context.Empty);
  fail('\\B++/u', Context.Empty);
  fail('\\B?+/u', Context.Empty);
  fail('\\B{1}+/u', Context.Empty);
  fail('(?!.)**/u', Context.Empty);
  fail('(?!.)++/u', Context.Empty);
  fail('(?!.)?+/u', Context.Empty);
  fail('(?!.){1}+/u', Context.Empty);
  fail('(?=.)+/u', Context.Empty);
  fail('(?=.)?/u', Context.Empty);
  fail('(?=.){1}/u', Context.Empty);
  fail('(?!.)*/u', Context.Empty);
  fail('(?!.){1}/u', Context.Empty);
  fail('(?!.)+/u', Context.Empty);
  fail('(?!.)+/u', Context.Empty);
  fail(`abc\\?]/u`, Context.Empty);
  fail('[b\\-a]/u', Context.Empty);
  fail('[b\\-a]/u', Context.Empty);
  fail('[\\kabcd]/u', Context.Empty);
  fail('[\\Kabcd]/u', Context.Empty);
  fail('[\\Labcd]/u', Context.Empty);
  fail('[\\Mabcd]/u', Context.Empty);
  fail('[\\Nabcd]/u', Context.Empty);
  fail('[\\k]/u', Context.Empty);
  fail('[\\K]/u', Context.Empty);
  fail('a(?=b)', Context.Empty);
  fail('+a/', Context.Empty);
  fail('?a/', Context.Empty);
  fail('|?/', Context.Empty);
  fail('|+/', Context.Empty);
  fail('|*/', Context.Empty);
  fail('a??', Context.Empty);
  fail('a++/', Context.Empty);
  fail('a?+/', Context.Empty);
  fail('a**/', Context.Empty);
  fail('abc', Context.Empty);
  fail('abc', Context.Empty);
  fail('a||', Context.Empty);
  fail('|', Context.Empty);
  fail('a|', Context.Empty);
  fail('|a', Context.Empty);
  fail('|a', Context.Empty);
  fail('a??', Context.OptionsDisableWebCompat);
  fail('a++', Context.OptionsDisableWebCompat);
  fail('+?', Context.OptionsDisableWebCompat);
  fail('+a', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{1 }/', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{1,1 }/', Context.OptionsDisableWebCompat);
  fail('a{1,0}/', Context.OptionsDisableWebCompat);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{01,1}/', Context.OptionsDisableWebCompat);
  fail('a{1,02}/', Context.OptionsDisableWebCompat);
  fail('a{03,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,00}/', Context.OptionsDisableWebCompat);
  fail('a{0x01,1}/', Context.OptionsDisableWebCompat);
  fail('a{0x15,02}/', Context.OptionsDisableWebCompat);
  fail('a{0b01,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/', Context.OptionsDisableWebCompat);

  fail('a{11,0}/', Context.OptionsDisableWebCompat);
  fail('a{90,9}/', Context.OptionsDisableWebCompat);
  fail('a{89,8}/', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1 }/', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1 }/', Context.OptionsDisableWebCompat);
  fail('a{45,4}/', Context.OptionsDisableWebCompat);
  fail('a{1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{1 ,1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/', Context.OptionsDisableWebCompat);

  fail('a{03,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,00}/', Context.OptionsDisableWebCompat);
  fail('a{01,1}/', Context.OptionsDisableWebCompat);
  fail('foo/gg', Context.OptionsDisableWebCompat);
  fail('foo/ii', Context.OptionsDisableWebCompat);
  fail('foo/mm', Context.OptionsDisableWebCompat);
  fail('foo/yy', Context.OptionsDisableWebCompat);
  fail('foo/igyi', Context.OptionsDisableWebCompat);
  fail('foo/myiy', Context.OptionsDisableWebCompat);
  fail('foo/ggymi', Context.OptionsDisableWebCompat);
  fail('foo/gmmi', Context.OptionsDisableWebCompat);
  fail('\\^', Context.OptionsDisableWebCompat);
  fail('\\$', Context.OptionsDisableWebCompat);
  fail('\\\\', Context.OptionsDisableWebCompat);
  fail('\\.', Context.OptionsDisableWebCompat);
  fail('\\*', Context.OptionsDisableWebCompat);
  fail('\\+', Context.OptionsDisableWebCompat);
  fail('\\?', Context.OptionsDisableWebCompat);
  fail('\\(', Context.OptionsDisableWebCompat);
  fail('\\)', Context.OptionsDisableWebCompat);
  fail('\\[', Context.OptionsDisableWebCompat);
  fail('\\]', Context.OptionsDisableWebCompat);
  fail('\\{', Context.OptionsDisableWebCompat);
  fail('\\}', Context.OptionsDisableWebCompat);
  fail('\\|', Context.OptionsDisableWebCompat);
  fail('\\/', Context.OptionsDisableWebCompat);
  fail('a|\\/', Context.OptionsDisableWebCompat);
  fail('a|}/', Context.OptionsDisableWebCompat);
  fail('a|{/', Context.OptionsDisableWebCompat);
  fail('a|]/', Context.OptionsDisableWebCompat);
  fail('a|)/', Context.OptionsDisableWebCompat);
  fail('a|?/', Context.OptionsDisableWebCompat);
  fail('a|+/', Context.OptionsDisableWebCompat);
  fail('a|*/', Context.OptionsDisableWebCompat);
  fail('a(*)/', Context.OptionsDisableWebCompat);
  fail('a(+)/', Context.OptionsDisableWebCompat);
  fail('a(?)/', Context.OptionsDisableWebCompat);
  fail('a|(])/', Context.OptionsDisableWebCompat);
  fail('a|({)/', Context.OptionsDisableWebCompat);
  fail('a|(})/', Context.OptionsDisableWebCompat);
  fail('a|)/', Context.OptionsDisableWebCompat);
  fail('a|?/', Context.OptionsDisableWebCompat);
  fail('a|+/', Context.OptionsDisableWebCompat);
  fail('a|*/', Context.OptionsDisableWebCompat);
  fail('a(*)/', Context.OptionsDisableWebCompat);
  fail('a(+)/', Context.OptionsDisableWebCompat);
  fail('a(?)/', Context.OptionsDisableWebCompat);
  fail('}/', Context.OptionsDisableWebCompat);
  fail('{/', Context.OptionsDisableWebCompat);
  fail(']/', Context.OptionsDisableWebCompat);
  fail(')/', Context.OptionsDisableWebCompat);
  fail('?/', Context.OptionsDisableWebCompat);
  fail('+/', Context.OptionsDisableWebCompat);

  fail('\\ca', Context.OptionsDisableWebCompat);
  fail('\\cb', Context.OptionsDisableWebCompat);
  fail('\\cc', Context.OptionsDisableWebCompat);
  fail('\\cd', Context.OptionsDisableWebCompat);
  fail('\\cj', Context.OptionsDisableWebCompat);
  fail('\\cG', Context.OptionsDisableWebCompat);
  fail('\\cH', Context.OptionsDisableWebCompat);
  fail('\\cR', Context.OptionsDisableWebCompat);
  fail('\\cW', Context.OptionsDisableWebCompat);
  fail('\\d', Context.OptionsDisableWebCompat);
  fail('\\s', Context.OptionsDisableWebCompat);
  fail('\\P', Context.OptionsDisableWebCompat);
  fail('\\U', Context.OptionsDisableWebCompat);
  fail('\\Z', Context.OptionsDisableWebCompat);
  fail('abc\\l', Context.OptionsDisableWebCompat);
  fail('abc\\p', Context.OptionsDisableWebCompat);
  fail('abc\\q', Context.OptionsDisableWebCompat);
  fail('abc\\x', Context.OptionsDisableWebCompat);
  fail('abc\\z', Context.OptionsDisableWebCompat);
  fail('abc\\W', Context.OptionsDisableWebCompat);
  fail('\\oabcd', Context.OptionsDisableWebCompat);
  fail('\\rabcd', Context.OptionsDisableWebCompat);
  fail('\\sabcd', Context.OptionsDisableWebCompat);
  fail('\\habcd', Context.OptionsDisableWebCompat);
  fail('\\zabcd', Context.OptionsDisableWebCompat);
  fail('\\Gabcd', Context.OptionsDisableWebCompat);
  fail('\\Vabcd', Context.OptionsDisableWebCompat);
  fail('\\Yabcd', Context.OptionsDisableWebCompat);
  fail('\\Gabcd', Context.OptionsDisableWebCompat);
  fail('\\Nabcd', Context.OptionsDisableWebCompat);
  fail('abc\\jdeff', Context.Empty);
  fail('abc\\kdeff', Context.Empty);
  fail('abc\\sdeff', Context.Empty);
  fail('abc\\zdeff', Context.Empty);
  fail('abc\\Udeff', Context.Empty);
  fail('abc\\Wdeff', Context.Empty);
  fail('abc\\sdeff', Context.Empty);
  fail('abc\\Jdeff', Context.Empty);
  fail('a\\1/', Context.OptionsDisableWebCompat);
  fail('abc\\jdeff', Context.OptionsDisableWebCompat);
  fail('abc\\kdeff', Context.OptionsDisableWebCompat);
  fail('abc\\sdeff', Context.OptionsDisableWebCompat);
  fail('abc\\zdeff', Context.OptionsDisableWebCompat);
  fail('abc\\Udeff', Context.OptionsDisableWebCompat);
  fail('abc\\Wdeff', Context.OptionsDisableWebCompat);
  fail('abc\\sdeff', Context.OptionsDisableWebCompat);
  fail('abc\\Jdeff', Context.OptionsDisableWebCompat);
  fail('\\$', Context.OptionsDisableWebCompat);
  fail('abc\\$abcd', Context.OptionsDisableWebCompat);
  fail('abc\\_abcd', Context.OptionsDisableWebCompat);
  fail('\\x9/', Context.OptionsDisableWebCompat);
  fail('\\x7/', Context.OptionsDisableWebCompat);
  fail('\\x1/', Context.OptionsDisableWebCompat);
  fail('\\x0/', Context.OptionsDisableWebCompat);
  fail('\\x/', Context.OptionsDisableWebCompat);
  fail('\\x0', Context.OptionsDisableWebCompat);
  fail('\\x1', Context.OptionsDisableWebCompat);
  fail('\\x2', Context.OptionsDisableWebCompat);
  fail('\\x3', Context.OptionsDisableWebCompat);
  fail('\\x12', Context.OptionsDisableWebCompat);
  fail('a\\02/', Context.OptionsDisableWebCompat);
  fail('a\\04b/', Context.OptionsDisableWebCompat);
  fail('\\06(b)/', Context.OptionsDisableWebCompat);
  fail('\\08/', Context.OptionsDisableWebCompat);
  fail('\\09/', Context.OptionsDisableWebCompat);
  fail('\\00/', Context.OptionsDisableWebCompat);
  fail('a\\02/', Context.OptionsDisableWebCompat);
  fail('\\01/', Context.OptionsDisableWebCompat);
  fail('a\\02/', Context.OptionsDisableWebCompat);
  fail('\\0', Context.OptionsDisableWebCompat);
  fail('a\\0', Context.OptionsDisableWebCompat);
  fail('\\0b', Context.OptionsDisableWebCompat);
  fail('a\\0b', Context.OptionsDisableWebCompat);
  fail('(a)\\0', Context.OptionsDisableWebCompat);
  fail('\\0(b)', Context.OptionsDisableWebCompat);
  fail('(\\0)', Context.OptionsDisableWebCompat);
  fail('\\2(a)/', Context.OptionsDisableWebCompat);
  fail('(a)\\3/', Context.OptionsDisableWebCompat);
  fail('(a)x\\6/', Context.OptionsDisableWebCompat);
  fail('4\\9(a)/', Context.OptionsDisableWebCompat);
  fail('(a)|\\10/', Context.OptionsDisableWebCompat);
  fail('\\11|(a)/', Context.OptionsDisableWebCompat);
  fail('(\\12|a)/', Context.OptionsDisableWebCompat);
  fail('(a|\\13)/', Context.OptionsDisableWebCompat);
  fail('a\\1/', Context.OptionsDisableWebCompat);
  fail('(a)\\2/', Context.OptionsDisableWebCompat);
  fail('((a))\\3/', Context.OptionsDisableWebCompat);
  fail('(((a)))\\4/', Context.OptionsDisableWebCompat);
  fail('(((((a)))))\\6/', Context.OptionsDisableWebCompat);
  fail('(((((((((((a)))))))))))\\12/', Context.OptionsDisableWebCompat);
  fail('(((((((((((((a)))))))))))))\\14/', Context.OptionsDisableWebCompat);
  fail('((((((((((((((((((a))))))))))))))))))\\19/', Context.OptionsDisableWebCompat);
  fail('(((((((((((((((((((a)))))))))))))))))))\\20/', Context.OptionsDisableWebCompat);
  fail('((((((((((((((((((((a))))))))))))))))))))\\21/', Context.OptionsDisableWebCompat);
  fail('\\ubcd', Context.OptionsDisableWebCompat);
  fail('x\\u0', Context.OptionsDisableWebCompat);
  fail('x\\ubcd', Context.OptionsDisableWebCompat);
  fail('\\u{CDEF}/', Context.OptionsDisableWebCompat);
  fail('\\u{defAB}/', Context.OptionsDisableWebCompat);
  fail('\\u{89abc}/', Context.OptionsDisableWebCompat);
  fail('\\u{4567}/', Context.OptionsDisableWebCompat);
  fail('\\u{0123}/', Context.OptionsDisableWebCompat);
  fail('prefix \\u{012345}/', Context.OptionsDisableWebCompat);
  fail('\\u{0fail}/', Context.OptionsDisableWebCompat);
  fail('\\u{xxxx}/', Context.OptionsDisableWebCompat);
  fail('\\u{1234}/', Context.OptionsDisableWebCompat);
  fail('\\u{12345}/', Context.OptionsDisableWebCompat);
  fail('\\u{103456}/', Context.OptionsDisableWebCompat);
  fail('\\u{123}/', Context.OptionsDisableWebCompat);
  fail('\\u{12}/', Context.OptionsDisableWebCompat);
  fail('\\u{1}/', Context.OptionsDisableWebCompat);
  fail('\\u{', Context.OptionsDisableWebCompat);
  fail('\\u{af', Context.OptionsDisableWebCompat);
  fail('\\u{123', Context.OptionsDisableWebCompat);
  fail('\\u{124', Context.OptionsDisableWebCompat);
  fail('\\u{12345', Context.OptionsDisableWebCompat);
  fail('[\\c-f]/', Context.OptionsDisableWebCompat);
  fail('\\1/', Context.OptionsDisableWebCompat);
  fail('(?<a>\\a)/', Context.Empty);
  fail('(?<abc>/', Context.OptionsDisableWebCompat);
  fail('(?<a>\\a)/', Context.Empty);
  fail('\\u{12346', Context.OptionsDisableWebCompat);
  fail('\\u{10ffff}/', Context.OptionsDisableWebCompat);
  fail('\\u{110000}/', Context.OptionsDisableWebCompat);
  fail('\\u{0000000000000000000010ffff}/', Context.OptionsDisableWebCompat);
  fail('\\u{00000000000000000000110000}/', Context.OptionsDisableWebCompat);
  fail('\\u{0123}/', Context.OptionsDisableWebCompat);
  fail('\\u{4567}/', Context.OptionsDisableWebCompat);
  fail('\\u{89abc}/', Context.OptionsDisableWebCompat);
  fail('\\u{defAB}/', Context.OptionsDisableWebCompat);
  fail('\\u{CDEF}/', Context.OptionsDisableWebCompat);
  fail('\u{012345}\\u{6789a}/', Context.OptionsDisableWebCompat);
  fail('\\u{012345} postfix/', Context.OptionsDisableWebCompat);
  fail('\\u{afail}/', Context.OptionsDisableWebCompat);
  fail('\\u{xxxx}/', Context.OptionsDisableWebCompat);
  fail('\\u{0fail}/', Context.OptionsDisableWebCompat);
  fail('\\u{}/', Context.OptionsDisableWebCompat);
  fail('(?<\\Uabcd/)/', Context.Empty);
  fail('(?<abc>/', Context.Empty);
  fail('\\e/', Context.Empty);
  fail('\\a/', Context.Empty);
  fail('\\g/', Context.Empty);
  fail('abc\\zdeff/', Context.Empty);
  fail('\\A/', Context.Empty);
  fail('\\Z/', Context.Empty);
  fail('\\a/', Context.Empty);
  fail('abc\\_/', Context.Empty);
  fail('\\u{af/', Context.OptionsDisableWebCompat);
  fail('\\u{012/', Context.OptionsDisableWebCompat);
  fail('\\u{01234/', Context.OptionsDisableWebCompat);
  fail('\\u{012345/', Context.OptionsDisableWebCompat);
  fail('\\u{1}/', Context.OptionsDisableWebCompat);
  fail('\\u{12}/', Context.OptionsDisableWebCompat);
  fail('\\u{123}/', Context.OptionsDisableWebCompat);
  fail('\\u{1234}/', Context.OptionsDisableWebCompat);
  fail('\\u{12345}/', Context.OptionsDisableWebCompat);
  fail('\\u{103456}/', Context.OptionsDisableWebCompat);
  fail('\\u{0fail}/', Context.OptionsDisableWebCompat);
  fail('\\u{', Context.OptionsDisableWebCompat);
  fail('\\u{1234', Context.OptionsDisableWebCompat);
  fail('\\u{103456', Context.OptionsDisableWebCompat);
  fail('[a\\-b]/', Context.OptionsDisableWebCompat);
  fail('[\\-c]/', Context.OptionsDisableWebCompat);
  fail('[a\\-c]/', Context.OptionsDisableWebCompat);
  fail('[a\\-b]/', Context.OptionsDisableWebCompat);
  fail('[\\-c]/', Context.OptionsDisableWebCompat);
  fail('[a\\-c]/', Context.OptionsDisableWebCompat);
  fail('[\\-]/', Context.OptionsDisableWebCompat);
  fail('[b\\-a]/', Context.OptionsDisableWebCompat);
  fail('[\\1]/', Context.OptionsDisableWebCompat);
  fail('[\\2]/', Context.OptionsDisableWebCompat);
  fail('[\\5]/', Context.OptionsDisableWebCompat);
  fail('[\\7]/', Context.OptionsDisableWebCompat);
  fail('[\\00]/', Context.OptionsDisableWebCompat);
  fail('[\\01]/', Context.OptionsDisableWebCompat);
  fail('[\\04]/', Context.OptionsDisableWebCompat);
  fail('[\\07]/', Context.OptionsDisableWebCompat);
  fail('[\\09]/', Context.OptionsDisableWebCompat);
  fail('[\\12]/', Context.OptionsDisableWebCompat);
  fail('[\\23]/', Context.OptionsDisableWebCompat);
  fail('[\\34]/', Context.OptionsDisableWebCompat);
  fail('[\\56]/', Context.OptionsDisableWebCompat);
  fail('[\\k]/', Context.OptionsDisableWebCompat);
  fail('[\\h]/', Context.OptionsDisableWebCompat);
  fail('[\\m]/', Context.OptionsDisableWebCompat);
  fail('[\\q]/', Context.OptionsDisableWebCompat);
  fail('[\\u]/', Context.OptionsDisableWebCompat);
  fail('[\\y]/', Context.OptionsDisableWebCompat);
  fail('[\\a]/', Context.OptionsDisableWebCompat);
  fail('[\\e]/', Context.OptionsDisableWebCompat);
  fail('[\\g]/', Context.OptionsDisableWebCompat);
  fail('[\\z]/', Context.OptionsDisableWebCompat);
  fail('[\\y]/', Context.OptionsDisableWebCompat);
  fail('[\\A]/', Context.OptionsDisableWebCompat);
  fail('[\\N]/', Context.OptionsDisableWebCompat);
  fail('[\\V]/', Context.OptionsDisableWebCompat);
  fail('[\\Q]/', Context.OptionsDisableWebCompat);
  fail('[\\R]/', Context.OptionsDisableWebCompat);
  fail('[\\T]/', Context.OptionsDisableWebCompat);
  fail('[\\V]/', Context.OptionsDisableWebCompat);
  fail('[\\Y]/', Context.OptionsDisableWebCompat);
  fail('[\\Z]/', Context.OptionsDisableWebCompat);
  fail('[abc\\a]/', Context.OptionsDisableWebCompat);
  fail('[abc\\e]/', Context.OptionsDisableWebCompat);
  fail('[abc\\g]/', Context.OptionsDisableWebCompat);
  fail('[abc\\j]/', Context.OptionsDisableWebCompat);
  fail('[abc\\m]/', Context.OptionsDisableWebCompat);
  fail('[abc\\o]/', Context.OptionsDisableWebCompat);
  fail('[abc\\p]/', Context.OptionsDisableWebCompat);
  fail('[abc\\z]/', Context.OptionsDisableWebCompat);
  fail('[abc\\u]/', Context.OptionsDisableWebCompat);
  fail('[abc\\A]/', Context.OptionsDisableWebCompat);
  fail('[abc\\E]/', Context.OptionsDisableWebCompat);
  fail('[abc\\G]/', Context.OptionsDisableWebCompat);
  fail('[abc\\J]/', Context.OptionsDisableWebCompat);
  fail('[abc\\M]/', Context.OptionsDisableWebCompat);
  fail('[abc\\O]/', Context.OptionsDisableWebCompat);
  fail('[abc\\P]/', Context.OptionsDisableWebCompat);
  fail('[abc\\Z]/', Context.OptionsDisableWebCompat);
  fail('[abc\\U]/', Context.OptionsDisableWebCompat);
  fail('[\\aabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\eabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\iabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\mabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\pabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\qabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\zabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\Fabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\Labcd]/', Context.OptionsDisableWebCompat);
  fail('[\\Oabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\Tabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\Xabcd]/', Context.OptionsDisableWebCompat);
  fail('[\\Zabcd]/', Context.OptionsDisableWebCompat);
  fail('[abc\\mdeff]/', Context.OptionsDisableWebCompat);
  fail('[abc\\odeff]/', Context.OptionsDisableWebCompat);
  fail('[abc\\zdeff]/', Context.OptionsDisableWebCompat);
  fail('[abc\\gdeff]/', Context.OptionsDisableWebCompat);
  fail('[abc\\jdeff]/', Context.OptionsDisableWebCompat);
  fail('[abc\\Kdeff]/', Context.OptionsDisableWebCompat);
  fail('[abc\\Rdeff]/', Context.OptionsDisableWebCompat);
  fail('[abc\\Ydeff]/', Context.OptionsDisableWebCompat);
  fail('[abc\\Zdeff]/', Context.OptionsDisableWebCompat);
  fail('[\\_abcd]/', Context.OptionsDisableWebCompat);
  fail('[abc\\_]/', Context.OptionsDisableWebCompat);
  fail('[abc\\_abcd]/', Context.OptionsDisableWebCompat);

  fail('[\\^', Context.OptionsDisableWebCompat);
  fail('[\\+', Context.OptionsDisableWebCompat);
  fail('[\\?', Context.OptionsDisableWebCompat);
  fail('[\\)', Context.OptionsDisableWebCompat);
  fail('[\\|', Context.OptionsDisableWebCompat);
  fail('[\\|', Context.OptionsDisableWebCompat);
  fail('[\\cp', Context.Empty);
  fail('[\\cm', Context.Empty);
  fail('[\\ce', Context.Empty);
  fail('[\\cy', Context.Empty);
  fail('[\\cz', Context.Empty);
  fail('[\\cn', Context.Empty);
  fail('[\\m', Context.Empty);
  fail('[\\j', Context.Empty);
  fail('[\\a', Context.Empty);
  fail('[\\b', Context.Empty);
  fail('[\\s', Context.Empty);
  fail('[\\cp', Context.OptionsDisableWebCompat);
  fail('[\\cm', Context.OptionsDisableWebCompat);
  fail('[\\ce', Context.OptionsDisableWebCompat);
  fail('[\\cy', Context.OptionsDisableWebCompat);
  fail('[\\cz', Context.OptionsDisableWebCompat);
  fail('[\\cn', Context.OptionsDisableWebCompat);
  fail('[\\m', Context.OptionsDisableWebCompat);
  fail('[\\j', Context.OptionsDisableWebCompat);
  fail('[\\a', Context.OptionsDisableWebCompat);
  fail('[\\b', Context.OptionsDisableWebCompat);
  fail('[\\s', Context.OptionsDisableWebCompat);
  fail('[\\t', Context.OptionsDisableWebCompat);
  fail('[\\x', Context.OptionsDisableWebCompat);
  fail('[\\z', Context.OptionsDisableWebCompat);
  fail('[\\u', Context.OptionsDisableWebCompat);
  fail('[\\T', Context.OptionsDisableWebCompat);
  fail('[\\X', Context.OptionsDisableWebCompat);
  fail('[\\A', Context.OptionsDisableWebCompat);
  fail('[\\Y', Context.OptionsDisableWebCompat);
  fail('[abc\\m', Context.OptionsDisableWebCompat);
  fail('[abc\\i', Context.OptionsDisableWebCompat);
  fail('[abc\\a', Context.OptionsDisableWebCompat);
  fail('[abc\\w', Context.OptionsDisableWebCompat);
  fail('[abc\\z', Context.OptionsDisableWebCompat);
  fail('[abc\\A', Context.OptionsDisableWebCompat);
  fail('[abc\\U', Context.OptionsDisableWebCompat);
  fail('[abc\\X', Context.OptionsDisableWebCompat);
  fail('[abc\\O', Context.OptionsDisableWebCompat);
  fail('[\\mabcd', Context.OptionsDisableWebCompat);
  fail('[\\nabcd', Context.OptionsDisableWebCompat);
  fail('[\\zabcd', Context.OptionsDisableWebCompat);
  fail('[\\labcd', Context.OptionsDisableWebCompat);
  fail('[\\habcd', Context.OptionsDisableWebCompat);
  fail('[\\dabcd', Context.OptionsDisableWebCompat);
  fail('[\\Qabcd', Context.OptionsDisableWebCompat);
  fail('[\\Gabcd', Context.OptionsDisableWebCompat);
  fail('[\\Aabcd', Context.OptionsDisableWebCompat);
  fail('[\\Jabcd', Context.OptionsDisableWebCompat);
  fail('[abc\\edeff', Context.OptionsDisableWebCompat);
  fail('[\\dabcd', Context.OptionsDisableWebCompat);
  fail('[abc\\rdeff', Context.OptionsDisableWebCompat);
  fail('[abc\\tdeff', Context.OptionsDisableWebCompat);
  fail('[abc\\xdeff', Context.OptionsDisableWebCompat);
  fail('[abc\\zdeff', Context.OptionsDisableWebCompat);
  fail('[abc\\fdeff', Context.OptionsDisableWebCompat);
  fail('[abc\\adeff', Context.OptionsDisableWebCompat);
  fail('[abc\\Fdeff', Context.OptionsDisableWebCompat);
  fail('[abc\\Adeff', Context.OptionsDisableWebCompat);
  fail('[\\x]/', Context.OptionsDisableWebCompat);
  fail('[\\x0]/', Context.OptionsDisableWebCompat);
  fail('[\\x1]/', Context.OptionsDisableWebCompat);
  fail('[\\x5]/', Context.OptionsDisableWebCompat);
  fail('[\\x6]/', Context.OptionsDisableWebCompat);
  fail('[\\x8]/', Context.OptionsDisableWebCompat);
  fail('(?:b)', Context.OptionsDisableWebCompat);
  fail('a(?:b)', Context.OptionsDisableWebCompat);
  fail('a(?:b)c', Context.OptionsDisableWebCompat);
  fail('(?:b)c', Context.OptionsDisableWebCompat);
  fail('a(?=b)', Context.OptionsDisableWebCompat);
  fail('[\\u{0123}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{89abc}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{CDEF}]/', Context.OptionsDisableWebCompat);
  fail('[prefix \\u{012345}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{012345} postfix]/', Context.OptionsDisableWebCompat);
  fail('[\\u{012345}\\u{6789a}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{afail}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{0fail}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{xxxx}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{012]/', Context.OptionsDisableWebCompat);
  fail('[\\u{0fail}]/', Context.Empty);
  fail('[\\u{xxxx}]/', Context.Empty);
  fail('[\\u{012]/', Context.Empty);
  fail('[\\u{01234]/', Context.OptionsDisableWebCompat);
  fail('[\\u{1234}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{12}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{1}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{a]/', Context.OptionsDisableWebCompat);
  fail('[\\u{]/', Context.OptionsDisableWebCompat);
  fail('[\\u{a', Context.OptionsDisableWebCompat);
  fail('[\\u{123', Context.OptionsDisableWebCompat);
  fail('[\\u{12345', Context.OptionsDisableWebCompat);
  fail('[\\u{103456', Context.OptionsDisableWebCompat);
  fail('[\\u{10ffff}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{120000}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{900000}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{123456789}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{ffffffffffffffff}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{110000}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{10000000000000000}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{10000000000000000}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{fffffffffffffffffffff}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{0000000000000000000010ffff}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{00000000000000000000110000}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{00000000000000000000120000}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{0000000000123456789}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{000000ffffffffffffffff}]/', Context.OptionsDisableWebCompat);
  fail('[x\\d-z]/', Context.OptionsDisableWebCompat);
  fail('[x\\D-Z]/', Context.OptionsDisableWebCompat);
  fail('[x\\s-z]/', Context.OptionsDisableWebCompat);
  fail('[x\\S-S]/', Context.OptionsDisableWebCompat);
  fail('[x\\w-z]/', Context.OptionsDisableWebCompat);
  fail('[x\\W-Z]/', Context.OptionsDisableWebCompat);
  fail('[a-\\dx]/', Context.OptionsDisableWebCompat);
  fail('[A-\\Dx]/', Context.OptionsDisableWebCompat);
  fail('[a-\\sx]/', Context.OptionsDisableWebCompat);
  fail('[A-\\Sx]/', Context.OptionsDisableWebCompat);
  fail('[a-\\wx]/', Context.OptionsDisableWebCompat);
  fail('[A-\\Wx]/', Context.OptionsDisableWebCompat);
  fail('\\2(x)/', Context.OptionsDisableWebCompat);
  fail('[9-1]/', Context.OptionsDisableWebCompat);
  fail('[\\u6000-\\u5000]/', Context.OptionsDisableWebCompat);
  fail('[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\uDCA9-\\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\\uDCA9-\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\\uDCA9-\\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\\uD83D\uDCA9-\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\\uD83D\\uDCA9-\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\uDCA9-\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\uDCA9-\\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\\uD83D\uDCA9-\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\uDCA9-\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\\u{5}-1]/', Context.OptionsDisableWebCompat);
  fail('[\\x01-\\u{347}]/', Context.OptionsDisableWebCompat);
  fail('\\u{01}-\\x07/', Context.OptionsDisableWebCompat);
  fail('[1-\\u{500}]/', Context.OptionsDisableWebCompat);
  fail('[0--]/', Context.OptionsDisableWebCompat);
  fail('[x---]/', Context.OptionsDisableWebCompat);
  fail('[0---]/', Context.OptionsDisableWebCompat);
  fail('[--+]/', Context.OptionsDisableWebCompat);
  fail('[x-\\uD83D\\uDE07--x-\\uD83D\\uDE07--]/', Context.OptionsDisableWebCompat);
  fail('a(b)', Context.OptionsDisableWebCompat);
  fail('(b)c', Context.OptionsDisableWebCompat);
  fail('(', Context.OptionsDisableWebCompat);
  fail('(?x)/', Context.OptionsDisableWebCompat);
  fail('a(bcde/', Context.Empty);
  fail('a(b(?:cd)e/', Context.Empty);
  fail('a(b(?:cde/', Context.Empty);
  fail('a(b(?=cd)e/', Context.Empty);
  fail('a(bcde/', Context.OptionsDisableWebCompat);
  fail('a(b(?:cd)e/', Context.OptionsDisableWebCompat);
  fail('a(b(?:cde/', Context.OptionsDisableWebCompat);
  fail('a(b(?=cd)e/', Context.OptionsDisableWebCompat);
  fail('a(b(?=cde/', Context.OptionsDisableWebCompat);
  fail('(a(b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('a(b(?!cde/', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?:b(cde/', Context.OptionsDisableWebCompat);
  fail('/a(?:b(?:cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?:b(?:cde/', Context.OptionsDisableWebCompat);
  fail('/a(?:b(?=cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?:b(?=cde/', Context.OptionsDisableWebCompat);
  fail('/a(?:b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?:b(?!cde/', Context.OptionsDisableWebCompat);
  fail('/a(?=b(cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?=b(cde/', Context.OptionsDisableWebCompat);
  fail('/a(?=b(?:cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?=b(?:cde/', Context.OptionsDisableWebCompat);
  fail('/a(?=b(?=cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?=b(?=cde/', Context.OptionsDisableWebCompat);
  fail('/a(?=b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?=b(?!cde/', Context.OptionsDisableWebCompat);
  fail('/a(?!b(c)de/', Context.OptionsDisableWebCompat);
  fail('/a(?!b(cde/', Context.OptionsDisableWebCompat);
  fail('/a(?!b(?:cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?!b(?:cde/', Context.OptionsDisableWebCompat);
  fail('/a(?!b(?=cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?!b(?=cde/', Context.OptionsDisableWebCompat);
  fail('/a(?!b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('/a(?!b(?!cde/', Context.OptionsDisableWebCompat);
  fail('0{2,1}/', Context.OptionsDisableWebCompat);
  fail('^[z-a]$/', Context.OptionsDisableWebCompat);
  fail('/abc/a', Context.OptionsDisableWebCompat);
  fail('/a**/', Context.OptionsDisableWebCompat);
  fail('/a***/', Context.OptionsDisableWebCompat);
  fail('/a++/', Context.OptionsDisableWebCompat);
  fail('/a+++/', Context.OptionsDisableWebCompat);
  fail('/a???/', Context.OptionsDisableWebCompat);
  fail('/a????/', Context.OptionsDisableWebCompat);
  fail('/x{1}{1,}/', Context.OptionsDisableWebCompat);
  fail('/x{1,2}{1}/', Context.OptionsDisableWebCompat);
  fail('/x{1,}{1}/', Context.OptionsDisableWebCompat);
  fail('/x{0,1}{1,}/', Context.OptionsDisableWebCompat);
  fail('+a/', Context.OptionsDisableWebCompat);
  fail('++a/', Context.OptionsDisableWebCompat);
  fail('?a/', Context.OptionsDisableWebCompat);
  fail('??a/', Context.OptionsDisableWebCompat);
  fail('[b-ac-e]/', Context.OptionsDisableWebCompat);
  fail('[a-dc-b]/', Context.OptionsDisableWebCompat);
  fail('[\\db-G]/', Context.OptionsDisableWebCompat);
  fail('[\\Db-G]/', Context.OptionsDisableWebCompat);
  fail('[\\sb-G]/', Context.OptionsDisableWebCompat);
  fail('[\\Sb-G]/', Context.OptionsDisableWebCompat);
  fail('[\\wb-G]/', Context.OptionsDisableWebCompat);
  fail('[\\Wb-G]/', Context.OptionsDisableWebCompat);
  fail('[\\0b-G]/', Context.OptionsDisableWebCompat);
  fail('[\\10b-G]/', Context.OptionsDisableWebCompat);
  fail('[\\bd-G]/', Context.OptionsDisableWebCompat);
  fail('[\\Bd-G]/', Context.OptionsDisableWebCompat);
  fail('[\\td-G]/', Context.OptionsDisableWebCompat);
  fail('[\\nd-G]/', Context.OptionsDisableWebCompat);
  fail('[\\vd-G]/', Context.OptionsDisableWebCompat);
  fail('[\\fd-G]/', Context.OptionsDisableWebCompat);
  fail('[\\rd-G]/', Context.OptionsDisableWebCompat);
  fail('[\\c0001d-G]/', Context.OptionsDisableWebCompat);
  fail('[\\x0061d-G]/', Context.OptionsDisableWebCompat);
  fail('[\\u0061d-G]/', Context.OptionsDisableWebCompat);
  fail('[\\ad-G]/', Context.OptionsDisableWebCompat);
  fail('[c-eb-a]/', Context.Empty);
  fail('[b-G\\d]/', Context.Empty);
  fail('[b-G\\D]/', Context.Empty);
  fail('[b-G\\s]/', Context.Empty);
  fail('[b-G\\S]/', Context.Empty);
  fail('[b-G\\w]/', Context.Empty);
  fail('[b-G\\W]/', Context.Empty);
  fail('[b-G\\0]/', Context.Empty);
  fail('[b-G\\10]/', Context.Empty);
  fail('[d-G\\b]/', Context.Empty);
  fail('[c-eb-a]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\d]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\D]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\s]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\S]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\w]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\W]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\0]/', Context.OptionsDisableWebCompat);
  fail('[b-G\\10]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\b]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\B]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\t]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\n]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\v]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\f]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\r]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\c0001]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\x0061]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\u0061]/', Context.OptionsDisableWebCompat);
  fail('[d-G\\a]/', Context.OptionsDisableWebCompat);
  fail('\\\rn/', Context.OptionsDisableWebCompat);
  fail('\\b*/u', Context.OptionsDisableWebCompat);
  fail('\\b+/u', Context.OptionsDisableWebCompat);
  fail('\\b?/u', Context.OptionsDisableWebCompat);
  fail('\\b{1}/u', Context.OptionsDisableWebCompat);
  fail('\\b**/u', Context.OptionsDisableWebCompat);
  fail('\\b++/u', Context.OptionsDisableWebCompat);
  fail('\\b?+/u', Context.OptionsDisableWebCompat);
  fail('\\b{1}+/u', Context.OptionsDisableWebCompat);
  fail('(?=.)**/u', Context.OptionsDisableWebCompat);
  fail('(?=.)++/u', Context.OptionsDisableWebCompat);
  fail('(?=.)?+/u', Context.OptionsDisableWebCompat);
  fail('(?=.){1}+/u', Context.OptionsDisableWebCompat);
  fail('\\B*/u', Context.OptionsDisableWebCompat);
  fail('\\B+/u', Context.OptionsDisableWebCompat);
  fail('\\B?/u', Context.OptionsDisableWebCompat);
  fail('\\B{1}/u', Context.OptionsDisableWebCompat);
  fail('\\B**/u', Context.OptionsDisableWebCompat);
  fail('\\B++/u', Context.OptionsDisableWebCompat);
  fail('\\B?+/u', Context.OptionsDisableWebCompat);
  fail('\\B{1}+/u', Context.OptionsDisableWebCompat);
  fail('(?!.)**/u', Context.OptionsDisableWebCompat);
  fail('(?!.)++/u', Context.OptionsDisableWebCompat);
  fail('(?!.)?+/u', Context.OptionsDisableWebCompat);
  fail('(?!.){1}+/u', Context.OptionsDisableWebCompat);
  fail('(', Context.OptionsDisableWebCompat);
  fail('[--\\dz]+/', Context.OptionsDisableWebCompat);
  fail('[--\\d]+/', Context.OptionsDisableWebCompat);
  fail('[\\d-a]+/', Context.OptionsDisableWebCompat);
  fail('[\\d-az]+/', Context.OptionsDisableWebCompat);
  fail('[%-\\d]+/', Context.OptionsDisableWebCompat);
  fail('[%-\\dz]+/', Context.OptionsDisableWebCompat);
  fail('[\\s-\\dz]+/', Context.OptionsDisableWebCompat);
  fail('.(?=Z)?/', Context.OptionsDisableWebCompat);
  fail('.(?=Z)+/', Context.OptionsDisableWebCompat);
  fail('.(?=Z)?/', Context.OptionsDisableWebCompat);
  fail('.(?=Z){2}/', Context.OptionsDisableWebCompat);
  fail('.(?=Z){2,}/', Context.OptionsDisableWebCompat);
  fail('.(?=Z){2,3}/', Context.OptionsDisableWebCompat);
  fail('.(?=Z)??/', Context.OptionsDisableWebCompat);
  fail('.(?=Z){2}?/', Context.OptionsDisableWebCompat);
  fail('.(?=Z){2,}?/', Context.OptionsDisableWebCompat);
  fail('.(?=Z){2,3}?/', Context.OptionsDisableWebCompat);
  fail('.(?=Z){2,3}/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z)*?/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z)??/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z){2}?/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z){2,}?/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z){2,3}?/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z)*?/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z)*?/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z)*?/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z)*?/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z)*/', Context.OptionsDisableWebCompat);
  fail('[a-e](?!Z)+/', Context.OptionsDisableWebCompat);
  fail('[--\\d]+/', Context.OptionsDisableWebCompat);
  fail('[--\\dz]+/', Context.OptionsDisableWebCompat);
  fail('\\400/', Context.OptionsDisableWebCompat);
  fail('\\470/', Context.OptionsDisableWebCompat);
  fail('\\700/', Context.OptionsDisableWebCompat);
  fail('\\770/', Context.OptionsDisableWebCompat);
  fail('\\000/', Context.OptionsDisableWebCompat);
  fail('\\007/', Context.OptionsDisableWebCompat);
  fail('\\070/', Context.OptionsDisableWebCompat);
  fail('\\300/', Context.OptionsDisableWebCompat);
  fail('\\307/', Context.OptionsDisableWebCompat);
  fail('\\370/', Context.OptionsDisableWebCompat);
  fail('\\2029/', Context.OptionsDisableWebCompat);
  fail('\\2028/', Context.OptionsDisableWebCompat);
  fail('a\\/', Context.OptionsDisableWebCompat);
  fail('\\000D/', Context.OptionsDisableWebCompat);
  fail('\\u{1,}/u', Context.OptionsDisableWebCompat);
  fail('(?<\\u{0041}>.)/', Context.OptionsDisableWebCompat);
  fail('(?<\\u{03C0}>a)/', Context.Empty);
  fail('(?<:a>a)/u', Context.Empty);
  fail('./G', Context.Empty);
  fail('./gig', Context.Empty);
  fail('./\\u0067', Context.Empty);
  fail('(?<\\u{03C0}>a)/', Context.OptionsDisableWebCompat);
  fail('(?<aa)/', Context.OptionsDisableWebCompat);
  fail('(?<aa)/u', Context.OptionsDisableWebCompat);
  fail('(?<:a>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<a:>a)/', Context.OptionsDisableWebCompat);
  fail('./G', Context.OptionsDisableWebCompat);
  fail('./gig', Context.OptionsDisableWebCompat);
  fail('./\\u0067', Context.OptionsDisableWebCompat);
  fail('{2}/', Context.OptionsDisableWebCompat);
  fail('{2,}/', Context.OptionsDisableWebCompat);
  fail('.(?<!.)?/u', Context.OptionsDisableWebCompat);
  fail('.(?<!.)?/', Context.OptionsDisableWebCompat);
  fail('.(?=.){2,3}/u', Context.OptionsDisableWebCompat);
  fail('.(?<=.){2,3}/u', Context.OptionsDisableWebCompat);
  fail('.(?!.){2,3}/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k<ab>/u', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k<ab>/', Context.OptionsDisableWebCompat);
  fail('(?<a>a)\\k<ab>/u', Context.OptionsDisableWebCompat);
  fail('(?<a:>a)/u', Context.OptionsDisableWebCompat);
  fail('\\8/u', Context.OptionsDisableWebCompat);
  fail('.(?=.)?/u', Context.OptionsDisableWebCompat);
  fail('.(?<=.)?/u', Context.OptionsDisableWebCompat);
  fail('.(?<=.)?/', Context.OptionsDisableWebCompat);
  fail('.(?!.)?/u', Context.OptionsDisableWebCompat);
  fail('[\\s-\\d]/u', Context.OptionsDisableWebCompat);
  fail('[%-\\d]/u', Context.OptionsDisableWebCompat);
  fail('\\1/u', Context.OptionsDisableWebCompat);
  fail('[--\\d]/u', Context.Empty);
  fail('[\\d-a]/u', Context.Empty);
  fail('(/', Context.Empty);
  fail('(?/', Context.Empty);
  fail('(?=/', Context.Empty);
  fail('[--\\d]/u', Context.OptionsDisableWebCompat);
  fail('[\\d-a]/u', Context.OptionsDisableWebCompat);
  fail('a\\000A/', Context.OptionsDisableWebCompat);
  fail('(/', Context.OptionsDisableWebCompat);
  fail('(?/', Context.OptionsDisableWebCompat);
  fail('(?=/', Context.OptionsDisableWebCompat);
  fail('(?=foo/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('.(?<!.){2,3}/u', Context.OptionsDisableWebCompat);
  fail('\\u{1F_639}/u', Context.OptionsDisableWebCompat);
  fail('.(?!.){2,3}/u', Context.OptionsDisableWebCompat);
  fail('\\u{110000}/u', Context.OptionsDisableWebCompat);
  fail('8\\90/', Context.OptionsDisableWebCompat);
  fail('8\\90/', Context.OptionsDisableWebCompat);
  fail('O\\PQ/', Context.OptionsDisableWebCompat);
  fail('}/', Context.OptionsDisableWebCompat);
  fail('}/', Context.OptionsDisableWebCompat);
  fail('}/', Context.OptionsDisableWebCompat);
  fail('{/', Context.OptionsDisableWebCompat);
  fail('x{o}x/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('[\\c0]/', Context.OptionsDisableWebCompat);
  fail('[\\c00]+/', Context.OptionsDisableWebCompat);
  fail('\\c1/', Context.OptionsDisableWebCompat);
  fail('[\\c1]/', Context.OptionsDisableWebCompat);
  fail('[\\c80]+/', Context.OptionsDisableWebCompat);
  fail('\\c9/.', Context.OptionsDisableWebCompat);
  fail('[\\c90]+/', Context.OptionsDisableWebCompat);
  fail('[\\c_]/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('\\c0/', Context.OptionsDisableWebCompat);
  fail('(/', Context.Empty);
  fail('(?/', Context.Empty);
  fail('(?=/', Context.Empty);
  fail('(?=foo/', Context.Empty);
  fail('(?!/', Context.Empty);
  fail('(?!foo/', Context.Empty);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('(a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{2,1}?/', Context.OptionsDisableWebCompat);
  fail('(*)/', Context.Empty);
  fail('+/', Context.Empty);
  fail('?/', Context.Empty);
  fail(')/', Context.Empty);
  fail('[/', Context.Empty);
  fail('^*/', Context.Empty);
  fail('$*/', Context.Empty);
  fail('${1,2}/', Context.OptionsDisableWebCompat);
  fail('${2,1}/', Context.OptionsDisableWebCompat);
  fail('\\2(a)(/', Context.Empty);
  fail('(?a/', Context.Empty);
  fail('(?a)/', Context.Empty);
  fail('(?:a/', Context.Empty);
  fail('(:a/', Context.Empty);
  fail('{2,}/', Context.OptionsDisableWebCompat);
  fail('{2,}/', Context.OptionsDisableWebCompat);
  fail('(?<\\Uabcd/)/', Context.OptionsDisableWebCompat);
  fail('{2}/', Context.OptionsDisableWebCompat);
  fail('a|({)/u', Context.OptionsDisableWebCompat);
  fail('a|({)/u', Context.OptionsDisableWebCompat);
  fail('{/u', Context.OptionsDisableWebCompat);
  fail('{2,3}/', Context.OptionsDisableWebCompat);
  fail('\\u{89abc}/', Context.OptionsDisableWebCompat);
  fail('\\u{defAB}/', Context.OptionsDisableWebCompat);
  fail('\\u{4567}/', Context.OptionsDisableWebCompat);
  fail('\\u{CDEF}/', Context.OptionsDisableWebCompat);
  fail('\\u{CDEF}/', Context.OptionsDisableWebCompat);
  fail('\\u{0123}/', Context.OptionsDisableWebCompat);
  fail('prefix \\u{012345}/', Context.OptionsDisableWebCompat);
  fail('\\u{1234}/', Context.OptionsDisableWebCompat);
  fail('\\u{10ffff}/', Context.OptionsDisableWebCompat);
  fail('\\u{4567}/', Context.OptionsDisableWebCompat);
  fail('\\u{0000000000000000000010ffff}/', Context.OptionsDisableWebCompat);
  fail('\\u{0123}/', Context.OptionsDisableWebCompat);
  fail('\\u{89abc}/', Context.OptionsDisableWebCompat);
  fail('\\u{defAB}/', Context.OptionsDisableWebCompat);
  fail('[\\u{1}]/', Context.OptionsDisableWebCompat);
  fail('[a\\-b]/', Context.OptionsDisableWebCompat);
  fail('\u{012345}\\u{6789a}/', Context.OptionsDisableWebCompat);
  fail('\\u{1}/', Context.OptionsDisableWebCompat);
  fail('\\u{12}/', Context.OptionsDisableWebCompat);
  fail('\\u{123}/', Context.OptionsDisableWebCompat);
  fail('\\u{123}/', Context.OptionsDisableWebCompat);
  fail('\\u{12}/', Context.OptionsDisableWebCompat);
  fail('\\u{1}/', Context.OptionsDisableWebCompat);
  fail('[a\\-b]/', Context.OptionsDisableWebCompat);
  fail('[a\\-b]/', Context.OptionsDisableWebCompat);
  fail('[b\\-a]/', Context.OptionsDisableWebCompat);
  fail('\\u{1234}/', Context.OptionsDisableWebCompat);
  fail('\\u{12345}/', Context.OptionsDisableWebCompat);
  fail('\\u{1234}/', Context.Empty);
  fail('\\u{12345}/', Context.Empty);
  fail('\\u{103456}/', Context.OptionsDisableWebCompat);
  fail('\\u{103456}/', Context.OptionsDisableWebCompat);
  fail('\\u{12345}/', Context.OptionsDisableWebCompat);
  fail('[a\\-c]/', Context.OptionsDisableWebCompat);
  fail('[a\\-b]/', Context.OptionsDisableWebCompat);
  fail('[a\\-b]/', Context.OptionsDisableWebCompat);
  fail('[a\\-c]/', Context.OptionsDisableWebCompat);
  fail('[\\-c]/', Context.OptionsDisableWebCompat);
  fail('[\\-]/', Context.OptionsDisableWebCompat);
  fail('[\\-]/', Context.OptionsDisableWebCompat);
  fail('[\\-c]/', Context.OptionsDisableWebCompat);
  fail('[prefix \\u{012345}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{012345} postfix]/', Context.OptionsDisableWebCompat);
  fail('[b\\-a]/u', Context.Empty);
  fail('[b\\-a]/u', Context.Empty);
  fail('[\\u{89abc}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{0123}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{CDEF}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{12}]/', Context.OptionsDisableWebCompat);
  fail('\\u{012345} postfix/', Context.OptionsDisableWebCompat);
  fail('[\\u{012345}\\u{6789a}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{1234}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{0000000000000000000010ffff}]/', Context.OptionsDisableWebCompat);
  fail('[\\u{10ffff}]/', Context.OptionsDisableWebCompat);
  fail('\\u{01}-\\x07/', Context.OptionsDisableWebCompat);
  fail('[1-\\u{500}]/', Context.OptionsDisableWebCompat);
  fail('[\\u6000-\\u5000]/', Context.OptionsDisableWebCompat);
  fail('[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/', Context.Empty);
  fail('[\uD83D\uDCA9-\\uD83D\\uDCAB]/', Context.Empty);
  fail('[\uD83D\\uDCA9-\uD83D\\uDCAB]/', Context.Empty);
  fail('[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\uDCA9-\\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\\uDCA9-\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\\uDCA9-\\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\\uD83D\uDCA9-\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\\uD83D\\uDCA9-\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\uDCA9-\uD83D\\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\uDCA9-\\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\\uD83D\uDCA9-\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\uD83D\uDCA9-\uD83D\uDCAB]/', Context.OptionsDisableWebCompat);
  fail('[\\x01-\\u{347}]/', Context.OptionsDisableWebCompat);
  fail('a{01,1}/', Context.OptionsDisableWebCompat);
  fail('a{0x15,02}/u', Context.OptionsDisableWebCompat);
  fail('a{0x01,1}/u', Context.OptionsDisableWebCompat);
  fail('a{0b01,04}/u', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/u', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/u', Context.OptionsDisableWebCompat);
  fail('a{00,00}/', Context.OptionsDisableWebCompat);
  fail('a{00,00}/', Context.OptionsDisableWebCompat);
  fail('a{01,1}/', Context.OptionsDisableWebCompat);
  fail('a{03,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/', Context.OptionsDisableWebCompat);
  fail('a{03,04}/', Context.OptionsDisableWebCompat);
  fail('0{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{1 }/', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{1,1 }/', Context.OptionsDisableWebCompat);
  fail('a{1,0}/', Context.OptionsDisableWebCompat);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{1,02}/', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{45,4}/', Context.OptionsDisableWebCompat);
  fail('a{1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{1 ,1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1 }/', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1 }/', Context.OptionsDisableWebCompat);
  fail('a{90,9}/', Context.OptionsDisableWebCompat);
  fail('a{89,8}/', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/', Context.OptionsDisableWebCompat);
  fail('x{o}x/', Context.OptionsDisableWebCompat);
  fail('a{0x01,1}/', Context.OptionsDisableWebCompat);
  fail('a{0x15,02}/', Context.OptionsDisableWebCompat);
  fail('a{0b01,04}/', Context.OptionsDisableWebCompat);
  fail('a{1, 1}/u', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/u', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1}/u', Context.OptionsDisableWebCompat);
  fail('a{1,1 }/u', Context.OptionsDisableWebCompat);
  fail('a{1, 1 }/u', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1 }/u', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1 }/u', Context.OptionsDisableWebCompat);
  fail('a{11,0}/', Context.OptionsDisableWebCompat);
  fail('a{00,00}/u', Context.OptionsDisableWebCompat);
  fail('a{ 1}/u', Context.OptionsDisableWebCompat);
  fail('a{1,1 }/u', Context.OptionsDisableWebCompat);
  fail('a{ 1}/u', Context.OptionsDisableWebCompat);
  fail('a{1 }/u', Context.OptionsDisableWebCompat);
  fail('a{100,45}/u', Context.OptionsDisableWebCompat);
  fail('a{03,04}/u', Context.OptionsDisableWebCompat);
  fail('0{2,1}/u', Context.OptionsDisableWebCompat);
  fail('(?<\\u{0041}>.)/', Context.OptionsDisableWebCompat);
  fail('(?<\\u{03C0}>a)/', Context.OptionsDisableWebCompat);
  fail('a|)/', Context.OptionsDisableWebCompat);
  fail('(', Context.OptionsDisableWebCompat);
  fail(')', Context.OptionsDisableWebCompat);
  fail(')/', Context.OptionsDisableWebCompat);
  fail('(?<aa)/', Context.OptionsDisableWebCompat);
  fail('(?<aa)/u', Context.OptionsDisableWebCompat);
  fail('(?<:a>a)/u', Context.OptionsDisableWebCompat);
  fail('(?<a:>a)/', Context.OptionsDisableWebCompat);
  fail('a|)/', Context.Empty);
  fail(']/u', Context.Empty);
  fail('(?<a:>a)/u', Context.OptionsDisableWebCompat);
  fail('a|)/', Context.OptionsDisableWebCompat);
  fail(']/u', Context.OptionsDisableWebCompat);
  fail('a|]/', Context.OptionsDisableWebCompat);
  fail('a|(])/', Context.OptionsDisableWebCompat);
  fail('a|(])/u', Context.OptionsDisableWebCompat);
  fail('\\oabcd]/u', Context.OptionsDisableWebCompat);
  fail('abc\\A]/u', Context.OptionsDisableWebCompat);
  fail('[abc\\a]/u', Context.OptionsDisableWebCompat);
  fail('abc\\mdeff]/u', Context.OptionsDisableWebCompat);
  fail('abc\\?]/u', Context.OptionsDisableWebCompat);
  fail(']/', Context.OptionsDisableWebCompat);
  fail('a(bcde/u', Context.OptionsDisableWebCompat);
  fail('a(b(cde/u', Context.OptionsDisableWebCompat);
  fail('a(b(?:cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(b(?:cde/u', Context.OptionsDisableWebCompat);
  fail('a(b(?=cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(b(?=cde/u', Context.OptionsDisableWebCompat);
  fail('a(b(?!cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(b(?!cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?:cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?:cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?=cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?=cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?!cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(?!cde/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(cde/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?:cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?:cde/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?=cd)e/u', Context.Empty);
  fail('a(?=b(?=cde/u', Context.Empty);
  fail('a(?=b(?!cd)e/u', Context.Empty);
  fail('a(?=b(?!cde/u', Context.Empty);
  fail('a(?!b(c)de/u', Context.Empty);
  fail('a(?!b(cde/u', Context.Empty);
  fail('a(?=b(?=cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?=cde/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?!cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?=b(?!cde/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(c)de/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(cde/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?:cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?:cde/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?=cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?=cde/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?!cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?!b(?!cde/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/u', Context.OptionsDisableWebCompat);
  fail('(a(b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('(a(b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('a(b(?!cde/', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/', Context.OptionsDisableWebCompat);
  fail('a(bcde/', Context.OptionsDisableWebCompat);
  fail('a(b(?:cd)e/', Context.OptionsDisableWebCompat);
  fail('a(b(?:cde/', Context.OptionsDisableWebCompat);
  fail('a(b(?=cd)e/', Context.OptionsDisableWebCompat);
  fail('a(b(?=cde/', Context.OptionsDisableWebCompat);
  fail('(a(b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('a(b(?!cde/', Context.OptionsDisableWebCompat);
  fail('a(?:b(cd)e/', Context.OptionsDisableWebCompat);
  fail('(?!.)?+/u', Context.OptionsDisableWebCompat);
  fail('(?!.)++/u', Context.OptionsDisableWebCompat);
  fail('(?!.)?+/u', Context.OptionsDisableWebCompat);
  fail('\\B{1}+/u', Context.OptionsDisableWebCompat);
  fail('\\b{1}+/u', Context.OptionsDisableWebCompat);
  fail('\\b**/u', Context.OptionsDisableWebCompat);
  fail('\\b++/u', Context.OptionsDisableWebCompat);
  fail('\\b?+/u', Context.OptionsDisableWebCompat);
  fail('\\b{1}/u', Context.OptionsDisableWebCompat);
  fail('\\b{1}+/u', Context.OptionsDisableWebCompat);
  fail('(?=.)**/u', Context.OptionsDisableWebCompat);
  fail('(?=.)++/u', Context.OptionsDisableWebCompat);
  fail('(?=.)?+/u', Context.OptionsDisableWebCompat);
  fail('(?=.){1}+/u', Context.OptionsDisableWebCompat);
  fail('\\B*/u', Context.OptionsDisableWebCompat);
  fail('\\B+/u', Context.OptionsDisableWebCompat);
  fail('\\B?/u', Context.OptionsDisableWebCompat);
  fail('\\B{1}/u', Context.OptionsDisableWebCompat);
  fail('\\B**/u', Context.OptionsDisableWebCompat);
  fail('\\B++/u', Context.OptionsDisableWebCompat);
  fail('\\B?+/u', Context.OptionsDisableWebCompat);
  fail('\\B{1}+/u', Context.OptionsDisableWebCompat);
  fail('\\b?/u', Context.OptionsDisableWebCompat);
  fail('\\B*/u', Context.OptionsDisableWebCompat);
  fail('\\B+/u', Context.OptionsDisableWebCompat);
  fail('\\B?/u', Context.OptionsDisableWebCompat);
  fail('\\B{1}/u', Context.OptionsDisableWebCompat);
  fail('\\B**/u', Context.OptionsDisableWebCompat);
  fail('\\B++/u', Context.OptionsDisableWebCompat);
  fail('\\B?+/u', Context.OptionsDisableWebCompat);
  fail('\\b*/u', Context.OptionsDisableWebCompat);
  fail('\\b+/u', Context.OptionsDisableWebCompat);
  fail('\\b?/u', Context.OptionsDisableWebCompat);
  fail('?a/', Context.OptionsDisableWebCompat);
  fail('?a/u', Context.OptionsDisableWebCompat);
  fail('|?/', Context.OptionsDisableWebCompat);
  fail('|+/', Context.OptionsDisableWebCompat);
  fail('|*/', Context.OptionsDisableWebCompat);
  fail('a??', Context.OptionsDisableWebCompat);
  fail('a++/', Context.OptionsDisableWebCompat);
  fail('a?+/', Context.OptionsDisableWebCompat);
  fail('a**/', Context.OptionsDisableWebCompat);
  fail('++a/', Context.OptionsDisableWebCompat);
  fail('?a/', Context.OptionsDisableWebCompat);
  fail('??a/', Context.OptionsDisableWebCompat);
  fail('+/', Context.OptionsDisableWebCompat);
  fail('+a/', Context.OptionsDisableWebCompat);
  fail('(?!.)**/u', Context.OptionsDisableWebCompat);
  fail('(?!.){1}+/u', Context.OptionsDisableWebCompat);
  fail('a|?/', Context.OptionsDisableWebCompat);
  fail('a|+/', Context.OptionsDisableWebCompat);
  fail('a|*/', Context.OptionsDisableWebCompat);
  fail('a(*)/', Context.OptionsDisableWebCompat);
  fail('a(*)/', Context.OptionsDisableWebCompat);
  fail('a(*)/', Context.Empty);
  fail('a(+)/', Context.Empty);
  fail('a(?)/', Context.Empty);
  fail('a(+)/', Context.Empty);
  fail('a(?)/', Context.Empty);
  fail('a|?/', Context.Empty);
  fail('a|+/', Context.Empty);
  fail('a|*/', Context.Empty);
  fail('?/', Context.Empty);
  fail('a++', Context.Empty);
  fail('+?', Context.Empty);
  fail('+a', Context.Empty);
  fail('(?!.)**/u', Context.Empty);
  fail('(?!.)++/u', Context.Empty);
  fail('(?=.)?+/u', Context.Empty);
  fail('(?=.){1}+/u', Context.Empty);
  fail('(?=.)**/u', Context.Empty);
  fail('(?=.)++/u', Context.Empty);
  fail('a(+)/', Context.OptionsDisableWebCompat);
  fail('a(?)/', Context.OptionsDisableWebCompat);
  fail('a|({)/', Context.OptionsDisableWebCompat);
  fail('a|(})/', Context.OptionsDisableWebCompat);
  fail('a(+)/', Context.OptionsDisableWebCompat);
  fail('a(?)/', Context.OptionsDisableWebCompat);
  fail('a|?/', Context.OptionsDisableWebCompat);
  fail('a|+/', Context.OptionsDisableWebCompat);
  fail('a|*/', Context.OptionsDisableWebCompat);
  fail('?/', Context.OptionsDisableWebCompat);
  fail('a++', Context.OptionsDisableWebCompat);
  fail('+?', Context.OptionsDisableWebCompat);
  fail('+a', Context.OptionsDisableWebCompat);
  fail('(?!.)**/u', Context.OptionsDisableWebCompat);
  fail('(?!.)++/u', Context.OptionsDisableWebCompat);
  fail('(?=.)?+/u', Context.OptionsDisableWebCompat);
  fail('(?=.){1}+/u', Context.OptionsDisableWebCompat);
  fail('(?=.)**/u', Context.OptionsDisableWebCompat);
  fail('(?=.)++/u', Context.OptionsDisableWebCompat);
  fail('(?!.){1}+/u', Context.OptionsDisableWebCompat);
  fail('\\b{1}/u', Context.OptionsDisableWebCompat);
  fail('\\b**/u', Context.OptionsDisableWebCompat);
  fail('\\b++/u', Context.OptionsDisableWebCompat);
  fail('\\b?+/u', Context.OptionsDisableWebCompat);
  fail('++a/u', Context.OptionsDisableWebCompat);
  fail('??a/u', Context.OptionsDisableWebCompat);
  fail('+a/u', Context.OptionsDisableWebCompat);
  fail('+a/u', Context.OptionsDisableWebCompat);
  fail('\\b*/u', Context.OptionsDisableWebCompat);
  fail('\\b+/u', Context.OptionsDisableWebCompat);
  fail('a???/u', Context.OptionsDisableWebCompat);
  fail('a????/u', Context.OptionsDisableWebCompat);
  fail('a++/u', Context.OptionsDisableWebCompat);
  fail('a+++/u', Context.OptionsDisableWebCompat);
  fail('a(+)/u', Context.OptionsDisableWebCompat);
  fail('a**/u', Context.OptionsDisableWebCompat);
  fail('a(*)/u', Context.OptionsDisableWebCompat);
  fail('|?/u', Context.Empty);
  fail('|+/u', Context.Empty);
  fail('??/u', Context.Empty);
  fail('+?/u', Context.Empty);
  fail('|*/u', Context.Empty);
  fail('+a/', Context.Empty);
  fail('a***/u', Context.Empty);
  fail('a(?:b(cde/', Context.Empty);
  fail('a(?:b(?:cd)e/', Context.Empty);
  fail('a(?:b(?:cde/', Context.Empty);
  fail('|?/u', Context.OptionsDisableWebCompat);
  fail('|+/u', Context.OptionsDisableWebCompat);
  fail('??/u', Context.OptionsDisableWebCompat);
  fail('+?/u', Context.OptionsDisableWebCompat);
  fail('|*/u', Context.OptionsDisableWebCompat);
  fail('+a/', Context.OptionsDisableWebCompat);
  fail('a***/u', Context.OptionsDisableWebCompat);
  fail('a(?:b(cde/', Context.OptionsDisableWebCompat);
  fail('a(?:b(?:cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?:b(?:cde/', Context.OptionsDisableWebCompat);
  fail('a(?:b(?=cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?:b(?=cde/', Context.OptionsDisableWebCompat);
  fail('a(?:b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?:b(?!cde/', Context.OptionsDisableWebCompat);
  fail('a(?=b(cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?=b(cde/', Context.OptionsDisableWebCompat);
  fail('a(?=b(?:cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?=b(?:cde/', Context.OptionsDisableWebCompat);
  fail('a(?=b(?=cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?=b(?=cde/', Context.OptionsDisableWebCompat);
  fail('a(?=b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?=b(?!cde/', Context.OptionsDisableWebCompat);
  fail('a(?!b(c)de/', Context.OptionsDisableWebCompat);
  fail('a(?!b(cde/', Context.OptionsDisableWebCompat);
  fail('a(?!b(?:cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?!b(?:cde/', Context.OptionsDisableWebCompat);
  fail('a(?!b(?=cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?!b(?=cde/', Context.OptionsDisableWebCompat);
  fail('a(?!b(?!cd)e/', Context.OptionsDisableWebCompat);
  fail('a(?!b(?!cde/', Context.OptionsDisableWebCompat);
  fail('[\\u{1}-\\u{2}]/', Context.OptionsDisableWebCompat);
  fail('[\\uD834\\uDF06-\\uD834\\uDF08a-z]/', Context.OptionsDisableWebCompat);
  fail('[🌷-🌸]/', Context.Empty);
  fail('*/', Context.Empty);
  fail('*', Context.Empty);
  fail('[🌷-🌸]/', Context.OptionsDisableWebCompat);
  fail('*/', Context.OptionsDisableWebCompat);
  fail('*', Context.OptionsDisableWebCompat);
  fail('(?<a)/', Context.OptionsDisableWebCompat);
  fail('(?<a)/u', Context.OptionsDisableWebCompat);
  fail('(?<=a)?/', Context.OptionsDisableWebCompat);
  fail('(?<=a)?/u', Context.OptionsDisableWebCompat);
  fail('(?<=a)+/', Context.OptionsDisableWebCompat);
  fail('(?<=a)+/u', Context.OptionsDisableWebCompat);
  fail('(?<=a)*/', Context.OptionsDisableWebCompat);
  fail('(?<=a)*/u', Context.OptionsDisableWebCompat);
  fail('(?<=a){1}/', Context.OptionsDisableWebCompat);
  fail('(?<=a){1}/u', Context.OptionsDisableWebCompat);
  fail('a.', Context.OptionsDisableWebCompat);
  fail('abc$', Context.OptionsDisableWebCompat);
  fail('^', Context.OptionsDisableWebCompat);
  fail('a+', Context.OptionsDisableWebCompat);
  fail('a?', Context.OptionsDisableWebCompat);
  fail('a*', Context.OptionsDisableWebCompat);
  fail('a?*', Context.OptionsDisableWebCompat);
  fail('a+?', Context.OptionsDisableWebCompat);
  fail('a*?', Context.OptionsDisableWebCompat);
  fail('?a/', Context.OptionsDisableWebCompat);
  fail('+a/', Context.OptionsDisableWebCompat);
  fail('??/', Context.OptionsDisableWebCompat);
  fail('+?/', Context.OptionsDisableWebCompat);
  fail('|*/', Context.OptionsDisableWebCompat);
  fail('|?/', Context.OptionsDisableWebCompat);
  fail('|+/', Context.OptionsDisableWebCompat);
  fail('?a/', Context.OptionsDisableWebCompat);
  fail('+/', Context.OptionsDisableWebCompat);
  fail('?/', Context.OptionsDisableWebCompat);
  fail('+a', Context.OptionsDisableWebCompat);
  fail('??', Context.OptionsDisableWebCompat);
  fail('+?', Context.OptionsDisableWebCompat);
  fail('|?', Context.OptionsDisableWebCompat);
  fail('|+', Context.OptionsDisableWebCompat);
  fail('?', Context.OptionsDisableWebCompat);
  fail('a**/', Context.OptionsDisableWebCompat);
  fail('a?+/', Context.OptionsDisableWebCompat);
  fail('a++/', Context.OptionsDisableWebCompat);
  fail('a++', Context.OptionsDisableWebCompat);
  fail('a?*', Context.OptionsDisableWebCompat);
  fail('a**', Context.OptionsDisableWebCompat);
  fail('a??', Context.OptionsDisableWebCompat);
  fail('?', Context.Empty);
  fail('a**/', Context.Empty);
  fail('a?+/', Context.Empty);
  fail('a++/', Context.Empty);
  fail('a++', Context.Empty);
  fail('a?*', Context.Empty);
  fail('a**', Context.Empty);
  fail('a??', Context.Empty);
  fail('a{90,9}/', Context.OptionsDisableWebCompat);
  fail('a{89,8}/', Context.OptionsDisableWebCompat);
  fail('a{78,7}/', Context.OptionsDisableWebCompat);
  fail('a{56,5}/', Context.OptionsDisableWebCompat);
  fail('a{23,2}/', Context.OptionsDisableWebCompat);
  fail('a{12,1}/', Context.OptionsDisableWebCompat);
  fail('a{11,0}/', Context.OptionsDisableWebCompat);
  fail('a{90,9}/', Context.OptionsDisableWebCompat);
  fail('a{89,8}/', Context.OptionsDisableWebCompat);
  fail('a{67,6}/', Context.OptionsDisableWebCompat);
  fail('a{34,3}/', Context.OptionsDisableWebCompat);
  fail('a{11,0}/', Context.OptionsDisableWebCompat);
  fail('a{ 1}/', Context.OptionsDisableWebCompat);
  fail('a{1 }/', Context.OptionsDisableWebCompat);
  fail('a{1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{1 ,1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1}/', Context.OptionsDisableWebCompat);
  fail('a{1,1 }/', Context.OptionsDisableWebCompat);
  fail('a{1, 1 }/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1 }/', Context.OptionsDisableWebCompat);
  fail('a{ 1 , 1 }/', Context.OptionsDisableWebCompat);
  fail('a{2,1}/', Context.OptionsDisableWebCompat);
  fail('a{100,45}/', Context.OptionsDisableWebCompat);
  fail('a{1,0}/', Context.OptionsDisableWebCompat);
  fail('a{03,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,00}/', Context.OptionsDisableWebCompat);
  fail('a{01,1}/', Context.OptionsDisableWebCompat);
  fail('a{0x01,1}/', Context.OptionsDisableWebCompat);
  fail('a{0x15,02}/', Context.OptionsDisableWebCompat);
  fail('a{0b01,04}/', Context.OptionsDisableWebCompat);
  fail('a{00,0o01}/', Context.OptionsDisableWebCompat);
  fail('foo/ii', Context.OptionsDisableWebCompat);
  fail('foo/mm', Context.OptionsDisableWebCompat);
  fail('foo/gmmi', Context.OptionsDisableWebCompat);
  fail('foo/ggymi', Context.OptionsDisableWebCompat);
  fail('foo/myiy', Context.OptionsDisableWebCompat);
  fail('foo/igyi', Context.OptionsDisableWebCompat);
  fail('\\a/', Context.Empty);
  fail('\\e/', Context.Empty);
  fail('\\g/', Context.Empty);
  fail('\\A/', Context.Empty);
  fail('\\K/', Context.Empty);
  fail('\\R/', Context.Empty);
  fail('\\O/', Context.Empty);
  fail('\\P/', Context.OptionsDisableWebCompat);
  fail('abc\\z/', Context.Empty);
  fail('abc\\m/', Context.Empty);
  fail('abc\\k/', Context.OptionsDisableWebCompat);
  fail('abc\\o/', Context.Empty);
  fail('abc\\p/', Context.OptionsDisableWebCompat);
  fail('abc\\u/', Context.OptionsDisableWebCompat);
  fail('abc\\x/', Context.OptionsDisableWebCompat);
  fail('abc\\y/', Context.Empty);
  fail('abc\\T/', Context.Empty);
  fail('abc\\P/', Context.OptionsDisableWebCompat);
  fail('abc\\M/', Context.Empty);
  fail('abc\\O/', Context.Empty);
  fail('abc\\Z/', Context.Empty);
  fail('\\aabcd/', Context.Empty);
  fail('\\gabcd/', Context.Empty);
  fail('\\jabcd/', Context.Empty);
  fail('\\pabcd/', Context.OptionsDisableWebCompat);
  fail('\\Nabcd/', Context.Empty);
  fail('\\Oabcd/', Context.Empty);
  fail('\\Tabcd/', Context.Empty);
  fail('\\Zabcd/', Context.Empty);
  fail('abc\\adeff/', Context.Empty);
  fail('abc\\zdeff/', Context.Empty);
  fail('abc\\ydeff/', Context.Empty);
  fail('abc\\mdeff/', Context.Empty);
  fail('abc\\ideff/', Context.Empty);
  fail('abc\\Jdeff/', Context.Empty);
  fail('abc\\Ndeff/', Context.Empty);
  fail('abc\\Qdeff/', Context.Empty);
  fail('abc\\Tdeff/', Context.Empty);
  fail('\\_/', Context.Empty);
  fail('abc\\_/', Context.Empty);
  fail('\\_abcd/', Context.Empty);
  fail('abc\\_abcd/', Context.Empty);
  fail('\\$', Context.Empty);
  fail('\\\\', Context.Empty);
  fail('\\.', Context.Empty);
  fail('\\?', Context.OptionsDisableWebCompat);
  fail('\\(', Context.OptionsDisableWebCompat);
  fail('\\}', Context.OptionsDisableWebCompat);
  fail(']/', Context.OptionsDisableWebCompat);
  fail('{/', Context.OptionsDisableWebCompat);
  fail('}/', Context.OptionsDisableWebCompat);
  fail(')/', Context.OptionsDisableWebCompat);
  fail('?/', Context.OptionsDisableWebCompat);
  fail('+/', Context.OptionsDisableWebCompat);
  fail('a|]/', Context.OptionsDisableWebCompat);
  fail('a|)/', Context.OptionsDisableWebCompat);
  fail('a|?/', Context.OptionsDisableWebCompat);
  fail('a|+/', Context.OptionsDisableWebCompat);
  fail('a|*/', Context.OptionsDisableWebCompat);
  fail('\\/', Context.OptionsDisableWebCompat);
  fail('a|\\/', Context.OptionsDisableWebCompat);
  fail('\\cv', Context.OptionsDisableWebCompat);
  fail('\\cx', Context.OptionsDisableWebCompat);
  fail('\\cm', Context.OptionsDisableWebCompat);
  fail('\\cj', Context.OptionsDisableWebCompat);
  fail('\\ci', Context.OptionsDisableWebCompat);
  fail('\\cs', Context.OptionsDisableWebCompat);
  fail('\\cz', Context.OptionsDisableWebCompat);
  fail('\\cT', Context.OptionsDisableWebCompat);
  fail('\\cV', Context.OptionsDisableWebCompat);
  fail('\\cX', Context.OptionsDisableWebCompat);
  fail('\\u', Context.OptionsDisableWebCompat);
  fail('\\r', Context.OptionsDisableWebCompat);
  fail('\\n', Context.OptionsDisableWebCompat);
  fail('\\N', Context.OptionsDisableWebCompat);
  fail('\\J', Context.OptionsDisableWebCompat);
  fail('abc\\q', Context.OptionsDisableWebCompat);
  fail('abc\\u', Context.OptionsDisableWebCompat);
  fail('abc\\V', Context.OptionsDisableWebCompat);
  fail('abc\\Y', Context.OptionsDisableWebCompat);
  fail('\\wabcd', Context.OptionsDisableWebCompat);
  fail('\\mabcd', Context.OptionsDisableWebCompat);
  fail('\\jabcd', Context.OptionsDisableWebCompat);
  fail('\\Habcd', Context.OptionsDisableWebCompat);
  fail('\\Rabcd', Context.OptionsDisableWebCompat);
  fail('abc\\sdeff', Context.OptionsDisableWebCompat);
  fail('abc\\mdeff', Context.OptionsDisableWebCompat);
  fail('abc\\hdeff', Context.OptionsDisableWebCompat);
  fail('abc\\ldeff', Context.OptionsDisableWebCompat);
  fail('abc\\Xdeff', Context.OptionsDisableWebCompat);
  fail('abc\\Sdeff', Context.OptionsDisableWebCompat);
  fail('abc\\Fdeff', Context.OptionsDisableWebCompat);
  fail('abc\\Kdeff', Context.OptionsDisableWebCompat);
  fail('\\x/', Context.OptionsDisableWebCompat);
  fail('\\x0/', Context.OptionsDisableWebCompat);
  fail('\\x1/', Context.OptionsDisableWebCompat);
  fail('\\x2/', Context.OptionsDisableWebCompat);
  fail('\\x3/', Context.OptionsDisableWebCompat);
  fail('\\x4/', Context.OptionsDisableWebCompat);
  fail('\\x5/', Context.OptionsDisableWebCompat);
  fail('\\x6/', Context.OptionsDisableWebCompat);
  fail('\\x7/', Context.OptionsDisableWebCompat);
  fail('\\x8/', Context.OptionsDisableWebCompat);
  fail('\\x9/', Context.OptionsDisableWebCompat);
  fail('\\x0/', Context.OptionsDisableWebCompat);
  fail('\\x0', Context.OptionsDisableWebCompat);
  fail('\\x2', Context.OptionsDisableWebCompat);
  fail('\\x/', Context.OptionsDisableWebCompat);
  fail('\\x0/', Context.OptionsDisableWebCompat);
  fail('\\x1/', Context.OptionsDisableWebCompat);
  fail('\\x2/', Context.OptionsDisableWebCompat);
  fail('\\x3/', Context.OptionsDisableWebCompat);
  fail('\\x4/', Context.OptionsDisableWebCompat);
  fail('\\x5/', Context.OptionsDisableWebCompat);
  fail('\\x6/', Context.OptionsDisableWebCompat);
  fail('\\x7/', Context.OptionsDisableWebCompat);
  fail('\\x8/', Context.OptionsDisableWebCompat);
  fail('\\x9/', Context.OptionsDisableWebCompat);
  fail('\\x0/', Context.OptionsDisableWebCompat);
  fail('\\x0', Context.OptionsDisableWebCompat);
  fail('\\x2', Context.OptionsDisableWebCompat);
  fail('a\\02/', Context.OptionsDisableWebCompat);
  fail('\\03b/', Context.OptionsDisableWebCompat);
  fail('(a)\\05/', Context.OptionsDisableWebCompat);
  fail('\\06(b)/', Context.OptionsDisableWebCompat);
  fail('\\00/', Context.OptionsDisableWebCompat);
  fail('(a)\\1', Context.OptionsDisableWebCompat);
  fail('(\\1)', Context.OptionsDisableWebCompat);
  fail('0\\1(a)', Context.OptionsDisableWebCompat);
  fail('0\\1(a)', Context.Empty);
  fail('(a)\\3/', Context.OptionsDisableWebCompat);
  fail('\\5x(a)/', Context.OptionsDisableWebCompat);
  fail('(a)x\\6/', Context.OptionsDisableWebCompat);
  fail('(a\\7b)/', Context.OptionsDisableWebCompat);
  fail('0\\8(a)/', Context.OptionsDisableWebCompat);
  fail('4\\9(a)/', Context.OptionsDisableWebCompat);
  fail('(a)|\\10/', Context.OptionsDisableWebCompat);
  fail('\\11|(a)/', Context.OptionsDisableWebCompat);
  fail('(a|\\13)/', Context.OptionsDisableWebCompat);
  fail('(\\12|a)/', Context.OptionsDisableWebCompat);
  fail('a\\1/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('a{ 1, 1}/', Context.OptionsDisableWebCompat);
  fail('\\p{ASCII=Invalid}/u', Context.OptionsDisableWebCompat);
  fail('\\P{ASCII=F}/u', Context.OptionsDisableWebCompat);
  fail('\\P{ASCII=N}/u', Context.OptionsDisableWebCompat);
  fail('\\P{ASCII=No}/u', Context.OptionsDisableWebCompat);
  fail('\\p{ASCII=Yes}/u', Context.OptionsDisableWebCompat);
  fail('\\p{ASCII=Y}/u', Context.OptionsDisableWebCompat);
  fail('\\p{ASCII=Yes}/u', Context.OptionsDisableWebCompat);
  fail('[\\p{}]/u', Context.OptionsDisableWebCompat);
  fail('[\\p{invalid}]/u', Context.OptionsDisableWebCompat);
  fail('[\\p{]/u', Context.OptionsDisableWebCompat);
  fail('[\\p{]}/u', Context.OptionsDisableWebCompat);
  fail('\\p{ASCII=Y}/u', Context.OptionsDisableWebCompat);
  fail('[\\p}]/u', Context.OptionsDisableWebCompat);
  fail('\\p{Line_Break}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Line_Break}/u', Context.OptionsDisableWebCompat);
  fail('\\p{Line_Break=Alphabetic}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Line_Break=Alphabetic}/u', Context.OptionsDisableWebCompat);
  fail('\\p{FC_NFKC_Closure}/u', Context.OptionsDisableWebCompat);
  fail('\\P{FC_NFKC_Closure}/u', Context.OptionsDisableWebCompat);
  fail('\\p{Block=Adlam}/u', Context.OptionsDisableWebCompat);
  fail('\\P{UnknownBinaryProperty}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Other_Grapheme_Extend}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Other_ID_Continue}/u', Context.OptionsDisableWebCompat);
  fail('\\p{Other_Lowercase}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Other_Lowercase}/u', Context.OptionsDisableWebCompat);
  fail('\\p{General_Category=WAT}/u', Context.OptionsDisableWebCompat);
  fail('\\P{UnknownBinaryProperty}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Script}/u', Context.OptionsDisableWebCompat);
  fail('\\p{Script_Extensions}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Script_Extensions}/u', Context.OptionsDisableWebCompat);
  fail('\\p{Script_Extensions=}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Script_Extensions=}/u', Context.OptionsDisableWebCompat);
  fail('\\p{General_Category}/u', Context.OptionsDisableWebCompat);
  fail('\\P{_-_lOwEr_C-A_S-E_-_}/u', Context.OptionsDisableWebCompat);
  fail('\\p{lowercase}/u', Context.OptionsDisableWebCompat);
  fail('\\p{ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\p{/u', Context.OptionsDisableWebCompat);
  fail('\\P{/u', Context.OptionsDisableWebCompat);
  fail('\\P/u', Context.OptionsDisableWebCompat);
  fail('\\P{IsScript=Adlam}/u', Context.OptionsDisableWebCompat);
  fail('\\pL/u', Context.OptionsDisableWebCompat);
  fail('\\p{^General_Category=Letter}/u', Context.OptionsDisableWebCompat);
  fail('\\P{General_Category:Letter}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);
  fail('\\P{Ascii}/u', Context.OptionsDisableWebCompat);

  const tokdens: Array<[Context, string, Token]> = [
    [Context.OptionsDisableWebCompat, 'a|b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a|/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '|/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a||/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^abc/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a.c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a?/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a+b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a??/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{0}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{1}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{2}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{3}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{4}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{5}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{6}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{7}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{78}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{45}/u', Token.RegularExpression],
    [Context.Empty, 'a{23}/u', Token.RegularExpression],
    [Context.Empty, 'a{12}/u', Token.RegularExpression],
    [Context.Empty, 'a{0,}/u', Token.RegularExpression],
    [Context.Empty, 'a{2,2}/u', Token.RegularExpression],
    [Context.Empty, 'a{3,3}/u', Token.RegularExpression],
    [Context.Empty, 'a{,49}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{23}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{12}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{0,}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{2,2}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{3,3}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,49}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,50}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{5,50}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,3}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{23,}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{90,}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{9,}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{8}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{9}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{3,38}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{2,27}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{0,15}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,16}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{5,5}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,83}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,38}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,8}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,5}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{4,}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{67}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'foo/ug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'foo/uy', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,83}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\d/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\D/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\f/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\n/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\S/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\w/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\W/u', Token.RegularExpression],
    [Context.Empty, 'a{90,}/u', Token.RegularExpression],
    [Context.Empty, 'a{9,}/u', Token.RegularExpression],
    [Context.Empty, 'a{8}/u', Token.RegularExpression],
    [Context.Empty, 'a{9}/u', Token.RegularExpression],
    [Context.Empty, 'a{3,38}/u', Token.RegularExpression],
    [Context.Empty, 'a{2,27}/u', Token.RegularExpression],
    [Context.Empty, 'a{0,15}/u', Token.RegularExpression],
    [Context.Empty, 'a{,16}/u', Token.RegularExpression],
    [Context.Empty, 'a{5,5}/u', Token.RegularExpression],
    [Context.Empty, 'a{,83}/u', Token.RegularExpression],
    [Context.Empty, 'a{,38}/u', Token.RegularExpression],
    [Context.Empty, 'a{,8}/u', Token.RegularExpression],
    [Context.Empty, 'a{,5}/u', Token.RegularExpression],
    [Context.Empty, 'a{4,}/u', Token.RegularExpression],
    [Context.Empty, 'a{67}/u', Token.RegularExpression],
    [Context.Empty, 'foo/ug', Token.RegularExpression],
    [Context.Empty, 'foo/uy', Token.RegularExpression],
    [Context.Empty, 'a{,83}/u', Token.RegularExpression],
    [Context.Empty, 'abc\\d/u', Token.RegularExpression],
    [Context.Empty, 'abc\\D/u', Token.RegularExpression],
    [Context.Empty, 'abc\\f/u', Token.RegularExpression],
    [Context.Empty, 'abc\\n/u', Token.RegularExpression],
    [Context.Empty, 'abc\\S/u', Token.RegularExpression],
    [Context.Empty, 'abc\\w/u', Token.RegularExpression],
    [Context.Empty, 'abc\\W/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\fabcd/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\dabcd/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\Dabcd/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\nabcd/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\Sabcd/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\vabcd/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\Wabcd/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\fdeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\ddeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\Ddeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\ndeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\rdeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\sdeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\Sdeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\tdeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\vdeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\wdeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc\\Wdeff/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\^/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\$/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\\\/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\./u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\*/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\+/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\?/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\(/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\)/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\[/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\{/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\}/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `abc\\|/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\^def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\$def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\\\def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\.def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\*def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\+def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\?def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\(def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\)def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\[def/u`, Token.RegularExpression],
    [Context.Empty, `abc\\*/u`, Token.RegularExpression],
    [Context.Empty, `abc\\+/u`, Token.RegularExpression],
    [Context.Empty, `abc\\?/u`, Token.RegularExpression],
    [Context.Empty, `abc\\(/u`, Token.RegularExpression],
    [Context.Empty, `abc\\)/u`, Token.RegularExpression],
    [Context.Empty, `abc\\[/u`, Token.RegularExpression],
    [Context.Empty, `abc\\]/u`, Token.RegularExpression],
    [Context.Empty, `abc\\{/u`, Token.RegularExpression],
    [Context.Empty, `abc\\}/u`, Token.RegularExpression],
    [Context.Empty, `abc\\|/u`, Token.RegularExpression],
    [Context.Empty, `\\^def/u`, Token.RegularExpression],
    [Context.Empty, `\\$def/u`, Token.RegularExpression],
    [Context.Empty, `\\\\def/u`, Token.RegularExpression],
    [Context.Empty, `\\.def/u`, Token.RegularExpression],
    [Context.Empty, `\\*def/u`, Token.RegularExpression],
    [Context.Empty, `\\+def/u`, Token.RegularExpression],
    [Context.Empty, `\\?def/u`, Token.RegularExpression],
    [Context.Empty, `\\(def/u`, Token.RegularExpression],
    [Context.Empty, `\\)def/u`, Token.RegularExpression],
    [Context.Empty, `\\[def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\]def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\{def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\}def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `\\|def/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,8}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a{,5}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, './u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '|/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ca/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cb/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cd/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ce/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cf/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'cg/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ch/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ci/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cj/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ck/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cl/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cm/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cn/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\co/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cp/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cq/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cr/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cs/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ct/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cu/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cv/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cw/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cx/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cy/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cz/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cA/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cB/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cD/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cE/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cF/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cG/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cH/u', Token.RegularExpression],
    [Context.Empty, '\\cm/u', Token.RegularExpression],
    [Context.Empty, '\\cn/u', Token.RegularExpression],
    [Context.Empty, '\\co/u', Token.RegularExpression],
    [Context.Empty, '\\cp/u', Token.RegularExpression],
    [Context.Empty, '\\cq/u', Token.RegularExpression],
    [Context.Empty, '\\cr/u', Token.RegularExpression],
    [Context.Empty, '\\cs/u', Token.RegularExpression],
    [Context.Empty, '\\ct/u', Token.RegularExpression],
    [Context.Empty, '\\cu/u', Token.RegularExpression],
    [Context.Empty, '\\cv/u', Token.RegularExpression],
    [Context.Empty, '\\cw/u', Token.RegularExpression],
    [Context.Empty, '\\cx/u', Token.RegularExpression],
    [Context.Empty, '\\cy/u', Token.RegularExpression],
    [Context.Empty, '\\cz/u', Token.RegularExpression],
    [Context.Empty, '\\cA/u', Token.RegularExpression],
    [Context.Empty, '\\cB/u', Token.RegularExpression],
    [Context.Empty, '\\cD/u', Token.RegularExpression],
    [Context.Empty, '\\cE/u', Token.RegularExpression],
    [Context.Empty, '\\cF/u', Token.RegularExpression],
    [Context.Empty, '\\cG/u', Token.RegularExpression],
    [Context.Empty, '\\cH/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cI/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cJ/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cK/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cL/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cM/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cN/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cO/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cP/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cQ/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cR/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cS/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cT/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cU/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cV/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cW/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cX/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cY/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\cZ/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\x34/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\x45/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\x78/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\x90/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\x4e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\xc3/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\xb2/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a\\0/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\0b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a)\\0/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\0(b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(\\0)/u', Token.RegularExpression],
    [Context.Empty, '[\\u{0000000000000000000010ffff}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u{0000000000000000000010ffff}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a)\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(\\1)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\1x(a)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a)x\\1/u', Token.RegularExpression],
    [Context.Empty, '(a\\1b)/u', Token.RegularExpression],
    [Context.Empty, '0\\1(a)/u', Token.RegularExpression],
    [Context.Empty, '\\1|(a)/u', Token.RegularExpression],
    [Context.Empty, '(a|\\1)/u', Token.RegularExpression],
    [Context.Empty, '\\0/u', Token.RegularExpression],
    [Context.Empty, '(a)\\0/u', Token.RegularExpression],
    [Context.Empty, '(a)\\1/u', Token.RegularExpression],
    [Context.Empty, '((a))\\1/u', Token.RegularExpression],
    [Context.Empty, '((a))\\2/u', Token.RegularExpression],
    [Context.Empty, '(((a)))\\2/u', Token.RegularExpression],
    [Context.Empty, '(((a)))\\3/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a\\1b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '0\\1(a)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\1|(a)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a|\\1)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\0/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a)\\0/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a)\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((a))\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((a))\\2/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((a)))\\2/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((a)))\\3/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((a))))\\3/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((a))))\\4/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((a)))))\\4/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((a)))))\\5/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((a))))))\\5/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((a))))))\\6/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((a)))))))\\6/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((a)))))))\\7/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((a))))))))\\7/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((a))))))))\\8/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((a)))))))))\\8/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((a)))))))))\\9/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((a))))))))))\\9/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((a))))))))))\\10/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((a)))))))))))\\10/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((a)))))))))))\\11/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((a))))))))))))\\11/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((a))))))))))))\\12/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((a)))))))))))))\\12/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((a)))))))))))))\\13/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((((a))))))))))))))\\13/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((((a))))))))))))))\\14/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((((a)))))))))))))))\\14/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((((a)))))))))))))))\\15/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((((((a))))))))))))))))\\15/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((((((a))))))))))))))))\\16/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((((((a)))))))))))))))))\\16/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((((((a)))))))))))))))))\\17/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((((((((a))))))))))))))))))\\17/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((((((((a))))))))))))))))))\\18/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((((((((a)))))))))))))))))))\\18/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((((((((a)))))))))))))))))))\\19/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((((((((((a))))))))))))))))))))\\19/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((((((((((((((((((((a))))))))))))))))))))\\20/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(((((((((((((((((((((a)))))))))))))))))))))\\20/u', Token.RegularExpression],
    [Context.Empty, 'foo/', Token.RegularExpression],
    [Context.Empty, 'foo|bar/', Token.RegularExpression],
    [Context.Empty, '||||/', Token.RegularExpression],
    [Context.Empty, '^|$|\\b|\\B/', Token.RegularExpression],
    [Context.Empty, '^|$|\\b|\\B/u', Token.RegularExpression],
    [Context.Empty, '(?=)/', Token.RegularExpression],
    [Context.Empty, '(?=foo)/', Token.RegularExpression],
    [Context.Empty, '(?!)/', Token.RegularExpression],
    [Context.Empty, '(?!)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'foo/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'foo|bar/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '||||/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^|$|\\b|\\B/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^|$|\\b|\\B/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=foo)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!)/u', Token.RegularExpression],
    //[Context.OptionsDisableWebCompat, '(?=a)*/', Token.RegularExpression],

    //    [Context.OptionsDisableWebCompat, '(?=a){}/', Token.RegularExpression],
    // [Context.OptionsDisableWebCompat, '(?=a){a}/', Token.RegularExpression],
    // [Context.OptionsDisableWebCompat, '(?=a){1}/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a*/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a*/u', Token.RegularExpression],
    [Context.Empty, 'a{}/', Token.RegularExpression],
    [Context.Empty, 'a{1}/', Token.RegularExpression],
    [Context.Empty, 'a{1/', Token.RegularExpression],
    [Context.Empty, 'a{1,/', Token.RegularExpression],
    [Context.Empty, 'a{1,2/', Token.RegularExpression],
    [Context.Empty, 'a{2,1/', Token.RegularExpression],
    [Context.Empty, 'a??/', Token.RegularExpression],
    [Context.Empty, 'a*?/u', Token.RegularExpression],
    [Context.Empty, 'a*?/', Token.RegularExpression],
    [Context.Empty, 'a??/u', Token.RegularExpression],
    [Context.Empty, 'a{}?/', Token.RegularExpression],
    //[Context.Empty, 'a{a}?/', Token.RegularExpression],
    [Context.Empty, 'a{1}?/', Token.RegularExpression],
    [Context.Empty, 'a*?/u', Token.RegularExpression],
    [Context.Empty, 'a*?/', Token.RegularExpression],
    [Context.Empty, '👍🚀❇️/u', Token.RegularExpression],
    [Context.Empty, '👍🚀❇️/', Token.RegularExpression],
    [Context.Empty, 'a{2,1?/', Token.RegularExpression],
    [Context.Empty, 'a{1,2}?/u', Token.RegularExpression],
    [Context.Empty, 'a{1,2}?/', Token.RegularExpression],
    [Context.Empty, 'a{1,?/', Token.RegularExpression],
    [Context.Empty, '^/u', Token.RegularExpression],
    [Context.Empty, '$/', Token.RegularExpression],
    [Context.Empty, '$/u', Token.RegularExpression],
    [Context.Empty, ']/', Token.RegularExpression],
    [Context.Empty, '}/', Token.RegularExpression],
    [Context.Empty, '${1,2/', Token.RegularExpression],
    [Context.Empty, '\\1/', Token.RegularExpression],
    [Context.Empty, '(a)\\1/', Token.RegularExpression],
    [Context.Empty, '^(a)\\1/u', Token.RegularExpression],
    [Context.Empty, '\\1(a)/', Token.RegularExpression],
    [Context.Empty, '(?:a)\\1/', Token.RegularExpression],
    [Context.Empty, '(a)\\2/', Token.RegularExpression],
    [Context.Empty, '(?:a)\\2/', Token.RegularExpression],
    [Context.Empty, '(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\10/', Token.RegularExpression],
    [Context.Empty, '(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\10/u', Token.RegularExpression],
    [Context.Empty, '(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/', Token.RegularExpression],
    [Context.Empty, '(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)\\11/u', Token.RegularExpression],
    [Context.Empty, '(?:a)/', Token.RegularExpression],
    [Context.Empty, '(?:a)/u', Token.RegularExpression],
    [Context.Empty, '\\d/', Token.RegularExpression],
    [Context.Empty, '\\s/u', Token.RegularExpression],
    [Context.Empty, '\\S/', Token.RegularExpression],
    [Context.Empty, '\\w//', Token.RegularExpression],
    [Context.Empty, '\\W/u', Token.RegularExpression],

    [Context.Empty, '\\f/', Token.RegularExpression],
    [Context.Empty, '\\n/u', Token.RegularExpression],
    [Context.Empty, '\\v/', Token.RegularExpression],
    [Context.Empty, '\\c/', Token.RegularExpression],
    [Context.Empty, '\\0/', Token.RegularExpression],
    [Context.Empty, '\\u/', Token.RegularExpression],
    [Context.Empty, '\\W/u', Token.RegularExpression],
    [Context.Empty, '\\u123/', Token.RegularExpression],
    [Context.Empty, '\\u1234/u', Token.RegularExpression],
    [Context.Empty, '\\u12345/u', Token.RegularExpression],
    // [Context.Empty, '\\u{z/', Token.RegularExpression],
    // [Context.Empty, '\\u{a}/', Token.RegularExpression],
    // [Context.Empty, '\\u{20}/', Token.RegularExpression],
    [Context.Empty, '\\u{20}/u', Token.RegularExpression],

    // [Context.Empty, '\\u{110000}/', Token.RegularExpression],
    [Context.Empty, '\\u{00000001}/u', Token.RegularExpression],
    [Context.Empty, '\\400/', Token.RegularExpression],
    [Context.Empty, '\\^/', Token.RegularExpression],
    [Context.Empty, '\\./', Token.RegularExpression],
    [Context.Empty, '\\+/', Token.RegularExpression],

    [Context.Empty, '\\?/', Token.RegularExpression],
    [Context.Empty, '\\(/', Token.RegularExpression],
    [Context.Empty, '\\)/', Token.RegularExpression],
    [Context.Empty, '\\[/', Token.RegularExpression],
    [Context.Empty, '\\[/u', Token.RegularExpression],
    [Context.Empty, '\\{/', Token.RegularExpression],
    [Context.Empty, '\\//', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\a/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[]/', Token.RegularExpression],
    [Context.Empty, '[a-b]/', Token.RegularExpression],
    [Context.Empty, '[a-b]/u', Token.RegularExpression],
    [Context.Empty, '[-a]/', Token.RegularExpression],
    [Context.Empty, '[-a-b-]/u', Token.RegularExpression],
    [Context.Empty, '[---]/', Token.RegularExpression],
    //[Context.OptionsDisableWebCompat, '[a-b--/]/', Token.RegularExpression],
    [Context.Empty, '[\\b-\\n]/u', Token.RegularExpression],
    [Context.Empty, '[\\d]/', Token.RegularExpression],
    [Context.Empty, '[\\D]/', Token.RegularExpression],

    [Context.Empty, '[\\s]/u', Token.RegularExpression],
    [Context.Empty, '[\\S]/', Token.RegularExpression],
    [Context.Empty, '[\\w]/', Token.RegularExpression],
    [Context.Empty, '[\\D]/', Token.RegularExpression],
    [Context.Empty, '[\\W]/', Token.RegularExpression],
    [Context.Empty, '[\\n]/u', Token.RegularExpression],
    [Context.Empty, '[\\r]/', Token.RegularExpression],
    [Context.Empty, '[\\v]/u', Token.RegularExpression],
    [Context.Empty, '[\\c]/', Token.RegularExpression],
    //    [Context.OptionsDisableWebCompat,'[\\xz]/', Token.RegularExpression],
    [Context.Empty, '[\\x12]/u', Token.RegularExpression],
    [Context.Empty, '[\\x123]/u', Token.RegularExpression],
    //[Context.Empty, '[\\u12]/', Token.RegularExpression],
    [Context.Empty, '[\\u1234]/', Token.RegularExpression],
    [Context.Empty, '[\\u12345]/', Token.RegularExpression],
    [Context.Empty, '[\\u{a}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u{20}]/u', Token.RegularExpression],
    //[Context.Empty, '[\\u{110000}]/', Token.RegularExpression],
    [Context.Empty, '[\\u{00000001}]/u', Token.RegularExpression],
    [Context.Empty, '[\\400]/', Token.RegularExpression],
    [Context.Empty, '[\\^]/', Token.RegularExpression],
    [Context.Empty, '[\\$]/', Token.RegularExpression],
    [Context.Empty, '[\\.]/u', Token.RegularExpression],
    [Context.Empty, '[\\(]/', Token.RegularExpression],
    [Context.Empty, '[\\(]/u', Token.RegularExpression],
    [Context.Empty, '[\\[]/', Token.RegularExpression],
    [Context.Empty, '[\\]]/', Token.RegularExpression],
    [Context.Empty, '[\\{]/u', Token.RegularExpression],
    [Context.Empty, '[\\|]/', Token.RegularExpression],
    [Context.Empty, '[\\|]/u', Token.RegularExpression],
    [Context.Empty, '[\\s]/u', Token.RegularExpression],
    [Context.Empty, '[\\d-\\uFFFF]/', Token.RegularExpression],
    [Context.Empty, '[\\D-\\uFFFF]/', Token.RegularExpression],
    [Context.Empty, '[\\s-\\uFFFF]/', Token.RegularExpression],
    [Context.Empty, '[\\S-\\uFFFF]/', Token.RegularExpression],
    [Context.Empty, '[\\w-\\uFFFF]/', Token.RegularExpression],
    [Context.Empty, '[\\u0000-\\d]/', Token.RegularExpression],
    [Context.Empty, '[\\u0000-\\D]/', Token.RegularExpression],
    [Context.Empty, '[\\u0000-\\S]/', Token.RegularExpression],
    [Context.Empty, '[\\u0000-\\W]/', Token.RegularExpression],
    [Context.Empty, '[\\c_]/', Token.RegularExpression],
    [Context.Empty, '[\\]]/', Token.RegularExpression],
    [Context.Empty, '[\\{]/u', Token.RegularExpression],
    [Context.Empty, '[\\|]/', Token.RegularExpression],
    [Context.Empty, '[\\|]/u', Token.RegularExpression],
    [Context.Empty, '[🌷-🌸]/u', Token.RegularExpression],
    [Context.Empty, '[\\u0000-🌸-\\u0000]/u', Token.RegularExpression],
    [Context.Empty, '[\\u0000-\\ud83c\\udf38-\\u0000]/u', Token.RegularExpression],
    [Context.Empty, '^[0-9]*$/', Token.RegularExpression],
    [Context.Empty, '^[0-9]*$/', Token.RegularExpression],
    [Context.Empty, '^[0-9]+$/', Token.RegularExpression],
    [Context.Empty, '^[0-9]+$/u', Token.RegularExpression],
    [Context.Empty, '^[a-zA-Z]*$/', Token.RegularExpression],
    [Context.Empty, '^[a-zA-Z]+$/', Token.RegularExpression],
    [Context.Empty, '^[0-9a-zA-Z]*$/', Token.RegularExpression],
    [Context.Empty, '^[0-9a-zA-Z]*$/u', Token.RegularExpression],
    [Context.Empty, '^[a-zA-Z0-9!-/:-@\\[-`{-~]*$/', Token.RegularExpression],
    [Context.Empty, '^[a-zA-Z0-9!-/:-@\\[-`{-~]*$/u', Token.RegularExpression],
    [Context.Empty, '^([a-zA-Z0-9]{8,})$/u', Token.RegularExpression],
    [Context.Empty, '^([a-zA-Z0-9]{6,8})$/u', Token.RegularExpression],
    [Context.Empty, '^([0-9]{0,8})$/u', Token.RegularExpression],
    [Context.Empty, '^^[0-9]{8}$/u', Token.RegularExpression],
    [Context.Empty, '^^https?:\\/\\//', Token.RegularExpression],
    [Context.Empty, '^https?:\\/\\//u', Token.RegularExpression],
    [Context.Empty, '^\\d{3}-\\d{4}$/', Token.RegularExpression],
    [Context.Empty, '^([1-9][0-9]*|0)(\\.[0-9]+)?$/', Token.RegularExpression],
    [Context.Empty, '^([1-9][0-9]*|0)(\\.[0-9]+)?$/u', Token.RegularExpression],
    [Context.Empty, '^-?([1-9][0-9]*|0)(\\.[0-9]+)?$/u', Token.RegularExpression],
    [Context.Empty, '^[ぁ-んー]*$/u', Token.RegularExpression],
    [Context.Empty, '^[ァ-ンヴー]*$/u', Token.RegularExpression],
    [Context.Empty, '^[^\\x20-\\x7e]*$/', Token.RegularExpression],
    [Context.Empty, '^[^\\x20-\\x7e]*$/u', Token.RegularExpression],
    [Context.Empty, "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$/", Token.RegularExpression],
    [
      Context.Empty,
      '^((4\\d{3})|(5[1-5]\\d{2})|(6011))([- ])?\\d{4}([- ])?\\d{4}([- ])?\\d{4}|3[4,7]\\d{13}$/',
      Token.RegularExpression
    ],
    [Context.Empty, '^\\s*|\\s*$/', Token.RegularExpression],
    [
      Context.Empty,
      '^((4\\d{3})|(5[1-5]\\d{2})|(6011))([- ])?\\d{4}([- ])?\\d{4}([- ])?\\d{4}|3[4,7]\\d{13}$/u',
      Token.RegularExpression
    ],
    [Context.Empty, '^\\s*|\\s*$/u', Token.RegularExpression],
    [Context.Empty, '([a ]\\b)*\\b/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<=(?<a>\\w){3})f/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((?<=\\w{3}))f/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>(?<=\\w{3}))f/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<!(?<a>\\d){3})f/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<!(?<a>\\D){3})f|f/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>(?<!\\D{3}))f|f/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<=(?<a>\\w){3})f/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((?<=\\w{3}))f/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>(?<=\\w{3}))f/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>(?<!\\D{3}))f|f/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>(?<!\\D{3}))f|f/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<!a)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<!a)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<=a)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\1(?<a>a)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\1(?<a>a)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\k<a>(?<a>a)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>a)(?<b>a)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>a)(?<b>a)/', Token.RegularExpression],
    [Context.Empty, '(?<a>a)\\2/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>a)\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>a)\\1/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>a)\\k<a>/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?<a>a)(?<b>a)/', Token.RegularExpression],
    [Context.Empty, '\\k<a>/', Token.RegularExpression],
    [Context.Empty, '\\k/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:a)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a)/', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\p{Script=Hiragana}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\p{ASCII}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\p{General_Category=Letter}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\p{Script=Hiragana}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\p{General_Category}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\p{Emoji}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\p{General_Category=Letter}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\p{Script=Hiragana}\\-\\p{Script=Katakana}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '<body.*>((.*\\n?)*?)<\\/body>/ui', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '([Jj]ava([Ss]cript)?)\\sis\\s(fun\\w*)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\udebcy/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\udd00\\udd00y/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\udebcy/uy', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\u0567\\u0567\\udc10/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\u0567\\udc10\\udc10/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u1234\\udc00\\udc00/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u1234\\udc00/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\u0567\\udc10/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ud800\\udc00/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\udc10\\udc10/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\udabc\\udebcy/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\udebcy/uy', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ud800\\udc00\\udc00/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\ud810\\udc10\\udc10/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\ud900\\udd00\\udd00y/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x\\udabc\\udebc\\udebcy/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u{0000000000000000000010ffff}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u{12}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u{123}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u{1234}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u{12345}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u{103456}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[]b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[]b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^]b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[d]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[k]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[n]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[r]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[E]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[C]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[F]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[I]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[K]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[Kq]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[$%]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[rD]/u', Token.RegularExpression],
    [Context.Empty, '[]b/u', Token.RegularExpression],
    [Context.Empty, 'a[]/u', Token.RegularExpression],
    [Context.Empty, '[^]/u', Token.RegularExpression],
    [Context.Empty, '[^]b/u', Token.RegularExpression],
    [Context.Empty, '[a]/u', Token.RegularExpression],
    [Context.Empty, '[b]/u', Token.RegularExpression],
    [Context.Empty, '[d]/u', Token.RegularExpression],
    [Context.Empty, '[k]/u', Token.RegularExpression],
    [Context.Empty, '[n]/u', Token.RegularExpression],
    [Context.Empty, '[r]/u', Token.RegularExpression],
    [Context.Empty, '[y]/u', Token.RegularExpression],
    [Context.Empty, '[z]/u', Token.RegularExpression],
    [Context.Empty, '[E]/u', Token.RegularExpression],
    [Context.Empty, '[C]/u', Token.RegularExpression],
    [Context.Empty, '[F]/u', Token.RegularExpression],
    [Context.Empty, '[I]/u', Token.RegularExpression],
    [Context.Empty, '[K]/u', Token.RegularExpression],
    [Context.Empty, '[Kq]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[-b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[-bcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc-]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^-J]/ug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^-fdsasgJ]/gu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^Jdsads-]/ug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^J-]/ug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^--]/ug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^---]/ug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a\\bc]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\bc]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a\\bb]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a\\-b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\-c]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a\\-c]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\-]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\0]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a\\0]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\0b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a\\0b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[0\\0b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[1\\0b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\d]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\D]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\f]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\n]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\W]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\s]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\S]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\t]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\f]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\r]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\t]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\w]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\W]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\d]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\fabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\dabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\Dabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\nabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\rabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\sabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\Sabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\tabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\vabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\wabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\Wabcd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\fdeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\ddeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\Ddeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\ndeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\rdeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '/[abc\\sdeff]/u', Token.RegularExpression],
    [Context.Empty, '[\\fabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\dabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\Dabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\nabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\rabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\sabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\Sabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\tabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\vabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\wabcd]/u', Token.RegularExpression],
    [Context.Empty, '[\\Wabcd]/u', Token.RegularExpression],
    [Context.Empty, '[abc\\fdeff]/u', Token.RegularExpression],
    [Context.Empty, '[abc\\ddeff]/u', Token.RegularExpression],
    [Context.Empty, '[abc\\Ddeff]/u', Token.RegularExpression],
    [Context.Empty, '[abc\\ndeff]/u', Token.RegularExpression],
    [Context.Empty, '[abc\\rdeff]/u', Token.RegularExpression],
    [Context.Empty, '/[abc\\sdeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\Sdeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\tdeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\vdeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\wdeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[abc\\Wdeff]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '/[\\09]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\^]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\$]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\\\]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\.]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\*]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\+]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\(]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\)]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\[]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\]]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\{]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\}]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\|]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\^def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\$def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\\\def]/u`, Token.RegularExpression],
    [Context.Empty, `[abc\\]]/u`, Token.RegularExpression],
    [Context.Empty, `[abc\\{]/u`, Token.RegularExpression],
    [Context.Empty, `[abc\\}]/u`, Token.RegularExpression],
    [Context.Empty, `[abc\\|]/u`, Token.RegularExpression],
    [Context.Empty, `[\\^def]/u`, Token.RegularExpression],
    [Context.Empty, `[\\$def]/u`, Token.RegularExpression],
    [Context.Empty, `[\\\\def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\.def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\*def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\+def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\?def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\(def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\)def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\[def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\]def]/u`, Token.RegularExpression],
    [Context.Empty, `[\\{def]/u`, Token.RegularExpression],
    [Context.Empty, `[\\}def]/u`, Token.RegularExpression],
    [Context.Empty, `[\\|def]/u`, Token.RegularExpression],
    [Context.Empty, '[\\ca]/u', Token.RegularExpression],
    [Context.Empty, '[\\cb]/u', Token.RegularExpression],
    [Context.Empty, '[\\cd]/u', Token.RegularExpression],
    [Context.Empty, '[\\ce]/u', Token.RegularExpression],
    [Context.Empty, '[\\cf]/u', Token.RegularExpression],
    [Context.Empty, '[\\cg]/u', Token.RegularExpression],
    [Context.Empty, '[\\ch]/u', Token.RegularExpression],
    [Context.Empty, '[\\ci]/u', Token.RegularExpression],
    [Context.Empty, '[\\cj]/u', Token.RegularExpression],
    [Context.Empty, '[\\ck]/u', Token.RegularExpression],
    [Context.Empty, '[\\cl]/u', Token.RegularExpression],
    [Context.Empty, '[\\cm]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\{def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\}def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[\\|def]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ca]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cb]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cd]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ce]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cf]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cg]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ch]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ci]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cj]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ck]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cl]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cm]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cn]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\co]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cp]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cq]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cr]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cs]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ct]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cu]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cv]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cw]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cx]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cz]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cA]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cD]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cE]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cF]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cG]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cH]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cI]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cJ]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cK]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cL]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cM]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cN]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cO]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cP]/u', Token.RegularExpression],
    [Context.Empty, '[\\cH]/u', Token.RegularExpression],
    [Context.Empty, '[\\cI]/u', Token.RegularExpression],
    [Context.Empty, '[\\cJ]/u', Token.RegularExpression],
    [Context.Empty, '[\\cK]/u', Token.RegularExpression],
    [Context.Empty, '[\\cL]/u', Token.RegularExpression],
    [Context.Empty, '[\\cM]/u', Token.RegularExpression],
    [Context.Empty, '[\\cN]/u', Token.RegularExpression],
    [Context.Empty, '[\\cO]/u', Token.RegularExpression],
    [Context.Empty, '[\\cP]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cQ]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cR]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cS]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cT]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cU]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cV]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cW]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cX]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cY]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\cZ]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\x01]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\xa2]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\xF3]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\x34]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\xC5]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\x5a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\x67]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\x7D]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\x90]/u', Token.RegularExpression],
    [Context.Empty, '[\\ce]/u', Token.RegularExpression],
    [Context.Empty, '[\\cf]/u', Token.RegularExpression],
    [Context.Empty, '[\\cg]/u', Token.RegularExpression],
    [Context.Empty, '[\\ch]/u', Token.RegularExpression],
    [Context.Empty, '[\\ci]/u', Token.RegularExpression],
    [Context.Empty, '[\\cj]/u', Token.RegularExpression],
    [Context.Empty, '[\\ck]/u', Token.RegularExpression],
    [Context.Empty, '[\\cl]/u', Token.RegularExpression],
    [Context.Empty, '[\\cm]/u', Token.RegularExpression],
    [Context.Empty, '[\\cn]/u', Token.RegularExpression],
    [Context.Empty, '[\\co]/u', Token.RegularExpression],
    [Context.Empty, '[\\cp]/u', Token.RegularExpression],
    [Context.Empty, '[\\cq]/u', Token.RegularExpression],
    [Context.Empty, '[\\cr]/u', Token.RegularExpression],
    [Context.Empty, '[\\cs]/u', Token.RegularExpression],
    [Context.Empty, '[\\ct]/u', Token.RegularExpression],
    [Context.Empty, '[\\cu]/u', Token.RegularExpression],
    [Context.Empty, '[\\cv]/u', Token.RegularExpression],
    [Context.Empty, '[\\cw]/u', Token.RegularExpression],
    [Context.Empty, '[\\cx]/u', Token.RegularExpression],
    [Context.Empty, '[\\cy]/u', Token.RegularExpression],
    [Context.Empty, '[\\cz]/u', Token.RegularExpression],
    [Context.Empty, '[\\cA]/u', Token.RegularExpression],
    [Context.Empty, '[\\cB]/u', Token.RegularExpression],
    [Context.Empty, '[\\cD]/u', Token.RegularExpression],
    [Context.Empty, '[\\cE]/u', Token.RegularExpression],
    [Context.Empty, '[\\cF]/u', Token.RegularExpression],
    [Context.Empty, '[\\cG]/u', Token.RegularExpression],
    [Context.Empty, '[\\cH]/u', Token.RegularExpression],
    [Context.Empty, '[\\cI]/u', Token.RegularExpression],
    [Context.Empty, '[\\cJ]/u', Token.RegularExpression],
    [Context.Empty, '[\\cK]/u', Token.RegularExpression],
    [Context.Empty, '[\\cL]/u', Token.RegularExpression],
    [Context.Empty, '[\\cM]/u', Token.RegularExpression],
    [Context.Empty, '[\\cN]/u', Token.RegularExpression],
    [Context.Empty, '[\\cO]/u', Token.RegularExpression],
    [Context.Empty, '[\\cP]/u', Token.RegularExpression],
    [Context.Empty, '[\\cQ]/u', Token.RegularExpression],
    [Context.Empty, '[\\cR]/u', Token.RegularExpression],
    [Context.Empty, '[\\cS]/u', Token.RegularExpression],
    [Context.Empty, '[\\cT]/u', Token.RegularExpression],
    [Context.Empty, '[\\cU]/u', Token.RegularExpression],
    [Context.Empty, '[\\cV]/u', Token.RegularExpression],
    [Context.Empty, '[\\cW]/u', Token.RegularExpression],
    [Context.Empty, '[\\cX]/u', Token.RegularExpression],
    [Context.Empty, '[\\cY]/u', Token.RegularExpression],
    [Context.Empty, '[\\cZ]/u', Token.RegularExpression],
    [Context.Empty, '[\\x01]/u', Token.RegularExpression],
    [Context.Empty, '[\\xa2]/u', Token.RegularExpression],
    [Context.Empty, '[\\xF3]/u', Token.RegularExpression],
    [Context.Empty, '[\\x34]/u', Token.RegularExpression],
    [Context.Empty, '[\\xC5]/u', Token.RegularExpression],
    [Context.Empty, '[\\x5a]/u', Token.RegularExpression],
    [Context.Empty, '[\\x67]/u', Token.RegularExpression],
    [Context.Empty, '[\\x7D]/u', Token.RegularExpression],
    [Context.Empty, '[\\x90]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\xa1]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\xb2]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\x3d]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\x5f]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\xbB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\xEF]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u1234]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\u0567]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uf89ay]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ubcdey]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udabcy]/ug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udabcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud900y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud800]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\udc00\\udc00]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udc10\\udc10]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\udd00\\udd00y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udebc\\udebcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udebc\\udebcy]/ui', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud800\\udc00]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ud810\\udc10]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud900\\udd00y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udabc\\udebcy]/ug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u1234\\ud800]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\u0567\\ud810]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uf89a\\ud900y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ubcde\\udabcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ubcde\\udabcy]/mu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ubcde\\udebcy]/yu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ubcde\\udebcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uf89a\\udd00y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\u0567\\udc10]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u1234\\udc00]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u1234\\u1234\\udc00]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\u0567\\u0567\\udc10]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uf89a\\uf89a\\udd00y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ubcde\\ubcde\\udebcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u1234\\udc00\\udc00]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\u0567\\udc10\\udc10]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uf89a\\udd00\\udd00y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ubcde\\udebc\\udebcy]/u', Token.RegularExpression],
    [Context.Empty, '[\\u1234\\udc00]/u', Token.RegularExpression],
    [Context.Empty, '[\\u1234\\u1234\\udc00]/u', Token.RegularExpression],
    [Context.Empty, '[x\\u0567\\u0567\\udc10]/u', Token.RegularExpression],
    [Context.Empty, '[\\uf89a\\uf89a\\udd00y]/u', Token.RegularExpression],
    [Context.Empty, '[x\\ubcde\\ubcde\\udebcy]/u', Token.RegularExpression],
    [Context.Empty, '[\\u1234\\udc00\\udc00]/u', Token.RegularExpression],
    [Context.Empty, '[x\\u0567\\udc10\\udc10]/u', Token.RegularExpression],
    [Context.Empty, '[\\uf89a\\udd00\\udd00y]/u', Token.RegularExpression],
    [Context.Empty, '[x\\ubcde\\udebc\\udebcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud800\\ud800\\udc00]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ud810\\ud810\\udc10]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud900\\ud900\\udd00y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udabc\\udabc\\udebcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud800\\udc00\\udc00]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud900\\udd00\\udd00y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udabc\\udebc\\udebcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud800\\udc00\\ud800]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\ud810\\udc10\\ud810]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\ud900\\udd00\\ud900y]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\udabc\\udebc\\udabcy]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u{0123}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u{4567}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u{89abc}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u{CDEF}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[prefix \\u{012345}]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u{012345} postfix]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\da-z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\DA-Z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\sa-z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\SA-S]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\wa-z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\WA-Z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\DA-Z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[A-Z\\D]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z\\s]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z\\w]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[A-Z\\W]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[1-9]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\u5000-\\u6000]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[A-S\\S]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z\\s]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\SA-S]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\sa-z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\WA-Z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\DA-Z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\SA-S]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\\uD83D\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\uD83D\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\uD83D\\uDCA9-\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\uD83D\\uDCA9-\\uD83D\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\uDCA9-\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\uDCA9-\\uD83D\uDCAB]/u', Token.RegularExpression],
    [Context.Empty, '[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.Empty, '[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.Empty, '[\\uD83D\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.Empty, '[\\uD83D\uDCA9-\\uD83D\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '/((b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a(b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(a(b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a(b))c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(a(b))c/u', Token.RegularExpression],
    [Context.Empty, '((b)c)/u', Token.RegularExpression],
    [Context.Empty, 'a((b)c)/u', Token.RegularExpression],
    [Context.Empty, '((b)c)c/u', Token.RegularExpression],
    [Context.Empty, 'a((b)c)c/u', Token.RegularExpression],
    [Context.Empty, '(a(b)c)/u', Token.RegularExpression],
    [Context.Empty, 'a(a(b)c)/u', Token.RegularExpression],
    [Context.Empty, '(a(b)c)c/u', Token.RegularExpression],
    [Context.Empty, 'a(a(b)c)c/u', Token.RegularExpression],
    [Context.Empty, '[-]/u', Token.RegularExpression],
    [Context.Empty, '[--]/u', Token.RegularExpression],
    [Context.Empty, '[---]/u', Token.RegularExpression],
    [Context.Empty, '[----]/u', Token.RegularExpression],
    [Context.Empty, '[-----]/u', Token.RegularExpression],
    [Context.Empty, '[------]/u', Token.RegularExpression],
    [Context.Empty, '[---------]/u', Token.RegularExpression],
    [Context.Empty, 'abc/gium', Token.RegularExpression],
    [Context.Empty, 'a|ab/u', Token.RegularExpression],
    [Context.Empty, '((a)|(ab))((c)|(bc))/u', Token.RegularExpression],
    [Context.Empty, '\\d{3}|[a-z]{4}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a((b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a((b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a(b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(a(b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a(b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(a(b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[-]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[--]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[---]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[----]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[-----]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[------]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[---------]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'abc/gium', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a|ab/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '((a)|(ab))((c)|(bc))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\d{3}|[a-z]{4}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\d{3}|[a-z]{4}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'ab|cd|ef/ui', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'ab|cd|ef/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:ab|cd)+|ef/iu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:ab|cd)+|ef/iu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '11111|111/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'xyz|.../u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(.)..|abc/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '.+: gr(a|e)y/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(Rob)|(Bob)|(Robert)|(Bobby)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '()|/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '|()/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[a-z]{2,4}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[a-z]{2,4}?/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(aa|aabaac|ba|b|c)*/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(z)((a+)?(b+)?(c))*/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a*)b\\1+/u', Token.RegularExpression],
    [Context.Empty, '(.)..|abc/u', Token.RegularExpression],
    [Context.Empty, '.+: gr(a|e)y/u', Token.RegularExpression],
    [Context.Empty, '(Rob)|(Bob)|(Robert)|(Bobby)/u', Token.RegularExpression],
    [Context.Empty, '()|/u', Token.RegularExpression],
    [Context.Empty, '|()/u', Token.RegularExpression],
    [Context.Empty, 'a[a-z]{2,4}/u', Token.RegularExpression],
    [Context.Empty, 'a[a-z]{2,4}?/u', Token.RegularExpression],
    [Context.Empty, '(aa|aabaac|ba|b|c)*/u', Token.RegularExpression],
    [Context.Empty, '(z)((a+)?(b+)?(c))*/u', Token.RegularExpression],
    [Context.Empty, '(a*)b\\1+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 's$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'e$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 's$/mu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^e]$/mug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'es$/umg', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^m/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^m/um', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^p[a-z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^p[b-z]/mu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^[^p]/um', Token.RegularExpression],
    [Context.Empty, '(a*)b\\1+/u', Token.RegularExpression],
    [Context.Empty, 's$/u', Token.RegularExpression],
    [Context.Empty, 'e$/u', Token.RegularExpression],
    [Context.Empty, 's$/mu', Token.RegularExpression],
    [Context.Empty, '[^e]$/mug', Token.RegularExpression],
    [Context.Empty, 'es$/umg', Token.RegularExpression],
    [Context.Empty, '^m/u', Token.RegularExpression],
    [Context.Empty, '^m/um', Token.RegularExpression],
    [Context.Empty, '^p[a-z]/u', Token.RegularExpression],
    [Context.Empty, '^p[b-z]/mu', Token.RegularExpression],
    [Context.Empty, '^[^p]/um', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^ab/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^..^e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^xxx/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^\\^+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^\\d+/um', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\bp/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'ot\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\bot/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\bso/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'so\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^o]t\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^o]t\\b/ui', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\bro/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'r\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\brobot\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\b\\w{5}\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\bop/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'op\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'e\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\be/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\Bevil\\B/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[f-z]e\\B/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\Bo\\B/iu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\B\\w\\B/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\w\\B/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\B\\w/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\B[^z]{4}\\B/u', Token.RegularExpression],
    [Context.Empty, 'ot\\b/u', Token.RegularExpression],
    [Context.Empty, '\\bot/u', Token.RegularExpression],
    [Context.Empty, '\\bso/u', Token.RegularExpression],
    [Context.Empty, 'so\\b/u', Token.RegularExpression],
    [Context.Empty, '[^o]t\\b/u', Token.RegularExpression],
    [Context.Empty, '[^o]t\\b/ui', Token.RegularExpression],
    [Context.Empty, '\\bro/u', Token.RegularExpression],
    [Context.Empty, 'r\\b/u', Token.RegularExpression],
    [Context.Empty, '\\brobot\\b/u', Token.RegularExpression],
    [Context.Empty, '\\b\\w{5}\\b/u', Token.RegularExpression],
    [Context.Empty, '\\bop/u', Token.RegularExpression],
    [Context.Empty, 'op\\b/u', Token.RegularExpression],
    [Context.Empty, 'e\\b/u', Token.RegularExpression],
    [Context.Empty, '\\be/u', Token.RegularExpression],
    [Context.Empty, '\\Bevil\\B/u', Token.RegularExpression],
    [Context.Empty, '[f-z]e\\B/u', Token.RegularExpression],
    [Context.Empty, '\\Bo\\B/iu', Token.RegularExpression],
    [Context.Empty, '\\B\\w\\B/u', Token.RegularExpression],
    [Context.Empty, '\\w\\B/u', Token.RegularExpression],
    [Context.Empty, '\\B\\w/u', Token.RegularExpression],
    [Context.Empty, '\\B[^z]{4}\\B/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\B\\w{4}\\B/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^^^^^^^robot$$$$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\B\\B\\B\\B\\B\\Bbot\\b\\b\\b\\b\\b\\b\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^.*?$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^.*?/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^.*?(:|$)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^.*(:|$)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\d{2,4}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'b{2,3}c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'b{42,93}c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'b{0,93}c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'bx{0,93}c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '.{0,93}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\w{3}\\d?/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\w{3}\\d?/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'b{2}c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'b{8}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\s+java\\s+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z]+\\d+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z]+\\d+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z]+(\\d+)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'd+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'o+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(b+)(b+)(b+)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(b+)(b*)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'b*b+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^"]*/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^"]*/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^"]*/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `["'][^"']*["']/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(x*)(x+)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(\\d*)(\\d+)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(\\d*)\\d(\\d+)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(x+)(x*)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x*y+$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\d]*[\\s]*bc./u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'bc..[\\d]*[\\s]*/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[xyz]*1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'java(script)?/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x?y?z?/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x?ay?bz?c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:(?:b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:a(?:b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:a(?:b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:a(?:b))c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:a(?:b))c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:(?:b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:(?:b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:(?:b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:(?:b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:a(?:b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:a(?:b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:a(?:b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:a(?:b)c)c/u', Token.RegularExpression],
    [Context.Empty, '(?:a(?:b))/u', Token.RegularExpression],
    [Context.Empty, 'a(?:a(?:b))/u', Token.RegularExpression],
    [Context.Empty, '(?:a(?:b))c/u', Token.RegularExpression],
    [Context.Empty, 'a(?:a(?:b))c/u', Token.RegularExpression],
    [Context.Empty, '(?:(?:b)c)/u', Token.RegularExpression],
    [Context.Empty, 'a(?:(?:b)c)/u', Token.RegularExpression],
    [Context.Empty, '(?:(?:b)c)c/u', Token.RegularExpression],
    [Context.Empty, 'a(?:(?:b)c)c/u', Token.RegularExpression],
    [Context.Empty, '(?:a(?:b)c)/u', Token.RegularExpression],
    [Context.Empty, 'a(?:a(?:b)c)/u', Token.RegularExpression],
    [Context.Empty, '(?:a(?:b)c)c/u', Token.RegularExpression],
    [Context.Empty, 'a(?:a(?:b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=(?=b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=a(?=b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=a(?=b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=a(?=b))c/u', Token.RegularExpression],
    [Context.Empty, 'a(?:a(?:b)c)/u', Token.RegularExpression],
    [Context.Empty, '(?:a(?:b)c)c/u', Token.RegularExpression],
    [Context.Empty, 'a(?:a(?:b)c)c/u', Token.RegularExpression],
    [Context.Empty, '(?=(?=b))/u', Token.RegularExpression],
    [Context.Empty, '(?=a(?=b))/u', Token.RegularExpression],
    [Context.Empty, 'a(?=a(?=b))/u', Token.RegularExpression],
    [Context.Empty, '(?=a(?=b))c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=a(?=b))c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=(?=b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=(?=b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=(?=b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=(?=b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=a(?=b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=a(?=b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=a(?=b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=a(?=b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!(?!b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!a(?!b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!a(?!b))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!a(?!b))c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!a(?!b))c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!(?!b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!(?!b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!(?!b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!(?!b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!a(?!b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!a(?!b)c)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!a(?!b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!a(?!b)c)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(b(c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(b(?:c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(b(?=c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(b(?!c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:b(c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:b(?:c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:b(?=c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:b(?!c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=b(c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=b(?:c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=b(?=c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(?!a(?!b)c)/u', Token.RegularExpression],
    [Context.Empty, '(?!a(?!b)c)c/u', Token.RegularExpression],
    [Context.Empty, 'a(?!a(?!b)c)c/u', Token.RegularExpression],
    [Context.Empty, 'a(b(c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(b(?:c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(b(?=c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(b(?!c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(?:b(c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(?:b(?:c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(?:b(?=c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(?:b(?!c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(?=b(c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(?=b(?:c)d)e/u', Token.RegularExpression],
    [Context.Empty, 'a(?=b(?=c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?=b(?!c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!b(c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!b(?:c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!b(?=c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?!b(?!c)d)e/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'ab?c?d?x?y?z/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\??\\??\\??\\??\\??/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '.?.?.?.?.?.?.?/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'b{2,}c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'b{8,}c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\d{1,}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(123){1,}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(123){1,}x\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'x{1,2}x{1,}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=(a+))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?=(a+))a*b\\1/u', Token.RegularExpression],
    [Context.Empty, 'b{8,}c/u', Token.RegularExpression],
    [Context.Empty, '\\d{1,}/u', Token.RegularExpression],
    [Context.Empty, '(123){1,}/u', Token.RegularExpression],
    [Context.Empty, '(123){1,}x\\1/u', Token.RegularExpression],
    [Context.Empty, 'x{1,2}x{1,}/u', Token.RegularExpression],
    [Context.Empty, '(?=(a+))/u', Token.RegularExpression],
    [Context.Empty, '(?=(a+))a*b\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(.*?)a(?!(a+)b\\2c)\\2(.*)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'Java(?!Script)([A-Z]\\w*)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'Java(?!Script)([A-Z]\\w*)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?!a|b)|c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(.{3})(.{4})/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(aa)bcd\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(aa).+\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(.{2}).+\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(\\d{3})(\\d{3})\\1\\2/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(..(..)..)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a(b(c)))(d(e(f)))/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a(b(c)))(d(e(f)))\\2\\5/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(.?)b\\1c\\1d\\1/u', Token.RegularExpression],
    [
      Context.OptionsDisableWebCompat,
      '(\\|)([\\w\\x81-\\xff ]*)(\\|)([\\/a-z][\\w:\\/\\.]*\\.[a-z]{3,4})(\\|)/uig',
      Token.RegularExpression
    ],
    [Context.Empty, '([\\S]+([ \\t]+[\\S]+)*)[ \\t]*=[ \\t]*[\\S]+/u', Token.RegularExpression],
    [Context.Empty, '^(A)?(A.*)$/u', Token.RegularExpression],
    [Context.Empty, '(a)?a/u', Token.RegularExpression],
    [Context.Empty, 'a|(b)/u', Token.RegularExpression],
    [Context.Empty, '(a)?(a)/u', Token.RegularExpression],
    [Context.Empty, '^([a-z]+)*[a-z]$/u', Token.RegularExpression],
    [Context.Empty, '^(([a-z]+)*[a-z]\\.)+[a-z]{2,}$/u', Token.RegularExpression],
    [Context.Empty, '^(([a-z]+)*([a-z])\\.)+[a-z]{2,}$/u', Token.RegularExpression],
    [Context.Empty, '.*a.*/u', Token.RegularExpression],
    [Context.Empty, '.+/u', Token.RegularExpression],
    [Context.Empty, '[a-z]+/uig', Token.RegularExpression],
    [Context.Empty, '[a-z]+/u', Token.RegularExpression],
    [Context.Empty, '\\b(\\w+) \\1\\b/u', Token.RegularExpression],
    [Context.Empty, '([xu]\\d{2}([A-H]{2})?)\\1/u', Token.RegularExpression],
    [Context.Empty, '([xu]\\d{2}([A-H]{2})?)\\1/u', Token.RegularExpression],
    [Context.Empty, '(a*)b\\1+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '([\\S]+([ \\t]+[\\S]+)*)[ \\t]*=[ \\t]*[\\S]+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^(A)?(A.*)$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a)?a/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a|(b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a)?(a)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^([a-z]+)*[a-z]$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^(([a-z]+)*[a-z]\\.)+[a-z]{2,}$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '^(([a-z]+)*([a-z])\\.)+[a-z]{2,}$/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '.*a.*/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '.+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z]+/uig', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z]+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\b(\\w+) \\1\\b/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '([xu]\\d{2}([A-H]{2})?)\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '([xu]\\d{2}([A-H]{2})?)\\1/u', Token.RegularExpression],
    [Context.Empty, '(a)?a/u', Token.RegularExpression],
    [Context.Empty, 'a|(b)/u', Token.RegularExpression],
    [Context.Empty, '(a)?(a)/u', Token.RegularExpression],
    [Context.Empty, '^([a-z]+)*[a-z]$/u', Token.RegularExpression],
    [Context.Empty, '^(([a-z]+)*[a-z]\\.)+[a-z]{2,}$/u', Token.RegularExpression],
    [Context.Empty, '^(([a-z]+)*([a-z])\\.)+[a-z]{2,}$/u', Token.RegularExpression],
    [Context.Empty, '.*a.*/u', Token.RegularExpression],
    [Context.Empty, '.+/u', Token.RegularExpression],
    [Context.Empty, '[a-z]+/uig', Token.RegularExpression],
    [Context.Empty, '[a-z]+/u', Token.RegularExpression],
    [Context.Empty, '\\b(\\w+) \\1\\b/u', Token.RegularExpression],
    [Context.Empty, '([xu]\\d{2}([A-H]{2})?)\\1/u', Token.RegularExpression],
    [Context.Empty, '([xu]\\d{2}([A-H]{2})?)\\1/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(a*)b\\1+/u', Token.RegularExpression],
    [
      Context.OptionsDisableWebCompat,
      '((((((((((A))))))))))\\1\\2\\3\\4\\5\\6\\7\\8\\9\\10/u',
      Token.RegularExpression
    ],
    [
      Context.OptionsDisableWebCompat,
      '((((((((((A))))))))))\\10\\9\\8\\7\\6\\5\\4\\3\\2\\1/u',
      Token.RegularExpression
    ],
    [Context.OptionsDisableWebCompat, '[]a/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'q[ax-zb](?=\\s+)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'ab[ercst]de/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[d-h]+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[1234567].{2}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-c\\d]+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'ab[.]?c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[b]c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z][^1-9][a-z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[*&$]{3}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[\\d][\\n][^\\d]/u', Token.RegularExpression],
    [Context.Empty, '[a-z][^1-9][a-z]/u', Token.RegularExpression],
    [Context.Empty, '[*&$]{3}/u', Token.RegularExpression],
    [Context.Empty, '[\\d][\\n][^\\d]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^]a/mu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[^]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[^b-z]\\s+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^\\b]+/gu', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[^1-9]c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a[^b]c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^a-z]{4}/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '.[\\b]./u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'c[\\b]{3}d/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[^\\[\\b\\]]+/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '\\u0042/ui', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '1?1/miug', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '()/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(?:b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(?:b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a-z\\s]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\SA-S]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\sa-z]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[x\\WA-Z]/u', Token.RegularExpression],
    [Context.Empty, '(\\.(?!com|org)|\\/)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(\\.(?!com|org)|\\/)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.Empty, '[a\\-b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, `[abc\\?]/u`, Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[a\\-b]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(b)/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '(b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, 'a(b)c/u', Token.RegularExpression],
    [Context.OptionsDisableWebCompat, '[b\\-a]/u', Token.RegularExpression]
  ];

  for (const [ctx, op, token] of tokdens) {
    it(`scans '${op}'`, () => {
      const parser = create(op, undefined);
      const found = validateRegularExpressions(parser, ctx);
      t.deepEqual(
        {
          token: tokenDesc(found),
          line: parser.line
        },
        {
          token: tokenDesc(token),
          line: 1
        }
      );
    });
  }

  describe('seek()', () => {
    context('script', () => run(false));
    //    context('module', () => run(true));
  });

  function run(isModule: boolean) {
    interface Opts {
      source: string;
      value: any;
      hasNext: boolean;
      line: number;
      column: number;
    }

    const tokens: Array<[Context, string, Token]> = [
      [Context.Empty, '(\\.(?!com|org)|\\/)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\.(?!com|org)|\\/)/', Token.RegularExpression],
      [Context.Empty, '[a\\-b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\90]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\91]/', Token.RegularExpression],
      [Context.Empty, '[\\90]/', Token.RegularExpression],
      [Context.Empty, '[\\91]/', Token.RegularExpression],
      [Context.Empty, `abc/`, Token.RegularExpression],
      [Context.Empty, `a|b/`, Token.RegularExpression],
      [Context.Empty, `|a/`, Token.RegularExpression],
      [Context.Empty, `a|/`, Token.RegularExpression],
      [Context.Empty, `|/`, Token.RegularExpression],
      [Context.Empty, 'a||/', Token.RegularExpression],
      [Context.Empty, `^abc/`, Token.RegularExpression],
      [Context.Empty, `abc$/`, Token.RegularExpression],
      [Context.Empty, `a.c/`, Token.RegularExpression],
      [Context.Empty, `^/`, Token.RegularExpression],
      [Context.Empty, `ab^cd/`, Token.RegularExpression],
      [Context.Empty, `abc^/`, Token.RegularExpression],
      [Context.Empty, `abc^abc/`, Token.RegularExpression],
      [Context.Empty, `$/`, Token.RegularExpression],
      [Context.Empty, `$abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `a|b/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `|a/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `a|/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `|/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a||/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `^abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `abc$/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `a.c/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `^/`, Token.RegularExpression],
      [Context.Empty, `|a/`, Token.RegularExpression],
      [Context.Empty, `a|/`, Token.RegularExpression],
      [Context.Empty, `|/`, Token.RegularExpression],
      [Context.Empty, 'a||/', Token.RegularExpression],
      [Context.Empty, `^abc/`, Token.RegularExpression],
      [Context.Empty, `abc$/`, Token.RegularExpression],
      [Context.Empty, `a.c/`, Token.RegularExpression],
      [Context.Empty, `^/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `ab^cd/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `abc^/`, Token.RegularExpression],
      [Context.Empty, `abc^abc/`, Token.RegularExpression],
      [Context.Empty, `$/`, Token.RegularExpression],
      [Context.Empty, `$abc/`, Token.RegularExpression],
      [Context.Empty, `abc$abc/`, Token.RegularExpression],
      [Context.Empty, `a+b/`, Token.RegularExpression],
      [Context.Empty, `a?b/`, Token.RegularExpression],
      [Context.Empty, `a*b/`, Token.RegularExpression],
      [Context.Empty, `a??/`, Token.RegularExpression],
      [Context.Empty, `$abc/`, Token.RegularExpression],
      [Context.Empty, `abc$abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `abc^abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `$/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `$abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `abc$abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `a+b/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `a?b/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `a*b/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `a??/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `$abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `abc$abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `$abc/`, Token.RegularExpression],
      [Context.Empty, '\\k<a/', Token.RegularExpression],
      [Context.Empty, '\\k<a>/', Token.RegularExpression],
      [Context.Empty, '\\k/', Token.RegularExpression],
      [Context.Empty, '\\k<a>(?<=>)a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `abc$abc/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a|b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '|a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a|/', Token.RegularExpression],
      [Context.Empty, '|/', Token.RegularExpression],
      [Context.Empty, 'a||/', Token.RegularExpression],
      [Context.Empty, 'a||/', Token.RegularExpression],
      [Context.Empty, '^abc/', Token.RegularExpression],
      [Context.Empty, 'abc$/', Token.RegularExpression],
      [Context.Empty, 'a.c/', Token.RegularExpression],
      [Context.Empty, '^/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '|/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a||/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a||/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^abc/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a.c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'ab^cd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc^/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc^abc/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '$abc/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc$abc/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a?/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a+b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a?b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a*b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a??/', Token.RegularExpression],
      [Context.Empty, '^/', Token.RegularExpression],
      [Context.Empty, 'ab^cd/', Token.RegularExpression],
      [Context.Empty, 'abc^/', Token.RegularExpression],
      [Context.Empty, 'abc^abc/', Token.RegularExpression],
      [Context.Empty, '$/', Token.RegularExpression],
      [Context.Empty, '$abc/', Token.RegularExpression],
      [Context.Empty, 'abc$abc/', Token.RegularExpression],
      [Context.Empty, 'a+/', Token.RegularExpression],
      [Context.Empty, 'a?/', Token.RegularExpression],
      [Context.Empty, 'a+b/', Token.RegularExpression],
      [Context.Empty, 'a?b/', Token.RegularExpression],
      [Context.Empty, 'a*b/', Token.RegularExpression],
      [Context.Empty, 'a??/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{0}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{1}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{2}/', Token.RegularExpression],
      [Context.Empty, 'abc^/', Token.RegularExpression],
      [Context.Empty, 'abc^abc/', Token.RegularExpression],
      [Context.Empty, '$/', Token.RegularExpression],
      [Context.Empty, '$abc/', Token.RegularExpression],
      [Context.Empty, 'abc$abc/', Token.RegularExpression],
      [Context.Empty, 'a+/', Token.RegularExpression],
      [Context.Empty, 'a?/', Token.RegularExpression],
      [Context.Empty, 'a+b/', Token.RegularExpression],
      [Context.Empty, 'a?b/', Token.RegularExpression],
      [Context.Empty, 'a*b/', Token.RegularExpression],
      [Context.Empty, 'a??/', Token.RegularExpression],
      [Context.Empty, 'a{0}/', Token.RegularExpression],
      [Context.Empty, 'a{1}/', Token.RegularExpression],
      [Context.Empty, 'a{2}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{3}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{4}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{5}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{6}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{7}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{78}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{45}/', Token.RegularExpression],
      [Context.Empty, 'a{23}/', Token.RegularExpression],
      [Context.Empty, 'a{12}/', Token.RegularExpression],
      [Context.Empty, 'a{0,}/', Token.RegularExpression],
      [Context.Empty, 'a{2,2}/', Token.RegularExpression],
      [Context.Empty, 'a{3,3}/', Token.RegularExpression],
      [Context.Empty, 'a{,49}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{23}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{12}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{0,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{2,2}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{3,3}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,49}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,50}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{5,50}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,3}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{23,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{90,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{9,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{8}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{9}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{3,38}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{2,27}/', Token.RegularExpression],
      [Context.Empty, 'a{90,}/', Token.RegularExpression],
      [Context.Empty, 'a{9,}/', Token.RegularExpression],
      [Context.Empty, 'a{8}/', Token.RegularExpression],
      [Context.Empty, 'a{9}/', Token.RegularExpression],
      [Context.Empty, 'a{3,38}/', Token.RegularExpression],
      [Context.Empty, 'a{2,27}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{0,15}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,16}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{5,5}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,83}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,38}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,8}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,5}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{4,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{67}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{0}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{89,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{9}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{0}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{34,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{23,37}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,0}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,1}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a{,50}/', Token.RegularExpression],
      [Context.Empty, 'foo/g', Token.RegularExpression],
      [Context.Empty, 'foo/i', Token.RegularExpression],
      [Context.Empty, 'foo/s', Token.RegularExpression],
      [Context.Empty, 'foo/igy', Token.RegularExpression],
      [Context.Empty, 'foo/gmi', Token.RegularExpression],
      [Context.Empty, '\\d/', Token.RegularExpression],
      [Context.Empty, '\\D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/i', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/s', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/igy', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/gmi', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\d/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\f/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\n/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\r/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\S/', Token.RegularExpression],
      [Context.Empty, 'foo/g', Token.RegularExpression],
      [Context.Empty, 'foo/i', Token.RegularExpression],
      [Context.Empty, 'foo/s', Token.RegularExpression],
      [Context.Empty, 'foo/igy', Token.RegularExpression],
      [Context.Empty, 'foo/gmi', Token.RegularExpression],
      [Context.Empty, '\\d/', Token.RegularExpression],
      [Context.Empty, '\\D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\f/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\n/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\r/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\S/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\t/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\v/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\w/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\W/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\d/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\f/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\n/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\r/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\s/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\S/', Token.RegularExpression],
      [Context.Empty, '\\f/', Token.RegularExpression],
      [Context.Empty, '\\n/', Token.RegularExpression],
      [Context.Empty, '\\r/', Token.RegularExpression],
      [Context.Empty, '\\S/', Token.RegularExpression],
      [Context.Empty, '\\t/', Token.RegularExpression],
      [Context.Empty, '\\v/', Token.RegularExpression],
      [Context.Empty, '\\w/', Token.RegularExpression],
      [Context.Empty, '\\W/', Token.RegularExpression],
      [Context.Empty, 'abc\\d/', Token.RegularExpression],
      [Context.Empty, 'abc\\D/', Token.RegularExpression],
      [Context.Empty, 'abc\\f/', Token.RegularExpression],
      [Context.Empty, 'abc\\n/', Token.RegularExpression],
      [Context.Empty, 'abc\\r/', Token.RegularExpression],
      [Context.Empty, 'abc\\s/', Token.RegularExpression],
      [Context.Empty, 'abc\\S/', Token.RegularExpression],
      [Context.Empty, 'abc\\t/', Token.RegularExpression],
      [Context.Empty, 'abc\\w/', Token.RegularExpression],
      [Context.Empty, 'abc\\W/', Token.RegularExpression],
      [Context.Empty, 'abc\\S/', Token.RegularExpression],
      [Context.Empty, 'abc\\fdeff/', Token.RegularExpression],
      [Context.Empty, 'abc\\ddeff/', Token.RegularExpression],
      [Context.Empty, '\\fabcd/', Token.RegularExpression],
      [Context.Empty, '\\dabcd/', Token.RegularExpression],
      [Context.Empty, '\\Dabcd/', Token.RegularExpression],
      [Context.Empty, '\\nabcd/', Token.RegularExpression],
      [Context.Empty, '\\rabcd/', Token.RegularExpression],
      [Context.Empty, '\\Sabcd/', Token.RegularExpression],
      [Context.Empty, '\\vabcd/', Token.RegularExpression],
      [Context.Empty, '\\tabcd/', Token.RegularExpression],
      [Context.Empty, '\\Wabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\nabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\rabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Sabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\vabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\tabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Wabcd/', Token.RegularExpression],
      [Context.Empty, 'abc\\Wdeff/', Token.RegularExpression],
      [Context.Empty, 'abc\\tdeff/', Token.RegularExpression],
      [Context.Empty, 'abc\\sdeff/', Token.RegularExpression],
      [Context.Empty, 'abc\\Ddeff/', Token.RegularExpression],
      [Context.Empty, 'abc\\]/', Token.RegularExpression],
      [Context.Empty, 'abc\\*/', Token.RegularExpression],
      [Context.Empty, 'abc\\./', Token.RegularExpression],
      [Context.Empty, 'abc\\\\/', Token.RegularExpression],
      [Context.Empty, 'abc\\$/', Token.RegularExpression],
      [Context.Empty, 'abc\\^/', Token.RegularExpression],
      [Context.Empty, '\\^def/', Token.RegularExpression],
      [Context.Empty, '\\$def/', Token.RegularExpression],
      [Context.Empty, '\\\\def/', Token.RegularExpression],
      [Context.Empty, '\\.def/', Token.RegularExpression],
      [Context.Empty, '\\*def/', Token.RegularExpression],
      [Context.Empty, '\\+def/', Token.RegularExpression],
      [Context.Empty, '\\?def/', Token.RegularExpression],
      [Context.Empty, '\\(def/', Token.RegularExpression],
      [Context.Empty, '\\)def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\\\def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\.def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\*def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\+def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\?def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\(def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\)def/', Token.RegularExpression],
      [Context.Empty, '\\[def/', Token.RegularExpression],
      [Context.Empty, '\\]def/', Token.RegularExpression],
      [Context.Empty, '\\{def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/i', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/s', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/igy', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'foo/gmi', Token.RegularExpression],
      [Context.Empty, '\\d/', Token.RegularExpression],
      [Context.Empty, '\\D/', Token.RegularExpression],
      [Context.Empty, '\\f/', Token.RegularExpression],
      [Context.Empty, '\\n/', Token.RegularExpression],
      [Context.Empty, '\\r/', Token.RegularExpression],
      [Context.Empty, '\\S/', Token.RegularExpression],
      [Context.Empty, '\\t/', Token.RegularExpression],
      [Context.Empty, '\\v/', Token.RegularExpression],
      [Context.Empty, '\\w/', Token.RegularExpression],
      [Context.Empty, '\\W/', Token.RegularExpression],
      [Context.Empty, 'abc\\d/', Token.RegularExpression],
      [Context.Empty, 'abc\\D/', Token.RegularExpression],
      [Context.Empty, 'abc\\f/', Token.RegularExpression],
      [Context.Empty, 'abc\\n/', Token.RegularExpression],
      [Context.Empty, 'abc\\r/', Token.RegularExpression],
      [Context.Empty, 'abc\\s/', Token.RegularExpression],
      [Context.Empty, 'abc\\S/', Token.RegularExpression],
      [Context.Empty, 'abc\\t/', Token.RegularExpression],
      [Context.Empty, 'abc\\w/', Token.RegularExpression],
      [Context.Empty, 'abc\\W/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\d/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\f/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\n/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\r/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\S/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\t/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\v/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\w/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\W/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\d/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\f/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\n/', Token.RegularExpression],
      [Context.Empty, 'abc\\r/', Token.RegularExpression],
      [Context.Empty, 'abc\\s/', Token.RegularExpression],
      [Context.Empty, 'abc\\S/', Token.RegularExpression],
      [Context.Empty, 'abc\\t/', Token.RegularExpression],
      [Context.Empty, 'abc\\w/', Token.RegularExpression],
      [Context.Empty, 'abc\\W/', Token.RegularExpression],
      [Context.Empty, 'abc\\S/', Token.RegularExpression],
      [Context.Empty, 'abc\\fdeff/', Token.RegularExpression],
      [Context.Empty, 'abc\\ddeff/', Token.RegularExpression],
      [Context.Empty, '\\fabcd/', Token.RegularExpression],
      [Context.Empty, '\\dabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\r/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\s/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\S/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\t/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\w/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\W/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\S/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\fdeff/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\ddeff/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\fabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\dabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Dabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\nabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\rabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Sabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\vabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\tabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Wabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\Wdeff/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\tdeff/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\sdeff/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\Ddeff/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\ndeff/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\rdeff/', Token.RegularExpression],
      [Context.Empty, 'abc\\x/', Token.RegularExpression],
      [Context.Empty, 'abc\\x/', Token.RegularExpression],
      [Context.Empty, 'abc\\x/', Token.RegularExpression],
      [Context.Empty, 'abc\\x/', Token.RegularExpression],
      [Context.Empty, 'abc\\x/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Uabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Vabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Vabcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\$abcd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\^/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\\\/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\./', Token.RegularExpression],
      [Context.Empty, '\\./', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\[/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\{/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\|/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\?/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\(/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\[/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\./', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\\\/', Token.RegularExpression],
      [Context.Empty, 'abc\\$/', Token.RegularExpression],
      [Context.Empty, 'abc\\^/', Token.RegularExpression],
      [Context.Empty, '\\^def/', Token.RegularExpression],
      [Context.Empty, '\\$def/', Token.RegularExpression],
      [Context.Empty, '\\\\def/', Token.RegularExpression],
      [Context.Empty, '\\.def/', Token.RegularExpression],
      [Context.Empty, '\\*def/', Token.RegularExpression],
      [Context.Empty, '\\+def/', Token.RegularExpression],
      [Context.Empty, '\\?def/', Token.RegularExpression],
      [Context.Empty, '\\(def/', Token.RegularExpression],
      [Context.Empty, '\\)def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\^/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\^def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\$def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\\\def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\.def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\*def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\+def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\?def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\(def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\)def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\[def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\]def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\{def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\}def/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\|def/', Token.RegularExpression],
      [Context.Empty, `\\'/`, Token.RegularExpression],
      [Context.Empty, '\\"/', Token.RegularExpression],
      [Context.Empty, '\\`/', Token.RegularExpression],
      [Context.Empty, './', Token.RegularExpression],
      [Context.Empty, '$/', Token.RegularExpression],
      [Context.Empty, '^/', Token.RegularExpression],
      [Context.Empty, 'a|(|)/', Token.RegularExpression],
      [Context.Empty, 'a|(|)/', Token.RegularExpression],
      [Context.Empty, `\\ca/`, Token.RegularExpression],
      [Context.Empty, '\\cb/', Token.RegularExpression],
      [Context.Empty, '\\cd/', Token.RegularExpression],
      [Context.Empty, '\\ce/', Token.RegularExpression],
      [Context.Empty, '\\cf/', Token.RegularExpression],
      [Context.Empty, '\\ch/', Token.RegularExpression],
      [Context.Empty, '\\ck/', Token.RegularExpression],
      [Context.Empty, '\\cl/', Token.RegularExpression],
      [Context.Empty, `\\cm/`, Token.RegularExpression],
      [Context.Empty, '\\cn/', Token.RegularExpression],
      [Context.Empty, '\\co/', Token.RegularExpression],
      [Context.Empty, '\\cp/', Token.RegularExpression],
      [Context.Empty, '\\cq/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `\\'/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\"/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\`/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, './', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a|(|)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a|(|)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `\\ca/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cb/', Token.RegularExpression],
      [Context.Empty, '\\cd/', Token.RegularExpression],
      [Context.Empty, '\\ce/', Token.RegularExpression],
      [Context.Empty, '\\cf/', Token.RegularExpression],
      [Context.Empty, '\\ch/', Token.RegularExpression],
      [Context.Empty, '\\ck/', Token.RegularExpression],
      [Context.Empty, '\\cl/', Token.RegularExpression],
      [Context.Empty, `\\cm/`, Token.RegularExpression],
      [Context.Empty, '\\cn/', Token.RegularExpression],
      [Context.Empty, '\\co/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cd/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ce/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cf/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ch/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ck/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cl/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `\\cm/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cn/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\co/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cp/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cq/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cr/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cs/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ct/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\co/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cp/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cq/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cr/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cs/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ct/', Token.RegularExpression],
      [Context.Empty, '\\cu/', Token.RegularExpression],
      [Context.Empty, '\\cv/', Token.RegularExpression],
      [Context.Empty, '\\cw/', Token.RegularExpression],
      [Context.Empty, '\\cx/', Token.RegularExpression],
      [Context.Empty, '\\cy/', Token.RegularExpression],
      [Context.Empty, '\\cz/', Token.RegularExpression],
      [Context.Empty, '\\cA/', Token.RegularExpression],
      [Context.Empty, '\\cB/', Token.RegularExpression],
      [Context.Empty, '\\cD/', Token.RegularExpression],
      [Context.Empty, '\\cE/', Token.RegularExpression],
      [Context.Empty, '\\cF/', Token.RegularExpression],
      [Context.Empty, '\\cJ/', Token.RegularExpression],
      [Context.Empty, '\\cK/', Token.RegularExpression],
      [Context.Empty, '\\cM/', Token.RegularExpression],
      [Context.Empty, '\\cN/', Token.RegularExpression],
      [Context.Empty, '\\cW/', Token.RegularExpression],
      [Context.Empty, '\\cX/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cu/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cv/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cw/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cx/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cy/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cz/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cA/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cB/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cD/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cE/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cF/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cJ/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cK/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cM/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cN/', Token.RegularExpression],
      [Context.Empty, '\\cB/', Token.RegularExpression],
      [Context.Empty, '\\cD/', Token.RegularExpression],
      [Context.Empty, '\\cE/', Token.RegularExpression],
      [Context.Empty, '\\cF/', Token.RegularExpression],
      [Context.Empty, '\\cJ/', Token.RegularExpression],
      [Context.Empty, '\\cK/', Token.RegularExpression],
      [Context.Empty, '\\cM/', Token.RegularExpression],
      [Context.Empty, '\\cN/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cW/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cX/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cY/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\cZ/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\x01/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\x12/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\x23/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\x56/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\x78/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\x90/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\xCD/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\xEF/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\x5f/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\x4e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\xc3/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\xa1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a)\\1/', Token.RegularExpression],
      [Context.Empty, '(a)\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\1)/', Token.RegularExpression],
      [Context.Empty, '(\\1)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\1x(a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '4\\1(a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\1(a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\1|a)/', Token.RegularExpression],
      [Context.Empty, '(\\1|a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a|\\1)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a)x\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a\\1b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '0\\1(a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '4\\1(a)/', Token.RegularExpression],
      [Context.Empty, '(a\\1b)/', Token.RegularExpression],
      [Context.Empty, '0\\1(a)/', Token.RegularExpression],
      [Context.Empty, '4\\1(a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\1|(a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\1|a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a|\\1)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\0/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((((a))))\\4/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((((((a))))))\\6/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(((((((a)))))))\\7/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(((((((((((a)))))))))))\\10/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(((((((((((((((a)))))))))))))))\\14/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((((((((((((((((a))))))))))))))))\\16/', Token.RegularExpression],
      [Context.Empty, '(((((((((((a)))))))))))\\10/', Token.RegularExpression],
      [Context.Empty, '(((((((((((((((a)))))))))))))))\\14/', Token.RegularExpression],
      [Context.Empty, '((((((((((((((((a))))))))))))))))\\16/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(((((((((((((((((((a)))))))))))))))))))\\18/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((((((((((((((((((((a))))))))))))))))))))\\20/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(((((((((((((((((((((a)))))))))))))))))))))\\20/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<a>\\a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<!a)a/', Token.RegularExpression],
      [Context.Empty, '(?<!a)a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(<a>x)/', Token.RegularExpression],
      [Context.Empty, '(<a>x)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[0-9A-Za-z_\\$(|)\\[\\]/\\^]/', Token.RegularExpression],
      [Context.Empty, '[0-9A-Za-z_\\$(|)\\[\\]/\\^]/', Token.RegularExpression],
      [Context.Empty, '[\\c-f]/', Token.RegularExpression],
      [Context.Empty, '\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[0-9A-Za-z_\\$(|)[\\]/\\^]/', Token.RegularExpression],
      [Context.Empty, '[0-9A-Za-z_\\$(|)[\\]/\\^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<a>\\a)/', Token.RegularExpression],
      [Context.Empty, '\\k<a>(?<=>)a/', Token.RegularExpression],
      [Context.Empty, '\\k<a>(?<!a)a/', Token.RegularExpression],
      [Context.Empty, '\\k<a>(<a>x)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\u0567/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\uf89ay/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\ubcdey/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u1234/', Token.RegularExpression],
      [Context.Empty, '\\udc00/', Token.RegularExpression],
      [Context.Empty, 'x\\udc10/', Token.RegularExpression],
      [Context.Empty, '\\udd00y/', Token.RegularExpression],
      [Context.Empty, 'x\\udebcy/', Token.RegularExpression],
      [Context.Empty, 'x\\udebcy/g', Token.RegularExpression],
      [Context.Empty, 'x\\udebcy/im', Token.RegularExpression],
      [Context.Empty, '\\ud800\\udc00/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\udc00/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\udc10/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\udd00y/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\udebcy/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\udebcy/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\udebcy/im', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ud800\\udc00/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\ud810\\udc10/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ud900\\udd00y/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\udabc\\udebcy/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\udabc\\udebcy/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\ud810\\udc10/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ud900\\udd00y/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u1234\\udc00/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\u0567\\udc10/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\uf89a\\udd00y/', Token.RegularExpression],
      [Context.Empty, 'x\\udabc\\udebcy/', Token.RegularExpression],
      [Context.Empty, 'x\\udabc\\udebcy/g', Token.RegularExpression],
      [Context.Empty, 'x\\ud810\\udc10/', Token.RegularExpression],
      [Context.Empty, '\\ud900\\udd00y/', Token.RegularExpression],
      [Context.Empty, '\\u1234\\udc00/', Token.RegularExpression],
      [Context.Empty, 'x\\u0567\\udc10/', Token.RegularExpression],
      [Context.Empty, '\\uf89a\\udd00y/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\ubcde\\udebcy/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\ubcde\\udebcy/y', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u1234\\u1234\\udc00/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\u0567\\u0567\\udc10/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\uf89a\\uf89a\\udd00y/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\uf89a\\udd00\\udd00y/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\ubcde\\udebc\\udebcy/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ud800\\udc00\\udc00/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x\\ud810\\udc10\\udc10/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ud900\\udd00\\udd00y/', Token.RegularExpression],
      [Context.Empty, '[\\0]/', Token.RegularExpression],
      [Context.Empty, '[\\012]/', Token.RegularExpression],
      [Context.Empty, '[\\085]/', Token.RegularExpression],
      [Context.Empty, '[\\n]/', Token.RegularExpression],
      [Context.Empty, '[\\f]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\f]/', Token.RegularExpression],
      [Context.Empty, '[\\1013]/', Token.RegularExpression],
      [Context.Empty, '[\\0313]/', Token.RegularExpression],
      [Context.Empty, '[\\07213]/', Token.RegularExpression],
      [Context.Empty, '[\\023]/', Token.RegularExpression],
      [Context.Empty, '[\\032]/', Token.RegularExpression],
      [Context.Empty, '[\\0432]/', Token.RegularExpression],
      [Context.Empty, '[\\0]/', Token.RegularExpression],
      [Context.Empty, '[\\012]/', Token.RegularExpression],
      [Context.Empty, '[\\085]/', Token.RegularExpression],
      [Context.Empty, '[\\n]/', Token.RegularExpression],
      [Context.Empty, '[\\1013]/', Token.RegularExpression],
      [Context.Empty, '[\\0313]/', Token.RegularExpression],
      [Context.Empty, '(?<abc>)/', Token.RegularExpression],
      [Context.Empty, '(?<!abc>)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<!abc>)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `[\\']/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\"]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\`]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\g/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\zdeff/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\A/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Z/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc\\_/', Token.RegularExpression],
      [Context.Empty, '[\\d][\\12-\\14]{1,}[^\\d]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a\\a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\a/', Token.RegularExpression],
      [Context.Empty, '[\\-]/', Token.RegularExpression],
      [Context.Empty, 'a[^]/', Token.RegularExpression],
      [Context.Empty, '[^]b/', Token.RegularExpression],
      [Context.Empty, 'a[^]b/', Token.RegularExpression],
      [Context.Empty, 'a[^]/', Token.RegularExpression],
      [Context.Empty, '[^]/', Token.RegularExpression],
      [Context.Empty, '[]/', Token.RegularExpression],
      [Context.Empty, 'a[]/', Token.RegularExpression],
      [Context.Empty, 'a[]b/', Token.RegularExpression],
      [Context.Empty, '[]b/', Token.RegularExpression],
      [Context.Empty, '[^]/', Token.RegularExpression],
      [Context.Empty, 'a[^]/', Token.RegularExpression],
      [Context.Empty, '[^]b/', Token.RegularExpression],
      [Context.Empty, 'a[^]b/', Token.RegularExpression],
      [Context.Empty, '[c]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]b/', Token.RegularExpression],
      [Context.Empty, 'a[]b/', Token.RegularExpression],
      [Context.Empty, '[]b/', Token.RegularExpression],
      [Context.Empty, '[^]/', Token.RegularExpression],
      [Context.Empty, 'a[^]/', Token.RegularExpression],
      [Context.Empty, '[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[c]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[j]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[m]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[r]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[s]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[u]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[z]/', Token.RegularExpression],
      [Context.Empty, '[F]/', Token.RegularExpression],
      [Context.Empty, '[J]/', Token.RegularExpression],
      [Context.Empty, '[O]/', Token.RegularExpression],
      [Context.Empty, '[P]/', Token.RegularExpression],
      [Context.Empty, '[^]/', Token.RegularExpression],
      [Context.Empty, '[Q]/', Token.RegularExpression],
      [Context.Empty, '[R]/', Token.RegularExpression],
      [Context.Empty, 'a[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[c]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[j]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[m]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[r]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[s]/', Token.RegularExpression],
      [Context.Empty, '[u]/', Token.RegularExpression],
      [Context.Empty, '[x]/', Token.RegularExpression],
      [Context.Empty, '[z]/', Token.RegularExpression],
      [Context.Empty, '[F]/', Token.RegularExpression],
      [Context.Empty, '[J]/', Token.RegularExpression],
      [Context.Empty, '[O]/', Token.RegularExpression],
      [Context.Empty, '[P]/', Token.RegularExpression],
      [Context.Empty, '[^]/', Token.RegularExpression],
      [Context.Empty, '[Q]/', Token.RegularExpression],
      [Context.Empty, '[R]/', Token.RegularExpression],
      [Context.Empty, 'a[^]b/', Token.RegularExpression],
      [Context.Empty, '[U]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[U]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[Z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[W]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[Kq]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[rD]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[-]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc-]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^-J]/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^-fdsasgJ]/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^Jdsads-]/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^J-]/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^--]/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^---]/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a\\bc]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\bc]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a\\bb]/', Token.RegularExpression],

      [Context.Empty, '[\\-]/', Token.RegularExpression],
      [Context.Empty, '[a\\-c]/', Token.RegularExpression],
      [Context.Empty, '[\\-c]/', Token.RegularExpression],
      [Context.Empty, '[a\\-b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\0]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a\\0]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\0b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a\\0b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[0\\0b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[1\\0b]/', Token.RegularExpression],
      [Context.Empty, '[1\\0b]/', Token.RegularExpression],
      [Context.Empty, '[\\d]/', Token.RegularExpression],
      [Context.Empty, '[\\f]/', Token.RegularExpression],
      [Context.Empty, '[\\v]/', Token.RegularExpression],
      [Context.Empty, '[\\D]/', Token.RegularExpression],
      [Context.Empty, '[\\W]/', Token.RegularExpression],
      [Context.Empty, '[\\S]/', Token.RegularExpression],
      [Context.Empty, '[\\n]/', Token.RegularExpression],
      [Context.Empty, '[abc\\d]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\d]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\f]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\v]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\D]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\W]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\S]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\n]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\d]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\D]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\n]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\r]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\S]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\t]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\v]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\W]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\w]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\fabcd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\dabcd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\nabcd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\rabcd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\Sabcd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\vabcd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\fdeff]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\ddeff]/ ', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\Ddeff]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\ndeff]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\Sdeff]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\vdeff]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\wdeff]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\$abcd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\$abcd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\$]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\$]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\.]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\\\]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\$]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\*]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\+]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\?]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\(]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\)]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\[]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\(]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\)]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\[]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\(]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\)]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\[]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\{]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\}]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\|]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\$]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\\\]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\.]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\*]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\+]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\?]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\(]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\)]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\[]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\]]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\{}]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\}]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[abc\\|]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\^def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\$def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\\\def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\.def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\+def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\)def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\[def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\]def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\{def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\}def]/', Token.RegularExpression],
      [Context.Empty, '[\\|def]/', Token.RegularExpression],
      [Context.Empty, '[\\ci]/', Token.RegularExpression],
      [Context.Empty, '[\\ch]/', Token.RegularExpression],
      [Context.Empty, '[\\ce]/', Token.RegularExpression],
      [Context.Empty, '[\\cd]/', Token.RegularExpression],
      [Context.Empty, '[\\cm]/', Token.RegularExpression],
      [Context.Empty, '[\\co]/', Token.RegularExpression],
      [Context.Empty, '[\\ct]/', Token.RegularExpression],
      [Context.Empty, '[\\cu]/', Token.RegularExpression],
      [Context.Empty, '[\\cw]/', Token.RegularExpression],
      [Context.Empty, '[\\cz]/', Token.RegularExpression],
      [Context.Empty, '[\\cR]/', Token.RegularExpression],
      [Context.Empty, '[\\cO]/', Token.RegularExpression],

      [Context.Empty, '\\d+/ug', Token.RegularExpression],
      [Context.Empty, '\\D/g', Token.RegularExpression],
      [Context.Empty, '\\S+/g', Token.RegularExpression],
      [
        Context.Empty,
        '[\\0-\\x08\\x0E-\\x1F!-\\x9F\\xA1-\\u167F\\u1681-\\u1FFF\\u200B-\\u2027\\u202A-\\u202E\\u2030-\\u205E\\u2060-\\u2FFF\\u3001-\\uFEFE\\uFF00-\\uFFFF]/g',
        Token.RegularExpression
      ],
      [Context.Empty, '[\\0-/:-@[-^`{-\\uFFFF]+/g', Token.RegularExpression],
      [Context.Empty, '[\\0-\\/:-@[-\\^`\\{-\\uFFFF]/g', Token.RegularExpression],
      [
        Context.Empty,
        '[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]+/ug',
        Token.RegularExpression
      ],
      [Context.Empty, '\\S+/g', Token.RegularExpression],
      [Context.Empty, '\\k<a>(?<a>b)\\w\\k<a>/u', Token.RegularExpression],
      [Context.Empty, '(?<a>\\k<a>\\w)../u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^/u', Token.RegularExpression],
      [Context.Empty, '[\\*]/u', Token.RegularExpression],
      [Context.Empty, '[\\+]/u', Token.RegularExpression],
      [Context.Empty, '[\\(]/u', Token.RegularExpression],
      [Context.Empty, '[\\{]/', Token.RegularExpression],
      [Context.Empty, '(?<ಠ_ಠ>a)/u', Token.RegularExpression],
      [Context.Empty, '(?<_\\u200D>a)/u', Token.RegularExpression],
      [Context.Empty, '(?<$>a)/u', Token.RegularExpression],
      [Context.Empty, '(?<_>a)/u', Token.RegularExpression],
      [Context.Empty, '(?<_\\u200C>a)/', Token.RegularExpression],
      [Context.Empty, '(?<_\\u200D>a)/u', Token.RegularExpression],
      [Context.Empty, '(?<π>a)/u', Token.RegularExpression],
      [Context.Empty, '(.)(?<a>a)(?<b>\\1)(\\2)/u', Token.RegularExpression],
      [Context.Empty, '.(?<a>a)(?<b>.)/u', Token.RegularExpression],
      [Context.Empty, '.(?<a>\\w\\w)/u', Token.RegularExpression],
      [Context.Empty, '(?<a>\\w\\w\\w)/u', Token.RegularExpression],
      [Context.Empty, '(?<a>\\w\\w)(?<b>\\w)/u', Token.RegularExpression],
      [Context.Empty, '(?<_>a)/u', Token.RegularExpression],
      [Context.Empty, '(?<a>\\w\\w)(?<b>\\w)/u', Token.RegularExpression],
      [Context.Empty, '(.)(.)|(x)/', Token.RegularExpression],
      [Context.Empty, '\\k<a>(?<a>b)\\wk<a>/', Token.RegularExpression],
      [Context.Empty, '(?<a>\\k<a>\\w)../u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<$>a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '.(?<a>a)(?<b>.)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<a>\\w\\w\\w)/', Token.RegularExpression],
      [Context.Empty, '(?<a>\\w\\w)(?<b>\\w)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<b>b).\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.)(?<a>a)(?<b>\\1)(\\2)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<a>a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<$>a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '.(?<a>\\w\\w)/', Token.RegularExpression],
      [Context.Empty, '(?<a42>a)/', Token.RegularExpression],
      [Context.Empty, '(?<$>a)/', Token.RegularExpression],
      [Context.Empty, '.(?<a>a)(?<b>.)/', Token.RegularExpression],
      [Context.Empty, '(?<a>\\w\\w\\w)/', Token.RegularExpression],
      [Context.Empty, '(?<a>\\w\\w)(?<b>\\w)/', Token.RegularExpression],
      [Context.Empty, '(?<b>b).\\1/', Token.RegularExpression],
      [Context.Empty, '(.)(?<a>a)(?<b>\\1)(\\2)/', Token.RegularExpression],
      [Context.Empty, '(?<a>a)/', Token.RegularExpression],
      [Context.Empty, '(?<a42>a)/', Token.RegularExpression],
      [Context.Empty, '(?<$>a)/', Token.RegularExpression],
      [Context.Empty, '.(?<a>\\w\\w)/', Token.RegularExpression],
      [Context.Empty, '(?<a>\\w\\w)(?<b>\\w)/', Token.RegularExpression],
      [Context.Empty, '\\k<a>(?<b>x)/', Token.RegularExpression],
      [Context.Empty, '\\k<a(?<a>.)/', Token.RegularExpression],
      [Context.Empty, '\\k(?<a>.)/', Token.RegularExpression],
      [Context.Empty, '(?<a>(?<=\\w{3}))f/u', Token.RegularExpression],
      [Context.Empty, '(?<!(?<a>\\d){3})f/u', Token.RegularExpression],
      [Context.Empty, '(?<!(?<a>\\D){3})f/u', Token.RegularExpression],
      [Context.Empty, '(?<!(?<a>\\D){3})f|f/u)', Token.RegularExpression],
      [Context.Empty, '(?<a>(?<!\\D{3}))f|f/u', Token.RegularExpression],
      [Context.Empty, '(?<=(?<a>\\w){6})f/u', Token.RegularExpression],
      [Context.Empty, '(?<=(?<a>\\w){3})f/u', Token.RegularExpression],
      [Context.Empty, '(?<=(?<a>\\w){3})f/u', Token.RegularExpression],
      [Context.Empty, 'b(c)(z)?(.)/', Token.RegularExpression],
      [Context.Empty, '[\\ud800\\udc00]/u', Token.RegularExpression],
      [Context.Empty, '[\\ud800\\udc00]/u', Token.RegularExpression],
      [Context.Empty, '^[\\ud800\\udc00]$/u', Token.RegularExpression],
      [Context.Empty, '^.$/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^[\\ud800\\udc00]$/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^.$/u', Token.RegularExpression],

      [Context.OptionsDisableWebCompat, '[\\|def]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ci]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ch]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ce]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cd]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cm]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\co]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ct]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cu]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cw]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cz]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cR]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cO]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cJ]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cB]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cV]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cW]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cX]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\cY]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x01]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\xf2]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x23]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x45]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x5c]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x67]/', Token.RegularExpression],
      [Context.Empty, '[\\cd]/', Token.RegularExpression],
      [Context.Empty, '[\\cm]/', Token.RegularExpression],
      [Context.Empty, '[\\co]/', Token.RegularExpression],
      [Context.Empty, '[\\ct]/', Token.RegularExpression],
      [Context.Empty, '[\\cu]/', Token.RegularExpression],
      [Context.Empty, '[\\cw]/', Token.RegularExpression],
      [Context.Empty, '[\\cz]/', Token.RegularExpression],
      [Context.Empty, '[\\cR]/', Token.RegularExpression],
      [Context.Empty, '[\\cO]/', Token.RegularExpression],
      [Context.Empty, '[\\cJ]/', Token.RegularExpression],
      [Context.Empty, '[\\cB]/', Token.RegularExpression],
      [Context.Empty, '[\\cV]/', Token.RegularExpression],
      [Context.Empty, '[\\cW]/', Token.RegularExpression],
      [Context.Empty, '[\\cX]/', Token.RegularExpression],
      [Context.Empty, '[\\cY]/', Token.RegularExpression],
      [Context.Empty, '[\\x01]/', Token.RegularExpression],
      [Context.Empty, '[\\xf2]/', Token.RegularExpression],
      [Context.Empty, '[\\x23]/', Token.RegularExpression],
      [Context.Empty, '[\\x45]/', Token.RegularExpression],
      [Context.Empty, '[\\x5c]/', Token.RegularExpression],
      [Context.Empty, '[\\x67]/', Token.RegularExpression],

      [Context.OptionsDisableWebCompat, '1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a()\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '$sup/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(((hello)))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((1)|(12))((3)|(23))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.)\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:(?:hello))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:ab|cd)\\d?/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:x)/', Token.RegularExpression],
      [
        Context.OptionsDisableWebCompat,
        '([A-Za-z_:]|[^\\x00-\\x7F])([A-Za-z0-9_:.-]|[^\\x00-\\x7F])*/',
        Token.RegularExpression
      ],
      [
        Context.OptionsDisableWebCompat,
        '([A-Za-z_:]|[^\\x00-\\x7F])([A-Za-z0-9_:.-]|[^\\x00-\\x7F])*([ \\n\\t\\r]+([A-Za-z_:]|[^\\x00-\\x7F])([A-Za-z0-9_:.-]|[^\\x00-\\x7F])*([ \\n\\t\\r]+)?=([ \\n\\t\\r]+)?("[^<"]*"|\'[^<\']*\'))*([ \\n\\t\\r]+)?/?>?/',
        Token.RegularExpression
      ],
      [
        Context.OptionsDisableWebCompat,
        '([A-Za-z_:]|[^\\x00-\\x7F])([A-Za-z0-9_:.-]|[^\\x00-\\x7F])*([ \\n\\t\\r]+)?>?/',
        Token.RegularExpression
      ],
      [
        Context.OptionsDisableWebCompat,
        '([A-Za-z_:]|[^\\x00-\\x7F])([A-Za-z0-9_:.-]|[^\\x00-\\x7F])*(\\?>|[\\n\\r\\t ][^?]*\\?+([^>?][^?]*\\?+)*>)?/',
        Token.RegularExpression
      ],
      [Context.OptionsDisableWebCompat, '([Nn]?ever|([Nn]othing\\s{1,}))more/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\1)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\d+)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(aa|aabaac|ba|b|c)*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(x)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '1?/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '1?1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '1|12/', Token.RegularExpression],

      [Context.OptionsDisableWebCompat, '[Nn]?evermore/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[Nn]evermore/', Token.RegularExpression],
      [Context.Empty, '[\\0001]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\\\]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\b]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\n\\r\\t ]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\u0020]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^-]*-/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^-]*-([^-][^-]*-)*-/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^-]*-([^-][^-]*-)*->?/', Token.RegularExpression],
      [Context.Empty, '[^<]+/', Token.RegularExpression],
      [Context.Empty, '[a-]/', Token.RegularExpression],
      [Context.Empty, '[a-b]/', Token.RegularExpression],
      [Context.Empty, '[a-z]n/', Token.RegularExpression],
      [Context.Empty, '[a-f]d/', Token.RegularExpression],
      [Context.Empty, '[a-c]*/', Token.RegularExpression],
      [Context.Empty, '[a-b]?/', Token.RegularExpression],

      [Context.OptionsDisableWebCompat, '[a]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[o-o]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[object Math]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[z-z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[|||||||]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^-]*-/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\%/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\.14/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\0/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\;/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\</', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\=/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\>/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\?>|[\\n\\r\\t ][^?]*\\?+([^>?][^?]*\\?+)*>/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\@/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\D/', Token.RegularExpression],
      [Context.Empty, '\\c\u0412/', Token.RegularExpression],
      [Context.Empty, '\\c\u0418/', Token.RegularExpression],
      [Context.Empty, '\\c\u041B/', Token.RegularExpression],
      [Context.Empty, '\\c\u041D/', Token.RegularExpression],
      [Context.Empty, '\\c\u041E/', Token.RegularExpression],
      [Context.Empty, '\\c\u041F/', Token.RegularExpression],
      [Context.Empty, '\\c\u0420/', Token.RegularExpression],
      [Context.Empty, '\\c\u0426/', Token.RegularExpression],
      [Context.Empty, '\\c\u042C/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\d+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\d/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\n/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u0020/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u0042/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u0043/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u0045/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u0049/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\1)a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\1)+\\1\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '|.|/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\1)a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\2)(b)a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u{01D306}/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\u{02}-\\u{003}]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\uD83D\uDCA9-\uD83D\uDCAB]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-b\uD83D\uDCA9-\uD83D\uDCAB]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-b\\uD83D\\uDCA9-\\uD83D\\uDCAB]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\uD83D\uDCA9-\uD83D\uDCABa-b]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9-\\uD83D\\uDCABa-b]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\uD83D\uDCA9\uD83D\uDCAB]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9\\uD83D\\uDCAB]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-b\uD83D\uDCA9\uD83D\uDCAB]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-b\\uD83D\\uDCA9\\uD83D\\uDCAB]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9\\uD83D\\uDCABa-b]/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\uD83D\\uDCA9/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\uD83D\\uDCA9/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:\\uD83D\\uDCA9)/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:\\uD83D\\uDCA9)/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:\\uD83D\\uDCA9)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<=\\$)\\d+(\\.\\d*)?/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<=\\$\\d+\\.)\\d+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<!\\$)\\d+(?:\\.\\d*)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<=\\1(.))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?<!.)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '|.|/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '|.|/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x90]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x89]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\xa1]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\xb2]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\xc3]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x6A]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\xbB]/', Token.RegularExpression],
      [Context.Empty, '[\\x89]/', Token.RegularExpression],
      [Context.Empty, '[\\xa1]/', Token.RegularExpression],
      [Context.Empty, '[\\xb2]/', Token.RegularExpression],
      [Context.Empty, '[\\xc3]/', Token.RegularExpression],
      [Context.Empty, '[\\x6A]/', Token.RegularExpression],
      [Context.Empty, '[\\xbB]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\xEF]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x4e]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\xc3]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\x5f]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\uf89ay]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ud900y]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\ud810]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\udd00\\udd00y]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\udc10\\udc10]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\udc00\\udc00]/', Token.RegularExpression],
      [Context.Empty, '[\\ud900y]/', Token.RegularExpression],
      [Context.Empty, '[x\\ud810]/', Token.RegularExpression],
      [Context.Empty, '[\\udd00\\udd00y]/', Token.RegularExpression],
      [Context.Empty, '[x\\udc10\\udc10]/', Token.RegularExpression],
      [Context.Empty, '[\\udc00\\udc00]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\u1234\\u1234\\udc00]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\u0567\\u0567\\udc10]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\uf89a\\uf89a\\udd00y]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\ubcde\\ubcde\\udebcy]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\u0567\\udc10\\udc10]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\u1234\\udc00\\udc00]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\uf89a\\udd00\\udd00y]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ud800\\ud800\\udc00]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\ud810\\ud810\\udc10]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ud900\\ud900\\udd00y]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\udabc\\udabc\\udebcy]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ud800\\udc00\\ud800]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\ud810\\udc10\\ud810]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ud900\\udd00\\ud900y]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\udabc\\udebc\\udabcy]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ud900\\udd00\\udd00y]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\udabc\\udebc\\udebcy]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\ud800\\udc00\\udc00]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '()/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z\\dx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[A-Z\\Dx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z\\sx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[A-S\\Sx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z\\wx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[A-Z\\Wx]/', Token.RegularExpression],
      [Context.Empty, '[A-Z\\Dx]/', Token.RegularExpression],
      [Context.Empty, '[a-z\\sx]/', Token.RegularExpression],
      [Context.Empty, '[A-S\\Sx]/', Token.RegularExpression],
      [Context.Empty, '[a-z\\wx]/', Token.RegularExpression],
      [Context.Empty, '[A-Z\\Wx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\da-z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\DA-Z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\sa-z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\SA-S]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\wa-z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[x\\WA-Z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\DA-Z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[A-Z\\D]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z\\w]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[A-Z\\W]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z\\d]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[A-Z\\Dx]/', Token.RegularExpression],
      [Context.Empty, '[x\\WA-Z]/', Token.RegularExpression],
      [Context.Empty, '[\\DA-Z]/', Token.RegularExpression],
      [Context.Empty, '[A-Z\\D]/', Token.RegularExpression],
      [Context.Empty, '[a-z\\w]/', Token.RegularExpression],
      [Context.Empty, '[A-Z\\W]/', Token.RegularExpression],
      [Context.Empty, '[a-z\\d]/', Token.RegularExpression],
      [Context.Empty, '[A-Z\\Dx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z\\sx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[A-S\\Sx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[A-Z\\Wx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z\\dx]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[1-9]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\u5000-\\u6000]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\uD83D\\uDCA9]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[+--]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[--0]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[-]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[--]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[---]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[----]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[-----]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[------]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[---------]/', Token.RegularExpression],
      [Context.Empty, '[---]/', Token.RegularExpression],
      [Context.Empty, '[----]/', Token.RegularExpression],
      [Context.Empty, '[-----]/', Token.RegularExpression],
      [Context.Empty, '[------]/', Token.RegularExpression],
      [Context.Empty, '[---------]/', Token.RegularExpression],
      [Context.Empty, 'a(b)/', Token.RegularExpression],
      [Context.Empty, '(b)c/', Token.RegularExpression],
      [Context.Empty, 'a(b)c/', Token.RegularExpression],
      [Context.Empty, '(b)/', Token.RegularExpression],
      [Context.Empty, '((b))/', Token.RegularExpression],
      [Context.Empty, '(a(b))/', Token.RegularExpression],
      [Context.Empty, 'a(a(b))/', Token.RegularExpression],
      [Context.Empty, '(a(b))c/', Token.RegularExpression],
      [Context.Empty, 'a(a(b))c/', Token.RegularExpression],
      [Context.Empty, '((b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(b)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(b)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a(b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(a(b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a(b))c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(a(b))c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a((b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a((b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a(b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(a(b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a(b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(a(b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '()/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:b)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:b)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:(?:b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:a(?:b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:a(?:b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:a(?:b))c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:a(?:b))c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:(?:b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:(?:b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:(?:b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:(?:b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:a(?:b)c)/', Token.RegularExpression],
      [Context.Empty, 'a(?:a(?:b))c/', Token.RegularExpression],
      [Context.Empty, '(?:(?:b)c)/', Token.RegularExpression],
      [Context.Empty, 'a(?:(?:b)c)/', Token.RegularExpression],
      [Context.Empty, '(?:(?:b)c)c/', Token.RegularExpression],
      [Context.Empty, 'a(?:(?:b)c)c/', Token.RegularExpression],
      [Context.Empty, '(?:a(?:b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:a(?:b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:a(?:b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:a(?:b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=b)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=b)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=(?=b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=a(?=b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=a(?=b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=a(?=b))c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=a(?=b))c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=(?=b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=(?=b)c)/', Token.RegularExpression],
      [Context.Empty, 'a(?=a(?=b))/', Token.RegularExpression],
      [Context.Empty, '(?=a(?=b))c/', Token.RegularExpression],
      [Context.Empty, 'a(?=a(?=b))c/', Token.RegularExpression],
      [Context.Empty, '(?=(?=b)c)/', Token.RegularExpression],
      [Context.Empty, 'a(?=(?=b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=(?=b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=(?=b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=a(?=b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=a(?=b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=a(?=b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=a(?=b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!b)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!b)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!(?!b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!a(?!b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!a(?!b))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!a(?!b))c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!a(?!b))c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!(?!b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!(?!b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!(?!b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!(?!b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!a(?!b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!a(?!b)c)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!a(?!b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!a(?!b)c)c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(b(c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(b(?:c)d)e/', Token.RegularExpression],
      [Context.Empty, 'a(?!a(?!b)c)c/', Token.RegularExpression],
      [Context.Empty, '(?!)/', Token.RegularExpression],
      [Context.Empty, 'a(b(c)d)e/', Token.RegularExpression],
      [Context.Empty, 'a(b(?:c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(b(?=c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(b(?!c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:b(c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:b(?:c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:b(?=c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?:b(?!c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=b(c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=b(?:c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=b(?=c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?=b(?!c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!b(c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!b(?:c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!b(?=c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(?!b(?!c)d)e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'abc/gim', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a|ab/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '((a)|(ab))((c)|(bc))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\d{3}|[a-z]{4}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\d{3}|[a-z]{4}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'ab|cd|ef/i', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^1-9]c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^b]c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '/[^a-z]{4}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '/.[\\b]./', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'c[\\b]{3}d/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '/[^\\[\\b\\]]+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u0042/i', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '1?1/mig', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[1234567].{2}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-c\\d]+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'ab[.]?c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[b]c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z][^1-9][a-z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[*&$]{3}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[\\d][\\n][^\\d]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^]a/m', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a[^b-z]\\s+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^\\b]+/g', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\b(\\w+)\\1\\b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '([xu]\\d{2}([A-H]{2})?)\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '([xu]\\d{2}([A-H]{2})?)\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a*)b\\1+/', Token.RegularExpression],
      [
        Context.OptionsDisableWebCompat,
        '((((((((((A))))))))))\\1\\2\\3\\4\\5\\6\\7\\8\\9\\10/',
        Token.RegularExpression
      ],
      [
        Context.OptionsDisableWebCompat,
        '((((((((((A))))))))))\\10\\9\\8\\7\\6\\5\\4\\3\\2\\1/',
        Token.RegularExpression
      ],
      [Context.OptionsDisableWebCompat, '[]a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'q[ax-zb](?=\\s+)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'ab[ercst]de/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[d-h]+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(..(..)..)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a(b(c)))(d(e(f)))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a(b(c)))(d(e(f)))\\2\\5/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a(.?)b\\1c\\1d\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '<body.*>((.*\\n?)*?)<\\/body>/i', Token.RegularExpression],
      [
        Context.OptionsDisableWebCompat,
        '(\\|)([\\w\\x81-\\xff ]*)(\\|)([\\/a-z][\\w:\\/\\.]*\\.[a-z]{3,4})(\\|)/ig',
        Token.RegularExpression
      ],
      [Context.OptionsDisableWebCompat, '([\\S]+([ \\t]+[\\S]+)*)[ \\t]*=[ \\t]*[\\S]+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^(A)?(A.*)$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a)?a/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a|(b)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a)?(a)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^([a-z]+)*[a-z]$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^(([a-z]+)*[a-z]\\.)+[a-z]{2,}$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^(([a-z]+)*([a-z])\\.)+[a-z]{2,}$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '.*a.*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '.+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'b{2,}c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'b{8,}c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\d{1,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(123){1,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(123){1,}x\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x{1,2}x{1,}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=(a+))/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?=(a+))a*b\\1/', Token.RegularExpression],
      [Context.Empty, 'x{1,2}x{1,}/', Token.RegularExpression],
      [Context.Empty, '(?=(a+))/', Token.RegularExpression],
      [Context.Empty, '(?=(a+))a*b\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[Jj]ava([Ss]cript)?(?=\\:)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.*?)a(?!(a+)b\\2c)\\2(.*)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'Java(?!Script)([A-Z]\\w*)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'Java(?!Script)([A-Z]\\w*)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\.(?!com|org)|\\/)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?!a|b)|c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '([Jj]ava([Ss]cript)?)\\sis\\s(fun\\w*)/', Token.RegularExpression],
      [Context.Empty, '(.*?)a(?!(a+)b\\2c)\\2(.*)/', Token.RegularExpression],
      [Context.Empty, 'Java(?!Script)([A-Z]\\w*)/', Token.RegularExpression],
      [Context.Empty, 'Java(?!Script)([A-Z]\\w*)/', Token.RegularExpression],
      [Context.Empty, '(\\.(?!com|org)|\\/)/', Token.RegularExpression],
      [Context.Empty, '(?!a|b)|c/', Token.RegularExpression],
      [Context.Empty, '([Jj]ava([Ss]cript)?)\\sis\\s(fun\\w*)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.{3})(.{4})/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(aa)bcd\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(aa).+\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.{2}).+\\1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(\\d{3})(\\d{3})\\1\\2/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'b{2}c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'b{8}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\s+java\\s+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z]+\\d+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z]+\\d+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[a-z]+(\\d+)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'd+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'o+/', Token.RegularExpression],
      [Context.Empty, '(b+)(b+)(b+)/', Token.RegularExpression],
      [Context.Empty, '(b+)(b*)/', Token.RegularExpression],
      [Context.Empty, 'b*b+/', Token.RegularExpression],
      [Context.Empty, '[^"]*/', Token.RegularExpression],
      [Context.Empty, '[^"]*/', Token.RegularExpression],
      [Context.Empty, '[^"]*/', Token.RegularExpression],
      [Context.Empty, `["'][^"']*["']/`, Token.RegularExpression],
      [Context.Empty, '(x*)(x+)/', Token.RegularExpression],
      [Context.Empty, '/(\\d*)(\\d+)/', Token.RegularExpression],
      [Context.Empty, '/(\\d*)\\d(\\d+)/', Token.RegularExpression],
      [Context.Empty, '/(x+)(x*)/', Token.RegularExpression],
      [Context.Empty, 'x*y+$/', Token.RegularExpression],
      [Context.Empty, '/[\\d]*[\\s]*bc./', Token.RegularExpression],
      [Context.Empty, 'bc..[\\d]*[\\s]*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(b+)(b+)(b+)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(b+)(b*)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'b*b+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^"]*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^"]*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^"]*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, `["'][^"']*["']/`, Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(x*)(x+)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '/(\\d*)(\\d+)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '/(\\d*)\\d(\\d+)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '/(x+)(x*)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x*y+$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '/[\\d]*[\\s]*bc./', Token.RegularExpression],
      [Context.Empty, `["'][^"']*["']/`, Token.RegularExpression],
      [Context.Empty, '(x*)(x+)/', Token.RegularExpression],
      [Context.Empty, '/(\\d*)(\\d+)/', Token.RegularExpression],
      [Context.Empty, '/(\\d*)\\d(\\d+)/', Token.RegularExpression],
      [Context.Empty, '/(x+)(x*)/', Token.RegularExpression],
      [Context.Empty, 'x*y+$/', Token.RegularExpression],
      [Context.Empty, '/[\\d]*[\\s]*bc./', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'bc..[\\d]*[\\s]*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[xyz]*1/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'java(script)?/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'x?y?z?/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\B[^z]{4}\\B/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\B\\w{4}\\B/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^^^^^^^robot$$$$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\B\\B\\B\\B\\B\\Bbot\\b\\b\\b\\b\\b\\b\\b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^.*?$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^.*?/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^.*?(:|$)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^.*(:|$)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\d{2,4}/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'b{2,3}c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'b{42,93}c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'b{0,93}c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'bx{0,93}c/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'e\\b/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\be/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Bevil\\B/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[f-z]e\\B/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\Bo\\B/i', Token.RegularExpression],
      [Context.Empty, '\\be/', Token.RegularExpression],
      [Context.Empty, '\\Bevil\\B/', Token.RegularExpression],
      [Context.Empty, '[f-z]e\\B/', Token.RegularExpression],
      [Context.Empty, '\\Bo\\B/i', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\B\\w\\B/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\w\\B/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\B\\w/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\B[^z]{4}\\B/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\B\\w{4}\\B/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^ab/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^..^e/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^xxx/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^\\^+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^\\d+/m', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\bp/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(z)((a+)?(b+)?(c))*/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(a*)b\\1+/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 's$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'e$/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 's$/m', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '[^e]$/mg', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'es$/mg', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^m/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^m/m', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^p[a-z]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^p[b-z]/m', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^[^p]/m', Token.RegularExpression],
      [Context.Empty, 's$/m', Token.RegularExpression],
      [Context.Empty, '[^e]$/mg', Token.RegularExpression],
      [Context.Empty, 'es$/mg', Token.RegularExpression],
      [Context.Empty, '^m/', Token.RegularExpression],
      [Context.Empty, '^m/m', Token.RegularExpression],
      [Context.Empty, '^p[a-z]/', Token.RegularExpression],
      [Context.Empty, '^p[b-z]/m', Token.RegularExpression],
      [Context.Empty, '^[^p]/m', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.)..|abc/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '.+: gr(a|e)y/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\;/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ /', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\:/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\%([0-9]*)\\[(\\^)?(\\]?[^\\]]*)\\]/', Token.RegularExpression],
      [Context.Empty, '[\\d][\\12-\\14]{1,}[^\\d]/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.)(.)(.)(.)(.)(.)(.)(.)\\8\\8/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.)(.)(.)(.)(.)(.)(.)(.)(.)\\9\\9/', Token.RegularExpression],

      // AnnexB

      [Context.Empty, '[--\\dz]+/', Token.RegularExpression],
      [Context.Empty, '[--\\d]+/', Token.RegularExpression],
      [Context.Empty, '[\\d-a]+/', Token.RegularExpression],
      [Context.Empty, '[\\d-az]+/', Token.RegularExpression],
      [Context.Empty, '[%-\\d]+/', Token.RegularExpression],
      [Context.Empty, '[%-\\dz]+/', Token.RegularExpression],
      [Context.Empty, '[\\s-\\dz]+/', Token.RegularExpression],
      [Context.Empty, '(.)(.)(.)(.)(.)(.)(.)(.)\\8\\8/', Token.RegularExpression],
      [Context.Empty, '(.)(.)(.)(.)(.)(.)(.)(.)(.)\\9\\9/', Token.RegularExpression],
      [Context.Empty, '.(?=Z)?/', Token.RegularExpression],
      [Context.Empty, '.(?=Z)+/', Token.RegularExpression],
      [Context.Empty, '.(?=Z)?/', Token.RegularExpression],
      [Context.Empty, '.(?=Z){2}/', Token.RegularExpression],
      [Context.Empty, '.(?=Z){2,}/', Token.RegularExpression],
      [Context.Empty, '.(?=Z){2,3}/', Token.RegularExpression],
      [Context.Empty, '.(?=Z)??/', Token.RegularExpression],
      [Context.Empty, '.(?=Z){2}?/', Token.RegularExpression],
      [Context.Empty, '.(?=Z){2,}?/', Token.RegularExpression],
      [Context.Empty, '.(?=Z){2,3}?/', Token.RegularExpression],
      [Context.Empty, '.(?=Z){2,3}/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z)*?/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z)??/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z){2}?/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z){2,}?/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z){2,3}?/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z)*?/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z)*?/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z)*?/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z)*?/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z)*/', Token.RegularExpression],
      [Context.Empty, '[a-e](?!Z)+/', Token.RegularExpression],
      [Context.Empty, '[--\\d]+/', Token.RegularExpression],
      [Context.Empty, '[--\\dz]+/', Token.RegularExpression],
      [Context.Empty, '\\400/', Token.RegularExpression],
      [Context.Empty, '\\470/', Token.RegularExpression],
      [Context.Empty, '\\700/', Token.RegularExpression],
      [Context.Empty, '\\770/', Token.RegularExpression],
      [Context.Empty, '\\000/', Token.RegularExpression],
      [Context.Empty, '\\007/', Token.RegularExpression],
      [Context.Empty, '\\070/', Token.RegularExpression],
      [Context.Empty, '\\300/', Token.RegularExpression],
      [Context.Empty, '\\307/', Token.RegularExpression],
      [Context.Empty, '\\370/', Token.RegularExpression],
      [Context.Empty, '(.)(.)(.)(.)(.)(.)(.)(.)\\8\\8/', Token.RegularExpression],
      [Context.Empty, '(.)(.)(.)(.)(.)(.)(.)(.)(.)\\9\\9/', Token.RegularExpression],
      [Context.Empty, '8\\90/', Token.RegularExpression],
      [Context.Empty, 'O\\PQ/', Token.RegularExpression],
      [Context.Empty, '}/', Token.RegularExpression],
      [Context.Empty, '}/', Token.RegularExpression],
      [Context.Empty, '}/', Token.RegularExpression],
      [Context.Empty, '{/', Token.RegularExpression],
      [Context.Empty, 'x{o}x/', Token.RegularExpression],
      [Context.Empty, '\\c0/', Token.RegularExpression],
      [Context.Empty, '[\\c0]/', Token.RegularExpression],
      [Context.Empty, '[\\c00]+/', Token.RegularExpression],
      [Context.Empty, '\\c1/', Token.RegularExpression],
      [Context.Empty, '[\\c1]/', Token.RegularExpression],
      [Context.Empty, '[\\c80]+/', Token.RegularExpression],
      [Context.Empty, '\\c9/.', Token.RegularExpression],
      [Context.Empty, '[\\c90]+/', Token.RegularExpression],
      [Context.Empty, '[\\c_]/', Token.RegularExpression],
      [Context.Empty, '\\c0/', Token.RegularExpression],
      [Context.Empty, '\\c0/', Token.RegularExpression],
      [Context.Empty, '\\c0/', Token.RegularExpression],
      [Context.Empty, '\\c0/', Token.RegularExpression],
      [Context.Empty, '\\c0/', Token.RegularExpression],
      [Context.Empty, '\\c0/', Token.RegularExpression],
      [Context.Empty, '\\u2029/', Token.RegularExpression],
      [Context.Empty, '\\u000D/', Token.RegularExpression],
      [Context.Empty, '\\;/', Token.RegularExpression],
      [Context.Empty, '\\ /', Token.RegularExpression],
      [Context.Empty, '1a//', Token.RegularExpression],
      [Context.Empty, 'aa/', Token.RegularExpression],
      [Context.Empty, 'a\\u0041/', Token.RegularExpression],
      [Context.Empty, '\\u000D/', Token.RegularExpression],
      [Context.Empty, ',\\;/', Token.RegularExpression],
      [Context.Empty, 'a\\\\u000A/', Token.RegularExpression],
      [Context.Empty, '\\u000D/', Token.RegularExpression],
      [Context.Empty, '\\u000D/', Token.RegularExpression],
      [Context.Empty, '^\\S$/u', Token.RegularExpression],
      [Context.Empty, '(?:)/', Token.RegularExpression],
      [Context.Empty, '^a/y', Token.RegularExpression],
      [Context.Empty, '(.+).*\\1/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u2029/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u000D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\;/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\ /', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '1a//', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'aa/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a\\u0041/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u000D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, ',\\;/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, 'a\\\\u000A/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u000D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u000D/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^\\S$/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(?:)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^a/y', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '(.+).*\\1/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u{0}/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u{1}/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u{3f}/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u{000000003f}/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u{3F}/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\u{10ffff}/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '\\k<a>(?<a>x)/', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^.$/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^.$/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^[\\ud800\\udc00]$/u', Token.RegularExpression],
      [Context.OptionsDisableWebCompat, '^[\\ud834\\udf06]$/u', Token.RegularExpression]
    ];

    if (isModule) {
    }

    for (const [ctx, op, token] of tokens) {
      it(`scans '${op}'`, () => {
        const parser = create(op, undefined);
        const found = validateRegularExpressions(parser, ctx);

        t.deepEqual(
          {
            token: tokenDesc(found),
            line: parser.line
          },
          {
            token: tokenDesc(token),
            line: 1
          }
        );
      });
    }
  }
});
