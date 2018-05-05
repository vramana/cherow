import { customElement, bindable } from 'aurelia-templating';

@customElement('ast-list')
export class AstList {
  @bindable()
  public item: ListItem;

  private el: HTMLElement;
  constructor(el: Element) {
    this.el = el as HTMLElement;
  }

  private propagateDispatch($event: Event): void {
    const customEvent = new CustomEvent('ast-propagate', {
      detail: {
        $event,
        $this: this
      },
      bubbles: true,
      cancelable: true
    });

    this.el.dispatchEvent(customEvent);
  }
}

export interface ListItem {
  key: string;
  value: any[];
  $type: 'list';
}
