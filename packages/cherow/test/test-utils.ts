import * as assert from 'clean-assert';
import * as t from 'assert';
import { parseSource } from '../src/parser/parser';
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
        const parser = parseSource(opts.source, undefined, context);
        assert.match(parser, opts.expected);
    });
};

export const fail = (name: string, context: Context, opts: Opts) => {
    it(name, () => {
        assert.throws(SyntaxError, () => {
            parseSource(opts.source, undefined, context);
        });
    });
};
