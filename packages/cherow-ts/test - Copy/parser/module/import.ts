import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Module - Import', () => {

  describe('Failures', () => {

      const failures = [
          'import',
          'import;',
          'import {}',
          'import {};',
          'import {} from;',
          'import {,} from \'a\';',
          'import {b,,} from \'a\';',
          'import from;',
          'import {b as,} from \'a\';',
          'import {function} from \'a\';',
          'import {a as function} from \'a\';',
          'import {b,,c} from \'a\';',
          'import {b,c,,} from \'a\';',
          'import * As a from \'a\'',
          'import / as a from \'a\'',
          'import * as b, a from \'a\'',
          'import a as b from \'a\'',
          'import a, b from \'a\'',
          'import from \'foo\';',
          'import \'a\',',
          'import { };',
          'import {;',
          'import };',
          'import { , };',
          'import { , } from \'foo\';',
          'import { a } from;',
          'import { a } \'foo\';',
          'import , from \'foo\';',
          'import a , from \'foo\';',
          'import a { b, c } from \'foo\';',
          'import arguments from \'foo\';',
          'import eval from \'foo\';',
          'import { arguments } from \'foo\';',
          'import { null } from "null',
          'import foo, from "bar";',
          'import default from "foo"',
          'import {bar}, {foo} from "foo";',
          'import {bar}, foo from "foo"',
          '{import a from \'b\';}',
          'import { {} } from \'foo\';',
          'import { !d } from \'foo\';',
          'import { 123 } from \'foo\';',
          'import { [123] } from \'foo\';',
          'import { foo as {a: b = 2} } from \'foo\';',
          'import { foo as !d } from \'foo\';',
          'import { foo as 123 } from \'foo\';',
          'import { foo as [123] } from \'foo\';',
          'import { foo as {a: b = 2} } from \'foo\';',
          'import { eval } from \'foo\';',
          'import { a as arguments } from \'foo\';',
          'import { for } from \'foo\';',
          'import { y as yield } from \'foo\'',
          'import { s as static } from \'foo\'',
          'import { l as let } from \'foo\'',
          'while (false) import v from \'foo\'',
          'try { } finally { import v from \'foo\'; }',
          '({ set m(x) { import v from \'foo\'; } });',
          'class C { method() { import v from \'foo\'; } }',
          'import { arguments } from \'foo\';',
          'import { a as await } from \'foo\';',
          'import { a as enum } from \'foo\';',
          'import { x }, def from \'foo\';',
          'import def, def2 from \'foo\';',
          'import * as x, def from \'foo\';',
          'import * as x, * as y from \'foo\';',
          'import {x}, {y} from \'foo\';',
          'import * as x, {y} from \'foo\';',
          'import default from "foo"',
          'import { class } from "foo"',
          'iimport { class, var } from "foo"',
          'import { a as class } from "foo"',
          'import * as class from "foo"',
          'import { enum } from "foo"',
          'import { foo, bar }',
          'import foo from bar',
          'import * 12',
          'import a, 12 from \'foo\'',
          'import {a as 12} from "foo"',
          'import * as a from 12',
          'import {a as b, e as l 12',
          'import icefapper from ;',
          'import icefapper from {}',
          'import icefapper from 12',
          'import icefapper from /',
          'import icefapper from []',
          'function foo() { import foo from "icefapper.js"; }',
          'import foo, bar from "foo.js";',
          'import { foo }, * as ns1 from "foo.js";',
          'import { foo }',
          'import [ foo ] from "foo.js";',
          '{ import in_block from ""; }',
          'import {',
          'import { foo',
          'import { foo as ',
          'import { foo as bar ',
          'import { foo as bar, ',
          'import { foo as switch } from "module";',
          'import { foo, , } from "module";',
          `for (const y in [])
          import v from './foo`
      ];

      for (const arg of failures) {
          it(`${arg}`, () => {
              t.throws(() => {
                  parse(`${arg}`, undefined, Context.Strict | Context.Module);
              });
          });
      }

      fail('import "foo"', Context.Empty, {
          source: 'import "foo"',
      });

      fail('import icefapper from 12', Context.Strict | Context.Module, {
          source: 'import icefapper from 12',
      });

      fail('import { x }, def from "foo";', Context.Strict | Context.Module, {
          source: 'import { x }, def from "foo";',
      });

      fail('import default from "foo"', Context.Strict | Context.Module, {
          source: 'import default from "foo"',
      });

      fail('import { for } from "foo";', Context.Strict | Context.Module, {
          source: 'import { for } from "foo";',
      });

      fail('import };', Context.Strict | Context.Module, {
          source: 'import };',
      });
  });

  describe('Pass', () => {
      const programs = [
          'import \'foo\';',
          'import { a } from \'foo\';',
          'import { a, b as d, c, } from \'baz\';',
          'import * as thing from \'baz\';',
          'import thing from \'foo\';',
          'import thing, * as rest from \'foo\';',
          'import thing, { a, b, c } from \'foo\';',
          'import { arguments as a } from \'baz\';',
          'import { for as f } from \'foo\';',
          'import { yield as y } from \'foo\';',
          'import { static as s } from \'foo\';',
          'import { let as l } from \'foo\';',
          'import { q as z } from \'foo\';',
          'import { null as nil } from "bar"',
          'import {bar, baz} from "foo";',
          'import {bar as baz, xyz} from "foo";',
          'import foo, {bar} from "foo";',
          'import a, { b, c as d } from "foo"',
          'import foo, * as bar from \'baz\';',
          'import $ from "foo"',
          'import {} from "foo";',
          'import n from \'n.js\';',
          'import \'q.js\';',
          'import a, {b,c,} from \'d\'',
          'import a, {b,} from \'foo\'',
          'import {as as as} from \'as\'',
          'import a, {as} from \'foo\'',
          'import a, {function as c} from \'baz\'',
          'import a, {b as c} from \'foo\'',
          'import a, * as b from \'a\'',
          'import a, {} from \'foo\'',
          'import a from \'foo\'',
          'import * as a from \'a\'',
          'import {m as mm} from \'foo\';',
          'import {aa} from \'foo\';',
          'import * as foob from \'bar.js\';',
          'import { as, get, set, from } from "baz"',
          'import icefapper from "await"',
      ];

      for (const arg of programs) {

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parse(`${arg}`, undefined, Context.Strict | Context.Module);
              });
          });
      }
  });
});
