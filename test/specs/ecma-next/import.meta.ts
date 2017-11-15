import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - Import meta', () => {

    it('should fail if "ariya" are used as property name', () => {
        expect(() => {
            parseModule('import.ariya', { next: true });
        }).to.throw();
    });

    it('should parse import meta with one dot and no assignment', () => {
        expect(parseModule(`import.meta;`, {
            ranges: true,
            locations: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "meta": {
                            "type": "Identifier",
                            "name": "import",
                            "start": 0,
                            "end": 6,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 6
                                }
                            }
                        },
                        "type": "MetaProperty",
                        "property": {
                            "type": "Identifier",
                            "name": "meta",
                            "start": 7,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
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
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "module",
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
            }
        });
    });

    it('should parse import meta with two dots and no assignments', () => {
        expect(parseModule(`import.meta.url;`, {
            ranges: true,
            locations: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "MemberExpression",
                        "object": {
                            "meta": {
                                "type": "Identifier",
                                "name": "import",
                                "start": 0,
                                "end": 6,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 0
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 6
                                    }
                                }
                            },
                            "type": "MetaProperty",
                            "property": {
                                "type": "Identifier",
                                "name": "meta",
                                "start": 7,
                                "end": 11,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 11
                                    }
                                }
                            },
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
                            }
                        },
                        "computed": false,
                        "property": {
                            "type": "Identifier",
                            "name": "url",
                            "start": 12,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "start": 0,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "module",
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
            }
        });
    });

    it('should parse import meta with two dots and boolean assignment', () => {
        expect(parseModule(`import.meta.couldBeMutable = true;`, {
            ranges: true,
            locations: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "MemberExpression",
                            "object": {
                                "meta": {
                                    "type": "Identifier",
                                    "name": "import",
                                    "start": 0,
                                    "end": 6,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 0
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 6
                                        }
                                    }
                                },
                                "type": "MetaProperty",
                                "property": {
                                    "type": "Identifier",
                                    "name": "meta",
                                    "start": 7,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                },
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
                                }
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "couldBeMutable",
                                "start": 12,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                }
                            },
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
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": true,
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
                            }
                        },
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
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "module",
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
            }
        });
    });

    it('should parse complex', () => {
        expect(parseModule(`(async () => {
            const response = await fetch(new URL("../hamsters.jpg", import.meta.url));
            const blob = await response.blob();

            const size = import.meta.scriptElement.dataset.size || 300;

            const image = new Image();
            image.src = URL.createObjectURL(blob);
            image.width = image.height = size;

            document.body.appendChild(image);
          })();`, {
            ranges: true,
            locations: true,
            next: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "CallExpression",
                        "callee": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "VariableDeclaration",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "init": {
                                                    "type": "AwaitExpression",
                                                    "argument": {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "Identifier",
                                                            "name": "fetch",
                                                            "start": 50,
                                                            "end": 55,
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
                                                        "arguments": [
                                                            {
                                                                "type": "NewExpression",
                                                                "callee": {
                                                                    "type": "Identifier",
                                                                    "name": "URL",
                                                                    "start": 60,
                                                                    "end": 63,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 2,
                                                                            "column": 45
                                                                        },
                                                                        "end": {
                                                                            "line": 2,
                                                                            "column": 48
                                                                        }
                                                                    }
                                                                },
                                                                "arguments": [
                                                                    {
                                                                        "type": "Literal",
                                                                        "value": "../hamsters.jpg",
                                                                        "start": 64,
                                                                        "end": 81,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 49
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 66
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        "type": "MemberExpression",
                                                                        "object": {
                                                                            "meta": {
                                                                                "type": "Identifier",
                                                                                "name": "import",
                                                                                "start": 83,
                                                                                "end": 89,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 2,
                                                                                        "column": 68
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 2,
                                                                                        "column": 74
                                                                                    }
                                                                                }
                                                                            },
                                                                            "type": "MetaProperty",
                                                                            "property": {
                                                                                "type": "Identifier",
                                                                                "name": "meta",
                                                                                "start": 90,
                                                                                "end": 94,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 2,
                                                                                        "column": 75
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 2,
                                                                                        "column": 79
                                                                                    }
                                                                                }
                                                                            },
                                                                            "start": 83,
                                                                            "end": 94,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 68
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 79
                                                                                }
                                                                            }
                                                                        },
                                                                        "computed": false,
                                                                        "property": {
                                                                            "type": "Identifier",
                                                                            "name": "url",
                                                                            "start": 95,
                                                                            "end": 98,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 2,
                                                                                    "column": 80
                                                                                },
                                                                                "end": {
                                                                                    "line": 2,
                                                                                    "column": 83
                                                                                }
                                                                            }
                                                                        },
                                                                        "start": 83,
                                                                        "end": 98,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 2,
                                                                                "column": 68
                                                                            },
                                                                            "end": {
                                                                                "line": 2,
                                                                                "column": 83
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                "start": 56,
                                                                "end": 99,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 2,
                                                                        "column": 41
                                                                    },
                                                                    "end": {
                                                                        "line": 2,
                                                                        "column": 84
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 50,
                                                        "end": 100,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 35
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 85
                                                            }
                                                        }
                                                    },
                                                    "start": 44,
                                                    "end": 100,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 29
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 85
                                                        }
                                                    }
                                                },
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": "response",
                                                    "start": 33,
                                                    "end": 41,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 26
                                                        }
                                                    }
                                                },
                                                "start": 33,
                                                "end": 100,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 85
                                                    }
                                                }
                                            }
                                        ],
                                        "kind": "const",
                                        "start": 27,
                                        "end": 101,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 86
                                            }
                                        }
                                    },
                                    {
                                        "type": "VariableDeclaration",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "init": {
                                                    "type": "AwaitExpression",
                                                    "argument": {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "Identifier",
                                                                "name": "response",
                                                                "start": 133,
                                                                "end": 141,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 3,
                                                                        "column": 31
                                                                    },
                                                                    "end": {
                                                                        "line": 3,
                                                                        "column": 39
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "blob",
                                                                "start": 142,
                                                                "end": 146,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 3,
                                                                        "column": 40
                                                                    },
                                                                    "end": {
                                                                        "line": 3,
                                                                        "column": 44
                                                                    }
                                                                }
                                                            },
                                                            "start": 133,
                                                            "end": 146,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 3,
                                                                    "column": 31
                                                                },
                                                                "end": {
                                                                    "line": 3,
                                                                    "column": 44
                                                                }
                                                            }
                                                        },
                                                        "arguments": [],
                                                        "start": 133,
                                                        "end": 148,
                                                        "loc": {
                                                            "start": {
                                                                "line": 3,
                                                                "column": 31
                                                            },
                                                            "end": {
                                                                "line": 3,
                                                                "column": 46
                                                            }
                                                        }
                                                    },
                                                    "start": 127,
                                                    "end": 148,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 46
                                                        }
                                                    }
                                                },
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": "blob",
                                                    "start": 120,
                                                    "end": 124,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 22
                                                        }
                                                    }
                                                },
                                                "start": 120,
                                                "end": 148,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 46
                                                    }
                                                }
                                            }
                                        ],
                                        "kind": "const",
                                        "start": 114,
                                        "end": 149,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 47
                                            }
                                        }
                                    },
                                    {
                                        "type": "VariableDeclaration",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "init": {
                                                    "type": "LogicalExpression",
                                                    "left": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "meta": {
                                                                        "type": "Identifier",
                                                                        "name": "import",
                                                                        "start": 176,
                                                                        "end": 182,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 5,
                                                                                "column": 25
                                                                            },
                                                                            "end": {
                                                                                "line": 5,
                                                                                "column": 31
                                                                            }
                                                                        }
                                                                    },
                                                                    "type": "MetaProperty",
                                                                    "property": {
                                                                        "type": "Identifier",
                                                                        "name": "meta",
                                                                        "start": 183,
                                                                        "end": 187,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 5,
                                                                                "column": 32
                                                                            },
                                                                            "end": {
                                                                                "line": 5,
                                                                                "column": 36
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 176,
                                                                    "end": 187,
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
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "scriptElement",
                                                                    "start": 188,
                                                                    "end": 201,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 5,
                                                                            "column": 37
                                                                        },
                                                                        "end": {
                                                                            "line": 5,
                                                                            "column": 50
                                                                        }
                                                                    }
                                                                },
                                                                "start": 176,
                                                                "end": 201,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 25
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 50
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "dataset",
                                                                "start": 202,
                                                                "end": 209,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 51
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 58
                                                                    }
                                                                }
                                                            },
                                                            "start": 176,
                                                            "end": 209,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 25
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 58
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "size",
                                                            "start": 210,
                                                            "end": 214,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 59
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 63
                                                                }
                                                            }
                                                        },
                                                        "start": 176,
                                                        "end": 214,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 25
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 63
                                                            }
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "Literal",
                                                        "value": 300,
                                                        "start": 218,
                                                        "end": 221,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 67
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 70
                                                            }
                                                        }
                                                    },
                                                    "operator": "||",
                                                    "start": 176,
                                                    "end": 221,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 25
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 70
                                                        }
                                                    }
                                                },
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": "size",
                                                    "start": 169,
                                                    "end": 173,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 22
                                                        }
                                                    }
                                                },
                                                "start": 169,
                                                "end": 221,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 70
                                                    }
                                                }
                                            }
                                        ],
                                        "kind": "const",
                                        "start": 163,
                                        "end": 222,
                                        "loc": {
                                            "start": {
                                                "line": 5,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 5,
                                                "column": 71
                                            }
                                        }
                                    },
                                    {
                                        "type": "VariableDeclaration",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "init": {
                                                    "type": "NewExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "Image",
                                                        "start": 254,
                                                        "end": 259,
                                                        "loc": {
                                                            "start": {
                                                                "line": 7,
                                                                "column": 30
                                                            },
                                                            "end": {
                                                                "line": 7,
                                                                "column": 35
                                                            }
                                                        }
                                                    },
                                                    "arguments": [],
                                                    "start": 250,
                                                    "end": 261,
                                                    "loc": {
                                                        "start": {
                                                            "line": 7,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 7,
                                                            "column": 37
                                                        }
                                                    }
                                                },
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": "image",
                                                    "start": 242,
                                                    "end": 247,
                                                    "loc": {
                                                        "start": {
                                                            "line": 7,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 7,
                                                            "column": 23
                                                        }
                                                    }
                                                },
                                                "start": 242,
                                                "end": 261,
                                                "loc": {
                                                    "start": {
                                                        "line": 7,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 7,
                                                        "column": 37
                                                    }
                                                }
                                            }
                                        ],
                                        "kind": "const",
                                        "start": 236,
                                        "end": 262,
                                        "loc": {
                                            "start": {
                                                "line": 7,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 7,
                                                "column": 38
                                            }
                                        }
                                    },
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "left": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "image",
                                                    "start": 275,
                                                    "end": 280,
                                                    "loc": {
                                                        "start": {
                                                            "line": 8,
                                                            "column": 12
                                                        },
                                                        "end": {
                                                            "line": 8,
                                                            "column": 17
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "src",
                                                    "start": 281,
                                                    "end": 284,
                                                    "loc": {
                                                        "start": {
                                                            "line": 8,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 8,
                                                            "column": 21
                                                        }
                                                    }
                                                },
                                                "start": 275,
                                                "end": 284,
                                                "loc": {
                                                    "start": {
                                                        "line": 8,
                                                        "column": 12
                                                    },
                                                    "end": {
                                                        "line": 8,
                                                        "column": 21
                                                    }
                                                }
                                            },
                                            "operator": "=",
                                            "right": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "URL",
                                                        "start": 287,
                                                        "end": 290,
                                                        "loc": {
                                                            "start": {
                                                                "line": 8,
                                                                "column": 24
                                                            },
                                                            "end": {
                                                                "line": 8,
                                                                "column": 27
                                                            }
                                                        }
                                                    },
                                                    "computed": false,
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "createObjectURL",
                                                        "start": 291,
                                                        "end": 306,
                                                        "loc": {
                                                            "start": {
                                                                "line": 8,
                                                                "column": 28
                                                            },
                                                            "end": {
                                                                "line": 8,
                                                                "column": 43
                                                            }
                                                        }
                                                    },
                                                    "start": 287,
                                                    "end": 306,
                                                    "loc": {
                                                        "start": {
                                                            "line": 8,
                                                            "column": 24
                                                        },
                                                        "end": {
                                                            "line": 8,
                                                            "column": 43
                                                        }
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "blob",
                                                        "start": 307,
                                                        "end": 311,
                                                        "loc": {
                                                            "start": {
                                                                "line": 8,
                                                                "column": 44
                                                            },
                                                            "end": {
                                                                "line": 8,
                                                                "column": 48
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 287,
                                                "end": 312,
                                                "loc": {
                                                    "start": {
                                                        "line": 8,
                                                        "column": 24
                                                    },
                                                    "end": {
                                                        "line": 8,
                                                        "column": 49
                                                    }
                                                }
                                            },
                                            "start": 275,
                                            "end": 312,
                                            "loc": {
                                                "start": {
                                                    "line": 8,
                                                    "column": 12
                                                },
                                                "end": {
                                                    "line": 8,
                                                    "column": 49
                                                }
                                            }
                                        },
                                        "start": 275,
                                        "end": 313,
                                        "loc": {
                                            "start": {
                                                "line": 8,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 8,
                                                "column": 50
                                            }
                                        }
                                    },
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "left": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "image",
                                                    "start": 326,
                                                    "end": 331,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 12
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 17
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "width",
                                                    "start": 332,
                                                    "end": 337,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 18
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 23
                                                        }
                                                    }
                                                },
                                                "start": 326,
                                                "end": 337,
                                                "loc": {
                                                    "start": {
                                                        "line": 9,
                                                        "column": 12
                                                    },
                                                    "end": {
                                                        "line": 9,
                                                        "column": 23
                                                    }
                                                }
                                            },
                                            "operator": "=",
                                            "right": {
                                                "type": "AssignmentExpression",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "image",
                                                        "start": 340,
                                                        "end": 345,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 26
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 31
                                                            }
                                                        }
                                                    },
                                                    "computed": false,
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "height",
                                                        "start": 346,
                                                        "end": 352,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 32
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 38
                                                            }
                                                        }
                                                    },
                                                    "start": 340,
                                                    "end": 352,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 38
                                                        }
                                                    }
                                                },
                                                "operator": "=",
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "size",
                                                    "start": 355,
                                                    "end": 359,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 41
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 45
                                                        }
                                                    }
                                                },
                                                "start": 340,
                                                "end": 359,
                                                "loc": {
                                                    "start": {
                                                        "line": 9,
                                                        "column": 26
                                                    },
                                                    "end": {
                                                        "line": 9,
                                                        "column": 45
                                                    }
                                                }
                                            },
                                            "start": 326,
                                            "end": 359,
                                            "loc": {
                                                "start": {
                                                    "line": 9,
                                                    "column": 12
                                                },
                                                "end": {
                                                    "line": 9,
                                                    "column": 45
                                                }
                                            }
                                        },
                                        "start": 326,
                                        "end": 360,
                                        "loc": {
                                            "start": {
                                                "line": 9,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 9,
                                                "column": 46
                                            }
                                        }
                                    },
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "MemberExpression",
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "document",
                                                        "start": 374,
                                                        "end": 382,
                                                        "loc": {
                                                            "start": {
                                                                "line": 11,
                                                                "column": 12
                                                            },
                                                            "end": {
                                                                "line": 11,
                                                                "column": 20
                                                            }
                                                        }
                                                    },
                                                    "computed": false,
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "body",
                                                        "start": 383,
                                                        "end": 387,
                                                        "loc": {
                                                            "start": {
                                                                "line": 11,
                                                                "column": 21
                                                            },
                                                            "end": {
                                                                "line": 11,
                                                                "column": 25
                                                            }
                                                        }
                                                    },
                                                    "start": 374,
                                                    "end": 387,
                                                    "loc": {
                                                        "start": {
                                                            "line": 11,
                                                            "column": 12
                                                        },
                                                        "end": {
                                                            "line": 11,
                                                            "column": 25
                                                        }
                                                    }
                                                },
                                                "computed": false,
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "appendChild",
                                                    "start": 388,
                                                    "end": 399,
                                                    "loc": {
                                                        "start": {
                                                            "line": 11,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 11,
                                                            "column": 37
                                                        }
                                                    }
                                                },
                                                "start": 374,
                                                "end": 399,
                                                "loc": {
                                                    "start": {
                                                        "line": 11,
                                                        "column": 12
                                                    },
                                                    "end": {
                                                        "line": 11,
                                                        "column": 37
                                                    }
                                                }
                                            },
                                            "arguments": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "image",
                                                    "start": 400,
                                                    "end": 405,
                                                    "loc": {
                                                        "start": {
                                                            "line": 11,
                                                            "column": 38
                                                        },
                                                        "end": {
                                                            "line": 11,
                                                            "column": 43
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 374,
                                            "end": 406,
                                            "loc": {
                                                "start": {
                                                    "line": 11,
                                                    "column": 12
                                                },
                                                "end": {
                                                    "line": 11,
                                                    "column": 44
                                                }
                                            }
                                        },
                                        "start": 374,
                                        "end": 407,
                                        "loc": {
                                            "start": {
                                                "line": 11,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 11,
                                                "column": 45
                                            }
                                        }
                                    }
                                ],
                                "start": 13,
                                "end": 419,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 12,
                                        "column": 11
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "start": 1,
                            "end": 419,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 12,
                                    "column": 11
                                }
                            }
                        },
                        "arguments": [],
                        "start": 0,
                        "end": 422,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 12,
                                "column": 14
                            }
                        }
                    },
                    "start": 0,
                    "end": 423,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 12,
                            "column": 15
                        }
                    }
                }
            ],
            "sourceType": "module",
            "start": 0,
            "end": 423,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 12,
                    "column": 15
                }
            }
        });
    });
});