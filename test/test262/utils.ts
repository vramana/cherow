/**
 * Some of the code in this file are "extracted" from  a MIT-licensed test runner implemented 
 * by Mike Pennisi for the babel project.
 */

import { relative, join } from 'path';

const fs = require("graceful-fs");
const promisify = require("util.promisify");
const pfs = {
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  readdir: promisify(fs.readdir),
  stat: promisify(fs.stat)
};

const modulePattern = /^\s*-\s*module\s*$|^\s*flags\s*:.*\bmodule\b/m;
const noStrictPattern = /^\s*-\s*noStrict\s*$|^\s*flags\s*:.*\bnoStrict\b/m;
const onlyStrictPattern = /^\s*-\s*onlyStrict\s*$|^\s*flags\s*:.*\bonlyStrict\b/m;
const rawPattern = /^\s*-\s*raw\s*$|^\s*flags\s*:.*\braw\b/m;
const testNamePattern = /^(?!.*_FIXTURE).*\.[jJ][sS]$/;

function flatten(array: any) {
  const flattened: any = [];
  array.forEach((element: any) => {
    if (Array.isArray(element)) {
      flattened.push.apply(flattened, element);
    } else {
      flattened.push(element);
    }
  });
  return flattened;
}

function hasEarlyError(src: any) {
  return !!(
    src.match(/^\s*negative:\s*$/m) && src.match(/^\s+phase:\s*early\s*$/m)
  );
}

function readDirDeep(dirName: any) {
  return pfs.readdir(dirName).then((contents: any) => {
    return Promise.all(
      contents.map((name: any) => {
        return findTests(join(dirName, name));
      })
    ).then(flatten);
  });
}

function findTests(name: any) {
  return pfs.stat(name).then((stat: any) => {
    if (stat.isDirectory()) {
      return readDirDeep(name);
    }

    return name;
  });
}

function readTest(fileName: any, testDir: any, shouldSkip: any) {
  if (!testNamePattern.test(fileName)) {
    return Promise.resolve([]);
  }

  return pfs.readFile(fileName, "utf-8").then((contents: any) => {
    return makeScenarios(relative(testDir, fileName), contents, shouldSkip(contents));
  });
}

function makeScenarios(fileName: any, testContent: any, skip: any) {
  const scenarios = [];
  const base = {
    fileName: fileName,
    isModule: modulePattern.test(testContent),
    expectedError: hasEarlyError(testContent),
    skip
  };
  const isNoStrict = noStrictPattern.test(testContent);
  const isOnlyStrict = onlyStrictPattern.test(testContent);
  const isRaw = rawPattern.test(testContent);

  if (!isOnlyStrict) {
    scenarios.push(
      Object.assign(
        {
          id: fileName + "(default)",
          content: testContent,
        },
        base
      )
    );
  }

  if (!isNoStrict && !isRaw) {
    scenarios.push(
      Object.assign(
        {
          id: fileName + "(strict mode)",
          content: "'use strict';\n" + testContent,
        },
        base
      )
    );
  }

  return scenarios;
}

export const getTests = (testDir: any, shouldSkip: any) => {
  return findTests(testDir)
    .then((testPaths: any) => {
      return Promise.all(
        testPaths.map((path: any) => {
          return readTest(path, testDir, shouldSkip);
        })
      );
    })
    .then(flatten);
};

export const runTest = (test: any, parse: any) => {
    
  if (test.skip) return test
  const sourceType = test.isModule ? 'module' : 'script';
  const next = true;

  try {
    parse(test.content, { sourceType, next });
    test.actualError = false;
  } catch (err) {
    test.actualError = true;
  }

  return test;
};

export const interpret = (results: any, whitelist: any) => {
  whitelist = whitelist.reduce((res: any, v: any) => {
    res[v] = true
    return res
  }, {})
  const summary: any = {
    passed: true,
    allowed: {
      success: [],
      failure: [],
      falsePositive: [],
      falseNegative: [],
    },
    disallowed: {
      success: [],
      failure: [],
      falsePositive: [],
      falseNegative: [],
    },
    unrecognized: null,
    skipped: []
  };

  results.forEach((result: any) => {
    let classification: any, isAllowed: any;
    const inWhitelist = result.id in whitelist;
    delete whitelist[result.id];

    if (result.skip) {
      summary.skipped.push(result)
      return
    } else if (!result.expectedError) {
      if (!result.actualError) {
        classification = "success";
        isAllowed = !inWhitelist;
      } else {
        classification = "falseNegative";
        isAllowed = inWhitelist;
      }
    } else {
      if (!result.actualError) {
        classification = "falsePositive";
        isAllowed = inWhitelist;
      } else {
        classification = "failure";
        isAllowed = !inWhitelist;
      }
    }

    summary.passed &= isAllowed;
    summary[isAllowed ? "allowed" : "disallowed"][classification].push(result);
  });

  summary.unrecognized = Object.keys(whitelist);
  summary.passed = !!summary.passed && summary.unrecognized.length === 0;

  return summary;
};