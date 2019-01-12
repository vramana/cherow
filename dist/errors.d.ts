import { ParserState } from './common';
import { RegexpState } from './scanner/common';
export declare function constructError(index: number, line: number, column: number, description: string): void;
export declare function reportRegExp(state: ParserState, type: Errors, ...params: string[]): RegexpState;
export declare function report(parser: ParserState, type: Errors, ...params: string[]): never;
//# sourceMappingURL=errors.d.ts.map