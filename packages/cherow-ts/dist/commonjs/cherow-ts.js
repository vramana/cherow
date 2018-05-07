'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cherow = require('cherow');

function parseTS(source, options) {
    return options && options.module
        ? cherow.Parser.parse(source, options, 4096 | 8192)
        : cherow.Parser.parse(source, options, 0);
}

exports.parseTS = parseTS;
