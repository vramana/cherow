import { Context } from '../../src/common';
import { pass, fail } from '../test-utils';

describe('Experimental - Export-ns-from', () => {
  fail('Declarations - Functions (fail)', [
    ['export * as ns from "source";\nexport const ns = null;', Context.Strict | Context.Module],
    ['export const ns = null;\nexport * as ns from "source";', Context.Strict | Context.Module]
  ]);

  pass('Experimental - Export-ns-from', [
    [
      'export * as class from "source";',
      Context.OptionsExperimental | Context.Module,
      {
        body: [
          {
            source: {
              type: 'Literal',
              value: 'source'
            },
            specifiers: [
              {
                specifier: {
                  name: 'class',
                  type: 'Identifier'
                },
                type: 'ExportNamespaceSpecifier'
              }
            ],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export * as ns from "source";',
      Context.OptionsExperimental | Context.Module,
      {
        body: [
          {
            source: {
              type: 'Literal',
              value: 'source'
            },
            specifiers: [
              {
                specifier: {
                  name: 'ns',
                  type: 'Identifier'
                },
                type: 'ExportNamespaceSpecifier'
              }
            ],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ]
  ]);
});
