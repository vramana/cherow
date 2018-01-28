import { pass, fail } from '../utils';

// Create a new plugin

function plugin(value: any) {
    return (parser: any) => {
        parser.parseLiteral = function(context: any) {
            const pos = this.getLocations();
            this.nextToken(context);
            return this.finishNode(context, pos, {
                type: 'Literal',
                value
            });
        };
    };
}

// Parse with the new plugin enabled

describe('Plugins - Literal node with pre-defined value', () => {
    pass(`interpretation of all punctuators`, {
        source: `1`,
        loc: true,
        ranges: true,
        plugins: [plugin(123)],
        raw: true,
        expected: {
            body: [{
                end: 1,
                expression: {
                    end: 1,
                    loc: {
                        end: {
                            column: 1,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    start: 0,
                    type: 'Literal',
                    value: 123,
                },
                loc: {
                    end: {
                        column: 1,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                start: 0,
                type: 'ExpressionStatement',
            }],
            end: 1,
            loc: {
                end: {
                    column: 1,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            start: 0,
            type: 'Program'
        }
    });
});