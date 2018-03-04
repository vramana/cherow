import { pass, fail } from '../test-utils';
import * as t from 'assert';
import { parseScript, parseModule, Delegate } from '../../src/cherow';
import { Program } from '../../src/estree';
import { Token } from '../../src/token';

describe('Miscellaneous - Delegate', () => {
  const delegate: any = [];
  pass('answer = 42', {
      source: 'answer = 42',
      delegate: function(node: any) {},
      expected: {
          body: [{
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
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  // multiline comment
  pass('foo /* comment */', {
      source: 'foo /* comment */',
      delegate: function(node: any) {},
      expected: {
          body: [{
              expression: {
                  name: 'foo',
                  type: 'Identifier',
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  // single line comment
  pass('foo // comment', {
      source: 'foo // comment',
      delegate: function(node: any) {},
      expected: {
          body: [{
              expression: {
                  name: 'foo',
                  type: 'Identifier',
              },
              type: 'ExpressionStatement'
          }, ],
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
          body: [{
              expression: {
                  name: 'foo',
                  type: 'Identifier',
              },
              type: 'ExpressionStatement'
          }],
          comments: [{
              end: 14,
              start: 4,
              type: 'SingleLine',
              value: ' comment',
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  it('should work with delegate', () => {
      let options = {
          range: false
      };
      t.doesNotThrow(function() {
          parseModule('var x', {
              delegate: function f(entry) {
                  return entry;
              }
          });
      });
  });

  it('Locate node at pos', () => {

      function findCallNodeAt(source: any) {

        const entries: any[] = [];

        parseScript(source, {
              ranges: true,
              delegate: (node: any) => {
                  if (node.type === 'CallExpression') {
                      entries.push({
                          start: node.start,
                          end: node.end
                      });
                  }
              }
          });

        return entries;
      }

      const node = findCallNodeAt('if (x === 1) call("hello");');

      t.deepEqual(node[0].start, 13);
      t.deepEqual(node[0].end, 26);
  });

  it('should work with plugins', () => {

    // Create the do-expression plugin
 const doExpressions = function(Parser: any) {

   return class extends Parser {

       public parsePrimaryExpression(context: any, pos: any) {
           return this.token === Token.DoKeyword
           ? this.parseDoExpression(context)
           : super.parsePrimaryExpression(context, pos);

       }

       public parseDoExpression(context: any) {
           const pos = this.getLocation();
           this.expect(context, Token.DoKeyword);
           const body = this.parseBlockStatement(context);
           return this.finishNode(context, pos, {
               type: 'DoExpression',
               body
           });
       }
    };
 };

 function findElseNode(source: any) {

       const entries: any[] = [];

       parseScript(source, {
             plugins: [doExpressions],
             delegate: (node: any) => {
                 if (node.type === 'DoExpression') {
                     entries.push(node);
                 }
             }
         });

       return entries;
     }

 const node = findElseNode('let x = do {}');
 t.deepEqual(node[0].type, 'DoExpression');

 });

});