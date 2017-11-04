import { parseScript, parseModule } from '../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Cherow - Comments', () => {

    function pass(name: string, opts: any) {

        it(name, () => {
            const parser = parseScript(opts.source, { ranges: true});
            expect(parser.start).to.eql(opts.start)
            expect(parser.end).to.eql(opts.end)
            expect(parser.body).to.eql([])
        });
    }

    function passAll(name: (lt: string) => string, opts: (lt: string) => any) {
        pass(name("line feed"), opts("\n"));
        pass(name("carriage return"), opts("\r"));
        pass(name("Windows newline"), opts("\r"));
        pass(name("line separators"), opts("\u2028"));
        pass(name("paragraph separators"), opts("\u2029"));
    }

    passAll(lt => `skips multiple multiline comments with ${lt}`, lt => ({
        source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
        hasNext: false,
        start: 0, end: 33,
    }));

});