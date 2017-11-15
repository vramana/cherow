import {  n,  fail, pass } from '../utils/test-utils';

describe('Literals - Strings', () => {
    
        fail('"\\u{g0g}"', '"\\u{g0g}"');
        fail('"\\u{g0g}"', '"\\u{g}"');
        fail('"\\u{g}"', '"\\u{g}"');
        fail('"\\u{g0}"', '"\\u{g0}"');
        fail('"\\u{g0}"', '"\\u{g0}"');
        fail('\\u{0g}', '\\u{0g}');
        fail('\\u{0g0}\r\n', '\\u{0g0}\r\n');
        fail('"\\u{g0g}"', '"\\u{g0g}"');
        fail('"\\u{110000}"', '"\\u{110000}"');
        fail('"\\u{11ffff}"', '"\\u{11ffff}"');
        fail('"\\x0g"', '"\\x0g"');
        fail('"\\xg0\r\n"', '"\\xg0\r\n"');
        fail('"\\xgg"', '"\\xgg"');
        fail('"\\xfg"', '"\\xfg"');
        fail('"\\xFG"', '"\\xFG"');
        fail('"\\u0g00"', '"\\u0g00"');
        fail('"\\u00g0"', '"\\u00g0"');
        fail('"\\uAA"', '"\\uAA"');
        fail('"\\uAAA"', '"\\uAAA"');
        fail(`'`, `'`);
        fail('"Hello\nworld"', '"Hello\nworld"');
        fail('"\n\r\t\v\b\f\\\'\"\0"', '"\n\r\t\v\b\f\\\'\"\0"');
        fail(`'`, `'`);
        fail('"use strict";  "\\08"', '"use strict"; \\08"');
        // fail(`"use strict";  "\\09"`, `"use strict";  "\\09"`);
        fail('"\\u{110000}"', '"\\u{110000}"');
        fail('"\\u{FFFFFFF}"', '"\\u{FFFFFFF}"');
        fail('"use strict"; ("\\000")', '"use strict"; ("\\000")');
        fail('"use strict"; ("\\000")', '"use strict"; ("\\000")');
        fail('"use strict"; ("\\001")', '"use strict"; ("\\001")');
        fail('"use strict"; ("\\123")', '"use strict"; ("\\123")');
        fail('"use strict"; ("\\01")', '"use strict"; ("\\01")');
        fail('"use strict"; ("\\41")', '"use strict"; ("\\41")');
        fail('"use strict"; ("\\1")', '"use strict"; ("\\1")');
        fail('"use strict"; ("\\4")', '"use strict"; ("\\4")');
        fail('"use strict"; ("\\11")', '"use strict"; ("\\11")');
        fail('"\\"', '"\\"');
        fail('"use strict"; "\\10";', '"use strict"; \\10";');
        fail('"use strict"; "\\16";', '"use strict"; "\\16";');
        fail('"use strict"; "\\31";', '"use strict"; "\\31";');
        fail('"use strict"; "\\106";', '"use strict"; "\\106";');
        fail('"use strict"; "\\207";', '"use strict"; "\\207";');
        fail('"use strict"; "\\10";', '"use strict"; "\\10";');
        fail('"use strict"; "\\052"', '"use strict"; "\\052"');
        fail('"use strict"; "\\376";', '"use strict"; "\\376";');
        fail('"use strict"; "a\\4";', '"use strict"; "a\\4";');
        fail('"use strict"; "z\\7";', '"use strict"; "z\\7";');
        fail('"use strict"; "\\10";', '"use strict"; "\\10";');
        fail('"use strict"; "\\1\\2\\7"', '"use strict"; "\\1\\2\\7"');
        fail('"use strict"; "\\u1"', '"use strict"; "\\u1"');
        fail('"use strict"; "\\u1"', '"use strict"; "\\u1"');
        fail('"use strict"; "\\uAAA"', '"use strict"; "\\uAAA"');
        fail('"\\uAAA"', '"\\uAAA"');
        fail('"use strict"; "\\u1"', '"use strict"; "\\u1"');
        fail('\'', '\'');
        fail('"', '"');
        fail('"\n"', '"\n"');
        fail('"', '"');

        pass('"abc"', '"abc"', {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "Literal",
                    value: "abc",
                    start: 0,
                    end: 5,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    },
                    raw: "\"abc\""
                },
                directive: "abc",
                start: 0,
                end: 5,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            }],
            sourceType: "script",
            start: 0,
            end: 5,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        });

        pass(`russian small - "\\б"`, `"\\б"`, {
            body: [{
                directive: "\\б",
                end: 4,
                expression: {
                    end: 4,
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"\\б\"",
                    start: 0,
                    type: "Literal",
                    value: "б",
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }, ],
            end: 4,
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: "script",
            start: 0,
            type: "Program",
        });

        pass(`russian small - "\\д"`, `"\\д"`, {
            body: [{
                directive: "\\д",
                end: 4,
                expression: {
                    end: 4,
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"\\д\"",
                    start: 0,
                    type: "Literal",
                    value: "д",
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }, ],
            end: 4,
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: "script",
            start: 0,
            type: "Program",
        });

        pass(`russian small - "\\ю"`, `"\\ю"`, {
            body: [{
                directive: "\\ю",
                end: 4,
                expression: {
                    end: 4,
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"\\ю\"",
                    start: 0,
                    type: "Literal",
                    value: "ю",
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }, ],
            end: 4,
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: "script",
            start: 0,
            type: "Program",
        });

        pass(`russian large - "\\З"`, `"\\З"`, {
            body: [{
                directive: "\\З",
                end: 4,
                expression: {
                    end: 4,
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"\\З\"",
                    start: 0,
                    type: "Literal",
                    value: "З",
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }, ],
            end: 4,
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: "script",
            start: 0,
            type: "Program",
        });

        pass(`russian large - "\\Щ"`, `"\\Щ"`, {
            body: [{
                directive: "\\Щ",
                end: 4,
                expression: {
                    end: 4,
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"\\Щ\"",
                    start: 0,
                    type: "Literal",
                    value: "Щ",
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }, ],
            end: 4,
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: "script",
            start: 0,
            type: "Program",
        });
    
        pass(`"\\r\\n"`, `"\\r\\n"`, {
            type: "Program",
            start: 0,
            end: 6,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 6,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                },
                directive: "\\r\\n",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    },
                    value: "\r\n",
                    raw: "\"\\r\\n\""
                }
            }],
            sourceType: "script"
        })

        pass(`"\\u0435"`, `"\\u0435"`, {
            type: "Program",
            start: 0,
            end: 8,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                },
                directive: "\\u0435",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    },
                    value: "е",
                    raw: "\"\\u0435\""
                }
            }],
            sourceType: "script"
        });

        pass(`"\\u0432"`, `"\\u0432"`, {
            type: "Program",
            start: 0,
            end: 8,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                },
                directive: "\\u0432",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    },
                    value: "в",
                    raw: "\"\\u0432\""
                }
            }],
            sourceType: "script"
        });

        pass(`"\\u0451"`, `"\\u0451"`, {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "Literal",
                    value: "ё",
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    },
                    raw: "\"\\u0451\""
                },
                directive: "\\u0451",
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                }
            }],
            sourceType: "script",
            start: 0,
            end: 8,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        });

        pass(`"\\n"`, `"\\n"`, {
            body: [{
                directive: "\\n",
                end: 4,
                expression: {
                    end: 4,
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"\\n\"",
                    start: 0,
                    type: "Literal",
                    value: "\n",
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }],
            end: 4,
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1
                }
            },
            sourceType: "script",
            start: 0,
            type: "Program"
        });

        pass(`"a\\r\\nb"`, `"a\\r\\nb"`, {
            body: [{
                directive: "a\\r\\nb",
                end: 8,
                expression: {
                    end: 8,
                    loc: {
                        end: {
                            column: 8,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"a\\r\\nb\"",
                    start: 0,
                    type: "Literal",
                    value: "a\r\nb",
                },
                loc: {
                    end: {
                        column: 8,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }, ],
            end: 8,
            loc: {
                end: {
                    column: 8,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: "script",
            start: 0,
            type: "Program"
        });

        pass(`"123"`, `"123"`, {
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "Literal",
                    value: "123",
                    start: 0,
                    end: 5,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    },
                    raw: "\"123\""
                },
                directive: "123",
                start: 0,
                end: 5,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 5
                    }
                }
            }],
            sourceType: "script",
            start: 0,
            end: 5,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 5
                }
            }
        });

        pass(`"\\u180E"`, `"\\u180E"`, {
            body: [{
                directive: "\\u180E",
                end: 8,
                expression: {
                    end: 8,
                    loc: {
                        end: {
                            column: 8,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1
                        }
                    },
                    raw: "\"\\u180E\"",
                    start: 0,
                    type: "Literal",
                    value: "᠎",
                },
                loc: {
                    end: {
                        column: 8,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }],
            end: 8,
            loc: {
                end: {
                    column: 8,
                    line: 1
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: "script",
            start: 0,
            type: "Program"
        });

        pass(`"\\x00"`, `"\\x00"`, {
            body: [{
                directive: "\\x00",
                end: 6,
                expression: {
                    end: 6,
                    loc: {
                        end: {
                            column: 6,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"\\x00\"",
                    start: 0,
                    type: "Literal",
                    value: "\u0000",
                },
                loc: {
                    end: {
                        column: 6,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }],
            end: 6,
            loc: {
                end: {
                    column: 6,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: "script",
            start: 0,
            type: "Program"
        });

        pass(`"\\u{11000}"`, `"\\u{11000}"`, {
            body: [{
                directive: "\\u{11000}",
                end: 11,
                expression: {
                    end: 11,
                    loc: {
                        end: {
                            column: 11,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: "\"\\u{11000}\"",
                    start: 0,
                    type: "Literal",
                    value: "𑀀",
                },
                loc: {
                    end: {
                        column: 11,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: "ExpressionStatement",
            }],
            end: 11,
            loc: {
                end: {
                    column: 11,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: "script",
            start: 0,
            type: "Program"
        });

        pass(`"\\u0006A"`, `"\\u0006A"`, {
            type: "Program",
            start: 0,
            end: 9,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                },
                directive: "\\u0006A",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    },
                    value: "\u0006A",
                    raw: "\"\\u0006A\""
                }
            }],
            sourceType: "script"
        })

        pass(`"\\7"`, `"\\7"`, {
            body: [{
                directive: "\\7",
                end: 4,
                expression: {
                    end: 4,
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    raw: "\"\\7\"",
                    start: 0,
                    type: "Literal",
                    value: "\u0007",
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                start: 0,
                type: "ExpressionStatement",
            }],
            end: 4,
            loc: {
                end: {
                    column: 4,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: "script",
            start: 0,
            type: "Program"
        });

        pass('"Hello\\012World"', '"Hello\\012World"', {
            type: "Program",
            start: 0,
            end: 16,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                directive: "Hello\\012World",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    value: "Hello\nWorld",
                    raw: "\"Hello\\012World\""
                }
            }],
            sourceType: "script"
        })

        pass('"Hello\\122World"', '"Hello\\122World"', {
            type: "Program",
            start: 0,
            end: 16,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                directive: "Hello\\122World",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    value: "HelloRWorld",
                    raw: "\"Hello\\122World\""
                }
            }],
            sourceType: "script"
        })

        pass('"Hello\\412World"', '"Hello\\412World"', {
            type: "Program",
            start: 0,
            end: 16,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                directive: "Hello\\412World",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    value: "Hello!2World",
                    raw: "\"Hello\\412World\""
                }
            }],
            sourceType: "script"
        })

        pass('"Hello\\712World"', '"Hello\\712World"', {
            type: "Program",
            start: 0,
            end: 16,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                directive: "Hello\\712World",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    value: "Hello92World",
                    raw: "\"Hello\\712World\""
                }
            }],
            sourceType: "script"
        })

        pass('"Hello\\1World"', '"Hello\\1World"', {
            type: "Program",
            start: 0,
            end: 14,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                directive: "Hello\\1World",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    value: "Hello\u0001World",
                    raw: "\"Hello\\1World\""
                }
            }],
            sourceType: "script"
        })

        pass(`"\\xff"`, `"\\xff"`, {
            type: "Program",
            start: 0,
            end: 6,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            },
            body: [{
                type: "ExpressionStatement",
                start: 0,
                end: 6,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                },
                directive: "\\xff",
                expression: {
                    type: "Literal",
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    },
                    value: "ÿ",
                    raw: "\"\\xff\""
                }
            }],
            sourceType: "script"
        })
    });