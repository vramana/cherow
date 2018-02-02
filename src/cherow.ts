import * as ESTree from './estree';
import { Parser } from './parser';
import { Context } from './flags';

export type OnComment = void | ESTree.Comment[] | (
    (type: string, value: string, start: number, end: number) => any
);

export interface Options {
    comments?: OnComment;
    plugins?: any[];
    next?: boolean;
    ranges?: boolean;
    offset?: boolean;
    source?: boolean;
    loc?: boolean;
    raw?: boolean;
    early?: boolean;
}

function parse(source: string, context: Context, options: Options | void) {

    const comments: OnComment = [];
    let cherow: any = Parser;

    if (options != null) {
        if (options.next) context |= Context.OptionsNext;
        if (options.ranges) context |= Context.OptionsRanges;
        if (options.raw) context |= Context.OptionsRaw;
        if (options.loc) context |= Context.OptionsLoc;
        if (options.ranges) context |= Context.OptionsRanges;
        if (options.source) context |= Context.OptionsSource;
        if (options.early) context |= Context.OptionsEarly;
        if (options.comments) {
            context |= Context.OptionsComments;
        }

        // TODO! Cache this, and make sure the extended class are extended
        // once, and reused across parses.
        if (options.plugins) {
            for (const plugin of options.plugins) {
                cherow = plugin(Parser);
            }
        }
    }

    const parser = new cherow(source, comments);

    const node: ESTree.Program = {
        type: 'Program',
        sourceType: context & Context.Module ? 'module' : 'script',
        body: context & Context.Module
        ? parser.parseModuleItemList(context)
        : parser.parseStatementList(context)
    };

    if (context & Context.OptionsRanges) {
        node.start = 0;
        node.end = source.length;
    }

    if (context & Context.OptionsLoc) {

        node.loc = {
            start: {
                line: 1,
                column: 0,
            },
            end: {
                line: parser.line,
                column: parser.column
            }
        };

        if (context & Context.OptionsSource) {
            (node.loc as any).source = parser.fileName;
        }
    }

    if (context & Context.OptionsEarly) {
        node.earlyErrors = parser.earlyErors;
    }

    if (context & Context.OptionsComments) {
        node.comments = parser.comments;
    }

    return node;
}
 // https://tc39.github.io/ecma262/#sec-scripts

export const parseScript = (source: string, options ?: Options) => {
    return parse(source, Context.TopLevel, options);
};

// https://tc39.github.io/ecma262/#sec-modules

export const parseModule = (source: string, options ?: Options) => {
    return parse(source, Context.Strict | Context.Module | Context.TopLevel, options);
};

export const version = '__VERSION__';