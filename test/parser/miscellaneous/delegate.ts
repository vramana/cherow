import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import { Node } from '../../../src/estree';
import * as t from 'assert';
import { parseScript } from '../../../src/cherow';

describe('Miscellaneous - Delegate', () => {

    describe('Pass', () => {

        it('AST node', () => {
            const delegate: any[] = [];
            parseScript('identifier', {
                delegate: function(ast: Node) {
                    delegate.push(ast);
                }as any});
            t.equal(delegate[0].type, 'Identifier');
            t.equal(delegate[0].name, 'identifier');
            t.equal(delegate[1].type, 'ExpressionStatement');
        });

        it('Singleline comment', () => {
            const delegate: any[] = [];
            parseScript('a // hello', {
                delegate: function(ast: Node) {
                    delegate.push(ast);
                }as any});
            t.equal(delegate[0].type, 'SingleLine');
        });

        it('Multiline comment', () => {
            const delegate: any[] = [];
            parseScript('/* multiline */', {
                delegate: function(ast: Node) {
                    delegate.push(ast);
                } as any});
            t.equal(delegate[0].type, 'MultiLine');
        });
    });
});