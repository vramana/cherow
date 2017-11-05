const path = require("path")
const fs = require("fs")
const report = require("./report")
const cherow = require("../../dist/cherow")
const utils = require("./utils");

// Main
const run = (testDir, parse, shouldSkip) => {
    return utils.getTests(testDir, shouldSkip).then((tests) => {

        const total = tests.length;
        const reportInc = Math.floor(total / 20);

        console.log(`Now running ${total} tests...`);

        const results = tests.map((test, idx) => {
            if (idx % reportInc === 0) {
                console.log(`> ${Math.round(100 * idx / total)}% complete`);
            }

            return utils.runTest(test, parse);
        });

        return results
    });
};

    // Run the tests
    run(path.join(path.dirname(require.resolve("test262/package.json")), "test"),  (content, {
        sourceType
    }) => {
        return sourceType === 'script' ? cherow.parseScript(content, {
            sourceType,
            next: true
        }) : cherow.parseModule(content, {
            sourceType,
            next: true
        })

    }, testContent => (testContent.match(/^features: \[.*\b(regexp-named-groups|class-fields|regexp-unicode-property-escapes|regexp-lookbehind)\b.*\]$/m))).then((results) => report(results, []))

