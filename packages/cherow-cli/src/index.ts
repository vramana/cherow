// tslint:disable
import { parse } from 'cherow';
import {readFileSync as readFile} from "fs"
 var program = require('commander');
 var colors = require('colors');
 program
  .arguments('<code / file>')
  .usage('[options] <entry file>')
  .option('-l, --loc', 'Attach line/column location information to each node')
  .option('-r, --ranges', 'Append start and end offsets to each node')
  .option('-m, --module', 'Enable module syntax')
  .option('-n, --next', 'Enable stage 3 support (ESNext)')
  .option('-g, --globalReturn', 'Allow return in the global scope')
  .option('-j, --jsx', 'Enable React JSX parsing')
  .option('-r, --raw', 'Attach raw property to each literal node')
  .option('-s, --source', 'Parse sourcecode instead of inputing a file to parse')
  .action(function(file) {

    try {

      if (!program.source) file = readFile(file, "utf8")

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
  })
  .parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp(function (txt) {return colors.yellow(txt); });
  }

