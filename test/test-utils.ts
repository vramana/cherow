import * as assert from 'clean-assert';
import * as t from 'assert';
import { parse } from '../src/parser';
import { Context } from '../src/utilities';
import * as ESTree from '../src/estree';

export interface Opts {
    source: string;
    expected?: any;
    line ?: number;
    column ?: number;
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
