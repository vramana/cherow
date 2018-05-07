System.register([], function (exports, module) {
	'use strict';
	return {
		execute: function () {

			exports('minify', minify);
			function minify() { }

		}
	};
});
