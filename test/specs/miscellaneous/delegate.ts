import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Delegate', () => {

    it('should receive all the node', () => {
        const list: any = [];

        function collect(node: any) {
            list.push(node.type);
        }

        parseScript('answer = 42', {
            delegate: collect
        });
        expect(list.length).to.eql(4);
        expect(list).to.eql(['Identifier', 'Literal', 'AssignmentExpression', 'ExpressionStatement']);
    });

    it('should be able to walk the tree and pick a node', () => {
        let constant = null;

        function walk(node: any) {
            if (node.type === 'Literal') {
                constant = node;
            }
        }
        parseScript('answer = 42 // universe', {
            delegate: walk,
            raw: true
        });

        expect(constant).to.eql({
            type: 'Literal',
            value: 42,
            raw: '42'
        });
    });

    it('should work with single line comments', () => {
        let nodes: any[] = [];
        parseScript('1 // universe', {
            delegate: (node: any) => {
                nodes.push(node);
            },
            comments: [],
            raw: true
        });

        expect(nodes.length).to.eql(3);
        expect(nodes[0].type).to.eql('Line');
        expect(nodes[1].type).to.eql('Literal');
        expect(nodes[2].type).to.eql('ExpressionStatement');

    });

    it('should work with block comments', () => {
        let nodes: any[] = [];
        parseScript('1 /* foo */', {
            delegate: (node: any) => {
                nodes.push(node);
            },
            comments: [],
            raw: true
        });

        expect(nodes.length).to.eql(3);
        expect(nodes[0].type).to.eql('Block');
        expect(nodes[1].type).to.eql('Literal');
        expect(nodes[2].type).to.eql('ExpressionStatement');
    });

    it('should have correct ranges', () => {
        parseScript('1', {
            delegate: (node: any, start: number, end: number) => {
                expect(start).to.eql(0);
                expect(end).to.eql(1);
            },
            comments: [],
            raw: true,
            ranges: true
        });
    });

    it('should have correct locations', () => {
        parseScript('1', {
            delegate: (node: any, start: number, end: number, loc: any) => {
                expect(loc.start.line).to.eql(1);
                expect(loc.start.column).to.eql(0);
                expect(loc.start.offset).to.eql(1);
                expect(start).to.eql(0);
                expect(end).to.eql(1);
            },
            comments: [],
            raw: true,
            locations: true
        });
    });

});