import { pass, fail } from '../utils';

describe('Destructuring - Parenthesized', () => {

            pass(`[(a)] = 0`, {
                source: '[(a)] = 0',
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
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        }
                                    ],
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
                                },
                                operator: '=',
                                right: {
                                    type: 'Literal',
                                    value: 0,
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    raw: '0'
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
                    sourceType: 'script',
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

            pass(`[(a) = 0] = 1`, {
                source: '[(a) = 0] = 1',
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
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            start: 1,
                                            end: 8,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 1
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 8
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
                                },
                                operator: '=',
                                right: {
                                    type: 'Literal',
                                    value: 1,
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
                                    raw: '1'
                                },
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
                        }
                    ],
                    sourceType: 'script',
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
                }
            });

            pass(`[(a.b)] = 0`, {
                source: '[(a.b)] = 0',
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
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            computed: false,
                                            property: {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            start: 2,
                                            end: 5,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 2
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 5
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
                                },
                                operator: '=',
                                right: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
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

            pass(`[a = (b = c)] = 0`, {
                source: '[a = (b = c)] = 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
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
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
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
                        },
                        expression: {
                          type: 'AssignmentExpression',
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
                          },
                          operator: '=',
                          left: {
                            type: 'ArrayPattern',
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
                            elements: [
                              {
                                type: 'AssignmentPattern',
                                start: 1,
                                end: 12,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 1
                                  },
                                  end: {
                                    line: 1,
                                    column: 12
                                  }
                                },
                                left: {
                                  type: 'Identifier',
                                  start: 1,
                                  end: 2,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 1
                                    },
                                    end: {
                                      line: 1,
                                      column: 2
                                    }
                                  },
                                  name: 'a'
                                },
                                right: {
                                  type: 'AssignmentExpression',
                                  start: 6,
                                  end: 11,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 6
                                    },
                                    end: {
                                      line: 1,
                                      column: 11
                                    }
                                  },
                                  operator: '=',
                                  left: {
                                    type: 'Identifier',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 6
                                      },
                                      end: {
                                        line: 1,
                                        column: 7
                                      }
                                    },
                                    name: 'b'
                                  },
                                  right: {
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
                                    name: 'c'
                                  }
                                }
                              }
                            ]
                          },
                          right: {
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
                            value: 0,
                            raw: '0'
                          }
                        }
                      }
                    ],
                    sourceType: 'script'
                  }
            });

            pass(`[(a = 0)]`, {
                source: '[(a = 0)]',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        },
                                        operator: '=',
                                        right: {
                                            type: 'Literal',
                                            value: 0,
                                            start: 6,
                                            end: 7,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 7
                                                }
                                            },
                                            raw: '0'
                                        },
                                        start: 2,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
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
                    sourceType: 'script',
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

         /*   pass(`var [(a)] = 0`, {
                source: 'var [(a)] = 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {}
            });*/

            pass(`({a:(b)} = 0)`, {
                source: '({a:(b)} = 0)',
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
                          type: 'AssignmentExpression',
                          start: 1,
                          end: 12,
                          loc: {
                            start: {
                              line: 1,
                              column: 1
                            },
                            end: {
                              line: 1,
                              column: 12
                            }
                          },
                          operator: '=',
                          left: {
                            type: 'ObjectPattern',
                            start: 1,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 1
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
                                start: 2,
                                end: 7,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 2
                                  },
                                  end: {
                                    line: 1,
                                    column: 7
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
                                  name: 'a'
                                },
                                value: {
                                  type: 'Identifier',
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
                                  },
                                  name: 'b'
                                },
                                kind: 'init'
                              }
                            ]
                          },
                          right: {
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                          }
                        }
                      }
                    ],
                    sourceType: 'script'
                  }
            });

            pass(`({a:(b) = 0} = 1)`, {
                source: '({a:(b) = 0} = 1)',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
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
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
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
                        },
                        expression: {
                          type: 'AssignmentExpression',
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
                          },
                          operator: '=',
                          left: {
                            type: 'ObjectPattern',
                            start: 1,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 1
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
                                start: 2,
                                end: 11,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 2
                                  },
                                  end: {
                                    line: 1,
                                    column: 11
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
                                  name: 'a'
                                },
                                value: {
                                  type: 'AssignmentPattern',
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
                                  left: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'b'
                                  },
                                  right: {
                                    type: 'Literal',
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
                                    value: 0,
                                    raw: '0'
                                  }
                                },
                                kind: 'init'
                              }
                            ]
                          },
                          right: {
                            type: 'Literal',
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
                            value: 1,
                            raw: '1'
                          }
                        }
                      }
                    ],
                    sourceType: 'script'
                  }
            });

            pass(`({a:(b.c)} = 0)`, {
                source: '({a:(b.c)} = 0)',
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
                    body: [
                      {
                        type: 'ExpressionStatement',
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
                        expression: {
                          type: 'AssignmentExpression',
                          start: 1,
                          end: 14,
                          loc: {
                            start: {
                              line: 1,
                              column: 1
                            },
                            end: {
                              line: 1,
                              column: 14
                            }
                          },
                          operator: '=',
                          left: {
                            type: 'ObjectPattern',
                            start: 1,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 1
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
                                start: 2,
                                end: 9,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 2
                                  },
                                  end: {
                                    line: 1,
                                    column: 9
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
                                  name: 'a'
                                },
                                value: {
                                  type: 'MemberExpression',
                                  start: 5,
                                  end: 8,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 5
                                    },
                                    end: {
                                      line: 1,
                                      column: 8
                                    }
                                  },
                                  object: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'b'
                                  },
                                  property: {
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
                                    name: 'c'
                                  },
                                  computed: false
                                },
                                kind: 'init'
                              }
                            ]
                          },
                          right: {
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
                            value: 0,
                            raw: '0'
                          }
                        }
                      }
                    ],
                    sourceType: 'script'
                  }
            });

            pass(`({a:(b = 0)})`, {
                source: '({a:(b = 0)})',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        },
                                        value: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            operator: '=',
                                            right: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            start: 5,
                                            end: 10,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 10
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 2,
                                        end: 11,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
                                            }
                                        }
                                    }
                                ],
                                start: 1,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            },
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
                        }
                    ],
                    sourceType: 'script',
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
                }
            });

            fail(`var {(a)} = 0`, {
                source: 'var {(a)} = 0',
                loc: true,
                ranges: true,
                raw: true
            });

            fail(`var {a:(b)} = 0`, {
                source: 'var {a:(b)} = 0',
                loc: true,
                ranges: true,
                raw: true
            });

            fail(`({(a)} = 0)`, {
                source: '({(a)} = 0)',
                loc: true,
                ranges: true,
                raw: true
            });

            fail('([a]) = 0',  { source: '([a]) = 0'});
            fail('({a}) = {}',  { source: '({a}) = {}'});
            fail('([a]) = []',  { source: '([a]) = []'});
            fail('var {(a)} = 0',  { source: 'var {(a)} = 0'});
            fail('var [(a)] = 0',  { source: 'var [(a)] = 0'});
            fail('([a]) = 0',  { source: '([a]) = 0'});
            fail('({(a)} = 0)',  { source: '({(a)} = 0)'});
            fail('(a, (b)) => 42',  { source: '(a, (b)) => 42'});
            fail('({a, b}) = {a: 1, b: 2};',  { source: '({a, b}) = {a: 1, b: 2};'});
            fail('({a, b}) = {a: 1, b:2};',  { source: '({a, b}) = {a: 1, b:2};'});
            fail('{a:(b = 0)} = 1',  { source: '{a:(b = 0)} = 1'});
            fail('{b} = b;',  { source: '{b} = b;'});
            fail('([b]) = b;',  { source: '([b]) = b;'});
            fail('([{constructor(){}}] = b);',  { source: '([{constructor(){}}] = b);'});

});