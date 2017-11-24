/**
 * Copyright (c) 2017 and later, Isiah Meadows. Licensed under the ISC License.
 */

// Execute the Test262 test suite with a parser. This checks for parser
// conformance correctly, and requires little configuration on your part.
//
// Options supported, `opts.test262Dir`, `opts.test`, and `opts.parse` are
// required:
// - `opts.test262Dir` - The directory to a clone of the Test262 suite
// - `opts.all` - Set to `true` to run all tests, and not just the
//   `test/**/language/` ones (most others are redundant)
// - `opts.annexB` - Set to `true` to run Annex B tests
// - `opts.test(name, callback)` - The function to call on each test, called
//   with the test name + a callback that runs the test
// - `opts.skip` - A list of features to skip.
// - `opts.ignore` - A list of globs to ignore.
// - `opts.parse(file, source, opts)` - Parse a script/module given a `file`,
//   its `source`, and various `opts`, where:
//     - `opts.features` is a dictionary of features
//     - `opts.type` is one of:
//         - `"non-strict"` - Parse it in non-strict mode as a script
//         - `"strict"` - Parse it in implicit strict mode as a script
//         - `"module"` - Parse it in implicit strict mode as a module
//
// Notes:
// - This depends on `glob` and `js-yaml`.
// - Some tests are run with a modified source and/or result. Look in
//   parser-test262-overrides.json to see which ones are modified.
// - Not all tests are run, just the language tests
// - If you lack an option to parse a script in strict mode without
//   `"use strict"`, you should prepend the string `'"use strict";\n'` before
//   parsing.
/* eslint-disable import/no-extraneous-dependencies, max-statements */

const fs = require("fs")
const path = require("path")
const {AssertionError} = require("assert")
const util = require("util")

const glob = require("glob")
const jsYaml = require("js-yaml")

const {evaled, overrides} = require("./test262-overrides.json")

export default (opts: any) => {
    const resolve = (dir: any) => path.resolve(opts.test262Dir, dir)
    // The rest are all testing built-ins, not the language (and thus are of
    // limited use for parsers)
    const ignore: any = []
    let globPath: any

    if (opts.all) {
        globPath = "test/**/*.js"
        if (!opts.annexB) ignore.push("test/annexB/**/*.js")
    } else if (opts.annexB) {
        globPath = "test{,/annexB}/language/**/*.js"
        ignore.push("test/annexB/language/eval-code/**/*.js")
    } else {
        globPath = "test/language/**/*.js"
    }

    const matched = glob.sync(resolve(globPath), {
        ignore: ignore.concat(opts.ignore || []).map(resolve),
        nodir: true,
        realpath: true,
    })

    for (const file of matched) {
        if (file.slice(-11) === "_FIXTURE.js") return
        const resolved = resolve(file)
        const relative = path.relative(opts.test262Dir, resolved)
            // Because Windows paths suck.
            .replace(/\\/g, "/")
        let desc = evaled[relative]

        if (desc == null) {
            const source = fs.readFileSync(resolved, "utf-8")
            const start = source.indexOf("/*---") + 5
            const end = source.indexOf("---*/", start)

            if (start < 5 || end < 0) {
                throw new TypeError("Missing YAML data block!")
            }

            const features = Object.create(null)
            const meta = jsYaml.safeLoad(source.slice(start, end), {
                filename: file,
            })
            const pass = overrides[relative] != null ||
                meta.negative == null ||
                meta.negative.phase !== "early" ||
                meta.negative.type !== "SyntaxError"
            let type = "both"

            if (meta.flags != null) {
                if (meta.flags.includes("module")) type = "module"
                else if (meta.flags.includes("onlyStrict")) type = "onlyStrict"
                else if (meta.flags.includes("noStrict")) type = "noStrict"
                else if (meta.flags.includes("raw")) type = "noStrict"
            }

            if (meta.features != null) {
                for (const feature of meta.features) features[feature] = true
            }

            desc = {source, type, features, pass}
        }

        const features = desc.features || Object.create(null)

        if (opts.skip != null) {
            for (const feature of opts.skip) if (features[feature]) return
        }

        const test = (type: any) => opts.test(`${relative} (${type})`, () => {
            if (desc.pass) {
                // Just let the test framework handle the error
                opts.parse(file, desc.source, {features, type})
            } else {
                let result: any

                try {
                    result = opts.parse(file, desc.source, {features, type})
                } catch (e) {
                    return
                }

                throw new AssertionError({
                    message: `(${type}) Expected an error to be thrown, ` +
                        `but returned: ${util.inspect(result).slice(0, 128)}`,
                    actual: result,
                    stackStartFunction: AssertionError,
                })
            }
        })

        switch (desc.type) {
        case "both":
            test("non-strict")
            test("strict")
            break

        case "module":
            test("module")
            break

        case "onlyStrict":
            test("strict")
            break

        case "noStrict":
            test("non-strict")
            break
        default:
            test("non-strict")
        }
    }
}