import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource, parseModule } from '../../../src/cherow';

describe('Miscellaneous - Keywords', () => {
  describe('Failure', () => {
    const programs = [
      'break = 1;',
      'case = 1;',
      'continue = 1;',
      'default = 1;',
      'function = 1;',
      'this = 1;',
      'var = 1;',
      'void = 1;',
      'with = 1;',
      'in = 1;',
      'var = 1;',
      'class',
      'if',
      'continue',
      'for',
      'switch',
      'while = 1;',
      'try = 1;'
    ];

    for (const arg of programs) {
      it(`${arg}`, () => {
        t.throws(() => {
          parseSource(`${arg}`, undefined, Context.Empty);
        });
      });

      it(`var ${arg}`, () => {
        t.throws(() => {
          parseSource(`var ${arg}`, undefined, Context.Empty);
        });
      });

      it(`function () { ${arg} }`, () => {
        t.throws(() => {
          parseSource(`function () { ${arg} }`, undefined, Context.Empty);
        });
      });
    }
  });

  for (const arg of [
    `var foo = {}; foo.if;`,
    'var foo = {}; foo.super;',
    'var foo = {}; foo.arguments;',
    'var foo = {}; foo.interface;'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
  }
});
