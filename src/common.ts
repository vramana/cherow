import { Chars } from './chars';
import { Statement, ExpressionStatement, Literal, Expression, Pattern } from './estree';
import { Flags } from './masks';

export function isPrologueDirective(node: Statement): node is ExpressionStatement & {
    expression: Literal & {
        value: string
    };
} {
    return node.type === 'ExpressionStatement' &&
        node.expression.type === 'Literal';
}

export function hasMask(mask: number, flags: number) {
    return (mask & flags) === flags;
}

export const fromCodePoint = (code: Chars) => {
    if (code <= 0xFFFF) return String.fromCharCode(code);
    return String.fromCharCode(((code - Chars.NonBMPMin) >> 10) +
        Chars.LeadSurrogateMin, ((code - Chars.NonBMPMin) & (1024 - 1)) + Chars.TrailSurrogateMin);
};

export const toHex = (code: Chars) => {
    if (code < Chars.Zero) return -1;
    if (code <= Chars.Nine) return code - Chars.Zero;
    if (code < Chars.UpperA) return -1;
    if (code <= Chars.UpperF) return code - Chars.UpperA + 10;
    if (code < Chars.LowerA) return -1;
    if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
    return -1;
};