import { match, throws } from 'clean-assert';
import { parseSource } from '../src/parser/parser';
import { Context } from '../src/common';

export const pass = (name: string, valids: Array < [string, string, Context, any] >) => {
  describe(name, () => {
      for (const [name, source, ctx, expected] of valids) {
          it(name, () => {
              const parser = parseSource(source, undefined, ctx);
              match(parser, expected);
          });
      }
  });
};

export const fail = (name: string, invalid: Array < [string, string, Context, string] >) => {
  describe(name, () => {
      for (const [name, source, ctx] of invalid) {
          it(name, () => {
              throws(() => {
                  parseSource(source, undefined, ctx);
              });
          });
      }
  });
};
