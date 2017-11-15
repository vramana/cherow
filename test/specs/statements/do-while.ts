import { fail, pass } from '../utils/test-utils';

describe('Statements - do-while', () => {

    fail('expression if do-while IterationStatement is bracketed with braces', 'do break; while 1;');
    fail('async function declaration is in statement position', 'do async function f() {} while (false)');
    fail('let declarations with initialisers in statement positions', 'do let x = 1; while (false)');
    fail('expression if do-while IterationStatement is bracketed with braces', 'do break; while 1;');

    fail('do without while', 'do abc');
    fail('do continue', 'do continue');
    fail('labelled function statement', 'do label1: label2: function f() {} while (false)');
    fail('expression in do-while iteration statement bracketed with braces', 'do break; while true;');
    fail('a statement within do-while is not compound', 'do var x=1; var y =2; while (0);');
    fail('a block within a do-while expression', 'do{ ; }while({0});');
    fail('expression in do-while IterationStatement bracketed with braces (literal)', `do break; while 'hood';`);
    fail('expression in do-while IterationStatement bracketed with braces (empty)', `do break; while '';`);
});