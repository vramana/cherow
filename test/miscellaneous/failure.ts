import { pass, fail } from '../test-utils';

describe('Miscellaneous - Failure', () => {

    fail(`class default`, {
        source: `class default`,
        message: 'Unexpected keyword \'default\'',
        line: 1,
    });

    /* Test262 failing tests */

    fail(`  class C {
        static get ['prototype']() {}
      }
    });`, {
        source: `  class C {
            static get ['prototype']() {}
          }
        });`,
        message: 'Classes may not have static property named prototype',
        line: 2,
        column: 36,
        index: 48
    });

    fail(` class C {
        static set ['prototype'](x) {}
      }`, {
        source: ` class C {
            static set ['prototype'](x) {}
          }`,
        message: 'Classes may not have static property named prototype',
        line: 2,
        column: 36,
        index: 47
    });

    fail(`var obj = {
        async method() {
          var await;
        }
      };`, {
        source: `var obj = {
            async method() {
              var await;
            }
          };`,
        message:  'Unexpected reserved word',
        line: 3,
        column: 17,
        index: 58
    });

    fail(`var obj = {
        async method() {
          var \\u0061wait;
        }
      };`, {
        source: `var obj = {
            async method() {
              var \\u0061wait;
            }
          };`,
        message:  'Unexpected reserved word',
        line: 3,
        column: 17,
        index: 58
    });

    fail(`while (false) async function* g() {}`, {
        source: `while (false) async function* g() {}`,
        message: 'Async functions can only be declared at the top level or inside a block',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`while true break;`, {
        source: `while true break;`,
        message: 'Unexpected keyword \'true\'',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`while 1 break;`, {
        source: `while 1 break;`,
        message: 'Unexpected token number',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`var x in __arr;`, {
        source: `var x in __arr;`,
        message: 'Unexpected keyword \'in\'',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`var x += 1;`, {
        source: `var x += 1;`,
        message:  'Unexpected token +=',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`label: async function* g() {}`, {
        source: `label: async function* g() {}`,
        message: 'Async functions can only be declared at the top level or inside a block',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`if (false) let
    [a] = 0;`, {
        source: `if (false) let
        [a] = 0;`,
        message:  'Unexpected token let',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`if true;`, {
        source: `if true;`,
        message: 'Unexpected keyword \'true\'',
        line: 1,
        column: 2,
        index: 2
    });

    fail(`if({1})
    {
      ;
    }else
    {
      ;
    }`, {
        source: `if({1})
        {
          ;
        }else
        {
          ;
        }`,
        message: 'Unexpected token number',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`function *gen() {
        yield: ;
      }`, {
        source: `function *gen() {
            yield: ;
          }`,
        message: 'Unexpected token :',
        line: 2,
        column: 17,
        index: 35
    });

    fail(`function* f([...{ x }, y] = [1, 2, 3]) {};`, {
        source: `function* f([...{ x }, y] = [1, 2, 3]) {};`,
        message: 'Unexpected token ,',
        line: 1,
        column: 21,
        index: 21
    });

    fail(`function _13_1_16_fun(eval) { 'use strict'; }`, {
        source: `function _13_1_16_fun(eval) { 'use strict'; }`,
        message: 'Unexpected strict mode reserved word',
        line: 1,
        column: 22,
        index: 22
    });

    fail(`"use strict"; function _13_1_3_fun(arguments) { }`, {
        source: `"use strict"; function _13_1_3_fun(arguments) { }`,
        message: 'Eval or arguments can\'t be assigned to in strict mode code',
        line: 1,
        column: 35,
        index: 35
    });

    fail(`"use strict"; function arguments() { }`, {
        source: `"use strict"; function arguments() { }`,
        message: 'Eval or arguments can\'t be assigned to in strict mode code',
        line: 1,
        column: 22,
        index: 22
    });

    fail(`function __func(){/ ABC}`, {
        source: `function __func(){/ ABC}`,
        message: 'Unterminated regular expression literal',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`function __func(){&1}`, {
        source: `function __func(){&1}`,
        message: 'Unexpected token &',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`function x,y,z(){}`, {
        source: `function x,y,z(){}`,
        message:  'Unexpected token ,',
        line: 1,
        column: 10,
        index: 10
    });

    fail(`function _13_0_11_fun() {
        "use strict";
        function _13_0_11_inner() {
            eval = 42;
        }
    }`, {
        source: `function _13_0_11_fun() {
            "use strict";
            function _13_0_11_inner() {
                eval = 42;
            }
        }`,
        message: 'Eval or arguments can\'t be assigned to in strict mode code',
        line: 4,
        column: 20,
        index: 112
    });

    fail(`function f(x = super.x) {}`, {
        source: `function f(x = super.x) {}`,
        message: 'Member access from super not allowed in this context',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`function f() {
        super();
      }`, {
        source: `function f() {
            super();
          }`,
        message: 'super() is not allowed in this context',
        line: 2,
        column: 17,
        index: 32
    });

    fail(`function f([...{ x }, y] = [1, 2, 3]) {}`, {
        source: `function f([...{ x }, y] = [1, 2, 3]) {}`,
        message: 'Unexpected token ,',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`function f([...x = []] = []) {}`, {
        source: `function f([...x = []] = []) {}`,
        message: 'Unexpected token =',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`function f([...[x], y]) {}`, {
        source: `function f([...[x], y]) {}`,
        message: 'Unexpected token ,',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`function f(...x = []) {}`, {
        source: `function f(...x = []) {}`,
        message: 'Rest elements cannot have a initializer',
        line: 1,
        column: 15,
        index: 15
    });

    fail(`for (const x of []) label1: label2: function f() {}`, {
        source: `for (const x of []) label1: label2: function f() {}`,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
        line: 1,
        column: 35,
        index: 35
    });

    fail(`for ( let of [] ) ;`, {
        source: `for ( let of [] ) ;`,
        message: 'Unexpected token [',
        line: 1,
        column: 12,
        index: 12
    });

    fail(`for ([(x, y)] of []) {}`, {
        source: `for ([(x, y)] of []) {}`,
        message: '\'SequenceExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 19,
        index: 19
    });

    fail(`for ((this) of []) {}`, {
        source: `for ((this) of []) {}`,
        message: '\'ThisExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`
    var x;
    for (x of [], []) {}`, {
        source: `
        var x;
        for (x of [], []) {}`,
        message:  'Unexpected token ,',
        line: 3,
        column: 20,
        index: 36
    });

    fail(`for (let x of [], []) {}`, {
        source: `for (let x of [], []) {}`,
        message: 'Unexpected token ,',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`for (var [...[x], y] of [[1, 2, 3]]) {}`, {
        source: `for (var [...[x], y] of [[1, 2, 3]]) {}`,
        message: 'Unexpected token ,',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`for ([...x = 1] of [[]]) ;`, {
        source: `for ([...x = 1] of [[]]) ;`,
        message: 'Rest elements cannot have a default value',
        line: 1,
        column: 23,
        index: 23
    });

    fail(`for (var x of []) function* g() {}`, {
        source: `for (var x of []) function* g() {}`,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for (var x of []) class C {}`, {
        source: `for (var x of []) class C {}`,
        message:  'class can\'t appear in single-statement context',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for (var x of []) async function f() {}`, {
        source: `for (var x of []) async function f() {}`,
        message: 'Async functions can only be declared at the top level or inside a block',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for ((this) in {}) {}`, {
        source: `for ((this) in {}) {}`,
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for ({ x: [(x, y)] } in [{ x: [] }]) ;`, {
        source: `for ({ x: [(x, y)] } in [{ x: [] }]) ;`,
        message: '\'SequenceExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 35,
        index: 35
    });

    fail(`"use strict"; for ({ eval = 0 } in [{}]) ;`, {
        source: `"use strict"; for ({ eval = 0 } in [{}]) ;`,
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
        column: 25,
        index: 25
    });

    fail(`for ([...{ get x() {} }] in [[[]]]) ;`, {
        source: `for ([...{ get x() {} }] in [[[]]]) ;`,
        message: 'Invalid destructuring assignment target',
        line: 1,
        column: 34,
        index: 34
    });

    fail(`for ([...x = 1] in [[]]) ;`, {
        source: `for ([...x = 1] in [[]]) ;`,
        message:  'Rest elements cannot have a default value',
        line: 1,
        column: 23,
        index: 23
    });

    fail(`for ([{ get x() {} }] in [[{}]]) ;`, {
        source: `for ([{ get x() {} }] in [[{}]]) ;`,
        message: 'Invalid destructuring assignment target',
        line: 1,
        column: 31,
        index: 31
    });

    fail(`for ([[(x, y)]] in [[[]]]) ;`, {
        source: `for ([[(x, y)]] in [[[]]]) ;`,
        message: '\'SequenceExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 25,
        index: 25
    });

    fail(`for (var x in {}) let y;`, {
        source: `for (var x in {}) let y;`,
        message: 'Lexical declaration cannot appear in a single-statement context',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`for (var x in {}) function* g() {}`, {
        source: `for (var x in {}) function* g() {}`,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for (var x in {}) async function* g() {}`, {
        source: `for (var x in {}) async function* g() {}`,
        message: 'Async functions can only be declared at the top level or inside a block',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`async function* f() {
        for await (var x o\\u0066 []) ;
      }`, {
        source: `async function* f() {
            for await (var x o\\u0066 []) ;
          }`,
        message:  'Unexpected escaped keyword',
        line: 2,
        column: 28,
        index: 50
    });

    fail(`async function *fn() {
        for await (var [...[x], y] of asyncIter) {
               }
      }`, {
        source: `async function *fn() {
            for await (var [...[x], y] of asyncIter) {
                   }
          }`,
        message:  'Unexpected token ,',
        line: 2,
        column: 34,
        index: 57
    });

    fail(`async function *fn() {
        for await (var [...{ x }, y] of [[1, 2, 3]]) {
               }
      }`, {
        source: `async function *fn() {
            for await (var [...{ x }, y] of [[1, 2, 3]]) {
                   }
          }`,
        message:  'Unexpected token ,',
        line: 2,
        column: 36,
        index: 59
    });

    fail(`async function *fn() {
        for await (var [...[ x ] = []] of [[]]) {
        }
      }`, {
        source: `async function *fn() {
            for await (var [...[ x ] = []] of [[]]) {
            }
          }`,
        message:  'Unexpected token =',
        line: 2,
        column: 36,
        index: 59
    });

    fail(`async function *fn() {
        for await (let [...x, y] of asyncIter) {
        }
      }`, {
        source: `async function *fn() {
            for await (let [...x, y] of asyncIter) {
            }
          }`,
        message: 'Unexpected token ,',
        line: 2,
        column: 32,
        index: 55
    });

    fail(`async function *fn() {
        for await (let [...{ x } = []] of asyncIter) {
        }
      }`, {
        source: `async function *fn() {
            for await (let [...{ x } = []] of asyncIter) {
            }
          }`,
        message: 'Unexpected token =',
        line: 2,
        column: 36,
        index: 59
    });

    fail(`async function *fn() {
        for await (const [...{ x }, y] of asyncIter) {
        }
      }`, {
        source: `async function *fn() {
            for await (const [...{ x }, y] of asyncIter) {
            }
          }`,
        message: 'Unexpected token ,',
        line: 2,
        column: 38,
        index: 61
    });

    fail(`async function fn() {
        for await ([ x[yield] ] of [[]])
      }`, {
        source: `async function fn() {
            for await ([ x[yield] ] of [[]])
          }`,
        message:  'Unexpected token }',
        line: 2,
        column: 44,
        index: 66
    });

    fail(`for(var index=0; index<100; {index++; index*2;}) {	arr.add(""+index);};`, {
        source: `for(var index=0; index<100; {index++; index*2;}) {	arr.add(""+index);};`,
        message: 'Unexpected token ++',
        line: 1,
        column: 34,
        index: 34
    });

    fail(`for(1 in [1,2,3,4,5];1;) {
        break;
    }`, {
        source: `for(1 in [1,2,3,4,5];1;) {
            break;
        }`,
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`for (var a in [1,2,3,4,5];1;){
        break;
    }`, {
        source: `for (var a in [1,2,3,4,5];1;){
            break;
        }`,
        message: 'Unexpected token ;',
        line: 1,
        column: 25,
        index: 25
    });

    fail(`outer:for(var index=0;index<4;index+=1){
        nested:for(var index_n=0;index_n<=index;index_n++){
            if(index*index_n == 6)continue nonexist;
            __str+=""+index+index_n;
        }
    }`, {
        source: `outer:for(var index=0;index<4;index+=1){
            nested:for(var index_n=0;index_n<=index;index_n++){
                if(index*index_n == 6)continue nonexist;
                __str+=""+index+index_n;
            }
        }`,
        message: 'Undefined label \'nonexist\'',
        line: 3,
        column: 55,
        index: 160
    });

    fail(`do let x; while (false)`, {
        source: `do let x; while (false)`,
        message: 'Lexical declaration cannot appear in a single-statement context',
        line: 1,
        column: 3,
        index: 3
    });

    fail(`do function* g() {} while (false)`, {
        source: `do function* g() {} while (false)`,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
        line: 1,
        column: 2,
        index: 2
    });

    fail(`do async function* g() {} while (false)`, {
        source: `do async function* g() {} while (false)`,
        message: 'Async functions can only be declared at the top level or inside a block',
        line: 1,
        column: 2,
        index: 2
    });

    fail(`do break; while true;`, {
        source: `do break; while true;`,
        message: 'Unexpected keyword \'true\'',
        line: 1,
        column: 15,
        index: 15
    });

    fail(`const [...x, y] = [1, 2, 3];`, {
        source: `const [...x, y] = [1, 2, 3];`,
        message: 'Unexpected token ,',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`const [...x = []] = [];`, {
        source: `const [...x = []] = [];`,
        message: 'Unexpected token =',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`new C().#x;`, {
        source: `new C().#x;`,
        message:  'Invalid or unexpected token',
        next: true,
        line: 1,
        column: 8,
        index: 8
    });

    fail(`class C {
        static method(...a,) {

        }
      }`, {
        source: `class C {
            static method(...a,) {

            }
          }`,
        message: 'Rest parameter must be last formal parameter',
        line: 2,
        column: 30,
        index: 40
    });

    fail(`class C {
        method(...x = []) {

        }
      }`, {
        source: `class C {
            method(...x = []) {

            }
          }`,
        message:  'Rest elements cannot have a initializer',
        line: 2,
        column: 23,
        index: 33
    });

    fail(`class C { get a(param = null) {} }`, {
        source: `class C { get a(param = null) {} }`,
        message: 'Getter functions must have no arguments',
        line: 1,
        column: 28,
        index: 28
    });

    fail(`
    class C { *gen() {
        void yield;
    }}`, {
        source: `
        class C { *gen() {
            void yield;
        }}`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 3,
        column: 16,
        index: 44
    });

    fail(`class C {static *gen() {
        yield: ;
    }}`, {
        source: `class C {static *gen() {
            yield: ;
        }}`,
        message: 'Unexpected token :',
        line: 2,
        column: 17,
        index: 42
    });

    fail(`class C {
        #x = arguments;
      }`, {
        source: `class C {
            #x = arguments;
          }`,
        message: 'Invalid or unexpected token',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`class C {
        static #field;
      }`, {
        source: `class C {
            static #field;
          }`,
        message:  'Unexpected token',
        next: true,
        line: 2,
        column: 18,
        index: 28
    });

    fail(`class C {
        static #field = 0;
      }`, {
        source: `class C {
            static #field = 0;
          }`,
        next: true,
        message: 'Unexpected token',
        line: 2,
        column: 18,
        index: 28
    });

    fail(`class C {
        #x;

        x() {

          delete this.#x;
        }


      }`, {
        source: `class C {
            #x;

            x() {

              delete this.#x;
            }


          }`,
          next: true,
        message: 'Private fields can not be deleted',
        line: 6,
        column: 28,
        index: 98
    });

    fail(`class C {
        #x;

        x = delete ((this.#x));


      }`, {
        source: `class C {
            #x;

            x = delete ((this.#x));


          }`,
          next: true,
        message: 'Private fields can not be deleted',
        line: 4,
        column: 24,
        index: 63
    });

    fail(`var callCount = 0;
    class C {
      static method([...{ x }, y]) {

        callCount = callCount + 1;
      }
    };`, {
        source: `var callCount = 0;
        class C {
          static method([...{ x }, y]) {

            callCount = callCount + 1;
          }
        };`,
        message: 'Unexpected token ,',
        line: 3,
        column: 33,
        index: 70
    });

    fail(`var callCount = 0;
    class C {
      method([...{ x } = []]) {

        callCount = callCount + 1;
      }
    };`, {
        source: `var callCount = 0;
        class C {
          method([...{ x } = []]) {

            callCount = callCount + 1;
          }
        };`,
        message:  'Unexpected token =',
        line: 3,
        column: 26,
        index: 63
    });

    fail(`class C { static async *gen() {
        var yield;
    }}`, {
        source: `class C { static async *gen() {
            var yield;
        }}`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 2,
        column: 15,
        index: 47
    });

    fail(`var x=0,y=0;

    LABEL1 : do {
        x++;
        (function(){break LABEL1;})();
        y++;
    } while(0);`, {
        source: `var x=0,y=0;

        LABEL1 : do {
            x++;
            (function(){break LABEL1;})();
            y++;
        } while(0);`,
        message:  'Undefined label \'LABEL1\'',
        line: 5,
        column: 36,
        index: 89
    });

    fail(`class A { static set prototype() {} }`, {
        source: `class A { static set prototype() {} }`,
        message: 'Classes may not have static property named prototype',
        line: 1,
        column: 30,
        index: 30
    });

    fail(`class A { static prototype() {} }`, {
        source: `class A { static prototype() {} }`,
        message: 'Classes may not have static property named prototype',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`class A { static set method(_) { super(); } }`, {
        source: `class A { static set method(_) { super(); } }`,
        message: 'super() is not allowed in this context',
        line: 1,
        column: 38,
        index: 38
    });

    fail(`class A { * constructor() {} }`, {
        source: `class A { * constructor() {} }`,
        message: 'Class constructor may not be a generator',
        line: 1,
        column: 23,
        index: 23
    });

    fail(`class A { constructor() { super(); } }`, {
        source: `class A { constructor() { super(); } }`,
        message: 'super() is not allowed in this context',
        line: 1,
        column: 31,
        index: 31
    });

    fail(`var af = ()
    => {};`, {
        source: `var af = ()
        => {};`,
        message: 'No line break is allowed after \'=>\'',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`var af = ()
    => {};`, {
        source: `var af = ()
        => {};`,
        message: 'No line break is allowed after \'=>\'',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`var af = (x, x) => 1;`, {
        source: `var af = (x, x) => 1;`,
        message: 'Duplicate binding x',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`"use strict"; var af = eval => 1;`, {
        source: `"use strict"; var af = eval => 1;`,
        message: 'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 27,
        index: 27
    });

    fail(`for (;false;) let x;`, {
        source: `for (;false;) let x;`,
        message: 'Lexical declaration cannot appear in a single-statement context',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`"use strict"; var af = eval => 1;`, {
        source: `"use strict"; var af = eval => 1;`,
        message: 'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 27,
        index: 27
    });

    fail(`"use strict"; var af = eval => 1;`, {
        source: `"use strict"; var af = eval => 1;`,
        message: 'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 27,
        index: 27
    });

    fail(`function* f() {
        let
        yield 0;
    }`, {
        source: `function* f() {
            let
            yield 0;
        }`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 2,
        column: 15,
        index: 31
    });

    fail(`function f() {
        let
        await 0;
    }`, {
        source: `function f() {
            let
            await 0;
        }`,
        message: 'Unexpected token number',
        line: 3,
        column: 17,
        index: 48
    });

    fail(`let  // start of a LexicalDeclaration, *not* an ASI opportunity
    let;`, {
        source: `let  // start of a LexicalDeclaration, *not* an ASI opportunity
        let;`,
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 3,
        index: 3
    });

    fail(`label: const x;`, {
        source: `label: const x;`,
        message: 'Unexpected keyword \'const\'',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`if (true) {} else const x;`, {
        source: `if (true) {} else const x;`,
        message: 'Unexpected keyword \'const\'',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`if (true) const x = 1;`, {
        source: `if (true) const x = 1;`,
        message: 'Unexpected keyword \'const\'',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`do const x = 1; while (false)`, {
        source: `do const x = 1; while (false)`,
        message: 'Unexpected keyword \'const\'',
        line: 1,
        column: 2,
        index: 2
    });

    fail(`class A {
        *g() { yield 3 + yield 4; }
      }`, {
        source: `class A {
            *g() { yield 3 + yield 4; }
          }`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 2,
        column: 28,
        index: 38
    });

    fail(`class A {
        *g() {
          yield ? yield : yield;
        }
      }`, {
        source: `class A {
            *g() {
              yield ? yield : yield;
            }
          }`,
        message: 'Unexpected token ?',
        line: 3,
        column: 19,
        index: 48
    });

    fail(`class Foo {
        async foo(foo = super()) { }
      }`, {
        source: `class Foo {
            async foo(foo = super()) { }
          }`,
        message: 'super() is not allowed in this context',
        line: 2,
        column: 33,
        index: 45
    });

    fail(`var obj = {
        *g() { yield 3 + yield 4; }
      };`, {
        source: `var obj = {
            *g() { yield 3 + yield 4; }
          };`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 2,
        column: 28,
        index: 40
    });

    fail(`var obj = {
        *g() {
          yield
          * 1
        }
      };`, {
        source: `var obj = {
            *g() {
              yield
              * 1
            }
          };`,
        message: 'Unexpected token *',
        line: 3,
        column: 19,
        index: 50
    });

    fail(`({
        method(param = super) {}
      });`, {
        source: `({
            method(param = super) {}
          });`,
        message: 'Only "(" or "." or "[" are allowed after \'super\'',
        line: 1,
        column: 1,
        index: 1
    });

    fail(`({
        method() {
          super;
        }
      });`, {
        source: `({
            method() {
              super;
            }
          });`,
        message: 'Only "(" or "." or "[" are allowed after \'super\'',
        line: 1,
        column: 1,
        index: 1
    });

    fail(`0, {
        method(...a,) {

        }
      };`, {
        source: `0, {
            method(...a,) {

            }
          };`,
        message:  'Rest parameter must be last formal parameter',
        line: 2,
        column: 23,
        index: 28
    });

    fail(`(function*() {
        ({
          *method(x = yield) {}
        });
      });`, {
        source: `(function*() {
            ({
              *method(x = yield) {}
            });
          });`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 2,
        column: 13,
        index: 28
    });

    fail(`var obj = {
        *method() {
          void yield;
        }
      };`, {
        source: `var obj = {
            *method() {
              void yield;
            }
          };`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 3,
        column: 18,
        index: 54
    });

    fail(`var obj = {
        *method() {
          void yi\\u0065ld;
        }
      };`, {
        source: `var obj = {
            *method() {
              void yi\\u0065ld;
            }
          };`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 3,
        column: 18,
        index: 54
    });

    fail(`0, {
        *method(...a,) {

        }
      };`, {
        source: `0, {
            *method(...a,) {

            }
          };`,
        message:  'Rest parameter must be last formal parameter',
        line: 2,
        column: 24,
        index: 29
    });

    fail(`({
        s\\u0065t m(v) {}
      });`, {
        source: `({
            s\\u0065t m(v) {}
          });`,
        message: 'Unexpected escaped keyword',
        line: 1,
        column: 1,
        index: 1
    });

    fail(`({
        async foo(foo = super()) { }
      })`, {
        source: `({
            async foo(foo = super()) { }
          })`,
        message: 'super() is not allowed in this context',
        line: 1,
        column: 1,
        index: 1
    });

    fail(`({
        async foo (await) {  }
      })`, {
        source: `({
            async foo (await) {  }
          })`,
        message: 'Unexpected reserved word',
        line: 1,
        column: 1,
        index: 1
    });

    fail(`({
        async
        foo() { }
      })`, {
        source: `({
            async
            foo() { }
          })`,
        message: 'No line break is allowed after async',
        line: 1,
        column: 1,
        index: 1
    });

    fail(`({
        async *method(...a,) {

        }
      });`, {
        source: `({
            async *method(...a,) {

            }
          });`,
        message: 'Rest parameter must be last formal parameter',
        line: 1,
        column: 1,
        index: 1
    });

    fail(`"use strict"; var gen = {
        async *method() {
          return {
               ...(function() {
                  var yield;
               }()),
            }
        }
      }.method;`, {
        source: `"use strict"; var gen = {
            async *method() {
              return {
                   ...(function() {
                      var yield;
                   }()),
                }
            }
          }.method;`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 5,
        column: 25,
        index: 140
    });

    fail(`var obj = {
        async *method() {
          void yield;
        }
      };`, {
        source: `var obj = {
            async *method() {
              void yield;
            }
          };`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 3,
        column: 18,
        index: 60
    });

    fail(`var obj = {
        async *method() {
          var yield;
        }
      };`, {
        source: `var obj = {
            async *method() {
              var yield;
            }
          };`,
        message:  '\'yield\' may not be used as an identifier in this context',
        line: 3,
        column: 17,
        index: 59
    });

    fail(`({
        \\u0061sync* m(){}
    });`, {
        source: `({
            \\u0061sync* m(){}
        });`,
        message: 'Unexpected escaped keyword',
        line: 1,
        column: 1,
        index: 1
    });
/*
    fail(`0, {
        async *method(x = 0, x) {

        }
      };`, {
        source: `0, {
            async *method(x = 0, x) {

            }
          };`,
        message: 'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 27,
        index: 27
    });
*/
    fail(`var obj = {
        async *method() {
            \\u0061wait: ;
        }
      };`, {
        source: `var obj = {
            async *method() {
                \\u0061wait: ;
            }
          };`,
        message: 'Unexpected escaped keyword',
        line: 2,
        column: 29,
        index: 41
    });

    fail(`for (let x = 3, y in {}) { }`, {
        source: `for (let x = 3, y in {}) { }`,
        message: 'Invalid left-hand side in for-in loop: Must have a single binding.',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for (var {a} = 0 in {});`, {
        source: `for (var {a} = 0 in {});`,
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`for (a = 0 in {});`, {
        source: `for (a = 0 in {});`,
        message: 'Unexpected token )',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`var str = ';`, {
        source: `var str = ';`,
        message: 'Unexpected token',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`with ({}) const x = null;`, {
        source: `with ({}) const x = null;`,
        message: 'Unexpected keyword \'const\'',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`while (false) class C {}`, {
        source: `while (false) class C {}`,
        message: 'class can\'t appear in single-statement context',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`while 'hood' break;`, {
        source: `while 'hood' break;`,
        message: 'Unexpected token string',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`while 0 break;`, {
        source: `while 0 break;`,
        message: 'Unexpected token number',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`var [...{ x }, y] = [1, 2, 3];`, {
        source: `var [...{ x }, y] = [1, 2, 3];`,
        message: 'Unexpected token ,',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`var [...[x], y] = [1, 2, 3];`, {
        source: `var [...[x], y] = [1, 2, 3];`,
        message: 'Unexpected token ,',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`var [...x = []] = [];`, {
        source: `var [...x = []] = [];`,
        message:  'Unexpected token =',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`var [...[ x ] = []] = [];`, {
        source: `var [...[ x ] = []] = [];`,
        message: 'Unexpected token =',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`var x>>1;`, {
        source: `var x>>1;`,
        message: 'Unexpected token >>',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`var x*1;`, {
        source: `var x*1;`,
        message:  'Unexpected token *',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`var --x;`, {
        source: `var --x;`,
        message:  'Unexpected token --',
        line: 1,
        column: 3,
        index: 3
    });

    fail(`var x | true;`, {
        source: `var x | true;`,
        message: 'Unexpected token |',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`"use strict"; var arguments;`, {
        source: `"use strict"; var arguments;`,
        message:  'The identifier \'arguments\' must not be in binding position in strict mode',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`try {} catch () {}`, {
        source: `try {} catch () {}`,
        message: 'Unexpected token )',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`var ranCatch = false;

    try {
      throw [1, 2, 3];
    } catch ([...[x], y]) {

      ranCatch = true;
    }`, {
        source: `var ranCatch = false;

        try {
          throw [1, 2, 3];
        } catch ([...[x], y]) {

          ranCatch = true;
        }`,
        message: 'Unexpected token ,',
        line: 5,
        column: 24,
        index: 88
    });

    fail(`var ranCatch = false;

    try {
      throw [];
    } catch ([...{ x } = []]) {

      ranCatch = true;
    }`, {
        source: `var ranCatch = false;

        try {
          throw [];
        } catch ([...{ x } = []]) {

          ranCatch = true;
        }`,
        message:  'Unexpected token =',
        line: 5,
        column: 26,
        index: 83
    });

    fail(`try{}
    catch(){
    finally{}`, {
        source: `try{}
        catch(){
        finally{}`,
        message: 'Unexpected token )',
        line: 2,
        column: 14,
        index: 20
    });

    fail(`try
    {
    }
    catch("22")
    {
    }`, {
        source: `try
        {
        }
        catch("22")
        {
        }`,
        message: 'Unexpected token string',
        line: 4,
        column: 14,
        index: 38
    });

    fail(`try
    {
      try
      {
      }
    }
    catch(e1){}
    catch(e2){}`, {
        source: `try
        {
          try
          {
          }
        }
        catch(e1){}
        catch(e2){}`,
        message: 'Missing catch or finally after try',
        line: 5,
        column: 11,
        index: 51
    });

    fail(` switch {
        case 0:
          result += 2;
        default:
          result += 32;
          break;
      }`, {
        source: ` switch {
            case 0:
              result += 2;
            default:
              result += 32;
              break;
          }`,
        message: 'Unexpected token {',
        line: 1,
        column: 7,
        index: 7
    });

    fail(`switch(value) {
        case 0:
          result += 2;
        default:
          result += 32;
          break;
        default:
          result += 32;
          break;
      }`, {
        source: `switch(value) {
            case 0:
              result += 2;
            default:
              result += 32;
              break;
            default:
              result += 32;
              break;
          }`,
        message: 'More than one default clause in switch statement',
        line: 6,
        column: 20,
        index: 132
    });

    fail(`{
        var x=1;
        return x;
        var y=2;
    }`, {
        source: `{
            var x=1;
            return x;
            var y=2;
        }`,
        message: 'Illegal return statement',
        line: 2,
        column: 20,
        index: 22
    });

    fail(`try {
        return 1;
    } catch(e){
        return 1;
    }`, {
        source: `try {
            return 1;
        } catch(e){
            return 1;
        }`,
        message:  'Illegal return statement',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`return (0);`, {
        source: `return (0);`,
        message:  'Illegal return statement',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`let [...x, y] = [1, 2, 3];`, {
        source: `let [...x, y] = [1, 2, 3];`,
        message: 'Unexpected token ,',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`let [...x = []] = [];`, {
        source: `let [...x = []] = [];`,
        message:  'Unexpected token =',
        line: 1,
        column: 9,
        index: 9
    });

    fail(`if (false) label1: label2: function test262() {}`, {
        source: `if (false) label1: label2: function test262() {}`,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
        line: 1,
        column: 26,
        index: 26
    });

    fail(`if (false) ; else const x = null;`, {
        source: `if (false) ; else const x = null;`,
        message: 'Unexpected keyword \'const\'',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`if (true) let x;`, {
        source: `if (true) let x;`,
        message:  'Lexical declaration cannot appear in a single-statement context',
        line: 1,
        column: 10,
        index: 10
    });

    fail(`function *gen() {
        yi\\u0065ld: ;
      }`, {
        source: `function *gen() {
            yi\\u0065ld: ;
          }`,
        message: 'Unexpected escaped keyword',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`class A { static set prototype() {} }`, {
        source: `class A { static set prototype() {} }`,
        message: 'Classes may not have static property named prototype',
        line: 1,
        column: 30,
        index: 30
    });

    fail(`class A { static prototype() {} }`, {
        source: `class A { static prototype() {} }`,
        message: 'Classes may not have static property named prototype',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`class A { static set method(_) { super(); } }`, {
        source: `class A { static set method(_) { super(); } }`,
        message: 'super() is not allowed in this context',
        line: 1,
        column: 38,
        index: 38
    });

    fail(`class A { * constructor() {} }`, {
        source: `class A { * constructor() {} }`,
        message: 'Class constructor may not be a generator',
        line: 1,
        column: 23,
        index: 23
    });

    fail(`class A { constructor() { super(); } }`, {
        source: `class A { constructor() { super(); } }`,
        message: 'super() is not allowed in this context',
        line: 1,
        column: 31,
        index: 31
    });

    fail(`var af = ()
    => {};`, {
        source: `var af = ()
        => {};`,
        message: 'No line break is allowed after \'=>\'',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`var af = ()
    => {};`, {
        source: `var af = ()
        => {};`,
        message: 'No line break is allowed after \'=>\'',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`var af = (x, x) => 1;`, {
        source: `var af = (x, x) => 1;`,
        message: 'Duplicate binding x',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`"use strict"; var af = eval => 1;`, {
        source: `"use strict"; var af = eval => 1;`,
        message: 'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 27,
        index: 27
    });

    fail(`for (;false;) let x;`, {
        source: `for (;false;) let x;`,
        message: 'Lexical declaration cannot appear in a single-statement context',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`"use strict"; var af = eval => 1;`, {
        source: `"use strict"; var af = eval => 1;`,
        message: 'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 27,
        index: 27
    });

    /* Others */

    fail(`/*`, {
        source: `/*`,
        message: 'Unterminated MultiLineComment',
        line: 1,
    });

    fail(`/*\r\n`, {
        source: `/*\r\n`,
        message: 'Unterminated MultiLineComment',
        line: 1,
    });

    fail(`/*\r`, {
        source: `/*\r`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`/*\r\n`, {
        source: `/*\r\n`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`/*\u2028`, {
        source: `/*\u2028`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`/*\u2029`, {
        source: `/*\u2029`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`\\`, {
        source: `\\`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\u`, {
        source: `\\u`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\x`, {
        source: `\\x`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\o`, {
        source: `\\o`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\u1`, {
        source: `\\u1`,
        message: 'Unexpected token',
        line: 1,
    });

    fail(`\\u12`, {
        source: `\\u12`,
        message: 'Unexpected token',
        line: 1,
    });
    fail(`a\\uz`, {
        source: `a\\uz`,
        message: 'Unexpected token',
        line: 1,
    });
    fail(`a\\x`, {
        source: `a\\x`,
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0
    });

    fail('a\\o', {
        source: `a\\o`,
        message: 'Unexpected token',
        line: 1,
    });
    fail('a\\u12', {
        source: `a\\u12`,
        message: 'Unexpected token',
        line: 1,
    });
    fail('\\uD800x', {
        source: `\\uD800x`,
        message: 'Unexpected surrogate pair',
        line: 1,
    });
    fail('＊', {
        source: `＊`,
        line: 1
    });

    fail('\uD800\\u', {
        source: `\uD800\\u`,
        line: 1
    });

    fail('\\uD800\\x62', {
        source: `\\uD800\\x62`,
        line: 1,
        message: 'Unexpected surrogate pair',
    });

    fail('\\uD800x', {
        source: `\\uD800x`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected surrogate pair',
    });

    fail('1.a', {
        source: `1.a`,
        line: 1,
        message: 'Invalid or unexpected token',
    });

    fail('1.e', {
        source: `1.e`,
        line: 1,
        message: 'Invalid non-number after exponent indicator',
    });

    fail('1.e+', {
        source: `1.e+`,
        line: 1,
        message: 'Invalid non-number after exponent indicator',
    });

    fail('0xz', {
        source: `0xz`,
        line: 1,
        message: 'Missing hexadecimal digits after \'0x\'',
        column: 0,
        index: 0
    });

    fail('08a', {
        source: `08a`,
        line: 1,
        message: 'Invalid or unexpected token',
        column: 0,
        index: 0
    });

    fail('\\u0008', {
        source: `\\u0008`,
        line: 1,
        message: 'Invalid Unicode escape sequence',
        column: 0,
        index: 0
    });

    fail('0a', {
        source: `0a`,
        message: 'Invalid or unexpected token',
        line: 1,
        column: 0,
        index: 0
    });

    fail('3ea', {
        source: `3ea`,
        line: 1,
        message: 'Invalid non-number after exponent indicator',
        column: 0,
        index: 0
    });

    fail('3in []', {
        source: `3in []`,
        message: 'Invalid or unexpected token',
        line: 1,
    });

    fail('3e', {
        source: `3e`,
        message: 'Invalid non-number after exponent indicator',
        line: 1,
        column: 0,
        index: 0
    });

    fail('3x0', {
        source: `3x0`,
        message: 'Invalid or unexpected token',
        line: 1,
        column: 0,
        index: 0
    });
    fail('3in[]', {
        source: `3in[]`,
        message: 'Invalid or unexpected token',
        line: 1,
    });

    fail('x\\u002a', {
        source: `x\\u002a`,
        line: 1
    });

    fail('\\ua', {
        source: `\\ua`,
        line: 1
    });

    fail(`(a, ...b)`, {
        source: `(a, ...b)`,
        line: 1
    });

    fail(`(..a)`, {
        source: `(..a)`,
        message: 'Unexpected token .',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`(((...a)))`, {
        source: `(((...a)))`,
        message: 'Unexpected token )',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`(((a, ...b))`, {
        source: `(((a, ...b))`,
        line: 1
    });

    fail(`[...new a] = 0;`, {
        source: `[...new a] = 0;`,
        message: '\'NewExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`[...0] = 0;`, {
        source: `[...0] = 0;`,
        message: '\'Literal\' is not a valid assignment left hand side',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`[...[0]] = 0;`, {
        source: `[...[0]] = 0;`,
        message: '\'Literal\' is not a valid assignment left hand side',
        line: 1,
        column: 8,
        index: 8
    });

    fail(`[...{a: 0}] = 0;`, {
        source: `[...{a: 0}] = 0;`,
        line: 1
    });

    fail(`({get a(){}} = 0)`, {
        source: `({get a(){}} = 0)`,
        line: 1,
        column: 13,
        index: 13
    });

    fail(`({set a(b){}} = 0)`, {
        source: `({set a(b){}} = 0)`,
        line: 1,
        column: 14,
        index: 14
    });

    fail(`[0] = 0`, {
        source: `[0] = 0`,
        line: 1,
        column: 3,
        index: 3
    });

    fail('for((1 + 1) in list) process(x);', {
        source: `for((1 + 1) in list) process(x);`,
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 19,
        index: 19
    });

    fail('[', {
        source: `[`,
        message: 'Unexpected token end of source',
        line: 1,
        column: 1,
        index: 1
    });

    fail('1 + { t:t ', {
        source: `1 + { t:t `,
        message: 'Unexpected token end of source',
        line: 1,
        column: 9,
        index: 9
    });

    fail('1 + {', {
        source: `1 + {`,
        line: 1,
        column: 5,
        index: 5,
        message: 'Unexpected token end of source',
    });

    fail('i #= 0', {
        source: `i #= 0`,
        line: 1,
        column: 1,
        index: 1,
        message: 'Invalid or unexpected token',
    });

    fail('\n\n\n{', {
        source: `\n\n\n{`,
        line: 4,
        column: 1,
        index: 4
    });

    fail('\n/* Some multiline\ncomment */\n)', {
        source: `\n/* Some multiline\ncomment */\n)`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token )',
    });

    fail(', { get 2 }', {
        source: `{ get 2 }`,
        line: 1,
        column: 5,
        index: 5,
        message: 'Unexpected token number',
    });

    fail(', { set 1 }', {
        source: `{ set 1 }`,
        line: 1,
        column: 5,
        index: 5,
        message: 'Unexpected token number',
    });

    fail('function t(if) { }', {
        source: `function t(if) { }`,
        line: 1,
        column: 11,
        index: 11,
        message: 'Unexpected keyword \'if\'',
    });

    fail('({ get: g(d) { } })', {
        source: '({ get: g(d) { } })',
        line: 1,
        column: 1,
        index: 1,
        message: 'Unexpected token {',
    });

    fail('\u200C = []', {
        source: `\u200C = []`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token =',
    });

    fail('do { x } *', {
        source: `do { x } *`,
        line: 1,
        column: 8,
        index: 8
    });

    fail('var', {
        source: `var`,
        line: 1,
        column: 3,
        index: 3,
        message: 'Unexpected token end of source',
    });
    fail('const', {
        source: `const`,
        line: 1,
        column: 5,
        index: 5,
        message: 'Unexpected token end of source',
    });

    fail('**', {
        source: `**`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token **',
    });

    fail('#=', {
        source: `#=`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Invalid or unexpected token',
    });

    fail('\\u{}', {
        source: `\\u{}`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token',
    });

    fail('\\u{FFFF', {
        source: `\\u{FFFF`,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
    });

    fail('\\u{FFZ}', {
        source: `\\u{FFZ}`,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
    });

    fail('("\\u{}")', {
        source: `("\\u{}")`,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
    });

    fail('/./a', {
        source: `/./a`,
        line: 1,
        message: 'Unexpected regular expression flag',
    });

    fail('/./ii', {
        source: `/./ii`,
        line: 1,
        message: 'Duplicate regular expression flag i',
    });

    fail('enum : 0', {
        source: `enum : 0`,
        line: 1,
        message: 'Unexpected keyword \'enum\'',
    });

    fail('({get +:3})', {
        source: `({get +:3})`,
        line: 1,
        message: 'Unexpected token :',
    });

    fail(', { ;  ;  ', {
        source: `{ ;  ;  `,
        line: 1,
        column: 6,
        index: 6,
        message: 'Unexpected token end of source',
    });

    fail('a b', {
        source: `a b`,
        line: 1,
        column: 1,
        index: 1,
        message: 'Unexpected token identifier',
    });

    fail('try { } catch() {}', {
        source: `try { } catch() {}`,
        line: 1,
        column: 14,
        index: 14,
        message: 'Unexpected token )',
    });

    fail('/*\r\n*/]', {
        source: `/*\r\n*/]`,
        line: 1,
        column: 0,
        index: 0,
        message: 'Unexpected token ]',
    });

    fail('//\r\n]', {
        source: `//\r\n]`,
        line: 1,
        message: 'Unexpected token ]',
    });

    fail('\r]', {
        source: `\r]`,
        line: 1,
        message: 'Unexpected token ]',
    });

    fail('\n]', {
        source: `\n]`,
        line: 1,
        message: 'Unexpected token ]',
    });

    fail('/*hello', {
        source: `/*hello`,
        line: 1,
        message: 'Unterminated MultiLineComment',
    });

    fail('try {} catch (answer()) {} ', {
        source: `try {} catch (answer()) {} `,
        line: 1,
        column: 20,
        index: 20
    });

    fail('for(;;)', {
        source: `for(;;)`,
        line: 1,
        column: 7,
        index: 7,
        message: 'Unexpected token end of source',
    });

    fail('for (let [] = 0, {};;);', {
        source: `for (let [] = 0, {};;);`,
        line: 1,
        column: 19,
        index: 19,
        message: 'Missing initializer in destructuring declaration',
    });

    fail('for (let [];;);', {
        source: `for (let [];;);`,
        line: 1,
        column: 11,
        index: 11,
        message: 'Missing initializer in destructuring declaration',
    });

    fail('for (var i, i2 in {});', {
        source: `for (var i, i2 in {});`,
        line: 1,
        column: 14,
        index: 14,
        message: 'Invalid left-hand side in for-in loop: Must have a single binding.',
    });

    fail('if.a;', {
        source: `if.a;`,
        line: 1,
        column: 2,
        index: 2,
        message:  'Unexpected token .',
    });

    fail('a if', {
        source: `a if`,
        line: 1,
        column: 1,
        index: 1,
        message: 'Unexpected keyword \'if\'',
    });

    fail('function true() { }', {
        source: `function true() { }`,
        message: 'Unexpected keyword \'true\'',
        line: 1,
        column: 8,
        index: 8
    });

    fail('"\\ux";', {
        source: `"\\ux";`,
        line: 1,
        column: 0,
        index: 0
    });

    fail('"\\u000";', {
        source: `"\\u000";`,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
    });

    fail('0O', {
        source: `0O`,
        line: 1,
        message: 'Missing octal digits after \'0o\'',
    });

    fail('0o18', {
        source: `0o18`,
        line: 1
    });

    fail('0O1a', {
        source: `0O1a`,
        line: 1
    });

    fail('x\\', {
        source: `x\\`,
        line: 1
    });

    fail('/test', {
        source: `/test`,
        line: 1
    });

    fail('3 = 4', {
        source: `3 = 4`,
        line: 1
    });

    fail('[,', {
        source: `[,`,
        line: 1
    });

    fail('var x = "', {
        source: `var x = "`,
        line: 1
    });

    fail('i #= 42', {
        source: `i #= 42`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({[a,b]:0})', {
        source: `({[a,b]:0})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('"use strict"; eval => 42', {
        source: `"use strict"; eval => 42`,
        line: 1,
        column: 18,
        index: 18
    });

    fail('use strict"; (a) => 00', {
        source: `use strict"; (a) => 00`,
        line: 1,
        column: 3,
        index: 3
    });

    fail('p = { q/ }', {
        source: `p = { q/ }`,
        line: 1,
        column: 7,
        index: 7
    });

    fail('function t(false) { }', {
        source: `function t(false) { }`,
        line: 1,
        column: 11,
        index: 11
    });

    fail('continue', {
        source: `continue`,
        line: 1,
        column: 0,
        index: 0
    });

    fail('if(false) doThis(); else', {
        source: `if(false) doThis(); else`,
        line: 1,
        column: 24,
        index: 24
    });

    fail('x: while (true) { (function () { continue x; }); }', {
        source: `x: while (true) { (function () { continue x; }); }`,
        line: 1,
        column: 32,
        index: 32
    });

    fail('function hello() {"use strict"; eval = 10; }', {
        source: `function hello() {'use strict'; eval = 10; }`,
        line: 1,
        column: 36,
        index: 36
    });

    fail('function eval() {"use strict"; })()', {
        source: `function eval() {'use strict'; })()`,
        line: 1,
    });

    fail('const', {
        source: `const`
    });

    fail('class A {get constructor(){}}', {
        source: `class A {get constructor(){}}`,
        line: 1,
        column: 12,
        index: 12
    });

    fail('x %*= y', {
        source: `x %*= y`,
        line: 1
    });

    fail('({a}) => { "use strict"; }', {
        source: `({a}) => { 'use strict'; }`,
        line: 1
    });

    fail('a => {}()', {
        source: 'A semicolon was expected (or a \'}\' if appropriate), but got \'(\'',
        line: 1
    });

    fail('async function wrap() {\nasync function await() { }\n}', {
        source: `async function wrap() {\nasync function await() { }\n}`,
        line: 2,
        column: 14,
        index: 38
    });

    fail('async function foo(await) { }', {
        source: `async function foo(await) { }`,
        line: 1,
        column: 19,
        index: 19
    });

    fail('async function foo() { return {await} }', {
        source: `async function foo() { return {await} }`,
        line: 1
    });

    fail('(async\nfunction foo() { })', {
        source: `(async\nfunction foo() { })`,
        line: 1
    });

    fail('(async function await() { })', {
        source: `(async function await() { })`,
        line: 1
    });

    fail('(async function foo(await) { })', {
        source: `(async function foo(await) { })`,
        line: 1
    });

    fail('(async function foo() { return {await} })', {
        source: `(async function foo() { return {await} })`,
        line: 1,
        column: 37,
        index: 37
    });

    fail('async\n() => a', {
        source: `async\n() => a`,
        line: 2,
        column: 2,
        index: 8
    });

    fail('async a\n=> a', {
        source: `async a\n=> a`,
        line: 1,
        column: 7,
        index: 7
    });

    fail('async ()\n=> a', {
        source: `async ()\n=> a`,
        line: 1
    });

    fail('async await => 1', {
        source: `async await => 1`,
        line: 1
    });

    fail('async (await) => 1', {
        source: `async (await) => 1`,
        line: 1
    });

    fail('async ({await}) => 1  ', {
        source: `async ({await}) => 1`,
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
    });

    fail('async ({a: await}) => 1', {
        source: `async ({a: await}) => 1`,
        line: 1
    });

    fail('[a += b] = []', {
        source: `[a += b] = []`,
        message: 'A \'=\' was expected',
        line: 1,
    });

    fail('({a: b += 0} = {})', {
        source: `({a: b += 0} = {})`,
        line: 1
    });

    fail('({async\nfoo() { }})', {
        source: `({async\nfoo() { }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async get foo() { }})', {
        source: `({async get foo() { }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async set foo(value) { }})', {
        source: `({async set foo(value) { }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async foo() { var await }})', {
        source: `({async foo() { var await }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async foo(await) { }})', {
        source: `({async foo(await) { }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async foo() { return {await} }})', {
        source: `({async foo() { return {await} }})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({async foo: 1})', {
        source: `({async foo: 1})`,
        line: 1
    });

    fail('class A {async get foo() { }}', {
        source: `class A {async get foo() { }}`,
        line: 1,
        column: 18,
        index: 18
    });

    fail('class A {async set foo(value) { }}', {
        source: `class A {async set foo(value) { }}`,
        line: 1
    });

    fail('class A {static async set foo(value) { }}', {
        source: `class A {static async set foo(value) { }}`,
        line: 1
    });

    fail('class A {async foo() { return {await} }}', {
        source: `class A {async foo() { return {await} }}`,
        line: 1,
        column: 36,
        index: 36
    });

    fail('invalid', {
        source: `await a`,
        message: 'Unexpected token identifier',
        line: 1,
    });

    fail('async () => await', {
        source: `async () => await`,
        line: 1
    });

    fail('(class {async foo() { await }})', {
        source: `(class {async foo() { await }})`,
        line: 1,
        column: 27,
        index: 27
    });

    fail('async function foo(a = await b) {}', {
        source: `async function foo(a = await b) {}`,
        line: 1,
        column: 22,
        index: 22
    });

    fail('async (a = await b) => {}', {
        source: `async (a = await b) => {}`,
        line: 1,
        column: 11,
        index: 11
    });

    fail('([a.a]) => 42', {
        source: `([a.a]) => 42`,
        line: 1
    });

    fail('() => {}()', {
        source: `() => {}()`,
        line: 1
    });

    fail('(a) => {}()', {
        source: `(a) => {}()`,
        line: 1
    });

    fail('function *g() { (x = yield) => {} }', {
        source: `function *g() { (x = yield) => {} }`,
        line: 1
    });

    fail('class A { constructor() {} "constructor"() }', {
        source: `class A { constructor() {} 'constructor'() }`,
        line: 1
    });

    fail('({[x]})', {
        source: `({[x]})`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('0O9', {
        source: `0O9`,
        line: 1,
        column: 0,
        index: 0
    });

    fail('( { get x() {} } = 0)', {
        source: `( { get x() {} } = 0)`,
        line: 1
    });

    fail('x \n is y', {
        source: `x \n is y`,
        line: 2
    });

    fail('x \n isnt y', {
        source: `x \n isnt y`,
        line: 2
    });

    fail('for (let x = 42 in list) process(x);', {
        source: `for (let x = 42 in list) process(x);`,
        line: 1
    });

    fail('(10, 20) => 00', {
        source: `(10, 20) => 00`,
        line: 1,
        column: 11,
        index: 11
    });

    fail('yield v', {
        source: `yield v`,
        line: 1,
        column: 5,
        index: 5
    });

    fail('let [this] = [10]', {
        source: `let [this] = [10]`,
        line: 1
    });

    fail('([function] = [10])', {
        source: `([function] = [10])`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({this} = x)', {
        source: `({this} = x)`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('var x = {this}', {
        source: `var x = {this}`,
        line: 1
    });

    fail('var obj = { *test** }', {
        source: `var obj = { *test** }`,
        line: 1
    });

    fail('class A extends yield B { }', {
        source: `class A extends yield B { }`,
        line: 1,
        column: 15,
        index: 15
    });

    fail('class default', {
        source: `class default`,
        line: 1,
        column: 5,
        index: 5
    });

    fail('function a() 1 // expression closure is not supported', {
        source: `function a() 1 // expression closure is not supported`,
        line: 1
    });

    fail('({ 42 }) = obj', {
        source: `({ 42 }) = obj`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({ 5 }) => {}', {
        source: `({ 5 }) => {}`,
        message: 'Unexpected token number',
        line: 1,
        column: 1,
        index: 1
    });

    fail('({ get test() { } }) => 42', {
        source: `({ get test() { } }) => 42`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('let [function] = x', {
        source: `let [function] = x`,
        line: 1,
        column: 5,
        index: 5
    });

    fail('"use strict"; let + 1', {
        source: `"use strict"; let + 1`,
        line: 1
    });

    fail('function* y({yield}) {}', {
        source: `function* y({yield}) {}`,
        line: 1
    });

    fail('new.target', {
        source: `new.target`,
        line: 1
    });

    fail('({ __proto__: 1, __proto__: 2 })', {
        source: `({ __proto__: 1, __proto__: 2 })`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('({ __proto__: 1, __proto__: 2 })', {
        source: `({ __proto__: 1, __proto__: 2 })`,
        line: 1,
        column: 1,
        index: 1
    });

    fail('[...x in y] = []', {
        source: `[...x in y] = []`,
        line: 1,
        column: 11,
        index: 11
    });

    fail('(function* foo(a = yield b) {})', {
        source: `(function* foo(a = yield b) {})`,
        line: 1
    });

    fail('function* foo(a = class extends (yield b) {}) {}', {
        source: `function* foo(a = class extends (yield b) {}) {}`,
        line: 1
    });

    fail('foo: class X {}', {
        source: `foo: class X {}`,
        line: 1
    });

    fail('class A { get constructor() {} }', {
        source: `class A { get constructor() {} }`,
        line: 1
    });

    fail('class A { *constructor() {} }', {
        source: `class A { *constructor() {} }`,
        line: 1,
        column: 22,
        index: 22
    });

    fail('(function ({ a(){} }) {})', {
        source: `(function ({ a(){} }) {})`,
        line: 1,
        column: 15,
        index: 15
    });

    fail('var a = { set foo(...v) {} };', {
        source: `var a = { set foo(...v) {} };`,
        line: 1
    });

    fail('class a { set foo(...v) {} };', {
        source: `class a { set foo(...v) {} };`,
        line: 1
    });

    fail('class A extends B { constructor() { super } }', {
        source: `class A extends B { constructor() { super } }`,
        line: 1
    });

    fail('class A extends B { constructor() { super; } }', {
        source: `class A extends B { constructor() { super; } }`,
        line: 1,
        column: 41,
        index: 41
    });

    fail('class A extends B { foo() { (super).foo } }', {
        source: `class A extends B { foo() { (super).foo } }`,
        line: 1,
        column: 34,
        index: 34
    });

    fail('[2] = 42', {
        source: `[2] = 42`,
        line: 1
    });

    fail('({ obj:20 }) = 42', {
        source: `({ obj:20 }) = 42`,
        line: 1
    });

    fail('void { [1, 2]: 3 };', {
        source: `void { [1, 2]: 3 };`,
        line: 1
    });

    fail('((a)) => 42', {
        source: `((a)) => 42`,
        line: 1
    });

    fail('let default', {
        source: `let default`,
        line: 1
    });

    fail('\\u{110000}', {
        source: `\\u{110000}`,
        line: 1
    });

    fail('let default', {
        source: `let default`,
        line: 1
    });

    fail('let [function] = [10]', {
        source: `let [function] = [10]`,
        line: 1
    });

    fail('(function () { yield 10 })', {
        source: `(function () { yield 10 })`,
        line: 1
    });

    fail('function f(a, ...b = 0)', {
        source: `function f(a, ...b = 0)`,
        line: 1,
        column: 18,
        index: 18
    });

    fail('for (;;) const x = 10;', {
        source: `for (;;) const x = 10;`,
        line: 1
    });

    fail('while (1) function foo(){}', {
        source: `while (1) function foo(){}`,
        line: 1
    });

    fail('x = { method() 42 }', {
        source: `x = { method() 42 }`,
        line: 1
    });

    fail('x = { get method() 42 }', {
        source: `x = { get method() 42 }`,
        line: 1
    });

    fail('super', {
        source: `super`,
        line: 1
    });

    fail('function* wrap() { return (a = 1 + (yield)) => a }', {
        source: `function* wrap() { return (a = 1 + (yield)) => a }`,
        line: 1
    });

    fail('function* foo(a = yield b) {}', {
        source: `function* foo(a = yield b) {}`,
        line: 1
    });

    fail('(function* foo(a = yield b) {})', {
        source: `(function* foo(a = yield b) {})`,
        line: 1
    });

    fail('(class {*foo(a = yield b) {}})', {
        source: `(class {*foo(a = yield b) {}})`,
        line: 1
    });

    fail('"use strict"; bar: function x() {}', {
        source: `"use strict"; bar: function x() {}`,
        line: 1
    });

    fail('export var await', {
        source: `export var await`,
        module: true,
        line: 1
    });

    fail('export var await', {
        source: `export var await`,
        module: true,
        line: 1
    });
    fail('export new Foo();', {
        source: `export new Foo();`,
        module: true,
        line: 1
    });
    fail('export typeof foo;', {
        source: `export typeof foo;`,
        module: true,
        line: 1
    });
    fail('export *;', {
        source: `export *`,
        module: true,
        line: 1,
        column: 8,
        index: 8
    });
    fail('export { default }', {
        source: `export var await`,
        module: true,
        line: 1
    });
    fail('export { if }', {
        source: `export new Foo();`,
        module: true,
        line: 1
    });
    fail('export { default as foo }', {
        source: `export typeof foo;`,
        module: true,
        line: 1
    });
    fail('export { if as foo }', {
        source: `export { if as foo }`,
        module: true,
        line: 1
    });

    fail('0 = 0;', {
        source: `0 = 0;`,
        line: 1,
        message: '\'Literal\' is not a valid assignment left hand side',
        column: 1,
        index: 1
    });

    fail('0++', {
        source: `0++`,
        message: 'Invalid left-hand side expression in Postfix operation',
        column: 1,
        index: 1
    });

    fail('0--', {
        source: `0--`,
        line: 1,
        message: 'Invalid left-hand side expression in Postfix operation',
        column: 1,
        index: 1
    });

    fail('[a] *= 0;', {
        source: `[a] *= 0;`,
        line: 1,
        message: 'Invalid left-hand side in assignment',
        column: 3,
        index: 3
    });

    fail('0 /= 0;', {
        source: `0 /= 0;`,
        message: 'Invalid left-hand side in assignment',
        line: 1,
        column: 1,
        index: 1
    });

    fail('[...{a: 0}] = 0;', {
        source: `[...{a: 0}] = 0;`,
        line: 1
    });

    fail('for({a: 0} in 0);', {
        source: `for({a: 0} in 0);`,
        line: 1
    });

    fail('for([0] in 0);', {
        source: `for([0] in 0);`,
        line: 1,
        message: '\'Literal\' is not a valid assignment left hand side',
        column: 12,
        index: 12
    });

    fail('for([0] of 0);', {
        source: `for([0] of 0);`,
        line: 1,
        message: '\'Literal\' is not a valid assignment left hand side',
        column: 12,
        index: 12
    });

    fail('for(0 of 0);', {
        source: `for(0 of 0);`,
        line: 1
    });

    fail('for((0) in 0);', {
        source: `for((0) in 0);`,
        message: 'Invalid left-hand side in for-loop',
        line: 1,
    });

    fail('for((0) of 0);', {
        source: `for((0) of 0);`,
        line: 1
    });

    fail('a\\u{0}', {
        source: `a\\u{0}`,
        line: 1
    });

    fail('\\u{FFFFFFF}")', {
        source: `\\u{FFFFFFF}")`,
        line: 1,
        message: 'Undefined Unicode code-point',
    });

    fail('/./\\u0069', {
        source: `/./\\u{69}`,
        line: 1,
        message: 'Unexpected regular expression flag',
    });

    fail('"use strict"; implements:0;', {
        source: `"use strict"; implements:0;`,
        line: 1,
        message: 'Unexpected keyword \'implements\'',
    });

    fail('"use strict"; +package;', {
        source: `"use strict"; +package;`,
        line: 1,
        message: 'Unexpected keyword \'package\'',
    });

    fail('"use strict"; +static;', {
        source: `"use strict"; +static;`,
        line: 1,
        message: 'Unexpected keyword \'static\'',
        column: 15,
        index: 15
    });

    fail('"use strict"; yield:0;', {
        source: `"use strict"; yield:0;`,
        line: 1,
        message: '\'yield\' may not be used as an identifier in this context',
        column: 13,
        index: 13
    });

    fail('"use strict"; function a([yield]){}', {
        source: `"use strict"; function a([yield]){}`,
        line: 1,
        message: '\'yield\' may not be used as an identifier in this context',
        column: 26,
        index: 26
    });

    fail('"use strict"; function a({yield}){}', {
        source: `"use strict"; function a({yield}){}`,
        line: 1
    });

    fail('(package) => { "use strict"; }', {
        source: `(package) => { "use strict"; }`,
        line: 1
    });

    fail('async (package) => { "use strict"; }', {
        source: `async (package) => { "use strict"; }`,
        line: 1
    });

    fail('"use strict"; async (package) => {}', {
        source: `"use strict"; async (package) => {}`,
        line: 1,
        message: 'Unexpected keyword \'package\'',
    });

    fail('!{ get a() { "use strict"; +let; } }', {
        source: `!{ get a() { "use strict"; +let; } }`,
        line: 1,
        message: 'The identifier \'let\' must not be in expression position in strict mode',
    });

    fail('({ a(){ super(); } });', {
        source: `({ a(){ super(); } });`,
        line: 1,
        message: 'super() is not allowed in this context',
    });

    fail('/?/', {
        source: `/?/`,
        line: 1,
        message: 'Unexpected regular expression',
    });

    fail('{ const a; }', {
        source: `{ const a; }`,
        line: 1,
        message: 'Missing initializer in const declaration',
    });

    fail('const a;', {
        source: `const a;`,
        line: 1,
        message: 'Missing initializer in const declaration',
    });

    fail('for(const a = 0, b;;);', {
        source: `for(const a = 0, b;;);`,
        line: 1,
        message: 'Missing initializer in const declaration',
    });

    fail('if(0) label: function f(){}', {
        source: `if(0) label: function f(){}`,
        line: 1,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
    });

    fail('do label: function f(){} while (0)', {
        source: `do label: function f(){} while (0)`,
        line: 1,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement' ,
    });

    fail('for(a in b) label: function f(){}', {
        source: `for(a in b) label: function f(){}`,
        line: 1,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement' ,
    });

    fail('for(let a in b) label: function f(){}', {
        source: `for(let a in b) label: function f(){}`,
        line: 1,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
    });

    fail('for(a of b) label: function f(){}', {
        source: `for(a of b) label: function f(){}`,
        line: 1
    });

    fail('for(;;) labelA: labelB: labelC: function f(){}', {
        source: `for(;;) labelA: labelB: labelC: function f(){}`,
        line: 1
    });

    fail('continue;', {
        source: `continue;`,
        message: 'continue  statement must be nested within an iteration statement',
        line: 1,
    });

    fail('if(0) continue;', {
        source: `if(0) continue;`,
        message: 'continue  statement must be nested within an iteration statement',
        line: 1,
    });

    fail('label: continue label;', {
        source: `label: continue label;`,
    });

    fail('label: if(0) continue label;', {
        source: `label: if(0) continue label;`,
    });

    fail('label: while(0) { function f(){ continue label; } }', {
        source: `label: while(0) { function f(){ continue label; } }`,
        line: 1
    });

    fail('break;', {
        source: `break;`,
        line: 1
    });

    fail('while(0) !function(){ break; };', {
        source: `while(0) !function(){ break; };`,
        line: 1
    });

    fail('switch(0) { case 0: function f(){ break; } }', {
        source: `switch(0) { case 0: function f(){ break; } }`,
        line: 1
    });

    fail('switch(0) { default: function f(){ break; } }', {
        source: `switch(0) { default: function f(){ break; } }`,
    });

    fail('with(0) label: function f(){}', {
        source: `with(0) label: function f(){}`,
        line: 1
    });

    fail('"use strict"; !function eval(){}', {
        source: `"use strict"; !function eval(){}`,
        line: 1,
    });

    fail('"use strict"; !function arguments(){}', {
        source: `"use strict"; !function arguments(){}`,
        line: 1
    });

    fail('"use strict"; function arguments(){}', {
        source: `"use strict"; function arguments(){}`,
        message: 'Eval or arguments can\'t be assigned to in strict mode code',
        line: 1,
    });

    fail('function f(a){ super() }', {
        source: `function f(a){ super() }`,
        message: 'super() is not allowed in this context',
        line: 1,
    });

    fail('function f(){ break label; }', {
        source: `function f(){ break label; }`,
        line: 1
    });

    fail('function f(){ labelA: while(0) continue labelB; }', {
        source: `function f(){ labelA: while(0) continue labelB; }`,
        line: 1,
    });

    fail('function* g(){ ([a = yield]) => 0; }', {
        source: `function* g(){ ([a = yield]) => 0; }`,
        message: 'Arrow parameters must not contain yield expressions',
        line: 1,
    });

    fail('for(let a;;) label: function f(){}', {
        source: `for(let a;;) label: function f(){}`,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
        line: 1,
    });

    fail('function* g(){ (a = yield* b) => 0; }', {
        source: `function* g(){ (a = yield* b) => 0; }`,
        line: 1,
    });

    fail('function* g(){ (a = yield) => 0; }', {
        source: `function* g(){ (a = yield) => 0; }`,
        message: 'Arrow parameters must not contain yield expressions',
        line: 1,
    });

    fail('!function* f(a = super()){}', {
        source: `!function* f(a = super()){}`,
        message: 'super() is not allowed in this context',
        line: 1,
    });

    fail('function* g(){ ({ *m([a = yield]){} }); }', {
        source: `function* g(){ ({ *m([a = yield]){} }); }`,
        message: 'Generator parameters must not contain yield expressions',
        line: 1,
    });

    fail('function* g(){ !function*([a = yield]){} }', {
        source: `function* g(){ !function*([a = yield]){} }`,
        message: 'Generator parameters must not contain yield expressions',
        line: 1,
    });

    fail('function* f(a = super.b){}', {
        source: `function* f(a = super.b){}`,
        message: 'Member access from super not allowed in this context',
        line: 1,
    });

    fail('class A extends B { a() { !function* (){ super.b(); } } }', {
        source: `class A extends B { a() { !function* (){ super.b(); } } }`,
        message: 'Member access from super not allowed in this context',
        line: 1,

    });

    fail('class A { constructor() { (class {[super()](){}}); } }', {
        source: `class A { constructor() { (class {[super()](){}}); } }`,
        message: 'super() is not allowed in this context',
        line: 1,
    });

    fail('class A extends B { static prototype(){} }', {
        source: `class A extends B { static prototype(){} }`,
        message: 'Classes may not have static property named prototype',
        line: 1,

    });

    fail('class A extends B { static set prototype(a) {} }', {
        source: `class A extends B { static set prototype(a) {} }`,
        message: 'Classes may not have static property named prototype',
        line: 1,

    });

    fail('super()', {
        source: `super()`,
        message: 'super() is not allowed in this context',
        line: 1,
    });

    fail('unresolvableReference."";', {
        source: `unresolvableReference."";`,
        message: 'Unexpected token string',
        line: 1,
    });

    fail('labelA: break labelB;', {
        source: `labelA: break labelB;`,
        line: 1,
    });

    fail('new.target', {
        source: `new.target`,
        message: 'new.target only allowed within functions',
        line: 1,
    });

    fail('var a; export class a {};', {
        source: `var a; export class a {};`,
        message: 'Unexpected keyword \'export\'',
        line: 1,
    });

    fail('!{ __proto__: null, __proto__: null, };', {
        source: `!{ __proto__: null, __proto__: null, };`,
        message: 'Property name __proto__ appears more than once in object literal',
        line: 1,
    });

    fail('}', {
        source: `}`,
        message: 'Unexpected token }',
        line: 1,
    });

    fail('var obj = { *test** }', {
        source: `var obj = { *test** }`,
        message: 'Unexpected token *',
        line: 1,
    });

    fail('class A extends yield B { }', {
        source: `class A extends yield B { }`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
    });

    fail('`test', {
        source: '`test',
        message: 'Unexpected token',
        line: 1,
    });

    fail('switch `test`', {
        source: 'switch `test`',
        message: 'Unexpected token template end',
        line: 1,
    });

    fail('function f(a, ...b, c)', {
        source: `function f(a, ...b, c)`,
        message: 'Rest parameter must be last formal parameter',
        line: 1,
    });

    fail('[a, ...b = 0] = []', {
        source: `[a, ...b = 0] = []`,
        message: 'Rest elements cannot have a default value',
        line: 1,
    });

    fail('"(...a, b) => {}', {
        source: `"(...a, b) => {}`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('([ 5 ]) => {}', {
        source: `([ 5 ]) => {}`,
        message:  '\'Literal\' can not be treated as an actual binding pattern',
        line: 1,
    });

    fail('({ 5 }) => {}', {
        source: `({ 5 }) => {}`,
        message: 'Unexpected token number',
        line: 1,
    });

    fail('(...[ 5 ]) => {}', {
        source: `(...[ 5 ]) => {}`,
        message: 'Unexpected token number',
        line: 1,
    });

    fail('if (1) let x = 10;', {
        source: `if (1) let x = 10;`,
        message: 'Lexical declaration cannot appear in a single-statement context',
        line: 1,
    });

    fail('for (;;) const x = 10;', {
        source: `for (;;) const x = 10;`,
        message: 'Unexpected keyword \'const\'',
        line: 1,
    });

    fail('function* y({yield}) {}', {
        source: `function* y({yield}) {}`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
    });

    fail('x = { get method() 42 }', {
        source: `x = { get method() 42 }`,
        message: 'Unexpected token number',
        line: 1,
    });

    fail('class A { get prop(x) {} }', {
        source: `class A { get prop(x) {} }`,
        message: 'Getter functions must have no arguments',
        line: 1,
    });

    fail('class A { set prop() {} }', {
        source: `class A { set prop() {} }`,
        message: 'Setter function must have exactly one argument',
        line: 1,
    });

    fail('class A { set prop(x, y) {} }', {
        source: `class A { set prop(x, y) {} }`,
        message: 'Setter function must have exactly one argument',
        line: 1,
    });

    fail('[...x in y] = []', {
        source: `[...x in y] = []`,
        message: '\'BinaryExpression\' is not a valid assignment left hand side',
        line: 1,
    });
    /*
        fail('function foo() { "use strict"; var {eval = 1} = {} }', {
            source: `function foo() { "use strict"; var {eval = 1} = {} }`,
            message: 'Setter function must have exactly one argument',
            line: 1,
        });
    */
    fail('function* wrap() { return (a = 1 + (yield)) => a }"', {
        source: `function* wrap() { return (a = 1 + (yield)) => a }"`,
        message: 'Arrow parameters must not contain yield expressions',
        line: 1,
    });

    fail('function* foo(a = class extends (yield b) {}) {}', {
        source: `function* foo(a = class extends (yield b) {}) {}`,
        message: 'Generator parameters must not contain yield expressions',
        line: 1,
    });

    fail('function* wrap() {\n({a = yield b} = obj) => a\n}', {
        source: `function* wrap() {\n({a = yield b} = obj) => a\n}`,
        message: 'Arrow parameters must not contain yield expressions',
        line: 2,
    });

    fail('foo: class X {}"', {
        source: `foo: class X {}"`,
        message: 'class can\'t appear in single-statement context',
        line: 1,
    });

    fail('class A { set prop(x, y) {} }', {
        source: `class A { set prop(x, y) {} }`,
        message: 'Setter function must have exactly one argument',
        line: 1,
    });

    fail('(x) => {} + 2', {
        source: `(x) => {} + 2`,
        message: 'Unexpected token +',
        line: 1,
    });

    fail('class A extends B { constructor() { super } }', {
        source: `class A extends B { constructor() { super } }`,
        message: 'Only "(" or "." or "[" are allowed after \'super\'',
        line: 1,
    });

    fail('for (let x of y, z) {}', {
        source: `for (let x of y, z) {}`,
        message: 'Unexpected token ,',
        line: 1,
    });

    fail('[...foo, bar] = b', {
        source: `[...foo, bar] = b`,
        message: 'Rest elements cannot have a default value',
        line: 1,
    });

    fail('for (let [...foo, bar] in qux);', {
        source: `for (let [...foo, bar] in qux);`,
        message:  'Unexpected token ,',
        line: 1,
    });

    fail('([a.a]) => 42', {
        source: `([a.a]) => 42`,
        message: '\'MemberExpression\' can not be treated as an actual binding pattern',
        line: 1,
    });

    fail('() => {}()', {
        source: `() => {}()`,
        message: 'Unexpected token (',
        line: 1,
    });

    fail('(a) => {}()', {
        source: `(a) => {}()`,
        message: 'Unexpected token (',
        line: 1,
    });

    fail('a => {}()', {
        source: `a => {}()`,
        message: 'Unexpected token (',
        line: 1,
    });

    fail('class A {set a(yield){}}', {
        source: 'class A {set a(yield){}}' ,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
    });

    fail('();', {
        source: `();`,
        message: 'Unexpected token ;',
        line: 1,
    });
/*
    fail('[([a])] = 12;', {
        source: `[([a])] = 12;`,
        message: 'Unexpected token (',
        line: 1,
    });

    fail('(a, ...b);', {
        source: `(a, ...b);`,
        message: 'Unexpected token (',
        line: 1,
    });*/

    fail('var e = [a -= 12] = 5', {
        source: `var e = [a -= 12] = 5`,
        message:  'A \'=\' was expected',
        line: 1,
    });

  /*  fail(`function l() { '\\12'; 'use strict' }`, {
        source: `function l() { '\\12'; 'use strict' }`,
        message: 'Unexpected token (',
        line: 1,
    });*/

    fail('[ a -= 12 ] = 12;', {
        source: `[ a -= 12 ] = 12;`,
        message: 'A \'=\' was expected',
        line: 1,
    });

    fail('(((a, ...b)))', {
        source: `(((a, ...b)))`,
        message:  'Unexpected token )',
        line: 1,
    });

    fail('class A extends B { constructor() { !{constructor() { super(); }}; } }', {
        source: `class A extends B { constructor() { !{constructor() { super(); }}; } }`,
        message:  'super() is not allowed in this context',
        line: 1,
    });

    fail(`'use strict'; ({eval} = 0);`, {
        source: `'use strict'; ({eval} = 0);`,
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
    });

    fail('(a, ...b)', {
        source: `(a, ...b)`,
        message:  'Unexpected token end of source',
        line: 1,
    });

    fail('(((...a)))', {
        source: `(((...a)))`,
        message: 'Unexpected token )',
        line: 1,
    });

    fail('let let;', {
        source: `let let;`,
        message:  'let is disallowed as a lexically bound name',
        line: 1,
    });

    fail('for(({a: 0}) in 0);', {
        source: `for(({a: 0}) in 0);`,
        message:  '\'Literal\' is not a valid assignment left hand side',
        line: 1,
    });

    fail('for(([0]) in 0);', {
        source: `for(([0]) in 0);`,
        message:  '\'Literal\' is not a valid assignment left hand side',
        line: 1,
    });

    fail('for(const let = 0;;);', {
        source: `for(const let = 0;;);`,
        message: 'let is disallowed as a lexically bound name',
        line: 1,
    });

    fail('function f(){ const a; }', {
        source: `function f(){ const a; }`,
        message: 'Missing initializer in const declaration',
        line: 1,
    });

    fail('for(;;) labelA: labelB: labelC: function f(){}', {
        source: `for(;;) labelA: labelB: labelC: function f(){}`,
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement' ,
        line: 1,
    });

    fail('label: continue label;', {
        source: `label: continue label;`,
        message: 'continue  statement must be nested within an iteration statement' ,
        line: 1,
    });

    fail('x = { set f(...y) {} }', {
        source: `x = { set f(...y) {} }`,
        message: 'Setter function argument must not be a rest parameter',
        line: 1,
    });
});