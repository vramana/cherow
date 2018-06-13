import * as assert from 'clean-assert';
import * as ESTree from '../../cherow/src/estree';
import { Context } from '../../cherow/src/utilities';
import * as t from 'assert';
import { parse } from '../../cherow/src/parser/parser';

export interface Opts {
  source: string;
  expected?: any;
  line?: number;
  column?: number;
}

export const pass = (name: string, context: Context, opts: Opts) => {
  it(name, () => {
    const parser = parse(opts.source, undefined, context);
    assert.match(parser, opts.expected);
  });
};

export const fail = (name: string, context: Context, opts: Opts) => {
  it(name, () => {
    assert.throws(SyntaxError, () => {
      parse(opts.source, undefined, context);
    });
  });
};
