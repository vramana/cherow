# Cherow CLI

Command line interface for Cherow ECMAScript parser.

This package can be used to parse a file from the command line. By default it accepts as arguments a
input file, but this can be changed with the `s` flag which allows you to pass in code as in
the V8 REPL.

The CLI conforms to the standard ECMAScript® 2019 [(ECMA-262 9th Edition)](https://tc39.github.io/ecma262/) language specification (*draft*)

## Usage

Install it either global or locale, and type `cherow` from the command line. The syntax tree will be printed as JSON data.

```js

// Source code
cherow -s -l function foo() {}

// Source file
cherow -l foo.js
````

## Arguments

Shorthand is the first letter. E.g. `h` for `help` or `l` for `loc`.

| Arguments  | Description |
| ----------- | ------------------------------------------------------------ |
| `help`            | Print all available arguments |
| `module`          | Enable module syntax |
| `loc`             | Attach line/column location information to each node |
| `ranges`          | Append start and end offsets to each node |
| `globalReturn`    | Allow return in the global scope |
| `impliedStrict`   | Enable strict mode initial enforcement |
| `next`            | Enable stage 3 support (*ESNext*)  |
| `jsx`             | Enable React JSX parsing  |
| `source`          | Let you pass code instead of a file (*like V8 REPL*)  |
| `raw`             | Attach raw property to each literal node    |
| `experimental`    | Enable experimental features   |


## JSX

React JSX parsing can be enabled with the `jsx` argument.
