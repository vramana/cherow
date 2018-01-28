import { pass, fail } from '../utils';
import { parseScript } from '../../src/cherow';

describe('Miscellaneous - Identifiers', () => {

    pass(`T‍`, {
        source: `T‍`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
     }
      });

  });