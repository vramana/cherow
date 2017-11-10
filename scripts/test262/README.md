# Test262 test runner

Programs can be skipped in the whitelist file, but none are skipped for now!

**Postive results**

 - 50062 valid programs parsed without error
 - 3556 invalid programs produced a parsing error

 **Negative results**

 - 274 invalid programs did not produce a parsing error

### How to

- Type `node run` on the CMD when you are in the `/test/test262 folder`

## Important
The rest results are not so bad as they may look like. Some of the tests that can't parse, are actually parsing! Just try example this test in the online demo and they all pass! So the amount of tests that doesn't pass is incorrect.

- language\expressions\class\gen-method-static-yield-spread-obj.js
- language\expressions\class\gen-method-static-yield-spread-obj.js
- language\expressions\class\gen-method-yield-spread-obj.js
- language\function-code\switch-case-decl-strict.js
- language/statements/try/scope-catch-block-lex-close.js
- language\statements\for-of\dstr-obj-rest-put-const.js

*.. and many more*


### Credits

Most of this code are "extracted" from from  a MIT-licensed test runner implemented by Mike Pennisi for the babel project.
