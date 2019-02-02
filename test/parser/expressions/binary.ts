import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Binary', () => {});

pass('Expressions - Binary (pass)', [
  [
    'b && c == d',
    Context.OptionsRanges,
    {
      type: 'Program',
      start: 0,
      end: 11,
      body: [
        {
          type: 'ExpressionStatement',
          start: 0,
          end: 11,
          expression: {
            type: 'LogicalExpression',
            start: 0,
            end: 11,
            left: {
              type: 'Identifier',
              start: 0,
              end: 1,
              name: 'b'
            },
            operator: '&&',
            right: {
              type: 'BinaryExpression',
              start: 5,
              end: 11,
              left: {
                type: 'Identifier',
                start: 5,
                end: 6,
                name: 'c'
              },
              operator: '==',
              right: {
                type: 'Identifier',
                start: 10,
                end: 11,
                name: 'd'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'b && c == d',
    Context.OptionsRanges | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            left: {
              type: 'Identifier',
              name: 'b',
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
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'c',
                start: 5,
                end: 6,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 6
                  }
                }
              },
              right: {
                type: 'Identifier',
                name: 'd',
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
              operator: '==',
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
            },
            operator: '&&',
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
  [
    'a=b+=c-=d**=e*=f/=g%=h<<=i>>=j>>>=k&=l^=m|=n',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'AssignmentExpression',
              operator: '+=',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'AssignmentExpression',
                operator: '-=',
                left: {
                  type: 'Identifier',
                  name: 'c'
                },
                right: {
                  type: 'AssignmentExpression',
                  operator: '**=',
                  left: {
                    type: 'Identifier',
                    name: 'd'
                  },
                  right: {
                    type: 'AssignmentExpression',
                    operator: '*=',
                    left: {
                      type: 'Identifier',
                      name: 'e'
                    },
                    right: {
                      type: 'AssignmentExpression',
                      operator: '/=',
                      left: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      right: {
                        type: 'AssignmentExpression',
                        operator: '%=',
                        left: {
                          type: 'Identifier',
                          name: 'g'
                        },
                        right: {
                          type: 'AssignmentExpression',
                          operator: '<<=',
                          left: {
                            type: 'Identifier',
                            name: 'h'
                          },
                          right: {
                            type: 'AssignmentExpression',
                            operator: '>>=',
                            left: {
                              type: 'Identifier',
                              name: 'i'
                            },
                            right: {
                              type: 'AssignmentExpression',
                              operator: '>>>=',
                              left: {
                                type: 'Identifier',
                                name: 'j'
                              },
                              right: {
                                type: 'AssignmentExpression',
                                operator: '&=',
                                left: {
                                  type: 'Identifier',
                                  name: 'k'
                                },
                                right: {
                                  type: 'AssignmentExpression',
                                  operator: '^=',
                                  left: {
                                    type: 'Identifier',
                                    name: 'l'
                                  },
                                  right: {
                                    type: 'AssignmentExpression',
                                    operator: '|=',
                                    left: {
                                      type: 'Identifier',
                                      name: 'm'
                                    },
                                    right: {
                                      type: 'Identifier',
                                      name: 'n'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a|=b^=c&=d>>>=e>>=f<<=g%=h/=i*=j**=k-=l+=m=n',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '|=',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'AssignmentExpression',
              operator: '^=',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'AssignmentExpression',
                operator: '&=',
                left: {
                  type: 'Identifier',
                  name: 'c'
                },
                right: {
                  type: 'AssignmentExpression',
                  operator: '>>>=',
                  left: {
                    type: 'Identifier',
                    name: 'd'
                  },
                  right: {
                    type: 'AssignmentExpression',
                    operator: '>>=',
                    left: {
                      type: 'Identifier',
                      name: 'e'
                    },
                    right: {
                      type: 'AssignmentExpression',
                      operator: '<<=',
                      left: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      right: {
                        type: 'AssignmentExpression',
                        operator: '%=',
                        left: {
                          type: 'Identifier',
                          name: 'g'
                        },
                        right: {
                          type: 'AssignmentExpression',
                          operator: '/=',
                          left: {
                            type: 'Identifier',
                            name: 'h'
                          },
                          right: {
                            type: 'AssignmentExpression',
                            operator: '*=',
                            left: {
                              type: 'Identifier',
                              name: 'i'
                            },
                            right: {
                              type: 'AssignmentExpression',
                              operator: '**=',
                              left: {
                                type: 'Identifier',
                                name: 'j'
                              },
                              right: {
                                type: 'AssignmentExpression',
                                operator: '-=',
                                left: {
                                  type: 'Identifier',
                                  name: 'k'
                                },
                                right: {
                                  type: 'AssignmentExpression',
                                  operator: '+=',
                                  left: {
                                    type: 'Identifier',
                                    name: 'l'
                                  },
                                  right: {
                                    type: 'AssignmentExpression',
                                    operator: '=',
                                    left: {
                                      type: 'Identifier',
                                      name: 'm'
                                    },
                                    right: {
                                      type: 'Identifier',
                                      name: 'n'
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a || b || c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '||',
            left: {
              type: 'LogicalExpression',
              operator: '||',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a && b && c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '&&',
            left: {
              type: 'LogicalExpression',
              operator: '&&',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a && b || c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '||',
            left: {
              type: 'LogicalExpression',
              operator: '&&',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a || b && c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '||',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'LogicalExpression',
              operator: '&&',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a | b && c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '&&',
            left: {
              type: 'BinaryExpression',
              operator: '|',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a && b | c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '&&',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'BinaryExpression',
              operator: '|',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a ^ b | c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '|',
            left: {
              type: 'BinaryExpression',
              operator: '^',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a & b ^ c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '^',
            left: {
              type: 'BinaryExpression',
              operator: '&',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a & b == c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '&',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'BinaryExpression',
              operator: '==',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a == b != c === d !== e',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '!==',
            left: {
              type: 'BinaryExpression',
              operator: '===',
              left: {
                type: 'BinaryExpression',
                operator: '!=',
                left: {
                  type: 'BinaryExpression',
                  operator: '==',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  }
                },
                right: {
                  type: 'Identifier',
                  name: 'c'
                }
              },
              right: {
                type: 'Identifier',
                name: 'd'
              }
            },
            right: {
              type: 'Identifier',
              name: 'e'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a == b & c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '&',
            left: {
              type: 'BinaryExpression',
              operator: '==',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a << b < c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '<',
            left: {
              type: 'BinaryExpression',
              operator: '<<',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a < b << c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '<',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'BinaryExpression',
              operator: '<<',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a << b >> c >>> d',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '>>>',
            left: {
              type: 'BinaryExpression',
              operator: '>>',
              left: {
                type: 'BinaryExpression',
                operator: '<<',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            },
            right: {
              type: 'Identifier',
              name: 'd'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a >>> b >> c << d',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '<<',
            left: {
              type: 'BinaryExpression',
              operator: '>>',
              left: {
                type: 'BinaryExpression',
                operator: '>>>',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            },
            right: {
              type: 'Identifier',
              name: 'd'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a << b + c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '<<',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a ** b ** c',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '**',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'BinaryExpression',
              operator: '**',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a ** b ** c + d',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'BinaryExpression',
              operator: '**',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'BinaryExpression',
                operator: '**',
                left: {
                  type: 'Identifier',
                  name: 'b'
                },
                right: {
                  type: 'Identifier',
                  name: 'c'
                }
              }
            },
            right: {
              type: 'Identifier',
              name: 'd'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a ? b ** c : d',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            test: {
              type: 'Identifier',
              name: 'a'
            },
            consequent: {
              type: 'BinaryExpression',
              operator: '**',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            },
            alternate: {
              type: 'Identifier',
              name: 'd'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a ? b : c ** d',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
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
              type: 'BinaryExpression',
              operator: '**',
              left: {
                type: 'Identifier',
                name: 'c'
              },
              right: {
                type: 'Identifier',
                name: 'd'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'b && c == d',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'LogicalExpression',
            operator: '&&',
            left: {
              type: 'Identifier',
              name: 'b'
            },
            right: {
              type: 'BinaryExpression',
              operator: '==',
              left: {
                type: 'Identifier',
                name: 'c'
              },
              right: {
                type: 'Identifier',
                name: 'd'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'a !== b === c != d == e',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '==',
            left: {
              type: 'BinaryExpression',
              operator: '!=',
              left: {
                type: 'BinaryExpression',
                operator: '===',
                left: {
                  type: 'BinaryExpression',
                  operator: '!==',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  }
                },
                right: {
                  type: 'Identifier',
                  name: 'c'
                }
              },
              right: {
                type: 'Identifier',
                name: 'd'
              }
            },
            right: {
              type: 'Identifier',
              name: 'e'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ]
]);
