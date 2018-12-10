import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Arrow', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

['(x)=>x;', `(x)=>x;`, Context.OptionsRanges, {
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
                  'start': 5,
                  'end': 6
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 6
          },
          'start': 0,
          'end': 7
      }
  ],
  'start': 0,
  'end': 7
}],
['(a = 1, b = 2) => x;', `(a = 1, b = 2) => x;`, Context.OptionsRanges, {
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
                  'start': 18,
                  'end': 19
              },
              'params': [
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 1,
                          'end': 2
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 1,
                          'start': 5,
                          'end': 6
                      },
                      'start': 1,
                      'end': 6
                  },
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 8,
                          'end': 9
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 2,
                          'start': 12,
                          'end': 13
                      },
                      'start': 8,
                      'end': 13
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 19
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
['var a = (b) => c;', `var a = (b) => c;`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'Identifier',
                          'name': 'c',
                          'start': 15,
                          'end': 16
                      },
                      'params': [
                          {
                              'type': 'Identifier',
                              'name': 'b',
                              'start': 9,
                              'end': 10
                          }
                      ],
                      'id': null,
                      'async': false,
                      'generator': false,
                      'expression': true,
                      'start': 8,
                      'end': 16
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 4,
                      'end': 5
                  },
                  'start': 4,
                  'end': 16
              }
          ],
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['({ident: {x}}) => x', `({ident: {x}}) => x`, Context.OptionsRanges, {
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
                  'start': 18,
                  'end': 19
              },
              'params': [
                  {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'ident',
                                  'start': 2,
                                  'end': 7
                              },
                              'value': {
                                  'type': 'ObjectPattern',
                                  'properties': [
                                      {
                                          'type': 'Property',
                                          'key': {
                                              'type': 'Identifier',
                                              'name': 'x',
                                              'start': 10,
                                              'end': 11
                                          },
                                          'value': {
                                              'type': 'Identifier',
                                              'name': 'x',
                                              'start': 10,
                                              'end': 11
                                          },
                                          'kind': 'init',
                                          'computed': false,
                                          'method': false,
                                          'shorthand': true,
                                          'start': 10,
                                          'end': 11
                                      }
                                  ],
                                  'start': 9,
                                  'end': 12
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 2,
                              'end': 12
                          }
                      ],
                      'start': 1,
                      'end': 13
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 19
          },
          'start': 0,
          'end': 19
      }
  ],
  'start': 0,
  'end': 19
}],
['({ident: {x: y}}) => x', `({ident: {x: y}}) => x`, Context.OptionsRanges, {
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
                  'start': 21,
                  'end': 22
              },
              'params': [
                  {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'ident',
                                  'start': 2,
                                  'end': 7
                              },
                              'value': {
                                  'type': 'ObjectPattern',
                                  'properties': [
                                      {
                                          'type': 'Property',
                                          'key': {
                                              'type': 'Identifier',
                                              'name': 'x',
                                              'start': 10,
                                              'end': 11
                                          },
                                          'value': {
                                              'type': 'Identifier',
                                              'name': 'y',
                                              'start': 13,
                                              'end': 14
                                          },
                                          'kind': 'init',
                                          'computed': false,
                                          'method': false,
                                          'shorthand': false,
                                          'start': 10,
                                          'end': 14
                                      }
                                  ],
                                  'start': 9,
                                  'end': 15
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 2,
                              'end': 15
                          }
                      ],
                      'start': 1,
                      'end': 16
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 22
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
['({ident: {x: y}})', `({ident: {x: y}})`, Context.OptionsRanges, {
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
                          'name': 'ident',
                          'start': 2,
                          'end': 7
                      },
                      'value': {
                          'type': 'ObjectExpression',
                          'properties': [
                              {
                                  'type': 'Property',
                                  'key': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 10,
                                      'end': 11
                                  },
                                  'value': {
                                      'type': 'Identifier',
                                      'name': 'y',
                                      'start': 13,
                                      'end': 14
                                  },
                                  'kind': 'init',
                                  'computed': false,
                                  'method': false,
                                  'shorthand': false,
                                  'start': 10,
                                  'end': 14
                              }
                          ],
                          'start': 9,
                          'end': 15
                      },
                      'kind': 'init',
                      'computed': false,
                      'method': false,
                      'shorthand': false,
                      'start': 2,
                      'end': 15
                  }
              ],
              'start': 1,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['(x, ...y) => x', `(x, ...y) => x`, Context.OptionsRanges, {
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
                  'start': 13,
                  'end': 14
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  },
                  {
                      'type': 'RestElement',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 7,
                          'end': 8
                      },
                      'start': 4,
                      'end': 8
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
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
['({[x]:y});', `({[x]:y});`, Context.OptionsRanges, {
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
                          'start': 3,
                          'end': 4
                      },
                      'value': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 6,
                          'end': 7
                      },
                      'kind': 'init',
                      'computed': true,
                      'method': false,
                      'shorthand': false,
                      'start': 2,
                      'end': 7
                  }
              ],
              'start': 1,
              'end': 8
          },
          'start': 0,
          'end': 10
      }
  ],
  'start': 0,
  'end': 10
}],
['(x, y) => (u, v) => x*u + y*v, bar;', `(x, y) => (u, v) => x*u + y*v, bar;`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'SequenceExpression',
              'expressions': [
                  {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'ArrowFunctionExpression',
                          'body': {
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'BinaryExpression',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 20,
                                      'end': 21
                                  },
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'u',
                                      'start': 22,
                                      'end': 23
                                  },
                                  'operator': '*',
                                  'start': 20,
                                  'end': 23
                              },
                              'right': {
                                  'type': 'BinaryExpression',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'y',
                                      'start': 26,
                                      'end': 27
                                  },
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'v',
                                      'start': 28,
                                      'end': 29
                                  },
                                  'operator': '*',
                                  'start': 26,
                                  'end': 29
                              },
                              'operator': '+',
                              'start': 20,
                              'end': 29
                          },
                          'params': [
                              {
                                  'type': 'Identifier',
                                  'name': 'u',
                                  'start': 11,
                                  'end': 12
                              },
                              {
                                  'type': 'Identifier',
                                  'name': 'v',
                                  'start': 14,
                                  'end': 15
                              }
                          ],
                          'id': null,
                          'async': false,
                          'generator': false,
                          'expression': true,
                          'start': 10,
                          'end': 29
                      },
                      'params': [
                          {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 1,
                              'end': 2
                          },
                          {
                              'type': 'Identifier',
                              'name': 'y',
                              'start': 4,
                              'end': 5
                          }
                      ],
                      'id': null,
                      'async': false,
                      'generator': false,
                      'expression': true,
                      'start': 0,
                      'end': 29
                  },
                  {
                      'type': 'Identifier',
                      'name': 'bar',
                      'start': 31,
                      'end': 34
                  }
              ],
              'start': 0,
              'end': 34
          },
          'start': 0,
          'end': 35
      }
  ],
  'start': 0,
  'end': 35
}],
['({x = 10}) => x', `({x = 10}) => x`, Context.OptionsRanges, {
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
                  'start': 14,
                  'end': 15
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
                                  'start': 2,
                                  'end': 3
                              },
                              'value': {
                                  'type': 'AssignmentPattern',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 2,
                                      'end': 3
                                  },
                                  'right': {
                                      'type': 'Literal',
                                      raw: null,
                                      'value': 10,
                                      'start': 6,
                                      'end': 8
                                  },
                                  'start': 2,
                                  'end': 8
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 2,
                              'end': 8
                          }
                      ],
                      'start': 1,
                      'end': 9
                  }
              ],
              'id': null,
              'async': false,
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
['({x = 10, y: { z = 10 }}) => [x, z]', `({x = 10, y: { z = 10 }}) => [x, z]`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ArrowFunctionExpression',
              'body': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 30,
                          'end': 31
                      },
                      {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 33,
                          'end': 34
                      }
                  ],
                  'start': 29,
                  'end': 35
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
                                  'start': 2,
                                  'end': 3
                              },
                              'value': {
                                  'type': 'AssignmentPattern',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 2,
                                      'end': 3
                                  },
                                  'right': {
                                      'type': 'Literal',
                                      raw: null,
                                      'value': 10,
                                      'start': 6,
                                      'end': 8
                                  },
                                  'start': 2,
                                  'end': 8
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 2,
                              'end': 8
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 10,
                                  'end': 11
                              },
                              'value': {
                                  'type': 'ObjectPattern',
                                  'properties': [
                                      {
                                          'type': 'Property',
                                          'key': {
                                              'type': 'Identifier',
                                              'name': 'z',
                                              'start': 15,
                                              'end': 16
                                          },
                                          'value': {
                                              'type': 'AssignmentPattern',
                                              'left': {
                                                  'type': 'Identifier',
                                                  'name': 'z',
                                                  'start': 15,
                                                  'end': 16
                                              },
                                              'right': {
                                                  'type': 'Literal',
                                                  raw: null,
                                                  'value': 10,
                                                  'start': 19,
                                                  'end': 21
                                              },
                                              'start': 15,
                                              'end': 21
                                          },
                                          'kind': 'init',
                                          'computed': false,
                                          'method': false,
                                          'shorthand': true,
                                          'start': 15,
                                          'end': 21
                                      }
                                  ],
                                  'start': 13,
                                  'end': 23
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 10,
                              'end': 23
                          }
                      ],
                      'start': 1,
                      'end': 24
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 35
          },
          'start': 0,
          'end': 35
      }
  ],
  'start': 0,
  'end': 35
}],
['({y}) => x;', `({y}) => x;`, Context.OptionsRanges, {
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
                  'start': 9,
                  'end': 10
              },
              'params': [
                  {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 2,
                                  'end': 3
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 2,
                                  'end': 3
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 2,
                              'end': 3
                          }
                      ],
                      'start': 1,
                      'end': 4
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 10
          },
          'start': 0,
          'end': 11
      }
  ],
  'start': 0,
  'end': 11
}],
['bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;', `bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ConditionalExpression',
              'test': {
                  'type': 'Identifier',
                  'name': 'bar',
                  'start': 0,
                  'end': 3
              },
              'consequent': {
                  'type': 'SequenceExpression',
                  'expressions': [
                      {
                          'type': 'ArrowFunctionExpression',
                          'body': {
                              'type': 'Literal',
                              raw: null,
                              'value': 0,
                              'start': 18,
                              'end': 19
                          },
                          'params': [
                              {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 9,
                                  'end': 10
                              },
                              {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 12,
                                  'end': 13
                              }
                          ],
                          'id': null,
                          'async': false,
                          'generator': false,
                          'expression': true,
                          'start': 8,
                          'end': 19
                      },
                      {
                          'type': 'ArrowFunctionExpression',
                          'body': {
                              'type': 'Literal',
                              raw: null,
                              'value': 1,
                              'start': 31,
                              'end': 32
                          },
                          'params': [
                              {
                                  'type': 'Identifier',
                                  'name': 'c',
                                  'start': 22,
                                  'end': 23
                              },
                              {
                                  'type': 'Identifier',
                                  'name': 'd',
                                  'start': 25,
                                  'end': 26
                              }
                          ],
                          'id': null,
                          'async': false,
                          'generator': false,
                          'expression': true,
                          'start': 21,
                          'end': 32
                      }
                  ],
                  'start': 8,
                  'end': 32
              },
              'alternate': {
                  'type': 'Identifier',
                  'name': 'baz',
                  'start': 37,
                  'end': 40
              },
              'start': 0,
              'end': 40
          },
          'start': 0,
          'end': 41
      }
  ],
  'start': 0,
  'end': 41
}],
['bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;', `bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ConditionalExpression',
              'test': {
                  'type': 'Identifier',
                  'name': 'bar',
                  'start': 0,
                  'end': 3
              },
              'consequent': {
                  'type': 'ArrowFunctionExpression',
                  'body': {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'BinaryExpression',
                          'left': {
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 28,
                                  'end': 29
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'u',
                                  'start': 30,
                                  'end': 31
                              },
                              'operator': '*',
                              'start': 28,
                              'end': 31
                          },
                          'right': {
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 34,
                                  'end': 35
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'v',
                                  'start': 36,
                                  'end': 37
                              },
                              'operator': '*',
                              'start': 34,
                              'end': 37
                          },
                          'operator': '+',
                          'start': 28,
                          'end': 37
                      },
                      'params': [
                          {
                              'type': 'Identifier',
                              'name': 'u',
                              'start': 19,
                              'end': 20
                          },
                          {
                              'type': 'Identifier',
                              'name': 'v',
                              'start': 22,
                              'end': 23
                          }
                      ],
                      'id': null,
                      'async': false,
                      'generator': false,
                      'expression': true,
                      'start': 18,
                      'end': 37
                  },
                  'params': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 9,
                          'end': 10
                      },
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 12,
                          'end': 13
                      }
                  ],
                  'id': null,
                  'async': false,
                  'generator': false,
                  'expression': true,
                  'start': 8,
                  'end': 37
              },
              'alternate': {
                  'type': 'Identifier',
                  'name': 'baz',
                  'start': 42,
                  'end': 45
              },
              'start': 0,
              'end': 45
          },
          'start': 0,
          'end': 46
      }
  ],
  'start': 0,
  'end': 46
}],
['new (() => {});', `new (() => {});`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'NewExpression',
              'callee': {
                  'type': 'ArrowFunctionExpression',
                  'body': {
                      'type': 'BlockStatement',
                      'body': [],
                      'start': 11,
                      'end': 13
                  },
                  'params': [],
                  'id': null,
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'start': 5,
                  'end': 13
              },
              'arguments': [],
              'start': 0,
              'end': 14
          },
          'start': 0,
          'end': 15
      }
  ],
  'start': 0,
  'end': 15
}],
['(x, ...a) => {};', `(x, ...a) => {};`, Context.OptionsRanges, {
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
                  'start': 13,
                  'end': 15
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  },
                  {
                      'type': 'RestElement',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 7,
                          'end': 8
                      },
                      'start': 4,
                      'end': 8
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 15
          },
          'start': 0,
          'end': 16
      }
  ],
  'start': 0,
  'end': 16
}],
['(...a) => {};', `(...a) => {};`, Context.OptionsRanges, {
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
                  'start': 10,
                  'end': 12
              },
              'params': [
                  {
                      'type': 'RestElement',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 4,
                          'end': 5
                      },
                      'start': 1,
                      'end': 5
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 12
          },
          'start': 0,
          'end': 13
      }
  ],
  'start': 0,
  'end': 13
}],
['(x = 9, y) => {};', `(x = 9, y) => {};`, Context.OptionsRanges, {
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
                  'start': 14,
                  'end': 16
              },
              'params': [
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 9,
                          'start': 5,
                          'end': 6
                      },
                      'start': 1,
                      'end': 6
                  },
                  {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 8,
                      'end': 9
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['({a}) => {};', `({a}) => {};`, Context.OptionsRanges, {
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
                  'start': 9,
                  'end': 11
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
                                  'start': 2,
                                  'end': 3
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 2,
                                  'end': 3
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 2,
                              'end': 3
                          }
                      ],
                      'start': 1,
                      'end': 4
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 11
          },
          'start': 0,
          'end': 12
      }
  ],
  'start': 0,
  'end': 12
}],
['(x, y = 9, z = 8) => {};', `(x, y = 9, z = 8) => {};`, Context.OptionsRanges, {
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
                  'start': 21,
                  'end': 23
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  },
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 9,
                          'start': 8,
                          'end': 9
                      },
                      'start': 4,
                      'end': 9
                  },
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 11,
                          'end': 12
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 8,
                          'start': 15,
                          'end': 16
                      },
                      'start': 11,
                      'end': 16
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
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
['(() => {}) + 2', `(() => {}) + 2`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'BinaryExpression',
              'left': {
                  'type': 'ArrowFunctionExpression',
                  'body': {
                      'type': 'BlockStatement',
                      'body': [],
                      'start': 7,
                      'end': 9
                  },
                  'params': [],
                  'id': null,
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'start': 1,
                  'end': 9
              },
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 2,
                  'start': 13,
                  'end': 14
              },
              'operator': '+',
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
[`(() => {}) || true;
(() => {}) ? a : b;`, `(() => {}) || true;
(() => {}) ? a : b;`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'LogicalExpression',
              'left': {
                  'type': 'ArrowFunctionExpression',
                  'body': {
                      'type': 'BlockStatement',
                      'body': [],
                      'start': 7,
                      'end': 9
                  },
                  'params': [],
                  'id': null,
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'start': 1,
                  'end': 9
              },
              'right': {
                  'type': 'Literal',
                  'value': true,
                  'start': 14,
                  'end': 18
              },
              'operator': '||',
              'start': 0,
              'end': 18
          },
          'start': 0,
          'end': 19
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ConditionalExpression',
              'test': {
                  'type': 'ArrowFunctionExpression',
                  'body': {
                      'type': 'BlockStatement',
                      'body': [],
                      'start': 27,
                      'end': 29
                  },
                  'params': [],
                  'id': null,
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'start': 21,
                  'end': 29
              },
              'consequent': {
                  'type': 'Identifier',
                  'name': 'a',
                  'start': 33,
                  'end': 34
              },
              'alternate': {
                  'type': 'Identifier',
                  'name': 'b',
                  'start': 37,
                  'end': 38
              },
              'start': 20,
              'end': 38
          },
          'start': 20,
          'end': 39
      }
  ],
  'start': 0,
  'end': 39
}],
['const a = () => {return;};', `const a = () => {return;};`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'const',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ReturnStatement',
                                  'argument': null,
                                  'start': 17,
                                  'end': 24
                              }
                          ],
                          'start': 16,
                          'end': 25
                      },
                      'params': [],
                      'id': null,
                      'async': false,
                      'generator': false,
                      'expression': false,
                      'start': 10,
                      'end': 25
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 6,
                      'end': 7
                  },
                  'start': 6,
                  'end': 25
              }
          ],
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
 ['([x = 0]) => {};', `([x = 0]) => {};`, Context.OptionsRanges, {
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
                  'start': 13,
                  'end': 15
              },
              'params': [
                  {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 2,
                                  'end': 3
                              },
                              'right': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 0,
                                  'start': 6,
                                  'end': 7
                              },
                              'start': 2,
                              'end': 7
                          }
                      ],
                      'start': 1,
                      'end': 8
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 15
          },
          'start': 0,
          'end': 16
      }
  ],
  'start': 0,
  'end': 16
}],
 ['({a = 42}) => {};', `({a = 42}) => {};`, Context.OptionsRanges, {
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
                  'start': 14,
                  'end': 16
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
                                  'start': 2,
                                  'end': 3
                              },
                              'value': {
                                  'type': 'AssignmentPattern',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 2,
                                      'end': 3
                                  },
                                  'right': {
                                      'type': 'Literal',
                                      raw: null,
                                      'value': 42,
                                      'start': 6,
                                      'end': 8
                                  },
                                  'start': 2,
                                  'end': 8
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 2,
                              'end': 8
                          }
                      ],
                      'start': 1,
                      'end': 9
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
 ['([x] = []) => {};', `([x] = []) => {};`, Context.OptionsRanges, {
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
                  'start': 14,
                  'end': 16
              },
              'params': [
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'ArrayPattern',
                          'elements': [
                              {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 2,
                                  'end': 3
                              }
                          ],
                          'start': 1,
                          'end': 4
                      },
                      'right': {
                          'type': 'ArrayExpression',
                          'elements': [],
                          'start': 7,
                          'end': 9
                      },
                      'start': 1,
                      'end': 9
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
 ['({a} = {}) => {};', `({a} = {}) => {};`, Context.OptionsRanges, {
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
                  'start': 14,
                  'end': 16
              },
              'params': [
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'ObjectPattern',
                          'properties': [
                              {
                                  'type': 'Property',
                                  'key': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 2,
                                      'end': 3
                                  },
                                  'value': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 2,
                                      'end': 3
                                  },
                                  'kind': 'init',
                                  'computed': false,
                                  'method': false,
                                  'shorthand': true,
                                  'start': 2,
                                  'end': 3
                              }
                          ],
                          'start': 1,
                          'end': 4
                      },
                      'right': {
                          'type': 'ObjectExpression',
                          'properties': [],
                          'start': 7,
                          'end': 9
                      },
                      'start': 1,
                      'end': 9
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
 ['(x, y = 9, {b}, z = 8, ...a) => {};', `(x, y = 9, {b}, z = 8, ...a) => {};`, Context.OptionsRanges, {
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
                  'start': 32,
                  'end': 34
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  },
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 9,
                          'start': 8,
                          'end': 9
                      },
                      'start': 4,
                      'end': 9
                  },
                  {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 12,
                                  'end': 13
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 12,
                                  'end': 13
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 12,
                              'end': 13
                          }
                      ],
                      'start': 11,
                      'end': 14
                  },
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 16,
                          'end': 17
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 8,
                          'start': 20,
                          'end': 21
                      },
                      'start': 16,
                      'end': 21
                  },
                  {
                      'type': 'RestElement',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 26,
                          'end': 27
                      },
                      'start': 23,
                      'end': 27
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 34
          },
          'start': 0,
          'end': 35
      }
  ],
  'start': 0,
  'end': 35
}],
 ['() => 42, bar;', `() => 42, bar;`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'SequenceExpression',
              'expressions': [
                  {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'Literal',
                          raw: null,
                          'value': 42,
                          'start': 6,
                          'end': 8
                      },
                      'params': [],
                      'id': null,
                      'async': false,
                      'generator': false,
                      'expression': true,
                      'start': 0,
                      'end': 8
                  },
                  {
                      'type': 'Identifier',
                      'name': 'bar',
                      'start': 10,
                      'end': 13
                  }
              ],
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
['bar ? ( (x, y) => { x.a = y; } ) : baz;', `bar ? ( (x, y) => { x.a = y; } ) : baz;`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ConditionalExpression',
              'test': {
                  'type': 'Identifier',
                  'name': 'bar',
                  'start': 0,
                  'end': 3
              },
              'consequent': {
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
                                          'start': 20,
                                          'end': 21
                                      },
                                      'computed': false,
                                      'property': {
                                          'type': 'Identifier',
                                          'name': 'a',
                                          'start': 22,
                                          'end': 23
                                      },
                                      'start': 20,
                                      'end': 23
                                  },
                                  'operator': '=',
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'y',
                                      'start': 26,
                                      'end': 27
                                  },
                                  'start': 20,
                                  'end': 27
                              },
                              'start': 20,
                              'end': 28
                          }
                      ],
                      'start': 18,
                      'end': 30
                  },
                  'params': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 9,
                          'end': 10
                      },
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 12,
                          'end': 13
                      }
                  ],
                  'id': null,
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'start': 8,
                  'end': 30
              },
              'alternate': {
                  'type': 'Identifier',
                  'name': 'baz',
                  'start': 35,
                  'end': 38
              },
              'start': 0,
              'end': 38
          },
          'start': 0,
          'end': 39
      }
  ],
  'start': 0,
  'end': 39
}],
['() => {}', `() => {}`, Context.OptionsRanges, {
  'type': 'Program',
  'start': 0,
  'end': 8,
  'body': [
    {
      'type': 'ExpressionStatement',
      'start': 0,
      'end': 8,
      'expression': {
        'type': 'ArrowFunctionExpression',
        'start': 0,
        'end': 8,
        'id': null,
        'generator': false,
        'expression': false,
        'async': false,
        'params': [],
        'body': {
          'type': 'BlockStatement',
          'start': 6,
          'end': 8,
          'body': []
        }
      }
    }
  ],
  'sourceType': 'script'
}],
['async => bar', `async => bar`, Context.OptionsRanges, {
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
                  'start': 9,
                  'end': 12
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'async',
                      'start': 0,
                      'end': 5
                  }
              ],
              'id': null,
              'async': false,
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
['foo => bar', `foo => bar`, Context.OptionsRanges, {
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
                  'start': 7,
                  'end': 10
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 0,
                      'end': 3
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 10
          },
          'start': 0,
          'end': 10
      }
  ],
  'start': 0,
  'end': 10
}],
['(x)=>{x}', `(x)=>{x}`, Context.OptionsRanges, {
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
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 6,
                              'end': 7
                          },
                          'start': 6,
                          'end': 7
                      }
                  ],
                  'start': 5,
                  'end': 8
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 8
          },
          'start': 0,
          'end': 8
      }
  ],
  'start': 0,
  'end': 8
}],
['(x)=>{/x/}', `(x)=>{/x/}`, Context.OptionsRanges, {
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
                              'start': 6,
                              'end': 9
                          },
                          'start': 6,
                          'end': 9
                      }
                  ],
                  'start': 5,
                  'end': 10
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
              'start': 0,
              'end': 10
          },
          'start': 0,
          'end': 10
      }
  ],
  'start': 0,
  'end': 10
}],
['(x, y)=>x', `(x, y)=>x`, Context.OptionsRanges, {
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
                  'start': 8,
                  'end': 9
              },
              'params': [
                  {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  },
                  {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 4,
                      'end': 5
                  }
              ],
              'id': null,
              'async': false,
              'generator': false,
              'expression': true,
              'start': 0,
              'end': 9
          },
          'start': 0,
          'end': 9
      }
  ],
  'start': 0,
  'end': 9
}],
['a = (b) => c', `a = (b) => c`, Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'Identifier',
                  'name': 'a',
                  'start': 0,
                  'end': 1
              },
              'operator': '=',
              'right': {
                  'type': 'ArrowFunctionExpression',
                  'body': {
                      'type': 'Identifier',
                      'name': 'c',
                      'start': 11,
                      'end': 12
                  },
                  'params': [
                      {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 5,
                          'end': 6
                      }
                  ],
                  'id': null,
                  'async': false,
                  'generator': false,
                  'expression': true,
                  'start': 4,
                  'end': 12
              },
              'start': 0,
              'end': 12
          },
          'start': 0,
          'end': 12
      }
  ],
  'start': 0,
  'end': 12
}]
];

pass('Expressions - Arrow (pass)', valids);

});
