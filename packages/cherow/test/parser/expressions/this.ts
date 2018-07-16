import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - This', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['this', 'this', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ThisExpression',
                'start': 0,
                'end': 4
            },
            'start': 0,
            'end': 4
        }
    ],
    'start': 0,
    'end': 4
}],
];

pass('Expressions - This (pass)', valids);

});
