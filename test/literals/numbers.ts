import { fail, pass } from '../utils';

describe('Literals - Numbers', () => {

  const literalClasses = {
      'Binary Integer Literal': [
          '0b0', '0b1', '0b010101',
          '0B0', '0B1', '0B010101',
          '0B12',
      ],
      'Octal Integer Literal': [
          '0o0', '0o1', '0o123',
          '0O0', '0O1', '0O123'
      ]
  };

  // Numeric literal followed by invalid digit
  for (const literal of literalClasses['Octal Integer Literal']) {
      for (const nonOctalDigit of ['8', '9']) {
          fail(`${literal}${nonOctalDigit}`, {
              source: `${literal}${nonOctalDigit}`
          });
      }
  }

  const nonBinaryDigits = ['2', '3', '4', '5', '6', '7', '8', '9'];
  for (const literal of literalClasses['Binary Integer Literal']) {
      for (const nonBinaryDigit of nonBinaryDigits) {
          fail(`${literal}${nonBinaryDigit}`, {
              source: `${literal}${nonBinaryDigit}`
          });
      }
  }

  fail(`const t = 2.34e-;const b = 4.3e--3;`, {
      source: 'const t = 2.34e-;const b = 4.3e--3;',
  });

  fail(`"use strict"; var foo = 000;`, {
      source: '"use strict"; var foo = 000;',
  });

  fail(`"use strict"; var foo = 07;`, {
      source: '"use strict"; var foo = 07;',
  });

  fail(`"use strict"; var foo = 05;`, {
      source: '"use strict"; var foo = 05;',
  });

  fail(`06.7`, {
      source: '06.7',
  });

  fail(`0b;`, {
      source: '0b;',
  });

  fail(`00b0;`, {
      source: '00b0;',
  });

  fail(`"use strict"; 01;`, {
      source: '"use strict"; 01;',
  });

  fail(`0\\u00620;`, {
      source: '0\\u00620;',
  });

  fail(`0o8;`, {
      source: '0o8;',
  });

  fail(`0o;`, {
      source: '0o;',
  });

  fail(`"use strict"; 08;`, {
      source: '"use strict"; 08;',
  });

  fail(`0x¤%&/()`, {
      source: '0x¤%&/()',
  });

  fail(`"use strict"; 018`, {
      source: '"use strict"; 018',
  });

  fail(`0\\u00620`, {
      source: '0\\u00620',
  });

  fail(`0b2`, {
      source: '0b2',
  });

  fail(`0b1a;`, {
      source: '0b1a',
  });

  fail(`0B18`, {
      source: '0B18',
  });

  fail(`0o1a;`, {
      source: '0o1a',
  });

  fail(`09.x`, {
      source: '09.x',
  });

  fail(`0b1a;`, {
      source: '0b1a',
  });

  pass(`0o1 & 0o10;`, {
    source: '0o1 & 0o10;',
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
                        value: 1,
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
                        raw: '0o1'
                    },
                    right: {
                        type: 'Literal',
                        value: 8,
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
                        raw: '0o10'
                    },
                    operator: '&',
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
        body: [
            {
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        init: {
                            type: 'Literal',
                            value: 2147483647,
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
                            raw: '0b01111111111111111111111111111111'
                        },
                        id: {
                            type: 'Identifier',
                            name: 'b1',
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
                        }
                    }
                ],
                kind: 'var',
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
                }
            }
        ],
        sourceType: 'script',
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
        }
    }
  });

  pass(`44`, {
      source: '44',
      raw: true,
      ranges: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 2,
          body: [{
              type: 'ExpressionStatement',
              start: 0,
              end: 2,
              expression: {
                  type: 'Literal',
                  start: 0,
                  end: 2,
                  value: 44,
                  raw: '44'
              }
          }],
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
                  value: 80,
                  raw: '8E+01'
              }
          }],
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
                  raw: '3e00'
              }
          }],
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
                  value: 0,
                  raw: '0e+01'
              }
          }],
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
                  value: 0.3,
                  raw: '3e-01'
              }
          }],
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
  });

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
                  value: 10,
                  raw: '0012'
              }
          }],
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
          }],
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
                  value: 0,
                  raw: '0O0'
              }
          }],
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
          }],
          sourceType: 'script'
      }
  });
});