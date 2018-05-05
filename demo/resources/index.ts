import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { ListItem } from './elements/ast-list';
import { NodeItem } from './elements/ast-node';
import { PropItem } from './elements/ast-prop';

export function configure(config: FrameworkConfiguration): void {
  config.globalResources([
    PLATFORM.moduleName('resources/converters/to-properties'),
    PLATFORM.moduleName('resources/converters/to-string'),
    PLATFORM.moduleName('resources/converters/sort-by-type'),
    PLATFORM.moduleName('resources/elements/ast-list'),
    PLATFORM.moduleName('resources/elements/ast-prop'),
    PLATFORM.moduleName('resources/elements/ast-node'),
    PLATFORM.moduleName('resources/elements/monaco-editor')
  ]);
}

export type Item = ListItem | NodeItem | PropItem;
