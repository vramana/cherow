import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import { parse } from '../../src/cherow';
import { report } from './report';
import { getTests, runTest } from './utils';

export const run = (testDir: any, parse: any, shouldSkip: any) => {
  
      return getTests(testDir, shouldSkip).then((tests: any) => {
  
          const total = tests.length;
          const reportInc = Math.floor(total / 20);
  
          console.log(`Now running ${total} tests...`);
  
          const results = tests.map((test: any, idx: any) => {
              if (idx % reportInc === 0) {
                  console.log(`> ${Math.round(100 * idx / total)}% complete`);
              }
  
              return runTest(test, parse);
          });
  
          return results
      });
  };
  
run(join(dirname(require.resolve('test262/package.json')), 'test'),
      (content: any, {
          sourceType
      }: any) => {
          return parse(content, {
              sourceType
          });
      },
      (testContent: any) => false).then((results: any) => report(results, readFileSync('./whitelist', 'utf8').split('\n').filter((v: string) => v)));