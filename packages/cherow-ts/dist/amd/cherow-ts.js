define('cherow-ts', ['exports', 'cherow'], function (exports, cherow) { 'use strict';

  function parseTS(source, options) {
      return options && options.module
          ? cherow.Parser.parse(source, options, 4096 | 8192)
          : cherow.Parser.parse(source, options, 0);
  }

  exports.parseTS = parseTS;

  Object.defineProperty(exports, '__esModule', { value: true });

});
