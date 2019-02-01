import { Context } from '../../src/common';
import { pass, fail } from '../test-utils';

describe('Experimental - TopLevel Await', () => {
  fail('Declarations - Functions (fail)', [
    ['function foo() {return await 1}', Context.Strict | Context.Module],
    ['function foo() {return await 1}', Context.Strict | Context.Module]
  ]);

  pass('Experimental - Export-ns-from', [
    [
      'await 1',
      Context.OptionsGlobalAwait,
      {
        body: [
          {
            expression: {
              argument: {
                type: 'Literal',
                value: 1
              },
              type: 'AwaitExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ]
  ]);
});
