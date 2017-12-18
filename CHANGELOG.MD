# Changelog

*2017-10-14: Version 0.7.4*

 * Added 'sourceType' option for parsing module code.
 * Added 'globalReturn' option. Allow return statement in global scope
 * Fixed correct error location tracking for arrows

*2017-10-16: Version 0.8.1*

* Fails / passes correctly on block-scoping
* Fails / passes correctly on duplicates in ForStatement

*2017-10-16: Version 0.8.3*

* Optimized label validation, and fixed a bug where not checking for undefined

*2017-10-18: Version 0.8.9*

* Fixed lexical issues in scope
* Fixed variabel so they are failing correctly on complex binding patterns
* Reduced code size
* Optimized part of scanner code

*2017-10-18: Version 0.9.0*

- parsed through mostly all common libraries on GH and fixed a few bugs along the road

*2017-10-18: Version 0.9.2*

- Fixed scoping issue with two or more switch statements in global
- Fixed issue with await in async arrow param list in sloppy mode
- Fixed several minor issues
- Do and Throw expression now throw correctly if the options isn't set
- Reduced code size

*2017-10-18: Version 0.9.3*
- Fixed issue with reserved words in module code for object expressions

*2017-10-19: Version 0.9.8*
- Refactored module-code.

*2017-10-23: Version 0.10.0*

- Fixed several edge cases
- Reduced code size
- Removed dead code
- Should be stable. 

*2017-10-24: Version 0.10.2*
- Added source option to the node location meta data

*2017-10-24: Version 0.10.5*
- Implemented JSX fragment support

*2017-11-5: Version 0.12.0*
- Added Test262 test runner
- Fixed several bugs

*2017-11-8: Version 0.13.0*
- Passes all "pass" and "pass-explicit" Test262-parser tests
- Passes all Test262 tests

*2017-11-15: Version 0.14.0*
- Implemented class field support (Stage 3 proposal)
- Improved performance

*2017-11-19: Version 0.15.0*
- Added plugin system

*2017-11-19: Version 0.15.3*
- Refactor plugin system
- Finalized API for plugin system

*2017-11-19: Version 0.15.6*
- Refactor block scoping
- Fixed early errors for module code
- Throws correctly on duplicate import / export

*2017-12-12: Version 0.17.0*
- Implemented Numeric Separators (Stage 3)

*2017-12-12: Version 0.17.2*
- Fixed infinity loop in Numeric Separators if next option not set

*2017-12-12: Version 0.17.6*
- Fixed a couple of HTML single line comments issues in sloppy mode code

*2017-12-18: Version 0.17.12*
- Fixed a issue with class fields. Couldn't push to undefined.
