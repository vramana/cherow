import { pass, fail } from '../utils';

describe('Miscellaneous - JSX', () => {
  
  fail(`adjacent JSX elements not wrapped in an enclosing tag`, {
    source: `<div>one</div><div>two</div>`,
    jsx: true
});

fail(`</>`, {
  source: `</>`,
  jsx: true
});

fail(`<foo.bar></foo.baz>`, {
  source: `<foo.bar></foo.baz>`,
  jsx: true
});

fail(`<a b=: />`, {
  source: `<a b=: />`,
  jsx: true
});

fail(`node = <strong></em>`, {
  source: `node = <strong></em>`,
  jsx: true
});

fail(`<foo bar={} />`, {
  source: `<foo bar={} />`,
  jsx: true
});

fail(`<Foo bar=bar() />`, {
  source: `<Foo bar=bar() />`,
  jsx: true});

fail(`<dd><e></e></dddd>;`, {
  source: `<dd><e></e></dddd>;`,
  jsx: true
});

fail(`<a[foo]></a[foo]>`, {
  source: `<a[foo]></a[foo]>`,
  jsx: true
});

fail(`<div></span>`, {
  source: `<div></span>`,
  jsx: true
});

fail(`<div></span>`, {
  source: `<div></span>`,
  jsx: true
});

fail(`<something></>`, {
  source: `<something></>`,
  jsx: true
});

fail(`<></something>`, {
  source: `<></something>`,
  jsx: true
});

fail(`<something></>`, {
  source: `<something></>`,
  jsx: true
});

fail(`< key="nope"></>`, {
  source: `< key="nope"></>`,
  jsx: true
});
 
    pass(`<></>`, {
        source: '<></>',
        loc: true,
        ranges: true,
        raw: true,
        jsx: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXFragment",
                      "children": [],
                      "openingElement": {
                          "type": "JSXOpeningFragment",
                          "start": 0,
                          "end": 2,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 1
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingFragment",
                          "start": 2,
                          "end": 5,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 5
                              }
                          }
                      },
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
                      }
                  },
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
                  }
              }
          ],
          "sourceType": "script",
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
          }
      }
    });

    pass(`<    ></   >`, {
        source: '<    ></   >',
        loc: true,
        ranges: true,
        raw: true,
        jsx: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXFragment",
                      "children": [],
                      "openingElement": {
                          "type": "JSXOpeningFragment",
                          "start": 0,
                          "end": 6,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 1
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingFragment",
                          "start": 6,
                          "end": 12,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 5
                              },
                              "end": {
                                  "line": 1,
                                  "column": 12
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
          "sourceType": "script",
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
    });

    pass(`< /*starting wrap*/ ></ /*ending wrap*/>;`, {
        source: '< /*starting wrap*/ ></ /*ending wrap*/>;',
        loc: true,
        ranges: true,
        jsx: true,
        raw: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXFragment",
                      "children": [],
                      "openingElement": {
                          "type": "JSXOpeningFragment",
                          "start": 0,
                          "end": 21,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 1
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingFragment",
                          "start": 21,
                          "end": 40,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 20
                              },
                              "end": {
                                  "line": 1,
                                  "column": 40
                              }
                          }
                      },
                      "start": 0,
                      "end": 40,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 40
                          }
                      }
                  },
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
                  }
              }
          ],
          "sourceType": "script",
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
          }
      }
    });

    pass(`<>hi</>;`, {
        source: '<>hi</>;',
        loc: true,
        ranges: true,
        raw: true,
        jsx: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXFragment",
                      "children": [
                          {
                              "type": "JSXText",
                              "value": "hi",
                              "start": 2,
                              "end": 4,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 1
                                  }
                              },
                              "raw": "hi"
                          }
                      ],
                      "openingElement": {
                          "type": "JSXOpeningFragment",
                          "start": 0,
                          "end": 2,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 1
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingFragment",
                          "start": 4,
                          "end": 7,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 7
                              }
                          }
                      },
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
                      }
                  },
                  "start": 0,
                  "end": 8,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 8
                      }
                  }
              }
          ],
          "sourceType": "script",
          "start": 0,
          "end": 8,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 8
              }
          }
      }
    });

    pass(`<><span>hi</span><div>bye</div></>;`, {
        source: '<><span>hi</span><div>bye</div></>;',
        loc: true,
        ranges: true,
        raw: true,
        jsx: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXFragment",
                      "children": [
                          {
                              "type": "JSXElement",
                              "children": [
                                  {
                                      "type": "JSXText",
                                      "value": "hi",
                                      "start": 8,
                                      "end": 10,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 7
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 7
                                          }
                                      },
                                      "raw": "hi"
                                  }
                              ],
                              "openingElement": {
                                  "type": "JSXOpeningElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "span",
                                      "start": 3,
                                      "end": 7,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 3
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 7
                                          }
                                      }
                                  },
                                  "attributes": [],
                                  "selfClosing": false,
                                  "start": 2,
                                  "end": 8,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 1
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 7
                                      }
                                  }
                              },
                              "closingElement": {
                                  "type": "JSXClosingElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "span",
                                      "start": 12,
                                      "end": 16,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 12
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 16
                                          }
                                      }
                                  },
                                  "start": 10,
                                  "end": 17,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 7
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 16
                                      }
                                  }
                              },
                              "start": 2,
                              "end": 17,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 16
                                  }
                              }
                          },
                          {
                              "type": "JSXElement",
                              "children": [
                                  {
                                      "type": "JSXText",
                                      "value": "bye",
                                      "start": 22,
                                      "end": 25,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 21
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 21
                                          }
                                      },
                                      "raw": "bye"
                                  }
                              ],
                              "openingElement": {
                                  "type": "JSXOpeningElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "div",
                                      "start": 18,
                                      "end": 21,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 18
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 21
                                          }
                                      }
                                  },
                                  "attributes": [],
                                  "selfClosing": false,
                                  "start": 17,
                                  "end": 22,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 16
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 21
                                      }
                                  }
                              },
                              "closingElement": {
                                  "type": "JSXClosingElement",
                                  "name": {
                                      "type": "JSXIdentifier",
                                      "name": "div",
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
                                      }
                                  },
                                  "start": 25,
                                  "end": 31,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 21
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 30
                                      }
                                  }
                              },
                              "start": 17,
                              "end": 31,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 16
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 30
                                  }
                              }
                          }
                      ],
                      "openingElement": {
                          "type": "JSXOpeningFragment",
                          "start": 0,
                          "end": 2,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 1
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingFragment",
                          "start": 31,
                          "end": 34,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 30
                              },
                              "end": {
                                  "line": 1,
                                  "column": 34
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
                  },
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
                  }
              }
          ],
          "sourceType": "script",
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
          }
      }
    });

    pass(`<svg:path/>`, {
        source: '<svg:path/>',
        loc: true,
        ranges: true,
        raw: true,
        jsx: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXElement",
                      "children": [],
                      "openingElement": {
                          "type": "JSXOpeningElement",
                          "name": {
                              "type": "JSXNamespacedName",
                              "namespace": {
                                  "type": "JSXIdentifier",
                                  "name": "svg",
                                  "start": 1,
                                  "end": 4,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 1
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 4
                                      }
                                  }
                              },
                              "name": {
                                  "type": "JSXIdentifier",
                                  "name": "path",
                                  "start": 5,
                                  "end": 9,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 5
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 9
                                      }
                                  }
                              },
                              "start": 1,
                              "end": 9,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 9
                                  }
                              }
                          },
                          "attributes": [],
                          "selfClosing": true,
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
                      "closingElement": null,
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
              }
          ],
          "sourceType": "script",
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
      }
    });

    pass(`<a>{}</a>`, {
        source: '<a>{}</a>',
        loc: true,
        ranges: true,
        jsx: true,
        raw: true,
        expected:{
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXElement",
                      "children": [
                          {
                              "type": "JSXExpressionContainer",
                              "expression": {
                                  "type": "JSXEmptyExpression",
                                  "start": 3,
                                  "end": 4,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 2
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 4
                                      }
                                  }
                              },
                              "start": 3,
                              "end": 5,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 4
                                  }
                              }
                          }
                      ],
                      "openingElement": {
                          "type": "JSXOpeningElement",
                          "name": {
                              "type": "JSXIdentifier",
                              "name": "a",
                              "start": 1,
                              "end": 2,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 2
                                  }
                              }
                          },
                          "attributes": [],
                          "selfClosing": false,
                          "start": 0,
                          "end": 3,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 2
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingElement",
                          "name": {
                              "type": "JSXIdentifier",
                              "name": "a",
                              "start": 7,
                              "end": 8,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 7
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 8
                                  }
                              }
                          },
                          "start": 5,
                          "end": 9,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 9
                              }
                          }
                      },
                      "start": 0,
                      "end": 9,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 9
                          }
                      }
                  },
                  "start": 0,
                  "end": 9,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 9
                      }
                  }
              }
          ],
          "sourceType": "script",
          "start": 0,
          "end": 9,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 9
              }
          }
      }
    });

    pass(`<Test.X></Test.X>`, {
        source: '<Test.X></Test.X>',
        loc: true,
        ranges: true,
        jsx: true,
        raw: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXElement",
                      "children": [],
                      "openingElement": {
                          "type": "JSXOpeningElement",
                          "name": {
                              "type": "JSXMemberExpression",
                              "object": {
                                  "type": "JSXIdentifier",
                                  "name": "Test",
                                  "start": 1,
                                  "end": 5,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 1
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 5
                                      }
                                  }
                              },
                              "property": {
                                  "type": "JSXIdentifier",
                                  "name": "X",
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
                                  }
                              },
                              "start": 1,
                              "end": 7,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 7
                                  }
                              }
                          },
                          "attributes": [],
                          "selfClosing": false,
                          "start": 0,
                          "end": 8,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 7
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingElement",
                          "name": {
                              "type": "JSXMemberExpression",
                              "object": {
                                  "type": "JSXIdentifier",
                                  "name": "Test",
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
                                  }
                              },
                              "property": {
                                  "type": "JSXIdentifier",
                                  "name": "X",
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
                                  }
                              },
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
                              }
                          },
                          "start": 8,
                          "end": 17,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 7
                              },
                              "end": {
                                  "line": 1,
                                  "column": 17
                              }
                          }
                      },
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
                      }
                  },
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
                  }
              }
          ],
          "sourceType": "script",
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
          }
      }
    });

    pass(`function*it(){  yield <a></a>; }`, {
        source: 'function*it(){  yield <a></a>; }',
        jsx: true,
        raw: true,
        expected: {
            "body": [
              {
                "async": false,
                "body": {
                  "body": [
                    {
                      "expression": {
                       "argument": {
                          "children": [],
                          "closingElement": {
                            "name": {
                              "name": "a",
                              "type": "JSXIdentifier"
                           },
                            "type": "JSXClosingElement"
                          },
                          "openingElement": {
                            "attributes": [],
                            "name": {
                              "name": "a",
                              "type": "JSXIdentifier"
                            },
                           "selfClosing": false,
                            "type": "JSXOpeningElement"
                          },
                          "type": "JSXElement"
                        },
                        "delegate": false,
                        "type": "YieldExpression"
                      },
                      "type": "ExpressionStatement"
                    }
                  ],
                  "type": "BlockStatement"
                },
                "expression": false,
                "generator": true,
                "id": {
                  "name": "it",
                  "type": "Identifier"
                },
               "params": [],
                "type": "FunctionDeclaration"
              }
            ],
            "sourceType": "script",
            "type": "Program"
          }
    });

    pass(`<this />`, {
        source: '<this />',
        ranges: true,
        jsx: true,
        expected: {
          "type": "Program",
          "start": 0,
          "end": 8,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 8,
              "expression": {
                "type": "JSXElement",
                "start": 0,
                "end": 8,
                "openingElement": {
                  "type": "JSXOpeningElement",
                  "start": 0,
                  "end": 8,
                  "attributes": [],
                  "name": {
                    "type": "JSXIdentifier",
                    "start": 1,
                    "end": 5,
                    "name": "this"
                  },
                  "selfClosing": true
                },
                "closingElement": null,
                "children": []
              }
            }
          ],
          "sourceType": "script"
        }
    });

    pass(`<div> prefix {...children} suffix </div>`, {
        source: '<div> prefix {...children} suffix </div>',
        loc: true,
        ranges: true,
        jsx: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "JSXElement",
                      "children": [
                          {
                              "type": "JSXText",
                              "value": " prefix ",
                              "start": 5,
                              "end": 13,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 4
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 4
                                  }
                              }
                          },
                          {
                              "type": "JSXSpreadChild",
                              "expression": {
                                  "type": "Identifier",
                                  "name": "children",
                                  "start": 17,
                                  "end": 25,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 25
                                      }
                                  }
                              },
                              "start": 14,
                              "end": 26,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 14
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 26
                                  }
                              }
                          },
                          {
                              "type": "JSXText",
                              "value": "suffix",
                              "start": 27,
                              "end": 33,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 27
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 26
                                  }
                              }
                          },
                          {
                              "type": "JSXText",
                              "value": " ",
                              "start": 33,
                              "end": 34,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 27
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 26
                                  }
                              }
                          }
                      ],
                      "openingElement": {
                          "type": "JSXOpeningElement",
                          "name": {
                              "type": "JSXIdentifier",
                              "name": "div",
                              "start": 1,
                              "end": 4,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 4
                                  }
                              }
                          },
                          "attributes": [],
                          "selfClosing": false,
                          "start": 0,
                          "end": 5,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 4
                              }
                          }
                      },
                      "closingElement": {
                          "type": "JSXClosingElement",
                          "name": {
                              "type": "JSXIdentifier",
                              "name": "div",
                              "start": 36,
                              "end": 39,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 36
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 39
                                  }
                              }
                          },
                          "start": 34,
                          "end": 40,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 27
                              },
                              "end": {
                                  "line": 1,
                                  "column": 40
                              }
                          }
                      },
                      "start": 0,
                      "end": 40,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 40
                          }
                      }
                  },
                  "start": 0,
                  "end": 40,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 40
                      }
                  }
              }
          ],
          "sourceType": "script",
          "start": 0,
          "end": 40,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 40
              }
          }
      }
    });

    pass(`<a:b><a:b></a:b></a:b>;`, {
        source: '<a:b><a:b></a:b></a:b>;',
        ranges: true,
        raw: true,
        jsx: true,
        expected: {
          "type": "Program",
          "start": 0,
          "end": 23,
          "body": [
            {
              "type": "ExpressionStatement",
              "start": 0,
              "end": 23,
              "expression": {
                "type": "JSXElement",
                "start": 0,
                "end": 22,
                "openingElement": {
                  "type": "JSXOpeningElement",
                  "start": 0,
                  "end": 5,
                  "attributes": [],
                  "name": {
                    "type": "JSXNamespacedName",
                    "start": 1,
                    "end": 4,
                    "namespace": {
                      "type": "JSXIdentifier",
                      "start": 1,
                      "end": 2,
                      "name": "a"
                    },
                    "name": {
                      "type": "JSXIdentifier",
                      "start": 3,
                      "end": 4,
                      "name": "b"
                    }
                  },
                  "selfClosing": false
                },
                "closingElement": {
                  "type": "JSXClosingElement",
                  "start": 16,
                  "end": 22,
                  "name": {
                    "type": "JSXNamespacedName",
                    "start": 18,
                    "end": 21,
                    "namespace": {
                      "type": "JSXIdentifier",
                      "start": 18,
                      "end": 19,
                      "name": "a"
                    },
                    "name": {
                      "type": "JSXIdentifier",
                      "start": 20,
                      "end": 21,
                      "name": "b"
                    }
                  }
                },
                "children": [
                  {
                    "type": "JSXElement",
                    "start": 5,
                    "end": 16,
                    "openingElement": {
                      "type": "JSXOpeningElement",
                      "start": 5,
                      "end": 10,
                      "attributes": [],
                      "name": {
                        "type": "JSXNamespacedName",
                        "start": 6,
                        "end": 9,
                        "namespace": {
                          "type": "JSXIdentifier",
                          "start": 6,
                          "end": 7,
                          "name": "a"
                        },
                        "name": {
                          "type": "JSXIdentifier",
                          "start": 8,
                          "end": 9,
                          "name": "b"
                        }
                      },
                      "selfClosing": false
                    },
                    "closingElement": {
                      "type": "JSXClosingElement",
                      "start": 10,
                      "end": 16,
                      "name": {
                        "type": "JSXNamespacedName",
                        "start": 12,
                        "end": 15,
                        "namespace": {
                          "type": "JSXIdentifier",
                          "start": 12,
                          "end": 13,
                          "name": "a"
                        },
                        "name": {
                          "type": "JSXIdentifier",
                          "start": 14,
                          "end": 15,
                          "name": "b"
                        }
                      }
                    },
                    "children": []
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        }
    });
});
