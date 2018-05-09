define('cherow-flow', ['exports', 'cherow'], function (exports, cherow) { 'use strict';

  function parseFlow(source, options) {
      return options && options.module
          ? cherow.Parser.parse(source, options, 4096 | 8192)
          : cherow.Parser.parse(source, options, 0);
  }

  exports.parseFlow = parseFlow;

  Object.defineProperty(exports, '__esModule', { value: true });

});
