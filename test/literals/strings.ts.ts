import { fail, pass } from '../test-utils';

describe('Literals - Strings', () => {

    fail('"foo\\"', {
        source: '"foo\\"',
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0
    });

    fail('"\\u{g0g}"', {
      source: '"\\u{g0g}"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });

    fail('"\\u{g0g}"', {
      source: '"\\u{g}"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\u{g}"', {
      source: '"\\u{g}"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\u{g0}"', {
      source: '"\\u{g0}"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\u{g0}"', {
      source: '"\\u{g0}"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });

    fail('\\u{0g}', {
      source: '\\u{0g}',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('\\u{0g0}\r\n', {
      source: '\\u{0g0}\r\n',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\u{g0g}"', {
      source: '"\\u{g0g}"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\u{110000}"', {
      source: '"\\u{110000}"',
      message: 'Unicode escape code point out of range',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\u{11ffff}"', {
      source: '"\\u{11ffff}"',
      message: 'Unicode escape code point out of range',
      line: 1,
      column: 0,
      index: 0
  });

    fail('"\\x0g"', {
      source: '"\\x0g"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\xg0\r\n"', {
      source: '"\\xg0\r\n"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\xgg"', {
      source: '"\\xgg"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });

    fail('"\\xfg"', {
      source: '"\\xfg"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });

    fail('"\\xFG"', {
    source: '"\\xFG"',
    message: 'Invalid hexadecimal escape sequence',
    line: 1,
    column: 0,
    index: 0
  });

    fail('"\\u0g00"', {
      source: '"\\u0g00"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\u00g0"', {
      source: '"\\u00g0"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\uAA"', {
      source: '"\\uAA"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\\uAAA"', {
      source: '"\\uAAA"',
      message: 'Invalid hexadecimal escape sequence',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"Hello\nworld"', {
      source: '"Hello\nworld"',
      message: 'Unterminated string literal',
      line: 1,
      column: 0,
      index: 0
  });
    fail('"\n\r\t\v\b\f\\\'\"\0"', {
      source: '"\n\r\t\v\b\f\\\'\"\0"',
      message: 'Unterminated string literal',
      line: 1,
      column: 0,
      index: 0
  });

    fail('"use strict";  "\\08"', {
      source: '"use strict"; "\\08"',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 13,
      index: 13
  });

    fail('"use strict"; ("\\000")', {
      source: '"use strict"; ("\\000")',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 15,
      index: 15
  });
    fail('"use strict"; ("\\000")', {
      source: '"use strict"; ("\\000")',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 15,
      index: 15
  });

    fail('"use strict"; ("\\001")', {
      source: '"use strict"; ("\\001")',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 15,
      index: 15
  });
    fail('"use strict"; ("\\123")', {
      source: '"use strict"; ("\\123")',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 15,
      index: 15
  });
    fail('"use strict"; ("\\01")', {
      source: '"use strict"; ("\\01")',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 15,
      index: 15
  });

    fail('"use strict"; ("\\41")', {
      source: '"use strict"; ("\\41")',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 15,
      index: 15
  });
    fail('"use strict"; ("\\1")', {
      source: '"use strict"; ("\\1")',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 15,
      index: 15
  });
    fail('"use strict"; ("\\4")', {
      source: '"use strict"; ("\\4")',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 15,
      index: 15
  });

    fail('"use strict"; "\\10";', {
      source: '"use strict"; "\\10";',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 13,
      index: 13
  });
    fail('"use strict"; "\\16";', {
      source: '"use strict"; "\\16";',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 13,
      index: 13
  });
    fail('"use strict"; "\\31";', {
      source: '"use strict"; "\\31";',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 13,
      index: 13
  });

    fail('"use strict"; "\\106";', {
      source: '"use strict"; "\\106";',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 13,
      index: 13
  });
    fail('"use strict"; "\\207";', {
      source: '"use strict"; "\\207";',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 13,
      index: 13
  });
    fail('"use strict"; "\\10";', {
      source: '"use strict"; "\\10";',
      message: 'Octal escapes are not allowed in strict mode',
      line: 1,
      column: 13,
      index: 13
  });

    fail('"use strict"; "z\\7";', {
    source: '"use strict"; "z\\7";',
    message: 'Octal escapes are not allowed in strict mode',
    line: 1,
    column: 13,
    index: 13
});
    fail('"use strict"; "\\10";', {
    source: '"use strict"; "\\10";',
    message: 'Octal escapes are not allowed in strict mode',
    line: 1,
    column: 13,
    index: 13
});

    pass(`"abc"`, {
  source: '"abc"',
  loc: true,
  ranges: true,
  raw: true,
  expected: {
      type: 'Program',
      body: [{
          type: 'ExpressionStatement',
          directive: 'abc',
          expression: {
              type: 'Literal',
              value: 'abc',
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
              },
              raw: '"abc"'
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
      }],
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

    pass(`"\\б"`, {
  source: '"\\б"',
  loc: true,
  ranges: true,
  raw: true,
  expected: {
      body: [{
          end: 4,
          directive: '\\б',
          expression: {
              end: 4,
              loc: {
                  end: {
                      column: 4,
                      line: 1,
                  },
                  start: {
                      column: 0,
                      line: 1,
                  }
              },
              raw: '"\\б"',
              start: 0,
              type: 'Literal',
              value: 'б',
          },
          loc: {
              end: {
                  column: 4,
                  line: 1,
              },
              start: {
                  column: 0,
                  line: 1,
              }
          },
          start: 0,
          type: 'ExpressionStatement'
      }],
      end: 4,
      loc: {
          end: {
              column: 4,
              line: 1,
          },
          start: {
              column: 0,
              line: 1,
          },
      },
      sourceType: 'script',
      start: 0,
      type: 'Program'
  }
});

    pass(`"\\u0435"`, {
  source: '"\\n\\r\\t\\v\\b\\f"',
  expected: {
      body: [{
          directive: '\\n\\r\\t\\v\\b\\f',
          expression: {
              type: 'Literal',
              value: '\n\r\t\u000b\b\f',
          },
          type: 'ExpressionStatement',
      }, ],
      sourceType: 'script',
      type: 'Program'
  }
});

    pass(`"Hello\\nworld"`, {
  source: '"Hello\\nworld"',
  directives: true,
  ranges: true,
  raw: true,
  expected: {
      body: [{
          directive: 'Hello\\nworld',
          end: 14,
          expression: {
              end: 14,
              raw: '"Hello\\nworld"',
              start: 0,
              type: 'Literal',
              value: 'Hello\nworld',
          },
          start: 0,
          type: 'ExpressionStatement',
      }],
      end: 14,
      sourceType: 'script',
      start: 0,
      type: 'Program'
  }
});

    pass(`"\\u0435"`, {
  source: '"\\u0435"',
  loc: true,
  directives: true,
  ranges: true,
  raw: true,
  expected: {
      type: 'Program',
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
      },
      body: [{
          type: 'ExpressionStatement',
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
          },
          directive: '\\u0435',
          expression: {
              type: 'Literal',
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
              },
              value: 'е',
              raw: '"\\u0435"'
          }
      }],
      sourceType: 'script'
  }
});

    pass(`"\\u0432"`, {
  source: '"\\u0432"',
  loc: true,
  ranges: true,
  directives: true,
  raw: true,
  expected: {
      type: 'Program',
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
      },
      body: [{
          type: 'ExpressionStatement',
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
          },
          directive: '\\u0432',
          expression: {
              type: 'Literal',
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
              },
              value: 'в',
              raw: '"\\u0432"'
          }
      }],
      sourceType: 'script'
  }
});

    pass(`"\\u180E"`, {
  source: '"\\u180E"',
  loc: true,
  ranges: true,
  directives: true,
  raw: true,
  expected: {
      body: [{
          directive: '\\u180E',
          end: 8,
          expression: {
              end: 8,
              loc: {
                  end: {
                      column: 8,
                      line: 1,
                  },
                  start: {
                      column: 0,
                      line: 1
                  }
              },
              raw: '"\\u180E"',
              start: 0,
              type: 'Literal',
              value: '᠎',
          },
          loc: {
              end: {
                  column: 8,
                  line: 1,
              },
              start: {
                  column: 0,
                  line: 1,
              }
          },
          start: 0,
          type: 'ExpressionStatement',
      }],
      end: 8,
      loc: {
          end: {
              column: 8,
              line: 1
          },
          start: {
              column: 0,
              line: 1,
          },
      },
      sourceType: 'script',
      start: 0,
      type: 'Program'
  }
});

    pass(`"\\7"`, {
  source: '"\\7"',
  loc: true,
  ranges: true,
  raw: true,
  directives: true,
  expected: {
      body: [{
          directive: '\\7',
          end: 4,
          expression: {
              end: 4,
              loc: {
                  end: {
                      column: 4,
                      line: 1,
                  },
                  start: {
                      column: 0,
                      line: 1,
                  },
              },
              raw: '"\\7"',
              start: 0,
              type: 'Literal',
              value: '\u0007',
          },
          loc: {
              end: {
                  column: 4,
                  line: 1,
              },
              start: {
                  column: 0,
                  line: 1,
              },
          },
          start: 0,
          type: 'ExpressionStatement',
      }],
      end: 4,
      loc: {
          end: {
              column: 4,
              line: 1,
          },
          start: {
              column: 0,
              line: 1,
          },
      },
      sourceType: 'script',
      start: 0,
      type: 'Program'
  }
});

    pass(`"Hello\\012World"`, {
  source: '"Hello\\012World"',
  loc: true,
  ranges: true,
  directives: true,
  raw: true,
  expected: {
      type: 'Program',
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
      },
      body: [{
          type: 'ExpressionStatement',
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
          },
          directive: 'Hello\\012World',
          expression: {
              type: 'Literal',
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
              },
              value: 'Hello\nWorld',
              raw: '"Hello\\012World"'
          }
      }],
      sourceType: 'script'
  }
});

    pass(`"Hello\\412World"`, {
  source: '"Hello\\412World"',
  loc: true,
  ranges: true,
  directives: true,
  raw: true,
  expected: {
      type: 'Program',
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
      },
      body: [{
          type: 'ExpressionStatement',
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
          },
          directive: 'Hello\\412World',
          expression: {
              type: 'Literal',
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
              },
              value: 'Hello!2World',
              raw: '"Hello\\412World"'
          }
      }],
      sourceType: 'script'
  }
});

    pass('"Hello\\712World"', {
  source: '"Hello\\712World"',
  loc: true,
  ranges: true,
  raw: true,
  directives: true,
  expected: {
      type: 'Program',
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
      },
      body: [{
          type: 'ExpressionStatement',
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
          },
          directive: 'Hello\\712World',
          expression: {
              type: 'Literal',
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
              },
              value: 'Hello92World',
              raw: '"Hello\\712World"'
          }
      }],
      sourceType: 'script'
  }
});

    pass('"Hello\\1World"', {
  source: '"Hello\\1World"',
  loc: true,
  ranges: true,
  directives: true,
  raw: true,
  expected: {
      type: 'Program',
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
      },
      body: [{
          type: 'ExpressionStatement',
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
          },
          directive: 'Hello\\1World',
          expression: {
              type: 'Literal',
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
              },
              value: 'Hello\u0001World',
              raw: '"Hello\\1World"'
          }
      }],
      sourceType: 'script'
  }
});

    pass(`"\\xff"`, {
  source: `"\\xff"`,
  loc: true,
  ranges: true,
  directives: true,
  raw: true,
  expected: {
      type: 'Program',
      start: 0,
      end: 6,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 6
          }
      },
      body: [{
          type: 'ExpressionStatement',
          start: 0,
          end: 6,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 6
              }
          },
          directive: '\\xff',
          expression: {
              type: 'Literal',
              start: 0,
              end: 6,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 6
                  }
              },
              value: 'ÿ',
              raw: '"\\xff"'
          }
      }],
      sourceType: 'script'
  }
});

    pass('"\\u{11000}"', {
  source: '"\\u{11000}"',
  loc: true,
  ranges: true,
  raw: true,
  expected: {
      type: 'Program',
      body: [{
          type: 'ExpressionStatement',
          directive: '\\u{11000}',
          expression: {
              type: 'Literal',
              value: '𑀀',
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
              },
              raw: '"\\u{11000}"'
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
      }],
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

    pass('"\\Щ"', {
  source: '"\\Щ"',
  raw: true,
  expected: {
      body: [{
          directive: '\\Щ',
          expression: {
              raw: '"\\Щ"',
              type: 'Literal',
              value: 'Щ'
          },
          type: 'ExpressionStatement'
      }],
      sourceType: 'script',
      type: 'Program'
  }
});

    pass('"\\З"', {
  source: '"\\З"',
  raw: true,
  expected: {
      body: [{
          directive: '\\З',
          expression: {
              raw: '"\\З"',
              type: 'Literal',
              value: 'З'
          },
          type: 'ExpressionStatement'
      }],
      sourceType: 'script',
      type: 'Program'
  }
});

    pass('"\\ю"', {
  source: '"\\ю"',
  raw: true,
  expected: {
      body: [{
          directive: '\\ю',
          expression: {
              raw: '"\\ю"',
              type: 'Literal',
              value: 'ю'
          },
          type: 'ExpressionStatement'
      }],
      sourceType: 'script',
      type: 'Program'
  }
});

    pass('"\\б"', {
  source: '"\\б"',
  raw: true,
  expected: {
      body: [{
          directive: '\\б',
          expression: {
              raw: '"\\б"',
              type: 'Literal',
              value: 'б'
          },
          type: 'ExpressionStatement'
      }],
      sourceType: 'script',
      type: 'Program'
  }
});

    pass('"a\\r\\nb"', {
  source: '"a\\r\\nb"',
  raw: true,
  expected: {
      body: [{
          directive: 'a\\r\\nb',
          expression: {
              raw: '"a\\r\\nb"',
              type: 'Literal',
              value: 'a\r\nb',
          },
          type: 'ExpressionStatement',
      }, ],
      sourceType: 'script',
      type: 'Program'
  }
});

    pass('"\\u0451"', {
  source: '"\\u0451"',
  loc: true,
  ranges: true,
  raw: true,
  expected: {
      type: 'Program',
      body: [{
          type: 'ExpressionStatement',
          expression: {
              type: 'Literal',
              value: 'ё',
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
              },
              raw: '"\\u0451"'
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
          },
          directive: '\\u0451'
      }],
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

    pass('"\\u0006A"', {
  source: '"\\u0006A"',
  loc: true,
  ranges: true,
  raw: true,
  expected: {
      type: 'Program',
      body: [{
          type: 'ExpressionStatement',
          expression: {
              type: 'Literal',
              value: '\u0006A',
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
              },
              raw: '"\\u0006A"'
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
          },
          directive: '\\u0006A'
      }],
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

});