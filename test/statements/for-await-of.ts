import { pass, fail } from '../utils';

describe('Statements - For Await of', () => {

        fail(`async function* f() { for await (var x o\\u0066 []) ;  }`, {
            source: 'async function* f() { for await (var x o\\u0066 []) ;  }',
            next: true
        });
});
            