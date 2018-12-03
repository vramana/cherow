// https://github.com/lydell/eslump#test-files

"use strict";

const cherow = require("../../dist/umd/cherow");
const testParser = require("./parser");

function parse(code, generatorOptions) {
  const parseFunction =
    generatorOptions.sourceType === "module"
      ? cherow.parseModule
      : cherow.parseScript;
  return parseFunction(code);
}

module.exports = testParser(parse);
