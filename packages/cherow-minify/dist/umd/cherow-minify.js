(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['cherow-minify'] = {})));
}(this, (function (exports) { 'use strict';

	function minify() { }

	exports.minify = minify;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
