# Cherow

[![NPM version](https://img.shields.io/npm/v/cherow.svg)](https://www.npmjs.com/package/cherow)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/cherow/cherow)
[![Build Status](https://travis-ci.org/cherow/cherow.svg?branch=master)](https://travis-ci.org/cherow/cherow)
[![Build status](https://ci.appveyor.com/api/projects/status/pkydnkv0deckns5l/branch/master?svg=true)](https://ci.appveyor.com/project/Kflash/cherow/branch/master)
[![CircleCI](https://circleci.com/gh/cherow/cherow.svg?style=svg)](https://circleci.com/gh/cherow/cherow)
[![Coverage Status](https://coveralls.io/repos/github/cherow/cherow/badge.svg?branch=master)](https://coveralls.io/github/cherow/cherow?branch=master)

A very fast and lightweight, standards-compliant, self-hosted javascript parser with high focus on both performance and stability.

~20 KB smaller code size (*minified*) than Acorn, and ~60 KB than Esprima, and around twice as fast with full support for JSX & Stage 3 proposals via option.


## [Demo](https://cherow.github.io/cherow/) and [Benchmark](https://cherow.github.io/cherow/performance/)

## Features

* Conforms to the standard ECMAScript® 2018 [(ECMA-262 9th Edition)](https://tc39.github.io/ecma262/) language specification 
* Supports Stage 3 proposals via option
* Optionally track syntactic node locations
* Emits an [ESTree-compatible](https://github.com/estree/estree) abstract syntax tree.
* Very well tested (~43 000 [unit tests](https://github.com/cherow/cherow/tree/master/test) with [full code coverage)](https://coveralls.io/github/cherow/cherow))
* Lightweight - 62 KB minified

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

## Modules

In Cherow this replace the traditional plugin system. Cherow export all functions, and let you import them and
develop your own functions with it, and / or re-use existing one as long as you pass the parser object as the first 
argument. 

Example:

```js
import { parser, scanSignedInteger, parseScript, parserModule } from 'cherow';

function doWhatYouWant(parser, context) {
    // do some magic with numbers
    value = scanSignedInteger(parser, context); / '+', '-'

    // ...
}

```
  
## Performance 

Please note that the results vary from computer to computer, and that end results are not completely correct because 
this `Jazzle` parser can't parse the `TypeScript library`.

![Alt text](bench.png?raw=true "Title")


## Bug reporting

If you caught a bug, don't hesitate to report it in the issue tracker. From the moment I respond to you, it will take maximum 60 minutes before the bug is fixed. 

Note that I will try to respond to you within one hour. Sometimes it can take a bit longer. I'm not allways online. And if I find out it 
will take more then 60 minutes to solve your issue, you will be notified. 

I know how irritating it can be if you are writing code and encounter bugs in your dependencies. And even more frustrating if you need to wait weeks or days.

## Developers

Cherow v. 1.4x is mainly developed by one person, but two other developers actively participate "behind the scene". None of these are GH users, but they name themselves whenever they make changes to the code. 

## Contribution

If you feel something could've been done better, please do feel free to file a pull request with the changes.

Read our guidelines [here](CONTRIBUTING.md)

