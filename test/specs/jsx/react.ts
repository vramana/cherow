import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('JSX - React', () => {

    it('should parse simple render', () => {
        expect(parseScript(`function render() {
            return [
               <div>One</div>,
               <div>Two</div>,
               <div>I am a snowflake!</div>
            ]
          }`, {
            jsx: true,
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "ArrayExpression",
                                    "elements": [
                                        {
                                            "type": "JSXElement",
                                            "children": [
                                                {
                                                    "type": "JSXText",
                                                    "value": "One",
                                                    "start": 61,
                                                    "end": 64,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 19
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 19
                                                        }
                                                    },
                                                    "raw": "One"
                                                }
                                            ],
                                            "openingElement": {
                                                "type": "JSXOpeningElement",
                                                "name": {
                                                    "type": "JSXIdentifier",
                                                    "name": "div",
                                                    "start": 57,
                                                    "end": 60,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 19
                                                        }
                                                    }
                                                },
                                                "attributes": [],
                                                "selfClosing": false,
                                                "start": 56,
                                                "end": 61,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 15
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "closingElement": {
                                                "type": "JSXClosingElement",
                                                "name": {
                                                    "type": "JSXIdentifier",
                                                    "name": "div",
                                                    "start": 66,
                                                    "end": 69,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 28
                                                        }
                                                    }
                                                },
                                                "start": 64,
                                                "end": 70,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 29
                                                    }
                                                }
                                            },
                                            "start": 56,
                                            "end": 70,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 29
                                                }
                                            }
                                        },
                                        {
                                            "type": "JSXElement",
                                            "children": [
                                                {
                                                    "type": "JSXText",
                                                    "value": "Two",
                                                    "start": 92,
                                                    "end": 95,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 19
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 19
                                                        }
                                                    },
                                                    "raw": "Two"
                                                }
                                            ],
                                            "openingElement": {
                                                "type": "JSXOpeningElement",
                                                "name": {
                                                    "type": "JSXIdentifier",
                                                    "name": "div",
                                                    "start": 88,
                                                    "end": 91,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 19
                                                        }
                                                    }
                                                },
                                                "attributes": [],
                                                "selfClosing": false,
                                                "start": 87,
                                                "end": 92,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 15
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "closingElement": {
                                                "type": "JSXClosingElement",
                                                "name": {
                                                    "type": "JSXIdentifier",
                                                    "name": "div",
                                                    "start": 97,
                                                    "end": 100,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 28
                                                        }
                                                    }
                                                },
                                                "start": 95,
                                                "end": 101,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 29
                                                    }
                                                }
                                            },
                                            "start": 87,
                                            "end": 101,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 29
                                                }
                                            }
                                        },
                                        {
                                            "type": "JSXElement",
                                            "children": [
                                                {
                                                    "type": "JSXText",
                                                    "value": "I am a snowflake!",
                                                    "start": 123,
                                                    "end": 140,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 19
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 19
                                                        }
                                                    },
                                                    "raw": "I am a snowflake!"
                                                }
                                            ],
                                            "openingElement": {
                                                "type": "JSXOpeningElement",
                                                "name": {
                                                    "type": "JSXIdentifier",
                                                    "name": "div",
                                                    "start": 119,
                                                    "end": 122,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 19
                                                        }
                                                    }
                                                },
                                                "attributes": [],
                                                "selfClosing": false,
                                                "start": 118,
                                                "end": 123,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 15
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "closingElement": {
                                                "type": "JSXClosingElement",
                                                "name": {
                                                    "type": "JSXIdentifier",
                                                    "name": "div",
                                                    "start": 142,
                                                    "end": 145,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 39
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 42
                                                        }
                                                    }
                                                },
                                                "start": 140,
                                                "end": 146,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 43
                                                    }
                                                }
                                            },
                                            "start": 118,
                                            "end": 146,
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 43
                                                }
                                            }
                                        }
                                    ],
                                    "start": 39,
                                    "end": 160,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 32,
                                "end": 160,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 172,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 7,
                                "column": 11
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "render",
                        "start": 9,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    },
                    "start": 0,
                    "end": 172,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 7,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 172,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 7,
                    "column": 11
                }
            }
        });
    });
    
    it('should parse static array', () => {
        expect(parseScript(`function render() {
            return React.createElement(
              "div",
              null,
              new StaticArray(React.createElement(
                "div",
                null,
                "One"
              ), React.createElement(
                "div",
                null,
                "Two"
              ), React.createElement(
                "div",
                null,
                "I am a snowflake!"
              ))
            );
          }`, {
            jsx: true,
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "object": {
                                            "type": "Identifier",
                                            "name": "React",
                                            "start": 39,
                                            "end": 44,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 24
                                                }
                                            }
                                        },
                                        "computed": false,
                                        "property": {
                                            "type": "Identifier",
                                            "name": "createElement",
                                            "start": 45,
                                            "end": 58,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 38
                                                }
                                            }
                                        },
                                        "start": 39,
                                        "end": 58,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 38
                                            }
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "Literal",
                                            "value": "div",
                                            "start": 74,
                                            "end": 79,
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
                                            "raw": "\"div\""
                                        },
                                        {
                                            "type": "Literal",
                                            "value": null,
                                            "start": 95,
                                            "end": 99,
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
                                            "raw": "null"
                                        },
                                        {
                                            "type": "NewExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "StaticArray",
                                                "start": 119,
                                                "end": 130,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 29
                                                    }
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "React",
                                                            "start": 131,
                                                            "end": 136,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 30
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 35
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "createElement",
                                                            "start": 137,
                                                            "end": 150,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 36
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 49
                                                                }
                                                            }
                                                        },
                                                        "start": 131,
                                                        "end": 150,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 30
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 49
                                                            }
                                                        }
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "Literal",
                                                            "value": "div",
                                                            "start": 168,
                                                            "end": 173,
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
                                                            "raw": "\"div\""
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "value": null,
                                                            "start": 191,
                                                            "end": 195,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 7,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 7,
                                                                    "column": 20
                                                                }
                                                            },
                                                            "raw": "null"
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "value": "One",
                                                            "start": 213,
                                                            "end": 218,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 21
                                                                }
                                                            },
                                                            "raw": "\"One\""
                                                        }
                                                    ],
                                                    "start": 131,
                                                    "end": 234,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 30
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 15
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "React",
                                                            "start": 236,
                                                            "end": 241,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 22
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "createElement",
                                                            "start": 242,
                                                            "end": 255,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 23
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 36
                                                                }
                                                            }
                                                        },
                                                        "start": 236,
                                                        "end": 255,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 17
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 36
                                                            }
                                                        }
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "Literal",
                                                            "value": "div",
                                                            "start": 273,
                                                            "end": 278,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 10,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 10,
                                                                    "column": 21
                                                                }
                                                            },
                                                            "raw": "\"div\""
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "value": null,
                                                            "start": 296,
                                                            "end": 300,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 11,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 11,
                                                                    "column": 20
                                                                }
                                                            },
                                                            "raw": "null"
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "value": "Two",
                                                            "start": 318,
                                                            "end": 323,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 12,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 12,
                                                                    "column": 21
                                                                }
                                                            },
                                                            "raw": "\"Two\""
                                                        }
                                                    ],
                                                    "start": 236,
                                                    "end": 339,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 17
                                                        },
                                                        "end": {
                                                            "line": 13,
                                                            "column": 15
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "React",
                                                            "start": 341,
                                                            "end": 346,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 13,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 13,
                                                                    "column": 22
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "createElement",
                                                            "start": 347,
                                                            "end": 360,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 13,
                                                                    "column": 23
                                                                },
                                                                "end": {
                                                                    "line": 13,
                                                                    "column": 36
                                                                }
                                                            }
                                                        },
                                                        "start": 341,
                                                        "end": 360,
                                                        "loc": {
                                                            "start": {
                                                                "line": 13,
                                                                "column": 17
                                                            },
                                                            "end": {
                                                                "line": 13,
                                                                "column": 36
                                                            }
                                                        }
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "Literal",
                                                            "value": "div",
                                                            "start": 378,
                                                            "end": 383,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 14,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 14,
                                                                    "column": 21
                                                                }
                                                            },
                                                            "raw": "\"div\""
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "value": null,
                                                            "start": 401,
                                                            "end": 405,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 15,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 15,
                                                                    "column": 20
                                                                }
                                                            },
                                                            "raw": "null"
                                                        },
                                                        {
                                                            "type": "Literal",
                                                            "value": "I am a snowflake!",
                                                            "start": 423,
                                                            "end": 442,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 16,
                                                                    "column": 16
                                                                },
                                                                "end": {
                                                                    "line": 16,
                                                                    "column": 35
                                                                }
                                                            },
                                                            "raw": "\"I am a snowflake!\""
                                                        }
                                                    ],
                                                    "start": 341,
                                                    "end": 458,
                                                    "loc": {
                                                        "start": {
                                                            "line": 13,
                                                            "column": 17
                                                        },
                                                        "end": {
                                                            "line": 17,
                                                            "column": 15
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 115,
                                            "end": 459,
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 17,
                                                    "column": 16
                                                }
                                            }
                                        }
                                    ],
                                    "start": 39,
                                    "end": 473,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 18,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 32,
                                "end": 474,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 18,
                                        "column": 14
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 486,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 19,
                                "column": 11
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "render",
                        "start": 9,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    },
                    "start": 0,
                    "end": 486,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 19,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 486,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 19,
                    "column": 11
                }
            }
        });
    });

    it('should parse logical expression', () => {
        expect(parseScript(`function render() {
            return React.createElement(
              "div",
              null,
              foo && new StaticArray(React.createElement(
                "div",
                null,
                "One"
              ), React.createElement(
                "div",
                null,
                "Two"
              ), React.createElement(
                "div",
                null,
                "I am a snowflake!"
              ))
            );
          }`, {
            jsx: true,
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "MemberExpression",
                                        "object": {
                                            "type": "Identifier",
                                            "name": "React",
                                            "start": 39,
                                            "end": 44,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 24
                                                }
                                            }
                                        },
                                        "computed": false,
                                        "property": {
                                            "type": "Identifier",
                                            "name": "createElement",
                                            "start": 45,
                                            "end": 58,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 38
                                                }
                                            }
                                        },
                                        "start": 39,
                                        "end": 58,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 38
                                            }
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "Literal",
                                            "value": "div",
                                            "start": 74,
                                            "end": 79,
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
                                            "raw": "\"div\""
                                        },
                                        {
                                            "type": "Literal",
                                            "value": null,
                                            "start": 95,
                                            "end": 99,
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
                                            "raw": "null"
                                        },
                                        {
                                            "type": "LogicalExpression",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "foo",
                                                "start": 115,
                                                "end": 118,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 17
                                                    }
                                                }
                                            },
                                            "right": {
                                                "type": "NewExpression",
                                                "callee": {
                                                    "type": "Identifier",
                                                    "name": "StaticArray",
                                                    "start": 126,
                                                    "end": 137,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 36
                                                        }
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "React",
                                                                "start": 138,
                                                                "end": 143,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 37
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 42
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "createElement",
                                                                "start": 144,
                                                                "end": 157,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 43
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 56
                                                                    }
                                                                }
                                                            },
                                                            "start": 138,
                                                            "end": 157,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 37
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 56
                                                                }
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "Literal",
                                                                "value": "div",
                                                                "start": 175,
                                                                "end": 180,
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
                                                                "raw": "\"div\""
                                                            },
                                                            {
                                                                "type": "Literal",
                                                                "value": null,
                                                                "start": 198,
                                                                "end": 202,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 7,
                                                                        "column": 16
                                                                    },
                                                                    "end": {
                                                                        "line": 7,
                                                                        "column": 20
                                                                    }
                                                                },
                                                                "raw": "null"
                                                            },
                                                            {
                                                                "type": "Literal",
                                                                "value": "One",
                                                                "start": 220,
                                                                "end": 225,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 16
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 21
                                                                    }
                                                                },
                                                                "raw": "\"One\""
                                                            }
                                                        ],
                                                        "start": 138,
                                                        "end": 241,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 37
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 15
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "React",
                                                                "start": 243,
                                                                "end": 248,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 17
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 22
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "createElement",
                                                                "start": 249,
                                                                "end": 262,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 23
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 36
                                                                    }
                                                                }
                                                            },
                                                            "start": 243,
                                                            "end": 262,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 36
                                                                }
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "Literal",
                                                                "value": "div",
                                                                "start": 280,
                                                                "end": 285,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 10,
                                                                        "column": 16
                                                                    },
                                                                    "end": {
                                                                        "line": 10,
                                                                        "column": 21
                                                                    }
                                                                },
                                                                "raw": "\"div\""
                                                            },
                                                            {
                                                                "type": "Literal",
                                                                "value": null,
                                                                "start": 303,
                                                                "end": 307,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 11,
                                                                        "column": 16
                                                                    },
                                                                    "end": {
                                                                        "line": 11,
                                                                        "column": 20
                                                                    }
                                                                },
                                                                "raw": "null"
                                                            },
                                                            {
                                                                "type": "Literal",
                                                                "value": "Two",
                                                                "start": 325,
                                                                "end": 330,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 12,
                                                                        "column": 16
                                                                    },
                                                                    "end": {
                                                                        "line": 12,
                                                                        "column": 21
                                                                    }
                                                                },
                                                                "raw": "\"Two\""
                                                            }
                                                        ],
                                                        "start": 243,
                                                        "end": 346,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 17
                                                            },
                                                            "end": {
                                                                "line": 13,
                                                                "column": 15
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "React",
                                                                "start": 348,
                                                                "end": 353,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 13,
                                                                        "column": 17
                                                                    },
                                                                    "end": {
                                                                        "line": 13,
                                                                        "column": 22
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "createElement",
                                                                "start": 354,
                                                                "end": 367,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 13,
                                                                        "column": 23
                                                                    },
                                                                    "end": {
                                                                        "line": 13,
                                                                        "column": 36
                                                                    }
                                                                }
                                                            },
                                                            "start": 348,
                                                            "end": 367,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 13,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 13,
                                                                    "column": 36
                                                                }
                                                            }
                                                        },
                                                        "arguments": [
                                                            {
                                                                "type": "Literal",
                                                                "value": "div",
                                                                "start": 385,
                                                                "end": 390,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 14,
                                                                        "column": 16
                                                                    },
                                                                    "end": {
                                                                        "line": 14,
                                                                        "column": 21
                                                                    }
                                                                },
                                                                "raw": "\"div\""
                                                            },
                                                            {
                                                                "type": "Literal",
                                                                "value": null,
                                                                "start": 408,
                                                                "end": 412,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 15,
                                                                        "column": 16
                                                                    },
                                                                    "end": {
                                                                        "line": 15,
                                                                        "column": 20
                                                                    }
                                                                },
                                                                "raw": "null"
                                                            },
                                                            {
                                                                "type": "Literal",
                                                                "value": "I am a snowflake!",
                                                                "start": 430,
                                                                "end": 449,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 16,
                                                                        "column": 16
                                                                    },
                                                                    "end": {
                                                                        "line": 16,
                                                                        "column": 35
                                                                    }
                                                                },
                                                                "raw": "\"I am a snowflake!\""
                                                            }
                                                        ],
                                                        "start": 348,
                                                        "end": 465,
                                                        "loc": {
                                                            "start": {
                                                                "line": 13,
                                                                "column": 17
                                                            },
                                                            "end": {
                                                                "line": 17,
                                                                "column": 15
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 122,
                                                "end": 466,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 21
                                                    },
                                                    "end": {
                                                        "line": 17,
                                                        "column": 16
                                                    }
                                                }
                                            },
                                            "operator": "&&",
                                            "start": 115,
                                            "end": 466,
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 17,
                                                    "column": 16
                                                }
                                            }
                                        }
                                    ],
                                    "start": 39,
                                    "end": 480,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 18,
                                            "column": 13
                                        }
                                    }
                                },
                                "start": 32,
                                "end": 481,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 18,
                                        "column": 14
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 493,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 19,
                                "column": 11
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "render",
                        "start": 9,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    },
                    "start": 0,
                    "end": 493,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 19,
                            "column": 11
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 493,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 19,
                    "column": 11
                }
            }
        });
    });

    it('should parse direct array return', () => {
        expect(parseScript(`function render() {
            return new StaticArray(React.createElement(
               "div",
               null,
               "One"
            ), React.createElement(
               "div",
               null,
               "Two"
            ), React.createElement(
               "div",
               null,
               "I am a snowflake!"
            ));
         }`, {
            jsx: true,
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "NewExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "StaticArray",
                                        "start": 43,
                                        "end": 54,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 23
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 34
                                            }
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "React",
                                                    "start": 55,
                                                    "end": 60,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 35
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 40
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "createElement",
                                                    "start": 61,
                                                    "end": 74,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 41
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 54
                                                        }
                                                    }
                                                },
                                                "start": 55,
                                                "end": 74,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 35
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 54
                                                    }
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Literal",
                                                    "value": "div",
                                                    "start": 91,
                                                    "end": 96,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 20
                                                        }
                                                    },
                                                    "raw": "\"div\""
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": null,
                                                    "start": 113,
                                                    "end": 117,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 19
                                                        }
                                                    },
                                                    "raw": "null"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": "One",
                                                    "start": 134,
                                                    "end": 139,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 20
                                                        }
                                                    },
                                                    "raw": "\"One\""
                                                }
                                            ],
                                            "start": 55,
                                            "end": 153,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 35
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 13
                                                }
                                            }
                                        },
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "React",
                                                    "start": 155,
                                                    "end": 160,
                                                    "loc": {
                                                        "start": {
                                                            "line": 6,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 6,
                                                            "column": 20
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "createElement",
                                                    "start": 161,
                                                    "end": 174,
                                                    "loc": {
                                                        "start": {
                                                            "line": 6,
                                                            "column": 21
                                                        },
                                                        "end": {
                                                            "line": 6,
                                                            "column": 34
                                                        }
                                                    }
                                                },
                                                "start": 155,
                                                "end": 174,
                                                "loc": {
                                                    "start": {
                                                        "line": 6,
                                                        "column": 15
                                                    },
                                                    "end": {
                                                        "line": 6,
                                                        "column": 34
                                                    }
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Literal",
                                                    "value": "div",
                                                    "start": 191,
                                                    "end": 196,
                                                    "loc": {
                                                        "start": {
                                                            "line": 7,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 7,
                                                            "column": 20
                                                        }
                                                    },
                                                    "raw": "\"div\""
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": null,
                                                    "start": 213,
                                                    "end": 217,
                                                    "loc": {
                                                        "start": {
                                                            "line": 8,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 8,
                                                            "column": 19
                                                        }
                                                    },
                                                    "raw": "null"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": "Two",
                                                    "start": 234,
                                                    "end": 239,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 20
                                                        }
                                                    },
                                                    "raw": "\"Two\""
                                                }
                                            ],
                                            "start": 155,
                                            "end": 253,
                                            "loc": {
                                                "start": {
                                                    "line": 6,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 10,
                                                    "column": 13
                                                }
                                            }
                                        },
                                        {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "React",
                                                    "start": 255,
                                                    "end": 260,
                                                    "loc": {
                                                        "start": {
                                                            "line": 10,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 10,
                                                            "column": 20
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "createElement",
                                                    "start": 261,
                                                    "end": 274,
                                                    "loc": {
                                                        "start": {
                                                            "line": 10,
                                                            "column": 21
                                                        },
                                                        "end": {
                                                            "line": 10,
                                                            "column": 34
                                                        }
                                                    }
                                                },
                                                "start": 255,
                                                "end": 274,
                                                "loc": {
                                                    "start": {
                                                        "line": 10,
                                                        "column": 15
                                                    },
                                                    "end": {
                                                        "line": 10,
                                                        "column": 34
                                                    }
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Literal",
                                                    "value": "div",
                                                    "start": 291,
                                                    "end": 296,
                                                    "loc": {
                                                        "start": {
                                                            "line": 11,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 11,
                                                            "column": 20
                                                        }
                                                    },
                                                    "raw": "\"div\""
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": null,
                                                    "start": 313,
                                                    "end": 317,
                                                    "loc": {
                                                        "start": {
                                                            "line": 12,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 12,
                                                            "column": 19
                                                        }
                                                    },
                                                    "raw": "null"
                                                },
                                                {
                                                    "type": "Literal",
                                                    "value": "I am a snowflake!",
                                                    "start": 334,
                                                    "end": 353,
                                                    "loc": {
                                                        "start": {
                                                            "line": 13,
                                                            "column": 15
                                                        },
                                                        "end": {
                                                            "line": 13,
                                                            "column": 34
                                                        }
                                                    },
                                                    "raw": "\"I am a snowflake!\""
                                                }
                                            ],
                                            "start": 255,
                                            "end": 367,
                                            "loc": {
                                                "start": {
                                                    "line": 10,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 14,
                                                    "column": 13
                                                }
                                            }
                                        }
                                    ],
                                    "start": 39,
                                    "end": 368,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 14,
                                            "column": 14
                                        }
                                    }
                                },
                                "start": 32,
                                "end": 369,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 14,
                                        "column": 15
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 380,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 15,
                                "column": 10
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "render",
                        "start": 9,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    },
                    "start": 0,
                    "end": 380,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 15,
                            "column": 10
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 380,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 15,
                    "column": 10
                }
            }
        });
    });
});