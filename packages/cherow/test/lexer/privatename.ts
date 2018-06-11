import * as t from 'assert';
import { scanPrivateName } from '../../src/lexer/common';
import { createParserObject } from '../../src/parser/parser';

describe('Lexer - Private name', () => {

  function pass(name: string, opts: any) {
      it(name, () => {
          const parser = createParserObject(opts.source, undefined);
          const token = scanPrivateName(parser);
          t.deepEqual({
              line: parser.line,
              column: parser.column,
              index: parser.index,
          }, {
              line: opts.line,
              column: opts.column,
              index: opts.index
          }, );
      });
  }

  function fail(name: string, opts: any) {
      it(name, () => {
          const parser = createParserObject(opts.source, undefined);
          t.throws(() => {
              scanPrivateName(parser)
          });
      });
  }

  fail('should fail on private name followed by space', {
      source: '# a'
  })

  fail('should fail on private name with multiple space', {
      source: '#    a'
  })

  fail('should fail on private name with digits', {
      source: '#123'
  })

  fail('should fail on private name with underscore', {
      source: '#_a'
  })

  pass('should accept private name followed by identifier', {
      source: '#a',
      line: 1,
      column: 0,
      index: 0
  });

  pass('should accept private name followed by identifier', {
      source: '#abc',
      line: 1,
      column: 0,
      index: 0
  });
});
