import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Continue', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['while (foo) { continue; }', 'while (foo) { continue; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 7,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ContinueStatement',
                        'label': null,
                        'start': 14,
                        'end': 23,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 23
                            }
                        }
                    }
                ],
                'start': 12,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 12
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            },
            'start': 0,
            'end': 25,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 25
                }
            }
        }
    ],
    'start': 0,
    'end': 25,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 25
        }
    }
}]
];

const invalids: Array < [string, string, Context, any] > = [
  ['continue', 'continue', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['do {  test262: {  continue test262; } } while (a)', 'do {  test262: {  continue test262; } } while (a)', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['do {  test262: {  continue test262; } } while (a)', 'do {  test262: {  continue test262; } } while (a)', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['ice: while(true) { continue fapper; }', 'ice: while(true) { continue fapper; }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['oop1: while (true) { loop2: function a() { continue loop2; } }', 'oop1: while (true) { loop2: function a() { continue loop2; } }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['loop1: while (true) { loop2: function a() { continue loop1; } }', 'loop1: while (true) { loop2: function a() { continue loop1; } }', Context.OptionsRanges | Context.OptionsLoc, {}],
  ['loop1: while (true) { loop1: function a() { continue loop1; } }', 'loop1: while (true) { loop1: function a() { continue loop1; } }', Context.OptionsRanges | Context.OptionsLoc, {}],
  [`LABEL1 : do {
    x++;
    (function(){continue LABEL1;})();
    y++;
    } while(0);`, `LABEL1 : do {
      x++;
      (function(){continue LABEL1;})();
      y++;
      } while(0);`, Context.OptionsRanges | Context.OptionsLoc, {}],
  [`try{
    LABEL1 : do {
      x++;
      throw "gonna leave it";
      y++;
    } while(0);
    $ERROR('#1: throw "gonna leave it" lead to throwing exception');
    } catch(e){
    continue LABEL2;
    LABEL2 : do {
      x++;
      y++;
    } while(0);
    };`, `try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
      } catch(e){
      continue LABEL2;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
      };`, Context.OptionsRanges | Context.OptionsLoc, {}],
  [`try{
    LABEL1 : do {
      x++;
      throw "gonna leave it";
      y++;
    } while(0);
    $ERROR('#1: throw "gonna leave it" lead to throwing exception');
    } catch(e){
    continue;
    LABEL2 : do {
      x++;
      y++;
    } while(0);
    };`, `try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
      } catch(e){
      continue;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
      };`, Context.OptionsRanges | Context.OptionsLoc, {}],
];
fail('Statements - Continue (failures)', invalids);
pass('Statements - Continue (pass)', valids);

});
