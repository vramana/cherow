import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';
describe('Statements - Labeled', () => {

  describe('Failure', () => {

      // fail('"use strict"; await: 1;', Context.Module, {
         // source: '"use strict"; await: 1;',
     // });

     fail('"use strict"; yield: 1;', Context.Empty, {
         source: '"use strict"; yield: 1;',
     });

    // fail('yi\\u0065ld: 1;', Context.Empty, {
       //  source: 'yi\\u0065ld: 1;',
    // });

    // fail('"use strict"; yield: 1;', Context.Empty, {
       //  source: '"use strict"; yield: 1;',
    // });

     fail('"use strict"; label: function g() {}', Context.Empty, {
      source: '"use strict"; label: function g() {}',
  });

     fail('a: async function* a(){}', Context.Empty, {
    source: 'a: async function* a(){}',
});
     fail('label: function* g() {}', Context.Empty, {
    source: 'label: function* g() {}',
});

     fail(` L: let
[a] = 0;`,Context.Empty, {
    source: ` L: let
    [a] = 0;`
});

     fail('label: class C {};', Context.Empty, {
  source: 'label: class C {};',
});

     fail('"use strict"; label: function g() {}', Context.Empty, {
        source: '"use strict"; label: function g() {}',
    });

     fail('label: let x;', Context.Empty, {
        source: 'label: let x;',
    });
  });

});
