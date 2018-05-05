import { customElement, bindable } from 'aurelia-templating';
import { Mediator } from '../../shared/mediator';
import { ESTree } from '../../../src/cherow';

@customElement('ast-node')
export class AstNode {
  @bindable()
  public item: NodeItem;
  public isSelected: boolean = false;

  private mediator: Mediator;

  constructor(mediator: Mediator) {
    this.mediator = mediator;
  }

  public attached(): void {
    this.mediator.registerAstNode(this);
  }

  public detached(): void {
    this.mediator.unregisterAstNode(this);
  }

  public handleAstPropagate(customEvent: CustomEvent): boolean {
    customEvent.preventDefault();
    customEvent.stopPropagation();
    customEvent.stopImmediatePropagation();

    this.mediator.send({ $event: customEvent.detail.$event, $this: this });

    return false;
  }
}

export interface NodeItem {
  key: string;
  value: ESTree.Node;
  $type: 'node';
}
