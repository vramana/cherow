import { pass, fail } from '../test-utils';

describe('Expressions - Rest spread', () => {

    fail(`let {...{a,b}} = foo`, {
        source: 'let {...{a,b}} = foo',
        message: '`...` must be followed by an identifier in declaration contexts',
        line: 1,
        index: 8,
        column: 8
    });

    fail(`let {...[a,b]} = foo`, {
        source: 'let {...[a,b]} = foo',
        message: '`...` must be followed by an identifier in declaration contexts',
        line: 1,
        index: 8,
        column: 8
    });

    fail(`let {...obj1,...obj2} = foo`, {
        source: 'let {...obj1,...obj2} = foo',
        message: 'Rest elements cannot have a default value',
        line: 1,
        index: 12,
        column: 12
    });

    fail(`let {...x, ...y} = {}`, {
        source: 'let {...x, ...y} = {}',
        line: 1,
        index: 9,
        column: 9
    });

    fail(`function ({...x,}) { z }`, {
        source: 'function ({...x,}) { z }',
        line: 1,
        index: 8,
        column: 8
    });

    fail(`(([a, ...b = 0]) => {})`, {
        source: '(([a, ...b = 0]) => {})',
        line: 1,
        index: 19,
        column: 19
    });

    fail(`(({a, ...b = 0}) => {})`, {
        source: '(({a, ...b = 0}) => {})',
        message: 'Rest elements cannot have a default value',
        line: 1,
        index: 19,
        column: 19
    });

    fail(`let {...{a,b}} = foo`, {
        source: 'let {...{a,b}} = foo',
        message: '`...` must be followed by an identifier in declaration contexts',
        line: 1,
        index: 8,
        column: 8
    });

    fail(`let {...{a,b}} = foo`, {
        source: '"({get x() {}}) => {}',
        line: 1
    });
});