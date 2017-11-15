import { fail } from '../utils/test-utils';

describe('Block scope - Function declarations', () => {

    fail('statement position for statement', '"use strict"; for (;false;) function g() {}');
    fail('statement position for do statement while expression', '"use strict"; do function g() {} while (false)');
    fail('statement position if statement expression', '"use strict"; if (true) function g() {}');
});