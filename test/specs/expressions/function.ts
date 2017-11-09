import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Function', () => {

      it('should fail if parameter contain super call', () => {
          expect(() => {
              parseScript(`0, function(x = super()) {};`)
          }).to.throw('');
      });

      it('should fail if function body contain super call', () => {
          expect(() => {
              parseScript(`0, function() {
          super.x;
        };`)
          }).to.throw('');
      });

      it('should fail on "function foo() { eval = 42; };"', () => {
          expect(() => {
              parseScript(`"use strict"; function foo() { eval = 42; };`)
          }).to.throw('');
      });
      it('should fail on "function arguments() { };"', () => {
          expect(() => {
              parseScript(`"use strict"; function arguments() { };`)
          }).to.throw('');
      });

      it('should fail on ""use strict"; var foofunction (arguments) { };"', () => {
          expect(() => {
              parseScript(`"use strict"; var foofunction (arguments) { };`)
          }).to.throw('');
      });

      it('should fail on "(function((a)){})"', () => {
          expect(() => {
              parseScript(`(function((a)){})`)
          }).to.throw('');
      });
  
      it('should fail on "(function(...a, b){})"', () => {
          expect(() => {
              parseScript(`(function(...a, b){})`)
          }).to.throw();
      });
  
      it('should fail on "(function((a)){})"', () => {
          expect(() => {
              parseScript(`(function((a)){})`)
          }).to.throw('');
      });
  

      it('should fail on "(function((a)){})"', () => {
        expect(() => {
            parseScript(`(function((a)){})`)
        }).to.throw('');
    });

    it('should fail on "(function((a)){})"', () => {
      expect(() => {
          parseScript(`(function((a)){})`)
      }).to.throw('');
  });


  it('should fail on "(function((a)){})"', () => {
    expect(() => {
        parseScript(`(function(a){ let a; })`)
    }).to.throw('');
});


  it('should fail on "use strict; (function({a: x}, {b: x}){})"', () => {
    expect(() => {
        parseScript(`'use strict'; (function({a: x}, {b: x}){})`)
    }).to.throw('');
});

it('should fail on "(function(...a, b){})"', () => {
  expect(() => {
      parseScript(`(function(...a, b){})`)
  }).to.throw('');
});

      it('should parse "(function(){})"', () => {
          expect(parseScript(`(function(){})`, {
              ranges: true
          })).to.eql({
              "body": [{
                  "end": 14,
                  "expression": {
                      "body": {
                          "body": [],
                          "end": 13,
                          "start": 11,
                          "type": "BlockStatement"
                      },
                      "end": 13,
                      "expression": false,
                      "generator": false,
                      "async": false,
                      "id": null,
                      "params": [],
                      "start": 1,
                      "type": "FunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 14,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse "(function eval() { });"', () => {
          expect(parseScript(`(function eval() { });`, {})).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "FunctionExpression",
                      "id": {
                          "type": "Identifier",
                          "name": "eval"
                      },
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "body": []
                      },
                      "generator": false,
                      "expression": false,
                      "async": false
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "(function x(y, z) { })"', () => {
          expect(parseScript(`(function x(y, z) { })`, {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 22,
                  "expression": {
                      "body": {
                          "body": [],
                          "end": 21,
                          "start": 18,
                          "type": "BlockStatement"
                      },
                      "end": 21,
                      "expression": false,
                      "generator": false,
                      "async": false,
                      "id": {
                          "end": 11,
                          "name": "x",
                          "start": 10,
                          "type": "Identifier"
                      },
                      "params": [{
                              "end": 13,
                              "name": "y",
                              "start": 12,
                              "type": "Identifier"
                          },
                          {
                              "end": 16,
                              "name": "z",
                              "start": 15,
                              "type": "Identifier"
                          }
                      ],
                      "start": 1,
                      "type": "FunctionExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
              }],
              "end": 22,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse "(function(a = b){})"', () => {
          expect(parseScript(`(function(a = b){})`, {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "end": 19,
                  "expression": {
                      "async": false,
                      "body": {
                          "body": [],
                          "end": 18,
                          "start": 16,
                          "type": "BlockStatement"
                      },
                      "end": 18,
                      "expression": false,
                      "generator": false,
                      "id": null,
                      "params": [{
                          "end": 15,
                          "left": {
                              "end": 11,
                              "name": "a",
                              "start": 10,
                              "type": "Identifier"
                          },
                          "right": {
                              "end": 15,
                              "name": "b",
                              "start": 14,
                              "type": "Identifier"
                          },
                          "start": 10,
                          "type": "AssignmentPattern"
                      }],
                      "start": 1,
                      "type": "FunctionExpression"
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
  
      it('should parse "(function({a: x, a: y}){})"', () => {
          expect(parseScript(`(function({a: x, a: y}){})`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 26,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 26
                  }
              },
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 26,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 26
                      }
                  },
                  "expression": {
                      "type": "FunctionExpression",
                      "start": 1,
                      "end": 25,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 25
                          }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [{
                          "type": "ObjectPattern",
                          "start": 10,
                          "end": 22,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 1,
                                  "column": 22
                              }
                          },
                          "properties": [{
                                  "type": "Property",
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
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                      "type": "Identifier",
                                      "start": 11,
                                      "end": 12,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 11
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 12
                                          }
                                      },
                                      "name": "a"
                                  },
                                  "value": {
                                      "type": "Identifier",
                                      "start": 14,
                                      "end": 15,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 14
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 15
                                          }
                                      },
                                      "name": "x"
                                  },
                                  "kind": "init"
                              },
                              {
                                  "type": "Property",
                                  "start": 17,
                                  "end": 21,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 21
                                      }
                                  },
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                      "type": "Identifier",
                                      "start": 17,
                                      "end": 18,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 17
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 18
                                          }
                                      },
                                      "name": "a"
                                  },
                                  "value": {
                                      "type": "Identifier",
                                      "start": 20,
                                      "end": 21,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 20
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 21
                                          }
                                      },
                                      "name": "y"
                                  },
                                  "kind": "init"
                              }
                          ]
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 23,
                          "end": 25,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 23
                              },
                              "end": {
                                  "line": 1,
                                  "column": 25
                              }
                          },
                          "body": []
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "(function({a = 0}){})"', () => {
          expect(parseScript(`(function({a = 0}){})`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 21,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 21
                  }
              },
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 21,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 21
                      }
                  },
                  "expression": {
                      "type": "FunctionExpression",
                      "start": 1,
                      "end": 20,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
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
                      "params": [{
                          "type": "ObjectPattern",
                          "start": 10,
                          "end": 17,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 1,
                                  "column": 17
                              }
                          },
                          "properties": [{
                              "type": "Property",
                              "start": 11,
                              "end": 16,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 11
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 16
                                  }
                              },
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                  "type": "Identifier",
                                  "start": 11,
                                  "end": 12,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 11
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 12
                                      }
                                  },
                                  "name": "a"
                              },
                              "kind": "init",
                              "value": {
                                  "type": "AssignmentPattern",
                                  "start": 11,
                                  "end": 16,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 11
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 16
                                      }
                                  },
                                  "left": {
                                      "type": "Identifier",
                                      "start": 11,
                                      "end": 12,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 11
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 12
                                          }
                                      },
                                      "name": "a"
                                  },
                                  "right": {
                                      "type": "Literal",
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
                                      "value": 0,
                                      "raw": "0"
                                  }
                              }
                          }]
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 18,
                          "end": 20,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 20
                              }
                          },
                          "body": []
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "label: !function(){ label:; };"', () => {
          expect(parseScript(`label: !function(){ label:; };`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 30,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 30
                  }
              },
              "body": [{
                  "type": "LabeledStatement",
                  "start": 0,
                  "end": 30,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 30
                      }
                  },
                  "body": {
                      "type": "ExpressionStatement",
                      "start": 7,
                      "end": 30,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 7
                          },
                          "end": {
                              "line": 1,
                              "column": 30
                          }
                      },
                      "expression": {
                          "type": "UnaryExpression",
                          "start": 7,
                          "end": 29,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 7
                              },
                              "end": {
                                  "line": 1,
                                  "column": 29
                              }
                          },
                          "operator": "!",
                          "prefix": true,
                          "argument": {
                              "type": "FunctionExpression",
                              "start": 8,
                              "end": 29,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 8
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 29
                                  }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
                                  "start": 18,
                                  "end": 29,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 18
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 29
                                      }
                                  },
                                  "body": [{
                                      "type": "LabeledStatement",
                                      "start": 20,
                                      "end": 27,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 20
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 27
                                          }
                                      },
                                      "body": {
                                          "type": "EmptyStatement",
                                          "start": 26,
                                          "end": 27,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 26
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 27
                                              }
                                          }
                                      },
                                      "label": {
                                          "type": "Identifier",
                                          "start": 20,
                                          "end": 25,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 20
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 25
                                              }
                                          },
                                          "name": "label"
                                      }
                                  }]
                              }
                          }
                      }
                  },
                  "label": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 5,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 5
                          }
                      },
                      "name": "label"
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function* g(){ (function yield(){}); }"', () => {
          expect(parseScript(`function* g(){ (function yield(){}); }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 38,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 38
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 38,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 38
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 10,
                      "end": 11,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 10
                          },
                          "end": {
                              "line": 1,
                              "column": 11
                          }
                      },
                      "name": "g"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 38,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 38
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 15,
                          "end": 36,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 36
                              }
                          },
                          "expression": {
                              "type": "FunctionExpression",
                              "start": 16,
                              "end": 34,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 16
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 34
                                  }
                              },
                              "id": {
                                  "type": "Identifier",
                                  "start": 25,
                                  "end": 30,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 25
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 30
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
                                  "start": 32,
                                  "end": 34,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 32
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 34
                                      }
                                  },
                                  "body": []
                              }
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "(function({a}){})"', () => {
          expect(parseScript(`(function({a}){})`, {
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
              "body": [{
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
                      "type": "FunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [{
                          "type": "ObjectPattern",
                          "start": 10,
                          "end": 13,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 1,
                                  "column": 13
                              }
                          },
                          "properties": [{
                              "type": "Property",
                              "start": 11,
                              "end": 12,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 11
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 12
                                  }
                              },
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                  "type": "Identifier",
                                  "start": 11,
                                  "end": 12,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 11
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 12
                                      }
                                  },
                                  "name": "a"
                              },
                              "kind": "init",
                              "value": {
                                  "type": "Identifier",
                                  "start": 11,
                                  "end": 12,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 11
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 12
                                      }
                                  },
                                  "name": "a"
                              }
                          }]
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 14,
                          "end": 16,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 16
                              }
                          },
                          "body": []
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "(function(...a){})"', () => {
          expect(parseScript(`(function(...a){})`, {
            ranges: true,
            locations: true,
            raw: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 18,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 18
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "RestElement",
                      "start": 10,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 13,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "name": "a"
                      }
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 15,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse "(function(a, ...b){})"', () => {
          expect(parseScript(`(function(a, ...b){})`, {
            ranges: true,
            locations: true,
            raw: true
          })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "params": [
                            {
                                "type": "Identifier",
                                "name": "a",
                                "start": 10,
                                "end": 11,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 11
                                    }
                                }
                            },
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "b",
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
                                    }
                                },
                                "start": 13,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                }
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 18,
                            "end": 20,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 20
                                }
                            }
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": null,
                        "start": 1,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        }
                    },
                    "start": 0,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 21,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 21
                }
            }
        });
      });
  
      it('should parse "(function([a]){})"', () => {
          expect(parseScript(`(function([a]){})`, {
              ranges: true,
              locations: true,
              raw: true
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
              "body": [{
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
                      "type": "FunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [{
                          "type": "ArrayPattern",
                          "start": 10,
                          "end": 13,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 1,
                                  "column": 13
                              }
                          },
                          "elements": [{
                              "type": "Identifier",
                              "start": 11,
                              "end": 12,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 11
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 12
                                  }
                              },
                              "name": "a"
                          }]
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 14,
                          "end": 16,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 16
                              }
                          },
                          "body": []
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "(function([]){})"', () => {
          expect(parseScript(`(function([]){})`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 16,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 16
                  }
              },
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 16,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 16
                      }
                  },
                  "expression": {
                      "type": "FunctionExpression",
                      "start": 1,
                      "end": 15,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 15
                          }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [{
                          "type": "ArrayPattern",
                          "start": 10,
                          "end": 12,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 1,
                                  "column": 12
                              }
                          },
                          "elements": []
                      }],
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
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "(function*(){ (function yield(){}); })"', () => {
          expect(parseScript(`(function*(){ (function yield(){}); })`, {
            locations: true,
            raw: true,
            ranges: true
          })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "FunctionExpression",
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [],
                                            "start": 31,
                                            "end": 33,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 31
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 33
                                                }
                                            }
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": {
                                            "type": "Identifier",
                                            "name": "yield",
                                            "start": 24,
                                            "end": 29,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 24
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 29
                                                }
                                            }
                                        },
                                        "start": 15,
                                        "end": 33,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 33
                                            }
                                        }
                                    },
                                    "start": 14,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 35
                                        }
                                    }
                                }
                            ],
                            "start": 12,
                            "end": 37,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 37
                                }
                            }
                        },
                        "async": false,
                        "generator": true,
                        "expression": false,
                        "id": null,
                        "start": 1,
                        "end": 37,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 37
                            }
                        }
                    },
                    "start": 0,
                    "end": 38,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 38
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 38,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 38
                }
            }
        });
      });
  
      it('should parse function expression + export in module code', () => {
          expect(parseModule(`a = function() {}
          export { a };`, {
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
                "line": 2,
                "column": 23
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
                  "type": "AssignmentExpression",
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
                    "type": "FunctionExpression",
                    "start": 4,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 15,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "body": []
                    }
                  }
                }
              },
              {
                "type": "ExportNamedDeclaration",
                "start": 28,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 10
                  },
                  "end": {
                    "line": 2,
                    "column": 23
                  }
                },
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 37,
                    "end": 38,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 19
                      },
                      "end": {
                        "line": 2,
                        "column": 20
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 37,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 19
                        },
                        "end": {
                          "line": 2,
                          "column": 20
                        }
                      },
                      "name": "a"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 37,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 19
                        },
                        "end": {
                          "line": 2,
                          "column": 20
                        }
                      },
                      "name": "a"
                    }
                  }
                ],
                "source": null
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse lone rest element', () => {
        expect(parseScript(`(function([...x] = values) {})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 30,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 30
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 30,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 30
                }
              },
              "expression": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 29
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 10,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "left": {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "elements": [
                        {
                          "type": "RestElement",
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
                          "argument": {
                            "type": "Identifier",
                            "start": 14,
                            "end": 15,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 14
                              },
                              "end": {
                                "line": 1,
                                "column": 15
                              }
                            },
                            "name": "x"
                          }
                        }
                      ]
                    },
                    "right": {
                      "type": "Identifier",
                      "start": 19,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 19
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "name": "values"
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 27,
                  "end": 29,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 27
                    },
                    "end": {
                      "line": 1,
                      "column": 29
                    }
                  },
                  "body": []
                }
              }
            }
          ],
          "sourceType": "script"
        });
      });

      it('should parse with elision', () => {
        expect(parseScript(`(function([,] = g()) {})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 24,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 24
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 24,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 24
                }
              },
              "expression": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 10,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "left": {
                      "type": "ArrayPattern",
                      "start": 10,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "elements": [
                        null
                      ]
                    },
                    "right": {
                      "type": "CallExpression",
                      "start": 16,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 19
                        }
                      },
                      "callee": {
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
                      "arguments": []
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 21,
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 21
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "body": []
                }
              }
            }
          ],
          "sourceType": "script"
        });
      });

      it('should parse trailing comma after binding property list', () => {
        expect(parseScript(`(function({ x, }) {})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 21,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 21
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 21,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 21
                }
              },
              "expression": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
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
                "params": [
                  {
                    "type": "ObjectPattern",
                    "start": 10,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 12,
                        "end": 13,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 13
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          },
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          },
                          "name": "x"
                        }
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 18,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
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
          ],
          "sourceType": "script"
        });
      });

      it('should parse object binding pattern with "nested" array binding pattern', () => {
        expect(parseScript(`(function({ w: [x, y, z] = [4, 5, 6] }) {})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 43,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 43
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 43,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 43
                }
              },
              "expression": {
                "type": "FunctionExpression",
                "start": 1,
                "end": 42,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 42
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ObjectPattern",
                    "start": 10,
                    "end": 38,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 38
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 12,
                        "end": 36,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 36
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          },
                          "name": "w"
                        },
                        "value": {
                          "type": "AssignmentPattern",
                          "start": 15,
                          "end": 36,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 36
                            }
                          },
                          "left": {
                            "type": "ArrayPattern",
                            "start": 15,
                            "end": 24,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 24
                              }
                            },
                            "elements": [
                              {
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
                                "name": "x"
                              },
                              {
                                "type": "Identifier",
                                "start": 19,
                                "end": 20,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 19
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 20
                                  }
                                },
                                "name": "y"
                              },
                              {
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 22
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 23
                                  }
                                },
                                "name": "z"
                              }
                            ]
                          },
                          "right": {
                            "type": "ArrayExpression",
                            "start": 27,
                            "end": 36,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 27
                              },
                              "end": {
                                "line": 1,
                                "column": 36
                              }
                            },
                            "elements": [
                              {
                                "type": "Literal",
                                "start": 28,
                                "end": 29,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 28
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 29
                                  }
                                },
                                "value": 4,
                                "raw": "4"
                              },
                              {
                                "type": "Literal",
                                "start": 31,
                                "end": 32,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 31
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 32
                                  }
                                },
                                "value": 5,
                                "raw": "5"
                              },
                              {
                                "type": "Literal",
                                "start": 34,
                                "end": 35,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 34
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 35
                                  }
                                },
                                "value": 6,
                                "raw": "6"
                              }
                            ]
                          }
                        },
                        "kind": "init"
                      }
                    ]
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 40,
                  "end": 42,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 40
                    },
                    "end": {
                      "line": 1,
                      "column": 42
                    }
                  },
                  "body": []
                }
              }
            }
          ],
          "sourceType": "script"
        });
      });

      it('should parse object binding pattern with nested object binding pattern', () => {
          expect(parseScript(`(function({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {})`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 56,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 56
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 56,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 56
                  }
                },
                "expression": {
                  "type": "FunctionExpression",
                  "start": 1,
                  "end": 55,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 55
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 10,
                      "end": 51,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 51
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 12,
                          "end": 49,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 49
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 12,
                            "end": 13,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 12
                              },
                              "end": {
                                "line": 1,
                                "column": 13
                              }
                            },
                            "name": "w"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 15,
                            "end": 49,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 49
                              }
                            },
                            "left": {
                              "type": "ObjectPattern",
                              "start": 15,
                              "end": 26,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 15
                                },
                                "end": {
                                  "line": 1,
                                  "column": 26
                                }
                              },
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 17,
                                  "end": 18,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 17
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 18
                                    }
                                  },
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 17,
                                    "end": 18,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 17
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 18
                                      }
                                    },
                                    "name": "x"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "start": 17,
                                    "end": 18,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 17
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 18
                                      }
                                    },
                                    "name": "x"
                                  }
                                },
                                {
                                  "type": "Property",
                                  "start": 20,
                                  "end": 21,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 20
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 21
                                    }
                                  },
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 20,
                                    "end": 21,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 20
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 21
                                      }
                                    },
                                    "name": "y"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "start": 20,
                                    "end": 21,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 20
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 21
                                      }
                                    },
                                    "name": "y"
                                  }
                                },
                                {
                                  "type": "Property",
                                  "start": 23,
                                  "end": 24,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 23
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 24
                                    }
                                  },
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 23,
                                    "end": 24,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 23
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 24
                                      }
                                    },
                                    "name": "z"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "start": 23,
                                    "end": 24,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 23
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 24
                                      }
                                    },
                                    "name": "z"
                                  }
                                }
                              ]
                            },
                            "right": {
                              "type": "ObjectExpression",
                              "start": 29,
                              "end": 49,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 29
                                },
                                "end": {
                                  "line": 1,
                                  "column": 49
                                }
                              },
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 31,
                                  "end": 35,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 31
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 35
                                    }
                                  },
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 31,
                                    "end": 32,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 31
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 32
                                      }
                                    },
                                    "name": "x"
                                  },
                                  "value": {
                                    "type": "Literal",
                                    "start": 34,
                                    "end": 35,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 34
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 35
                                      }
                                    },
                                    "value": 4,
                                    "raw": "4"
                                  },
                                  "kind": "init"
                                },
                                {
                                  "type": "Property",
                                  "start": 37,
                                  "end": 41,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 37
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 41
                                    }
                                  },
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 37,
                                    "end": 38,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 37
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 38
                                      }
                                    },
                                    "name": "y"
                                  },
                                  "value": {
                                    "type": "Literal",
                                    "start": 40,
                                    "end": 41,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 40
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 41
                                      }
                                    },
                                    "value": 5,
                                    "raw": "5"
                                  },
                                  "kind": "init"
                                },
                                {
                                  "type": "Property",
                                  "start": 43,
                                  "end": 47,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 43
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 47
                                    }
                                  },
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 43,
                                    "end": 44,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 43
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 44
                                      }
                                    },
                                    "name": "z"
                                  },
                                  "value": {
                                    "type": "Literal",
                                    "start": 46,
                                    "end": 47,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 46
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 47
                                      }
                                    },
                                    "value": 6,
                                    "raw": "6"
                                  },
                                  "kind": "init"
                                }
                              ]
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 53,
                    "end": 55,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 53
                      },
                      "end": {
                        "line": 1,
                        "column": 55
                      }
                    },
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
      });


    it('should parse "(function({a}){})"', () => {
      expect(parseScript(`(function({a}){})`, {
        raw: true,
        locations: true,
        ranges: true
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
              "type": "FunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "ObjectPattern",
                  "start": 10,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 10
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 11,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 12
                          }
                        },
                        "name": "a"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 11,
                        "end": 12,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 11
                          },
                          "end": {
                            "line": 1,
                            "column": 12
                          }
                        },
                        "name": "a"
                      }
                    }
                  ]
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 14,
                "end": 16,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 14
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                },
                "body": []
              }
            }
          }
        ],
        "sourceType": "script"
      });
  });


  it('should parse "(function({a: x, a: y}){})"', () => {
    expect(parseScript(`(function({a: x, a: y}){})`, {
        raw: true,
        locations: true,
        ranges: true
    })).to.eql({
      "type": "Program",
      "start": 0,
      "end": 26,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 26
        }
      },
      "body": [
        {
          "type": "ExpressionStatement",
          "start": 0,
          "end": 26,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 26
            }
          },
          "expression": {
            "type": "FunctionExpression",
            "start": 1,
            "end": 25,
            "loc": {
              "start": {
                "line": 1,
                "column": 1
              },
              "end": {
                "line": 1,
                "column": 25
              }
            },
            "id": null,
            "generator": false,
            "expression": false,
            "async": false,
            "params": [
              {
                "type": "ObjectPattern",
                "start": 10,
                "end": 22,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 10
                  },
                  "end": {
                    "line": 1,
                    "column": 22
                  }
                },
                "properties": [
                  {
                    "type": "Property",
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
                    "method": false,
                    "shorthand": false,
                    "computed": false,
                    "key": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "name": "a"
                    },
                    "value": {
                      "type": "Identifier",
                      "start": 14,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "name": "x"
                    },
                    "kind": "init"
                  },
                  {
                    "type": "Property",
                    "start": 17,
                    "end": 21,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 21
                      }
                    },
                    "method": false,
                    "shorthand": false,
                    "computed": false,
                    "key": {
                      "type": "Identifier",
                      "start": 17,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "name": "a"
                    },
                    "value": {
                      "type": "Identifier",
                      "start": 20,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "name": "y"
                    },
                    "kind": "init"
                  }
                ]
              }
            ],
            "body": {
              "type": "BlockStatement",
              "start": 23,
              "end": 25,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 23
                },
                "end": {
                  "line": 1,
                  "column": 25
                }
              },
              "body": []
            }
          }
        }
      ],
      "sourceType": "script"
    });
});


it('should parse "(function({a = 0}){})"', () => {
  expect(parseScript(`(function({a = 0}){})`, {
    raw: true,
    locations: true,
    ranges: true
  })).to.eql({
    "type": "Program",
    "start": 0,
    "end": 21,
    "loc": {
      "start": {
        "line": 1,
        "column": 0
      },
      "end": {
        "line": 1,
        "column": 21
      }
    },
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 21,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 21
          }
        },
        "expression": {
          "type": "FunctionExpression",
          "start": 1,
          "end": 20,
          "loc": {
            "start": {
              "line": 1,
              "column": 1
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
          "params": [
            {
              "type": "ObjectPattern",
              "start": 10,
              "end": 17,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 10
                },
                "end": {
                  "line": 1,
                  "column": 17
                }
              },
              "properties": [
                {
                  "type": "Property",
                  "start": 11,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 11
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "method": false,
                  "shorthand": true,
                  "computed": false,
                  "key": {
                    "type": "Identifier",
                    "start": 11,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "name": "a"
                  },
                  "kind": "init",
                  "value": {
                    "type": "AssignmentPattern",
                    "start": 11,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "left": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "name": "a"
                    },
                    "right": {
                      "type": "Literal",
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
                      "value": 0,
                      "raw": "0"
                    }
                  }
                }
              ]
            }
          ],
          "body": {
            "type": "BlockStatement",
            "start": 18,
            "end": 20,
            "loc": {
              "start": {
                "line": 1,
                "column": 18
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
    ],
    "sourceType": "script"
  });
});

  });