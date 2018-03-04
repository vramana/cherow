import { pass, fail } from '../test-utils';
import * as t from 'assert';

describe('Miscellaneous - Delegate', () => {
    const delegate: any = [];
    pass('answer = 42', {
        source: 'answer = 42',
        delegate: function(node: any) {},
        expected: {
              body: [
                {
                  expression: {
                    left: {
                      name: 'answer',
                      type: 'Identifier',
                    },
                    operator: '=',
                    right: {
                      type: 'Literal',
                      value: 42,
                    },
                    type: 'AssignmentExpression',
                  },
                  type: 'ExpressionStatement',
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    }
    );

    // multiline comment
    pass('foo /* comment */', {
        source: 'foo /* comment */',
        delegate: function(node: any) {},
        expected: {
              body: [
                {
                  expression: {
                    name: 'foo',
                    type: 'Identifier',
                  },
                  type: 'ExpressionStatement'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    // single line comment
    pass('foo // comment', {
        source: 'foo // comment',
        delegate: function(node: any) {},
        expected: {
              body: [
                {
                  expression: {
                    name: 'foo',
                    type: 'Identifier',
                  },
                  type: 'ExpressionStatement'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

     // single line comment
    pass('foo // comment', {
        source: 'foo // comment',
        comments: true,
        
        delegate: function(node: any) {},
        expected: {
              body: [
                {
                  expression: {
                    name: 'foo',
                    type: 'Identifier',
                  },
                  type: 'ExpressionStatement'
                }
              ],
              comments: [
                {
                  end: 14,
                  start: 4,
                  type: 'SingleLine',
                  value: ' comment',
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });
});