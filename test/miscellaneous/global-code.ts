import { pass, fail } from '../utils';

describe('Miscellaneous - Global code', () => {

    fail(`() => { super(); };`, {
        source: `() => { super(); };`,
    });

    fail(`super();`, {
        source: `super();`,
    });

    fail(`super.property;`, {
        source: `super.property;`,
    });
});