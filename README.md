# Cherow

[![NPM version](https://img.shields.io/npm/v/cherow.svg)](https://www.npmjs.com/package/cherow)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/cherow/cherow)
[![Build Status](https://travis-ci.org/cherow/cherow.svg?branch=master)](https://travis-ci.org/cherow/cherow)
[![Build status](https://ci.appveyor.com/api/projects/status/pkydnkv0deckns5l/branch/master?svg=true)](https://ci.appveyor.com/project/Kflash/cherow/branch/master)
[![CircleCI](https://circleci.com/gh/cherow/cherow.svg?style=svg)](https://circleci.com/gh/cherow/cherow)
[![Coverage Status](https://coveralls.io/repos/github/cherow/cherow/badge.svg?branch=master)](https://coveralls.io/github/cherow/cherow?branch=master)

A very fast, standards-compliant, self-hosted javascript parser with high focus on both performance and stability.

It strictly follows the [ECMAScript® 2018 Language Specification](https://tc39.github.io/ecma262/) and should parse according to these specifications.

## [Demo](https://cherow.github.io/cherow/) and [Benchmark](https://cherow.github.io/cherow/performance/)

## Features

* Full support for ECMAScript® 2018 [(ECMA-262 9th Edition)](https://tc39.github.io/ecma262/) (*latest draft*)
* Optimized for handheld devices 
* Stage 3 (*ESNext*) proposals via option
* [JSX](https://reactjs.org/docs/jsx-in-depth.html), a syntax extension for React
* Skips hashbang comment nodes by default
* Skips BOM (*U+FEFF*) by default
* Tolerant parsing
* Optional tracking of syntax node location (index-based and line-column)
* Emits an [ESTree-compatible](https://github.com/estree/estree) abstract syntax tree.
* Very well tested (~55 000 [unit tests](https://github.com/cherow/cherow/tree/master/test) with [full code coverage)](https://coveralls.io/github/cherow/cherow))
* 97% Test262 Test coverage
* 30 - 45% faster than [Acorn](https://github.com/acornjs/acorn) and [Esprima](https://github.com/jquery/esprima)

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

cherow.parseScript('const fooBar = 123;', { ranges: true});

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
| `comments`        | Create a top-level comments array containing all comments |
| `tolerant`        | Create a top-level error array containing all "skipped" errors |
| `jsx`             | Enable React JSX parsing |
| `loc      `       | Attach line/column location information to each node |
| `ranges`          | Append start and end offsets to each node |
| `impliedStrict`   | Enable implied strict mode |
| `next`            | Enable stage 3 support (*ESNext*)  |
| `plugins`         | Array containing the plugins that you want to enable   |
| `source`          | Set to true to record the source file in every node's `loc` object when the `loc option` is set.  |
| `raw`             | Attach raw property to each literal node    |

## Comments

Single line, multiline and HTML comments are supported by `Cherow`, and the parser can be instructed to collect comments by setting the `comments option` to *true*.

A top-level comments array containing all comments will be attached to the root node (*Program*), and the type of each comment can 
either be [`SingleLine`](https://tc39.github.io/ecma262/#prod-SingleLineComment) for a single-line comment (`//`) or [`MultiLine`](https://tc39.github.io/ecma262/#prod-MultiLineComment) for a MultiLineComment (`/* */`).

HTML comments is not a part of the ECMAScript specifications, and the way Cherow deals with them deviates slightly from other
parsers. In Cherow `HTMLOpen` are used for a HTML open comments (`<!--`) and `HTMLClose` for a HTML close comment (`-->`).
In other  ECMAScripts parsers both are seen as a [`single-line comment `](https://tc39.github.io/ecma262/#prod-SingleLineComment).

# Tolerant parsing

The tolerant algorithm used by Cherow deviates slightly from both `Esprima` and Acorn due to the parsers complexity, and it's primarily for early errors, and other errors that are basically valid syntax but just not allowed.

A top-level errors array containing all "skipped" errors will be attached to the root node (Program),

## Plugins

Cherow can be extended through plugins. See [this repo](https://github.com/cherow/cherow-do-expressions) as an example on how to build your own plugins. 

By default Cherow pass around context masks everywhere as a simple immutable bit set, and also let you use mutable parser flags, in 
case any flags need passed by reference. You can either create your own masks or adopt the build in one as you find in the `do-expressions-repo`
or in the source folder on this repo.

**To create and add a plugin:**

```js

 // Create the do-expression plugin
export default function(Parser) {

    return class extends Parser {

        parsePrimaryExpression(context, pos) {
            return this.token === Token.DoKeyword 
            ? this.parseDoExpression(context)
            : super.parsePrimaryExpression(context, pos);

        }

        parseDoExpression(context) {
            const pos = this.getLocation();
            this.expect(context, Token.DoKeyword);
            const body = this.parseBlockStatement(context);
            return this.finishNode(context, pos, {
                type: 'DoExpression',
                body
            });
        }
     }
}

//  Use the plugin
Cherow.parseScript("let x = do {}", { plugins: [do-expressions] }
```

### Existing plugins


| Name        | Description |
| ----------- | ------------------------------------------------------------ |
| [`cherow-do-expression`](https://github.com/cherow/cherow-do-expressions)  | Stage 1 proposal |


## Walk / Syntax Delegate

A third parameter in parseScript/parseModule accepts a callback function to be invoked for each syntax 
node (as the node is constructed). 

Both ESTree AST nodes and comments can be delegated.

Here is an quick example:

```js
    cherow.parseScript('foo // comment', { comments: true }, function(node) {} )
```

This will output:

```js
    { type: 'SingleLine', value: ' comment', start: 4, end: 14 }
    { type: 'Identifier', name: 'foo' }
    { type: 'ExpressionStatement',
    expression: { type: 'Identifier', name: 'foo' } }
```        

## Bug reporting

If you caught a bug, don't hesitate to report it in the issue tracker. From the moment I respond to you, it will take maximum 60 minutes before the bug is fixed. 
Note that I will try to respond to you within one hour. Sometimes it can take a bit longer. I'm not allways online. And if I find out it 
will take more then 60 minutes to solve your issue, you will be notified. 

I know how irritating it can be if you are writing code and encounter bugs in your dependencies. And even more frustrating if you need to wait weeks or days.

## Contribution

If you feel something could've been done better, please do feel free to file a pull request with the changes.

Read our guidelines [here](CONTRIBUTING.md)
