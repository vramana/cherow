import { writeFileSync, readdir, readFileSync, statSync } from 'fs';
import { join, resolve, extname, basename } from 'path';
import { parseScript, parseModule, version } from '../src/cherow';
import { Program } from '../src/estree';
import * as t from 'assert';
interface Opts {
    source: string;
    expected ?: any;
    module ?: boolean;
    next ?: boolean;
    raw ?: boolean;
    ranges ?: boolean;
    loc ?: boolean;
    tolerant ?: boolean;
    plugins ?: any;
    directives ?: any;
    jsx ?: boolean;
    comments ?: any;
    attach ?: any;
    globalReturn ?: boolean;
    impliedStrict ?: boolean;
    attachComment ?: boolean;
    message ?: any;
    line ?: any;
    column ?: any;
    index ?: any;
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
        comments: opts.comments,
        attachComment: opts.attachComment,
        tolerant: opts.tolerant
    };

    it('Should pass "' + name + '"', () => {
        opts.module ?
            t.deepEqual(parseModule(opts.source, CherowOpts) as Program, opts.expected) :
            t.deepEqual(parseScript(opts.source, CherowOpts) as Program, opts.expected);
    });
};

export const fail = (name: string, opts: Opts) => {

    const CherowOpts: any = {
        module: opts.module,
        next: opts.next,
        raw: opts.raw,
        loc: opts.loc,
        plugins: opts.plugins,
        directives: opts.directives,
        ranges: opts.ranges,
        globalReturn: opts.globalReturn,
        jsx: opts.jsx,
        impliedStrict: opts.impliedStrict,
        comments: opts.comments,
        attachComment: opts.attachComment
    };
    it('Should fail on ' + name, () => {
        try {
            opts.module ?
                t.deepEqual(parseModule(opts.source, CherowOpts), opts.expected) :
                t.deepEqual(parseScript(opts.source, CherowOpts), opts.expected);
        } catch (e) {
           if (opts.message) t.equal(e.description, opts.message);
           if (opts.line) t.equal(e.lineNumber, opts.line);
           if (opts.column)t.equal(e.column, opts.column);
           if (opts.index)t.equal(e.index, opts.index);
           return;
        }
        throw new Error('Expecting error');
    });
};

it('version should be a string value', () => {
    // Version hasn't been replaced by Rollup at this stage
    t.equal(version, '__VERSION__');
});

export function n(type: string, opts ?: any): any {
    if (opts == null) return {
        type
    };
    opts.type = type;
    return opts;
}