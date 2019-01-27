import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Miscellaneous - Escaped identifiers', () => {
  for (const arg of [
    '(\\u0069mplements = 1);',
    'var impl\\u0065ments = 1;',
    //"var { impl\\u0065ments  } = {};",
    '(\\u0069nterface = 1);',
    'var int\\u0065rface = 1;',
    // "var { int\\u0065rface  } = {};",
    '(p\\u0061ckage = 1);',
    'var packa\\u0067e = 1;',
    // "var { packa\\u0067e  } = {};",
    '(p\\u0072ivate = 1);',
    'var p\\u0072ivate;',
    // "var { p\\u0072ivate } = {};",
    '(prot\\u0065cted);',
    'var prot\\u0065cted = 1;',
    // "var { prot\\u0065cted  } = {};",
    '(publ\\u0069c);',
    'var publ\\u0069c = 1;',
    // "var { publ\\u0069c } = {};",
    '(st\\u0061tic);',
    'var st\\u0061tic = 1;'
    // "var { st\\u0061tic } = {};",
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  for (const arg of [
    'if (true) l\\u0065t: ;',
    'function l\\u0065t() { }',
    '(function l\\u0065t() { })',
    'async function l\\u0065t() { }',
    '(async function l\\u0065t() { })',
    'l\\u0065t => 42',
    'async l\\u0065t => 42',
    'function packag\\u0065() {}',
    'function impl\\u0065ments() {}',
    'function privat\\u0065() {}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
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
    //    ['let l\\u0065t = 1', Context.Empty],
    //    ['const l\\u0065t = 1', Context.Empty],
    //  ['let [l\\u0065t] = 1', Context.Empty],
    // ['const [l\\u0065t] = 1', Context.Empty],
    ['for (let l\\u0065t in {}) {}', Context.Empty],
    ['if ("foo" \\u0069n this) {}', Context.Empty],
    ['if (this \\u0069nstanceof Array) {}', Context.Empty],
    ['(n\\u0065w function f() {})', Context.Empty],
    ['(typ\\u0065of 123)', Context.Empty],
    ['(v\\u006fid 0)', Context.Empty],
    ['do { ; } wh\\u0069le (true) { }', Context.Empty],
    ['(function*() { return (n++, y\\u0069eld 1); })()', Context.Empty],
    ['var \\u0064elete = 123;', Context.Empty],

    ['var \\u{62}\\u{72}\\u{65}\\u{61}\\u{6b} = 123;', Context.Empty],
    ['var \\u0062\\u0072\\u0065\\u0061\\u006b = 123;;', Context.Empty],
    ['var \\u{63}ase = 123;', Context.Empty],
    ['var \\u{63}atch = 123;', Context.Empty],
    ['var \\u{63}ontinue = 123;', Context.Empty],
    ['var fina\\u{6c}ly = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['i\\u0066 (0)', Context.Empty],
    ['var i\\u0066', Context.Empty],
    ['export {a \\u0061s b} from "";', Context.Strict | Context.Module],
    ['export {} fr\\u006fm "";', Context.Strict | Context.Module],
    ['for (a o\\u0066 b);', Context.Empty],
    ['class a { st\\u0061tic m(){} }', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],

    ['(async function() { aw\\u0061it x })', Context.Empty],
    ['(\\u0061sync function() { await x })', Context.Empty],
    ['(\\u0061sync () => { await x })', Context.Empty],
    ['\\u0061sync x => { await x }', Context.Empty],
    ['lass X { \\u0061sync x() { await x } }', Context.Empty],
    ['class X { static \\u0061sync x() { await x } }', Context.Empty],
    ['export \\u0061sync function y() { await x }', Context.Strict | Context.Module],
    ['export default \\u0061sync function () { await x }', Context.Strict | Context.Module],
    ['({ \\u0061sync x() { await x } })', Context.Empty],
    ['for (x \\u006ff y) {}', Context.Empty],
    ['(function* () { y\\u0069eld 10 })', Context.Empty],
    ['(async function() { aw\\u0061it x })', Context.Empty],
    ['i\\u0066 (0)', Context.Empty],
    ['\\u{74}rue', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty],
    ['var \\u{64}\\u{6f} = 123;', Context.Empty]
  ]);

  pass('Miscellaneous - Computed property names', [
    [
      `({i\\u0066: 0})`,
      Context.Empty,
      {
        body: [
          {
            expression: {
              properties: [
                {
                  computed: false,
                  key: {
                    name: 'if',
                    type: 'Identifier'
                  },
                  kind: 'init',
                  method: false,
                  shorthand: false,
                  type: 'Property',
                  value: {
                    type: 'Literal',
                    value: 0
                  }
                }
              ],
              type: 'ObjectExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `var le\\u0074`,
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'let',
                  type: 'Identifier'
                },
                init: null,
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `function *a(){({yi\\u0065ld: 0})}`,
      Context.Empty,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  expression: {
                    properties: [
                      {
                        computed: false,
                        key: {
                          name: 'yield',
                          type: 'Identifier'
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false,
                        type: 'Property',
                        value: {
                          type: 'Literal',
                          value: 0
                        }
                      }
                    ],
                    type: 'ObjectExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              type: 'BlockStatement'
            },
            generator: true,
            id: {
              name: 'a',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `var obj1 = { o\\u010dj2 : { foo1: function() {} } };`,
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'obj1',
                  type: 'Identifier'
                },
                init: {
                  properties: [
                    {
                      computed: false,
                      key: {
                        name: 'očj2',
                        type: 'Identifier'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: false,
                      type: 'Property',
                      value: {
                        properties: [
                          {
                            computed: false,
                            key: {
                              name: 'foo1',
                              type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
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
                        type: 'ObjectExpression'
                      }
                    }
                  ],
                  type: 'ObjectExpression'
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
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
