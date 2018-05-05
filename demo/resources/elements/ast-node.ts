import { customElement, bindable } from 'aurelia-templating';
import { NodeItem } from '../../common';

@customElement('ast-node')
export class AstNode {
  @bindable()
  public item: NodeItem;
}
