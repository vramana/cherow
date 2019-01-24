import { match, throws } from 'clean-assert';
import { parseSource } from '../src/cherow';
import { Context } from '../src/common';
import * as fs from 'fs';
import * as path from 'path';

export const pass = (name: string, valids: Array<[string, Context, any]>) => {
  describe(name, () => {
    for (const [source, ctx, expected] of valids) {
      it(source, () => {
        const parser = parseSource(source, undefined, ctx);
        match(parser, expected);
      });
    }
  });
};

export const fail = (name: string, invalid: Array<[string, Context]>) => {
  describe(name, () => {
    for (const [source, ctx] of invalid) {
      it(source, () => {
        throws(() => {
          parseSource(source, undefined, ctx);
        });
      });
    }
  });
};

export function walk(dir: any, fileHandler: any) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.lstatSync(full).isDirectory()) {
      walk(full, fileHandler);
    } else {
      fileHandler(full);
    }
  }
}
