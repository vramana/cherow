import { Context } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
export declare function scanTemplate(state: ParserState, context: Context): Token;
export declare function consumeTemplateBrace(parser: ParserState, context: Context): Token;
export declare function scanLooserTemplateSegment(parser: ParserState, ch: number): number;
//# sourceMappingURL=template.d.ts.map