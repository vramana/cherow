import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Binary', () => {});

pass('Expressions - Binary (pass)', [
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
