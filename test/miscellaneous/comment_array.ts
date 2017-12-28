import { pass, fail } from '../utils';

describe('Miscellaneous - AnnexB', () => {

    pass(`42 /*The*/ /*Answer*/`, {
        source: `42 /*The*/ /*Answer*/`,
        ranges: true,
        comments: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 21,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 2,
                expression: {
                  type: 'Literal',
                  start: 0,
                  end: 2,
                  value: 42,
                  raw: '42'
                }
              }
            ],
            sourceType: 'script',
            comments: [
              {
                type: 'Block',
                value: 'The',
                start: 3,
                end: 10,
              },
              {
                type: 'Block',
                value: 'Answer',
                start: 11,
                end: 21,
              }
            ]
          }
});

    pass(`var a; // a`, {
    source: `var a; // a`,
    ranges: true,
    comments: true,
    raw: true,
    expected: {
        type: 'Program',
        start: 0,
        end: 11,
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 6,
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 5,
                id: {
                  type: 'Identifier',
                  start: 4,
                  end: 5,
                  name: 'a'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script',
        comments: [
          {
            type: 'Line',
            value: ' a',
            start: 7,
            end: 11,
          }
        ]
      }
});

});