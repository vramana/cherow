import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Import meta', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['() => import.meta', '() => import.meta', Context.OptionsRanges | Context.OptionsNext | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrowFunctionExpression',
                'body': {
                    'meta': {
                        'type': 'Identifier',
                        'name': 'import',
                        'start': 6,
                        'end': 12
                    },
                    'type': 'MetaProperty',
                    'property': {
                        'type': 'Identifier',
                        'name': 'meta',
                        'start': 13,
                        'end': 17
                    },
                    'start': 6,
                    'end': 17
                },
                'params': [],
                'id': null,
                'async': false,
                'generator': false,
                'expression': true,
                'start': 0,
                'end': 17
            },
            'start': 0,
            'end': 17
        }
    ],
    'start': 0,
    'end': 17
}],
];

pass('Expressions - Import meta (pass)', valids);

});
