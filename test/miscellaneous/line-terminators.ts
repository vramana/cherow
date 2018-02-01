import { pass, fail } from '../test-utils';

describe('Miscellaneous - Line terminators', () => {

  fail(`line feed within strings`, {
      source: `"
      str
      ing
      ";`,
      loc: true,
      ranges: true,
      raw: true,
  });

  fail(`ingle line comment contains line feed`, {
      source: `//single
      line comment`,
      loc: true,
      ranges: true,
      raw: true,
  });

  fail(`single line comment contains line feed`, {
      source: `//single
    line comment`,
      loc: true,
      ranges: true,
      raw: true,
  });

  fail(`line terminator expressed as a Unicode escape sequence - \\u000Ax;`, {
      source: `var\\u000Ax;`,
      loc: true,
      ranges: true,
      raw: true,
  });

  fail(`invalid paragraph separator`, {
      source: `\\u2028var\\u2028x\\u2028=\\u2028y\\u2028/\\u2028z\\u2028; result = x;`,
      loc: true,
      ranges: true,
      raw: true,
  });

  fail(`line terminator expressed as a Unicode escape sequence - \\u000Ax;`, {
      source: `var\\u000Ax;`,
      loc: true,
      ranges: true,
      raw: true,
  });

  pass(`line terminators between operators`, {
    source: `var
    x
    =
    y
    -
    z
    ;`,
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
                          type: 'BinaryExpression',
                          left: {
                              type: 'Identifier',
                              name: 'y',
                              start: 20,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 4,
                                      column: 4
                                  },
                                  end: {
                                      line: 4,
                                      column: 5
                                  }
                              }
                          },
                          right: {
                              type: 'Identifier',
                              name: 'z',
                              start: 32,
                              end: 33,
                              loc: {
                                  start: {
                                      line: 6,
                                      column: 4
                                  },
                                  end: {
                                      line: 6,
                                      column: 5
                                  }
                              }
                          },
                          operator: '-',
                          start: 20,
                          end: 33,
                          loc: {
                              start: {
                                  line: 4,
                                  column: 4
                              },
                              end: {
                                  line: 6,
                                  column: 5
                              }
                          }
                      },
                      id: {
                          type: 'Identifier',
                          name: 'x',
                          start: 8,
                          end: 9,
                          loc: {
                              start: {
                                  line: 2,
                                  column: 4
                              },
                              end: {
                                  line: 2,
                                  column: 5
                              }
                          }
                      },
                      start: 8,
                      end: 33,
                      loc: {
                          start: {
                              line: 2,
                              column: 4
                          },
                          end: {
                              line: 6,
                              column: 5
                          }
                      }
                  }
              ],
              kind: 'var',
              start: 0,
              end: 39,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 7,
                      column: 5
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
              line: 7,
              column: 5
          }
      }
  }
  });
});
