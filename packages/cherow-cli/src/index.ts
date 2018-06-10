import { parse } from 'cherow';
import fs from 'fs';
import program from 'commander';  // tslint:disable-line import-name
import chalk from 'chalk';

program
  .arguments('<code / file>')
  .usage('[options] <entry file / source code>')
  .option('-l, --loc', 'Attach line/column location information to each node')
  .option('-r, --ranges', 'Append start and end offsets to each node')
  .option('-m, --module', 'Enable module syntax')
  .option('-e, --experimental', 'Enable experimental features')
  .option('-n, --next', 'Enable stage 3 support (ESNext)')
  .option('-g, --globalReturn', 'Allow return in the global scope')
  .option('-j, --jsx', 'Enable React JSX parsing')
  .option('-r, --raw', 'Attach raw property to each literal node')
  .option('-s, --source', 'Parse sourcecode instead of inputing a file to parse')
  .action(file => {
    // tslint:disable
    try {
      if (!program.source) file = fs.readFileSync(file, 'utf8');
      console.log(JSON.stringify(parse(file, {
        loc: program.loc,
        ranges: program.ranges,
        next: program.next,
        jsx: program.jsx,
        raw: program.raw,
        globalReturn: program.globalReturn,
        module: program.module
      }), null, 2));
    } catch (e) {
      process.stderr.write(e.message);
      process.exit(1);
    }
    // tslint:enable
  })
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(chalk.yellow);
}
