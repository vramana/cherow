import { observable } from 'aurelia-binding';
import { Program } from '../../src/estree';
import { parseScript, parseModule } from '../../src/cherow';
import { getLogger } from 'aurelia-logging';
import { initialCodeValue, NodeItem } from '../common';

const logger = getLogger('app');

export class App {
  @observable()
  // tslint:disable-next-line:no-multiline-string
  public code: string = initialCodeValue;

  public program: Program;
  public nodeItem: NodeItem;

  public bind(): void {
    this.codeChanged(this.code, null);
  }

  private codeChanged(newValue: string, oldValue: string): void {
    try {
      this.program = parseModule(this.code);
      this.nodeItem = { key: 'Root', value: this.program, $type: 'node' };
    } catch (e) {
      logger.error(e);
    }
  }
}
