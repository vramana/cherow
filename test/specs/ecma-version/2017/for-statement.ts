import { n, fail } from '../../utils/test-utils';

describe('ES2017 - `for` Statement', () => {
    fail('"use strict"; for (var i=0 in j);', '"use strict"; for (var i=0 in j);');
    fail('for (var {x}=0 in y);', 'for (var {x}=0 in y);');
    fail('"use strict"; for (var {x}=0 in y);', '"use strict"; for (var {x}=0 in y);');
    fail('for (var {x}=0 in y);', 'for (var {x}=0 in y);');
    fail('for (var [p]=0 in q);', 'for (var [p]=0 in q);');
    fail('"use strict"; for (var [p]=1 in q);', '"use strict; for (var [p]=1 in q);');
});
