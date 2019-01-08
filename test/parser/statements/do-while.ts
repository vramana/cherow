import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Do while', () => {
  const inValids: Array<[string, Context]> = [
    ['with(1) b: function a(){}', Context.OptionsDisableWebCompat],
    // ['with ({}) async function f() {}', Context.OptionDisablesWebCompat],
    ['with ({}) function f() {}', Context.OptionsDisableWebCompat],
    ['with ({}) let x;', Context.OptionsDisableWebCompat],
    ['while 1 break;', Context.OptionsDisableWebCompat],
    [`while '' break;`, Context.OptionsDisableWebCompat],
    ['while (false) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
    [
      `while({1}){
      break ;
   };`,
      Context.Module
    ]
  ];

  fail('Statements - Do while (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [];

  pass('Statements - Do while (pass)', valids);
});
