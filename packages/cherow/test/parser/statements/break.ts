import * as t from 'assert';
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';

describe('Statements - Break', () => {

  describe('Failure', () => {

    fail(`break`, Context.Empty, {
        source: `break`,
    });

    fail(`loop1: while (true) { loop2: function a() { break loop1; } }`, Context.Empty, {
      source: `loop1: while (true) { loop2: function a() { break loop1; } }`,
    });

    fail(`break foo; var y=2; }`, Context.Empty, {
      source: `break foo; var y=2; }`,
    });

    fail(`loop1: while (true) { loop2: function a() { break loop2; } }`, Context.Empty, {
      source: `loop1: while (true) { loop2: function a() { break loop2; } }`,
    });

    fail(`ice: while(true) { break fapper; }`, Context.Empty, {
      source: `ice: while(true) { break fapper; }`,
    });

    fail(`try{ LABEL1 : do { throw foo;  } while(0); } catch(e){ break LABEL2; LABEL2 : do {} while(0); };`, Context.Empty, {
      source: `try{ LABEL1 : do { throw foo;  } while(0); } catch(e){ break LABEL2; LABEL2 : do {} while(0); };`,
    });

    fail(`(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_ANOTHER_LOOP;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
  })();`, Context.Empty, {
              source: `(function(){
        OuterLabel : var x=0, y=0;
        LABEL_DO_LOOP : do {
            LABEL_IN : x++;
            if(x===10)
                return;
            break LABEL_ANOTHER_LOOP;
            LABEL_IN_2 : y++;
            function IN_DO_FUNC(){}
        } while(0);
        LABEL_ANOTHER_LOOP : do {
            ;
        } while(0);
        function OUT_FUNC(){}
    })();`,
          });

          fail(`LABEL1 : do {
          x++;
          (function(){break LABEL1;})();
          y++;
      } while(0);`, Context.Empty, {
              source: `LABEL1 : do {
                  x++;
                  (function(){break LABEL1;})();
                  y++;
              } while(0);`,
          });

          fail(`(function(){
          OuterLabel : var x=0, y=0;
          LABEL_DO_LOOP : do {
              LABEL_IN : x++;
              if(x===10)
                  return;
              break IN_DO_FUNC;
              LABEL_IN_2 : y++;
              function IN_DO_FUNC(){}
          } while(0);
          LABEL_ANOTHER_LOOP : do {
              ;
          } while(0);
          function OUT_FUNC(){}
      })();`, Context.Empty, {
              source: `(function(){
                  OuterLabel : var x=0, y=0;
                  LABEL_DO_LOOP : do {
                      LABEL_IN : x++;
                      if(x===10)
                          return;
                      break IN_DO_FUNC;
                      LABEL_IN_2 : y++;
                      function IN_DO_FUNC(){}
                  } while(0);
                  LABEL_ANOTHER_LOOP : do {
                      ;
                  } while(0);
                  function OUT_FUNC(){}
              })();`,
          });

          fail(`(function(){
            OuterLabel : var x=0, y=0;
            LABEL_DO_LOOP : do {
                LABEL_IN : x++;
                if(x===10)
                    return;
                break LABEL_IN;
                LABEL_IN_2 : y++;
                function IN_DO_FUNC(){}
            } while(0);
            LABEL_ANOTHER_LOOP : do {
                ;
            } while(0);
            function OUT_FUNC(){}
        })();`, Context.Empty, {
            source: `(function(){
                    OuterLabel : var x=0, y=0;
                    LABEL_DO_LOOP : do {
                        LABEL_IN : x++;
                        if(x===10)
                            return;
                        break LABEL_IN;
                        LABEL_IN_2 : y++;
                        function IN_DO_FUNC(){}
                    } while(0);
                    LABEL_ANOTHER_LOOP : do {
                        ;
                    } while(0);
                    function OUT_FUNC(){}
                })();`,
        });

        fail(`(function(){
    OuterLabel : var x=0, y=0;
    LABEL_DO_LOOP : do {
        LABEL_IN : x++;
        if(x===10)
            return;
        break IN_DO_FUNC;
        LABEL_IN_2 : y++;
        function IN_DO_FUNC(){}
    } while(0);
    LABEL_ANOTHER_LOOP : do {
        ;
    } while(0);
    function OUT_FUNC(){}
})();`, Context.Empty, {
            source: `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break IN_DO_FUNC;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
  })();`,
        });

        fail(`(function(){
    OuterLabel : var x=0, y=0;
    LABEL_DO_LOOP : do {
        LABEL_IN : x++;
        if(x===10)
            return;
        break LABEL_IN;
        LABEL_IN_2 : y++;
        function IN_DO_FUNC(){}
    } while(0);
    LABEL_ANOTHER_LOOP : do {
        ;
    } while(0);
    function OUT_FUNC(){}
})();`, Context.Empty, {
            source: `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_IN;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
  })();`,
        });

        fail(`var x=0,y=0;
  try{
    LABEL1 : do {
      x++;
      throw "gonna leave it";
      y++;
    } while(0);
    $ERROR('#1: throw "gonna leave it" lead to throwing exception');
  } catch(e){
    break;
    LABEL2 : do {
      x++;
      y++;
    } while(0);
  }`, Context.Empty, {
            source: `var x=0,y=0;
    try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
    } catch(e){
      break;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
    }`,
        });
  });

  describe('Pass', () => {

    pass(`try{
      LABEL1 : do {
            x++;
            eval("break LABEL1");
            y++;
        } while(0);
      $ERROR('#1: eval("break LABEL1") does not lead to throwing exception');
    } catch(e){
      if(!(e instanceof SyntaxError)){
        $ERROR("1.1: Appearing of break within eval statement inside of IterationStatement yields SyntaxError");
      }
    }`, Context.Empty, {
        source: `try{
            LABEL1 : do {
                x++;
                eval("break LABEL1");
                y++;
            } while(0);
            $ERROR('#1: eval("break LABEL1") does not lead to throwing exception');
        } catch(e){
            if(!(e instanceof SyntaxError)){
                $ERROR("1.1: Appearing of break within eval statement inside of IterationStatement yields SyntaxError");
            }
        }`,
        expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [
              {
                  "type": "TryStatement",
                  "block": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "LabeledStatement",
                              "label": {
                                  "type": "Identifier",
                                  "name": "LABEL1"
                              },
                              "body": {
                                  "type": "DoWhileStatement",
                                  "body": {
                                      "type": "BlockStatement",
                                      "body": [
                                          {
                                              "type": "ExpressionStatement",
                                              "expression": {
                                                  "type": "UpdateExpression",
                                                  "argument": {
                                                      "type": "Identifier",
                                                      "name": "x"
                                                  },
                                                  "operator": "++",
                                                  "prefix": false
                                              }
                                          },
                                          {
                                              "type": "ExpressionStatement",
                                              "expression": {
                                                  "type": "CallExpression",
                                                  "callee": {
                                                      "type": "Identifier",
                                                      "name": "eval"
                                                  },
                                                  "arguments": [
                                                      {
                                                          "type": "Literal",
                                                          "value": "break LABEL1"
                                                      }
                                                  ]
                                              }
                                          },
                                          {
                                              "type": "ExpressionStatement",
                                              "expression": {
                                                  "type": "UpdateExpression",
                                                  "argument": {
                                                      "type": "Identifier",
                                                      "name": "y"
                                                  },
                                                  "operator": "++",
                                                  "prefix": false
                                              }
                                          }
                                      ]
                                  },
                                  "test": {
                                      "type": "Literal",
                                      "value": 0
                                  }
                              }
                          },
                          {
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "CallExpression",
                                  "callee": {
                                      "type": "Identifier",
                                      "name": "$ERROR"
                                  },
                                  "arguments": [
                                      {
                                          "type": "Literal",
                                          "value": "#1: eval(\"break LABEL1\") does not lead to throwing exception"
                                      }
                                  ]
                              }
                          }
                      ]
                  },
                  "handler": {
                      "type": "CatchClause",
                      "param": {
                          "type": "Identifier",
                          "name": "e"
                      },
                      "body": {
                          "type": "BlockStatement",
                          "body": [
                              {
                                  "type": "IfStatement",
                                  "test": {
                                      "type": "UnaryExpression",
                                      "operator": "!",
                                      "argument": {
                                          "type": "BinaryExpression",
                                          "left": {
                                              "type": "Identifier",
                                              "name": "e"
                                          },
                                          "right": {
                                              "type": "Identifier",
                                              "name": "SyntaxError"
                                          },
                                          "operator": "instanceof"
                                      },
                                      "prefix": true
                                  },
                                  "consequent": {
                                      "type": "BlockStatement",
                                      "body": [
                                          {
                                              "type": "ExpressionStatement",
                                              "expression": {
                                                  "type": "CallExpression",
                                                  "callee": {
                                                      "type": "Identifier",
                                                      "name": "$ERROR"
                                                  },
                                                  "arguments": [
                                                      {
                                                          "type": "Literal",
                                                          "value": "1.1: Appearing of break within eval statement inside of IterationStatement yields SyntaxError"
                                                      }
                                                  ]
                                              }
                                          }
                                      ]
                                  },
                                  "alternate": null
                              }
                          ]
                      }
                  },
                  "finalizer": null
              }
          ]
      }
      });

      pass(`(function(){
        FOR : for(;;){
            try{
                x++;
                if(x===10)return;
                throw 1;
            } catch(e){
                break FOR;
            }
        }
        })();`, Context.Empty, {
                source: `(function(){
            FOR : for(;;){
                try{
                    x++;
                    if(x===10)return;
                    throw 1;
                } catch(e){
                    break FOR;
                }
            }
            })();`,
                expected: {
                  "type": "Program",
                  "sourceType": "script",
                  "body": [
                      {
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "CallExpression",
                              "callee": {
                                  "type": "FunctionExpression",
                                  "params": [],
                                  "body": {
                                      "type": "BlockStatement",
                                      "body": [
                                          {
                                              "type": "LabeledStatement",
                                              "label": {
                                                  "type": "Identifier",
                                                  "name": "FOR"
                                              },
                                              "body": {
                                                  "type": "ForStatement",
                                                  "body": {
                                                      "type": "BlockStatement",
                                                      "body": [
                                                          {
                                                              "type": "TryStatement",
                                                              "block": {
                                                                  "type": "BlockStatement",
                                                                  "body": [
                                                                      {
                                                                          "type": "ExpressionStatement",
                                                                          "expression": {
                                                                              "type": "UpdateExpression",
                                                                              "argument": {
                                                                                  "type": "Identifier",
                                                                                  "name": "x"
                                                                              },
                                                                              "operator": "++",
                                                                              "prefix": false
                                                                          }
                                                                      },
                                                                      {
                                                                          "type": "IfStatement",
                                                                          "test": {
                                                                              "type": "BinaryExpression",
                                                                              "left": {
                                                                                  "type": "Identifier",
                                                                                  "name": "x"
                                                                              },
                                                                              "right": {
                                                                                  "type": "Literal",
                                                                                  "value": 10
                                                                              },
                                                                              "operator": "==="
                                                                          },
                                                                          "consequent": {
                                                                              "type": "ReturnStatement",
                                                                              "argument": null
                                                                          },
                                                                          "alternate": null
                                                                      },
                                                                      {
                                                                          "type": "ThrowStatement",
                                                                          "argument": {
                                                                              "type": "Literal",
                                                                              "value": 1
                                                                          }
                                                                      }
                                                                  ]
                                                              },
                                                              "handler": {
                                                                  "type": "CatchClause",
                                                                  "param": {
                                                                      "type": "Identifier",
                                                                      "name": "e"
                                                                  },
                                                                  "body": {
                                                                      "type": "BlockStatement",
                                                                      "body": [
                                                                          {
                                                                              "type": "BreakStatement",
                                                                              "label": {
                                                                                  "type": "Identifier",
                                                                                  "name": "FOR"
                                                                              }
                                                                          }
                                                                      ]
                                                                  }
                                                              },
                                                              "finalizer": null
                                                          }
                                                      ]
                                                  },
                                                  "init": null,
                                                  "test": null,
                                                  "update": null
                                              }
                                          }
                                      ]
                                  },
                                  "async": false,
                                  "generator": false,
                                  "expression": false,
                                  "id": null
                              },
                              "arguments": []
                          }
                      }
                  ]
              }
          });

          pass(`LABEL_OUT : var x=0, y=0, xx=0, yy=0;
          (function(){
          LABEL_DO_LOOP : do {
              LABEL_IN : x++;
              if(x===10)return;
              LABEL_NESTED_LOOP : do {
                  LABEL_IN_NESTED : xx++;
                  if(xx===10)return;
                  break LABEL_NESTED_LOOP;
                  LABEL_IN_NESTED_2 : yy++;
              } while (0);
              LABEL_IN_2 : y++;
              function IN_DO_FUNC(){}
          } while(0);
          LABEL_ANOTHER_LOOP : do {
              ;
          } while(0);
          function OUT_FUNC(){}
          })();`, Context.Empty, {
                      source: `LABEL_OUT : var x=0, y=0, xx=0, yy=0;
                  (function(){
                  LABEL_DO_LOOP : do {
                      LABEL_IN : x++;
                      if(x===10)return;
                      LABEL_NESTED_LOOP : do {
                          LABEL_IN_NESTED : xx++;
                          if(xx===10)return;
                          break LABEL_NESTED_LOOP;
                          LABEL_IN_NESTED_2 : yy++;
                      } while (0);
                      LABEL_IN_2 : y++;
                      function IN_DO_FUNC(){}
                  } while(0);
                  LABEL_ANOTHER_LOOP : do {
                      ;
                  } while(0);
                  function OUT_FUNC(){}
                  })();`,
                      expected: {
                        "type": "Program",
                        "sourceType": "script",
                        "body": [
                            {
                                "type": "LabeledStatement",
                                "label": {
                                    "type": "Identifier",
                                    "name": "LABEL_OUT"
                                },
                                "body": {
                                    "type": "VariableDeclaration",
                                    "kind": "var",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": {
                                                "type": "Literal",
                                                "value": 0
                                            },
                                            "id": {
                                                "type": "Identifier",
                                                "name": "x"
                                            }
                                        },
                                        {
                                            "type": "VariableDeclarator",
                                            "init": {
                                                "type": "Literal",
                                                "value": 0
                                            },
                                            "id": {
                                                "type": "Identifier",
                                                "name": "y"
                                            }
                                        },
                                        {
                                            "type": "VariableDeclarator",
                                            "init": {
                                                "type": "Literal",
                                                "value": 0
                                            },
                                            "id": {
                                                "type": "Identifier",
                                                "name": "xx"
                                            }
                                        },
                                        {
                                            "type": "VariableDeclarator",
                                            "init": {
                                                "type": "Literal",
                                                "value": 0
                                            },
                                            "id": {
                                                "type": "Identifier",
                                                "name": "yy"
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [
                                                {
                                                    "type": "LabeledStatement",
                                                    "label": {
                                                        "type": "Identifier",
                                                        "name": "LABEL_DO_LOOP"
                                                    },
                                                    "body": {
                                                        "type": "DoWhileStatement",
                                                        "body": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "LabeledStatement",
                                                                    "label": {
                                                                        "type": "Identifier",
                                                                        "name": "LABEL_IN"
                                                                    },
                                                                    "body": {
                                                                        "type": "ExpressionStatement",
                                                                        "expression": {
                                                                            "type": "UpdateExpression",
                                                                            "argument": {
                                                                                "type": "Identifier",
                                                                                "name": "x"
                                                                            },
                                                                            "operator": "++",
                                                                            "prefix": false
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "IfStatement",
                                                                    "test": {
                                                                        "type": "BinaryExpression",
                                                                        "left": {
                                                                            "type": "Identifier",
                                                                            "name": "x"
                                                                        },
                                                                        "right": {
                                                                            "type": "Literal",
                                                                            "value": 10
                                                                        },
                                                                        "operator": "==="
                                                                    },
                                                                    "consequent": {
                                                                        "type": "ReturnStatement",
                                                                        "argument": null
                                                                    },
                                                                    "alternate": null
                                                                },
                                                                {
                                                                    "type": "LabeledStatement",
                                                                    "label": {
                                                                        "type": "Identifier",
                                                                        "name": "LABEL_NESTED_LOOP"
                                                                    },
                                                                    "body": {
                                                                        "type": "DoWhileStatement",
                                                                        "body": {
                                                                            "type": "BlockStatement",
                                                                            "body": [
                                                                                {
                                                                                    "type": "LabeledStatement",
                                                                                    "label": {
                                                                                        "type": "Identifier",
                                                                                        "name": "LABEL_IN_NESTED"
                                                                                    },
                                                                                    "body": {
                                                                                        "type": "ExpressionStatement",
                                                                                        "expression": {
                                                                                            "type": "UpdateExpression",
                                                                                            "argument": {
                                                                                                "type": "Identifier",
                                                                                                "name": "xx"
                                                                                            },
                                                                                            "operator": "++",
                                                                                            "prefix": false
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "type": "IfStatement",
                                                                                    "test": {
                                                                                        "type": "BinaryExpression",
                                                                                        "left": {
                                                                                            "type": "Identifier",
                                                                                            "name": "xx"
                                                                                        },
                                                                                        "right": {
                                                                                            "type": "Literal",
                                                                                            "value": 10
                                                                                        },
                                                                                        "operator": "==="
                                                                                    },
                                                                                    "consequent": {
                                                                                        "type": "ReturnStatement",
                                                                                        "argument": null
                                                                                    },
                                                                                    "alternate": null
                                                                                },
                                                                                {
                                                                                    "type": "BreakStatement",
                                                                                    "label": {
                                                                                        "type": "Identifier",
                                                                                        "name": "LABEL_NESTED_LOOP"
                                                                                    }
                                                                                },
                                                                                {
                                                                                    "type": "LabeledStatement",
                                                                                    "label": {
                                                                                        "type": "Identifier",
                                                                                        "name": "LABEL_IN_NESTED_2"
                                                                                    },
                                                                                    "body": {
                                                                                        "type": "ExpressionStatement",
                                                                                        "expression": {
                                                                                            "type": "UpdateExpression",
                                                                                            "argument": {
                                                                                                "type": "Identifier",
                                                                                                "name": "yy"
                                                                                            },
                                                                                            "operator": "++",
                                                                                            "prefix": false
                                                                                        }
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        "test": {
                                                                            "type": "Literal",
                                                                            "value": 0
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "LabeledStatement",
                                                                    "label": {
                                                                        "type": "Identifier",
                                                                        "name": "LABEL_IN_2"
                                                                    },
                                                                    "body": {
                                                                        "type": "ExpressionStatement",
                                                                        "expression": {
                                                                            "type": "UpdateExpression",
                                                                            "argument": {
                                                                                "type": "Identifier",
                                                                                "name": "y"
                                                                            },
                                                                            "operator": "++",
                                                                            "prefix": false
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "FunctionDeclaration",
                                                                    "params": [],
                                                                    "body": {
                                                                        "type": "BlockStatement",
                                                                        "body": []
                                                                    },
                                                                    "async": false,
                                                                    "generator": false,
                                                                    "expression": false,
                                                                    "id": {
                                                                        "type": "Identifier",
                                                                        "name": "IN_DO_FUNC"
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        "test": {
                                                            "type": "Literal",
                                                            "value": 0
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "LabeledStatement",
                                                    "label": {
                                                        "type": "Identifier",
                                                        "name": "LABEL_ANOTHER_LOOP"
                                                    },
                                                    "body": {
                                                        "type": "DoWhileStatement",
                                                        "body": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "EmptyStatement"
                                                                }
                                                            ]
                                                        },
                                                        "test": {
                                                            "type": "Literal",
                                                            "value": 0
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "FunctionDeclaration",
                                                    "params": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": []
                                                    },
                                                    "async": false,
                                                    "generator": false,
                                                    "expression": false,
                                                    "id": {
                                                        "type": "Identifier",
                                                        "name": "OUT_FUNC"
                                                    }
                                                }
                                            ]
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": null
                                    },
                                    "arguments": []
                                }
                            }
                        ]
                    }
            });

  });

});
