import { customElement, bindable } from 'aurelia-templating';

@customElement('ast-prop')
export class AstProp {
  @bindable()
  public item: PropItem;

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

export interface PropItem {
  key: string;
  value: undefined | null | string | number | boolean;
  $type: 'prop';
}
