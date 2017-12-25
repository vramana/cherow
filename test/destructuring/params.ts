import { pass, fail } from '../utils';

describe('Destructuring - Params', () => {

  fail(`function foo(({})) {}`, {
      source: 'function foo(({})) {}',
  });

  fail(`function foo([x}) {}`, {
      source: 'function foo([x}) {}',
  });

  fail(`function foo([super()]) {}`, {
      source: 'function foo([super()]) {}',
  });

  fail(`function foo([x], {x:x}) {}`, {
      source: 'function foo([x], {x:x}) {}',
  });

  fail(`function foo([x], x) {}`, {
      source: 'function foo([x], x) {}',
  });

  fail(`function foo(x, [x]) {}`, {
      source: 'function foo(x, [x]) {}',
  });

  fail(`function foo({x:{z:[z1]}}, z1) {}`, {
      source: 'function foo({x:{z:[z1]}}, z1) {}',
  });

  fail(`function foo([x]) { let x = 10;}`, {
      source: 'function foo([x]) { let x = 10;}',
  });

  pass(`function foo({x1:x1 = 1, x2:x2 = 2, x3:x3 = 3}) {}`, {
    source: 'function foo({x1:x1 = 1, x2:x2 = 2, x3:x3 = 3}) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 50,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 50
        }
      },
      body: [
        {
          type: 'FunctionDeclaration',
          start: 0,
          end: 50,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 50
            }
          },
          id: {
            type: 'Identifier',
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
            },
            name: 'foo'
          },
          generator: false,
          expression: false,
          async: false,
          params: [
            {
              type: 'ObjectPattern',
              start: 13,
              end: 46,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 46
                }
              },
              properties: [
                {
                  type: 'Property',
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
                  },
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 14,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    },
                    name: 'x1'
                  },
                  value: {
                    type: 'AssignmentPattern',
                    start: 17,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 17,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      },
                      name: 'x1'
                    },
                    right: {
                      type: 'Literal',
                      start: 22,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      },
                      value: 1,
                      raw: '1'
                    }
                  },
                  kind: 'init'
                },
                {
                  type: 'Property',
                  start: 25,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  },
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 25,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    },
                    name: 'x2'
                  },
                  value: {
                    type: 'AssignmentPattern',
                    start: 28,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 28,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      },
                      name: 'x2'
                    },
                    right: {
                      type: 'Literal',
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
                      },
                      value: 2,
                      raw: '2'
                    }
                  },
                  kind: 'init'
                },
                {
                  type: 'Property',
                  start: 36,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 36
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  },
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 36,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 36
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    },
                    name: 'x3'
                  },
                  value: {
                    type: 'AssignmentPattern',
                    start: 39,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 39
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 39,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 39
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      },
                      name: 'x3'
                    },
                    right: {
                      type: 'Literal',
                      start: 44,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 44
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      },
                      value: 3,
                      raw: '3'
                    }
                  },
                  kind: 'init'
                }
              ]
            }
          ],
          body: {
            type: 'BlockStatement',
            start: 48,
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 48
              },
              end: {
                line: 1,
                column: 50
              }
            },
            body: []
          }
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`function foo({x1:x1 = 1}, [y1 = 2]) {}`, {
    source: 'function foo({x1:x1 = 1}, [y1 = 2]) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'FunctionDeclaration',
              params: [
                  {
                      type: 'ObjectPattern',
                      properties: [
                          {
                              type: 'Property',
                              kind: 'init',
                              key: {
                                  type: 'Identifier',
                                  name: 'x1',
                                  start: 14,
                                  end: 16,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 14
                                      },
                                      end: {
                                          line: 1,
                                          column: 16
                                      }
                                  }
                              },
                              computed: false,
                              value: {
                                  type: 'AssignmentPattern',
                                  left: {
                                      type: 'Identifier',
                                      name: 'x1',
                                      start: 17,
                                      end: 19,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 17
                                          },
                                          end: {
                                              line: 1,
                                              column: 19
                                          }
                                      }
                                  },
                                  right: {
                                      type: 'Literal',
                                      value: 1,
                                      start: 22,
                                      end: 23,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 22
                                          },
                                          end: {
                                              line: 1,
                                              column: 23
                                          }
                                      },
                                      raw: '1'
                                  },
                                  start: 17,
                                  end: 23,
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
                              method: false,
                              shorthand: false,
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
                      start: 13,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      }
                  },
                  {
                      type: 'ArrayPattern',
                      elements: [
                          {
                              type: 'AssignmentPattern',
                              left: {
                                  type: 'Identifier',
                                  name: 'y1',
                                  start: 27,
                                  end: 29,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 27
                                      },
                                      end: {
                                          line: 1,
                                          column: 29
                                      }
                                  }
                              },
                              right: {
                                  type: 'Literal',
                                  value: 2,
                                  start: 32,
                                  end: 33,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 32
                                      },
                                      end: {
                                          line: 1,
                                          column: 33
                                      }
                                  },
                                  raw: '2'
                              },
                              start: 27,
                              end: 33,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 27
                                  },
                                  end: {
                                      line: 1,
                                      column: 33
                                  }
                              }
                          }
                      ],
                      start: 26,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 26
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      }
                  }
              ],
              body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 36,
                  end: 38,
                  loc: {
                      start: {
                          line: 1,
                          column: 36
                      },
                      end: {
                          line: 1,
                          column: 38
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

  pass(`function foo({x1:[y1 = 1]}) {}`, {
    source: 'function foo({x1:[y1 = 1]}) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'FunctionDeclaration',
              params: [
                  {
                      type: 'ObjectPattern',
                      properties: [
                          {
                              type: 'Property',
                              kind: 'init',
                              key: {
                                  type: 'Identifier',
                                  name: 'x1',
                                  start: 14,
                                  end: 16,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 14
                                      },
                                      end: {
                                          line: 1,
                                          column: 16
                                      }
                                  }
                              },
                              computed: false,
                              value: {
                                  type: 'ArrayPattern',
                                  elements: [
                                      {
                                          type: 'AssignmentPattern',
                                          left: {
                                              type: 'Identifier',
                                              name: 'y1',
                                              start: 18,
                                              end: 20,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 18
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 20
                                                  }
                                              }
                                          },
                                          right: {
                                              type: 'Literal',
                                              value: 1,
                                              start: 23,
                                              end: 24,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 23
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 24
                                                  }
                                              },
                                              raw: '1'
                                          },
                                          start: 18,
                                          end: 24,
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
                                      }
                                  ],
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
                              method: false,
                              shorthand: false,
                              start: 14,
                              end: 25,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 25
                                  }
                              }
                          }
                      ],
                      start: 13,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      }
                  }
              ],
              body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 28,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 28
                      },
                      end: {
                          line: 1,
                          column: 30
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
              end: 30,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 30
                  }
              }
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 30,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 30
          }
      }
  }
  });

  pass(`function foo([a] = class c extends eval(''){}) {}`, {
    source: 'function foo([a] = class c extends eval(""){}) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'FunctionDeclaration',
              params: [
                  {
                      type: 'AssignmentPattern',
                      left: {
                          type: 'ArrayPattern',
                          elements: [
                              {
                                  type: 'Identifier',
                                  name: 'a',
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
                              }
                          ],
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
                      right: {
                          type: 'ClassExpression',
                          id: {
                              type: 'Identifier',
                              name: 'c',
                              start: 25,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 25
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              }
                          },
                          superClass: {
                              type: 'CallExpression',
                              callee: {
                                  type: 'Identifier',
                                  name: 'eval',
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
                              arguments: [
                                  {
                                      type: 'Literal',
                                      value: '',
                                      start: 40,
                                      end: 42,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 40
                                          },
                                          end: {
                                              line: 1,
                                              column: 42
                                          }
                                      },
                                      raw: '""'
                                  }
                              ],
                              start: 19,
                              end: 43,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 19
                                  },
                                  end: {
                                      line: 1,
                                      column: 43
                                  }
                              }
                          },
                          body: {
                              type: 'ClassBody',
                              body: [],
                              start: 43,
                              end: 45,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 43
                                  },
                                  end: {
                                      line: 1,
                                      column: 45
                                  }
                              }
                          },
                          start: 19,
                          end: 45,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 19
                              },
                              end: {
                                  line: 1,
                                  column: 45
                              }
                          }
                      },
                      start: 13,
                      end: 45,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 45
                          }
                      }
                  }
              ],
              body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 47,
                  end: 49,
                  loc: {
                      start: {
                          line: 1,
                          column: 47
                      },
                      end: {
                          line: 1,
                          column: 49
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
              end: 49,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 49
                  }
              }
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 49,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 49
          }
      }
  }
  });

  pass(`class foo { method([x1]){ }; set prop([x1]){} }`, {
    source: 'class foo { method([x1]){ }; set prop([x1]){} }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 47,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 47
        }
      },
      body: [
        {
          type: 'ClassDeclaration',
          start: 0,
          end: 47,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 47
            }
          },
          id: {
            type: 'Identifier',
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
            name: 'foo'
          },
          superClass: null,
          body: {
            type: 'ClassBody',
            start: 10,
            end: 47,
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 47
              }
            },
            body: [
              {
                type: 'MethodDefinition',
                start: 12,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                },
                computed: false,
                key: {
                  type: 'Identifier',
                  start: 12,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  name: 'method'
                },
                static: false,
                kind: 'method',
                value: {
                  type: 'FunctionExpression',
                  start: 18,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  },
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'ArrayPattern',
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
                      },
                      elements: [
                        {
                          type: 'Identifier',
                          start: 20,
                          end: 22,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 22
                            }
                          },
                          name: 'x1'
                        }
                      ]
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 24,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    },
                    body: []
                  }
                }
              },
              {
                type: 'MethodDefinition',
                start: 29,
                end: 45,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 45
                  }
                },
                computed: false,
                key: {
                  type: 'Identifier',
                  start: 33,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 33
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  },
                  name: 'prop'
                },
                static: false,
                kind: 'set',
                value: {
                  type: 'FunctionExpression',
                  start: 37,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 37
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  },
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  params: [
                    {
                      type: 'ArrayPattern',
                      start: 38,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      },
                      elements: [
                        {
                          type: 'Identifier',
                          start: 39,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 39
                            },
                            end: {
                              line: 1,
                              column: 41
                            }
                          },
                          name: 'x1'
                        }
                      ]
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    start: 43,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 43
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    },
                    body: []
                  }
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`let foo = function ({x1}, [x2]){};`, {
    source: 'let foo = function ({x1}, [x2]){};',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
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
      },
      body: [
        {
          type: 'VariableDeclaration',
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
          },
          declarations: [
            {
              type: 'VariableDeclarator',
              start: 4,
              end: 33,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 33
                }
              },
              id: {
                type: 'Identifier',
                start: 4,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                },
                name: 'foo'
              },
              init: {
                type: 'FunctionExpression',
                start: 10,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                },
                id: null,
                generator: false,
                expression: false,
                async: false,
                params: [
                  {
                    type: 'ObjectPattern',
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
                    },
                    properties: [
                      {
                        type: 'Property',
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
                        },
                        method: false,
                        shorthand: true,
                        computed: false,
                        key: {
                          type: 'Identifier',
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
                          },
                          name: 'x1'
                        },
                        kind: 'init',
                        value: {
                          type: 'Identifier',
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
                          },
                          name: 'x1'
                        }
                      }
                    ]
                  },
                  {
                    type: 'ArrayPattern',
                    start: 26,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 26
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    },
                    elements: [
                      {
                        type: 'Identifier',
                        start: 27,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 27
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        },
                        name: 'x2'
                      }
                    ]
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  start: 31,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 31
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  },
                  body: []
                }
              }
            }
          ],
          kind: 'let'
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`let obj = { foo({x}) {}, set prop([x]) {} }`, {
    source: 'let obj = { foo({x}) {}, set prop([x]) {} }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
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
      },
      body: [
        {
          type: 'VariableDeclaration',
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
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                },
                name: 'obj'
              },
              init: {
                type: 'ObjectExpression',
                start: 10,
                end: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                },
                properties: [
                  {
                    type: 'Property',
                    start: 12,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    },
                    method: true,
                    shorthand: false,
                    computed: false,
                    key: {
                      type: 'Identifier',
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
                      name: 'foo'
                    },
                    kind: 'init',
                    value: {
                      type: 'FunctionExpression',
                      start: 15,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [
                        {
                          type: 'ObjectPattern',
                          start: 16,
                          end: 19,
                          loc: {
                            start: {
                              line: 1,
                              column: 16
                            },
                            end: {
                              line: 1,
                              column: 19
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
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
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                type: 'Identifier',
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
                                },
                                name: 'x'
                              },
                              kind: 'init',
                              value: {
                                type: 'Identifier',
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
                                },
                                name: 'x'
                              }
                            }
                          ]
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
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
                        },
                        body: []
                      }
                    }
                  },
                  {
                    type: 'Property',
                    start: 25,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    },
                    method: false,
                    shorthand: false,
                    computed: false,
                    key: {
                      type: 'Identifier',
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
                      },
                      name: 'prop'
                    },
                    kind: 'set',
                    value: {
                      type: 'FunctionExpression',
                      start: 33,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [
                        {
                          type: 'ArrayPattern',
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
                          elements: [
                            {
                              type: 'Identifier',
                              start: 35,
                              end: 36,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 35
                                },
                                end: {
                                  line: 1,
                                  column: 36
                                }
                              },
                              name: 'x'
                            }
                          ]
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        start: 39,
                        end: 41,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 41
                          }
                        },
                        body: []
                      }
                    }
                  }
                ]
              }
            }
          ],
          kind: 'let'
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`function foo({x:x}, {y:y}, {z:z}) {}`, {
    source: 'function foo({x:x}, {y:y}, {z:z}) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 36,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 36
        }
      },
      body: [
        {
          type: 'FunctionDeclaration',
          start: 0,
          end: 36,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 36
            }
          },
          id: {
            type: 'Identifier',
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
            },
            name: 'foo'
          },
          generator: false,
          expression: false,
          async: false,
          params: [
            {
              type: 'ObjectPattern',
              start: 13,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 18
                }
              },
              properties: [
                {
                  type: 'Property',
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
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
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
                    },
                    name: 'x'
                  },
                  value: {
                    type: 'Identifier',
                    start: 16,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    },
                    name: 'x'
                  },
                  kind: 'init'
                }
              ]
            },
            {
              type: 'ObjectPattern',
              start: 20,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 25
                }
              },
              properties: [
                {
                  type: 'Property',
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
                  },
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 21,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    name: 'y'
                  },
                  value: {
                    type: 'Identifier',
                    start: 23,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    name: 'y'
                  },
                  kind: 'init'
                }
              ]
            },
            {
              type: 'ObjectPattern',
              start: 27,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 27
                },
                end: {
                  line: 1,
                  column: 32
                }
              },
              properties: [
                {
                  type: 'Property',
                  start: 28,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  },
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 28,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    },
                    name: 'z'
                  },
                  value: {
                    type: 'Identifier',
                    start: 30,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    },
                    name: 'z'
                  },
                  kind: 'init'
                }
              ]
            }
          ],
          body: {
            type: 'BlockStatement',
            start: 34,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 34
              },
              end: {
                line: 1,
                column: 36
              }
            },
            body: []
          }
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`function foo([x1], {y1:y1}) {}`, {
    source: 'function foo([x1], {y1:y1}) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 30,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 30
        }
      },
      body: [
        {
          type: 'FunctionDeclaration',
          start: 0,
          end: 30,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 30
            }
          },
          id: {
            type: 'Identifier',
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
            },
            name: 'foo'
          },
          generator: false,
          expression: false,
          async: false,
          params: [
            {
              type: 'ArrayPattern',
              start: 13,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 17
                }
              },
              elements: [
                {
                  type: 'Identifier',
                  start: 14,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  },
                  name: 'x1'
                }
              ]
            },
            {
              type: 'ObjectPattern',
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
              },
              properties: [
                {
                  type: 'Property',
                  start: 20,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  },
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 20,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    name: 'y1'
                  },
                  value: {
                    type: 'Identifier',
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
                    },
                    name: 'y1'
                  },
                  kind: 'init'
                }
              ]
            }
          ],
          body: {
            type: 'BlockStatement',
            start: 28,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 28
              },
              end: {
                line: 1,
                column: 30
              }
            },
            body: []
          }
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`function foo([,]) {}`, {
      source: 'function foo([,]) {}',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [{
              type: 'FunctionDeclaration',
              params: [{
                  type: 'ArrayPattern',
                  elements: [
                      null
                  ],
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
              }],
              body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 18,
                  end: 20,
                  loc: {
                      start: {
                          line: 1,
                          column: 18
                      },
                      end: {
                          line: 1,
                          column: 20
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
              end: 20,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 20
                  }
              }
          }],
          sourceType: 'script',
          start: 0,
          end: 20,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 20
              }
          }
      }
  });

  pass(`function foo([x], [y], [z]) {}`, {
      source: 'function foo([x], [y], [z]) {}',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [{
              type: 'FunctionDeclaration',
              params: [{
                      type: 'ArrayPattern',
                      elements: [{
                          type: 'Identifier',
                          name: 'x',
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
                      }],
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
                  {
                      type: 'ArrayPattern',
                      elements: [{
                          type: 'Identifier',
                          name: 'y',
                          start: 19,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 19
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          }
                      }],
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
                  {
                      type: 'ArrayPattern',
                      elements: [{
                          type: 'Identifier',
                          name: 'z',
                          start: 24,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 24
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          }
                      }],
                      start: 23,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 23
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      }
                  }
              ],
              body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 28,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 28
                      },
                      end: {
                          line: 1,
                          column: 30
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
              end: 30,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 30
                  }
              }
          }],
          sourceType: 'script',
          start: 0,
          end: 30,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 30
              }
          }
      }
  });

  pass(`function foo([x1], {y1:y1}) {}`, {
      source: 'function foo([x1], {y1:y1}) {}',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          body: [{
              type: 'FunctionDeclaration',
              params: [{
                      type: 'ArrayPattern',
                      elements: [{
                          type: 'Identifier',
                          name: 'x1',
                          start: 14,
                          end: 16,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 16
                              }
                          }
                      }],
                      start: 13,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      }
                  },
                  {
                      type: 'ObjectPattern',
                      properties: [{
                          type: 'Property',
                          kind: 'init',
                          key: {
                              type: 'Identifier',
                              name: 'y1',
                              start: 20,
                              end: 22,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 22
                                  }
                              }
                          },
                          computed: false,
                          value: {
                              type: 'Identifier',
                              name: 'y1',
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
                          method: false,
                          shorthand: false,
                          start: 20,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 20
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          }
                      }],
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
                  }
              ],
              body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 28,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 28
                      },
                      end: {
                          line: 1,
                          column: 30
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
              end: 30,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 30
                  }
              }
          }],
          sourceType: 'script',
          start: 0,
          end: 30,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 30
              }
          }
      }
  });

  pass(`function foo(x1, {x2, x3}, [x4, x5], x6) {}`, {
      source: 'function foo(x1, {x2, x3}, [x4, x5], x6) {}',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
              type: 'FunctionDeclaration',
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
              },
              id: {
                  type: 'Identifier',
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
                  },
                  name: 'foo'
              },
              generator: false,
              expression: false,
              async: false,
              params: [{
                      type: 'Identifier',
                      start: 13,
                      end: 15,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 15
                          }
                      },
                      name: 'x1'
                  },
                  {
                      type: 'ObjectPattern',
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
                      properties: [{
                              type: 'Property',
                              start: 18,
                              end: 20,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 18
                                  },
                                  end: {
                                      line: 1,
                                      column: 20
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 18,
                                  end: 20,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 18
                                      },
                                      end: {
                                          line: 1,
                                          column: 20
                                      }
                                  },
                                  name: 'x2'
                              },
                              kind: 'init',
                              value: {
                                  type: 'Identifier',
                                  start: 18,
                                  end: 20,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 18
                                      },
                                      end: {
                                          line: 1,
                                          column: 20
                                      }
                                  },
                                  name: 'x2'
                              }
                          },
                          {
                              type: 'Property',
                              start: 22,
                              end: 24,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 22
                                  },
                                  end: {
                                      line: 1,
                                      column: 24
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 22,
                                  end: 24,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 22
                                      },
                                      end: {
                                          line: 1,
                                          column: 24
                                      }
                                  },
                                  name: 'x3'
                              },
                              kind: 'init',
                              value: {
                                  type: 'Identifier',
                                  start: 22,
                                  end: 24,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 22
                                      },
                                      end: {
                                          line: 1,
                                          column: 24
                                      }
                                  },
                                  name: 'x3'
                              }
                          }
                      ]
                  },
                  {
                      type: 'ArrayPattern',
                      start: 27,
                      end: 35,
                      loc: {
                          start: {
                              line: 1,
                              column: 27
                          },
                          end: {
                              line: 1,
                              column: 35
                          }
                      },
                      elements: [{
                              type: 'Identifier',
                              start: 28,
                              end: 30,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 28
                                  },
                                  end: {
                                      line: 1,
                                      column: 30
                                  }
                              },
                              name: 'x4'
                          },
                          {
                              type: 'Identifier',
                              start: 32,
                              end: 34,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 32
                                  },
                                  end: {
                                      line: 1,
                                      column: 34
                                  }
                              },
                              name: 'x5'
                          }
                      ]
                  },
                  {
                      type: 'Identifier',
                      start: 37,
                      end: 39,
                      loc: {
                          start: {
                              line: 1,
                              column: 37
                          },
                          end: {
                              line: 1,
                              column: 39
                          }
                      },
                      name: 'x6'
                  }
              ],
              body: {
                  type: 'BlockStatement',
                  start: 41,
                  end: 43,
                  loc: {
                      start: {
                          line: 1,
                          column: 41
                      },
                      end: {
                          line: 1,
                          column: 43
                      }
                  },
                  body: []
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`function foo([x1, {y1:y1}]) {}`, {
      source: 'function foo([x1, {y1:y1}]) {}',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 30,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 30
              }
          },
          body: [{
              type: 'FunctionDeclaration',
              start: 0,
              end: 30,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 30
                  }
              },
              id: {
                  type: 'Identifier',
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
                  },
                  name: 'foo'
              },
              generator: false,
              expression: false,
              async: false,
              params: [{
                  type: 'ArrayPattern',
                  start: 13,
                  end: 26,
                  loc: {
                      start: {
                          line: 1,
                          column: 13
                      },
                      end: {
                          line: 1,
                          column: 26
                      }
                  },
                  elements: [{
                          type: 'Identifier',
                          start: 14,
                          end: 16,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 16
                              }
                          },
                          name: 'x1'
                      },
                      {
                          type: 'ObjectPattern',
                          start: 18,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 19,
                              end: 24,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 19
                                  },
                                  end: {
                                      line: 1,
                                      column: 24
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 19,
                                  end: 21,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 19
                                      },
                                      end: {
                                          line: 1,
                                          column: 21
                                      }
                                  },
                                  name: 'y1'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 22,
                                  end: 24,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 22
                                      },
                                      end: {
                                          line: 1,
                                          column: 24
                                      }
                                  },
                                  name: 'y1'
                              },
                              kind: 'init'
                          }]
                      }
                  ]
              }],
              body: {
                  type: 'BlockStatement',
                  start: 28,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 28
                      },
                      end: {
                          line: 1,
                          column: 30
                      }
                  },
                  body: []
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`class foo { method([x1]){ }; set prop([x1]){} }`, {
      source: 'class foo { method([x1]){ }; set prop([x1]){} }',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 47,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 47
              }
          },
          body: [{
              type: 'ClassDeclaration',
              start: 0,
              end: 47,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 47
                  }
              },
              id: {
                  type: 'Identifier',
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
                  name: 'foo'
              },
              superClass: null,
              body: {
                  type: 'ClassBody',
                  start: 10,
                  end: 47,
                  loc: {
                      start: {
                          line: 1,
                          column: 10
                      },
                      end: {
                          line: 1,
                          column: 47
                      }
                  },
                  body: [{
                          type: 'MethodDefinition',
                          start: 12,
                          end: 27,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 12
                              },
                              end: {
                                  line: 1,
                                  column: 27
                              }
                          },
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 12,
                              end: 18,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 18
                                  }
                              },
                              name: 'method'
                          },
                          static: false,
                          kind: 'method',
                          value: {
                              type: 'FunctionExpression',
                              start: 18,
                              end: 27,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 18
                                  },
                                  end: {
                                      line: 1,
                                      column: 27
                                  }
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [{
                                  type: 'ArrayPattern',
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
                                  },
                                  elements: [{
                                      type: 'Identifier',
                                      start: 20,
                                      end: 22,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 20
                                          },
                                          end: {
                                              line: 1,
                                              column: 22
                                          }
                                      },
                                      name: 'x1'
                                  }]
                              }],
                              body: {
                                  type: 'BlockStatement',
                                  start: 24,
                                  end: 27,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 24
                                      },
                                      end: {
                                          line: 1,
                                          column: 27
                                      }
                                  },
                                  body: []
                              }
                          }
                      },
                      {
                          type: 'MethodDefinition',
                          start: 29,
                          end: 45,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 29
                              },
                              end: {
                                  line: 1,
                                  column: 45
                              }
                          },
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 33,
                              end: 37,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 33
                                  },
                                  end: {
                                      line: 1,
                                      column: 37
                                  }
                              },
                              name: 'prop'
                          },
                          static: false,
                          kind: 'set',
                          value: {
                              type: 'FunctionExpression',
                              start: 37,
                              end: 45,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 37
                                  },
                                  end: {
                                      line: 1,
                                      column: 45
                                  }
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [{
                                  type: 'ArrayPattern',
                                  start: 38,
                                  end: 42,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 38
                                      },
                                      end: {
                                          line: 1,
                                          column: 42
                                      }
                                  },
                                  elements: [{
                                      type: 'Identifier',
                                      start: 39,
                                      end: 41,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 39
                                          },
                                          end: {
                                              line: 1,
                                              column: 41
                                          }
                                      },
                                      name: 'x1'
                                  }]
                              }],
                              body: {
                                  type: 'BlockStatement',
                                  start: 43,
                                  end: 45,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 43
                                      },
                                      end: {
                                          line: 1,
                                          column: 45
                                      }
                                  },
                                  body: []
                              }
                          }
                      }
                  ]
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`let obj = { foo({x}) {}, set prop([x]) {} }`, {
      source: 'let obj = { foo({x}) {}, set prop([x]) {} }',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
              type: 'VariableDeclaration',
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
              },
              declarations: [{
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
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      name: 'obj'
                  },
                  init: {
                      type: 'ObjectExpression',
                      start: 10,
                      end: 43,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 43
                          }
                      },
                      properties: [{
                              type: 'Property',
                              start: 12,
                              end: 23,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 23
                                  }
                              },
                              method: true,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
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
                                  name: 'foo'
                              },
                              kind: 'init',
                              value: {
                                  type: 'FunctionExpression',
                                  start: 15,
                                  end: 23,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 15
                                      },
                                      end: {
                                          line: 1,
                                          column: 23
                                      }
                                  },
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [{
                                      type: 'ObjectPattern',
                                      start: 16,
                                      end: 19,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 16
                                          },
                                          end: {
                                              line: 1,
                                              column: 19
                                          }
                                      },
                                      properties: [{
                                          type: 'Property',
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
                                          },
                                          method: false,
                                          shorthand: true,
                                          computed: false,
                                          key: {
                                              type: 'Identifier',
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
                                              },
                                              name: 'x'
                                          },
                                          kind: 'init',
                                          value: {
                                              type: 'Identifier',
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
                                              },
                                              name: 'x'
                                          }
                                      }]
                                  }],
                                  body: {
                                      type: 'BlockStatement',
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
                                      },
                                      body: []
                                  }
                              }
                          },
                          {
                              type: 'Property',
                              start: 25,
                              end: 41,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 25
                                  },
                                  end: {
                                      line: 1,
                                      column: 41
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
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
                                  },
                                  name: 'prop'
                              },
                              kind: 'set',
                              value: {
                                  type: 'FunctionExpression',
                                  start: 33,
                                  end: 41,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 33
                                      },
                                      end: {
                                          line: 1,
                                          column: 41
                                      }
                                  },
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [{
                                      type: 'ArrayPattern',
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
                                      elements: [{
                                          type: 'Identifier',
                                          start: 35,
                                          end: 36,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 35
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 36
                                              }
                                          },
                                          name: 'x'
                                      }]
                                  }],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 39,
                                      end: 41,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 39
                                          },
                                          end: {
                                              line: 1,
                                              column: 41
                                          }
                                      },
                                      body: []
                                  }
                              }
                          }
                      ]
                  }
              }],
              kind: 'let'
          }],
          sourceType: 'script'
      }
  });

  pass(`function foo([x = 20]) {}`, {
      source: 'function foo([x = 20]) {}',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          body: [{
              type: 'FunctionDeclaration',
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
              id: {
                  type: 'Identifier',
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
                  },
                  name: 'foo'
              },
              generator: false,
              expression: false,
              async: false,
              params: [{
                  type: 'ArrayPattern',
                  start: 13,
                  end: 21,
                  loc: {
                      start: {
                          line: 1,
                          column: 13
                      },
                      end: {
                          line: 1,
                          column: 21
                      }
                  },
                  elements: [{
                      type: 'AssignmentPattern',
                      start: 14,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      },
                      left: {
                          type: 'Identifier',
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
                          },
                          name: 'x'
                      },
                      right: {
                          type: 'Literal',
                          start: 18,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          },
                          value: 20,
                          raw: '20'
                      }
                  }]
              }],
              body: {
                  type: 'BlockStatement',
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
                  },
                  body: []
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`function foo([x1 = 1], {y1:y1 = 2}) {}`, {
      source: 'function foo([x1 = 1], {y1:y1 = 2}) {}',
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
          body: [{
              type: 'FunctionDeclaration',
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
              id: {
                  type: 'Identifier',
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
                  },
                  name: 'foo'
              },
              generator: false,
              expression: false,
              async: false,
              params: [{
                      type: 'ArrayPattern',
                      start: 13,
                      end: 21,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 21
                          }
                      },
                      elements: [{
                          type: 'AssignmentPattern',
                          start: 14,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          },
                          left: {
                              type: 'Identifier',
                              start: 14,
                              end: 16,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 16
                                  }
                              },
                              name: 'x1'
                          },
                          right: {
                              type: 'Literal',
                              start: 19,
                              end: 20,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 19
                                  },
                                  end: {
                                      line: 1,
                                      column: 20
                                  }
                              },
                              value: 1,
                              raw: '1'
                          }
                      }]
                  },
                  {
                      type: 'ObjectPattern',
                      start: 23,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 23
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 24,
                          end: 33,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 24
                              },
                              end: {
                                  line: 1,
                                  column: 33
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 24,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 24
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              },
                              name: 'y1'
                          },
                          value: {
                              type: 'AssignmentPattern',
                              start: 27,
                              end: 33,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 27
                                  },
                                  end: {
                                      line: 1,
                                      column: 33
                                  }
                              },
                              left: {
                                  type: 'Identifier',
                                  start: 27,
                                  end: 29,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 27
                                      },
                                      end: {
                                          line: 1,
                                          column: 29
                                      }
                                  },
                                  name: 'y1'
                              },
                              right: {
                                  type: 'Literal',
                                  start: 32,
                                  end: 33,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 32
                                      },
                                      end: {
                                          line: 1,
                                          column: 33
                                      }
                                  },
                                  value: 2,
                                  raw: '2'
                              }
                          },
                          kind: 'init'
                      }]
                  }
              ],
              body: {
                  type: 'BlockStatement',
                  start: 36,
                  end: 38,
                  loc: {
                      start: {
                          line: 1,
                          column: 36
                      },
                      end: {
                          line: 1,
                          column: 38
                      }
                  },
                  body: []
              }
          }],
          sourceType: 'script'
      }
  });

  pass(`let ret = f1({x:1});`, {
      source: 'let ret = f1({x:1});',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 20,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 20
              }
          },
          body: [{
              type: 'VariableDeclaration',
              start: 0,
              end: 20,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 20
                  }
              },
              declarations: [{
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 19,
                  loc: {
                      start: {
                          line: 1,
                          column: 4
                      },
                      end: {
                          line: 1,
                          column: 19
                      }
                  },
                  id: {
                      type: 'Identifier',
                      start: 4,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      name: 'ret'
                  },
                  init: {
                      type: 'CallExpression',
                      start: 10,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      callee: {
                          type: 'Identifier',
                          start: 10,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          name: 'f1'
                      },
                      arguments: [{
                          type: 'ObjectExpression',
                          start: 13,
                          end: 18,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 13
                              },
                              end: {
                                  line: 1,
                                  column: 18
                              }
                          },
                          properties: [{
                              type: 'Property',
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
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
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
                                  },
                                  name: 'x'
                              },
                              value: {
                                  type: 'Literal',
                                  start: 16,
                                  end: 17,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 17
                                      }
                                  },
                                  value: 1,
                                  raw: '1'
                              },
                              kind: 'init'
                          }]
                      }]
                  }
              }],
              kind: 'let'
          }],
          sourceType: 'script'
      }
  });

  pass(`let f2 = ({x:x2}) => x2 * 4;`, {
      source: 'let f2 = ({x:x2}) => x2 * 4;',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
              type: 'VariableDeclaration',
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
              },
              declarations: [{
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 27,
                  loc: {
                      start: {
                          line: 1,
                          column: 4
                      },
                      end: {
                          line: 1,
                          column: 27
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
                      name: 'f2'
                  },
                  init: {
                      type: 'ArrowFunctionExpression',
                      start: 9,
                      end: 27,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 27
                          }
                      },
                      id: null,
                      generator: false,
                      expression: true,
                      async: false,
                      params: [{
                          type: 'ObjectPattern',
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
                          },
                          properties: [{
                              type: 'Property',
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
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 11,
                                  end: 12,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 11
                                      },
                                      end: {
                                          line: 1,
                                          column: 12
                                      }
                                  },
                                  name: 'x'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 13,
                                  end: 15,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 13
                                      },
                                      end: {
                                          line: 1,
                                          column: 15
                                      }
                                  },
                                  name: 'x2'
                              },
                              kind: 'init'
                          }]
                      }],
                      body: {
                          type: 'BinaryExpression',
                          start: 21,
                          end: 27,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 21
                              },
                              end: {
                                  line: 1,
                                  column: 27
                              }
                          },
                          left: {
                              type: 'Identifier',
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
                              },
                              name: 'x2'
                          },
                          operator: '*',
                          right: {
                              type: 'Literal',
                              start: 26,
                              end: 27,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 26
                                  },
                                  end: {
                                      line: 1,
                                      column: 27
                                  }
                              },
                              value: 4,
                              raw: '4'
                          }
                      }
                  }
              }],
              kind: 'let'
          }],
          sourceType: 'script'
      }
  });
});