import { n, pass, fail } from '../utils/test-utils';

describe('Declarations - Const', () => {

  fail('rest element (array binding pattern) are followed by any element', 'const [...[x], y] = [1, 2, 3];');
  fail('rest element (identifier) has initializer', `'const [...x = []] = [];`);

});