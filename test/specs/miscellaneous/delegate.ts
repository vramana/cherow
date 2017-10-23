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
    });