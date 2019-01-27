import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Miscellaneous - Escaped identifiers', () => {
  fail('Miscellaneous - Escaped identifiers (failures)', [
    ['import* \\u0061s foo from "./icefapper.js";', Context.Strict | Context.Module],
    ['void \\u0061sync function* f(){};', Context.Strict | Context.Module],
    ['a(1,2\\u0063onst foo = 1;', Context.Empty],
    ['class C { static async method() { void \\u0061wait; }}', Context.Empty],
    ['\\u0063o { } while(0)', Context.Empty],
    ['for (var i = 0; i < 100; ++i) { br\\u0065ak; }', Context.Empty],
    ['cl\\u0061ss Foo {}', Context.Empty],
    ['[th\\u{69}s] = []', Context.Empty],
    ['th\\u{69}s', Context.Empty],
    ['[f\\u0061lse] = []', Context.Empty],
    ['f\\u0061lse', Context.Empty],
    ['class C { static async method() { void \u0061wait; }}', Context.Empty],
    ['while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }', Context.Empty],
    ['(function a({ hello: {var:v\\u{0061}r}}) { })', Context.Empty],
    ['[v\\u{0061}r] = obj', Context.Empty],
    ['d\\u0065bugger;', Context.Empty],
    ['d\\u0065lete this.a;', Context.Empty],
    ['t\\u0072y { true } catch (e) {}', Context.Empty],
    ['var x = typ\\u0065of "blah"', Context.Empty],
    ['v\\u0061r a = true', Context.Empty],
    ['thi\\u0073 = 123;', Context.Empty],
    ['i\\u0066 (false) {}', Context.Empty],
    ['for (var i = 0; i < 100; ++i) { br\\u0065ak; }', Context.Empty],
    ['cl\\u0061ss Foo {}', Context.Empty],
    ['var f = f\\u0075nction() {}', Context.Empty],
    ["thr\\u006fw 'boo';", Context.Empty],
    ['w\\u0069th (this.scope) { }', Context.Empty],
    ['(function*() { y\\u0069eld 1; })()', Context.Empty],
    ['n\\u0075ll = 1;', Context.Empty],
    ['(x === tr\\u0075e);', Context.Empty],
    ['do { ; } wh\\u0069le (true) { }', Context.Empty],
    ['class X { st\\u0061tic y() {} }', Context.Empty],
    ['class C { st\\u0061tic set bar() {} }', Context.Empty],
    ['class C { st\\u0061tic *bar() {} }', Context.Empty],
    ['let l\\u0065t = 1', Context.Empty],
    ['const l\\u0065t = 1', Context.Empty],
    ['let [l\\u0065t] = 1', Context.Empty],
    ['const [l\\u0065t] = 1', Context.Empty],
    ['for (let l\\u0065t in {}) {}', Context.Empty],
    ['if ("foo" \\u0069n this) {}', Context.Empty],
    ['if (this \\u0069nstanceof Array) {}', Context.Empty],
    ['(n\\u0065w function f() {})', Context.Empty],
    ['(typ\\u0065of 123)', Context.Empty],
    ['(v\\u006fid 0)', Context.Empty],
    ['do { ; } wh\\u0069le (true) { }', Context.Empty],
    ['(function*() { return (n++, y\\u0069eld 1); })()', Context.Empty]
  ]);

  pass('Miscellaneous - Computed property names', [
    // Escaped 'static' should be allowed anywhere
    [
      `class a { static st\\u0061tic() {} }`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'static',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'a',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `class a { static *st\\u0061tic() {} }`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'static',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: true,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'a',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `class a { static set st\\u0061tic(v) {}}`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'static',
                    type: 'Identifier'
                  },
                  kind: 'set',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [
                      {
                        name: 'v',
                        type: 'Identifier'
                      }
                    ],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'a',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `class a {  get st\\u0061tic() {}}`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'static',
                    type: 'Identifier'
                  },
                  kind: 'get',
                  static: false,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'a',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `class a { st\\u0061t() {} }`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'stat',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: false,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'a',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ]
  ]);
});
