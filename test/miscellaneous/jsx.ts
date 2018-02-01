import { pass, fail } from '../utils';

describe('Miscellaneous - JSX', () => {

  fail(`adjacent JSX elements not wrapped in an enclosing tag`, {
    source: `<div>one</div><div>two</div>`,
    jsx: true,
    message: 'Unexpected token \'</\'',
    line: 1,
    column: 22,
    index: 24
});

  fail(`</>`, {
  source: `</>`,
  jsx: true,
  message: 'Unexpected token \'</\'',
  line: 1,
  column: 0,
  index: 2
});

  fail(`<foo.bar></foo.baz>`, {
  source: `<foo.bar></foo.baz>`,
  jsx: true,
  message: 'Expected corresponding JSX closing tag for foo.baz',
  line: 1,
  column: 0,
  index: 19
});

  fail(`<a b=: />`, {
  source: `<a b=: />`,
  jsx: true,
  message: 'Unexpected token',
  line: 1,
  column: 0,
  index: 6
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
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXFragment',
                      children: [],
                      openingElement: {
                          type: 'JSXOpeningFragment',
                          start: 0,
                          end: 2,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 1
                              }
                          }
                      },
                      closingElement: {
                          type: 'JSXClosingFragment',
                          start: 2,
                          end: 5,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 5
                              }
                          }
                      },
                      start: 0,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      }
                  },
                  start: 0,
                  end: 5,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 5
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 5,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 5
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
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXFragment',
                      children: [],
                      openingElement: {
                          type: 'JSXOpeningFragment',
                          start: 0,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 1
                              }
                          }
                      },
                      closingElement: {
                          type: 'JSXClosingFragment',
                          start: 6,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
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
          sourceType: 'script',
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
    });

  pass(`< /*starting wrap*/ ></ /*ending wrap*/>;`, {
        source: '< /*starting wrap*/ ></ /*ending wrap*/>;',
        loc: true,
        ranges: true,
        jsx: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXFragment',
                      children: [],
                      openingElement: {
                          type: 'JSXOpeningFragment',
                          start: 0,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 1
                              }
                          }
                      },
                      closingElement: {
                          type: 'JSXClosingFragment',
                          start: 21,
                          end: 40,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 20
                              },
                              end: {
                                  line: 1,
                                  column: 40
                              }
                          }
                      },
                      start: 0,
                      end: 40,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 40
                          }
                      }
                  },
                  start: 0,
                  end: 41,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 41
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 41,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 41
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
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXFragment',
                      children: [
                          {
                              type: 'JSXText',
                              value: 'hi',
                              start: 2,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 1
                                  }
                              },
                              raw: 'hi'
                          }
                      ],
                      openingElement: {
                          type: 'JSXOpeningFragment',
                          start: 0,
                          end: 2,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 1
                              }
                          }
                      },
                      closingElement: {
                          type: 'JSXClosingFragment',
                          start: 4,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          }
                      },
                      start: 0,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      }
                  },
                  start: 0,
                  end: 8,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 8
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 8,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 8
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
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXFragment',
                      children: [
                          {
                              type: 'JSXElement',
                              children: [
                                  {
                                      type: 'JSXText',
                                      value: 'hi',
                                      start: 8,
                                      end: 10,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 7
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      },
                                      raw: 'hi'
                                  }
                              ],
                              openingElement: {
                                  type: 'JSXOpeningElement',
                                  name: {
                                      type: 'JSXIdentifier',
                                      name: 'span',
                                      start: 3,
                                      end: 7,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 3
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      }
                                  },
                                  attributes: [],
                                  selfClosing: false,
                                  start: 2,
                                  end: 8,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  }
                              },
                              closingElement: {
                                  type: 'JSXClosingElement',
                                  name: {
                                      type: 'JSXIdentifier',
                                      name: 'span',
                                      start: 12,
                                      end: 16,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 12
                                          },
                                          end: {
                                              line: 1,
                                              column: 16
                                          }
                                      }
                                  },
                                  start: 10,
                                  end: 17,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 7
                                      },
                                      end: {
                                          line: 1,
                                          column: 16
                                      }
                                  }
                              },
                              start: 2,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 16
                                  }
                              }
                          },
                          {
                              type: 'JSXElement',
                              children: [
                                  {
                                      type: 'JSXText',
                                      value: 'bye',
                                      start: 22,
                                      end: 25,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 21
                                          },
                                          end: {
                                              line: 1,
                                              column: 21
                                          }
                                      },
                                      raw: 'bye'
                                  }
                              ],
                              openingElement: {
                                  type: 'JSXOpeningElement',
                                  name: {
                                      type: 'JSXIdentifier',
                                      name: 'div',
                                      start: 18,
                                      end: 21,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 18
                                          },
                                          end: {
                                              line: 1,
                                              column: 21
                                          }
                                      }
                                  },
                                  attributes: [],
                                  selfClosing: false,
                                  start: 17,
                                  end: 22,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 21
                                      }
                                  }
                              },
                              closingElement: {
                                  type: 'JSXClosingElement',
                                  name: {
                                      type: 'JSXIdentifier',
                                      name: 'div',
                                      start: 27,
                                      end: 30,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 27
                                          },
                                          end: {
                                              line: 1,
                                              column: 30
                                          }
                                      }
                                  },
                                  start: 25,
                                  end: 31,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 21
                                      },
                                      end: {
                                          line: 1,
                                          column: 30
                                      }
                                  }
                              },
                              start: 17,
                              end: 31,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 30
                                  }
                              }
                          }
                      ],
                      openingElement: {
                          type: 'JSXOpeningFragment',
                          start: 0,
                          end: 2,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 1
                              }
                          }
                      },
                      closingElement: {
                          type: 'JSXClosingFragment',
                          start: 31,
                          end: 34,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 30
                              },
                              end: {
                                  line: 1,
                                  column: 34
                              }
                          }
                      },
                      start: 0,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      }
                  },
                  start: 0,
                  end: 35,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 35
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 35,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 35
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
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXElement',
                      children: [],
                      openingElement: {
                          type: 'JSXOpeningElement',
                          name: {
                              type: 'JSXNamespacedName',
                              namespace: {
                                  type: 'JSXIdentifier',
                                  name: 'svg',
                                  start: 1,
                                  end: 4,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 4
                                      }
                                  }
                              },
                              name: {
                                  type: 'JSXIdentifier',
                                  name: 'path',
                                  start: 5,
                                  end: 9,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 9
                                      }
                                  }
                              },
                              start: 1,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              }
                          },
                          attributes: [],
                          selfClosing: true,
                          start: 0,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          }
                      },
                      closingElement: null,
                      start: 0,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      }
                  },
                  start: 0,
                  end: 11,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 11
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 11,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 11
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
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXElement',
                      children: [
                          {
                              type: 'JSXExpressionContainer',
                              expression: {
                                  type: 'JSXEmptyExpression',
                                  start: 3,
                                  end: 4,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 4
                                      }
                                  }
                              },
                              start: 3,
                              end: 5,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              }
                          }
                      ],
                      openingElement: {
                          type: 'JSXOpeningElement',
                          name: {
                              type: 'JSXIdentifier',
                              name: 'a',
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
                          attributes: [],
                          selfClosing: false,
                          start: 0,
                          end: 3,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 2
                              }
                          }
                      },
                      closingElement: {
                          type: 'JSXClosingElement',
                          name: {
                              type: 'JSXIdentifier',
                              name: 'a',
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
                          start: 5,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          }
                      },
                      start: 0,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      }
                  },
                  start: 0,
                  end: 9,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 9
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 9,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 9
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
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXElement',
                      children: [],
                      openingElement: {
                          type: 'JSXOpeningElement',
                          name: {
                              type: 'JSXMemberExpression',
                              object: {
                                  type: 'JSXIdentifier',
                                  name: 'Test',
                                  start: 1,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  }
                              },
                              property: {
                                  type: 'JSXIdentifier',
                                  name: 'X',
                                  start: 6,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 6
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  }
                              },
                              start: 1,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              }
                          },
                          attributes: [],
                          selfClosing: false,
                          start: 0,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          }
                      },
                      closingElement: {
                          type: 'JSXClosingElement',
                          name: {
                              type: 'JSXMemberExpression',
                              object: {
                                  type: 'JSXIdentifier',
                                  name: 'Test',
                                  start: 10,
                                  end: 14,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 10
                                      },
                                      end: {
                                          line: 1,
                                          column: 14
                                      }
                                  }
                              },
                              property: {
                                  type: 'JSXIdentifier',
                                  name: 'X',
                                  start: 15,
                                  end: 16,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 15
                                      },
                                      end: {
                                          line: 1,
                                          column: 16
                                      }
                                  }
                              },
                              start: 10,
                              end: 16,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 10
                                  },
                                  end: {
                                      line: 1,
                                      column: 16
                                  }
                              }
                          },
                          start: 8,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 7
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          }
                      },
                      start: 0,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      }
                  },
                  start: 0,
                  end: 17,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 17
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 17,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 17
              }
          }
      }
    });

  pass(`function*it(){  yield <a></a>; }`, {
        source: 'function*it(){  yield <a></a>; }',
        jsx: true,
        raw: true,
        expected: {
            body: [
              {
                async: false,
                body: {
                  body: [
                    {
                      expression: {
                       argument: {
                          children: [],
                          closingElement: {
                            name: {
                              name: 'a',
                              type: 'JSXIdentifier'
                           },
                            type: 'JSXClosingElement'
                          },
                          openingElement: {
                            attributes: [],
                            name: {
                              name: 'a',
                              type: 'JSXIdentifier'
                            },
                           selfClosing: false,
                            type: 'JSXOpeningElement'
                          },
                          type: 'JSXElement'
                        },
                        delegate: false,
                        type: 'YieldExpression'
                      },
                      type: 'ExpressionStatement'
                    }
                  ],
                  type: 'BlockStatement'
                },
                expression: false,
                generator: true,
                id: {
                  name: 'it',
                  type: 'Identifier'
                },
               params: [],
                type: 'FunctionDeclaration'
              }
            ],
            sourceType: 'script',
            type: 'Program'
          }
    });

  pass(`<this />`, {
        source: '<this />',
        ranges: true,
        jsx: true,
        expected: {
          type: 'Program',
          start: 0,
          end: 8,
          body: [
            {
              type: 'ExpressionStatement',
              start: 0,
              end: 8,
              expression: {
                type: 'JSXElement',
                start: 0,
                end: 8,
                openingElement: {
                  type: 'JSXOpeningElement',
                  start: 0,
                  end: 8,
                  attributes: [],
                  name: {
                    type: 'JSXIdentifier',
                    start: 1,
                    end: 5,
                    name: 'this'
                  },
                  selfClosing: true
                },
                closingElement: null,
                children: []
              }
            }
          ],
          sourceType: 'script'
        }
    });

  pass(`<div> prefix {...children} suffix </div>`, {
        source: '<div> prefix {...children} suffix </div>',
        loc: true,
        ranges: true,
        jsx: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'JSXElement',
                      children: [
                          {
                              type: 'JSXText',
                              value: ' prefix ',
                              start: 5,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 4
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              }
                          },
                          {
                              type: 'JSXSpreadChild',
                              expression: {
                                  type: 'Identifier',
                                  name: 'children',
                                  start: 17,
                                  end: 25,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 17
                                      },
                                      end: {
                                          line: 1,
                                          column: 25
                                      }
                                  }
                              },
                              start: 14,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              }
                          },
                          {
                              type: 'JSXText',
                              value: 'suffix',
                              start: 27,
                              end: 33,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 27
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              }
                          },
                          {
                              type: 'JSXText',
                              value: ' ',
                              start: 33,
                              end: 34,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 27
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              }
                          }
                      ],
                      openingElement: {
                          type: 'JSXOpeningElement',
                          name: {
                              type: 'JSXIdentifier',
                              name: 'div',
                              start: 1,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              }
                          },
                          attributes: [],
                          selfClosing: false,
                          start: 0,
                          end: 5,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 4
                              }
                          }
                      },
                      closingElement: {
                          type: 'JSXClosingElement',
                          name: {
                              type: 'JSXIdentifier',
                              name: 'div',
                              start: 36,
                              end: 39,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 36
                                  },
                                  end: {
                                      line: 1,
                                      column: 39
                                  }
                              }
                          },
                          start: 34,
                          end: 40,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 27
                              },
                              end: {
                                  line: 1,
                                  column: 40
                              }
                          }
                      },
                      start: 0,
                      end: 40,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 40
                          }
                      }
                  },
                  start: 0,
                  end: 40,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 40
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 40,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 40
              }
          }
      }
    });

  pass(`<span {... style}></span>`, {
        source: '<span {... style}></span>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXElement',
                        children: [],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'span',
                                start: 1,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            },
                            attributes: [
                                {
                                    type: 'JSXSpreadAttribute',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'style',
                                        start: 11,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    start: 6,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                }
                            ],
                            selfClosing: false,
                            start: 0,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'span',
                                start: 20,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            },
                            start: 18,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        start: 0,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 25,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 25
                }
            }
        }
    });

  pass(`<input disabled />`, {
        source: '<input disabled />',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXElement',
                        children: [],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'input',
                                start: 1,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            attributes: [
                                {
                                    type: 'JSXAttribute',
                                    value: null,
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'disabled',
                                        start: 7,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    start: 7,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                }
                            ],
                            selfClosing: true,
                            start: 0,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        closingElement: null,
                        start: 0,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 18,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 18
                }
            }
        }
    });

  pass(`<img width={320}/>`, {
        source: '<img width={320}/>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXElement',
                        children: [],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'img',
                                start: 1,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            attributes: [
                                {
                                    type: 'JSXAttribute',
                                    value: {
                                        type: 'JSXExpressionContainer',
                                        expression: {
                                            type: 'Literal',
                                            value: 320,
                                            start: 12,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            },
                                            raw: '320'
                                        },
                                        start: 11,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'width',
                                        start: 5,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
                                            }
                                        }
                                    },
                                    start: 5,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                }
                            ],
                            selfClosing: true,
                            start: 0,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        closingElement: null,
                        start: 0,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 18,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 18
                }
            }
        }
    });

  pass(`<img src='logo.png' />`, {
        source: '<img src="logo.png" />',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXElement',
                        children: [],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'img',
                                start: 1,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            attributes: [
                                {
                                    type: 'JSXAttribute',
                                    value: {
                                        type: 'Literal',
                                        value: 'logo.png',
                                        start: 9,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        },
                                        raw: '"logo.png"'
                                    },
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'src',
                                        start: 5,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    start: 5,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                }
                            ],
                            selfClosing: true,
                            start: 0,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        },
                        closingElement: null,
                        start: 0,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 22,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }
    });

  pass(`<b>{1}</b>`, {
        source: '<b>{1}</b>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXElement',
                        children: [
                            {
                                type: 'JSXExpressionContainer',
                                expression: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    raw: '1'
                                },
                                start: 3,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            }
                        ],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'b',
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
                            attributes: [],
                            selfClosing: false,
                            start: 0,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'b',
                                start: 8,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                }
                            },
                            start: 6,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 0,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 10,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 10
                }
            }
        }
    });

  pass(`"use strict"; <async />`, {
        source: '"use strict"; <async />',
        ranges: true,
        raw: true,
        directives: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
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
                        },
                        raw: '"use strict"'
                    },
                    directive: 'use strict',
                    start: 0,
                    end: 13,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXElement',
                        children: [],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'async',
                                start: 15,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            attributes: [],
                            selfClosing: true,
                            start: 14,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        closingElement: null,
                        start: 14,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 14,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 23
                }
            }
        }
    });

  pass(`var component = <Component {...props} />;`, {
        source: 'var component = <Component {...props} />;',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'JSXElement',
                                children: [],
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'Component',
                                        start: 17,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    attributes: [
                                        {
                                            type: 'JSXSpreadAttribute',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'props',
                                                start: 31,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                }
                                            },
                                            start: 27,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        }
                                    ],
                                    selfClosing: true,
                                    start: 16,
                                    end: 40,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 40
                                        }
                                    }
                                },
                                closingElement: null,
                                start: 16,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'component',
                                start: 4,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            },
                            start: 4,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 41,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }
    });

  pass(`<a:b></a:b>;`, {
        source: '<a:b></a:b>;',
        ranges: true,
        raw: true,
        jsx: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXElement',
                        children: [],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXNamespacedName',
                                namespace: {
                                    type: 'JSXIdentifier',
                                    name: 'a',
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
                                name: {
                                    type: 'JSXIdentifier',
                                    name: 'b',
                                    start: 3,
                                    end: 4,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 4
                                        }
                                    }
                                },
                                start: 1,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            attributes: [],
                            selfClosing: false,
                            start: 0,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 4
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingElement',
                            name: {
                                type: 'JSXNamespacedName',
                                namespace: {
                                    type: 'JSXIdentifier',
                                    name: 'a',
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
                                name: {
                                    type: 'JSXIdentifier',
                                    name: 'b',
                                    start: 9,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                },
                                start: 7,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            start: 5,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
                        start: 0,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 11
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
            sourceType: 'script',
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
    });

  pass(`<svg:path></svg:path>`, {
        source: '<svg:path></svg:path>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXElement',
                        children: [],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXNamespacedName',
                                namespace: {
                                    type: 'JSXIdentifier',
                                    name: 'svg',
                                    start: 1,
                                    end: 4,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 4
                                        }
                                    }
                                },
                                name: {
                                    type: 'JSXIdentifier',
                                    name: 'path',
                                    start: 5,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                start: 1,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                }
                            },
                            attributes: [],
                            selfClosing: false,
                            start: 0,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingElement',
                            name: {
                                type: 'JSXNamespacedName',
                                namespace: {
                                    type: 'JSXIdentifier',
                                    name: 'svg',
                                    start: 12,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                name: {
                                    type: 'JSXIdentifier',
                                    name: 'path',
                                    start: 16,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 20
                                        }
                                    }
                                },
                                start: 12,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            start: 10,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        start: 0,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    });

  pass(`<><span>1</span><><span>2.1</span><span>2.2</span></><span>3</span></>;`, {
        source: '<><span>1</span><><span>2.1</span><span>2.2</span></><span>3</span></>;',
        ranges: true,
        raw: true,
        jsx: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXFragment',
                        children: [
                            {
                                type: 'JSXElement',
                                children: [
                                    {
                                        type: 'JSXText',
                                        value: '1',
                                        start: 8,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        },
                                        raw: '1'
                                    }
                                ],
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'span',
                                        start: 3,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    attributes: [],
                                    selfClosing: false,
                                    start: 2,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'span',
                                        start: 11,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    start: 9,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                start: 2,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            },
                            {
                                type: 'JSXFragment',
                                children: [
                                    {
                                        type: 'JSXElement',
                                        children: [
                                            {
                                                type: 'JSXText',
                                                value: '2.1',
                                                start: 24,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 23
                                                    }
                                                },
                                                raw: '2.1'
                                            }
                                        ],
                                        openingElement: {
                                            type: 'JSXOpeningElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 19,
                                                end: 23,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 23
                                                    }
                                                }
                                            },
                                            attributes: [],
                                            selfClosing: false,
                                            start: 18,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            }
                                        },
                                        closingElement: {
                                            type: 'JSXClosingElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 29,
                                                end: 33,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 33
                                                    }
                                                }
                                            },
                                            start: 27,
                                            end: 34,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        start: 18,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    },
                                    {
                                        type: 'JSXElement',
                                        children: [
                                            {
                                                type: 'JSXText',
                                                value: '2.2',
                                                start: 40,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 39
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                },
                                                raw: '2.2'
                                            }
                                        ],
                                        openingElement: {
                                            type: 'JSXOpeningElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 35,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 35
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                }
                                            },
                                            attributes: [],
                                            selfClosing: false,
                                            start: 34,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        },
                                        closingElement: {
                                            type: 'JSXClosingElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 45,
                                                end: 49,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 45
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 49
                                                    }
                                                }
                                            },
                                            start: 43,
                                            end: 50,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            }
                                        },
                                        start: 34,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    }
                                ],
                                openingElement: {
                                    type: 'JSXOpeningFragment',
                                    start: 16,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingFragment',
                                    start: 50,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 49
                                        },
                                        end: {
                                            line: 1,
                                            column: 53
                                        }
                                    }
                                },
                                start: 16,
                                end: 53,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 53
                                    }
                                }
                            },
                            {
                                type: 'JSXElement',
                                children: [
                                    {
                                        type: 'JSXText',
                                        value: '3',
                                        start: 59,
                                        end: 60,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 58
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        },
                                        raw: '3'
                                    }
                                ],
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'span',
                                        start: 54,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 54
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        }
                                    },
                                    attributes: [],
                                    selfClosing: false,
                                    start: 53,
                                    end: 59,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 53
                                        },
                                        end: {
                                            line: 1,
                                            column: 58
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'span',
                                        start: 62,
                                        end: 66,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 62
                                            },
                                            end: {
                                                line: 1,
                                                column: 66
                                            }
                                        }
                                    },
                                    start: 60,
                                    end: 67,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 58
                                        },
                                        end: {
                                            line: 1,
                                            column: 66
                                        }
                                    }
                                },
                                start: 53,
                                end: 67,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 53
                                    },
                                    end: {
                                        line: 1,
                                        column: 66
                                    }
                                }
                            }
                        ],
                        openingElement: {
                            type: 'JSXOpeningFragment',
                            start: 0,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingFragment',
                            start: 67,
                            end: 70,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 66
                                },
                                end: {
                                    line: 1,
                                    column: 70
                                }
                            }
                        },
                        start: 0,
                        end: 70,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 70
                            }
                        }
                    },
                    start: 0,
                    end: 71,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 71
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 71,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 71
                }
            }
        }
    });

  pass(`<><span> hi </span> <div>bye</div> </>`, {
        source: '<><span> hi </span> <div>bye</div> </>',
        ranges: true,
        raw: true,
        jsx: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXFragment',
                        children: [
                            {
                                type: 'JSXElement',
                                children: [
                                    {
                                        type: 'JSXText',
                                        value: ' hi ',
                                        start: 8,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        },
                                        raw: ' hi '
                                    }
                                ],
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'span',
                                        start: 3,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    attributes: [],
                                    selfClosing: false,
                                    start: 2,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'span',
                                        start: 14,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    start: 12,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                start: 2,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            {
                                type: 'JSXText',
                                value: ' ',
                                start: 19,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                },
                                raw: ' '
                            },
                            {
                                type: 'JSXElement',
                                children: [
                                    {
                                        type: 'JSXText',
                                        value: 'bye',
                                        start: 25,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        },
                                        raw: 'bye'
                                    }
                                ],
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'div',
                                        start: 21,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    attributes: [],
                                    selfClosing: false,
                                    start: 20,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'div',
                                        start: 30,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    },
                                    start: 28,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                start: 20,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            },
                            {
                                type: 'JSXText',
                                value: ' ',
                                start: 34,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                },
                                raw: ' '
                            }
                        ],
                        openingElement: {
                            type: 'JSXOpeningFragment',
                            start: 0,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingFragment',
                            start: 35,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 33
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            }
                        },
                        start: 0,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        }
                    },
                    start: 0,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 38,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 38
                }
            }
        }
    });

  pass(`<a:b><a:b></a:b></a:b>;`, {
        source: `<
        // comment1
        /* comment2 */
        >
         <div></div>
          <div></div>
        </>`,
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'JSXFragment',
                        children: [
                            {
                                type: 'JSXText',
                                value: '\n         ',
                                start: 54,
                                end: 64,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 1
                                    }
                                },
                                raw: '\n         '
                            },
                            {
                                type: 'JSXElement',
                                children: [],
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'div',
                                        start: 65,
                                        end: 68,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 20
                                            },
                                            end: {
                                                line: 4,
                                                column: 23
                                            }
                                        }
                                    },
                                    attributes: [],
                                    selfClosing: false,
                                    start: 64,
                                    end: 69,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 8
                                        },
                                        end: {
                                            line: 4,
                                            column: 23
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'div',
                                        start: 71,
                                        end: 74,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 26
                                            },
                                            end: {
                                                line: 4,
                                                column: 29
                                            }
                                        }
                                    },
                                    start: 69,
                                    end: 75,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 23
                                        },
                                        end: {
                                            line: 4,
                                            column: 29
                                        }
                                    }
                                },
                                start: 64,
                                end: 75,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 8
                                    },
                                    end: {
                                        line: 4,
                                        column: 29
                                    }
                                }
                            },
                            {
                                type: 'JSXText',
                                value: '\n          ',
                                start: 75,
                                end: 86,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 29
                                    },
                                    end: {
                                        line: 4,
                                        column: 29
                                    }
                                },
                                raw: '\n          '
                            },
                            {
                                type: 'JSXElement',
                                children: [],
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'div',
                                        start: 87,
                                        end: 90,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 42
                                            },
                                            end: {
                                                line: 4,
                                                column: 45
                                            }
                                        }
                                    },
                                    attributes: [],
                                    selfClosing: false,
                                    start: 86,
                                    end: 91,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 29
                                        },
                                        end: {
                                            line: 4,
                                            column: 45
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'div',
                                        start: 93,
                                        end: 96,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 48
                                            },
                                            end: {
                                                line: 4,
                                                column: 51
                                            }
                                        }
                                    },
                                    start: 91,
                                    end: 97,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 45
                                        },
                                        end: {
                                            line: 4,
                                            column: 51
                                        }
                                    }
                                },
                                start: 86,
                                end: 97,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 29
                                    },
                                    end: {
                                        line: 4,
                                        column: 51
                                    }
                                }
                            },
                            {
                                type: 'JSXText',
                                value: '\n        ',
                                start: 97,
                                end: 106,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 51
                                    },
                                    end: {
                                        line: 4,
                                        column: 51
                                    }
                                },
                                raw: '\n        '
                            }
                        ],
                        openingElement: {
                            type: 'JSXOpeningFragment',
                            start: 0,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingFragment',
                            start: 106,
                            end: 109,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 51
                                },
                                end: {
                                    line: 4,
                                    column: 64
                                }
                            }
                        },
                        start: 0,
                        end: 109,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 4,
                                column: 64
                            }
                        }
                    },
                    start: 0,
                    end: 109,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 4,
                            column: 64
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 109,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 64
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
          type: 'Program',
          start: 0,
          end: 23,
          body: [
            {
              type: 'ExpressionStatement',
              start: 0,
              end: 23,
              expression: {
                type: 'JSXElement',
                start: 0,
                end: 22,
                openingElement: {
                  type: 'JSXOpeningElement',
                  start: 0,
                  end: 5,
                  attributes: [],
                  name: {
                    type: 'JSXNamespacedName',
                    start: 1,
                    end: 4,
                    namespace: {
                      type: 'JSXIdentifier',
                      start: 1,
                      end: 2,
                      name: 'a'
                    },
                    name: {
                      type: 'JSXIdentifier',
                      start: 3,
                      end: 4,
                      name: 'b'
                    }
                  },
                  selfClosing: false
                },
                closingElement: {
                  type: 'JSXClosingElement',
                  start: 16,
                  end: 22,
                  name: {
                    type: 'JSXNamespacedName',
                    start: 18,
                    end: 21,
                    namespace: {
                      type: 'JSXIdentifier',
                      start: 18,
                      end: 19,
                      name: 'a'
                    },
                    name: {
                      type: 'JSXIdentifier',
                      start: 20,
                      end: 21,
                      name: 'b'
                    }
                  }
                },
                children: [
                  {
                    type: 'JSXElement',
                    start: 5,
                    end: 16,
                    openingElement: {
                      type: 'JSXOpeningElement',
                      start: 5,
                      end: 10,
                      attributes: [],
                      name: {
                        type: 'JSXNamespacedName',
                        start: 6,
                        end: 9,
                        namespace: {
                          type: 'JSXIdentifier',
                          start: 6,
                          end: 7,
                          name: 'a'
                        },
                        name: {
                          type: 'JSXIdentifier',
                          start: 8,
                          end: 9,
                          name: 'b'
                        }
                      },
                      selfClosing: false
                    },
                    closingElement: {
                      type: 'JSXClosingElement',
                      start: 10,
                      end: 16,
                      name: {
                        type: 'JSXNamespacedName',
                        start: 12,
                        end: 15,
                        namespace: {
                          type: 'JSXIdentifier',
                          start: 12,
                          end: 13,
                          name: 'a'
                        },
                        name: {
                          type: 'JSXIdentifier',
                          start: 14,
                          end: 15,
                          name: 'b'
                        }
                      }
                    },
                    children: []
                  }
                ]
              }
            }
          ],
          sourceType: 'script'
        }
    });

  pass(`<adele>{/* Hello from this side */}</adele>`, {
        source: '<adele>{/* Hello from this side */}</adele>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXExpressionContainer',
                        expression: {
                            type: 'JSXEmptyExpression',
                            start: 7,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        start: 7,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'adele',
                        start: 1,
                        end: 6,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'adele',
                        start: 37,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 37
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    start: 35,
                    end: 43,
                    loc: {
                        start: {
                            line: 1,
                            column: 34
                        },
                        end: {
                            line: 1,
                            column: 43
                        }
                    }
                },
                start: 0,
                end: 43,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 43
                    }
                }
            },
            start: 0,
            end: 43,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 43
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 43,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 43
        }
    }
}
    });

  pass(`<span>{x}{y}{z}</span>`, {
        source: '<span>{x}{y}{z}</span>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXExpressionContainer',
                        expression: {
                            type: 'Identifier',
                            name: 'x',
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
                        start: 6,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    {
                        type: 'JSXExpressionContainer',
                        expression: {
                            type: 'Identifier',
                            name: 'y',
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
                        },
                        start: 9,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    {
                        type: 'JSXExpressionContainer',
                        expression: {
                            type: 'Identifier',
                            name: 'z',
                            start: 13,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        start: 12,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'span',
                        start: 1,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'span',
                        start: 17,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 15,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                },
                start: 0,
                end: 22,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                }
            },
            start: 0,
            end: 22,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 22,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 22
        }
    }
}
    });

  pass(`<home xlink:type="simple" other="foo" ></home>`, {
        source: '<home xlink:type="simple" other="foo" ></home>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'home',
                        start: 1,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    attributes: [
                        {
                            type: 'JSXAttribute',
                            value: {
                                type: 'Literal',
                                value: 'simple',
                                start: 17,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                },
                                raw: '"simple"'
                            },
                            name: {
                                type: 'JSXNamespacedName',
                                namespace: {
                                    type: 'JSXIdentifier',
                                    name: 'xlink',
                                    start: 6,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    }
                                },
                                name: {
                                    type: 'JSXIdentifier',
                                    name: 'type',
                                    start: 12,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                start: 6,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            start: 6,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        {
                            type: 'JSXAttribute',
                            value: {
                                type: 'Literal',
                                value: 'foo',
                                start: 32,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                },
                                raw: '"foo"'
                            },
                            name: {
                                type: 'JSXIdentifier',
                                name: 'other',
                                start: 26,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            start: 26,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 26
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        }
                    ],
                    selfClosing: false,
                    start: 0,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'home',
                        start: 41,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 41
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    },
                    start: 39,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 38
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                },
                start: 0,
                end: 46,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 46
                    }
                }
            },
            start: 0,
            end: 46,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 46
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 46,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 46
        }
    }
}
    });

  pass(`<em>
One
Two
Three
</em>`, {
        source: `<em>
One
Two
Three
</em>`,
        ranges: true,
        raw: true,
        jsx: true,
        loc: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXText',
                        value: '\nOne\nTwo\nThree\n',
                        start: 4,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        },
                        raw: '\nOne\nTwo\nThree\n'
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'em',
                        start: 1,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 4,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 3
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'em',
                        start: 21,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 19,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 3
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                },
                start: 0,
                end: 24,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                }
            },
            start: 0,
            end: 24,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 24
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 24,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 24
        }
    }
}
    });

  pass(`<rect option:square />`, {
        source: '<rect option:square />',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'rect',
                        start: 1,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    attributes: [
                        {
                            type: 'JSXAttribute',
                            value: null,
                            name: {
                                type: 'JSXNamespacedName',
                                namespace: {
                                    type: 'JSXIdentifier',
                                    name: 'option',
                                    start: 6,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                name: {
                                    type: 'JSXIdentifier',
                                    name: 'square',
                                    start: 13,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                start: 6,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            start: 6,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    ],
                    selfClosing: true,
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                },
                closingElement: null,
                start: 0,
                end: 22,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                }
            },
            start: 0,
            end: 22,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 22,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 22
        }
    }
}
    });

  pass(`<strong></strong>`, {
        source: '<strong></strong>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'strong',
                        start: 1,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'strong',
                        start: 10,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    },
                    start: 8,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            },
            start: 0,
            end: 17,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 17,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 17
        }
    }
}
    });

  pass('<a>{`${1}`}</a>', {
        source: '<a>{`${1}`}</a>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXExpressionContainer',
                        expression: {
                            type: 'TemplateLiteral',
                            expressions: [
                                {
                                    type: 'Literal',
                                    value: 1,
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
                                    },
                                    raw: '1'
                                }
                            ],
                            quasis: [
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        cooked: '',
                                        raw: ''
                                    },
                                    tail: false,
                                    start: 8,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                },
                                {
                                    type: 'TemplateElement',
                                    value: {
                                        cooked: '',
                                        raw: ''
                                    },
                                    tail: true,
                                    start: 8,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                }
                            ],
                            start: 4,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        start: 3,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'a',
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
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 3,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'a',
                        start: 13,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    start: 11,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 10
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                },
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            },
            start: 0,
            end: 15,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 15,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 15
        }
    }
}
    });

  pass(`function *g() { yield <h1>Hello</h1> }`, {
        source: 'function *g() { yield <h1>Hello</h1> }',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'YieldExpression',
                            argument: {
                                type: 'JSXElement',
                                children: [
                                    {
                                        type: 'JSXText',
                                        value: 'Hello',
                                        start: 26,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        },
                                        raw: 'Hello'
                                    }
                                ],
                                openingElement: {
                                    type: 'JSXOpeningElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'h1',
                                        start: 23,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 23
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        }
                                    },
                                    attributes: [],
                                    selfClosing: false,
                                    start: 22,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingElement',
                                    name: {
                                        type: 'JSXIdentifier',
                                        name: 'h1',
                                        start: 33,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        }
                                    },
                                    start: 31,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    }
                                },
                                start: 22,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            delegate: false,
                            start: 16,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        },
                        start: 16,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    }
                ],
                start: 14,
                end: 38,
                loc: {
                    start: {
                        line: 1,
                        column: 14
                    },
                    end: {
                        line: 1,
                        column: 38
                    }
                }
            },
            async: false,
            generator: true,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'g',
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
            },
            start: 0,
            end: 38,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 38
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 38,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 38
        }
    }
}
    });

  pass(`<title>{ {caption} }</title>`, {
        source: '<title>{ {caption} }</title>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXExpressionContainer',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'caption',
                                        start: 10,
                                        end: 17,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 17
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'caption',
                                        start: 10,
                                        end: 17,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 17
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 10,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        start: 7,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'title',
                        start: 1,
                        end: 6,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'title',
                        start: 22,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    },
                    start: 20,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                },
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                }
            },
            start: 0,
            end: 28,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 28
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 28,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 28
        }
    }
}
    });

  pass(`<span {... style}></span>`, {
        source: '<span {... style}></span>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'span',
                        start: 1,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    attributes: [
                        {
                            type: 'JSXSpreadAttribute',
                            argument: {
                                type: 'Identifier',
                                name: 'style',
                                start: 11,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            start: 6,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        }
                    ],
                    selfClosing: false,
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'span',
                        start: 20,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        }
                    },
                    start: 18,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 17
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    }
                },
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                }
            },
            start: 0,
            end: 25,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 25
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 25,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 25
        }
    }
}
    });

  pass(`<img width={320}/>`, {
        source: '<img width={320}/>',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'img',
                        start: 1,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    attributes: [
                        {
                            type: 'JSXAttribute',
                            value: {
                                type: 'JSXExpressionContainer',
                                expression: {
                                    type: 'Literal',
                                    value: 320,
                                    start: 12,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    raw: '320'
                                },
                                start: 11,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            name: {
                                type: 'JSXIdentifier',
                                name: 'width',
                                start: 5,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            start: 5,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        }
                    ],
                    selfClosing: true,
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                },
                closingElement: null,
                start: 0,
                end: 18,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                }
            },
            start: 0,
            end: 18,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 18
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 18,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 18
        }
    }
}
    });

  pass(`<a href="/" />`, {
        source: '<a href="/" />',
        ranges: true,
        raw: true,
        loc: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'a',
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
                    attributes: [
                        {
                            type: 'JSXAttribute',
                            value: {
                                type: 'Literal',
                                value: '/',
                                start: 8,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                raw: '"/"'
                            },
                            name: {
                                type: 'JSXIdentifier',
                                name: 'href',
                                start: 3,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            start: 3,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        }
                    ],
                    selfClosing: true,
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                closingElement: null,
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            },
            start: 0,
            end: 14,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 14,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 14
        }
    }
}
    });

  pass(`<a href={link}></a>`, {
        source: '<a href={link}></a>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'a',
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
                    attributes: [
                        {
                            type: 'JSXAttribute',
                            value: {
                                type: 'JSXExpressionContainer',
                                expression: {
                                    type: 'Identifier',
                                    name: 'link',
                                    start: 9,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                },
                                start: 8,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            },
                            name: {
                                type: 'JSXIdentifier',
                                name: 'href',
                                start: 3,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            start: 3,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        }
                    ],
                    selfClosing: false,
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'a',
                        start: 17,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 15,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                },
                start: 0,
                end: 19,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 19
                    }
                }
            },
            start: 0,
            end: 19,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 19
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 19,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 19
        }
    }
}
    });

  pass(`var el = ( <span /> )`, {
        source: 'var el = ( <span /> )',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    init: {
                        type: 'JSXElement',
                        children: [],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'span',
                                start: 12,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            attributes: [],
                            selfClosing: true,
                            start: 11,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        closingElement: null,
                        start: 11,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    id: {
                        type: 'Identifier',
                        name: 'el',
                        start: 4,
                        end: 6,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    start: 4,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                }
            ],
            kind: 'var',
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 21,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 21
        }
    }
}
    });

  pass(`<div {...c}> {...children}{a}{...b}</div>`, {
        source: '<div {...c}> {...children}{a}{...b}</div>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXText',
                        value: ' ',
                        start: 12,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        raw: ' '
                    },
                    {
                        type: 'JSXSpreadChild',
                        expression: {
                            type: 'Identifier',
                            name: 'children',
                            start: 17,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        start: 14,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    },
                    {
                        type: 'JSXExpressionContainer',
                        expression: {
                            type: 'Identifier',
                            name: 'a',
                            start: 27,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 27
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            }
                        },
                        start: 26,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 26
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    },
                    {
                        type: 'JSXSpreadChild',
                        expression: {
                            type: 'Identifier',
                            name: 'b',
                            start: 33,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 33
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            }
                        },
                        start: 30,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 30
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'div',
                        start: 1,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    attributes: [
                        {
                            type: 'JSXSpreadAttribute',
                            argument: {
                                type: 'Identifier',
                                name: 'c',
                                start: 9,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            start: 5,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        }
                    ],
                    selfClosing: false,
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'div',
                        start: 37,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 37
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    },
                    start: 35,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 35
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                },
                start: 0,
                end: 41,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 41
                    }
                }
            },
            start: 0,
            end: 41,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 41,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 41
        }
    }
}
      });

  pass(`<><div>JSXElement</div>JSXText{'JSXExpressionContainer'}</>`, {
        source: '<><div>JSXElement</div>JSXText{"JSXExpressionContainer"}</>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXFragment',
                children: [
                    {
                        type: 'JSXElement',
                        children: [
                            {
                                type: 'JSXText',
                                value: 'JSXElement',
                                start: 7,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                raw: 'JSXElement'
                            }
                        ],
                        openingElement: {
                            type: 'JSXOpeningElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'div',
                                start: 3,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            attributes: [],
                            selfClosing: false,
                            start: 2,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingElement',
                            name: {
                                type: 'JSXIdentifier',
                                name: 'div',
                                start: 19,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            },
                            start: 17,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        },
                        start: 2,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    {
                        type: 'JSXText',
                        value: 'JSXText',
                        start: 23,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        raw: 'JSXText'
                    },
                    {
                        type: 'JSXExpressionContainer',
                        expression: {
                            type: 'Literal',
                            value: 'JSXExpressionContainer',
                            start: 31,
                            end: 55,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 31
                                },
                                end: {
                                    line: 1,
                                    column: 55
                                }
                            },
                            raw: '"JSXExpressionContainer"'
                        },
                        start: 30,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningFragment',
                    start: 0,
                    end: 2,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingFragment',
                    start: 56,
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 55
                        },
                        end: {
                            line: 1,
                            column: 59
                        }
                    }
                },
                start: 0,
                end: 59,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 59
                    }
                }
            },
            start: 0,
            end: 59,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 59
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 59,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 59
        }
    }
}
      });

  pass(`function x() {
  let x
  <div />
}`, {
        source: `function x() {
  let x
  <div />
}`,
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 21,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 6
                                        },
                                        end: {
                                            line: 2,
                                            column: 7
                                        }
                                    }
                                },
                                start: 21,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 6
                                    },
                                    end: {
                                        line: 2,
                                        column: 7
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 17,
                        end: 22,
                        loc: {
                            start: {
                                line: 2,
                                column: 2
                            },
                            end: {
                                line: 2,
                                column: 7
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'JSXElement',
                            children: [],
                            openingElement: {
                                type: 'JSXOpeningElement',
                                name: {
                                    type: 'JSXIdentifier',
                                    name: 'div',
                                    start: 26,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 3
                                        },
                                        end: {
                                            line: 3,
                                            column: 6
                                        }
                                    }
                                },
                                attributes: [],
                                selfClosing: true,
                                start: 25,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 2
                                    },
                                    end: {
                                        line: 3,
                                        column: 9
                                    }
                                }
                            },
                            closingElement: null,
                            start: 25,
                            end: 32,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 2
                                },
                                end: {
                                    line: 3,
                                    column: 9
                                }
                            }
                        },
                        start: 25,
                        end: 32,
                        loc: {
                            start: {
                                line: 3,
                                column: 2
                            },
                            end: {
                                line: 3,
                                column: 9
                            }
                        }
                    }
                ],
                start: 13,
                end: 34,
                loc: {
                    start: {
                        line: 1,
                        column: 13
                    },
                    end: {
                        line: 4,
                        column: 1
                    }
                }
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'x',
                start: 9,
                end: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 9
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                }
            },
            start: 0,
            end: 34,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 1
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 34,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 4,
            column: 1
        }
    }
}
      });

  pass(`<A>&#1f4a9;</A>`, {
        source: '<A>&#1f4a9;</A>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXText',
                        value: '&#1f4a9;',
                        start: 3,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        },
                        raw: '&#1f4a9;'
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'A',
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
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 3,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'A',
                        start: 13,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    start: 11,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                },
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            },
            start: 0,
            end: 15,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 15,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 15
        }
    }
}
      });

  pass(`<A>&#x1g4q9;</A>`, {
        source: '<A>&#x1g4q9;</A>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXText',
                        value: '&#x1g4q9;',
                        start: 3,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        },
                        raw: '&#x1g4q9;'
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'A',
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
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 3,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'A',
                        start: 14,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    start: 12,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            start: 0,
            end: 16,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 16,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 16
        }
    }
}
      });

  pass(`<A>&#x1f4a9;</A>`, {
        source: '<A>&#x1f4a9;</A>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXText',
                        value: '&#x1f4a9;',
                        start: 3,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        },
                        raw: '&#x1f4a9;'
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'A',
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
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 3,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'A',
                        start: 14,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    start: 12,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                },
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            },
            start: 0,
            end: 16,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 16,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 16
        }
    }
}
      });

  pass(`<div>
  <>
    <>
      <span>Hello</span>
      <span>world</span>
    </>
    <>
      <span>Goodbye</span>
      <span>world</span>
    </>
  </>
</div>`, {
        source: `<div>
  <>
    <>
      <span>Hello</span>
      <span>world</span>
    </>
    <>
      <span>Goodbye</span>
      <span>world</span>
    </>
  </>
</div>`,
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXText',
                        value: '\n  ',
                        start: 5,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        },
                        raw: '\n  '
                    },
                    {
                        type: 'JSXFragment',
                        children: [
                            {
                                type: 'JSXText',
                                value: '\n    ',
                                start: 10,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                raw: '\n    '
                            },
                            {
                                type: 'JSXFragment',
                                children: [
                                    {
                                        type: 'JSXText',
                                        value: '\n      ',
                                        start: 17,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        },
                                        raw: '\n      '
                                    },
                                    {
                                        type: 'JSXElement',
                                        children: [
                                            {
                                                type: 'JSXText',
                                                value: 'Hello',
                                                start: 30,
                                                end: 35,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                },
                                                raw: 'Hello'
                                            }
                                        ],
                                        openingElement: {
                                            type: 'JSXOpeningElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 25,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                }
                                            },
                                            attributes: [],
                                            selfClosing: false,
                                            start: 24,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        },
                                        closingElement: {
                                            type: 'JSXClosingElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 37,
                                                end: 41,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41
                                                    }
                                                }
                                            },
                                            start: 35,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 29
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 41
                                                }
                                            }
                                        },
                                        start: 24,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        }
                                    },
                                    {
                                        type: 'JSXText',
                                        value: '\n      ',
                                        start: 42,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        },
                                        raw: '\n      '
                                    },
                                    {
                                        type: 'JSXElement',
                                        children: [
                                            {
                                                type: 'JSXText',
                                                value: 'world',
                                                start: 55,
                                                end: 60,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 54
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 54
                                                    }
                                                },
                                                raw: 'world'
                                            }
                                        ],
                                        openingElement: {
                                            type: 'JSXOpeningElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 50,
                                                end: 54,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 50
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 54
                                                    }
                                                }
                                            },
                                            attributes: [],
                                            selfClosing: false,
                                            start: 49,
                                            end: 55,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 54
                                                }
                                            }
                                        },
                                        closingElement: {
                                            type: 'JSXClosingElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 62,
                                                end: 66,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 62
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 66
                                                    }
                                                }
                                            },
                                            start: 60,
                                            end: 67,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 54
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 66
                                                }
                                            }
                                        },
                                        start: 49,
                                        end: 67,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 66
                                            }
                                        }
                                    },
                                    {
                                        type: 'JSXText',
                                        value: '\n    ',
                                        start: 67,
                                        end: 72,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 66
                                            },
                                            end: {
                                                line: 1,
                                                column: 66
                                            }
                                        },
                                        raw: '\n    '
                                    }
                                ],
                                openingElement: {
                                    type: 'JSXOpeningFragment',
                                    start: 15,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingFragment',
                                    start: 72,
                                    end: 75,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 66
                                        },
                                        end: {
                                            line: 1,
                                            column: 75
                                        }
                                    }
                                },
                                start: 15,
                                end: 75,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 75
                                    }
                                }
                            },
                            {
                                type: 'JSXFragment',
                                children: [
                                    {
                                        type: 'JSXText',
                                        value: '\n      ',
                                        start: 82,
                                        end: 89,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 5
                                            },
                                            end: {
                                                line: 2,
                                                column: 5
                                            }
                                        },
                                        raw: '\n      '
                                    },
                                    {
                                        type: 'JSXElement',
                                        children: [
                                            {
                                                type: 'JSXText',
                                                value: 'Goodbye',
                                                start: 95,
                                                end: 102,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 18
                                                    }
                                                },
                                                raw: 'Goodbye'
                                            }
                                        ],
                                        openingElement: {
                                            type: 'JSXOpeningElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 90,
                                                end: 94,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 18
                                                    }
                                                }
                                            },
                                            attributes: [],
                                            selfClosing: false,
                                            start: 89,
                                            end: 95,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 18
                                                }
                                            }
                                        },
                                        closingElement: {
                                            type: 'JSXClosingElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 104,
                                                end: 108,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 32
                                                    }
                                                }
                                            },
                                            start: 102,
                                            end: 109,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 32
                                                }
                                            }
                                        },
                                        start: 89,
                                        end: 109,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 5
                                            },
                                            end: {
                                                line: 2,
                                                column: 32
                                            }
                                        }
                                    },
                                    {
                                        type: 'JSXText',
                                        value: '\n      ',
                                        start: 109,
                                        end: 116,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 32
                                            },
                                            end: {
                                                line: 2,
                                                column: 32
                                            }
                                        },
                                        raw: '\n      '
                                    },
                                    {
                                        type: 'JSXElement',
                                        children: [
                                            {
                                                type: 'JSXText',
                                                value: 'world',
                                                start: 122,
                                                end: 127,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 45
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 45
                                                    }
                                                },
                                                raw: 'world'
                                            }
                                        ],
                                        openingElement: {
                                            type: 'JSXOpeningElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 117,
                                                end: 121,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 41
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 45
                                                    }
                                                }
                                            },
                                            attributes: [],
                                            selfClosing: false,
                                            start: 116,
                                            end: 122,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 45
                                                }
                                            }
                                        },
                                        closingElement: {
                                            type: 'JSXClosingElement',
                                            name: {
                                                type: 'JSXIdentifier',
                                                name: 'span',
                                                start: 129,
                                                end: 133,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 53
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 57
                                                    }
                                                }
                                            },
                                            start: 127,
                                            end: 134,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 45
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 57
                                                }
                                            }
                                        },
                                        start: 116,
                                        end: 134,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 32
                                            },
                                            end: {
                                                line: 2,
                                                column: 57
                                            }
                                        }
                                    },
                                    {
                                        type: 'JSXText',
                                        value: '\n    ',
                                        start: 134,
                                        end: 139,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 57
                                            },
                                            end: {
                                                line: 2,
                                                column: 57
                                            }
                                        },
                                        raw: '\n    '
                                    }
                                ],
                                openingElement: {
                                    type: 'JSXOpeningFragment',
                                    start: 80,
                                    end: 82,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 4
                                        },
                                        end: {
                                            line: 2,
                                            column: 5
                                        }
                                    }
                                },
                                closingElement: {
                                    type: 'JSXClosingFragment',
                                    start: 139,
                                    end: 142,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 57
                                        },
                                        end: {
                                            line: 2,
                                            column: 66
                                        }
                                    }
                                },
                                start: 80,
                                end: 142,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 4
                                    },
                                    end: {
                                        line: 2,
                                        column: 66
                                    }
                                }
                            }
                        ],
                        openingElement: {
                            type: 'JSXOpeningFragment',
                            start: 8,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        closingElement: {
                            type: 'JSXClosingFragment',
                            start: 145,
                            end: 148,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 2
                                },
                                end: {
                                    line: 3,
                                    column: 5
                                }
                            }
                        },
                        start: 8,
                        end: 148,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 3,
                                column: 5
                            }
                        }
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'div',
                        start: 1,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 5,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'div',
                        start: 151,
                        end: 154,
                        loc: {
                            start: {
                                line: 4,
                                column: 2
                            },
                            end: {
                                line: 4,
                                column: 5
                            }
                        }
                    },
                    start: 149,
                    end: 155,
                    loc: {
                        start: {
                            line: 4,
                            column: 0
                        },
                        end: {
                            line: 4,
                            column: 6
                        }
                    }
                },
                start: 0,
                end: 155,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 6
                    }
                }
            },
            start: 0,
            end: 155,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 6
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 155,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 4,
            column: 6
        }
    }
}
       });

  pass(`true ? (<div />) : <div />;`, {
        source: 'true ? (<div />) : <div />;',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'ConditionalExpression',
                test: {
                    type: 'Literal',
                    value: true,
                    start: 0,
                    end: 4,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
                        }
                    },
                    raw: 'true'
                },
                consequent: {
                    type: 'JSXElement',
                    children: [],
                    openingElement: {
                        type: 'JSXOpeningElement',
                        name: {
                            type: 'JSXIdentifier',
                            name: 'div',
                            start: 9,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        attributes: [],
                        selfClosing: true,
                        start: 8,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    closingElement: null,
                    start: 8,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                },
                alternate: {
                    type: 'JSXElement',
                    children: [],
                    openingElement: {
                        type: 'JSXOpeningElement',
                        name: {
                            type: 'JSXIdentifier',
                            name: 'div',
                            start: 20,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        attributes: [],
                        selfClosing: true,
                        start: 19,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    },
                    closingElement: null,
                    start: 19,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                },
                start: 0,
                end: 26,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 26
                    }
                }
            },
            start: 0,
            end: 27,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 27
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 27,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 27
        }
    }
}
      });

  pass(`<div pattern="^([\w\.\-]+\s)*[\w\.\-]+\s?$"></div>;`, {
        source: '<div pattern="^([\w\.\-]+\s)*[\w\.\-]+\s?$"></div>;',
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'div',
                    },
                    attributes: [
                        {
                            type: 'JSXAttribute',
                            value: {
                                type: 'Literal',
                                value: '^([w.-]+s)*[w.-]+s?$',
                                raw: '"^([w.-]+s)*[w.-]+s?$"'
                            },
                            name: {
                                type: 'JSXIdentifier',
                                name: 'pattern',
                            },
                        }
                    ],
                    selfClosing: false,
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'div',
                    },
                },
            },
        }
    ],
    sourceType: 'script',
}
      });

  pass(`function foo() {
           return <>
  Hello <strong>World</strong>!
</>
       }`, {
        source: `function foo() {
           return <>
  Hello <strong>World</strong>!
</>
       }`,
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ReturnStatement',
                        argument: {
                            type: 'JSXFragment',
                            children: [
                                {
                                    type: 'JSXText',
                                    value: '\n  Hello ',
                                    start: 37,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 19
                                        },
                                        end: {
                                            line: 2,
                                            column: 19
                                        }
                                    },
                                    raw: '\n  Hello '
                                },
                                {
                                    type: 'JSXElement',
                                    children: [
                                        {
                                            type: 'JSXText',
                                            value: 'World',
                                            start: 54,
                                            end: 59,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 36
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 36
                                                }
                                            },
                                            raw: 'World'
                                        }
                                    ],
                                    openingElement: {
                                        type: 'JSXOpeningElement',
                                        name: {
                                            type: 'JSXIdentifier',
                                            name: 'strong',
                                            start: 47,
                                            end: 53,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 36
                                                }
                                            }
                                        },
                                        attributes: [],
                                        selfClosing: false,
                                        start: 46,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 19
                                            },
                                            end: {
                                                line: 2,
                                                column: 36
                                            }
                                        }
                                    },
                                    closingElement: {
                                        type: 'JSXClosingElement',
                                        name: {
                                            type: 'JSXIdentifier',
                                            name: 'strong',
                                            start: 61,
                                            end: 67,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 44
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 50
                                                }
                                            }
                                        },
                                        start: 59,
                                        end: 68,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 36
                                            },
                                            end: {
                                                line: 2,
                                                column: 50
                                            }
                                        }
                                    },
                                    start: 46,
                                    end: 68,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 19
                                        },
                                        end: {
                                            line: 2,
                                            column: 50
                                        }
                                    }
                                },
                                {
                                    type: 'JSXText',
                                    value: '!\n',
                                    start: 68,
                                    end: 70,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 50
                                        },
                                        end: {
                                            line: 2,
                                            column: 50
                                        }
                                    },
                                    raw: '!\n'
                                }
                            ],
                            openingElement: {
                                type: 'JSXOpeningFragment',
                                start: 35,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 18
                                    },
                                    end: {
                                        line: 2,
                                        column: 19
                                    }
                                }
                            },
                            closingElement: {
                                type: 'JSXClosingFragment',
                                start: 70,
                                end: 73,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 50
                                    },
                                    end: {
                                        line: 2,
                                        column: 56
                                    }
                                }
                            },
                            start: 35,
                            end: 73,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 18
                                },
                                end: {
                                    line: 2,
                                    column: 56
                                }
                            }
                        },
                        start: 28,
                        end: 73,
                        loc: {
                            start: {
                                line: 2,
                                column: 11
                            },
                            end: {
                                line: 2,
                                column: 56
                            }
                        }
                    }
                ],
                start: 15,
                end: 82,
                loc: {
                    start: {
                        line: 1,
                        column: 15
                    },
                    end: {
                        line: 3,
                        column: 8
                    }
                }
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'foo',
                start: 9,
                end: 12,
                loc: {
                    start: {
                        line: 1,
                        column: 9
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                }
            },
            start: 0,
            end: 82,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 3,
                    column: 8
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 82,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 3,
            column: 8
        }
    }
}
       });

  pass(`function render() {
  return (
    <>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </>
  );
}`, {
        source: `function render() {
  return (
    <>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </>
  );
}`,
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ReturnStatement',
                        argument: {
                            type: 'JSXFragment',
                            children: [
                                {
                                    type: 'JSXText',
                                    value: '\n      Some text.\n      ',
                                    start: 37,
                                    end: 61,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 5
                                        },
                                        end: {
                                            line: 3,
                                            column: 5
                                        }
                                    },
                                    raw: '\n      Some text.\n      '
                                },
                                {
                                    type: 'JSXElement',
                                    children: [
                                        {
                                            type: 'JSXText',
                                            value: 'A heading',
                                            start: 65,
                                            end: 74,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 33
                                                }
                                            },
                                            raw: 'A heading'
                                        }
                                    ],
                                    openingElement: {
                                        type: 'JSXOpeningElement',
                                        name: {
                                            type: 'JSXIdentifier',
                                            name: 'h2',
                                            start: 62,
                                            end: 64,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 33
                                                }
                                            }
                                        },
                                        attributes: [],
                                        selfClosing: false,
                                        start: 61,
                                        end: 65,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 5
                                            },
                                            end: {
                                                line: 3,
                                                column: 33
                                            }
                                        }
                                    },
                                    closingElement: {
                                        type: 'JSXClosingElement',
                                        name: {
                                            type: 'JSXIdentifier',
                                            name: 'h2',
                                            start: 76,
                                            end: 78,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 45
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 47
                                                }
                                            }
                                        },
                                        start: 74,
                                        end: 79,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 33
                                            },
                                            end: {
                                                line: 3,
                                                column: 47
                                            }
                                        }
                                    },
                                    start: 61,
                                    end: 79,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 5
                                        },
                                        end: {
                                            line: 3,
                                            column: 47
                                        }
                                    }
                                },
                                {
                                    type: 'JSXText',
                                    value: '\n      More text.\n      ',
                                    start: 79,
                                    end: 103,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 47
                                        },
                                        end: {
                                            line: 3,
                                            column: 47
                                        }
                                    },
                                    raw: '\n      More text.\n      '
                                },
                                {
                                    type: 'JSXElement',
                                    children: [
                                        {
                                            type: 'JSXText',
                                            value: 'Another heading',
                                            start: 107,
                                            end: 122,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 75
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 75
                                                }
                                            },
                                            raw: 'Another heading'
                                        }
                                    ],
                                    openingElement: {
                                        type: 'JSXOpeningElement',
                                        name: {
                                            type: 'JSXIdentifier',
                                            name: 'h2',
                                            start: 104,
                                            end: 106,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 73
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 75
                                                }
                                            }
                                        },
                                        attributes: [],
                                        selfClosing: false,
                                        start: 103,
                                        end: 107,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 47
                                            },
                                            end: {
                                                line: 3,
                                                column: 75
                                            }
                                        }
                                    },
                                    closingElement: {
                                        type: 'JSXClosingElement',
                                        name: {
                                            type: 'JSXIdentifier',
                                            name: 'h2',
                                            start: 124,
                                            end: 126,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 93
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 95
                                                }
                                            }
                                        },
                                        start: 122,
                                        end: 127,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 75
                                            },
                                            end: {
                                                line: 3,
                                                column: 95
                                            }
                                        }
                                    },
                                    start: 103,
                                    end: 127,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 47
                                        },
                                        end: {
                                            line: 3,
                                            column: 95
                                        }
                                    }
                                },
                                {
                                    type: 'JSXText',
                                    value: '\n      Even more text.\n    ',
                                    start: 127,
                                    end: 154,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 95
                                        },
                                        end: {
                                            line: 3,
                                            column: 95
                                        }
                                    },
                                    raw: '\n      Even more text.\n    '
                                }
                            ],
                            openingElement: {
                                type: 'JSXOpeningFragment',
                                start: 35,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 4
                                    },
                                    end: {
                                        line: 3,
                                        column: 5
                                    }
                                }
                            },
                            closingElement: {
                                type: 'JSXClosingFragment',
                                start: 154,
                                end: 157,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 95
                                    },
                                    end: {
                                        line: 3,
                                        column: 126
                                    }
                                }
                            },
                            start: 35,
                            end: 157,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 4
                                },
                                end: {
                                    line: 3,
                                    column: 126
                                }
                            }
                        },
                        start: 22,
                        end: 162,
                        loc: {
                            start: {
                                line: 2,
                                column: 2
                            },
                            end: {
                                line: 4,
                                column: 4
                            }
                        }
                    }
                ],
                start: 18,
                end: 164,
                loc: {
                    start: {
                        line: 1,
                        column: 18
                    },
                    end: {
                        line: 5,
                        column: 1
                    }
                }
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'render',
                start: 9,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 9
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            },
            start: 0,
            end: 164,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 5,
                    column: 1
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 164,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 5,
            column: 1
        }
    }
}
       });

  pass(`<>I'm a fragment!</>`, {
        source: '<>I am a fragment!</>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXFragment',
                children: [
                    {
                        type: 'JSXText',
                        value: 'I am a fragment!',
                        start: 2,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        },
                        raw: 'I am a fragment!'
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningFragment',
                    start: 0,
                    end: 2,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingFragment',
                    start: 18,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                start: 0,
                end: 21,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            },
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 21,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 21
        }
    }
}
    });

  pass(`<div>&nbsp;</div>`, {
        source: '<div>&nbsp;</div>',
        ranges: true,
        loc: true,
        raw: true,
        jsx: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'JSXElement',
                children: [
                    {
                        type: 'JSXText',
                        value: '&nbsp;',
                        start: 5,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        },
                        raw: '&nbsp;'
                    }
                ],
                openingElement: {
                    type: 'JSXOpeningElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'div',
                        start: 1,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    attributes: [],
                    selfClosing: false,
                    start: 0,
                    end: 5,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
                        }
                    }
                },
                closingElement: {
                    type: 'JSXClosingElement',
                    name: {
                        type: 'JSXIdentifier',
                        name: 'div',
                        start: 13,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    },
                    start: 11,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                }
            },
            start: 0,
            end: 17,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 17,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 17
        }
    }
}
      });

});