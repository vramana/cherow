import { customElement, bindable } from 'aurelia-templating';
import { ListItem } from '../../common';

@customElement('ast-list')
export class AstList {
  @bindable()
  public item: ListItem;
}
