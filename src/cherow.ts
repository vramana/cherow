import { Context } from './masks';
import { Parser } from './parser';
import { Options } from './interface';
import { Program } from './estree';

// https://tc39.github.io/ecma262/#sec-scripts
export function parseScript(source: string, options?: Options): Program {
  return new Parser(source, options).parseProgram(options && options.impliedStrict ? Context.Strict : Context.None);
}

// https://tc39.github.io/ecma262/#sec-modules
export function parseModule(source: string, options?: Options): Program {
    return new Parser(source, options).parseProgram(Context.Strict | Context.Module);
}