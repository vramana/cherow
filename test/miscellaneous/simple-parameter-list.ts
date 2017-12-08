import { fail, pass } from '../utils';

describe('Miscellaneous - Simple parameter list', () => {

    fail(`function a([ option1, option2 ] = []) {  "use strict"; }`, {
        source: 'function a([ option1, option2 ] = []) {  "use strict"; }',
    });

    fail(`function foo(a=2) { "use strict"; }`, {
        source: 'function foo(a=2) { "use strict"; }',
    });

    fail(`function foo({a}) { "use strict"; }`, {
        source: 'function foo({a}) { "use strict"; }',
    });

    fail(`function foo({a}) { "use strict"; }`, {
        source: 'function foo({a}) { "use strict"; }',
    });

    fail(`({a}) => { "use strict"; }`, {
        source: '({a}) => { "use strict"; }',
        module: true
    });

    fail(`function a([ option1, option2 ]) { "use strict"; }`, {
        source: 'function a([ option1, option2 ]) { "use strict"; }',
    });

    fail(`function a(options = {}) { "use strict"; }`, {
        source: 'function a(options = {}) { "use strict"; }',
    });

    fail(`function a(...options) { "use strict"; }`, {
        source: 'function a(...options) { "use strict"; }',
    });

    fail(`var a = async (options = {}) => { "use strict"; }`, {
        source: 'var a = async (options = {}) => { "use strict"; }',
    });

    fail(`function a([ option1, option2 ]) { "use strict"; }`, {
        source: 'function a([ option1, option2 ]) { "use strict"; }',
    });

});