# Cherow (beta)

[![NPM version](https://img.shields.io/npm/v/cherow.svg)](https://www.npmjs.com/package/cherow)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/cherow/cherow)
[![Build status](https://ci.appveyor.com/api/projects/status/pkydnkv0deckns5l/branch/master?svg=true)](https://ci.appveyor.com/project/Kflash/cherow/branch/master)
[![CircleCI](https://circleci.com/gh/cherow/cherow.svg?style=svg)](https://circleci.com/gh/cherow/cherow)
[![Coverage Status](https://coveralls.io/repos/github/cherow/cherow/badge.svg?branch=master)](https://coveralls.io/github/cherow/cherow?branch=master)

A very fast, standards-compliant, self-hosted ECMAScript parser with high focus on both performance and stability.

It strictly follows the [ECMAScript® 2018 Language Specification](https://tc39.github.io/ecma262/) and should parse according to these specifications.

## [Demo](https://cherow.github.io/cherow/) and [Benchmark](https://cherow.github.io/cherow/performance/)

## Features

* Full support for ECMAScript® 2017 [(ECMA-262 8th Edition)](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
* ECmaScript Next (*Stage 3 proposals*)
* Skips hashbang comment nodes by default
* Skips BOM (*U+FEFF*) by default
* Early error tolerant parsing
* Optional tracking of syntax node location (index-based and line-column)
* Heavily tested (~53 000 [unit tests](https://github.com/cherow/cherow/tree/master/test) with [full code coverage)](https://coveralls.io/github/cherow/cherow))

## ESNext features

`Stage 3` features support. These need to be enabled with the `next` option. 

* [Import()](https://github.com/tc39/proposal-dynamic-import)
* [Class Fields](https://github.com/tc39/proposal-class-fields)
* [Numeric Separators](https://github.com/tc39/proposal-numeric-separator)
* [Private methods and fields](https://github.com/tc39/proposal-private-methods)
* [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding)
* [BigInt](https://github.com/tc39/proposal-bigint)
* [Import.meta](https://github.com/tc39/proposal-import-meta)

## API
Cherow generates AST according to [ESTree AST format](https://github.com/estree/estree), and can be used to perform [syntactic analysis](https://en.wikipedia.org/wiki/Parsing) (parsing) of a JavaScript program, and with ES2015 and later a JavaScript program can be either [a script or a module](http://www.ecma-international.org/ecma-262/8.0/index.html#sec-ecmascript-language-scripts-and-modules) and this is achieved by choosing [`parseScript`](http://www.ecma-international.org/ecma-262/8.0/#sec-parse-script) function to parse a script and [`parseModule`](http://www.ecma-international.org/ecma-262/8.0/#sec-parsemodule) function to parse a module.

Here is a quick example:

```js

cherow.parseScript('const fooBar = 123;');

```

This will return when serialized in json:

```js
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "Literal",
                        "value": 123
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "fooBar"
                    }
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script"
}
```

## Options

Cherow supports several options as listed below, and they can be used as the second argument during parsing: 

```js
parseScript('1', { ranges: true, loc: true });`:
```


| Option        | Description |
| ----------- | ------------------------------------------------------------ |
| `comments`        | Create a top-level comments array containing all comments |
| `early`           | Create a top-level error array containing all "*skipped*" early errors |
| `globalReturn`    | Allow return statement in global scope     |
| `loc      `       | Attach line/column location information to each node |
| `ranges`          | Attach range information to each node |
| `next`            | Allow experimental ECMAScript features (*Stage 3 proposals*) |
| `plugins`         | Array containing the parameterized plugins that you want to enable   |
| `source`          | Correlate output AST nodes with their source filename  |
| `raw`             | Attach raw property on literal nodes (*Esprima and Acorn feature*)     |

## Comments

Single line, multiline and HTML comments are supported by `Cherow`, and the parser can be instructed to collect comments by setting the `comments option` to *true*,  or attach the comments to the AST node by setting `attachComment` to *true*.

A top-level comments array containing all comments will be attached to the root node (*Program*), and the type of each comment can 
either be `LineComment` for a single-line comment (`//`) or `BlockComment` for a MultiLineComment (`/* */`).

## Early error tolerant parsing

The tolerant algorithm used by `Cherow` deviates slightly from both `Esprima` and `Acorn` due to the 
parsers complexity, and it's primarily for early errors, and other errors that are basically valid syntax but just not allowed. 

A top-level errors array containing all "*skipped*" errors will be attached to the root node (*Program*),

## Bug reporting

If you caught a bug, don't hesitate to report it in the issue tracker. From the moment I respond to you, it will take maximum 30 minutes before the bug is fixed. 
Note that I will try to respond to you within one hour. Sometimes it can take a bit longer. I'm not allways online. And if I find out it 
will take more then 30 minutes to solve your issue, you will be notified. 

I know how irritating it can be if you are writing code and encounter bugs in your dependencies. And even more frustrating if you need to wait weeks or days.

## Contribution

If you feel something could've been done better, please do feel free to file a pull request with the changes.

Read our guidelines [here](CONTRIBUTING.md)
