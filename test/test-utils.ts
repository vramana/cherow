import { writeFileSync, readdir, readFileSync, statSync } from 'fs';
import { join, resolve, extname, basename } from 'path';
import { parseScript, parseModule } from '../src/cherow';

import { Program } from '../src/estree';
import * as t from 'assert';
interface Opts {
    source: string;
    expected ?: any;
    module ?: boolean;
    next ?: boolean;
    raw ?: boolean;
    ranges ?: boolean;
    offset ?: boolean;
    loc ?: boolean;
    early ?: boolean;
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
        toleran: opts.early,
        directives: opts.directives,
        ranges: opts.ranges,
        globalReturn: opts.globalReturn,
        jsx: opts.jsx,
        impliedStrict: opts.impliedStrict,
        comments: opts.comments,
        attachComment: opts.attachComment,
        early: opts.early,
        offset: opts.offset,
    };

    it('Should pass "' + name + '"', () => {
        opts.module ?
            t.deepEqual(parseModule(opts.source, CherowOpts) as any, opts.expected) :
            t.deepEqual(parseScript(opts.source, CherowOpts) as any, opts.expected);
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
        early: opts.early,
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

export function n(type: string, opts ?: any): any {
    if (opts == null) return {
        type
    };
    opts.type = type;
    return opts;
}