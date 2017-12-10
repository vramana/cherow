import { pass, fail } from '../utils';

describe('Expressions - Prefix decreement', () => {

    fail(`"use strict"; --arguments`, {
        source: '"use strict"; --arguments',
    });

    fail(`"use strict"; --eval`, {
        source: '"use strict"; --eval',
    });
});