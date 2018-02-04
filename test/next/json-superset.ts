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
        message: 'Unexpected regular expression',
        index: 0
    });

    fail('/\u2028/', {
        source: '/\u2028/',
        message: 'Unexpected regular expression',
        index: 0
    });
});