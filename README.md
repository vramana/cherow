# Cherow

[![NPM version](https://img.shields.io/npm/v/cherow.svg)](https://www.npmjs.com/package/cherow)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/cherow/cherow)
[![Build Status](https://travis-ci.org/cherow/cherow.svg?branch=bleeding)](https://travis-ci.org/cherow/cherow)
[![Build status](https://ci.appveyor.com/api/projects/status/pkydnkv0deckns5l/branch/bleeding?svg=true)](https://ci.appveyor.com/project/Kflash/cherow/branch/bleeding)
[![CircleCI](https://circleci.com/gh/cherow/cherow.svg?style=svg)](https://circleci.com/gh/cherow/cherow)
[![Coverage Status](https://coveralls.io/repos/github/cherow/cherow/badge.svg?branch=master)](https://coveralls.io/github/cherow/cherow?branch=master)

**Active development branch**

A very fast and lightweight, standards-compliant, self-hosted javascript parser with high focus on both performance and stability.

## Features

* Conforms to the standard ECMAScript® 2018 [(ECMA-262 9th Edition)](https://tc39.github.io/ecma262/) language specification 
* Supports Stage 3 proposals via option
* Optionally track syntactic node locations
* Emits an [ESTree-compatible](https://github.com/estree/estree) abstract syntax tree.
* Very well tested (~43 000 [unit tests](https://github.com/cherow/cherow/tree/master/test) with [full code coverage)](https://coveralls.io/github/cherow/cherow))
* Lightweight - 62 KB minified
* Regular Expression validator

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


## Builds

Cherow contains 3 different builds:

| Name        | Description |
| ----------- | ------------------------------------------------------------ |
| `Stable`    | Stable release |
| `Next`      | Has the `next` option enabled by default, and support all latest ECMAScript proposals. |
| `Bleeding`  | The active development branch. You can and will expect bugs with this branch because it's not stable |

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
| `tolerant`        | Create a top-level error array containing all "skipped" errors |
| `source`          | Set to true to record the source file in every node's `loc` object when the `loc option` is set.  |
| `raw`             | Attach raw property to each literal node    |
| `rawIdentifier`   | Attach raw property to each identifier node    |
| `node`            | Allow to bypass scoping when run in a NodejS environment |

# Modules

In Cherow this replace the traditional plugin system, and let you import the parser instance and
develop your own functions with it, and / or re-use existing one.

Example:

```js
import { parser, scanSignedInteger, parseScript, parserModule } from 'cherow';

function doWhatYouWant(parser, context) {
    // do some magic with numbers
    value = scanSignedInteger(parser, context); / '+', '-'

    // ...
}

```

# Regular Expression validation

Cherow let you validate regular expression as an stand-alone module, and not dependent on parsing any AST nodes.

Here is how you do it:

```js
    import { validateRegExp, RegexpState } from 'cherow';

    // without unicode

    validateRegExp('/=*$/'); // returns either true or false

    // with unicode

    validateRegExp('/=*$/', RegexpState.Unicode); // returns either true or false

```

## Performance 


#### Benchmark #1

![Alt text](bench.png?raw=true "Title")

#### Benchmark #2

**Note!** This Jazzle parser couldn't parse the TypeScript library, so the results is not 100%.

![Alt text](bench1.png?raw=true "Title")
