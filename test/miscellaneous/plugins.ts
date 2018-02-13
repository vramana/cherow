import { pass, fail } from '../test-utils';
import { Token } from '../../src/token';

describe('Miscellaneous - Plugins', () => {

    // Creating 6 different plugins

    const plugin1 = function(Parser: any) {
        return class extends Parser {
            parseLiteral(context: any) {
                const pos = this.getLocation();
                this.nextToken(context);
                return this.finishNode(context, pos, {
                    type: 'Literal',
                    value: 456
                });
            }
        }
    }

    const plugin2 = function(Parser: any) {
        return class extends Parser {
            parseIdentifier(context: any) {
                const pos = this.getLocation();
                this.nextToken(context);
                return this.finishNode(context, pos, {
                    type: 'Identifier',
                    name: 'foo'
                });
            }
        }
    }

    const plugin3 = function(Parser: any) {
        return class extends Parser {
            parseLiteral(context: any) {
                const pos = this.getLocation();
                this.nextToken(context);
                return this.finishNode(context, pos, {
                    type: 'Literal',
                    value: 789
                });
            }
        }
    }

    const plugin4 = function(Parser: any) {
        return class extends Parser {
            parsePrimaryExpression(context: any, pos: any) {
                if (this.token === Token.NumericLiteral) {
                    return this.parseLiteral(context);
                } else {
                    return super.parsePrimaryExpression(context, pos);
                }

            }
            parseLiteral(context: any) {

                const pos = this.getLocation();
                this.nextToken(context);
                return this.finishNode(context, pos, {
                    type: 'Literal',
                    value: 789
                });
            }
        }
    }

    const plugin5 = function(Parser: any) {
        return class extends Parser {
            parsePrimaryExpression(context: any, pos: any) {
                if (this.token === Token.NumericLiteral) {
                    return this.parseLiteral(context);
                } else {
                    return super.parsePrimaryExpression(context, pos);
                }

            }
        }
    }

    const plugin6 = function(Parser: any) {
        return class extends Parser {
            parsePrimaryExpression(context: any, pos: any) {
                if (this.token === Token.Identifier) {
                    return this.parseIdentifier(context);
                } else {
                    return super.parsePrimaryExpression(context, pos);
                }

            }
        }
    }

    pass('Two plugins', {
        source: 'a = 123',
        plugins: [plugin1, plugin2],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 456,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass('Two plugins - reverse order', {
        source: 'a = 123',
        plugins: [plugin2, plugin1],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 456,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass('Single plugin - the numeric value will be overwritten', {
        source: '123',
        loc: true,
        ranges: true,
        plugins: [plugin1],
        expected: {
            "body": [{
                "end": 3,
                "expression": {
                    "end": 3,
                    "loc": {
                        "end": {
                            "column": 3,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "start": 0,
                    "type": "Literal",
                    "value": 456
                },
                "loc": {
                    "end": {
                        "column": 3,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 3,
            "loc": {
                "end": {
                    "column": 3,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                },
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        }
    });

    pass('Three plugins where third plugins overwrite first plugin', {
        source: 'a = 123',
        plugins: [plugin1, plugin2, plugin3],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 789,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass('Three plugins where third plugins overwrite first plugin - reverse order', {
        source: 'a = 123',
        plugins: [plugin3, plugin2, plugin1],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 456,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass('Three plugins where third plugins overwrite first plugin - mixed order #1', {
        source: 'a = 123',
        plugins: [plugin3, plugin1, plugin2],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 456,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass('Three plugins where third plugins overwrite first plugin - mixed order #2', {
        source: 'a = 123',
        plugins: [plugin2, plugin3, plugin1],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 456,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    // This will disable the plugin, and a normal Cherow parse will be done
    pass('Same plugin added twice', {
        source: 'a = 123',
        plugins: [plugin2, plugin2],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 123,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass('Third plugin wil overwite second plugin', {
        source: 'a = 123',
        plugins: [plugin2, plugin3],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 789,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass('Forth plugin extending "parsePrimaryExpression"', {
        source: 'a = 123',
        plugins: [plugin2, plugin4],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 789,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    // Here 'plugin1' will create a new 'pareIdentifier' and 'plugin5' will
    // use that one
    pass('Forth plugin extending "parsePrimaryExpression"', {
        source: 'a = 123',
        plugins: [plugin1, plugin5],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "a",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 456,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    // Mixing plugin1 and plugin6
    pass('Forth plugin extending "parsePrimaryExpression"', {
        source: 'a = 123',
        plugins: [plugin2, plugin6],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 123,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass('All 6 plugins together - making a hell of a mess!!', {
        source: 'cherow_plugin_system_works = 999',
        plugins: [plugin1, plugin2, plugin3, plugin4, plugin5, plugin6],
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 789,
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });
});
