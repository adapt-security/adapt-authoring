const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
  "env": {
    "es2020": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    // Possible errors
      "no-compare-neg-zero": ERROR,
      "no-cond-assign": ERROR,
      "no-console": WARN, // ???
      "no-debugger": WARN,
      "no-dupe-args": ERROR,
      "no-dupe-keys": WARN,
      "no-duplicate-case": WARN,
      "no-ex-assign": WARN,
      "no-extra-boolean-cast": WARN,
      "no-extra-parens": WARN,
      "no-extra-semi": ERROR,
      "no-func-assign": ERROR,
      "no-import-assign": ERROR,
      "no-invalid-regexp": ERROR,
      "no-irregular-whitespace": WARN,
      "no-misleading-character-class": ERROR,
      "no-template-curly-in-string": WARN,
      "no-unreachable": ERROR,
      "no-unsafe-negation": ERROR,
      "valid-typeof": ERROR,
    // Best practices
      "complexity": [ ERROR, { max: 15 } ], // ???
      "eqeqeq": WARN,
      "no-empty-pattern": WARN,
      "no-extra-bind": WARN,
      "no-global-assign": ERROR,
      "no-implicit-globals": WARN,
      "no-multi-spaces": WARN,
      "no-param-reassign": ERROR, // ???
      "no-redeclare": ERROR,
      "no-return-await": WARN,
      "no-self-assign": WARN,
      "no-self-compare": WARN,
      "no-throw-literal": ERROR,
      "no-useless-call": WARN,
      "no-useless-catch": WARN,
      "no-useless-concat": WARN,
      "no-useless-return": WARN,
      "no-warning-comments": ERROR,
      "wrap-iife": ERROR,
      "yoda": ERROR,
    // Variables
      "no-delete-var": ERROR,
      "no-shadow": ERROR,
      "no-undef": WARN,
      "no-undef-init": WARN,
      "no-unused-vars": WARN,
    // Node.js
      "callback-return": WARN,
      "handle-callback-err": WARN,
    // Code-style
      "brace-style": ERROR,
      "func-call-spacing": ERROR,
      "indent": [ ERROR, 2, { SwitchCase: 1 } ],
      "lines-around-comment": [ WARN, {
        beforeBlockComment: false,
        afterBlockComment: false,
        beforeLineComment: false,
        afterLineComment: false,
      } ],
      "lines-between-class-members": [ WARN, "never" ],
      "max-len": [ ERROR, {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      } ],
      "max-lines": [ WARN, { max: 500 } ],
      "max-statements": [ WARN, { max: 25 } ], // ???
      "no-lonely-if": WARN,
      "no-mixed-spaces-and-tabs": ERROR,
      "no-multiple-empty-lines": ERROR,
      "no-nested-ternary": ERROR,
      "no-trailing-spaces": ERROR,
      "no-unneeded-ternary": WARN,
      "no-whitespace-before-property": ERROR,
      "semi": ERROR,
    // ES6
      "no-const-assign": ERROR,
      "no-dupe-class-members": ERROR,
      "no-duplicate-imports": ERROR,
      "no-this-before-super": ERROR,
      "no-useless-constructor": ERROR,
      "no-var": ERROR,
      "prefer-const": ERROR,
      "prefer-template": WARN,
      "sort-imports": WARN
  }
};
