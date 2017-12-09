import { pass, fail } from '../utils';

describe('Expressions - Class', () => {
    
    fail(`(class {a:0})`, {
        source: '(class {a:0})',
    });

    fail(`(class {a=0})`, {
        source: '(class {a=0})',
    });

    fail(`(class {a})`, {
        source: '(class {a})',
    });

    fail(`(class {3:0})`, {
        source: '(class {3:0})',
    });

    fail(`(class {[3]:0})`, {
        source: '(class {[3]:0})',
    });

    fail(`(class {)`, {
        source: '(class {)',
    });

    fail(`(class extends a,b {})`, {
        source: '(class extends a,b {})',
    });

    fail(`(class extends !a {})`, {
        source: '(class extends !a {})',
    });

    fail(`(class [a] {})`, {
        source: '(class [a] {})',
    });

    fail(`(class {[a,b](){}})`, {
        source: '(class {[a,b](){}})',
    });
});