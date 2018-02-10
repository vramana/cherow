import { pass, fail } from '../test-utils';

describe('Next - JSON superset', () => {
    fail('"\u2028"', {
        source: '"\u2028"',
        message: 'Unterminated string literal',
        index: 0
    });
    fail('"\u2029"', {
        source: '"\u2029"',
        message: 'Unterminated string literal',
        index: 0
    });

    fail('/\u2029/', {
        source: '/\u2029/',
        message: 'Regular expressions can not contain escaped newlines',
        index: 0
    });

    fail('/\u2028/', {
        source: '/\u2028/',
        message: 'Regular expressions can not contain escaped newlines',
        index: 0
    });
});