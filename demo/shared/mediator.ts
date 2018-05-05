import { AstNode } from '../resources/elements/ast-node';
import { MonacoEditor } from '../resources/elements/monaco-editor';
import { singleton } from 'aurelia-framework';
import * as monaco from 'monaco-editor';

@singleton()
export class Mediator {
  private editor: MonacoEditor;
  private astNodes: Set<AstNode> = new Set();

  public send(obj: any): boolean {
    // message coming from AstNode
    if (obj.$event && obj.$this && obj.$this instanceof AstNode) {
      const node = obj.$this as AstNode;
      const event = obj.$event as Event;
      if (event.type === 'mousemove') {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const loc = node.item.value.loc;
        this.editor.editor.setSelection({
          startColumn: loc.start.column + 1,
          startLineNumber: loc.start.line,
          endColumn: loc.end.column + 1,
          endLineNumber: loc.end.line
        });
        for (const otherNode of this.astNodes.keys()) {
          otherNode.isSelected = otherNode === node;
        }
      } else if (event.type === 'mouseleave') {
        node.isSelected = false;
      }
      return false;
      // message coming from editor
    } else {
      const e = obj as monaco.editor.IEditorMouseEvent;
      const position = e && e.target && e.target.position;
      if (position) {
        for (const node of this.astNodes.keys()) {
          const loc = node.item.value.loc;
          if (
            position.lineNumber >= loc.start.line &&
            loc.end.line >= position.lineNumber &&
            position.column >= (loc.start.column + 1) &&
            (loc.end.column + 1) >= position.column
          ) {
            for (const otherNode of this.astNodes.keys()) {
              otherNode.isSelected = otherNode === node;
            }
          }
        }
      }
    }
    return true;
  }

  public registerMonacoEditor(editor: MonacoEditor): void {
    this.editor = editor;
  }

  public registerAstNode(astNode: AstNode): void {
    this.astNodes.add(astNode);
  }

  public unregisterAstNode(astNode: AstNode): void {
    this.astNodes.delete(astNode);
  }
}
