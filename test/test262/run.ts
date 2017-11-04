import { join, dirname } from 'path';
import { readFileSync } from 'fs';
import { parse } from '../../src/cherow';
import { report } from './report';
import { getTests, runTest } from './utils';

export const run = (testDir: string, parse: any, shouldSkip: any) => {
    
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
        (content: string, {
            sourceType,
            next /* Enable Async Iteration, Object Rest spread etc */
        }: any) => {
            return parse(content, {
                sourceType,
                next
            });
        },
        (testContent: string) => 
        (testContent.match(/^features: \[.*\b(regexp-named-groups|class-fields|regexp-unicode-property-escapes|regexp-lookbehind)\b.*\]$/m))).then((results: any) =>
         report(results, readFileSync('./test/test262/whitelist', 'utf8').split('\n').filter((v: string) => 
         v)));