import { fail, pass } from '../test-utils';

describe('Literals - Numbers', () => {

    fail(`"\\1"; "use strict";`, {
        source: `"\\1"; "use strict";`,
        line: 1
    });

    fail(`"\\1"; "use strict";`, {
        source: `"\\1"; "use strict";`,
        line: 1
    });

    fail(`0X123abcexport foo from "bar"`, {
        source: `0X123abcexport foo from "bar"`,
        module: true,
        line: 1
    });

    fail(`0X1$$`, {
        source: `0X1$$`,
        line: 1
    });

    fail(`0X123ABC$`, {
        source: `0X123ABC$`,
        line: 1
    });

    fail(`0X123ABC$`, {
        source: `0X123ABC$`,
        line: 1
    });

    fail(`0X123ABC\\u{50}`, {
        source: `0X123ABC\\u{50}`,
        line: 1
    });

    fail(`0X123abcinterface`, {
        source: `0X123abcinterface`,
        line: 1
    });

    fail(`0X123abcinterface`, {
        source: `0X123abcinterface`,
        line: 1
    });

    fail(`0o09`, {
        source: `0o09`,
        line: 1
    });

    fail(`0b15`, {
        source: `0b15`,
        line: 1
    });

    fail(`0b0101012`, {
        source: `0b0101012`,
        line: 1
    });

    fail(`0B0101015`, {
        source: `0B0101015`,
        line: 1
    });

    fail(`"\\1"; "use strict";`, {
        source: `"\\1"; "use strict";`,
        line: 1
    });

    fail(`1=1`, {
        source: `1=1`,
        line: 1
    });

    fail(`const t = 2.34e-;const b = 4.3e--3;`, {
        source: 'const t = 2.34e-;const b = 4.3e--3;',
        line: 1
    });

    fail(`"use strict"; var foo = 000;`, {
        source: '"use strict"; var foo = 000;',
        line: 1
    });

    fail(`"use strict"; var foo = 07;`, {
        source: '"use strict"; var foo = 07;',
        line: 1
    });

    fail(`"use strict"; var foo = 05;`, {
        source: '"use strict"; var foo = 05;',
        line: 1
    });

    fail(`0o`, {
        source: '0o',
        line: 1
    });

    fail(`06.7`, {
        source: '06.7',
        line: 1
    });

    fail(`0b;`, {
        source: '0b;',
        line: 1
    });

    fail(`00b0;`, {
        source: '00b0;',
        line: 1
    });

    fail(`"use strict"; 01;`, {
        source: '"use strict"; 01;',
        line: 1
    });

    fail(`0\\u00620;`, {
        source: '0\\u00620;',
        line: 1
    });

    fail(`0b8;`, {
        source: '0b8;',
        line: 1
    });

    fail(`0o8;`, {
        source: '0o8;',
        line: 1
    });

    fail(`0o;`, {
        source: '0o;',
        line: 1
    });

    fail(`"use strict"; 08;`, {
        source: '"use strict"; 08;',
        line: 1
    });

    fail(`0x¤%&/()`, {
        source: '0x¤%&/()',
        line: 1
    });

    fail(`"use strict"; 018`, {
        source: '"use strict"; 018',
        line: 1
    });

    fail(`0\\u00620`, {
        source: '0\\u00620',
        line: 1
    });

    fail(`1.e`, {
        source: '1.e',
        line: 1
    });

    fail(`0b2`, {
        source: '0b2',
        line: 1
    });

    fail(`0b1a;`, {
        source: '0b1a',
        line: 1
    });

    fail(`0B18`, {
        source: '0B18',
        line: 1
    });

    fail(`0o1a;`, {
        source: '0o1a',
        line: 1
    });

    fail(`0123456789abcdef`, {
        source: '0123456789abcdef',
        line: 1
    });

    fail(`09.x`, {
        source: '09.x',
        line: 1
    });

    fail(`0b1a;`, {
        source: '0b1a',
        line: 1
    });

    pass(`0B010101`, {
        source: '0B010101',
        raw: true,
        ranges: true,
        loc: true,
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
                  value: 21,
                  raw: '0B010101'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0o123`, {
        source: '0o123',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
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
            body: [
              {
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'Literal',
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
                  value: 83,
                  raw: '0o123'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0x0000`, {
        source: '0x0000',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 0,
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
                        raw: '0x0000'
                    },
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

    pass(`0xFF80`, {
        source: '0xFF80',
        raw: true,
        ranges: true,
        loc: true,
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
            body: [
              {
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
                  value: 65408,
                  raw: '0xFF80'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0xFFFFFF`, {
        source: '0xFFFFFF',
        raw: true,
        ranges: true,
        loc: true,
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
                  value: 16777215,
                  raw: '0xFFFFFF'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0xFFFFFF80FF`, {
        source: '0xFFFFFF80FF',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
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
            body: [
              {
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'Literal',
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
                  value: 1099511595263,
                  raw: '0xFFFFFF80FF'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0xFFFFFF80`, {
        source: '0xFFFFFF80',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'ExpressionStatement',
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
                },
                expression: {
                  type: 'Literal',
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
                  },
                  value: 4294967168,
                  raw: '0xFFFFFF80'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0xe4b8ad`, {
        source: '0xe4b8ad',
        raw: true,
        ranges: true,
        loc: true,
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
                  value: 14989485,
                  raw: '0xe4b8ad'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0xe69687`, {
        source: '0xe69687',
        raw: true,
        ranges: true,
        loc: true,
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
                  value: 15111815,
                  raw: '0xe69687'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0x80808080`, {
        source: '0x80808080',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'ExpressionStatement',
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
                },
                expression: {
                  type: 'Literal',
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
                  },
                  value: 2155905152,
                  raw: '0x80808080'
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`0008.324`, {
        source: '0008.324',
        raw: true,
        ranges: true,
        loc: true,
        expected: {
              body: [
                {
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
                        line: 1,
                      }
                    },
                    raw: '0008.324',
                    start: 0,
                   type: 'Literal',
                    value: 8.324,
                  },
                  loc: {
                    end: {
                      column: 8,
                      line: 1
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
              end: 8,
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
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass(`0o1 & 0o10;`, {
    source: '0o1 & 0o10;',
    raw: true,
    ranges: true,
    loc: true,
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
              type: 'BinaryExpression',
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
              },
              left: {
                type: 'Literal',
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
                value: 1,
                raw: '0o1'
              },
              operator: '&',
              right: {
                type: 'Literal',
                start: 6,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                },
                value: 8,
                raw: '0o10'
              }
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`0o2 ^ 0o3;`, {
    source: '0o2 ^ 0o3;',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Literal',
                        value: 2,
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
                        raw: '0o2'
                    },
                    right: {
                        type: 'Literal',
                        value: 3,
                        start: 6,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        },
                        raw: '0o3'
                    },
                    operator: '^',
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

    pass(`var b1 = 0b01111111111111111111111111111111;`, {
    source: 'var b1 = 0b01111111111111111111111111111111;',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        start: 0,
        end: 44,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 44
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 44
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                },
                id: {
                  type: 'Identifier',
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
                  },
                  name: 'b1'
                },
                init: {
                  type: 'Literal',
                  start: 9,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 43
                    }
                  },
                  value: 2147483647,
                  raw: '0b01111111111111111111111111111111'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`44`, {
      source: '44',
      raw: true,
      loc: true,
      ranges: true,
      expected: {
        type: 'Program',
        start: 0,
        end: 2,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 2
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 2,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 2
              }
            },
            expression: {
              type: 'Literal',
              start: 0,
              end: 2,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 2
                }
              },
              value: 44,
              raw: '44'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`8E+01`, {
      source: '8E+01',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'Literal',
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
              value: 80,
              raw: '8E+01'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`3e00`, {
      source: '3e00',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'Literal',
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
              value: 3,
              raw: '3e00'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`0e+01`, {
      source: '0e+01',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'Literal',
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
              value: 0,
              raw: '0e+01'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`3e-01`, {
      source: '3e-01',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'Literal',
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
              value: 0.3,
              raw: '3e-01'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`8e01`, {
      source: '8e01',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 80,
                  raw: '8e01'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0.E0`, {
      source: '0.E0',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 0,
                  raw: '0.E0'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`6.6e+1`, {
      source: '6.6e+1',
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
                  value: 66,
                  raw: '6.6e+1'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`7`, {
      source: '7',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 1,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 1
              }
          },
          body: [{
              type: 'ExpressionStatement',
              start: 0,
              end: 1,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 1
                  }
              },
              expression: {
                  type: 'Literal',
                  start: 0,
                  end: 1,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 1
                      }
                  },
                  value: 7,
                  raw: '7'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0.`, {
      source: '0.',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 2,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 2
              }
          },
          body: [{
              type: 'ExpressionStatement',
              start: 0,
              end: 2,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 2
                  }
              },
              expression: {
                  type: 'Literal',
                  start: 0,
                  end: 2,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 2
                      }
                  },
                  value: 0,
                  raw: '0.'
              }
          }],
          sourceType: 'script'
      }
  });
/*
    pass(`80X010000000`, {
      source: '0X010000000',
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
          body: [{
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
                  type: 'Literal',
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
                  value: 268435456,
                  raw: '0X010000000'
              }
          }],
          sourceType: 'script'
      }
  });*/

    pass(`0x10`, {
      source: '0x10',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 16,
                  raw: '0x10'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0X010`, {
      source: '0X010',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 16,
                  raw: '0X010'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0012`, {
      source: '0012',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'Literal',
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
              value: 10,
              raw: '0012'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`6.02214179e+23`, {
      source: '6.02214179e+23',
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
        body: [
          {
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
              value: 6.02214179e+23,
              raw: '6.02214179e+23'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`0xf`, {
      source: '0xf',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 15,
                  raw: '0xf'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0b00`, {
      source: '0b00',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 0,
                  raw: '0b00'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0b11`, {
      source: '0b11',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 3,
                  raw: '0b11'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0128`, {
      source: '0128',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 128,
                  raw: '0128'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`09.5`, {
      source: '09.5',
      expected: {
          body: [{
              expression: {
                  type: 'Literal',
                  value: 9.5,
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass(`08`, {
      source: '08',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 2,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 2
              }
          },
          body: [{
              type: 'ExpressionStatement',
              start: 0,
              end: 2,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 2
                  }
              },
              expression: {
                  type: 'Literal',
                  start: 0,
                  end: 2,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 2
                      }
                  },
                  value: 8,
                  raw: '08'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0008`, {
      source: '0008',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 8,
                  raw: '0008'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0o07`, {
      source: '0o07',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'ExpressionStatement',
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
              expression: {
                  type: 'Literal',
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
                  value: 7,
                  raw: '0o07'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`0O0`, {
      source: '0O0',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'Literal',
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
              value: 0,
              raw: '0O0'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`01.a`, {
      source: '01.a',
      raw: true,
      ranges: true,
      loc: true,
      expected: {
        type: 'Program',
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
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'MemberExpression',
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
              object: {
                type: 'Literal',
                start: 0,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                },
                value: 1,
                raw: '01'
              },
              property: {
                type: 'Identifier',
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
                },
                name: 'a'
              },
              computed: false
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`.123`, {
    source: '.123',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 0.123,
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
                    raw: '.123'
                },
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
            }
        ],
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
    }
  });

    pass(`1.`, {
    source: '1.',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 1,
                    start: 0,
                    end: 2,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 2
                        }
                    },
                    raw: '1.'
                },
                start: 0,
                end: 2,
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
            }
        ],
        start: 0,
        end: 2,
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
    }
  });

    pass(`1.34`, {
    source: '1.34',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 1.34,
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
                    raw: '1.34'
                },
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
            }
        ],
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
    }
  });

    pass(`134e44`, {
    source: '134e44',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 1.34e+46,
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
                    raw: '134e44'
                },
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

    pass(`134.e44`, {
    source: '134.e44',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 1.34e+46,
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
                    },
                    raw: '134.e44'
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
            }
        ],
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

    pass(`134.44e44`, {
    source: '134.44e44',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 1.3444e+46,
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
                    raw: '134.44e44'
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

    pass(`0777`, {
    source: '0777',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 511,
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
                    raw: '0777'
                },
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
            }
        ],
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
    }
  });

    pass(`-.44`, {
    source: '-.44',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '-',
                    argument: {
                        type: 'Literal',
                        value: 0.44,
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
                        },
                        raw: '.44'
                    },
                    prefix: true,
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
            }
        ],
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
    }
  });

    pass(`5e-2`, {
    source: '5e-2',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 0.05,
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
                    raw: '5e-2'
                },
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
            }
        ],
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
    }
  });

  // Acorn fails on this three tests

    pass(`0008.123`, {
    source: '0008.123',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
          body: [
            {
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
                    line: 1,
                  }
                },
                raw: '0008.123',
                start: 0,
                type: 'Literal',
                value: '0008.123',
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
              type: 'ExpressionStatement'
            }
          ],
          end: 8,
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
          sourceType: 'script',
          start: 0,
          type: 'Program'
        }
  });

    pass(`0008E+01`, {
    source: '0008E+01',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 80,
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
                    raw: '0008E+01'
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

    pass(`0009E+01`, {
    source: '0009E+01',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 90,
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
                    raw: '0009E+01'
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

});