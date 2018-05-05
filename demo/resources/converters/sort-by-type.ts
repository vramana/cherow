import { valueConverter } from 'aurelia-binding';
import { Item } from '../../common';

const sortOrder = Object.create(null, {
  prop: { value: 0 },
  list: { value: 1 },
  node: { value: 2 }
});

@valueConverter('sortByType')
export class SortByType {
  public toView(input: Item[]): Item[] {
    return input.sort((a, b) => {
      if (a.$type === b.$type && a.$type === 'node') {
        if (a.value.type === 'Identifier') {
          return -1;
        } else {
          return 1;
        }
      }
      return sortOrder[a.$type] - sortOrder[b.$type]
    });
  }
}
