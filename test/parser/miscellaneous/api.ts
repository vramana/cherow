import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseModule, parseScript, parse } from '../../../src/cherow';

describe('Expressions - API', () => {
  it('should parse script code with "parse"', () => {
    t.deepEqual(
      parse('foo', {
        experimental: true,
        loc: true,
        ranges: true,
        native: true,
        jsx: true,
        webCompat: true,
        onComment: [],
        onToken: [],
        module: true
      }),
      {
        body: [
          {
            expression: {
              name: 'foo',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          }
        ],
        end: 3,
        loc: {
          end: {
            column: 3,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    );
  });

  it('should parse script code', () => {
    t.deepEqual(parseScript('foo', { onComment: function() {}, onToken: function() {}, ecmaVersion: 2015 }), {
      body: [
        {
          expression: {
            name: 'foo',
            type: 'Identifier'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    });
  });

  it('should parse module code', () => {
    t.deepEqual(parseModule('foo'), {
      body: [
        {
          expression: {
            name: 'foo',
            type: 'Identifier'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'module',
      type: 'Program'
    });
  });

  it('should parse with impliedStrict and shebang option', () => {
    t.deepEqual(
      parseScript('foo', {
        impliedStrict: true,
        next: true
      }),
      {
        body: [
          {
            expression: {
              name: 'foo',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    );
  });

  it('should parse with raw option', () => {
    t.deepEqual(
      parseModule('foo', {
        raw: true
      }) as any,
      {
        body: [
          {
            expression: {
              name: 'foo',
              raw: 'foo',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    );
  });

  it('should parse with raw option - string', () => {
    t.deepEqual(
      parseModule('"a"', {
        raw: true
      }) as any,
      {
        body: [
          {
            expression: {
              type: 'Literal',
              raw: '"a"',
              value: 'a'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    );
  });

  it('should parse with globalReturn option', () => {
    t.deepEqual(
      parseModule('return', {
        globalReturn: true,
        next: true
      }) as any,
      {
        body: [
          {
            argument: null,
            type: 'ReturnStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    );
  });

  it('should parse with directive option', () => {
    t.deepEqual(
      parseModule('"abc"', {
        directives: true,
        next: true
      }) as any,
      {
        body: [
          {
            directive: 'abc',
            expression: {
              type: 'Literal',
              raw: '"abc"',
              value: 'abc'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    );
  });
});
