import { valueConverter } from 'aurelia-binding';
import { Item } from '../index';

const sortOrder = Object.create(null, {
  prop: { value: 0 },
  obj: { value: 1 },
  node: { value: 2 },
  list: { value: 3 }
});

@valueConverter('sortByType')
export class SortByType {
  public toView(input: Item[]): Item[] {
    return input.sort((a, b) => {
      if (a.$type === b.$type && a.$type === 'node') {
        if (a.value.type === (b.value as any).type) {
          return 0;
        } else if (a.value.type === 'Identifier') {
          return -1;
        } else {
          return 1;
        }
      }
      return sortOrder[a.$type] - sortOrder[b.$type];
    });
  }
}
