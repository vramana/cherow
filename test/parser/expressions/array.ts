import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Array', () => {});

for (const arg of ['[...]', '[a, ...]', '[..., ]', '[..., ...]', '[ (...a)]']) {
  it(`${arg}`, () => {
    t.throws(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.throws(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.throws(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.OptionsWebCompat);
    });
  });

  it(`${arg}`, () => {
    t.throws(() => {
      parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
    });
  });
}

for (const arg of [
  '[1 <= 0]',
  '[a, ...b=c]',
  '[a, ...b=c]',
  '([a, ...b=c])',
  '[a] = x',
  '[a = b] = x',
  '[[a] = b] = x',
  '[,,,] = x',
  '[...a] = x',
  'v = [...a, b]',
  '[a,] = x',
  '[a, b] = f();',
  '[...a.b] = x',
  '[[a]] = x',
  '[...[a]] = x',
  '[(x)] = 1',
  '[,,1,,,2,3,,]',
  '[ 1, 2,, 3, ]',
  '[ 0 ]',
  '[ ,, 0 ]',
  '[,,3,,,]',
  '[x()]',
  '[...a]',
  '[a, ...b]',
  '[...a,]',
  '[...a, ,]',
  '[, ...a]',
  '[x().foo] = x',
  '[(x().foo)] = x',
  '[...a, ...b]',
  '[...a, , ...b]',
  `[...x, y];`,
  `async(...x/y);`,
  'var array = [,,,,,];',
  'var a = [,];',
  'let a = [];',
  'let b = [42];',
  'let c = [42, 7];',
  'let [d, ...e] = [1, 2, 3, 4, 5];',
  `[...x];`,
  `[...x] = y;`,
  `[...[x].foo] = x`,
  `[...[x]/y]`,
  `(...[x]) => x`,
  `(...{x}) => x`,
  `[...{x}]`,
  `[...{x}] = y`,
  `([...{x}]) => x`,
  `[...{x}/y]`,
  `[...{x}.foo] = x`,
  `([...[x]]) => x`,
  `[...[x]] = y`,
  `[...[x]]`,
  '[...[...a]]',
  '[a, ...b]',
  '[function* f() {}]',
  '[a, ...{0: b}] = (1);',
  '[...{a}] = b;',
  '[...{a}] = b;',
  '[a, ...{0: b}] = 1',
  '[1, "z", "a", "Symbol(foo)"]',
  '[1, 2, 3, ...[]]',
  ' [...{}];',
  '[1,2,,4,5];',
  `[a,]`,
  `[a,,]`,
  `[a,a,]`,
  `[a,,,]`,
  `[a,a,,]`,
  `[,a]`,
  `[,a,]`,
  `[,a,,]`,
  `[,a,a,]`,
  `[,a,]`,
  `[,a,,]`,
  `[,a,a,]`,
  `[,,a]`,
  `[,a,a]`,
  `[,,a,]`,
  `[,,a,]`,
  `[,,,a]`,
  `[,,a,a]`,
  'a = [,]',
  'a = [,]',
  '[[1,2], [3], []]',
  '[1,2,,4,5]',
  '[0, ...a];',
  '[...iter];',
  'a = [,] = b = [] = c[9]',
  'a = [(b), (c), (d)]',
  'a = [(b) => {}, (c) => {}, (d) => { [b]}]',
  'a = [(b) => {}, [(b) => {}, (c) => {}, (d) => { [b]}]]',
  'a = [,]',
  'a = [,]',
  'a = [a = [,],a = [a = [,],a = [,]]]',
  'async = [,]',
  `async ([[[]]]) => [[,,a,a=> {}]]`,
  `[[,,a,a=> {}]]`,
  `[[,,a=> {},a]]`,
  `[[a=> {},,a,]]`,
  `[[] = [9], {} = [], c = d, [,,a,a=> {}]]`,
  `[[,,a,a=> {}]]`,
  '([].x);',
  '[...this, y];',
  '[...x, y];',
  '[...x];',
  '[...x] = y;',
  '[...this];',
  '[...new x];',
  '[...x = x];',
  '([...x=y])',
  'async([].x);',
  '[...[a]=1]',
  '[...[1]]',
  '[...[1], ..."foo" ]',
  '[...[1], ...2 ]',
  '[...[1], ..."foo", ]',
  '[...[1], ...2 ,]',
  '[...[1], ..."a".b]',
  '[...[1], ..."a"[b]]',
  '[...[1], ..."a"(b)]',
  '[...[1], ["a"](b)]',
  '[...[1], "a"(b)]',
  '[...a]',
  '[a, ...b]',
  '[...a,]',
  '[...a, ,]',
  '[, ...a]',
  '[...a, ...b]',
  '[...a, , ...b]',
  '[...[...a]]',
  '[, ...a]',
  '[, , ...a]',
  '[,]',
  `[...50..bar]`,
  `[...50]`,
  '[...a=b]',
  '[{}.foo] = x',
  '[{}[foo]] = x',
  `[[]]`,
  '([...x]) => x',
  '([...x]);',
  '([...x=y]);',
  '([...x, ...y]);',
  '([...x.y] = z)',
  '([...x, ...y]);',
  '[{}.foo]=x',
  '[5[foo]]=x',
  '["x".foo]=x',
  //'[`x`.foo]=x',
  `[x]=y`,
  `[x=y]=z`,
  `({"a b c": bar});`,
  `({"a b c"(){}});`,
  `({"a b c": bar}) => x`,
  `({15: bar});`,
  `({15(){}});`,
  `({15: bar}) => x`,
  `({25: true})`,
  `({"x": true})`,
  '[a.b=[c.d]=e] = f;',
  '([a=[b.c]=d]) => e;',
  '[{x: y.z}]',
  '[{x: y.z}] = a',
  '([a] = b) => c;',
  '([a]) => b;',
  'const [a] = b;',
  'function foo([a]){};',
  'function foo([a] = b){};',
  '({"foo": [x].foo}=y);',
  '[...foo] = bar',
  `for ([...a.b] in c) d`,
  `[...a.b]=c`,
  '[...a.b]=c',
  '[...a.b] = c',
  '([...a.b] = c)',
  '([...[x]]) => x',
  '[(a)] = x',
  '[...[x]=y];',
  '[...[{a: b}.c]] = [];',
  '[...[{prop: 1}.prop]] = []',
  '({ a: {prop: 1}.prop } = {})',
  '[{a: 1}.c] = [];',
  '[({a: 1}.c)] = [];',
  '[[1].c] = [];',
  '[foo.foo, foo.bar] = [1, 2];',
  '[([1].c)] = [];',
  '({ a: {prop: 1}.prop } = {})',
  'var [, a, , b] = x',
  'var [] = x',
  'var [...a] = x;',
  'var [a] = x;',
  '[foo, bar] = [0,1];',
  '[a,a,,...a]=0',
  '[,,]=0',
  '[...a[0]] = 0',
  '[...{ a }] = b',
  '[a,b=0,[c,...a[0]]={}]=0;',
  '[a] = 0;',
  '[1, /regex/g]'
]) {
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.OptionsWebCompat);
    });
  });

  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
    });
  });
}
fail('Expressions - Array (fail)', [
  ['[[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]]', Context.Empty],
  [`try {} catch ([...a.b]) {}`, Context.Empty],
  [`let [...a.b]=c`, Context.Empty],
  [`for (let [...a.b] in c) d`, Context.Empty],
  ['[...[1], ...1.a]', Context.Empty],
  ['[...break]', Context.Empty],
  ['[...break }', Context.Empty],
  ['[...break :', Context.Empty],
  ['[...break', Context.Empty],
  [`[...a, ...b] = x`, Context.Empty],
  [`[([a])] = x`, Context.Empty],
  // [`[...a = b] `, Context.Empty],
  [`[...a,] = x `, Context.Empty],
  //[`++[a];`, Context.Empty],
  [`[...{0=x} = c] `, Context.Empty],
  [`[...{a: 0=x} = c] `, Context.Empty],
  [`[...{0} = c] `, Context.Empty],
  [`[...{a: 0} = c]`, Context.Empty],
  [`({x:0 = 5})`, Context.Empty],
  [`[...{true=x} = c]`, Context.Empty],
  [`[...{a: true=x} = c]`, Context.Empty],
  [`[...{true} = c]`, Context.Empty],
  [`[...{a: function=x} = c]`, Context.Empty],
  [`[...{a: true=x} = c]`, Context.Empty],
  [`({x:true = 5})`, Context.Empty],
  [`var [a]; `, Context.Empty],
  [`var ([a]) = x;`, Context.Empty],
  [`var [...a, b] = x;`, Context.Empty],
  [`var [...a,] = x;`, Context.Empty],
  //  [`[...await]`, Context.Module],
  [`[...yield]`, Context.Strict],
  [`[.../x//yield]`, Context.Strict],
  //['[...await] = obj', Context.Module],
  ['[...yield] = obj', Context.Strict],
  ['async x => [...await x] = obj', Context.Empty],
  ['[...a + b] = c', Context.Empty],
  ['function *f(){ return [...yield] = obj; }', Context.Empty],
  ['function *f(){ return [...yield x] = obj; }', Context.Empty],
  ['({...yield} = obj)', Context.Strict],
  //  ['async([].x) => x;', Context.Empty],
  [`[x=await y]=z`, Context.Empty],
  [`[x=await y]=z`, Context.Empty],
  [`[.../x/ y]`, Context.Empty],
  [`[...{a = b} = c] = x`, Context.Empty],
  ['([...{a = b} = c]) => d;', Context.Empty],
  ['[...{a = b} = c] = d;', Context.Empty],
  ['result = [...{ x = yield }] = y;', Context.Strict],
  ['[true = x] = x', Context.Empty],
  ['(...)', Context.Empty],
  ['[...this, y] = foo;', Context.Empty],
  ['[{..}, x]', Context.Empty],
  ['[{..}, x]', Context.Empty],
  ['[{..}]', Context.Empty],
  ['[{..}.x]', Context.Empty],
  ['[{..}=x]', Context.Empty],
  [`[[foo].food()] = x`, Context.Empty],
  [`[[foo].food() = x] = x`, Context.Empty],
  [`[[..][foo]] = x`, Context.Empty],
  [`[[..].foo] = x`, Context.Empty],
  [`[[..]=x]`, Context.Empty],
  [`[[..].x]`, Context.Empty],
  [`[[..], x]`, Context.Empty],
  [`[[..]]`, Context.Empty],
  [`([...x.y]) => z`, Context.Empty],
  [`([...x.y] = z) => z`, Context.Empty],
  ['[a, ...]', Context.Empty],
  ['[..., ]', Context.Empty],
  ['[..., ...]', Context.Empty],
  ['[ (...a)]', Context.Empty],
  ['[true = x]', Context.Empty],
  ['[this] = x', Context.Empty],
  ['[false] = x', Context.Empty],
  ['[false] = x', Context.Empty],
  ['[function(){}] = x', Context.Empty],
  ['[new x] = x', Context.Empty],
  ['[null] = x', Context.Empty],
  ['[true] = x', Context.Empty],
  ['[typeof x] = x', Context.Empty],
  ['[void x] = x', Context.Empty],
  ['[--x = 1]', Context.Empty],
  ['[...x += y] = a;', Context.Empty],
  //['[await = x] = x', Context.Module],
  ['[...a = 1 = a]', Context.Empty],
  ['[...1 = a]', Context.Empty],
  ['[this] = obj', Context.Empty],
  ['[x, ...y, z] = obj', Context.Empty],
  ['[x, y, ...z()] = obj', Context.Empty],
  ['[x, ...z = arr, y] = obj', Context.Empty],
  ['[x, ...z(), y] = obj', Context.Empty],
  ['[x, ...z + arr, y] = obj', Context.Empty],
  ['[...this] = obj', Context.Empty],
  ['[...true] = x', Context.Empty],
  ['[...true] => x', Context.Empty],
  ['[...new] = x', Context.Empty],
  ['[..."foo"=x] = x', Context.Empty],
  ['[...[a](1)=2] = 3', Context.Empty],
  ['[...[a](1)] = 3', Context.Empty],
  ['[...[a].1] = 3', Context.Empty],
  ['[...[1], "a"(b)] = x', Context.Empty],
  ['[...[1], ["a"](b)] = x', Context.Empty],
  ['[...]', Context.Empty],
  ['[..."x"=b]', Context.Empty],
  ['[...a=b] = x', Context.Empty],
  ['[..."foo".foo=x] = x', Context.Empty],
  ['[x, y, ...z = arr] = obj', Context.Empty],
  ['[x, y, ...z = arr] = x = obj', Context.Empty],
  ['[..."foo"+bar] = x', Context.Empty],
  ['[...[a](1)] = 3', Context.Empty],
  ['[...[x].map(y, z)] = a;', Context.Empty],
  ['[ ...([a] = []) = a;', Context.Empty],
  ['[ x += x ] = a;', Context.Empty],
  ['[...++x] = a;', Context.Empty],
  ['[...x--] = a;', Context.Empty],
  ['[...!x] = a;', Context.Empty],
  ['[...x + y] = a;', Context.Empty],
  ['[...z = 1] = a;', Context.Empty],
  ['[x, y, ...z = 1] = a;', Context.Empty],
  ['[...x,] = a;', Context.Empty],
  ['[x, ...y, z] = a;', Context.Empty],
  ['[async(x,y) => z] = a;', Context.Empty],
  //  ['[async x => z] = a;', Context.Empty],
  ['[--x = 1] = a;', Context.Empty],
  ['[x()] = a;', Context.Empty],
  ['[this = 1] = a;', Context.Empty],
  ['[x--] = a;', Context.Empty],
  ['[--x = 1] = a;', Context.Empty],
  ['[x, y, ...[z] = [1]] = a;', Context.Empty],
  ['[...[z] = [1]] = a;', Context.Empty],
  ['[...rest, x] = x', Context.Empty],
  ['[a,b,...rest, x] = x', Context.Empty],
  ['[...rest,] = x', Context.Empty],
  ['[a,b,...rest,...rest1] = x', Context.Empty],
  ['[a,,..rest,...rest1]  = x ', Context.Empty],
  ['{...[ x = 5 ] }', Context.Empty],
  ['{...[x] } = x', Context.Empty],
  ['{...[ x = 5 ] }', Context.Empty],
  ['[...a, b] = v', Context.Empty],
  [`[...this] = x;`, Context.Empty],
  [`[...this] => x;`, Context.Empty],
  [`[{a: 1} = []];`, Context.Empty],
  [`[{a: 1} = []];`, Context.Empty],
  [`[{a: 1} = []];`, Context.Empty],
  [`[{a: 1} = []];`, Context.Empty],
  ['[...[1], ...1.a]', Context.Empty],
  ['[...break]', Context.Empty],
  ['[...break }', Context.Empty],
  ['[...break :', Context.Empty],
  ['[...break', Context.Empty],
  [`[...this] = x;`, Context.Empty],
  [`[...this] => x;`, Context.Empty],
  //['async([].x) => x;', Context.Empty],
  [`[x=await y]=z`, Context.Empty],
  [`[x=await y]=z`, Context.Empty],
  [`[.../x/ y]`, Context.Empty],
  [`[...{a = b} = c] = x`, Context.Empty],
  ['([...{a = b} = c]) => d;', Context.Empty],
  ['[...{a = b} = c] = d;', Context.Empty],
  ['result = [...{ x = yield }] = y;', Context.Strict],
  ['[true = x] = x', Context.Empty],
  ['(...)', Context.Empty],
  ['[...this, y] = foo;', Context.Empty],
  ['[{..}, x]', Context.Empty],
  ['[{..}, x]', Context.Empty],
  ['[{..}]', Context.Empty],
  ['[{..}.x]', Context.Empty],
  ['[...true] = x', Context.Empty],
  ['[...true] => x', Context.Empty],
  ['[...new] = x', Context.Empty],
  ['[..."foo"=x] = x', Context.Empty],
  ['[...[a](1)=2] = 3', Context.Empty],
  ['[...[a](1)] = 3', Context.Empty],
  ['[...[a].1] = 3', Context.Empty],
  ['[...[1], "a"(b)] = x', Context.Empty],
  ['[...[1], ["a"](b)] = x', Context.Empty],
  ['[...]', Context.Empty],
  ['[..."x"=b]', Context.Empty],
  ['[...a=b] = x', Context.Empty],
  ['[..."foo".foo=x] = x', Context.Empty],
  ['[x, y, ...z = arr] = obj', Context.Empty],
  ['[x, y, ...z = arr] = x = obj', Context.Empty],
  ['[..."foo"+bar] = x', Context.Empty],
  ['[...[a](1)] = 3', Context.Empty],
  ['[...[x].map(y, z)] = a;', Context.Empty],
  ['[ ...([a] = []) = a;', Context.Empty],
  ['[ x += x ] = a;', Context.Empty],
  ['[...++x] = a;', Context.Empty],
  ['[...x--] = a;', Context.Empty],
  ['[true = x]', Context.Empty],
  ['[this] = x', Context.Empty],
  ['[false] = x', Context.Empty],
  ['[false] = x', Context.Empty],
  ['[function(){}] = x', Context.Empty],
  ['(...)', Context.Empty],
  ['[...this, y] = foo;', Context.Empty],
  ['[{..}, x]', Context.Empty],
  ['[{..}, x]', Context.Empty],
  ['[{..}]', Context.Empty],
  ['[{..}.x]', Context.Empty],
  ['[{..}=x]', Context.Empty],
  ['[...!x] = a;', Context.Empty],
  ['[...x + y] = a;', Context.Empty],
  ['[...z = 1] = a;', Context.Empty],
  ['[x, y, ...z = 1] = a;', Context.Empty],
  ['[...x,] = a;', Context.Empty],
  ['[x, ...y, z] = a;', Context.Empty],
  ['[async(x,y) => z] = a;', Context.Empty],
  ['[--x = 1] = a;', Context.Empty],
  ['[x()] = a;', Context.Empty],
  ['[this = 1] = a;', Context.Empty],
  ['[x--] = a;', Context.Empty],
  ['[--x = 1] = a;', Context.Empty],
  //['[async x => z] = a;', Context.Empty],
  ['[x, y, ...[z] = [1]] = a;', Context.Empty],
  ['[...[z] = [1]] = a;', Context.Empty],
  ['[...rest, x] = x', Context.Empty],
  ['[a,b,...rest, x] = x', Context.Empty],
  ['[...rest,] = x', Context.Empty],
  ['[a,b,...rest,...rest1] = x', Context.Empty],
  ['[a,,..rest,...rest1]  = x ', Context.Empty],
  ['{...[ x = 5 ] }', Context.Empty],
  ['{...[x] } = x', Context.Empty],
  ['{...[ x = 5 ] }', Context.Empty],
  ['{...[ x = 5 ] }', Context.Empty],
  ['[x + y] = x', Context.Empty],
  ['x, [foo + y, bar] = doo', Context.Empty],
  ['[50] = a;', Context.Empty],
  ['[0,{a=0}] = 0', Context.Empty],
  ['[0] = 0', Context.Empty],
  ['[x[yield]]] = value;', Context.Empty],
  ['[[(x, y)]] = x;', Context.Empty],
  ['[...[(x, y)]] = x;', Context.Empty],
  ['[ ...[ ( [ a ] ) ] ] = a;', Context.Empty],
  ['[(foo())] = a;', Context.Empty],
  ['[ ([a]) ] = a;', Context.Empty],
  ['[ (++y) ] = a;', Context.Empty],
  ['([this]) => x;', Context.Empty]
]);

pass('Expressions - Array (pass)', [
  [
    '[x = true] = y',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  right: {
                    type: 'Literal',
                    value: true
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ]
    }
  ],
  [
    '[[x] = true] = y',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      }
                    ]
                  },
                  right: {
                    type: 'Literal',
                    value: true
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ]
    }
  ],
  [
    '[[x = true] = true] = y',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'Literal',
                          value: true
                        }
                      }
                    ]
                  },
                  right: {
                    type: 'Literal',
                    value: true
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ]
    }
  ],
  [
    '["foo".foo] = x',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: 'foo'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[a]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'a'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[,,,]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [null, null, null]
          }
        }
      ]
    }
  ],
  [
    '[,,x]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              null,
              null,
              {
                type: 'Identifier',
                name: 'x'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[this];',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'ThisExpression'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, y, ...z]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, ...y, z]',
    Context.OptionsRanges | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x',
                start: 1,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                }
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'Identifier',
                  name: 'y',
                  start: 7,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                },
                start: 4,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                }
              },
              {
                type: 'Identifier',
                name: 'z',
                start: 10,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              }
            ],
            start: 0,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 12
              }
            }
          },
          start: 0,
          end: 12,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 12
            }
          }
        }
      ],
      start: 0,
      end: 12,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 12
        }
      }
    }
  ],
  [
    '[x, y, ...z = arr]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'arr'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, y, ...z()]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  arguments: []
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, y, ...z + arr]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'arr'
                  },
                  operator: '+'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, ...z = arr, y]',
    Context.OptionsRanges,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x',
                start: 1,
                end: 2
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'z',
                    start: 7,
                    end: 8
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'arr',
                    start: 11,
                    end: 14
                  },
                  start: 7,
                  end: 14
                },
                start: 4,
                end: 14
              },
              {
                type: 'Identifier',
                name: 'y',
                start: 16,
                end: 17
              }
            ],
            start: 0,
            end: 18
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    }
  ],
  [
    '[x, ...z(), y]',
    Context.OptionsRanges,
    {
      type: 'Program',
      start: 0,
      end: 14,
      body: [
        {
          type: 'ExpressionStatement',
          start: 0,
          end: 14,
          expression: {
            type: 'ArrayExpression',
            start: 0,
            end: 14,
            elements: [
              {
                type: 'Identifier',
                start: 1,
                end: 2,
                name: 'x'
              },
              {
                type: 'SpreadElement',
                start: 4,
                end: 10,
                argument: {
                  type: 'CallExpression',
                  start: 7,
                  end: 10,
                  callee: {
                    type: 'Identifier',
                    start: 7,
                    end: 8,
                    name: 'z'
                  },
                  arguments: []
                }
              },
              {
                type: 'Identifier',
                start: 12,
                end: 13,
                name: 'y'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x, ...z + arr, y]',
    Context.OptionsRanges,
    {
      type: 'Program',
      start: 0,
      end: 18,
      body: [
        {
          type: 'ExpressionStatement',
          start: 0,
          end: 18,
          expression: {
            type: 'ArrayExpression',
            start: 0,
            end: 18,
            elements: [
              {
                type: 'Identifier',
                start: 1,
                end: 2,
                name: 'x'
              },
              {
                type: 'SpreadElement',
                start: 4,
                end: 14,
                argument: {
                  type: 'BinaryExpression',
                  start: 7,
                  end: 14,
                  left: {
                    type: 'Identifier',
                    start: 7,
                    end: 8,
                    name: 'z'
                  },
                  operator: '+',
                  right: {
                    type: 'Identifier',
                    start: 11,
                    end: 14,
                    name: 'arr'
                  }
                }
              },
              {
                type: 'Identifier',
                start: 16,
                end: 17,
                name: 'y'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[...this];',
    Context.OptionsRanges,
    {
      type: 'Program',
      start: 0,
      end: 10,
      body: [
        {
          type: 'ExpressionStatement',
          start: 0,
          end: 10,
          expression: {
            type: 'ArrayExpression',
            start: 0,
            end: 9,
            elements: [
              {
                type: 'SpreadElement',
                start: 1,
                end: 8,
                argument: {
                  type: 'ThisExpression',
                  start: 4,
                  end: 8
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[...x.list];',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'list'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...x.list] = a;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'RestElement',
                  argument: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'list'
                    }
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'a'
            }
          }
        }
      ]
    }
  ],
  [
    '[...x = y];',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...x += y];',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '+=',
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...[x].map(y, z)];',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ]
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'map'
                    }
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'y'
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...[x].map(y, z)[x]] = a;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'RestElement',
                  argument: {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'x'
                            }
                          ]
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'map'
                        }
                      },
                      arguments: [
                        {
                          type: 'Identifier',
                          name: 'y'
                        },
                        {
                          type: 'Identifier',
                          name: 'z'
                        }
                      ]
                    },
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'a'
            }
          }
        }
      ]
    }
  ],
  [
    '[...{x:y}/y]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...{x}/y]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...[x]/y]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[.../x/]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'Literal',
                  value: {},
                  regex: {
                    pattern: 'x',
                    flags: ''
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[.../x/+y]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'x',
                      flags: ''
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '+'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[.../x//y]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'x',
                      flags: ''
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[.../x/g/y]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'x',
                      flags: 'g'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[new x()[y]] = z',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'NewExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    arguments: []
                  },
                  computed: true,
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[new x().y = a] = z',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'NewExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[new x()[y] = a] = z',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'NewExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[x()[y] = a + b] = z',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    operator: '+'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[new x()[y] = a + b] = z',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'NewExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    operator: '+'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[function(){}.length] = x',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,
                    id: null
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[5..length] = x',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: 5
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '["X".length] = x',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: 'X'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[`x`.length] = x',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'x',
                          raw: 'x'
                        },
                        tail: true
                      }
                    ]
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[`a${5}b`.length] = x',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'TemplateLiteral',
                    expressions: [
                      {
                        type: 'Literal',
                        value: 5
                      }
                    ],
                    quasis: [
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'a',
                          raw: 'a'
                        },
                        tail: false
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'b',
                          raw: 'b'
                        },
                        tail: true
                      }
                    ]
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[/foo/.length] = x',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'foo',
                      flags: ''
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[/x/g.length] = x',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'x',
                      flags: 'g'
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[{}.x] = y',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'ObjectExpression',
                    properties: []
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ]
    }
  ],
  [
    '[{}[x]] = y',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'ObjectExpression',
                    properties: []
                  },
                  computed: true,
                  property: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ]
    }
  ],
  [
    '[x()[y]] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: true,
                  object: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    arguments: []
                  },
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x.y = a] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x().y = a] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[a[x.y] = a] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    property: {
                      type: 'MemberExpression',
                      computed: false,
                      object: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x()[y] = a ] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x.y = a + b] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x().y = a + b] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[foo, [x,y,z], bar = B] = arr;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'Identifier',
                      name: 'y'
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'bar'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'B'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[foo, [[[[[[[[[[[[[x,y,z]]]]]]]]]]]]], bar = B] = arr;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'ArrayPattern',
                              elements: [
                                {
                                  type: 'ArrayPattern',
                                  elements: [
                                    {
                                      type: 'ArrayPattern',
                                      elements: [
                                        {
                                          type: 'ArrayPattern',
                                          elements: [
                                            {
                                              type: 'ArrayPattern',
                                              elements: [
                                                {
                                                  type: 'ArrayPattern',
                                                  elements: [
                                                    {
                                                      type: 'ArrayPattern',
                                                      elements: [
                                                        {
                                                          type: 'ArrayPattern',
                                                          elements: [
                                                            {
                                                              type: 'ArrayPattern',
                                                              elements: [
                                                                {
                                                                  type: 'ArrayPattern',
                                                                  elements: [
                                                                    {
                                                                      type: 'Identifier',
                                                                      name: 'x'
                                                                    },
                                                                    {
                                                                      type: 'Identifier',
                                                                      name: 'y'
                                                                    },
                                                                    {
                                                                      type: 'Identifier',
                                                                      name: 'z'
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'bar'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'B'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[foo, [x,y = 20,z], bar = B] = arr;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      right: {
                        type: 'Literal',
                        value: 20
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'bar'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'B'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'foo([a, b] = arr);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'foo'
            },
            arguments: [
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    },
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'arr'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'x, [foo, bar] = doo',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'doo'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'x, [foo = y, bar] = doo',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'doo'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'x = [a, b] = y',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            right: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  },
                  {
                    type: 'Identifier',
                    name: 'b'
                  }
                ]
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[a, b] = c = d',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ]
            },
            right: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'c'
              },
              right: {
                type: 'Identifier',
                name: 'd'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[a,b=[x,y]] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      },
                      {
                        type: 'Identifier',
                        name: 'y'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(foo, [bar, baz] = doo);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'Identifier',
                name: 'foo'
              },
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'bar'
                    },
                    {
                      type: 'Identifier',
                      name: 'baz'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'doo'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x.y] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x().y] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    arguments: []
                  },
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[a[x.y]] = z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: true,
                  object: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  property: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[5[foo]]=x',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: true,
                  object: {
                    type: 'Literal',
                    value: 5
                  },
                  property: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '["x".foo]=x',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Literal',
                    value: 'x'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x.y = z]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                },
                right: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x + y]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x = y, z]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              {
                type: 'Identifier',
                name: 'z'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[await = x]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'await'
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x()]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x'
                },
                arguments: []
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x().foo]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                },
                property: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[[foo].length] = x',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    ]
                  },
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x, y]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x = y]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x.y]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'x'
                },
                property: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: []
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[,]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [null]
          }
        }
      ]
    }
  ],
  [
    '[,,]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [null, null]
          }
        }
      ]
    }
  ],
  [
    '[x,]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x,,,]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x'
              },
              null,
              null
            ]
          }
        }
      ]
    }
  ],
  [
    '[x,,y]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'x'
              },
              null,
              {
                type: 'Identifier',
                name: 'y'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[foo = A] = arr;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'A'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ]
    }
  ],
  [
    '[foo, bar] = arr;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'Identifier',
                  name: 'bar'
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[foo = A, bar = B] = arr;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'A'
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'bar'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'B'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x &= 42]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                operator: '&=',
                right: {
                  type: 'Literal',
                  value: 42
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[a = 2]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                operator: '=',
                right: {
                  type: 'Literal',
                  value: 2
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[a, /regexp/gi]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'a'
              },
              {
                type: 'Literal',
                value: {},
                regex: {
                  pattern: 'regexp',
                  flags: 'gi'
                }
              }
            ]
          }
        }
      ]
    }
  ]
]);
