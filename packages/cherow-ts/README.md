# Cherow TypeScript parser

**Work in progress**

`Cherow Typescript Parser` *is* `Cherow` and it also parses Javascript files, but it uses the modular concept of Cherow
to extend some of the code to accept TypeScript syntax.

This is a better and much faster approach than the typical plug-in systems found in other parsers because you don't have
to extend any classes which leads to a significant performance loss.

## API

```js

// Script
parseTS('function foo(bar: string): void {}', )

// Module code
parseTS('function foo(bar: string): void {}', { module: true })
```

## Options

`Cherow TypeScript parser` share the same options as in `Cherow`, but extended to include:

| Name        | Description |
| ----------- | ------------------------------------------------------------ |
| `module`    | Enable module code parsing |


## AST 

The parser emits an ESTree-compatible abstract syntax tree with a few additions for `TypeScript` support.
E.g. `declared:true`on the returned AST node if parsed within a `declared` context and `ns` if parsed 
in a namespace context.

This will be updated with more accurate details soon as the parser is complete.
