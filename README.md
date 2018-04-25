# Cherow

[![NPM version](https://img.shields.io/npm/v/cherow.svg)](https://www.npmjs.com/package/cherow)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/cherow/cherow)
[![Build Status](https://travis-ci.org/cherow/cherow.svg?branch=master)](https://travis-ci.org/cherow/cherow)
[![Build status](https://ci.appveyor.com/api/projects/status/pkydnkv0deckns5l/branch/master?svg=true)](https://ci.appveyor.com/project/Kflash/cherow/branch/master)
[![CircleCI](https://circleci.com/gh/cherow/cherow.svg?style=svg)](https://circleci.com/gh/cherow/cherow)
[![Coverage Status](https://coveralls.io/repos/github/cherow/cherow/badge.svg?branch=master)](https://coveralls.io/github/cherow/cherow?branch=master)

A very fast and lightweight, standards-compliant, self-hosted javascript parser with high focus on both performance and stability.

## [Demo](https://cherow.github.io/cherow/) and [Benchmark](https://cherow.github.io/cherow/performance/)

## Features

* Conforms to the standard ECMAScript® 2018 [(ECMA-262 9th Edition)](https://tc39.github.io/ecma262/) language specification 
* Support for all stage 3 proposals via option.
* JSX support via option.
* Optionally track syntactic node locations
* Emits an [ESTree-compatible](https://github.com/estree/estree) abstract syntax tree.
* Very well tested (~45 000 [unit tests](https://github.com/cherow/cherow/tree/master/test) with [full code coverage)](https://coveralls.io/github/cherow/cherow))
* Lightweight - ~68 KB minified (*20 kb smaller than Acorn*)

## ESNext features

`Stage 3` features support. These need to be enabled with the `next` option. 

* [Import()](https://github.com/tc39/proposal-dynamic-import)
* [Class field declarations for JavaScript](https://github.com/tc39/proposal-class-fields)
* [Numeric Separators](https://github.com/tc39/proposal-numeric-separator)
* [Private methods and getter/setters for JavaScript classes](https://github.com/tc39/proposal-private-methods)
* [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding)
* [JSON Superset](https://github.com/tc39/proposal-json-superset)
* [BigInt](https://github.com/tc39/proposal-bigint)
* [Import.meta](https://github.com/tc39/proposal-import-meta)

## API

Cherow generates AST according to [ESTree AST format](https://github.com/estree/estree), and can be used to perform [syntactic analysis](https://en.wikipedia.org/wiki/Parsing) (parsing) of a JavaScript program, and with ES2015 and later a JavaScript program can be either [a script or a module](http://www.ecma-international.org/ecma-262/8.0/index.html#sec-ecmascript-language-scripts-and-modules) and this is achieved by choosing [`parseScript`](http://www.ecma-international.org/ecma-262/8.0/#sec-parse-script) function to parse a script and [`parseModule`](http://www.ecma-international.org/ecma-262/8.0/#sec-parsemodule) function to parse a module.


Here is a quick example:

```js

cherow.parseScript('const fooBar = 123;', { ranges: true });

```

This will return when serialized in json:

```js
{
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "Literal",
                        "value": 123,
                        "start": 15,
                        "end": 18
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "fooBar",
                        "start": 6,
                        "end": 12
                    },
                    "start": 6,
                    "end": 18
                }
            ],
            "kind": "const",
            "start": 0,
            "end": 19
        }
    ],
    "start": 0,
    "end": 19
}
```

## Options

There is a second argument to both methods that allows you to specify various options:

| Option        | Description |
| ----------- | ------------------------------------------------------------ |
| `delegate`        | Accepts a callback function to be invoked for each syntax node (as the node is constructed) |
| `loc      `       | Attach line/column location information to each node |
| `ranges`          | Append start and end offsets to each node |
| `globalReturn`    | Allow return in the global scope |
| `skipShebang`     | Allow to skip shebang - '#' |
| `impliedStrict`   | Enable implied strict mode |
| `next`            | Enable stage 3 support (*ESNext*)  |
| `jsx`             | Enable React JSX parsing  |
| `tolerant`        | Create a top-level error array containing all "skipped" errors |
| `source`          | Set to true to record the source file in every node's `loc` object when the `loc option` is set.  |
| `raw`             | Attach raw property to each literal node    |
| `rawIdentifier`   | Attach raw property to each identifier node    |
| `node`            | Allow to bypass scoping when run in a NodejS environment |

## Builds

Cherow contains 3 different builds:

| Name        | Description |
| ----------- | ------------------------------------------------------------ |
| `Stable`    | Stable release |
| `Next`      | Has the `next` option enabled by default, and support all latest ECMAScript proposals. |
| `Bleeding`  | The active development branch. You can and will expect bugs with this branch because it's not stable |


## Syntax Delegate

The `delegate` option accepts a callback function to be invoked for each syntax node (as the node is constructed). 

Both ESTree AST nodes and comments can be delegated.

Here is how you do it:

```js
    cherow.parseScript('foo // comment', { delegate: function(node, start, end) { } } )
```

This will output:

```js
    { type: 'SingleLine', value: ' comment', start: 4, end: 14 }
    { type: 'Identifier', name: 'foo' }
    { type: 'ExpressionStatement', expression: { type: 'Identifier', name: 'foo' } }
``` 

## Contributing

If you feel something could've been done better, please do feel free to file a pull request with the changes.

Read our guidelines [here](CONTRIBUTING.md)

## Bug reporting

If you caught a bug, don't hesitate to report it in the issue tracker. From the moment I respond to you, it will take maximum 60 minutes before the bug is fixed. 

Note that I will try to respond to you within one hour. Sometimes it can take a bit longer. I'm not allways online. And if I find out it 
will take more then 60 minutes to solve your issue, you will be notified. 

I know how irritating it can be if you are writing code and encounter bugs in your dependencies. And even more frustrating if you need to wait weeks or days.


## Rationale

Existing parsers have many issues with them:

* `Acorn` is the most commonly used tool out there because of its support for recent ES standards, but it's slow and it often is too permissive in what it accepts. It's also not optimized for handheld devices.

* `Esprima` is a little faster than Acorn, but it's almost never updated, and their test suite has too many invalid tests. It also doesn't support recent ES standards.

* `Babylon` is highly coupled to Babel, and is comparatively very slow and buggy, and failing to correctly handle even stable ECMAScript standard features.

None of these parsers would fare any chance against the official Test262 suite, and most fail a substantial number of them. 

We figured we could *try* do better. *We* are used in plural form because Cherow is developed by a main developer and two 
others "*behind the scene*" that contributes with their knowledge whenever it's necessary.
