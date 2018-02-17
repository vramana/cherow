import * as ESTree from './estree';
import { Parser } from './parser';
import { Context } from './flags';

export type PluginHandler = (core: any) => void;

export type OnComment = void | ESTree.Comment[] | (
    (type: string, value: string, start: number, end: number) => any
);

export interface Options {
    comments?: OnComment;
    plugins?: PluginHandler[];
    next?: boolean;
    ranges?: boolean;
    offset?: boolean;
    source?: string;
    loc?: boolean;
    raw?: boolean;
    jsx?: boolean;
    tolerate ?: boolean;
    impliedStrict ?: boolean;
}

export const pluginClassCache: {
    [key: string]: any
} = {};

function parse(source: string, context: Context, options: Options | void) {

    const comments: OnComment = [];
    let sourceFile: string = '';
    let cherow;

    if (options != null) {

        if (options.source) {
            sourceFile = options.source;
        }

        if (options.plugins) {
            const key = options.plugins.join('/');
            cherow = pluginClassCache[key];
            if (!cherow) {
                cherow = Parser;
                for (const plugin of options.plugins) {
                    cherow = plugin(cherow);
                }
                pluginClassCache[key] = cherow;
            }
        }
    }

    return new(cherow ?
        cherow :
        Parser)(source, comments, sourceFile).parseProgram(context, options);
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