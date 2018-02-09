import { Chars } from './chars';
import { Statement, ExpressionStatement, Literal, Expression, Pattern } from './estree';
import { Token } from './token';
import { mustEscape } from './unicode';

export const isInOrOfKeyword = (t: Token) => t === Token.InKeyword || t === Token.OfKeyword;

export const isPrologueDirective = (node: Statement): node is ExpressionStatement & {
    expression: Literal & { value: string }; } => node.type === 'ExpressionStatement' && node.expression.type === 'Literal';

export const hasBit = (mask: number, flags: number) => (mask & flags) === flags;

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

export function invalidCharacterMessage(cp: number): string {
        switch (cp) {
            case Chars.Null:
                return '\\0';
            case Chars.Backspace:
                return '\\b';
            case Chars.Tab:
                return '\\t';
            case Chars.LineFeed:
                return '\\n';
            case Chars.VerticalTab:
                return '\\v';
            case Chars.FormFeed:
                return '\\f';
            case Chars.CarriageReturn:
                return '\\r';
            default:
                if (!mustEscape(cp)) return fromCodePoint(cp);
                if (cp < 0x10) return `\\x0${cp.toString(16)}`;
                if (cp < 0x100) return `\\x${cp.toString(16)}`;
                if (cp < 0x1000) return `\\u0${cp.toString(16)}`;
                if (cp < 0x10000) return `\\u${cp.toString(16)}`;
                return `\\u{${cp.toString(16)}}`;
        }
    }