import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Object Spread', () => {
  const validSyntax = [
    '{ ...y }',
    '{ a: 1, ...y }',
    '{ b: 1, ...y }',
    '{ y, ...y}',
    '{ ...z = y}',
    '{ ...y, y }',
    '{ ...y, ...y}',
    '{ a: 1, ...y, b: 1}',
    '{ ...y, b: 1}',
    '{ ...1}',
    '{ ...null}',
    '{ ...undefined}',
    '{ ...1 in {}}',
    '{ ...[]}',
    '{ ...async function() { }}',
    '{ ...new Foo()}'
  ];
  for (const arg of validSyntax) {
    it(`x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`x = ${arg};`, undefined, Context.Empty);
      });
    });

    it(`x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`x = ${arg};`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`"use strict"; x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`x = ${arg};`, undefined, Context.Empty);
      });
    });
  }
});
