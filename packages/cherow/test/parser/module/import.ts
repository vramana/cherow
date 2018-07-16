import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Module - Import', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

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

pass('Module - Import (pass)', valids);

});
