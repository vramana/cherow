import { n, pass, fail } from '../utils/test-utils';

describe('Declarations - Class', () => {

    fail('class {}', 'class {}');
    fail('class extends A{}', 'class extends A{}');
    fail('class a{ *() {} }', 'class a{ *() {} }');

    fail('LineTerminator after async keyword', `class Foo {
        async 
        a() {}
      }`);

    
});