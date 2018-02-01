import { Chars } from './chars';
import { Statement, ExpressionStatement, Literal, Expression, Pattern } from './estree';
import { Token } from './token';

export const isInOrOfKeyword = (t: Token) => t === Token.InKeyword || t === Token.OfKeyword;

export const isPrologueDirective = (node: Statement): node is ExpressionStatement & {
    expression: Literal & { value: string }; } => node.type === 'ExpressionStatement' && node.expression.type === 'Literal';

export const hasMask = (mask: number, flags: number) => (mask & flags) === flags;

export const fromCodePoint = (code: Chars) => {
    return code <= 0xFFFF
    ? String.fromCharCode(code)
    : String.fromCharCode(((code - Chars.NonBMPMin) >> 10) +
        Chars.LeadSurrogateMin, ((code - Chars.NonBMPMin) & (1024 - 1)) + Chars.TrailSurrogateMin);
};

export function toHex(code: number): number {
    if (code < Chars.Zero) return -1;
    if (code <= Chars.Nine) return code - Chars.Zero;
    if (code < Chars.UpperA) return -1;
    if (code <= Chars.UpperF) return code - Chars.UpperA + 10;
    if (code < Chars.LowerA) return -1;
    if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
    return -1;
}

export function isValidSimpleAssignmentTarget(expr: Expression | Pattern): boolean {
    switch (expr.type) {
        case 'Identifier':
        case 'MemberExpression':
            return true;
        default:
            return false;
    }
}

export const map = (() => {
    if (typeof Map === 'function') {
        return {
            create: () => new Map(),
            get: (m: any, k: any) => m.get(k),
            set: (m: any, k: any, v: any) => m.set(k, v),
        };
    } else {
        return {
            create: () => Object.create(null),
            get: (m: any, k: any) => m[k],
            set: (m: any, k: any, v: any) => m[k] = v,
        };
    }
})();

export function isValidDestructuringAssignmentTarget(expr: Expression | Pattern): boolean {
    switch (expr.type) {
        case 'Identifier':
        case 'ArrayExpression':
        case 'ArrayPattern':
        case 'ObjectExpression':
        case 'RestElement':
        case 'ObjectPattern':
        case 'MemberExpression':
        case 'ClassExpression':
        case 'CallExpression':
        case 'TemplateLiteral':
        case 'AssignmentExpression':
        case 'NewExpression':
            return true;

        default:
            return false;
    }
}