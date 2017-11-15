import { T_Node, Program, CommentType, Comment, AssignmentProperty, Property, Literal, RegExpLiteral } from '../../../src/estree';
import { parseScript, parseModule } from '../../../src/cherow';
import * as t from 'assert';

// Overloads to avoid a bunch of annoying casts
export function n(type: 'Property', opts: Partial<AssignmentProperty>): AssignmentProperty;
export function n(type: 'Property', opts: Partial<Property>): Property;
export function n(type: 'Literal', opts: Partial<RegExpLiteral>): RegExpLiteral;
export function n(type: 'Literal', opts: Partial<Literal>): Literal;

export function n(type: CommentType, opts: Partial<Comment>): Comment;
export function n<T extends keyof T_Node>(type: T, opts?: Partial<T_Node[T]>): T_Node[T];

export function n(type: string, opts?: any): any {
    if (opts == null) return {type};
    opts.type = type;
    return opts;
}

export const fail = (name: string, program: string, module: boolean = false) => {
    it('should fail on ' + name, () => {
        t.throws(() => {
            module ? parseModule(program) : parseScript(program);
        });
    });
};

export const test = (program: string, expected: any, opts?: any, module: boolean = false) => {
    it('should parse - "' + program + '"', () => {
        t.deepEqual((module ? parseModule : parseScript)(program, opts), expected);
    });
};

export const testWithLocations = (program: string, expected: Program, opts: any = {
    locations: true,
    ranges: true,
    raw: true
}, module: boolean = false) => {
    it('should parse - "' + program + '"', () => {
        t.deepEqual((module ? parseModule : parseScript)(program, opts), expected);
    });
};

export const pass = (name: string, source: string, expected: any, opts?: any, module: boolean = false) => {
    it('should ' + name, () => {
        t.deepEqual(module ? parseModule(source, {
            locations: true,
            ranges: true,
            raw: true
        }) : parseScript(source, {
            locations: true,
            ranges: true,
            raw: true,
            next: true,
            v8: true,
            jsx: true,
            directives: true
        }), expected);
    });
};