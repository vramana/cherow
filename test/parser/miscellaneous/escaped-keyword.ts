import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous - Escaped identifiers', () => {
  fail('Miscellaneous - Escaped identifiers (failures)', [
    ['import* \\u0061s foo from "./icefapper.js";', Context.Strict | Context.Module],
    ['void \\u0061sync function* f(){};', Context.Strict | Context.Module],
    ['a(1,2\\u0063onst foo = 1;', Context.Empty],
    ['class C { static async method() { void \\u0061wait; }}', Context.Empty],
    ['\\u0063o { } while(0)', Context.Empty]
  ]);
});
