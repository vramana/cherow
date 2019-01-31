import * as t from 'assert';
import { parseExpressions } from '../../../src/cherow';

describe('Miscellaneous - Expression parsing', () => {
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

  it('should parse class expression', () => {
    t.deepEqual(parseExpressions('class foo {}', { ranges: true, module: true }), {
      body: {
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
      },
      end: 12,
      sourceType: 'module',
      start: 0,
      type: 'Program'
    });
  });

  it('should parse object literal', () => {
    t.deepEqual(parseExpressions('{}', { ranges: true }), {
      body: {
        end: 2,
        properties: [],
        start: 0,
        type: 'ObjectExpression'
      },
      end: 2,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    });
  });

  it('should parse paren with identifier', () => {
    t.deepEqual(parseExpressions('(a)', { ranges: true }), {
      body: {
        end: 2,
        name: 'a',
        start: 1,
        type: 'Identifier'
      },
      end: 3,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    });
  });

  it('should parse arrow', () => {
    t.deepEqual(parseExpressions('() => {}', { ranges: true }), {
      body: {
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
      },
      end: 8,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    });
  });

  it('should parse binary expression', () => {
    t.deepEqual(parseExpressions('1 + 1', { ranges: true }), {
      body: {
        end: 5,
        left: {
          end: 1,
          start: 0,
          type: 'Literal',
          value: 1
        },
        operator: '+',
        right: {
          end: 5,
          start: 4,
          type: 'Literal',
          value: 1
        },
        start: 0,
        type: 'BinaryExpression'
      },
      end: 5,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    });
  });

  it('should parse ternary', () => {
    t.deepEqual(parseExpressions('a ? 1 : () => {}', { ranges: true }), {
      body: {
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
      },
      end: 16,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    });
  });
});
