# Cherow

[![NPM version](https://img.shields.io/npm/v/cherow.svg)](https://www.npmjs.com/package/cherow)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/cherow/cherow)
[![Build Status](https://travis-ci.org/cherow/cherow.svg?branch=master)](https://travis-ci.org/cherow/cherow)
[![Coverage Status](https://coveralls.io/repos/github/cherow/cherow/badge.svg?branch=master)](https://coveralls.io/github/cherow/cherow?branch=master)

A very fast, standards-compliant, self-hosted ECMAScript parser with high focus on both performance and stability.

It strictly follows the [ECMAScript® 2017 Language Specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) and should parse according to these specifications.

## [Demo](https://cherow.github.io/cherow/) and [Benchmark](https://cherow.github.io/cherow/performance/)

## Features

- Full support for ECMAScript® 2017 [(ECMA-262 8th Edition)](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- ECmaScript Next (*Stage 3 proposals*)
- [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), a syntax extension for React
- Skips hashbang comment nodes by default
- Optimized for handheld devices
- Optional tracking of syntax node location (index-based and line-column)
- Parameterized plugin system
- 8600 unit tests

## ESNext features

`Stage 3` features support. These need to be enabled with the `next` option. 

- [Import()](https://github.com/tc39/proposal-dynamic-import)
- [Asynchronous Iteration](https://github.com/tc39/proposal-async-iteration)
- [Class Fields](https://github.com/tc39/proposal-class-fields)
- [Private methods and fields](https://github.com/tc39/proposal-private-methods)
- [Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread)
- [Optional catch binding](https://github.com/tc39/proposal-optional-catch-binding)
- [BigInt](https://github.com/tc39/proposal-bigint)
- [Regexp dotall flag](https://github.com/tc39/proposal-regexp-dotall-flag)
- [Import.meta](https://github.com/tc39/proposal-import-meta)
- [Throw expressions](https://github.com/tc39/proposal-throw-expressions)

## Options


| Option        | Description |
| ----------- | ------------------------------------------------------------ |
| `comments`        | Enables option to collect comments. Optional; Either array or function                 |
| `directives`      | Enables the [`ESTree`](https://github.com/estree/estree/blob/1da8e603237144f44710360f8feb7a9977e905e0/es5.md#directive) directive node |
| `globalReturn`    | Allow return statement in global scope     |
| `impliedStrict`   | Enable global strict mode in sloppy mode |
| `jsx`             | Enables JSX   |
| `locations`       | Adds a location object with start and end subobjects on the AST node  {*line, column* |
| `next`            | enables `ECMAScript Next` support and let you use proposals at `stage 3` or higher such as `Import()` |
| `plugins`         |  Let you add an array of plugins    |
| `raw`             |  Enables the raw property on literal nodes (*Esprima and Acorn feature*)     |
| `sourceType`      | Indicate the mode the code should be parsed in. Can be either `script` or `module` |
## API

A JavaScript program can be either [a script or a module](http://www.ecma-international.org/ecma-262/8.0/index.html#sec-ecmascript-language-scripts-and-modules) and
both are accepted by Cherow to perform syntactic analysis of JavaScript programs.

```js

// Parsing script
cherow.parseScript('const fooBar = 123;');

// Parsing module code
cherow.parseModule('const fooBar = 123;');

```

### Legacy

`ES2009` and older only accepted a single `parse` to perform syntactic analysis of JavaScript program. In Cherow we call such features for
*Legacy* and choose to support it both for legacy reasons and the fact that many other ECMAScript parsers allow this syntax.

```js
// Parsing script code
cherow.parse('const fooBar = 123;');

// Parsing module code
cherow.parse('const fooBar = 123;', { sourceType: 'module'});

```

## Parsing with options

```js

// Parsing script
cherow.parseScript('const fooBar = 123;', { ranges: true, raw: true, next: true});

```

## Comments

Single line, multiline and HTML comments are supported, and can be collected as well. Hashbang comment nodes (`#!foo`) are
skipped by default, and can't be collected.

### Comment collecting

Cherow can be instructed to collect comments by setting the `comments option` to either an array or an function.

The type of each comment can either be `Line` for a single-line comment (`//`) og Block for a MultiLineComment (`/* */`).

**Note** that if the location tracking isn't enabled, an empty object will be returned, and if the `ranges option` isn't set - `undefined` will be returned.

A function will be called with the following parameters

- name - Either `Line` or `Block`
- comment - The content of the comment
- start - Character offset of the start of the comment.
- end - Character offset of the end of the comment.
- loc   - Column and line offset of the comment

Study the following examples to better understand how to collect comments:

```js

// Function
cherow.parseScript('// foo',
   {
       comments: function(name, comment, start, end, loc) {}
   }
);

// Array
const commentArray = [];

cherow.parseScript('// foo',
    {
        comments: commentArray
    }
);

```
## Plugins

Cherow is designed to support parameterized plugins wich, within reasonable bounds, redefine the way the parser works. A  parameterized plugin gives 
you far more benefits than a traditional one , and let you extend the parser with code from 3rd party libraries or 
simply let you create a walker function.

Note that the plugin options takes only an array of plugins ` [ plugin1(args...), plugin2(args...), plugin3(args...)]`

After the parser object has been created, the initialization functions for the chosen plugins are called with the `(parser)` argument. 

```js
function plugin() {
    return (parser) => {
      // your plugin code
   }
}
```
###  Creating a plugin

Here is a simple example plugin wich creates a new literal node with a pre-defined value `123`.

```js

// Create a new plugin
function plugin(value) {
    return (parser) => {
        parser.parseLiteral = function(context) {

            // Get the start pos of line, column
            const pos = this.getLocations();

            // Call for the next token in the stream
            this.nextToken(context);

            return this.finishNode(pos, {
                type: 'Literal',
                value // The value will be '123'
            });
        }
    }
}

// Parse with the new plugin enabled
parseScript('1', {
    plugins: [
        plugin(123);
    ]
});
```

You can see and try the demo expample live in the [cherow-dummy-plugin repo](https://github.com/cherow/cherow-dummy-plugin)

## Acorn and Esprima differences

The main difference between Cherow and Acorn/Esprima is that the latter libraries either don't parse everything
according to TC39, or they don't fail as they should according to the ECMAScript specs.

Cherow parses everything after the specs, and fails 90% after the specs (*work in progress*).

## Compability with other parsers

`Cherow` is compatible with other parsers, and can be used as an drop-in replacement. Only thing you have to do is to 
replace the imported parser name with `cherow`. E.g `var require('foo').parse` should be `var require('cherow').parse`.

Please *note* that the options supported my vary from parser to parser. If you are missing an option in Cherow, open an issue ticket
and it will be implemented as long as there exist a solid reason for it.

Also not that both `Babylon` and `ShiftJS` isn't ESTree compatible. However. `Babylon` supports ESTree through a plugin.

## Performance and benchmarks

The most important thing for an ECMAScript parser is performance, especially when it is a
dependency in other libraries. Poor performance will slow down the main library.

Cherow has been developed from scratch with only one goal - performance.

You can run your own [performance tests](https://cherow.github.io/cherow/performance/).

## ESTree

Cherow outputs a sensible syntax tree format as standardized by [ESTree project](https://github.com/estree/estree), and does
not add any "extra" properties to any of its nodes.

However there is a small difference from other parsers because Cherow outputs an `await` property on the `ForStatement` node.
This because of the `Asynchronous Iteration` implementation.

## Bug reporting

If you caught a bug, don't hesitate to report it in the issue tracker. From the moment I respond to you, it will take maximum 30 minutes before the bug is fixed. 
Note that I will try to respond to you within one hour. Sometimes it can take a bit longer. I'm not allways online. And if I find out it 
will take more then 30 minutes to solve your issue, you will be notified. 

I know how irritating it can be if you are writing code and encounter bugs in your dependencies. And even more frustrating if you need to wait weeks or days.

## Contribution

If you feel something could've been done better, please do feel free to file a pull request with the changes.

Read our guidelines [here](CONTRIBUTING.md)
