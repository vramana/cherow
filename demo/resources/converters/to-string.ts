import { valueConverter } from 'aurelia-binding';

@valueConverter('toString')
export class ToString {
  public toView(input: any): string {
    switch (input) {
      case null:
        return 'null';
      case undefined:
        return 'undefined';
      default:
        return input.toString();
    }
  }
}
