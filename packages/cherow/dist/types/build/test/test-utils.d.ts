import { Context } from '../src/utilities';
export interface Opts {
    source: string;
    expected?: any;
    line?: number;
    column?: number;
}
export declare const pass: (name: string, context: Context, opts: Opts) => void;
export declare const fail: (name: string, context: Context, opts: Opts) => void;
