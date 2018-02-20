import { pass, fail } from '../test-utils';

describe('Declarations - Function', () => {

      fail('function f() { (new.target)--; }', {
        source: 'function f() { (new.target)--; }',
        message: 'Invalid left-hand side expression in Postfix operation',
        line: 1,
        column: 27,
        index: 27
    });

      fail('function eval() { "use strict"; }', {
        source: 'function eval() { "use strict"; }',
        message: 'Unexpected strict mode reserved word',
        line: 1,
        column: 9,
        index: 9
    });

      fail('function arguments() { "use strict"; }', {
        source: 'function arguments() { "use strict"; }',
        message: 'Unexpected strict mode reserved word',
        line: 1,
        column: 9,
        index: 9
    });

      fail('(function eval() {"use strict";});', {
        source: '(function eval() {"use strict";});',
        message: 'Unexpected strict mode reserved word',
        line: 1,
        column: 10,
        index: 10
    });

      fail('(function arguments() {"use strict";});', {
        source: '(function arguments() {"use strict";});',
        message: 'Unexpected strict mode reserved word',
        line: 1,
        column: 10,
        index: 10
    });

      fail(`"use strict"; function _13_1_5_fun(param, param) { }`, {
        source: '"use strict"; function _13_1_5_fun(param, param) { }',
        message: 'Duplicate binding param',
        line: 1,
        column: 52,
        index: 52
    });

      fail(`(function((a)){})`, {
        source: '(function((a)){})',
        message:  'Unexpected token (',
        line: 1,
        column: 10,
        index: 10
    });

      fail(`"use strict"; function f_10_5_1_gs(){
        arguments = 7;
    }`, {
        source: `"use strict"; function f_10_5_1_gs(){
            arguments = 7;
        }`,
        message:  'Eval or arguments can\'t be assigned to in strict mode code',
        line: 2,
    });

      fail('function f(x,x){}', {
        source: '"use strict"; function f(x,x){}',
        index: 31
    });

      fail('function f(...a, ...b){}', {
        source: '"use strict"; function f(...a, ...b){}',
        index: 29
    });

      fail('(function ({ a(){} }) {})', {
        source: '(function ({ a(){} }) {})',
       line: 1
    });

      fail('function f(x,x){}', {
        source: '"use strict"; function f(x,x){ "use strict"; }',
        index: 46
    });

      fail('(function() { "use strict"; })()', {
        source: '(function() { "use strict"; for (var i = 0; i < 1; i++) function f() { }; })()',
        line: 1
    });

      fail('(function() { "use strict"; with ({}) function f() { }; })()', {
        source: '(function() { "use strict"; with ({}) function f() { }; })()',
        line: 1
    });

      fail('(function() { "use strict"; do label: function foo() {} while (0) })()', {
        source: '(function() { "use strict"; do label: function foo() {} while (0) })()',
        line: 1
    });

      fail('(function() { "use strict"; with ({}) label: function f() { }; })()', {
        source: '(function() { "use strict"; with ({}) label: function f() { }; })()',
        line: 1
    });

      fail('(function() { "use strict"; label: async function f() { } })()', {
        source: '(function() { "use strict"; label: async function f() { } })()',
        line: 1
    });

      fail('(function() { "use strict"; if (true) async function* f() { } })()', {
        source: '(function() { "use strict"; if (true) async function* f() { } })()',
        line: 1
    });

      pass(`function x(...{ a }){}`, {
        source: `function x(...{ a }){}`,
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
                            type: 'RestElement',
                            argument: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        },
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        },
                                        method: false,
                                        shorthand: true,
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
                                }
                            },
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
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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

      pass(`(function package() {'use strict'; })()`, {
        source: `(function package() {'use strict'; })()`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 'use strict',
                                            start: 21,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            },
                                            raw: '\'use strict\''
                                        },
                                        directive: 'use strict',
                                        start: 21,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 34
                                            }
                                        }
                                    }
                                ],
                                start: 20,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'package',
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
                            start: 1,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        },
                        arguments: [],
                        start: 0,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        }
                    },
                    start: 0,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 39
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 39,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 39
                }
            }
        }
    });
      pass(`function f([x] = [1]) {}`, {
        source: `function f([x] = [1]) {}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'FunctionDeclaration',
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
                  name: 'f'
                },
                generator: false,
                expression: false,
                async: false,
                params: [
                  {
                    type: 'AssignmentPattern',
                    start: 11,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    },
                    left: {
                      type: 'ArrayPattern',
                      start: 11,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      elements: [
                        {
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
                          name: 'x'
                        }
                      ]
                    },
                    right: {
                      type: 'ArrayExpression',
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
                      elements: [
                        {
                          type: 'Literal',
                          start: 18,
                          end: 19,
                          loc: {
                            start: {
                              line: 1,
                              column: 18
                            },
                            end: {
                              line: 1,
                              column: 19
                            }
                          },
                          value: 1,
                          raw: '1'
                        }
                      ]
                    }
                  }
                ],
                body: {
                  type: 'BlockStatement',
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
                  body: []
                }
              }
            ],
            sourceType: 'script'
          }
    });

      pass(`function f({x} = {x: 10}) {}`, {
        source: `function f({x} = {x: 10}) {}`,
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
            body: [
              {
                type: 'FunctionDeclaration',
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
                  name: 'f'
                },
                generator: false,
                expression: false,
                async: false,
                params: [
                  {
                    type: 'AssignmentPattern',
                    start: 11,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    left: {
                      type: 'ObjectPattern',
                      start: 11,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
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
                            name: 'x'
                          },
                          kind: 'init',
                          value: {
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
                            name: 'x'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'ObjectExpression',
                      start: 17,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 18,
                          end: 23,
                          loc: {
                            start: {
                              line: 1,
                              column: 18
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
                            start: 18,
                            end: 19,
                            loc: {
                              start: {
                                line: 1,
                                column: 18
                              },
                              end: {
                                line: 1,
                                column: 19
                              }
                            },
                            name: 'x'
                          },
                          value: {
                            type: 'Literal',
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
                            value: 10,
                            raw: '10'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  start: 26,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  },
                  body: []
                }
              }
            ],
            sourceType: 'script'
          }
    });

      pass(`({f: function({x} = {x: 10}) {}})`, {
        source: `({f: function({x} = {x: 10}) {}})`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 33
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                },
                expression: {
                  type: 'ObjectExpression',
                  start: 1,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
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
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        },
                        name: 'f'
                      },
                      value: {
                        type: 'FunctionExpression',
                        start: 5,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 5
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [
                          {
                            type: 'AssignmentPattern',
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
                            },
                            left: {
                              type: 'ObjectPattern',
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
                              properties: [
                                {
                                  type: 'Property',
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
                                  },
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'x'
                                  },
                                  kind: 'init',
                                  value: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'x'
                                  }
                                }
                              ]
                            },
                            right: {
                              type: 'ObjectExpression',
                              start: 20,
                              end: 27,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 20
                                },
                                end: {
                                  line: 1,
                                  column: 27
                                }
                              },
                              properties: [
                                {
                                  type: 'Property',
                                  start: 21,
                                  end: 26,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 21
                                    },
                                    end: {
                                      line: 1,
                                      column: 26
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
                                    name: 'x'
                                  },
                                  value: {
                                    type: 'Literal',
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
                                    value: 10,
                                    raw: '10'
                                  },
                                  kind: 'init'
                                }
                              ]
                            }
                          }
                        ],
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
                      kind: 'init'
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

      pass(`(function() { if (false) {} else function f() { }; })()`, {
        source: `(function() { if (false) {} else function f() { }; })()`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'Literal',
                                            value: false,
                                            start: 18,
                                            end: 23,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            }
                                        },
                                        alternate: {
                                            type: 'FunctionDeclaration',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 46,
                                                end: 49,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 46
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
                                                name: 'f',
                                                start: 42,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 43
                                                    }
                                                }
                                            },
                                            start: 33,
                                            end: 49,
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
                                        },
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [],
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
                                            }
                                        },
                                        start: 14,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    {
                                        type: 'EmptyStatement',
                                        start: 49,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 49
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        }
                                    }
                                ],
                                start: 12,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 1,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            }
                        },
                        arguments: [],
                        start: 0,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    },
                    start: 0,
                    end: 55,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 55
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 55,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 55
                }
            }
        }
    });

      pass(`(function yield(){ "use strict"; })\n`, {
        source: `(function yield(){ "use strict"; })\n`,
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    async: false,
                    body: {
                      body: [
                       {
                          directive: 'use strict',
                          expression: {
                            raw: '"use strict"',
                            type: 'Literal',
                            value: 'use strict',
                          },
                          type: 'ExpressionStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                     name: 'yield',
                      type: 'Identifier'
                    },
                    params: [],
                    type: 'FunctionExpression'
                 },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

      pass(`function a(exports) {}`, {
        source: `function a(exports) {}`,
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
                            type: 'Identifier',
                            name: 'exports',
                            start: 11,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'a',
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

      pass(`"use strict";  function a(type) {};`, {
        source: `"use strict";  function a(type) {};`,
        loc: true,
        ranges: true,
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
                        }
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
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'type',
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
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
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
                    start: 15,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 34,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 34
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

      pass(`function f() { [ a [ function () { }, b ] ] = [2] ; }`, {
        source: `function f() { [ a [ function () { }, b ] ] = [2] ; }`,
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
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'Identifier',
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
                                                computed: true,
                                                property: {
                                                    type: 'SequenceExpression',
                                                    expressions: [
                                                        {
                                                            type: 'FunctionExpression',
                                                            params: [],
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [],
                                                                start: 33,
                                                                end: 36,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 33
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 36
                                                                    }
                                                                }
                                                            },
                                                            async: false,
                                                            generator: false,
                                                            expression: false,
                                                            id: null,
                                                            start: 21,
                                                            end: 36,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 21
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 36
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'b',
                                                            start: 38,
                                                            end: 39,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 38
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 39
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 21,
                                                    end: 39,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 39
                                                        }
                                                    }
                                                },
                                                start: 17,
                                                end: 41,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41
                                                    }
                                                }
                                            }
                                        ],
                                        start: 15,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 15
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        }
                                    },
                                    operator: '=',
                                    right: {
                                        type: 'ArrayExpression',
                                        elements: [
                                            {
                                                type: 'Literal',
                                                value: 2,
                                                start: 47,
                                                end: 48,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 47
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 48
                                                    }
                                                },
                                                raw: '2'
                                            }
                                        ],
                                        start: 46,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 46
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    start: 15,
                                    end: 49,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 49
                                        }
                                    }
                                },
                                start: 15,
                                end: 51,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 51
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 53,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 53
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
                    end: 53,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 53
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 53,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 53
                }
            }
        }
      });

      pass(`function a() {"use strict"; 0O0; }`, {
        source: `function a() {"use strict"; 0O0; }`,
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
                                    type: 'Literal',
                                    value: 'use strict',
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
                                    },
                                    raw: '"use strict"'
                                },
                                start: 14,
                                end: 27,
                                directive: 'use strict',
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
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0O0'
                                },
                                start: 28,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
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
                                line: 1,
                                column: 34
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'a',
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
                            line: 1,
                            column: 34
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
                    line: 1,
                    column: 34
                }
            }
        }
    });

      pass(`function foo() {
        "use strict";
        var abstract = true;
    }`, {
        source: `function foo() {
            "use strict";
            var abstract = true;
        }`,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                    type: 'Literal',
                                    value: 'use strict',
                                    raw: '"use strict"'
                                },
                                directive: 'use strict'
                            },
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'Literal',
                                            value: true,
                                            raw: 'true'
                                        },
                                        id: {
                                            type: 'Identifier',
                                            name: 'abstract'
                                        }
                                    }
                                ],
                                kind: 'var'
                            }
                        ]
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo'
                    }
                }
            ]
        }
    });

      pass('function a({a} = {a: 1}) {}', {
        source: 'function a({a} = {a: 1}) {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
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
                                        }
                                    }
                                ],
                                start: 11,
                                end: 14,
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
                            },
                            right: {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 18,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 18,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    }
                                ],
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
                            start: 11,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'a',
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

      pass('function f(x,x){}', {
        source: 'function f(x,x){}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'x',
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
                            }
                        },
                        {
                            type: 'Identifier',
                            name: 'x',
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
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 15,
                        end: 17,
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

      pass(`function a(...[]) { }`, {
        source: `function a(...[]) { }`,
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
                            type: 'RestElement',
                            argument: {
                                type: 'ArrayPattern',
                                elements: [],
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
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'a',
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

      pass(`function hello(a) { sayHi(); }`, {
        source: `function hello(a) { sayHi(); }`,
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
                            type: 'Identifier',
                            name: 'a',
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
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'sayHi',
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
                                    },
                                    arguments: [],
                                    start: 20,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
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
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        start: 18,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
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
                        name: 'hello',
                        start: 9,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 14
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

      pass(`var hi = function arguments() { };`, {
        source: `var hi = function arguments() { };`,
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
                            init: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'arguments',
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
                                    }
                                },
                                start: 9,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'hi',
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
                            }
                        }
                    ],
                    kind: 'var',
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
                    line: 1,
                    column: 34
                }
            }
        }
    });

      pass(`function universe(__proto__) { }`, {
        source: `function universe(__proto__) { }`,
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
                            type: 'Identifier',
                            name: '__proto__',
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
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 29,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 29
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'universe',
                        start: 9,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

      pass(`(function(){})`, {
        source: `a = function () {  };
        b`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'a',
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
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'b',
                        start: 30,
                        end: 31,
                        loc: {
                            start: {
                                line: 2,
                                column: 8
                            },
                            end: {
                                line: 2,
                                column: 9
                            }
                        }
                    },
                    start: 30,
                    end: 31,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 9
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 31,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 9
                }
            }
        }
    });

      pass(`(function(){})`, {
            source: '(function(){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
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

      pass(`(function x() { y; z() });`, {
            source: '(function x() { y; z() });',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        },
                                        start: 16,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'z',
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
                                            arguments: [],
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
                                    }
                                ],
                                start: 14,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                            start: 1,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 24
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
                    }
                ],
                sourceType: 'script',
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
            }
        });

      pass(`(function eval() { });`, {
            source: '(function eval() { });',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'eval',
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
                            start: 1,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 20
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

      pass(`(function arguments() { });`, {
            source: '(function arguments() { });',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 22,
                                end: 25,
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'arguments',
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
                                }
                            },
                            start: 1,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 25
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

      pass(`(function x(y, z) { })`, {
            source: '(function x(y, z) { })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'y',
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
                                    }
                                },
                                {
                                    type: 'Identifier',
                                    name: 'z',
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
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                            start: 1,
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

      pass(`(function(a = b){})`, {
            source: '(function(a = b){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'AssignmentPattern',
                                    left: {
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
                                    right: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    }
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 16,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 1,
                            end: 18,
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

      pass(`(function(...a){})`, {
            source: '(function(...a){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
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
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 15,
                                end: 17,
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 1,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 17
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

      pass(`(function(a, ...b){})`, {
            source: '(function(a, ...b){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
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
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    },
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
                                }
                            ],
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
                            id: null,
                            start: 1,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 20
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
/*
        pass(`(function({a}){})`, {
            source: '(function({a}){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
         }
        });*/
/*
        pass(`(function({a: x, a: y}){})`, {
            source: '(function({a: x, a: y}){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
         }
        });*/

      pass(`(function([a]){})`, {
            source: '(function([a]){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        }
                                    ],
                                    start: 10,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                }
                            ],
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
                            generator: false,
                            expression: false,
                            id: null,
                            start: 1,
                            end: 16,
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

      pass(`function foo() {
            if (foo) {
              bar(foo);
              return foo;
            } else if (baz) {
              bar(baz);
              return baz;
            } else if (wat) {
              bar(wat);
              return wat;
            }
          }`, {
            source: `function foo() {
                  if (foo) {
                    bar(foo);
                    return foo;
                  } else if (baz) {
                    bar(baz);
                    return baz;
                  } else if (wat) {
                    bar(wat);
                    return wat;
                  }
                }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Identifier',
                                        name: 'foo'
                                    },
                                    alternate: {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'Identifier',
                                            name: 'baz'
                                        },
                                        alternate: {
                                            type: 'IfStatement',
                                            test: {
                                                type: 'Identifier',
                                                name: 'wat'
                                            },
                                            alternate: null,
                                            consequent: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'bar'
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'wat'
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Identifier',
                                                            name: 'wat'
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'bar'
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'baz'
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'baz'
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    consequent: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'bar'
                                                    },
                                                    arguments: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'foo'
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'foo'
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo'
                        }
                    }
                ]
            }
        });

      pass(`!function () {
              x();
            }(), y = function () {
              x();
            }();`, {
            source: `!function () {
                x();
              }(), y = function () {
                x();
              }();`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'SequenceExpression',
                            expressions: [
                                {
                                    type: 'UnaryExpression',
                                    operator: '!',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'x'
                                                            },
                                                            arguments: []
                                                        }
                                                    }
                                                ]
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null
                                        },
                                        arguments: []
                                    },
                                    prefix: true
                                },
                                {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'y'
                                    },
                                    operator: '=',
                                    right: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'x'
                                                            },
                                                            arguments: []
                                                        }
                                                    }
                                                ]
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null
                                        },
                                        arguments: []
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        });

      pass(`function test(a) {
              const clash = () => {};
              if (a) {
                return clash();
              } else {
                const clash = () => {};
                return clash();
              }
            }`, {
          source: `function test(a) {
              const clash = () => {};
              if (a) {
                return clash();
             } else {
                const clash = () => {};
               return clash();
              }
            }`,
            raw: true,
          expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'a'
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'ArrowFunctionExpression',
                                            body: {
                                                type: 'BlockStatement',
                                                body: []
                                            },
                                            params: [],
                                            id: null,
                                            async: false,
                                            generator: false,
                                            expression: false
                                        },
                                        id: {
                                            type: 'Identifier',
                                            name: 'clash'
                                        }
                                    }
                                ],
                                kind: 'const'
                            },
                            {
                                type: 'IfStatement',
                                test: {
                                    type: 'Identifier',
                                    name: 'a'
                                },
                                alternate: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'VariableDeclaration',
                                            declarations: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    init: {
                                                        type: 'ArrowFunctionExpression',
                                                        body: {
                                                            type: 'BlockStatement',
                                                            body: []
                                                        },
                                                        params: [],
                                                        id: null,
                                                        async: false,
                                                        generator: false,
                                                        expression: false
                                                    },
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'clash'
                                                    }
                                                }
                                            ],
                                            kind: 'const'
                                        },
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'clash'
                                                },
                                                arguments: []
                                            }
                                        }
                                    ]
                                },
                                consequent: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'clash'
                                                },
                                                arguments: []
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'test'
                    }
                }
            ]
        }
        });

      pass(`function foo(object, property, value) {
              if (object && property) {
                object[property] = value;
                return true;
              }
              return false;
            }`, {
        raw: true,
          source: `function foo(object, property, value) {
            if (object && property) {
              object[property] = value;
              return true;
            }
            return false;
          }`,
                  expected: {
                    type: 'Program',
                    sourceType: 'script',
                    body: [
                        {
                            type: 'FunctionDeclaration',
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'object'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'property'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'value'
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'LogicalExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'object'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'property'
                                            },
                                            operator: '&&'
                                        },
                                        alternate: null,
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'AssignmentExpression',
                                                        left: {
                                                            type: 'MemberExpression',
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'object'
                                                            },
                                                            computed: true,
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'property'
                                                            }
                                                        },
                                                        operator: '=',
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'value'
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Literal',
                                                        value: true,
                                                        raw: 'true'
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Literal',
                                            value: false,
                                            raw: 'false'
                                        }
                                    }
                                ]
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'foo'
                            }
                        }
                    ]
                }
        });

      pass(`(function () {
              a = x ? true : false;
              c = 1 ? (this.get(x), a = b, true) : (foo.bar, false);
            })();`, {
            raw: true,
            source: `(function () {
                a = x ? true : false;
                c = 1 ? (this.get(x), a = b, true) : (foo.bar, false);
              })();`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'ConditionalExpression',
                                                    test: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    },
                                                    consequent: {
                                                        type: 'Literal',
                                                        value: true,
                                                        raw: 'true'
                                                    },
                                                    alternate: {
                                                        type: 'Literal',
                                                        value: false,
                                                        raw: 'false'
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'c'
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'ConditionalExpression',
                                                    test: {
                                                        type: 'Literal',
                                                        value: 1,
                                                        raw: '1'
                                                    },
                                                    consequent: {
                                                        type: 'SequenceExpression',
                                                        expressions: [
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'ThisExpression'
                                                                    },
                                                                    computed: false,
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'get'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'x'
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                type: 'AssignmentExpression',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'a'
                                                                },
                                                                operator: '=',
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'b'
                                                                }
                                                            },
                                                            {
                                                                type: 'Literal',
                                                                value: true,
                                                                raw: 'true'
                                                            }
                                                        ]
                                                    },
                                                    alternate: {
                                                        type: 'SequenceExpression',
                                                        expressions: [
                                                            {
                                                                type: 'MemberExpression',
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'foo'
                                                                },
                                                                computed: false,
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'bar'
                                                                }
                                                            },
                                                            {
                                                                type: 'Literal',
                                                                value: false,
                                                                raw: 'false'
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            },
                            arguments: []
                        }
                    }
                ]
            }
        });

      pass(`(function([]){})`, {
            source: '(function([]){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'ArrayPattern',
                                    elements: [],
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
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 1,
                            end: 15,
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

      pass(`function foo() {} /42/i`, {
            source: `function foo() {} /42/i`,
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
                            start: 15,
                            end: 17,
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
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: {},
                            regex: {
                                pattern: '42',
                                flags: 'i'
                            },
                            start: 18,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            raw: '/42/i'
                        },
                        start: 18,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
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

      pass(`function* a(){yield}`, {
            source: `function* a(){yield}`,
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
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
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
                                        }
                                    },
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
                                    }
                                }
                            ],
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
                ],
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

      pass(`function *a(){yield/=3/}`, {
            source: `function *a(){yield/=3/}`,
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
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Literal',
                                            value: {},
                                            regex: {
                                                pattern: '=3',
                                                flags: ''
                                            },
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
                                            raw: '/=3/'
                                        },
                                        delegate: false,
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

      pass(`function foo() {
              if(window.self != window.top) {
                if(__DEV__) {
                  console.log('lol', name);
                }
                return;
              }
              lol();
              try { lol() } catch (e) {}
            }`, {
            source: `function foo() {
                if(window.self != window.top) {
                  if(__DEV__) {
                    console.log('lol', name);
                  }
                  return;
                }
                lol();
                try { lol() } catch (e) {}
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'Identifier',
                                                name: 'window'
                                            },
                                            computed: false,
                                            property: {
                                                type: 'Identifier',
                                                name: 'self'
                                            }
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'Identifier',
                                                name: 'window'
                                            },
                                            computed: false,
                                            property: {
                                                type: 'Identifier',
                                                name: 'top'
                                            }
                                        },
                                        operator: '!='
                                    },
                                    alternate: null,
                                    consequent: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'IfStatement',
                                                test: {
                                                    type: 'Identifier',
                                                    name: '__DEV__'
                                                },
                                                alternate: null,
                                                consequent: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'console'
                                                                    },
                                                                    computed: false,
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'log'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Literal',
                                                                        value: 'lol',
                                                                        raw: '\'lol\''
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'name'
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'ReturnStatement',
                                                argument: null
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'lol'
                                        },
                                        arguments: []
                                    }
                                },
                                {
                                    type: 'TryStatement',
                                    block: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'lol'
                                                    },
                                                    arguments: []
                                                }
                                            }
                                        ]
                                    },
                                    handler: {
                                        type: 'CatchClause',
                                        param: {
                                            type: 'Identifier',
                                            name: 'e'
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: []
                                        }
                                    },
                                    finalizer: null
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo'
                        }
                    }
                ]
            }
        });

      pass(`function f1() { return a == b ? true : x; }
        function f2() { return a == b ? false : x; }
        function f3() { return a < b ? !0 : x; }
        function f4() { return a < b ? !1 : x; }
        function f5() { return c ? !0 : x; }
        function f6() { return c ? false : x; }
        function f7() { return !c ? true : x; }
        unction f8() { return !c ? !1 : x; }
        function g1() { return a == b ? x : true; }
        function g2() { return a == b ? x : false; }
        function g3() { return a < b ? x : !0; }
        function g4() { return a < b ? x : !1; }
        function g5() { return c ? x : true; }
        function g6() { return c ? x : !1; }
        function g7() { return !c ? x : !0; }
        function g8() { return !c ? x : false; }`, {
            source: `function f1() { return a == b ? true : x; }
            function f2() { return a == b ? false : x; }
            function f3() { return a < b ? !0 : x; }
            function f4() { return a < b ? !1 : x; }
            function f5() { return c ? !0 : x; }
            function f6() { return c ? false : x; }
            function f7() { return !c ? true : x; }
            function f8() { return !c ? !1 : x; }
            function g1() { return a == b ? x : true; }
            function g2() { return a == b ? x : false; }
            function g3() { return a < b ? x : !0; }
            function g4() { return a < b ? x : !1; }
            function g5() { return c ? x : true; }
            function g6() { return c ? x : !1; }
            function g7() { return !c ? x : !0; }
            function g8() { return !c ? x : false; }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
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
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '=='
                                        },
                                        consequent: {
                                            type: 'Literal',
                                            value: true,
                                            raw: 'true'
                                        },
                                        alternate: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f1'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '=='
                                        },
                                        consequent: {
                                            type: 'Literal',
                                            value: false,
                                            raw: 'false'
                                        },
                                        alternate: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f2'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '<'
                                        },
                                        consequent: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Literal',
                                                value: 0,
                                                raw: '0'
                                            },
                                            prefix: true
                                        },
                                        alternate: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f3'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '<'
                                        },
                                        consequent: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Literal',
                                                value: 1,
                                                raw: '1'
                                            },
                                            prefix: true
                                        },
                                        alternate: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f4'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'Identifier',
                                            name: 'c'
                                        },
                                        consequent: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Literal',
                                                value: 0,
                                                raw: '0'
                                            },
                                            prefix: true
                                        },
                                        alternate: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f5'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'Identifier',
                                            name: 'c'
                                        },
                                        consequent: {
                                            type: 'Literal',
                                            value: false,
                                            raw: 'false'
                                        },
                                        alternate: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f6'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            prefix: true
                                        },
                                        consequent: {
                                            type: 'Literal',
                                            value: true,
                                            raw: 'true'
                                        },
                                        alternate: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f7'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            prefix: true
                                        },
                                        consequent: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Literal',
                                                value: 1,
                                                raw: '1'
                                            },
                                            prefix: true
                                        },
                                        alternate: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f8'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '=='
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: true,
                                            raw: 'true'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g1'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '=='
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: false,
                                            raw: 'false'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g2'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '<'
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        alternate: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Literal',
                                                value: 0,
                                                raw: '0'
                                            },
                                            prefix: true
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g3'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '<'
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        alternate: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Literal',
                                                value: 1,
                                                raw: '1'
                                            },
                                            prefix: true
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g4'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'Identifier',
                                            name: 'c'
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: true,
                                            raw: 'true'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g5'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'Identifier',
                                            name: 'c'
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        alternate: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Literal',
                                                value: 1,
                                                raw: '1'
                                            },
                                            prefix: true
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g6'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            prefix: true
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        alternate: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Literal',
                                                value: 0,
                                                raw: '0'
                                            },
                                            prefix: true
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g7'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            prefix: true
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: false,
                                            raw: 'false'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g8'
                        }
                    }
                ]
            }
        });

      pass(`function f1() {
              return !(a != b) || x;
            }
            function f2() {
              return a != b && x;
            }
            function f3() {
              return !!(a < b) || x;
            }
            function f4() {
              return !(a < b) && x;
            }
            function f5() {
              return !!c || x;
            }
            function f6() {
              return !c && x;
            }
            +function f7() {
              return !c || x;
            }
            +function f8() {
              return !!c && x;
            }
            +function g1() {
              return a != b || x;
            }
            function g2() {
              return !(a != b) && x;
            }
            function g3() {
              return !(a < b) || x;
            }
            function g4() {
              return !!(a < b) && x;
            }
            function g5() {
              return !c || x;
            }
            function g6() {
              return !!c && x;
            }
            function g7() {
              return !!c || x;
            }
            function g8() {
              return !c && x;
            }`, {
            source: `function f1() {
                return !(a != b) || x;
              }
              function f2() {
                return a != b && x;
              }
              function f3() {
                return !!(a < b) || x;
              }
              function f4() {
                return !(a < b) && x;
              }
              function f5() {
                return !!c || x;
              }
              function f6() {
                return !c && x;
              }
              +function f7() {
                return !c || x;
              }
              +function f8() {
                return !!c && x;
              }
              +function g1() {
                return a != b || x;
              }
              function g2() {
                return !(a != b) && x;
              }
              function g3() {
                return !(a < b) || x;
              }
              function g4() {
                return !!(a < b) && x;
              }
              function g5() {
                return !c || x;
              }
              function g6() {
                return !!c && x;
              }
              function g7() {
                return !!c || x;
              }
              function g8() {
                return !c && x;
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
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
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                operator: '!='
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '||'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f1'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '!='
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '&&'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f2'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'a'
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'b'
                                                    },
                                                    operator: '<'
                                                },
                                                prefix: true
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '||'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f3'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                operator: '<'
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '&&'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f4'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'c'
                                                },
                                                prefix: true
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '||'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f5'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '&&'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f6'
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'BinaryExpression',
                            left: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'UnaryExpression',
                                    operator: '+',
                                    argument: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'LogicalExpression',
                                                        left: {
                                                            type: 'UnaryExpression',
                                                            operator: '!',
                                                            argument: {
                                                                type: 'Identifier',
                                                                name: 'c'
                                                            },
                                                            prefix: true
                                                        },
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'x'
                                                        },
                                                        operator: '||'
                                                    }
                                                }
                                            ]
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f7'
                                        }
                                    },
                                    prefix: true
                                },
                                right: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'LogicalExpression',
                                                    left: {
                                                        type: 'UnaryExpression',
                                                        operator: '!',
                                                        argument: {
                                                            type: 'UnaryExpression',
                                                            operator: '!',
                                                            argument: {
                                                                type: 'Identifier',
                                                                name: 'c'
                                                            },
                                                            prefix: true
                                                        },
                                                        prefix: true
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    },
                                                    operator: '&&'
                                                }
                                            }
                                        ]
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'f8'
                                    }
                                },
                                operator: '+'
                            },
                            right: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'LogicalExpression',
                                                left: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'a'
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'b'
                                                    },
                                                    operator: '!='
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                },
                                                operator: '||'
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'g1'
                                }
                            },
                            operator: '+'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                operator: '!='
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '&&'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g2'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                operator: '<'
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '||'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g3'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'a'
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'b'
                                                    },
                                                    operator: '<'
                                                },
                                                prefix: true
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '&&'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g4'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '||'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g5'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'c'
                                                },
                                                prefix: true
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '&&'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g6'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'c'
                                                },
                                                prefix: true
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '||'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g7'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            prefix: true
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        operator: '&&'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g8'
                        }
                    }
                ]
            }
        });

      pass(`function x(a, b) {
              a = a || b;
              return b === a || !a;
            }`, {
            source: `function x(a, b) {
                a = a || b;
                return b === a || !a;
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            },
                            {
                                type: 'Identifier',
                                name: 'b'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        operator: '=',
                                        right: {
                                            type: 'LogicalExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            operator: '||'
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            operator: '==='
                                        },
                                        right: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'a'
                                            },
                                            prefix: true
                                        },
                                        operator: '||'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        }
                    }
                ]
            }
        });

      pass(`function foo(a) {
              if (a && a.b != null) {
                if ((a.c--) === 1) {
                  return;
                }
                return a.b;
              }
              return bar(a);
            }`, {
            source: `function foo(a) {
                if (a && a.b != null) {
                  if ((a.c--) === 1) {
                    return;
                  }
                  return a.b;
                }
                return bar(a);
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'LogicalExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'a'
                                                },
                                                computed: false,
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: null,
                                                raw: 'null'
                                            },
                                            operator: '!='
                                        },
                                        operator: '&&'
                                    },
                                    alternate: null,
                                    consequent: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'IfStatement',
                                                test: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'UpdateExpression',
                                                        argument: {
                                                            type: 'MemberExpression',
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'a'
                                                            },
                                                            computed: false,
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'c'
                                                            }
                                                        },
                                                        operator: '--',
                                                        prefix: false
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 1,
                                                        raw: '1'
                                                    },
                                                    operator: '==='
                                                },
                                                alternate: null,
                                                consequent: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: null
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'a'
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'b'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'bar'
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'a'
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo'
                        }
                    }
                ]
            }
        });

      pass(`(function*() { [...{ a = yield }] = 1; })        `, {
            source: `(function*() { [...{ a = yield }] = 1; })`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'ArrayPattern',
                                                elements: [
                                                    {
                                                        type: 'RestElement',
                                                        argument: {
                                                            type: 'ObjectPattern',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
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
                                                                    value: {
                                                                        type: 'AssignmentPattern',
                                                                        left: {
                                                                            type: 'Identifier',
                                                                            name: 'a',
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
                                                                        right: {
                                                                            type: 'YieldExpression',
                                                                            argument: null,
                                                                            delegate: false,
                                                                            start: 25,
                                                                            end: 30,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 1,
                                                                                    column: 25
                                                                                },
                                                                                end: {
                                                                                    line: 1,
                                                                                    column: 30
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 21,
                                                                        end: 30,
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
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: true,
                                                                    start: 21,
                                                                    end: 30,
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
                                                                }
                                                            ],
                                                            start: 19,
                                                            end: 32,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 19
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 32
                                                                }
                                                            }
                                                        },
                                                        start: 16,
                                                        end: 32,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 16
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 32
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 15,
                                                end: 33,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 33
                                                    }
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Literal',
                                                value: 1,
                                                start: 36,
                                                end: 37,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 36
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 37
                                                    }
                                                },
                                                raw: '1'
                                            },
                                            start: 15,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        },
                                        start: 15,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 15
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    }
                                ],
                                start: 13,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            },
                            async: false,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 1,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
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

      pass(`function foo() {
              return a ? b : c ? d : e;
            }`, {
            source: `function foo() {
                  return a ? b : c ? d : e;
                }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
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
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'b'
                                        },
                                        alternate: {
                                            type: 'ConditionalExpression',
                                            test: {
                                                type: 'Identifier',
                                                name: 'c'
                                            },
                                            consequent: {
                                                type: 'Identifier',
                                                name: 'd'
                                            },
                                            alternate: {
                                                type: 'Identifier',
                                                name: 'e'
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo'
                        }
                    }
                ]
            }
        });

      pass(`function foo() {
              if (a) return b;
              c = d;
              return z;
            }`, {
            source: `function foo() {
                if (a) return b;
                c = d;
                return z;
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    alternate: null,
                                    consequent: {
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'c'
                                        },
                                        operator: '=',
                                        right: {
                                            type: 'Identifier',
                                            name: 'd'
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'z'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo'
                        }
                    }
                ]
            }
        });

      pass(`function foo() {
              x();
              y();
              for (z(); i < 10; i++) z();
            }`, {
            source: `function foo() {
                x();
                y();
                for (z(); i < 10; i++) z();
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
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
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        arguments: []
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'y'
                                        },
                                        arguments: []
                                    }
                                },
                                {
                                    type: 'ForStatement',
                                    body: {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'z'
                                            },
                                            arguments: []
                                        }
                                    },
                                    init: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'z'
                                        },
                                        arguments: []
                                    },
                                    test: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'i'
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 10,
                                            raw: '10'
                                        },
                                        operator: '<'
                                    },
                                    update: {
                                        type: 'UpdateExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'i'
                                        },
                                        operator: '++',
                                        prefix: false
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo'
                        }
                    }
                ]
            }
        });

      pass(`function foo(object, property, value) {
            return !!(object && property) && (object[property] = value, true);
          }`, {
          source: `function foo(object, property, value) {
            return !!(object && property) && (object[property] = value, true);
          }`,
          raw: true,
          expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'object'
                        },
                        {
                            type: 'Identifier',
                            name: 'property'
                        },
                        {
                            type: 'Identifier',
                            name: 'value'
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'LogicalExpression',
                                    left: {
                                        type: 'UnaryExpression',
                                        operator: '!',
                                        argument: {
                                            type: 'UnaryExpression',
                                            operator: '!',
                                            argument: {
                                                type: 'LogicalExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'object'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'property'
                                                },
                                                operator: '&&'
                                            },
                                            prefix: true
                                        },
                                        prefix: true
                                    },
                                    right: {
                                        type: 'SequenceExpression',
                                        expressions: [
                                            {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'object'
                                                    },
                                                    computed: true,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'property'
                                                    }
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'value'
                                                }
                                            },
                                            {
                                                type: 'Literal',
                                                value: true,
                                                raw: 'true'
                                            }
                                        ]
                                    },
                                    operator: '&&'
                                }
                            }
                        ]
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo'
                    }
                }
            ]
        }
        });

      pass(`function x() {
              if (a) {
                if (b) {
                  for(;;) {
                    if (a) b();
                  }
                }
              } else {
                async();
              }
            }`, {
            source: `function x() {
                if (a) {
                  if (b) {
                    for(;;) {
                      if (a) b();
                    }
                  }
                } else {
                  async();
                }
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    alternate: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'async'
                                                    },
                                                    arguments: []
                                                }
                                            }
                                        ]
                                    },
                                    consequent: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'IfStatement',
                                                test: {
                                                    type: 'Identifier',
                                                    name: 'b'
                                                },
                                                alternate: null,
                                                consequent: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ForStatement',
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [
                                                                    {
                                                                        type: 'IfStatement',
                                                                        test: {
                                                                            type: 'Identifier',
                                                                            name: 'a'
                                                                        },
                                                                        alternate: null,
                                                                        consequent: {
                                                                            type: 'ExpressionStatement',
                                                                            expression: {
                                                                                type: 'CallExpression',
                                                                                callee: {
                                                                                    type: 'Identifier',
                                                                                    name: 'b'
                                                                                },
                                                                                arguments: []
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            init: null,
                                                            test: null,
                                                            update: null
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'x'
                        }
                    }
                ]
            }
        });

      pass(`function foo() {
              while(1) {
                if (a === null) {
                  b();
                  return;
                }
                a();
                b();
              }
            }`, {
            source: `function foo() {
                while(1) {
                  if (a === null) {
                    b();
                    return;
                  }
                  a();
                  b();
                }
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'WhileStatement',
                                    test: {
                                        type: 'Literal',
                                        value: 1,
                                        raw: '1'
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'IfStatement',
                                                test: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'a'
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: null,
                                                        raw: 'null'
                                                    },
                                                    operator: '==='
                                                },
                                                alternate: null,
                                                consequent: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'b'
                                                                },
                                                                arguments: []
                                                            }
                                                        },
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: null
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'a'
                                                    },
                                                    arguments: []
                                                }
                                            },
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'b'
                                                    },
                                                    arguments: []
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo'
                        }
                    }
                ]
            }
        });

      pass(`function bar() {
              switch (foo) {
                case 'foo':
                  return 1;
                case foo.bar:
                  return 2;
                case wow:
                  wow();
                  return 3;
              }
              return 0;
            }`, {
            source: `function bar() {
                switch (foo) {
                  case 'foo':
                    return 1;
                  case foo.bar:
                    return 2;
                  case wow:
                    wow();
                    return 3;
                }
                return 0;
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'SwitchStatement',
                                    discriminant: {
                                        type: 'Identifier',
                                        name: 'foo'
                                    },
                                    cases: [
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'Literal',
                                                value: 'foo',
                                                raw: '\'foo\''
                                            },
                                            consequent: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Literal',
                                                        value: 1,
                                                        raw: '1'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'foo'
                                                },
                                                computed: false,
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'bar'
                                                }
                                            },
                                            consequent: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Literal',
                                                        value: 2,
                                                        raw: '2'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'Identifier',
                                                name: 'wow'
                                            },
                                            consequent: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'wow'
                                                        },
                                                        arguments: []
                                                    }
                                                },
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Literal',
                                                        value: 3,
                                                        raw: '3'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Literal',
                                        value: 0,
                                        raw: '0'
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'bar'
                        }
                    }
                ]
            }
        });

      pass(`function bar() {
              switch (foo) {
                case 'foo':
                  foo();
                  break;
                case foo.bar:
                  wow();
                  wat();
                  break;
                case shh:
                case wow:
                  baa();
                  break;
                default:
                  meh();
              }
            }`, {
            source: `function bar() {
                switch (foo) {
                  case 'foo':
                    foo();
                    break;
                  case foo.bar:
                    wow();
                    wat();
                    break;
                  case shh:
                  case wow:
                    baa();
                    break;
                  default:
                    meh();
                }
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'SwitchStatement',
                                    discriminant: {
                                        type: 'Identifier',
                                        name: 'foo'
                                    },
                                    cases: [
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'Literal',
                                                value: 'foo',
                                                raw: '\'foo\''
                                            },
                                            consequent: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'foo'
                                                        },
                                                        arguments: []
                                                    }
                                                },
                                                {
                                                    type: 'BreakStatement',
                                                    label: null
                                                }
                                            ]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'foo'
                                                },
                                                computed: false,
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'bar'
                                                }
                                            },
                                            consequent: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'wow'
                                                        },
                                                        arguments: []
                                                    }
                                                },
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'wat'
                                                        },
                                                        arguments: []
                                                    }
                                                },
                                                {
                                                    type: 'BreakStatement',
                                                    label: null
                                                }
                                            ]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'Identifier',
                                                name: 'shh'
                                            },
                                            consequent: []
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'Identifier',
                                                name: 'wow'
                                            },
                                            consequent: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'baa'
                                                        },
                                                        arguments: []
                                                    }
                                                },
                                                {
                                                    type: 'BreakStatement',
                                                    label: null
                                                }
                                            ]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: null,
                                            consequent: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'meh'
                                                        },
                                                        arguments: []
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'bar'
                        }
                    }
                ]
            }
        });

      pass(`function foo() {
              a();
              var x = bar();
              b(x);
              this.d = x;
            }
            function bar() {
              x();
             while (x) {
                if (x) x();
              }
              try { y(); } catch (e) {}
              var z = x();
              z();
              while (a) b();
              c();
              z();
            }`, {
            source: `function foo() {
                a();
                var x = bar();
                b(x);
                this.d = x;
              }
              function bar() {
                x();
               while (x) {
                  if (x) x();
                }
                try { y(); } catch (e) {}
                var z = x();
                z();
                while (a) b();
                c();
                z();
              }`,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
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
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        arguments: []
                                    }
                                },
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            init: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'bar'
                                                },
                                                arguments: []
                                            },
                                            id: {
                                                type: 'Identifier',
                                                name: 'x'
                                            }
                                        }
                                    ],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'b'
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'x'
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'ThisExpression'
                                            },
                                            computed: false,
                                            property: {
                                                type: 'Identifier',
                                                name: 'd'
                                            }
                                        },
                                        operator: '=',
                                        right: {
                                            type: 'Identifier',
                                            name: 'x'
                                        }
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo'
                        }
                    },
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        arguments: []
                                    }
                                },
                                {
                                    type: 'WhileStatement',
                                    test: {
                                        type: 'Identifier',
                                        name: 'x'
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'IfStatement',
                                                test: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                },
                                                alternate: null,
                                                consequent: {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'x'
                                                        },
                                                        arguments: []
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'TryStatement',
                                    block: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'y'
                                                    },
                                                    arguments: []
                                                }
                                            }
                                        ]
                                    },
                                    handler: {
                                        type: 'CatchClause',
                                        param: {
                                            type: 'Identifier',
                                            name: 'e'
                                        },
                                        body: {
                                            type: 'BlockStatement',
                                            body: []
                                        }
                                    },
                                    finalizer: null
                                },
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            init: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'x'
                                                },
                                                arguments: []
                                            },
                                            id: {
                                                type: 'Identifier',
                                                name: 'z'
                                            }
                                        }
                                    ],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'z'
                                        },
                                        arguments: []
                                    }
                                },
                                {
                                    type: 'WhileStatement',
                                    test: {
                                        type: 'Identifier',
                                        name: 'a'
                                    },
                                    body: {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'b'
                                            },
                                            arguments: []
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'c'
                                        },
                                        arguments: []
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'z'
                                        },
                                        arguments: []
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'bar'
                        }
                    }
                ]
            }
        });
});
