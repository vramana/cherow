import { pass, fail } from '../utils';

describe('Destructuring - Rest parameter', () => {

    const bindingPatterns = [
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
        (p: string) => `function f(${p}) {}`,
        (p: string) => `function* g(${p}) {}`,
        (p: string) => `({m(${p}) {}});`,
        (p: string) => `(class {m(${p}) {}});`,
        (p: string) => `(${p}) => {};`,
    ];

    for (const pattern of bindingPatterns) {
        for (const fn of functions) {

            // Trailing parameters after rest parameter.
            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern},`)
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, x = 0`)
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, ...x`)
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, ...x`)
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, []`)
            });

            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern}, {}`)
            });

             // Rest parameter with defaults.
            fail(fn(`...${pattern},`), {
                source: fn(`...${pattern} = 0`)
            });
        }
    }

    for (const fn of functions) {
        // Missing name, incomplete patterns.
        fail(fn(`...`), {
            source: fn(`...`)
        });

        fail(fn(`...[`), {
            source: fn(`...[`)
        });

        fail(fn(`...{`), {
            source: fn(`...{`)
        });

        // Invalid binding name.
        fail(fn(`...[0]`), {
            source: fn(`...[0]`)
        });

        fail(fn(`...[p.q]`), {
            source: fn(`...[p.q]`)
        });
    }
});