import { pass, fail } from '../utils';

describe('Destructuring - Rest parameter', () => {

    const programs = [
        '[]',
        '[a]',
        '[a, b]',
        '[a, ...b]',
        '[...a]',
        '[...[]]',
        '{}',
        '{p: a}',
        '{p: a = 0}',
        '{p: {}}',
        '{p: a, q: b}',
        '{a}',
        '{a, b}',
        '{a = 0}',
    ];

    const functions = [
        (arg: string) => `function f(${arg}) {}`,
        (arg: string) => `function* g(${arg}) {}`,
        (arg: string) => `async function f(${arg}) {}`,
        (arg: string) => `async function* g(${arg}) {}`,
        (arg: string) => `({m(${arg}) {}});`,
        (arg: string) => `({*m(${arg}) {}});`,
        (arg: string) => `(class {m(${arg}) {}});`,
        (arg: string) => `(class { static get(${arg}) {}});`,
        (arg: string) => `(class { static set(${arg}) {}});`,
        (arg: string) => `(class { async m(${arg}) {}});`,
        (arg: string) => `(${arg}) => {};`,
        (arg: string) => `async (${arg}) => {};`,
        (arg: string) => `function f(${arg}) {} (${arg}) => {};`,
    ];

    for (const pattern of programs) {
        for (const fn of functions) {

            // Trailing parameters after rest parameter.
            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern},`),
                next: true
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, x = 0`),
                next: true
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, ...x`),
                next: true
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, ...x`),
                next: true
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, []`),
                next: true
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, {}`),
                next: true
            });

             // Rest parameter with defaults.
            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern} = 0`),
                next: true
            });
        }
    }

    for (const fn of functions) {
        // Missing name, incomplete patterns.
        fail(fn(`...`), {
            source: fn(`...`),
            next: true
        });

        fail(fn(`...[`), {
            source: fn(`...[`),
            next: true
        });

        fail(fn(`...{`), {
            source: fn(`...{`),
            next: true
        });

        // Invalid binding name.
        fail(fn(`...[0]`), {
            source: fn(`...[0]`),
            next: true
        });

        fail(fn(`...[p.q]`), {
            source: fn(`...[p.q]`),
            next: true
        });
    }
});