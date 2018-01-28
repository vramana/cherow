import { pass, fail } from '../utils';

describe('Next - DotAll', () => {
  fail('/./ss;', { source: `/./ss;`});
});