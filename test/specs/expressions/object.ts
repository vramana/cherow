import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Object', () => {

    it('should fail if eval occurs as the identifier in a property set parameterList of a property assignment', () => {
        expect(() => {
            parseScript(`"use strict"; var obj = { set foo(eval) {}};`);
        }).to.throw('');
    });
    
    it('should fail on invalid cover initialized name', () => {
        expect(() => {
            parseScript(`({ g\\u{65}t x(){} })`);
        }).to.throw('');
    });

    it('should fail on invalid cover initialized name', () => {
        expect(() => {
            parseScript(`({ a = 1 });`);
        }).to.not.throw('');
    });
    
    it('should fail on use of enum', () => {
        expect(() => {
            parseScript(`{ enum: 1} `);
        }).to.throw('');
    });

    it('should fail on invalid setter', () => {
        expect(() => {
            parseScript(`x = { set y() {} }`);
        }).to.throw('');
    });
    
    it('should fail on invalid setter', () => {
        expect(() => {
            parseScript(`x = { set y(a, b) {} }`);
        }).to.throw('');
    });

    it('should fail on invalid comma', () => {
        expect(() => {
            parseScript(`({
                *method(yield) {}
              });`);
        }).to.throw('');
    });

    it('should fail on const param redeclaration', () => {
        expect(() => {
            parseScript(`var obj = {
                *foo(a) {
                    const a = 3;
                }
            };`);
          }).to.not.throw()
    })

    it('should fail on let param redeclaration', () => {
        expect(() => {
            parseScript(`0, {
                method(x = 0, x) {
                }
              };`);
            }).to.not.throw()
    });

    it('should fail if get have a formal parameter', () => {
        expect(() => {
            parseScript(`0, { get a(param = null) {} };`);
        }).to.throw();
    });

    it('should fail on let param redeclaration', () => {
        expect(() => {
            parseScript(`obj = {x = 0}`);
        }).to.not.throw();
    });

    it('should fail on let param redeclaration', () => {
        expect(() => {
            parseScript(`f({x = 0})`);
        }).to.not.throw();
    });

    it('should fail if "this" are used as an shorthand property wrapped inside parenthesis"', () => {
        expect(() => {
            parseScript(`({this} = x)`)
        }).to.throw();
    });

    it('should fail if "yield" are used as shorthand property"', () => {
        expect(() => {
            parseScript(`function* y({yield}) {}`)
        }).to.throw('');
    });

    it('should fail on let param redeclaration', () => {
        expect(() => {
            parseScript(`var obj = {
                *g(yield) {}
              };`);
        }).to.throw();
    });

    it('should fail on invalid comma', () => {
        expect(() => {
            parseScript(`var x = { m: () => void, };`);
        }).to.throw('');
    });
    it('should fail on invalid shorthand', () => {
        expect(() => {
            parseScript(`var x = ({ const });`);
        }).to.throw();
    });

    it('should fail on mix of invalid shorthands', () => {
        expect(() => {
            parseScript(`({ get, this, if });`);
        }).to.throw();
    });

    it('should fail if a method definition are forwarded to the runtime', () => {
        expect(() => {
            parseScript(` ({ *[(function() { }())]() {} }); });`);
        }).to.throw('');
    });

    it('should fail if a generator method contains a non-simple parameter list and a UseStrict directiv', () => {
        expect(() => {
            parseScript(`o = {
  *m(a = 0) {
    "use strict";
  }
};`);
}).to.not.throw();
    });

    it('should fail on yield used as an parameter', () => {
        expect(() => {
            parseScript(`obj = { *g(yield) {} }`);
        }).to.throw();
    });

    it('should fail on "a = { set foo(...v) {} };"', () => {
        expect(() => {
            parseScript(`a = { set foo(...v) {} };`);
        }).to.throw();
    });

    it('should fail on "({ __proto__: 1, __proto__: 2 })"', () => {
        expect(() => {
            parseScript(`({ __proto__: 1, __proto__: 2 })`);
        }).to.throw();
    });

    it('should fail on "({*foo: 1})"', () => {
        expect(() => {
            parseScript(`({*foo: 1})`);
        }).to.throw();
    });

    it('should fail on "({ 42 }) = obj"', () => {
        expect(() => {
            parseScript(`({ 42 }) = obj`);
        }).to.throw();
    });

    it('should fail on "x = { method() 42 }"', () => {
        expect(() => {
            parseScript(`x = { method() 42 }`);
        }).to.throw();
    });

    it('should fail on invalid computed property', () => {
        expect(() => {
            parseScript(`var x = {
                [bar]
            };`);
        }).to.throw();
    });

    it('should fail on `yield` expressions used as an LogicalOrExpressions', () => {
        expect(() => {
            parseScript(`obj = { *g() {
    yield ? yield : yield;
  } }`);
        }).to.throw();
    });

    it('should fail on invalid computed variable property', () => {
        expect(() => {
            parseScript(`({[x]});`);
        }).to.throw();
    });

    it('should fail on  "({ set: s(a, b) { } })" to fail', () => {
        expect(() => {
            parseScript(`({ set: s(a, b) { } })`);
        }).to.throw();
    });

    it('should fail if Initializer of a SingleNameBinding witihn the FormalParameters of a GeneratorMethod contain the `yield` keyword', () => {
        expect(() => {
            parseScript(`*method(x = yield) {}`);
        }).to.throw('');
    });

    it('should fail if a method definition are forwarded to the runtime', () => {
        expect(() => {
            parseScript(` ({ *[(function() { }())]() {} }); });`);
        }).to.throw('');
    });

    
    it('should fail on object method NSPL with USD', () => {
        expect(() => {
            parseScript(`({
                foo(x = 1) {"use strict"}
              });`, {
                next: true
            });
        }).to.not.throw();
    });

    it('should fail on object method eval in formal paramater', () => {
        expect(() => {
            parseScript(`"use strict"; ({
                async foo(eval) { }
              })`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on  object method formals contains super call', () => {
        expect(() => {
            parseScript(`({
                async foo(foo = super()) { }
              })`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on escaped set', () => {
        expect(() => {
            parseScript(`({
                s\\u0065t m(v) {}
              });`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on escaped ""get"', () => {
        expect(() => {
            parseScript(`({ g\\u0065t m() {} })`)
        }).to.throw();
    });

    it('should fail on generator yield as binding identifier', () => {
        expect(() => {
            parseScript(`var obj = {
                *method() {
                  var yield;
                }
              };`, {
                next: true
            });
        }).to.throw();
    });

    it.skip('should fail on generator yield as identifier reference escaped', () => {
        expect(() => {
            parseScript(`var obj = {
                *method() {
                  void yi\\u0065ld;
                }
              };`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on generator param id yield', () => {
        expect(() => {
            parseScript(`({
                method(param = super) {}
              });`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on generator param init yield', () => {
        expect(() => {
            parseScript(`(function*() {
                ({
                  *method(x = yield) {}
                });
              });`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on generator param init yield', () => {
        expect(() => {
            parseScript(`(function*() {
                ({
                  *method(x = yield) {}
                });
              });`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail if `yield` expressions bind weakly', () => {
        expect(() => {
            parseScript(`obj = {  *g() { yield 3 + yield 4; }};`)
        }).to.throw();
    });

    it('should fail on "({ \"chance\" }) = obj"', () => {
        expect(() => {
            parseScript(`({ \"chance\" }) = obj`)
        }).to.throw();
    });

    it('should fail on  "({ set: s() { } })"', () => {
        expect(() => {
            parseScript(`({ set: s() { } })`);
        }).to.throw();
    });

    it('should fail on  "({ set: s(a, b) { } })"', () => {
        expect(() => {
            parseScript(`({ set: s(a, b) { } })`);
        }).to.throw();
    });
    it('should fail on  "({ get: g(d) { } })"', () => {
        expect(() => {
            parseScript(`({ get: g(d) { } })`);
        }).to.throw();
    });

    it('should fail on  "({ set i(x) { }, i: 42 }"', () => {
        expect(() => {
            parseScript(`({ set i(x) { }, i: 42 }`);
        }).to.throw();
    });

    it('should fail on "x = { set method(val) v = val }"', () => {
        expect(() => {
            parseScript(`x = { set method(val) v = val }`)
        }).to.throw();
    });
    it('should fail on "x = { get method() 42 }"', () => {
        expect(() => {
            parseScript(`x = { get method() 42 }`)
        }).to.throw();
    });

    it('should fail on "x = { method() 42 }"', () => {
        expect(() => {
            parseScript(`x = { method() 42 }`)
        }).to.throw();
    });

    it('should fail on  "{ set 1 }"', () => {
        expect(() => {
            parseScript(`{ set 1 }`);
        }).to.throw();
    });

    it('should fail if __proto__ appers more than once', () => {
      expect(() => {
          parseScript(`var a = {
            __proto__: a,
           __proto__: b
         }`);
      }).to.throw('Property name __proto__ appears more than once in object literal');
  });
    
    it('should fail on  "{" to fail', () => {
        expect(() => {
            parseScript(`{`);
        }).to.throw();
    });

    it('should fail on  "({ get test() { } }) => 42"', () => {
        expect(() => {
            parseScript('({ get test() { } }) => 42');
        }).to.throw();
    });

    it('should fail on  "a.12" to fail', () => {
        expect(() => {
            parseScript(`a.12`);
        }).to.throw();
    });

    it('should fail on  "a[e 12"', () => {
        expect(() => {
            parseScript(`a[e 12`);
        }).to.throw();
    });

    it('should fail on  "({get a 12})"', () => {
        expect(() => {
            parseScript(`({get a 12})`);
        }).to.throw();
    });

    it('should fail on  "({ "chance" }) = obj"', () => {
        expect(() => {
            parseScript('({ "chance" }) = obj');
        }).to.throw();
    });

    it('should fail on  "({[a 12]: e})"', () => {
        expect(() => {
            parseScript(`({[a 12]: e})`);
        }).to.throw();
    });

    it('should fail on  "({get +:3})"', () => {
        expect(() => {
            parseScript(`({get +:3})`);
    }).to.throw();

    });

    it('should fail on  "({ obj:20 }) = 42"', () => {
        expect(() => {
            parseScript('({ obj:20 }) = 42');
        }).to.throw();
    });

    it('should fail on  "( { get x() {} } ) = 0"', () => {
        expect(() => {
            parseScript('( { get x() {} } ) = 0');
        }).to.throw();
    });

    it('should fail when eval occurs as the Identifier in a PropertySetParameterList of a PropertyAssignment', () => {
        expect(() => {
            parseModule('var obj = { set _11_1_5_1_fun(eval) {}};')
        }).to.throw();
    });

    it('should fail when arguments occurs as the Identifier in a PropertySetParameterList of a PropertyAssignment', () => {
        expect(() => {
            parseModule('var obj = {set _11_1_5_2_fun(arguments) {} };')
        }).to.throw();
    });

    it('should fail on invalid use of future reserved word ( eval) in strict mode - strict directive', () => {
        expect(() => {
            parseScript('"use strict"; ({ v: eval }) = obj')
        }).to.throw();
    });

    it('should fail on invalid use of future reserved word ( arguments) in strict mode - strict directive', () => {
        expect(() => {
            parseScript('"use strict"; ({ v: arguments }) = obj')
        }).to.throw();
    });

    it('should fail on invalid proto getter literal identifier', () => {
        expect(() => {
            parseScript('({ get __proto(){}, "__proto__": null, __proto__: null, })')
        }).to.throw();
    });

    it('should fail on invalid proto setter literal definition', () => {
        expect(() => {
            parseScript('({ set __proto(){}, "__proto__": null, __proto__: null, })')
        }).to.throw();
    });

    it('should fail on invalid proto identifier literal', () => {
        expect(() => {
            parseScript('({ __proto__: null, "__proto__": null })')
        }).to.throw();
    });

    it('should fail on invalid proto identifiers', () => {
        expect(() => {
            parseScript('({ __proto__: null, __proto__: null })')
        }).to.throw();
    });

    it('should fail on invalid proto literal identifier', () => {
        expect(() => {
            parseScript('({ "__proto__": null, __proto__: null })')
        }).to.throw();
    });

    it('should fail on invalid proto setter literal identifier', () => {
        expect(() => {
            parseScript('({ set __proto__(x){}, "__proto__": null, __proto__: null, })')
        }).to.throw();
    });

    it('should fail on "({ obj:20 }) = 42"', () => {
        expect(() => {
            parseScript(`({ obj:20 }) = 42`)
        }).to.throw();
    });

    it('should fail on invalid proto setter literal identifier', () => {
        expect(() => {
            parseScript('({ set __proto__(x){}, "__proto__": null, __proto__: null, })')
        }).to.throw();
    });

    it('should fail on "({a: 0} = 0);"', () => {
        expect(() => {
            parseScript(`({a: 0} = 0);`)
        }).to.throw();
    });

    it('should fail on "({get a(){}} = 0)"', () => {
        expect(() => {
            parseScript(`({get a(){}} = 0)`)
        }).to.throw();
    });

    it('should fail on "({a: 0} = 0);"', () => {
        expect(() => {
            parseScript(`({a: 0} = 0);`)
        }).to.throw();
    });

    it('should fail on duplicate string property', () => {
        expect(() => {
            parseScript(`"use strict";
            
            var proto = {};
            
            var x = {
                __proto__: proto,
                __proto__: proto
            };`);
        }).to.throw();
    });

    it('should fail on duplicate properties', () => {
        expect(() => {
            parseScript(`"use strict";
            
            var proto = {};
            
            var x = {
                "__proto__": proto,
                "__proto__": proto
            };`);
        }).to.throw();
    });

    it('should parse computed values as accessor property names (hexadecimal) ', () => {
        expect(parseScript(`var obj = {
            get ['hex\x45scape']() {},
            set ['hex\x45scape'](param) {}
          };`, {
            raw: true,
            ranges: true
        })).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "end": 99,
                      "id": {
                        "end": 7,
                       "name": "obj",
                        "start": 4,
                        "type": "Identifier"
                      },
                      "init": {
                        "end": 99,
                        "properties": [
                         {
                            "computed": true,
                            "end": 46,
                            "key": {
                              "end": 40,
                              "raw": "'hexEscape'",
                              "start": 29,
                              "type": "Literal",
                              "value": "hexEscape"
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false,
                            "start": 24,
                            "type": "Property",
                            "value": {
                              "body": {
                                "body": [],
                                "end": 46,
                                "start": 44,
                                "type": "BlockStatement"
                              },
                              "end": 46,
                              "expression": false,
                              "generator": false,
                              "async": false,
                              "id": null,
                              "params": [],
                              "start": 41,
                             "type": "FunctionExpression"
                            }
                          },
                          {
                            "computed": true,
                            "end": 87,
                            "key": {
                              "end": 76,
                              "raw": "'hexEscape'",
                              "start": 65,
                              "type": "Literal",
                              "value": "hexEscape",
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false,
                            "start": 60,
                            "type": "Property",
                            "value": {
                              "body": {
                                "body": [],
                                "end": 87,
                                "start": 85,
                                "type": "BlockStatement"
                              },
                              "end": 87,
                              "expression": false,
                              "generator": false,
                              "async": false,
                              "id": null,
                              "params": [
                                {
                                  "end": 83,
                                  "name": "param",
                                  "start": 78,
                                  "type": "Identifier"
                                }
                              ],
                              "start": 77,
                              "type": "FunctionExpression"
                            }
                          }
                        ],
                        "start": 10,
                        "type": "ObjectExpression"
                      },
                      "start": 4,
                      "type": "VariableDeclarator"
                    }
                  ],
                  "end": 100,
                  "kind": "var",
                  "start": 0,
                  "type": "VariableDeclaration"
                }
              ],
              "end": 100,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
    
    it('should parse yield return', () => {
        expect(parseScript(`var obj = {
            *foo(a) { yield a+1; return; }
        };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 65,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 10
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 65,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 10
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 64,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 3,
                        "column": 9
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 7
                        }
                      },
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 64,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 3,
                          "column": 9
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 24,
                          "end": 54,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 2,
                              "column": 42
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 25,
                            "end": 28,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 13
                              },
                              "end": {
                                "line": 2,
                                "column": 16
                              }
                            },
                            "name": "foo"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 28,
                            "end": 54,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 16
                              },
                              "end": {
                                "line": 2,
                                "column": 42
                              }
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 29,
                                "end": 30,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 17
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 18
                                  }
                                },
                                "name": "a"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 32,
                              "end": 54,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 20
                                },
                                "end": {
                                  "line": 2,
                                  "column": 42
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 34,
                                  "end": 44,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 22
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 32
                                    }
                                  },
                                  "expression": {
                                    "type": "YieldExpression",
                                    "start": 34,
                                    "end": 43,
                                    "loc": {
                                      "start": {
                                        "line": 2,
                                        "column": 22
                                      },
                                      "end": {
                                        "line": 2,
                                        "column": 31
                                      }
                                    },
                                    "delegate": false,
                                    "argument": {
                                      "type": "BinaryExpression",
                                      "start": 40,
                                      "end": 43,
                                      "loc": {
                                        "start": {
                                          "line": 2,
                                          "column": 28
                                        },
                                        "end": {
                                          "line": 2,
                                          "column": 31
                                        }
                                      },
                                      "left": {
                                        "type": "Identifier",
                                        "start": 40,
                                        "end": 41,
                                        "loc": {
                                          "start": {
                                            "line": 2,
                                            "column": 28
                                          },
                                          "end": {
                                            "line": 2,
                                            "column": 29
                                          }
                                        },
                                        "name": "a"
                                      },
                                      "operator": "+",
                                      "right": {
                                        "type": "Literal",
                                        "start": 42,
                                        "end": 43,
                                        "loc": {
                                          "start": {
                                            "line": 2,
                                            "column": 30
                                          },
                                          "end": {
                                            "line": 2,
                                            "column": 31
                                          }
                                        },
                                        "value": 1,
                                        "raw": "1"
                                      }
                                    }
                                  }
                                },
                                {
                                  "type": "ReturnStatement",
                                  "start": 45,
                                  "end": 52,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 33
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 40
                                    }
                                  },
                                  "argument": null
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield as function expression binding identifier', () => {
        expect(parseScript(`var obj = {
            *g() {
              (function yield() {});
            }
          };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 94,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 12
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 94,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 12
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 93,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 5,
                        "column": 11
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 7
                        }
                      },
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 93,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 5,
                          "column": 11
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 24,
                          "end": 81,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 4,
                              "column": 13
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 25,
                            "end": 26,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 13
                              },
                              "end": {
                                "line": 2,
                                "column": 14
                              }
                            },
                            "name": "g"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 26,
                            "end": 81,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 14
                              },
                              "end": {
                                "line": 4,
                                "column": 13
                              }
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 29,
                              "end": 81,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 17
                                },
                                "end": {
                                  "line": 4,
                                  "column": 13
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 45,
                                  "end": 67,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 36
                                    }
                                  },
                                  "expression": {
                                    "type": "FunctionExpression",
                                    "start": 46,
                                    "end": 65,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 15
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 34
                                      }
                                    },
                                    "id": {
                                      "type": "Identifier",
                                      "start": 55,
                                      "end": 60,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 29
                                        }
                                      },
                                      "name": "yield"
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false,
                                    "params": [],
                                    "body": {
                                      "type": "BlockStatement",
                                      "start": 63,
                                      "end": 65,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 32
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 34
                                        }
                                      },
                                      "body": []
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield newline', () => {
        expect(parseScript(`var obj = {
            *g() {
              yield
              1
            }
          };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 93,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 6,
                "column": 12
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 93,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 6,
                    "column": 12
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 92,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 6,
                        "column": 11
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 7
                        }
                      },
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 92,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 6,
                          "column": 11
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 24,
                          "end": 80,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 5,
                              "column": 13
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 25,
                            "end": 26,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 13
                              },
                              "end": {
                                "line": 2,
                                "column": 14
                              }
                            },
                            "name": "g"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 26,
                            "end": 80,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 14
                              },
                              "end": {
                                "line": 5,
                                "column": 13
                              }
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 29,
                              "end": 80,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 17
                                },
                                "end": {
                                  "line": 5,
                                  "column": 13
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 45,
                                  "end": 50,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 19
                                    }
                                  },
                                  "expression": {
                                    "type": "YieldExpression",
                                    "start": 45,
                                    "end": 50,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 14
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 19
                                      }
                                    },
                                    "delegate": false,
                                    "argument": null
                                  }
                                },
                                {
                                  "type": "ExpressionStatement",
                                  "start": 65,
                                  "end": 66,
                                  "loc": {
                                    "start": {
                                      "line": 4,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 15
                                    }
                                  },
                                  "expression": {
                                    "type": "Literal",
                                    "start": 65,
                                    "end": 66,
                                    "loc": {
                                      "start": {
                                        "line": 4,
                                        "column": 14
                                      },
                                      "end": {
                                        "line": 4,
                                        "column": 15
                                      }
                                    },
                                    "value": 1,
                                    "raw": "1"
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse super method calls in object literal concise generator', () => {
        expect(parseScript(`var object = { *g() {yield super.method(); } };`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 47,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 47
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 47,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 47
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 46,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 46
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "object"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 13,
                      "end": 46,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 46
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 15,
                          "end": 44,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 44
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 17,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 17
                              }
                            },
                            "name": "g"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 17,
                            "end": 44,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 17
                              },
                              "end": {
                                "line": 1,
                                "column": 44
                              }
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 20,
                              "end": 44,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 20
                                },
                                "end": {
                                  "line": 1,
                                  "column": 44
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 21,
                                  "end": 42,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 21
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 42
                                    }
                                  },
                                  "expression": {
                                    "type": "YieldExpression",
                                    "start": 21,
                                    "end": 41,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 21
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 41
                                      }
                                    },
                                    "delegate": false,
                                    "argument": {
                                      "type": "CallExpression",
                                      "start": 27,
                                      "end": 41,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 27
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 41
                                        }
                                      },
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 27,
                                        "end": 39,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 27
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 39
                                          }
                                        },
                                        "object": {
                                          "type": "Super",
                                          "start": 27,
                                          "end": 32,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 27
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 32
                                            }
                                          }
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 33,
                                          "end": 39,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 33
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 39
                                            }
                                          },
                                          "name": "method"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    
    it('should parse bindingElement with array binding pattern', () => {
        expect(parseScript(`var obj = { async method([[x, y, z] = [4, 5, 6]]) { }};`, {
            raw: true,
            ranges: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 55,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 55
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 55,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 55
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 54,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 54
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 7
                        }
                      },
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 54,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 54
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 12,
                          "end": 53,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 53
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 24,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 18
                              },
                              "end": {
                                "line": 1,
                                "column": 24
                              }
                            },
                            "name": "method"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 24,
                            "end": 53,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 24
                              },
                              "end": {
                                "line": 1,
                                "column": 53
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [
                              {
                                "type": "ArrayPattern",
                                "start": 25,
                                "end": 48,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 25
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 48
                                  }
                                },
                                "elements": [
                                  {
                                    "type": "AssignmentPattern",
                                    "start": 26,
                                    "end": 47,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 26
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 47
                                      }
                                    },
                                    "left": {
                                      "type": "ArrayPattern",
                                      "start": 26,
                                      "end": 35,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 26
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 35
                                        }
                                      },
                                      "elements": [
                                        {
                                          "type": "Identifier",
                                          "start": 27,
                                          "end": 28,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 27
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 28
                                            }
                                          },
                                          "name": "x"
                                        },
                                        {
                                          "type": "Identifier",
                                          "start": 30,
                                          "end": 31,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 30
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 31
                                            }
                                          },
                                          "name": "y"
                                        },
                                        {
                                          "type": "Identifier",
                                          "start": 33,
                                          "end": 34,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 33
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 34
                                            }
                                          },
                                          "name": "z"
                                        }
                                      ]
                                    },
                                    "right": {
                                      "type": "ArrayExpression",
                                      "start": 38,
                                      "end": 47,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 38
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 47
                                        }
                                      },
                                      "elements": [
                                        {
                                          "type": "Literal",
                                          "start": 39,
                                          "end": 40,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 39
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 40
                                            }
                                          },
                                          "value": 4,
                                          "raw": "4"
                                        },
                                        {
                                          "type": "Literal",
                                          "start": 42,
                                          "end": 43,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 42
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 43
                                            }
                                          },
                                          "value": 5,
                                          "raw": "5"
                                        },
                                        {
                                          "type": "Literal",
                                          "start": 45,
                                          "end": 46,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 45
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 46
                                            }
                                          },
                                          "value": 6,
                                          "raw": "6"
                                        }
                                      ]
                                    }
                                  }
                                ]
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 50,
                              "end": 53,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 50
                                },
                                "end": {
                                  "line": 1,
                                  "column": 53
                                }
                              },
                              "body": []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should assign new target', () => {
        expect(parseScript(`function f() {
            let x = new.target;
        }`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 56,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 56,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 56,
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 27,
                      "end": 46,
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 31,
                          "end": 45,
                          "id": {
                            "type": "Identifier",
                            "start": 31,
                            "end": 32,
                            "name": "x"
                          },
                          "init": {
                            "type": "MetaProperty",
                            "start": 35,
                            "end": 45,
                            "meta": {
                              "type": "Identifier",
                              "start": 35,
                              "end": 38,
                              "name": "new"
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 39,
                              "end": 45,
                              "name": "target"
                            }
                          }
                        }
                      ],
                      "kind": "let"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse new target declaration', () => {
        expect(parseScript(`function f() {
            new.target;
        }`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 48,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 48,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 48,
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 27,
                      "end": 38,
                      "expression": {
                        "type": "MetaProperty",
                        "start": 27,
                        "end": 37,
                        "meta": {
                          "type": "Identifier",
                          "start": 27,
                          "end": 30,
                          "name": "new"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 31,
                          "end": 37,
                          "name": "target"
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse nested array destructuring with a null value ', () => {
        expect(parseScript(`var obj = { async method([[x]]) {} };`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 37,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 37,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 36,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 7,
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 36,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 12,
                          "end": 34,
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 24,
                            "name": "method"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 24,
                            "end": 34,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [
                              {
                                "type": "ArrayPattern",
                                "start": 25,
                                "end": 30,
                                "elements": [
                                  {
                                    "type": "ArrayPattern",
                                    "start": 26,
                                    "end": 29,
                                    "elements": [
                                      {
                                        "type": "Identifier",
                                        "start": 27,
                                        "end": 28,
                                        "name": "x"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 32,
                              "end": 34,
                              "body": []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse lone rest element', () => {
        expect(parseScript(`var obj = { async method([...x]) { } };`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 39,
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 39,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 38,
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 7,
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 38,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 12,
                          "end": 36,
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 24,
                            "name": "method"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 24,
                            "end": 36,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [
                              {
                                "type": "ArrayPattern",
                                "start": 25,
                                "end": 31,
                                "elements": [
                                  {
                                    "type": "RestElement",
                                    "start": 26,
                                    "end": 30,
                                    "argument": {
                                      "type": "Identifier",
                                      "start": 29,
                                      "end": 30,
                                      "name": "x"
                                    }
                                  }
                                ]
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 33,
                              "end": 36,
                              "body": []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

     it('should parse strict duplicate properties', () => {
        expect(parseScript(`"use strict";
        
        var x = {
            y: 'first',
            y: 'second'
        };`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 99,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 12,
                  "value": "use strict",
                  "raw": "\"use strict\""
                }
              },
              {
                "type": "VariableDeclaration",
                "start": 31,
                "end": 99,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 35,
                    "end": 98,
                    "id": {
                      "type": "Identifier",
                      "start": 35,
                      "end": 36,
                      "name": "x"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 39,
                      "end": 98,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 53,
                          "end": 63,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 53,
                            "end": 54,
                            "name": "y"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 56,
                            "end": 63,
                            "value": "first",
                            "raw": "'first'"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 77,
                          "end": 88,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 77,
                            "end": 78,
                            "name": "y"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 80,
                            "end": 88,
                            "value": "second",
                            "raw": "'second'"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse duplicate properties and computed properties', () => {
        expect(parseScript(`"use strict";
        
        var proto = {};
        
        var x = {
            ["__proto__"]: proto,
            ["__proto__"]: proto,
            ["__" + "proto" + "__"]: proto
        };`, {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 195,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 12,
                  "value": "use strict",
                  "raw": "\"use strict\""
                }
              },
              {
                "type": "VariableDeclaration",
                "start": 31,
                "end": 46,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 35,
                    "end": 45,
                    "id": {
                      "type": "Identifier",
                      "start": 35,
                      "end": 40,
                      "name": "proto"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 43,
                      "end": 45,
                      "properties": []
                    }
                  }
                ],
                "kind": "var"
              },
              {
                "type": "VariableDeclaration",
                "start": 64,
                "end": 195,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 68,
                    "end": 194,
                    "id": {
                      "type": "Identifier",
                      "start": 68,
                      "end": 69,
                      "name": "x"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 72,
                      "end": 194,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 86,
                          "end": 106,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 87,
                            "end": 98,
                            "value": "__proto__",
                            "raw": "\"__proto__\""
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 101,
                            "end": 106,
                            "name": "proto"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 120,
                          "end": 140,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Literal",
                            "start": 121,
                            "end": 132,
                            "value": "__proto__",
                            "raw": "\"__proto__\""
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 135,
                            "end": 140,
                            "name": "proto"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 154,
                          "end": 184,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "BinaryExpression",
                            "start": 155,
                            "end": 176,
                            "left": {
                              "type": "BinaryExpression",
                              "start": 155,
                              "end": 169,
                              "left": {
                                "type": "Literal",
                                "start": 155,
                                "end": 159,
                                "value": "__",
                                "raw": "\"__\""
                              },
                              "operator": "+",
                              "right": {
                                "type": "Literal",
                                "start": 162,
                                "end": 169,
                                "value": "proto",
                                "raw": "\"proto\""
                              }
                            },
                            "operator": "+",
                            "right": {
                              "type": "Literal",
                              "start": 172,
                              "end": 176,
                              "value": "__",
                              "raw": "\"__\""
                            }
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 179,
                            "end": 184,
                            "name": "proto"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          })
    });

    it('should parse computed addition property', () => {
        expect(parseScript(`var x = {
            [5 + 5]: foo
        };`, {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 44,
                    "id": {
                        "end": 5,
                        "name": "x",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": {
                        "end": 44,
                        "properties": [{
                            "computed": true,
                            "end": 34,
                            "key": {
                                "end": 28,
                                "left": {
                                    "end": 24,
                                    "raw": "5",
                                    "start": 23,
                                    "type": "Literal",
                                    "value": 5
                                },
                                "operator": "+",
                                "right": {
                                    "end": 28,
                                    "raw": "5",
                                    "start": 27,
                                    "type": "Literal",
                                    "value": 5
                                },
                                "start": 23,
                                "type": "BinaryExpression"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "start": 22,
                            "type": "Property",
                            "value": {
                                "end": 34,
                                "name": "foo",
                                "start": 31,
                                "type": "Identifier",
                            }
                        }],
                        "start": 8,
                        "type": "ObjectExpression"
                    },
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 45,
                "kind": "var",
                "start": 0,
                "type": "VariableDeclaration",
            }, ],
            "end": 45,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse computed and identifier', () => {
        expect(parseScript('({[x]: 10, y: 20});', {
            raw: true,
            ranges: true,
        })).to.eql({
            "body": [{
                "end": 19,
                "expression": {
                    "end": 17,
                    "properties": [{
                            "computed": true,
                            "end": 9,
                            "key": {
                                "end": 4,
                                "name": "x",
                                "start": 3,
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "start": 2,
                            "type": "Property",
                            "value": {
                                "end": 9,
                                "raw": "10",
                                "start": 7,
                                "type": "Literal",
                                "value": 10
                            }
                        },
                        {
                            "computed": false,
                            "end": 16,
                            "key": {
                                "end": 12,
                                "name": "y",
                                "start": 11,
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "start": 11,
                            "type": "Property",
                            "value": {
                                "end": 16,
                                "raw": "20",
                                "start": 14,
                                "type": "Literal",
                                "value": 20
                            }
                        }
                    ],
                    "start": 1,
                    "type": "ObjectExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 19,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse computed getter and setter', () => {
        expect(parseScript('({get [x]() {}, set [x](v) {}});', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "end": 32,
                "expression": {
                    "end": 30,
                    "properties": [{
                            "computed": true,
                            "end": 14,
                            "key": {
                                "end": 8,
                                "name": "x",
                                "start": 7,
                                "type": "Identifier"
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false,
                            "start": 2,
                            "type": "Property",
                            "value": {
                                "async": false,
                                "body": {
                                    "body": [],
                                    "end": 14,
                                    "start": 12,
                                    "type": "BlockStatement"
                                },
                                "end": 14,
                                "expression": false,
                                "generator": false,
                                "id": null,
                                "params": [],
                                "start": 9,
                                "type": "FunctionExpression"
                            }
                        },
                        {
                            "computed": true,
                            "end": 29,
                            "key": {
                                "end": 22,
                                "name": "x",
                                "start": 21,
                                "type": "Identifier"
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false,
                            "start": 16,
                            "type": "Property",
                            "value": {
                                "async": false,
                                "body": {
                                    "body": [],
                                    "end": 29,
                                    "start": 27,
                                    "type": "BlockStatement"
                                },
                                "end": 29,
                                "expression": false,
                                "generator": false,
                                "id": null,
                                "params": [{
                                    "end": 25,
                                    "name": "v",
                                    "start": 24,
                                    "type": "Identifier"
                                }],
                                "start": 23,
                                "type": "FunctionExpression"
                            }
                        }
                    ],
                    "start": 1,
                    "type": "ObjectExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 32,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse computed string property', () => {
        expect(parseScript('var x = { ["hey"]: foo  };', {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Literal",
                                "value": "hey",
                                "raw": "\"hey\""
                            },
                            "computed": true,
                            "value": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }]
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse computed variable property', () => {
        expect(parseScript('var x = {  [bar]: foo };', {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "bar"
                            },
                            "computed": true,
                            "value": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }]
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    });

    it('should parse standalone expression with method', () => {
        expect(parseScript('({[x]: function() {}});', {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse standalone expression with addition', () => {
        expect(parseScript('({["x" + "y"]: 10});', {
            raw: true,
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Literal",
                                "value": "x",
                                "raw": "\"x\""
                            },
                            "right": {
                                "type": "Literal",
                                "value": "y",
                                "raw": "\"y\""
                            }
                        },
                        "computed": true,
                        "value": {
                            "type": "Literal",
                            "value": 10,
                            "raw": "10"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse shorthand methods and destructuring', () => {
        expect(parseScript('({ x([ a, b ]){} });', {
            raw: true,
            ranges: false,
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [{
                                "type": "ArrayPattern",
                                "elements": [{
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                ]
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x = { true: 42 }"', () => {
        expect(parseScript('x = { true: 42 }', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "end": 16,
                "expression": {
                    "end": 16,
                    "left": {
                        "end": 1,
                        "name": "x",
                        "start": 0,
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "end": 16,
                        "properties": [{
                            "computed": false,
                            "end": 14,
                            "key": {
                                "end": 10,
                                "name": "true",
                                "start": 6,
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "start": 6,
                            "type": "Property",
                            "value": {
                                "end": 14,
                                "raw": "42",
                                "start": 12,
                                "type": "Literal",
                                "value": 42
                            }
                        }],
                        "start": 4,
                        "type": "ObjectExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 16,
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        });
    });

    it('should parse "({ x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){} })"', () => {
        expect(parseScript(`({ x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){} })`, {
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [{
                                    "type": "ObjectPattern",
                                    "properties": [{
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "ObjectPattern",
                                                "properties": [{
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "w"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "w"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": true
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "computed": false,
                                                        "value": {
                                                            "type": "Identifier",
                                                            "name": "x"
                                                        },
                                                        "kind": "init",
                                                        "method": false,
                                                        "shorthand": true
                                                    }
                                                ]
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        },
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "b"
                                            },
                                            "computed": false,
                                            "value": {
                                                "type": "ArrayPattern",
                                                "elements": [{
                                                        "type": "Identifier",
                                                        "name": "y"
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "z"
                                                    }
                                                ]
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false
                                        }
                                    ]
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "ArrayPattern",
                                        "elements": [{
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "b"
                                            },
                                            {
                                                "type": "Identifier",
                                                "name": "c"
                                            }
                                        ]
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse yield value in a array spread position', () => {
        expect(parseScript(`gen = {
  *method() {
    yield [...yield];
  }
}`, {
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "gen"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "method"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "YieldExpression",
                                            "argument": {
                                                "type": "ArrayExpression",
                                                "elements": [{
                                                    "type": "SpreadElement",
                                                    "argument": {
                                                        "type": "YieldExpression",
                                                        "argument": null,
                                                        "delegate": false
                                                    }
                                                }]
                                            },
                                            "delegate": false
                                        }
                                    }]
                                },
                                "generator": true,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse intializer when argument value is not `undefined', () => {
        expect(parseScript(`obj = {  *method(a=1, b=2, []) {  } };`, {
            raw: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "obj"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "method"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [{
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 1,
                                            "raw": "1"
                                        }
                                    },
                                    {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "b"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 2,
                                            "raw": "2"
                                        }
                                    },
                                    {
                                        "type": "ArrayPattern",
                                        "elements": []
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": true,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "({ __proto__: 2 })"', () => {
        expect(parseScript('({ __proto__: 2 })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "__proto__"
                        },
                        "computed": false,
                        "value": {
                            "type": "Literal",
                            "value": 2
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse `yield` as a literal property name in an object literal', () => {
        expect(parseScript('obj = {  *g() { ({  yield: 1 });  } };')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "obj"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "g"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "ObjectExpression",
                                            "properties": [{
                                                "type": "Property",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "yield"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "Literal",
                                                    "value": 1
                                                },
                                                "kind": "init",
                                                "method": false,
                                                "shorthand": false
                                            }]
                                        }
                                    }]
                                },
                                "generator": true,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse yield been terminated by newline"', () => {
        expect(parseScript(`obj = {
  *g() {
    yield
    1
  }
};`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "obj"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "g"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "YieldExpression",
                                                "argument": null,
                                                "delegate": false
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "Literal",
                                                "value": 1,
                                                "raw": "1"
                                            }
                                        }
                                    ]
                                },
                                "generator": true,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({a:0, get \'b\'(){}, set 3(d){}})"', () => {
        expect(parseScript('({a:0, get \'b\'(){}, set 3(d){}})')).to.eql({
            "body": [{
                "expression": {
                    "properties": [{
                            "computed": false,
                            "key": {
                                "name": "a",
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "type": "Property",
                            "value": {
                                "type": "Literal",
                                "value": 0
                            }
                        },
                        {
                            "computed": false,
                            "key": {
                                "type": "Literal",
                                "value": "b"
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false,
                            "type": "Property",
                            "value": {
                                "async": false,
                                "body": {
                                    "body": [],
                                    "type": "BlockStatement"
                                },
                                "expression": false,
                                "generator": false,
                                "id": null,
                                "params": [],
                                "type": "FunctionExpression"
                            }
                        },
                        {
                            "computed": false,
                            "key": {
                                "type": "Literal",
                                "value": 3
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false,
                            "type": "Property",
                            "value": {
                                "async": false,
                                "body": {
                                    "body": [],
                                    "type": "BlockStatement"
                                },
                                "expression": false,
                                "generator": false,
                                "id": null,
                                "params": [{
                                    "name": "d",
                                    "type": "Identifier"
                                }],
                                "type": "FunctionExpression"
                            }
                        }
                    ],
                    "type": "ObjectExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });
    it('should parse "({ set 10(w) { w } })"', () => {
        expect(parseScript('({ set 10(w) { w } })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": 10
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [{
                                "type": "Identifier",
                                "name": "w"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "Identifier",
                                        "name": "w"
                                    }
                                }]
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "set",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({a(b,...c){}})"', () => {
        expect(parseScript('({a(b,...c){}})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [{
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "c"
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "({a(){let a;}})"', () => {
        expect(parseScript('({a(){let a;}})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "VariableDeclaration",
                                    "declarations": [{
                                        "type": "VariableDeclarator",
                                        "id": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
                                        "init": null
                                    }],
                                    "kind": "let"
                                }]
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({set a(eval){}})"', () => {
        expect(parseScript('({set a(eval){}})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [{
                                "type": "Identifier",
                                "name": "eval"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "set",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "x = { method() { } }"', () => {
        expect(parseScript('x = { method() { } }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "method"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x = { "method"() { } }"', () => {
        expect(parseScript('x = { "method"() { } }', {
            locations: true,
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 22,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 22
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 22,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 1
                      }
                    },
                    "name": "x"
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 4,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 22
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 6,
                        "end": 20,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 6
                          },
                          "end": {
                            "line": 1,
                            "column": 20
                          }
                        },
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Literal",
                          "start": 6,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "value": "method",
                          "raw": "\"method\""
                        },
                        "kind": "init",
                        "value": {
                          "type": "FunctionExpression",
                          "start": 14,
                          "end": 20,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 14
                            },
                            "end": {
                              "line": 1,
                              "column": 20
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 17,
                            "end": 20,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 17
                              },
                              "end": {
                                "line": 1,
                                "column": 20
                              }
                            },
                            "body": []
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should parse object property shorthand with params"', () => {
        expect(parseScript('x = { y, z }', {
            raw: true,
            locations: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 12
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 12,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 1,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 1
                      }
                    },
                    "name": "x"
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 4,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 6,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 6
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 7
                            }
                          },
                          "name": "y"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 6,
                          "end": 7,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 7
                            }
                          },
                          "name": "y"
                        }
                      },
                      {
                        "type": "Property",
                        "start": 9,
                        "end": 10,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 9
                          },
                          "end": {
                            "line": 1,
                            "column": 10
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 9
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "name": "z"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 9
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "name": "z"
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x = { method(test) { } }"', () => {
        expect(parseScript('x = { method(test) { } }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "method"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [{
                                    "type": "Identifier",
                                    "name": "test"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x = { set() { } }"', () => {
        expect(parseScript('x = { set() { } }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "set"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x = { get() { } }"', () => {
        expect(parseScript('x = { get() { } }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "get"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({ __proto__: null, get __proto__(){} })"', () => {
        expect(parseScript('({ __proto__: null, get __proto__(){} })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": null
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({ __proto__: null, get __proto__(){}, set __proto__(x){} })"', () => {
        expect(parseScript('({ __proto__: null, get __proto__(){}, set __proto__(x){} })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": null
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [{
                                    "type": "Identifier",
                                    "name": "x"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({get [x]() {}, set [x](v) {}})"', () => {
        expect(parseScript('({get [x]() {}, set [x](v) {}})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "computed": true,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "computed": true,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [{
                                    "type": "Identifier",
                                    "name": "v"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({[x]() {}})"', () => {
        expect(parseScript('({[x]() {}})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({["x" + "y"]: 10})"', () => {
        expect(parseScript('({["x" + "y"]: 10})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Literal",
                                "value": "x"
                            },
                            "right": {
                                "type": "Literal",
                                "value": "y"
                            }
                        },
                        "computed": true,
                        "value": {
                            "type": "Literal",
                            "value": 10
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({[x]: function() {}})"', () => {
        expect(parseScript('({[x]: function() {}})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({[x]: 10, y: 20})"', () => {
        expect(parseScript('({[x]: 10, y: 20})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "computed": true,
                            "value": {
                                "type": "Literal",
                                "value": 10
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 20
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });
    it('should parse proto literal getter setter"', () => {
        expect(parseScript('({ "__proto__": null, get __proto__(){}, set __proto__(x){} })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Literal",
                                "value": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": null
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [{
                                    "type": "Identifier",
                                    "name": "x"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse proto literal method"', () => {
        expect(parseScript('({ "__proto__": null, __proto__(){}, })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Literal",
                                "value": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": null
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse proto identifier shorthand', () => {
        expect(parseScript('({ __proto__: null, __proto__ })', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 32,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 31,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 18,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 12,
                        "name": "__proto__"
                      },
                      "value": {
                        "type": "Literal",
                        "start": 14,
                        "end": 18,
                        "value": null,
                        "raw": "null"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 20,
                      "end": 29,
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 29,
                        "name": "__proto__"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 20,
                        "end": 29,
                        "name": "__proto__"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse proto literal setter', () => {
        expect(parseScript('({ "__proto__": null, set __proto__(x){} })', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 43,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 43,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 42,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 20,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 3,
                        "end": 14,
                        "value": "__proto__",
                        "raw": "\"__proto__\""
                      },
                      "value": {
                        "type": "Literal",
                        "start": 16,
                        "end": 20,
                        "value": null,
                        "raw": "null"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 22,
                      "end": 40,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 26,
                        "end": 35,
                        "name": "__proto__"
                      },
                      "kind": "set",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 35,
                        "end": 40,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 36,
                            "end": 37,
                            "name": "x"
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 38,
                          "end": 40,
                          "body": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse proto literal shorthand', () => {
        expect(parseScript('({ "__proto__": null, __proto__ })', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 34,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 34,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 33,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 20,
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 3,
                        "end": 14,
                        "value": "__proto__",
                        "raw": "\"__proto__\""
                      },
                      "value": {
                        "type": "Literal",
                        "start": 16,
                        "end": 20,
                        "value": null,
                        "raw": "null"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 22,
                      "end": 31,
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 22,
                        "end": 31,
                        "name": "__proto__"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 22,
                        "end": 31,
                        "name": "__proto__"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse proto identifier setter"', () => {
        expect(parseScript('({ __proto__: null, set __proto__(x){} })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": null
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [{
                                    "type": "Identifier",
                                    "name": "x"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "({})"', () => {
        expect(parseScript('({})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": []
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "+{}"', () => {
        expect(parseScript('+{}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "+",
                    "argument": {
                        "type": "ObjectExpression",
                        "properties": []
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "+{ }"', () => {
        expect(parseScript('+{ }')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "+",
                    "argument": {
                        "type": "ObjectExpression",
                        "properties": []
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "({ answer: 0 })"', () => {
        expect(parseScript('({ answer: 0 })')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "answer"
                        },
                        "computed": false,
                        "value": {
                            "type": "Literal",
                            "value": 0
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({a, b: 0, c})"', () => {
        expect(parseScript('({a, b: 0, c})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "b"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 0
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "c"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "c"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "({a})"', () => {
        expect(parseScript('({a})')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "computed": false,
                        "value": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": true
                    }]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse "var x = {*[test]() { yield *v; }}"', () => {
        expect(parseScript('x = {*[test]() { yield *v; }}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "test"
                            },
                            "computed": true,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "YieldExpression",
                                            "argument": {
                                                "type": "Identifier",
                                                "name": "v"
                                            },
                                            "delegate": true
                                        }
                                    }]
                                },
                                "generator": true,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse computed values as accessor property names (AssignmentExpression) (Object initializer)', () => {
        expect(parseScript(`obj = {
  get [[_ = 'str' + 'ing']]() {  },
  set [[_ = 'str' + 'ing']](param) { stringSet = param; }
};`, {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "obj"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "ArrayExpression",
                                    "elements": [{
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "_"
                                        },
                                        "right": {
                                            "type": "BinaryExpression",
                                            "operator": "+",
                                            "left": {
                                                "type": "Literal",
                                                "value": "str",
                                                "raw": "'str'"
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "value": "ing",
                                                "raw": "'ing'"
                                            }
                                        }
                                    }]
                                },
                                "computed": true,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "get",
                                "method": false,
                                "shorthand": false
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "ArrayExpression",
                                    "elements": [{
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "_"
                                        },
                                        "right": {
                                            "type": "BinaryExpression",
                                            "operator": "+",
                                            "left": {
                                                "type": "Literal",
                                                "value": "str",
                                                "raw": "'str'"
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "value": "ing",
                                                "raw": "'ing'"
                                            }
                                        }
                                    }]
                                },
                                "computed": true,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [{
                                        "type": "Identifier",
                                        "name": "param"
                                    }],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [{
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "stringSet"
                                                },
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "param"
                                                }
                                            }
                                        }]
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "set",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse property descriptor for get property assignment', () => {
        expect(parseScript('o = {set foo(arg){}};', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "o"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [{
                                    "type": "Identifier",
                                    "name": "arg"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a get accessor property definition is followed by a data property definition with the same name - get', () => {
        expect(parseScript('({get foo(){}, foo : 1});', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse a data property definition is followed by get accessor definition with the same name', () => {
        expect(parseScript('({foo : 1, get foo(){}});', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse duplicate data property name in sloppy mode', () => {
        expect(parseScript('({foo:0,foo:1});', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 0,
                                "raw": "0"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });


    
    it('should parse ({async})', () => {
        expect(parseScript('({async})', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 9,
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 8,
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 7,
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 7,
                        "name": "async"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 7,
                        "name": "async"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse duplicate property name (get,get)', () => {
        expect(parseScript('({get foo(){}, get foo(){}});', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a set accessor property definition is followed by a data property definition with the same name - set', () => {
        expect(parseScript('({set foo(x){}, foo : 1});', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ObjectExpression",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [{
                                    "type": "Identifier",
                                    "name": "x"
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "set",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }],
            "sourceType": "script"
        });
    });


    it('should parse property descriptor for assignment expression', () => {
        expect(parseScript('o = {foo : 1};', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "o"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "x = { get undef() {} }"', () => {
        expect(parseScript('x = { get undef() {} }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "undef"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": false,
                                "expression": false,
                                "async": false
                            },
                            "kind": "get",
                            "method": false,
                            "shorthand": false
                        }]
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse ""use strict";x={y:1,y:1}"', () => {
        expect(parseScript('"use strict";x={y:1,y:1}', {
            raw: true,
            ranges: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 24,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 12,
                  "value": "use strict",
                  "raw": "\"use strict\""
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 13,
                "end": 24,
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 13,
                  "end": 24,
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 13,
                    "end": 14,
                    "name": "x"
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 15,
                    "end": 24,
                    "properties": [
                      {
                        "type": "Property",
                        "start": 16,
                        "end": 19,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 17,
                          "name": "y"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 18,
                          "end": 19,
                          "value": 1,
                          "raw": "1"
                        },
                        "kind": "init"
                      },
                      {
                        "type": "Property",
                        "start": 20,
                        "end": 23,
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 20,
                          "end": 21,
                          "name": "y"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 22,
                          "end": 23,
                          "value": 1,
                          "raw": "1"
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({[a]:()=>{}})"', () => {
        expect(parseScript('({[a]:()=>{}})', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "computed": true,
                                "value": {
                                    "type": "ArrowFunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "({["__proto__"]:0, ["__proto__"]:0})"', () => {
        expect(parseScript('({["__proto__"]:0, ["__proto__"]:0})', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": "__proto__",
                                    "raw": "\"__proto__\""
                                },
                                "computed": true,
                                "value": {
                                    "type": "Literal",
                                    "value": 0,
                                    "raw": "0"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": "__proto__",
                                    "raw": "\"__proto__\""
                                },
                                "computed": true,
                                "value": {
                                    "type": "Literal",
                                    "value": 0,
                                    "raw": "0"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "({set x(a=0){}})"', () => {
        expect(parseScript('({set x(a=0){}})', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [
                                        {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "a"
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "value": 0,
                                                "raw": "0"
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": []
                                    },
                                    "generator": false,
                                    "expression": false,
                                    "async": false
                                },
                                "kind": "set",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x = { __proto__: 2 }"', () => {
        expect(parseScript('x = { __proto__: 2 }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "__proto__"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 2,
                                        "raw": "2"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x = { set 10(w) { m_null = w } }"', () => {
        expect(parseScript('x = { set 10(w) { m_null = w } }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Literal",
                                        "value": 10,
                                        "raw": "10"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "w"
                                            }
                                        ],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "m_null"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "w"
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        "generator": false,
                                        "expression": false,
                                        "async": false
                                    },
                                    "kind": "set",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x = { set false(w) { m_false = w } }"', () => {
        expect(parseScript('x = { set false(w) { m_false = w } }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "false"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "w"
                                            }
                                        ],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "m_false"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "w"
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        "generator": false,
                                        "expression": false,
                                        "async": false
                                    },
                                    "kind": "set",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x = { set true(w) { m_true = w } }"', () => {
        expect(parseScript('x = { set true(w) { m_true = w } }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "true"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "w"
                                            }
                                        ],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "m_true"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "w"
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        "generator": false,
                                        "expression": false,
                                        "async": false
                                    },
                                    "kind": "set",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x = { set: 43 }"', () => {
        expect(parseScript('x = { set: 43 }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "set"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Literal",
                                        "value": 43,
                                        "raw": "43"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x = { set "null"(w) { m_null = w } }"', () => {
        expect(parseScript('x = { set "null"(w) { m_null = w } }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Literal",
                                        "value": "null",
                                        "raw": "\"null\""
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "w"
                                            }
                                        ],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "m_null"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "w"
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        "generator": false,
                                        "expression": false,
                                        "async": false
                                    },
                                    "kind": "set",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x = { set if(w) { m_if = w } }"', () => {
        expect(parseScript('x = { set if(w) { m_if = w } }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "if"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [
                                            {
                                                "type": "Identifier",
                                                "name": "w"
                                            }
                                        ],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "operator": "=",
                                                        "left": {
                                                            "type": "Identifier",
                                                            "name": "m_if"
                                                        },
                                                        "right": {
                                                            "type": "Identifier",
                                                            "name": "w"
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        "generator": false,
                                        "expression": false,
                                        "async": false
                                    },
                                    "kind": "set",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "x = { get null() {} } "', () => {
        expect(parseScript('x = { get null() {} }', {
            raw: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "null"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "id": null,
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": []
                                        },
                                        "generator": false,
                                        "expression": false,
                                        "async": false
                                    },
                                    "kind": "get",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        }
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "({async \"foo\"(){}})"', () => {
        expect(parseScript(`({async "foo"(){}})`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 19,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 19,
              "expression": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 18,
                "properties": [
                  {
                    "type": "Property",
                    "start": 2,
                    "end": 17,
                    "method": true,
                    "shorthand": false,
                    "computed": false,
                    "key": {
                      "type": "Literal",
                      "start": 8,
                      "end": 13,
                      "value": "foo",
                      "raw": "\"foo\""
                    },
                    "kind": "init",
                    "value": {
                      "type": "FunctionExpression",
                      "start": 13,
                      "end": 17,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 15,
                        "end": 17,
                        "body": []
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
      });
    
      it('should parse "({async 100(){}})"', () => {
        expect(parseScript(`({async 100(){}})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 17
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
                        "start": 8,
                        "end": 11,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 11
                          }
                        },
                        "value": 100,
                        "raw": "100"
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 11,
                        "end": 15,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 15
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 13,
                          "end": 15,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 13
                            },
                            "end": {
                              "line": 1,
                              "column": 15
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
      });
    
      it('should parse "({async [foo](){}})"', () => {
        expect(parseScript(`({async [foo](){}})`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 19,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 19,
              "expression": {
                "type": "ObjectExpression",
                "start": 1,
                "end": 18,
                "properties": [
                  {
                    "type": "Property",
                    "start": 2,
                    "end": 17,
                    "method": true,
                    "shorthand": false,
                    "computed": true,
                    "key": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 12,
                      "name": "foo"
                    },
                    "kind": "init",
                    "value": {
                      "type": "FunctionExpression",
                      "start": 13,
                      "end": 17,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 15,
                        "end": 17,
                        "body": []
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
      });
      
        it('should parse "({async = 0} = {})"', () => {
            expect(parseScript(`({async = 0} = {})`, {
                ranges: false,
                raw: true
            })).to.eql({
                "body": [
                  {
                    "expression": {
                      "left": {
                        "properties": [
                          {
                            "computed": false,
                            "key": {
                              "name": "async",
                              "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                           "shorthand": true,
                            "type": "Property",
                            "value": {
                              "left": {
                                "name": "async",
                                "type": "Identifier"
                              },
                              "right": {
                                "raw": "0",
                                "type": "Literal",
                                "value": 0,
                              },
                              "type": "AssignmentPattern"
                            }
                          }
                        ],
                        "type": "ObjectPattern",
                      },
                      "operator": "=",
                      "right": {
                        "properties": [],
                        "type": "ObjectExpression",
                      },
                     "type": "AssignmentExpression"
                    },
                    "type": "ExpressionStatement"
                  },
               ],
                "sourceType": "script",
                "type": "Program",
              });
          });
   
          
          it('should parse object with await property', () => {
            expect(parseScript(`a = {
              await: b,
          }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 11
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 41,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 3,
                        "column": 11
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 41,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 3,
                          "column": 11
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 1
                          }
                        },
                        "name": "a"
                      },
                      "right": {
                        "type": "ObjectExpression",
                        "start": 4,
                        "end": 41,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 3,
                            "column": 11
                          }
                        },
                        "properties": [
                          {
                            "type": "Property",
                            "start": 20,
                            "end": 28,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 14
                              },
                              "end": {
                                "line": 2,
                                "column": 22
                              }
                            },
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 20,
                              "end": 25,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 14
                                },
                                "end": {
                                  "line": 2,
                                  "column": 19
                                }
                              },
                              "name": "await"
                            },
                            "value": {
                              "type": "Identifier",
                              "start": 27,
                              "end": 28,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 21
                                },
                                "end": {
                                  "line": 2,
                                  "column": 22
                                }
                              },
                              "name": "b"
                            },
                            "kind": "init"
                          }
                        ]
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
          });
    
          it('should parse object with arguments as property key in sloppy mode', () => {
            expect(parseScript(`options = {
              host: options,
              port: arguments[2],
              path: arguments[3]
            };`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 122,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 14
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 122,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 5,
                        "column": 14
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 121,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 5,
                          "column": 13
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "name": "options"
                      },
                      "right": {
                        "type": "ObjectExpression",
                        "start": 10,
                        "end": 121,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 10
                          },
                          "end": {
                            "line": 5,
                            "column": 13
                          }
                        },
                        "properties": [
                          {
                            "type": "Property",
                            "start": 26,
                            "end": 39,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 14
                              },
                              "end": {
                                "line": 2,
                                "column": 27
                              }
                            },
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 26,
                              "end": 30,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 14
                                },
                                "end": {
                                  "line": 2,
                                  "column": 18
                                }
                              },
                              "name": "host"
                            },
                            "value": {
                              "type": "Identifier",
                              "start": 32,
                              "end": 39,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 20
                                },
                                "end": {
                                  "line": 2,
                                  "column": 27
                                }
                              },
                              "name": "options"
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 55,
                            "end": 73,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 14
                              },
                              "end": {
                                "line": 3,
                                "column": 32
                              }
                            },
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 55,
                              "end": 59,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 14
                                },
                                "end": {
                                  "line": 3,
                                  "column": 18
                                }
                              },
                              "name": "port"
                            },
                            "value": {
                              "type": "MemberExpression",
                              "start": 61,
                              "end": 73,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 20
                                },
                                "end": {
                                  "line": 3,
                                  "column": 32
                                }
                              },
                              "object": {
                                "type": "Identifier",
                                "start": 61,
                                "end": 70,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 29
                                  }
                                },
                                "name": "arguments"
                              },
                              "property": {
                                "type": "Literal",
                                "start": 71,
                                "end": 72,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 30
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 31
                                  }
                                },
                                "value": 2,
                                "raw": "2"
                              },
                              "computed": true
                            },
                            "kind": "init"
                          },
                          {
                            "type": "Property",
                            "start": 89,
                            "end": 107,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 14
                              },
                              "end": {
                                "line": 4,
                                "column": 32
                              }
                            },
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 89,
                              "end": 93,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 14
                                },
                                "end": {
                                  "line": 4,
                                  "column": 18
                                }
                              },
                              "name": "path"
                            },
                            "value": {
                              "type": "MemberExpression",
                              "start": 95,
                              "end": 107,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 20
                                },
                                "end": {
                                  "line": 4,
                                  "column": 32
                                }
                              },
                              "object": {
                                "type": "Identifier",
                                "start": 95,
                                "end": 104,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 29
                                  }
                                },
                                "name": "arguments"
                              },
                              "property": {
                                "type": "Literal",
                                "start": 105,
                                "end": 106,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 30
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 31
                                  }
                                },
                                "value": 3,
                                "raw": "3"
                              },
                              "computed": true
                            },
                            "kind": "init"
                          }
                        ]
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
          });
    
          it('should parse "x = { if: 42 }"', () => {
            expect(parseScript(`x = { if: 42 }`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 14,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 14,
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 14,
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "x"
                      },
                      "right": {
                        "type": "ObjectExpression",
                        "start": 4,
                        "end": 14,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 6,
                            "end": 12,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 6,
                              "end": 8,
                              "name": "if"
                            },
                            "value": {
                              "type": "Literal",
                              "start": 10,
                              "end": 12,
                              "value": 42,
                              "raw": "42"
                            },
                            "kind": "init"
                          }
                        ]
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "x = { false: 42 }"', () => {
            expect(parseScript(`x = { false: 42 }`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 17,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 17,
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 0,
                      "end": 17,
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 1,
                        "name": "x"
                      },
                      "right": {
                        "type": "ObjectExpression",
                        "start": 4,
                        "end": 17,
                        "properties": [
                          {
                            "type": "Property",
                            "start": 6,
                            "end": 15,
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 6,
                              "end": 11,
                              "name": "false"
                            },
                            "value": {
                              "type": "Literal",
                              "start": 13,
                              "end": 15,
                              "value": 42,
                              "raw": "42"
                            },
                            "kind": "init"
                          }
                        ]
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
   
        it('should parse ""use strict"; var x = { i: 42, get i() {} }"', () => {
            expect(parseScript(`"use strict"; var x = { i: 42, get i() {} }`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 43,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 13,
                    "expression": {
                      "type": "Literal",
                      "start": 0,
                      "end": 12,
                      "value": "use strict",
                      "raw": "\"use strict\""
                    }
                  },
                  {
                    "type": "VariableDeclaration",
                    "start": 14,
                    "end": 43,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 18,
                        "end": 43,
                        "id": {
                          "type": "Identifier",
                          "start": 18,
                          "end": 19,
                          "name": "x"
                        },
                        "init": {
                          "type": "ObjectExpression",
                          "start": 22,
                          "end": 43,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 24,
                              "end": 29,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 24,
                                "end": 25,
                                "name": "i"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 27,
                                "end": 29,
                                "value": 42,
                                "raw": "42"
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 31,
                              "end": 41,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 35,
                                "end": 36,
                                "name": "i"
                              },
                              "kind": "get",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 36,
                                "end": 41,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 39,
                                  "end": 41,
                                  "body": []
                                }
                              }
                            }
                          ]
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse ""use strict"; var x = { set i(x) {}, i: 42 }"', () => {
            expect(parseScript(`"use strict"; var x = { set i(x) {}, i: 42 }`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 44,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 13,
                    "expression": {
                      "type": "Literal",
                      "start": 0,
                      "end": 12,
                      "value": "use strict",
                      "raw": "\"use strict\""
                    }
                  },
                  {
                    "type": "VariableDeclaration",
                    "start": 14,
                    "end": 44,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 18,
                        "end": 44,
                        "id": {
                          "type": "Identifier",
                          "start": 18,
                          "end": 19,
                          "name": "x"
                        },
                        "init": {
                          "type": "ObjectExpression",
                          "start": 22,
                          "end": 44,
                          "properties": [
                            {
                              "type": "Property",
                              "start": 24,
                              "end": 35,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 28,
                                "end": 29,
                                "name": "i"
                              },
                              "kind": "set",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 29,
                                "end": 35,
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "Identifier",
                                    "start": 30,
                                    "end": 31,
                                    "name": "x"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 33,
                                  "end": 35,
                                  "body": []
                                }
                              }
                            },
                            {
                              "type": "Property",
                              "start": 37,
                              "end": 42,
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 37,
                                "end": 38,
                                "name": "i"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 40,
                                "end": 42,
                                "value": 42,
                                "raw": "42"
                              },
                              "kind": "init"
                            }
                          ]
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse "({[a](){}})"', () => {
            expect(parseScript(`({[a](){}})`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 11,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 11,
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 10,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 9,
                          "method": true,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Identifier",
                            "start": 3,
                            "end": 4,
                            "name": "a"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 5,
                            "end": 9,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 7,
                              "end": 9,
                              "body": []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "({[a]:()=>{}})"', () => {
            expect(parseScript(`({[a]:()=>{}})`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 14,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 14,
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 13,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 12,
                          "method": false,
                          "shorthand": false,
                          "computed": true,
                          "key": {
                            "type": "Identifier",
                            "start": 3,
                            "end": 4,
                            "name": "a"
                          },
                          "value": {
                            "type": "ArrowFunctionExpression",
                            "start": 6,
                            "end": 12,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 10,
                              "end": 12,
                              "body": []
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
    
        it('should parse shorthand method with default params', () => {
            expect(parseScript(`"use strict";
            
            var x = {
                baz(a = 10) {},
                foo(a, b = 10) {},
                toast(a, b = 10, c) {}
            };`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 169,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 7,
                    "column": 14
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "expression": {
                      "type": "Literal",
                      "start": 0,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "value": "use strict",
                      "raw": "\"use strict\""
                    }
                  },
                  {
                    "type": "VariableDeclaration",
                    "start": 39,
                    "end": 169,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 12
                      },
                      "end": {
                        "line": 7,
                        "column": 14
                      }
                    },
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 43,
                        "end": 168,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 16
                          },
                          "end": {
                            "line": 7,
                            "column": 13
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 43,
                          "end": 44,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 16
                            },
                            "end": {
                              "line": 3,
                              "column": 17
                            }
                          },
                          "name": "x"
                        },
                        "init": {
                          "type": "ObjectExpression",
                          "start": 47,
                          "end": 168,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 20
                            },
                            "end": {
                              "line": 7,
                              "column": 13
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 65,
                              "end": 79,
                              "loc": {
                                "start": {
                                  "line": 4,
                                  "column": 16
                                },
                                "end": {
                                  "line": 4,
                                  "column": 30
                                }
                              },
                              "method": true,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 65,
                                "end": 68,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 19
                                  }
                                },
                                "name": "baz"
                              },
                              "kind": "init",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 68,
                                "end": 79,
                                "loc": {
                                  "start": {
                                    "line": 4,
                                    "column": 19
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 30
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "AssignmentPattern",
                                    "start": 69,
                                    "end": 75,
                                    "loc": {
                                      "start": {
                                        "line": 4,
                                        "column": 20
                                      },
                                      "end": {
                                        "line": 4,
                                        "column": 26
                                      }
                                    },
                                    "left": {
                                      "type": "Identifier",
                                      "start": 69,
                                      "end": 70,
                                      "loc": {
                                        "start": {
                                          "line": 4,
                                          "column": 20
                                        },
                                        "end": {
                                          "line": 4,
                                          "column": 21
                                        }
                                      },
                                      "name": "a"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "start": 73,
                                      "end": 75,
                                      "loc": {
                                        "start": {
                                          "line": 4,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 4,
                                          "column": 26
                                        }
                                      },
                                      "value": 10,
                                      "raw": "10"
                                    }
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 77,
                                  "end": 79,
                                  "loc": {
                                    "start": {
                                      "line": 4,
                                      "column": 28
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 30
                                    }
                                  },
                                  "body": []
                                }
                              }
                            },
                            {
                              "type": "Property",
                              "start": 97,
                              "end": 114,
                              "loc": {
                                "start": {
                                  "line": 5,
                                  "column": 16
                                },
                                "end": {
                                  "line": 5,
                                  "column": 33
                                }
                              },
                              "method": true,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 97,
                                "end": 100,
                                "loc": {
                                  "start": {
                                    "line": 5,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 5,
                                    "column": 19
                                  }
                                },
                                "name": "foo"
                              },
                              "kind": "init",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 100,
                                "end": 114,
                                "loc": {
                                  "start": {
                                    "line": 5,
                                    "column": 19
                                  },
                                  "end": {
                                    "line": 5,
                                    "column": 33
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "Identifier",
                                    "start": 101,
                                    "end": 102,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 20
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 21
                                      }
                                    },
                                    "name": "a"
                                  },
                                  {
                                    "type": "AssignmentPattern",
                                    "start": 104,
                                    "end": 110,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 23
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 29
                                      }
                                    },
                                    "left": {
                                      "type": "Identifier",
                                      "start": 104,
                                      "end": 105,
                                      "loc": {
                                        "start": {
                                          "line": 5,
                                          "column": 23
                                        },
                                        "end": {
                                          "line": 5,
                                          "column": 24
                                        }
                                      },
                                      "name": "b"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "start": 108,
                                      "end": 110,
                                      "loc": {
                                        "start": {
                                          "line": 5,
                                          "column": 27
                                        },
                                        "end": {
                                          "line": 5,
                                          "column": 29
                                        }
                                      },
                                      "value": 10,
                                      "raw": "10"
                                    }
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 112,
                                  "end": 114,
                                  "loc": {
                                    "start": {
                                      "line": 5,
                                      "column": 31
                                    },
                                    "end": {
                                      "line": 5,
                                      "column": 33
                                    }
                                  },
                                  "body": []
                                }
                              }
                            },
                            {
                              "type": "Property",
                              "start": 132,
                              "end": 154,
                              "loc": {
                                "start": {
                                  "line": 6,
                                  "column": 16
                                },
                                "end": {
                                  "line": 6,
                                  "column": 38
                                }
                              },
                              "method": true,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 132,
                                "end": 137,
                                "loc": {
                                  "start": {
                                    "line": 6,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 6,
                                    "column": 21
                                  }
                                },
                                "name": "toast"
                              },
                              "kind": "init",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 137,
                                "end": 154,
                                "loc": {
                                  "start": {
                                    "line": 6,
                                    "column": 21
                                  },
                                  "end": {
                                    "line": 6,
                                    "column": 38
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "Identifier",
                                    "start": 138,
                                    "end": 139,
                                    "loc": {
                                      "start": {
                                        "line": 6,
                                        "column": 22
                                      },
                                      "end": {
                                        "line": 6,
                                        "column": 23
                                      }
                                    },
                                    "name": "a"
                                  },
                                  {
                                    "type": "AssignmentPattern",
                                    "start": 141,
                                    "end": 147,
                                    "loc": {
                                      "start": {
                                        "line": 6,
                                        "column": 25
                                      },
                                      "end": {
                                        "line": 6,
                                        "column": 31
                                      }
                                    },
                                    "left": {
                                      "type": "Identifier",
                                      "start": 141,
                                      "end": 142,
                                      "loc": {
                                        "start": {
                                          "line": 6,
                                          "column": 25
                                        },
                                        "end": {
                                          "line": 6,
                                          "column": 26
                                        }
                                      },
                                      "name": "b"
                                    },
                                    "right": {
                                      "type": "Literal",
                                      "start": 145,
                                      "end": 147,
                                      "loc": {
                                        "start": {
                                          "line": 6,
                                          "column": 29
                                        },
                                        "end": {
                                          "line": 6,
                                          "column": 31
                                        }
                                      },
                                      "value": 10,
                                      "raw": "10"
                                    }
                                  },
                                  {
                                    "type": "Identifier",
                                    "start": 149,
                                    "end": 150,
                                    "loc": {
                                      "start": {
                                        "line": 6,
                                        "column": 33
                                      },
                                      "end": {
                                        "line": 6,
                                        "column": 34
                                      }
                                    },
                                    "name": "c"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 152,
                                  "end": 154,
                                  "loc": {
                                    "start": {
                                      "line": 6,
                                      "column": 36
                                    },
                                    "end": {
                                      "line": 6,
                                      "column": 38
                                    }
                                  },
                                  "body": []
                                }
                              }
                            }
                          ]
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse "({set x(a=0){}})"', () => {
            expect(parseScript(`({set x(a=0){}})`, {
                ranges: true,
                raw: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 16,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 16,
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 15,
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 14,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 6,
                            "end": 7,
                            "name": "x"
                          },
                          "kind": "set",
                          "value": {
                            "type": "FunctionExpression",
                            "start": 7,
                            "end": 14,
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "AssignmentPattern",
                                "start": 8,
                                "end": 11,
                                "left": {
                                  "type": "Identifier",
                                  "start": 8,
                                  "end": 9,
                                  "name": "a"
                                },
                                "right": {
                                  "type": "Literal",
                                  "start": 10,
                                  "end": 11,
                                  "value": 0,
                                  "raw": "0"
                                }
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 12,
                              "end": 14,
                              "body": []
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
   
        it('should parse reserved words as object key (module code)', () => {
            expect(parseModule(`({ implements: a });`, {
                raw: true,
                ranges: true,
                next: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 20
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 1,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 16,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 16
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 3,
                            "end": 13,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 3
                              },
                              "end": {
                                "line": 1,
                                "column": 13
                              }
                            },
                            "name": "implements"
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 16,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 16
                              }
                            },
                            "name": "a"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "module"
              });
        });

        it('should parse reserved words as object key (strict mode)', () => {
            expect(parseScript(`"use strict"; ({ implements: a });`, {
                raw: true,
                ranges: true,
                next: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 34,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 34
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 13,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "expression": {
                      "type": "Literal",
                      "start": 0,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "value": "use strict",
                      "raw": "\"use strict\""
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 14,
                    "end": 34,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "expression": {
                      "type": "ObjectExpression",
                      "start": 15,
                      "end": 32,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 32
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 17,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 17
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 17,
                            "end": 27,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 17
                              },
                              "end": {
                                "line": 1,
                                "column": 27
                              }
                            },
                            "name": "implements"
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 29,
                            "end": 30,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 29
                              },
                              "end": {
                                "line": 1,
                                "column": 30
                              }
                            },
                            "name": "a"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              });
        });
});