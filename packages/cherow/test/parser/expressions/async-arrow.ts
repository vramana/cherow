import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Arrow', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

['async (x, y) => { x.a = y; }', `async (x, y) => { x.a = y; }`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [
                      {
                          'type': 'ExpressionStatement',
                          'expression': {
                              'type': 'AssignmentExpression',
                              'left': {
                                  'type': 'MemberExpression',
                                  'object': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 18,
                                      'end': 19
                                  },
                                  'computed': false,
                                  'property': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 20,
                                      'end': 21
                                  },
                                  'start': 18,
                                  'end': 21
                              },
                              'operator': '=',
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 24,
                                  'end': 25
                              },
                              'start': 18,
                              'end': 25
                          },
                          'start': 18,
                          'end': 26
                      }
                  ],
                  'start': 16,
                  'end': 28
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 7,
                      'end': 8
                  },
                  {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 10,
                      'end': 11
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 28
          },
          'start': 0,
          'end': 28
      }
  ],
  'start': 0,
  'end': 28
}],
['async(yield) => b', `async(yield) => b`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'b',
                  'start': 16,
                  'end': 17
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'yield',
                      'start': 6,
                      'end': 11
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 17
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['f(a, async(x, y) => await [x, y], b)', `f(a, async(x, y) => await [x, y], b)`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'f',
                  'start': 0,
                  'end': 1
              },
              'arguments': [
                  {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 2,
                      'end': 3
                  },
                  {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'AwaitExpression',
                          'argument': {
                              'type': 'ArrayExpression',
                              'elements': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 27,
                                      'end': 28
                                  },
                                  {
                                      'type': 'Identifier',
                                      'name': 'y',
                                      'start': 30,
                                      'end': 31
                                  }
                              ],
                              'start': 26,
                              'end': 32
                          },
                          'start': 20,
                          'end': 32
                      },
                      'params': [
                          {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 11,
                              'end': 12
                          },
                          {
                              'type': 'Identifier',
                              'name': 'y',
                              'start': 14,
                              'end': 15
                          }
                      ],
                      'id': null,
                      'async': true,
                      'generator': false,
                      'expression': true,
                      'start': 5,
                      'end': 32
                  },
                  {
                      'type': 'Identifier',
                      'name': 'b',
                      'start': 34,
                      'end': 35
                  }
              ],
              'start': 0,
              'end': 36
          },
          'start': 0,
          'end': 36
      }
  ],
  'start': 0,
  'end': 36
}],
['async ({}) => 0', `async ({}) => 0`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Literal',
                  raw: null,
                  'value': 0,
                  'start': 14,
                  'end': 15
              },
              'params': [
                  {
                      'type': 'ObjectPattern',
                      'properties': [],
                      'start': 7,
                      'end': 9
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 15
          },
          'start': 0,
          'end': 15
      }
  ],
  'start': 0,
  'end': 15
}],
['[async(x,y) => z]', `[async(x,y) => z]`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrayExpression',
              'elements': [
                  {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 15,
                          'end': 16
                      },
                      'params': [
                          {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 7,
                              'end': 8
                          },
                          {
                              'type': 'Identifier',
                              'name': 'y',
                              'start': 9,
                              'end': 10
                          }
                      ],
                      'id': null,
                      'async': true,
                      'generator': false,
                      'expression': true,
                      'start': 1,
                      'end': 16
                  }
              ],
              'start': 0,
              'end': 17
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['id = async x => x, square = async (y) => { y * y }', `id = async x => x, square = async (y) => { y * y }`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'SequenceExpression',
              'expressions': [
                  {
                      'type': 'AssignmentExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'id',
                          'start': 0,
                          'end': 2
                      },
                      'operator': '=',
                      'right': {
                          'type': 'ArrowFunctionExpression',
                          'body': {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 16,
                              'end': 17
                          },
                          'params': [
                              {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 11,
                                  'end': 12
                              }
                          ],
                          'id': null,
                          'async': true,
                          'generator': false,
                          'expression': true,
                          'start': 5,
                          'end': 17
                      },
                      'start': 0,
                      'end': 17
                  },
                  {
                      'type': 'AssignmentExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'square',
                          'start': 19,
                          'end': 25
                      },
                      'operator': '=',
                      'right': {
                          'type': 'ArrowFunctionExpression',
                          'body': {
                              'type': 'BlockStatement',
                              'body': [
                                  {
                                      'type': 'ExpressionStatement',
                                      'expression': {
                                          'type': 'BinaryExpression',
                                          'left': {
                                              'type': 'Identifier',
                                              'name': 'y',
                                              'start': 43,
                                              'end': 44
                                          },
                                          'right': {
                                              'type': 'Identifier',
                                              'name': 'y',
                                              'start': 47,
                                              'end': 48
                                          },
                                          'operator': '*',
                                          'start': 43,
                                          'end': 48
                                      },
                                      'start': 43,
                                      'end': 48
                                  }
                              ],
                              'start': 41,
                              'end': 50
                          },
                          'params': [
                              {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 35,
                                  'end': 36
                              }
                          ],
                          'id': null,
                          'async': true,
                          'generator': false,
                          'expression': false,
                          'start': 28,
                          'end': 50
                      },
                      'start': 19,
                      'end': 50
                  }
              ],
              'start': 0,
              'end': 50
          },
          'start': 0,
          'end': 50
      }
  ],
  'start': 0,
  'end': 50
}],
['async (x, y) => y', `async (x, y) => y`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'y',
                  'start': 16,
                  'end': 17
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 7,
                      'end': 8
                  },
                  {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 10,
                      'end': 11
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 17
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['async (x, ...y) => x', `async (x, ...y) => x`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 19,
                  'end': 20
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 7,
                      'end': 8
                  },
                  {
                      'type': 'RestElement',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 13,
                          'end': 14
                      },
                      'start': 10,
                      'end': 14
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 20
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
['async ({a = b}) => a', `async ({a = b}) => a`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'a',
                  'start': 19,
                  'end': 20
              },
              'params': [
                  {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 8,
                                  'end': 9
                              },
                              'value': {
                                  'type': 'AssignmentPattern',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 8,
                                      'end': 9
                                  },
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 12,
                                      'end': 13
                                  },
                                  'start': 8,
                                  'end': 13
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 8,
                              'end': 13
                          }
                      ],
                      'start': 7,
                      'end': 14
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 20
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
['f(a, async (b, c) => await [b, c], d)', `f(a, async (b, c) => await [b, c], d)`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'f',
                  'start': 0,
                  'end': 1
              },
              'arguments': [
                  {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 2,
                      'end': 3
                  },
                  {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'AwaitExpression',
                          'argument': {
                              'type': 'ArrayExpression',
                              'elements': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 28,
                                      'end': 29
                                  },
                                  {
                                      'type': 'Identifier',
                                      'name': 'c',
                                      'start': 31,
                                      'end': 32
                                  }
                              ],
                              'start': 27,
                              'end': 33
                          },
                          'start': 21,
                          'end': 33
                      },
                      'params': [
                          {
                              'type': 'Identifier',
                              'name': 'b',
                              'start': 12,
                              'end': 13
                          },
                          {
                              'type': 'Identifier',
                              'name': 'c',
                              'start': 15,
                              'end': 16
                          }
                      ],
                      'id': null,
                      'async': true,
                      'generator': false,
                      'expression': true,
                      'start': 5,
                      'end': 33
                  },
                  {
                      'type': 'Identifier',
                      'name': 'd',
                      'start': 35,
                      'end': 36
                  }
              ],
              'start': 0,
              'end': 37
          },
          'start': 0,
          'end': 37
      }
  ],
  'start': 0,
  'end': 37
}],
['({ ...async () => { }})', `({ ...async () => { }})`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ObjectExpression',
              'properties': [
                  {
                      'type': 'SpreadElement',
                      'argument': {
                          'type': 'ArrowFunctionExpression',
                          'body': {
                              'type': 'BlockStatement',
                              'body': [],
                              'start': 18,
                              'end': 21
                          },
                          'params': [],
                          'id': null,
                          'async': true,
                          'generator': false,
                          'expression': false,
                          'start': 6,
                          'end': 21
                      },
                      'start': 3,
                      'end': 21
                  }
              ],
              'start': 1,
              'end': 22
          },
          'start': 0,
          'end': 23
      }
  ],
  'start': 0,
  'end': 23
}],
['(async x => y)', `(async x => y)`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'y',
                  'start': 12,
                  'end': 13
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 7,
                      'end': 8
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 1,
              'end': 13
          },
          'start': 0,
          'end': 14
      }
  ],
  'start': 0,
  'end': 14
}],
['({x: async (y,w) => z})', `({x: async (y,w) => z})`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ObjectExpression',
              'properties': [
                  {
                      'type': 'Property',
                      'key': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 2,
                          'end': 3
                      },
                      'value': {
                          'type': 'ArrowFunctionExpression',
                          'body': {
                              'type': 'Identifier',
                              'name': 'z',
                              'start': 20,
                              'end': 21
                          },
                          'params': [
                              {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 12,
                                  'end': 13
                              },
                              {
                                  'type': 'Identifier',
                                  'name': 'w',
                                  'start': 14,
                                  'end': 15
                              }
                          ],
                          'id': null,
                          'async': true,
                          'generator': false,
                          'expression': true,
                          'start': 5,
                          'end': 21
                      },
                      'kind': 'init',
                      'computed': false,
                      'method': false,
                      'shorthand': false,
                      'start': 2,
                      'end': 21
                  }
              ],
              'start': 1,
              'end': 22
          },
          'start': 0,
          'end': 23
      }
  ],
  'start': 0,
  'end': 23
}],
['async({x = yield}) => 1;', `async({x = yield}) => 1;`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Literal',
                  raw: null,
                  'value': 1,
                  'start': 22,
                  'end': 23
              },
              'params': [
                  {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 7,
                                  'end': 8
                              },
                              'value': {
                                  'type': 'AssignmentPattern',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 7,
                                      'end': 8
                                  },
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'yield',
                                      'start': 11,
                                      'end': 16
                                  },
                                  'start': 7,
                                  'end': 16
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 7,
                              'end': 16
                          }
                      ],
                      'start': 6,
                      'end': 17
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 23
          },
          'start': 0,
          'end': 24
      }
  ],
  'start': 0,
  'end': 24
}],
['async (icefapper = bad) => {  }', `async (icefapper = bad) => {  }`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 27,
                  'end': 31
              },
              'params': [
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'icefapper',
                          'start': 7,
                          'end': 16
                      },
                      'right': {
                          'type': 'Identifier',
                          'name': 'bad',
                          'start': 19,
                          'end': 22
                      },
                      'start': 7,
                      'end': 22
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 31
          },
          'start': 0,
          'end': 31
      }
  ],
  'start': 0,
  'end': 31
}],
['async ({a: b = c})', `async ({a: b = c})`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'async',
                  'start': 0,
                  'end': 5
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 8,
                                  'end': 9
                              },
                              'value': {
                                  'type': 'AssignmentExpression',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 11,
                                      'end': 12
                                  },
                                  'operator': '=',
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'c',
                                      'start': 15,
                                      'end': 16
                                  },
                                  'start': 11,
                                  'end': 16
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 8,
                              'end': 16
                          }
                      ],
                      'start': 7,
                      'end': 17
                  }
              ],
              'start': 0,
              'end': 18
          },
          'start': 0,
          'end': 18
      }
  ],
  'start': 0,
  'end': 18
}],
['async ({a = b}) => a', `async ({a = b}) => a`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'a',
                  'start': 19,
                  'end': 20
              },
              'params': [
                  {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 8,
                                  'end': 9
                              },
                              'value': {
                                  'type': 'AssignmentPattern',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 8,
                                      'end': 9
                                  },
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 12,
                                      'end': 13
                                  },
                                  'start': 8,
                                  'end': 13
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 8,
                              'end': 13
                          }
                      ],
                      'start': 7,
                      'end': 14
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 20
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
['async (a, b) => a', `async (a, b) => a`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'a',
                  'start': 16,
                  'end': 17
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 7,
                      'end': 8
                  },
                  {
                      'type': 'Identifier',
                      'name': 'b',
                      'start': 10,
                      'end': 11
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 17
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['async () =>{};', `async () =>{};`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 11,
                  'end': 13
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 13
          },
          'start': 0,
          'end': 14
      }
  ],
  'start': 0,
  'end': 14
}],
['async () => {}', `async () => {}`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 12,
                  'end': 14
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 14
          },
          'start': 0,
          'end': 14
      }
  ],
  'start': 0,
  'end': 14
}],
['async foo => bar', `async foo => bar`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'bar',
                  'start': 13,
                  'end': 16
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 6,
                      'end': 9
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 16
      }
  ],
  'start': 0,
  'end': 16
}],
['async()', `async()`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'async',
                  'start': 0,
                  'end': 5
              },
              'arguments': [],
              'start': 0,
              'end': 7
          },
          'start': 0,
          'end': 7
      }
  ],
  'start': 0,
  'end': 7
}],
['async (x)=> {/x/}', `async (x)=> {/x/}`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [
                      {
                          'type': 'ExpressionStatement',
                          'expression': {
                              'type': 'Literal',
                              'value': {},
                              'regex': {
                                  'pattern': 'x',
                                  'flags': ''
                              },
                              'start': 13,
                              'end': 16
                          },
                          'start': 13,
                          'end': 16
                      }
                  ],
                  'start': 12,
                  'end': 17
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 7,
                      'end': 8
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 17
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['async (a)=>b', `async (a)=>b`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'b',
                  'start': 11,
                  'end': 12
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 7,
                      'end': 8
                  }
              ],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 12
          },
          'start': 0,
          'end': 12
      }
  ],
  'start': 0,
  'end': 12
}],
['async ()=>x', `async ()=>x`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 10,
                  'end': 11
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 11
          },
          'start': 0,
          'end': 11
      }
  ],
  'start': 0,
  'end': 11
}],
[`async () => {}
async () => {}
async () => {}
async () => {}`, `async () => {}
async () => {}
async () => {}
async () => {}`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 12,
                  'end': 14
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 14
          },
          'start': 0,
          'end': 14
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 27,
                  'end': 29
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 15,
              'end': 29
          },
          'start': 15,
          'end': 29
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 42,
                  'end': 44
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 30,
              'end': 44
          },
          'start': 30,
          'end': 44
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 57,
                  'end': 59
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 45,
              'end': 59
          },
          'start': 45,
          'end': 59
      }
  ],
  'start': 0,
  'end': 59
}],
[`async () => {}
async () => {}
() => {}
async () => foo
async () => {}`, `async () => {}
async () => {}
() => {}
async () => foo
async () => {}`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 12,
                  'end': 14
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 14
          },
          'start': 0,
          'end': 14
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 27,
                  'end': 29
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 15,
              'end': 29
          },
          'start': 15,
          'end': 29
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 36,
                  'end': 38
              },
              'params': [],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 30,
              'end': 38
          },
          'start': 30,
          'end': 38
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 51,
                  'end': 54
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': true,
              'start': 39,
              'end': 54
          },
          'start': 39,
          'end': 54
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 67,
                  'end': 69
              },
              'params': [],
              'id': null,
              'async': true,
              'generator': false,
              'expression': false,
              'start': 55,
              'end': 69
          },
          'start': 55,
          'end': 69
      }
  ],
  'start': 0,
  'end': 69
}],
/*['() => {}', `async () => {}`, Context.OptionsRanges, {}],
['() => {}', `async () => {}`, Context.OptionsRanges, {}], */
];

pass('Expressions - Async Arrow (pass)', valids);

});
