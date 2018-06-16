import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';

describe('Statements - Continue', () => {

  describe('Failure', () => {

        fail(`continue`, Context.Empty, {
            source: `continue`,
        });

        fail(`while ( foo ) Label: continue Label;`, Context.Empty, {
          source: `while ( foo ) Label: continue Label;`,
        });

        fail(`do {  test262: {  continue test262; } } while (a)`, Context.Empty, {
          source: `do {  test262: {  continue test262; } } while (a)`,
        });

        fail(`ice: while(a) { continue fapper; }`, Context.Empty, {
          source: `ice: while(a) { continue fapper; }`,
        });

        fail(`loop1: while (a) { loop2: function a() { continue loop2; } }`, Context.Empty, {
          source: `loop1: while (a) { loop2: function a() { continue loop2; } }`,
        });

        fail(`loop1: while (a) { loop1: function a() { continue loop1; } }`, Context.Empty, {
          source: `loop1: while (a) { loop1: function a() { continue loop1; } }`,
        });

        fail(`try{ LABEL1 : do { throw foo;  } while(0); } catch(e){ continue LABEL2; LABEL2 : do {} while(0); };`, Context.Empty, {
          source: `try{ LABEL1 : do { throw foo;  } while(0); } catch(e){ continue LABEL2; LABEL2 : do {} while(0); };`,
        });

      });

      describe('pass', () => {


        pass(`done: while (true) { break done; }`, Context.Empty, {
            source: `done: while (true) { break done; }`,
            expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [
                  {
                      "type": "LabeledStatement",
                      "label": {
                          "type": "Identifier",
                          "name": "done"
                      },
                      "body": {
                          "type": "WhileStatement",
                          "test": {
                              "type": "Literal",
                              "value": true
                          },
                          "body": {
                              "type": "BlockStatement",
                              "body": [
                                  {
                                      "type": "BreakStatement",
                                      "label": {
                                          "type": "Identifier",
                                          "name": "done"
                                      }
                                  }
                              ]
                          }
                      }
                  }
              ]
          }
          });

          pass(`__proto__: while (true) { break __proto__; }`, Context.Empty, {
            source: `__proto__: while (true) { break __proto__; }`,
            expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [
                  {
                      "type": "LabeledStatement",
                      "label": {
                          "type": "Identifier",
                          "name": "__proto__"
                      },
                      "body": {
                          "type": "WhileStatement",
                          "test": {
                              "type": "Literal",
                              "value": true
                          },
                          "body": {
                              "type": "BlockStatement",
                              "body": [
                                  {
                                      "type": "BreakStatement",
                                      "label": {
                                          "type": "Identifier",
                                          "name": "__proto__"
                                      }
                                  }
                              ]
                          }
                      }
                  }
              ]
          }
          });

          pass(`done: while (true) { break done }`, Context.Empty, {
            source: `done: while (true) { break done }`,
            expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [
                  {
                      "type": "LabeledStatement",
                      "label": {
                          "type": "Identifier",
                          "name": "done"
                      },
                      "body": {
                          "type": "WhileStatement",
                          "test": {
                              "type": "Literal",
                              "value": true
                          },
                          "body": {
                              "type": "BlockStatement",
                              "body": [
                                  {
                                      "type": "BreakStatement",
                                      "label": {
                                          "type": "Identifier",
                                          "name": "done"
                                      }
                                  }
                              ]
                          }
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
                break LABEL_DO_LOOP;
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
                    break LABEL_DO_LOOP;
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
                                                                              "name": "LABEL_DO_LOOP"
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


        pass(`var count = 0;
        label: for (let x = 0; x < 10;) {
          while (a) {
            x++;
            count++;
            continue label;
          }
        }`, Context.Empty, {
            source: `var count = 0;
            label: for (let x = 0; x < 10;) {
              while (a) {
                x++;
                count++;
                continue label;
              }
            }`,
            expected: {
                "type": "Program",
                "sourceType": "script",
                "body": [
                    {
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
                                    "name": "count"
                                }
                            }
                        ]
                    },
                    {
                        "type": "LabeledStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "label"
                        },
                        "body": {
                            "type": "ForStatement",
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "WhileStatement",
                                        "test": {
                                            "type": "Identifier",
                                            "name": "a"
                                        },
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
                                                        "type": "UpdateExpression",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "count"
                                                        },
                                                        "operator": "++",
                                                        "prefix": false
                                                    }
                                                },
                                                {
                                                    "type": "ContinueStatement",
                                                    "label": {
                                                        "type": "Identifier",
                                                        "name": "label"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            "init": {
                                "type": "VariableDeclaration",
                                "kind": "let",
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
                                    }
                                ]
                            },
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
                                "operator": "<"
                            },
                            "update": null
                        }
                    }
                ]
            }
        });
      });
});
