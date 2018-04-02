import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseScript } from '../../../src/cherow';

describe('Miscellaneous - Delegate', () => {

    describe('Pass', () => {
        const delegate: any = [];
        parseScript('identifier', { delegate:  function(node: any) {
            delegate.push(node);
        } as any });
        t.equal(delegate[0].type, 'Identifier');
        t.equal(delegate[0].name, 'identifier');
        t.equal(delegate[1].type, 'ExpressionStatement');
    });
});
