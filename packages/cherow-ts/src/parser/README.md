## Parser source code

Code for the parser. It takes the tokens produced by the lexer and tries to determine if proper sentences have been formed, and
if so, it emits an [ESTree-compatible](https://github.com/estree/estree) abstract syntax tree. 