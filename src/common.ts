import { Chars } from './chars';
import { Statement, ExpressionStatement, Literal, Expression, Pattern } from './estree';
import { Token } from './token';
import { Flags, Context } from './masks';

export const hasOwn = Object.prototype.hasOwnProperty;

export function tryCreate(pattern: string, flags: string) {
    try {
        return new RegExp(pattern, flags);
    } catch (e) {
        return null;
    }
}

/**
 * Convert code points
 * @param codePoint
 */
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

/**
 * Returns true if the "node" contains a directive prologue
 *
 * @param node Statement
 */
/**
 * Returns true if the "node" contains a directive prologue
 *
 * @param node Statement
 */
export function isDirective(node: Statement): node is ExpressionStatement & {
    expression: Literal & {
        value: string
    };
} {
    return node.type === 'ExpressionStatement' &&
        node.expression.type === 'Literal' &&
        typeof node.expression.value === 'string';
}

/**
 * Returns true if match
 *
 * @param mask number
 * @param flags number
 */
export function hasMask(mask: number, flags: number) {
    return (mask & flags) === flags;
}

// Fully qualified element name, e.g. <svg:path> returns "svg:path"
export function getQualifiedJSXName(elementName: any): any{
    switch (elementName.type) {
        case 'JSXIdentifier':
            return elementName.name;
        case 'JSXNamespacedName':
            return elementName.namespace + ':' + elementName.name;
        case 'JSXMemberExpression':
            return (
                getQualifiedJSXName(elementName.object) + '.' +
                getQualifiedJSXName(elementName.property)
            );
       /* istanbul ignore next */
        default:
            // ignore
    }
}

export function isValidDestructuringAssignmentTarget(expr: Expression | Pattern): boolean {
    switch (expr.type) {
        case 'Identifier':
        case 'ArrayExpression':
        case 'ArrayPattern':
        case 'ObjectExpression':
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

export function isValidSimpleAssignmentTarget(expr: Expression | Pattern): boolean {
    switch (expr.type) {
        case 'Identifier':
        case 'MemberExpression':
            return true;
        default:
            return false;
    }
}
