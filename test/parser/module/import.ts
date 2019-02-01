import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Module - Import', () => {
  const failures = [
    'import',
    'import;',
    'import {};',
    'import {} from;',
    "import {,} from 'a';",
    'import from;',
    "import {function} from 'a';",
    "import {a as function} from 'a';",
    "import {b,,c} from 'a';",
    "import {b,c,,} from 'a';",
    "import * As a from 'a'",
    "import / as a from 'a'",
    "import * as b, a from 'a'",
    "import a as b from 'a'",
    "import a, b from 'a'",
    "import from 'foo';",
    "import 'a',",
    'import { };',
    'import {;',
    'import };',
    'import { , };',
    "import { , } from 'foo';",
    'import { a } from;',
    "import { a } 'foo';",
    "import , from 'foo';",
    `for (let x = 0; false;)
     import v from './decl-pos-import-for-let.js';`,
    "import a , from 'foo';",
    "import a { b, c } from 'foo';",
    'import { null } from "null',
    'import foo, from "bar";',
    'import default from "foo"',
    'import {bar}, {foo} from "foo";',
    'import {bar}, foo from "foo"',
    "{import a from 'b';}",
    "import { {} } from 'foo';",
    "import { !d } from 'foo';",
    "import { 123 } from 'foo';",
    "import { [123] } from 'foo';",
    "import { foo as {a: b = 2} } from 'foo';",
    "import { foo as !d } from 'foo';",
    "import { foo as [123] } from 'foo';",
    "import { foo as {a: b = 2} } from 'foo';",
    "import { for } from 'foo';",
    "import { y as yield } from 'foo'",
    "import { s as static } from 'foo'",
    "import { l as let } from 'foo'",
    "while (false) import v from 'foo'",
    "try { } finally { import v from 'foo'; }",
    "({ set m(x) { import v from 'foo'; } });",
    "class C { method() { import v from 'foo'; } }",
    "import { a as await } from 'foo';",
    "import { x }, def from 'foo';",
    "import def, def2 from 'foo';",
    "import * as x, def from 'foo';",
    "import * as x, * as y from 'foo';",
    "import {x}, {y} from 'foo';",
    "import * as x, {y} from 'foo';",
    'import default from "foo"',
    'import { class } from "foo"',
    'iimport { class, var } from "foo"',
    'import { a as class } from "foo"',
    'import * as class from "foo"',
    'import { foo, bar }',
    'import foo from bar',
    'import * 12',
    'import from;',
    "import from 'm.js';",
    'import { };',
    'import {;',
    'import };',
    'import { , };',
    "import { , } from 'm.js';",
    'import { a } from;',
    "import { a } 'm.js';",
    "import , from 'm.js';",
    "import a , from 'm.js';",
    "import a { b, c } from 'm.js';",
    //    "import arguments from 'm.js';",
    // "import eval from 'm.js';",
    // "import { arguments } from 'm.js';",
    // "import { eval } from 'm.js';",
    // "import { a as arguments } from 'm.js';",
    "import { for } from 'm.js';",
    "import { y as yield } from 'm.js'",
    "import { s as static } from 'm.js'",
    "import { l as let } from 'm.js'",
    "import { a as await } from 'm.js';",
    //"import { a as enum } from 'm.js';",
    'import {a} from "c"; import {b as a} from "c"',
    'import {a} from "c"; import a from "c"',
    'import {a} from "c"; import {b as a} from "c"',
    'import {a} from "c"; import {b, a} from "c"',
    'import {a} from "c"; import {a} from "c";',
    'import a, * as a from "c"',
    'import {a, a as a} from "c"',
    'import a, {b as a} from "c"',
    'import {a, b as a} from "c"',
    'import {a, a, b} from "c"',
    "import { x }, def from 'm.js';",
    "import def, def2 from 'm.js';",
    "import * as x, def from 'm.js';",
    "import * as x, * as y from 'm.js';",
    "import {x}, {y} from 'm.js';",
    "import * as x, {y} from 'm.js';",
    "import a, 12 from 'foo'",
    'import * as a from 12',
    'import {a as b, e as l 12',
    'import icefapper from ;',
    '{ import in_block from ""; }',
    'import {',
    'import { foo',
    'import { foo as ',
    'import { foo as bar ',
    'import { foo as bar, ',
    'import { foo as switch } from "module";',
    'import { foo, , } from "module";',
    'import from;',
    "import from 'm.js';",
    'import { };',
    'import {;',
    'import };',
    'import { , };',
    "import { , } from 'm.js';",
    'import { a } from;',
    "import { a } 'm.js';",
    "import , from 'm.js';",
    "import a , from 'm.js';",
    "import a { b, c } from 'm.js';",
    //    "import arguments from 'm.js';",
    //    "import eval from 'm.js';",
    //  "import { arguments } from 'm.js';",
    //    "import { eval } from 'm.js';",
    //"import { a as arguments } from 'm.js';",
    "import { for } from 'm.js';",
    "import { y as yield } from 'm.js'",
    "import { s as static } from 'm.js'",
    "import { l as let } from 'm.js'",
    "import { a as await } from 'm.js';",
    //"import { a as enum } from 'm.js';",
    "import { x }, def from 'm.js';",
    "import def, def2 from 'm.js';",
    "import * as x, def from 'm.js';",
    "import * as x, * as y from 'm.js';",
    "import {x}, {y} from 'm.js';",
    "import * as x, {y} from 'm.js';",
    `for (const y in [])
          import v from './foo`
  ];

  for (const arg of failures) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  fail('Module - Import (fail)', [
    ['import foo', Context.Strict | Context.Module],
    ['import', Context.Strict | Context.Module],
    ['import;', Context.Strict | Context.Module],
    ['import {}', Context.Strict | Context.Module],
    ['import {} from;', Context.Strict | Context.Module],
    ["import {,} from 'a';", Context.Strict | Context.Module],
    ["import {b,,} from 'a';", Context.Strict | Context.Module],
    ["import {a as function} from 'a';", Context.Strict | Context.Module],
    ["import {b,,c} from 'a';", Context.Strict | Context.Module],
    ["import {b,c,,} from 'a';", Context.Strict | Context.Module],
    ["import * As a from 'a'", Context.Strict | Context.Module],
    ["import / as a from 'a'", Context.Strict | Context.Module],
    ["import * as b, a from 'a'", Context.Strict | Context.Module],
    ["import a as b from 'a'", Context.Strict | Context.Module],
    ["import a, b from 'a'", Context.Strict | Context.Module],
    ["import from 'foo';", Context.Strict | Context.Module],
    ["import 'a',", Context.Strict | Context.Module],
    ['import { };', Context.Strict | Context.Module],
    ['import {;', Context.Strict | Context.Module],
    ['import };', Context.Strict | Context.Module],
    ['import { , };', Context.Strict | Context.Module],
    ["import { , } from 'foo';", Context.Strict | Context.Module],
    ['import { a } from;', Context.Strict | Context.Module],
    ["import { a } 'foo';", Context.Strict | Context.Module],
    ["import , from 'foo';", Context.Strict | Context.Module],
    ["import a , from 'foo';", Context.Strict | Context.Module],
    ["import a { b, c } from 'foo';", Context.Strict | Context.Module],
    ['import { null } from "null', Context.Strict | Context.Module],
    ['import foo, from "bar";', Context.Strict | Context.Module],
    ['import default from "foo"', Context.Strict | Context.Module],
    ['import {bar}, {foo} from "foo";', Context.Strict | Context.Module],
    ['import {bar}, foo from "foo"', Context.Strict | Context.Module],
    ["{import a from 'b';}", Context.Strict | Context.Module],
    ["import { {} } from 'foo';", Context.Strict | Context.Module],
    ["import { !d } from 'foo';", Context.Strict | Context.Module],
    ["import { 123 } from 'foo';", Context.Strict | Context.Module],
    ["import { [123] } from 'foo';", Context.Strict | Context.Module],
    ["import { foo as {a: b = 2} } from 'foo';", Context.Strict | Context.Module],
    ["import { foo as !d } from 'foo';", Context.Strict | Context.Module],
    ["import { foo as [123] } from 'foo';", Context.Strict | Context.Module],
    ["import { foo as {a: b = 2} } from 'foo';", Context.Strict | Context.Module],
    //    ["import { a as enum } from 'foo';", Context.Strict | Context.Module],
    ["import { a as 1 } from 'foo';", Context.Strict | Context.Module],
    ["import { a as [] } from 'foo';", Context.Strict | Context.Module],
    ["import { x }, def from 'foo';", Context.Strict | Context.Module],
    ["import {x}, {y} from 'foo';", Context.Strict | Context.Module],
    ["import * as x, * as y from 'foo';", Context.Strict | Context.Module],
    ["import * as x, {y} from 'foo';", Context.Strict | Context.Module],
    ['import default from "foo"', Context.Strict | Context.Module],
    ['import foo from bar', Context.Strict | Context.Module],
    ['import * 12', Context.Strict | Context.Module],
    ['import {a as b, e as l 12', Context.Strict | Context.Module],
    ['import cherow from ;', Context.Strict | Context.Module],
    ['import cherow from 12', Context.Strict | Context.Module],
    ['import cherow from []', Context.Strict | Context.Module],
    ['import foo, bar from "foo.js";', Context.Strict | Context.Module],
    ['import { foo }, * as ns1 from "foo.js";', Context.Strict | Context.Module],
    ['import [ foo ] from "foo.js";', Context.Strict | Context.Module],
    ['import { foo as ', Context.Strict | Context.Module],
    ['import { foo as switch } from "module";', Context.Strict | Context.Module],
    ['import { foo, , } from "module";', Context.Strict | Context.Module],
    ['import * as a in b from "foo";', Context.Strict | Context.Module],
    ['import {a, a} from "c"', Context.Strict | Context.Module],
    ['import {a, b, a} from "c"', Context.Strict | Context.Module],
    ['import {b, a, a} from "c"', Context.Strict | Context.Module],
    ['import {a, a, b} from "c"', Context.Strict | Context.Module],
    ['import {a, b as a} from "c"', Context.Strict | Context.Module],
    ['import a, {a} from "c"', Context.Strict | Context.Module],
    ['import a, {b as a} from "c"', Context.Strict | Context.Module],
    ['import {a, a as a} from "c"', Context.Strict | Context.Module],
    ['import a, * as a from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import {a} from "c";', Context.Strict | Context.Module],
    ['import {a} from "c"; import {b, a} from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import {b as a} from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import a from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import {b as a} from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import {a as a} from "c"', Context.Strict | Context.Module],
    ['import a from "c"; import * as a from "c"', Context.Strict | Context.Module],
    ['import { foo, bar }', Context.Strict | Context.Module],
    ['import foo { bar } from "bar";', Context.Strict | Context.Module],
    ['import * as foo, {bar} from "foo";', Context.Strict | Context.Module],
    ['import * as foo, {bar} from "foo";', Context.Strict | Context.Module],
    ['import {default as foo}', Context.Strict | Context.Module],
    ['import {bar}, * as foo from "foo";', Context.Strict | Context.Module],
    ['import * from "foo"', Context.Strict | Context.Module],
    ['import { null } from "null"', Context.Strict | Context.Module],
    ['import foo, from "bar";', Context.Strict | Context.Module]
  ]);

  const programs = [
    "import 'foo';",
    "import { a } from 'foo';",
    "import { a, b as d, c, } from 'baz';",
    "import * as thing from 'baz';",
    "import * as thing from 'baz';",
    "import thing from 'foo';",
    "import thing, * as rest from 'foo';",
    "import thing, { a, b, c } from 'foo';",
    "import 'somemodule.js';",
    "import { } from 'm.js';",
    "import { a } from 'm.js';",
    "import { a, b as d, c, } from 'm.js';",
    "import * as thing from 'm.js';",
    "import thing from 'm.js';",
    "import thing, * as rest from 'm.js';",
    "import thing, { a, b, c } from 'm.js';",
    "import { arguments as a } from 'm.js';",
    "import { for as f } from 'm.js';",
    "import { yield as y } from 'm.js';",
    "import { static as s } from 'm.js';",
    "import { let as l } from 'm.js';",
    "import thing from 'a.js'; export {thing};",
    "import {thing} from 'a.js'; export {thing};",
    "import * as thing from 'a.js'; export {thing};",
    "import { arguments as a } from 'baz';",
    "import { for as f } from 'foo';",
    "import {m as mm} from 'm.js';",
    "import {aa} from 'm.js';",
    "import * as loo from 'bar.js';",
    "import * as foob from 'bar.js';",
    "import { yield as y } from 'foo';",
    'import async from "foo";',
    'import { Cocoa as async } from "foo"',
    "import { static as s } from 'foo';",
    "import 'somemodule.js';",
    "import { } from 'm.js';",
    "import { a } from 'm.js';",
    "import { a, b as d, c, } from 'm.js';",
    "import * as thing from 'm.js';",
    "import thing from 'm.js';",
    "import thing, * as rest from 'm.js';",
    "import thing, { a, b, c } from 'm.js';",
    "import { arguments as a } from 'm.js';",
    "import { for as f } from 'm.js';",
    "import { yield as y } from 'm.js';",
    "import { static as s } from 'm.js';",
    "import { let as l } from 'm.js';",
    "import thing from 'a.js'; export {thing};",
    "export {thing}; import thing from 'a.js';",
    "import {thing} from 'a.js'; export {thing};",
    "export {thing}; import {thing} from 'a.js';",
    "import * as thing from 'a.js'; export {thing};",
    "import { let as l } from 'foo';",
    "import { q as z } from 'foo';",
    'import { null as nil } from "bar"',
    'import {bar, baz} from "foo";',
    'import {bar as baz, xyz} from "foo";',
    'import foo, {bar} from "foo";',
    'import a, { b, c as d } from "foo"',
    "import foo, * as bar from 'baz';",
    'import $ from "foo"',
    'import {} from "foo";',
    "import n from 'n.js';",
    'import a from "module";',
    'import b, * as c from "module";',
    'import * as d from "module";',
    'import e, {f as g, h as i, j} from "module";',
    'import {k as l, m} from "module";',
    'import {n, o as p} from "module";',
    "import 'q.js';",
    "import {a} from 'x'",
    "import {a as b} from 'x'",
    "import {a,b} from 'x'",
    "import {a as c,b} from 'x'",
    "import {a,b,} from 'x'",
    "import * as x from 'y'",
    "import {} from 'x'",
    "import {a} from 'x'",
    "import {a as b} from 'x'",
    "import {a,b,} from 'x'",
    "import {a as c,b} from 'x'",
    "import * as x from 'y'",
    "import {a} from 'x'",
    "import {a as b} from 'x'",
    "import {a,b} from 'x'",
    "import {a as c,b} from 'x'",
    "import {a,b,} from 'x'",
    "import * as x from 'y'",
    "import a, {b,c,} from 'd'",
    "import a, {b,} from 'foo'",
    "import {as as as} from 'as'",
    "import a, {as} from 'foo'",
    "import a, {function as c} from 'baz'",
    "import a, {b as c} from 'foo'",
    "import a, * as b from 'a'",
    "import a, {} from 'foo'",
    "import a from 'foo'",
    "import * as a from 'a'",
    "import {m as mm} from 'foo';",
    "import {aa} from 'foo';",
    "import * as foob from 'bar.js';",
    'import { as, get, set, from } from "baz"',
    'import icefapper from "await"'
  ];

  for (const arg of programs) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  // valid tests
  pass('Module - Export', [
    [
      'import {} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import e, {f as g, h as i, j} from "module";',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'e'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'g'
                },
                imported: {
                  type: 'Identifier',
                  name: 'f'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'i'
                },
                imported: {
                  type: 'Identifier',
                  name: 'h'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'j'
                },
                imported: {
                  type: 'Identifier',
                  name: 'j'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'module'
            }
          }
        ]
      }
    ],
    [
      'import {n, o as p} from "module";',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'n'
                },
                imported: {
                  type: 'Identifier',
                  name: 'n'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'p'
                },
                imported: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'module'
            }
          }
        ]
      }
    ],
    [
      'import { as, get, set, from } from "baz"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'as'
                },
                imported: {
                  type: 'Identifier',
                  name: 'as'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'get'
                },
                imported: {
                  type: 'Identifier',
                  name: 'get'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'set'
                },
                imported: {
                  type: 'Identifier',
                  name: 'set'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'from'
                },
                imported: {
                  type: 'Identifier',
                  name: 'from'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'baz'
            }
          }
        ]
      }
    ],
    [
      'import x, * as ns from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'ns'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ]
      }
    ],
    [
      'import $ from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: '$'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ]
      }
    ],
    [
      'import * as d from "module";',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'd'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'module'
            }
          }
        ]
      }
    ],
    [
      'import {n, o as p} from "module";',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'n'
                },
                imported: {
                  type: 'Identifier',
                  name: 'n'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'p'
                },
                imported: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'module'
            }
          }
        ]
      }
    ],
    [
      'import icefapper from "await"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'icefapper'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'await'
            }
          }
        ]
      }
    ],
    [
      'import x from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {a, b} from "c"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                imported: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b'
                },
                imported: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'c'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import * as a from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import x, * as a from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {x,} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {x as z} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x as z,} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {x, z} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x, z,} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x as a, z} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {x, z as b} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x as a, z as b} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      `import("bug_OS12095746_mod0.js")
      .then((m)=>{ console.log('mod0 fail'); })
      .catch((e)=>{ console.log("mod0 catch:"+e.message); });

  import('bug_OS12095746_mod1.js')
      .then((m)=>{ console.log('mod1 fail'); })
      .catch((e)=>{
          console.log('mod1 catch:'+e.message);
          import('bug_OS12095746_mod2.js')
              .then((m)=>{ print('mod2 fail'); })
              .catch((e)=>{ print('mod2 catch:'+e.message); });
          });`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Import'
                      },
                      arguments: [
                        {
                          type: 'Literal',
                          value: 'bug_OS12095746_mod0.js'
                        }
                      ]
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'then'
                    }
                  },
                  arguments: [
                    {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'console'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'log'
                                }
                              },
                              arguments: [
                                {
                                  type: 'Literal',
                                  value: 'mod0 fail'
                                }
                              ]
                            }
                          }
                        ]
                      },
                      params: [
                        {
                          type: 'Identifier',
                          name: 'm'
                        }
                      ],
                      id: null,
                      async: false,
                      expression: false
                    }
                  ]
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'catch'
                }
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Identifier',
                              name: 'console'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'log'
                            }
                          },
                          arguments: [
                            {
                              type: 'BinaryExpression',
                              left: {
                                type: 'Literal',
                                value: 'mod0 catch:'
                              },
                              right: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'e'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'message'
                                }
                              },
                              operator: '+'
                            }
                          ]
                        }
                      }
                    ]
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'e'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: false
                }
              ]
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Import'
                      },
                      arguments: [
                        {
                          type: 'Literal',
                          value: 'bug_OS12095746_mod1.js'
                        }
                      ]
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'then'
                    }
                  },
                  arguments: [
                    {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'console'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'log'
                                }
                              },
                              arguments: [
                                {
                                  type: 'Literal',
                                  value: 'mod1 fail'
                                }
                              ]
                            }
                          }
                        ]
                      },
                      params: [
                        {
                          type: 'Identifier',
                          name: 'm'
                        }
                      ],
                      id: null,
                      async: false,
                      expression: false
                    }
                  ]
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'catch'
                }
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Identifier',
                              name: 'console'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'log'
                            }
                          },
                          arguments: [
                            {
                              type: 'BinaryExpression',
                              left: {
                                type: 'Literal',
                                value: 'mod1 catch:'
                              },
                              right: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'e'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'message'
                                }
                              },
                              operator: '+'
                            }
                          ]
                        }
                      },
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'CallExpression',
                                  callee: {
                                    type: 'Import'
                                  },
                                  arguments: [
                                    {
                                      type: 'Literal',
                                      value: 'bug_OS12095746_mod2.js'
                                    }
                                  ]
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'then'
                                }
                              },
                              arguments: [
                                {
                                  type: 'ArrowFunctionExpression',
                                  body: {
                                    type: 'BlockStatement',
                                    body: [
                                      {
                                        type: 'ExpressionStatement',
                                        expression: {
                                          type: 'CallExpression',
                                          callee: {
                                            type: 'Identifier',
                                            name: 'print'
                                          },
                                          arguments: [
                                            {
                                              type: 'Literal',
                                              value: 'mod2 fail'
                                            }
                                          ]
                                        }
                                      }
                                    ]
                                  },
                                  params: [
                                    {
                                      type: 'Identifier',
                                      name: 'm'
                                    }
                                  ],
                                  id: null,
                                  async: false,
                                  expression: false
                                }
                              ]
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'catch'
                            }
                          },
                          arguments: [
                            {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'BlockStatement',
                                body: [
                                  {
                                    type: 'ExpressionStatement',
                                    expression: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 'print'
                                      },
                                      arguments: [
                                        {
                                          type: 'BinaryExpression',
                                          left: {
                                            type: 'Literal',
                                            value: 'mod2 catch:'
                                          },
                                          right: {
                                            type: 'MemberExpression',
                                            object: {
                                              type: 'Identifier',
                                              name: 'e'
                                            },
                                            computed: false,
                                            property: {
                                              type: 'Identifier',
                                              name: 'message'
                                            }
                                          },
                                          operator: '+'
                                        }
                                      ]
                                    }
                                  }
                                ]
                              },
                              params: [
                                {
                                  type: 'Identifier',
                                  name: 'e'
                                }
                              ],
                              id: null,
                              async: false,
                              expression: false
                            }
                          ]
                        }
                      }
                    ]
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'e'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: false
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'import {x as a, z as b,} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ]
  ]);
});
