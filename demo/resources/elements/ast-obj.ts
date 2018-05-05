import { customElement, bindable } from 'aurelia-templating';
import { ObjItem } from '../../common';

@customElement('ast-obj')
export class AstObj {
  @bindable()
  public item: ObjItem;
}
