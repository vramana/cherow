import { pass, fail } from '../utils';
import * as t from 'assert';

describe('Miscellaneous - API', () => {
    
        describe('Collect comments', () => {
    
            pass(`<!-- HTML comment`, {
                source: `<!-- HTML comment`,
                ranges: true,
                raw: true,
                comments: (type: string, comment: string, start: number, end: number) => {
                    t.deepEqual(type, 'Line');
                    t.deepEqual(comment, ' HTML comment');
                    t.deepEqual(start, 0);
                    t.deepEqual(end, 17);
                },
                expected: {
                    "type": "Program",
                    "start": 0,
                    "end": 17,
                    "body": [],
                    "sourceType": "script"
                }
            });

            pass(`/* Hello multiline comment, are you colleced yet? */`, {
                source: `/* Hello multiline comment, are you colleced yet? */`,
                ranges: true,
                raw: true,
                comments: (type: string, comment: string, start: number, end: number) => {
                    t.deepEqual(type, 'Block');
                    t.deepEqual(comment, ' Hello multiline comment, are you colleced yet? ');
                    t.deepEqual(start, 0);
                    t.deepEqual(end, 52);
                },
                expected: {
                    "type": "Program",
                    "start": 0,
                    "end": 52,
                    "body": [],
                    "sourceType": "script"
                }
            });

            const foo: any[] = [];
            pass(`/* ABC */ function abc() {} /* DEF */`, {
                source: `/* ABC */ function abc() {} /* DEF */`,
                ranges: true,
                raw: true,
                comments: foo,
                loc: true,
                expected: {
                    "type": "Program",
                    "start": 0,
                    "end": 37,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 37
                        }
                    },
                    "body": [{
                        "type": "FunctionDeclaration",
                        "start": 10,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 10
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        },
                        "id": {
                            "type": "Identifier",
                            "start": 19,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 19
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            },
                            "name": "abc"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "start": 25,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 25
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            },
                            "body": []
                        }
                    }],
                    "sourceType": "script"
                }
            });
        });
    });