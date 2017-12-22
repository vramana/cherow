import { pass, fail } from '../utils';

describe('Statements - For Await of', () => {

    for (const decl of ['', 'var', 'let', 'const']) {
        for (const head of ['a', 'a = 0', 'a, b', '[a]', '[a] = 0', '{a}', '{a} = 0']) {

            // Ends with C-style for loop syntax.
            fail(`for await (${decl} ${head} ;;) ;`, {
                source: `for await (${decl} ${head} ;;) ;`,
                next: true
            });

            // Ends with for-in loop syntax.
            fail(`for await (${decl} ${head} in null) ;`, {
                source: `for await (${decl} ${head} in null) ;`,
                next: true
            });
        }
    }

        fail(`async function* f() { for await (var x o\\u0066 []) ;  }`, {
            source: 'async function* f() { for await (var x o\\u0066 []) ;  }',
            next: true
        });
});
