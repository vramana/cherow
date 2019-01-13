import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous - Failurea', () => {
  const inValids: Array<[string, Context]> = [
    ['(b\n++c);', Context.Empty],
    ['for (;b\n++c);', Context.Empty],
    ['for (b\n++c;;);', Context.Empty],
    ['if (b\n++c);', Context.Empty],
    ['"\\x";', Context.Empty],

    ['3ea', Context.Empty],
    ['3in []', Context.Empty],
    ['3e+', Context.Empty],
    ['3x0', Context.Empty],
    ['/test', Context.Empty],
    //['{', Context.Empty],
    ['[', Context.Empty],
    ['(a', Context.Empty],
    ['{ return; }', Context.Empty],
    //    [' function null() { }', Context.Empty],
    //    ['[+{a = 0}];', Context.Empty],
    ['for (const of 42);', Context.Empty],
    //    ['var x,;', Context.Empty],
    ['class ', Context.Empty],
    [' function* a({e: a.b}) {}', Context.Empty],
    ['1.e', Context.Empty],
    ['export 3', Context.Module | Context.Strict],
    ['export var await', Context.Module | Context.Strict],
    ['try {} catch (answer()) {} ', Context.Empty]
  ];

  fail('Miscellaneous - Failurea', inValids);
});
