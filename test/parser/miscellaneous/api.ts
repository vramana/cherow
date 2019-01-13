import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseModule, parseScript, parse } from '../../../src/cherow';

describe('Expressions - Functions', () => {
  it('should parse script code with "parse"', () => {
    t.deepEqual(parse('foo'), {
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

  it('should parse script code', () => {
    t.deepEqual(parseScript('foo'), {
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
