import * as t from 'assert';
import { parseExpression } from '../../../src/cherow';

describe('Miscellaneous - Expression parsing', () => {
  it('should parse simple expression', () => {
    t.deepEqual(parseExpression('foo', { ranges: true }), {
      end: 3,
      name: 'foo',
      start: 0,
      type: 'Identifier'
    });
  });

  it('should parse simple expression + module goal', () => {
    t.deepEqual(parseExpression('foo', { ranges: true, module: true }), {
      end: 3,
      name: 'foo',
      start: 0,
      type: 'Identifier'
    });
  });

  it('should parse class expression', () => {
    t.deepEqual(parseExpression('class foo {}', { ranges: true, module: true }), {
      body: {
        body: [],
        end: 12,
        start: 10,
        type: 'ClassBody'
      },
      end: 12,
      id: {
        end: 9,
        name: 'foo',
        start: 6,
        type: 'Identifier'
      },
      start: 0,
      superClass: null,
      type: 'ClassExpression'
    });
  });

  it('should parse object literal', () => {
    t.deepEqual(parseExpression('{}', { ranges: true }), {
      end: 2,
      properties: [],
      start: 0,
      type: 'ObjectExpression'
    });
  });

  it('should parse paren with identifier', () => {
    t.deepEqual(parseExpression('(a)', { ranges: true }), {
      end: 2,
      name: 'a',
      start: 1,
      type: 'Identifier'
    });
  });

  it('should parse arrow', () => {
    t.deepEqual(parseExpression('() => {}', { ranges: true }), {
      async: false,
      body: {
        body: [],
        end: 8,
        start: 6,
        type: 'BlockStatement'
      },
      end: 8,
      expression: false,
      id: null,
      params: [],
      start: 0,
      type: 'ArrowFunctionExpression'
    });
  });

  it('should parse binary expression', () => {
    t.deepEqual(parseExpression('1 + 1', { ranges: true, loc: true }), {
      end: 5,
      left: {
        end: 1,
        loc: {
          end: {
            column: 1,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        start: 0,
        type: 'Literal',
        value: 1
      },
      loc: {
        end: {
          column: 5,
          line: 1
        },
        start: {
          column: 0,
          line: 1
        }
      },
      operator: '+',
      right: {
        end: 5,
        loc: {
          end: {
            column: 5,
            line: 1
          },
          start: {
            column: 4,
            line: 1
          }
        },
        start: 4,
        type: 'Literal',
        value: 1
      },
      start: 0,
      type: 'BinaryExpression'
    });
  });

  it('should parse ternary', () => {
    t.deepEqual(parseExpression('a ? 1 : () => {}', { ranges: true }), {
      alternate: {
        async: false,
        body: {
          body: [],
          end: 16,
          start: 14,
          type: 'BlockStatement'
        },
        end: 16,
        expression: false,
        id: null,
        params: [],
        start: 8,
        type: 'ArrowFunctionExpression'
      },
      consequent: {
        end: 5,
        start: 4,
        type: 'Literal',
        value: 1
      },
      end: 16,
      start: 0,
      test: {
        end: 1,
        name: 'a',
        start: 0,
        type: 'Identifier'
      },
      type: 'ConditionalExpression'
    });
  });
});
