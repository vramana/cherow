import { fail, pass } from '../test-utils';

describe('Literals - Numbers', () => {

    pass(`short binary number`, {
    source: '0b011',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
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
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'Literal',
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
              },
              value: 3,
              raw: '0b011'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`medium long binary number`, {
    source: '0b0110000101001',
    raw: true,
    ranges: true,
    loc: true,
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
              type: 'Literal',
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
              value: 3113,
              raw: '0b0110000101001'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`long binary number`, {
    source: '0b00000101010100000101010100001010101000001010101001010000010101010000101010100000101010100101000001010101000010101010000010101010010100000101010100001010101000001010101001010000010101010000101010100000101010100101000001010101000010101010000010101010010100000101010100001010101000001010101001010000010101010000101010100000101010100101000001010101000010101010000010101010010100000101010100001010101000001010101001010000010101010000101010100000101010100101000001010101000010101010000010101010111111111111111111111111111',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
        start: 0,
        end: 517,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 517
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 517,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 517
              }
            },
            expression: {
              type: 'Literal',
              start: 0,
              end: 517,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 517
                }
              },
              value: 2.226449312770544e+153,
              raw: '0b00000101010100000101010100001010101000001010101001010000010101010000101010100000101010100101000001010101000010101010000010101010010100000101010100001010101000001010101001010000010101010000101010100000101010100101000001010101000010101010000010101010010100000101010100001010101000001010101001010000010101010000101010100000101010100101000001010101000010101010000010101010010100000101010100001010101000001010101001010000010101010000101010100000101010100101000001010101000010101010000010101010111111111111111111111111111'
            }
          }
        ],
        sourceType: 'script'
      }
  });

    pass(`very long binary number`, {
    source: '0b111101010101010100111101',
    raw: true,
    ranges: true,
    loc: true,
    expected: {
        type: 'Program',
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
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'Literal',
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
              },
              value: 16078141,
              raw: '0b111101010101010100111101'
            }
          }
        ],
        sourceType: 'script'
      }
  });

});