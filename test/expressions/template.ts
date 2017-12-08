import { pass, fail } from '../utils';

describe('Expressions - Template', () => {

    fail('`\\000`', {
        source: '`\\000`',
    });

    fail('`\\001`', {
        source: '`\\001`',
    });

    fail('`${a}a${b}', {
        source: '`${a}a${b}',
    });

    fail('`\\u`', {
        source: '`\\u`',
    });

    fail('`${a', {
        source: '`${a',
    });

    fail('`\\u000g`;', {
        source: '`\\u000g`;',
    });

    fail('`\\u{10FFFFF}${"inner"}right`', {
        source: '`\\u{10FFFFF}${"inner"}right`',
    });

    fail('`\\u{\\${0}right`', {
        source: '`\\u{\\${0}right`',
    });

    fail('`\\u{abcdx}`', {
        source: '`\\u{abcdx}`',
    });

    fail('`left${0}\\u0`', {
        source: '`left${0}\\u0`',
    });

        pass('foo`\\unicode`', {
            source: 'foo`\\unicode`',
            ranges: true,
            raw: true,
            loc: true,
            expected: {
              body: [
                {
                  end: 13,
                  expression: {
                    end: 13,
                    'loc': {
                      'end': {
                        'column': 13,
                        'line': 1,
                      },
                      'start': {
                       'column': 0,
                        'line': 1,
                      }
                    },
                    'quasi': {
                      'end': 13,
                      'expressions': [],
                      'loc': {
                        'end': {
                          'column': 13,
                          'line': 1,
                        },
                        'start': {
                          'column': 3,
                          'line': 1,
                        },
                      },
                      'quasis': [
                      {
                          'end': 13,
                          'loc': {
                            'end': {
                              'column': 13,
                              'line': 1,
                            },
                            'start': {
                              'column': 3,
                              'line': 1,
                            }
                          },
                          'start': 3,
                          'tail': true,
                          'type': 'TemplateElement',
                          'value': {
                            'cooked': null,
                            'raw': '\\unicode',
                          }
                        }
                      ],
                      'start': 3,
                      'type': 'TemplateLiteral',
                   },
                    'start': 0,
                    'tag': {
                      'end': 3,
                      'loc': {
                        'end': {
                          'column': 3,
                          'line': 1,
                        },
                        'start': {
                          'column': 0,
                          'line': 1,
                        }
                     },
                      'name': 'foo',
                      'start': 0,
                      'type': 'Identifier',
                    },
                    'type': 'TaggedTemplateExpression',
                 },
                  'loc': {
                    'end': {
                      'column': 13,
                      'line': 1,
                   },
                    'start': {
                      'column': 0,
                      'line': 1,
                    }
                  },
                  'start': 0,
                 'type': 'ExpressionStatement',
                },
              ],
             'end': 13,
              'loc': {
                'end': {
                  'column': 13,
                  'line': 1,
                },
                'start': {
                  'column': 0,
                  'line': 1,
                },
              },
              'sourceType': 'script',
              'start': 0,
              'type': 'Program'
            }
        });

        pass('foo`\\unicode`', {
            source: 'foo`\\unicode`',
            loc: true,
            raw: true,
            expected: {
              "body": [
                {
                  "expression": {
                    "loc": {
                      "end": {
                        "column": 13,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasi": {
                      "expressions": [],
                      "loc": {
                        "end": {
                          "column": 13,
                          "line": 1,
                        },
                        "start": {
                          "column": 3,
                          "line": 1,
                        }
                      },
                      "quasis": [
                        {
                          "loc": {
                            "end": {
                              "column": 13,
                              "line": 1,
                            },
                            "start": {
                              "column": 3,
                              "line": 1,
                            }
                          },
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\unicode"
                          },
                        }
                      ],
                      "type": "TemplateLiteral"
                   },
                    "tag": {
                      "loc": {
                        "end": {
                          "column": 3,
                         "line": 1,
                        },
                        "start": {
                         "column": 0,
                          "line": 1,
                        }
                      },
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "loc": {
                    "end": {
                      "column": 13,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement"
                },
              ],
              "loc": {
                "end": {
                  "column": 13,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "sourceType": "script",
            "type": "Program"
            }
        });
         
        pass('foo`\\u{abcdx`', {
            source: 'foo`\\u{abcdx`',
            loc: true,
            raw: true,
            expected: {
              "body": [
                {
                  "expression": {
                    "loc": {
                      "end": {
                        "column": 13,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "quasi": {
                      "expressions": [],
                      "loc": {
                        "end": {
                          "column": 13,
                          "line": 1,
                        },
                        "start": {
                          "column": 3,
                          "line": 1,
                        }
                      },
                      "quasis": [
                        {
                          "loc": {
                            "end": {
                              "column": 13,
                              "line": 1,
                            },
                            "start": {
                              "column": 3,
                              "line": 1,
                            }
                          },
                          "tail": true,
                          "type": "TemplateElement",
                          "value": {
                            "cooked": null,
                            "raw": "\\u{abcdx"
                          }
                        }
                      ],
                      "type": "TemplateLiteral"
                    },
                    "tag": {
                     "loc": {
                        "end": {
                          "column": 3,
                          "line": 1,
                        },
                        "start": {
                          "column": 0,
                          "line": 1,
                        }
                      },
                      "name": "foo",
                      "type": "Identifier",
                    },
                    "type": "TaggedTemplateExpression"
                  },
                  "loc": {
                    "end": {
                      "column": 13,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "loc": {
                "end": {
                  "column": 13,
                  "line": 1
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "type": "Program"
            }
        });
        
        pass('`a`', {
            source: '`a`',
            loc: true,
            raw: true,
            expected: {
              "type": "Program",
              "body": [
                  {
                      "type": "ExpressionStatement",
                      "expression": {
                          "type": "TemplateLiteral",
                          "quasis": [
                              {
                                  "type": "TemplateElement",
                                  "value": {
                                      "raw": "a",
                                      "cooked": "a"
                                  },
                                  "tail": true,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 0
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 3
                                      }
                                  }
                              }
                          ],
                          "expressions": [],
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 3
                              }
                          }
                      },
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 3
                          }
                      }
                  }
              ],
              "sourceType": "script",
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 3
                  }
              }
          }
        });
        
        pass('`${a}$`', {
            source: '`${a}$`',
            expected: {
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "TemplateLiteral",
                      "quasis": [{
                              "type": "TemplateElement",
                              "value": {
                                  "raw": "",
                                  "cooked": ""
                              },
                              "tail": false
                          },
                          {
                              "type": "TemplateElement",
                              "value": {
                                  "raw": "$",
                                  "cooked": "$"
                              },
                              "tail": true
                          }
                      ],
                      "expressions": [{
                          "type": "Identifier",
                          "name": "a"
                      }]
                  }
              }],
              "sourceType": "script"
          }
        });
        
        pass('``````', {
            source: '``````',
           raw: true,
            expected: {
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "TaggedTemplateExpression",
                      "tag": {
                          "type": "TaggedTemplateExpression",
                          "tag": {
                              "type": "TemplateLiteral",
                              "quasis": [{
                                  "type": "TemplateElement",
                                  "value": {
                                      "raw": "",
                                      "cooked": ""
                                  },
                                  "tail": true
                              }],
                              "expressions": []
                          },
                          "quasi": {
                              "type": "TemplateLiteral",
                              "quasis": [{
                                  "type": "TemplateElement",
                                  "value": {
                                      "raw": "",
                                      "cooked": ""
                                  },
                                  "tail": true
                              }],
                              "expressions": []
                          }
                      },
                      "quasi": {
                          "type": "TemplateLiteral",
                          "quasis": [{
                              "type": "TemplateElement",
                              "value": {
                                  "raw": "",
                                  "cooked": ""
                              },
                              "tail": true
                          }],
                          "expressions": []
                      }
                  }
              }],
              "sourceType": "script"
          }
        });
         
        pass('a``', {
            source: 'a``',
             raw: true,
            expected: {
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "TaggedTemplateExpression",
                      "tag": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "quasi": {
                          "type": "TemplateLiteral",
                          "quasis": [{
                              "type": "TemplateElement",
                              "value": {
                                  "raw": "",
                                  "cooked": ""
                              },
                              "tail": true
                          }],
                          "expressions": []
                      }
                  }
              }],
              "sourceType": "script"
          }
        });
         
        pass('new a()``', {
            source: 'new a()``',
            loc: true,
            raw: true,
            expected: {
              "type": "Program",
              "body": [
                  {
                      "type": "ExpressionStatement",
                      "expression": {
                          "type": "TaggedTemplateExpression",
                          "tag": {
                              "type": "NewExpression",
                              "callee": {
                                  "type": "Identifier",
                                  "name": "a",
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 4
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 5
                                      }
                                  }
                              },
                              "arguments": [],
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 0
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 7
                                  }
                              }
                          },
                          "quasi": {
                              "type": "TemplateLiteral",
                              "quasis": [
                                  {
                                      "type": "TemplateElement",
                                      "value": {
                                          "raw": "",
                                          "cooked": ""
                                      },
                                      "tail": true,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 7
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 9
                                          }
                                      }
                                  }
                              ],
                              "expressions": [],
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 7
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 9
                                  }
                              }
                          },
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 0
                              },
                              "end": {
                                  "line": 1,
                                  "column": 9
                              }
                          }
                      },
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 9
                          }
                      }
                  }
              ],
              "sourceType": "script",
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 9
                  }
              }
          }
        });

        pass('`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`', {
            source: '`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`',
            raw: true,
            expected: {
              "type": "Program",
              "body": [
                {
                  "type": "ExpressionStatement",
                  "expression": {
                    "type": "TemplateLiteral",
                    "expressions": [
                      {
                        "type": "ObjectExpression",
                        "properties": [
                          {
                            "type": "Property",
                            "method": false,
                            "shorthand": false,
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "name": "x"
                            },
                            "value": {
                              "type": "ObjectExpression",
                              "properties": [
                                {
                                  "type": "Property",
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "name": "y"
                                  },
                                  "value": {
                                    "type": "Literal",
                                    "value": 10,
                                    "raw": "10"
                                  },
                                  "kind": "init"
                                }
                              ]
                            },
                            "kind": "init"
                          }
                        ]
                      },
                      {
                        "type": "TemplateLiteral",
                        "expressions": [
                          {
                            "type": "FunctionExpression",
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "body": [
                                {
                                  "type": "ReturnStatement",
                                  "argument": {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                  }
                                }
                              ]
                            }
                          }
                        ],
                        "quasis": [
                          {
                            "type": "TemplateElement",
                            "value": {
                              "raw": "nested",
                              "cooked": "nested"
                            },
                            "tail": false
                          },
                          {
                            "type": "TemplateElement",
                            "value": {
                              "raw": "endnest",
                              "cooked": "endnest"
                            },
                            "tail": true
                          }
                        ]
                      }
                    ],
                    "quasis": [
                      {
                        "type": "TemplateElement",
                        "value": {
                          "raw": "outer",
                          "cooked": "outer"
                        },
                        "tail": false
                      },
                      {
                        "type": "TemplateElement",
                        "value": {
                          "raw": "bar",
                          "cooked": "bar"
                        },
                        "tail": false
                      },
                      {
                        "type": "TemplateElement",
                        "value": {
                          "raw": "end",
                          "cooked": "end"
                        },
                        "tail": true
                      }
                    ]
                  }
                }
              ],
              "sourceType": "script"
            }
        });
});