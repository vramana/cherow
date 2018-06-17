import { match, throws } from 'clean-assert';
import { parseSource } from '../src/parser/parser';
import { Context } from '../src/common';

export interface Opts {
  source: string;
  expected?: any;
  line?: number;
  column?: number;
}

export const pass = (name: string, context: Context, opts: Opts) => {
  it(name, () => {
    const parser = parseSource(opts.source, undefined, context);
    match(parser, opts.expected);
  });
};

export const fail = (name: string, context: Context, opts: Opts) => {
  it(name, () => {
    throws(() => {
      parseSource(opts.source, undefined, context);
    });
  });
};
