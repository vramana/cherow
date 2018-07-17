import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Module - Import', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['import {} from "y"', 'import {} from "y"', Context.OptionsRanges | Context.Module, {
      "body": [
        {
          "end": 18,
          "source": {
            "end": 18,
            "raw": null,
            "start": 15,
            "type": "Literal",
            "value": "y",
          },
          "specifiers": [],
          "start": 0,
         "type": "ImportDeclaration"
        }
     ],
      "end": 18,
      "sourceType": "module",
      "start": 0,
      "type": "Program"
    }],
  ['import e, {f as g, h as i, j} from "module";', 'import e, {f as g, h as i, j} from "module";', Context.OptionsRanges | Context.Module, {
    "type": "Program",
    "sourceType": "module",
    "body": [
        {
            "type": "ImportDeclaration",
            "specifiers": [
                {
                    "type": "ImportDefaultSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "e",
                        "start": 7,
                        "end": 8
                    },
                    "start": 7,
                    "end": 8
                },
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "g",
                        "start": 16,
                        "end": 17
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "f",
                        "start": 11,
                        "end": 12
                    },
                    "start": 11,
                    "end": 17
                },
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "i",
                        "start": 24,
                        "end": 25
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "h",
                        "start": 19,
                        "end": 20
                    },
                    "start": 19,
                    "end": 25
                },
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "j",
                        "start": 27,
                        "end": 28
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "j",
                        "start": 27,
                        "end": 28
                    },
                    "start": 27,
                    "end": 28
                }
            ],
            "source": {
                "type": "Literal",
                raw: null,
                "value": "module",
                "start": 35,
                "end": 43
            },
            "start": 0,
            "end": 44
        }
    ],
    "start": 0,
    "end": 44
}],
  ['import {n, o as p} from "module";', 'import {n, o as p} from "module";', Context.OptionsRanges | Context.Module, {
    "type": "Program",
    "sourceType": "module",
    "body": [
        {
            "type": "ImportDeclaration",
            "specifiers": [
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "n",
                        "start": 8,
                        "end": 9
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "n",
                        "start": 8,
                        "end": 9
                    },
                    "start": 8,
                    "end": 9
                },
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "p",
                        "start": 16,
                        "end": 17
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "o",
                        "start": 11,
                        "end": 12
                    },
                    "start": 11,
                    "end": 17
                }
            ],
            "source": {
                "type": "Literal",
                raw: null,
                "value": "module",
                "start": 24,
                "end": 32
            },
            "start": 0,
            "end": 33
        }
    ],
    "start": 0,
    "end": 33
}],
  ['import { as, get, set, from } from "baz"', 'import { as, get, set, from } from "baz"', Context.OptionsRanges | Context.Module, {
    "type": "Program",
    "sourceType": "module",
    "body": [
        {
            "type": "ImportDeclaration",
            "specifiers": [
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "as",
                        "start": 9,
                        "end": 11
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "as",
                        "start": 9,
                        "end": 11
                    },
                    "start": 9,
                    "end": 11
                },
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "get",
                        "start": 13,
                        "end": 16
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "get",
                        "start": 13,
                        "end": 16
                    },
                    "start": 13,
                    "end": 16
                },
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "set",
                        "start": 18,
                        "end": 21
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "set",
                        "start": 18,
                        "end": 21
                    },
                    "start": 18,
                    "end": 21
                },
                {
                    "type": "ImportSpecifier",
                    "local": {
                        "type": "Identifier",
                        "name": "from",
                        "start": 23,
                        "end": 27
                    },
                    "imported": {
                        "type": "Identifier",
                        "name": "from",
                        "start": 23,
                        "end": 27
                    },
                    "start": 23,
                    "end": 27
                }
            ],
            "source": {
                "type": "Literal",
                raw: null,
                "value": "baz",
                "start": 35,
                "end": 40
            },
            "start": 0,
            "end": 40
        }
    ],
    "start": 0,
    "end": 40
}],
  ['import a, {as} from \'foo\'', 'import a, {as} from \'foo\'', Context.OptionsRanges | Context.Module, {
      "body": [
        {
          "end": 25,
          "source": {
            "end": 25,
            "raw": null,
            "start": 20,
            "type": "Literal",
            "value": "foo",
          },
         "specifiers": [
            {
              "end": 8,
              "local": {
                "end": 8,
                "name": "a",
                "start": 7,
                "type": "Identifier",
             },
              "start": 7,
              "type": "ImportDefaultSpecifier",
            },
            {
              "end": 13,
              "imported": {
                "end": 13,
                "name": "as",
                "start": 11,
               "type": "Identifier",
              },
              "local": {
                "end": 13,
                "name": "as",
                "start": 11,
                "type": "Identifier",
              },
              "start": 11,
              "type": "ImportSpecifier",
            },
          ],
          "start": 0,
          "type": "ImportDeclaration",
        },
      ],
      "end": 25,
      "sourceType": "module",
     "start": 0,
      "type": "Program",
    }],
  ['import $ from "foo"', 'import $ from "foo"', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ImportDeclaration',
            'specifiers': [
                {
                    'type': 'ImportDefaultSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': '$',
                        'start': 7,
                        'end': 8
                    },
                    'start': 7,
                    'end': 8
                }
            ],
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'foo',
                'start': 14,
                'end': 19
            },
            'start': 0,
            'end': 19
        }
    ],
    'start': 0,
    'end': 19
}],
['import * as d from "module";', 'import * as d from "module";', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ImportDeclaration',
          'specifiers': [
              {
                  'type': 'ImportNamespaceSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'd',
                      'start': 12,
                      'end': 13
                  },
                  'start': 7,
                  'end': 13
              }
          ],
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'module',
              'start': 19,
              'end': 27
          },
          'start': 0,
          'end': 28
      }
  ],
  'start': 0,
  'end': 28
}],
['import {n, o as p} from "module";', 'import {n, o as p} from "module";', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ImportDeclaration',
          'specifiers': [
              {
                  'type': 'ImportSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'n',
                      'start': 8,
                      'end': 9
                  },
                  'imported': {
                      'type': 'Identifier',
                      'name': 'n',
                      'start': 8,
                      'end': 9
                  },
                  'start': 8,
                  'end': 9
              },
              {
                  'type': 'ImportSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'p',
                      'start': 16,
                      'end': 17
                  },
                  'imported': {
                      'type': 'Identifier',
                      'name': 'o',
                      'start': 11,
                      'end': 12
                  },
                  'start': 11,
                  'end': 17
              }
          ],
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'module',
              'start': 24,
              'end': 32
          },
          'start': 0,
          'end': 33
      }
  ],
  'start': 0,
  'end': 33
}],
['import icefapper from "await"', 'import icefapper from "await"', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ImportDeclaration',
          'specifiers': [
              {
                  'type': 'ImportDefaultSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'icefapper',
                      'start': 7,
                      'end': 16
                  },
                  'start': 7,
                  'end': 16
              }
          ],
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'await',
              'start': 22,
              'end': 29
          },
          'start': 0,
          'end': 29
      }
  ],
  'start': 0,
  'end': 29
}],
['import x from "y"', 'import x from "y"', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ImportDeclaration',
          'specifiers': [
              {
                  'type': 'ImportDefaultSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 7,
                      'end': 8
                  },
                  'start': 7,
                  'end': 8
              }
          ],
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'y',
              'start': 14,
              'end': 17
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['import * as a from "y"', 'import * as a from "y"', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ImportDeclaration',
          'specifiers': [
              {
                  'type': 'ImportNamespaceSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 12,
                      'end': 13
                  },
                  'start': 7,
                  'end': 13
              }
          ],
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'y',
              'start': 19,
              'end': 22
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
['import x, * as a from "y"', 'import x, * as a from "y"', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ImportDeclaration',
          'specifiers': [
              {
                  'type': 'ImportDefaultSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 7,
                      'end': 8
                  },
                  'start': 7,
                  'end': 8
              },
              {
                  'type': 'ImportNamespaceSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 15,
                      'end': 16
                  },
                  'start': 10,
                  'end': 16
              }
          ],
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'y',
              'start': 22,
              'end': 25
          },
          'start': 0,
          'end': 25
      }
  ],
  'start': 0,
  'end': 25
}],
['import "y"', 'import "y"', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ImportDeclaration',
          'specifiers': [],
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'y',
              'start': 7,
              'end': 10
          },
          'start': 0,
          'end': 10
      }
  ],
  'start': 0,
  'end': 10
}],
   ['import {x} from "y"', 'import {x} from "y"', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ImportDeclaration',
            'specifiers': [
                {
                    'type': 'ImportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'imported': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'start': 8,
                    'end': 9
                }
            ],
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'y',
                'start': 16,
                'end': 19
            },
            'start': 0,
            'end': 19
        }
    ],
    'start': 0,
    'end': 19
}],
   ['import {x,} from "y"', 'import {x,} from "y"', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ImportDeclaration',
            'specifiers': [
                {
                    'type': 'ImportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'imported': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'start': 8,
                    'end': 9
                }
            ],
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'y',
                'start': 17,
                'end': 20
            },
            'start': 0,
            'end': 20
        }
    ],
    'start': 0,
    'end': 20
}],
   ['import {x as z} from "y"', 'import {x as z} from "y"', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ImportDeclaration',
            'specifiers': [
                {
                    'type': 'ImportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 13,
                        'end': 14
                    },
                    'imported': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'start': 8,
                    'end': 14
                }
            ],
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'y',
                'start': 21,
                'end': 24
            },
            'start': 0,
            'end': 24
        }
    ],
    'start': 0,
    'end': 24
}],
   ['import {x as z,} from "y"', 'import {x as z,} from "y"', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ImportDeclaration',
            'specifiers': [
                {
                    'type': 'ImportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 13,
                        'end': 14
                    },
                    'imported': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'start': 8,
                    'end': 14
                }
            ],
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'y',
                'start': 22,
                'end': 25
            },
            'start': 0,
            'end': 25
        }
    ],
    'start': 0,
    'end': 25
}],
   ['import {x as a, z} from "y"', 'import {x as a, z} from "y"', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ImportDeclaration',
            'specifiers': [
                {
                    'type': 'ImportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'a',
                        'start': 13,
                        'end': 14
                    },
                    'imported': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'start': 8,
                    'end': 14
                },
                {
                    'type': 'ImportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 16,
                        'end': 17
                    },
                    'imported': {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 16,
                        'end': 17
                    },
                    'start': 16,
                    'end': 17
                }
            ],
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'y',
                'start': 24,
                'end': 27
            },
            'start': 0,
            'end': 27
        }
    ],
    'start': 0,
    'end': 27
}],
   ['import {x, z as b} from "y"', 'import {x, z as b} from "y"', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ImportDeclaration',
            'specifiers': [
                {
                    'type': 'ImportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'imported': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'start': 8,
                    'end': 9
                },
                {
                    'type': 'ImportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 16,
                        'end': 17
                    },
                    'imported': {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 11,
                        'end': 12
                    },
                    'start': 11,
                    'end': 17
                }
            ],
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'y',
                'start': 24,
                'end': 27
            },
            'start': 0,
            'end': 27
        }
    ],
    'start': 0,
    'end': 27
}]
];

const invalids: Array < [string, string, Context, any] > = [
  ['import foo', 'import foo', Context.Empty, {}],
  ['import', 'import', Context.Module, {}],
  ['import;', 'import;', Context.Module, {}],
  ['import {}', 'import {}', Context.Module, {}],
  ['import {} from;', 'import {} from;', Context.Module, {}],
  ['import {,} from \'a\';', 'import {,} from \'a\';', Context.Module, {}],
  ['import {b,,} from \'a\';', 'import {b,,} from \'a\';', Context.Module, {}],
  ['import {function} from \'a\';', 'import {function} from \'a\';', Context.Module, {}],
  ['import {a as function} from \'a\';', 'import {a as function} from \'a\';', Context.Module, {}],
  ['import {b,,c} from \'a\';', 'import {b,,c} from \'a\';', Context.Module, {}],
  ['import {b,c,,} from \'a\';', 'import {b,c,,} from \'a\';', Context.Module, {}],
  ['import * As a from \'a\'', 'import * As a from \'a\'', Context.Module, {}],
  ['import / as a from \'a\'', 'import / as a from \'a\'', Context.Module, {}],
  ['import * as b, a from \'a\'', 'import * as b, a from \'a\'', Context.Module, {}],
  ['import a as b from \'a\'', 'import a as b from \'a\'', Context.Module, {}],
  ['import a, b from \'a\'', 'import a, b from \'a\'', Context.Module, {}],
  ['import from \'foo\';', 'import from \'foo\';', Context.Module, {}],
  ['import \'a\',', 'import \'a\',', Context.Module, {}],
  ['import { };', 'import { };', Context.Module, {}],
  ['import {;', 'import {;', Context.Module, {}],
  ['import };', 'import };', Context.Module, {}],
  ['import { , };', 'import { , };', Context.Module, {}],
  ['import { , } from \'foo\';', 'import { , } from \'foo\';', Context.Module, {}],
  ['import { a } from;', 'import { a } from;', Context.Module, {}],
  ['import { a } \'foo\';', 'import { a } \'foo\';', Context.Module, {}],
  ['import , from \'foo\';', 'import , from \'foo\';', Context.Module, {}],
  ['import a , from \'foo\';', 'import a , from \'foo\';', Context.Module, {}],
  ['import a { b, c } from \'foo\';', 'import a { b, c } from \'foo\';', Context.Module, {}],
  ['import { null } from "null', 'import { null } from "null', Context.Module, {}],
  ['import foo, from "bar";', 'import foo, from "bar";', Context.Module, {}],
  ['import default from "foo"', 'import default from "foo"', Context.Module, {}],
  ['import {bar}, {foo} from "foo";', 'import {bar}, {foo} from "foo";', Context.Module, {}],
  ['import {bar}, foo from "foo"', 'import {bar}, foo from "foo"', Context.Module, {}],
  ['{import a from \'b\';}', '{import a from \'b\';}', Context.Module, {}],
  ['import { {} } from \'foo\';', 'import { {} } from \'foo\';', Context.Module, {}],
  ['import { !d } from \'foo\';', 'import { !d } from \'foo\';', Context.Module, {}],
  ['import { 123 } from \'foo\';', 'import { 123 } from \'foo\';', Context.Module, {}],
  ['import { [123] } from \'foo\';', 'import { [123] } from \'foo\';', Context.Module, {}],
  ['import { foo as {a: b = 2} } from \'foo\';', 'import { foo as {a: b = 2} } from \'foo\';', Context.Module, {}],
  ['import { foo as !d } from \'foo\';', 'import { foo as !d } from \'foo\';', Context.Module, {}],
  ['import { foo as [123] } from \'foo\';', 'import { foo as [123] } from \'foo\';', Context.Module, {}],
  ['import { foo as {a: b = 2} } from \'foo\';', 'import { foo as {a: b = 2} } from \'foo\';', Context.Module, {}],
  // ['import { a as arguments } from \'foo\';', 'import { a as arguments } from \'foo\';', Context.Module, {}],
  ['import { for } from \'foo\';', 'import { for } from \'foo\';', Context.Module, {}],
  // ['import { y as yield } from \'foo\'', 'import { y as yield } from \'foo\'', Context.Module, {}],
  // ['import { s as static } from \'foo\'', 'import { s as static } from \'foo\'', Context.Module, {}],
  // ['import { l as let } from \'foo\'', 'import { l as let } from \'foo\'', Context.Module, {}],
  ['while (false) import v from \'foo\'', 'while (false) import v from \'foo\'', Context.Module, {}],
  ['try { } finally { import v from \'foo\'; }', 'try { } finally { import v from \'foo\'; }', Context.Module, {}],
  ['({ set m(x) { import v from \'foo\'; } });', '({ set m(x) { import v from \'foo\'; } });', Context.Module, {}],
  ['class C { method() { import v from \'foo\'; } }', 'class C { method() { import v from \'foo\'; } }', Context.Module, {}],
//  ['import { a as await } from \'foo\';', 'import { a as await } from \'foo\';', Context.Module, {}],
  ['import { a as enum } from \'foo\';', 'import { a as enum } from \'foo\';', Context.Module, {}],
  ['import { x }, def from \'foo\';', 'import { x }, def from \'foo\';', Context.Module, {}],
  ['import {x}, {y} from \'foo\';', 'import {x}, {y} from \'foo\';', Context.Module, {}],
  ['import * as x, * as y from \'foo\';', 'import * as x, * as y from \'foo\';', Context.Module, {}],
  ['import * as x, {y} from \'foo\';', 'import * as x, {y} from \'foo\';', Context.Module, {}],
  ['import default from "foo"', 'import default from "foo"', Context.Module, {}],
  ['import { class } from "foo"', 'import { class } from "foo"', Context.Module, {}],
  ['import { a as class } from "foo"', 'import { a as class } from "foo"', Context.Module, {}],
  ['import foo from bar', 'import foo from bar;', Context.Module, {}],
  ['import * 12', 'import * 12', Context.Module, {}],
  ['import {a as b, e as l 12', 'import {a as b, e as l 12', Context.Module, {}],
  ['import icefapper from ;', 'import icefapper from ;', Context.Module, {}],
  ['import icefapper from {}', 'import icefapper from {}', Context.Module, {}],
  ['import icefapper from 12', 'import icefapper from 12', Context.Module, {}],
  ['import icefapper from /', 'import icefapper from /', Context.Module, {}],
  ['import icefapper from []', 'import icefapper from []', Context.Module, {}],
  ['function foo() { import foo from "icefapper.js"; }', 'function foo() { import foo from "icefapper.js"; }', Context.Module, {}],
  ['import foo, bar from "foo.js";', 'import foo, bar from "foo.js";', Context.Module, {}],
  ['import { foo }, * as ns1 from "foo.js";', 'import { foo }, * as ns1 from "foo.js";', Context.Module, {}],
  ['import { foo }', 'import { foo }', Context.Module, {}],
  ['import [ foo ] from "foo.js";', 'import [ foo ] from "foo.js";', Context.Module, {}],
  ['{ import in_block from ""; }', '{ import in_block from ""; }', Context.Module, {}],
  ['import { foo as ', 'import { foo as ', Context.Module, {}],
  ['import { foo as bar ', 'import { foo as bar ', Context.Module, {}],
  ['import { foo as bar, ', 'import { foo as bar, ', Context.Module, {}],
  ['import { foo as switch } from "module";', 'import { foo as switch } from "module";', Context.Module, {}],
  ['import { foo, , } from "module";', 'import { foo, , } from "module";', Context.Module, {}],
  [`for (const y in [])
  import v from './foo`, `for (const y in [])
  import v from './foo`, Context.Module, {}],
]

fail('Module - Import (pass)', invalids);
pass('Module - Import (pass)', valids);

});
