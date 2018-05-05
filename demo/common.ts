import { ESTree } from '../src/cherow';

export interface PropItem {
  key: string;
  value: undefined | null | string | number | boolean;
  $type: 'prop';
}
export interface NodeItem {
  key: string;
  value: ESTree.Node;
  $type: 'node';
}
export interface ObjItem {
  key: string;
  value: Object;
  $type: 'obj';
}
export interface ListItem {
  key: string;
  value: any[];
  $type: 'list';
}

export type Item = PropItem | NodeItem | ObjItem | ListItem;

// tslint:disable-next-line:no-multiline-string
export const initialCodeValue = `export class Foo {
  constructor() {

  }

  bar() {
    return true;
  }

}
`;
