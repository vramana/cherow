import { customElement, bindable } from 'aurelia-templating';
import { PropItem } from '../../common';

@customElement('ast-prop')
export class AstProp {
  @bindable()
  public item: PropItem;
}
