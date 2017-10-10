[![NPM version](https://img.shields.io/npm/v/cherow.svg)](https://www.npmjs.com/package/cherow)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/cherow/cherow)
[![Build Status](https://travis-ci.org/cherow/cherow.svg?branch=master)](https://travis-ci.org/cherow/cherow)
[![CircleCI](https://circleci.com/gh/cherow/cherow.svg?style=svg)](https://circleci.com/gh/cherow/cherow)
[![Coverage Status](https://coveralls.io/repos/github/cherow/cherow/badge.svg)](https://coveralls.io/github/cherow/cherow)

Cherow is a very fast, standards-compliant [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm) parser written in ECMAScript.

It strictly follows the ECMAScript® 2017 Language Specification and should parse according to these specifications.

It's safe to use in production.

**Note!** If you find a bug, we will try our best to reply to you within 30 - 60 minutes, but our focus now are on
the refactoring so the bug will be solved soon as the refactoring have been completed.

## [Demo](https://cherow.github.io/cherow/) and [Benchmark](https://cherow.github.io/cherow/performance/)

## Features

- Full support for ECMAScript® 2017 [(ECMA-262 8th Edition)](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
- Stage 3 proposals (*experimental*)
- Support for [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), a syntax extension for React
- Skips shebang comment nodes by default
- Optimized for handheld devices
- Optional tracking of syntax node location (index-based and line-column)
- 5600 unit tests

## ESNext features

`Stage 3` features support. These need to be enabled with the `next` option.

- Import()
- Asynchronous Iteration
- Rest/Spread Properties
- Optional catch binding
- BigInt
- Regular Expression's new `DotAll` flag
- Import.meta

## V8 experimental features

These need to be enabled with the `v8` option.

- Do expressions

## Options

* `next` - Enables `ECMAScript Next` support and let you use proposals at `stage 3` or higher such as `Dynamic Import`
* `raw` - Enables the raw property on literal nodes (*Esprima and Acorn feature*)
* `comments` - Enables option to collect comments. Optional; Either array or function. Works like [Acorn](https://github.com/ternjs/acorn) onComment
* `ranges` - Enables the start and characters offsets on the AST node
* `locations` - Enables location tracking
* `jsx` - Enables JSX

## API

Cherow can be used to perform syntactic analysis of JavaScript programs.

**Note!** there does not exist an `sourceType: module` option for parsing module code. According the ECMAScript specs you should use either `parseScript` or `parseModule`.

```js

// Parsing script
cherow.parseScript('const fooBar = 123;');

// Parsing module code
cherow.parseModule('const fooBar = 123;');

```

## Parsing with options

```js

// Parsing script
cherow.parseScript('const fooBar = 123;', { ranges: true, raw: true, next: true});

```

## Comments

Single line, multiline and HTML comments are supported, and can be collected as well. Shebang comment nodes (`#!foo`) are
skipped by default, and can't be collected.

### Collecting comments

Collecting comments works just the same way as for Acorn.
```js

// Function
cherow.parseScript('// foo',
   {
       comments: function(type, comment, start, end) {}
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

## Acorn and Esprima differences

The main difference between Cherow and Acorn/Esprima is that the latter libraries either don't parse everything
according to TC39, or they don't fail as they should according to the ECMAScript specs.

Cherow parses everything after the specs, and fails 90% after the specs (*work in progress*).

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

## Contribution

 You are welcome to contribute. As a golden rule - always run benchmarks to verify that you haven't created any
 bottlenecks or did something that you shouldn't.

*Terms of contribution:*

- Think twice before you try to implement anything
- Avoid duplicating the source code
- Create tests that cover what you have implemented
