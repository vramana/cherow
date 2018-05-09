import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';
describe('Statements - Continue', () => {

    describe('Failure', () => {

        fail('while ( false ) Label: continue Label;', Context.Empty, {
            source: 'while ( false ) Label: continue Label;',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('do {  test262: {  continue test262; } } while (a)', Context.Empty, {
            source: 'do {  test262: {  continue test262; } } while (a)',
        });

        fail('ice: while(true) { continue fapper; }', Context.Empty, {
            source: 'ice: while(true) { continue fapper; }',
        });

        fail(`loop1: while (true) { loop2: function a() { continue loop2; } }`, Context.Empty, {
            source: `loop1: while (true) { loop2: function a() { continue loop2; } }`,
        });

        fail(`loop1: while (true) { loop2: function a() { continue loop1; } }`, Context.Empty, {
            source: `loop1: while (true) { loop2: function a() { continue loop1; } }`,
        });

        fail(`loop1: while (true) { loop1: function a() { continue loop1; } }`, Context.Empty, {
            source: `loop1: while (true) { loop1: function a() { continue loop1; } }`,
        });

        // Test262 tests

        fail(`LABEL1 : do {
x++;
(function(){continue LABEL1;})();
y++;
} while(0);`,Context.Empty, {
            source: `LABEL1 : do {
  x++;
  (function(){continue LABEL1;})();
  y++;
} while(0);`,
        });

        fail(`try{
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
};`,         Context.Empty, {
            source: `try{
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
};`,
        });

        fail(`try{
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
};`,         Context.Empty, {
            source: `try{
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
};`,
        });
    });

});
