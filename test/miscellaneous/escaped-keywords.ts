import { pass, fail } from '../test-utils';

describe('Miscellaneous - Escaped keywords', () => {

    fail('\\u0061sync function* f(){}', {
        source: '\\u0061sync function* f(){}',
        line: 1
    });

    fail('void \\u0061sync function* f(){};', {
        source: 'void \\u0061sync function* f(){};',
        line: 1
    });

    fail('({ \\u0061sync m(){} });', {
        source: '({ \\u0061sync m(){} });',
        line: 1
    });

    fail('"use strict"; var \\u0079ield = 123;', {
        source: '"use strict"; var \\u0079ield = 123;',
        line: 1
    });

    fail('({ g\\u0065t m() {} });', {
        source: '({ g\\u0065t m() {} });',
        line: 1
    });

    fail('function f() { n\\u0065w.target; }', {
        source: 'function f() { n\\u0065w.target; }',
        line: 1
    });

    fail('for (var i = 0; i < 100; ++i) { br\\u0065ak; }', {
        source: 'for (var i = 0; i < 100; ++i) { br\\u0065ak; }',
        line: 1
    });

    fail('cl\\u0061ss Foo {}', {
        source: 'cl\\u0061ss Foo {}',
        line: 1
    });

    fail('\\u0063onst foo = 1;', {
        source: '\\u0063onst foo = 1;',
        line: 1
    });

    fail('while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }', {
        source: 'while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }',
        line: 1
    });

    fail('d\\u0065bugger;', {
        source: 'd\\u0065bugger;',
        line: 1
    });

    fail('d\\u0065lete this.a;', {
        source: 'd\\u0065lete this.a;',
        line: 1
    });

    fail('\\u0063o { } while(0)', {
        source: '\\u0063o { } while(0)',
        line: 1
    });

    fail('if (false) { this.a = 1; } \\u0065lse { this.b = 1; }', {
        source: 'if (false) { this.a = 1; } \\u0065lse { this.b = 1; }',
        line: 1
    });

    fail('e\\u0078port var foo;', {
        source: 'e\\u0078port var foo;',
        line: 1
    });

    fail('try { } catch (e) {} f\\u0069nally { }', {
        source: 'try { } catch (e) {} f\\u0069nally { }',
        line: 1
    });

    fail('n\\u0065w function f() {}', {
        source: 'n\\u0065w function f() {}',
        line: 1
    });

    fail('class C extends function() {} { constructor() { sup\\u0065r() } }', {
        source: 'class C extends function() {} { constructor() { sup\\u0065r() } }',
        line: 1
    });

    fail('t\\u0072y { true } catch (e) {}', {
        source: 't\\u0072y { true } catch (e) {}',
        line: 1
    });

    fail('var x = typ\\u0065of "blah"', {
        source: 'var x = typ\\u0065of "blah"',
        line: 1
    });

    fail('v\\u0061r a = true', {
        source: 'v\\u0061r a = true',
        line: 1
    });

    fail('var { n\\u0075ll } = { 1 };', {
        source: 'var { n\\u0075ll } = { 1 };',
        line: 1
    });

    fail('n\\u0075ll = 1;', {
        source: 'n\\u0075ll = 1;',
        line: 1
    });

    fail('(x === tr\\u0075e);', {
        source: '(x === tr\\u0075e);',
        line: 1
    });

    fail('f\\u0061lse = 1;', {
        source: 'f\\u0061lse = 1;',
        line: 1
    });

    fail('(function*() { return (n++, y\\u0069eld 1); })()', {
        source: '(function*() { return (n++, y\\u0069eld 1); })()',
        line: 1
    });

    fail('class C { st\\u0061tic *bar() {} }', {
        source: 'class C { st\\u0061tic *bar() {} })',
        line: 1
    });

    fail('class C { st\\u0061tic *bar() {} }', {
        source: 'class C { st\\u0061tic *bar() {} })',
        line: 1
    });

    fail('class C { st\\u0061tic set bar() {} }', {
        source: 'class C { st\\u0061tic set bar() {} }',
        line: 1
    });

    fail('try { } c\\u0061tch (e) {}', {
        source: 'try { } c\\u0061tch (e) {}',
        line: 1
    });

    fail('(function() { return v\\u006fid 0; })()', {
        source: '(function() { return v\\u006fid 0; })()',
        line: 1
    });

    fail('var \\u{6e}ull = 123;', {
        source: 'var \\u{6e}ull = 123;',
        line: 1
    });

    fail('var \\u0073uper = 123;', {
        source: 'var \\u0073uper = 123;',
        line: 1
    });

    fail('thi\\u0073 = 123;', {
        source: 'thi\\u0073 = 123;',
        line: 1
    });

    fail('f\\u0061lse = 0;', {
        source: 'f\\u0061lse = 0;',
        line: 1
    });

    fail('tru\\u0065 = 0;', {
        source: 'tru\\u0065 = 0;',
        line: 1
    });

    fail('async() => { \\u0061wait: ;  };', {
        source: 'async() => { \\u0061wait: ;  };',
        line: 1
    });

    fail('"use strict"; var \\u0079ield = 123;', {
        source: '"use strict"; var \\u0079ield = 123;',
        line: 1
    });

    fail('\\u0076\\u0061\\u{0072} foo = 42;', {
        source: '\\u0076\\u0061\\u{0072} foo = 42;',
        line: 1
    });

    fail('i\\u0066 (false) {}', {
        source: 'i\\u0066 (false) {}',
        line: 1
    });

    fail('var i\\u0066;', {
        source: 'var i\\u0066;',
        line: 1
    });

    fail('i\\u006E', {
        source: 'i\\u006E',
        line: 1
    });

    fail('f\\u0061lse: ;', {
        source: 'f\\u0061lse: ;',
        line: 1
    });

    fail('f\\u0061lse: ;', {
        source: 'f\\u0061lse: ;',
        line: 1
    });

    fail('tru\\u0065: ;', {
        source: 'tru\\u0065: ;',
        line: 1
    });

    fail('var i\\u0066', {
        source: 'var i\\u0066',
        line: 1
    });

    fail('i\\u0066 (0)', {
        source: 'i\\u0066 (0)',
        line: 1
    });

    fail('var i\\u0066', {
        source: 'var i\\u0066',
        line: 1
    });

    fail('\\u{74}rue', {
        source: '\\u{74}rue',
        line: 1
    });

    fail('export { X \\u0061s Y }', {
        source: 'export { X \\u0061s Y }',
        module: true,
        line: 1
    });

    fail('import X fro\\u006d "foo"', {
        source: 'import X fro\\u006d "foo"',
        module: true,
        line: 1
    });

    fail('le\\u0074 x = 5', {
        source: 'le\\u0074 x = 5',
        line: 1
    });

    fail('function* () { y\\u0069eld 10 })', {
        source: 'function* () { y\\u0069eld 10 })',
        line: 1
    });

    fail('(async function() { aw\\u0061it x })', {
        source: '(async function() { aw\\u0061it x })',
        line: 1
    });

    fail('(\\u0061sync function() { await x })', {
        source: '(\\u0061sync function() { await x })',
        line: 1
    });

    fail('(\\u0061sync () => { await x })', {
        source: '(\\u0061sync () => { await x })',
        line: 1
    });

    fail('\\u0061sync x => { await x }', {
        source: '\\u0061sync x => { await x }',
        line: 1
    });

    fail('({ ge\\u0074 x() {} })', {
        source: '({ ge\\u0074 x() {} })',
        line: 1
    });

    fail('export \\u0061sync function y() { await x }', {
        source: 'export \\u0061sync function y() { await x }',
        module: true,
        line: 1
    });

    fail('export default \\u0061sync function () { await x }', {
        source: 'export default \\u0061sync function () { await x }',
        module: true,
        line: 1
    });

    fail('({ \\u0061sync x() { await x } })', {
        source: '({ \\u0061sync x() { await x } })',
        line: 1
    });

    fail('le\\u0074 a', {
        source: 'le\\u0074 a',
        line: 1
    });

    fail('for (x \\u006ff y) {}', {
        source: 'for (x \\u006ff y) {}',
        line: 1
    });

    fail('function *a(){yi\\u0065ld 0}', {
        source: 'function *a(){yi\\u0065ld 0}',
        line: 1
    });

    fail('unction *a(){var yi\\u0065ld}', {
        source: 'unction *a(){var yi\\u0065ld}',
        line: 1
    });

    fail('class X { st\\u0061tic y() {} }', {
        source: 'class X { st\\u0061tic y() {} }',
        line: 1
    });

    fail('"use strict"; var le\\u0074', {
        source: '"use strict"; var le\\u0074',
        line: 1
    });

    fail('function *a(){yi\\u0065ld 0}', {
        source: 'function *a(){yi\\u0065ld 0}',
        line: 1
    });

    fail('function *a(){var yi\\u0065ld}', {
        source: 'function *a(){var yi\\u0065ld}',
        line: 1
    });

    fail('for (a o\\u0066 b)', {
        source: 'for (a o\\u0066 b);',
        line: 1
    });

    pass(`var { y\\u0069eld } = {};`, {
        source: 'var { y\\u0069eld } = {};',
        raw: true,
        expected: {
            body: [{
                declarations: [{
                    id: {
                        properties: [{
                            computed: false,
                            key: {
                                name: 'yield',
                                type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            type: 'Property',
                            value: {
                                name: 'yield',
                                type: 'Identifier'
                            }
                        }],
                        type: 'ObjectPattern'
                    },
                    init: {
                        properties: [],
                        type: 'ObjectExpression'
                    },
                    type: 'VariableDeclarator'
                }],
                kind: 'var',
                type: 'VariableDeclaration'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`(y\\u0069eld);`, {
        source: '(y\\u0069eld);',
        raw: true,
        expected: {
            body: [{
                expression: {
                    name: 'yield',
                    type: 'Identifier'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`(\\u0069mplements = 1);`, {
        source: '(\\u0069mplements = 1);',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    left: {
                      name: 'implements',
                      type: 'Identifier',
                   },
                    operator: '=',
                    right: {
                      raw: '1',
                      type: 'Literal',
                      value: 1
                    },
                    type: 'AssignmentExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`var { p\\u0072ivate } = {};`, {
        source: 'var { p\\u0072ivate } = {};',
        raw: true,
        expected: {
              body: [
                {
                  declarations: [
                    {
                      id: {
                        properties: [
                         {
                            computed: false,
                            key: {
                              name: 'private',
                              type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            type: 'Property',
                            value: {
                              name: 'private',
                              type: 'Identifier'
                            }
                          }
                        ],
                        type: 'ObjectPattern'
                      },
                      init: {
                        properties: [],
                       type: 'ObjectExpression'
                      },
                      type: 'VariableDeclarator'
                    }
                  ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`(p\\u0072ivate = 1);`, {
        source: '(p\\u0072ivate = 1);',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    left: {
                      name: 'private',
                      type: 'Identifier'
                    },
                    operator: '=',
                    right: {
                     raw: '1',
                      type: 'Literal',
                      value: 1
                    },
                    type: 'AssignmentExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`var prot\\u0065cted = 1;`, {
        source: 'var prot\\u0065cted = 1;',
        raw: true,
        expected: {
              body: [
                {
                  declarations: [
                    {
                      id: {
                        name: 'protected',
                        type: 'Identifier',
                      },
                      init: {
                        raw: '1',
                        type: 'Literal',
                        value: 1,
                      },
                      type: 'VariableDeclarator',
                    },
                  ],
                  kind: 'var',
                 type: 'VariableDeclaration'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`var { st\\u0061tic } = {};`, {
        source: 'var { st\\u0061tic } = {};',
        raw: true,
        expected: {
              body: [
                {
                  declarations: [
                    {
                      id: {
                        properties: [
                          {
                            computed: false,
                            key: {
                              name: 'static',
                              type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            type: 'Property',
                            value: {
                              name: 'static',
                              type: 'Identifier'
                            }
                          }
                        ],
                        type: 'ObjectPattern'
                      },
                      init: {
                        properties: [],
                        type: 'ObjectExpression'
                      },
                      type: 'VariableDeclarator'
                    }
                  ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`(st\\u0061tic);`, {
        source: '(st\\u0061tic);',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    name: 'static',
                    type: 'Identifier'
                  },
                  type: 'ExpressionStatement'
                }
              ],
             sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`({i\\u0066: 0})`, {
        source: '({i\\u0066: 0})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            body: [{
                end: 14,
                expression: {
                    end: 13,
                    loc: {
                        end: {
                            column: 13,
                            line: 1,
                        },
                        start: {
                            column: 1,
                            line: 1,
                        }
                    },
                    properties: [{
                        computed: false,
                        end: 12,
                        key: {
                            end: 9,
                            loc: {
                                end: {
                                    column: 9,
                                    line: 1,
                                },
                                start: {
                                    column: 2,
                                    line: 1,
                                }
                            },
                            name: 'if',
                            start: 2,
                            type: 'Identifier',
                        },
                        kind: 'init',
                        loc: {
                            end: {
                                column: 12,
                                line: 1,
                            },
                            start: {
                                column: 2,
                                line: 1,
                            }
                        },
                        method: false,
                        shorthand: false,
                        start: 2,
                        type: 'Property',
                        value: {
                            end: 12,
                            loc: {
                                end: {
                                    column: 12,
                                    line: 1,
                                },
                                start: {
                                    column: 11,
                                    line: 1,
                                },
                            },
                            raw: '0',
                            start: 11,
                            type: 'Literal',
                            value: 0,
                        }
                    }],
                    start: 1,
                    type: 'ObjectExpression',
                },
                loc: {
                    end: {
                        column: 14,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                start: 0,
                type: 'ExpressionStatement'
            }, ],
            end: 14,
            loc: {
                end: {
                    column: 14,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: 'script',
            start: 0,
            type: 'Program'
        }
    });

    pass(`var le\\u0074`, {
                source: 'var le\\u0074',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'let',
                                start: 4,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            },
                            start: 4,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        }],
                        kind: 'var',
                        start: 0,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                }
            });

    pass(`(\\u0061sync ())`, {
        source: '(\\u0061sync ())',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            body: [{
                end: 15,
                expression: {
                    arguments: [],
                    callee: {
                        end: 11,
                        loc: {
                            end: {
                                column: 11,
                                line: 1,
                            },
                            start: {
                                column: 1,
                                line: 1,
                            }
                        },
                        name: 'async',
                        start: 1,
                        type: 'Identifier'
                    },
                    end: 14,
                    loc: {
                        end: {
                            column: 14,
                            line: 1,
                        },
                        start: {
                            column: 1,
                            line: 1,
                        },
                    },
                    start: 1,
                    type: 'CallExpression',
                },
                loc: {
                    end: {
                        column: 15,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                start: 0,
                type: 'ExpressionStatement',
            }, ],
            end: 15,
            loc: {
                end: {
                    column: 15,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: 'script',
            start: 0,
            type: 'Program',
        }
    });
});