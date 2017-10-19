import { parse, parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Module - Export', () => {
   

  it('should fail on early export global', () => {
      expect(() => {
        parseModule(`export { Number };`);
    }).to.not.throw();

    });

    it('should fail on export unresolveable', () => {
      expect(() => {
        parseModule(`export { unresolvable };`);
    }).to.not.throw();

    });

    it('should fail if statement contain an `export` declaration', () => {
      expect(() => {
        parseModule(`class C { static method() { export default null; } }`);
    }).to.throw();

    });

    it('should fail on "export {} null;"', () => {
      expect(() => {
          parseModule(`export {} null;`);
      }).to.throw();
  });

    it('should fail ifdefault export is a LexicalDeclaration (let)', () => {
      expect(() => {
        parseModule(`export default let x;`);
    }).to.throw();

    });
    
    it('should fail if the ExportedNames of ModuleItemList contains any duplicate entries.', () => {
      expect(() => {
        parseModule(`export default var x = null;
        export default var x = null;`);
    }).to.throw();

    });

    it('should fail if the ExportedNames of ModuleItemList contains any duplicate entries.', () => {
      expect(() => {
        parseModule(`label: {
          label: 0;
        }`);
    }).to.throw();

    });

    it('should fail on early export global', () => {
      expect(() => {
        parseModule(`export { x, x };`);
      }).to.not.throw();

    });

    it('should fail on "export * from 123;"', () => {
      expect(() => {
        parseModule(`export * from 123;`);
    }).to.throw();
  });

    it('should fail if trying to export inside a function decl', () => {
      expect(() => {
        parseModule(`function() { export * from 123; }`);
      }).to.throw();
    });

    it('should fail on standalone exported default', () => {
      expect(() => {
        parseModule(`export { default }`);
      }).to.throw();
    });

    it('should fail on unexpected export of keyword as foo', () => {
      expect(() => {
        parseModule(`export { if as foo }`);
      }).to.throw();
    });

    it('should fail on unexpected export of keyword', () => {
      expect(() => {
        parseModule(`export { if }`);
      }).to.throw();
    });

    it('should fail on duplicates', () => {
        expect(() => {
          parseModule(`var x; export { x }; export { x };`);
      }).to.not.throw();
    });

    it('should fail on export of let as identifier', () => {
      expect(() => {
          parseModule(`export let`);
      }).to.throw();
    });

    it('should fail on export of let as identifier', () => {
      expect(() => {
          parseModule(`export let`);
      }).to.throw();
    });

    it('should fail on export of const as identifier', () => {
      expect(() => {
          parseModule(`export const`);
      }).to.throw();
    });

    it('should fail on export of duplicate lexical binding (let)', () => {
      expect(() => {
          parseModule(`export let a, a`);
      }).to.throw();
    });

    it('should fail on export of duplicate lexical binding (const)', () => {
      expect(() => {
          parseModule(`export const a = 2;
          export const a = 2;`);
      }).to.throw();
    });

    it('should fail on export of anonymous class', () => {
      expect(() => {
          parseModule(`export class {}`);
      }).to.throw();
  });

    it('should fail on export default of duplicate function', () => {
      expect(() => {
        parseModule(`export default function a() {}
        export default function a() {}`);
    }).to.throw();
    });

    it('should fail on export default of duplicate class', () => {
      expect(() => {
          parseModule(`export default class a{}  export default class a{} `);
      }).to.throw();
    });

    it('should fail on export of duplicate function', () => {
      expect(() => {
          parseModule(`export function a() {}
          export function a() {}`);
      }).to.throw();
  });

    it('should fail on export reserved word', () => {
      expect(() => {
          parse(`"export var await`, { sourceType: 'module'});
      }).to.throw();
    });

    it('should fail on export of keyword', () => {
      expect(() => {
          parse(`export { if }`, { sourceType: 'module'});
        }).to.throw();
    });

    it('should fail on export on default', () => {
      expect(() => {
          parse(`export { default as foo }`, { sourceType: 'module'});
      }).to.throw();
    });

    it('should fail on export keyword as', () => {
      expect(() => {
          parse(`export { if as foo }`, { sourceType: 'module'});
        }).to.throw();
    });

    it('should fail on export keyword as', () => {
      expect(() => {
        parse(`import { class, var } "bar"`, { sourceType: 'module'});
      }).to.throw();
    });

    it('should fail on export keyword as', () => {
      expect(() => {
        parse(`import * as class from "bar"`, { sourceType: 'module'});
      }).to.throw();
    });

    it('should fail on export keyword as', () => {
      expect(() => {
          parse(`import * as enum from "bar"`, { sourceType: 'module'});
      }).to.throw();
    });

    it('should fail on export of duplicate function', () => {
      expect(() => {
          parseModule(`export async function a() {}
          export async  function a() {}`);
      }).to.throw();
  });

    it('should fail on export of duplicate async and non-async function', () => {
      expect(() => {
      parseModule(`export async function a() {}
      export function a() {}`);
    }).to.throw();
  });

    it('should fail on export of duplicate class', () => {
      expect(() => {
          parseModule(`export class a{}  export class a{} `);
      }).to.throw();
    });

    it('should fail on misspelled export default async function decl', () => {
      expect(() => {
          parseModule('export default async func');
      }).to.throw();
    });

    it('should fail on misspelled export async function decl', () => {
      expect(() => {
          parseModule('export async func');
      }).to.throw();
    });

    it('should fail on export of new expression', () => {
      expect(() => {
          parseModule('export new Foo();');
      }).to.throw();
  });

    it('should fail on export of typeOf unary expression', () => {
      expect(() => {
        parseModule('export typeof foo;');
        }).to.throw();
    });

    it('should fail on duplicate named export destructuring', () => {
      expect(() => {
          parseModule(`export const [foo] = bar;
          export function foo() {};`);
      }).to.throw();
    });

    it('should fail on duplicate named export destructuring', () => {
      expect(() => {
          parseModule(`export const [foo] = bar;
          export function foo() {};`);
      }).to.throw();
      });

      it('should fail on "{export default 3;}"', () => {
          expect(() => {
              parseModule(`{export default 3;}`);
          }).to.throw();
      });
  
      it('should fail on "export {with as a}"', () => {
        expect(() => {
            parseModule(`export {with as a}`);
          }).to.throw();
    });

    it('should fail on "{export {a};}"', () => {
          expect(() => {
              parseModule(`{export {a};}`);
          }).to.throw();
      });
  
      it('should fail on "{export default 3;}"', () => {
          expect(() => {
              parseModule(`export let 123`);
          }).to.throw();
      });
  
      it('should fail on "{export default 3;}"', () => {
          expect(() => {
              parseModule(`export {a,b} from a`);
          }).to.throw();
      });
  
      it('should fail on "export / from a"', () => {
          expect(() => {
              parseModule(`export / from a`);
          }).to.throw();
      });
  
      it('should fail on "export 3"', () => {
          expect(() => {
              parseModule(`export 3`);
          }).to.throw();
      });
  
      it('should fail on "export let[a] = 0 export let[b] = 0"', () => {
          expect(() => {
              parseModule(`export let[a] = 0 export let[b] = 0`);
          }).to.throw();
      });
  
      it('should fail on "export default default"', () => {
          expect(() => {
              parseModule(`export default default`);
          }).to.throw();
      });
  
      it('should fail on invalid export batch missing from clause module', () => {
          expect(() => {
              parseModule(`export *`);
          }).to.throw();
      });

      it('should fail on invalid export batch token', () => {
        expect(() => {
            parseModule(`export * +`);
        }).to.throw();
    });
  
      it('should fail expression an `export` declaration', () => {
          expect(() => {
              parseModule(`(class { static *method() { export default null; } });`);
          }).to.throw();
      });
  
      it('should fail if statement contain an `export` declaration', () => {
          expect(() => {
              parseModule(`{ export default null; }`);
          }).to.throw();
      });
  
      it('should fail if statement contain an `export` declaration ( do-while)', () => {
          expect(() => {
              parseModule(`do export default null; while (false)`);
          }).to.throw();
      });

    

      it('should fail if expression contain an `export` declaration', () => {
        expect(() => {
            parseModule(`(class { static method() { export default null; } });`);
        }).to.throw();
    });
  
      it('should fail if statement contain an `export` declaration ( do-while)', () => {
        expect(() => {
            parseModule(`for (let y in [])
            export default null;`);
        }).to.throw();
    });

    it('should fail if expression contain an `export` declaration (arrow)', () => {
      expect(() => {
          parseModule(`() => { export default null; };`);
      }).to.throw();
  });

      it('should fail if statement contain an `export` declaration ( for )', () => {
          expect(() => {
              parseModule(`for (const x = 0; false;) export default null;`);
          }).to.throw();
      });
  
      it('should fail if statement contain an `export` declaration ( switch )', () => {
          expect(() => {
              parseModule(`switch(0) { case 1: export default null; default: }`);
          }).to.throw();
      });
  
      it('should fail if statement contain an `export` declaration ( if )', () => {
          expect(() => {
              parseModule(`if (false) export default null;`);
          }).to.throw();
      });
      it('should fail if expressen  contain an `export` declaration ( object literal )', () => {
          expect(() => {
              parseModule(`({ get m() { export default null; } });`);
          }).to.throw();
      });
  
      it('should fail on invalid export default token module', () => {
          expect(() => {
              parseModule(`export {default} +`);
          }).to.throw();
      });

      it('should fail on invalid export default module', () => {
        expect(() => {
            parseModule(`export {default}`);
        }).to.throw();
    });
  
      it('should fail on invalid export module', () => {
          expect(() => {
              parseModule(`export default from "foo"`);
          }).to.throw();
      });
  
      it('should fail on invalid export default equal module', () => {
          expect(() => {
              parseModule(`export default = 42`);
          }).to.throw();
      });

      it('should export variable and export', () => {
        expect(parseModule(`var x = null;
        export { x as default };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 46,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 2,
              "column": 32
            }
          },
          "body": [
            {
              "type": "VariableDeclaration",
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
              "declarations": [
                {
                  "type": "VariableDeclarator",
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
                  "id": {
                    "type": "Identifier",
                    "start": 4,
                    "end": 5,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 5
                      }
                    },
                    "name": "x"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 8,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "value": null,
                    "raw": "null"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 22,
              "end": 46,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 8
                },
                "end": {
                  "line": 2,
                  "column": 32
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 31,
                  "end": 43,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 17
                    },
                    "end": {
                      "line": 2,
                      "column": 29
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 31,
                    "end": 32,
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
                    "name": "x"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 36,
                    "end": 43,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 22
                      },
                      "end": {
                        "line": 2,
                        "column": 29
                      }
                    },
                    "name": "default"
                  }
                }
              ],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export eval', () => {
        expect(parseModule(`export { foo as eval }`, {
            ranges: true,
            raw: true,
            locations: true
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
              "type": "ExportNamedDeclaration",
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
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 9,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "name": "foo"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "name": "eval"
                  }
                }
              ],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export variable', () => {
        expect(parseModule(`export var document`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 19,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 19
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 19,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 19
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 7,
                "end": 19,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 19
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 11,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 19
                        }
                      },
                      "name": "document"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export regular expression', () => {
        expect(parseModule(`export default /foo/`, {
            ranges: true,
            raw: true,
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
              "type": "ExportDefaultDeclaration",
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
              "declaration": {
                "type": "Literal",
                "start": 15,
                "end": 20,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 20
                  }
                },
                "value": /foo/,
                "raw": "/foo/",
                "regex": {
                  "pattern": "foo",
                  "flags": ""
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export lexical (const)', () => {
        expect(parseModule(`export default function foo() {} false`, {
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
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 32,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 32
                }
              },
              "declaration": {
                "type": "FunctionDeclaration",
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
                "id": {
                  "type": "Identifier",
                  "start": 24,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 30,
                  "end": 32,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 30
                    },
                    "end": {
                      "line": 1,
                      "column": 32
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 33,
              "end": 38,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 33
                },
                "end": {
                  "line": 1,
                  "column": 38
                }
              },
              "expression": {
                "type": "Literal",
                "start": 33,
                "end": 38,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 33
                  },
                  "end": {
                    "line": 1,
                    "column": 38
                  }
                },
                "value": false,
                "raw": "false"
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export binding const', () => {
        expect(parseModule(`export const document = { }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 27,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 27
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 27,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 27
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 7,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 13,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "name": "document"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 24,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export lexical (let)', () => {
        expect(parseModule(`export let document = { }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 25,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 25
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 25,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 25
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 7,
                "end": 25,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 25
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 11,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 11
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 11,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 19
                        }
                      },
                      "name": "document"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 22,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 22
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "let"
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export default async function expression', () => {
        expect(parseModule(`export default (async function() { })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 37,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 37
            }
          },
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 37,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 37
                }
              },
              "declaration": {
                "type": "FunctionExpression",
                "start": 16,
                "end": 36,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 16
                  },
                  "end": {
                    "line": 1,
                    "column": 36
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 33,
                  "end": 36,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 33
                    },
                    "end": {
                      "line": 1,
                      "column": 36
                    }
                  },
                  "body": []
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse in` operator within an exported AssignmentExpression', () => {
        expect(parseModule(`export default 'x' in { x: true }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 33,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 33
              }
            },
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 33,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 33
                  }
                },
                "declaration": {
                  "type": "BinaryExpression",
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
                  },
                  "left": {
                    "type": "Literal",
                    "start": 15,
                    "end": 18,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "value": "x",
                    "raw": "'x'"
                  },
                  "operator": "in",
                  "right": {
                    "type": "ObjectExpression",
                    "start": 22,
                    "end": 33,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 22
                      },
                      "end": {
                        "line": 1,
                        "column": 33
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
                        "start": 24,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 24
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 24,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          },
                          "name": "x"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 27,
                          "end": 31,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 31
                            }
                          },
                          "value": true,
                          "raw": "true"
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "module"
          });
      });

      it('should export default async named function', () => {
        expect(parseModule(`export default async function() { }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 35,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 35
            }
          },
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 35,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 35
                }
              },
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 15,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 32,
                  "end": 35,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 32
                    },
                    "end": {
                      "line": 1,
                      "column": 35
                    }
                  },
                  "body": []
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });
      
      it('should export async named function', () => {
        expect(parseModule(`export async function foo() { }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 31,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 31
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 31,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 31
                }
              },
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 7,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 31
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 22,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 22
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 28,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 28
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  },
                  "body": []
                }
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export default class expression', () => {
        expect(parseModule(`export default class Foo {}++x`, {
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
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 27,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 27
                }
              },
              "declaration": {
                "type": "ClassDeclaration",
                "start": 15,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 21,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 21
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  },
                  "name": "Foo"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 25,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 25
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 27,
              "end": 30,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 27
                },
                "end": {
                  "line": 1,
                  "column": 30
                }
              },
              "expression": {
                "type": "UpdateExpression",
                "start": 27,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 27
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "operator": "++",
                "prefix": true,
                "argument": {
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
                  "name": "x"
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export default class expression', () => {
        expect(parseModule(`export default (class{});`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 25,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 25
            }
          },
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 25,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 25
                }
              },
              "declaration": {
                "type": "ClassExpression",
                "start": 16,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 16
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "id": null,
                "superClass": null,
                "body": {
                  "type": "ClassBody",
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
          "sourceType": "module"
        });
      });

      it('should parse an exported function declaration without terminated with a semicolon or newline', () => {
        expect(parseModule(`export function f() {} if (true) { }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 36,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 36
              }
            },
            "body": [
              {
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "FunctionDeclaration",
                  "start": 7,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "id": {
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
                    "name": "f"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 20,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 20
                      },
                      "end": {
                        "line": 1,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                },
                "specifiers": [],
                "source": null
              },
              {
                "type": "IfStatement",
                "start": 23,
                "end": 36,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 23
                  },
                  "end": {
                    "line": 1,
                    "column": 36
                  }
                },
                "test": {
                  "type": "Literal",
                  "start": 27,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 27
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  },
                  "value": true,
                  "raw": "true"
                },
                "consequent": {
                  "type": "BlockStatement",
                  "start": 33,
                  "end": 36,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 33
                    },
                    "end": {
                      "line": 1,
                      "column": 36
                    }
                  },
                  "body": []
                },
                "alternate": null
              }
            ],
            "sourceType": "module"
          });
      });

      it('should export named class declaration', () => {
        expect(parseModule(`export default class cName { valueOf() { return 45; } }`, {
            ranges: true,
            raw: true,
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
                "type": "ExportDefaultDeclaration",
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
                "declaration": {
                  "type": "ClassDeclaration",
                  "start": 15,
                  "end": 55,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 1,
                      "column": 55
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 21,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 21
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "name": "cName"
                  },
                  "superClass": null,
                  "body": {
                    "type": "ClassBody",
                    "start": 27,
                    "end": 55,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 27
                      },
                      "end": {
                        "line": 1,
                        "column": 55
                      }
                    },
                    "body": [
                      {
                        "type": "MethodDefinition",
                        "start": 29,
                        "end": 53,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 29
                          },
                          "end": {
                            "line": 1,
                            "column": 53
                          }
                        },
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 29,
                          "end": 36,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 29
                            },
                            "end": {
                              "line": 1,
                              "column": 36
                            }
                          },
                          "name": "valueOf"
                        },
                        "static": false,
                        "kind": "method",
                        "value": {
                          "type": "FunctionExpression",
                          "start": 36,
                          "end": 53,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 36
                            },
                            "end": {
                              "line": 1,
                              "column": 53
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 39,
                            "end": 53,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 39
                              },
                              "end": {
                                "line": 1,
                                "column": 53
                              }
                            },
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 41,
                                "end": 51,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 41
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 51
                                  }
                                },
                                "argument": {
                                  "type": "Literal",
                                  "start": 48,
                                  "end": 50,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 48
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 50
                                    }
                                  },
                                  "value": 45,
                                  "raw": "45"
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export {};0"', () => {
        expect(parseModule(`export {};0`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 11
              }
            },
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
                  }
                },
                "declaration": null,
                "specifiers": [],
                "source": null
              },
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "Literal",
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
                  "value": 0,
                  "raw": "0"
                }
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export class A{};0"', () => {
        expect(parseModule(`export class A{};0`, {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "ClassDeclaration",
                  "start": 7,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "id": {
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
                    "name": "A"
                  },
                  "superClass": null,
                  "body": {
                    "type": "ClassBody",
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
                },
                "specifiers": [],
                "source": null
              },
              {
                "type": "EmptyStatement",
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
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "Literal",
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
                  "value": 0,
                  "raw": "0"
                }
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export default function* a(){}"', () => {
        expect(parseModule(`export default function* a(){}`, {
            ranges: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 30,
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 30,
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 15,
                "end": 30,
                "id": {
                  "type": "Identifier",
                  "start": 25,
                  "end": 26,
                  "name": "a"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 28,
                  "end": 30,
                  "body": []
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse "export default 3 + 1"', () => {
        expect(parseModule(`export default 3 + 1`, {
            ranges: true,
            raw: true,
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
                "type": "ExportDefaultDeclaration",
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
                "declaration": {
                  "type": "BinaryExpression",
                  "start": 15,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "left": {
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
                    "value": 3,
                    "raw": "3"
                  },
                  "operator": "+",
                  "right": {
                    "type": "Literal",
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
                    "value": 1,
                    "raw": "1"
                  }
                }
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export {a,b,}; var a,b;"', () => {
        expect(parseModule(`export {a,b,}; var a,b;`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 23,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 23
              }
            },
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "a"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  },
                  {
                    "type": "ExportSpecifier",
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
                    "local": {
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
                      "name": "b"
                    },
                    "exported": {
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
                      "name": "b"
                    }
                  }
                ],
                "source": null
              },
              {
                "type": "VariableDeclaration",
                "start": 15,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    "id": {
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
                      "name": "a"
                    },
                    "init": null
                  },
                  {
                    "type": "VariableDeclarator",
                    "start": 21,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 21
                      },
                      "end": {
                        "line": 1,
                        "column": 22
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 21,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 21
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "name": "b"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export const a = 0, b = 0;"', () => {
        expect(parseModule(`export const a = 0, b = 0;`, {
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
            "body": [
              {
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 13,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "id": {
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
                      },
                      "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      }
                    },
                    {
                      "type": "VariableDeclarator",
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
                      "id": {
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
                        "name": "b"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 24,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 24
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "const"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export let a = 0, b = 0;"', () => {
        expect(parseModule(`export let a = 0, b = 0;`, {
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
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
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
                      "id": {
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
                      "init": {
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
                    },
                    {
                      "type": "VariableDeclarator",
                      "start": 18,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 18,
                        "end": 19,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 19
                          }
                        },
                        "name": "b"
                      },
                      "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export let[a] = 0;"', () => {
        expect(parseModule(`export let[a] = 0;`, {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
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
                      "id": {
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
                          {
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
                        ]
                      },
                      "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export function A(){} /* no semi */ false"', () => {
        expect(parseModule(`export function A(){} /* no semi */ false`, {
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
                "line": 1,
                "column": 41
              }
            },
            "body": [
              {
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "FunctionDeclaration",
                  "start": 7,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "id": {
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
                    "name": "A"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 19,
                    "end": 21,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                },
                "specifiers": [],
                "source": null
              },
              {
                "type": "ExpressionStatement",
                "start": 36,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 36
                  },
                  "end": {
                    "line": 1,
                    "column": 41
                  }
                },
                "expression": {
                  "type": "Literal",
                  "start": 36,
                  "end": 41,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 36
                    },
                    "end": {
                      "line": 1,
                      "column": 41
                    }
                  },
                  "value": false,
                  "raw": "false"
                }
              }
            ],
            "sourceType": "module"
          });
      });

      it('should parse "export default function a(){} let b; export {b as a};"', () => {
          expect(parseModule(`export default function a(){} let b; export {b as a};`, {
              ranges: true,
              raw: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 53,
            "body": [
              {
                "type": "ExportDefaultDeclaration",
                "start": 0,
                "end": 29,
                "declaration": {
                  "type": "FunctionDeclaration",
                  "start": 15,
                  "end": 29,
                  "id": {
                    "type": "Identifier",
                    "start": 24,
                    "end": 25,
                    "name": "a"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 27,
                    "end": 29,
                    "body": []
                  }
                }
              },
              {
                "type": "VariableDeclaration",
                "start": 30,
                "end": 36,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 34,
                    "end": 35,
                    "id": {
                      "type": "Identifier",
                      "start": 34,
                      "end": 35,
                      "name": "b"
                    },
                    "init": null
                  }
                ],
                "kind": "let"
              },
              {
                "type": "ExportNamedDeclaration",
                "start": 37,
                "end": 53,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 45,
                    "end": 51,
                    "local": {
                      "type": "Identifier",
                      "start": 45,
                      "end": 46,
                      "name": "b"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 50,
                      "end": 51,
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

      it('should export without being affected by function', () => {
          expect(parseModule(`function a() {}
        export { version };`, {
              ranges: true,
              raw: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 43,
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 15,
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 15,
                  "body": []
                }
              },
              {
                "type": "ExportNamedDeclaration",
                "start": 24,
                "end": 43,
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 33,
                    "end": 40,
                    "local": {
                      "type": "Identifier",
                      "start": 33,
                      "end": 40,
                      "name": "version"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 33,
                      "end": 40,
                      "name": "version"
                    }
                  }
                ],
                "source": null
              }
            ],
            "sourceType": "module"
          });
      });
  
      it('should export const number', () => {
          expect(parseModule(`export const foo = 1;`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 21,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 21,
                  "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 21,
                      "declarations": [{
                          "type": "VariableDeclarator",
                          "start": 13,
                          "end": 20,
                          "id": {
                              "type": "Identifier",
                              "start": 13,
                              "end": 16,
                              "name": "foo"
                          },
                          "init": {
                              "type": "Literal",
                              "start": 19,
                              "end": 20,
                              "value": 1,
                              "raw": "1"
                          }
                      }],
                      "kind": "const"
                  },
                  "specifiers": [],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
  
  
      it('should export default array', () => {
          expect(parseModule(`export default [];`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 18,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 18,
                  "declaration": {
                      "type": "ArrayExpression",
                      "start": 15,
                      "end": 17,
                      "elements": []
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export default assignment module', () => {
          expect(parseModule(`export default a = 0;`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 21,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 21,
                  "declaration": {
                      "type": "AssignmentExpression",
                      "start": 15,
                      "end": 20,
                      "operator": "=",
                      "left": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 16,
                          "name": "a"
                      },
                      "right": {
                          "type": "Literal",
                          "start": 19,
                          "end": 20,
                          "value": 0,
                          "raw": "0"
                      }
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export default function', () => {
          expect(parseModule(`export default function() {};`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 29,
              "body": [{
                      "type": "ExportDefaultDeclaration",
                      "start": 0,
                      "end": 28,
                      "declaration": {
                          "type": "FunctionDeclaration",
                          "start": 15,
                          "end": 28,
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "start": 26,
                              "end": 28,
                              "body": []
                          }
                      }
                  },
                  {
                      "type": "EmptyStatement",
                      "start": 28,
                      "end": 29
                  }
              ],
              "sourceType": "module"
          });
      });
  
      it('should export default class', () => {
          expect(parseModule(`export default class {};`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 24,
              "body": [{
                      "type": "ExportDefaultDeclaration",
                      "start": 0,
                      "end": 23,
                      "declaration": {
                          "type": "ClassDeclaration",
                          "start": 15,
                          "end": 23,
                          "id": null,
                          "superClass": null,
                          "body": {
                              "type": "ClassBody",
                              "start": 21,
                              "end": 23,
                              "body": []
                          }
                      }
                  },
                  {
                      "type": "EmptyStatement",
                      "start": 23,
                      "end": 24
                  }
              ],
              "sourceType": "module"
          });
      });
  
      it('should export default expression', () => {
          expect(parseModule(`export default (1 + 2);`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 23,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 23,
                  "declaration": {
                      "type": "BinaryExpression",
                      "start": 16,
                      "end": 21,
                      "left": {
                          "type": "Literal",
                          "start": 16,
                          "end": 17,
                          "value": 1,
                          "raw": "1"
                      },
                      "operator": "+",
                      "right": {
                          "type": "Literal",
                          "start": 20,
                          "end": 21,
                          "value": 2,
                          "raw": "2"
                      }
                  }
              }],
              "sourceType": "module"
          });
      });

      it('should export default named function', () => {
        expect(parseModule(`export default function f() {}`, {
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
              "type": "ExportDefaultDeclaration",
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
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 15,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 24,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 28,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 28
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "body": []
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });
  
      it('should export default function', () => {
          expect(parseModule(`export default function () {}`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 29,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 29,
                  "declaration": {
                      "type": "FunctionDeclaration",
                      "start": 15,
                      "end": 29,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "start": 27,
                          "end": 29,
                          "body": []
                      }
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export default named class', () => {
          expect(parseModule(`export default class foo {}`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 27,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 27,
                  "declaration": {
                      "type": "ClassDeclaration",
                      "start": 15,
                      "end": 27,
                      "id": {
                          "type": "Identifier",
                          "start": 21,
                          "end": 24,
                          "name": "foo"
                      },
                      "superClass": null,
                      "body": {
                          "type": "ClassBody",
                          "start": 25,
                          "end": 27,
                          "body": []
                      }
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export default named function', () => {
          expect(parseModule(`export default function foo() {}`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 32,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 32,
                  "declaration": {
                      "type": "FunctionDeclaration",
                      "start": 15,
                      "end": 32,
                      "id": {
                          "type": "Identifier",
                          "start": 24,
                          "end": 27,
                          "name": "foo"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "start": 30,
                          "end": 32,
                          "body": []
                      }
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export default number', () => {
          expect(parseModule(`export default 42;`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 18,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 18,
                  "declaration": {
                      "type": "Literal",
                      "start": 15,
                      "end": 17,
                      "value": 42,
                      "raw": "42"
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export default object', () => {
          expect(parseModule(`export default { foo: 1 };`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 26,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 26,
                  "declaration": {
                      "type": "ObjectExpression",
                      "start": 15,
                      "end": 25,
                      "properties": [{
                          "type": "Property",
                          "start": 17,
                          "end": 23,
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                              "type": "Identifier",
                              "start": 17,
                              "end": 20,
                              "name": "foo"
                          },
                          "value": {
                              "type": "Literal",
                              "start": 22,
                              "end": 23,
                              "value": 1,
                              "raw": "1"
                          },
                          "kind": "init"
                      }]
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export export default value', () => {
          expect(parseModule(`export default foo;`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 19,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 19,
                  "declaration": {
                      "type": "Identifier",
                      "start": 15,
                      "end": 18,
                      "name": "foo"
                  }
              }],
              "sourceType": "module"
          });
      });

      it('should export two', () => {
        expect(parseModule(`export { encrypt, decrypt }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 27,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 27
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 27,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 27
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 9,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "encrypt"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "encrypt"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 18,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 18,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "name": "decrypt"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 18,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "name": "decrypt"
                  }
                }
              ],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export from batch', () => {
        expect(parseModule(`export { encrypt as default }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 29,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 29
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 29,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 29
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 9,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "encrypt"
                  },
                  "exported": {
                    "type": "Identifier",
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
                    "name": "default"
                  }
                }
              ],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should parse triple export statements', () => {
        expect(parseModule(`export { a } from "foo"
        export { b } from "foo"
        export { c } from "foo"`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 87,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 31
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 23,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 23
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
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
                  "local": {
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
                    "name": "a"
                  },
                  "exported": {
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
                    "name": "a"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 18,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "value": "foo",
                "raw": "\"foo\""
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 32,
              "end": 55,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 8
                },
                "end": {
                  "line": 2,
                  "column": 31
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 41,
                  "end": 42,
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
                  "local": {
                    "type": "Identifier",
                    "start": 41,
                    "end": 42,
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
                    "name": "b"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 41,
                    "end": 42,
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
                    "name": "b"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 50,
                "end": 55,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 26
                  },
                  "end": {
                    "line": 2,
                    "column": 31
                  }
                },
                "value": "foo",
                "raw": "\"foo\""
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 64,
              "end": 87,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 8
                },
                "end": {
                  "line": 3,
                  "column": 31
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 73,
                  "end": 74,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 17
                    },
                    "end": {
                      "line": 3,
                      "column": 18
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 73,
                    "end": 74,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 17
                      },
                      "end": {
                        "line": 3,
                        "column": 18
                      }
                    },
                    "name": "c"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 73,
                    "end": 74,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 17
                      },
                      "end": {
                        "line": 3,
                        "column": 18
                      }
                    },
                    "name": "c"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 82,
                "end": 87,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 26
                  },
                  "end": {
                    "line": 3,
                    "column": 31
                  }
                },
                "value": "foo",
                "raw": "\"foo\""
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export default from', () => {
        expect(parseModule(`export { default } from "foo"`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 29,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 29
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 29,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 29
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 9,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "default"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "default"
                  }
                }
              ],
              "source": {
                "type": "Literal",
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
                },
                "value": "foo",
                "raw": "\"foo\""
              }
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export as', () => {
        expect(parseModule(`export { encrypt, decrypt as dec }`, {
            ranges: true,
            raw: true,
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
              "type": "ExportNamedDeclaration",
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
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 9,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "encrypt"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "encrypt"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 18,
                  "end": 32,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 32
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 18,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "name": "decrypt"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 29,
                    "end": 32,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 29
                      },
                      "end": {
                        "line": 1,
                        "column": 32
                      }
                    },
                    "name": "dec"
                  }
                }
              ],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export multiple', () => {
        expect(parseModule(`import { a } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { c as b } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { e as d } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { g as f } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { i as h } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { k as j } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { m as l } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { o as n } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { q as p } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { s as r } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { u as t } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { w as v } from './instn-named-iee-cycle-2_FIXTURE.js';
        export { y as x } from './instn-named-iee-cycle-2_FIXTURE.js';
        export var z = 23;`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 936,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 26
            }
          },
          "body": [
            {
              "type": "ImportDeclaration",
              "start": 0,
              "end": 57,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 57
                }
              },
              "specifiers": [
                {
                  "type": "ImportSpecifier",
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
                  "imported": {
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
                    "name": "a"
                  },
                  "local": {
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
                    "name": "a"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 18,
                "end": 56,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 56
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 66,
              "end": 128,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 8
                },
                "end": {
                  "line": 2,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 75,
                  "end": 81,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 17
                    },
                    "end": {
                      "line": 2,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 75,
                    "end": 76,
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
                    "name": "c"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 80,
                    "end": 81,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 22
                      },
                      "end": {
                        "line": 2,
                        "column": 23
                      }
                    },
                    "name": "b"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 89,
                "end": 127,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 31
                  },
                  "end": {
                    "line": 2,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 137,
              "end": 199,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 8
                },
                "end": {
                  "line": 3,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 146,
                  "end": 152,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 17
                    },
                    "end": {
                      "line": 3,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 146,
                    "end": 147,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 17
                      },
                      "end": {
                        "line": 3,
                        "column": 18
                      }
                    },
                    "name": "e"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 151,
                    "end": 152,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 22
                      },
                      "end": {
                        "line": 3,
                        "column": 23
                      }
                    },
                    "name": "d"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 160,
                "end": 198,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 31
                  },
                  "end": {
                    "line": 3,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 208,
              "end": 270,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 8
                },
                "end": {
                  "line": 4,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 217,
                  "end": 223,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 17
                    },
                    "end": {
                      "line": 4,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 217,
                    "end": 218,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 17
                      },
                      "end": {
                        "line": 4,
                        "column": 18
                      }
                    },
                    "name": "g"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 222,
                    "end": 223,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 22
                      },
                      "end": {
                        "line": 4,
                        "column": 23
                      }
                    },
                    "name": "f"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 231,
                "end": 269,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 31
                  },
                  "end": {
                    "line": 4,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 279,
              "end": 341,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 8
                },
                "end": {
                  "line": 5,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 288,
                  "end": 294,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 17
                    },
                    "end": {
                      "line": 5,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 288,
                    "end": 289,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 17
                      },
                      "end": {
                        "line": 5,
                        "column": 18
                      }
                    },
                    "name": "i"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 293,
                    "end": 294,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 22
                      },
                      "end": {
                        "line": 5,
                        "column": 23
                      }
                    },
                    "name": "h"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 302,
                "end": 340,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 31
                  },
                  "end": {
                    "line": 5,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 350,
              "end": 412,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 8
                },
                "end": {
                  "line": 6,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 359,
                  "end": 365,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 17
                    },
                    "end": {
                      "line": 6,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 359,
                    "end": 360,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 17
                      },
                      "end": {
                        "line": 6,
                        "column": 18
                      }
                    },
                    "name": "k"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 364,
                    "end": 365,
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
                    "name": "j"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 373,
                "end": 411,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 31
                  },
                  "end": {
                    "line": 6,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 421,
              "end": 483,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 8
                },
                "end": {
                  "line": 7,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 430,
                  "end": 436,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 17
                    },
                    "end": {
                      "line": 7,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 430,
                    "end": 431,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 17
                      },
                      "end": {
                        "line": 7,
                        "column": 18
                      }
                    },
                    "name": "m"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 435,
                    "end": 436,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 22
                      },
                      "end": {
                        "line": 7,
                        "column": 23
                      }
                    },
                    "name": "l"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 444,
                "end": 482,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 31
                  },
                  "end": {
                    "line": 7,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 492,
              "end": 554,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 8
                },
                "end": {
                  "line": 8,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 501,
                  "end": 507,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 17
                    },
                    "end": {
                      "line": 8,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 501,
                    "end": 502,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 17
                      },
                      "end": {
                        "line": 8,
                        "column": 18
                      }
                    },
                    "name": "o"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 506,
                    "end": 507,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 22
                      },
                      "end": {
                        "line": 8,
                        "column": 23
                      }
                    },
                    "name": "n"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 515,
                "end": 553,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 31
                  },
                  "end": {
                    "line": 8,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 563,
              "end": 625,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 8
                },
                "end": {
                  "line": 9,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 572,
                  "end": 578,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 17
                    },
                    "end": {
                      "line": 9,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 572,
                    "end": 573,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 17
                      },
                      "end": {
                        "line": 9,
                        "column": 18
                      }
                    },
                    "name": "q"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 577,
                    "end": 578,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 22
                      },
                      "end": {
                        "line": 9,
                        "column": 23
                      }
                    },
                    "name": "p"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 586,
                "end": 624,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 31
                  },
                  "end": {
                    "line": 9,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 634,
              "end": 696,
              "loc": {
                "start": {
                  "line": 10,
                  "column": 8
                },
                "end": {
                  "line": 10,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 643,
                  "end": 649,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 17
                    },
                    "end": {
                      "line": 10,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 643,
                    "end": 644,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 17
                      },
                      "end": {
                        "line": 10,
                        "column": 18
                      }
                    },
                    "name": "s"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 648,
                    "end": 649,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 22
                      },
                      "end": {
                        "line": 10,
                        "column": 23
                      }
                    },
                    "name": "r"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 657,
                "end": 695,
                "loc": {
                  "start": {
                    "line": 10,
                    "column": 31
                  },
                  "end": {
                    "line": 10,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 705,
              "end": 767,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 8
                },
                "end": {
                  "line": 11,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 714,
                  "end": 720,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 17
                    },
                    "end": {
                      "line": 11,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 714,
                    "end": 715,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 17
                      },
                      "end": {
                        "line": 11,
                        "column": 18
                      }
                    },
                    "name": "u"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 719,
                    "end": 720,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 22
                      },
                      "end": {
                        "line": 11,
                        "column": 23
                      }
                    },
                    "name": "t"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 728,
                "end": 766,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 31
                  },
                  "end": {
                    "line": 11,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 776,
              "end": 838,
              "loc": {
                "start": {
                  "line": 12,
                  "column": 8
                },
                "end": {
                  "line": 12,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 785,
                  "end": 791,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 17
                    },
                    "end": {
                      "line": 12,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 785,
                    "end": 786,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 17
                      },
                      "end": {
                        "line": 12,
                        "column": 18
                      }
                    },
                    "name": "w"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 790,
                    "end": 791,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 22
                      },
                      "end": {
                        "line": 12,
                        "column": 23
                      }
                    },
                    "name": "v"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 799,
                "end": 837,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 31
                  },
                  "end": {
                    "line": 12,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 847,
              "end": 909,
              "loc": {
                "start": {
                  "line": 13,
                  "column": 8
                },
                "end": {
                  "line": 13,
                  "column": 70
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 856,
                  "end": 862,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 17
                    },
                    "end": {
                      "line": 13,
                      "column": 23
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 856,
                    "end": 857,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 17
                      },
                      "end": {
                        "line": 13,
                        "column": 18
                      }
                    },
                    "name": "y"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 861,
                    "end": 862,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 22
                      },
                      "end": {
                        "line": 13,
                        "column": 23
                      }
                    },
                    "name": "x"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 870,
                "end": 908,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 31
                  },
                  "end": {
                    "line": 13,
                    "column": 69
                  }
                },
                "value": "./instn-named-iee-cycle-2_FIXTURE.js",
                "raw": "'./instn-named-iee-cycle-2_FIXTURE.js'"
              }
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 918,
              "end": 936,
              "loc": {
                "start": {
                  "line": 14,
                  "column": 8
                },
                "end": {
                  "line": 14,
                  "column": 26
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 925,
                "end": 936,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 15
                  },
                  "end": {
                    "line": 14,
                    "column": 26
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 929,
                    "end": 935,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 19
                      },
                      "end": {
                        "line": 14,
                        "column": 25
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 929,
                      "end": 930,
                      "loc": {
                        "start": {
                          "line": 14,
                          "column": 19
                        },
                        "end": {
                          "line": 14,
                          "column": 20
                        }
                      },
                      "name": "z"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 933,
                      "end": 935,
                      "loc": {
                        "start": {
                          "line": 14,
                          "column": 23
                        },
                        "end": {
                          "line": 14,
                          "column": 25
                        }
                      },
                      "value": 23,
                      "raw": "23"
                    }
                  }
                ],
                "kind": "var"
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export from batch', () => {
        expect(parseModule(`export { encrypt }`, {
            ranges: true,
            raw: true,
            locations: true
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
              "type": "ExportNamedDeclaration",
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
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 9,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "encrypt"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 9
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "name": "encrypt"
                  }
                }
              ],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });
  
      it('should export from batch', () => {
          expect(parseModule(`export * from "foo";`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 20,
              "body": [{
                  "type": "ExportAllDeclaration",
                  "start": 0,
                  "end": 20,
                  "source": {
                      "type": "Literal",
                      "start": 14,
                      "end": 19,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export from default', () => {
          expect(parseModule(`export {default} from "foo";`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 28,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 28,
                  "declaration": null,
                  "specifiers": [{
                      "type": "ExportSpecifier",
                      "start": 8,
                      "end": 15,
                      "local": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 15,
                          "name": "default"
                      },
                      "exported": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 15,
                          "name": "default"
                      }
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 22,
                      "end": 27,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export from named as export', () => {
          expect(parseModule(`export {foo as default} from "foo";`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 35,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 35,
                  "declaration": null,
                  "specifiers": [{
                      "type": "ExportSpecifier",
                      "start": 8,
                      "end": 22,
                      "local": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 11,
                          "name": "foo"
                      },
                      "exported": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 22,
                          "name": "default"
                      }
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 29,
                      "end": 34,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export from named as specifier', () => {
          expect(parseModule(`export {foo as bar} from "foo";`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 31,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 31,
                  "declaration": null,
                  "specifiers": [{
                      "type": "ExportSpecifier",
                      "start": 8,
                      "end": 18,
                      "local": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 11,
                          "name": "foo"
                      },
                      "exported": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 18,
                          "name": "bar"
                      }
                  }],
                  "source": {
                      "type": "Literal",
                      "start": 25,
                      "end": 30,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export from named as specifiers', () => {
          expect(parseModule(`export {foo as default, bar} from "foo";`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 40,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 40,
                  "declaration": null,
                  "specifiers": [{
                          "type": "ExportSpecifier",
                          "start": 8,
                          "end": 22,
                          "local": {
                              "type": "Identifier",
                              "start": 8,
                              "end": 11,
                              "name": "foo"
                          },
                          "exported": {
                              "type": "Identifier",
                              "start": 15,
                              "end": 22,
                              "name": "default"
                          }
                      },
                      {
                          "type": "ExportSpecifier",
                          "start": 24,
                          "end": 27,
                          "local": {
                              "type": "Identifier",
                              "start": 24,
                              "end": 27,
                              "name": "bar"
                          },
                          "exported": {
                              "type": "Identifier",
                              "start": 24,
                              "end": 27,
                              "name": "bar"
                          }
                      }
                  ],
                  "source": {
                      "type": "Literal",
                      "start": 34,
                      "end": 39,
                      "value": "foo",
                      "raw": "\"foo\""
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should export function declaration with boolean', () => {
          expect(parseModule(`export function foo () {} false`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 31,
              "body": [{
                      "type": "ExportNamedDeclaration",
                      "start": 0,
                      "end": 25,
                      "declaration": {
                          "type": "FunctionDeclaration",
                          "start": 7,
                          "end": 25,
                          "id": {
                              "type": "Identifier",
                              "start": 16,
                              "end": 19,
                              "name": "foo"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "start": 23,
                              "end": 25,
                              "body": []
                          }
                      },
                      "specifiers": [],
                      "source": null
                  },
                  {
                      "type": "ExpressionStatement",
                      "start": 26,
                      "end": 31,
                      "expression": {
                          "type": "Literal",
                          "start": 26,
                          "end": 31,
                          "value": false,
                          "raw": "false"
                      }
                  }
              ],
              "sourceType": "module"
          });
      });
  
      it('should export let number', () => {
          expect(parseModule(`export const foo = 1;`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 21,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 21,
                  "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 21,
                      "declarations": [{
                          "type": "VariableDeclarator",
                          "start": 13,
                          "end": 20,
                          "id": {
                              "type": "Identifier",
                              "start": 13,
                              "end": 16,
                              "name": "foo"
                          },
                          "init": {
                              "type": "Literal",
                              "start": 19,
                              "end": 20,
                              "value": 1,
                              "raw": "1"
                          }
                      }],
                      "kind": "const"
                  },
                  "specifiers": [],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
  
      it('should export named as default', () => {
          expect(parseModule(`export {foo as default};`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 24,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 24,
                  "declaration": null,
                  "specifiers": [{
                      "type": "ExportSpecifier",
                      "start": 8,
                      "end": 22,
                      "local": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 11,
                          "name": "foo"
                      },
                      "exported": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 22,
                          "name": "default"
                      }
                  }],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
  
      it('should export named as specifier', () => {
          expect(parseModule(`export {foo as bar};`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 20,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 20,
                  "declaration": null,
                  "specifiers": [{
                      "type": "ExportSpecifier",
                      "start": 8,
                      "end": 18,
                      "local": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 11,
                          "name": "foo"
                      },
                      "exported": {
                          "type": "Identifier",
                          "start": 15,
                          "end": 18,
                          "name": "bar"
                      }
                  }],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
  
      it('should assignment expression with resturn statement', () => {
          expect(parseModule(`export default (function fName() { return 7; });`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 48,
              "body": [{
                  "type": "ExportDefaultDeclaration",
                  "start": 0,
                  "end": 48,
                  "declaration": {
                      "type": "FunctionExpression",
                      "start": 16,
                      "end": 46,
                      "id": {
                          "type": "Identifier",
                          "start": 25,
                          "end": 30,
                          "name": "fName"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "start": 33,
                          "end": 46,
                          "body": [{
                              "type": "ReturnStatement",
                              "start": 35,
                              "end": 44,
                              "argument": {
                                  "type": "Literal",
                                  "start": 42,
                                  "end": 43,
                                  "value": 7,
                                  "raw": "7"
                              }
                          }]
                      }
                  }
              }],
              "sourceType": "module"
          });
      });
  
      it('should parse an unterminated generator function', () => {
          expect(parseModule(`export function* g() {} if (true) { count += 1; }`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 49,
              "body": [{
                      "type": "ExportNamedDeclaration",
                      "start": 0,
                      "end": 23,
                      "declaration": {
                          "type": "FunctionDeclaration",
                          "start": 7,
                          "end": 23,
                          "id": {
                              "type": "Identifier",
                              "start": 17,
                              "end": 18,
                              "name": "g"
                          },
                          "generator": true,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "start": 21,
                              "end": 23,
                              "body": []
                          }
                      },
                      "specifiers": [],
                      "source": null
                  },
                  {
                      "type": "IfStatement",
                      "start": 24,
                      "end": 49,
                      "test": {
                          "type": "Literal",
                          "start": 28,
                          "end": 32,
                          "value": true,
                          "raw": "true"
                      },
                      "consequent": {
                          "type": "BlockStatement",
                          "start": 34,
                          "end": 49,
                          "body": [{
                              "type": "ExpressionStatement",
                              "start": 36,
                              "end": 47,
                              "expression": {
                                  "type": "AssignmentExpression",
                                  "start": 36,
                                  "end": 46,
                                  "operator": "+=",
                                  "left": {
                                      "type": "Identifier",
                                      "start": 36,
                                      "end": 41,
                                      "name": "count"
                                  },
                                  "right": {
                                      "type": "Literal",
                                      "start": 45,
                                      "end": 46,
                                      "value": 1,
                                      "raw": "1"
                                  }
                              }
                          }]
                      },
                      "alternate": null
                  }
              ],
              "sourceType": "module"
          });
      });
  
      it('should export named as specifiers', () => {
          expect(parseModule(`export {foo as default, bar};`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 29,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 29,
                  "declaration": null,
                  "specifiers": [{
                          "type": "ExportSpecifier",
                          "start": 8,
                          "end": 22,
                          "local": {
                              "type": "Identifier",
                              "start": 8,
                              "end": 11,
                              "name": "foo"
                          },
                          "exported": {
                              "type": "Identifier",
                              "start": 15,
                              "end": 22,
                              "name": "default"
                          }
                      },
                      {
                          "type": "ExportSpecifier",
                          "start": 24,
                          "end": 27,
                          "local": {
                              "type": "Identifier",
                              "start": 24,
                              "end": 27,
                              "name": "bar"
                          },
                          "exported": {
                              "type": "Identifier",
                              "start": 24,
                              "end": 27,
                              "name": "bar"
                          }
                      }
                  ],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
  
      it('should export named empty', () => {
          expect(parseModule(`export {};`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 10,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 10,
                  "declaration": null,
                  "specifiers": [],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
  
      it('should export named specifiers comma', () => {
          expect(parseModule(`export {foo, bar,};`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 19,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 19,
                  "declaration": null,
                  "specifiers": [{
                          "type": "ExportSpecifier",
                          "start": 8,
                          "end": 11,
                          "local": {
                              "type": "Identifier",
                              "start": 8,
                              "end": 11,
                              "name": "foo"
                          },
                          "exported": {
                              "type": "Identifier",
                              "start": 8,
                              "end": 11,
                              "name": "foo"
                          }
                      },
                      {
                          "type": "ExportSpecifier",
                          "start": 13,
                          "end": 16,
                          "local": {
                              "type": "Identifier",
                              "start": 13,
                              "end": 16,
                              "name": "bar"
                          },
                          "exported": {
                              "type": "Identifier",
                              "start": 13,
                              "end": 16,
                              "name": "bar"
                          }
                      }
                  ],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
      it('should export var anonymous function', () => {
          expect(parseModule(`export var foo = function () {};`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 32,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 32,
                  "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 32,
                      "declarations": [{
                          "type": "VariableDeclarator",
                          "start": 11,
                          "end": 31,
                          "id": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 14,
                              "name": "foo"
                          },
                          "init": {
                              "type": "FunctionExpression",
                              "start": 17,
                              "end": 31,
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
                                  "start": 29,
                                  "end": 31,
                                  "body": []
                              }
                          }
                      }],
                      "kind": "var"
                  },
                  "specifiers": [],
                  "source": null
              }],
              "sourceType": "module"
          });
      });
      it('should export var number', () => {
          expect(parseModule(`export var foo = 1;`, {
              ranges: true,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 19,
              "body": [{
                  "type": "ExportNamedDeclaration",
                  "start": 0,
                  "end": 19,
                  "declaration": {
                      "type": "VariableDeclaration",
                      "start": 7,
                      "end": 19,
                      "declarations": [{
                          "type": "VariableDeclarator",
                          "start": 11,
                          "end": 18,
                          "id": {
                              "type": "Identifier",
                              "start": 11,
                              "end": 14,
                              "name": "foo"
                          },
                          "init": {
                              "type": "Literal",
                              "start": 17,
                              "end": 18,
                              "value": 1,
                              "raw": "1"
                          }
                      }],
                      "kind": "var"
                  },
                  "specifiers": [],
                  "source": null
              }],
              "sourceType": "module"
          });
      });

      it('should export without duplicate conflict', () => {
        expect(parseModule(`export const { foo: { baz: { qux3 } }, foo2: { baz2: [qux4]} } = bar;
        export const { foo: { baz: { qux5 } }, foo2: { baz2: [{qux6}]} } = bar;
        export const [[baz2]] = bar;
        export const { Foo } = bar;`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 222,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 35
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 69,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 69
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 7,
                "end": 69,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 69
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 13,
                    "end": 68,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 68
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 13,
                      "end": 62,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 62
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 15,
                          "end": 37,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 37
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 18,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 18
                              }
                            },
                            "name": "foo"
                          },
                          "value": {
                            "type": "ObjectPattern",
                            "start": 20,
                            "end": 37,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 20
                              },
                              "end": {
                                "line": 1,
                                "column": 37
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 22,
                                "end": 35,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 22
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
                                  "start": 22,
                                  "end": 25,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 22
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 25
                                    }
                                  },
                                  "name": "baz"
                                },
                                "value": {
                                  "type": "ObjectPattern",
                                  "start": 27,
                                  "end": 35,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 27
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 35
                                    }
                                  },
                                  "properties": [
                                    {
                                      "type": "Property",
                                      "start": 29,
                                      "end": 33,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 29
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 33
                                        }
                                      },
                                      "method": false,
                                      "shorthand": true,
                                      "computed": false,
                                      "key": {
                                        "type": "Identifier",
                                        "start": 29,
                                        "end": 33,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 29
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 33
                                          }
                                        },
                                        "name": "qux3"
                                      },
                                      "kind": "init",
                                      "value": {
                                        "type": "Identifier",
                                        "start": 29,
                                        "end": 33,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 29
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 33
                                          }
                                        },
                                        "name": "qux3"
                                      }
                                    }
                                  ]
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 39,
                          "end": 60,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 39
                            },
                            "end": {
                              "line": 1,
                              "column": 60
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 39,
                            "end": 43,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 39
                              },
                              "end": {
                                "line": 1,
                                "column": 43
                              }
                            },
                            "name": "foo2"
                          },
                          "value": {
                            "type": "ObjectPattern",
                            "start": 45,
                            "end": 60,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 45
                              },
                              "end": {
                                "line": 1,
                                "column": 60
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 47,
                                "end": 59,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 47
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 59
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 47,
                                  "end": 51,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 47
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 51
                                    }
                                  },
                                  "name": "baz2"
                                },
                                "value": {
                                  "type": "ArrayPattern",
                                  "start": 53,
                                  "end": 59,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 53
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 59
                                    }
                                  },
                                  "elements": [
                                    {
                                      "type": "Identifier",
                                      "start": 54,
                                      "end": 58,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 54
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 58
                                        }
                                      },
                                      "name": "qux4"
                                    }
                                  ]
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "Identifier",
                      "start": 65,
                      "end": 68,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 65
                        },
                        "end": {
                          "line": 1,
                          "column": 68
                        }
                      },
                      "name": "bar"
                    }
                  }
                ],
                "kind": "const"
              },
              "specifiers": [],
              "source": null
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 78,
              "end": 149,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 8
                },
                "end": {
                  "line": 2,
                  "column": 79
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 85,
                "end": 149,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 15
                  },
                  "end": {
                    "line": 2,
                    "column": 79
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 91,
                    "end": 148,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 21
                      },
                      "end": {
                        "line": 2,
                        "column": 78
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 91,
                      "end": 142,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 21
                        },
                        "end": {
                          "line": 2,
                          "column": 72
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 93,
                          "end": 115,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 23
                            },
                            "end": {
                              "line": 2,
                              "column": 45
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 93,
                            "end": 96,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 23
                              },
                              "end": {
                                "line": 2,
                                "column": 26
                              }
                            },
                            "name": "foo"
                          },
                          "value": {
                            "type": "ObjectPattern",
                            "start": 98,
                            "end": 115,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 28
                              },
                              "end": {
                                "line": 2,
                                "column": 45
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 100,
                                "end": 113,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 30
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 43
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 100,
                                  "end": 103,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 30
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 33
                                    }
                                  },
                                  "name": "baz"
                                },
                                "value": {
                                  "type": "ObjectPattern",
                                  "start": 105,
                                  "end": 113,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 35
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 43
                                    }
                                  },
                                  "properties": [
                                    {
                                      "type": "Property",
                                      "start": 107,
                                      "end": 111,
                                      "loc": {
                                        "start": {
                                          "line": 2,
                                          "column": 37
                                        },
                                        "end": {
                                          "line": 2,
                                          "column": 41
                                        }
                                      },
                                      "method": false,
                                      "shorthand": true,
                                      "computed": false,
                                      "key": {
                                        "type": "Identifier",
                                        "start": 107,
                                        "end": 111,
                                        "loc": {
                                          "start": {
                                            "line": 2,
                                            "column": 37
                                          },
                                          "end": {
                                            "line": 2,
                                            "column": 41
                                          }
                                        },
                                        "name": "qux5"
                                      },
                                      "kind": "init",
                                      "value": {
                                        "type": "Identifier",
                                        "start": 107,
                                        "end": 111,
                                        "loc": {
                                          "start": {
                                            "line": 2,
                                            "column": 37
                                          },
                                          "end": {
                                            "line": 2,
                                            "column": 41
                                          }
                                        },
                                        "name": "qux5"
                                      }
                                    }
                                  ]
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
                          "start": 117,
                          "end": 140,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 47
                            },
                            "end": {
                              "line": 2,
                              "column": 70
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 117,
                            "end": 121,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 47
                              },
                              "end": {
                                "line": 2,
                                "column": 51
                              }
                            },
                            "name": "foo2"
                          },
                          "value": {
                            "type": "ObjectPattern",
                            "start": 123,
                            "end": 140,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 53
                              },
                              "end": {
                                "line": 2,
                                "column": 70
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 125,
                                "end": 139,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 55
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 69
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 125,
                                  "end": 129,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 55
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 59
                                    }
                                  },
                                  "name": "baz2"
                                },
                                "value": {
                                  "type": "ArrayPattern",
                                  "start": 131,
                                  "end": 139,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 61
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 69
                                    }
                                  },
                                  "elements": [
                                    {
                                      "type": "ObjectPattern",
                                      "start": 132,
                                      "end": 138,
                                      "loc": {
                                        "start": {
                                          "line": 2,
                                          "column": 62
                                        },
                                        "end": {
                                          "line": 2,
                                          "column": 68
                                        }
                                      },
                                      "properties": [
                                        {
                                          "type": "Property",
                                          "start": 133,
                                          "end": 137,
                                          "loc": {
                                            "start": {
                                              "line": 2,
                                              "column": 63
                                            },
                                            "end": {
                                              "line": 2,
                                              "column": 67
                                            }
                                          },
                                          "method": false,
                                          "shorthand": true,
                                          "computed": false,
                                          "key": {
                                            "type": "Identifier",
                                            "start": 133,
                                            "end": 137,
                                            "loc": {
                                              "start": {
                                                "line": 2,
                                                "column": 63
                                              },
                                              "end": {
                                                "line": 2,
                                                "column": 67
                                              }
                                            },
                                            "name": "qux6"
                                          },
                                          "kind": "init",
                                          "value": {
                                            "type": "Identifier",
                                            "start": 133,
                                            "end": 137,
                                            "loc": {
                                              "start": {
                                                "line": 2,
                                                "column": 63
                                              },
                                              "end": {
                                                "line": 2,
                                                "column": 67
                                              }
                                            },
                                            "name": "qux6"
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "Identifier",
                      "start": 145,
                      "end": 148,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 75
                        },
                        "end": {
                          "line": 2,
                          "column": 78
                        }
                      },
                      "name": "bar"
                    }
                  }
                ],
                "kind": "const"
              },
              "specifiers": [],
              "source": null
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 158,
              "end": 186,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 8
                },
                "end": {
                  "line": 3,
                  "column": 36
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 165,
                "end": 186,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 15
                  },
                  "end": {
                    "line": 3,
                    "column": 36
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 171,
                    "end": 185,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 21
                      },
                      "end": {
                        "line": 3,
                        "column": 35
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 171,
                      "end": 179,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 21
                        },
                        "end": {
                          "line": 3,
                          "column": 29
                        }
                      },
                      "elements": [
                        {
                          "type": "ArrayPattern",
                          "start": 172,
                          "end": 178,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 22
                            },
                            "end": {
                              "line": 3,
                              "column": 28
                            }
                          },
                          "elements": [
                            {
                              "type": "Identifier",
                              "start": 173,
                              "end": 177,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 23
                                },
                                "end": {
                                  "line": 3,
                                  "column": 27
                                }
                              },
                              "name": "baz2"
                            }
                          ]
                        }
                      ]
                    },
                    "init": {
                      "type": "Identifier",
                      "start": 182,
                      "end": 185,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 32
                        },
                        "end": {
                          "line": 3,
                          "column": 35
                        }
                      },
                      "name": "bar"
                    }
                  }
                ],
                "kind": "const"
              },
              "specifiers": [],
              "source": null
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 195,
              "end": 222,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 8
                },
                "end": {
                  "line": 4,
                  "column": 35
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 202,
                "end": 222,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 15
                  },
                  "end": {
                    "line": 4,
                    "column": 35
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 208,
                    "end": 221,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 21
                      },
                      "end": {
                        "line": 4,
                        "column": 34
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 208,
                      "end": 215,
                      "loc": {
                        "start": {
                          "line": 4,
                          "column": 21
                        },
                        "end": {
                          "line": 4,
                          "column": 28
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 210,
                          "end": 213,
                          "loc": {
                            "start": {
                              "line": 4,
                              "column": 23
                            },
                            "end": {
                              "line": 4,
                              "column": 26
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 210,
                            "end": 213,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 23
                              },
                              "end": {
                                "line": 4,
                                "column": 26
                              }
                            },
                            "name": "Foo"
                          },
                          "kind": "init",
                          "value": {
                            "type": "Identifier",
                            "start": 210,
                            "end": 213,
                            "loc": {
                              "start": {
                                "line": 4,
                                "column": 23
                              },
                              "end": {
                                "line": 4,
                                "column": 26
                              }
                            },
                            "name": "Foo"
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "Identifier",
                      "start": 218,
                      "end": 221,
                      "loc": {
                        "start": {
                          "line": 4,
                          "column": 31
                        },
                        "end": {
                          "line": 4,
                          "column": 34
                        }
                      },
                      "name": "bar"
                    }
                  }
                ],
                "kind": "const"
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });
      
      it('should export named function declaration', () => {
        expect(parseModule(`export function parse() { }`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 27,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 27
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 27,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 27
                }
              },
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 7,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 16,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "name": "parse"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 24,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "body": []
                }
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });

      it('should export class declaration', () => {
        expect(parseModule(`export class Class {}`, {
            ranges: true,
            locations: true,
            raw: true
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
              "type": "ExportNamedDeclaration",
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
              "declaration": {
                "type": "ClassDeclaration",
                "start": 7,
                "end": 21,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 21
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 13,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "name": "Class"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 19,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "body": []
                }
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });
      
      it('should parse const object pattern', () => {
        expect(parseModule(`export const document = { }`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 27,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 27
            }
          },
          "body": [
            {
              "type": "ExportNamedDeclaration",
              "start": 0,
              "end": 27,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 27
                }
              },
              "declaration": {
                "type": "VariableDeclaration",
                "start": 7,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 13,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 13,
                      "end": 21,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 21
                        }
                      },
                      "name": "document"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 24,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              },
              "specifiers": [],
              "source": null
            }
          ],
          "sourceType": "module"
        });
      });
     

      it('should parse async await object method', () => {
        expect(parseModule(`export default async function() { };`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 36,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 36
            }
          },
          "body": [
            {
              "type": "ExportDefaultDeclaration",
              "start": 0,
              "end": 35,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 35
                }
              },
              "declaration": {
                "type": "FunctionDeclaration",
                "start": 15,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 32,
                  "end": 35,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 32
                    },
                    "end": {
                      "line": 1,
                      "column": 35
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "EmptyStatement",
              "start": 35,
              "end": 36,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 35
                },
                "end": {
                  "line": 1,
                  "column": 36
                }
              }
            }
          ],
          "sourceType": "module"
        });
      });
 
      it('should export complex', () => {
        expect(parseModule(`var _if = 1;
        var _import = 2;
        var _export = 3;
        var _await = 4;
        var _arguments = 5;
        var _eval = 6;
        var _default = 7;
        var _as = 8;
        
        export {
            _if as if,
            _import as import,
            _export as export,
            _await as await,
            _arguments as arguments,
            _eval as eval,
            _default as default,
            _as as as
          };
        
        import {
            if as if_,
            import as import_,
            export as export_,
            await as await_,
            arguments as arguments_,
            eval as eval_,
            default as default_,
            as as as
          } from './instn-named-id-name.js';`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 759,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 30,
              "column": 44
            }
          },
          "body": [
            {
              "type": "VariableDeclaration",
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
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 4,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
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
                    "name": "_if"
                  },
                  "init": {
                    "type": "Literal",
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
                    "value": 1,
                    "raw": "1"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 21,
              "end": 37,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 8
                },
                "end": {
                  "line": 2,
                  "column": 24
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 25,
                  "end": 36,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 12
                    },
                    "end": {
                      "line": 2,
                      "column": 23
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 25,
                    "end": 32,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 2,
                        "column": 19
                      }
                    },
                    "name": "_import"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 35,
                    "end": 36,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 22
                      },
                      "end": {
                        "line": 2,
                        "column": 23
                      }
                    },
                    "value": 2,
                    "raw": "2"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 46,
              "end": 62,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 8
                },
                "end": {
                  "line": 3,
                  "column": 24
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 50,
                  "end": 61,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 12
                    },
                    "end": {
                      "line": 3,
                      "column": 23
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 50,
                    "end": 57,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 12
                      },
                      "end": {
                        "line": 3,
                        "column": 19
                      }
                    },
                    "name": "_export"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 60,
                    "end": 61,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 22
                      },
                      "end": {
                        "line": 3,
                        "column": 23
                      }
                    },
                    "value": 3,
                    "raw": "3"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 71,
              "end": 86,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 8
                },
                "end": {
                  "line": 4,
                  "column": 23
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 75,
                  "end": 85,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 12
                    },
                    "end": {
                      "line": 4,
                      "column": 22
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 75,
                    "end": 81,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 12
                      },
                      "end": {
                        "line": 4,
                        "column": 18
                      }
                    },
                    "name": "_await"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 84,
                    "end": 85,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 21
                      },
                      "end": {
                        "line": 4,
                        "column": 22
                      }
                    },
                    "value": 4,
                    "raw": "4"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 95,
              "end": 114,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 8
                },
                "end": {
                  "line": 5,
                  "column": 27
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 99,
                  "end": 113,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 12
                    },
                    "end": {
                      "line": 5,
                      "column": 26
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 99,
                    "end": 109,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 12
                      },
                      "end": {
                        "line": 5,
                        "column": 22
                      }
                    },
                    "name": "_arguments"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 112,
                    "end": 113,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 25
                      },
                      "end": {
                        "line": 5,
                        "column": 26
                      }
                    },
                    "value": 5,
                    "raw": "5"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 123,
              "end": 137,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 8
                },
                "end": {
                  "line": 6,
                  "column": 22
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 127,
                  "end": 136,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 12
                    },
                    "end": {
                      "line": 6,
                      "column": 21
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 127,
                    "end": 132,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 12
                      },
                      "end": {
                        "line": 6,
                        "column": 17
                      }
                    },
                    "name": "_eval"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 135,
                    "end": 136,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 20
                      },
                      "end": {
                        "line": 6,
                        "column": 21
                      }
                    },
                    "value": 6,
                    "raw": "6"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 146,
              "end": 163,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 8
                },
                "end": {
                  "line": 7,
                  "column": 25
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 150,
                  "end": 162,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 12
                    },
                    "end": {
                      "line": 7,
                      "column": 24
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 150,
                    "end": 158,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 12
                      },
                      "end": {
                        "line": 7,
                        "column": 20
                      }
                    },
                    "name": "_default"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 161,
                    "end": 162,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 23
                      },
                      "end": {
                        "line": 7,
                        "column": 24
                      }
                    },
                    "value": 7,
                    "raw": "7"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "VariableDeclaration",
              "start": 172,
              "end": 184,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 8
                },
                "end": {
                  "line": 8,
                  "column": 20
                }
              },
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 176,
                  "end": 183,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 12
                    },
                    "end": {
                      "line": 8,
                      "column": 19
                    }
                  },
                  "id": {
                    "type": "Identifier",
                    "start": 176,
                    "end": 179,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 12
                      },
                      "end": {
                        "line": 8,
                        "column": 15
                      }
                    },
                    "name": "_as"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 182,
                    "end": 183,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 18
                      },
                      "end": {
                        "line": 8,
                        "column": 19
                      }
                    },
                    "value": 8,
                    "raw": "8"
                  }
                }
              ],
              "kind": "var"
            },
            {
              "type": "ExportNamedDeclaration",
              "start": 202,
              "end": 456,
              "loc": {
                "start": {
                  "line": 10,
                  "column": 8
                },
                "end": {
                  "line": 19,
                  "column": 12
                }
              },
              "declaration": null,
              "specifiers": [
                {
                  "type": "ExportSpecifier",
                  "start": 223,
                  "end": 232,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 12
                    },
                    "end": {
                      "line": 11,
                      "column": 21
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 223,
                    "end": 226,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 12
                      },
                      "end": {
                        "line": 11,
                        "column": 15
                      }
                    },
                    "name": "_if"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 230,
                    "end": 232,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 19
                      },
                      "end": {
                        "line": 11,
                        "column": 21
                      }
                    },
                    "name": "if"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 246,
                  "end": 263,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 12
                    },
                    "end": {
                      "line": 12,
                      "column": 29
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 246,
                    "end": 253,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 12
                      },
                      "end": {
                        "line": 12,
                        "column": 19
                      }
                    },
                    "name": "_import"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 257,
                    "end": 263,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 23
                      },
                      "end": {
                        "line": 12,
                        "column": 29
                      }
                    },
                    "name": "import"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 277,
                  "end": 294,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 12
                    },
                    "end": {
                      "line": 13,
                      "column": 29
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 277,
                    "end": 284,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 12
                      },
                      "end": {
                        "line": 13,
                        "column": 19
                      }
                    },
                    "name": "_export"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 288,
                    "end": 294,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 23
                      },
                      "end": {
                        "line": 13,
                        "column": 29
                      }
                    },
                    "name": "export"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 308,
                  "end": 323,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 12
                    },
                    "end": {
                      "line": 14,
                      "column": 27
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 308,
                    "end": 314,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 12
                      },
                      "end": {
                        "line": 14,
                        "column": 18
                      }
                    },
                    "name": "_await"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 318,
                    "end": 323,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 22
                      },
                      "end": {
                        "line": 14,
                        "column": 27
                      }
                    },
                    "name": "await"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 337,
                  "end": 360,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 12
                    },
                    "end": {
                      "line": 15,
                      "column": 35
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 337,
                    "end": 347,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 12
                      },
                      "end": {
                        "line": 15,
                        "column": 22
                      }
                    },
                    "name": "_arguments"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 351,
                    "end": 360,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 26
                      },
                      "end": {
                        "line": 15,
                        "column": 35
                      }
                    },
                    "name": "arguments"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 374,
                  "end": 387,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 12
                    },
                    "end": {
                      "line": 16,
                      "column": 25
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 374,
                    "end": 379,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 12
                      },
                      "end": {
                        "line": 16,
                        "column": 17
                      }
                    },
                    "name": "_eval"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 383,
                    "end": 387,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 21
                      },
                      "end": {
                        "line": 16,
                        "column": 25
                      }
                    },
                    "name": "eval"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 401,
                  "end": 420,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 12
                    },
                    "end": {
                      "line": 17,
                      "column": 31
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 401,
                    "end": 409,
                    "loc": {
                      "start": {
                        "line": 17,
                        "column": 12
                      },
                      "end": {
                        "line": 17,
                        "column": 20
                      }
                    },
                    "name": "_default"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 413,
                    "end": 420,
                    "loc": {
                      "start": {
                        "line": 17,
                        "column": 24
                      },
                      "end": {
                        "line": 17,
                        "column": 31
                      }
                    },
                    "name": "default"
                  }
                },
                {
                  "type": "ExportSpecifier",
                  "start": 434,
                  "end": 443,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 12
                    },
                    "end": {
                      "line": 18,
                      "column": 21
                    }
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 434,
                    "end": 437,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 12
                      },
                      "end": {
                        "line": 18,
                        "column": 15
                      }
                    },
                    "name": "_as"
                  },
                  "exported": {
                    "type": "Identifier",
                    "start": 441,
                    "end": 443,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 19
                      },
                      "end": {
                        "line": 18,
                        "column": 21
                      }
                    },
                    "name": "as"
                  }
                }
              ],
              "source": null
            },
            {
              "type": "ImportDeclaration",
              "start": 474,
              "end": 759,
              "loc": {
                "start": {
                  "line": 21,
                  "column": 8
                },
                "end": {
                  "line": 30,
                  "column": 44
                }
              },
              "specifiers": [
                {
                  "type": "ImportSpecifier",
                  "start": 495,
                  "end": 504,
                  "loc": {
                    "start": {
                      "line": 22,
                      "column": 12
                    },
                    "end": {
                      "line": 22,
                      "column": 21
                    }
                  },
                  "imported": {
                    "type": "Identifier",
                    "start": 495,
                    "end": 497,
                    "loc": {
                      "start": {
                        "line": 22,
                        "column": 12
                      },
                      "end": {
                        "line": 22,
                        "column": 14
                      }
                    },
                    "name": "if"
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 501,
                    "end": 504,
                    "loc": {
                      "start": {
                        "line": 22,
                        "column": 18
                      },
                      "end": {
                        "line": 22,
                        "column": 21
                      }
                    },
                    "name": "if_"
                  }
                },
                {
                  "type": "ImportSpecifier",
                  "start": 518,
                  "end": 535,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 12
                    },
                    "end": {
                      "line": 23,
                      "column": 29
                    }
                  },
                  "imported": {
                    "type": "Identifier",
                    "start": 518,
                    "end": 524,
                    "loc": {
                      "start": {
                        "line": 23,
                        "column": 12
                      },
                      "end": {
                        "line": 23,
                        "column": 18
                      }
                    },
                    "name": "import"
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 528,
                    "end": 535,
                    "loc": {
                      "start": {
                        "line": 23,
                        "column": 22
                      },
                      "end": {
                        "line": 23,
                        "column": 29
                      }
                    },
                    "name": "import_"
                  }
                },
                {
                  "type": "ImportSpecifier",
                  "start": 549,
                  "end": 566,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 12
                    },
                    "end": {
                      "line": 24,
                      "column": 29
                    }
                  },
                  "imported": {
                    "type": "Identifier",
                    "start": 549,
                    "end": 555,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 12
                      },
                      "end": {
                        "line": 24,
                        "column": 18
                      }
                    },
                    "name": "export"
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 559,
                    "end": 566,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 22
                      },
                      "end": {
                        "line": 24,
                        "column": 29
                      }
                    },
                    "name": "export_"
                  }
                },
                {
                  "type": "ImportSpecifier",
                  "start": 580,
                  "end": 595,
                  "loc": {
                    "start": {
                      "line": 25,
                      "column": 12
                    },
                    "end": {
                      "line": 25,
                      "column": 27
                    }
                  },
                  "imported": {
                    "type": "Identifier",
                    "start": 580,
                    "end": 585,
                    "loc": {
                      "start": {
                        "line": 25,
                        "column": 12
                      },
                      "end": {
                        "line": 25,
                        "column": 17
                      }
                    },
                    "name": "await"
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 589,
                    "end": 595,
                    "loc": {
                      "start": {
                        "line": 25,
                        "column": 21
                      },
                      "end": {
                        "line": 25,
                        "column": 27
                      }
                    },
                    "name": "await_"
                  }
                },
                {
                  "type": "ImportSpecifier",
                  "start": 609,
                  "end": 632,
                  "loc": {
                    "start": {
                      "line": 26,
                      "column": 12
                    },
                    "end": {
                      "line": 26,
                      "column": 35
                    }
                  },
                  "imported": {
                    "type": "Identifier",
                    "start": 609,
                    "end": 618,
                    "loc": {
                      "start": {
                        "line": 26,
                        "column": 12
                      },
                      "end": {
                        "line": 26,
                        "column": 21
                      }
                    },
                    "name": "arguments"
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 622,
                    "end": 632,
                    "loc": {
                      "start": {
                        "line": 26,
                        "column": 25
                      },
                      "end": {
                        "line": 26,
                        "column": 35
                      }
                    },
                    "name": "arguments_"
                  }
                },
                {
                  "type": "ImportSpecifier",
                  "start": 646,
                  "end": 659,
                  "loc": {
                    "start": {
                      "line": 27,
                      "column": 12
                    },
                    "end": {
                      "line": 27,
                      "column": 25
                    }
                  },
                  "imported": {
                    "type": "Identifier",
                    "start": 646,
                    "end": 650,
                    "loc": {
                      "start": {
                        "line": 27,
                        "column": 12
                      },
                      "end": {
                        "line": 27,
                        "column": 16
                      }
                    },
                    "name": "eval"
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 654,
                    "end": 659,
                    "loc": {
                      "start": {
                        "line": 27,
                        "column": 20
                      },
                      "end": {
                        "line": 27,
                        "column": 25
                      }
                    },
                    "name": "eval_"
                  }
                },
                {
                  "type": "ImportSpecifier",
                  "start": 673,
                  "end": 692,
                  "loc": {
                    "start": {
                      "line": 28,
                      "column": 12
                    },
                    "end": {
                      "line": 28,
                      "column": 31
                    }
                  },
                  "imported": {
                    "type": "Identifier",
                    "start": 673,
                    "end": 680,
                    "loc": {
                      "start": {
                        "line": 28,
                        "column": 12
                      },
                      "end": {
                        "line": 28,
                        "column": 19
                      }
                    },
                    "name": "default"
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 684,
                    "end": 692,
                    "loc": {
                      "start": {
                        "line": 28,
                        "column": 23
                      },
                      "end": {
                        "line": 28,
                        "column": 31
                      }
                    },
                    "name": "default_"
                  }
                },
                {
                  "type": "ImportSpecifier",
                  "start": 706,
                  "end": 714,
                  "loc": {
                    "start": {
                      "line": 29,
                      "column": 12
                    },
                    "end": {
                      "line": 29,
                      "column": 20
                    }
                  },
                  "imported": {
                    "type": "Identifier",
                    "start": 706,
                    "end": 708,
                    "loc": {
                      "start": {
                        "line": 29,
                        "column": 12
                      },
                      "end": {
                        "line": 29,
                        "column": 14
                      }
                    },
                    "name": "as"
                  },
                  "local": {
                    "type": "Identifier",
                    "start": 712,
                    "end": 714,
                    "loc": {
                      "start": {
                        "line": 29,
                        "column": 18
                      },
                      "end": {
                        "line": 29,
                        "column": 20
                      }
                    },
                    "name": "as"
                  }
                }
              ],
              "source": {
                "type": "Literal",
                "start": 732,
                "end": 758,
                "loc": {
                  "start": {
                    "line": 30,
                    "column": 17
                  },
                  "end": {
                    "line": 30,
                    "column": 43
                  }
                },
                "value": "./instn-named-id-name.js",
                "raw": "'./instn-named-id-name.js'"
              }
            }
          ],
          "sourceType": "module"
        });
      });

      
      it('should parse "export {with} from "a""', () => {
        expect(parseModule(`export {with} from "a"`, {
            ranges: true,
            raw: true,
            locations: true
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
                "type": "ExportNamedDeclaration",
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
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 12
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "name": "with"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "name": "with"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 19,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "value": "a",
                  "raw": "\"a\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "export {a,} from "a""', () => {
        expect(parseModule(`export {a,} from "a"`, {
            ranges: true,
            raw: true,
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
                "type": "ExportNamedDeclaration",
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
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "a"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
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
                  "value": "a",
                  "raw": "\"a\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "export {with as a} from "a""', () => {
        expect(parseModule(`export {with as a} from "a"`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "name": "with"
                    },
                    "exported": {
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
                      "name": "a"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 24,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "value": "a",
                  "raw": "\"a\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "export {as as as} from "as""', () => {
        expect(parseModule(`export {as as as} from "as"`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 27,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 27,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 16,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "as"
                    },
                    "exported": {
                      "type": "Identifier",
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
                      "name": "as"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 23,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 23
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "value": "as",
                  "raw": "\"as\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "export {a} from "m""', () => {
        expect(parseModule(`export {a} from "m"`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 19
              }
            },
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 19,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 19
                  }
                },
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "a"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
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
                  "value": "m",
                  "raw": "\"m\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "export {if as var} from "a";"', () => {
        expect(parseModule(`export {if as var} from "a";`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 28,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 28
              }
            },
            "body": [
              {
                "type": "ExportNamedDeclaration",
                "start": 0,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 28
                  }
                },
                "declaration": null,
                "specifiers": [
                  {
                    "type": "ExportSpecifier",
                    "start": 8,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "local": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "if"
                    },
                    "exported": {
                      "type": "Identifier",
                      "start": 14,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "name": "var"
                    }
                  }
                ],
                "source": {
                  "type": "Literal",
                  "start": 24,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "value": "a",
                  "raw": "\"a\""
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "export var a = 0, b;"', () => {
        expect(parseModule(`export var a = 0, b;`, {
            ranges: true,
            raw: true,
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
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
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
                      "id": {
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
                      "init": {
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
                    },
                    {
                      "type": "VariableDeclarator",
                      "start": 18,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 19
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 18,
                        "end": 19,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 19
                          }
                        },
                        "name": "b"
                      },
                      "init": null
                    }
                  ],
                  "kind": "var"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "export const a = 0, b = 0;"', () => {
        expect(parseModule(`export const a = 0, b = 0;`, {
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
            "body": [
              {
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 26,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 13,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "id": {
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
                      },
                      "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      }
                    },
                    {
                      "type": "VariableDeclarator",
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
                      "id": {
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
                        "name": "b"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 24,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 24
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "const"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse "export let a = 0, b = 0;"', () => {
        expect(parseModule(`export let a = 0, b = 0;`, {
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
                "type": "ExportNamedDeclaration",
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
                "declaration": {
                  "type": "VariableDeclaration",
                  "start": 7,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
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
                      "id": {
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
                      "init": {
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
                    },
                    {
                      "type": "VariableDeclarator",
                      "start": 18,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 18,
                        "end": 19,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 19
                          }
                        },
                        "name": "b"
                      },
                      "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                      }
                    }
                  ],
                  "kind": "let"
                },
                "specifiers": [],
                "source": null
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse edge case', () => {
      expect(parseModule(`export { as as as };`, {
          ranges: true,
          raw: true,
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
            "type": "ExportNamedDeclaration",
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
            "declaration": null,
            "specifiers": [
              {
                "type": "ExportSpecifier",
                "start": 9,
                "end": 17,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 9
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "local": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 11
                    }
                  },
                  "name": "as"
                },
                "exported": {
                  "type": "Identifier",
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
                  "name": "as"
                }
              }
            ],
            "source": null
          }
        ],
        "sourceType": "module"
      });
    });
  
  });