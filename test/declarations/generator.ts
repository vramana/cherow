import { pass, fail } from '../utils';

describe('Declarations - Generator', () => {

    pass(`function* t() {};`, {
        source: 'function* t() {};',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 't',
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
                {
                    type: 'EmptyStatement',
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

    pass(`function* a(){}`, {
          source: 'function* a(){}',
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
                  type: 'FunctionDeclaration',
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
                  id: {
                      type: 'Identifier',
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
                      },
                      name: 'a'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
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
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`function* a(){yield a}`, {
          source: 'function* a(){yield a}',
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
                  type: 'FunctionDeclaration',
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
                  id: {
                      type: 'Identifier',
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
                      },
                      name: 'a'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      start: 13,
                      end: 22,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 22
                          }
                      },
                      body: [{
                          type: 'ExpressionStatement',
                          start: 14,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          },
                          expression: {
                              type: 'YieldExpression',
                              start: 14,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
                                  }
                              },
                              delegate: false,
                              argument: {
                                  type: 'Identifier',
                                  start: 20,
                                  end: 21,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 20
                                      },
                                      end: {
                                          line: 1,
                                          column: 21
                                      }
                                  },
                                  name: 'a'
                              }
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`function* yield(){}`, {
          source: 'function* yield(){}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'FunctionDeclaration',
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
                  },
                  id: {
                      type: 'Identifier',
                      start: 10,
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
                      },
                      name: 'yield'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
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
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`function * gn() {
                  try {
                    throw [{x:[]}];
                  } catch ([{x:[c = (yield 2)]}]) {
                  }
                }`, {
source: `function * gn() {
              try {
                throw [{x:[]}];
              } catch ([{x:[c = (yield 2)]}]) {
              }
            }`,
    loc: true,
    ranges: true,
    raw: true,
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
                        type: 'TryStatement',
                        block: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ThrowStatement',
                                    argument: {
                                        type: 'ArrayExpression',
                                        elements: [
                                            {
                                                type: 'ObjectExpression',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'x',
                                                            start: 62,
                                                            end: 63,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 24
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 25
                                                                }
                                                            }
                                                        },
                                                        value: {
                                                            type: 'ArrayExpression',
                                                            elements: [],
                                                            start: 64,
                                                            end: 66,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 26
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 28
                                                                }
                                                            }
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 62,
                                                        end: 66,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 28
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 61,
                                                end: 67,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 29
                                                    }
                                                }
                                            }
                                        ],
                                        start: 60,
                                        end: 68,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 22
                                            },
                                            end: {
                                                line: 3,
                                                column: 30
                                            }
                                        }
                                    },
                                    start: 54,
                                    end: 69,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 16
                                        },
                                        end: {
                                            line: 3,
                                            column: 31
                                        }
                                    }
                                }
                            ],
                            start: 36,
                            end: 85,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 18
                                },
                                end: {
                                    line: 4,
                                    column: 15
                                }
                            }
                        },
                        handler: {
                            type: 'CatchClause',
                            param: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                kind: 'init',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    start: 95,
                                                    end: 96,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 4,
                                                            column: 26
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
                                                                name: 'c',
                                                                start: 98,
                                                                end: 99,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 28
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 29
                                                                    }
                                                                }
                                                            },
                                                            right: {
                                                                type: 'YieldExpression',
                                                                argument: {
                                                                    type: 'Literal',
                                                                    value: 2,
                                                                    start: 109,
                                                                    end: 110,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 39
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 40
                                                                        }
                                                                    },
                                                                    raw: '2'
                                                                },
                                                                delegate: false,
                                                                start: 103,
                                                                end: 110,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 33
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 40
                                                                    }
                                                                }
                                                            },
                                                            start: 98,
                                                            end: 111,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 28
                                                                },
                                                                end: {
                                                                    line: 4,
                                                                    column: 41
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 97,
                                                    end: 112,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 4,
                                                            column: 42
                                                        }
                                                    }
                                                },
                                                method: false,
                                                shorthand: false,
                                                start: 95,
                                                end: 112,
                                                loc: {
                                                    start: {
                                                        line: 4,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 4,
                                                        column: 42
                                                    }
                                                }
                                            }
                                        ],
                                        start: 94,
                                        end: 113,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 24
                                            },
                                            end: {
                                                line: 4,
                                                column: 43
                                            }
                                        }
                                    }
                                ],
                                start: 93,
                                end: 114,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 23
                                    },
                                    end: {
                                        line: 4,
                                        column: 44
                                    }
                                }
                            },
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 116,
                                end: 133,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 46
                                    },
                                    end: {
                                        line: 5,
                                        column: 15
                                    }
                                }
                            },
                            start: 86,
                            end: 133,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 16
                                },
                                end: {
                                    line: 5,
                                    column: 15
                                }
                            }
                        },
                        finalizer: null,
                        start: 32,
                        end: 133,
                        loc: {
                            start: {
                                line: 2,
                                column: 14
                            },
                            end: {
                                line: 5,
                                column: 15
                            }
                        }
                    }
                ],
                start: 16,
                end: 147,
                loc: {
                    start: {
                        line: 1,
                        column: 16
                    },
                    end: {
                        line: 6,
                        column: 13
                    }
                }
            },
            async: false,
            generator: true,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'gn',
                start: 11,
                end: 13,
                loc: {
                    start: {
                        line: 1,
                        column: 11
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                }
            },
            start: 0,
            end: 147,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 6,
                    column: 13
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 147,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 6,
            column: 13
        }
    }
}
      });

    pass(`function * gn() {
                  try {
                    throw [];
                  } catch ([c = (yield 2)]) {
                  }
                }`, {
        source: `function * gn() {
            try {
              throw [];
            } catch ([c = (yield 2)]) {
            }
          }`,
        loc: true,
        ranges: true,
        raw: true,
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
                                type: 'TryStatement',
                                block: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ThrowStatement',
                                            argument: {
                                                type: 'ArrayExpression',
                                                elements: [],
                                                start: 56,
                                                end: 58,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 20
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 22
                                                    }
                                                }
                                            },
                                            start: 50,
                                            end: 59,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 23
                                                }
                                            }
                                        }
                                    ],
                                    start: 34,
                                    end: 73,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 4,
                                            column: 13
                                        }
                                    }
                                },
                                handler: {
                                    type: 'CatchClause',
                                    param: {
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'c',
                                                    start: 82,
                                                    end: 83,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 4,
                                                            column: 23
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'YieldExpression',
                                                    argument: {
                                                        type: 'Literal',
                                                        value: 2,
                                                        start: 93,
                                                        end: 94,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 33
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 34
                                                            }
                                                        },
                                                        raw: '2'
                                                    },
                                                    delegate: false,
                                                    start: 87,
                                                    end: 94,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 4,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                start: 82,
                                                end: 95,
                                                loc: {
                                                    start: {
                                                        line: 4,
                                                        column: 22
                                                    },
                                                    end: {
                                                        line: 4,
                                                        column: 35
                                                    }
                                                }
                                            }
                                        ],
                                        start: 81,
                                        end: 96,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 21
                                            },
                                            end: {
                                                line: 4,
                                                column: 36
                                            }
                                        }
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 98,
                                        end: 113,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 38
                                            },
                                            end: {
                                                line: 5,
                                                column: 13
                                            }
                                        }
                                    },
                                    start: 74,
                                    end: 113,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 14
                                        },
                                        end: {
                                            line: 5,
                                            column: 13
                                        }
                                    }
                                },
                                finalizer: null,
                                start: 30,
                                end: 113,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 5,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        start: 16,
                        end: 125,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 6,
                                column: 11
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gn',
                        start: 11,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    start: 0,
                    end: 125,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 6,
                            column: 11
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 125,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 6,
                    column: 11
                }
            }
        }
      });

    pass(`function* a(){({[yield]:a}=0)}`, {
          source: 'function* a(){({[yield]:a}=0)}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              body: [{
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      body: [{
                          type: 'ExpressionStatement',
                          expression: {
                              type: 'AssignmentExpression',
                              left: {
                                  type: 'ObjectPattern',
                                  properties: [{
                                      type: 'Property',
                                      key: {
                                          type: 'YieldExpression',
                                          argument: null,
                                          delegate: false,
                                          start: 17,
                                          end: 22,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 17
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 22
                                              }
                                          }
                                      },
                                      value: {
                                          type: 'Identifier',
                                          name: 'a',
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
                                      },
                                      kind: 'init',
                                      computed: true,
                                      method: false,
                                      shorthand: false,
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
                                      }
                                  }],
                                  start: 15,
                                  end: 26,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 15
                                      },
                                      end: {
                                          line: 1,
                                          column: 26
                                      }
                                  }
                              },
                              operator: '=',
                              right: {
                                  type: 'Literal',
                                  value: 0,
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
                                  },
                                  raw: '0'
                              },
                              start: 15,
                              end: 28,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 15
                                  },
                                  end: {
                                      line: 1,
                                      column: 28
                                  }
                              }
                          },
                          start: 14,
                          end: 29,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 29
                              }
                          }
                      }],
                      start: 13,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      }
                  },
                  async: false,
                  generator: true,
                  expression: false,
                  id: {
                      type: 'Identifier',
                      name: 'a',
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

    pass(`function* a() {} function a() {}`, {
          source: 'function* a() {} function a() {}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 32,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 32
                  }
              },
              body: [{
                      type: 'FunctionDeclaration',
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
                      id: {
                          type: 'Identifier',
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
                          },
                          name: 'a'
                      },
                      generator: true,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
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
                          body: []
                      }
                  },
                  {
                      type: 'FunctionDeclaration',
                      start: 17,
                      end: 32,
                      loc: {
                          start: {
                              line: 1,
                              column: 17
                          },
                          end: {
                              line: 1,
                              column: 32
                          }
                      },
                      id: {
                          type: 'Identifier',
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
                          name: 'a'
                      },
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
                          start: 30,
                          end: 32,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 30
                              },
                              end: {
                                  line: 1,
                                  column: 32
                              }
                          },
                          body: []
                      }
                  }
              ],
              sourceType: 'script'
          }
      });

    pass(`function a() { function* a() {} function a() {} }`, {
          source: 'function a() { function* a() {} function a() {} }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'FunctionDeclaration',
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
                  },
                  id: {
                      type: 'Identifier',
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
                      },
                      name: 'a'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      start: 13,
                      end: 49,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 49
                          }
                      },
                      body: [{
                              type: 'FunctionDeclaration',
                              start: 15,
                              end: 31,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 15
                                  },
                                  end: {
                                      line: 1,
                                      column: 31
                                  }
                              },
                              id: {
                                  type: 'Identifier',
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
                                  },
                                  name: 'a'
                              },
                              generator: true,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  start: 29,
                                  end: 31,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 29
                                      },
                                      end: {
                                          line: 1,
                                          column: 31
                                      }
                                  },
                                  body: []
                              }
                          },
                          {
                              type: 'FunctionDeclaration',
                              start: 32,
                              end: 47,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 32
                                  },
                                  end: {
                                      line: 1,
                                      column: 47
                                  }
                              },
                              id: {
                                  type: 'Identifier',
                                  start: 41,
                                  end: 42,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 41
                                      },
                                      end: {
                                          line: 1,
                                          column: 42
                                      }
                                  },
                                  name: 'a'
                              },
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  start: 45,
                                  end: 47,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 45
                                      },
                                      end: {
                                          line: 1,
                                          column: 47
                                      }
                                  },
                                  body: []
                              }
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`function* a(){({yield:a}=0)}`, {
        source: 'function* a(){({yield:a}=0)}',
        loc: true,
        ranges: true,
        raw: true,
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
                                  type: 'AssignmentExpression',
                                  left: {
                                      type: 'ObjectPattern',
                                      properties: [
                                          {
                                              type: 'Property',
                                              key: {
                                                  type: 'Identifier',
                                                  name: 'yield',
                                                  start: 16,
                                                  end: 21,
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
                                              value: {
                                                  type: 'Identifier',
                                                  name: 'a',
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
                                                  }
                                              },
                                              kind: 'init',
                                              computed: false,
                                              method: false,
                                              shorthand: false,
                                              start: 16,
                                              end: 23,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 16
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 23
                                                  }
                                              }
                                          }
                                      ],
                                      start: 15,
                                      end: 24,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 15
                                          },
                                          end: {
                                              line: 1,
                                              column: 24
                                          }
                                      }
                                  },
                                  operator: '=',
                                  right: {
                                      type: 'Literal',
                                      value: 0,
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
                                      },
                                      raw: '0'
                                  },
                                  start: 15,
                                  end: 26,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 15
                                      },
                                      end: {
                                          line: 1,
                                          column: 26
                                      }
                                  }
                              },
                              start: 14,
                              end: 27,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 27
                                  }
                              }
                          }
                      ],
                      start: 13,
                      end: 28,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 28
                          }
                      }
                  },
                  async: false,
                  generator: true,
                  expression: false,
                  id: {
                      type: 'Identifier',
                      name: 'a',
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

    pass(`function* a(){yield}`, {
          source: 'function* a(){yield}',
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
                  type: 'FunctionDeclaration',
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
                  id: {
                      type: 'Identifier',
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
                      },
                      name: 'a'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      start: 13,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      },
                      body: [{
                          type: 'ExpressionStatement',
                          start: 14,
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
                          },
                          expression: {
                              type: 'YieldExpression',
                              start: 14,
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
                              },
                              delegate: false,
                              argument: null
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass(`function f() { var o = { *yield() { } } }`, {
        source: 'function f() { var o = { *yield() { } } }',
        loc: true,
        ranges: true,
        raw: true,
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
                                        init: {
                                            type: 'ObjectExpression',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'yield',
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
                                                    value: {
                                                        type: 'FunctionExpression',
                                                        params: [],
                                                        body: {
                                                            type: 'BlockStatement',
                                                            body: [],
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
                                                            }
                                                        },
                                                        async: false,
                                                        generator: true,
                                                        expression: false,
                                                        id: null,
                                                        start: 31,
                                                        end: 37,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 31
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 37
                                                            }
                                                        }
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: true,
                                                    shorthand: false,
                                                    start: 25,
                                                    end: 37,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 37
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 23,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'Identifier',
                                            name: 'o',
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
                                        },
                                        start: 19,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    }
                                ],
                                kind: 'var',
                                start: 15,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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

    pass(`function f() { class C { *yield() { } } }`, {
        source: 'function f() { class C { *yield() { } } }',
        loc: true,
        ranges: true,
        raw: true,
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
                                type: 'ClassDeclaration',
                                id: {
                                    type: 'Identifier',
                                    name: 'C',
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
                                    }
                                },
                                superClass: null,
                                body: {
                                    type: 'ClassBody',
                                    body: [
                                        {
                                            type: 'MethodDefinition',
                                            key: {
                                                type: 'Identifier',
                                                name: 'yield',
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
                                            kind: 'method',
                                            computed: false,
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
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
                                                    }
                                                },
                                                async: false,
                                                generator: true,
                                                expression: false,
                                                id: null,
                                                start: 31,
                                                end: 37,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 37
                                                    }
                                                }
                                            },
                                            static: false,
                                            start: 25,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        }
                                    ],
                                    start: 23,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                start: 15,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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

    pass(`function* gf() { yield* 'foo', 10; }`, {
        source: 'function* gf() { yield* "foo", 10; }',
        loc: true,
        ranges: true,
        raw: true,
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
                                    type: 'SequenceExpression',
                                    expressions: [
                                        {
                                            type: 'YieldExpression',
                                            argument: {
                                                type: 'Literal',
                                                value: 'foo',
                                                start: 24,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                },
                                                raw: '"foo"'
                                            },
                                            delegate: true,
                                            start: 17,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        },
                                        {
                                            type: 'Literal',
                                            value: 10,
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
                                            raw: '10'
                                        }
                                    ],
                                    start: 17,
                                    end: 33,
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
                                start: 17,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }
                        ],
                        start: 15,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gf',
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
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
      });

    fail(`function*g(yield){}`, {
          source: 'function*g(yield){}',
      });

    fail(`function*g({yield}){}`, {
          source: 'function*g({yield}){}',
      });

    fail(`function*g([yield]){}`, {
          source: 'function*g([yield]){}',
      });

    fail(`function*g({a: yield}){}`, {
          source: 'function*g({a: yield}){}',
      });

    fail(`function*g(yield = 0){}`, {
          source: 'function*g(yield = 0){}',
      });

    fail(`function*g(){ var yield = 1; }`, {
          source: 'function*g(){ var yield = 1; }',
      });

    fail(`function*g(){ function yield(){}; }`, {
          source: 'function*g(){ function yield(){}; }',
      });

    fail(`function*g() { var yield; }`, {
          source: 'function*g() { var yield; }',
      });

    fail(`function*g() { let yield; }`, {
          source: 'function*g() { let yield; }',
      });

    fail(`function*g() { try {} catch (yield) {} }`, {
          source: 'function*g() { try {} catch (yield) {} }',
      });

    fail(`function*g() { ({yield}); }`, {
          source: 'function*g() { ({yield}); }',
      });
    fail(`function*g() { ({yield} = 0); }`, {
          source: 'function*g() { ({yield} = 0); }',
      });

    fail(`function*g() { var {yield} = 0; }`, {
          source: 'function*g() { var {yield} = 0; }',
      });

    fail(`function*g() { for ({yield} in 0); }`, {
          source: 'function*g() { for ({yield} in 0); }',
      });

    fail(`function*g() { ({yield = 0}); }`, {
          source: 'function*g() { ({yield = 0}); }',
      });

    fail(`function*g() { ({yield = 0} = 0); }`, {
          source: 'function*g() { ({yield = 0} = 0); }',
      });

    fail(`function*g() { var {yield = 0} = 0; }`, {
          source: 'function*g() { var {yield = 0} = 0; }',
      });

    fail(`function*g() { for ({yield = 0} in 0); }`, {
          source: 'function*g() { for ({yield = 0} in 0); }',
      });

    fail(`label: function* a(){}`, {
          source: 'label: function* a(){}',
      });

    fail(`function*g(){ var yield; }`, {
          source: 'function*g(){ var yield; }',
      });

    fail(`function*g() { ({yield = 0} = 0); }`, {
          source: 'function*g() { ({yield = 0} = 0); }',
      });

    fail(`function*g() { var {yield = 0} = 0; }`, {
          source: 'function*g() { var {yield = 0} = 0; }',
      });

    fail(`function*g() { for ({yield = 0} in 0); }`, {
          source: 'function*g() { for ({yield = 0} in 0); }',
      });

    fail(`function* a({e: a.b}) {}`, {
        source: 'function* a({e: a.b}) {}',
    });

    fail(`function* gf() { 1 + yield; }`, {
        source: 'function* gf() { 1 + yield; }',
    });

    fail(`function* gf() { 1 + yield 2; }`, {
        source: 'function* gf() { 1 + yield 2; }',
    });

    fail(`function* gf() { +yield* 'foo'; }`, {
        source: 'function* gf() { +yield* "foo"; }',
    });

    fail(`function* gf() { yield++; }`, {
        source: 'function* gf() { yield++; }',
    });

    fail(`function *gf(b, a = 1 + yield) {}`, {
        source: 'function *gf(b, a = 1 + yield) {}',
    });
  });