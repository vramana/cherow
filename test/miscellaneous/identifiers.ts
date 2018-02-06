import { pass, fail } from '../test-utils';
import { parseScript } from '../../src/cherow';

describe('Miscellaneous - Identifiers', () => {

    fail('var a\ = 5;', {
        source: 'var a\ = 5;'
    });

    fail('"use strict"; yield', {
        source: '"use strict"; yield',
        message: 'Unexpected strict mode reserved word',
        line: 1,
        column: 13,
        index: 13
    });

    fail('var func\\u0074ion = 123;', {
        source: 'var func\\u0074ion = 123;',
        message:  'Unexpected token function',
        line: 1,
        column: 3,
        index: 3
    });

    fail('var in = 123;', {
        source: 'var in = 123;',
        message: 'Unexpected token in',
        line: 1,
        column: 3,
        index: 3
    });

    fail('var aⸯ; // U+2E2F', {
        source: 'var aⸯ; // U+2E2F',
        message: 'Unexpected token ⸯ',
        line: 1,
        column: 5,
        index: 5
    });

    pass(`\\u{0069}`, {
        source: '\\u{0069}',
        loc: true,
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
            body: [
              {
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
                expression: {
                  type: 'Identifier',
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
                  name: 'i'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`\\u{00069} = i + \\u{00069};`, {
        source: '\\u{00069} = i + \\u{00069};',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'ExpressionStatement',
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
                },
                expression: {
                  type: 'AssignmentExpression',
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
                  },
                  operator: '=',
                  left: {
                    type: 'Identifier',
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
                    name: 'i'
                  },
                  right: {
                    type: 'BinaryExpression',
                    start: 12,
                    end: 25,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 25
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 12,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      name: 'i'
                    },
                    operator: '+',
                    right: {
                      type: 'Identifier',
                      start: 16,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      },
                      name: 'i'
                    }
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`T‍ = ([]);`, {
      source: 'T‍ = ([]);',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          body: [
            {
              end: 10,
              expression: {
                end: 9,
                left: {
                  end: 1,
                  loc: {
                   end: {
                      column: 1,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                    }
                  },
                  name: 'T',
                  start: 0,
                  type: 'Identifier',
                },
                loc: {
                  end: {
                    column: 9,
                    line: 1,
                  },
                  start: {
                    column: 0,
                    line: 1,
                  }
                },
                operator: '=',
                right: {
                  elements: [],
                  end: 8,
                 loc: {
                    end: {
                      column: 8,
                      line: 1,
                    },
                    start: {
                      column: 6,
                      line: 1,
                    }
                  },
                  start: 6,
                  type: 'ArrayExpression'
                },
                start: 0,
                type: 'AssignmentExpression'
              },
              loc: {
                end: {
                  column: 10,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              start: 0,
              type: 'ExpressionStatement'
           }
          ],
          end: 10,
          loc: {
            end: {
              column: 10,
              line: 1,
            },
            start: {
              column: 0,
              line: 1,
            }
          },
          sourceType: 'script',
          start: 0,
          type: 'Program'
        }
    });

    pass(`\\u{0069}`, {
        source: '\\u{0069}',
        loc: true,
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
            body: [
              {
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
                expression: {
                  type: 'Identifier',
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
                  name: 'i'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`\\u{00069} = i + \\u{00069};`, {
        source: '\\u{00069} = i + \\u{00069};',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'ExpressionStatement',
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
                },
                expression: {
                  type: 'AssignmentExpression',
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
                  },
                  operator: '=',
                  left: {
                    type: 'Identifier',
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
                    name: 'i'
                  },
                  right: {
                    type: 'BinaryExpression',
                    start: 12,
                    end: 25,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 25
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 12,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      },
                      name: 'i'
                    },
                    operator: '+',
                    right: {
                      type: 'Identifier',
                      start: 16,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      },
                      name: 'i'
                    }
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`this.\\u0069`, {
        source: 'this.\\u0069',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            body: [
              {
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'MemberExpression',
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
                  object: {
                    type: 'ThisExpression',
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
                    }
                  },
                  property: {
                    type: 'Identifier',
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
                    },
                    name: 'i'
                  },
                  computed: false
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`foo["\\u{20BB7}"]`, {
        source: 'foo["\\u{20BB7}"]',
        loc: true,
        ranges: true,
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
            body: [
              {
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
                expression: {
                  type: 'MemberExpression',
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
                  object: {
                    type: 'Identifier',
                    start: 0,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    },
                    name: 'foo'
                  },
                  property: {
                    type: 'Literal',
                    start: 4,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    },
                    value: '𠮷',
                    raw: '"\\u{20BB7}"'
                  },
                  computed: true
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`var $\\u{20BB7} = 'b';`, {
        source: 'var $\\u{20BB7} = "b";',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'VariableDeclaration',
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
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 4,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    },
                    id: {
                      type: 'Identifier',
                      start: 4,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      name: '$𠮷'
                    },
                    init: {
                      type: 'Literal',
                      start: 17,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      },
                      value: 'b',
                      raw: '"b"'
                    }
                  }
                ],
                kind: 'var'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`var _\\u0524 = 'a';`, {
        source: 'var _\\u0524 = "a";',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'VariableDeclaration',
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
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 4,
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
                    },
                    id: {
                      type: 'Identifier',
                      start: 4,
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
                      },
                      name: '_Ԥ'
                    },
                    init: {
                      type: 'Literal',
                      start: 14,
                      end: 17,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 17
                        }
                      },
                      value: 'a',
                      raw: '"a"'
                    }
                  }
                ],
                kind: 'var'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`var $00xxx\\u0069\\u0524\\u{20BB7} = 'c';`, {
        source: 'var $00xxx\\u0069\\u0524\\u{20BB7} = "c";',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'VariableDeclaration',
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
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 4,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    },
                    id: {
                      type: 'Identifier',
                      start: 4,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      },
                      name: '$00xxxiԤ𠮷'
                    },
                    init: {
                      type: 'Literal',
                      start: 34,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      },
                      value: 'c',
                      raw: '"c"'
                    }
                  }
                ],
                kind: 'var'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`var a\\u2118;`, {
        source: 'var a\\u2118;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a℘',
                                start: 4,
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
                            start: 4,
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var a\\u309C;`, {
        source: 'var a\\u309C;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a゜',
                                start: 4,
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
                            start: 4,
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var a\\u1886;`, {
        source: 'var a\\u1886;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'aᢆ',
                                start: 4,
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
                            start: 4,
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var a\\u1369;`, {
        source: 'var a\\u1369;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a፩',
                                start: 4,
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
                            start: 4,
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var a\\u136D;`, {
        source: 'var a\\u136D;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a፭',
                                start: 4,
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
                            start: 4,
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var a\\u00B7;`, {
        source: 'var a\\u00B7;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a·',
                                start: 4,
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
                            start: 4,
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var a\\u19DA;`, {
        source: 'var a\\u19DA;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a᧚',
                                start: 4,
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
                            start: 4,
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var a℮;`, {
        source: 'var a℮;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a℮',
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
                        }
                    ],
                    kind: 'var',
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
                }
            ],
            sourceType: 'script',
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
        }
      });

    pass(`var aᢆ;`, {
        source: 'var aᢆ;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'aᢆ',
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
                        }
                    ],
                    kind: 'var',
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
                }
            ],
            sourceType: 'script',
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
        }
      });

    pass(`var a፰;`, {
        source: 'var a፰;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a፰',
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
                        }
                    ],
                    kind: 'var',
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
                }
            ],
            sourceType: 'script',
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
        }
      });

    pass(`var a᧚;`, {
        source: 'var a᧚;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'a᧚',
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
                        }
                    ],
                    kind: 'var',
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
                }
            ],
            sourceType: 'script',
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
        }
      });

    pass(`var \\u1886;`, {
        source: 'var \\u1886;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'ᢆ',
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var ゛;`, {
        source: 'var ゛;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: '゛',
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
                                }
                            },
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
                            }
                        }
                    ],
                    kind: 'var',
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
      });

    pass(`var ᢅ;`, {
        source: 'var ᢅ;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'ᢅ',
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
                                }
                            },
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
                            }
                        }
                    ],
                    kind: 'var',
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
      });

    pass(`var \\u0024 = 1;`, {
          source: 'var \\u0024 = 1;',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'VariableDeclaration',
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
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      id: {
                          type: 'Identifier',
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
                          },
                          name: '$'
                      },
                      init: {
                          type: 'Literal',
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
                          },
                          value: 1,
                          raw: '1'
                      }
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

    pass(`var \\u{41}\\u{42}\\u{43};`, {
          source: 'var \\u{41}\\u{42}\\u{43};',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'VariableDeclaration',
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
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 22,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 22
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 22,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 22
                              }
                          },
                          name: 'ABC'
                      },
                      init: null
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

    pass(`var _\\u{1EE03}`, {
          source: 'var _\\u{1EE03}',
          loc: true,
          ranges: true,
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
                  type: 'VariableDeclaration',
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
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          name: '_𞸃'
                      },
                      init: null
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

    pass(`var \\u{1EE0A}\\u{1EE0B}`, {
          source: 'var \\u{1EE0A}\\u{1EE0B}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'VariableDeclaration',
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
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 22,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 22
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 22,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 22
                              }
                          },
                          name: '𞸊𞸋'
                      },
                      init: null
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

    pass(`var A\\u{42}C;`, {
          source: 'var A\\u{42}C;',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'VariableDeclaration',
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
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 4,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      id: {
                          type: 'Identifier',
                          start: 4,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 4
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          name: 'ABC'
                      },
                      init: null
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });

    pass(`let ℮`, {
          source: 'let ℮',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: '℮',
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
                                }
                            },
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
                            }
                        }
                    ],
                    kind: 'let',
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

    pass(`var ℘;`, {
          source: 'var ℘;',
          loc: true,
          ranges: true,
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
                  type: 'VariableDeclaration',
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
                  declarations: [{
                      type: 'VariableDeclarator',
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
                      id: {
                          type: 'Identifier',
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
                          name: '℘'
                      },
                      init: null
                  }],
                  kind: 'var'
              }],
              sourceType: 'script'
          }
      });
  });