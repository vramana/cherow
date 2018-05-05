import { customElement, bindable } from 'aurelia-templating';
import { Node } from '../../../src/estree';
import { NodeItem } from '../../common';

@customElement('ast-node')
export class AstNode {
  @bindable()
  public item: NodeItem;

  public activate(item: NodeItem): void {
    this.item = item;
  }
}
