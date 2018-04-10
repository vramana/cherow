import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Miscellaneous - Shebang', () => {

    describe('Failure', () => {

    });

    describe('Pass', () => {

        pass('#!/foo/bar/baz -abc\rfoo', Context.OptionsShebang, {
            source: '#!/foo/bar/baz -abc\rfoo',
            expected: {
                  "body": [
                    {
                      "expression": {
                        "name": "foo",
                        "type": "Identifier",
                      },
                      "type": "ExpressionStatement"
                    },
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('#!/foo/bar/baz -abc\r\nfoo', Context.OptionsShebang, {
            source: '#!/foo/bar/baz -abc\r\nfoo',
            expected: {
                  "body": [
                    {
                      "expression": {
                        "name": "foo",
                        "type": "Identifier",
                      },
                      "type": "ExpressionStatement",
                    }
                  ],
                 "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('#!/foo/bar/baz -abc\u2028', Context.OptionsShebang, {
            source: '#!/foo/bar/baz -abc\u2028',
            expected: {
                  "body": [],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('#!/foo/bar/baz -abc\u2028! foo', Context.OptionsShebang, {
            source: '#!/foo/bar/baz -abc\u2028! foo',
            expected: {
                  "body": [
                    {
                      "expression": {
                        "argument": {
                          "name": "foo",
                          "type": "Identifier"
                        },
                        "operator": "!",
                        "prefix": true,
                        "type": "UnaryExpression"
                      },
                      "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass( '#!/foo/bar/baz -abc\n! foo', Context.OptionsShebang, {
            source:  '#!/foo/bar/baz -abc\n! foo',
            expected: {
                  "body": [
                    {
                      "expression": {
                        "argument": {
                          "name": "foo",
                          "type": "Identifier"
                        },
                        "operator": "!",
                        "prefix": true,
                        "type": "UnaryExpression"
                      },
                      "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('#!/foo/bar/baz -abc\n! foo', Context.OptionsShebang, {
            source: '#!/foo/bar/baz -abc\n! foo',
            expected: {
                  "body": [
                    {
                      "expression": {
                        "argument": {
                          "name": "foo",
                          "type": "Identifier",
                       },
                        "operator": "!",
                        "prefix": true,
                        "type": "UnaryExpression",
                      },
                      "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });
    });
});
