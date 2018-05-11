import { parse } from 'cherow';
import {readFileSync as readFile } from 'fs';
let infile, forceFile;

const options: any = {};

function help(status) {
  const print = (status === 0) ? console.log : console.error;
  print('usage: ' + basename(process.argv[1]) + ' [--strict] [--loc] [---module] [--next] [--ranges] [--module] [infile]');
  process.exit(status);
}

for (let i = 2; i < process.argv.length; ++i) {
  const arg = process.argv[i];
  if ((arg === '-' || arg[0] != '-') && !infile) infile = arg;
  else if (arg === '--' && !infile && i + 2 === process.argv.length) forceFile = infile = process.argv[++i];
  else if (arg === '--loc') options.loc = true;
  else if (arg === '--ranges') options.ranges = true;
  else if (arg === '--next') options.next = true;
  else if (arg === '--strict') options.implicit = true;
  else if (arg === '--help') help(0);
    else if (arg === '--module') options.module = 'module';
  else {
      help(1);
  }
}

function run(code: any): any {
  let result;
  try {
      result = parse(code, options);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
  console.log(JSON.stringify(result, null, 2));
}

if (forceFile || infile && infile !== '-') {
  run(readFile(infile, 'utf8'));
} else {
  let code = '';
  process.stdin.resume();
  process.stdin.on('data', chunk => code += chunk);
  process.stdin.on('end', () => run(code));
}
