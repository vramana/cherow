import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Destructuring - Binding', () => {});

const invalidSyntax = [
  '({e: a.b}) => 0',
  'function a({e: a.b}) {}',
  'function* a({e: a.b}) {}',
  '(function ({e: a.b}) {})',
  '(function* ({e: a.b}) {})',
  '(function* ([a.b]) {})',
  '({a([a.b]){}})',
  '({*a([a.b]){}})',
  '({set a([a.b]){}})',
  'function a([a.b]) {}',
  '([a.b]) => 0',
  '({a({e: a.b}){}})',
  '({*a({e: a.b}){}})',
  '({set a({e: a.b}){}})',
  '({a = 0});',
  //'({a} += 0);',
  '([{x: y.z}]) => b',
  '([{x: y.z}] = a) => b',
  '([{x: y.z} = a]) => b',
  '({a,,} = 0)',
  '({,a,} = 0)',
  '({a,,a} = 0)',
  '({function} = 0)',
  '({a:function} = 0)',
  // '({a:for} = 0)',
  "({'a'} = 0)",
  '({var} = 0)',
  '({a.b} = 0)',
  '{a = [...b, c]} = 0',
  '[a, ...b, {c=0}]',
  '({0} = 0)'
];

for (const arg of invalidSyntax) {
  it(`${arg}`, () => {
    t.throws(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  it(`${arg}`, () => {
    t.throws(() => {
      parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
    });
  });
}

const validSyntax = [
  '({x} = 0)',
  '({x,} = 0)',
  '({x,y} = 0)',
  '({x,y,} = 0)',
  '({[a]: a} = 1)',
  '({x = 0} = 1)',
  '({x = 0,} = 1)',
  '({x: y} = 0)',
  '({x: y,} = 0)',
  '({var: x} = 0)',
  '({"x": y} = 0)',
  "({'x': y} = 0)",
  '({0: y} = 0)',
  '({0: x, 1: x} = 0)',
  '({x: y = 0} = 1)',
  '({x: y = z = 0} = 1)',
  '({x: [y] = 0} = 1)',
  '({a:let} = 0);',
  '({let} = 0);',
  '({a:yield} = 0);',
  '({yield} = 0);',
  '({yield = 0} = 0);',
  'try {} catch ({e = 0}) {}',
  'try {} catch ({e}) {}',
  'var {let, yield} = 0;',
  'var a, {x: {y: a}} = 0;',
  '(function*() { [...{ x = yield }] = 0; })',
  'var {a, x: {y: a}} = 0;',
  'var {a} = 0;',
  'var [{x, y}, [a, b]] = f();',
  'let [{x, y}, [a, b]] = f();',
  'let a = [{x:1, y:-1}, {x:2,y:-2}, {x:3,y:-3}];',
  "var o = { __proto__:null, 'a1':1, 'b2':2 };",
  'var a = [{x:1, y:-1}, {x:2,y:-2}, {x:3,y:-3}];',
  "var o = { __proto__:null, 'a1':1, 'b2':2 };",
  'var g34 = ({x = function() { return a }}, ...a) => { return x()[0] };',
  'var { x : x0 = 0, y : { z : z1 = 1}, x : x1 = 0} = o;',
  'var { x : x, y : y = 2 } = { x : 1 };',
  'for (var {z} = { z : 3 }; z != 0; z--) {}',
  'try {} catch ([e, ...a]) {}',
  'var [a, a] = 0;',
  'var [[a]]=0;',
  'var [a]=[1];',
  'let [...[a]] = [[]];',
  'let a; [...[a]] = [[]];',
  'let a; [...{a}] = [{}];',
  'let a; [...[a = 1]] = [[]];',
  'let [...[a]] = [[]];',
  'let a; [...{a:a = 1}] = [{}];',
  'var {a:a, a:a} = {};',
  'let a; ({a:a, a:a} = {});',
  'let a; ({a:((((a1))))} = {a:20})',
  'var a; [a = class aClass {}] = []',
  'var a; for ({x:x = class aClass {}} of []) {}',
  'var {x:[...y]} = {x:[1]}',
  '({a: [b = 1, c = 2][1]} = {a:[]});',
  '({a: [b = 1, c = 2].b} = {a:[]});',
  'var a; `${({a} = {})}`',
  'let a, r1; ({a:a1 = r1 = 44} = {})',
  'var a = 1; ({x = {a = 1} = {}} = {});',
  ' let {1:x1, 0:y1} = [11, 22];',
  'let [i,j] = [0,0];',
  'let [...[,...[[x2]]]] = [[1, 2], [3, 4], 5];',
  'for (let {x, y} = {x:10, y:20}; x<y; {x:x} = {x:x+2}) {}',
  "let {0:x2} = {'0':33};",
  '({x, y = 1, z = 2} = {});',
  'var [,a] = 0;',
  'var [{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];',
  'var { x : x, y : y, get, set } = { x : 1, y : 2, get: 3, set: 4 };',
  'var z = {x:x1} = {y:y1} = {x:10, y:20};',
  '[[...x] = [2, 1, 3]]',
  '[arrow = () => {}]',
  '[{ x, y, z } = { x: 44, y: 55, z: 66 }]',
  '[{ x: 11, y: 22, z: 33 }]',
  '[...[]]',
  'f = ([x]) => {}',
  'function fn2([{} = 42]) {}',
  'function fn3([a, {b: c}]) {}',
  'function fn4([a, {b: []}]) {}',
  'function fn1([a, b]) {}',
  'function fn2([a, b,]) {}',
  'function fn3([a,, b,]) {}',
  'function fn1([,]) {}',
  'function fn2([,,]) {}',
  'function fn1([...args]) {}',
  'function fn2([,,,,,,,...args]) {}',
  'function fn3([x, {y}, ...z]) {}',
  'function fn4([,x, {y}, , ...z]) {}',
  'function fn5({x: [...y]}) {}',
  'function fna({x: y}) {}',
  'function fnb({x: y = 42}) {}',
  'function fnc({x: {}}) {}',
  'function fnd({x: {y}}) {}',
  'function fne({x: {} = 42}) {}',
  'function fnf({x: {y} = 42}) {}',
  'function fn1({x,}) {}',
  'function fn2({a: {p: q, }, }) {}',
  'function fn3({x,}) {}',
  'function fna({x}) {}',
  'function fnb({x, y}) {}',
  'function fnc({x = 42}) {}',
  'function fnd({x, y = 42}) {} ',
  'function fn1({a: {p: q}, b: {r}, c: {s = 0}, d: {}}) {}',
  'function fn2(x, {a: r, b: s, c: t}, y) {}',
  'function fn3({x: {y: {z: {} = 42}}}) {}',
  'function fn1([{}]) {}',
  'function fn2([{a: [{}]}]) {}',
  'function fn3({a: [,,,] = 42}) {}',
  'function fn4([], [[]], [[[[[[[[[x]]]]]]]]]) {}',
  'function fn4([[x, y, ...z]]) {}'
];

for (const arg of validSyntax) {
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });
}

pass('Destructuring - Binding (pass)', [
  [
    'function fn1([{}]) {}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'ObjectPattern',
                  properties: []
                }
              ]
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'fn1'
          }
        }
      ]
    }
  ],
  [
    'function fn2([{} = 42]) {}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: []
                  },
                  right: {
                    type: 'Literal',
                    value: 42
                  }
                }
              ]
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'fn2'
          }
        }
      ]
    }
  ],
  [
    'function fn3([a, {b: c}]) {}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'c'
                      },
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              ]
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'fn3'
          }
        }
      ]
    }
  ],
  [
    'function fn4([a, {b: []}]) {}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      computed: false,
                      value: {
                        type: 'ArrayPattern',
                        elements: []
                      },
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              ]
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'fn4'
          }
        }
      ]
    }
  ],

  [
    '{ if (x) function f() {} ; function f() {} }',
    Context.OptionsWebCompat,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'IfStatement',
              test: {
                type: 'Identifier',
                name: 'x'
              },
              consequent: {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              },
              alternate: null
            },
            {
              type: 'EmptyStatement'
            },
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          ]
        }
      ]
    }
  ],
  [
    'function fn5({x: [...y]}) {}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  kind: 'init',
                  key: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  computed: false,
                  value: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'y'
                        }
                      }
                    ]
                  },
                  method: false,
                  shorthand: false
                }
              ]
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'fn5'
          }
        }
      ]
    }
  ],
  [
    'for (let [a = b] of [0, c = 0]);',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForOfStatement',
          body: {
            type: 'EmptyStatement'
          },
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      }
                    }
                  ]
                }
              }
            ]
          },
          right: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Literal',
                value: 0
              },
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'c'
                },
                operator: '=',
                right: {
                  type: 'Literal',
                  value: 0
                }
              }
            ]
          },
          await: false
        }
      ]
    }
  ]
]);
