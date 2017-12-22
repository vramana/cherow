import { pass, fail } from '../utils';

describe('Expressions - Spread', () => {

    const invalidSyntax = [
        '[...r, ]',
        '[a, ...r, ]',
        '[a = 0, ...r, ]',
        '[[], ...r, ]',
        '[[...r,]]',
        '[[...r,], ]',
        '[[...r,], a]',
    ];

    const validSyntax = [
        '[, ]',
        '[a, ]',
        '[[], ]',
    ];

    const destructuringForms = [
        (a: any) => `${a} = [];`,
        (a: any) => `var ${a} = [];`,
        (a: any) => `let ${a} = [];`,
        (a: any) => `const ${a} = [];`,
        (a: any) => `(${a}) => {};`,
        (a: any) => `(${a} = []) => {};`,
        (a: any) => `function f(${a}) {}`,
    ];

    for (const invalid of invalidSyntax) {
        for (const fn of destructuringForms) {
            fail(fn(invalid), {
                source: fn(invalid)
            });
        }
    }
    for (const invalid of validSyntax) {
        for (const fn of destructuringForms) {
                   fail(fn(invalid), {
                source: fn(invalid)
            });
         }
    }
});