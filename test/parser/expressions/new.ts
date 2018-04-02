import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - New', () => {

  describe('Failure', () => {

      const invalidSyntax = [
          'new foo bar',
          'new ) foo',
          'new ++foo',
          'new foo ++',
      ];

      for (const arg of invalidSyntax) {

          it(`${arg}`, () => {
              t.throws(() => {
                  parse(`${arg}`, undefined, Context.Empty);
              });
          });

          it(` var f = ${arg}`, () => {
              t.throws(() => {
                  parse(` var f = ${arg}`, undefined, Context.Strict);
              });
          });
      }
      fail('new.target', Context.Empty, {
          source: 'new.target',
      });

      fail('{ new.target }', Context.Empty, {
          source: '{ new.target }',
      });

      fail('() => new.target', Context.Empty, {
          source: '() => new.target',
      });

      fail('for (var import.meta of [1]) {}', Context.Empty, {
          source: 'for (var import.meta of [1]) {}',
      });

      fail(`new Type[]`, Context.Empty, {
        source: 'new Type[]',
        line: 1
    });
  });

  describe('Pass', () => {

      const validSyntax = [
          'new foo',
          'new foo();',
          'new foo(1);',
          'new foo(1, 2);',
          'new foo()();',
          'new new foo()();',
          'new foo.bar;',
          'new foo.bar();',
          'new foo.bar.baz;',
          'new foo.bar().baz;',
          'new foo[bar];',
          'new foo[bar]();',
          'new foo[bar][baz];',
          'new foo[bar]()[baz];',
          'new foo[bar].baz(baz)()[bar].baz;',
          'new "foo"',
          'new 1',
          'new Button',
          'new Button(a)',
          '(new new Function("this.x = 1")).x;',
          `new new foo()`,
          `new f(...a)`,
          `new f(...a, ...b)`,
          'new(a in b)',
          'new f(...a, b, ...c)',
          'function f(a = new.target){}',
          '(function f(a = new.target){})',
          'function f() { new new.target; }',
          'function f() { new.target(); }',
          'function f() { new["target"]; }',
      ];
      for (const arg of validSyntax) {

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parse(`${arg}`, undefined, Context.Empty);
              });
          });

          it(` var f = ${arg}`, () => {
              t.doesNotThrow(() => {
                  parse(` var f = ${arg}`, undefined, Context.Strict);
              });
          });
      }
  });

});