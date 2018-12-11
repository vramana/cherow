import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Generators', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['(function* () { yield *v })', '(function* () { yield *v })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'YieldExpression',
                                'argument': {
                                    'type': 'Identifier',
                                    'name': 'v',
                                    'start': 23,
                                    'end': 24
                                },
                                'delegate': true,
                                'start': 16,
                                'end': 24
                            },
                            'start': 16,
                            'end': 24
                        }
                    ],
                    'start': 14,
                    'end': 26
                },
                'async': false,
                'generator': true,
                'expression': false,
                'id': null,
                'start': 1,
                'end': 26
            },
            'start': 0,
            'end': 27
        }
    ],
    'start': 0,
    'end': 27
}]
];

pass('Expressions - Async function (pass)', valids);

});
