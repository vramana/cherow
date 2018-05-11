import chalk from 'chalk';
import minimist from 'minimist';
import help from 'help.md';
import { version } from 'package.json';
import { parseScript, parseModule } from 'cherow';

const command = minimist(process.argv.slice(2));

if (command.help || (process.argv.length <= 2 && process.stdin.isTTY)) {
	console.log(`\n${help.replace('__VERSION__', version)}\n`);
} else if (command.version) {
	console.log(`cherow version ${version}`);
} else {
  if (command._.length >= 1) {
		if (command.input) {
			reportError({code: 'Test123 345', message: 'Something went wrong' });
		}
  }
}

function reportError(err: any) {
	let description = err.message || err;
	if (err.name) description = `${err.name}: ${description}`;
	const message = description) || err;

	stderr(chalk.bold.red(`[!] ${chalk.bold(message.toString())}`));

		if (err.url) {
		stderr(chalk.cyan(err.url));
	}

	if (err.loc) {
		stderr(`${relativeId(err.loc.file || err.id)} (${err.loc.line}:${err.loc.column})`);
	} else if (err.id) {
		stderr(relativeId(err.id));
	}

	if (err.frame) {
		stderr(chalk.dim(err.frame));
	} else if (err.stack) {
		stderr(chalk.dim(err.stack));
	}

	stderr('');

	process.exit(1);
}
