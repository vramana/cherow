import { pass, fail } from '../test-utils';

describe('Expressions - Async Await', () => {

  fail(`export default async function await() {}`, {
    source: 'export default async function await() {}',
    module: true,
    line: 1
});

  fail(`export async function await() {}`, {
  source: 'export async function await() {}',
  module: true,
  line: 1
});

  fail(`export async function() {}`, {
  source: 'export async function() {}',
  module: true,
  line: 1
});

  fail(`export async`, {
  source: 'export async',
  module: true,
  line: 1
});

  fail(`"export async\nfunction async() { await 1; }`, {
  source: '"export async\nfunction async() { await 1; }',
  module: true,
  line: 1
});

  fail(`"use strict"; var O = { async method*() {} };`, {
      source: '"use strict"; var O = { async method*() {} };',
      line: 1
  });

  fail(`"use strict"; var O = { async method(x = await 1) { return x; } };`, {
      source: '"use strict"; var O = { async method(x = await 1) { return x; } };',
      line: 1
  });

  fail(`"use strict"; class C { async constructor() {} }`, {
      source: '"use strict"; class C { async constructor() {} }',
      line: 1
  });

  fail(`"use strict"; (async function foo1() { } foo2 => 1)`, {
      source: '"use strict"; (async function foo1() { } foo2 => 1)',
      line: 1
  });

  fail(`"use strict"; (async function() { } foo5 => 1)`, {
      source: '"use strict"; (async function() { } foo5 => 1)',
      line: 1
  });

  fail(`(async['foo17'] () => 1)`, {
      source: '(async["foo17"] () => 1)',
      line: 1
  });

  fail('"use strict"; (async`foo23` foo24 => 1)', {
      source: '"use strict"; (async`foo23` foo24 => 1)',
      line: 1
  });

  fail(`"use strict"; async(...a,) => b`, {
      source: '"use strict"; async(...a,) => b',
      line: 1
  });

  fail(`async(...a, b) => b`, {
      source: 'async(...a, b) => b',
      line: 1
  });

  fail(`"use strict"; async(...a,) => b`, {
      source: '"use strict"; async(...a,) => b',
      line: 1
  });

  fail(`let f = () => { const { [f]: ...await f } = {};  }`, {
  source: 'let f = () => { const { [f]: ...await f } = {};  }',
  line: 1
});

  fail(`let f = () => {const { f: ...await f } = {}; }`, {
  source: 'let f = () => { const { f: ...await f } = {}; }',
  line: 1
});

  fail(`async function* f() { const [await f] = []; }`, {
  source: 'async function* f() { const [await f] = []; }',
  line: 1
});

  fail(`async function* f() { let { ...await f } = {}; }`, {
  source: 'async function* f() { let { ...await f } = {}; }',
  line: 1
});

  fail(`async function* f() { var { [f]: await f } = {}; }`, {
  source: 'async function* f() { var { [f]: await f } = {}; }',
  line: 1
});

  fail(`async function* f() { const { [f]: ...await f } = {}; }`, {
  source: 'async function* f() { const { [f]: ...await f } = {}; }',
  line: 1
});

  fail(`var f = async( [await = 1] ) => {}`, {
  source: 'var f = async( [await = 1] ) => {}',
  line: 1
});

  fail(`var f = async( x = await) => {}`, {
  source: 'var f = async(x = await ) => {}',
  line: 1
});

  fail(`var f = async( ...[await] ) => {}`, {
  source: 'var f = async( ...[await] ) => {}',
  line: 1
});

  fail(`var f = async([await] = [] ) => {}`, {
  source: 'var f = async([await] = [] ) => {}',
  line: 1
});

  fail(`var f = async([await] = [] ) => {}`, {
  source: 'var f = async([await] = [] ) => {}',
  line: 1
});

  fail(`var f = async( { await } = {} ) => {}`, {
  source: 'var f = async( { await } = {} ) => {}',
  line: 1
});

  fail(`var f = async( {1) => 1 ) => {}`, {
  source: 'var f = async(1) => 1 ) => {}',
  line: 1
});

  fail(`var f = async( { foo = async(1) => 1 }) => 1 ) => {}`, {
  source: 'var f = async({ foo = async(1) => 1 }) => 1 ) => {}',
  line: 1
});

  fail(`var f = async( x = async(await) ) => {}`, {
  source: 'var f = async( x = async(await)) => {}',
  line: 1
});

  fail('var f = async( { x = await }` ) => {}', {
  source: 'var f = async({ x = await } ) => {}',
  line: 1
});

  pass(`async function f( x = function await() {} ) {}`, {
    source: 'async function f( x = function await() {} ) {}',
    ranges: true,
    raw: true,
    loc: true,
    expected: {
      type: 'Program',
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
      },
      body: [
        {
          type: 'FunctionDeclaration',
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
          },
          id: {
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
            name: 'f'
          },
          generator: false,
          expression: false,
          async: true,
          params: [
            {
              type: 'AssignmentPattern',
              start: 18,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 41
                }
              },
              left: {
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
              right: {
                type: 'FunctionExpression',
                start: 22,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                },
                id: {
                  type: 'Identifier',
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
                  },
                  name: 'await'
                },
                generator: false,
                expression: false,
                async: false,
                params: [],
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
          ],
          body: {
            type: 'BlockStatement',
            start: 44,
            end: 46,
            loc: {
              start: {
                line: 1,
                column: 44
              },
              end: {
                line: 1,
                column: 46
              }
            },
            body: []
          }
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`async function f( x = function() { let await = 0; } ) {}`, {
    source: 'async function f( x = function() { let await = 0; } ) {}',
    ranges: true,
    raw: true,
    loc: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 56,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 56
        }
      },
      body: [
        {
          type: 'FunctionDeclaration',
          start: 0,
          end: 56,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 56
            }
          },
          id: {
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
            name: 'f'
          },
          generator: false,
          expression: false,
          async: true,
          params: [
            {
              type: 'AssignmentPattern',
              start: 18,
              end: 51,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 51
                }
              },
              left: {
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
              right: {
                type: 'FunctionExpression',
                start: 22,
                end: 51,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 51
                  }
                },
                id: null,
                generator: false,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 33,
                  end: 51,
                  loc: {
                    start: {
                      line: 1,
                      column: 33
                    },
                    end: {
                      line: 1,
                      column: 51
                    }
                  },
                  body: [
                    {
                      type: 'VariableDeclaration',
                      start: 35,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          start: 39,
                          end: 48,
                          loc: {
                            start: {
                              line: 1,
                              column: 39
                            },
                            end: {
                              line: 1,
                              column: 48
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 39,
                            end: 44,
                            loc: {
                              start: {
                                line: 1,
                                column: 39
                              },
                              end: {
                                line: 1,
                                column: 44
                              }
                            },
                            name: 'await'
                          },
                          init: {
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                          }
                        }
                      ],
                      kind: 'let'
                    }
                  ]
                }
              }
            }
          ],
          body: {
            type: 'BlockStatement',
            start: 54,
            end: 56,
            loc: {
              start: {
                line: 1,
                column: 54
              },
              end: {
                line: 1,
                column: 56
              }
            },
            body: []
          }
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`async function f( x = () => { let await = 0; } ) {}`, {
    source: 'async function f(  x = () => { let await = 0; }) {}',
    ranges: true,
    raw: true,
    loc: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 51,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 51
        }
      },
      body: [
        {
          type: 'FunctionDeclaration',
          start: 0,
          end: 51,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 51
            }
          },
          id: {
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
            name: 'f'
          },
          generator: false,
          expression: false,
          async: true,
          params: [
            {
              type: 'AssignmentPattern',
              start: 19,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 47
                }
              },
              left: {
                type: 'Identifier',
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
                name: 'x'
              },
              right: {
                type: 'ArrowFunctionExpression',
                start: 23,
                end: 47,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 47
                  }
                },
                id: null,
                generator: false,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 29,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 29
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  },
                  body: [
                    {
                      type: 'VariableDeclaration',
                      start: 31,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 31
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          start: 35,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          },
                          id: {
                            type: 'Identifier',
                            start: 35,
                            end: 40,
                            loc: {
                              start: {
                                line: 1,
                                column: 35
                              },
                              end: {
                                line: 1,
                                column: 40
                              }
                            },
                            name: 'await'
                          },
                          init: {
                            type: 'Literal',
                            start: 43,
                            end: 44,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 44
                              }
                            },
                            value: 0,
                            raw: '0'
                          }
                        }
                      ],
                      kind: 'let'
                    }
                  ]
                }
              }
            }
          ],
          body: {
            type: 'BlockStatement',
            start: 49,
            end: 51,
            loc: {
              start: {
                line: 1,
                column: 49
              },
              end: {
                line: 1,
                column: 51
              }
            },
            body: []
          }
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`"use strict"; var f = async( x = function *await() {} ) => {}`, {
    source: '"use strict"; var f = async( x = function *await() {} ) => {}',
    ranges: true,
    raw: true,
    loc: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 61,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 61
        }
      },
      body: [
        {
          type: 'ExpressionStatement',
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
            value: 'use strict',
            raw: '"use strict"'
          },
          directive: 'use strict'
        },
        {
          type: 'VariableDeclaration',
          start: 14,
          end: 61,
          loc: {
            start: {
              line: 1,
              column: 14
            },
            end: {
              line: 1,
              column: 61
            }
          },
          declarations: [
            {
              type: 'VariableDeclarator',
              start: 18,
              end: 61,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 61
                }
              },
              id: {
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
                name: 'f'
              },
              init: {
                type: 'ArrowFunctionExpression',
                start: 22,
                end: 61,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 61
                  }
                },
                id: null,
                generator: false,
                expression: false,
                async: true,
                params: [
                  {
                    type: 'AssignmentPattern',
                    start: 29,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 29,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 29
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      },
                      name: 'x'
                    },
                    right: {
                      type: 'FunctionExpression',
                      start: 33,
                      end: 53,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 53
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 43,
                        end: 48,
                        loc: {
                          start: {
                            line: 1,
                            column: 43
                          },
                          end: {
                            line: 1,
                            column: 48
                          }
                        },
                        name: 'await'
                      },
                      generator: true,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        start: 51,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 51
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        },
                        body: []
                      }
                    }
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  start: 59,
                  end: 61,
                  loc: {
                    start: {
                      line: 1,
                      column: 59
                    },
                    end: {
                      line: 1,
                      column: 61
                    }
                  },
                  body: []
                }
              }
            }
          ],
          kind: 'var'
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`"use strict"; var f = async( x = () => { let await = 0; } ) => {}`, {
    source: '"use strict"; var f = async( x = () => { let await = 0; } ) => {}',
    ranges: true,
    raw: true,
    loc: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 65,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 65
        }
      },
      body: [
        {
          type: 'ExpressionStatement',
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
            value: 'use strict',
            raw: '"use strict"'
          },
          directive: 'use strict'
        },
        {
          type: 'VariableDeclaration',
          start: 14,
          end: 65,
          loc: {
            start: {
              line: 1,
              column: 14
            },
            end: {
              line: 1,
              column: 65
            }
          },
          declarations: [
            {
              type: 'VariableDeclarator',
              start: 18,
              end: 65,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 65
                }
              },
              id: {
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
                name: 'f'
              },
              init: {
                type: 'ArrowFunctionExpression',
                start: 22,
                end: 65,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 65
                  }
                },
                id: null,
                generator: false,
                expression: false,
                async: true,
                params: [
                  {
                    type: 'AssignmentPattern',
                    start: 29,
                    end: 57,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 57
                      }
                    },
                    left: {
                      type: 'Identifier',
                      start: 29,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 29
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      },
                      name: 'x'
                    },
                    right: {
                      type: 'ArrowFunctionExpression',
                      start: 33,
                      end: 57,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 57
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        start: 39,
                        end: 57,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 57
                          }
                        },
                        body: [
                          {
                            type: 'VariableDeclaration',
                            start: 41,
                            end: 55,
                            loc: {
                              start: {
                                line: 1,
                                column: 41
                              },
                              end: {
                                line: 1,
                                column: 55
                              }
                            },
                            declarations: [
                              {
                                type: 'VariableDeclarator',
                                start: 45,
                                end: 54,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 45
                                  },
                                  end: {
                                    line: 1,
                                    column: 54
                                  }
                                },
                                id: {
                                  type: 'Identifier',
                                  start: 45,
                                  end: 50,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 45
                                    },
                                    end: {
                                      line: 1,
                                      column: 50
                                    }
                                  },
                                  name: 'await'
                                },
                                init: {
                                  type: 'Literal',
                                  start: 53,
                                  end: 54,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 53
                                    },
                                    end: {
                                      line: 1,
                                      column: 54
                                    }
                                  },
                                  value: 0,
                                  raw: '0'
                                }
                              }
                            ],
                            kind: 'let'
                          }
                        ]
                      }
                    }
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  start: 63,
                  end: 65,
                  loc: {
                    start: {
                      line: 1,
                      column: 63
                    },
                    end: {
                      line: 1,
                      column: 65
                    }
                  },
                  body: []
                }
              }
            }
          ],
          kind: 'var'
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`var f = async(x = function await() {}) => {}`, {
    source: 'var f = async(x = function await() {}) => {}',
    ranges: true,
    raw: true,
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
              end: 44,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 44
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
                name: 'f'
              },
              init: {
                type: 'ArrowFunctionExpression',
                start: 8,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                },
                id: null,
                generator: false,
                expression: false,
                async: true,
                params: [
                  {
                    type: 'AssignmentPattern',
                    start: 14,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 37
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
                      type: 'FunctionExpression',
                      start: 18,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      },
                      id: {
                        type: 'Identifier',
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
                        name: 'await'
                      },
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        start: 35,
                        end: 37,
                        loc: {
                          start: {
                            line: 1,
                            column: 35
                          },
                          end: {
                            line: 1,
                            column: 37
                          }
                        },
                        body: []
                      }
                    }
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  start: 42,
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 42
                    },
                    end: {
                      line: 1,
                      column: 44
                    }
                  },
                  body: []
                }
              }
            }
          ],
          kind: 'var'
        }
      ],
      sourceType: 'script'
    }
  });

  pass(`"use strict"; var asyncFn = async function() { await 1; };`, {
      source: '"use strict"; var asyncFn = async function() { await 1; };',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          body: [{
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
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              body: [{
                                  type: 'ExpressionStatement',
                                  expression: {
                                      type: 'AwaitExpression',
                                      argument: {
                                          type: 'Literal',
                                          value: 1,
                                          start: 53,
                                          end: 54,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 53
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 54
                                              }
                                          },
                                          raw: '1'
                                      },
                                      start: 47,
                                      end: 54,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 47
                                          },
                                          end: {
                                              line: 1,
                                              column: 54
                                          }
                                      }
                                  },
                                  start: 47,
                                  end: 55,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 47
                                      },
                                      end: {
                                          line: 1,
                                          column: 55
                                      }
                                  }
                              }],
                              start: 45,
                              end: 57,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 45
                                  },
                                  end: {
                                      line: 1,
                                      column: 57
                                  }
                              }
                          },
                          async: true,
                          generator: false,
                          expression: false,
                          id: null,
                          start: 28,
                          end: 57,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 28
                              },
                              end: {
                                  line: 1,
                                  column: 57
                              }
                          }
                      },
                      id: {
                          type: 'Identifier',
                          name: 'asyncFn',
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
                          }
                      },
                      start: 18,
                      end: 57,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 57
                          }
                      }
                  }],
                  kind: 'var',
                  start: 14,
                  end: 58,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 58
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 58,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 58
              }
          }
      }
  });

  pass(`"use strict"; var O = { async method() { await 1; } }`, {
      source: '"use strict"; var O = { async method() { await 1; } }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          body: [{
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
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: {
                          type: 'ObjectExpression',
                          properties: [{
                              type: 'Property',
                              key: {
                                  type: 'Identifier',
                                  name: 'method',
                                  start: 30,
                                  end: 36,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
                                      },
                                      end: {
                                          line: 1,
                                          column: 36
                                      }
                                  }
                              },
                              value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      body: [{
                                          type: 'ExpressionStatement',
                                          expression: {
                                              type: 'AwaitExpression',
                                              argument: {
                                                  type: 'Literal',
                                                  value: 1,
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
                                                  raw: '1'
                                              },
                                              start: 41,
                                              end: 48,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 41
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 48
                                                  }
                                              }
                                          },
                                          start: 41,
                                          end: 49,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 41
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 49
                                              }
                                          }
                                      }],
                                      start: 39,
                                      end: 51,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 39
                                          },
                                          end: {
                                              line: 1,
                                              column: 51
                                          }
                                      }
                                  },
                                  async: true,
                                  generator: false,
                                  expression: false,
                                  id: null,
                                  start: 36,
                                  end: 51,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 36
                                      },
                                      end: {
                                          line: 1,
                                          column: 51
                                      }
                                  }
                              },
                              kind: 'init',
                              computed: false,
                              method: true,
                              shorthand: false,
                              start: 24,
                              end: 51,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 24
                                  },
                                  end: {
                                      line: 1,
                                      column: 51
                                  }
                              }
                          }],
                          start: 22,
                          end: 53,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 53
                              }
                          }
                      },
                      id: {
                          type: 'Identifier',
                          name: 'O',
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
                      start: 18,
                      end: 53,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 53
                          }
                      }
                  }],
                  kind: 'var',
                  start: 14,
                  end: 53,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
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

  pass(`"use strict"; async function await() {}`, {
      source: '"use strict"; async function await() {}',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'FunctionDeclaration',
                  start: 14,
                  end: 39,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 39
                      }
                  },
                  id: {
                      type: 'Identifier',
                      start: 29,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 29
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      },
                      name: 'await'
                  },
                  generator: false,
                  expression: false,
                  async: true,
                  params: [],
                  body: {
                      type: 'BlockStatement',
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
                      body: []
                  }
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; var asyncFn = async({ foo = 1 }) => foo;`, {
      source: '"use strict"; var asyncFn = async({ foo = 1 }) => foo;',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          body: [{
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
                  type: 'VariableDeclaration',
                  declarations: [{
                      type: 'VariableDeclarator',
                      init: {
                          type: 'ArrowFunctionExpression',
                          body: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 50,
                              end: 53,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 50
                                  },
                                  end: {
                                      line: 1,
                                      column: 53
                                  }
                              }
                          },
                          params: [{
                              type: 'ObjectPattern',
                              properties: [{
                                  type: 'Property',
                                  key: {
                                      type: 'Identifier',
                                      name: 'foo',
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
                                  value: {
                                      type: 'AssignmentPattern',
                                      left: {
                                          type: 'Identifier',
                                          name: 'foo',
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
                                      right: {
                                          type: 'Literal',
                                          value: 1,
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
                                          },
                                          raw: '1'
                                      },
                                      start: 36,
                                      end: 43,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 36
                                          },
                                          end: {
                                              line: 1,
                                              column: 43
                                          }
                                      }
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: true,
                                  start: 36,
                                  end: 43,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 36
                                      },
                                      end: {
                                          line: 1,
                                          column: 43
                                      }
                                  }
                              }],
                              start: 34,
                              end: 45,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 34
                                  },
                                  end: {
                                      line: 1,
                                      column: 45
                                  }
                              }
                          }],
                          id: null,
                          async: true,
                          generator: false,
                          expression: true,
                          start: 28,
                          end: 53,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 28
                              },
                              end: {
                                  line: 1,
                                  column: 53
                              }
                          }
                      },
                      id: {
                          type: 'Identifier',
                          name: 'asyncFn',
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
                          }
                      },
                      start: 18,
                      end: 53,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 53
                          }
                      }
                  }],
                  kind: 'var',
                  start: 14,
                  end: 54,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 54
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 54,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 54
              }
          }
      }
  });
  /*
      pass(`"use strict"; function* g() { var f = async(x = yield); }`, {
          source: '"use strict"; function* g() { var f = async(x = yield); }',
          ranges: true,
          raw: true,
          loc: true,
          expected: {}
      });*/

  pass(`"use strict"; var O = { async 'method'() { await 1; } }`, {
      source: '"use strict"; var O = { async "method"() { await 1; } }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'VariableDeclaration',
                  start: 14,
                  end: 55,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 55
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 18,
                      end: 55,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 55
                          }
                      },
                      id: {
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
                          name: 'O'
                      },
                      init: {
                          type: 'ObjectExpression',
                          start: 22,
                          end: 55,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 55
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 24,
                              end: 53,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 24
                                  },
                                  end: {
                                      line: 1,
                                      column: 53
                                  }
                              },
                              method: true,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Literal',
                                  start: 30,
                                  end: 38,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
                                      },
                                      end: {
                                          line: 1,
                                          column: 38
                                      }
                                  },
                                  value: 'method',
                                  raw: '"method"'
                              },
                              kind: 'init',
                              value: {
                                  type: 'FunctionExpression',
                                  start: 38,
                                  end: 53,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 38
                                      },
                                      end: {
                                          line: 1,
                                          column: 53
                                      }
                                  },
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: true,
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 41,
                                      end: 53,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 41
                                          },
                                          end: {
                                              line: 1,
                                              column: 53
                                          }
                                      },
                                      body: [{
                                          type: 'ExpressionStatement',
                                          start: 43,
                                          end: 51,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 43
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 51
                                              }
                                          },
                                          expression: {
                                              type: 'AwaitExpression',
                                              start: 43,
                                              end: 50,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 43
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 50
                                                  }
                                              },
                                              argument: {
                                                  type: 'Literal',
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
                                                  },
                                                  value: 1,
                                                  raw: '1'
                                              }
                                          }
                                      }]
                                  }
                              }
                          }]
                      }
                  }],
                  kind: 'var'
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; function* g() { var f = async(yield); }`, {
      source: '"use strict"; function* g() { var f = async(yield); }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'FunctionDeclaration',
                  start: 14,
                  end: 53,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 53
                      }
                  },
                  id: {
                      type: 'Identifier',
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
                      },
                      name: 'g'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      start: 28,
                      end: 53,
                      loc: {
                          start: {
                              line: 1,
                              column: 28
                          },
                          end: {
                              line: 1,
                              column: 53
                          }
                      },
                      body: [{
                          type: 'VariableDeclaration',
                          start: 30,
                          end: 51,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 30
                              },
                              end: {
                                  line: 1,
                                  column: 51
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
                              start: 34,
                              end: 50,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 34
                                  },
                                  end: {
                                      line: 1,
                                      column: 50
                                  }
                              },
                              id: {
                                  type: 'Identifier',
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
                                  },
                                  name: 'f'
                              },
                              init: {
                                  type: 'CallExpression',
                                  start: 38,
                                  end: 50,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 38
                                      },
                                      end: {
                                          line: 1,
                                          column: 50
                                      }
                                  },
                                  callee: {
                                      type: 'Identifier',
                                      start: 38,
                                      end: 43,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 38
                                          },
                                          end: {
                                              line: 1,
                                              column: 43
                                          }
                                      },
                                      name: 'async'
                                  },
                                  arguments: [{
                                      type: 'YieldExpression',
                                      start: 44,
                                      end: 49,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 44
                                          },
                                          end: {
                                              line: 1,
                                              column: 49
                                          }
                                      },
                                      delegate: false,
                                      argument: null
                                  }]
                              }
                          }],
                          kind: 'var'
                      }]
                  }
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; var O = { async ['meth' + 'od']() { await 1; } }`, {
      source: '"use strict"; var O = { async ["meth" + "od"]() { await 1; } }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 62,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 62
              }
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'VariableDeclaration',
                  start: 14,
                  end: 62,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 62
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 18,
                      end: 62,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 62
                          }
                      },
                      id: {
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
                          name: 'O'
                      },
                      init: {
                          type: 'ObjectExpression',
                          start: 22,
                          end: 62,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 62
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 24,
                              end: 60,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 24
                                  },
                                  end: {
                                      line: 1,
                                      column: 60
                                  }
                              },
                              method: true,
                              shorthand: false,
                              computed: true,
                              key: {
                                  type: 'BinaryExpression',
                                  start: 31,
                                  end: 44,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 31
                                      },
                                      end: {
                                          line: 1,
                                          column: 44
                                      }
                                  },
                                  left: {
                                      type: 'Literal',
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
                                      },
                                      value: 'meth',
                                      raw: '"meth"'
                                  },
                                  operator: '+',
                                  right: {
                                      type: 'Literal',
                                      start: 40,
                                      end: 44,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 40
                                          },
                                          end: {
                                              line: 1,
                                              column: 44
                                          }
                                      },
                                      value: 'od',
                                      raw: '"od"'
                                  }
                              },
                              kind: 'init',
                              value: {
                                  type: 'FunctionExpression',
                                  start: 45,
                                  end: 60,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 45
                                      },
                                      end: {
                                          line: 1,
                                          column: 60
                                      }
                                  },
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: true,
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 48,
                                      end: 60,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 48
                                          },
                                          end: {
                                              line: 1,
                                              column: 60
                                          }
                                      },
                                      body: [{
                                          type: 'ExpressionStatement',
                                          start: 50,
                                          end: 58,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 50
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 58
                                              }
                                          },
                                          expression: {
                                              type: 'AwaitExpression',
                                              start: 50,
                                              end: 57,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 50
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 57
                                                  }
                                              },
                                              argument: {
                                                  type: 'Literal',
                                                  start: 56,
                                                  end: 57,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 56
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 57
                                                      }
                                                  },
                                                  value: 1,
                                                  raw: '1'
                                              }
                                          }
                                      }]
                                  }
                              }
                          }]
                      }
                  }],
                  kind: 'var'
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; var f = function() { var async = 1; return async; }`, {
      source: '"use strict"; var f = function() { var async = 1; return async; }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 65,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 65
              }
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'VariableDeclaration',
                  start: 14,
                  end: 65,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 65
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 18,
                      end: 65,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 65
                          }
                      },
                      id: {
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
                          name: 'f'
                      },
                      init: {
                          type: 'FunctionExpression',
                          start: 22,
                          end: 65,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 65
                              }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              start: 33,
                              end: 65,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 33
                                  },
                                  end: {
                                      line: 1,
                                      column: 65
                                  }
                              },
                              body: [{
                                      type: 'VariableDeclaration',
                                      start: 35,
                                      end: 49,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 35
                                          },
                                          end: {
                                              line: 1,
                                              column: 49
                                          }
                                      },
                                      declarations: [{
                                          type: 'VariableDeclarator',
                                          start: 39,
                                          end: 48,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 39
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 48
                                              }
                                          },
                                          id: {
                                              type: 'Identifier',
                                              start: 39,
                                              end: 44,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 39
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 44
                                                  }
                                              },
                                              name: 'async'
                                          },
                                          init: {
                                              type: 'Literal',
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
                                              value: 1,
                                              raw: '1'
                                          }
                                      }],
                                      kind: 'var'
                                  },
                                  {
                                      type: 'ReturnStatement',
                                      start: 50,
                                      end: 63,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 50
                                          },
                                          end: {
                                              line: 1,
                                              column: 63
                                          }
                                      },
                                      argument: {
                                          type: 'Identifier',
                                          start: 57,
                                          end: 62,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 57
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 62
                                              }
                                          },
                                          name: 'async'
                                      }
                                  }
                              ]
                          }
                      }
                  }],
                  kind: 'var'
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; var f = function() { function foo() { var await = 1; return await; } }`, {
      source: '"use strict"; var f = function() { function foo() { var await = 1; return await; } }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 84,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 84
              }
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'VariableDeclaration',
                  start: 14,
                  end: 84,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 84
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 18,
                      end: 84,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 84
                          }
                      },
                      id: {
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
                          name: 'f'
                      },
                      init: {
                          type: 'FunctionExpression',
                          start: 22,
                          end: 84,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 84
                              }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              start: 33,
                              end: 84,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 33
                                  },
                                  end: {
                                      line: 1,
                                      column: 84
                                  }
                              },
                              body: [{
                                  type: 'FunctionDeclaration',
                                  start: 35,
                                  end: 82,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 35
                                      },
                                      end: {
                                          line: 1,
                                          column: 82
                                      }
                                  },
                                  id: {
                                      type: 'Identifier',
                                      start: 44,
                                      end: 47,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 44
                                          },
                                          end: {
                                              line: 1,
                                              column: 47
                                          }
                                      },
                                      name: 'foo'
                                  },
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 50,
                                      end: 82,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 50
                                          },
                                          end: {
                                              line: 1,
                                              column: 82
                                          }
                                      },
                                      body: [{
                                              type: 'VariableDeclaration',
                                              start: 52,
                                              end: 66,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 52
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 66
                                                  }
                                              },
                                              declarations: [{
                                                  type: 'VariableDeclarator',
                                                  start: 56,
                                                  end: 65,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 56
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 65
                                                      }
                                                  },
                                                  id: {
                                                      type: 'Identifier',
                                                      start: 56,
                                                      end: 61,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 56
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 61
                                                          }
                                                      },
                                                      name: 'await'
                                                  },
                                                  init: {
                                                      type: 'Literal',
                                                      start: 64,
                                                      end: 65,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 64
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 65
                                                          }
                                                      },
                                                      value: 1,
                                                      raw: '1'
                                                  }
                                              }],
                                              kind: 'var'
                                          },
                                          {
                                              type: 'ReturnStatement',
                                              start: 67,
                                              end: 80,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 67
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 80
                                                  }
                                              },
                                              argument: {
                                                  type: 'Identifier',
                                                  start: 74,
                                                  end: 79,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 74
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 79
                                                      }
                                                  },
                                                  name: 'await'
                                              }
                                          }
                                      ]
                                  }
                              }]
                          }
                      }
                  }],
                  kind: 'var'
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; var f = function() { var O = { method() { var await = 1; return await; } }; }`, {
      source: '"use strict"; var f = function() { var O = { method() { var await = 1; return await; } }; }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 91,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 91
              }
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'VariableDeclaration',
                  start: 14,
                  end: 91,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 91
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 18,
                      end: 91,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 91
                          }
                      },
                      id: {
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
                          name: 'f'
                      },
                      init: {
                          type: 'FunctionExpression',
                          start: 22,
                          end: 91,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 91
                              }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              start: 33,
                              end: 91,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 33
                                  },
                                  end: {
                                      line: 1,
                                      column: 91
                                  }
                              },
                              body: [{
                                  type: 'VariableDeclaration',
                                  start: 35,
                                  end: 89,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 35
                                      },
                                      end: {
                                          line: 1,
                                          column: 89
                                      }
                                  },
                                  declarations: [{
                                      type: 'VariableDeclarator',
                                      start: 39,
                                      end: 88,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 39
                                          },
                                          end: {
                                              line: 1,
                                              column: 88
                                          }
                                      },
                                      id: {
                                          type: 'Identifier',
                                          start: 39,
                                          end: 40,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 39
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 40
                                              }
                                          },
                                          name: 'O'
                                      },
                                      init: {
                                          type: 'ObjectExpression',
                                          start: 43,
                                          end: 88,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 43
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 88
                                              }
                                          },
                                          properties: [{
                                              type: 'Property',
                                              start: 45,
                                              end: 86,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 45
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 86
                                                  }
                                              },
                                              method: true,
                                              shorthand: false,
                                              computed: false,
                                              key: {
                                                  type: 'Identifier',
                                                  start: 45,
                                                  end: 51,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 45
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 51
                                                      }
                                                  },
                                                  name: 'method'
                                              },
                                              kind: 'init',
                                              value: {
                                                  type: 'FunctionExpression',
                                                  start: 51,
                                                  end: 86,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 51
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 86
                                                      }
                                                  },
                                                  id: null,
                                                  generator: false,
                                                  expression: false,
                                                  async: false,
                                                  params: [],
                                                  body: {
                                                      type: 'BlockStatement',
                                                      start: 54,
                                                      end: 86,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 54
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 86
                                                          }
                                                      },
                                                      body: [{
                                                              type: 'VariableDeclaration',
                                                              start: 56,
                                                              end: 70,
                                                              loc: {
                                                                  start: {
                                                                      line: 1,
                                                                      column: 56
                                                                  },
                                                                  end: {
                                                                      line: 1,
                                                                      column: 70
                                                                  }
                                                              },
                                                              declarations: [{
                                                                  type: 'VariableDeclarator',
                                                                  start: 60,
                                                                  end: 69,
                                                                  loc: {
                                                                      start: {
                                                                          line: 1,
                                                                          column: 60
                                                                      },
                                                                      end: {
                                                                          line: 1,
                                                                          column: 69
                                                                      }
                                                                  },
                                                                  id: {
                                                                      type: 'Identifier',
                                                                      start: 60,
                                                                      end: 65,
                                                                      loc: {
                                                                          start: {
                                                                              line: 1,
                                                                              column: 60
                                                                          },
                                                                          end: {
                                                                              line: 1,
                                                                              column: 65
                                                                          }
                                                                      },
                                                                      name: 'await'
                                                                  },
                                                                  init: {
                                                                      type: 'Literal',
                                                                      start: 68,
                                                                      end: 69,
                                                                      loc: {
                                                                          start: {
                                                                              line: 1,
                                                                              column: 68
                                                                          },
                                                                          end: {
                                                                              line: 1,
                                                                              column: 69
                                                                          }
                                                                      },
                                                                      value: 1,
                                                                      raw: '1'
                                                                  }
                                                              }],
                                                              kind: 'var'
                                                          },
                                                          {
                                                              type: 'ReturnStatement',
                                                              start: 71,
                                                              end: 84,
                                                              loc: {
                                                                  start: {
                                                                      line: 1,
                                                                      column: 71
                                                                  },
                                                                  end: {
                                                                      line: 1,
                                                                      column: 84
                                                                  }
                                                              },
                                                              argument: {
                                                                  type: 'Identifier',
                                                                  start: 78,
                                                                  end: 83,
                                                                  loc: {
                                                                      start: {
                                                                          line: 1,
                                                                          column: 78
                                                                      },
                                                                      end: {
                                                                          line: 1,
                                                                          column: 83
                                                                      }
                                                                  },
                                                                  name: 'await'
                                                              }
                                                          }
                                                      ]
                                                  }
                                              }
                                          }]
                                      }
                                  }],
                                  kind: 'var'
                              }]
                          }
                      }
                  }],
                  kind: 'var'
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; var f = function() { var O = { *method() { var await = 1; return await; } }; }`, {
      source: '"use strict"; var f = function() { var O = { *method() { var await = 1; return await; } }; }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 92,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 92
              }
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'VariableDeclaration',
                  start: 14,
                  end: 92,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 92
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 18,
                      end: 92,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 92
                          }
                      },
                      id: {
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
                          name: 'f'
                      },
                      init: {
                          type: 'FunctionExpression',
                          start: 22,
                          end: 92,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 92
                              }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              start: 33,
                              end: 92,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 33
                                  },
                                  end: {
                                      line: 1,
                                      column: 92
                                  }
                              },
                              body: [{
                                  type: 'VariableDeclaration',
                                  start: 35,
                                  end: 90,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 35
                                      },
                                      end: {
                                          line: 1,
                                          column: 90
                                      }
                                  },
                                  declarations: [{
                                      type: 'VariableDeclarator',
                                      start: 39,
                                      end: 89,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 39
                                          },
                                          end: {
                                              line: 1,
                                              column: 89
                                          }
                                      },
                                      id: {
                                          type: 'Identifier',
                                          start: 39,
                                          end: 40,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 39
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 40
                                              }
                                          },
                                          name: 'O'
                                      },
                                      init: {
                                          type: 'ObjectExpression',
                                          start: 43,
                                          end: 89,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 43
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 89
                                              }
                                          },
                                          properties: [{
                                              type: 'Property',
                                              start: 45,
                                              end: 87,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 45
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 87
                                                  }
                                              },
                                              method: true,
                                              shorthand: false,
                                              computed: false,
                                              key: {
                                                  type: 'Identifier',
                                                  start: 46,
                                                  end: 52,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 46
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 52
                                                      }
                                                  },
                                                  name: 'method'
                                              },
                                              kind: 'init',
                                              value: {
                                                  type: 'FunctionExpression',
                                                  start: 52,
                                                  end: 87,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 52
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 87
                                                      }
                                                  },
                                                  id: null,
                                                  generator: true,
                                                  expression: false,
                                                  async: false,
                                                  params: [],
                                                  body: {
                                                      type: 'BlockStatement',
                                                      start: 55,
                                                      end: 87,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 55
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 87
                                                          }
                                                      },
                                                      body: [{
                                                              type: 'VariableDeclaration',
                                                              start: 57,
                                                              end: 71,
                                                              loc: {
                                                                  start: {
                                                                      line: 1,
                                                                      column: 57
                                                                  },
                                                                  end: {
                                                                      line: 1,
                                                                      column: 71
                                                                  }
                                                              },
                                                              declarations: [{
                                                                  type: 'VariableDeclarator',
                                                                  start: 61,
                                                                  end: 70,
                                                                  loc: {
                                                                      start: {
                                                                          line: 1,
                                                                          column: 61
                                                                      },
                                                                      end: {
                                                                          line: 1,
                                                                          column: 70
                                                                      }
                                                                  },
                                                                  id: {
                                                                      type: 'Identifier',
                                                                      start: 61,
                                                                      end: 66,
                                                                      loc: {
                                                                          start: {
                                                                              line: 1,
                                                                              column: 61
                                                                          },
                                                                          end: {
                                                                              line: 1,
                                                                              column: 66
                                                                          }
                                                                      },
                                                                      name: 'await'
                                                                  },
                                                                  init: {
                                                                      type: 'Literal',
                                                                      start: 69,
                                                                      end: 70,
                                                                      loc: {
                                                                          start: {
                                                                              line: 1,
                                                                              column: 69
                                                                          },
                                                                          end: {
                                                                              line: 1,
                                                                              column: 70
                                                                          }
                                                                      },
                                                                      value: 1,
                                                                      raw: '1'
                                                                  }
                                                              }],
                                                              kind: 'var'
                                                          },
                                                          {
                                                              type: 'ReturnStatement',
                                                              start: 72,
                                                              end: 85,
                                                              loc: {
                                                                  start: {
                                                                      line: 1,
                                                                      column: 72
                                                                  },
                                                                  end: {
                                                                      line: 1,
                                                                      column: 85
                                                                  }
                                                              },
                                                              argument: {
                                                                  type: 'Identifier',
                                                                  start: 79,
                                                                  end: 84,
                                                                  loc: {
                                                                      start: {
                                                                          line: 1,
                                                                          column: 79
                                                                      },
                                                                      end: {
                                                                          line: 1,
                                                                          column: 84
                                                                      }
                                                                  },
                                                                  name: 'await'
                                                              }
                                                          }
                                                      ]
                                                  }
                                              }
                                          }]
                                      }
                                  }],
                                  kind: 'var'
                              }]
                          }
                      }
                  }],
                  kind: 'var'
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; var f = () => { var async = async => async; return async(); }`, {
      source: '"use strict"; var f = () => { var async = async => async; return async(); }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 75,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 75
              }
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'VariableDeclaration',
                  start: 14,
                  end: 75,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 75
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 18,
                      end: 75,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 75
                          }
                      },
                      id: {
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
                          name: 'f'
                      },
                      init: {
                          type: 'ArrowFunctionExpression',
                          start: 22,
                          end: 75,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 75
                              }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              start: 28,
                              end: 75,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 28
                                  },
                                  end: {
                                      line: 1,
                                      column: 75
                                  }
                              },
                              body: [{
                                      type: 'VariableDeclaration',
                                      start: 30,
                                      end: 57,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 30
                                          },
                                          end: {
                                              line: 1,
                                              column: 57
                                          }
                                      },
                                      declarations: [{
                                          type: 'VariableDeclarator',
                                          start: 34,
                                          end: 56,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 34
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 56
                                              }
                                          },
                                          id: {
                                              type: 'Identifier',
                                              start: 34,
                                              end: 39,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 34
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 39
                                                  }
                                              },
                                              name: 'async'
                                          },
                                          init: {
                                              type: 'ArrowFunctionExpression',
                                              start: 42,
                                              end: 56,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 42
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 56
                                                  }
                                              },
                                              id: null,
                                              generator: false,
                                              expression: true,
                                              async: false,
                                              params: [{
                                                  type: 'Identifier',
                                                  start: 42,
                                                  end: 47,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 42
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 47
                                                      }
                                                  },
                                                  name: 'async'
                                              }],
                                              body: {
                                                  type: 'Identifier',
                                                  start: 51,
                                                  end: 56,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 51
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 56
                                                      }
                                                  },
                                                  name: 'async'
                                              }
                                          }
                                      }],
                                      kind: 'var'
                                  },
                                  {
                                      type: 'ReturnStatement',
                                      start: 58,
                                      end: 73,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 58
                                          },
                                          end: {
                                              line: 1,
                                              column: 73
                                          }
                                      },
                                      argument: {
                                          type: 'CallExpression',
                                          start: 65,
                                          end: 72,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 65
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 72
                                              }
                                          },
                                          callee: {
                                              type: 'Identifier',
                                              start: 65,
                                              end: 70,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 65
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 70
                                                  }
                                              },
                                              name: 'async'
                                          },
                                          arguments: []
                                      }
                                  }
                              ]
                          }
                      }
                  }],
                  kind: 'var'
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`"use strict"; var f = () => { function foo(await) { return await; } }`, {
      source: '"use strict"; var f = () => { function foo(await) { return await; } }',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 69,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 69
              }
          },
          body: [{
                  type: 'ExpressionStatement',
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
                      value: 'use strict',
                      raw: '"use strict"'
                  },
                  directive: 'use strict'
              },
              {
                  type: 'VariableDeclaration',
                  start: 14,
                  end: 69,
                  loc: {
                      start: {
                          line: 1,
                          column: 14
                      },
                      end: {
                          line: 1,
                          column: 69
                      }
                  },
                  declarations: [{
                      type: 'VariableDeclarator',
                      start: 18,
                      end: 69,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 69
                          }
                      },
                      id: {
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
                          name: 'f'
                      },
                      init: {
                          type: 'ArrowFunctionExpression',
                          start: 22,
                          end: 69,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 22
                              },
                              end: {
                                  line: 1,
                                  column: 69
                              }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              start: 28,
                              end: 69,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 28
                                  },
                                  end: {
                                      line: 1,
                                      column: 69
                                  }
                              },
                              body: [{
                                  type: 'FunctionDeclaration',
                                  start: 30,
                                  end: 67,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 30
                                      },
                                      end: {
                                          line: 1,
                                          column: 67
                                      }
                                  },
                                  id: {
                                      type: 'Identifier',
                                      start: 39,
                                      end: 42,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 39
                                          },
                                          end: {
                                              line: 1,
                                              column: 42
                                          }
                                      },
                                      name: 'foo'
                                  },
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [{
                                      type: 'Identifier',
                                      start: 43,
                                      end: 48,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 43
                                          },
                                          end: {
                                              line: 1,
                                              column: 48
                                          }
                                      },
                                      name: 'await'
                                  }],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 50,
                                      end: 67,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 50
                                          },
                                          end: {
                                              line: 1,
                                              column: 67
                                          }
                                      },
                                      body: [{
                                          type: 'ReturnStatement',
                                          start: 52,
                                          end: 65,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 52
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 65
                                              }
                                          },
                                          argument: {
                                              type: 'Identifier',
                                              start: 59,
                                              end: 64,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 59
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 64
                                                  }
                                              },
                                              name: 'await'
                                          }
                                      }]
                                  }
                              }]
                          }
                      }
                  }],
                  kind: 'var'
              }
          ],
          sourceType: 'script'
      }
  });

  pass(`var O = { *method() { function async() {} return async(); }}`, {
      source: 'var O = { *method() { function async() {} return async(); }}',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
          start: 0,
          end: 60,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 60
              }
          },
          body: [{
              type: 'VariableDeclaration',
              start: 0,
              end: 60,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 60
                  }
              },
              declarations: [{
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 60,
                  loc: {
                      start: {
                          line: 1,
                          column: 4
                      },
                      end: {
                          line: 1,
                          column: 60
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
                      name: 'O'
                  },
                  init: {
                      type: 'ObjectExpression',
                      start: 8,
                      end: 60,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 60
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 10,
                          end: 59,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 59
                              }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 11,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              name: 'method'
                          },
                          kind: 'init',
                          value: {
                              type: 'FunctionExpression',
                              start: 17,
                              end: 59,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 17
                                  },
                                  end: {
                                      line: 1,
                                      column: 59
                                  }
                              },
                              id: null,
                              generator: true,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  start: 20,
                                  end: 59,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 20
                                      },
                                      end: {
                                          line: 1,
                                          column: 59
                                      }
                                  },
                                  body: [{
                                          type: 'FunctionDeclaration',
                                          start: 22,
                                          end: 41,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 22
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 41
                                              }
                                          },
                                          id: {
                                              type: 'Identifier',
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
                                              },
                                              name: 'async'
                                          },
                                          generator: false,
                                          expression: false,
                                          async: false,
                                          params: [],
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
                                      },
                                      {
                                          type: 'ReturnStatement',
                                          start: 42,
                                          end: 57,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 42
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 57
                                              }
                                          },
                                          argument: {
                                              type: 'CallExpression',
                                              start: 49,
                                              end: 56,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 49
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 56
                                                  }
                                              },
                                              callee: {
                                                  type: 'Identifier',
                                                  start: 49,
                                                  end: 54,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 49
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 54
                                                      }
                                                  },
                                                  name: 'async'
                                              },
                                              arguments: []
                                          }
                                      }
                                  ]
                              }
                          }
                      }]
                  }
              }],
              kind: 'var'
          }],
          sourceType: 'script'
      }
  });

  pass(`var O = { *method() { var f = () => { var await = 1; return await; } }}`, {
      source: 'var O = { *method() { var f = () => { var await = 1; return await; } }}',
      ranges: true,
      raw: true,
      loc: true,
      expected: {
          type: 'Program',
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
          },
          body: [{
              type: 'VariableDeclaration',
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
              },
              declarations: [{
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 71,
                  loc: {
                      start: {
                          line: 1,
                          column: 4
                      },
                      end: {
                          line: 1,
                          column: 71
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
                      name: 'O'
                  },
                  init: {
                      type: 'ObjectExpression',
                      start: 8,
                      end: 71,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 71
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 10,
                          end: 70,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 70
                              }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 11,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              name: 'method'
                          },
                          kind: 'init',
                          value: {
                              type: 'FunctionExpression',
                              start: 17,
                              end: 70,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 17
                                  },
                                  end: {
                                      line: 1,
                                      column: 70
                                  }
                              },
                              id: null,
                              generator: true,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  start: 20,
                                  end: 70,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 20
                                      },
                                      end: {
                                          line: 1,
                                          column: 70
                                      }
                                  },
                                  body: [{
                                      type: 'VariableDeclaration',
                                      start: 22,
                                      end: 68,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 22
                                          },
                                          end: {
                                              line: 1,
                                              column: 68
                                          }
                                      },
                                      declarations: [{
                                          type: 'VariableDeclarator',
                                          start: 26,
                                          end: 68,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 26
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 68
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
                                              name: 'f'
                                          },
                                          init: {
                                              type: 'ArrowFunctionExpression',
                                              start: 30,
                                              end: 68,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 30
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 68
                                                  }
                                              },
                                              id: null,
                                              generator: false,
                                              expression: false,
                                              async: false,
                                              params: [],
                                              body: {
                                                  type: 'BlockStatement',
                                                  start: 36,
                                                  end: 68,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 36
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 68
                                                      }
                                                  },
                                                  body: [{
                                                          type: 'VariableDeclaration',
                                                          start: 38,
                                                          end: 52,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 38
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 52
                                                              }
                                                          },
                                                          declarations: [{
                                                              type: 'VariableDeclarator',
                                                              start: 42,
                                                              end: 51,
                                                              loc: {
                                                                  start: {
                                                                      line: 1,
                                                                      column: 42
                                                                  },
                                                                  end: {
                                                                      line: 1,
                                                                      column: 51
                                                                  }
                                                              },
                                                              id: {
                                                                  type: 'Identifier',
                                                                  start: 42,
                                                                  end: 47,
                                                                  loc: {
                                                                      start: {
                                                                          line: 1,
                                                                          column: 42
                                                                      },
                                                                      end: {
                                                                          line: 1,
                                                                          column: 47
                                                                      }
                                                                  },
                                                                  name: 'await'
                                                              },
                                                              init: {
                                                                  type: 'Literal',
                                                                  start: 50,
                                                                  end: 51,
                                                                  loc: {
                                                                      start: {
                                                                          line: 1,
                                                                          column: 50
                                                                      },
                                                                      end: {
                                                                          line: 1,
                                                                          column: 51
                                                                      }
                                                                  },
                                                                  value: 1,
                                                                  raw: '1'
                                                              }
                                                          }],
                                                          kind: 'var'
                                                      },
                                                      {
                                                          type: 'ReturnStatement',
                                                          start: 53,
                                                          end: 66,
                                                          loc: {
                                                              start: {
                                                                  line: 1,
                                                                  column: 53
                                                              },
                                                              end: {
                                                                  line: 1,
                                                                  column: 66
                                                              }
                                                          },
                                                          argument: {
                                                              type: 'Identifier',
                                                              start: 60,
                                                              end: 65,
                                                              loc: {
                                                                  start: {
                                                                      line: 1,
                                                                      column: 60
                                                                  },
                                                                  end: {
                                                                      line: 1,
                                                                      column: 65
                                                                  }
                                                              },
                                                              name: 'await'
                                                          }
                                                      }
                                                  ]
                                              }
                                          }
                                      }],
                                      kind: 'var'
                                  }]
                              }
                          }
                      }]
                  }
              }],
              kind: 'var'
          }],
          sourceType: 'script'
      }
  });

  pass(`export default async function() { await 1; }`, {
    source: 'export default async function() { await 1; }',
    ranges: true,
    raw: true,
    loc: true,
    module: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ExportDefaultDeclaration',
              declaration: {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      body: [
                          {
                              type: 'ExpressionStatement',
                              expression: {
                                  type: 'AwaitExpression',
                                  argument: {
                                      type: 'Literal',
                                      value: 1,
                                      start: 40,
                                      end: 41,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 40
                                          },
                                          end: {
                                              line: 1,
                                              column: 41
                                          }
                                      },
                                      raw: '1'
                                  },
                                  start: 34,
                                  end: 41,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 34
                                      },
                                      end: {
                                          line: 1,
                                          column: 41
                                      }
                                  }
                              },
                              start: 34,
                              end: 42,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 34
                                  },
                                  end: {
                                      line: 1,
                                      column: 42
                                  }
                              }
                          }
                      ],
                      start: 32,
                      end: 44,
                      loc: {
                          start: {
                              line: 1,
                              column: 32
                          },
                          end: {
                              line: 1,
                              column: 44
                          }
                      }
                  },
                  async: true,
                  generator: false,
                  expression: false,
                  id: null,
                  start: 15,
                  end: 44,
                  loc: {
                      start: {
                          line: 1,
                          column: 15
                      },
                      end: {
                          line: 1,
                          column: 44
                      }
                  }
              },
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
      sourceType: 'module',
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

  pass(`export default async function async() { await 1; }`, {
    source: 'export default async function async() { await 1; }',
    ranges: true,
    raw: true,
    loc: true,
    module: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ExportDefaultDeclaration',
              declaration: {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      body: [
                          {
                              type: 'ExpressionStatement',
                              expression: {
                                  type: 'AwaitExpression',
                                  argument: {
                                      type: 'Literal',
                                      value: 1,
                                      start: 46,
                                      end: 47,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 46
                                          },
                                          end: {
                                              line: 1,
                                              column: 47
                                          }
                                      },
                                      raw: '1'
                                  },
                                  start: 40,
                                  end: 47,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 40
                                      },
                                      end: {
                                          line: 1,
                                          column: 47
                                      }
                                  }
                              },
                              start: 40,
                              end: 48,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 40
                                  },
                                  end: {
                                      line: 1,
                                      column: 48
                                  }
                              }
                          }
                      ],
                      start: 38,
                      end: 50,
                      loc: {
                          start: {
                              line: 1,
                              column: 38
                          },
                          end: {
                              line: 1,
                              column: 50
                          }
                      }
                  },
                  async: true,
                  generator: false,
                  expression: false,
                  id: {
                      type: 'Identifier',
                      name: 'async',
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
                  },
                  start: 15,
                  end: 50,
                  loc: {
                      start: {
                          line: 1,
                          column: 15
                      },
                      end: {
                          line: 1,
                          column: 50
                      }
                  }
              },
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
              }
          }
      ],
      sourceType: 'module',
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
      }
  }
  });

  pass(`export async function async() { await 1; }`, {
    source: 'export async function async() { await 1; }',
    ranges: true,
    raw: true,
    loc: true,
    module: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'ExportNamedDeclaration',
              source: null,
              specifiers: [],
              declaration: {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      body: [
                          {
                              type: 'ExpressionStatement',
                              expression: {
                                  type: 'AwaitExpression',
                                  argument: {
                                      type: 'Literal',
                                      value: 1,
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
                                      },
                                      raw: '1'
                                  },
                                  start: 32,
                                  end: 39,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 32
                                      },
                                      end: {
                                          line: 1,
                                          column: 39
                                      }
                                  }
                              },
                              start: 32,
                              end: 40,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 32
                                  },
                                  end: {
                                      line: 1,
                                      column: 40
                                  }
                              }
                          }
                      ],
                      start: 30,
                      end: 42,
                      loc: {
                          start: {
                              line: 1,
                              column: 30
                          },
                          end: {
                              line: 1,
                              column: 42
                          }
                      }
                  },
                  async: true,
                  generator: false,
                  expression: false,
                  id: {
                      type: 'Identifier',
                      name: 'async',
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
                  start: 7,
                  end: 42,
                  loc: {
                      start: {
                          line: 1,
                          column: 7
                      },
                      end: {
                          line: 1,
                          column: 42
                      }
                  }
              },
              start: 0,
              end: 42,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 42
                  }
              }
          }
      ],
      sourceType: 'module',
      start: 0,
      end: 42,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 1,
              column: 42
          }
      }
  }
  });

});