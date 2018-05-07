# Cherow TypeScript parser

**TODO**

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

