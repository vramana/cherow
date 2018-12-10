import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - New', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['f = function() {() => new.target}', 'f = function() {() => new.target}', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1
                },
                'operator': '=',
                'right': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [
                            {
                                'type': 'ExpressionStatement',
                                'expression': {
                                    'type': 'ArrowFunctionExpression',
                                    'body': {
                                        'meta': {
                                            'type': 'Identifier',
                                            'name': 'new',
                                            'start': 22,
                                            'end': 25
                                        },
                                        'type': 'MetaProperty',
                                        'property': {
                                            'type': 'Identifier',
                                            'name': 'target',
                                            'start': 26,
                                            'end': 32
                                        },
                                        'start': 22,
                                        'end': 32
                                    },
                                    'params': [],
                                    'id': null,
                                    'async': false,
                                    'generator': false,
                                    'expression': true,
                                    'start': 16,
                                    'end': 32
                                },
                                'start': 16,
                                'end': 32
                            }
                        ],
                        'start': 15,
                        'end': 33
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 33
                },
                'start': 0,
                'end': 33
            },
            'start': 0,
            'end': 33
        }
    ],
    'start': 0,
    'end': 33
}]
];

pass('Expressions - New (pass)', valids);

});
