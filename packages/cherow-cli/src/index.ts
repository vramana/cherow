// tslint:disable
import { parse } from 'cherow';
import {readFileSync as readFile} from "fs"
 var program = require('commander');

 program
   .version('__VERSION__')
  .arguments('<code / file>')
  .usage('[options] <entry file>')
  .option('-l, --loc', 'Attach line/column location information to each node')
  .option('-r, --ranges', 'Append start and end offsets to each node')
  .option('-m, --module', 'Enable module syntax')
  .option('-n, --next', 'Enable stage 3 support (ESNext)')
  .option('-g, --globalReturn', 'Allow return in the global scope')
  .option('-j, --jsx', 'Enable React JSX parsing')
  .option('-r, --raw', 'Attach raw property to each literal node')
  .option('-f, --sourcefile', 'Parse sourcefile instead of source code')
  .action(function(file) {

    try {
  //    if (program.sourcefile) file = readFile(program.file, "utf8")
      console.log(parse(file, {
        loc: program.loc,
        ranges: program.ranges,
        next: program.next,
        jsx: program.jsx,
        raw: program.raw,
        globalReturn: program.globalReturn,
        module: program.module
      }))
    } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
  }).on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    # parse module code');
    console.log('    cherow -m');
    console.log('');
  })
  .parse(process.argv);
