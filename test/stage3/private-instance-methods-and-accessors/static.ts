import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';

describe('Next - Private instance methods', () => {
  fail('Next - Private instance methods', [
    ['class foo { foo() { delete this.#a }}', Context.OptionsNext],
    ['class foo { foo() { delete this.x.#a } }', Context.OptionsNext],
    ['class foo { foo() { delete this.x().#a } }', Context.OptionsNext],
    ['class foo { foo() { delete f.#a }}', Context.OptionsNext],
    ['class foo { foo() { delete f.x.#a }}', Context.OptionsNext],
    ['class foo { foo() { delete f.x().#a } }', Context.OptionsNext],
    ['class Cat { foo() { delete this.#a }', Context.OptionsNext],
    ['class foo { foo.#{; }', Context.OptionsNext],
    ['class foo { foo.#}; }', Context.OptionsNext],
    ['class foo { foo.#=; }', Context.OptionsNext],
    ['class foo { foo.#888; }', Context.OptionsNext],
    ['class foo { foo.#-; }', Context.OptionsNext],
    ['class foo { new.#[a] }', Context.OptionsNext],
    ['class foo { super.#["a"] }', Context.OptionsNext],
    ['class foo { super.#[a] }', Context.OptionsNext],
    ["class foo { #a = 0\n ['b'](){} }", Context.OptionsNext]
  ]);

  pass('Next - Private instance methods', [
    [
      `class A { get #foo() { return #xValue; } }`,
      Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'get',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: false,
                  type: 'MethodDefinition',
                  value: null
                },
                {
                  computed: false,
                  key: {
                    name: 'foo',
                    type: 'PrivateName'
                  },
                  kind: 'method',
                  static: false,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          argument: {
                            name: 'xValue',
                            type: 'PrivateName'
                          },
                          type: 'ReturnStatement'
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
              type: 'ClassBody'
            },
            id: {
              name: 'A',
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
      `class A { #xValue = 0; }`,
      Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'xValue',
                    type: 'PrivateName'
                  },
                  static: false,
                  type: 'FieldDefinition',
                  value: {
                    type: 'Literal',
                    value: 0
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
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
