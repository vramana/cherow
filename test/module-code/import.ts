import { pass, fail } from '../utils';

describe('Module code - Import', () => {

  fail(`import { for } from "iteration"`, {
  source: `import { for } from "iteration"`,
  module: true
});

  fail(`import {b,,} from "a"`, {
          source: `import {b,,} from "a"`,
          module: true
      });

  fail(`import { class } from "foo"`, {
          source: `import { class } from "foo"`,
          module: true
      });

  fail(`import * as class from "foo"`, {
          source: `import * as class from "foo"`,
          module: true
      });

  fail(`if (1) import "foo";`, {
          source: `if (1) import "foo";`,
          module: true
      });

  fail(`import {b as,} from "a"`, {
          source: `import {b as,} from "a"`,
          module: true
      });

  fail(`import / as a from  "a"`, {
          source: `import / as a from  "a"`,
          module: true
      });

  fail(`import a, b from "a"`, {
          source: `import a, b from "a"`,
          module: true
      });

  fail(`import * as foo, {bar} from "foo";`, {
          source: `import * as foo, {bar} from "foo";`,
          module: true
      });

  fail(`import * from "foo"`, {
          source: `import * from "foo"`,
          module: true
      });

  fail(`import {a \\u0061s b} from "./foo.js";`, {
          source: `import {a \\u0061s b} from "./foo.js";`,
      });

  fail(`import foo`, {
          source: `import foo`,
      });

  fail(`import { x as eval } from "./foo.js";`, {
          source: `import { x as eval } from "./foo.js";`,
      });

  fail(`import {bar}, {foo} from "foo";`, {
          source: `import {bar}, {foo} from "foo";`,
      });

  fail(`import {foo,baz,,} from 'toast';`, {
          source: `import {foo,baz,,} from 'toast';`,
      });

  fail(`import {var} from "foo"`, {
          source: `import {var} from "foo"`,
      });

  fail(`import {default as foo}`, {
          source: `import {default as foo}`,
      });

  fail(`import {foo,baz,,} from 'toast';`, {
          source: `import {foo,baz,,} from 'toast';`,
      });

  fail(`import {foo,,baz} from 'toast';`, {
          source: `import {foo,,baz} from 'toast';`,
      });

  fail(`import * from "foo"`, {
          source: `import * from "foo"`,
      });

  fail(`import {bar}, foo from "foo"`, {
          source: `import {bar}, foo from "foo"`,
      });

  fail(`import foo`, {
          source: `import foo`,
      });

  fail(`import default from "foo"`, {
          source: `import default from "foo"`,
      });

  fail(`import { foo, bar }`, {
          source: `import { foo, bar }`,
      });

  fail(`export default = 42`, {
          source: `export default = 42`,
      });

  fail(`export * +`, {
          source: `export * +`,
      });

  fail(`export *`, {
          source: `export *`,
      });

  fail(`export var await;`, {
          source: `export var await;`,
      });

  fail(`import {`, {
    source: `import {`,
    module: true
});
  fail(`import { foo as bar `, {
    source: `import { foo as bar `,
    module: true
});
  fail(`import { foo bar } from "module"`, {
    source: `import { foo bar } from "module"`,
    module: true
});
  fail(`import { foo, , } from "module";`, {
    source: `import { foo, , } from "module";`,
    module: true
});

  fail(`import {a \\u0061s b} from "./escaped-as-import-specifier.js`, {
          source: `import {a \\u0061s b} from "./escaped-as-import-specifier.js`,
          module: true
      });

  fail(`import a, {b as a} from "module";`, {
          source: `import a, {b as a} from "module";`,
          module: true
      });

  fail(`import { arguments } from './foo';`, {
        source: `import { arguments } from './foo';`,
        module: true
     });

  fail(`import a, {b as a} from "module";`, {
        source: `import a, {b as a} from "module";`,
        module: true
    });

  fail(`import {} \\u0066rom "./escaped-from.js";`, {
        source: `import {} \\u0066rom "./escaped-from.js";`,
        module: true
    });

  fail(`export {a \\u0061s b} from "./escaped-as-export-specifier.js";`, {
        source: `export {a \\u0061s b} from "./escaped-as-export-specifier.js";`,
        module: true
    });

  fail(`import {a \\u0061s b} from "./escaped-as-import-specifier.js";`, {
        source: `import {a \\u0061s b} from "./escaped-as-import-specifier.js";`,
        module: true
    });

  fail(`import* \\u0061s self from "./escaped-as-namespace-import.js";`, {
        source: `import* \\u0061s self from "./escaped-as-namespace-import.js";`,
        module: true
    });

  fail(`import {a, a} from "module";`, {
          source: `import {a, a} from "module";`,
          module: true
      });

  fail(`import {b as a, c as a} from "module";`, {
          source: `import {b as a, c as a} from "module";`,
          module: true
      });

  fail(`import a, * as a from "module";`, {
          source: `import a, * as a from "module";`,
          module: true
      });

  fail(`import {bar, bar} from "foo";`, {
          source: `import {bar, bar} from "foo";`,
          module: true
      });

  fail(`import * from "foo"`, {
          source: `import * from "foo"`,
          module: true
      });

  fail(`import {}`, {
          source: `import {}`,
          module: true
      });

  fail(`import default from "foo"`, {
          source: `import default from "foo"`,
          module: true
      });

  fail(`import foo, from "bar";`, {
        source: `import foo, from "bar";`,
        module: true
      });

  fail(`import { null } from "null"`, {
        source: `import { null } from "null"`,
        module: true
    });

  fail(`import * as foo, {bar} from "foo";`, {
      source: `import * as foo, {bar} from "foo";`,
      module: true
  });

  fail(`import {bar}, {foo} from "foo";`, {
    source: `import {bar}, {foo} from "foo";`,
    module: true
});

  fail(`import { for } from "iteration"`, {
  source: `import { for } from "iteration"`,
  module: true
});

  fail(`import {b,,} from "a"`, {
          source: `import {b,,} from "a"`,
          module: true
      });

  fail(`import { class } from "foo"`, {
          source: `import { class } from "foo"`,
          module: true
      });

  fail(`import * as class from "foo"`, {
          source: `import * as class from "foo"`,
          module: true
      });

  fail(`if (1) import "foo";`, {
          source: `if (1) import "foo";`,
          module: true
      });

  fail(`import {b as,} from "a"`, {
          source: `import {b as,} from "a"`,
          module: true
      });

  fail(`import / as a from  "a"`, {
          source: `import / as a from  "a"`,
          module: true
      });

  fail(`import a, b from "a"`, {
          source: `import a, b from "a"`,
          module: true
      });

  fail(`import * as foo, {bar} from "foo";`, {
          source: `import * as foo, {bar} from "foo";`,
          module: true
      });

  fail(`import * from "foo"`, {
          source: `import * from "foo"`,
          module: true
      });

  fail(`import {a \\u0061s b} from "./foo.js";`, {
          source: `import {a \\u0061s b} from "./foo.js";`,
      });

  fail(`import foo`, {
          source: `import foo`,
      });

  fail(`import { x as eval } from "./foo.js";`, {
          source: `import { x as eval } from "./foo.js";`,
      });

  fail(`import {bar}, {foo} from "foo";`, {
          source: `import {bar}, {foo} from "foo";`,
      });

  fail(`import {foo,baz,,} from 'toast';`, {
          source: `import {foo,baz,,} from 'toast';`,
      });

  fail(`import {var} from "foo"`, {
          source: `import {var} from "foo"`,
      });

  fail(`import {default as foo}`, {
          source: `import {default as foo}`,
      });

  fail(`import {foo,baz,,} from 'toast';`, {
          source: `import {foo,baz,,} from 'toast';`,
      });

  fail(`import {foo,,baz} from 'toast';`, {
          source: `import {foo,,baz} from 'toast';`,
      });

  fail(`import * from "foo"`, {
          source: `import * from "foo"`,
      });

  fail(`import {bar}, foo from "foo"`, {
          source: `import {bar}, foo from "foo"`,
      });

  fail(`import foo`, {
          source: `import foo`,
      });

  fail(`import default from "foo"`, {
          source: `import default from "foo"`,
      });

  fail(`import { foo, bar }`, {
          source: `import { foo, bar }`,
      });

  fail(`export default = 42`, {
          source: `export default = 42`,
      });

  fail(`export * +`, {
          source: `export * +`,
      });

  fail(`export *`, {
          source: `export *`,
      });

  fail(`export var await;`, {
          source: `export var await;`,
      });

  pass(`import * as m from './resources/m3.js';`, {
          source: `import * as m from './resources/m3.js';`,
          loc: true,
          ranges: true,
          module: true,
          raw: true,
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
            body: [
              {
                type: 'ImportDeclaration',
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
                specifiers: [
                  {
                    type: 'ImportNamespaceSpecifier',
                    start: 7,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    },
                    local: {
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
                      name: 'm'
                    }
                  }
                ],
                source: {
                  type: 'Literal',
                  start: 19,
                  end: 38,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 38
                    }
                  },
                  value: './resources/m3.js',
                  raw: '\'./resources/m3.js\''
                }
              }
            ],
            sourceType: 'module'
          }
      });

  pass(`import $ from "jquery"`, {
          source: `import $ from "jquery"`,
          loc: true,
          ranges: true,
          module: true,
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
            body: [
              {
                type: 'ImportDeclaration',
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
                specifiers: [
                  {
                    type: 'ImportDefaultSpecifier',
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
                    local: {
                      type: 'Identifier',
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
                      name: '$'
                    }
                  }
                ],
                source: {
                  type: 'Literal',
                  start: 14,
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
                  },
                  value: 'jquery',
                  raw: '"jquery"'
                }
              }
            ],
            sourceType: 'module'
          }
      });

  pass(`import "jquery"`, {
          source: `import "jquery"`,
          loc: true,
          ranges: true,
          module: true,
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
            body: [
              {
                type: 'ImportDeclaration',
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
                specifiers: [],
                source: {
                  type: 'Literal',
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
                  },
                  value: 'jquery',
                  raw: '"jquery"'
                }
              }
            ],
            sourceType: 'module'
          }
      });

  pass(`import {foo,} from "bar"`, {
          source: `import {foo,} from "bar"`,
          loc: true,
          ranges: true,
          module: true,
          raw: true,
          expected: {
            type: 'Program',
            body: [
                {
                    type: 'ImportDeclaration',
                    specifiers: [
                        {
                            type: 'ImportSpecifier',
                            local: {
                                type: 'Identifier',
                                name: 'foo',
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
                                }
                            },
                            imported: {
                                type: 'Identifier',
                                name: 'foo',
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
                                }
                            },
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
                            }
                        }
                    ],
                    source: {
                        type: 'Literal',
                        value: 'bar',
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
                        raw: '"bar"'
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
            sourceType: 'module',
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

  pass(`import foo, {bar} from "foo";`, {
          source: `import foo, {bar} from "foo";`,
          loc: true,
          ranges: true,
          module: true,
          raw: true,
          expected: {
            type: 'Program',
            start: 0,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 29
              }
            },
            body: [
              {
                type: 'ImportDeclaration',
                start: 0,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                },
                specifiers: [
                  {
                    type: 'ImportDefaultSpecifier',
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
                    },
                    local: {
                      type: 'Identifier',
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
                      },
                      name: 'foo'
                    }
                  },
                  {
                    type: 'ImportSpecifier',
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
                    },
                    imported: {
                      type: 'Identifier',
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
                      },
                      name: 'bar'
                    },
                    local: {
                      type: 'Identifier',
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
                      },
                      name: 'bar'
                    }
                  }
                ],
                source: {
                  type: 'Literal',
                  start: 23,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  },
                  value: 'foo',
                  raw: '"foo"'
                }
              }
            ],
            sourceType: 'module'
          }
      });

  pass(`import {} from "foo";`, {
        source: `import {} from "foo";`,
        ranges: true,
        module: true,
        loc: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ImportDeclaration',
                  specifiers: [],
                  source: {
                      type: 'Literal',
                      value: 'foo',
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
                      },
                      raw: '"foo"'
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
          sourceType: 'module',
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

  pass(`import { null as nil } from "bar"`, {
        source: `import { null as nil } from "bar"`,
        ranges: true,
        loc: true,
        module: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ImportDeclaration',
                  specifiers: [
                      {
                          type: 'ImportSpecifier',
                          local: {
                              type: 'Identifier',
                              name: 'nil',
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
                          imported: {
                              type: 'Identifier',
                              name: 'null',
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
                          start: 9,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          }
                      }
                  ],
                  source: {
                      type: 'Literal',
                      value: 'bar',
                      start: 28,
                      end: 33,
                      loc: {
                          start: {
                              line: 1,
                              column: 28
                          },
                          end: {
                              line: 1,
                              column: 33
                          }
                      },
                      raw: '"bar"'
                  },
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
                  }
              }
          ],
          sourceType: 'module',
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
          }
      }
      });

  pass(`import a, * as b from "a"`, {
          source: `import a, * as b from "a"`,
          ranges: true,
          module: true,
          raw: true,
          expected: {
            type: 'Program',
            start: 0,
            end: 25,
            body: [{
                type: 'ImportDeclaration',
                start: 0,
                end: 25,
                specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        start: 7,
                        end: 8,
                        local: {
                            type: 'Identifier',
                            start: 7,
                            end: 8,
                            name: 'a'
                        }
                    },
                    {
                        type: 'ImportNamespaceSpecifier',
                        start: 10,
                        end: 16,
                        local: {
                            type: 'Identifier',
                            start: 15,
                            end: 16,
                            name: 'b'
                        }
                    }
                ],
                source: {
                    type: 'Literal',
                    start: 22,
                    end: 25,
                    value: 'a',
                    raw: '"a"'
                }
            }],
            sourceType: 'module'
        }
      });

  pass(`import a, {function as c} from "c"`, {
          source: `import a, {function as c} from "c"`,
          ranges: true,
          module: true,
          raw: true,
          expected: {
            type: 'Program',
            start: 0,
            end: 34,
            body: [{
                type: 'ImportDeclaration',
                start: 0,
                end: 34,
                specifiers: [{
                        type: 'ImportDefaultSpecifier',
                        start: 7,
                        end: 8,
                        local: {
                            type: 'Identifier',
                            start: 7,
                            end: 8,
                            name: 'a'
                        }
                    },
                    {
                        type: 'ImportSpecifier',
                        start: 11,
                        end: 24,
                        imported: {
                            type: 'Identifier',
                            start: 11,
                            end: 19,
                            name: 'function'
                        },
                        local: {
                            type: 'Identifier',
                            start: 23,
                            end: 24,
                            name: 'c'
                        }
                    }
                ],
                source: {
                    type: 'Literal',
                    start: 31,
                    end: 34,
                    value: 'c',
                    raw: '"c"'
                }
            }],
            sourceType: 'module'
        }
      });

  pass(`import {bar, baz,} from "foo";`, {
          source: `import {bar, baz,} from "foo";`,
          ranges: true,
          module: true,
          loc: true,
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
      type: 'ImportDeclaration',
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
      specifiers: [
        {
          type: 'ImportSpecifier',
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
          imported: {
            type: 'Identifier',
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
            name: 'bar'
          },
          local: {
            type: 'Identifier',
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
            name: 'bar'
          }
        },
        {
          type: 'ImportSpecifier',
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
          },
          imported: {
            type: 'Identifier',
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
            },
            name: 'baz'
          },
          local: {
            type: 'Identifier',
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
            },
            name: 'baz'
          }
        }
      ],
      source: {
        type: 'Literal',
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
        value: 'foo',
        raw: '"foo"'
      }
    }
  ],
  sourceType: 'module'
}
    });

  pass(`import * as foo from "foo";`, {
          source: `import * as foo from "foo";`,
          ranges: true,
          loc: true,
          module: true,
          raw: true,
          expected: {
  type: 'Program',
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
  },
  body: [
    {
      type: 'ImportDeclaration',
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
      },
      specifiers: [
        {
          type: 'ImportNamespaceSpecifier',
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
          },
          local: {
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
          }
        }
      ],
      source: {
        type: 'Literal',
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
        value: 'foo',
        raw: '"foo"'
      }
    }
  ],
  sourceType: 'module'
}
    });
  });