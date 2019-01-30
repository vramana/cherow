import * as t from 'assert';
import { parseExpressions } from '../../../src/cherow';

describe('Miscellaneous - Expressions', () => {
  it('should parse simple expression', () => {
    t.deepEqual(parseExpressions('foo', { ranges: true }), {
      body: {
        end: 3,
        name: 'foo',
        start: 0,
        type: 'Identifier'
      },
      end: 3,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    });
  });

  it('should parse simple expression + module goal', () => {
    t.deepEqual(parseExpressions('foo', { ranges: true, module: true }), {
      body: {
        end: 3,
        name: 'foo',
        start: 0,
        type: 'Identifier'
      },
      end: 3,
      sourceType: 'module',
      start: 0,
      type: 'Program'
    });
  });
});
