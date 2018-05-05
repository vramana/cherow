import { valueConverter } from 'aurelia-binding';
import { Item } from '../../common';

@valueConverter('toProperties')
export class ToProperties {
  public toView(input: any): Item[] {
    const results = [];
    if (input !== null && typeof input === 'object') {
      const keys = Object.keys(input);
      let i = keys.length;
      while (i--) {
        const key = keys[i];
        const value = input[key];
        switch (typeof value) {
          case 'string':
          case 'undefined':
          case 'number':
          case 'boolean':
            results.push({ key, value, $type: 'prop' });
            break;
          case 'object':
            if (value === null) {
              results.push({ key, value, $type: 'prop' });
            } else if (Array.isArray(value)) {
              if (value.length === 0) {
                results.push({ key, value: '[]', $type: 'prop' });
              } else {
                results.push({ key, value, $type: 'list' });
              }
            } else {
              results.push({ key, value, $type: 'node' });
            }
            break;
          case 'function':
            results.push({ key, value, $type: 'node' });
            break;
          default:
          // ignore
        }
      }
    }
    return results;
  }
}
