(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('cherow')) :
  typeof define === 'function' && define.amd ? define(['exports', 'cherow'], factory) :
  (factory((global['cherow-flow'] = {}),global.cherow));
}(this, (function (exports,cherow) { 'use strict';

  function parseFlow(source, options) {
      return options && options.module
          ? cherow.Parser.parse(source, options, 4096 | 8192)
          : cherow.Parser.parse(source, options, 0);
  }

  exports.parseFlow = parseFlow;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
