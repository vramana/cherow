import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous - Escaped identifiers', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['var y\\u0069eld = 1;', 'var y\\u0069eld = 1;', Context.OptionsRanges | Context.OptionsLoc, {
      'body': [
        {
          'declarations': [
            {
              'end': 18,
              'id': {
                'end': 14,
                'loc': {
                  'end': {
                    'column': 14,
                    'line': 1,
                  },
                  'start': {
                    'column': 4,
                    'line': 1,
                  },
                },
                'name': 'yield',
                'start': 4,
                'type': 'Identifier',
             },
              'init': {
                'end': 18,
                'loc': {
                  'end': {
                    'column': 18,
                    'line': 1,
                  },
                  'start': {
                    'column': 17,
                    'line': 1,
                  },
                },
                'raw': null,
                'start': 17,
                'type': 'Literal',
                'value': 1,
              },
              'loc': {
                'end': {
                  'column': 18,
                  'line': 1,
                },
                'start': {
                  'column': 4,
                  'line': 1,
               },
              },
              'start': 4,
              'type': 'VariableDeclarator',
            },
          ],
          'end': 19,
          'kind': 'var',
          'loc': {
            'end': {
              'column': 19,
              'line': 1,
            },
            'start': {
              'column': 0,
              'line': 1,
            },
          },
          'start': 0,
          'type': 'VariableDeclaration',
       },
      ],
      'end': 19,
      'loc': {
        'end': {
          'column': 19,
          'line': 1,
        },
        'start': {
          'column': 0,
          'line': 1,
       },
      },
      'sourceType': 'script',
      'start': 0,
      'type': 'Program',
    }],

  ['(publ\\u0069c);', '(publ\\u0069c);', Context.Empty, {
      'body': [
        {
          'expression': {
            'name': 'public',
            'type': 'Identifier',
          },
          'type': 'ExpressionStatement',
        },
      ],
      'sourceType': 'script',
      'type': 'Program',
    }],
];

const invalids: Array < [string, string, Context, any] > = [
  ['export { X \\u0061s Y }', 'export { X \\u0061s Y }', Context.Strict | Context.Module, {}],
  ['import X fro\\u006d "foo"', 'import X fro\\u006d "foo"', Context.Strict | Context.Module, {}],
  ['export default \\u0061sync function () { await x }', 'export default \\u0061sync function () { await x }', Context.Strict | Context.Module, {}],
  ['export \\u0061sync function y() { await x }', 'export \\u0061sync function y() { await x }', Context.Strict | Context.Module, {}],
  ['export {a \\u0061s b} from "";', 'export {a \\u0061s b} from "";', Context.Strict | Context.Module, {}],
  ['export {} fr\\u006fm "";', 'export {} fr\\u006fm "";', Context.Strict | Context.Module, {}],
  ['import* \\u0061s foo from "./icefapper.js";', 'import* \\u0061s foo from "./icefapper.js";', Context.Strict | Context.Module, {}],
  ['void \\u0061sync function* f(){};', 'void \\u0061sync function* f(){};', Context.Empty, {}],
  ['for (var i = 0; i < 100; ++i) { br\\u0065ak; }', 'for (var i = 0; i < 100; ++i) { br\\u0065ak; }', Context.Empty, {}],
  ['cl\\u0061ss Foo {}', 'cl\\u0061ss Foo {}', Context.Empty, {}],
  ['a(1,2\\u0063onst foo = 1;', '\\u0063onst foo = 1;', Context.Empty, {}],
  ['[th\\u{69}s] = []', '[th\\u{69}s] = []', Context.Empty, {}],
  ['th\\u{69}s', 'th\\u{69}s', Context.Empty, {}],
  ['[f\\u0061lse] = []', '[f\\u0061lse] = []', Context.Empty, {}],
  ['f\\u0061lse', 'f\\u0061lse', Context.Empty, {}],
  ['class C { static async method() { void \u0061wait; }}', 'class C { static async method() { void \u0061wait; }}', Context.Empty, {}],
  ['while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }', 'while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }', Context.Empty, {}],
  ['(function a({ hello: {var:v\\u{0061}r}}) { })', '(function a({ hello: {var:v\\u{0061}r}}) { })', Context.Empty, {}],
  ['[v\\u{0061}r] = obj', '[v\\u{0061}r] = obj', Context.Empty, {}],
  ['d\\u0065bugger;', 'd\\u0065bugger;', Context.Empty, {}],
  ['d\\u0065lete this.a;', 'd\\u0065lete this.a;', Context.Empty, {}],
  ['\\u0063o { } while(0)', '\\u0063o { } while(0)', Context.Empty, {}],
  ['t\\u0072y { true } catch (e) {}', 't\\u0072y { true } catch (e) {}', Context.Empty, {}],
  ['var x = typ\\u0065of "blah"', 'var x = typ\\u0065of "blah"', Context.Empty, {}],
  ['v\\u0061r a = true', 'v\\u0061r a = true', Context.Empty, {}],
  ['thi\\u0073 = 123;', 'thi\\u0073 = 123;', Context.Empty, {}],
  ['i\\u0066 (false) {}', 'i\\u0066 (false) {}', Context.Empty, {}],
  ['for (var i = 0; i < 100; ++i) { br\\u0065ak; }', 'for (var i = 0; i < 100; ++i) { br\\u0065ak; }', Context.Empty, {}],
  ['cl\\u0061ss Foo {}', 'cl\\u0061ss Foo {}', Context.Empty, {}],
  ['\\u0063o { } while(0)', '\\u0063o { } while(0)', Context.Empty, {}],
  ['var f = f\\u0075nction() {}', 'var f = f\\u0075nction() {}', Context.Empty, {}],
  ['thr\\u006fw \'boo\';', 'thr\\u006fw \'boo\';', Context.Empty, {}],
  ['w\\u0069th (this.scope) { }', 'w\\u0069th (this.scope) { }', Context.Empty, {}],
  ['(function*() { y\\u0069eld 1; })()', '(function*() { y\\u0069eld 1; })()', Context.Empty, {}],
  ['n\\u0075ll = 1;', 'n\\u0075ll = 1;', Context.Empty, {}],
  ['(x === tr\\u0075e);', '(x === tr\\u0075e);', Context.Empty, {}],
  ['do { ; } wh\\u0069le (true) { }', 'do { ; } wh\\u0069le (true) { }', Context.Empty, {}],
  ['class X { st\\u0061tic y() {} }', 'class X { st\\u0061tic y() {} }', Context.Empty, {}],
  ['class C { st\\u0061tic set bar() {} }', 'class C { st\\u0061tic set bar() {} }', Context.Empty, {}],
  ['class C { st\\u0061tic set bar() {} }', 'class C { st\\u0061tic set bar() {} }', Context.Empty, {}],
  ['class C { st\\u0061tic *bar() {} }', 'class C { st\\u0061tic *bar() {} }', Context.Empty, {}],
];

fail('Miscellaneous - Escaped identifiers (failures)', invalids);
pass('Miscellaneous - Escaped identifiers (pass)', valids);

});
