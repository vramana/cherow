import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - With', () => {

  describe('Failure', () => {

    // Esprima issue: https://github.com/jquery/esprima/issues/1877
    fail('with(1) b: function a(){}', Context.Empty, {
      source: 'with(1) b: function a(){}',
    });

    fail('with ({}) async function f() {}', Context.Empty, {
          source: 'with ({}) async function f() {}',
      });

    fail('with ({}) class C {}', Context.Empty, {
        source: 'with ({}) class C {}',
    });

    fail('with ({}) function f() {}', Context.Empty, {
        source: 'with ({}) function f() {}',
    });

    fail('with ({}) label1: label2: function test262() {}', Context.Empty, {
        source: 'with ({}) label1: label2: function test262() {}',
    });

    fail('with ({}) let x;', Context.Empty, {
        source: 'with ({}) let x;',
    });

    fail(`if (false) {
      with ({}) let
      [a] = 0;
  }`,    Context.Empty, {
      source: `if (false) {
        with ({}) let
        [a] = 0;
    }`
  });

  });

  describe('Pass', () => {

    const validSyntax = [
      `with({}){ p1 = 'x1'; }`,
      `if (false) {
        with ({}) let // ASI
        {}
    }`
  ];

    for (const arg of validSyntax) {
      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parse(`${arg}`, undefined, Context.Empty);
          });
      });
  }
  });

});
