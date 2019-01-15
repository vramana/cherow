import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Next - Import meta', () => {
  fail('Next - Import meta', [
    ['var import.meta', Context.Empty],
    ['([import.meta] = [1])', Context.Empty],
    ['([import.meta] = [1])', Context.Empty],
    ['for (var import.meta of [1]) {}', Context.Empty],
    ['var import.meta', Context.Empty],
    ['var import.meta', Context.Empty],
    ['var import.meta', Context.Empty],
    ['var import.meta', Context.Empty],
    ['var import.meta', Context.Empty]
  ]);

  const validSyntax = [
    'class C {set x(_) { () => import.meta }}',
    'function f() { import.meta}',
    'class C {set x(_) { () => { import.meta } }}',
    '() => import.meta',
    'class C {set x(_) { if (1) { import.meta }}}',
    '({m() { if (1) {} else { import.meta }}})',
    '({m() { while (0) { import.meta }}})',
    '({m() { do { import.meta } while (0)}})',
    'class C {set x(_) { import.meta.url }}',
    'class C {set x(_) { import.meta[0] }}',
    'function f() { import.meta.couldBeMutable = true }',
    'class C {set x(_) { import.meta() }}',
    '({set x(_) { new import.meta.MagicClass}})',
    '({set x(_) { new import.meta}})',
    '({set x(_) { t = [...import.meta]}})',
    'class C {set x(_) { f = {...import.meta} }}',
    'class C {set x(_) { delete import.meta }}',
    "'use strict'; import.meta",
    "'use strict'; () => { import.meta }",
    "'use strict'; () => import.meta",
    "'use strict'; if (1) { import.meta }",
    "'use strict'; if (1) {} else { import.meta }",
    "'use strict'; while (0) { import.meta }",
    "'use strict'; do { import.meta } while (0)",
    "'use strict'; import.meta.url",
    "'use strict'; import.meta[0]",
    "'use strict'; import.meta.couldBeMutable = true",
    "'use strict'; import.meta()",
    "'use strict'; new import.meta.MagicClass",
    "'use strict'; new import.meta",
    "'use strict'; t = [...import.meta]",
    "'use strict'; f = {...import.meta}",
    "'use strict'; delete import.meta",
    'class C {m() { import.meta }}',
    'class C {m() { () => { import.meta } }}',
    'class C {m() { () => import.meta }}',
    'class C {m() { if (1) { import.meta } }}',
    'class C {m() { if (1) {} else { import.meta } }}',
    'class C {m() { while (0) { import.meta } }}',
    '({m() { do { import.meta } while (0)}})',
    '({m() { import.meta.url}})',
    '({m() { import.meta[0]}})',
    '({m() { import.meta.couldBeMutable = true}})',
    '({m() { import.meta()}})',
    '({m() { new import.meta.MagicClass}})',
    '({m: function() {new import.meta}})',
    '({m: function() {t = [...import.meta]}})',
    '({m: function() {f = {...import.meta}}})',
    '({m: function() {delete import.meta}})',
    '({set x(_) {import.meta}})',
    '() => { import.meta }',
    '() => import.meta',
    'if (1) { import.meta }',
    'if (1) {} else { import.meta }',
    "'use strict'; ({m: function() { while (0) { import.meta }}})",
    'function f() { do { import.meta } while (0)}',
    'var f = function() {import.meta.url}',
    'var f = function() {import.meta[0]}',
    'var f = function() {import.meta.couldBeMutable = true}',
    'var f = function() {import.meta()}',
    'var f = function() {new import.meta.MagicClass}',
    'var f = function() {new import.meta}',
    'var f = function() {t = [...import.meta]}',
    'var f = function() {f = {...import.meta}}',
    'var f = function() {delete import.meta}',
    'import.meta',
    '() => { import.meta }',
    '() => import.meta',
    'if (1) { import.meta }',
    'if (1) {} else { import.meta }',
    'while (0) { import.meta }',
    'do { import.meta } while (0)',
    'import.meta.url',
    'import.meta[0]',
    'import.meta.couldBeMutable = true',
    'import.meta()',
    'new import.meta.MagicClass',
    'new import.meta',
    't = [...import.meta]',
    'f = {...import.meta}',
    'delete import.meta',
    'import.meta',
    '() => { import.meta }',
    '() => import.meta',
    'if (1) { import.meta }',
    'if (1) {} else { import.meta }',
    'while (0) { import.meta }',
    'do { import.meta } while (0)',
    'import.meta.url',
    'import.meta[0]',
    'import.meta.couldBeMutable = true',
    'import.meta()',
    'new import.meta.MagicClass',
    'new import.meta',
    't = [...import.meta]',
    'f = {...import.meta}',
    'delete import.meta',
    'import.meta',
    '() => { import.meta }',
    '() => import.meta',
    'if (1) { import.meta }',
    'if (1) {} else { import.meta }',
    'while (0) { import.meta }',
    'do { import.meta } while (0)',
    'import.meta.url',
    'import.meta[0]',
    'import.meta.couldBeMutable = true',
    'import.meta()',
    'new import.meta.MagicClass',
    'new import.meta',
    't = [...import.meta]',
    'f = {...import.meta}',
    'delete import.meta',
    'class C {set x(_) { import.meta[0] }}',
    '() => import.meta',
    'if (1) {} else { import.meta }',
    'import.meta[0]',
    'import.meta.couldBeMutable = true',
    'import.meta()',
    'import.meta',
    '() => { import.meta }',
    '() => import.meta',
    'if (1) { import.meta }',
    'if (1) {} else { import.meta }',
    'while (0) { import.meta }',
    'do { import.meta } while (0)',
    'import.meta.url',
    'import.meta[0]',
    'import.meta.couldBeMutable = true',
    'import.meta()',
    'new import.meta.MagicClass',
    'new import.meta',
    't = [...import.meta]',
    'f = {...import.meta}',
    'delete import.meta'
  ];
  for (const arg of validSyntax) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module | Context.OptionsNext);
      });
    });
  }
  pass('Next - Import.Meta (pass)', [
    [
      `t = [...import.meta]`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            expression: {
              left: {
                name: 't',
                type: 'Identifier'
              },
              operator: '=',
              right: {
                elements: [
                  {
                    argument: {
                      meta: {
                        name: 'import',
                        type: 'Identifier'
                      },
                      property: {
                        name: 'meta',
                        type: 'Identifier'
                      },
                      type: 'MetaProperty'
                    },
                    type: 'SpreadElement'
                  }
                ],
                type: 'ArrayExpression'
              },
              type: 'AssignmentExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `"use strict"; ({m() { while (0) { import.meta } }})`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            expression: {
              type: 'Literal',
              value: 'use strict'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              properties: [
                {
                  computed: false,
                  key: {
                    name: 'm',
                    type: 'Identifier'
                  },
                  kind: 'init',
                  method: true,
                  shorthand: false,
                  type: 'Property',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          body: {
                            body: [
                              {
                                expression: {
                                  meta: {
                                    name: 'import',
                                    type: 'Identifier'
                                  },
                                  property: {
                                    name: 'meta',
                                    type: 'Identifier'
                                  },
                                  type: 'MetaProperty'
                                },
                                type: 'ExpressionStatement'
                              }
                            ],
                            type: 'BlockStatement'
                          },
                          test: {
                            type: 'Literal',
                            value: 0
                          },
                          type: 'WhileStatement'
                        }
                      ],
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
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `"use strict"; ({m() { () => import.meta }})`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            expression: {
              type: 'Literal',
              value: 'use strict'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              properties: [
                {
                  computed: false,
                  key: {
                    name: 'm',
                    type: 'Identifier'
                  },
                  kind: 'init',
                  method: true,
                  shorthand: false,
                  type: 'Property',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          expression: {
                            async: false,
                            body: {
                              meta: {
                                name: 'import',
                                type: 'Identifier'
                              },
                              property: {
                                name: 'meta',
                                type: 'Identifier'
                              },
                              type: 'MetaProperty'
                            },
                            expression: true,
                            id: null,
                            params: [],
                            type: 'ArrowFunctionExpression'
                          },
                          type: 'ExpressionStatement'
                        }
                      ],
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
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `do { import.meta } while (0)`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  expression: {
                    meta: {
                      name: 'import',
                      type: 'Identifier'
                    },
                    property: {
                      name: 'meta',
                      type: 'Identifier'
                    },
                    type: 'MetaProperty'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              type: 'BlockStatement'
            },
            test: {
              type: 'Literal',
              value: 0
            },
            type: 'DoWhileStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `if (1) { import.meta }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            alternate: null,
            consequent: {
              body: [
                {
                  expression: {
                    meta: {
                      name: 'import',
                      type: 'Identifier'
                    },
                    property: {
                      name: 'meta',
                      type: 'Identifier'
                    },
                    type: 'MetaProperty'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              type: 'BlockStatement'
            },
            test: {
              type: 'Literal',
              value: 1
            },
            type: 'IfStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `delete import.meta`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            expression: {
              argument: {
                meta: {
                  name: 'import',
                  type: 'Identifier'
                },
                property: {
                  name: 'meta',
                  type: 'Identifier'
                },
                type: 'MetaProperty'
              },
              operator: 'delete',
              prefix: true,
              type: 'UnaryExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ]
  ]);
});
