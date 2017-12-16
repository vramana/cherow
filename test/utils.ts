import { writeFileSync, readdir, readFileSync, statSync } from 'fs';
import { join, resolve, extname, basename } from 'path';
import { parseScript, parseModule } from '../src/cherow';
import * as t from 'assert';

interface Opts {
    source: string;
    expected?: any;
    module ? : boolean;
    next ? : boolean;
    raw ? : boolean;
    ranges ? : boolean;
    loc ? : boolean;
    tolerant? : boolean;
    plugins? : any;
    directives? : any;
    jsx? : boolean;
    comments? : any;
    globalReturn?: boolean;
    impliedStrict?: boolean;
}

export const pass = (name: string, opts: Opts) => {

    const CherowOpts: any = {
        module: opts.module,
        next: opts.next,
        raw: opts.raw,
        loc: opts.loc,
        plugins: opts.plugins,
        toleran: opts.tolerant,
        directives: opts.directives,
        ranges: opts.ranges,
        globalReturn: opts.globalReturn,
        jsx: opts.jsx,
        impliedStrict: opts.impliedStrict,
        comments: opts.comments
    }
    const esprima = require('esprima').parseScript;
    it('Should pass "' + name + '"', () => {
        const parser = opts.module ? parseModule(opts.source, CherowOpts) : parseScript(opts.source, CherowOpts);
        t.deepEqual(parser, opts.expected);
    });
}

export const fail = (name: string, opts: Opts) => {

    const CherowOpts: any = {
        module: opts.module,
        next: opts.next,
        loc: opts.loc,
        ranges: opts.ranges,
        jsx: opts.jsx
    }

    it('Should fail on ' + name, () => {
        t.throws(() => {
            opts.module ? parseModule(opts.source, CherowOpts) : parseScript(opts.source, CherowOpts);
        });
    });
  
}