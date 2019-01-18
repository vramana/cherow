import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Template', () => {
  const inValids: Array<[string, Context]> = [
    // ['`\\00`', Context.Empty],
    // ['`a\\00b`', Context.Empty],
    ['`\\xg`;', Context.Empty],
    ['`${x} \\xg ${x}`;', Context.Empty],
    ['`\\xg ${x}`;', Context.Empty],
    ['`template-head${a}', Context.Empty],
    ['`${a}template-tail', Context.Empty],
    ['`template-head${a}template-tail', Context.Empty],
    ['`${a}${b}${c}', Context.Empty],
    ['`a${a}b${b}c${c}', Context.Empty],
    ['`${a}a${b}b${c}c', Context.Empty],
    ['`foo\n\nbar\r\nbaz', Context.Empty],
    ['`foo\n\n${  bar  }\r\nbaz', Context.Empty],
    ['`foo${a /* comment } */`', Context.Empty],
    ['`foo${a /* comment } `*/', Context.Empty],
    ['`foo${a // comment}`', Context.Empty],
    ['`foo${a \n`', Context.Empty],
    ['`foo${a \r\n`', Context.Empty],
    ['`foo${a \r`', Context.Empty],
    ['`foo${/* comment */ a`', Context.Empty],
    ['`foo${// commenta}`', Context.Empty],
    ['`foo${\n a`', Context.Empty],
    ['`foo${\r\n a`', Context.Empty],
    ['`foo${\r a`', Context.Empty],
    ['`foo${fn(}`', Context.Empty],
    ['`hello\\x`', Context.Empty],
    ['`hello\\x${1}`', Context.Empty],
    ['`hello${1}\\x`', Context.Empty],
    ['`hello${1}\\x${2}`', Context.Empty],
    ['`hello\\x\n`', Context.Empty],
    ['`hello\\x\n${1}`', Context.Empty],
    //['`\\08`', Context.Empty],
    //['`\\01`', Context.Empty],
    //['`\\01${0}right`', Context.Empty],
    //['`left${0}\\01`', Context.Empty],
    //['`left${0}\\01${1}right`', Context.Empty],
    //['`\\1`', Context.Empty],
    //['`\\1${0}right`', Context.Empty],
    //['`left${0}\\1`', Context.Empty],
    //['`left${0}\\1${1}right`', Context.Empty],
    ['`\\xg`', Context.Empty],
    ['`\\xg${0}right`', Context.Empty],
    ['`left${0}\\xg`', Context.Empty],
    ['`left${0}\\xg${1}right`', Context.Empty],
    ['`\\xAg`', Context.Empty],
    ['`\\xAg${0}right`', Context.Empty],
    ['`left${0}\\xAg`', Context.Empty],
    ['`left${0}\\xAg${1}right`', Context.Empty],
    ['`\\u0`', Context.Empty],
    ['`\\u0${0}right`', Context.Empty],
    ['`left${0}\\u0`', Context.Empty],
    ['`left${0}\\u0${1}right`', Context.Empty],
    ['`\\u0g`', Context.Empty],
    ['`\\u0g${0}right`', Context.Empty],
    ['`left${0}\\u0g`', Context.Empty],
    ['`left${0}\\u0g${1}right`', Context.Empty],
    ['`\\u00g`', Context.Empty],
    ['`\\u00g${0}right`', Context.Empty],
    ['`left${0}\\u00g`', Context.Empty],
    ['`left${0}\\u00g${1}right`', Context.Empty],
    ['`\\u000g`', Context.Empty],
    ['`\\u000g${0}right`', Context.Empty],
    ['`left${0}\\u000g`', Context.Empty],
    ['`left${0}\\u000g${1}right`', Context.Empty],
    ['`\\u{}`', Context.Empty],
    ['`\\u{}${0}right`', Context.Empty],
    ['`left${0}\\u{}`', Context.Empty],
    ['`left${0}\\u{}${1}right`', Context.Empty],
    ['`\\u{-0}`', Context.Empty],
    ['`\\u{-0}${0}right`', Context.Empty],
    ['`left${0}\\u{-0}`', Context.Empty],
    ['`left${0}\\u{-0}${1}right`', Context.Empty],
    ['`\\u{g}`', Context.Empty],
    ['`\\u{g}${0}right`', Context.Empty],
    ['`left${0}\\u{g}`', Context.Empty],
    ['`left${0}\\u{g}${1}right`', Context.Empty],
    ['`\\u{0`', Context.Empty],
    ['`\\u{0${0}right`', Context.Empty],
    ['`left${0}\\u{0`', Context.Empty],
    ['`left${0}\\u{0${1}right`', Context.Empty],
    ['`\\u{\\u{0}`', Context.Empty],
    ['`\\u{\\u{0}${0}right`', Context.Empty],
    ['`left${0}\\u{\\u{0}`', Context.Empty],
    ['`left${0}\\u{\\u{0}${1}right`', Context.Empty],
    ['`\\u{110000}`', Context.Empty],
    ['`\\u{110000}${0}right`', Context.Empty],
    ['`left${0}\\u{110000}`', Context.Empty],
    ['`left${0}\\u{110000}${1}right`', Context.Empty]
    //['`\\1``\\2`', Context.Empty]

    // ["`foo${1 if}`",Context.Empty],
  ];
  fail('Expressions - Template', inValids);

  const programs = [
    "'use strict'; `no-subst-template`",
    "function foo(){ 'use strict';`template-head${a}`}",
    "function foo(){ 'use strict';`${a}`}",
    "function foo(){ 'use strict';`${a}template-tail`}",
    "'use strict'; `template-head${a}template-tail`",
    "'use strict'; `${a}${b}${c}`",
    "function foo(){ 'use strict';`a${a}b${b}c${c}`}",
    'tag `no-subst-template`',
    //'tag`\\08`',
    //'tag`\\01`',
    // 'tag`\\01${0}right`',
    //'tag`left${0}\\01`',
    // 'tag`left${0}\\01${1}right`',
    // 'tag`\\1`',
    // 'tag`\\1${0}right`',
    // 'tag`left${0}\\1`',
    // 'tag`left${0}\\1${1}right`',
    'tag`\\xg`',
    'tag`\\xg${0}right`',
    'tag`left${0}\\xg`',
    'tag`left${0}\\xg${1}right`',
    'tag`\\xAg`',
    'tag`\\xAg${0}right`',
    'tag`left${0}\\xAg`',
    'tag`left${0}\\xAg${1}right`',
    'tag`\\u0`',
    'tag`\\u0${0}right`',
    'tag`left${0}\\u0`',
    'tag`left${0}\\u0${1}right`',
    'tag`\\u0g`',
    'tag`\\u0g${0}right`',
    'tag`left${0}\\u0g`',
    'tag`left${0}\\u0g${1}right`',
    'tag`\\u00g`',
    'tag`\\u00g${0}right`',
    'tag`left${0}\\u00g`',
    'tag`left${0}\\u00g${1}right`',
    'tag`\\u000g`',
    'tag`\\u000g${0}right`',
    'tag`left${0}\\u000g`',
    'tag`left${0}\\u000g${1}right`',
    'tag`\\u{}`',
    'tag`\\u{}${0}right`',
    'tag`left${0}\\u{}`',
    'tag`left${0}\\u{}${1}right`',
    'tag`\\u{-0}`',
    'tag`\\u{-0}${0}right`',
    'tag`left${0}\\u{-0}`',
    'tag`left${0}\\u{-0}${1}right`',
    'tag`\\u{g}`',
    'tag`\\u{g}${0}right`',
    'tag`left${0}\\u{g}`',
    'tag`left${0}\\u{g}${1}right`',
    'tag`\\u{0`',
    'tag`\\u{0${0}right`',
    'tag`left${0}\\u{0`',
    'tag`left${0}\\u{0${1}right`',
    'tag`\\u{\\u{0}`',
    'tag`\\u{\\u{0}${0}right`',
    'tag`left${0}\\u{\\u{0}`',
    'tag`left${0}\\u{\\u{0}${1}right`',
    'tag`\\u{110000}`',
    'tag`\\u{110000}${0}right`',
    'tag`left${0}\\u{110000}`',
    'tag`left${0}\\u{110000}${1}right`',
    'tag` ${tag`\\u`}`',
    'tag`template-head${a}`',
    'tag `${a}`',
    'tag `${a}template-tail`',
    'tag   `template-head${a}template-tail`',
    'tag\n`${a}${b}${c}`',
    'tag\r\n`a${a}b${b}c${c}`',
    'tag    `${a}a${b}b${c}c`',
    'tag\t`foo\n\nbar\r\nbaz`',
    'tag\r`foo\n\n${  bar  }\r\nbaz`',
    'tag`foo${a /* comment */}`',
    'tag`foo${a // comment\n}`',
    'tag`foo${a \n}`',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    'tag`foo${/* comment */ a}`',
    'tag`foo${// comment\na}`',
    'tag`foo${\n a}`',
    'tag`foo${\r\n a}`',
    'tag`foo${\r a}`',
    "tag`foo${'a' in a}`",
    "'use strict'; tag\r\n`a${a}b${b}c${c}`",
    "'use strict'; tag    `${a}a${b}b${c}c`",
    'function cherow() { var a, b, c; return tag\t`foo\n\nbar\r\nbaz`}',
    'function cherow() { var a, b, c; return tag\r`foo\n\n${  bar  }\r\nbaz`}',
    'function cherow() { var a, b, c; return tag`foo${a /* comment */}`}',
    'function cherow() { var a, b, c; return tag`foo${a // comment\n}`}',
    '`no-subst-template`',
    '`template-head${a}`',
    '`${a}`',
    '`${a}template-tail`',
    '`template-head${a}template-tail`',
    '`${a}${b}${c}`',
    '`a${a}b${b}c${c}`',
    '`${a}a${b}b${c}c`',
    '`foo\n\nbar\r\nbaz`',
    '`foo\n\n${  bar  }\r\nbaz`',
    '`foo${a /* comment */}`',
    '`foo${a // comment\n}`',
    '`foo${a \n}`',
    '`foo${a \r\n}`',
    '`foo${a \r}`',
    '`foo${/* comment */ a}`',
    '`foo${// comment\na}`',
    '`foo${\n a}`',
    '`foo${\r\n a}`',
    '`foo${\r a}`',
    "`foo${'a' in a}`"
  ];

  for (const arg of programs) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  pass('Expressions - Template (pass)', [
    [
      '`foo`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '`foo ${a} and ${b} and ${c} baz`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'Identifier',
                  name: 'c'
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo ',
                    raw: 'foo '
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' and ',
                    raw: ' and '
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' and ',
                    raw: ' and '
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' baz',
                    raw: ' baz'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '{`foo baz`}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'TemplateLiteral',
                  expressions: [],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo baz',
                        raw: 'foo baz'
                      },
                      tail: true
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{`foo ${a} baz`}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'TemplateLiteral',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    }
                  ],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo ',
                        raw: 'foo '
                      },
                      tail: false
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' baz',
                        raw: ' baz'
                      },
                      tail: true
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{`foo ${a} and ${b} and ${c} baz`}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'TemplateLiteral',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    },
                    {
                      type: 'Identifier',
                      name: 'b'
                    },
                    {
                      type: 'Identifier',
                      name: 'c'
                    }
                  ],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo ',
                        raw: 'foo '
                      },
                      tail: false
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' and ',
                        raw: ' and '
                      },
                      tail: false
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' and ',
                        raw: ' and '
                      },
                      tail: false
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' baz',
                        raw: ' baz'
                      },
                      tail: true
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '`foo${{}}baz`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ObjectExpression',
                  properties: []
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '`foo${{a,b}}baz`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      value: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true
                    }
                  ]
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '`foo${{a,b} = x}baz`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '`foo${`foo`}baz`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'TemplateLiteral',
                  expressions: [],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo',
                        raw: 'foo'
                      },
                      tail: true
                    }
                  ]
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '`foo${`foo${bar}baz`}baz`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'TemplateLiteral',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo',
                        raw: 'foo'
                      },
                      tail: false
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'baz',
                        raw: 'baz'
                      },
                      tail: true
                    }
                  ]
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '{`foo ${a} and ${b} and ${`w ${d} x ${e} y ${f} z`} baz`}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'TemplateLiteral',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    },
                    {
                      type: 'Identifier',
                      name: 'b'
                    },
                    {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'Identifier',
                          name: 'd'
                        },
                        {
                          type: 'Identifier',
                          name: 'e'
                        },
                        {
                          type: 'Identifier',
                          name: 'f'
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: 'w ',
                            raw: 'w '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' x ',
                            raw: ' x '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' y ',
                            raw: ' y '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' z',
                            raw: ' z'
                          },
                          tail: true
                        }
                      ]
                    }
                  ],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo ',
                        raw: 'foo '
                      },
                      tail: false
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' and ',
                        raw: ' and '
                      },
                      tail: false
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' and ',
                        raw: ' and '
                      },
                      tail: false
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' baz',
                        raw: ' baz'
                      },
                      tail: true
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '`a ${function(){}} b`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: false,
                  generator: false,
                  id: null
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'a ',
                    raw: 'a '
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' b',
                    raw: ' b'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],

    [
      '`a ${(k)=>{x}} b`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'Identifier',
                          name: 'x'
                        }
                      }
                    ]
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'k'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: false
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'a ',
                    raw: 'a '
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' b',
                    raw: ' b'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f`\\xg ${x}`;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'f'
              },
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: undefined,
                      raw: '\\xg '
                    },
                    tail: false
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: true
                  }
                ]
              }
            }
          }
        ]
      }
    ],

    [
      'function *f(){   x = `1 ${ yield } 2 ${ 3 } 4`   }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        },
                        {
                          type: 'Literal',
                          value: 3
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2 ',
                            raw: ' 2 '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 4',
                            raw: ' 4'
                          },
                          tail: true
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function *f(){   x = `1 ${ yield x } 2`   }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          delegate: false
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2',
                            raw: ' 2'
                          },
                          tail: true
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function *f(){   x = `1 ${ yield x } 2 ${ 3 } 4`   }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          delegate: false
                        },
                        {
                          type: 'Literal',
                          value: 3
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2 ',
                            raw: ' 2 '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 4',
                            raw: ' 4'
                          },
                          tail: true
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'f`${x} \\xg ${x}`;',
      Context.Empty,
      {
        body: [
          {
            expression: {
              quasi: {
                expressions: [
                  {
                    name: 'x',
                    type: 'Identifier'
                  },
                  {
                    name: 'x',
                    type: 'Identifier'
                  }
                ],
                quasis: [
                  {
                    tail: false,
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    }
                  },
                  {
                    tail: false,
                    type: 'TemplateElement',
                    value: {
                      cooked: undefined,
                      raw: ' \\xg '
                    }
                  },
                  {
                    tail: true,
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    }
                  }
                ],
                type: 'TemplateLiteral'
              },
              tag: {
                name: 'f',
                type: 'Identifier'
              },
              type: 'TaggedTemplateExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'function *f(){   x = `1 ${ yield } 2`   }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2',
                            raw: ' 2'
                          },
                          tail: true
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      '`a ${()=>{}} b`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  params: [],
                  id: null,
                  async: false,
                  expression: false
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'a ',
                    raw: 'a '
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' b',
                    raw: ' b'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ],

    [
      '`foo${bar}baz`',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'bar'
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true
                }
              ]
            }
          }
        ]
      }
    ]
  ]);
});
