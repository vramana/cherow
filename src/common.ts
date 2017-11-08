import { Chars } from './chars';
import { Statement, ExpressionStatement, Literal, Expression, Pattern } from './estree';
import { Flags } from './masks';

export const hasOwn = Object.prototype.hasOwnProperty;

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

export function fromCodePoint(codePoint: Chars): string {
    if (codePoint <= 0xFFFF) return String.fromCharCode(codePoint);
    return String.fromCharCode(((codePoint - 0x10000) >> 10) + 0x0D800, ((codePoint - 0x10000) & (1024 - 1)) + 0x0DC00);
}

export function toHex(code: Chars): number {
    if (code < Chars.Zero) return -1;
    if (code <= Chars.Nine) return code - Chars.Zero;
    if (code < Chars.UpperA) return -1;
    if (code <= Chars.UpperF) return code - Chars.UpperA + 10;
    if (code < Chars.LowerA) return -1;
    if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
    return -1;
}